import type { Family, Word } from './types'
import type { ExplanationLanguage } from '../hooks/useExplanationLanguage'

export const previewCopy = {
  en: {
    previewLabel: 'Language preview · explanation layer',
    status: 'Korean pilot translations are available for the first three word maps.',
    languageLabel: 'Explanation language',
    english: 'English',
    korean: '한국어',
    library: 'Library',
    detail: 'Map detail',
    editorialEyebrow: 'Editorial Atlas · iPad-first',
    heroTitleFirst: 'See the words',
    heroTitleSecond: 'connect.',
    heroDescription: 'Browse Mandarin through small, memorable word maps. Start with one character and follow where it leads.',
    curatedMaps: 'Curated maps',
    featuredFamily: 'Featured map',
    root: 'root',
    continueLearning: 'Continue learning',
    savedFamilies: 'Saved maps',
    yourShelf: 'Your shelf',
    reviewGently: 'Review gently',
    keepTheThread: 'Keep the thread.',
    returnToWords: 'Return to a few words while they are still warm.',
    startReview: 'Start review →',
    explore: 'Explore the collection',
    moreWays: 'More ways in.',
    openFamily: 'Open map',
    previewLibrary: 'Preview library',
    familyMap: 'Character Constellation · word map',
    oneCharacter: 'One character, many directions',
    followFamily: 'Follow the map.',
    familyNote: 'Map note',
    connectedWords: 'connected words',
    selectedWord: 'Selected word',
    inContext: 'In context',
    saveFamily: '♡ Save map',
    savedFamily: '♥ Saved',
    saveWord: '♡ Save',
    savedWord: '♥ Saved',
    markLearned: 'Mark learned',
    learned: '✓ Learned',
    playAudio: 'Play audio for',
    openFamilyDetail: 'Open map detail for',
  },
  ko: {
    previewLabel: '언어 미리보기 · 설명 레이어',
    status: '처음 세 개의 단어 지도에 한국어 번역이 적용되어 있습니다.',
    languageLabel: '설명 언어',
    english: 'English',
    korean: '한국어',
    library: '라이브러리',
    detail: '단어 지도 상세',
    editorialEyebrow: '에디토리얼 아틀라스 · iPad 우선',
    heroTitleFirst: '단어의 연결을',
    heroTitleSecond: '살펴보세요.',
    heroDescription: '작고 기억하기 쉬운 단어 지도를 통해 중국어를 살펴보세요. 한 글자에서 시작해 연결되는 단어를 따라가 보세요.',
    curatedMaps: '엄선한 단어 지도',
    featuredFamily: '추천 단어 지도',
    root: '기준 글자',
    continueLearning: '학습 이어 하기',
    savedFamilies: '저장한 단어 지도',
    yourShelf: '내 서재',
    reviewGently: '부담 없이 복습하기',
    keepTheThread: '연결을 이어 가세요.',
    returnToWords: '아직 기억이 생생할 때 몇 단어를 다시 살펴보세요.',
    startReview: '복습 시작 →',
    explore: '전체 컬렉션 살펴보기',
    moreWays: '다른 방법으로 시작하기.',
    openFamily: '단어 지도 열기',
    previewLibrary: '미리보기 라이브러리',
    familyMap: '문자 별자리 · 단어 지도',
    oneCharacter: '한 글자에서 여러 방향으로',
    followFamily: '연결된 단어를 따라가 보세요.',
    familyNote: '단어 연결 설명',
    connectedWords: '연결된 단어',
    selectedWord: '선택한 단어',
    inContext: '문맥 속에서 보기',
    saveFamily: '♡ 단어 지도 저장',
    savedFamily: '♥ 저장됨',
    saveWord: '♡ 저장',
    savedWord: '♥ 저장됨',
    markLearned: '배운 단어로 표시',
    learned: '✓ 배운 단어',
    playAudio: '오디오 재생',
    openFamilyDetail: '단어 지도 상세 열기',
  },
} as const

export const siteCopy = {
  en: {
    app: {
      brandLabel: 'Go to maps',
      primaryNav: 'Primary navigation',
      mobileNav: 'Mobile navigation',
      nav: { families: 'Maps', review: 'Review', saved: 'Saved', search: 'Search' },
      languageLabel: 'Explanation language',
      english: 'English',
      korean: '한국어',
      useLight: 'Use light mode',
      useDark: 'Use dark mode',
      light: 'Light mode',
      dark: 'Dark mode',
      playing: 'Playing',
      hearIt: 'Hear it',
      previewVoice: 'Preview voice',
      tagline: 'See the words connect.',
      readGuide: 'Read the guide',
    },
    library: {
      eyebrow: 'Editorial Atlas · HSK 1–6 verified scope',
      titleFirst: 'See the words',
      titleSecond: 'connect.',
      description: 'Browse beginner Mandarin through small, memorable word maps. Start with one character and follow where it leads.',
      curatedMaps: 'curated word maps',
      filterLabel: 'Filter word maps',
      filters: { all: 'All maps', hsk: 'HSK 1 core', hsk2: 'HSK 2 verified', hsk3: 'HSK 3 verified', hsk4: 'HSK 4 verified', hsk5: 'HSK 5 verified', hsk6: 'HSK 6 verified', saved: 'Saved', recent: 'Recently viewed' },
      featured: 'Featured map',
      openMap: 'Open map',
      sidebarLabel: 'Your learning shelf',
      continueLearning: 'Continue learning',
      startLearning: 'Start learning',
      learned: 'learned',
      continue: 'Continue',
      yourShelf: 'Your shelf',
      savedMaps: 'Saved maps',
      savePrompt: 'Save a map when its connections feel useful.',
      reviewGently: 'Review gently',
      keepThread: 'Keep the thread.',
      returnToWords: 'Return to a few words while they are still warm.',
      returnToMap: 'Return to a map',
      explore: 'Explore the collection',
      moreWays: 'More ways in.',
      mapCount: 'curated maps',
      emptyEyebrow: 'Nothing here yet',
      emptyTitle: 'Your shelf is waiting.',
      emptyDescription: 'Save a map or open one to start building a small personal reference shelf.',
      browseAll: 'Browse all maps',
    },
    card: { wordMap: 'Word map', connectedWords: 'connected words', openMap: 'Open map', save: 'Save map', remove: 'Remove map from saved' },
    map: { root: 'root', wordMap: 'word map', showStroke: 'Show stroke order for', playRoot: 'Play audio for root' },
    quick: { from: 'From', close: 'Close word view', play: 'Play audio for', inContext: 'In context', save: 'Save word', saved: 'Saved word', learned: 'Mark learned', markedLearned: 'Learned', wholeMap: 'See the whole map' },
    detail: { back: 'All maps', wordMap: 'Word map', save: 'Save map', saved: 'Saved', playRoot: 'Play audio for root', directions: 'One character, many directions', follow: 'Follow the map.', learned: 'learned', note: 'Map note', closerLook: 'Take a closer look', connectedWords: 'Connected words', markLearned: 'Mark learned', previous: 'Previous map', next: 'Next map' },
    saved: { eyebrow: 'A low-pressure revisit space', title: 'Your shelf.', description: 'Keep the maps and words you want to see again.', emptyEyebrow: 'Nothing saved yet', emptyTitle: 'Your shelf is waiting.', emptyDescription: 'Save a map when its connections feel useful. Your choices stay on this device.', browse: 'Browse maps', savedMaps: 'Saved maps', mapsToReturn: 'Maps to return to', savedWords: 'Saved words', smallAnchors: 'Small anchors', recent: 'Recently viewed', continue: 'Continue where you left off' },
    search: { eyebrow: 'Find your way in', title: 'Search the map.', description: 'Try a character, tone-marked pinyin, or an English or Korean explanation.', label: 'Search Chinese, pinyin, English, or Korean', placeholder: 'Search words, pinyin, or an explanation', clear: 'Clear search', word: 'word', words: 'words', map: 'map', maps: 'maps', openMap: 'Open map', noMatches: 'No matches', start: 'Start with a word', nothing: 'Nothing matched', tryFewer: 'Try fewer letters, unaccented pinyin, or a shorter explanation.', searchAcross: 'Search across Chinese, pinyin, and explanations in the library.', browse: 'Browse all maps' },
    review: { eyebrow: 'A small, low-pressure loop', titleFirst: 'Make a little', titleSecond: 'space to remember.', description: 'Listen, notice the recurring character, and move on when the word feels familiar.', ready: 'ready now', savedSource: 'From your saved words', starterSource: 'A starter set from the library', learned: 'learned', play: 'Play audio for', context: 'See it in context', again: 'Needs another look', good: 'I know it', manual: 'Mark learned manually', marked: 'Marked learned', smallSet: 'Your small set', keepThread: 'Keep the thread.', learnedMark: 'Learned', newReady: 'New · ready now', readyAgain: 'Ready for another look', nextTomorrow: 'Next review tomorrow', nextDays: 'Next review in', previous: 'Previous' },
    guide: { eyebrow: 'A two-minute orientation', titleFirst: 'How to read', titleSecond: 'a word map.', description: 'Zìmài helps you see a recurring character first, then notice how each compound turns toward a new meaning.', stepsLabel: 'How to read a word map', start: 'Start with the anchor.', startText: 'The large character is the visual root. Hear it, read its pinyin, and take in the short explanation.', branches: 'Follow the branches.', branchesText: 'Look for the recurring character inside each compound. The other character points the meaning in a new direction.', labels: 'Keep the labels honest.', labelsText: 'HSK 1 marks the selected source list. Related marks a useful extension, not a claim about the curriculum.', context: 'See one in context', mapIsLesson: 'The map is the lesson.', openFull: 'Open full map', longer: 'Want the longer version?', built: 'Read how the collection is built.', sourceNotes: 'Content and source notes' },
    about: { eyebrow: 'Content and source notes', titleFirst: 'A small,', titleSecond: 'deliberate collection.', description: 'Zìmài is designed as a visual reference, not a claim to cover every beginner word or every HSK version.', intro: 'A map is a curated teaching grouping: a shared character, morpheme, or a beginner-useful relationship. It does not automatically mean historical etymology.', policy: 'Content policy', policyTitle: 'Curate the connection first.', policyText: 'Each map is edited for visual usefulness. HSK membership stays separate from the relationship, and useful outside-list words are labeled Related.', audio: 'Audio', audioTitle: 'Pronunciation stays close.', audioText: 'Reviewed native recordings remain the goal. Until one is ready, the browser selects its best available Mandarin device voice.', local: 'Local by design', localTitle: 'Your shelf stays yours.', localText: 'Saved, learned, and recently viewed states live in versioned local storage. There are no accounts, streaks, or cloud profiles in this first slice.', source: 'Current prototype source', version: 'Version', level: 'Level', license: 'License', browse: 'Browse the maps', guide: 'Read the guide' },
  },
  ko: {
    app: {
      brandLabel: '단어 지도 열기',
      primaryNav: '주요 메뉴',
      mobileNav: '모바일 메뉴',
      nav: { families: '단어 지도', review: '복습', saved: '저장', search: '검색' },
      languageLabel: '설명 언어',
      english: 'English',
      korean: '한국어',
      useLight: '라이트 모드 사용',
      useDark: '다크 모드 사용',
      light: '라이트 모드',
      dark: '다크 모드',
      playing: '재생 중',
      hearIt: '들어 보기',
      previewVoice: '미리 듣기',
      tagline: '단어가 연결되는 모습을 보세요.',
      readGuide: '가이드 읽기',
    },
    library: {
      eyebrow: '에디토리얼 아틀라스 · HSK 1–6 검증 범위',
      titleFirst: '단어의 연결을',
      titleSecond: '살펴보세요.',
      description: '작고 기억하기 쉬운 단어 지도를 통해 중국어를 살펴보세요. 한 글자에서 시작해 연결되는 단어를 따라가 보세요.',
      curatedMaps: '엄선한 단어 지도',
      filterLabel: '단어 지도 필터',
      filters: { all: '전체 지도', hsk: 'HSK 1 핵심', hsk2: 'HSK 2 검증됨', hsk3: 'HSK 3 검증됨', hsk4: 'HSK 4 검증됨', hsk5: 'HSK 5 검증됨', hsk6: 'HSK 6 검증됨', saved: '저장', recent: '최근 본 지도' },
      featured: '추천 단어 지도',
      openMap: '지도 열기',
      sidebarLabel: '나의 학습 서재',
      continueLearning: '학습 이어 하기',
      startLearning: '학습 시작하기',
      learned: '학습 완료',
      continue: '이어 하기',
      yourShelf: '내 서재',
      savedMaps: '저장한 지도',
      savePrompt: '연결이 유용하게 느껴지는 지도는 저장해 두세요.',
      reviewGently: '부담 없이 복습하기',
      keepThread: '연결을 이어 가세요.',
      returnToWords: '기억이 생생할 때 몇 단어를 다시 살펴보세요.',
      returnToMap: '지도로 돌아가기',
      explore: '전체 컬렉션 살펴보기',
      moreWays: '다른 방법으로 시작하기.',
      mapCount: '개의 단어 지도',
      emptyEyebrow: '아직 아무것도 없습니다',
      emptyTitle: '서재가 기다리고 있습니다.',
      emptyDescription: '지도를 저장하거나 열어 나만의 참고 서재를 만들어 보세요.',
      browseAll: '전체 지도 보기',
    },
    card: { wordMap: '단어 지도', connectedWords: '개의 연결된 단어', openMap: '지도 열기', save: '지도 저장', remove: '저장에서 지도 삭제' },
    map: { root: '기준 글자', wordMap: '단어 지도', showStroke: '필순 보기', playRoot: '기준 글자 오디오 재생' },
    quick: { from: '', close: '단어 보기 닫기', play: '오디오 재생', inContext: '문맥 속에서 보기', save: '단어 저장', saved: '단어 저장됨', learned: '배운 단어로 표시', markedLearned: '배운 단어', wholeMap: '전체 지도 보기' },
    detail: { back: '전체 지도', wordMap: '단어 지도', save: '지도 저장', saved: '저장됨', playRoot: '기준 글자 오디오 재생', directions: '한 글자에서 여러 방향으로', follow: '연결된 단어를 따라가 보세요.', learned: '학습 완료', note: '단어 연결 설명', closerLook: '자세히 살펴보기', connectedWords: '연결된 단어', markLearned: '배운 단어로 표시', previous: '이전 지도', next: '다음 지도' },
    saved: { eyebrow: '부담 없이 다시 보는 공간', title: '내 서재.', description: '다시 보고 싶은 지도와 단어를 모아 두세요.', emptyEyebrow: '아직 저장한 것이 없습니다', emptyTitle: '서재가 기다리고 있습니다.', emptyDescription: '연결이 유용하게 느껴지는 지도는 저장해 두세요. 선택한 내용은 이 기기에만 저장됩니다.', browse: '지도 찾아보기', savedMaps: '저장한 지도', mapsToReturn: '다시 볼 지도', savedWords: '저장한 단어', smallAnchors: '작은 기준점', recent: '최근 본 지도', continue: '이어 보기' },
    search: { eyebrow: '원하는 단어로 들어가기', title: '단어 지도 검색.', description: '한자, 성조가 표시된 병음, 영어 또는 한국어 설명으로 검색해 보세요.', label: '한자, 병음, 영어 또는 한국어 검색', placeholder: '단어, 병음 또는 설명 검색', clear: '검색어 지우기', word: '개 단어', words: '개 단어', map: '개 지도', maps: '개 지도', openMap: '지도 열기', noMatches: '일치하는 결과 없음', start: '단어로 시작하기', nothing: '일치하는 항목이 없습니다', tryFewer: '검색어를 줄이거나 성조 없는 병음, 짧은 설명으로 다시 시도해 보세요.', searchAcross: '한자, 병음, 영어와 한국어 설명을 검색할 수 있습니다.', browse: '전체 지도 보기' },
    review: { eyebrow: '작고 부담 없는 복습 루프', titleFirst: '기억할 공간을', titleSecond: '조금 만들어 보세요.', description: '듣고, 반복되는 글자를 살펴보고, 익숙해지면 다음 단어로 넘어가세요.', ready: '지금 복습할 단어', savedSource: '저장한 단어에서', starterSource: '라이브러리의 시작 세트', learned: '학습 완료', play: '오디오 재생', context: '문맥에서 보기', again: '한 번 더 보기', good: '알겠어요', manual: '배운 단어로 직접 표시', marked: '배운 단어로 표시됨', smallSet: '나의 작은 세트', keepThread: '연결을 이어 가세요.', learnedMark: '학습 완료', newReady: '새 단어 · 지금 시작', readyAgain: '다시 볼 시간입니다', nextTomorrow: '내일 다시 보기', nextDays: '일 후 다시 보기', previous: '이전' },
    guide: { eyebrow: '2분 안내', titleFirst: '단어 지도를', titleSecond: '읽는 방법.', description: 'Zìmài는 반복되는 글자를 먼저 보고, 각 단어가 어떻게 새로운 의미로 이어지는지 살펴보도록 도와줍니다.', stepsLabel: '단어 지도 읽는 방법', start: '기준점에서 시작하기', startText: '큰 글자가 시각적 기준점입니다. 소리를 듣고 병음을 읽은 뒤 짧은 설명을 살펴보세요.', branches: '연결을 따라가기', branchesText: '각 단어 안에서 반복되는 글자를 찾아보세요. 다른 글자가 의미를 새로운 방향으로 이끕니다.', labels: '표시를 정확하게 보기', labelsText: 'HSK 1은 선택한 자료 목록을 나타냅니다. 관련 단어는 유용한 확장 단어라는 뜻이며, 교육과정에 포함된다는 의미는 아닙니다.', context: '문맥 속에서 보기', mapIsLesson: '지도가 곧 학습입니다.', openFull: '전체 지도 열기', longer: '더 자세히 보고 싶나요?', built: '컬렉션이 만들어진 방식을 읽어 보세요.', sourceNotes: '콘텐츠와 출처 정보' },
    about: { eyebrow: '콘텐츠와 출처 정보', titleFirst: '작고,', titleSecond: '신중하게 고른 컬렉션.', description: 'Zìmài는 모든 초급 단어나 모든 HSK 버전을 다룬다고 주장하기보다, 시각적 참고 자료로 설계되었습니다.', intro: '지도는 공통 글자, 형태소 또는 초급 학습에 유용한 관계를 바탕으로 큐레이션한 학습 묶음입니다. 역사적 어원 관계를 자동으로 의미하지는 않습니다.', policy: '콘텐츠 원칙', policyTitle: '연결을 먼저 큐레이션합니다.', policyText: '각 지도는 시각적으로 유용하도록 편집됩니다. HSK 포함 여부와 단어 간 관계는 별도로 관리하며, 목록 밖의 유용한 단어는 관련 단어로 표시합니다.', audio: '오디오', audioTitle: '발음을 가까이에서.', audioText: '검토된 원어민 녹음이 목표입니다. 녹음이 준비되기 전에는 브라우저에서 가장 적합한 중국어 기기 음성을 선택합니다.', local: '로컬 중심 설계', localTitle: '나의 서재는 나의 것.', localText: '저장, 학습 완료, 최근 본 기록은 버전이 관리되는 로컬 저장소에 보관됩니다. 현재 단계에는 계정, 연속 학습 기록, 클라우드 프로필이 없습니다.', source: '현재 프로토타입 출처', version: '버전', level: '레벨', license: '라이선스', browse: '지도 둘러보기', guide: '가이드 읽기' },
  },
} as const

const familyTranslations: Record<string, { title: string; shortDescription: string; meaningNote: string }> = {
  'family-xue': {
    title: '学',
    shortDescription: '공부와 학습에 연결된 단어들입니다.',
    meaningNote: '学은 배움, 공부, 또는 교육과 관련된 장소를 나타낼 때 자주 쓰입니다.',
  },
  'family-dian': {
    title: '电',
    shortDescription: '전기와 현대 생활에 관련된 일상 단어들입니다.',
    meaningNote: '电은 전기가 들어가는 기기와 통신에 관한 익숙한 단어들을 연결해 주는 기준점입니다.',
  },
  'family-ren': {
    title: '人',
    shortDescription: '사람을 더 구체적으로 표현할 때 쓰는 단어들입니다.',
    meaningNote: '人은 사람을 뜻하며, 사람을 설명하는 다양한 단어에서 분명한 기준점이 됩니다.',
  },
}

const rootGlosses: Record<string, string> = {
  'char-xue': '공부하다; 배우다',
  'char-dian': '전기; 전기의',
  'char-ren': '사람; 사람들',
}

const wordTranslations: Record<string, { gloss: string; example: string; extensionReason?: string }> = {
  'word-xuesheng': { gloss: '학생', example: '나는 학생입니다.' },
  'word-xuexiao': { gloss: '학교', example: '나는 학교에서 공부합니다.' },
  'word-xuexi': { gloss: '공부하다; 배우다', example: '나는 중국어 공부를 좋아합니다.' },
  'word-daxue': { gloss: '대학교', example: '나는 대학교에서 공부합니다.', extensionReason: '学이 포함된 단어를 이해하는 데 도움이 되는 확장 단어입니다. 선정된 HSK 자료와의 일치 여부를 확인해야 합니다.' },
  'word-shuxue': { gloss: '수학', example: '나는 수학을 좋아합니다.', extensionReason: '学이 포함된 단어를 이해하는 데 도움이 되는 확장 단어입니다. 선정된 HSK 자료와의 일치 여부를 확인해야 합니다.' },
  'word-dianhua': { gloss: '전화; 전화기', example: '이것은 제 전화번호입니다.' },
  'word-diannao': { gloss: '컴퓨터', example: '나는 컴퓨터로 공부합니다.', extensionReason: '현대 생활에서 자주 쓰이는 확장 단어입니다. 선정된 HSK 자료와의 일치 여부를 확인해야 합니다.' },
  'word-dianshi': { gloss: '텔레비전', example: '나는 저녁에 텔레비전을 봅니다.' },
  'word-dianying': { gloss: '영화', example: '우리는 함께 영화를 봅니다.' },
  'word-diantij': { gloss: '엘리베이터', example: '엘리베이터는 저쪽에 있습니다.', extensionReason: '일상생활에 유용한 확장 단어입니다. 선정된 HSK 자료와의 일치 여부를 확인해야 합니다.' },
  'word-laoren': { gloss: '노인; 나이 든 사람', example: '그 노인은 매일 산책을 합니다.', extensionReason: '사람을 구체적으로 묘사하는 데 유용한 확장 단어입니다. 선정된 HSK 자료와의 일치 여부를 확인해야 합니다.' },
  'word-geren': { gloss: '개인; 개인의', example: '이것은 제 개인적인 문제입니다.', extensionReason: '人이 포함된 단어를 이해하는 데 도움이 되는 확장 단어입니다. 선정된 HSK 자료와의 일치 여부를 확인해야 합니다.' },
  'word-waiguoren': { gloss: '외국인', example: '그녀는 외국인이고 지금 중국에 살고 있습니다.', extensionReason: '구 단위로 이해하면 유용한 확장 표현입니다. 선정된 HSK 자료와의 일치 여부를 확인해야 합니다.' },
  'word-renmen': { gloss: '사람들; 집단으로서의 사람들', example: '사람들은 모두 주말을 좋아합니다.', extensionReason: '人이 포함된 사람 관련 확장 단어입니다. 선정된 HSK 자료와의 일치 여부를 확인해야 합니다.' },
  'word-bieren': { gloss: '다른 사람들; 남들', example: '다른 사람들은 공부하고 있습니다.', extensionReason: '人이 포함된 사람 관련 확장 단어입니다. 선정된 HSK 자료와의 일치 여부를 확인해야 합니다.' },
}

export function localizedFamilyTitle(family: Family, language: ExplanationLanguage): string {
  const rootTitle = family.title.replace(/\s+family$/i, '')
  return language === 'ko' ? familyTranslations[family.id]?.title ?? rootTitle : rootTitle
}

export function localizedFamilyDescription(family: Family, language: ExplanationLanguage): string {
  return language === 'ko' ? familyTranslations[family.id]?.shortDescription ?? family.shortDescription : family.shortDescription
}

export function localizedFamilyNote(family: Family, language: ExplanationLanguage): string {
  return language === 'ko' ? familyTranslations[family.id]?.meaningNote ?? family.meaningNote : family.meaningNote
}

export function localizedRootGloss(rootId: string, fallback: string, language: ExplanationLanguage): string {
  return language === 'ko' ? rootGlosses[rootId] ?? fallback : fallback
}

export function localizedWordGloss(word: Word, language: ExplanationLanguage): string {
  return language === 'ko' ? wordTranslations[word.id]?.gloss ?? word.gloss : word.gloss
}

export function localizedExampleGloss(word: Word, fallback: string, language: ExplanationLanguage): string {
  return language === 'ko' ? wordTranslations[word.id]?.example ?? fallback : fallback
}

export function localizedExtensionReason(word: Word, language: ExplanationLanguage): string | undefined {
  return language === 'ko' ? wordTranslations[word.id]?.extensionReason ?? word.extensionReason : word.extensionReason
}
