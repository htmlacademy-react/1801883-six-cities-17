import { useSelector, TypedUseSelectorHook } from 'react-redux';
import { store } from '../store/store';


type State = ReturnType<typeof store.getState>;

export const useAppSelector: TypedUseSelectorHook<State> = useSelector;
