<template>
  <main class="app">
    <header class="app__header">
      <h1 class="app__title">Chess Dashboard</h1>
      <p class="app__subtitle">Profil et statistiques Chess.com</p>
    </header>

    <SearchBar @search="chargerJoueur" />

    <div v-if="loading" class="status status--loading">Chargement...</div>
    <div v-else-if="erreur" class="status status--error">{{ erreur }}</div>
    <PlayerCard v-else-if="joueur" :joueur="joueur" :stats="stats" />
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import SearchBar from './components/SearchBar.vue';
import PlayerCard from './components/PlayerCard.vue';
import { chessApi } from '../services/chessApi';

const joueur = ref(null);
const stats = ref(null);
const loading = ref(false);
const erreur = ref('');

const chargerJoueur = async (username: string) => {
  loading.value = true;
  erreur.value = '';

  try {
    const [profil, statistiques] = await Promise.all([
      chessApi.getPlayer(username),
      chessApi.getStats(username),
    ]);

    joueur.value = profil;
    stats.value = statistiques;
  } catch (e: any) {
    erreur.value = e.message;
  } finally {
    loading.value = false;
  }
};
</script>

<style>
html,
body {
  margin: 0;
  min-height: 100%;
}

body {
  background-color: #0d0d0f;
  background-image:
  linear-gradient(135deg, rgba(255, 255, 255, 0.03) 25%, transparent 25%),
  linear-gradient(225deg, rgba(255, 255, 255, 0.03) 25%, transparent 25%),
  linear-gradient(45deg, rgba(255, 255, 255, 0.03) 25%, transparent 25%),
  linear-gradient(315deg, rgba(255, 255, 255, 0.03) 25%, transparent 25%),
  radial-gradient(ellipse at 50% -20%, rgba(201, 162, 39, 0.12) 0%, transparent 55%),
  radial-gradient(ellipse at 50% 120%, rgba(201, 162, 39, 0.06) 0%, transparent 45%);
  background-size: 48px 48px, 48px 48px, 48px 48px, 48px 48px, 100% 100%, 100% 100%;
  background-position:
    0 0,
    24px 0,
    24px -24px,
    0 24px,
    center,
    center;
  color: #f4f0e8;
  font-family: system-ui, -apple-system, 'Segoe UI', sans-serif;
}

#app {
  min-height: 100vh;
}
</style>

<style scoped>
.app {
  --chess-black: #0d0d0f;
  --chess-white: #f4f0e8;
  --chess-cream: #c8c2b4;
  --chess-gold: #c9a227;
  --chess-gold-soft: rgba(201, 162, 39, 0.15);

  min-height: 100vh;
  padding: 2.5rem 1.25rem 3rem;
  box-sizing: border-box;
}

.app__header {
  max-width: 720px;
  margin: 0 auto 2rem;
  text-align: center;
}

.app__title {
  margin: 0 0 0.35rem;
  font-size: 1.75rem;
  font-weight: 800;
  letter-spacing: -0.03em;
  color: var(--chess-white);
  text-shadow: 0 0 32px var(--chess-gold-soft);
}

.app__title::after {
  content: '';
  display: block;
  width: 48px;
  height: 3px;
  margin: 0.65rem auto 0;
  background: linear-gradient(90deg, transparent, var(--chess-gold), transparent);
  border-radius: 2px;
}

.app__subtitle {
  margin: 0.75rem 0 0;
  font-size: 0.9rem;
  color: var(--chess-cream);
  opacity: 0.85;
}

.status {
  max-width: 720px;
  margin: 0 auto;
  padding: 1rem 1.25rem;
  text-align: center;
  font-size: 0.95rem;
  font-weight: 500;
  border-radius: 12px;
}

.status--loading {
  color: var(--chess-cream);
  background: rgba(30, 30, 36, 0.85);
  border: 1px solid rgba(201, 162, 39, 0.25);
  animation: pulse 1.4s ease-in-out infinite;
}

.status--error {
  color: #f4c4c4;
  background: rgba(60, 24, 24, 0.6);
  border: 1px solid rgba(220, 80, 80, 0.45);
}

@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.55;
  }
}
</style>
