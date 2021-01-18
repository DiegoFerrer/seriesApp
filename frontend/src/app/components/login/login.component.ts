import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario';
import { SesionService } from 'src/app/services/sesion.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  @ViewChild('video', { static: true })
  video: HTMLVideoElement

  usuario:Usuario = {
      usuario: '',
      contrasena: ''
    }
  hide:Boolean = true


  constructor(private sesionService: SesionService, private route:Router) {}

  ngOnInit(): void {
    let idUsuario = localStorage.getItem('id')
    if (idUsuario) this.route.navigate(['/home'])

  }

  videos(){
    this.video.play()
  }

  login(usuario) {
    this.sesionService.login(usuario).subscribe(
      res => {
        localStorage.setItem('id', JSON.stringify(res.id))
        localStorage.setItem('usuario', (res.usuario))
        localStorage.setItem('fotourl', (res.fotourl))

        this.route.navigate(['/home'])
      },
      err => console.log(err)
    )
  }

  inputPassword(){
    this.hide = !this.hide
  }

  registrarse(){
    this.route.navigate(['/registro'])
  }

}
