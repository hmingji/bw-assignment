import { useContext, useState } from 'react';
import { PasswordInput } from '../../common/PasswordInput';
import { Input } from '../../common/Input';
import { ThemeContext, UserContext } from '../../../App';
import { Button } from '../../common/Button';
import { users } from '../../../data/users';
import { useNavigate } from 'react-router-dom';

interface FormElements extends HTMLFormControlsCollection {
  name: HTMLInputElement;
  password: HTMLInputElement;
}
interface LoginFormElement extends HTMLFormElement {
  readonly elements: FormElements;
}

export function LoginForm() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [nameErrMsg, setNameErrMsg] = useState('');
  const [passwordErrMsg, setPasswordErrMsg] = useState('');
  const theme = useContext(ThemeContext);
  const user = useContext(UserContext);
  const navigate = useNavigate();

  function nameOnChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (nameErrMsg) setNameErrMsg('');
    setName(event.target.value);
  }

  function passwordOnChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (passwordErrMsg) setPasswordErrMsg('');
    setPassword(event.target.value);
  }

  function submitForm(event: React.FormEvent<LoginFormElement>) {
    event.preventDefault();
    console.log('submitted');
    const submittedName = event.currentTarget.elements.name.value;
    const submittedPassword = event.currentTarget.elements.password.value;
    const matched = users.find((u) => u.name === submittedName);

    if (!matched) {
      setNameErrMsg('We could not find your username');
    } else if (matched.password !== submittedPassword) {
      console.log(matched.password);
      setPasswordErrMsg('Your password is incorrect.');
    } else {
      user?.updateValue(submittedName);
      navigate('/profiles');
    }
  }

  return (
    <form
      className="w-full flex flex-col gap-2 h-full"
      onSubmit={submitForm}
    >
      <div className="text-left sm:text-center">
        <p className="font-secondary font-extrabold text-3xl">Login</p>
        <p className="font-secondary font-normal text-base">Welcome back!</p>
      </div>
      <div className="pt-1 pb-8 sm:mb-0 mb-auto">
        <Input
          value={name}
          onChange={nameOnChange}
          placeholder="Username"
          theme={theme?.value ?? 'blue'}
          errorMessage={nameErrMsg}
          name="name"
          type="text"
        />
        <PasswordInput
          value={password}
          onChange={passwordOnChange}
          placeholder="Password"
          theme={theme?.value ?? 'blue'}
          errorMessage={passwordErrMsg}
          name="password"
        />
      </div>
      <Button
        theme={theme?.value ?? 'blue'}
        type="submit"
        disabled={name === '' || password === ''}
      >
        <span className="font-primary text-white">Login</span>
      </Button>
    </form>
  );
}
