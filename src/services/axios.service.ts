import axios from "axios";

interface IUserProfileServiceConfig {
  baseURL: string;
  method: string;
  headers: {};
  responseType: string;
}

class axiosClient {
  user_profile_service_url: string =
    "https://cortex-dev-userprofile.azurewebsites.net/api/";
  graph_url: string = "https://graph.microsoft.com/v1.0/";

  config: IUserProfileServiceConfig;

  constructor() {
    this.config = {
      baseURL: this.user_profile_service_url,
      method: "GET",
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("access_token"),
      },
      responseType: 'json'
    };
  }

  get = (url: string, graph: boolean = false) => {
    if (graph) {
      this.config.baseURL = this.graph_url;
      this.config.responseType = 'blob';
      this.config.headers = {
        Authorization: "Bearer " + sessionStorage.getItem("graph_access_token")
      }
    }

    return axios.get(url, this.config);
  };
}

export { axiosClient };
