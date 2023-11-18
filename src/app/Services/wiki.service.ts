import { HttpClient, HttpErrorResponse, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, tap, throwError } from "rxjs";
import { Ship } from "../Data/Ship";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class WikiService {
  private get getShipsUrl() { return `${environment.warshipImportUrl}/Wiki` }

  constructor(private http: HttpClient)
  {
  }

  getShip(url: string): Observable<Ship> {

    const params = new HttpParams().append('url', url);

    return this.http.get<Ship>(this.getShipsUrl, { params })
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
