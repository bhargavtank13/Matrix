import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SalesRepResponse } from '../models/salesRepResponse';

@Injectable({
  providedIn: 'root'
})
export class SalesRepService {

  constructor(private http: HttpClient) { }

  apiUrl = 'https://localhost:7280/api/'

  getSalesReps():Observable<SalesRepResponse[]>{
    return this.http.get<SalesRepResponse[]>(`${this.apiUrl}salesRep`);
  }

  addSalesRep(salesRep: any): Observable<any> {
    return this.http.post(`${this.apiUrl}salesRep`, salesRep);
  }
}
