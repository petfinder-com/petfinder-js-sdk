# Animal Search

[Back to JS docs](README.md)

Search for animals on Petfinder.
[Petfinder docs](https://www.petfinder.com/developers/v2/docs/#get-animals)

```js
client.animal.search({
  type: "Dog",
  breed: "Bernedoodle",
  page: 1,
  limit: 100 
})
  .then( resp => {    
    // Do something with resp.data.animals
    resp.data.animals.forEach( function( animal ){
       console.log( ` -- ${animal.name} id: ${animal.id} url: ${animal.url}` )
    })
    // If wanting more than limit items, need to fetch additional pages (ex. page: 2, ...),
    // resp.data.pagination has pagination info
  });
```
_Note: search() can have no parameters which would return the full list, or if given parameters as above, it would restrict the list to the matches._


## Animal Get

Shows a specific animal (using the id from the above search)
[Petfinder docs](https://www.petfinder.com/developers/v2/docs/#get-animal)

```js
client.animal.show(12345)
  .then(resp => {
    // Do something with resp.data.animal
  });
```
