import GuestCard from "@/Components/guestCard";
import dynamic from "next/dynamic";

const ConnectionRootCard = dynamic(
  () => import("@/Components/connectionRootCard"),
  { ssr: false }
);

export default function ConfirmationReceipt() {
  return (
    <>
      <div className="header">
        Veuillez vous connectez et confirmer votre présence lors de la réception
        de notre union le 20 juillet 2024.
      </div>
      <ConnectionRootCard>
        <GuestCard />
      </ConnectionRootCard>
    </>
  );
}
