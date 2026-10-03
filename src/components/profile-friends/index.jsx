import './style.css';
import { getFriendsListData } from '../../services/profile';
import { useQuery } from '@tanstack/react-query';

export const ProfileFriends = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['friends'],
    queryFn: getFriendsListData,
  });

  if (isLoading)
    return (
      <section id="profile-friends">
        <div className="content-card fade-in">
          <h2 className="page-heading-2">Friends</h2>
          <ul className="profile-friends-list">
            <li className="profile-list-item">
              <div className="profile-list-item-avatar loading"></div>
              <div className="profile-list-item-info">
                <div className="skeleton-block skeleton-block--half loading"></div>
                <div className="skeleton-block--quarter loading"></div>
              </div>
            </li>
            <li className="profile-list-item">
              <div className="profile-list-item-avatar loading"></div>
              <div className="profile-list-item-info">
                <div className="skeleton-block skeleton-block--half loading"></div>
                <div className="skeleton-block--quarter loading"></div>
              </div>
            </li>
            <li className="profile-list-item">
              <div className="profile-list-item-avatar loading"></div>
              <div className="profile-list-item-info">
                <div className="skeleton-block skeleton-block--half loading"></div>
                <div className="skeleton-block--quarter loading"></div>
              </div>
            </li>
            <li className="profile-list-item">
              <div className="profile-list-item-avatar loading"></div>
              <div className="profile-list-item-info">
                <div className="skeleton-block skeleton-block--half loading"></div>
                <div className="skeleton-block--quarter loading"></div>
              </div>
            </li>
          </ul>
        </div>
      </section>
    );

  const { friends } = data;

  const sortedFriends = [...friends].sort((a, b) => {
    if (a.topFriend === true && b.topFriend !== true) return -1;
    if (a.topFriend !== true && b.topFriend === true) return 1;

    const lastNameA = a.name.trim().split(' ').pop();
    const lastNameB = b.name.trim().split(' ').pop();

    return lastNameA.localeCompare(lastNameB);
});

  return (
    <section id="profile-friends">
      <div className="content-card fade-in">
        <h2 className="page-heading-2">Friends</h2>
        <ul className="profile-friends-list">
          {sortedFriends.map((friend, index) => (
            <li className="profile-list-item fade-in" key={index}>
              <div className="profile-list-item-avatar-wrapper">
                <div
                  className="profile-list-item-avatar"
                  aria-label={friend.name}
                >
                    {friend.name
                      .split(' ')
                      .map(name => name[0])
                      .join('')}
                </div>

                {friend.topFriend && (
                  <span className="top-friend-flag">★</span>
                )}
              </div>
              <div className="profile-list-item-info">
                <p className="page-paragraph">{friend.name}</p>
                <p className="page-micro">
                  {friend.jobTitle} @ {friend.companyName}
                </p>
                {/* <pre>{JSON.stringify(friend)}</pre> */}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
