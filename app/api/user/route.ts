import { prisma } from "@/app/lib";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    if(!body.email){
        return NextResponse.json({
            msg:"email is required"
        },{status:400})
    }
    const response = await prisma.user.findUnique({
      where: {
        email: body.email,
      },
      select:{
        id: true,
        name: true
      }
    });

    if (!response) {
        return NextResponse.json(
          { message: "User not found" },
          { status: 404 }
        );
      }


    return NextResponse.json({ response }, { status: 201 });
  } catch (error) {
    console.error("Error fetching user Data post:", error);
    return NextResponse.json(
      { message: "Error fetching user data" },
      { status: 500 }
    );
  }
}

