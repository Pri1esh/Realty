import { IBreadcrumbs } from '@interfaces';
import { useDeviceType } from '@utils';
import { FC } from 'react';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import BreadcrumbItem from './BreadcrumbItem';

const Breadcrumbs: FC<IBreadcrumbs> = ({
  list = [],
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onItemClick = () => {},
  className = '',
  itemProps,
  showOnMobile = false,
  isLoading = false,
}) => {
  const wrappershimer = isLoading ? 'blank-holder' : '';
  const elementShimmer = isLoading ? 'blank' : '';
  const { deviceType } = useDeviceType();
  return (
    <>
      {deviceType === 'desktop' || showOnMobile ? (
        <Breadcrumb
          itemScope
          itemType="https://schema.org/BreadcrumbList"
          className={`${className} ${wrappershimer}`}
          auto-id="data_breadcrumb"
        >
          {list.map((item: any, index: number) => (
            <BreadcrumbItem
              itemProp="itemListElement"
              itemScope
              itemType="https://schema.org/ListItem"
              key={`${item.href + index}`}
              active={item.active}
              href={item.href}
              onClick={() => onItemClick(item)}
              linkProps={{ itemProp: 'item', ...item.linkProps }}
              elementshimmer={elementShimmer}
              {...itemProps}
            >
              <span itemProp="name">{item.label}</span>
              <meta itemProp="position" content={`${index + 1}`} />
            </BreadcrumbItem>
          ))}
        </Breadcrumb>
      ) : (
        <></>
      )}
    </>
  );
};

export default Breadcrumbs;
