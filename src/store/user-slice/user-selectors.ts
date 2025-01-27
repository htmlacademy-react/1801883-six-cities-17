import { SliceName } from '../consts';
import { State } from '../../hooks/use-app-selector';
import { createSelector } from '@reduxjs/toolkit';

const getUserState = (state: State) => state[SliceName.User];

const getAuthorizationStatus = createSelector(
  getUserState,
  (user) => user.authorizationStatus
);

const getUser = createSelector(
  getUserState,
  (user) => user.user.data
);

export { getAuthorizationStatus, getUser };
