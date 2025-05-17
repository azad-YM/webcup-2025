<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\FarewellPage;

class FarewellPageSeeder extends Seeder
{
    public function run(): void
    {
        FarewellPage::create([
            'title' => 'J\'ai quitté mon CDI pour devenir potier',
            'excerpt' => 'Après 7 ans passés dans une boîte que je n’aimais plus, j’ai décidé de partir. Sans plan B.',
            'slug' => 'maison-dix-hair',
            'content' => 'Ce matin, j’ai rendu mon badge, mon ordi, et mes illusions. Le bureau, les open spaces, les réunions sans fin… c’est terminé. À partir de demain, je façonne de l’argile. Pour de vrai. Merci à celles et ceux qui m\'ont supporté dans cette transition.',
            'mood_id' => 1,
            'author_id' => 1,
            'song' => 'https://www.blin.com/',
            'color' => 'bg-rose-500',
            'likes' => 4692,
            'views' => 12876,
        ]);

        FarewellPage::create([
            'title' => 'LinkedIn m’a banni après un post sincère',
            'excerpt' => 'Je voulais juste parler de burn-out. Ils ont supprimé mon compte.',
            'slug' => 'element-suffire',
            'content' => 'J’ai partagé mon ressenti, mes limites, mes galères de free-lance. Et en retour ? Mon compte supprimé pour "contenu inapproprié". Si même les réseaux pros ne tolèrent plus la vulnérabilité, où va-t-on ?',
            'mood_id' => 2,
            'author_id' => 3,
            'song' => 'https://didier.com/',
            'color' => 'bg-amber-500',
            'likes' => 3731,
            'views' => 1702,
        ]);

        FarewellPage::create([
            'title' => 'Elle m’a quitté… par SMS',
            'excerpt' => '3 ans ensemble. Et un message de 4 lignes pour tout effacer.',
            'slug' => 'rupture-sms',
            'content' => 'Je l’aimais fort, vraiment. Mais visiblement, pas assez pour mériter un vrai au revoir. Ce n’est pas la fin que j’aurais voulu, mais c’est celle que j’ai eue. Alors voici mon dernier mot, ici. Pour tourner la page, pour de vrai.',
            'mood_id' => 5,
            'author_id' => 2,
            'song' => 'https://www.le.fr/',
            'color' => 'bg-pink-500',
            'likes' => 3054,
            'views' => 4953,
        ]);

        FarewellPage::create([
            'title' => 'Au revoir Slack, bonjour paix mentale',
            'excerpt' => 'J’ai quitté Slack. Et j’ai retrouvé le silence.',
            'slug' => 'au-revoir-slack',
            'content' => 'Les @channel à 22h. Les "juste une petite question". Les messages en threads qui deviennent des mini-meetings. Non. J’ai désinstallé, et j’ai respiré. Slack, c’est fini.',
            'mood_id' => 4,
            'author_id' => 2,
            'song' => 'https://www.tranquille.net/',
            'color' => 'bg-blue-500',
            'likes' => 1222,
            'views' => 9801,
        ]);

        FarewellPage::create([
            'title' => 'Mon projet de startup est mort',
            'excerpt' => '2 ans, 3 pivots, 1 burnout. Et la page se tourne.',
            'slug' => 'startup-fin',
            'content' => 'J’y ai mis tout mon temps, toute mon énergie, tout mon argent. Mais parfois, ça ne suffit pas. On n’a pas trouvé le marché. Je n’ai pas trouvé l’équilibre. Ce n’est pas un échec, c’est une fin. Et c’est OK.',
            'mood_id' => 3,
            'author_id' => 1,
            'song' => 'https://www.fintech.fail/',
            'color' => 'bg-indigo-500',
            'likes' => 4320,
            'views' => 14011,
        ]);

        FarewellPage::create([
            'title' => 'J’ai dit adieu à mon coloc toxique',
            'excerpt' => 'Il volait ma bouffe et mes bougies. Fallait que ça cesse.',
            'slug' => 'coloc-toxique',
            'content' => '3 mois à vivre avec un gars qui confond coloc et colocataire tyrannique. J’ai tenu bon. Jusqu’à ce matin. Je suis parti avec mon thé, mon tapis, et ma dignité. La paix n’a pas de prix.',
            'mood_id' => 6,
            'author_id' => 3,
            'song' => 'https://www.solitude.fr/',
            'color' => 'bg-yellow-500',
            'likes' => 2198,
            'views' => 8754,
        ]);

        FarewellPage::create([
            'title' => 'Fin de mon aventure Twitch',
            'excerpt' => 'Les trolls ont eu ma peau. J’arrête le stream.',
            'slug' => 'bye-twitch',
            'content' => 'Je ne streamais pas pour les vues, mais pour le partage. Sauf qu’à force de recevoir des insultes, des dox, des menaces… l’envie a disparu. Je laisse le micro, mais pas mes valeurs.',
            'mood_id' => 7,
            'author_id' => 2,
            'song' => 'https://www.trollfini.tv/',
            'color' => 'bg-purple-500',
            'likes' => 3881,
            'views' => 13432,
        ]);

        FarewellPage::create([
            'title' => 'Mon couple est mort le jour de notre déménagement',
            'excerpt' => 'Il n’est jamais venu. Et il ne s’est jamais excusé.',
            'slug' => 'mort-couple-demenagement',
            'content' => 'On devait emménager ensemble. Une nouvelle vie. J’attendais devant l’immeuble. Il n’est pas venu. Juste un texto : "Je crois qu’on s’est emballés." Rien d’autre. J’ai pleuré. Puis j’ai signé seule le bail. Et j’ai avancé.',
            'mood_id' => 1,
            'author_id' => 1,
            'song' => 'https://www.je-me-reconstruis.fr/',
            'color' => 'bg-rose-500',
            'likes' => 3421,
            'views' => 10020,
        ]);
    }

}
