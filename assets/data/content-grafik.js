/* Grafikdesign / FHR-Begleitung content (Profil: Carl-Hofer-Schule, BK Grafikdesign).
   Original-Projektaufgaben, keine geschützten Materialien. */
(function (root) {
    const GRAF = {
        portfolio_uebersicht: {
            id: 'portfolio_uebersicht',
            title: 'Portfolio – Übersicht',
            type: 'lesson',
            summary: 'Begleitendes Portfolio bis zur FHR. Vier Projekte, dokumentiert vom Briefing bis zur Schlusspräsentation.',
            sections: [
                { h: 'Projekte', html: '<ol><li>Markenrelaunch (Logos, Wortmarke, Anwendung)</li><li>Editorial (Magazin, Buch oder Broschüre)</li><li>Plakat / Kampagne (Print oder Digital)</li><li>Freies Projekt (z. B. Motion, Verpackung, Type)</li></ol>' }
            ],
            exercises: [
                { type: 'mc', topic: 'portfolio_uebersicht', q: 'Wie viele Projekte umfasst das begleitende Portfolio?', options: ['2','3','4','6'], answer: 2, explanation: 'Vier Projekte.' }
            ]
        },

        markenrelaunch_briefing: {
            id: 'markenrelaunch_briefing',
            title: 'Projekt 1: Markenrelaunch – Briefing',
            type: 'lesson',
            summary: 'Vom Briefing zur Markenstrategie. Zielgruppe, Tonalität, Markenwerte.',
            sections: [
                { h: 'Schritte', html: '<ol><li>Briefing lesen und Ziele klären</li><li>Zielgruppe und Markenwerte definieren</li><li>Moodboard und Skizzen</li><li>Logoentwurf, Wortmarke, Varianten</li><li>Anwendungen: Visitenkarte, Briefpapier, Web</li></ol>' }
            ],
            exercises: [
                { type: 'mc', topic: 'portfolio_uebersicht', q: 'Was gehört NICHT zu einem Markenrelaunch?', options: ['Moodboard','Logoentwurf','Code-Refactoring','Anwendungen'], answer: 2, explanation: 'Code-Refactoring gehört zur Software-Entwicklung.' }
            ]
        },

        editorial_layout: {
            id: 'editorial_layout',
            title: 'Editorial – Layout und Raster',
            type: 'lesson',
            summary: 'Editorial-Design folgt einem Raster. Spalten, Stege, Mikro- und Makrotypografie.',
            sections: [
                { h: 'Raster', html: '<p>Mehrspaltige Raster, modular oder kanonisch. Konsequente Stege und konsistente Hierarchie.</p>' }
            ],
            exercises: [
                { type: 'mc', topic: 'portfolio_uebersicht', q: 'Wofür steht Makrotypografie?', options: ['Schriftgröße','Gesamtlayout (Raster, Hierarchie)','Nur Überschriften','Nur Bilder'], answer: 1, explanation: 'Makrotypografie = Gesamtanordnung.' }
            ]
        },

        plakat_typografie: {
            id: 'plakat_typografie',
            title: 'Plakat – Typografie und Komposition',
            type: 'lesson',
            summary: 'Plakate brauchen klare Hierarchie und Lesbarkeit aus Distanz.',
            sections: [
                { h: 'Tipps', html: '<ul><li>Eine Hauptbotschaft, eine Schriftfamilie</li><li>Klare Kontraste (hell/dunkel, ruhig/aktiv)</li><li>Negativraum bewusst einsetzen</li></ul>' }
            ],
            exercises: []
        },

        farbtheorie: {
            id: 'farbtheorie',
            title: 'Farbtheorie und Farbsysteme',
            type: 'lesson',
            summary: 'RGB für Display, CMYK für Druck. Komplementär- und Analogfarben.',
            sections: [
                { h: 'Systeme', html: '<p><strong>RGB</strong> = Display (additive Mischung).<br><strong>CMYK</strong> = Druck (subtraktiv).<br><strong>HSL/HSB</strong> = intuitiv (Farbton, Sättigung, Helligkeit).</p>' }
            ],
            exercises: [
                { type: 'mc', topic: 'portfolio_uebersicht', q: 'Welches Farbsystem nutzt der Druck?', options: ['RGB','CMYK','HSL','HEX'], answer: 1, explanation: 'CMYK = Cyan, Magenta, Yellow, Key (Schwarz).' }
            ]
        },

        typografie: {
            id: 'typografie',
            title: 'Typografie – Basics',
            type: 'lesson',
            summary: 'Anatomie einer Schrift, Laufweite, Zeilenabstand, Hierarchie.',
            sections: [
                { h: 'Grundlagen', html: '<ul><li>Serifenbetonte Schriften wirken klassisch, serifenlose modern.</li><li>Schriftgröße, Zeilenabstand und Laufweite beeinflussen Lesbarkeit.</li><li>Maximal 2–3 Schriftfamilien pro Projekt.</li></ul>' }
            ],
            exercises: [
                { type: 'mc', topic: 'portfolio_uebersicht', q: 'Wofür steht die Laufweite (Letter Spacing)?', options: ['Abstand zwischen Zeilen','Abstand zwischen Buchstaben','Schriftgröße','Zeilenlänge'], answer: 1, explanation: 'Laufweite = Buchstabenabstand.' }
            ]
        },

        workflows: {
            id: 'workflows',
            title: 'Workflows in Illustrator/Photoshop/InDesign',
            type: 'lesson',
            summary: 'Drei Werkzeuge, drei Rollen. Vektor, Bild, Layout.',
            sections: [
                { h: 'Werkzeuge', html: '<ul><li><strong>Illustrator:</strong> Vektorlogo, Icons, Piktogramme</li><li><strong>Photoshop:</strong> Bildbearbeitung, Composing, Retusche</li><li><strong>InDesign:</strong> Mehrseitige Layouts, Broschüren, Bücher</li></ul>' }
            ],
            exercises: [
                { type: 'match', topic: 'portfolio_uebersicht', title: 'Werkzeug und Aufgabe', pairs: [['Illustrator','Logo, Vektor-Icons'],['Photoshop','Bildbearbeitung'],['InDesign','Broschüre, Buch']] }
            ]
        },

        portfolio_checkliste: {
            id: 'portfolio_checkliste',
            title: 'Portfolio-Checkliste',
            type: 'lesson',
            summary: 'Vor der Abgabe: Präsentation, Dateibenennung, Quellen, Rechteklärung.',
            sections: [
                { h: 'Checkliste', html: '<ul><li>Einheitliche Dateibenennung (z. B. 2027-04-30_Projekt1_Logo.pdf)</li><li>PDF-Profile für Druck und Web</li><li>Schriften in Pfade konvertiert oder mitgeliefert</li><li>Bildrechte dokumentiert</li><li>Kurze Projektbeschreibung (1–2 Sätze pro Projekt)</li></ul>' }
            ],
            exercises: []
        }
    };

    // Generische Aufgaben-Liste (für die Plan-Integration und das Dashboard).
    const GRAF_TASKS = [
        { id: 'g-mark-1', topic: 'portfolio_uebersicht', title: 'Markenrelaunch: Briefing analysieren', minutes: 60, type: 'task' },
        { id: 'g-mark-2', topic: 'portfolio_uebersicht', title: 'Markenrelaunch: Moodboard erstellen', minutes: 90, type: 'task' },
        { id: 'g-mark-3', topic: 'portfolio_uebersicht', title: 'Markenrelaunch: Logo-Skizzen (20 Varianten)', minutes: 120, type: 'task' },
        { id: 'g-mark-4', topic: 'portfolio_uebersicht', title: 'Markenrelaunch: Reinzeichnung Logo', minutes: 90, type: 'task' },
        { id: 'g-mark-5', topic: 'portfolio_uebersicht', title: 'Markenrelaunch: Anwendungen (Visitenkarte, Brief)', minutes: 90, type: 'task' },
        { id: 'g-edit-1', topic: 'editorial_layout', title: 'Editorial: Konzept und Raster', minutes: 60, type: 'task' },
        { id: 'g-edit-2', topic: 'editorial_layout', title: 'Editorial: Bildrecherche und -auswahl', minutes: 60, type: 'task' },
        { id: 'g-edit-3', topic: 'editorial_layout', title: 'Editorial: Probe-Layout (Doppelseite)', minutes: 120, type: 'task' },
        { id: 'g-edit-4', topic: 'editorial_layout', title: 'Editorial: Umsetzung 8–16 Seiten', minutes: 180, type: 'task' },
        { id: 'g-plak-1', topic: 'plakat_typografie', title: 'Plakat: Konzept und Skizzen', minutes: 60, type: 'task' },
        { id: 'g-plak-2', topic: 'plakat_typografie', title: 'Plakat: Reinzeichnung', minutes: 90, type: 'task' },
        { id: 'g-plak-3', topic: 'plakat_typografie', title: 'Plakat: Serie (3 Formate)', minutes: 120, type: 'task' },
        { id: 'g-frei-1', topic: 'portfolio_uebersicht', title: 'Frei: Themenfindung', minutes: 60, type: 'task' },
        { id: 'g-frei-2', topic: 'portfolio_uebersicht', title: 'Frei: Konzept', minutes: 90, type: 'task' },
        { id: 'g-frei-3', topic: 'portfolio_uebersicht', title: 'Frei: Umsetzung', minutes: 180, type: 'task' },
        { id: 'g-farb-1', topic: 'farbtheorie', title: 'Farbsysteme anwenden (RGB/CMYK)', minutes: 60, type: 'task' },
        { id: 'g-typ-1', topic: 'typografie', title: 'Typo-Studie: Schriftmuster', minutes: 60, type: 'task' },
        { id: 'g-work-1', topic: 'workflows', title: 'Workflow: Vektor-Exporte', minutes: 60, type: 'task' },
        { id: 'g-work-2', topic: 'workflows', title: 'Workflow: Bildbearbeitung', minutes: 60, type: 'task' },
        { id: 'g-work-3', topic: 'workflows', title: 'Workflow: Druck-PDF erstellen', minutes: 60, type: 'task' },
        { id: 'g-port-1', topic: 'portfolio_checkliste', title: 'Portfolio: Projektbeschreibungen', minutes: 60, type: 'task' },
        { id: 'g-port-2', topic: 'portfolio_checkliste', title: 'Portfolio: Schlusspräsentation', minutes: 90, type: 'task' },
        { id: 'g-port-3', topic: 'portfolio_checkliste', title: 'Portfolio: Rechteklärung', minutes: 60, type: 'task' },
        { id: 'g-pruef-1', topic: 'portfolio_uebersicht', title: 'Probepräsentation vor Lehrkraft', minutes: 60, type: 'task' },
        { id: 'g-pruef-2', topic: 'portfolio_uebersicht', title: 'Feedback einarbeiten', minutes: 90, type: 'task' },
        { id: 'g-pruef-3', topic: 'portfolio_uebersicht', title: 'Endabgabe: Mappe und Datenträger', minutes: 60, type: 'task' },
        { id: 'g-expo-1', topic: 'portfolio_uebersicht', title: 'Ausstellung/Präsentation vorbereiten', minutes: 90, type: 'task' },
        { id: 'g-expo-2', topic: 'portfolio_uebersicht', title: 'Pressetext / Web-Text für Portfolio', minutes: 60, type: 'task' },
        { id: 'g-expo-3', topic: 'portfolio_uebersicht', title: 'Online-Portfolio (PDF + Web)', minutes: 120, type: 'task' },
        { id: 'g-puffer', topic: 'portfolio_uebersicht', title: 'Pufferzeit / Korrekturen', minutes: 60, type: 'task' }
    ];

    function allTasks() { return GRAF_TASKS.slice(); }
    function get(id) { return GRAF[id] || null; }

    root.ContentGRAF = { byId: GRAF, list: Object.values(GRAF).map(l => Object.assign({}, l)), tasks: GRAF_TASKS, get, allTasks };
})(window);
