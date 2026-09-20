/* Original Wunderatlas texts; Goethe B1 adult model used only as a format reference. */
(function(root){
const parts=[],rf=['Richtig','Falsch'];
function group(section,context,qs){qs.forEach(([q,options,answer,explanation],i)=>parts.push({type:'mc',topic:'b1_lesen',section:i===0?section:null,context:i===0?context:null,q,options,answer,explanation}));}
group('Teil 1 · Persönlicher Bericht · Aufgaben 1–6 · etwa 10 Minuten',`Ein anderer Samstag

Am letzten Samstag wollte ich eigentlich zu Hause an meinem Portfolio arbeiten. Dann schrieb mir meine Freundin Nele: Im Stadtteilzentrum sollte ein offenes Atelier stattfinden, aber eine Helferin war krank geworden. Ob ich einspringen könnte? Ich sagte zu, obwohl ich noch nie einen Druckworkshop betreut hatte. Nele erklärte, dass keine besonderen Kenntnisse nötig seien. Ich sollte die Gäste begrüßen und ihnen zeigen, wo Papier und Farben lagen.

Wir trafen uns um neun Uhr. Der Workshop begann erst um zehn, deshalb hatten wir genug Zeit, die Tische vorzubereiten. Zuerst war kaum jemand da. Ich dachte schon, dass unsere Vorbereitung umsonst gewesen war. Doch gegen elf kamen mehrere Familien. Besonders ein älterer Besucher überraschte mich: Er hatte seit der Schulzeit nicht mehr gezeichnet und wollte zunächst nur zuschauen. Nachdem ein Kind ihm einen freien Platz angeboten hatte, probierte er selbst einen Druck. Sein Bild gefiel ihm so gut, dass er es seiner Enkelin schenken wollte.

Eigentlich sollten alle Bilder am Abend im Zentrum bleiben, damit wir eine kleine Ausstellung machen konnten. Einige Gäste wollten ihre Arbeiten aber sofort mitnehmen. Deshalb fotografierten wir ihre Bilder und hängten die Fotos auf. Niemand musste sein Original abgeben.

Nach dem Aufräumen fragte Nele, ob ich nächsten Monat wieder helfen würde. Ich möchte gern dabei sein, muss aber erst meinen Stundenplan prüfen. Für mein Portfolio hatte ich an diesem Tag zwar nichts geschafft, doch ich hatte eine Menge über den Umgang mit Besuchern gelernt.`,[
['Die Erzählerin hatte den Atelierbesuch schon lange geplant.',rf,1,'Sie wollte ursprünglich zu Hause arbeiten; die Anfrage kam kurzfristig.'],
['Für ihre Aufgabe brauchte sie keine Druckerfahrung.',rf,0,'Sie sollte begrüßen und Materialien zeigen.'],
['Zu Beginn des Workshops waren schon viele Gäste da.',rf,1,'Erst gegen elf kamen mehrere Familien.'],
['Der ältere Besucher wurde schließlich selbst kreativ.',rf,0,'Er probierte einen Druck.'],
['Alle Gäste mussten ihre Originalbilder im Zentrum lassen.',rf,1,'Fotos konnten die Originale ersetzen.'],
['Die nächste Teilnahme der Erzählerin steht noch nicht fest.',rf,0,'Sie muss zuerst ihren Stundenplan prüfen.']]);
group('Teil 2 · Bericht A · Aufgaben 7–9 · mit Bericht B etwa 20 Minuten',`Werkzeuge gemeinsam nutzen

Eine Bibliothek im erfundenen Stadtteil Lindenhof verleiht seit sechs Monaten nicht nur Bücher. Neben dem Eingang stehen eine Nähmaschine, ein Werkzeugkoffer und mehrere Aufnahmegeräte. Wer einen Bibliotheksausweis hat, kann diese Dinge für eine Woche ausleihen. Eine zusätzliche Gebühr gibt es nicht. Bei teuren Geräten muss allerdings eine Kaution hinterlegt werden. Sie wird zurückgezahlt, wenn das Gerät vollständig und unbeschädigt zurückkommt.

Die Idee kam aus einer Umfrage. Viele Besucher berichteten, dass sie Geräte für einzelne Projekte kaufen und anschließend kaum noch benutzen. Das neue Angebot soll ihnen Geld sparen und verhindern, dass in jedem Haushalt dieselben selten genutzten Dinge stehen. Die Bibliothek kauft deshalb nicht einfach alles, was jemand vorschlägt. Das Team prüft zuerst, ob ein Gerät robust ist und ob mehrere Menschen Interesse daran haben.

Besonders die Nähmaschine wird häufig reserviert. Manche Anfänger trauen sich jedoch noch nicht an sie heran. Ab Oktober soll deshalb einmal im Monat eine Einführung stattfinden. Diese Einführung ist freiwillig; für die Ausleihe reicht weiterhin der Ausweis. Reservierungen sind online möglich. Abholen und zurückbringen muss man die Geräte persönlich während der Öffnungszeiten.`,[
['Was ist das Hauptthema?',['Geräte für gelegentliche Projekte ausleihen.','Alle Bücher durch Geräte ersetzen.','Gebrauchte Werkzeuge verkaufen.'],0,'Die Bibliothek erweitert ihr Leihangebot.'],
['Welche Kosten entstehen bei teuren Geräten?',['Eine wöchentliche Gebühr.','Eine rückzahlbare Kaution.','Ein verpflichtender Kursbeitrag.'],1,'Die Kaution wird bei ordentlicher Rückgabe erstattet.'],
['Was gilt für die Einführung?',['Sie ist Voraussetzung für jede Ausleihe.','Sie findet täglich online statt.','Die Teilnahme ist freiwillig.'],2,'Sie ist monatlich geplant und keine Voraussetzung.']]);
group('Teil 2 · Bericht B · Aufgaben 10–12',`Eine Ausstellung kommt zum Publikum

Das Museum für Alltagsgestaltung in der erfundenen Stadt Westbrück möchte Menschen erreichen, die selten ins Museum gehen. Eine kleine Wanderausstellung über Verpackungen wird deshalb nacheinander in drei Stadtteilzentren gezeigt. An jedem Ort bleibt sie zwei Wochen. Der Eintritt ist frei; Gruppen ab acht Personen sollen sich vorher anmelden, damit genug Platz bleibt.

Zu sehen sind alte und neue Verpackungen von Lebensmitteln und Haushaltsprodukten. Kurze Texte erklären, wie Farben, Formen und Schrift die Kaufentscheidung beeinflussen können. Die Besucher sollen zwei Verpackungen vergleichen und begründen, welche Informationen sie leichter finden. Es geht dabei nicht darum, einen bestimmten Hersteller zu empfehlen. Die Ausstellung will zeigen, wie man im Alltag genauer hinschauen kann.

Ein Teil der Sammlung darf angefasst werden. Diese Gegenstände sind mit einem grünen Punkt markiert. Die übrigen Stücke bleiben hinter Glas. Für Kinder gibt es ein kostenloses Suchblatt. Wer mehr erfahren möchte, kann am letzten Samstag jedes Standorts an einem Gespräch mit einer Gestalterin teilnehmen. Dafür ist wegen der begrenzten Plätze eine Anmeldung nötig. Die Ausstellung selbst bleibt auch an diesem Tag für Einzelbesucher ohne Anmeldung geöffnet.`,[
['Warum wird die Ausstellung in Stadtteilzentren gezeigt?',['Das Museum schließt dauerhaft.','Sie soll ein neues Publikum erreichen.','Nur Schulklassen dürfen teilnehmen.'],1,'Sie richtet sich auch an Menschen, die selten ins Museum gehen.'],
['Was sollen die Besucher beurteilen?',['Den höchsten Produktpreis.','Die beste Werbung für einen Hersteller.','Die Verständlichkeit von Informationen.'],2,'Sie vergleichen, wo Informationen leichter zu finden sind.'],
['Wofür muss sich eine einzelne Besucherin anmelden?',['Für das Gespräch mit der Gestalterin.','Für das Suchblatt.','Für jeden normalen Besuch.'],0,'Für das Gespräch sind die Plätze begrenzt.']]);
const ads=`Angebote rund ums Gestalten

A · Feierabendzeichnen: Mittwochs 19–21 Uhr, ohne Vorkenntnisse. Papier und Stifte liegen bereit. Einmalige Teilnahme möglich.

B · Fotostudio am Morgen: Raum und Lichtanlage werktags 8–12 Uhr mieten. Eigene Kamera erforderlich. Keine Kurse.

C · Reparaturtreff: Am ersten Samstag im Monat kostenlose Hilfe bei defekten Haushaltsgeräten. Ersatzteile bezahlt man selbst.

D · Druckwerkstatt: Samstags 10–14 Uhr Einführung in den Linoldruck. Für Anfänger, Material inklusive. Anmeldung erforderlich.

E · Portfolio-Runde: Dienstags 17 Uhr besprechen Gestaltungsstudierende mit dir deine Mappe. Kostenlos, 20 Minuten pro Person, mit Termin.

F · Leihkamera: Kamera freitags abholen und montags zurückbringen. Ausweis und Kaution nötig. Kurze Bedienungserklärung inklusive.

G · Galerie im Viertel: Sonntags 14–18 Uhr. Eintritt frei. Führungen um 15 Uhr, keine praktischen Kurse.

H · Plakatarchiv zu Hause: Digitale Sammlung, nach Jahr und Gestalter durchsuchbar. Jederzeit kostenlos im Browser nutzbar.

I · Gestaltungspraktikum: Drei Monate Vollzeit ab März. Abgeschlossene Ausbildung erforderlich. Keine einzelnen Schnuppertage.

J · Kinderatelier: Ferienkurs für Acht- bis Zwölfjährige, werktags 9–13 Uhr. Gemeinsam malen und bauen.

Wähle die passende Anzeige. Jede Anzeige darf höchstens einmal verwendet werden. Für eine Situation passt keine: Wähle 0.`;
const letters=['A','B','C','D','E','F','G','H','I','J','0 · Keine passende Anzeige'];
group('Teil 3 · Anzeigen zuordnen · Aufgaben 13–19 · etwa 10 Minuten',ads,[
['Mira möchte abends zeichnen lernen und besitzt noch kein Material.',letters,0,'A bietet einen Abendkurs mit Material.'],
['Leon braucht nur für Samstag und Sonntag eine Kamera.',letters,5,'F verleiht eine Kamera für das Wochenende.'],
['Aylin möchte Rückmeldung zu ihrer Gestaltungsmappe bekommen.',letters,4,'E bietet Mappenbesprechungen.'],
['Tom sucht kostenlose Hilfe, um seinen kaputten Mixer zu reparieren.',letters,2,'C bietet kostenlose Reparaturhilfe; Ersatzteile können kosten.'],
['Sara möchte historische Plakate ansehen, kann ihre Wohnung aber nicht verlassen.',letters,7,'H ist von zu Hause zugänglich.'],
['Ben sucht am Wochenende einen angeleiteten Linoldruckkurs für Anfänger.',letters,3,'D ist ein Einführungskurs am Samstag.'],
['Jana ist 19 und möchte genau einen Tag ein Agenturpraktikum machen.',letters,10,'I dauert drei Monate; ein Schnuppertag wird nicht angeboten.']]);
const views=[
['Lena','Wenn jemand Nachrichten liest, verliere ich beim Vortragen den Faden. Für diese wenigen Minuten sollten die Handys in den Taschen bleiben.',0],
['Murat','Ich fotografiere wichtige Folien zum Nacharbeiten. Ein Verbot würde mir das Lernen erschweren. Rücksicht ist wichtig, aber kein allgemeines Verbot.',1],
['Pia','Auch wenn digitale Notizen praktisch sind, lenkt das Gerät mich schnell ab. Ich unterstütze deshalb eine handyfreie Zeit beim Vortragen.',0],
['Jonas','Einige brauchen eine Übersetzungsfunktion. Sie sollten ihr Gerät weiter benutzen dürfen. Klare Regeln wären besser als ein komplettes Verbot.',1],
['Nora','Vor und nach der Präsentation kann jeder sein Gerät benutzen. Während jemand spricht, finde ich ein Verbot sinnvoll.',0],
['David','Mich stören laute Gespräche mehr als ein stilles Handy. Solange niemand stört, sollte jeder selbst entscheiden, wie er Notizen macht.',1],
['Eva','Zuerst fand ich das Verbot übertrieben. Seit wir es ausprobiert haben, hören mehr Leute zu. Deshalb möchte ich diese Regel behalten.',0]];
group('Teil 4 · Meinungen erkennen · Aufgaben 20–26 · etwa 15 Minuten',`Thema: Sollen Handys während Präsentationen im Unterricht grundsätzlich in der Tasche bleiben?

Ist die Person für diese Regel? Ja bedeutet Zustimmung zur handyfreien Präsentation. Nein bedeutet Ablehnung des allgemeinen Verbots.

`+views.map(v=>v[0]+': '+v[1]).join('\n\n'),views.map(v=>[v[0]+' ist für die handyfreie Präsentation.',['Ja','Nein'],v[2],v[1]]));
group('Teil 5 · Regeln verstehen · Aufgaben 27–30 · etwa 10 Minuten',`Hinweise für die offene Schulwerkstatt

Die Werkstatt ist montags bis donnerstags von 15 bis 18 Uhr geöffnet. Ein Arbeitsplatz muss spätestens am Vortag über das Schulportal reserviert werden. Wer nicht kommen kann, soll bis 12 Uhr am selben Tag stornieren. Nach 15 Minuten ohne Nachricht wird der Platz an Wartende vergeben.

Schneidemaschinen dürfen nur nach einer persönlichen Einweisung benutzt werden. Diese gilt für das gesamte Schuljahr. Auch wer zu Hause ein ähnliches Gerät benutzt, braucht die Einweisung. Die Aufsicht hilft bei Fragen, führt aber keine vollständigen Projekte für Lernende aus.

Standardpapier für erste Versuche liegt kostenlos bereit. Für endgültige Arbeiten bringen alle eigenes Papier mit. Saubere größere Reste kommen in die beschrifteten Sammelkästen. Klebstoffe dürfen nur am markierten Tisch verwendet werden. Getränke bleiben im Vorraum, auch in geschlossenen Flaschen.

Eigene Arbeiten dürfen bis Freitag im Trockenregal liegen. Sie müssen mit Namen und Datum beschriftet sein. Wer länger Platz benötigt, spricht vorher mit der Aufsicht. Am Monatsende werden nicht beschriftete Arbeiten entfernt. Fotografieren ist erlaubt, solange keine Personen oder Arbeiten anderer ohne deren Zustimmung im Bild erscheinen. Vor dem Verlassen werden Geräte ausgeschaltet und Arbeitsplätze gereinigt.`,[
['Wann kann ein reservierter Platz weitergegeben werden?',['Sofort bei Öffnung.','Nach 15 Minuten ohne Nachricht.','Erst am Tagesende.'],1,'Die Regel nennt eine Viertelstunde ohne Nachricht.'],
['Wer braucht die Einweisung an der Schneidemaschine?',['Nur Personen ohne jede Erfahrung.','Niemand mit einem ähnlichen Gerät zu Hause.','Alle, die sie benutzen möchten.'],2,'Auch Erfahrung ersetzt die persönliche Einweisung nicht.'],
['Welches Papier wird kostenlos bereitgestellt?',['Standardpapier für erste Versuche.','Jedes Papier für fertige Arbeiten.','Nur bedruckte Reste.'],0,'Für fertige Arbeiten ist eigenes Papier nötig.'],
['Was ist beim Fotografieren erlaubt?',['Fremde Arbeiten ohne Nachfrage aufnehmen.','Eigene Arbeiten ohne fremde Personen oder Arbeiten im Bild fotografieren.','Nur Fotos mit anderen Personen machen.'],1,'Andere Personen und ihre Arbeiten benötigen deren Zustimmung.']]);
root.DeutschB1Exams=[
{id:'mini-exam:de-4',title:'B1 · Lesen · 30 Aufgaben',durationMin:65,description:'Fünf Teile mit eigenen Texten und 30 Fragen nach dem Aufbau des Goethe-B1-Lesemoduls. Themen aus Alltag und Gestaltung. Kein offizieller Goethe-Test und kein Ersatz für die FHR-Klausur.',parts},
{id:'mini-exam:de-5',title:'B1 · Schreiben · 3 Aufgaben',durationMin:60,description:'Bearbeite alle drei eigenen Schreibaufgaben. Plane etwa 20, 25 und 15 Minuten ein. Nach der Abgabe erhältst du Muster und Prüfkriterien. Die sprachliche Bewertung benötigt eine Lehrkraft.',parts:[
{type:'free',q:'1 · Persönliche E-Mail · etwa 80 Wörter',context:'Du hast mit deiner Klasse eine Gestaltungsausstellung besucht. Deine Freundin Alina war krank. Schreibe ihr: Beschreibe den Besuch. Erkläre, welches Stück dir besonders gefallen hat und warum. Schlage eine gemeinsame Aktivität vor. Achte auf Anrede und Schluss.',modelAnswer:'Liebe Alina,\nwie geht es dir? Gestern waren wir in einer Ausstellung über Alltagsgestaltung. Wir haben alte Verpackungen und neue Plakate gesehen. Besonders gut hat mir ein Plakat mit nur zwei Farben gefallen, weil die Botschaft sofort klar war. Schade, dass du nicht dabei sein konntest! Die Ausstellung bleibt noch zwei Wochen geöffnet. Hast du am Samstag Zeit? Wir könnten gemeinsam hingehen und danach im Café etwas trinken. Ich würde dir gern meine Lieblingsstücke zeigen.\nLiebe Grüße\nMira',explanation:'Prüfe: Besuch beschrieben, Lieblingsstück begründet, Vorschlag gemacht? Persönlicher Ton, klare Reihenfolge, verständliche Verben und Satzstellung? Andere passende Antworten sind möglich.'},
{type:'free',q:'2 · Diskussionsbeitrag · etwa 80 Wörter',context:'Im Schulforum steht: „Sollten Lernende ihre Projekte regelmäßig gegenseitig besprechen?“ Ein Beitrag lautet: „Ich möchte meine Arbeit erst zeigen, wenn sie fertig ist. Kritik an unfertigen Ideen macht mich unsicher.“ Schreibe deine Meinung mit Begründung und einer Erfahrung oder einem Beispiel.',modelAnswer:'Ich finde gemeinsame Besprechungen schon während der Arbeit hilfreich. Wenn ich lange allein an einem Plakat arbeite, sehe ich manche Probleme nicht mehr. Eine Mitschülerin hat mich darauf hingewiesen, dass meine Schrift zu klein war. Ich konnte sie rechtzeitig ändern. Trotzdem verstehe ich, dass frühe Kritik verunsichern kann. Deshalb sollten wir zuerst erklären, was gut funktioniert, und danach konkrete Vorschläge machen. Außerdem muss klar sein, dass eine unfertige Idee noch keine schlechte Leistung bedeutet.',explanation:'Prüfe: eigene Position, Begründung, Beispiel, verständliche Verbindungen und sachlicher Ton. Eine andere begründete Meinung ist ebenso möglich.'},
{type:'free',q:'3 · Höfliche Nachricht · etwa 40 Wörter',context:'Du hast morgen einen Termin bei Frau Berger zur Mappenbesprechung. Wegen eines wichtigen Arzttermins kannst du nicht kommen. Entschuldige dich, erkläre kurz den Grund und bitte um einen neuen Termin. Verwende eine passende Anrede und einen höflichen Schluss.',modelAnswer:'Sehr geehrte Frau Berger,\nleider kann ich morgen wegen eines wichtigen Arzttermins nicht zur Mappenbesprechung kommen. Bitte entschuldigen Sie die kurzfristige Absage. Könnten wir einen neuen Termin vereinbaren? Am Donnerstag hätte ich ab 14 Uhr Zeit.\nMit freundlichen Grüßen\nMira Sommer',explanation:'Prüfe: Entschuldigung, Grund, Bitte um Ersatztermin, höfliche Form. Wortzahl allein ist keine Qualitätsbewertung.'}]},
{id:'mini-exam:de-6',title:'B1 · Sprechen · 3 Teile',durationMin:15,description:'Partnerübung: Bereite dich vorher 15 Minuten mit Stichpunkten vor. Starte danach die 15 Minuten Gesprächszeit für zwei Personen. Sprich laut; die Felder speichern nur Notizen. Keine automatische Aussprache- oder Gesprächsbewertung.',parts:[
{type:'free',q:'1 · Gemeinsam planen',context:'Organisiert einen Ausstellungsbesuch für eure Klasse. Besprecht Termin und Treffpunkt, Anreise, Kosten und die Information an die Klasse. Macht Vorschläge, reagiert aufeinander und einigt euch auf einen konkreten Plan.',modelAnswer:'„Wie wäre es mit Samstag?“ – „Da arbeite ich. Passt Freitag nach dem Unterricht?“ – „Ja. Wir könnten die Straßenbahn nehmen.“ Klärt danach Kosten und Einladung und fasst die Entscheidung zusammen.',explanation:'Beide Personen sollen vorschlagen, begründen, nachfragen und reagieren. Ein Monolog ersetzt kein Gespräch.'},
{type:'free',q:'2 · Ein Thema präsentieren',context:'Wähle: „Brauchen wir gedruckte Plakate noch?“ oder „Sollten kreative Projekte in Gruppen entstehen?“ Sprich ungefähr drei Minuten: Thema und Aufbau; persönliche Erfahrung; Situation in einem vertrauten Land oder Umfeld; Vor- und Nachteile mit deiner Meinung; Abschluss. Beide Personen präsentieren nacheinander. Notiere nur Stichpunkte.',modelAnswer:'Thema ankündigen → Erfahrung → vertrautes Umfeld → Vorteil und Nachteil → begründete Position → Abschluss. Beispiel: Ein Plakat erreicht Menschen vor Ort; digitale Informationen lassen sich leichter aktualisieren.',explanation:'Prüfe: nachvollziehbarer Aufbau, vollständige Punkte und verständliches freies Sprechen. Besprecht Wortschatz, Satzbau und Aussprache mit einer Lehrkraft.'},
{type:'free',q:'3 · Rückmeldung und Fragen',context:'Höre deiner Partnerperson zu. Gib eine konkrete Rückmeldung und stelle eine inhaltliche Frage. Beantworte anschließend die Frage zu deiner Präsentation. Allein kannst du laut präsentieren und mögliche Rückfragen üben; das ersetzt noch kein Partnergespräch.',modelAnswer:'„Dein Beispiel mit dem Schulprojekt fand ich verständlich. Wie würdest du Aufgaben verteilen, wenn eine Person weniger Zeit hat?“ Antworte direkt und ergänze ein Beispiel.',explanation:'Passt die Frage zur Präsentation? Ist die Antwort verständlich und ausreichend? Notizen allein erlauben keine Bewertung des Sprechens.'}]}];
})(window);
