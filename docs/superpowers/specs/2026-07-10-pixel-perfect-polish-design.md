# Révision pixel perfect du portfolio

## But

Faire une passe de finition sur l’ensemble du portfolio sans modifier son échelle, sa structure ni son identité pixel art. Le site actuel sert de référence. Les corrections techniques peuvent être appliquées directement lorsqu’elles résolvent un défaut mesurable ; les changements graphiques sont regroupés dans une comparaison avant/après pour validation.

## Principes

- Préserver les tailles de police, la densité des pages et les proportions actuelles.
- Conserver les angles courts, les contours francs, les ombres décalées et les animations qui participent déjà au style.
- Traiter les règles de `make-interfaces-feel-better` comme des hypothèses à vérifier, pas comme un système à imposer.
- Éviter tout rendu de produit SaaS lisse, arrondi ou générique.
- Respecter `prefers-reduced-motion` et ne pas ajouter de dépendance d’animation.
- Isoler les essais sur une branche dédiée afin que l’état actuel reste récupérable à tout moment.

## Priorités typographiques

Trois zones présentent un défaut visible et passent en premier :

1. les libellés et compteurs des tags sur l’accueil ;
2. le sommaire latéral des pages projet et laboratoire ;
3. les noms de marques, franchises et studios en capitales sur la page À propos.

Le diagnostic vérifiera la police réellement utilisée, la taille rendue, la hauteur de ligne, le crénage, les transformations CSS, les coordonnées fractionnaires et l’antialiasing. `Silkscreen` doit rester net et pixelisé. `Space Mono` et le texte long peuvent conserver un lissage adapté à la lecture si la comparaison montre un gain réel. Le lissage ne sera donc pas appliqué uniformément à toutes les familles.

## Audit global

L’audit couvre les composants et les pages principales : accueil, index des projets, index du laboratoire, détail projet, détail laboratoire et À propos. Il contrôle :

- wrapping des titres et courts paragraphes ;
- netteté des polices et stabilité des nombres dynamiques ;
- alignements optiques des icônes et libellés ;
- taille des zones tactiles ;
- cohérence des cadres, images et surfaces imbriquées ;
- transitions limitées aux propriétés réellement animées ;
- animations interactives interruptibles ;
- effets d’entrée, de sortie et états pressés ;
- comportement clavier, focus visible et réduction des mouvements.

Les rayons concentriques, ombres diffuses et contours d’image proposés par le skill ne seront retenus que s’ils renforcent le style existant. Les bordures de séparation et les ombres pixel franches ne seront pas remplacées par principe.

## Comparaison visuelle

Une planche compacte regroupera les changements graphiques sur trois surfaces représentatives :

- accueil : tags et cartes ;
- article : sommaire, titre, média et appel à l’action ;
- À propos : listes en capitales, galerie et formulaire.

La planche distinguera l’état actuel, les corrections techniques et les variantes graphiques optionnelles. Adrien pourra valider ou rejeter chaque famille sans bloquer les autres. Les différences trop fines pour une maquette seront montrées sur des captures à l’échelle 100 % ou agrandies avec une indication claire du zoom.

## Mise en œuvre

Le travail suivra quatre lots :

1. établir les captures de référence et relever les causes des défauts typographiques ;
2. corriger les défauts techniques et vérifier le rendu aux tailles d’écran principales ;
3. préparer en parallèle les améliorations graphiques cohérentes avec le style ;
4. présenter une comparaison groupée, recueillir les choix puis nettoyer la branche finale.

Les styles communs iront dans `src/styles/global.css` lorsqu’ils concernent tout le site. Les règles propres à un composant resteront locales. Aucun changement de contenu éditorial n’est prévu.

## Vérification

La passe est terminée lorsque :

- les trois zones prioritaires sont nettes à 100 % de zoom sur un écran standard ;
- le build Astro réussit ;
- les pages principales restent lisibles sur mobile et bureau ;
- le clavier, le focus et `prefers-reduced-motion` restent fonctionnels ;
- aucune variation graphique n’est conservée sans validation ;
- le rapport final présente chaque modification dans des tableaux Avant/Après, groupés par principe du skill.
