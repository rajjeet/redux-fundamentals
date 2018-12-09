var defaultState = 0;

function sampleReducerFunc(state = defaultState, action) {
    if (action.type === 'INCREMENT') {
        return state + 1;
    }
    return state;
}

function createStore(reducer) {
    var state;
    var subscriptions = [];

    const obj = {
        subscribe(cb) {
            subscriptions.push(cb);
            return function () {
                var index = subscriptions.indexOf(cb);
                subscriptions.splice(index, 1);
            };
        },
        getState() {
            return state;
        },
        dispatch(action) {
            state = reducer(state, action);
            subscriptions.forEach(function (fn) {
                fn();
            });
        }
    };
    obj.dispatch({type: 'REDUX_INIT'});
    return obj;
}

var store = createStore(sampleReducerFunc);

var unsub = store.subscribe(function () {
    console.log('STATE_UPDATED', store.getState());
});

console.log('state:before', store.getState());
store.dispatch({type: 'INCREMENT'});
console.log('state:after', store.getState());

unsub();
store.dispatch({type: 'INCREMENT'});

