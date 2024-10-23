import { IContactData } from '@interfaces';
import styles from './ContactData.module.scss';
const ContactData = (props: IContactData) => {
  const { staticText } = props;
  return (
    <div className={styles.contactData}>
      <div dangerouslySetInnerHTML={{ __html: staticText }} itemProp="description" />
    </div>
  );
};
export default ContactData;
