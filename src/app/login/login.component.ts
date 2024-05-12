import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {AuthRepositoryService} from "../services/auth-repository.service";
import {Router} from "@angular/router";
import {AppStateService} from "../services/app-state.service";
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  errorMessage= undefined;

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private router: Router,
              public appState: AppStateService) {
  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: this.fb.control(""),
      password: this.fb.control("")
    });
  }


    handleLogin(){
    let username =this.loginForm.value.username;
    let password =this.loginForm.value.password;
    this.authService.login(username,password)
      .then(resp=>{
        this.router.navigateByUrl("/admin");
      })
      .catch(error=>{
        this.errorMessage=error;

    })
  }
}
