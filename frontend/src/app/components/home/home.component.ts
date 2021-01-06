import {
  AfterViewInit,
  Component,
  ElementRef,
  OnChanges,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { SeriesService } from 'src/app/services/series.service';
import { Serie } from 'src/app/models/serie';
import { MatDialog } from '@angular/material/dialog';
import { AddComponentComponent } from '../add-component/add-component.component';

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
    private dialog: MatDialog,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    this.obtenerSeries();
  }

  //* Filtro
  filtrar(texto: string) {
    return this.series.filter((serie: Serie) =>
      serie.nombre.toLowerCase().startsWith(texto.toLowerCase())
    );
  }

  //* Obtener Series
  obtenerSeries() {
    this.seriesService.getSeries().subscribe(
      (res) => {
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
      // res => console.log(res),
      (res) => this.agregarSerie(res),
      (err) => console.log(err)
    );
  }
}
