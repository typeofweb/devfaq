import * as React from 'react';
import { connect } from 'react-redux';
import { getLoggedInUser } from '../../../../redux/selectors/selectors';
import { AppState } from '../../../../redux/reducers';
import ActiveLink from '../../../activeLink/ActiveLink';
import UserAvatar from '../../../userAvatar/UserAvatar';

type LoginStatusLinkProps = ReturnType<typeof mapStateToProps>;

const LoginStatusLinkComponent: React.FC<LoginStatusLinkProps & { onLoginClick?: () => any }> = ({
  user,
  onLoginClick,
  route,
}) => {
  if (user) {
    return <UserAvatar user={user} />;
  }

  const previousPath = route.asPath;

  return (
    <ActiveLink route="login" params={previousPath ? { previousPath } : {}}>
      <a onClick={onLoginClick}>Zaloguj</a>
    </ActiveLink>
  );
};

const mapStateToProps = (state: AppState) => {
  return {
    route: state.routeDetails.current,
    user: getLoggedInUser(state),
  };
};

const LoginStatusLink = connect(mapStateToProps)(LoginStatusLinkComponent);
export default LoginStatusLink;