import { AbstractControl, ValidatorFn, ValidationErrors } from "@angular/forms";

export function dateValidator(): ValidatorFn {
    return(control: AbstractControl) : ValidationErrors | null => {
        const enteredDate = new Date(control.value);
        if(!enteredDate) {
            return null;
        }

        const nowDate = new Date();
        return enteredDate > nowDate ? { invalidDate: true } : null;
    }
}
