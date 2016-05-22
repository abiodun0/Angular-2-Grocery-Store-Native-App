import {Injectable} from "@angular/core";
import {Http, Headers, Response} from "@angular/http";
import {Config} from "../config";
import {Grocery} from "./grocery";
import {Observable} from "rxjs/Rx";



@Injectable()
export class GroceryListService {
  constructor(private _http: Http) {}

  private makeRequest(method: string, requestBody?: string): Observable<any> {
    return this._http[method](Config.apiUrl + "Groceries",
      { headers: this.header }, requestBody)
      .map(res => res.json())
      .catch(this.handleErrors);
  }

  private get header(): Headers{
    let headers = new Headers();
    headers.append("Authorization", "Bearer " + Config.token);
    headers.append("Content-Type", "application/json");
    return headers;
  }
  load() {
    return this.makeRequest("get", null)
    .map(data => {
      let groceryList = [];
      data.Result.forEach((grocery) => {
        groceryList.push(new Grocery(grocery.Id, grocery.Name));
      });
      return groceryList;
    });

  }

  add(name: string) {
    return this.makeRequest("post", JSON.stringify({ firstname: name }))
      .map(data => {
        return new Grocery(data.Result.Id, name);
      });
  }
  delete(id: string) {
    return this.makeRequest("delete", null);
  }

  handleErrors(error: Response) {
    console.log(JSON.stringify(error.json()));
    return Observable.throw(error);
  }
}