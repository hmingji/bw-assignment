import { LoginForm } from './LoginForm';

export function LoginPage() {
  return (
    <div className="container mx-auto h-screen flex items-center">
      <div className="h-full min-h-fit px-2 py-10 w-full sm:h-auto sm:w-80 sm:py-0 mx-auto">
        <LoginForm />
      </div>
    </div>
  );
}
