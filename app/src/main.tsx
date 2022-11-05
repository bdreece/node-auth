import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import AccessProvider from './components/providers/AccessProvider';
import SelfProvider from './components/providers/SelfProvider';
import Index from './pages/Index';
import Login from './pages/Login';
import Logout from './pages/Logout';
import Register from './pages/Register';

const router = createBrowserRouter([
  { path: '/', element: <Index /> },
  { path: '/login', element: <Login /> },
  { path: '/register', element: <Register /> },
  { path: '/logout', element: <Logout /> },
]);

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AccessProvider>
        <SelfProvider>
          <RouterProvider router={router} />
        </SelfProvider>
      </AccessProvider>
    </QueryClientProvider>
  </React.StrictMode>,
);
