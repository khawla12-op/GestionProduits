import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../model/product.model';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {
  public products:Array <Product> = [];
  public keyword : string = "";
  //products$! : Observable <Array<Product>>;

  //dans le constructeur on injecte les services
  constructor(private productService:ProductService){
  }
  //Quand on appelle une methode il nous retourne un objet observable dans laquelle je dois faire un subscribe pour eviter les sorties bloquantes 
  ngOnInit(){
  this.getProducts();
    
}
getProducts(){
  //this.products = this.productService.getProducts();
  //this.productService.getProducts(1,3)
  this.productService.getProducts()
  .subscribe({
        next: (data) =>{
          this.products = data;
      },
        error : err =>{
          console.log(err);
      }
    })

}
handleCheckProduct(product: Product) {
  this.productService.checkProduct(product)
    .subscribe({
      next: (updatedProduct) => {
        this.products = this.products.map((p: Product) => {
          if (p.id === updatedProduct.id) {
            return updatedProduct;
          } else {
            return p;
          }
        });
      },
      error: (err) => {
        console.log(err);
      }
    });
}
handleDelete(product:Product){
  if(confirm("Are you sure you want to delete this product?"))
  this.productService.handleDelete(product).subscribe({
    //je dois mettre a jour le frontend 
    next: value =>{
      //this.getProducts();
      this.products=this.products.filter(p =>p.id!==product.id);
    }
    
  })
    
}
handleSearch(){
  this.productService.handleSearch(this.keyword).subscribe({
    next: (value) =>{
      this.products = value;
  },
    error : err =>{
      console.log(err);
  }
});

}


}


