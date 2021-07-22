import { useRef, useEffect } from 'react';
import { Loader } from '../loader';
import './styles.css';

const html = `
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <style>body { background-color: white; }</style>
  </head>
  <body>
    <div id="root"></div>
    <script>
      function handleError(err) {
        const root = document.getElementById('root');
        root.innerHTML = '<pre class="text-red-500 font-mono"><h3>Runtime Error</h3>' + err + '</pre>';
        console.error(err);
      }

      window.addEventListener('error', (event) => {
        event.preventDefault();
        handleError(event.error);
      });

      window.addEventListener('message', (event) => {
        try {
          eval(event.data)
        } catch (err) {
          handleError(err);
        }
      }, false);
    </script>
  </body>
</html>
`;

type PreviewProps = {
  code?: string;
  bundlingError?: Error;
  loading: boolean;
};

const Preview: React.FC<PreviewProps> = ({ code, bundlingError, loading }) => {
  const iframe = useRef<any>();

  useEffect(() => {
    iframe.current.srcdoc = html;
    setTimeout(() => {
      iframe.current.contentWindow.postMessage(code, '*');
    }, 50);
  }, [code]);
  console.log(loading);

  return (
    <div className="relative h-full iframe-wrapper flex-grow">
      <iframe
        title="preview"
        ref={iframe}
        srcDoc={html as string}
        sandbox="allow-scripts"
        className="bg-white h-full w-full"
      />
      {loading && <Loader />}
      {bundlingError && (
        <pre className="text-red-500 font-mono absolute top-4 left-4">
          {bundlingError.toString()}
        </pre>
      )}
    </div>
  );
};

export default Preview;
