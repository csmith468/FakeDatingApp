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
  collapseWelcome = false;

  constructor(public accountService: AccountService, private router: Router, 
    private toastr: ToastrService, private responsive: BreakpointObserver) { }

  ngOnInit(): void {

    this.responsive.observe(['(max-width: 433px)', '(min-width: 434px)', '(max-width: 767px)', 
      '(min-width: 768px)']).subscribe(
        result => {
          if (result.breakpoints['(max-width: 433px)']) {
            this.collapseWelcome = true;
            this.collapseNav = true;
          }
          if (result.breakpoints['(min-width: 434px)'] && result.breakpoints['(max-width: 767px)']) {
            this.collapseWelcome = false;
            this.collapseNav = true;
          }
          if (result.breakpoints['(min-width: 768px)']) {
            this.collapseWelcome = false;
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