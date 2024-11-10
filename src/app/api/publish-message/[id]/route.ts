import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import { getServerSession } from 'next-auth';
import UserModel from '@/model/User';
import mongoose from 'mongoose';
import { authOptions } from '../../auth/[...nextauth]/options';
import Email from 'next-auth/providers/email';

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
    console.log("1");
    await dbConnect();

    const session = await getServerSession();
    const user = session?.user;
    
    if (!session || !user) {
        return NextResponse.json(
            { success: false, message: "Not Authenticated" },
            { status: 401 }
        );
    }

    const { id } = params;
   

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return NextResponse.json(
            { success: false, message: "Invalid message ID" },
            { status: 400 }
        );
    }
    console.log("2");
    const userId = user._id
    const messageId = id
    const email = user.email

    try {
        console.log("3");
        const result = await UserModel.updateOne(
            {email, "messages._id": messageId },
            { $set: { "messages.$.isPublished": true } }
        );
       console.log("result : ", result);
       return NextResponse.json({
            success: true,
            message: "Message published successfully"
        },{ status: 200});
       
    } catch (err) {
        console.log("error",err);
        return NextResponse.json(
            { success: false, message: "Failed to publish message" },
            { status: 500 }
        );
    }
}
