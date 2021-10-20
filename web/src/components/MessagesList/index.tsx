import { useEffect, useState } from 'react';

import io from 'socket.io-client';

import styles from './styles.module.scss';

import logoImage from '../../assets/logo.svg';
import { api } from '../../services/api';

type MessageData = {
  id: string;
  content: string;
  user: {
    name: string;
    avatar_url: string;
  };
};

type AxiosResponse = {
  messages: MessageData[];
};

const socket = io('http://localhost:4000');

const messagesQueue: MessageData[] = [];

socket.on('new_message', (newMessage: MessageData) => {
  messagesQueue.push(newMessage);
});

export function MessagesList(): JSX.Element {
  const [messages, setMessages] = useState<MessageData[]>([]);

  useEffect(() => {
    api.get<AxiosResponse>('/messages').then(response => {
      setMessages(response.data.messages);
    });
  }, []);

  useEffect(() => {
    setInterval(() => {
      if (messagesQueue.length) {
        setMessages(oldState =>
          [messagesQueue[0], oldState[0], oldState[1]].filter(Boolean),
        );
        messagesQueue.shift();
      }
    }, 3000);
  }, []);

  return (
    <div className={styles.messagesListWrapper}>
      <img src={logoImage} alt="DoWhile 2021" />

      <ul className={styles.messageList}>
        {messages.map(message => (
          <li key={message.id} className={styles.message}>
            <p className={styles.messageContent}>{message.content}</p>
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
