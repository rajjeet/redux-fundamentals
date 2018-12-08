import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import store from './stores/configureStore';
import Conversion from './components/Conversion.js';

class MainComponent extends React.Component {
    componentDidMount() {
        store.subscribe(() => {
            this.setState({});
        });
    }

    render() {
        return (
            <div>
                <Conversion originAmount={store.getState().originAmount}/>
            </div>
        )
    }
}


ReactDOM.render(
    <Provider store={store}>
        <MainComponent/>
    </Provider>,
    document.getElementById('container'));
 