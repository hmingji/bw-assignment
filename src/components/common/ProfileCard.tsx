import { Staff } from '../../types/Staff';
import { UserIcon } from './Icons/UserIcon';

interface Props {
  staff: Staff;
}
export function ProfileCard({ staff }: Props) {
  return (
    <div className="h-full grid grid-rows-2 grid-cols-12 gap-2 p-2 border border-gray-300 rounded-sm min-w-md shadow-md">
      <div className="row-start-1 row-end-3 col-start-1 col-end-3 self-center justify-self-center">
        <UserIcon size="lg" />
      </div>
      <div className="row-start-1 row-end-2 col-start-3 col-end-9">
        <p className="text-sm text-gray-500 font-primary">Name</p>
        <p className="text-base font-primary">{staff.name}</p>
      </div>
      <div className="row-start-1 row-end-2 col-start-9 col-end-11">
        <p className="text-sm text-gray-500 font-primary">Gender</p>
        <p className="text-base font-primary">
          {staff.gender === 'Prefer not to say' ? '-' : staff.gender}
        </p>
      </div>
      <div className="row-start-1 row-end-2 col-start-11 col-end-13">
        <p className="text-sm text-gray-500 font-primary">Age</p>
        <p className="text-base font-primary">{staff.age}</p>
      </div>
      <div className="row-start-2 row-end-3 col-start-3 col-end-13">
        <p className="text-sm text-gray-500 font-primary">Email</p>
        <p className="text-base font-primary">{staff.email}</p>
      </div>
    </div>
  );
}
