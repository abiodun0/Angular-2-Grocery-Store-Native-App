import {Component, OnInit} from "@angular/core";
import {Page} from "ui/page";
import {User} from "../../shared/user/user";
import {HTTP_PROVIDERS} from "@angular/http";
import {Router} from "@angular/router-deprecated";
import {UserService} from "../../shared/user/user.service";

@Component({
  selector: "login",
  providers: [UserService, HTTP_PROVIDERS],
  templateUrl: "pages/login/login.html",
  styleUrls: ["pages/login/login-common.css", "pages/login/login.css"]
})
export class LoginPage implements OnInit {
  user: User;
  isLoggedIn = false;
  // email = "abiodun@golden0.com";
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
    console.log(this.user.email, this.user.password);
    return this._userService.login(this.user)
      .subscribe((user) => { console.log(user); alert("successfully signed in");
        this._router.navigate(["List"]);
      },
      (err) => { console.log("there was an error"); });
  }
  toggleDisplay() {
    this.isLoggedIn = !this.isLoggedIn;
  }
  signUp() {
    this._userService.register(this.user);
  }

}