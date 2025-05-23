# Markdown API Backend
Docs Page: https://md-api-backend.vercel.app/viewer/YikYZR

## Notice
Old content will NOT be transfered to the new Database, and the testing and the new Prod one as well. If you have data in the DB, I will export it and put the DB here. Since there is not any personal info (I hope you didn't use it as a place to store your passwords...) (or just move it? I looked at the supabase documentation and it may work?

DB: https://archive.yhw.tw/projects/markdown-backend/ (Some where here if I can't move

### Want to use your local device?
This project uses bun, but you can still use npm by changing all the bun -> npm :)
```bash
git clone https://github.com/hpware/md-api-backend.git --depth=1
cd md-api-backend
bun install
bun run dev
```
## The Stack:
This project uses:
- Some legacy supabase db stuff
- PostgreSQL (Hosted on Zeabur for now)
- Nitro Build
- Bun
- uuidV4
- Hackclub Nest
## About this project:
This is a project I've been thinking about a while, a platform where you can put, store, and view markdown files, all self host-able. In December last year (2024), I build this platform (https://markdown.yuanhau.com ) using VueJS, Vite and Marked. To build a really bad front end for my markdown files stored on CloudFlare R2 or Github Pages.  I need a backend to push for my post, I have not found any **free** solutions, so I made my own, built with Nitro build. 

## What I can Improve
### 1. Switch off of Supabase
There is nothing wrong with supabase, but it's just a wrapper for postgres, which I really want to directly access from the Javascript code.

Progress: ✅

### 2. Use the same auth key
For now, new slugs aka markdown posts, can be only deleted if the owner of the content (or me) decides to delete the contents, in the near future, the platform will allow multiple slugs (or contents) to be edited with one key, and one key only.

Progress: ❎

### 3. SQL injection
After updating to postgres, this api is vunerable to SQL injection, this will be fixed sometime soon, for now the database will NOT be using the hackcub nest postgres database. In case my other app are affected.

## How to use
### /
#### (GET)
This endpoint redirects to this Github Repo.
###  /{slug} 
#### (GET)
This directly gives the frontend / the user the markdown file from the database

##### Data (Success):
```markdown
### Hello World
```

##### Data (On Fail): 
```markdown
### Oops! An error has accoured
    Error: 
```

##### Data (Not Found):
```markdown
### Content not found
```

Try it out: https://md-api-backend.vercel.app/3g8v17

Via Curl: 
```bash
curl --request GET \
  --url https://md-api-backend.vercel.app/3g8v17 \
  --header 'User-Agent: insomnia/10.3.1'
```

### /json/{slug}
#### (GET)
(You can also use /{slug}/json, whatever you like the most)
This gives you a json compatible interface that displays the date when the markdown is published, the slug, and the content, where developers can use this api to do stuff, to make the app better.

##### Data (Success):
```json
{
  "slug": "3g8v17",
  "content": "## Hello World",
  "date_created": null,
  "error": false,
  "errordata": null
}
```

##### Data (Fail):
```json
{
  "slug": null,
  "content": "## Oops! An error has accoured\n          Error: hi\n        ",
  "date_created": null,
  "error": true,
  "errordata": {}
}
```

##### Data (Not found):
```json
{
  "error": null,
  "data": null,
  "count": null,
  "status": 200,
  "statusText": "OK"
}
```

Try it out: https://md-api-backend.vercel.app/json/3g8v17

Via Curl: 
```bash
curl --request GET \
  --url https://md-api-backend.vercel.app/json/3g8v17 \
  --header 'User-Agent: insomnia/10.3.1'
```

### /api/health
#### (GET)
This api endpoint just checks if the database is still working properly, nothing else.

##### Data (Healthy): 
```json
{
  "status": "healthy",
  "error": null,
  "timestamp": "2025-02-22T17:18:49.046Z",
  "database": {
    "status": "connected"
  }
}
```

##### Data (Not Healthy): 
```json
{
  "status": "not healthy",
  "error": {
    "message": "",
    "statusCode": 500
  },
  "timestamp": "2025-02-22T17:18:49.046Z",
  "database": {
    "status": "unavailable"
  }
}
```

Try it out: https://md-api-backend.vercel.app/api/health

Via Curl: 
```bash
curl --request GET \
  --url https://md-api-backend.vercel.app/api/health \
  --header 'User-Agent: insomnia/10.3.1'
```
### /api/markdown/index
#### (POST)
This gives the user a way to publish their markdown, anonymously done.
##### Data (Healthy): 
```json
{
	"slug": "slug-here",
	"password": "your-protection-token-here",
	"error": null
}
```

##### Data (Not Healthy): 
```json
{
	"slug": null,
	"password": null,
	"error": {}
}
```

Try it out: https://md-api-backend.vercel.app/api/markdown/index 

Via Curl: 
```bash
curl --request POST \
  --url https://md-api-backend.vercel.app/api/markdown \
  --header 'Content-Type: text/plain' \
  --header 'User-Agent: insomnia/10.3.1' \
  --data 'your-markdown-here'
```
### /api/action/{token}
#### (POST)
When you put a post request request on this endpoint, you can change the contents of the slug associated with that token, 
##### Data (Healthy): 
```json
{
	"slug": "your-slug-here",
	"error": null
}
```

##### Data (Not Healthy): 
```json
{
	"slug": null,
	"error": {}
}
```

Try it out: https://md-api-backend.vercel.app/api/action/e58872c3-5c2d-4d1e-8cd6-32385a538682

Via Curl: 
```bash
curl --request POST \
  --url https://md-api-backend.vercel.app/api/action/e58872c3-5c2d-4d1e-8cd6-32385a538682 \
  --header 'Content-Type: text/plain' \
  --header 'User-Agent: insomnia/10.3.1' \
  --data 'your-markdown-here'
```

#### (DELETE)
This is the endpoint where you can delete your published markdown, just use the same link to POST and DELETE (I hope you don't make any whoopsies)
##### Data (Healthy): 
```json
{
	slug: "slug-here",
    status: "success",
    error: null
}
```

##### Data (Not Healthy): 
```json
{
    slug: null,
    status: "failed",
    error: {}
}
```

Create it: [[#/api/markdown/index]]

Try it out: https://md-api-backend.vercel.app/api/action/{your-token}

Via Curl: 
```bash
curl --request DELETE \
  --url https://md-api-backend.vercel.app/api/action/{your-token} \
  --header 'User-Agent: insomnia/10.3.1' 
```

### /viewer/{slug}
This only redirect to my project I told earlier.

Try it out: https://md-api-backend.vercel.app/viewer/3g8v17