import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioModel } from '../models/usuario.model';

import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = 'https://identitytoolkit.googleapis.com/v1/accounts:';
  private apiKey = 'AIzaSyAEvYAXBqWl5JVfqL36jg4ad5XZ_QmT9KY';

  userToken: string;

  // crear nuevo usuario
  // signUp?key=[API_KEY]

  // Autenticar
  // signInWithPassword?key=[API_KEY]

  constructor(private http:HttpClient) { }

  logout(){
    localStorage.removeItem('token');
  }

  login(usuario:UsuarioModel){
    const authData = {
      email: usuario.email,
      password: usuario.password,
      returnSecureToken: true
    };

    return this.http.post(
      `${this.url}signInWithPassword?key=${this.apiKey}`,
      authData
    ).pipe(
      map( res =>{
        console.log("entro en el map")
        this.guardarToken(res['idToken']);
        return res;
      })
    );
  } 
  

  nuevoUsuario (usuario:UsuarioModel){
    const authData = {
      email: usuario.email,
      password: usuario.password,
      returnSecureToken: true
    };

    return this.http.post(
      `${this.url}signUp?key=${this.apiKey}`,
      authData
    ).pipe(
      map( res =>{
        console.log("entro en el map")
        this.guardarToken(res['idToken']);
        return res;
      })
    );
  } 

  private guardarToken(idToken:string){
    this.userToken = idToken;
    localStorage.setItem('token', idToken);
  }  

  leerToken(){
    if (localStorage.getItem('token')){
      this.userToken =localStorage.getItem('token');      
    }else{
      this.userToken = '';
    }
    return this.userToken;
  }

  estaAutenticado():boolean{
    if(this.userToken.length > 2){
      return true
    } ;
  }
}
