import { config } from 'dotenv';
import { getTopKeywords } from '@/lib/google-search-console';

config();

async function analyzeConversion() {
  console.log('🔍 Conversion-Analyse: Warum keine Buchungen?\n');
  console.log('='.repeat(70));

  try {
    const allKeywords = await getTopKeywords(30, 100);

    console.log(`\n📊 Gesamt: ${allKeywords.length} Keywords mit Traffic\n`);

    // Intent-Kategorisierung
    const intentCategories = {
      branded: [] as typeof allKeywords,
      informational: [] as typeof allKeywords,
      commercial: [] as typeof allKeywords,
      transactional: [] as typeof allKeywords
    };

    allKeywords.forEach(kw => {
      const query = kw.keyword.toLowerCase();

      // Branded (looking specifically for you)
      if (query.includes('joshua') || query.includes('alsen') || query.includes('osteoalsen')) {
        intentCategories.branded.push(kw);
      }
      // Transactional (ready to book)
      else if (
        query.includes('termin') ||
        query.includes('buchen') ||
        query.includes('praxis') ||
        query.match(/osteopath(ie)?\s+hamburg\s+(rotherbaum|eimsbüttel)/i)
      ) {
        intentCategories.transactional.push(kw);
      }
      // Commercial (comparing options)
      else if (
        query.match(/osteopath(ie|en)?\s+hamburg/i) ||
        query.includes('kosten') ||
        query.includes('erfahrung') ||
        query.includes('bewertung') ||
        query.includes('heilpraktiker')
      ) {
        intentCategories.commercial.push(kw);
      }
      // Informational (just learning)
      else {
        intentCategories.informational.push(kw);
      }
    });

    console.log('🎯 TRAFFIC-INTENT-VERTEILUNG:\n');

    const brandedClicks = intentCategories.branded.reduce((sum, kw) => sum + kw.clicks, 0);
    const transactionalClicks = intentCategories.transactional.reduce((sum, kw) => sum + kw.clicks, 0);
    const commercialClicks = intentCategories.commercial.reduce((sum, kw) => sum + kw.clicks, 0);
    const informationalClicks = intentCategories.informational.reduce((sum, kw) => sum + kw.clicks, 0);
    const totalClicks = brandedClicks + transactionalClicks + commercialClicks + informationalClicks;

    console.log(`1️⃣ BRANDED - Suchen direkt nach dir: ${brandedClicks} Clicks (${((brandedClicks/totalClicks)*100).toFixed(1)}%)`);
    if (intentCategories.branded.length > 0) {
      intentCategories.branded.slice(0, 5).forEach(kw => {
        console.log(`   • "${kw.keyword}" - ${kw.clicks} clicks, Pos ${kw.position.toFixed(1)}`);
      });
    } else {
      console.log('   (Keine)');
    }
    console.log('');

    console.log(`2️⃣ TRANSACTIONAL - Bereit zu buchen: ${transactionalClicks} Clicks (${((transactionalClicks/totalClicks)*100).toFixed(1)}%)`);
    if (intentCategories.transactional.length > 0) {
      intentCategories.transactional.slice(0, 5).forEach(kw => {
        console.log(`   • "${kw.keyword}" - ${kw.clicks} clicks, Pos ${kw.position.toFixed(1)}`);
      });
    } else {
      console.log('   (Keine)');
    }
    console.log('');

    console.log(`3️⃣ COMMERCIAL - Vergleichen Optionen: ${commercialClicks} Clicks (${((commercialClicks/totalClicks)*100).toFixed(1)}%)`);
    if (intentCategories.commercial.length > 0) {
      intentCategories.commercial.slice(0, 5).forEach(kw => {
        console.log(`   • "${kw.keyword}" - ${kw.clicks} clicks, Pos ${kw.position.toFixed(1)}`);
      });
    } else {
      console.log('   (Keine)');
    }
    console.log('');

    console.log(`4️⃣ INFORMATIONAL - Nur am Lernen: ${informationalClicks} Clicks (${((informationalClicks/totalClicks)*100).toFixed(1)}%)`);
    if (intentCategories.informational.length > 0) {
      intentCategories.informational.slice(0, 5).forEach(kw => {
        console.log(`   • "${kw.keyword}" - ${kw.clicks} clicks, Pos ${kw.position.toFixed(1)}`);
      });
    } else {
      console.log('   (Keine)');
    }
    console.log('');

    console.log('='.repeat(70));
    console.log('\n💡 DIAGNOSE & EMPFEHLUNGEN:\n');

    const conversionReadyClicks = brandedClicks + transactionalClicks;
    const conversionReadyPercent = (conversionReadyClicks / totalClicks) * 100;

    console.log(`📊 Von ${totalClicks} Clicks sind nur ${conversionReadyClicks} (${conversionReadyPercent.toFixed(1)}%) "buchungsbereit"\n`);

    if (conversionReadyPercent < 30) {
      console.log('❌ HAUPTPROBLEM: Falscher Traffic-Typ!\n');
      console.log('Du bekommst hauptsächlich:');
      console.log('→ Informations-Sucher (Blog-Reader)');
      console.log('→ Vergleichs-Shopper (noch nicht bereit)');
      console.log('→ NICHT: Leute die JETZT einen Termin brauchen\n');

      console.log('✅ SOFORT-MAẞNAHMEN (wichtiger als mehr Blog-Artikel!):\n');
      console.log('1. 🎯 Google My Business');
      console.log('   → Erstelle/optimiere dein Google Business Profil');
      console.log('   → Erscheint im "Local Pack" (die Box mit 3 Praxen)');
      console.log('   → Das bringt SOFORT buchungsbereite Patienten\n');

      console.log('2. 📱 Google Ads (kurzfristig)');
      console.log('   → Budget: 200-300€/Monat für "osteopath hamburg"');
      console.log('   → Sofortige Sichtbarkeit, während SEO arbeitet');
      console.log('   → 1-2 Buchungen = ROI positiv\n');

      console.log('3. 🏥 Jameda, Doctolib, etc.');
      console.log('   → Viele Patienten buchen über diese Plattformen');
      console.log('   → Kostenlose Basis-Profile anlegen');
      console.log('   → Wichtiger als mehr Blog-Content!\n');

      console.log('4. 🔄 Conversion-Optimierung');
      console.log('   → Buchungs-Button prominenter machen');
      console.log('   → "Jetzt buchen" statt "Mehr erfahren"');
      console.log('   → Telefonnummer gut sichtbar (viele rufen lieber an)\n');

    } else {
      console.log('✅ Traffic-Intent ist gut!\n');
      console.log('❌ PROBLEM: Website-Conversion\n');
      console.log('Menschen kommen auf deine Seite, buchen aber nicht. Prüfe:');
      console.log('1. Ist der Buchungs-Button prominent genug?');
      console.log('2. Ist der Buchungsprozess zu kompliziert?');
      console.log('3. Fehlen Trust-Signale (Bewertungen, Qualifikationen)?');
      console.log('4. Ist die Telefonnummer gut sichtbar?');
    }

    console.log('\n' + '='.repeat(70));
    console.log('\n🎯 PRIORITÄTEN-RANKING:\n');

    if (conversionReadyPercent < 30) {
      console.log('1. Google My Business einrichten (HEUTE!)');
      console.log('2. Jameda-Profil erstellen (DIESE WOCHE)');
      console.log('3. Google Ads testen (200€ Budget)');
      console.log('4. Website-Conversion verbessern');
      console.log('5. Weiter SEO (aber niedriger prio als 1-4!)');
    } else {
      console.log('1. Website-Conversion optimieren (HEUTE!)');
      console.log('2. A/B Test: Verschiedene CTAs');
      console.log('3. Google My Business trotzdem machen');
      console.log('4. Vertrauenssignale hinzufügen');
    }

  } catch (error) {
    console.error('❌ Fehler:', error);
    if (error instanceof Error) {
      console.error(error.stack);
    }
  }
}

analyzeConversion();
