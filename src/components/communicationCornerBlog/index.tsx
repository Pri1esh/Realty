import { Button } from '@components';
import { ICommunicationCornerBlog, ICommunicationCornerBlogData } from '@interfaces';
import { getIconFromIconName } from '@utils';
import styles from './communicationCornerBlog.module.scss';

const CommunicationCornerBlog = (props: ICommunicationCornerBlog) => {
  const { data } = props;
  
  const replaceBaseUrl = (htmlString:string) => {
    // Define the base URL you want to replace
    const baseUrl = 'https://www.uat.adanirealty.com/';
    
    // Replace all occurrences of the base URL with '/'
    const replacedHtml = htmlString.replace(new RegExp(baseUrl, 'g'), '/');
    
    return replacedHtml;
  };


  return (
    <div className={styles.articlecontentblock}>
      <div className={styles.contentblock}>
        {/* <SectionHeader heading={data?.heading} /> */}
        <div dangerouslySetInnerHTML={{ __html: replaceBaseUrl(data?.description) }} />
        {data?.quote && (
          <div className={styles.blogquote}>
            <p>
              {getIconFromIconName('QuotationBlog')}
              <p dangerouslySetInnerHTML={{ __html: data?.quote }}></p>
            </p>
          </div>
        )}
        <div className={styles.blogcategory}>
          {data?.category?.map((itemCategory: ICommunicationCornerBlogData, key: number) => (
            <Button href={itemCategory?.categorylink} key={`${itemCategory?.categorylink + key}`}>
              {itemCategory?.categorytitle}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};
export default CommunicationCornerBlog;
