import { Injectable } from "@angular/core";
import { IShip } from "../Data/IShip";
import { HttpClient, HttpErrorResponse, HttpParams } from "@angular/common/http";
import { Observable, catchError, tap, throwError } from "rxjs";
import { } from "rxjs";
import { IShipQuery } from "../Data/IShipQuery";
import { IQueryRange } from "../Data/IQueryRange";

@Injectable({
  providedIn: 'root'
})
export class ShipSearchService {
  private baseUrl = 'http://20.88.241.156'
  private searchUrl = `${this.baseUrl}/api/SearchWarships`
  private warshipUrl = `${this.baseUrl}/api/Warship`
  private queryRangeUrl = `${this.baseUrl}/api/ShipQueryRange`

  private cachedShips: IShip[] = [];

  constructor(private http: HttpClient) { }


  getShip(id: string): Observable<IShip> {

    var localShip = this.cachedShips.find(ship => ship.id == id);
    if (localShip != null) {
      return new Observable(function subscribe(subscriber) {
        subscriber.next(localShip);
      });
    }

    const params = new HttpParams().append('shipId', id);
    return this.http.get<IShip>(this.warshipUrl, { params })
      .pipe(
        tap(data => console.log('All: ', JSON.stringify(data))),
        catchError(this.handleError)
      );
  }


  getShips(query: IShipQuery): Observable<IShip[]> {

    query.take = 10000

    return this.http.post<IShip[]>(this.searchUrl, query)
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
