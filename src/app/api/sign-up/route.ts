import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import bcrypt from "bcryptjs";
import { sendVerificationEmail } from "@/helpers/sendverificationEmail";

export async function POST(request: Request): Promise<Response> {
    await dbConnect();
    try {
        const { username, email, password } = await request.json();

        const existingUserVerifiedByUsername = await UserModel.findOne({
            username,
            isVerified: true,
        });

        if (existingUserVerifiedByUsername) {
            return new Response(JSON.stringify({
                success: false,
                message: "Username is already taken",
            }), { status: 400 });
        }

        const existingUserByEmail = await UserModel.findOne({ email });
        const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();

        if (existingUserByEmail) {
            if (existingUserByEmail.isVerified) {
                return new Response(JSON.stringify({
                    success: false,
                    message: "User already exists with this email",
                }), { status: 400 });
            } else {
                const hashedPassword = await bcrypt.hash(password, 10);
                existingUserByEmail.password = hashedPassword;
                existingUserByEmail.verifyCode = verifyCode;
                existingUserByEmail.verifyCodeExpiry = new Date(Date.now() + 3600000);
                await existingUserByEmail.save();
            }
        } else {
            const hashedPassword = await bcrypt.hash(password, 10);
            const expiryDate = new Date();
            expiryDate.setHours(expiryDate.getHours() + 1);
            const newUser = new UserModel({
                username,
                email,
                password: hashedPassword,
                verifyCode: verifyCode,
                verifyCodeExpiry: expiryDate,
                isVerified: false,
                isAcceptingmessage: true,
                messages: [],
                restrictedKeywords: [],
            });

            await newUser.save();
        }

        // Send verification email
        const emailResponse = await sendVerificationEmail(email, username, verifyCode);

        if (!emailResponse.success) {
            return new Response(JSON.stringify({
                success: false,
                message: "Failed to send verification email",
            }), { status: 500 });
        }

        return new Response(JSON.stringify({
            success: true,
            message: "User Registered Successfully. Please verify your email.",
        }), { status: 201 });

    } catch (error) {
        console.error('Error registering user', error);
        return new Response(JSON.stringify({
            success: false,
            message: "Error registering user",
        }), { status: 500 });
    }
}
