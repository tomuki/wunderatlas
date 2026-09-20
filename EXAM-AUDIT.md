# Prüfungen und Bedienung · 13.09.2026

Alle 15 integrierten Varianten wurden im Browser gestartet, ausgefüllt, neu geladen und abgegeben. Die Antwortschlüssel der 62 B1-Leseaufgaben wurden mit ihren eigenen Ausgangstexten abgeglichen; die 28 Zahlenantworten des langen Mathematiksatzes zusätzlich unabhängig nachgerechnet. Das ist keine Bestätigung eines vollständigen offiziellen FHR-Prüfungsumfangs.

| Variante | Aufgaben | Minuten | Trainingspunkte | Arbeiten mit manueller Rubrik |
|---|---:|---:|---:|---:|
| mini-exam:de-1 | 5 | 75 | 17 | 1 |
| mini-exam:de-2 | 5 | 75 | 17 | 1 |
| mini-exam:de-3 | 4 | 75 | 18 | 1 |
| mini-exam:de-4 | 30 | 65 | 30 | 0 |
| mini-exam:de-5 | 3 | 60 | 36 | 3 |
| mini-exam:de-6 | 3 | 15 | 36 | 3 |
| mini-exam:en-1 | 5 | 45 | 20 | 1 |
| mini-exam:en-2 | 5 | 45 | 17 | 1 |
| mini-exam:en-3 | 4 | 45 | 20 | 1 |
| mini-exam:en-4 | 32 | 45 | 32 | 0 |
| mini-exam:en-5 | 2 | 45 | 24 | 2 |
| mini-exam:math-1 | 7 | 20 | 7 | 0 |
| mini-exam:math-2 | 6 | 20 | 6 | 0 |
| mini-exam:math-3 | 6 | 20 | 6 | 0 |
| mini-exam:math-4 | 35 | 140 | 196 | 7 |

Ein Punkt pro automatischem Ergebnis, Lücke, Zuordnung oder Korrektur; Reihenfolge als Ganzes. Manuelle Spracharbeiten: vier aufgabenspezifische Kriterien à 0–3 Punkte; Mathematik: acht Kriterien à 0–3 Punkte (Ansatz, Rechenweg, Zwischenschritte, Formeln, Umformungen, Ergebnis, Einheit, Begründung). Die Gewichtung ist ein eigenes transparentes Trainingsschema, keine Goethe-/Cambridge-Umrechnung oder Schulnote. Ein Gesamtergebnis mit noch offenen Bewertungen wird als unvollständig ausgewiesen. Selbstbewertungen verlangen einen Beleg und einen Überarbeitungsschritt. Gesprochene Beiträge brauchen eine zuhörende Person; Notizen erlauben keine automatische Aussprachebewertung.

## Behobene Probleme
- Vier-Stunden-Timer in kurzen Varianten, unklare grammatische Lücken und mehrdeutige Formulierungen, unvollständige Genitivkorrektur und falsche Mathematik-Themenkennzeichnungen.
- Fehlende vollständige Textmodelle in sechs alten Sprachvarianten sowie fehlender ausformulierter Story-Vorschlag.
- Pauschal richtig/falsch statt Teilpunkten, Wortzahl als angeblicher Lernerfolg, unlesbare numerische Antwortindizes im Verlauf.
- Fehlende erneute Versuche und veralteter Verlauf; fehlende Aufgabenübersicht, Fokusverlust beim Wechsel aus einem Textfeld, unzureichende Entwurfsvalidierung.
- Weiterlaufende Schreib-Timer und Autospeicher, defektes KI-Objektrendering, falsche lokale Qualitätsnoten, übernommene veraltete KI-Antworten, fehlende Begrenzung der Netzwerkwartezeit.
- Gleiche Route wurde nach Änderungen nicht neu angezeigt; Notiz-Abbrechen ohne Wirkung; wiederholt registrierte Fehlerjournal-Aktionen.
- Unsichtbare Dialoge, nicht speicherbare eigene Kartensets durch Namenskollision, alte Tastaturhandler nach Verlassen der Karten, ungültiger Karten-/Notizimport und doppelte Kartensets nach Import.
- Profil-Export nur über Konsole, Profilreset löschte Lernarbeiten, kontoübergreifende Entwurfs-/Karten-Schlüssel. Gastdaten bleiben erhalten; nicht eindeutig zuordenbare alte Gastentwürfe werden keinem Konto automatisch zugeteilt.

## Prüfnachweise
- 267 Basistests; 23 Lifecycle-Prüfungen; 27 gerenderte Seiten/Details; Sprachprüfung aller 26 Englischlektionen.
- assessment-audit.cjs: 152 Teile, Modelle, Leerantworten, Teilpunkte, Rubriken, gespeicherte Belege, Kontogrenzen, Import und KI-Antwortschema.
- exam-library-browser.cjs, de-b1-exam-browser.cjs, en-math-exam-browser.cjs: alle 15 Varianten, absichtlich falsche Antworten, Dezimalkomma, Reload, Fristablauf und einmalige Abgabe.
- writing-flow.cjs: рабочая рубрика внутри последовательного урока, правка текста без ложных баллов, восстановление оценки; пауза/перезагрузка/истечение таймера/повторная попытка.
- interaction-audit-browser.cjs: Ergebnis/Verlauf/Selbstbewertung/Neustart, Notizen, Fehlerjournal, Backup, Profilreset, Timer, KI-Ausfall, 16 Routen, zurück/vorwärts und Mobilansicht.
- cards-settings-browser.cjs: eigenes Set, Validierung, zusätzliche Karte, Umdrehen/Bewerten, Suche, Export/Import, Theme und KI-Fehlerzustände.
- auth-flow-browser.cjs: Registrieren, Anmelden, Passwortanzeigen und Wiederherstellung mit simuliertem API. Keine echten Konten oder E-Mails angelegt.
- Bestehende Bibliothek-/Projekt-/Praxis-/Onboarding-Browserprüfungen und B1-Lernblock erfolgreich. Projektprüfung umfasst fünf Etappen, gespeicherte Ergebnisse und ungültige Rasterwerte.

## Grenzen / nächste Prüfung
Eine vollständige offizielle FHR-Sprachklausur, externes Goethe-/Cambridge-Audio und eine echte mündliche Partnerprüfung werden nicht durch diese lokalen Simulationen ersetzt. Die fachliche Qualität freier Texte lässt sich lokal nicht automatisch bewerten. Der laufende Server hat keinen KI-Provider konfiguriert: echte semantische KI-Rückmeldungen wurden nicht getestet; Ausfallverhalten und strukturiertes Antwortschema schon. Aktuelle schulische Notenschlüssel, Termine und Vorgaben benötigen Unterlagen der Schule. Neue Entwürfe und Ergebnisse bleiben lokal im jeweiligen Browser; keine vollständige Gerätesynchronisierung. Browserprüfungen decken die aufgeführten gemeinsamen Komponenten und Szenarien ab, nicht jede denkbare Eingabe, jeden Browser oder alle externen Seiten.
