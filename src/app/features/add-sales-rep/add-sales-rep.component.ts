import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { RegionalSalesDirector, RegionalSalesDirectorResponse } from 'src/app/api/models/regionalSalesDirectorResponse';
import { RegionalSalesDirectorControllerService } from 'src/app/api/services/regionalSalesDirector.service';
import { SalesRepService } from 'src/app/api/services/sales-rep.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-sales-rep',
  templateUrl: './add-sales-rep.component.html',
  styleUrls: ['./add-sales-rep.component.css']
})
export class AddSalesRepComponent implements OnInit{

  salesRepForm: FormGroup;

  constructor(private fb:FormBuilder,private regionalSalesDirectorService: RegionalSalesDirectorControllerService,private salesRepService: SalesRepService, private router:Router) {
    this.salesRepForm = this.fb.group({
      saleRepName: ['', Validators.required],
      saleRepEmail: ['', [Validators.required, Validators.email]],
      regionalSaleDirectorId: ['', Validators.required]
    });
  }

  regionalDirector: RegionalSalesDirector[] = [];

  ngOnInit(): void {
    this.regionalSalesDirectorList(1,1000);
  }
  regionalSalesDirectorList(pageNumber: number, pageSize: number): void {
    
    this.regionalSalesDirectorService.getRegionalSalesDirectors(pageNumber, pageSize).subscribe({
      next: (data: RegionalSalesDirectorResponse) => {
        console.log(data);
        this.regionalDirector = data.regionalSaleDirectors;        
      },
      error:(err)=>{
        console.error('Error fetching customer list:', err);
       
      }
    });
  }

  onSubmit() {
        if (this.salesRepForm.valid) {         
      this.salesRepService.addSalesRep(this.salesRepForm.value).subscribe({
        next: (response) => {        
          Swal.fire({
            icon: 'success',
            title: 'Sales Rep added successfully!',
            showConfirmButton: false,
            timer: 2000
          }).then(() => {
            this.router.navigate(['salesRep']);
          });
        },
        error: (err) => {          
          console.error(err);
          Swal.fire({
            icon: 'error',
            title: 'Failed to add Sales Rep',
            text: 'There was an issue adding the Sales Rep. Please try again.',
          });
        }
      });
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Validation Error',
        text: 'Please fill in all required fields correctly.',
      });
    }
  }
}
