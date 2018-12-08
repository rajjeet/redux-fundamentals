import {applyMiddleware, createStore} from "redux";
import {createLogger} from 'redux-logger';
import thunk from 'redux-thunk';

var defaultState = {
    originAmount: '100',
    destinationAmount: '0.00',
    conversionRate: 1,
    feeAmount: 0.00,
    totalCost: 0.00
};

function amount(state = defaultState, action) {
    if (action.type === 'CHANGE_ORIGIN_AMOUNT') {
        // return Object.assign({}, state, {originAmount: action.data})
        return {...state, originAmount: action.data.newAmount}
    } else if (action.type === 'RECEIVED_CONVERSION_RATE_SUCCESS') {
        return {
            ...state,
            conversionRate: action.data.xRate,
            destinationAmount: action.data.destAmount
        }
    } else if (action.type === 'RECEIVED_FEES_SUCCESS') {
        const newTotal = parseFloat(state.originAmount) + parseFloat(action.data.feeAmount);

        return {
            ...state,
            feeAmount: action.data.feeAmount,
            totalCost: newTotal
        }
    }

    return state;
}


var logger = createLogger({
    collapsed: true
});

var store = createStore(amount, applyMiddleware(thunk, logger));

export default store;