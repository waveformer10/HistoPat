"use client";

import Image from "next/image";
import { Button } from "components/Button/Button";
import { useRouter } from "next/navigation";
import { Input } from "components/Input/Input";
import { useState } from "react";
import { Badge } from "components/Badge/Badge";
import { ImageUpload } from "components/ImageUpload/ImageUpload";
import { ModuleCard } from "components/ModuleCard/ModuleCard";
import { ImagePreview } from "components/ImagePreview/ImagePreview";
import { IconLib } from "components/IconLib/IconLib";
import { Accordion } from "components/Accordion/Accordion";
import { Navbar } from "components/layout/Navbar/Navbar";
import { Footer } from "components/layout/Footer/Footer";
import { RouteBar } from "components/RouteBar/RouteBar";
import Link from "next/link";

export default function Home() {
  const [state, setState] = useState("");

  const NAVBAR_HEIGHT = 120;
  const ROUTEBAR_HEIGHT = 80;

  const router = useRouter();

  return (
    <>
      <Navbar />
      <RouteBar routeText="/teste/texto" title="Esteatose" />
      <div
        className="flex min-h-screen flex-col bg-amber-900 font-sans"
        style={{
          paddingTop: `${NAVBAR_HEIGHT + ROUTEBAR_HEIGHT}px`,
        }}
      >
        <main className="flex flex-1 flex-col items-center gap-8 bg-amber-200 px-8 pt-35 pb-12">
          <Image
            className="dark:invert"
            src="/next.svg"
            alt="Next.js logo"
            width={180}
            height={38}
            priority
          />
          <ol className="m-0 list-inside space-y-2 p-0 font-mono text-sm leading-6 tracking-[-0.01em] max-sm:text-center">
            <li>
              Get started by editing{" "}
              <code className="font-inherit bg-gray-alpha-100 dark:bg-dark-gray-alpha-100 rounded px-1 py-0.5 font-semibold">
                src/app/page.tsx
              </code>
              .
            </li>
            <li>Save and see your changes instantly.</li>
          </ol>

          <Input
            multiline
            initialRows={2}
            label="Título"
            value={state}
            errorMessage="Pla"
            onChangeValue={(e) => setState(e)}
          />

          <Button onPress={() => {}} title="Acesse" />

          <div style={{ width: 1000 }}>
            <Accordion
              title="Lorem Ipsum is simply dummy text of orem Ipsum is simply dummy text of Lorem Ipsum is simply dummy Lorem Ipsum is simply dummy text of orem Ipsum is simply dummy text of Lorem Ipsum is simply dummy Lorem Ipsum is simply dummy text of orem Ipsum is simply dummy text of Lorem Ipsum is simply dummy"
              items={[
                {
                  title:
                    "Lorem Ipsum is simply dummy text of orem Ipsum is simply dummy text of Lorem Ipsum is simply dummy",
                },
                { title: "Esteatose 1" },
                { title: "Esteatose 2" },
                { title: "Esteatose 3" },
                { title: "Esteatose 4" },
                { title: "Esteatose 5" },
                { title: "Esteatose 6" },
                { title: "Esteatose 7" },
                { title: "Esteatose 8" },
                { title: "Esteatose 9" },
                { title: "Esteatose 10" },
                { title: "Esteatose 12 " },
                { title: "Esteatose 13" },
                { title: "Esteatose 14" },
              ]}
            />
          </div>

          <Badge text="tamanho permitido (9000kb)" variant="primary" />

          <ImageUpload
            onChange={(file) => console.log("Imagem selecionada:", file)}
          />

          <ModuleCard
            imageSrc="/images.jpeg"
            title="Módulo de Teste"
            size="large"
            theme="light"
          />

          <ImagePreview imageSrc="/images.jpeg" fileName="minha-imagem.jpg" />

          <div className="flex gap-4 max-sm:flex-col">
            <a
              className="bg-foreground text-background hover:bg-button-primary-hover dark:hover:bg-dark-button-primary-hover flex h-12 cursor-pointer items-center justify-center gap-2 rounded-full border border-transparent px-5 text-base leading-5 font-medium transition-colors max-sm:h-10 max-sm:px-4 max-sm:text-sm"
              href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                className="dark:invert"
                src="/vercel.svg"
                alt="Vercel logomark"
                width={20}
                height={20}
              />
              Deploy now
            </a>
            <IconLib iconLibName="fa" icon="FaAd" color="#000000" size={30} />
            <a
              href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
              target="_blank"
              rel="noopener noreferrer"
              className="border-gray-alpha-200 dark:border-dark-gray-alpha-200 hover:bg-button-secondary-hover dark:hover:bg-dark-button-secondary-hover flex h-12 min-w-[158px] cursor-pointer items-center justify-center rounded-full border px-5 text-base leading-5 font-medium transition-colors hover:border-transparent max-sm:h-10 max-sm:min-w-0 max-sm:px-4 max-sm:text-sm"
            >
              Read our docs
            </a>
          </div>
          <Link href={"/PageExample"} title="NAVEGAR">
            <p>NAVEGAR</p>
          </Link>
        </main>
        <Footer />
      </div>
    </>
  );
}
