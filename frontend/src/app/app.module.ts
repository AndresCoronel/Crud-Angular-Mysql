import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { ClientesComponent } from './components/clientes/clientes.component';
import { ProductoComponent } from './components/producto/producto.component';
import { UsersComponent } from './components/users/users.component';
import { HomeComponent } from './components/home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { ClienteProductoComponent } from './components/cliente-producto/cliente-producto.component';
import { FilterPipe } from './pipes/filter.pipe';
import { ProductoPipe } from './PIPES/producto.pipe';

const appRoutes: Routes =[
  {
    path:'inicio', component: HomeComponent
  },
  {
    path:'clienteproducto', component: ClienteProductoComponent
  },
  {
    path:'clientes', component: ClientesComponent
  },
  {
    path: 'productos', component: ProductoComponent
  }
]
@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  declarations: [
    AppComponent,
    ClientesComponent,
    ProductoComponent,
    HomeComponent,
    ClienteProductoComponent,
    FilterPipe,
    ProductoPipe
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }