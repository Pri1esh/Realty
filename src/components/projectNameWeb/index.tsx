import { CustomClickAnchor, SectionHeader } from '@components';
import { IProjectNameWeb } from '@interfaces';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import styles from './projectNameWeb.module.scss';

const ProjectNameWeb = (props: IProjectNameWeb) => {
  const { projectNameData } = props;

  return (
    <div itemProp="about" className={styles.projectName}>
      <SectionHeader heading={projectNameData?.title} h1={true} className="mb-0" />
      <p itemProp="description" className="pricedetail">
        <span>
          <u itemProp="sameAs">
            <CustomClickAnchor
              anchorText={projectNameData?.location}
              anchorLink={projectNameData?.projectLink}
              offset={175}
            />
          </u>
        </span>
        <small>&#8226;</small>

        {projectNameData?.priceLabel ? (
          <OverlayTrigger
            overlay={
              <Tooltip className={styles.tooltip}>
                <span>
                  {projectNameData?.priceLabel}
                  <br />
                  {projectNameData?.discountLabel}
                  <strong>{projectNameData?.discount}</strong>
                </span>
              </Tooltip>
            }
            placement="top"
          >
            <span itemProp="description" className={styles.priceTooltip}>
              {projectNameData?.priceStartingAt}{' '}
              <strong>
                {projectNameData?.Rs}
                {projectNameData?.price}
              </strong>{' '}
              <sup itemProp="text">{projectNameData?.sup}</sup> {projectNameData?.allInclusive}
            </span>
          </OverlayTrigger>
        ) : (
          projectNameData?.price && (
            <span className={styles.noCursor}>
              {projectNameData?.priceStartingAt}{' '}
              <strong>
                {projectNameData?.Rs}
                {projectNameData?.price}
              </strong>{' '}
              <sup>{projectNameData?.sup}</sup> {projectNameData?.allInclusive}
            </span>
          )
        )}
      </p>
    </div>
  );
};
export default ProjectNameWeb;
