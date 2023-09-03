import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  value: any = '';
  enviado: boolean = false;


  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) { }

  public myForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.minLength(3)]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  validField(field: string): boolean | null {
    return (
      this.myForm.controls[field].errors && this.myForm.controls[field].touched
    );
  }

/*    fieldError(field: string): string | null {
    if (!this.myForm.controls[field]) return null;

    const errors = this.myForm.controls[field].errors || {};

    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return `*This field is required`;
        case 'minlength':
          return `Min ${errors['minlength'].requiredLength} caraters`;
      }
    }
    return null;
  }  */

  login() {
    const { email, password } = this.myForm.value;

    this.userService.login(email, password)
      .subscribe({
        next: () => {
          this.router.navigate(['/pages/Account']);
          localStorage.setItem('user', email);
        },
         error: (message) => {
          Swal.fire("Error!", message, "error");
        }
      })
  }
}
