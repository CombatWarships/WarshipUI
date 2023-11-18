import { HttpClient, HttpErrorResponse, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, tap, throwError } from "rxjs";
import { Ship } from "../Data/Ship";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class IrcwccService {
  private get controllerUrl() { return `${environment.warshipImportUrl}/IrcwccShipList` }

  constructor(private http: HttpClient)
  {
  }

  getShip(shipListKey: number): Observable<Ship> {

    const params = new HttpParams().append('shipListKey', shipListKey);

    return this.http.get<Ship>(this.controllerUrl, { params })
      .pipe(
        tap(data => console.log('All: ', JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  importShipList(): Observable<boolean> {

    return this.http.post<boolean>(this.controllerUrl, '')
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
