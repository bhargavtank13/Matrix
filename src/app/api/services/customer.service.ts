import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { CustomerResponse } from "../models/customerResponse";
import { addCustomer } from "../models/addCustomer";

@Injectable({
    providedIn: 'root',
})
export class CustomerControllerService {

    constructor(private http: HttpClient) { }

    apiUrl = 'https://localhost:7280/api/'

    getCustomers(pageNumber: number, pageSize: number): Observable<CustomerResponse> {
        return this.http.get<CustomerResponse>(`${this.apiUrl}customer?pageNumber=${pageNumber}&pageSize=${pageSize}`);
    }
    addCustomer(addCustomer: addCustomer): Observable<addCustomer> {
        return this.http.post<addCustomer>(`${this.apiUrl}customer`, addCustomer);
    }
    getCustomerById(customerId: string): Observable<any> {
        return this.http.get(`${this.apiUrl}customer/${customerId}`);
    }
    updateCustomer(customerId: string, customerData: any): Observable<any> {
        return this.http.patch(`${this.apiUrl}customer/${customerId}`, customerData);
    }
    deleteCustomer(customerId: string):Observable<any>{        
        return this.http.delete(`${this.apiUrl}customer/${customerId}`);
    }
}