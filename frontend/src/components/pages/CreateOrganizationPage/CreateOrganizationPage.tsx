import './CreateOrganizationPage.css';
import * as yup from 'yup';
import { useFormik } from 'formik';
import {
  OrganizationInitialValues,
  OrganizationType,
} from '../../../utils/types';
import { useMutation } from '@apollo/client';
import { ADD_ORGANIZATION } from '../../../queries';
import { addNotification, LoggedIn } from '../../../utils/helperfunctions';
import {
  useLoggedInUserDispatch,
  useNotificationDispatch,
} from '../../../utils/context/helperContext';
import { useNavigate } from 'react-router-dom';

const CreateOrganizationPage = () => {
  const initialValues: OrganizationInitialValues = {
    leaderFirstName: '',
    leaderLastName: '',
    leaderNumber: '',
    leaderPassword: '',
    organizationName: '',
    organizationLocation: '',
    organizationType: OrganizationType.Office,
    organizationPassword: '',
    confirmLeaderPassword: '',
    confirmOrganizationPassword: '',
  };
  const organizationTypes = Object.values(OrganizationType);
  const notificationDispatch = useNotificationDispatch();
  const loggedInUserDispatch = useLoggedInUserDispatch();
  const navigate = useNavigate();

  // const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  // const [showedFormcontent, setshowedFormContent] = useState(0);

  const [createOrganization] = useMutation(ADD_ORGANIZATION, {
    onError: (error) => {
      const message = error.message;
      console.log(JSON.parse(JSON.stringify(error.message)));
      addNotification({ type: 'error', message }, notificationDispatch);
      setTimeout(() => {
        addNotification({ type: '', message: '' }, notificationDispatch);
      }, 3000);
    },
    onCompleted: (data) => {
      console.log(data);
      const organizationId = data.createOrganizationAndLeader.id;
      console.log(data.createOrganizationAndLeader.id);
      navigate(`/organization/${organizationId}`);
      addNotification(
        { type: 'error', message: 'Organization Created!' },
        notificationDispatch
      );
      LoggedIn({ loggedIn: true }, loggedInUserDispatch);
      sessionStorage.setItem('loggedIn', 'true');
    },
    fetchPolicy: 'network-only',
  });

  const onSubmit = async (data: OrganizationInitialValues) => {
    createOrganization({ variables: data });
  };

  const validationSchema = yup.object().shape({
    leaderFirstName: yup.string().required('This field is required!'),
    leaderLastName: yup.string().required('This field is required!'),
    leaderNumber: yup.string().required('This field is required!'),
    leaderPassword: yup
      .string()
      .required('This field is required!')
      .min(8, 'must be 8 characters long'),
    organizationName: yup.string().required('This field is required!'),
    organizationLocation: yup.string().required('This field is required!'),
    organizationPassword: yup
      .string()
      .required('This field is required!')
      .min(8, 'must be 8 characters long'),
    confirmLeaderPassword: yup
      .string()
      .oneOf([yup.ref('leaderPassword')], 'Leader Password must match'),
    confirmOrganizationPassword: yup
      .string()
      .oneOf(
        [yup.ref('organizationPassword')],
        'Organization Password must match'
      ),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
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
        <h2>Create your Organization</h2>
        <div className='form-content'>
          <h2>Leader Information</h2>
          <div className='input-container'>
            <input
              type='text'
              name="leader's first name"
              id='leader-first-name'
              value={formik.values.leaderFirstName}
              placeholder=''
              style={
                formik.touched.leaderFirstName && formik.errors.leaderFirstName
                  ? { borderColor: 'var(--Red)' }
                  : {}
              }
              onChange={formik.handleChange('leaderFirstName')}
            />
            <div className='label-container'>
              <label htmlFor='leader-first-name' className='phone-label'>
                Leader First Name
              </label>
              {formik.touched.leaderFirstName &&
                formik.errors.leaderFirstName && (
                  <span className='error'>{formik.errors.leaderFirstName}</span>
                )}
            </div>
          </div>
          <div className='input-container'>
            <input
              type='text'
              name="leader's last name"
              id='leader-last-name'
              value={formik.values.leaderLastName}
              placeholder=''
              style={
                formik.touched.leaderLastName && formik.errors.leaderLastName
                  ? { borderColor: 'var(--Red)' }
                  : {}
              }
              onChange={formik.handleChange('leaderLastName')}
            />
            <div className='label-container'>
              <label htmlFor='leader-last-name' className='phone-label'>
                Leader Last Name
              </label>
              {formik.touched.leaderLastName &&
                formik.errors.leaderLastName && (
                  <span className='error'>{formik.errors.leaderLastName}</span>
                )}
            </div>
          </div>
          <div className='input-container'>
            <input
              type='text'
              name='leader phone number'
              id='leader-number'
              value={formik.values.leaderNumber}
              placeholder=''
              style={
                formik.touched.leaderNumber && formik.errors.leaderNumber
                  ? { borderColor: 'var(--Red)' }
                  : {}
              }
              onChange={formik.handleChange('leaderNumber')}
            />
            <div className='label-container'>
              <label htmlFor='leader-number' className='phone-label'>
                Leader Phone Number
              </label>
              {formik.touched.leaderNumber && formik.errors.leaderNumber && (
                <span className='error'>{formik.errors.leaderNumber}</span>
              )}
            </div>
          </div>
          <div className='input-container'>
            <input
              type='password'
              name='leader password'
              id='leader-password'
              placeholder=''
              value={formik.values.leaderPassword}
              style={
                formik.touched.leaderPassword && formik.errors.leaderPassword
                  ? { borderColor: 'var(--Red)' }
                  : {}
              }
              onChange={formik.handleChange('leaderPassword')}
            />
            <div className='label-container'>
              <label htmlFor='leader-password' className='password-label'>
                Leader Password
              </label>
              {formik.touched.leaderPassword &&
                formik.errors.leaderPassword && (
                  <span className='error'>{formik.errors.leaderPassword}</span>
                )}
            </div>
          </div>
        </div>
        <div className='form-content'>
          <h2>Organization Information</h2>
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
              type='text'
              name='organization location'
              id='organization-location'
              placeholder=''
              style={
                formik.touched.organizationLocation &&
                formik.errors.organizationLocation
                  ? { borderColor: 'var(--Red)' }
                  : {}
              }
              value={formik.values.organizationLocation}
              onChange={formik.handleChange('organizationLocation')}
            />
            <div className='label-container'>
              <label htmlFor='organization-location' className='location-label'>
                Organization Location
              </label>
              {formik.touched.organizationLocation &&
                formik.errors.organizationLocation && (
                  <span className='error'>
                    {formik.errors.organizationLocation}
                  </span>
                )}
            </div>
          </div>
          <div className='input-container'>
            <select
              name='organization types'
              id='organization-type'
              style={
                formik.touched.organizationType &&
                formik.errors.organizationType
                  ? { borderColor: 'var(--Red)' }
                  : {}
              }
              onChange={formik.handleChange('organizationType')}
            >
              {organizationTypes.map((item, idx) => (
                <option key={idx} value={item}>
                  {item}
                </option>
              ))}
            </select>
            <div className='label-container'>
              <label
                htmlFor='organization-type'
                className='organization-type-label'
              >
                Organization Type
              </label>
              {formik.touched.organizationType &&
                formik.errors.organizationType && (
                  <span className='error'>
                    {formik.errors.organizationType}
                  </span>
                )}
            </div>
          </div>

          <div className='input-container'>
            <input
              type='password'
              name='organization password'
              id='organization-password'
              placeholder=''
              value={formik.values.organizationPassword}
              style={
                formik.touched.organizationPassword &&
                formik.errors.organizationPassword
                  ? { borderColor: 'var(--Red)' }
                  : {}
              }
              onChange={formik.handleChange('organizationPassword')}
            />
            <div className='label-container'>
              <label
                htmlFor='organization-password'
                className='organization-password-label'
              >
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
        </div>
        <div className='form-content'>
          <h2>Confirm Passwords</h2>
          <div className='input-container'>
            <input
              type='password'
              name='leader password'
              id='confirm-leader-password'
              placeholder=''
              value={formik.values.confirmLeaderPassword}
              style={
                formik.touched.confirmLeaderPassword &&
                formik.errors.confirmLeaderPassword
                  ? { borderColor: 'var(--Red)' }
                  : {}
              }
              onChange={formik.handleChange('confirmLeaderPassword')}
            />
            <div className='label-container'>
              <label
                htmlFor='confirm-leader-password'
                className='password-label'
              >
                Leader Password
              </label>
              {formik.touched.confirmLeaderPassword &&
                formik.errors.confirmLeaderPassword && (
                  <span className='error'>
                    {formik.errors.confirmLeaderPassword}
                  </span>
                )}
            </div>
          </div>
          <div className='input-container'>
            <input
              type='password'
              name='organization password'
              id='confirm-organization-password'
              placeholder=''
              value={formik.values.confirmOrganizationPassword}
              style={
                formik.touched.confirmOrganizationPassword &&
                formik.errors.confirmOrganizationPassword
                  ? { borderColor: 'var(--Red)' }
                  : {}
              }
              onChange={formik.handleChange('confirmOrganizationPassword')}
            />
            <div className='label-container'>
              <label
                htmlFor='confirm-organization-password'
                className='organization-password-label'
              >
                Organization Password
              </label>
              {formik.touched.confirmOrganizationPassword &&
                formik.errors.confirmOrganizationPassword && (
                  <span className='error'>
                    {formik.errors.confirmOrganizationPassword}
                  </span>
                )}
            </div>
          </div>
        </div>
        <button type='submit' className='next-btn'>
          Create
        </button>
      </form>
    </div>
  );
};

export default CreateOrganizationPage;
