import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend } from 'recharts';

import { getRecords, MONTHS, COUNTRY_CODES, COLOR_CODES } from './../actions/index';

class CurrencyProgressions extends Component{

	constructor(props){
		super(props);

		this.state = {
			baseCurrency: '',
			countries: [],
			fromDate: '',
			toDate: '',
			isValid: false,
			isSubmit: false
		}
	}

	render(){
		return(
			<div id="currency_progressions" className="currency_calculations">
				<div className="form">
					<div className="row">
						<div><Link to="/">Home</Link></div>						
					</div>
					<div className="row">
						<div><label className={  (!this.state.isValid && this.state.isSubmit ? 'error' : '')}>Please select all the fields</label></div>						
					</div>

					<div className="row">
						<div><label>Base Currency</label></div>
						<div>
							<select name="baseCurrency" id="baseCurrency" onChange={ this.onChangeCurrency }>
								<option>Choose Base Currency</option>
								{ 
									COUNTRY_CODES.map(( code, index ) => 
										<option value={ code } key= { index }>{ code }</option>
									)
								}
							</select>
						</div>
					</div>

					<div className="row">
						<div><label>Choose Countries for Comparision</label></div>
						<div>
							{ 
								COUNTRY_CODES.map(( code, index ) => 
									<div>
										<input type="checkbox" name="countries" id={ code } key={ index } value={ code } onChange={ this.onChange }/><label>{ code }</label>
									</div>
								)
							}
						</div>
					</div>

					<div className="row">
						<div><label>From Date</label></div>
						<div><input type="date" id="progessionFromDate" name="progessionFromDate" onChange={ this.onDateChange }></input></div>
					</div>

					<div className="row">
						<div><label>To Date</label></div>
						<div><input type="date" id="progressionToDate" name="progressionToDate" onChange={ this.onDateChange }></input></div>
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
						<LineChart width={ 400 } height={ 400 } data={ this.props.response }>
		    				<XAxis dataKey="name" />
		    				{ this.state.countries.map( ( countryCode, index ) => <Line type="monotone" dataKey={ countryCode } stroke={ COLOR_CODES[ countryCode ] } strokeDasharray="5 5" key={ index } />)}
		    				<Tooltip />
  							<Legend />
		  				</LineChart> :
		  				null
				}
				
			</div>
		)
	}

	onChangeCurrency = ( event ) => {
		this.setState({
			baseCurrency: event.target.value
		} )
	}

	onChange = ( event ) => {
		let selectedCountries = [];
		var items=document.getElementsByName('countries');
		for( var i=0; i<items.length; i++ ){
			if( items[i].type === 'checkbox' && items[i].checked )
				selectedCountries.push(items[i].value);
		}
		console.log(selectedCountries);
		this.setState({
			countries: selectedCountries
		})
	}

	onDateChange = ( event ) => {
		let fieldName = event.target.id;
		let fieldValue = event.target.value;
		if( fieldName === 'progessionFromDate' ){
			let d = new Date(fieldValue);
			d.setDate(d.getDate() + 5);
			document.getElementById('progressionToDate').min = d.getFullYear() + '-' + MONTHS[d.getMonth()] + '-' + ("0" + d.getDate()).slice(-2);
			document.getElementById('progressionToDate').value = '';
		}
		
		this.setState(fieldName === 'progessionFromDate' ? {
			fromDate: fieldValue
		} : {
			toDate: fieldValue
		})
	}

	onClick = ( event ) => {
		if( !this.state.baseCurrency || this.state.countries.length === 0 || !this.state.fromDate || !this.state.toDate ) {
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
		let countries = '';
		this.state.countries.forEach(function(countryCode){
			return countries = countries + "," + countryCode;
		})
		console.log(countries);
		this.props.getRecords( 'USD', null, this.state.fromDate, this.state.toDate, countries.substring(1) );
	}
}


const mapStateToProps = state => {
	return { 
		response: state.progressionResponse,
		error: state.error
	 };
};

const mapDispatchToProps = (dispatch) => {
	return{
		getRecords: ( fromCountry, toCountry, fromDate, toDate, countries ) => dispatch(getRecords( fromCountry, toCountry, fromDate, toDate, countries ))
	}
	
}

export default connect(mapStateToProps, mapDispatchToProps)(CurrencyProgressions);