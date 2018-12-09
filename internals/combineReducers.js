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

let defaultState = 0;

function incrementReducer(state = defaultState, action) {
    if (action.type === 'INCREMENT') {
        return state + 1;
    }
    return state;
}

function decrementReducer(state = defaultState, action) {
    if (action.type === 'DECREMENT') {
        return state - 1;
    }
    return state;
}

const rootReducer = combineReducers({
    increment: incrementReducer,
    decrement: decrementReducer
});

function combineReducers(stateTree){
    let keys = Object.keys(stateTree);

    return function rootReducer(state = {}, action) {
        for (let i = 0; i < keys.length; i++) {
            let key = keys[i];
            var reducer = stateTree[key];
            var subState = state[key];

            state[key] = reducer(subState, action);
        }
        return state;
    };
}

let store = createStore(rootReducer);

let unsub = store.subscribe(() => {
    console.log('state:before', store.getState());
});

store.dispatch({type: 'DECREMENT'});
store.dispatch({type: 'INCREMENT'});
unsub();
store.dispatch({type: 'INCREMENT'});
console.log(store.getState());

