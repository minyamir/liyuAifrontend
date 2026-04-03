import React from 'react';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';

import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

const LessonViewer = ({ url }) => {
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  return (
    // h-full here is critical
    <div className="h-full w-full bg-slate-100 overflow-hidden">
      <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
        {/* We use a style object here because sometimes Tailwind's h-full 
            gets collapsed by the flex parent */}
        <div style={{ height: '100%', width: '100%' }}>
          <Viewer
            fileUrl={url}
            plugins={[defaultLayoutPluginInstance]}
            theme="light"
            key={url} // CRITICAL: Forces re-render when switching to "Extreme" books
          />
        </div>
      </Worker>
    </div>
  );
};

export default LessonViewer;