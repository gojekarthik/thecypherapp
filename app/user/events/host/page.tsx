import EventForm from "@/components/event-form";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";
import { NextResponse } from "next/server";
import { api_url } from "@/utils/const";

const HostNewEvent = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.redirect(new URL("/auth", api_url));
  }
  console.log(session);
  const userId = session?.user.id;

  return (
    <div>
      <EventForm userId={userId} type="Create" />
    </div>
  );
};

export default HostNewEvent;
