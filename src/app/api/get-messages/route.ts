import dbConnect from "@/lib/dbConnect";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import UserModel from "@/model/User";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    await dbConnect();

    const session = await getServerSession(authOptions);
    console.log("Session:", session);
    const user = session?.user;

    if (!session || !user) {
        return NextResponse.json(
            {
                success: false,
                message: "Not Authenticated"
            }, { status: 401 }
        );
    }

    const userId = new mongoose.Types.ObjectId(user._id);

    try {
        const user = await UserModel.aggregate([
            { $match: { _id: userId } },
            { $unwind: '$messages' },
            { $sort: { 'messages.createdAt': -1 } },
            { $group: { _id: '$_id', messages: { $push: '$messages' } } }
        ]);

        if (!user || user.length === 0) {
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
                messages: user[0].messages
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
