import dbConnect from "@/lib/dbConnect";
import CommunityModel from "@/model/Community";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import mongoose from "mongoose";

export async function POST(request: Request): Promise<Response> {
    await dbConnect();
    const session = await getServerSession(authOptions);
    const user = session?.user;
    
    if (!session || !user) {
        return new Response(
            JSON.stringify({
                success: false,
                message: "Not Authenticated"
            }), { status: 401 }
        );
    }

    const userId = new mongoose.Types.ObjectId(user._id);
    
    try {
        const { communityName, communityDescription, isPublic } = await request.json();

        const existingCommunity = await CommunityModel.findOne({ communityName });

        if (existingCommunity) {
            return new Response(
                JSON.stringify({
                    success: false,
                    message: "Tribe with this name already exists"
                }), { status: 400 }
            );
        }

        const newCommunity = new CommunityModel({
            communityName,
            communityDescription,
            createdBy: userId,
            members: [{ userId: userId }],
            isPublic
        });

        await newCommunity.save();

        return new Response(
            JSON.stringify({
                success: true,
                message: `Tribe - ${communityName} created successfully`
            }), { status: 200 }
        );

    } catch (error) {
        console.error(error);
        return new Response(
            JSON.stringify({
                success: false,
                message: "An error occurred while creating the tribe"
            }), { status: 500 }
        );
    }
}
