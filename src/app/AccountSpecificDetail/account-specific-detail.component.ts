import { Component } from '@angular/core';
import { Account } from '../AccountsModel/model';
import { ActivatedRoute } from '@angular/router';
import { AccountsService } from '../AccountsService/service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import {  Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-account-specific-details',
  templateUrl: './account-specific-detail.component.html',
  styleUrl: './account-specific-detail.component.css'
})
export class AccountSpecificDetailsComponent {
  account: Account | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private accService: AccountsService,
    private snackBar: MatSnackBar,
    private Spinner:NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const accountID = +params['id']; // Retrieve the account ID from the route
      this.fetchAccountDetails(accountID);
    });
  }

  fetchAccountDetails(accountID: number): void {
    this.Spinner.show();
    this.accService.getAccountByAccountId(accountID).subscribe(account => {
      this.account = account;
      while(this.account.balance==null){
         
      }
      this.Spinner.hide();
    });
  }


  getAccountType(typeId: Number): string {
    switch (typeId) {
      case 1:
        return 'Savings';
      case 2:
        return 'Current';
      default:
        return 'Unknown';
    }
  }

  GoBack(custId: number){
    const loadingSnackbarRef = this.snackBar.open('Loading, please wait...', 'Close', {
      duration: 500 // 0 means it will stay until dismissed
    });
     this.router.navigate(['/list-account',custId]);
  }
}