import React from 'react';
import Topbar from '../../components/topbar';
import './ViewGeneratedResume.css';
import Button from '@mui/material/Button';
import DownloadIcon from '@mui/icons-material/Download';

function ViewGeneratedResume () {

  const downloadPDF = async () => {
    try {
      const response = await fetch(pdfUrl);
      const blob = await response.blob();
      
      // Create a link element and click it to trigger the download
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = 'GeneratedResume.pdf';
      link.click();
    } 
    catch (error) {
      console.error('Error downloading PDF:', error);
    }
  }

  //Eventually will need to get the generated resume url from the backend, using test resume for now
  const pdfUrl = 'https://firebasestorage.googleapis.com/v0/b/personify-d333c.appspot.com/o/TestResume.pdf?alt=media&token=21685556-9090-40f1-8fe7-0e024f3141f3';

  //Still need a button to go back to GenerateResume page
  return (
    <div>
      <Topbar />
      <iframe className='pdfViewer' title="PDF Viewer" src={pdfUrl} width="50%" height="400px" />
      <div className="buttons">
        <Button variant="contained" startIcon={<DownloadIcon />} onClick={downloadPDF}>Download PDF</Button>
        <Button variant="contained" color="success" startIcon={<DownloadIcon />}>Download LaTeX</Button>
      </div>
    </div>
  );
};

export default ViewGeneratedResume;
