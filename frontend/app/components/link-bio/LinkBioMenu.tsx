'use client';

import Link from "next/link";
import { useMemo } from "react";

type LinkBioMenuProps = {
  isDarkMode: boolean;
};

const PROFILE_IMAGE_URL =
  "https://res.cloudinary.com/dlwclcbsj/image/upload/v1768849883/WhatsApp_Image_2026-01-14_at_18.18.35_tqd48s.jpg";

export default function LinkBioMenu({ isDarkMode }: LinkBioMenuProps) {
  const palette = useMemo(() => {
    // Paleta monocromática (preto + branco), independente do tema
    // Mantemos o parâmetro isDarkMode para compatibilidade com seu projeto.
    void isDarkMode;

    return {
      outerTop: "bg-white",
      outerBottom: "bg-black",
      card: "bg-white",
      cardBorder: "border-black/10",
      title: "text-zinc-900",
      subtitle: "text-zinc-600",
      outlineBtn:
        "border-black/20 bg-transparent text-zinc-900 hover:bg-black/5 active:bg-black/10",
      filledBtn: "border-transparent bg-black text-white hover:opacity-95 active:opacity-90",
      bioText: "text-zinc-800",
      handleText: "text-zinc-700",
      separator: "border-black/10",
      glow: "shadow-[0_18px_55px_rgba(0,0,0,0.18)]",
    };
  }, [isDarkMode]);

  const links = useMemo(
    () => [
      { label: "Início", href: "/inicio", variant: "outline" as const },
      { label: "Sobre mim", href: "/about", variant: "filled" as const },
      { label: "Serviços", href: "/services", variant: "outline" as const },
      { label: "Contato", href: "/contact", variant: "filled" as const },
    ],
    []
  );

  return (
    <section
      aria-label="Link na bio"
      className={`relative isolate min-h-[100svh] overflow-hidden ${palette.outerBottom}`}
    >
      <div
        className={`absolute inset-x-0 top-0 h-[44%] ${palette.outerTop}`}
        aria-hidden="true"
      />

      <div className="relative mx-auto flex min-h-[100svh] w-full max-w-[520px] flex-col px-4 py-6">
        <div
          className={`relative mt-2 w-full overflow-hidden rounded-[34px] border ${palette.cardBorder} ${palette.card} ${palette.glow}`}
        >
          <div className="px-5 pb-7 pt-7 sm:px-6">
            {/* Avatar */}
            <div className="flex items-center justify-center">
              <div className="relative">
                <div className="h-[94px] w-[94px] rounded-full bg-white p-[4px] shadow-[0_10px_30px_rgba(0,0,0,0.12)]">
                  <div className="relative grid h-full w-full place-items-center overflow-hidden rounded-full bg-zinc-100">
                    <img
                      src={PROFILE_IMAGE_URL}
                      alt="Foto de Lenon Cunha"
                      className="h-full w-full object-cover object-center"
                      loading="lazy"
                      decoding="async"
                      referrerPolicy="no-referrer"
                    />
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.18),rgba(0,0,0,0.18))]"
                    />
                  </div>
                </div>

                <div
                  className="pointer-events-none absolute -inset-[12px] rounded-full ring-1 ring-black/5"
                  aria-hidden="true"
                />
              </div>
            </div>

            {/* Identidade */}
            <header className="mt-4 text-center">
              <h1
                className={`text-[18px] font-semibold tracking-[0.12em] ${palette.title}`}
              >
                Lenon Cunha
              </h1>
              <p className={`mt-1 text-sm italic ${palette.subtitle}`}>
                D e s e n v o l v e d o r
              </p>
            </header>

            {/* Botões */}
            <nav aria-label="Menu principal" className="mt-6">
              <ul className="flex flex-col gap-3">
                {links.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={
                        "group flex w-full items-center justify-center rounded-full border px-5 py-4 text-[12px] font-medium uppercase tracking-[0.32em] transition outline-none " +
                        "focus-visible:ring-2 focus-visible:ring-black/25 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent " +
                        (item.variant === "filled" ? palette.filledBtn : palette.outlineBtn)
                      }
                    >
                      <span className="translate-y-[0.5px]">{item.label}</span>
                    </Link>
                  </li>
                ))}

                <li className="pt-1">
                  <Link
                    href="/inicio"
                    className={
                      "group flex w-full items-center justify-center rounded-full border px-5 py-4 text-[12px] font-semibold uppercase tracking-[0.28em] transition outline-none " +
                      "focus-visible:ring-2 focus-visible:ring-black/25 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent " +
                      palette.outlineBtn
                    }
                  >
                    <span className="translate-y-[0.5px]">Ver portfólio completo</span>
                  </Link>
                </li>
              </ul>
            </nav>
          </div>

          {/* Rodapé do card */}
          <div className={`border-t ${palette.separator} px-5 py-5 sm:px-6`}>
            <div className="flex items-start gap-4">
              {/* ✅ AQUI: trocando o círculo cinza pela sua foto (sem mexer no resto) */}
              <div className="mt-1 h-14 w-14 shrink-0 overflow-hidden rounded-full bg-black/5">
                <img
                  src={PROFILE_IMAGE_URL}
                  alt="Foto de Lenon Cunha"
                  className="h-full w-full object-cover object-center"
                  loading="lazy"
                  decoding="async"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="min-w-0">
                <p className={`text-xs ${palette.handleText}`}>@lenonrj.dev</p>
                <p className={`mt-2 text-sm leading-relaxed ${palette.bioText}`}>
                  Crio interfaces modernas e sistemas completos (landing pages, sites, e-commerce e dashboards)
                  com foco em performance, acessibilidade e conversão.
                </p>
                <p className={`mt-3 text-sm leading-relaxed ${palette.bioText}`}>
                  Se você quer um projeto bem construído e com visual premium, escolha uma opção acima e vamos
                  direto ao ponto.
                </p>
              </div>
            </div>

            <div className="mt-5 flex items-center justify-end">
              <span className="select-none text-sm italic text-zinc-600">Lenon Dev</span>
            </div>
          </div>
        </div>

        {/* Espaço seguro para móveis */}
        <div className="h-6" aria-hidden="true" />
      </div>
    </section>
  );
}
