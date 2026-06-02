. C:\Users\TomCool\Dev\infra\Get-Secret.ps1
$env:CLOUDFLARE_API_TOKEN = Get-Secret 'CLOUDFLARE_API_TOKEN'
npx.cmd wrangler pages project create hfamilie --production-branch main
