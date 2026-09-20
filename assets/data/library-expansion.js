/* Original expanded knowledge articles, grouped by subject and subfield. */
(function(root){
root.LibraryExpansion=[
  {
    "subject": "math",
    "id": "kb-brueche",
    "title": "Brüche umformen und kürzen",
    "group": "Algebra und Grundlagen",
    "summary": "Ein Bruch beschreibt einen Quotienten.",
    "level": "Grundlagen → FHR",
    "source": "bwexpanded",
    "expanded": true,
    "practice": "ma-cubic",
    "sections": [
      {
        "h": "Begriff und Zusammenhang",
        "text": "Ein Bruch beschreibt einen Quotienten. Zähler und Nenner dürfen mit derselben von null verschiedenen Zahl multipliziert oder dividiert werden, ohne seinen Wert zu ändern. Bei Termen ist zusätzlich der Definitionsbereich zu beachten: Ein Nenner darf niemals null sein."
      },
      {
        "h": "Durchgearbeitetes Beispiel",
        "text": "(x²−4)/(x−2) lässt sich als (x−2)(x+2)/(x−2) schreiben. Für x≠2 bleibt x+2. Bei x=2 ist der ursprüngliche Term weiterhin nicht definiert; das Kürzen beseitigt diese Einschränkung nicht. Die Probe x=3 ergibt vorher und nachher 5."
      },
      {
        "h": "Vorgehen und Verknüpfung",
        "text": "Faktorisiere zuerst vollständig. Kürze nur gemeinsame Faktoren, keine einzelnen Summanden. Bei einer Summe von Brüchen stellst du zunächst einen gemeinsamen Nenner her: 1/2+1/3=3/6+2/6=5/6. Diese Sicherheit wird später bei Ableitungen und Gleichungen benötigt."
      },
      {
        "h": "Typischer Denkfehler",
        "text": "Aus (x+2)/x wird nicht 2. Die Addition im Zähler verbindet zwei Summanden; x ist dort kein gemeinsamer Faktor. Eine Zahlenprobe mit x=2 widerlegt die falsche Kürzung sofort."
      }
    ]
  },
  {
    "subject": "math",
    "id": "kb-potenzgesetze",
    "title": "Potenzen und negative Exponenten",
    "group": "Algebra und Grundlagen",
    "summary": "Eine Potenz beschreibt wiederholte Multiplikation.",
    "level": "Grundlagen → FHR",
    "source": "bwexpanded",
    "expanded": true,
    "practice": "ma-exponential",
    "sections": [
      {
        "h": "Begriff und Zusammenhang",
        "text": "Eine Potenz beschreibt wiederholte Multiplikation. Für dieselbe Basis gelten a^m·a^n=a^(m+n) und a^m/a^n=a^(m−n), sofern der Nenner nicht null ist. Negative Exponenten bezeichnen Kehrwerte, keine negativen Ergebnisse."
      },
      {
        "h": "Durchgearbeitetes Beispiel",
        "text": "2³·2⁻⁵=2⁻²=1/4. Dagegen ist (2³)²=2⁶=64: Bei einer Potenz einer Potenz werden die Exponenten multipliziert. Für x≠0 gilt x⁻²=1/x²; der Wert ist daher auch bei negativem x positiv."
      },
      {
        "h": "Vorgehen und Verknüpfung",
        "text": "Notiere zuerst Basis und Exponent. Prüfe, ob Multiplikation, Division oder eine weitere Potenz vorliegt. Schreibe negative Exponenten zum Kontrollieren als Bruch. Bei Summen ist kein entsprechendes Zusammenfassen möglich: 2²+2³=12, nicht 2⁵."
      },
      {
        "h": "Typischer Denkfehler",
        "text": "Das Vorzeichen gehört nur dann zur potenzierten Basis, wenn es mit eingeschlossen ist. −3²=−9, aber (−3)²=9. Diese Unterscheidung beeinflusst Funktionswerte und Nullstellen."
      }
    ]
  },
  {
    "subject": "math",
    "id": "kb-wurzeln",
    "title": "Wurzeln und Definitionsbedingungen",
    "group": "Algebra und Grundlagen",
    "summary": "Die Quadratwurzel √a ist für reelles a≥0 die nichtnegative Zahl, deren Quadrat a ergibt.",
    "level": "Grundlagen → FHR",
    "source": "bwexpanded",
    "expanded": true,
    "practice": "ma-cubic",
    "sections": [
      {
        "h": "Begriff und Zusammenhang",
        "text": "Die Quadratwurzel √a ist für reelles a≥0 die nichtnegative Zahl, deren Quadrat a ergibt. Deshalb gilt √(x²)=|x|. Eine Gleichung x²=a kann zwei Lösungen haben, obwohl das Wurzelsymbol selbst nur den nichtnegativen Wert bezeichnet."
      },
      {
        "h": "Durchgearbeitetes Beispiel",
        "text": "Aus (x−1)²=9 folgen x−1=3 oder x−1=−3, also x=4 oder x=−2. Bei √(x−1)=3 gibt es dagegen nur x=10. Hier muss außerdem x≥1 gelten; die Probe liefert √9=3."
      },
      {
        "h": "Vorgehen und Verknüpfung",
        "text": "Unterscheide eine Wurzelfunktion von einer quadratischen Gleichung. Bestimme vor dem Umformen den erlaubten Bereich. Nach dem Quadrieren prüfst du jede gefundene Lösung in der ursprünglichen Gleichung, weil Quadrieren zusätzliche Kandidaten erzeugen kann."
      },
      {
        "h": "Typischer Denkfehler",
        "text": "√(a+b) ist im Allgemeinen nicht √a+√b. Für a=b=1 stehen √2 und 2 gegenüber. Wurzeln dürfen nicht ohne Prüfung über Summen verteilt werden."
      }
    ]
  },
  {
    "subject": "math",
    "id": "kb-einheiten",
    "title": "Einheiten, Maßstab und Größenordnung",
    "group": "Algebra und Grundlagen",
    "summary": "Ein Zahlenwert ohne Einheit beantwortet eine Sachfrage oft nur teilweise.",
    "level": "Grundlagen → FHR",
    "source": "bwexpanded",
    "expanded": true,
    "practice": "ma-optimization",
    "sections": [
      {
        "h": "Begriff und Zusammenhang",
        "text": "Ein Zahlenwert ohne Einheit beantwortet eine Sachfrage oft nur teilweise. Beim Umrechnen ändern sich Zahlenwert und Einheit gemeinsam. Bei Flächen wird ein Längenfaktor quadriert, bei Volumina kubiert. Ein Modell bleibt nur nachvollziehbar, wenn diese Größen sauber getrennt werden."
      },
      {
        "h": "Durchgearbeitetes Beispiel",
        "text": "Ein Rechteck von 20 cm×30 cm hat 600 cm². In Metern sind die Seiten 0,2 m und 0,3 m; ihre Fläche beträgt 0,06 m². Der Faktor von cm² zu m² ist 1/10000, nicht 1/100."
      },
      {
        "h": "Vorgehen und Verknüpfung",
        "text": "Schreibe Einheiten in Zwischenrechnungen mit. Prüfe vor der Addition, ob die Größen gleichartig sind. Bei einem Maßstab 1:5 wird eine 30 cm lange reale Kante im Modell 6 cm lang. Der Größenordnungscheck verhindert einen Faktorfehler beim Verpackungsmodell."
      },
      {
        "h": "Typischer Denkfehler",
        "text": "Ein Volumen von 1000 cm³ entspricht einem Liter, nicht 1000 Litern. Ein richtig umgestellter Term kann durch eine falsch übertragene Einheit trotzdem eine unbrauchbare Empfehlung liefern."
      }
    ]
  },
  {
    "subject": "math",
    "id": "kb-lineare-gleichungen",
    "title": "Lineare Gleichungen mit Klammern",
    "group": "Algebra und Grundlagen",
    "summary": "Äquivalenzumformungen erhalten die Lösungsmenge.",
    "level": "Grundlagen → FHR",
    "source": "bwexpanded",
    "expanded": true,
    "practice": "ma-project",
    "sections": [
      {
        "h": "Begriff und Zusammenhang",
        "text": "Äquivalenzumformungen erhalten die Lösungsmenge. Beide Seiten einer Gleichung dürfen um denselben Term ergänzt oder mit derselben von null verschiedenen Zahl multipliziert werden. Klammern und Brüche werden zuerst so umgeformt, dass die Unbekannte übersichtlich zusammengefasst werden kann."
      },
      {
        "h": "Durchgearbeitetes Beispiel",
        "text": "3(x−2)+4=2x+7 wird zu 3x−6+4=2x+7. Nach Zusammenfassen folgt 3x−2=2x+7 und damit x=9. Die Probe ergibt links 25 und rechts 25."
      },
      {
        "h": "Vorgehen und Verknüpfung",
        "text": "Schreibe pro Zeile eine begründete Umformung. Unterscheide Ergebnis und Lösungsmenge: 0=0 bedeutet, dass jede zulässige Zahl die Gleichung erfüllt; 0=5 bedeutet, dass es keine Lösung gibt. Diese Fälle treten auch beim Vergleichen paralleler Geraden auf."
      },
      {
        "h": "Typischer Denkfehler",
        "text": "Beim Auflösen einer Minusklammer ändern sich alle Vorzeichen: −(x−3)=−x+3. Nur das erste Vorzeichen zu ändern führt zu einer anderen Gleichung."
      }
    ]
  },
  {
    "subject": "math",
    "id": "kb-ungleichungen",
    "title": "Ungleichungen und zulässige Bereiche",
    "group": "Algebra und Grundlagen",
    "summary": "Eine Ungleichung beschreibt meist einen ganzen Wertebereich.",
    "level": "Grundlagen → FHR",
    "source": "bwexpanded",
    "expanded": true,
    "practice": "ma-project",
    "sections": [
      {
        "h": "Begriff und Zusammenhang",
        "text": "Eine Ungleichung beschreibt meist einen ganzen Wertebereich. Addition derselben Zahl auf beiden Seiten erhält die Richtung. Bei Multiplikation oder Division durch eine negative Zahl wird das Zeichen umgedreht. Sachbedingungen können den mathematischen Bereich zusätzlich einschränken."
      },
      {
        "h": "Durchgearbeitetes Beispiel",
        "text": "48+0,32n<12+0,50n führt zu 36<0,18n und n>200. Bei ganzzahligen Auflagen ist Druckerei A also ab 201 Stück günstiger. Genau bei 200 Stück sind beide Angebote gleich teuer."
      },
      {
        "h": "Vorgehen und Verknüpfung",
        "text": "Löse zunächst die Ungleichung und stelle das Ergebnis auf einer Zahlengeraden dar. Kläre danach, ob Randwerte enthalten sind und ob nur ganze, positive oder anderweitig begrenzte Werte sinnvoll sind. Eine Kontrollzahl aus jedem Bereich prüft die Richtung."
      },
      {
        "h": "Typischer Denkfehler",
        "text": "Aus −2x<6 folgt x>−3. Das unveränderte Zeichen würde beispielsweise x=0 ausschließen, obwohl 0<6 wahr ist."
      }
    ]
  },
  {
    "subject": "math",
    "id": "kb-faktorisieren",
    "title": "Faktorisieren und Nullprodukt",
    "group": "Algebra und Grundlagen",
    "summary": "Faktorisieren verwandelt eine Summe in ein Produkt.",
    "level": "Grundlagen → FHR",
    "source": "bwexpanded",
    "expanded": true,
    "practice": "ma-error",
    "sections": [
      {
        "h": "Begriff und Zusammenhang",
        "text": "Faktorisieren verwandelt eine Summe in ein Produkt. Dadurch lassen sich Nullstellen häufig ohne allgemeine Lösungsformel bestimmen. Ein Produkt ist genau dann null, wenn mindestens einer seiner Faktoren null ist. Voraussetzung ist, dass tatsächlich ein Produkt gleich null vorliegt."
      },
      {
        "h": "Durchgearbeitetes Beispiel",
        "text": "x³−4x=x(x²−4)=x(x−2)(x+2). Aus x(x−2)(x+2)=0 folgen die Lösungen 0, 2 und −2. Die Zerlegung zeigt zugleich, dass keine weitere reelle Nullstelle verborgen bleibt."
      },
      {
        "h": "Vorgehen und Verknüpfung",
        "text": "Suche zuerst einen gemeinsamen Faktor, dann binomische Formen oder weitere zerlegbare Faktoren. Multipliziere zur Kontrolle kurz zurück. Bei einer Kurvendiskussion vereinfacht die Produktform die Nullstellensuche, während die ausmultiplizierte Form oft bequemer zum Ableiten ist."
      },
      {
        "h": "Typischer Denkfehler",
        "text": "Aus x(x−2)=6 darfst du nicht x=6 oder x−2=6 folgern. Der Nullproduktsatz gilt nur für ein Produkt mit dem Wert null."
      }
    ]
  },
  {
    "subject": "math",
    "id": "kb-quadratische-formen",
    "title": "Normalform, Scheitelpunktform und Produktform",
    "group": "Funktionen und Modelle",
    "summary": "Verschiedene Darstellungen einer quadratischen Funktion zeigen unterschiedliche Eigenschaften.",
    "level": "Grundlagen → FHR",
    "source": "bwexpanded",
    "expanded": true,
    "practice": "ma-cubic",
    "sections": [
      {
        "h": "Begriff und Zusammenhang",
        "text": "Verschiedene Darstellungen einer quadratischen Funktion zeigen unterschiedliche Eigenschaften. In der Normalform ax²+bx+c ist c der y-Achsenabschnitt. In a(x−d)²+e liest du den Scheitel (d|e) ab. Eine reelle Produktform macht vorhandene Nullstellen sichtbar."
      },
      {
        "h": "Durchgearbeitetes Beispiel",
        "text": "x²−4x+3=(x−2)²−1=(x−1)(x−3). Alle drei Terme liefern denselben Graphen: Scheitel (2|−1), Nullstellen 1 und 3, y-Achsenabschnitt 3. Mit x=0 erhältst du in jeder Darstellung denselben Wert."
      },
      {
        "h": "Vorgehen und Verknüpfung",
        "text": "Wähle die Form nach der Frage. Ergänze quadratisch, wenn der Scheitel gesucht ist; faktorisiere bei der Nullstellensuche. Vergleiche zusätzlich den Leitkoeffizienten: Sein Vorzeichen bestimmt die Öffnung, sein Betrag die Streckung gegenüber der Normalparabel."
      },
      {
        "h": "Typischer Denkfehler",
        "text": "In (x−2)² liegt der Scheitel bei x=2, nicht bei −2. Setze den Klammerausdruck gleich null, statt das sichtbare Vorzeichen ungeprüft zu übernehmen."
      }
    ]
  },
  {
    "subject": "math",
    "id": "kb-quadratische-formel",
    "title": "Quadratische Gleichungen und Diskriminante",
    "group": "Algebra und Grundlagen",
    "summary": "Für ax²+bx+c=0 mit a≠0 gilt x=(−b±√(b²−4ac))/(2a).",
    "level": "Grundlagen → FHR",
    "source": "bwexpanded",
    "expanded": true,
    "practice": "ma-cubic",
    "sections": [
      {
        "h": "Begriff und Zusammenhang",
        "text": "Für ax²+bx+c=0 mit a≠0 gilt x=(−b±√(b²−4ac))/(2a). Die Diskriminante D=b²−4ac entscheidet über die Anzahl reeller Lösungen. D>0 liefert zwei, D=0 eine doppelte und D<0 keine reelle Lösung."
      },
      {
        "h": "Durchgearbeitetes Beispiel",
        "text": "Bei 2x²−4x−6=0 sind a=2, b=−4 und c=−6. D=16+48=64. Somit x=(4±8)/4, also 3 oder −1. Einsetzen bestätigt beide Werte."
      },
      {
        "h": "Vorgehen und Verknüpfung",
        "text": "Bringe die Gleichung zuerst auf null. Übernimm die Koeffizienten einschließlich ihrer Vorzeichen und klammere beim Einsetzen negative Zahlen. Kürze erst, nachdem Zähler und Nenner vollständig notiert sind. Bei einfachen Faktoren ist der Nullproduktsatz oft schneller."
      },
      {
        "h": "Typischer Denkfehler",
        "text": "Der Nenner 2a teilt den gesamten Zähler, nicht nur den Wurzelausdruck. Außerdem ist eine negative Diskriminante kein Rechenfehler, sondern kann eine echte Information über den Graphen sein."
      }
    ]
  },
  {
    "subject": "math",
    "id": "kb-definitionsbereich",
    "title": "Definitionsbereich und Modellbereich",
    "group": "Funktionen und Modelle",
    "summary": "Der mathematische Definitionsbereich enthält alle zulässigen Eingaben eines Terms.",
    "level": "Grundlagen → FHR",
    "source": "bwexpanded",
    "expanded": true,
    "practice": "ma-optimization",
    "sections": [
      {
        "h": "Begriff und Zusammenhang",
        "text": "Der mathematische Definitionsbereich enthält alle zulässigen Eingaben eines Terms. Der Modellbereich enthält nur die Eingaben, die in der Situation sinnvoll sind. Er kann enger sein. Ein Polynom ist beispielsweise mathematisch überall definiert, eine Verpackungsgröße aber nicht beliebig groß."
      },
      {
        "h": "Durchgearbeitetes Beispiel",
        "text": "Für V(x)=x(30−2x)(20−2x) wäre jedes reelle x berechenbar. Eine echte offene Schachtel braucht positive Kanten: x>0, 30−2x>0 und 20−2x>0. Daraus folgt 0<x<10."
      },
      {
        "h": "Vorgehen und Verknüpfung",
        "text": "Prüfe Nenner, Wurzeln und Logarithmen auf mathematische Einschränkungen. Übersetze dann die Sachbedingungen einzeln. Notiere ausdrücklich, ob die Randwerte erlaubt sind oder nur als Grenzfälle beim Prüfen eines Maximums dienen."
      },
      {
        "h": "Typischer Denkfehler",
        "text": "Ein rechnerisch gefundener kritischer Punkt außerhalb des Modellbereichs ist kein zulässiger Lösungsvorschlag. „Der Taschenrechner liefert ihn“ reicht als Begründung nicht."
      }
    ]
  },
  {
    "subject": "math",
    "id": "kb-graph-lesen",
    "title": "Schaubilder lesen und Achsen prüfen",
    "group": "Funktionen und Modelle",
    "summary": "Ein Schaubild verbindet Eingabewerte auf der waagerechten Achse mit Ausgabewerten auf der senkrechten.",
    "level": "Grundlagen → FHR",
    "source": "bwexpanded",
    "expanded": true,
    "practice": "ma-project",
    "sections": [
      {
        "h": "Begriff und Zusammenhang",
        "text": "Ein Schaubild verbindet Eingabewerte auf der waagerechten Achse mit Ausgabewerten auf der senkrechten. Vor jeder Interpretation müssen Maßstab, Einheiten und dargestellter Bereich klar sein. Ein steil wirkender Verlauf kann durch die Achsenskalierung verstärkt erscheinen."
      },
      {
        "h": "Durchgearbeitetes Beispiel",
        "text": "Ein Diagramm zeigt Kosten in Euro gegen Stückzahl. Der Punkt (100|80) bedeutet 80 Euro für 100 Stück. Er bedeutet weder 80 Euro pro Stück noch eine Steigung von 80. Die Steigung benötigt zwei Punkte oder eine Tangente."
      },
      {
        "h": "Vorgehen und Verknüpfung",
        "text": "Lies zuerst Achsenbeschriftung und Teilstriche. Benenne danach einzelne Werte, Veränderungen und besondere Punkte. Unterscheide beobachtetes Diagramm und Fortsetzung außerhalb des gezeigten Bereichs; dort beginnt gegebenenfalls eine ungesicherte Extrapolation."
      },
      {
        "h": "Typischer Denkfehler",
        "text": "Eine abgeschnittene y-Achse ist nicht automatisch falsch. Sie muss aber erkennbar sein, weil sie Größenunterschiede visuell stark verändern kann. Eine gute Beschreibung erwähnt die Skalierung."
      }
    ]
  },
  {
    "subject": "math",
    "id": "kb-geradengleichung",
    "title": "Gerade durch zwei Punkte",
    "group": "Funktionen und Modelle",
    "summary": "Eine nicht senkrechte Gerade besitzt die Form y=mx+b.",
    "level": "Grundlagen → FHR",
    "source": "bwexpanded",
    "expanded": true,
    "practice": "ma-project",
    "sections": [
      {
        "h": "Begriff und Zusammenhang",
        "text": "Eine nicht senkrechte Gerade besitzt die Form y=mx+b. Aus zwei Punkten mit verschiedenen x-Werten erhältst du m=(y₂−y₁)/(x₂−x₁). Danach bestimmt ein Punkt den Achsenabschnitt b. Die Einheit der Steigung ist die y-Einheit geteilt durch die x-Einheit."
      },
      {
        "h": "Durchgearbeitetes Beispiel",
        "text": "Die Punkte (50|28) und (150|48) liefern m=20/100=0,2. Mit 28=0,2·50+b folgt b=18. Das Modell lautet K(n)=0,2n+18. K(150)=48 kontrolliert den zweiten Punkt."
      },
      {
        "h": "Vorgehen und Verknüpfung",
        "text": "Bilde beide Differenzen in derselben Richtung. Erkläre anschließend die Parameter: 18 Euro sind modellierte Fixkosten; 0,2 Euro pro Stück beschreibt den variablen Anteil. Prüfe, ob diese Interpretation im betrachteten Bereich plausibel ist."
      },
      {
        "h": "Typischer Denkfehler",
        "text": "Wenn x₁=x₂ und die y-Werte verschieden sind, entsteht eine senkrechte Gerade. Sie lässt sich nicht als eindeutige Funktion y=f(x) darstellen. Division durch null ist keine unendliche normale Steigung."
      }
    ]
  },
  {
    "subject": "math",
    "id": "kb-schnittpunkte",
    "title": "Schnittpunkte zweier Graphen",
    "group": "Funktionen und Modelle",
    "summary": "An einem Schnittpunkt haben zwei Funktionen bei derselben Eingabe denselben Ausgabewert.",
    "level": "Grundlagen → FHR",
    "source": "bwexpanded",
    "expanded": true,
    "practice": "ma-cubic",
    "sections": [
      {
        "h": "Begriff und Zusammenhang",
        "text": "An einem Schnittpunkt haben zwei Funktionen bei derselben Eingabe denselben Ausgabewert. Deshalb löst du f(x)=g(x). Die Lösung liefert zunächst nur x; die zugehörige y-Koordinate muss anschließend berechnet werden. Mehrere Schnittpunkte sind möglich."
      },
      {
        "h": "Durchgearbeitetes Beispiel",
        "text": "Für f(x)=x² und g(x)=2x+3 gilt x²−2x−3=0. Die Faktorisierung (x−3)(x+1)=0 liefert x=3 und x=−1. Die Schnittpunkte sind (3|9) und (−1|1)."
      },
      {
        "h": "Vorgehen und Verknüpfung",
        "text": "Bringe beide Terme auf eine Seite und wähle ein passendes Lösungsverfahren. Setze jeden x-Wert in eine der Ausgangsfunktionen ein; die zweite liefert eine unabhängige Kontrolle. Bei Sachaufgaben prüfst du zusätzlich den gemeinsamen Modellbereich."
      },
      {
        "h": "Typischer Denkfehler",
        "text": "Nur die Differenz f−g hat an den gesuchten x-Stellen Nullstellen. Die ursprünglichen Funktionen müssen dort keineswegs den Wert null besitzen."
      }
    ]
  },
  {
    "subject": "math",
    "id": "kb-transformationen",
    "title": "Verschieben und Strecken von Funktionen",
    "group": "Funktionen und Modelle",
    "summary": "Bei g(x)=a·f(x−d)+e verschiebt d den Graphen horizontal und e vertikal.",
    "level": "Grundlagen → FHR",
    "source": "bwexpanded",
    "expanded": true,
    "practice": "ma-cubic",
    "sections": [
      {
        "h": "Begriff und Zusammenhang",
        "text": "Bei g(x)=a·f(x−d)+e verschiebt d den Graphen horizontal und e vertikal. a verändert die Funktionswerte; ein negatives a spiegelt zusätzlich an der x-Achse. Veränderungen innerhalb und außerhalb des Funktionsterms wirken auf verschiedene Koordinaten."
      },
      {
        "h": "Durchgearbeitetes Beispiel",
        "text": "Aus f(x)=x² wird g(x)=2(x−3)²−1. Der Scheitel wandert nach (3|−1), die vertikalen Abstände zum Scheitel werden verdoppelt. Der ursprüngliche Punkt (1|1) entspricht dem Punkt (4|1)."
      },
      {
        "h": "Vorgehen und Verknüpfung",
        "text": "Verfolge einige bekannte Punkte und beschreibe jede Veränderung getrennt. Prüfe danach die Gesamtform. Dieses Vorgehen funktioniert auch bei Exponential- und Sinusfunktionen, solange du ihren jeweiligen Definitionsbereich beachtest."
      },
      {
        "h": "Typischer Denkfehler",
        "text": "„Minus drei“ innerhalb von f(x−3) bedeutet eine Verschiebung nach rechts. Setze x=3 ein: Die Funktion erhält dort die ursprüngliche Eingabe null. So lässt sich die Richtung sicher bestimmen."
      }
    ]
  },
  {
    "subject": "math",
    "id": "kb-symmetrie",
    "title": "Symmetrie von Funktionsgraphen",
    "group": "Funktionen und Modelle",
    "summary": "Eine Funktion ist gerade, wenn f(−x)=f(x), und besitzt dann y-Achsensymmetrie.",
    "level": "Grundlagen → FHR",
    "source": "bwexpanded",
    "expanded": true,
    "practice": "ma-error",
    "sections": [
      {
        "h": "Begriff und Zusammenhang",
        "text": "Eine Funktion ist gerade, wenn f(−x)=f(x), und besitzt dann y-Achsensymmetrie. Sie ist ungerade, wenn f(−x)=−f(x), und besitzt Ursprungssymmetrie. Der Definitionsbereich muss bei diesen Vergleichen ebenfalls symmetrisch sein."
      },
      {
        "h": "Durchgearbeitetes Beispiel",
        "text": "f(x)=x³−3x erfüllt f(−x)=−x³+3x=−f(x). Bei symmetrischen Grenzen [−1;1] heben sich die orientierten Integralanteile auf. Die geometrischen Flächen verschwinden dadurch nicht."
      },
      {
        "h": "Vorgehen und Verknüpfung",
        "text": "Ersetze jedes x durch −x und vereinfache sorgfältig. Eine Punktprobe kann eine Symmetrie widerlegen, aber einzelne passende Punkte beweisen sie nicht allgemein. Nutze die gefundene Eigenschaft zur Kontrolle der Skizze."
      },
      {
        "h": "Typischer Denkfehler",
        "text": "Ursprungssymmetrie bedeutet nicht, dass jeder Punkt auf der x-Achse liegt. Die Punkte kommen paarweise als (x|y) und (−x|−y) vor."
      }
    ]
  },
  {
    "subject": "math",
    "id": "kb-grenzverhalten",
    "title": "Endverhalten ganzrationaler Funktionen",
    "group": "Funktionen und Modelle",
    "summary": "Bei einem Polynom bestimmt der Term mit der höchsten Potenz das Verhalten für sehr große positive oder negative x-Werte.",
    "level": "Grundlagen → FHR",
    "source": "bwexpanded",
    "expanded": true,
    "practice": "ma-cubic",
    "sections": [
      {
        "h": "Begriff und Zusammenhang",
        "text": "Bei einem Polynom bestimmt der Term mit der höchsten Potenz das Verhalten für sehr große positive oder negative x-Werte. Grad und Vorzeichen des Leitkoeffizienten entscheiden über die Richtung der beiden Äste. Lokale Eigenschaften wie Extrempunkte folgen daraus noch nicht."
      },
      {
        "h": "Durchgearbeitetes Beispiel",
        "text": "Bei f(x)=−2x⁴+7x−1 dominiert −2x⁴. Für x→∞ und x→−∞ gehen die Funktionswerte gegen −∞. Bei g(x)=x³−3x gehen die Äste dagegen in entgegengesetzte Richtungen."
      },
      {
        "h": "Vorgehen und Verknüpfung",
        "text": "Bestimme zuerst Grad und Leitkoeffizient. Untersuche dann positive und negative große Eingaben getrennt. Verbinde diese Information später mit Nullstellen, Extrempunkten und Wendepunkten zu einer konsistenten Skizze."
      },
      {
        "h": "Typischer Denkfehler",
        "text": "Ein negativer konstanter Term sagt nichts darüber aus, ob der rechte Ast nach unten verläuft. Er verschiebt den Graphen vertikal, dominiert aber nicht die höchsten Potenzen."
      }
    ]
  },
  {
    "subject": "math",
    "id": "kb-lgs-elimination",
    "title": "Lineare Gleichungssysteme systematisch lösen",
    "group": "Algebra und Grundlagen",
    "summary": "Ein lineares Gleichungssystem verlangt, dass mehrere Gleichungen gleichzeitig erfüllt sind.",
    "level": "Grundlagen → FHR",
    "source": "bwexpanded",
    "expanded": true,
    "practice": "ma-cubic",
    "sections": [
      {
        "h": "Begriff und Zusammenhang",
        "text": "Ein lineares Gleichungssystem verlangt, dass mehrere Gleichungen gleichzeitig erfüllt sind. Beim Additionsverfahren eliminierst du eine Unbekannte durch passend vervielfachte Gleichungen. Die verbleibende Gleichung wird gelöst; Rückeinsetzen liefert die übrigen Werte."
      },
      {
        "h": "Durchgearbeitetes Beispiel",
        "text": "8a+4b=2 und 12a+4b=6 ergeben durch Subtraktion der ersten von der zweiten Gleichung 4a=4. Also a=1. Rückeinsetzen liefert 8+4b=2, somit b=−1,5. Beide Ausgangsgleichungen werden erfüllt."
      },
      {
        "h": "Vorgehen und Verknüpfung",
        "text": "Ordne die Variablen in jeder Zeile gleich. Wähle eine Variable, deren Koeffizienten leicht gleich oder entgegengesetzt werden. Notiere die ausgeführte Zeilenoperation. Bei 0=0 bleibt eine Abhängigkeit; bei 0=c mit c≠0 ist das System unlösbar."
      },
      {
        "h": "Typischer Denkfehler",
        "text": "Die gefundenen Werte einzeln in irgendeine Gleichung einzusetzen reicht nicht. Das gesamte Wertepaar muss jede Gleichung gleichzeitig erfüllen."
      }
    ]
  },
  {
    "subject": "math",
    "id": "kb-sekante",
    "title": "Differenzenquotient und mittlere Änderung",
    "group": "Differentialrechnung",
    "summary": "Der Differenzenquotient (f(b)−f(a))/(b−a) beschreibt die mittlere Änderung im Intervall [a;b], sofern a≠b.",
    "level": "Grundlagen → FHR",
    "source": "bwexpanded",
    "expanded": true,
    "practice": "ma-cubic",
    "sections": [
      {
        "h": "Begriff und Zusammenhang",
        "text": "Der Differenzenquotient (f(b)−f(a))/(b−a) beschreibt die mittlere Änderung im Intervall [a;b], sofern a≠b. Geometrisch ist er die Steigung der Sekante durch die beiden Graphenpunkte. Er beschreibt keine beliebige einzelne Stelle des Intervalls."
      },
      {
        "h": "Durchgearbeitetes Beispiel",
        "text": "Für f(x)=x² auf [1;3] beträgt die mittlere Änderung (9−1)/(3−1)=4. Die Sekante hat deshalb Steigung 4. Die momentane Änderung bei x=1 ist dagegen 2 und bei x=3 gleich 6."
      },
      {
        "h": "Vorgehen und Verknüpfung",
        "text": "Berechne zuerst die Funktionswerte und bilde danach den Quotienten mit zusammengehörigen Differenzen. Gib bei Sachkontexten die Einheit an. Bei Kosten je Stückzahl bedeutet die Steigung Euro pro zusätzlichem Stück im betrachteten Intervall."
      },
      {
        "h": "Typischer Denkfehler",
        "text": "f(b)/b ist nur in besonderen Fällen die gesuchte Steigung. Ohne Berücksichtigung des Ausgangspunkts wird ein Achsenabschnitt fälschlich in die Änderung einbezogen."
      }
    ]
  },
  {
    "subject": "math",
    "id": "kb-ableitungsbegriff",
    "title": "Ableitung als lokale Änderungsrate",
    "group": "Differentialrechnung",
    "summary": "Die Ableitung f′(x₀) beschreibt die lokale Änderung einer Funktion an einer Stelle.",
    "level": "Grundlagen → FHR",
    "source": "bwexpanded",
    "expanded": true,
    "practice": "ma-cubic",
    "sections": [
      {
        "h": "Begriff und Zusammenhang",
        "text": "Die Ableitung f′(x₀) beschreibt die lokale Änderung einer Funktion an einer Stelle. Sie entsteht als Grenzwert des Differenzenquotienten, wenn der zweite Punkt an den ersten heranrückt. Existiert dieser Grenzwert nicht, ist die Funktion dort nicht differenzierbar."
      },
      {
        "h": "Durchgearbeitetes Beispiel",
        "text": "Bei f(x)=x² ergibt der Quotient ((x₀+h)²−x₀²)/h nach Ausmultiplizieren 2x₀+h für h≠0. Für h→0 bleibt 2x₀. Somit ist f′(x)=2x; an der Stelle 3 beträgt die Tangentensteigung 6."
      },
      {
        "h": "Vorgehen und Verknüpfung",
        "text": "Unterscheide die Ableitungsfunktion f′ von ihrem Wert an einer bestimmten Stelle. Beschreibe erst die Bedeutung, dann die Rechenregel. So lässt sich später auch die Einheit einer Änderungsrate aus dem Sachmodell ableiten."
      },
      {
        "h": "Typischer Denkfehler",
        "text": "Eine große Höhe des Graphen bedeutet nicht automatisch große Steigung. Ein Hochpunkt kann einen sehr großen Funktionswert und trotzdem die Ableitung null besitzen."
      }
    ]
  },
  {
    "subject": "math",
    "id": "kb-potenzableitung",
    "title": "Potenzregel, Summenregel und Faktorregel",
    "group": "Differentialrechnung",
    "summary": "Für ganzzahlige positive n gilt (x^n)′=n·x^(n−1).",
    "level": "Grundlagen → FHR",
    "source": "bwexpanded",
    "expanded": true,
    "practice": "ma-cubic",
    "sections": [
      {
        "h": "Begriff und Zusammenhang",
        "text": "Für ganzzahlige positive n gilt (x^n)′=n·x^(n−1). Konstante Faktoren bleiben erhalten, Summanden werden einzeln abgeleitet. Eine konstante Funktion hat die Ableitung null, weil sich ihr Wert bei veränderter Eingabe nicht ändert."
      },
      {
        "h": "Durchgearbeitetes Beispiel",
        "text": "f(x)=3x⁴−2x²+7 wird zu f′(x)=12x³−4x. Ein zweites Ableiten liefert f″(x)=36x²−4. Die Zahl 7 verschwindet beim Ableiten; sie beeinflusst den y-Achsenabschnitt, nicht die Steigung."
      },
      {
        "h": "Vorgehen und Verknüpfung",
        "text": "Arbeite termweise und kontrolliere bei jedem Potenzterm Koeffizient und neuen Exponenten. Vereinfache Produkte gegebenenfalls vorher. Die Regeln bilden die Grundlage für Kurvendiskussion und Optimierung; ohne Interpretation bleibt das Ergebnis jedoch nur ein Term."
      },
      {
        "h": "Typischer Denkfehler",
        "text": "Der Exponent wird nicht einfach gestrichen. Aus x⁴ wird weder x³ noch 4x⁴, sondern 4x³. Beide Teile der Regel gehören zusammen."
      }
    ]
  },
  {
    "subject": "math",
    "id": "kb-produktregel",
    "title": "Produktregel richtig einsetzen",
    "group": "Differentialrechnung",
    "summary": "Für ein Produkt zweier differenzierbarer Funktionen gilt (uv)′=u′v+uv′.",
    "level": "Grundlagen → FHR",
    "source": "bwexpanded",
    "expanded": true,
    "practice": "ma-exponential",
    "sections": [
      {
        "h": "Begriff und Zusammenhang",
        "text": "Für ein Produkt zweier differenzierbarer Funktionen gilt (uv)′=u′v+uv′. Beide Faktoren können sich ändern; deshalb enthält die Ableitung zwei Beiträge. Die Regel unterscheidet sich von der Ableitung eines konstanten Faktors."
      },
      {
        "h": "Durchgearbeitetes Beispiel",
        "text": "f(x)=x²e^x ergibt f′(x)=2x·e^x+x²·e^x=e^x(x²+2x). Für x=0 ist die Ableitung null, obwohl e^0=1. Die Faktorisierung hilft anschließend bei der Suche nach stationären Stellen."
      },
      {
        "h": "Vorgehen und Verknüpfung",
        "text": "Benenne u, v, u′ und v′ in einer kleinen Nebenrechnung. Setze erst dann in die Regel ein und fasse anschließend zusammen. Eine ausmultiplizierbare Polynomform kann als Kontrolle dienen; bei x²e^x ist die Produktregel direkt sinnvoll."
      },
      {
        "h": "Typischer Denkfehler",
        "text": "u′v′ ist nicht die Ableitung des Produkts. Schon bei x·x wäre das Ergebnis 1 statt des korrekten 2x."
      }
    ]
  },
  {
    "subject": "math",
    "id": "kb-kettenregel",
    "title": "Kettenregel und innere Funktion",
    "group": "Differentialrechnung",
    "summary": "Bei einer Verkettung g(h(x)) wird die Ableitung der äußeren Funktion an der inneren Funktion mit h′(x) multipliziert.",
    "level": "Grundlagen → FHR",
    "source": "bwexpanded",
    "expanded": true,
    "practice": "ma-exponential",
    "sections": [
      {
        "h": "Begriff und Zusammenhang",
        "text": "Bei einer Verkettung g(h(x)) wird die Ableitung der äußeren Funktion an der inneren Funktion mit h′(x) multipliziert. Die innere Ableitung berücksichtigt, wie schnell sich das Argument selbst verändert. Äußere und innere Funktion müssen klar getrennt werden."
      },
      {
        "h": "Durchgearbeitetes Beispiel",
        "text": "f(x)=(3x−1)⁴ hat die äußere Funktion u⁴ und die innere Funktion u=3x−1. Deshalb f′(x)=4(3x−1)³·3=12(3x−1)³. Bei e^(2x) ergibt die gleiche Idee 2e^(2x)."
      },
      {
        "h": "Vorgehen und Verknüpfung",
        "text": "Markiere zunächst den inneren Ausdruck. Leite die äußere Form ab, ohne diesen Ausdruck zu verändern. Multipliziere zuletzt mit der inneren Ableitung. Eine lineare innere Funktion macht den zusätzlichen Faktor besonders gut sichtbar."
      },
      {
        "h": "Typischer Denkfehler",
        "text": "Die innere Ableitung zu vergessen liefert einen systematischen Faktorfehler. Ein Vergleich an einer einzelnen Stelle kann helfen, ersetzt aber keine saubere Strukturierung der Rechnung."
      }
    ]
  },
  {
    "subject": "math",
    "id": "kb-tangentengleichung",
    "title": "Tangente aus Punkt und Steigung",
    "group": "Differentialrechnung",
    "summary": "Die Tangente an f im Punkt x₀ besitzt die Gleichung y=f′(x₀)(x−x₀)+f(x₀).",
    "level": "Grundlagen → FHR",
    "source": "bwexpanded",
    "expanded": true,
    "practice": "ma-cubic",
    "sections": [
      {
        "h": "Begriff und Zusammenhang",
        "text": "Die Tangente an f im Punkt x₀ besitzt die Gleichung y=f′(x₀)(x−x₀)+f(x₀). Sie kombiniert die lokale Steigung mit einem bekannten Punkt. Sie ist eine lineare Näherung in der Umgebung dieses Punktes, nicht im Allgemeinen der ganze Graph."
      },
      {
        "h": "Durchgearbeitetes Beispiel",
        "text": "Für f(x)=x² und x₀=2 gilt f(2)=4 und f′(2)=4. Daher y=4(x−2)+4=4x−4. Bei x=2,1 liefert die Tangente 4,4; der Funktionswert ist 4,41. Die kleine Abweichung zeigt die lokale Näherung."
      },
      {
        "h": "Vorgehen und Verknüpfung",
        "text": "Berechne Funktionswert und Ableitungswert getrennt. Setze beides in die Punkt-Steigungs-Form ein und kontrolliere, ob x₀ den ursprünglichen Punkt ergibt. Erst danach kann die Gleichung in y=mx+b umgeformt werden."
      },
      {
        "h": "Typischer Denkfehler",
        "text": "Eine Tangente muss den Graphen nicht überall nur berühren und darf ihn an anderen Stellen schneiden. Ihre entscheidende Eigenschaft ist die gemeinsame lokale Steigung am betrachteten Punkt."
      }
    ]
  },
  {
    "subject": "math",
    "id": "kb-monotonie",
    "title": "Monotonie mit Vorzeichen der Ableitung",
    "group": "Differentialrechnung",
    "summary": "Auf einem Intervall mit f′(x)>0 steigt die Funktion streng; bei f′(x)<0 fällt sie streng.",
    "level": "Grundlagen → FHR",
    "source": "bwexpanded",
    "expanded": true,
    "practice": "ma-error",
    "sections": [
      {
        "h": "Begriff und Zusammenhang",
        "text": "Auf einem Intervall mit f′(x)>0 steigt die Funktion streng; bei f′(x)<0 fällt sie streng. Entscheidend ist das Vorzeichen der Ableitung, nicht das Vorzeichen des Funktionswerts. Nullstellen der Ableitung teilen häufig die zu untersuchenden Intervalle auf."
      },
      {
        "h": "Durchgearbeitetes Beispiel",
        "text": "Für f(x)=x³−3x ist f′(x)=3(x−1)(x+1). Links von −1 ist die Ableitung positiv, zwischen −1 und 1 negativ und rechts von 1 positiv. Der Graph steigt, fällt und steigt entsprechend."
      },
      {
        "h": "Vorgehen und Verknüpfung",
        "text": "Bestimme die Nullstellen von f′ und ordne sie. Wähle je einen Testwert aus jedem Zwischenintervall und notiere das Vorzeichen. Verbinde die Intervalle mit den stationären Punkten, statt nur eine Liste von Zahlen abzugeben."
      },
      {
        "h": "Typischer Denkfehler",
        "text": "Ein negativer Funktionswert kann durchaus zunehmen. Beispielsweise steigt x−5 überall, obwohl seine Werte für x<5 negativ sind."
      }
    ]
  },
  {
    "subject": "math",
    "id": "kb-extremtest",
    "title": "Stationäre Stellen und Extremtest",
    "group": "Differentialrechnung",
    "summary": "f′(x₀)=0 ist bei einer differenzierbaren Funktion eine notwendige Bedingung für ein inneres Extremum, aber keine hinreichende.",
    "level": "Grundlagen → FHR",
    "source": "bwexpanded",
    "expanded": true,
    "practice": "ma-error",
    "sections": [
      {
        "h": "Begriff und Zusammenhang",
        "text": "f′(x₀)=0 ist bei einer differenzierbaren Funktion eine notwendige Bedingung für ein inneres Extremum, aber keine hinreichende. Ein Wechsel von plus nach minus zeigt einen Hochpunkt, von minus nach plus einen Tiefpunkt. Alternativ kann die zweite Ableitung helfen."
      },
      {
        "h": "Durchgearbeitetes Beispiel",
        "text": "f(x)=x³ hat f′(0)=0 und f″(0)=0. Trotzdem liegt kein Extremum vor, weil f′(x)=3x² auf beiden Seiten positiv ist. Bei g(x)=x² wechselt g′(x)=2x dagegen von negativ zu positiv: Tiefpunkt (0|0)."
      },
      {
        "h": "Vorgehen und Verknüpfung",
        "text": "Unterscheide Stelle x₀ und Punkt (x₀|f(x₀)). Prüfe jeden Kandidaten und ergänze bei einem abgeschlossenen Intervall die Randwerte. Ein lokaler Hochpunkt ist nicht automatisch der größte Wert im gesamten betrachteten Bereich."
      },
      {
        "h": "Typischer Denkfehler",
        "text": "Wenn f″(x₀)=0 ist, ist der zweite Ableitungstest unentschieden. Daraus folgt weder sicher ein Extremum noch sicher dessen Fehlen."
      }
    ]
  },
  {
    "subject": "math",
    "id": "kb-wendetest",
    "title": "Krümmung und Wendepunkt",
    "group": "Differentialrechnung",
    "summary": "Die zweite Ableitung beschreibt die Änderung der Steigung.",
    "level": "Grundlagen → FHR",
    "source": "bwexpanded",
    "expanded": true,
    "practice": "ma-error",
    "sections": [
      {
        "h": "Begriff und Zusammenhang",
        "text": "Die zweite Ableitung beschreibt die Änderung der Steigung. Ein Wendepunkt liegt vor, wenn die Krümmung wechselt. f″(x₀)=0 liefert bei hinreichend glatten Funktionen einen Kandidaten; ein Vorzeichenwechsel muss geprüft werden. Der Funktionswert gehört zur vollständigen Punktangabe."
      },
      {
        "h": "Durchgearbeitetes Beispiel",
        "text": "Für f(x)=x³−3x gilt f″(x)=6x. Links von null ist dieser Wert negativ, rechts positiv. Daher liegt ein Wendepunkt bei (0|0). Die Tangente dort hat die Steigung f′(0)=−3 und ist nicht waagerecht."
      },
      {
        "h": "Vorgehen und Verknüpfung",
        "text": "Berechne f″, finde Kandidaten und untersuche die benachbarten Vorzeichen. Ein nicht verschwindender Wert von f‴ am Kandidaten ist ein gebräuchliches hinreichendes Kriterium. Beschreibe anschließend, wie sich die Steigung vor und nach dem Punkt verändert."
      },
      {
        "h": "Typischer Denkfehler",
        "text": "Wendepunkt und Tiefpunkt beantworten unterschiedliche Fragen. Ein Wendepunkt betrifft Krümmung; ein Tiefpunkt betrifft kleinere Funktionswerte als in seiner Umgebung."
      }
    ]
  },
  {
    "subject": "math",
    "id": "kb-stammfunktion",
    "title": "Stammfunktionen und Integrationskonstante",
    "group": "Integralrechnung",
    "summary": "Eine Stammfunktion F zu f erfüllt F′=f.",
    "level": "Grundlagen → FHR",
    "source": "bwexpanded",
    "expanded": true,
    "practice": "ma-area",
    "sections": [
      {
        "h": "Begriff und Zusammenhang",
        "text": "Eine Stammfunktion F zu f erfüllt F′=f. Zu einer Funktion gehören im Allgemeinen viele Stammfunktionen, die sich auf einem Intervall um eine Konstante unterscheiden. Für x^n mit n≠−1 lautet eine Stammfunktion x^(n+1)/(n+1)."
      },
      {
        "h": "Durchgearbeitetes Beispiel",
        "text": "Zu f(x)=3x²−4x passt F(x)=x³−2x²+C. Ableiten entfernt C und ergibt wieder f. Die Zusatzbedingung F(1)=5 liefert 1−2+C=5, also C=6."
      },
      {
        "h": "Vorgehen und Verknüpfung",
        "text": "Erhöhe bei einer Potenz den Exponenten um eins und teile durch den neuen Exponenten. Führe anschließend die Ableitungsprobe aus. Die Ausnahme x⁻¹ benötigt den Logarithmus; die allgemeine Potenzformel darf dort nicht durch null teilen."
      },
      {
        "h": "Typischer Denkfehler",
        "text": "Beim bestimmten Integral fällt die Konstante in F(b)−F(a) weg. Beim Bestimmen einer konkreten Stammfunktion aus einer Bedingung darf sie dagegen nicht fehlen."
      }
    ]
  },
  {
    "subject": "math",
    "id": "kb-bestimmtes-integral",
    "title": "Bestimmtes Integral auswerten",
    "group": "Integralrechnung",
    "summary": "Das bestimmte Integral von a bis b wird über F(b)−F(a) berechnet, wenn F eine geeignete Stammfunktion von f ist.",
    "level": "Grundlagen → FHR",
    "source": "bwexpanded",
    "expanded": true,
    "practice": "ma-area",
    "sections": [
      {
        "h": "Begriff und Zusammenhang",
        "text": "Das bestimmte Integral von a bis b wird über F(b)−F(a) berechnet, wenn F eine geeignete Stammfunktion von f ist. Es liefert eine orientierte Bilanz. Der obere und der untere Grenzwert müssen jeweils in den vollständigen Stammfunktionsterm eingesetzt werden."
      },
      {
        "h": "Durchgearbeitetes Beispiel",
        "text": "Für f(x)=2x+1 auf [1;3] ist F(x)=x²+x. Das Integral beträgt (9+3)−(1+1)=10. Wird die Reihenfolge der Grenzen vertauscht, ergibt sich −10. Bei identischen Grenzen ist das Integral null."
      },
      {
        "h": "Vorgehen und Verknüpfung",
        "text": "Notiere eine Stammfunktion, dann beide eingesetzten Werte in Klammern und erst danach die Differenz. Bei Sachgrößen erhält das Integral die Einheit Funktionswert mal Eingabeeinheit. Eine Rate in Litern pro Minute ergibt über Minuten ein Volumen in Litern."
      },
      {
        "h": "Typischer Denkfehler",
        "text": "Eine negative Bilanz ist möglich und nicht automatisch falsch. Ob ein geometrischer Flächeninhalt gesucht ist, muss aus der Aufgabenstellung geklärt werden."
      }
    ]
  },
  {
    "subject": "math",
    "id": "kb-flaechen-zwischen",
    "title": "Fläche zwischen zwei Graphen",
    "group": "Integralrechnung",
    "summary": "Die geometrische Fläche zwischen f und g entsteht aus dem Integral des vertikalen Abstands.",
    "level": "Grundlagen → FHR",
    "source": "bwexpanded",
    "expanded": true,
    "practice": "ma-area",
    "sections": [
      {
        "h": "Begriff und Zusammenhang",
        "text": "Die geometrische Fläche zwischen f und g entsteht aus dem Integral des vertikalen Abstands. Solange f oberhalb von g liegt, lautet dieser Abstand f−g. Wechseln die Graphen ihre Reihenfolge, müssen die Integrationsintervalle an den Schnittstellen getrennt werden."
      },
      {
        "h": "Durchgearbeitetes Beispiel",
        "text": "Zwischen f(x)=2x und g(x)=x² liegen Schnittstellen bei 0 und 2. Dort ist 2x−x² nichtnegativ. Die Fläche beträgt [x²−x³/3] von 0 bis 2, also 4−8/3=4/3."
      },
      {
        "h": "Vorgehen und Verknüpfung",
        "text": "Bestimme zuerst Grenzen und Schnittpunkte. Prüfe die obere Funktion mit einem Testwert. Integriere dann den Abstand abschnittsweise und addiere positive Teilflächen. Eine beschriftete Skizze hilft, die Rechnung mit der Geometrie zu verbinden."
      },
      {
        "h": "Typischer Denkfehler",
        "text": "Nicht jede Fläche zwischen Graphen ist durch die Nullstellen einer einzelnen Funktion begrenzt. Maßgeblich sind die vorgegebenen Grenzen oder die Schnittpunkte beider Graphen."
      }
    ]
  },
  {
    "subject": "math",
    "id": "kb-integralmittel",
    "title": "Mittlerer Funktionswert",
    "group": "Integralrechnung",
    "summary": "Der mittlere Funktionswert auf [a;b] mit a<b ist das Integral von f geteilt durch b−a.",
    "level": "Grundlagen → FHR",
    "source": "bwexpanded",
    "expanded": true,
    "practice": "ma-area",
    "sections": [
      {
        "h": "Begriff und Zusammenhang",
        "text": "Der mittlere Funktionswert auf [a;b] mit a<b ist das Integral von f geteilt durch b−a. Er entspricht der Höhe eines Rechtecks mit derselben orientierten Fläche und derselben Breite. Er hat die Einheit der Funktion, nicht die Einheit einer Fläche."
      },
      {
        "h": "Durchgearbeitetes Beispiel",
        "text": "Für f(x)=x² auf [0;3] beträgt das Integral 9. Durch die Intervalllänge 3 geteilt ergibt sich der Mittelwert 3. Der einfache Durchschnitt der Randwerte wäre 4,5 und stimmt hier nicht mit dem Integralmittel überein."
      },
      {
        "h": "Vorgehen und Verknüpfung",
        "text": "Berechne erst die Bilanz, dann die Intervalllänge. Unterscheide dieses kontinuierliche Mittel vom arithmetischen Mittel einzelner Messwerte. Bei gleichmäßig verteilten Messpunkten kann eine Näherung entstehen, aber sie ist nicht automatisch exakt."
      },
      {
        "h": "Typischer Denkfehler",
        "text": "Nur bei speziellen Funktionsformen, etwa einer Geraden, ergibt der Durchschnitt der Randwerte bereits den exakten mittleren Funktionswert."
      }
    ]
  },
  {
    "subject": "math",
    "id": "kb-logarithmus",
    "title": "Logarithmen und unbekannte Exponenten",
    "group": "Funktionen und Modelle",
    "summary": "Ein Logarithmus beantwortet, welcher Exponent zu einer positiven Zahl führt.",
    "level": "Grundlagen → FHR",
    "source": "bwexpanded",
    "expanded": true,
    "practice": "ma-exponential",
    "sections": [
      {
        "h": "Begriff und Zusammenhang",
        "text": "Ein Logarithmus beantwortet, welcher Exponent zu einer positiven Zahl führt. ln ist die Umkehrfunktion der Exponentialfunktion e^x. Für reelle Logarithmen muss das Argument positiv sein. Logarithmieren ist besonders hilfreich, wenn eine Zeit oder ein Wachstumsfaktor im Exponenten gesucht wird."
      },
      {
        "h": "Durchgearbeitetes Beispiel",
        "text": "Aus 100e^(−0,05t)=60 folgt e^(−0,05t)=0,6. Logarithmieren ergibt −0,05t=ln(0,6), also t≈10,22. Einsetzen liefert wieder ungefähr 60. Die Einheit von t folgt aus dem ursprünglichen Modell."
      },
      {
        "h": "Vorgehen und Verknüpfung",
        "text": "Isoliere zunächst den Exponentialterm. Wende dann den Logarithmus auf beide Seiten an und löse die entstehende lineare Gleichung. Prüfe, ob die gefundene Zeit im zulässigen Modellbereich liegt."
      },
      {
        "h": "Typischer Denkfehler",
        "text": "ln(a+b) ist nicht ln(a)+ln(b). Die bekannte Zerlegung gilt für Produkte positiver Zahlen: ln(ab)=ln(a)+ln(b)."
      }
    ]
  },
  {
    "subject": "math",
    "id": "kb-optimieren",
    "title": "Optimierungsaufgaben strukturieren",
    "group": "Modellierung und Prüfung",
    "summary": "Optimierung verbindet Nebenbedingungen mit einer Zielgröße.",
    "level": "Grundlagen → FHR",
    "source": "bwexpanded",
    "expanded": true,
    "practice": "ma-optimization",
    "sections": [
      {
        "h": "Begriff und Zusammenhang",
        "text": "Optimierung verbindet Nebenbedingungen mit einer Zielgröße. Zuerst wird die Situation in Variablen und zulässige Werte übersetzt. Danach entsteht eine Zielfunktion mit möglichst nur einer unabhängigen Variablen. Das globale Optimum benötigt eine Prüfung aller relevanten Kandidaten und Grenzen."
      },
      {
        "h": "Durchgearbeitetes Beispiel",
        "text": "Ein Rechteck mit Umfang 20 cm hat Seiten x und 10−x. Seine Fläche A(x)=x(10−x) gilt für 0<x<10. A′(x)=10−2x wird bei x=5 null; A″=−2 zeigt ein Maximum. Die Fläche beträgt dann 25 cm²."
      },
      {
        "h": "Vorgehen und Verknüpfung",
        "text": "Zeichne eine Skizze und benenne Einheiten. Formuliere die Nebenbedingung, setze sie in die Zielgröße ein und prüfe den Bereich. Nach der Ableitung folgt die Rückübersetzung in die reale Frage einschließlich möglicher Rundung und Modellgrenzen."
      },
      {
        "h": "Typischer Denkfehler",
        "text": "Ein stationärer Punkt außerhalb des zulässigen Bereichs oder eine negative Seitenlänge löst die Sachaufgabe nicht. Rechnen und Interpretieren gehören zusammen."
      }
    ]
  },
  {
    "subject": "de",
    "id": "kb-operatoren",
    "title": "Operatoren: beschreiben, analysieren, beurteilen",
    "group": "Lesen und Analyse",
    "summary": "Operatoren bestimmen die Art der geforderten Denkleistung.",
    "level": "B1 → FHR",
    "source": "bwlanguages",
    "expanded": true,
    "practice": "de-analyse",
    "sections": [
      {
        "h": "Begriff und Zusammenhang",
        "text": "Operatoren bestimmen die Art der geforderten Denkleistung. Beschreiben ordnet beobachtbare Merkmale. Analysieren erklärt Zusammenhänge zwischen Merkmalen und Funktion. Beurteilen verlangt ein begründetes Urteil anhand offengelegter Kriterien. Eine gute Antwort beginnt deshalb mit einer genauen Lektüre des Arbeitsauftrags."
      },
      {
        "h": "Durchgearbeitetes Beispiel",
        "text": "Zum selben Plakat sind drei Antworten möglich: Beschreibung: „Der Titel steht oben links.“ Analyse: „Seine Größe eröffnet die Leserichtung.“ Beurteilung: „Für die vorgesehene Betrachtung aus drei Metern ist diese Hierarchie sinnvoll; die Datumszeile bleibt jedoch zu klein.“"
      },
      {
        "h": "Vorgehen und Verknüpfung",
        "text": "Markiere Operator, Gegenstand und Begrenzung. Plane den Text nach diesen Anforderungen. Wenn zwei Operatoren vorkommen, brauchen beide sichtbaren Raum. Ein reines Geschmacksurteil ersetzt weder Analyse noch begründete Beurteilung."
      },
      {
        "h": "Typischer Denkfehler",
        "text": "„Analysiere“ heißt nicht, möglichst viele Fachbegriffe aufzuzählen. Jeder Begriff muss mit einer konkreten Beobachtung und deren Funktion verbunden sein."
      }
    ]
  },
  {
    "subject": "de",
    "id": "kb-sinnabschnitte",
    "title": "Sinnabschnitte und Textaufbau",
    "group": "Lesen und Analyse",
    "summary": "Ein Sinnabschnitt bündelt einen gedanklichen Schritt.",
    "level": "B1 → FHR",
    "source": "bwlanguages",
    "expanded": true,
    "practice": "de-analyse",
    "sections": [
      {
        "h": "Begriff und Zusammenhang",
        "text": "Ein Sinnabschnitt bündelt einen gedanklichen Schritt. Er stimmt häufig mit einem Absatz überein, muss es aber nicht. Wer Textaufbau untersucht, fragt nach der Funktion: Wird ein Problem eröffnet, eine These begründet, ein Einwand bearbeitet oder ein Schluss gezogen?"
      },
      {
        "h": "Durchgearbeitetes Beispiel",
        "text": "Ein Kommentar beginnt mit einem Schulalltagsproblem, stellt danach einen Vorschlag vor und endet mit einer Einschränkung. Die passende Gliederung lautet nicht bloß „Anfang, Mitte, Ende“, sondern „Problemaufriss, Lösungsvorschlag, Begrenzung des Vorschlags“."
      },
      {
        "h": "Vorgehen und Verknüpfung",
        "text": "Lies zuerst den ganzen Text. Notiere anschließend neben jedem Abschnitt einen knappen Funktionsbegriff. Prüfe Übergänge: Wörter wie allerdings, deshalb und zugleich zeigen Beziehungen. Die Gliederung hilft sowohl bei einer Zusammenfassung als auch bei einer Analyse des Argumentationsgangs."
      },
      {
        "h": "Typischer Denkfehler",
        "text": "Eine Überschrift wie „Absatz zwei“ bezeichnet nur eine Position. Sie erklärt nicht, welche Leistung dieser Absatz für den Gesamttext erbringt."
      }
    ]
  },
  {
    "subject": "de",
    "id": "kb-kernaussage",
    "title": "Thema, These und Kernaussage",
    "group": "Lesen und Analyse",
    "summary": "Das Thema bezeichnet den Gegenstand eines Textes.",
    "level": "B1 → FHR",
    "source": "bwlanguages",
    "expanded": true,
    "practice": "de-summary",
    "sections": [
      {
        "h": "Begriff und Zusammenhang",
        "text": "Das Thema bezeichnet den Gegenstand eines Textes. Eine These behauptet etwas über diesen Gegenstand und kann begründet oder bestritten werden. Die Kernaussage verdichtet die zentrale Mitteilung des gesamten Textes. Nicht jeder informierende Text besitzt eine argumentative These."
      },
      {
        "h": "Durchgearbeitetes Beispiel",
        "text": "„Digitale Ausstellungen“ ist ein Thema. „Digitale Ausstellungen sollten physische Veranstaltungen ergänzen“ ist eine These. Die Kernaussage eines differenzierten Textes könnte lauten: Eine Kombination erweitert Zugänge, benötigt aber zusätzliche organisatorische Arbeit."
      },
      {
        "h": "Vorgehen und Verknüpfung",
        "text": "Formuliere das Thema als knappe Wortgruppe und die These als vollständigen Satz. Prüfe, ob die übrigen Abschnitte diese Aussage tatsächlich stützen. Behalte eine wesentliche Einschränkung bei, wenn sie für das Urteil des Textes wichtig ist."
      },
      {
        "h": "Typischer Denkfehler",
        "text": "Die auffälligste oder emotionalste Formulierung muss nicht die Kernaussage sein. Sie kann lediglich als Einstieg dienen."
      }
    ]
  },
  {
    "subject": "de",
    "id": "kb-belege",
    "title": "Textbelege in eigene Sätze einbauen",
    "group": "Lesen und Analyse",
    "summary": "Ein Beleg macht eine Deutung überprüfbar.",
    "level": "B1 → FHR",
    "source": "bwlanguages",
    "expanded": true,
    "practice": "de-analyse",
    "sections": [
      {
        "h": "Begriff und Zusammenhang",
        "text": "Ein Beleg macht eine Deutung überprüfbar. Er besteht aus einer passenden Textstelle und ihrer eindeutigen Zuordnung. Ein kurzes Zitat kann sprachliche Details sichtbar machen; eine Paraphrase kann einen längeren Gedankenschritt zusammenfassen. Beides braucht eine Erklärung seiner Funktion."
      },
      {
        "h": "Durchgearbeitetes Beispiel",
        "text": "„Der wiederholte Ausdruck ‚noch ein‘ lässt die Produktion austauschbarer Dinge routiniert erscheinen.“ Hier sind Beobachtung, kurzer Beleg und Deutung verbunden. Ein anschließender Satz kann erklären, wie der Text diese Routine durch einen Vorschlag unterbricht."
      },
      {
        "h": "Vorgehen und Verknüpfung",
        "text": "Wähle nur den Teil, der deine Aussage tatsächlich stützt. Integriere ihn grammatisch und verwende die in der Schule verlangte Zeilen- oder Seitenangabe. Beim Paraphrasieren bleiben Bedeutung und Einschränkungen erhalten, obwohl du eigene Wörter nutzt."
      },
      {
        "h": "Typischer Denkfehler",
        "text": "Ein Zitat ohne Erklärung spricht nicht automatisch für sich. Ebenso darf eine ausgelassene Einschränkung die ursprüngliche Aussage nicht in ihr Gegenteil verkehren."
      }
    ]
  },
  {
    "subject": "de",
    "id": "kb-rhetorische-mittel",
    "title": "Sprachliche Mittel und ihre Funktion",
    "group": "Lesen und Analyse",
    "summary": "Rhetorische Mittel sind keine festen Wirkungsschalter.",
    "level": "B1 → FHR",
    "source": "bwlanguages",
    "expanded": true,
    "practice": "de-analyse",
    "sections": [
      {
        "h": "Begriff und Zusammenhang",
        "text": "Rhetorische Mittel sind keine festen Wirkungsschalter. Eine Wiederholung kann Nachdruck erzeugen, Monotonie zeigen oder etwas ironisch vorführen. Ihre Funktion ergibt sich aus Wortlaut, Position und Zusammenhang. Eine Analyse muss deshalb über die Benennung des Mittels hinausgehen."
      },
      {
        "h": "Durchgearbeitetes Beispiel",
        "text": "In „Weniger Dinge. Weniger Abfall. Mehr Ideen.“ verbinden Wiederholung und Kontrast eine Reduktion materieller Produkte mit einem positiven Gewinn. Die knappen Sätze können als einprägsamer Appell wirken; ob sie tatsächlich überzeugen, ist damit nicht bewiesen."
      },
      {
        "h": "Vorgehen und Verknüpfung",
        "text": "Beschreibe zuerst die sprachliche Form, zitiere kurz und verbinde sie mit Argumentation oder Adressaten. Formuliere Wirkungen als begründete Möglichkeiten. Prüfe außerdem, ob dieselbe Stelle eine zweite plausible Lesart zulässt."
      },
      {
        "h": "Typischer Denkfehler",
        "text": "„Die Metapher macht den Text interessanter“ ist zu allgemein. Benenne, welche Vorstellung die konkrete Metapher eröffnet und wofür diese Vorstellung im Text genutzt wird."
      }
    ]
  },
  {
    "subject": "de",
    "id": "kb-zusammenfassung-basis",
    "title": "Basissatz und neutrale Wiedergabe",
    "group": "Schreiben und Überarbeiten",
    "summary": "Eine Zusammenfassung beginnt häufig mit einer Einordnung von Textart, Titel, Autor und Thema, soweit diese Angaben bekannt sind.",
    "level": "B1 → FHR",
    "source": "bwlanguages",
    "expanded": true,
    "practice": "de-summary",
    "sections": [
      {
        "h": "Begriff und Zusammenhang",
        "text": "Eine Zusammenfassung beginnt häufig mit einer Einordnung von Textart, Titel, Autor und Thema, soweit diese Angaben bekannt sind. Danach folgen die wesentlichen Aussagen in sachlicher Reihenfolge. Fehlende bibliografische Angaben werden nicht erfunden. Die eigene Meinung bleibt außerhalb der Zusammenfassung."
      },
      {
        "h": "Durchgearbeitetes Beispiel",
        "text": "Zu einem anonymen Werkstattbericht passt: „Der vorliegende Werkstattbericht beschreibt die Überarbeitung eines Orientierungssystems.“ Ein Satz wie „Der großartige Autor zeigt endlich die Wahrheit“ fügt Wertungen und nicht belegte Angaben hinzu."
      },
      {
        "h": "Vorgehen und Verknüpfung",
        "text": "Notiere vor dem Schreiben Problem, Handlung beziehungsweise Argument, Ergebnis und Einschränkung. Formuliere einen passenden Einleitungssatz und verdichte danach in eigenen Worten. Halte das Präsens als Grundzeit ein, soweit die schulischen Vorgaben nichts anderes verlangen."
      },
      {
        "h": "Typischer Denkfehler",
        "text": "Kürzen bedeutet nicht, jedes Detail proportional zu verkleinern. Ein wichtiges methodisches Problem kann mehr Platz verdienen als mehrere anschauliche Nebenszenen."
      }
    ]
  },
  {
    "subject": "de",
    "id": "kb-indirekte-rede",
    "title": "Indirekte Rede und Distanz",
    "group": "Schreiben und Überarbeiten",
    "summary": "Indirekte Rede zeigt, dass eine Aussage einer anderen Person wiedergegeben wird.",
    "level": "B1 → FHR",
    "source": "bwlanguages",
    "expanded": true,
    "practice": "de-summary",
    "sections": [
      {
        "h": "Begriff und Zusammenhang",
        "text": "Indirekte Rede zeigt, dass eine Aussage einer anderen Person wiedergegeben wird. Der Konjunktiv I kann diese Zuordnung markieren, ohne Zustimmung oder Ablehnung auszudrücken. Ein eindeutiges Redeverb hilft zusätzlich. Die genaue Form hängt vom Satzbau und von der Erkennbarkeit des Konjunktivs ab."
      },
      {
        "h": "Durchgearbeitetes Beispiel",
        "text": "Direkt: „Der Entwurf ist fertig.“ Indirekt: „Die Gestalterin erklärt, der Entwurf sei fertig.“ Die zweite Fassung kennzeichnet die Aussage als ihre Mitteilung. „Die Gestalterin behauptet“ fügt dagegen eine andere Haltung des wiedergebenden Textes hinzu."
      },
      {
        "h": "Vorgehen und Verknüpfung",
        "text": "Bestimme zuerst Sprecher und Inhalt. Wähle ein neutrales Redeverb, wenn du sachlich zusammenfasst. Prüfe danach Pronomen, Zeitbezug und Verbform. Bei einer nicht unterscheidbaren Form kann eine Ersatzform nötig sein; richte dich dabei nach den Unterrichtskonventionen."
      },
      {
        "h": "Typischer Denkfehler",
        "text": "Konjunktiv I bedeutet nicht automatisch, dass die Aussage falsch ist. Er schafft eine erkennbare Grenze zwischen fremder Aussage und eigener Darstellung."
      }
    ]
  },
  {
    "subject": "de",
    "id": "kb-argumentgewicht",
    "title": "Argumente gewichten statt zählen",
    "group": "Argumentation",
    "summary": "Eine begründete Entscheidung entsteht nicht durch das Zählen von Pro- und Contra-Punkten.",
    "level": "B1 → FHR",
    "source": "bwlanguages",
    "expanded": true,
    "practice": "de-eroerterung",
    "sections": [
      {
        "h": "Begriff und Zusammenhang",
        "text": "Eine begründete Entscheidung entsteht nicht durch das Zählen von Pro- und Contra-Punkten. Argumente unterscheiden sich in Relevanz, Tragweite und Belegbarkeit. Ein offengelegtes Kriterium zeigt, warum ein Gesichtspunkt mehr Gewicht erhält als ein anderer."
      },
      {
        "h": "Durchgearbeitetes Beispiel",
        "text": "Für einen Ausstellungsraum sprechen ein schönes Licht und günstige Miete. Dagegen spricht ein nicht zugänglicher Eingang für einen Teil der Zielgruppe. Wenn gleichberechtigter Zugang das entscheidende Kriterium ist, kann dieser Einwand trotz der zwei Vorteile schwerer wiegen."
      },
      {
        "h": "Vorgehen und Verknüpfung",
        "text": "Benenne zunächst die Entscheidungsfrage und die betroffenen Gruppen. Ordne Argumente nach Kriterien und prüfe ihre Belege. Erkläre im Urteil, welche Kriterien du vorrangig behandelst und warum. So bleibt dein Schluss nachvollziehbar, auch wenn jemand anders gewichten würde."
      },
      {
        "h": "Typischer Denkfehler",
        "text": "Drei schwache Beispiele ersetzen keinen tragfähigen Grund. Ein Beispiel illustriert einen Zusammenhang, beweist aber nicht automatisch seine allgemeine Gültigkeit."
      }
    ]
  },
  {
    "subject": "de",
    "id": "kb-gegenargument",
    "title": "Gegenargument und begründete Entkräftung",
    "group": "Argumentation",
    "summary": "Ein Gegenargument muss die eigene Position tatsächlich herausfordern.",
    "level": "B1 → FHR",
    "source": "bwlanguages",
    "expanded": true,
    "practice": "de-eroerterung",
    "sections": [
      {
        "h": "Begriff und Zusammenhang",
        "text": "Ein Gegenargument muss die eigene Position tatsächlich herausfordern. Eine Entkräftung kann eine Voraussetzung bestreiten, die Reichweite begrenzen oder zeigen, dass ein anderer Gesichtspunkt überwiegt. Manchmal führt der Einwand zu einer verbesserten statt unveränderten eigenen Position."
      },
      {
        "h": "Durchgearbeitetes Beispiel",
        "text": "Position: „Wir veröffentlichen alle Entwürfe online.“ Einwand: „Unfertige Arbeiten können missverstanden werden.“ Eine differenzierte Antwort lautet: „Deshalb veröffentlichen wir ausgewählte Zwischenstände mit Prozesskommentaren und Zustimmung der Beteiligten.“ Das Problem wird bearbeitet statt geleugnet."
      },
      {
        "h": "Vorgehen und Verknüpfung",
        "text": "Formuliere den Einwand so, dass seine Vertreter ihn wiedererkennen würden. Prüfe dann, welcher Teil berechtigt ist. Begründe deine Antwort und passe den Vorschlag an, wenn nötig. Ein guter Schluss kann Bedingungen enthalten."
      },
      {
        "h": "Typischer Denkfehler",
        "text": "Ein absichtlich lächerlicher Gegenstandpunkt ist ein Strohmann. Ihn leicht zu widerlegen zeigt nicht, dass die wirkliche Gegenposition schwach ist."
      }
    ]
  },
  {
    "subject": "de",
    "id": "kb-materialauswertung",
    "title": "Materialgestütztes Schreiben vorbereiten",
    "group": "Argumentation",
    "summary": "Beim materialgestützten Schreiben werden Informationen für eine eigene Schreibaufgabe ausgewählt und verbunden.",
    "level": "B1 → FHR",
    "source": "bwlanguages",
    "expanded": true,
    "practice": "de-kommentar",
    "sections": [
      {
        "h": "Begriff und Zusammenhang",
        "text": "Beim materialgestützten Schreiben werden Informationen für eine eigene Schreibaufgabe ausgewählt und verbunden. Die Materialien sind kein fertiger Aufsatzplan. Entscheidend sind Adressat, Zweck und Streitfrage; Quellen können sich ergänzen oder widersprechen."
      },
      {
        "h": "Durchgearbeitetes Beispiel",
        "text": "Material A enthält Besucherzahlen, Material B eine einzelne Besucherstimme. Die Zahlen beschreiben eine Verteilung; die Stimme zeigt eine Erfahrung. Ein Kommentar kann beides nutzen, darf aus der einzelnen Stimme aber keine Aussage über alle Besucher ableiten."
      },
      {
        "h": "Vorgehen und Verknüpfung",
        "text": "Erstelle eine Tabelle mit Kernaussage, Quelle, Belegart, Grenze und möglicher Funktion im eigenen Text. Gruppiere anschließend nach Argumenten statt nach Materialnummern. Kennzeichne fremde Informationen nach den schulischen Vorgaben und mache deinen eigenen Schluss sichtbar."
      },
      {
        "h": "Typischer Denkfehler",
        "text": "Die Materialien nacheinander zusammenzufassen erfüllt noch nicht die Aufgabe einer eigenständigen Argumentation. Es fehlt die Verbindung zur konkreten Schreibabsicht."
      }
    ]
  },
  {
    "subject": "de",
    "id": "kb-absatzlogik",
    "title": "Absätze mit einem klaren Gedankenkern",
    "group": "Schreiben und Überarbeiten",
    "summary": "Ein Absatz entwickelt einen zusammenhängenden Gedanken.",
    "level": "B1 → FHR",
    "source": "bwlanguages",
    "expanded": true,
    "practice": "de-stellungnahme",
    "sections": [
      {
        "h": "Begriff und Zusammenhang",
        "text": "Ein Absatz entwickelt einen zusammenhängenden Gedanken. Ein Orientierungssatz eröffnet ihn, weitere Sätze begründen, erläutern oder belegen ihn. Der Übergang zum nächsten Absatz zeigt eine Beziehung. Nicht jeder Absatz muss dieselbe starre Satzanzahl besitzen."
      },
      {
        "h": "Durchgearbeitetes Beispiel",
        "text": "„Zwischenbesprechungen können Produktionsfehler verringern. Unklare Dateivorgaben fallen dadurch vor der Ausgabe auf. In unserem Beispiel wurde eine fehlende Bildverknüpfung beim gemeinsamen Prüfen entdeckt.“ Alle Sätze dienen demselben Gedanken; ein Satz über die Raumtemperatur würde ihn unterbrechen."
      },
      {
        "h": "Vorgehen und Verknüpfung",
        "text": "Fasse den Gedankenkern jedes Absatzes am Rand in wenigen Wörtern zusammen. Wenn zwei verschiedene Kerne auftauchen, teile oder ordne um. Prüfe, ob der letzte Satz eine Folgerung oder einen sinnvollen Übergang bietet."
      },
      {
        "h": "Typischer Denkfehler",
        "text": "Ein Verknüpfungswort repariert keinen logischen Sprung. „Deshalb“ verlangt einen nachvollziehbaren Grund im vorausgehenden Text."
      }
    ]
  },
  {
    "subject": "de",
    "id": "kb-kohesion",
    "title": "Bezüge, Pronomen und Verknüpfungen",
    "group": "Schreiben und Überarbeiten",
    "summary": "Kohäsion bezeichnet sprachliche Verbindungen innerhalb eines Textes: Pronomen, Wiederaufnahmen, Konnektoren und ähnliche Mittel.",
    "level": "B1 → FHR",
    "source": "bwlanguages",
    "expanded": true,
    "practice": "de-revision",
    "sections": [
      {
        "h": "Begriff und Zusammenhang",
        "text": "Kohäsion bezeichnet sprachliche Verbindungen innerhalb eines Textes: Pronomen, Wiederaufnahmen, Konnektoren und ähnliche Mittel. Sie helfen beim Verfolgen der Gedanken. Verständliche Bezüge sind wichtiger als möglichst viele wechselnde Bezeichnungen für denselben Gegenstand."
      },
      {
        "h": "Durchgearbeitetes Beispiel",
        "text": "„Die Klasse zeigte der Jury ihre Entwürfe. Sie waren noch unvollständig.“ Das Pronomen „sie“ bezieht sich plausibel auf die Entwürfe. In „Die Klasse sprach mit der Jury. Sie war unsicher“ bleibt dagegen offen, wer unsicher war."
      },
      {
        "h": "Vorgehen und Verknüpfung",
        "text": "Prüfe jedes Pronomen auf ein eindeutiges Bezugswort. Wiederhole ein Nomen, wenn eine elegante Umschreibung unklar wird. Nutze Konnektoren nach ihrer Bedeutung: trotzdem markiert einen Gegensatz zur Erwartung, daher eine Folgerung."
      },
      {
        "h": "Typischer Denkfehler",
        "text": "Ständig wechselnde Synonyme können fachliche Unterschiede vortäuschen. Ein Entwurf, eine Datei und ein Druck sind nicht immer derselbe Gegenstand."
      }
    ]
  },
  {
    "subject": "de",
    "id": "kb-erzaehlperspektive",
    "title": "Erzähler, Perspektive und Wissensgrenzen",
    "group": "Literatur",
    "summary": "Die erzählende Stimme ist eine Instanz im Text und nicht automatisch die reale Autorin.",
    "level": "B1 → FHR",
    "source": "bwlanguages",
    "expanded": true,
    "practice": "de-interpretation",
    "sections": [
      {
        "h": "Begriff und Zusammenhang",
        "text": "Die erzählende Stimme ist eine Instanz im Text und nicht automatisch die reale Autorin. Die Perspektive bestimmt, wessen Wahrnehmung oder Wissen zugänglich wird. Eine personale Nähe kann die Sicht auf eine Figur beschränken, ohne deren Gedanken ausdrücklich in der Ich-Form wiederzugeben."
      },
      {
        "h": "Durchgearbeitetes Beispiel",
        "text": "„Mira betrachtete die verschlossene Tür. Dahinter musste die Jury warten.“ Der zweite Satz kann Miras Vermutung wiedergeben; er beweist nicht, was hinter der Tür tatsächlich geschieht. Eine Analyse berücksichtigt diese Wissensgrenze."
      },
      {
        "h": "Vorgehen und Verknüpfung",
        "text": "Untersuche, welche Innenansichten der Text erlaubt und was nur von außen beschrieben wird. Suche Stellen, an denen Vermutung, Beobachtung und sicheres Wissen auseinanderfallen. Erkläre anschließend, wie diese Auswahl Spannung oder Nähe erzeugt."
      },
      {
        "h": "Typischer Denkfehler",
        "text": "Ein Ich-Erzähler ist nicht automatisch zuverlässig. Ebenso ist ein Text in der dritten Person nicht automatisch allwissend. Die konkrete Informationsverteilung entscheidet."
      }
    ]
  },
  {
    "subject": "de",
    "id": "kb-deutungshypothese",
    "title": "Deutungshypothese prüfen und begrenzen",
    "group": "Literatur",
    "summary": "Eine Deutungshypothese ist eine vorläufige Erklärung für einen literarischen Zusammenhang.",
    "level": "B1 → FHR",
    "source": "bwlanguages",
    "expanded": true,
    "practice": "de-interpretation",
    "sections": [
      {
        "h": "Begriff und Zusammenhang",
        "text": "Eine Deutungshypothese ist eine vorläufige Erklärung für einen literarischen Zusammenhang. Sie wird am Text geprüft und bei widersprechenden Beobachtungen verändert. Eine Interpretation gewinnt an Qualität, wenn sie Ambivalenzen erklärt, statt jedes Detail in ein festes Symbolschema zu pressen."
      },
      {
        "h": "Durchgearbeitetes Beispiel",
        "text": "Ein leeres Blatt kann in einer Kurzgeschichte als Möglichkeit eines Neuanfangs gedeutet werden. Wenn die Figur es wiederholt versteckt, kann es zugleich Unsicherheit markieren. Die Verbindung beider Beobachtungen ist stärker als die Behauptung „Weiß bedeutet immer Hoffnung“."
      },
      {
        "h": "Vorgehen und Verknüpfung",
        "text": "Formuliere eine überprüfbare Hypothese und sammle mindestens zwei passende sowie eine möglicherweise widersprechende Stelle. Erkläre, wie Handlung, Perspektive und Sprache zusammenspielen. Das Schlussurteil darf offen benennen, welche Frage der Text nicht eindeutig entscheidet."
      },
      {
        "h": "Typischer Denkfehler",
        "text": "Eine biografische Vermutung über die Autorin ersetzt keinen Textbeleg. Zusätzlicher Kontext muss verlässlich belegt und für die konkrete Deutung relevant sein."
      }
    ]
  },
  {
    "subject": "de",
    "id": "kb-beruflicher-ton",
    "title": "Beruflicher Ton bei Konflikten",
    "group": "Berufliche Kommunikation",
    "summary": "Professionelle Kommunikation benennt ein Problem klar und erhält zugleich die Möglichkeit zur Zusammenarbeit.",
    "level": "B1 → FHR",
    "source": "bwlanguages",
    "expanded": true,
    "practice": "de-bewerbung",
    "sections": [
      {
        "h": "Begriff und Zusammenhang",
        "text": "Professionelle Kommunikation benennt ein Problem klar und erhält zugleich die Möglichkeit zur Zusammenarbeit. Dazu werden beobachtbare Situation, Auswirkung, benötigte Handlung und Zeitpunkt getrennt. Höflichkeit bedeutet nicht, wichtige Bedingungen undeutlich zu lassen."
      },
      {
        "h": "Durchgearbeitetes Beispiel",
        "text": "Statt „Sie haben wieder alles zu spät geschickt“ ist präziser: „Die freigegebenen Texte liegen noch nicht vor. Für die Ausgabe am Freitag benötigen wir sie bis Mittwoch, 12 Uhr. Andernfalls können wir zunächst die bereits bestätigten Seiten liefern.“"
      },
      {
        "h": "Vorgehen und Verknüpfung",
        "text": "Notiere vor der Nachricht, was bekannt ist und was du erreichen willst. Nenne Abhängigkeiten und realistische Optionen. Prüfe anschließend, ob die andere Person weiß, welche Antwort oder Handlung erwartet wird."
      },
      {
        "h": "Typischer Denkfehler",
        "text": "Ein freundlicher Ton macht ein unmögliches Versprechen nicht professionell. Fristen und Leistungsumfang müssen zusammenpassen und gegebenenfalls neu vereinbart werden."
      }
    ]
  },
  {
    "subject": "de",
    "id": "kb-reflexion",
    "title": "Reflexion mit Konsequenzen",
    "group": "Berufliche Kommunikation",
    "summary": "Eine Reflexion erklärt, was aus einem Arbeitsprozess gelernt wurde und wie daraus eine zukünftige Entscheidung entsteht.",
    "level": "B1 → FHR",
    "source": "bwlanguages",
    "expanded": true,
    "practice": "de-bericht",
    "sections": [
      {
        "h": "Begriff und Zusammenhang",
        "text": "Eine Reflexion erklärt, was aus einem Arbeitsprozess gelernt wurde und wie daraus eine zukünftige Entscheidung entsteht. Sie unterscheidet Absicht, beobachtetes Ergebnis und Interpretation. Selbstkritik wird nützlich, wenn sie an konkreten Stellen ansetzt."
      },
      {
        "h": "Durchgearbeitetes Beispiel",
        "text": "„Das Plakat war nicht gut“ bleibt vage. „Im Test wurde die Uhrzeit zuletzt gefunden. Ich habe sie deshalb mit dem Datum gruppiert. Beim nächsten Entwurf prüfe ich die Informationssuche vor der Farbentscheidung“ beschreibt Beobachtung, Änderung und Konsequenz."
      },
      {
        "h": "Vorgehen und Verknüpfung",
        "text": "Wähle eine bedeutsame Entscheidung statt den gesamten Prozess chronologisch nachzuerzählen. Vergleiche Erwartung und Ergebnis, benenne die Grenzen deiner Prüfung und formuliere einen überprüfbaren nächsten Schritt. Ein gelungenes Ergebnis kann ebenfalls kritisch reflektiert werden."
      },
      {
        "h": "Typischer Denkfehler",
        "text": "Eine Liste eigener Schwächen ohne konkrete Handlung verbessert die nächste Arbeit kaum. Ebenso beweist eine einmalige positive Rückmeldung keine allgemeine Wirksamkeit."
      }
    ]
  },
  {
    "subject": "en",
    "id": "kb-task-verbs",
    "title": "Describe, explain, analyse and evaluate",
    "group": "Reading and analysis",
    "summary": "Task verbs tell you what kind of thinking your response needs.",
    "level": "B1 → FHR",
    "source": "oxgrammar",
    "expanded": true,
    "practice": "en-analysis",
    "sections": [
      {
        "h": "Concept and purpose",
        "text": "Task verbs tell you what kind of thinking your response needs. Describe gives an organised account of features. Explain connects a feature to a reason. Analyse examines relationships between parts. Evaluate reaches a judgement using clear criteria. A demanding task can still be answered in clear, familiar English."
      },
      {
        "h": "Worked example",
        "text": "Description: “The title is at the top.” Analysis: “Its size makes it the first element readers are likely to notice.” Evaluation: “This hierarchy supports quick orientation, although the small date may be difficult to read from a distance.”"
      },
      {
        "h": "Method and connections",
        "text": "Underline the task verb, the object and any limitation. Plan the response around these requirements. If the question asks you to compare and recommend, a list of differences alone is incomplete; you also need a justified choice."
      },
      {
        "h": "Common mistake",
        "text": "Using technical words does not automatically create analysis. Explain what each identified feature contributes to the message or experience."
      }
    ]
  },
  {
    "subject": "en",
    "id": "kb-main-idea",
    "title": "Main idea, supporting detail and limitation",
    "group": "Reading and analysis",
    "summary": "The main idea brings the important parts of a text together.",
    "level": "B1 → FHR",
    "source": "oxgrammar",
    "expanded": true,
    "practice": "en-summary",
    "sections": [
      {
        "h": "Concept and purpose",
        "text": "The main idea brings the important parts of a text together. Supporting details explain or illustrate it. A limitation defines how far the claim reaches. Keeping that limitation can matter more than retaining an interesting but secondary example."
      },
      {
        "h": "Worked example",
        "text": "A report says six stands were repaired but no full cost comparison was completed. “The workshop explored repair, with promising practical results but uncertain savings” preserves the central relationship. “Repair always saves money” removes the limitation and changes the meaning."
      },
      {
        "h": "Method and connections",
        "text": "After reading the whole text, label the problem, response, result and qualification. Try summarising their connection in one sentence. Check that your sentence does not make the original claim stronger or more certain than it was."
      },
      {
        "h": "Common mistake",
        "text": "The sentence with the most familiar vocabulary is not necessarily the main idea. Position and repeated words are clues, not proof."
      }
    ]
  },
  {
    "subject": "en",
    "id": "kb-inference",
    "title": "Inference and evidence",
    "group": "Reading and analysis",
    "summary": "An inference is a conclusion drawn from clues rather than directly stated information.",
    "level": "B1 → FHR",
    "source": "oxgrammar",
    "expanded": true,
    "practice": "en-analysis",
    "sections": [
      {
        "h": "Concept and purpose",
        "text": "An inference is a conclusion drawn from clues rather than directly stated information. It should be supported by the text and remain proportionate to the evidence. Separate what the writer says, what you infer and what remains unknown."
      },
      {
        "h": "Worked example",
        "text": "“The designer checked the clock for the third time and closed the unfinished file.” This may suggest time pressure or frustration. It does not establish that the designer is always disorganised or that the client caused the delay."
      },
      {
        "h": "Method and connections",
        "text": "Name the clue and explain how it supports your interpretation. Consider at least one alternative reading. Phrases such as may suggest or seems to indicate are useful when the evidence allows more than one explanation."
      },
      {
        "h": "Common mistake",
        "text": "A plausible story is not automatically a valid inference. Avoid adding motives, events or personal histories that the passage does not support."
      }
    ]
  },
  {
    "subject": "en",
    "id": "kb-quotation",
    "title": "Using short quotations in analysis",
    "group": "Reading and analysis",
    "summary": "A quotation provides precise evidence for an observation.",
    "level": "B1 → FHR",
    "source": "oxgrammar",
    "expanded": true,
    "practice": "en-analysis",
    "sections": [
      {
        "h": "Concept and purpose",
        "text": "A quotation provides precise evidence for an observation. It should be short enough for the reader to see why it matters and connected to your own explanation. Longer extracts can hide the relevant feature instead of making an analysis stronger."
      },
      {
        "h": "Worked example",
        "text": "“The repeated word ‘another’ presents the objects as routine and replaceable.” This sentence links evidence to an interpretation. A following sentence can explain how the later invitation to take home an idea challenges that routine."
      },
      {
        "h": "Method and connections",
        "text": "Introduce the feature, quote the essential wording and discuss its function. Keep the quotation grammatically connected to your sentence. When your school requires line references, include them consistently and check the original wording carefully."
      },
      {
        "h": "Common mistake",
        "text": "A quotation does not prove any interpretation you attach to it. The explanation must show the actual connection between the chosen words and your claim."
      }
    ]
  },
  {
    "subject": "en",
    "id": "kb-summary-own-words",
    "title": "Paraphrasing without changing meaning",
    "group": "Writing",
    "summary": "Paraphrasing restates an idea in new wording and structure.",
    "level": "B1 → FHR",
    "source": "oxgrammar",
    "expanded": true,
    "practice": "en-summary",
    "sections": [
      {
        "h": "Concept and purpose",
        "text": "Paraphrasing restates an idea in new wording and structure. It preserves relationships, conditions and degree of certainty. Replacing individual words with dictionary synonyms often produces unnatural language and can change the original meaning."
      },
      {
        "h": "Worked example",
        "text": "Original: “Visitors must book the quiet slot in advance.” Paraphrase: “People who want a quiet visit need to arrange it before they arrive.” “Visitors can arrive whenever they prefer” is not a paraphrase because it removes the requirement."
      },
      {
        "h": "Method and connections",
        "text": "Read the sentence, briefly look away and explain the idea in simple language. Compare your version with the original for meaning. Check words expressing conditions, quantity and uncertainty especially carefully. Attribute borrowed ideas when the task calls for sources."
      },
      {
        "h": "Common mistake",
        "text": "A more complicated synonym is not necessarily more accurate. Plain words are often better when you can use them in a clear, natural sentence."
      }
    ]
  },
  {
    "subject": "en",
    "id": "kb-paragraph-development",
    "title": "Developing a paragraph with reasoning",
    "group": "Writing",
    "summary": "A paragraph should develop one useful point rather than collect unrelated sentences.",
    "level": "B1 → FHR",
    "source": "oxgrammar",
    "expanded": true,
    "practice": "en-comment",
    "sections": [
      {
        "h": "Concept and purpose",
        "text": "A paragraph should develop one useful point rather than collect unrelated sentences. A claim introduces the point; reasons and examples explain it. A final link can connect the point to the overall question. This is a planning aid, not a rule that every paragraph must contain exactly four sentences."
      },
      {
        "h": "Worked example",
        "text": "“A paper prototype can reveal folding problems. Screen previews do not show how information disappears inside a fold. In our leaflet test, the contact details became hidden. Testing the fold before printing therefore reduced the risk of an unusable layout.”"
      },
      {
        "h": "Method and connections",
        "text": "Write a short label beside each paragraph. If its sentences require two unrelated labels, reorganise them. Check that your example illustrates your stated reason and that the conclusion does not claim more than the example supports."
      },
      {
        "h": "Common mistake",
        "text": "A paragraph is not strong simply because it is long. Repeating the same claim in different words adds length without developing the argument."
      }
    ]
  },
  {
    "subject": "en",
    "id": "kb-counterargument",
    "title": "Responding to a serious objection",
    "group": "Argument and comparison",
    "summary": "A counterargument is a reasonable challenge to your position.",
    "level": "B1 → FHR",
    "source": "oxgrammar",
    "expanded": true,
    "practice": "en-argument",
    "sections": [
      {
        "h": "Concept and purpose",
        "text": "A counterargument is a reasonable challenge to your position. You can respond by questioning its evidence, limiting its scope or adjusting your proposal. A useful response shows that you understand the objection instead of pretending it is foolish."
      },
      {
        "h": "Worked example",
        "text": "Position: “Put the exhibition online.” Objection: “Some visitors find the website difficult to navigate.” Response: “We should test a simple navigation route and keep a printed guide available.” The revised proposal acknowledges the access problem."
      },
      {
        "h": "Method and connections",
        "text": "Choose the objection that creates the greatest difficulty for your argument. State it fairly, explain what you accept and then justify your response. Words such as although and however help show the relationship, but they do not replace reasoning."
      },
      {
        "h": "Common mistake",
        "text": "“Some people disagree, but they are wrong” does not answer an objection. The reader needs the actual reason for disagreement and your considered response."
      }
    ]
  },
  {
    "subject": "en",
    "id": "kb-hedging",
    "title": "Writing with appropriate certainty",
    "group": "Argument and comparison",
    "summary": "Hedging matches the strength of a statement to the available evidence.",
    "level": "B1 → FHR",
    "source": "oxgrammar",
    "expanded": true,
    "practice": "en-argument",
    "sections": [
      {
        "h": "Concept and purpose",
        "text": "Hedging matches the strength of a statement to the available evidence. May, might, appears to and in this sample can prevent overgeneralisation. They are useful when evidence is limited, but unnecessary uncertainty can also weaken a well-established factual statement."
      },
      {
        "h": "Worked example",
        "text": "“Eight of ten visitors found the entrance” reports an observation. “The new sign may have helped” suggests a possible explanation. “The sign always improves access” is much stronger and cannot be established by that small test."
      },
      {
        "h": "Method and connections",
        "text": "Separate the measured result from the proposed cause. Identify the sample, conditions and missing comparison. Choose wording that preserves these limits while still stating what can reasonably be concluded."
      },
      {
        "h": "Common mistake",
        "text": "Adding perhaps to every sentence is not careful reasoning. Explain why uncertainty exists and use a direct statement where the information genuinely supports it."
      }
    ]
  },
  {
    "subject": "en",
    "id": "kb-comparison-criteria",
    "title": "Comparing options through shared criteria",
    "group": "Argument and comparison",
    "summary": "A comparison becomes useful when both options are examined through the same criteria.",
    "level": "B1 → FHR",
    "source": "oxgrammar",
    "expanded": true,
    "practice": "en-comparison",
    "sections": [
      {
        "h": "Concept and purpose",
        "text": "A comparison becomes useful when both options are examined through the same criteria. This allows the reader to see a trade-off. Describing one option completely and then the other can work, but the relationships must still be explicit."
      },
      {
        "h": "Worked example",
        "text": "For two exhibition notices, compare information, tone and audience. Notice A may attract attention but omit the time. Notice B may support arrival planning but sound less expressive. The better choice depends on the communication purpose."
      },
      {
        "h": "Method and connections",
        "text": "Create a small planning table before writing. Put criteria in rows and the options in columns. Use the strongest differences to structure paragraphs, then give a recommendation linked to the intended audience."
      },
      {
        "h": "Common mistake",
        "text": "Different criteria can produce a biased comparison. Praising A for visual excitement while criticising B only for missing practical facts does not compare like with like."
      }
    ]
  },
  {
    "subject": "en",
    "id": "kb-email-structure",
    "title": "Professional email structure",
    "group": "Professional communication",
    "summary": "A professional email should help the recipient understand the purpose and decide what to do next.",
    "level": "B1 → FHR",
    "source": "oxgrammar",
    "expanded": true,
    "practice": "en-formal",
    "sections": [
      {
        "h": "Concept and purpose",
        "text": "A professional email should help the recipient understand the purpose and decide what to do next. The opening states the request or issue. The middle gives relevant context and realistic options. The ending identifies the required response or next step."
      },
      {
        "h": "Worked example",
        "text": "“I am writing to confirm the revised programme. We can deliver the original two pages on Friday, or the expanded version on Tuesday after receiving the approved translation. Please confirm your preferred option by Thursday morning.”"
      },
      {
        "h": "Method and connections",
        "text": "Choose a specific subject line, remove unnecessary background and check names, dates and attachments. Use a polite direct request. The reader should not have to search through several paragraphs to discover the actual question."
      },
      {
        "h": "Common mistake",
        "text": "A formal tone does not require long sentences or unusual vocabulary. Clear conditions and responsibilities are more useful than decorative phrases."
      }
    ]
  },
  {
    "subject": "en",
    "id": "kb-conditionals",
    "title": "Real conditions and hypothetical alternatives",
    "group": "Grammar in context",
    "summary": "Conditionals connect a situation with its consequence.",
    "level": "B1 → FHR",
    "source": "oxgrammar",
    "expanded": true,
    "practice": "en-formal",
    "sections": [
      {
        "h": "Concept and purpose",
        "text": "Conditionals connect a situation with its consequence. For a realistic future condition, a common pattern is if plus present simple, followed by will plus verb. For an imagined or less likely situation, if plus past simple often combines with would plus verb."
      },
      {
        "h": "Worked example",
        "text": "“If the client approves today, we will print tomorrow” presents a realistic condition. “If we had a larger budget, we would print a catalogue” imagines a different current situation. The past form here marks distance from reality rather than past time."
      },
      {
        "h": "Method and connections",
        "text": "Decide whether you mean a realistic possibility or a hypothetical situation before selecting forms. Check the time relationship of both clauses. Explain your choice in terms of meaning rather than treating every if-sentence as the same pattern."
      },
      {
        "h": "Common mistake",
        "text": "Avoid automatically putting will after if in an ordinary future condition. “If we will receive the text” is not the usual form for this meaning."
      }
    ]
  },
  {
    "subject": "en",
    "id": "kb-passive",
    "title": "Passive voice in process descriptions",
    "group": "Grammar in context",
    "summary": "The passive puts attention on an action and the person or thing affected by it.",
    "level": "B1 → FHR",
    "source": "oxgrammar",
    "expanded": true,
    "practice": "en-article",
    "sections": [
      {
        "h": "Concept and purpose",
        "text": "The passive puts attention on an action and the person or thing affected by it. A common form is be plus past participle. The agent can be included with by when useful. Active and passive are choices about focus; neither is always better."
      },
      {
        "h": "Worked example",
        "text": "Active: “The technician checks the files.” Passive: “The files are checked before printing.” The second version focuses on the workflow. “The files were checked yesterday” moves the action into the past while preserving that focus."
      },
      {
        "h": "Method and connections",
        "text": "Identify the action, its tense and the object receiving it. Build the appropriate form of be and add the past participle. Use the passive where the agent is unknown, unimportant or already clear from context."
      },
      {
        "h": "Common mistake",
        "text": "Passive writing can hide responsibility. In a project report, name the person or team when accountability matters instead of always writing “It was decided”."
      }
    ]
  },
  {
    "subject": "en",
    "id": "kb-relative-clauses",
    "title": "Relative clauses that identify or add detail",
    "group": "Grammar in context",
    "summary": "A relative clause connects information to a noun.",
    "level": "B1 → FHR",
    "source": "oxgrammar",
    "expanded": true,
    "practice": "en-errors",
    "sections": [
      {
        "h": "Concept and purpose",
        "text": "A relative clause connects information to a noun. Defining clauses identify which person or thing is meant. Non-defining clauses add extra information and are separated by commas. The punctuation can therefore affect meaning, not just appearance."
      },
      {
        "h": "Worked example",
        "text": "“The posters that contain the old date must be replaced” identifies a subset. “The posters, which contain the old date, must be replaced” presents the old date as extra information about the posters being discussed. The second sentence suggests all of those posters need replacement."
      },
      {
        "h": "Method and connections",
        "text": "Find the noun and decide whether the extra clause is necessary to identify it. Choose a suitable relative word and check punctuation. Keep the clause close enough to its noun to prevent an unclear connection."
      },
      {
        "h": "Common mistake",
        "text": "Do not add a second subject pronoun inside a subject relative clause: “the designer who she made it” repeats the subject unnecessarily."
      }
    ]
  },
  {
    "subject": "en",
    "id": "kb-articles",
    "title": "A, an, the and general meaning",
    "group": "Grammar in context",
    "summary": "Articles help show whether a noun introduces something, refers to an identifiable item or describes a general category.",
    "level": "B1 → FHR",
    "source": "oxgrammar",
    "expanded": true,
    "practice": "en-errors",
    "sections": [
      {
        "h": "Concept and purpose",
        "text": "Articles help show whether a noun introduces something, refers to an identifiable item or describes a general category. A and an normally introduce one countable item. The points to an item the reader can identify. Plural and uncountable nouns often appear without an article in general statements."
      },
      {
        "h": "Worked example",
        "text": "“We designed a poster. The poster uses green type.” The first sentence introduces it; the second refers back. “Design requires practice” speaks generally. “The design on page two needs revision” identifies a particular result."
      },
      {
        "h": "Method and connections",
        "text": "Check whether the noun is countable, singular and identifiable in context. Use an according to sound, as in an hour, rather than just the first written letter. Read the whole paragraph because earlier information affects the choice."
      },
      {
        "h": "Common mistake",
        "text": "A singular countable noun usually needs an appropriate determiner. “We created poster” is incomplete in this ordinary meaning."
      }
    ]
  },
  {
    "subject": "en",
    "id": "kb-mediation-selection",
    "title": "Mediation: selecting for a reader",
    "group": "Professional communication",
    "summary": "Mediation makes information usable for another person.",
    "level": "B1 → FHR",
    "source": "oxgrammar",
    "expanded": true,
    "practice": "en-mediation",
    "sections": [
      {
        "h": "Concept and purpose",
        "text": "Mediation makes information usable for another person. It involves selecting, reorganising and explaining rather than copying every sentence. The reader’s situation determines which details matter. In this library the source and response stay in English, in keeping with the language separation used in Wunderatlas."
      },
      {
        "h": "Worked example",
        "text": "Technical note: “Prior booking required for participation; observation permitted without registration.” For a visitor who only wants to watch, a useful version is: “You can watch without booking, but you need to reserve a place if you want to join the activity.”"
      },
      {
        "h": "Method and connections",
        "text": "Identify the reader’s question first. Keep all conditions that affect their decision, explain specialist vocabulary and leave out unrelated detail. Afterwards compare your version with the source to ensure no requirement or restriction has disappeared."
      },
      {
        "h": "Common mistake",
        "text": "Shortening is not enough. A shorter sentence can still be confusing if it keeps unfamiliar terminology or assumes knowledge the reader does not have."
      }
    ]
  },
  {
    "subject": "en",
    "id": "kb-reflective-writing",
    "title": "Reflecting on a design decision",
    "group": "Professional communication",
    "summary": "Reflection explains what a specific experience changed in your understanding or next action.",
    "level": "B1 → FHR",
    "source": "oxgrammar",
    "expanded": true,
    "practice": "en-project",
    "sections": [
      {
        "h": "Concept and purpose",
        "text": "Reflection explains what a specific experience changed in your understanding or next action. It connects intention, observation, interpretation and revision. A useful reflection can discuss success as well as difficulty, without claiming that one test proves a universal rule."
      },
      {
        "h": "Worked example",
        "text": "“I expected the large illustration to guide readers. In the walkthrough, the date was overlooked. I moved the date closer to the title and will test information order before refining decoration next time.” This identifies a concrete learning consequence."
      },
      {
        "h": "Method and connections",
        "text": "Choose one meaningful decision and compare what you expected with what happened. Name the limits of your evidence. Finish with an action you could actually check in the next project, rather than a general promise to improve."
      },
      {
        "h": "Common mistake",
        "text": "“I learned a lot” gives the reader no way to understand the learning. Specify the decision, evidence and consequence."
      }
    ]
  },
  {
    "subject": "grafik",
    "id": "kb-schrift-anatomie",
    "title": "Typografie: Form, Rhythmus und Lesbarkeit",
    "group": "Typografie und Editorial",
    "summary": "Schriftwirkung entsteht aus mehr als Serifen oder deren Fehlen.",
    "level": "Grafikdesign · Vertiefung",
    "source": "designresearch",
    "expanded": true,
    "practice": "design-type",
    "sections": [
      {
        "h": "Begriff und Zusammenhang",
        "text": "Schriftwirkung entsteht aus mehr als Serifen oder deren Fehlen. x-Höhe, Buchstabenweite, Strichkontrast, Innenräume und Abstand beeinflussen den Rhythmus. Dieselbe nominelle Schriftgröße kann je nach Schrift sehr unterschiedlich groß wirken. Entscheidend ist deshalb die Prüfung im vorgesehenen Medium."
      },
      {
        "h": "Durchgearbeitetes Beispiel",
        "text": "Zwei Schriften werden mit 12 Punkt gesetzt. Die erste besitzt eine große x-Höhe und wirkt dichter, die zweite kleinere Kleinbuchstaben und mehr Oberlänge. Ein fairer Vergleich betrachtet daher zusätzlich Zeilenlänge, Laufweite und tatsächliche Lesesituation."
      },
      {
        "h": "Vorgehen und Verknüpfung",
        "text": "Setze denselben Absatz in zwei Schriften und halte zunächst Breite und Zeilenabstand konstant. Vergleiche kritische Zeichen wie I, l und 1 sowie dichte Buchstabenfolgen. Ändere danach nur eine Variable, um deren Wirkung beurteilen zu können."
      },
      {
        "h": "Typischer Denkfehler",
        "text": "Eine dekorative Schrift ist nicht grundsätzlich unlesbar. Problematisch wird eine Wahl, wenn ihre Besonderheiten dem Zweck, der Textmenge oder dem Ausgabeformat entgegenstehen."
      }
    ]
  },
  {
    "subject": "grafik",
    "id": "kb-typohierarchie",
    "title": "Typografische Hierarchie und Textrollen",
    "group": "Typografie und Editorial",
    "summary": "Hierarchie macht sichtbar, welche Information zuerst, danach und ergänzend gelesen werden soll.",
    "level": "Grafikdesign · Vertiefung",
    "source": "designresearch",
    "expanded": true,
    "practice": "design-type",
    "sections": [
      {
        "h": "Begriff und Zusammenhang",
        "text": "Hierarchie macht sichtbar, welche Information zuerst, danach und ergänzend gelesen werden soll. Größe, Gewicht, Position und Abstand können diese Rollen vermitteln. Ein System wirkt klarer, wenn wenige Unterschiede gezielt eingesetzt werden statt jede Textstelle individuell zu dekorieren."
      },
      {
        "h": "Durchgearbeitetes Beispiel",
        "text": "Eine Veranstaltungsseite besitzt Titel, Datum, Beschreibung und Kontakt. Ein großer Titel öffnet den Einstieg; Datum und Ort bilden eine kompakte zweite Ebene. Der Kontakt bleibt kleiner, aber lesbar. Eine zweite große Schrift für jeden Absatz würde diese Ordnung schwächen."
      },
      {
        "h": "Vorgehen und Verknüpfung",
        "text": "Definiere Textrollen vor der Detailgestaltung. Prüfe die Seite zunächst ohne Bilder und dann in kleiner Ansicht. Wenn die Lesereihenfolge nicht erkennbar ist, verändere Gruppierung oder Kontrast der Rollen statt wahllos weitere Schriftgrößen hinzuzufügen."
      },
      {
        "h": "Typischer Denkfehler",
        "text": "Groß bedeutet nicht immer wichtig. Ein riesiges Datum kann sinnvoll sein, wenn der Termin das eigentliche Kommunikationsziel ist. Die Hierarchie folgt dem Briefing."
      }
    ]
  },
  {
    "subject": "grafik",
    "id": "kb-gestaltungsraster",
    "title": "Gestaltungsraster und bewusste Abweichung",
    "group": "Layout und Komposition",
    "summary": "Ein Raster ordnet wiederkehrende Beziehungen zwischen Text, Bild und Weißraum.",
    "level": "Grafikdesign · Vertiefung",
    "source": "designresearch",
    "expanded": true,
    "practice": "design-editorial",
    "sections": [
      {
        "h": "Begriff und Zusammenhang",
        "text": "Ein Raster ordnet wiederkehrende Beziehungen zwischen Text, Bild und Weißraum. Spalten, Stege, Ränder und horizontale Bezugslinien schaffen Konsistenz. Das Raster ist ein Werkzeug für Entscheidungen; es ersetzt keine inhaltliche Hierarchie und muss nicht als sichtbares Gitter erscheinen."
      },
      {
        "h": "Durchgearbeitetes Beispiel",
        "text": "Eine A4-Seite mit 210 mm Breite hat links und rechts je 18 mm Rand. Für drei Spalten und zwei Stege à 6 mm bleiben 162 mm, also 54 mm je Spalte. Ein Bild kann zwei Spalten samt Steg überspannen und wird dann 114 mm breit."
      },
      {
        "h": "Vorgehen und Verknüpfung",
        "text": "Berechne verfügbare Breite und Stege vor dem Setzen. Probiere schmale und breite Textmodule mit echtem Inhalt. Dokumentiere, wann ein Element aus dem Raster ausbricht und welche inhaltliche Funktion diese Abweichung erfüllt."
      },
      {
        "h": "Typischer Denkfehler",
        "text": "Ein Raster mit vielen Spalten macht ein Layout nicht automatisch professionell. Wenn keine nachvollziehbaren Ausrichtungen genutzt werden, entsteht nur zusätzliche Komplexität."
      }
    ]
  },
  {
    "subject": "grafik",
    "id": "kb-komposition",
    "title": "Komposition: Gewicht, Richtung und Weißraum",
    "group": "Layout und Komposition",
    "summary": "Visuelles Gewicht entsteht durch Größe, Kontrast, Dichte und Position.",
    "level": "Grafikdesign · Vertiefung",
    "source": "designresearch",
    "expanded": true,
    "practice": "design-poster",
    "sections": [
      {
        "h": "Begriff und Zusammenhang",
        "text": "Visuelles Gewicht entsteht durch Größe, Kontrast, Dichte und Position. Ein kleines stark kontrastierendes Element kann schwerer wirken als eine große ruhige Fläche. Weißraum trennt, verbindet und lenkt; er ist ein aktiver Teil der Komposition, nicht bloß ungenutzter Platz."
      },
      {
        "h": "Durchgearbeitetes Beispiel",
        "text": "Ein dunkler Kreis rechts oben kann durch einen kleineren Textblock links unten ausbalanciert werden. Symmetrie ist dafür nicht nötig. Wird der Textblock direkt an den Kreis geschoben, entsteht eine Gruppe und die Gesamtverteilung verändert sich."
      },
      {
        "h": "Vorgehen und Verknüpfung",
        "text": "Betrachte die Gestaltung als kleine Schwarz-Weiß-Miniatur. Markiere den ersten Blickpunkt und die folgende Bewegung. Verschiebe ein Element deutlich und vergleiche die Wirkung, bevor du mehrere Dinge gleichzeitig änderst."
      },
      {
        "h": "Typischer Denkfehler",
        "text": "Zentrierung garantiert keine Ausgewogenheit. Eine optische Balance muss anhand der tatsächlichen Formen und Kontraste beurteilt werden."
      }
    ]
  },
  {
    "subject": "grafik",
    "id": "kb-farbsystem",
    "title": "Farbe als funktionales System",
    "group": "Farbe und Bild",
    "summary": "Ein Farbsystem weist Farben Rollen zu: Grundfläche, Text, Akzent, Orientierung oder Status.",
    "level": "Grafikdesign · Vertiefung",
    "source": "designresearch",
    "expanded": true,
    "practice": "design-color",
    "sections": [
      {
        "h": "Begriff und Zusammenhang",
        "text": "Ein Farbsystem weist Farben Rollen zu: Grundfläche, Text, Akzent, Orientierung oder Status. Die Rolle ist wichtiger als die isolierte Lieblingsfarbe. Farbton, Sättigung und Helligkeit wirken zusammen; eine Gestaltung muss auch ohne reine Farbcodierung verständlich bleiben."
      },
      {
        "h": "Durchgearbeitetes Beispiel",
        "text": "Eine Bibliothekskampagne nutzt dunkles Blau für Text, warmes Weiß als Grund und Orange für Hinweise. Wenn Orange gleichzeitig Warnungen, dekorative Sterne und normale Links markiert, verliert die Rolle an Klarheit. Zusätzliche Form oder Beschriftung hilft bei wichtigen Zuständen."
      },
      {
        "h": "Vorgehen und Verknüpfung",
        "text": "Definiere zuerst die Informationsrollen und ordne erst dann Farben zu. Prüfe kleine Flächen, große Flächen und Textkombinationen getrennt. Vergleiche Bildschirm und Probeausdruck, ohne eine identische Farbwiedergabe vorauszusetzen."
      },
      {
        "h": "Typischer Denkfehler",
        "text": "Eine symbolische Bedeutung wie „Blau ist immer vertrauenswürdig“ ist keine universelle Regel. Zielgruppe, Kultur, Kontext und Kombination beeinflussen die Wahrnehmung."
      }
    ]
  },
  {
    "subject": "grafik",
    "id": "kb-kontrast",
    "title": "Textkontrast und zugängliche Farbpaarungen",
    "group": "Farbe und Bild",
    "summary": "Für digitale Texte lässt sich Helligkeitskontrast als Verhältnis berechnen.",
    "level": "Grafikdesign · Vertiefung",
    "source": "designresearch",
    "expanded": true,
    "practice": "design-color",
    "sections": [
      {
        "h": "Begriff und Zusammenhang",
        "text": "Für digitale Texte lässt sich Helligkeitskontrast als Verhältnis berechnen. WCAG sieht für normalen Text auf AA-Niveau grundsätzlich mindestens 4,5:1 vor, für entsprechend großen Text 3:1. Das Verhältnis ersetzt nicht die Prüfung von Schrift, Größe, Fokus und tatsächlichem Hintergrund."
      },
      {
        "h": "Durchgearbeitetes Beispiel",
        "text": "Schwarz auf Weiß erreicht 21:1. Ein heller Grauton auf Weiß kann dagegen trotz eleganter Wirkung zu wenig Kontrast liefern. Wenn Text auf einem Foto liegt, muss die ungünstige Stelle unter den Buchstaben betrachtet werden, nicht der durchschnittliche Bildton."
      },
      {
        "h": "Vorgehen und Verknüpfung",
        "text": "Prüfe konkrete Vorder-/Hintergrundpaare mit einem Kontrastwerkzeug. Verwende für einen konservativen Texttest 4,5:1 und dokumentiere die Werte. Wichtige Hinweise benötigen zusätzlich Text oder Symbole, damit Farbe nicht der einzige Informationsträger ist."
      },
      {
        "h": "Typischer Denkfehler",
        "text": "Ein bestandener einzelner Kontrasttest bedeutet nicht, dass die ganze Oberfläche barrierefrei ist. Die Angabe beschreibt nur die geprüfte Kombination und Bedingung."
      }
    ]
  },
  {
    "subject": "grafik",
    "id": "kb-editorial-dramaturgie",
    "title": "Editorial Design: Dramaturgie über Seiten",
    "group": "Typografie und Editorial",
    "summary": "Editorial Design ordnet längere Inhalte als lesbare Abfolge.",
    "level": "Grafikdesign · Vertiefung",
    "source": "designresearch",
    "expanded": true,
    "practice": "design-editorial",
    "sections": [
      {
        "h": "Begriff und Zusammenhang",
        "text": "Editorial Design ordnet längere Inhalte als lesbare Abfolge. Einstieg, Vertiefung, Pause und Abschluss können durch Textmenge, Bildgröße und Rhythmus unterstützt werden. Eine schöne Einzelseite reicht nicht, wenn die Doppelseiten keinen Zusammenhang ergeben."
      },
      {
        "h": "Durchgearbeitetes Beispiel",
        "text": "Ein achtseitiges Heft kann mit einem starken Bild öffnen, danach einen kurzen Kontexttext liefern, in der Mitte einen Vergleich zeigen und mit Quellen sowie einer Schlussnotiz enden. Die Bildunterschrift steht jeweils nahe beim zugehörigen Bild, nicht zufällig auf der nächsten Seite."
      },
      {
        "h": "Vorgehen und Verknüpfung",
        "text": "Lege vor der Feingestaltung einen Seitenplan mit echten Textmengen an. Prüfe Übergänge und wiederkehrende Elemente. Betrachte das Heft einmal als Gesamtstrecke und einmal in tatsächlicher Lesegröße. Beide Ansichten zeigen unterschiedliche Probleme."
      },
      {
        "h": "Typischer Denkfehler",
        "text": "Eine leere Seite ist nicht automatisch eine bewusste Pause. Ihre Funktion muss aus dem Ablauf erkennbar sein, sonst wirkt sie wie fehlender Inhalt."
      }
    ]
  },
  {
    "subject": "grafik",
    "id": "kb-indesign-system",
    "title": "InDesign: Formate, Verknüpfungen und Konsistenz",
    "group": "Werkzeuge und Produktion",
    "summary": "Absatz- und Zeichenformate speichern wiederkehrende typografische Entscheidungen.",
    "level": "Grafikdesign · Vertiefung",
    "source": "designresearch",
    "expanded": true,
    "practice": "design-editorial",
    "sections": [
      {
        "h": "Begriff und Zusammenhang",
        "text": "Absatz- und Zeichenformate speichern wiederkehrende typografische Entscheidungen. Verknüpfte Bilder bleiben als externe Ressourcen nachvollziehbar. Ein sauber aufgebautes Dokument lässt sich systematisch ändern und übergeben; reine optische Korrektheit auf einer Seite genügt dafür nicht."
      },
      {
        "h": "Durchgearbeitetes Beispiel",
        "text": "Wenn alle Zwischenüberschriften das gleiche Absatzformat verwenden, lässt sich ihr Abstand gemeinsam ändern. Manuelle Einzeländerungen erzeugen dagegen leicht Abweichungen. Eine fehlende Bildverknüpfung kann im Layout unauffällig wirken, obwohl die finale Ausgabe betroffen ist."
      },
      {
        "h": "Vorgehen und Verknüpfung",
        "text": "Benutze verständliche Formatnamen nach Funktion, etwa Überschrift oder Bildlegende. Halte Bilddateien geordnet und prüfe Verknüpfungen sowie Übersatz vor der Ausgabe. Die konkreten Export- und Druckvorgaben werden mit dem Zielmedium abgestimmt."
      },
      {
        "h": "Typischer Denkfehler",
        "text": "Ein gesammelter Projektordner garantiert nicht automatisch, dass alle Dateien und Schriften weitergegeben werden dürfen. Prüfe Nutzungsrechte getrennt von der technischen Vollständigkeit."
      }
    ]
  },
  {
    "subject": "grafik",
    "id": "kb-plakat-distanz",
    "title": "Plakatgestaltung für Distanz und kurze Aufmerksamkeit",
    "group": "Visuelle Kommunikation",
    "summary": "Ein Plakat wird oft unter Zeitdruck und aus Abstand wahrgenommen.",
    "level": "Grafikdesign · Vertiefung",
    "source": "designresearch",
    "expanded": true,
    "practice": "design-poster",
    "sections": [
      {
        "h": "Begriff und Zusammenhang",
        "text": "Ein Plakat wird oft unter Zeitdruck und aus Abstand wahrgenommen. Aussage, Blickfang und praktische Information müssen deshalb priorisiert werden. Die Leserichtung entsteht aus Kontrasten und Gruppen, nicht allein aus einer besonders großen Überschrift."
      },
      {
        "h": "Durchgearbeitetes Beispiel",
        "text": "Ein Konzertplakat muss zuerst Veranstaltung und Charakter erkennbar machen, danach Datum und Ort. Ein schönes Muster, das den Titel überlagert, kann den Einstieg verhindern. Ein Distanztest zeigt, ob der Entwurf auch außerhalb der Bildschirmansicht funktioniert."
      },
      {
        "h": "Vorgehen und Verknüpfung",
        "text": "Formuliere die Kernbotschaft in einem Satz. Entwirf mehrere grobe Kompositionen und prüfe sie als Miniaturen sowie aus Entfernung. Ergänze Details erst, wenn die wichtigsten Informationen zuverlässig gefunden werden."
      },
      {
        "h": "Typischer Denkfehler",
        "text": "Ein vergrößerter Flyer wird nicht automatisch zum guten Plakat. Textmenge, Blickdauer und Betrachtungsabstand verlangen eine eigene Informationshierarchie."
      }
    ]
  },
  {
    "subject": "grafik",
    "id": "kb-branding-position",
    "title": "Branding: Positionierung vor Gestaltung",
    "group": "Identität und Marke",
    "summary": "Branding verbindet eine erkennbare Haltung mit einem konsistenten Erlebnis.",
    "level": "Grafikdesign · Vertiefung",
    "source": "designresearch",
    "expanded": true,
    "practice": "design-brand",
    "sections": [
      {
        "h": "Begriff und Zusammenhang",
        "text": "Branding verbindet eine erkennbare Haltung mit einem konsistenten Erlebnis. Die visuelle Form folgt einer Positionierung: Für wen ist das Angebot gedacht, welches Problem löst es und wodurch unterscheidet es sich? Ein Logo allein beantwortet diese Fragen nicht."
      },
      {
        "h": "Durchgearbeitetes Beispiel",
        "text": "Ein fiktives Repair-Café kann als fachkundige Werkstatt oder als offener Lernort auftreten. Beide Positionen erlauben Reparatur, führen aber zu unterschiedlichen Bildern, Tonalitäten und Kontaktpunkten. Die Entscheidung muss zur tatsächlichen Nutzung passen."
      },
      {
        "h": "Vorgehen und Verknüpfung",
        "text": "Schreibe einen kurzen Positionierungssatz und stütze ihn auf Beobachtungen oder klar gekennzeichnete Annahmen. Sammle konkurrierende visuelle Richtungen. Prüfe sie an konkreten Anwendungen statt nur auf einer dekorativen Präsentationsfläche."
      },
      {
        "h": "Typischer Denkfehler",
        "text": "„Modern, kreativ, hochwertig“ ist ohne Vergleich und Zielgruppe zu ungenau. Solche Wörter müssen in überprüfbare Eigenschaften und Entscheidungen übersetzt werden."
      }
    ]
  },
  {
    "subject": "grafik",
    "id": "kb-corporate-design",
    "title": "Corporate Design: Regeln mit Spielraum",
    "group": "Identität und Marke",
    "summary": "Corporate Design beschreibt wiedererkennbare visuelle Regeln über mehrere Anwendungen hinweg.",
    "level": "Grafikdesign · Vertiefung",
    "source": "designresearch",
    "expanded": true,
    "practice": "design-brand",
    "sections": [
      {
        "h": "Begriff und Zusammenhang",
        "text": "Corporate Design beschreibt wiedererkennbare visuelle Regeln über mehrere Anwendungen hinweg. Dazu können Typografie, Farbe, Bildsprache, Raster und Zeichen gehören. Ein gutes System definiert feste Elemente und erlaubte Variation; es produziert nicht überall dieselbe Komposition."
      },
      {
        "h": "Durchgearbeitetes Beispiel",
        "text": "Ein Kulturzentrum hält Logo, Schriftrollen und Farbbasis konstant. Für Konzerte nutzt es große Bilder, für Workshops modulare Informationsfelder. Beide Anwendungen bleiben verwandt, obwohl ihre Informationsaufgaben verschieden sind."
      },
      {
        "h": "Vorgehen und Verknüpfung",
        "text": "Erstelle wenige nachvollziehbare Regeln mit positiven und problematischen Beispielen. Teste mindestens drei unterschiedliche Formate. Wenn jede neue Anwendung eine Ausnahme benötigt, ist das System möglicherweise zu eng oder unzureichend definiert."
      },
      {
        "h": "Typischer Denkfehler",
        "text": "Ein Handbuch mit vielen Seiten beweist keine Qualität. Entscheidend ist, ob eine andere Person damit eine passende neue Anwendung gestalten kann."
      }
    ]
  },
  {
    "subject": "grafik",
    "id": "kb-logo-system",
    "title": "Logo: Zeichenidee, Reduktion und Varianten",
    "group": "Identität und Marke",
    "summary": "Ein Logo verdichtet eine Identität zu einem wiedererkennbaren Zeichen.",
    "level": "Grafikdesign · Vertiefung",
    "source": "designresearch",
    "expanded": true,
    "practice": "design-logo",
    "sections": [
      {
        "h": "Begriff und Zusammenhang",
        "text": "Ein Logo verdichtet eine Identität zu einem wiedererkennbaren Zeichen. Formale Eigenständigkeit, Bedeutung und praktische Reproduzierbarkeit müssen zusammenpassen. Varianten für kleine Größen oder einfarbige Ausgabe sind keine Nebensache, sondern Teil des Systems."
      },
      {
        "h": "Durchgearbeitetes Beispiel",
        "text": "Ein aus feinen Linien aufgebautes Werkstattzeichen kann auf einem großen Plakat funktionieren und als kleiner Stempel zerfallen. Eine reduzierte Kleinformatvariante erhält die Grundidee, ohne jedes Detail zu bewahren. Beide Varianten müssen klar zusammengehören."
      },
      {
        "h": "Vorgehen und Verknüpfung",
        "text": "Beginne mit mehreren konzeptionell verschiedenen Skizzen. Prüfe Silhouette, Negativraum und Wortmarke getrennt. Teste anschließend kleine, große und einfarbige Anwendungen. Dokumentiere die Grenzen, statt einen universellen Mindesteinsatz ohne Prüfung zu behaupten."
      },
      {
        "h": "Typischer Denkfehler",
        "text": "Eine Änderung der Farbe macht aus derselben Zeichenidee noch kein alternatives Konzept. Ebenso ist Ähnlichkeit mit einem bekannten Zeichen kein Nachweis für erfolgreiche Wiedererkennbarkeit."
      }
    ]
  },
  {
    "subject": "grafik",
    "id": "kb-illustrator-vektor",
    "title": "Illustrator: Vektorformen und saubere Pfade",
    "group": "Werkzeuge und Produktion",
    "summary": "Vektorgrafiken beschreiben Formen über geometrische Elemente statt über ein festes Pixelraster.",
    "level": "Grafikdesign · Vertiefung",
    "source": "designresearch",
    "expanded": true,
    "practice": "design-icons",
    "sections": [
      {
        "h": "Begriff und Zusammenhang",
        "text": "Vektorgrafiken beschreiben Formen über geometrische Elemente statt über ein festes Pixelraster. Sie eignen sich für skalierbare Zeichen und klare Konturen. Wenige sinnvoll gesetzte Ankerpunkte erleichtern gleichmäßige Kurven und spätere Bearbeitung."
      },
      {
        "h": "Durchgearbeitetes Beispiel",
        "text": "Ein Blatt-Symbol kann aus zwei kontrollierten Kurven bestehen. Viele automatisch erzeugte Punkte führen dagegen oft zu kleinen Unebenheiten. In einer Symbolfamilie müssen außerdem Strichgewicht, optische Größe und Innenräume zueinander passen."
      },
      {
        "h": "Vorgehen und Verknüpfung",
        "text": "Baue zunächst Grundformen und prüfe ihre Silhouette. Kontrolliere Kurven bei starker Vergrößerung und das Ergebnis anschließend in Einsatzgröße. Dokumentiere, ob Striche bei Skalierung mitwachsen sollen; diese Entscheidung beeinflusst Varianten."
      },
      {
        "h": "Typischer Denkfehler",
        "text": "Vektor bedeutet nicht automatisch druckfertig oder gut gestaltet. Zu dünne Linien, ungeklärte Farben und unlesbare Details bleiben auch in einer skalierbaren Datei problematisch."
      }
    ]
  },
  {
    "subject": "grafik",
    "id": "kb-verpackung",
    "title": "Verpackungsdesign: Fläche wird Körper",
    "group": "Layout und Komposition",
    "summary": "Eine Verpackung muss als Fläche und als räumliches Objekt funktionieren.",
    "level": "Grafikdesign · Vertiefung",
    "source": "designresearch",
    "expanded": true,
    "practice": "design-packaging",
    "sections": [
      {
        "h": "Begriff und Zusammenhang",
        "text": "Eine Verpackung muss als Fläche und als räumliches Objekt funktionieren. Falze, Schnittkanten, Verschlüsse und Blickrichtungen beeinflussen die Informationsordnung. Ein flacher Entwurf kann korrekt aussehen und nach dem Falten wichtige Angaben verdecken."
      },
      {
        "h": "Durchgearbeitetes Beispiel",
        "text": "Bei einer Saatgut-Hülle liegt die Sortenbezeichnung auf der Vorderseite, die Anleitung auf der Rückseite und die Klebelasche außerhalb beider Informationsflächen. Ein Papierdummy zeigt, ob sich die Hülle öffnen lässt, ohne die Anleitung zu zerstören."
      },
      {
        "h": "Vorgehen und Verknüpfung",
        "text": "Entwickle zuerst ein einfaches körperliches Modell. Übertrage seine Maße in eine beschriftete Vorlage und unterscheide Schnitt, Falz und Klebebereich. Platziere Gestaltung erst nach dem Funktionstest. Materialstärke und Produktion bleiben ausdrücklich zu prüfende Annahmen."
      },
      {
        "h": "Typischer Denkfehler",
        "text": "Ein fotorealistisches Mock-up ist kein Nachweis dafür, dass eine Verpackung hergestellt oder benutzt werden kann. Ein einfacher echter Prototyp liefert andere Informationen."
      }
    ]
  },
  {
    "subject": "grafik",
    "id": "kb-fotografie",
    "title": "Fotografie: Licht, Perspektive und Bildaussage",
    "group": "Farbe und Bild",
    "summary": "Fotografische Gestaltung beginnt mit einer Absicht: Was soll sichtbar werden und aus welcher Beziehung zum Gegenstand? Lichtcharakter, Kameraposition, Bildausschnitt und Schärfe beeinflussen die Aussage.",
    "level": "Grafikdesign · Vertiefung",
    "source": "designresearch",
    "expanded": true,
    "practice": "design-photo",
    "sections": [
      {
        "h": "Begriff und Zusammenhang",
        "text": "Fotografische Gestaltung beginnt mit einer Absicht: Was soll sichtbar werden und aus welcher Beziehung zum Gegenstand? Lichtcharakter, Kameraposition, Bildausschnitt und Schärfe beeinflussen die Aussage. Technische Schärfe allein macht ein Bild noch nicht kommunikativ präzise."
      },
      {
        "h": "Durchgearbeitetes Beispiel",
        "text": "Eine seitliche Lichtquelle kann die Oberfläche eines Papiermodells zeigen, während frontales weiches Licht dessen Form ruhiger erscheinen lässt. Eine tiefe Kameraposition kann denselben Gegenstand monumental wirken lassen. Diese Unterschiede sollten bewusst zur Aufgabe passen."
      },
      {
        "h": "Vorgehen und Verknüpfung",
        "text": "Erstelle eine kurze Aufnahmeliste und variiere jeweils nur Licht, Abstand oder Blickwinkel. Vergleiche die Ergebnisse als Kontaktbogen. Wähle anhand der beabsichtigten Aussage, nicht allein nach dem spektakulärsten Effekt."
      },
      {
        "h": "Typischer Denkfehler",
        "text": "Nachbearbeitung ersetzt keine beliebige fehlende Bildinformation. Ausgefressene helle Bereiche oder eine ungünstige Perspektive lassen sich nicht immer überzeugend korrigieren."
      }
    ]
  },
  {
    "subject": "grafik",
    "id": "kb-bildserie",
    "title": "Bildsprache und fotografische Serie",
    "group": "Farbe und Bild",
    "summary": "Eine Serie benötigt Beziehungen zwischen ihren Bildern.",
    "level": "Grafikdesign · Vertiefung",
    "source": "designresearch",
    "expanded": true,
    "practice": "design-photo",
    "sections": [
      {
        "h": "Begriff und Zusammenhang",
        "text": "Eine Serie benötigt Beziehungen zwischen ihren Bildern. Wiederkehrende Perspektiven, Lichtstimmungen, Motive oder Übergänge können Kohärenz erzeugen. Gleichzeitig braucht sie Variation, damit jedes Bild eine eigene Funktion übernimmt. Die Reihenfolge ist Teil der Aussage."
      },
      {
        "h": "Durchgearbeitetes Beispiel",
        "text": "Eine Werkstattserie kann mit dem Ort beginnen, Hände bei der Arbeit zeigen und mit einem Detail des Ergebnisses enden. Zwei fast identische Übersichtsaufnahmen liefern dagegen möglicherweise dieselbe Information und schwächen den Rhythmus."
      },
      {
        "h": "Vorgehen und Verknüpfung",
        "text": "Lege für jedes Bild eine Funktion fest: Einstieg, Kontext, Handlung, Detail oder Abschluss. Ordne kleine Ausdrucke und teste alternative Reihenfolgen. Prüfe, ob eine Bildlegende notwendige Information ergänzt oder nur das Offensichtliche wiederholt."
      },
      {
        "h": "Typischer Denkfehler",
        "text": "Eine gemeinsame Farbkorrektur allein erzeugt noch keine Geschichte. Der inhaltliche Zusammenhang und die Abfolge müssen ebenfalls nachvollziehbar sein."
      }
    ]
  },
  {
    "subject": "grafik",
    "id": "kb-photoshop",
    "title": "Photoshop: Masken und nachvollziehbare Bearbeitung",
    "group": "Werkzeuge und Produktion",
    "summary": "Nichtdestruktive Bearbeitung bewahrt möglichst viele ursprüngliche Bildinformationen.",
    "level": "Grafikdesign · Vertiefung",
    "source": "designresearch",
    "expanded": true,
    "practice": "design-composite",
    "sections": [
      {
        "h": "Begriff und Zusammenhang",
        "text": "Nichtdestruktive Bearbeitung bewahrt möglichst viele ursprüngliche Bildinformationen. Masken steuern die Sichtbarkeit, während getrennte Korrekturen Änderungen nachvollziehbar halten. Ziel ist ein überprüfbarer Arbeitsaufbau, nicht eine besonders lange Ebenenliste."
      },
      {
        "h": "Durchgearbeitetes Beispiel",
        "text": "Bei einer Collage verdeckt eine Maske den Hintergrund eines Objekts, ohne ihn aus der Ausgangsebene zu löschen. Eine gesonderte Farbkorrektur passt das Objekt an die Umgebung an. So können Freistellung und Farbwirkung später getrennt überarbeitet werden."
      },
      {
        "h": "Vorgehen und Verknüpfung",
        "text": "Benenne Ebenen nach Funktion und behalte die Originalquelle nachvollziehbar. Kontrolliere Maskenkanten bei unterschiedlichen Hintergründen und in endgültiger Größe. Vergleiche vor und nach der Bearbeitung, damit der Effekt zur Bildabsicht passt."
      },
      {
        "h": "Typischer Denkfehler",
        "text": "Ein weicher Rand kaschiert nicht automatisch eine schlechte Freistellung. Unpassende Schatten, Perspektive oder Lichtfarbe können die Montage weiterhin unglaubwürdig machen."
      }
    ]
  },
  {
    "subject": "grafik",
    "id": "kb-webdesign",
    "title": "Webdesign: Inhalt, Anpassung und Nutzung",
    "group": "Digitale Gestaltung",
    "summary": "Webdesign ordnet Inhalte für verschiedene Bildschirmgrößen und Handlungen.",
    "level": "Grafikdesign · Vertiefung",
    "source": "designresearch",
    "expanded": true,
    "practice": "design-web",
    "sections": [
      {
        "h": "Begriff und Zusammenhang",
        "text": "Webdesign ordnet Inhalte für verschiedene Bildschirmgrößen und Handlungen. Ein Layout muss auf echte Textlängen, Vergrößerung und unterschiedliche Eingaben reagieren. Eine Desktopansicht allein zeigt nicht, wie die Seite auf einem schmalen Bildschirm oder mit Tastatur benutzt wird."
      },
      {
        "h": "Durchgearbeitetes Beispiel",
        "text": "Eine Ausstellungsseite braucht Termin, Ort, Zugang und Anmeldung. Auf breitem Bildschirm können Informationen nebeneinander stehen; auf schmalem Bildschirm muss eine sinnvolle Reihenfolge entstehen. Ein Bild darf dabei wichtige praktische Angaben nicht verdrängen."
      },
      {
        "h": "Vorgehen und Verknüpfung",
        "text": "Beginne mit Inhalt und Hauptaufgabe. Skizziere die Informationsstruktur, dann zwei deutlich unterschiedliche Breiten. Teste lange Überschriften und fehlende Bilder. Beschreibe, welche Elemente umbrechen, wachsen oder ihre Anordnung ändern."
      },
      {
        "h": "Typischer Denkfehler",
        "text": "Ein verkleinertes Desktopbild ist kein responsives Layout. Lesbare Größen und bedienbare Ziele müssen erhalten bleiben."
      }
    ]
  },
  {
    "subject": "grafik",
    "id": "kb-ui-zustaende",
    "title": "UI: Zustände, Rückmeldung und Fehlerwege",
    "group": "Digitale Gestaltung",
    "summary": "Eine Benutzeroberfläche besteht nicht nur aus ihrem idealen Anfangszustand.",
    "level": "Grafikdesign · Vertiefung",
    "source": "designresearch",
    "expanded": true,
    "practice": "design-ui",
    "sections": [
      {
        "h": "Begriff und Zusammenhang",
        "text": "Eine Benutzeroberfläche besteht nicht nur aus ihrem idealen Anfangszustand. Laden, leerer Inhalt, Erfolg, Fehler und deaktivierte Aktionen brauchen verständliche Rückmeldung. Der Nutzer sollte erkennen, was passiert ist und welchen nächsten Schritt er ausführen kann."
      },
      {
        "h": "Durchgearbeitetes Beispiel",
        "text": "Ein Anmeldeformular zeigt bei fehlender E-Mail eine konkrete Meldung am Feld. Nach erfolgreicher Anmeldung bestätigt es Termin und nächsten Schritt. Ein roter Rand allein erklärt weder das Problem noch seine Lösung."
      },
      {
        "h": "Vorgehen und Verknüpfung",
        "text": "Zeichne den normalen Ablauf und mindestens zwei Störungen. Benenne für jede Aktion Auslöser, Systemreaktion und sichtbare Rückmeldung. Prüfe Beschriftungen auf Eindeutigkeit und plane Tastaturfokus sowie Lesereihenfolge mit ein."
      },
      {
        "h": "Typischer Denkfehler",
        "text": "Ein deaktivierter Button ohne Erklärung kann wie ein Defekt wirken. Wenn eine Voraussetzung fehlt, muss diese für den Nutzer erkennbar sein."
      }
    ]
  },
  {
    "subject": "grafik",
    "id": "kb-figma",
    "title": "Figma: Auto Layout und Komponenten denken",
    "group": "Digitale Gestaltung",
    "summary": "Auto Layout beschreibt Beziehungen zwischen Elementen, etwa Abstände und Größenverhalten.",
    "level": "Grafikdesign · Vertiefung",
    "source": "designresearch",
    "expanded": true,
    "practice": "design-ui",
    "sections": [
      {
        "h": "Begriff und Zusammenhang",
        "text": "Auto Layout beschreibt Beziehungen zwischen Elementen, etwa Abstände und Größenverhalten. Komponenten bündeln wiederkehrende Gestaltung; Varianten stellen unterschiedliche Zustände dar. Die Begriffe sind nützlich, wenn sie echte Wiederholung und Verhalten modellieren, nicht nur Ordnung im Dateibaum erzeugen."
      },
      {
        "h": "Durchgearbeitetes Beispiel",
        "text": "Ein Button enthält Text und Innenabstand. Bei einer längeren Beschriftung sollte seine Breite sinnvoll mitwachsen. Ein Komponentenpaar für normal und deaktiviert kann die Zustandsunterschiede konsistent halten, statt zwei unabhängige Zeichnungen zu erzeugen."
      },
      {
        "h": "Vorgehen und Verknüpfung",
        "text": "Teste zunächst eine einzelne Komponente mit kurzem und langem Inhalt. Benenne Eigenschaften nach Funktion und beschränke Varianten auf sinnvolle Kombinationen. Die verlinkte offizielle Dokumentation erläutert aktuelle Bedienung; im Projekt steht das Verhalten im Vordergrund."
      },
      {
        "h": "Typischer Denkfehler",
        "text": "Ein klickbarer Prototyp beweist noch keine funktionsfähige Website. Er zeigt ausgewählte Interaktionen und muss als Prototyp kenntlich bleiben."
      }
    ]
  },
  {
    "subject": "grafik",
    "id": "kb-informationsdesign",
    "title": "Informationsdesign: Auswahl und Orientierung",
    "group": "Visuelle Kommunikation",
    "summary": "Informationsdesign macht komplexe Zusammenhänge auffindbar und verständlich.",
    "level": "Grafikdesign · Vertiefung",
    "source": "designresearch",
    "expanded": true,
    "practice": "design-wayfinding",
    "sections": [
      {
        "h": "Begriff und Zusammenhang",
        "text": "Informationsdesign macht komplexe Zusammenhänge auffindbar und verständlich. Die Auswahl der Information, ihre Gruppierung und ihre visuelle Codierung sind eng verbunden. Eine attraktive Darstellung kann trotzdem irreführend sein, wenn Maßstab, Quelle oder Kategorien unklar bleiben."
      },
      {
        "h": "Durchgearbeitetes Beispiel",
        "text": "Ein Wegweiser nennt zuerst das Ziel und die Richtung, danach Zusatzinformationen. Wenn Raumname, Veranstaltungstitel und Sponsor gleich stark erscheinen, muss die Person erst entschlüsseln, welche Information beim Abbiegen hilft."
      },
      {
        "h": "Vorgehen und Verknüpfung",
        "text": "Beschreibe eine konkrete Suchfrage und ordne die Informationen danach. Teste, ob eine außenstehende Person die benötigte Angabe findet. Bei Datenvisualisierungen dokumentierst du Quelle, Einheit und Unsicherheit; erfundene Beispieldaten werden als solche gekennzeichnet."
      },
      {
        "h": "Typischer Denkfehler",
        "text": "Mehr Symbole bedeuten nicht automatisch bessere Orientierung. Unbekannte Zeichen benötigen Erklärung oder müssen zusammen mit verständlicher Sprache verwendet werden."
      }
    ]
  },
  {
    "subject": "grafik",
    "id": "kb-kampagne",
    "title": "Kampagnen: Leitidee und unterschiedliche Kontaktpunkte",
    "group": "Visuelle Kommunikation",
    "summary": "Eine Kampagne verbindet mehrere Kontakte durch eine gemeinsame Idee.",
    "level": "Grafikdesign · Vertiefung",
    "source": "designresearch",
    "expanded": true,
    "practice": "design-campaign",
    "sections": [
      {
        "h": "Begriff und Zusammenhang",
        "text": "Eine Kampagne verbindet mehrere Kontakte durch eine gemeinsame Idee. Die Medien haben unterschiedliche Aufgaben: Aufmerksamkeit, Erklärung, Erinnerung oder Handlung. Konsistenz entsteht aus Aussage und System, nicht allein aus identischen Bildern auf jedem Format."
      },
      {
        "h": "Durchgearbeitetes Beispiel",
        "text": "Eine Wiederverwendungskampagne kann mit einem Plakat Interesse wecken, in einer Bildfolge den Ablauf erklären und mit einer Sammelkarte den nächsten Termin sichern. Jede Anwendung nutzt dieselbe Leitidee, liefert aber eine andere hilfreiche Information."
      },
      {
        "h": "Vorgehen und Verknüpfung",
        "text": "Formuliere Ziel und gewünschte Handlung. Lege für jeden Kontaktpunkt Aufgabe, Kontext und Erfolgskriterium fest. Entwickle danach passende Umsetzungen und prüfe, ob sie zusammen einen verständlichen Weg bilden."
      },
      {
        "h": "Typischer Denkfehler",
        "text": "Eine hohe Zahl von Aufrufen beweist nicht, dass die gewünschte Handlung stattgefunden hat. Wähle Kennzahlen, die zur jeweiligen Kommunikationsaufgabe passen."
      }
    ]
  },
  {
    "subject": "grafik",
    "id": "kb-prepress",
    "title": "Printproduktion und Prepress prüfen",
    "group": "Werkzeuge und Produktion",
    "summary": "Prepress bereitet eine Gestaltung auf ein konkretes Ausgabeverfahren vor.",
    "level": "Grafikdesign · Vertiefung",
    "source": "designresearch",
    "expanded": true,
    "practice": "design-prepress",
    "sections": [
      {
        "h": "Begriff und Zusammenhang",
        "text": "Prepress bereitet eine Gestaltung auf ein konkretes Ausgabeverfahren vor. Format, Anschnitt, Bilddaten, Schriften und Farbbehandlung müssen zu den vereinbarten Produktionsbedingungen passen. Ein allgemeines Exportrezept kann die Rücksprache mit dem ausführenden Betrieb nicht ersetzen."
      },
      {
        "h": "Durchgearbeitetes Beispiel",
        "text": "Ein Bildschirm-PDF kann vollständig aussehen, obwohl ein Bild fehlt, Text überläuft oder die vereinbarte Beschnittzugabe nicht stimmt. Eine Prüfung gegen ein passendes Profil und ein kontrollierter Probeausdruck machen unterschiedliche Fehler sichtbar."
      },
      {
        "h": "Vorgehen und Verknüpfung",
        "text": "Sammle zuerst die schriftlichen Produktionsvorgaben. Prüfe Dokument, Verknüpfungen und Schriften; exportiere danach nach Vereinbarung. Kontrolliere auch den exportierten Stand und halte offene Punkte im Übergabeprotokoll fest."
      },
      {
        "h": "Typischer Denkfehler",
        "text": "Eine grüne technische Prüfanzeige beurteilt nur die aktivierten Regeln. Sie bestätigt weder Rechtschreibung noch gute Gestaltung oder die Richtigkeit aller Inhalte."
      }
    ]
  },
  {
    "subject": "grafik",
    "id": "kb-portfolio-case",
    "title": "Portfolio: Prozess und Ergebnis als Fallstudie",
    "group": "Portfolio und Beruf",
    "summary": "Eine Fallstudie erklärt ein Projekt für Menschen, die den Arbeitsprozess nicht kennen.",
    "level": "Grafikdesign · Vertiefung",
    "source": "designresearch",
    "expanded": true,
    "practice": "design-portfolio",
    "sections": [
      {
        "h": "Begriff und Zusammenhang",
        "text": "Eine Fallstudie erklärt ein Projekt für Menschen, die den Arbeitsprozess nicht kennen. Sie zeigt Problem, Rolle, wichtige Entscheidungen, Ergebnis und Erkenntnis. Nicht jeder Zwischenschritt muss erscheinen; die Auswahl sollte den eigenen Beitrag überprüfbar machen."
      },
      {
        "h": "Durchgearbeitetes Beispiel",
        "text": "Ein Layoutprojekt beginnt mit Zielgruppe und Umfang, zeigt zwei bewusst unterschiedliche Ansätze und erläutert die Auswahl. Detailansichten belegen Typografie und Raster. Die Abschlussreflexion nennt eine konkrete Verbesserung statt nur „Es hat Spaß gemacht“."
      },
      {
        "h": "Vorgehen und Verknüpfung",
        "text": "Plane die Fallstudie als kurze Erzählung und überprüfe jede Abbildung auf ihre Funktion. Beschrifte Eigenanteil, Zusammenarbeit und verwendete Quellen. Zeige fertige Ergebnisse auch ohne verzerrende Mock-up-Perspektive, damit Qualität und Details beurteilt werden können."
      },
      {
        "h": "Typischer Denkfehler",
        "text": "Viele dekorative Ansichten desselben Entwurfs ersetzen keine Erklärung. Ein kleiner echter Prozessbeleg kann aussagekräftiger sein als eine weitere aufwendige Präsentationsszene."
      }
    ]
  }
];
Object.assign(root.LibraryReadingSources,{bwlanguages:["Bildungspläne BW · FHR", "https://www.bildungsplaene-bw.de/,Lde/allgemeine+faecher_+die+zur+_zusatz-_pruefung+zum+erwerb+der+fachhochschulreife+fuehren"],bwexpanded:["Landesbildungsserver BW · FHSR", "https://www.schule-bw.de/faecher-und-schularten/berufliche-schularten/berufskolleg/faecher_zusatzpruefung_fhsr/mathematik/musterpruefungen.html"],designresearch:["Gestaltung · Quellen und Methoden", "https://www.designcouncil.org.uk/resources/framework-for-innovation/"]});
root.LibraryReading.push(...root.LibraryExpansion);
})(window);
