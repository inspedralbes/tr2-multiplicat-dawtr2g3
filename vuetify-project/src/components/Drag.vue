<template>
    <div>
        <div class="dragEnd" @dragover="handleDragOver($event)" @drop="handleDrop($event)">
            <h2 class="pregunta">{{ pregunta }}</h2>
        </div>
    </div>
    <div class="container__respostasPosicion">
        <div class="container__respostas">
            <span v-for="(resposta, index) in respostes" class="dragable" :draggable="isDraggable"
                @dragstart="handleDragStart(index)">{{ resposta }}</span>
        </div>
    </div>
</template>

<script>
export default {
    name: "Drag",
    emits: ["comprovar"],
    props: {
        respostes: {
            type: Array,
            required: true
        },
        pregunta: {
            type: String,
            required: true
        }
    },
    data() {

        return {
            isDraggable: true,
            actual: "",
        };
    },
    methods: {
        handleDragStart(index) {
            this.actual = index;
        },
        handleDragOver(event) {
            event.preventDefault();
        },
        handleDrop(event) {

                event.preventDefault();
                this.$emit("comprovar", this.actual);
                this.isDraggable = false;
                setTimeout(() => {
                    this.isDraggable = true;
                }, 1000);

        }
    },
    mounted() {
    },
}
</script>

<style lang="scss" scoped>
.dragable {
    display: flex;
    width: 35vh;
    height: 8vh;
    margin: 5px;
    border-radius: 60ch;
    display: flex;
    justify-content: center;
    align-items: center;
}

.container__respostas {
    color: white;
    display: grid;
    position: relative;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    font-size: 3vh;

    align-items: center;

}

.container__respostas>* {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 20px;
    margin-left: auto;
    margin-right: auto;
}

.container__respostas>*:hover {
    cursor: pointer;
}

.container__respostas>*:nth-child(1) {
    background-color: #e21b3c;
}

.container__respostas>*:nth-child(2) {
    background-color: #ffa502;
}

.container__respostas>*:nth-child(3) {
    background-color: #25890c;
}

.container__respostas>*:nth-child(4) {
    background-color: #1369ce;
}

.dragEnd {
    display: flex;
    width: 65vh;
    height: 10vh;
    background-color: rgb(134, 76, 191);
    color: #ffa502;
    position: relative;
    top: 4vh;
    margin-left: auto;
    margin-right: auto;
    border-radius: 60ch;
    font-size: 2vh;
    justify-content: center;
    align-items: center;

}

.container__respostasPosicion {
    position: relative;
    top: 15vh;

}</style>