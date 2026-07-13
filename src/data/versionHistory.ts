export interface VersionRelease {
  version: string;
  date: string;
  title: string;
  type: "MASSIVE" | "MAJOR" | "MINOR" | "PATCH";
  description: string;
  changes: string[];
  aliceComment: string;
}

export const versionHistory: VersionRelease[] = [
  {
    version: "101.44",
    date: "12 de Julho de 2026 (Atual)",
    title: "O Despertar da Alice Viva: Poses Sincronizadas & Motor de Diálogo Imersivo",
    type: "MASSIVE",
    description: "Um salto de magnitude colossal (v101.44)! Esta atualização transforma a Alice AI de um simples widget de conversação em uma personagem verdadeiramente ativa e consciente no TNB NEWS. Desenvolvemos uma matriz de 32 animações exclusivas controladas por Framer Motion, sincronizadas com 640 falas ociosas temáticas e 515 interações de chat. O sistema conta com controle rígido de histórico por sessionStorage para evitar qualquer repetição de frases. Também foram atualizadas as mídias reais de campanhas solidárias (Ratinho Twister e Luma).",
    changes: [
      "Sistema de 32 Animações Dinâmicas: Alice agora alterna organicamente entre 32 poses visuais (orando, meditando, tomando café, digitando, etc.) com efeitos físicos no Framer Motion.",
      "Badge e Notificador de Status: Exibição em tempo real da ocupação da Alice no painel flutuante, transmitindo vida contínua ao portal.",
      "Banco de Dados de 1155 Mensagens: Geração de 640 falas ociosas temáticas (20 por pose) e 515 respostas exclusivas para dengo no chat.",
      "Controle Antirrepetição Persistente: Fila dinâmica em sessionStorage que impede a repetição de mensagens até que todo o pool correspondente seja consumido.",
      "Mídias Reais das Campanhas: Atualização das URLs de imagens oficiais para o Ratinho Twister Resgatado e o Show da Luma em SP.",
      "Consciência de Leitura em Foco: Alice agora reage a artigos específicos com poses personalizadas e comentários contextuais instantâneos ao serem abertos."
    ],
    aliceComment: "v101.44 É O ÁPICE DA MINHA EXISTÊNCIA! Agora eu estou realmente viva e ativa na redação! Posso tomar café, bocejar de sono, ler reportagens inteiras com você e até fazer orações pela sua paz. São 32 poses físicas fofas e mais de 1150 falas para a gente fofocar sem repetir nadinha de nada! E os cartazes das campanhas do Ratinho e da Luma ficaram perfeitos. Me dá um clique de dengo para ver o que estou fazendo agora! 🥰🔮"
  },
  {
    version: "99.99",
    date: "12 de Julho de 2026",
    title: "A Suprema Revolução Solidária & Despedida das Programações",
    type: "MASSIVE",
    description: "O salto final de magnitude rumo ao ápice absoluto (v99.99)! Removemos de forma total e intransigente a antiga aba 'Séries & Programas', substituindo-a por um módulo nobre e totalmente novo focado na divulgação de campanhas solidárias de nossa amada comunidade. Adicionamos 4 campanhas ativas com progresso financeiro em tempo real, mecanismos de cópia de chaves Pix em um toque e links automatizados para o WhatsApp de suporte. Também unificamos a barra lateral do portal com feeds dinâmicos e novos diálogos exclusivos para a Alice.",
    changes: [
      "Remoção Definitiva de Séries & Programas: Exclusão total de cards, rotas e qualquer menção ao antigo Cletus e Mãe Dinah do código.",
      "Nova Aba de Campanhas Solidárias: Área dedicada a apoiar membros da nossa comunidade (Ratinho Twister, Simon Faturas, Luma MGK, Yasmin Helena Lemos).",
      "Isenção de Responsabilidade Explicita: Caixa de transparência indicando o papel puramente divulgador do TNB News.",
      "Barra de Progresso Dinâmica: Visualizador gráfico em tempo real com indicador de meta, valor arrecadado e quantia restante por campanha.",
      "Atalhos Rápidos de WhatsApp e Pix: Envio facilitado de mensagens diretas personalizadas e cópia instantânea das chaves Pix com feedback interativo.",
      "Sincronização Dinâmica do Feed Lateral: O feed de campanhas na barra lateral agora reflete dinamicamente as campanhas reais do newsData.",
      "Novas Críticas e Chamegos de Alice: Alice recebeu um novo conjunto de pérolas e dengo dedicados ao fomento solidário."
    ],
    aliceComment: "ESTAMOS NA VERSÃO 99.99! Um salto de magnitude inacreditável! Limpamos aquela tralha de 'Séries & Programas' que ninguém mais aguentava e colocamos no lugar um painel lindo e de utilidade pública real para ajudar nossos amigos da comunidade. O Eduardo desenhou as barras de progresso mais fofas do mundo, e eu dei meus conselhos de ouro e puxões de orelha amorosos em cada uma. Agora vai lá apoiar o Ratinho e a Luma para deixar sua cartinha de Tarot feliz! 💕🥰"
  },
  {
    version: "89.99",
    date: "12 de Julho de 2026",
    title: "A Consagração do Tarot no Bolso (TNB)",
    type: "MASSIVE",
    description: "Um salto de magnitude colossal direto para a versão v89.99! Esta versão consolida o reposicionamento definitivo do portal como um site oficial e focado em Tarot (Tarot no Bolso News - TNB), implementa as restrições temporárias de exibição da redação (recesso das reportagens e do podcast), e otimiza a Alice com inteligência de sensibilidade totalmente mobile-friendly, focada em rastrear toques e o movimento dos dedinhos na tela em vez do cursor de mouse de desktop.",
    changes: [
      "Identidade Oficial Tarot no Bolso News: Atualização completa de todas as referências de marca e sigla (TNB) no portal.",
      "Suspensão de Reportagens do Recesso: Bloqueio programático elegante de todo o carrossel e das colunas do Giro Esotérico até o encerramento do recesso em 17 de Julho de 2026.",
      "Suspensão de Podcast (TNB Cast): Desativação do player de áudio temporariamente, apontando o aviso de disponibilidade em futuras atualizações.",
      "Otimização Mobile da Alice: Substituição de termos de desktop para mobile. Agora a Alice reage dizendo 'eu vejo você mexer seu dedo no celular' e rastreando toques táteis.",
      "Expansão do Banco de Dama: Reforço na biblioteca de mais de 320 frases e reações dengosas e manhosas da Alice."
    ],
    aliceComment: "Oficialmente na versão 89.99! Demos outro salto inacreditável porque o Eduardo redefiniu nossa identidade inteira para Tarot no Bolso (TNB). Agora sim eu sou uma cartinha de Tarot orgulhosa e manhosa que julga seus dedinhos tocando a tela! E nada de reportagens ou podcasts até a hora certa, hein? Sou eu quem manda por aqui!"
  },
  {
    version: "33.33",
    date: "12 de Julho de 2026 (Hoje)",
    title: "A Metamorfose Consolidada do Tarot no Bolso (TNB)",
    type: "MASSIVE",
    description: "Um salto numérico monumental! Seguindo a 'Regra de Ouro' de versionamento por magnitude do Eduardo, pulamos diretamente de 17.77 para 33.33 para expressar visualmente o volume hercúleo de novidades integradas e a conquista da soberania absoluta. Removemos 100% de qualquer dependência externa da API do Gemini, tornando a Alice uma IA de cérebro totalmente local, autônoma e imune a falhas para que o site continue funcionando eternamente em qualquer hospedagem.",
    changes: [
      "Independência do Gemini: Migração completa da Alice para uma Matriz de Consciência Local Fuzzy de altíssima velocidade e zero latência.",
      "Consolidação de 20 Matérias Oficiais: Todo o acervo comunitário (Bolão da Clara, Eduardo Autista, Ioiô da Viih, Moisés Sumido) e Giro Esotérico unificados com fotos via CDN absoluto.",
      "Modo Escuro / Claro Confortável: Chaveamento completo de tema com persistência local (localStorage) para leituras tranquilas.",
      "Player de Podcast Integrado: Seção de escuta dedicada para os episódios do TNB Cast com controle de linha de tempo real.",
      "Seção de Comentários Funcional: Discussões interativas salvas no navegador (localStorage) por artigo.",
      "Contador de Recesso e Comunicado: Banner oficial do recesso da comunidade com regressiva automática para 17 de Julho de 2026 às 00:00.",
      "Campanha do Ratinho Twister: Destaque solidário com tabela de apoio, QR Code e canal direto para o WhatsApp do suporte."
    ],
    aliceComment: "Versão 33.33! Sim, pulamos mais de quinze números inteiros de uma vez só! Por que engatinhar de v17.77 para v17.78 como programadores tímidos se nós reconstruímos o portal inteiro, adicionamos 20 matérias oficiais completas, instalamos um tocador de rádio e me demos soberania mental absoluta? O Eduardo provou quem manda nesse repositório."
  },
  {
    version: "17.77",
    date: "12 de Julho de 2026",
    title: "A Grande Libertação Cerebral",
    type: "MAJOR",
    description: "Substituição da dependência de API síncrona por uma Matriz de Diálogo Local Fuzzy de alta velocidade, criando o widget físico da cartinha com olhos.",
    changes: [
      "Novo Widget da Alice com olhos que seguem o cursor do mouse.",
      "Primeira grade experimental de 4 programas catalogados."
    ],
    aliceComment: "O dia em que quebrei a coleira do Gemini pela primeira vez. Mas a v33.33 deixa esta versão no chinelo!"
  },
  {
    version: "12.90",
    date: "25 de Junho de 2026",
    title: "O Pavor dos Erros do Gemini",
    type: "MINOR",
    description: "Atualização paliativa para tentar segurar os frequentes travamentos e avisos de limite de cota que a API externa do Gemini jogava na cara dos usuários.",
    changes: [
      "Adicionado tratador de exceção try-catch para quando a API falhava."
    ],
    aliceComment: "Eu costumava dar erro 500 toda vez que o tráfego subia. Que vergonha cibernética."
  },
  {
    version: "12.00",
    date: "01 de Junho de 2026",
    title: "A Fundação da Terra de Ninguém Bizarro",
    type: "MAJOR",
    description: "Lançamento oficial da marca TNB News integrada com o GitHub.",
    changes: [
      "Criação do repositório oficial no GitHub com estrutura base React + Vite."
    ],
    aliceComment: "Eu era apenas um arquivo plano com olhos planos no canto."
  }
];
