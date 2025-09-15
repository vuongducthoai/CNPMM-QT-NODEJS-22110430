import React from "react";
import {Link, useNavigate } from 'react-router-dom';
import './sidebar.css'

const Sidebar = () => {
    const navigate = useNavigate();
    const handleCategoryClick = (category) => {
        if (category === "all") {
        navigate("/products");
        } else {
        navigate(`/products?q=${encodeURIComponent(category)}`);
        }
    };

    return (
        <div className="col-md-3 filter-desktop">
            <h5 style={{ color: 'aliceblue' }}><strong>BỘ LỌC</strong></h5>
            <hr></hr>
            <h6 style={{ color: 'aliceblue' }}>PHÂN LOẠI</h6>
            <ul className="list-group">
                <li className="list-group-item"><button className="btn-link" onClick={() => handleCategoryClick("all")}><b>Tất cả</b></button></li>
                <li className="list-group-item"><button className="btn-link" onClick={() => handleCategoryClick("iPhone")}>iPhone</button></li>
                <li className="list-group-item"><button className="btn-link" onClick={() => handleCategoryClick("Macbook")}>Macbook</button></li>
                <li className="list-group-item"><button className="btn-link" onClick={() => handleCategoryClick("iPad")}>iPad</button></li>
                <li className="list-group-item"><button className="btn-link" onClick={() => handleCategoryClick("Watch")}>Watch</button></li>
                <li className="list-group-item"><button className="btn-link" onClick={() => handleCategoryClick("Sound")}>Sound</button></li>
                <li className="list-group-item"><button className="btn-link" onClick={() => handleCategoryClick("Accessories")}>Accessories</button></li>
            </ul>
            <hr></hr>
            <h6 style={{color: 'white'}}>KHOẢNG GIÁ</h6>
            <ul className="list-group">
                <li className="list-group-item"> 
                    <button className="btn-link" onClick={() => handleCategoryClick(500000)}>
                        <b>Nhỏ hơn 500.000vnđ</b>
                    </button>
                </li>
                <li className="list-group-item">
                     <button className="btn-link" onClick={() => handleCategoryClick(10000000)}>
                         Từ 500.000vnđ - 10.000.000vnđ
                     </button>
                </li>
                <li className="list-group-item">
                     <button className="btn-link" onClick={() => handleCategoryClick(20000000)}>
                       Lớn hơn 10.000.000vnđ
                     </button>
                </li>
            </ul>
        </div>
    );
}

export default Sidebar;