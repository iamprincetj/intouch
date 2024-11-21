import './OrganizationPage.css';
import { useQuery } from '@apollo/client';
import { FIND_ORGANIZATION_USERS } from '../../../queries';
import { useParams } from 'react-router-dom';
import { UserCardParam } from '../../../utils/types';
import { lazy } from 'react';
const OrganizationUserGridCard = lazy(
  () => import('./OrganizationUserGridCard/OrganizationUserGridCard')
);
const PeopleIcon = lazy(() => import('@mui/icons-material/People'));

const OrganizationPage = () => {
  const params = useParams();

  const { data } = useQuery(FIND_ORGANIZATION_USERS, {
    variables: { organizationId: params.id },
  });

  const usersInOrganization: UserCardParam[] = data
    ? data.allUsersInOrganization
    : null;
  return (
    <div className='organization-main-container'>
      <div className='extra-organization-info'>
        <div className='organization-members'>
          <PeopleIcon className='people-icon' />
          <span>{50} Members</span>
        </div>
        <div className='organization-display'>
          <div className='search-filter'>
            <input type='text' name='user name' id='user-name' />
          </div>
          <div className='role-filter'>
            <select name='user role' id='user-role'>
              <option value='leader'>leader</option>
              <option value='leader'>admin</option>
              <option value='leader'>user</option>
            </select>
          </div>
        </div>
      </div>
      <div className='organization-container'>
        {usersInOrganization &&
          usersInOrganization.map((item, idx) => (
            <OrganizationUserGridCard
              key={idx}
              firstName={item.firstName}
              lastName={item.lastName}
              role={item.role}
              createdAt={item.createdAt}
              phoneNumber={item.phoneNumber}
            />
          ))}
      </div>
    </div>
  );
};

export default OrganizationPage;
