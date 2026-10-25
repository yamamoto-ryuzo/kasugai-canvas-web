// KASUGAI Canvas — エンジン切り替え共通UI
// 各エンジンの index.html に置いたコンテナ(既定 #engines)へエンジンリンクを描画する。
// リンクは親階層の index.html(?engine= リダイレクト)経由で遷移し、現在のクエリ
// (project=/kasc= 等)とハッシュ(ビュー状態)を引き継ぐため、プロジェクトとカメラ
// 位置を保ったままエンジンを切り替えられる。
// 各エンジンは <webroot>/<name>/ に同居するため、ルートは絶対パスではなく
// "../" で解決する(GitHub Pages 等のパスプレフィックス配信でも動く)。

export const ENGINE_IDS = ["cesium", "maplibre", "openlayers", "leaflet"];

// 現在のクエリとハッシュを引き継いだ切替先URL(相対)
export function engineSwitchUrl(engine, loc = window.location) {
  const params = new URLSearchParams(loc.search);
  params.set("engine", engine);
  return `../?${params.toString()}${loc.hash}`;
}

// コンテナへエンジンリンクを描画する。現在のエンジンは <b> で表示する
export function mountEngineSwitcher(container, currentEngine, engines = ENGINE_IDS) {
  const el = container || document.querySelector("#engines");
  if (!el) return null;
  const links = [];
  el.replaceChildren("engine: ");
  for (const name of engines) {
    if (name === currentEngine) {
      const b = document.createElement("b");
      b.textContent = name;
      el.append(b);
      continue;
    }
    const a = document.createElement("a");
    a.dataset.engine = name;
    a.href = engineSwitchUrl(name);
    a.textContent = name;
    links.push(a);
    el.append(a);
  }
  // ビュー状態のハッシュは移動ごとに replaceState で書き替わる(hashchange は
  // 発火しない)ため、リンク使用直前に最新のURLへ張り替える
  const refresh = () => {
    for (const a of links) a.href = engineSwitchUrl(a.dataset.engine);
  };
  for (const ev of ["pointerdown", "contextmenu", "keydown", "click"]) {
    el.addEventListener(ev, refresh, { capture: true });
  }
  return el;
}
