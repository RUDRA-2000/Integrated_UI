import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CustomersApiService } from '../CustomerService/customer-service.service';

@Component({
  selector: 'app-account-dashboard',
  templateUrl: './customer-dashboard.component.html',
  styleUrl: './customer-dashboard.component.css'
})
export class CustomerDashboardComponent {
  customerId?: number;  // Declare customerId as an optional number
  

  constructor(private router: Router) {
    this.initializeCustomerId()
  
  }

 

  initializeCustomerId() {
    const storedId = window.sessionStorage.getItem("customerId");
    console.log("Retrieved customer ID:", storedId); // Check what is actually retrieved
    if (storedId) {
      this.customerId = parseInt(storedId);
      console.log("Parsed customer ID:", this.customerId); // Verify it parses correctly
    } else {
      console.error("No customer ID found in session storage.");
      //this.router.navigateByUrl('/customer-login'); // Redirect to login if ID not found
    }
  }


  onViewProfile() {
    this.router.navigateByUrl('/customer-view-profile');
  }

  onViewDocuments() {
    if (this.customerId) {
      this.router.navigate(['/customer-view-document', this.customerId]);
    } else {
      alert("No customer ID available. Please log in again.");
      this.router.navigateByUrl('/customer-login');
    }
  }

  isAuthenticated(): boolean {
    return !!window.sessionStorage.getItem("token");
  }

  onSubmitSignOut() {
    window.sessionStorage.clear();
    this.router.navigateByUrl('/customer-login');
  }

  onViewBeneficiaries(){
    
    if(this.customerId)
    this.router.navigate(['/view-beneficiaries',this.customerId])
  else{
    this.router.navigate(['/contact'])
  }
  }

  onViewAccounts(){
    this.router.navigate(['/list-account',this.customerId])
  }
}
