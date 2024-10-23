import { IblogDisclaimer } from '@interfaces';
import styles from './blogDisclaimer.module.scss';
const BlogDisclaimer = (props: IblogDisclaimer) => {
  const { blogData } = props;
  return (
    <div className={styles.blogDisclaimer}>
      <h3>{blogData?.title}</h3>
      <p dangerouslySetInnerHTML={{ __html: blogData?.disclaimer }}></p>
    </div>
  );
};

export default BlogDisclaimer;
