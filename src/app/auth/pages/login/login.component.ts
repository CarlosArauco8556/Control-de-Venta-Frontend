import { Component, inject, OnInit } from '@angular/core';
import { HomeNavbarComponent } from "../../_shared/components/home-navbar/home-navbar.component";
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AuthServiceService } from '../../services/auth-service.service';

@Component({
  selector: 'app-login',
  imports: [HomeNavbarComponent, CommonModule, FormsModule, ReactiveFormsModule, HttpClientModule],
  providers: [AuthServiceService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  
  private authService: AuthServiceService = inject(AuthServiceService);
  errorMessage: string[] = [];
  forms!: FormGroup;
  confirmMessage: string = '';

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit()
  {
    this.CreateForm();
  }

  CreateForm() {
    this.forms = this.formBuilder.group({
      email: [''],
      password: ['']
    });
  }

  async onSubmit() {
    console.log('Formulario válido:', this.forms.valid);
    if (this.forms.invalid) {
      console.log('Formulario inválido, no se enviará');
    }
  
    try {
      const loginDto = this.forms.value;
      const response = await this.authService.login(loginDto);

      if (response){
        this.errorMessage = [];
        console.log('Usuario logueado:', response);
      }else{
        console.log('Error al loguear el usuario', this.errorMessage);
      }
    } catch (error) {
      this.confirmMessage = 'Error al loguear el usuario';
      console.log('Error en login', error);
    }
  }

  get EmailErrors() {
    const email = this.forms.get('email');
    if (email?.invalid && email?.touched) {
      if (email.hasError('required')) {
        return 'El correo es obligatorio.';
      }
      if (email.hasError('email')) {
        return 'El correo debe ser válido.';
      }
    }
    return null;
  }
  
  get PasswordErrors() {
    const password = this.forms.get('password');
    if (password?.invalid && password?.touched) {
      if (password.hasError('required')) {
        return 'La contraseña es obligatoria.';
      }
      if (password.hasError('minlength')) {
        return 'La contraseña debe tener al menos 8 caracteres.';
      }
      if (password.hasError('maxlength')) {
        return 'La contraseña no debe exceder 20 caracteres.';
      }
    }
    return null;
  }
}
