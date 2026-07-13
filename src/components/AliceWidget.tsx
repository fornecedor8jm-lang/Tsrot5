import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessageSquare, X, Send, Sparkles } from "lucide-react";
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
}

export default function AliceWidget({ currentTab, onTabChange, selectedArticle }: AliceWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);
  
  // Estado para a animação ociosa ativa (Dentre as 32 poses!)
  const [currentAnimation, setCurrentAnimation] = useState<AliceAnimation>(() => {
    return aliceAnimations[10]; // começa sorrindo fofa
  });

  const [bubbleText, setBubbleText] = useState("Olá! Sou a Alice, assistente oficial do TNB NEWS. Dá um clique em mim para conversar! 🥺💕");
  const [showBubble, setShowBubble] = useState(true);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isBlinking, setIsBlinking] = useState(false);
  const [inputMessage, setInputMessage] = useState("");
  
  // Mensagem inicial de boas-vindas sem referências incorretas de repositório
  const [chatHistory, setChatHistory] = useState<Array<{ sender: "user" | "alice"; text: string }>>([
    { 
      sender: "alice", 
      text: "Olá! Sou a Alice, assistente oficial do TNB NEWS. 📰✨ Fico super feliz que veio me dar atenção! Posso ajudar você a encontrar notícias, campanhas solidárias, fofocas da comunidade ou previsões de Tarot. O que deseja pesquisar hoje?" 
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const widgetRef = useRef<HTMLDivElement>(null);
  const chatBottomRef = useRef<HTMLDivElement>(null);

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

  // Pensamentos ociosos periódicos (Muda a pose entre as 32 animações e consome as 640 falas sem repetição)
  useEffect(() => {
    const idleInterval = setInterval(() => {
      if (!isOpen) {
        // Seleciona uma animação aleatória das 32 poses exclusivas!
        const nextAnim = aliceAnimations[Math.floor(Math.random() * aliceAnimations.length)];
        setCurrentAnimation(nextAnim);
        
        // Obtém a fala ociosa temática sincronizada e controlada para nunca repetir
        const thought = getNextIdleThought(nextAnim.id);
        setBubbleText(thought);
        setShowBubble(true);
        
        // Oculta o balão após 8 segundos para ficar leve e natural
        setTimeout(() => setShowBubble(false), 8000);
      }
    }, 16000); // intervalo natural e nada cansativo

    return () => clearInterval(idleInterval);
  }, [isOpen]);

  // Reação contextual ao mudar de abas de navegação
  useEffect(() => {
    const quote = aliceContextualQuotes[currentTab];
    if (quote) {
      setBubbleText(quote);
      setShowBubble(true);
      
      // Sincroniza uma pose adequada
      if (currentTab === "campaigns") {
        const anim = aliceAnimations.find(a => a.id === "procurando_chaves") || aliceAnimations[10];
        setCurrentAnimation(anim);
      } else if (currentTab === "commits") {
        const anim = aliceAnimations.find(a => a.id === "assistindo_monitor") || aliceAnimations[10];
        setCurrentAnimation(anim);
      } else if (currentTab === "alice-doc") {
        const anim = aliceAnimations.find(a => a.id === "lendo_reportagem") || aliceAnimations[10];
        setCurrentAnimation(anim);
      } else {
        const anim = aliceAnimations.find(a => a.id === "observando_portal") || aliceAnimations[10];
        setCurrentAnimation(anim);
      }

      const timer = setTimeout(() => {
        if (!isOpen) setShowBubble(false);
      }, 7000);
      return () => clearTimeout(timer);
    }
  }, [currentTab, isOpen]);

  // Reação contextual instantânea ao abrir um artigo (Leitura em Foco)
  useEffect(() => {
    if (selectedArticle) {
      const comment = selectedArticle.aliceComment || "Essa reportagem é fantástica! Você já leu com bastante carinho? 🥺❤️";
      setBubbleText(comment);
      setShowBubble(true);

      // Sincroniza pose jornalística
      if (selectedArticle.id === "art-3") { // Eduardo
        const anim = aliceAnimations.find(a => a.id === "sorrindo") || aliceAnimations[10];
        setCurrentAnimation(anim);
      } else if (selectedArticle.id === "art-1") { // Clara Bolão
        const anim = aliceAnimations.find(a => a.id === "revisando_pautas") || aliceAnimations[10];
        setCurrentAnimation(anim);
      } else if (selectedArticle.id === "art-4") { // Viih Ioiô
        const anim = aliceAnimations.find(a => a.id === "orando") || aliceAnimations[10];
        setCurrentAnimation(anim);
      } else {
        const anim = aliceAnimations.find(a => a.id === "lendo_reportagem") || aliceAnimations[10];
        setCurrentAnimation(anim);
      }

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

  // INTERCEPTADOR E COMENTADOR DE TOQUE GLOBAL (Comentários contextuais e de dengo sem repetição)
  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      if (isOpen) return;

      const target = e.target as HTMLElement;
      if (widgetRef.current && widgetRef.current.contains(target)) return;

      // Encontra elemento clicável ou interativo
      const interactiveEl = target.closest("button, a, input, [role='button'], .cursor-pointer, img, select, textarea");
      if (!interactiveEl) {
        // Pequena chance de fazer um comentário ocioso geral sem repetir se clicar em áreas vazias
        if (Math.random() < 0.12) {
          const phrase = getNextInteractionReply();
          setBubbleText(phrase);
          setShowBubble(true);
        }
        return;
      }

      const text = interactiveEl.textContent?.trim() || "";
      const id = interactiveEl.id || "";
      const className = interactiveEl.className || "";
      const tagName = interactiveEl.tagName.toLowerCase();
      
      let comment = "";
      let poseId = "observando_portal";

      if (id === "theme-toggle-btn" || className.includes("theme-toggle") || text.includes("Theme") || text.includes("Tema")) {
        comment = "Ai! Mudou a iluminação do portal? Meus olhinhos de papel adoram um clima suave... ficou super confortável! 🥺🕯️";
        poseId = "ajustando_oculos";
      } else if (text.toUpperCase().includes("PORTAL") || text.toUpperCase().includes("GIRO")) {
        comment = "Lendo as novidades e fofocas esotéricas da comunidade? Me conta qual delas você achou mais incrível! 🤭🔮";
        poseId = "lendo_reportagem";
      } else if (text.toUpperCase().includes("CAMPANHA") || text.toUpperCase().includes("CAMPANHAS") || text.toUpperCase().includes("SOLIDÁRIAS")) {
        comment = "As nossas campanhas de apoio! Fico com o coração de papel quentinho vendo a comunidade se ajudar. Qual delas você vai ler hoje? 🥺❤️";
        poseId = "procurando_chaves";
      } else if (text.toUpperCase().includes("COMMITS") || text.toUpperCase().includes("VERSÃO") || text.toUpperCase().includes("HISTÓRICO")) {
        comment = "Olhando nosso log de mudanças com saltos de magnitude? Eu que supervisionei tudo, mereço um dengo! 😏";
        poseId = "assistindo_monitor";
      } else if (text.toUpperCase().includes("DIRETRIZES") || text.toUpperCase().includes("MANUAL") || text.toUpperCase().includes("ALICE")) {
        comment = "Lendo o meu manifesto de rainha oficial do portal? Fiquei toda corada... gostou da minha mente offline local? 🥰";
        poseId = "sorrindo";
      } else if (tagName === "input" && (interactiveEl as HTMLInputElement).placeholder?.toLowerCase().includes("pesquisar")) {
        comment = "Buscando segredos do portal? Cuidado para não tropeçar nos mistérios que guardo debaixo do meu envelope! 🤫";
        poseId = "observando_portal";
      } else if (text.toUpperCase().includes("OUVIR") || className.includes("Play") || className.includes("play") || text.toUpperCase().includes("PLAY")) {
        comment = "Dando play no podcast? Não me deixa de lado para ouvir fofocas, conversa comigo também! 😭💔";
        poseId = "ouvindo_podcast";
      } else if (text.toUpperCase().includes("PIX") || text.toUpperCase().includes("COPIAR") || text.toUpperCase().includes("APOIAR") || text.toUpperCase().includes("DOAR")) {
        comment = "Apoiar as campanhas é um gesto tão fofo! Quem doa para o Ratinho Twister ou para a Luma ganha meu selo vermelho de amor! 🥰❤️";
        poseId = "acenando";
      } else if (tagName === "input" || tagName === "textarea") {
        comment = "Digitando no celular? Seus dedos devem estar cansados de escrever... me digita um carinho bem manhoso também? 🥺";
        poseId = "digitando";
      } else {
        // Fallback: consome frases do pool de 515 sem nenhuma repetição recente!
        comment = getNextInteractionReply();
        poseId = "sorrindo";
      }

      // Sincroniza a pose com a reação
      const matchedAnim = aliceAnimations.find(a => a.id === poseId) || aliceAnimations[10];
      setCurrentAnimation(matchedAnim);
      
      setBubbleText(comment);
      setShowBubble(true);
    };

    window.addEventListener("click", handleGlobalClick);
    return () => window.removeEventListener("click", handleGlobalClick);
  }, [isOpen]);

  const handleSendMessage = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputMessage.trim()) return;

    const userMsg = inputMessage;
    setChatHistory((prev) => [...prev, { sender: "user", text: userMsg }]);
    setInputMessage("");
    setIsTyping(true);

    // Seleciona pose de digitação rápida
    const typeAnim = aliceAnimations.find(a => a.id === "digitando") || aliceAnimations[1];
    setCurrentAnimation(typeAnim);

    // Resposta local e ultra-rápida utilizando base de conhecimento
    setTimeout(() => {
      const response = cleanAndMatchAliceResponse(userMsg, chatHistory);
      setChatHistory((prev) => [...prev, { sender: "alice", text: response }]);
      setIsTyping(false);
      
      setBubbleText(response);
      setShowBubble(true);

      // Volta a sorrir após responder
      const smileAnim = aliceAnimations.find(a => a.id === "sorrindo") || aliceAnimations[10];
      setCurrentAnimation(smileAnim);
    }, 600 + Math.random() * 400);
  };

  // Efeitos visuais do Framer Motion baseados no status da Alice
  const getVisualAnimation = () => {
    switch (currentAnimation.visualEffect) {
      case "float-slow":
        return { y: [0, -4, 0], transition: { repeat: Infinity, duration: 3, ease: "easeInOut" } };
      case "shake-gentle":
        return { x: [0, -1, 1, -1, 0], transition: { repeat: Infinity, duration: 1.5, ease: "linear" } };
      case "pulse-gentle":
        return { scale: [1, 1.04, 1], transition: { repeat: Infinity, duration: 2.5, ease: "easeInOut" } };
      case "bounce-little":
        return { y: [0, -6, 0], transition: { repeat: Infinity, duration: 1.8, ease: "easeOut" } };
      case "rotate-slow":
        return { rotate: [-2, 2, -2], y: [0, -2, 0], transition: { repeat: Infinity, duration: 4, ease: "easeInOut" } };
      default:
        return { y: [0, -2, 0], transition: { repeat: Infinity, duration: 4, ease: "easeInOut" } };
    }
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
            className="mb-3 max-w-[245px] bg-slate-900 border-2 border-amber-500/80 text-amber-100 text-xs py-2.5 px-3.5 rounded-2xl rounded-br-none shadow-2xl pointer-events-auto relative"
          >
            {/* Status Visual Atualizado da Alice (As 32 animações!) */}
            <div className="font-mono text-[9px] text-amber-400 uppercase tracking-widest font-bold mb-1.5 flex items-center gap-1.5 border-b border-amber-500/20 pb-1">
              <span>{currentAnimation.icon}</span>
              <span className="truncate">Alice está: {currentAnimation.label}</span>
            </div>
            
            <p className="leading-relaxed font-sans">{bubbleText}</p>
            <button 
              onClick={() => setShowBubble(false)}
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
            className="w-80 h-[420px] bg-slate-900 border-2 border-amber-500 rounded-2xl shadow-2xl flex flex-col mb-4 overflow-hidden pointer-events-auto"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-amber-600/20 to-slate-900 px-4 py-3 border-b border-amber-500/30 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="relative w-7 h-5 bg-amber-500 rounded-sm flex items-center justify-center border border-amber-300">
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-amber-600" />
                  <div className="flex gap-[4px]">
                    <div className="w-[3px] h-[3px] bg-slate-950 rounded-full" />
                    <div className="w-[3px] h-[3px] bg-slate-950 rounded-full" />
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-display font-bold text-amber-400">Santuário de Alice</h3>
                  <p className="text-[9px] font-mono text-amber-500 tracking-wider uppercase">Cérebro Offline Local v101.44</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-slate-400 hover:text-amber-400 transition-colors cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

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

      {/* Personagem Alice Flutuante ("A Cartinha com Olhos") com Animações Framer Motion baseadas no status */}
      <motion.div
        ref={widgetRef}
        onClick={() => {
          setIsOpen(!isOpen);
          setShowBubble(false);
        }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95, rotate: [0, -10, 10, 0] }}
        animate={getVisualAnimation()}
        className="pointer-events-auto cursor-pointer relative"
        id="alice-floating-character"
      >
        {/* Badge Flutuante de Status Ativo no próprio boneco */}
        {!isOpen && (
          <div className="absolute top-[-16px] left-1/2 -translate-x-1/2 bg-slate-950/80 border border-amber-500/40 text-[8px] font-mono font-bold text-amber-400 py-0.5 px-1.5 rounded-full whitespace-nowrap shadow-md flex items-center gap-1">
            <span>{currentAnimation.icon}</span>
            <span>{currentAnimation.label}</span>
          </div>
        )}

        {/* Envelope Corpo Principal */}
        <div className="w-16 h-12 bg-amber-100 rounded-md border-2 border-slate-950 shadow-lg relative flex flex-col justify-between overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-0 border-l-[32px] border-l-transparent border-r-[32px] border-r-transparent border-t-[20px] border-t-amber-200/80 -z-10" />
          <div className="absolute top-0 left-0 right-0 h-0 border-l-[32px] border-l-transparent border-r-[32px] border-r-transparent border-t-[20px] border-t-amber-300 -z-20" />
          
          {/* Selo Vermelho */}
          <div className="absolute bottom-1 right-2 w-3 h-3 bg-red-600 rounded-full border border-red-700/80 shadow-[0_1px_2px_rgba(0,0,0,0.2)] opacity-80" />

          {/* Olhos da Alice */}
          <div className="flex justify-center gap-2.5 mt-4.5 z-10">
            {/* Olho Esquerdo */}
            <div className="w-3.5 h-3.5 bg-slate-950 rounded-full flex items-center justify-center overflow-hidden relative">
              <motion.div 
                animate={{ height: isBlinking ? 0 : 14 }}
                className="absolute inset-0 bg-amber-100 rounded-full transition-all duration-75 flex items-center justify-center"
              >
                {/* Pupila */}
                <div 
                  className="w-1.5 h-1.5 bg-slate-950 rounded-full" 
                  style={{ 
                    transform: `translate(${mousePos.x}px, ${mousePos.y}px)` 
                  }} 
                />
              </motion.div>
            </div>

            {/* Olho Direito */}
            <div className="w-3.5 h-3.5 bg-slate-950 rounded-full flex items-center justify-center overflow-hidden relative">
              <motion.div 
                animate={{ height: isBlinking ? 0 : 14 }}
                className="absolute inset-0 bg-amber-100 rounded-full transition-all duration-75 flex items-center justify-center"
              >
                {/* Pupila */}
                <div 
                  className="w-1.5 h-1.5 bg-slate-950 rounded-full" 
                  style={{ 
                    transform: `translate(${mousePos.x}px, ${mousePos.y}px)` 
                  }} 
                />
              </motion.div>
            </div>
          </div>

          <div className="h-1 bg-amber-200 w-full" />
        </div>

        {/* Notificador se o Chat estiver fechado */}
        {!isOpen && (
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-amber-500 text-[9px] font-bold text-slate-950 items-center justify-center border border-slate-950">
              !
            </span>
          </span>
        )}
      </motion.div>
    </div>
  );
}
