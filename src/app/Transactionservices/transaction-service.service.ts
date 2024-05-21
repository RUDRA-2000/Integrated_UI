import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
import { Transaction } from '../TransactionModel/transaction';


@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  apiUrl = 'https://transactionapis.azurewebsites.net/'; // Replace with your API URL

  constructor(private http: HttpClient) { }

  getTransaction(transactionId: number): Observable<Transaction[]> {
    const url = `${this.apiUrl}/Specific/${transactionId}`;
    return this.http.get<Transaction[]>(url);
  }

  getAccountTransactions(accountId: number): Observable<Transaction[]> {
    const url = `${this.apiUrl}/${accountId}`;
    return this.http.get<Transaction[]>(url);
  }

  transferFunds(sourceAccountId: number, destinationAccountId: number, amount: number, balance:number): Observable<any> {
    const url = `${this.apiUrl}/Transfer`;
    const body = { sourceAccountId, destinationAccountId, amount };
    return this.http.post(url, body);
  }
}