import { JsonPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegionalSalesDirectorControllerService } from 'src/app/api/services/regionalSalesDirector.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-regional-sales-director',
  templateUrl: './add-regional-sales-director.component.html',
  styleUrls: ['./add-regional-sales-director.component.css']
})
export class AddRegionalSalesDirectorComponent implements OnInit {
  regionalSalesDirectorForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private regionalSalesDirectorService: RegionalSalesDirectorControllerService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.regionalSalesDirectorForm = this.fb.group({
      RegionalSaleDirectorName: ['', Validators.required],
      RegionalSaleDirectorEmail: ['', [Validators.required]]
    });
  }

  onSubmit(): void {
    if (this.regionalSalesDirectorForm.valid) {         
      this.regionalSalesDirectorService.addRegionalSalesDirector(this.regionalSalesDirectorForm.value).subscribe({
        next: (response) => {        
          Swal.fire({
            icon: 'success',
            title: 'Regional Sales Director added successfully!',
            showConfirmButton: false,
            timer: 2000
          }).then(() => {
            this.router.navigate(['regionalSalesDirector']);
          });
        },
        error: (err) => {          
          console.error(err);
          Swal.fire({
            icon: 'error',
            title: 'Failed to add Regional Sales Director',
            text: 'There was an issue adding the Regional Sales Director. Please try again.',
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
