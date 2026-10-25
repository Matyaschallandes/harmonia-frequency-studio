# Harmonia Frequency Studio

Prototype de boutique responsive avec interface Assistant IA et Studio IA.

## Ce qui fonctionne dans la version GitHub Pages
- Interface responsive en français.
- Catalogue de démonstration et panier local (pas de paiement réel).
- Studio IA qui prépare et exporte un brouillon HTML dans le navigateur.
- Interface de chat en mode démonstration.
- Backend de départ dans `worker.js` pour Cloudflare Workers AI.

## Limites de GitHub Pages
GitHub Pages sert des fichiers statiques. Il ne peut pas exécuter du code serveur, protéger une clé secrète, gérer des commandes de façon sécurisée ou appeler un modèle avec une clé privée sans risque. Une vraie IA nécessite un backend hébergé séparément. L'écriture automatique dans GitHub nécessite une intégration OAuth/GitHub App sécurisée; ne place jamais un token GitHub dans le JavaScript public.

## Activer un assistant IA
1. Crée un compte Cloudflare et un Worker.
2. Ajoute `worker.js` comme fichier d'entrée du Worker.
3. Active/binde Workers AI sous le nom `AI` dans les paramètres du Worker et vérifie les quotas/conditions actuels.
4. Déploie le Worker et copie son URL.
5. Dans `index.html`, ajoute `window.HARMONIA_API_URL = "https://TON-WORKER.TON-SOUS-DOMAINE.workers.dev";` au début du script principal, avant les gestionnaires d'événements.
6. Teste le chat. Restreins CORS au domaine du site en production.

Les quotas gratuits, modèles et conditions de Cloudflare peuvent évoluer; vérifie-les dans ton tableau de bord. Ne pars pas du principe que la gratuité est illimitée.

## Pour une vraie boutique
- Ajouter les produits réels, prix, stocks, livraison, retours et coordonnées.
- Intégrer un prestataire de paiement avec un flux sécurisé; ne collecte pas les numéros de carte dans cette page.
- Ajouter confidentialité, conditions générales et mentions légales.
- Ajouter un backend/base de données pour comptes, commandes et catalogue.
- Pour modifier le dépôt GitHub directement depuis Studio IA, créer une application OAuth/GitHub App avec permissions minimales, côté serveur et consentement explicite avant chaque écriture.

## Déploiement
Dans Settings → Pages, sélectionne la branche `main` et le dossier `/ (root)`. Le site est servi depuis `index.html`.
