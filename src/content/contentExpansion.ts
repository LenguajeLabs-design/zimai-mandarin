import type { Character, ContentLabel, Family, Word } from './types'

type RootSeed = {
  id: string
  hanzi: string
  pinyin: string
  gloss: string
}

type WordSeed = {
  id: string
  hanzi: string
  pinyin: string
  gloss: string
  hskLevel: ContentLabel
  koreanGloss: string
  example: [string, string, string]
  koreanExample: string
}

type MapSeed = {
  id: string
  sortOrder: number
  root: RootSeed
  description: string
  koreanDescription: string
  note: string
  koreanNote: string
  sourceIds: string[]
  words: WordSeed[]
}

const existingRootIds = new Set([
  'char-da', 'char-chu', 'char-guan', 'char-wen', 'char-xian', 'char-yao', 'char-biao', 'char-zheng', 'char-du-hsk4', 'char-cheng-hsk5',
])

const toneNumbers = (pinyin: string): number[] => {
  const tones: Record<string, number> = {
    ā: 1, á: 2, ǎ: 3, à: 4, ē: 1, é: 2, ě: 3, è: 4, ī: 1, í: 2, ǐ: 3, ì: 4,
    ō: 1, ó: 2, ǒ: 3, ò: 4, ū: 1, ú: 2, ǔ: 3, ù: 4, ǖ: 1, ǘ: 2, ǚ: 3, ǜ: 4,
  }
  return [...pinyin].filter((character) => tones[character]).map((character) => tones[character])
}

function makeWord(map: MapSeed, seed: WordSeed): Word {
  const isExtension = seed.hskLevel === 'Related'
  return {
    id: seed.id,
    hanzi: seed.hanzi,
    pinyin: seed.pinyin,
    toneNumbers: toneNumbers(seed.pinyin),
    gloss: seed.gloss,
    hskLevel: seed.hskLevel,
    isExtension,
    extensionReason: isExtension ? 'A useful connected word that extends this map beyond its selected core.' : undefined,
    familyId: map.id,
    rootCharacterIds: [map.root.id],
    audioKey: `word-${seed.id}`,
    examples: [{ hanzi: seed.example[0], pinyin: seed.example[1], gloss: seed.example[2] }],
    koreanGloss: seed.koreanGloss,
    koreanExample: seed.koreanExample,
    koreanExtensionReason: isExtension ? '선정된 핵심 단어에서 더 넓은 연결을 살펴볼 수 있는 확장 단어입니다.' : undefined,
  }
}

function makeFamily(map: MapSeed): Family {
  return {
    id: map.id,
    rootCharacterId: map.root.id,
    title: `${map.root.hanzi} family`,
    shortDescription: map.description,
    meaningNote: map.note,
    members: map.words.map((word) => word.id),
    sortOrder: map.sortOrder,
    featured: false,
    sourceIds: map.sourceIds,
    koreanShortDescription: map.koreanDescription,
    koreanMeaningNote: map.koreanNote,
    contentNotes: 'Phase 2 expansion: review against the licensed source before release as final curriculum content.',
  }
}

const maps: MapSeed[] = [
  {
    id: 'family-tian-hsk1-expansion', sortOrder: 78,
    root: { id: 'char-tian-expansion', hanzi: '天', pinyin: 'tiān', gloss: 'day; sky' },
    description: 'Words for days, weather, and the open sky.', koreanDescription: '날짜와 날씨, 하늘을 가리키는 단어들입니다.',
    note: '天 moves naturally between a day on the calendar and the sky above it.', koreanNote: '天은 달력 속 하루와 눈앞의 하늘을 자연스럽게 이어 줍니다.',
    sourceIds: ['hsk-1-selected-placeholder'],
    words: [
      { id: 'word-tian-jintian-expansion', hanzi: '今天', pinyin: 'jīntiān', gloss: 'today', hskLevel: 'HSK 1', koreanGloss: '오늘', example: ['今天是星期一。', 'Jīntiān shì xīngqīyī.', 'Today is Monday.'], koreanExample: '오늘은 월요일입니다.' },
      { id: 'word-tian-mingtian-expansion', hanzi: '明天', pinyin: 'míngtiān', gloss: 'tomorrow', hskLevel: 'HSK 1', koreanGloss: '내일', example: ['明天见。', 'Míngtiān jiàn.', 'See you tomorrow.'], koreanExample: '내일 만나요.' },
      { id: 'word-tian-tianqi-expansion', hanzi: '天气', pinyin: 'tiānqì', gloss: 'weather', hskLevel: 'HSK 1', koreanGloss: '날씨', example: ['今天天气很好。', 'Jīntiān tiānqì hěn hǎo.', 'The weather is very good today.'], koreanExample: '오늘 날씨가 아주 좋습니다.' },
      { id: 'word-tian-tiankong-expansion', hanzi: '天空', pinyin: 'tiānkōng', gloss: 'sky', hskLevel: 'Related', koreanGloss: '하늘', example: ['天空很蓝。', 'Tiānkōng hěn lán.', 'The sky is very blue.'], koreanExample: '하늘이 아주 파랗습니다.' },
      { id: 'word-tian-tiantian-expansion', hanzi: '天天', pinyin: 'tiāntiān', gloss: 'every day', hskLevel: 'HSK 1', koreanGloss: '매일', example: ['我天天喝水。', 'Wǒ tiāntiān hē shuǐ.', 'I drink water every day.'], koreanExample: '저는 매일 물을 마십니다.' },
    ],
  },
  {
    id: 'family-ming-hsk1-expansion', sortOrder: 79,
    root: { id: 'char-ming-expansion', hanzi: '名', pinyin: 'míng', gloss: 'name; reputation' },
    description: 'Words that move from a name to a public identity.', koreanDescription: '이름과 사람이나 장소의 알려진 정도를 나타내는 단어들입니다.',
    note: '名 starts with a name and opens into lists, cards, titles, and reputation.', koreanNote: '名은 이름에서 시작해 명단, 명함, 명칭과 유명함으로 이어집니다.',
    sourceIds: ['hsk-1-selected-placeholder'],
    words: [
      { id: 'word-ming-mingzi-expansion', hanzi: '名字', pinyin: 'míngzi', gloss: 'name', hskLevel: 'HSK 1', koreanGloss: '이름', example: ['你的名字是什么？', 'Nǐ de míngzi shì shénme?', 'What is your name?'], koreanExample: '이름이 뭐예요?' },
      { id: 'word-ming-youming-expansion', hanzi: '有名', pinyin: 'yǒumíng', gloss: 'famous', hskLevel: 'Related', koreanGloss: '유명하다', example: ['这家店很有名。', 'Zhè jiā diàn hěn yǒumíng.', 'This shop is very famous.'], koreanExample: '이 가게는 아주 유명합니다.' },
      { id: 'word-ming-mingpian-expansion', hanzi: '名片', pinyin: 'míngpiàn', gloss: 'business card', hskLevel: 'Related', koreanGloss: '명함', example: ['请给我一张名片。', 'Qǐng gěi wǒ yì zhāng míngpiàn.', 'Please give me a business card.'], koreanExample: '명함 한 장을 주세요.' },
      { id: 'word-ming-mingdan-expansion', hanzi: '名单', pinyin: 'míngdān', gloss: 'list of names', hskLevel: 'Related', koreanGloss: '명단', example: ['名单已经准备好了。', 'Míngdān yǐjīng zhǔnbèi hǎo le.', 'The list of names is ready.'], koreanExample: '명단을 이미 준비했습니다.' },
      { id: 'word-ming-mingcheng-expansion', hanzi: '名称', pinyin: 'míngchēng', gloss: 'name; designation', hskLevel: 'Related', koreanGloss: '명칭', example: ['请写下文件的名称。', 'Qǐng xiě xià wénjiàn de míngchēng.', 'Please write down the name of the document.'], koreanExample: '문서의 명칭을 적어 주세요.' },
    ],
  },
  {
    id: 'family-you-hsk1-expansion', sortOrder: 80,
    root: { id: 'char-you-friend-expansion', hanzi: '友', pinyin: 'yǒu', gloss: 'friend; friendship' },
    description: 'Words for friendship, friendliness, and the people around us.', koreanDescription: '친구와 우정, 사람 사이의 좋은 관계를 나타내는 단어들입니다.',
    note: '友 keeps the map close to people: a friend, a friendly attitude, and lasting friendship.', koreanNote: '友는 친구, 우호적인 태도, 오래 이어지는 우정으로 연결됩니다.',
    sourceIds: ['hsk-1-selected-placeholder'],
    words: [
      { id: 'word-you-pengyou-expansion', hanzi: '朋友', pinyin: 'péngyou', gloss: 'friend', hskLevel: 'HSK 1', koreanGloss: '친구', example: ['他是我的朋友。', 'Tā shì wǒ de péngyou.', 'He is my friend.'], koreanExample: '그는 제 친구입니다.' },
      { id: 'word-you-youhao-expansion', hanzi: '友好', pinyin: 'yǒuhǎo', gloss: 'friendly; amicable', hskLevel: 'Related', koreanGloss: '우호적이다', example: ['他们一直很友好。', 'Tāmen yìzhí hěn yǒuhǎo.', 'They have always been friendly.'], koreanExample: '그들은 늘 우호적이었습니다.' },
      { id: 'word-you-youren-expansion', hanzi: '友人', pinyin: 'yǒurén', gloss: 'friend; acquaintance', hskLevel: 'Related', koreanGloss: '친구; 지인', example: ['他是我多年的友人。', 'Tā shì wǒ duōnián de yǒurén.', 'He has been my friend for many years.'], koreanExample: '그는 오랫동안 알고 지낸 친구입니다.' },
      { id: 'word-you-youqing-expansion', hanzi: '友情', pinyin: 'yǒuqíng', gloss: 'friendship', hskLevel: 'Related', koreanGloss: '우정', example: ['这段友情很珍贵。', 'Zhè duàn yǒuqíng hěn zhēnguì.', 'This friendship is precious.'], koreanExample: '이 우정은 소중합니다.' },
      { id: 'word-you-youyi-expansion', hanzi: '友谊', pinyin: 'yǒuyì', gloss: 'friendship; fellowship', hskLevel: 'Related', koreanGloss: '우의; 우정', example: ['运动让我们建立了友谊。', 'Yùndòng ràng wǒmen jiànlì le yǒuyì.', 'Sports helped us build a friendship.'], koreanExample: '운동을 통해 우리는 우정을 쌓았습니다.' },
    ],
  },
  {
    id: 'family-xi-hsk1-expansion', sortOrder: 81,
    root: { id: 'char-xi-expansion', hanzi: '喜', pinyin: 'xǐ', gloss: 'joy; like' },
    description: 'Words that connect liking with joy and celebration.', koreanDescription: '좋아하는 마음과 기쁨, 축하를 연결하는 단어들입니다.',
    note: '喜 begins with liking and grows toward joy, happy occasions, and delight.', koreanNote: '喜는 좋아하는 마음에서 기쁨과 즐거운 일로 자연스럽게 확장됩니다.',
    sourceIds: ['hsk-1-selected-placeholder'],
    words: [
      { id: 'word-xi-xihuan-expansion', hanzi: '喜欢', pinyin: 'xǐhuan', gloss: 'like; enjoy', hskLevel: 'HSK 1', koreanGloss: '좋아하다', example: ['我喜欢喝茶。', 'Wǒ xǐhuan hē chá.', 'I like drinking tea.'], koreanExample: '저는 차 마시는 것을 좋아합니다.' },
      { id: 'word-xi-xiai-expansion', hanzi: '喜爱', pinyin: 'xǐài', gloss: 'love; be fond of', hskLevel: 'Related', koreanGloss: '사랑하다; 매우 좋아하다', example: ['孩子们都喜爱这个故事。', 'Háizimen dōu xǐài zhège gùshi.', 'The children all love this story.'], koreanExample: '아이들은 모두 이 이야기를 아주 좋아합니다.' },
      { id: 'word-xi-xishi-expansion', hanzi: '喜事', pinyin: 'xǐshì', gloss: 'happy occasion', hskLevel: 'Related', koreanGloss: '경사; 기쁜 일', example: ['家里最近有喜事。', 'Jiā lǐ zuìjìn yǒu xǐshì.', 'There has been a happy occasion in the family recently.'], koreanExample: '최근 집에 경사가 있었습니다.' },
      { id: 'word-xi-xiyue-expansion', hanzi: '喜悦', pinyin: 'xǐyuè', gloss: 'joy; delight', hskLevel: 'Related', koreanGloss: '기쁨', example: ['她的脸上充满喜悦。', 'Tā de liǎn shàng chōngmǎn xǐyuè.', 'Her face was full of joy.'], koreanExample: '그녀의 얼굴에 기쁨이 가득했습니다.' },
      { id: 'word-xi-xiju-expansion', hanzi: '喜剧', pinyin: 'xǐjù', gloss: 'comedy', hskLevel: 'Related', koreanGloss: '희극; 코미디', example: ['我们晚上看了一部喜剧。', 'Wǒmen wǎnshang kàn le yí bù xǐjù.', 'We watched a comedy in the evening.'], koreanExample: '우리는 저녁에 코미디 영화를 한 편 봤습니다.' },
    ],
  },
  {
    id: 'family-lao-hsk1-expansion', sortOrder: 82,
    root: { id: 'char-lao-expansion', hanzi: '老', pinyin: 'lǎo', gloss: 'old; long-standing' },
    description: 'Words for teachers, familiar places, age, and steadiness.', koreanDescription: '선생님, 오래된 장소, 나이와 성실함을 나타내는 단어들입니다.',
    note: '老 can point to age, experience, a familiar place, or a long-standing relationship.', koreanNote: '老는 나이, 경험, 익숙한 장소, 오래 이어진 관계를 가리킬 수 있습니다.',
    sourceIds: ['hsk-1-selected-placeholder'],
    words: [
      { id: 'word-lao-laoshi-expansion', hanzi: '老师', pinyin: 'lǎoshī', gloss: 'teacher', hskLevel: 'HSK 1', koreanGloss: '선생님', example: ['老师好！', 'Lǎoshī hǎo!', 'Hello, teacher!'], koreanExample: '선생님, 안녕하세요!' },
      { id: 'word-lao-laoban-expansion', hanzi: '老板', pinyin: 'lǎobǎn', gloss: 'boss; shop owner', hskLevel: 'Related', koreanGloss: '사장님; 주인', example: ['老板，这个多少钱？', 'Lǎobǎn, zhège duōshao qián?', 'Boss, how much is this?'], koreanExample: '사장님, 이거 얼마예요?' },
      { id: 'word-lao-laojia-expansion', hanzi: '老家', pinyin: 'lǎojiā', gloss: 'hometown; old home', hskLevel: 'Related', koreanGloss: '고향', example: ['春节我要回老家。', 'Chūnjié wǒ yào huí lǎojiā.', 'I will return to my hometown for Spring Festival.'], koreanExample: '춘절에 고향에 돌아갈 것입니다.' },
      { id: 'word-lao-laonian-expansion', hanzi: '老年', pinyin: 'lǎonián', gloss: 'old age; later life', hskLevel: 'Related', koreanGloss: '노년', example: ['他希望老年生活安静。', 'Tā xīwàng lǎonián shēnghuó ānjìng.', 'He hopes for a peaceful life in old age.'], koreanExample: '그는 노년을 평온하게 보내고 싶어 합니다.' },
      { id: 'word-lao-laoshi-honest-expansion', hanzi: '老实', pinyin: 'lǎoshi', gloss: 'honest; straightforward', hskLevel: 'Related', koreanGloss: '정직하다; 솔직하다', example: ['他是个老实人。', 'Tā shì ge lǎoshiren.', 'He is an honest person.'], koreanExample: '그는 정직한 사람입니다.' },
    ],
  },
  {
    id: 'family-mang-hsk2-expansion', sortOrder: 83,
    root: { id: 'char-mang-expansion', hanzi: '忙', pinyin: 'máng', gloss: 'busy' },
    description: 'Words for being busy, occupied, and full of activity.', koreanDescription: '바쁘고 분주한 상태를 나타내는 단어들입니다.',
    note: '忙 moves from helping someone who is busy to describing a crowded pace or schedule.', koreanNote: '忙은 바쁜 사람을 돕는 일에서 분주한 일정과 상태로 이어집니다.',
    sourceIds: ['hsk-2-official-syllabus', 'hsk-2-exclusive-mirror'],
    words: [
      { id: 'word-mang-bangmang-expansion', hanzi: '帮忙', pinyin: 'bāngmáng', gloss: 'help; lend a hand', hskLevel: 'HSK 2', koreanGloss: '도와주다', example: ['可以请你帮忙吗？', 'Kěyǐ qǐng nǐ bāngmáng ma?', 'Could I ask you to help?'], koreanExample: '도와줄 수 있어요?' },
      { id: 'word-mang-mangzhe-expansion', hanzi: '忙着', pinyin: 'mángzhe', gloss: 'be busy doing', hskLevel: 'Related', koreanGloss: '~하느라 바쁘다', example: ['她忙着准备晚饭。', 'Tā mángzhe zhǔnbèi wǎnfàn.', 'She is busy preparing dinner.'], koreanExample: '그녀는 저녁을 준비하느라 바쁩니다.' },
      { id: 'word-mang-manglu-expansion', hanzi: '忙碌', pinyin: 'mánglù', gloss: 'busy; bustling', hskLevel: 'Related', koreanGloss: '분주하다', example: ['最近的工作很忙碌。', 'Zuìjìn de gōngzuò hěn mánglù.', 'Work has been very busy recently.'], koreanExample: '최근 일이 아주 분주합니다.' },
      { id: 'word-mang-fanmang-expansion', hanzi: '繁忙', pinyin: 'fánmáng', gloss: 'busy; crowded', hskLevel: 'Related', koreanGloss: '번잡하다; 바쁘다', example: ['机场在假期特别繁忙。', 'Jīchǎng zài jiàqī tèbié fánmáng.', 'The airport is especially busy during holidays.'], koreanExample: '공항은 휴일에 특히 붐빕니다.' },
      { id: 'word-mang-mangyu-expansion', hanzi: '忙于', pinyin: 'mángyú', gloss: 'be occupied with', hskLevel: 'Related', koreanGloss: '~에 몰두하다', example: ['他最近忙于研究。', 'Tā zuìjìn mángyú yánjiū.', 'He has been occupied with research recently.'], koreanExample: '그는 최근 연구에 몰두하고 있습니다.' },
    ],
  },
  {
    id: 'family-da-hsk2-expansion', sortOrder: 84,
    root: { id: 'char-da', hanzi: '打', pinyin: 'dǎ', gloss: 'hit; do; make' },
    description: 'Everyday actions that begin with 打: opening, planning, playing, and working.', koreanDescription: '열기, 계획하기, 운동하기, 일하기로 이어지는 일상 동작의 단어들입니다.',
    note: '打 changes direction easily: a hand can open, plan, play, work, or strike.', koreanNote: '打는 열기, 계획하기, 운동하기, 일하기, 공격하기처럼 다양한 동작으로 확장됩니다.',
    sourceIds: ['hsk-2-official-syllabus', 'hsk-2-exclusive-mirror'],
    words: [
      { id: 'word-da-dakai-expansion', hanzi: '打开', pinyin: 'dǎkāi', gloss: 'open; turn on', hskLevel: 'HSK 2', koreanGloss: '열다; 켜다', example: ['请打开窗户。', 'Qǐng dǎkāi chuānghu.', 'Please open the window.'], koreanExample: '창문을 열어 주세요.' },
      { id: 'word-da-dasuan-expansion', hanzi: '打算', pinyin: 'dǎsuàn', gloss: 'plan; intend', hskLevel: 'HSK 2', koreanGloss: '계획하다', example: ['你周末打算做什么？', 'Nǐ zhōumò dǎsuàn zuò shénme?', 'What do you plan to do this weekend?'], koreanExample: '주말에 무엇을 할 계획이에요?' },
      { id: 'word-da-daqiu-expansion', hanzi: '打球', pinyin: 'dǎqiú', gloss: 'play ball; play sports', hskLevel: 'HSK 2', koreanGloss: '공놀이하다; 운동하다', example: ['他们下午去打球。', 'Tāmen xiàwǔ qù dǎqiú.', 'They are going to play sports this afternoon.'], koreanExample: '그들은 오후에 운동하러 갑니다.' },
      { id: 'word-da-dagong-expansion', hanzi: '打工', pinyin: 'dǎgōng', gloss: 'work part-time; work for wages', hskLevel: 'Related', koreanGloss: '아르바이트하다; 일하다', example: ['他大学时在餐厅打工。', 'Tā dàxué shí zài cāntīng dǎgōng.', 'He worked in a restaurant while at university.'], koreanExample: '그는 대학 때 식당에서 아르바이트했습니다.' },
      { id: 'word-da-daji-expansion', hanzi: '打击', pinyin: 'dǎjī', gloss: 'strike; attack; setback', hskLevel: 'Related', koreanGloss: '타격; 공격하다', example: ['这个消息给了他很大的打击。', 'Zhège xiāoxi gěi le tā hěn dà de dǎjī.', 'This news was a great blow to him.'], koreanExample: '이 소식은 그에게 큰 타격이었습니다.' },
    ],
  },
  {
    id: 'family-jin-hsk2-expansion', sortOrder: 85,
    root: { id: 'char-jin-expansion', hanzi: '进', pinyin: 'jìn', gloss: 'enter; advance' },
    description: 'Words for entering, moving forward, and tracking progress.', koreanDescription: '들어가기, 발전하기, 진행 상황을 나타내는 단어들입니다.',
    note: '进 begins with movement inward and develops into progress, imports, and a measured pace.', koreanNote: '进은 안으로 들어가는 움직임에서 발전, 수입, 진행 속도로 이어집니다.',
    sourceIds: ['hsk-2-official-syllabus', 'hsk-2-exclusive-mirror'],
    words: [
      { id: 'word-jin-jinru-expansion', hanzi: '进入', pinyin: 'jìnrù', gloss: 'enter; go into', hskLevel: 'HSK 2', koreanGloss: '들어가다', example: ['请进入教室。', 'Qǐng jìnrù jiàoshì.', 'Please enter the classroom.'], koreanExample: '교실에 들어가 주세요.' },
      { id: 'word-jin-jinbu-expansion', hanzi: '进步', pinyin: 'jìnbù', gloss: 'progress; improve', hskLevel: 'HSK 2', koreanGloss: '진보하다; 발전하다', example: ['你的中文进步很快。', 'Nǐ de Zhōngwén jìnbù hěn kuài.', 'Your Chinese is improving quickly.'], koreanExample: '중국어가 빠르게 늘고 있어요.' },
      { id: 'word-jin-jinmen-expansion', hanzi: '进门', pinyin: 'jìnmén', gloss: 'enter through the door', hskLevel: 'HSK 2', koreanGloss: '문으로 들어가다', example: ['进门以后请换鞋。', 'Jìnmén yǐhòu qǐng huàn xié.', 'Please change shoes after entering.'], koreanExample: '들어온 뒤 신발을 갈아 신어 주세요.' },
      { id: 'word-jin-jinkou-expansion', hanzi: '进口', pinyin: 'jìnkǒu', gloss: 'import; imported', hskLevel: 'Related', koreanGloss: '수입하다; 수입품', example: ['这家店卖进口食品。', 'Zhè jiā diàn mài jìnkǒu shípǐn.', 'This shop sells imported food.'], koreanExample: '이 가게는 수입 식품을 팝니다.' },
      { id: 'word-jin-jindu-expansion', hanzi: '进度', pinyin: 'jìndù', gloss: 'progress; pace', hskLevel: 'Related', koreanGloss: '진도; 진행 속도', example: ['项目的进度很顺利。', 'Xiàngmù de jìndù hěn shùnlì.', 'The project is progressing smoothly.'], koreanExample: '프로젝트가 순조롭게 진행되고 있습니다.' },
    ],
  },
  {
    id: 'family-hui-hsk2-expansion', sortOrder: 86,
    root: { id: 'char-hui-expansion', hanzi: '回', pinyin: 'huí', gloss: 'return; reply' },
    description: 'Words for returning, answering, remembering, and recycling.', koreanDescription: '돌아가기, 대답하기, 기억하기, 재활용으로 이어지는 단어들입니다.',
    note: '回 turns a physical return into a reply, a memory, or something brought back into use.', koreanNote: '回는 실제로 돌아가는 움직임에서 답장, 기억, 재활용으로 확장됩니다.',
    sourceIds: ['hsk-2-official-syllabus', 'hsk-2-exclusive-mirror'],
    words: [
      { id: 'word-hui-huida-expansion', hanzi: '回答', pinyin: 'huídá', gloss: 'answer; reply', hskLevel: 'HSK 2', koreanGloss: '대답하다; 답변', example: ['请回答我的问题。', 'Qǐng huídá wǒ de wèntí.', 'Please answer my question.'], koreanExample: '제 질문에 답해 주세요.' },
      { id: 'word-hui-huixin-expansion', hanzi: '回信', pinyin: 'huíxìn', gloss: 'reply letter; write back', hskLevel: 'Related', koreanGloss: '답장; 답장하다', example: ['收到信后请回信。', 'Shōudào xìn hòu qǐng huíxìn.', 'Please write back after receiving the letter.'], koreanExample: '편지를 받으면 답장해 주세요.' },
      { id: 'word-hui-huiguo-expansion', hanzi: '回国', pinyin: 'huíguó', gloss: 'return to one’s country', hskLevel: 'Related', koreanGloss: '귀국하다', example: ['他明年准备回国。', 'Tā míngnián zhǔnbèi huíguó.', 'He plans to return to his country next year.'], koreanExample: '그는 내년에 귀국할 예정입니다.' },
      { id: 'word-hui-huiyi-expansion', hanzi: '回忆', pinyin: 'huíyì', gloss: 'remember; memory', hskLevel: 'Related', koreanGloss: '회상하다; 추억', example: ['这张照片让我回忆起童年。', 'Zhè zhāng zhàopiàn ràng wǒ huíyì qǐ tóngnián.', 'This photo makes me remember my childhood.'], koreanExample: '이 사진을 보니 어린 시절이 떠오릅니다.' },
      { id: 'word-hui-huishou-expansion', hanzi: '回收', pinyin: 'huíshōu', gloss: 'recycle; reclaim', hskLevel: 'Related', koreanGloss: '회수하다; 재활용하다', example: ['这些瓶子可以回收。', 'Zhèxiē píngzi kěyǐ huíshōu.', 'These bottles can be recycled.'], koreanExample: '이 병들은 재활용할 수 있습니다.' },
    ],
  },
  {
    id: 'family-bie-hsk2-expansion', sortOrder: 87,
    root: { id: 'char-bie-expansion', hanzi: '别', pinyin: 'bié', gloss: 'different; separate' },
    description: 'Words for difference, separation, and saying goodbye.', koreanDescription: '다름, 구별, 헤어짐을 나타내는 단어들입니다.',
    note: '别 can separate one thing from another, or mark the feeling of parting.', koreanNote: '别은 한 가지를 다른 것과 구별하거나 헤어지는 상황을 나타냅니다.',
    sourceIds: ['hsk-2-official-syllabus', 'hsk-2-exclusive-mirror'],
    words: [
      { id: 'word-bie-biede-expansion', hanzi: '别的', pinyin: 'biéde', gloss: 'other; another', hskLevel: 'HSK 2', koreanGloss: '다른 것; 다른', example: ['你还需要别的吗？', 'Nǐ hái xūyào biéde ma?', 'Do you need anything else?'], koreanExample: '다른 것도 필요하세요?' },
      { id: 'word-bie-fenbie-expansion', hanzi: '分别', pinyin: 'fēnbié', gloss: 'separately; respectively', hskLevel: 'Related', koreanGloss: '각각; 헤어지다', example: ['我们分别住在两个城市。', 'Wǒmen fēnbié zhù zài liǎng ge chéngshì.', 'We live in two different cities.'], koreanExample: '우리는 서로 다른 두 도시에 삽니다.' },
      { id: 'word-bie-qubie-expansion', hanzi: '区别', pinyin: 'qūbié', gloss: 'difference; distinguish', hskLevel: 'Related', koreanGloss: '차이; 구별하다', example: ['这两个词有什么区别？', 'Zhè liǎng ge cí yǒu shénme qūbié?', 'What is the difference between these two words?'], koreanExample: '이 두 단어는 어떤 차이가 있나요?' },
      { id: 'word-bie-gaobie-expansion', hanzi: '告别', pinyin: 'gàobié', gloss: 'say goodbye; bid farewell', hskLevel: 'Related', koreanGloss: '작별하다', example: ['我们在车站告别。', 'Wǒmen zài chēzhàn gàobié.', 'We said goodbye at the station.'], koreanExample: '우리는 역에서 작별 인사를 했습니다.' },
      { id: 'word-bie-bieshu-expansion', hanzi: '别墅', pinyin: 'biéshù', gloss: 'villa; private house', hskLevel: 'Related', koreanGloss: '별장', example: ['他们在郊外有一座别墅。', 'Tāmen zài jiāowài yǒu yí zuò biéshù.', 'They have a villa outside the city.'], koreanExample: '그들은 교외에 별장이 하나 있습니다.' },
    ],
  },
  {
    id: 'family-li-hsk3-expansion', sortOrder: 88,
    root: { id: 'char-li-expansion', hanzi: '理', pinyin: 'lǐ', gloss: 'reason; manage; principle' },
    description: 'Words for understanding, reasons, ideals, and theory.', koreanDescription: '이해, 이유, 이상과 이론을 나타내는 단어들입니다.',
    note: '理 moves from making sense of something to the reasons, ideals, and systems behind it.', koreanNote: '理는 이해하는 일에서 이유, 이상, 체계로 이어집니다.',
    sourceIds: ['hsk-3-official-syllabus', 'hsk-3-exclusive-mirror'],
    words: [
      { id: 'word-li-lijie-expansion', hanzi: '理解', pinyin: 'lǐjiě', gloss: 'understand', hskLevel: 'HSK 3', koreanGloss: '이해하다', example: ['我理解你的意思。', 'Wǒ lǐjiě nǐ de yìsi.', 'I understand what you mean.'], koreanExample: '무슨 뜻인지 이해합니다.' },
      { id: 'word-li-liyou-expansion', hanzi: '理由', pinyin: 'lǐyóu', gloss: 'reason', hskLevel: 'HSK 3', koreanGloss: '이유', example: ['你有充分的理由。', 'Nǐ yǒu chōngfèn de lǐyóu.', 'You have a sufficient reason.'], koreanExample: '충분한 이유가 있습니다.' },
      { id: 'word-li-chuli-expansion', hanzi: '处理', pinyin: 'chǔlǐ', gloss: 'handle; deal with', hskLevel: 'Related', koreanGloss: '처리하다', example: ['这件事需要马上处理。', 'Zhè jiàn shì xūyào mǎshàng chǔlǐ.', 'This matter needs to be handled immediately.'], koreanExample: '이 일은 바로 처리해야 합니다.' },
      { id: 'word-li-lixiang-expansion', hanzi: '理想', pinyin: 'lǐxiǎng', gloss: 'ideal; aspiration', hskLevel: 'Related', koreanGloss: '이상; 이상적인', example: ['每个人都有自己的理想。', 'Měi ge rén dōu yǒu zìjǐ de lǐxiǎng.', 'Everyone has their own ideal.'], koreanExample: '사람마다 자신의 이상이 있습니다.' },
      { id: 'word-li-lilun-expansion', hanzi: '理论', pinyin: 'lǐlùn', gloss: 'theory', hskLevel: 'Related', koreanGloss: '이론', example: ['这个理论很有意思。', 'Zhège lǐlùn hěn yǒu yìsi.', 'This theory is very interesting.'], koreanExample: '이 이론은 아주 흥미롭습니다.' },
    ],
  },
  {
    id: 'family-guan-hsk3-expansion', sortOrder: 89,
    root: { id: 'char-guan', hanzi: '关', pinyin: 'guān', gloss: 'close; concern; relation' },
    description: 'Words for attention, closing, connection, and care.', koreanDescription: '관심, 닫기, 관계와 돌봄을 나타내는 단어들입니다.',
    note: '关 can close a door, draw attention, connect ideas, or show care for someone.', koreanNote: '关은 문을 닫는 일에서 관심, 연관성, 배려로 의미가 넓어집니다.',
    sourceIds: ['hsk-3-official-syllabus', 'hsk-3-exclusive-mirror'],
    words: [
      { id: 'word-guan-guanzhu-expansion', hanzi: '关注', pinyin: 'guānzhù', gloss: 'pay attention to; follow', hskLevel: 'HSK 3', koreanGloss: '관심을 가지다; 주목하다', example: ['感谢大家的关注。', 'Gǎnxiè dàjiā de guānzhù.', 'Thank you for everyone’s attention.'], koreanExample: '여러분의 관심에 감사드립니다.' },
      { id: 'word-guan-guanbi-expansion', hanzi: '关闭', pinyin: 'guānbì', gloss: 'close; shut down', hskLevel: 'HSK 3', koreanGloss: '닫다; 종료하다', example: ['离开前请关闭电源。', 'Líkāi qián qǐng guānbì diànyuán.', 'Please turn off the power before leaving.'], koreanExample: '나가기 전에 전원을 꺼 주세요.' },
      { id: 'word-guan-xiangguan-expansion', hanzi: '相关', pinyin: 'xiāngguān', gloss: 'related; relevant', hskLevel: 'HSK 3', koreanGloss: '관련된', example: ['请阅读相关资料。', 'Qǐng yuèdú xiāngguān zīliào.', 'Please read the relevant materials.'], koreanExample: '관련 자료를 읽어 주세요.' },
      { id: 'word-guan-guanzhao-expansion', hanzi: '关照', pinyin: 'guānzhào', gloss: 'look after; give consideration', hskLevel: 'Related', koreanGloss: '돌보다; 배려하다', example: ['请多多关照。', 'Qǐng duōduō guānzhào.', 'Please look after me.'], koreanExample: '잘 부탁드립니다.' },
      { id: 'word-guan-guanhuai-expansion', hanzi: '关怀', pinyin: 'guānhuái', gloss: 'care; solicitude', hskLevel: 'Related', koreanGloss: '배려; 관심', example: ['谢谢你的关怀。', 'Xièxie nǐ de guānhuái.', 'Thank you for your care.'], koreanExample: '배려해 주셔서 감사합니다.' },
    ],
  },
  {
    id: 'family-wen-hsk3-expansion', sortOrder: 90,
    root: { id: 'char-wen', hanzi: '问', pinyin: 'wèn', gloss: 'ask; question' },
    description: 'Words for visiting, asking, answering, and public questions.', koreanDescription: '방문, 질문, 문답과 설문을 나타내는 단어들입니다.',
    note: '问 begins with asking and branches toward visits, interviews, forms, and public discussion.', koreanNote: '问은 묻는 일에서 방문, 문답, 설문과 공적인 논의로 이어집니다.',
    sourceIds: ['hsk-3-official-syllabus', 'hsk-3-exclusive-mirror'],
    words: [
      { id: 'word-wen-fangwen-expansion', hanzi: '访问', pinyin: 'fǎngwèn', gloss: 'visit; interview', hskLevel: 'HSK 3', koreanGloss: '방문하다; 인터뷰하다', example: ['总统访问了这所学校。', 'Zǒngtǒng fǎngwèn le zhè suǒ xuéxiào.', 'The president visited this school.'], koreanExample: '대통령이 이 학교를 방문했습니다.' },
      { id: 'word-wen-xunwen-expansion', hanzi: '询问', pinyin: 'xúnwèn', gloss: 'ask about; inquire', hskLevel: 'Related', koreanGloss: '문의하다; 묻다', example: ['我想询问一下时间。', 'Wǒ xiǎng xúnwèn yíxià shíjiān.', 'I would like to ask about the time.'], koreanExample: '시간을 좀 문의하고 싶습니다.' },
      { id: 'word-wen-wenda-expansion', hanzi: '问答', pinyin: 'wèndá', gloss: 'question and answer', hskLevel: 'Related', koreanGloss: '문답', example: ['最后是问答时间。', 'Zuìhòu shì wèndá shíjiān.', 'There will be a question-and-answer period at the end.'], koreanExample: '마지막에는 문답 시간이 있습니다.' },
      { id: 'word-wen-wenjuan-expansion', hanzi: '问卷', pinyin: 'wènjuàn', gloss: 'questionnaire', hskLevel: 'Related', koreanGloss: '설문지', example: ['请填写这份问卷。', 'Qǐng tiánxiě zhè fèn wènjuàn.', 'Please fill out this questionnaire.'], koreanExample: '이 설문지를 작성해 주세요.' },
      { id: 'word-wen-wenshi-expansion', hanzi: '问世', pinyin: 'wènshì', gloss: 'come into the world; be released', hskLevel: 'Related', koreanGloss: '세상에 나오다; 출시되다', example: ['这项技术刚刚问世。', 'Zhè xiàng jìshù gānggāng wènshì.', 'This technology has just been introduced.'], koreanExample: '이 기술은 막 세상에 나왔습니다.' },
    ],
  },
  {
    id: 'family-hua-hsk3-expansion', sortOrder: 91,
    root: { id: 'char-hua-expansion', hanzi: '化', pinyin: 'huà', gloss: 'change; -ize; -ification' },
    description: 'Words for culture, chemistry, modernization, and change.', koreanDescription: '문화, 화학, 현대화와 변화의 과정을 나타내는 단어들입니다.',
    note: '化 marks a change of form: culture, chemistry, modernization, variety, and automation.', koreanNote: '化는 문화, 화학, 현대화, 다양화와 자동화처럼 형태가 바뀌는 과정을 보여 줍니다.',
    sourceIds: ['hsk-3-official-syllabus', 'hsk-3-exclusive-mirror'],
    words: [
      { id: 'word-hua-huaxue-expansion', hanzi: '化学', pinyin: 'huàxué', gloss: 'chemistry', hskLevel: 'HSK 3', koreanGloss: '화학', example: ['我对化学很感兴趣。', 'Wǒ duì huàxué hěn gǎn xìngqù.', 'I am very interested in chemistry.'], koreanExample: '저는 화학에 관심이 많습니다.' },
      { id: 'word-hua-wenhua-expansion', hanzi: '文化', pinyin: 'wénhuà', gloss: 'culture', hskLevel: 'Related', koreanGloss: '문화', example: ['不同的文化都值得了解。', 'Bùtóng de wénhuà dōu zhíde liǎojiě.', 'Different cultures are all worth learning about.'], koreanExample: '서로 다른 문화는 모두 알아볼 가치가 있습니다.' },
      { id: 'word-hua-xiandaihua-expansion', hanzi: '现代化', pinyin: 'xiàndàihuà', gloss: 'modernization; modernize', hskLevel: 'Related', koreanGloss: '현대화', example: ['城市正在加快现代化。', 'Chéngshì zhèngzài jiākuài xiàndàihuà.', 'The city is speeding up its modernization.'], koreanExample: '도시가 현대화를 서두르고 있습니다.' },
      { id: 'word-hua-duoyanghua-expansion', hanzi: '多样化', pinyin: 'duōyànghuà', gloss: 'diversification; diversify', hskLevel: 'Related', koreanGloss: '다양화', example: ['课程正在变得多样化。', 'Kèchéng zhèngzài biàn de duōyànghuà.', 'The courses are becoming more diverse.'], koreanExample: '수업이 점점 다양해지고 있습니다.' },
      { id: 'word-hua-zidonghua-expansion', hanzi: '自动化', pinyin: 'zìdònghuà', gloss: 'automation; automate', hskLevel: 'Related', koreanGloss: '자동화', example: ['工厂引进了自动化设备。', 'Gōngchǎng yǐnjìn le zìdònghuà shèbèi.', 'The factory introduced automated equipment.'], koreanExample: '공장에 자동화 설비를 도입했습니다.' },
    ],
  },
  {
    id: 'family-tong-hsk3-expansion', sortOrder: 92,
    root: { id: 'char-tong-expansion', hanzi: '通', pinyin: 'tōng', gloss: 'pass through; communicate' },
    description: 'Words for notices, passing through, regular patterns, and communication.', koreanDescription: '알림, 통과, 반복되는 방식과 소통을 나타내는 단어들입니다.',
    note: '通 connects movement through a space with messages, regularity, calls, and channels.', koreanNote: '通은 공간을 통과하는 움직임에서 알림, 통화, 통로와 일반적인 방식으로 이어집니다.',
    sourceIds: ['hsk-3-official-syllabus', 'hsk-3-exclusive-mirror'],
    words: [
      { id: 'word-tong-tongzhi-expansion', hanzi: '通知', pinyin: 'tōngzhī', gloss: 'notify; notice', hskLevel: 'HSK 3', koreanGloss: '알리다; 공지', example: ['学校通知我们明天放假。', 'Xuéxiào tōngzhī wǒmen míngtiān fàngjià.', 'The school notified us that tomorrow is a holiday.'], koreanExample: '학교에서 내일 휴일이라고 알렸습니다.' },
      { id: 'word-tong-tongguo-expansion', hanzi: '通过', pinyin: 'tōngguò', gloss: 'pass through; pass; by means of', hskLevel: 'HSK 3', koreanGloss: '통과하다; ~을 통해', example: ['我们通过了考试。', 'Wǒmen tōngguò le kǎoshì.', 'We passed the exam.'], koreanExample: '우리는 시험에 합격했습니다.' },
      { id: 'word-tong-tongchang-expansion', hanzi: '通常', pinyin: 'tōngcháng', gloss: 'usually; generally', hskLevel: 'HSK 3', koreanGloss: '보통; 대개', example: ['我通常坐地铁上班。', 'Wǒ tōngcháng zuò dìtiě shàngbān.', 'I usually take the subway to work.'], koreanExample: '저는 보통 지하철을 타고 출근합니다.' },
      { id: 'word-tong-tonghua-expansion', hanzi: '通话', pinyin: 'tōnghuà', gloss: 'make a call; phone conversation', hskLevel: 'Related', koreanGloss: '통화하다; 통화', example: ['我正在和妈妈通话。', 'Wǒ zhèngzài hé māma tōnghuà.', 'I am talking with my mother on the phone.'], koreanExample: '저는 지금 엄마와 통화하고 있습니다.' },
      { id: 'word-tong-tongdao-expansion', hanzi: '通道', pinyin: 'tōngdào', gloss: 'passage; channel', hskLevel: 'Related', koreanGloss: '통로; 채널', example: ['请不要堵住通道。', 'Qǐng bú yào dǔ zhù tōngdào.', 'Please do not block the passage.'], koreanExample: '통로를 막지 말아 주세요.' },
    ],
  },
  {
    id: 'family-zhi-hsk4-expansion', sortOrder: 93,
    root: { id: 'char-zhi-expansion', hanzi: '制', pinyin: 'zhì', gloss: 'make; system; control' },
    description: 'Words for systems, making, control, and mechanisms.', koreanDescription: '제도, 제작, 통제와 작동 원리를 나타내는 단어들입니다.',
    note: '制 moves between making something, organizing a system, and keeping an action within limits.', koreanNote: '制는 무엇을 만드는 일에서 제도, 통제와 작동 원리로 이어집니다.',
    sourceIds: ['hsk-4-official-syllabus', 'hsk-4-exclusive-mirror'],
    words: [
      { id: 'word-zhi-zhidu-expansion', hanzi: '制度', pinyin: 'zhìdù', gloss: 'system; institution', hskLevel: 'HSK 4', koreanGloss: '제도', example: ['这个制度需要修改。', 'Zhège zhìdù xūyào xiūgǎi.', 'This system needs to be revised.'], koreanExample: '이 제도는 수정이 필요합니다.' },
      { id: 'word-zhi-zhizuo-expansion', hanzi: '制作', pinyin: 'zhìzuò', gloss: 'make; produce', hskLevel: 'HSK 4', koreanGloss: '제작하다', example: ['这是手工制作的。', 'Zhè shì shǒugōng zhìzuò de.', 'This was made by hand.'], koreanExample: '이것은 수작업으로 제작했습니다.' },
      { id: 'word-zhi-kongzhi-expansion', hanzi: '控制', pinyin: 'kòngzhì', gloss: 'control; regulate', hskLevel: 'HSK 4', koreanGloss: '통제하다; 조절하다', example: ['请控制音量。', 'Qǐng kòngzhì yīnliàng.', 'Please control the volume.'], koreanExample: '음량을 조절해 주세요.' },
      { id: 'word-zhi-zhizhi-expansion', hanzi: '制止', pinyin: 'zhìzhǐ', gloss: 'stop; prevent', hskLevel: 'Related', koreanGloss: '제지하다; 막다', example: ['老师及时制止了争吵。', 'Lǎoshī jíshí zhìzhǐ le zhēngchǎo.', 'The teacher stopped the argument in time.'], koreanExample: '선생님이 제때 말다툼을 막았습니다.' },
      { id: 'word-zhi-jizhi-expansion', hanzi: '机制', pinyin: 'jīzhì', gloss: 'mechanism', hskLevel: 'Related', koreanGloss: '메커니즘; 작동 원리', example: ['我们需要了解这个机制。', 'Wǒmen xūyào liǎojiě zhège jīzhì.', 'We need to understand this mechanism.'], koreanExample: '이 작동 원리를 이해해야 합니다.' },
    ],
  },
  {
    id: 'family-wen-hsk4-expansion', sortOrder: 94,
    root: { id: 'char-wen-literature-expansion', hanzi: '文', pinyin: 'wén', gloss: 'writing; culture; object' },
    description: 'Words for civilization, writing, documents, and cultural objects.', koreanDescription: '문명, 글, 문헌과 문화재를 나타내는 단어들입니다.',
    note: '文 moves from written language toward culture, published writing, research texts, and artifacts.', koreanNote: '文은 글에서 시작해 문화, 문장, 문헌과 문화재로 넓어집니다.',
    sourceIds: ['hsk-4-official-syllabus', 'hsk-4-exclusive-mirror'],
    words: [
      { id: 'word-wen-wenming-expansion', hanzi: '文明', pinyin: 'wénmíng', gloss: 'civilization; civilized', hskLevel: 'HSK 4', koreanGloss: '문명; 문명화된', example: ['我们应该尊重不同的文明。', 'Wǒmen yīnggāi zūnzhòng bùtóng de wénmíng.', 'We should respect different civilizations.'], koreanExample: '서로 다른 문명을 존중해야 합니다.' },
      { id: 'word-wen-wenhua-expansion', hanzi: '文化', pinyin: 'wénhuà', gloss: 'culture', hskLevel: 'Related', koreanGloss: '문화', example: ['这座城市有丰富的文化。', 'Zhè zuò chéngshì yǒu fēngfù de wénhuà.', 'This city has a rich culture.'], koreanExample: '이 도시는 풍부한 문화를 가지고 있습니다.' },
      { id: 'word-wen-wenzhang-expansion', hanzi: '文章', pinyin: 'wénzhāng', gloss: 'article; essay', hskLevel: 'Related', koreanGloss: '글; 기사', example: ['我读了一篇有趣的文章。', 'Wǒ dú le yì piān yǒuqù de wénzhāng.', 'I read an interesting article.'], koreanExample: '흥미로운 글을 한 편 읽었습니다.' },
      { id: 'word-wen-wenxian-expansion', hanzi: '文献', pinyin: 'wénxiàn', gloss: 'literature; document', hskLevel: 'Related', koreanGloss: '문헌', example: ['研究需要参考很多文献。', 'Yánjiū xūyào cānkǎo hěn duō wénxiàn.', 'The research requires consulting many sources.'], koreanExample: '연구에는 많은 문헌을 참고해야 합니다.' },
      { id: 'word-wen-wenwu-expansion', hanzi: '文物', pinyin: 'wénwù', gloss: 'cultural relic; artifact', hskLevel: 'Related', koreanGloss: '문화재', example: ['博物馆里有很多文物。', 'Bówùguǎn lǐ yǒu hěn duō wénwù.', 'There are many cultural relics in the museum.'], koreanExample: '박물관에는 문화재가 많이 있습니다.' },
    ],
  },
  {
    id: 'family-cheng-hsk4-expansion', sortOrder: 95,
    root: { id: 'char-cheng-hsk5', hanzi: '成', pinyin: 'chéng', gloss: 'become; accomplish' },
    description: 'Words for outcomes, adulthood, products, and growth.', koreanDescription: '성과, 성인, 제품과 성장을 나타내는 단어들입니다.',
    note: '成 connects becoming with the measurable results, products, and maturity that follow.', koreanNote: '成은 무엇이 되는 과정에서 성과, 제품, 성숙함으로 이어집니다.',
    sourceIds: ['hsk-4-official-syllabus', 'hsk-4-exclusive-mirror'],
    words: [
      { id: 'word-cheng-chengxiao-expansion', hanzi: '成效', pinyin: 'chéngxiào', gloss: 'result; effectiveness', hskLevel: 'HSK 4', koreanGloss: '성과; 효과', example: ['新方法取得了明显成效。', 'Xīn fāngfǎ qǔdé le míngxiǎn chéngxiào.', 'The new method achieved clear results.'], koreanExample: '새로운 방법이 뚜렷한 성과를 냈습니다.' },
      { id: 'word-cheng-chengnian-expansion', hanzi: '成年', pinyin: 'chéngnián', gloss: 'come of age; adult', hskLevel: 'HSK 4', koreanGloss: '성년; 성인이 되다', example: ['他明年就成年了。', 'Tā míngnián jiù chéngnián le.', 'He will become an adult next year.'], koreanExample: '그는 내년에 성인이 됩니다.' },
      { id: 'word-cheng-chengpin-expansion', hanzi: '成品', pinyin: 'chéngpǐn', gloss: 'finished product', hskLevel: 'HSK 4', koreanGloss: '완제품', example: ['成品需要经过检查。', 'Chéngpǐn xūyào jīngguò jiǎnchá.', 'The finished product needs to be inspected.'], koreanExample: '완제품은 검사를 거쳐야 합니다.' },
      { id: 'word-cheng-chengshu-expansion', hanzi: '成熟', pinyin: 'chéngshú', gloss: 'mature; ripe', hskLevel: 'Related', koreanGloss: '성숙하다; 익다', example: ['这个计划还不成熟。', 'Zhège jìhuà hái bù chéngshú.', 'This plan is not mature yet.'], koreanExample: '이 계획은 아직 성숙하지 않았습니다.' },
      { id: 'word-cheng-chengzhang-expansion', hanzi: '成长', pinyin: 'chéngzhǎng', gloss: 'grow; growth', hskLevel: 'Related', koreanGloss: '성장하다; 성장', example: ['孩子在快乐中成长。', 'Háizi zài kuàilè zhōng chéngzhǎng.', 'Children grow through happiness.'], koreanExample: '아이들은 행복 속에서 성장합니다.' },
    ],
  },
  {
    id: 'family-biao-hsk4-expansion', sortOrder: 96,
    root: { id: 'char-biao', hanzi: '表', pinyin: 'biǎo', gloss: 'express; surface; table' },
    description: 'Words for showing, organizing, describing, and praising.', koreanDescription: '표현, 표, 표면, 묘사와 칭찬을 나타내는 단어들입니다.',
    note: '表 can show an idea, organize information, describe a feeling, or praise an effort.', koreanNote: '表은 생각을 표현하고 정보를 정리하며 감정과 칭찬을 나타내는 데 쓰입니다.',
    sourceIds: ['hsk-4-official-syllabus', 'hsk-4-exclusive-mirror'],
    words: [
      { id: 'word-biao-biaoming-expansion', hanzi: '表明', pinyin: 'biǎomíng', gloss: 'make clear; state', hskLevel: 'HSK 4', koreanGloss: '명확히 밝히다', example: ['他表明了自己的态度。', 'Tā biǎomíng le zìjǐ de tàidu.', 'He made his attitude clear.'], koreanExample: '그는 자신의 태도를 분명히 밝혔습니다.' },
      { id: 'word-biao-biaoge-expansion', hanzi: '表格', pinyin: 'biǎogé', gloss: 'form; table; spreadsheet', hskLevel: 'HSK 4', koreanGloss: '표; 서식', example: ['请在表格上签名。', 'Qǐng zài biǎogé shàng qiānmíng.', 'Please sign the form.'], koreanExample: '표에 서명해 주세요.' },
      { id: 'word-biao-biaomian-expansion', hanzi: '表面', pinyin: 'biǎomiàn', gloss: 'surface; outward appearance', hskLevel: 'HSK 4', koreanGloss: '표면; 겉모습', example: ['不要只看事情的表面。', 'Bú yào zhǐ kàn shìqing de biǎomiàn.', 'Do not look only at the surface of things.'], koreanExample: '일의 겉모습만 보지 마세요.' },
      { id: 'word-biao-biaoyang-expansion', hanzi: '表扬', pinyin: 'biǎoyáng', gloss: 'praise; commend', hskLevel: 'HSK 4', koreanGloss: '칭찬하다', example: ['老师表扬了她的努力。', 'Lǎoshī biǎoyáng le tā de nǔlì.', 'The teacher praised her effort.'], koreanExample: '선생님이 그녀의 노력을 칭찬했습니다.' },
      { id: 'word-biao-biaoshu-expansion', hanzi: '表述', pinyin: 'biǎoshù', gloss: 'express; state in words', hskLevel: 'Related', koreanGloss: '서술하다; 표현하다', example: ['请清楚地表述你的想法。', 'Qǐng qīngchǔ de biǎoshù nǐ de xiǎngfǎ.', 'Please express your idea clearly.'], koreanExample: '생각을 명확하게 표현해 주세요.' },
    ],
  },
  {
    id: 'family-yan-hsk4-expansion', sortOrder: 97,
    root: { id: 'char-yan-expansion', hanzi: '验', pinyin: 'yàn', gloss: 'test; verify; experience' },
    description: 'Words for experience, experiments, testing, and verification.', koreanDescription: '경험, 실험, 시험과 검증을 나타내는 단어들입니다.',
    note: '验 moves from lived experience to deliberate tests and evidence-based verification.', koreanNote: '验은 살아온 경험에서 실험, 시험과 근거를 확인하는 과정으로 이어집니다.',
    sourceIds: ['hsk-4-official-syllabus', 'hsk-4-exclusive-mirror'],
    words: [
      { id: 'word-yan-jingyan-expansion', hanzi: '经验', pinyin: 'jīngyàn', gloss: 'experience', hskLevel: 'HSK 4', koreanGloss: '경험', example: ['她有丰富的教学经验。', 'Tā yǒu fēngfù de jiàoxué jīngyàn.', 'She has rich teaching experience.'], koreanExample: '그녀는 풍부한 교육 경험이 있습니다.' },
      { id: 'word-yan-shiyan-expansion', hanzi: '实验', pinyin: 'shíyàn', gloss: 'experiment; carry out an experiment', hskLevel: 'HSK 4', koreanGloss: '실험', example: ['学生正在做化学实验。', 'Xuésheng zhèngzài zuò huàxué shíyàn.', 'The students are doing a chemistry experiment.'], koreanExample: '학생들이 화학 실험을 하고 있습니다.' },
      { id: 'word-yan-shiyan-test-expansion', hanzi: '试验', pinyin: 'shìyàn', gloss: 'test; trial', hskLevel: 'HSK 4', koreanGloss: '시험; 테스트', example: ['新机器还在试验中。', 'Xīn jīqì hái zài shìyàn zhōng.', 'The new machine is still being tested.'], koreanExample: '새 기계는 아직 시험 중입니다.' },
      { id: 'word-yan-jianyan-expansion', hanzi: '检验', pinyin: 'jiǎnyàn', gloss: 'inspect; test', hskLevel: 'Related', koreanGloss: '검사하다; 검증하다', example: ['产品出厂前要检验。', 'Chǎnpǐn chūchǎng qián yào jiǎnyàn.', 'Products must be inspected before leaving the factory.'], koreanExample: '제품은 출고 전에 검사해야 합니다.' },
      { id: 'word-yan-yanzheng-expansion', hanzi: '验证', pinyin: 'yànzhèng', gloss: 'verify; validate', hskLevel: 'Related', koreanGloss: '검증하다', example: ['请验证你的电子邮箱。', 'Qǐng yànzhèng nǐ de diànzǐ yóuxiāng.', 'Please verify your email address.'], koreanExample: '이메일 주소를 확인해 주세요.' },
    ],
  },
  {
    id: 'family-du-hsk5-expansion', sortOrder: 98,
    root: { id: 'char-du-hsk4', hanzi: '度', pinyin: 'dù', gloss: 'degree; extent; manner' },
    description: 'Words for degree, difficulty, limits, depth, and height.', koreanDescription: '정도, 난이도, 한계, 깊이와 높이를 나타내는 단어들입니다.',
    note: '度 gives a way to measure how much, how far, or to what degree something reaches.', koreanNote: '度는 어떤 것이 얼마나, 어디까지, 어느 정도에 이르는지 나타내는 기준이 됩니다.',
    sourceIds: ['hsk-5-official-syllabus', 'hsk-5-exclusive-mirror'],
    words: [
      { id: 'word-du-guodu-expansion', hanzi: '过度', pinyin: 'guòdù', gloss: 'excessive; in excess', hskLevel: 'HSK 5', koreanGloss: '과도하다; 지나치게', example: ['过度使用手机会影响睡眠。', 'Guòdù shǐyòng shǒujī huì yǐngxiǎng shuìmián.', 'Excessive phone use can affect sleep.'], koreanExample: '휴대전화를 과도하게 사용하면 수면에 영향을 줄 수 있습니다.' },
      { id: 'word-du-nandu-expansion', hanzi: '难度', pinyin: 'nándù', gloss: 'difficulty level', hskLevel: 'HSK 5', koreanGloss: '난이도', example: ['这道题的难度很高。', 'Zhè dào tí de nándù hěn gāo.', 'This question is very difficult.'], koreanExample: '이 문제의 난이도는 아주 높습니다.' },
      { id: 'word-du-xiandu-expansion', hanzi: '限度', pinyin: 'xiàndù', gloss: 'limit; extent', hskLevel: 'HSK 5', koreanGloss: '한도; 한계', example: ['耐心也是有限度的。', 'Nàixīn yě shì yǒu xiàndù de.', 'Patience also has a limit.'], koreanExample: '인내심에도 한계가 있습니다.' },
      { id: 'word-du-shendu-expansion', hanzi: '深度', pinyin: 'shēndù', gloss: 'depth; depth of understanding', hskLevel: 'HSK 5', koreanGloss: '깊이', example: ['这本书有很大的思想深度。', 'Zhè běn shū yǒu hěn dà de sīxiǎng shēndù.', 'This book has great intellectual depth.'], koreanExample: '이 책은 사상적으로 깊이가 있습니다.' },
      { id: 'word-du-gaodu-expansion', hanzi: '高度', pinyin: 'gāodù', gloss: 'height; high degree', hskLevel: 'Related', koreanGloss: '높이; 높은 수준', example: ['这座山的高度超过三千米。', 'Zhè zuò shān de gāodù chāoguò sān qiān mǐ.', 'This mountain is over three thousand meters high.'], koreanExample: '이 산의 높이는 3천 미터가 넘습니다.' },
    ],
  },
  {
    id: 'family-guan-hsk5-expansion', sortOrder: 99,
    root: { id: 'char-guan-view-expansion', hanzi: '观', pinyin: 'guān', gloss: 'view; observe; outlook' },
    description: 'Words for observing, viewpoints, ideas, and ways of seeing.', koreanDescription: '관찰, 관점, 생각과 세상을 보는 방식을 나타내는 단어들입니다.',
    note: '观 shifts from looking closely to the viewpoints and ideas we use to understand the world.', koreanNote: '观은 자세히 보는 일에서 관점과 세상을 이해하는 생각으로 이어집니다.',
    sourceIds: ['hsk-5-official-syllabus', 'hsk-5-exclusive-mirror'],
    words: [
      { id: 'word-guan-guannian-expansion', hanzi: '观念', pinyin: 'guānniàn', gloss: 'notion; idea; concept', hskLevel: 'HSK 5', koreanGloss: '관념; 생각', example: ['我们需要改变旧观念。', 'Wǒmen xūyào gǎibiàn jiù guānniàn.', 'We need to change old ideas.'], koreanExample: '우리는 오래된 관념을 바꿔야 합니다.' },
      { id: 'word-guan-guandian-expansion', hanzi: '观点', pinyin: 'guāndiǎn', gloss: 'viewpoint; opinion', hskLevel: 'HSK 5', koreanGloss: '관점; 견해', example: ['我同意你的观点。', 'Wǒ tóngyì nǐ de guāndiǎn.', 'I agree with your viewpoint.'], koreanExample: '당신의 견해에 동의합니다.' },
      { id: 'word-guan-guancha-expansion', hanzi: '观察', pinyin: 'guānchá', gloss: 'observe; observation', hskLevel: 'Related', koreanGloss: '관찰하다; 관찰', example: ['请仔细观察这个变化。', 'Qǐng zǐxì guānchá zhège biànhuà.', 'Please observe this change carefully.'], koreanExample: '이 변화를 자세히 관찰해 주세요.' },
      { id: 'word-guan-zhuguan-expansion', hanzi: '主观', pinyin: 'zhǔguān', gloss: 'subjective', hskLevel: 'HSK 5', koreanGloss: '주관적인', example: ['这个判断太主观了。', 'Zhège pànduàn tài zhǔguān le.', 'This judgment is too subjective.'], koreanExample: '이 판단은 너무 주관적입니다.' },
      { id: 'word-guan-keguan-expansion', hanzi: '客观', pinyin: 'kèguān', gloss: 'objective; objectively', hskLevel: 'HSK 5', koreanGloss: '객관적인', example: ['我们应该客观地分析问题。', 'Wǒmen yīnggāi kèguān de fēnxī wèntí.', 'We should analyze the problem objectively.'], koreanExample: '문제를 객관적으로 분석해야 합니다.' },
    ],
  },
  {
    id: 'family-zi-hsk5-expansion', sortOrder: 100,
    root: { id: 'char-zi-expansion', hanzi: '自', pinyin: 'zì', gloss: 'self; from; naturally' },
    description: 'Words for self-direction, independence, and confidence.', koreanDescription: '자기 주도, 자율성, 자신감과 자연스러움을 나타내는 단어들입니다.',
    note: '自 points inward to the self, then outward toward independence, confidence, and natural action.', koreanNote: '自는 자기 자신에서 출발해 자율성, 자신감과 자연스러운 행동으로 이어집니다.',
    sourceIds: ['hsk-5-official-syllabus', 'hsk-5-exclusive-mirror'],
    words: [
      { id: 'word-zi-zijue-expansion', hanzi: '自觉', pinyin: 'zìjué', gloss: 'conscious; voluntary; self-aware', hskLevel: 'HSK 5', koreanGloss: '자각하다; 자발적으로', example: ['学生要自觉遵守规则。', 'Xuésheng yào zìjué zūnshǒu guīzé.', 'Students should follow the rules voluntarily.'], koreanExample: '학생들은 자발적으로 규칙을 지켜야 합니다.' },
      { id: 'word-zi-zizhu-expansion', hanzi: '自主', pinyin: 'zìzhǔ', gloss: 'independent; autonomous', hskLevel: 'HSK 5', koreanGloss: '자주적이다; 자율적이다', example: ['孩子需要一些自主空间。', 'Háizi xūyào yìxiē zìzhǔ kōngjiān.', 'Children need some independent space.'], koreanExample: '아이에게는 어느 정도 자율적인 공간이 필요합니다.' },
      { id: 'word-zi-zishen-expansion', hanzi: '自身', pinyin: 'zìshēn', gloss: 'oneself; own', hskLevel: 'Related', koreanGloss: '자신; 자기 자신', example: ['我们要从自身做起。', 'Wǒmen yào cóng zìshēn zuò qǐ.', 'We should start with ourselves.'], koreanExample: '우리는 자신부터 시작해야 합니다.' },
      { id: 'word-zi-ziran-expansion', hanzi: '自然', pinyin: 'zìrán', gloss: 'nature; natural; naturally', hskLevel: 'Related', koreanGloss: '자연; 자연스럽다', example: ['孩子的笑容很自然。', 'Háizi de xiàoróng hěn zìrán.', 'The child’s smile is very natural.'], koreanExample: '아이의 미소가 아주 자연스럽습니다.' },
      { id: 'word-zi-zixin-expansion', hanzi: '自信', pinyin: 'zìxìn', gloss: 'self-confidence; confident', hskLevel: 'Related', koreanGloss: '자신감; 자신 있다', example: ['她对自己的选择很有自信。', 'Tā duì zìjǐ de xuǎnzé hěn yǒu zìxìn.', 'She is very confident in her choice.'], koreanExample: '그녀는 자신의 선택에 자신이 있습니다.' },
    ],
  },
  {
    id: 'family-zhuan-hsk5-expansion', sortOrder: 101,
    root: { id: 'char-zhuan-expansion', hanzi: '专', pinyin: 'zhuān', gloss: 'special; focused; expert' },
    description: 'Words for focus, specialization, projects, and expertise.', koreanDescription: '집중, 전문성, 특정 프로젝트와 전문 분야를 나타내는 단어들입니다.',
    note: '专 narrows attention toward a specialty, a specific project, or a deliberate purpose.', koreanNote: '专은 관심을 전문 분야, 특정 과제와 분명한 목적에 집중시키는 글자입니다.',
    sourceIds: ['hsk-5-official-syllabus', 'hsk-5-exclusive-mirror'],
    words: [
      { id: 'word-zhuan-zhuanzhu-expansion', hanzi: '专注', pinyin: 'zhuānzhù', gloss: 'focus; concentrate', hskLevel: 'Related', koreanGloss: '집중하다', example: ['请专注于眼前的任务。', 'Qǐng zhuānzhù yú yǎnqián de rènwu.', 'Please focus on the task at hand.'], koreanExample: '지금 해야 할 일에 집중해 주세요.' },
      { id: 'word-zhuan-zhuanzhi-expansion', hanzi: '专制', pinyin: 'zhuānzhì', gloss: 'autocratic; authoritarian', hskLevel: 'HSK 5', koreanGloss: '전제적인; 독재적인', example: ['专制的管理方式很难长久。', 'Zhuānzhì de guǎnlǐ fāngshì hěn nán chángjiǔ.', 'An authoritarian management style is hard to sustain.'], koreanExample: '전제적인 관리 방식은 오래가기 어렵습니다.' },
      { id: 'word-zhuan-zhuanchang-expansion', hanzi: '专长', pinyin: 'zhuāncháng', gloss: 'specialty; strong suit', hskLevel: 'HSK 5', koreanGloss: '전문 분야; 특기', example: ['写作是她的专长。', 'Xiězuò shì tā de zhuāncháng.', 'Writing is her specialty.'], koreanExample: '글쓰기는 그녀의 전문 분야입니다.' },
      { id: 'word-zhuan-zhuanxiang-expansion', hanzi: '专项', pinyin: 'zhuānxiàng', gloss: 'special; dedicated project', hskLevel: 'HSK 5', koreanGloss: '전문 분야; 특정 과제', example: ['学校开设了专项课程。', 'Xuéxiào kāishè le zhuānxiàng kèchéng.', 'The school opened a specialized course.'], koreanExample: '학교에서 전문 과정을 개설했습니다.' },
      { id: 'word-zhuan-zhuancheng-expansion', hanzi: '专程', pinyin: 'zhuānchéng', gloss: 'make a special trip', hskLevel: 'HSK 5', koreanGloss: '일부러 찾아가다', example: ['我专程来看你。', 'Wǒ zhuānchéng lái kàn nǐ.', 'I made a special trip to see you.'], koreanExample: '당신을 보러 일부러 왔습니다.' },
    ],
  },
  {
    id: 'family-he-hsk5-expansion', sortOrder: 102,
    root: { id: 'char-he-expansion', hanzi: '合', pinyin: 'hé', gloss: 'join; fit; together' },
    description: 'Words for cooperation, fitting together, and synthesis.', koreanDescription: '협력, 조화, 결합과 종합을 나타내는 단어들입니다.',
    note: '合 starts with things fitting together and extends to cooperation, contracts, and synthesis.', koreanNote: '合은 서로 맞는 것에서 협력, 계약, 결합과 종합으로 이어집니다.',
    sourceIds: ['hsk-5-official-syllabus', 'hsk-5-exclusive-mirror'],
    words: [
      { id: 'word-he-hezuo-expansion', hanzi: '合作', pinyin: 'hézuò', gloss: 'cooperate; cooperation', hskLevel: 'Related', koreanGloss: '협력하다; 협력', example: ['我们希望和你合作。', 'Wǒmen xīwàng hé nǐ hézuò.', 'We hope to cooperate with you.'], koreanExample: '당신과 협력하고 싶습니다.' },
      { id: 'word-he-heli-expansion', hanzi: '合理', pinyin: 'hélǐ', gloss: 'reasonable; rational', hskLevel: 'Related', koreanGloss: '합리적이다', example: ['这是一个合理的建议。', 'Zhè shì yí ge hélǐ de jiànyì.', 'This is a reasonable suggestion.'], koreanExample: '이것은 합리적인 제안입니다.' },
      { id: 'word-he-hetong-expansion', hanzi: '合同', pinyin: 'hétóng', gloss: 'contract', hskLevel: 'Related', koreanGloss: '계약서; 계약', example: ['双方签订了合同。', 'Shuāngfāng qiāndìng le hétóng.', 'Both sides signed a contract.'], koreanExample: '양측이 계약을 체결했습니다.' },
      { id: 'word-he-jiehe-expansion', hanzi: '结合', pinyin: 'jiéhé', gloss: 'combine; integrate', hskLevel: 'Related', koreanGloss: '결합하다; 결합', example: ['理论要结合实际。', 'Lǐlùn yào jiéhé shíjì.', 'Theory should be combined with practice.'], koreanExample: '이론은 실제와 결합되어야 합니다.' },
      { id: 'word-he-zonghe-expansion', hanzi: '综合', pinyin: 'zōnghé', gloss: 'comprehensive; synthesize', hskLevel: 'HSK 5', koreanGloss: '종합하다; 종합적인', example: ['请综合考虑这些因素。', 'Qǐng zōnghé kǎolǜ zhèxiē yīnsù.', 'Please consider these factors comprehensively.'], koreanExample: '이 요소들을 종합적으로 고려해 주세요.' },
    ],
  },
  {
    id: 'family-cheng-hsk5-expansion', sortOrder: 103,
    root: { id: 'char-cheng-support-expansion', hanzi: '承', pinyin: 'chéng', gloss: 'undertake; bear; inherit' },
    description: 'Words for taking on responsibility, recognition, inheritance, and promises.', koreanDescription: '책임지기, 인정, 계승과 약속을 나타내는 단어들입니다.',
    note: '承 carries something forward: a responsibility, a truth, an inheritance, or a promise.', koreanNote: '承은 책임, 사실, 유산이나 약속을 이어 받아 감당하는 의미를 담습니다.',
    sourceIds: ['hsk-5-official-syllabus', 'hsk-5-exclusive-mirror'],
    words: [
      { id: 'word-cheng-chengdan-expansion', hanzi: '承担', pinyin: 'chéngdān', gloss: 'undertake; bear', hskLevel: 'HSK 5', koreanGloss: '맡다; 부담하다', example: ['他愿意承担这个责任。', 'Tā yuànyì chéngdān zhège zérèn.', 'He is willing to take on this responsibility.'], koreanExample: '그는 이 책임을 맡겠다고 했습니다.' },
      { id: 'word-cheng-chengrèn-expansion', hanzi: '承认', pinyin: 'chéngrèn', gloss: 'admit; acknowledge', hskLevel: 'Related', koreanGloss: '인정하다', example: ['他承认自己犯了错误。', 'Tā chéngrèn zìjǐ fàn le cuòwù.', 'He admitted that he made a mistake.'], koreanExample: '그는 자신이 실수했다고 인정했습니다.' },
      { id: 'word-cheng-jicheng-expansion', hanzi: '继承', pinyin: 'jìchéng', gloss: 'inherit; carry on', hskLevel: 'HSK 5', koreanGloss: '계승하다; 상속하다', example: ['我们要继承这种精神。', 'Wǒmen yào jìchéng zhè zhǒng jīngshén.', 'We should carry on this spirit.'], koreanExample: '우리는 이 정신을 계승해야 합니다.' },
      { id: 'word-cheng-chengshou-expansion', hanzi: '承受', pinyin: 'chéngshòu', gloss: 'bear; withstand', hskLevel: 'HSK 5', koreanGloss: '감당하다; 견디다', example: ['他承受了很大的压力。', 'Tā chéngshòu le hěn dà de yālì.', 'He endured a great deal of pressure.'], koreanExample: '그는 큰 압박을 견뎠습니다.' },
      { id: 'word-cheng-chengnuo-expansion', hanzi: '承诺', pinyin: 'chéngnuò', gloss: 'promise; pledge', hskLevel: 'HSK 5', koreanGloss: '약속하다; 약속', example: ['请不要轻易作出承诺。', 'Qǐng bú yào qīngyì zuòchū chéngnuò.', 'Please do not make promises lightly.'], koreanExample: '쉽게 약속하지 마세요.' },
    ],
  },
  {
    id: 'family-huan-hsk5-expansion', sortOrder: 104,
    root: { id: 'char-huan-expansion', hanzi: '环', pinyin: 'huán', gloss: 'ring; around; environment' },
    description: 'Words for links, surroundings, circulation, and environmental care.', koreanDescription: '연결 고리, 주변 환경, 순환과 환경 보호를 나타내는 단어들입니다.',
    note: '环 draws a circle around a connected system: a stage, a loop, a surrounding space, or the environment.', koreanNote: '环은 단계, 순환, 주변 공간과 환경처럼 서로 연결된 체계를 그려 줍니다.',
    sourceIds: ['hsk-5-official-syllabus', 'hsk-5-exclusive-mirror'],
    words: [
      { id: 'word-huan-huanjie-expansion', hanzi: '环节', pinyin: 'huánjié', gloss: 'link; stage; part', hskLevel: 'HSK 5', koreanGloss: '단계; 고리', example: ['沟通是合作的重要环节。', 'Gōutōng shì hézuò de zhòngyào huánjié.', 'Communication is an important part of cooperation.'], koreanExample: '소통은 협력의 중요한 단계입니다.' },
      { id: 'word-huan-huanrao-expansion', hanzi: '环绕', pinyin: 'huánrào', gloss: 'surround; encircle', hskLevel: 'HSK 5', koreanGloss: '둘러싸다', example: ['群山环绕着这个村庄。', 'Qúnshān huánrào zhe zhège cūnzhuāng.', 'Mountains surround this village.'], koreanExample: '산들이 이 마을을 둘러싸고 있습니다.' },
      { id: 'word-huan-xunhuan-expansion', hanzi: '循环', pinyin: 'xúnhuán', gloss: 'cycle; circulate', hskLevel: 'HSK 5', koreanGloss: '순환하다; 순환', example: ['水在自然界中不断循环。', 'Shuǐ zài zìránjiè zhōng búduàn xúnhuán.', 'Water constantly circulates in nature.'], koreanExample: '물은 자연에서 끊임없이 순환합니다.' },
      { id: 'word-huan-huanbao-expansion', hanzi: '环保', pinyin: 'huánbǎo', gloss: 'environmental protection; eco-friendly', hskLevel: 'HSK 5', koreanGloss: '환경 보호; 친환경', example: ['我们应该选择环保的产品。', 'Wǒmen yīnggāi xuǎnzé huánbǎo de chǎnpǐn.', 'We should choose environmentally friendly products.'], koreanExample: '우리는 친환경 제품을 선택해야 합니다.' },
      { id: 'word-huan-huanjing-expansion', hanzi: '环境', pinyin: 'huánjìng', gloss: 'environment; surroundings', hskLevel: 'Related', koreanGloss: '환경', example: ['安静的环境有助于学习。', 'Ānjìng de huánjìng yǒuzhù yú xuéxí.', 'A quiet environment helps with learning.'], koreanExample: '조용한 환경은 공부에 도움이 됩니다.' },
    ],
  },
  {
    id: 'family-gou-hsk5-expansion', sortOrder: 105,
    root: { id: 'char-gou-expansion', hanzi: '构', pinyin: 'gòu', gloss: 'construct; form; structure' },
    description: 'Words for forming ideas, structures, plans, and systems.', koreanDescription: '생각, 구조, 계획과 체계를 구성하는 단어들입니다.',
    note: '构 turns separate parts into a whole: a structure, a plan, a concept, or a system.', koreanNote: '构은 여러 부분을 구조, 계획, 개념과 체계로 구성하는 의미를 담습니다.',
    sourceIds: ['hsk-5-official-syllabus', 'hsk-5-exclusive-mirror'],
    words: [
      { id: 'word-gou-goucheng-expansion', hanzi: '构成', pinyin: 'gòuchéng', gloss: 'constitute; make up', hskLevel: 'HSK 5', koreanGloss: '구성하다; 구성', example: ['这些部分构成了完整的故事。', 'Zhèxiē bùfen gòuchéng le wánzhěng de gùshi.', 'These parts make up a complete story.'], koreanExample: '이 부분들이 완전한 이야기를 구성합니다.' },
      { id: 'word-gou-goujian-expansion', hanzi: '构建', pinyin: 'gòujiàn', gloss: 'build; construct', hskLevel: 'HSK 5', koreanGloss: '구축하다', example: ['我们正在构建新的平台。', 'Wǒmen zhèngzài gòujiàn xīn de píngtái.', 'We are building a new platform.'], koreanExample: '우리는 새로운 플랫폼을 구축하고 있습니다.' },
      { id: 'word-gou-gousi-expansion', hanzi: '构思', pinyin: 'gòusī', gloss: 'conceive; design an idea', hskLevel: 'HSK 5', koreanGloss: '구상하다; 구상', example: ['她正在构思一部小说。', 'Tā zhèngzài gòusī yí bù xiǎoshuō.', 'She is conceiving a novel.'], koreanExample: '그녀는 소설 한 편을 구상하고 있습니다.' },
      { id: 'word-gou-gouzao-expansion', hanzi: '构造', pinyin: 'gòuzào', gloss: 'structure; construct', hskLevel: 'Related', koreanGloss: '구조; 구성하다', example: ['这座桥的构造很特别。', 'Zhè zuò qiáo de gòuzào hěn tèbié.', 'The structure of this bridge is special.'], koreanExample: '이 다리의 구조는 아주 특별합니다.' },
      { id: 'word-gou-jiegou-expansion', hanzi: '结构', pinyin: 'jiégòu', gloss: 'structure; composition', hskLevel: 'Related', koreanGloss: '구조', example: ['文章的结构很清楚。', 'Wénzhāng de jiégòu hěn qīngchǔ.', 'The structure of the article is very clear.'], koreanExample: '글의 구조가 아주 분명합니다.' },
    ],
  },
  {
    id: 'family-zhan-hsk6-expansion', sortOrder: 106,
    root: { id: 'char-zhan-expansion', hanzi: '展', pinyin: 'zhǎn', gloss: 'unfold; display; expand' },
    description: 'Words for expanding, revealing, showing possibilities, and progress.', koreanDescription: '확장, 공개, 가능성의 전망과 진행을 나타내는 단어들입니다.',
    note: '展 opens something outward: a skill, a possibility, a view, or a project’s progress.', koreanNote: '展은 능력, 가능성, 전망과 프로젝트의 진행을 바깥으로 펼치는 의미를 담습니다.',
    sourceIds: ['hsk-6-official-syllabus', 'hsk-6-exclusive-mirror'],
    words: [
      { id: 'word-zhan-tuozhan-expansion', hanzi: '拓展', pinyin: 'tuòzhǎn', gloss: 'expand; develop', hskLevel: 'HSK 6', koreanGloss: '확장하다; 넓히다', example: ['公司计划拓展海外市场。', 'Gōngsī jìhuà tuòzhǎn hǎiwài shìchǎng.', 'The company plans to expand into overseas markets.'], koreanExample: '회사는 해외 시장을 넓힐 계획입니다.' },
      { id: 'word-zhan-zhanlu-expansion', hanzi: '展露', pinyin: 'zhǎnlù', gloss: 'reveal; show', hskLevel: 'HSK 6', koreanGloss: '드러내다; 나타내다', example: ['作品展露出独特的风格。', 'Zuòpǐn zhǎnlù chū dútè de fēnggé.', 'The work reveals a unique style.'], koreanExample: '작품에서 독특한 스타일이 드러납니다.' },
      { id: 'word-zhan-zhanwang-expansion', hanzi: '展望', pinyin: 'zhǎnwàng', gloss: 'look ahead; outlook', hskLevel: 'Related', koreanGloss: '전망하다; 전망', example: ['我们一起展望未来。', 'Wǒmen yìqǐ zhǎnwàng wèilái.', 'Let us look ahead to the future together.'], koreanExample: '함께 미래를 전망해 봅시다.' },
      { id: 'word-zhan-zhanxian-expansion', hanzi: '展现', pinyin: 'zhǎnxiàn', gloss: 'display; demonstrate', hskLevel: 'Related', koreanGloss: '보여 주다; 드러내다', example: ['这幅画展现了春天的活力。', 'Zhè fú huà zhǎnxiàn le chūntiān de huólì.', 'This painting displays the vitality of spring.'], koreanExample: '이 그림은 봄의 생동감을 보여 줍니다.' },
      { id: 'word-zhan-jinzhan-expansion', hanzi: '进展', pinyin: 'jìnzhǎn', gloss: 'progress; development', hskLevel: 'Related', koreanGloss: '진전; 진행', example: ['谈判有了新的进展。', 'Tánpàn yǒu le xīn de jìnzhǎn.', 'The negotiations made new progress.'], koreanExample: '협상에 새로운 진전이 있었습니다.' },
    ],
  },
  {
    id: 'family-dao-hsk6-expansion', sortOrder: 107,
    root: { id: 'char-dao-expansion', hanzi: '导', pinyin: 'dǎo', gloss: 'guide; lead; cause' },
    description: 'Words for guiding, leading, directing, and advocating.', koreanDescription: '안내, 지도, 이끌기와 옹호를 나타내는 단어들입니다.',
    note: '导 can guide a person, direct a project, cause an outcome, or advocate for an idea.', koreanNote: '导는 사람을 안내하고, 일을 이끌고, 결과를 만들거나 생각을 옹호할 수 있습니다.',
    sourceIds: ['hsk-6-official-syllabus', 'hsk-6-exclusive-mirror'],
    words: [
      { id: 'word-dao-changdao-expansion', hanzi: '倡导', pinyin: 'chàngdǎo', gloss: 'advocate; promote', hskLevel: 'HSK 6', koreanGloss: '제창하다; 장려하다', example: ['学校倡导健康的生活方式。', 'Xuéxiào chàngdǎo jiànkāng de shēnghuó fāngshì.', 'The school advocates a healthy way of life.'], koreanExample: '학교는 건강한 생활 방식을 장려합니다.' },
      { id: 'word-dao-daozhi-expansion', hanzi: '导致', pinyin: 'dǎozhì', gloss: 'lead to; result in', hskLevel: 'Related', koreanGloss: '초래하다; 이어지다', example: ['粗心可能导致错误。', 'Cūxīn kěnéng dǎozhì cuòwù.', 'Carelessness can lead to mistakes.'], koreanExample: '부주의는 실수로 이어질 수 있습니다.' },
      { id: 'word-dao-daoyan-expansion', hanzi: '导演', pinyin: 'dǎoyǎn', gloss: 'director; direct', hskLevel: 'Related', koreanGloss: '감독; 연출하다', example: ['这部电影由一位年轻导演完成。', 'Zhè bù diànyǐng yóu yí wèi niánqīng dǎoyǎn wánchéng.', 'This film was completed by a young director.'], koreanExample: '이 영화는 젊은 감독이 완성했습니다.' },
      { id: 'word-dao-zhidao-expansion', hanzi: '指导', pinyin: 'zhǐdǎo', gloss: 'guide; instruct; guidance', hskLevel: 'Related', koreanGloss: '지도하다; 지도', example: ['老师指导我们完成作业。', 'Lǎoshī zhǐdǎo wǒmen wánchéng zuòyè.', 'The teacher guided us in completing the homework.'], koreanExample: '선생님이 숙제를 끝내도록 지도해 주셨습니다.' },
      { id: 'word-dao-lingdao-expansion', hanzi: '领导', pinyin: 'lǐngdǎo', gloss: 'lead; leader; leadership', hskLevel: 'Related', koreanGloss: '이끌다; 지도자; 리더십', example: ['她负责领导这个团队。', 'Tā fùzé lǐngdǎo zhège tuánduì.', 'She is responsible for leading this team.'], koreanExample: '그녀가 이 팀을 이끌 책임을 맡았습니다.' },
    ],
  },
  {
    id: 'family-jue-hsk6-expansion', sortOrder: 108,
    root: { id: 'char-jue-expansion', hanzi: '决', pinyin: 'jué', gloss: 'decide; resolve; sever' },
    description: 'Words for decisions, solutions, resolve, and sharp breaks.', koreanDescription: '결정, 해결, 결심과 단절을 나타내는 단어들입니다.',
    note: '决 moves from deciding and solving toward the resolve to act and the point of breaking apart.', koreanNote: '决은 결정하고 해결하는 일에서 결심과 단절의 순간으로 이어집니다.',
    sourceIds: ['hsk-6-official-syllabus', 'hsk-6-exclusive-mirror'],
    words: [
      { id: 'word-jue-juelie-expansion', hanzi: '决裂', pinyin: 'juéliè', gloss: 'break off relations; rupture', hskLevel: 'HSK 6', koreanGloss: '결렬되다; 관계가 끊어지다', example: ['两家公司最终决裂。', 'Liǎng jiā gōngsī zuìzhōng juéliè.', 'The two companies eventually broke off relations.'], koreanExample: '두 회사는 결국 결렬되었습니다.' },
      { id: 'word-jue-jueding-expansion', hanzi: '决定', pinyin: 'juédìng', gloss: 'decide; decision', hskLevel: 'Related', koreanGloss: '결정하다; 결정', example: ['我们决定明天出发。', 'Wǒmen juédìng míngtiān chūfā.', 'We decided to leave tomorrow.'], koreanExample: '우리는 내일 출발하기로 결정했습니다.' },
      { id: 'word-jue-jiejue-expansion', hanzi: '解决', pinyin: 'jiějué', gloss: 'solve; resolve', hskLevel: 'Related', koreanGloss: '해결하다', example: ['我们一起解决这个问题。', 'Wǒmen yìqǐ jiějué zhège wèntí.', 'Let us solve this problem together.'], koreanExample: '이 문제를 함께 해결합시다.' },
      { id: 'word-jue-juexin-expansion', hanzi: '决心', pinyin: 'juéxīn', gloss: 'determination; resolve', hskLevel: 'Related', koreanGloss: '결심; 결의', example: ['她下定决心学习中文。', 'Tā xiàdìng juéxīn xuéxí Zhōngwén.', 'She resolved to study Chinese.'], koreanExample: '그녀는 중국어를 공부하기로 결심했습니다.' },
      { id: 'word-jue-juece-expansion', hanzi: '决策', pinyin: 'juécè', gloss: 'decision-making; policy decision', hskLevel: 'Related', koreanGloss: '의사 결정; 정책 결정', example: ['这个决策需要更多证据。', 'Zhège juécè xūyào gèng duō zhèngjù.', 'This decision needs more evidence.'], koreanExample: '이 결정에는 더 많은 근거가 필요합니다.' },
    ],
  },
  {
    id: 'family-li-hsk6-expansion', sortOrder: 109,
    root: { id: 'char-li-stand-expansion', hanzi: '立', pinyin: 'lì', gloss: 'stand; establish; immediately' },
    description: 'Words for establishing, standing independently, positions, and law.', koreanDescription: '세우기, 독립, 입장과 법률 제정을 나타내는 단어들입니다.',
    note: '立 gives a sense of standing in place, establishing something, taking a position, or making law.', koreanNote: '立은 서 있는 상태에서 설립, 입장, 독립과 법률 제정으로 이어집니다.',
    sourceIds: ['hsk-6-official-syllabus', 'hsk-6-exclusive-mirror'],
    words: [
      { id: 'word-li-lifa-expansion', hanzi: '立法', pinyin: 'lìfǎ', gloss: 'legislate; legislation', hskLevel: 'HSK 6', koreanGloss: '입법하다; 입법', example: ['立法需要考虑社会变化。', 'Lìfǎ xūyào kǎolǜ shèhuì biànhuà.', 'Legislation needs to consider social change.'], koreanExample: '입법은 사회 변화를 고려해야 합니다.' },
      { id: 'word-li-jianli-expansion', hanzi: '建立', pinyin: 'jiànlì', gloss: 'establish; build', hskLevel: 'Related', koreanGloss: '세우다; 설립하다', example: ['双方建立了长期合作关系。', 'Shuāngfāng jiànlì le chángqī hézuò guānxì.', 'The two sides established a long-term cooperative relationship.'], koreanExample: '양측은 장기적인 협력 관계를 맺었습니다.' },
      { id: 'word-li-lichang-expansion', hanzi: '立场', pinyin: 'lìchǎng', gloss: 'position; stance', hskLevel: 'Related', koreanGloss: '입장; 태도', example: ['他清楚地说明了自己的立场。', 'Tā qīngchǔ de shuōmíng le zìjǐ de lìchǎng.', 'He clearly explained his position.'], koreanExample: '그는 자신의 입장을 분명히 설명했습니다.' },
      { id: 'word-li-duli-expansion', hanzi: '独立', pinyin: 'dúlì', gloss: 'independent; independence', hskLevel: 'Related', koreanGloss: '독립하다; 독립', example: ['孩子慢慢学会了独立。', 'Háizi mànmàn xuéhuì le dúlì.', 'The child gradually learned to be independent.'], koreanExample: '아이는 조금씩 독립하는 법을 배웠습니다.' },
      { id: 'word-li-like-expansion', hanzi: '立刻', pinyin: 'lìkè', gloss: 'immediately; at once', hskLevel: 'Related', koreanGloss: '즉시; 곧바로', example: ['请立刻离开这里。', 'Qǐng lìkè líkāi zhèlǐ.', 'Please leave here immediately.'], koreanExample: '여기서 즉시 나가 주세요.' },
    ],
  },
  {
    id: 'family-fan-hsk6-expansion', sortOrder: 110,
    root: { id: 'char-fan-expansion', hanzi: '范', pinyin: 'fàn', gloss: 'model; example; scope' },
    description: 'Words for examples, models, standards, and boundaries.', koreanDescription: '사례, 모범, 기준과 범위를 나타내는 단어들입니다.',
    note: '范 offers a model to follow, an example to study, or a boundary that defines a scope.', koreanNote: '范은 따라 배울 모범, 살펴볼 사례, 그리고 범위를 정하는 경계를 보여 줍니다.',
    sourceIds: ['hsk-6-official-syllabus', 'hsk-6-exclusive-mirror'],
    words: [
      { id: 'word-fan-fanli-expansion', hanzi: '范例', pinyin: 'fànlì', gloss: 'example; model case', hskLevel: 'HSK 6', koreanGloss: '사례; 모범 사례', example: ['请参考下面的范例。', 'Qǐng cānkǎo xiàmiàn de fànlì.', 'Please refer to the example below.'], koreanExample: '아래 사례를 참고해 주세요.' },
      { id: 'word-fan-mofan-expansion', hanzi: '模范', pinyin: 'mófàn', gloss: 'model; exemplary', hskLevel: 'HSK 6', koreanGloss: '모범; 모범적인', example: ['她是大家学习的模范。', 'Tā shì dàjiā xuéxí de mófàn.', 'She is a model for everyone to learn from.'], koreanExample: '그녀는 모두가 배울 만한 모범입니다.' },
      { id: 'word-fan-fanwei-expansion', hanzi: '范围', pinyin: 'fànwéi', gloss: 'scope; range', hskLevel: 'Related', koreanGloss: '범위', example: ['这项服务的范围很广。', 'Zhè xiàng fúwù de fànwéi hěn guǎng.', 'The scope of this service is broad.'], koreanExample: '이 서비스의 범위는 넓습니다.' },
      { id: 'word-fan-guifan-expansion', hanzi: '规范', pinyin: 'guīfàn', gloss: 'standardize; norm; standard', hskLevel: 'Related', koreanGloss: '규범; 규범화하다', example: ['我们需要规范工作流程。', 'Wǒmen xūyào guīfàn gōngzuò liúchéng.', 'We need to standardize the work process.'], koreanExample: '업무 절차를 규범화해야 합니다.' },
      { id: 'word-fan-shifan-expansion', hanzi: '示范', pinyin: 'shìfàn', gloss: 'demonstrate; demonstration', hskLevel: 'Related', koreanGloss: '시범을 보이다; 시범', example: ['老师先给我们示范一次。', 'Lǎoshī xiān gěi wǒmen shìfàn yí cì.', 'The teacher will demonstrate once for us first.'], koreanExample: '선생님이 먼저 한 번 시범을 보여 주십니다.' },
    ],
  },
  {
    id: 'family-zheng-hsk6-expansion', sortOrder: 111,
    root: { id: 'char-zheng', hanzi: '证', pinyin: 'zhèng', gloss: 'prove; evidence; certificate' },
    description: 'Words for evidence, argument, certification, and proof.', koreanDescription: '근거, 논증, 증명서와 인증을 나타내는 단어들입니다.',
    note: '证 links an idea to the evidence, documents, and reasoning that support it.', koreanNote: '证은 생각을 뒷받침하는 근거, 문서와 논리로 연결해 줍니다.',
    sourceIds: ['hsk-6-official-syllabus', 'hsk-6-exclusive-mirror'],
    words: [
      { id: 'word-zheng-lunzheng-expansion', hanzi: '论证', pinyin: 'lùnzhèng', gloss: 'demonstrate; argue; argument', hskLevel: 'HSK 6', koreanGloss: '논증하다; 논증', example: ['文章需要进一步论证这个观点。', 'Wénzhāng xūyào jìnyíbù lùnzhèng zhège guāndiǎn.', 'The article needs to argue this point further.'], koreanExample: '글에서 이 관점을 더 논증해야 합니다.' },
      { id: 'word-zheng-zhengju-expansion', hanzi: '证据', pinyin: 'zhèngjù', gloss: 'evidence; proof', hskLevel: 'Related', koreanGloss: '증거; 근거', example: ['目前还没有足够的证据。', 'Mùqián hái méiyǒu zúgòu de zhèngjù.', 'There is not enough evidence yet.'], koreanExample: '아직 충분한 근거가 없습니다.' },
      { id: 'word-zheng-zhengci-expansion', hanzi: '证词', pinyin: 'zhèngcí', gloss: 'testimony', hskLevel: 'Related', koreanGloss: '증언', example: ['证人的证词很重要。', 'Zhèngrén de zhèngcí hěn zhòngyào.', 'The witness’s testimony is important.'], koreanExample: '증인의 증언이 중요합니다.' },
      { id: 'word-zheng-zhengshu-expansion', hanzi: '证书', pinyin: 'zhèngshū', gloss: 'certificate; diploma', hskLevel: 'Related', koreanGloss: '증명서; 자격증', example: ['她拿到了语言证书。', 'Tā ná dào le yǔyán zhèngshū.', 'She received a language certificate.'], koreanExample: '그녀는 어학 자격증을 받았습니다.' },
      { id: 'word-zheng-renzheng-expansion', hanzi: '认证', pinyin: 'rènzhèng', gloss: 'certify; certification', hskLevel: 'Related', koreanGloss: '인증하다; 인증', example: ['这个产品通过了安全认证。', 'Zhège chǎnpǐn tōngguò le ānquán rènzhèng.', 'This product passed safety certification.'], koreanExample: '이 제품은 안전 인증을 통과했습니다.' },
    ],
  },
  {
    id: 'family-jian-hsk6-expansion', sortOrder: 112,
    root: { id: 'char-jian-build-expansion', hanzi: '建', pinyin: 'jiàn', gloss: 'build; establish' },
    description: 'Words for rebuilding, construction, creation, and public development.', koreanDescription: '재건, 건설, 창조와 사회 발전을 나타내는 단어들입니다.',
    note: '建 turns the idea of building into structures, public development, creation, and rebuilding.', koreanNote: '建은 무언가를 세우는 일에서 건축, 건설, 창조와 재건으로 이어집니다.',
    sourceIds: ['hsk-6-official-syllabus', 'hsk-6-exclusive-mirror'],
    words: [
      { id: 'word-jian-chongjian-expansion', hanzi: '重建', pinyin: 'chóngjiàn', gloss: 'rebuild; reconstruction', hskLevel: 'HSK 6', koreanGloss: '재건하다; 재건', example: ['城市正在重建老街。', 'Chéngshì zhèngzài chóngjiàn lǎojiē.', 'The city is rebuilding the old street.'], koreanExample: '도시가 오래된 거리를 재건하고 있습니다.' },
      { id: 'word-jian-jianshe-expansion', hanzi: '建设', pinyin: 'jiànshè', gloss: 'construct; construction; develop', hskLevel: 'Related', koreanGloss: '건설하다; 건설', example: ['我们一起建设更好的社区。', 'Wǒmen yìqǐ jiànshè gèng hǎo de shèqū.', 'Let us build a better community together.'], koreanExample: '더 나은 지역 사회를 함께 만들어 갑시다.' },
      { id: 'word-jian-jianzhu-expansion', hanzi: '建筑', pinyin: 'jiànzhù', gloss: 'building; architecture', hskLevel: 'Related', koreanGloss: '건축; 건물', example: ['这座建筑有一百年的历史。', 'Zhè zuò jiànzhù yǒu yì bǎi nián de lìshǐ.', 'This building has a hundred-year history.'], koreanExample: '이 건물은 100년의 역사를 가지고 있습니다.' },
      { id: 'word-jian-jianzao-expansion', hanzi: '建造', pinyin: 'jiànzào', gloss: 'build; construct', hskLevel: 'Related', koreanGloss: '건조하다; 건설하다', example: ['这座桥用了三年建造。', 'Zhè zuò qiáo yòng le sān nián jiànzào.', 'It took three years to build this bridge.'], koreanExample: '이 다리를 짓는 데 3년이 걸렸습니다.' },
      { id: 'word-jian-chuangjian-expansion', hanzi: '创建', pinyin: 'chuàngjiàn', gloss: 'create; establish', hskLevel: 'Related', koreanGloss: '창조하다; 설립하다', example: ['他们创建了一个学习平台。', 'Tāmen chuàngjiàn le yí ge xuéxí píngtái.', 'They created a learning platform.'], koreanExample: '그들은 학습 플랫폼을 만들었습니다.' },
    ],
  },
  {
    id: 'family-xie-hsk6-expansion', sortOrder: 113,
    root: { id: 'char-xie-expansion', hanzi: '协', pinyin: 'xié', gloss: 'cooperate; coordinate' },
    description: 'Words for negotiation, coordination, assistance, and agreement.', koreanDescription: '협상, 협력, 지원과 합의를 나타내는 단어들입니다.',
    note: '协 keeps several people moving together through help, coordination, negotiation, and agreement.', koreanNote: '协은 여러 사람이 도움, 조정, 협상과 합의를 통해 함께 움직이는 모습을 보여 줍니다.',
    sourceIds: ['hsk-6-official-syllabus', 'hsk-6-exclusive-mirror'],
    words: [
      { id: 'word-xie-xieshang-expansion', hanzi: '协商', pinyin: 'xiéshāng', gloss: 'negotiate; consult', hskLevel: 'HSK 6', koreanGloss: '협상하다; 협의하다', example: ['双方正在协商解决办法。', 'Shuāngfāng zhèngzài xiéshāng jiějué bànfǎ.', 'Both sides are negotiating a solution.'], koreanExample: '양측이 해결 방법을 협의하고 있습니다.' },
      { id: 'word-xie-xietong-expansion', hanzi: '协同', pinyin: 'xiétóng', gloss: 'coordinate; collaborate', hskLevel: 'HSK 6', koreanGloss: '협동하다; 협력하다', example: ['几个部门协同完成了任务。', 'Jǐ ge bùmén xiétóng wánchéng le rènwu.', 'Several departments completed the task together.'], koreanExample: '여러 부서가 협력해 과제를 완수했습니다.' },
      { id: 'word-xie-xiezhu-expansion', hanzi: '协助', pinyin: 'xiézhù', gloss: 'assist; help', hskLevel: 'Related', koreanGloss: '협조하다; 돕다', example: ['感谢你协助我们的工作。', 'Gǎnxiè nǐ xiézhù wǒmen de gōngzuò.', 'Thank you for assisting our work.'], koreanExample: '우리 일을 도와주셔서 감사합니다.' },
      { id: 'word-xie-xieyi-expansion', hanzi: '协议', pinyin: 'xiéyì', gloss: 'agreement; protocol', hskLevel: 'Related', koreanGloss: '협정; 합의서', example: ['双方签署了合作协议。', 'Shuāngfāng qiānshǔ le hézuò xiéyì.', 'Both sides signed a cooperation agreement.'], koreanExample: '양측이 협력 협정을 체결했습니다.' },
      { id: 'word-xie-xietiao-expansion', hanzi: '协调', pinyin: 'xiétiáo', gloss: 'coordinate; coordinate with', hskLevel: 'Related', koreanGloss: '조정하다; 협의하다', example: ['请协调好会议时间。', 'Qǐng xiétiáo hǎo huìyì shíjiān.', 'Please coordinate the meeting time.'], koreanExample: '회의 시간을 잘 조정해 주세요.' },
    ],
  },
]

export const contentExpansion = {
  characters: maps.filter((map) => !existingRootIds.has(map.root.id)).map((map): Character => ({
    id: map.root.id,
    hanzi: map.root.hanzi,
    pinyin: map.root.pinyin,
    toneNumber: toneNumbers(map.root.pinyin)[0] ?? 5,
    toneMark: map.root.pinyin,
    gloss: map.root.gloss,
    audioKey: `root-${map.root.id.replace(/^char-/, '')}`,
  })),
  families: maps.map(makeFamily),
  words: maps.flatMap((map) => map.words.map((word) => makeWord(map, word))),
}
