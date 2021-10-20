import { useEffect, useState } from 'react';

import styles from './styles.module.scss';

import logoImage from '../../assets/logo.svg';
import { api } from '../../services/api';

type MessageData = {
  id: string;
  content: string
  user: {
    name: string;
    avatar_url: string
  }
}

type AxiosResponse = {
  messages: MessageData[]
}

export function MessagesList(): JSX.Element {
  const [messages, setMessages] = useState<MessageData[]>([]);

  useEffect(() => {
    api.get<AxiosResponse>('/messages').then((response) => {
      setMessages(response.data.messages);
    });
  }, []);

  return (
    <div className={styles.messagesListWrapper}>
      <img src={logoImage} alt="DoWhile 2021" />

      <ul className={styles.messageList}>
        {messages.map((message) => (
          <li key={message.id} className={styles.message}>
            <p className={styles.messageContent}>
              {message.content}
            </p>
            <div className={styles.messageUser}>
              <div className={styles.userImage}>
                <img src={message.user.avatar_url} alt={message.user.name} />
              </div>
              <span>{message.user.name}</span>
            </div>
          </li>
        ))}

      </ul>
    </div>
  );
}
