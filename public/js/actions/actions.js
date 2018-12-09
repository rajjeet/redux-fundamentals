import axios from "axios";
import debounce from 'lodash.debounce';
import {ActionTypes} from './actionTypes';

export function changeOriginCurrency(newCurrency) {
    return {
        type: ActionTypes.CHANGE_ORIGIN_CURRENCY,
        data: {newCurrency: newCurrency}
    };
}


export function changeDestCurrency(newCurrency) {
    return {
        type: ActionTypes.CHANGE_DEST_CURRENCY,
        data: {newCurrency: newCurrency}
    };
}

export function changeOriginAmount(newAmount) {
    return {
        type: ActionTypes.CHANGE_ORIGIN_AMOUNT,
        data: {newAmount: newAmount}
    };
}

export function changeDestinationAmount(newAmount) {
    return {
        type: ActionTypes.CHANGE_DEST_AMOUNT,
        data: {newAmount: newAmount}
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

export function fetchConversionRateAndFees(payload) {
    return (dispatch) => {
        makeConversionAndFeesAjaxCall(dispatch, payload);
    }
}

const makeConversionAndFeesAjaxCall = debounce(_makeConversionAndFeesAjaxCall, 300);

function _makeConversionAndFeesAjaxCall(dispatch, payload) {
    dispatch({type: "REQUEST_CONVERSION_RATE", data: payload});

    axios.get('/api/conversion', {
        params: payload
    })
        .then((resp) => {
            dispatch({type: "RECEIVED_CONVERSION_RATE_SUCCESS", data: resp.data});
            let feePayload = {
                ...payload,
                originAmount: resp.data.originAmount
            };
            dispatch(fetchFees(feePayload));
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

