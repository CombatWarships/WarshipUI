import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IShipQuery } from 'src/app/Data/IShipQuery';
import { IQueryRange } from 'src/app/Data/IQueryRange';
import { debounceTime } from 'rxjs';
import { ShipSearchService } from '../../Services/ship-search.service';

@Component({
  selector: 'pm-query-editor',
  templateUrl: './query-editor.component.html',
  styleUrls: ['./query-editor.component.scss']
})
export class QueryEditorComponent implements OnInit {

  queryRange: IQueryRange = {}
  queryForm: FormGroup = this.fb.group({});
  @Output() queryChanged: EventEmitter<IShipQuery> = new EventEmitter<IShipQuery>();


  ngOnInit(): void { }
  constructor(private fb: FormBuilder, private searchAPI: ShipSearchService) {
    this.queryForm = this.fb.group({
      nation: '',
      className: '',
      minUnits: 0,
      maxUnits: 0,
      minSpeedIrcwcc: 0,
      maxSpeedIrcwcc: 0,
      minSpeedKnots: 0,
      maxSpeedKnots: 0,
      minLength: 0,
      maxLength: 0,
      minBeam: 0,
      maxBeam: 0
    });


    this.searchAPI.getQueryRange().subscribe(
      {
        next: range => {
          this.queryRange = range;

          if (!this.queryForm.controls['minUnits'].touched)
            this.queryForm.controls['minUnits'].setValue(range.minUnits);
          if (!this.queryForm.controls['maxUnits'].touched)
            this.queryForm.controls['maxUnits'].setValue(range.maxUnits);

          if (!this.queryForm.controls['maxSpeedIrcwcc'].touched)
            this.queryForm.controls['maxSpeedIrcwcc'].setValue(range.maxSpeedIrcwcc);
          if (!this.queryForm.controls['minSpeedIrcwcc'].touched)
            this.queryForm.controls['minSpeedIrcwcc'].setValue(range.minSpeedIrcwcc);

          if (!this.queryForm.controls['minSpeedKnots'].touched)
            this.queryForm.controls['minSpeedKnots'].setValue(range.minSpeedKnots);
          if (!this.queryForm.controls['maxSpeedKnots'].touched)
            this.queryForm.controls['maxSpeedKnots'].setValue(range.maxSpeedKnots);

          if (!this.queryForm.controls['minLength'].touched)
            this.queryForm.controls['minLength'].setValue(range.minLength);
          if (!this.queryForm.controls['maxLength'].touched)
            this.queryForm.controls['maxLength'].setValue(range.maxLength);

          if (!this.queryForm.controls['minBeam'].touched)
            this.queryForm.controls['minBeam'].setValue(range.minBeam);
          if (!this.queryForm.controls['maxBeam'].touched)
            this.queryForm.controls['maxBeam'].setValue(range.maxBeam);
        },
        error: err => {
        }
      }
    )

    this.queryForm.valueChanges
      .pipe(
        debounceTime(400)
      ).subscribe(res => {
        let query: IShipQuery = this.queryForm.value
        this.queryChanged.emit(query);
      })
  }
}
