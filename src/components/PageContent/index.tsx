import { IPageContent } from '@interfaces';
import styles from './PageContent.module.scss';
const PageContent = (props: IPageContent) => {
  const { descriptionData } = props;
  return (
    <div itemProp="mainEntityOfPage" itemScope itemType="https://schema.org/Article" className={styles.PageContent}>
      <div itemProp="articleBody" dangerouslySetInnerHTML={{ __html: descriptionData }} />
    </div>
  );
};

export default PageContent;
