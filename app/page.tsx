import { Button } from "@/components/ui/button";
import Link from "next/link";


export default async function Page() {
  return (
    <div>
      <h1>Welcome to Cypher</h1>
      <Link href="/auth">
        <Button className="bg-[#8661C1]">Get Started</Button>
      </Link>
    </div>
  );
}
