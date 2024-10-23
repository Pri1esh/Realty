import { IAccordionItem } from '@interfaces';
import { Accordion } from 'react-bootstrap';

const AccordionItem = (props: IAccordionItem) => {
  const {
    className = '',
    title = '',
    body = '',
    index = 0,
    eventKey,
    titleAutoId,
    bodyAutoId,
    headerProps,
    bodyProps,
    htmlRequired = false,
    schemaProps = {},
  } = props;

  return (
    <Accordion.Item
      itemScope
      itemProp="mainEntity"
      itemType="https://schema.org/Question"
      eventKey={eventKey ?? index}
      key={index}
      className={className}
    >
      <Accordion.Header itemProp="name" data-auto-id={titleAutoId} {...headerProps}>
        {title}
      </Accordion.Header>
      <Accordion.Body
        itemProp="acceptedAnswer"
        itemScope
        itemType="https://schema.org/Answer"
        data-auto-id={bodyAutoId}
        {...bodyProps}
      >
        <>{htmlRequired ? <div {...schemaProps} dangerouslySetInnerHTML={{ __html: body }} /> : body}</>
      </Accordion.Body>
    </Accordion.Item>
  );
};
export default AccordionItem;
