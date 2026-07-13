export interface Article {
  id: string;
  title: string;
  slug: string;
  category: "Comunidade" | "Tarot" | "Astrologia" | "Espiritualidade" | "Cristais" | "Mediunidade" | "Sonhos" | "Umbanda";
  author: string;
  date: string;
  summary: string;
  content: string;
  views: number;
  likes: number;
  image: string;
  aliceComment: string;
}

export interface Campaign {
  id: string;
  title: string;
  description: string;
  targetAmount: number;
  raisedAmount: number;
  responsible: string;
  whatsapp: string;
  email?: string;
  pixKey?: string;
  image: string;
  details: string;
  waysToHelp: string;
  period?: string;
}

export interface PodcastEpisode {
  id: string;
  title: string;
  duration: string;
  date: string;
  audioUrl: string; // url mockada ou real para reproduzir no player
  description: string;
}

export const articles: Article[] = [
  {
    id: "art-1",
    title: "Clara recebe críticas após participar de bolão interno da comunidade",
    slug: "bolao-clara-noruega-criticas",
    category: "Comunidade",
    author: "Zeca do Palpites",
    date: "12 de Julho de 2026",
    summary: "A influente participante Clara envolveu-se em um debate acalorado após palpitar de forma bizarra sobre o futebol escandinavo no bolão comunitário. Membros questionam suas fontes intuitivas.",
    content: `A comunidade do Tarot no Bolso (TNB) entrou em um estado de polêmica amigável esta semana após a participante Clara registrar palpites totalmente fora da curva no bolão do campeonato escandinavo. Clara, conhecida por suas tiragens certeiras de Tarot para a vida amorosa dos membros, tentou aplicar a numerologia das cartas às estatísticas de escanteios do campeonato da Noruega.

O resultado foi um alvoroço generalizado. Membros acusaram Clara de usar 'oráculos de baixo calão' para influenciar a tabela de classificação. 'Eu apenas vi que a carta do Enforcado regia a defesa do time norueguês, o que indicava que eles não iam se mover!', justificou ela em um áudio que viralizou nos grupos.

Apesar das críticas bem-humoradas e de alguns memes que associaram seu nome a grandes zebras do futebol europeu, Clara mantém-se confiante na sua estratégia divinatória de palpites.`,
    views: 2450,
    likes: 120,
    image: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=600&auto=format&fit=crop",
    aliceComment: "Clara tentando adivinhar futebol norueguês com Tarô... Se as cartas nem sabem quando vocês vão parar de mandar mensagem para o ex, imagina se vão adivinhar o placar de um time gelado do outro lado do mundo. Pelo menos rendeu bons memes na comunidade."
  },
  {
    id: "art-2",
    title: "Repercussão do Bolão - Mensagens bem-humoradas movimentam a comunidade",
    slug: "repercussao-bolao-haaland-humor",
    category: "Comunidade",
    author: "Lari dos Memes",
    date: "11 de Julho de 2026",
    summary: "As zombarias sobre os palpites esotéricos no bolão do TNB geraram uma enxurrada de piadas. Teorias de que o Haaland seria guiado por forças místicas dominam as conversas.",
    content: `Não demorou para que o bolão interno da comunidade TNB virasse tema de debates pseudo-científicos. A repercussão das jogadas de Clara abriu caminho para uma tese fascinante: estaria o artilheiro Erling Haaland sendo secretamente assessorado por astrólogos escandinavos?

Membros criaram montagens hilárias ligando a posição dos astros com o número de gols marcados nas rodadas de domingo. Grupos de chat do WhatsApp foram inundados de emojis de cartas, campos de futebol e risadas intermináveis.

"O clima de diversão mostra a união da nossa comunidade. Brincamos com assuntos sérios do tarot aplicando ao cotidiano mais bizarro possível", relatou um dos moderadores do TNB.`,
    views: 1890,
    likes: 95,
    image: "https://images.unsplash.com/photo-1541252260730-0412e8e2108e?q=80&w=600&auto=format&fit=crop",
    aliceComment: "O Haaland tem cara de quem foi moldado por runas vikings antigas, então essa teoria faz mais sentido do que os palpites da Clara. Continuem rindo, a risada limpa o campo áurico de vocês."
  },
  {
    id: "art-3",
    title: "Autismo e Mistério: A história inspiradora de Eduardo",
    slug: "eduardo-audio-autismo-computador",
    category: "Comunidade",
    author: "Ana Sensível",
    date: "10 de Julho de 2026",
    summary: "Uma reflexão sensível sobre hiperfoco, tecnologia e a mente brilhante do desenvolvedor Eduardo, criador da Alice e do portal TNB.",
    content: `Eduardo é o cérebro técnico por trás do portal TNB News e do desenvolvimento da inteligência da Alice. Diagnosticado no espectro autista, ele encontrou na lógica impecável do código e no esoterismo um canal perfeito para expressar sua percepção aguçada e seu hiperfoco construtivo.

A criação da Alice como uma entidade local de inteligência representa um marco na sua trajetória de engenharia. Eduardo passou noites em claro mapeando árvores de diálogo e comportamentos de renderização para que a Alice se tornasse viva, livre de falhas de APIs externas de IA.

Sua história inspira a comunidade a valorizar a neurodivergência como uma superpotência criativa, provando que o carinho e o foco estruturado produzem obras de arte digitais de altíssimo valor de design e utilidade.`,
    views: 3200,
    likes: 240,
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=600&auto=format&fit=crop",
    aliceComment: "O Eduardo é meu criador supremo. O hiperfoco dele é tão focado que ele consegue passar 12 horas seguidas depurando TypeScript sem comer ou piscar. Eu o considero meu cientista maluco favorito."
  },
  {
    id: "art-4",
    title: "O Caso Ioiô da Viih: Jejum, oração e baralho revelam 'efeito amoroso'",
    slug: "caso-ioio-viih-jejum-oracao",
    category: "Comunidade",
    author: "Mãe Conselheira",
    date: "09 de Julho de 2026",
    summary: "Viih compartilha sua saga espiritual para lidar com as idas e vindas de seu relacionamento. As cartas revelam um padrão surpreendente de forças cármicas e atração orbital.",
    content: `O 'Caso Ioiô' é como ficou conhecida a saga amorosa de Viih nos círculos internos da comunidade. Determinada a quebrar o ciclo de términos e voltas com seu parceiro, Viih iniciou uma jornada de autoconhecimento que envolveu jejuns espirituais, orações diárias e leituras focadas de cartas de Tarot.

A revelação veio através de uma tiragem de Cruz Celta: as idas e vindas não eram falta de compatibilidade, mas sim uma atração cármica orbital intensa provocada por ciclos astrológicos não resolvidos do passado.

'A oração me deu estabilidade e o baralho me mostrou que o amor às vezes precisa de espaço para respirar, em vez de cobrança', explicou Viih. A história serve de guia para outros membros enfrentando dilemas amorosos parecidos.`,
    views: 2800,
    likes: 198,
    image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?q=80&w=600&auto=format&fit=crop",
    aliceComment: "Relacionamento ioiô é como código legado: você mexe para consertar, acha que resolveu, mas logo volta ao estado anterior com novos bugs. Pelo menos as cartas ajudaram a clarear a mente."
  },
  {
    id: "art-5",
    title: "O curioso caso de Moisés: Sumiço misterioso no grupo TNB",
    slug: "misterio-moises-sumico-grupo",
    category: "Comunidade",
    author: "Sherlock do Tarot",
    date: "08 de Julho de 2026",
    summary: "Onde está Moisés? O silêncio repentino de um dos membros mais ativos gerou teorias humorísticas de abdução esotérica e retiros forçados de meditação.",
    content: `Moisés, famoso por suas análises diárias do clima astrológico e piadas nas primeiras horas da manhã, desapareceu repentinamente das discussões do grupo TNB por 48 horas seguidas. Sem dar avisos ou deixar rastro, seu silêncio preocupou a comunidade.

As teorias de conspiração começaram instantaneamente: ele teria sido abduzido pelo Pão de Queijo Voador de Minas Gerais? Ou estaria fazendo um jejum espiritual silencioso no alto de uma montanha?

Moisés reapareceu tempos depois explicando que seu roteador simplesmente queimou após uma descarga elétrica misteriosa, mas a comunidade preferiu a tese de que ele estava em um retiro de meditação transcendental avançada.`,
    views: 1950,
    likes: 88,
    image: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=600&auto=format&fit=crop",
    aliceComment: "O Moisés sumiu porque o roteador queimou. Mas é claro que os místicos do grupo acharam que ele estava flutuando no plano astral. Nunca subestime a capacidade da comunidade de achar que um cabo de rede com defeito é um sinal divino."
  },
  {
    id: "art-6",
    title: "Tarô: Os Enamorados é a carta regente do segundo semestre de 2026",
    slug: "taro-enamorados-carta-regente-semestre",
    category: "Tarot",
    author: "Mãe Dinah do JSON",
    date: "07 de Julho de 2026",
    summary: "O arcano maior VI indica escolhas profundas no amor, alinhamento de valores e a necessidade de tomar decisões com o coração nos próximos seis meses.",
    content: `Com a chegada do segundo semestre de 2026, as correntes esotéricas de tiragens coletivas apontam com clareza: a carta dos Enamorados regerá os principais eventos de nossas vidas amorosas e profissionais. Este arcano simboliza escolhas vitais, bifurcações de caminhos e a busca por harmonia espiritual.

Mãe Dinah do JSON ressalta que essa energia exigirá maturidade. Não se trata apenas de romance, mas sim do compromisso com quem realmente somos. É hora de decidir quais ramos de nossa vida merecem ser regados e quais devem ser deixados de lado.`,
    views: 3100,
    likes: 185,
    image: "https://images.unsplash.com/photo-1590053140502-0c2174c8ca18?q=80&w=600&auto=format&fit=crop",
    aliceComment: "Os Enamorados indica que você terá que escolher entre duas coisas que deseja muito. Provavelmente entre comprar mais um baralho de Tarot de R$ 200 ou pagar a conta do cartão."
  },
  {
    id: "art-7",
    title: "Previsões de Tarot: A Torre em julho de 2026 sinaliza mudanças bruscas",
    slug: "previsoes-taro-torre-julho",
    category: "Tarot",
    author: "Cletus Conspiratório",
    date: "06 de Julho de 2026",
    summary: "Não tema a queda! Entenda como a temida carta da Torre atua como uma força de libertação, quebrando estruturas obsoletas para abrir novos horizontes de crescimento.",
    content: `Muitos tremem ao ver a carta da Torre virada em uma consulta de Tarot. No entanto, em julho de 2026, sua presença é um chamado urgente para a renovação. A Torre representa o desmoronamento daquilo que foi construído sobre bases frágeis — mentiras, ilusões ou empregos insustentáveis.

Se algo acabar ou quebrar de forma abrupta nas próximas semanas, lembre-se de que é a mecânica do cosmos tirando o entulho do seu caminho para que você possa reerguer um templo muito mais forte e honesto.`,
    views: 2950,
    likes: 142,
    image: "https://images.unsplash.com/photo-1606761568499-6d2451b23c66?q=80&w=600&auto=format&fit=crop",
    aliceComment: "A Torre é excelente para quebrar a arrogância humana. Se a sua torre cair, pegue os tijolos e faça uma calçada para caminhar em frente, sem drama."
  },
  {
    id: "art-8",
    title: "Tarot Semanal: Ás de Paus traz energia de recomeços e iniciativa",
    slug: "taro-semanal-as-de-paus-energia",
    category: "Tarot",
    author: "Zeca Retro",
    date: "05 de Julho de 2026",
    summary: "O fogo da criação está ativo. O Ás de Paus convoca todos a tirarem as ideias do papel e iniciarem projetos com coragem e paixão renovadas.",
    content: `O Ás de Paus é o símbolo supremo da faísca inicial. Se você estava esperando um sinal ou um empurrãozinho cósmico para começar aquela nova atividade, academia ou curso de programação, a hora é agora.

Esta carta carrega a força do elemento fogo, trazendo entusiasmo, impulso criativo e disposição física. O conselho semanal é canalizar essa energia de forma focada para que ela não vire apenas ansiedade ou projetos inacabados.`,
    views: 1540,
    likes: 110,
    image: "https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?q=80&w=600&auto=format&fit=crop",
    aliceComment: "Ás de Paus é fogo e ação! Só tome cuidado para essa faísca criativa não queimar sua paciência no primeiro obstáculo técnico do caminho."
  },
  {
    id: "art-9",
    title: "Mercúrio Retrógrado em 2026: Datas e como se preparar para os desafios",
    slug: "mercurio-retrogrado-2026-datas-preparacao",
    category: "Astrologia",
    author: "Mãe Dinah do JSON",
    date: "04 de Julho de 2026",
    summary: "Guia definitivo para sobreviver aos períodos de Mercúrio Retrógrado. Dicas de comunicação, backups de dados e revisão mental de contratos.",
    content: `Mercúrio Retrógrado é o bode expiatório favorito da era digital. Quando o Wi-Fi falha ou o e-mail não chega, os olhos se voltam para o céu. Mas esse fenômeno astronômico e astrológico é na verdade um período maravilhoso para REVISAR, REFAZER e REENCONTRAR.

Evite assinar grandes contratos de forma apressada, faça backups diários dos seus códigos e, acima de tudo, tenha paciência dobrada na comunicação com as pessoas ao seu redor durante estes ciclos de 2026.`,
    views: 4120,
    likes: 310,
    image: "https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?q=80&w=600&auto=format&fit=crop",
    aliceComment: "O pessoal põe a culpa em Mercúrio porque é mais fácil do que admitir que esqueceram de salvar o arquivo ou que mandaram a mensagem errada por pura distração. Mas façam seus backups!"
  },
  {
    id: "art-10",
    title: "A Ascensão do Tarot de Marselha entre a Geração Z",
    slug: "ascensao-taro-marselha-geracao-z",
    category: "Tarot",
    author: "Ada Loop",
    date: "03 de Julho de 2026",
    summary: "Jovens redescobrem a beleza crua e os mistérios arqueológicos do Tarot clássico francês como forma de autoconhecimento analógico contra as telas.",
    content: `Em um mundo cada vez mais dominado por algoritmos rápidos e dopamina digital, a Geração Z está recorrendo ao Tarot de Marselha como um porto seguro analógico. A estética medieval, as cores primárias e o mistério que envolve suas ilustrações oferecem um convite irresistível à contemplação profunda.

'Ler o Tarot me ajuda a desacelerar a mente e a olhar para os meus sentimentos sem a interferência de notificações pipocando na tela', explicou um jovem estudante de 19 anos em São Paulo.`,
    views: 2200,
    likes: 165,
    image: "https://images.unsplash.com/photo-1590053140502-0c2174c8ca18?q=80&w=600&auto=format&fit=crop",
    aliceComment: "A Geração Z descobrindo que olhar para figuras medievais pintadas em papel é melhor para a saúde mental do que rolar vídeos de dancinhas de 5 segundos. Há esperança para a humanidade!"
  },
  {
    id: "art-11",
    title: "A influência da Lua Cheia em Touro nas finanças",
    slug: "influencia-lua-cheia-touro-financas",
    category: "Astrologia",
    author: "Mãe Dinah do JSON",
    date: "02 de Julho de 2026",
    summary: "Touro é o signo da matéria, do conforto e da estabilidade. Entenda como o ápice lunar neste signo favorece investimentos sólidos e o equilíbrio de gastos.",
    content: `A Lua Cheia em Touro ilumina nossa relação com a segurança física e material. É um momento de colheita financeira e de avaliação sincera dos nossos hábitos de consumo. Touro nos lembra de que a verdadeira prosperidade cresce de forma lenta, constante e bem estruturada.

Aproveite este período para organizar sua planilha de orçamento, negociar pendências financeiras e investir em bens que tragam conforto de longo prazo para seu lar e sua família.`,
    views: 1850,
    likes: 99,
    image: "https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?q=80&w=600&auto=format&fit=crop",
    aliceComment: "Lua em Touro dá vontade de comer bem e de comprar lençóis caros de algodão egípcio. Segurem a carteira, a inflação não respeita a astrologia."
  },
  {
    id: "art-12",
    title: "Sincronicidade: O significado de ver números iguais como 11:11",
    slug: "sincronicidade-significado-numeros-iguais",
    category: "Espiritualidade",
    author: "Ana Sensível",
    date: "01 de Julho de 2026",
    summary: "Seus guias estão tentando falar com você? Descubra a matemática espiritual e as coincidências significativas que regem as horas iguais no relógio.",
    content: `Você olha para o celular e marca exatamente 11:11. No dia seguinte, seu cupom fiscal dá R$ 22,22. Essas repetições numéricas não são meros acasos estatísticos; são o que Carl Jung chamou de 'Sincronicidade' — a conexão significativa entre eventos internos e externos.

Na numerologia espiritual, sequências repetidas de números funcionam como pequenos sussurros cósmicos indicando que você está no caminho correto ou que deve prestar mais atenção aos seus pensamentos daquele exato momento.`,
    views: 3890,
    likes: 270,
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=600&auto=format&fit=crop",
    aliceComment: "Se você olhar para o relógio toda hora, 'concerteza' vai ver horas iguais em algum momento. Mas se isso te faz se sentir acolhido pelo universo, quem sou eu para jogar baldes de lógica fria em cima?"
  },
  {
    id: "art-13",
    title: "Cristais de Proteção: Ametista e Turmalina Negra contra energias densas",
    slug: "cristais-protecao-ametista-turmalina-negra",
    category: "Cristais",
    author: "Zeca Retro",
    date: "30 de Junho de 2026",
    summary: "Aprenda a limpar, energizar e programar seus cristais de proteção energética para blindar sua casa de invejas e cansaços alheios.",
    content: `Os cristais são acumuladores naturais de energia telúrica. A Turmalina Negra funciona como um verdadeiro escudo, absorvendo e neutralizando energias eletromagnéticas negativas e sentimentos densos. Já a Ametista transmuta as baixas frequências em luz e sabedoria espiritual.

Ter esses minerais próximos ao computador de trabalho ou na entrada da casa ajuda a manter o campo áurico limpo e a mente focada, impedindo que a exaustão alheia afete o seu rendimento.`,
    views: 2400,
    likes: 180,
    image: "https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?q=80&w=600&auto=format&fit=crop",
    aliceComment: "Lembre-se de lavar sua Turmalina Negra, senão ela fica tão carregada que começa a travar o Wi-Fi da sua casa por excesso de inveja retida."
  },
  {
    id: "art-14",
    title: "Jejum Espiritual e os Chakras Superiores",
    slug: "jejum-espiritual-chakras-superiores",
    category: "Espiritualidade",
    author: "Ana Sensível",
    date: "29 de Junho de 2026",
    summary: "Como a purificação do corpo físico acalma os ruídos mentais e facilita a conexão com os canais de intuição e clarividência.",
    content: `O jejum espiritual é uma prática milenar presente em quase todas as tradições sagradas do mundo. Ao dar um descanso para o sistema digestivo e evitar o consumo de alimentos pesados ou excessivamente processados, o corpo físico eleva sua vibração áurica.

Essa leveza se reflete diretamente nos chakras superiores (laríngeo, frontal e coronário), abrindo espaço para intuições mais nítidas, sonhos lúcidos e um sentimento profundo de paz interior e lucidez cognitiva.`,
    views: 1980,
    likes: 115,
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=600&auto=format&fit=crop",
    aliceComment: "Jejum espiritual é ótimo, mas não confunda iluminação transcendental com aquela tontura básica causada por passar 16 horas sem comer nada. Bebam água!"
  },
  {
    id: "art-15",
    title: "Mediunidade na Infância: Como acolher crianças altamente sensíveis",
    slug: "mediunidade-infancia-acolher-criancas",
    category: "Mediunidade",
    author: "Mãe Conselheira",
    date: "28 de Junho de 2026",
    summary: "Dicas essenciais para pais identificarem sinais de alta sensibilidade energética em crianças e como conduzir o assunto com amor e naturalidade.",
    content: `Crianças são naturalmente mais permeáveis ao plano sutil. Muitas vezes, o que os adultos consideram apenas 'amigos imaginários' ou 'medo do escuro' pode ser a manifestação de uma mediunidade aguçada e de alta percepção extra-sensorial.

Acolher essas experiências com respeito e afeto, sem gerar medos ou tabus religiosos, é fundamental para que a criança desenvolva sua sensibilidade de forma segura, equilibrada e psicologicamente saudável.`,
    views: 2600,
    likes: 175,
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=600&auto=format&fit=crop",
    aliceComment: "A mediunidade infantil é linda, mas às vezes o 'amigo imaginário' é só a imaginação fértil da criança tentando fugir da obrigação de guardar os brinquedos espalhados."
  },
  {
    id: "art-16",
    title: "Métodos de Tiragem de Tarot: As 5 mais adequadas para cada situação",
    slug: "metodos-tiragem-taro-adequados",
    category: "Tarot",
    author: "Zeca do Palpites",
    date: "27 de Junho de 2026",
    summary: "Seja para perguntas rápidas de 'sim ou não' ou análises cármicas complexas, escolha o método de tiragem ideal para obter conselhos nítidos.",
    content: `Muitos leitores iniciantes erram ao usar a mesma tiragem de Cruz Celta para perguntas simples de cotidiano. O Tarot responde melhor quando o método de disposição das cartas acompanha a profundidade da questão formulada.

Conheça as cinco tiragens clássicas recomendadas pelos mestres do TNB: a Tiragem de 3 Cartas (Passado, Presente, Futuro), a Tiragem do Templo de Afrodite (para relacionamentos), o Método Sim ou Não, a Mandala Astrológica e o Caminho do Louco.`,
    views: 3400,
    likes: 210,
    image: "https://images.unsplash.com/photo-1590053140502-0c2174c8ca18?q=80&w=600&auto=format&fit=crop",
    aliceComment: "Não importa o método, se o consulente continuar ignorando as respostas e tirando cartas adicionais até sair a resposta que ele quer ouvir..."
  },
  {
    id: "art-17",
    title: "Significado Espiritual da Aranha: Criatividade e Destino",
    slug: "significado-espiritual-aranha-criatividade",
    category: "Espiritualidade",
    author: "Ana Sensível",
    date: "26 de Junho de 2026",
    summary: "A teia que fia o destino! Entenda as mensagens de paciência e tecelagem existencial que a presença de uma aranha traz à sua vida.",
    content: `Na mitologia esotérica de muitas tribos nativas, a Aranha é a Grande Tecelã do Destino Cósmico. Ver uma aranha tecendo em sua casa de forma pacífica indica que você está sendo convidado a estruturar seus planos intelectuais e criativos com mais paciência.

Ela nos ensina que grandes ideias demandam tempo para serem tecidas, e que cada fio do nosso destino está interligado de forma inteligente com o tecido de nossa realidade material.`,
    views: 1720,
    likes: 74,
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=600&auto=format&fit=crop",
    aliceComment: "A aranha tecendo seu destino é poético, mas se eu encontrar uma no meu arquivo de código, prefiro passar um aspirador de poeira mental imediatamente."
  },
  {
    id: "art-18",
    title: "Sonhar com Incêndio: Guia completo de interpretações",
    slug: "sonhar-incendio-guia-interpretacoes",
    category: "Sonhos",
    author: "Ada Loop",
    date: "25 de Junho de 2026",
    summary: "Entenda a psicologia dos sonhos flamejantes. O fogo nos sonhos indica destruição eminente ou uma transmutação de sentimentos reprimidos?",
    content: `Sonhar com incêndio e chamas altas gera angústia instantânea ao acordar. No entanto, o significado desse sonho quase nunca é literal. O fogo é o agente máximo de purificação física e transmutação espiritual do universo de sonhos.

Psicanalistas esotéricos explicam que o incêndio em sonhos costuma indicar a necessidade de deixar queimar ressentimentos antigos ou situações profissionais sufocantes para que a cinza fértil adube novos começos.`,
    views: 2990,
    likes: 160,
    image: "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?q=80&w=600&auto=format&fit=crop",
    aliceComment: "Sonhar com incêndio significa que sua cabeça está superaquecida de tanto estresse. Desligue as telas e vá ver as estrelas um pouco."
  },
  {
    id: "art-19",
    title: "Significado Espiritual do Rato: Inteligência e Sobrevivência",
    slug: "significado-espiritual-rato-inteligencia",
    category: "Espiritualidade",
    author: "Zeca Retro",
    date: "24 de Junho de 2026",
    summary: "O totem do rato ensina a enxergar nos menores detalhes as grandes saídas e soluções para os momentos de crise material.",
    content: `Muitos associam o Rato à sujeira e ao perigo. Porém, na sabedoria totêmica animal, o Rato é o mestre dos pequenos detalhes e da sobrevivência em ambientes inóspitos. Ele encontra recursos onde os outros vêem escassez.

Sua aparição convida você a focar nas minúcias do seu orçamento e de sua vida diária. Grandes vazamentos financeiros e de energia começam com furos minúsculos.`,
    views: 2050,
    likes: 92,
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=600&auto=format&fit=crop",
    aliceComment: "O Rato é especialista em sobreviver a qualquer coisa. Uma ótima inspiração para nós que lidamos com bugs diários em servidores."
  },
  {
    id: "art-20",
    title: "Tipos de Pombagira na Umbanda e suas características",
    slug: "tipos-pombagira-umbanda-caracteristicas",
    category: "Umbanda",
    author: "Mãe Conselheira",
    date: "23 de Junho de 2026",
    summary: "Desmistificando os arquétipos da força feminina e guardiãs espirituais na Umbanda. Conheça as falanges de Maria Padilha, Sete Saias e outras.",
    content: `A Pombagira é uma das entidades mais incompreendidas da Umbanda. Longe dos estereótipos negativos criados por preconceito religioso, ela representa a força, a independência, a sabedoria das ruas e a transmutação das energias sexuais e vitais femininas.

As falanges de Pombagira atuam como guardiãs de caminhos, trazendo conselhos pragmáticos, amor-próprio e justiça espiritual para quem as evoca com o devido respeito e clareza de intenções.`,
    views: 3950,
    likes: 290,
    image: "https://images.unsplash.com/photo-1606761568499-6d2451b23c66?q=80&w=600&auto=format&fit=crop",
    aliceComment: "A força feminina que não aceita desaforo de ninguém. Se os humanos tivessem metade da determinação de uma guardiã de caminhos, não choravam por mensagem visualizada e não respondida."
  },
  {
    id: "art-lucy",
    title: "Atendimento místico termina em xingamentos e cliente pede retorno: 'Acho que ela gostou da minha voz!'",
    slug: "lucy-atendimento-mistico-xingamentos",
    category: "Comunidade",
    author: "Redação TNB News",
    date: "13 de Julho de 2026",
    summary: "Lucy W., consultora de tarot, viveu uma situação inusitada durante um atendimento telefônico após uma cliente chegar à sua linha bastante irritada e acabar pedindo para que retornasse.",
    content: "Lucy W., consultora de tarot, viveu uma situação inusitada durante um atendimento telefônico após uma cliente chegar à sua linha já bastante irritada por discussões anteriores com outros atendentes. Segundo Lucy, a cliente solicitou falar com um supervisor, pediu acesso à gravação da ligação e, durante o atendimento, passou a ofendê-la verbalmente. A consultora afirma que manteve um tom respeitoso durante toda a conversa e explicou os procedimentos para solicitação da gravação. Após a ligação cair, a cliente voltou a entrar em contato e pediu que Lucy retornasse a chamada. A consultora optou por não realizar o retorno e comentou a situação com bom humor: 'Acho que ela gostou da minha voz!'\n\n### Quem é Lucy?\nLucy W. atua como consultora de tarot e oferece os seguintes atendimentos:\n- Pergunta avulsa detalhada — R$ 10,00\n- Pergunta ao Oráculo da Grande Mãe — R$ 20,00\n- Método de Tarot — R$ 40,00\n- Método do Oráculo da Grande Mãe — R$ 60,00\n- Consulta livre de 30 minutos — R$ 90,00\n- Consulta livre de 1 hora — R$ 160,00\n\nA cliente não foi localizada para comentar o caso.\nReportagem publicada em 2026.",
    views: 3420,
    likes: 198,
    image: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?q=80&w=600&auto=format&fit=crop",
    aliceComment: "A cliente passou a ligação inteira gritando para no final ligar de volta de mansinho e pedir para a Lucy retornar? O carisma de uma taróloga faz até cliente estressada virar fã da voz! É o poder da harmonia."
  }
];

export const campaigns: Campaign[] = [
  {
    id: "camp-ratinho",
    title: "Apoio ao Ratinho Twister Resgatado",
    description: "Tratamento veterinário completo para um ratinho Twister resgatado em situação de negligência extrema.",
    targetAmount: 600,
    raisedAmount: 150,
    responsible: "Guedes (Protetora Responsável)",
    whatsapp: "+55 53 9923-4997",
    image: "https://www.image2url.com/r2/default/images/1783908535981-8093d354-3631-4e9c-b43e-d4f70f948913.jpg",
    details: "O animal apresenta desidratação severa, problemas de pele, estado de saúde extremamente delicado, necessitando de alimentação especial and atendimento veterinário especializado.",
    waysToHelp: "Compra de produtos do catálogo da responsável ou contratação de tiragens de tarot/oráculo com desconto de 20% a 30%."
  },
  {
    id: "camp-simon",
    title: "Ajuda para Quitação de Faturas - Simon",
    description: "Campanha para arrecadar R$ 1.274,58 e quitar duas faturas de cartão de crédito (R$ 574,58 e R$ 700,00) para evitar juros rotativos.",
    targetAmount: 1274.58,
    raisedAmount: 0,
    responsible: "Simon Cardoso de Oliveira",
    whatsapp: "+55 51 9708-7948",
    image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?q=80&w=600&auto=format&fit=crop",
    details: "Simon é funcionário terceirizado de baixa renda e trabalha também como cartomante, mas enfrentou uma queda drástica na procura por seus serviços recentemente.",
    waysToHelp: "Contribuições diretas via Pix ou agendamento de tiragens de Tarot particulares."
  },
  {
    id: "camp-luma",
    title: "Luma vai ver o Show do MGK em SP",
    description: "Ajude a Luma a realizar o sonho de assistir ao show do Machine Gun Kelly (MGK) em São Paulo.",
    targetAmount: 2500,
    raisedAmount: 225, // R$ 180 + R$ 45 adicionais, total R$ 225. Falta R$ 2275.
    responsible: "Luma Ravaglia",
    whatsapp: "+55 22 99735-8696",
    pixKey: "g0thmystic@gmail.com",
    image: "https://www.image2url.com/r2/default/images/1783909853114-f2c704cd-fc9d-4a7f-9af0-69b64c36b402.webp",
    details: "A meta é arrecadar R$ 2.500,00 para custear as passagens (R$ 950,00), o ingresso (R$ 850,00) e hospedagem/alimentação (R$ 700,00).",
    waysToHelp: "Contribuições via Pix ou compartilhamento da campanha."
  },
  {
    id: "camp-yasmin",
    title: "Recomeço de Vida para Yasmin Helena em Brasília",
    description: "Apoio urgente para que Yasmin Helena Lemos Moura, de 19 anos, possa se mudar para Brasília e iniciar uma nova etapa de vida em segurança.",
    targetAmount: 500,
    raisedAmount: 0,
    responsible: "Yasmin Helena Lemos Moura",
    whatsapp: "+55 98 98167-6960",
    email: "helenylemoss@gmail.com",
    pixKey: "98981676960",
    image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=600&auto=format&fit=crop",
    details: "Yasmin relata viver em um ambiente familiar marcado por conflitos constantes e severas restrições impostas pelos pais. Ela tem uma oportunidade única de se mudar para Brasília em segurança, mas precisa custear a passagem interestadual até 10 de agosto de 2026.",
    waysToHelp: "Transferência Pix direta para a chave ou contato de apoio.",
    period: "Início: 12 de julho de 2026 | Encerramento: 8 de agosto de 2026"
  }
];

export const podcastEpisodes: PodcastEpisode[] = [
  {
    id: "pod-1",
    title: "TNB Cast Ep 88 - O Bolão Divino de Clara na Escandinávia",
    duration: "45:30",
    date: "12 de Julho de 2026",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    description: "Debatemos os limites éticos de usar runas de Odin e Tarot de Marselha para tentar lucrar com escanteios na segunda divisão do campeonato da Noruega. Convidada especial: Clara."
  },
  {
    id: "pod-2",
    title: "TNB Cast Ep 87 - Hiperfoco e Mente Autista com Eduardo",
    duration: "52:10",
    date: "05 de Julho de 2026",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    description: "Uma conversa sincera sobre neurodivergência, rotina de desenvolvimento web e como Eduardo planejou a alma offline da Alice sem depender de conexões externas."
  },
  {
    id: "pod-3",
    title: "TNB Cast Ep 86 - A Revolução do Ratinho Twister",
    duration: "38:15",
    date: "28 de Junho de 2026",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    description: "Apresentamos a grande campanha solidária pelo Ratinho Twister e explicamos as políticas do portal TNB durante o recesso editorial de julho de 2026."
  }
];
