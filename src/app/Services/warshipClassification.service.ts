import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, tap, throwError } from "rxjs";
import { WarshipClassification } from "../Data/WarshipClassification";

@Injectable({
  providedIn: 'root'
})
export class WarshipClassificationService {
  private hostname = "unknown"
  private get getUrl() { return `${this.hostname}/WarshipClassification` }

  constructor(private http: HttpClient)
  {
    this.hostname = "https://localhost:7148";//"20.118.83.236/warship-import"; // window.location.hostname;
  }

  getAllClassTypes(): Observable<WarshipClassification[]> {

    return this.http.get<WarshipClassification[]>(this.getUrl)
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
