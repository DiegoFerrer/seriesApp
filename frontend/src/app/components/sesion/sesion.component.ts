import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Usuario } from 'src/app/models/usuario';
import { SesionService } from 'src/app/services/sesion.service';
import { SpinnerService } from 'src/app/services/spinner.service';

@Component({
  selector: 'app-sesion',
  templateUrl: './sesion.component.html',
  styleUrls: ['./sesion.component.css']
})

export class SesionComponent implements OnInit {

  @ViewChild('video', { static: true })
  // video: HTMLVideoElement
  video: ElementRef

  usuario:Usuario = {
      usuario: '',
      contrasena: ''
    }
  hide:Boolean = true

  stackLogin:boolean = true

  botonesSesion = {
      principal: 'Iniciar sesion',
      secundario: 'Registrarse'
  }         

    // spinner boolean
    inProgress = new Subject<boolean>();

  constructor(private sesionService: SesionService, private route:Router, private spinnerService:SpinnerService) {}

  ngOnInit(): void {
    this.inProgress = this.spinnerService.inProgress; 
    let idUsuario = localStorage.getItem('id')
    if (idUsuario) this.route.navigate(['/home'])
    
    this.video.nativeElement.muted = true 



  }

  eventoEnter(evento){
    if (evento.key == 'Enter'){
      evento.preventDefault()
      this.login(this.usuario)
    }
  }

  sesion(usuario) {
    this.stackLogin ? this.login(usuario) : this.registrarse(usuario)
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

  registrarse(usuario:Usuario){
    console.log(usuario)
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

  stack(){
    // si estoy en login
    if(this.stackLogin){     
      this.botonesSesion.principal = 'Registrarse'
      this.botonesSesion.secundario = 'Iniciar Sesión'
      this.stackLogin = false
    }
    // si estoy en registro
    else { 
      this.botonesSesion.principal = 'Iniciar Sesión'
      this.botonesSesion.secundario = 'Registrarse'
      this.stackLogin = true
    }
  }

  inputPassword(){
    this.hide = !this.hide
  }
}
