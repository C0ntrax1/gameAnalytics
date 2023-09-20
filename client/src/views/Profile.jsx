import React, { useContext, useEffect, useState } from "react";
import PointChart from "../components/PointChart";
import { checkLoginFromNonLogin } from "../CONSTANT";
import { useNavigate } from "react-router-dom";
import UserData from "../contexts/UserData";

const RenderInfo = (props) => {
  return (
    <div className="flex flex-col">
      <div className="font-bold">{props?.p1}</div>
      <div className="mb-5">{props?.p2}</div>
      <div>{props?.p3}</div>
    </div>
  );
};

export default function Profile() {
  const { session } = useContext(UserData);
  let navigate = useNavigate();
  useEffect(() => {
    if (checkLoginFromNonLogin()) {
      navigate("/login");
    }
  }, [session]);

  return (
    <section className="bg-accent-1 w-full min-h-[calc(100vh-4rem)] md:p-20 p-2">
      <div className="flex flex-row justify-between">
        <div className="flex flex-col justify-between w-[20rem] h-[calc(100vh-15rem)]">
          <RenderInfo
            p1="Die Idealisten"
            p2="Das Leben ist ein Geschenk."
            p3="Wir sollten alle versuchen, die Welt ein
wenig besser zu hinterlassen, als wir sie
vorgefunden haben. Menschen sind
letztlich die Lösung für die grössten
Probleme der Welt – wenn wir alle
zusammenarbeiten und unseren Teil
beitragen, können wir das Leben für
alle verbessern. Tief in uns wissen wir,
dass wir das Richtige tun müssen,
um eine bessere Zukunft zu erreichen."
          />
          <RenderInfo
            p1="Die Realisten"
            p2="Das Leben ist ein Puzzle."
            p3="Bei Entscheidungen sind Logik und
            Vernunft gefragt. Warum sollte man
            Emotionen walten lassen, wenn man
            stattdessen auf die eigene Lebenserfahrung sowie die Weisheiten von
            andern zurückgreifen kann? Das
            menschliche Hirn brilliert beim systematischen Lösen von Problemen"
          />
        </div>
        <div className="flex flex-col items-center justify-center w-[30rem] h-[calc(100vh-15rem)]">
          <div className="relative z-0">
            <PointChart user_id={session?.personal?.userid} />
            <img src="/assets/chart.svg" className="absolute top-0 h-full w-full -z-10"/>
          </div>
          <div className="mt-10">drücke ENTER für schliessen</div>
        </div>
        <div className="flex flex-col justify-between w-[20rem] h-[calc(100vh-15rem)]">
          <RenderInfo
            p1="Die Hedonisten"
            p2="Das Leben ist eine Feier!"
            p3="Es ist kurz und wir verdienen es,
            es zu geniessen. Erlebe ein Abenteuer,
            verwirkliche dich in der Kunst, gönn
            dir dein Lieblingsessen. Es gibt unendlich viel Schönes zu entdecken,
            warum sollte man sich auf das Schlechte
            konzentrieren? Schliesslich gibt es
            nichts Menschlicheres, als gemeinsam
            Erfahrungen zu sammeln und Freude
            zu verbreiten."
          />
          <RenderInfo
            p1="Die Opportunisten"
            p2="Das Leben ist ein Spiel."
            p3="Man kann nur gewinnen, wenn man
            bereit ist, mitzuspielen. Einfallsreichtum,
            Wachsamkeit und Pragmatismus sind
            in dieser unberechenbaren Welt nötig.
            Herausforderungen können Gelegenheiten zum Erfolg bieten, solange man
            den richtigen Instinkt hat, anpassungsfähig ist und nicht zögert, strategische
            Entscheidungen zu treffen."
          />
        </div>
      </div>
    </section>
  );
}
