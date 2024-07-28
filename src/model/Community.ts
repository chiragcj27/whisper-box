import {Schema, model, Document, SchemaTypeOptions } from 'mongoose'
import PostModel from './Post';
import UserModel from './User';

interface Community extends Document {
    communityName: string;
    communityDescription: string;
    createdBy: Schema.Types.ObjectId;
    createdWhen: Date;
    members: Schema.Types.ObjectId[];
    posts: Schema.Types.ObjectId[];
    isPublic: boolean
}

const communitySchema = new Schema<Community>({
    communityName: {
        type: String,
        required: true
    },
    communityDescription: {
        type: String,
        required: true
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    createdWhen: {
        type: Date,
        default: Date.now
    },
    members: [{
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    }],
    posts: [{
        type: Schema.Types.ObjectId,
        ref: 'Post',
        default: []
    }],
    isPublic: {
        type: Boolean,
        required: false,
        default: true
    }
})

const CommunityModel = model<Community>('Community', communitySchema);
export default CommunityModel;