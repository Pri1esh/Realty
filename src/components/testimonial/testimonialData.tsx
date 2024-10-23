import { CustomImage } from '@components';
import { ITestimonialData } from '@interfaces';
import styles from './testimonial.module.scss';
const TestimonialData = (props: ITestimonialData) => {
  const { item } = props;
  const isVideoTestimonial = item?.isVideoTestimonial;
  if (isVideoTestimonial == 'true') {
    return (
      <div itemScope itemType="https://schema.org/VideoObject" className={styles.videotestimonial}>
        <div className={styles.videocontainer}>
          {props?.iframesrc && (
            <iframe
              sandbox="allow-scripts allow-same-origin"
              itemProp="contentUrl"
              className={styles.videocontainerframe}
              src={props?.iframesrc}
              frameBorder="0"
              title={item?.title || item?.propertylocation || 'Adani Realty'}
            />
          )}
          <meta itemProp="uploadDate" content={item?.uploadDate} />
          <meta itemProp="thumbnailUrl" content={item?.iframesrc} />
          <meta itemProp="description" content={item?.seoDescription} />
          <meta itemProp="name" content={item?.seoName} />
          <meta itemProp="contentUrl" content={item?.iframesrc} />
        </div>
      </div>
    );
  }
  {
    return (
      <div className={styles.testimonialBox} itemScope itemType="https://schema.org/MediaObject">
        <div className={styles.testimonialBoxinner}>
          <CustomImage
            itemProp="image"
            src={item?.useravtar ? item?.useravtar : ''}
            alt={item?.useravtaralt}
            title={item?.useravtartitle}
            className={styles.userthumb}
          />
          <h3 itemProp="headline">{item?.title}</h3>
          <p itemProp="about">{item?.description}</p>
          <p itemProp="publisher" className={styles.username}>
            {item?.author}
          </p>
          <p itemProp="text" className={styles.propertylocation}>
            {item?.propertylocation}
          </p>
        </div>
      </div>
    );
  }
};
export default TestimonialData;
