import { Injectable } from "@angular/core";
import { Ship } from "../Data/Ship";
import { HttpClient, HttpErrorResponse, HttpParams } from "@angular/common/http";
import { Observable, catchError, tap, throwError } from "rxjs";
import { } from "rxjs";
import { IShipQuery } from "../Data/IShipQuery";
import { IQueryRange } from "../Data/IQueryRange";
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ShipSearchService {
  private hostname = "unknown"
  private get searchUrl() { return `http://${this.hostname}/warshipregistry/api/SearchWarships` }
  private get warshipUrl() { return `http://${this.hostname}/warshipregistry/api/Warship` }
  private get queryRangeUrl() { return `http://${this.hostname}/warshipregistry/api/ShipQueryRange` }

  private cachedShips: Ship[] = [];

  constructor(private http: HttpClient)
  {
    this.hostname = "20.118.83.236"; // window.location.hostname;
  }


  getShip(id: string): Observable<Ship> {

    var localShip = this.cachedShips.find(ship => ship.id == id);
    if (localShip != null) {
      return new Observable(function subscribe(subscriber) {
        subscriber.next(localShip);
      });
    }

    const params = new HttpParams().append('shipId', id);
    return this.http.get<Ship>(this.warshipUrl, { params })
      .pipe(
        tap(data => console.log('All: ', JSON.stringify(data))),
        catchError(this.handleError)
      );
  }


  getShips(query: IShipQuery): Observable<Ship[]> {

    query.take = 10000

    return this.http.post<Ship[]>(this.searchUrl, query)
      .pipe(
        tap(data => {
          console.log('All: ', JSON.stringify(data));
          this.cachedShips = data;
        }),
        catchError(this.handleError)
      );
  }
  getQueryRange(): Observable<IQueryRange> {
    return this.http.get<IQueryRange>(this.queryRangeUrl)
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
