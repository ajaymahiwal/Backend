

<!-- ye use hota hai taki backend parse ker ske media files ko jse vo form ka data parse ker skta hai urlencoded -->
[Multer Package](https://www.npmjs.com/package/multer) <br>


const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })

.post(upload.single('itemDetails[image][url]'),(req,res)=>{
    res.send(req.file);
})


.env file 
dotenv package : taki .env variable ko access ker ske fir other files mein 

coludinaary kuch namme hai vha account bna 
fir connect kerna hai uske sath uske liye ak or package hai 
npm i cloudinary
npm i multer-storage-cloudinary



<!--  for delete image from cloudinary
cloudinary.v2.api
  .delete_resources(['wanderlust_DEV/ka9nud7sceynnikfjoxl'], 
    { type: 'upload', resource_type: 'image' })
  .then(console.log); 
  -->

----
----

# MapBox

  **Mapbox Public Token: pk.eyJ1IjoiZGVsdGEtc3R1ZHVlbnQiLCJhIjoiY2xvMDk0MTVhMTJ3ZDJrcGR5ZDFkaHl4ciJ9.Gj2VU1wvxc7rFVt5E4KLOQ**

  [mapbox-docs](https://docs.mapbox.com/mapbox-gl-js/example/simple-map/) <br>

  [mapbox-sdk](https://github.com/mapbox/mapbox-sdk-js) <br>

----

## Other Important Topics

**GeoCoding and its type forward and reverse**
[GeoCoding](https://docs.mapbox.com/help/getting-started/geocoding/) <br>

**GeoJSON**
[geojson](https://mongoosejs.com/docs/geojson.html) <br>

**Add a marker**
[Map Marker](https://docs.mapbox.com/mapbox-gl-js/example/add-a-marker/)
[Marker Properties](https://docs.mapbox.com/mapbox-gl-js/api/markers/)

----

npm install @mapbox/mapbox-sdk