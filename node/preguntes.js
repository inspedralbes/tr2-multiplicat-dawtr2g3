export async function fetchPreguntas() {
    //En local el fetch es fa a http://localhost:8000/api/preguntes
    //En producció cambiem a http://mathroyale.daw.inspedralbes.cat/laravel/public/api/preguntes
    //En preproducció cambiem a http://pretr2g3.daw.inspedralbes.cat/laravel/public/api/preguntes
    const response = await fetch('http://localhost:8000/api/preguntes');
    const data = await response.json();
    return data;
}
export function fetchPreguntasDuelo() {
    const preguntasDuelo = [
        {
            "idPregunta": 0,
            "pregunta": "Quant és 1500 mil·lilitres en litres?",
            "categoria": 1,
            "tipus": 0,
    
            "respostes": [
                "1.5 L",
                "2.5 L",
                "3.5 L",
                "5 L"
            ],
            "unitats": {
                "valorInicial": null,
                "unitatInicial": null,
                "unitatFinal": null
            }
    
        },
        {
            "idPregunta": 1,
            "pregunta": "Quant és 4 quilòmetres en metres?",
            "categoria": 1,
            "tipus": 0,
    
    
            "respostes": [
                "4000 m",
                "5000 m",
                "6000 m",
                "7000 m"
            ],
            "unitats": {
                "valorInicial": null,
                "unitatInicial": null,
                "unitatFinal": null
            }
    
        },
        {
            "idPregunta": 2,
            "pregunta": "Quants grams són 0.5 quilograms?",
            "categoria": 2,
            "tipus": 0,
    
    
            "respostes": [
                "500 g",
                "750 g",
                "1000 g",
                "1250 g"
            ],
            "unitats": {
                "valorInicial": null,
                "unitatInicial": null,
                "unitatFinal": null
            }
    
        },
        {
            "idPregunta": 3,
            "pregunta": "Quina és l'àrea d'un cercle amb radi de 2 centímetres?",
            "categoria": 3,
            "tipus": 0,
    
    
            "respostes": [
                "4π cm²",
                "8π cm²",
                "12π cm²",
                "16π cm²"
            ],
            "unitats": {
                "valorInicial": null,
                "unitatInicial": null,
                "unitatFinal": null
            }
    
        },
        {
            "idPregunta": 4,
            "pregunta": "Quant temps es tarda en recórrer 60 km si la velocitat és de 30 km/h?",
            "categoria": 4,
            "tipus": 0,
    
    
            "respostes": [
                "2 h",
                "3 h",
                "4 h",
                "5 h"
            ],
            "unitats": {
                "valorInicial": null,
                "unitatInicial": null,
                "unitatFinal": null
            }
    
        },
        {
            "idPregunta": 5,
            "pregunta": "Quants mil·lilitres hi ha en 0.75 litres?",
            "categoria": 1,
            "tipus": 0,
    
    
            "respostes": [
                "750 mL",
                "1000 mL",
                "1250 mL",
                "1500 mL"
            ],
            "unitats": {
                "valorInicial": null,
                "unitatInicial": null,
                "unitatFinal": null
            }
    
        },
        {
            "idPregunta": 6,
            "pregunta": "Quant és 5.5 quilòmetres en metres?",
            "categoria": 1,
            "tipus": 0,
    
    
            "respostes": [
                "5500 m",
                "6000 m",
                "6500 m",
                "7000 m"
            ],
            "unitats": {
                "valorInicial": null,
                "unitatInicial": null,
                "unitatFinal": null
            }
    
        },
        {
            "idPregunta": 7,
            "pregunta": "Quants grams són 1.2 quilograms?",
            "categoria": 2,
            "tipus": 0,
    
    
            "respostes": [
                "1200 g",
                "1400 g",
                "1600 g",
                "1800 g"
            ],
            "unitats": {
                "valorInicial": null,
                "unitatInicial": null,
                "unitatFinal": null
            }
    
        },
        {
            "idPregunta": 8,
            "pregunta": "Quina és l'àrea d'un quadrat amb costat de 3 centímetres?",
            "categoria": 3,
            "tipus": 0,
    
    
            "respostes": [
                "9 cm²",
                "12 cm²",
                "15 cm²",
                "18 cm²"
            ],
            "unitats": {
                "valorInicial": null,
                "unitatInicial": null,
                "unitatFinal": null
    
            }
        },
        {
            "idPregunta": 9,
            "pregunta": "Quant temps es tarda en recórrer 80 km si la velocitat és de 40 km/h?",
            "categoria": 4,
            "tipus": 0,
    
    
            "respostes": [
                "2 h",
                "3 h",
                "4 h",
                "5 h"
            ],
            "unitats": {
                "valorInicial": null,
                "unitatInicial": null,
                "unitatFinal": null
    
            }
        }
    ]
    return preguntasDuelo;
}
