export function changeOriginAmount(newAmount) {
    return {
        type: 'CHANGE_ORIGIN_AMOUNT', data: {newAmount: newAmount}
    };
}

