import { Component } from '@angular/core';
import { AccountService } from 'src/app/helpers/services/account.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  // registerMode = false;
  users: any;

  constructor(public accountService: AccountService) { }

  ngOnInit(): void {
   }

  // registerToggle() {
  //   this.registerMode = !this.registerMode;
  // }

  // cancelRegisterMode(event: boolean) {
  //   this.registerMode = event;
  // }

}
