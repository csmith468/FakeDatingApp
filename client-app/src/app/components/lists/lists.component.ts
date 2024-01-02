import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { Member } from 'src/app/helpers/models/member';
import { Pagination } from 'src/app/helpers/models/pagination';
import { MembersService } from 'src/app/helpers/services/members.service';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css']
})
export class ListsComponent implements OnInit {
  members: Member[] | undefined;
  predicate = 'liked';
  pageNumber = 1;
  pageSize = 8;
  pagination: Pagination | undefined;
  colsPerMember = 'col-3';

  constructor(private membersService: MembersService, private responsive: BreakpointObserver) { }

  ngOnInit(): void {
    this.loadLikes();

    this.responsive.observe(['(max-width: 600px)', '(min-width: 601px)', '(max-width: 767px)', 
      '(min-width: 768px)']).subscribe(
        result => {
          if (result.breakpoints['(max-width: 600px)']) 
          this.colsPerMember = 'col-6';
          if (result.breakpoints['(min-width: 601px)'] && result.breakpoints['(max-width: 767px)']) 
          this.colsPerMember = 'col-4';
          if (result.breakpoints['(min-width: 768px)'])
            this.colsPerMember = 'col-3';
        }
      )
  }

  loadLikes() {
    this.membersService.getLikes(this.predicate, this.pageNumber, this.pageSize).subscribe({
      next: response => { 
        this.members = response.result;
        this.pagination = response.pagination;
      }
    });
  }


  pageChanged(event: any) {
    if (this.pageNumber !== event.page) {
      this.pageNumber = event.page;
      this.loadLikes();
    }
  }
}
