import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CustomersApiService } from '../CustomerService/customer-service.service';
import {  HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-customer-view-profile',
  templateUrl: './customer-view-profile.component.html',
  styleUrl: './customer-view-profile.component.css'
})
export class CustomerViewProfileComponent {
  CustomerDetails: CustomerModel = new CustomerModel();
  showDeleteConfirmation = false;
  message: string | null = null;

  constructor(private http: HttpClient, private router: Router, private apiService: CustomersApiService) {
    this.loadCustomerDetails();
  }

  loadCustomerDetails(): void {
    const customerId = window.sessionStorage.getItem("customerId");
    if (customerId) {
      this.apiService.getDetails(+customerId).subscribe(
        data => {
          this.CustomerDetails = data;
        },
        error => {
          console.error('Failed to load customer details', error);
          this.message = 'Failed to load customer details';
        }
      );
    } else {
      this.message = 'Customer ID not found. Please log in again.';
      this.router.navigate(['/customer-login']);
    }
  }

  onEdit(): void {
    // Navigate to the Edit Profile page
    this.router.navigate(['/customer-edit-profile', this.CustomerDetails.customerId]);
  }

  onDelete(): void {
    this.showDeleteConfirmation = true;
  }

  confirmDelete(): void {
    this.apiService.deleteCustomer(this.CustomerDetails.customerId).subscribe({
      next: () => {
        this.message = 'Customer deleted successfully';
        this.router.navigate(['/customer-login']);
      },
      error: () => {
        this.message = 'Failed to delete customer';
        this.showDeleteConfirmation = false;
      }
    });
  }

  onCancelDelete(): void {
    this.showDeleteConfirmation = false;
  }

  onBack(): void {
    this.router.navigate(['/customer-dashboard']);
  }
}

export class CustomerModel {
  constructor(
    public customerId: number = 0, // default value if not known
    public firstName: string = '',
    public lastName: string = '',
    public addressLine1: string = '',
    public addressLine2: string = '',
    public addressLine3: string = '',
    public phoneNumber: string = '',
    public pincode: number = 0,
    public emailAddress: string = '',
    public dateOfBirth: Date = new Date(), // Default to current date or set a fixed date
    public city: string = '',
    public country: string = ''
  ) {}
}
