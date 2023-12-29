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

  constructor(private memberService: MembersService) {
    this.userParams = this.memberService.getUserParams();
   }

  ngOnInit(): void {
    // this.members$ = this.memberService.getMembers();
    this.loadMembers();
  }

  applyFilters() {
    if (this.userParams) {
      // console.log(this.userParams);
      this.userParams.pageNumber = 1;
      // console.log(this.userParams);
      this.memberService.setUserParams(this.userParams);
    }
    this.loadMembers();
  }

  loadMembers() {
    if (this.userParams) {
      console.log(this.userParams);
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
}
