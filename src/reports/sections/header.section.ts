import type { Content } from "pdfmake/interfaces";
import { dateFormatter } from "src/helpers";

const logo: Content = {
    image: 'src/assets/tucan-code-logo.png',
    width: 100,
    height: 100,
    alignment: 'center',
    margin: [0, 0, 0, 20]
}

interface HeaderOptions {
    title?: string;
    subtitle?: string;
    showLogo?: boolean;
    showDate?: boolean;
}

export const headerSection = ( options: HeaderOptions ): Content => {

    const { title, subtitle, showLogo = true, showDate = true } = options;

    const headerLogo: Content = (
        showLogo ? 
        logo : 
        ''
    );

    const headerDate: Content = (
        showDate ? {
            text: dateFormatter.getDDMMYYYY(new Date()),
            alignment: 'right',
            margin: [20, 20]
        } : ''
    );

    const headerTitle: Content = (
        title ? {
            text: title,
            style: {
                bold: true,
            },
        } : ''
    );

    return {
        columns: [

            headerLogo,

            headerTitle,
            
            headerDate,
        ]
    }
}