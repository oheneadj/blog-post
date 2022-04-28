import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {

    },
    publishedDate: Date,
},

{
    timestamps: true,
}
)

export default mongoose.models.Post || mongoose.model("Post", postSchema);