import React from 'react';

import styles from './styles.module.scss';

import logoImage from '../../assets/logo.svg';

export function MessagesList(): JSX.Element {
  return (
    <div className={styles.messagesListWrapper}>
      <img src={logoImage} alt="DoWhile 2021" />

      <ul className={styles.messageList}>
        <li className={styles.message}>
          <p className={styles.messageContent}>
            Não vejo a hora de começar esse evento,
            com certeza vai ser o melhor de todos os tempos, vamooo pra cima! 🔥🔥
          </p>
          <div className={styles.messageUser}>
            <div className={styles.userImage}>
              <img src="https://github.com/rennand.png" alt="Rennan Douglas" />
            </div>
            <span>Rennan Douglas</span>
          </div>
        </li>

        <li className={styles.message}>
          <p className={styles.messageContent}>
            Não vejo a hora de começar esse evento,
            com certeza vai ser o melhor de todos os tempos, vamooo pra cima! 🔥🔥
          </p>
          <div className={styles.messageUser}>
            <div className={styles.userImage}>
              <img src="https://github.com/rennand.png" alt="Rennan Douglas" />
            </div>
            <span>Rennan Douglas</span>
          </div>
        </li>

        <li className={styles.message}>
          <p className={styles.messageContent}>
            Não vejo a hora de começar esse evento,
            com certeza vai ser o melhor de todos os tempos, vamooo pra cima! 🔥🔥
          </p>
          <div className={styles.messageUser}>
            <div className={styles.userImage}>
              <img src="https://github.com/rennand.png" alt="Rennan Douglas" />
            </div>
            <span>Rennan Douglas</span>
          </div>
        </li>

      </ul>
    </div>
  );
}
