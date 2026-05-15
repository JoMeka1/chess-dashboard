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

  <style scoped>
  .search {
    --chess-black: #0d0d0f;
    --chess-dark: #16161a;
    --chess-panel: #1e1e24;
    --chess-white: #f4f0e8;
    --chess-cream: #c8c2b4;
    --chess-gold: #c9a227;
    --chess-gold-soft: rgba(201, 162, 39, 0.15);
    --chess-gold-glow: rgba(201, 162, 39, 0.35);

    display: flex;
    gap: 0.75rem;
    max-width: 720px;
    margin: 0 auto 1.5rem;
    padding: 1rem 1.25rem;
    background: linear-gradient(145deg, var(--chess-dark) 0%, var(--chess-black) 100%);
    border: 1px solid var(--chess-gold);
    border-radius: 12px;
    box-shadow:
      0 0 0 1px rgba(255, 255, 255, 0.04) inset,
      0 12px 32px rgba(0, 0, 0, 0.4),
      0 0 24px var(--chess-gold-soft);
    font-family: system-ui, -apple-system, 'Segoe UI', sans-serif;
  }

  .search input {
    flex: 1;
    min-width: 0;
    padding: 0.75rem 1rem;
    font-size: 0.95rem;
    color: var(--chess-white);
    background: var(--chess-panel);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 8px;
    outline: none;
    transition:
      border-color 0.2s ease,
      box-shadow 0.2s ease;
  }

  .search input::placeholder {
    color: var(--chess-cream);
    opacity: 0.6;
  }

  .search input:focus {
    border-color: var(--chess-gold);
    box-shadow: 0 0 0 3px var(--chess-gold-soft);
  }

  .search button {
    flex-shrink: 0;
    padding: 0.75rem 1.35rem;
    font-size: 0.9rem;
    font-weight: 700;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    color: var(--chess-black);
    background: linear-gradient(135deg, var(--chess-gold) 0%, #e8c84a 100%);
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition:
      transform 0.15s ease,
      box-shadow 0.2s ease,
      filter 0.2s ease;
    box-shadow: 0 4px 16px var(--chess-gold-glow);
  }

  .search button:hover {
    filter: brightness(1.08);
    box-shadow: 0 6px 20px var(--chess-gold-glow);
  }

  .search button:active {
    transform: scale(0.98);
  }

  @media (max-width: 480px) {
    .search {
      flex-direction: column;
      padding: 1rem;
    }

    .search button {
      width: 100%;
    }
  }
  </style>