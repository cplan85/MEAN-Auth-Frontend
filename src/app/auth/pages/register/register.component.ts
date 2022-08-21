import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  myForm: FormGroup = this.formBuilder.group({
    name: ['Joe', [Validators.required, Validators.minLength(2)]],
    email: ['test1@test.com', [Validators.required, Validators.email]],
    password: ['123456', [Validators.required, Validators.minLength(6)]]

  })

  constructor(private formBuilder: FormBuilder,
    private router: Router) { }

  register() {
    console.log(this.myForm.value)


    this.router.navigateByUrl('/dashboard');
  }


}
