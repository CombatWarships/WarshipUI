import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProposedShipsComponent } from './proposed-ships.component';

describe('ProposedShipComponent', () => {
  let component: ProposedShipsComponent;
  let fixture: ComponentFixture<ProposedShipsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProposedShipsComponent]
    });
    fixture = TestBed.createComponent(ProposedShipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
