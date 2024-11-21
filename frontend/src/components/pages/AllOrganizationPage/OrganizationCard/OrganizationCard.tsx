import { OrganizationCardParam } from '../../../../utils/types';
import './OrganizationCard.css';
const girlPic = 'src/assets/images/girl-in-space.png';
const locationImage = 'src/assets/images/place-0.jpg';

const OrganizationCard = ({
  organizationName,
  organizationLocation,
  organizationLeaderName,
  organizationCreatedDate,
  organizationMembersNumber,
  organizationType,
}: OrganizationCardParam) => {
  const splitOrganizationName = organizationName.split(' ');
  return (
    <div
      className='organization-card-container'
      style={{ backgroundImage: `url(${girlPic})` }}
    >
      <div className='organization-card-content'>
        <div className='card-content-header'>
          <h3 className='organization-type'>{organizationType}</h3>
          <div className='organization-img'>
            <h4>
              {splitOrganizationName[0].at(0)}{splitOrganizationName[1].at(0)}
            </h4>
          </div>
        </div>
        <div className='card-content-footer'>
          <div className='inner-card-content'>
            <h4 className='organization-name'>{organizationName}</h4>
            <p className='organization-leader'>
              Leader: {organizationLeaderName}
            </p>

            <p className='organization-create-date'>
              {organizationCreatedDate}
            </p>

            <div className='organization-location'>
              <div className='organization-location-inner'>
                <img
                  src={locationImage}
                  alt={`${organizationName} location image`}
                />
                <p>{organizationLocation}</p>
              </div>
            </div>
            <div className='members-container'>
              <div className='members-img'>
                <div className='member-img'>
                  <h5>TM</h5>
                </div>
                <div className='member-img'>
                  <h5>TM</h5>
                </div>
                <div className='member-img'>
                  <h5>TM</h5>
                </div>
              </div>
              <p className='members-number'>
                <span>{organizationMembersNumber} members</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrganizationCard;
