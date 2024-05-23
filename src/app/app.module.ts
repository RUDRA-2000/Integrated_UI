import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignUpComponent } from './EnquirySignUp/sign-up.component';
import { LoginComponent } from './EnquiryLogin/login.component';
import { HttpClientModule } from '@angular/common/http';
import {  FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EnquiryFormComponent } from './EnquiryForm/enquiry-form.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HeaderComponent } from './HomeUI/header.component';
import { FooterComponent } from './HomeUI/footer.component';
import { HomeComponent } from './HomeUI/home.component';
import { AboutComponent } from './HomeUI/about.component';
import { ServicesComponent } from './HomeUI/services.component';
import { ContactComponent } from './HomeUI/contact.component';
import { EnquiryhomeComponent } from './EnquiryHome/enquiryhome.component';
import { PageNotFoundComponent } from './PageNotFound/page-not-found.component';
import { AccountDetailsComponent } from './TransactionAccountDetails/account-details.component';
import { UserHomeComponent } from './UserHome/user-home.component';
import { AccountsListComponent } from './AccountsList/accounts-list.component';
import { AccountSpecificDetailsComponent } from './AccountSpecificDetail/account-specific-detail.component';

import { AccountsDeleteComponent } from './AccountDelete/delete-account.component';
import { CustomerLoginComponent } from './CustomerLogin/customer-login.component';
import { CommonModule } from '@angular/common';
import { CustomerDashboardComponent } from './CustomerDashboard/customer-dashboard.component';
import { CustomerViewProfileComponent } from './CustomerViewProfile/customer-view-profile.component';
import { CustomerChangePasswordComponent } from './CustomerChangePassword/customer-change-password.component';
import { CustomerEditProfileComponent } from './CustomerEditProfile/customer-edit-profile.component';
import { CustomerViewDocumentComponent } from './CustomerViewDocuments/customer-view-document.component';
import { createAccountComponent } from './AccountCreate/create-account.component';
import { ManagerHomeComponent } from './ManagerHome/manager-home.component';
import { ManagerEnquiryListComponent } from './ManagerHome/manager-enquiry-list.component';
import { ManagerViewEnquiryComponent } from './ManagerHome/manager-view-enquiry.component';
import { ManagerPopupComponent } from './ManagerHome/manager-popup.component';
import { TransferFundsComponent } from './TransactionFundTransfer/transfer-funds.component';
import { NgxSpinner, NgxSpinnerModule } from 'ngx-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { ViewBeneficiaryComponent } from './Beneficiary/view-beneficiary.component';
import { AddBeneficiaryComponent } from './Beneficiary/add-beneficiary.component';
import { ListBeneficiaryComponent } from './Beneficiary/list-beneficiary.component';












@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    LoginComponent,
    EnquiryFormComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    AboutComponent,
    ServicesComponent,
    ContactComponent,
    EnquiryhomeComponent,
    PageNotFoundComponent,
    AccountDetailsComponent,
    UserHomeComponent,
    AccountsListComponent,
    AccountSpecificDetailsComponent,
    createAccountComponent,
    AccountsDeleteComponent,
    CustomerLoginComponent,
    CustomerDashboardComponent,
    CustomerViewProfileComponent,
    CustomerChangePasswordComponent,
    CustomerEditProfileComponent,
    CustomerViewDocumentComponent,
    ManagerHomeComponent,
    ManagerEnquiryListComponent,
    ManagerViewEnquiryComponent,
    ManagerPopupComponent,
    TransferFundsComponent,
    UnauthorizedComponent,
    ViewBeneficiaryComponent,
    AddBeneficiaryComponent,
    ListBeneficiaryComponent,


  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    CommonModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,
    AppRoutingModule,
    
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
