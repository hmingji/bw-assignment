import { staffs } from '../data/staffs';
import { Staff } from '../types/Staff';

export function fetchStaffById(id: number): Staff | undefined {
  return staffs.find((t) => t.id === id);
}
