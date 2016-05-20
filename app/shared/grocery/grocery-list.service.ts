import {Injectable} from "@angular/core";
import {Http, Headers, Response} from "@angular/http";
import {Config} from "../config";
import {Person} from "./grocery";
import {Observable} from "rxjs/Rx";

@Injectable()
export class GroceryListService {
  constructor(private _http: Http) {}

  load() {
    console.log("load got here", Config.token);
    let headers = new Headers();
    headers.append("Authorization", "Bearer " + Config.token);
    // headers.append("Content-Type", "application/json");

    return this._http.get("http://waitressandela.herokuapp.com/users/")
      .toPromise().then((response) => {
        console.log("got here", response);
        return response.json();
      } , (error) => this.handleErrors(error));
    // .map(data => {
    //   console.log(data, "response 2");
    //   let groceryList = [];
    //   data.Result.forEach((person) => {
    //     groceryList.push(new Person(person.id, person.firstName, person.lastName));
    //   });
    //   console.log(groceryList);
    //   return groceryList;
    // })
    // .catch(this.handleErrors);
  }

  add(name: string) {
    let headers = new Headers();
    headers.append("Authorization", "Bearer " + Config.token);
    headers.append("Content-Type", "application/json");

    return this._http.post(
      Config.apiUrl + "Groceries",
      JSON.stringify({ Name: name }),
      { headers: headers }
    )
      .map(res => {
        console.log(res);
        return res.json();
      })
      // .map(data => {
      //   return new Grocery(data.Result.Id, name);
      // })
      .catch(this.handleErrors);
  }

  handleErrors(error: Response) {
    console.log(JSON.stringify(error.json()));
    return Observable.throw(error);
  }
}