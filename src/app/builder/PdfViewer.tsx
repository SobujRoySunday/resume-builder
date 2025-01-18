const PdfEmbedder = ({ pdfUrl }: { pdfUrl: string }) => {
    return (
        <iframe
            src={pdfUrl}
            width="100%"
            height="850px"
            title="PDF Viewer"
            style={{ border: 'none' }}
        ></iframe>
    );
};

export default PdfEmbedder;
