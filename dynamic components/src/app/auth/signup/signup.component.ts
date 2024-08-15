import { Component } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';



function checkPasswordsEqual(field1: string, field2: string) {
    return (control: AbstractControl) => {
        const password = control.get(field1)?.value;
        const confirmPassword = control.get(field2)?.value;
        if (password !== confirmPassword) {
            return { notEqual: true };
        }
        return null
    }
}

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrl: './signup.component.css',
})
export class SignupComponent {
    form = new FormGroup({
        email: new FormControl('', {
            validators: [Validators.required, Validators.email],
        }),
        passwords: new FormGroup({
            password: new FormControl('', {
                validators: [Validators.required, Validators.minLength(6), Validators.maxLength(32)],
            }),
            confirmPassword: new FormControl('', {
                validators: [Validators.required, Validators.minLength(6), Validators.maxLength(32)],
            }),
        }, {
            validators: [checkPasswordsEqual('password', 'confirmPassword')],
        }),
        firstName: new FormControl('', {
            validators: [Validators.required],
        }),
        lastName: new FormControl('', {
            validators: [Validators.required],
        }),
        address: new FormGroup({
            street: new FormControl('', {
                validators: [Validators.required],
            }),
            number: new FormControl('', {
                validators: [Validators.required],
            }),
            postalCode: new FormControl('', {
                validators: [Validators.required],
            }),
            city: new FormControl('', {
                validators: [Validators.required],
            }),
        }),
        source: new FormArray([new FormControl(''), new FormControl(''), new FormControl('')]),
        role: new FormControl<'student' | 'teacher' | 'employee' | 'founder' | 'other'>('student', { validators: [] }),
        agree: new FormControl(false, { validators: [Validators.requiredTrue] }),
    });

    get isEmailInvalid() {
        return this.form.controls.email.touched && this.form.controls.email.invalid && this.form.controls.email.dirty
    }
    get isPasswordInvalid() {
        return this.form.controls.passwords.controls.password.touched && this.form.controls.passwords.controls.password.invalid && this.form.controls.passwords.controls.password.dirty
    }

    onSubmit() {
        console.log(this.form);
    }

    onReset() {
        this.form.reset();
    }
}
