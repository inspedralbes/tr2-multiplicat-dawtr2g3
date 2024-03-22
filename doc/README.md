# Documentació bàsica del projecte
Ha d'incloure, com a mínim
## Instruccions per crear un entorn de desenvolupament
  - eines
  - plugins
  - ...

## Instruccions per desplegar el projecte a producció
Quins fitxers s'han d'editar i com (típicament per connectar la BD etc...)
S'ha de cambiar la ruta de /node/preguntes.js a la indicada dins de l'arxiu
S'ha de cambiar la ruta de socket a /vuetify-project/src/socket.js
## Instruccions per seguir codificant el projecte
eines necessaries i com es crea l'entorn per que algú us ajudi en el vostre projecte.

## API / Endpoints / punts de comunicació
Heu d'indicar quins són els punts d'entrada de la API i quins són els JSON que s'envien i es reben a cada endpoint

Endpoint de get preguntes 
RUTA: /api/preguntes METHOD: GET
[{
"id":VALOR,
"tipus":"VALOR",
"valorInicial":VALOR,
"unitatInicial":"VALOR",
"valorFinal":VALOR,
"unitatFinal":"VALOR",
"enunciat":"VALOR",
"intermig":"VALOR",
"dificultat":VALOR,
"categoria":VALOR,
"created_at":VALOR,
"respuestas":[{
respuesta:CORRECTA
},
{
respuesta:INCORRECTA
},
{
respuesta:INCORRECTA TAMBIEN  
},
{
respuesta:INCORRECTA TAMBIEN  
}],
"updated_at":VALOR
}]



