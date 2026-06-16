#!/usr/bin/env bash
# hwg-audit.sh
# Sucht in src/app + posts nach HWG-kritischen Mustern, die wir am 10./11.05.2026 entfernt haben.
# Verwendung: ./scripts/hwg-audit.sh
# Exit 0 = kein Hit, 1 = mindestens ein Hit gefunden.

set -u
cd "$(dirname "$0")/.." || exit 2

FOUND=0
SEARCH_DIRS=(src/app posts)
EXCLUDES='\.next|/out/|nicht garantier|kann nicht garantiert|lässt sich nicht garantieren|nicht heilbar|Keine Wunder|aber nicht.*geheilt|Cluster|spezialisierte medizinische|spezialisierte Kinder|Behandlungsschwerpunkte|Bevölkerung|wissen/page|/blog/'

declare -a PATTERNS=(
  "Erfundene Patient-Namen|(Sarah|Maria|Markus|Helga|Michael|Julia|Thomas|Peter|Anna|Lukas|Stefan|Ingrid|Sabine|Petra|Andrea|Claudia|Bettina|Christine|Jürgen|Wolfgang|Klaus|Hans|Tobias|Frau [A-Z]|Herr [A-Z]),?\\s*\\(?[0-9]{2}\\)?"
  "Patienten-Erfolgsgeschichte Sektion|## (Patienten-Erfolg\|Patientenfall\|Fallbeispiel\|Erfolgsgeschichte\|Real-Case\|Real-Life)"
  "Fake-Zitat-Block|^>\\s*„[^\"]+\"\\s*$"
  "Sterne-Testimonials|⭐{3,}"
  "%-Erfolgsquoten|[0-9]+\\s*%\\s*(Schmerzreduktion|Besserung|beschwerdefrei|vermeiden OP|Erfolgsrate|Verbesserung nach|Besserung nach)"
  "Erwartung X%|Erwartung.*[0-9]+\\s*%"
  "Praxis-%-Behauptungen|[0-9]+\\s*%\\s*(aller|der (Fälle|Patient))"
  "Eigene Daten n=X|n=[0-9]+\\s*Patient|unsere Daten"
  "nach X Sitzungen Soft-Promise|nach [0-9]+(\\-[0-9]+)? (Sitzungen|Behandlungen).*?(deutlich|besser|Verbesserung)"
  "garantiert|garantiert"
  "starke Wirkungs-Wörter|besonders wirksam|sehr wirksam|hochwirksam|sehr effektiv|deutlich (reduz|lind|verb)|signifikant (reduz|verb)"
  "Ich löse/verbessere|löse ich|verbessere ich|behandle.*erfolgreich"
  "Heilungs-Vokabular|vollständig(e)? Heilung|nachhaltig(e)? Heilung|dauerhaft schmerzfrei|geheilt nach"
  "Vergleichswerbung ohne-OP|ohne (OP|Operation|Medikamente|Tabletten)|statt (OP|Tabletten|Medikamenten?)"
  "Selbst-Überhöhung Spezialist|Spezialist(in)?|spezialisiert|Schwerpunkt|Experte für|meine Expertise"
  "Frequenz-Übertreibung|behandle.*täglich|sehe.*täglich"
  "Was Sie erwarten können|Was Sie erwarten können"
  "Soft-Promise oft/meist|(oft|meist) (schon|schnell|innerhalb).*Besserung|verbessert sich oft"
)

for entry in "${PATTERNS[@]}"; do
  label="${entry%%|*}"
  pattern="${entry#*|}"
  hits=$(grep -rniE "$pattern" "${SEARCH_DIRS[@]}" 2>/dev/null | grep -vE "$EXCLUDES")
  if [ -n "$hits" ]; then
    echo "═══ [$label] ═══"
    echo "$hits"
    echo
    FOUND=1
  fi
done

if [ "$FOUND" -eq 0 ]; then
  echo "✓ Keine HWG-kritischen Muster gefunden."
fi

exit $FOUND
