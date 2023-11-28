<template>
    <div>
        <Button :label="(id + 1).toString()" @click="votar(id)"></Button>
        <h2>{{ votos[id] }}</h2>
    </div>
</template>

<script>
import { socket } from "../socket";
import { useAppStore } from "../stores/app.js";

export default {
    props: {
        id: ""
    },
    methods: {
        votar(num) {
            socket.emit("votacion", num)
        }
    },
    computed: {
        votos() {
            const store = useAppStore();
            return store.getVotos();
        }
    }
}
</script>

<style lang="scss" scoped></style>