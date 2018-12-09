// Definitions
function createStore(reducer, enhancer) {

    if (typeof enhancer === "function") {
        return enhancer(createStore)(reducer);
    }

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
            return action;
        }
    };
    obj.dispatch({type: 'REDUX_INIT'});
    return obj;
}

function combineReducers(stateTree) {
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

function applyMiddleware(...middleware) {
    return function(createStore) {
        return function(reducer){
            var store = createStore(reducer);
            var oldDispatch = store.dispatch;
            //modify dispatch
            store.dispatch = middleware.reduceRight(function (prev, curr) {
                return curr(store)(prev);
            }, oldDispatch);
            return store;
        }
    }
}

// Implementation

function logger(store) {
    var getState = store.getState();
    return function (next) {
        return function (action) {
            console.log('will dispatch', action);
            var returnValue = next(action);
            console.log('state after dispatch', getState);
            return returnValue;
        };
    };
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

let store = createStore(rootReducer, applyMiddleware(logger));

let unsub = store.subscribe(() => {
    console.log('state:before', store.getState());
});

store.dispatch({type: 'DECREMENT'});
store.dispatch({type: 'INCREMENT'});
unsub();
store.dispatch({type: 'INCREMENT'});
console.log(store.getState());

