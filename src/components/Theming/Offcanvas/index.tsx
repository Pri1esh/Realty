import { IOffcanvas } from '@interfaces';
import classnames from 'classnames';
import { FC } from 'react';
import { Offcanvas as BSOffcanvas } from 'react-bootstrap';

const CSS_CLASSES = {
  ROOT: 'adl-offcanvas',
};

const Offcanvas: FC<IOffcanvas> = ({
  autoId,
  placement,
  title = null,
  header = null,
  showCanvas,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onHide = () => {},
  closeButton = true,
  children,
  footer = null,
  className = '',
  headerProps,
  titleProps,
  bodyProps,
  footerProps,
  bodySpacing = true,
  height = '',
  offCanvasAutoId,
  ...props
}) => {
  const cname = classnames(className, CSS_CLASSES.ROOT);
  return (
    <>
      <BSOffcanvas
        className={cname}
        show={showCanvas}
        onHide={() => {
          onHide();
        }}
        placement={placement || 'start'}
        {...props}
        style={{ height: `${height}%` }}
        data-auto-id={offCanvasAutoId?.wrapperAutoId || autoId}
      >
        {header && (
          <BSOffcanvas.Header closeButton={closeButton} {...headerProps} data-auto-id={offCanvasAutoId?.headerAutoId}>
            {header}
          </BSOffcanvas.Header>
        )}
        {title && (
          <BSOffcanvas.Header closeButton={closeButton} {...headerProps} data-auto-id={offCanvasAutoId?.titleAutoId}>
            <BSOffcanvas.Title {...titleProps}>{title}</BSOffcanvas.Title>
          </BSOffcanvas.Header>
        )}
        <BSOffcanvas.Body
          className={bodySpacing === false ? 'offcanvasNoSpace' : ''}
          {...bodyProps}
          data-auto-id={offCanvasAutoId?.childrenAutoId}
        >
          {children}
        </BSOffcanvas.Body>
        {footer && (
          <div className="offcanvas-footer" {...footerProps} data-auto-id={offCanvasAutoId?.footerAutoId}>
            {footer}
          </div>
        )}
      </BSOffcanvas>
    </>
  );
};

Offcanvas.defaultProps = {
  className: '',
  placement: 'start',
  showCanvas: true,
};

export default Offcanvas;
