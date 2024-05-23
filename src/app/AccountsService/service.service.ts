import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Account } from '../AccountsModel/model';
import { Observable } from 'rxjs';
import {  HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AccountsService {

  private apiUrl = 'https://customeraccountsapi.azurewebsites.net/';
  constructor(
    private http: HttpClient
  ) { }

  getAllAccountsByCustomerId(CustId: number): Observable<Account[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${window.sessionStorage.getItem("token")}` // Ensure the token is added correctly
    });
    return this.http.get<Account[]>(`${this.apiUrl}/${CustId}`,{headers});
  }

  getAccountByAccountId(AccId: number): Observable<Account> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${window.sessionStorage.getItem("token")}` // Ensure the token is added correctly
    });
    return this.http.get<Account>(`${this.apiUrl}/AccId/${AccId}`,{headers});
  }

  createAccount(account: Account): Observable<Account> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${window.sessionStorage.getItem("token")}` // Ensure the token is added correctly
    });
    return this.http.post<Account>(`${this.apiUrl}/Create`, account,{headers});
  }

  deleteAccount(AccId: number): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${window.sessionStorage.getItem("token")}` // Ensure the token is added correctly
    });
    return this.http.delete(`${this.apiUrl}/Delete?AccID=${AccId}`,{headers});
  }

  applyForCheque(AccId: number): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${window.sessionStorage.getItem("token")}` // Ensure the token is added correctly
    });
    return this.http.put(`${this.apiUrl}/Cheque?AccID=${AccId}`, null,{headers});
  }
}