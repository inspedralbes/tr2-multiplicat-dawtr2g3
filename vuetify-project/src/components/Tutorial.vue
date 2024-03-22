<template>
    <icons-head></icons-head>
    <v-container>
        <v-row>
            <v-col cols="12">
                <h1 class="title">Tutorial Game</h1>
            </v-col>
        </v-row>

        <v-divider :thickness="3" class="border-opacity-50" color=#25890c></v-divider>

        <v-row>
            <v-col cols="12">
                <h2 class="subtitle">Com crear una partida?</h2>
                <div class="description-box">
                    <p class="description-article">
                        ATENCIÓ PER CREAR UNA PARTIDA HAS DE TENIR UN COMPTE D'USUARI VERIFICAT.
                        Per crear una partida has de clicar al botó de <strong>Crear Partida</strong> i 
                        posar el nom de la partida. Un cop posat el nom de la partida, has de clicar al 
                        botó de <strong>Crear</strong> i ja tindràs la partida creada.
                    </p>
                </div>
            </v-col>
        </v-row>

        <v-row>
            <v-col cols="12">
                <div class="video-box">
                    <iframe width="560" height="315" src="https://www.youtube.com/embed/XNmIv_hYlik?si=lQyB__dNN6QQCwbJ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                </div>
            </v-col>
        </v-row>
        
        <v-divider :thickness="3" class="border-opacity-50" color=#e21b3c></v-divider>

        <v-row>
            <v-col cols="12">
                <h2 class="subtitle">Com Jugar?</h2>
                <div class="description-box">
                    <p class="description-article">
                        Aquest joc és un joc de preguntes i respostes. El joc consisteix a anar responent preguntes,
                        si en falles perds vida i si n'encertes<strong>tres</strong> obtens un poder. PER RESPONDRE HAS
                        D'ARROSEGAR LA RESPOSTA CORRECTA A LA CAIXA ON ES MOSTRA LA PREGUNTA.
                    </p>
                </div>
            </v-col>
        </v-row>

        <v-row>
            <v-col cols="12">
                <div class="video-box">
                    <iframe width="560" height="315" src="https://www.youtube.com/embed/K8eGJ-ZaONE?si=Uh5Ncbbdf4WoRTIV" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                </div>
            </v-col>
        </v-row>

        <v-divider :thickness="3" class="border-opacity-50" color=#0542b9></v-divider>

        <v-row>
            <v-col cols="12">
                <h2 class="subtitle">Demostració de desafiar</h2>
                <div class="video-box">
                    <iframe width="560" height="315" src="https://www.youtube.com/embed/R2oPLlv0Fc8?si=ADSZGi-V1y19BhzQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                </div>
            </v-col>
        </v-row>

        <v-divider :thickness="3" class="border-opacity-50" color=#ffc00a></v-divider>

        <v-row>
            <v-col cols="12">
                <h2 class="subtitle">Poders</h2>
                <div class="description-box">
                    <p class="description-article">
                        Els poders en el joc serveixen per afegir-hi una rivalitat i competició entre els jugadors. 
                        N'hi ha varius tipus de poders els quals poden ajudar-te o pots molestar a un altre jugador.
                    </p>
                </div>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12" md="6">
                <v-card max-width="344" class="mx-auto article-card">
                    <v-img cover height="200" src="/src/assets/poderes/curar.png"></v-img>
                    <v-card-title>Curar</v-card-title>
                    <v-card-text>Aquest poder et permet recuperar +15 punts de vida.</v-card-text>
                </v-card>
                <v-card max-width="344" class="mx-auto article-card">
                    <v-img cover height="200" src="/src/assets/poderes/duelo.png"></v-img>
                    <v-card-title>Desafiar</v-card-title>
                    <v-card-text>L'item de desafiar es una de les parts importants del joc. Aquest item et permet desafiar a un altre jugador a un duel. Si guanyes el duel, el jugador perd 30 punts de vida. Si perds el duel, tu perds 15 punts de vida</v-card-text>
                </v-card>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12" md="6"> 
                <v-card max-width="344" class="mx-auto article-card">
                    <v-img cover height="200" src="/src/assets/poderes/escudo.png"></v-img>
                    <v-card-title>Escut</v-card-title>
                    <v-card-text>El escut et permet protegir-te d'un error a l'ahora de respondre. Si en una ronda falles dos cops o més el primer cop no perdras punts de vida, per tant et protegira.</v-card-text>
                </v-card>
                <v-card max-width="344" class="mx-auto article-card">
                    <v-img cover height="200" src="/src/assets/poderes/pararTiempo.png"></v-img>
                    <v-card-title>Parar el temps</v-card-title>
                    <v-card-text>L'accesori de parar el temps et permet parar el temps durant 5 segons. Això et permetrà tenir més temps per pensar la resposta correcta.</v-card-text>
                </v-card>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12" md="6">
                <v-card max-width="344" class="mx-auto article-card">
                    <v-img cover height="200" src="/src/assets/poderes/reducirTiempo.png"></v-img>
                    <v-card-title>Reduir el temps</v-card-title>
                    <v-card-text>El poder de reduir el temps et permet reduir el temps de resposta a 5 segons d'un jugador que tu esculls. Es redueix el temps en la següent pregunta que el jugador seleccionat respongui. Això pot fer que el jugador no tingui temps suficient per pensar la resposta correcta.</v-card-text>
                </v-card>
                <v-card max-width="344" class="mx-auto article-card">
                    <v-img cover height="200" src="/src/assets/poderes/robarPoder.png"></v-img>
                    <v-card-title>Robar poder</v-card-title>
                    <v-card-text>Aquest poder et permet "robar" un poder. Quan utilitzes aquest poder, et surt una petita pantalla amb tots el poders disponibles. Tu esculls un poder i aquest poder passa a ser teu.</v-card-text>
                </v-card>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12" md="6">
                <v-card max-width="344" class="mx-auto article-card">
                    <v-img cover height="200" src="/src/assets/poderes/robarVida.png"></v-img>
                    <v-card-title>Robar vida</v-card-title>
                    <v-card-text>Robar vida et permet robar 10 punts de vida, aixo fa que recuperis vida. El poder funciona de la següent manera: durant les següents 3 preguntes que responguis correctament, recuperes 10 punts de vida per cada pregunta correcta.</v-card-text>
                </v-card>
                <v-card max-width="344" class="mx-auto article-card">
                    <v-img cover height="200" src="/src/assets/poderes/saltar.png"></v-img>
                    <v-card-title>Saltar pregunta</v-card-title>
                    <v-card-text>Aquest poder et permet saltar una pregunta. Això fa que no perdis punts de vida si no saps la resposta correcta.</v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<style scoped>
.title {
    text-align: center;
    margin-top: 7%;
    margin-bottom: 4%;
    font-family: "Battle Beasts";
    font-size: 7rem !important;
    font-weight: 300;
    line-height: 6rem;
    color: #ffc00a;
}

.subtitle {
    text-align: center;
    margin-top: 4%;
    margin-bottom: 4%;
    font-size: 4rem !important;
    font-weight: 300;
    line-height: 6rem;
    color: #ffc00a;
}

.video-box {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50vw;
    height: 30vh;
    margin: auto;
    margin-top: 5%;
    margin-bottom: 10%;
}

.description-box {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50vw;
    height: 20vh;
    margin: auto;
    margin-bottom: 4vh;
}

.description-article {
    text-align: center;
    font-size: 1.5rem !important;
    font-weight: 300;
    color: #ffffff;
}

.article-card {
    margin-top: 20px;
}
</style>

<script>
import IconsHead from "@/components/iconesHead.vue";
import { useAppStore } from "../store/app.js";
export default {
    components: {
        IconsHead
    },
    data() {
        return {
            articles: [
                {
                    id: 1,
                    title: "Curar",
                    content: "Aquest poder et permet recuperar +15 punts de vida.",
                    image: "/src/assets/poderes/curar.png"
                }, {
                    id: 2,
                    title: "Desafiar",
                    content: "L'item de desafiar es una de les parts importants del joc. Aquest item et permet desafiar a un altre jugador a un duel. Si guanyes el duel, el jugador perd 30 punts de vida. Si perds el duel, tu perds 15 punts de vida",
                    image: "/src/assets/poderes/duelo.png"
                }, {
                    id: 3,
                    title: "Escut",
                    content: "El escut et permet protegir-te d'un error a l'ahora de respondre. Si en una ronda falles dos cops o més el primer cop no perdras punts de vida, per tant et protegira.",
                    image: "/src/assets/poderes/escudo.png"
                }, {
                    id: 4,
                    title: "Parar el temps",
                    content: "L'accesori de parar el temps et permet parar el temps durant 5 segons. Això et permetrà tenir més temps per pensar la resposta correcta.",
                    image: "/src/assets/poderes/pararTiempo.png"
                }, {
                    id: 5,
                    title: "Reduir el temps",
                    content: "El poder de reduir el temps et permet reduir el temps de resposta a 5 segons d'un jugador que tu esculls. Es redueix el temps en la següent pregunta que el jugador seleccionat respongui. Això pot fer que el jugador no tingui temps suficient per pensar la resposta correcta.",
                    image: "/src/assets/poderes/reducirTiempo.png"
                }, {
                    id: 6,
                    title: "Robar poder",
                    content: 'Aquest poder et permet "robar" un poder. Quan utilitzes aquest poder, et surt una petita pantalla amb tots el poders disponibles. Tu esculls un poder i aquest poder passa a ser teu.',
                    image: "/src/assets/poderes/robarPoder.png"
                }, {
                    id: 7,
                    title: "Robar vida",
                    content: "Robar vida et permet robar 10 punts de vida, aixo fa que recuperis vida. El poder funciona de la següent manera: durant les següents 3 preguntes que responguis correctament, recuperes 10 punts de vida per cada pregunta correcta.",
                    image: "/src/assets/poderes/robarVida.png"
                }, {
                    id: 8,
                    title: "Saltar pregunta",
                    content: "Aquest poder et permet saltar una pregunta. Això fa que no perdis punts de vida si no saps la resposta correcta.",
                    image: "/src/assets/poderes/saltar.png"
                }
            ]
        };
    },
    mounted(){
        const store = useAppStore();
        store.tutorial = true;
    }
};
</script>