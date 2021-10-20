import { useEffect } from 'react';
import { VscGithubInverted } from 'react-icons/vsc';

import styles from './styles.module.scss';

import { api } from '../../services/api';

type AxiosResponse = {
  result: {
    token: string;
    user: {
      id: string
      name: string;
      avatar_url: string;
      login: string
    }
  }
}

export function LoginBox(): JSX.Element {
  const signInUrl = 'https://github.com/login/oauth/authorize?scope=user&client_id=b224abb3597bc5eeb277&redirect_uri=http://localhost:3000';

  async function singIn(github_code: string) {
    const response = await api.post<AxiosResponse>('/signin/authenticate', {
      code: github_code,
    });

    const { token, user } = response.data.result;

    localStorage.setItem('@nlw_heat:token', token);

    console.log(user);
  }

  useEffect(() => {
    const url = window.location.href;
    const hasGithubCode = url.includes('?code=');

    if (hasGithubCode) {
      const [urlWithouCode, code] = url.split('?code=');

      singIn(code);

      window.history.pushState({}, '', urlWithouCode);
    }
  }, []);

  return (
    <div className={styles.loginBoxWrapper}>
      <strong>Entre e compartilhe sua mensagem</strong>
      <a href={signInUrl} className={styles.signInGithub}>
        <VscGithubInverted size={24} />
        Entrar com Github
      </a>
    </div>
  );
}
