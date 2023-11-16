import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ShipSearchService } from '../../Services/ship-search.service';
import { Ship } from "src/app/Data/Ship";

@Component({
  templateUrl: './ship-detail.component.html',
  styleUrls: ['./ship-detail.component.scss']
})
export class ShipDetailComponent {

  ship?: Ship 

  constructor(private route: ActivatedRoute, private searchSearvice : ShipSearchService) {
    this.route.paramMap.subscribe(
      params => {
        var idStr = params.get('id');
        if (idStr) {
          this.showShip(idStr!);
        }
      }
    );
  }

  private showShip(shipId: string) {
    this.searchSearvice.getShip(shipId).subscribe({
      next: ship => {
        this.ship = ship
      }
    });
  }
}
