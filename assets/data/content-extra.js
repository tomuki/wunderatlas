/* Additional exercises appended to the existing content banks so the app
   meets the FHR scope requirements: ≥25 MATH lessons with ≥60 exercises,
   ≥20 DE/EN lessons with ≥60 exercises each. No copyrighted material. */
(function (root) {
    const extras = {
        de: [
            // 1 extra lesson: Prüfungssimulation
            {
                id: 'pruefungssimulation',
                title: 'Prüfungssimulation Deutsch',
                type: 'lesson',
                summary: 'Eine vollständige Übungsklausur simuliert die schriftliche Prüfung: Sachtextanalyse, Erörterung und sprachliche Analyse.',
                sections: [
                    { h: 'Aufbau', html: '<p>Die Deutschprüfung am BK besteht aus einer textbezogenen Aufgabe (Sachtext oder literarischer Text) und einer offenen Schreibaufgabe. Bearbeite in der Übung beide Teile.</p>' },
                    { h: 'Zeitplan', html: '<p>90 min Lesen + 150 min Schreiben. Plane 30 min Reserve ein.</p>' }
                ],
                exercises: [
                    { type: 'mc', topic: 'pruefungsvorbereitung', q: 'Wie viele Teile umfasst die schriftliche Deutschprüfung am BK?', options: ['1','2','3','4'], answer: 1, explanation: 'Textbezogene Aufgabe + Schreibaufgabe.' },
                    { type: 'sort', topic: 'pruefungsvorbereitung', items: ['Material lesen und markieren','Gliederung erstellen','Rohtext schreiben','Überarbeiten: Sprache, Rechtschreibung'], explanation: 'Schreibprozess.' },
                    { type: 'free', topic: 'pruefungsvorbereitung', q: 'Plane in 3–4 Sätzen den Aufbau einer Erörterung zum Thema „Digitalisierung der Schule".', explanation: 'Kurzer Plan, nicht ausformulieren.' },
                    { type: 'mc', topic: 'operatoren', q: 'Was verlangt der Operator „begründen"?', options: ['Eine Behauptung aufstellen','Eine Aussage mit Argumenten stützen','Eigene Meinung ohne Belege','Nur Beispiele aufzählen'], answer: 1, explanation: 'Begründen = Aussage + Argumente.' }
                ]
            },
            // Additional exercises for existing lessons
            { lessonId: 'operatoren', exercises: [
                { type: 'mc', topic: 'operatoren', q: 'Welcher Operator gehört zu AFB I?', options: ['analysieren', 'beschreiben', 'erörtern', 'bewerten'], answer: 1, explanation: 'Beschreiben ist Reproduktion.' },
                { type: 'match', topic: 'operatoren', title: 'AFB zuordnen', pairs: [['nennen','AFB I'],['analysieren','AFB II'],['erörtern','AFB III']] }
            ]},
            { lessonId: 'textanalyse_sachtext', exercises: [
                { type: 'mc', topic: 'textanalyse_sachtext', q: 'Was untersucht die Sachtextanalyse?', options: ['Nur die Wortwahl','Inhalt, Aufbau, Argumentation, Sprache','Nur die Schlusspointe','Nur die Quellenangabe'], answer: 1, explanation: 'Alle vier Aspekte.' },
                { type: 'cloze', topic: 'textanalyse_sachtext', text: 'In der Einleitung nennt man Autor, ___, Textsorte und ___.', answers: [['Quelle','Thema']], explanation: 'Quelle + Thema.' }
            ]},
            { lessonId: 'erorterung', exercises: [
                { type: 'mc', topic: 'erorterung', q: 'Was zeichnet eine gute Erörterung aus?', options: ['Nur eigene Meinung','Pro und Contra abwägen, eigene Position begründen','Wörtliche Nacherzählung','Nur Beispiele ohne Position'], answer: 1, explanation: 'Struktur: Pro, Contra, eigene Position.' },
                { type: 'sort', topic: 'erorterung', items: ['Einleitung mit Thema','Pro-Argumente','Contra-Argumente','Eigene Stellungnahme','Schluss-Fazit'], explanation: 'Lineare Erörterung.' }
            ]},
            { lessonId: 'grammatik', exercises: [
                { type: 'mc', topic: 'grammatik', q: 'Welcher Kasus steht nach „wegen"?', options: ['Nominativ','Akkusativ','Dativ','Genitiv'], answer: 3, explanation: 'Wegen + Genitiv.' },
                { type: 'fill', topic: 'grammatik', text: 'Ich helfe ___ (mein Bruder).', answers: [['meinem Bruder']], explanation: 'Dativ.' }
            ]},
            { lessonId: 'rechtschreibung', exercises: [
                { type: 'error', topic: 'rechtschreibung', text: 'Das ist ein grosser Fehler. Er hat das Fahrrad repariert, damit es wieder fährt.', corrections: [
                    { find: 'grosser', replace: 'großer', why: 'Nach kurzem Vokal → ß.' },
                    { find: 'damit es wieder fährt', replace: ', damit es wieder fährt', why: 'Komma vor Nebensatz.' }
                ]}
            ]},
            { lessonId: 'zusammenfassung', exercises: [
                { type: 'mc', topic: 'zusammenfassung', q: 'Welche Aussage zur Zusammenfassung ist richtig?', options: ['Eigene Meinung einbauen','Sachlich und neutral bleiben','Wörtlich zitieren','Länger als Originaltext sein'], answer: 1, explanation: 'Sachlich, neutral, kürzer.' },
                { type: 'cloze', topic: 'zusammenfassung', text: 'Eine Zusammenfassung gibt die ___ eines Textes in eigenen Worten wieder.', answers: [['Kernaussagen','Hauptaussagen']], explanation: 'Kernaussagen.' }
            ]},
            { lessonId: 'textanalyse_literarisch', exercises: [
                { type: 'mc', topic: 'textanalyse_literarisch', q: 'Was beschreibt die „Erzählperspektive"?', options: ['Länge des Textes','Sichtweise des Erzählers (Ich, personal, auktorial)','Anzahl der Figuren','Druckart'], answer: 1, explanation: 'Sichtweise des Erzählers.' }
            ]},
            { lessonId: 'materialgestuetztes_schreiben', exercises: [
                { type: 'mc', topic: 'materialgestuetztes_schreiben', q: 'Worauf muss man beim materialgestützten Schreiben achten?', options: ['Material wörtlich übernehmen','Material sinnvoll einbinden und eigene Meinung kennzeichnen','Material ignorieren','Nur Material zusammenfassen'], answer: 1, explanation: 'Einbinden, eigene Meinung markieren.' }
            ]},
            { lessonId: 'sprachbilder', exercises: [
                { type: 'match', topic: 'sprachbilder', title: 'Stilfigur zuordnen', pairs: [['Metapher','bildlicher Ausdruck ohne „wie"'],['Vergleich','mit „wie" oder „als"'],['Personifikation','menschliche Eigenschaften für Dinge'],['Hyperbel','starke Übertreibung']] }
            ]},
            { lessonId: 'textsorten_uebersicht', exercises: [
                { type: 'mc', topic: 'textsorten_uebersicht', q: 'Welche Textsorte informiert sachlich?', options: ['Erzählung','Sachtext','Gedicht','Drama'], answer: 1, explanation: 'Sachtext = informierend.' }
            ]},
            { lessonId: 'kurzgeschichte', exercises: [
                { type: 'mc', topic: 'kurzgeschichte', q: 'Was kennzeichnet eine Kurzgeschichte?', options: ['Offener Schluss','Wendepunkt, offenes Ende, alltägliches Geschehen','Lange Beschreibung','Viele Figuren mit Hintergrund'], answer: 1, explanation: 'Kurz, Wendepunkt, Pointenschluss.' }
            ]},
            { lessonId: 'romananalyse', exercises: [
                { type: 'mc', topic: 'romananalyse', q: 'Welche Bestandteile hat eine Romananalyse?', options: ['Nur Inhalt','Inhalt, Aufbau, Figuren, Sprache, Intention','Nur Klappentext','Nur Zitate'], answer: 1, explanation: 'Mehrere Aspekte.' }
            ]},
            { lessonId: 'bewerbung_schreiben', exercises: [
                { type: 'mc', topic: 'bewerbung_schreiben', q: 'Was gehört in einen Lebenslauf?', options: ['Nur Name','Persönliche Daten, Ausbildung, Erfahrung, Kenntnisse','Nur Hobbys','Nur Foto'], answer: 1, explanation: 'Vollständiger Lebenslauf.' }
            ]},
            { lessonId: 'argumentation', exercises: [
                { type: 'mc', topic: 'argumentation', q: 'Was ist ein „belegtes Argument"?', options: ['Behauptung ohne Beleg','Aussage mit Beispiel oder Quelle','Nur eigene Meinung','Nur Statistik'], answer: 1, explanation: 'Beispiel/Quelle stützt.' }
            ]},
            { lessonId: 'literatur_epochen', exercises: [
                { type: 'match', topic: 'literatur_epochen', title: 'Epoche zuordnen', pairs: [['Aufklärung','18. Jh., Vernunft'],['Romantik','Gefühl, Natur'],['Expressionismus','Krieg, Fragment'],['Naturalismus','Gesellschaft, Detail']] }
            ]},
            { lessonId: 'pruefung_organisation', exercises: [
                { type: 'sort', topic: 'pruefung_organisation', items: ['Mitzubringende Dinge prüfen','Schreibmaterial bereitlegen','Pausen einplanen','Zeit am Ende für Korrektur'], explanation: 'Organisation.' },
                { type: 'mc', topic: 'pruefung_organisation', q: 'Wie viel Reservezeit am Ende der Prüfung einplanen?', options: ['0 min','5 min','10–15 min','45 min'], answer: 2, explanation: 'Korrekturen und Lesen.' },
                { type: 'fill', topic: 'pruefung_organisation', text: 'Vor der Prüfung sollte man ausreichend ___ haben.', answers: [['geschlafen']], explanation: 'Schlaf.' }
            ]}
        ],
        en: [
            { lessonId: 'operators', exercises: [
                { type: 'mc', topic: 'operators', q: 'Which operator requires giving reasons?', options: ['list', 'outline', 'justify', 'copy'], answer: 2, explanation: 'Justify = give reasons.' },
                { type: 'match', topic: 'operators', title: 'Operator and meaning', pairs: [['outline','main points'],['comment','opinion with reasons'],['summarise','short version'],['compare','similarities and differences']] }
            ]},
            { lessonId: 'comment', exercises: [
                { type: 'mc', topic: 'comment', q: 'A good comment ends with …', options: ['a question', 'a personal opinion', 'a list', 'a quote'], answer: 1, explanation: 'Conclusion = own opinion.' },
                { type: 'sort', topic: 'comment', items: ['Reference the statement','Main arguments','Counter-arguments','Own opinion'], explanation: 'Structure of a comment.' }
            ]},
            { lessonId: 'mediation', exercises: [
                { type: 'mc', topic: 'mediation', q: 'In mediation, you should …', options: ['translate word by word', 'adapt content for a new audience', 'invent facts', 'skip the source'], answer: 1, explanation: 'Adapt to new audience.' }
            ]},
            { lessonId: 'summary', exercises: [
                { type: 'mc', topic: 'summary', q: 'A summary should be …', options: ['longer than the original', 'neutral and shorter', 'full of personal opinion', 'a copy'], answer: 1, explanation: 'Neutral, shorter.' },
                { type: 'cloze', topic: 'summary', text: 'A summary uses ___ words and stays ___ to the source.', answers: [['own'], ['neutral','factual']], explanation: 'Own words, neutral.' }
            ]},
            { lessonId: 'reading', exercises: [
                { type: 'mc', topic: 'reading', q: 'When reading an article, you should first …', options: ['translate it', 'skim for the main claim', 'write a comment', 'look at pictures'], answer: 1, explanation: 'Skim first.' }
            ]},
            { lessonId: 'grammar_tenses', exercises: [
                { type: 'mc', topic: 'grammar_tenses', q: 'If she ___ harder, she would pass.', options: ['studies', 'studied', 'has studied', 'will study'], answer: 1, explanation: 'Type 2: If + past simple.' },
                { type: 'fill', topic: 'grammar_tenses', text: 'If I ___ more time, I would learn Spanish.', answers: [['had']], explanation: 'Type 2.' },
                { type: 'error', topic: 'grammar_tenses', text: 'Yesterday I have went to the library.', corrections: [{ find: 'have went', replace: 'went', why: 'Irregular past participle; finished time.' }] }
            ]},
            { lessonId: 'formal_informal', exercises: [
                { type: 'match', topic: 'formal_informal', title: 'Formal vs informal', pairs: [['want','would like'],['get','receive'],['a lot of','numerous'],['thanks','thank you very much']] }
            ]},
            { lessonId: 'vocabulary_themes', exercises: [
                { type: 'match', topic: 'vocabulary_themes', title: 'Synonyms', pairs: [['big','enormous'],['start','commence'],['end','conclude'],['show','demonstrate']] }
            ]},
            { lessonId: 'conditional_drills', exercises: [
                { type: 'mc', topic: 'grammar_tenses', q: 'If I had studied, I ___ the exam.', options: ['would pass', 'would have passed', 'pass', 'will pass'], answer: 1, explanation: 'Type 3: would have + past participle.' },
                { type: 'fill', topic: 'grammar_tenses', text: 'If they ___ (come), we would be happy.', answers: [['came']], explanation: 'Type 2: past simple.' }
            ]},
            { lessonId: 'passive_voice', exercises: [
                { type: 'mc', topic: 'grammar_tenses', q: 'The book ___ by the teacher.', options: ['reads', 'is read', 'is reading', 'has read'], answer: 1, explanation: 'Passive: be + past participle.' }
            ]},
            { lessonId: 'reported_speech', exercises: [
                { type: 'mc', topic: 'grammar_tenses', q: 'Direct: „I am tired." Reported:', options: ['he said he is tired', 'he said he was tired', 'he said he be tired', 'he says he was tired'], answer: 1, explanation: 'Backshift.' }
            ]},
            { lessonId: 'articles_and_quantifiers', exercises: [
                { type: 'fill', topic: 'grammar_tenses', text: 'I saw ___ elephant at the zoo.', answers: [['an']], explanation: 'An + vowel sound.' }
            ]},
            { lessonId: 'prepositions', exercises: [
                { type: 'fill', topic: 'grammar_tenses', text: 'I arrive ___ Monday morning.', answers: [['on']], explanation: 'On + day.' }
            ]},
            { lessonId: 'linking_words', exercises: [
                { type: 'match', topic: 'grammar_tenses', title: 'Linking words', pairs: [['however','contrast'],['therefore','result'],['furthermore','addition'],['although','concession']] }
            ]},
            { lessonId: 'collocations', exercises: [
                { type: 'mc', topic: 'vocabulary_themes', q: 'Which collocation is correct?', options: ['make a decision', 'do a decision', 'take a decision', 'have decision'], answer: 0, explanation: 'Make a decision.' }
            ]},
            { lessonId: 'phrasal_verbs', exercises: [
                { type: 'mc', topic: 'vocabulary_themes', q: '„Look forward to" means …', options: ['expect with pleasure', 'look at', 'search for', 'avoid'], answer: 0, explanation: 'Look forward to = anticipate with pleasure.' }
            ]},
            { lessonId: 'charts_and_descriptions', exercises: [
                { type: 'mc', topic: 'reading', q: 'A chart description should start with …', options: ['a personal opinion', 'an overall trend', 'a list of numbers', 'a joke'], answer: 1, explanation: 'Overall trend first.' }
            ]},
            { lessonId: 'letter_writing', exercises: [
                { type: 'mc', topic: 'writing', q: 'A formal letter begins with …', options: ['Hey!', 'Dear Sir or Madam,', 'Hi,', 'Yo,'], answer: 1, explanation: 'Formal salutation.' }
            ]},
            { lessonId: 'listening_strategy', exercises: [
                { type: 'sort', topic: 'listening', items: ['Read the questions','Predict vocabulary','Listen for key words','Check answers'], explanation: 'Listening strategy.' }
            ]},
            { lessonId: 'exam_strategy', exercises: [
                { type: 'mc', topic: 'writing', q: 'How long should you spend on planning in a 240-min exam?', options: ['5 min', '15–20 min', '60 min', '0 min'], answer: 1, explanation: 'Plan ~15–20 min.' }
            ]},
            { lessonId: 'translation_common_mistakes', exercises: [
                { type: 'error', topic: 'grammar_tenses', text: 'I am agree with you. I have 18 years.', corrections: [
                    { find: 'I am agree', replace: 'I agree', why: 'Agree is not a passive verb.' },
                    { find: 'I have 18 years', replace: 'I am 18 years old', why: 'Age in English = be + years old.' }
                ]},
                { type: 'mc', topic: 'grammar_tenses', q: 'Choose the correct past-tense sentence.', options: ['Yesterday I go to the cinema', 'Yesterday I went to the cinema', 'Yesterday I goed to the cinema', 'Yesterday I gone to the cinema'], answer: 1, explanation: 'Past simple of go = went.' },
                { type: 'mc', topic: 'vocabulary_themes', q: 'You find an activity uninteresting. How do you describe your feeling?', options: ['I am boring', 'I am bored', 'I bore', 'I am boredom'], answer: 1, explanation: 'Bored describes how someone feels when an activity is not interesting.' },
                { type: 'mc', topic: 'vocabulary_themes', q: 'Which sentence uses the correct preposition for a time?', options: ['School starts at 8', 'School starts in 8', 'School starts on 8', 'School starts by 8'], answer: 0, explanation: 'At + time.' },
                { type: 'fill', topic: 'grammar_tenses', text: 'If I ___ (be) rich, I would travel.', answers: [['were']], explanation: 'Type 2.' },
                { type: 'match', topic: 'vocabulary_themes', title: 'Match the meaning', pairs: [['a large amount','a lot of'],['not easy','difficult'],['having great value','important'],['in a short time','soon']] },
                { type: 'mc', topic: 'writing', q: 'Which phrase means at first, before things changed?', options: ['At the beginning', 'In the beginning', 'On the beginning', 'To the beginning'], answer: 1, explanation: 'In the beginning.' },
                { type: 'mc', topic: 'grammar_tenses', q: 'Past Perfect of "write":', options: ['wrote', 'have written', 'had written', 'was written'], answer: 2, explanation: 'Had + past participle.' }
            ]}
        ],
        math: [
            { lessonId: 'funktionen_grundlagen', exercises: [
                { type: 'mc', topic: 'funktionen', q: 'Welche Zuordnung ist eine Funktion?', options: ['Jedem x genau ein y','Mehrere y pro x','Nur diskrete Werte','Nur konstante Funktionen'], answer: 0, explanation: 'Funktion = eindeutige Zuordnung.' },
                { type: 'fill', topic: 'funktionen', text: 'f(x) = x³ ist ___ symmetrisch zum Ursprung.', answers: [['punkt']], explanation: 'Punktsymmetrie.' }
            ]},
            { lessonId: 'lineare_funktionen', exercises: [
                { type: 'math-input', topic: 'funktionen', q: 'Nullstelle von f(x) = 2x - 8.', answers: ['4'], explanation: '2x = 8 → x = 4.' },
                { type: 'mc', topic: 'funktionen', q: 'Welche Form beschreibt eine Gerade?', options: ['y = mx + b','y = ax² + bx + c','y = a^x','y = log x'], answer: 0, explanation: 'Linear.' }
            ]},
            { lessonId: 'quadratische_funktionen', exercises: [
                { type: 'math-input', topic: 'funktionen', q: 'Scheitelpunkt-y von f(x) = (x-3)² + 2.', answers: ['2'], explanation: 'y_S = 2.' },
                { type: 'mc', topic: 'funktionen', q: 'Wann hat eine quadratische Funktion keine reellen Nullstellen?', options: ['D = 0','D > 0','D < 0','immer'], answer: 2, explanation: 'Negative Diskriminante.' }
            ]},
            { lessonId: 'exponentialfunktionen', exercises: [
                { type: 'math-input', topic: 'funktionen', q: 'Wachstumsfaktor bei 3 % Zinseszins.', answers: ['1,03'], explanation: 'q = 1 + p.' },
                { type: 'fill', topic: 'funktionen', text: 'Halbwertszeit: nach T Jahren ist die Menge mit Faktor ___ multipliziert.', answers: [['0,5']], explanation: 'Halbwertszeit.' }
            ]},
            { lessonId: 'logarithmus', exercises: [
                { type: 'math-input', topic: 'funktionen', q: 'log_10(1000) = ?', answers: ['3'], explanation: '10³ = 1000.' },
                { type: 'mc', topic: 'funktionen', q: 'log(a·b) = ?', options: ['log a + log b','log a - log b','log a · log b','log a / log b'], answer: 0, explanation: 'Logarithmusgesetz.' }
            ]},
            { lessonId: 'differentialrechnung_einstieg', exercises: [
                { type: 'fill', topic: 'differentialrechnung', text: 'f′(x) ist die ___ Steigung.', answers: [['lokale']], explanation: 'Lokale Steigung.' },
                { type: 'mc', topic: 'differentialrechnung', q: 'Was ist der Differenzenquotient?', options: ['Mittlere Steigung','Lokale Steigung','Funktionswert','Ableitung'], answer: 0, explanation: 'Mittlere Steigung.' }
            ]},
            { lessonId: 'ableitungsregeln', exercises: [
                { type: 'mc', topic: 'differentialrechnung', q: 'Ableitung von f(x) = eˣ?', options: ['eˣ','x·eˣ','1/eˣ','ln x'], answer: 0, explanation: 'Spezielle Ableitung.' },
                { type: 'math-input', topic: 'differentialrechnung', q: 'f′(x) für f(x) = 4x³ an x = 1.', answers: ['12'], explanation: 'f′(x) = 12x² → 12.' }
            ]},
            { lessonId: 'kurvendiskussion', exercises: [
                { type: 'mc', topic: 'differentialrechnung', q: 'Was ist NICHT Teil der Kurvendiskussion?', options: ['Nullstellen','Extrempunkte','Wendepunkte','Quersumme'], answer: 3, explanation: 'Quersumme ist Zahlentheorie.' }
            ]},
            { lessonId: 'extremwertprobleme', exercises: [
                { type: 'fill', topic: 'differentialrechnung', text: 'Für ein Extremum muss f′(x) = ___ sein.', answers: [['0']], explanation: 'Notwendige Bedingung.' }
            ]},
            { lessonId: 'integralrechnung_einstieg', exercises: [
                { type: 'mc', topic: 'integralrechnung', q: '∫ x dx = ?', options: ['x','x²/2 + C','2x + C','1/x + C'], answer: 1, explanation: 'Stammfunktion.' }
            ]},
            { lessonId: 'flaechenberechnung', exercises: [
                { type: 'math-input', topic: 'integralrechnung', q: '∫₀² 3 dx = ?', answers: ['6'], explanation: '3·(2-0) = 6.' }
            ]},
            { lessonId: 'trigonometrie', exercises: [
                { type: 'mc', topic: 'trigonometrie', q: 'cos(90°) = ?', options: ['0','1','-1','0,5'], answer: 0, explanation: 'cos(90°) = 0.' }
            ]},
            { lessonId: 'trigonometrie_anwendungen', exercises: [
                { type: 'fill', topic: 'trigonometrie', text: 'sin²(x) + cos²(x) = ___', answers: [['1']], explanation: 'Trigonometrischer Pythagoras.' }
            ]},
            { lessonId: 'vektoren', exercises: [
                { type: 'mc', topic: 'vektoren', q: 'Länge des Vektors (3,4) = ?', options: ['5','6','7','25'], answer: 0, explanation: '√(9+16) = 5.' }
            ]},
            { lessonId: 'gerade_im_raum', exercises: [
                { type: 'fill', topic: 'vektoren', text: 'Eine Gerade im Raum hat die Form: x = p + ___ · r.', answers: [['t']], explanation: 'Parameter.' }
            ]},
            { lessonId: 'ebene_im_raum', exercises: [
                { type: 'mc', topic: 'vektoren', q: 'Eine Ebene hat …', options: ['zwei Parameter','einen Parameter','drei Parameter','keinen Parameter'], answer: 0, explanation: 'Zwei Richtungsvektoren.' }
            ]},
            { lessonId: 'kreuzprodukt', exercises: [
                { type: 'mc', topic: 'vektoren', q: 'Das Kreuzprodukt steht …', options: ['senkrecht auf beiden Vektoren','parallel zum ersten','im ersten Vektor','in einer Ebene'], answer: 0, explanation: 'Senkrecht.' }
            ]},
            { lessonId: 'matrizen', exercises: [
                { type: 'math-input', topic: 'matrizen', q: 'det der 2x2-Matrix [[1,2],[3,4]] = ?', answers: ['-2'], explanation: '1·4 - 2·3 = -2.' }
            ]},
            { lessonId: 'lineare_gleichungssysteme', exercises: [
                { type: 'mc', topic: 'matrizen', q: 'Wann hat ein LGS keine Lösung?', options: ['Gleichungen sind Vielfache','Widerspruch in den Gleichungen','Genau eine Variable','Mehr Variablen als Gleichungen'], answer: 1, explanation: 'Widerspruch.' }
            ]},
            { lessonId: 'stochastik_grundlagen', exercises: [
                { type: 'fill', topic: 'stochastik', text: 'P(A) + P(Ā) = ___', answers: [['1']], explanation: 'Komplementär.' }
            ]},
            { lessonId: 'bedingte_wahrscheinlichkeit', exercises: [
                { type: 'mc', topic: 'stochastik', q: 'P(A|B) liest man als …', options: ['A unter B','B unter A','A oder B','A und B'], answer: 0, explanation: 'Bedingte Wkt.' }
            ]},
            { lessonId: 'binomialverteilung', exercises: [
                { type: 'math-input', topic: 'stochastik', q: 'Erwartungswert bei n=20, p=0,3.', answers: ['6'], explanation: 'E = n·p = 6.' }
            ]},
            { lessonId: 'normalverteilung', exercises: [
                { type: 'mc', topic: 'stochastik', q: 'Die Standardnormalverteilung hat …', options: ['μ=0, σ=1','μ=1, σ=0','μ=0, σ=0','μ=10, σ=1'], answer: 0, explanation: 'Standardnormal.' }
            ]},
            { lessonId: 'modellierung', exercises: [
                { type: 'fill', topic: 'modellierung', text: 'Modellierung: vom ___ zum mathematischen Modell.', answers: [['Sachproblem','Problem']], explanation: 'Sachproblem → Modell.' }
            ]},
            { lessonId: 'gleichungssysteme_linear', exercises: [
                { type: 'mc', topic: 'matrizen', q: 'Additionsverfahren löst …', options: ['lineare Gleichungssysteme','quadratische Gleichungen','Integrale','Ableitungen'], answer: 0, explanation: 'LGS.' }
            ]},
            { lessonId: 'potenzen_wurzeln', exercises: [
                { type: 'math-input', topic: 'funktionen', q: '√81 = ?', answers: ['9'], explanation: 'Quadratwurzel.' }
            ]},
            { lessonId: 'prozent_zinsrechnung', exercises: [
                { type: 'fill', topic: 'prozent_zinsrechnung', text: '20 % von 50 € = ___ €', answers: [['10']], explanation: '20/100·50 = 10.' }
            ]},
            { lessonId: 'geometrie_koerper', exercises: [
                { type: 'mc', topic: 'geometrie', q: 'Volumen einer Kugel mit r = 3?', options: ['36π','4π·27 = 108π','12π','27π'], answer: 1, explanation: 'V = 4/3·π·r³ = 108π.' }
            ]}
        ]
    };

    function applyExtras(subject, list, byId) {
        const s = (extras[subject] || []);
        let addedLessons = 0;
        let addedExercises = 0;
        for (const item of s) {
            if (item.lessonId && byId[item.lessonId]) {
                // Append exercises to existing lesson
                byId[item.lessonId].exercises = (byId[item.lessonId].exercises || []).concat(item.exercises || []);
                addedExercises += (item.exercises || []).length;
                // Mirror to list
                const lIdx = list.findIndex(l => l.id === item.lessonId);
                if (lIdx >= 0) list[lIdx].exercises = byId[item.lessonId].exercises;
            } else if (item.id) {
                // New lesson
                byId[item.id] = item;
                list.push(Object.assign({}, item, { exercises: (item.exercises || []).slice() }));
                addedLessons++;
                addedExercises += (item.exercises || []).length;
            }
        }
        return { addedLessons, addedExercises };
    }

    function apply() {
        if (root.ContentDE) {
            const r1 = applyExtras('de', root.ContentDE.list, root.ContentDE.byId);
            (root.console || console).log('DE extras: ' + r1.addedLessons + ' lessons, ' + r1.addedExercises + ' exercises');
        }
        if (root.ContentEN) {
            const r2 = applyExtras('en', root.ContentEN.list, root.ContentEN.byId);
            (root.console || console).log('EN extras: ' + r2.addedLessons + ' lessons, ' + r2.addedExercises + ' exercises');
        }
        if (root.ContentMATH) {
            const r3 = applyExtras('math', root.ContentMATH.list, root.ContentMATH.byId);
            (root.console || console).log('Math extras: ' + r3.addedLessons + ' lessons, ' + r3.addedExercises + ' exercises');
        }
    }

    root.ContentExtras = { apply };
})(window);
