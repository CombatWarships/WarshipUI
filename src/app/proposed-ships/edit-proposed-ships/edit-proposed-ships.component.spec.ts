import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProposedShipsComponent } from './edit-proposed-ships.component';

describe('EditProposedShipsComponent', () => {
  let component: EditProposedShipsComponent;
  let fixture: ComponentFixture<EditProposedShipsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditProposedShipsComponent]
    });
    fixture = TestBed.createComponent(EditProposedShipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
