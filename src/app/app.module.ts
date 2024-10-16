import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddCustomerComponent } from './features/add-customer/add-customer.component';
import { EditCustomerComponent } from './features/edit-customer/edit-customer.component';
import { SidebarComponent } from './features/sidebar/sidebar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AddRegionalSalesDirectorComponent } from './features/add-regional-sales-director/add-regional-sales-director.component';
import { EditRegionalSalesDirectorComponent } from './features/edit-regional-sales-director/edit-regional-sales-director.component';
import { AddSalesRepComponent } from './features/add-sales-rep/add-sales-rep.component';

@NgModule({
  declarations: [
    AppComponent,
    AddCustomerComponent,
    EditCustomerComponent,
    SidebarComponent,
    AddRegionalSalesDirectorComponent,
    EditRegionalSalesDirectorComponent,
    AddSalesRepComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

}
