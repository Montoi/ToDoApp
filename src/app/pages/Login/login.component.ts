import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';



@Component({
    selector: 'login-cmp',
    moduleId: module.id,
    templateUrl: 'login.component.html',
    styleUrls: ['./login.component.scss'],
})

export class loginComponent {

    form: FormGroup = this.fb.group({
        user: ['', {validators: [Validators.required]}],
        password: ['', {validators: [Validators.required]}],

    })
    constructor(private fb: FormBuilder){

    }
}
