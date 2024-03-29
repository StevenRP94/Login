import { Component, OnInit } from '@angular/core';
import { UsuarioModel } from '../../models/usuario.model';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import  Swal  from "sweetalert2";
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

 
usuario:UsuarioModel;
recordar:boolean = false;

constructor(private auth:AuthService, private router:Router) { }

ngOnInit() { 
  this.usuario = new UsuarioModel();

  if( localStorage.getItem('email')){
    this.usuario.email = localStorage.getItem('email');
    this.recordar = true;
  }  
}


onSubmit(form:NgForm){

if (form.invalid){return;}

Swal.fire({
  allowOutsideClick: false,
  text: 'Espere por favor..',
  icon: 'info'
})
Swal.showLoading();

this.auth.login(this.usuario)
.subscribe(res =>{
  console.log(res)
  Swal.close();

  if(this.recordar){
    localStorage.setItem('email', this.usuario.email);
  }

  this.router.navigateByUrl('/home');
}, (err)=>{
  console.log(err.error.error.message)
  Swal.fire({
    text: err.error.error.message,
    icon: 'error'
  })
});

}

}
