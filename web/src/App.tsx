import { LoginBox } from './components/LoginBox';

import styles from './styles/app.module.scss';

import { MessagesList } from './components/MessagesList';
import { SendMessageForm } from './components/SendMessageForm';

import { useAuth } from './hooks/auth';

export function App() {
  const { user } = useAuth();

  return (
    <main
      className={`${styles.contentWrapper} ${user ? styles.contentSigned : ''}`}
    >
      <MessagesList />
      {user ? <SendMessageForm /> : <LoginBox />}
    </main>
  );
}
