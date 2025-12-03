import { useEffect, useState } from "react";

interface entry {
    name: string;
    url: string;
}

export const Webring = () => {
    const [prev, setPrev] = useState<entry | null>(null);
    const [next, setNext] = useState<entry | null>(null);

    const [scrolled, setScrolled] = useState(false);
    const [bottom, setBottom] = useState(false);

    useEffect(() => {
        fetch("https://webring.otomir23.me/30/data")
            .then((res) => res.json())
            .then((data) => {
                setPrev(data.prev);
                setNext(data.next);
            });

        const onScroll = () => {
            const scrollY = window.scrollY;
            const innerH = window.innerHeight;

            const docHeight = Math.max(
                document.body.scrollHeight,
                document.documentElement.scrollHeight,
                document.body.offsetHeight,
                document.documentElement.offsetHeight
            );

            setBottom(scrollY + innerH >= docHeight - 20);
            setScrolled(scrollY > 20);
        };
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <div id="webring"
             className={
                "fixed z-50 bottom-2 mdx:left-1/2 left-1/2 mdx:bottom-5 -translate-x-1/2 justify-center items-center " +
                "flex bg-black outline-1 outline-neutral-300 rounded-full w-full max-w-[calc(100%-5px)] " +
                "text-md mdx:w-3xl p-5 mdx:gap-10 mdx:text-2xl transition duration-300 ease-in-out" +
                (scrolled ? "translate-y-0 " : "absolute translate-y-50 mdx:translate-y-0 ") +
                (bottom ? "absolute translate-y-50 " : "translate-y-0 ")
        }>
            <a id="prevurl" className="flex-1 font-mono text-neutral-300" href={prev?.url ?? "https://webring.otomir23.me/30/prev"}>
                &lt; {prev?.name ?? "prev"}
            </a>
            <a className="font-mono mdx:text-3xl text-center" href="https://webring.otomir23.me/"> Webring</a>
            <a id="nexturl" className="flex-1 font-mono text-neutral-300 text-end" href={next?.url ?? "https://webring.otomir23.me/30/next"}>
                {next?.name ?? "next"} &gt;
            </a>
        </div>
    );
};
