const downloadLink = (downloadLink: string) => {
  if (typeof document !== undefined) {
    const link = document.createElement('a');
    link.href = downloadLink;
    link.setAttribute('download', '');
    link.click();
  }
};

export default downloadLink;
