import { CustomClickAnchor, SectionHeader } from '@components';
import { IProjectNameMobile } from '@interfaces';
import styles from './projectNameMobile.module.scss';

const ProjectNameMobile = (props: IProjectNameMobile) => {
  const { projectNameData } = props;

  return (
    <div itemProp="description" className={styles.projectName}>
      <SectionHeader heading={projectNameData?.title} h1={true} className="mb-0" />
      <p itemProp="potentialAction" className="">
        <CustomClickAnchor
          anchorText={projectNameData?.location}
          anchorLink={projectNameData?.projectLink}
          offset={100}
        />
        {projectNameData?.priceStartingAt && (
          <span itemProp="identifier">
            {projectNameData?.priceStartingAt}{' '}
            <strong itemProp="text">
              {projectNameData?.Rs}
              {projectNameData?.price}
            </strong>{' '}
            <sup itemProp="text">{projectNameData?.sup}</sup> {projectNameData?.allInclusive}
          </span>
        )}
      </p>
    </div>
  );
};
export default ProjectNameMobile;
