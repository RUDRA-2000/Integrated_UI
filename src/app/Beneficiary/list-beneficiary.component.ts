import { Component, EventEmitter, Output } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CustomersApiService } from '../CustomerService/customer-service.service';

@Component({
  selector: 'app-list-beneficiary',
  templateUrl: './list-beneficiary.component.html',
  styleUrl: './list-beneficiary.component.css'
})
export class ListBeneficiaryComponent {
  @Output() dataEvent = new EventEmitter<string>();


  
  beneficiaries: Beneficiary[] = [];
  message: string = '';
  deleteMessage: string = '';
  accountToDelete: string | null = null;
  customerId: number | null = null;

  constructor(
    private beneficiariesService: CustomersApiService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const customerId =  window.sessionStorage.getItem('customerId');
    console.log(customerId)
    if (customerId) {
      this.customerId = +customerId;
      this.loadBeneficiaries(this.customerId);
    } else {
      this.router.navigateByUrl('/user-login'); // Redirect to login if customerId is not found
    }
  }

  loadBeneficiaries(customerId: number): void {
    this.beneficiariesService.getBeneficiariesByCustomerId(customerId).subscribe({
      next: (res) => {
        console.log('Beneficiaries fetched:', res); // Debug log
        this.beneficiaries = res;
      },
      error: (error) => {
        this.message = 'Failed to load beneficiaries. Please try again.';
        console.error('Get Beneficiaries Error:', error);
      }
    });
  }

  onDeleteBeneficiary(accountNumber: string): void {
    this.accountToDelete = accountNumber;
    this.deleteMessage = 'Are you sure you want to delete this beneficiary?';
  }

  confirmDelete(): void {
    if (this.accountToDelete !== null) {
      this.beneficiariesService.deleteBeneficiaryByAccountId(parseInt(this.accountToDelete, 10)).subscribe({
        next: () => {
          this.message = 'Beneficiary deleted successfully.';
          this.beneficiaries = this.beneficiaries.filter(b => b.benefAccount !== this.accountToDelete);
          this.deleteMessage = '';
          this.accountToDelete = null;
        },
        error: (error) => {
          this.message = 'Failed to delete beneficiary. Please try again.';
          console.error('Delete Beneficiary Error:', error);
          this.deleteMessage = '';
          this.accountToDelete = null;
        }
      });
    }
  }

  cancelDelete(): void {
    this.deleteMessage = '';
    this.accountToDelete = null;
  }

  onAddBeneficiary(): void {
    const customerId = window.sessionStorage.getItem('customerId');
    if (customerId) {
      this.router.navigate(['/add-beneficiary']);
    } else {
      this.message = "No customer ID available. Please log in again.";
      this.router.navigate(['/customer-dashboard', this.customerId]);
    }
  }

  onBack(): void {
    this.router.navigate(['/customer-dashboard', this.customerId]);
  }

  getAccountType(type: number): string {
    return type === 1 ? 'Savings' : type === 2 ? 'Current' : 'Unknown';
  }

  onSelect(BenefAcc: string){
 
    this.dataEvent.emit(BenefAcc);
  }
}

export class Beneficiary {
  constructor(
    public benefId: number,
    public benefName: string,
    public benefAccount: string,
    public ifsc: string,
    public isActive: boolean,
    public customerId: number,
    public benefAccType: number
  ) {}
}
