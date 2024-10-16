import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { RegionalSalesDirectorResponse } from "../models/regionalSalesDirectorResponse";
import { AddRegionalSalesDirector } from "../models/addRegionalSalesDirector";

@Injectable({
    providedIn: 'root',
})
export class RegionalSalesDirectorControllerService{
    
    constructor(private http:HttpClient) {}

    apiUrl = 'https://localhost:7280/api/'

    getRegionalSalesDirectors(pageNumber: number, pageSize: number): Observable<RegionalSalesDirectorResponse>{
        return this.http.get<RegionalSalesDirectorResponse>(`${this.apiUrl}regionalSalesDirector?pageNumber=${pageNumber}&pageSize=${pageSize}`);        
    }

    addRegionalSalesDirector(addRegionalSalesDirector: AddRegionalSalesDirector):Observable<AddRegionalSalesDirector>{
        return this.http.post<AddRegionalSalesDirector>(`${this.apiUrl}regionalSalesDirector`,addRegionalSalesDirector);
    }

    getRegionalSalesDirectorById(regionalSalesDirectorId: string): Observable<any>{
        return this.http.get<any>(`${this.apiUrl}regionalSalesDirector/${regionalSalesDirectorId}`);
    }

    updateRegionalSalesDirector(regionalSalesDirectorId: string,regionalSalesDirector: any):Observable<any>{
        return this.http.patch(`${this.apiUrl}regionalSalesDirector/${regionalSalesDirectorId}`,regionalSalesDirector);
    }

    deleteRegionalSalesDirector(regionalSalesDirectorId: string):Observable<any>{ 
        debugger       
        return this.http.delete(`${this.apiUrl}regionalSalesDirector/${regionalSalesDirectorId}`);
    }
}
