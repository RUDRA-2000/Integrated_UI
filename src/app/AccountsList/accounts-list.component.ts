import { Component } from '@angular/core';
import { Account } from '../AccountsModel/model';
import { AccountsService } from '../AccountsService/service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TransactionService } from '../Transactionservices/transaction-service.service';
import { Transaction } from '../TransactionModel/transaction';

@Component({
  selector: 'app-accounts-list',
  templateUrl: './accounts-list.component.html',
  styleUrl: './accounts-list.component.css'
})
export class AccountsListComponent {
  accounts:Account[] = [];
  CustId: number = 0; 
  transactions: Transaction[] = [];
  constructor(private accService: AccountsService, private router: Router,private snackBar: MatSnackBar, private route: ActivatedRoute,
     private transactionService : TransactionService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const accountID = +params['id']; // Retrieve the account ID from the route
      this.CustId = accountID
    
      this.fetchAccounts();
      
    });
  
  }

  fetchAccounts(): void {
    this.accService.getAllAccountsByCustomerId(this.CustId) // Replace '1' with the actual Customer ID
      .subscribe(accounts => {
        this.accounts = accounts;
      });
  }

  shouldDisplayChequeButton(account: Account): boolean {
    if(account.hasCheque) return false;
    else if (account.type_id === 1 && account.balance >= 5000) {
      return true;
    } else if (account.type_id === 2 && account.balance >= 10000) {
      return true;
    }
    return false;
  }

  applyForCheque(accountId: number): void {
    this.accService.applyForCheque(accountId).subscribe(
      response => {
        const loadingSnackbarRef = this.snackBar.open('Applied for Checkbook Successfully!', 'Close', {
          duration: 2000 // 0 means it will stay until dismissed
        });
        // Handle successful response (e.g., display a success message, refresh the account list, etc.)
       
        this.fetchAccounts();
      },
      error => {
        console.error('Error applying for cheque book:', error);
        // Handle error response (e.g., display an error message)
      }
    );
  }

  GoView(accountId: number){
    const loadingSnackbarRef = this.snackBar.open('Loading, please wait...', 'Close', {
      duration: 1000 // 0 means it will stay until dismissed
    });
    this.router.navigate(['/account-specific-detail' , accountId])
  }

  getAccountTransactions(accountId: number) {
    
    this.router.navigate(['/transactions' , accountId])
  }

  transferFund(accountId: number){
    this.router.navigate(['/fund-transfer' , accountId])
  }
}