import { isEmpty, isNotEmpty } from '@true-engineering/true-react-platform-helpers';
import { type FC } from 'react';
import { NavLink, useNavigate, useSearchParams } from 'react-router-dom';

import {
  CentredParagraph,
  CommonForm,
  type ICommonFormProps,
  PrettyInput,
} from '@/features/helpers';
import { type IApiRequest, type ILoginResponse } from '@/shared/api';
import { addToaster } from '@/shared/global';

import useStyles from './RegistrationPage.styles';

const minPasswordLength = 4;

const actionRegister = 'register';
const actionSignIn = 'signIn';

type Form = IApiRequest<'register'> & IApiRequest<'login'>;

interface FormProps<T extends 'register' | 'login'>
  extends Omit<
    ICommonFormProps<T, never, Form>,
    'children' | 'onDeleteSubmit' | 'deleteRequestData'
  > {
  onSubmit?: T extends 'login' ? never : (isError: boolean, result: ILoginResponse) => void;
}

export const RegistrationPage: FC = () => {
  const classes = useStyles();

  const navigate = useNavigate();

  const [params, setParams] = useSearchParams();
  const action = params.get('a');

  const registering = isEmpty(action) || action !== actionSignIn;

  const props: FormProps<'register' | 'login'> = registering
    ? {
        commonKey: 'register',
        defaultRequestData: { username: '', email: '', password: '' },
        submitButtonText: 'Зарегистрироваться',
        formatter: (res) => {
          if (res.password.length < minPasswordLength) {
            addToaster({
              type: 'error',
              text: `Пароль должен состоять хотя бы из ${minPasswordLength} символов!`,
            });
            return undefined;
          }
          return res;
        },
        onCommonSubmit: (res) =>
          isNotEmpty(res) && setParams(new URLSearchParams({ a: actionSignIn })),
      }
    : {
        commonKey: 'login',
        defaultRequestData: { username: '', email: '', password: '' },
        submitButtonText: 'Войти',
        onCommonSubmit: (res) => isNotEmpty(res) && navigate('/collection'),
      };

  return (
    <div className={classes.registrationPage}>
      <h1>{registering ? 'Регистрация' : 'Вход'}</h1>
      <CommonForm<'register' | 'login', never, Form>
        formStyle={{ className: classes.content }}
        submitStyle={{ className: classes.submitButton }}
        {...props}
        deleteRequestData={undefined as never}
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
