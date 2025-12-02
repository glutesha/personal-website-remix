const today = new Date();
const birthDate = new Date("2008-09-25"); // Now you know when to wish me a happy birthday :3


const m = today.getMonth() - birthDate.getMonth();
const y = today.getFullYear() - birthDate.getFullYear();
const age = (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) ? y - 1 : y;

export const AboutText = () => {
    return (
        <p className="text-2xl px-0.5">
            I am a russian {age} y.o. teenager currently studying in high school.
            Interested in <text className="text-orange-400">web</text> and <text className="text-orange-400">embedded</text>.
            I love learning new things through practice and participating in hackathons and olympiads.
            Also interested in DJing and audio visuals.
            Fun fact: This website is accessible via
            <a className="text-cyan-400" href="https://glutesha.fckn.rocks"> glutesha.fckn.rocks</a>!
        </p>
    );
}