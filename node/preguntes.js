export async function fetchPreguntas() {
    //En local el fetch es fa a http://localhost:8000/api/preguntes
    //En producció cambiem a http://mathroyale.daw.inspedralbes.cat/laravel/public/api/preguntes
    const response = await fetch('http://localhost:8000/api/preguntes');
    const data = await response.json();
    return data;
}
