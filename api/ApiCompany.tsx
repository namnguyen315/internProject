/* eslint-disable @typescript-eslint/no-explicit-any */
import {fetcher} from "./Fetcher";

const path = {
  createCompany: "/companies",
};

export interface ICreateCompanies {
  displayName: string;
  memberSize: string;
  photoFile: any;
  website: string;
  contactEmail: string;
  description: string;
}

export interface ICompanyBody {
  id?: number;
  createdAt?: string | null;
  updatedAt?: string | null;
  deletedAt?: string | null;
  createdById?: number | null;
  updatedById?: number | null;
  deletedById?: number | null;
  displayName?: string;
  status?: number;
  description?: string;
  photoPath?: string | null;
  numberOfUser?: number;
  website?: string;
  contactEmail?: string;
  memberSize?: string;
  photoUrl?: string;
}

export function createCompany(formData: any): Promise<ICreateCompanies> {
  return fetcher(
    {url: path.createCompany, method: "post", data: formData},
    {displayError: true}
  );
}

export function getAllCompany(): Promise<ICompanyBody[]> {
  return fetcher(
    {url: path.createCompany, method: "get"},
    {displayError: true}
  );
}
