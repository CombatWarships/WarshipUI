import { Component } from "@angular/core";
import { IShip} from "../Data/IShip";
import { ShipSearchService } from "../Services/ship-search.service";
import { IShipQuery } from "../Data/IShipQuery";
import { BehaviorSubject, combineLatest, scan, map } from "rxjs";

@Component({
  templateUrl: './ship-search.component.html',
  styleUrls: ["./ship-search.component.css"]
})
export class ShipSearchComponent {
  pageTitle = "Product List";
  imageWidth = 50;
  imageMargin = 2;
  showImage = true;
  errorMessage: string = '';

  warships: IShip[] = []

  // make this a behavior subject instead
  sortedColumn = new BehaviorSubject<string>('');

  // the scan operator will let you keep track of the sort direction
  sortDirection$ = this.sortedColumn.pipe(
    scan<string, { col: string, dir: string }>((sort, val) => {
      return sort.col === val
        ? { col: val, dir: sort.dir === 'desc' ? 'asc' : 'desc' }
        : { col: val, dir: 'desc' }
    }, { dir: 'desc', col: '' })
  )

  onQueryChanged(value: IShipQuery): void {

   combineLatest(this.searchAPI.getShips(value), this.sortDirection$).pipe(
      map(([list, sort]) => !sort.col ? list : this.sortByColumn(list, sort.col, sort.dir))
   )
   .subscribe({
      next: ships => {
        this.warships = ships
      },
      error: err => this.errorMessage = err
    });
  }

  sortOn(column: string) {
    this.sortedColumn.next(column);
  }

  sortByColumn(list: any[] | undefined, column: string, direction = 'desc'): any[] {
  let sortedArray = (list || []).sort((a, b) => {
    if (a[column] > b[column]) {
      return (direction === 'desc') ? 1 : -1;
    }
    if (a[column] < b[column]) {
      return (direction === 'desc') ? -1 : 1;
    }
    return 0;
  })
  return sortedArray;
}

  constructor(private searchAPI: ShipSearchService) { }

  ngOnInit(): void {

    let query: IShipQuery = {}

    this.searchAPI.getShips(query).subscribe({
      next: ships => {
        this.warships = ships
      },
      error: err => this.errorMessage = err
    });
  }
}
