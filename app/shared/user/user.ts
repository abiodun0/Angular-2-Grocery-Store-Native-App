const validator = require("email-validator");

 export class User {
  email: string;
  password: string;
  isValid(): boolean {
    return validator.validate(this.email);
  }
}