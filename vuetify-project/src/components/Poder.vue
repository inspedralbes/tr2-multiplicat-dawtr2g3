<template>
    <div class="container__power">
        <button @click="utilitzarPoder()"><img src="../assets/icono/power.png" alt="" class="power"> {{ poder }} </button>
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
                this.showModal = true;
            } else {
                console.log("No tens poder");
            }
        },
    },
}
</script>

<style lang="scss" scoped>
.container__power {
    display: flex;
    justify-content: center;
    align-items: center;
}
.power {
    width: 10vw;
    height: 10vw;
}

</style>