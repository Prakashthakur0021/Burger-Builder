import React, { Component } from 'react';
import Order from '../../components/Order/checkoutSummary/Order';
import axios from '../../axios-orders'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import * as action from '../../store/actions/index';
import {connect} from 'react-redux'

class Orders extends Component {
    
    componentDidMount() {
        this.props.onFetchOrders();
    }


render() {
    return (
        <div>
            {this.props.orders.map(order => {
                return <Order key={order.id}
                ingredients={order.ingredients}
                price={order.price}/>
            })}
        </div>
    )
}
}

const mapStateToProps = state => {
    return {
        orders: state.order.orders
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: () => dispatch(action.fetchOrders)
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(Orders,axios));