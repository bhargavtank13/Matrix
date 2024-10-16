import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerControllerService } from 'src/app/api/services/customer.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.css']
})
export class EditCustomerComponent implements OnInit {
  customerForm!: FormGroup;
  customerId!: string;

  constructor(private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private customerService: CustomerControllerService) { }

  ngOnInit(): void {
    this.customerId = this.route.snapshot.paramMap.get('id')!;    
    this.customerForm = this.fb.group({
      customerName: ['', Validators.required],
      customerEmail: ['', [Validators.required, Validators.email]],
      customerNumber: ['', Validators.required]
    });
        
    this.customerService.getCustomerById(this.customerId).subscribe(customer => {
      this.customerForm.patchValue(customer);
    });
    
  }
  

  onSubmit(): void {
    if (this.customerForm.valid) {
        this.customerService.updateCustomer(this.customerId, this.customerForm.value).subscribe({
            next: () => {
                Swal.fire({
                    icon: 'success',
                    title: 'Customer updated successfully!',
                    showConfirmButton: false,
                    timer: 2000
                }).then(() => {
                    this.router.navigate(['']);
                });
            },
            error: () => {
                Swal.fire({
                    icon: 'error',
                    title: 'Failed to update customer',
                    text: 'There was an issue updating the customer. Please try again.',
                });
            }
        });
    }
}


}
