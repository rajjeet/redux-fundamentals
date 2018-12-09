import {ActionTypes} from "../actions/actionTypes";

let defaultState = {
    errorMsg: ''
};

export function error(state = defaultState, action) {
    switch (action.type) {
        case (ActionTypes.RECEIVED_CONVERSION_RATE_FAILURE):
        case(ActionTypes.RECEIVED_CONVERSION_RATE_AND_FEES_FAILURE):
        case(ActionTypes.RECEIVED_FEES_FAILURE):
            return {
                ...state,
                errorMsg: action.data.errorMsg
            };
        case (ActionTypes.RECEIVED_CONVERSION_RATE_SUCCESS):
        case(ActionTypes.RECEIVED_FEES_SUCCESS):
            return {
                ...state,
                errorMsg: ''
            };
        default:
            return state;
    }
}
