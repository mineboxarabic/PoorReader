import pdfConverter from 'pdf-poppler'
import path from 'path'
let pdfToImages = (pdfPath, outputPath,fileName = "test",pageNumber) => {

    let option = {
        format : 'jpeg',
        out_dir : outputPath,
        scale: 2200,
        out_prefix : fileName,
        page : pageNumber
    }
    pdfConverter.convert(pdfPath, option)
    .then(() => {
        console.log('file converted')
    })
    .catch(err => {
        console.log('an error has occurred in the pdf converter ' + err)
    })
    return `${outputPath}${fileName}-${pageNumber}.jpg`;
}
export default pdfToImages;

