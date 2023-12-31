import { inject } from '@angular/core';
import { CanDeactivateFn } from '@angular/router';
import { MemberEditComponent } from 'src/app/components/members/member-edit/member-edit.component';
import { ConfirmService } from '../services/confirm.service';

export const preventUnsavedChangesGuard: CanDeactivateFn<MemberEditComponent> = (component) => {
  const confirmService = inject(ConfirmService);

  if (component.editForm?.dirty) {
    return confirmService.confirm('Unsaved Changes', 
      'Are you sure you want to continue? Any unsaved changes will be lost.');
  }

  return true;
};
