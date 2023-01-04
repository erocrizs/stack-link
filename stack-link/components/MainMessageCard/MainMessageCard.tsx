import styles from "./MainMessageCard.module.scss";

type MainMessageCardProps = {
  title?: string,
  messages?: string[],
  buttonOption?: {
    label: string,
    onClick: () => void,
  },
};

export default function MainMessageCard({title, messages, buttonOption}: MainMessageCardProps) {
  return (
    <div className={styles.MainMessageCard}>
      {title && (<h1 className={styles.Title}>{title}</h1>)}
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