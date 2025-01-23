import { CITIES, AppRoute } from '../../consts';
import { generateRandomNumber } from '../../utils';
import { login } from '../../store/api-actions';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import { useNavigate } from 'react-router-dom';
import { useRef } from 'react';
import { TabItem } from '../../components/tab-item/tab-item';


export default function LoginPage(): JSX.Element {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleFormSubmit = (evt: React.FormEvent) => {
    evt.preventDefault();

    if (emailRef.current !== null && passwordRef.current !== null) {
      dispatch(login({
        email: emailRef.current.value,
        password: passwordRef.current.value
      }))
        .then(({meta}) => {
          if (meta.requestStatus === 'fulfilled') {
            navigate(AppRoute.Main.Path);
          }
        });
    }
  };

  return (
    <main className="page__main page__main--login">
      <div className="page__login-container container">
        <section className="login">
          <h1 className="login__title">Sign in</h1>
          <form className="login__form form" action="#" method="post" onSubmit={ handleFormSubmit }>

            <div className="login__input-wrapper form__input-wrapper">
              <label className="visually-hidden">E-mail</label>
              <input
                className="login__input form__input"
                type="email"
                name="email"
                placeholder="Email"
                required
                ref={ emailRef }
              />
            </div>

            <div className="login__input-wrapper form__input-wrapper">
              <label className="visually-hidden">Password</label>
              <input
                className="login__input form__input"
                type="password"
                name="password"
                placeholder="Password"
                required
                pattern="^.*(?=.*[a-zA-Z])(?=.*\d).*$"
                title="Password must contain at least 1 letter and 1 number"
                ref={ passwordRef }
              />
            </div>

            <button className="login__submit form__submit button" type="submit">Sign in</button>
          </form>
        </section>

        <section className="locations locations--login locations--current">
          <TabItem city={ CITIES[generateRandomNumber(0, CITIES.length - 1)] } />
        </section>

      </div>
    </main>
  );
}
