import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Account } from '../AccountsModel/model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountsService {

  private apiUrl = 'https://customeraccountsapi.azurewebsites.net/';
  constructor(
    private http: HttpClient
  ) { }

  getAllAccountsByCustomerId(CustId: number): Observable<Account[]> {
    return this.http.get<Account[]>(`${this.apiUrl}/${CustId}`);
  }

  getAccountByAccountId(AccId: number): Observable<Account> {
    return this.http.get<Account>(`${this.apiUrl}/AccId/${AccId}`);
  }

  createAccount(account: Account): Observable<Account> {
    return this.http.post<Account>(`${this.apiUrl}/Create`, account);
  }

  deleteAccount(AccId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/Delete?AccID=${AccId}`);
  }

  applyForCheque(AccId: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/Cheque?AccID=${AccId}`, null);
  }
}