import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { UserDataService } from '../Enquiryservices/user-data.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';
  loginResponse: any | null = null;



  constructor(
    private http: HttpClient,
    private router: Router, // Inject Router
    private userDataService: UserDataService,
    private snackBar: MatSnackBar
  ) {}

  login(): void {
    // Check if email and password are provided
    if (!this.email || !this.password) {
      this.errorMessage = 'Please provide both email and password.';
      return;
    }
  
    // Make HTTP POST request to login API
    const url = 'https://enquirerwebapi.azurewebsites.net/api/GetEnquirer';
    const body = { email: this.email, password: this.password };
    const body1={email:this.email}

    console.log(body)
  
       // Show a loading toast
       const loadingSnackbarRef = this.snackBar.open('Submitting data, please wait...', 'Close', {
        duration: 0 // 0 means it will stay until dismissed
      })

    // First HTTP POST request to login API
    this.http.post<any>(url, body).subscribe(
      response => {
        // Handle successful login response
        console.log('Login successful:', response);

        loadingSnackbarRef.dismiss(); // Dismiss the loading toast
        this.snackBar.open('Logged In successfully!', 'Close', {
          duration: 3000
        });

        this.userDataService.setLoginResponse(response);
        this.userDataService.setUserEmail(this.email);
  
        // Clear error message
        this.errorMessage = '';
  
        // Make second HTTP POST request to get documents
        const url2 = 'https://enquirerwebapi.azurewebsites.net/api/GetDocuments';
       // const body2 = { email: this.email };
  
        this.http.post<any>(url2, body1).subscribe(
          response2 => {
            // Handle successful documents response
            console.log('Documents retrieved:', response2);
            this.userDataService.setloginDocumentResponse(response2);
  
            // Clear error message
            this.errorMessage = '';

            // Redirect to EnquiryFormComponent upon successful login
           this.router.navigate(['/enquiryForm']); // Specify the route path
            
         

          },
          error => {
            // Handle documents retrieval error
            console.error('Failed to retrieve documents:', error);
            this.errorMessage = 'Failed to retrieve documents. Please check your credentials.';
          }
        );
      },
      error => {
        // Handle login error
        console.error('Login failed:', error);
        this.errorMessage = 'Login failed. Please check your credentials.';

        loadingSnackbarRef.dismiss(); // Dismiss the loading toast
        this.snackBar.open('Failed to LogIn. Please try again.', 'Close', {
          duration: 3000
        });
      }
    );
  }
  
    

  }
  
