import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { RegionalSalesDirector, RegionalSalesDirectorResponse } from 'src/app/api/models/regionalSalesDirectorResponse';
import { RegionalSalesDirectorControllerService } from 'src/app/api/services/regionalSalesDirector.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-regional-sales-director',
  templateUrl: './regional-sales-director.component.html',
  styleUrls: ['./regional-sales-director.component.css'],    
  standalone: true,
  imports: [TableModule, CommonModule, ButtonModule]
})
export class RegionalSalesDirectorComponent implements OnInit {

  loading: boolean = false;
  regionalDirector: RegionalSalesDirector[] = [];
  currentRegionalPage: number = 1;
  pageSize: number = 12;
  totalRecords: number = 0;
  pageSizeOptions: number[] = [12, 24, 36, 48, 60];
  totalPageNumbers: number[] = [];

  constructor(private readonly regionalSalesDirectorService: RegionalSalesDirectorControllerService,private router: Router) {}

  
  ngOnInit(): void {
    this.regionalSalesDirectorList(this.currentRegionalPage, this.pageSize);
  }

  regionalSalesDirectorList(pageNumber: number, pageSize: number): void {
    this.loading = true;
    this.regionalSalesDirectorService.getRegionalSalesDirectors(pageNumber, pageSize).subscribe({
      next: (data: RegionalSalesDirectorResponse) => {
        console.log(data);
        this.regionalDirector = data.regionalSaleDirectors;
        this.totalRecords = data.totalCount;
        this.loading = false;
      },
      error:(err)=>{
        console.error('Error fetching customer list:', err);
        this.loading = false;
      }
    });
  }

  addRegionalSalesDirector():void{
    this.router.navigate(['addRegionalSalesDirector']);
  }
  
  editRegional(regionalSaleDirectorId: string):void{
    this.router.navigate(['editRegionalSalesDirector',regionalSaleDirectorId]);
  }

  deleteRegional(regionalSaleDirectorId: string):void{
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this Regional Sales Director!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.regionalSalesDirectorService.deleteRegionalSalesDirector(regionalSaleDirectorId).subscribe({
          next: () => {
            Swal.fire({
              icon: 'success',
              title: 'Regional Sales Director deleted successfully!',
              showConfirmButton: false,
              timer: 2000
            }).then(() => {
              this.regionalSalesDirectorList(this.currentRegionalPage, this.pageSize);
            });
          },
          error: () => {
            Swal.fire({
              icon: 'error',
              title: 'Failed to delete Regional Sales Director',
              text: 'There was an issue deleting the Regional Sales Director. Please try again.',
            });
          }
        });
      }
    });
  }
  

}
