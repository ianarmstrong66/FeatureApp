import React, { Component } from 'react';
import './App.css';
import FeatureContainer from './Component/FeatureContainer';


class App extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         tableData: [],
    //         featureName: "",
    //         toggleName:"",
    //         enabledDisabled: "",
    //         retrievedData: [],
    //         featureIDSelected: 0,
    //         checked : false,
    //         appID: 0
    //     }
    // };

    render() {
        return (
            <div className="App">
                <FeatureContainer />
            </div>
        );
    }
}

export default App;
