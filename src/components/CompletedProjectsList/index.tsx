import { CustomImage } from '@components';
import { ICompletedProjectsList, ICompletedProjectsListItem } from '@interfaces';
import React from 'react';
import styles from './completedProjectsList.module.scss';

const CompletedProjectsList = (props: { list: ICompletedProjectsList[] }) => {
  const { list } = props;

  const ProjectsListItem = (props: { data: ICompletedProjectsListItem }) => {
    const { data } = props;
    return (
      <ul>
        <li>
          {data?.link ? (
            <a href={data?.link} target={data?.target}>
              <CustomImage itemProp="image" src={data?.imageSource} alt={data?.imageAlt} />
            </a>
          ) : (
            <CustomImage itemProp="image" src={data?.imageSource} alt={data?.imageAlt} />
          )}
        </li>
        <li>
          {data?.projectName && (
            <h3>
              {data?.link ? (
                <a href={data?.link} target={data?.target}>
                  {data?.projectName}
                </a>
              ) : (
                data?.projectName
              )}
            </h3>
          )}
          {data?.areaDesc && (
            <h4>
              <span>{data?.areaDesc}</span>
            </h4>
          )}
          {data?.projectArea && (
            <p>
              {data?.areaTitle} - <span>{data?.projectArea}</span>
            </p>
          )}
        </li>
      </ul>
    );
  };

  return (
    <div className={styles.projectList} itemScope itemType="https://schema.org/RealEstateListing">
      {list?.map((data, key: number) => (
        <div className={styles.wrapper} id={data?.projectID} key={`${data?.projectID + key}`}>
          {data?.data?.map((item, index: number) => (
            <div key={`${(item?.heading || '') + index}`}>
              {item?.heading && <h2>{item?.heading}</h2>}
              {item?.data?.map((data, key: number) => (
                <ProjectsListItem data={data} key={`${(data?.projectArea || '') + key}`} />
              ))}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default CompletedProjectsList;
