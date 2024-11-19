import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import { getServerSession } from 'next-auth';
import UserModel from '@/model/User';
import mongoose from 'mongoose';
import { authOptions } from '../../auth/[...nextauth]/options';

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
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

    const email = user.email
    const messageId = id


    try {
        const result = await UserModel.updateOne(
            { email },
            { $pull: { messages: { _id: messageId } } }
        );
        if (result.modifiedCount === 0) {
            return NextResponse.json(
                { success: false, message: "Message not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { success: true, message: "Message deleted successfully" },
            { status: 200 }
        );
    } catch (err) {
        
        return NextResponse.json(
            { success: false, message: "Failed to delete message" },
            { status: 500 }
        );
    }
}
