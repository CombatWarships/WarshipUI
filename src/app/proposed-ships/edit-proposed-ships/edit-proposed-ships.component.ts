import { Component } from '@angular/core';
import { IShip } from '../../Data/IShip';
import { ActivatedRoute } from '@angular/router';
import { ProposedShipService } from '../../Services/proposed-ships.service';

@Component({
  selector: 'app-edit-proposed-ships',
  templateUrl: './edit-proposed-ships.component.html',
  styleUrls: ['./edit-proposed-ships.component.scss']
})
export class EditProposedShipsComponent {

  ship?: IShip

  constructor(private route: ActivatedRoute, private proposedShipAPI: ProposedShipService) { 
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
    this.proposedShipAPI.getShip(shipId).subscribe({
      next: ship => {
        this.ship = ship;
      }
    });
  }
}
