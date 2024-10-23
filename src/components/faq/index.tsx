import { AccordionList, SectionHeader } from '@components';
import { IFaq, IOptions } from '@interfaces';
import styles from './faq.module.scss';

const Faq = (props: IFaq) => {
  const { faqs = [], heading = 'Frequently Asked Questions', seeall = 'See All', seeallLink = '#' } = props;

  const options: IOptions[] = faqs?.map((item: IOptions) => {
    return {
      title: item.title,
      body: <div itemProp="text" dangerouslySetInnerHTML={{ __html: item.body }}></div>,
    };
  });

  return (
    <div itemScope itemType="https://schema.org/FAQPage" className={styles.faqSection}>
      <SectionHeader itemProp="headline" heading={heading} />
      {options?.length > 0 && <AccordionList list={options} />}
      <p className="mt-4">
        <a itemProp="url" href={seeallLink} className="black_link">
          {seeall}
        </a>
      </p>
    </div>
  );
};

export default Faq;
