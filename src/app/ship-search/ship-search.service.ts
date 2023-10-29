import { Injectable } from "@angular/core";
import { IShip } from "../Data/IShip";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable, catchError, tap, throwError } from "rxjs";
import { } from "rxjs";
import { IShipQuery } from "../Data/IShipQuery";
import { IQueryRange } from "../Data/IQueryRange";

@Injectable({
    providedIn: 'root'
})
export class ShipSearchService {
    private baseUrl = 'https://combatwarships-aca.purpleforest-f4c37dcd.southcentralus.azurecontainerapps.io'
    private searchUrl = `${this.baseUrl}/api/SearchWarships`
    private queryRangeUrl = `${this.baseUrl}/api/ShipQueryRange`


    constructor(private _http: HttpClient) { }

    getShips(query: IShipQuery): Observable<IShip[]> {    

        query.take = 10000

        return this._http.post<IShip[]>(this.searchUrl, query)
        .pipe(
            tap(data => console.log('All: ', JSON.stringify(data))),
            catchError(this.handleError)
        );
    }
    getQueryRange(): Observable<IQueryRange> {    
        return this._http.get<IQueryRange>(this.queryRangeUrl)
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