import { HttpClient, HttpErrorResponse, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, tap, throwError } from "rxjs";
import { Ship } from "../Data/Ship";
import { Nationality } from "../Data/Nationality";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class NationalityService {
  private get getUrl() { return `${environment.warshipImportUrl}/Nationality` }

  constructor(private http: HttpClient)
  {
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
