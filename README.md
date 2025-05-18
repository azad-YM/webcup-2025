# 🚀 Nom du projet

Application web construite avec **Laravel (Back-end)**, **React + Inertia.js (Front-end)** dans le cadre du concour [24h by webcup](https://24h.webcup.fr/) dans l'océan indien, édition 2025. 

---

## 📦 Stack technique

- **Laravel** (v10+) — Framework PHP back-end
- **Inertia.js** — Pont entre Laravel et React
- **React** (v18+) — Front-end JavaScript
- **Vite** — Bundler rapide pour le front
- **Tailwind CSS** — Framework CSS utilitaire
- **shadcn/ui** — Composants UI stylisés avec Radix et Tailwind

---

## 📁 Structure du projet

```

├── app/                # Contrôleurs, modèles Laravel
├── resources/js/       # Code React (pages, composants)
│   ├── Pages/
│   ├── Components/
│   └── ...
├── routes/web.php      # Routes Laravel (Inertia)
├── public/             # Assets publics
├── .env                # Variables d’environnement
├── vite.config.js      # Config Vite
└── ...

````

---

## 🚀 Installation

1. **Cloner le dépôt :**
```bash
git clone https://github.com/azad-YM/webcup-2025.git
cd webcup-2025
````

2. **Installer les dépendances backend :**

```bash
composer install
```

3. **Configurer l’environnement :**

```bash
cp .env.example .env
php artisan key:generate
```

4. **Configurer la base de données :**
   Modifier les variables dans `.env` :

```env
DB_DATABASE=nom_db
DB_USERNAME=utilisateur
DB_PASSWORD=mot_de_passe
```

5. **Installer les dépendances front-end :**

```bash
npm install
```

6. **Compiler les assets :**

```bash
npm run dev
```

7. **Lancer le serveur :**

```bash
php artisan serve
```

---

## 🔄 Commandes utiles

| Commande              | Description                    |
| --------------------- | ------------------------------ |
| `php artisan serve`   | Lance le serveur Laravel       |
| `npm run dev`         | Dev server React avec Vite     |
| `npm run build`       | Build des assets en production |
| `php artisan migrate` | Exécute les migrations         |

---

## 📚 Ressources utiles

* [Laravel Documentation](https://laravel.com/docs)
* [Inertia.js Documentation](https://inertiajs.com/)
* [React Documentation](https://react.dev/)
* [shadcn/ui Docs](https://ui.shadcn.com/)

---

## 🧑‍💻 Contribuer

1. Fork le repo
2. Crée une branche (`git checkout -b feature/ma-feature`)
3. Commit tes changements (`git commit -am 'Ajout de la feature'`)
4. Push ta branche (`git push origin feature/ma-feature`)
5. Crée une Pull Request

