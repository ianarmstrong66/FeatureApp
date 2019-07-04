import React, { Component } from 'react';
import FeaturesService from '../service/GetFeaturesService';
// import CheckAuthentication from '../service/CheckAuthentication';
import Switch from "react-switch";
import './Styles/Manage.css'
// import ReactTable from "react-table";
// import JsonTable from "react-json-table";
// import "react-table/react-table.css";
// import Hamoni from "hamoni-sync";

const divStyle = {
    marginBottom: '7px',
    marginRight: '27px'
};

class ManagementComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            retrievedData: [],
            featureIDSelected: 0,
            featureName: "",
            checked : false,
            appID: 0
        }
    };


    componentDidMount = async () => {
         await FeaturesService.executeGetService(window.sessionStorage.getItem("applicationID"))
             .then(res => {
                 this.setState({ retrievedData: (res) });
                 let topRow = JSON.parse([this.state.retrievedData[0]].toString());
                                  console.log("topRow: "+ topRow);
                 const {appID:applicationID} = topRow;
                 console.log("Acceptable: "+ applicationID);

                 this.setState({appID : applicationID});
                console.log("state: " + this.state.retrievedData[0] + " length: "+ topRow +" " + this.state.appID);
            })
            .catch(function (error) {  // may want to use res as this will return an error
                if (error.response) {
                    alert('Code: ' + error.response.data.error.code +
                        '\r\nMessage: ' + error.response.data.error.message);
                } else {
                    console.log('Error', error.message);
                }
            });
    };

    handleChange = event => {
        if (event.target.name === "featureName")
            this.setState({ featureName: event.target.value });
        if (event.target.name === "enabledDisabled")
                this.setState({ enabledDisabled: event.target.value });
    };

    // handleSubmit = event => {    this.listPrimitive.push({        firstName: this.state.firstName,        lastName: this.state.lastName    });
    // this.setState({ firstName: "", lastName: "" });
    // event.preventDefault();
    // };

    handleSubmit = event => {
        event.preventDefault();
    };

    handleAdd = event => {

        this.props.history.push('/Make');
    };

    handleClose = event => {

        if (window.confirm("Are you sure you want to exit?")) {
            window.close();
        }
    };

    handleToggleChange(checkedNew){
        this.setState({checked : checkedNew});
    };

    static columns () {
        return [
            {key: 'featureName', label: 'Feature Name'},
            {key: 'enabled', label: 'Enabled'},
            {key: 'color', label: 'Color', cell: (obj, key) => {
                    return <span>{ obj[key] }</span>;
                }}
        ];
    };

    // renderEditable = cellInfo => {
    //     return (
    //         <div style={{ backgroundColor: "#eafafa" }} contentEditable suppressContentEditableWarning
    //              onBlur={e => {
    //                 var data = [...this.state.retrievedData];
    //                 data[cellInfo.index][cellInfo.column.id] = e.target.innerHTML;
    //                 this.setState({ data });
    //              }}
    //             dangerouslySetInnerHTML={{ __html: this.state.retrievedData[cellInfo.index][cellInfo.column.id] }}      />
    //             );
    // };

    renderCheck(checkData) {
        // console.log("Rendering Table toggle");
        return (
            <input type="checkbox" checked={checkData}/>
        );
    }
    renderToggle(checkData) {
        // console.log("Rendering Table toggle");
        return (
            <label htmlFor="normal-switch">
                <Switch
                onChange={this.handleToggleChange}
                checked={checkData}
                id="normal-switch"
                />
            </label>
            );
    }

    renderRow() {
        // console.log("Rendering Table Row");
        let rows = [];
        let derivedHTMLForRow = "";

        for (let i = 0; i < this.state.retrievedData.length; i++){

            let featureLine = JSON.parse(this.state.retrievedData[i]);
            const {featureID, featureName, enabled} = featureLine;
            rows.push({"SelectedCheck":false,"id":featureID, "featureName":featureName, "enabled":enabled});
            derivedHTMLForRow += <tr key={ rows[i].id}>
                <td>{this.renderCheck(rows[i].SelectedCheck)}</td>
                <td> feature</td>
                <td>{this.renderToggle(rows[i].enabled)} </td>
            </tr>;
        }
        return(
            derivedHTMLForRow
            );
    }

    renderTableBody() {
        // console.log("Rendering Table Body");
        return (
            <tbody>
            {this.renderRow()}
            </tbody>
        )
    }
    renderTableHeader() {
        // JSON.stringify(Object.values(data)[i]);
        // console.log("Before: " + this.state.retrievedData);
        let header = {"row":this.state.retrievedData[0]};
        // console.log("row " + header);
        // let header2 = JSON.parse((header));

        // console.log("Header: " + header );
        // return header.map((key, index) => {
        //     return <th key={index}>{key.toUpperCase()}</th>
        // })retrievedData: [],
        //             featureIDSelected: 0,
        //             featureName: "",
        //             checked : false,
        //             appID: 0
        return (
            <tr>
                <th key="SelectedCheck"></th>
                <th key="FeatureName">FEATURE NAME  </th>
                <th key = "enabled" >  ENABLED </th>
            </tr>
        )
    }

    renderTable() {
        console.log("Render Table: " + this.state.checked);
        let featureRow = Object.values(this.state.retrievedData);
        return featureRow.map((featurex) => {
            const {featureID, featureName, enabled} = JSON.parse(featurex); //destructuring
            return (
                <tr key={featureID}>
                    <td>{this.renderCheck(false)}</td>
                    <td>{featureName} </td>
                    <td>{this.renderToggle(enabled)}</td>
                </tr>
            )
        })
    };

    render() {
        if (window.sessionStorage.getItem("featureAllowed") === "false") {
            this.props.history.push('/login');
        }

            if (this.state.retrievedData !== null){  //Put in to give option to add a feature
                return (
                    <div>
                    <br />
                    <div className="App">
                        <header className="App-header">
                            <h1 className="App-title">Feature Management</h1>
                        </header>
                        <div>
                            <table id={'featuresTable'}>
                                <tbody>
                                    {this.renderTableHeader()}
                                    {this.renderTable()}
                                </tbody>
                            </table>
                        </div>
                        <div>
                            <br />
                        </div>
                        <div id="btn-container">
                            <button style={divStyle}
                                    className="btn btn-success"
                                    type="submit"
                                    onClick={this.handleSubmit}>Save</button>

                            <button style={divStyle}
                                    className="btn btn-add"
                                    type="add"
                                    onClick={this.handleAdd}>Add</button>
                            <button style={divStyle}
                                    className="btn btn-close"
                                    type="close"
                                    onClick={this.handleClose}>Close</button>
                        </div>
                    </div>
                </div>
                )}
            else {
                return (
                <div>
                    <br/>
                    <div className="App">
                        <header className="App-header">
                            <h1 className="App-title">Feature Management</h1>
                        </header>
                        <div>
                            <h2 className="NoTable">No Records found. We suggest using the Add button</h2>
                        </div>
                        <div>
                            <button style={divStyle} className="btn btn-add" type="submit" onClick={this.handleAdd}>Add</button>
                            <button style={divStyle} type="close" onClick={this.handleClose}>Close</button>
                        </div>
                    </div>
                </div>
                )}
    }
}

export default ManagementComponent