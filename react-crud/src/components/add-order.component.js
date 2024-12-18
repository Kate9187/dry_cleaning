import React, { Component } from "react";
import OrderDataService from "../services/order.service";

export default class AddOrder extends Component {
    constructor(props) {
        super(props);
        this.onChangeCustomer = this.onChangeCustomer.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.saveOrder = this.saveOrder.bind(this);
        this.newOrder = this.newOrder.bind(this);

        this.state = {
            id: null,
            customer: "",
            description: "", 
            price: 0,
            readiness: false,
      
            submitted: false
          };  
    }


    onChangeCustomer(e) {
        this.setState({
            customer: e.target.value
        });
    }

    onChangeDescription(e) {
        this.setState({
            description: e.target.value
        });
    }

    saveOrder() {
        var data = {
          customer: this.state.customer,
          description: this.state.description
        };
    
        OrderDataService.create(data)
          .then(response => {
            this.setState({
              id: response.data.id,
              customer: response.data.customer,
              description: response.data.description,
              price: response.data.price,
              readiness: response.data.readiness,
    
              submitted: true
            });
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
      }

      newOrder() {
        this.setState({
          id: null,
          customer: "",
          description: "",
          price: 0,
          readiness: false,
    
          submitted: false
        });
      }

      render() {
        return(
            <div className="submit-form">
                {this.state.submitted ? (
                    <div>
                        <h4>You submitted successfully!</h4>
                        <button className="btn btn-success" onClick={this.newOrder}>
                            Add
                        </button>
                    </div>
                ) : (
                    <div>
                        <div className="form-group">
                            <label htmlFor="customer">Customer</label>
                            <input
                            type="text"
                            className="form-control"
                            id="customer"
                            required
                            value={this.state.customer}
                            onChange={this.onChangeCustomer}
                            name="customer"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="description">Description</label>
                            <input
                            type="text"
                            className="form-control"
                            id="description"
                            required
                            value={this.state.description}
                            onChange={this.onChangeDescription}
                            name="description"
                            />
                        </div>
                        <button onClick={this.saveOrder} className="btn btn-success">
                            Submit
                        </button>
                    </div>
                )}
            </div>
        );
      }
}