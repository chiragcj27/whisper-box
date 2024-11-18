import mongoose, {Schema, Document} from "mongoose";
import CommunityModel from "./Community";
import PostModel from "./Post";
import CommentModel from "./Comment";
import { number } from "zod";

export interface Message extends Document{
    content: string;
    createdAt: Date;
    isPublished: boolean;
    noOfstars: number;
}

const MessageSchema: Schema<Message> = new Schema({
    content: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    },
    isPublished: {
        type: Boolean,
        default: false
    },
    noOfstars: {
        type: Number,
        default: 0,
        
    }
},{strict: true})


export interface User extends Document{
    username: string;
    email: string;
    password: string;
    verifyCode: string;
    verifyCodeExpiry: Date;
    isVerified: boolean;
    isAcceptingmessage: boolean;
    messages : Message[];
    communities: Schema.Types.ObjectId[];
    posts: Schema.Types.ObjectId[];
    comments: Schema.Types.ObjectId[];
    restrictedKeywords: string[];
}

const UserSchema: Schema<User>= new Schema({
    username: {
        type: String,
        required: [true, "Username is required"],
        trim: true,
        unique: true
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
        ,'please use a valid email address']
    },
    password: {
        type: String,
        required: [true, "password is required"],
    },
    verifyCode: {
        type: String,
        required: [true, "Verify Code is required"],
    },
    verifyCodeExpiry: {
        type: Date,
        required: [true, "Verify Code Expiry is required"],
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    isAcceptingmessage: {
        type: Boolean,
        default: true,
    },
    messages: [MessageSchema],
    communities: [{
        type: Schema.Types.ObjectId,
        ref: 'Community'
    }],
    posts: [{
        type: Schema.Types.ObjectId,
        ref: 'Post'
    }],
    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'Comment'
    }],
    restrictedKeywords: {
        type: [String],
        default: []
    }
},{strict:true})

const UserModel = (mongoose.models.User as mongoose.Model<User>) || mongoose.model<User>("User", UserSchema)
export const MessageModel = (mongoose.models.Message as mongoose.Model<Message>) || mongoose.model<Message>("Message", MessageSchema)
export default UserModel;