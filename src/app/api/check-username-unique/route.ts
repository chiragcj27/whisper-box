import dbConnect from "@/lib/dbConnect";
import {z} from "zod"
import UserModel from "@/model/User";
import { usernameValidation } from "@/schemas/signUpSchema";

const UsernameQuerySchema = z.object({
    username: usernameValidation
})

export async function GET(request: Request){
    await dbConnect()
    const { searchParams } = new URL(request.url)
    try {
        
        const queryParam = {
            username: searchParams.get('username')
        }

        //validate with zod
        const result = UsernameQuerySchema.safeParse(queryParam)
        

        if(!result.success) {
            const usernameErrors = result.error.format().username?._errors || []
            return Response.json({
                success: false,
                message: usernameErrors?.length > 0 ? usernameErrors.join(',')
                : 'Invalid query parameters',
            }, { status : 400})
        }

        const {username} = result.data


        const existingVerifiedUser = await UserModel.findOne({ username, isVerified: true})

        
        if(existingVerifiedUser) {
            return Response.json({
                success: false,
                message: 'Username is already taken'
            }, {status: 400})
        }

        return Response.json({
            success: true,
            message: 'Username is unique'
        }, {status: 400})

    } catch (err) {
        console.error("Error checking username", err)
        return Response.json(
            {
                success: false,
                message: "Error checkin username"
            },{
                status : 500
            }
        )
    }
}