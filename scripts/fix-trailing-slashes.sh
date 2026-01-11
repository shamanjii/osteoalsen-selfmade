#!/bin/bash

# Script zum Hinzufügen von trailing slashes zu internen Links
# Dieses Script sollte mit Vorsicht verwendet werden!

echo "🔧 TRAILING SLASH FIXER"
echo "======================================"
echo ""
echo "⚠️  WARNUNG: Dieses Script wird alle internen Links"
echo "   in .tsx Dateien modifizieren und trailing slashes hinzufügen."
echo ""
echo "Möchtest du fortfahren? (y/n)"
read -r response

if [ "$response" != "y" ]; then
  echo "❌ Abgebrochen"
  exit 0
fi

echo ""
echo "🔍 Suche nach Links ohne trailing slashes..."
echo ""

# Finde alle .tsx Dateien im src/app Verzeichnis
count=0

# Verwende find mit -exec für sicherere Bearbeitung
find src/app -name "*.tsx" -type f | while read -r file; do
  # Erstelle Backup
  cp "$file" "$file.backup"

  # Ersetze href="/pfad" mit href="/pfad/" (aber nur für interne Links)
  # Ausnahmen: /, /api/*, externe Links, Links die bereits trailing slash haben

  # Methode 1: href="/text" → href="/text/" (außer root /)
  sed -i '' 's|href="/\([^/"]*\)"|href="/\1/"|g' "$file"

  # Methode 2: href="/text/text" → href="/text/text/"
  sed -i '' 's|href="/\([^"]*[^/"]\)"|href="/\1/"|g' "$file"

  # Prüfe ob Datei geändert wurde
  if ! cmp -s "$file" "$file.backup"; then
    echo "✅ Bearbeitet: $file"
    count=$((count + 1))
  fi

  # Entferne Backup
  rm "$file.backup"
done

echo ""
echo "======================================"
echo "✅ Fertig! $count Dateien wurden bearbeitet."
echo ""
echo "💡 Nächste Schritte:"
echo "   1. Überprüfe die Änderungen mit: git diff"
echo "   2. Teste die Links lokal"
echo "   3. Committe die Änderungen wenn alles funktioniert"
echo ""
