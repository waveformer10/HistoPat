import { ListCard } from "../../components/ListCard/ListCard";
import { HighlightCard } from "../../components/HighlightCard/HighlightCard";
import { Path } from "../../components/Path/Path";

export default function page(props: any) {
  return(
    <div className="bg-gray-50 h-screen w-screen !p-6  ">
    {/*<div >*/}
    {/*  <ListCard onPress={() => { return; }} username={"Lauane Gonzaga e Silva"} userRole={"Administrator"} />*/}
    {/*</div>*/}

    <div>
      <HighlightCard/>
    </div>

      <div>
        <Path path={["Modulo", "Topico", "Subtopico", "Lamina"]}/>
      </div>

    </div>
  )
}