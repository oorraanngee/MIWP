import React, { useState, useEffect } from 'react';
import { Settings, Camera, Tv, Music, Gamepad2, Globe, ShoppingBag } from 'lucide-react';

type Section = 'main' | 'settings' | 'photo' | 'video' | 'music' | 'game' | 'network' | 'store' | 'menu' | 'search';

export default function App() {
  const [activeSection, _setActiveSection] = useState<Section>('main');
  const [activeArticle, _setActiveArticle] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [submittedQuery, setSubmittedQuery] = useState('');
  const [openCategories, setOpenCategories] = useState<Record<string, boolean>>({});

  const activeSectionRef = React.useRef<Section>('main');
  activeSectionRef.current = activeSection;

  const sectionToPath: Record<Section, string> = {
    main: '/',
    settings: '/Settings',
    photo: '/Photo',
    video: '/Video',
    music: '/Music',
    game: '/Game',
    network: '/Network',
    store: '/Store',
    menu: '/Menu',
    search: '/Search'
  };

  const articleToPath: Record<string, string> = {
    'bg-color': '/Settings/Fon/Cvet-fona',
    'bg-wave-speed': '/Settings/Fon/Skorost-volny',
    'bg-particle-speed': '/Settings/Fon/Skorost-chastic',
    'bg-wave': '/Settings/Fon/Volna',
    'bg-particles': '/Settings/Fon/Chasticy',
    'sys-about-sys': '/Settings/Sistema/Ob-sisteme',
    'sys-about-app': '/Settings/Sistema/Ob-programme',
    'overview': '/Store/Obzor-MIWP-store',
    'cwm-overview': '/Menu/Menyu-CWM',
    'tv-channels': '/Video/TV-kanaly'
  };

  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname.toLowerCase();
      
      const articleMatch = Object.entries(articleToPath).find(([_, v]) => v.toLowerCase() === path);
      if (articleMatch) {
         const article = articleMatch[0];
         let section: Section = 'main';
         if (article.startsWith('bg-') || article.startsWith('sys-')) section = 'settings';
         else if (article === 'overview') section = 'store';
         else if (article === 'cwm-overview') section = 'menu';
         else if (article === 'tv-channels') section = 'video';

         _setActiveSection(section);
         _setActiveArticle(article);
         if (article.startsWith('bg-')) setOpenCategories(prev => ({...prev, bg: true}));
         if (article.startsWith('sys-')) setOpenCategories(prev => ({...prev, sys: true}));
         return;
      }

      const sectionMatch = Object.entries(sectionToPath).find(([_, v]) => v.toLowerCase() === path);
      if (sectionMatch) {
         _setActiveSection(sectionMatch[0] as Section);
         _setActiveArticle(null);
         return;
      }

      // Default
      _setActiveSection('main');
      _setActiveArticle(null);
    };

    window.addEventListener('popstate', handlePopState);
    handlePopState(); // Init on mount

    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateTo = (section: Section, article: string | null = null, forceSyncUrl = true) => {
    activeSectionRef.current = section;
    _setActiveSection(section);
    _setActiveArticle(article);
    
    if (forceSyncUrl) {
      let nextPath = '/';
      if (article) {
        nextPath = articleToPath[article] || '/';
      } else {
        nextPath = sectionToPath[section] || '/';
      }
      
      if (window.location.pathname.toLowerCase() !== nextPath.toLowerCase()) {
        window.history.pushState({}, '', nextPath);
      }
    }
  };

  const setActiveSection = (section: Section) => {
    navigateTo(section, null);
  };

  const setActiveArticle = (article: string | null) => {
    navigateTo(activeSectionRef.current, article);
  };

  const toggleCategory = (category: string) => {
    setOpenCategories(prev => ({ ...prev, [category]: !prev[category] }));
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      setActiveSection('search');
      setActiveArticle(null);
      setSubmittedQuery(searchQuery);
    }
  };

  const searchableContent = [
    {
      title: 'Главная страница',
      section: 'main',
      content: 'MIWP Hub Руководство пользователя ВАЖНО Данное руководство предназначено для системного программного обеспечения Media Interface Web Program версии 1.0 или более поздней. Media Interface Web Program НЕ связан с Sony и НЕ поддерживается Sony. Периодически мы можем изменять некоторые службы и функции системы MIWP™ или прекращать их действие.',
    },
    {
      title: 'Обзор MIWP store',
      section: 'store',
      article: 'overview',
      content: 'Обзор MIWP™ store MIWP™ store — это интернет-магазин созданный специально для MIWP™. В нём можно скачать игры, приложения и музыку. Навигационная панель Выбранный элемент Описание Кнопка Скачать В ФОНЕ СЕЙЧАС',
    },
    {
      title: 'Меню CWM™ (CrossWebMenu™)',
      section: 'menu',
      article: 'cwm-overview',
      content: 'Использование меню CWM™ Пользовательский интерфейс системы MIWP™ называется CWM™ (CrossWebMenu™). B горизонтальном ряду отображаются функции и категории системы, а в вертикальной колонке отображаются элементы, которые могут быть использованы в любой категории. Перемещение по разделам и элементам осуществляется кнопками Подтверждение выбора элемента Отмена операции Перемещение по меню Использование панели управления При воспроизведении материалов нажмите любую кнопку или дёрните мышью для отображения панели управления. Элементы панели управления зависят от воспроизводимого контента.',
    },
    {
      title: 'Цвет фона',
      section: 'settings',
      article: 'bg-color',
      content: 'Здесь вы можете выбрать цвет фона для CWM™. Доступные цвета: синий, серый, фиолетовый, зелёный, свой. При выборе варианта «Свой» вам потребуется ввести HEX-код цвета.'
    },
    {
      title: 'Скорость волны',
      section: 'settings',
      article: 'bg-wave-speed',
      content: 'Здесь вы можете выбрать скорость фоновой волны CWM™. Доступные варианты: «Медленный», «Средний», «Быстрый».'
    },
    {
      title: 'Скорость частиц',
      section: 'settings',
      article: 'bg-particle-speed',
      content: 'Здесь вы можете выбрать скорость фоновых частиц CWM™. Доступные варианты: «Медленный», «Средний», «Быстрый».'
    },
    {
      title: 'Волна',
      section: 'settings',
      article: 'bg-wave',
      content: 'Здесь вы можете выбрать отображение волны CWM™. Доступные варианты: «Вкл.», «Откл.».'
    },
    {
      title: 'Частицы',
      section: 'settings',
      article: 'bg-particles',
      content: 'Здесь вы можете выбрать отображение частиц CWM™. Доступные варианты: «Вкл.», «Откл.».'
    },
    {
      title: 'Об системе',
      section: 'settings',
      article: 'sys-about-sys',
      content: 'Здесь вы можете узнать ОС, процессор и архитектуру вашего устройства.'
    },
    {
      title: 'Об программе',
      section: 'settings',
      article: 'sys-about-app',
      content: 'Здесь доступна информация о приложении, интерфейсе и текущей версии. По умолчанию указаны следующие данные: Программа: MIWP™ (Media Interface Web Program™) Интерфейс: CWM™ (CrossWebMenu™) Версия: 1.0'
    },
    {
      title: 'ТВ каналы',
      section: 'video',
      article: 'tv-channels',
      content: 'В разделе «ТВ / Видео» вы можете найти приложение «ТВ-каналы». При нажатии откроется список, в котором можно выбрать нужный ТВ-канал. Управлять ТВ-плеером можно с помощью кнопок. Также поддерживается управление мышью (ЛКМ и колёсико). Элементы плеера: (1) Стоп / Пауза. (2) Перемотка на 1 секунду вперёд / назад. (3) Следующий / предыдущий канал. (4) Таймлайн. (5) Список доступных каналов. Перемещение по списку осуществляется кнопками, выбор — кнопкой. Также можно управлять мышью: навести курсор на канал, прокрутить список колёсиком и нажать ЛКМ. Для выхода из этого меню нажмите или кликните ЛКМ мимо меню. (6) Название канала. Примечания: Плеер подгружает трансляцию из интернета в реальном времени, поэтому для его работы необходимо активное сетевое подключение. Плеер использует каналы из iptv-org.'
    }
  ];

  const searchResults = searchableContent.filter(item => 
    submittedQuery && (item.title.toLowerCase().includes(submittedQuery.toLowerCase()) || 
    item.content.toLowerCase().includes(submittedQuery.toLowerCase()))
  );

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

  const currentSectionLabel = activeSection === 'menu' ? 'Меню CWM™' : 
                              activeSection === 'search' ? 'Результаты поиска' :
                              navItems.find((i) => i.id === activeSection)?.label;

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
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />
            <button 
              onClick={handleSearch}
              className="h-6 px-3 bg-gradient-to-b from-[#ffffff] to-[#d6d6d6] hover:from-white hover:to-gray-100 text-black text-xs font-bold border-l border-gray-400 flex items-center justify-center"
            >
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
              setActiveSection('menu');
              setActiveArticle(null);
            }}
            className={`
              w-full bg-white border border-[#d6d6d6] rounded p-3 mb-4 cursor-pointer
              hover:bg-[#f6f6f6] transition-colors flex items-center
              ${activeSection === 'menu' ? 'font-black text-black shadow-inner shadow-gray-200' : 'font-bold text-gray-800'}
            `}
          >
            <span className="text-[13px]">Меню CWM™</span>
          </div>

          {/* Navigation Items */}
          <div className="w-full bg-white border border-[#d6d6d6] rounded overflow-hidden flex flex-col">
            {navItems.map((item) => (
              <div
                key={item.id}
                onClick={() => {
                  setActiveSection(item.id);
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
                  <img src={item.img} alt={item.label} className="w-[22px] h-[22px] object-contain shrink-0" />
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
                MIWP™ (Media Interface Web Program™)<br />Руководство пользователя
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
               {!activeArticle && (
                 <div className="border-b border-[#ccc] pb-2 mb-6 flex items-center space-x-2">
                   <img src="/MIWPstore.png" alt="MIWP Store" className="w-[28px] h-[28px] object-contain" onError={(e) => e.currentTarget.style.display = 'none'} />
                   <h2 className="text-lg font-bold text-[#333]">{currentSectionLabel}</h2>
                 </div>
               )}
               
               {activeArticle === 'overview' ? (
                 <div className="text-[13.5px] text-[#222]">
                   <h1 className="text-xl font-bold mb-2 text-black tracking-tight leading-snug">
                     Обзор MIWP™ store
                   </h1>
                   <div className="text-[12px] mb-6">
                     <span className="text-[#0055aa] hover:underline cursor-pointer" onClick={() => setActiveArticle(null)}>MIWP™ store</span>
                     <span className="text-gray-500 mx-1">&gt;</span>
                     <span className="text-gray-800">Обзор MIWP™ store</span>
                   </div>
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
                      <img src="/minus.png" alt="minus" className="w-3.5 h-3.5 object-contain" onError={(e) => e.currentTarget.style.display = 'none'} />
                      <span 
                        className="text-[14px] font-bold text-[#3a3a3a] hover:bg-[#336699] hover:text-[#ffffff] cursor-pointer px-1"
                        onClick={() => setActiveArticle('overview')}
                      >
                        Обзор MIWP store
                      </span>
                    </div>
                 </div>
               )}
            </div>
          ) : activeSection === 'search' ? (
            <div className="max-w-[800px]">
               <div className="border-b border-[#ccc] pb-2 mb-6">
                 <h2 className="text-lg font-bold text-[#333]">Результаты поиска</h2>
               </div>
               {searchResults.length > 0 ? (
                 <div className="space-y-4">
                   {searchResults.map((result, idx) => (
                     <div key={idx} className="border-b border-[#eee] pb-3">
                       <h3 
                         className="text-[15px] font-bold text-[#0055aa] hover:underline cursor-pointer"
                         onClick={() => {
                           setActiveSection(result.section as Section);
                           if (result.article) {
                             setActiveArticle(result.article);
                           } else {
                             setActiveArticle(null);
                           }
                         }}
                       >
                         {result.title}
                       </h3>
                       <p className="text-[13px] text-gray-600 mt-1 line-clamp-2">
                         {result.content}
                       </p>
                     </div>
                   ))}
                 </div>
               ) : (
                 <p className="text-[13px] text-gray-500">
                   По запросу «{submittedQuery}» ничего не найдено.
                 </p>
               )}
            </div>
          ) : activeSection === 'menu' ? (
             <div className="max-w-[800px]">
               {!activeArticle && (
                 <div className="border-b border-[#ccc] pb-2 mb-6">
                   <h2 className="text-lg font-bold text-[#333]">{currentSectionLabel}</h2>
                 </div>
               )}
               
               {activeArticle === 'cwm-overview' ? (
                 <div className="text-[13.5px] text-[#222]">
                   <h1 className="text-xl font-bold mb-2 text-black tracking-tight leading-snug">
                     Меню CWM™ (CrossWebMenu™)
                   </h1>
                   <div className="text-[12px] mb-6">
                     <span className="text-[#0055aa] hover:underline cursor-pointer" onClick={() => setActiveArticle(null)}>Меню CWM™</span>
                     <span className="text-gray-500 mx-1">&gt;</span>
                     <span className="text-gray-800">Меню CWM™ (CrossWebMenu™)</span>
                   </div>
                   
                   <h2 className="font-bold text-[14px] mb-2 mt-6">Использование меню CWM™</h2>
                   <p className="mb-4">
                     Пользовательский интерфейс системы MIWP™ называется CWM™ (CrossWebMenu™). B горизонтальном ряду отображаются функции и категории системы, а в вертикальной колонке отображаются элементы, которые могут быть использованы в любой категории. Перемещение по разделам и элементам осуществляется кнопками 
                     {' '}<img src="/down.png" className="inline-block h-8 align-middle mx-1" alt="down" onError={(e) => e.currentTarget.style.display = 'none'} />, 
                     {' '}<img src="/up.png" className="inline-block h-8 align-middle mx-1" alt="up" onError={(e) => e.currentTarget.style.display = 'none'} />, 
                     {' '}<img src="/right.png" className="inline-block h-8 align-middle mx-1" alt="right" onError={(e) => e.currentTarget.style.display = 'none'} />, 
                     {' '}<img src="/left.png" className="inline-block h-8 align-middle mx-1" alt="left" onError={(e) => e.currentTarget.style.display = 'none'} />.
                   </p>
                   
                   <div className="my-6">
                     <img src="/menucwm.png" alt="CWM Menu Interface" className="max-w-full" onError={(e) => e.currentTarget.style.display = 'none'} />
                   </div>

                   <table className="w-full border-collapse mb-6 text-[13px] border border-[#d6d6d6]">
                     <thead>
                       <tr className="bg-[#f0f0f0]">
                         <th className="border border-[#ccc] px-3 py-2 text-left font-bold w-1/3">Кнопка</th>
                         <th className="border border-[#ccc] px-3 py-2 text-left font-bold">Что делает</th>
                       </tr>
                     </thead>
                     <tbody>
                       <tr className="bg-white">
                         <td className="border border-[#ccc] px-3 py-2">
                           Кнопка <img src="/Enter.png" className="inline-block h-8 align-middle mx-1" alt="Enter" onError={(e) => e.currentTarget.style.display = 'none'} />
                         </td>
                         <td className="border border-[#ccc] px-3 py-2">Подтверждение выбора элемента</td>
                       </tr>
                       <tr className="bg-[#f9f9f9]">
                         <td className="border border-[#ccc] px-3 py-2">
                           Кнопки <img src="/Backspace.png" className="inline-block h-8 align-middle mx-1" alt="Backspace" onError={(e) => e.currentTarget.style.display = 'none'} />, 
                           <img src="/Esc.png" className="inline-block h-8 align-middle mx-1" alt="Esc" onError={(e) => e.currentTarget.style.display = 'none'} />
                         </td>
                         <td className="border border-[#ccc] px-3 py-2">Отмена операции.</td>
                       </tr>
                       <tr className="bg-white">
                         <td className="border border-[#ccc] px-3 py-2">
                           Кнопки <img src="/down.png" className="inline-block h-8 align-middle mx-1" alt="down" onError={(e) => e.currentTarget.style.display = 'none'} />, 
                           <img src="/up.png" className="inline-block h-8 align-middle mx-1" alt="up" onError={(e) => e.currentTarget.style.display = 'none'} />, 
                           <img src="/right.png" className="inline-block h-8 align-middle mx-1" alt="right" onError={(e) => e.currentTarget.style.display = 'none'} />, 
                           <img src="/left.png" className="inline-block h-8 align-middle mx-1" alt="left" onError={(e) => e.currentTarget.style.display = 'none'} />
                         </td>
                         <td className="border border-[#ccc] px-3 py-2">Перемещение по меню.</td>
                       </tr>
                     </tbody>
                   </table>

                   <h2 className="font-bold text-[14px] mb-2 mt-8">Использование панели управления</h2>
                   <p className="mb-4">
                     При воспроизведении материалов нажмите любую кнопку или дёрните мышью для отображения панели управления. Элементы панели управления зависят от воспроизводимого контента.
                   </p>
                 </div>
               ) : (
                 <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <img src="/minus.png" alt="minus" className="w-3.5 h-3.5 object-contain" onError={(e) => e.currentTarget.style.display = 'none'} />
                      <span 
                        className="text-[14px] font-bold text-[#3a3a3a] hover:bg-[#336699] hover:text-[#ffffff] cursor-pointer px-1"
                        onClick={() => setActiveArticle('cwm-overview')}
                      >
                        Меню CWM™ (CrossWebMenu™)
                      </span>
                    </div>
                 </div>
               )}
             </div>
          ) : activeSection === 'settings' ? (
             <div className="max-w-[800px]">
               {!activeArticle && (
                 <div className="border-b border-[#ccc] pb-2 mb-6">
                   <h2 className="text-lg font-bold text-[#333]">{currentSectionLabel}</h2>
                 </div>
               )}
               
               {activeArticle === 'bg-color' ? (
                 <div className="text-[13.5px] text-[#222]">
                   <h1 className="text-xl font-bold mb-2 text-black tracking-tight leading-snug">Цвет фона</h1>
                   <div className="text-[12px] mb-6">
                     <span className="text-[#0055aa] hover:underline cursor-pointer" onClick={() => setActiveArticle(null)}>Настройки</span>
                     <span className="text-gray-500 mx-1">&gt;</span>
                     <span className="text-[#0055aa] hover:underline cursor-pointer" onClick={() => { setOpenCategories(prev => ({ ...prev, bg: true })); setActiveArticle(null); }}>Фон</span>
                     <span className="text-gray-500 mx-1">&gt;</span>
                     <span className="text-gray-800">Цвет фона</span>
                   </div>
                   <p className="mb-4">
                     Здесь вы можете выбрать цвет фона для CWM™.<br />
                     Доступные цвета: синий, серый, фиолетовый, зелёный, свой.<br />
                     При выборе варианта «Свой» вам потребуется ввести HEX-код цвета.
                   </p>
                 </div>
               ) : activeArticle === 'bg-wave-speed' ? (
                 <div className="text-[13.5px] text-[#222]">
                   <h1 className="text-xl font-bold mb-2 text-black tracking-tight leading-snug">Скорость волны</h1>
                   <div className="text-[12px] mb-6">
                     <span className="text-[#0055aa] hover:underline cursor-pointer" onClick={() => setActiveArticle(null)}>Настройки</span>
                     <span className="text-gray-500 mx-1">&gt;</span>
                     <span className="text-[#0055aa] hover:underline cursor-pointer" onClick={() => { setOpenCategories(prev => ({ ...prev, bg: true })); setActiveArticle(null); }}>Фон</span>
                     <span className="text-gray-500 mx-1">&gt;</span>
                     <span className="text-gray-800">Скорость волны</span>
                   </div>
                   <p className="mb-4">
                     Здесь вы можете выбрать скорость фоновой волны CWM™.<br />
                     Доступные варианты: «Медленный», «Средний», «Быстрый».
                   </p>
                 </div>
               ) : activeArticle === 'bg-particle-speed' ? (
                 <div className="text-[13.5px] text-[#222]">
                   <h1 className="text-xl font-bold mb-2 text-black tracking-tight leading-snug">Скорость частиц</h1>
                   <div className="text-[12px] mb-6">
                     <span className="text-[#0055aa] hover:underline cursor-pointer" onClick={() => setActiveArticle(null)}>Настройки</span>
                     <span className="text-gray-500 mx-1">&gt;</span>
                     <span className="text-[#0055aa] hover:underline cursor-pointer" onClick={() => { setOpenCategories(prev => ({ ...prev, bg: true })); setActiveArticle(null); }}>Фон</span>
                     <span className="text-gray-500 mx-1">&gt;</span>
                     <span className="text-gray-800">Скорость частиц</span>
                   </div>
                   <p className="mb-4">
                     Здесь вы можете выбрать скорость фоновых частиц CWM™.<br />
                     Доступные варианты: «Медленный», «Средний», «Быстрый».
                   </p>
                 </div>
               ) : activeArticle === 'bg-wave' ? (
                 <div className="text-[13.5px] text-[#222]">
                   <h1 className="text-xl font-bold mb-2 text-black tracking-tight leading-snug">Волна</h1>
                   <div className="text-[12px] mb-6">
                     <span className="text-[#0055aa] hover:underline cursor-pointer" onClick={() => setActiveArticle(null)}>Настройки</span>
                     <span className="text-gray-500 mx-1">&gt;</span>
                     <span className="text-[#0055aa] hover:underline cursor-pointer" onClick={() => { setOpenCategories(prev => ({ ...prev, bg: true })); setActiveArticle(null); }}>Фон</span>
                     <span className="text-gray-500 mx-1">&gt;</span>
                     <span className="text-gray-800">Волна</span>
                   </div>
                   <p className="mb-4">
                     Здесь вы можете выбрать отображение волны CWM™.<br />
                     Доступные варианты: «Вкл.», «Откл.».
                   </p>
                 </div>
               ) : activeArticle === 'bg-particles' ? (
                 <div className="text-[13.5px] text-[#222]">
                   <h1 className="text-xl font-bold mb-2 text-black tracking-tight leading-snug">Частицы</h1>
                   <div className="text-[12px] mb-6">
                     <span className="text-[#0055aa] hover:underline cursor-pointer" onClick={() => setActiveArticle(null)}>Настройки</span>
                     <span className="text-gray-500 mx-1">&gt;</span>
                     <span className="text-[#0055aa] hover:underline cursor-pointer" onClick={() => { setOpenCategories(prev => ({ ...prev, bg: true })); setActiveArticle(null); }}>Фон</span>
                     <span className="text-gray-500 mx-1">&gt;</span>
                     <span className="text-gray-800">Частицы</span>
                   </div>
                   <p className="mb-4">
                     Здесь вы можете выбрать отображение частиц CWM™.<br />
                     Доступные варианты: «Вкл.», «Откл.».
                   </p>
                 </div>
               ) : activeArticle === 'sys-about-sys' ? (
                 <div className="text-[13.5px] text-[#222]">
                   <h1 className="text-xl font-bold mb-2 text-black tracking-tight leading-snug">Об системе</h1>
                   <div className="text-[12px] mb-6">
                     <span className="text-[#0055aa] hover:underline cursor-pointer" onClick={() => setActiveArticle(null)}>Настройки</span>
                     <span className="text-gray-500 mx-1">&gt;</span>
                     <span className="text-[#0055aa] hover:underline cursor-pointer" onClick={() => { setOpenCategories(prev => ({ ...prev, sys: true })); setActiveArticle(null); }}>Система</span>
                     <span className="text-gray-500 mx-1">&gt;</span>
                     <span className="text-gray-800">Об системе</span>
                   </div>
                   <p className="mb-4">
                     Здесь вы можете узнать ОС, процессор и архитектуру вашего устройства.
                   </p>
                 </div>
               ) : activeArticle === 'sys-about-app' ? (
                 <div className="text-[13.5px] text-[#222]">
                   <h1 className="text-xl font-bold mb-2 text-black tracking-tight leading-snug">Об программе</h1>
                   <div className="text-[12px] mb-6">
                     <span className="text-[#0055aa] hover:underline cursor-pointer" onClick={() => setActiveArticle(null)}>Настройки</span>
                     <span className="text-gray-500 mx-1">&gt;</span>
                     <span className="text-[#0055aa] hover:underline cursor-pointer" onClick={() => { setOpenCategories(prev => ({ ...prev, sys: true })); setActiveArticle(null); }}>Система</span>
                     <span className="text-gray-500 mx-1">&gt;</span>
                     <span className="text-gray-800">Об программе</span>
                   </div>
                   <p className="mb-4">
                     Здесь доступна информация о приложении, интерфейсе и текущей версии.
                   </p>
                   <p className="mb-4">
                     По умолчанию указаны следующие данные:<br/>
                     Программа: MIWP™ (Media Interface Web Program™)<br/>
                     Интерфейс: CWM™ (CrossWebMenu™)<br/>
                     Версия: 1.0
                   </p>
                 </div>
               ) : (
                 <div className="space-y-4 text-[14px]">
                    <div>
                      <div 
                        className="flex items-center space-x-2 cursor-pointer group"
                        onClick={() => toggleCategory('bg')}
                      >
                        <img src={openCategories['bg'] ? "/minus.png" : "/plus.png"} alt="toggle" className="w-3.5 h-3.5 object-contain" onError={(e) => e.currentTarget.style.display = 'none'} />
                        <span className="font-bold text-[#3a3a3a] group-hover:bg-[#336699] group-hover:text-[#ffffff] px-1">Фон</span>
                      </div>
                      {openCategories['bg'] && (
                        <div className="ml-6 mt-2 space-y-2">
                           <div className="flex items-center before:content-['•'] before:mr-2 before:text-gray-500">
                             <span className="text-[#3a3a3a] hover:bg-[#336699] hover:text-[#ffffff] cursor-pointer px-1" onClick={() => setActiveArticle('bg-color')}>Цвет фона</span>
                           </div>
                           <div className="flex items-center before:content-['•'] before:mr-2 before:text-gray-500">
                             <span className="text-[#3a3a3a] hover:bg-[#336699] hover:text-[#ffffff] cursor-pointer px-1" onClick={() => setActiveArticle('bg-wave-speed')}>Скорость волны</span>
                           </div>
                           <div className="flex items-center before:content-['•'] before:mr-2 before:text-gray-500">
                             <span className="text-[#3a3a3a] hover:bg-[#336699] hover:text-[#ffffff] cursor-pointer px-1" onClick={() => setActiveArticle('bg-particle-speed')}>Скорость Частиц</span>
                           </div>
                           <div className="flex items-center before:content-['•'] before:mr-2 before:text-gray-500">
                             <span className="text-[#3a3a3a] hover:bg-[#336699] hover:text-[#ffffff] cursor-pointer px-1" onClick={() => setActiveArticle('bg-wave')}>Волна</span>
                           </div>
                           <div className="flex items-center before:content-['•'] before:mr-2 before:text-gray-500">
                             <span className="text-[#3a3a3a] hover:bg-[#336699] hover:text-[#ffffff] cursor-pointer px-1" onClick={() => setActiveArticle('bg-particles')}>Частицы</span>
                           </div>
                        </div>
                      )}
                    </div>
                    
                    <div>
                      <div 
                        className="flex items-center space-x-2 cursor-pointer group"
                        onClick={() => toggleCategory('sys')}
                      >
                        <img src={openCategories['sys'] ? "/minus.png" : "/plus.png"} alt="toggle" className="w-3.5 h-3.5 object-contain" onError={(e) => e.currentTarget.style.display = 'none'} />
                        <span className="font-bold text-[#3a3a3a] group-hover:bg-[#336699] group-hover:text-[#ffffff] px-1">Система</span>
                      </div>
                      {openCategories['sys'] && (
                        <div className="ml-6 mt-2 space-y-2">
                           <div className="flex items-center before:content-['•'] before:mr-2 before:text-gray-500">
                             <span className="text-[#3a3a3a] hover:bg-[#336699] hover:text-[#ffffff] cursor-pointer px-1" onClick={() => setActiveArticle('sys-about-sys')}>Об системе</span>
                           </div>
                           <div className="flex items-center before:content-['•'] before:mr-2 before:text-gray-500">
                             <span className="text-[#3a3a3a] hover:bg-[#336699] hover:text-[#ffffff] cursor-pointer px-1" onClick={() => setActiveArticle('sys-about-app')}>Об программе</span>
                           </div>
                        </div>
                      )}
                    </div>
                 </div>
               )}
             </div>
          ) : activeSection === 'video' ? (
             <div className="max-w-[800px]">
               {!activeArticle && (
                 <div className="border-b border-[#ccc] pb-2 mb-6">
                   <h2 className="text-lg font-bold text-[#333]">{currentSectionLabel}</h2>
                 </div>
               )}
               
               {activeArticle === 'tv-channels' ? (
                 <div className="text-[13.5px] text-[#222]">
                   <h1 className="text-xl font-bold mb-2 text-black tracking-tight leading-snug">ТВ каналы</h1>
                   <div className="text-[12px] mb-6">
                     <span className="text-[#0055aa] hover:underline cursor-pointer" onClick={() => setActiveArticle(null)}>ТВ/видео</span>
                     <span className="text-gray-500 mx-1">&gt;</span>
                     <span className="text-gray-800">ТВ каналы</span>
                   </div>
                   <p className="mb-4">
                     В разделе «ТВ / Видео» вы можете найти приложение «ТВ-каналы». При нажатии <img src="/Enter.png" className="inline-block h-8 align-middle mx-1" alt="Enter" onError={(e) => e.currentTarget.style.display = 'none'} /> откроется список, в котором можно выбрать нужный ТВ-канал.
                   </p>
                   <div className="my-6">
                     <img src="/tvselectchannel.png" alt="Select Channel" className="max-w-[500px] w-full" onError={(e) => e.currentTarget.style.display = 'none'} />
                   </div>
                   <p className="mb-4">
                     Управлять ТВ-плеером можно с помощью кнопок <img src="/up.png" className="inline-block h-8 align-middle mx-1" alt="up" onError={(e) => e.currentTarget.style.display = 'none'} />, <img src="/down.png" className="inline-block h-8 align-middle mx-1" alt="down" onError={(e) => e.currentTarget.style.display = 'none'} />, <img src="/left.png" className="inline-block h-8 align-middle mx-1" alt="left" onError={(e) => e.currentTarget.style.display = 'none'} />, <img src="/right.png" className="inline-block h-8 align-middle mx-1" alt="right" onError={(e) => e.currentTarget.style.display = 'none'} />, <img src="/Enter.png" className="inline-block h-8 align-middle mx-1" alt="Enter" onError={(e) => e.currentTarget.style.display = 'none'} /> и <img src="/Backspace.png" className="inline-block h-8 align-middle mx-1" alt="Backspace" onError={(e) => e.currentTarget.style.display = 'none'} />. Также поддерживается управление мышью (ЛКМ и колёсико). 
                   </p>
                   <div className="my-6">
                     <img src="/tvplayer.png" alt="TV Player" className="max-w-[500px] w-full" onError={(e) => e.currentTarget.style.display = 'none'} />
                   </div>
                   <h2 className="font-bold text-[14px] mb-2 mt-6">Элементы плеера:</h2>
                   <div className="space-y-1 mb-4">
                     <p>(1) Стоп / Пауза.</p>
                     <p>(2) Перемотка на 1 секунду вперёд / назад.</p>
                     <p>(3) Следующий / предыдущий канал.</p>
                     <p>(4) Таймлайн.</p>
                     <p>(5) Список доступных каналов.</p>
                   </div>
                   <div className="my-6">
                     <img src="/channellist.png" alt="Channel List" className="max-w-[500px] w-full" onError={(e) => e.currentTarget.style.display = 'none'} />
                   </div>
                   <p className="mb-4">
                     Перемещение по списку осуществляется кнопками <img src="/up.png" className="inline-block h-8 align-middle mx-1" alt="up" onError={(e) => e.currentTarget.style.display = 'none'} /> и <img src="/down.png" className="inline-block h-8 align-middle mx-1" alt="down" onError={(e) => e.currentTarget.style.display = 'none'} />, выбор — кнопкой <img src="/Enter.png" className="inline-block h-8 align-middle mx-1" alt="Enter" onError={(e) => e.currentTarget.style.display = 'none'} />. Также можно управлять мышью: навести курсор на канал, прокрутить список колёсиком и нажать ЛКМ. Для выхода из этого меню нажмите <img src="/left.png" className="inline-block h-8 align-middle mx-1" alt="left" onError={(e) => e.currentTarget.style.display = 'none'} />, <img src="/Backspace.png" className="inline-block h-8 align-middle mx-1" alt="Backspace" onError={(e) => e.currentTarget.style.display = 'none'} /> или кликните ЛКМ мимо меню.
                   </p>
                   <p className="mb-6">
                     (6) Название канала.
                   </p>
                   
                   <div className="border-t border-[#ccc] pt-4 mt-8">
                     <h2 className="font-bold text-[14px] mb-2">Примечания:</h2>
                     <ul className="list-disc pl-5 space-y-1">
                       <li>Плеер подгружает трансляцию из интернета в реальном времени, поэтому для его работы необходимо активное сетевое подключение.</li>
                       <li>Плеер использует каналы из iptv-org.</li>
                     </ul>
                   </div>
                 </div>
               ) : (
                 <div className="space-y-4 text-[14px]">
                    <div>
                      <div className="flex items-center space-x-2">
                        <img src="/minus.png" alt="minus" className="w-3.5 h-3.5 object-contain" onError={(e) => e.currentTarget.style.display = 'none'} />
                        <span 
                          className="font-bold text-[#3a3a3a] hover:bg-[#336699] hover:text-[#ffffff] cursor-pointer px-1"
                          onClick={() => setActiveArticle('tv-channels')}
                        >
                          ТВ каналы
                        </span>
                      </div>
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
