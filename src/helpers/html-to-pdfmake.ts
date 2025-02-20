import { JSDOM } from 'jsdom';

import htmlToPdfMake from 'html-to-pdfmake';

interface ContentReplacer {
    [key: string]: string;
}

export const getHtmlContent = (html: string, replacers: ContentReplacer = {}) => {


    // Vamos a pre procesar el html

    Object.entries(replacers).forEach(([ key, value ]) => {
        
        // La sintaxis sobre el html debe tener espacio como vemos a continuación en la key para que la podamos mapear y agregar sobre el html

        const key1 = `{{ ${key} }}`

        // Lo siguiente es para detectar si esta sin espacios

        const key2 = `{{${key}}}`
        
        html = html.replaceAll(key1, value).replaceAll(key2, value);
    })

    const { window } = new JSDOM()

    return htmlToPdfMake( html, { window });
}