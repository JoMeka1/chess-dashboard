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
          <p class="record">
            <span class="record__item record__item--win">
              <span class="record__badge">W</span>
              <span class="record__value">{{ data.wins ?? '—' }}</span>
            </span>
            <span class="record__item record__item--loss">
              <span class="record__badge">L</span>
              <span class="record__value">{{ data.losses ?? '—' }}</span>
            </span>
            <span class="record__item record__item--draw">
              <span class="record__badge">D</span>
              <span class="record__value">{{ data.draws ?? '—' }}</span>
            </span>
          </p>
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

  <style scoped>
  .card {
    --chess-black: #0d0d0f;
    --chess-dark: #16161a;
    --chess-panel: #1e1e24;
    --chess-white: #f4f0e8;
    --chess-cream: #c8c2b4;
    --chess-gold: #c9a227;
    --chess-gold-soft: rgba(201, 162, 39, 0.15);
    --chess-gold-glow: rgba(201, 162, 39, 0.35);

    max-width: 720px;
    margin: 0 auto;
    padding: 1.75rem;
    background: linear-gradient(145deg, var(--chess-dark) 0%, var(--chess-black) 100%);
    border: 1px solid var(--chess-gold);
    border-radius: 16px;
    box-shadow:
      0 0 0 1px rgba(255, 255, 255, 0.04) inset,
      0 24px 48px rgba(0, 0, 0, 0.45),
      0 0 40px var(--chess-gold-soft);
    color: var(--chess-white);
    font-family: system-ui, -apple-system, 'Segoe UI', sans-serif;
  }

  .profile {
    display: flex;
    align-items: center;
    gap: 1.5rem;
    padding-bottom: 1.5rem;
    margin-bottom: 1.5rem;
    border-bottom: 1px solid rgba(201, 162, 39, 0.25);
  }

  .profile img {
    width: 96px;
    height: 96px;
    border-radius: 50%;
    object-fit: cover;
    flex-shrink: 0;
    border: 3px solid var(--chess-gold);
    box-shadow:
      0 0 0 4px var(--chess-gold-soft),
      0 8px 24px rgba(0, 0, 0, 0.5);
  }

  .info {
    min-width: 0;
  }

  .info .title {
    display: inline-block;
    margin-bottom: 0.35rem;
    padding: 0.15rem 0.55rem;
    font-size: 0.7rem;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--chess-black);
    background: linear-gradient(135deg, var(--chess-gold) 0%, #e8c84a 100%);
    border-radius: 4px;
  }

  .info h2 {
    margin: 0 0 0.25rem;
    font-size: 1.5rem;
    font-weight: 700;
    letter-spacing: -0.02em;
    color: var(--chess-white);
    line-height: 1.2;
  }

  .info p {
    margin: 0.15rem 0;
    font-size: 0.9rem;
    color: var(--chess-cream);
  }

  .info p:first-of-type {
    color: var(--chess-gold);
    font-weight: 500;
  }

  .stats {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
  }

  .format {
    padding: 1.1rem 1rem;
    background: var(--chess-panel);
    border: 1px solid rgba(255, 255, 255, 0.06);
    border-radius: 12px;
    text-align: center;
    transition: border-color 0.2s ease, box-shadow 0.2s ease;
  }

  .format:hover {
    border-color: var(--chess-gold-glow);
    box-shadow: 0 0 20px var(--chess-gold-soft);
  }

  .format h3 {
    margin: 0 0 0.75rem;
    font-size: 0.72rem;
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--chess-gold);
  }

  .format p:nth-of-type(1) {
    margin: 0 0 0.5rem;
    font-size: 2rem;
    font-weight: 800;
    line-height: 1;
    letter-spacing: -0.03em;
    color: var(--chess-white);
    text-shadow: 0 0 24px var(--chess-gold-glow);
  }

  .format p:nth-of-type(2) {
    margin: 0 0 0.65rem;
    font-size: 0.8rem;
    color: var(--chess-cream);
  }

  .record {
    display: flex;
    justify-content: center;
    gap: 0.5rem;
    margin: 0;
    padding-top: 0.65rem;
    border-top: 1px solid rgba(255, 255, 255, 0.06);
  }

  .record__item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.3rem;
    flex: 1;
    min-width: 0;
  }

  .record__badge {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 1.35rem;
    height: 1.35rem;
    font-size: 0.62rem;
    font-weight: 800;
    letter-spacing: 0.02em;
    border-radius: 4px;
    line-height: 1;
  }

  .record__value {
    font-size: 0.82rem;
    font-weight: 600;
    font-variant-numeric: tabular-nums;
    color: var(--chess-white);
  }

  .record__item--win .record__badge {
    color: #0d0d0f;
    background: linear-gradient(135deg, #7cb87c 0%, #5a9a5a 100%);
    box-shadow: 0 0 10px rgba(124, 184, 124, 0.25);
  }

  .record__item--loss .record__badge {
    color: #f4f0e8;
    background: linear-gradient(135deg, #b85c5c 0%, #8f3f3f 100%);
    box-shadow: 0 0 10px rgba(184, 92, 92, 0.25);
  }

  .record__item--draw .record__badge {
    color: var(--chess-black);
    background: linear-gradient(135deg, var(--chess-cream) 0%, #9a9588 100%);
    box-shadow: 0 0 10px rgba(200, 194, 180, 0.15);
  }

  @media (max-width: 560px) {
    .card {
      padding: 1.25rem;
    }

    .profile {
      flex-direction: column;
      text-align: center;
    }

    .stats {
      grid-template-columns: 1fr;
    }
  }
  </style>