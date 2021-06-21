import { Component } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-formulaire',
  templateUrl: './formulaire.component.html',
  styleUrls: ['./formulaire.component.scss']
})

export class FormulaireComponent  {
  form: FormGroup;

  constructor(public formBuilder: FormBuilder){
    this.form = this.formBuilder.group({
      repo_name:'',
      gitlab_domain_name:'',
      gitlab_token:'',
      is_token_admin:'',
      user_names:this.formBuilder.group({
        user1:this.formBuilder.group({
          access_level:'',
          expires_at:'',
          token:'',
        }),
        user2:this.formBuilder.group({
          access_level:'',
          expires_at:'',
          token:'',
        })
      }),
      variables:'',
      template:'',
      template_options:''
    })
  }

  onSubmit() {
    if (this.form.valid) {
      console.log('Profile form data :: ', this.form.value);
      let file = new Blob([JSON.stringify(this.form.value)], {type:'json'});
      let a = document.createElement("a"),
      url = URL.createObjectURL(file);
      a.href = url;
      a.download = "config";
      a.click();
      setTimeout(function() {
        window.URL.revokeObjectURL(url);
      }, 0);
    };
  };
}
