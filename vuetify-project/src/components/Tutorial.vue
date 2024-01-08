<template>
    <v-container>
        <v-row>
            <v-col cols="12">
                <h1 class="title">Tutorial Game</h1>
            </v-col>
        </v-row>

        <v-row>
            <v-col cols="12">
                <h2 class="subtitle">Com Jugar?</h2>
                
            </v-col>
        </v-row>

        <v-row>
            <v-col cols="12">
                <h2 class="subtitle">Preguntes</h2>
                <p>adasdasd</p>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12" md="6" v-for="article in articles">
                <v-card max-width="344" class="mx-auto article-card">
                    <v-img cover height="200" :src="article.image"></v-img>
                    <v-card-title>{{ article.title }}</v-card-title>
                    <v-card-text>{{ article.content }}</v-card-text>
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

.article-card {
    margin-top: 20px;
}
</style>

<script>
export default {
    data() {
        return {
            articles: [
                {
                    id: 1,
                    title: "Curar",
                    content: "Aquest poder et permet recuperar +15 punts de vida.",
                    image: "src/assets/poderes/curar.png"
                }, {
                    id: 2,
                    title: "Desafiar",
                    content: "L'item de desafiar es una de les parts importants del joc. Aquest item et permet desafiar a un altre jugador a un duel. Si guanyes el duel, el jugador perd 30 punts de vida. Si perds el duel, tu perds 15 punts de vida",
                    image: "src/assets/poderes/duelo.png"
                }, {
                    id: 3,
                    title: "Escut",
                    content: "El escut et permet protegir-te d'un error a l'ahora de respondre. Si en una ronda falles dos cops o més el primer cop no perdras punts de vida, per tant et protegira.",
                    image: "src/assets/poderes/escudo.png"
                }, {
                    id: 4,
                    title: "Parar el temps",
                    content: "L'accesori de parar el temps et permet parar el temps durant 5 segons. Això et permetrà tenir més temps per pensar la resposta correcta.",
                    image: "src/assets/poderes/pararTiempo.png"
                }, {
                    id: 5,
                    title: "Reduir el temps",
                    content: "El poder de reduir el temps et permet reduir el temps de resposta a 5 segons d'un jugador que tu esculls. Es redueix el temps en la següent pregunta que el jugador seleccionat respongui. Això pot fer que el jugador no tingui temps suficient per pensar la resposta correcta.",
                    image: "src/assets/poderes/reducirTiempo.png"
                }, {
                    id: 6,
                    title: "Robar poder",
                    content: 'Aquest poder et permet "robar" un poder. Quan utilitzes aquest poder, et surt una petita pantalla amb tots el poders disponibles. Tu esculls un poder i aquest poder passa a ser teu.',
                    image: "src/assets/poderes/robarPoder.png"
                }, {
                    id: 7,
                    title: "Robar vida",
                    content: "Robar vida et permet robar 10 punts de vida, aixo fa que recuperis vida. El poder funciona de la següent manera: durant les següents 3 preguntes que responguis correctament, recuperes 10 punts de vida per cada pregunta correcta.",
                    image: "src/assets/poderes/robarVida.png"
                }, {
                    id: 8,
                    title: "Saltar pregunta",
                    content: "Aquest poder et permet saltar una pregunta. Això fa que no perdis punts de vida si no saps la resposta correcta.",
                    image: "src/assets/poderes/saltar.png"
                }
            ]
        };
    }
};
</script>