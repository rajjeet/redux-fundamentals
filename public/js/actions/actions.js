import axios from "axios";
import debounce from 'lodash.debounce';

export function changeOriginAmount(newAmount) {
    return {
        type: 'CHANGE_ORIGIN_AMOUNT', data: {newAmount: newAmount}
    };
}
export function fetchConversionRate(payload) {
    return (dispatch) => {
        makeConversionAjaxCall(dispatch, payload);
    }
}

const makeConversionAjaxCall = debounce(_makeConversionAjaxCall, 300);

function _makeConversionAjaxCall(dispatch, payload) {
    dispatch({type: "REQUEST_CONVERSION_RATE", data: payload});

    axios.get('/api/conversion', {
        params: payload
    })
        .then((resp) => {
            dispatch({type: "RECEIVED_CONVERSION_RATE_SUCCESS", data: resp.data});
        })
        .catch((err) => {
            dispatch({type: "RECEIVED_CONVERSION_RATE_FAILURE", data: resp});
        });
}

export function fetchFees(payload) {
    return (dispatch) => {
        makeFeeAjaxCall(dispatch, payload);
    }
}

const makeFeeAjaxCall = debounce(_makeFeeAjaxCall, 300);

function _makeFeeAjaxCall(dispatch, payload) {
    dispatch({type: "REQUEST_FEES", data: payload});

    axios.get('/api/fees', {
        params: payload
    })
        .then((resp) => {
            dispatch({type: "RECEIVED_FEES_SUCCESS", data: resp.data});
        })
        .catch((err) => {
            dispatch({type: "RECEIVED_FEES_FAILURE", data: resp});
        });
}

