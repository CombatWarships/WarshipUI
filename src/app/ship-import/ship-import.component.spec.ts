import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShipImportComponent } from './ship-import.component';

describe('ShipImportComponent', () => {
  let component: ShipImportComponent;
  let fixture: ComponentFixture<ShipImportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShipImportComponent]
    });
    fixture = TestBed.createComponent(ShipImportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
