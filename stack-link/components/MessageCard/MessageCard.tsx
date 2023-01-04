import styles from "./MessageCard.module.scss";

type MessageCardProps = {
  title?: string,
  messages?: string[],
  buttonOption?: {
    label: string,
    onClick: () => void,
  },
};

export default function MessageCard({title, messages, buttonOption}: MessageCardProps) {
  return (
    <div className={styles.MainMessageCard}>
      {title && (<h2 className={styles.Title}>{title}</h2>)}
      {
        messages && (<div className={styles.Messages}>
          {
            messages.map(message => (<p className={styles.Message}>{message}</p>))
          }
        </div>)
      }
      <div className={styles.ButtonArea}>
        {
          buttonOption && (
            <button className={styles.Button} onClick={buttonOption.onClick}>
              {buttonOption.label}
            </button>
          )
        }
      </div>
    </div>
  );
}