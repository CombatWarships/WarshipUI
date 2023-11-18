import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, tap, throwError } from "rxjs";
import { WarshipClassification } from "../Data/WarshipClassification";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class WarshipClassificationService {
  private get getUrl() { return `${environment.warshipImportUrl}/WarshipClassification` }

  constructor(private http: HttpClient)
  {
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
