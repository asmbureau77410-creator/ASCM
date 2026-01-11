/* ========================================
   CHARGEMENT DES COMPOSANTS (Header & Footer)
======================================== */

// Fonction pour charger les composants
function loadComponents() {
    // Charge le header
    fetch('components/header.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('header-placeholder').innerHTML = data;
        })
        .catch(error => console.error('Erreur chargement header:', error));

    // Charge le footer
    fetch('components/footer.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('footer-placeholder').innerHTML = data;
        })
        .catch(error => console.error('Erreur chargement footer:', error));
}

// Appeler la fonction au chargement de la page
document.addEventListener('DOMContentLoaded', loadComponents);
/* ========================================
   SCRIPTS.JS - FICHIER JAVASCRIPT PRINCIPAL
   Gestion de toutes les interactions du site
======================================== */

console.log('🚀 Mon site est en ligne !');

/* ========================================
   SMOOTH SCROLL POUR LA NAVIGATION
======================================== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

/* ========================================
   MODULE 1 : FRISE CHRONOLOGIQUE
   Utilisé sur: Asso_histoire.html
======================================== */

if (document.querySelector('.timeline-event')) {
    const timelineEvents = document.querySelectorAll('.timeline-event');
    const timelineCards = document.querySelectorAll('.timeline-card');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    let currentTimelineIndex = 0;

    function showTimelineEvent(index) {
        timelineEvents.forEach(event => event.classList.remove('active'));
        timelineCards.forEach(card => card.classList.remove('active'));
        
        timelineEvents[index].classList.add('active');
        timelineCards[index].classList.add('active');
        
        currentTimelineIndex = index;
        updateTimelineButtons();
        
        timelineCards[index].scrollIntoView({ 
            behavior: 'smooth', 
            block: 'nearest' 
        });
    }

    function updateTimelineButtons() {
        if (prevBtn && nextBtn) {
            prevBtn.disabled = currentTimelineIndex === 0;
            nextBtn.disabled = currentTimelineIndex === timelineEvents.length - 1;
        }
    }

    timelineEvents.forEach((event, index) => {
        event.addEventListener('click', () => {
            showTimelineEvent(index);
        });
    });

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            if (currentTimelineIndex > 0) {
                showTimelineEvent(currentTimelineIndex - 1);
            }
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            if (currentTimelineIndex < timelineEvents.length - 1) {
                showTimelineEvent(currentTimelineIndex + 1);
            }
        });
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft' && currentTimelineIndex > 0) {
            showTimelineEvent(currentTimelineIndex - 1);
        }
        if (e.key === 'ArrowRight' && currentTimelineIndex < timelineEvents.length - 1) {
            showTimelineEvent(currentTimelineIndex + 1);
        }
    });

    updateTimelineButtons();
}

/* ========================================
   MODULE 2 : ORGANIGRAMME INTERACTIF
   Utilisé sur: Asso_equipe.html
======================================== */

if (document.querySelector('[data-node]')) {
    const nodeData = {
        ascm: {
            icon: '🏛️',
            title: 'ASCM',
            description: "L'Association Sportive & Culturelle de Marne est une organisation dynamique qui rassemble étudiants et passionnés autour de projets culturels et sportifs."
        },
        adherents: {
            icon: '👥',
            title: 'Les Adhérents',
            description: "Les adhérents sont le cœur de l'association. Ils participent aux activités, votent lors des assemblées générales et peuvent se porter candidats pour intégrer le bureau."
        },
        bureau: {
            icon: '📋',
            title: 'Le Bureau',
            description: "Le bureau est l'instance dirigeante de l'association. Il est élu chaque année par l'assemblée générale."
        },
        permanent: {
            icon: '⭐',
            title: 'Bureau Permanent',
            description: "Le bureau permanent assure la gestion quotidienne de l'association."
        },
        benevoles: {
            icon: '🤝',
            title: 'Les Bénévoles',
            description: "Les bénévoles interviennent de manière ponctuelle ou périodique."
        },
        president: {
            icon: '👑',
            title: 'Le ou La Président.e',
            description: "Le président ou la présidente représente l'association auprès des tiers."
        },
        tresorier: {
            icon: '💰',
            title: 'Le ou La Trésorier.e',
            description: "Le trésorier ou la trésorière gère les finances de l'association."
        },
        secretaire: {
            icon: '📝',
            title: 'Le ou La Secrétaire',
            description: "Le secrétaire ou la secrétaire s'occupe de la gestion administrative."
        }
    };

    const allNodes = document.querySelectorAll('[data-node]');
    const infoPanel = document.getElementById('infoPanel');
    const level3Container = document.getElementById('level3Container');
    const level4Container = document.getElementById('level4Container');
    const resetBtn = document.getElementById('resetBtn');
    const bureauNode = document.querySelector('[data-node="bureau"]');
    const permanentNode = document.querySelector('[data-node="permanent"]');

    function updateOrgInfo(nodeKey) {
        if (infoPanel && nodeData[nodeKey]) {
            const data = nodeData[nodeKey];
            infoPanel.innerHTML = `
                <h3><span class="icon-large">${data.icon}</span> ${data.title}</h3>
                <p>${data.description}</p>
            `;
        }
    }

    allNodes.forEach(node => {
        node.addEventListener('click', function(e) {
            e.stopPropagation();
            const nodeKey = this.getAttribute('data-node');
            
            allNodes.forEach(n => n.classList.remove('active'));
            this.classList.add('active');
            updateOrgInfo(nodeKey);
            
            if (nodeKey === 'bureau') {
                if (level3Container) level3Container.classList.add('show');
                if (bureauNode) bureauNode.classList.add('active');
            } else if (nodeKey === 'permanent') {
                if (level3Container) level3Container.classList.add('show');
                if (level4Container) level4Container.classList.add('show');
                if (bureauNode) bureauNode.classList.add('active');
                if (permanentNode) permanentNode.classList.add('active');
            } else if (['president', 'tresorier', 'secretaire'].includes(nodeKey)) {
                if (level3Container) level3Container.classList.add('show');
                if (level4Container) level4Container.classList.add('show');
                if (bureauNode) bureauNode.classList.add('active');
                if (permanentNode) permanentNode.classList.add('active');
            } else if (nodeKey === 'benevoles') {
                if (level3Container) level3Container.classList.add('show');
                if (bureauNode) bureauNode.classList.add('active');
            }
        });
    });

    if (resetBtn) {
        resetBtn.addEventListener('click', function() {
            if (level3Container) level3Container.classList.remove('show');
            if (level4Container) level4Container.classList.remove('show');
            
            allNodes.forEach(n => n.classList.remove('active'));
            
            const ascmNode = document.querySelector('[data-node="ascm"]');
            if (ascmNode) ascmNode.classList.add('active');
            
            updateOrgInfo('ascm');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    updateOrgInfo('ascm');
}

/* ========================================
   MODULE 3 : ACCORDÉON FAQ
   Utilisé sur: Asso_FAQ.html
======================================== */

if (document.querySelector('.accordion-item')) {
    const accordionItems = document.querySelectorAll('.accordion-item');

    accordionItems.forEach(item => {
        const header = item.querySelector('.accordion-header');
        
        if (header) {
            header.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                
                if (isActive) {
                    item.classList.remove('active');
                } else {
                    item.classList.add('active');
                }
            });

            header.setAttribute('tabindex', '0');
            header.setAttribute('role', 'button');
            header.setAttribute('aria-expanded', 'false');
            
            header.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    header.click();
                    
                    const isActive = item.classList.contains('active');
                    header.setAttribute('aria-expanded', isActive);
                }
            });
        }
    });
}

/* ========================================
   MODULE 4 : ACTIVITÉS (pour acti_hebdo.html)
======================================== */

if (document.getElementById('activitiesGrid')) {
    // 📊 TABLEAU DES ACTIVITÉS
    // Chaque activité contient toutes ses infos
    const activities = [
    {
        id: 1,
        title: 'Couture',
        icon: '🧵', // Garde l'emoji comme fallback
        logo: 'D:\\Lucie\\ascm\\4x\\Logo_couture@4x-8.png',
        color: 'var(--secondary-pink)', // secondary-pink
        category: 'art',
        categoryLabel: 'Art & Créativité',
        description: 'Apprenez les techniques de couture de base et avancées.',
        fullDescription: 'Notre atelier de couture vous accompagne dans l\'apprentissage des techniques essentielles : points de base, couture à la machine, création de vêtements simples et réparations.',
        schedules: [
            { day: 'Lundi', dayNum: 1, time: '14h00 - 16h30' },
            { day: 'Mercredi', dayNum: 3, time: '18h30 - 21h00' }
        ],
        level: ['Débutant', 'Intermédiaire', 'Avancé'],
        location: 'Atelier Créatif - Salle A',
        instructor: 'Marie Dubois',
        price: '180€ / trimestre',
        participants: '8-12 personnes'
    },
    {
        id: 2,
        title: 'Peinture',
        icon: '🎨',
        logo: 'D:\\Lucie\\ascm\\4x\\logo_peinture@4x-8.png',
        color: 'var(--secondary-blue)', // secondary-blue
        category: 'art',
        categoryLabel: 'Art & Créativité',
        description: 'Découvrez différentes techniques de peinture.',
        fullDescription: 'Cours de peinture acrylique, aquarelle et huile. Apprenez les bases du dessin, de la composition et des couleurs dans une ambiance conviviale.',
        schedules: [
            { day: 'Lundi', dayNum: 1, time: '18h00 - 20h00' },
            { day: 'Vendredi', dayNum: 5, time: '14h00 - 16h00' }
        ],
        level: ['Débutant', 'Intermédiaire'],
        location: 'Atelier Créatif - Salle B',
        instructor: 'Isabelle Rousseau',
        price: '190€ / trimestre',
        participants: '8-14 personnes'
    },
    {
        id: 3,
        title: 'Théâtre',
        icon: '🎭',
        logo: 'D:\\Lucie\\ascm\\4x\\Logo_theatre@4x-8.png',
        color: 'var(--secondary-red)', // secondary-red
        category: 'culture',
        categoryLabel: 'Culture & Expression',
        description: 'Exprimez-vous sur scène et développez votre créativité.',
        fullDescription: 'Atelier de théâtre pour tous : improvisation, jeux d\'acteur, mise en scène. Spectacle de fin d\'année prévu !',
        schedules: [
            { day: 'Mercredi', dayNum: 3, time: '19h00 - 21h30' },
            { day: 'Samedi', dayNum: 6, time: '14h00 - 17h00' }
        ],
        level: ['Débutant', 'Intermédiaire', 'Avancé'],
        location: 'Salle Polyvalente',
        instructor: 'Thomas Lefebvre',
        price: '200€ / trimestre',
        participants: '12-20 personnes'
    },
    {
        id: 4,
        title: 'Qi Gong',
        icon: '☯️',
        logo: 'D:\\Lucie\\ascm\\4x\\Logo_qigong@4x-8.png',
        color: 'var( --secondary-green)', // secondary-green
        category: 'sport',
        categoryLabel: 'Sport & Bien-être',
        description: 'Harmonisez votre corps et votre esprit avec le Qi Gong.',
        fullDescription: 'Art énergétique chinois millénaire combinant mouvements lents, respiration et méditation. Idéal pour la détente et le bien-être.',
        schedules: [
            { day: 'Mardi', dayNum: 2, time: '10h00 - 11h30' },
            { day: 'Jeudi', dayNum: 4, time: '18h00 - 19h30' }
        ],
        level: ['Débutant', 'Intermédiaire'],
        location: 'Salle de Sport - Gymnase',
        instructor: 'Li Chen',
        price: '140€ / trimestre',
        participants: '10-15 personnes'
    },
    {
        id: 5,
        title: 'Yoga',
        icon: '🧘',
        logo: 'D:\\Lucie\\ascm\\4x\\Logo_yoga@4x-8.png',
        color: 'var(--secondary-yellow)', // secondary-yellow
        category: 'sport',
        categoryLabel: 'Sport & Bien-être',
        description: 'Détendez-vous et renforcez votre corps avec le yoga.',
        fullDescription: 'Cours de yoga tous niveaux axés sur la respiration, les postures et la méditation. Idéal pour gérer le stress et améliorer sa souplesse.',
        schedules: [
            { day: 'Lundi', dayNum: 1, time: '19h00 - 20h30' },
            { day: 'Jeudi', dayNum: 4, time: '10h00 - 11h30' }
        ],
        level: ['Débutant', 'Intermédiaire'],
        location: 'Salle de Sport - Gymnase',
        instructor: 'Sophie Martin',
        price: '150€ / trimestre',
        participants: '10-15 personnes'
    },
    {
        id: 6,
        title: 'Zumba',
        icon: '💃',
        logo: 'D:\\Lucie\\ascm\\4x\\Logo_zumba@4x-8.png',
        color: 'var(--secondary-fushia)', // secondary-fushia
        category: 'sport',
        categoryLabel: 'Sport & Bien-être',
        description: 'Bougez sur des rythmes latins et brûlez des calories !',
        fullDescription: 'Cours de fitness dansant inspiré des danses latines : salsa, merengue, reggaeton. Ambiance festive et cardio intense garantis !',
        schedules: [
            { day: 'Mardi', dayNum: 2, time: '19h30 - 20h30' },
            { day: 'Samedi', dayNum: 6, time: '10h00 - 11h00' }
        ],
        level: ['Débutant', 'Intermédiaire'],
        location: 'Salle de Danse',
        instructor: 'Laura Garcia',
        price: '160€ / trimestre',
        participants: '12-20 personnes'
    }
];

    // 🎯 VARIABLES GLOBALES
    let currentFilter = 'all'; // Filtre actif ('all', 'art', 'sport', 'culture')
    let currentView = 'grid';   // Vue active ('grid' ou 'weekly')

    // 🚀 INITIALISATION
    function init() {
        console.log('🎨 Initialisation des activités...');
        renderGrid();          // Afficher la grille des cartes
        renderWeekly();        // Préparer le planning hebdomadaire
        setupFilters();        // Configurer les boutons de filtres
        setupViewToggle();     // Configurer les boutons de changement de vue
        console.log('✅ Activités initialisées !');
    }

    // 🎨 FONCTION : Afficher la grille des activités
function renderGrid(data = activities) {
    const grid = document.getElementById('activitiesGrid');
    if (!grid) return;
    
    console.log(`🎨 Rendu de ${data.length} activités en grille`);
    
    grid.innerHTML = data.map(activity => `
        <div class="activity-card" onclick="openModal(${activity.id})">
            <span class="category-badge badge-${activity.category}">${activity.categoryLabel}</span>
            <div class="card-header" style="background: ${activity.color};">
                <img src="${activity.logo}" alt="${activity.title}" class="activity-logo" />
                <h3 class="activity-title">${activity.title}</h3>
            </div>
            <div class="card-body">
                <p class="card-description">${activity.description}</p>
                <button class="Primary">📅 Voir les horaires</button>
            </div>
        </div>
    `).join('');
}
    // 📅 FONCTION : Afficher le planning hebdomadaire
    function renderWeekly(data = activities) {
        const weeklyView = document.getElementById('weeklyView');
        if (!weeklyView) return;
        
        console.log('📅 Rendu du planning hebdomadaire...');
        
        // 📌 Jours de la semaine
        const daysOfWeek = [
            { name: 'Lundi', dayNum: 1, icon: 'L' },
            { name: 'Mardi', dayNum: 2, icon: 'M' },
            { name: 'Mercredi', dayNum: 3, icon: 'M' },
            { name: 'Jeudi', dayNum: 4, icon: 'J' },
            { name: 'Vendredi', dayNum: 5, icon: 'V' },
            { name: 'Samedi', dayNum: 6, icon: 'S' }
        ];
        
        // 🗂️ Grouper les activités par jour
        const activitiesByDay = {};
        daysOfWeek.forEach(day => {
            activitiesByDay[day.dayNum] = [];
        });
        
        // Parcourir toutes les activités
        data.forEach(activity => {
            // Pour chaque horaire de l'activité
            activity.schedules.forEach(schedule => {
                activitiesByDay[schedule.dayNum].push({
                    ...activity,
                    time: schedule.time
                });
            });
        });
        
        // 🎨 Construire le HTML
        let html = '';
        
        daysOfWeek.forEach(day => {
            const dayActivities = activitiesByDay[day.dayNum];
            
            // Afficher le jour seulement s'il a des activités
            if (dayActivities.length > 0) {
                html += `
                    <div class="day-section">
                        <div class="day-header">
                            <div class="day-icon">${day.icon}</div>
                            <h3 class="day-name">${day.name}</h3>
                        </div>
                        <div class="day-activities">
                `;
                
                // Afficher toutes les activités de ce jour
                dayActivities.forEach(activity => {
                    html += `
                        <div class="schedule-item" onclick="openModal(${activity.id})">
                            <div class="schedule-item-header">
                                <span class="schedule-activity-name">${activity.icon} ${activity.title}</span>
                                <span class="schedule-time">${activity.time}</span>
                            </div>
                            <div class="schedule-details">
                                <span>📍 ${activity.location}</span>
                                <span>👤 ${activity.instructor}</span>
                            </div>
                        </div>
                    `;
                });
                
                html += `
                        </div>
                    </div>
                `;
            }
        });
        
        // Si aucune activité, afficher un message
        if (html === '') {
            html = '<p style="text-align: center; padding: 48px; color: #6b7280;">Aucune activité planifiée cette semaine.</p>';
        }
        
        weeklyView.innerHTML = html;
    }

    // 🎛️ FONCTION : Configurer les filtres (Art, Sport, Culture, Tout)
    function setupFilters() {
        const filterBtns = document.querySelectorAll('.filter-btn');
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                console.log('🔘 Filtre cliqué :', btn.dataset.filter);
                
                // Retirer la classe active de tous les boutons
                filterBtns.forEach(b => b.classList.remove('active'));
                // Ajouter la classe active au bouton cliqué
                btn.classList.add('active');
                
                // Mettre à jour le filtre actuel
                currentFilter = btn.dataset.filter;
                
                // Filtrer les activités
                filterActivities();
            });
        });
    }

    // 🔄 FONCTION : Configurer le changement de vue (Cartes / Planning)
    function setupViewToggle() {
        const viewBtns = document.querySelectorAll('.view-btn');
        viewBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                console.log('👁️ Vue changée :', btn.dataset.view);
                
                // Retirer la classe active de tous les boutons
                viewBtns.forEach(b => b.classList.remove('active'));
                // Ajouter la classe active au bouton cliqué
                btn.classList.add('active');
                
                // Mettre à jour la vue actuelle
                currentView = btn.dataset.view;
                
                // Changer la vue
                switchView();
            });
        });
    }

    // 🔍 FONCTION : Filtrer les activités selon la catégorie
    function filterActivities() {
        // Filtrer selon la catégorie sélectionnée
        const filtered = currentFilter === 'all' 
            ? activities 
            : activities.filter(a => a.category === currentFilter);

        console.log(`🔍 ${filtered.length} activités après filtre "${currentFilter}"`);

        // Afficher selon la vue actuelle
        if (currentView === 'grid') {
            renderGrid(filtered);
        } else {
            renderWeekly(filtered);
        }

        // Gérer l'état vide
        const emptyState = document.getElementById('emptyState');
        if (filtered.length === 0) {
            emptyState.classList.add('active');
            document.getElementById('activitiesGrid').classList.add('hidden');
            document.getElementById('weeklyView').classList.remove('active');
        } else {
            emptyState.classList.remove('active');
        }
    }

    // 🔄 FONCTION : Changer de vue (Grille ↔ Planning)
    function switchView() {
        const grid = document.getElementById('activitiesGrid');
        const weekly = document.getElementById('weeklyView');
        
        if (currentView === 'grid') {
            console.log('📊 Passage en vue grille');
            grid.classList.remove('hidden');
            weekly.classList.remove('active');
        } else {
            console.log('📅 Passage en vue planning');
            grid.classList.add('hidden');
            weekly.classList.add('active');
        }
    }

    // 🪟 FONCTION : Ouvrir la modal avec les détails d'une activité
    window.openModal = function(id) {
        console.log('🪟 Ouverture modal pour activité #', id);
        
        // Trouver l'activité correspondante
        const activity = activities.find(a => a.id === id);
        if (!activity) return;
        
        // Remplir la modal avec les infos
        document.getElementById('modalIcon').textContent = activity.icon;
        document.getElementById('modalTitle').textContent = activity.title;
        document.getElementById('modalDescription').textContent = activity.fullDescription;
        
        // Afficher les horaires
        const scheduleHtml = activity.schedules.map(schedule => `
            <div class="schedule-item-modal">
                <span class="schedule-day">${schedule.day}</span>
                <span class="schedule-time-modal">${schedule.time}</span>
            </div>
        `).join('');
        document.getElementById('modalSchedule').innerHTML = scheduleHtml;
        
        // Afficher les infos pratiques
        const infoHtml = `
            <div class="info-item"><span class="info-icon">📍</span> <strong>Lieu :</strong> ${activity.location}</div>
            <div class="info-item"><span class="info-icon">👤</span> <strong>Professeur :</strong> ${activity.instructor}</div>
            <div class="info-item"><span class="info-icon">💰</span> <strong>Tarif :</strong> ${activity.price}</div>
            <div class="info-item"><span class="info-icon">👥</span> <strong>Participants :</strong> ${activity.participants}</div>
        `;
        document.getElementById('modalInfo').innerHTML = infoHtml;
        
        // Afficher la modal
        document.getElementById('modal').classList.add('active');
    };

    // ❌ FONCTION : Fermer la modal
    window.closeModal = function() {
        document.getElementById('modal').classList.remove('active');
    };

    // ✅ FONCTION : Inscription (à personnaliser)
    window.register = function() {
        alert('Redirection vers le formulaire d\'inscription...');
        // Tu peux rediriger vers une page de formulaire
        // window.location.href = 'inscription.html';
    };

    // 💬 FONCTION : Nous contacter (à personnaliser)
    window.contactUs = function() {
        alert('Redirection vers la page contact...');
        // Tu peux rediriger vers ta page contact
        // window.location.href = 'contact.html';
    };

    // 🚀 LANCER L'INITIALISATION
    init();
}

/* ========================================
   HERO CAROUSEL AUTOMATIQUE
   Utilisé sur: index.html
======================================== */

// Attendre que le DOM soit complètement chargé
document.addEventListener('DOMContentLoaded', function() {
    console.log('🔍 Recherche des éléments Hero...');
    console.log('Hero existe ?', !!document.getElementById('Hero'));
    console.log('Hero-hook existe ?', !!document.getElementById('Hero-hook'));
    console.log('Hero-actu existe ?', !!document.getElementById('Hero-actu'));

    // Vérification complète de tous les éléments nécessaires
    if (document.getElementById('Hero') && 
        document.getElementById('Hero-hook') && 
        document.getElementById('Hero-actu')) {
        
        console.log('✅ Tous les éléments Hero trouvés ! Démarrage du carousel...');
        
        const heroHook = document.getElementById('Hero-hook');
        const heroActu = document.getElementById('Hero-actu');
        const heroContainer = document.getElementById('Hero');
        
        let currentSlide = 0;
        const slideInterval = 5000; // 5 secondes
        let autoSlideTimer;
        
        // Créer les indicateurs (dots)
        const dotsContainer = document.createElement('div');
        dotsContainer.className = 'hero-dots';
        dotsContainer.innerHTML = `
            <span class="hero-dot active" data-slide="0"></span>
            <span class="hero-dot" data-slide="1"></span>
        `;
        heroContainer.appendChild(dotsContainer);
        
        const dots = document.querySelectorAll('.hero-dot');
        
        // Fonction pour afficher un slide
        function showSlide(index) {
            heroHook.classList.remove('active');
            heroActu.classList.remove('active');
            
            dots.forEach(dot => dot.classList.remove('active'));
            
            if (index === 0) {
                heroHook.classList.add('active');
            } else {
                heroActu.classList.add('active');
            }
            
            dots[index].classList.add('active');
            currentSlide = index;
        }
        
        function nextSlide() {
            const next = (currentSlide + 1) % 2;
            showSlide(next);
        }
        
        function startAutoSlide() {
            autoSlideTimer = setInterval(nextSlide, slideInterval);
        }
        
        function stopAutoSlide() {
            clearInterval(autoSlideTimer);
        }
        
        // Clics sur les dots
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                stopAutoSlide();
                showSlide(index);
                startAutoSlide();
            });
        });
        
        // Navigation clavier
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                stopAutoSlide();
                showSlide(currentSlide === 0 ? 1 : 0);
                startAutoSlide();
            } else if (e.key === 'ArrowRight') {
                stopAutoSlide();
                nextSlide();
                startAutoSlide();
            }
        });
        
        // Pause au survol
        heroContainer.addEventListener('mouseenter', stopAutoSlide);
        heroContainer.addEventListener('mouseleave', startAutoSlide);
        
        // Initialisation
        showSlide(0);
        startAutoSlide();
        
        console.log('🎉 Hero Carousel activé avec succès !');
    } else {
        console.log('⚠️ Éléments Hero non trouvés - Carousel désactivé');
    }
});

/* ========================================
   MODULE LOCALISATION - GOOGLE MAPS
   Gestion des interactions de la section Maps
======================================== */

// Attendre que le DOM soit complètement chargé
document.addEventListener('DOMContentLoaded', function() {
    
    console.log('🗺️ Initialisation du module Localisation...');
    
    // Vérifier si la section localisation existe sur la page
    const localisationSection = document.getElementById('localisation');
    
    if (localisationSection) {
        console.log('✅ Section Localisation trouvée !');
        
        // SÉLECTION DES ÉLÉMENTS
        const mapButton = document.querySelector('.map-button');
        const mapIframe = document.querySelector('.map-wrapper iframe');
        const infoWrapper = document.querySelector('.info-wrapper');
        
        // ========================================
        // FONCTIONNALITÉ 1 : Animation d'apparition au scroll
        // ========================================
        
        // Observer pour détecter quand la section entre dans le viewport
        const observerOptions = {
            // Déclencher quand 20% de l'élément est visible
            threshold: 0.2,
            // Marge avant le déclenchement
            rootMargin: '0px 0px -100px 0px'
        };
        
        // Créer l'observer
        const sectionObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Ajouter la classe 'visible' quand la section est visible
                    entry.target.classList.add('visible');
                    console.log('👁️ Section Localisation visible !');
                    
                    // Ajouter les animations aux éléments enfants
                    animateElements();
                }
            });
        }, observerOptions);
        
        // Observer la section
        sectionObserver.observe(localisationSection);
        
        // ========================================
        // FONCTIONNALITÉ 2 : Animation des éléments
        // ========================================
        
        function animateElements() {
            // Animation de la map (slide depuis la gauche)
            if (mapIframe) {
                setTimeout(() => {
                    mapIframe.style.opacity = '1';
                    mapIframe.style.transform = 'translateX(0)';
                }, 200);
            }
            
            // Animation des infos (slide depuis la droite)
            if (infoWrapper) {
                setTimeout(() => {
                    infoWrapper.style.opacity = '1';
                    infoWrapper.style.transform = 'translateX(0)';
                }, 400);
            }
        }
        
        // ========================================
        // FONCTIONNALITÉ 3 : Tracking des clics
        // ========================================
        
        // Suivre les clics sur le bouton Google Maps
        if (mapButton) {
            mapButton.addEventListener('click', function() {
                console.log('🗺️ Ouverture de Google Maps');
                
                // Tu peux ajouter ici du tracking analytics
                // Exemple avec Google Analytics :
                // gtag('event', 'click', {
                //     'event_category': 'Maps',
                //     'event_label': 'Open Google Maps'
                // });
            });
        }
        
        // Suivre les clics sur les liens email
        const emailLinks = document.querySelectorAll('.contact-block a[href^="mailto"]');
        emailLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                console.log('📧 Clic sur email :', this.href);
                // Tracking si besoin
            });
        });
        
        // Suivre les clics sur les liens téléphone
        const phoneLinks = document.querySelectorAll('.contact-block a[href^="tel"]');
        phoneLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                console.log('📞 Clic sur téléphone :', this.href);
                // Tracking si besoin
            });
        });
        
        // ========================================
        // FONCTIONNALITÉ 4 : Gestion du chargement de l'iframe
        // ========================================
        
        if (mapIframe) {
            // Afficher un message quand la map est chargée
            mapIframe.addEventListener('load', function() {
                console.log('✅ Google Maps chargée avec succès !');
            });
            
            // Gérer les erreurs de chargement
            mapIframe.addEventListener('error', function() {
                console.error('❌ Erreur de chargement de Google Maps');
                
                // Afficher un message d'erreur à l'utilisateur
                const errorMessage = document.createElement('div');
                errorMessage.className = 'map-error';
                errorMessage.innerHTML = `
                    <p>⚠️ Impossible de charger la carte.</p>
                    <p>Veuillez vérifier votre connexion internet.</p>
                `;
                this.parentElement.appendChild(errorMessage);
            });
        }
        
        // ========================================
        // FONCTIONNALITÉ 5 : Copier l'adresse
        // ========================================
        
        // Ajouter un bouton pour copier l'adresse
        const addressBlock = document.querySelector('.address-block p');
        if (addressBlock) {
            // Créer un bouton de copie
            const copyButton = document.createElement('button');
            copyButton.className = 'copy-address-btn';
            copyButton.innerHTML = '📋 Copier l\'adresse';
            copyButton.style.cssText = `
                margin-top: 12px;
                padding: 8px 16px;
                background: var(--primary-dark-05);
                border: 1px solid var(--primary-dark);
                border-radius: 6px;
                cursor: pointer;
                font-size: 14px;
                color: var(--primary-dark);
                transition: all 0.3s ease;
                width: 100%;
            `;
            
            // Ajouter le bouton après l'adresse
            addressBlock.parentElement.appendChild(copyButton);
            
            // Fonction de copie
            copyButton.addEventListener('click', function() {
                // Récupérer le texte de l'adresse
                const addressText = addressBlock.innerText;
                
                // Copier dans le presse-papier
                navigator.clipboard.writeText(addressText).then(() => {
                    // Changer le texte du bouton
                    copyButton.innerHTML = '✅ Adresse copiée !';
                    copyButton.style.background = 'var(--secondary-green)';
                    copyButton.style.color = 'white';
                    
                    console.log('📋 Adresse copiée :', addressText);
                    
                    // Remettre le texte original après 2 secondes
                    setTimeout(() => {
                        copyButton.innerHTML = '📋 Copier l\'adresse';
                        copyButton.style.background = 'var(--primary-dark-05)';
                        copyButton.style.color = 'var(--primary-dark)';
                    }, 2000);
                }).catch(err => {
                    console.error('❌ Erreur de copie :', err);
                    copyButton.innerHTML = '❌ Erreur';
                });
            });
        }
        
        console.log('🎉 Module Localisation initialisé avec succès !');
        
    } else {
        console.log('⚠️ Section Localisation non trouvée sur cette page');
    }
});

/* ========================================
   FONCTION UTILITAIRE : Obtenir les coordonnées GPS
   Permet de récupérer la position de l'utilisateur
======================================== */

function getUserLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            function(position) {
                const userLat = position.coords.latitude;
                const userLng = position.coords.longitude;
                
                console.log('📍 Position utilisateur :', userLat, userLng);
                
                // Tu pourrais calculer la distance jusqu'à l'asso
                // ou proposer un itinéraire personnalisé
                
            },
            function(error) {
                console.log('❌ Géolocalisation refusée ou indisponible');
            }
        );
    } else {
        console.log('❌ Géolocalisation non supportée par ce navigateur');
    }
}

// Appeler cette fonction si tu veux utiliser la géolocalisation
// getUserLocation();

/* ========================================
   MODULE INSCRIPTION - adhesion.html
======================================== */

// Attendre que le DOM soit chargé
document.addEventListener('DOMContentLoaded', function() {
    
    // Vérifier si on est sur la page d'inscription
    if (document.querySelector('.inscription-iframe')) {
        console.log('📝 Module Inscription chargé');
        
        // Animation des cartes de bénéfices au scroll
        const benefitCards = document.querySelectorAll('.benefit-card');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, index * 100);
                }
            });
        }, {
            threshold: 0.1
        });
        
        // Initialiser l'animation
        benefitCards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'all 0.5s ease';
            observer.observe(card);
        });
        
        // Gestion du chargement de l'iframe
        const iframe = document.querySelector('.inscription-iframe');
        
        if (iframe) {
            // Afficher un message de chargement
            const iframeWrapper = document.querySelector('.iframe-wrapper');
            const loadingMessage = document.createElement('div');
            loadingMessage.className = 'iframe-loading';
            loadingMessage.innerHTML = `
                <div style="text-align: center; padding: 60px 20px; color: var(--primary-dark);">
                    <div style="font-size: 48px; margin-bottom: 16px;">⏳</div>
                    <p style="font-size: 18px;">Chargement du formulaire...</p>
                </div>
            `;
            iframeWrapper.insertBefore(loadingMessage, iframe);
            
            // Masquer l'iframe pendant le chargement
            iframe.style.opacity = '0';
            
            // Quand l'iframe est chargée
            iframe.addEventListener('load', function() {
                console.log('✅ Formulaire d\'inscription chargé');
                loadingMessage.style.display = 'none';
                iframe.style.opacity = '1';
                iframe.style.transition = 'opacity 0.5s ease';
            });
            
            // Gérer les erreurs de chargement
            iframe.addEventListener('error', function() {
                console.error('❌ Erreur de chargement du formulaire');
                loadingMessage.innerHTML = `
                    <div style="text-align: center; padding: 60px 20px; color: var(--secondary-red);">
                        <div style="font-size: 48px; margin-bottom: 16px;">⚠️</div>
                        <h3 style="font-size: 24px; margin-bottom: 12px;">Erreur de chargement</h3>
                        <p style="font-size: 16px; margin-bottom: 24px;">Le formulaire n'a pas pu être chargé.</p>
                        <a href="https://asm-10.s2.yapla.com/fr/espace-membres" target="_blank" class="Primary">
                            Ouvrir dans une nouvelle fenêtre
                        </a>
                    </div>
                `;
            });
        }
        
        // Smooth scroll pour les ancres
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
        
        console.log('🎉 Module Inscription initialisé avec succès !');
    }
});

/* ========================================
   CAROUSEL D'IMAGES - index.html
   À ajouter dans script.js
======================================== */

// Attendre que le DOM soit chargé
document.addEventListener('DOMContentLoaded', function() {
    
    // Vérifier si le carousel existe sur la page
    const imageCarousel = document.querySelector('.image-carousel');
    const imageTrack = document.querySelector('.image-track');
    const imageDots = document.querySelectorAll('#images-dots .dot');
    
    if (!imageCarousel || !imageTrack || imageDots.length === 0) {
        console.log('⚠️ Carousel non trouvé sur cette page');
        return;
    }
    
    console.log('🎠 Carousel d\'images initialisé !');
    
    // Variables
    let currentImageIndex = 0;
    const totalImages = document.querySelectorAll('.image-card').length;
    const autoSlideInterval = 4000; // 4 secondes
    let autoSlideTimer;
    
    // Fonction pour afficher une image
    function showImage(index) {
        // Vérifier que l'index est valide
        if (index < 0) {
            currentImageIndex = totalImages - 1;
        } else if (index >= totalImages) {
            currentImageIndex = 0;
        } else {
            currentImageIndex = index;
        }
        
        // Déplacer le track
        const offset = -currentImageIndex * 100;
        imageTrack.style.transform = `translateX(${offset}%)`;
        
        // Mettre à jour les dots
        imageDots.forEach((dot, i) => {
            if (i === currentImageIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
        
        console.log(`📷 Image ${currentImageIndex + 1}/${totalImages}`);
    }
    
    // Fonction pour passer à l'image suivante
    function nextImage() {
        showImage(currentImageIndex + 1);
    }
    
    // Fonction pour passer à l'image précédente
    function prevImage() {
        showImage(currentImageIndex - 1);
    }
    
    // Démarrer le défilement automatique
    function startAutoSlide() {
        autoSlideTimer = setInterval(nextImage, autoSlideInterval);
    }
    
    // Arrêter le défilement automatique
    function stopAutoSlide() {
        clearInterval(autoSlideTimer);
    }
    
    // Événements sur les dots
    imageDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            stopAutoSlide();
            showImage(index);
            startAutoSlide();
        });
    });
    
    // Navigation clavier (flèches gauche/droite)
    document.addEventListener('keydown', (e) => {
        if (!imageCarousel) return;
        
        if (e.key === 'ArrowLeft') {
            stopAutoSlide();
            prevImage();
            startAutoSlide();
        } else if (e.key === 'ArrowRight') {
            stopAutoSlide();
            nextImage();
            startAutoSlide();
        }
    });
    
    // Pause au survol du carousel
    imageCarousel.addEventListener('mouseenter', stopAutoSlide);
    imageCarousel.addEventListener('mouseleave', startAutoSlide);
    
    // Support tactile pour mobile (swipe)
    let touchStartX = 0;
    let touchEndX = 0;
    
    imageCarousel.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
        stopAutoSlide();
    }, { passive: true });
    
    imageCarousel.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
        startAutoSlide();
    }, { passive: true });
    
    function handleSwipe() {
        const swipeThreshold = 50; // Distance minimale pour un swipe
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                // Swipe vers la gauche = image suivante
                nextImage();
            } else {
                // Swipe vers la droite = image précédente
                prevImage();
            }
        }
    }
    
    // Initialisation
    showImage(0);
    startAutoSlide();
    
    console.log('✅ Carousel prêt : ' + totalImages + ' images');
});