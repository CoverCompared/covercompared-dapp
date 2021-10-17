import React from 'react';
import { PDFViewer, PDFDownloadLink } from '@react-pdf/renderer';
import MSOReceipt from '../MSOReceipt';

const DownloadPolicy = (props) => {
  const { pdf, fileName } = props;

  return (
    <>
      <button
        type="button"
        className="py-3 px-5 mt-12 text-white font-Montserrat font-md rounded-2xl bg-gradient-to-r font-semibold from-primary-gd-1 to-primary-gd-2"
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
