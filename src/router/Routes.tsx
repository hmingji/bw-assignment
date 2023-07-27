import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import { ProfilesPage } from '../components/screens/profiles/ProfilesPage';
import { ProfilePage } from '../components/screens/profile/ProfilePage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: 'profiles',
        element: <ProfilesPage />,
      },
      { path: 'profiles/:id', element: <ProfilePage mode="view" /> },
      { path: 'profiles/:id/edit', element: <ProfilePage mode="edit" /> },
      { path: 'profiles/new', element: <ProfilePage mode="create" /> },
    ],
  },
]);
