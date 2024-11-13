import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { MessageModel } from "@/model/User";
export async function POST(request: Request) {
  await dbConnect();

  const { username, content, stars } = await request.json();
  console.log(username,content,stars);
  try {
    const user = await UserModel.findOne({ username });
    if (!user) {
      console.log(user);
      return Response.json(
        {
          success: false,
          message: "User not found",
        },
        { status: 404 }
      );
    }

    if (!user.isAcceptingmessage) {
      return Response.json(
        {
          success: false,
          message: "User is not accepting messages",
        },
        { status: 403 }
      );
    }

    const newMessage = new MessageModel({ content, createdAt: new Date(), isPublished: false, noOfstars: stars });
    console.log(newMessage);
   
    user.messages = [...user.messages, newMessage];
   
    await user.save()
    console.log(user.messages);
    return Response.json(
        {
            success: true,
            message: "Message sent successfully !!"
        },{ status: 200}
    )

  } catch (error) {
    return Response.json(
        {
            success: false,
            message: "Error in sending message", error
        },{ status: 500}
    )
  }
}
