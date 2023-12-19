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
                this.$emit('utilitzarPoder');
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>