import Document, { Html, Head, NextScript, Main } from 'next/document';
import { ServerStyleSheet } from 'styled-components';


//render the global variables and functions in the document that are defined
export default class myDocument extends Document {
    static getInitialProps({ renderPage }) {
        const sheet = new ServerStyleSheet()
        //go through the sheet and get the properties that are defined in the sheet and get the properties that are not defined in the sheet itself
        const page = renderPage(App => props => sheet.collectStyles(<App {...props} />));
        const styleTags = sheet.getStyleElement(); 
        return {...page, styleTags }; 
    }
    render() {
        return (
          <Html>
            <Head></Head>
            <body>
              <Main></Main>
              <NextScript></NextScript> 
            </body>
          </Html>
        );
      }
    }