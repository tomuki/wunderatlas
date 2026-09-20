/* Original German exercises. Topic selection: BW FHR mathematics;
   current external references: Landesbildungsserver BW Berufskolleg FHSR samples.
   Originally developed with Cambridge as a structural reference; own tasks retained. */
(function(root){
const parts=[];
function block(section,context,items,working){items.forEach(([q,answer,explanation],i)=>parts.push({type:'math-input',topic:'fhr_mathematik',section:i===0?section:null,context:i===0?context:null,q,answers:[answer],explanation}));parts.push({type:'free',topic:'fhr_mathematik',q:'Rechenweg und Begründung zu diesem Aufgabenblock',context:'Halte Ansätze, Umformungen und Begründungen fest. Die Ergebnisfelder allein reichen nicht für eine vollständige mathematische Lösung. Skizzen kannst du zusätzlich auf Papier anfertigen.',modelAnswer:working,explanation:'Vergleiche Ansatz, nachvollziehbare Zwischenschritte, Einheiten und Deutung. Die automatische Ergebnisprüfung vergibt keine Teilpunkte für deinen Rechenweg. Besprich diesen mit einer Lehrkraft.'});}
block('1 · Lineare Modelle und Gleichungen · etwa 15 Minuten',`Für die Ausstellung werden n Plakate gedruckt. Druckerei A berechnet A(n) = 120 + 0,40n Euro, Druckerei B berechnet B(n) = 40 + 0,80n Euro. Die Modelle gelten für ganze Stückzahlen von 1 bis 500. Alle Preise sind vollständig, weitere Gebühren gibt es nicht. Gib Zahlen ohne Einheiten in die Ergebnisfelder ein.`,[
['1a · Wie viel kosten 100 Plakate bei B in Euro?',120,'B(100) = 40 + 0,80 · 100 = 120.'],
['1b · Bei welcher Stückzahl sind beide Angebote gleich teuer?',200,'120 + 0,40n = 40 + 0,80n → 80 = 0,40n → n = 200.'],
['1c · Wie hoch ist der gemeinsame Preis bei dieser Stückzahl in Euro?',200,'A(200) = 120 + 80 = 200; B(200) = 40 + 160 = 200.'],
['1d · Wie viel spart man bei 300 Plakaten mit A gegenüber B in Euro?',40,'A(300) = 240, B(300) = 280; die Differenz beträgt 40 Euro.']
],'A hat höhere Grundkosten, aber niedrigere Stückkosten. Aus A(n)=B(n) folgt n=200. Für n>200 ist A günstiger, für n<200 B. Die Aussage gilt nur im angegebenen Modellbereich. Skizze: zwei Geraden mit Achsenabschnitten 120 und 40 und Schnittpunkt (200|200).');
block('2 · Quadratische Funktionen · etwa 20 Minuten',`Eine Kurve wird durch f(x) = x² − 6x + 5 beschrieben. Untersuche Nullstellen und Scheitelpunkt. Bestimme außerdem die Tangente an der Stelle x = 2.`,[
['2a · Wie lautet die kleinere Nullstelle?',1,'f(x) = (x−1)(x−5), daher ist die kleinere Nullstelle 1.'],
['2b · Wie lautet die größere Nullstelle?',5,'Aus (x−1)(x−5)=0 folgt auch x=5.'],
['2c · Wie lautet der kleinste Funktionswert?',-4,'f(x)=(x−3)²−4. Das Quadrat ist mindestens 0; das Minimum ist −4.'],
['2d · Welche Steigung hat die Tangente bei x = 2?',-2,'f′(x)=2x−6; f′(2)=−2.']
],'Nullstellen: 1 und 5. Quadratische Ergänzung: f(x)=(x−3)²−4, Scheitel S(3|−4). f(2)=−3 und f′(2)=−2. Tangente: y=−2(x−2)−3=−2x+1. Zeichne eine nach oben geöffnete Parabel durch die Nullstellen und den Scheitel; die Tangente berührt sie bei (2|−3).');
block('3 · Differentialrechnung · etwa 25 Minuten',`Gegeben ist g(x) = x³ − 6x² + 9x + 2. Untersuche stationäre Punkte, Wendestelle und Steigung. Alle x-Werte sind reelle Zahlen.`,[
['3a · Wie lautet die kleinere Lösung von g′(x) = 0?',1,'g′(x)=3x²−12x+9=3(x−1)(x−3).'],
['3b · Wie lautet die größere Lösung von g′(x) = 0?',3,'Die zweite Nullstelle der Ableitung ist 3.'],
['3c · An welcher x-Stelle liegt der Wendepunkt?',2,'g″(x)=6x−12=0 bei x=2. g‴(x)=6≠0 bestätigt den Wendepunkt.'],
['3d · Wie groß ist die Steigung im Wendepunkt?',-3,'g′(2)=12−24+9=−3.']
],'g′=3(x−1)(x−3), g″=6x−12. Bei x=1 ist g″<0: Hochpunkt H(1|6). Bei x=3 ist g″>0: Tiefpunkt T(3|2). Wendepunkt W(2|4), Tangente dort y=−3(x−2)+4=−3x+10. Monotonie: steigend für x<1 und x>3, fallend für 1<x<3. Ein Vorzeichenwechsel von g″ bestätigt den Krümmungswechsel.');
block('4 · Exponentielle Modelle · etwa 15 Minuten',`In einem Modell für einen technischen Versuch nimmt eine Messgröße nach N(t) = 800 · 0,5^(t/4) ab. t wird in Stunden gemessen, N in Messeinheiten. Der Versuch wird nur für 0 ≤ t ≤ 20 beschrieben. Nutze bei Bedarf einen Taschenrechner; runde nur dort, wo es ausdrücklich verlangt wird.`,[
['4a · Wie groß ist N(8)?',200,'N(8)=800·0,5²=200.'],
['4b · Nach wie vielen Stunden ist N(t) = 50?',16,'50/800=1/16=0,5⁴. Also t/4=4 und t=16.'],
['4c · Wie viele Stunden beträgt die Halbwertszeit?',4,'Erhöht man t um 4, wird N mit 0,5 multipliziert.'],
['4d · N(t) = 800 · e^(kt). Bestimme k auf vier Nachkommastellen.',-0.1733,'k=ln(0,5)/4≈−0,1732868; gerundet −0,1733.']
],'800·0,5^(t/4)=50 → (t/4)ln(0,5)=ln(1/16) → t=16. Der Exponent ist proportional zur Zeit; die Größe wird alle vier Stunden halbiert. Die Abnahme pro Stunde ist nicht konstant in Messeinheiten. N′(t)=kN(t)<0; das Modell sinkt und bleibt positiv. Über Zeiten außerhalb des Modellbereichs ist damit keine sichere Aussage über den realen Versuch möglich.');
block('5 · Integralrechnung und Flächen · etwa 25 Minuten',`Eine dekorative Fläche wird durch f(x) = −x² + 4x beschrieben. Betrachte zunächst das Intervall [0;4]. Eine waagerechte Linie hat die Gleichung y = 3. Flächen sind in Flächeneinheiten anzugeben. Runde Flächenergebnisse auf drei Nachkommastellen.`,[
['5a · Wie lautet die kleinere Schnittstelle von f mit y = 3?',1,'−x²+4x=3 → x²−4x+3=(x−1)(x−3)=0.'],
['5b · Wie lautet die größere Schnittstelle von f mit y = 3?',3,'Die zweite Lösung ist x=3.'],
['5c · Wie groß ist die Fläche zwischen f und y = 3 von x = 1 bis x = 3?',1.333,'∫₁³(−x²+4x−3)dx=[−x³/3+2x²−3x]₁³=4/3≈1,333.'],
['5d · Wie groß ist die Fläche zwischen f und der x-Achse von 0 bis 4?',10.667,'f≥0 auf [0;4]. ∫₀⁴(−x²+4x)dx=[−x³/3+2x²]₀⁴=32/3≈10,667.']
],'Schnittstellen zuerst berechnen: 1 und 3. Auf [1;3] liegt f über y=3, deshalb integrieren wir f−3. Auf [0;4] liegt f über der x-Achse, deshalb entspricht das Integral dort dem Flächeninhalt. Allgemein können negative und positive Integralanteile einander aufheben; geometrische Flächen müssen gegebenenfalls aufgeteilt werden. Skizziere beide Flächen und markiere die Grenzen.');
block('6 · Optimierung und Modellgrenzen · etwa 20 Minuten',`Für einen rechteckigen Ausstellungsrahmen stehen 40 dm Leisten zur Verfügung. Die Breite ist x dm, die Höhe entsprechend 20−x dm; Materialverluste werden in diesem Modell vernachlässigt.

Zusätzlich wird ein 30 cm × 40 cm großes Plakat gestaltet. Ein gleich breiter Rand r an allen vier Seiten lässt eine bedruckte Fläche von (30−2r)(40−2r) cm² übrig.`,[
['6a · Bei welcher Rahmenbreite x ist die Innenfläche maximal (in dm)?',10,'A(x)=x(20−x); A′=20−2x=0 → x=10.'],
['6b · Wie groß ist diese maximale Rahmenfläche in dm²?',100,'A(10)=10·10=100; A″=−2<0.'],
['6c · Wie groß ist die bedruckte Plakatfläche bei r = 2 cm in cm²?',936,'(30−4)(40−4)=26·36=936.'],
['6d · Welcher zulässige Rand r ergibt 600 cm² bedruckte Fläche?',5,'(30−2r)(40−2r)=600 → r²−35r+150=0 → r=5 oder 30. Nur r=5 liegt in 0≤r<15.']
],'Rahmen: 0<x<20. A=20x−x² hat bei x=10 ein Maximum, weil A″<0; an den Randwerten geht die Fläche gegen 0. Plakat: 0≤r<15, damit beide bedruckten Seiten positiv bleiben. Die rechnerische Lösung r=30 ist geometrisch unmöglich und muss verworfen werden. Beachte die unterschiedlichen Einheiten dm und cm in den beiden Modellen.');
block('7 · Lineare Gleichungssysteme · etwa 20 Minuten',`Eine Ausstellung verwendet kleine und große Bildtafeln. Insgesamt sind es 24 Tafeln. Für eine kleine Tafel werden zwei Halterungen benötigt, für eine große drei. Insgesamt sind 62 Halterungen verbaut. Bezeichne die Anzahl kleiner Tafeln mit x und großer Tafeln mit y.`,[
['7a · Wie viele kleine Tafeln werden verwendet?',10,'x+y=24 und 2x+3y=62. Die zweite Gleichung minus zweimal die erste ergibt y=14, also x=10.'],
['7b · Wie viele große Tafeln werden verwendet?',14,'2x+3y−2(x+y)=62−48 → y=14.'],
['7c · Nun sollen bei weiterhin 24 Tafeln insgesamt 65 Halterungen verwendet werden. Wie viele große Tafeln braucht man?',17,'x+y=24 und 2x+3y=65 → y=65−48=17.'],
['7d · Wie viele kleine Tafeln bleiben im neuen Plan?',7,'x=24−17=7. Probe: 2·7+3·17=65.']
],'Das Gleichungssystem bildet zwei verschiedene Bedingungen ab: Anzahl der Tafeln und Anzahl der Halterungen. Durch Subtraktion wird x eliminiert. Prüfe beide Gleichungen und die Bedingungen x,y≥0 sowie ganze Zahlen. Im ersten Plan: 10+14=24 und 20+42=62. Im zweiten Plan: 7+17=24 und 14+51=65.');
root.MathExtendedExams=[{id:'mini-exam:math-4',title:'Mathematik · 7 Aufgabenblöcke · 140 Minuten',durationMin:140,description:'28 Ergebnisfragen und sieben Felder für Rechenwege, Begründungen und Skizzenhinweise. Eigener Trainingssatz zu FHR-Themen. Passende offizielle Musteraufgaben aus Baden-Württemberg findest du oben. Taschenrechner und Papier sind erlaubt; 140 Minuten sind unsere Trainingszeit. Die automatische Ergebniszahl ist keine Schulnote und bewertet keine Teilpunkte. Eingaben ohne Einheiten; Dezimalkomma oder Dezimalpunkt sind möglich.',parts}];
})(window);
