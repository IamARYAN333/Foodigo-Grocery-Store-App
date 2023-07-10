import { ADD_TO_CART, REMOVE_FROM_CART, REMOVE_ONE_FROM_CART, TOTAL_COST, EMPTY_CART } from "../actions/Action";

const initialState = {
    productCart: [],
    total: 0,
};

export const CartReducer = (state = initialState, action) => {
    switch (action.type) {

        case ADD_TO_CART:
            const productIndex = state.productCart.findIndex((item) => item.id === action.payload.id);
            if (productIndex >= 0) {
                state.productCart[productIndex].qty += 1

                return {
                    ...state,
                    productCart:
                        [...state.productCart],
                    total: state.total + state.productCart[productIndex].price

                }
            }
            else {
                const temp = { ...action.payload, qty: 1 }
                return {
                    ...state, productCart: [...state.productCart, temp],
                    total: state.total + temp.price
                }
            }

        case EMPTY_CART: 
        return {
            ...state,
            productCart: []
        }

        case REMOVE_FROM_CART:
            const updatedProducts = state.productCart.filter((product) => product.id !== action.payload.id);
            return {
                ...state,
                productCart: updatedProducts
            }

        case REMOVE_ONE_FROM_CART:
            const itemIndexDec = state.productCart.findIndex((item) => item.id === action.payload.id);
            console.log(itemIndexDec);
            if (state.productCart[itemIndexDec].qty > 1) {
                state.productCart[itemIndexDec].qty -= 1;
                return {
                    ...state,
                    productCart: [...state.productCart],
                    total: state.total - state.productCart[itemIndexDec].price
                }
            } else if (state.productCart[itemIndexDec].qty === 1) {
                const itemToBeRemoved = state.productCart.find(item => item.id === action.payload.id)
                const data = state.productCart.filter((p1) => p1.id !== action.payload.id);
                const newTotalAfterRemoval = state.total - (itemToBeRemoved.price * itemToBeRemoved.qty)
                return {
                    ...state,
                    productCart: data,
                    total: newTotalAfterRemoval
                }
            }

        default:
            return state;
    }
}