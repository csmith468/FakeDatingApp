import { Component, OnInit } from '@angular/core';
import { Message } from 'src/app/helpers/models/message';
import { Pagination } from 'src/app/helpers/models/pagination';
import { MessageService } from 'src/app/helpers/services/message.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit{
  messages?: Message[];
  pagination?: Pagination;
  container = 'Unread';
  pageNumber = 1;
  pageSize = 5;
  loading = false;


  constructor(private messageService: MessageService) { }

  ngOnInit(): void {
    this.loadMessages();
  }

  loadMessages() {
    this.loading = true;
    this.messageService.getMessages(this.pageNumber, this.pageSize, this.container).subscribe({
      next: response => {
        this.messages = response.result;
        this.pagination = response.pagination;
        this.loading = false;
      }
    });
  }


  // initialLoadMessages() {
  //   this.loading = true;
  //   this.messageService.getMessages(this.pageNumber, this.pageSize, this.container).subscribe({
  //     next: response => {
  //       this.messages = response.result;
  //       this.pagination = response.pagination;
  //       this.loading = false;
  //     }
  //   });
  //   console.log(this.messages);
  //   // if there are no unread messages, start on inbox instead
  //   if ((this.messages?.length == 0 || this.messages == undefined) && this.container == 'Unread') {
  //     this.container = 'Inbox';
  //     this.loading = true;
  //     this.messageService.getMessages(this.pageNumber, this.pageSize, this.container).subscribe({
  //       next: response => {
  //         this.messages = response.result;
  //         this.pagination = response.pagination;
  //         this.loading = false;
  //       }
  //     });
  //     console.log(this.messages);
  //   }
  // }

  deleteMessage(id: number) {
    this.messageService.deleteMessage(id).subscribe({
      next: () => this.messages?.splice(this.messages.findIndex(m => m.id === id), 1)
    });
  }

  pageChanged(event: any) {
    if (this.pageNumber !== event.page) {
      this.pageNumber = event.page;
      this.loadMessages();
    }
  }

}
