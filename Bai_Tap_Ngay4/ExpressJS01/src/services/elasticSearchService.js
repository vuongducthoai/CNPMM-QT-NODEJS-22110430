const { Client } = require('@elastic/elasticsearch');
const client = new Client({ node: 'http://localhost:9200' });

const searchProductsElastic = async (
    q, 
    categoryId, 
    minPrice,
    maxPrice,
    minDiscount,
    minViews
) => {
     try {
    const mustQueries = [];
    const filterQueries = [];

    if (q) {
      // Nếu q là dạng khoảng giá: "min-max"
      const priceMatch = q.match(/^(\d+)-(\d+)$/);
      if (priceMatch) {
        const minPrice = Number(priceMatch[1]);
        const maxPrice = Number(priceMatch[2]);
        filterQueries.push({ range: { price: { gte: minPrice, lte: maxPrice } } });
      } 
      // Nếu q là số → coi như maxPrice
      else if (!isNaN(Number(q))) {
        filterQueries.push({ range: { price: { lte: Number(q) } } });
      } 
      // Nếu q là chữ → search theo text
      else {
        mustQueries.push({
          multi_match: {
            query: q,
            fields: ["name^2", "description"],
            fuzziness: "AUTO",
          },
        });
      }
    }

    // category filter
    if (categoryId) {
      filterQueries.push({ term: { 'category._id': categoryId.toString() } });
    }

    // discount filter
    if (minDiscount !== undefined && minDiscount !== null) {
      filterQueries.push({ range: { discount: { gte: Number(minDiscount) } } });
    }

    // views filter
    if (minViews !== undefined && minViews !== null) {
      filterQueries.push({ range: { views: { gte: Number(minViews) } } });
    }

    const searchResponse = await client.search({
      index: 'products',
      query: {
        bool: {
          must: mustQueries.length > 0 ? mustQueries : [{ match_all: {} }],
          filter: filterQueries,
        },
      },
    });

    return searchResponse.hits.hits.map((hit) => hit._source);
  } catch (err) {
    console.error('Elasticsearch search error:', err);
    return null;
  }
};

module.exports = {
    searchProductsElastic
};
    