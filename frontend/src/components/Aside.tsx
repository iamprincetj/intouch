import './Aside.css';
import { Link, useNavigate } from 'react-router-dom';
import { lazy, Suspense, useEffect } from 'react';
import { addNotification, LoggedIn } from '../utils/helperfunctions';
import {
  useLoggedInUserDispatch,
  useLoggedInUserValue,
  useNotificationDispatch,
} from '../utils/context/helperContext';
const CancelIcon = lazy(() => import('@mui/icons-material/Close'));

const Aside = () => {
  const closeModalElement = () => {
    const modalElement: HTMLDivElement | null =
      document.querySelector('.aside-container');

    if (modalElement) {
      modalElement.classList.replace(
        'aside-container-show',
        'aside-container-hide'
      )
    }
  };
  const loggedInUserDispatch = useLoggedInUserDispatch();
  const loggedInUserValue = useLoggedInUserValue().loggedIn;
  const notificationDispatch = useNotificationDispatch();
  const navigate = useNavigate();

  const logout = () => {
    LoggedIn({ loggedIn: false }, loggedInUserDispatch);
    navigate('/login');
    addNotification(
      { type: 'success', message: 'Successfully logged out!' },
      notificationDispatch
    );
    sessionStorage.removeItem('loggedIn');
  };

  useEffect(() => {
    const listItems = document.querySelectorAll('.navbar-item');
    listItems.forEach((item) => {
      item.addEventListener('click', closeModalElement);
    });
  }, []);

  return (
    <aside
      className='aside-container aside-container-hide'
      onClick={({ target }) => {
        const modalContentElement = document.querySelector('.aside-content');
        const modalElement: HTMLDivElement | null =
          document.querySelector('.aside-container');
        if (
          modalContentElement &&
          !modalContentElement?.contains(target as Node)
        ) {
          if (window.outerWidth < 992) {
            if (modalElement) closeModalElement()
          }
        }
      }}
    >
      <div className='aside-content'>
        <div className='modal-header'>
          <h1 className='logo'>IN TOUCH</h1>
          <Suspense fallback={<div>loading...</div>}>
            <CancelIcon className='close-icon' onClick={closeModalElement} />
          </Suspense>
        </div>
        <nav className='navbar'>
          <ul className='navbar-list'>
            <Link to='/all-organizations'>
              <li className='navbar-item'>All Organizations</li>
            </Link>
            <Link to='/all-organizations'>
              <li className='navbar-item'>Dashboard</li>
            </Link>
            {loggedInUserValue && (
              <li
                className='navbar-item selected'
                onClick={() => {
                  logout();
                  closeModalElement();
                }}
              >
                Log out
              </li>
            )}
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default Aside;
