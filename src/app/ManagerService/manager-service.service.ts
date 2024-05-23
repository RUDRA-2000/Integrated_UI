import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Enquiry } from '../ManagerModel/enquiry';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ManagerServiceService {

  constructor( private http: HttpClient,  private snackBar: MatSnackBar) { }

  private baseUrl = 'https://managerapigroupb.azurewebsites.net/api/Manager';

  approveEnquiry(id: number): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${window.sessionStorage.getItem("token")}` // Ensure the token is added correctly
    });
    console.log("From api service");
    return this.http.get(`${this.baseUrl}/Approve?Id=${id}`,{headers});
  }

  rejectEnquiry(id: number,feedback: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${window.sessionStorage.getItem("token")}` // Ensure the token is added correctly
    });
    var obj={id:id,feedback:feedback}
    return this.http.post(`${this.baseUrl}/Reject`,JSON.stringify(obj),{headers});
  }

  getPendingList(id: number): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${window.sessionStorage.getItem("token")}` // Ensure the token is added correctly
    });
    return this.http.get(`${this.baseUrl}/PendingEnquiries?Id=${id}`,{headers});
  }

  getRejectedList(id: number): Observable<any> {
 
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${window.sessionStorage.getItem("token")}` // Ensure the token is added correctly
    });
    return this.http.get(`${this.baseUrl}/RejectedEnquiries?Id=${id}`,{headers});
  }

  getApprovedList(id: number): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${window.sessionStorage.getItem("token")}` // Ensure the token is added correctly
    });
    return this.http.get(`${this.baseUrl}/ApprovedEnquiries?Id=${id}`,{headers});
  }



  getEnquiryDetails(id: number): Observable<Enquiry> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${window.sessionStorage.getItem("token")}` // Ensure the token is added correctly
    });
  
    return this.http.get<Enquiry>(`${this.baseUrl}/EnquiryDetails?Id=${id}`,{headers});
  }
}
