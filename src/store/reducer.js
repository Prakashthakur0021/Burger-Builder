import * as actionTypes from './actions'

const initialState = {
    ingredients: {
        salad: 0,
        bacon:0,
        cheese:0,
        meat:0,
    },
    totalPrice: 20,
}

const INGREDIENT_PRICE = {
    salad: 10.5,
    bacon: 40.34,
    cheese: 10.29,
    meat: 20.4,
};

const reducer = (state= initialState, action) => {
    switch(action.type) {
        case actionTypes.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName] : state.ingredients[action.ingredientName] + 1
                },
                totalPrice: state.totalPrice + INGREDIENT_PRICE[action.ingredientName]
            }
        case actionTypes.REMOVE_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName] : state.ingredients[action.ingredientName] - 1
                },
                totalPrice: state.totalPrice - INGREDIENT_PRICE[action.ingredientName]
            }
        default: 
            return state;
    }
    
}

export default reducer;