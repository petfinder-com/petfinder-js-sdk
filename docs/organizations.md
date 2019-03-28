# Organizations

[Back to JS docs](README.md)

Search animal welfare organizations on Petfinder.

## List all organizations

[Petfinder docs](https://www.petfinder.com/developers/v2/docs/#get-organizations)

```js
client.organization.search()
  .then(resp => {
    // Do something with resp.data.organizations
  });
```

## Search organizations

[Petfinder docs](https://www.petfinder.com/developers/v2/docs/#get-organizations)

```js
client.organization.search({location: "Minneapolis, MN"})
  .then(resp => {
    // Do something with resp.data.organizations
  });
```

## Get single organization

[Petfinder docs](https://www.petfinder.com/developers/v2/docs/#get-organization)

```js
client.organization.show("MN423")
  .then(resp => {
    // Do something with resp.data.organization
  });
```
