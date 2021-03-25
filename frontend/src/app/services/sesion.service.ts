import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root',
})
export class SesionService {
  ApiKey: string = 'key';
  URI: string;

  constructor(private http: HttpClient) {
    this.URI = 'http://localhost:3000/';
  }

  //? metodos

  //* LOGIN
  login(usuario: Usuario) {
    let userName = usuario.usuario;
    return this.http.post<Usuario>(`${this.URI}login/${userName}`, usuario);
  }
  
  //* Registro
  registro(usuario: Usuario) {
    let userName = usuario.usuario;
    return this.http.post<Usuario>(`${this.URI}registro`, usuario);
  }

  //! Esta logeado?
  logeado(){
    return !!localStorage.getItem('id')
  }

  //* Editar usuario
  updateUser(usuario:Usuario){
    let id = usuario.id
    usuario.id = 0
    return this.http.put<Usuario>(`${this.URI}updateUser/${id}`, usuario);
  }
}
