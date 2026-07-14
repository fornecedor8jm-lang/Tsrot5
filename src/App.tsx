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
import MiniAlice from "./components/MiniAlice";

export default function App() {
  // Controle de Abas e Temas
  const [currentTab, setCurrentTab] = useState<"news" | "campaigns" | "audiovisual" | "faq">("news");
  const [theme, setTheme] = useState<"dark" | "light">(() => {
    const saved = localStorage.getItem("tnb-theme");
    return (saved as "dark" | "light") || "dark";
  });

  // Ativação opcional da Alice
  const [isAliceActive, setIsAliceActive] = useState<boolean>(() => {
    const saved = localStorage.getItem("tnb-alice-active");
    return saved !== null ? saved === "true" : true;
  });

  useEffect(() => {
    localStorage.setItem("tnb-alice-active", String(isAliceActive));
  }, [isAliceActive]);

  // Filtros de Notícias
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("Todos");
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  
  // Likes locais persistentes
  const [localArticles, setLocalArticles] = useState<Article[]>(() => {
    const saved = localStorage.getItem("tnb-likes-v2");
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as Article[];
        // Merge with fresh articles data so new content edits always load, but preserving views/likes
        return articles.map(fresh => {
          const cached = parsed.find(p => p.id === fresh.id);
          if (cached) {
            return {
              ...fresh,
              views: Math.max(fresh.views, cached.views),
              likes: Math.max(fresh.likes, cached.likes)
            };
          }
          return fresh;
        });
      } catch (e) { return articles; }
    }
    return articles;
  });

  // Salvar likes no local storage
  useEffect(() => {
    localStorage.setItem("tnb-likes-v2", JSON.stringify(localArticles));
  }, [localArticles]);

  // Seção de Comentários Funcionais (localStorage) - Usamos v3 para limpar dados simulados anteriores
  const [commentsList, setCommentsList] = useState<Record<string, Array<{ author: string; text: string; date: string }>>>({});
  const [commentName, setCommentName] = useState("");
  const [commentText, setCommentText] = useState("");

  // Estados para Aba Audiovisual e Discussão sobre a Série
  const [selectedEpisode, setSelectedEpisode] = useState<number>(1);
  const [isVideoPlaying, setIsVideoPlaying] = useState<boolean>(false);
  const [seriesRating, setSeriesRating] = useState<number>(() => {
    return Number(localStorage.getItem("tnb-series-rating") || "0");
  });

  // Discussão sobre a Série (localStorage)
  const [seriesCommentsList, setSeriesCommentsList] = useState<Record<string, Array<{ author: string; text: string; date: string }>>>({});
  const [seriesCommentName, setSeriesCommentName] = useState("");
  const [seriesCommentText, setSeriesCommentText] = useState("");

  // Carregar comentários reais de artigos (sem dados fictícios)
  useEffect(() => {
    const savedComments = localStorage.getItem("tnb-comments-v3");
    if (savedComments) {
      try {
        setCommentsList(JSON.parse(savedComments));
      } catch (e) {
        console.error(e);
      }
    } else {
      setCommentsList({});
      localStorage.setItem("tnb-comments-v3", JSON.stringify({}));
    }
  }, []);

  // Carregar comentários reais da série (sem dados fictícios)
  useEffect(() => {
    const savedSeriesComments = localStorage.getItem("tnb-series-comments-v1");
    if (savedSeriesComments) {
      try {
        setSeriesCommentsList(JSON.parse(savedSeriesComments));
      } catch (e) {
        console.error(e);
      }
    } else {
      setSeriesCommentsList({});
      localStorage.setItem("tnb-series-comments-v1", JSON.stringify({}));
    }
  }, []);

  // Função para tratar as menções (@username) nos comentários
  const renderCommentText = (text: string) => {
    const parts = text.split(/(\s+)/);
    return parts.map((part, index) => {
      if (part.startsWith("@") && part.length > 1) {
        return (
          <span key={index} className="text-amber-400 font-bold bg-amber-500/10 px-1.5 py-0.5 rounded text-[10px] sm:text-[11px] font-mono">
            {part}
          </span>
        );
      }
      return part;
    });
  };

  // Função para adicionar menção automaticamente ao responder
  const handleReplyMention = (author: string, isSeries: boolean) => {
    const formattedAuthor = author.replace(/\s+/g, "").toLowerCase();
    const mention = `@${formattedAuthor} `;
    
    if (isSeries) {
      setSeriesCommentText(prev => {
        if (prev.includes(mention)) return prev;
        return prev ? `${prev} ${mention}` : mention;
      });
      setTimeout(() => {
        const inputEl = document.getElementById("series-comment-text-input");
        if (inputEl) inputEl.focus();
      }, 50);
    } else {
      setCommentText(prev => {
        if (prev.includes(mention)) return prev;
        return prev ? `${prev} ${mention}` : mention;
      });
      setTimeout(() => {
        const inputEl = document.getElementById("article-comment-text-input");
        if (inputEl) inputEl.focus();
      }, 50);
    }
  };

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
    localStorage.setItem("tnb-comments-v3", JSON.stringify(updated));
    setCommentText("");
  };

  const handleAddSeriesComment = (episodeId: string, e: React.FormEvent) => {
    e.preventDefault();
    if (!seriesCommentName.trim() || !seriesCommentText.trim()) return;

    const newComment = {
      author: seriesCommentName.trim(),
      text: seriesCommentText.trim(),
      date: new Date().toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "long",
        year: "numeric"
      }) + " às " + new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })
    };

    const updated = {
      ...seriesCommentsList,
      [episodeId]: [...(seriesCommentsList[episodeId] || []), newComment]
    };

    setSeriesCommentsList(updated);
    localStorage.setItem("tnb-series-comments-v1", JSON.stringify(updated));
    setSeriesCommentText("");
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

  const recessoStatus = useMemo(() => {
    if (isRecessoFinished) {
      return {
        text: "Comunidade Aberta! 🎉",
        badgeBg: "bg-emerald-500/15 border-emerald-500/30 text-emerald-400",
        indicatorBg: "bg-emerald-500",
        bannerBg: "from-emerald-600 to-emerald-800 border-emerald-400",
        icon: "✅",
        textColor: "text-emerald-100"
      };
    }
    const days = countdownStr.days;
    if (days > 2) {
      return {
        text: `Recesso em andamento – Faltam ${days} dias`,
        badgeBg: "bg-red-500/20 border-red-500/30 text-red-450",
        indicatorBg: "bg-red-500",
        bannerBg: "from-red-600 to-red-800 border-red-400",
        icon: "⏳",
        textColor: "text-red-100"
      };
    } else if (days === 2) {
      return {
        text: "Retorno iminente – Faltam 2 dias",
        badgeBg: "bg-amber-500/20 border-amber-500/30 text-amber-400",
        indicatorBg: "bg-amber-500",
        bannerBg: "from-amber-600 to-amber-800 border-amber-400",
        icon: "⚠️",
        textColor: "text-amber-100"
      };
    } else {
      return {
        text: "Quase lá! Retorna amanhã",
        badgeBg: "bg-emerald-500/20 border-emerald-500/30 text-emerald-400",
        indicatorBg: "bg-emerald-500",
        bannerBg: "from-emerald-600 to-emerald-800 border-emerald-400",
        icon: "🚀",
        textColor: "text-emerald-100"
      };
    }
  }, [isRecessoFinished, countdownStr.days]);

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
            <div className="hidden sm:inline">ALICE OFFLINE: {isAliceActive ? "OPERANTE" : "INATIVA"}</div>
            <div>VERSÃO: v{versionHistory[0]?.version || "105.00"}</div>
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
            {/* Botão de Ativação da Alice */}
            <button
              onClick={() => setIsAliceActive(prev => !prev)}
              id="alice-toggle-btn"
              className={`px-3.5 py-2 rounded-xl border cursor-pointer transition-all hover:scale-105 flex items-center gap-2 font-mono text-xs font-bold shadow-sm ${
                isAliceActive
                  ? "bg-amber-500 hover:bg-amber-600 text-slate-950 border-amber-400"
                  : theme === "dark"
                    ? "bg-slate-900 hover:bg-slate-850 text-slate-400 border-slate-800"
                    : "bg-zinc-100 hover:bg-zinc-205 text-zinc-500 border-zinc-300"
              }`}
              title={isAliceActive ? "Desativar Assistente Alice" : "Ativar Assistente Alice"}
            >
              <div className={`w-2.5 h-2.5 rounded-full ${isAliceActive ? "bg-slate-950 animate-pulse" : "bg-zinc-400 dark:bg-slate-600"}`} />
              <span className="text-[10px] sm:text-xs">
                {isAliceActive ? "DESATIVAR ALICE 🤖" : "ATIVAR ALICE 🤖"}
              </span>
            </button>

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
                📰 Reportagens da Semana
              </button>
              
              <button
                onClick={() => { setCurrentTab("campaigns"); setSelectedArticle(null); }}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-mono font-bold tracking-wider transition-all duration-150 cursor-pointer ${
                  currentTab === "campaigns" ? themeClasses.tabActive : themeClasses.tabInactive
                }`}
              >
                <Heart size={14} />
                ❤️ Campanhas
              </button>

              <button
                onClick={() => { setCurrentTab("audiovisual"); setSelectedArticle(null); }}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-mono font-bold tracking-wider transition-all duration-150 cursor-pointer ${
                  currentTab === "audiovisual" ? themeClasses.tabActive : themeClasses.tabInactive
                }`}
              >
                <Play size={14} />
                🎬 Audiovisuais da Semana
              </button>

              <button
                onClick={() => { setCurrentTab("faq"); setSelectedArticle(null); }}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-mono font-bold tracking-wider transition-all duration-150 cursor-pointer ${
                  currentTab === "faq" ? themeClasses.tabActive : themeClasses.tabInactive
                }`}
              >
                <HelpCircle size={14} />
                ❓ FAQs
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* BANNER DE RECESSO COM CONTADOR REGRESSIVO EM TEMPO REAL */}
      <section className="bg-gradient-to-r from-amber-600 to-amber-800 text-slate-950 py-4 px-4 font-sans border-b border-amber-400">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 flex-1">
            <div className="p-2.5 bg-slate-950 text-amber-500 rounded-xl shrink-0">
              <Calendar size={22} />
            </div>
            <div className="space-y-1.5 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-sm font-bold uppercase tracking-wider text-slate-950">
                  Comunicado Oficial de Recesso TNB News
                </h2>
                <div id="indicador-recesso" className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider border ${recessoStatus.badgeBg}`}>
                  <span>{recessoStatus.icon}</span>
                  <span>{recessoStatus.text}</span>
                </div>
              </div>
              <p className="text-xs text-amber-100 font-medium max-w-2xl leading-relaxed">
                <strong>ℹ️ Nota de Esclarecimento sobre o Retorno:</strong> A reabertura da comunidade está prevista para o dia <strong>17 de julho</strong>, encerrando o período de recesso. No entanto, o horário exato de retorno pode variar conforme ajustes técnicos finais. Portanto, considere o término do recesso como uma <strong>previsão estimada</strong>, podendo ocorrer ligeiras alterações sem aviso prévio. Agradecemos a compreensão! 🙏
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
              {/* NOTÍCIA/AVISO DE RETOMADA DAS REPORTAGENS */}
              <div className="bg-amber-500/10 border-2 border-amber-500/30 p-5 rounded-3xl space-y-3 shadow-lg">
                <div className="flex items-center gap-2 text-amber-500 font-mono font-bold text-xs uppercase tracking-wider">
                  <Newspaper size={16} />
                  ⚠️ Aviso importante — Retomada das Reportagens
                </div>
                <div className="space-y-2 text-xs text-slate-300 leading-relaxed font-sans">
                  <p>
                    As Reportagens voltaram a fazer parte do TNB NEWS. Nesta nova fase, as publicações serão disponibilizadas gradualmente. Novas matérias serão adicionadas aos poucos, conforme forem produzidas e revisadas pela redação.
                  </p>
                  <p>
                    Enquanto o acervo é ampliado, o portal destacará uma <strong className="text-amber-400">Reportagem da Semana</strong>, permitindo que os leitores acompanhem os conteúdos mais recentes. Agradecemos a compreensão e o apoio durante essa retomada. 📰
                  </p>
                </div>
              </div>

               {/* SPOTLIGHT: REPORTAGEM DA SEMANA */}
              {(() => {
                const bastidorArt = localArticles.find(a => a.id === "art-coluna-bastidor");
                if (!bastidorArt) return null;
                return (
                  <div className="bg-gradient-to-r from-slate-900 to-slate-950 border-2 border-emerald-500/50 rounded-3xl p-6 sm:p-8 shadow-2xl flex flex-col md:flex-row gap-6 items-center">
                    <div className="w-full md:w-1/3 h-52 rounded-2xl overflow-hidden border border-slate-800 shrink-0 relative">
                      <img
                        src={bastidorArt.image}
                        alt="Coluna do Bastidor - Tarot do Bolso"
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute top-2 left-2">
                        <span className="bg-emerald-600 text-white font-mono text-[9px] font-black px-2 py-1 rounded border border-emerald-400 uppercase tracking-widest flex items-center gap-1 shadow-md">
                          <span className="w-1.5 h-1.5 rounded-full bg-white" />
                          CASO ENCERRADO
                        </span>
                      </div>
                    </div>
                    <div className="flex-1 space-y-4">
                      <div className="flex flex-wrap gap-2 items-center">
                        <span className="bg-emerald-600 text-white font-mono text-[9px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-widest shadow-md">
                          REPORTAGEM CONCLUÍDA ✅
                        </span>
                        <span className="text-emerald-500 font-mono text-[10px] font-bold">
                          ⚡ Plot Twist Italiano: Inocente!
                        </span>
                      </div>
                      
                      <h3 className="text-xl sm:text-2xl font-display font-bold text-slate-100 hover:text-amber-400 transition-colors leading-tight cursor-pointer"
                          onClick={() => setSelectedArticle(bastidorArt)}
                      >
                        {bastidorArt.title}
                      </h3>
                      
                      <p className="text-xs text-slate-400 leading-relaxed font-sans line-clamp-3">
                        {bastidorArt.summary}
                      </p>
                      
                      <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-slate-800/40">
                        <span className="text-[10px] font-mono text-slate-500">Por: {bastidorArt.author}</span>
                        <button
                          onClick={() => setSelectedArticle(bastidorArt)}
                          className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-1 shadow-md uppercase"
                        >
                          Ler Reportagem Completa →
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })()}
              
              {/* CARROSSEL DOS FATOS DA COMUNIDADE (MATÉRIAS 01 A 05) */}
              {true && (
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
                
                {/* 1. SEÇÃO DE NOTÍCIAS */}
                <div className="lg:col-span-8 space-y-6">
                  
                  {true ? (
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

                {/* 3. COLUNA LATERAL DE RECURSOS (Sempre visível) */}
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
                  const isFinancial = camp.targetAmount > 0;
                  const pct = isFinancial ? Math.min(100, Math.round((camp.raisedAmount / camp.targetAmount) * 100)) : 100;
                  const missingAmount = isFinancial ? Math.max(0, camp.targetAmount - camp.raisedAmount) : 0;
                  const isMetaAchieved = isFinancial ? missingAmount === 0 : true;

                  // Comentários da Alice personalizados para cada ID de campanha
                  const aliceComments: Record<string, string> = {
                    "camp-ratinho": "Um ratinho de estimação fofinho que só quer feno e carinho... Se você não apoiar essa fofura, seu baralho de Tarot vai dar 'A Torre' em todas as tiragens amorosas por seis meses! Estou avisando... 🐭❤️",
                    "camp-simon": "Simon é cartomante dedicado. Dívidas de cartão são um carma terrível que suga nossa aura. Vamos ajudar a limpar a fatura dele para as tiragens dele continuarem abençoadas! 🔮💳",
                    "camp-luma": "Ver o show do MGK em SP é o sonho supremo de rockstar. Eu queria poder ir junto no bolso dela, mas sou só uma inteligência de papel de 15kb. Ajude a Luma a pular na pista por nós duas! 🤘🔥",
                    "camp-yasmin": "Aos 19 anos, mudar de cidade para recomeçar a vida exige coragem digna do arcano do Louco dando seu primeiro passo. Vamos segurar essa rede de proteção para ela iniciar essa nova jornada! 🗺️✨",
                    "camp-eva-tcc": "Estudantes e artistas de Macapá, essa pesquisa é fundamental para a criação de um polo de arte na região! É um projeto de TCC lindo da Eva em Arquitetura. Vamos responder o formulário e apoiar! 🎨🏫✨"
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
                          !isFinancial
                            ? "bg-purple-500/10 text-purple-400 border-purple-500/20"
                            : isMetaAchieved 
                              ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" 
                              : "bg-amber-500/10 text-amber-500 border-amber-500/20"
                        }`}>
                          {!isFinancial ? "PESQUISA ACADÊMICA 🏫" : isMetaAchieved ? "META BATIDA! 🎉" : "EM ANDAMENTO"}
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
                        {isFinancial ? (
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
                        ) : (
                          <div className="pt-3 border-t border-slate-850 space-y-2">
                            <div className="bg-slate-950/60 border border-purple-500/20 p-3.5 rounded-2xl text-[10px] font-mono text-slate-300">
                              <span className="text-purple-400 font-bold block mb-1">🔍 INICIATIVA CIENTÍFICA & CULTURAL</span>
                              Este projeto é de cunho voluntário e exclusivamente acadêmico, sem fins lucrativos ou arrecadação Pix. Ajude preenchendo o questionário oficial!
                            </div>
                          </div>
                        )}

                        {/* Contatos / Chaves Pix ou Google Forms */}
                        <div className="flex flex-col gap-2 pt-1.5">
                          {!isFinancial ? (
                            <a
                              href="https://forms.gle/1nefnLSZARUsXLVy8"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold py-2.5 px-4 rounded-xl text-xs font-mono text-center transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-lg uppercase tracking-wider animate-bounce-little"
                            >
                              Responder no Google Forms 📝
                              <ExternalLink size={12} />
                            </a>
                          ) : (
                            <>
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
                            </>
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

          {/* TAB 3: AUDIOVISUAL DA SEMANA */}
          {currentTab === "audiovisual" && (
            <motion.div
              key="audiovisual-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-8 max-w-5xl mx-auto font-sans"
            >
              {/* Cabeçalho */}
              <div className="text-center space-y-3">
                <div className="inline-block p-3 bg-amber-500/10 rounded-2xl text-amber-500">
                  <Play className="w-8 h-8 animate-pulse" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-slate-100 uppercase tracking-tight">
                  🎬 Audiovisuais da Semana
                </h2>
                <p className="text-xs font-mono text-amber-500 uppercase tracking-widest">
                  Conteúdos Audiovisuais Publicados Regularmente no Portal
                </p>
              </div>

              {/* Informação Geral / Disclaimer */}
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 text-slate-300 font-sans text-xs leading-relaxed flex items-start gap-3">
                <AlertCircle className="text-amber-500 mt-0.5 shrink-0" size={18} />
                <p>
                  <strong>⚠️ Aviso importante:</strong> O conteúdo da aba Audiovisual da Semana será atualizado periodicamente com novos episódios, séries, documentários, curtas e outras produções de interesse da comunidade. O catálogo será ampliado gradualmente conforme novos conteúdos forem publicados no TNB NEWS.
                </p>
              </div>

              {/* Cinema Player Container */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Lado Esquerdo: Cinema Screen e Informações */}
                <div className="lg:col-span-8 space-y-6">
                  {/* Player de Cinema */}
                  <div className="relative bg-black rounded-3xl overflow-hidden border-2 border-amber-500/30 shadow-2xl shadow-amber-500/5 aspect-video flex flex-col justify-between">
                    <video
                      id="tnb-video-player"
                      key={selectedEpisode}
                      controls
                      src={selectedEpisode === 1 ? "https://files.catbox.moe/6l6u90.mp4" : "https://files.catbox.moe/5rbecu.mp4"}
                      className="w-full h-full object-contain"
                      poster={selectedEpisode === 1 ? "https://images.unsplash.com/photo-1574375927938-d5a98e8edd86?q=80&w=1200&auto=format&fit=crop" : "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=1200&auto=format&fit=crop"}
                      onPlay={() => setIsVideoPlaying(true)}
                      onPause={() => setIsVideoPlaying(false)}
                      onEnded={() => setIsVideoPlaying(false)}
                    />
                    {/* Tarjeta de reprodução atual */}
                    <div className="absolute top-4 left-4 bg-slate-950/80 border border-amber-500/40 px-3 py-1.5 rounded-full text-[10px] font-mono font-bold text-amber-400 tracking-wider uppercase backdrop-blur-md">
                      🔴 Reproduzindo: O Instituto — Episódio {selectedEpisode}
                    </div>
                  </div>

                  {/* Informações da Série */}
                  <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
                    <div className="flex flex-wrap justify-between items-center gap-4 border-b border-slate-800 pb-4">
                      <div>
                        <h3 className="text-xl font-display font-extrabold text-slate-100 flex items-center gap-2">
                          📺 O Instituto <span className="text-xs font-mono font-normal text-slate-500">(The Institute)</span>
                        </h3>
                        <p className="text-xs text-amber-500 font-mono mt-1">
                          Baseado no aclamado romance homônimo de Stephen King
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <span className="bg-slate-950 border border-slate-800 text-[10px] text-slate-300 font-mono font-bold px-2.5 py-1 rounded-full">Drama</span>
                        <span className="bg-slate-950 border border-slate-800 text-[10px] text-slate-300 font-mono font-bold px-2.5 py-1 rounded-full">Ficção Científica</span>
                      </div>
                    </div>

                    <div className="space-y-4 font-sans text-xs leading-relaxed text-slate-350">
                      <div>
                        <h4 className="font-mono text-[10px] text-amber-500 uppercase font-bold tracking-wider mb-1">Sinopse da Série:</h4>
                        <p className="font-bold text-slate-200">
                          Baseada no romance homônimo de Stephen King, O Instituto (The Institute) é uma série norte-americana de drama e ficção científica escrita por Benjamin Cavell e dirigida por Jack Bender.
                        </p>
                      </div>

                      <div>
                        <h4 className="font-mono text-[10px] text-amber-500 uppercase font-bold tracking-wider mb-1">Enredo Detalhado:</h4>
                        <p>
                          A história acompanha um adolescente extremamente inteligente que é sequestrado e desperta em um misterioso instituto onde diversas crianças com habilidades especiais são mantidas. Conforme tenta escapar, ele descobre os segredos obscuros da organização e enfrenta perigos cada vez maiores.
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-4 border-t border-slate-800/60 pt-4">
                        <div>
                          <h4 className="font-mono text-[10px] text-amber-500 uppercase font-bold tracking-wider mb-1">Elenco Principal:</h4>
                          <ul className="list-disc pl-4 space-y-1 text-slate-300">
                            <li>Ben Barnes</li>
                            <li>Mary-Louise Parker</li>
                            <li>Joe Freeman</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-mono text-[10px] text-amber-500 uppercase font-bold tracking-wider mb-1">Equipe Técnica:</h4>
                          <ul className="list-disc pl-4 space-y-1 text-slate-300">
                            <li>Escritor: Benjamin Cavell</li>
                            <li>Diretor: Jack Bender</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Lado Direito: Seleção de Episódios e Feedback */}
                <div className="lg:col-span-4 space-y-6">
                  {/* Lista de Episódios */}
                  <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 space-y-4 shadow-lg">
                    <h3 className="text-xs font-mono font-bold text-amber-400 uppercase tracking-widest border-b border-slate-800/80 pb-3">
                      Episódios Disponíveis:
                    </h3>
                    
                    <div className="space-y-2.5">
                      {[
                        { num: 1, title: "O Instituto - Episódio 1", duration: "48 min", url: "https://files.catbox.moe/6l6u90.mp4" },
                        { num: 2, title: "O Instituto - Episódio 2", duration: "51 min", url: "https://files.catbox.moe/5rbecu.mp4" }
                      ].map((ep) => (
                        <button
                          key={ep.num}
                          onClick={() => {
                            setSelectedEpisode(ep.num);
                            // Vibração visual discreta
                            const headerTitle = document.querySelector("h1");
                            if (headerTitle) {
                              headerTitle.style.transform = "scale(1.02)";
                              setTimeout(() => headerTitle.style.transform = "", 300);
                            }
                          }}
                          className={`w-full flex items-center justify-between p-3.5 rounded-2xl border transition-all cursor-pointer ${
                            selectedEpisode === ep.num
                              ? "bg-amber-500/10 border-amber-500 text-amber-400"
                              : "bg-slate-950/60 border-slate-850 hover:border-slate-800 text-slate-300"
                          }`}
                        >
                          <div className="flex items-center gap-2.5 text-left">
                            <div className={`w-7 h-7 rounded-full flex items-center justify-center font-mono text-xs font-black ${
                              selectedEpisode === ep.num ? "bg-amber-500 text-slate-950" : "bg-slate-900 text-slate-500"
                            }`}>
                              {ep.num}
                            </div>
                            <div>
                              <p className="text-xs font-bold leading-tight">{ep.title}</p>
                              <p className="text-[10px] text-slate-500 font-mono mt-0.5">{ep.duration} | Full HD</p>
                            </div>
                          </div>
                          <Play size={12} className={selectedEpisode === ep.num ? "text-amber-500 animate-pulse" : "text-slate-600"} />
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Feedback e Avaliação Interativa */}
                  <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 space-y-4 shadow-lg">
                    <h3 className="text-xs font-mono font-bold text-amber-400 uppercase tracking-widest border-b border-slate-800/80 pb-3">
                      Avaliar Série:
                    </h3>

                    {/* Estrelas */}
                    <div className="flex justify-center gap-2 py-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          onClick={() => {
                            setSeriesRating(star);
                            localStorage.setItem("tnb-series-rating", String(star));
                          }}
                          className="text-2xl hover:scale-115 transition-all cursor-pointer"
                        >
                          {star <= seriesRating ? "⭐" : "☆"}
                        </button>
                      ))}
                    </div>
                    {seriesRating > 0 && (
                      <p className="text-center text-[10px] font-mono text-amber-500">
                        Obrigado! Sua nota de {seriesRating}/5 foi computada!
                      </p>
                    )}

                    {/* ÁREA DE COMENTÁRIOS PERSISTENTES DA SÉRIE (LOCALSTORAGE) */}
                    <div className="pt-4 border-t border-slate-800/60 space-y-4">
                      <div className="flex items-center gap-2 text-slate-200 font-display font-bold text-sm">
                        <MessageSquare size={16} className="text-amber-500" />
                        <span>Discussão sobre a Série ({(seriesCommentsList[`ep-${selectedEpisode}`] || []).length})</span>
                      </div>

                      {/* Lista de Comentários */}
                      <div className="space-y-3 max-h-56 overflow-y-auto pr-1">
                        {seriesCommentsList[`ep-${selectedEpisode}`] && seriesCommentsList[`ep-${selectedEpisode}`].length > 0 ? (
                          seriesCommentsList[`ep-${selectedEpisode}`].map((comm, i) => (
                            <div key={i} className="bg-slate-950/60 border border-slate-800/80 p-3 rounded-xl space-y-1">
                              <div className="flex justify-between items-center text-[10px] font-mono">
                                <span className="text-amber-500 font-bold flex items-center gap-1">
                                  <User size={10} /> {comm.author}
                                </span>
                                <div className="flex items-center gap-2">
                                  <span className="text-slate-500">{comm.date}</span>
                                  <button
                                    type="button"
                                    onClick={() => handleReplyMention(comm.author, true)}
                                    className="text-amber-500 hover:text-amber-400 font-bold cursor-pointer transition-colors"
                                  >
                                    Responder
                                  </button>
                                </div>
                              </div>
                              <p className="text-xs text-slate-300 font-sans leading-relaxed break-words">
                                {renderCommentText(comm.text)}
                              </p>
                            </div>
                          ))
                        ) : (
                          <p className="text-xs text-slate-500 italic text-center py-2 leading-relaxed">
                            Ainda não há comentários. Seja o primeiro a participar desta discussão!
                          </p>
                        )}
                      </div>

                      {/* Form de Envio */}
                      <form onSubmit={(e) => handleAddSeriesComment(`ep-${selectedEpisode}`, e)} className="space-y-2 pt-2">
                        <div className="grid grid-cols-1 gap-2">
                          <input
                            type="text"
                            value={seriesCommentName}
                            onChange={(e) => setSeriesCommentName(e.target.value)}
                            placeholder="Seu nome..."
                            required
                            className="bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs text-slate-100 focus:outline-none focus:border-amber-500 font-mono"
                          />
                        </div>
                        <div className="flex gap-2">
                          <input
                            id="series-comment-text-input"
                            type="text"
                            value={seriesCommentText}
                            onChange={(e) => setSeriesCommentText(e.target.value)}
                            placeholder="O que você acha do episódio?..."
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

                  {/* Alice comenta */}
                  <div className="bg-slate-950 border border-slate-850 rounded-2xl p-4">
                    <div className="flex items-center gap-2 mb-1.5">
                      <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                      <span className="text-[10px] font-mono text-amber-500 tracking-wider uppercase font-bold">
                        Alice comenta as produções:
                      </span>
                    </div>
                    <p className="text-xs text-amber-200/90 leading-relaxed italic font-sans">
                      "Assustador! O Mini Alice ficou tão fascinado com esse sequestro e as crianças mágicas que grudou na TV e está comendo pipoca sem piscar desde o início do recesso. Deem um play para assistir com a gente!"
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 4: FAQs (COMUNICADOS, PROMOÇÕES, DIRETRIZES & MANUAL) */}
          {currentTab === "faq" && (
            <motion.div
              key="faq-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-8 max-w-4xl mx-auto font-sans"
            >
              {/* Cabeçalho */}
              <div className="text-center space-y-3">
                <div className="inline-block p-3 bg-amber-500/10 rounded-2xl text-amber-500">
                  <HelpCircle className="w-8 h-8 animate-pulse" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-slate-100 uppercase tracking-tight">
                  ❓ Perguntas Frequentes & Diretrizes
                </h2>
                <p className="text-xs font-mono text-amber-500 uppercase tracking-widest">
                  Comunicados Importantes, Atendimentos da Luma & Diretrizes do Portal
                </p>
              </div>

              {/* SEÇÃO 1: COMUNICADO DE SEGURANÇA */}
              <div className="bg-red-500/5 border-2 border-red-500/30 rounded-3xl p-6 sm:p-8 space-y-4 shadow-xl">
                <div className="flex items-center gap-2 text-red-400">
                  <AlertCircle size={24} className="animate-pulse" />
                  <h2 className="text-base sm:text-lg font-display font-black tracking-tight uppercase">
                    COMUNICADO IMPORTANTE DE SEGURANÇA
                  </h2>
                </div>
                <div className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans space-y-3">
                  <p>
                    Pedimos a colaboração de todos para manter a comunidade como um ambiente seguro, respeitoso e responsável.
                  </p>
                  <p>
                    Nem todo assunto pessoal deve ser compartilhado na comunidade. Relatos envolvendo situações eticamente ou legalmente delicadas podem causar desconforto, gatilhos em outros participantes e gerar discussões incompatíveis com a finalidade do grupo.
                  </p>
                  <p>
                    Também lembramos que conteúdos relacionados a possíveis crimes, violações da lei ou outras situações graves não devem ser publicados. Além de não ser o local adequado, isso pode prejudicar a imagem da comunidade e desviar seu verdadeiro propósito.
                  </p>
                  <p>
                    Questões dessa natureza devem ser tratadas nos canais apropriados e com profissionais capacitados para oferecer o suporte necessário.
                  </p>
                  <p className="font-bold text-amber-400">
                    Contamos com o bom senso de todos para preservar o bem-estar dos participantes, a reputação da comunidade e o ambiente acolhedor que buscamos construir.
                  </p>
                </div>
              </div>

              {/* SEÇÃO 2: ATENDIMENTOS MÁGICKOS DA LUMA */}
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
                <div className="flex items-center justify-between flex-wrap gap-4 border-b border-slate-800 pb-4">
                  <div className="flex items-center gap-2.5">
                    <Sparkles className="text-amber-500" size={20} />
                    <div>
                      <h3 className="text-sm font-mono font-bold text-amber-500 uppercase tracking-widest">
                        ⚠️ PROMOÇÃO — SERVIÇOS MÁGICKOS DA LUMA
                      </h3>
                      <p className="text-[11px] text-slate-500 mt-0.5">Alinhamento Cósmico & Trabalhos de Renovação</p>
                    </div>
                  </div>
                  <span className="bg-amber-500/10 text-amber-400 text-[10px] font-mono px-3 py-1 rounded-full font-bold">AGENDA ABERTA</span>
                </div>

                <div className="text-xs text-slate-300 leading-relaxed font-sans space-y-3">
                  <p>
                    Com a chegada da Lua Nova e, logo em seguida, da Lua Crescente, este período é considerado favorável para trabalhos voltados à clareza mental, prosperidade, glamour, amor-próprio, conexão espiritual e magias amorosas.
                  </p>
                  <p>
                    Aproveite as energias benéficas desses ciclos astrológicos para realizar seu agendamento especial:
                  </p>
                </div>

                {/* Grade de Preços */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { title: "Clareza mental", price: 120.00, icon: "🧠" },
                    { title: "Prosperidade", price: 200.00, icon: "💰" },
                    { title: "Glamour", price: 150.00, icon: "✨" },
                    { title: "Conexão com seu espiritual", price: 100.00, icon: "🔮" },
                    { title: "Adoçamento", price: 180.00, icon: "❤️" },
                    { title: "Reconciliação amorosa", price: 250.00, icon: "💞" },
                    { title: "Autoadoçamento com autoconfiança", price: 200.00, icon: "🌹" }
                  ].map((service, idx) => (
                    <div key={idx} className="bg-slate-950/40 border border-slate-800/60 p-3.5 rounded-2xl flex justify-between items-center hover:border-amber-500/20 transition-all">
                      <span className="text-xs font-bold text-slate-200 flex items-center gap-2">
                        <span className="text-base">{service.icon}</span> {service.title}
                      </span>
                      <div className="bg-amber-500/10 text-amber-400 font-mono font-bold text-xs px-2.5 py-1 rounded-lg shrink-0">
                        R$ {service.price.toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>

                {/* WhatsApp Luma */}
                <div className="bg-gradient-to-r from-amber-600/10 to-amber-800/10 border border-amber-500/30 rounded-2xl p-5 text-center space-y-3.5">
                  <p className="text-xs text-slate-300 leading-relaxed">
                    📲 Acesse o contato da Luma para saber mais e realizar seu agendamento esotérico.
                  </p>
                  <a
                    href="https://wa.me/5522997358696?text=Ol%C3%A1%20Luma!%20Gostaria%20de%20tirar%20d%C3%BAvidas%20e%20agendar%20um%20servi%C3%A7o%20m%C3%A1gicko%20conforme%20vi%20nos%20FAQs%20do%20portal."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-mono font-bold text-xs px-5 py-3 rounded-xl transition-all shadow cursor-pointer uppercase"
                  >
                    Falar com a Luma Ravaglia
                  </a>
                </div>
              </div>

              {/* SEÇÃO 3: OBJETIVO E DIRETRIZES DA COMUNIDADE */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Objetivo do Site */}
                <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-3 shadow-md">
                  <div className="flex items-center gap-2 text-amber-500 pb-2 border-b border-slate-800/60">
                    <Compass size={18} />
                    <h3 className="text-xs font-mono font-bold uppercase tracking-wider">
                      🌐 Objetivo do Site
                    </h3>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed font-sans">
                    O TNB NEWS foi criado para ampliar o trabalho da comunidade, oferecendo um espaço seguro para acolhimento, divulgação de campanhas e apoio a pessoas ou animais que realmente necessitem de ajuda.
                  </p>
                  <p className="text-xs text-slate-400 leading-relaxed font-sans">
                    O acesso ao site não é destinado a qualquer finalidade ilegal ou invasiva. Cada campanha ou projeto passa por análise detalhada da redação antes de sua publicação.
                  </p>
                </div>

                {/* Nossa Missão */}
                <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-3 shadow-md">
                  <div className="flex items-center gap-2 text-amber-500 pb-2 border-b border-slate-800/60">
                    <Sparkles size={18} />
                    <h3 className="text-xs font-mono font-bold uppercase tracking-wider">
                      Nossa Missão
                    </h3>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed font-sans">
                    O objetivo do TNB NEWS é acolher, ajudar e conectar pessoas com causas reais de forma justa e transparente.
                  </p>
                  <p className="text-xs text-slate-400 leading-relaxed font-sans">
                    A prioridade da plataforma nunca será lucrar com quem precisa de ajuda, mas sim manter um ambiente organizado, sustentável, e acolhedor para todos.
                  </p>
                </div>
              </div>

              {/* SEÇÃO 4: POLÍTICA DE DIVULGAÇÃO DE CAMPANHAS */}
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
                <h3 className="text-md font-display font-bold text-slate-200 border-b border-slate-800 pb-3">
                  Política de Divulgação de Campanhas
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Membros */}
                  <div className="space-y-2">
                    <h4 className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                      <User size={14} /> Membros da comunidade
                    </h4>
                    <p className="text-xs text-slate-400 leading-relaxed font-sans">
                      Integrantes da comunidade oficial podem solicitar espaço no site sem qualquer cobrança, desde que apresentem um motivo legítimo e compatível com os objetivos da plataforma.
                    </p>
                    <div className="bg-slate-950/40 p-3 rounded-xl space-y-1 text-[11px] text-slate-300">
                      <p><strong>Exemplos de apoio:</strong></p>
                      <ul className="list-disc pl-4 space-y-1 font-sans">
                        <li>Campanhas para ajudar um membro da comunidade em dificuldades financeiras severas.</li>
                        <li>Campanhas solidárias para animais resgatados, arrecadando recursos para alimentação, medicamentos e cuidados médicos.</li>
                      </ul>
                    </div>
                  </div>

                  {/* Pessoas de Fora */}
                  <div className="space-y-2">
                    <h4 className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                      <ExternalLink size={14} /> Pessoas de fora da comunidade
                    </h4>
                    <p className="text-xs text-slate-400 leading-relaxed font-sans">
                      Quem não faz parte da comunidade oficial também poderá solicitar espaço de divulgação no site de forma pontual.
                    </p>
                    <p className="text-xs text-slate-400 leading-relaxed font-sans">
                      Dependendo da complexidade do caso, da necessidade de análise de veracidade ou da ausência de vínculo comunitário, poderá ser cobrada uma taxa de publicação.
                    </p>
                    <p className="text-xs text-slate-400 leading-relaxed font-sans italic">
                      Essa taxa auxilia diretamente na manutenção da infraestrutura, nos servidores e nos custos operacionais da plataforma.
                    </p>
                  </div>
                </div>
              </div>

              {/* SEÇÃO 5: BOTÃO COMUNIDADE WHATSAPP */}
              <div className="bg-gradient-to-r from-emerald-600/10 to-emerald-800/10 border-2 border-emerald-500/30 rounded-3xl p-6 sm:p-8 text-center space-y-4">
                <div className="text-emerald-400 font-mono font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2">
                  <MessageSquare size={16} />
                  💬 Comunidade TNB no WhatsApp
                </div>
                <h4 className="text-md font-display font-bold text-slate-200">
                  Faça parte do nosso círculo oficial de comunicação
                </h4>
                <p className="text-xs text-slate-400 max-w-lg mx-auto font-sans leading-relaxed">
                  Acesse os canais diários para interações rápidas, fofocas esotéricas, tiragens livres e o acolhimento afetuoso de nossa comunidade.
                </p>
                <a
                  href="https://chat.whatsapp.com/B7GdTqcrsFPJ2tNsgMUOnD"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-mono font-bold text-xs px-6 py-3.5 rounded-2xl shadow-lg transition-all cursor-pointer transform hover:scale-102 uppercase"
                >
                  Entrar na comunidade oficial pelo link
                  <ExternalLink size={12} />
                </a>
              </div>

              {/* Alice comenta */}
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 flex items-start gap-3">
                <Terminal size={18} className="text-amber-500 mt-0.5 shrink-0" />
                <p className="text-xs text-amber-200/90 leading-relaxed italic font-sans">
                  <strong>Alice aconselha sobre o bom senso:</strong> "Regras e FAQs existem porque o ser humano é capaz de misturar fofocas amorosas complicadas com leis criminais no mesmo canal de chat às duas da manhã. Vamos ler as regras com carinho!"
                </p>
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

      {/* LEITOR DETALHADO DO ARTIGO EM MODAL (Abre de forma fluida por cima de tudo) */}
      <AnimatePresence>
        {selectedArticle && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md overflow-y-auto">
            {/* Backdrop click closes modal */}
            <div className="absolute inset-0 cursor-pointer" onClick={() => setSelectedArticle(null)} />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
              className="bg-slate-900 border-2 border-amber-500/40 rounded-3xl p-5 sm:p-6 shadow-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto relative z-10 flex flex-col space-y-4 text-slate-100"
            >
              {/* Header do Leitor */}
              <div className="flex justify-between items-start gap-4 pb-4 border-b border-slate-800">
                <div>
                  <span className="text-xs font-mono font-bold text-amber-500 uppercase tracking-widest block mb-1">
                    {selectedArticle.category}
                  </span>
                  <h2 className="text-lg sm:text-xl font-display font-bold text-slate-100 leading-tight">
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

              {/* Scrollable Container for the rest of the modal to prevent outer screen scrolling issues on mobile */}
              <div className="space-y-6 overflow-y-auto pr-1 flex-1">
                {/* Imagem do Leitor */}
                <div className="h-44 sm:h-56 rounded-xl overflow-hidden border border-slate-800 shrink-0">
                  <img 
                    src={selectedArticle.image} 
                    alt={selectedArticle.title}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* Metadados */}
                <div className="flex flex-wrap gap-y-2 justify-between items-center text-xs font-mono text-slate-400 bg-slate-950/60 p-3 rounded-xl border border-slate-800/50">
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
                <div className="text-slate-300 text-xs sm:text-sm leading-relaxed space-y-4 font-sans border-b border-slate-800 pb-4">
                  {selectedArticle.content.split("\n\n").map((para, idx) => (
                    <p key={idx}>{para}</p>
                  ))}
                </div>

                {/* Comentário Exclusivo de Alice */}
                <div className="bg-amber-500/10 border-2 border-amber-500/30 rounded-2xl p-4 relative">
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
                <div className="pt-2 space-y-4">
                  <div className="flex items-center gap-2 text-slate-200 font-display font-bold text-sm">
                    <MessageSquare size={16} className="text-amber-500" />
                    <span>Discussões do Artigo ({commentsList[selectedArticle.id]?.length || 0})</span>
                  </div>

                  {/* Lista de Comentários */}
                  <div className="space-y-3 max-h-48 overflow-y-auto pr-1">
                    {commentsList[selectedArticle.id] && commentsList[selectedArticle.id].length > 0 ? (
                      commentsList[selectedArticle.id].map((comm, i) => (
                        <div key={i} className="bg-slate-950/60 border border-slate-800/80 p-3 rounded-xl space-y-1">
                          <div className="flex justify-between items-center text-[10px] font-mono">
                            <span className="text-amber-500 font-bold flex items-center gap-1">
                              <User size={10} /> {comm.author}
                            </span>
                            <div className="flex items-center gap-2">
                              <span className="text-slate-500">{comm.date}</span>
                              <button
                                type="button"
                                onClick={() => handleReplyMention(comm.author, false)}
                                className="text-amber-500 hover:text-amber-400 font-bold cursor-pointer transition-colors"
                              >
                                Responder
                              </button>
                            </div>
                          </div>
                          <p className="text-xs text-slate-300 font-sans leading-relaxed break-words">
                            {renderCommentText(comm.text)}
                          </p>
                        </div>
                      ))
                    ) : (
                      <p className="text-xs text-slate-500 italic text-center py-2">
                        Ainda não há comentários. Seja o primeiro a participar desta discussão!
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
                        id="article-comment-text-input"
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
          </div>
        )}
      </AnimatePresence>

      {/* COMPONENTE INTERATIVO FLUTUANTE DA ALICE */}
      {isAliceActive && (
        <AliceWidget currentTab={currentTab} onTabChange={setCurrentTab} selectedArticle={selectedArticle} isVideoPlaying={isVideoPlaying} />
      )}

      {/* COMPONENTE INTERATIVO GLOBAL MINI ALICE */}
      {isAliceActive && (
        <MiniAlice currentTab={currentTab} isVideoPlaying={isVideoPlaying} />
      )}

    </div>
  );
}
