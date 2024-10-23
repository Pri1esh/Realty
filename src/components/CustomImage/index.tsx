import { ICustomImage } from '@interfaces';
import { customLoader } from '@utils';
import Image from 'next/image';

const CustomImage = (props: ICustomImage) => {
  const { lazy = true, src = '', alt = '', priority = false, width = 1, height = 1 } = props;
  return props?.type === 'nextImg' ? (
    <Image
      {...props}
      loading={lazy && !priority ? 'lazy' : 'eager'}
      loader={() => customLoader(src)}
      alt={alt}
      width={width}
      height={height}
    />
  ) : (
    <img {...props} loading={lazy && !priority ? 'lazy' : 'eager'} src={src} alt={alt} />
  );
};

export default CustomImage;
