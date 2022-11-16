import express from 'express';
import path from 'path';
import  pdfToImages from './server/pdfToImages.js';
import pdf2html from 'pdf2html';
import pdfConverter from 'pdf-poppler';
import pdfjs from 'pdf-dist/es5/build/pdf.js';
import {fileURLToPath} from 'url';
import { send } from 'process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 5000;
app.get('/testPdfjs',(req,res)=>{
  let pdfPath = path.join(__dirname , '/server/Pdfs/test.pdf');
  res.sendFile(pdfPath);

});
app.get('/testPdf2html',(req,res)=>{
  let pdfPath = path.join(__dirname , '/server/Pdfs/test.pdf');
  res.sendFile
  pdf2html.html(pdfPath, function(err, html) {
    if (err) {
      console.error(err);
      return;
    }
    res.send(html);
  });
}
);
app.get('/getPdf', (req, res) => {
  let pdfPath = path.join(__dirname , '/server/Pdfs/test.pdf');
  let outputPath = path.join(__dirname , '/server/IMGs/');
  let file = pdfToImages(pdfPath, outputPath, "tests",1);
  res.sendFile(file);
})
app.get('/getHtml',(req,res)=>{
  //set response to html
  res.setHeader('Content-Type', 'text/html');
  let pdfPath = path.join(__dirname , '/server/Pdfs/test.pdf');
  pdf2html.html(pdfPath,{text:true},(err,html)=>{
    if(err){
      console.log(err);
    }
    res.send(html);
  })})
app.use(express.static(path.join(__dirname, 'client/build')));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
});
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});