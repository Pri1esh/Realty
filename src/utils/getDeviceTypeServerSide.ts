const getDeviceTypeServerSide = (userAgent: any) => {
  let device = '';

  if (userAgent && userAgent !== '') {
    const isMobile = userAgent.match(
      /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i,
    );
    const isTablet = userAgent.match(
      /(ipad|tablet|(android(?!.*mobile))|(windows(?!.*phone)(.*touch))|kindle|playbook|silk|(puffin(?!.*(IP|AP|WP))))/i,
    );
    if (isMobile && isMobile?.length > 0) {
      device = 'mobile';
    } else if (isTablet && isTablet?.length > 0) {
      device = 'tablet';
    } else {
      device = 'desktop';
    }
  }
  return device;
};

export default getDeviceTypeServerSide;
