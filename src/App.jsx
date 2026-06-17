import { useMemo, useState } from 'react';
import {
  ArrowRight,
  CalendarDays,
  Camera,
  Cloud,
  Compass,
  Flag,
  Heart,
  Instagram,
  Luggage,
  Mail,
  MapPin,
  MessageCircle,
  Plane,
  Send,
  Sparkles,
  Star,
} from 'lucide-react';
import { cities, featuredPhotos, stats, stories } from './data/travelData';

const iconMap = {
  CalendarDays,
  Camera,
  Flag,
  Heart,
  MapPin,
  Star,
};

const navItems = [
  { label: '首页', href: '#home' },
  { label: '地图', href: '#map' },
  { label: '图集', href: '#gallery' },
  { label: '故事', href: '#stories' },
  { label: '数据', href: '#stats' },
  { label: '联系', href: '#contact' },
];

function Header() {
  return (
    <header className="site-header">
      <a className="brand" href="#home" aria-label="回到首页">
        <Compass size={22} />
        <span>Travel Memory Map</span>
      </a>
      <nav className="nav-links" aria-label="页面导航">
        {navItems.map((item) => (
          <a key={item.href} href={item.href}>
            {item.label}
          </a>
        ))}
      </nav>
    </header>
  );
}

function Hero() {
  return (
    <section className="hero" id="home">
      <Header />
      <div className="hero-media" aria-hidden="true">
        <img
          src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=2400&q=90"
          alt=""
        />
      </div>
      <div className="hero-tint" />
      <Cloud className="float-icon cloud-a" size={96} aria-hidden="true" />
      <Plane className="float-icon plane-a" size={54} aria-hidden="true" />
      <Luggage className="float-icon luggage-a" size={62} aria-hidden="true" />
      <Camera className="float-icon camera-a" size={56} aria-hidden="true" />
      <div className="hero-content">
        <span className="eyebrow">
          <Sparkles size={17} />
          城市点亮计划
        </span>
        <h1>
          我的旅行地图
          <span>Travel Memory Map</span>
        </h1>
        <p>记录走过的城市、喜欢的打卡地、旅途照片和那些后来还会想起的晴天。</p>
        <div className="hero-actions">
          <a className="button primary" href="#map">
            开始探索
            <ArrowRight size={18} />
          </a>
          <a className="button soft" href="#gallery">
            查看城市图集
          </a>
        </div>
      </div>
      <aside className="hero-postcard" aria-label="最新旅行路线">
        <span>Latest route</span>
        <strong>苏州 - 南京 - 厦门</strong>
        <p>下一站，去看更远的风景。</p>
      </aside>
    </section>
  );
}

function MapSection({ selectedCity, onSelectCity }) {
  const ActiveIcon = iconMap[selectedCity.icon] ?? MapPin;

  return (
    <section className="section map-section" id="map">
      <div className="section-inner">
        <div className="section-heading split">
          <div>
            <span className="section-kicker">Check-in Map</span>
            <h2>点亮去过的城市</h2>
          </div>
          <p>用可爱的坐标保存旅行足迹。点击地图上的小图标或右侧城市卡片，就能查看对应日期、记忆和代表照片。</p>
        </div>
        <div className="map-layout">
          <div className="illustration-map" aria-label="旅行打卡地图">
            <svg className="china-illustration" viewBox="0 0 900 650" aria-hidden="true">
              <path
                className="china-map-shadow"
                d="M138 256c24-69 109-114 192-109 54 3 83-36 136-40 57-4 101 30 141 59 38 28 90 29 123 67 34 39 24 88 4 130-19 41-62 51-99 81-39 31-51 90-107 105-50 13-90-22-136-19-58 4-109 48-164 24-54-24-73-84-89-138-15-51-18-111-1-160z"
              />
              <path
                className="china-map-main"
                d="M128 244c25-74 116-121 204-116 57 3 88-39 145-43 61-4 108 32 150 63 41 30 96 31 131 71 36 42 26 94 5 139-21 44-67 55-106 87-42 33-55 96-115 112-53 14-96-23-145-20-62 4-116 51-175 25-58-25-78-90-95-148-16-54-19-118 1-170z"
              />
              <path
                className="china-map-west"
                d="M128 244c25-74 116-121 204-116 18 1 33-2 48-8 8 54-18 104-61 135-47 34-50 91-90 121-29 22-70 20-101 7-15-49-17-96 0-139z"
              />
              <path
                className="china-map-south"
                d="M339 439c48-18 89-4 137 12 52 18 90-1 132-38 29-25 73-34 93-67 14 39 3 75-44 99-42 33-55 96-115 112-53 14-96-23-145-20-62 4-116 51-175 25-21-9-37-24-50-42 56 16 113-57 167-81z"
              />
              <path
                className="china-map-coast"
                d="M624 161c41 30 96 31 131 71 36 42 26 94 5 139-17 36-51 50-85 72 8-38 52-66 49-113-3-51-57-67-94-93-33-23-54-62-101-72 34-16 65-26 95-4z"
              />
              <path
                className="china-map-island island-hainan"
                d="M565 579c18-8 42-5 55 8-9 18-43 22-64 10-7-4-4-13 9-18z"
              />
              <path
                className="china-map-island island-taiwan"
                d="M730 470c25 35 29 83 10 122-31-25-34-89-10-122z"
              />
              <path
                className="map-route route-main"
                d="M395 363 C510 286 600 278 645 322 S707 414 620 448"
              />
              <path
                className="map-route route-south"
                d="M620 448 C690 488 689 548 658 583"
              />
            </svg>
            {cities.map((city) => {
              const CityIcon = iconMap[city.icon] ?? MapPin;
              const isActive = city.id === selectedCity.id;
              return (
                <button
                  className={`city-pin ${isActive ? 'active' : ''}`}
                  key={city.id}
                  onClick={() => onSelectCity(city)}
                  style={{
                    left: city.coordinate.left,
                    top: city.coordinate.top,
                    '--pin-color': city.color,
                  }}
                  type="button"
                  aria-pressed={isActive}
                >
                  <CityIcon size={20} />
                  <span>{city.name}</span>
                </button>
              );
            })}
          </div>
          <div className="city-detail">
            <div className="detail-image">
              <img src={selectedCity.cover} alt={`${selectedCity.name}旅行封面`} />
              <span>
                <ActiveIcon size={16} />
                已点亮
              </span>
            </div>
            <div className="detail-copy">
              <span>{selectedCity.location} / {selectedCity.date}</span>
              <h3>{selectedCity.name}</h3>
              <p>{selectedCity.mood}</p>
              <div className="tag-row">
                {selectedCity.tags.map((tag) => (
                  <em key={tag}>{tag}</em>
                ))}
              </div>
            </div>
            <div className="mini-city-list">
              {cities.map((city) => (
                <button
                  className={city.id === selectedCity.id ? 'active' : ''}
                  key={city.id}
                  onClick={() => onSelectCity(city)}
                  type="button"
                >
                  {city.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function StatsSection() {
  return (
    <section className="section stats-section" id="stats">
      <div className="section-inner">
        <div className="section-heading center">
          <span className="section-kicker">Travel Data</span>
          <h2>旅途小数据</h2>
          <p>把城市、景点、照片和天数都收进轻盈的小卡片里，之后只需要改数据文件就能继续更新。</p>
        </div>
        <div className="stats-grid">
          {stats.map((item) => {
            const StatIcon = iconMap[item.icon] ?? Sparkles;
            return (
              <article className="stat-card" key={item.label}>
                <StatIcon size={28} />
                <strong>{item.value}</strong>
                <span>{item.label}</span>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function GallerySection({ selectedCity, onSelectCity }) {
  const [activePhoto, setActivePhoto] = useState(0);
  const currentPhoto = selectedCity.photos[activePhoto] ?? selectedCity.photos[0];

  function selectCity(city) {
    onSelectCity(city);
    setActivePhoto(0);
  }

  return (
    <section className="section gallery-section" id="gallery">
      <div className="section-inner">
        <div className="section-heading split">
          <div>
            <span className="section-kicker">City Albums</span>
            <h2>城市旅行图集</h2>
          </div>
          <p>每个城市都有独立相册。这里先放示例照片，后续替换图片链接和文案即可扩展新的旅行记录。</p>
        </div>
        <div className="album-shell">
          <div className="city-card-grid">
            {cities.map((city) => (
              <button
                className={`album-card ${city.id === selectedCity.id ? 'active' : ''}`}
                key={city.id}
                onClick={() => selectCity(city)}
                type="button"
              >
                <img src={city.cover} alt={`${city.name}图集封面`} />
                <span>{city.date}</span>
                <strong>{city.name}</strong>
              </button>
            ))}
          </div>
          <div className="album-viewer">
            <div className="feature-photo">
              <img src={currentPhoto.image} alt={currentPhoto.title} />
              <div>
                <span>{currentPhoto.date}</span>
                <h3>{currentPhoto.title}</h3>
                <p>{currentPhoto.note}</p>
              </div>
            </div>
            <div className="photo-grid">
              {selectedCity.photos.map((photo, index) => (
                <button
                  className={index === activePhoto ? 'active' : ''}
                  key={photo.title}
                  onClick={() => setActivePhoto(index)}
                  type="button"
                >
                  <img src={photo.image} alt={photo.title} />
                  <span>{photo.title}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function StoriesSection() {
  return (
    <section className="section stories-section" id="stories">
      <div className="section-inner">
        <div className="section-heading center">
          <span className="section-kicker">Travel Journal</span>
          <h2>旅行故事与打卡记录</h2>
          <p>用时间线保存路线、城市回忆、美食和住宿体验，像一本持续长大的旅行手账。</p>
        </div>
        <div className="timeline">
          {stories.map((story, index) => (
            <article className="story-card" key={story.title}>
              <span className="story-number">{String(index + 1).padStart(2, '0')}</span>
              <div>
                <span>{story.date} / {story.city} / {story.type}</span>
                <h3>{story.title}</h3>
                <p>{story.text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturedPhotos() {
  return (
    <section className="section featured-section" id="sharing">
      <div className="section-inner">
        <div className="section-heading split">
          <div>
            <span className="section-kicker">Favorite Frames</span>
            <h2>精选照片分享</h2>
          </div>
          <p>用更有冲击力的大图卡片展示最喜欢的照片，后续可以持续添加新的城市、新的照片和新的故事。</p>
        </div>
        <div className="featured-grid">
          {featuredPhotos.map((photo, index) => (
            <article className={`featured-card item-${index + 1}`} key={photo.title}>
              <img src={photo.image} alt={photo.title} />
              <div>
                <span>{photo.city} / {photo.date}</span>
                <h3>{photo.title}</h3>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <footer className="contact-section" id="contact">
      <div className="sunset-circle" aria-hidden="true" />
      <div className="contact-content">
        <span className="section-kicker">Next Stop</span>
        <h2>下一站，去看更远的风景</h2>
        <p>欢迎把旅行建议、城市清单、好看的路线或值得收藏的小店发给我。</p>
        <div className="contact-links">
          <a href="mailto:hello@example.com">
            <Mail size={18} />
            hello@example.com
          </a>
          <a href="https://www.instagram.com/" target="_blank" rel="noreferrer">
            <Instagram size={18} />
            Instagram
          </a>
          <a href="https://www.xiaohongshu.com/" target="_blank" rel="noreferrer">
            <MessageCircle size={18} />
            小红书
          </a>
        </div>
        <a className="button primary" href="mailto:hello@example.com?subject=旅行建议">
          留言给我
          <Send size={18} />
        </a>
      </div>
    </footer>
  );
}

export default function App() {
  const initialCity = useMemo(() => cities[0], []);
  const [selectedCity, setSelectedCity] = useState(initialCity);

  return (
    <>
      <Hero />
      <main>
        <MapSection selectedCity={selectedCity} onSelectCity={setSelectedCity} />
        <GallerySection selectedCity={selectedCity} onSelectCity={setSelectedCity} />
        <StoriesSection />
        <StatsSection />
        <FeaturedPhotos />
      </main>
      <ContactSection />
    </>
  );
}
