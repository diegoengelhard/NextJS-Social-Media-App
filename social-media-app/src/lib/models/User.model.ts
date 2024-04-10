import mongoose from "mongoose";
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    fullname: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    image: {
        type: String,
        default: 'https://t4.ftcdn.net/jpg/05/89/93/27/360_F_589932782_vQAEAZhHnq1QCGu5ikwrYaQD0Mmurm0N.webp'

    },
    bio: String,
    posts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Post'
        }
    ],
    onboarded: {
        type: Boolean,
        default: false
    },
    communities: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Community'
        }
    ],
}, { timestamps: true })

const User = mongoose.models.User || mongoose.model('User', UserSchema);
export default User;