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
  favicon: string;
}

interface entryProps {
  prev: entry | null;
  next: entry | null;
}

export const Webring = ({ prev, next }: entryProps) => {
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
        (bottom ? "absolute translate-y-50 " : "translate-y-0 ") +
        "transition duration-300 ease-in-out"
      }
    >
      <div
        id="webring"
        className={
          "justify-center items-center " +
          "flex bg-black outline-1 outline-neutral-300 rounded-full w-full max-w-[calc(100%-10px)] " +
          "text-[15px] mdx:w-xl p-5 mdx:text-xl lgx:text-2xl h-12 mdx:h-15"
        }
      >
        <a
          id="prevurl"
          className="flex-1 font-mono text-neutral-300 truncate"
          href={prev?.url ?? "https://webring.otomir23.me/30/prev"}
        >
          <div className="flex gap-1 flex-row items-center">
            <span>&lt;</span>
            <span className="hidden mdx:inline">{prev?.name ?? "prev"}</span>
            <img className="w-[23px] h-[23px] mt-0.5" src={prev?.favicon}></img>
          </div>
        </a>
        <a
          className="font-mono mdx:text-2xl font-bold text-center"
          href="https://webring.otomir23.me/"
        >
          Otoring
        </a>
        <a
          id="nexturl"
          className="flex-1 font-mono text-neutral-300 text-end truncate"
          href={next?.url ?? "https://webring.otomir23.me/30/next"}
        >
          <div className="flex gap-1 flex-row items-center justify-end">
            <img className="w-[23px] h-[23px] mt-0.5" src={next?.favicon}></img>
            <span className="hidden mdx:inline">{next?.name ?? "next"}</span>
            <span>&gt;</span>
          </div>
        </a>
      </div>
      <div
        id="pagering"
        className={
          "flex bg-black outline-1 outline-neutral-300 rounded-full w-full mdx:w-xs max-w-[calc(100%-10px)] " +
          "justify-center items-center " +
          "h-12 mdx:h-15 text-md mdx:w-xs p-5 mdx:gap-10 mdx:text-2xl"
        }
      >
        <pagering-link theme="dark" className="pagering-link"></pagering-link>
      </div>
    </div>
  );
};
