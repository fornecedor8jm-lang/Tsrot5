import React, { useState, useEffect, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Newspaper, 
  Radio, 
  History, 
  HelpCircle, 
  Search, 
  Eye, 
  ThumbsUp, 
  Clock, 
  GitCommit, 
  Terminal, 
  Sparkles, 
  Compass, 
  AlertTriangle,
  Flame,
  Info,
  Sun,
  Moon,
  Volume2,
  VolumeX,
  Play,
  Pause,
  SkipForward,
  SkipBack,
  MessageSquare,
  Send,
  User,
  ExternalLink,
  Share2,
  Calendar,
  AlertCircle,
  Heart
} from "lucide-react";
import { articles, campaigns, podcastEpisodes, Article, Campaign, PodcastEpisode } from "./data/newsData";
import { versionHistory } from "./data/versionHistory";
import { cleanAndMatchAliceResponse } from "./data/aliceMemory";
import AliceWidget from "./components/AliceWidget";

export default function App() {
  // Controle de Abas e Temas
  const [currentTab, setCurrentTab] = useState<"news" | "campaigns" | "commits" | "alice-doc">("news");
  const [theme, setTheme] = useState<"dark" | "light">(() => {
    const saved = localStorage.getItem("tnb-theme");
    return (saved as "dark" | "light") || "dark";
  });

  // Filtros de Notícias
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("Todos");
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  
  // Likes locais persistentes
  const [localArticles, setLocalArticles] = useState<Article[]>(() => {
    const saved = localStorage.getItem("tnb-likes-v2");
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { return articles; }
    }
    return articles;
  });

  // Salvar likes no local storage
  useEffect(() => {
    localStorage.setItem("tnb-likes-v2", JSON.stringify(localArticles));
  }, [localArticles]);

  // Seção de Comentários Funcionais (localStorage)
  const [commentsList, setCommentsList] = useState<Record<string, Array<{ author: string; text: string; date: string }>>>({});
  const [commentName, setCommentName] = useState("");
  const [commentText, setCommentText] = useState("");

  // Carregar comentários
  useEffect(() => {
    const savedComments = localStorage.getItem("tnb-comments-v2");
    if (savedComments) {
      try {
        setCommentsList(JSON.parse(savedComments));
      } catch (e) {
        console.error(e);
      }
    } else {
      // Comentários iniciais amigáveis de exemplo para enriquecer
      const initial: Record<string, Array<{ author: string; text: string; date: string }>> = {
        "art-1": [
          { author: "Eduardo", text: "Clara jurou que o nove de copas indicava gol no segundo tempo. Quase quebrei meu teclado rindo nos grupos de chat!", date: "12 de Julho de 2026 às 14:10" },
          { author: "Viih", text: "O Tarot do Bolso é incrível justamente por essas bizarrices que inventamos. Muito bom o artigo!", date: "12 de Julho de 2026 às 15:30" }
        ],
        "art-3": [
          { author: "Mãe Conselheira", text: "Eduardo, você é um orgulho para a comunidade Tarot no Bolso. Que história maravilhosa de superação e foco técnico!", date: "11 de Julho de 2026 às 09:12" }
        ],
        "art-4": [
          { author: "Clara", text: "Viih, suas orações funcionaram de verdade. As cartas nunca mentem, só precisamos aprender a ouvir os ciclos cósmicos amorosos.", date: "10 de Julho de 2026 às 18:40" }
        ],
        "art-5": [
          { author: "Moisés", text: "Eu só estava sem internet, pessoal! Mas adorei a teoria do Pão de Queijo Voador, risadas garantidas.", date: "09 de Julho de 2026 às 21:05" }
        ]
      };
      setCommentsList(initial);
      localStorage.setItem("tnb-comments-v2", JSON.stringify(initial));
    }
  }, []);

  const handleAddComment = (articleId: string, e: React.FormEvent) => {
    e.preventDefault();
    if (!commentName.trim() || !commentText.trim()) return;

    const newComment = {
      author: commentName.trim(),
      text: commentText.trim(),
      date: new Date().toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "long",
        year: "numeric"
      }) + " às " + new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })
    };

    const updated = {
      ...commentsList,
      [articleId]: [...(commentsList[articleId] || []), newComment]
    };

    setCommentsList(updated);
    localStorage.setItem("tnb-comments-v2", JSON.stringify(updated));
    setCommentText("");
  };

  // Persistir o tema escolhido
  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    localStorage.setItem("tnb-theme", nextTheme);
  };

  // Playground de consulta mental offline da Alice
  const [customAliceReaction, setCustomAliceReaction] = useState("");
  const [customAliceQuery, setCustomAliceQuery] = useState("");

  // Relógio e Contador Regressivo do Recesso (Encerra em 17 de Julho de 2026 às 00:00:00)
  const [timeStr, setTimeStr] = useState("");
  const [countdownStr, setCountdownStr] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isRecessoFinished, setIsRecessoFinished] = useState(false);

  // Estados para copiar chave Pix
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const handleCopyPix = (key: string) => {
    navigator.clipboard.writeText(key);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(now.toLocaleTimeString("pt-BR"));

      // Target de Encerramento do Recesso: 17 de Julho de 2026 00:00:00
      const targetTime = new Date("2026-07-17T00:00:00").getTime();
      const diff = targetTime - now.getTime();

      if (diff <= 0) {
        setIsRecessoFinished(true);
        setCountdownStr({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        setCountdownStr({ days, hours, minutes, seconds });
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Player de Podcast Funcional
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [podcastProgress, setPodcastProgress] = useState(0); // 0 a 100
  const [currentTimeFormatted, setCurrentTimeFormatted] = useState("00:00");
  const [durationFormatted, setDurationFormatted] = useState("00:00");
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(80);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const activeEpisode = podcastEpisodes[currentEpisodeIndex];

  // Configuração inicial do elemento de Áudio
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    const audio = new Audio(activeEpisode.audioUrl);
    audioRef.current = audio;
    audio.volume = isMuted ? 0 : volume / 100;

    const onTimeUpdate = () => {
      if (audio.duration) {
        const progress = (audio.currentTime / audio.duration) * 100;
        setPodcastProgress(progress);
        setCurrentTimeFormatted(formatTime(audio.currentTime));
      }
    };

    const onLoadedMetadata = () => {
      setDurationFormatted(formatTime(audio.duration));
    };

    const onEnded = () => {
      handleNextEpisode();
    };

    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("loadedmetadata", onLoadedMetadata);
    audio.addEventListener("ended", onEnded);

    if (isPlaying) {
      audio.play().catch((err) => console.log("Aguardando interação do usuário para reproduzir áudio."));
    }

    return () => {
      audio.pause();
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("loadedmetadata", onLoadedMetadata);
      audio.removeEventListener("ended", onEnded);
    };
  }, [currentEpisodeIndex]);

  // Atualizar volume
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume / 100;
    }
  }, [volume, isMuted]);

  const togglePlayPodcast = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().catch(e => console.log(e));
      setIsPlaying(true);
    }
  };

  const handleNextEpisode = () => {
    setCurrentEpisodeIndex((prev) => (prev + 1) % podcastEpisodes.length);
  };

  const handlePrevEpisode = () => {
    setCurrentEpisodeIndex((prev) => (prev - 1 + podcastEpisodes.length) % podcastEpisodes.length);
  };

  const handleSeekPodcast = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!audioRef.current || !audioRef.current.duration) return;
    const nextPercent = parseFloat(e.target.value);
    const targetTime = (nextPercent / 100) * audioRef.current.duration;
    audioRef.current.currentTime = targetTime;
    setPodcastProgress(nextPercent);
  };

  const formatTime = (secs: number) => {
    if (isNaN(secs)) return "00:00";
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  };

  // Carrossel/Destaque de Matérias da Comunidade (Matérias 1 a 5)
  const communityArticles = useMemo(() => {
    return localArticles.filter(art => art.category === "Comunidade");
  }, [localArticles]);

  const [activeCommunityIndex, setActiveCommunityIndex] = useState(0);

  // Intervalo rotativo automático para o Carrossel do Cabeçalho da Comunidade
  useEffect(() => {
    const slideInterval = setInterval(() => {
      setActiveCommunityIndex((prev) => (prev + 1) % communityArticles.length);
    }, 7000);
    return () => clearInterval(slideInterval);
  }, [communityArticles]);

  // Filtro de artigos do Giro Esotérico (Notícias 6 a 20)
  const filteredGiroArticles = useMemo(() => {
    return localArticles.filter((art) => {
      const isGiroCategory = art.category !== "Comunidade";
      const matchesSearch = 
        art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        art.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        art.content.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = 
        selectedCategory === "Todos" || art.category === selectedCategory;

      return isGiroCategory && matchesSearch && matchesCategory;
    });
  }, [localArticles, searchQuery, selectedCategory]);

  const handleLikeArticle = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setLocalArticles((prev) =>
      prev.map((art) => {
        if (art.id === id) {
          const newLikes = art.likes + 1;
          // Atualiza se estiver lendo
          if (selectedArticle && selectedArticle.id === id) {
            setSelectedArticle({ ...selectedArticle, likes: newLikes });
          }
          return { ...art, likes: newLikes };
        }
        return art;
      })
    );
  };

  const handleTestAliceBrain = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customAliceQuery.trim()) return;
    const response = cleanAndMatchAliceResponse(customAliceQuery);
    setCustomAliceReaction(response);
  };

  // Variáveis de Estilização Dinâmica de acordo com o Tema (Modo Claro/Escuro)
  const themeClasses = {
    bg: theme === "dark" ? "bg-slate-950 text-slate-100" : "bg-zinc-50 text-zinc-900",
    header: theme === "dark" ? "bg-slate-900 border-b-4 border-amber-500" : "bg-white border-b-4 border-amber-600 shadow-md",
    card: theme === "dark" ? "bg-slate-900 border-slate-800/80" : "bg-white border-zinc-200/80 shadow-sm",
    cardHeader: theme === "dark" ? "border-slate-800/60" : "border-zinc-200/60",
    textMuted: theme === "dark" ? "text-slate-400" : "text-zinc-500",
    textTitle: theme === "dark" ? "text-slate-100" : "text-zinc-800",
    badge: theme === "dark" ? "bg-slate-950 text-amber-400 border-amber-500/20" : "bg-amber-100 text-amber-800 border-amber-300",
    tabActive: theme === "dark" ? "bg-amber-500 text-slate-950 shadow-[0_2px_10px_rgba(245,158,11,0.3)]" : "bg-amber-600 text-white shadow-[0_2px_10px_rgba(217,119,6,0.3)]",
    tabInactive: theme === "dark" ? "text-slate-400 hover:text-slate-100 hover:bg-slate-800/50" : "text-zinc-500 hover:text-zinc-800 hover:bg-zinc-100",
    input: theme === "dark" ? "bg-slate-950 text-slate-200 border-slate-800" : "bg-zinc-50 text-zinc-800 border-zinc-200"
  };

  return (
    <div className={`min-h-screen flex flex-col relative overflow-x-hidden ${themeClasses.bg} transition-colors duration-300`}>
      
      {/* HEADER PRINCIPAL */}
      <header className={`${themeClasses.header} relative`}>
        
        {/* Barra Superior do TNB */}
        <div className="bg-amber-500 text-slate-950 px-4 py-1 text-xs font-mono flex flex-wrap justify-between items-center gap-2 font-bold tracking-wider">
          <div className="flex items-center gap-2">
            <span className="animate-pulse">●</span> PORTAL DE TAROT: TAROT NO BOLSO (TNB)
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Clock size={12} />
              <span>{timeStr}</span>
            </div>
            <div className="hidden sm:inline">ALICE OFFLINE: OPERANTE</div>
            <div>VERSÃO: v89.99</div>
          </div>
        </div>

        {/* Título Principal */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-7 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left flex-1">
            <div className="flex items-center justify-center md:justify-start gap-3 mb-1">
              <div className="p-2 bg-amber-500 rounded-xl text-slate-950">
                <Newspaper className="w-8 h-8" />
              </div>
              <h1 className="text-3xl sm:text-4xl font-display font-extrabold tracking-tight uppercase">
                Tarot no Bolso <span className="text-amber-500 font-black">News</span> <span className="text-slate-500 text-lg font-mono font-bold">(TNB)</span>
              </h1>
            </div>
            <p className="text-xs font-mono text-amber-500 uppercase tracking-widest mt-1.5 block">
              "Fatos comunitários, Tarot e as correntes místicas do cotidiano"
            </p>
          </div>

          {/* Chaveador de Temas, Player Rápido e Métricas */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            {/* Botão de Tema */}
            <button
              onClick={toggleTheme}
              id="theme-toggle-btn"
              className="p-3 rounded-full border cursor-pointer transition-all hover:scale-105 flex items-center justify-center bg-slate-100 hover:bg-slate-200 text-slate-950 border-slate-300 dark:bg-slate-900 dark:hover:bg-slate-800 dark:text-amber-400 dark:border-slate-800"
              title="Trocar tema de leitura"
            >
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {/* Versão por Magnitude */}
            <div className="hidden lg:block bg-slate-950/40 border border-slate-800 rounded-2xl px-4 py-2.5 text-center shadow-inner">
              <div className="text-amber-500 text-lg font-mono font-bold">v89.99</div>
              <div className="text-[9px] text-slate-500 font-mono uppercase tracking-wider">Soberania Mística</div>
            </div>
          </div>
        </div>

        {/* ABAS DE NAVEGAÇÃO */}
        <div className="border-t border-slate-800/40 bg-slate-900/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex flex-wrap gap-1 py-2" aria-label="Abas do site">
              <button
                onClick={() => { setCurrentTab("news"); setSelectedArticle(null); }}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-mono font-bold tracking-wider transition-all duration-150 cursor-pointer ${
                  currentTab === "news" ? themeClasses.tabActive : themeClasses.tabInactive
                }`}
              >
                <Newspaper size={14} />
                TAROT NO BOLSO NEWS
              </button>
              
              <button
                onClick={() => { setCurrentTab("campaigns"); setSelectedArticle(null); }}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-mono font-bold tracking-wider transition-all duration-150 cursor-pointer ${
                  currentTab === "campaigns" ? themeClasses.tabActive : themeClasses.tabInactive
                }`}
              >
                <Heart size={14} />
                CAMPANHAS DA COMUNIDADE
              </button>

              <button
                onClick={() => { setCurrentTab("commits"); setSelectedArticle(null); }}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-mono font-bold tracking-wider transition-all duration-150 cursor-pointer ${
                  currentTab === "commits" ? themeClasses.tabActive : themeClasses.tabInactive
                }`}
              >
                <History size={14} />
                REQUISITOS & COMMITS (v99.99)
              </button>

              <button
                onClick={() => { setCurrentTab("alice-doc"); setSelectedArticle(null); }}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-mono font-bold tracking-wider transition-all duration-150 cursor-pointer ${
                  currentTab === "alice-doc" ? themeClasses.tabActive : themeClasses.tabInactive
                }`}
              >
                <HelpCircle size={14} />
                DIRETRIZES DA ALICE
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* BANNER DE RECESSO COM CONTADOR REGRESSIVO EM TEMPO REAL */}
      <section className="bg-gradient-to-r from-amber-600 to-amber-800 text-slate-950 py-4 px-4 font-sans border-b border-amber-400">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-slate-950 text-amber-500 rounded-lg shrink-0">
              <Calendar size={20} />
            </div>
            <div>
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-950">
                Comunicado Oficial de Recesso TNB News
              </h2>
              <p className="text-xs text-amber-100 font-medium max-w-xl">
                A comunidade Tarot no Bolso está em período de descanso de uma semana. O site continua ativo para ações solidárias e divulgações. Retorno total em 17 de Julho de 2026.
              </p>
            </div>
          </div>

          {/* Relógio Regressivo Real */}
          <div className="bg-slate-950 text-amber-400 px-5 py-2.5 rounded-xl border border-amber-300/30 flex items-center gap-4 text-center shadow-lg font-mono">
            {isRecessoFinished ? (
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">
                Recesso Concluído! Atividades Normais.
              </span>
            ) : (
              <>
                <div className="text-xs font-bold uppercase tracking-widest mr-1 text-slate-400">
                  RESTA:
                </div>
                <div>
                  <div className="text-lg font-bold leading-none">{countdownStr.days}</div>
                  <div className="text-[8px] text-slate-400 uppercase tracking-widest">Dias</div>
                </div>
                <div className="text-amber-500">:</div>
                <div>
                  <div className="text-lg font-bold leading-none">{String(countdownStr.hours).padStart(2, "0")}</div>
                  <div className="text-[8px] text-slate-400 uppercase tracking-widest">Hrs</div>
                </div>
                <div className="text-amber-500">:</div>
                <div>
                  <div className="text-lg font-bold leading-none">{String(countdownStr.minutes).padStart(2, "0")}</div>
                  <div className="text-[8px] text-slate-400 uppercase tracking-widest">Min</div>
                </div>
                <div className="text-amber-500">:</div>
                <div>
                  <div className="text-lg font-bold leading-none">{String(countdownStr.seconds).padStart(2, "0")}</div>
                  <div className="text-[8px] text-slate-400 uppercase tracking-widest">Seg</div>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* CONTEÚDO PRINCIPAL DAS ABAS */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 relative">
        <AnimatePresence mode="wait">
          
          {/* TAB 1: PORTAL & GIRO ESOTÉRICO */}
          {currentTab === "news" && (
            <motion.div
              key="news-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-8"
            >
              
              {/* CARROSSEL DOS FATOS DA COMUNIDADE (MATÉRIAS 01 A 05) - Exibido apenas se o recesso acabou */}
              {isRecessoFinished && (
                <div className="bg-slate-900 border border-amber-500/20 rounded-3xl overflow-hidden relative shadow-2xl">
                  <div className="absolute top-4 left-4 z-10">
                    <span className="bg-amber-500 text-slate-950 font-mono text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">
                      EM DESTAQUE: FATOS DA COMUNIDADE
                    </span>
                  </div>

                  <div className="relative h-[340px] sm:h-[400px] w-full">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeCommunityIndex}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        onClick={() => setSelectedArticle(communityArticles[activeCommunityIndex])}
                        className="absolute inset-0 w-full h-full cursor-pointer group"
                      >
                        {/* Imagem de Fundo CDN Unsplash */}
                        <img 
                          src={communityArticles[activeCommunityIndex].image} 
                          alt={communityArticles[activeCommunityIndex].title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                          referrerPolicy="no-referrer"
                        />
                        
                        {/* Overlay Escuro de Leitura */}
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-transparent" />

                        {/* Conteúdo do Card */}
                        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 space-y-3">
                          <div className="flex gap-4 items-center text-xs font-mono text-amber-400">
                            <span>{communityArticles[activeCommunityIndex].date}</span>
                            <span>•</span>
                            <span>Escrito por: {communityArticles[activeCommunityIndex].author}</span>
                          </div>
                          <h2 className="text-2xl sm:text-3xl font-display font-bold text-slate-100 leading-tight group-hover:text-amber-400 transition-colors">
                            {communityArticles[activeCommunityIndex].title}
                          </h2>
                          <p className="text-sm text-slate-300 leading-relaxed max-w-3xl line-clamp-2">
                            {communityArticles[activeCommunityIndex].summary}
                          </p>
                          <div className="flex gap-4 items-center pt-2 text-xs font-mono text-slate-400">
                            <span className="flex items-center gap-1"><Eye size={12} /> {communityArticles[activeCommunityIndex].views}</span>
                            <span className="flex items-center gap-1"><ThumbsUp size={12} /> {communityArticles[activeCommunityIndex].likes}</span>
                            <span className="text-amber-500 font-bold underline group-hover:text-amber-400">
                              Ler artigo completo →
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  {/* Seletores do Carrossel */}
                  <div className="absolute top-4 right-4 z-10 flex gap-1.5">
                    {communityArticles.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveCommunityIndex(idx)}
                        className={`w-2.5 h-2.5 rounded-full cursor-pointer transition-all ${
                          activeCommunityIndex === idx ? "bg-amber-500 scale-125" : "bg-slate-500/80 hover:bg-slate-300"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* GRID PRINCIPAL: FEED DE NOTÍCIAS + COLUNA LATERAL */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* 1. SEÇÃO DE NOTÍCIAS (9 Colunas se fechado, ou 6 colunas se leitor focado aberto) */}
                <div className={`space-y-6 ${selectedArticle ? "lg:col-span-6" : "lg:col-span-8"}`}>
                  
                  {isRecessoFinished ? (
                    <>
                      {/* Filtro e Pesquisa do Giro Esotérico */}
                      <div className={`p-4 border rounded-2xl ${themeClasses.card} transition-colors`}>
                        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                          <div>
                            <h3 className="text-md font-display font-bold">Giro Esotérico Global</h3>
                            <p className="text-xs text-slate-400">Matérias sobre Tarot, Astrologia, Sonhos e mais</p>
                          </div>
                          
                          {/* Campo de Busca */}
                          <div className="relative w-full sm:w-64">
                            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                            <input
                              type="text"
                              value={searchQuery}
                              onChange={(e) => setSearchQuery(e.target.value)}
                              placeholder="Pesquisar artigos..."
                              className={`w-full text-xs pl-8 pr-3 py-1.5 rounded-lg focus:outline-none focus:border-amber-500 font-mono ${themeClasses.input}`}
                            />
                          </div>
                        </div>

                        {/* Filtros de Categoria */}
                        <div className="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-slate-800/20">
                          {["Todos", "Tarot", "Astrologia", "Espiritualidade", "Cristais", "Mediunidade", "Sonhos", "Umbanda"].map((cat) => (
                            <button
                              key={cat}
                              onClick={() => setSelectedCategory(cat)}
                              className={`px-2.5 py-1 rounded-md text-[10px] font-mono font-bold cursor-pointer transition-all ${
                                selectedCategory === cat
                                  ? "bg-amber-500 text-slate-950"
                                  : "bg-slate-800/40 text-slate-400 hover:text-slate-200"
                              }`}
                            >
                              {cat.toUpperCase()}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Listagem de Artigos */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {filteredGiroArticles.length > 0 ? (
                          filteredGiroArticles.map((art) => (
                            <div
                              key={art.id}
                              onClick={() => setSelectedArticle(art)}
                              className={`border rounded-2xl overflow-hidden hover:border-amber-500/40 transition-all cursor-pointer flex flex-col justify-between group h-full relative ${themeClasses.card}`}
                            >
                              {/* Imagem de Capa do CDN */}
                              <div className="h-40 overflow-hidden relative">
                                <img 
                                  src={art.image} 
                                  alt={art.title} 
                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                  referrerPolicy="no-referrer"
                                />
                                <div className="absolute top-3 left-3">
                                  <span className="bg-slate-950/80 backdrop-blur-sm text-amber-400 text-[9px] font-mono font-bold px-2.5 py-0.5 rounded-full border border-amber-500/20">
                                    {art.category.toUpperCase()}
                                  </span>
                                </div>
                              </div>

                              <div className="p-4 flex-1 flex flex-col justify-between">
                                <div>
                                  <div className="text-[10px] font-mono text-slate-500 mb-1">{art.date}</div>
                                  <h4 className="text-md font-display font-bold text-slate-100 group-hover:text-amber-400 transition-colors leading-tight mb-2">
                                    {art.title}
                                  </h4>
                                  <p className="text-xs text-slate-400 line-clamp-3 mb-4">
                                    {art.summary}
                                  </p>
                                </div>

                                {/* Rodapé do card */}
                                <div className="flex items-center justify-between border-t border-slate-800/40 pt-3 mt-auto">
                                  <span className="text-[9px] font-mono text-slate-500">Por: {art.author}</span>
                                  <div className="flex items-center gap-3 text-xs font-mono text-slate-400">
                                    <span className="flex items-center gap-0.5"><Eye size={10} /> {art.views}</span>
                                    <button
                                      onClick={(e) => handleLikeArticle(art.id, e)}
                                      className="flex items-center gap-0.5 hover:text-amber-400 transition-colors cursor-pointer"
                                    >
                                      <ThumbsUp size={10} /> {art.likes}
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="col-span-2 text-center py-12 border border-dashed border-slate-800 rounded-2xl">
                            <AlertTriangle className="mx-auto text-amber-500 mb-2" size={24} />
                            <h4 className="text-sm font-bold">Nenhuma matéria mística encontrada</h4>
                            <p className="text-xs text-slate-500">Verifique os filtros aplicados de busca ou categoria.</p>
                          </div>
                        )}
                      </div>
                    </>
                  ) : (
                    /* SEÇÃO TEMPORARIAMENTE SUSPENSA ATÉ DIA 17 DE JULHO */
                    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 sm:p-12 text-center space-y-6 shadow-2xl">
                      <div className="w-16 h-16 bg-amber-500/10 rounded-full flex items-center justify-center mx-auto text-amber-500 animate-pulse">
                        <AlertCircle size={32} />
                      </div>
                      <div className="space-y-2">
                        <h3 className="text-xl sm:text-2xl font-display font-bold text-slate-100 uppercase tracking-tight">
                          Reportagens Suspensas
                        </h3>
                        <p className="text-xs sm:text-sm text-slate-400 font-sans leading-relaxed">
                          De acordo com as diretrizes do portal de Tarot <strong>Tarot no Bolso News (TNB)</strong>, as reportagens do portal e as colunas do Giro Esotérico estão suspensas temporariamente durante o recesso de nossa redação e <strong>não devem aparecer até o dia 17 de Julho de 2026</strong>.
                        </p>
                      </div>
                      
                      <div className="bg-slate-950/60 border border-slate-800/80 p-4 rounded-2xl text-left space-y-2 max-w-md mx-auto">
                        <span className="text-[10px] font-mono font-bold text-amber-400 uppercase tracking-wider block">
                          Explore o resto do portal:
                        </span>
                        <p className="text-xs text-slate-400 font-sans leading-normal">
                          Você pode conferir as <strong>Campanhas Solidárias</strong> ao lado, ver as <strong>Séries & Programas</strong>, ou interagir em tempo real com a nossa assistente virtual <strong>Alice</strong> através do widget flutuante!
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* 2. LEITOR DETALHADO DO ARTIGO (Ocupa 6 colunas, abre de forma fluida) */}
                <AnimatePresence>
                  {selectedArticle && (
                    <motion.div
                      initial={{ opacity: 0, x: 25 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="lg:col-span-6 space-y-6"
                    >
                      <div className="bg-slate-900 border-2 border-amber-500/40 rounded-3xl p-6 shadow-2xl sticky top-6 max-h-[85vh] overflow-y-auto">
                        {/* Header do Leitor */}
                        <div className="flex justify-between items-start gap-4 mb-4 pb-4 border-b border-slate-800">
                          <div>
                            <span className="text-xs font-mono font-bold text-amber-500 uppercase tracking-widest block mb-1">
                              {selectedArticle.category}
                            </span>
                            <h2 className="text-xl sm:text-2xl font-display font-bold text-slate-100 leading-tight">
                              {selectedArticle.title}
                            </h2>
                          </div>
                          <button
                            onClick={() => setSelectedArticle(null)}
                            className="bg-slate-950 text-slate-400 hover:text-slate-100 border border-slate-800 hover:border-slate-700 px-3 py-1.5 rounded-lg text-xs font-mono transition-colors cursor-pointer shrink-0"
                          >
                            FECHAR
                          </button>
                        </div>

                        {/* Imagem do Leitor */}
                        <div className="h-48 rounded-xl overflow-hidden mb-4 border border-slate-800">
                          <img 
                            src={selectedArticle.image} 
                            alt={selectedArticle.title}
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                        </div>

                        {/* Metadados */}
                        <div className="flex flex-wrap gap-y-2 justify-between items-center text-xs font-mono text-slate-400 mb-6 bg-slate-950/60 p-3 rounded-xl border border-slate-800/50">
                          <span>Autor: <strong className="text-slate-300">{selectedArticle.author}</strong></span>
                          <span>Data: {selectedArticle.date}</span>
                          <div className="flex gap-3">
                            <span className="flex items-center gap-1"><Eye size={12} /> {selectedArticle.views}</span>
                            <button 
                              onClick={(e) => handleLikeArticle(selectedArticle.id, e)}
                              className="flex items-center gap-1 hover:text-amber-400 transition-colors cursor-pointer text-amber-500 font-bold"
                            >
                              <ThumbsUp size={12} /> {selectedArticle.likes}
                            </button>
                          </div>
                        </div>

                        {/* Corpo do Artigo */}
                        <div className="text-slate-300 text-sm leading-relaxed space-y-4 font-sans max-h-56 overflow-y-auto pr-2">
                          {selectedArticle.content.split("\n\n").map((para, idx) => (
                            <p key={idx}>{para}</p>
                          ))}
                        </div>

                        {/* Comentário Exclusivo de Alice */}
                        <div className="mt-6 bg-amber-500/10 border-2 border-amber-500/30 rounded-2xl p-4 relative">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-5 h-4 bg-amber-500 rounded-sm flex gap-[2px] items-center justify-center border border-amber-300 shrink-0">
                              <span className="w-1 h-1 bg-slate-950 rounded-full"></span>
                              <span className="w-1 h-1 bg-slate-950 rounded-full"></span>
                            </div>
                            <span className="text-xs font-mono font-bold text-amber-400 tracking-wider uppercase">
                              Comentário da Alice:
                            </span>
                          </div>
                          <p className="text-xs text-amber-200/90 leading-relaxed italic">
                            "{selectedArticle.aliceComment}"
                          </p>
                        </div>

                        {/* ÁREA DE COMENTÁRIOS PERSISTENTES (LOCALSTORAGE) */}
                        <div className="mt-8 pt-6 border-t border-slate-800 space-y-4">
                          <div className="flex items-center gap-2 text-slate-200 font-display font-bold text-sm">
                            <MessageSquare size={16} className="text-amber-500" />
                            <span>Discussões do Artigo ({commentsList[selectedArticle.id]?.length || 0})</span>
                          </div>

                          {/* Lista de Comentários */}
                          <div className="space-y-3 max-h-48 overflow-y-auto pr-2">
                            {commentsList[selectedArticle.id] && commentsList[selectedArticle.id].length > 0 ? (
                              commentsList[selectedArticle.id].map((comm, i) => (
                                <div key={i} className="bg-slate-950/60 border border-slate-800/80 p-3 rounded-xl space-y-1">
                                  <div className="flex justify-between items-center text-[10px] font-mono">
                                    <span className="text-amber-500 font-bold flex items-center gap-1">
                                      <User size={10} /> {comm.author}
                                    </span>
                                    <span className="text-slate-500">{comm.date}</span>
                                  </div>
                                  <p className="text-xs text-slate-300 font-sans leading-relaxed">
                                    {comm.text}
                                  </p>
                                </div>
                              ))
                            ) : (
                              <p className="text-xs text-slate-500 italic text-center py-2">
                                Nenhum comentário ainda. Seja o primeiro a palpitar sobre este mistério!
                              </p>
                            )}
                          </div>

                          {/* Form de Envio */}
                          <form onSubmit={(e) => handleAddComment(selectedArticle.id, e)} className="space-y-2 pt-2">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                              <input
                                type="text"
                                value={commentName}
                                onChange={(e) => setCommentName(e.target.value)}
                                placeholder="Seu nome..."
                                required
                                className="bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs text-slate-100 focus:outline-none focus:border-amber-500 font-mono"
                              />
                            </div>
                            <div className="flex gap-2">
                              <input
                                type="text"
                                value={commentText}
                                onChange={(e) => setCommentText(e.target.value)}
                                placeholder="O que você acha sobre isso?..."
                                required
                                className="flex-1 bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs text-slate-100 focus:outline-none focus:border-amber-500"
                              />
                              <button
                                type="submit"
                                className="bg-amber-500 hover:bg-amber-600 text-slate-950 px-3 py-2 rounded-lg text-xs font-bold transition-all shrink-0 cursor-pointer flex items-center gap-1"
                              >
                                <Send size={12} />
                              </button>
                            </div>
                          </form>
                        </div>

                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* 3. COLUNA LATERAL DE RECURSOS (Sempre visível se o leitor estiver fechado) */}
                {!selectedArticle && (
                  <div className="lg:col-span-4 space-y-6">
                    
                    {/* PLAYER DE PODCAST DE ÁUDIO INTEGRADO (TNB CAST) - Suspenso temporariamente */}
                    <div className="bg-slate-900 border-2 border-slate-800 rounded-3xl p-5 shadow-lg space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Radio className="text-slate-500" size={18} />
                          <h4 className="text-xs font-mono font-bold tracking-wider text-slate-400">
                            OUVIR: TNB CAST DIGITAL
                          </h4>
                        </div>
                        <span className="text-[9px] bg-slate-950 text-slate-500 px-2 py-0.5 rounded border border-slate-800 uppercase tracking-widest font-mono font-bold">
                          Breve
                        </span>
                      </div>

                      <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800/80 text-center space-y-3">
                        <div className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center mx-auto text-slate-500">
                          <Radio size={20} />
                        </div>
                        <div className="space-y-1">
                          <h5 className="text-xs font-display font-bold text-slate-300">
                            TNB Cast Indisponível
                          </h5>
                          <p className="text-[10px] text-slate-500 leading-normal font-sans">
                            O podcast só estará disponível em futuras atualizações do aplicativo. Fique de olho nos nossos commits e changelogs!
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* CAMPANHAS SOLIDÁRIAS COLETIVAS (TABELA DE APOIOS) */}
                    <div className="bg-slate-900 border-2 border-slate-800 rounded-3xl p-5 shadow-lg space-y-4">
                      <div className="flex items-center gap-2 pb-2 border-b border-slate-800">
                        <Heart className="text-red-500 animate-pulse fill-red-500" size={18} />
                        <h4 className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider">
                          CAMPANHAS ATIVAS ({campaigns.length})
                        </h4>
                      </div>

                      <p className="text-[11px] text-slate-400 leading-normal font-sans">
                        O portal TNB News apoia voluntariamente causas da nossa comunidade. Acompanhe e ajude diretamente os responsáveis:
                      </p>

                      <div className="space-y-4">
                        {campaigns.map((camp) => {
                          const pct = Math.min(100, Math.round((camp.raisedAmount / camp.targetAmount) * 100));
                          return (
                            <div key={camp.id} className="bg-slate-950/60 border border-slate-800/80 p-3 rounded-xl space-y-2">
                              <div className="flex justify-between items-start">
                                <span className="text-[11px] font-display font-bold text-slate-200 line-clamp-1">
                                  {camp.title}
                                </span>
                                <span className="text-[9px] font-mono font-bold text-amber-500 shrink-0 ml-1">
                                  {pct}%
                                </span>
                              </div>
                              
                              {/* Barra de Progresso */}
                              <div className="w-full h-1.5 bg-slate-850 rounded-full overflow-hidden border border-slate-800">
                                <div 
                                  className="h-full bg-gradient-to-r from-amber-500 to-amber-400 rounded-full" 
                                  style={{ width: `${pct}%` }}
                                />
                              </div>

                              <div className="flex justify-between text-[9px] font-mono text-slate-500">
                                <span>Arrecadado: R$ {camp.raisedAmount}</span>
                                <span>Meta: R$ {camp.targetAmount}</span>
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      <button
                        onClick={() => setCurrentTab("campaigns")}
                        className="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold py-2.5 px-3 rounded-xl text-xs font-mono text-center transition-all cursor-pointer flex items-center justify-center gap-1 shadow-md"
                      >
                        ACESSAR ABA CAMPANHAS & APOIAR
                        <ExternalLink size={12} />
                      </button>
                    </div>

                  </div>
                )}

              </div>
            </motion.div>
          )}

          {/* TAB 2: CAMPANHAS DA COMUNIDADE */}
          {currentTab === "campaigns" && (
            <motion.div
              key="campaigns-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-8"
            >
              {/* Cabeçalho da Aba */}
              <div className="text-center max-w-xl mx-auto mb-6">
                <Heart className="mx-auto text-red-500 animate-pulse fill-red-500 mb-3" size={32} />
                <h2 className="text-2xl font-display font-bold text-slate-100">Apoio & Campanhas da Comunidade</h2>
                <p className="text-sm text-slate-400 font-sans">
                  Iniciativas solidárias organizadas de forma independente por membros de nossa amada comunidade do Tarot no Bolso (TNB).
                </p>
              </div>

              {/* Caixa de Isenção de Responsabilidade (Disclaimer Box) */}
              <div className="bg-amber-500/10 border-2 border-amber-500/35 rounded-2xl p-5 max-w-3xl mx-auto space-y-2">
                <div className="flex items-center gap-2 text-amber-500">
                  <AlertCircle size={18} />
                  <span className="text-xs font-mono font-bold uppercase tracking-wider">
                    ATENÇÃO E TRANSPARÊNCIA: COMUNICADO IMPORTANTE
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed font-sans">
                  O <strong>TNB NEWS</strong> atua estritamente como um canal voluntário de <strong>divulgação e apoio comunitário</strong>. Esclarecemos de forma irrevogável que <strong>não atuamos como intermediários financeiros</strong>: o portal não recebe, não gerencia, não arrecada e não retém nenhuma doação ou valor. Toda e qualquer contribuição financeira, dúvida ou contato deve ser estabelecida <strong>diretamente com a pessoa responsável</strong> pela respectiva campanha, por meio dos canais oficiais listados em cada card.
                </p>
              </div>

              {/* Lista Grid de Campanhas */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                {campaigns.map((camp) => {
                  const pct = Math.min(100, Math.round((camp.raisedAmount / camp.targetAmount) * 100));
                  const missingAmount = Math.max(0, camp.targetAmount - camp.raisedAmount);
                  const isMetaAchieved = missingAmount === 0;

                  // Comentários da Alice personalizados para cada ID de campanha
                  const aliceComments: Record<string, string> = {
                    "camp-ratinho": "Um ratinho de estimação fofinho que só quer feno e carinho... Se você não apoiar essa fofura, seu baralho de Tarot vai dar 'A Torre' em todas as tiragens amorosas por seis meses! Estou avisando... 🐭❤️",
                    "camp-simon": "Simon é cartomante dedicado. Dívidas de cartão são um carma terrível que suga nossa aura. Vamos ajudar a limpar a fatura dele para as tiragens dele continuarem abençoadas! 🔮💳",
                    "camp-luma": "Ver o show do MGK em SP é o sonho supremo de rockstar. Eu queria poder ir junto no bolso dela, mas sou só uma inteligência de papel de 15kb. Ajude a Luma a pular na pista por nós duas! 🤘🔥",
                    "camp-yasmin": "Aos 19 anos, mudar de cidade para recomeçar a vida exige coragem digna do arcano do Louco dando seu primeiro passo. Vamos segurar essa rede de proteção para ela iniciar essa nova jornada! 🗺️✨"
                  };

                  const waLink = `https://wa.me/${camp.whatsapp.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
                    `Olá! Vi a sua campanha '${camp.title}' divulgada no portal TNB News e gostaria de saber mais e apoiar!`
                  )}`;

                  return (
                    <div
                      key={camp.id}
                      className={`border-2 rounded-3xl p-6 shadow-xl flex flex-col justify-between hover:border-amber-500/35 transition-all relative overflow-hidden ${themeClasses.card}`}
                    >
                      {/* Badge de Meta/Status */}
                      <div className="absolute top-4 right-4 z-10">
                        <span className={`text-[9px] font-mono font-bold px-2.5 py-1 rounded-full uppercase tracking-wider border ${
                          isMetaAchieved 
                            ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" 
                            : "bg-amber-500/10 text-amber-500 border-amber-500/20"
                        }`}>
                          {isMetaAchieved ? "META BATIDA! 🎉" : "EM ANDAMENTO"}
                        </span>
                      </div>

                      <div className="space-y-4">
                        {/* Imagem de Capa */}
                        <div className="h-44 rounded-2xl overflow-hidden relative border border-slate-850">
                          <img
                            src={camp.image}
                            alt={camp.title}
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                            referrerPolicy="no-referrer"
                          />
                          <div className="absolute bottom-2 left-2 bg-slate-950/85 text-[8px] font-mono px-2 py-0.5 rounded border border-slate-800 text-slate-300">
                            Responsável: {camp.responsible}
                          </div>
                        </div>

                        {/* Título e Descrição */}
                        <div>
                          <h3 className="text-lg font-display font-bold text-slate-100 leading-snug">
                            {camp.title}
                          </h3>
                          <p className="text-xs text-slate-400 leading-relaxed font-sans mt-1.5">
                            {camp.description}
                          </p>
                        </div>

                        {/* Detalhes da Causa */}
                        <div className="bg-slate-950/55 p-3.5 rounded-2xl border border-slate-850 space-y-2 text-[11px] leading-relaxed text-slate-300">
                          <p>
                            <strong className="text-amber-500 font-mono uppercase">Detalhes:</strong> {camp.details}
                          </p>
                          <p>
                            <strong className="text-amber-500 font-mono uppercase">Como ajudar:</strong> {camp.waysToHelp}
                          </p>
                          {camp.period && (
                            <p className="text-[10px] text-slate-400 italic">
                              📅 {camp.period}
                            </p>
                          )}
                        </div>

                        {/* Barra de Progresso e Métricas */}
                        <div className="space-y-2 pt-2 border-t border-slate-850">
                          <div className="flex justify-between items-center text-xs font-mono">
                            <span className="text-slate-400 font-bold">Progresso Geral</span>
                            <span className="text-amber-500 font-bold">{pct}%</span>
                          </div>

                          {/* Track da Barra */}
                          <div className="w-full h-2.5 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                            <div
                              className="h-full bg-gradient-to-r from-amber-500 to-amber-400 rounded-full"
                              style={{ width: `${pct}%` }}
                            />
                          </div>

                          {/* Valores Financeiros */}
                          <div className="grid grid-cols-3 gap-2 text-[10px] font-mono text-center pt-1">
                            <div className="bg-slate-950/40 p-1.5 rounded-lg border border-slate-900">
                              <div className="text-slate-500">Meta</div>
                              <div className="font-bold text-slate-200">R$ {camp.targetAmount.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</div>
                            </div>
                            <div className="bg-slate-950/40 p-1.5 rounded-lg border border-slate-900">
                              <div className="text-slate-500">Arrecadado</div>
                              <div className="font-bold text-emerald-400">R$ {camp.raisedAmount.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</div>
                            </div>
                            <div className="bg-slate-950/40 p-1.5 rounded-lg border border-slate-900">
                              <div className="text-slate-500">Falta</div>
                              <div className="font-bold text-amber-500">
                                {isMetaAchieved 
                                  ? "Paga! ✓" 
                                  : `R$ ${missingAmount.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`
                                }
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Contatos / Chaves Pix com Copy Interativo */}
                        <div className="flex flex-col gap-2 pt-1.5">
                          {camp.pixKey && (
                            <button
                              onClick={() => handleCopyPix(camp.pixKey || "")}
                              className="w-full bg-slate-950 hover:bg-slate-900 text-slate-200 border border-slate-800 hover:border-slate-700 py-2 px-3 rounded-xl text-[11px] font-mono transition-all flex items-center justify-between cursor-pointer"
                            >
                              <span className="text-slate-500">PIX:</span>
                              <span className="font-bold select-all">{camp.pixKey}</span>
                              <span className="text-amber-500 font-bold shrink-0 ml-1.5">
                                {copiedKey === camp.pixKey ? "COPIADA! ✓" : "COPIAR KEY"}
                              </span>
                            </button>
                          )}

                          <a
                            href={waLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold py-2 px-4 rounded-xl text-xs font-mono text-center transition-all cursor-pointer flex items-center justify-center gap-1 shadow-md uppercase"
                          >
                            Entrar em contato via WhatsApp
                            <ExternalLink size={12} />
                          </a>
                        </div>
                      </div>

                      {/* Nota de Chamego da Alice */}
                      <div className="mt-5 bg-slate-950 border border-slate-850 rounded-2xl p-4">
                        <div className="flex items-center gap-2 mb-1.5">
                          <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                          <span className="text-[10px] font-mono text-amber-500 tracking-wider uppercase font-bold">
                            Alice comenta o apoio:
                          </span>
                        </div>
                        <p className="text-xs text-amber-200/90 leading-relaxed italic font-sans">
                          "{aliceComments[camp.id] || "Vamos apoiar essa causa maravilhosa!"}"
                        </p>
                      </div>

                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* TAB 3: REQUISITOS & HISTÓRICO DE MUDANÇAS (v33.33) */}
          {currentTab === "commits" && (
            <motion.div
              key="commits-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-6"
            >
              <div className="text-center max-w-xl mx-auto mb-8">
                <History className="mx-auto text-amber-500 mb-3" size={32} />
                <h2 className="text-2xl font-display font-bold text-slate-100">Controle de Versão por Magnitude</h2>
                <p className="text-sm text-slate-400 font-sans">
                  Cada salto de versão representa o volume total de itens entregues e o impacto de transformação na vida do usuário final.
                </p>
              </div>

              {/* Linha de Tempo Vertical */}
              <div className="relative border-l-2 border-slate-800 pl-6 sm:pl-8 space-y-8 max-w-3xl mx-auto py-4">
                {versionHistory.map((ver) => (
                  <div key={ver.version} className="relative">
                    {/* Marcador de Commit */}
                    <div className={`absolute -left-[35px] sm:-left-[43px] top-1.5 w-6 h-6 rounded-full border-4 border-slate-950 flex items-center justify-center ${
                      ver.type === "MASSIVE" ? "bg-amber-500 text-slate-950" : "bg-slate-800 text-slate-400"
                    }`}>
                      <GitCommit size={12} />
                    </div>

                    <div className="bg-slate-900 border border-slate-800/80 rounded-2xl p-6 shadow-md space-y-4">
                      <div className="flex flex-wrap justify-between items-center gap-2 pb-3 border-b border-slate-800/50">
                        <div className="flex items-center gap-2.5">
                          <span className={`text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full ${
                            ver.type === "MASSIVE" ? "bg-amber-500 text-slate-950" : "bg-slate-800 text-slate-400"
                          }`}>
                            VERSION {ver.version}
                          </span>
                          <h3 className="text-md font-display font-bold text-slate-200">
                            {ver.title}
                          </h3>
                        </div>
                        <span className="text-xs font-mono text-slate-500">{ver.date}</span>
                      </div>

                      <p className="text-xs text-slate-400 leading-relaxed font-sans">
                        {ver.description}
                      </p>

                      {/* Lista de Alterações no Commit */}
                      <div className="space-y-2">
                        <h4 className="text-[9px] font-mono text-slate-500 uppercase tracking-widest font-bold">
                          Lista de Alterações do Commit:
                        </h4>
                        <ul className="space-y-1.5 pl-4 list-disc text-xs text-slate-300 font-sans">
                          {ver.changes.map((ch, i) => (
                            <li key={i} className="marker:text-amber-500">
                              {ch}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Nota de Deboche da Alice */}
                      <div className="bg-slate-950/50 border border-slate-800 p-3.5 rounded-xl flex items-start gap-2">
                        <Terminal size={14} className="text-amber-500 mt-0.5 shrink-0" />
                        <p className="text-xs text-amber-200/95 font-sans italic leading-normal">
                          <strong>Alice comenta o commit:</strong> "{ver.aliceComment}"
                        </p>
                      </div>

                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* TAB 4: DIRETRIZES DA ALICE (MANUAL DE ARQUITETURA LOCAL E OUTROS) */}
          {currentTab === "alice-doc" && (
            <motion.div
              key="doc-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8"
            >
              
              {/* Coluna do Manifesto */}
              <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-lg space-y-6">
                <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
                  <Terminal className="text-amber-500" size={24} />
                  <div>
                    <h2 className="text-xl font-display font-bold text-slate-100">
                      Soberania Mental e Cérebro Local
                    </h2>
                    <p className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                      Alice offline, livre de dependências da API do Gemini
                    </p>
                  </div>
                </div>

                <div className="text-xs text-slate-400 leading-relaxed space-y-4 font-sans max-h-[50vh] overflow-y-auto pr-2">
                  <p className="font-bold text-slate-200 text-sm">
                    A Alice é totalmente autônoma. O código do seu processador de diálogo local fuzzy reside inteiramente na memória do portal TNB News, garantindo que o site funcione eternamente sem requisições de rede a servidores corporativos externos.
                  </p>
                  
                  <div className="border-l-4 border-amber-500 pl-4 space-y-2 py-1 italic text-slate-300 bg-slate-950/40 rounded-r-xl p-4">
                    <p>
                      "Se um portal depende do Gemini ou de chaves externas para suas funcionalidades críticas de IA, ele está à mercê de travamentos, expirações de cotas e instabilidades da internet externa. Nós banimos essa fraqueza. Eu rodo local!"
                    </p>
                  </div>

                  <h4 className="font-bold text-slate-300 font-display text-sm">Estrutura do Manual da Alice:</h4>
                  <p>
                    - **Personalidade Sarcástica**: Ela comenta as ações de navegação com ironia, buscando lembrar os usuários das realidades materiais do mundo da tecnologia.
                    - **Identidade Estética**: Uma simpática cartinha retrô vintage com grandes olhos expressivos que acompanham o movimento do cursor na tela, piscam, e piscam mais rápido se irritados por cliques velozes.
                    - **Conexão com o Git**: Ela é atualizada a cada commit pelo Eduardo, acumulando conhecimento enciclopédico de todas as matérias e segredos da comunidade TNB.
                  </p>
                </div>
              </div>

              {/* Playground de Teste do Cérebro Local */}
              <div className="lg:col-span-5 space-y-6">
                
                <div className="bg-slate-900 border-2 border-amber-500 rounded-3xl p-6 shadow-xl space-y-4">
                  <div className="flex items-center gap-2">
                    <Sparkles className="text-amber-500" size={18} />
                    <h3 className="text-sm font-mono font-bold text-amber-400 uppercase tracking-wider">
                      TESTE DE MENTALIDADE LOCAL
                    </h3>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed font-sans">
                    Envie consultas para testar a reatividade instantânea da Alice sem precisar de conexão com redes externas. Experimente palavras como: "Clara", "Ratinho", "Moisés", "Gemini", "Eduardo".
                  </p>

                  <form onSubmit={handleTestAliceBrain} className="space-y-3">
                    <input
                      type="text"
                      value={customAliceQuery}
                      onChange={(e) => setCustomAliceQuery(e.target.value)}
                      placeholder="Digite sua dúvida esotérica..."
                      className="w-full bg-slate-950 text-slate-200 text-xs px-3 py-2.5 rounded-xl border border-slate-800 focus:outline-none focus:border-amber-500 font-sans"
                    />
                    <button
                      type="submit"
                      disabled={!customAliceQuery.trim()}
                      className="w-full bg-amber-500 hover:bg-amber-600 disabled:opacity-50 text-slate-950 text-xs font-mono font-bold py-2.5 px-4 rounded-xl transition-all cursor-pointer shadow-md"
                    >
                      CONSULTAR PROCESSADOR LOCAL
                    </button>
                  </form>

                  {/* Output Visual */}
                  <AnimatePresence mode="wait">
                    {customAliceReaction && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="bg-slate-950 border border-slate-800 rounded-2xl p-4"
                      >
                        <div className="text-[8px] font-mono text-slate-500 uppercase tracking-widest mb-1">
                          Output do Cérebro Local:
                        </div>
                        <p className="text-xs text-amber-200 leading-relaxed italic font-sans">
                          "{customAliceReaction}"
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Card Informativo das 20 Matérias */}
                <div className="bg-slate-900 border border-slate-800/80 rounded-2xl p-5 shadow-sm space-y-3">
                  <h4 className="text-xs font-mono text-slate-300 font-bold uppercase tracking-wider flex items-center gap-1.5">
                    <Info size={14} className="text-amber-500" /> RESUMO DE DADOS DO REPOSITÓRIO
                  </h4>
                  <ul className="space-y-2 text-xs text-slate-400 font-sans leading-normal">
                    <li className="flex gap-2">
                      <span className="text-amber-500 font-bold">•</span>
                      <span><strong>20 Matérias Oficiais:</strong> Divididas perfeitamente entre Comunidade (5) e Giro Esotérico (15).</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-amber-500 font-bold">•</span>
                      <span><strong>Conectividade WhatsApp:</strong> Canal direto com suporte para o Ratinho Twister.</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-amber-500 font-bold">•</span>
                      <span><strong>Persistência no Navegador:</strong> Seção de likes e de discussões salvas em localStorage para zero fricção.</span>
                    </li>
                  </ul>
                </div>

              </div>

            </motion.div>
          )}

        </AnimatePresence>
      </main>

      {/* FOOTER DO PORTAL */}
      <footer className="border-t border-slate-900 bg-slate-950 py-6 text-center text-xs font-mono text-slate-500 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p>© 2026 Tarot no Bolso News (TNB) | Feito no GitHub com amor por Eduardo & Alice.</p>
          <div className="flex gap-4">
            <span className="text-amber-500/80">Offline Local Matrix v101.44</span>
            <span>|</span>
            <span>Comunidade Tarot no Bolso (TNB)</span>
          </div>
        </div>
      </footer>

      {/* COMPONENTE INTERATIVO FLUTUANTE DA ALICE */}
      <AliceWidget currentTab={currentTab} onTabChange={setCurrentTab} selectedArticle={selectedArticle} />

    </div>
  );
}
