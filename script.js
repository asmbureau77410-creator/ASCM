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
    const activities = [
    {
        id: 1,
        title: 'Couture',
        icon: '🧵',
        logo: 'D:\\Lucie\\ascm\\4x\\Logo_couture@4x-8.png',
        color: 'var(--secondary-pink)',
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
        color: 'var(--secondary-blue)',
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
        color: 'var(--secondary-red)',
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
        color: 'var(--secondary-green)',
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
        color: 'var(--secondary-yellow)',
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
        color: 'var(--secondary-fushia)',
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

    let currentFilter = 'all';
    let currentView = 'grid';

    function init() {
        console.log('🎨 Initialisation des activités...');
        renderGrid();
        renderWeekly();
        setupFilters();
        setupViewToggle();
        console.log('✅ Activités initialisées !');
    }

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

    function renderWeekly(data = activities) {
        const weeklyView = document.getElementById('weeklyView');
        if (!weeklyView) return;
        
        console.log('📅 Rendu du planning hebdomadaire...');
        
        const daysOfWeek = [
            { name: 'Lundi', dayNum: 1, icon: 'L' },
            { name: 'Mardi', dayNum: 2, icon: 'M' },
            { name: 'Mercredi', dayNum: 3, icon: 'M' },
            { name: 'Jeudi', dayNum: 4, icon: 'J' },
            { name: 'Vendredi', dayNum: 5, icon: 'V' },
            { name: 'Samedi', dayNum: 6, icon: 'S' }
        ];
        
        const activitiesByDay = {};
        daysOfWeek.forEach(day => {
            activitiesByDay[day.dayNum] = [];
        });
        
        data.forEach(activity => {
            activity.schedules.forEach(schedule => {
                activitiesByDay[schedule.dayNum].push({
                    ...activity,
                    time: schedule.time
                });
            });
        });
        
        let html = '';
        
        daysOfWeek.forEach(day => {
            const dayActivities = activitiesByDay[day.dayNum];
            
            if (dayActivities.length > 0) {
                html += `
                    <div class="day-section">
                        <div class="day-header">
                            <div class="day-icon">${day.icon}</div>
                            <h3 class="day-name">${day.name}</h3>
                        </div>
                        <div class="day-activities">
                `;
                
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
        
        if (html === '') {
            html = '<p style="text-align: center; padding: 48px; color: #6b7280;">Aucune activité planifiée cette semaine.</p>';
        }
        
        weeklyView.innerHTML = html;
    }

    function setupFilters() {
        const filterBtns = document.querySelectorAll('.filter-btn');
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                console.log('📘 Filtre cliqué :', btn.dataset.filter);
                
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                currentFilter = btn.dataset.filter;
                filterActivities();
            });
        });
    }

    function setupViewToggle() {
        const viewBtns = document.querySelectorAll('.view-btn');
        viewBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                console.log('👁️ Vue changée :', btn.dataset.view);
                
                viewBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                currentView = btn.dataset.view;
                switchView();
            });
        });
    }

    function filterActivities() {
        const filtered = currentFilter === 'all' 
            ? activities 
            : activities.filter(a => a.category === currentFilter);

        console.log(`🔍 ${filtered.length} activités après filtre "${currentFilter}"`);

        if (currentView === 'grid') {
            renderGrid(filtered);
        } else {
            renderWeekly(filtered);
        }

        const emptyState = document.getElementById('emptyState');
        if (filtered.length === 0) {
            emptyState.classList.add('active');
            document.getElementById('activitiesGrid').classList.add('hidden');
            document.getElementById('weeklyView').classList.remove('active');
        } else {
            emptyState.classList.remove('active');
        }
    }

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

    window.openModal = function(id) {
        console.log('🪟 Ouverture modal pour activité #', id);
        
        const activity = activities.find(a => a.id === id);
        if (!activity) return;
        
        document.getElementById('modalIcon').textContent = activity.icon;
        document.getElementById('modalTitle').textContent = activity.title;
        document.getElementById('modalDescription').textContent = activity.fullDescription;
        
        const scheduleHtml = activity.schedules.map(schedule => `
            <div class="schedule-item-modal">
                <span class="schedule-day">${schedule.day}</span>
                <span class="schedule-time-modal">${schedule.time}</span>
            </div>
        `).join('');
        document.getElementById('modalSchedule').innerHTML = scheduleHtml;
        
        const infoHtml = `
            <div class="info-item"><span class="info-icon">📍</span> <strong>Lieu :</strong> ${activity.location}</div>
            <div class="info-item"><span class="info-icon">👤</span> <strong>Professeur :</strong> ${activity.instructor}</div>
            <div class="info-item"><span class="info-icon">💰</span> <strong>Tarif :</strong> ${activity.price}</div>
            <div class="info-item"><span class="info-icon">👥</span> <strong>Participants :</strong> ${activity.participants}</div>
        `;
        document.getElementById('modalInfo').innerHTML = infoHtml;
        
        document.getElementById('modal').classList.add('active');
    };

    window.closeModal = function() {
        document.getElementById('modal').classList.remove('active');
    };

    window.register = function() {
        alert('Redirection vers le formulaire d\'inscription...');
    };

    window.contactUs = function() {
        alert('Redirection vers la page contact...');
    };

    init();
}

/* ========================================
   MODULE LOCALISATION - GOOGLE MAPS
======================================== */

document.addEventListener('DOMContentLoaded', function() {
    
    console.log('🗺️ Initialisation du module Localisation...');
    
    const localisationSection = document.getElementById('localisation');
    
    if (localisationSection) {
        console.log('✅ Section Localisation trouvée !');
        
        const mapButton = document.querySelector('.map-button');
        const mapIframe = document.querySelector('.map-wrapper iframe');
        const infoWrapper = document.querySelector('.info-wrapper');
        
        const observerOptions = {
            threshold: 0.2,
            rootMargin: '0px 0px -100px 0px'
        };
        
        const sectionObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    console.log('👁️ Section Localisation visible !');
                    animateElements();
                }
            });
        }, observerOptions);
        
        sectionObserver.observe(localisationSection);
        
        function animateElements() {
            if (mapIframe) {
                setTimeout(() => {
                    mapIframe.style.opacity = '1';
                    mapIframe.style.transform = 'translateX(0)';
                }, 200);
            }
            
            if (infoWrapper) {
                setTimeout(() => {
                    infoWrapper.style.opacity = '1';
                    infoWrapper.style.transform = 'translateX(0)';
                }, 400);
            }
        }
        
        if (mapButton) {
            mapButton.addEventListener('click', function() {
                console.log('🗺️ Ouverture de Google Maps');
            });
        }
        
        const emailLinks = document.querySelectorAll('.contact-block a[href^="mailto"]');
        emailLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                console.log('📧 Clic sur email :', this.href);
            });
        });
        
        const phoneLinks = document.querySelectorAll('.contact-block a[href^="tel"]');
        phoneLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                console.log('📞 Clic sur téléphone :', this.href);
            });
        });
        
        if (mapIframe) {
            mapIframe.addEventListener('load', function() {
                console.log('✅ Google Maps chargée avec succès !');
            });
            
            mapIframe.addEventListener('error', function() {
                console.error('❌ Erreur de chargement de Google Maps');
                
                const errorMessage = document.createElement('div');
                errorMessage.className = 'map-error';
                errorMessage.innerHTML = `
                    <p>⚠️ Impossible de charger la carte.</p>
                    <p>Veuillez vérifier votre connexion internet.</p>
                `;
                this.parentElement.appendChild(errorMessage);
            });
        }
        
        const addressBlock = document.querySelector('.address-block p');
        if (addressBlock) {
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
            
            addressBlock.parentElement.appendChild(copyButton);
            
            copyButton.addEventListener('click', function() {
                const addressText = addressBlock.innerText;
                
                navigator.clipboard.writeText(addressText).then(() => {
                    copyButton.innerHTML = '✅ Adresse copiée !';
                    copyButton.style.background = 'var(--secondary-green)';
                    copyButton.style.color = 'white';
                    
                    console.log('📋 Adresse copiée :', addressText);
                    
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

/* Copie la PARTIE 1 ci-dessus, puis ajoute cette PARTIE 2 à la suite */

/* ========================================
   MODULE INSCRIPTION - adhesion.html
======================================== */

document.addEventListener('DOMContentLoaded', function() {
    
    if (document.querySelector('.inscription-iframe')) {
        console.log('📝 Module Inscription chargé');
        
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
        
        benefitCards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'all 0.5s ease';
            observer.observe(card);
        });
        
        const iframe = document.querySelector('.inscription-iframe');
        
        if (iframe) {
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
            
            iframe.style.opacity = '0';
            
            iframe.addEventListener('load', function() {
                console.log('✅ Formulaire d\'inscription chargé');
                loadingMessage.style.display = 'none';
                iframe.style.opacity = '1';
                iframe.style.transition = 'opacity 0.5s ease';
            });
            
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
   ✨ CAROUSELS AVEC SWIPE TACTILE AMÉLIORÉ
   Pour Hero ET Images
======================================== */

document.addEventListener('DOMContentLoaded', function() {
    
    // ========================================
    // CAROUSEL 1 : HERO (Hook/Actu)
    // ========================================
    
    console.log('🔍 Recherche des éléments Hero...');
    
    if (document.getElementById('Hero') && 
        document.getElementById('Hero-hook') && 
        document.getElementById('Hero-actu')) {
        
        console.log('✅ Hero Carousel trouvé !');
        
        const heroHook = document.getElementById('Hero-hook');
        const heroActu = document.getElementById('Hero-actu');
        const heroContainer = document.getElementById('Hero');
        
        let currentSlide = 0;
        const slideInterval = 5000;
        let autoSlideTimer;
        
        const dotsContainer = document.createElement('div');
        dotsContainer.className = 'hero-dots';
        dotsContainer.innerHTML = `
            <span class="hero-dot active" data-slide="0"></span>
            <span class="hero-dot" data-slide="1"></span>
        `;
        heroContainer.appendChild(dotsContainer);
        
        const dots = document.querySelectorAll('.hero-dot');
        
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
        
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                stopAutoSlide();
                showSlide(index);
                startAutoSlide();
            });
        });
        
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
                stopAutoSlide();
                showSlide(currentSlide === 0 ? 1 : 0);
                startAutoSlide();
            }
        });
        
        // ✨ SWIPE TACTILE pour Hero
        let touchStartX = 0;
        let touchEndX = 0;
        let touchStartY = 0;
        let touchEndY = 0;
        let isSwiping = false;
        
        heroContainer.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
            touchStartY = e.changedTouches[0].screenY;
            isSwiping = true;
            stopAutoSlide();
        }, { passive: true });
        
        heroContainer.addEventListener('touchmove', (e) => {
            if (!isSwiping) return;
            touchEndX = e.changedTouches[0].screenX;
            touchEndY = e.changedTouches[0].screenY;
        }, { passive: true });
        
        heroContainer.addEventListener('touchend', () => {
            if (!isSwiping) return;
            
            const diffX = touchStartX - touchEndX;
            const diffY = Math.abs(touchStartY - touchEndY);
            const swipeThreshold = 50;
            
            if (Math.abs(diffX) > swipeThreshold && Math.abs(diffX) > diffY) {
                if (diffX > 0) {
                    showSlide(1);
                } else {
                    showSlide(0);
                }
            }
            
            isSwiping = false;
            startAutoSlide();
        }, { passive: true });
        
        heroContainer.addEventListener('mouseenter', stopAutoSlide);
        heroContainer.addEventListener('mouseleave', startAutoSlide);
        
        showSlide(0);
        startAutoSlide();
        
        console.log('🎉 Hero Carousel avec swipe activé !');
    }
    
    // ========================================
    // CAROUSEL 2 : IMAGES (Découvrez l'ASCM)
    // ========================================
    
    const imageCarousel = document.querySelector('.image-carousel');
    const imageTrack = document.querySelector('.image-track');
    const imageDots = document.querySelectorAll('#images-dots .dot');
    
    if (!imageCarousel || !imageTrack || imageDots.length === 0) {
        console.log('⚠️ Image carousel non trouvé');
        return;
    }
    
    console.log('🎠 Image Carousel trouvé !');
    
    let currentImageIndex = 0;
    const totalImages = document.querySelectorAll('.image-card').length;
    const autoSlideInterval = 4000;
    let autoImageSlideTimer;
    
    let imgTouchStartX = 0;
    let imgTouchEndX = 0;
    let imgTouchStartY = 0;
    let imgTouchEndY = 0;
    let isImgSwiping = false;
    let isDragging = false;
    let startPos = 0;
    let currentTranslate = 0;
    let prevTranslate = 0;
    
    function showImage(index) {
        if (index < 0) {
            currentImageIndex = totalImages - 1;
        } else if (index >= totalImages) {
            currentImageIndex = 0;
        } else {
            currentImageIndex = index;
        }
        
        const offset = -currentImageIndex * 100;
        imageTrack.style.transition = 'transform 0.5s ease';
        imageTrack.style.transform = `translateX(${offset}%)`;
        
        imageDots.forEach((dot, i) => {
            if (i === currentImageIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
        
        console.log(`📷 Image ${currentImageIndex + 1}/${totalImages}`);
    }
    
    function nextImage() {
        showImage(currentImageIndex + 1);
    }
    
    function prevImage() {
        showImage(currentImageIndex - 1);
    }
    
    function startAutoImageSlide() {
        autoImageSlideTimer = setInterval(nextImage, autoSlideInterval);
    }
    
    function stopAutoImageSlide() {
        clearInterval(autoImageSlideTimer);
    }
    
    imageDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            stopAutoImageSlide();
            showImage(index);
            startAutoImageSlide();
        });
    });
    
    document.addEventListener('keydown', (e) => {
        if (!imageCarousel) return;
        
        if (e.key === 'ArrowLeft') {
            stopAutoImageSlide();
            prevImage();
            startAutoImageSlide();
        } else if (e.key === 'ArrowRight') {
            stopAutoImageSlide();
            nextImage();
            startAutoImageSlide();
        }
    });
    
    // ✨ SWIPE TACTILE FLUIDE
    function getPositionX(event) {
        return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
    }
    
    function getPositionY(event) {
        return event.type.includes('mouse') ? event.pageY : event.touches[0].clientY;
    }
    
    function touchStart(event) {
        imgTouchStartX = getPositionX(event);
        imgTouchStartY = getPositionY(event);
        isImgSwiping = true;
        isDragging = true;
        startPos = imgTouchStartX;
        
        imageTrack.style.transition = 'none';
        stopAutoImageSlide();
    }
    
    function touchMove(event) {
        if (!isDragging) return;
        
        imgTouchEndX = getPositionX(event);
        imgTouchEndY = getPositionY(event);
        
        const diffY = Math.abs(imgTouchStartY - imgTouchEndY);
        const diffX = imgTouchStartX - imgTouchEndX;
        
        if (diffY > Math.abs(diffX)) {
            isDragging = false;
            return;
        }
        
        event.preventDefault();
        
        currentTranslate = prevTranslate - diffX;
        
        const maxTranslate = 0;
        const minTranslate = -(totalImages - 1) * imageCarousel.offsetWidth;
        
        if (currentTranslate > maxTranslate) {
            currentTranslate = maxTranslate;
        } else if (currentTranslate < minTranslate) {
            currentTranslate = minTranslate;
        }
        
        imageTrack.style.transform = `translateX(${currentTranslate}px)`;
    }
    
    function touchEnd() {
        if (!isImgSwiping) return;
        
        isDragging = false;
        
        const movedBy = imgTouchStartX - imgTouchEndX;
        const diffY = Math.abs(imgTouchStartY - imgTouchEndY);
        const swipeThreshold = 75;
        
        if (Math.abs(movedBy) > Math.abs(diffY)) {
            
            if (Math.abs(movedBy) > swipeThreshold) {
                if (movedBy > 0 && currentImageIndex < totalImages - 1) {
                    currentImageIndex += 1;
                } else if (movedBy < 0 && currentImageIndex > 0) {
                    currentImageIndex -= 1;
                }
            }
        }
        
        imageTrack.style.transition = 'transform 0.5s ease';
        showImage(currentImageIndex);
        
        prevTranslate = -currentImageIndex * imageCarousel.offsetWidth;
        isImgSwiping = false;
        startAutoImageSlide();
    }
    
    imageCarousel.addEventListener('touchstart', touchStart, { passive: true });
    imageCarousel.addEventListener('touchmove', touchMove, { passive: false });
    imageCarousel.addEventListener('touchend', touchEnd, { passive: true });
    
    imageCarousel.addEventListener('mousedown', touchStart);
    imageCarousel.addEventListener('mousemove', touchMove);
    imageCarousel.addEventListener('mouseup', touchEnd);
    imageCarousel.addEventListener('mouseleave', () => {
        if (isDragging) {
            touchEnd();
        }
    });
    
    imageCarousel.addEventListener('mouseenter', stopAutoImageSlide);
    imageCarousel.addEventListener('mouseleave', () => {
        if (!isDragging) {
            startAutoImageSlide();
        }
    });
    
    showImage(0);
    prevTranslate = 0;
    startAutoImageSlide();
    
    console.log('✅ Image Carousel avec swipe fluide : ' + totalImages + ' images');
});