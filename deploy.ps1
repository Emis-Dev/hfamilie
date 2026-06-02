# Build the project
npm run build

# Get Cloudflare token (triggers Duo MFA push)
. C:\Users\TomCool\Dev\infra\Get-Secret.ps1
$env:CLOUDFLARE_API_TOKEN = Get-Secret 'CLOUDFLARE_API_TOKEN'

# Deploy dist directory to Cloudflare Pages
npx.cmd wrangler pages deploy dist --project-name=hfamilie --branch=main --commit-dirty=true
