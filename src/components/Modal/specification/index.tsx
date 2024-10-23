import { SpecificationCard, VerticalTabs } from '@components';
import { IProjectDetailData, ISpecification } from '@interfaces';

const Specification = (props: ISpecification) => {
  const { projectDetails } = props;

  const getSpecificationData = () => {
    const specificationData: { content: JSX.Element; key: string; title: string }[] = [];
    Array.isArray(projectDetails) &&
      projectDetails?.map((items: IProjectDetailData, key: number) =>
        specificationData.push({
          content: <SpecificationCard items={items} key={`${(items?.tabHeading ?? '') + key}`} />,
          key: `${items?.tabHeading}`,
          title: `${items?.tabHeading}`,
        }),
      );
    return specificationData;
  };

  return (
    <>
      <div>
        <div itemProp="text" className="modal-title h4">
          {projectDetails[0]?.type}
        </div>
        {projectDetails?.length > 1 ? (
          <VerticalTabs
            className="scrollbar-x mb-4"
            horizontalTabView={true}
            isClick={true}
            defaultActiveKey={getSpecificationData()[0]?.title}
            tabData={getSpecificationData()}
            transition
          />
        ) : (
          <SpecificationCard items={projectDetails[0]} />
        )}
      </div>
    </>
  );
};
export default Specification;
