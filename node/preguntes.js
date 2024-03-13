export async function fetchPreguntas() {
    //En local el fetch es fa a http://localhost:8000/api/preguntes
    //En producció cambiem a http://mathroyale.daw.inspedralbes.cat/laravel/public/api/preguntes
    //En preproducció cambiem a http://pretr2g3.daw.inspedralbes.cat/laravel/public/api/preguntes
    const response = await fetch('http://localhost:8000/api/preguntes');
    const data = await response.json();
    return data;
}
export async function fetchPreguntasDuelo() {
    
    const response = await fetch('http://localhost:8000/api/preguntesDuelo');
    const data = await response.json();
    data.forEach(element => {
        element.respostes = JSON.parse(element.respostes)
    });
    return data;
}
