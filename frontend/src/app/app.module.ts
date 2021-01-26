//? Modulos
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MaterialModule } from './material.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

//? Componentes
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { SerieComponent } from './components/serie/serie.component';
import { AddComponentComponent } from './components/add-component/add-component.component';
import { EditSeriesComponent } from './components/edit-series/edit-series.component';
import { PreviewComponent } from './components/preview/preview.component';
import { EditarPerfilComponent } from './components/editar-perfil/editar-perfil.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { SesionComponent } from './components/sesion/sesion.component';

//? Servicios
import { SeriesService } from './services/series.service';
import { SesionService } from './services/sesion.service';

//? Interceptors
import { SpinnerInterceptor } from './interceptors/spinner.interceptor';
import { AuthInterceptor } from './interceptors/auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SerieComponent,
    AddComponentComponent,
    EditSeriesComponent,
    PreviewComponent,
    EditarPerfilComponent,
    SpinnerComponent,
    SesionComponent,
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
  providers: [
    SeriesService,
    SesionService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: SpinnerInterceptor,
      multi: true,
    },
    {
      provide:HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi:true
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
