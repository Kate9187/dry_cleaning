import React, { Component } from "react";
import OrderDataService from "../services/order.service";
import { withRouter } from '../common/with-router';

class Order extends Component {
    constructor(props){
        super(props);
        this.onChangeCustomer = this.onChangeCustomer.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.getOrder = this.getOrder.bind(this);
        this.updateReadiness = this.updateReadiness.bind(this);
        this.updateOrder = this.updateOrder.bind(this);
        this.deleteOrder = this.deleteOrder.bind(this);

        this.state = {
            currentOrder: {
              id: null,
              customer: "",
              description: "",
              price: 0,
              readiness: false
            },
            message: ""
          };
    }

    componentDidMount() {
        this.getOrder(this.props.router.params.id);
      }

    onChangeCustomer(e) {
        const customer = e.target.value;
    
        this.setState(function(prevState) {
          return {
            currentOrder: {
              ...prevState.currentOrder,
              customer: customer
            }
          };
        });
      }

    onChangeDescription(e) {
        const description = e.target.value;
        
        this.setState(prevState => ({
          currentOrder: {
            ...prevState.currentOrder,
            description: description
          }
        }));
      }

    getOrder(id) {
        OrderDataService.get(id)
          .then(response => {
            this.setState({
              currentOrder: response.data
            });
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
      }

      updateReadiness(status) {
        var data = {
          id: this.state.currentOrder.id,
          customer: this.state.currentOrder.customer,
          description: this.state.currentOrder.description,
          readiness: status
        };
        
        OrderDataService.update(this.state.currentOrder.id, data)
      .then(response => {
        this.setState(prevState => ({
          currentOrder: {
            ...prevState.currentOrder,
            readiness: status
          }
        }));
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateOrder() {
    OrderDataService.update(
      this.state.currentOrder.id,
      this.state.currentOrder
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "The order was updated successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteOrder() {    
    OrderDataService.delete(this.state.currentOrder.id)
      .then(response => {
        console.log(response.data);
        this.props.router.navigate('/orders');
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentOrder } = this.state;
    return (
        <div>
            {currentOrder ? (
                <div className="edit-form">
                    <h4>Order</h4>
                    <form>
                        <div className="form-group">
                        <label htmlFor="customer">Customer</label>
                        <input
                        type="text"
                        className="form-control"
                        id="customer"
                        value={currentOrder.customer}
                        onChange={this.onChangeCustomer}
                        >
                        </input>
                        </div>
                        <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <input
                        type="text"
                        className="form-control"
                        id="description"
                        value={currentOrder.description}
                        onChange={this.onChangeDescription}
                        >
                        </input>
                        </div>
                        <div className="form-group">
                            <label>
                                <strong>Status:</strong>
                            </label>
                            {currentOrder.readiness ? "Ready" : "Not ready"}
                        </div>
                    </form>
                    {currentOrder.readiness ? (
                        <button
                        className="badge badge-primary mr-2"
                        onClick={() => this.updateReadiness(false)}
                        id='Link'
                        >
                            Not ready
                        </button>
                        ) : (
                            <button
                            className="badge badge-primary mr-2"
                            onClick={() => this.updateReadiness(true)}
                            id='Link'
                            >
                            Ready
                            </button>
                        )}
                        <button
                        className="badge badge-danger mr-2"
                        onClick={this.deleteOrder}
                        id='Link'
                        >
                        Delete
                        </button>
                        <button
                        type="submit"
                        className="badge badge-success"
                        onClick={this.updateOrder}
                        id='Link'
                        >
                        Update
                        </button>
                        <p>{this.state.message}</p>
                        </div>
                        ) : (
                            <div>
                                <br />
                                <p>Please click on a Order...</p>
                            </div>
                        )}
        </div>
    );
  }
}

export default withRouter(Order);
