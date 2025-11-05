export interface Quest {
  id: string;
  title: string;
  description: string;
  icon: string;
  reward: { xp: number; coins: number; gems?: number };
  requirements: { type: string; count: number; current: number };
  completed: boolean;
}

export interface ShopItem {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: 'coins' | 'gems';
  icon: string;
  type: 'booster' | 'cosmetic' | 'premium' | 'avatar' | 'badge';
  rarity?: 'common' | 'rare' | 'epic' | 'legendary';
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  progress: number;
  target: number;
  unlocked: boolean;
  reward?: { coins: number; xp: number };
}

export interface MiniGame {
  id: string;
  name: string;
  description: string;
  icon: string;
  cost: number;
  minReward: number;
  maxReward: number;
  type: 'slots' | 'wheel' | 'cards' | 'dice' | 'memory' | 'puzzle';
}

export const quests: Quest[] = [
  { id: 'q1', title: 'Начинающий полиглот', description: 'Завершите 5 уроков', icon: '📚', reward: { xp: 100, coins: 50 }, requirements: { type: 'lessons', count: 5, current: 0 }, completed: false },
  { id: 'q2', title: 'Марафонец', description: 'Поддерживайте streak 7 дней', icon: '🔥', reward: { xp: 200, coins: 100 }, requirements: { type: 'streak', count: 7, current: 7 }, completed: true },
  { id: 'q3', title: 'Мастер слов', description: 'Выучите 50 новых слов', icon: '📖', reward: { xp: 150, coins: 75 }, requirements: { type: 'words', count: 50, current: 32 }, completed: false },
  { id: 'q4', title: 'Социальный', description: 'Отправьте 20 сообщений в чате', icon: '💬', reward: { xp: 50, coins: 25 }, requirements: { type: 'messages', count: 20, current: 8 }, completed: false },
  { id: 'q5', title: 'Счастливчик', description: 'Выиграйте в казино 3 раза', icon: '🎰', reward: { xp: 100, coins: 150 }, requirements: { type: 'wins', count: 3, current: 1 }, completed: false },
  { id: 'q6', title: 'Покупатель', description: 'Совершите 5 покупок в магазине', icon: '🛍️', reward: { xp: 80, coins: 40, gems: 5 }, requirements: { type: 'purchases', count: 5, current: 2 }, completed: false },
  { id: 'q7', title: 'Перфекционист', description: 'Пройдите урок без ошибок', icon: '⭐', reward: { xp: 120, coins: 60 }, requirements: { type: 'perfect', count: 1, current: 0 }, completed: false },
  { id: 'q8', title: 'Коллекционер', description: 'Соберите 10 достижений', icon: '🏆', reward: { xp: 300, coins: 200, gems: 10 }, requirements: { type: 'achievements', count: 10, current: 3 }, completed: false },
];

export const shopItems: ShopItem[] = [
  { id: 's1', name: 'Восстановить сердца', description: 'Полностью восстанавливает все сердца', price: 50, currency: 'coins', icon: '❤️', type: 'booster', rarity: 'common' },
  { id: 's2', name: 'Двойной XP', description: 'Удваивает опыт на 1 час', price: 100, currency: 'coins', icon: '⚡', type: 'booster', rarity: 'rare' },
  { id: 's3', name: 'Защита streak', description: 'Защищает вашу серию на 1 день', price: 150, currency: 'coins', icon: '🛡️', type: 'booster', rarity: 'rare' },
  { id: 's4', name: 'Подсказка', description: 'Открыть правильный ответ', price: 30, currency: 'coins', icon: '💡', type: 'booster', rarity: 'common' },
  { id: 's5', name: 'Заморозка времени', description: 'Останавливает таймер на 30 секунд', price: 80, currency: 'coins', icon: '⏸️', type: 'booster', rarity: 'rare' },
  
  { id: 's6', name: 'Золотая сова', description: 'Эксклюзивный маскот', price: 500, currency: 'coins', icon: '🦉', type: 'cosmetic', rarity: 'legendary' },
  { id: 's7', name: 'Радужная рамка', description: 'Красочная рамка профиля', price: 200, currency: 'coins', icon: '🌈', type: 'cosmetic', rarity: 'epic' },
  { id: 's8', name: 'Огненный эффект', description: 'Анимация огня для streak', price: 250, currency: 'coins', icon: '🔥', type: 'cosmetic', rarity: 'epic' },
  { id: 's9', name: 'Корона чемпиона', description: 'Показывает ваш статус', price: 400, currency: 'coins', icon: '👑', type: 'cosmetic', rarity: 'legendary' },
  
  { id: 's10', name: 'Аватар Дракона', description: 'Эпический аватар дракона', price: 50, currency: 'gems', icon: '🐉', type: 'avatar', rarity: 'epic' },
  { id: 's11', name: 'Аватар Единорога', description: 'Магический единорог', price: 30, currency: 'gems', icon: '🦄', type: 'avatar', rarity: 'rare' },
  { id: 's12', name: 'Аватар Робота', description: 'Футуристический робот', price: 40, currency: 'gems', icon: '🤖', type: 'avatar', rarity: 'rare' },
  
  { id: 's13', name: 'Знак "Легенда"', description: 'Редкий значок', price: 100, currency: 'gems', icon: '⚡', type: 'badge', rarity: 'legendary' },
  { id: 's14', name: 'Знак "Герой"', description: 'Эпический значок', price: 60, currency: 'gems', icon: '🏅', type: 'badge', rarity: 'epic' },
  
  { id: 's15', name: '1000 монет', description: 'Большой пакет монет', price: 10, currency: 'gems', icon: '💰', type: 'premium', rarity: 'common' },
  { id: 's16', name: '5000 монет', description: 'Огромный пакет монет', price: 40, currency: 'gems', icon: '💎', type: 'premium', rarity: 'rare' },
  { id: 's17', name: 'Премиум месяц', description: 'Безлимитные сердца на месяц', price: 500, currency: 'coins', icon: '👑', type: 'premium', rarity: 'legendary' },
];

export const achievements: Achievement[] = [
  { id: 'a1', name: 'Первые шаги', description: 'Завершите первый урок', icon: '🎯', progress: 1, target: 1, unlocked: true, reward: { coins: 10, xp: 20 } },
  { id: 'a2', name: 'Новичок', description: 'Завершите 10 уроков', icon: '📚', progress: 8, target: 10, unlocked: false, reward: { coins: 50, xp: 100 } },
  { id: 'a3', name: 'Ученик', description: 'Завершите 50 уроков', icon: '🎓', progress: 24, target: 50, unlocked: false, reward: { coins: 200, xp: 500 } },
  { id: 'a4', name: 'Мастер', description: 'Завершите 100 уроков', icon: '🏆', progress: 24, target: 100, unlocked: false, reward: { coins: 500, xp: 1000 } },
  
  { id: 'a5', name: 'Полиглот', description: 'Изучите 3 языка', icon: '🌍', progress: 2, target: 3, unlocked: false, reward: { coins: 300, xp: 600 } },
  { id: 'a6', name: 'Лингвист', description: 'Изучите 5 языков', icon: '🗣️', progress: 2, target: 5, unlocked: false, reward: { coins: 600, xp: 1200 } },
  
  { id: 'a7', name: 'Огненная серия 7', description: 'Поддерживайте streak 7 дней', icon: '🔥', progress: 7, target: 7, unlocked: true, reward: { coins: 100, xp: 150 } },
  { id: 'a8', name: 'Огненная серия 30', description: 'Поддерживайте streak 30 дней', icon: '🔥', progress: 7, target: 30, unlocked: false, reward: { coins: 500, xp: 1000 } },
  { id: 'a9', name: 'Огненная серия 100', description: 'Поддерживайте streak 100 дней', icon: '🔥', progress: 7, target: 100, unlocked: false, reward: { coins: 2000, xp: 5000 } },
  
  { id: 'a10', name: 'Словарный запас 50', description: 'Выучите 50 слов', icon: '📖', progress: 67, target: 50, unlocked: true, reward: { coins: 80, xp: 120 } },
  { id: 'a11', name: 'Словарный запас 200', description: 'Выучите 200 слов', icon: '📚', progress: 67, target: 200, unlocked: false, reward: { coins: 300, xp: 500 } },
  { id: 'a12', name: 'Словарный запас 1000', description: 'Выучите 1000 слов', icon: '🎓', progress: 67, target: 1000, unlocked: false, reward: { coins: 1500, xp: 3000 } },
  
  { id: 'a13', name: 'Богач', description: 'Накопите 1000 монет', icon: '💰', progress: 500, target: 1000, unlocked: false, reward: { coins: 200, xp: 300 } },
  { id: 'a14', name: 'Миллионер', description: 'Накопите 10000 монет', icon: '💎', progress: 500, target: 10000, unlocked: false, reward: { coins: 2000, xp: 5000 } },
  
  { id: 'a15', name: 'Перфекционист', description: 'Пройдите 10 уроков без ошибок', icon: '⭐', progress: 3, target: 10, unlocked: false, reward: { coins: 250, xp: 400 } },
  { id: 'a16', name: 'Безупречный', description: 'Пройдите 50 уроков без ошибок', icon: '✨', progress: 3, target: 50, unlocked: false, reward: { coins: 1000, xp: 2000 } },
  
  { id: 'a17', name: 'Социальный', description: 'Отправьте 100 сообщений', icon: '💬', progress: 8, target: 100, unlocked: false, reward: { coins: 150, xp: 200 } },
  { id: 'a18', name: 'Говорун', description: 'Отправьте 1000 сообщений', icon: '🗨️', progress: 8, target: 1000, unlocked: false, reward: { coins: 500, xp: 800 } },
  
  { id: 'a19', name: 'Везунчик', description: 'Выиграйте в казино 10 раз', icon: '🎰', progress: 1, target: 10, unlocked: false, reward: { coins: 300, xp: 400 } },
  { id: 'a20', name: 'Джекпот мастер', description: 'Выиграйте в казино 100 раз', icon: '💎', progress: 1, target: 100, unlocked: false, reward: { coins: 2000, xp: 3000 } },
];

export const miniGames: MiniGame[] = [
  { id: 'g1', name: 'Слот-машина', description: 'Классические слоты 3x3', icon: '🎰', cost: 20, minReward: 0, maxReward: 200, type: 'slots' },
  { id: 'g2', name: 'Колесо фортуны', description: 'Крути и выигрывай!', icon: '🎡', cost: 50, minReward: 0, maxReward: 500, type: 'wheel' },
  { id: 'g3', name: 'Блэкджек', description: 'Классическая карточная игра', icon: '🃏', cost: 30, minReward: 0, maxReward: 300, type: 'cards' },
  { id: 'g4', name: 'Кости', description: 'Бросай кости и выигрывай', icon: '🎲', cost: 15, minReward: 0, maxReward: 150, type: 'dice' },
  { id: 'g5', name: 'Память', description: 'Найди все пары карт', icon: '🧠', cost: 25, minReward: 50, maxReward: 250, type: 'memory' },
  { id: 'g6', name: 'Пазл', description: 'Собери картинку', icon: '🧩', cost: 35, minReward: 70, maxReward: 350, type: 'puzzle' },
];

export const storiesDatabase = [
  {
    id: 'story1',
    language: 'English',
    level: 'beginner',
    title: 'A Day at the Park',
    content: `Tom wakes up early on Sunday morning. The sun is shining brightly. He decides to go to the park. 
    
    At the park, Tom sees many people. Some are jogging, others are walking their dogs. Children are playing on the swings and slides.
    
    Tom sits on a bench and reads his book. A friendly dog comes to him. Tom pets the dog and smiles. 
    
    After an hour, Tom feels hungry. He buys a sandwich from a food truck. The sandwich is delicious!
    
    Tom spends the whole afternoon at the park. He feels happy and relaxed. What a wonderful day!`,
    questions: [
      { q: 'When does Tom go to the park?', options: ['Sunday morning', 'Monday evening', 'Saturday night', 'Friday afternoon'], answer: 'Sunday morning' },
      { q: 'What does Tom do at the park?', options: ['Reads a book', 'Plays football', 'Goes swimming', 'Rides a bike'], answer: 'Reads a book' },
      { q: 'What does Tom eat?', options: ['A sandwich', 'Pizza', 'Ice cream', 'Salad'], answer: 'A sandwich' },
    ]
  },
  {
    id: 'story2',
    language: 'English',
    level: 'intermediate',
    title: 'The Job Interview',
    content: `Sarah has an important job interview today. She has been preparing for weeks. She arrives at the office building 15 minutes early.
    
    In the waiting room, Sarah reviews her notes one more time. She takes a deep breath to calm her nerves. A friendly receptionist offers her some water.
    
    "Ms. Johnson will see you now," says the receptionist. Sarah enters the interview room with confidence. She shakes hands with Ms. Johnson and sits down.
    
    The interview goes well. Sarah answers all the questions clearly and professionally. She talks about her experience and skills. Ms. Johnson seems impressed.
    
    "We'll contact you within a week," says Ms. Johnson at the end. Sarah thanks her and leaves the office feeling optimistic about her chances.`,
    questions: [
      { q: 'How early does Sarah arrive?', options: ['15 minutes', '30 minutes', '5 minutes', '1 hour'], answer: '15 minutes' },
      { q: 'How does Sarah feel during the interview?', options: ['Confident', 'Scared', 'Bored', 'Angry'], answer: 'Confident' },
      { q: 'When will they contact Sarah?', options: ['Within a week', 'Tomorrow', 'Next month', 'In 2 weeks'], answer: 'Within a week' },
    ]
  },
];

export const grammarLessons = [
  {
    id: 'gram1',
    language: 'English',
    title: 'Present Simple Tense',
    level: 'beginner',
    content: 'Used for habits, facts, and routines. Form: Subject + verb (base form)',
    examples: [
      'I work every day.',
      'She likes coffee.',
      'They play football on Sundays.',
    ],
    exercises: [
      { q: 'I ___ to school every day', options: ['go', 'goes', 'going', 'went'], answer: 'go' },
      { q: 'She ___ English very well', options: ['speaks', 'speak', 'speaking', 'spoke'], answer: 'speaks' },
    ]
  },
  {
    id: 'gram2',
    language: 'English',
    title: 'Present Continuous Tense',
    level: 'beginner',
    content: 'Used for actions happening now. Form: Subject + am/is/are + verb-ing',
    examples: [
      'I am studying right now.',
      'She is watching TV.',
      'They are playing games.',
    ],
    exercises: [
      { q: 'I ___ a book now', options: ['am reading', 'read', 'reads', 'reading'], answer: 'am reading' },
      { q: 'They ___ football at the moment', options: ['are playing', 'play', 'plays', 'played'], answer: 'are playing' },
    ]
  },
  {
    id: 'gram3',
    language: 'English',
    title: 'Past Simple Tense',
    level: 'intermediate',
    content: 'Used for completed actions in the past. Regular verbs: add -ed. Irregular verbs: special forms.',
    examples: [
      'I worked yesterday.',
      'She went to Paris last year.',
      'They watched a movie.',
    ],
    exercises: [
      { q: 'I ___ to the store yesterday', options: ['went', 'go', 'going', 'goes'], answer: 'went' },
      { q: 'She ___ a cake last night', options: ['baked', 'bake', 'baking', 'bakes'], answer: 'baked' },
    ]
  },
];

export const vocabularyCategories = [
  {
    category: 'Food & Drinks',
    language: 'English',
    words: [
      { word: 'Apple', translation: 'Яблоко', example: 'I eat an apple every day' },
      { word: 'Bread', translation: 'Хлеб', example: 'She bought fresh bread' },
      { word: 'Water', translation: 'Вода', example: 'Drink more water' },
      { word: 'Coffee', translation: 'Кофе', example: 'I like coffee in the morning' },
      { word: 'Pizza', translation: 'Пицца', example: 'Let\'s order pizza' },
    ]
  },
  {
    category: 'Colors',
    language: 'English',
    words: [
      { word: 'Red', translation: 'Красный', example: 'Her dress is red' },
      { word: 'Blue', translation: 'Синий', example: 'The sky is blue' },
      { word: 'Green', translation: 'Зелёный', example: 'Grass is green' },
      { word: 'Yellow', translation: 'Жёлтый', example: 'The sun is yellow' },
      { word: 'Black', translation: 'Чёрный', example: 'I have a black car' },
    ]
  },
  {
    category: 'Family',
    language: 'English',
    words: [
      { word: 'Mother', translation: 'Мать', example: 'My mother is kind' },
      { word: 'Father', translation: 'Отец', example: 'My father works hard' },
      { word: 'Sister', translation: 'Сестра', example: 'I have one sister' },
      { word: 'Brother', translation: 'Брат', example: 'My brother is tall' },
      { word: 'Grandmother', translation: 'Бабушка', example: 'I visit my grandmother' },
    ]
  },
];
