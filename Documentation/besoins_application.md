# Besoins de l'application — Chess Analytics Dashboard

> **Projet** : Chess Analytics Dashboard  
> **Stack** : Vue 3 · Node.js + Express · PostgreSQL · API Chess.com  
> **Auteur** : [ton nom]  
> **Date** : 2026-05-11  
> **Statut** : Draft

---

## Table des matières

1. [Contexte](#contexte)
2. [Besoins fonctionnels](#besoins-fonctionnels)
3. [Besoins non fonctionnels](#besoins-non-fonctionnels)
4. [Priorités et phases](#priorités-et-phases)

---

## Contexte

Application web personnelle permettant à un joueur d'échecs de visualiser et analyser ses parties Chess.com. L'utilisateur se connecte avec un compte applicatif (Google OAuth ou username/mot de passe), associe son pseudo Chess.com, et accède à un dashboard de statistiques interactif avec replay de parties.

---

## Besoins fonctionnels

Les besoins fonctionnels décrivent **ce que l'application fait** — les fonctionnalités visibles par l'utilisateur.

### F-01 · Authentification utilisateur

**Description**  
L'utilisateur peut créer un compte et se connecter via deux méthodes :
- Google OAuth (connexion en un clic)
- Username + mot de passe (stocké chiffré en base)

Une fois connecté, il renseigne son pseudo Chess.com dans les paramètres de son compte. Ce pseudo est utilisé par défaut à chaque connexion pour charger ses données.

**Comportement attendu**
- Vérification de l'existence du pseudo Chess.com via l'API publique avant de l'associer au compte
- L'utilisateur peut consulter les données d'un autre pseudo Chess.com via une recherche
- Les **5 derniers pseudos Chess.com consultés** sont mémorisés et disponibles en accès rapide
- Le pseudo par défaut reste celui associé au compte

**Critère d'acceptation**  
Un utilisateur peut se connecter, associer son pseudo Chess.com, et retrouver ses données à la connexion suivante sans ressaisie.

---

### F-02 · Import de l'historique des parties

**Description**  
Le backend récupère l'intégralité des parties d'un joueur via l'API Chess.com, parse le format PGN et stocke les données normalisées en base PostgreSQL.

**Comportement attendu**
- Déclenchement manuel par l'utilisateur (bouton "Importer mon historique")
- L'import se fait en arrière-plan — l'utilisateur reçoit une confirmation immédiate, pas d'attente bloquante
- Les parties déjà importées ne sont pas réimportées (vérification par identifiant unique)
- Formats supportés : Bullet, Blitz, Rapid, Classical

**Critère d'acceptation**  
Après import, toutes les parties du joueur sont consultables dans le dashboard sans rappel à Chess.com.

---

### F-03 · Synchronisation incrémentale

**Description**  
L'utilisateur peut mettre à jour ses données pour récupérer uniquement les parties jouées depuis le dernier import, sans réimporter tout l'historique.

**Comportement attendu**
- Le système mémorise la date et l'identifiant de la dernière partie importée
- La sync ne récupère que le delta (nouvelles parties uniquement)
- Déclenchement manuel ou automatique à la connexion (à décider)

**Critère d'acceptation**  
Une sync sur un compte actif prend moins de temps qu'un import complet et ne crée pas de doublons.

---

### F-04 · Winrate global et par couleur

**Description**  
Affichage du taux de victoire de l'utilisateur, global puis ventilé par couleur (Blancs / Noirs).

**Comportement attendu**
- Winrate global (victoires / total)
- Winrate séparé pour les Blancs et pour les Noirs
- Nombre de parties joué affiché pour chaque catégorie
- Filtrable par format de jeu (Bullet, Blitz, Rapid)

**Critère d'acceptation**  
Les chiffres correspondent à un calcul manuel effectué sur le même historique.

---

### F-05 · Analyse des ouvertures

**Description**  
Visualisation des ouvertures les plus jouées avec leur fréquence et leur winrate respectif, sous forme de graphique bar chart D3.

**Comportement attendu**
- Liste des ouvertures triée par fréquence (défaut) ou par winrate (au choix)
- Pour chaque ouverture : nom ECO, nombre de parties, winrate
- Filtrable par couleur (Blancs / Noirs) et par format

**Critère d'acceptation**  
Le graphique affiche au minimum les 10 ouvertures les plus jouées avec leurs statistiques exactes.

---

### F-06 · Évolution du rating Elo

**Description**  
Graphique en courbe (line chart D3) montrant l'évolution du Elo du joueur dans le temps.

**Comportement attendu**
- Axe X : date des parties · Axe Y : Elo
- Filtrable par format (Bullet, Blitz, Rapid — courbes séparées ou sélectionnables)
- Affichage du Elo actuel et du Elo max historique

**Critère d'acceptation**  
La courbe reflète fidèlement l'historique Elo extrait des parties importées.

---

### F-07 · Heatmap des heures de jeu

**Description**  
Visualisation en grille (jour de la semaine × heure) des moments où le joueur est le plus actif.

**Comportement attendu**
- Grille 7 × 24 (lundi→dimanche, 00h→23h)
- Intensité de couleur proportionnelle au nombre de parties jouées
- Optionnel : couleur basée sur le winrate à cette heure

**Critère d'acceptation**  
La heatmap identifie visuellement les créneaux de jeu les plus fréquents.

---

### F-08 · Bilan par adversaire

**Description**  
Tableau des adversaires les plus fréquents avec le bilan victoires / défaites / nulles.

**Comportement attendu**
- Triable par nombre de parties ou par bilan
- Affichage du Elo de l'adversaire au moment des parties

**Critère d'acceptation**  
Le bilan affiché correspond au résultat d'un décompte manuel sur l'historique importé.

---

### F-09 · Liste des parties consultables

**Description**  
Tableau paginé de toutes les parties importées avec filtres et accès au replay.

**Comportement attendu**
- Filtres : date, format, résultat (victoire / défaite / nulle), couleur jouée
- Pour chaque partie : adversaire, ouverture, résultat, Elo, durée, date
- Clic sur une partie → ouvre le replay

**Critère d'acceptation**  
L'utilisateur peut retrouver n'importe quelle partie de son historique en moins de 3 clics.

---

### F-10 · Replay interactif coup par coup

**Description**  
Échiquier interactif permettant de rejouer une partie coup par coup.

**Comportement attendu**
- Échiquier rendu avec `chessboard.js`
- Navigation : premier coup · coup précédent · coup suivant · dernier coup
- Le PGN est parsé par `chess.js` côté frontend pour reconstruire chaque position
- Affichage de la notation algébrique de chaque coup

**Critère d'acceptation**  
Toutes les positions d'une partie importée sont rejouables sans erreur de logique d'échecs.

---

## Besoins non fonctionnels

Les besoins non fonctionnels décrivent **comment l'application le fait** — qualité, sécurité, performance, maintenabilité.

---

### NF-01 · Cache base de données (Performance)

Les parties déjà importées sont lues depuis PostgreSQL. Le backend n'appelle Chess.com que si les données sont absentes ou explicitement obsolètes (sync demandée). Aucun appel Chess.com au chargement normal du dashboard.

---

### NF-02 · Temps de réponse (Performance)

Les endpoints qui lisent en base (stats, liste de parties) répondent en **moins de 500 ms** pour un historique de 1 000 parties. Les opérations longues (import, sync) sont déportées en jobs asynchrones.

---

### NF-03 · Secrets hors du dépôt Git (Sécurité)

Toutes les variables sensibles (URL de base de données, secrets JWT, config) sont dans un fichier `.env` ignoré par `.gitignore`. Un fichier `.env.example` documente les variables requises sans valeurs réelles. **Aucun secret ne doit apparaître dans l'historique Git.**

---

### NF-04 · Validation de toutes les entrées (Sécurité)

Chaque paramètre entrant (username, dates, pagination, format) est validé et borné côté backend avant tout traitement ou requête SQL. Aucune entrée utilisateur n'est passée directement à une requête SQL (requêtes paramétrées uniquement).

---

### NF-05 · Headers de sécurité HTTP (Sécurité)

Le backend utilise `Helmet.js` pour les headers de sécurité standards (CSP, X-Frame-Options, HSTS…) et une politique CORS restrictive avec origines explicites — jamais `*` en production.

---

### NF-06 · Rate limiting (Sécurité)

- **Côté backend** : limite par IP pour protéger contre les abus (ex. 100 req/min)
- **Côté Chess.com** : respect des limites de débit de l'API avec backoff exponentiel en cas de réponse 429

---

### NF-07 · Séparation stricte des couches (Maintenabilité)

Architecture en 4 couches distinctes, sans mélange :

| Couche | Responsabilité | Interdit |
|---|---|---|
| `routes/` | Déclarer les URLs et chaîner les middlewares | Logique métier, SQL |
| `controllers/` | Traduire HTTP ↔ services | SQL, appels Chess.com directs |
| `services/` | Logique métier et orchestration | Concepts HTTP (req/res) |
| `repositories/` | Accès SQL uniquement | Règles métier complexes |

---

### NF-08 · Migrations SQL versionnées (Maintenabilité)

Toute modification du schéma de base de données passe par un fichier de migration versionné dans `db/migrations/`. Aucune modification manuelle directe en base — ni en développement, ni en production.

---

### NF-09 · Gestion d'erreurs centralisée (Maintenabilité)

Un middleware Express unique intercepte toutes les erreurs et renvoie un format JSON cohérent sur tous les endpoints :

```json
{
  "error": {
    "code": "PLAYER_NOT_FOUND",
    "message": "Le joueur hikaru123 n'existe pas sur Chess.com",
    "requestId": "req-abc-123"
  }
}
```

Pas de blocs `try/catch` qui retournent des formats différents selon l'endpoint.

---

### NF-10 · Conventional Commits (Maintenabilité)

Tous les commits suivent la convention [Conventional Commits](https://www.conventionalcommits.org/) :

```
feat: ajouter le calcul du winrate par ouverture
fix: corriger le parsing des parties nulles en PGN
chore: mettre à jour les dépendances npm
docs: documenter les endpoints de l'API v1
```

---

### NF-11 · API versionnée (Extensibilité)

Tous les endpoints backend sont préfixés `/api/v1/` pour permettre d'introduire une v2 sans casser le frontend existant.

---

### NF-12 · Dockerisation (Extensibilité)

Le backend et PostgreSQL sont conteneurisés via `docker-compose` pour garantir un environnement identique entre développement et production. Un `docker compose up` suffit à démarrer l'ensemble du projet.

---

## Priorités et phases

| ID | Besoin | Priorité | Phase |
|---|---|---|---|
| F-01 | Authentification | 🔴 Haute | 1 |
| F-02 | Import historique | 🔴 Haute | 1 |
| F-03 | Sync incrémentale | 🔴 Haute | 1 |
| F-04 | Winrate | 🔴 Haute | 2 |
| F-05 | Ouvertures | 🔴 Haute | 2 |
| F-06 | Évolution Elo | 🔴 Haute | 2 |
| F-09 | Liste des parties | 🟡 Moyenne | 2 |
| F-10 | Replay interactif | 🟡 Moyenne | 2 |
| F-07 | Heatmap heures | 🟡 Moyenne | 3 |
| F-08 | Bilan adversaires | 🟢 Basse | 3 |
| NF-01 | Cache PostgreSQL | 🔴 Haute | 1 |
| NF-02 | Temps de réponse | 🟡 Moyenne | 2 |
| NF-03 | Secrets hors Git | 🔴 Haute | 1 |
| NF-04 | Validation entrées | 🔴 Haute | 1 |
| NF-05 | Headers sécurité | 🔴 Haute | 1 |
| NF-06 | Rate limiting | 🟡 Moyenne | 1 |
| NF-07 | Séparation couches | 🔴 Haute | 1 |
| NF-08 | Migrations SQL | 🔴 Haute | 1 |
| NF-09 | Erreurs centralisées | 🔴 Haute | 1 |
| NF-10 | Conventional Commits | 🟡 Moyenne | 1 |
| NF-11 | API versionnée | 🟡 Moyenne | 1 |
| NF-12 | Docker | 🟢 Basse | 3 |
