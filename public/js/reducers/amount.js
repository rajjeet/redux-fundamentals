import {ActionTypes} from "../actions/actionTypes";

let defaultState = {
    originAmount: '100',
    destinationAmount: '94',
    conversionRate: 0.94,
    feeAmount: 0.00,
    totalCost: 0.00,
    originCurrency: 'USD',
    destinationCurrency: 'EUR'
};

export function amount(state = defaultState, action) {
    switch (action.type) {

        case (ActionTypes.CHANGE_ORIGIN_AMOUNT):
            return {...state, originAmount: action.data.newAmount};

        case (ActionTypes.CHANGE_ORIGIN_CURRENCY):
            return {...state, originCurrency: action.data.newCurrency};

        case (ActionTypes.CHANGE_DEST_CURRENCY):
            return {...state, destinationCurrency: action.data.newCurrency};

        case (ActionTypes.CHANGE_DEST_AMOUNT):
            return {...state, destinationAmount: action.data.newAmount};

        case ('RECEIVED_CONVERSION_RATE_SUCCESS'):
            return {
                ...state,
                conversionRate: action.data.xRate,
                destinationAmount: action.data.destAmount,
                originAmount: action.data.originAmount
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
