import { Component, OnInit, inject } from '@angular/core';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { User } from 'src/app/helpers/models/user';
import { AdminService } from 'src/app/helpers/services/admin.service';
import { RolesModalComponent } from '../../modals/roles-modal/roles-modal.component';
import { ConfirmDialogComponent } from '../../modals/confirm-dialog/confirm-dialog.component';
import { ConfirmService } from 'src/app/helpers/services/confirm.service';
import { map, take } from 'rxjs';
import { AccountService } from 'src/app/helpers/services/account.service';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {
  users: User[] = [];
  self: User | null = null;
  bsModalRef: BsModalRef<RolesModalComponent> = new BsModalRef<RolesModalComponent>();
  availableRoles = [
    'Admin', 
    'Moderator',
    'Member'
  ];

  constructor(private adminService: AdminService, private modalService: BsModalService, 
    private confirmService: ConfirmService, private accountService: AccountService) {
      this.accountService.currentUser$.pipe(take(1)).subscribe({
        next: user => this.self = user,
      })
     }

  ngOnInit(): void {
    this.getUsersWithRoles();
  }

  getUsersWithRoles() {
    this.adminService.getUsersWithRoles().subscribe({
      next: users => this.users = users
    });
  }

  openConfirmDeleteModal(user: User) {
    if (user) {
      var result = this.confirmService.confirm('Delete User', 
        'Are you sure you want to delete user ' + user.username + '? This action cannot be undone.')
          .pipe(take(1)).subscribe({
            next: () => {
              if (this.confirmService.bsModalRef?.content?.result) {
                this.adminService.deleteAccount(user.username);
                // this.getUsersWithRoles();
              }
            }
          })
    }
  }

  openRolesModal(user: User) {
    const config = {
      class: 'modal-dialog-centered',
      initialState: {
        username: user.username,
        availableRoles: this.availableRoles,
        selectedRoles: [...user.roles]
      }
    }
    this.bsModalRef = this.modalService.show(RolesModalComponent, config);
    this.bsModalRef.onHide?.subscribe({
      next: () => {
        const selectedRoles = this.bsModalRef.content?.selectedRoles;
        if (!this.arrayEqual(selectedRoles!, user.roles)) {
          this.adminService.updateUserRoles(user.username, selectedRoles!).subscribe({
            next: roles => user.roles = roles
          })
        }
      }
    })
  }

  private arrayEqual(arr1: any[], arr2: any[]) {
    return JSON.stringify(arr1.sort()) === JSON.stringify(arr2.sort());
  }

}
