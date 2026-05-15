<template>
    <div class="card">
      
      <div class="profile">
        <img :src="joueur.avatar" :alt="joueur.username" />
        <div class="info">
          <span class="title">{{ joueur.title }}</span>
          <h2>{{ joueur.name }}</h2>
          <p>@{{ joueur.username }}</p>
          <p>{{ joueur.followers }} followers</p>
        </div>
      </div>
  
      <div class="stats">
        <div class="format" v-for="(data, format) in stats" :key="format">
          <h3>{{ format }}</h3>
          <p>{{ data.current }} ELO</p>
          <p>Best: {{ data.best }}</p>
          <p>✅ {{ data.wins }} / ❌ {{ data.losses }} / 🤝 {{ data.draws }}</p>
        </div>
      </div>
  
    </div>
  </template>
  
  <script setup lang="ts">
  defineProps<{
    joueur: any;
    stats: any;
  }>();
  </script>