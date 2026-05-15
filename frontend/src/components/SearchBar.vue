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
  --license-ink: #0e1420;
  --license-navy-dark: #121a2e;
  --license-navy: #1a2744;
  --license-navy-light: #2e4f78;
  --license-gold: #d4a84b;
  --license-gold-light: #f0d078;
  --license-parchment: #e8d5a3;

  display: flex;
  gap: 0.65rem;
  max-width: 720px;
  margin: 0 auto 0.75rem;
  padding: 0.75rem 1rem;
  background: linear-gradient(160deg, var(--license-navy-light) 0%, var(--license-navy-dark) 100%);
  border: 2px solid var(--license-gold);
  border-radius: 4px;
  outline: 1px solid rgba(240, 208, 120, 0.35);
  outline-offset: 4px;
  box-shadow:
    inset 0 0 40px rgba(0, 0, 0, 0.15),
    0 16px 40px rgba(0, 0, 0, 0.4);
  font-family: system-ui, -apple-system, 'Segoe UI', sans-serif;
}

.search input {
  flex: 1;
  min-width: 0;
  padding: 0.7rem 0.9rem;
  font-size: 0.92rem;
  font-weight: 500;
  color: var(--license-ink);
  background: var(--license-parchment);
  border: 2px solid var(--license-gold);
  border-radius: 3px;
  outline: none;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.08);
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease;
}

.search input::placeholder {
  color: rgba(18, 26, 46, 0.45);
}

.search input:focus {
  border-color: var(--license-gold-light);
  box-shadow:
    inset 0 2px 4px rgba(0, 0, 0, 0.08),
    0 0 0 3px rgba(212, 168, 75, 0.25);
}

.search button {
  flex-shrink: 0;
  padding: 0.7rem 1.2rem;
  font-family: Georgia, 'Times New Roman', serif;
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--license-ink);
  background: linear-gradient(180deg, var(--license-gold-light) 0%, var(--license-gold) 50%, #a67c1a 100%);
  border: 2px solid #8b6914;
  border-radius: 3px;
  cursor: pointer;
  box-shadow:
    0 3px 0 #6e5a14,
    0 6px 16px rgba(0, 0, 0, 0.3);
  transition:
    transform 0.12s ease,
    box-shadow 0.12s ease,
    filter 0.12s ease;
}

.search button:hover {
  filter: brightness(1.06);
}

.search button:active {
  transform: translateY(2px);
  box-shadow:
    0 1px 0 #6e5a14,
    0 3px 8px rgba(0, 0, 0, 0.3);
}

@media (max-width: 480px) {
  .search {
    flex-direction: column;
    padding: 0.9rem;
  }

  .search button {
    width: 100%;
  }
}
</style>
