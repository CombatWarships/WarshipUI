import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ShipSearchComponent } from './ship-search/ship-search.component';
import { QueryEditorComponent } from './ship-search/query-editor/query-editor.component';
import { ShipDetailComponent } from './ship-search/ship-detail/ship-detail.component';
import { RouterModule } from '@angular/router';
import { ProposedShipsComponent } from './proposed-ships/proposed-ships.component';
import { EditProposedShipsComponent } from './proposed-ships/edit-proposed-ships/edit-proposed-ships.component';

@NgModule({
  declarations: [
    AppComponent,
    ShipSearchComponent,
    QueryEditorComponent,
    ShipDetailComponent,
    ProposedShipsComponent,
    EditProposedShipsComponent,
  ],
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: 'proposed-ships', component: ProposedShipsComponent },
      { path: 'proposed-ships/:id', component: EditProposedShipsComponent },
      { path: 'add-proposedShip', component: EditProposedShipsComponent },
      { path: 'ship-search', component: ShipSearchComponent },
      { path: 'ship-search/:id', component: ShipDetailComponent },
      { path: '', redirectTo:'ship-search', pathMatch:'full'},
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
