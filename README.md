# React JS


**Commandes utiles:**

```
npm install
npm start
npm run dev:api
npx generate-react-cli component COMPONENT_NAME 
```



## Fondamentaux

- NodeJS + NPM (LTS)
- VS Code
- Composant et Render State
    - npm create vite
    - react devtools https://react.dev/learn/react-developer-tools
    - redux devtools https://github.com/reduxjs/redux-devtools

## Architecture d'une Application React avec TypeScript et Redux

### Project

<!-- LINE_COUNT_PLACEHOLDER_1 -->

**Lines of Code:** `1647`  
**Project Size:** Compact utility 🛠️

| Extension | Files | Effective LOC |
|-----------|--------|----------------:|
| `.tsx` | 51 | 558 |
| `.md` | 9 | 342 |
| `.mdx` | 1 | 327 |
| `.ts` | 16 | 270 |
| `.css` | 7 | 145 |
| `.avif` | 1 | 5 |
| `no_ext` | 12 | 0 |
| **Total** | **97** | **1647** |

<!-- LINE_COUNT_PLACEHOLDER_2 -->

### TypeScript

TypeScript est un sur-ensemble de JavaScript qui ajoute un typage statique optionnel. Dans une application React à moyenne ou grande échelle, le typage permet :

- **Meilleure lisibilité et maintenabilité** du code
- **Détection d’erreurs à la compilation**
- **Auto-complétion et navigation améliorée** dans les éditeurs de code
- Une **documentation implicite** via les types

Cela est particulièrement utile pour les projets en équipe et pour les applications avec une logique métier complexe.

### Redux et les Design Patterns associés

Redux est un conteneur d’état prévisible pour les applications JavaScript. Il repose sur plusieurs principes de conception solides issus des design patterns classiques :

- **Flux unidirectionnel des données** (inspiré de l’architecture Flux de Facebook)
- **Command Query Responsibility Segregation (CQRS)** : séparation des lectures (selectors) et des écritures (actions)
- **Event Sourcing** : les actions représentent des événements immuables
- **Mediator Pattern** : le `store` agit comme intermédiaire entre les vues et la logique métier

Ces choix favorisent la **prévisibilité**, la **testabilité** et la **débogabilité** de l’application.

---

## Structure de l’Application : Presentation vs Container vs View

Voici une proposition d’architecture modulaire basée sur une séparation claire des responsabilités.

```
src/
│
├── components/           # Composants de présentation purs (Presentation)
│   └── Button.tsx
│   └── UserCard.tsx
│
├── containers/           # Composants connectés à Redux (Container)
│   └── UserListContainer.tsx
│
├── views/                # Pages ou routes (View)
│   └── HomePage.tsx
│   └── ProfilePage.tsx
│
├── store/                # Redux store, reducers, slices, actions
│   └── index.ts
│   └── userSlice.ts
│
├── hooks/                # Hooks personnalisés
│   └── useUser.ts
│
├── types/                # Types globaux TypeScript
│   └── User.ts
│
└── App.tsx
```

### Presentation Components (`components/`)

```
npx generate-react-cli component COMPONENT_NAME
```

- Composants **purs** : pas de logique métier, pas d’accès au store
- Reçoivent **uniquement des props**
- Facilement testables et réutilisables

**Exemple :**
```tsx
// UserCard.tsx
type Props = {
  name: string;
  avatarUrl: string;
};

export const UserCard: React.FC<Props> = ({ name, avatarUrl }) => (
  <div>
    <img src={avatarUrl} alt={name} />
    <p>{name}</p>
  </div>
);
```

---

### Container Components (`containers/`)


```
npx generate-react-cli component COMPONENT_NAME --type=container
```

- Composants **connectés au store Redux**
- Chargent les données, dispatchent des actions
- Fournissent des props aux composants de présentation

**Exemple :**
```tsx
// UserListContainer.tsx
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { fetchUsers } from "@/store/userSlice";
import { UserCard } from "@/components/UserCard";

export const UserListContainer: React.FC = () => {
  const users = useAppSelector(state => state.user.list);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <>
      {users.map(user => (
        <UserCard key={user.id} name={user.name} avatarUrl={user.avatar} />
      ))}
    </>
  );
};
```

---

### Views (`views/`)

```
npx generate-react-cli component COMPONENT_NAME --type=view
```

- Composants de **haut niveau** représentant une page ou une route
- Combinent les **containers** et parfois des **présentationnels**
- Peuvent inclure de la logique de navigation ou de layout

**Exemple :**
```tsx
// HomePage.tsx
import { UserListContainer } from "@/containers/UserListContainer";

export const HomePage: React.FC = () => (
  <main>
    <h1>Accueil</h1>
    <UserListContainer />
  </main>
);
```

---

## Conclusion

Cette architecture permet de :

- Séparer clairement les responsabilités
- Réutiliser les composants visuels
- Rendre les composants de présentation testables
- Centraliser la logique métier dans Redux
- Favoriser une montée en complexité maîtrisée

Grâce à l’usage combiné de **TypeScript**, de **Redux** et d’une **architecture en couches**, le développement reste fluide, maintenable et scalable dans le temps.