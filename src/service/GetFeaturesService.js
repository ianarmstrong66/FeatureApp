import axios from 'axios'

let GETFEATURES_URL = 'http://localhost:8080/features';

class GetFeaturesService {

    executeGetService(appid){
        GETFEATURES_URL +=  "/" + appid.toString();
        return new Promise((resolve,reject) => {
            axios.get(GETFEATURES_URL)
                .then((response) => {
                    console.log("from axios in promise: ", response.data.toString());
                    var processData = [];

                    for (let i = 0; i < Object.entries(response.data).length; i++){
                        processData.push(JSON.stringify(Object.values(response.data)[i]));
                    }
                    processData = Object.values(processData);
                    // console.log("Pulling " + [processData]);
                    // this.setState({ retrievedData: (processData) });
                    // console.log("state: " + this.state.retrievedData + " length: "+ this.state.retrievedData.length);
                resolve(processData);
            }).catch((error) => {
                console.log("from apis failure", error);
                reject(error);
            });
        })
    }

// };

    // executeGetService(appid) {
    //     // var endpoint = GETFEATURES_URL + "/" + appid.toString();
    //
    //     // return fetch(endpoint);
    //
    //     let response = axios.get(GETFEATURES_URL + "/" + appid.toString());
    //     console.log("Just before returning from axios: "  + response + "  " + response.length);
    //
    //     for (let i= 0;  i < response.length; i++){
    //     let responsePromise = new response[i](function(resolve,reject) {
    //         setTimeout(() => resolve("done"), 100);
    //         if (response.length > 0) {
    //             console.log(resolve);
    //             resolve(response);
    //         }
    //         else
    //         {
    //             console.log(reject);
    //             let reason = new Error('No Data found');
    //             reject(reason);
    //         }
    //     });
    //     console.log("Promise resolved? " + responsePromise);
    //     }
    //     return response;
    // }
}

 export default new GetFeaturesService()