import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountsService } from '../AccountsService/service.service';
import { Account } from '../AccountsModel/model';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-accounts-create-new',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class createAccountComponent implements OnInit {
  accountForm: FormGroup;
  newAccount: Account = <Account>{};
  successMessage: string = '';
  isFormInvalid: boolean = false;
  custId: number=0;

  constructor(
    private formBuilder: FormBuilder,
    private accountsService: AccountsService,
    private router: Router,
    private route: ActivatedRoute, 
    private snackBar: MatSnackBar
  ) {
    this.accountForm = this.formBuilder.group({}); // Initialize with an empty form group
  }

  ngOnInit(): void {
    this.accountForm = this.formBuilder.group({
      accountID: ['0'],
      balance: [null, Validators.required],
      hasCheque: [false, Validators.required],
      wd_quota: [''],
      dp_quota: [''],
      isActive: [true],
      customerID: [null, Validators.required],
      type_id: [null, Validators.required],
      branchID: ['BRN000']
    }, { validators: this.balanceValidator });

    this.accountForm.get('type_id')?.valueChanges.subscribe(typeId => {
      this.updateQuotas(typeId);
    });

 
    this.accountForm.get('hasCheque')?.valueChanges.subscribe(hasCheque => {
      const isChecked = hasCheque === 'true';
      this.accountForm.patchValue({ hasCheque: isChecked }, { emitEvent: false });
    });

    this.route.paramMap.subscribe(params => {
      this.custId = +params.get('id')!;
     this.accountForm.get('customerID')?.setValue(this.custId);
    });
  }



  updateQuotas(typeId: string): void {
    if (typeId === "1") {
      this.accountForm.get('wd_quota')?.setValue(10);
      this.accountForm.get('dp_quota')?.setValue(5);
    } else if (typeId === "2") {
      this.accountForm.get('wd_quota')?.setValue(99999);
      this.accountForm.get('dp_quota')?.setValue(30);
    } else {
      this.accountForm.get('wd_quota')?.setValue('');
      this.accountForm.get('dp_quota')?.setValue('');
    }
   
  }

  balanceValidator(control: AbstractControl): { [key: string]: string } | null {
    const typeId = control.get('type_id')?.value;
    const balance = control.get('balance')?.value;
    if (typeId == null || balance == null) {
      return null;
    }
    if (typeId === "1" && balance < 5000) {
      return { balanceError: 'For Savings Account, the initial deposit must be 5,000' };
    } else if (typeId === "2" && balance < 10000) {
      return { balanceError: 'For Current Account, the initial deposit must be 10,000' };
    }
    return null;
  }

  onReset(): void {
   this.accountForm.reset();
  }

  onSubmit(): void {
    if (this.accountForm.valid) {
      this.snackBar.open('Creating account, please wait...', 'Close', {
        duration: 3000,
      });

     
      this.accountsService.createAccount(this.accountForm.value).subscribe(
        (response: any) => {
          this.snackBar.open('Account created successfully!', 'Close', {
            duration: 3000,
          });
          console.log('Account created successfully', this.successMessage);
          this.accountForm.reset();
          this.router.navigate(['/list-account',this.custId]);
        },
        error => {
          this.snackBar.open('Error creating account.', 'Close', {
            duration: 3000,
          });
          console.error('Error creating account:', error);
          if (error.status === 400) {
            
          } else {
            // Handle other errors
          }
        }
      );
    } else {
      this.accountForm.markAllAsTouched();
      this.snackBar.open('Please fill in all required fields.', 'Close', {
        duration: 3000,
      });
    }
  }

  GoBack(){
    const loadingSnackbarRef = this.snackBar.open('Loading, please wait...', 'Close', {
      duration: 1000 // 0 means it will stay until dismissed
    });
     this.router.navigate(['/list-account', this.custId]);
  }
}