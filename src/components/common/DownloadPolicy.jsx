import React from 'react';
import { PDFViewer, PDFDownloadLink } from '@react-pdf/renderer';

const DownloadPolicy = (props) => {
  const { pdf, fileName } = props;

  return (
    <>
      <button
        type="button"
        className="py-3 md:px-5 px-4 text-white font-Montserrat md:text-body-md text-body-sm md:rounded-2xl rounded-xl bg-gradient-to-r font-semibold from-primary-gd-1 to-primary-gd-2"
      >
        <PDFDownloadLink document={pdf} fileName={fileName}>
          {({ blob, url, loading, error }) =>
            loading ? 'Loading document...' : 'Download Policy Receipt'
          }
        </PDFDownloadLink>
      </button>
    </>
  );
};
export default DownloadPolicy;
