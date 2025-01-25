import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks/use-app-selector';
import { getAuthorizationStatus } from '../../store/user/user-selectors';
import { AppRoute, AuthorizationStatus } from '../../consts';
import { PropsWithChildren } from 'react';

type PrivateRouteProps = PropsWithChildren<{
  redirectRoute: typeof AppRoute[keyof typeof AppRoute]['Path'];
  isLogin?: boolean;
}>


export default function PrivateRoute({redirectRoute, isLogin = false, children}: PrivateRouteProps) {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);

  if (!isLogin) {
    return (
      authorizationStatus === AuthorizationStatus.Auth
        ? children as JSX.Element
        : <Navigate to={ redirectRoute } />
    );
  }

  return (
    authorizationStatus === AuthorizationStatus.Auth
      ? <Navigate to={ redirectRoute }/>
      : children as JSX.Element
  );
}
