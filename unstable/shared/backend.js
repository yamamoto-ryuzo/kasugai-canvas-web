// KASUGAI Canvas — バックエンド検出と API ベース解決（エンジン横断で共有）
// 同一オリジン(アプリ版・Cloud Run・Workers)を優先し、バックエンドを持たない
// 静的配信(CDN ホスト版・file://)では起動中のローカルアプリ(127.0.0.1:8510)を
// バックエンドとして検出する。ローカルアプリは /api/*・/health で ACAO:*、
// /projects/* で許可オリジン限定の CORS+PNA に応答するため、https の
// ホスト版ページからもそのまま読み書きできる

// ローカルアプリの既定待受。QGIS geo_webview 連携や .kasc 関連付けと同じく
// 127.0.0.1:8510 固定で探す
export const LOCAL_BACKEND_ORIGIN = "http://127.0.0.1:8510";

let capabilities = null;
let resolved = false;
// /health が応答したか（capabilities を返さないバックエンドも「生存」扱い）
let alive = false;
// "" = 同一オリジン（相対パスでよい）。静的配信でローカルアプリを検出した
// 場合はそのオリジン（例: http://127.0.0.1:8510）
let base = "";
let detectPromise = null;

// 検出済みバックエンドのオリジン。"" の場合は同一オリジン
export function backendBaseUrl() { return base; }
// "/api/x" 等のバックエンドパスを実 URL へ解決する
export function backendUrl(path) { return `${base}${path}`; }
export function getBackendCapabilities() { return capabilities; }
export function isBackendCapabilitiesResolved() { return resolved; }
export function isBackendAlive() { return alive; }
export function hasBackendFeature(name) {
  return !!capabilities?.features?.includes(name);
}

export function setBackendCapabilities(caps, done = true, baseUrl = base) {
  capabilities = caps && caps.tier ? caps : null;
  resolved = done;
  base = typeof baseUrl === "string" ? baseUrl : base;
}

// サーバー提供の Maps API キーは未保存時のみ自動登録（BYO キー優先）
function adoptServerMapsKey(caps) {
  try {
    const mapsKey = caps?.google?.mapsApiKey;
    if (mapsKey && !localStorage.getItem("googleMapsApiKey")) {
      localStorage.setItem("googleMapsApiKey", mapsKey);
    }
  } catch (e) {}
}

async function fetchCapabilities(origin) {
  const caps = await fetch(`${origin}/api/capabilities`, { cache: "no-store" })
    .then(r => (r.ok ? r.json() : null)).catch(() => null);
  return caps && caps.tier ? caps : null;
}

// 静的配信環境でのフォールバック検出。ローカルアプリを確実に識別するため
// name==="kasugai_canvas" のみ受け入れる（8510 に無関係なサービスが居ても
// バックエンドと誤認しない。ok:true の寛容判定は同一オリジン限定）
async function detectLocalBackend() {
  try {
    const res = await fetch(`${LOCAL_BACKEND_ORIGIN}/health`,
      { signal: AbortSignal.timeout(1500), cache: "no-store" });
    if (!res.ok) return;
    const data = await res.json().catch(() => ({}));
    if (data?.name !== "kasugai_canvas") return;
    alive = true;
    setBackendCapabilities(await fetchCapabilities(LOCAL_BACKEND_ORIGIN),
      true, LOCAL_BACKEND_ORIGIN);
    adoptServerMapsKey(capabilities);
  } catch (e) { /* ローカルアプリ未起動 */ }
}

// /health + /api/capabilities によるバックエンド検出。
// スケールトゥゼロ環境のコールドスタートに備え、応答自体が無い場合は
// 同一オリジンを最大3回までリトライする。404 等の HTTP 応答は得られ次第
// 確定し、静的配信とみなしてローカルアプリをフォールバック検出する。
// 2回目以降の呼び出しは初回の Promise を共有する
export function detectBackend() {
  if (detectPromise) return detectPromise;
  detectPromise = (async () => {
    // file:// 等では同一オリジンにバックエンドが存在し得ないため即フォールバック
    if (location.protocol !== "http:" && location.protocol !== "https:") {
      await detectLocalBackend();
      resolved = true;
      return capabilities;
    }
    for (let attempt = 0; ; attempt++) {
      try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 1000);
        const response = await fetch("/health", { signal: controller.signal, cache: "no-store" });
        clearTimeout(timeout);
        if (response.ok) {
          const data = await response.json().catch(() => ({}));
          alive = data?.name === "kasugai_canvas";
          // ローカルRustサーバー以外（Cloud Run版エージェント等）でも /health が
          // {ok:true} を返せば capabilities を取得する
          if (alive || data?.ok === true) {
            setBackendCapabilities(await fetchCapabilities(""), true, "");
            adoptServerMapsKey(capabilities);
          }
          resolved = true;
          return capabilities;
        }
        break; // 404 等: 同一オリジンにバックエンドなし → ローカルアプリを試す
      } catch {
        if (attempt >= 2) break;
        await new Promise(r => setTimeout(r, 2000));
      }
    }
    await detectLocalBackend();
    resolved = true;
    return capabilities;
  })();
  return detectPromise;
}
