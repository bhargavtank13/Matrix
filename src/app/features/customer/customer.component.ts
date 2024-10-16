import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { Customer, CustomerResponse } from 'src/app/api/models/customerResponse';
import { CustomerControllerService } from 'src/app/api/services/customer.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css'],  
  standalone: true,
  imports: [TableModule, CommonModule, ButtonModule]
})
export class CustomerComponent implements OnInit {

  loading: boolean = false;
  customers: Customer[] = [];
  currentPage: number = 1;
  pageSize: number = 12;
  totalRecords: number = 0;
  pageSizeOptions: number[] = [12, 24, 36, 48, 60];
  totalPageNumbers: number[] = [];

  constructor(private readonly customerService: CustomerControllerService, private router: Router) { }
  ngOnInit(): void { this.customerList(this.currentPage, this.pageSize) }

  addCustomer():void{
    this.router.navigate(['addCustomer']);
  }
  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.customerList(this.currentPage, this.pageSize);
    }
  }

  nextPage(): void {
    this.currentPage++;
    this.customerList(this.currentPage, this.pageSize);
  }

  hasNextPage(): boolean {
    return this.currentPage * this.pageSize < this.totalRecords;
  }

  totalPagesArray(): number[] {
    return Array.from({ length: Math.ceil(this.totalRecords / this.pageSize) }, (_, i) => i + 1);
  }

  goToPage(page: number): void {
    if (page !== this.currentPage) {
      this.currentPage = page;
      this.customerList(this.currentPage, this.pageSize);
    }
  }

  customerList(pageNumber: number, pageSize: number): void {
    this.loading = true;
    this.customerService.getCustomers(pageNumber, pageSize).subscribe({
      
      next: (data: CustomerResponse) => {
        this.customers = data.customers;
        this.totalRecords = data.totalCount;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching customer list:', err);
        this.loading = false;
      }
    });
  }

  editCustomer(customerId: string): void {
    this.router.navigate(['/edit-customer', customerId]);
  }

  deleteCustomer(customerId: string): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this customer!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.customerService.deleteCustomer(customerId).subscribe({
          next: () => {
            Swal.fire({
              icon: 'success',
              title: 'Customer deleted successfully!',
              showConfirmButton: false,
              timer: 2000
            }).then(() => {
              this.customerList(this.currentPage, this.pageSize);
            });
          },
          error: () => {
            Swal.fire({
              icon: 'error',
              title: 'Failed to delete customer',
              text: 'There was an issue deleting the customer. Please try again.',
            });
          }
        });
      }
    });
  }

  // onPageSizeChange(event: any): void {
  //   this.pageSize = +event.target.value;
  //   this.currentPage = 1; 
  //   this.customerList(this.currentPage, this.pageSize);
  //   this.calculateTotalPages(); 
  // }

  // onPageNumberChange(event: any): void {
  //   this.currentPage = +event.target.value;
  //   this.customerList(this.currentPage, this.pageSize);
  // }

  // calculateTotalPages(): void {

  //   const totalPages = Math.ceil(this.totalRecords / this.pageSize);
  //   this.totalPageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);
  // }

}
