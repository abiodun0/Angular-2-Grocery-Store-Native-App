import {Component, OnInit} from "@angular/core";
import { GroceryListService } from "../../shared/grocery/grocery-list.service";
import {Grocery} from "../../shared/grocery/grocery";

@Component({
  selector: "list-page",
  templateUrl: "pages/list/list.html",
  providers: [GroceryListService],
  styleUrls: ["pages/list/list-common.css", "pages/list/list.css"]
})
export class ListComponent implements OnInit {
  groceryList: Grocery[] = [];
  constructor(private _groceryList: GroceryListService) { }
  ngOnInit() {
   this._groceryList.load()
    .subscribe(loadedGroceries => {
      loadedGroceries.forEach((groceryObject) => {
        this.groceryList.unshift(groceryObject);
      });
    });
  }
}