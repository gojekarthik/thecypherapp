import { prisma } from ".";

export async function getUserIdByEmail(email: string | undefined) {
  if (!email) {
    throw new Error("Email is required to fetch user ID");
  }

  try {
    const user = await prisma.user.findUnique({
      select: {
        id: true,
      },
      where: {
        email: email,
      },
    });

    return user?.id || null;
  } catch (error) {
    console.error("Error fetching user ID by email:", error);
    throw new Error("Error fetching user ID. Please try again later.");
  }
}
