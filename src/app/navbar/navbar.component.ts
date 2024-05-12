import { Component } from '@angular/core';
import { AppStateService } from '../services/app-state.service';
import { LoaderService } from '../services/loader.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  actions :Array<any> =[
    {title: "Home","route":"admin/home"},
    {title: "Products","route":"/admin/products"},
    {title: "New Product","route":"/admin/newProduct"}

   ];
   currentAction :any;
   public loading =this.loaderService.isLoading$;
   constructor(public appState:AppStateService,
    private loaderService:LoaderService,
 
   ){
   }
   setCurrentAction(action:any){
    this.currentAction = action;
   }

}
