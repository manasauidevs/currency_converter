import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

import { getBitcoinRecords } from './../../actions/index';

class BitcoinHistory extends Component{
	constructor( props ){
		super( props );

		this.props.getBitcoinRecords();
	}

	render(){
		return(
			<div id="bitcoin_history" className="currency_calculations">
				<div className="form">
					<div className="row">
						<div><Link to="/">Home</Link></div>						
					</div>
				</div>

				{
					this.props.error ? 
						<div className="error">{ this.props.error }</div> :
						null
				}

				{
					this.props.response && this.props.response.startDate ? 
						<div className="bitcoin-start-date">Latest data shown is for <span>{this.props.response.startDate}</span> and older</div> :
						null
				}

				{
					this.props.response && this.props.response.data ?
						<BarChart width={ 800 } height={ 400 } data={ this.props.response.data }  type="category">
							<CartesianGrid strokeDasharray="3 3" />
		    				<XAxis dataKey="name" style={{fontSize: '12px', fontWeight: "600"}} allowDataOverflow={true} type="category" tickSize={10} tickCount={10}/>
		    				<YAxis />
		    				<Tooltip />
  							<Legend />
		    				<Bar type="monotone" dataKey="price" fill="#8884d8"/>
		    				
		  				</BarChart> :
		  				null
				}
			</div>
		)
	}
}


const mapStateToProps = state => {
	return { 
		response: state.bitcoinResponse,
		error: state.error
	 };
};

const mapDispatchToProps = (dispatch) => {
	return{
		getBitcoinRecords: (  ) => dispatch(getBitcoinRecords(  ))
	}
	
}

export default connect(mapStateToProps, mapDispatchToProps)(BitcoinHistory);