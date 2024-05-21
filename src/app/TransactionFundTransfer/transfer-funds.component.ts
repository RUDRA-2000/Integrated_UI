import { Component, OnInit } from '@angular/core';
import { TransactionService } from '../Transactionservices/transaction-service.service';
import { AccountsService } from '../AccountsService/service.service';
import { Account } from '../TransactionModel/account';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-transfer-funds',
  templateUrl: './transfer-funds.component.html',
  styleUrl: './transfer-funds.component.css'
})
export class TransferFundsComponent implements OnInit{

  sourceAccountId: string = '';
  destinationAccountId: string = '';
  amount: string = '';
  balance: string = '';
  transferSuccess: boolean = false;
  transferError: string = '';
  account: Account=<Account>{};

  constructor(
    private transactionService: TransactionService,
    private accountsService: AccountsService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(){
    this.route.params.subscribe(params => {
      const accountID = +params['id']; // Retrieve the account ID from the route
      this.sourceAccountId = accountID + "";
 
    });
  }

  validateAccount(accountId: string): boolean {
    const accountIdPattern = /^\d{13}$/;
    return accountIdPattern.test(accountId);
  }

  transferFunds() {
    const sourceAccountId = parseInt(this.sourceAccountId);
    const destinationAccountId = parseInt(this.destinationAccountId);
    const amount = parseFloat(this.amount);
    this.accountsService.getAccountByAccountId(sourceAccountId).subscribe(acc=>{
      this.account=acc;
    })
    console.log(this.account.balance)
    const balance = this.account.balance;

    if (isNaN(sourceAccountId) || isNaN(destinationAccountId) || isNaN(amount)) {
      this.transferError = 'Invalid Account number. Please enter valid numbers.';
      return;
    }

    if (!this.validateAccount(this.sourceAccountId) || !this.validateAccount(this.destinationAccountId)) {
      this.transferError = 'Account number must be 13 digits.';
      return;
    }

    if (sourceAccountId === destinationAccountId) {
      this.transferError = 'Source and destination account IDs cannot be the same.';
      return;
    }

    if (amount < 0) {
      this.transferError = 'Transaction amount can not be negative.';
      return;
    }

    if (amount === 0) {
      this.transferError = 'Transaction amount can not be zero.';
      return;
    }

    if (balance < amount) {
      this.transferError = 'Insufficient balance';
      return;
    }


    this.transactionService.transferFunds(sourceAccountId, destinationAccountId, amount, balance)
      .subscribe(
        {
          next: (data) => {
            this.transferSuccess = true;
            this.transferError = '';
          },
          error: (error) => {
            this.transferSuccess = false;
            this.transferError = error.message;
          }
        });

  }

  closeModal() {
    this.transferSuccess = false;
    this.transferError = '';
   this.router.navigate(['/transactions', this.sourceAccountId])
  }
}
