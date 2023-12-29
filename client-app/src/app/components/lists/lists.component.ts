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

  constructor(private membersService: MembersService) { }

  ngOnInit(): void {
    this.loadLikes();
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
