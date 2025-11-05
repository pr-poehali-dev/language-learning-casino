import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

interface Language {
  id: string;
  name: string;
  flag: string;
  progress: number;
  level: number;
}

interface UserStats {
  coins: number;
  streak: number;
  xp: number;
  level: number;
  hearts: number;
  gems: number;
}

interface Exercise {
  id: string;
  type: 'translate' | 'match' | 'choose' | 'speak';
  question: string;
  options?: string[];
  correctAnswer: string;
  translation?: string;
}

interface ShopItem {
  id: string;
  name: string;
  description: string;
  price: number;
  icon: string;
  type: 'booster' | 'cosmetic' | 'premium';
}

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  progress: number;
  target: number;
  unlocked: boolean;
}

export default function Index() {
  const [activeSection, setActiveSection] = useState('home');
  const [userStats, setUserStats] = useState<UserStats>({
    coins: 500,
    streak: 7,
    xp: 1250,
    level: 5,
    hearts: 5,
    gems: 50,
  });
  const { toast } = useToast();

  const [currentExercise, setCurrentExercise] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [exerciseCompleted, setExerciseCompleted] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([
    { id: 1, user: 'Сова 🦉', message: 'Добро пожаловать в казино-чат! Попробуй свою удачу!', isBot: true },
  ]);
  const [slotResult, setSlotResult] = useState(['🍒', '🍋', '🍊']);
  const [isSpinning, setIsSpinning] = useState(false);

  const languages: Language[] = [
    { id: 'en', name: 'English', flag: '🇬🇧', progress: 65, level: 5 },
    { id: 'es', name: 'Spanish', flag: '🇪🇸', progress: 42, level: 3 },
    { id: 'fr', name: 'French', flag: '🇫🇷', progress: 28, level: 2 },
    { id: 'de', name: 'German', flag: '🇩🇪', progress: 15, level: 1 },
    { id: 'it', name: 'Italian', flag: '🇮🇹', progress: 0, level: 0 },
    { id: 'ja', name: 'Japanese', flag: '🇯🇵', progress: 0, level: 0 },
    { id: 'zh', name: 'Chinese', flag: '🇨🇳', progress: 0, level: 0 },
    { id: 'ko', name: 'Korean', flag: '🇰🇷', progress: 0, level: 0 },
  ];

  const exercises: Exercise[] = [
    {
      id: '1',
      type: 'translate',
      question: 'Переведите: "Hello, how are you?"',
      options: ['Привет, как дела?', 'Пока, увидимся!', 'Спасибо большое!', 'Доброе утро!'],
      correctAnswer: 'Привет, как дела?',
    },
    {
      id: '2',
      type: 'choose',
      question: 'Выберите правильный артикль: ___ apple',
      options: ['a', 'an', 'the', '-'],
      correctAnswer: 'an',
      translation: 'яблоко',
    },
    {
      id: '3',
      type: 'match',
      question: 'Сопоставьте слово: "Book"',
      options: ['Книга', 'Ручка', 'Стол', 'Окно'],
      correctAnswer: 'Книга',
    },
    {
      id: '4',
      type: 'translate',
      question: 'Как сказать "Спасибо" по-английски?',
      options: ['Thank you', 'Please', 'Sorry', 'Goodbye'],
      correctAnswer: 'Thank you',
    },
  ];

  const shopItems: ShopItem[] = [
    { id: '1', name: 'Восстановить сердца', description: 'Полностью восстанавливает все сердца', price: 50, icon: '❤️', type: 'booster' },
    { id: '2', name: 'Двойной XP', description: 'Удваивает опыт на 1 час', price: 100, icon: '⚡', type: 'booster' },
    { id: '3', name: 'Защита streak', description: 'Защищает вашу серию на 1 день', price: 150, icon: '🛡️', type: 'booster' },
    { id: '4', name: 'Золотая сова', description: 'Эксклюзивный маскот', price: 500, icon: '🏆', type: 'cosmetic' },
    { id: '5', name: '1000 монет', description: 'Пакет монет', price: 200, icon: '💰', type: 'premium' },
    { id: '6', name: 'Подсказка', description: 'Открыть правильный ответ', price: 30, icon: '💡', type: 'booster' },
  ];

  const achievements: Achievement[] = [
    { id: '1', name: 'Первые шаги', description: 'Завершите первый урок', icon: '🎯', progress: 1, target: 1, unlocked: true },
    { id: '2', name: 'Полиглот', description: 'Изучите 3 языка', icon: '🌍', progress: 2, target: 3, unlocked: false },
    { id: '3', name: 'Огненная серия', description: 'Поддерживайте streak 7 дней', icon: '🔥', progress: 7, target: 7, unlocked: true },
    { id: '4', name: 'Мастер слов', description: 'Выучите 100 слов', icon: '📚', progress: 67, target: 100, unlocked: false },
    { id: '5', name: 'Богач', description: 'Накопите 1000 монет', icon: '💎', progress: 500, target: 1000, unlocked: false },
    { id: '6', name: 'Перфекционист', description: 'Пройдите 10 уроков без ошибок', icon: '⭐', progress: 3, target: 10, unlocked: false },
  ];

  const leaderboard = [
    { rank: 1, name: 'Мария К.', xp: 5420, avatar: 'МК', country: '🇷🇺' },
    { rank: 2, name: 'John Smith', xp: 4890, avatar: 'JS', country: '🇺🇸' },
    { rank: 3, name: 'Yuki Tanaka', xp: 4650, avatar: 'YT', country: '🇯🇵' },
    { rank: 4, name: 'Алексей П.', xp: 3920, avatar: 'АП', country: '🇷🇺' },
    { rank: 5, name: 'Вы', xp: 1250, avatar: 'ВЫ', country: '🇷🇺', isCurrentUser: true },
    { rank: 6, name: 'Sophie Martin', xp: 1180, avatar: 'SM', country: '🇫🇷' },
    { rank: 7, name: 'Hans Mueller', xp: 890, avatar: 'HM', country: '🇩🇪' },
  ];

  const navItems = [
    { id: 'home', label: 'Главная', icon: 'Home' },
    { id: 'learn', label: 'Обучение', icon: 'BookOpen' },
    { id: 'casino', label: 'Казино-чат', icon: 'Dices' },
    { id: 'shop', label: 'Магазин', icon: 'ShoppingBag' },
    { id: 'profile', label: 'Профиль', icon: 'User' },
    { id: 'achievements', label: 'Достижения', icon: 'Trophy' },
    { id: 'leaderboard', label: 'Рейтинг', icon: 'Medal' },
  ];

  const handleAnswerCheck = (answer: string) => {
    setSelectedAnswer(answer);
    const isCorrect = answer === exercises[currentExercise].correctAnswer;
    
    if (isCorrect) {
      setUserStats(prev => ({ ...prev, xp: prev.xp + 10, coins: prev.coins + 5 }));
      toast({
        title: "Правильно! 🎉",
        description: "+10 XP, +5 монет",
      });
      setExerciseCompleted(true);
    } else {
      setUserStats(prev => ({ ...prev, hearts: Math.max(0, prev.hearts - 1) }));
      toast({
        title: "Неправильно 😢",
        description: "Попробуй еще раз!",
        variant: "destructive",
      });
    }
  };

  const handleNextExercise = () => {
    if (currentExercise < exercises.length - 1) {
      setCurrentExercise(prev => prev + 1);
      setSelectedAnswer(null);
      setExerciseCompleted(false);
    } else {
      toast({
        title: "Урок завершен! 🎊",
        description: "Вы заработали 50 XP и 25 монет!",
      });
      setCurrentExercise(0);
      setSelectedAnswer(null);
      setExerciseCompleted(false);
    }
  };

  const handleBuyItem = (item: ShopItem) => {
    if (userStats.coins >= item.price) {
      setUserStats(prev => ({ 
        ...prev, 
        coins: prev.coins - item.price,
        hearts: item.id === '1' ? 5 : prev.hearts,
      }));
      toast({
        title: "Покупка успешна! 🎉",
        description: `Вы купили: ${item.name}`,
      });
    } else {
      toast({
        title: "Недостаточно монет 😢",
        description: `Нужно еще ${item.price - userStats.coins} монет`,
        variant: "destructive",
      });
    }
  };

  const spinSlots = () => {
    if (userStats.coins < 20) {
      toast({
        title: "Недостаточно монет",
        description: "Нужно 20 монет для игры",
        variant: "destructive",
      });
      return;
    }

    setIsSpinning(true);
    setUserStats(prev => ({ ...prev, coins: prev.coins - 20 }));

    const symbols = ['🍒', '🍋', '🍊', '🍇', '💎', '⭐', '7️⃣'];
    let spins = 0;
    const interval = setInterval(() => {
      setSlotResult([
        symbols[Math.floor(Math.random() * symbols.length)],
        symbols[Math.floor(Math.random() * symbols.length)],
        symbols[Math.floor(Math.random() * symbols.length)],
      ]);
      spins++;
      if (spins >= 10) {
        clearInterval(interval);
        setIsSpinning(false);
        const finalResult = [
          symbols[Math.floor(Math.random() * symbols.length)],
          symbols[Math.floor(Math.random() * symbols.length)],
          symbols[Math.floor(Math.random() * symbols.length)],
        ];
        setSlotResult(finalResult);
        
        if (finalResult[0] === finalResult[1] && finalResult[1] === finalResult[2]) {
          const win = 100;
          setUserStats(prev => ({ ...prev, coins: prev.coins + win }));
          toast({
            title: "ДЖЕКПОТ! 🎰",
            description: `Вы выиграли ${win} монет!`,
          });
        }
      }
    }, 100);
  };

  const sendMessage = () => {
    if (!chatMessage.trim()) return;
    
    setChatMessages(prev => [...prev, {
      id: prev.length + 1,
      user: 'Вы',
      message: chatMessage,
      isBot: false,
    }]);
    setChatMessage('');

    setTimeout(() => {
      const responses = [
        'Отличная попытка! Продолжай в том же духе! 🎯',
        'Хочешь сыграть в слоты? 🎰',
        'Не забудь выполнить сегодняшнюю цель! 🔥',
        'У тебя отличный прогресс! 📈',
      ];
      setChatMessages(prev => [...prev, {
        id: prev.length + 1,
        user: 'Сова 🦉',
        message: responses[Math.floor(Math.random() * responses.length)],
        isBot: true,
      }]);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-orange-50">
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="text-4xl animate-bounce-subtle">🦉</div>
              <h1 className="text-2xl font-bold text-primary">LinguaQuest</h1>
            </div>

            <div className="hidden md:flex items-center gap-4">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold transition-all ${
                    activeSection === item.id
                      ? 'bg-primary text-primary-foreground shadow-lg scale-105'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Icon name={item.icon as any} size={20} />
                  <span className="hidden lg:inline">{item.label}</span>
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 bg-red-100 px-3 py-2 rounded-full">
                <span className="text-xl">❤️</span>
                <span className="font-bold text-red-800">{userStats.hearts}</span>
              </div>
              <div className="flex items-center gap-2 bg-yellow-100 px-3 py-2 rounded-full">
                <span className="text-xl">💰</span>
                <span className="font-bold text-yellow-800">{userStats.coins}</span>
              </div>
              <div className="flex items-center gap-2 bg-orange-100 px-3 py-2 rounded-full">
                <span className="text-xl">🔥</span>
                <span className="font-bold text-orange-800">{userStats.streak}</span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t z-50">
        <div className="grid grid-cols-4 gap-1 p-2">
          {navItems.slice(0, 4).map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`flex flex-col items-center gap-1 py-3 rounded-lg ${
                activeSection === item.id ? 'bg-primary text-primary-foreground' : 'text-gray-600'
              }`}
            >
              <Icon name={item.icon as any} size={24} />
              <span className="text-xs font-semibold">{item.label}</span>
            </button>
          ))}
        </div>
      </div>

      <main className="container mx-auto px-4 py-8 pb-24 md:pb-8">
        {activeSection === 'home' && (
          <div className="space-y-8 animate-fade-in">
            <Card className="bg-gradient-to-r from-primary to-accent text-white overflow-hidden">
              <CardContent className="p-8">
                <div className="flex items-center justify-between">
                  <div className="space-y-4">
                    <h2 className="text-4xl font-bold">Привет! 👋</h2>
                    <p className="text-xl opacity-90">Продолжим учиться?</p>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold">Уровень {userStats.level}</span>
                        <Badge variant="secondary" className="bg-white text-primary">
                          {userStats.xp} XP
                        </Badge>
                      </div>
                      <Progress value={(userStats.xp % 500) / 5} className="h-3 bg-white/30" />
                      <p className="text-sm opacity-75">
                        {500 - (userStats.xp % 500)} XP до уровня {userStats.level + 1}
                      </p>
                    </div>
                  </div>
                  <div className="text-9xl animate-bounce-subtle hidden lg:block">🦉</div>
                </div>
              </CardContent>
            </Card>

            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-3xl font-bold text-gray-800">Мои языки</h3>
                <Button className="gap-2" onClick={() => setActiveSection('learn')}>
                  <Icon name="Plus" size={20} />
                  Добавить язык
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {languages.map((lang, index) => (
                  <Card
                    key={lang.id}
                    className="hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer animate-scale-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                    onClick={() => setActiveSection('learn')}
                  >
                    <CardContent className="p-6 space-y-4">
                      <div className="flex items-start justify-between">
                        <div className="space-y-2">
                          <div className="text-5xl">{lang.flag}</div>
                          <h4 className="text-xl font-bold text-gray-800">{lang.name}</h4>
                        </div>
                        {lang.level > 0 && (
                          <Badge className="bg-secondary text-secondary-foreground">
                            Уровень {lang.level}
                          </Badge>
                        )}
                      </div>

                      {lang.progress > 0 ? (
                        <div className="space-y-2">
                          <Progress value={lang.progress} className="h-2" />
                          <p className="text-sm text-gray-600 font-semibold">
                            {lang.progress}% завершено
                          </p>
                        </div>
                      ) : (
                        <Button className="w-full" variant="outline">
                          Начать обучение
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <Card className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold">Ежедневная цель</h3>
                    <p className="text-lg opacity-90">Заработай 50 XP сегодня!</p>
                  </div>
                  <div className="text-6xl">🎯</div>
                </div>
                <Progress value={40} className="h-3 bg-white/30 mt-4" />
                <p className="text-sm mt-2 opacity-75">20 / 50 XP</p>
              </CardContent>
            </Card>
          </div>
        )}

        {activeSection === 'learn' && (
          <div className="animate-fade-in space-y-6">
            <h2 className="text-3xl font-bold mb-6">Интерактивное обучение</h2>
            
            <Card className="max-w-3xl mx-auto">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Урок {currentExercise + 1} из {exercises.length}</CardTitle>
                  <Badge variant="secondary">English 🇬🇧</Badge>
                </div>
                <Progress value={((currentExercise + 1) / exercises.length) * 100} className="mt-4" />
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-accent/10 p-6 rounded-xl text-center">
                  <p className="text-2xl font-bold text-gray-800">
                    {exercises[currentExercise].question}
                  </p>
                  {exercises[currentExercise].translation && (
                    <p className="text-sm text-gray-600 mt-2">({exercises[currentExercise].translation})</p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {exercises[currentExercise].options?.map((option, idx) => (
                    <Button
                      key={idx}
                      variant={selectedAnswer === option ? (option === exercises[currentExercise].correctAnswer ? "default" : "destructive") : "outline"}
                      className="h-auto py-4 text-lg"
                      onClick={() => !exerciseCompleted && handleAnswerCheck(option)}
                      disabled={exerciseCompleted}
                    >
                      {option}
                    </Button>
                  ))}
                </div>

                {exerciseCompleted && (
                  <Button onClick={handleNextExercise} className="w-full" size="lg">
                    {currentExercise < exercises.length - 1 ? 'Следующий вопрос' : 'Завершить урок'} 
                    <Icon name="ArrowRight" size={20} className="ml-2" />
                  </Button>
                )}
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <Card>
                <CardContent className="p-6 text-center space-y-2">
                  <div className="text-4xl">📖</div>
                  <h3 className="font-bold text-xl">Словарь</h3>
                  <p className="text-sm text-gray-600">67 слов изучено</p>
                  <Button variant="outline" className="w-full">Открыть</Button>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center space-y-2">
                  <div className="text-4xl">🎤</div>
                  <h3 className="font-bold text-xl">Практика произношения</h3>
                  <p className="text-sm text-gray-600">Скоро...</p>
                  <Button variant="outline" className="w-full" disabled>Скоро</Button>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center space-y-2">
                  <div className="text-4xl">📝</div>
                  <h3 className="font-bold text-xl">Грамматика</h3>
                  <p className="text-sm text-gray-600">15 правил изучено</p>
                  <Button variant="outline" className="w-full">Открыть</Button>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {activeSection === 'casino' && (
          <div className="animate-fade-in">
            <h2 className="text-3xl font-bold mb-6">Казино-чат</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    🎰 Слот-машина
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="bg-gradient-to-b from-purple-600 to-purple-800 p-8 rounded-xl">
                    <div className="flex items-center justify-center gap-4 mb-6">
                      {slotResult.map((symbol, idx) => (
                        <div key={idx} className={`text-7xl bg-white rounded-xl p-4 ${isSpinning ? 'animate-bounce' : ''}`}>
                          {symbol}
                        </div>
                      ))}
                    </div>
                    <Button 
                      onClick={spinSlots} 
                      disabled={isSpinning || userStats.coins < 20}
                      className="w-full" 
                      size="lg"
                    >
                      {isSpinning ? 'Крутим...' : 'Крутить (20 монет)'}
                    </Button>
                    <p className="text-center text-white text-sm mt-4">Три одинаковых символа = ДЖЕКПОТ! 🎰</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <Card>
                      <CardContent className="p-4 text-center">
                        <div className="text-3xl mb-2">🎲</div>
                        <p className="font-semibold">Кости</p>
                        <Button variant="outline" size="sm" className="mt-2">Скоро</Button>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4 text-center">
                        <div className="text-3xl mb-2">🃏</div>
                        <p className="font-semibold">Покер</p>
                        <Button variant="outline" size="sm" className="mt-2">Скоро</Button>
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    💬 Чат сообщества
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[400px] pr-4 mb-4">
                    {chatMessages.map((msg) => (
                      <div key={msg.id} className={`mb-4 ${msg.isBot ? 'text-left' : 'text-right'}`}>
                        <div className={`inline-block max-w-[80%] p-3 rounded-xl ${
                          msg.isBot ? 'bg-gray-100 text-gray-800' : 'bg-primary text-primary-foreground'
                        }`}>
                          <p className="font-semibold text-sm mb-1">{msg.user}</p>
                          <p>{msg.message}</p>
                        </div>
                      </div>
                    ))}
                  </ScrollArea>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Напишите сообщение..."
                      value={chatMessage}
                      onChange={(e) => setChatMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                    />
                    <Button onClick={sendMessage}>
                      <Icon name="Send" size={20} />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {activeSection === 'shop' && (
          <div className="animate-fade-in">
            <h2 className="text-3xl font-bold mb-6">Магазин</h2>
            <Tabs defaultValue="boosters" className="w-full">
              <TabsList className="grid w-full grid-cols-3 max-w-md mx-auto mb-6">
                <TabsTrigger value="boosters">Бустеры</TabsTrigger>
                <TabsTrigger value="cosmetics">Косметика</TabsTrigger>
                <TabsTrigger value="premium">Премиум</TabsTrigger>
              </TabsList>

              <TabsContent value="boosters">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {shopItems.filter(item => item.type === 'booster').map((item) => (
                    <Card key={item.id} className="hover:shadow-xl transition-all">
                      <CardContent className="p-6 space-y-4">
                        <div className="text-6xl text-center">{item.icon}</div>
                        <div className="text-center">
                          <h3 className="text-xl font-bold">{item.name}</h3>
                          <p className="text-sm text-gray-600 mt-2">{item.description}</p>
                        </div>
                        <div className="flex items-center justify-between">
                          <Badge className="text-lg">{item.price} 💰</Badge>
                          <Button onClick={() => handleBuyItem(item)}>Купить</Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="cosmetics">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {shopItems.filter(item => item.type === 'cosmetic').map((item) => (
                    <Card key={item.id} className="hover:shadow-xl transition-all">
                      <CardContent className="p-6 space-y-4">
                        <div className="text-6xl text-center">{item.icon}</div>
                        <div className="text-center">
                          <h3 className="text-xl font-bold">{item.name}</h3>
                          <p className="text-sm text-gray-600 mt-2">{item.description}</p>
                        </div>
                        <div className="flex items-center justify-between">
                          <Badge className="text-lg">{item.price} 💰</Badge>
                          <Button onClick={() => handleBuyItem(item)}>Купить</Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="premium">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {shopItems.filter(item => item.type === 'premium').map((item) => (
                    <Card key={item.id} className="hover:shadow-xl transition-all border-2 border-primary">
                      <CardContent className="p-6 space-y-4">
                        <div className="text-6xl text-center">{item.icon}</div>
                        <div className="text-center">
                          <h3 className="text-xl font-bold">{item.name}</h3>
                          <p className="text-sm text-gray-600 mt-2">{item.description}</p>
                        </div>
                        <div className="flex items-center justify-between">
                          <Badge className="text-lg">{item.price} 💰</Badge>
                          <Button onClick={() => handleBuyItem(item)}>Купить</Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        )}

        {activeSection === 'profile' && (
          <div className="animate-fade-in max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">Мой профиль</h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-1">
                <CardContent className="p-6 text-center space-y-4">
                  <Avatar className="w-32 h-32 mx-auto">
                    <AvatarFallback className="text-4xl bg-primary text-primary-foreground">ВЫ</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-2xl font-bold">Пользователь</h3>
                    <p className="text-gray-600">Уровень {userStats.level}</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>XP:</span>
                      <span className="font-bold">{userStats.xp}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Монеты:</span>
                      <span className="font-bold">{userStats.coins} 💰</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Streak:</span>
                      <span className="font-bold">{userStats.streak} 🔥</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Сердца:</span>
                      <span className="font-bold">{userStats.hearts} ❤️</span>
                    </div>
                  </div>
                  <Button className="w-full">Редактировать профиль</Button>
                </CardContent>
              </Card>

              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Статистика обучения</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-primary/10 p-4 rounded-xl text-center">
                      <p className="text-3xl font-bold text-primary">67</p>
                      <p className="text-sm text-gray-600">Слов изучено</p>
                    </div>
                    <div className="bg-secondary/10 p-4 rounded-xl text-center">
                      <p className="text-3xl font-bold text-secondary">24</p>
                      <p className="text-sm text-gray-600">Уроков пройдено</p>
                    </div>
                    <div className="bg-accent/10 p-4 rounded-xl text-center">
                      <p className="text-3xl font-bold text-accent">3</p>
                      <p className="text-sm text-gray-600">Языка активных</p>
                    </div>
                    <div className="bg-purple-100 p-4 rounded-xl text-center">
                      <p className="text-3xl font-bold text-purple-600">12</p>
                      <p className="text-sm text-gray-600">Дней изучения</p>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-4">Активность за неделю</h4>
                    <div className="flex items-end justify-between gap-2 h-32">
                      {[40, 65, 30, 80, 55, 90, 70].map((height, idx) => (
                        <div key={idx} className="flex-1 flex flex-col items-center gap-2">
                          <div 
                            className="w-full bg-primary rounded-t-lg transition-all hover:bg-primary/80"
                            style={{ height: `${height}%` }}
                          />
                          <span className="text-xs text-gray-600">
                            {['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'][idx]}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {activeSection === 'achievements' && (
          <div className="animate-fade-in">
            <h2 className="text-3xl font-bold mb-6">Достижения</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {achievements.map((achievement) => (
                <Card 
                  key={achievement.id} 
                  className={`${achievement.unlocked ? 'border-2 border-primary' : 'opacity-60'} hover:shadow-xl transition-all`}
                >
                  <CardContent className="p-6 space-y-4">
                    <div className="text-6xl text-center">{achievement.icon}</div>
                    <div className="text-center">
                      <h3 className="text-xl font-bold">{achievement.name}</h3>
                      <p className="text-sm text-gray-600 mt-2">{achievement.description}</p>
                    </div>
                    <div className="space-y-2">
                      <Progress value={(achievement.progress / achievement.target) * 100} />
                      <p className="text-sm text-center text-gray-600">
                        {achievement.progress} / {achievement.target}
                      </p>
                    </div>
                    {achievement.unlocked && (
                      <Badge className="w-full justify-center">Получено! ✅</Badge>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeSection === 'leaderboard' && (
          <div className="animate-fade-in max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">Таблица лидеров</h2>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  🏆 Топ игроков недели
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {leaderboard.map((player) => (
                    <div
                      key={player.rank}
                      className={`flex items-center justify-between p-4 rounded-xl ${
                        player.isCurrentUser 
                          ? 'bg-primary/10 border-2 border-primary' 
                          : 'bg-gray-50 hover:bg-gray-100'
                      } transition-all`}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`text-2xl font-bold ${
                          player.rank === 1 ? 'text-yellow-500' :
                          player.rank === 2 ? 'text-gray-400' :
                          player.rank === 3 ? 'text-orange-600' :
                          'text-gray-600'
                        }`}>
                          #{player.rank}
                        </div>
                        <Avatar>
                          <AvatarFallback className={player.isCurrentUser ? 'bg-primary text-primary-foreground' : ''}>
                            {player.avatar}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-bold flex items-center gap-2">
                            {player.name} {player.country}
                            {player.isCurrentUser && <Badge variant="secondary">Вы</Badge>}
                          </p>
                          <p className="text-sm text-gray-600">{player.xp} XP</p>
                        </div>
                      </div>
                      {player.rank <= 3 && (
                        <div className="text-3xl">
                          {player.rank === 1 ? '🥇' : player.rank === 2 ? '🥈' : '🥉'}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </main>
    </div>
  );
}
