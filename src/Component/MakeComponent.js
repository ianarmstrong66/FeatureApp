import React, { Component } from 'react';

import PostFeatureService from '../service/PostFeatureService';
import './Styles/Make.css'
const divStyle = {
    marginBottom: '7px',
    marginRight: '27px'
};

class MakeComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            appID: 0,
            featureName: "",
            toggleName:"",
            checked: false
        }
    };

    handleSubmit = event => {
        if (window.sessionStorage.getItem("featureAllowed") === "false") {
            this.props.history.push('/login');
        }
        else {
            event.preventDefault();
            PostFeatureService.executePostService(
                {"appID": window.sessionStorage.getItem("applicationID"),
                    "featureName": this.state.featureName,
                "toggleName": this.state.toggleName,
                "checked": this.state.checked})
            .then(res => {
                this.props.history.push('/Management')
            })
        }
    };

    handleCancel () {
        // if (window.confirm("Are you sure you want to cancel?")){
            this.props.history.push('/Management')
        // }
    };

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    render() {
        // if (window.sessionStorage.getItem("featureAllowed") === "false") {
        //     this.props.history.push('/login');
        // }
        return (
            <div>
                <h1>Add Feature</h1>
                <br />
                <form className="form-group" onSubmit={this.handleSubmit}>
                    <div>
                        <label>
                            <input required className="form-control" type="text" name="featureName"
                                   onChange={this.handleChange} placeholder="Friendly Name" />
                        </label>
                    </div>
                    <div>
                        <label>
                            <input required className="form-control" type="text" name="toggleName"
                                   onChange={this.handleChange} placeholder="Code tag name"  />
                        </label>
                    </div>
                    <div>
                        <br />
                        <button style={divStyle}  className="btn btn-success" type="submit">Save</button>
                        <button style={divStyle}  className="btn btn-cancel" type="button" onClick={this.handleCancel}>Cancel</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default MakeComponent