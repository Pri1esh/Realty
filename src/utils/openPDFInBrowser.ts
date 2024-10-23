const openPDFInBrowser = (pdfUrl: string) => {
  fetch(pdfUrl)
    .then((response) => response.blob())
    .then((blob) => {
      const blobUrl = URL.createObjectURL(blob);
      window.open(blobUrl, '_blank');
    });
};

export default openPDFInBrowser;
