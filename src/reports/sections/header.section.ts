import type { Content } from "pdfmake/interfaces";
import { dateFormatter } from "src/helpers";

const logo: Content = {
    image: 'src/assets/tucan-code-logo.png',
    width: 100,
    height: 100,
    alignment: 'center',
    margin: [0, 0, 0, 20]
}

const currentDate: Content = {
    text: dateFormatter.getDDMMYYYY(new Date()),
    alignment: 'right',
    margin: [10, 40],
    width: 100,
    fontSize: 10
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
        showDate ? 
        currentDate : 
        ''
    );

    const headerTitle: Content = (
        title ? {
            
            stack: [
                {
                    text: title,
                    style: {
                        bold: true,
                        fontSize: 20,
                    },
                },
                {
                    text: subtitle,
                    style: {
                        fontSize: 14,
                        italics: true,
                    },
                }
            ],
            alignment: 'center',
            margin: [0, 30],
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