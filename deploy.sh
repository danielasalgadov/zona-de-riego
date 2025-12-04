#!/bin/bash

# Zona de Riego - GitHub Deployment Script

echo "🚀 Deploying Zona de Riego to GitHub..."

# Initialize git if needed
if [ ! -d ".git" ]; then
  git init
  echo "✓ Git initialized"
fi

# Add all files
git add .
echo "✓ Files staged"

# Commit
git commit -m "Deploy Zona de Riego website"
echo "✓ Changes committed"

# Add remote if not exists
if ! git remote | grep -q "origin"; then
  git remote add origin https://github.com/danielasalgadov/zonaderiego.git
  echo "✓ Remote added"
fi

# Set branch to main
git branch -M main
echo "✓ Branch set to main"

# Push to GitHub
echo "📤 Pushing to GitHub..."
git push -u origin main --force

echo "✅ Deployment complete!"
echo ""
echo "Next steps:"
echo "1. Go to https://vercel.com"
echo "2. Import your repository: danielasalgadov/zonaderiego"
echo "3. Add environment variables from .env.vercel.txt"
echo "4. Deploy!"
