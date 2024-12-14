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
      }else{
        console.log('Error al registrar el usuario', this.errorMessage);
      }
    } catch (error) {
      console.log('Error en registro', error);
    }
  }
}
