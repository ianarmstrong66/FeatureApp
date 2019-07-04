import axios from 'axios'

const POSTFEATURE_URL = 'http://localhost:8080/features/update';

class PostFeatureService {
    executePostService( featureName,toggleName,appID,checked) {
        const pushData = {
            "featureName":featureName,
            "toggleName":toggleName,
            "appID":appID,
            "checked":checked
        };
        return axios.post(POSTFEATURE_URL,{
            topic: 'topic',
            logs: pushData,} );
    }
}

export default new PostFeatureService()