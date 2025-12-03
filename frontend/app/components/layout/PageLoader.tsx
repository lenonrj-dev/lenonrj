"use client";

import { useEffect, useState, type ReactNode } from "react";

type PageLoaderProps = {
  children: ReactNode;
};

/**
 * Exibe um overlay de carregamento ate que a hidratacao termine
 * e um pequeno atraso garanta que os componentes carregaram.
 */
export function PageLoader({ children }: PageLoaderProps) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const markReady = () => setReady(true);
    const timeout = window.setTimeout(markReady, 700); // tempo curto p/ evitar flash
    if (document.readyState === "complete") {
      markReady();
    } else {
      window.addEventListener("load", markReady, { once: true });
    }
    return () => {
      window.clearTimeout(timeout);
      window.removeEventListener("load", markReady);
    };
  }, []);

  return (
    <div className="relative">
      {!ready && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-white dark:bg-black transition-opacity duration-300">
          <div className="loader-spin h-12 w-12 rounded-full border-4 border-gray-300 border-t-gray-900 dark:border-gray-700 dark:border-t-white" />
          <style jsx>{`
            @keyframes loader-rotate {
              from {
                transform: rotate(0deg);
              }
              to {
                transform: rotate(360deg);
              }
            }
            .loader-spin {
              animation: loader-rotate 0.9s linear infinite;
            }
          `}</style>
          <span className="sr-only">Carregando..</span>
        </div>
      )}
      <div className={`transition-opacity duration-300 ${ready ? "opacity-100" : "opacity-0"}`}>{children}</div>
    </div>
  );
}
