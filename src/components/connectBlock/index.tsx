import { IConnectBlock, IConnectBlockData } from '@interfaces';
import { getIconFromIconName } from '@utils';
import styles from './connectBlock.module.scss';
const ConnectBlock = (props: IConnectBlock) => {
  const { data } = props;

  return (
    <div className={styles.connectus}>
      <div className={styles.connectmain}>
        <ul>
          {data[0]?.items?.map((item: IConnectBlockData, key: number) => (
            <div key={`${item.itemLink + key}`}>
              <li>
                <a href={item.itemLink}>
                  <span className={styles.icon}>{getIconFromIconName(item.itemLeftIcon)}</span>
                  <p>
                    <b>{item.itemText}</b>
                  </p>
                  <p>{item.itemSubText}</p>
                </a>
              </li>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ConnectBlock;
