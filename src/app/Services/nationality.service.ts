import { HttpClient, HttpErrorResponse, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, tap, throwError } from "rxjs";
import { Ship } from "../Data/Ship";
import { Nationality } from "../Data/Nationality";

@Injectable({
  providedIn: 'root'
})
export class NationalityService {
  private hostname = "unknown"
  private get getUrl() { return `${this.hostname}/Nationality` }

  constructor(private http: HttpClient)
  {
    this.hostname = "https://localhost:7148";//"20.118.83.236/warship-import"; // window.location.hostname;
  }

  getAllNations(): Observable<Nationality[] > {

    return this.http.get<Nationality[]>(this.getUrl)
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
