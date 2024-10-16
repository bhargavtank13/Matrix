import { RegionalSalesDirector } from "./regionalSalesDirectorResponse";

export interface SalesRepResponse{
    salesRepId: string;
    saleRepName: string;
    saleRepEmail: string;
    regionalSaleDirector: RegionalSalesDirector;
}