Ce README vise à vous informer sur certaines fonctionnalités qui ne sont pas opérationnelles dans notre travail, ainsi que les raisons probables de ces dysfonctionnements.

Interceptor : Malgré nos efforts pour résoudre le problème et après être allé vous en parler, l'interceptor ne fonctionne toujours pas. Bien que nous ayons utilisé le même code que vous et entré les valeurs correctement, la raison de ce dysfonctionnement reste inconnue. En conséquence, nous avons préférer suivre votre conseil et indiquer individuellement le secret dans chaque header de requête.

Suppression de héros d'une équipe : Bien que cette fonctionnalité soit disponible côté front, elle ne supprime pas effectivement un héros. Nous avons constaté que la méthode de suppression ne renvoie pas d'erreur, mais renvoie plutôt l'équipe entière, et nous n'avons pas eu le temps de corriger cette erreur.

Connexion avec un héros : Nous avons rencontré des difficultés pour transmettre le cookie contenant le JWT. Bien que celui-ci soit théoriquement envoyé automatiquement et que nous ayons défini withCredentials à true dans la configuration d'axios (axios.service.js), il semble qu'ils ne soient pas transmis. Ce problème nous a empêchés de progresser dans la partie 5 du TP2 (de plus que les requêtes marchent avec POSTMAN).

Intégralité du TP3 : En raison d'un manque de temps, nous n'avons pas pu compléter cette partie du TP.

Nous espérons que ces informations vous seront utiles lors de l'évaluation de notre travail.