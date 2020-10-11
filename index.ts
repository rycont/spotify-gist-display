import "https://deno.land/x/dotenv/load.ts";

interface Track {
    track: {
      album: {
        name: number
        uri: number
        images: {
            height: number
            width: number
            url: string
        }[]
      },
      artists: {
        external_urls: {
            spotify: string
        },
        id: "3Nrfpe0tUJi4K4DXYWgMUX",
        name: "BTS",
        type: "artist",
      }[]
      duration_ms: number,
      external_urls: { spotify: string },
      href: string
      id: string
      name: string
      preview_url: string
    }
}

(async () => {
    const [RefreshToken, GistId, GithubToken] = ['RefreshToken', 'GistId', 'GithubToken'].map(Deno.env.get)
    if (!(RefreshToken && GistId && GithubToken)) throw "Requierd env was not provided"

    const { access_token, token_type } = await (await fetch("https://accounts.spotify.com/api/token", {
        body: new URLSearchParams({
            grant_type: 'refresh_token',
            refresh_token: RefreshToken
        }),
        method: 'POST',
        headers: {
            Authorization: 'Basic MGFlMWNhYzBhNjlmNDM3MTg3YmE2ZDg4Nzc3ZDIxMjA6MGNjMzc2MTJmOGVkNGNjNjg3NDYwYzYwN2RhNDM4MTE='
        }
    })).json()
    
    const tracks = (await (await fetch('https://api.spotify.com/v1/me/tracks', {
        headers: {
            Authorization: token_type + ' ' + access_token
        }
    })).json()).items as Track[]

    console.log(tracks[0].track.album)

    const pritified = (tracks.map((e, i) =>
        `[${e.track.name}] - ${e.track.artists.map(e => e.name).join(', ')}`
    ).join('\n'))

    fetch(`https://api.github.com/gists/${GistId}`, {
        headers: {
          'Authorization': `token ${GithubToken}`, 
        },
        body: JSON.stringify({
          "files": {
              "I Listen...": {
              "content": `🎵 Updated automatically from Spotify
${pritified}

Created from Deno with Github Actions!`
              }
          }
        }),
        method: 'PATCH'
      })
})()