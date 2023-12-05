export async function fetchPreguntas() {
    //En local el fetch es fa a http://localhost:8000/api/preguntes
    //En producció cambiem a http://mathroyale.daw.inspedralbes.cat/laravel/public/api/preguntes
    const response = await fetch('http://localhost:8000/api/preguntes');
    const data = await response.json();
    return data;
}


/**export const data = [
    {
      "id": 0,
      "tipus": 1,
      "valorInicial": null,
      "unitatInicial": null,
      "valorFinal": null,
      "unitatFinal": null,
      "enunciat": "Quant és 500 grams en quilograms?",
      "intermig": null,
      "dificultat": 2,
      "categoria": 1,
      "created_at": null,
      "respuestas": ["0.5 kg", "1 kg", "2 kg", "5 kg"],
      "updated_at": null
    },
    {
      "id": 1,
      "tipus": 1,
      "valorInicial": null,
      "unitatInicial": null,
      "valorFinal": null,
      "unitatFinal": null,
      "enunciat": "Quant és 3 metres en centímetres?",
      "intermig": null,
      "dificultat": 1,
      "categoria": 1,
      "created_at": null,
      "respuestas": ["30 cm", "100 cm", "300 cm", "1000 cm"],
      "updated_at": null
    },
    {
      "id": 2,
      "tipus": 1,
      "valorInicial": null,
      "unitatInicial": null,
      "valorFinal": null,
      "unitatFinal": null,
      "enunciat": "Quants litres hi ha en 2 galons?",
      "intermig": null,
      "dificultat": 3,
      "categoria": 2,
      "created_at": null,
      "respuestas": ["4.5 L", "7.5 L", "9.5 L", "11.5 L"],
      "updated_at": null
    },
    {
      "id": 3,
      "tipus": 1,
      "valorInicial": null,
      "unitatInicial": null,
      "valorFinal": null,
      "unitatFinal": null,
      "enunciat": "Quina és la superfície d'un rectangle de 8 cm de llarg i 5 cm d'ample?",
      "intermig": null,
      "dificultat": 2,
      "categoria": 3,
      "created_at": null,
      "respuestas": ["13 cm²", "26 cm²", "40 cm²", "56 cm²"],
      "updated_at": null
    },
    {
      "id": 4,
      "tipus": 1,
      "valorInicial": null,
      "unitatInicial": null,
      "valorFinal": null,
      "unitatFinal": null,
      "enunciat": "Quant temps es tarda en recórrer 120 km si la velocitat és de 60 km/h?",
      "intermig": null,
      "dificultat": 3,
      "categoria": 4,
      "created_at": null,
      "respuestas": ["1 h", "2 h", "3 h", "4 h"],
      "updated_at": null
    }
  ]
  **/