# Environment Variables

All variables used across the frontend and Lambda.

---

## Frontend — `.env`

Copy `.env.example` to `.env` before running locally:

```bash
cp .env.example .env
```

| Variable | Example | Required | Description |
|---|---|---|---|
| `VITE_SUPABASE_URL` | `https://rsxbmgusdiilcajuoxmk.supabase.co` | ✅ | Supabase project URL |
| `VITE_SUPABASE_ANON_KEY` | `sb_publishable_...` | ✅ | Supabase anon/public key |
| `VITE_IMAGE_LAMBDA_URL` | `https://ewf03ybvmc.execute-api.eu-north-1.amazonaws.com` | ✅ | API Gateway base URL (no trailing slash) |
| `VITE_CDN_URL` | `https://tensor-labz-store.s3.eu-north-1.amazonaws.com` | ✅ | S3 public URL base (or CloudFront) |
| `VITE_S3_BUCKET` | `tensor-labz-store` | ✅ | S3 bucket name |
| `VITE_S3_REGION` | `eu-north-1` | ✅ | S3 bucket region |
| `VITE_SHEET_URL` | `https://sheets.googleapis.com/v4/spreadsheets/...` | Legacy | Google Sheets API — kept for backward compat |

!!! warning "Never commit `.env`"
    `.env` is in `.gitignore`. Only `.env.example` (with placeholder values) is committed.

!!! tip "VITE_ prefix"
    Only variables prefixed with `VITE_` are exposed in the browser bundle. Never put AWS credentials here — use the Lambda instead.

---

## Frontend — Amplify (production)

These must also be added in the **AWS Amplify Console** → your app → **Environment variables**:

```
VITE_SUPABASE_URL
VITE_SUPABASE_ANON_KEY
VITE_IMAGE_LAMBDA_URL
VITE_CDN_URL
VITE_S3_BUCKET
VITE_S3_REGION
```

Set via CLI:

```bash
aws amplify update-app \
  --profile tensor \
  --app-id <AMPLIFY_APP_ID> \
  --environment-variables \
    VITE_SUPABASE_URL=https://rsxbmgusdiilcajuoxmk.supabase.co,\
    VITE_SUPABASE_ANON_KEY=sb_publishable_...,\
    VITE_IMAGE_LAMBDA_URL=https://ewf03ybvmc.execute-api.eu-north-1.amazonaws.com,\
    VITE_CDN_URL=https://tensor-labz-store.s3.eu-north-1.amazonaws.com,\
    VITE_S3_BUCKET=tensor-labz-store,\
    VITE_S3_REGION=eu-north-1
```

---

## Lambda — Configuration → Environment variables

Set in the **AWS Lambda Console** under **Configuration → Environment variables**:

| Variable | Example | Description |
|---|---|---|
| `SUPABASE_JWT_SECRET` | `fdfc512a-e484-...` | JWT HS256 secret from Supabase Settings → API → JWT Secret |
| `S3_BUCKET` | `tensor-labz-store` | S3 bucket name |
| `S3_REGION` | `eu-north-1` | S3 bucket region |
| `CDN_URL` | `https://tensor-labz-store.s3.eu-north-1.amazonaws.com` | Base URL for public asset URLs stored in Supabase |
| `ALLOWED_ORIGIN` | `https://tensorlabz.com` | CORS `Access-Control-Allow-Origin` value (`*` for dev) |

Set via CLI:

```bash
aws lambda update-function-configuration \
  --profile tensor \
  --region eu-north-1 \
  --function-name tensor-labz-image-handler \
  --environment "Variables={
    SUPABASE_JWT_SECRET=<secret>,
    S3_BUCKET=tensor-labz-store,
    S3_REGION=eu-north-1,
    CDN_URL=https://tensor-labz-store.s3.eu-north-1.amazonaws.com,
    ALLOWED_ORIGIN=*
  }"
```

---

## Where to find secrets

| Secret | Location |
|---|---|
| `VITE_SUPABASE_URL` | Supabase → Settings → API → Project URL |
| `VITE_SUPABASE_ANON_KEY` | Supabase → Settings → API → `anon` `public` key |
| `SUPABASE_JWT_SECRET` | Supabase → Settings → API → JWT Secret |
| AWS credentials | AWS Console → IAM → Users → Security credentials |
