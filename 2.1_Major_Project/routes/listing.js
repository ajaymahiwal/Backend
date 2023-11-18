const express = require("express");
const router = express.Router();
const Listing = require("../Models/listing.js");
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const {listingSchema} = require("../SchemaValidation.js")
const {isLoggedIn,isOwner} = require("../middlewares/middleW.js");

const listingController = require("../controllers/listings.js");



const validateListingData = (req,res,next)=>{
    // JOI Validation Used Here
    let {error} = listingSchema.validate(req.body);
    console.log(error);
    if(error){
        // throw new ExpressError(400, error);
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errMsg);
    }
    else{
        next();
    }
}



router
    .route("/")
    .get(wrapAsync(listingController.index)) //Show All listing
    .post(isLoggedIn,
        validateListingData,
        wrapAsync(listingController.createListing)) 
    

router.get("/new",
            isLoggedIn,
            wrapAsync(listingController.renderNewListingForm));


//Show One (Read)
router
    .route("/:id")
    .get(wrapAsync(listingController.showOneListing))
    .put(
        isLoggedIn,
        isOwner,
        wrapAsync(listingController.updateListing))
    .delete(
        isLoggedIn,
        isOwner,
        wrapAsync(listingController.destroyListing));



// Render EDIT form
router.get("/:id/edit",
            isLoggedIn,
            isOwner, 
            wrapAsync(listingController.renderEditForm));






module.exports = router;