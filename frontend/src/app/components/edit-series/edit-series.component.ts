import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Serie } from 'src/app/models/serie';



@Component({
  selector: 'app-edit-series',
  templateUrl: './edit-series.component.html',
  styleUrls: ['./edit-series.component.css']
})
export class EditSeriesComponent implements OnInit {

  public serieMod:Serie = {
    id: 0,
    nombre: '',
    temporadas: '',
    urlImg: '',
    valoracion: '',
    float: false,
    urlSerie: ''
  };

  get numeroValoracion(){
    return this.serieMod.valoracion;
  }

  set numeroValoracion(numero: string) {
    this.serieMod.float = Boolean(Number(numero) % 1)
    this.serieMod.valoracion = numero
  }

  constructor(public dialogRef: MatDialogRef<EditSeriesComponent>,@Inject(MAT_DIALOG_DATA) private serie:Serie) {
    this.serieMod.id = this.serie.id
    this.serieMod.nombre = this.serie.nombre
    this.serieMod.temporadas = this.serie.temporadas
    this.serieMod.urlImg = this.serie.urlImg
    this.serieMod.urlSerie = this.serie.urlSerie
    this.serieMod.float = this.serie.float
    this.serieMod.valoracion = this.serie.valoracion 
  }

  ngOnInit(): void {

  }

  update(){
    this.dialogRef.close(this.serieMod)
  }
  cancel(){
    this.dialogRef.close(false)
  }

}
