import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';
import { exercisesDatabase, getRandomExercises, type Exercise } from '@/data/exercises';
import { quests, shopItems, achievements, miniGames, storiesDatabase, grammarLessons, vocabularyCategories, type Quest, type ShopItem, type Achievement } from '@/data/content';

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

export default function Index() {
  const [activeSection, setActiveSection] = useState('home');
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const [userStats, setUserStats] = useState<UserStats>({
    coins: 500,
    streak: 7,
    xp: 1250,
    level: 5,
    hearts: 5,
    gems: 50,
  });
  const { toast } = useToast();

  const [currentExercises, setCurrentExercises] = useState<Exercise[]>([]);
  const [currentExercise, setCurrentExercise] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [exerciseCompleted, setExerciseCompleted] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([
    { id: 1, user: 'Сова 🦉', message: 'Добро пожаловать в казино-чат! Попробуй свою удачу!', isBot: true, time: '12:00' },
  ]);
  const [slotResult, setSlotResult] = useState(['🍒', '🍋', '🍊']);
  const [isSpinning, setIsSpinning] = useState(false);
  const [wheelAngle, setWheelAngle] = useState(0);
  const [isWheelSpinning, setIsWheelSpinning] = useState(false);
  const [diceResults, setDiceResults] = useState([1, 1]);
  const [memoryCards, setMemoryCards] = useState<Array<{id: number, symbol: string, flipped: boolean, matched: boolean}>>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [userQuests, setUserQuests] = useState<Quest[]>(quests);

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

  const navItems = [
    { id: 'home', label: 'Главная', icon: 'Home' },
    { id: 'learn', label: 'Обучение', icon: 'BookOpen' },
    { id: 'casino', label: 'Казино-чат', icon: 'Dices' },
    { id: 'shop', label: 'Магазин', icon: 'ShoppingBag' },
    { id: 'profile', label: 'Профиль', icon: 'User' },
    { id: 'achievements', label: 'Достижения', icon: 'Trophy' },
    { id: 'leaderboard', label: 'Рейтинг', icon: 'Medal' },
  ];

  const leaderboard = [
    { rank: 1, name: 'Мария К.', xp: 5420, avatar: 'МК', country: '🇷🇺' },
    { rank: 2, name: 'John Smith', xp: 4890, avatar: 'JS', country: '🇺🇸' },
    { rank: 3, name: 'Yuki Tanaka', xp: 4650, avatar: 'YT', country: '🇯🇵' },
    { rank: 4, name: 'Алексей П.', xp: 3920, avatar: 'АП', country: '🇷🇺' },
    { rank: 5, name: 'Вы', xp: userStats.xp, avatar: 'ВЫ', country: '🇷🇺', isCurrentUser: true },
    { rank: 6, name: 'Sophie Martin', xp: 1180, avatar: 'SM', country: '🇫🇷' },
    { rank: 7, name: 'Hans Mueller', xp: 890, avatar: 'HM', country: '🇩🇪' },
  ];

  useEffect(() => {
    if (activeSection === 'learn' && currentExercises.length === 0) {
      loadNewExercises();
    }
  }, [activeSection]);

  useEffect(() => {
    if (memoryCards.length === 0) {
      initMemoryGame();
    }
  }, []);

  const loadNewExercises = () => {
    const exercises = getRandomExercises(selectedLanguage, 10);
    setCurrentExercises(exercises);
    setCurrentExercise(0);
    setSelectedAnswer(null);
    setExerciseCompleted(false);
  };

  const handleAnswerCheck = (answer: string) => {
    if (!currentExercises[currentExercise]) return;
    
    setSelectedAnswer(answer);
    const isCorrect = answer === currentExercises[currentExercise].correctAnswer;
    
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
    if (currentExercise < currentExercises.length - 1) {
      setCurrentExercise(prev => prev + 1);
      setSelectedAnswer(null);
      setExerciseCompleted(false);
    } else {
      setUserStats(prev => ({ ...prev, xp: prev.xp + 50, coins: prev.coins + 25 }));
      toast({
        title: "Урок завершен! 🎊",
        description: "Всего заработано: 150 XP и 75 монет!",
      });
      loadNewExercises();
    }
  };

  const handleBuyItem = (item: ShopItem) => {
    const currency = item.currency || 'coins';
    const hasEnough = currency === 'coins' ? userStats.coins >= item.price : userStats.gems >= item.price;
    
    if (hasEnough) {
      setUserStats(prev => ({ 
        ...prev, 
        ...(currency === 'coins' ? { coins: prev.coins - item.price } : { gems: prev.gems - item.price }),
        hearts: item.id === 's1' ? 5 : prev.hearts,
      }));
      toast({
        title: "Покупка успешна! 🎉",
        description: `Вы купили: ${item.name}`,
      });
    } else {
      toast({
        title: `Недостаточно ${currency === 'coins' ? 'монет' : 'гемов'} 😢`,
        description: `Нужно еще ${item.price - (currency === 'coins' ? userStats.coins : userStats.gems)}`,
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
      if (spins >= 15) {
        clearInterval(interval);
        setIsSpinning(false);
        const finalResult = [
          symbols[Math.floor(Math.random() * symbols.length)],
          symbols[Math.floor(Math.random() * symbols.length)],
          symbols[Math.floor(Math.random() * symbols.length)],
        ];
        setSlotResult(finalResult);
        
        if (finalResult[0] === finalResult[1] && finalResult[1] === finalResult[2]) {
          const multiplier = finalResult[0] === '7️⃣' ? 10 : finalResult[0] === '💎' ? 8 : 5;
          const win = 20 * multiplier;
          setUserStats(prev => ({ ...prev, coins: prev.coins + win }));
          toast({
            title: "ДЖЕКПОТ! 🎰",
            description: `Вы выиграли ${win} монет!`,
          });
        } else if (finalResult[0] === finalResult[1] || finalResult[1] === finalResult[2]) {
          setUserStats(prev => ({ ...prev, coins: prev.coins + 40 }));
          toast({
            title: "Выигрыш! 🎉",
            description: "Вы выиграли 40 монет!",
          });
        }
      }
    }, 100);
  };

  const spinWheel = () => {
    if (userStats.coins < 50) {
      toast({
        title: "Недостаточно монет",
        description: "Нужно 50 монет для игры",
        variant: "destructive",
      });
      return;
    }

    setIsWheelSpinning(true);
    setUserStats(prev => ({ ...prev, coins: prev.coins - 50 }));

    const spins = 5 + Math.random() * 3;
    const finalAngle = 360 * spins + Math.random() * 360;
    setWheelAngle(finalAngle);

    setTimeout(() => {
      setIsWheelSpinning(false);
      const segmentAngle = finalAngle % 360;
      const segment = Math.floor(segmentAngle / 45);
      const prizes = [500, 0, 100, 50, 200, 0, 150, 75];
      const won = prizes[segment];
      
      if (won > 0) {
        setUserStats(prev => ({ ...prev, coins: prev.coins + won }));
        toast({
          title: "Поздравляем! 🎡",
          description: `Вы выиграли ${won} монет!`,
        });
      } else {
        toast({
          title: "Не повезло 😢",
          description: "Попробуйте еще раз!",
        });
      }
    }, 3000);
  };

  const rollDice = () => {
    if (userStats.coins < 15) {
      toast({
        title: "Недостаточно монет",
        description: "Нужно 15 монет для игры",
        variant: "destructive",
      });
      return;
    }

    setUserStats(prev => ({ ...prev, coins: prev.coins - 15 }));
    const dice1 = Math.floor(Math.random() * 6) + 1;
    const dice2 = Math.floor(Math.random() * 6) + 1;
    setDiceResults([dice1, dice2]);

    const sum = dice1 + dice2;
    if (dice1 === dice2) {
      const win = sum * 10;
      setUserStats(prev => ({ ...prev, coins: prev.coins + win }));
      toast({
        title: "ДУБЛЬ! 🎲",
        description: `Вы выиграли ${win} монет!`,
      });
    } else if (sum >= 10) {
      setUserStats(prev => ({ ...prev, coins: prev.coins + 30 }));
      toast({
        title: "Хороший бросок! 🎲",
        description: "Вы выиграли 30 монет!",
      });
    }
  };

  const initMemoryGame = () => {
    const symbols = ['🍎', '🍊', '🍋', '🍇', '🍓', '🍑', '🍒', '🥝'];
    const cards = [...symbols, ...symbols]
      .sort(() => Math.random() - 0.5)
      .map((symbol, index) => ({
        id: index,
        symbol,
        flipped: false,
        matched: false,
      }));
    setMemoryCards(cards);
  };

  const handleCardClick = (id: number) => {
    if (flippedCards.length === 2 || memoryCards[id].flipped || memoryCards[id].matched) return;

    const newCards = [...memoryCards];
    newCards[id].flipped = true;
    setMemoryCards(newCards);

    const newFlipped = [...flippedCards, id];
    setFlippedCards(newFlipped);

    if (newFlipped.length === 2) {
      const [first, second] = newFlipped;
      if (newCards[first].symbol === newCards[second].symbol) {
        setTimeout(() => {
          const matched = [...memoryCards];
          matched[first].matched = true;
          matched[second].matched = true;
          setMemoryCards(matched);
          setFlippedCards([]);

          if (matched.every(card => card.matched)) {
            setUserStats(prev => ({ ...prev, coins: prev.coins + 100, xp: prev.xp + 50 }));
            toast({
              title: "Победа! 🧠",
              description: "Вы заработали 100 монет и 50 XP!",
            });
          }
        }, 500);
      } else {
        setTimeout(() => {
          const reset = [...memoryCards];
          reset[first].flipped = false;
          reset[second].flipped = false;
          setMemoryCards(reset);
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  const sendMessage = () => {
    if (!chatMessage.trim()) return;
    
    const now = new Date();
    const time = `${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')}`;
    
    setChatMessages(prev => [...prev, {
      id: prev.length + 1,
      user: 'Вы',
      message: chatMessage,
      isBot: false,
      time,
    }]);
    setChatMessage('');

    setTimeout(() => {
      const responses = [
        'Отличная попытка! Продолжай в том же духе! 🎯',
        'Хочешь сыграть в слоты? 🎰',
        'Не забудь выполнить сегодняшнюю цель! 🔥',
        'У тебя отличный прогресс! 📈',
        'Попробуй новое упражнение на грамматику! 📚',
        'Уже выучил новые слова сегодня? 💡',
      ];
      setChatMessages(prev => [...prev, {
        id: prev.length + 1,
        user: 'Сова 🦉',
        message: responses[Math.floor(Math.random() * responses.length)],
        isBot: true,
        time: `${now.getHours()}:${(now.getMinutes() + 1).toString().padStart(2, '0')}`,
      }]);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-orange-50">
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="text-4xl animate-bounce-subtle cursor-pointer" onClick={() => setActiveSection('home')}>🦉</div>
              <h1 className="text-2xl font-bold text-primary">LinguaQuest</h1>
            </div>

            <div className="hidden md:flex items-center gap-2 lg:gap-4">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`flex items-center gap-2 px-3 lg:px-4 py-2 rounded-xl font-semibold transition-all ${
                    activeSection === item.id
                      ? 'bg-primary text-primary-foreground shadow-lg scale-105'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Icon name={item.icon as any} size={20} />
                  <span className="hidden lg:inline text-sm">{item.label}</span>
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2 lg:gap-3">
              <div className="flex items-center gap-1 lg:gap-2 bg-red-100 px-2 lg:px-3 py-1 lg:py-2 rounded-full">
                <span className="text-lg lg:text-xl">❤️</span>
                <span className="font-bold text-red-800 text-sm lg:text-base">{userStats.hearts}</span>
              </div>
              <div className="flex items-center gap-1 lg:gap-2 bg-yellow-100 px-2 lg:px-3 py-1 lg:py-2 rounded-full">
                <span className="text-lg lg:text-xl">💰</span>
                <span className="font-bold text-yellow-800 text-sm lg:text-base">{userStats.coins}</span>
              </div>
              <div className="hidden sm:flex items-center gap-2 bg-purple-100 px-3 py-2 rounded-full">
                <span className="text-xl">💎</span>
                <span className="font-bold text-purple-800">{userStats.gems}</span>
              </div>
              <div className="flex items-center gap-1 lg:gap-2 bg-orange-100 px-2 lg:px-3 py-1 lg:py-2 rounded-full">
                <span className="text-lg lg:text-xl">🔥</span>
                <span className="font-bold text-orange-800 text-sm lg:text-base">{userStats.streak}</span>
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
              className={`flex flex-col items-center gap-1 py-2 rounded-lg ${
                activeSection === item.id ? 'bg-primary text-primary-foreground' : 'text-gray-600'
              }`}
            >
              <Icon name={item.icon as any} size={20} />
              <span className="text-xs font-semibold">{item.label}</span>
            </button>
          ))}
        </div>
      </div>

      <main className="container mx-auto px-4 py-6 lg:py-8 pb-24 md:pb-8">
        {activeSection === 'home' && (
          <div className="space-y-6 lg:space-y-8 animate-fade-in">
            <Card className="bg-gradient-to-r from-primary to-accent text-white overflow-hidden">
              <CardContent className="p-6 lg:p-8">
                <div className="flex items-center justify-between">
                  <div className="space-y-4">
                    <h2 className="text-3xl lg:text-4xl font-bold">Привет! 👋</h2>
                    <p className="text-lg lg:text-xl opacity-90">Продолжим учиться?</p>
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
                  <div className="text-7xl lg:text-9xl animate-bounce-subtle hidden lg:block">🦉</div>
                </div>
              </CardContent>
            </Card>

            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl lg:text-3xl font-bold text-gray-800">Квесты</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {userQuests.slice(0, 6).map((quest) => (
                  <Card key={quest.id} className={quest.completed ? 'border-2 border-primary' : ''}>
                    <CardContent className="p-4 space-y-3">
                      <div className="flex items-start justify-between">
                        <div className="text-4xl">{quest.icon}</div>
                        {quest.completed && <Badge className="bg-green-500">✓</Badge>}
                      </div>
                      <div>
                        <h4 className="font-bold">{quest.title}</h4>
                        <p className="text-sm text-gray-600">{quest.description}</p>
                      </div>
                      <Progress value={(quest.requirements.current / quest.requirements.count) * 100} />
                      <p className="text-xs text-gray-500">
                        {quest.requirements.current} / {quest.requirements.count}
                      </p>
                      <div className="flex gap-2 text-sm">
                        <Badge variant="outline">+{quest.reward.xp} XP</Badge>
                        <Badge variant="outline">+{quest.reward.coins} 💰</Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl lg:text-3xl font-bold text-gray-800">Мои языки</h3>
                <Button className="gap-2" onClick={() => setActiveSection('learn')}>
                  <Icon name="Plus" size={20} />
                  <span className="hidden sm:inline">Добавить язык</span>
                </Button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
                {languages.map((lang, index) => (
                  <Card
                    key={lang.id}
                    className="hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer animate-scale-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                    onClick={() => {
                      setSelectedLanguage(lang.name);
                      setActiveSection('learn');
                    }}
                  >
                    <CardContent className="p-4 lg:p-6 space-y-3 lg:space-y-4">
                      <div className="flex items-start justify-between">
                        <div className="space-y-2">
                          <div className="text-4xl lg:text-5xl">{lang.flag}</div>
                          <h4 className="text-lg lg:text-xl font-bold text-gray-800">{lang.name}</h4>
                        </div>
                        {lang.level > 0 && (
                          <Badge className="bg-secondary text-secondary-foreground text-xs">
                            Ур. {lang.level}
                          </Badge>
                        )}
                      </div>

                      {lang.progress > 0 ? (
                        <div className="space-y-2">
                          <Progress value={lang.progress} className="h-2" />
                          <p className="text-xs lg:text-sm text-gray-600 font-semibold">
                            {lang.progress}% завершено
                          </p>
                        </div>
                      ) : (
                        <Button className="w-full text-xs lg:text-sm" variant="outline" size="sm">
                          Начать
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
                    <h3 className="text-xl lg:text-2xl font-bold">Ежедневная цель</h3>
                    <p className="text-base lg:text-lg opacity-90">Заработай 50 XP сегодня!</p>
                  </div>
                  <div className="text-5xl lg:text-6xl">🎯</div>
                </div>
                <Progress value={40} className="h-3 bg-white/30 mt-4" />
                <p className="text-sm mt-2 opacity-75">20 / 50 XP</p>
              </CardContent>
            </Card>
          </div>
        )}

        {activeSection === 'learn' && (
          <div className="animate-fade-in space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl lg:text-3xl font-bold">Обучение</h2>
              <div className="flex gap-2">
                <select 
                  className="px-4 py-2 rounded-lg border bg-white"
                  value={selectedLanguage}
                  onChange={(e) => {
                    setSelectedLanguage(e.target.value);
                    loadNewExercises();
                  }}
                >
                  {languages.map(lang => (
                    <option key={lang.id} value={lang.name}>{lang.flag} {lang.name}</option>
                  ))}
                </select>
                <Button onClick={loadNewExercises} variant="outline">
                  <Icon name="RefreshCw" size={20} />
                </Button>
              </div>
            </div>
            
            <Tabs defaultValue="exercises" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="exercises">Упражнения</TabsTrigger>
                <TabsTrigger value="grammar">Грамматика</TabsTrigger>
                <TabsTrigger value="vocabulary">Словарь</TabsTrigger>
                <TabsTrigger value="stories">Истории</TabsTrigger>
              </TabsList>

              <TabsContent value="exercises" className="space-y-6">
                {currentExercises.length > 0 && (
                  <Card className="max-w-3xl mx-auto">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg lg:text-xl">Урок {currentExercise + 1} из {currentExercises.length}</CardTitle>
                        <Badge variant="secondary">{selectedLanguage}</Badge>
                      </div>
                      <Progress value={((currentExercise + 1) / currentExercises.length) * 100} className="mt-4" />
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="bg-accent/10 p-6 rounded-xl text-center">
                        <Badge className="mb-3">{currentExercises[currentExercise].category}</Badge>
                        <p className="text-xl lg:text-2xl font-bold text-gray-800">
                          {currentExercises[currentExercise].question}
                        </p>
                        {currentExercises[currentExercise].translation && (
                          <p className="text-sm text-gray-600 mt-2">({currentExercises[currentExercise].translation})</p>
                        )}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {currentExercises[currentExercise].options?.map((option, idx) => (
                          <Button
                            key={idx}
                            variant={selectedAnswer === option ? (option === currentExercises[currentExercise].correctAnswer ? "default" : "destructive") : "outline"}
                            className="h-auto py-4 text-base lg:text-lg"
                            onClick={() => !exerciseCompleted && handleAnswerCheck(option)}
                            disabled={exerciseCompleted}
                          >
                            {option}
                          </Button>
                        ))}
                      </div>

                      {exerciseCompleted && currentExercises[currentExercise].explanation && (
                        <div className="bg-green-50 p-4 rounded-lg">
                          <p className="text-sm text-green-800">
                            <strong>💡 Объяснение:</strong> {currentExercises[currentExercise].explanation}
                          </p>
                        </div>
                      )}

                      {exerciseCompleted && (
                        <Button onClick={handleNextExercise} className="w-full" size="lg">
                          {currentExercise < currentExercises.length - 1 ? 'Следующий вопрос' : 'Завершить урок'} 
                          <Icon name="ArrowRight" size={20} className="ml-2" />
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              <TabsContent value="grammar">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {grammarLessons.map((lesson) => (
                    <Card key={lesson.id} className="hover:shadow-xl transition-all">
                      <CardHeader>
                        <CardTitle className="text-lg">{lesson.title}</CardTitle>
                        <Badge variant="outline">{lesson.level}</Badge>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <p className="text-sm text-gray-600">{lesson.content}</p>
                        <div className="space-y-2">
                          <p className="text-sm font-semibold">Примеры:</p>
                          {lesson.examples.map((ex, idx) => (
                            <p key={idx} className="text-sm text-gray-700 pl-4 border-l-2 border-primary">{ex}</p>
                          ))}
                        </div>
                        <Button className="w-full" size="sm">Практиковать</Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="vocabulary">
                <div className="space-y-6">
                  {vocabularyCategories.map((category) => (
                    <Card key={category.category}>
                      <CardHeader>
                        <CardTitle>{category.category}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {category.words.map((word, idx) => (
                            <div key={idx} className="p-4 bg-accent/10 rounded-lg space-y-2">
                              <div className="flex items-center justify-between">
                                <p className="font-bold text-lg">{word.word}</p>
                                <Badge variant="secondary">{word.translation}</Badge>
                              </div>
                              <p className="text-sm text-gray-600 italic">"{word.example}"</p>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="stories">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {storiesDatabase.map((story) => (
                    <Card key={story.id} className="hover:shadow-xl transition-all">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg">{story.title}</CardTitle>
                          <Badge variant="outline">{story.level}</Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <ScrollArea className="h-64 pr-4">
                          <p className="text-sm text-gray-700 whitespace-pre-line">{story.content}</p>
                        </ScrollArea>
                        <Separator />
                        <div className="space-y-3">
                          <p className="font-semibold text-sm">Вопросы:</p>
                          {story.questions.map((q, idx) => (
                            <div key={idx} className="p-3 bg-accent/10 rounded-lg">
                              <p className="text-sm font-medium mb-2">{q.q}</p>
                              <div className="grid grid-cols-2 gap-2">
                                {q.options.map((opt, optIdx) => (
                                  <Button key={optIdx} variant="outline" size="sm" className="text-xs">
                                    {opt}
                                  </Button>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        )}

        {activeSection === 'casino' && (
          <div className="animate-fade-in">
            <h2 className="text-2xl lg:text-3xl font-bold mb-6">Казино & Игры</h2>
            <Tabs defaultValue="slots" className="w-full">
              <TabsList className="grid w-full grid-cols-4 md:grid-cols-6">
                <TabsTrigger value="slots">🎰 Слоты</TabsTrigger>
                <TabsTrigger value="wheel">🎡 Колесо</TabsTrigger>
                <TabsTrigger value="dice">🎲 Кости</TabsTrigger>
                <TabsTrigger value="memory">🧠 Память</TabsTrigger>
                <TabsTrigger value="chat">💬 Чат</TabsTrigger>
                <TabsTrigger value="games">🎮 Игры</TabsTrigger>
              </TabsList>

              <TabsContent value="slots">
                <Card className="max-w-2xl mx-auto">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">🎰 Слот-машина</CardTitle>
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
                        {isSpinning ? 'Крутим...' : 'Крутить (20 💰)'}
                      </Button>
                      <div className="mt-4 text-center text-white text-sm space-y-1">
                        <p>🎰 Три одинаковых = ДЖЕКПОТ!</p>
                        <p>💎 3x Алмазы = x8 | 7️⃣ 3x Семерки = x10</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="wheel">
                <Card className="max-w-2xl mx-auto">
                  <CardHeader>
                    <CardTitle>🎡 Колесо фортуны</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="relative w-full max-w-md mx-auto aspect-square">
                      <div 
                        className="w-full h-full rounded-full border-8 border-primary bg-gradient-to-br from-yellow-400 via-orange-400 to-red-400 transition-transform duration-3000 ease-out"
                        style={{ 
                          transform: `rotate(${wheelAngle}deg)`,
                          background: 'conic-gradient(from 0deg, #fbbf24 0deg 45deg, #dc2626 45deg 90deg, #10b981 90deg 135deg, #dc2626 135deg 180deg, #fbbf24 180deg 225deg, #dc2626 225deg 270deg, #10b981 270deg 315deg, #dc2626 315deg 360deg)'
                        }}
                      >
                        <div className="absolute top-1/2 left-1/2 w-12 h-12 bg-white rounded-full transform -translate-x-1/2 -translate-y-1/2 shadow-lg" />
                      </div>
                      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 text-4xl">⬇️</div>
                    </div>
                    <Button 
                      onClick={spinWheel}
                      disabled={isWheelSpinning || userStats.coins < 50}
                      className="w-full"
                      size="lg"
                    >
                      {isWheelSpinning ? 'Крутим...' : 'Крутить (50 💰)'}
                    </Button>
                    <p className="text-center text-sm text-gray-600">
                      Призы: 500, 200, 150, 100, 75, 50 монет
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="dice">
                <Card className="max-w-2xl mx-auto">
                  <CardHeader>
                    <CardTitle>🎲 Игра в кости</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center justify-center gap-8 p-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl">
                      {diceResults.map((dice, idx) => (
                        <div key={idx} className="w-24 h-24 bg-white rounded-xl flex items-center justify-center text-6xl font-bold shadow-2xl">
                          {dice}
                        </div>
                      ))}
                    </div>
                    <Button 
                      onClick={rollDice}
                      disabled={userStats.coins < 15}
                      className="w-full"
                      size="lg"
                    >
                      Бросить кости (15 💰)
                    </Button>
                    <div className="text-center text-sm space-y-1">
                      <p>🎲 Дубль (одинаковые) = сумма x10</p>
                      <p>🎲 Сумма ≥10 = 30 монет</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="memory">
                <Card className="max-w-3xl mx-auto">
                  <CardHeader>
                    <CardTitle>🧠 Игра на память</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-4 gap-3">
                      {memoryCards.map((card) => (
                        <button
                          key={card.id}
                          onClick={() => handleCardClick(card.id)}
                          className={`aspect-square text-4xl rounded-xl transition-all ${
                            card.flipped || card.matched
                              ? 'bg-white shadow-lg'
                              : 'bg-gradient-to-br from-blue-500 to-purple-500 hover:scale-105'
                          }`}
                          disabled={card.matched}
                        >
                          {(card.flipped || card.matched) ? card.symbol : '❓'}
                        </button>
                      ))}
                    </div>
                    <Button onClick={initMemoryGame} variant="outline" className="w-full">
                      <Icon name="RefreshCw" size={20} className="mr-2" />
                      Новая игра
                    </Button>
                    <p className="text-center text-sm text-gray-600">
                      Найдите все пары и выиграйте 100 💰 + 50 XP!
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="chat">
                <Card className="max-w-3xl mx-auto">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      💬 Чат сообщества
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-[500px] pr-4 mb-4">
                      {chatMessages.map((msg) => (
                        <div key={msg.id} className={`mb-4 ${msg.isBot ? 'text-left' : 'text-right'}`}>
                          <div className={`inline-block max-w-[80%] p-3 rounded-xl ${
                            msg.isBot ? 'bg-gray-100 text-gray-800' : 'bg-primary text-primary-foreground'
                          }`}>
                            <p className="font-semibold text-sm mb-1">{msg.user}</p>
                            <p>{msg.message}</p>
                            <p className="text-xs opacity-70 mt-1">{msg.time}</p>
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
              </TabsContent>

              <TabsContent value="games">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {miniGames.map((game) => (
                    <Card key={game.id} className="hover:shadow-xl transition-all">
                      <CardContent className="p-6 space-y-4">
                        <div className="text-6xl text-center">{game.icon}</div>
                        <div className="text-center">
                          <h3 className="text-xl font-bold">{game.name}</h3>
                          <p className="text-sm text-gray-600 mt-2">{game.description}</p>
                        </div>
                        <div className="text-sm text-center text-gray-500">
                          <p>Ставка: {game.cost} 💰</p>
                          <p>Выигрыш: {game.minReward}-{game.maxReward} 💰</p>
                        </div>
                        <Button className="w-full" disabled={game.type !== 'slots' && game.type !== 'wheel' && game.type !== 'dice' && game.type !== 'memory'}>
                          {game.type === 'slots' || game.type === 'wheel' || game.type === 'dice' || game.type === 'memory' ? 'Играть' : 'Скоро'}
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        )}

        {activeSection === 'shop' && (
          <div className="animate-fade-in">
            <h2 className="text-2xl lg:text-3xl font-bold mb-6">Магазин</h2>
            <Tabs defaultValue="boosters" className="w-full">
              <TabsList className="grid w-full grid-cols-5 max-w-2xl mx-auto mb-6">
                <TabsTrigger value="boosters">Бустеры</TabsTrigger>
                <TabsTrigger value="cosmetic">Косметика</TabsTrigger>
                <TabsTrigger value="avatar">Аватары</TabsTrigger>
                <TabsTrigger value="badge">Значки</TabsTrigger>
                <TabsTrigger value="premium">Премиум</TabsTrigger>
              </TabsList>

              {['boosters', 'cosmetic', 'avatar', 'badge', 'premium'].map((tab) => (
                <TabsContent key={tab} value={tab}>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {shopItems.filter(item => item.type === tab.replace('boosters', 'booster')).map((item) => (
                      <Card key={item.id} className={`hover:shadow-xl transition-all ${
                        item.rarity === 'legendary' ? 'border-2 border-yellow-500' :
                        item.rarity === 'epic' ? 'border-2 border-purple-500' :
                        item.rarity === 'rare' ? 'border-2 border-blue-500' : ''
                      }`}>
                        <CardContent className="p-6 space-y-4">
                          <div className="text-6xl text-center">{item.icon}</div>
                          <div className="text-center">
                            <h3 className="text-lg lg:text-xl font-bold">{item.name}</h3>
                            {item.rarity && (
                              <Badge className="mt-1" variant={
                                item.rarity === 'legendary' ? 'default' :
                                item.rarity === 'epic' ? 'secondary' : 'outline'
                              }>
                                {item.rarity === 'legendary' ? '⭐ Легендарный' :
                                 item.rarity === 'epic' ? '💜 Эпический' :
                                 item.rarity === 'rare' ? '💙 Редкий' : '⚪ Обычный'}
                              </Badge>
                            )}
                            <p className="text-sm text-gray-600 mt-2">{item.description}</p>
                          </div>
                          <div className="flex items-center justify-between">
                            <Badge className="text-lg">
                              {item.price} {item.currency === 'gems' ? '💎' : '💰'}
                            </Badge>
                            <Button onClick={() => handleBuyItem(item)}>Купить</Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        )}

        {activeSection === 'profile' && (
          <div className="animate-fade-in max-w-6xl mx-auto">
            <h2 className="text-2xl lg:text-3xl font-bold mb-6">Мой профиль</h2>
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
                      <span>Гемы:</span>
                      <span className="font-bold">{userStats.gems} 💎</span>
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

                  <Separator />

                  <div>
                    <h4 className="font-semibold mb-4">Последние достижения</h4>
                    <div className="space-y-2">
                      {achievements.filter(a => a.unlocked).slice(0, 3).map((achievement) => (
                        <div key={achievement.id} className="flex items-center gap-3 p-3 bg-accent/10 rounded-lg">
                          <div className="text-3xl">{achievement.icon}</div>
                          <div className="flex-1">
                            <p className="font-semibold text-sm">{achievement.name}</p>
                            <p className="text-xs text-gray-600">{achievement.description}</p>
                          </div>
                          <Badge className="bg-green-500">✓</Badge>
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
            <h2 className="text-2xl lg:text-3xl font-bold mb-6">Достижения</h2>
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
                    {achievement.unlocked ? (
                      <Badge className="w-full justify-center bg-green-500">Получено! ✅</Badge>
                    ) : achievement.reward && (
                      <div className="flex gap-2 justify-center">
                        <Badge variant="outline">+{achievement.reward.xp} XP</Badge>
                        <Badge variant="outline">+{achievement.reward.coins} 💰</Badge>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeSection === 'leaderboard' && (
          <div className="animate-fade-in max-w-3xl mx-auto">
            <h2 className="text-2xl lg:text-3xl font-bold mb-6">Таблица лидеров</h2>
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
                        <div className={`text-2xl font-bold min-w-[3rem] ${
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
