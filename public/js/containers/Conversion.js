import React from 'react';
import axios from 'axios';
import debounce from 'lodash.debounce';
import {connect} from 'react-redux';
import FeesTable from "../components/FeesTable";
import * as actions from '../actions/actions';

class Conversion extends React.Component {
    constructor(props) {
        super(props);

        this.handleOriginAmountChange = this.handleOriginAmountChange.bind(this);
        this.handleDestAmountChange = this.handleDestAmountChange.bind(this);
        this.handleOriginCurrencyChange = this.handleOriginCurrencyChange.bind(this);
        this.handleDestCurrencyChange = this.handleDestCurrencyChange.bind(this);
    }

    componentDidMount() {
        this.originAmountInput.focus();
    }

    handleOriginCurrencyChange(event) {
        const newCurrency = event.target.value;

        this.props.dispatch(actions.changeOriginCurrency(newCurrency));

        const payload = {
             originAmount: this.props.originAmount,
            originCurrency: newCurrency,
            destCurrency: this.props.destinationCurrency,
            calcOriginAmount: false
        };

        this.props.dispatch(actions.fetchConversionRate(payload));

        let feePayload = {
            originAmount: this.props.originAmount,
            originCurrency: newCurrency,
            destCurrency: this.props.destinationCurrency
        };

        this.props.dispatch(actions.fetchFees(feePayload));
    }

    handleDestCurrencyChange(event) {
        const newCurrency = event.target.value;

        this.props.dispatch(actions.changeDestCurrency(newCurrency));

        const payload = {
            originAmount: this.props.originAmount,
            originCurrency: this.props.originCurrency,
            destCurrency: newCurrency,
            calcOriginAmount: true
        };

        this.props.dispatch(actions.fetchConversionRate(payload));

        let feePayload = {
            originAmount: this.props.originAmount,
            originCurrency: this.props.originCurrency,
            destCurrency: newCurrency
        };

        this.props.dispatch(actions.fetchFees(feePayload));
    }

    handleOriginAmountChange(event) {
        let  newAmount = event.target.value;

        newAmount = newAmount.replace(',', '');

        this.props.dispatch(actions.changeOriginAmount(newAmount));

        var payload = {
            originAmount: newAmount,
            originCurrency: this.props.originCurrency,
            destCurrency: this.props.destinationCurrency,
            calcOriginAmount: false
        };

        this.props.dispatch(actions.fetchConversionRate(payload));

        let feePayload = {
            originAmount: newAmount,
            originCurrency: this.props.originCurrency,
            destCurrency: this.props.destinationCurrency
        };

        this.props.dispatch(actions.fetchFees(feePayload));
    }

    handleDestAmountChange(event) {
        let newAmount = event.target.value;

        newAmount = newAmount.replace(',', '');

        this.props.dispatch(actions.changeDestinationAmount(newAmount));

        const payload = {
            originAmount: this.props.originAmount,
            originCurrency: this.props.originCurrency,
            destCurrency: this.props.destinationCurrency,
            destAmount: newAmount,
            calcOriginAmount: true
        };

        this.props.dispatch(actions.fetchConversionRateAndFees(payload));

    }

    render() {
        if (this.props.errorMsg) {
            const errorMsg = <div className="errorMsg">{this.props.errorMsg}</div>
        }

        return (
            <div>
                {errorMsg}
                <label>Convert</label>&nbsp;
                <input className="amount-field" ref={input => this.originAmountInput = input}
                       onChange={this.handleOriginAmountChange} value={this.props.originAmount}/>
                <select value={this.props.originCurrency} onChange={this.handleOriginCurrencyChange}>
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                    <option value="JPY">JPY</option>
                </select>
                to <input className="amount-field" onChange={this.handleDestAmountChange}
                          value={this.props.destinationAmount}/>&nbsp;
                <select value={this.props.destinationCurrency} onChange={this.handleDestCurrencyChange}>
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                    <option value="JPY">JPY</option>
                </select>


                <br/><br/><br/>
                <FeesTable
                    originCurrency={this.props.originCurrency}
                    destinationCurrency={this.props.destinationCurrency}
                    conversionRate={this.props.conversionRate}
                    fee={this.props.feeAmount}
                    total={this.props.totalCost}
                />
            </div>
        )
    }
}

const mapStateToProps = (state, props) => {
    const {amount, error} = state;
    return {
        originAmount: amount.originAmount,
        originCurrency: amount.originCurrency,
        destinationAmount: amount.destinationAmount,
        destinationCurrency: amount.destinationCurrency,
        conversionRate: amount.conversionRate,
        feeAmount: amount.feeAmount,
        totalCost: amount.totalCost,
        errorMsg: error.errorMsg,
    };
};

export default connect(mapStateToProps)(Conversion);
