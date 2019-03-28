# Animal Types

[Back to JS docs](README.md)

Get information on animal types from Petfinder.

## List animal types

[Petfinder docs](https://www.petfinder.com/developers/v2/docs/#get-animal-types)

```js
client.animalData.types()
  .then(resp => {
    // Do something with resp.data.types
  });
```

## Get type details

[Petfinder docs](https://www.petfinder.com/developers/v2/docs/#get-a-single-animal-type)

```js
client.animalData.type('Dog')
  .then(resp => {
    // Do something with resp.data.type
  });
```
