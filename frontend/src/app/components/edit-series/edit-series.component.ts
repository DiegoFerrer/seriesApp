import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Serie } from 'src/app/models/serie';



@Component({
  selector: 'app-edit-series',
  templateUrl: './edit-series.component.html',
  styleUrls: ['./edit-series.component.css']
})
export class EditSeriesComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<EditSeriesComponent>,@Inject(MAT_DIALOG_DATA) public serie:Serie) { }

  ngOnInit(): void {}

  update(){
    // console.log(this.serie)
    this.dialogRef.close(this.serie)
  }
  cancel(){
    this.dialogRef.close(false)
  }

}
