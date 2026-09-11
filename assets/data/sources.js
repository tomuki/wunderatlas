/* Legal source list for the FHR-Vorbereitung app.
   Only public, non-copyrighted materials and original content are used.
   Each entry: {id, name, url, accessed, note}. */
(function (root) {
    const SOURCES = [
        {
            id: 'km-bw',
            name: 'Kultusministerium Baden-Württemberg',
            url: 'https://km.baden-wuerttemberg.de/',
            accessed: '2026-09-02',
            note: 'Übergeordnete Informationen zur Fachhochschulreife, Prüfungsordnung, Bildungspläne.'
        },
        {
            id: 'operatorenliste-bk',
            name: 'Operatorenliste BK (KM BW, 12.06.2024)',
            url: 'https://km.baden-wuerttemberg.de/site/pbs-bw-km-root/get/documents_E1163836477/KULTUS.Dachmandant/KULTUS/Dienststellen/schulartspezifische%20Dienste/Berufliche%20Schulen/PDFs/Operatorenliste%20BK_120624.pdf',
            accessed: '2026-09-02',
            note: 'Offizielle Operatorenliste BK mit Anforderungsbereichen (AFB I–III); nur nach Sinn zitiert.'
        },
        {
            id: 'schule-bw',
            name: 'Landesbildungsserver Baden-Württemberg',
            url: 'https://www.schule-bw.de/',
            accessed: '2026-09-02',
            note: 'Fachportale Deutsch und Englisch, Musterprüfungen, Materialien für die Sekundarstufe II.'
        },
        {
            id: 'bildungsplaene-bw',
            name: 'Bildungspläne Baden-Württemberg',
            url: 'https://www.bildungsplaene-bw.de/',
            accessed: '2026-09-02',
            note: 'Aktuelle Bildungspläne für das Berufskolleg (Deutsch, Englisch, BKFH).'
        },
        {
            id: 'bp-bkfh-de',
            name: 'Bildungsplan BKFH Deutsch (BP2023)',
            url: 'https://www.bildungsplaene-bw.de/site/bildungsplan/get/documents/lsbw/export-pdf/depot-pdf/ALLG/BP2023/BP_2023_BK_FHR_D.pdf',
            accessed: '2026-09-02',
            note: 'Offizieller Bildungsplan Deutsch für das Berufskolleg zur Erlangung der FHR.'
        },
        {
            id: 'bp-bkfh-en',
            name: 'Bildungsplan BKFH Englisch (BP2023)',
            url: 'https://www.bildungsplaene-bw.de/site/bildungsplan/get/documents/lsbw/export-pdf/depot-pdf/ALLG/BP2023/BP_2023_BK_FHR_E.pdf',
            accessed: '2026-09-02',
            note: 'Offizieller Bildungsplan Englisch für das Berufskolleg zur Erlangung der FHR.'
        },
        {
            id: 'gesetze-bw',
            name: 'Landesrecht Baden-Württemberg',
            url: 'https://www.landesrecht-bw.de/',
            accessed: '2026-09-02',
            note: 'Berufskolleg-Prüfungsordnung (BPrO) und Schulgesetz Baden-Württemberg (§ 38).'
        },
        {
            id: 'carl-hofer',
            name: 'Carl Hofer Schule Karlsruhe',
            url: 'https://www.carlhofer-schule.de',
            accessed: '2026-09-02',
            note: 'Schulhomepage mit Hinweisen zu Fachrichtungen, Prüfungsterminen und Stundenplänen.'
        },
        {
            id: 'rps-bkfh',
            name: 'Regierungspräsidium Stuttgart – BKFH',
            url: 'https://rps.baden-wuerttemberg.de/',
            accessed: '2026-09-02',
            note: 'Jährliche Hinweise zur Prüfungserstellung und Bewertung der schriftlichen Prüfung am BKFH.'
        },
        {
            id: 'dw',
            name: 'Deutsche Welle – Deutsch lernen',
            url: 'https://learngerman.dw.com/',
            accessed: '2026-09-02',
            note: 'Öffentlich zugängliche Übungsmaterialien (CC-Lizenz); Beispiele eigens umformuliert.'
        },
        {
            id: 'bc',
            name: 'British Council – LearnEnglish',
            url: 'https://learnenglish.britishcouncil.org/',
            accessed: '2026-09-02',
            note: 'Kostenlose Übungen zu Grammatik, Wortschatz, Lesen und Hören auf B1–B2-Niveau.'
        },
        {
            id: 'bp-bkfh-math',
            name: 'Bildungsplan BKFH Mathematik (BP2023)',
            url: 'https://www.bildungsplaene-bw.de/site/bildungsplan/get/documents/lsbw/export-pdf/depot-pdf/ALLG/BP2023/BP_2023_BK_FHR_M.pdf',
            accessed: '2026-09-02',
            note: 'Offizieller Bildungsplan Mathematik für das Berufskolleg zur Erlangung der FHR (BW). Themenfelder Analysis, Vektorrechnung/Analytische Geometrie, Matrizen, Stochastik.'
        },
        {
            id: 'abiweb-bkfh',
            name: 'abiweb.de – Berufskolleg FHR',
            url: 'https://www.abiweb.de/',
            accessed: '2026-09-02',
            note: 'Hintergrundinformationen zur FHR-Prüfung in Baden-Württemberg (Schwerpunkt Mathematik BKFH, Beispielthemen).'
        },
        {
            id: 'km-formelsammlung',
            name: 'Formelsammlung BKFH Mathematik (KM BW)',
            url: 'https://km.baden-wuerttemberg.de/',
            accessed: '2026-09-02',
            note: 'Hinweise zu erlaubten Hilfsmitteln (nicht grafikfähiger Taschenrechner, genehmigte Formelsammlung) – Quelle: KM BW.'
        },
        {
            id: 'wikipedia-fhr',
            name: 'Wikipedia – Fachhochschulreife',
            url: 'https://de.wikipedia.org/wiki/Fachhochschulreife',
            accessed: '2026-09-02',
            note: 'Übersicht: Pflichtfächer, Prüfungsreihenfolge, Notenanforderungen (Bundesländer-Vergleich).'
        }
    ];

    /* Topics covered in this app, mapped to the relevant sources.
       This mapping is transparent and editable. */
    const TOPIC_SOURCES = {
        'textanalyse': ['bp-bkfh-de', 'schule-bw', 'operatorenliste-bk'],
        'textanalyse_literarisch': ['bp-bkfh-de', 'schule-bw'],
        'erorterung': ['bp-bkfh-de', 'rps-bkfh'],
        'materialgestuetztes': ['bp-bkfh-de', 'schule-bw'],
        'zusammenfassung': ['bp-bkfh-de', 'operatorenliste-bk'],
        'grammatik': ['bp-bkfh-de', 'dw'],
        'rechtschreibung': ['bp-bkfh-de', 'schule-bw'],
        'operatoren': ['operatorenliste-bk', 'schule-bw'],
        'mediation': ['bp-bkfh-en', 'bc'],
        'comment': ['bp-bkfh-en', 'rps-bkfh'],
        'summary': ['bp-bkfh-en', 'bc'],
        'reading': ['bp-bkfh-en', 'schule-bw'],
        'grammar-en': ['bp-bkfh-en', 'bc'],
        'vocabulary': ['bc', 'dw'],
        'formal-informal': ['bc', 'schule-bw'],
        'math-analysis': ['bp-bkfh-math', 'km-formelsammlung'],
        'math-vektoren': ['bp-bkfh-math', 'km-formelsammlung'],
        'math-matrizen': ['bp-bkfh-math', 'km-formelsammlung'],
        'math-stochastik': ['bp-bkfh-math', 'km-formelsammlung', 'abiweb-bkfh'],
        'math-trigonometrie': ['bp-bkfh-math', 'km-formelsammlung'],
        'exam-structure': ['km-bw', 'gesetze-bw', 'rps-bkfh', 'carl-hofer', 'wikipedia-fhr']
    };

    root.Sources = { list: SOURCES, forTopics: TOPIC_SOURCES, SOURCES, TOPIC_SOURCES };
})(window);
