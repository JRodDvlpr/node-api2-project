
// ### Router ###
const router = require('express').Router();


// ### DATABASE  ###
const db = require('../../data/db');


// ### Routes for Comments ###

const commentRoutes = require('./comments/commentRoutes');

// ### Using Comments ROUTE ###

router.use('/', commentRoutes);



// ### Should return an array of all the objects that are inside the database ###

// ### GET Posts --> /api/posts ###
router.get('/', (req, res) => {
    db.find()
    .then(posts => {
        res.status(200).json(posts);
    })
    .catch(error => {
        res.status(500).json({errorMessage: "The posts information could not be retrieved."})
    })
})


// ###  Returns the object of the specific id ### 

// ### GET POSTS id ---> api/posts/:id ###
router.get('/:id', (req, res) =>{

    //Params id
    const id = req.params.id;

    db.findById(id)
    .then(post => {
        if(post.length > 0) {
            res.status(200).json(post);

        } else {
            res.status(404).json({errorMessage: "The post with the specified ID does not exist." });
        }
    })
    .catch(error => {
        res.status(500).json({errorMessage: "The post information could not be retrieved." });
    });
})



// ### Creates a Post using the information inside the body request ###

// ### POST Posts ---> api/posts ### 
router.post('/', (req, res) => {
    const { title, contents } = req.body;

    // ### validating post ###
    if (title && contents ) {

        // ### Adding new post to the Database ###
        db.insert(req.body)
            .then(postID => {

                // ### Returns the new post object data ### 
                db.findById(postID.id)

            .then(post => {
                res.status(201).json(post)
            })
            .catch(error => {
                res.status(500).json({error: "There was an error while saving the post to the database"});
            })
        });
    } else {
        res.status(400).json({errorMessage: "Please provide title and contents for the post."})
    }
})



// ### Updates the post with the specific id. It will use the data in the BODY and returns the modified object ###

// ### EDIT/PUT Posts ---> api/posts/:id
router.put('/:id', (req, res) => {

    //params id
    const id = req.params.id;

    const {title, contents } =req.body;

    // ### Validates post content
    if (title && contents) {
        // post is updated in database
        db.update(id, { title: title, contents: contents })
        .then(data => {
        if (data) {

            // ### Returns the new post object data ### 
            db.findById(id)

            .then(post => {
                res.status(200).json(post);
            })
            .catch(error => {
                res.status(500).json({ errorMessage: "There was an error retrieving post." });
                });
            } else {
              res.status(404).json({ errorMessage: "Post with specified ID not found." });
            }
        })
        .catch(error => {
            res.status(500).json({ errorMessage: "There was an error while saving the post to the database." });
        });
        } else {
        res.status(400).json({ errorMessage: "Please provide title and contents for the post." });
    }
})

// ### Delete the object by the specific id then returns the deleted post object ###

// ### DELETE Posts id ---> api/posts/:id ###
router.delete('/:id', (req, res) => {
    
    // Params id
    const id = req.params.id

    db.findById(id)
    .then(post => {
        if(post.length > 0) {
            db.remove(id)
            .then(() => {
                res.status(200).json({Success: true})
            })
            .catch(error => {
                res.status(500).json({errorMessage: "The post could not be removed" })
            })
            .catch(error => {
                res.status(404).json({errorMessage:"The post with the specified ID does not exist."})
            })
        }
    })
})



//Exporting the ROUTES
module.exports = router;