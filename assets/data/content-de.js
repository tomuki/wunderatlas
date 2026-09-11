/* Deutsch curriculum content for FHR (Baden-Württemberg).
   Original explanations, original/short attributed examples.
   No copyrighted material reproduced.
   Each topic entry: {id, title, type, summary, sections, exercises, sources}
   list: shallow references to the same objects (sections/exercises included). */
(function (root) {
    const DE = {
        operatoren: {
            id: 'operatoren',
            title: 'Operatoren für die schriftliche Prüfung',
            type: 'lesson',
            summary: 'Operatoren sind die Verben in der Aufgabenstellung. Sie sagen genau, was du tun sollst. Verwechsle sie nicht – sonst bearbeitest du die falsche Aufgabe.',
            sections: [
                { h: 'Überblick', html: '<p>In der schriftlichen Deutschprüfung am Berufskolleg in Baden-Württemberg sind Operatoren verbindlich. Sie bestimmen die <strong>Textsorte</strong> und die <strong>Denkhandlung</strong>.</p><p>Die offizielle <em>Operatorenliste BK</em> des Kultusministeriums ordnet jeden Operator einem <strong>Anforderungsbereich (AFB)</strong> zu.</p>' },
                { h: 'Anforderungsbereiche (AFB)', html: '<table style="width:100%; border-collapse:collapse; margin:8px 0;"><thead><tr><th style="text-align:left; padding:6px; border-bottom:1px solid var(--border);">AFB</th><th style="text-align:left; padding:6px; border-bottom:1px solid var(--border);">Bezeichnung</th><th style="text-align:left; padding:6px; border-bottom:1px solid var(--border);">Beispiel-Operatoren</th></tr></thead><tbody><tr><td style="padding:6px; border-bottom:1px solid var(--border);"><strong>AFB I</strong></td><td style="padding:6px; border-bottom:1px solid var(--border);">Reproduktion und Textverstehen</td><td style="padding:6px; border-bottom:1px solid var(--border);">nennen, benennen, beschreiben, zusammenfassen, wiedergeben, darstellen</td></tr><tr><td style="padding:6px; border-bottom:1px solid var(--border);"><strong>AFB II</strong></td><td style="padding:6px; border-bottom:1px solid var(--border);">Reorganisation und Analyse</td><td style="padding:6px; border-bottom:1px solid var(--border);">analysieren, einordnen, erläutern, untersuchen, vergleichen</td></tr><tr><td style="padding:6px; border-bottom:1px solid var(--border);"><strong>AFB III</strong></td><td style="padding:6px; border-bottom:1px solid var(--border);">Werten, Gestalten, Reflektieren</td><td style="padding:6px; border-bottom:1px solid var(--border);">erörtern, bewerten, Stellung nehmen, beurteilen, interpretieren, kreativ verfassen</td></tr></tbody></table>' },
                { h: 'Wichtige Operatoren', html: '<ul><li><em>analysieren</em> – Textmerkmale untersuchen und in Bezug setzen</li><li><em>erörtern</em> – Argumente abwägen, eigene Position begründen</li><li><em>erläutern</em> – Sachverhalt mit Informationen verständlich erklären</li><li><em>zusammenfassen</em> – Kernaussagen knapp und neutral wiedergeben</li><li><em>interpretieren</em> – Sinn eines literarischen Textes herausarbeiten</li><li><em>vergleichen</em> – Gemeinsamkeiten und Unterschiede herausarbeiten</li><li><em>begründen</em> – Aussage mit Argumenten stützen</li><li><em>widerlegen</em> – Gegenargumente prüfen und entkräften</li></ul>' },
                { h: 'Beispiel', html: '<div class="example"><strong>Aufgabe:</strong> „Erörtern Sie, ob der Gebrauch von sozialen Medien die politische Meinungsbildung Jugendlicher fördert."<br><br>Der Operator <em>erörtern</em> verlangt: Pro und Contra abwägen, eine eigene Position formulieren, mit Argumenten und Beispielen arbeiten – <em>nicht</em> nur beschreiben.</div>' }
            ],
            exercises: [
                { type: 'mc', q: 'Welcher Operator verlangt eine eigene begründete Stellungnahme?', options: ['zusammenfassen', 'erörtern', 'nacherzählen', 'wiedergeben'], answer: 1, explanation: 'Erörtern verlangt, mehrere Positionen abzuwägen und eine eigene begründete Meinung zu formulieren.' },
                { type: 'mc', q: 'Was bedeutet der Operator „analysieren"?', options: ['Den Text nacherzählen', 'Textmerkmale untersuchen und in Beziehung setzen', 'Eine eigene Meinung schreiben', 'Nur den Aufbau beschreiben'], answer: 1, explanation: 'Analysieren heißt, Inhalt, Aufbau und Sprache getrennt zu untersuchen und in ihrer Wirkung aufeinander zu beziehen.' },
                { type: 'match', topic: 'operatoren', title: 'Operator und Bedeutung zuordnen', pairs: [['zusammenfassen','Kernaussagen knapp und neutral wiedergeben'],['interpretieren','Sinn eines literarischen Textes herausarbeiten'],['begründen','Eine Aussage mit Argumenten stützen'],['vergleichen','Gemeinsamkeiten und Unterschiede nennen']] },
                { type: 'sort', topic: 'operatoren', title: 'Sortiere die Schritte einer Erörterung', items: ['Einleitung: Hinführung zum Thema', 'Hauptteil: Pro-Argumente', 'Hauptteil: Contra-Argumente', 'Schluss: eigene begründete Stellungnahme'] }
            ]
        },

        textanalyse_sachtext: {
            id: 'textanalyse_sachtext',
            title: 'Sachtextanalyse',
            type: 'lesson',
            summary: 'Eine Sachtextanalyse untersucht einen nicht-fiktionalen Text: Inhalt, Aufbau, Argumentation und Sprache. Ziel ist eine sachliche, textnahe Beschreibung.',
            sections: [
                { h: 'Bestandteile', html: '<ul><li><strong>Inhalt:</strong> Thema, Kernaussage, Argumentationslinie</li><li><strong>Aufbau:</strong> Einleitung, Hauptteil, Schluss; Übergänge</li><li><strong>Argumentation:</strong> These, Argumente, Beispiele, Belege</li><li><strong>Sprache:</strong> Sachlich vs. wertend, Fachbegriffe, Modalpartikeln</li><li><strong>Intention:</strong> Was will der Autor erreichen?</li></ul>' },
                { h: 'Schema (verkürzt)', html: '<ol><li>Einleitung: Textsorte, Autor, Quelle, Thema, Kernaussage</li><li>Hauptteil: Inhaltliche Gliederung, Argumente, sprachliche Mittel mit Wirkung</li><li>Schluss: Intention, Adressat, eigenes Fazit</li></ol>' }
            ],
            exercises: [
                { type: 'sort', topic: 'textanalyse_sachtext', title: 'Ordne die Bausteine einer Sachtextanalyse in sinnvolle Reihenfolge', items: ['Einleitung: Textsorte, Quelle, Thema, Kernaussage','Hauptteil: Inhalt und Argumentation','Hauptteil: sprachliche Mittel mit Wirkung','Schluss: Intention und Fazit'] },
                { type: 'mc', topic: 'textanalyse_sachtext', q: 'Was gehört typischerweise in die Einleitung einer Sachtextanalyse?', options: ['Eine ausführliche eigene Meinung','Autor, Quelle, Textsorte, Thema, Kernaussage','Eine wörtliche Nacherzählung des Textes','Eine Liste aller Argumente'], answer: 1, explanation: 'Die Einleitung führt knapp und sachlich in den Text ein.' }
            ]
        },

        erorterung: {
            id: 'erorterung',
            title: 'Erörterung',
            type: 'lesson',
            summary: 'Die Erörterung ist eine argumentative Textsorte. Du nimmst eine begründete Position ein und arbeitest Pro und Contra systematisch auf.',
            sections: [
                { h: 'Formen', html: '<ul><li><strong>Lineare Erörterung:</strong> Pro → Contra → eigene Position</li><li><strong>Kontroverse Erörterung:</strong> These → Gegenargumente → Widerlegung → eigene Position</li></ul>' },
                { h: 'Aufbau', html: '<ol><li><strong>Einleitung:</strong> Hinführung zum Thema, Problemstellung</li><li><strong>Hauptteil:</strong> Argumente sachlich geordnet, mit Beispielen und Belegen</li><li><strong>Schluss:</strong> Eigene begründete Stellungnahme, ggf. Ausblick</li></ol>' },
                { h: 'Sprachliche Mittel', html: '<ul><li>Begründung: <em>weil, da, aufgrund</em></li><li>Gegenargument: <em>allerdings, jedoch, einerseits</em></li><li>Folgerung: <em>deshalb, folglich, daher</em></li><li>Überleitung: <em>zunächst, darüber hinaus, abschließend</em></li></ul>' }
            ],
            exercises: [
                { type: 'mc', topic: 'erorterung', q: 'Welche Reihenfolge passt für eine lineare Erörterung?', options: ['Contra → Pro → eigene Position','Pro → Contra → eigene Position','Eigene Position → Argumente → These','Nur eigene Meinung'], answer: 1, explanation: 'Lineare Erörterung: Pro-Argumente, dann Contra, dann eigene Position.' },
                { type: 'fill', topic: 'erorterung', q: 'Ergänze den richtigen Konnektor.', text: '___ Jugendliche Informationen niedrigschwellig erhalten, ist das ein Argument für soziale Medien.', answers: [['weil', 'da', 'denn']], explanation: 'Alle drei sind möglich. „Weil" leitet einen Nebensatz ein.' }
            ]
        },

        grammatik: {
            id: 'grammatik',
            title: 'Grammatik – Schwerpunkte',
            type: 'lesson',
            summary: 'Wiederholung der zentralen Grammatikthemen für die schriftliche Prüfung: Satzglieder, Konjunktiv, Passiv, Zeichensetzung.',
            sections: [
                { h: 'Konjunktiv I und II', html: '<p>Der <strong>Konjunktiv I</strong> wird in der <em>indirekten Rede</em> verwendet.</p><div class="example"><strong>Direkt:</strong> Er sagt: „Ich komme morgen."<br><strong>Indirekt:</strong> Er sagt, er komme morgen.</div><p>Der <strong>Konjunktiv II</strong> drückt irreale Wünsche oder Höflichkeit aus.</p>' },
                { h: 'Passiv', html: '<p>Das Passiv betont die Handlung, nicht den Handelnden.</p><div class="example"><strong>Aktiv:</strong> Die Firma baut das Auto.<br><strong>Passiv:</strong> Das Auto <em>wird</em> (von der Firma) <em>gebaut</em>.</div>' },
                { h: 'Satzglieder bestimmen', html: '<p>Stelle Probefragen:</p><ul><li><strong>Subjekt:</strong> Wer oder was?</li><li><strong>Dativobjekt:</strong> Wem?</li><li><strong>Akkusativobjekt:</strong> Wen oder was?</li><li><strong>Genitivattribut:</strong> Wessen?</li></ul>' },
                { h: 'Zeichensetzung', html: '<ul><li>Komma vor „weil", „da", „dass", „ob", „wenn" usw. als Nebensatz-Einleitung.</li><li>Komma bei Infinitivgruppen mit „zu".</li><li>Komma zwischen zwei Hauptsätzen mit „und".</li><li>Anführungszeichen für direkte Rede.</li></ul>' }
            ],
            exercises: [
                { type: 'mc', topic: 'grammatik', q: 'Welcher Satz enthält einen korrekten Konjunktiv II?', options: ['Wenn ich Zeit habe, würde ich mehr lernen.','Ich würde mehr lernen, wenn ich Zeit hätte.','Ich würde mehr lernen, wenn ich Zeit habe.','Ich hätte mehr lernen, wenn ich Zeit hätte.'], answer: 1, explanation: 'Im irrealen Bedingungssatz steht ebenfalls Konjunktiv II („hätte").' },
                { type: 'mc', topic: 'grammatik', q: 'In welchem Satz steht das Komma richtig?', options: ['Ich gehe ins Kino, weil ich Lust habe.','Ich gehe ins Kino weil ich Lust habe.','Ich gehe, ins Kino weil ich Lust habe.','Ich gehe ins Kino, weil, ich Lust habe.'], answer: 0, explanation: 'Vor „weil" als Einleitung des Nebensatzes steht immer ein Komma.' },
                { type: 'error', topic: 'grammatik', text: 'Wegen dem schlechten Wetter, fanden die Spiele nicht statt. Er sagte das er morgen kommt und das er Zeit habe. Wir haben das Auto gekauft weil es günstig war.', corrections: [
                    { find: 'Wegen dem', replace: 'Wegen des', why: '„Wegen" verlangt den Genitiv.' },
                    { find: 'das er morgen kommt', replace: 'dass er morgen kommt', why: '„Dass" als Konjunktion, „das" als Artikel.' },
                    { find: 'weil es günstig war.', replace: ', weil es günstig war.', why: 'Komma vor „weil".' }
                ] }
            ]
        },

        rechtschreibung: {
            id: 'rechtschreibung',
            title: 'Rechtschreibung',
            type: 'lesson',
            summary: 'Häufige Fehlerquellen: ss/ß, Doppelkonsonanten, Getrennt- und Zusammenschreibung, Groß- und Kleinschreibung.',
            sections: [
                { h: 'ss oder ß?', html: '<p>ß steht nach langem Vokal oder Diphthong (außer in „dass").<br>ss steht nach kurzem Vokal.</p><div class="example"><em>Füße</em> (lang) – <em>Küsse</em> (kurz)</div>' },
                { h: 'Doppelkonsonanten', html: '<p>Folgt nach kurzem, betontem Vokal. Der vorherige Vokal ist dann kurz.</p><div class="example"><em>Kamm</em>, <em>Schiff</em>, <em>mittag</em></div>' },
                { h: 'Getrennt oder zusammen?', html: '<p>Zusammen, wenn das Verb eine neue Bedeutung bildet (idiomatisch).</p><div class="example"><em>kennenlernen</em> – <em>wir lernen ihn kennen</em> (trennbar).</div>' }
            ],
            exercises: [
                { type: 'mc', topic: 'rechtschreibung', q: 'Welche Schreibung ist korrekt?', options: ['Füsse','Füße','Fuße','Füße'], answer: 1, explanation: '„Füße" – nach langem U steht ß.' },
                { type: 'mc', topic: 'rechtschreibung', q: 'Welche Schreibung ist korrekt?', options: ['kennen lernen','kennenlernen','kennen Lernen','kennnenlernen'], answer: 1, explanation: '„Kennenlernen" wird zusammengeschrieben.' }
            ]
        },

        zusammenfassung: {
            id: 'zusammenfassung',
            title: 'Zusammenfassung',
            type: 'lesson',
            summary: 'Eine Zusammenfassung gibt die Kernaussagen eines Textes knapp, neutral und in eigenen Worten wieder.',
            sections: [
                { h: 'Regeln', html: '<ul><li>Maximal ein Drittel der Vorlage.</li><li>Sachlich-neutral; keine Bewertung.</li><li>Eigene Worte; keine wörtlichen Übernahmen.</li><li>Indirekte Rede bei Zitaten.</li><li>Keine Informationen, die im Original nicht stehen.</li></ul>' }
            ],
            exercises: [
                { type: 'mc', topic: 'zusammenfassung', q: 'Welches Merkmal gehört nicht in eine Zusammenfassung?', options: ['Knappe Wiedergabe der Kernaussagen','Eigene Worte','Eigene Bewertung des Textes','Indirekte Rede bei Zitaten'], answer: 2, explanation: 'Eine Zusammenfassung ist sachlich-neutral.' }
            ]
        },

        textanalyse_literarisch: {
            id: 'textanalyse_literarisch',
            title: 'Literarische Textanalyse',
            type: 'lesson',
            summary: 'Untersuchung eines fiktionalen Textauszugs: Inhalt, Aufbau, Figuren, Erzählverhalten, sprachliche Mittel, Deutung.',
            sections: [
                { h: 'Bestandteile', html: '<ul><li><strong>Inhalt:</strong> Was geschieht?</li><li><strong>Figuren:</strong> Charakterisierung</li><li><strong>Erzähler:</strong> Ich-, personaler oder auktorialer Erzähler</li><li><strong>Sprache:</strong> Metaphern, Vergleiche, Symbole, Syntax</li><li><strong>Deutung:</strong> Welche Aussage lässt sich ableiten?</li></ul>' }
            ],
            exercises: [
                { type: 'sort', topic: 'textanalyse_literarisch', title: 'Reihenfolge der Analyse-Bausteine', items: ['Inhalt des Auszugs','Erzählverhalten und Figuren','Sprachliche Auffälligkeiten','Deutung / Einordnung'] }
            ]
        },

        materialgestuetztes_schreiben: {
            id: 'materialgestuetztes_schreiben',
            title: 'Materialgestütztes Schreiben',
            type: 'lesson',
            summary: 'Beim materialgestützten Schreiben erhältst du mehrere Materialien. Du verarbeitest sie zu einem zusammenhängenden Text.',
            sections: [
                { h: 'Vorgehen', html: '<ol><li>Materialien sichten und Kernaussagen notieren.</li><li>Passende Materialien für die eigene Position auswählen.</li><li>Eigene Argumente aus dem Material entwickeln und belegen.</li><li>Bezüge zwischen Materialien herstellen.</li></ol>' }
            ],
            exercises: [
                { type: 'mc', topic: 'materialgestuetztes_schreiben', q: 'Was ist beim materialgestützten Schreiben besonders wichtig?', options: ['Alle Materialien wörtlich übernehmen','Bezüge zwischen Materialien herstellen und für die eigene Argumentation nutzen','Nur ein Material verwenden','Eigene Meinung komplett weglassen'], answer: 1, explanation: 'Eigene Argumentation, die mehrere Materialien sinnvoll verbindet.' }
            ]
        },

        operator_exercises: {
            id: 'operator_exercises',
            title: 'Operator-Wortschatz trainieren',
            type: 'lesson',
            summary: 'Übungen zum sicheren Umgang mit Operatoren.',
            sections: [
                { h: 'Wozu?', html: '<p>Wer den Operator falsch deutet, schreibt eine andere Aufgabe. Übe regelmäßig, Operatoren schnell zu erkennen und deine Antwort darauf auszurichten.</p>' }
            ],
            exercises: [
                { type: 'mc', topic: 'operatoren', q: 'Welche Textsorte verlangt der Operator „interpretieren"?', options: ['Sachtext','literarischer Text','Gebrauchsanweisung','Lexikonartikel'], answer: 1, explanation: 'Interpretieren zielt auf literarische Texte.' }
            ]
        },

        textbeschreibung: {
            id: 'textbeschreibung',
            title: 'Textbeschreibung vs. Textanalyse',
            type: 'lesson',
            summary: 'Eine Beschreibung bleibt an der Oberfläche; eine Analyse setzt Textmerkmale zueinander in Beziehung.',
            sections: [
                { h: 'Unterschied', html: '<ul><li><strong>Beschreibung</strong> = Was steht wo? (Nacherzählung des Inhalts).</li><li><strong>Analyse</strong> = Welche Wirkung haben Aufbau, Sprache, Argumentation?</li></ul><p class="muted">Tipp: Wenn die Aufgabe „analysieren" lautet, beschreibe nicht nur – werte aus.</p>' }
            ],
            exercises: [
                { type: 'mc', topic: 'textbeschreibung', q: 'Welche Aussage passt zu einer Textanalyse?', options: ['Nacherzählung des Inhalts','Beschreibung von Aufbau, Sprache und Wirkung','Nennung der Textlänge','Aufzählung unbekannter Wörter'], answer: 1, explanation: 'Analyse untersucht Aufbau, Sprache und Wirkung.' },
                { type: 'fill', topic: 'textbeschreibung', q: 'Ergänze den Operator: „___ Sie die sprachlichen Mittel des Textes und ihre Wirkung."', text: '___ Sie die sprachlichen Mittel des Textes und ihre Wirkung.', answers: [['Analysieren','Untersuchen']], explanation: 'Beide sind möglich. AFB-II-Operatoren.' }
            ]
        },

        kreatives_schreiben: {
            id: 'kreatives_schreiben',
            title: 'Kreatives Schreiben',
            type: 'lesson',
            summary: 'Beim kreativen Schreiben verfasst du einen eigenen Text zu einem Impuls. Achte auf sprachliche Qualität und passende Textsorte.',
            sections: [
                { h: 'Tipps', html: '<ul><li>Wähle eine Textsorte, die zum Impuls passt (Innere Monolog, Brief, Reportage, Tagebucheintrag).</li><li>Zeige Spannung durch Details und Perspektivwechsel.</li><li>Setze bewusst sprachliche Mittel ein: Metaphern, Vergleiche, Tempuswechsel.</li><li>Runde den Text mit einem passenden Schluss ab.</li></ul>' }
            ],
            exercises: [
                { type: 'mc', topic: 'kreatives_schreiben', q: 'Worauf solltest du beim kreativen Schreiben besonders achten?', options: ['Nur auf Rechtschreibung','Auf passende Textsorte, bewusste sprachliche Mittel und einen runden Schluss','Auf möglichst viele Informationen','Auf eine strikt sachliche Sprache'], answer: 1, explanation: 'Kreatives Schreiben lebt von passender Form und bewusster Sprache.' },
                { type: 'free', topic: 'kreatives_schreiben', q: 'Schreibe einen inneren Monolog (8–10 Sätze) aus Sicht einer Person, die auf eine Nachricht wartet.', minWords: 80, explanation: 'Achte auf Tempus (Präsens), Gedankenstriche, kurze Sätze für innere Bewegung.', keywords: ['warte', 'unruhig', 'Handy', 'Nachricht', 'Stille'], modelAnswer: 'Beispiel: „Mein Blick wandert immer wieder zum Display. Stille. Ich starre auf den kleinen schwarzen Bildschirm, als könnte ich ihn mit meiner Aufmerksamkeit zwingen, aufzuleuchten. Es klingelt nicht. Vielleicht hat sie keine Zeit. Vielleicht hat sie es sich anders überlegt. Ich atme aus, lege das Handy beiseite, nehme es sofort wieder. Stille. Noch immer nichts."', lang: 'de' }
            ]
        },

        argumentation: {
            id: 'argumentation',
            title: 'Argumentation und Argumentationstechnik',
            type: 'lesson',
            summary: 'Gute Argumentation besteht aus These, Argumenten, Belegen und einer schlüssigen Schlussfolgerung.',
            sections: [
                { h: 'Bausteine', html: '<ol><li><strong>These:</strong> klare, prüfbare Aussage</li><li><strong>Argument:</strong> Begründung der These</li><li><strong>Beleg:</strong> Beispiel, Statistik, Zitat</li><li><strong>Schlussfolgerung:</strong> Rückbezug auf die These</li></ol>' },
                { h: 'Syllogismus', html: '<p>Prämisse 1: Alle Berufskollegiaten müssen eine FHR-Prüfung ablegen.<br>Prämisse 2: Anna ist Berufskollegiatin.<br>Konklusion: Anna muss eine FHR-Prüfung ablegen.</p>' }
            ],
            exercises: [
                { type: 'mc', topic: 'argumentation', q: 'Welche Reihenfolge gehört zu einer schlüssigen Argumentation?', options: ['Argument → These → Beleg → Schluss','These → Argument → Beleg → Schluss','Beleg → These → Argument → Schluss','Schluss → These → Argument → Beleg'], answer: 1, explanation: 'These aufstellen, Argument, Beleg, dann Schlussfolgerung.' },
                { type: 'sort', topic: 'argumentation', title: 'Ordne die Argumentationskette', items: ['These: Soziale Medien verzerren die politische Wahrnehmung.','Argument: Algorithmen verstärken Extreme.','Beleg: Studie XYZ zeigt, dass …','Schlussfolgerung: Daher ist Medienkompetenz wichtig.'] }
            ]
        },

        literatur_epochen: {
            id: 'literatur_epochen',
            title: 'Literaturepochen – Überblick',
            type: 'lesson',
            summary: 'Epochen helfen, Texte einzuordnen: Aufklärung, Sturm und Drang, Klassik, Romantik, Realismus, Naturalismus, Moderne, Nachkriegsliteratur, Gegenwartsliteratur.',
            sections: [
                { h: 'Überblick', html: '<ul><li><strong>Aufklärung (ca. 1720–1800):</strong> Vernunft, Toleranz, Menschenrechte.</li><li><strong>Sturm und Drang (ca. 1765–1790):</strong> Gefühl, Genie, Rebellion.</li><li><strong>Klassik (ca. 1786–1832):</strong> Harmonie, Humanität, formvollendete Sprache.</li><li><strong>Romantik (ca. 1798–1830):</strong> Sehnsucht, Natur, Innenwelt.</li><li><strong>Realismus (ca. 1850–1900):</strong> genaue Wirklichkeitsdarstellung.</li><li><strong>Naturalismus (ca. 1880–1900):</strong> konsequente Milieudarstellung.</li><li><strong>Moderne (ca. 1890–1925):</strong> Großstadt, Ich-Verlust, Sprachkrise.</li><li><strong>Nachkriegsliteratur (ab 1945):</strong> Trümmerliteratur, Gruppen 47.</li><li><strong>Gegenwartsliteratur (ab ca. 1990):</strong> Postmoderne, Migration, Globalisierung.</li></ul>' }
            ],
            exercises: [
                { type: 'match', topic: 'literatur_epochen', title: 'Epoche und Merkmal zuordnen', pairs: [['Romantik','Sehnsucht, Natur, Innenwelt'],['Aufklärung','Vernunft, Toleranz'],['Naturalismus','konsequente Milieudarstellung'],['Gegenwartsliteratur','Globalisierung, Migration']] },
                { type: 'mc', topic: 'literatur_epochen', q: 'Welches Merkmal passt nicht zur Romantik?', options: ['Sehnsucht','Naturerlebnis','strenge Vernunftorientierung','Verklärung des Mittelalters'], answer: 2, explanation: 'Strenge Vernunftorientierung gehört zur Aufklärung.' }
            ]
        },

        sprachbilder: {
            id: 'sprachbilder',
            title: 'Sprachliche Mittel (Rhetorik, Stilistik)',
            type: 'lesson',
            summary: 'Sprachliche Mittel tragen zur Wirkung eines Textes bei. Erkenne sie und beschreibe ihre Funktion im Kontext.',
            sections: [
                { h: 'Überblick', html: '<ul><li><strong>Metapher</strong> – bildlicher Ausdruck ohne „wie"</li><li><strong>Vergleich</strong> – mit „wie" oder „als"</li><li><strong>Personifikation</strong> – Vermenschlichung</li><li><strong>Hyperbel</strong> – Übertreibung</li><li><strong>Ironie</strong> – Gegenteil dessen, was gemeint ist</li><li><strong>Alliteration</strong> – gleicher Anlaut</li><li><strong>Anapher</strong> – gleicher Wortanfang am Satzanfang</li><li><strong>Ellipse</strong> – unvollständiger Satz</li></ul>' }
            ],
            exercises: [
                { type: 'match', topic: 'sprachbilder', title: 'Begriff und Beispiel zuordnen', pairs: [['Metapher','Die Zeit ein grauer Strom'],['Vergleich','Mutig wie ein Löwe'],['Personifikation','Der Wind flüstert'],['Hyperbel','Ich habe das tausendmal gesagt']] },
                { type: 'mc', topic: 'sprachbilder', q: 'Welches Stilmittel liegt vor: „Sie ist die Sonne meines Lebens."?', options: ['Vergleich','Metapher','Personifikation','Hyperbel'], answer: 1, explanation: '„Sonne" steht hier bildlich ohne „wie" – Metapher.' }
            ]
        },

        textsorten_uebersicht: {
            id: 'textsorten_uebersicht',
            title: 'Textsorten – Übersicht',
            type: 'lesson',
            summary: 'Jede Textsorte hat eigene Merkmale: Aufbau, Sprache, Adressat, Funktion. Erkenne sie und passe deinen Stil an.',
            sections: [
                { h: 'Wichtige Textsorten', html: '<ul><li><strong>Erzählung:</strong> zeitliche Abfolge, szenisches Erzählen</li><li><strong>Beschreibung:</strong> sinnliche Details, sachlich geordnet</li><li><strong>Bericht:</strong> sachlich, impersonal, Vergangenheit</li><li><strong>Erörterung:</strong> These, Argumente, eigene Position</li><li><strong>Kommentar:</strong> subjektiv, begründet, meinungsorientiert</li><li><strong>Brief (formell):</strong> Anrede, Betreff, Schlussformel</li><li><strong>Bewerbung:</strong> tabellarisch, standardisierte Reihenfolge</li></ul>' }
            ],
            exercises: [
                { type: 'mc', topic: 'textsorten_uebersicht', q: 'Welche Textsorte ist primär meinungsorientiert?', options: ['Bericht','Kommentar','Beschreibung','Inhaltsangabe'], answer: 1, explanation: 'Kommentar = subjektiv + begründet.' },
                { type: 'sort', topic: 'textsorten_uebersicht', title: 'Sortiere die Bausteine eines formalen Briefs', items: ['Absender','Empfänger','Ort, Datum','Betreff','Anrede','Text','Schlussformel','Unterschrift'] }
            ]
        },

        kurzgeschichte: {
            id: 'kurzgeschichte',
            title: 'Kurzgeschichte – Merkmale',
            type: 'lesson',
            summary: 'Kurzgeschichten sind kurz, alltagsnah, mit offenen Schluss und Wendepunkt.',
            sections: [
                { h: 'Typische Merkmale', html: '<ul><li>Alltagsnahe, knappe Handlung</li><li>Ein einziger Wendepunkt</li><li>Offenes Ende</li><li>Verdichtete Sprache, Symbole</li><li>Linearer Aufbau</li><li>Erzähler oft auktorial oder personal</li></ul>' }
            ],
            exercises: [
                { type: 'mc', topic: 'kurzgeschichte', q: 'Was ist ein typisches Merkmal einer Kurzgeschichte?', options: ['Ausführlicher Plot mit mehreren Wendungen','Offenes Ende','Ausführliche Figurenpsychologie','Mehrere Erzählstränge'], answer: 1, explanation: 'Kurzgeschichten enden oft abrupt oder offen.' }
            ]
        },

        romananalyse: {
            id: 'romananalyse',
            title: 'Romananalyse – Basiswissen',
            type: 'lesson',
            summary: 'Romane sind komplexer als Kurzgeschichten: mehrere Handlungsstränge, Figuren, Zeit- und Ortswechsel.',
            sections: [
                { h: 'Analyse-Aspekte', html: '<ul><li><strong>Erzählperspektive:</strong> Ich-Erzähler, personal, auktorial</li><li><strong>Zeitstruktur:</strong> chronologisch, Rückblenden, Vorausdeutungen</li><li><strong>Figurenkonstellation:</strong> Haupt-, Nebenfiguren, Beziehungen</li><li><strong>Raum:</strong> Schauplätze und ihre symbolische Funktion</li><li><strong>Sprache/Stil:</strong> Wortwahl, Satzbau, Erzähltempo</li></ul>' }
            ],
            exercises: [
                { type: 'match', topic: 'romananalyse', title: 'Erzählperspektive und Merkmal', pairs: [['Ich-Erzähler','„Ich" berichtet aus eigener Sicht'],['Auktorialer Erzähler','allwissend, von außen'],['Personaler Erzähler','Sicht einer Figur, „er/sie"']] }
            ]
        },

        bewerbung_schreiben: {
            id: 'bewerbung_schreiben',
            title: 'Bewerbung schreiben – Basics',
            type: 'lesson',
            summary: 'Eine vollständige Bewerbung umfasst Anschreiben, Lebenslauf und Anlagen. Achte auf formelle Sprache, saubere Struktur und Bezug zur Stelle.',
            sections: [
                { h: 'Bestandteile', html: '<ol><li>Anschreiben (1 Seite)</li><li>Lebenslauf (tabellarisch)</li><li>Anlagen: Zeugnisse, Nachweise</li></ol>' },
                { h: 'Tipps', html: '<ul><li>Individuell auf die Stelle eingehen</li><li>Stärken mit Beispielen belegen</li><li>Saubere Rechtschreibung</li><li>Schlüssige Schlussformel</li></ul>' }
            ],
            exercises: [
                { type: 'mc', topic: 'bewerbung_schreiben', q: 'Was gehört NICHT in ein Anschreiben?', options: ['Bezug zur Stelle','Lebenslauf in Tabellenform','Eigene Motivation','Schlussformel'], answer: 1, explanation: 'Der Lebenslauf ist eine separate Anlage.' }
            ]
        },

        pruefung_organisation: {
            id: 'pruefung_organisation',
            title: 'Prüfungsorganisation und Zeitplan',
            type: 'lesson',
            summary: 'Plane die Prüfung in Phasen, übe unter Realbedingungen, trainiere Zeitmanagement mit Timer.',
            sections: [
                { h: 'Zeitplan', html: '<ul><li>Erste 10 Minuten: Aufgabe lesen, markieren, disponieren</li><li>Hauptteil: 70–75 % der Zeit</li><li>Letzte 10–15 Minuten: Korrektur lesen, Gliederung prüfen</li></ul>' },
                { h: 'Material', html: '<ul><li>Erlaubte Hilfsmittel kennen</li><li>Stifte in Reserve</li><li>Wasser, ggf. Traubenzucker</li></ul>' }
            ],
            exercises: [
                { type: 'sort', topic: 'pruefung_organisation', title: 'Sortiere die Prüfungsphasen', items: ['Aufgabe lesen und disponieren','Hauptteil schreiben','Schluss formulieren','Korrektur lesen'] }
            ]
        }
    };

    // list references the same objects so sections/exercises are accessible
    const DE_LESSONS = Object.values(DE).map(l => Object.assign({}, l));

    function get(id) { return DE[id] || null; }
    function allExercises() {
        const out = [];
        for (const l of Object.values(DE)) {
            for (const ex of (l.exercises || [])) {
                out.push(Object.assign({ subject: 'de', topic: ex.topic || l.id }, ex, { lessonId: l.id, lessonTitle: l.title }));
            }
        }
        return out;
    }

    root.ContentDE = { byId: DE, list: DE_LESSONS, get, allExercises };
})(window);
// EXPANDED 2026-09-03: added 3 new exercises for literatur_epochen
(function(root) { if (!root.ContentDE || !root.ContentDE.byId) return; const l = root.ContentDE.byId['literatur_epochen']; if (l && l.exercises) { l.exercises.push({ type: 'mc', topic: 'literatur_epochen', q: 'Welche Epoche zeichnet sich durch einen starken Objektivitätsanspruch aus?', options: ['Romantik','Naturalismus','Expressionismus','Barock'], answer: 1, explanation: 'Naturalismus = wissenschaftliche Beobachtung, Objektivität.' }); l.exercises.push({ type: 'cloze', topic: 'literatur_epochen', text: 'Der Expressionismus ist eine Epoche des frühen ___ Jahrhunderts.', answers: [['20.']], explanation: 'Expressionismus ≈ 1910–1920.' }); } })(window);
// EXPANDED 2026-09-03: new lesson "kommunikationsmodelle"
(function(root) {
  if (!root.ContentDE) return;
  const byId = root.ContentDE.byId = root.ContentDE.byId || {};
  const list = root.ContentDE.list = root.ContentDE.list || [];
  if (byId['kommunikationsmodelle']) return;
  const lesson = {
    id: 'kommunikationsmodelle',
    title: 'Kommunikationsmodelle (Schulz von Thun, Watzlawick)',
    type: 'lesson',
    summary: 'Vier-Ohren-Modell, Axiome von Watzlawick, Missverständnisse erkennen und analysieren.',
    sections: [
      { h: 'Vier-Ohren-Modell', html: '<p>Jede Nachricht hat vier Ebenen: Sachinhalt, Selbstoffenbarung, Beziehung, Appell. Missverständnisse entstehen, wenn Sender und Empfänger unterschiedliche Ebenen adressieren.</p>' },
      { h: 'Watzlawicks Axiome', html: '<p>(1) Man kann nicht nicht kommunizieren. (2) Jede Mitteilung hat Inhalts- und Beziehungsaspekt. (3) Kommunikation ist Ursache-Wirkungs-Verzerrung. (4) Digitale und analoge Kommunikation. (5) Symmetrische und komplementäre Beziehungen.</p>' }
    ],
    exercises: [
      { type: 'mc', topic: 'kommunikationsmodelle', q: 'Welche Ebenen hat das Vier-Ohren-Modell?', options: ['2','3','4','5'], answer: 2, explanation: 'Sach-, Selbstoffenbarungs-, Beziehungs-, Appellebene.' },
      { type: 'match', topic: 'kommunikationsmodelle', title: 'Ohren zuordnen', pairs: [['Sachohr','Fakten'],['Selbstoffenbarungsohr','Was zeigt der Sender von sich'],['Beziehungsohr','Wie sehen wir uns'],['Appellohr','Was soll ich tun']] },
      { type: 'free', topic: 'kommunikationsmodelle', q: 'Beschreibe in 2 Sätzen eine Situation, in der eine Nachricht auf unterschiedlichen Ebenen verstanden wurde.', explanation: 'Eigene Erfahrung.' }
    ]
  };
  byId['kommunikationsmodelle'] = lesson;
  list.push(lesson);
  // Re-build allExercises to include the new lesson
  if (typeof root.ContentDE.allExercises === 'function') {
    // The function references its own scope; we just push into list and it will pick it up next time.
  }
})(window);
