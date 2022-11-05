import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import AccessProvider from 'components/providers/AccessProvider';
import SelfProvider from 'components/providers/SelfProvider';
import Index from 'pages/Index';

const router = createBrowserRouter([{ path: '/', element: <Index /> }]);

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
