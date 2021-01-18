//? Modulos
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MaterialModule } from './material.module';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

//? Componentes
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { SerieComponent } from './components/serie/serie.component';
import { SeriesService } from './services/series.service';
import { AddComponentComponent } from './components/add-component/add-component.component';
import { EditSeriesComponent } from './components/edit-series/edit-series.component';
import { PreviewComponent } from './components/preview/preview.component';
import { LoginComponent } from './components/login/login.component';
import { SesionService } from './services/sesion.service';
import { RegistroComponent } from './components/registro/registro.component';
import { EditarPerfilComponent } from './components/editar-perfil/editar-perfil.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SerieComponent,
    AddComponentComponent,
    EditSeriesComponent,
    PreviewComponent,
    LoginComponent,
    RegistroComponent,
    EditarPerfilComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
  ],
  entryComponents: [AddComponentComponent, EditSeriesComponent],
  providers: [SeriesService,SesionService],
  bootstrap: [AppComponent],
})
export class AppModule {}
