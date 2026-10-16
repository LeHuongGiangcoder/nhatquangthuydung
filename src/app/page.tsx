import { Hero } from "@/components/sections/Hero";
import { Party } from "@/components/sections/Party";
import { ThankYou } from "@/components/sections/ThankYou";

export default function Home() {
  return (
    <>
      <main>
        <Hero />
        {/* Thân thiệp đổi theo buổi tiệc khách chọn — xem Party.tsx */}
        <Party />
        <ThankYou />
      </main>
    </>
  );
}
