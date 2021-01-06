import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MaterialModule } from './material.module';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { SerieComponent } from './components/serie/serie.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SeriesService } from './services/series.service';
import { AddComponentComponent } from './components/add-component/add-component.component';
import { FormsModule } from '@angular/forms';
import { EditSeriesComponent } from './components/edit-series/edit-series.component'




@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SerieComponent,
    AddComponentComponent,
    EditSeriesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    FormsModule
  ],
  entryComponents:[AddComponentComponent,EditSeriesComponent],
  providers: [SeriesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
