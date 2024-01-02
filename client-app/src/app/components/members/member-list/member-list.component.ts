import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { Observable, take } from 'rxjs';
import { Member } from 'src/app/helpers/models/member';
import { Pagination } from 'src/app/helpers/models/pagination';
import { User } from 'src/app/helpers/models/user';
import { UserParams } from 'src/app/helpers/models/userParams';
import { AccountService } from 'src/app/helpers/services/account.service';
import { MembersService } from 'src/app/helpers/services/members.service';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {
  // members$: Observable<Member[]> | undefined;
  members: Member[] = [];
  pagination: Pagination | undefined;
  userParams: UserParams | undefined;
  genderList = [{value: 'any', display: 'Any'},
                {value: 'male', display: 'Male'}, 
                {value: 'female', display: 'Female'},
              ];
  orderList = [{value: 'lastActive', display: 'Last Active'}, 
              {value: 'created', display: 'Account Created'},
              {value: 'ageDesc', display: 'Oldest'},
              {value: 'ageAsc', display: 'Youngest'}
            ];

  // Viewing settings
  filterPanelVisible = true;
  screenSize = 'full';          // full, large, med, small, xsmall
  filterPanelSize = 'full';     // col-#
  matchesScreenSize = 'full';   // col-#
  individualMatchSize = 'full';        // col-#

  constructor(private memberService: MembersService, private responsive: BreakpointObserver) {
    this.userParams = this.memberService.getUserParams();
   }

  ngOnInit(): void {
    // this.members$ = this.memberService.getMembers();
    this.loadMembers();

    this.responsive.observe(['(max-width: 600px)', '(min-width: 601px)', '(max-width: 767px)', 
      '(min-width: 768px)', '(max-width: 991px)','(min-width: 992px)', '(max-width: 1199px)', 
      '(min-width: 1200px)']).subscribe(
        result => {
          if (result.breakpoints['(max-width: 600px)']) 
            this.screenSize = 'xsmall';
          if (result.breakpoints['(min-width: 601px)'] && result.breakpoints['(max-width: 767px)']) 
            this.screenSize = 'small';
          if (result.breakpoints['(min-width: 768px)'] && result.breakpoints['(max-width: 991px)']) 
            this.screenSize = 'med';
          if (result.breakpoints['(min-width: 992px)'] && result.breakpoints['(max-width: 1199px)']) 
            this.screenSize = 'large';
          if (result.breakpoints['(min-width: 1200px)']) 
            this.screenSize = 'full';
          this.setSizes();
        }
      )
  }

  applyFilters() {
    if (this.userParams) {
      this.userParams.pageNumber = 1;
      this.memberService.setUserParams(this.userParams);
    }
    this.loadMembers();
  }

  loadMembers() {
    if (this.userParams) {
      this.memberService.setUserParams(this.userParams);
      this.memberService.getMembers(this.userParams).subscribe({
        next: response => {
          if (response.result && response.pagination) {
            this.members = response.result;
            this.pagination = response.pagination;
          }
        }
      })
    }
  }

  resetFilters() {
    this.userParams = this.memberService.resetUserParams();
    this.loadMembers();
  }

  pageChanged(event: any) {
    if (this.userParams && this.userParams.pageNumber !== event.page) {
      this.userParams.pageNumber = event.page;
      this.memberService.setUserParams(this.userParams);
      this.loadMembers();
    }
  }

  changeFilterPanel() {
    this.filterPanelVisible = !this.filterPanelVisible;
    this.setSizes();
  }

  setSizes() {
    if (this.screenSize == 'full') this.filterPanelSize = 'col-2';
    if (this.screenSize == 'med' || this.screenSize == 'large') this.filterPanelSize = 'col-3';
    if (this.screenSize == 'small') this.filterPanelSize = 'col-4';
    if (this.screenSize == 'xsmall') this.filterPanelSize = 'col-5';

    if (this.filterPanelVisible) {
      if (this.screenSize == 'full') this.matchesScreenSize = 'col-10';
      if (this.screenSize == 'med' || this.screenSize == 'large') this.matchesScreenSize = 'col-9';
      if (this.screenSize == 'small') this.matchesScreenSize = 'col-8';
      if (this.screenSize == 'xsmall') this.matchesScreenSize = 'col-7';
    } else {
      this.matchesScreenSize = 'col-12';
    }

    if (this.screenSize == 'large' || this.screenSize == 'full' || (this.screenSize == 'med' && !this.filterPanelVisible))
      this.individualMatchSize = 'col-3';
    if ((this.screenSize == 'med' && this.filterPanelVisible) || (this.screenSize == 'small' && !this.filterPanelVisible))
      this.individualMatchSize = 'col-4';
    if ((this.screenSize == 'small' && this.filterPanelVisible) || (this.screenSize == 'xsmall' && !this.filterPanelVisible))
      this.individualMatchSize = 'col-6';
    if (this.screenSize == 'xsmall' && this.filterPanelVisible)
      this.individualMatchSize = 'col-12';
  }
}
