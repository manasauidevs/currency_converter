import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { AreaChart, Area, XAxis, linearGradient, Tooltip } from 'recharts';

import { getRecords, MONTHS, COUNTRY_CODES } from './../actions/index';

class CurrencyConversions extends Component{
	constructor(props){
		super(props);

		this.state = {
			fromCountry: '',
			toCountry: '',
			fromDate: '',
			toDate: '',
			isValid: false,
			isSubmit: false
		}
	}

	render(){
		return(
			<div id="currency_conversions" className="currency_calculations">
				<div className="form">
					<div className="row">
						<div><Link to="/">Home</Link></div>						
					</div>
					<div className="row">
						<div><label className={  (!this.state.isValid && this.state.isSubmit ? 'error' : '')}>Please select all the fields</label></div>						
					</div>

					<div className="row">
						<div><label>From Country</label></div>
						<div>
							<select name="fromCountry" id="fromCountry" onChange={ this.onChangeCurrency }>
								<option>Choose Currency</option>
								{ 
									COUNTRY_CODES.map(( code, index ) => 
										<option value={ code } key= { index }>{ code }</option>
									)
								}
							</select>
						</div>
					</div>

					<div className="row">
						<div><label>To Country</label></div>
						<div>
							<select name="toCountry" id="toCountry" onChange={ this.onChangeCurrency }>
								<option>Choose Currency</option>
								{ 
									COUNTRY_CODES.map(( code, index ) => 
										<option value={ code } key={ index }>{ code }</option>
									)
								}
							</select>
						</div>
					</div>

					<div className="row">
						<div><label>From Date</label></div>
						<div><input type="date" id="fromDate" name="fromDate" onChange={ this.onDateChange }></input></div>
					</div>

					<div className="row">
						<div><label>To Date</label></div>
						<div><input type="date" id="toDate" name="toDate" onChange={ this.onDateChange }></input></div>
					</div>

					<div className="row">
						<div className="merge"><button onClick={ this.onClick }>Submit</button></div>
					</div>
				</div>

				{
					this.props.error ? 
						<div className="error">{ this.props.error }</div> :
						null
				}

				{
					this.props.response ?
						<AreaChart width={ 400 } height={ 400 } data={ this.props.response }>
							<linearGradient id="colorConversion" x1="0" y1="0" x2="0" y2="1">
						      <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
						      <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
						    </linearGradient>
		    				<Area type="monotone" dataKey="conversion" stroke="#8884d8" />
		    				<XAxis dataKey="name" />
		    				<Tooltip />
		  				</AreaChart> :
		  				null
				}
				
			</div>
		)
	}

	onChangeCurrency = ( event ) => {
		let fieldName = event.target.id;
		let fieldValue = event.target.value;
		this.setState(fieldName === 'fromCountry' ? {
			fromCountry: fieldValue
		} : {
			toCountry: fieldValue
		})
	}

	onDateChange = ( event ) => {
		let fieldName = event.target.id;
		let fieldValue = event.target.value;
		if( fieldName === 'fromDate' ){
			let d = new Date(fieldValue);
			d.setDate(d.getDate() + 5);
			document.getElementById('toDate').min = d.getFullYear() + '-' + MONTHS[d.getMonth()] + '-' + ("0" + d.getDate()).slice(-2);
			document.getElementById('toDate').value = '';
		}
		
		this.setState(fieldName === 'fromDate' ? {
			fromDate: fieldValue
		} : {
			toDate: fieldValue
		})
	}

	onClick = ( event ) => {
		if( !this.state.fromCountry || !this.state.toCountry || !this.state.fromDate || !this.state.toDate ) {
			this.setState({
				isValid: false,
				isSubmit: true
			});
			return true;

		}
		this.setState({
			isValid: true,
			isSubmit: true
		})
		this.props.getRecords( this.state.fromCountry, this.state.toCountry, this.state.fromDate, this.state.toDate );
	}
}

const mapStateToProps = state => {
	return { 
		response: state.conversionResponse,
		error: state.error
	 };
};

const mapDispatchToProps = (dispatch) => {
	return{
		getRecords: ( fromCountry, toCountry, fromDate, toDate ) => dispatch(getRecords( fromCountry, toCountry, fromDate, toDate
		 ))
	}
	
}

export default connect(mapStateToProps, mapDispatchToProps)(CurrencyConversions);