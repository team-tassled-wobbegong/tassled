# Coming Soon...git

TEST

## Github Application URL

https://github.com/organizations/team-tassled-wobbegong/settings/applications/1387523

App ID:
`83414`

https://docs.github.com/en/free-pro-team@latest/developers/apps/authenticating-with-github-apps#authenticating-as-an-installation

## Helpful resources

```
curl -i -H "Authorization: Bearer YOUR_JWT" -H "Accept: application/vnd.github.machine-man-preview+json" https://api.github.com/app
```

```
curl -i -H "Authorization: Bearer YOUR_JWT" -H "Accept: application/vnd.github.v3+json" https://api.github.com/app
```

Generate a public PEM key from a private PEM key. Neccessary to create the JWT used with Github App ID to get the App Access Token.

```
openssl rsa -in fullstack.private-key.pem -pubout
```

Available OAuth Scopes
https://docs.github.com/en/free-pro-team@latest/developers/apps/scopes-for-oauth-apps#available-scopes

Repository API Endpoints
https://developer.github.com/v3/repos/#create-repository-using-a-repository-template

Repo Endpoint Scope
https://developer.github.com/v3/repos/#oauth-scope-requirements-1
