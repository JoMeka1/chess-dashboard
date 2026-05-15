<template>
  <main class="app">
    <header class="app__header">
      <p class="app__eyebrow">Fédération des résidences G de l'Université de Sherbrooke</p>
      <h1 class="app__title">Chess License</h1>
      <p class="app__subtitle">Official · Non-Official — validée par personne. Recherche un joueur Chess.com.</p>
    </header>

    <SearchBar @search="chargerJoueur" />

    <div v-if="loading" class="status status--loading">Scan en cours...</div>
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
  background-color: #070b14;
  background-image:
    radial-gradient(ellipse 80% 50% at 50% -10%, rgba(46, 79, 120, 0.28) 0%, transparent 55%),
    radial-gradient(ellipse 60% 40% at 100% 80%, rgba(212, 168, 75, 0.1) 0%, transparent 50%),
    radial-gradient(ellipse 50% 35% at 0% 60%, rgba(60, 100, 180, 0.08) 0%, transparent 45%),
    repeating-conic-gradient(
      from 0deg at 50% 50%,
      rgba(212, 168, 75, 0.025) 0deg 30deg,
      transparent 30deg 60deg
    );
  background-size: 100% 100%, 100% 100%, 100% 100%, 120px 120px;
  background-attachment: fixed;
  color: #f5e6c8;
  font-family: system-ui, -apple-system, 'Segoe UI', sans-serif;
}

#app {
  min-height: 100vh;
}
</style>

<style scoped>
.app {
  --license-gold: #d4a84b;
  --license-gold-light: #f0d078;
  --license-cream: #f5e6c8;
  --license-navy: #1a2744;

  min-height: 100vh;
  padding: 0.75rem 1.25rem 2rem;
  box-sizing: border-box;
}

.app__header {
  max-width: 720px;
  margin: 0 auto 0.85rem;
  text-align: center;
}

.app__eyebrow {
  margin: 0 0 0.5rem;
  font-size: 0.72rem;
  font-weight: 600;
  line-height: 1.45;
  letter-spacing: 0.04em;
  color: var(--license-gold);
  opacity: 0.9;
}

.app__title {
  margin: 0;
  font-family: Georgia, 'Times New Roman', serif;
  font-size: 1.85rem;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  background: linear-gradient(180deg, var(--license-gold-light) 0%, var(--license-gold) 55%, #a67c1a 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  filter: drop-shadow(0 2px 12px rgba(212, 168, 75, 0.35));
}

.app__subtitle {
  margin: 0.35rem 0 0;
  font-size: 0.82rem;
  color: rgba(245, 230, 200, 0.65);
}

.status {
  max-width: 720px;
  margin: 0 auto;
  padding: 1rem 1.5rem;
  text-align: center;
  font-size: 0.9rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  border-radius: 4px;
}

.status--loading {
  color: var(--license-cream);
  background: linear-gradient(135deg, rgba(36, 59, 92, 0.65) 0%, rgba(18, 26, 46, 0.85) 100%);
  border: 2px solid var(--license-gold);
  box-shadow: inset 0 0 24px rgba(0, 0, 0, 0.25);
  animation: scan 1.6s ease-in-out infinite;
}

.status--error {
  color: #ffc9c9;
  background: linear-gradient(135deg, rgba(80, 20, 20, 0.7) 0%, rgba(40, 10, 10, 0.85) 100%);
  border: 2px solid #c45c5c;
}

@keyframes scan {
  0%,
  100% {
    opacity: 1;
    box-shadow: inset 0 0 24px rgba(0, 0, 0, 0.25), 0 0 0 rgba(212, 168, 75, 0);
  }
  50% {
    opacity: 0.75;
    box-shadow: inset 0 0 24px rgba(0, 0, 0, 0.25), 0 0 20px rgba(212, 168, 75, 0.2);
  }
}
</style>
