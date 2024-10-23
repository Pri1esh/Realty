import { CustomImage } from '@components';
import { IMoreArticles, IMoreArticlesList } from '@interfaces';
import { getIconFromIconName } from '@utils';
import { Figure } from 'react-bootstrap';
import styles from './moreArticles.module.scss';
const MoreArticles = (props: IMoreArticlesList) => {
  const { data } = props;
  return (
    <div className={styles.morearticles}>
      <div className={styles.articlesrow}>
        {data?.map((currData: IMoreArticles, key: number) => (
          <div className={styles.articlescol} data-type={currData?.articleType} key={`${currData?.articleLink + key}`}>
            <div className={styles.prearticle}>
              <a href={currData?.articleLink}>
                {getIconFromIconName(currData?.articleLinkIcon)}
                <span>{currData?.articleLinkTitle}</span>
              </a>
            </div>
            <div className={styles.morearticlescard}>
              <ul>
                <li>
                  <Figure>
                    <a href={`${currData?.articleLink}`} title={currData?.articleTitle}>
                      <CustomImage
                        src={currData?.articleThumb}
                        alt={currData?.articleThumbAlt}
                        title={currData?.articleThumbAlt}
                      />
                    </a>
                  </Figure>
                  <div>
                    <p>
                      <a href={`${currData?.articleLink}`}>
                        <b>{currData?.articleTitle}</b>
                      </a>
                    </p>
                    <p dangerouslySetInnerHTML={{ __html: currData?.articleDescription }}></p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default MoreArticles;
