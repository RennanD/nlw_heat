import { LoginBox } from './components/LoginBox';
import { MessagesList } from './components/MessagesList';
import styles from './styles/app.module.scss';

export function App() {
  return (
    <main className={styles.contentWrapper}>
      <MessagesList />
      <LoginBox />
    </main>
  );
}
