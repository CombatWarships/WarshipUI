import { HttpClient, HttpErrorResponse, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, tap, throwError } from "rxjs";
import { Ship } from "../Data/Ship";

@Injectable({
  providedIn: 'root'
})
export class WikiService {
  private hostname = "unknown"
  private get getShipsUrl() { return `${this.hostname}/Wiki` }

  constructor(private http: HttpClient)
  {
    this.hostname = "https://localhost:7148";//"20.118.83.236/warship-import"; // window.location.hostname;
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
