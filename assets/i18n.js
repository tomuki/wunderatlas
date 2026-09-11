/* German UI strings. Centralized for easy adjustment. */
(function (root) {
    const STRINGS = {
        app: {
            name: 'FHR-Vorbereitung',
            subtitle: 'Deutsch & Englisch'
        },
        nav: {
            dashboard: 'Dashboard',
            plan: 'Lernplan',
            deutsch: 'Deutsch',
            englisch: 'Englisch',
            pruefung: 'Prüfung',
            fehler: 'Fehler',
            notizen: 'Notizen',
            fortschritt: 'Fortschritt',
            quellen: 'Quellen'
        },
        common: {
            start: 'Starten',
            next: 'Weiter',
            back: 'Zurück',
            check: 'Prüfen',
            save: 'Speichern',
            cancel: 'Abbrechen',
            delete: 'Löschen',
            edit: 'Bearbeiten',
            close: 'Schließen',
            finish: 'Beenden',
            reset: 'Zurücksetzen',
            add: 'Hinzufügen',
            search: 'Suchen',
            filter: 'Filtern',
            yes: 'Ja',
            no: 'Nein',
            correct: 'Richtig',
            wrong: 'Falsch',
            showSolution: 'Lösung anzeigen',
            hideSolution: 'Lösung verbergen',
            explainAgain: 'Erneut erklären',
            repeatLater: 'Später wiederholen',
            minutes: 'Minuten',
            hours: 'Stunden',
            today: 'Heute',
            tomorrow: 'Morgen',
            none: 'Keine',
            loading: 'Wird geladen …',
            empty: 'Noch nichts vorhanden',
            exportData: 'Daten exportieren',
            importData: 'Daten importieren',
            optional: 'optional'
        },
        feedback: {
            correct: 'Das ist richtig.',
            wrong: 'Das ist leider nicht korrekt.',
            solution: 'Lösung',
            explanation: 'Erklärung',
            recommendation: 'Empfehlung',
            addedToJournal: 'In das Fehlerjournal übernommen.'
        }
    };

    root.I18N = STRINGS;
})(window);
