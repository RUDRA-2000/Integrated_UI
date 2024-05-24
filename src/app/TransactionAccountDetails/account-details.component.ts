import { Component, OnInit } from '@angular/core';
import { Transaction } from '../TransactionModel/transaction';
import { TransactionService } from '../Transactionservices/transaction-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountsService } from '../AccountsService/service.service';
import { Account } from '../AccountsModel/model';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.css']
})
export class AccountDetailsComponent implements OnInit{
  accountId:number=0;
  transactions: Transaction[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 10;
  acc: Account =<Account> {};

  constructor(private transactionService: TransactionService,
    private route: ActivatedRoute,
    private router: Router,
    private accountService : AccountsService,
    private Spinner:NgxSpinnerService
  ) { }

 ngOnInit(){
  this.route.params.subscribe(params => {
    const accountID = +params['id']; // Retrieve the account ID from the route
    this.accountId = accountID
    this.getAccountTransactions(accountID);
   
  });

  this.accountService.getAccountByAccountId(this.accountId).subscribe(acc=>{
    this.Spinner.show();
    this.acc=acc;
    while(this.acc==null){
         
    }
    this.Spinner.hide();
  });
  
 }

  getAccountTransactions(accountID:number) {
    this.Spinner.show();
    this.transactionService.getAccountTransactions(this.accountId)
    .subscribe({
      next: (data: Transaction[]) => {
          this.transactions = data;
          console.log(this.transactions)
          while(this.transactions==null){
         
          }
          this.Spinner.hide();
        },
      error: (error:any) => {
          console.error(error);
        }
  });
  }

  downloadTransactionsAsPDF() {
    this.transactionService.downloadTransactionsAsPDF(this.accountId);
  }
  
  onPageChange(pageNumber: number) {
    this.currentPage = pageNumber;
  }

  getPaginatedTransactions(): Transaction[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.transactions.slice(startIndex, startIndex + this.itemsPerPage);
  }

  getPaginationArray(): number[] {
    const pageCount = Math.ceil(this.transactions.length / this.itemsPerPage);
    return Array.from({ length: pageCount }, (_, index) => index + 1);
  }

  onKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.getAccountTransactions(this.accountId);
    }
  }

  GoBack(){
  
     this.router.navigate(['/list-account', this.acc.customerID])
  }
}