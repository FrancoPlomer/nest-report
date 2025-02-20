import { TDocumentDefinitions } from "pdfmake/interfaces"

export const getCommunityReport = (): TDocumentDefinitions => {

    const docDefinition: TDocumentDefinitions = {
        // Lo siguiente es para poner estilos por defectos si estos no estan especificados
        defaultStyle: {
            fontSize: 10
        },
        content: [

            // Logo - direccion

            {
                columns: [
                    {
                        image: 'src/assets/tucan-banner.png',
                        width: 50
                    },
                    {
                        alignment: 'center',
                        text: `Forest admin community reports SAP \n RUT: 44.123.1233\nCamino de montaña`
                    },
                    {
                        alignment: 'right',
                        width: 140,
                        // Esto es un custom layout, visto en el printer.service
                        layout: 'borderBlue',
                        table: {
                            body: [
                                [
                                    {
                                        layout: 'noBorders',
                                        table: {
                                            body: [
                                                ['No.', '123-435'],
                                                ['Fecha', '12/01/2022'],
                                                ['Versión', '2024-01']
                                            ]
                                        }
                                    }
                                ]
                            ]
                        }
                    }
                ]
            },

            // Horizontal line

            {
                margin: [0, 5],
                canvas: [
                    {
                        type: 'line',
                        x1: 0,
                        y1: 5,
                        x2: 515,
                        y2: 5,
                        lineWidth: 2,
                        lineColor: '#3A4546'
                    }
                ]
            },

            // Detalles del cliente

            {
                table: {
                    widths: ['auto', '*', 'auto', '*'],                        
                    body: [
                        [
                            {
                                text: 'Datos del cliente',
                                fillColor: '#5775e1',
                                color: 'white',
                                colSpan: 4,
                                // De la siguiente manera borramos todos los bordes
                                border: [false, false, false, false]
                            },
                            {},
                            {},
                            {},
                        ],

                        // Razon social
                        [
                            {
                                text: 'Razon social',
                                fillColor: '#343a40',
                                color: 'white',
                                bold: true,
                            },
                            {
                                text: 'Nombre de la empresa',
                                fillColor: 'white',
                            },
                            {
                                text: 'Dirección',
                                fillColor: '#343a40',
                                color: 'white',
                            },
                            {
                                text: 'calle falsa',
                                fillColor: 'white',
                            },
                        ],
                        [
                            {
                                text: 'Rut',
                                fillColor: '#343a40',
                                color: 'white',
                                bold: true,
                            },
                            {
                                text: 'montañas',
                                fillColor: 'white',
                            },
                            {
                                text: 'telefono',
                                fillColor: '#343a40',
                                color: 'white',
                            },
                            {
                                text: '+5411111111',
                                fillColor: 'white',
                            },
                        ],
                        [
                            {
                                text: 'Giro',
                                fillColor: '#343a40',
                                color: 'white',
                                bold: true,
                            },
                            {
                                text: '',
                                fillColor: 'white',
                            },
                            {
                                text: 'Condición de pago',
                                fillColor: '#343a40',
                                color: 'white',
                            },
                            {
                                text: '',
                                fillColor: 'white',
                            },
                        ],
                    ]
                }
            }
        ]
    }

    return docDefinition;
}