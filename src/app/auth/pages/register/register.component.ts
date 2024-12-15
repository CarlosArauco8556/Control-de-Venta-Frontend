import { Component, inject, OnInit } from '@angular/core';
import { HomeNavbarComponent } from "../../_shared/components/home-navbar/home-navbar.component";
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AuthServiceService } from '../../services/auth-service.service';

@Component({
  selector: 'app-register',
  imports: [HomeNavbarComponent, CommonModule, FormsModule, ReactiveFormsModule, HttpClientModule],
  providers: [AuthServiceService],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  
  private authService: AuthServiceService = inject(AuthServiceService);
  errorMessage: string[] = [];
  forms!: FormGroup;
  successMessage: string = '';

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit()
  {
    this.CreateForm();
  }

  CreateForm() {
    this.forms = this.formBuilder.group({
      name: [''],
      rut: [''],
      email: [''],
      phoneNumber: [''],
      password: [''],
      confirmPassword: ['']
    });
  }
  
  async onSubmit() {
    console.log('Formulario válido:', this.forms.value);
    if (this.forms.invalid) {
      console.log('Formulario inválido, no se enviará');
    }
  
    try {
      const registerDto = this.forms.value;
      const response = await this.authService.register(registerDto);

      if (response){
        this.errorMessage = [];
        console.log('Usuario registrado:', response);
        this.successMessage = 'Usuario registrado correctamente.';
      }else{
        console.log('Error al registrar el usuario', this.errorMessage);
      }
    } catch (error) {
      console.log('Error en registro', error);
    }
  }

  get NameErrors() {
    const name = this.forms.get('name');
    if (name?.invalid && name?.touched) {
      if (name.hasError('required')) {
        return 'El nombre es obligatorio.';
      }
      if (name.hasError('minlength')) {
        return 'El nombre debe tener al menos 2 caracteres.';
      }
      if (name.hasError('maxlength')) {
        return 'El nombre no debe exceder 100 caracteres.';
      }
    }
    return null;
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

  get RutErrors() {
    const rut = this.forms.get('rut');
    if (rut?.invalid && rut?.touched) {
      if (rut.hasError('required')) {
        return 'El rut es obligatorio.';
      }
      if (rut.hasError('minlength')) {
        return 'El rut debe tener al menos 9 caracteres.';
      }
      if (rut.hasError('maxlength')) {
        return 'El rut no debe exceder 10 caracteres.';
      }
    }
    return null;
  }

  get PhoneNumberErrors() {
    const phoneNumber = this.forms.get('phoneNumber');
    if (phoneNumber?.invalid && phoneNumber?.touched) {
      if (phoneNumber.hasError('required')) {
        return 'El número de teléfono es obligatorio.';
      }
      if (phoneNumber.hasError('minlength')) {
        return 'El número de teléfono debe tener al menos 9 caracteres.';
      }
      if (phoneNumber.hasError('maxlength')) {
        return 'El número de teléfono no debe exceder 12 caracteres.';
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

  get ConfirmPasswordErrors() {
    const confirmPassword = this.forms.get('confirmPassword');
    if (confirmPassword?.invalid && confirmPassword?.touched) {
      if (confirmPassword.hasError('required')) {
        return 'La confirmación de contraseña es obligatoria.';
      }
      if (confirmPassword.hasError('minlength')) {
        return 'La confirmación de contraseña debe tener al menos 8 caracteres.';
      }
      if (confirmPassword.hasError('maxlength')) {
        return 'La confirmación de contraseña no debe exceder 20 caracteres.';
      }
    }
    return null;
  }

  get PasswordMatchErrors() {
    const password = this.forms.get('password');
    const confirmPassword = this.forms.get('confirmPassword');
    if (password?.value !== confirmPassword?.value) {
      return 'Las contraseñas no coinciden.';
    }
    return null;
  }
}
