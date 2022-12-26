import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerUserData:any = {}
  artist:any;
  constructor(private _auth:AuthService) { }

  ngOnInit(): void {
  }

  registerUser() {
    if(this.artist === "artist") {
      this.registerUserData.artist = true;
    }
    else {
      this.registerUserData.artist = false;
    }
    console.log(this.registerUserData);
    this._auth.registerUser(this.registerUserData)
      .subscribe((res) => {
        console.log(res);
        localStorage.setItem('token', res.token);
    });
  }
}
