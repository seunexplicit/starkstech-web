import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RestServiceService } from '../../services/rest-service.service';
import { MatDialog } from '@angular/material/dialog';
import { UtilityServiceService } from '../../services/utility-service.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { PasswordMismatch } from '../../services/validator.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  createGroup: FormGroup;
  loginGroup: FormGroup;
  isSubmitted: boolean = false;
  googleSignInUrl: string = '';
  action: string = 'login';

  constructor(
    private fb: FormBuilder,
    private restService: RestServiceService,
    private utility: UtilityServiceService,
    private router: Router,
    private activateRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.initialize();
    this.activateRoute.queryParamMap.subscribe((params) => {
      if (params.get('code')) this.submitGoogleCode(params.get('code'));
    });

  }

  async login() {
    try {
      if (!this.loginGroup.valid) {
        return this.clearError();
      }
      const loader = await this.utility.showLoader();
      const response = await this.restService.loginUser(this.loginGroup.value)
      loader.close();
      if (response.status) {
        this.utility.showToast(response.message || 'Login successful!!!', 'success')
        sessionStorage.setItem("user_details", JSON.stringify(response.data?.user));
        sessionStorage.setItem('authorization', JSON.stringify(response.data?.credentials?.token))
        this.router.navigateByUrl('/');
      }
      
    }
    catch (err) {
      console.log(err);
      this.utility.closeLoader();
      this.utility.showToast(err.error?.message || 'An error occur', 'error');
    }
  }

  async createAnAccount() {
    try {
      if (!this.createGroup.valid) {
        return this.clearError();
      }

      const loader = await this.utility.showLoader();
      const response = await this.restService.createUser(this.createGroup.value);
      loader.close();
      if (response.status) {
        this.utility.showToast(response.message || 'Login successful!!!', 'success')
        sessionStorage.setItem("user_details", JSON.stringify(response.data?.user));
        sessionStorage.setItem('authorization', JSON.stringify(response.data?.credentials?.token))
        this.router.navigateByUrl('/');
      }
    }
    catch (err) {
      this.utility.closeLoader();
      this.utility.showToast(err.error?.message || 'An error occur', 'error');
    }
  }

  clearError() {
    this.isSubmitted = true;
    setTimeout(() => this.isSubmitted = false, 9000);
  }

  async submitGoogleCode(code) {
    try {
      const loader = await this.utility.showLoader();
      const response = await this.restService.postOauthCode({ code });
      loader.close();
      if (response.status) {
        this.utility.showToast(response.message || 'Login successful!!!', 'success')
        sessionStorage.setItem("user_details", JSON.stringify(response.data?.user));
        sessionStorage.setItem('authorization', JSON.stringify(response.data?.credentials?.token))
        this.router.navigateByUrl('/');
      }
    }
    catch (err) {
      this.utility.closeLoader();
      this.utility.showToast(err.error?.message || 'An error occur', 'error');
    }
  }

  async initialize() {
    try {
      this.createGroup = this.fb.group({
        firstName: ['', [Validators.required]],
        lastName: [''],
        email: ['', [Validators.required, Validators.email]],
        username: ['', [Validators.required]],
        password: ['', [Validators.required]],
        password1: ['', [Validators.required]],
      }, { validators: [PasswordMismatch] })

      this.loginGroup = this.fb.group({
        username: ['', [Validators.required]],
        password: ['', [Validators.required]]
      })

      const loader = await this.utility.showLoader();
      const response = await this.restService.getGoogleOAuthUrl();
      loader.close();

      if (response.status) {
        this.googleSignInUrl = response.data;
      }
    }
    catch (err) {
      this.utility.closeLoader();
    }
  }

}
