
// ### ROUTER 
const router = require('express').Router();

// ### DATABASE ###
const db = require('../../../data/db');

// ### GET Comments /api/posts/:id/comments 
// ### Returns an array of all the comment objects associated by the specific id.

router.get('/:id/comments', (req, res) => {
    // Params id
    const id = req.params.id;
     
    // ### Finding if a post exist with the specific id
    db.findById(id)
    .then(post =>{
        if (post.length > 0 ){
            // Finding comments associated to id
            db.findPostComments(id)
            .then(comments => {
                if (comments.length > 0 ){
                    res.status(200).json(comments);
                }else {
                    res.status(404).json({errorMessage: "No comments for this post."  })
                }
            })
            .catch(error => {
                res.status(500).json({errorMessage: "The comments information could not be retrieved." })
            });
        } else {
            res.status(404).json({ errorMessage: "The post with the specified ID does not exist." })
        }
    })
   

})

// ### POST Comments /api/posts/:id/comments  ###
router.post('/:id/comments', (req, res) => {
    // Params id
    const id = req.params.id;

    //Comment Text Input
    const { text } =req.body;
    // ## Validate text
    if (text) {
        //Find if post with id exist
        db.findById(id)
        .then(post => {
            if(post.length > 0 ){
                //Add Comment to the post/db
                db.insertComment({ text: text, post_id: id})
                .then(() => {
                    res.status(201).json({Success: true, text: text});
                })
                .catch(error => {
                    res.status(500).json({errorMessage: "There was an error while saving the comment to the database"});
                })
            } else {
                res.status(404).json({errorMessage:"The post with the specified ID does not exist."});
            }
        })
        .catch(error => {
            res.status(500).json({errorMessage: "Post information could not be retrieved."});
        });
    } else {
        res.status(400).json({errorMessage: "Please provide text for the comment."});
    }
});

// ### Exporting Route
module.exports = router;