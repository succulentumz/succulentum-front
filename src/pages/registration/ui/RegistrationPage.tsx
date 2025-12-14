import { isEmpty, isNotEmpty } from '@true-engineering/true-react-platform-helpers';
import { type FC } from 'react';
import { NavLink, useNavigate, useSearchParams } from 'react-router-dom';

import {
  CentredParagraph,
  CommonForm,
  type ICommonFormProps,
  PrettyInput,
} from '@/features/helpers';
import { type ILoginResponse, type IMe } from '@/shared/api';
import { setAccessToken } from '@/shared/global';

import useStyles from './RegistrationPage.styles';

const actionRegister = 'register';
const actionSignIn = 'signIn';

interface FormProps<T extends 'register' | 'login'>
  extends Omit<ICommonFormProps<T, never>, 'children' | 'onDeleteSubmit' | 'deleteRequestData'> {
  onSubmit?: T extends 'login' ? never : (isError: boolean, result: ILoginResponse) => void;
}

export const RegistrationPage: FC = () => {
  const classes = useStyles();

  const navigate = useNavigate();

  const [params, setParams] = useSearchParams();
  const action = params.get('a');

  const registering = isEmpty(action) || action !== actionSignIn;

  const onSubmit = (result?: ILoginResponse | IMe) => {
    if (isNotEmpty(result) && 'token' in result) {
      setAccessToken(result.token);
      navigate('/collection');
    }
  };

  const props: FormProps<'register' | 'login'> = registering
    ? {
        commonKey: 'register',
        defaultRequestData: { username: '', email: '', password: '' },
        submitButtonText: 'Зарегистрироваться',
      }
    : {
        commonKey: 'login',
        defaultRequestData: { username: '', email: '', password: '' },
        submitButtonText: 'Войти',
      };

  return (
    <div className={classes.registrationPage}>
      <h1>{registering ? 'Регистрация' : 'Вход'}</h1>
      <CommonForm
        formStyle={{ className: classes.content }}
        submitStyle={{ className: classes.submitButton }}
        onCommonSubmit={onSubmit}
        {...props}
        deleteRequestData={undefined}
      >
        {(handler, form) => (
          <>
            <PrettyInput
              type="text"
              placeholder="username"
              value={form.username}
              name="username"
              onChange={handler}
            />
            {registering && (
              <PrettyInput
                type="email"
                placeholder="Email"
                // @ts-ignore
                value={form.email}
                name="email"
                onChange={handler}
              />
            )}
            <PrettyInput
              type="password"
              placeholder="Пароль"
              value={form.password}
              name="password"
              onChange={handler}
            />
          </>
        )}
      </CommonForm>
      <CentredParagraph className={classes.smallText}>
        {registering ? (
          <>
            Уже зарегистрированы? <NavLink to={`/login?a=${actionSignIn}`}>Войти</NavLink>
          </>
        ) : (
          <>
            Впервые здесь? <NavLink to={`/login?a=${actionRegister}`}>Зарегистрироваться</NavLink>
          </>
        )}
      </CentredParagraph>
    </div>
  );
};
