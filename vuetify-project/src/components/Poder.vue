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
                    console.log("si tens poder");
                    socket.emit("utilitzar poder", this.poder, socket.id);
                } else {
                    console.log("No tens poder");
                }
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>