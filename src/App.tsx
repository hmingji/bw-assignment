import { createContext, useState } from 'react';
import { Theme } from './types/Theme';
import { Outlet, useLocation } from 'react-router-dom';
import { LoginPage } from './components/screens/login/LoginPage';
import { useMediaQuery } from './hooks/useMediaQuery';
import { Clock } from './components/common/Clock';
import { HeaderLayout } from './layouts/HeaderLayout';

export const ThemeContext = createContext<
  { value: Theme; updateValue: (t: Theme) => void } | undefined
>(undefined);
export const UserContext = createContext<
  { value: string; updateValue: (t: string) => void } | undefined
>(undefined);

function App() {
  const [theme, setTheme] = useState<Theme>('blue');
  const [user, setUser] = useState<string>('');
  const matches = useMediaQuery('(min-width: 640px)');
  const location = useLocation();

  return (
    <ThemeContext.Provider value={{ value: theme, updateValue: setTheme }}>
      <UserContext.Provider value={{ value: user, updateValue: setUser }}>
        {matches && (
          <div className="fixed top-5 left-5 z-50">
            <Clock />
          </div>
        )}

        {location.pathname === '/' ? (
          <LoginPage />
        ) : (
          <HeaderLayout>
            <Outlet />
          </HeaderLayout>
        )}
      </UserContext.Provider>
    </ThemeContext.Provider>
  );
}

export default App;
