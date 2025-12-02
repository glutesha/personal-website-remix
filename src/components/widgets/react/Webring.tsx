import { useEffect, useState } from "react";

interface entry {
    name: string;
    url: string;
}

export const Webring = () => {
    const [prev, setPrev] = useState<entry | null>(null);
    const [next, setNext] = useState<entry | null>(null);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        fetch("https://webring.otomir23.me/30/data")
            .then((res) => res.json())
            .then((data) => {
                setPrev(data.prev);
                setNext(data.next);
            });

        const onScroll = () => {
            setScrolled(window.scrollY > 20);
        };

        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <div id="webring" className={
                "fixed z-50 md:left-1/2 left-1/2 bottom-2 md:bottom-5 -translate-x-1/2 justify-center items-center " +
                "flex bg-black outline-1 outline-neutral-300 rounded-full w-full max-w-[calc(100%-5px)] " +
                "text-md md:w-3xl p-5 md:gap-10 md:text-2xl transition duration-300 ease-in-out" +
                (scrolled ? "translate-y-0" : "translate-y-50 md:translate-y-0")
        }>
            <a id="prevurl" className="flex-1 font-mono text-neutral-300" href={prev?.url ?? "https://webring.otomir23.me/30/prev"}> &lt; {prev?.name ?? "prev"} </a>
            <a className="font-mono md:text-3xl text-center" href="https://webring.otomir23.me/"> Webring</a>
            <a id="nexturl" className="flex-1 font-mono text-neutral-300 text-end" href={next?.url ?? "https://webring.otomir23.me/30/next"}> {next?.name ?? "next"} &gt; </a>
        </div>
    );
};
