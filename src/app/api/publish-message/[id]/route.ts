import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import { getServerSession } from 'next-auth';
import UserModel from '@/model/User';
import mongoose from 'mongoose';

export async function POST(req: NextRequest, { params }: { params: { id: string, action: boolean } }) {
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
    const {action} = await req.json()

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return NextResponse.json(
            { success: false, message: "Invalid message ID" },
            { status: 400 }
        );
    }

    const email = user.email;

    try {
        const result = await UserModel.updateOne(
            { email, "messages._id": id },
            { $set: { "messages.$.isPublished": action } }
        );

        return NextResponse.json({
            success: true,
            message: `Message ${action ? 'published' : 'unpublished'} successfully`
        }, { status: 200 });
       
    } catch (err) {
        console.error("Error:", err);
        return NextResponse.json(
            { success: false, message: "Failed to publish message" },
            { status: 500 }
        );
    }
}