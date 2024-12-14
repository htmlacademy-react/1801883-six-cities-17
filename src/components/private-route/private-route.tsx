import { Navigate } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../consts';
import { PropsWithChildren } from 'react';

type PrivateRouteProps = PropsWithChildren<{
  authorizationStatus: typeof AuthorizationStatus[keyof typeof AuthorizationStatus];
  redirectRoute: typeof AppRoute[keyof typeof AppRoute]['Path'];
}>


export default function PrivateRoute({authorizationStatus, redirectRoute, children}: PrivateRouteProps) {
  return (
    authorizationStatus === AuthorizationStatus.Auth
      ? children as JSX.Element
      : <Navigate to={ redirectRoute } />
  );
}
