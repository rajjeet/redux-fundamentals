import {createStore, applyMiddleware} from "redux";
import {createLogger} from 'redux-logger';
import thunk from 'redux-thunk';

var defaultState = {
    originAmount: '100',
    destinationAmount: '0.00',
    conversionRate: 1
};

function amount(state = defaultState, action) {
    if (action.type === 'CHANGE_ORIGIN_AMOUNT'){
        // return Object.assign({}, state, {originAmount: action.data})
        return {...state, originAmount: action.data.newAmount}
    } else if (action.type === 'RECEIVED_CONVERSION_RATE') {
        return {
            ...state,
            conversionRate: action.data.xRate,
            destinationAmount: action.data.destAmount
        }
    }
    return state;
}


var logger = createLogger({
    collapsed: true
});

var store = createStore(amount, applyMiddleware(thunk, logger));

export default store;