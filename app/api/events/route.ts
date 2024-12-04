import { prisma } from "@/app/lib";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

interface EventRequestBody {
  name: string;
  date: Date;
  location: string;
  description: string;
}

export async function POST(req: NextRequest) {
  const token = await getToken({ req });

  if (!token || !token.email) {
    return NextResponse.json(
      { msg: "Unauthorized: User must log in" },
      { status: 401 }
    );
  }

  try {
    const body: EventRequestBody = await req.json();
    if (!body.name || !body.date || !body.location || !body.description) {
      return NextResponse.json(
        { msg: "All fields must be filled" },
        { status: 400 }
      );
    }

    const response = await prisma.user.findUnique({
      where: {
        email: token.email,
      },
      select: {
        id: true,
        name: true,
      },
    });

    if (!response) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ response }, { status: 201 });
  } catch (error) {
    console.error("Error fetching user data:", error);
    return NextResponse.json(
      { message: "Error fetching user data" },
      { status: 500 }
    );
  }
}
