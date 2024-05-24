import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignUpComponent } from './EnquirySignUp/sign-up.component';
import { LoginComponent } from './EnquiryLogin/login.component';
import { EnquiryFormComponent } from './EnquiryForm/enquiry-form.component';
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
import { CustomerDashboardComponent } from './CustomerDashboard/customer-dashboard.component';
import { CustomerChangePasswordComponent } from './CustomerChangePassword/customer-change-password.component';
import { CustomerEditProfileComponent } from './CustomerEditProfile/customer-edit-profile.component';
import { CustomerViewDocumentComponent } from './CustomerViewDocuments/customer-view-document.component';
import { CustomerViewProfileComponent } from './CustomerViewProfile/customer-view-profile.component';
import { createAccountComponent } from './AccountCreate/create-account.component';
import { ManagerViewEnquiryComponent } from './ManagerHome/manager-view-enquiry.component';
import { ManagerHomeComponent } from './ManagerHome/manager-home.component';
import { TransferFundsComponent } from './TransactionFundTransfer/transfer-funds.component';
import { AuthGuard } from './CustomerService/auth.guard';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { ViewBeneficiaryComponent } from './Beneficiary/view-beneficiary.component';
import { AddBeneficiaryComponent } from './Beneficiary/add-beneficiary.component';




const routes: Routes = [
  //Enquiry
  {path:'enquirer-signUp', component: SignUpComponent},
  {path:'enquirer-login', component: LoginComponent},
  {path:'enquiryForm', component: EnquiryFormComponent},
  { path: 'enquirer-home', component: EnquiryhomeComponent },

  //Transaction
  {path: 'transactions/:id', component: AccountDetailsComponent,canActivate: [AuthGuard]},
  {path: 'fund-transfer/:id', component: TransferFundsComponent,canActivate: [AuthGuard]},

  //Accounts
  {path: 'list-account/:id', component: AccountsListComponent,canActivate: [AuthGuard]},
  {path: 'account-specific-detail/:id', component: AccountSpecificDetailsComponent,canActivate: [AuthGuard]},
  {path: 'create-account/:id', component: createAccountComponent,canActivate: [AuthGuard]},
  {path: 'delete-account/:id', component: AccountsDeleteComponent,canActivate: [AuthGuard]},

  //Customers
  {path: 'user-home', component: UserHomeComponent},
  {path: 'user-login', component: CustomerLoginComponent},
  {path: 'customer-dashboard/:id', component: CustomerDashboardComponent,canActivate: [AuthGuard]},
  {path: 'customer-change-password', component: CustomerChangePasswordComponent},
  {path: 'customer-edit-profile/:id', component: CustomerEditProfileComponent ,canActivate: [AuthGuard]},
  {path: 'customer-view-document/:id', component: CustomerViewDocumentComponent ,canActivate: [AuthGuard]},
  {path: 'customer-view-profile', component: CustomerViewProfileComponent,canActivate: [AuthGuard] },

  //Beneficiary
  {path: 'view-beneficiaries/:id', component: ViewBeneficiaryComponent, canActivate:[AuthGuard]},
  {path: 'add-beneficiary', component: AddBeneficiaryComponent, canActivate:[AuthGuard]},

//Manager
{ path: 'manager-enquiry/:enquiryId', component: ManagerViewEnquiryComponent,canActivate: [AuthGuard]},

{ path:'manager/:id', component: ManagerHomeComponent,canActivate: [AuthGuard] },




  //common
  { path: 'home', component: UserHomeComponent },
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'services', component: ServicesComponent },
  { path: 'contact', component: ContactComponent },
  {path:'unauthorized',component:UnauthorizedComponent},
  { path: '**', component: PageNotFoundComponent },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }