import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl } from '@angular/forms';
import { Serie } from 'src/app/models/serie';


@Component({
  selector: 'app-add-component',
  templateUrl: './add-component.component.html',
  styleUrls: ['./add-component.component.css']
})

export class AddComponentComponent implements OnInit {
    serie:Serie = {
      nombre: '',
      temporadas: '',
      urlImg: '',
      valoracion: 0,
      urlSerie: ''
    };


  // en este caso no se injecta data al dialog, ya es crear uno nuevo
  constructor( public dialogRef: MatDialogRef<AddComponentComponent>) { }

  ngOnInit(): void {
  }

  agregar(){
    this.dialogRef.close(this.serie)
  }
  cancel(){
    this.dialogRef.close(false)
  }

}
