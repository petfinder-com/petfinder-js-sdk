# Animals

[Back to JS docs](README.md)

Search animals on Petfinder.

## List all animals

[Petfinder docs](https://www.petfinder.com/developers/v2/docs/#get-animals)

```js
client.animal.search()
  .then(resp => {
    // Do something with resp.data.animals
  });
```

## Search animals

[Petfinder docs](https://www.petfinder.com/developers/v2/docs/#get-animals)

```js
client.animal.search({type: "Dog"})
  .then(resp => {
    // Do something with resp.data.animals
  });
```

## Get single animal

[Petfinder docs](https://www.petfinder.com/developers/v2/docs/#get-animal)

```js
client.animal.show(12345)
  .then(resp => {
    // Do something with resp.data.animal
  });
```
