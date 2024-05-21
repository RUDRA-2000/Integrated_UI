import { HttpClient } from '@angular/common/http';
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
    console.log("From api service");
    return this.http.get(`${this.baseUrl}/Approve?Id=${id}`);
  }

  rejectEnquiry(id: number,feedback: string): Observable<any> {
    var obj={id:id,feedback:feedback}
    return this.http.post(`${this.baseUrl}/Reject`,JSON.stringify(obj),{ headers: { 'Content-Type': 'application/json'}});
  }

  getPendingList(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/PendingEnquiries?Id=${id}`);
  }

  getRejectedList(id: number): Observable<any> {
 
  
    return this.http.get(`${this.baseUrl}/RejectedEnquiries?Id=${id}`);
  }

  getApprovedList(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/ApprovedEnquiries?Id=${id}`);
  }



  getEnquiryDetails(id: number): Observable<Enquiry> {
  
    return this.http.get<Enquiry>(`${this.baseUrl}/EnquiryDetails?Id=${id}`);
  }
}
