const mongoose = require('mongoose')

const RecipeSchema = new mongoose.Schema({
    title: { type: String, required: true },
    category: String,
    ingredients: [{
        ingredient: String,
        amount: Number,
        units: String
    }],
    comments: [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment"
    }],
    description: String,
    startTime: Date,
    endTime: Date,
    prepLength: String,
    picture: String,
    user: String
})

module.exports = mongoose.model("Recipe", RecipeSchema)