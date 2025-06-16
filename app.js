const express = require("express");
const app = express();
const mongoose = require("mongoose");
const port = 8080;
const Listing = require("./models/listings");
const Review = require("./models/review");
const initData = require("./init/data");
const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const { homedir } = require("os");
const wrapAsync = require("./utils/WrapAsync.js");
const ExpressError = require("./utils/ExpressError.js");
const { listingSchema, reviewSchema } = require("./schema.js");

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);

// middleware to validate the listing data
const validateListing = (req, res, next) => {
  let { error } = listingSchema.validate(req.body);
  if (error) {
    let msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, msg);
  } else {
    next();
  }
};

const validateReview = (req, res, next) => {
  let { error } = reviewSchema.validate(req.body);
  if (error) {
    let msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, msg);
  } else {
    next();
  }
};
// setting up mongoose DB

async function main() {
  await mongoose.connect(MONGO_URL);
}

main()
  .then((res) => {
    console.log("connected to database successfully...");
  })
  .catch((err) => {
    console.log("error occured! couldn't connect to database");
  });

const initDatabase = async () => {
  await Listing.deleteMany({});
  console.log("deleted old records!");
  await Listing.insertMany(initData.data);
  console.log("Database initialized successfully!");
};

app.get("/", (req, res) => {
  Listing.find()
    .then((result) => {
      res.render("listing/index.ejs", { listings: result });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/init", async (req, res) => {
  console.log("request received on default route");
  main()
    .then((res) => {
      console.log("connected to database successfully...");
      initDatabase();
    })
    .catch((err) => {
      console.log("error occured! couldn't connect to database");
    });
});

app.get("/listings", async (req, res) => {
  Listing.find()
    .then((result) => {
      res.render("listing/index.ejs", { listings: result });
    })
    .catch((err) => {
      console.log(err);
    });
});

// Listings - show route
app.get("/listings/:id", async (req, res) => {
  let listingId = req.params.id;
  console.log(listingId);
  Listing.findById(listingId)
    .populate("reviews")
    .then((result) => {
      console.log(result);
      res.render("listing/show.ejs", { listing: result });
    });
});

app.get("/listings/new", (req, res) => {
  res.render("listing/new.ejs");
});

app.put("/listings/:id", async (req, res) => {
  let id = req.params.id;
  const fetchedListing = req.body.listing;

  // actual updation
  const updatedlisting = await Listing.findByIdAndUpdate(
    id,
    {
      ...fetchedListing,
    },
    { new: true }
  );
  console.log(updatedlisting);
  res.redirect(`/listings/${id}`);
});

// new listing create route
app.post(
  "/listings/new",
  wrapAsync(async (req, res) => {
    if (!req.body.listing) {
      throw new ExpressError(
        400,
        "Invalid data received for new listing creation"
      );
    }
    try {
      let { title, description, price, image } = req.body.listing;

      // Create the listing object with the proper structure
      const newListing = new Listing({
        title,
        description,
        price,
        image: {
          url:
            image ||
            "https://images.unsplash.com/photo-1462823985959-022de68638a2?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          filename: "user-uploaded-image",
        },
      });

      await newListing.save();
      res.redirect("/listings"); // Redirect to listings page after saving
    } catch (err) {
      console.error(err);
      res.send("Error creating listing");
    }
  })
);

// Update: GET /id/edit & Put /listings/:id
app.get("/listings/:id/edit", async (req, res) => {
  let id = req.params.id;

  let property = await Listing.findById(id);
  res.render("listing/edit.ejs", { listing: property });
});

// Delete: DELETE /listings/:id  delete post with id
app.delete("/listings/:id", async (req, res) => {
  const id = req.params.id;
  Listing.findByIdAndDelete(id)
    .then((result) => {
      console.log(`successfully deleted listing with id ${id}`);
      res.redirect("/listings");
    })
    .catch((err) => {
      console.log("oops! Something went wrong while removing the listing");
    });
});

// Reviews
app.post("/listings/:id/reviews", async (req, res) => {
  let id = req.params.id;
  let listing = await Listing.findById(id);

  console.log(req.body.review);
  let newReview = new Review(req.body.review);

  listing.reviews.push(newReview);
  await newReview.save();

  await listing.save();
  await newReview.save();
  console.log("review added successfully!");
  res.redirect(`/listings/${id}`);
});

// delete review
app.delete("/listings/:id/reviews/:reviewId", async (req, res) => {
  console.log("delete request received for review");
  let id = req.params.id;
  let reviewId = req.params.reviewId;
  await Review.findByIdAndDelete(reviewId);
  console.log("review deleted successfully!");
  let updatedlisting = await Listing.findByIdAndUpdate(id, {
    $pull: { reviews: reviewId },
  });
  console.log("associated listing also updated successfully!");
  res.redirect(`/listings/${id}`);
});

// page not found error handler
app.all("*", (req, res, next) => {
  next(new ExpressError(404, "Page not found!"));
});
app.use((err, req, res, next) => {
  let { statuscode = 500, message = "something went wrong" } = err;
  res.status(statuscode).send(message);
});

app.listen(port, () => {
  console.log("server is up and listening on port", port);
});
