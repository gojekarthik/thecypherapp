
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";
import { NextRequest, NextResponse } from "next/server";



export async function POST(req: NextRequest): Promise<NextResponse> {
  const session = await getServerSession(authOptions);
    
  if (!session) {
    return NextResponse.json(
      { msg: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    const body = await req.json();
    
    // Here you would typically validate the body and create the event using Prisma
    // const newEvent = await prisma.event.create({
    //   data: {
    //     ...body,
    //     userId: session.user.id, // Assuming the session has a user object with an id
    //   },
    // });

    return NextResponse.json({
      msg: "Event created successfully",
      // event: newEvent
    });
  } catch (error) {
    console.error('Error creating event:', error);
    return NextResponse.json(
      { msg: "Error creating event" },
      { status: 500 }
    );
  }
}