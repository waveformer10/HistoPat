"use client";

import { tv } from "tailwind-variants";

const footerStyles = tv({
  base: `
    w-full
    bg-(--primary-default)
    text-white text-center text-xl
    py-16
  `,
});

export function Footer() {
  return (
    <footer className={footerStyles()}>
      © 2025 Centro Universitário de Patos de Minas - UNIPAM. Todos os direitos reservados.
    </footer>
  );
}
