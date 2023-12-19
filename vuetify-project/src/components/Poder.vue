<template>
    <div @click="utilitzarPoder()">
        Poder: {{ poder }} 
    </div>
</template>

<script>
import { socket } from '../socket';

    export default {
        name: "Poder",
        props: {
            poder: {
                type: String,
                required: true
            }
        },
        data() {
            return {

            };
        },
        methods: {
            utilitzarPoder() {
                if (this.poder.length > 0) {
                    socket.emit("use power", this.poder, socket.id);
                }
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>