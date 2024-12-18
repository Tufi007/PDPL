import { 
  createBrowserRouter, 
  RouterProvider 
} from 'react-router-dom';
import RootLayout from './components/rootLayout/RootLayout';
import ErrorPage from './components/errorLayout/ErrorPage';
import Dashboard from './components/dashboardLayout/Dashboard';
import Organization from './components/organizationLayout/Organization';
import Teams from './components/teamsLayout/Teams';
import ConsentManagement from './components/consentManagement/ConsentManagement';
import DataCollection from './components/dataCollectionLayout/DataCollection';
import LegalGuardians from './components/legalGaurdiansLayout/LegalGuardians';
import AuditLogs from './components/auditLogs/AuditLogs';
import Auth from './components/authLayout/Auth';
import Login from './components/authLayout/Login';
import Signup from './components/authLayout/Signup';

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "organization",
        element: <Organization />
      },
      {
        path: "teams",
        element: <Teams />
      },
      {
        path: "consent",
        element: <ConsentManagement />
      },
      {
        path: "data",
        element: <DataCollection />
      },
      {
        path: "guardians",
        element: <LegalGuardians />
      },
      {
        path: "audit",
        element: <AuditLogs />
      }
    ]
  },
  {
    path: "/auth",
    element: <Auth />,
    children: [
      {
        path: "login",
        element: <Login />
      },
      {
        path: "signup",
        element: <Signup />
      }
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;