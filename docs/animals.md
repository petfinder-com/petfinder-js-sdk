# Animals

[Back to JS docs](README.md)

## Animal Search

Search for animals on Petfinder.

[Petfinder docs](https://www.petfinder.com/developers/v2/docs/#get-animals)

```js
// list all animals
client.animal.search()
  .then(resp => {
    // Do something with resp.data.animals
    resp.data.animals.forEach(function(animal) {
        console.log(` -- ${animal.name} id: ${animal.id} url: ${animal.url}`);
    })
    // If wanting more than limit items, need to fetch additional pages (ex. page: 2, ...),
    // resp.data.pagination has pagination info
  });

// limit animal search results. See full docs for all available parameters.
client.animal.search({
  type: "Dog",
  breed: "Bernedoodle",
  page: 1,
  limit: 100,
}).then(resp => {
  // Do something with resp.data.animals
});
```

## Animal Get

Shows a specific animal (using the id from the above search)

[Petfinder docs](https://www.petfinder.com/developers/v2/docs/#get-animal)

```js
client.animal.show(12345)
  .then(resp => {
    // Do something with resp.data.animal
  });
```
