import {Injectable} from "@angular/core";
import {Http, Headers, Response} from "@angular/http";
import {Observable} from "rxjs/Rx";

import {User} from "./user";
import {Config} from "../config";

import "rxjs/add/operator/do";
import "rxjs/add/operator/map";



@Injectable()
export class UserService {
  constructor(private _http: Http) {

  }
  private getHeaders() {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    return headers;
  }
  private makeRequest(url: string, object: any) {
   return this._http.post(Config.apiUrl + "Users",
      JSON.stringify(object),
      {
        headers: this.getHeaders()
      })
      .catch(this.handleErrors);
  }
  register(user: User) {
    let headers = this.getHeaders();
    return this.makeRequest("Users", { Username: user.email,
      Email: user.email,
      Password: user.password});
  }
  handleErrors(error: Response) {
    console.log(error.json());
    return Observable.throw(error);
    }
  login(user: User) {
    let headers = this.getHeaders();
    return this._http.post(
      Config.apiUrl + "oauth/token",
      JSON.stringify({
        username: user.email,
        password: user.password,
        grant_type: "password"
      }),
      { headers: headers }
    )
      .map(response => response.json())
      .do(data => {
        Config.token = data.Result.access_token;
      })
      .catch(this.handleErrors);
  }
}