

import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ClientesComponent } from './components/clientes/clientes.component';
import { ProductoComponent } from './components/producto/producto.component';
import { UsersComponent } from './components/users/users.component';
import { HomeComponent } from './components/home/home.component';

const appRoutes: Routes =[
  {
    path:'inicio', component: HomeComponent
  },
  {
    path:'clientes', component: ClientesComponent
  },
  {
    path: 'productos', component: ProductoComponent
  }
]
@NgModule({
  declarations: [
    AppComponent,
    ClientesComponent,
    ProductoComponent,
    HomeComponent
  ],
  imports: [
   RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
