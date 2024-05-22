import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
import { Transaction } from '../TransactionModel/transaction';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

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

  transferFunds(sourceAccountId: number, destinationAccountId: number, amount: number): Observable<any> {
    const url = `${this.apiUrl}/Transfer`;
    const body = { sourceAccountId, destinationAccountId, amount };
    return this.http.post(url, body);
  }

  downloadTransactionsAsPDF(accountId: number): void {
    this.getAccountTransactions(accountId).subscribe((transactions: Transaction[]) => {
      const doc = new jsPDF();
      (doc as any).autoTable({
        head: [['Transaction ID', 'Source Account', 'Destination Account', 'Amount', 'Date', 'Transaction Type']],
        body: transactions.map(transaction => [
          transaction.transactionID,
          transaction.source_acc,
          transaction.dest_acc,
          transaction.amount,
          transaction.time,
          transaction.transactionType
        ])
      });
      doc.save(`transactions_${accountId}.pdf`);
    });
  }
}