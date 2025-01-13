import { atom, useAtom } from "jotai";
import { useRef } from "react";

export const skibidiAtom = atom(false);
export const wiggleAtom = atom(true);

export const UI = () => {
  const [skibidi, setSkibidi] = useAtom(skibidiAtom);
  const [_wiggle, setWiggle] = useAtom(wiggleAtom);
  const audio = useRef();

  const startSkibidi = (withWiggle) => {
    setSkibidi(true);
    setWiggle(withWiggle);
    audio.current.play();
    audio.volume = 0.1;
    audio.current.loop = true;
  };
  const stopSkibidi = () => {
    setSkibidi(false);
    setWiggle(true);
    audio.current.pause();
    audio.current.currentTime = 0;
  };

  return (
    <main className="pointer-events-none fixed z-10 inset-0 p-10 flex justify-between flex-col">
      <div className="flex items-center justify-center gap-4">
        {skibidi ? (
          <button
            className="w-40 pointer-events-auto bg-orange-700 hover:bg-orange-900 text-white font-bold py-2 px-4 rounded uppercase"
            onClick={stopSkibidi}
          >
            Stop Dancing
          </button>
        ) : (
          <>
            <button
              className="w-40 pointer-events-auto bg-orange-700 hover:bg-orange-900 text-white font-bold py-2 px-4 rounded uppercase"
              onClick={() => startSkibidi(false)}
            >
              Start Dancing{" "}
              <div className="text-xs -mt-1 font-medium">(without wiggle)</div>
            </button>
            <button
              className="w-40 pointer-events-auto bg-orange-700 hover:bg-orange-900 text-white font-bold py-2 px-4 rounded uppercase"
              onClick={() => startSkibidi(true)}
            >
              Start Dancing{" "}
              <div className="text-xs -mt-1 font-medium">(with wiggle)</div>
            </button>
          </>
        )}
        <audio
          src="https://www.myinstants.com/media/sounds/yes-yes-yes-skibidi.mp3"
          ref={audio}
        />
      </div>
    </main>
  );
};
