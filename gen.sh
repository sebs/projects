node scripts/generate-stats.js > stats.json
node scripts/generate.js > README.md
git add . 
git commit -m "bump" .
git push 
