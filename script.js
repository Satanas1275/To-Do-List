document.addEventListener('DOMContentLoaded', function () {
    const formulaire = document.getElementById('formulaire');
    const zoneAFaire = document.getElementById('zoneAFaire');
    const zoneEnCours = document.getElementById('zoneEnCours');
    const zoneTermine = document.getElementById('zoneTermine');

    formulaire.addEventListener('submit', function (event) {
        event.preventDefault(); // Empêcher le formulaire de se soumettre normalement

        const nouvelleTache = formulaire.elements.tache.value.trim(); // Récupérer la valeur saisie dans le champ

        if (nouvelleTache !== '') {
            // Créer un nouveau div pour la tâche
            const tacheDiv = document.createElement('div');
            tacheDiv.classList.add('tache');

            // Cloner le modèle et l'afficher
            const template = document.getElementById('template');
            const nouveauTemplate = template.cloneNode(true);
            nouveauTemplate.style.display = 'block';

            // Modifier le texte de la tâche
            const intitule = nouveauTemplate.querySelector('#intitule');
            intitule.textContent = nouvelleTache;

            // Ajouter la nouvelle tâche à la liste "À faire"
            zoneAFaire.appendChild(nouveauTemplate);

            // Effacer le champ du formulaire après l'ajout de la tâche
            formulaire.reset();

            // Ajouter un écouteur d'événements pour le bouton de suppression
            const btnSupprimer = nouveauTemplate.querySelector('#btnSupprimer');
            btnSupprimer.addEventListener('click', function () {
                nouveauTemplate.remove(); // Supprimer la tâche
            });

            // Ajouter un écouteur d'événements pour le changement de statut
            const selectStatut = nouveauTemplate.querySelector('#statut');
            selectStatut.addEventListener('change', function () {
                const statut = selectStatut.value;
                if (statut === 'encours') {
                    zoneEnCours.appendChild(nouveauTemplate); // Déplacer vers "En cours"
                } else if (statut === 'termine') {
                    zoneTermine.appendChild(nouveauTemplate); // Déplacer vers "Terminé"
                } else {
                    zoneAFaire.appendChild(nouveauTemplate); // Déplacer vers "À faire"
                }
            });
        }
    });
});
