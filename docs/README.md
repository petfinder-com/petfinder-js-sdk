# Petfinder JS SDK

## v2 API

All API calls require authentication. See [Authentication](authentication.md).

* [Animal Types](types.md)
* [Animal Breeds](breeds.md)
* [Animals](animals.md)
* [Organizations](organizations.md)

## Additional features

* [Authentication](authentication.md)
* [Errors](errors.md)

## Quick Sample Code
`  const client = new petfinder.Client({ apiKey: "your-api-key", secret: "your-secret"});

   async function showAnimals( animalType, searchBreed ){
      let page = 1
      do {
        apiResult = await client.animal.search({
          type: animalType, 
          breed: searchBreed, page, limit: 100} );
        
        let dogIdx = (page-1)*100;
        apiResult.data.animals.forEach( function( animal ){
          console.log( ` -- ${++dogIdx}: ${animal.name} id: ${animal.id} url: ${animal.url}` )
        })

        page++

      } while( apiResult.data.pagination && apiResult.data.pagination.total_pages >= page ) 
   }

   showAnimals( "Dog", "Bernedoodle" )
