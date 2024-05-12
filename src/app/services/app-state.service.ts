import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppStateService {
  public productsState:any={
   products:[],
   keyword :"",
   totalPages:0,
   pageSize:3 ,
   currentPage:1,
   totalProducts:0,
   status:"",
   errorMessage:""

  }

  constructor() { }
  public authState:any={
    isAuthenticated :false,
    username:"",
    roles :[],
    token :"",
    status :"",
    errorMessage :"",
    openaiKey:"YOUR API KEY"
  }
// je cree une copie dans laquelle je met ce que je veux
 public autjState:any={
    isAuthenticated:false,
    username:undefined,
    roles:undefined,
    token:undefined,
 }
  public setProductState(state:any){
    this.productsState={...this.productsState, ...state}
  }

  public setAuthState(state:any){
    this.authState={errorMessage:"",...this.authState, ...state};
  }
}
