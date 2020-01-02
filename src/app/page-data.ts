import { FormGroup } from '@angular/forms';

export interface PageData {
    route: string;
    display?: string;
    img?: string;
    formGroup?: FormGroup;
    formGroupName?: string;
}
