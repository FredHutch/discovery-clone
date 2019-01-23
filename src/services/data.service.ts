import { axiosClient } from "./axios.service";

class DataService{

    httpClient:axiosClient;
    esApiUrl: string;

    constructor(){
        this.httpClient =new axiosClient();
        this.esApiUrl = "https://kprb6vlx2f.execute-api.us-west-2.amazonaws.com/development/essearch";
    }

    getFacets(callback : Function){
        this.httpClient.get(this.esApiUrl+"?t=facets").then((response : any) => {
            callback(response.data['aggregations']);
        });
    }
}

export default DataService;