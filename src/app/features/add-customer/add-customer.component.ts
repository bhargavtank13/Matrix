import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomerControllerService } from 'src/app/api/services/customer.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.css'],
})
export class AddCustomerComponent implements OnInit {
  customerForm!: FormGroup;

  constructor(private fb: FormBuilder, private customerService: CustomerControllerService, private router: Router) { }


  ngOnInit(): void {
    this.customerForm = this.fb.group({
      customerName: ['', Validators.required],
      customerEmail: ['', Validators.required]
    });
  }
  onSubmit(): void {
    debugger
    if (this.customerForm.valid) {
      this.customerService.addCustomer(this.customerForm.value).subscribe({
        next: (response) => {
          Swal.fire({
            icon: 'success',
            title: 'Customer added successfully!',
            showConfirmButton: false,
            timer: 2000
          }).then(() => {
            this.router.navigate(['']);
          });
        },
        error: (err) => {
          Swal.fire({
            icon: 'error',
            title: 'Failed to add customer',
            text: 'There was an issue adding the customer. Please try again.',
          });
        }
      });
    }

  }

}
