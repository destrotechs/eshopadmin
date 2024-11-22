export default function OutputContent({ htmlContent }) {
  return (
    <div
      style={{
        padding: '10px',
        borderRadius: '4px',
        fontFamily: 'Arial, sans-serif',
      }}
      dangerouslySetInnerHTML={{ __html: htmlContent }} // Safely render HTML content
    ></div>
  );
}
