<template>
    <div>
        <span v-for="(resposta, index) in respostes" class="dragable" :draggable="true"
            @dragstart="handleDragStart(index)">{{ resposta }}</span>

        <div class="dragEnd" @dragover="handleDragOver($event)" @drop="handleDrop($event)">drop</div>
    </div>

</template>

<script>
export default {
    name: "Drag",
    props: {
        respostes: {
            type: Array,
            required: true
        }
    },
    data() {
        return {
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
        }
    },
    mounted() {
    },
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