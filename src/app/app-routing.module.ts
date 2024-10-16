import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerComponent } from './features/customer/customer.component';
import { AddCustomerComponent } from './features/add-customer/add-customer.component';
import { EditCustomerComponent } from './features/edit-customer/edit-customer.component';
import { RegionalSalesDirectorComponent } from './features/regional-sales-director/regional-sales-director.component';
import { AddRegionalSalesDirectorComponent } from './features/add-regional-sales-director/add-regional-sales-director.component';
import { EditRegionalSalesDirectorComponent } from './features/edit-regional-sales-director/edit-regional-sales-director.component';
import { SalesRepComponent } from './features/sales-rep/sales-rep.component';
import { AddSalesRepComponent } from './features/add-sales-rep/add-sales-rep.component';

const routes: Routes = 
[
  {path: '', component: CustomerComponent},
  {path: '**', redirectTo: '*' },
  {path: 'addCustomer', component: AddCustomerComponent},
  {path: 'edit-customer/:id', component: EditCustomerComponent },
  {path: 'regionalSalesDirector', component: RegionalSalesDirectorComponent },
  {path: 'addRegionalSalesDirector', component: AddRegionalSalesDirectorComponent },
  {path: 'editRegionalSalesDirector/:id', component: EditRegionalSalesDirectorComponent },
  {path: 'salesRep', component: SalesRepComponent },
  {path: 'addSalesRep', component: AddSalesRepComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
