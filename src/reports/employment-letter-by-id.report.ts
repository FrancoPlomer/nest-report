import { Content, StyleDictionary, TDocumentDefinitions } from "pdfmake/interfaces";
import { dateFormatter } from "src/helpers";
import { headerSection } from "./sections/header.section";
import e from "express";

interface ReportValues {
    employerName: string;
    employerPosition: string;
    employeeName: string;
    employeePosition: string;
    employeeStartDate: Date;
    employeeHours: number;
    employeeWorkSchedule: string;
    employerCompany: string;
}

const styles: StyleDictionary = {
    header: {
        bold: true,
        fontSize: 22,
        alignment: 'center',
        margin: [0, 60, 0, 20]
    },
    body: {
        alignment: 'justify',
        margin: [0,0,0,50]
    },
    signature: {
        fontSize: 14,
        bold: true,
    },
    footer: {
        fontSize: 10,
        italics: true,
        alignment: 'center',
        margin: [0, 0, 0, 20]
    }
}

export const getEmploymentLetterById = ( values: ReportValues ): TDocumentDefinitions => {

    const { 
        employeeName, 
        employerName, 
        employeeHours, 
        employerCompany,
        employerPosition, 
        employeePosition, 
        employeeStartDate, 
        employeeWorkSchedule, 
    } = values;

    const docDefinition: TDocumentDefinitions = {
        styles,
        pageMargins: [40,60,40,60],
        header: headerSection({
            title: 'Tucan Code',
            subtitle: 'Desarrollo de Software',
            showLogo: true,
            showDate: true
        }),

        content: [
            {
                text: 'Constancia de empleo',
                style: 'header'
            },
            {
                text: `Yo, ${employerName}, en mi calidad de ${employerPosition} de ${employerCompany}, 
                por medio de la presente certifco que ${employeeName} ha sido empleado en nuestra 
                empresa desde el ${dateFormatter.getDDMMYYYY(employeeStartDate)}.\n
                Durante su empleo, el Sr./Sra. ${employeeName} ha desempeñado el cargo de ${employeePosition}, demostrando responsabilidad, compromiso y habilidades profesionales en sus 
                labores.\n
                La jornada laboral del Sr./ Sra. ${employeeName} es de ${employeeHours} horas 
                semanales, con un horario de ${employeeWorkSchedule}, cumpliendo con las políticas y 
                procedimientos establecidos por la empresa.\n
                Esta constancia se expide a solicitud del interesado para los fnes que considere conveniente.\n
                `,
                style: 'body'
            },
            {
                text: 'Atentamente',
                style: 'signature'
            },
            {
                text: employerName,
                style: 'signature'
            },
            {
                text: employerPosition,
                style: 'signature'
            },
            {
                text: employerCompany,
                style: 'signature'
            },
            {
                text: dateFormatter.getDDMMYYYY(new Date()),
                style: 'signature'
            },
        ],
        
        footer: {
            text: 'Este documento es una constancia de empleo y no representa un compromiso laboral.',
            style: 'footer',
        }
    }

    return docDefinition;
}