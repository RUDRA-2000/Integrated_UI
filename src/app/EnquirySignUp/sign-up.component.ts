import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'] // Fix typo from styleUrl to styleUrls
})
export class SignUpComponent {
  errorMessage: string = '';
  email: string = '';
  password: string = '';

  constructor(private http: HttpClient, private router: Router, private snackBar: MatSnackBar) {}

  signup(): void {
    const signupData = {
      email: this.email,
      password: this.password
    };

    console.log('Signup Data:', signupData); // Check if data is correct

    // Show a loading toast
    const loadingSnackbarRef = this.snackBar.open('Submitting data, please wait...', 'Close', {
      duration: 0 // 0 means it will stay until dismissed
    });

    this.http.post('https://enquirerwebapi.azurewebsites.net/api/AddEnquirer', signupData).subscribe(
      (response: any) => {
        console.log('Signup successful:', response);
        // Optionally, you can handle success response here
        loadingSnackbarRef.dismiss(); // Dismiss the loading toast
        this.snackBar.open('SignedUp successfully!', 'Close', {
          duration: 3000
        });

        this.router.navigate(['/enquirer-login']);
      },
      (error: any) => {
        console.error('Signup error:', error);

        this.errorMessage = 'Email already exists.';
        loadingSnackbarRef.dismiss(); // Dismiss the loading toast
        this.snackBar.open('Failed to Sign Up. Please try again.', 'Close', {
          duration: 3000
        });
      }
    );
  }

  checkPassword(): void {
    const passwordInput = document.getElementById('password');
    const passwordHelp = document.getElementById('passwordHelp');

    if (passwordInput && passwordHelp) {
      if ((<HTMLInputElement>passwordInput).validity.tooShort) {
        passwordHelp.classList.remove('valid');
        passwordHelp.classList.add('invalid');
        passwordHelp.textContent = 'Password must be at least 6 characters long.';
      } else {
        passwordHelp.classList.remove('invalid');
        passwordHelp.classList.add('valid');
        passwordHelp.textContent = 'Password is long enough.';
      }
    }
  }
}
