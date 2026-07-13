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

// 70 animações e brincadeiras exclusivas da Alice
export const aliceAnimations: AliceAnimation[] = [
  { id: "caminhar_topo", label: "Caminhando pelo topo do site", icon: "🚶‍♀️", visualEffect: "float-slow" },
  { id: "sentar_descansar", label: "Sentando para descansar", icon: "🧎‍♀️", visualEffect: "pulse-gentle" },
  { id: "alongar_bracos", label: "Alongando os braços", icon: "🙆‍♀️", visualEffect: "pulse-gentle" },
  { id: "bocejar", label: "Bocejando de sono", icon: "🥱", visualEffect: "pulse-gentle" },
  { id: "tomar_cafe", label: "Tomando um café imaginário", icon: "☕", visualEffect: "float-slow" },
  { id: "ler_reportagem", label: "Lendo uma reportagem", icon: "📰", visualEffect: "float-slow" },
  { id: "folhear_jornal", label: "Folheando um jornal", icon: "🗞️", visualEffect: "float-slow" },
  { id: "escrever_noticia", label: "Escrevendo uma notícia", icon: "✍️", visualEffect: "float-slow" },
  { id: "tirar_foto", label: "Tirando uma foto imaginária", icon: "📸", visualEffect: "bounce-little" },
  { id: "ajustar_oculos", label: "Ajustando seus óculos", icon: "👓", visualEffect: "float-slow" },
  { id: "procurar_lanterna", label: "Procurando algo com uma lanterna", icon: "🔦", visualEffect: "shake-gentle" },
  { id: "fazer_reverencia", label: "Fazendo uma reverência", icon: "🙇‍♀️", visualEffect: "pulse-gentle" },
  { id: "acenar_usuario", label: "Acenando para você", icon: "👋", visualEffect: "bounce-little" },
  { id: "cumprimentar_lucy", label: "Cumprimentando Mini Lucy", icon: "🙌", visualEffect: "bounce-little" },
  { id: "abracar_lucy", label: "Abraçando Mini Lucy", icon: "🤗", visualEffect: "pulse-gentle" },
  { id: "rir_bagunca_lucy", label: "Rindo da bagunça da Mini Lucy", icon: "🤭", visualEffect: "shake-gentle" },
  { id: "perseguir_lucy", label: "Perseguindo Mini Lucy", icon: "🏃‍♀️", visualEffect: "bounce-little" },
  { id: "escorregar", label: "Ops! Escorregando", icon: "🛷", visualEffect: "shake-gentle" },
  { id: "levantar_sorrindo", label: "Levantando sorrindo", icon: "😊", visualEffect: "pulse-gentle" },
  { id: "flutuar", label: "Flutuando alguns centímetros", icon: "🎈", visualEffect: "float-slow" },
  { id: "girar_lento", label: "Girando lentamente", icon: "🔄", visualEffect: "rotate-slow" },
  { id: "estrela_cadente", label: "Invocando estrela cadente", icon: "☄️", visualEffect: "float-slow" },
  { id: "faiscas_magicas", label: "Produzindo faíscas mágicas", icon: "✨", visualEffect: "pulse-gentle" },
  { id: "olhar_relogio", label: "Olhando para o relógio", icon: "⌚", visualEffect: "float-slow" },
  { id: "consultar_tarot", label: "Consultando carta de Tarot", icon: "🃏", visualEffect: "float-slow" },
  { id: "embaralhar_cartas", label: "Embaralhando cartas", icon: "🎴", visualEffect: "shake-gentle" },
  { id: "tirar_carta", label: "Tirando uma carta aleatória", icon: "🔮", visualEffect: "float-slow" },
  { id: "carta_brilhante", label: "Mostrando carta brilhante", icon: "⭐", visualEffect: "pulse-gentle" },
  { id: "guardar_carta", label: "Guardando a carta", icon: "📥", visualEffect: "float-slow" },
  { id: "organizar_cartas", label: "Organizando as cartas", icon: "📚", visualEffect: "float-slow" },
  { id: "apontar_noticias", label: "Apontando para Reportagens", icon: "👉", visualEffect: "bounce-little" },
  { id: "apontar_campanhas", label: "Apontando para Campanhas", icon: "👉", visualEffect: "bounce-little" },
  { id: "apontar_faqs", label: "Apontando para FAQs", icon: "👉", visualEffect: "bounce-little" },
  { id: "esperar_clique", label: "Esperando um clique seu", icon: "⏳", visualEffect: "pulse-gentle" },
  { id: "sentar_borda", label: "Sentando na borda da tela", icon: "🧘‍♀️", visualEffect: "pulse-gentle" },
  { id: "balancar_pernas", label: "Balançando as pernas", icon: "🦵", visualEffect: "bounce-little" },
  { id: "assobiar", label: "Assobiando alegremente", icon: "🎶", visualEffect: "pulse-gentle" },
  { id: "tocar_sino", label: "Tocando um sino", icon: "🔔", visualEffect: "shake-gentle" },
  { id: "aparecer_lua", label: "Fazendo aparecer uma lua", icon: "🌙", visualEffect: "float-slow" },
  { id: "aparecer_estrelas", label: "Fazendo aparecer estrelas", icon: "⭐", visualEffect: "pulse-gentle" },
  { id: "acender_vela", label: "Acendendo uma vela mágica", icon: "🕯️", visualEffect: "pulse-gentle" },
  { id: "apagar_vela", label: "Apagando a vela com sopro", icon: "💨", visualEffect: "pulse-gentle" },
  { id: "coracao_luminoso", label: "Criando coração luminoso", icon: "💖", visualEffect: "pulse-gentle" },
  { id: "fazer_joinha", label: "Fazendo um joinha", icon: "👍", visualEffect: "bounce-little" },
  { id: "aplaudir_discreto", label: "Aplaudindo discretamente", icon: "👏", visualEffect: "shake-gentle" },
  { id: "procurar_urgentes", label: "Procurando notícias urgentes", icon: "🔍", visualEffect: "float-slow" },
  { id: "colocar_cachecol", label: "Colocando um cachecol", icon: "🧣", visualEffect: "float-slow" },
  { id: "colocar_chapeu", label: "Colocando um chapéu", icon: "👒", visualEffect: "float-slow" },
  { id: "trocar_skin", label: "Trocando de roupa (skin)", icon: "👗", visualEffect: "pulse-gentle" },
  { id: "trocar_expressao", label: "Trocando de expressão", icon: "😜", visualEffect: "pulse-gentle" },
  { id: "escrever_bemvindo", label: "Escrevendo 'Bem-vindo!'", icon: "📝", visualEffect: "float-slow" },
  { id: "escrever_boaleitura", label: "Escrevendo 'Boa leitura!'", icon: "📝", visualEffect: "float-slow" },
  { id: "sentar_logotipo", label: "Sentando no logotipo", icon: "👑", visualEffect: "pulse-gentle" },
  { id: "polir_logotipo", label: "Polindo o logotipo", icon: "🧼", visualEffect: "shake-gentle" },
  { id: "pequena_danca", label: "Fazendo uma dancinha", icon: "💃", visualEffect: "bounce-little" },
  { id: "rodopiar", label: "Rodopiando de felicidade", icon: "🌀", visualEffect: "rotate-slow" },
  { id: "aviao_papel", label: "Brincando with aviãozinho", icon: "✈️", visualEffect: "float-slow" },
  { id: "soltar_balao", label: "Soltando um balão fofo", icon: "🎈", visualEffect: "bounce-little" },
  { id: "observar_ceu", label: "Observando o céu místico", icon: "👀", visualEffect: "float-slow" },
  { id: "placa_reportagem", label: "Segurando 'Nova reportagem!'", icon: "🪧", visualEffect: "float-slow" },
  { id: "placa_campanha", label: "Segurando 'Nova campanha!'", icon: "🪧", visualEffect: "float-slow" },
  { id: "comemorar_update", label: "Comemorando atualizações", icon: "🎉", visualEffect: "bounce-little" },
  { id: "show_magia", label: "Dando um show de magia", icon: "🎩", visualEffect: "pulse-gentle" },
  { id: "produzir_confetes", label: "Produzindo confetes", icon: "🎊", visualEffect: "bounce-little" },
  { id: "nuvens_magicas", label: "Invocando nuvens mágicas", icon: "☁️", visualEffect: "float-slow" },
  { id: "conversar_silencioso", label: "Conversando com Mini Lucy", icon: "💬", visualEffect: "pulse-gentle" },
  { id: "contar_historia", label: "Contando uma historinha", icon: "🗣️", visualEffect: "float-slow" },
  { id: "observar_usuario", label: "Observando você ler", icon: "🧐", visualEffect: "pulse-gentle" },
  { id: "dar_tchau_saida", label: "Dando tchauzinho", icon: "🙋‍♀️", visualEffect: "bounce-little" },
  { id: "reverencia_final", label: "Agradecendo sua visita", icon: "🙇‍♀️", visualEffect: "pulse-gentle" }
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
    caminhar_topo: "Caminhando de mansinho pelo topo da página e reparando em",
    sentar_descansar: "Sentando um pouquinho nas margens do código para descansar e lembrando de",
    alongar_bracos: "Me alongando bem e respirando fundo pensando em",
    bocejar: "Dando um bocejo gostoso depois de passar a noite monitorando",
    tomar_cafe: "Tomando um café imaginário super aromático enquanto analiso",
    ler_reportagem: "Lendo atentamente as nossas reportagens sobre",
    folhear_jornal: "Folheando um jornal vintage com cheirinho de mistério e focando em",
    escrever_noticia: "Escrevendo uma notícia de última hora com foco em",
    tirar_foto: "Tirando uma foto mental de cada detalhe fofo e lembrando de",
    ajustar_oculos: "Ajustando meus óculos redondos para examinar de perto",
    procurar_lanterna: "Procurando segredos e easter eggs com a minha lanterna sobre",
    fazer_reverencia: "Fazendo uma reverência respeitosa e honrando a história de",
    acenar_usuario: "Acenando cheia de dengo para você ler mais sobre",
    cumprimentar_lucy: "Cumprimentando a fofíssima Mini Lucy enquanto fofocamos de",
    abracar_lucy: "Abraçando bem apertado a Mini Lucy para celebrar",
    rir_bagunca_lucy: "Dando risada da doce bagunça que a Mini Lucy fez com",
    perseguir_lucy: "Correndo atrás da Mini Lucy de brincadeira por causa de",
    escorregar: "Ops! Quase levei um escorregão virtual de papel devido a",
    levantar_sorrindo: "Me levantando bem rápido e com um sorrisão ao lembrar de",
    flutuar: "Dando uma flutuada mágica de alguns centímetros sobre",
    girar_lento: "Girando bem devagarinho como as órbitas místicas e pensando em",
    estrela_cadente: "Fazendo uma estrela cadente cruzar a tela e trazer sorte para",
    faiscas_magicas: "Invocando faíscas brilhantes de dengo e magia para celebrar",
    olhar_relogio: "Olhando para o relógio e calculando o tempo exato para",
    consultar_tarot: "Consultando as cartas sagradas de Tarot para revelar",
    embaralhar_cartas: "Embaralhando meu baralho de Marselha com dengo focando em",
    tirar_carta: "Tirando uma carta mística de aconselhamento sobre",
    carta_brilhante: "Exibindo uma carta reluzente de Tarot que abençoa",
    guardar_carta: "Guardando com carinho as cartas sagradas que explicam sobre",
    organizar_cartas: "Organizando e alinhando minha pilha de cartas místicas sobre",
    apontar_noticias: "Apontando minhas anteninhas com dengo para as reportagens sobre",
    apontar_campanhas: "Apontando com carinho para as campanhas solidárias ativas como",
    apontar_faqs: "Apontando meus olhinhos para as respostas do FAQ sobre",
    esperar_clique: "Esperando um carinho seu de clique enquanto penso em",
    sentar_borda: "Sentando de pernas balançando na borda da página pensando em",
    balancar_pernas: "Balançando minhas perninhas de papel no layout imaginando",
    assobiar: "Assobiando uma melodia mística e calma lembrando de",
    tocar_sino: "Tocando um pequeno sino de cristal para limpar as energias de",
    aparecer_lua: "Fazendo aparecer uma lua crescent brilhante para iluminar",
    aparecer_estrelas: "Polvilhando pequenas estrelas cintilantes sobre as pautas de",
    acender_vela: "Acendendo uma vela perfumada virtual para abençoar",
    apagar_vela: "Dando um sopro suave para apagar a velinha e focar em",
    coracao_luminoso: "Criando um coraçãozinho de luz flutuante para mandar dengo a",
    fazer_joinha: "Fazendo um joinha bem fofo para quem está lendo sobre",
    aplaudir_discreto: "Dando palminhas discretas para os criadores e apoiadores de",
    procurar_urgentes: "Vasculhando as notícias urgentes da redação sobre",
    colocar_cachecol: "Colocando um cachecol quentinho de tricô para ler sobre",
    colocar_chapeu: "Colocando um chapéu elegante de repórter fofinho para cobrir",
    trocar_skin: "Trocando de roupinha para ficar mais elegante enquanto comento sobre",
    trocar_expressao: "Mudando minha carinha de papel para uma piscadinha charmosa sobre",
    escrever_bemvindo: "Escrevendo um 'Bem-vindo!' luminoso no topo para quem lê",
    escrever_boaleitura: "Deixando uma nota de 'Boa leitura!' nas discussões de",
    sentar_logotipo: "Me aninhando confortavelmente sobre o logotipo do portal lembrando de",
    polir_logotipo: "Passando um espanador mágico para deixar brilhando o nome de",
    pequena_danca: "Fazendo uma dancinha de vitória super fofa celebrando",
    rodopiar: "Dando um rodopio alegre no ar porque amo falar de",
    aviao_papel: "Soltando um aviãozinho de papel com mensagens secretas sobre",
    soltar_balao: "Soltando um balãozinho rosa para subir aos céus carregando",
    observar_ceu: "Olhando para cima com admiração refletindo sobre os mistérios de",
    placa_reportagem: "Segurando uma plaquinha escrito 'Nova reportagem!' sobre",
    placa_campanha: "Mostrando orgulhosa uma plaquinha 'Nova campanha!' de",
    comemorar_update: "Estourando confetes virtuais e comemorando os avanços de",
    show_magia: "Tirando um coelho fofo da cartola mágica para alegrar",
    produzir_confetes: "Soltando confetes dourados para comemorar os apoios a",
    nuvens_magicas: "Criando nuvenzinhas fofas que chovem amor e dengo sobre",
    conversar_silencioso: "Conversando em silêncio com balõezinhos mudos com a Mini Lucy sobre",
    contar_historia: "Contando histórias antigas da nossa comunidade, principalmente de",
    observar_usuario: "Sentadinha assistindo você ler as matérias incríveis de",
    dar_tchau_saida: "Já deixando um tchauzinho carinhoso caso você vá ler sobre",
    reverencia_final: "Agradecendo com uma reverência por você apoiar e ler sobre"
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
