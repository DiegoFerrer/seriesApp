import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario';
import { SesionService } from 'src/app/services/sesion.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  usuario:Usuario = {
    usuario: '',
    contrasena: ''
  }

  hide:Boolean = true

  constructor(private sesionService:SesionService, private route:Router) { }

  ngOnInit(): void {
    let idUsuario = localStorage.getItem('id')

    if (idUsuario) this.route.navigate(['/home'])
  }
  
  inputPassword(){
    this.hide = !this.hide
  }

  registrarse(usuario:Usuario){
    this.sesionService.registro(usuario).subscribe(
      res => this.sesionService.login(usuario).subscribe(
        res => {
          localStorage.setItem('id', JSON.stringify(res.id))
          localStorage.setItem('usuario', (res.usuario))
          localStorage.setItem('fotourl', (res.fotourl))
  
          this.route.navigate(['/home'])
        },
        err => console.log(err)
      ),
      err => console.log(err)
    )
  }

  iniciarSesion(){
    this.route.navigate(['/login'])
  }
}
