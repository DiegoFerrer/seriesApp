import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
// import { EventEmitter } from 'events';
import { Serie } from 'src/app/models/serie';
import { EditSeriesComponent } from '../edit-series/edit-series.component';

@Component({
  selector: 'app-serie',
  templateUrl: './serie.component.html',
  styleUrls: ['./serie.component.css']
})

export class SerieComponent implements OnInit {

  //* Llega un objeto serie para renderizar
  @Input() serie:Serie;

  //* Envio al componente contenedor de todas las tarjetas lo que debe actualizar o eliminar
  @Output() eliminar = new EventEmitter;
  @Output() actualizar = new EventEmitter;

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  enviarId(id: number){
    this.eliminar.emit(id);
  }

  enviarSerieActualizada(serie:Serie){
    this.actualizar.emit(serie)
  }

  getArregloValoracion(valoracion){
    if(valoracion) return new Array(Math.trunc(parseInt(valoracion)))
  }

   //* funcionalidad EDITAR serie
   openDialogEdit(serie:Serie){

     const dialogRef = this.dialog.open(EditSeriesComponent,{
      width:'800px',
      data: serie
    })
    dialogRef.afterClosed().subscribe(
      res => res ? this.enviarSerieActualizada(res): false,
      err => console.log(err)
    )
  }

  

}
