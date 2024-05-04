document.addEventListener('DOMContentLoaded', function () {
    const formulaire = document.getElementById('formulaire');
    const zoneAFaire = document.getElementById('zoneAFaire');
    const zoneEnCours = document.getElementById('zoneEnCours');
    const zoneTermine = document.getElementById('zoneTermine');

    // Fonction pour sauvegarder les tâches dans le stockage local
    function sauvegarderTaches() {
        const taches = [];
        document.querySelectorAll('.tache').forEach(function (tache) {
            taches.push({
                intitule: tache.querySelector('#intitule').textContent,
                statut: tache.querySelector('#statut').value
            });
        });
        localStorage.setItem('taches', JSON.stringify(taches));
    }

    // Fonction pour charger les tâches depuis le stockage local
    function chargerTaches() {
        const taches = JSON.parse(localStorage.getItem('taches')) || [];
        taches.forEach(function (tache) {
            const nouveauTemplate = document.getElementById('template').cloneNode(true);
            nouveauTemplate.style.display = 'block';
            nouveauTemplate.querySelector('#intitule').textContent = tache.intitule;
            nouveauTemplate.querySelector('#statut').value = tache.statut;
            if (tache.statut === 'afaire') {
                zoneAFaire.appendChild(nouveauTemplate);
            } else if (tache.statut === 'encours') {
                zoneEnCours.appendChild(nouveauTemplate);
            } else {
                zoneTermine.appendChild(nouveauTemplate);
            }
        });
    }

    // Charger les tâches au chargement de la page
    chargerTaches();

    formulaire.addEventListener('submit', function (event) {
        event.preventDefault(); // Empêcher le formulaire de se soumettre normalement

        const nouvelleTache = formulaire.elements.tache.value.trim(); // Récupérer la valeur saisie dans le champ

        if (nouvelleTache !== '') {
            const nouveauTemplate = document.getElementById('template').cloneNode(true);
            nouveauTemplate.style.display = 'block';
            nouveauTemplate.querySelector('#intitule').textContent = nouvelleTache;
            zoneAFaire.appendChild(nouveauTemplate);
            formulaire.reset();

            // Sauvegarder les tâches après l'ajout d'une nouvelle tâche
            sauvegarderTaches();
        }
    });

    // Sauvegarder les tâches lorsqu'un changement de statut est effectué
    document.querySelectorAll('.tache select').forEach(function (select) {
        select.addEventListener('change', sauvegarderTaches);
    });

    // Ajouter un écouteur d'événements pour le bouton de suppression
    document.querySelectorAll('.tache button').forEach(function (btnSupprimer) {
        btnSupprimer.addEventListener('click', function () {
            btnSupprimer.closest('.tache').remove();
            sauvegarderTaches();
        });
    });
});

