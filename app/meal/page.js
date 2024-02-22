import MealCard from "@/Components/MealCard";
import dynamic from "next/dynamic";

const ConnectionRootCard = dynamic(
  () => import("@/Components/connectionRootCard"),
  { ssr: false }
);

export default function Meal() {
  return (
    <>
      <div className="header">
        Pour le repas, nous souhaitons faire un buffet participatif !
        <br />
        Nous vous invitons donc à nous informer sur quel éléments du menu
        ci-dessous vous allez particper.
      </div>
      <ConnectionRootCard>
        <MealCard />
      </ConnectionRootCard>
    </>
  );
}
