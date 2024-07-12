import {Schema, model, Document } from 'mongoose'
import PostModel from './Post';
import UserModel from './User';

export interface Comment extends Document {
    postId: Schema.Types.ObjectId;
    userId: Schema.Types.ObjectId;
    content: string;
    createdAt: Date;
    replies: Schema.Types.ObjectId[];
    replyTo: Schema.Types.ObjectId;
    upVote: number;
}

const CommentSchema = new Schema<Comment>({
    postId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Post'
    },
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    content: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    },
    replies: {
        type: [Schema.Types.ObjectId],
        ref: 'Comment',
        default: []
    },
    replyTo: {
        type: Schema.Types.ObjectId,
        ref: 'Comment',
        default: null
    },
    upVote: {
        type: Number,
        default: 0,
        min: [0, 'Upvote cannot be negative']
    }
})

const CommentModel = model<Comment>('Comment', CommentSchema);
export default CommentModel;