import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    community: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Community",
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    parentId: {
        type: String,
    },
    likes: {
        type: [String],
        default: []
    },
    children: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post",
        },
    ],
}, { timestamps: true });

const Post = mongoose.models.Post || mongoose.model("Post", postSchema);
export default Post;