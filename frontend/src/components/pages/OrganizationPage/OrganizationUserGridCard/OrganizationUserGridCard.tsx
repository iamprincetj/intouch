import { UserCardParam } from '../../../../utils/types';
import './OrganizationUserGridCard.css';
import PhoneIcon from '@mui/icons-material/Phone';
import CalendarIcon from '@mui/icons-material/CalendarMonth';
import ProfileIcon from '@mui/icons-material/Person';

const OrganizationUserGridCard = ({
  firstName,
  lastName,
  role,
  createdAt,
  phoneNumber,
}: UserCardParam) => {
  const date = new Date(createdAt);
  return (
    <div className='user-card-container'>
      <div className='user-card-content'>
        <div className='user-card-inner'>
          <div className='user-profile'>
            <div className='user-profile-img'>
              <span
                className='role-indicator'
                style={
                  role === 'leader' || role === 'admin'
                    ? {
                        backgroundColor:
                          role === 'leader' ? 'var(--Green)' : 'var(--Blue)',
                      }
                    : { backgroundColor: 'var(--Red)' }
                }
              ></span>
              <h2>
                {firstName.at(0)}
                {lastName.at(0)}
              </h2>
            </div>
            <h3>
              {firstName} {lastName}
            </h3>
          </div>
          <div className='user-info'>
            <p className='user-phone-number'>
              <PhoneIcon className='phone-icon icon' />
              <span>{phoneNumber}</span>
            </p>
            <p className='user-added-date'>
              <CalendarIcon className='calendar-icon icon' />
              <span>
                {date.toLocaleDateString().replace('/', '-').replace('/', '-')}
              </span>
            </p>
            <p className='user-profile-name'>
              <ProfileIcon className='profile-icon icon' />
              <span>
                {firstName} {lastName}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrganizationUserGridCard;
