import {Component, OnInit, ElementRef, ViewChild} from "@angular/core";
import {TextField} from "ui/text-field";
import { GroceryListService } from "../../shared/grocery/grocery-list.service";
import { Person } from "../../shared/grocery/grocery";

@Component({
  selector: "list-page",
  templateUrl: "pages/list/list.html",
  providers: [GroceryListService],
  styleUrls: ["pages/list/list-common.css", "pages/list/list.css"]
})
export class ListComponent implements OnInit {
  groceryList: Array<Person> = [];
  grocery: string = "";

  @ViewChild("groceryTextField") groceryTextField: ElementRef;
  constructor(private _groceryList: GroceryListService) {
  }
  ngOnInit() {
   this._groceryList.load()
    .then(loadedGroceries => {
      loadedGroceries.forEach((groceryObject) => {
        console.dump(groceryObject.firstname);
        this.groceryList.unshift(groceryObject);
      });
    });
  }

  add() {
    if (this.grocery.trim() === "") {
      alert("Enter a grocery item");
      return;
    }

    // Dismiss the keyboard
    let textField = <TextField>this.groceryTextField.nativeElement;
    textField.dismissSoftInput();

    this._groceryList.add(this.grocery)
      .subscribe(
      groceryObject => {
        this.groceryList.unshift(groceryObject);
        this.grocery = "";
      },
      () => {
        alert({
          message: "An error occurred while adding an item to your list.",
          okButtonText: "OK"
        });
        this.grocery = "";
      });
  }
}