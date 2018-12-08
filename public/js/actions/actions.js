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

var makeConversionAjaxCall = debounce(_makeConversionAjaxCall, 300);

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



