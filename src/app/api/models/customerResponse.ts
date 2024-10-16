export interface Customer {
    customerId: string;
    customerNumber: number;
    customerName: string;
    customerEmail: string;
    createdBy: number;
    createdAt: string;
    updatedBy: number;
    updatedAt: string;
  }
  
  export interface CustomerResponse {
    customers: Customer[];
    totalCount: number;
  }
  