import { Directive, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { User } from '../models/user';
import { AccountService } from '../services/account.service';
import { take } from 'rxjs';

@Directive({
  selector: '[appNotHasRole]'
})
export class NotHasRoleDirective {
  @Input() appNotHasRole: string[] = [];
  user: User = {} as User;

  constructor(private viewContainerRef: ViewContainerRef, private templateRef: TemplateRef<any>,
    private accountService: AccountService) { 
      this.accountService.currentUser$.pipe(take(1)).subscribe({
        next: user => {
          if (user) this.user = user;
        }
      });
  }

  ngOnInit(): void {
    if (!this.user.roles.some(r => this.appNotHasRole.includes(r))) {
      this.viewContainerRef.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainerRef.clear();
    }
  }
}

