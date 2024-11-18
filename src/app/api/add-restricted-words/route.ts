import dbConnect from "@/lib/dbConnect";
import { getServerSession, User } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import UserModel from "@/model/User";

export async function POST(request: Request): Promise<Response>{
    try{
        await dbConnect()

        const session = await getServerSession(authOptions)
        const user: User = session?.user as User

        if(!session || !session.user) {
            return Response.json(
                {
                    success: false,
                    message: "Not Authenticated"
                },{ status: 401}
            )
        }

        const userId = user._id;
        const { restrictedWords } = await request.json();
        
        const restrictedWordsArray = restrictedWords.split(",");
        console.log(restrictedWordsArray);
        const User = await UserModel.findOne({ _id: userId });
        session.user.restrictedKeywords = restrictedWords;
        console.log(session.user);
        if(User){
            User.restrictedKeywords=restrictedWordsArray ;
            await User.save();
        }
        else{
            return new Response(JSON.stringify({
                success: false,
                message: "User not found"
            }), { status: 404 });
        }
        return new Response(JSON.stringify({
            success: true,
            message: "Restricted words updated successfully"
        }), { status: 200 });

    }
    catch(err){
        return new Response(JSON.stringify({
            success: false,
            message: "Error in updating restricted words", err
        }), { status: 500 });
    }
}
