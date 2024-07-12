import {Schema, model, Document } from 'mongoose';
import UserModel from './User';
import CommunityModel from './Community';
import CommentModel from './Comment';

interface Post extends Document{
    userId: Schema.Types.ObjectId;
    communityId: Schema.Types.ObjectId;
    title: string;
    content: string;
    upvotes: number;
    uploadTime: Date;
    comments: Schema.Types.ObjectId[];
}

const postSchema = new Schema<Post>({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },    
    communityId: {
        type: Schema.Types.ObjectId,
        ref: 'Community',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: false
    },
    upvotes: {
        type: Number,
        default: 0
    },
    uploadTime: {
        type: Date,
        default: Date.now
    },
    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'Comment',
        default: []
    }]
});

const PostModel = model<Post>('Post', postSchema);
export default PostModel;