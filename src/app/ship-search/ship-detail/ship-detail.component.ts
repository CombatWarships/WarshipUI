import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ShipSearchService } from '../../Services/ship-search.service';
import { IShip } from '../../Data/IShip';

@Component({
  templateUrl: './ship-detail.component.html',
  styleUrls: ['./ship-detail.component.css']
})
export class ShipDetailComponent {

  ship?: IShip 

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
