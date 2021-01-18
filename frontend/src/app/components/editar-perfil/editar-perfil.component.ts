import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Usuario } from 'src/app/models/usuario';

@Component({
  selector: 'app-editar-perfil',
  templateUrl: './editar-perfil.component.html',
  styleUrls: ['./editar-perfil.component.css']
})
export class EditarPerfilComponent implements OnInit {

  hide:Boolean = true

  constructor(public dialogRef: MatDialogRef<EditarPerfilComponent>,@Inject(MAT_DIALOG_DATA) public usuario) { }

  ngOnInit(): void {
  }

  update(){
    this.dialogRef.close(this.usuario)
  }
  cancel(){
    this.dialogRef.close(false)
  }

  inputPassword(){
    this.hide = !this.hide
  }

}
