import { IBreadcrumbItem } from '@interfaces';
import { FC } from 'react';
import { Breadcrumb } from 'react-bootstrap';

const BreadcrumbItem: FC<IBreadcrumbItem> = (props) => {
  const { className = '', children, elementshimmer = '' } = props;

  return (
    <Breadcrumb.Item className={`${className} ${elementshimmer}`} {...props}>
      {children}
    </Breadcrumb.Item>
  );
};

export default BreadcrumbItem;
