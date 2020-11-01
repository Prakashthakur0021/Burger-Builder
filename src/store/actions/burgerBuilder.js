import * as actionTypes from './actionTypes'
import axios from "../../axios-orders";

export const addIngredient = (name) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: name
    }
}
export const removeIngredient = (name) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: name
    }
}

export const setIngredient = (ingredients) => {
    return {
        type: actionTypes.SET_INGREDIENTS,
        ingredients: ingredients
    }
}

export const fetchActionFailed = () =>{
    return {
        type: actionTypes.FETCH_INGREDIENTS_FAILED,
    }
}

export const initIngredient = () => {
    return dispatch => {
    axios
    .get("https://react-burger-4a92a.firebaseio.com/ingredients.json")
    .then((res) => {
        dispatch(setIngredient(res.data))
    })
    .catch((error) => {
        dispatch(fetchActionFailed())
    });
    }
}