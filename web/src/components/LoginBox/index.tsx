import { VscGithubInverted } from 'react-icons/vsc';

import styles from './styles.module.scss';

import { useAuth } from '../../hooks/auth';

export function LoginBox(): JSX.Element {
  const { signInUrl, user } = useAuth();

  console.log(user);

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
