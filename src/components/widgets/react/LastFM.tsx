import { useEffect } from "react";
import { useState } from "react";

import avatar from "../../../assets/images/avatar.png";
import tribal from "../../../assets/images/tribal.png";

export const LastFM = () => {
    const [track, setTrack] = useState<any>(null);

    useEffect(() => {
        fetch("https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=glutesha&api_key=ee9f8ab4cf3c744ba03248f2ac1f19e8&format=json")
            .then((res) => res.json())
            .then((data) => {
                const t = data.recenttracks.track[0];
                setTrack(t);

                const img = new Image();

                img.crossOrigin = "anonymous";
                img.src = t.image[3]["#text"];
            });
    }, []);


    if (!track) {
        return (
            <div className="flex flex-col animate-pulse mdx:flex-row relative font-mona-sans pt-2 pb-1 font-black font-stretch-125%">
                <img className="rounded-2xl outline-2 outline-neutral-800 aspect-square shrink-0 z-1 w-[370px] mdx:w-[300px]" src={avatar.src} alt="Loading"/>
                <img src={tribal.src} alt="Chuvirla" className="absolute -right-20 -bottom-28 max-h-70 mdx:max-h-max mdx:left-auto mdx:-right-30 mdx:max-w-md mdx:-top-10 invert opacity-6" />
                <div className="flex justify-center px-1 mdx:px-5 py-2 flex-col text-2xl font-bold gap-2">
                    <p className="pt-2 text-4xl mdx:text-5xl z-1">Loading...</p>
                    <p className="text-xl z-1">please wait</p>
                </div>
            </div>
        );
    }

    const trackName = track.name;
    const artistName = track.artist["#text"];
    const albumName = track.album["#text"];
    const trackURL = track.url;
    const trackImage = track.image[3]["#text"];

    const img = new Image();
    img.crossOrigin = 'Anonymous';
    img.src = trackImage;

    return (
        <div className="flex flex-col mdx:flex-row relative font-mona-sans pt-2 pb-1 font-black font-stretch-125%">
            <img className="rounded-2xl outline-2 outline-neutral-800 aspect-square shrink-0 z-1" src={trackImage} alt={trackName}/>
            <img src={tribal.src} alt="Chuvirla" className="absolute -right-20 -bottom-28 max-h-70 mdx:max-h-max mdx:left-auto mdx:-right-30 mdx:max-w-md mdx:-top-10 invert opacity-6" />
            <div className="flex justify-center px-1 mdx:px-5 py-2 flex-col text-2xl font-bold gap-2">
                <p className="pt-2 text-4xl mdx:text-5xl z-1">{trackName}</p>
                <p className="text-xl z-1">{artistName}</p>
                <p className="text-xl z-1">{albumName}</p>
                <a className="text-red-400 z-1" href={trackURL} target="_blank" rel="noopener noreferrer">listen</a>
            </div>
        </div>
    );
}