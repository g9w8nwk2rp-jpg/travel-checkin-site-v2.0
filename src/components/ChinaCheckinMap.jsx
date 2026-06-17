import { useEffect, useMemo, useState } from 'react';
import { MapPinned, MousePointerClick, RotateCcw, Trophy } from 'lucide-react';
import {
  CHINA_CHECKIN_STORAGE_KEY,
  chinaProvinceTotal,
  chinaProvinces,
} from '../data/chinaMapData';

function readSavedProvinceIds() {
  if (typeof window === 'undefined') return [];

  try {
    const saved = window.localStorage.getItem(CHINA_CHECKIN_STORAGE_KEY);
    const parsed = saved ? JSON.parse(saved) : [];
    const validIds = new Set(chinaProvinces.map((province) => province.id));
    return Array.isArray(parsed) ? parsed.filter((id) => validIds.has(id)) : [];
  } catch {
    return [];
  }
}

export default function ChinaCheckinMap() {
  const [checkedProvinceIds, setCheckedProvinceIds] = useState(readSavedProvinceIds);
  const [hoveredProvince, setHoveredProvince] = useState(null);
  const checkedSet = useMemo(() => new Set(checkedProvinceIds), [checkedProvinceIds]);
  const checkedCount = checkedProvinceIds.length;
  const progress = Math.round((checkedCount / chinaProvinceTotal) * 100);

  useEffect(() => {
    window.localStorage.setItem(
      CHINA_CHECKIN_STORAGE_KEY,
      JSON.stringify(checkedProvinceIds),
    );
  }, [checkedProvinceIds]);

  function toggleProvince(provinceId) {
    setCheckedProvinceIds((currentIds) => {
      if (currentIds.includes(provinceId)) {
        return currentIds.filter((id) => id !== provinceId);
      }

      return [...currentIds, provinceId];
    });
  }

  function handleProvinceKeyDown(event, provinceId) {
    if (event.key !== 'Enter' && event.key !== ' ') return;
    event.preventDefault();
    toggleProvince(provinceId);
  }

  function resetCheckins() {
    setCheckedProvinceIds([]);
    setHoveredProvince(null);
  }

  return (
    <section className="section china-checkin-section" id="china-checkin">
      <div className="section-inner china-checkin-inner">
        <div className="section-heading split">
          <div>
            <span className="section-kicker">China Check-in</span>
            <h2>中国地图打卡</h2>
          </div>
          <p>
            点击省份点亮你的旅行足迹。已打卡省份会保存在本机浏览器里，刷新页面后仍然保留。
          </p>
        </div>

        <div className="china-checkin-layout">
          <div className="china-map-card">
            <div className="china-map-toolbar">
              <div>
                <span>当前悬停</span>
                <strong>{hoveredProvince?.name ?? '选择一个省份'}</strong>
              </div>
              <button type="button" onClick={resetCheckins} aria-label="清空中国地图打卡">
                <RotateCcw size={17} />
              </button>
            </div>

            <svg
              className="china-map-svg"
              viewBox="0 0 900 820"
              role="img"
              aria-label="中国省份打卡地图"
            >
              <defs>
                <filter id="provinceLift" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="0" dy="12" stdDeviation="11" floodColor="#346d82" floodOpacity="0.16" />
                </filter>
              </defs>
              {chinaProvinces.map((province) => {
                const isChecked = checkedSet.has(province.id);

                return (
                  <g className="province-node" key={province.id}>
                    <path
                      className={`province-shape ${isChecked ? 'checked' : ''}`}
                      d={province.path}
                      role="button"
                      tabIndex={0}
                      aria-label={`${province.name}${isChecked ? '，已打卡' : '，未打卡'}`}
                      aria-pressed={isChecked}
                      onClick={() => toggleProvince(province.id)}
                      onFocus={() => setHoveredProvince(province)}
                      onBlur={() => setHoveredProvince(null)}
                      onMouseEnter={() => setHoveredProvince(province)}
                      onMouseLeave={() => setHoveredProvince(null)}
                      onKeyDown={(event) => handleProvinceKeyDown(event, province.id)}
                    >
                      <title>{province.name}</title>
                    </path>
                  </g>
                );
              })}
            </svg>
          </div>

          <aside className="china-progress-panel" aria-label="中国探索进度">
            <div className="progress-orbit" style={{ '--progress': `${progress}%` }}>
              <span>{progress}%</span>
            </div>
            <div className="progress-copy">
              <span className="section-kicker">Travel Progress</span>
              <h3>{checkedCount} / {chinaProvinceTotal}</h3>
              <p>已打卡省份数量</p>
            </div>
            <div className="progress-metrics">
              <article>
                <MapPinned size={22} />
                <strong>{chinaProvinceTotal - checkedCount}</strong>
                <span>待探索</span>
              </article>
              <article>
                <Trophy size={22} />
                <strong>{checkedCount}</strong>
                <span>已点亮</span>
              </article>
            </div>
            <div className="checkin-hint">
              <MousePointerClick size={18} />
              <span>点击或按 Enter / Space 切换省份状态</span>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
