"use client";

import { ListCard } from "../../components/ListCard/ListCard";
import { HighlightCard } from "../../components/HighlightCard/HighlightCard";
import { Path } from "../../components/Path/Path";
import ZoomImage from "../../components/ImageZoom/ImageZoom";

export default function page(props: any) {
  return(
    <div className="bg-gray-50 h-screen w-screen !p-6  ">
    {/*<div >*/}
    {/*  <ListCard onPress={() => { return; }} username={"Lauane Gonzaga e Silva"} userRole={"Administrator"} />*/}
    {/*</div>*/}

      <div>
        <ZoomImage
          src="unnamed.jpg"
          alt="Imagem de teste"
          className="w-80 h-60"
        />
      </div>


    <div>
      <HighlightCard title={"Total de Lâminas cadastradas"} value={1080}/>
    </div>

      <div>
        <Path path={["Modulo", "Topico", "Subtopico", "Lamina"]}/>
      </div>

    </div>
  )
}