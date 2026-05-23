import React, { useState } from 'react';
import { Settings, Camera, Tv, Music, Gamepad2, Globe, ShoppingBag } from 'lucide-react';

type Section = 'main' | 'settings' | 'photo' | 'video' | 'music' | 'game' | 'network' | 'store';

export default function App() {
  const [activeSection, setActiveSection] = useState<Section>('main');
  const [activeArticle, setActiveArticle] = useState<string | null>(null);

  type NavItem = {
    id: Section;
    label: string;
    icon?: React.ElementType;
    img?: string;
  };

  const navItems: NavItem[] = [
    { id: 'settings', label: 'Настройки', icon: Settings },
    { id: 'photo', label: 'Фото', icon: Camera },
    { id: 'video', label: 'ТВ/видео', img: '/MIWPTV.png' },
    { id: 'music', label: 'Музыка', icon: Music },
    { id: 'game', label: 'Игра', icon: Gamepad2 },
    { id: 'network', label: 'Сеть', icon: Globe },
    { id: 'store', label: 'MIWP™ store', img: '/MIWPstore.png' },
  ];

  const currentSectionLabel = navItems.find((i) => i.id === activeSection)?.label;

  return (
    <div className="flex flex-col min-h-screen font-sans bg-white text-gray-900">
      {/* Header */}
      <header className="bg-gradient-to-b from-[#3a3a3a] to-[#050505] text-white flex justify-center w-full px-4 py-3 shadow-md shrink-0 border-b border-gray-600">
        <div className="flex w-full max-w-[1024px] justify-between items-center">
          <div 
            className="flex items-center space-x-3 cursor-pointer group"
            onClick={() => {
              setActiveSection('main');
              setActiveArticle(null);
            }}
          >
          {/* Logo replacement as requested */}
          <div className="w-[60px] h-10 flex items-center justify-center bg-transparent relative overflow-hidden">
             <img src="/logosite.png" alt="MIWP™ Logo" className="object-contain w-full h-full" onError={(e) => {
               // Fallback visually if image is missing in public dir
               e.currentTarget.style.display = 'none';
               e.currentTarget.parentElement!.innerHTML = '<div class="text-xs font-bold text-gray-300 text-center uppercase tracking-widest border border-gray-400 px-1 rounded">LOGO</div>';
             }} />
          </div>
          <div className="flex flex-col">
            <span className="text-[11px] leading-tight text-gray-300 font-semibold uppercase tracking-wide group-hover:text-white transition-colors">
              Media Interface Web Program
            </span>
            <span className="text-lg leading-tight font-bold group-hover:text-blue-100 transition-colors">
              Руководство пользователя
            </span>
          </div>
        </div>
        
          <div className="flex items-center">
            <input 
              type="text" 
              className="w-48 h-6 px-2 text-xs text-black border-none focus:outline-none bg-white" 
              placeholder=""
            />
            <button className="h-6 px-3 bg-gradient-to-b from-[#ffffff] to-[#d6d6d6] hover:from-white hover:to-gray-100 text-black text-xs font-bold border-l border-gray-400 flex items-center justify-center">
              Поиск
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex flex-1 w-full max-w-[1024px] mx-auto overflow-hidden">
        {/* Sidebar */}
        <aside className="w-[260px] bg-[#ebebeb] border-r border-[#d6d6d6] flex flex-col p-3 shrink-0 overflow-y-auto">
          {/* Top Main Menu Button */}
          <div 
            onClick={() => {
              setActiveSection('main');
              setActiveArticle(null);
            }}
            className={`
              w-full bg-white border border-[#d6d6d6] rounded p-3 mb-4 cursor-pointer
              hover:bg-[#f6f6f6] transition-colors flex items-center
              ${activeSection === 'main' ? 'font-black text-black shadow-inner shadow-gray-200' : 'font-bold text-gray-800'}
            `}
          >
            <span className="text-[13px]">Меню MIWP™</span>
          </div>

          {/* Navigation Items */}
          <div className="w-full bg-white border border-[#d6d6d6] rounded overflow-hidden flex flex-col">
            {navItems.map((item) => (
              <div
                key={item.id}
                onClick={() => {
                  setActiveSection(item.id);
                  setActiveArticle(null);
                }}
                className={`flex items-center space-x-3 px-3 py-3 border-b border-[#f0f0f0] last:border-b-0 cursor-pointer overflow-hidden transition-colors ${
                  activeSection === item.id 
                    ? 'bg-[#e2e8f0]' 
                    : 'hover:bg-[#f5f7fa]'
                }`}
              >
                {item.icon ? (
                  <item.icon className="w-[22px] h-[22px] text-[#4a4a4a] shrink-0" strokeWidth={2.5} />
                ) : (
                  <img src={item.img} alt={item.label} className="w-[22px] h-[22px] object-contain shrink-0 drop-shadow-sm" />
                )}
                <span className="text-[13px] font-bold text-[#333] tracking-tight">{item.label}</span>
              </div>
            ))}
          </div>
        </aside>

        {/* Content Panel */}
        <main className="flex-1 bg-white p-8 md:p-12 overflow-y-auto">
          {activeSection === 'main' ? (
            <div className="max-w-[800px]">
              <h1 className="text-xl font-bold mb-6 text-black tracking-tight leading-snug">
                MIWP™ Hub (Media Interface Web Program Hub)<br />Руководство пользователя
              </h1>
              
              <div className="space-y-4 text-[13.5px] text-[#222]">
                <p>
                  Данное руководство предназначено для системного программного обеспечения Media Interface Web Program версии 1.0 или более поздней.
                </p>
                <p>
                </p>

                <h2 className="text-[#cc0000] font-bold mt-8 mb-2">ВАЖНО</h2>
                <ul className="list-disc pl-6 space-y-3">
                  <li>
                    Media Interface Web Program НЕ связан с Sony и НЕ поддерживается Sony.
                    <br />
                    <a href="#" className="text-[#0055aa] hover:underline">&gt; Подробнее</a>
                  </li>
                  <li>
                    Периодически мы можем изменять некоторые службы и функции системы MIWP™ или прекращать их действие.
                    Эти изменения могут не отображаться в Руководстве пользователя
                  </li>
                </ul>
              </div>

              {/* Bottom links */}
              <div className="mt-16 pt-6 border-t border-[#e0e0e0] text-[12px] text-[#0055aa] leading-relaxed flex flex-wrap gap-x-2">
                <a href="#" className="hover:underline">Важные замечания для пользователей</a> <span className="text-gray-400">|</span>
                <a href="#" className="hover:underline">О данном Руководстве</a> <span className="text-gray-400">|</span>
                <a href="#" className="hover:underline">Авторские права и торговые марки</a> <span className="text-gray-400">|</span>
                <a href="#" className="hover:underline">Содержание</a> <span className="text-gray-400"></span>
              </div>
            </div>
          ) : activeSection === 'store' ? (
            <div className="max-w-[800px]">
               <div className="border-b border-[#ccc] pb-2 mb-6">
                 <h2 className="text-lg font-bold text-[#333]">{currentSectionLabel}</h2>
               </div>
               
               {activeArticle === 'overview' ? (
                 <div className="text-[13.5px] text-[#222]">
                   <h1 className="text-xl font-bold mb-6 text-black tracking-tight leading-snug">
                     Обзор MIWP™ store
                   </h1>
                   <p className="mb-4">
                     MIWP™ store — это интернет-магазин созданный специально для MIWP™. В нём можно скачать игры, приложения и музыку.
                   </p>
                   <div className="my-6">
                     <img src="/storeinterface1.png" alt="MIWP™ Store Interface" className="max-w-full" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                   </div>
                   
                   <div className="space-y-4">
                     <div>
                       <div className="font-bold">(1) Навигационная панель</div>
                       <div className="mt-1">Этот элемент служит для переключения между основными разделами магазина (<em>«Все», «Игры», «Приложения», «Музыка», «Поиск»</em>).</div>
                     </div>
                     <div>
                       <div className="font-bold">(2) Выбранный элемент</div>
                       <div className="mt-1">То что сейчас выбрано. Вы можете менять выбор на клавиши 🡠, 🡣, 🡡, 🡢.</div>
                     </div>
                     <div>
                       <div className="font-bold">(3) Описание</div>
                       <div className="mt-1">Описание приложения.</div>
                     </div>
                     <div>
                       <div className="font-bold">(4) Кнопка «Скачать»</div>
                       <div className="mt-1">При нажатии на неё вы увидите это окно:</div>
                     </div>
                   </div>

                   <div className="my-6">
                     <img src="/storeinterface2.png" alt="MIWP Store Download" className="max-w-full" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                   </div>

                   <div className="space-y-2">
                     <p>Если вы выберете «В ФОНЕ» то загрузка начнётся в фоне.</p>
                     <p>Если вы выберете «СЕЙЧАС» то управление на время скачивания заблокируется и разблокируется когда всё будет готово. <em>Это рекомендуемый вариант загрузки</em></p>
                   </div>
                 </div>
               ) : (
                 <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <div className="w-3.5 h-3.5 border-[1.5px] border-gray-500 rounded-sm flex items-center justify-center font-bold text-gray-500 text-[10px]">
                        -
                      </div>
                      <span 
                        className="text-[14px] font-bold text-[#0055aa] hover:underline cursor-pointer"
                        onClick={() => setActiveArticle('overview')}
                      >
                        Обзор MIWP store
                      </span>
                    </div>
                 </div>
               )}
            </div>
          ) : (
            <div className="max-w-[800px]">
               <div className="border-b border-[#ccc] pb-2 mb-6">
                 <h2 className="text-lg font-bold text-[#333]">{currentSectionLabel}</h2>
               </div>
               <p className="text-[13px] text-gray-500 italic">
                 Информация для раздела «{currentSectionLabel}» пока отсутствует.
               </p>
            </div>
          )}
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-gradient-to-b from-[#3a3a3a] to-[#050505] text-[#b3b3b3] text-[11px] px-6 py-2 border-t border-[#4a4a4a] flex justify-center shrink-0">
        <div className="flex w-full max-w-[1024px] justify-between items-center">
          <div>23.05.2026-23.05.2026 © MIWP oorraannggee. Все права защищены.</div>
          <div className="flex items-center space-x-2">
             {activeSection !== 'main' && (
               <button 
                 onClick={() => {
                   setActiveSection('main');
                   setActiveArticle(null);
                 }}
                 className="bg-gradient-to-b from-[#555] to-[#222] border border-[#666] hover:from-[#666] hover:to-[#333] cursor-pointer text-white px-3 py-1 rounded text-[10px] font-bold shadow-sm flex items-center space-x-2 transition-colors"
               >
                  <img src="/back.png" alt="Back" className="w-3 h-3 object-contain" onError={(e) => e.currentTarget.style.display = 'none'} />
                  <span>На главную страницу</span>
               </button>
             )}
          </div>
        </div>
      </footer>
    </div>
  );
}
