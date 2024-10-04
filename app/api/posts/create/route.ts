// File: /app/api/posts/create/route.ts
import { prisma } from '@/app/lib'; // Adjust the path to where your Prisma instance is located
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const email = formData.get('email') as string;
    const caption = formData.get('caption') as string;
    const fileUrl = formData.get('fileUrl') as string;

    // Check if required fields are present
    if (!email || !caption || !fileUrl) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Fetch the user based on email
    const user = await prisma.user.findUnique({
      where: { email },
      select: { id: true },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Create a new post
    const post = await prisma.post.create({
      data: {
        profileId: user.id,
        caption,
        fileUrl, 
      },
    });

    return NextResponse.json({ id: post.postId }, { status: 201 });
  } catch (error) {
    console.error('Error creating post:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}



