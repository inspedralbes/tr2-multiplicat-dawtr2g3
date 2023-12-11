<template>
    <div>
        <span v-for="(resposta, index) in respostes" class="dragable" :draggable="true"
            @dragstart="handleDragStart(index)">{{ resposta }}</span>

        <div class="dragEnd" @dragover="handleDragOver($event)" @drop="handleDrop($event)">drop</div>
    </div>

    <ProvaPartida @enlarge="console.log('hola')" />
</template>

<script>
import ProvaPartida from "./ProvaPartida.vue";
export default {
    name: "Drag",
    data() {
        return {
            respostes: ["hola", "adeu", "bon dia", "bona tarda", "bona nit"],
            actual: "",
            postFontSize: 1
        };
    },
    methods: {
        handleDragStart(index) {
            console.log("drag start");
            this.actual = this.respostes[index];
            console.log(this.actual);
        },
        handleDragOver(event) {
            event.preventDefault();
            console.log("drag over");
        },
        handleDrop(event) {
            event.preventDefault();
            console.log("drop");
            console.log(this.actual);
        }
    },
    mounted() {
    },
    components: { ProvaPartida }
}
</script>

<style lang="scss" scoped>
.dragable {
    width: 100px;
    height: 100px;
    background-color: red;
    margin: 5px;
}

.dragEnd {
    width: 100px;
    height: 100px;
    background-color: rgb(0, 255, 229);
    margin: 5px;
}
</style>