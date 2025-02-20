import { Content } from "pdfmake/interfaces";


export const footerSection = (currentPage: number, pageCount: number): Content => ({
    text: currentPage.toString() + ' of ' + pageCount,
    alignment: 'right',
    margin: [10, 20],
    bold: true,
})