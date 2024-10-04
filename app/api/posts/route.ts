// File: /app/api/posts/route.ts
import { prisma } from '@/app/lib'; // Adjust the path to your Prisma instance
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  try {
    // Fetch all posts
    const posts = await prisma.post.findMany({
      include: {
        profile: true, // Include related profile/user data
      },
    });

    return NextResponse.json(posts, { status: 200 });
  } catch (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
