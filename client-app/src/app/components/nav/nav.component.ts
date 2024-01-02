import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../helpers/services/account.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {}
  collapseNav = false;

  constructor(public accountService: AccountService, private router: Router, 
    private toastr: ToastrService, private responsive: BreakpointObserver) { }

  ngOnInit(): void {
    this.responsive.observe(['(max-width: 767px)']).subscribe(
      result => {
        if (result.matches) {
          this.collapseNav = true;
        }
      }
    )
    this.responsive.observe(['(min-width: 768px)']).subscribe(
      result => {
        if (result.matches) {
          this.collapseNav = false;
        }
      }
    )
  }

  login() {
    this.accountService.login(this.model).subscribe({
      next: _ => {
        this.router.navigateByUrl('/members')
        this.model = {};
      }
    })
  }

  logout() {
    this.accountService.logout();
    this.router.navigateByUrl('/');
  }

}