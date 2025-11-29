#!/bin/bash

# PostHog Environment Variables in Vercel setzen
# Nutzung: ./scripts/setup-posthog-vercel.sh

echo "🔧 Setting up PostHog in Vercel..."
echo ""

# Check if logged in to Vercel
if ! npx vercel whoami &>/dev/null; then
  echo "❌ Not logged in to Vercel. Please run:"
  echo "   npx vercel login"
  echo ""
  exit 1
fi

echo "✅ Logged in to Vercel"
echo ""

# Add NEXT_PUBLIC_POSTHOG_KEY
echo "📝 Adding NEXT_PUBLIC_POSTHOG_KEY..."
echo "phc_f5bZrbN4BoQ6RPpxzO3m7IgITBvn34W8mKHjnhSoJo1" | npx vercel env add NEXT_PUBLIC_POSTHOG_KEY production preview development

# Add NEXT_PUBLIC_POSTHOG_HOST
echo "📝 Adding NEXT_PUBLIC_POSTHOG_HOST..."
echo "https://eu.i.posthog.com" | npx vercel env add NEXT_PUBLIC_POSTHOG_HOST production preview development

echo ""
echo "✅ Environment variables added!"
echo ""
echo "🔄 Next steps:"
echo "1. Trigger redeploy: npx vercel --prod"
echo "2. Wait ~2 minutes for deployment"
echo "3. Test: Open https://www.osteoalsen.de and check browser console for 'PostHog loaded'"
echo ""
