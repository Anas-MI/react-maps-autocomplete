import React, { Component } from 'react';

import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link
  } from "react-router-dom";
import Autocomplete from 'react-google-autocomplete';

class Post extends Component {
    constructor( props ){
        super( props );
        const addressArray = JSON.parse(localStorage.getItem("newAddress"))
		this.state = {
			title: "My Pin",
            address: addressArray.address,
            allSaved:JSON.parse(localStorage.getItem("addressArray")) || [],
            postArray:addressArray
		}
    }
     handleInput = (e) =>{
       const {value,name} = e.target
       this.setState({[name]:value})
    }
    getCity = ( addressArray ) => {
		let city = '';
		for( let i = 0; i < addressArray.length; i++ ) {
			if ( addressArray[ i ].types[0] && 'administrative_area_level_2' === addressArray[ i ].types[0] ) {
				city = addressArray[ i ].long_name;
				return city;
			}
		}
	};

	getArea = ( addressArray ) => {
		let area = '';
		for( let i = 0; i < addressArray.length; i++ ) {
			if ( addressArray[ i ].types[0]  ) {
				for ( let j = 0; j < addressArray[ i ].types.length; j++ ) {
					if ( 'sublocality_level_1' === addressArray[ i ].types[j] || 'locality' === addressArray[ i ].types[j] ) {
						area = addressArray[ i ].long_name;
						return area;
					}
				}
			}
		}
	};

	getState = ( addressArray ) => {
		let state = '';
		for( let i = 0; i < addressArray.length; i++ ) {
			for( let i = 0; i < addressArray.length; i++ ) {
				if ( addressArray[ i ].types[0] && 'administrative_area_level_1' === addressArray[ i ].types[0] ) {
					state = addressArray[ i ].long_name;
					return state;
				}
			}
		}
	};
    onPlaceSelected = ( place ) => {
		console.log( 'plc', place.formatted_address );
		
		const address = place.formatted_address,
		      addressArray =  place.address_components,
		      city = this.getCity( addressArray ),
		      area = this.getArea( addressArray ),
		      state = this.getState( addressArray ),
		      latValue = place.geometry.location.lat(),
			  lngValue = place.geometry.location.lng();
			  const newAddress={
				address,latValue,lngValue,addressArray
			  }
		localStorage.setItem("newAddress", JSON.stringify(newAddress));
		this.setState({
			address: ( address ) ? address : '',
			area: ( area ) ? area : '',
			city: ( city ) ? city : '',
			state: ( state ) ? state : '',
			markerPosition: {
				lat: latValue,
				lng: lngValue
			},
			mapPosition: {
				lat: latValue,
				lng: lngValue
			},
		})
	};
    handleSave = () =>{
        const {title,address,allSaved,postArray} = this.state
        const id=allSaved.length + 1;
        const newObj={
            id,
            name:title,
            latitude:postArray.latValue,
            longitude:postArray.lngValue
        }
        const newArray=[...allSaved ,newObj]
        console.log('newArray',newArray)
        this.setState({allSaved:newArray})
        localStorage.setItem("addressArray", JSON.stringify(newArray));
        this.props.history.push('/');
     }
    
	render() {
        console.log(this.state)
        const {title,address} = this.state
		return(
			<div style={{ margin: '100px' }}>
                <Link to="/">Back</Link>
			
                    
                    <div class="form-group">
                        <label for="email">Post Title:</label>
                        <input type="text" class="form-control" placeholder="Enter Title" id="email" onChange={(e)=>{this.handleInput(e)}} value={title} name="title"/>
                    </div>
                    <div class="form-group">
                        <label for="pwd">Address:</label>
                        <input type="text" class="form-control" placeholder="Enter password" id="pwd" onChange={(e)=>{this.handleInput(e)}} value={address} name="address"/>
                    </div>
                    <Autocomplete
							style={{
								width: '100%',
								height: '40px',
								paddingLeft: '16px',
								marginTop: '0px',
								// marginBottom: '500px'
							}}
							onPlaceSelected={ this.onPlaceSelected }
							types={['(regions)']}
						/>
                    <button value="Save"  onClick={()=>{this.handleSave()}} class="btn btn-primary" >Save</button> 
			</div>
		);
	}
}

export default Post;
