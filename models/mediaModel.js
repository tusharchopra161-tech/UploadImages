const mongoose = require('mongoose')

const mediaSchema = mongoose.Schema({
    mediaUrl: {
        type: String,
        required: true,
    },

    publicId: {
        type: String,
        required: true,
    },

    mediaType: {
        type: String,
        enum: ["image", "video"],
        required: true,
    },

    originalName: {
        type: String,
    },

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
},
    {
        timestamps: true
    })
const media = mongoose.model("media", mediaSchema)
module.exports = media;