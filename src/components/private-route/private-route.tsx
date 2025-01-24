import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks/use-app-selector';
import { getAuthorizationStatus } from '../../store/user/user-selectors';
import { AppRoute, AuthorizationStatus } from '../../consts';
import { PropsWithChildren } from 'react';

type PrivateRouteProps = PropsWithChildren<{
  redirectRoute: typeof AppRoute[keyof typeof AppRoute]['Path'];
}>


export default function PrivateRoute({redirectRoute, children}: PrivateRouteProps) {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);

  return (
    authorizationStatus === AuthorizationStatus.Auth
      ? children as JSX.Element
      : <Navigate to={ redirectRoute } />
  );
}
