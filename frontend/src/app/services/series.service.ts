import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Serie } from 'src/app/models/serie';

@Injectable({
  providedIn: 'root'
})
export class SeriesService {
  ApiKey: string = 'key'
  URI: string;
  
  constructor(private http: HttpClient) {
    this.URI = 'http://localhost:3000'
   }

  // ? metodos

  getSeries(id:number){
    return this.http.get<Serie[]>(`${this.URI}/${id}`)
  }

  createSerie(serie:Serie){
    return this.http.post(`${this.URI}/agregarSerie`,serie)
  }

  updateSerie(serie:Serie){
    return this.http.put(`${this.URI}/update/${serie.id}`,serie)
  }
  
  deleteSerie(id:number){
    return this.http.delete(`${this.URI}/delete/${id}`)
  }
}
