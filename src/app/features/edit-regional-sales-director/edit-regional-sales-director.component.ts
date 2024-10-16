import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RegionalSalesDirectorControllerService } from 'src/app/api/services/regionalSalesDirector.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-regional-sales-director',
  templateUrl: './edit-regional-sales-director.component.html',
  styleUrls: ['./edit-regional-sales-director.component.css']
})
export class EditRegionalSalesDirectorComponent implements OnInit {
  regionalSalesDirectorForm!: FormGroup;
  regionalSalesDirectorId!: string;
 
  constructor(private regionalSalesDirectorService: RegionalSalesDirectorControllerService, private fb: FormBuilder, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.regionalSalesDirectorId = this.route.snapshot.paramMap.get('id')!;
    this.regionalSalesDirectorForm = this.fb.group({
      regionalSaleDirectorName: ['', Validators.required],
      regionalSaleDirectorEmail: ['', [Validators.required]]
    });
    this.regionalSalesDirectorService.getRegionalSalesDirectorById(this.regionalSalesDirectorId).subscribe(regional =>{
      this.regionalSalesDirectorForm.patchValue(regional);
    })
  }
  onSubmit():void{
    if(this.regionalSalesDirectorForm.valid)
    {
      this.regionalSalesDirectorService.updateRegionalSalesDirector(this.regionalSalesDirectorId,this.regionalSalesDirectorForm.value).subscribe({
        next: () => {
          Swal.fire({
              icon: 'success',
              title: 'Regional Sales Director updated successfully!',
              showConfirmButton: false,
              timer: 2000
          }).then(() => {
              this.router.navigate(['regionalSalesDirector']);
          });
      },
      error: () => {
          Swal.fire({
              icon: 'error',
              title: 'Failed to update Regional Sales Director',
              text: 'There was an issue updating the Regional Sales Director. Please try again.',
          });
      }
      })
    }
  }

}
