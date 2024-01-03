// Angular
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LayoutModule } from '@angular/cdk/layout';
import { RouteReuseStrategy } from '@angular/router';

// app
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// componenents
import { AboutComponent } from './components/about/about.component';
import { AdminPanelComponent } from './components/admin/admin-panel/admin-panel.component';
import { ConfirmDialogComponent } from './components/modals/confirm-dialog/confirm-dialog.component';
import { DatePickerComponent } from './components/forms/date-picker/date-picker.component';
import { HomeComponent } from './components/home/home.component';
import { ListsComponent } from './components/lists/lists.component';
import { MemberEditComponent } from './components/members/member-edit/member-edit.component';
import { MemberCardComponent } from './components/members/member-card/member-card.component';
import { MemberListComponent } from './components/members/member-list/member-list.component';
import { MessagesComponent } from './components/messages/messages.component';
import { NavComponent } from './components/nav/nav.component';
import { PhotoEditorComponent } from './components/members/photo-editor/photo-editor.component';
import { PhotoManagementComponent } from './components/admin/photo-management/photo-management.component';
import { RegisterComponent } from './components/register/register.component';
import { RolesModalComponent } from './components/modals/roles-modal/roles-modal.component';
import { StateOptionsComponent } from './components/forms/state-options/state-options.component';
import { TextInputComponent } from './components/forms/text-input/text-input.component';
import { UserManagementComponent } from './components/admin/user-management/user-management.component';
import { NotFoundComponent } from './components/errors/not-found/not-found.component';
import { ServerErrorComponent } from './components/errors/server-error/server-error.component';
import { TestErrorComponent } from './components/errors/test-error/test-error.component';

// directives
import { HasRoleDirective } from './helpers/directives/has-role.directive';
 
// interceptors
import { ErrorInterceptor } from './helpers/interceptors/error.interceptor';
import { JwtInterceptor } from './helpers/interceptors/jwt.interceptor';
import { LoadingInterceptor } from './helpers/interceptors/loading.interceptor';

// modules (see shared module for all other ngx modules)
import { SharedModule } from './helpers/modules/shared.module';

// services
import { CustomRouteReuseStrategy } from './helpers/services/customRouteReuseStrategy';
import { NotHasRoleDirective } from './helpers/directives/not-has-role.directive';


@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    RegisterComponent,
    MemberListComponent,
    ListsComponent,
    MessagesComponent,
    TestErrorComponent,
    NotFoundComponent,
    ServerErrorComponent,
    MemberCardComponent,
    MemberEditComponent,
    PhotoEditorComponent,
    TextInputComponent,
    DatePickerComponent,
    StateOptionsComponent,
    AdminPanelComponent,
    HasRoleDirective,
    UserManagementComponent,
    PhotoManagementComponent,
    RolesModalComponent,
    ConfirmDialogComponent,
    AboutComponent,
    NotHasRoleDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    SharedModule,
    LayoutModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true},
    {provide: RouteReuseStrategy, useClass: CustomRouteReuseStrategy}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }