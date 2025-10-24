import { ListCard } from "../../components/ListCard/ListCard";

export default function page(props: any) {
  return(
    <div className="bg-gray-50 h-screen w-screen !p-6  ">
      <ListCard onPress={() => { return; }} username={"Lauane Gonzaga e Silva"} userRole={"Administrator"} />
    </div>
  )
}