import { Injectable } from "@angular/core";
import { IShip } from "../Data/IShip";
import { HttpClient, HttpErrorResponse, HttpParams } from "@angular/common/http";
import { Observable, catchError, tap, throwError } from "rxjs";
import { } from "rxjs";
import { IShipQuery } from "../Data/IShipQuery";
import { IQueryRange } from "../Data/IQueryRange";
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ProposedShipService {
  private hostname = "unknown"
  private get getShipsUrl() { return `${this.hostname}/ProposedShips` }

  private cachedShips: IShip[] = [];

  constructor(private http: HttpClient)
  {
    this.hostname = "http://20.118.83.236"; // ; "https://localhost:7148";//"20.118.83.236/warship-import"; // window.location.hostname;
  }


  getAllShips(): Observable<IShip[]> {
    return this.http.get<IShip[]>(this.getShipsUrl)
      .pipe(
        tap(data => {
          console.log('All: ', JSON.stringify(data));
          this.cachedShips = data;
        }),
        catchError(this.handleError)
      );
  }

  getShip(id: string): Observable<IShip> {
    var localShip = this.cachedShips.find(ship => ship.id == id);
    if (localShip != null) {
      return new Observable(function subscribe(subscriber) {
        subscriber.next(localShip);
      });
    }

    var url = `${this.getShipsUrl}/${id}`;
    return this.http.get<IShip>(url)
      .pipe(
        tap(data => console.log('All: ', JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  //createShip(ship: IShip): Observable<IShip> {
  //  var localShip = this.cachedShips.find(ship => ship.id == id);
  //  if (localShip != null) {
  //    return new Observable(function subscribe(subscriber) {
  //      subscriber.next(localShip);
  //    });
  //  }

  //  const params = new HttpParams().append('shipId', id);
  //  return this.http.get<IShip>(this.getShipsUrl, { params })
  //    .pipe(
  //      tap(data => console.log('All: ', JSON.stringify(data))),
  //      catchError(this.handleError)
  //    );
  //}

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
