export interface RegionalSalesDirector{
    regionalSaleDirectorId: string;
    regionalSaleDirectorName: string;
    regionalSaleDirectorEmail: string;
    createdBy: number;
    createdAt: string;
    updatedBy: number;
    updatedAt: string;
}

export interface RegionalSalesDirectorResponse{
    regionalSaleDirectors: RegionalSalesDirector[];
    totalCount: number;
}