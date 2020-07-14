import React, { Component } from 'react';
import Autocomplete from 'react-google-autocomplete';

import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link
  } from "react-router-dom";
class Post extends Component {
    constructor( props ){
        super( props );
        const addressArray = JSON.parse(localStorage.getItem("newAddress"))
		this.state = {
			title: addressArray.address,
            address: addressArray.address,
            allSaved:JSON.parse(localStorage.getItem("addressArray")) || [],
            postArray:addressArray,
            value:""
		}
    }
     handleInput = (e) =>{
       const {value,name} = e.target
       this.setState({[name]:value})
    }
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
     }
     setLocation(text) {
        this.placesRef && this.placesRef.setAddressText(text)
      }
	render() {
        console.log(this.state)
        const {title,address,} = this.state
		return(
			<div style={{ margin: '100px' }}>
                <Link to="/">Back</Link>
			    <div>
                        <label>Post Title</label>
                        <input name="title" value={title} onChange={(e)=>{this.handleInput(e)}} type="text" />
                    </div>
                    <Autocomplete
							style={{
								width: '100%',
								height: '40px',
								paddingLeft: '16px',
								marginTop: '2px',
								// marginBottom: '500px'
							}}
                            // value={this.state.value}
                            placeholder={'Event Location'}
                            onChange={value => this.setState({ value })}
                            ref={ref => {this.placesRef = ref}}
                            />
                    <div>
                        <label>Address</label>
                        <input name="address" value={address} disabled onChange={(e)=>{this.handleInput(e)}} type="text" />
                    </div>
                    <button value="Save"  onClick={()=>{this.handleSave()}}  >Save</button>
                    
			</div>
		);
	}
}

export default Post;
