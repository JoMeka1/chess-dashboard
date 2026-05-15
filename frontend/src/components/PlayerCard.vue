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
    --license-ink: #0e1420;
    --license-navy-dark: #121a2e;
    --license-navy: #1a2744;
    --license-navy-mid: #243b5c;
    --license-navy-light: #2e4f78;
    --license-gold: #d4a84b;
    --license-gold-light: #f0d078;
    --license-cream: #f5e6c8;
    --license-parchment: #e8d5a3;
    --font-numbers: system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;

    position: relative;
    max-width: 720px;
    margin: 0 auto;
    padding: 2.65rem 1.35rem 1.25rem;
    background:
      linear-gradient(160deg, var(--license-navy-light) 0%, var(--license-navy) 35%, var(--license-navy-dark) 100%);
    border: 3px solid var(--license-gold);
    border-radius: 6px;
    outline: 1px solid var(--license-gold-light);
    outline-offset: 5px;
    box-shadow:
      inset 0 0 80px rgba(0, 0, 0, 0.2),
      inset 0 2px 0 rgba(255, 255, 255, 0.08),
      0 24px 64px rgba(0, 0, 0, 0.55),
      0 0 48px rgba(212, 168, 75, 0.12);
    color: var(--license-cream);
    font-family: system-ui, -apple-system, 'Segoe UI', sans-serif;
    overflow: hidden;
  }

  .card::before {
    content: '♜  OFFICIAL · NON-OFFICIAL CHESS LICENSE  ♜';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    padding: 0.45rem 1rem;
    font-family: Georgia, 'Times New Roman', serif;
    font-size: 0.62rem;
    font-weight: 700;
    letter-spacing: 0.22em;
    text-align: center;
    color: var(--license-ink);
    background: linear-gradient(
      90deg,
      #8b6914 0%,
      var(--license-gold-light) 25%,
      var(--license-gold) 50%,
      var(--license-gold-light) 75%,
      #8b6914 100%
    );
    border-bottom: 2px solid var(--license-gold);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
  }

  .card::after {
    content: '';
    position: absolute;
    inset: 10px;
    border: 1px solid rgba(240, 208, 120, 0.2);
    border-radius: 2px;
    pointer-events: none;
  }

  .profile {
    display: flex;
    align-items: center;
    gap: 1.5rem;
    padding: 0.75rem;
    margin-bottom: 0.85rem;
    background: rgba(14, 20, 32, 0.45);
    border: 2px solid rgba(212, 168, 75, 0.45);
    border-radius: 4px;
  }

  .profile img {
    width: 88px;
    height: 100px;
    border-radius: 4px;
    object-fit: cover;
    flex-shrink: 0;
    border: 2px solid var(--license-gold);
    box-shadow:
      0 0 0 3px rgba(14, 20, 32, 0.6),
      4px 4px 0 rgba(0, 0, 0, 0.3);
  }

  .info {
    min-width: 0;
  }

  .info .title {
    display: inline-block;
    margin-bottom: 0.4rem;
    padding: 0.2rem 0.6rem;
    font-family: Georgia, 'Times New Roman', serif;
    font-size: 0.68rem;
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--license-ink);
    background: linear-gradient(135deg, var(--license-gold-light) 0%, var(--license-gold) 100%);
    border: 1px solid #8b6914;
    border-radius: 2px;
  }

  .info h2 {
    margin: 0 0 0.3rem;
    font-family: Georgia, 'Times New Roman', serif;
    font-size: 1.45rem;
    font-weight: 700;
    letter-spacing: 0.04em;
    color: var(--license-cream);
    line-height: 1.2;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.4);
  }

  .info p {
    margin: 0.15rem 0;
    font-size: 0.88rem;
    color: rgba(245, 230, 200, 0.75);
  }

  .info p:first-of-type {
    color: var(--license-gold-light);
    font-weight: 600;
    letter-spacing: 0.04em;
  }

  .info p:last-child {
    font-family: var(--font-numbers);
    font-variant-numeric: tabular-nums;
    font-weight: 600;
  }

  .stats {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 0.55rem;
  }

  .format {
    padding: 0.7rem 0.5rem;
    background: linear-gradient(180deg, var(--license-parchment) 0%, #dcc99a 100%);
    border: 2px solid var(--license-gold);
    border-radius: 3px;
    text-align: center;
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.4);
    transition: transform 0.15s ease, box-shadow 0.15s ease;
  }

  .format:hover {
    transform: translateY(-2px);
    box-shadow:
      inset 0 1px 0 rgba(255, 255, 255, 0.4),
      0 6px 16px rgba(0, 0, 0, 0.25);
  }

  .format h3 {
    margin: 0 0 0.6rem;
    padding-bottom: 0.4rem;
    font-family: Georgia, 'Times New Roman', serif;
    font-size: 0.68rem;
    font-weight: 700;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: var(--license-navy-dark);
    border-bottom: 1px solid rgba(36, 59, 92, 0.4);
  }

  .format p:nth-of-type(1) {
    margin: 0 0 0.35rem;
    font-family: var(--font-numbers);
    font-size: 1.75rem;
    font-weight: 700;
    line-height: 1.1;
    letter-spacing: 0.02em;
    font-variant-numeric: tabular-nums;
    color: var(--license-ink);
  }

  .format p:nth-of-type(2) {
    margin: 0 0 0.55rem;
    font-family: var(--font-numbers);
    font-size: 0.8rem;
    font-weight: 600;
    font-variant-numeric: tabular-nums;
    color: rgba(18, 26, 46, 0.85);
    letter-spacing: 0.02em;
  }

  .record {
    display: flex;
    justify-content: center;
    gap: 0.35rem;
    margin: 0;
    padding-top: 0.55rem;
    border-top: 1px solid rgba(36, 59, 92, 0.3);
  }

  .record__item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.25rem;
    flex: 1;
    min-width: 0;
  }

  .record__badge {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 1.3rem;
    height: 1.3rem;
    font-family: var(--font-numbers);
    font-size: 0.65rem;
    font-weight: 800;
    border-radius: 2px;
    line-height: 1;
    border: 1px solid rgba(0, 0, 0, 0.15);
  }

  .record__value {
    font-family: var(--font-numbers);
    font-size: 0.9rem;
    font-weight: 700;
    font-variant-numeric: tabular-nums;
    letter-spacing: 0.02em;
    color: var(--license-ink);
  }

  .record__item--win .record__badge {
    color: var(--license-cream);
    background: linear-gradient(135deg, var(--license-navy-light) 0%, var(--license-navy-dark) 100%);
  }

  .record__item--loss .record__badge {
    color: var(--license-cream);
    background: linear-gradient(135deg, #a84848 0%, #6e2828 100%);
  }

  .record__item--draw .record__badge {
    color: var(--license-ink);
    background: linear-gradient(135deg, #9a9588 0%, #6e6a62 100%);
  }

  @media (max-width: 560px) {
    .card {
      padding: 2.5rem 1rem 1rem;
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