import { Component, OnInit } from '@angular/core';
import { Account } from '../AccountsModel/model';
import { AccountsService } from '../AccountsService/service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-accounts-delete',
  templateUrl: './delete-account.component.html',
  styleUrl: './delete-account.component.css'
})
export class AccountsDeleteComponent implements OnInit{
  account:Account = <Account>{};
  accountId:number = <number>{};
  isDeleteAction: boolean = false;

  constructor(private route: ActivatedRoute, private router: Router, private accountsService: AccountsService,private snackBar: MatSnackBar,) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.accountId = +params.get('id')!;
      this.fetchAccountDetails(this.accountId);
    });
  }

  fetchAccountDetails(accountId: number): void {
    this.accountsService.getAccountByAccountId(accountId).subscribe(
      (account: Account) => {
        this.account = account;
        this.isDeleteAction = true;
      },
      error => {
        console.error('Error fetching account details:', error);
      }
    );
  }

  deleteAccount(): void {
    // Call the deleteAccount method of the AccountsService to delete the account by accountId
    this.accountsService.deleteAccount(this.accountId).subscribe(
      () => {
        console.log('Account deleted successfully');
        // Redirect to some page after successful deletion

        const loadingSnackbarRef = this.snackBar.open('Deleted account Successfully...', 'Close', {
          duration: 500 // 0 means it will stay until dismissed
        });

        this.router.navigate(['/list-account']);
      },
      error => {
        console.error('Error deleting account:', error);
      }
    );
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

  GoBack(){
    const loadingSnackbarRef = this.snackBar.open('Loading, please wait...', 'Close', {
      duration: 500 // 0 means it will stay until dismissed
    });
     this.router.navigate(['/list-account']);
  }
}