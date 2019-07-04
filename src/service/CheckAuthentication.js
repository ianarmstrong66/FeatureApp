import React, { Component } from 'react';

// class CheckAuthentication extends Component{
//     executeValidation{
const validated = window.sessionStorage.getItem("featureAllowed");
console.log("Validating");
if (!validated){
    this.props.history.push('/login');
}

// export default new CheckAuthentication()