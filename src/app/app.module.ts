import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


import { AppComponent } from './app.component';
import { ShipSearchComponent } from './ship-search/ship-search.component';
import { QueryEditorComponent } from './ship-search/query-editor/query-editor.component';
import { ShipDetailComponent } from './ship-search/ship-detail/ship-detail.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    ShipSearchComponent,
    QueryEditorComponent,
    ShipDetailComponent
  ],
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: 'ship-search', component: ShipSearchComponent },
      { path: 'ship-search/:id', component: ShipDetailComponent },
      { path: '', redirectTo:'ship-search', pathMatch:'full'},
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
