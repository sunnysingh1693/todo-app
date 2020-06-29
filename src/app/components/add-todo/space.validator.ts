import { AbstractControl, ValidationErrors } from '@angular/forms';

export class SpaceValidator {
    static spacesAtFront(control: AbstractControl) : ValidationErrors | null {
      if(control.value.trim().length === 0) return {spacesAtFront: false}
      return {spacesAtFront: true}
    }
}
