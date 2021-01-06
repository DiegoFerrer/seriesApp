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

  @Input() serie:Serie;

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

   //* funcionalidad EDITAR serie
   openDialogEdit(serie:Serie){
     const dialogRef = this.dialog.open(EditSeriesComponent,{
      width:'600px',
      data: serie
    })
    dialogRef.afterClosed().subscribe(
      // res => console.log(res),
      res => this.enviarSerieActualizada(res),
      err => console.log(err)
    )
  }

  

}
