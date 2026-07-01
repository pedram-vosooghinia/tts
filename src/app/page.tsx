import { Button } from "@/components/ui/button";
import Link from "next/link";
export default async function Home() {
  return (
    <>
      <Link href="/apartment/apartments">
        <Button variant="default" className="text-white">
          لیست فایل های آپارتمانی
        </Button>
      </Link>
    </>
  );
}
