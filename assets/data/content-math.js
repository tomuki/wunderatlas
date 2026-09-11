/* Mathematik curriculum content for FHR BK (Baden-Württemberg).
   Topics: Funktionen, Differentialrechnung, Integralrechnung, Vektoren,
   Analytische Geometrie, Matrizen, Trigonometrie, Stochastik, Modellierung.
   No copyrighted material; original explanations and exercises. */
(function (root) {
    const MATH = {
        funktionen_grundlagen: {
            id: 'funktionen_grundlagen',
            title: 'Funktionen – Grundbegriffe',
            type: 'lesson',
            summary: 'Funktionen ordnen jeder Eingabe genau eine Ausgabe zu. Definitions- und Wertebereich, Symmetrie und Verhalten an Grenzen.',
            sections: [
                { h: 'Definition', html: '<p>Eine Funktion <em>f</em> ordnet jedem Element <em>x</em> aus dem Definitionsbereich <em>D</em> genau ein Element <em>f(x)</em> aus dem Wertebereich <em>W</em> zu.</p>' },
                { h: 'Symmetrie', html: '<p>Eine Funktion heißt <strong>achsensymmetrisch</strong>, wenn <em>f(-x) = f(x)</em> für alle x (z. B. quadratische Funktionen).<br>Sie heißt <strong>punktsymmetrisch</strong>, wenn <em>f(-x) = -f(x)</em> (z. B. kubische Funktionen).</p>' },
                { h: 'Verhalten im Unendlichen', html: '<p>Bei ganzrationalen Funktionen bestimmt der Leitkoeffizient des höchsten Grades das Verhalten für |x| → ∞.</p>' }
            ],
            exercises: [
                { type: 'mc', topic: 'funktionen', q: 'Welche Funktion ist achsensymmetrisch?', options: ['f(x) = x³','f(x) = sin(x)','f(x) = x²','f(x) = eˣ'], answer: 2, explanation: 'Quadratische Funktionen sind achsensymmetrisch zur y-Achse.' },
                { type: 'fill', topic: 'funktionen', q: 'Ergänze: f(x) = 2x⁴ ist ___-symmetrisch.', text: 'f(x) = 2x⁴ ist ___-symmetrisch.', answers: [['achsen']], explanation: 'Gerade Exponenten → achsensymmetrisch.' }
            ]
        },

        lineare_funktionen: {
            id: 'lineare_funktionen',
            title: 'Lineare Funktionen',
            type: 'lesson',
            summary: 'Funktionen der Form f(x) = mx + b. Bedeutung von Steigung m und y-Achsen-Abschnitt b.',
            sections: [
                { h: 'Form', html: '<p>f(x) = mx + b mit m ≠ 0.<br>Steigung <em>m = Δy/Δx</em>, y-Achsen-Abschnitt <em>b = f(0)</em>.</p>' },
                { h: 'Steigungswinkel', html: '<p>Der Winkel α zur x-Achse: tan(α) = m.</p>' }
            ],
            exercises: [
                { type: 'mc', topic: 'funktionen', q: 'Welche Steigung hat die Gerade durch A(1,2) und B(4,8)?', options: ['1','2','3','4'], answer: 1, explanation: 'm = (8-2)/(4-1) = 6/3 = 2.' },
                { type: 'fill', topic: 'funktionen', q: 'Bestimme den y-Achsen-Abschnitt von f(x) = 3x - 7.', text: 'f(x) = 3x - 7 hat b = ___', answers: [['-7']], explanation: 'b = -7.' }
            ]
        },

        quadratische_funktionen: {
            id: 'quadratische_funktionen',
            title: 'Quadratische Funktionen und Parabeln',
            type: 'lesson',
            summary: 'Funktionen der Form f(x) = ax² + bx + c. Scheitelpunkt, Nullstellen, Öffnung.',
            sections: [
                { h: 'Scheitelpunkt', html: '<p>Per quadratischer Ergänzung oder mit der Formel: S = (-b/(2a), -D/(4a)) mit D = b² - 4ac.</p>' },
                { h: 'Nullstellen', html: '<p>Mitternachtsformel: x = (-b ± √(b²-4ac))/(2a).<br>Diskriminante D = b² - 4ac.<br>D &gt; 0: zwei Nullstellen, D = 0: eine, D &lt; 0: keine.</p>' }
            ],
            exercises: [
                { type: 'mc', topic: 'funktionen', q: 'Wie viele Nullstellen hat f(x) = x² - 4?', options: ['0','1','2','3'], answer: 2, explanation: 'x² = 4 → x = ±2.' },
                { type: 'math-input', topic: 'funktionen', q: 'Löse x² - 5x + 6 = 0. Gib die kleinere Lösung an.', answers: ['2'], explanation: 'x = 2 oder x = 3.' }
            ]
        },

        exponentialfunktionen: {
            id: 'exponentialfunktionen',
            title: 'Exponentialfunktionen',
            type: 'lesson',
            summary: 'Funktionen der Form f(x) = a·bˣ oder f(x) = a·e^(kx). Wachstums- und Zerfallsprozesse.',
            sections: [
                { h: 'Form', html: '<p>Allgemein: f(x) = a·bˣ.<br>Spezialfall: f(x) = eˣ (Euler’sche Zahl e ≈ 2,71828).</p>' },
                { h: 'Anwendungen', html: '<ul><li>Zinseszins: K_n = K_0·(1+p)^n</li><li>Bakterienwachstum</li><li>Radioaktiver Zerfall: N(t) = N_0·e^(-λt)</li></ul>' }
            ],
            exercises: [
                { type: 'mc', topic: 'funktionen', q: 'Ein Kapital von 1000 € wächst jährlich um 5 %. Wie groß ist es nach 3 Jahren (gerundet)?', options: ['1150 €','1157,63 €','1200 €','1500 €'], answer: 1, explanation: '1000·1,05³ ≈ 1157,63.' },
                { type: 'fill', topic: 'funktionen', q: 'e^(ln 7) = ___', text: 'e^(ln 7) = ___', answers: [['7']], explanation: 'e und ln sind Umkehrfunktionen.' }
            ]
        },

        logarithmus: {
            id: 'logarithmus',
            title: 'Logarithmus und Logarithmusfunktion',
            type: 'lesson',
            summary: 'Der Logarithmus ist die Umkehrung der Exponentialfunktion. Rechenregeln.',
            sections: [
                { h: 'Definition', html: '<p>log_b(x) = y genau dann, wenn b^y = x.</p>' },
                { h: 'Rechenregeln', html: '<ul><li>log(a·b) = log(a) + log(b)</li><li>log(a/b) = log(a) - log(b)</li><li>log(a^n) = n·log(a)</li></ul>' }
            ],
            exercises: [
                { type: 'mc', topic: 'funktionen', q: 'log_2(8) = ?', options: ['2','3','4','8'], answer: 1, explanation: '2^3 = 8.' },
                { type: 'fill', topic: 'funktionen', q: 'log(100) = ___ (Basis 10)', text: 'log(100) = ___', answers: [['2']], explanation: '10² = 100.' }
            ]
        },

        differentialrechnung_einstieg: {
            id: 'differentialrechnung_einstieg',
            title: 'Differenzialrechnung – Einstieg',
            type: 'lesson',
            summary: 'Die Ableitung f′(x) beschreibt die lokale Steigung. Differenzenquotient und Differentialquotient.',
            sections: [
                { h: 'Differenzenquotient', html: '<p>m = (f(x+h) - f(x))/h. Entspricht der mittleren Steigung zwischen x und x+h.</p>' },
                { h: 'Differentialquotient', html: '<p>f′(x) = lim_(h→0) (f(x+h)-f(x))/h. Entspricht der lokalen Steigung im Punkt x.</p>' }
            ],
            exercises: [
                { type: 'mc', topic: 'differentialrechnung', q: 'Was beschreibt f′(x)?', options: ['Wertebereich','Lokale Steigung','Nullstellen','Symmetrie'], answer: 1, explanation: 'Ableitung = lokale Steigung.' },
                { type: 'math-input', topic: 'differentialrechnung', q: 'Ableitung von f(x) = 3x² an der Stelle x = 2. f′(2) = ?', answers: ['12'], explanation: 'f′(x) = 6x → f′(2) = 12.' }
            ]
        },

        ableitungsregeln: {
            id: 'ableitungsregeln',
            title: 'Ableitungsregeln',
            type: 'lesson',
            summary: 'Summen-, Faktor-, Produkt- und Kettenregel.',
            sections: [
                { h: 'Regeln', html: '<ul><li><strong>Summenregel:</strong> (u+v)′ = u′ + v′</li><li><strong>Faktorregel:</strong> (c·u)′ = c·u′</li><li><strong>Potenzregel:</strong> (x^n)′ = n·x^(n-1)</li><li><strong>Produktregel:</strong> (u·v)′ = u′·v + u·v′</li><li><strong>Kettenregel:</strong> (u(v(x)))′ = u′(v(x))·v′(x)</li></ul>' }
            ],
            exercises: [
                { type: 'mc', topic: 'differentialrechnung', q: 'Ableitung von f(x) = x⁵?', options: ['5x⁴','5x⁵','x⁴','5x'], answer: 0, explanation: 'Potenzregel.' },
                { type: 'fill', topic: 'differentialrechnung', q: 'Ableitung von f(x) = sin(x)·cos(x).', text: 'f′(x) = ___ (vereinfacht)', answers: [['cos(2x)','cos(2x)']], explanation: 'Produktregel + trigonometrischer Pythagoras.' }
            ]
        },

        kurvendiskussion: {
            id: 'kurvendiskussion',
            title: 'Kurvendiskussion',
            type: 'lesson',
            summary: 'Untersuchung von Funktionen: Nullstellen, Extrema, Wendepunkte, Symmetrie, Verhalten im Unendlichen.',
            sections: [
                { h: 'Schema', html: '<ol><li>Definitions- und Wertebereich</li><li>Symmetrie</li><li>Nullstellen (f(x) = 0)</li><li>Extrema (f′(x) = 0, Vorzeichenwechsel)</li><li>Wendepunkte (f″(x) = 0)</li><li>Verhalten im Unendlichen</li><li>Graph zeichnen</li></ol>' }
            ],
            exercises: [
                { type: 'mc', topic: 'differentialrechnung', q: 'Welche Bedingung gilt für einen Hochpunkt?', options: ['f′(x) = 0 und f″(x) > 0','f′(x) = 0 und f″(x) < 0','f(x) = 0','f″(x) = 0'], answer: 1, explanation: 'Hochpunkt: f′ = 0 und f″ &lt; 0.' },
                { type: 'sort', topic: 'differentialrechnung', title: 'Reihenfolge der Kurvendiskussion', items: ['Definitions- und Wertebereich','Nullstellen','Extrema','Wendepunkte','Verhalten im Unendlichen'] }
            ]
        },

        extremwertprobleme: {
            id: 'extremwertprobleme',
            title: 'Extremwertprobleme',
            type: 'lesson',
            summary: 'Optimierungsaufgaben aus dem Sachzusammenhang: Funktion aufstellen, ableiten, Randwerte prüfen.',
            sections: [
                { h: 'Vorgehen', html: '<ol><li>Problem formal beschreiben (Ziel- und Nebenbedingung)</li><li>Zielfunktion aufstellen</li><li>Ableiten, Nullstellen bestimmen</li><li>Art des Extremums prüfen</li><li>Antwort im Sachzusammenhang formulieren</li></ol>' }
            ],
            exercises: [
                { type: 'mc', topic: 'differentialrechnung', q: 'Welcher Schritt kommt in der Lösung eines Extremwertproblems?', options: ['Funktion aufstellen und ableiten','Nur die Gleichung raten','Nur eine Skizze anfertigen','Den y-Achsen-Abschnitt nennen'], answer: 0, explanation: 'Funktion aufstellen und ableiten ist zentral.' }
            ]
        },

        integralrechnung_einstieg: {
            id: 'integralrechnung_einstieg',
            title: 'Integralrechnung – Einstieg',
            type: 'lesson',
            summary: 'Das bestimmte Integral berechnet die orientierte Fläche zwischen Kurve und x-Achse.',
            sections: [
                { h: 'Definition', html: '<p>∫_a^b f(x) dx = F(b) - F(a), wobei F eine Stammfunktion von f ist.</p>' },
                { h: 'Regeln', html: '<ul><li>∫(f+g) dx = ∫f dx + ∫g dx</li><li>∫(c·f) dx = c·∫f dx</li><li>∫x^n dx = x^(n+1)/(n+1) + C (n ≠ -1)</li></ul>' }
            ],
            exercises: [
                { type: 'mc', topic: 'integralrechnung', q: '∫ 2x dx = ?', options: ['2x² + C','x² + C','2x + C','x + C'], answer: 1, explanation: '∫ 2x dx = 2·x²/2 + C = x² + C.' },
                { type: 'math-input', topic: 'integralrechnung', q: 'Berechne ∫_0^1 3x² dx.', answers: ['1'], explanation: '∫ = [x³]_0^1 = 1 - 0 = 1.' }
            ]
        },

        flaechenberechnung: {
            id: 'flaechenberechnung',
            title: 'Flächenberechnung mit Integralen',
            type: 'lesson',
            summary: 'Berechnung von Flächen zwischen Kurve und x-Achse sowie zwischen zwei Kurven.',
            sections: [
                { h: 'Formel', html: '<p>A = ∫_a^b |f(x) - g(x)| dx für Fläche zwischen zwei Kurven f und g.</p>' }
            ],
            exercises: [
                { type: 'mc', topic: 'integralrechnung', q: 'Fläche zwischen y = x² und y = x im Intervall [0, 1]?', options: ['1/6','1/2','1/3','2/3'], answer: 0, explanation: 'A = ∫_0^1 (x - x²) dx = [x²/2 - x³/3]_0^1 = 1/2 - 1/3 = 1/6.' }
            ]
        },

        trigonometrie: {
            id: 'trigonometrie',
            title: 'Trigonometrie – Grundlagen',
            type: 'lesson',
            summary: 'Sinus, Kosinus und Tangens am Einheitskreis. Werte für 0°, 30°, 45°, 60°, 90°.',
            sections: [
                { h: 'Definition am Einheitskreis', html: '<p>sin(α) = y/r, cos(α) = x/r, tan(α) = sin/cos.</p>' },
                { h: 'Wichtige Werte', html: '<ul><li>sin(0°)=0, sin(30°)=1/2, sin(45°)=√2/2, sin(60°)=√3/2, sin(90°)=1</li><li>cos(0°)=1, cos(30°)=√3/2, cos(45°)=√2/2, cos(60°)=1/2, cos(90°)=0</li></ul>' }
            ],
            exercises: [
                { type: 'mc', topic: 'trigonometrie', q: 'sin(30°) = ?', options: ['0','1/2','√2/2','1'], answer: 1, explanation: 'Standardwert 30°.' },
                { type: 'fill', topic: 'trigonometrie', q: 'Trigonometrischer Pythagoras: sin²(x) + cos²(x) = ___', text: 'sin²(x) + cos²(x) = ___', answers: [['1']], explanation: 'Identität am Einheitskreis.' }
            ]
        },

        trigonometrie_anwendungen: {
            id: 'trigonometrie_anwendungen',
            title: 'Trigonometrie – Anwendungen',
            type: 'lesson',
            summary: 'Sinus- und Kosinussatz, Berechnungen an allgemeinen Dreiecken.',
            sections: [
                { h: 'Sinussatz', html: '<p>a/sin(α) = b/sin(β) = c/sin(γ) = 2R.</p>' },
                { h: 'Kosinussatz', html: '<p>c² = a² + b² - 2ab·cos(γ).</p>' }
            ],
            exercises: [
                { type: 'mc', topic: 'trigonometrie', q: 'Welcher Satz gilt für jedes Dreieck?', options: ['Nur Sinussatz','Nur Kosinussatz','Beide','Keiner'], answer: 2, explanation: 'Sinus- und Kosinussatz gelten für jedes Dreieck.' }
            ]
        },

        vektoren: {
            id: 'vektoren',
            title: 'Vektoren – Grundlagen',
            type: 'lesson',
            summary: 'Vektoren beschreiben Pfeile im Raum. Addition, Skalarmultiplikation, Länge, Skalarprodukt.',
            sections: [
                { h: 'Rechenregeln', html: '<ul><li>Vektoraddition: a + b = (a₁+b₁, a₂+b₂, a₃+b₃)</li><li>Skalarmultiplikation: λ·a = (λa₁, λa₂, λa₃)</li><li>Länge: |a| = √(a₁² + a₂² + a₃²)</li><li>Skalarprodukt: a·b = a₁b₁ + a₂b₂ + a₃b₃</li></ul>' }
            ],
            exercises: [
                { type: 'mc', topic: 'vektoren', q: 'Länge des Vektors a = (3, 4, 0)?', options: ['5','6','7','25'], answer: 0, explanation: '|a| = √(9+16) = √25 = 5.' },
                { type: 'math-input', topic: 'vektoren', q: 'a = (1, 2, 3), b = (4, 5, 6). a·b = ?', answers: ['32'], explanation: '4+10+18 = 32.' }
            ]
        },

        gerade_im_raum: {
            id: 'gerade_im_raum',
            title: 'Geraden im Raum',
            type: 'lesson',
            summary: 'Parametergleichung einer Geraden, Lagebeziehungen, Schnittpunktberechnung.',
            sections: [
                { h: 'Parameterform', html: '<p>g: x = p + t·u, p Stützvektor, u Richtungsvektor.</p>' },
                { h: 'Lagebeziehungen', html: '<ul><li>Identisch: gleicher Stütz- und Richtungsvektor (bis auf Skalierung)</li><li>Parallel: Richtungsvektoren Vielfache</li><li>Schneidend: eindeutiger Schnittpunkt</li><li>Windschief: weder parallel noch schneidend</li></ul>' }
            ],
            exercises: [
                { type: 'mc', topic: 'vektoren', q: 'Wann sind zwei Geraden identisch?', options: ['Wenn sie parallel sind','Wenn sie denselben Stütz- und einen Vielfachen-Richtungsvektor haben','Wenn sie senkrecht sind','Wenn sie sich schneiden'], answer: 1, explanation: 'Identisch = gleicher Stütz- und Vielfache-Richtungsvektor.' }
            ]
        },

        ebene_im_raum: {
            id: 'ebene_im_raum',
            title: 'Ebenen im Raum',
            type: 'lesson',
            summary: 'Parameterform, Normalenform, Koordinatenform. Abstand Punkt-Ebene.',
            sections: [
                { h: 'Formen', html: '<p><strong>Parameterform:</strong> x = p + r·u + s·v<br><strong>Normalenform:</strong> n·(x - p) = 0<br><strong>Koordinatenform:</strong> ax + by + cz = d</p>' },
                { h: 'Abstand Punkt-Ebene', html: '<p>d(P, E) = |ax_P + by_P + cz_P - d| / √(a² + b² + c²)</p>' }
            ],
            exercises: [
                { type: 'mc', topic: 'vektoren', q: 'Welche Gleichung beschreibt eine Ebene in Koordinatenform?', options: ['x = p + r·u + s·v','n·(x - p) = 0','ax + by + cz = d','y = mx + b'], answer: 2, explanation: 'Koordinatenform: ax + by + cz = d.' }
            ]
        },

        kreuzprodukt: {
            id: 'kreuzprodukt',
            title: 'Kreuzprodukt',
            type: 'lesson',
            summary: 'Berechnung des Vektorprodukts. Bedeutung: Fläche und Senkrechtstehen.',
            sections: [
                { h: 'Definition', html: '<p>a × b = (a₂b₃ - a₃b₂, a₃b₁ - a₁b₃, a₁b₂ - a₂b₁)</p>' },
                { h: 'Eigenschaften', html: '<ul><li>a × b = -b × a</li><li>(a × b) ⊥ a und (a × b) ⊥ b</li><li>|a × b| = Flächeninhalt des aufgespannten Parallelogramms</li></ul>' }
            ],
            exercises: [
                { type: 'mc', topic: 'vektoren', q: 'a × b ist ...', options: ['Skalar','Vektor','immer Null','senkrecht zu a und b'], answer: 3, explanation: 'Das Kreuzprodukt steht senkrecht auf beiden Vektoren.' }
            ]
        },

        matrizen: {
            id: 'matrizen',
            title: 'Matrizen – Grundlagen',
            type: 'lesson',
            summary: 'Matrizen sind rechteckige Zahlenschemata. Addition, Multiplikation, inverse Matrix.',
            sections: [
                { h: 'Operationen', html: '<p>Addition: A + B elementweise (gleiche Dimension).<br>Multiplikation: A·B nur, wenn Spaltenzahl A = Zeilenzahl B.</p>' }
            ],
            exercises: [
                { type: 'mc', topic: 'matrizen', q: 'Wann kann man A·B berechnen?', options: ['Immer','Nur wenn Spaltenzahl A = Zeilenzahl B','Nur wenn A quadratisch ist','Nur wenn A und B gleich groß sind'], answer: 1, explanation: 'Spaltenzahl A muss Zeilenzahl B entsprechen.' }
            ]
        },

        lineare_gleichungssysteme: {
            id: 'lineare_gleichungssysteme',
            title: 'Lineare Gleichungssysteme (Gauß)',
            type: 'lesson',
            summary: 'Gauß-Verfahren zur Lösung linearer Gleichungssysteme.',
            sections: [
                { h: 'Verfahren', html: '<ol><li>Matrix in Zeilenstufenform bringen (zeilenweise umformen)</li><li>Rückwärts einsetzen (back substitution)</li></ol>' }
            ],
            exercises: [
                { type: 'mc', topic: 'matrizen', q: 'Was bedeutet „Zeilenstufenform"?', options: ['Jede Zeile hat gleich viele Nullen','Unterhalb der Hauptdiagonale stehen nur Nullen','Alle Diagonalelemente sind 1','Alle Zeilen sind Vielfache'], answer: 1, explanation: 'In Zeilenstufenform stehen unter den Diagonalelementen Nullen.' }
            ]
        },

        stochastik_grundlagen: {
            id: 'stochastik_grundlagen',
            title: 'Stochastik – Grundbegriffe',
            type: 'lesson',
            summary: 'Zufallsexperiment, Ergebnis, Ereignis, Wahrscheinlichkeit. Laplace-Experimente.',
            sections: [
                { h: 'Laplace', html: '<p>P(E) = |E|/|Ω| (günstige durch mögliche Ergebnisse).</p>' },
                { h: 'Additionssatz', html: '<p>P(A ∪ B) = P(A) + P(B) - P(A ∩ B).</p>' }
            ],
            exercises: [
                { type: 'mc', topic: 'stochastik', q: 'Würfelwurf: P(gerade Augenzahl)?', options: ['1/2','1/3','1/4','1/6'], answer: 0, explanation: '3 von 6 Ergebnissen sind gerade.' }
            ]
        },

        bedingte_wahrscheinlichkeit: {
            id: 'bedingte_wahrscheinlichkeit',
            title: 'Bedingte Wahrscheinlichkeit',
            type: 'lesson',
            summary: 'P(A|B) beschreibt die Wahrscheinlichkeit von A unter der Bedingung B. Satz von Bayes.',
            sections: [
                { h: 'Definition', html: '<p>P(A|B) = P(A ∩ B) / P(B)</p>' },
                { h: 'Satz von Bayes', html: '<p>P(A|B) = P(B|A)·P(A) / P(B)</p>' }
            ],
            exercises: [
                { type: 'mc', topic: 'stochastik', q: 'P(A|B) ist definiert als …', options: ['P(A ∩ B) · P(B)','P(A ∩ B) / P(B)','P(A) + P(B)','P(A) · P(B)'], answer: 1, explanation: 'Bedingte Wahrscheinlichkeit = Schnitt durch Bedingung.' }
            ]
        },

        binomialverteilung: {
            id: 'binomialverteilung',
            title: 'Binomialverteilung',
            type: 'lesson',
            summary: 'n Versuche, Erfolgswahrscheinlichkeit p. Verteilung der Trefferanzahl.',
            sections: [
                { h: 'Formel', html: '<p>P(X = k) = C(n, k)·p^k·(1-p)^(n-k)</p>' },
                { h: 'Erwartungswert', html: '<p>μ = n·p, σ = √(n·p·(1-p))</p>' }
            ],
            exercises: [
                { type: 'mc', topic: 'stochastik', q: 'Erwartungswert bei n = 20, p = 0,3?', options: ['6','3','7','14'], answer: 0, explanation: 'n·p = 6.' }
            ]
        },

        normalverteilung: {
            id: 'normalverteilung',
            title: 'Normalverteilung',
            type: 'lesson',
            summary: 'Glockenförmige Verteilung. Erwartungswert μ und Standardabweichung σ.',
            sections: [
                { h: 'Eigenschaften', html: '<p>Symmetrisch um μ. σ-Regel: ca. 68 % im Intervall [μ-σ, μ+σ], 95 % in [μ-2σ, μ+2σ], 99,7 % in [μ-3σ, μ+3σ].</p>' }
            ],
            exercises: [
                { type: 'mc', topic: 'stochastik', q: 'Wie viel % der Werte liegen im Intervall [μ-σ, μ+σ]?', options: ['50 %','68 %','95 %','99,7 %'], answer: 1, explanation: 'σ-Regel.' }
            ]
        },

        modellierung: {
            id: 'modellierung',
            title: 'Modellierung – Funktionen im Sachzusammenhang',
            type: 'lesson',
            summary: 'Übersetzung von Sachsituationen in Funktionen. Interpretation von Ableitung und Integral.',
            sections: [
                { h: 'Vorgehen', html: '<ol><li>Problem in eine Funktion übersetzen</li><li>Mit Hilfe von Analysis untersuchen</li><li>Ergebnis im Sachkontext deuten</li></ol>' }
            ],
            exercises: [
                { type: 'mc', topic: 'funktionen', q: 'Was beschreibt die Ableitung in einer Wachstumsfunktion?', options: ['Bestand','Wachstumsgeschwindigkeit','Gesamtzuwachs','Maximum'], answer: 1, explanation: 'Ableitung = momentane Änderungsrate.' }
            ]
        },

        gleichungssysteme_linear: {
            id: 'gleichungssysteme_linear',
            title: 'Lineare Gleichungssysteme – Additionsverfahren',
            type: 'lesson',
            summary: 'Lösung einfacher 2×2-Systeme mit dem Additionsverfahren.',
            sections: [
                { h: 'Vorgehen', html: '<ol><li>Eine Variable isolieren oder eliminieren</li><li>Einsetzen, äquivalentes Umformen</li><li>Lösung prüfen</li></ol>' }
            ],
            exercises: [
                { type: 'math-input', topic: 'matrizen', q: 'Löse x + y = 5 und 2x - y = 1. x = ?', answers: ['2'], explanation: 'Addition: 3x = 6 → x = 2.' }
            ]
        },

        potenzen_wurzeln: {
            id: 'potenzen_wurzeln',
            title: 'Potenzen und Wurzeln',
            type: 'lesson',
            summary: 'Rechenregeln für Potenzen mit ganzzahligen und rationalen Exponenten.',
            sections: [
                { h: 'Regeln', html: '<ul><li>a^m · a^n = a^(m+n)</li><li>(a^m)^n = a^(m·n)</li><li>a^0 = 1 (a ≠ 0)</li><li>a^(-n) = 1/a^n</li><li>a^(1/n) = ⁿ√a</li></ul>' }
            ],
            exercises: [
                { type: 'mc', topic: 'funktionen', q: '2⁻² = ?', options: ['-4','-1/4','1/4','4'], answer: 2, explanation: '2⁻² = 1/2² = 1/4.' }
            ]
        },

        prozent_zinsrechnung: {
            id: 'prozent_zinsrechnung',
            title: 'Prozent- und Zinsrechnung',
            type: 'lesson',
            summary: 'Grundwert, Prozentwert, Prozentsatz. Zinseszins.',
            sections: [
                { h: 'Formeln', html: '<p>W = G·p/100<br>Zinseszins: K_n = K_0·(1+p/100)^n</p>' }
            ],
            exercises: [
                { type: 'mc', topic: 'funktionen', q: '5 % von 200 €?', options: ['5 €','10 €','15 €','20 €'], answer: 1, explanation: '0,05·200 = 10.' }
            ]
        },

        geometrie_koerper: {
            id: 'geometrie_koerper',
            title: 'Geometrie – Körper',
            type: 'lesson',
            summary: 'Volumen- und Oberflächenformeln für Würfel, Quader, Zylinder, Kegel, Kugel.',
            sections: [
                { h: 'Formeln', html: '<ul><li>Würfel: V = a³, O = 6a²</li><li>Kugel: V = 4/3·π·r³, O = 4π·r²</li><li>Zylinder: V = π·r²·h</li><li>Kegel: V = 1/3·π·r²·h</li></ul>' }
            ],
            exercises: [
                { type: 'mc', topic: 'funktionen', q: 'Volumen einer Kugel mit r = 3?', options: ['27π','36π','108π','12π'], answer: 1, explanation: '4/3·π·27 = 36π.' }
            ]
        }
    };

    const MATH_LESSONS = Object.values(MATH).map(l => Object.assign({}, l));

    function get(id) { return MATH[id] || null; }
    function allExercises() {
        const out = [];
        for (const l of Object.values(MATH)) {
            for (const ex of (l.exercises || [])) {
                out.push(Object.assign({ subject: 'math', topic: ex.topic || l.id }, ex, { lessonId: l.id, lessonTitle: l.title }));
            }
        }
        return out;
    }

    root.ContentMATH = { byId: MATH, list: MATH_LESSONS, get, allExercises };
})(window);
// EXPANDED 2026-09-03: added 3 new math exercises
(function(root) { if (!root.ContentMATH || !root.ContentMATH.byId) return; const l = root.ContentMATH.byId['wahrscheinlichkeit']; if (l && l.exercises) { l.exercises.push({ type: 'math-input', topic: 'wahrscheinlichkeit', q: 'Wie viele Möglichkeiten gibt es, 2 unterscheidbare Kugeln aus 5 ohne Zurücklegen zu ziehen? (5·4)', answers: [20, '20'], explanation: '5·4 = 20.' }); l.exercises.push({ type: 'mc', topic: 'wahrscheinlichkeit', q: 'P(A∩B) = P(A)·P(B) gilt, wenn A und B … sind.', options: ['disjunkt','unabhängig','leer','unmöglich'], answer: 1, explanation: 'Unabhängige Ereignisse multiplizieren sich.' }); l.exercises.push({ type: 'cloze', topic: 'wahrscheinlichkeit', text: 'Die ___ eines sicheren Ereignisses beträgt 1.', answers: [['Wahrscheinlichkeit']], explanation: 'P(sicher) = 1.' }); } })(window);
// EXPANDED 2026-09-03: new lesson "finanzmathematik"
(function(root) {
  if (!root.ContentMATH) return;
  const byId = root.ContentMATH.byId = root.ContentMATH.byId || {};
  if (byId['finanzmathematik']) return;
  const lesson = {
    id: 'finanzmathematik',
    title: 'Finanzmathematik: Zins, Zinseszins, Rente',
    type: 'lesson',
    summary: 'Grundformeln der Zinsrechnung, exponentielles Wachstum durch Zinseszins, Restschuld bei Ratenzahlung.',
    sections: [
      { h: 'Einfache Zinsrechnung', html: '<p>Z = K · p · t / 100, wobei K Kapital, p Zinssatz in %, t Zeit in Jahren. Beispiel: 1000 € zu 4 % für 1 Jahr = 40 € Zinsen.</p>' },
      { h: 'Zinseszins', html: '<p>Endkapital Kn = K0 · (1 + p/100)^n. Verdopplungszeit ≈ 72/p-Regel (in Jahren, p in %).</p>' },
      { h: 'Restschuld bei Ratenzahlung', html: '<p>Annuität: A = K0 · q^n · (q − 1) / (q^n − 1) mit q = 1 + p/100. Restschuld nach k Raten: Rk = K0 · q^k − A · (q^k − 1)/(q − 1).</p>' }
    ],
    exercises: [
      { type: 'math-input', topic: 'finanzmathematik', q: 'Wieviel Euro Zinsen erhält man nach 1 Jahr auf 2500 € zu 3 %?', answers: [75, '75'], explanation: '2500 · 3 / 100 = 75 €.' },
      { type: 'mc', topic: 'finanzmathematik', q: 'Welche Formel beschreibt das Endkapital bei Zinseszins nach n Jahren?', options: ['Kn = K0 + n·p','Kn = K0 · (1 + p/100)^n','Kn = K0 · n·p/100','Kn = K0 · (1 + n·p)'], answer: 1, explanation: 'Geometrische Reihe.' },
      { type: 'fill', topic: 'finanzmathematik', text: 'Bei der 72er-Regel verdoppelt sich das Kapital nach ungefähr ___ Jahren, wenn p in Prozent.', answers: [['72/p', '72 / p']], explanation: '72/p Jahre Verdopplung.' }
    ]
  };
  byId['finanzmathematik'] = lesson;
  // Add to list if it exists
  if (root.ContentMATH.list && Array.isArray(root.ContentMATH.list)) {
    root.ContentMATH.list.push(lesson);
  }
})(window);
