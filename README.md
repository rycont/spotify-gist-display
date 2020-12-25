# spotify-gist-display
Upload your spotify like list to Gist.
You can show your musical interest to Github Profile.

## How to run?
Before running, you need to write down `.env` file.
```
RefreshToken=Spotify Authorization Refresh Token
GistId=Gist Uploaded to
GithubToken=gist owner token
BasicAuthenticator=B64 encoded `{ClientID}:{ClientSecret}` (Spotify)
```

and then, just run
```
deno run --allow-read --allow-net --allow-env ./index.ts
```
Or nodejs, replace `dotenv` script to compatible, and run `ts-node index.ts`.

## How to get Tokens?
### Spotify
Create your own spotify app here
https://developer.spotify.com/

Fill below blanks, and go to filled link to log in. After signing in, extract `code` parameter from redirected uri.
https://accounts.spotify.com/en/authorize?response_type=code&client_id={CLIENT_ID}&scope=user-read-private&redirect_uri={VALID_REDIRECT_URL}

Send POST request with below information.
```
URI: https://accounts.spotify.com/api/token
Authorization: Basic(ClientID and Client Secret)
Body(application/x-www-form-urlencoded): {
    "grant_type": "authorization_code",
    "code": extracted from before step,
    "redirect_uri": valid redirect url
}
```
in the response, you can get refresh_token. The `Authorization` value will be used for env `BasicAuthenticator`(which would not contain `Basic `)
### Github
Github Token : https://github.com/settings/tokens
which should be able to `create gist`

## Contributor
[RyCont](https://github.com/rycont)