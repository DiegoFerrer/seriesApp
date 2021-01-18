import { Component, Input, OnInit } from '@angular/core';
import { Serie } from 'src/app/models/serie';
import { Usuario } from 'src/app/models/usuario';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.css']
})
export class PreviewComponent implements OnInit {

  @Input() serie:Serie
  @Input() usuario:Usuario

  constructor() { }

  ngOnInit(): void {
  }

  getArregloValoracion(valoracion){
    if(valoracion) return new Array(Math.trunc(parseInt(valoracion)))
  }

}
