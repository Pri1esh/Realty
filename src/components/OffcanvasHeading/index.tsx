import styles from './offcanvasHeading.module.scss';

const OffcanvasHeading = (props: any) => {
  return (
    <h2 className={styles.heading} {...props}>
      {props.children}
    </h2>
  );
};
export default OffcanvasHeading;
