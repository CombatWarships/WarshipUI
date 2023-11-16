import { Observable } from 'rxjs';
import { IOption } from './IOption';


export class FieldMap {
    field: string;
    display: string;
    units?: string;
    controlType: string;
    options?: Observable<IOption[]>;

    constructor(field: string, display: string, units?: string, controlType: string = "form-control", options?: Observable<IOption[]>) {
        this.field = field;
        this.display = display;
        this.units = units;
        this.controlType = controlType;
        this.options = options;
    }
}
