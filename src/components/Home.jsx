import React from 'react';
import { Link } from 'react-router-dom';

export default () => {

  return (
    <div id="home" className="currency_calculations">
    	<div id="form">
    		<div className="row">
    			<div><label>If you want to check currency prices from one currency to other then use this <span className="chart_type">Area Chart</span></label></div>
    			<div><Link to="/CurrencyConversions">Currency Conversions</Link></div>
    		</div>

    		<div className="row">
    			<div><label>If you want to check currency prices from one currency to many other then use this <span className="chart_type">Line Chart</span></label></div>
    			<div><Link to="/CurrencyProgressions">Currency Progressions</Link></div>
    		</div>


    		<div className="row">
    			<div><label>If you want bitcoin prices for recent 10 changes then use this <span className="chart_type">Bar Chart</span></label></div>
    			<div><Link to="/BitcoinHistory">Bitcoin History</Link></div>
    		</div>
    	</div>
    </div>
  )
};