# Animal Breeds

[Back to JS docs](README.md)

Get information about animal breeds from Petfinder.

## List breeds by type

[Petfinder docs](https://www.petfinder.com/developers/v2/docs/#get-animal-breeds)

```js
client.animalData.breeds('dog')
  .then(resp => {
    // Do something with resp.data.breeds
  });
```
