

const Listing = require("../Models/listing.js");


module.exports.index = async (req,res)=>{
    let list = await Listing.find({});
    
    // console.log(list);
    res.render("./list/listing.ejs",{list});
}


module.exports.renderNewListingForm = async(req,res)=>{
    res.render("./list/newItem.ejs");
}


module.exports.createListing = async(req,res,next)=>{

    const item = new Listing(req.body.itemDetails);
    item.owner = req.user._id;
    await item.save(); 
    req.flash("success","New Listing Added !");
    res.redirect("/listings");
}


module.exports.showOneListing = async (req,res)=>{
    let {id} = req.params;
    let item = await Listing.findById(id).populate({
        path:"reviews",
        populate:{
            path:"owner",
        },
    })
    .populate("owner");

    if(!item){
        req.flash("error","Listing You requested for does not exist !");
        res.redirect("/listings");
    }
    // console.log(item);
    res.render("./list/show.ejs",{item});
}


module.exports.renderEditForm = async (req,res)=>{
    let {id} = req.params;
    let item = await Listing.findById(id);
    if(!item){
        req.flash("error","Listing You requested for does not exist !");
        res.redirect("/listings");
    }
    // console.log(item);
    res.render("./list/edit.ejs",{item});
}


module.exports.updateListing = async (req,res)=>{
    let {id} = req.params;
    if(!req.body.itemDetails){
        next(new ExpressError(400,"Send Valid Data In Listing."))
    }
    let updatedItem = await Listing.findByIdAndUpdate(id,{...req.body.itemDetails},{runValidators:true,new:true});
    // console.log(updatedItem);
    req.flash("success","Listing Updated !");

    res.redirect(`/listings/${id}`);
}


module.exports.destroyListing = async (req,res)=>{
    let{id} = req.params;
    let deletedItem = await Listing.findByIdAndDelete(id);
    // console.log(deletedItem);
    console.log("Listing Deleted");
    req.flash("success","Listing Deleted !");
    res.redirect("/listings");
}