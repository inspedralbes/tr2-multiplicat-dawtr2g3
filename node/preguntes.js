import 'dotenv/config';

export async function fetchPreguntas() {
    // const ruta = process.env.URL_API + 'preguntes';


    const response = await fetch(`${process.env.URL_API}preguntes`);
    const data = await response.json();
    return data;
}
export async function fetchPreguntasDuelo() {
    
    const response = await fetch(`${process.env.URL_API}preguntesDuelo`);
    const data = await response.json();
    data.forEach(element => {
        element.respostes = JSON.parse(element.respostes)
    });
    return data;
}

export async function fetchPreguntaNuke(){
    const response = await fetch(`${process.env.URL_API}preguntaNuke`);
    const data = await response.json();
    data.respostes = JSON.parse(data.respostes);
    return data;
}
