import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


import { AppComponent } from './app.component';
import { ShipSearchComponent } from './ship-search/ship-search.component';
import { QueryEditorComponent } from './ship-search/query-editor/query-editor.component';

@NgModule({
  declarations: [
    AppComponent,
    ShipSearchComponent,
    QueryEditorComponent
  ],
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
