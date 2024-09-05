import { NextRequest, NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import dbConnect from "@/lib/mongoDb";
import UserChats from "@/utils/models/userChats";

export async function GET(req: NextRequest) {
    await dbConnect();

    const { userId } = getAuth(req);

    if (!userId) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    try {
        const userChats = await UserChats.find({ userId });
        return NextResponse.json(userChats[0]?.chats || [], { status: 200 });
    } catch (err) {
        console.error(err);
        return NextResponse.json(
        { message: "Error fetching user chats!" },
        { status: 500 }
        );
    }
}
