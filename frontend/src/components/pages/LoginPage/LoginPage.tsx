import './LoginPage.css';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { LoginInitialValues } from '../../../utils/types';
import { useMutation } from '@apollo/client';
import { LOGIN_TO_ORGANIZATION } from '../../../queries';
import { useNavigate } from 'react-router-dom';
import { useLoggedInUserDispatch, useNotificationDispatch } from '../../../utils/context/helperContext';
import { addNotification, LoggedIn } from '../../../utils/helperfunctions';

const LoginPage = () => {
  const notificationDispatch = useNotificationDispatch();
  const loggedInUserDispatch = useLoggedInUserDispatch()
  const [LoginOrganization] = useMutation(LOGIN_TO_ORGANIZATION, {
    onError: (error) => {
      const message = JSON.parse(JSON.stringify(error.message));
      addNotification({ message, type: 'error' }, notificationDispatch);
      setTimeout(() => {
        addNotification({ message: '', type: '' }, notificationDispatch);
      }, 3000);
    },
    onCompleted(data) {
      const organizationId = data.loginToOrganization.id;
      const message = 'Successfully Logged In!';
      navigate(`/organization/${organizationId}`);
      addNotification({ message, type: 'success' }, notificationDispatch);
      LoggedIn({  loggedIn: true }, loggedInUserDispatch)
      sessionStorage.setItem('loggedIn', "true")
    },
  });
  const navigate = useNavigate();

  const initialValues: LoginInitialValues = {
    organizationName: '',
    organizationPassword: '',
  };

  const validationSchema = yup.object().shape({
    organizationName: yup.string().required('This field is required'),
    organizationPassword: yup
      .string()
      .required('This field is required')
      .min(8, 'must be 8 characters'),
  });

  const onSubmit = async (data: LoginInitialValues) => {
    await LoginOrganization({ variables: data });
  };

  const formik = useFormik({
    validationSchema,
    initialValues,
    onSubmit,
  });

  return (
    <div className='login-container'>
      <div
        className='login-bg-image'
        style={{
          backgroundImage: `url('src/assets/images/man-making-call.jpg')`,
        }}
      ></div>
      <form action='' className='form-container' onSubmit={formik.handleSubmit}>
        <div className='form-content'>
          <h2>Welcome back login to your Organization</h2>
          <div className='input-container'>
            <input
              type='text'
              name='organization name'
              id='organization-name'
              placeholder=''
              style={
                formik.touched.organizationName &&
                formik.errors.organizationName
                  ? { borderColor: 'var(--Red)' }
                  : {}
              }
              value={formik.values.organizationName}
              onChange={formik.handleChange('organizationName')}
            />
            <div className='label-container'>
              <label htmlFor='organization-name' className='phone-label'>
                Organization Name
              </label>
              {formik.touched.organizationName &&
                formik.errors.organizationName && (
                  <span className='error'>
                    {formik.errors.organizationName}
                  </span>
                )}
            </div>
          </div>
          <div className='input-container'>
            <input
              type='password'
              name='organization password'
              id='organization-password'
              style={
                formik.touched.organizationPassword &&
                formik.errors.organizationPassword
                  ? { borderColor: 'var(--Red)' }
                  : {}
              }
              placeholder=''
              value={formik.values.organizationPassword}
              onChange={formik.handleChange('organizationPassword')}
            />
            <div className='label-container'>
              <label htmlFor='organization-password' className='password-label'>
                Organization Password
              </label>
              {formik.touched.organizationPassword &&
                formik.errors.organizationPassword && (
                  <span className='error'>
                    {formik.errors.organizationPassword}
                  </span>
                )}
            </div>
          </div>
          <button type='submit' className='submit-btn'>
            Login
          </button>
          <div className='login-alternate-btn'>
            <button type='button' className='leader-btn'>
              Continue as Leader/Admin
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
