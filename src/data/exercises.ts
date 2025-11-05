export interface Exercise {
  id: string;
  language: string;
  type: 'translate' | 'match' | 'choose' | 'fillBlank' | 'listenSpeak' | 'story' | 'grammar';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  category: string;
  question: string;
  options?: string[];
  correctAnswer: string;
  explanation?: string;
  translation?: string;
  audio?: string;
}

export const exercisesDatabase: Exercise[] = [
  { id: 'en1', language: 'English', type: 'translate', difficulty: 'beginner', category: 'Greetings', question: 'Переведите: "Hello, how are you?"', options: ['Привет, как дела?', 'Пока, увидимся!', 'Спасибо большое!', 'Доброе утро!'], correctAnswer: 'Привет, как дела?', explanation: 'Базовое приветствие' },
  { id: 'en2', language: 'English', type: 'choose', difficulty: 'beginner', category: 'Grammar', question: 'Выберите артикль: ___ apple', options: ['a', 'an', 'the', '-'], correctAnswer: 'an', explanation: 'Перед гласными используется "an"', translation: 'яблоко' },
  { id: 'en3', language: 'English', type: 'match', difficulty: 'beginner', category: 'Vocabulary', question: 'Сопоставьте: "Book"', options: ['Книга', 'Ручка', 'Стол', 'Окно'], correctAnswer: 'Книга' },
  { id: 'en4', language: 'English', type: 'translate', difficulty: 'beginner', category: 'Greetings', question: 'Как сказать "Спасибо" по-английски?', options: ['Thank you', 'Please', 'Sorry', 'Goodbye'], correctAnswer: 'Thank you' },
  { id: 'en5', language: 'English', type: 'fillBlank', difficulty: 'beginner', category: 'Grammar', question: 'I ___ a student', options: ['am', 'is', 'are', 'be'], correctAnswer: 'am', explanation: 'С местоимением "I" используется "am"' },
  { id: 'en6', language: 'English', type: 'choose', difficulty: 'beginner', category: 'Vocabulary', question: 'What is "Кошка" in English?', options: ['Cat', 'Dog', 'Bird', 'Fish'], correctAnswer: 'Cat' },
  { id: 'en7', language: 'English', type: 'translate', difficulty: 'beginner', category: 'Common Phrases', question: 'Good morning!', options: ['Доброе утро!', 'Спокойной ночи!', 'Добрый вечер!', 'Добрый день!'], correctAnswer: 'Доброе утро!' },
  { id: 'en8', language: 'English', type: 'match', difficulty: 'beginner', category: 'Numbers', question: 'Сопоставьте: "Five"', options: ['Пять', 'Три', 'Семь', 'Девять'], correctAnswer: 'Пять' },
  { id: 'en9', language: 'English', type: 'fillBlank', difficulty: 'beginner', category: 'Grammar', question: 'She ___ a teacher', options: ['is', 'am', 'are', 'be'], correctAnswer: 'is' },
  { id: 'en10', language: 'English', type: 'choose', difficulty: 'beginner', category: 'Colors', question: 'What color is the sky?', options: ['Blue', 'Red', 'Green', 'Yellow'], correctAnswer: 'Blue' },
  
  { id: 'en11', language: 'English', type: 'translate', difficulty: 'intermediate', category: 'Daily Life', question: 'I go to work every day', options: ['Я хожу на работу каждый день', 'Я иду домой', 'Я учусь в школе', 'Я отдыхаю дома'], correctAnswer: 'Я хожу на работу каждый день' },
  { id: 'en12', language: 'English', type: 'fillBlank', difficulty: 'intermediate', category: 'Grammar', question: 'I have ___ studying English for 3 years', options: ['been', 'be', 'being', 'was'], correctAnswer: 'been', explanation: 'Present Perfect Continuous' },
  { id: 'en13', language: 'English', type: 'choose', difficulty: 'intermediate', category: 'Vocabulary', question: 'Synonym of "happy"', options: ['Joyful', 'Sad', 'Angry', 'Tired'], correctAnswer: 'Joyful' },
  { id: 'en14', language: 'English', type: 'match', difficulty: 'intermediate', category: 'Idioms', question: '"Break the ice" means...', options: ['Начать разговор', 'Сломать лёд', 'Быть холодным', 'Отдохнуть'], correctAnswer: 'Начать разговор' },
  { id: 'en15', language: 'English', type: 'translate', difficulty: 'intermediate', category: 'Travel', question: 'Where is the nearest subway station?', options: ['Где ближайшая станция метро?', 'Как пройти на вокзал?', 'Где автобусная остановка?', 'Сколько стоит билет?'], correctAnswer: 'Где ближайшая станция метро?' },
  
  { id: 'es1', language: 'Spanish', type: 'translate', difficulty: 'beginner', category: 'Greetings', question: '¡Hola! ¿Cómo estás?', options: ['Привет! Как дела?', 'Пока! До встречи!', 'Спасибо!', 'Извините!'], correctAnswer: 'Привет! Как дела?' },
  { id: 'es2', language: 'Spanish', type: 'choose', difficulty: 'beginner', category: 'Grammar', question: 'Yo ___ español', options: ['hablo', 'hablas', 'habla', 'hablan'], correctAnswer: 'hablo', explanation: 'Спряжение глагола "hablar" для "yo"' },
  { id: 'es3', language: 'Spanish', type: 'match', difficulty: 'beginner', category: 'Vocabulary', question: 'Casa', options: ['Дом', 'Машина', 'Школа', 'Магазин'], correctAnswer: 'Дом' },
  { id: 'es4', language: 'Spanish', type: 'fillBlank', difficulty: 'beginner', category: 'Grammar', question: 'Ella ___ feliz', options: ['es', 'soy', 'eres', 'son'], correctAnswer: 'es' },
  { id: 'es5', language: 'Spanish', type: 'translate', difficulty: 'beginner', category: 'Common Phrases', question: 'Gracias', options: ['Спасибо', 'Пожалуйста', 'Извините', 'Да'], correctAnswer: 'Спасибо' },
  
  { id: 'fr1', language: 'French', type: 'translate', difficulty: 'beginner', category: 'Greetings', question: 'Bonjour!', options: ['Здравствуйте!', 'Пока!', 'Спасибо!', 'Извините!'], correctAnswer: 'Здравствуйте!' },
  { id: 'fr2', language: 'French', type: 'choose', difficulty: 'beginner', category: 'Grammar', question: 'Je ___ français', options: ['parle', 'parles', 'parlez', 'parlons'], correctAnswer: 'parle' },
  { id: 'fr3', language: 'French', type: 'match', difficulty: 'beginner', category: 'Vocabulary', question: 'Chat', options: ['Кот', 'Собака', 'Птица', 'Рыба'], correctAnswer: 'Кот' },
  { id: 'fr4', language: 'French', type: 'fillBlank', difficulty: 'beginner', category: 'Grammar', question: 'Tu ___ content', options: ['es', 'est', 'sont', 'suis'], correctAnswer: 'es' },
  { id: 'fr5', language: 'French', type: 'translate', difficulty: 'beginner', category: 'Common Phrases', question: 'Merci beaucoup', options: ['Большое спасибо', 'Пожалуйста', 'Извините', 'Да'], correctAnswer: 'Большое спасибо' },
  
  { id: 'de1', language: 'German', type: 'translate', difficulty: 'beginner', category: 'Greetings', question: 'Guten Tag!', options: ['Добрый день!', 'Пока!', 'Спасибо!', 'Извините!'], correctAnswer: 'Добрый день!' },
  { id: 'de2', language: 'German', type: 'choose', difficulty: 'beginner', category: 'Grammar', question: 'Ich ___ Deutsch', options: ['spreche', 'sprichst', 'spricht', 'sprechen'], correctAnswer: 'spreche' },
  { id: 'de3', language: 'German', type: 'match', difficulty: 'beginner', category: 'Vocabulary', question: 'Hund', options: ['Собака', 'Кот', 'Птица', 'Рыба'], correctAnswer: 'Собака' },
  { id: 'de4', language: 'German', type: 'fillBlank', difficulty: 'beginner', category: 'Grammar', question: 'Er ___ ein Lehrer', options: ['ist', 'bin', 'bist', 'sind'], correctAnswer: 'ist' },
  { id: 'de5', language: 'German', type: 'translate', difficulty: 'beginner', category: 'Common Phrases', question: 'Danke schön', options: ['Большое спасибо', 'Пожалуйста', 'Извините', 'Да'], correctAnswer: 'Большое спасибо' },
  
  { id: 'it1', language: 'Italian', type: 'translate', difficulty: 'beginner', category: 'Greetings', question: 'Ciao!', options: ['Привет!', 'Пока!', 'Спасибо!', 'Извините!'], correctAnswer: 'Привет!' },
  { id: 'it2', language: 'Italian', type: 'choose', difficulty: 'beginner', category: 'Grammar', question: 'Io ___ italiano', options: ['parlo', 'parli', 'parla', 'parliamo'], correctAnswer: 'parlo' },
  { id: 'it3', language: 'Italian', type: 'match', difficulty: 'beginner', category: 'Vocabulary', question: 'Acqua', options: ['Вода', 'Хлеб', 'Молоко', 'Сок'], correctAnswer: 'Вода' },
  { id: 'it4', language: 'Italian', type: 'fillBlank', difficulty: 'beginner', category: 'Grammar', question: 'Noi ___ studenti', options: ['siamo', 'sono', 'sei', 'è'], correctAnswer: 'siamo' },
  { id: 'it5', language: 'Italian', type: 'translate', difficulty: 'beginner', category: 'Food', question: 'Pizza', options: ['Пицца', 'Паста', 'Салат', 'Суп'], correctAnswer: 'Пицца' },
  
  { id: 'ja1', language: 'Japanese', type: 'translate', difficulty: 'beginner', category: 'Greetings', question: 'こんにちは (Konnichiwa)', options: ['Здравствуйте', 'Пока', 'Спасибо', 'Извините'], correctAnswer: 'Здравствуйте' },
  { id: 'ja2', language: 'Japanese', type: 'match', difficulty: 'beginner', category: 'Vocabulary', question: '猫 (Neko)', options: ['Кот', 'Собака', 'Птица', 'Рыба'], correctAnswer: 'Кот' },
  { id: 'ja3', language: 'Japanese', type: 'choose', difficulty: 'beginner', category: 'Common Phrases', question: 'How to say "Thank you"?', options: ['ありがとう', 'さようなら', 'おはよう', 'すみません'], correctAnswer: 'ありがとう' },
  { id: 'ja4', language: 'Japanese', type: 'translate', difficulty: 'beginner', category: 'Numbers', question: '一 (Ichi)', options: ['Один', 'Два', 'Три', 'Четыре'], correctAnswer: 'Один' },
  { id: 'ja5', language: 'Japanese', type: 'fillBlank', difficulty: 'beginner', category: 'Grammar', question: '私 ___ 学生です', options: ['は', 'が', 'を', 'に'], correctAnswer: 'は' },
  
  { id: 'zh1', language: 'Chinese', type: 'translate', difficulty: 'beginner', category: 'Greetings', question: '你好 (Nǐ hǎo)', options: ['Привет', 'Пока', 'Спасибо', 'Извините'], correctAnswer: 'Привет' },
  { id: 'zh2', language: 'Chinese', type: 'match', difficulty: 'beginner', category: 'Vocabulary', question: '水 (Shuǐ)', options: ['Вода', 'Огонь', 'Земля', 'Воздух'], correctAnswer: 'Вода' },
  { id: 'zh3', language: 'Chinese', type: 'choose', difficulty: 'beginner', category: 'Numbers', question: '三 (Sān) means...', options: ['3', '1', '2', '4'], correctAnswer: '3' },
  { id: 'zh4', language: 'Chinese', type: 'translate', difficulty: 'beginner', category: 'Common Phrases', question: '谢谢 (Xièxiè)', options: ['Спасибо', 'Пожалуйста', 'Извините', 'Да'], correctAnswer: 'Спасибо' },
  { id: 'zh5', language: 'Chinese', type: 'fillBlank', difficulty: 'beginner', category: 'Grammar', question: '我 ___ 学生', options: ['是', '有', '在', '要'], correctAnswer: '是' },
  
  { id: 'ko1', language: 'Korean', type: 'translate', difficulty: 'beginner', category: 'Greetings', question: '안녕하세요 (Annyeonghaseyo)', options: ['Здравствуйте', 'Пока', 'Спасибо', 'Извините'], correctAnswer: 'Здравствуйте' },
  { id: 'ko2', language: 'Korean', type: 'match', difficulty: 'beginner', category: 'Vocabulary', question: '사랑 (Sarang)', options: ['Любовь', 'Дружба', 'Счастье', 'Мир'], correctAnswer: 'Любовь' },
  { id: 'ko3', language: 'Korean', type: 'choose', difficulty: 'beginner', category: 'Common Phrases', question: 'How to say "Thank you"?', options: ['감사합니다', '안녕', '네', '아니요'], correctAnswer: '감사합니다' },
  { id: 'ko4', language: 'Korean', type: 'translate', difficulty: 'beginner', category: 'Food', question: '김치 (Kimchi)', options: ['Кимчи', 'Рис', 'Суп', 'Лапша'], correctAnswer: 'Кимчи' },
  { id: 'ko5', language: 'Korean', type: 'fillBlank', difficulty: 'beginner', category: 'Grammar', question: '저 ___ 학생이에요', options: ['는', '이', '을', '에'], correctAnswer: '는' },

  { id: 'en16', language: 'English', type: 'story', difficulty: 'intermediate', category: 'Reading', question: 'Read and answer: "Tom likes to play soccer every weekend. He plays with his friends at the park." What does Tom do?', options: ['Plays soccer', 'Plays basketball', 'Goes swimming', 'Reads books'], correctAnswer: 'Plays soccer' },
  { id: 'en17', language: 'English', type: 'grammar', difficulty: 'advanced', category: 'Conditionals', question: 'If I ___ known, I would have come earlier', options: ['had', 'have', 'has', 'having'], correctAnswer: 'had', explanation: 'Third conditional uses "had + past participle"' },
  { id: 'en18', language: 'English', type: 'fillBlank', difficulty: 'intermediate', category: 'Phrasal Verbs', question: 'I need to ___ up early tomorrow', options: ['wake', 'get', 'stand', 'come'], correctAnswer: 'wake' },
  { id: 'en19', language: 'English', type: 'choose', difficulty: 'advanced', category: 'Vocabulary', question: 'Antonym of "increase"', options: ['Decrease', 'Expand', 'Grow', 'Rise'], correctAnswer: 'Decrease' },
  { id: 'en20', language: 'English', type: 'translate', difficulty: 'advanced', category: 'Business', question: 'We need to schedule a meeting', options: ['Нам нужно назначить встречу', 'Нам нужно отменить встречу', 'Встреча отложена', 'Встреча началась'], correctAnswer: 'Нам нужно назначить встречу' },
];

export const getExercisesByLanguage = (language: string, difficulty?: string) => {
  let filtered = exercisesDatabase.filter(ex => ex.language === language);
  if (difficulty) {
    filtered = filtered.filter(ex => ex.difficulty === difficulty);
  }
  return filtered;
};

export const getRandomExercises = (language: string, count: number = 10) => {
  const exercises = getExercisesByLanguage(language);
  return exercises.sort(() => Math.random() - 0.5).slice(0, count);
};
