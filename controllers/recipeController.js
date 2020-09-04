const db = require("../models");

module.exports = {
    create: function (req, res) {
        db.Recipe.create(req.body)
            .then(dbRecipe => {
                return db.User.findOneAndUpdate(
                    { username: dbRecipe.user },
                    { $push: { recipes: dbRecipe._id } },
                    { new: true }
                );
            })
            .then(dbUser => {
                res.json(dbUser);
            })
            .catch(err => {
                res.status(422).json(err);
            });
    },
    update: function (req, res) {
        db.Recipe.update(req.body)
            .then(dbRecipe => {
                return db.Recipe.findOneAndUpdate(
                    { username: dbRecipe.user },
                    { $push: { recipes: dbRecipe._id } },
                    { new: true }
                );
            })
            .then(dbRecipe => {
                res.json(dbRecipe);
            })
            .catch(err => {
                res.status(422).json(err);
            });
    },

    delete: function (req, res) {
        db.Recipe.deleteOne({ _id: req.params.id })
            .then(result => {
                res.json(result);
            })
            .catch(err => {
                res.status(422).json(err);
            });
    },
    addComment: function (req, res) {
        const newComment = {
            user: req.body.user,
            comment: req.body.comment,
        }
      db.Comment.create(newComment)
      .then(dbComment => {
        return db.Recipe.findOneAndUpdate(
            { _id: req.body.recipe},
            { $push: { comments: dbComment._id  } },
            { new: true }
        );
          
      })
      .then(dbRecipe => {
          res.json(dbRecipe)
      })
      .catch(err => {
          console.log(err)
        res.status(422).json(err);
    });
    
    },

    getRecipeComments: function(req,res) {
        const { id } = req.params;
        const commentArray = []
        console.log('GET RECIPE COMMENTS ID PARAMS', id)
        db.Recipe.findById(id).then(function(data) {
            console.log(data)
            
            data.comments.forEach(function(el){
                console.log('forEach id --->' , el)
                db.Comment.findById(el).then(data => commentArray.push(data))
            })
        })
        console.log('COMMENT ARRAY __>', commentArray)
    },
    deleteComment: function (req, res) {
        console.log("testing")
        db.Comment.deleteOne({ _id: req.params.id })
            .then(result => {
                res.json(result);
            })
            .catch(err => {
                res.status(422).json(err);
            });
    },

    findUserRecipes: function (req, res) {
        db.User.findById(req.params.id)
            .populate("recipes")
            .then(dbUser => {
                const { password, ...user } = dbUser.toObject();
                res.json(user);
            })
            .catch(err => {
                res.json({ message: err });
            });
    },
    findById: function(req, res) {
        console.log(req.params.id)
        db.Recipe
          .findById(req.params.id)
          .populate({
              path: "comments",
              populate: {
                path: 'user',
                model: 'User'
              }
              })
          .then(dbRecipes => res.json(dbRecipes))
          .catch(err =>
            {
                console.log(err)
                res.status(422).json(err)
            }
            );
      },

    findAll: function (req, res) {
        db.Recipe.find(req.query)
            .sort({ startTime: -1 })
            .then(dbRecipes => {
                res.json(dbRecipes);
            })
            .catch(err => {
                res.json({ message: err });
            });
    }
};
