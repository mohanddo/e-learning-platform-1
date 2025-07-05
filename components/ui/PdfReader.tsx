"use client";

import { useState, useRef, useEffect, SetStateAction, Dispatch } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { useCourse } from "@/context/CourseContext";
import { Loader2, AlertCircle } from "lucide-react";

pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";

const Error = ({
  setError,
  setIsLoading,
  error,
}: {
  setError: Dispatch<SetStateAction<string | null>>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  error: string | null;
}) => {
  return (
    <div
      className="w-full h-full flex flex-col items-center justify-center rounded-lg  border-gray-300"
      style={{ minHeight: "400px" }}
    >
      <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
      <p className="text-red-600 font-medium mb-2">Failed to load document</p>
      <p className="text-gray-500 text-sm text-center max-w-md">{error}</p>
      <button
        onClick={() => {
          setError(null);
          setIsLoading(true);
        }}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors cursor-pointer"
      >
        Try Again
      </button>
    </div>
  );
};

const Loading = () => {
  return (
    <div
      className="w-full h-full flex items-center justify-center rounded-lg z-10 p-3"
      style={{ minHeight: "400px" }}
    >
      <div className="flex flex-col items-center">
        <Loader2 className="w-8 h-8 text-blue-500 animate-spin mb-2" />
        <p className="text-gray-600">Loading document...</p>
      </div>
    </div>
  );
};

const PdfReader = () => {
  const [numPages, setNumPages] = useState<number>();
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState<number | undefined>(
    undefined
  );
  const [scale, setScale] = useState(1.0);

  const { activeResource } = useCourse();

  // Update width on resize
  useEffect(() => {
    function updateWidth() {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    }
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages);
    setIsLoading(false);
    setError(null);
  }

  function onDocumentLoadError(): void {
    setIsLoading(false);
    setError("Failed to load PDF document. Please try again.");
  }

  function onDocumentLoadStart(): void {
    setIsLoading(true);
    setError(null);
  }

  if (!activeResource) {
    return (
      <div className="w-full aspect-video bg-gray-200 flex items-center justify-center rounded-lg text-gray-400">
        No Document available
      </div>
    );
  }

  if (error) {
    return (
      <Error setError={setError} setIsLoading={setIsLoading} error={error} />
    );
  }

  return (
    <div
      ref={containerRef}
      className="w-full h-full flex flex-col items-center justify-center relative"
      style={{ minHeight: "400px" }}
    >
      {/* Controls */}
      <div className="flex gap-2 mb-2">
        <button
          onClick={() => setPageNumber((p) => Math.max(1, p - 1))}
          disabled={pageNumber <= 1}
        >
          Previous
        </button>
        <span>
          Page {pageNumber} {numPages ? `/ ${numPages}` : ""}
        </span>
        <button
          onClick={() =>
            setPageNumber((p) => (numPages ? Math.min(numPages, p + 1) : p))
          }
          disabled={numPages ? pageNumber >= numPages : true}
        >
          Next
        </button>
        <button onClick={() => setScale((s) => Math.max(0.5, s - 0.1))}>
          -
        </button>
        <span>Zoom: {(scale * 100).toFixed(0)}%</span>
        <button onClick={() => setScale((s) => Math.min(3, s + 0.1))}>+</button>
      </div>
      {/* PDF */}
      <div className="flex-1 w-full h-full flex items-center justify-center">
        <Document
          file={activeResource.downloadUrl}
          onLoadSuccess={onDocumentLoadSuccess}
          onLoadError={onDocumentLoadError}
          onLoadStart={onDocumentLoadStart}
          loading={<Loading />}
          error={
            <Error
              setError={setError}
              setIsLoading={setIsLoading}
              error={error}
            />
          }
          onItemClick={({ pageNumber: targetPage }) =>
            setPageNumber(targetPage)
          }
        >
          <Page pageNumber={pageNumber} scale={scale} width={containerWidth} />
        </Document>
      </div>
    </div>
  );
};

export default PdfReader;
