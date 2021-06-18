import { Component } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";

@Component({
  selector: 'app-formulaire',
  templateUrl: './formulaire.component.html',
  styleUrls: ['./formulaire.component.scss']
})
export class FormulaireComponent  {

  constructor(private formBuilder:FormBuilder) { }

    profileForm = this.formBuilder.group({
    repositoryName:['',[Validators.required]],
    gitlabDomaine:['',[Validators.required]],
    gitlabToken:['',[Validators.required]],
    userName:['',[Validators.required]],
    template:['',[Validators.required]]
  });

  onSubmit() {
    if (this.profileForm.valid) {
      console.log('Profile form data :: ', this.profileForm.value);
    }
  }


}
