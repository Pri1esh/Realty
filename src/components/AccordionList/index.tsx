import { IAccordionList } from '@interfaces';
import { FC } from 'react';
import { Accordion } from 'react-bootstrap';
import AccordionItem from './AccordionItem';

const AccordionList: FC<IAccordionList> = ({
  list = [],
  activeIndex,
  buttonAt,
  className = '',
  htmlRequired = false,
  schemaProps = {},
}) => {
  const buttonPosition = buttonAt;
  const accordionListArr = [];
  for (let index = 0; index < list?.length; index++) {
    if (Number(buttonPosition) === index + 1) {
      accordionListArr.push(
        <>
          <AccordionItem
            title={list[index]?.title}
            body={list[index]?.body}
            titleAutoId={list[index]?.titleAutoId}
            bodyAutoId={list[index]?.bodyAutoId}
            index={index}
            key={index}
            htmlRequired={htmlRequired}
            schemaProps={schemaProps}
          />
        </>,
      );
    } else {
      accordionListArr.push(
        <AccordionItem
          title={list[index]?.title}
          body={list[index]?.body}
          titleAutoId={list[index]?.titleAutoId}
          bodyAutoId={list[index]?.bodyAutoId}
          index={index}
          key={index}
          htmlRequired={htmlRequired}
          schemaProps={schemaProps}
        />,
      );
    }
  }
  return (
    <>
      <Accordion defaultActiveKey={activeIndex} className={className} flush>
        {accordionListArr}
      </Accordion>
    </>
  );
};

export default AccordionList;
