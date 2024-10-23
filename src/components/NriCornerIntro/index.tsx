import { INriCornerIntro } from '@interfaces';
import styles from './NriCornerIntro.module.scss';

const NriCornerIntro = (props: INriCornerIntro) => {
  const { data } = props;

  return (
    <>
      <div className={styles.sectionNricorner}>
        <h2 itemProp="headline">{data?.title}</h2>
        <div dangerouslySetInnerHTML={{ __html: data?.pageData }} itemProp="description" />
      </div>
    </>
  );
};

export default NriCornerIntro;
