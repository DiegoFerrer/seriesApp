import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { SeriesService } from 'src/app/services/series.service';
import { Serie } from 'src/app/models/serie';
import { MatDialog } from '@angular/material/dialog';
import { AddComponentComponent } from '../add-component/add-component.component';
import { SerieModificada } from 'src/app/models/serie-modificada';
import { type } from 'os';

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

  constructor(
    private seriesService: SeriesService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.obtenerSeries();
  }

  //* Filtrar series
  filtrar(texto: string) {
    return this.series.filter((serie: Serie) =>
      serie.nombre.toLowerCase().startsWith(texto.toLowerCase())
    );
  }

  //* Obtener Series
  obtenerSeries() {
    this.seriesService.getSeries().subscribe(
      (res) => {
        // let variable = 8.5
        // console.log(Math.trunc(variable))
        // console.log(8.5 % 1)
        res.map((serie) => {
          let serieArray = [];
          serie.valoracion = Number(serie.valoracion);
          serie.float = Boolean(serie.valoracion % 1)
          for (let i = 1; i < (Math.trunc(serie.valoracion) + 1); i++) {
            serieArray.push(i)
          }
          serie.valoracionModificada = serieArray
        });

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

  //!----------------------------------------------------------------------------
  //?---------------------- Dialog Agregar Serie --------------------------------

  openDialogAdd() {
    const dialogRef = this.dialog.open(AddComponentComponent, {
      width: '600px',
      // data: curso
    });
    dialogRef.afterClosed().subscribe(
      (res) => (res ? this.agregarSerie(res) : false),
      (err) => console.log(err)
    );
  }
}
