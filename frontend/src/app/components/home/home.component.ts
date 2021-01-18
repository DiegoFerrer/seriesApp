import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { SeriesService } from 'src/app/services/series.service';
import { Serie } from 'src/app/models/serie';
import { MatDialog } from '@angular/material/dialog';
import { AddComponentComponent } from '../add-component/add-component.component';
import { Router } from '@angular/router';
import { EditarPerfilComponent } from '../editar-perfil/editar-perfil.component';
import { Usuario } from 'src/app/models/usuario';
import { SesionService } from 'src/app/services/sesion.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  @ViewChild('filtro', { static: false })
  filtro: ElementRef;
  private _textoFiltro: string = '';

  get textoFiltro() {
    return this._textoFiltro;
  }

  set textoFiltro(texto: string) {
    this._textoFiltro = texto;
    this.seriesFiltradas =
      texto && texto != '' ? this.filtrar(texto) : this.series;
  }

  seriesFiltradas: Serie[];
  series: Serie[];
  activado = 0;
  id:number = Number(localStorage.getItem('id'))
  usuario:string = localStorage.getItem('usuario')
  fotoUrl = localStorage.getItem('fotourl')

  constructor(
    private seriesService: SeriesService,
    private sesionService:SesionService,
    private dialog: MatDialog,
    private route: Router
  ) {
    if(!this.id) this.route.navigate(['/login'])
  }

  ngOnInit(): void {
    this.obtenerSeries();
  }

  logout(){
    localStorage.clear()
    this.route.navigate(['/login'])
  }

  //* Filtrar series
  filtrar(texto: string) {
    return this.series.filter((serie: Serie) =>
      serie.nombre.toLowerCase().startsWith(texto.toLowerCase())
    );
  }

  //* Obtener Series
  obtenerSeries() {
    this.seriesService.getSeries(this.id).subscribe(
      (res) => {
        res.map((serie) => {
          serie.float = Boolean(Number(serie.valoracion) % 1);
        });
        // ordenar numericamente
        res.sort((a,b) => Number(b.valoracion) - Number(a.valoracion))


        this.series = res;
        this.seriesFiltradas = res;
        setTimeout(() => {
          this.activado = 1;
        }, 1000);
      },
      (err) => console.log(err)
    );
  }

  //* Agregar Serie
  agregarSerie(serie: Serie) {
    serie.id = this.id
    this.seriesService.createSerie(serie).subscribe(
      (res) => this.obtenerSeries(),
      (err) => console.log(err)
    );
  }

  //* Editar Serie
  editarSerie(serie: Serie) {
    this.seriesService.updateSerie(serie).subscribe(
      (res) => this.obtenerSeries(),
      (err) => console.log(err)
    );
  }

  //*  Borrar Serie
  borrarSerie(id: number) {
    this.seriesService.deleteSerie(id).subscribe(
      (res) => this.obtenerSeries(),
      (err) => console.log(err)
    );
  }

  //* Editar Usuario

  editarUsuario(usuario:Usuario){
    this.sesionService.updateUser(usuario).subscribe(
      res => {
        localStorage.setItem('fotourl', usuario.fotourl)
        this.fotoUrl = usuario.fotourl
      },
      err => console.log(err)
    )
  }

  //!----------------------------------------------------------------------------
  //?---------------------- Dialog Agregar Serie --------------------------------

  openDialogAdd() {
    const dialogRef = this.dialog.open(AddComponentComponent, {
      width: '800px'
    });
    dialogRef.afterClosed().subscribe(
      res => (res ? this.agregarSerie(res) : false),
      err => console.log(err)
    );
  }

  //? ------------------- Dialog Editar Perfil ----------------------------------
  openDialogEdit(){
    let usuario:Usuario = {
      id: this.id,
      fotourl: this.fotoUrl,
      usuario: this.usuario,
      contrasena: ''
    };
    const dialogRef = this.dialog.open(EditarPerfilComponent,{
      width:'800px',
      data: usuario
    })
    dialogRef.afterClosed().subscribe(
      res => (res ? this.editarUsuario(res) : false),
      err => console.log(err)
    )
  }
}
