# [glutesha.me](https://glutesha.me)

The astro-flavored remix of my personal website, made for the [Hackclub Midnight](https://midnight.hackclub.com/?code=2936). Featuring minor server-side rendered features and a lot more swag than the previous one.

![Screenshot 2025-12-20 at 18.22.19.png](screenshots/Screenshot%202025-12-20%20at%2018.22.19.png)

## Enrironment

You need to set environment variables for the server as in `.env_sample`

```
LASTFM_API_KEY=your_lastfm_key
LASTFM_USER=lastfm_username
LASTFM_BASE_URL=https://ws.audioscrobbler.com/2.0/
WEBRING_BASE_URL=https://webring.otomir23.me/
WEBRING_SLUG=your_slug
```

## Build

Build the container using included `Dockerfile`:
`docker build -t <your-image-name> .`

## Deploy

Deploy docker image using command line or compose.

### Examples

Command line: `docker pull --platform=linux/amd64 ghcr.io/glutesha/personal-website-remix:main && docker run -p 4321:4321 --platform=linux/amd64 ghcr.io/glutesha/personal-website-remix:main`  
Compose:

```services:
  personal_website:
    image: ghcr.io/glutesha/personal-website-remix:main
    container_name: personal_website
    restart: always
```
