<template>
  <main>
    <SearchBar @search="chargerJoueur" />
    
    <div v-if="loading">Chargement...</div>
    <div v-else-if="erreur">{{ erreur }}</div>
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