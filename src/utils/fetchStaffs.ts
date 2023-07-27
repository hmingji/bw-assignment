import { staffs } from '../data/staffs';
import { Staff } from '../types/Staff';

export type StaffsResponse = {
  staffs: Staff[];
  totalCount: number;
};

export function fetchStaffs(pageSize = 10, pageNum: number): StaffsResponse {
  const paginated = staffs.slice((pageNum - 1) * pageSize, pageNum * pageSize);
  return { staffs: paginated, totalCount: staffs.length };
}
