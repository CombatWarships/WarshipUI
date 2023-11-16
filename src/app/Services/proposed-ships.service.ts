import { HttpClient, HttpErrorResponse, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, tap, throwError } from "rxjs";
import { Ship } from "../Data/Ship";
import { IProposedShipWorksheet } from "../Data/IProposedShipWorksheet";

@Injectable({
  providedIn: 'root'
})
export class ProposedShipService {
  private hostname = "unknown"
  private get getShipsUrl() { return `${this.hostname}/ProposedShips` }

  constructor(private http: HttpClient)
  {
    this.hostname = "https://localhost:7148";//"20.118.83.236/warship-import"; // window.location.hostname;
  }


  getAllShips(): Observable<Ship[]> {
    return this.http.get<Ship[]>(this.getShipsUrl)
      .pipe(
        tap(data => {
          console.log('All: ', JSON.stringify(data));
        }),
        catchError(this.handleError)
      );
  }

  getShip(id: string): Observable<IProposedShipWorksheet> {
    var url = `${this.getShipsUrl}/${id}`;
    return this.http.get<IProposedShipWorksheet>(url)
      .pipe(
        tap(data => console.log('All: ', JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  saveShip(ship: Ship) {

    return this.http.put<Ship>(this.getShipsUrl, ship)
      .pipe(
        tap(data => console.log('All: ', JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  deleteShips(shipIds: string[]) {

    var json = JSON.stringify(shipIds);

    const params = new HttpParams().append('shipIdsJson', json);
    return this.http.delete<Ship[]>(this.getShipsUrl, {params})
      .pipe(
        tap(data => console.log('All: ', JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  handleError(err: HttpErrorResponse) {

    let errorMessage = '';

    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      errorMessage = `Server returned code: ${err.status}, error message is ${err.message}`;
    }

    console.error(errorMessage);
    return throwError(() => errorMessage);
  }
}
