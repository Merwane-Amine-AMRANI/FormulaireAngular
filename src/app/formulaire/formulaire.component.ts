import { Component } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-formulaire',
  templateUrl: './formulaire.component.html',
  styleUrls: ['./formulaire.component.scss']
})

export class FormulaireComponent {
  form: FormGroup;
  postId: any;

  constructor(public formBuilder: FormBuilder, private http: HttpClient){
    this.form = this.formBuilder.group({
      repo_name:['',[Validators.required]],
      gitlab_domain_name:['',[Validators.required]],
      gitlab_token:['',[Validators.required]],
      is_token_admin:['',[Validators.required]],
      users:this.formBuilder.group({
        user1:this.formBuilder.group({
          user_name:'',
          access_level:'',
          expires_at:'',
          token:'',
        }),
        user2:this.formBuilder.group({
          user_name:'',
          access_level:'',
          expires_at:'',
          token:'',
        })
      }),
      variables:this.formBuilder.group({
        MVN_REPO_URL:this.formBuilder.group({
          value:'',
          protected:'',
          type:'',
          masked:'',
          environment_scope:''
        }),
        MVN_REPO_USER:this.formBuilder.group({
          value:'',
          protected:'',
          type:'',
          masked:'',
          environment_scope:''
        }),
        MVN_REPO_PASS:this.formBuilder.group({
          value:'',
          protected:'',
          type:'',
          masked:'',
          environment_scope:''
        })
      }),
      template:'',
      template_options:this.formBuilder.group({
        group_id: '',
        artifact_id: '',
        is_deployed: '',
        artifactory_url: '',
        artifactory_repo: '',
        artifactory_snapshot_repo: '',
        artifactory_plugin_repo: '',
        artifactory_plugin_snapshot_repo: '',
        artifactory_user: '',
        artifactory_encrypted_password: ''
      }),
    })
  }


  
  onPost() {      
    console.log("clicked")
    this.http.post<any>('http://0.0.0.0:5000/api/bootstrap', JSON.stringify(this.form.value,null,22), {'headers': { 'content-type': 'application/json'} }).subscribe(data =>{
      console.log("Hello World")
    })
  }
    
  onSubmit() {
    if (this.form.valid) {
      console.log('Profile form data :: ', this.form.value);
      let file = new Blob([JSON.stringify(this.form.value,null,22)], {type:'application/json'});
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
