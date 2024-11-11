import dbConnect from "@/lib/dbConnect";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import UserModel from "@/model/User";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    await dbConnect();

    
    const user = request.headers.get("username");
    console.log("username",user);
    if ( !user) {
        return NextResponse.json(
            {
                success: false,
                message: "invalid user",
            }, { status: 401 }
        );
    }

    

    try {
        const userr = await UserModel.findOne({ username: user });
        const messages = userr?.messages;

        const publishedMessages = messages?.filter((message) => message.isPublished);

        console.log(userr);
        if(!userr){
            return NextResponse.json(
                {
                    success: false,
                    message: "User not found"
                }, { status: 404 }
            );
        }

        return NextResponse.json(
            {
                success: true,
                publishedMessages: publishedMessages
            }, { status: 200 }
        );

    } catch (err) {
        console.error(err);
        return NextResponse.json(
            {
                success: false,
                message: "Failed to get messages"
            }, { status: 500 }
        );
    }
}