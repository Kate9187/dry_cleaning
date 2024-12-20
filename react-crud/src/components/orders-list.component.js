import React, { Component } from "react";
import OrderDataService from "../services/order.service";
import { Link } from "react-router-dom";

export default class OrdersList extends Component{
    constructor(props) {
        super(props);
        this.onChangeSearchCustomer = this.onChangeSearchCustomer.bind(this);
        this.retrieveOrders = this.retrieveOrders.bind(this);
        this.refreshList = this.refreshList.bind(this);
        this.setActiveOrder = this.setActiveOrder.bind(this);
        this.removeAllOrders = this.removeAllOrders.bind(this);
        this.searchCustomer = this.searchCustomer.bind(this);

        this.state = {
            orders: [],
            currentOrder: null,
            currentIndex: -1,
            searchCustomer: ""
          };
    }

    componentDidMount() {
        this.retrieveOrders();
      }

    onChangeSearchCustomer(e) {
        const searchCustomer = e.target.value;
    
        this.setState({
          searchCustomer: searchCustomer
        });
      }

      retrieveOrders() {
        OrderDataService.getAll()
          .then(response => {
            this.setState({
              orders: response.data
            });
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
      }

      refreshList() {
        this.retrieveOrders();
        this.setState({
          currentOrder: null,
          currentIndex: -1
        });
      }

      setActiveOrder(order, index) {
        this.setState({
          currentOrder: order,
          currentIndex: index
        });
      }

      removeAllOrders() {
        OrderDataService.deleteAll()
          .then(response => {
            console.log(response.data);
            this.refreshList();
          })
          .catch(e => {
            console.log(e);
          });
      }

      searchCustomer() {
        OrderDataService.findByCustomer(this.state.searchCustomer)
          .then(response => {
            this.setState({
              orders: response.data
            });
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
      }

      render() {
        const { searchCustomer, orders, currentOrder, currentIndex } = this.state;
        return(
            <div className="list row">
                <div className="col-md-8">
                    <div className="input-group mb-3">
                        <input
                        type="text"
                        className="form-control"
                        placeholder="Search by customer"
                        value={searchCustomer}
                        onChange={this.onChangeSearchCustomer}
                        />
                        <div className="input-group-append">
                            <button
                            className="btn btn-outline-secondary"
                            type="button"
                            onClick={this.searchCustomer}
                            >
                                Search
                            </button>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <h4>Orders List</h4>
                    <ul className="list-group">
                        {orders &&
                        orders.map((order, index) => (
                        <li
                        className={
                            "list-group-item " +
                            (index === currentIndex ? "active" : "")
                        }
                        onClick={() => this.setActiveOrder(order, index)}
                        key={index}
                        >
                            {order.customer}
                        </li>
                      ))}
                      </ul>
                      <button
                      className="m-3 btn btn-sm btn-danger"
                      onClick={this.removeAllOrders}
                      >
                        Remove All
                      </button>
                        </div>
                        <div className="col-md-6">
                        {currentOrder ? (
                          <div>
                            <h4>Order</h4>
                            <div>
                              <label>
                                <strong>Customer:</strong>
                                </label>{" "}
                                {currentOrder.customer}
                            </div>
                            <div>
                              <label>
                                <strong>Description:</strong>
                                </label>{" "}
                                {currentOrder.description}
                            </div>
                            <div>
                              <label>
                                <strong>Status:</strong>
                                </label>{" "}
                                {currentOrder.readiness ? "Ready" : "Not ready"}
                            </div>
                            <Link
                            to={"/orders/" + currentOrder.id}
                            className="badge badge-warning"
                            /*style={{color: 'green', background: 'red'}}*/
                            id='Link'
                            >
                              Edit
                              </Link>
                          </div>
                          ) : (
                            <div>
                              <br />
                              <p>Please click on a Order...</p>
                            </div>
                          )}
                          </div>
                          </div>
        );
      }
}