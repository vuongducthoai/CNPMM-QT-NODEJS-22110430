import React, { useEffect, useState, useRef, useCallback } from "react";
import Sidebar from "../Sidebar/sidebar";
import './product.css';
import { getProductApi } from "../../../util/api";
import { searchProductApi } from "../../../util/api";
import { useLocation } from "react-router-dom";
import { all } from "axios";

function useQuery(){
    return new URLSearchParams(useLocation().search);
}

const ProductList = () => {
    //Get productlist
    const [products, setProducts] = useState([]);
    const [allProducts, setAllProducts] = useState([]); // contain all product when search 
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    const limit = 6;

    //Fuzzy search product
    const query = useQuery();
    const keyword = query.get("q") || "";
    console.log("Fetching page:", page); 
    const fetchProducts = async (pageNumber) => {
    
    try {
        setLoading(true);
        const data = await getProductApi(pageNumber, limit);

        let newProducts = [];
        if (Array.isArray(data)) {
            newProducts = data;
        } else if (data && data.products) {
            newProducts = data.products;
        }

        setProducts(prevProducts => {
            // Tạo set các ID hiện có
            const existingIds = new Set(prevProducts.map(p => p._id));

            // Lọc ra những sản phẩm chưa có
            const uniqueNewProducts = newProducts.filter(p => !existingIds.has(p._id));

            return [...prevProducts, ...uniqueNewProducts];
        });

        // Update hasMore logic
        if (Array.isArray(data)) {
            setHasMore(data.length >= limit);
        } else if (data && data.products) {
            setHasMore(pageNumber * limit < data.total);
        } else {
            setHasMore(false);
        }

    } catch (err) {
        console.error("Lỗi khi gọi API:", err);
        setHasMore(false);
    } finally {
        setLoading(false);
    }
  };


  //Fetch khi co keyword 
   const fetchSearchProducts = async() => {
     try {
        setLoading(true);
        const data = await searchProductApi(keyword);
        if(Array.isArray(data)){
            setAllProducts(data);
            setProducts(data.slice(0, limit));
            setPage(1);
            setHasMore(data.length > limit);
        }
     }catch(err){
        console.error("Loi khi search:", err);
        setHasMore(false);
     } finally{
        setLoading(false);
     }
   };


    useEffect(() => {
        setProducts([]);
        setPage(1);
        if (keyword) {
            fetchSearchProducts();
        } else {
            setAllProducts([]);
            fetchProducts(1);
        }
    }, [keyword]);

    useEffect(() => {
        if (!keyword && page > 1) {
            fetchProducts(page);
            
        }
    }, [page, keyword]);


    const observer = useRef();
    const lastProductRef = useCallback(node => {
        if (loading || !hasMore) return;
        if (observer.current) observer.current.disconnect();

        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) {
                if(keyword) {
                    const nextPage = page + 1;
                    const start = (nextPage - 1) * limit;
                    const end = start + limit;
                    setProducts((prev) => [...prev, ...allProducts.slice(start, end)]);
                    setPage(nextPage);
                    if(end >= allProducts.length) {
                        setHasMore(false);
                    }
                } else {
                    setPage(prev => prev + 1);
                }
            }
        });

        if (node) observer.current.observe(node);
    }, [loading, hasMore, keyword, page,  allProducts]);

    return (
        <div className="container mt-4">
            <div className="row">
                <Sidebar />
                <div className="col-md-9" style={{ color: 'aliceblue' }}>
                    <div className="row">
                        {products.map((item, index) => {
                            const isLastProduct = index === products.length - 1;
                            return (
                                <div
                                    className="col-6 col-md-6 col-lg-4 mb-4"
                                    key={item._id || index}
                                    ref={isLastProduct ? lastProductRef : null}
                                >
                                    <div className="product-card">
                                        <img src={`/img/${item.image}`} alt={item.name} />
                                        <div className="product-name">{item.name}</div>
                                        <div className="product-price">{item.price}đ</div>
                                        <button className="add-to-cart">Thêm vào giỏ hàng</button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    {loading && <p>Đang tải thêm sản phẩm...</p>}
                    {!hasMore && products.length > 0 && <p>Đã tải hết sản phẩm.</p>}
                </div>
            </div>
        </div>
    );
};

export default ProductList;