<template>
    <v-container>
        <v-row>
            <v-col cols="12">
                <h1 class="title">Tutorial Game</h1>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12" md="6" v-for="article in articles">
                <v-card class="article-card">
                    <v-img height="200" :src="article.image" cover></v-img>
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
    margin-top: 20px;
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
                    title: "Getting Started",
                    content: "Learn the basics of the game and how to play.",
                    image: "../assets/poderes/curar.png"
                }, {
                    id: 2,
                    title: "How to Play",
                    content: "Learn the basics of the game and how to play.",
                    image: "../assets/poderes/duelo.png"
                }, {
                    id: 3,
                    title: "How to Win",
                    content: "Learn the basics of the game and how to play.",
                    image: "../assets/poderes/escudo.png"
                }, {
                    id: 4,
                    title: "How to Lose",
                    content: "Learn the basics of the game and how to play.",
                    image: "../assets/poderes/pararTiempo.png"
                }
            ]
        };
    }
};
</script>