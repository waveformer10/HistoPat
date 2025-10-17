'use client';

import Image from "next/image";
import { Button } from "components/Button/Button";
import { useRouter } from "next/navigation";

export default function Home() {

  const router = useRouter();
  
  return (
    <div className="grid-rows-page-layout grid min-h-svh items-center justify-items-center gap-16 p-20 font-sans max-sm:p-8 max-sm:pb-20">
      <main className="row-start-2 flex flex-col gap-8 max-sm:items-center">
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

        <Button onPress={() => {}} title="Acesse" variant="primary" />
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
          <a
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
            className="border-gray-alpha-200 dark:border-dark-gray-alpha-200 hover:bg-button-secondary-hover dark:hover:bg-dark-button-secondary-hover flex h-12 min-w-[158px] cursor-pointer items-center justify-center rounded-full border px-5 text-base leading-5 font-medium transition-colors hover:border-transparent max-sm:h-10 max-sm:min-w-0 max-sm:px-4 max-sm:text-sm"
          >
            Read our docs
          </a>
        </div>
      </main>

      <footer className="row-start-3 flex gap-6 max-sm:flex-wrap max-sm:items-center max-sm:justify-center">
        <a
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
            className="flex-shrink-0"
          />
          Learn
        </a>
        <a
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
            className="flex-shrink-0"
          />
          Examples
        </a>
        <a
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
            className="flex-shrink-0"
          />
          Go to nextjs.org →
        </a>
        <button onClick={() => router.push('/PageExample')}>
          <p>Entre</p>
        </button>
      </footer>
    </div>
  );
}
