import { HttpClient, HttpErrorResponse, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, tap, throwError } from "rxjs";
import { Ship } from "../Data/Ship";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class IrcwccService {
  private rootUrl = "unknown"
  private get getShipUrl() { return `${this.rootUrl}/IrcwccShipList` }

  constructor(private http: HttpClient)
  {
    this.rootUrl = `${environment.apiUrl}${environment.warshipImportRoute}`;
  }

  getShip(shipListKey: number): Observable<Ship> {

    const params = new HttpParams().append('shipListKey', shipListKey);

    return this.http.get<Ship>(this.getShipUrl, { params })
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
