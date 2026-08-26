import { useEffect, useState } from "react";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "pagering-link": React.HTMLAttributes<HTMLElement> & {
        theme?: "light" | "dark" | "system";
      };
    }
  }
}

interface entry {
  name: string;
  url: string;
}

interface entryProps {
  prev: entry | null;
  next: entry | null;
}

export const Webring = ({ prev, next }: entryProps) => {
  const [scrolled, setScrolled] = useState(false);
  const [bottom, setBottom] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY;
      const innerH = window.innerHeight;

      const docHeight = Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.offsetHeight,
      );

      setBottom(scrollY + innerH >= docHeight - 20);
      setScrolled(scrollY > 20);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={
        "fixed z-50 bottom-5 mdx:left-1/2 left-1/2 -translate-x-1/2 justify-between items-center " +
        "flex flex-row gap-2 justify-center " +
        "w-full max-w-[calc(100%-20px)] " +
        (scrolled
          ? "translate-y-0 "
          : "absolute translate-y-50 mdx:translate-y-0 ") +
        (bottom ? "absolute translate-y-50 " : "translate-y-0 ") +
        "transition duration-300 ease-in-out"
      }
    >
      <div
        id="webring"
        className={
          "justify-center items-center " +
          "flex bg-black outline-1 outline-neutral-300 rounded-full w-full max-w-[calc(100%-10px)] " +
          "text-[20px] mdx:w-xl p-5 mdx:text-2xl h-18"
        }
      >
        <a
          id="prevurl"
          className="flex-1 font-mono text-neutral-300 truncate"
          href={prev?.url ?? "https://webring.otomir23.me/30/prev"}
        >
          &lt;{" "}
          <span className="hidden mdx:inline">{prev?.name ?? "prev"} </span>
        </a>
        <a
          className="font-mono mdx:text-3xl text-center"
          href="https://webring.otomir23.me/"
        >
          {" "}
          Otoring
        </a>
        <a
          id="nexturl"
          className="flex-1 font-mono text-neutral-300 text-end truncate"
          href={next?.url ?? "https://webring.otomir23.me/30/next"}
        >
          <span className="hidden mdx:inline">{next?.name ?? "next"} </span>&gt;
        </a>
      </div>
      <div
        id="pagering"
        className={
          "flex bg-black outline-1 outline-neutral-300 rounded-full w-full mdx:w-xs max-w-[calc(100%-10px)] " +
          "justify-center items-center " +
          "h-18 text-md mdx:w-xs p-5 mdx:gap-10 mdx:text-2xl"
        }
      >
        <pagering-link theme="dark" className="pagering-link"></pagering-link>
      </div>
    </div>
  );
};
