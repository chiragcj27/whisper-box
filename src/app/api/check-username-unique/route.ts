import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import { z } from 'zod';
import UserModel from '@/model/User';
import { usernameValidation } from '@/schemas/signUpSchema';

// Define the schema for query parameters using Zod
const UsernameQuerySchema = z.object({
  username: usernameValidation,
});

// Define the GET handler function
export async function GET(request: NextRequest): Promise<NextResponse> {
  await dbConnect();

  try {
    // Parse the URL to get search parameters
    const { searchParams } = new URL(request.url);
    const queryParam = {
      username: searchParams.get('username'),
    };

    // Validate the query parameters using Zod
    const result = UsernameQuerySchema.safeParse(queryParam);

    if (!result.success) {
      const usernameErrors = result.error.format().username?._errors || [];
      return new NextResponse(
        JSON.stringify({
          success: false,
          message: usernameErrors.length > 0 ? usernameErrors.join(',') : 'Invalid query parameters',
        }),
        { status: 400 },
      );
    }

    const { username } = result.data;

    // Check if a verified user with the given username already exists
    const existingVerifiedUser = await UserModel.findOne({ username, isVerified: true });

    if (existingVerifiedUser) {
      return new NextResponse(
        JSON.stringify({
          success: false,
          message: 'Username is already taken',
        }),
        { status: 400 },
      );
    }

    // Return success response if username is unique
    return new NextResponse(
      JSON.stringify({
        success: true,
        message: 'Username is unique',
      }),
      { status: 200 },
    );

  } catch (err) {
    console.error("Error checking username", err);
    return new NextResponse(
      JSON.stringify({
        success: false,
        message: "Error checking username",
      }),
      { status: 500 },
    );
  }
}
