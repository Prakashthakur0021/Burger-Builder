import * as actionTypes from './actionTypes';
import axios from '../../axios-orders'

export const purchaseBurgerSuccess = (id, orderData) => {
    return {
        type: actionTypes.PURCASE_BURGER_SUCCESS,
        orderId: id,
        orderData: orderData
    }
}
export const purchaseBurgerFail = (error) => {
    return {
        type: actionTypes.PURCASE_BURGER_FAIL,
        error: error
    }
}

export const purchaseBurgerStart = () => {
    return {
        type: actionTypes.PURCASE_BURGER_START,
    }
}

export const purchaseBurger = (orderData) => {
    return dispactch =>  {
        dispactch(purchaseBurgerStart())
        axios
        .post("/orders.json", orderData)
        .then((res) => {
            console.log(res.data)
            dispactch(purchaseBurgerSuccess(res.data.name,orderData))
        })
        .catch((error) => {
            dispactch(purchaseBurgerFail(error))
        });
    }
}

export const purchaseInit = () => {
    return {
        type: actionTypes.PURCASE_INIT,
    }
}

export const fetchOrdersSuccess = (orders) =>{
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders: orders
    }
}

export const fetchOrdersFail = (error) =>{
    return {
        type: actionTypes.FETCH_ORDERS_FAIL,
        error: error
    }
}
export const fetchOrdersStart = () =>{
    return {
        type: actionTypes.FETCH_ORDERS_START,
    }
}

export const fetchOrders = () => {
    return dispatch => {
        dispatch(fetchOrdersStart);
        axios.get('/orders.json')
            .then(res => {
                const fetchedOrders = [];
                for(let key in res.data) {
                    fetchedOrders.push({
                        ...res.data[key],
                        id: key
                    })
                }
                dispatch(fetchOrdersSuccess(fetchedOrders))
            })
            .catch(err => {
                dispatch(fetchOrdersFail(err))
            })
    }
}