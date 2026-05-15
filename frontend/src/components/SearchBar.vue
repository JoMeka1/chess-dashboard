<template>
    <div class="search">
      <input
        v-model="username"
        type="text"
        placeholder="Entre un username Chess.com..."
        @keyup.enter="rechercher"
      />
      <button @click="rechercher">Rechercher</button>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  
  const username = ref('');
  
  const emit = defineEmits<{
    search: [username: string];
  }>();
  
  const rechercher = () => {
    if (username.value.trim()) {
      emit('search', username.value.trim());
    }
  };
  </script>