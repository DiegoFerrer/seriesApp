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
    valoracion: '',
  };

  @Input() serieModificada:Serie;

  constructor(
    public dialogRef: MatDialogRef<AddComponentComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any
  ) { }

  ngOnInit(): void {
  }

  agregar(){
    // console.log(this.serie)
    this.dialogRef.close(this.serie)
  }
  cancel(){
    this.dialogRef.close()
  }

}
