import { AuthService } from './../../auth/services/auth.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  get user() {
    return this.authService.user
  }

  constructor(
      private router: Router,
      private authService: AuthService) { }


  logout() {

    this.router.navigateByUrl('/auth/login');
    this.authService.logout();

  }

}
