import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  isLogggedIn : null |string= 'false'
  isLogIn : boolean = true  ;

  constructor(private router: Router){
    this.isLogggedIn = window.sessionStorage.getItem('isLoggedIn')
    console.log(this.isLogggedIn)
    if(this.isLogggedIn == 'true'){
      this.isLogIn= false;
    }
  }
  onLogOut(){
     window.sessionStorage.setItem('isLoggedIn','false');
     window.sessionStorage.removeItem('token');
     this.router.navigate(['/'])
  }
  

}
