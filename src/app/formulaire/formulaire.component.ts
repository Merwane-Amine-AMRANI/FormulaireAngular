import { Component } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-formulaire',
  templateUrl: './formulaire.component.html',
  styleUrls: ['./formulaire.component.scss']
})
export class FormulaireComponent  {


  constructor(private formBuilder:FormBuilder) { }

    profileForm = this.formBuilder.group({
    repo_name:["",[Validators.required]],
    gitlab_domain_name:['',[Validators.required]],
    gitlab_token:['',[Validators.required]],
    is_token_admin:['',[Validators.required]],
    user_names:this.formBuilder.group({
      user1:this.formBuilder.group({
        access_level_1:'',
        expires_at_1:'',
        token_1:'',
      }),
      user2:this.formBuilder.group({
        access_level_2:[''],
        expires_at_2:[''],
        token_2:[''],
      })
    }),
    variables:['',[Validators.required]],
    template:['',[Validators.required]],
    template_options:['',[Validators.required]]
  });

  onSubmit() {
    if (this.profileForm.valid) {
      console.log('Profile form data :: ', this.profileForm.value);
        let file = new Blob([JSON.stringify(this.profileForm.value)],
          {type:'json'});
        let a = document.createElement("a"),
          url = URL.createObjectURL(file);
        a.href = url;
        a.download = "config";
        a.click();
        setTimeout(function() {
          window.URL.revokeObjectURL(url);
        }, 0);

    }
  }


}
