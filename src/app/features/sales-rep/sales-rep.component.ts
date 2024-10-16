import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { SalesRepResponse } from 'src/app/api/models/salesRepResponse';
import { SalesRepService } from 'src/app/api/services/sales-rep.service';

@Component({
  selector: 'app-sales-rep',
  templateUrl: './sales-rep.component.html',
  styleUrls: ['./sales-rep.component.css'],    
  standalone: true,
  imports: [TableModule, CommonModule, ButtonModule]
})
export class SalesRepComponent implements OnInit{
 
  loading: boolean = false;
  totalRecords: number = 0;
  salesRep: SalesRepResponse[] = [];

  constructor(private salesRepService: SalesRepService,private route:Router) {}
  
  ngOnInit(): void {
    this.salesRepList();
  }

  addSalesRep():void{
    this.route.navigate(['addSalesRep']);
  }

  salesRepList():void{
    this.salesRepService.getSalesReps().subscribe({
      next:(data: SalesRepResponse[]) => {
        console.log(data);    
        this.salesRep =data;            
      }
    });
  }

  
  
}
