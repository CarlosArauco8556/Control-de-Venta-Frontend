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
      console.log('Error en login', error);
    }
  }
}
