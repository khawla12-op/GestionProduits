import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { Product } from '../model/product.model';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AppStateService } from '../services/app-state.service';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent implements OnInit {
  constructor(
    private productService: ProductService,
    private router: Router,
    public appState: AppStateService
  ) {}
  //Quand on appelle une methode il nous retourne un objet observable dans laquelle je dois faire un subscribe pour eviter les sorties bloquantes
  ngOnInit() {
    this.searchProducts();
  }
  searchProducts() {
    // this.appState.setProductState({
    //   status: 'LOADING',
    // });
    this.productService
      .searchProducts(
        this.appState.productsState.keyword,
        this.appState.productsState.currentPage,
        this.appState.productsState.pageSize
      )

      .subscribe({
        next: (resp) => {
          let products = resp.body as Product[];
          let totalProducts: number = parseInt(
            resp.headers.get('X-Total-Count')!
          );
          //this.appState.productsState.totalProducts = totalProducts;
          let totalPages = Math.floor(
            totalProducts / this.appState.productsState.pageSize
          );
          if (totalProducts % this.appState.productsState.pageSize != 0) {
            ++totalPages;
          }
          this.appState.setProductState({
            products: products,
            totalProducts: totalProducts,
            totalPages: totalPages,
            status: 'LOADED',
          });
        },
        error: (err) => {
          this.appState.setProductState({
            status: 'ERROR',
            errorMessage: err,
          });
        },
      });
  }
  handleCheckProduct(product: Product) {
    this.productService.checkProduct(product).subscribe({
      next: (updatedProduct) => {
        this.appState.productsState.products =
          this.appState.productsState.products.map((p: Product) => {
            if (p.id == updatedProduct.id) {
              return updatedProduct;
            } else {
              return p;
            }
          });
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  handleDelete(product: Product) {
    if (confirm('Are you sure you want to delete this product?'))
      this.productService.handleDelete(product).subscribe({
        //je dois mettre a jour le frontend
        next: (value) => {
          //this.getProducts();
          //this.appState.productsState.products=this.appState.productsState.products.filter((p:any) =>p.id!==product.id);
          this.searchProducts();
        },
      });
  }

  handleGoToPage(page: number) {
    this.appState.productsState.currentPage = page;
    this.searchProducts();
  }
  handleEdit(product: Product) {
    this.router.navigateByUrl(`/admin/editProduct/${product.id}`);
  }
}
