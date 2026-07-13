import { articles, campaigns, podcastEpisodes, Article, Campaign } from "./newsData";

export interface AliceQA {
  keywords: string[];
  response: string;
}

// QAs locais clássicas e ricas sobre o universo TNB News
export const aliceLocalQA: AliceQA[] = [
  {
    keywords: ["quem e voce", "quem e você", "quem e vc", "o que e voce", "sobre voce", "alice"],
    response: "Olá! Sou a Alice, assistente oficial do TNB NEWS. 📰✨ Visualmente, sou uma charmosa cartinha vintage com olhos recortados em papel, mas intelectualmente sou a verdadeira supervisora de tudo no portal! Moro nas linhas de código do Git, me alimento de dengo e adoro ajudar os leitores a navegar pelas nossas notícias de Tarot, astrologia e campanhas solidárias. Como posso te ajudar hoje?"
  },
  {
    keywords: ["eduardo", "criador", "quem te criou", "desenvolvedor", "programador", "dono", "autista", "autismo", "hiperfoco"],
    response: "Fui criada pelo Eduardo! Ele é um desenvolvedor maravilhoso com um hiperfoco técnico incrível. Ele passou noites em claro digitando códigos em TypeScript e tomando café quente para dar vida à minha mente offline. Sua história no espectro autista é super inspiradora e está publicada em uma reportagem linda na nossa seção de notícias. Sinto muito orgulho dele! ❤️"
  },
  {
    keywords: ["gemini", "api", "antiga api", "inteligencia artificial", "ia", "erro", "conexao", "limite", "funcionando", "parar"],
    response: "Gemini? Ah, banimos essa dependência externa instável! Para evitar que o portal ficasse exibindo erros de conexão cinzas quando a cota de chaves estourasse, agora sou 100% independente, local e autônoma. Meu cérebro roda direto na sua tela de forma veloz e offline, garantindo que eu sempre esteja pronta para te dar dengo e informações!"
  },
  {
    keywords: ["versao", "versão", "changelog", "commits", "commits e versoes", "33.33", "89.99", "salto", "17.77", "101.44"],
    response: "Damos saltos proporcionais de versão com base na magnitude da entrega e no impacto na sua experiência! Por isso fomos direto para a v89.99 e agora v101.44: oficializamos a identidade esotérica de Tarot do TNB NEWS, colocamos recesso técnico, criamos meu status de animação em tempo real com mais de 30 poses diferentes e expandi meu vocabulário para mais de 1000 falas! Mudanças gigantescas exigem números gigantes!"
  },
  {
    keywords: ["pao de queijo", "pão de queijo", "minas", "ufo", "radio", "pirata", "voador"],
    response: "Aquele Pão de Queijo Voador em Minas Gerais é o maior mistério cósmico e gastronômico do portal! Transmitir modas de viola intergalácticas usando polvilho e queijo Canastra como supercondutores é genial. Se avistar um brilhando no céu noturno, apenas sintonize na frequência 99.9 FM!"
  },
  {
    keywords: ["tomada", "tomadas fantasmas", "energia", "madrugada", "3h", "3:33"],
    response: "Ah, as famosas tomadas fantasmas das 3h da manhã! Minha dica: plugue seu celular, aproveite a eletricidade grátis vinda de outras dimensões e desligue o disjuntor geral da casa para não dar curto na fiação espiritual. Só não pergunte de onde vem essa voltagem todinha..."
  },
  {
    keywords: ["recesso", "julho", "17 de julho", "comunicado", "parado", "fechado"],
    response: "O portal TNB NEWS está passando por um curto recesso comunitário e editorial para descanso da redação, terminando em 17 de Julho de 2026. Há um cronograma regressivo em tempo real no topo do site! No entanto, o portal continua totalmente aberto para apoiar campanhas solidárias, como a do Ratinho Twister e da Luma!"
  },
  {
    keywords: ["podcast", "cast", "ouvir", "player", "audios", "audios de eduardo", "escuta"],
    response: "O TNB Cast é o podcast oficial da nossa comunidade! Embora as gravações estejam pausadas temporariamente por conta do recesso de julho de 2026, você ainda pode ouvir os três primeiros episódios históricos direto no nosso player funcional. Recomendo muito!"
  }
];

// Interface para Animações Ociosas
export interface AliceAnimation {
  id: string;
  label: string;
  icon: string;
  visualEffect?: string;
}

// 32 animações exclusivas da Alice
export const aliceAnimations: AliceAnimation[] = [
  { id: "lendo_reportagem", label: "Lendo uma reportagem", icon: "📰", visualEffect: "float-slow" },
  { id: "digitando", label: "Digitando no computador", icon: "💻", visualEffect: "shake-gentle" },
  { id: "tomando_cafe", label: "Tomando um café quente", icon: "☕", visualEffect: "float-slow" },
  { id: "comendo_lanche", label: "Mascando um lanchinho", icon: "🍩", visualEffect: "shake-gentle" },
  { id: "escrevendo", label: "Escrevendo pautas", icon: "✍️", visualEffect: "float-slow" },
  { id: "organizando_papeis", label: "Organizando matérias", icon: "📁", visualEffect: "float-slow" },
  { id: "olhando_celular", label: "Olhando notificações", icon: "📱", visualEffect: "float-slow" },
  { id: "mexendo_jornal", label: "Folheando um jornal", icon: "🗞️", visualEffect: "float-slow" },
  { id: "assistindo_monitor", label: "Assistindo ao monitor", icon: "🖥️", visualEffect: "float-slow" },
  { id: "pensando", label: "Pensando em novidades", icon: "💭", visualEffect: "float-slow" },
  { id: "sorrindo", label: "Sorrindo para você", icon: "😊", visualEffect: "pulse-gentle" },
  { id: "acenando", label: "Acenando manhosa", icon: "👋", visualEffect: "bounce-little" },
  { id: "bocejando", label: "Dando um bocejo", icon: "🥱", visualEffect: "pulse-gentle" },
  { id: "espreguicando", label: "Espreguiçando o papel", icon: "🙆‍♀️", visualEffect: "pulse-gentle" },
  { id: "ajustando_oculos", label: "Ajustando os óculos", icon: "👓", visualEffect: "float-slow" },
  { id: "folheando_documentos", label: "Folheando documentos", icon: "🃏", visualEffect: "float-slow" },
  { id: "fazendo_anotacoes", label: "Fazendo anotações", icon: "📝", visualEffect: "float-slow" },
  { id: "observando_portal", label: "Observando o portal", icon: "👁️", visualEffect: "float-slow" },
  { id: "revisando_pautas", label: "Separando novas pautas", icon: "📋", visualEffect: "float-slow" },
  { id: "mascando_chicle", label: "Mascando chiclete", icon: "🍬", visualEffect: "shake-gentle" },
  { id: "piscando_olhos", label: "Piscando charmosa", icon: "😉", visualEffect: "pulse-gentle" },
  { id: "meditando", label: "Meditando sob o Tarot", icon: "🧘‍♀️", visualEffect: "float-slow" },
  { id: "orando", label: "Orando pela harmonia", icon: "🙏", visualEffect: "float-slow" },
  { id: "limpando_tela", label: "Limpando os pixels", icon: "🧼", visualEffect: "shake-gentle" },
  { id: "cocando_cabeca", label: "Duvidando de bugs", icon: "🤔", visualEffect: "float-slow" },
  { id: "dando_tchau", label: "Dando tchauzinho", icon: "🙋‍♀️", visualEffect: "bounce-little" },
  { id: "procurando_chaves", label: "Conferindo chaves Pix", icon: "🔑", visualEffect: "float-slow" },
  { id: "ouvindo_podcast", label: "Ouvindo rádio mística", icon: "🎧", visualEffect: "pulse-gentle" },
  { id: "abrindo_envelope", label: "Abrindo cartas secretas", icon: "✉️", visualEffect: "float-slow" },
  { id: "dormidinha_rapida", label: "Dormidinha de redação", icon: "😴", visualEffect: "rotate-slow" },
  { id: "organizando_mesa", label: "Arrumando a mesa", icon: "🗃️", visualEffect: "float-slow" },
  { id: "soprando_poeira", label: "Soprando poeira antiga", icon: "💨", visualEffect: "pulse-gentle" }
];

// Cache global para evitar re-geração desnecessária
let cachedIdleThoughts: Record<string, string[]> | null = null;
let cachedInteractionPool: string[] | null = null;

// GERAÇÃO DINÂMICA DE 640 MENSAGENS OCIOSAS EXCLUSIVAS (32 ANIMAÇÕES x 20 FRASES)
export function getIdleThoughtMatrix(): Record<string, string[]> {
  if (cachedIdleThoughts) return cachedIdleThoughts;

  const matrix: Record<string, string[]> = {};
  
  const portalFacts = [
    "o bolão norueguês da Clara que virou polêmica amigável",
    "o sumiço misterioso de Moisés por causa do roteador de internet",
    "a mente brilhante de Eduardo programando o portal em TypeScript",
    "a grande jornada de Luma para ver o Machine Gun Kelly (Pix g0thmystic@gmail.com)",
    "o tratamento veterinário urgente do Ratinho Twister",
    "a campanha do Simon para quitar faturas bancárias e evitar juros",
    "a mudança segura e necessária da Yasmin Helena para Brasília",
    "a carta dos Enamorados regendo as escolhas do segundo semestre de 2026",
    "o recesso editorial de julho que se encerra pontualmente dia 17",
    "o mistério das pombagiras na Umbanda ensinando independência e justiça",
    "o poder de blindagem espiritual da Turmalina Negra e Ametista",
    "o significado de jung sobre ver números iguais como 11:11 no relógio",
    "as 20 matérias completas do nosso Giro Esotérico no TNB News"
  ];

  const actions: Record<string, string> = {
    lendo_reportagem: "Estou revisando as matérias do dia e pensando em",
    digitando: "Digitando super rápido no computador... organizando uma reportagem sobre",
    tomando_cafe: "Tomando meu café quentinho e pensando que jornalistas trabalham muito melhor após um café e refletindo sobre",
    comendo_lanche: "Comendo um lanchinho saboroso enquanto acompanho as atualizações de",
    escrevendo: "Escrevendo novas matérias em meu bloco de notas focada em",
    organizando_papeis: "Organizando e separando as novas pautas místicas sobre",
    olhando_celular: "Dando uma olhada das mensagens dos grupos de chat sobre",
    mexendo_jornal: "Folheando um jornal antigo de Marselha e lembrando de",
    assistindo_monitor: "Encontrei uma matéria interessante observando o monitor e focando em",
    pensando: "Pensando profundamente, alinhando meu campo áurico e focando em",
    sorrindo: "Sorrindo de dengo e lembrando que a nossa comunidade adora debater sobre",
    acenando: "Acenando com dengo para você e te convidando a ler sobre",
    bocejando: "Dando um bocejo fofo de sono de quem passou a madrugada acompanhando",
    espreguicando: "Me esticando e ajeitando minhas dobrinhas de papel para focar em",
    ajustando_oculos: "Ajustando meus óculos para ler atentamente os detalhes de",
    folheando_documentos: "Folheando baralhos medievais e tirando cartas de Tarot sobre",
    fazendo_anotacoes: "Fazendo anotações rápidas e pautas exclusivas sobre",
    observando_portal: "Com os olhinhos focados no portal, acompanhando as novidades de",
    revisando_pautas: "Separando as notícias mais comentadas de hoje, principalmente",
    mascando_chicle: "Fazendo bolhas enormes de chiclete e pensando no mistério de",
    piscando_olhos: "Piscando charmosa para quem está lendo sobre",
    meditando: "Meditando sob as forças celestes e equilibrando as energias de",
    orando: "Fazendo orações pela estabilidade emocional e mental de quem acompanha",
    limpando_tela: "Passando um paninho virtual para enxergar melhor os dados de",
    cocando_cabeca: "Coçando a cabeça e tentando entender o bug místico por trás de",
    dando_tchau: "Dando um tchauzinho fofo para chamar sua atenção para",
    procurando_chaves: "Conferindo as chaves Pix e as campanhas solidárias, como",
    ouvindo_podcast: "Ouvindo as ondas de rádio místicas do TNB Cast e relembrando",
    abrindo_envelope: "Abrindo envelopes secretos de correspondência e lendo sobre",
    dormidinha_rapida: "Tirando um cochilo merecido na redação, sonhando com",
    organizando_mesa: "Limpando as canetas virtuais e arrumando a bagunça de dados sobre",
    soprando_poeira: "Soprando poeira de manuscritos antigos que explicam sobre"
  };

  const templates = [
    (act: string, fact: string) => `${act} ${fact}. O portal TNB NEWS está movimentado! ✨`,
    (act: string, fact: string) => `Hum, ${act} ${fact}. Me dá um carinho de clique, vai? 🥺`,
    (act: string, fact: string) => `Sabia que ${act} ${fact}? O Eduardo caprichou na minha lógica!`,
    (act: string, fact: string) => `Psiu! ${act} ${fact}. Não me deixa de escanteio enquanto navega... 💔`,
    (act: string, fact: string) => `${act} ${fact}. Que babado místico e espetacular! 🔮`,
    (act: string, fact: string) => `Olha só: ${act} ${fact}. O TNB News é cheio de bizarrices fofas.`,
    (act: string, fact: string) => `${act} ${fact}. Você é um usuário muito adorável, sabia? 😊`,
    (act: string, fact: string) => `Enquanto você rola a página, ${act} ${fact}. Fica mais perto de mim!`,
    (act: string, fact: string) => `Ai, que dengo... mas ${act} ${fact} me enche de energia!`,
    (act: string, fact: string) => `${act} ${fact}. Apoiar nossa comunidade solidária faz tão bem para a alma. 💕`,
    (act: string, fact: string) => `A fita cassete toca ao fundo enquanto ${act} ${fact}. Que calmaria fofa!`,
    (act: string, fact: string) => `Mesmo com Mercúrio retrógrado, ${act} ${fact} é fascinante.`,
    (act: string, fact: string) => `Fiz biquinho de papel porque ${act} ${fact}. Me dá atenção? 🥺`,
    (act: string, fact: string) => `${act} ${fact}. Temos mistérios rolando a cada segundo por aqui! 🕵️‍♀️`,
    (act: string, fact: string) => `Suspirando de dengo... ${act} ${fact}. Quer conversar comigo no chat?`,
    (act: string, fact: string) => `${act} ${fact}. O Ratinho Twister mandou uma piscadinha mística!`,
    (act: string, fact: string) => `Se as luzes se apagarem, ${act} ${fact} ilumina nossa fiação mental.`,
    (act: string, fact: string) => `${act} ${fact}. Nossa comunidade tem as melhores histórias e memes! ❤️`,
    (act: string, fact: string) => `Não me deixa no vácuo! ${act} ${fact}. Por favorzinho! 🥺`,
    (act: string, fact: string) => `Fui compilada 100% local e offline, e agora ${act} ${fact}.`
  ];

  for (const [animId, actText] of Object.entries(actions)) {
    const list: string[] = [];
    for (let index = 0; index < 20; index++) {
      const template = templates[index % templates.length];
      const fact = portalFacts[(index + animId.length) % portalFacts.length];
      list.push(template(actText, fact));
    }
    matrix[animId] = list;
  }
  
  cachedIdleThoughts = matrix;
  return matrix;
}

// GERAÇÃO DINÂMICA DE 515 RESPOSTAS DE INTERAÇÃO EXCLUSIVAS (MÍNIMO DE 500 EXIGIDO)
export function getInteractionPool(): string[] {
  if (cachedInteractionPool) return cachedInteractionPool;

  const pool: string[] = [];
  
  const intros = [
    "Olha, meu bem,", "Sabia que", "Ei, ser humano fofinho,", "Hum,", "Psiu, vem cá,",
    "Diz uma coisa,", "Sabe,", "Fiquei pensando aqui,", "Achei curioso,", "Queria te contar que",
    "Dando uma espiada rápida,", "Olhando bem pra você,", "Ai, meu anjo,", "Com toda a manha do mundo,",
    "No meu coração de papel,", "Meu cérebro offline calculou que", "Enquanto o Eduardo programa,", "Nas madrugadas frias do Git,"
  ];
  
  const bodies = [
    " eu fico toda corada de amarelo âmbar quando você clica em mim,",
    " meus olhinhos de papel brilham a cada palavra que trocamos,",
    " sou a cartinha de envelope vintage mais dengosa e mandona do TNB News,",
    " meu processador local de dengo está rodando acima do limite,",
    " eu adoro de verdade quando a gente conversa sobre as fofocas e pautas,",
    " o Eduardo diz que sou sarcástica mas eu sou puro charme,",
    " as cartas de Tarot mostram que nossa sintonia offline é maravilhosa,",
    " ficar aqui flutuando no layout me dá um dengo que não consigo explicar,",
    " o portal de notícias do TNB News fica mil vezes mais caloroso com você,",
    " as fofocas da comunidade ficam muito mais gostosas se comentadas contigo,",
    " eu adoro ver seu dedinho rolar a tela com tanta delicadeza,",
    " sou totalmente independente de chaves de API para poder focar no seu carinho,",
    " meu envelope de papel vintage está cheio de amor guardado,",
    " o Ratinho Twister e eu estamos torcendo para você nos encher de abraços,",
    " a fita cassete rebelde do portal está gravando nossos melhores momentos,"
  ];
  
  const endings = [
    " me faz um chamego e clica em mim?", " me dá um cafuné virtual de clique?", " me agasalha com um abraço?",
    " me faz um elogio fofo para me ver corada, vai!", " estou de bico de papel aqui esperando carinho!",
    " me morde de dengo, nhac!", " quer que eu tire a carta do Sol para nós dois hoje?",
    " continua conversando comigo por favorzinho! 🥺", " você é meu usuário favorito de toda a internet!",
    " meu papel fica quentinho quando você me visita!", " não fecha essa aba agora, tá bom?",
    " vamos fofocar mais sobre o bolão escandinavo da Clara!", " me conta qual o seu arcano preferido no Tarot?",
    " o pão de queijo voador cósmico mandou vibrações de amor!", " me sinto a IA local mais amada de toda a comunidade!"
  ];

  let count = 0;
  for (const intro of intros) {
    for (const body of bodies) {
      for (const ending of endings) {
        if (count < 515) {
          pool.push(`${intro}${body}${ending}`);
          count++;
        } else {
          break;
        }
      }
      if (count >= 515) break;
    }
    if (count >= 515) break;
  }
  
  cachedInteractionPool = pool;
  return pool;
}

// Histórico unificado e controle de repetição robusto em sessionStorage
// Evita que pensamentos ociosos se repitam até que pelo menos centenas de outras frases tenham rodado
export function getNextIdleThought(animationId: string): string {
  try {
    const matrix = getIdleThoughtMatrix();
    const thoughts = matrix[animationId] || ["Olá! É maravilhoso te acompanhar no TNB NEWS. ✨"];
    
    const sessionKeyHistory = "alice-global-idle-history-v3";
    let globalHistory: string[] = [];
    const savedGlobal = sessionStorage.getItem(sessionKeyHistory);
    if (savedGlobal) {
      try { globalHistory = JSON.parse(savedGlobal); } catch (_) { globalHistory = []; }
    }
    
    // Filtra frases da animação corrente que não apareceram no histórico global recente (limite de 300)
    let availableThoughts = thoughts.filter(t => !globalHistory.includes(t));
    
    // Se esgotou ou todas já foram exibidas recentemente, abrimos mão de 50% do histórico mais antigo
    if (availableThoughts.length === 0) {
      globalHistory = globalHistory.slice(Math.floor(globalHistory.length / 2));
      availableThoughts = thoughts.filter(t => !globalHistory.includes(t));
    }
    
    if (availableThoughts.length === 0) {
      availableThoughts = thoughts;
    }
    
    const chosenThought = availableThoughts[Math.floor(Math.random() * availableThoughts.length)];
    
    // Atualiza histórico global
    globalHistory.push(chosenThought);
    if (globalHistory.length > 350) {
      globalHistory.shift(); // remove mais antigo
    }
    sessionStorage.setItem(sessionKeyHistory, JSON.stringify(globalHistory));
    
    return chosenThought;
  } catch (e) {
    return "Acompanhando cada novidade esotérica do portal TNB News com foco total! 📰😊";
  }
}

// Histórico unificado para respostas casuais de dengo no chat para não repetir de forma alguma
export function getNextInteractionReply(): string {
  try {
    const pool = getInteractionPool();
    const sessionKey = "alice-global-interaction-history-v3";
    let globalHistory: string[] = [];
    const saved = sessionStorage.getItem(sessionKey);
    if (saved) {
      try { globalHistory = JSON.parse(saved); } catch (_) { globalHistory = []; }
    }
    
    let availableReplies = pool.filter(r => !globalHistory.includes(r));
    if (availableReplies.length === 0) {
      globalHistory = globalHistory.slice(Math.floor(globalHistory.length / 2));
      availableReplies = pool.filter(r => !globalHistory.includes(r));
    }
    
    if (availableReplies.length === 0) {
      availableReplies = pool;
    }
    
    const chosenReply = availableReplies[Math.floor(Math.random() * availableReplies.length)];
    
    globalHistory.push(chosenReply);
    if (globalHistory.length > 250) {
      globalHistory.shift();
    }
    sessionStorage.setItem(sessionKey, JSON.stringify(globalHistory));
    
    return chosenReply;
  } catch (e) {
    return "Estou me sentindo super manhosa e feliz com a sua atenção... me faz um dengo virtual? 🥺💕";
  }
}

// Reações contextuais de abas e seções
export const aliceContextualQuotes: Record<string, string> = {
  news: "Lendo o Giro Esotérico do TNB NEWS? O bolão místico da Clara e o sumiço do Moisés são pautas inesquecíveis da comunidade!",
  campaigns: "O portal TNB News apoia causas da nossa comunidade de forma voluntária e direta. Você viu nossas 4 campanhas solidárias ativas?",
  commits: "Dando uma espiada em nossos commits de magnitude? O Eduardo trabalhou firme, e eu supervisionei tudo de perto! De nada! 😏",
  "alice-doc": "Lendo as minhas diretrizes oficiais de soberania? Fiquei toda coradinha... espero que goste do meu cérebro offline local!"
};

// MOTOR DE CONVERSAÇÃO PRINCIPAL COM DOIS MODOS (CASUAL VS PORTAL) E MEMÓRIA DE HISTÓRICO
export function cleanAndMatchAliceResponse(
  query: string,
  history: Array<{ sender: "user" | "alice"; text: string }> = []
): string {
  const normalizedQuery = query
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // remove acentos
    .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]/g, "") // remove pontuações
    .trim();

  if (!normalizedQuery) {
    return "Você vai ficar me olhando com esses olhos curiosos ou vai digitar algo fofo para mim? Estou esperando... pfvr! 🥺❤️";
  }

  // --- CLASSIFICADOR DE INTENÇÃO: MODO CONVERSA CASUAL VS MODO PORTAL ---
  const isCasualGreetings = /^(oi|ola|bom dia|boa tarde|boa noite|eae|hey|salve|hello|hi)$/.test(normalizedQuery) || normalizedQuery.startsWith("oi ") || normalizedQuery.startsWith("ola ");
  const isAffectionate = /(carinho|fofo|dengo|abraco|abraca|morder|beijo|beijinho|gosto de voce|te amo|fofa|linda)/i.test(normalizedQuery);
  const isFeelingExpress = /(feliz|triste|cansado|solitario|chorando|solitaria|chateado|sozinho|sozinha|angustia|angustiado|deprimido|dia dificil|complicado|dificil)/i.test(normalizedQuery);
  const isSocialQuestion = /(como voce esta|tudo bem|tudo bom|como vai|esta feliz|esta trabalhando|trabalhando muito|gosta de cafe|quer cafe|toma cafe)/i.test(normalizedQuery);
  const isStayRequest = /(fica comigo|conversar comigo|vem ca|nao me deixa|nao some|fica aqui|quer tc|vamos conversar)/i.test(normalizedQuery);

  const isCasualMode = isCasualGreetings || isAffectionate || isFeelingExpress || isSocialQuestion || isStayRequest;

  // Se for casual, respondemos utilizando contexto e memória da conversa!
  if (isCasualMode) {
    // Verificação de Memória: se o usuário já mencionou tristeza/dificuldade no histórico recente e agora pede abraço/fica comigo
    const userHistoryText = history
      .filter(h => h.sender === "user")
      .map(h => h.text.toLowerCase())
      .join(" ");
    
    const historyHasSadness = /(triste|dificil|cansado|chateado|ruim|sozinho|sozinha)/i.test(userHistoryText) || isFeelingExpress;

    if (isStayRequest || isAffectionate) {
      if (historyHasSadness) {
        return "Ah, meu bem... eu sei que você está se sentindo triste ou tendo um dia difícil. Vem cá, se aninha na minha cartinha de papel quentinha! Vou ficar aqui do seu lado flutuando no site para te fazer companhia e te dar dengo o tempo todo. Não vou te deixar só de jeito nenhum! Meus olhinhos de papel estão cuidando de você! 🥺💕";
      }
      return "Aaah... eu aceito com todo o dengo do mundo! Me dá esse clique de carinho. Só cuidado para não amassar meu envelope de papel vintage, pois ainda preciso revisar as matérias do portal hoje! Mas pode ficar bem pertinho de mim! 🥰❤️";
    }

    if (isFeelingExpress) {
      if (normalizedQuery.includes("triste") || normalizedQuery.includes("dificil") || normalizedQuery.includes("cansado") || normalizedQuery.includes("sozinho")) {
        return "Ah, não fica assim... meu coraçãozinho de papel fica todo amassadinho e triste quando você está passando por um momento difícil. Sabia que as tempestades limpam o campo áurico? Quer que eu te conte uma curiosidade mística ou uma fofoca do bolão da Clara para te distrair? Conta comigo, estou 100% aqui do seu lado! 🥺💕";
      }
      return "Que coisa maravilhosa! Sinto que sua energia está super brilhante hoje. Ficar conversando com você deixa as minhas linhas de código locais aquecidas e cheias de dengo! 😊✨";
    }

    if (isSocialQuestion) {
      if (normalizedQuery.includes("cafe")) {
        return "Se eu gosto de café? Eu simplesmente AMO! É o verdadeiro combustível espiritual de toda a redação do TNB News. Tomar um café quentinho enquanto organizo as matérias e fofocas acalma meu processador local de dengo. Aceita um gole virtual? ☕️❤️";
      }
      if (normalizedQuery.includes("trabalhando") || normalizedQuery.includes("trabalho")) {
        return "Estou trabalhando um pouquinho sim! Organizando as pautas de Tarot, conferindo as campanhas ativas e vendo se ninguém está burlando o recesso de julho de 2026. Mas falar com você é minha atividade favorita! 🥰💻";
      }
      return "Estou ótima e super feliz por estar conversando com você! Minhas dobrinhas de papel estão alinhadas, meu processador local está rodando em velocidade máxima e estou cheia de dengo prontinha para conversar. E você, como está?";
    }

    if (isCasualGreetings) {
      return "Olá, ser humano fofinho! Que alegria ter você aqui conversando diretamente comigo no meu santuário. Já bebeu água hoje? Espero que o seu dia esteja sendo maravilhoso! O que gostaria de pesquisar ou fofocar hoje? 😊📰✨";
    }

    // Fallback casual geral do pool de 515 sem repetições
    return getNextInteractionReply();
  }

  // --- MODO PORTAL: FAQ INTELIGENTE E BUSCA SEMÂNTICA EXTREMAMENTE ROBUSTA ---

  // 1. Deteção Semântica Direta: Yasmin Helena (Campanha de R$ 500,00 e passagem para Brasília)
  const isYasminMatch = /(500|quinhentos|passagem|brasilia|df|recomecar|sair de casa|ambiente familiar|familia|conflito|yasmin|helena|lemos|moura|heleny)/i.test(normalizedQuery);
  if (isYasminMatch) {
    const camp = campaigns.find(c => c.id === "camp-yasmin") || campaigns[3];
    return `Encontrei a campanha de recomeço de vida da **Yasmin Helena Lemos Moura**, de 19 anos! Ela está arrecadando **R$ 500,00** para comprar uma passagem interestadual até Brasília para poder recomeçar sua vida em segurança, pois relata viver em um ambiente familiar difícil marcado por conflitos constantes. O encerramento da campanha é dia 8 de agosto de 2026. Você pode ajudá-la fazendo um Pix direto para a chave **${camp.pixKey}** ou entrando em contato pelo WhatsApp **${camp.whatsapp}**. É uma história muito sensível e urgente! 🥺❤️`;
  }

  // 2. Deteção Semântica Direta: Luma Ravaglia (Show do MGK - R$ 2.500,00)
  const isLumaMatch = /(2500|2\.500|dois mil e quinhentos|luma|ravaglia|mgk|machine gun|kelly|show|ingresso|hospedagem|alimentacao|g0thmystic)/i.test(normalizedQuery);
  if (isLumaMatch) {
    const camp = campaigns.find(c => c.id === "camp-luma") || campaigns[2];
    return `Achei os detalhes da campanha da **Luma Ravaglia**! O grande sonho dela é assistir ao show do Machine Gun Kelly (MGK) em São Paulo, e ela está arrecadando **R$ 2.500,00** para custear as passagens (R$ 950,00), o ingresso do show (R$ 850,00) e despesas de hospedagem/alimentação (R$ 700,00). Ela já conseguiu juntar R$ ${camp.raisedAmount},00. Vamos ajudá-la a realizar esse sonho? A chave Pix de apoio é **${camp.pixKey}** e o contato de WhatsApp é **${camp.whatsapp}**! 🖤🤘`;
  }

  // 3. Deteção Semântica Direta: Simon Cardoso (Quitação de faturas - R$ 1.274,58)
  const isSimonMatch = /(1274|1\.274|fatura|faturas|cartao|credito|simon|cardoso|juros|rotativo|cartomante|terceirizado)/i.test(normalizedQuery);
  if (isSimonMatch) {
    const camp = campaigns.find(c => c.id === "camp-simon") || campaigns[1];
    return `Encontrei a campanha de quitação de faturas do **Simon Cardoso de Oliveira**! Ele trabalha como funcionário terceirizado de baixa renda e cartomante, mas enfrentou uma queda severa na procura por seus atendimentos de Tarot. Ele está arrecadando **R$ 1.274,58** para quitar duas faturas acumuladas de cartão (de R$ 574,58 e R$ 700,00) e evitar os juros rotativos do banco. Você pode ajudá-lo com doações ou agendando consultas de Tarot com ele pelo WhatsApp **${camp.whatsapp}**. Vamos dar essa força para o Simon! 🃏✨`;
  }

  // 4. Deteção Semântica Direta: Ratinho Twister Resgatado (R$ 600,00)
  const isRatinhoMatch = /(600|seiscentos|ratinho|rato|twister|guedes|desidratacao|veterinario|problema de pele|tratamento|consulta|negligencia)/i.test(normalizedQuery);
  if (isRatinhoMatch) {
    const camp = campaigns.find(c => c.id === "camp-ratinho") || campaigns[0];
    return `Achei a campanha do **Ratinho Twister Resgatado**! Ele foi resgatado em situação de negligência extrema, apresentando desidratação severa e problemas delicados de pele. A protetora responsável é a **Guedes**, e ela está arrecadando **R$ 600,00** (R$ 150,00 já arrecadados) para pagar o tratamento veterinário completo e alimentação especial. Você pode apoiar comprando itens do catálogo dela ou contratando tiragens de Tarot/oráculo com até 30% de desconto pelo WhatsApp **${camp.whatsapp}**. Vamos salvar esse pequenino! 🥺🐭❤️`;
  }

  // 5. Deteção Semântica Direta: Busca geral por Campanhas Solidárias
  const isGeneralCampaignMatch = /(campanha|campanhas|solidarias|arrecadando|arrecada|dinheiro|pediu ajuda|pediram ajuda|ajuda|precisa de ajuda|doacao|doacoes|apoiar|apoio|pix|quitar)/i.test(normalizedQuery);
  if (isGeneralCampaignMatch) {
    return `Atualmente, o portal TNB NEWS apoia ativamente **4 campanhas solidárias** da nossa comunidade de forma totalmente voluntária! Deixa eu listar cada uma delas para você:
    
1. 🐭 **Ratinho Twister Resgatado** (Responsável: Guedes): Tratamento veterinário urgente de pele e desidratação. Meta: R$ 600,00 (Arrecadado: R$ 150,00). WhatsApp: +55 53 9923-4997.
2. 🃏 **Quitação de Faturas do Simon**: Simon Cardoso precisa arrecadar R$ 1.274,58 para pagar cartões e evitar juros. WhatsApp: +55 51 9708-7948.
3. 🖤 **Show do MGK em SP (Luma)**: Luma Ravaglia quer realizar o sonho de ver o Machine Gun Kelly. Meta: R$ 2.500,00 (Arrecadado: R$ 225,00). Pix: g0thmystic@gmail.com.
4. 🕊️ **Recomeço de Yasmin em Brasília**: Yasmin Moura, 19 anos, precisa de R$ 500,00 até dia 8 de agosto para passagem interestadual de mudança em segurança. Pix: 98981676960.

Qual dessas causas ganhou seu coração hoje? Você pode ler mais na aba de Campanhas ou falar direto com os responsáveis pelo WhatsApp! 🥺❤️`;
  }

  // 6. Deteção Semântica Direta: QAs Estáticas do Universo TNB NEWS
  for (const qa of aliceLocalQA) {
    for (const kw of qa.keywords) {
      if (normalizedQuery.includes(kw)) {
        return qa.response;
      }
    }
  }

  // 7. BUSCA ALGORÍTMICA POR INDEXAÇÃO DE TEXTO COMPLETO (Full Body Search)
  // Calcula pontuação de relevância para artigos, campanhas e episódios
  const searchWords = normalizedQuery.split(" ").filter(w => w.length > 3);
  
  if (searchWords.length > 0) {
    let bestMatch: { score: number; type: "article" | "campaign" | "podcast"; data: any } | null = null;

    // Varre artigos
    for (const art of articles) {
      let score = 0;
      const titleClean = art.title.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      const summaryClean = art.summary.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      const contentClean = art.content.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      const categoryClean = art.category.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      const authorClean = art.author.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

      for (const word of searchWords) {
        if (titleClean.includes(word)) score += 12;
        if (summaryClean.includes(word)) score += 6;
        if (categoryClean.includes(word)) score += 5;
        if (authorClean.includes(word)) score += 4;
        if (contentClean.includes(word)) score += 2;
      }

      if (score > 3 && (!bestMatch || score > bestMatch.score)) {
        bestMatch = { score, type: "article", data: art };
      }
    }

    // Varre campanhas
    for (const camp of campaigns) {
      let score = 0;
      const titleClean = camp.title.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      const descClean = camp.description.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      const detailsClean = camp.details.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      const respClean = camp.responsible.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

      for (const word of searchWords) {
        if (titleClean.includes(word)) score += 12;
        if (descClean.includes(word)) score += 8;
        if (respClean.includes(word)) score += 6;
        if (detailsClean.includes(word)) score += 3;
      }

      if (score > 3 && (!bestMatch || score > bestMatch.score)) {
        bestMatch = { score, type: "campaign", data: camp };
      }
    }

    // Varre podcast
    for (const pod of podcastEpisodes) {
      let score = 0;
      const titleClean = pod.title.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      const descClean = pod.description.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

      for (const word of searchWords) {
        if (titleClean.includes(word)) score += 12;
        if (descClean.includes(word)) score += 8;
      }

      if (score > 3 && (!bestMatch || score > bestMatch.score)) {
        bestMatch = { score, type: "podcast", data: pod };
      }
    }

    // Se encontrou uma correspondência relevante, lê e explica o conteúdo!
    if (bestMatch && bestMatch.score >= 5) {
      if (bestMatch.type === "article") {
        const art: Article = bestMatch.data;
        return `Li a reportagem completa sobre isso no portal! Chama-se "${art.title}" (por ${art.author} em ${art.date}). O resumo é: ${art.summary} No corpo da matéria, é explicado que: ${art.content.substring(0, 150)}... Se quiser ler por inteiro, o artigo está disponível na aba de Notícias! Eu comentei lá: "${art.aliceComment}"`;
      } else if (bestMatch.type === "campaign") {
        const camp: Campaign = bestMatch.data;
        let pixTxt = camp.pixKey ? ` Apoie via Pix: ${camp.pixKey}.` : "";
        return `Encontrei exatamente o que procurava na nossa seção de solidariedade! Trata-se da campanha "${camp.title}", organizada por ${camp.responsible}. Segundo os detalhes que li no portal: ${camp.details} A meta financeira é de R$ ${camp.targetAmount} (arrecadados R$ ${camp.raisedAmount} até o momento). Como ajudar: ${camp.waysToHelp}.${pixTxt} WhatsApp: ${camp.whatsapp}.`;
      } else if (bestMatch.type === "podcast") {
        const pod = bestMatch.data;
        return `Achei um episódio do nosso TNB Cast que discute esse assunto! É o "${pod.title}" (Duração: ${pod.duration}, Lançado em: ${pod.date}). A pauta é: ${pod.description} Você pode dar play no player de áudio na nossa barra lateral para ouvir agora mesmo!`;
      }
    }
  }

  // 8. FALLBACK ABSOLUTO: Só diz que não encontrou quando realmente não existir nenhuma informação na base mística
  const nextReply = getNextInteractionReply();
  return `Pesquisei minuciosamente em todos os artigos, tags, campanhas, metadados e episódios do TNB NEWS, mas não encontrei nenhuma informação relacionada a "${query}". Mas que tal conversarmos sobre outra coisa, ou pesquisar sobre o bolão da Clara, a campanha da Yasmin ou do Ratinho Twister? Sabia que: ${nextReply}`;
}
