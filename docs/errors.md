# Handling Errors

[Back to JS docs](README.md)

When making requests, you may run into errors. The SDK includes an error type
to help you work with errors from API calls. The error includes both the
`request` and `response` along with some [problem details](https://tools.ietf.org/html/rfc7807)
information (`type`, `status`, `details`) along with an optional `invalidParams`
property if the request was caused by invalid parameters.

```js
client.animal.search({type: "Dragon"})
  .catch(err => {
    console.log(err.request, err.response);
    // See invalid parameters `err.invalidParams`
  });
```

For more information about errors on Petfinder, view the [error docs](https://www.petfinder.com/developers/v2/docs/#errors).
