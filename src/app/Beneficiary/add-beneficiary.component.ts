import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CustomersApiService } from '../CustomerService/customer-service.service';
import { Beneficiary } from './view-beneficiary.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-beneficiary',
  templateUrl: './add-beneficiary.component.html',
  styleUrl: './add-beneficiary.component.css'
})
export class AddBeneficiaryComponent implements OnInit{
  beneficiary: Beneficiary = new Beneficiary(0, '','', '', true, 0, 0);
  customerId: number | null = null;
  message: string = '';

  constructor(
    private beneficiariesService: CustomersApiService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const customerIdParam = this.route.snapshot.paramMap.get('customerId');
    if (customerIdParam) {
      this.customerId = +customerIdParam;
      this.beneficiary.customerId = this.customerId;
    } else {
      this.customerId = +window.sessionStorage.getItem('customerId')!;
      if (this.customerId) {
        this.beneficiary.customerId = this.customerId;
      } else {
        this.router.navigateByUrl('/user-login');
      }
    }
  }

  onSubmit(): void {
    // Hard-code isActive to true
    this.beneficiary.isActive = true;

    if (this.customerId !== null) {
      this.beneficiariesService.addBeneficiary(this.beneficiary).subscribe({
        next: () => {
          this.message = 'Beneficiary added successfully.';
          setTimeout(() => this.router.navigate(['/view-beneficiaries', this.customerId]), 2000);
        },
        error: (error) => {
          console.error('Error adding beneficiary:', error);
          this.message = 'Failed to add beneficiary. Please try again.';
        }
      });
    } else {
      this.message = "No customer ID available. Please log in again.";
      this.router.navigate(['/customer-dashboard',this.customerId]);
    }
  }

  onBack(): void {
    this.router.navigate(['/view-beneficiaries', this.customerId]);
  }
}
