import { IPagination } from "./IPagination";

export interface IResultPaginated<T> {
  data: T[];
  success: boolean;
  pagination: IPagination;
}
