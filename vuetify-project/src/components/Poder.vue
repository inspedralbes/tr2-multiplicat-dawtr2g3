<template>
    <div class="container__power">
        <v-btn variant="solo"  @click="utilitzarPoder()" class="boton__power"><img src="../assets/icono/power.png" alt="" class="power">
            <!-- 
                <div class="container__modal">
                {{ poder }} 
                </div>
            -->
        </v-btn>
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

.power {
    width: 10vw;
    height: 10vw;
}
.boton__power {
    border-radius: 50%;
    width: 0;
    height: 0;
    display: flex;
    position: relative;
}

</style>