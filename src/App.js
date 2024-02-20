import { useResizeObserver } from '@wojtekmaj/react-hooks';
import jsPDF from 'jspdf';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url,
).toString();

const options = {
  cMapUrl: '/cmaps/',
  standardFontDataUrl: '/standard_fonts/',
};

const initialScale = 1.5; // Initial scale for the PDF pages
const minScale = 0.5; // Minimum scale for zoom-out
const maxScale = 3; // Maximum scale for zoom-in

const maxWidth = 800;

export default function App() {
  const [file, setFile] = useState(null);
  const [numPages, setNumPages] = useState();
  const [containerRef, setContainerRef] = useState(null);
  const [containerWidth, setContainerWidth] = useState();
  const [isDrawing, setIsDrawing] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(initialScale); // State for zoom level
  const canvasRef = useRef(null);
  const pdfContainerRef = useRef(null);

  const onResize = useCallback((entries) => {
    const [entry] = entries;

    if (entry) {
      setContainerWidth(entry.contentRect.width);
    }
  }, []);

  useResizeObserver(containerRef, {}, onResize);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');

    context.clearRect(0, 0, canvas.width, canvas.height);

    if (file) {
      const fileReader = new FileReader();
      fileReader.onload = async function () {
        const typedArray = new Uint8Array(this.result);
        const pdf = await pdfjs.getDocument({ data: typedArray }).promise;
        setNumPages(pdf.numPages);

        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const viewport = page.getViewport({ scale: zoomLevel }); // Use current zoom level
          canvas.width = viewport.width;
          canvas.height = viewport.height;
          const renderContext = {
            canvasContext: context,
            viewport: viewport,
          };
          await page.render(renderContext).promise;
          drawOnPdfCanvas(page, canvas);
        }
      };
      fileReader.readAsArrayBuffer(file);
    }
  }, [file, zoomLevel]); // Re-render on file change or zoom level change

  function drawOnPdfCanvas(page, canvas) {
    const context = canvas.getContext('2d');
    const pdfContainer = pdfContainerRef.current;
    const rect = pdfContainer.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const scale = Math.min(scaleX, scaleY);

    context.save();
    context.scale(scale, scale);
    context.translate(-rect.left, -rect.top);

    // Draw on the PDF canvas here
    // Example:
    if (isDrawing) {
      // Your drawing logic here
    }

    context.restore();
  }

  function onFileChange(event) {
    const { files } = event.target;
    if (files && files[0]) {
      setFile(files[0]);
    }
  }

  function startDrawing(event) {
    setIsDrawing(true);
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    context.beginPath();
    context.moveTo(x, y);
  }

  function draw(event) {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    context.lineTo(x, y);
    context.stroke();
  }

  function endDrawing() {
    setIsDrawing(false);
  }

  // Function to handle zoom-in
  function zoomIn() {
    if (zoomLevel < maxScale) {
      setZoomLevel(zoomLevel + 0.5); // Increase zoom level
    }
  }

  // Function to handle zoom-out
  function zoomOut() {
    if (zoomLevel > minScale) {
      setZoomLevel(zoomLevel - 0.5); // Decrease zoom level
    }
  }

  // Function to download the PDF
  function downloadPDF() {
    const canvas = canvasRef.current;
    const pdf = new jsPDF('p', 'pt', 'a2');
  
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
  
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
  
    const aspectRatio = canvasWidth / canvasHeight;
    let imgWidth, imgHeight;
    
    if (aspectRatio > 1) { // Landscape orientation
      imgWidth = pdfWidth;
      imgHeight = pdfWidth / aspectRatio;
    } else { // Portrait orientation
      imgHeight = pdfHeight;
      imgWidth = pdfHeight * aspectRatio;
    }
  
    pdf.addImage(canvas.toDataURL('image/jpeg', 1.0), 'JPEG', 0, 0, imgWidth, imgHeight);
    
    pdf.save('modified_pdf.pdf');
  }

  return (
    <div className="Example">
      <header>
        <h1>react-pdf sample page</h1>
      </header>
      <div className="Example__container">
        <div className="Example__container__load">
          <label htmlFor="file">Load from file:</label>{' '}
          <input onChange={onFileChange} type="file" />
          <button onClick={zoomIn}>Zoom In</button> 
          <button onClick={zoomOut}>Zoom Out</button> 
          <button onClick={downloadPDF}>Download PDF</button> 
        </div>
        <div className="Example__container__document" ref={setContainerRef}>
          <div ref={pdfContainerRef}>
            <canvas
              ref={canvasRef}
              style={{ display: 'block', maxWidth: '100%' }}
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={endDrawing}
              onMouseOut={endDrawing}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
