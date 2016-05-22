import {Component, ElementRef, OnInit, ViewChild} from "@angular/core";
import {Page} from "ui/page";
import {Color} from "color";
import {View} from "ui/core/view";
import {setHintColor} from "../../utils/hint-util";
import {TextField} from "ui/text-field";

import {User} from "../../shared/user/user";
import {Router} from "@angular/router-deprecated";
import {UserService} from "../../shared/user/user.service";

@Component({
  selector: "login",
  providers: [UserService],
  templateUrl: "pages/login/login.html",
  styleUrls: ["pages/login/login-common.css", "pages/login/login.css"]
})
export class LoginPage implements OnInit {
  user: User;
  isLoggedIn = false;

  @ViewChild("email") email: ElementRef;
  @ViewChild("password") password: ElementRef;

  @ViewChild("container") container: ElementRef;
  constructor(private _userService: UserService, private _router: Router, private page: Page) {
    this.user = new User();
  }
  ngOnInit() {
    this.page.actionBarHidden = true;
    this.page.backgroundImage = this.page.ios ? "res://bg_login.jpg" : "res://bg_login";
  }
  submit(): any {
    console.log("submitted  something");
    if (this.isLoggedIn) {
      return this.login();
    }
    return this._userService.register(this.user)
      .subscribe(() => { alert("user successfully registered"); },
      () => {
        alert("There was an error creating the user");
      });
  }
  login() {
    if (!this.user.isValid()) {
      alert("invalid email");
      return;
    }
    return this._userService.login(this.user)
      .subscribe((user) => {
        this._router.navigate(["List"]);
      },
      (err) => { console.log("there was an error"); });
  }
  toggleDisplay() {
    this.isLoggedIn = !this.isLoggedIn;
    this.setTextFieldColors();
    let container = <View> this.container.nativeElement;
    container.animate({
      backgroundColor: this.isLoggedIn ? new Color("white") : new Color("#301217"),
      duration: 200
    });
  }
  private setTextFieldColors() {
    let emailTextField = <TextField>this.email.nativeElement;
    let passwordTextField = <TextField>this.password.nativeElement;

    let mainTextColor = new Color(this.isLoggedIn ? "black" : "#C4AFB4");
    emailTextField.color = mainTextColor;
    passwordTextField.color = mainTextColor;

    let hintColor = new Color(this.isLoggedIn ? "#ACA6A7" : "#C4AFB4");
    setHintColor({ view: emailTextField, color: hintColor });
    setHintColor({ view: passwordTextField, color: hintColor });
  }
  signUp() {
    this._userService.register(this.user);
  }

}