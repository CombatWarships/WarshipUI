import { Component } from "@angular/core";
import { IShip} from "../Data/IShip";
import { ShipSearchService } from "./ship-search.service";
import { IShipQuery } from "../Data/IShipQuery";

@Component({
  selector: 'pm-warshipSearch',
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

  onQueryChanged(value: IShipQuery): void {

    this.searchAPI.getShips(value).subscribe({
      next: ships => {
        this.warships = ships
      },
      error: err => this.errorMessage = err
    });
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
