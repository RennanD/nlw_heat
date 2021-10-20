import { VscGithubInverted, VscSignOut } from 'react-icons/vsc';
import { useAuth } from '../../hooks/auth';
import styles from './styles.module.scss';

export function SendMessageForm(): JSX.Element {
  const { user, singOut } = useAuth();

  return (
    <div className={styles.sendMessageFormWrapper}>
      <button onClick={singOut} type="button" className={styles.signOutButton}>
        <VscSignOut size={32} />
      </button>
      <header className={styles.userInfo}>
        <div className={styles.userImage}>
          <img src="http://github.com/rennand.png" alt={user?.name} />
        </div>

        <strong className={styles.userName}>{user?.name}</strong>
        <span className={styles.userGithub}>
          <VscGithubInverted size={16} />
          {user?.login}
        </span>
      </header>

      <form className={styles.sendMessageForm}>
        <label htmlFor="message">Mensagem</label>
        <textarea
          name="message"
          id="message"
          placeholder="Qual sua expecitativa para o evento?"
        />

        <button type="submit">Enviar Mensagem</button>
      </form>
    </div>
  );
}
