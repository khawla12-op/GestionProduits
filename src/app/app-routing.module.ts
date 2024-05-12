import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { NewProductComponent } from './new-product/new-product.component';
import { LoginComponent } from './login/login.component';
import { AdminTemplateComponent } from './admin-template/admin-template.component';
const routes: Routes = [
  {path:"",redirectTo:"login",pathMatch:'full'},
  {path:"admin",component:AdminTemplateComponent,children:[
    {path:"products" ,component : ProductsComponent},
    {path:"newProduct" ,component : NewProductComponent},
    {path:"editProduct/:id",component:EditProductComponent},
    {path:"home" ,component : HomeComponent},


  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
