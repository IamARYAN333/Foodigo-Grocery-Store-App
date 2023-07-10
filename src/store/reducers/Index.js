import { combineReducers } from "redux";
import { CartReducer } from "./CartReducer";

const rootReducer = combineReducers({
    CartReducer : CartReducer,
})

export default rootReducer;