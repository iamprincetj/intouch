import { Route, Routes } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Header from './components/Header';
import LandingPage from './components/pages/landingPage/LandingPage';
import Aside from './components/Aside';
import './App.css';
import LoadingModal from './components/Modal/LoadingModal';
import { useNotificationValue } from './utils/context/helperContext';
const CreateOrganizationPage = lazy(
  () =>
    import('./components/pages/CreateOrganizationPage/CreateOrganizationPage')
);
const OrganizationPage = lazy(
  () => import('./components/pages/OrganizationPage/OrgainzationPage')
);

const AllOrganizationPage = lazy(
  () => import('./components/pages/AllOrganizationPage/AllOrganizationPage')
);
const LoginPage = lazy(() => import('./components/pages/LoginPage/LoginPage'));

const App = () => {
  const { message, type } = useNotificationValue();
  return (
    <div className='container'>
      {message && (
        <div className='notification'>
          <h5
            style={
              type === 'error'
                ? { color: 'red'}
                : { color: 'green'}
            }
          >
            {message}
          </h5>
        </div>
      )}
      <Aside />
      <main className='main-container'>
        <Header />
        <Suspense fallback={<LoadingModal />}>
          <div className='main-content'>
            <Routes>
              <Route path='/' element={<LandingPage />} />
              <Route path='/login' element={<LoginPage />} />
              <Route
                path='/all-organizations'
                element={<AllOrganizationPage />}
              />
              <Route path='/organization/:id' element={<OrganizationPage />} />
              <Route
                path='/create-organization'
                element={<CreateOrganizationPage />}
              />
              <Route path='*' element={<div>Page Not found!</div>} />
            </Routes>
          </div>
        </Suspense>
      </main>
      <footer className='footer-container'></footer>
    </div>
  );
};

export default App;
