'use client'

import { poppins } from "@/lib/fonts";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import Link from "next/link";

const HeroHeadAnimation = () => {
  const texts = [
    "friends",
    "family",
    "team"
  ];

  const [displayedText, setDisplayedText] = useState<string | null>('');
  const [index, setIndex] = useState(0);
  const [textIndex, setTextIndex] = useState(0);

  const [isDone, setDone] = useState(false);

  useEffect(() => {
    if (displayedText == null) {
      setDisplayedText('');
    }
    
    if (textIndex < texts.length && index < texts[textIndex].length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + texts[textIndex][index]);
        setIndex(index + 1);
      }, 100);
      return () => clearTimeout(timeout);
    }

    // if (index >= texts[textIndex].length) {
    //   const timeout = setTimeout(() => {
    //     setDisplayedText((prev) => prev?.split('').filter((v, i) => i !== prev.length - 1).join(''));
    //   }, 100);
    //   return () => clearTimeout(timeout);
    // }

    const delay = setTimeout(() => {
      setDisplayedText('');
      setIndex(0);
      setTextIndex(textIndex < texts.length - 1 ? textIndex + 1 : 0);
    }, 5000);
    return () => clearTimeout(delay);

  }, [index, textIndex, texts]);

  return (
    <span className="text-primary">
      {displayedText}
    </span>
  )
}

export default function Hero () {
  return (
    <section className="h-[70vh] text-center flex align-middle justify-center">
      <header className="h-fit my-auto w-[480px] sm:mx-0 mx-8">
        <h1 className={`font-bold text-3xl mb-6 ${poppins.className}`}>
          Write your note, share with your <HeroHeadAnimation /><span className="font-normal animate-blink-anim">|</span>, 🚀 online
        </h1>
        <Link href={"/signup"}>
          <Button className="font-bold">Create One</Button>
        </Link>
      </header>
    </section>
  )
}