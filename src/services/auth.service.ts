import { UserAgentApplication } from "msal";
import { axiosClient } from "./axios.service";



enum AuthenticationState {
  Unauthenticated,
  Authenticating,
  Authenticated
}

interface IApplicationConfig {
  clientID: string;
  authority: string;
}

class AuthService {
  applicationConfig: IApplicationConfig;
  scopes: string[];
  graphScopes: string[];
  client: UserAgentApplication;
  redirectLoginInfo: any;
  photoUrl: string;

  constructor() {
    this.photoUrl = "";
    this.applicationConfig = {
      clientID: "0d1b1c77-999b-41c3-ae57-5297dd6c3e02",
      authority: "https://login.microsoftonline.com/fredhutch.onmicrosoft.com"
    };

    this.scopes = [
      "openid",
      "9e28acc9-dc44-461c-9438-6708bcc2a035/user_impersonation"
    ];

    this.graphScopes = ["User.Read"];

    this.client = new UserAgentApplication(
      this.applicationConfig.clientID,
      this.applicationConfig.authority,

      (errorDesc: string, token: string, error: string, tokenType: string) => {
        this.redirectLoginInfo = {
          error,
          errorDesc,
          token,
          tokenType
        };
      },
      {
        //redirectUri: "https://discovery-poc.fredhutch.org",
        cacheLocation: "sessionStorage",
        storeAuthStateInCookie: true
      }
    );

    // if (this.redirectLoginInfo) {
    //   if (this.redirectLoginInfo.token) {
    //     this.getTokenSilent("access_token");
    //   }
    // }
    // this.redirectCallback = this.redirectCallback.bind(this);
    // this.getTokenSilent = this.getTokenSilent.bind(this);
  }

  // redirectCallback(
  //   errorDesc: string,
  //   token: string,
  //   error: string,
  //   tokenType: string
  // ) {
  //   //will be overridden by implementer
  //   this.redirectLoginInfo = {
  //     error,
  //     errorDesc,
  //     token,
  //     tokenType
  //   };

  //   if (tokenType == "id_token") {
  //     this.getTokenSilent("access_token").then(token => {
  //       console.log(token);
  //     });
  //   }
  // }

  login = () => {
    this.client.loginRedirect(this.scopes);
  };

  logout = () => {
    this.client.logout();
  };

  getTokenSilent = (tokenType: string) => {
    return this.client.acquireTokenSilent(
      tokenType == "id_token" ? [this.applicationConfig.clientID] : this.scopes
    );
    // .then((access_token) => {

    //   sessionStorage.setItem(
    //     "access_token",
    //     access_token
    //   );

    //   sessionStorage.setItem(
    //     "authState",
    //     AuthenticationState[AuthenticationState.Authenticated]
    //   );
    //   //console.log(access_token);
    // });
  };

  getGraphTokenSilent = () => {
    return this.client.acquireTokenSilent(this.graphScopes);
  };

  getUser = () => {
    return this.client.getUser();
  };

  getPhoto = (size: string, callback: Function) => {
    if (this.photoUrl != "") {
      callback(this.photoUrl);
      return;
    }

    let httpClient = new axiosClient();
    httpClient.get(`/me/photo/$value`, true).then(response => {
      let url = window.URL || (window as any).webkitURL;
      let blobUrl = url.createObjectURL(
        response.data
      );

      callback(blobUrl);
    });
  };

  isLoggedIn = () => {
    const user = this.client.getUser();
    if (user) {
      const idToken: any = user.idToken;

      if (idToken && Date.now() < idToken.exp * 1000) {
        return true;
      }
    }
    return false;
  };
}

export { AuthenticationState, AuthService };
