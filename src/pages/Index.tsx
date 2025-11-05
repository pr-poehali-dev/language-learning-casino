import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';

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
}

export default function Index() {
  const [activeSection, setActiveSection] = useState('home');
  const [userStats] = useState<UserStats>({
    coins: 500,
    streak: 7,
    xp: 1250,
    level: 5,
  });

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-orange-50">
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="text-4xl animate-bounce-subtle">🦉</div>
              <h1 className="text-2xl font-bold text-primary">LinguaQuest</h1>
            </div>

            <div className="hidden md:flex items-center gap-6">
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
                  <span>{item.label}</span>
                </button>
              ))}
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 bg-yellow-100 px-4 py-2 rounded-full">
                <span className="text-2xl">💰</span>
                <span className="font-bold text-yellow-800">{userStats.coins}</span>
              </div>
              <div className="flex items-center gap-2 bg-orange-100 px-4 py-2 rounded-full">
                <span className="text-2xl">🔥</span>
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
                <Button className="gap-2">
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
          <div className="animate-fade-in">
            <h2 className="text-3xl font-bold mb-6">Обучение</h2>
            <Card>
              <CardContent className="p-8 text-center">
                <div className="text-6xl mb-4">📚</div>
                <p className="text-xl text-gray-600">Раздел в разработке</p>
              </CardContent>
            </Card>
          </div>
        )}

        {activeSection === 'casino' && (
          <div className="animate-fade-in">
            <h2 className="text-3xl font-bold mb-6">Казино-чат</h2>
            <Card>
              <CardContent className="p-8 text-center">
                <div className="text-6xl mb-4">🎰</div>
                <p className="text-xl text-gray-600">Раздел в разработке</p>
              </CardContent>
            </Card>
          </div>
        )}

        {activeSection === 'shop' && (
          <div className="animate-fade-in">
            <h2 className="text-3xl font-bold mb-6">Магазин</h2>
            <Card>
              <CardContent className="p-8 text-center">
                <div className="text-6xl mb-4">🛍️</div>
                <p className="text-xl text-gray-600">Раздел в разработке</p>
              </CardContent>
            </Card>
          </div>
        )}

        {activeSection === 'profile' && (
          <div className="animate-fade-in">
            <h2 className="text-3xl font-bold mb-6">Профиль</h2>
            <Card>
              <CardContent className="p-8 text-center">
                <div className="text-6xl mb-4">👤</div>
                <p className="text-xl text-gray-600">Раздел в разработке</p>
              </CardContent>
            </Card>
          </div>
        )}

        {activeSection === 'achievements' && (
          <div className="animate-fade-in">
            <h2 className="text-3xl font-bold mb-6">Достижения</h2>
            <Card>
              <CardContent className="p-8 text-center">
                <div className="text-6xl mb-4">🏆</div>
                <p className="text-xl text-gray-600">Раздел в разработке</p>
              </CardContent>
            </Card>
          </div>
        )}

        {activeSection === 'leaderboard' && (
          <div className="animate-fade-in">
            <h2 className="text-3xl font-bold mb-6">Рейтинг</h2>
            <Card>
              <CardContent className="p-8 text-center">
                <div className="text-6xl mb-4">🥇</div>
                <p className="text-xl text-gray-600">Раздел в разработке</p>
              </CardContent>
            </Card>
          </div>
        )}
      </main>
    </div>
  );
}
