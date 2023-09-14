import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Router } from '@angular/router';

import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  value: any = '';
  enviado: boolean = false;
  error: boolean = false;
  mensaje: string = '';
  public charge: boolean = false

  private router = inject(Router) 

  constructor(private fb: FormBuilder, private userService: UserService, ) { }

  public myForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.minLength(3)]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  validField(field: string): boolean | null {
    return (
      this.myForm.controls[field].errors && this.myForm.controls[field].touched
    );
  }


  login() {
    this.charge = true;
    const { email, password } = this.myForm.value;

    this.userService.login(email, password)
      .subscribe({
        next: () => {
          this.charge = false;
          this.router.navigate(['/pages/Account']);
          localStorage.setItem('user', email);
        },
         error: (message) => {
          this.charge = false;
          this.error = true
          this.mensaje = message
        }
      })
  }
}
