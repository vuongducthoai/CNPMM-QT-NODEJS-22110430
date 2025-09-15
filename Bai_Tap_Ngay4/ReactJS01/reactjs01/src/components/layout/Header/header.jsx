import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import './header.css'; 

const Header = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchValue.trim()) {
      navigate(`/products?q=${encodeURIComponent(searchValue.trim())}`);
      setShowSearch(false);
      setSearchValue(searchValue.trim());
    } else {
      navigate(`products`);
    }
  };

  return (
    <header className="container-header">
      <div className="content">
          <div className="logo">
            <a href=""><img src="./img/logo.jpg"></img></a>
          </div>
          <ul className="header-menu">
            <li><a href="">iPhone</a></li>
            <li><a href="">Mac</a></li>
            <li><a href="">iPad</a></li>
            <li><a href="">Watch</a></li>
            <li><a href="">Âm thanh</a></li>
            <li><a href="">Phụ kiện</a></li>
            <li><a href="">Tekzone</a></li>
            <li><a href="">TopCare</a></li>
          </ul>
         
         <div className="icon-header">
          <form className="search" onSubmit={handleSearchSubmit}>
            <input
              type="text"
              placeholder="Tìm kiếm sản phẩm..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
            <button type="submit" className="icon-search">
              <i className="fas fa-search"></i>
            </button>
          </form>
          <a href=""><i className="fas fa-shopping-cart"></i></a>
          <a href="/login"><i className="fas fa-user"></i></a>
        </div>
      </div>
    </header>
  );
};

export default Header;
