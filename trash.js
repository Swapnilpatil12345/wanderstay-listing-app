// reusabble code
// 1
let {title,description,price,location,country} = req.body;
  let newListing = new listing({
    title,
    description,
    price,
    location,
    country
  })
  
newListing.save().then((result)=>{
    console.log("New listing created successfully");
    res.redirect("/listings");
  })
  .catch((err)=>{
    console.log("Error occured while creating new listing");
  })
  res.render("/listings/new.ejs")



// 2
res.render("index.ejs",{listings:listing})
  console.log("request received on /listings route");
  res.send("Connecting to database ....");
 
  console.log("Successfully connected to database");

  let newlisting = new listing({
    title: "Beautiful Villa",
    description: "This is a beautiful villa in the heart of the city",
    price: 1000,
    location: "City Center",
    country: "USA",
  });

  newlisting
    .save()
    .then((result) => {
      console.log("Newlisting saved successfully");
    })
    .catch((err) => {
      console.log("Error occured while saving newlisting");
    });

    // 3. update route without deconstructor ...
    const updatedlisting = await Listing.findByIdAndUpdate(
      id,
      {
        _id:id,
        title:fetchedListing.title,
        description:fetchedListing.description,
        price:fetchedListing.price,
        location:fetchedListing.location,
        country:fetchedListing.country
      },
      {new:true}
    )
    console.log(updatedlisting);
    res.redirect("/listings")