import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { debounceTime, of } from 'rxjs';


function customValidator(control: AbstractControl) {
    if (control.value.includes('?')) {
        return null;
    }
    return { doesNotContainQuestionMark: true };
}

function customAsyncValidator(control: AbstractControl) {
    if (control.value !== 'test@gmail.com') {
        return of(null)
    }
    return of({ notUnique: true })
}

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {

    private destroyRef = inject(DestroyRef);

    form = new FormGroup({
        email: new FormControl('', {
            validators: [Validators.required, Validators.email],
            asyncValidators: [customAsyncValidator]
        }),
        password: new FormControl('', {
            validators: [Validators.required, Validators.minLength(6), Validators.maxLength(32), customValidator],
        }),
    });

    ngOnInit(): void {

        const savedForm = window.localStorage.getItem('formData');
        if (savedForm) {
            const email = JSON.parse(savedForm).email;
            this.form.patchValue({ email: email });
        }



        const formDataSubscription = this.form.valueChanges.pipe(debounceTime(500)).subscribe(value => {
            window.localStorage.setItem('formData', JSON.stringify({ email: value.email }));
        });

        this.destroyRef.onDestroy(() => {
            formDataSubscription.unsubscribe();
        })
    }


    get isEmailValid() {
        return this.form.controls.email.touched && this.form.controls.email.invalid && this.form.controls.email.dirty
    }
    get isPasswordValid() {
        return this.form.controls.password.touched && this.form.controls.password.invalid && this.form.controls.password.dirty
    }

    onSubmit() {
        console.log(this.form);
    }

}