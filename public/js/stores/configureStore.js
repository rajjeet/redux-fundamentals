import {applyMiddleware, createStore} from "redux";
import {createLogger} from 'redux-logger';
import thunk from 'redux-thunk';

let defaultState = {
    originAmount: '100',
    destinationAmount: '0.00',
    conversionRate: 1,
    feeAmount: 0.00,
    totalCost: 0.00
};

function amount(state = defaultState, action) {
    switch(action.type){
        case ('CHANGE_ORIGIN_AMOUNT'):
            return {...state, originAmount: action.data.newAmount};
        case ('RECEIVED_CONVERSION_RATE_SUCCESS'):
            return {
                ...state,
                conversionRate: action.data.xRate,
                destinationAmount: action.data.destAmount
            };
        case ('RECEIVED_FEES_SUCCESS'):
            const newTotal = parseFloat(state.originAmount) + parseFloat(action.data.feeAmount);

            return {
                ...state,
                feeAmount: action.data.feeAmount,
                totalCost: newTotal
            };
        default:
            return state;
    }
}


const logger = createLogger({
    collapsed: true
});

const store = createStore(amount, applyMiddleware(thunk, logger));

export default store;