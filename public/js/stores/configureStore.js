import {createStore, applyMiddleware} from "redux";
import {createLogger} from 'redux-logger';
import thunk from 'redux-thunk';

var defaultState = {
    originAmount: 100
};

function amount(state = defaultState, action) {
    if (action.type === 'CHANGE_ORIGIN_AMOUNT'){
        // return Object.assign({}, state, {originAmount: action.data})
        return {...state, originAmount: action.data.newAmount}
    }
    return state;
}


var logger = createLogger({
    collapsed: true
});

var store = createStore(amount, applyMiddleware(thunk, logger));

export default store;