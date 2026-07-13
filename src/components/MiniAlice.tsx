import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Tv, Sparkles, Smile, MessageSquare } from "lucide-react";

interface MiniAliceProps {
  currentTab: string;
  isVideoPlaying?: boolean;
}

export default function MiniAlice({ currentTab, isVideoPlaying = false }: MiniAliceProps) {
  // Estados de atividade da Mini Lucy
  // 'idle' | 'running' | 'holding_sign' | 'hiding' | 'sleeping' | 'watching_tv'
  const [behavior, setBehavior] = useState<"idle" | "running" | "holding_sign" | "hiding" | "sleeping" | "watching_tv">("idle");
  const [position, setPosition] = useState({ x: 100, y: 150 });
  const [signText, setSignText] = useState("");
  const [tvEmotion, setTvEmotion] = useState("🍿");
  const [isVisible, setIsVisible] = useState(true);
  const [tvOffset, setTvOffset] = useState({ x: 0, y: 0 });

  const miniRef = useRef<HTMLDivElement>(null);

  // Pool de frases divertidas para as plaquinhas de protesto da Mini Lucy
  const funnySigns = [
    "Queremos queijo! 🧀",
    "Alice, me dá dengo! 🥺",
    "Quero ver a série de terror! 📺",
    "Eduardo é meu herói! 💻",
    "Não fofoque em vão! 🤫",
    "Falta pouco pro recesso acabar! ⏳",
    "Ratinho Twister para presidente! 🐭",
    "TNB News é pura magia! ✨",
    "Abaixo a fofoca sem fundamento! 🔮",
    "O amor cura tudo! ❤️"
  ];

  // Emoções na TV da Mini Lucy
  const tvEmotions = ["🍿", "😂", "😮", "😴", "📺", "👏", "😱", "🕶️"];

  // Real-time overlap avoidance check with the video player
  useEffect(() => {
    if (currentTab !== "audiovisual") {
      return;
    }

    const checkOverlap = () => {
      const playerEl = document.getElementById("tnb-video-player");
      const miniEl = miniRef.current;
      if (playerEl && miniEl) {
        const playerRect = playerEl.getBoundingClientRect();
        const miniRect = miniEl.getBoundingClientRect();

        // Check if Mini Lucy is too close to the player (300px threshold)
        const safeMargin = 300;
        const isCloseX = (miniRect.right > playerRect.left - safeMargin) && (miniRect.left < playerRect.right + safeMargin);
        const isCloseY = (miniRect.bottom > playerRect.top - safeMargin) && (miniRect.top < playerRect.bottom + safeMargin);

        if (isCloseX && isCloseY) {
          // Push Mini Lucy to a fixed safe spot instead of accumulating infinitely
          setTvOffset({
            x: -120,
            y: 40
          });
        } else {
          // Reset to default safe spot if no overlap is detected
          setTvOffset({ x: 0, y: 0 });
        }
      }
    };

    // Listen to changes, scroll, resize or check on interval
    window.addEventListener("scroll", checkOverlap, { passive: true });
    window.addEventListener("resize", checkOverlap);
    const interval = setInterval(checkOverlap, 1000);

    return () => {
      window.removeEventListener("scroll", checkOverlap);
      window.removeEventListener("resize", checkOverlap);
      clearInterval(interval);
    };
  }, [currentTab]);

  // Efeito para selecionar comportamento dependendo da aba ativa
  useEffect(() => {
    if (currentTab === "audiovisual") {
      setBehavior("watching_tv");
      return;
    }

    // Comportamento randômico a cada 15 segundos
    const interval = setInterval(() => {
      const rand = Math.random();
      if (rand < 0.2) {
        setBehavior("running");
        // Reinicia a posição horizontal
        setPosition({ x: -100, y: Math.floor(Math.random() * 300) + 100 });
      } else if (rand < 0.4) {
        setBehavior("holding_sign");
        setSignText(funnySigns[Math.floor(Math.random() * funnySigns.length)]);
        setPosition({ x: Math.floor(Math.random() * 300) + 50, y: Math.floor(Math.random() * 200) + 150 });
      } else if (rand < 0.6) {
        setBehavior("hiding");
      } else if (rand < 0.8) {
        setBehavior("sleeping");
      } else {
        setBehavior("idle");
        setPosition({ x: Math.floor(Math.random() * 400) + 50, y: Math.floor(Math.random() * 300) + 100 });
      }
    }, 15000);

    return () => clearInterval(interval);
  }, [currentTab]);

  // Efeito secundário para animações de emoção enquanto assiste à TV
  useEffect(() => {
    if (behavior === "watching_tv") {
      const tvInterval = setInterval(() => {
        setTvEmotion(tvEmotions[Math.floor(Math.random() * tvEmotions.length)]);
      }, 4000);
      return () => clearInterval(tvInterval);
    }
  }, [behavior]);

  // Se esconder de surpresa e voltar
  const handleTap = () => {
    // Quando clicado, reage com surpresa e muda de pose
    setBehavior("running");
    setPosition({ x: Math.floor(Math.random() * 400) + 50, y: -50 });
    setTimeout(() => {
      setBehavior("idle");
      setPosition({ x: 200, y: 250 });
    }, 2000);
  };

  return (
    <div className="relative pointer-events-none z-40 hidden md:block" ref={miniRef}>
      <AnimatePresence>
        {isVisible && (
          <>
            {/* COMPORTAMENTO: ASSISTINDO TV (DENTRO DA ABA AUDIOVISUAL) */}
            {behavior === "watching_tv" && (
              <motion.div
                key="mini-tv-mode"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ 
                  opacity: 1, 
                  scale: 1,
                  x: tvOffset.x,
                  y: tvOffset.y
                }}
                exit={{ opacity: 0 }}
                className="fixed bottom-20 left-10 p-4 bg-slate-900/95 border-2 border-amber-500/30 rounded-2xl flex items-center gap-4 shadow-2xl pointer-events-auto"
                title="Mini Lucy assistindo à série do Stephen King!"
              >
                {/* Mini TV */}
                <div className="relative w-14 h-11 bg-slate-950 border-2 border-slate-700 rounded-lg flex items-center justify-center overflow-hidden shrink-0">
                  <div className="absolute inset-0 bg-cyan-500/10 animate-pulse" />
                  <div className="text-xs">{tvEmotion}</div>
                  <div className="absolute top-0 right-1 w-1 h-1 bg-red-500 rounded-full animate-ping mt-1" />
                  {/* Antenas de TV */}
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex gap-2">
                    <div className="w-[1px] h-3 bg-slate-600 rotate-12 origin-bottom" />
                    <div className="w-[1px] h-3 bg-slate-600 -rotate-12 origin-bottom" />
                  </div>
                </div>

                {/* Mini Lucy */}
                <div className="flex flex-col items-center">
                  {/* Pipoca flutuante */}
                  {tvEmotion === "🍿" && (
                    <motion.span
                      animate={{ y: [0, -6, 0] }}
                      transition={{ repeat: Infinity, duration: 1 }}
                      className="text-xs"
                    >
                      🍿
                    </motion.span>
                  )}
                  {/* Bonequinho Mini Lucy */}
                  <motion.div
                    animate={{ y: [0, -2, 0] }}
                    transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                    onClick={handleTap}
                    className="w-10 h-10 bg-gradient-to-br from-pink-400 to-rose-500 rounded-full border-2 border-slate-950 flex flex-col items-center justify-center relative cursor-pointer shadow-md shadow-pink-500/20"
                  >
                    {/* Orelhinhas redondas de filhote */}
                    <div className="absolute -top-1 -left-1 w-3.5 h-3.5 bg-pink-400 rounded-full border-2 border-slate-950" />
                    <div className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-pink-400 rounded-full border-2 border-slate-950" />
                    
                    {/* Olhinhos pequenos */}
                    <div className="flex gap-2 mt-2">
                      <div className="w-1.5 h-1.5 bg-slate-950 rounded-full animate-pulse" />
                      <div className="w-1.5 h-1.5 bg-slate-950 rounded-full animate-pulse" />
                    </div>
                    {/* Bochechas rosadas */}
                    <div className="absolute bottom-2.5 left-1 w-1.5 h-0.5 bg-rose-300 rounded-full" />
                    <div className="absolute bottom-2.5 right-1 w-1.5 h-0.5 bg-rose-300 rounded-full" />
                    
                    {/* Sorriso fofo */}
                    <div className="w-2 h-1 border-b border-slate-950 rounded-b-full mb-1" />
                  </motion.div>
                  <span className="text-[8px] font-mono font-bold text-pink-400 uppercase mt-1">Mini Lucy</span>
                </div>
              </motion.div>
            )}

            {/* COMPORTAMENTO: CORRENDO PELA TELA */}
            {behavior === "running" && (
              <motion.div
                key="mini-running"
                initial={{ x: "-10vw", y: "75vh" }}
                animate={{ x: "110vw" }}
                transition={{ duration: 12, ease: "linear" }}
                className="fixed z-40 pointer-events-auto cursor-pointer"
                onClick={handleTap}
              >
                <div className="flex flex-col items-center">
                  {/* Balãozinho de risada */}
                  <div className="bg-slate-900 border border-slate-800 text-[9px] text-pink-300 px-1.5 py-0.5 rounded-md mb-1 shadow-md">
                    Hihi! 🏃‍♀️💨
                  </div>
                  <motion.div
                    animate={{ rotate: [-8, 8, -8] }}
                    transition={{ repeat: Infinity, duration: 0.3 }}
                    className="w-8 h-8 bg-gradient-to-br from-pink-400 to-rose-500 rounded-full border-2 border-slate-950 relative flex items-center justify-center"
                  >
                    <div className="absolute -top-0.5 -left-0.5 w-3 h-3 bg-pink-400 rounded-full border-2 border-slate-950" />
                    <div className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-pink-400 rounded-full border-2 border-slate-950" />
                    <div className="flex gap-1 mt-1.5">
                      <div className="w-1 h-1 bg-slate-950 rounded-full" />
                      <div className="w-1 h-1 bg-slate-950 rounded-full" />
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            )}

            {/* COMPORTAMENTO: SEGURANDO PLAQUINHA DE PROTESTO */}
            {behavior === "holding_sign" && (
              <motion.div
                key="mini-sign"
                initial={{ opacity: 0, scale: 0.5, x: position.x, y: "80vh" }}
                animate={{ opacity: 1, scale: 1, x: position.x }}
                exit={{ opacity: 0, scale: 0.5 }}
                className="fixed z-40 pointer-events-auto cursor-pointer flex flex-col items-center"
                onClick={handleTap}
              >
                {/* Plaquinha de Papelão */}
                <div className="bg-amber-100 border-2 border-slate-950 px-2 py-1.5 rounded-lg shadow-md max-w-[120px] text-center shrink-0">
                  <p className="text-[9px] font-sans font-bold text-slate-900 leading-tight select-none">
                    {signText}
                  </p>
                </div>
                {/* Cabo de Placa */}
                <div className="w-1 h-3 bg-amber-800 border-x border-slate-950" />
                
                {/* Mini Lucy */}
                <motion.div
                  animate={{ y: [0, -1, 0] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="w-9 h-9 bg-gradient-to-br from-pink-400 to-rose-500 rounded-full border-2 border-slate-950 relative flex items-center justify-center -mt-1"
                >
                  <div className="absolute -top-0.5 -left-0.5 w-3 h-3 bg-pink-400 rounded-full border-2 border-slate-950" />
                  <div className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-pink-400 rounded-full border-2 border-slate-950" />
                  <div className="flex gap-1.5 mt-1">
                    <div className="w-1 h-1 bg-slate-950 rounded-full" />
                    <div className="w-1 h-1 bg-slate-950 rounded-full" />
                  </div>
                </motion.div>
              </motion.div>
            )}

            {/* COMPORTAMENTO: ESCONDENDO ATRÁS DE BOTÕES */}
            {behavior === "hiding" && (
              <motion.div
                key="mini-hiding"
                initial={{ opacity: 0, y: "92vh", x: "12vw" }}
                animate={{ opacity: 1, y: "87vh" }}
                exit={{ opacity: 0, y: "92vh" }}
                transition={{ duration: 1 }}
                className="fixed z-40 pointer-events-auto cursor-pointer flex flex-col items-center"
                onClick={handleTap}
              >
                <div className="bg-slate-900 border border-slate-800 text-[8px] text-pink-300 px-1 py-0.5 rounded-md mb-0.5 shadow">
                  Achei você! 👀
                </div>
                {/* Metade do corpo visível */}
                <div className="w-8 h-4 bg-gradient-to-t from-pink-400 to-pink-300 rounded-t-full border-t-2 border-x-2 border-slate-950 relative overflow-hidden">
                  <div className="flex gap-1.5 justify-center mt-1">
                    <div className="w-1.5 h-1.5 bg-slate-950 rounded-full" />
                    <div className="w-1.5 h-1.5 bg-slate-950 rounded-full" />
                  </div>
                </div>
              </motion.div>
            )}

            {/* COMPORTAMENTO: DORMINDO EM ALGUM CANTO (OU RECESSO TIMER) */}
            {behavior === "sleeping" && (
              <motion.div
                key="mini-sleeping"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="fixed bottom-6 left-1/4 z-40 pointer-events-auto cursor-pointer"
                onClick={handleTap}
              >
                <div className="flex flex-col items-center">
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                    className="w-8 h-8 bg-gradient-to-br from-pink-400/80 to-rose-500/80 rounded-full border-2 border-slate-950/40 relative flex items-center justify-center opacity-80"
                  >
                    <span className="absolute -top-3 -right-2 text-[10px] font-bold text-pink-400 animate-bounce">
                      Zzz...
                    </span>
                    <div className="absolute -top-0.5 -left-0.5 w-2.5 h-2.5 bg-pink-400/80 rounded-full border-2 border-slate-950/40" />
                    <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-pink-400/80 rounded-full border-2 border-slate-950/40" />
                    {/* Olhos fechados (riscos) */}
                    <div className="flex gap-1.5 mt-1.5">
                      <div className="text-[7px] font-black leading-none text-slate-800">-</div>
                      <div className="text-[7px] font-black leading-none text-slate-800">-</div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            )}

            {/* COMPORTAMENTO: IDLE PADRÃO */}
            {behavior === "idle" && (
              <motion.div
                key="mini-idle"
                initial={{ opacity: 0, x: position.x, y: position.y }}
                animate={{ opacity: 1, x: position.x, y: position.y }}
                exit={{ opacity: 0 }}
                className="fixed z-40 pointer-events-auto cursor-pointer"
                onClick={handleTap}
              >
                <motion.div
                  animate={{ y: [0, -3, 0] }}
                  transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
                  className="w-8 h-8 bg-gradient-to-br from-pink-400 to-rose-500 rounded-full border-2 border-slate-950 relative flex flex-col items-center justify-center shadow-md shadow-pink-500/10"
                >
                  <div className="absolute -top-0.5 -left-0.5 w-2.5 h-2.5 bg-pink-400 rounded-full border-2 border-slate-950" />
                  <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-pink-400 rounded-full border-2 border-slate-950" />
                  <div className="flex gap-1.5 mt-1">
                    <div className="w-1 h-1 bg-slate-950 rounded-full" />
                    <div className="w-1 h-1 bg-slate-950 rounded-full" />
                  </div>
                  <div className="w-1.5 h-0.5 border-b border-slate-950 rounded-b-full mt-0.5" />
                </motion.div>
              </motion.div>
            )}
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
