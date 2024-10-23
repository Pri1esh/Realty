import { CustomImage, SectionHeader } from '@components';
import { IDrawResult } from '@interfaces';
import { useDeviceType } from '@utils';
import styles from './drawResult.module.scss';

const DrawResult = (props: IDrawResult) => {
  const { drawResultData, id } = props;
  const { deviceType } = useDeviceType();

  const getImageSource = () => {
    switch (deviceType) {
      case 'mobile':
        return drawResultData?.imageSourceMobile ?? drawResultData?.imageSource ?? '';
      case 'tablet':
        return drawResultData?.imageSourceTablet ?? drawResultData?.imageSource ?? '';
      default:
        return drawResultData?.imageSource ?? '';
    }
  };

  return (
    <div className={styles.draw} id={id}>
      <SectionHeader itemProp="headline" heading={drawResultData?.heading} />
      {drawResultData?.imageSource && <CustomImage src={getImageSource()} alt={drawResultData?.imgAlt} />}
    </div>
  );
};

export default DrawResult;
