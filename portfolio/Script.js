document.addEventListener('DOMContentLoaded', () => {
    console.log('Le portfolio est prêt à être exploré !');

    // Sélection des éléments du DOM
    const searchButton = document.querySelector('#searchButton');
    const searchInput = document.querySelector('#searchInput');
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav a');

    // Fonction pour normaliser le texte (supprime les accents et met en minuscule)
    function normalizeText(text) {
        return text
            .toLowerCase()
            .normalize("NFD") // Décompose les accents
            .replace(/[\u0300-\u036f]/g, ""); // Supprime les accents
    }

    // Fonction de recherche améliorée
    function performSearch() {
        const searchTerm = normalizeText(searchInput.value.trim());

        if (!searchTerm) {
            alert('Veuillez entrer un mot-clé à rechercher.');
            return;
        }

        let found = false;

        // Recherche dans les sections
        sections.forEach(section => {
            if (normalizeText(section.textContent).includes(searchTerm)) {
                section.scrollIntoView({ behavior: 'smooth' });
                found = true;
            }
        });

        // Recherche dans les liens de navigation
        navLinks.forEach(link => {
            if (normalizeText(link.textContent).includes(searchTerm)) {
                const href = link.getAttribute('href');
                const targetSection = document.querySelector(href);
                if (targetSection) {
                    targetSection.scrollIntoView({ behavior: 'smooth' });
                    found = true;
                }
            }
        });

        // Message si aucun résultat n'est trouvé
        if (!found) {
            alert(`Aucun résultat trouvé pour : "${searchInput.value}"`);
        }
    }

    // Déclencher la recherche au clic sur le bouton
    searchButton.addEventListener('click', performSearch);

    // Déclencher la recherche en appuyant sur "Entrée"
    searchInput.addEventListener('keydown', (event) => {
        if (event.key === "Enter") {
            event.preventDefault(); // Empêche la soumission d'un éventuel formulaire
            performSearch();
        }
    });
});
