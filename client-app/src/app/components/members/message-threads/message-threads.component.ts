import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { TimeagoModule } from 'ngx-timeago';
import { Message } from 'src/app/helpers/models/message';
import { MessageService } from 'src/app/helpers/services/message.service';

@Component({
  selector: 'app-message-threads',
  standalone: true,
  templateUrl: './message-threads.component.html',
  styleUrls: ['./message-threads.component.css'],
  imports: [CommonModule, TimeagoModule, FormsModule]
})
export class MessageThreadsComponent implements OnInit {
  @ViewChild('messageForm') messageForm?: NgForm
  @Input() username?: string;
  @Input() messages: Message[] = [];
  messageContent = '';

  constructor(private messageService: MessageService) { }

  ngOnInit(): void {
  }

  sendMessage() {
    if (!this.username) return;
    this.messageService.sendMessage(this.username, this.messageContent).subscribe({
      next: message => {
        this.messages.push(message);
        this.messageForm?.reset();
      }
    });
  }

}
