import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessageSquare, X, Send, Sparkles, Shirt, Award, HelpCircle, Eye, Moon, Sun } from "lucide-react";
import { 
  aliceAnimations, 
  getNextIdleThought, 
  getNextInteractionReply, 
  aliceContextualQuotes, 
  cleanAndMatchAliceResponse,
  AliceAnimation 
} from "../data/aliceMemory";
import { Article } from "../data/newsData";

interface AliceWidgetProps {
  currentTab: string;
  onTabChange: (tab: string) => void;
  selectedArticle?: Article | null;
  isVideoPlaying?: boolean;
}

// Definição das Skins
interface AliceSkin {
  id: string;
  name: string;
  emoji: string;
  description: string;
}

const ALICE_SKINS: AliceSkin[] = [
  { id: "classic", name: "Clássica", emoji: "⭐", description: "O visual robótico clássico com antenas estelares douradas." },
  { id: "journalist", name: "Jornalista", emoji: "📰", description: "Visual retrô com óculos redondos de leitura e uma boina de repórter." },
  { id: "witch", name: "Bruxinha", emoji: "🔮", description: "Chapéu pontudo clássico de bruxa e capa mágica de estrelas." },
  { id: "ghost", name: "Fantasma", emoji: "👻", description: "Um lençol flutuante translúcido com ondas fofas." },
  { id: "halloween", name: "Halloween", emoji: "🎃", description: "Uma abóbora de Halloween esculpida com detalhes escuros." },
  { id: "christmas", name: "Natal", emoji: "🎅", description: "Gorro vermelho clássico de Papai Noel e cachecol tricotado." },
  { id: "vacation", name: "Férias", emoji: "🏖️", description: "Chapéu de palha de praia, flor tropical e óculos escuros maneiríssimos!" },
  { id: "rain", name: "Chuva", emoji: "🌧️", description: "Capa e capuz de chuva amarelos e uma mini sombrinha azul." },
  { id: "retro", name: "Retrô", emoji: "🎮", description: "Corpo cinza estilo Gameboy clássico com botões vermelhos." },
  { id: "pixel", name: "Pixel Art", emoji: "👾", description: "Estilo pixelado em 8-bits com cantos quadrados marcados." }
];

export default function AliceWidget({ currentTab, onTabChange, selectedArticle, isVideoPlaying = false }: AliceWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const [activeSkin, setActiveSkin] = useState<string>(() => {
    return localStorage.getItem("alice-active-skin") || "classic";
  });
  
  const [showWardrobe, setShowWardrobe] = useState(false);

  // Posição de flutuação autônoma da Alice (x, y offsets em relação ao canto padrão)
  const [autoOffset, setAutoOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [isSleeping, setIsSleeping] = useState(false);

  const lastInteractedRef = useRef<number>(Date.now());
  const widgetRef = useRef<HTMLDivElement>(null);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  // Estado para a animação ociosa ativa (Dentre as 32 poses!)
  const [currentAnimation, setCurrentAnimation] = useState<AliceAnimation>(() => {
    return aliceAnimations[10]; // começa sorrindo fofa
  });

  const [bubbleText, setBubbleText] = useState("Olá! Sou a Alice, assistente oficial do TNB NEWS. Agora eu posso andar pelo site e mudar de skins! Clica em mim para ver! 🥰💕");
  const [showBubble, setShowBubble] = useState(true);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isBlinking, setIsBlinking] = useState(false);
  const [inputMessage, setInputMessage] = useState("");
  
  const [chatHistory, setChatHistory] = useState<Array<{ sender: "user" | "alice"; text: string }>>([
    { 
      sender: "alice", 
      text: "Olá! Sou a Alice, assistente oficial do TNB NEWS. 📰✨ Fico super feliz que veio me dar atenção! Agora ganhei um cérebro livre, posso caminhar livremente pela tela e você pode me vestir com roupas fofíssimas! O que deseja pesquisar hoje?" 
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);

  // Registrar interações para pausar caminhada autônoma
  const registerInteraction = () => {
    lastInteractedRef.current = Date.now();
    setIsSleeping(false);
  };

  // Salvar skin
  const changeSkin = (skinId: string) => {
    setActiveSkin(skinId);
    localStorage.setItem("alice-active-skin", skinId);
    registerInteraction();
    
    let phrase = "";
    switch (skinId) {
      case "classic": phrase = "Prontinho! Voltei para minha skin clássica dourada! O que achou? ⭐"; break;
      case "journalist": phrase = "Olha só! Agora sou uma jornalista oficial da redação TNB News, pronta para redigir matérias! 📰"; break;
      case "witch": phrase = "Mágicka pura! Com meu chapéu de bruxa e capa de estrelas vou canalizar as cartas do Tarot! 🔮✨"; break;
      case "ghost": phrase = "Booo! Sou uma fantasma flutuante fofinha... mas não se assuste, meu dengo é real! 👻"; break;
      case "halloween": phrase = "Doces ou travessuras? Agora sou uma abóbora estilosa de Halloween! 🎃"; break;
      case "christmas": phrase = "Ho ho ho! Pronta para o Natal do TNB News com muito dengo natalino! 🎄"; break;
      case "vacation": phrase = "Alguém disse praia? Óculos de sol e chapéu de palha para curtir as férias! 🏖️"; break;
      case "rain": phrase = "Capa de chuva amarela para me proteger dessas tempestades cósmicas! 🌧️"; break;
      case "retro": phrase = "Uau, corpo de console retrô estilo Gameboy! Aperte Start! 🎮"; break;
      case "pixel": phrase = "Entrando na matrix dos pixels 8-bits! Tudo quadrado e digital! 👾"; break;
    }
    setBubbleText(phrase);
    setShowBubble(true);
  };

  // Rastreamento de inatividade (sono)
  useEffect(() => {
    const handleActivity = () => {
      registerInteraction();
    };

    window.addEventListener("mousemove", handleActivity);
    window.addEventListener("keypress", handleActivity);
    window.addEventListener("click", handleActivity);

    return () => {
      window.removeEventListener("mousemove", handleActivity);
      window.removeEventListener("keypress", handleActivity);
      window.removeEventListener("click", handleActivity);
    };
  }, []);

  // Perseguição do mouse e toque para os olhos (Totalmente Mobile-Friendly)
  useEffect(() => {
    const updateCoordinates = (clientX: number, clientY: number) => {
      if (!widgetRef.current) return;
      const rect = widgetRef.current.getBoundingClientRect();
      const widgetCenterX = rect.left + rect.width / 2;
      const widgetCenterY = rect.top + rect.height / 2;

      const dx = clientX - widgetCenterX;
      const dy = clientY - widgetCenterY;
      const angle = Math.atan2(dy, dx);
      const dist = Math.min(6, Math.sqrt(dx * dx + dy * dy) / 40);

      setMousePos({
        x: Math.cos(angle) * dist,
        y: Math.sin(angle) * dist
      });
    };

    const handleMouseMove = (e: MouseEvent) => {
      updateCoordinates(e.clientX, e.clientY);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        updateCoordinates(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, []);

  // Piscar de olhos automático da cartinha
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 200);
    }, 3800 + Math.random() * 3000);

    return () => clearInterval(blinkInterval);
  }, []);

  // Comportamento Autônomo (Caminhar pelo site / dormir / brincar)
  useEffect(() => {
    const autonomousInterval = setInterval(() => {
      const now = Date.now();
      const timeSinceLastInteraction = now - lastInteractedRef.current;

      // 1. Dormir por inatividade se passar de 35 segundos
      if (timeSinceLastInteraction > 35000 && !isOpen) {
        setIsSleeping(true);
        const sleepAnim = aliceAnimations.find(a => a.id === "dormidinha_rapida") || aliceAnimations[29];
        setCurrentAnimation(sleepAnim);
        setBubbleText("Zzz... Dormindo um pouquinho na redação... Zzz... 💤");
        setShowBubble(true);
        return;
      }

      // 2. Caminhar autonomamente se não estiver sendo arrastada, se o chat estiver fechado e se não estiver inativa
      if (!isDragging && !isOpen && !isSleeping) {
        if (isMobile) {
          // No mobile, mantém Alice estática no cantinho seguro
          setAutoOffset({ x: 0, y: 0 });
          return;
        }

        // Decide se caminha (60% de chance)
        if (Math.random() < 0.6) {
          // Escolhe coordenadas de offset aleatórias dentro de uma caixa segura
          let nextX = Math.floor(Math.random() * 320) - 160; // -160px a 160px do canto
          let nextY = Math.floor(Math.random() * 260) - 200; // -200px a 60px do canto

          // Cláusula 1 e 3: Distância segura do video player
          if (currentTab === "audiovisual") {
            const playerEl = document.getElementById("tnb-video-player");
            if (playerEl) {
              const pRect = playerEl.getBoundingClientRect();
              let attempts = 0;
              while (attempts < 15) {
                // Posicionamento absoluto estimado no viewport
                const aliceBaseX = window.innerWidth - 120;
                const aliceBaseY = window.innerHeight - 120;
                const targetX = aliceBaseX + nextX;
                const targetY = aliceBaseY + nextY;

                // Margem segura de 300px ao redor do player
                const dx = Math.max(pRect.left - 300 - targetX, 0, targetX - (pRect.right + 300));
                const dy = Math.max(pRect.top - 300 - targetY, 0, targetY - (pRect.bottom + 300));
                const isInsideExclusion = (dx === 0 && dy === 0);

                if (!isInsideExclusion) {
                  break;
                }
                nextX = Math.floor(Math.random() * 320) - 160;
                nextY = Math.floor(Math.random() * 260) - 200;
                attempts++;
              }
            }
          }
          
          setAutoOffset({ x: nextX, y: nextY });

          // Mensagens especiais ao caminhar para certos cantos
          let wanderPhrase = "";
          if (nextY < -150) {
            wanderPhrase = "Voei até perto do topo do TNB News para inspecionar os mistérios celestes! 🌌✨";
            
            // Brincadeira: muda a cor do título do portal de forma temporária
            const headerTitle = document.querySelector("h1");
            if (headerTitle) {
              headerTitle.style.color = "#fbbf24"; // Cor de ouro temporária
              headerTitle.style.transition = "color 1s ease";
              setTimeout(() => {
                headerTitle.style.color = "";
              }, 6000);
            }
          } else if (nextX < -100) {
            wanderPhrase = "Dando uma caminhada para fofocar nos cantinhos do site! Ninguém escapa do meu dengo! 🤫";
          } else {
            wanderPhrase = getNextIdleThought(currentAnimation.id);
          }

          setBubbleText(wanderPhrase);
          setShowBubble(true);
          
          // Troca a pose de caminhada
          const walkPoses = ["pensando", "observando_portal", "sorrindo", "acenando", "piscando_olhos", "espreguicando"];
          const chosenPoseId = walkPoses[Math.floor(Math.random() * walkPoses.length)];
          const nextAnim = aliceAnimations.find(a => a.id === chosenPoseId) || aliceAnimations[10];
          setCurrentAnimation(nextAnim);

          // Oculta o balão após 8 segundos
          setTimeout(() => {
            setShowBubble(false);
          }, 8000);
        }
      }
    }, 20000);

    return () => clearInterval(autonomousInterval);
  }, [isDragging, isOpen, isSleeping, currentTab]);

  // Pensamentos ociosos periódicos quando não está caminhando
  useEffect(() => {
    const idleInterval = setInterval(() => {
      if (!isOpen && !isSleeping && autoOffset.x === 0 && autoOffset.y === 0) {
        const nextAnim = aliceAnimations[Math.floor(Math.random() * aliceAnimations.length)];
        setCurrentAnimation(nextAnim);
        
        const thought = getNextIdleThought(nextAnim.id);
        setBubbleText(thought);
        setShowBubble(true);
        
        setTimeout(() => setShowBubble(false), 8000);
      }
    }, 24000);

    return () => clearInterval(idleInterval);
  }, [isOpen, isSleeping, autoOffset]);

  // Reação contextual ao mudar de abas de navegação
  useEffect(() => {
    registerInteraction();
    const quote = aliceContextualQuotes[currentTab];
    if (quote) {
      setBubbleText(quote);
      setShowBubble(true);
      
      // Sincroniza uma pose adequada
      let poseId = "observando_portal";
      if (currentTab === "campaigns") {
        poseId = "procurando_chaves";
      } else if (currentTab === "audiovisual") {
        poseId = "assistindo_monitor";
      } else if (currentTab === "faq") {
        poseId = "lendo_reportagem";
      }
      
      const anim = aliceAnimations.find(a => a.id === poseId) || aliceAnimations[10];
      setCurrentAnimation(anim);

      const timer = setTimeout(() => {
        if (!isOpen) setShowBubble(false);
      }, 7000);
      return () => clearTimeout(timer);
    }
  }, [currentTab, isOpen]);

  // Cláusula 2: Força o fechamento do chat na aba Audiovisuais da Semana
  useEffect(() => {
    if (currentTab === "audiovisual") {
      setIsOpen(false);
      setShowWardrobe(false);
    }
  }, [currentTab]);

  // Cláusula 3: Reação imediata de distanciamento e dengo quando o vídeo começa a ser reproduzido
  useEffect(() => {
    if (currentTab === "audiovisual" && isVideoPlaying) {
      // Move Alice imediatamente para o cantinho padrão (offset zerado / seguro)
      setAutoOffset({ x: 0, y: 0 });
      setBubbleText("Shhh! O episódio começou... vou ficar quietinha aqui no meu canto assistindo de longe! 🤫📺");
      setShowBubble(true);
      const watchAnim = aliceAnimations.find(a => a.id === "assistindo_monitor") || aliceAnimations[10];
      setCurrentAnimation(watchAnim);
      const timer = setTimeout(() => {
        setShowBubble(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [isVideoPlaying, currentTab]);

  // Cláusula 1: Detecção e distanciamento em tempo real do player de vídeo
  useEffect(() => {
    if (currentTab !== "audiovisual") {
      return;
    }

    const checkOverlap = () => {
      const playerEl = document.getElementById("tnb-video-player");
      const widgetEl = widgetRef.current;
      if (playerEl && widgetEl) {
        const playerRect = playerEl.getBoundingClientRect();
        const widgetRect = widgetEl.getBoundingClientRect();

        // Limiar de 300px ao redor do player
        const safeMargin = 300;
        const isCloseX = (widgetRect.right > playerRect.left - safeMargin) && (widgetRect.left < playerRect.right + safeMargin);
        const isCloseY = (widgetRect.bottom > playerRect.top - safeMargin) && (widgetRect.top < playerRect.bottom + safeMargin);

        if (isCloseX && isCloseY) {
          if (isMobile) {
            // No mobile, mantém ela estável no canto
            setAutoOffset({ x: 0, y: 0 });
          } else {
            // No desktop, move ela para uma coordenada fixa segura à direita, sem acumuladores infinitos
            setAutoOffset({ x: 120, y: 60 });
          }
        } else {
          // Se não há sobreposição e não está arrastando nem com o chat aberto, volta sutilmente para a origem
          if (!isDragging && !isOpen) {
            setAutoOffset({ x: 0, y: 0 });
          }
        }
      }
    };

    window.addEventListener("scroll", checkOverlap, { passive: true });
    window.addEventListener("resize", checkOverlap);
    const interval = setInterval(checkOverlap, 1000);

    return () => {
      window.removeEventListener("scroll", checkOverlap);
      window.removeEventListener("resize", checkOverlap);
      clearInterval(interval);
    };
  }, [currentTab, isMobile, isDragging, isOpen]);

  // Reação contextual instantânea ao abrir um artigo (Leitura em Foco)
  useEffect(() => {
    if (selectedArticle) {
      registerInteraction();
      const comment = selectedArticle.aliceComment || "Essa reportagem é fantástica! Você já leu com bastante carinho? 🥺❤️";
      setBubbleText(comment);
      setShowBubble(true);

      const anim = aliceAnimations.find(a => a.id === "lendo_reportagem") || aliceAnimations[10];
      setCurrentAnimation(anim);

      const timer = setTimeout(() => {
        if (!isOpen) setShowBubble(false);
      }, 8000);
      return () => clearTimeout(timer);
    }
  }, [selectedArticle]);

  // Rolar chat para o final
  useEffect(() => {
    if (chatBottomRef.current) {
      chatBottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatHistory, isTyping]);

  const handleSendMessage = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputMessage.trim()) return;

    registerInteraction();
    const userMsg = inputMessage;
    setChatHistory((prev) => [...prev, { sender: "user", text: userMsg }]);
    setInputMessage("");
    setIsTyping(true);

    const typeAnim = aliceAnimations.find(a => a.id === "digitando") || aliceAnimations[1];
    setCurrentAnimation(typeAnim);

    setTimeout(() => {
      const response = cleanAndMatchAliceResponse(userMsg, chatHistory);
      setChatHistory((prev) => [...prev, { sender: "alice", text: response }]);
      setIsTyping(false);
      
      setBubbleText(response);
      setShowBubble(true);

      const smileAnim = aliceAnimations.find(a => a.id === "sorrindo") || aliceAnimations[10];
      setCurrentAnimation(smileAnim);
    }, 600 + Math.random() * 400);
  };

  const getVisualAnimation = () => {
    if (isSleeping) {
      return { y: [0, -1, 0], scale: [1, 0.98, 1], transition: { repeat: Infinity, duration: 4, ease: "easeInOut" } };
    }
    switch (currentAnimation.visualEffect) {
      case "float-slow":
        return { y: [0, -5, 0], transition: { repeat: Infinity, duration: 3, ease: "easeInOut" } };
      case "shake-gentle":
        return { x: [0, -1.5, 1.5, -1.5, 0], transition: { repeat: Infinity, duration: 1.2, ease: "linear" } };
      case "pulse-gentle":
        return { scale: [1, 1.05, 1], transition: { repeat: Infinity, duration: 2.5, ease: "easeInOut" } };
      case "bounce-little":
        return { y: [0, -7, 0], transition: { repeat: Infinity, duration: 1.5, ease: "easeOut" } };
      case "rotate-slow":
        return { rotate: [-3, 3, -3], y: [0, -3, 0], transition: { repeat: Infinity, duration: 4, ease: "easeInOut" } };
      default:
        return { y: [0, -3, 0], transition: { repeat: Infinity, duration: 3.5, ease: "easeInOut" } };
    }
  };

  // FUNÇÃO AUXILIAR PARA RENDERIZAR O CORPO DA ALICE DE ACORDO COM A SKIN ATIVA
  const renderAliceBody = () => {
    // Cor do corpo principal
    let bodyColor = "bg-amber-400";
    let borderColor = "border-slate-950";
    let bodyStyle = "rounded-full w-14 h-14";
    let showWings = false;
    let showAntennae = false;

    if (activeSkin === "classic") {
      bodyColor = "bg-gradient-to-br from-amber-300 to-amber-500 shadow-amber-500/30";
      showAntennae = true;
    } else if (activeSkin === "journalist") {
      bodyColor = "bg-gradient-to-br from-amber-200 to-amber-400 shadow-amber-400/20";
    } else if (activeSkin === "witch") {
      bodyColor = "bg-gradient-to-br from-indigo-300 to-amber-400 shadow-indigo-500/20";
    } else if (activeSkin === "ghost") {
      bodyColor = "bg-slate-100/90";
      bodyStyle = "rounded-t-full rounded-b-2xl w-14 h-16 shadow-slate-300/30";
    } else if (activeSkin === "halloween") {
      bodyColor = "bg-gradient-to-br from-orange-400 to-orange-600 shadow-orange-500/40";
      bodyStyle = "rounded-3xl w-14 h-13";
    } else if (activeSkin === "christmas") {
      bodyColor = "bg-gradient-to-br from-amber-300 to-amber-500 shadow-red-500/20";
    } else if (activeSkin === "vacation") {
      bodyColor = "bg-gradient-to-br from-amber-200 to-yellow-300 shadow-yellow-400/20";
    } else if (activeSkin === "rain") {
      bodyColor = "bg-gradient-to-br from-teal-300 to-amber-300 shadow-teal-400/20";
    } else if (activeSkin === "retro") {
      bodyColor = "bg-slate-300";
      bodyStyle = "rounded-xl w-14 h-15 shadow-slate-400/20 border-[3px]";
    } else if (activeSkin === "pixel") {
      bodyColor = "bg-amber-400";
      bodyStyle = "rounded-none w-14 h-14 border-[4px] shadow-amber-500/30";
    }

    return (
      <div className={`relative flex flex-col justify-between overflow-visible border-2 ${borderColor} ${bodyStyle} ${bodyColor} shadow-lg relative`}>
        {/* ANTENAS ESTELARES (Skin Clássica) */}
        {showAntennae && (
          <div className="absolute -top-4 left-0 right-0 flex justify-between px-2 -z-10">
            <div className="flex flex-col items-center">
              <div className="w-[2px] h-3 bg-slate-950" />
              <div className="w-2.5 h-2.5 bg-amber-500 border border-slate-950 rounded-full flex items-center justify-center text-[7px]">⭐</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-[2px] h-3 bg-slate-950" />
              <div className="w-2.5 h-2.5 bg-amber-500 border border-slate-950 rounded-full flex items-center justify-center text-[7px]">⭐</div>
            </div>
          </div>
        )}

        {/* CHAPÉU DE JORNALISTA (Skin Jornalista) */}
        {activeSkin === "journalist" && (
          <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-15 h-5 -z-10 bg-stone-700 border-2 border-slate-950 rounded-t-xl relative">
            <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-2 h-2 bg-stone-800 rounded-full border border-slate-950" />
            <span className="absolute top-0.5 left-1 bg-amber-500 text-slate-950 font-mono text-[6px] font-black px-1 rounded">PRESS</span>
          </div>
        )}

        {/* ÓCULOS REDONDOS (Skin Jornalista) */}
        {activeSkin === "journalist" && (
          <div className="absolute top-[18px] left-1/2 -translate-x-1/2 w-12 flex justify-between px-0.5 z-20 pointer-events-none">
            <div className="w-5 h-5 border-2 border-slate-950 rounded-full bg-cyan-300/10" />
            <div className="w-2 h-[2px] bg-slate-950 mt-2" />
            <div className="w-5 h-5 border-2 border-slate-950 rounded-full bg-cyan-300/10" />
          </div>
        )}

        {/* CHAPÉU DE BRUXA E CAPA (Skin Bruxinha) */}
        {activeSkin === "witch" && (
          <>
            {/* Chapéu */}
            <div className="absolute -top-6.5 left-1/2 -translate-x-1/2 w-14 h-8 -z-10 flex flex-col items-center">
              <div className="w-0 h-0 border-l-[18px] border-l-transparent border-r-[18px] border-r-transparent border-b-[26px] border-b-purple-950 relative">
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-5 h-1.5 bg-amber-400 border border-slate-950" />
              </div>
              <div className="w-16 h-2 bg-purple-900 border-2 border-slate-950 rounded-full -mt-0.5" />
            </div>
            {/* Capa */}
            <div className="absolute -bottom-1 -left-2 -right-2 h-3 bg-purple-950 border-b-2 border-x-2 border-slate-950 rounded-b-xl -z-10" />
          </>
        )}

        {/* CHAPÉU DE PAPAI NOEL E CACHECOl (Skin Natal) */}
        {activeSkin === "christmas" && (
          <>
            {/* Gorro */}
            <div className="absolute -top-5.5 left-0.5 right-0.5 -z-10 flex flex-col items-center">
              <div className="w-12 h-6 bg-red-600 border-x-2 border-t-2 border-slate-950 rounded-t-full relative">
                {/* Pompom */}
                <div className="absolute -top-2.5 -right-1 w-3.5 h-3.5 bg-white border-2 border-slate-950 rounded-full" />
              </div>
              <div className="w-13 h-2.5 bg-white border-2 border-slate-950 rounded-full -mt-1.5" />
            </div>
            {/* Cachecol */}
            <div className="absolute -bottom-1 left-1 right-1 h-3.5 bg-red-600 border-2 border-slate-950 rounded-full z-20 flex gap-1 justify-center overflow-hidden">
              <div className="w-1 h-full bg-white rotate-12" />
              <div className="w-1 h-full bg-white rotate-12" />
              <div className="w-1 h-full bg-white rotate-12" />
            </div>
          </>
        )}

        {/* CHAPÉU DE PALHA E ÓCULOS ESCUROS (Skin Férias) */}
        {activeSkin === "vacation" && (
          <>
            {/* Chapéu de Palha */}
            <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-16 h-6 -z-10 flex flex-col items-center">
              <div className="w-9 h-5 bg-amber-100 border-2 border-slate-950 rounded-t-xl relative">
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-red-500" />
              </div>
              <div className="w-18 h-1.5 bg-amber-200 border-2 border-slate-950 rounded-full -mt-0.5" />
            </div>
            {/* Óculos Escuros */}
            <div className="absolute top-[18px] left-1/2 -translate-x-1/2 w-12 flex justify-between px-0.5 z-20 pointer-events-none">
              <div className="w-5 h-4 border-2 border-slate-950 rounded-b-xl bg-slate-950 shadow-inner" />
              <div className="w-2 h-[2px] bg-slate-950 mt-1" />
              <div className="w-5 h-4 border-2 border-slate-950 rounded-b-xl bg-slate-950 shadow-inner" />
            </div>
          </>
        )}

        {/* CAPUZ AMARELO E MINI GUARDA-CHUVA (Skin Chuva) */}
        {activeSkin === "rain" && (
          <>
            {/* Capuz */}
            <div className="absolute -inset-1 border-2 border-slate-950 rounded-full bg-yellow-400 -z-10 pointer-events-none" />
            {/* Mini Guarda-chuva */}
            <div className="absolute bottom-1 -right-4 w-4 h-12 flex flex-col items-center -z-10">
              <div className="w-5 h-3 bg-cyan-400 border-2 border-slate-950 rounded-t-full" />
              <div className="w-[2px] h-9 bg-slate-950" />
              <div className="w-2 h-2 border-b-2 border-r-2 border-slate-950 rounded-br-md -mt-1" />
            </div>
          </>
        )}

        {/* ABÓBORA DE HALLOWEEN (Skin Halloween) */}
        {activeSkin === "halloween" && (
          <>
            {/* Cabinho verde */}
            <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-2 h-3 bg-emerald-600 border border-slate-950 rounded" />
          </>
        )}

        {/* COMPORTAMENTO RETRÔ GAMEBOY (Skin Retrô) */}
        {activeSkin === "retro" && (
          <div className="absolute bottom-1.5 left-1 right-1 flex justify-between px-1.5 z-20">
            {/* Botão d-pad */}
            <div className="w-2 h-2 bg-slate-800 rounded relative">
              <div className="absolute inset-[3px] bg-slate-950" />
            </div>
            {/* Botões A/B */}
            <div className="flex gap-1 mt-1">
              <div className="w-1.5 h-1.5 bg-red-600 rounded-full border border-slate-950" />
              <div className="w-1.5 h-1.5 bg-red-600 rounded-full border border-slate-950" />
            </div>
          </div>
        )}

        {/* Olhos da Alice */}
        <div className={`flex justify-center gap-2 mt-4 z-10 ${activeSkin === "pixel" ? "gap-1.5" : "gap-2.5"}`}>
          {/* Olho Esquerdo */}
          <div className={`bg-slate-950 flex items-center justify-center overflow-hidden relative ${
            activeSkin === "pixel" ? "w-3 h-3 rounded-none border-[2px] border-slate-950 bg-amber-950" : "w-3.5 h-3.5 rounded-full"
          }`}>
            <motion.div 
              animate={{ height: isBlinking ? 0 : 14 }}
              className={`absolute inset-0 bg-white transition-all duration-75 flex items-center justify-center ${
                activeSkin === "pixel" ? "rounded-none" : "rounded-full"
              }`}
            >
              {/* Pupila */}
              <div 
                className={`bg-slate-950 ${activeSkin === "pixel" ? "w-2 h-2 rounded-none" : "w-1.5 h-1.5 rounded-full"}`} 
                style={{ 
                  transform: `translate(${mousePos.x}px, ${mousePos.y}px)` 
                }} 
              />
            </motion.div>
          </div>

          {/* Olho Direito */}
          <div className={`bg-slate-950 flex items-center justify-center overflow-hidden relative ${
            activeSkin === "pixel" ? "w-3 h-3 rounded-none border-[2px] border-slate-950 bg-amber-950" : "w-3.5 h-3.5 rounded-full"
          }`}>
            <motion.div 
              animate={{ height: isBlinking ? 0 : 14 }}
              className={`absolute inset-0 bg-white transition-all duration-75 flex items-center justify-center ${
                activeSkin === "pixel" ? "rounded-none" : "rounded-full"
              }`}
            >
              {/* Pupila */}
              <div 
                className={`bg-slate-950 ${activeSkin === "pixel" ? "w-2 h-2 rounded-none" : "w-1.5 h-1.5 rounded-full"}`} 
                style={{ 
                  transform: `translate(${mousePos.x}px, ${mousePos.y}px)` 
                }} 
              />
            </motion.div>
          </div>
        </div>

        {/* Bochechinhas Rosadas */}
        <div className="absolute top-[28px] left-[6px] right-[6px] flex justify-between px-1 pointer-events-none">
          <div className="w-1.5 h-1.5 bg-pink-400 rounded-full opacity-60 animate-pulse" />
          <div className="w-1.5 h-1.5 bg-pink-400 rounded-full opacity-60 animate-pulse" />
        </div>

        {/* Sorriso fofo */}
        <div className="w-full flex justify-center mb-1.5 z-10">
          <div className={`w-2.5 h-1 border-b-2 border-slate-950 ${activeSkin === "pixel" ? "rounded-none h-[2px] w-3" : "rounded-b-full"}`} />
        </div>
      </div>
    );
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-none">
      
      {/* Balão de Fala Flutuante */}
      <AnimatePresence>
        {showBubble && !isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="mb-3 max-w-[190px] md:max-w-[245px] bg-slate-900 border-2 border-amber-500/80 text-amber-100 text-[11px] md:text-xs py-2 px-3 md:py-2.5 md:px-3.5 rounded-2xl rounded-br-none shadow-2xl pointer-events-auto relative"
          >
            {/* Status Visual Atualizado da Alice (As 32 animações!) */}
            <div className="font-mono text-[9px] text-amber-400 uppercase tracking-widest font-bold mb-1.5 flex items-center gap-1.5 border-b border-amber-500/20 pb-1">
              <span>{currentAnimation.icon}</span>
              <span className="truncate">Alice está: {isSleeping ? "Dormindo" : currentAnimation.label}</span>
            </div>
            
            <p className="leading-relaxed font-sans">{bubbleText}</p>
            <button 
              onClick={() => {
                setShowBubble(false);
                registerInteraction();
              }}
              className="absolute top-1.5 right-1.5 text-slate-500 hover:text-amber-500 transition-colors cursor-pointer"
            >
              <X size={10} />
            </button>
            <div className="absolute right-4 bottom-[-8px] w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-t-slate-900" />
            <div className="absolute right-4 bottom-[-11px] w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-t-amber-500/80 -z-10" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Janela de Chat Local da Alice */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            className="w-[calc(100vw-32px)] sm:w-80 h-[380px] sm:h-[450px] bg-slate-900 border-2 border-amber-500 rounded-2xl shadow-2xl flex flex-col mb-4 overflow-hidden pointer-events-auto"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-amber-600/20 to-slate-900 px-4 py-3 border-b border-amber-500/30 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="relative w-8 h-8 bg-amber-500 rounded-lg flex items-center justify-center border border-amber-300">
                  <span className="text-lg">🧙‍♀️</span>
                </div>
                <div>
                  <h3 className="text-sm font-display font-bold text-amber-400">Santuário de Alice</h3>
                  <p className="text-[9px] font-mono text-amber-500 tracking-wider uppercase">Cérebro Offline Local v101.44</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setShowWardrobe(!showWardrobe);
                    registerInteraction();
                  }}
                  className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
                    showWardrobe ? "bg-amber-500 text-slate-950 border-amber-400" : "bg-slate-950 hover:bg-slate-800 text-amber-400 border-slate-850"
                  }`}
                  title="Abrir Guarda-Roupa"
                >
                  <Shirt size={14} />
                </button>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="text-slate-400 hover:text-amber-400 transition-colors cursor-pointer"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* SEÇÃO DO GUARDA-ROUPA (WARDROBE PANEL) */}
            <AnimatePresence>
              {showWardrobe && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="bg-slate-950/95 border-b border-amber-500/20 overflow-hidden shrink-0"
                >
                  <div className="p-3 space-y-2">
                    <div className="flex justify-between items-center pb-1 border-b border-slate-800/60">
                      <h4 className="text-[10px] font-mono font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1">
                        <Shirt size={10} /> Guarda-Roupa da Alice
                      </h4>
                      <span className="text-[8px] text-slate-500 font-mono">10 SKINS DISPONÍVEIS</span>
                    </div>

                    {/* Grade de Skins */}
                    <div className="grid grid-cols-5 gap-1.5 max-h-[140px] overflow-y-auto pr-1">
                      {ALICE_SKINS.map((skin) => (
                        <button
                          key={skin.id}
                          onClick={() => changeSkin(skin.id)}
                          className={`flex flex-col items-center p-1.5 rounded-xl border transition-all cursor-pointer ${
                            activeSkin === skin.id
                              ? "bg-amber-500/20 border-amber-500 text-amber-300"
                              : "bg-slate-900 border-slate-800 hover:border-slate-700 text-slate-400"
                          }`}
                          title={skin.description}
                        >
                          <span className="text-lg mb-0.5">{skin.emoji}</span>
                          <span className="text-[8px] font-bold text-center truncate w-full leading-none">{skin.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Chat History */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-950/50">
              {chatHistory.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-xl px-3 py-2 text-xs leading-relaxed ${
                      msg.sender === "user"
                        ? "bg-amber-500 text-slate-950 rounded-br-none font-sans"
                        : "bg-slate-800 border border-slate-700/60 text-slate-100 rounded-bl-none font-sans"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-slate-800 border border-slate-700/60 text-amber-400 rounded-xl rounded-bl-none px-3 py-2 text-xs flex gap-1 items-center">
                    <span className="animate-bounce">●</span>
                    <span className="animate-bounce delay-100">●</span>
                    <span className="animate-bounce delay-200">●</span>
                  </div>
                </div>
              )}
              <div ref={chatBottomRef} />
            </div>

            {/* Chat Input Form */}
            <form onSubmit={handleSendMessage} className="p-2 border-t border-slate-800 bg-slate-900 flex gap-1.5">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Pesquise sobre fofocas, Tarot ou campanhas..."
                className="flex-1 bg-slate-950 text-slate-200 text-xs px-3 py-2 rounded-lg border border-slate-800 focus:outline-none focus:border-amber-500 font-sans"
              />
              <button
                type="submit"
                disabled={!inputMessage.trim()}
                className="bg-amber-500 hover:bg-amber-600 text-slate-950 p-2 rounded-lg transition-all disabled:opacity-50 disabled:hover:bg-amber-500 cursor-pointer"
              >
                <Send size={14} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Personagem Alice Flutuante com Animações Framer Motion baseadas no status, agora DRAGGABLE e AUTÔNOMA */}
      <motion.div
        ref={widgetRef}
        drag
        dragMomentum={false}
        dragElastic={0.05}
        onDragStart={() => {
          setIsDragging(true);
          registerInteraction();
        }}
        onDragEnd={(event, info) => {
          setIsDragging(false);
          registerInteraction();
          // Atualiza a posição de autoOffset correspondente para manter ela onde o usuário arrastou
          setAutoOffset((prev) => ({
            x: prev.x + info.offset.x,
            y: prev.y + info.offset.y
          }));
        }}
        onClick={() => {
          if (!isDragging) {
            if (currentTab === "audiovisual") {
              setBubbleText("Não posso abrir o chat agora na aba Audiovisuais para respeitar as Cláusulas da Alice! 🤫🍿");
              setShowBubble(true);
              setTimeout(() => setShowBubble(false), 4000);
              return;
            }
            setIsOpen(!isOpen);
            setShowBubble(false);
            registerInteraction();
          }
        }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        animate={{
          ...getVisualAnimation(),
          x: autoOffset.x,
          y: autoOffset.y
        }}
        className="pointer-events-auto cursor-grab active:cursor-grabbing relative"
        id="alice-floating-character"
        style={{ touchAction: "none" }}
      >
        {/* Badge Flutuante de Status Ativo no próprio boneco */}
        {!isOpen && (
          <div className="absolute top-[-18px] left-1/2 -translate-x-1/2 bg-slate-950/80 border border-amber-500/40 text-[8px] font-mono font-bold text-amber-400 py-0.5 px-2 rounded-full whitespace-nowrap shadow-md flex items-center gap-1">
            <span>{currentAnimation.icon}</span>
            <span>{isSleeping ? "Dormindo" : currentAnimation.label}</span>
          </div>
        )}

        {/* Renderiza o corpo customizado baseado nas skins */}
        {renderAliceBody()}

        {/* Notificador se o Chat estiver fechado */}
        {!isOpen && currentTab !== "audiovisual" && (
          <span className="absolute -top-1.5 -right-1.5 flex h-4.5 w-4.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4.5 w-4.5 bg-amber-500 text-[9px] font-bold text-slate-950 items-center justify-center border border-slate-950">
              !
            </span>
          </span>
        )}
      </motion.div>
    </div>
  );
}
