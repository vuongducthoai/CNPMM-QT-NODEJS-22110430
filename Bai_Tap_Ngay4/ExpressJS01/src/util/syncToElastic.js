    const mongoose = require('mongoose');
    const { Client } = require('@elastic/elasticsearch');
    const Product = require('../models/product'); 
    const connection = require('../config/database')
    const Category = require('../models/category');

    const client = new Client({ node: 'http://localhost:9200' });

    const syncData = async () => {
        try {
            await connection();
            
            const products = await Product.find().populate('category');

            const operations = products.flatMap(doc => [{
                index: {
                    _index: 'products',
                    _id: doc._id.toString()
                }
            }, {
                name: doc.name,
                description: doc.description,
                price: doc.price,
                category: doc.category ? doc.category.name : null,
                discount: doc.discount,
                views: doc.views,
                image: doc.image 
            }]);

            if (operations.length > 0) {
                const bulkResponse = await client.bulk({ refresh: true, operations });
                console.log(`Successfully synced ${products.length} products to Elasticsearch.`);
            } else {
                console.log('No products to sync.');
            }
        } catch (err) {
            console.error('Error syncing data:', err);
        }
    };

    syncData();