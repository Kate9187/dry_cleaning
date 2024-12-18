import logo from './logo.svg';
import './App.css';
import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css"
import { Routes, Route, Link } from "react-router-dom";

import AddOrder from "./components/add-order.component";
import OrdersList from "./components/orders-list.component";
import Order from "./components/order.component";

class App extends Component {
  render() {
    return(
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <a href="/orders" className="navbar-brand" id='nav'>
          Dry Cleaning
          </a>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to="/orders" className="nav-link" id='nav'>
              Orders
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/add" className="nav-link" id='nav'>
              Add
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <Routes>
            <Route path="/" element={<OrdersList/>} />
            <Route path="/orders" element={<OrdersList/>} />
            <Route path="/orders/:id" element={<Order/>} />
            <Route path="/add" element={<AddOrder/>} />
          </Routes>
        </div>
      </div>
    );
  }
}

export default App;
