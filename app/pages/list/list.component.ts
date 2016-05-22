import {Component, OnInit, ElementRef, ViewChild} from "@angular/core";
import {TextField} from "ui/text-field";
let socialShare = require("nativescript-social-share");
import { GroceryListService } from "../../shared/grocery/grocery-list.service";
import { Grocery } from "../../shared/grocery/grocery";


@Component({
  selector: "list-page",
  templateUrl: "pages/list/list.html",
  providers: [GroceryListService],
  styleUrls: ["pages/list/list-common.css", "pages/list/list.css"]
})
export class ListComponent implements OnInit {
  groceryList: Array<Grocery> = [];
  grocery: string = "";
  isLoading: boolean = false;
  listLoaded: boolean = false;

  @ViewChild("groceryTextField") groceryTextField: ElementRef;
  constructor(private _groceryList: GroceryListService) {
  }
  ngOnInit() {
    this.isLoading = true;
    this._groceryList.load()
      .subscribe(loadedGroceries => {
        loadedGroceries.forEach((groceryObject) => {
          this.groceryList.unshift(groceryObject);
        });
        this.isLoading = false;
        this.listLoaded = true;
      });
  }
  share() {
    let list = [];
    for (let i = 0, size = this.groceryList.length; i < size; i++) {
      list.push(this.groceryList[i].name);
    }
    let listString = list.join(", ").trim();
    socialShare.shareText(listString);
  }
  add() {
    if (this.grocery.trim() === "") {
      alert("Enter a grocery item");
      return;
    }
    this.isLoading = true;

    // Dismiss the keyboard
    let textField = <TextField>this.groceryTextField.nativeElement;
    textField.dismissSoftInput();

    this._groceryList.add(this.grocery)
      .subscribe(
      groceryObject => {
        this.groceryList.unshift(groceryObject);
        this.grocery = "";
        this.isLoading = false;
      },
      () => {
        alert({
          message: "An error occurred while adding an item to your list.",
          okButtonText: "OK"
        });
        this.grocery = "";
        this.isLoading = false;
      });
  }
  delete(item: Grocery) {
    if (confirm("Are you sure you want to delete this item")) {
      this.isLoading = true;
      this._groceryList.delete(item.id)
        .subscribe((data) => {
          let index = this.groceryList.indexOf(item);
          this.groceryList.splice(index, 1);
          this.isLoading = false;
        }, () => {
          console.log("there was an error");
          this.isLoading = false;
        });
    }
  }
}

