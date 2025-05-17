<script setup>
import Scoreboard from './components/Scoreboard.vue'
</script>

<template>
    <div class="app-container">
        <Scoreboard />
    </div>
</template>

<style scoped>

.app-container {
    display: flex;
    justify-content: center;
    align-items: center;
    background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
    margin: 0;
    padding: 0;
    width: 100vw !important ;
}
</style>