import React, { Component } from 'react';
import loginService from '../service/GetAccessStatusService';
import ApplicationService from '../service/GetApplicationsService';

const divStyle = {
  marginBottom: '7px',
  marginRight: '27px'
};

class LoginComponent extends Component {
  state = {
    loginName: "",
    pword: "",
    appList: [],
    selectedApp: "",
    appID: 0
  };

  componentDidMount = async () => { //could use WillMount
    await ApplicationService.executeGetService()
        .then((response) => {
          return response.data;
        })
        .then(data => {
          let AppsFromApi = [];
          var id;
          var display;
          for (let i = 0; i < Object.entries(data).length; i++){
            [id,display] = Object.entries(data)[i];
            id = parseInt(id);
            AppsFromApi.push({id,display});
          }

          this.setState({ appList: [{id:'', display: 'Select an application'}].concat(AppsFromApi) });
          window.sessionStorage.setItem("featureAllowed", false);
        })
        .catch(error => console.log(error.response));
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleAppsChange = event => {
    this.setState({ selectedApp: event.target.value });
    this.setState({ appID: event.target.value });
    // console.log(event.target.value)
  };

  handleSubmit = event => {
    event.preventDefault();
    loginService.executeGetService(this.state.loginName, this.state.pword)
      .then(res => {
        return res.data;
      }).then(data => {
        if (data === false) {
          this.setState( {
            loginName: "",
            pword: "",
            selectedApp: "",
            appList: []
          });
          window.alert("Incorrect credentials. Please try again.");
          this.props.history.push('/login')
        }
        else {
          window.sessionStorage.setItem("applicationID", this.state.selectedApp);
          window.sessionStorage.setItem("featureAllowed", true);
          // console.log("Response is " + data + " and props offers "+ this.props);
          this.props.history.push('/Management')
        }
      })
  };

  render() {
    return (
      <div>
        <h1>Please log in</h1>
        <br />
        <form className="form-group" onSubmit={this.handleSubmit}>
          <div>
            <label>
              <input required className="form-control" type="text" name="loginName" placeholder="User Name" onChange={this.handleChange} />
            </label>
          </div>
          <div>
            <label>
              <input required className="form-control" type="password" name="pword" placeholder="Password" onChange={this.handleChange} />
            </label>
          </div>
          <div>
            <select required className="custom-select" id="appList"  value={this.state.selectedApp} onChange={this.handleAppsChange} >
              {(this.state.appList && this.state.appList.length > 0) && this.state.appList.map((schema) =>
                  <option key={schema.id} value={schema.id}>{schema.display}</option>)}
            </select>

          </div>
          <br />
          <button style={divStyle} className="btn btn-success" type="submit">Login</button>
        </form>
      </div>
    )
  }
}

export default LoginComponent