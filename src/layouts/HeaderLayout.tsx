import { ReactNode, useContext } from 'react';
import { ArrowLeftIcon } from '../components/common/Icons/ArrowLeftIcon';
import { ThemeContext, UserContext } from '../App';
import { UserIcon } from '../components/common/Icons/UserIcon';
import { ThemeSelection } from '../components/common/ThemeSelection';
import { useMediaQuery } from '../hooks/useMediaQuery';
import { themes } from '../types/Theme';
import { useLocation, useNavigate } from 'react-router-dom';

interface Props {
  children: ReactNode;
}

export function HeaderLayout({ children }: Props) {
  const user = useContext(UserContext);
  const theme = useContext(ThemeContext);
  const navigate = useNavigate();
  const location = useLocation();
  const matches = useMediaQuery('(min-width: 640px)');

  function backPage() {
    if (location.pathname === '/profiles') {
      navigate('/');
    } else if (
      location.pathname.split('/').length >= 4 &&
      location.pathname.split('/')[1] === 'profiles' &&
      !isNaN(parseInt(location.pathname.split('/')[2])) &&
      location.pathname.split('/')[3] === 'edit'
    ) {
      navigate(`/profiles/${location.pathname.split('/')[2]}`);
    } else {
      navigate('/profiles');
    }
  }

  return (
    <div
      className={`w-full min-h-screen bg-opacity-50 ${themes.find(
        (t) => t.value === theme?.value
      )?.bgClassName}`}
    >
      <header className="fixed w-full pb-4 sm:pt-10 pt-4 px-5 border-b-slate-300 border rounded-b-md flex justify-between items-center bg-white">
        <span
          className="cursor-pointer"
          onClick={backPage}
        >
          <ArrowLeftIcon />
        </span>
        <div className="flex gap-2 items-center">
          {matches ? (
            <>
              <span>{user?.value}</span>
              <UserIcon size="md" />
            </>
          ) : (
            <>
              <UserIcon size="md" />
              <span>{user?.value}</span>
            </>
          )}
        </div>

        {!matches && (
          <ThemeSelection
            mode="mobile"
            value={theme!.value}
            updateValue={theme!.updateValue}
          />
        )}
      </header>

      <div className={`w-full min-h-screen sm:pb-4 sm:pt-24 sm:px-8`}>
        <div className="sm:min-h-[88vh] w-full bg-white min-h-screen">
          {children}
        </div>
      </div>

      {matches && (
        <div className="fixed right-12 bottom-10">
          <ThemeSelection
            mode="web"
            value={theme!.value}
            updateValue={theme!.updateValue}
          />
        </div>
      )}
    </div>
  );
}
