# Authentication

[Back to JS docs](README.md)

The Petfinder API uses OAuth2 for authentication. You trade your API key and
secret for an access token. This token has a short lifespan (1 hour). For more
information see the [Petfinder Documentation](https://www.petfinder.com/developers/v2/docs/#using-the-api).

Authentication is handled automatically by the SDK. If the client hasn't been
authenticated that session, it will automatically fetch an access token using
the API key and secret you used when creating the client.

If you need to manually authenticate your session (for example, if you use
`client.http` directly), you can call the `authenticate` method.

```js
client.authenticate();
```

This returns the OAuth response, so you could cache the access token and
improve the performance of your application by not having to get an access
token for every request. Be aware that access tokens expire.

```js
client.authenticate()
  .then(resp => {
    const token = resp.data.access_token;
    const expires = resp.data.expires_in;
  });
```

If you have an access token, you can add it via the authenticate method, as follows:

```js
client.authenticate("my-access-token");
```

You can also add the access token when creating the client as follows:

```js
import { Client } from "@petfinder/petfinder-js";

const client = new Client({
  apiKey: "my-api-key",
  secret: "my-api-secret",
  token: "my-access-token",
});
```
