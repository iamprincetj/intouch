import { lazy, useEffect, useRef, Suspense } from 'react';
import './Header.css';
import { Link, useLocation } from 'react-router-dom';
import LoadingModal from './Modal/LoadingModal';
import { useLoggedInUserValue } from '../utils/context/helperContext';
const SearchIcon = lazy(() => import('@mui/icons-material/Search'));
const Menu = lazy(() => import('@mui/icons-material/Menu'));
const AddIcon = lazy(() => import('@mui/icons-material/Add'));

const Header = () => {
  const token = useLoggedInUserValue().loggedIn;
  const location = useLocation();
  const showModal = () => {
    const modalElement: HTMLDivElement | null =
      document.querySelector('.aside-container');
    if (modalElement) {
        modalElement.classList.replace(
          'aside-container-hide',
          'aside-container-show'
        )
    }
  };
  const loginBtnRef = useRef<HTMLAnchorElement>(null);
  const createBtnRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const loginBtnElement = loginBtnRef.current;
    const createBtnElement = createBtnRef.current;

    if (loginBtnElement && createBtnElement) {
      if (location.pathname === '/login') {
        loginBtnElement.style.display = 'none';
        createBtnElement.style.display = '';
      } else if (location.pathname === '/create-organization') {
        createBtnElement.style.display = 'none';
        loginBtnElement.style.display = '';
      } else {
        loginBtnElement.style.display = '';
        createBtnElement.style.display = '';
      }
    }
  }, [location.pathname]);

  return (
    <header className='header-container'>
      <div className='header-content'>
        <Suspense>
          <Menu className='menu-icon' onClick={showModal} />
        </Suspense>
        {!token && (
          <div className='auth-btn-container'>
            <Link to='/login' className='login-btn' ref={loginBtnRef}>
              Login
            </Link>
            <Link
              to='/create-organization'
              className='create-organization-btn'
              ref={createBtnRef}
            >
              Create Organization
            </Link>
          </div>
        )}

        {token && (
          <Suspense fallback={<LoadingModal />}>
            <div className='header-main-content'>
              <form action='' className='form-container'>
                <input
                  type='text'
                  name='search value'
                  id='search-value'
                  placeholder='Search...'
                />
                <SearchIcon className='search-icon' />
              </form>
              <div className='profile-container'>
                <div className='add-icon-container'>
                  <AddIcon className='add-icon' />
                </div>
                <div className='image-container'>TM</div>
              </div>
            </div>
          </Suspense>
        )}
      </div>
    </header>
  );
};

export default Header;
