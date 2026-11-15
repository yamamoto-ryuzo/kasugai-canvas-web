// 凡例タブ共通UI: legend: 行の画像とレイヤ凡例(QML/既定スタイル)を
// チェックボックスの複数選択で切替表示する。
//   images: [{title, url}]                          … legend: 行の画像
//   layers: [{ref, title, entries:[{label, spec, hidden?, symbolName?}]}] … ベクター凡例
// swatchUrl(spec) → dataURL を各エンジンが渡す
// (Cesium は desc→canvas、2D 系は qmlLegendSwatchDataUrl)。
// state.selectedKeys(Set) に選択中を保持するため、レイヤ一覧の再描画・
// 遅延ロード完了・テーマ切替での再呼出しでも選択が維持される
// (画像は "img:<index>"、レイヤは ref 参照で照合)
// onToggleSymbol(ref, symbolName, visible) … 行チェックボックスで
// シンボル単位の表示切替。onToggleAll(ref, visible) … 全表示/全非表示。
// entries に symbolName を持つ行がある場合のみインタラクティブになる
// state.mode = "vertical"(選択凡例を縦積み) / "tabs"(タブ切替で1件表示)。
// タブ表示時の開いているタブは state.activeTab に保持する
export function renderLayerLegendPicker(container, { images = [], layers = [] } = {}, { swatchUrl, state = {}, ariaLabel = "", imageGroupLabel = "", layerGroupLabel = "", onToggleSymbol, onToggleAll, showAllLabel = "全表示", hideAllLabel = "全非表示", verticalLabel = "縦表示", tabsLabel = "タブ表示" } = {}) {
  if (!container) return;
  container.replaceChildren();
  const items = [];
  images.forEach((im, i) => items.push({ kind: "image", key: `img:${i}`, title: im.title || "", url: im.url }));
  for (const l of layers || []) {
    if (l.entries?.length) items.push({ kind: "layer", key: l.ref, ref: l.ref, title: l.title || "", entries: l.entries });
  }
  if (!items.length) return;
  // 複数選択の保持(旧 state.selected 単一キーからも移行)
  if (!(state.selectedKeys instanceof Set)) {
    state.selectedKeys = new Set();
    const first = state.selected != null && items.some(it => it.key === state.selected) ? state.selected : items[0].key;
    state.selectedKeys.add(first);
  }
  // 選択UIは details ドロップダウンに格納し、普段は選択中タイトルの
  // 1行バーのみ表示する(開閉状態は state.sourceOpen で保持)
  const dd = document.createElement("details");
  dd.className = "legend-source-dd";
  dd.open = !!state.sourceOpen;
  dd.addEventListener("toggle", () => { state.sourceOpen = dd.open; });
  const summary = document.createElement("summary");
  summary.className = "legend-source-summary";
  summary.style.cssText = "cursor:pointer;user-select:none;padding:2px 6px;border:1px solid #8884;border-radius:4px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;margin:4px 0";
  const list = document.createElement("div");
  list.className = "legend-source-list";
  list.style.cssText = "border:1px solid #8884;border-top:none;border-radius:0 0 4px 4px;max-height:11em;overflow:auto";
  list.setAttribute("role", "group");
  if (ariaLabel) list.setAttribute("aria-label", ariaLabel);
  const addItemRow = it => {
    const lab = document.createElement("label");
    lab.className = "legend-source-row";
    lab.style.cssText = "display:flex;align-items:center;gap:6px;padding:1px 6px;cursor:pointer";
    const cb = document.createElement("input");
    cb.type = "checkbox";
    cb.className = "legend-source-check";
    cb.checked = state.selectedKeys.has(it.key);
    cb.addEventListener("change", () => {
      if (cb.checked) state.selectedKeys.add(it.key);
      else state.selectedKeys.delete(it.key);
      draw();
    });
    const span = document.createElement("span");
    span.textContent = it.title || "凡例";
    lab.append(cb, span);
    list.append(lab);
  };
  const imageItems = items.filter(it => it.kind === "image");
  const layerItems = items.filter(it => it.kind === "layer");
  const addGroup = (labelText, arr) => {
    if (!arr.length) return;
    // 画像とレイヤの両方があるときだけグループ見出しを出す
    if (labelText && imageItems.length && layerItems.length) {
      const g = document.createElement("div");
      g.className = "legend-source-group";
      g.style.cssText = "font-size:.85em;font-weight:600;padding:2px 6px 0;opacity:.75";
      g.textContent = labelText;
      list.append(g);
    }
    for (const it of arr) addItemRow(it);
  };
  addGroup(imageGroupLabel, imageItems);
  addGroup(layerGroupLabel, layerItems);
  dd.append(summary, list);
  // 表示モード切替(縦積み / タブ)。選択は state.mode に保持
  if (state.mode !== "tabs") state.mode = "vertical";
  const modeBar = document.createElement("div");
  modeBar.className = "legend-view-mode";
  modeBar.style.cssText = "display:flex;gap:6px;margin:2px 0 4px";
  const modeBtns = [];
  for (const [mode, txt] of [["vertical", verticalLabel], ["tabs", tabsLabel]]) {
    const b = document.createElement("button");
    b.type = "button";
    b.className = `legend-mode legend-mode-${mode}`;
    b.textContent = txt;
    b.addEventListener("click", () => { state.mode = mode; syncModeBtns(); draw(); });
    modeBtns.push([b, mode]);
    modeBar.append(b);
  }
  const syncModeBtns = () => {
    for (const [b, mode] of modeBtns) {
      const on = state.mode === mode;
      b.style.fontWeight = on ? "600" : "400";
      b.style.opacity = on ? "1" : ".65";
    }
  };
  syncModeBtns();
  const body = document.createElement("div");
  body.className = "legend-layer-entries";
  const drawItem = (block, it) => {
    // 各凡例が何由来か見出しで明示する
    // (レイヤ凡例はレイヤ一覧と同じタイトル、legend: 画像は行のタイトル)
    if (it.title) {
      const head = document.createElement("div");
      head.className = "legend-layer-title";
      head.style.cssText = "font-weight:600;margin:4px 0 2px";
      head.textContent = it.title;
      block.append(head);
    }
    if (it.kind === "image") {
      const img = document.createElement("img");
      img.className = "legend-image";
      img.src = it.url;
      img.alt = it.title;
      block.append(img);
      return;
    }
    const interactive = (it.entries || []).some(e => e.symbolName);
    if (interactive && onToggleAll) {
      const bar = document.createElement("div");
      bar.className = "legend-layer-actions";
      bar.style.cssText = "display:flex;gap:6px;margin:2px 0 6px";
      for (const [txt, vis] of [[showAllLabel, true], [hideAllLabel, false]]) {
        const b = document.createElement("button");
        b.type = "button";
        b.textContent = txt;
        b.addEventListener("click", () => onToggleAll(it.ref, vis));
        bar.append(b);
      }
      block.append(bar);
    }
    const showChecks = interactive && !!onToggleSymbol;
    for (const e of it.entries || []) {
      const row = document.createElement("div");
      row.className = "legend-row";
      if (e.hidden) row.style.opacity = ".45";
      if (showChecks) {
        const cb = document.createElement("input");
        cb.type = "checkbox";
        cb.className = "legend-row-check";
        cb.checked = !e.hidden;
        cb.disabled = !e.symbolName;
        cb.addEventListener("change", () => onToggleSymbol(it.ref, e.symbolName, cb.checked));
        row.append(cb);
      }
      let sw;
      if (e.spec) {
        sw = document.createElement("img");
        sw.alt = "";
        sw.src = swatchUrl(e.spec);
      } else {
        sw = document.createElement("span");
      }
      sw.className = `legend-swatch${e.spec ? "" : " legend-swatch-empty"}`;
      const lbl = document.createElement("span");
      lbl.className = "legend-label";
      lbl.textContent = e.label || "";
      row.append(sw, lbl);
      block.append(row);
    }
  };
  const draw = () => {
    body.replaceChildren();
    const sel = items.filter(it => state.selectedKeys.has(it.key));
    // ドロップダウンの見出しは選択中の凡例名(未選択時は案内文)
    summary.textContent = sel.map(it => it.title || "凡例").join("、") || ariaLabel || "凡例";
    summary.style.opacity = sel.length ? "1" : ".65";
    if (state.mode === "tabs") {
      if (!sel.length) return;
      if (!sel.some(it => it.key === state.activeTab)) state.activeTab = sel[0].key;
      const tabs = document.createElement("div");
      tabs.className = "legend-tabs";
      tabs.style.cssText = "display:flex;flex-wrap:wrap;gap:2px;border-bottom:1px solid #8884;margin-bottom:4px";
      for (const it of sel) {
        const tb = document.createElement("button");
        tb.type = "button";
        tb.className = "legend-tab";
        const active = it.key === state.activeTab;
        tb.style.cssText = `padding:2px 8px;border:1px solid #8884;border-bottom:none;border-radius:4px 4px 0 0;cursor:pointer;background:${active ? "#8882" : "transparent"};font-weight:${active ? "600" : "400"}`;
        tb.textContent = it.title || "凡例";
        tb.addEventListener("click", () => { state.activeTab = it.key; draw(); });
        tabs.append(tb);
      }
      body.append(tabs);
      const block = document.createElement("div");
      block.className = "legend-block";
      drawItem(block, sel.find(it => it.key === state.activeTab));
      body.append(block);
      return;
    }
    // 縦表示: 選択済みソースを一覧の並び順で全て表示する
    for (const it of sel) {
      const block = document.createElement("div");
      block.className = "legend-block";
      drawItem(block, it);
      body.append(block);
    }
  };
  container.append(dd, modeBar, body);
  draw();
}
