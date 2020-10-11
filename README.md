# spotify-gist-display
Upload your spotify like list to Gist.
You can show your musical interest to Github Profile.

## How to run?
Before running, you need to write down `.env` file.
```
RefreshToken=Spotify Authorization Refresh Token
GistId=Gist Uploaded to
GithubToken=gist owner token
```

and then, just run
```
deno run --allow-read --allow-net --allow-env ./index.ts
```
Or nodejs, replace `dotenv` script to compatible, and run `ts-node index.ts`.

## Contributor
[RyCont](https://github.com/rycont)