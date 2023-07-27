import { FormEvent, useContext, useEffect, useState } from 'react';
import { Input } from '../../common/Input';
import { useNavigate, useParams } from 'react-router-dom';
import { Gender, Staff, genders } from '../../../types/Staff';
import { fetchStaffById } from '../../../utils/fetchStaffById';
import { ThemeContext } from '../../../App';
import { Dropdown } from '../../common/Dropdown';
import { Button } from '../../common/Button';
import { PlusIcon } from '../../common/Icons/PlusIcon';
import { staffs } from '../../../data/staffs';
import { EditIcon } from '../../common/Icons/EditIcon';
import { themes } from '../../../types/Theme';

type ProfileFormMode = 'create' | 'view' | 'edit';

interface Props {
  mode: ProfileFormMode;
}

function formTitle(mode: ProfileFormMode) {
  switch (mode) {
    case 'create':
      return 'New Profile';
    case 'view':
      return 'View Profile';
    case 'edit':
      return 'Edit Profile';
  }
}

export function ProfilePage({ mode }: Props) {
  const theme = useContext(ThemeContext);
  const params = useParams();
  const navigate = useNavigate();
  let staff: Staff | undefined;
  if (mode === 'edit' || mode === 'view')
    staff = fetchStaffById(parseInt(params.id!));
  const [name, setName] = useState<string | undefined>(
    mode === 'create' ? undefined : staff?.name
  );
  const [age, setAge] = useState<number | undefined>(
    mode === 'create' ? undefined : staff?.age
  );
  const [email, setEmail] = useState<string | undefined>(
    mode === 'create' ? undefined : staff?.email
  );
  const [gender, setGender] = useState<Gender | undefined>(
    mode === 'create' ? undefined : staff?.gender
  );
  const [nameErrMsg, setNameErrMsg] = useState('');
  const [ageErrMsg, setAgeErrMsg] = useState('');
  const [emailErrMsg, setEmailErrMsg] = useState('');
  const [genderErrMsg, setGenderErrMsg] = useState('');
  const [nameNote, setNameNote] = useState('');
  const themeStyles = themes.find((t) => t.value === theme?.value);

  useEffect(() => {
    if (mode === 'edit') {
      setNameNote('Username cannot be edited.');
    } else {
      setNameNote('');
    }
  }, [mode, setNameNote]);

  function nameOnChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (nameErrMsg) setNameErrMsg('');
    if (!nameNote) setNameNote('Username cannot be edited after creation.');
    setName(event.target.value);
  }

  function ageOnChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (ageErrMsg) setAgeErrMsg('');
    setAge(parseInt(event.target.value));
  }

  function emailOnChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (emailErrMsg) setEmailErrMsg('');
    setEmail(event.target.value);
  }

  function updateGender(o: string) {
    if (genderErrMsg) setGenderErrMsg('');
    setGender(o as Gender);
  }

  function submitForm(event: FormEvent<HTMLFormElement>) {
    event?.preventDefault();
    if (!name) setNameErrMsg('This field cannot be left empty');
    if (!age) setAgeErrMsg('This field cannot be left empty');
    if (!email) setEmailErrMsg('This field cannot be left empty');
    if (!gender) setGenderErrMsg('A selection must be made');

    if (mode === 'create') {
      staffs.push({ id: staffs.length + 1, name, age, email, gender } as Staff);
      navigate('/profiles');
    }
    if (mode === 'edit') {
      const idx = staffs.findIndex((s) => s.id === staff!.id);
      staffs[idx].age = age!;
      staffs[idx].email = email!;
      staffs[idx].gender = gender!;
      navigate(`/profiles${params.id}`);
    }
  }

  function editButtonOnClick() {
    if (mode === 'view') {
      navigate(`/profiles/${params.id}/edit`);
    }
    if (mode === 'edit') navigate(`/profiles/${params.id}`);
  }

  return (
    <div className="px-4 sm:min-h-[88vh] min-h-screen flex flex-col pt-20 sm:py-4 pb-20">
      <form onSubmit={submitForm}>
        <div className="flex sm:justify-start justify-between items-center pb-4 gap-4">
          <p className="font-primary text-xl font-bold">{formTitle(mode)}</p>
          {mode !== 'create' && (
            <span
              className={`${
                mode === 'edit'
                  ? `${themeStyles?.textClassName}`
                  : `${themeStyles?.hoverTextClassName}`
              } cursor-pointer`}
              onClick={editButtonOnClick}
            >
              <EditIcon />
            </span>
          )}
        </div>
        <div className="grid sm:grid-rows-2 grid-rows-3 sm:grid-cols-6 grid-cols-2 gap-2 sm:max-w-[800px] pb-4 sm:flex-grow">
          <div className="row-start-1 row-end-2 col-start-1 sm:col-end-5 col-end-3">
            <label htmlFor="name">Name</label>
            <Input
              id="name"
              value={name}
              onChange={nameOnChange}
              placeholder="Enter username"
              theme={theme!.value}
              type="text"
              errorMessage={nameErrMsg}
              note={nameNote}
              disabled={mode === 'view' || mode === 'edit'}
            />
          </div>
          <div className="sm:row-start-1 row-start-2 sm:row-end-2 row-end-3 sm:col-start-5 col-start-1 sm:col-end-7 col-end-2">
            <label htmlFor="age">Age</label>
            <Input
              id="age"
              value={age?.toString()}
              onChange={ageOnChange}
              placeholder="Enter number"
              theme={theme!.value}
              type="number"
              min={1}
              errorMessage={ageErrMsg}
              disabled={mode === 'view'}
            />
          </div>
          <div className="sm:row-start-2 row-start-3 sm:row-end-3 row-end-4 sm:col-start-1 col-start-1 sm:col-end-5 col-end-3">
            <label htmlFor="email">Email</label>
            <Input
              id="email"
              value={email}
              onChange={emailOnChange}
              placeholder="Enter email"
              theme={theme!.value}
              type="email"
              errorMessage={emailErrMsg}
              disabled={mode === 'view'}
            />
          </div>
          <div className="sm:row-start-2 row-start-2 sm:row-end-3 row-end-3 sm:col-start-5 col-start-2 sm:col-end-7 col-end-3">
            <p>Gender</p>
            <Dropdown
              value={gender}
              options={genders}
              updateOption={updateGender}
              theme={theme!.value}
              errorMessage={genderErrMsg}
              disabled={mode === 'view'}
            />
          </div>
        </div>
        {mode !== 'view' && (
          <div className="sm:w-52 sm:static fixed bottom-10 left-0 w-full px-4 sm:px-0">
            <Button
              theme={theme!.value}
              type="submit"
            >
              {mode === 'create' ? (
                <div className="w-full flex items-center">
                  <PlusIcon />
                  <p className="flex-grow text-white font-bold font-primary">
                    Create Profile
                  </p>
                </div>
              ) : (
                <p className="text-white font-bold font-primary">
                  Save Changes
                </p>
              )}
            </Button>
          </div>
        )}
      </form>
    </div>
  );
}
