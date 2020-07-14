import React, { Component } from 'react';

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
            postArray:addressArray
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
                    <button value="Save"  onClick={()=>{this.handleSave()}} class="btn btn-primary" >Save</button> 
			</div>
		);
	}
}

export default Post;
