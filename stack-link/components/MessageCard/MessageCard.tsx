import styles from "./MessageCard.module.scss";

type MessageCardProps = {
  title?: string,
  messages?: string[],
  buttonOption?: {
    label: string,
    onClick: () => void,
  },
  flippedDown?: boolean
};

export default function MessageCard({title, messages, buttonOption, flippedDown = false}: MessageCardProps) {
  const cardClasses = [styles.MessageCard];

  if (flippedDown) {
    cardClasses.push(styles.FlippedDown);
  }

  return (
    <div className={cardClasses.join(" ")}>
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