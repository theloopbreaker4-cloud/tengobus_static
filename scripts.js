(function () {
  "use strict";

  const content = window.siteContent;
  const root = document.documentElement;
  let pageContent = content;

  if (!content) {
    return;
  }

  const setText = function (id, value) {
    const element = document.getElementById(id);
    if (element && value) {
      element.textContent = value;
    }
  };

  const setHtml = function (id, value) {
    const element = document.getElementById(id);
    if (element && value) {
      element.innerHTML = value;
    }
  };

  const setAttribute = function (id, name, value) {
    const element = document.getElementById(id);
    if (element && value) {
      element.setAttribute(name, value);
    }
  };

  const setupTheme = function () {
    const button = document.getElementById("themeToggle");
    const mediaQuery = window.matchMedia ? window.matchMedia("(prefers-color-scheme: dark)") : null;
    const getSystemTheme = function () {
      return mediaQuery && mediaQuery.matches ? "dark" : "light";
    };
    const savedTheme = localStorage.getItem("theme");
    const theme = savedTheme || getSystemTheme();

    root.dataset.theme = theme;

    if (!button) {
      return;
    }

    button.setAttribute("aria-pressed", theme === "dark" ? "true" : "false");
    button.addEventListener("click", function () {
      const nextTheme = root.dataset.theme === "dark" ? "light" : "dark";
      root.dataset.theme = nextTheme;
      localStorage.setItem("theme", nextTheme);
      button.setAttribute("aria-pressed", nextTheme === "dark" ? "true" : "false");
    });

    if (mediaQuery) {
      mediaQuery.addEventListener("change", function (event) {
        if (localStorage.getItem("theme")) {
          return;
        }

        const systemTheme = event.matches ? "dark" : "light";
        root.dataset.theme = systemTheme;
        button.setAttribute("aria-pressed", systemTheme === "dark" ? "true" : "false");
      });
    }
  };

  const flagSvgs = {
    en: '<svg viewBox="0 0 60 40" aria-hidden="true"><rect width="60" height="40" fill="#012169"/><path d="M0 0 60 40M60 0 0 40" stroke="#fff" stroke-width="8"/><path d="M0 0 60 40M60 0 0 40" stroke="#c8102e" stroke-width="4"/><path d="M30 0v40M0 20h60" stroke="#fff" stroke-width="14"/><path d="M30 0v40M0 20h60" stroke="#c8102e" stroke-width="8"/></svg>',
    ka: '<svg viewBox="0 0 60 40" aria-hidden="true"><rect width="60" height="40" fill="#fff"/><path d="M28 0h4v40h-4zM0 18h60v4H0z" fill="#d40000"/><path d="M12 7h3v10h-3zM8.5 10.5h10v3h-10zM45 7h3v10h-3zM41.5 10.5h10v3h-10zM12 24h3v10h-3zM8.5 27.5h10v3h-10zM45 24h3v10h-3zM41.5 27.5h10v3h-10z" fill="#d40000"/></svg>',
    ru: '<svg viewBox="0 0 60 40" aria-hidden="true"><rect width="60" height="40" fill="#fff"/><rect y="13.33" width="60" height="13.33" fill="#0039a6"/><rect y="26.66" width="60" height="13.34" fill="#d52b1e"/></svg>',
    az: '<svg viewBox="0 0 60 40" aria-hidden="true"><rect width="60" height="13.33" fill="#00b5e2"/><rect y="13.33" width="60" height="13.33" fill="#ef3340"/><rect y="26.66" width="60" height="13.34" fill="#509e2f"/><circle cx="29" cy="20" r="6" fill="#fff"/><circle cx="31" cy="20" r="5" fill="#ef3340"/><path d="m39 15 1.3 3.2 3.4.2-2.6 2.2.8 3.4-2.9-1.8-2.9 1.8.8-3.4-2.6-2.2 3.4-.2z" fill="#fff"/></svg>',
    uk: '<svg viewBox="0 0 60 40" aria-hidden="true"><rect width="60" height="20" fill="#0057b7"/><rect y="20" width="60" height="20" fill="#ffd700"/></svg>',
    be: '<svg viewBox="0 0 60 40" aria-hidden="true"><rect width="60" height="26.66" fill="#d22730"/><rect y="26.66" width="60" height="13.34" fill="#00af66"/><rect width="10" height="40" fill="#fff"/><path d="M1 0h3v4H1zm5 4h3v4H6zM1 8h3v4H1zm5 8h3v4H6zM1 20h3v4H1zm5 4h3v4H6zM1 28h3v4H1zm5 8h3v4H6z" fill="#d22730"/></svg>',
    hy: '<svg viewBox="0 0 60 40" aria-hidden="true"><rect width="60" height="13.33" fill="#d90012"/><rect y="13.33" width="60" height="13.33" fill="#0033a0"/><rect y="26.66" width="60" height="13.34" fill="#f2a800"/></svg>'
  };

  const locales = {
    en: {
      flag: "🇬🇧",
      label: "EN",
      lang: "en",
    nav: ["Routes", "Services", "Photos", "Video", "Contacts"],
      name: "English",
      hero: {
        eyebrow: "Private trips",
        title: "Georgia tours without the rush",
        text: "Mountains, old towns, wine regions and beautiful stops along the road."
      },
      intro: {
        eyebrow: "About trips",
        title: "Comfortable transport, clear route, real places",
        text: "Day trips and multi-day routes for small and large groups. Ask directly about dates, routes and available seats."
      },
      sections: {
        routesEyebrow: "Routes",
        routesTitle: "Popular destinations",
        servicesEyebrow: "Services",
        servicesTitle: "Trips and transport rental",
        galleryEyebrow: "Photos",
        galleryTitle: "Moments from trips",
        videosEyebrow: "Video",
        videosTitle: "Route videos",
        contactsEyebrow: "Contacts",
        contactsTitle: "Ask about dates and seats"
      },
      contactsText: "Write or call to choose a trip and get the details.",
      buttons: {
        whatsapp: "Write on WhatsApp",
        photos: "See photos",
        youtube: "Open on YouTube",
        preview: "Watch on YouTube",
        top: "Top"
      },
      footerText: "Tours, transfers and transport rental across Georgia.",
      copyright: "All rights reserved.",
      routes: [
        { title: "Kazbegi", text: "Georgian Military Road, Ananuri fortress, Gudauri and views of Mount Kazbek." },
        { title: "Kakheti", text: "Sighnaghi, wineries, Alazani Valley views and a calm travel pace." },
        { title: "Mtskheta", text: "The ancient capital, Jvari, Svetitskhoveli and a short road from Tbilisi." }
      ],
      services: [
        { title: "Bus tours", text: "Group trips on ready-made or custom routes." },
        { title: "Crossover tours", text: "Comfortable trips for small groups and routes where a car is more convenient." },
        { title: "Bus rental", text: "Transport for tours, transfers, weddings, corporate events and group trips." },
        { title: "Car rental", text: "Car with driver for transfers, private trips and business routes." }
      ],
      photos: ["Road to the mountains", "Kakheti", "Historic places", "Stops on the road"],
      videoTitle: "Trip on the Georgian Military Road"
    },
    ka: {
      flag: "🇬🇪",
      label: "KA",
      lang: "ka",
      name: "ქართული",
      nav: ["მარშრუტები", "სერვისები", "ფოტო", "ვიდეო", "კონტაქტი"],
      hero: { eyebrow: "ავტორის ტურები", title: "ტურები საქართველოში მშვიდი ტემპით", text: "მთები, ქალაქები, ღვინის რეგიონები და ლამაზი გაჩერებები გზაში." },
      intro: { eyebrow: "ტურების შესახებ", title: "კომფორტული ტრანსპორტი და გასაგები მარშრუტი", text: "ერთდღიანი და მრავალდღიანი ტურები მცირე და დიდი ჯგუფებისთვის." },
      sections: { routesEyebrow: "მარშრუტები", routesTitle: "პოპულარული მიმართულებები", servicesEyebrow: "სერვისები", servicesTitle: "ტურები და ტრანსპორტის ქირაობა", galleryEyebrow: "ფოტო", galleryTitle: "კადრები ტურებიდან", videosEyebrow: "ვიდეო", videosTitle: "ვიდეო მარშრუტებიდან", contactsEyebrow: "კონტაქტი", contactsTitle: "დაზუსტება თარიღებზე" },
      contactsText: "მოგვწერეთ ან დაგვირეკეთ დეტალებისთვის.",
      buttons: { whatsapp: "WhatsApp-ზე მოწერა", photos: "ფოტოების ნახვა", youtube: "YouTube-ზე გახსნა", preview: "ნახვა YouTube-ზე", top: "ზემოთ" },
      footerText: "ტურები, ტრანსფერები და ტრანსპორტის ქირაობა საქართველოში.",
      copyright: "ყველა უფლება დაცულია.",
      routes: [{ title: "ყაზბეგი", text: "საქართველოს სამხედრო გზა, ანანური, გუდაური და ყაზბეგის ხედები." }, { title: "კახეთი", text: "სიღნაღი, მარნები და ალაზნის ველის ხედები." }, { title: "მცხეთა", text: "ძველი დედაქალაქი, ჯვარი და სვეტიცხოველი." }],
      services: [{ title: "ავტობუსის ტურები", text: "ჯგუფური ტურები მზად ან ინდივიდუალურ მარშრუტებზე." }, { title: "ტურები კროსოვერებით", text: "კომფორტული მგზავრობა მცირე ჯგუფებისთვის." }, { title: "ავტობუსის ქირაობა", text: "ტრანსპორტი ტურებისთვის, ტრანსფერებისთვის და ღონისძიებებისთვის." }, { title: "მანქანის ქირაობა", text: "მანქანა მძღოლით ტრანსფერებისა და კერძო მგზავრობებისთვის." }],
      photos: ["გზა მთებისკენ", "კახეთი", "ისტორიული ადგილები", "გაჩერებები გზაში"],
      videoTitle: "მგზავრობა საქართველოს სამხედრო გზაზე"
    },
    ru: {
      flag: "🇷🇺",
      label: "RU",
      lang: "ru",
      name: "Русский",
      nav: ["Маршруты", "Услуги", "Фото", "Видео", "Контакты"],
      hero: { eyebrow: "Авторские поездки", title: "Туры по Грузии без лишней суеты", text: "Горы, города, винные регионы и красивые остановки по дороге." },
      intro: { eyebrow: "О поездках", title: "Комфортный транспорт, понятный маршрут, живые места", text: "Однодневные и многодневные поездки для небольших и больших групп." },
      sections: { routesEyebrow: "Маршруты", routesTitle: "Популярные направления", servicesEyebrow: "Услуги", servicesTitle: "Поездки и аренда транспорта", galleryEyebrow: "Фото", galleryTitle: "Моменты из поездок", videosEyebrow: "Видео", videosTitle: "Видео с маршрутов", contactsEyebrow: "Контакты", contactsTitle: "Уточнить даты и места" },
      contactsText: "Напишите или позвоните, чтобы подобрать поездку и узнать детали.",
      buttons: { whatsapp: "Написать в WhatsApp", photos: "Смотреть фото", youtube: "Открыть на YouTube", preview: "Смотреть на YouTube", top: "Наверх" },
      footerText: "Туры, трансферы и аренда транспорта по Грузии.",
      copyright: "Все права защищены.",
      routes: [{ title: "Казбеги", text: "Военно-Грузинская дорога, Ананури, Гудаури и вид на Казбек." }, { title: "Кахетия", text: "Сигнахи, винодельни, виды Алазанской долины и спокойный темп." }, { title: "Мцхета", text: "Древняя столица, Джвари, Светицховели и короткая дорога из Тбилиси." }],
      services: [{ title: "Автобусные туры", text: "Поездки для групп по готовым и индивидуальным маршрутам." }, { title: "Туры на кроссоверах", text: "Комфортные поездки для малых групп." }, { title: "Аренда автобуса", text: "Транспорт для туров, трансферов и мероприятий." }, { title: "Аренда машины", text: "Машина с водителем для трансферов и частных поездок." }],
      photos: ["Дорога к горам", "Кахетия", "Исторические места", "Остановки по пути"],
      videoTitle: "Поездка по Военно-Грузинской дороге"
    },
    az: {
      flag: "🇦🇿",
      label: "AZ",
      lang: "az",
      name: "Azərbaycanca",
      nav: ["Marşrutlar", "Xidmətlər", "Foto", "Video", "Əlaqə"],
      hero: { eyebrow: "Xüsusi səfərlər", title: "Gürcüstan turları rahat tempdə", text: "Dağlar, şəhərlər, şərab bölgələri və yolda gözəl dayanacaqlar." },
      intro: { eyebrow: "Səfərlər haqqında", title: "Rahat nəqliyyat və aydın marşrut", text: "Kiçik və böyük qruplar üçün birgünlük və çoxgünlük səfərlər." },
      sections: { routesEyebrow: "Marşrutlar", routesTitle: "Populyar istiqamətlər", servicesEyebrow: "Xidmətlər", servicesTitle: "Səfərlər və nəqliyyat icarəsi", galleryEyebrow: "Foto", galleryTitle: "Səfərlərdən anlar", videosEyebrow: "Video", videosTitle: "Marşrut videoları", contactsEyebrow: "Əlaqə", contactsTitle: "Tarixləri dəqiqləşdirin" },
      contactsText: "Səfər seçmək və detalları öyrənmək üçün yazın və ya zəng edin.",
      buttons: { whatsapp: "WhatsApp-da yaz", photos: "Fotolara bax", youtube: "YouTube-da aç", preview: "YouTube-da bax", top: "Yuxarı" },
      footerText: "Gürcüstanda turlar, transferlər və nəqliyyat icarəsi.",
      copyright: "Bütün hüquqlar qorunur.",
      routes: [{ title: "Kazbegi", text: "Gürcü Hərbi yolu, Ananuri, Gudauri və Kazbek mənzərələri." }, { title: "Kaxeti", text: "Sighnaghi, şərab evləri və Alazani vadisi mənzərələri." }, { title: "Mtsxeta", text: "Qədim paytaxt, Cvari və Svetitsxoveli." }],
      services: [{ title: "Avtobus turları", text: "Hazır və fərdi marşrutlarla qrup səfərləri." }, { title: "Krossover turları", text: "Kiçik qruplar üçün rahat səfərlər." }, { title: "Avtobus icarəsi", text: "Turlar, transferlər və tədbirlər üçün nəqliyyat." }, { title: "Avtomobil icarəsi", text: "Transferlər və şəxsi səfərlər üçün sürücülü avtomobil." }],
      photos: ["Dağlara yol", "Kaxeti", "Tarixi yerlər", "Yolda dayanacaqlar"],
      videoTitle: "Gürcü Hərbi yolu ilə səfər"
    },
    uk: {
      flag: "🇺🇦",
      label: "UK",
      lang: "uk",
      name: "Українська",
      nav: ["Маршрути", "Послуги", "Фото", "Відео", "Контакти"],
      hero: { eyebrow: "Авторські поїздки", title: "Тури Грузією без поспіху", text: "Гори, міста, винні регіони та красиві зупинки дорогою." },
      intro: { eyebrow: "Про поїздки", title: "Комфортний транспорт і зрозумілий маршрут", text: "Одноденні та багатоденні поїздки для малих і великих груп." },
      sections: { routesEyebrow: "Маршрути", routesTitle: "Популярні напрямки", servicesEyebrow: "Послуги", servicesTitle: "Поїздки та оренда транспорту", galleryEyebrow: "Фото", galleryTitle: "Моменти з поїздок", videosEyebrow: "Відео", videosTitle: "Відео з маршрутів", contactsEyebrow: "Контакти", contactsTitle: "Уточнити дати та місця" },
      contactsText: "Напишіть або зателефонуйте, щоб підібрати поїздку.",
      buttons: { whatsapp: "Написати в WhatsApp", photos: "Дивитись фото", youtube: "Відкрити на YouTube", preview: "Дивитись на YouTube", top: "Вгору" },
      footerText: "Тури, трансфери та оренда транспорту в Грузії.",
      copyright: "Усі права захищено.",
      routes: [{ title: "Казбегі", text: "Військово-Грузинська дорога, Ананурі, Гудаурі та вид на Казбек." }, { title: "Кахетія", text: "Сігнагі, виноробні та краєвиди Алазанської долини." }, { title: "Мцхета", text: "Давня столиця, Джварі та Светіцховелі." }],
      services: [{ title: "Автобусні тури", text: "Поїздки для груп готовими та індивідуальними маршрутами." }, { title: "Тури на кросоверах", text: "Комфортні поїздки для малих груп." }, { title: "Оренда автобуса", text: "Транспорт для турів, трансферів і подій." }, { title: "Оренда машини", text: "Авто з водієм для трансферів і приватних поїздок." }],
      photos: ["Дорога до гір", "Кахетія", "Історичні місця", "Зупинки дорогою"],
      videoTitle: "Поїздка Військово-Грузинською дорогою"
    },
    be: {
      flag: "🇧🇾",
      label: "BE",
      lang: "be",
      name: "Беларуская",
      nav: ["Маршруты", "Паслугі", "Фота", "Відэа", "Кантакты"],
      hero: { eyebrow: "Аўтарскія паездкі", title: "Туры па Грузіі без спешкі", text: "Горы, гарады, вінныя рэгіёны і прыгожыя прыпынкі па дарозе." },
      intro: { eyebrow: "Пра паездкі", title: "Камфортны транспарт і зразумелы маршрут", text: "Аднадзённыя і шматдзённыя паездкі для малых і вялікіх груп." },
      sections: { routesEyebrow: "Маршруты", routesTitle: "Папулярныя напрамкі", servicesEyebrow: "Паслугі", servicesTitle: "Паездкі і арэнда транспарту", galleryEyebrow: "Фота", galleryTitle: "Моманты з паездак", videosEyebrow: "Відэа", videosTitle: "Відэа з маршрутаў", contactsEyebrow: "Кантакты", contactsTitle: "Удакладніць даты і месцы" },
      contactsText: "Напішыце або патэлефануйце, каб падабраць паездку.",
      buttons: { whatsapp: "Напісаць у WhatsApp", photos: "Глядзець фота", youtube: "Адкрыць на YouTube", preview: "Глядзець на YouTube", top: "Наверх" },
      footerText: "Туры, трансферы і арэнда транспарту па Грузіі.",
      copyright: "Усе правы абаронены.",
      routes: [{ title: "Казбегі", text: "Ваенна-Грузінская дарога, Анануры, Гудауры і від на Казбек." }, { title: "Кахеція", text: "Сігнахі, вінаробні і віды Алазанскай даліны." }, { title: "Мцхета", text: "Старажытная сталіца, Джвары і Светіцхавелі." }],
      services: [{ title: "Аўтобусныя туры", text: "Паездкі для груп па гатовых і індывідуальных маршрутах." }, { title: "Туры на красоверах", text: "Камфортныя паездкі для малых груп." }, { title: "Арэнда аўтобуса", text: "Транспарт для тураў, трансфераў і мерапрыемстваў." }, { title: "Арэнда машыны", text: "Машына з кіроўцам для трансфераў і прыватных паездак." }],
      photos: ["Дарога да гор", "Кахеція", "Гістарычныя месцы", "Прыпынкі па дарозе"],
      videoTitle: "Паездка па Ваенна-Грузінскай дарозе"
    },
    hy: {
      flag: "🇦🇲",
      label: "HY",
      lang: "hy",
      name: "Հայերեն",
      nav: ["Երթուղիներ", "Ծառայություններ", "Լուսանկարներ", "Տեսանյութ", "Կապ"],
      hero: { eyebrow: "Հեղինակային ուղևորություններ", title: "Տուրեր Վրաստանում հանգիստ ռիթմով", text: "Լեռներ, քաղաքներ, գինու շրջաններ և գեղեցիկ կանգառներ ճանապարհին։" },
      intro: { eyebrow: "Ուղևորությունների մասին", title: "Հարմարավետ տրանսպորտ և պարզ երթուղի", text: "Մեկօրյա և բազմօրյա ուղևորություններ փոքր ու մեծ խմբերի համար։" },
      sections: { routesEyebrow: "Երթուղիներ", routesTitle: "Հանրաճանաչ ուղղություններ", servicesEyebrow: "Ծառայություններ", servicesTitle: "Տուրեր և տրանսպորտի վարձույթ", galleryEyebrow: "Լուսանկարներ", galleryTitle: "Պահեր ուղևորություններից", videosEyebrow: "Տեսանյութ", videosTitle: "Տեսանյութեր երթուղիներից", contactsEyebrow: "Կապ", contactsTitle: "Ճշտել ամսաթվերը" },
      contactsText: "Գրեք կամ զանգահարեք՝ ուղևորություն ընտրելու համար։",
      buttons: { whatsapp: "Գրել WhatsApp-ով", photos: "Դիտել լուսանկարներ", youtube: "Բացել YouTube-ում", preview: "Դիտել YouTube-ում", top: "Վերև" },
      footerText: "Տուրեր, տրանսֆերներ և տրանսպորտի վարձույթ Վրաստանում։",
      copyright: "Բոլոր իրավունքները պաշտպանված են։",
      routes: [{ title: "Կազբեգի", text: "Վրացական ռազմական ճանապարհ, Անանուրի, Գուդաուրի և Կազբեկի տեսարաններ։" }, { title: "Կախեթի", text: "Սիղնաղի, գինեգործարաններ և Ալազանի հովտի տեսարաններ։" }, { title: "Մցխեթա", text: "Հին մայրաքաղաք, Ջվարի և Սվետիցխովելի։" }],
      services: [{ title: "Ավտոբուսային տուրեր", text: "Խմբային ուղևորություններ պատրաստի և անհատական երթուղիներով։" }, { title: "Տուրեր քրոսովերներով", text: "Հարմարավետ ուղևորություններ փոքր խմբերի համար։" }, { title: "Ավտոբուսի վարձույթ", text: "Տրանսպորտ տուրերի, տրանսֆերների և միջոցառումների համար։" }, { title: "Մեքենայի վարձույթ", text: "Մեքենա վարորդով՝ տրանսֆերների և մասնավոր ուղևորությունների համար։" }],
      photos: ["Ճանապարհ դեպի լեռներ", "Կախեթի", "Պատմական վայրեր", "Կանգառներ ճանապարհին"],
      videoTitle: "Ուղևորություն Վրացական ռազմական ճանապարհով"
    }
  };

  const seoBaseUrl = "https://tengoaceventura.ge/";
  const seoImage = "https://images.unsplash.com/photo-1565008576549-57569a49371d?auto=format&fit=crop&w=1200&h=630&q=85";
  const seoContent = {
    en: {
      title: "Tengo Ace Ventura | Georgia Tours, Bus Rental and Transfers",
      description: "Private Georgia tours by bus and crossover, bus rental, car with driver, transfers from Tbilisi, Kazbegi, Kakheti, Mtskheta and custom routes.",
      keywords: "Georgia tours, Tbilisi tours, Kazbegi tour, Kakheti wine tour, Mtskheta tour, Georgian Military Road, bus rental Georgia, car with driver Georgia, Tbilisi transfer, private tours Georgia",
      locale: "en_US"
    },
    ka: {
      title: "Tengo Ace Ventura | ტურები საქართველოში და ტრანსპორტის ქირაობა",
      description: "ტურები საქართველოში ავტობუსით და კროსოვერით, ავტობუსის ქირაობა, მანქანა მძღოლით, ტრანსფერები თბილისიდან, ყაზბეგი, კახეთი და მცხეთა.",
      keywords: "ტურები საქართველოში, ტურები თბილისიდან, ყაზბეგის ტური, კახეთის ტური, მცხეთის ტური, ავტობუსის ქირაობა საქართველოში, მანქანა მძღოლით, ტრანსფერი თბილისი",
      locale: "ka_GE"
    },
    ru: {
      title: "Tengo Ace Ventura | Туры по Грузии, аренда автобуса и трансферы",
      description: "Туры по Грузии на автобусах и кроссоверах, аренда автобуса, машина с водителем, трансферы из Тбилиси, Казбеги, Кахетия, Мцхета и индивидуальные маршруты.",
      keywords: "туры по Грузии, туры из Тбилиси, Казбеги тур, Кахетия тур, Мцхета тур, Военно-Грузинская дорога, аренда автобуса Грузия, машина с водителем Грузия, трансфер Тбилиси",
      locale: "ru_RU"
    },
    az: {
      title: "Tengo Ace Ventura | Gürcüstan turları və nəqliyyat icarəsi",
      description: "Gürcüstanda avtobus və krossover turları, avtobus icarəsi, sürücülü avtomobil, Tbilisidən transferlər, Kazbegi, Kaxeti və Mtsxeta marşrutları.",
      keywords: "Gürcüstan turları, Tbilisi turları, Kazbegi turu, Kaxeti turu, Mtsxeta turu, Gürcüstanda avtobus icarəsi, sürücülü avtomobil, Tbilisi transfer",
      locale: "az_AZ"
    },
    uk: {
      title: "Tengo Ace Ventura | Тури Грузією, оренда автобуса і трансфери",
      description: "Тури Грузією автобусами та кросоверами, оренда автобуса, авто з водієм, трансфери з Тбілісі, Казбегі, Кахетія, Мцхета та індивідуальні маршрути.",
      keywords: "тури Грузією, тури з Тбілісі, Казбегі тур, Кахетія тур, Мцхета тур, оренда автобуса Грузія, авто з водієм Грузія, трансфер Тбілісі",
      locale: "uk_UA"
    },
    be: {
      title: "Tengo Ace Ventura | Туры па Грузіі, арэнда аўтобуса і трансферы",
      description: "Туры па Грузіі на аўтобусах і красоверах, арэнда аўтобуса, машына з кіроўцам, трансферы з Тбілісі, Казбегі, Кахеція і Мцхета.",
      keywords: "туры па Грузіі, туры з Тбілісі, Казбегі тур, Кахеція тур, Мцхета тур, арэнда аўтобуса Грузія, машына з кіроўцам, трансфер Тбілісі",
      locale: "be_BY"
    },
    hy: {
      title: "Tengo Ace Ventura | Տուրեր Վրաստանում և տրանսպորտի վարձույթ",
      description: "Տուրեր Վրաստանում ավտոբուսներով և քրոսովերներով, ավտոբուսի վարձույթ, մեքենա վարորդով, տրանսֆերներ Թբիլիսիից, Կազբեգի, Կախեթի և Մցխեթա։",
      keywords: "տուրեր Վրաստանում, տուրեր Թբիլիսիից, Կազբեգի տուր, Կախեթի տուր, Մցխեթա տուր, ավտոբուսի վարձույթ Վրաստան, մեքենա վարորդով, տրանսֆեր Թբիլիսի",
      locale: "hy_AM"
    }
  };

  const setMeta = function (selector, value) {
    const element = document.querySelector(selector);
    if (element && value) {
      element.setAttribute("content", value);
    }
  };

  const setLink = function (selector, value) {
    const element = document.querySelector(selector);
    if (element && value) {
      element.setAttribute("href", value);
    }
  };

  const updateSeo = function (localeCode) {
    const seo = seoContent[localeCode] || seoContent.en;
    const url = seoBaseUrl + "?lang=" + localeCode;

    document.title = seo.title;
    setMeta('meta[name="description"]', seo.description);
    setMeta('meta[name="keywords"]', seo.keywords);
    setMeta('meta[property="og:locale"]', seo.locale);
    setMeta('meta[property="og:title"]', seo.title);
    setMeta('meta[property="og:description"]', seo.description);
    setMeta('meta[property="og:url"]', url);
    setMeta('meta[property="og:image"]', seoImage);
    setMeta('meta[property="og:image:secure_url"]', seoImage);
    setMeta('meta[name="twitter:title"]', seo.title);
    setMeta('meta[name="twitter:description"]', seo.description);
    setMeta('meta[name="twitter:image"]', seoImage);
    setLink('link[rel="canonical"]', url);
  };

  const createElement = function (tagName, className, text) {
    const element = document.createElement(tagName);
    if (className) {
      element.className = className;
    }
    if (text) {
      element.textContent = text;
    }
    return element;
  };

  const createFallbackImage = function (label) {
    const safeLabel = label || "Georgia";
    const svg = [
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 650">',
      '<defs><linearGradient id="g" x1="0" x2="1" y1="0" y2="1"><stop stop-color="#246b5d"/><stop offset="0.55" stop-color="#e7b44f"/><stop offset="1" stop-color="#c84d3a"/></linearGradient></defs>',
      '<rect width="900" height="650" fill="url(#g)"/>',
      '<path d="M0 480 C120 380 210 430 320 330 C430 230 520 250 650 160 C760 86 832 98 900 58 L900 650 L0 650 Z" fill="rgba(255,255,255,.34)"/>',
      '<path d="M0 540 C160 438 280 500 432 398 C590 292 728 324 900 220 L900 650 L0 650 Z" fill="rgba(23,23,23,.28)"/>',
      '<text x="56" y="96" fill="white" font-family="Arial, Helvetica, sans-serif" font-size="42" font-weight="700">',
      safeLabel.replace(/[<>&]/g, ""),
      '</text></svg>'
    ].join("");
    return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
  };

  const getYouTubeId = function (url) {
    try {
      const parsedUrl = new URL(url);
      if (parsedUrl.hostname.includes("youtu.be")) {
        return parsedUrl.pathname.replace("/", "");
      }
      if (parsedUrl.hostname.includes("youtube.com")) {
        const pathParts = parsedUrl.pathname.split("/").filter(Boolean);
        return parsedUrl.searchParams.get("v") || pathParts[pathParts.length - 1];
      }
    } catch (error) {
      return "";
    }
    return "";
  };

  const icons = {
    bus: '<svg class="service-icon" viewBox="0 0 48 48" aria-hidden="true"><path d="M10 9h28c3 0 5 2 5 5v19H5V14c0-3 2-5 5-5Z" fill="none" stroke="currentColor" stroke-width="3"/><path d="M10 17h28M12 33v5m24-5v5" fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="3"/><circle cx="14" cy="38" r="3" fill="currentColor"/><circle cx="34" cy="38" r="3" fill="currentColor"/></svg>',
    crossover: '<svg class="service-icon" viewBox="0 0 48 48" aria-hidden="true"><path d="M7 29h34l-5-12H16L7 29Z" fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="3"/><path d="M10 29v6h28v-6M17 17l-3-5m20 5 3-5" fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="3"/><circle cx="15" cy="36" r="4" fill="currentColor"/><circle cx="33" cy="36" r="4" fill="currentColor"/></svg>',
    rentalBus: '<svg class="service-icon" viewBox="0 0 48 48" aria-hidden="true"><path d="M8 12h22c4 0 7 3 7 7v16H8Z" fill="none" stroke="currentColor" stroke-width="3"/><path d="M37 22h4l3 7v6h-7M13 19h16M13 26h16" fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="3"/><circle cx="15" cy="37" r="3" fill="currentColor"/><circle cx="34" cy="37" r="3" fill="currentColor"/></svg>',
    rentalCar: '<svg class="service-icon" viewBox="0 0 48 48" aria-hidden="true"><path d="M9 27h30l-4-10H13Z" fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="3"/><path d="M11 27v7h26v-7" fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="3"/><circle cx="16" cy="35" r="3" fill="currentColor"/><circle cx="32" cy="35" r="3" fill="currentColor"/><path d="M36 11h6v6" fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="3"/><path d="M42 11 34 19" fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="3"/></svg>'
  };

  const clearElement = function (id) {
    const element = document.getElementById(id);
    if (element) {
      element.textContent = "";
    }
  };

  const localizeContent = function (locale) {
    pageContent = {
      brand: content.brand,
      hero: Object.assign({}, content.hero, locale.hero),
      intro: Object.assign({}, content.intro, locale.intro),
      contacts: Object.assign({}, content.contacts, { text: locale.contactsText }),
      routes: content.routes.map(function (route, index) {
        return Object.assign({}, route, locale.routes[index]);
      }),
      services: content.services.map(function (service, index) {
        return Object.assign({}, service, locale.services[index]);
      }),
      photos: content.photos.map(function (photo, index) {
        return Object.assign({}, photo, {
          alt: locale.photos[index] || photo.alt,
          caption: locale.photos[index] || photo.caption
        });
      }),
      videos: content.videos.map(function (video) {
        return Object.assign({}, video, { title: locale.videoTitle });
      })
    };
  };

  const applyLocale = function (localeCode) {
    const locale = locales[localeCode] || locales.en;
    const navLabels = document.querySelectorAll(".nav a span");

    localizeContent(locale);
    root.lang = locale.lang;
    updateSeo(localeCode);
    const select = document.getElementById("localeSelect");
    setHtml("localeFlag", flagSvgs[localeCode] || flagSvgs.en);
    if (select) {
      select.title = locale.name || locale.label;
    }

    locale.nav.forEach(function (label, index) {
      if (navLabels[index]) {
        navLabels[index].textContent = label;
      }
    });

    setText("brandName", pageContent.brand);
    setText("footerText", pageContent.brand);
    setText("copyrightText", "\u00a9 " + new Date().getFullYear() + " " + pageContent.brand + ". " + locale.copyright);
    setText("heroEyebrow", pageContent.hero.eyebrow);
    setText("heroTitle", pageContent.hero.title);
    setText("heroText", pageContent.hero.text);
    setText("introTitle", pageContent.intro.title);
    setText("introText", pageContent.intro.text);
    setText("routesTitle", locale.sections.routesTitle);
    setText("servicesTitle", locale.sections.servicesTitle);
    setText("galleryTitle", locale.sections.galleryTitle);
    setText("videosTitle", locale.sections.videosTitle);
    setText("contactsTitle", locale.sections.contactsTitle);
    setText("contactsText", pageContent.contacts.text);
    setText("primaryContact", locale.buttons.whatsapp);
    setText("footerLead", locale.footerText);
    setText("backTopText", locale.buttons.top);
    setAttribute("heroImage", "src", pageContent.hero.image);

    document.querySelector(".intro .eyebrow").textContent = locale.intro.eyebrow;
    document.querySelector("#routes .eyebrow").textContent = locale.sections.routesEyebrow;
    document.querySelector("#services .eyebrow").textContent = locale.sections.servicesEyebrow;
    document.querySelector("#gallery .eyebrow").textContent = locale.sections.galleryEyebrow;
    document.querySelector("#videos .eyebrow").textContent = locale.sections.videosEyebrow;
    document.querySelector("#contacts .eyebrow").textContent = locale.sections.contactsEyebrow;
    document.querySelector(".hero-actions .button.secondary").textContent = locale.buttons.photos;

    clearElement("routesList");
    clearElement("servicesList");
    clearElement("galleryList");
    clearElement("videoList");
    clearElement("contactActions");

    renderRoutes();
    renderServices();
    renderPhotos();
    renderVideos(locale);
    renderContacts();
  };

  const setupLocale = function () {
    const select = document.getElementById("localeSelect");
    const params = new URLSearchParams(window.location.search);
    const urlLocale = params.get("lang");
    const savedLocale = urlLocale || localStorage.getItem("locale") || "en";

    if (!select) {
      applyLocale(savedLocale);
      return;
    }

    Object.keys(locales).forEach(function (localeCode) {
      const locale = locales[localeCode];
      const option = createElement("option", "", locale.label);
      option.value = localeCode;
      option.title = locale.name || locale.label;
      select.appendChild(option);
    });

    select.value = locales[savedLocale] ? savedLocale : "en";
    applyLocale(select.value);

    select.addEventListener("change", function () {
      localStorage.setItem("locale", select.value);
      if (window.history && window.location.protocol !== "file:") {
        window.history.replaceState(null, "", "?lang=" + select.value + window.location.hash);
      }
      applyLocale(select.value);
      showToast("Language changed: " + (locales[select.value].name || locales[select.value].label));
    });
  };

  const setupMenu = function () {
    const header = document.querySelector(".site-header");
    const button = document.getElementById("menuToggle");
    const links = document.querySelectorAll(".nav a");

    if (!header || !button) {
      return;
    }

    button.addEventListener("click", function () {
      const isOpen = header.classList.toggle("menu-open");
      button.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    links.forEach(function (link) {
      link.addEventListener("click", function () {
        header.classList.remove("menu-open");
        button.setAttribute("aria-expanded", "false");
      });
    });
  };

  let toastTimer = 0;
  const showToast = function (message) {
    const toast = document.getElementById("toast");
    if (!toast) {
      return;
    }

    toast.textContent = message;
    toast.classList.add("show");
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(function () {
      toast.classList.remove("show");
    }, 2200);
  };

  const renderRoutes = function () {
    const list = document.getElementById("routesList");
    if (!list) {
      return;
    }

    pageContent.routes.forEach(function (route) {
      const article = createElement("article", "route-card");
      const image = createElement("img");
      image.src = route.image;
      image.alt = route.title;
      image.loading = "lazy";
      image.onerror = function () {
        image.src = createFallbackImage(route.title);
      };

      const body = createElement("div");
      body.appendChild(createElement("h3", "", route.title));
      body.appendChild(createElement("p", "", route.text));

      article.appendChild(image);
      article.appendChild(body);
      list.appendChild(article);
    });
  };

  const renderPhotos = function () {
    const list = document.getElementById("galleryList");
    if (!list) {
      return;
    }

    pageContent.photos.forEach(function (photo) {
      const item = createElement("figure", "gallery-item");
      const image = createElement("img");
      image.src = photo.src;
      image.alt = photo.alt || photo.caption || "";
      image.loading = "lazy";
      image.onerror = function () {
        image.src = createFallbackImage(photo.caption || photo.alt || "");
      };

      item.appendChild(image);
      item.appendChild(createElement("figcaption", "", photo.caption || ""));
      list.appendChild(item);
    });
  };

  const renderServices = function () {
    const list = document.getElementById("servicesList");
    if (!list || !pageContent.services) {
      return;
    }

    pageContent.services.forEach(function (service) {
      const article = createElement("article", "service-card");
      article.innerHTML = icons[service.icon] || icons.bus;
      article.appendChild(createElement("h3", "", service.title));
      article.appendChild(createElement("p", "", service.text));
      list.appendChild(article);
    });
  };

  const renderVideos = function (locale) {
    const list = document.getElementById("videoList");
    if (!list) {
      return;
    }

    pageContent.videos.forEach(function (video) {
      const videoId = getYouTubeId(video.url);
      if (!videoId) {
        return;
      }

      const article = createElement("article", "video-card");
      const videoBox = createElement("div", "video-box");
      const preview = createElement("a", "video-preview", locale.buttons.preview);
      preview.href = video.url;
      preview.target = "_blank";
      preview.rel = "noopener";
      preview.style.backgroundImage = "url(https://img.youtube.com/vi/" + encodeURIComponent(videoId) + "/hqdefault.jpg)";

      videoBox.appendChild(preview);
      article.appendChild(videoBox);
      article.appendChild(createElement("h3", "", video.title));
      const link = createElement("a", "video-link", locale.buttons.youtube);
      link.href = video.url;
      link.target = "_blank";
      link.rel = "noopener";
      article.appendChild(link);
      list.appendChild(article);
    });
  };

  const renderContacts = function () {
    const actions = document.getElementById("contactActions");
    if (!actions) {
      return;
    }

    const links = [
      { label: "WhatsApp", href: "https://wa.me/" + pageContent.contacts.whatsapp },
      { label: pageContent.contacts.phone, href: "tel:" + pageContent.contacts.phone.replace(/\s/g, "") },
      { label: "Instagram", href: pageContent.contacts.instagram },
      { label: pageContent.contacts.email, href: "mailto:" + pageContent.contacts.email }
    ];

    links.forEach(function (link) {
      if (!link.href || link.href.endsWith("undefined")) {
        return;
      }

      const element = createElement("a", "button secondary", link.label);
      element.href = link.href;
      actions.appendChild(element);
    });

    setAttribute("primaryContact", "href", "https://wa.me/" + pageContent.contacts.whatsapp);
  };

  setupTheme();
  setupMenu();
  setupLocale();
})();
