import { AtmosphereOverlay } from '@takram/three-atmosphere';
import { AtmosphereShadow } from '@takram/three-atmosphere';
import { AtmosphereShadowLength } from '@takram/three-atmosphere';
import { BlendFunction } from 'postprocessing';
import { BufferAttribute } from 'three';
import { BufferGeometry } from 'three';
import { BufferGeometryEventMap } from 'three';
import { Camera } from 'three';
import { CascadedShadowMaps } from '@navaramap/three-csm';
import { Color as Color_3 } from 'three';
import { CopyPass as CopyPass_2 } from 'postprocessing';
import { CSMHelper } from '@navaramap/three-csm';
import { CssFontFaceFilter } from '@navaramap/font';
import { DataTexture } from 'three';
import { DepthCopyPass } from 'postprocessing';
import { DepthPackingStrategies } from 'three';
import { DepthTexture } from 'three';
import { Effect as Effect_2 } from 'postprocessing';
import { EffectComposer } from 'postprocessing';
import { EffectPass } from 'postprocessing';
import { Feature } from 'geojson';
import { FeatureCollection } from 'geojson';
import { FetchCssFontFamilyOptions } from '@navaramap/font';
import { fetchFontFamilyFromCss } from '@navaramap/font';
import { FontFace as FontFace_2 } from '@navaramap/font';
import { FontFamily } from '@navaramap/font';
import { FontManager } from '@navaramap/font';
import { FontWorkerMemoryStats } from '@navaramap/font';
import { Geometry } from 'geojson';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { Group } from 'three';
import { InstancedMesh as InstancedMesh_2 } from 'three';
import { Intersection } from 'three';
import { Light as Light_2 } from 'three';
import { Line2 } from 'three-stdlib';
import { Material } from 'three';
import { Matrix4 } from 'three';
import { Mesh as Mesh_2 } from 'three';
import { MeshBasicMaterial } from 'three';
import { MeshLambertMaterial } from 'three';
import { MeshPhongMaterial } from 'three';
import { MeshPhysicalMaterial } from 'three';
import { MeshStandardMaterial } from 'three';
import { NormalBufferAttributes } from 'three';
import { Object3D } from 'three';
import { Object3DEventMap } from 'three';
import { OrthographicCamera } from 'three';
import { ParseCssFontFamilyOptions } from '@navaramap/font';
import { parseCssUnicodeRange } from '@navaramap/font';
import { parseFontFamilyFromCss } from '@navaramap/font';
import { Pass as Pass_2 } from 'postprocessing';
import { PerspectiveCamera } from 'three';
import { Plane as Plane_3 } from 'three';
import { PlaneGeometry } from 'three';
import { PointsMaterial } from 'three';
import { PrecomputedTextures } from '@takram/three-atmosphere';
import { Ray as Ray_3 } from 'three';
import { Raycaster } from 'three';
import { RenderPass as RenderPass_2 } from 'postprocessing';
import { Scene } from 'three';
import { ShaderLibShader } from 'three';
import { ShaderMaterial } from 'three';
import { ShapedGlyph } from '@navaramap/font';
import { ShapeTextResult } from '@navaramap/font';
import { Sprite } from 'three';
import { Texture } from 'three';
import { TextureEventMap } from 'three';
import { UnicodeRange } from '@navaramap/font';
import { Vector2 } from 'three';
import { Vector3 } from 'three';
import { Vector4 } from 'three';
import { WebGLCubeRenderTarget } from 'three';
import { WebGLProgramParametersWithUniforms } from 'three';
import { WebGLRenderer } from 'three';
import { WebGLRenderTarget } from 'three';
import { Promise as WorkerPoolPromise } from 'workerpool';

declare class Aabb {
    free(): void;
    [Symbol.dispose](): void;
    constructor(center: Vec3_2, extent: Vec3_2);
    center: Vec3_2;
    extent: Vec3_2;
}

export declare type AbortControllers = Map<string, AbortController>;

/**
 * A pass that copies and optionally merges depth buffers.
 * This is used to accumulate depths from multiple render stages.
 */
export declare class AllDepthCopyPass extends Pass_2 {
    private _renderTarget;
    private _material;
    private _merge;
    private _copyPassRenderTarget;
    private _copyPass;
    constructor(renderTarget?: WebGLRenderTarget);
    get texture(): Texture;
    get depthPacking(): DepthPackingStrategies;
    /**
     * Set the depth texture to copy from.
     */
    setDepthTexture(texture: DepthTexture | Texture | null, packing?: DepthPackingStrategies): void;
    /**
     * Copy depth buffer, optionally merging with existing depth.
     * @param merge - If true, merge with existing depth by keeping the minimum (closest) depth
     */
    copyDepth(merge?: boolean): void;
    setSize(width: number, height: number): void;
    render(renderer: WebGLRenderer, _inputBuffer: WebGLRenderTarget | null, _outputBuffer: WebGLRenderTarget | null): void;
    dispose(): void;
}

export declare type AnyMeshConfig = MeshConfig;

/** The mesh descriptor hierarchy. */
export declare type AnyMeshDesc = MeshDesc;

/** Split out so `CustomRenderPass` can rebuild a target around a reused color. */
export declare function appendOptionalGBufferAttachments(renderTarget: WebGLRenderTarget, buffers: ResolvedGBufferOptions): void;

/** Applies a material's three-state `lit` option. */
export declare function applyLitOption(material: Material, lit: boolean | undefined): void;

/**
 * `geodetic`, `matrix` and `matrixWorld` all claim the object's placement, so
 * they share a single slot and at most one may be set. Every consumer resolves
 * that slot with a priority chain (`applyTransform`, `applyRTETransform`), so
 * allowing two would silently drop the lower-priority one — notably `matrix`
 * under `matrixWorld`, which cannot be honoured at all once
 * `matrixWorldAutoUpdate` is off. Takes the values rather than reading `this`,
 * so a caller can check a prospective state before committing it. Exported so
 * subclasses that override `onUpdateConfig` (e.g. RTE Descriptors like
 * `GLTFModelDesc`) reuse this single check instead of hand-rolling their own.
 */
export declare function assertNoTransformConflict(geodetic: GeodeticPlacement | undefined, matrix: Matrix4 | undefined, matrixWorld: Matrix4 | undefined): void;

/** Creates the per-tile MRT trio. Injected so tests can supply fakes. */
declare type AtlasFactory = (size: number) => CompositeAtlas;

/**
 * Context for atmosphere rendering.
 *
 * Manages sun/moon positions, precomputed atmosphere textures, and related state.
 * Some variables are shared with Clouds and AerialPerspective.
 */
export declare class Atmosphere extends EventHandler<AtmosphereEvents> {
    /**
     * @private
     */
    private renderer;
    /**
     * Current sun direction in ECEF coordinates.
     */
    sunDirection: Vector3;
    /**
     * Current moon direction in ECEF coordinates.
     */
    moonDirection: Vector3;
    /**
     * @private
     */
    private rotationMatrix;
    /**
     * Precomputed atmosphere textures used for rendering. Each texture is
     * loaded lazily when a consumer declares a need for it via
     * {@link onTexturesReady}, so the object may hold any subset at a time.
     */
    textures: Partial<PrecomputedTextures>;
    overlay: Observed<AtmosphereOverlay | null>;
    shadow: Observed<AtmosphereShadow | null>;
    shadowLength: Observed<AtmosphereShadowLength | null>;
    enableShadows: Observed<boolean>;
    /**
     * @private
     */
    private needsUpdate;
    /**
     * @private
     */
    private options;
    /**
     * @private
     */
    private _camera;
    /**
     * In-flight per-texture loading promises, shared across consumers so each
     * asset is fetched only once.
     * @private
     */
    private texturePromises;
    /**
     * Creates a new Atmosphere instance.
     * @param renderer - The WebGL renderer used for texture type detection.
     * @param options - Configuration options for the atmosphere.
     * @param camera - Camera reference used by {@link setDateAt}.
     */
    constructor(renderer: WebGLRenderer, options?: AtmosphereOptions, camera?: ThreeViewCamera);
    /**
     * Marks the atmosphere as needing an update.
     * @private
     */
    onUpdate: () => void;
    /**
     * Loads all precomputed atmosphere textures asynchronously.
     *
     * Each texture loads automatically once a consumer declares a need for it
     * via {@link onTexturesReady}; call this manually only to prefetch every
     * texture ahead of time.
     *
     * @returns A promise that resolves when all textures are loaded.
     */
    initTextures(): Promise<void>;
    /**
     * Loads a single precomputed texture, sharing in-flight loads and caching
     * the result. A failed load is forgotten so the next request retries it.
     * @private
     */
    private loadTexture;
    private fetchTexture;
    /**
     * @private
     */
    _dispose(): void;
    /**
     * Invokes the callback once every needed precomputed texture is loaded —
     * immediately if they already are.
     *
     * Registering also starts loading the needed textures if they aren't loaded
     * yet, so a texture is only fetched once something that needs it exists.
     *
     * @param callback - Receives the textures; the ones listed in `needs` are
     * guaranteed to be present.
     * @param needs - The textures the caller needs, e.g.
     * `{ transmittance: true }`. Omit to load all of them.
     *
     * @example
     * atmosphere.onTexturesReady(
     *   (t) => light.setTransmittanceTexture(t.transmittanceTexture),
     *   { transmittance: true },
     * );
     */
    onTexturesReady<N extends AtmosphereTextureNeeds = Record<AtmosphereTextureName, true>>(callback: (textures: LoadedAtmosphereTextures<N>) => void, needs?: N): void;
    /**
     * Returns a clone of the current sun direction vector.
     * @returns A new Vector3 representing the sun direction in ECEF coordinates.
     */
    getSunDirection(): Vector3;
    /**
     * Returns a clone of the current moon direction vector.
     * @returns A new Vector3 representing the moon direction in ECEF coordinates.
     */
    getMoonDirection(): Vector3;
    /**
     * Returns a clone of the ECI to ECEF rotation matrix.
     * @returns A new Matrix4 representing the rotation from ECI to ECEF coordinates.
     */
    getRotationMatrix(): Matrix4;
    /**
     * Updates sun/moon directions and rotation matrix if needed.
     * @private
     */
    _update(): void;
    /**
     * Determines whether a given position is on the night side of the Earth.
     * @param position - The position in ECEF coordinates to check.
     * @returns `true` if the position is on the night side, `false` otherwise.
     */
    isAtNight(position: XYZ): boolean;
    /**
     * Returns the sun's elevation angle in degrees above the local horizon at
     * `location` for the current {@link date}. Positive is above the horizon,
     * negative below (night); includes atmospheric refraction.
     *
     * @example
     * const elevation = view.atmosphere.getSunElevation(view.camera.positionGeographic);
     * if (elevation < 0) console.log("The sun has set.");
     */
    getSunElevation(location: {
        lat: number;
        lng: number;
    }): number;
    /**
     * Returns the local apparent solar time at `lng` for the current
     * {@link date}, in hours in the range [0, 24) where 12 is solar noon.
     * Accounts for the equation of time.
     *
     * @example
     * const hours = view.atmosphere.getSolarTime({ lng: 139.69 }); // e.g. 6.3 = 06:18
     */
    getSolarTime(location: {
        lng: number;
    }): number;
    /**
     * Sets {@link date} so the local apparent solar time at `lng` equals `hours`
     * (0–24), keeping the same solar day. Inverse of {@link getSolarTime}.
     *
     * @example
     * view.atmosphere.setSolarTime({ lng: 139.69 }, 6.3); // sunrise over Tokyo
     */
    setSolarTime(location: {
        lng: number;
    }, hours: number): void;
    /**
     * Gets the current date used for calculating sun/moon positions.
     */
    get date(): Date;
    /**
     * Sets the date used for calculating sun/moon positions.
     * Triggers an update to recalculate celestial body directions.
     */
    set date(v: Date);
    /**
     * Adjusts `atmosphere.date` so that the local solar time at `to` matches the
     * local solar time at `from`.
     *
     * The calculation is based on the sun's hour angle, which increases
     * monotonically over a solar day, giving exactly one solution per day with no
     * morning/afternoon ambiguity. The equation of time is accounted for
     * automatically.
     *
     * @example
     * // atmosphere.date shows 08:00 local solar time at Tokyo.
     * view.atmosphere.setDateAt({ lng: 139.69 }, { lng: 0 });
     * // → atmosphere.date is now 08:00 local solar time at London
     *
     * @param from - Source location. Only `lng` (degrees) affects the result.
     * @param to   - Target location. Only `lng` (degrees) affects the result.
     */
    setDateAt(from: {
        lng: number;
        lat?: number;
    }, to: {
        lng: number;
        lat?: number;
    }): void;
    /**
     * Adjusts `atmosphere.date` so that the sun elevation at `to` matches the
     * sun elevation at `from`.
     *
     * Morning/afternoon context is preserved. If the target elevation cannot be
     * reached at `to` (e.g. polar night), the date is clamped to solar noon
     * there.
     *
     * @example
     * // atmosphere.date shows sun at 30° elevation over Tokyo.
     * view.atmosphere.setElevationAt({ lat: 35.68, lng: 139.69 }, { lat: 51.5, lng: -0.12 });
     * // → atmosphere.date adjusted so sun is also at 30° elevation over London
     *
     * @param from - Source location (both `lat` and `lng` required).
     * @param to   - Target location (both `lat` and `lng` required).
     */
    setElevationAt(from: {
        lat: number;
        lng: number;
    }, to: {
        lat: number;
        lng: number;
    }): void;
    /**
     * Convenience wrapper for {@link setDateAt} that uses the camera position as
     * `from`.
     *
     * @example
     * // Camera is over Tokyo showing 08:00 local solar time.
     * view.atmosphere.setDateFromCameraAt({ lng: 0 }); // adjust to London
     * // → atmosphere.date is now 08:00 local solar time at London
     *
     * @param to - Target location. Only `lng` (degrees) affects the result.
     */
    setDateFromCameraAt(to: {
        lng: number;
        lat?: number;
    }): void;
    /**
     * Convenience wrapper for {@link setElevationAt} that uses the camera
     * position as `from`.
     *
     * @example
     * // Camera is over Tokyo with sun at 30° elevation.
     * view.atmosphere.setElevationFromCameraAt({ lat: 51.5, lng: -0.12 }); // adjust to London
     * // → atmosphere.date adjusted so sun is also at 30° elevation over London
     *
     * @param to - Target location (both `lat` and `lng` required).
     */
    setElevationFromCameraAt(to: {
        lat: number;
        lng: number;
    }): void;
}

export declare const ATMOSPHERE_HIGHER_ORDER_SCATTERING_URL: string;

export declare const ATMOSPHERE_IRRADIANCE_URL: string;

export declare const ATMOSPHERE_SCATTERING_URL: string;

export declare const ATMOSPHERE_SINGLE_MIE_SCATTERING_URL: string;

/**
 * Filenames requested by `PrecomputedTexturesLoader` mapped to their
 * statically-resolved URLs. Used to remap directory-relative requests when
 * loading the bundled default atmosphere assets.
 */
export declare const ATMOSPHERE_TEXTURE_URLS: Record<string, string>;

export declare const ATMOSPHERE_TRANSMITTANCE_URL: string;

/**
 * Events emitted by the {@link Atmosphere} class.
 */
declare type AtmosphereEvents = {
    /** Emitted when the atmosphere needs to trigger a re-render. */
    needsUpdate: () => void;
    /** Emitted each time a precomputed atmosphere texture finishes loading. */
    textureLoaded: () => void;
    /** Emitted when the atmosphere is disposed. */
    disposed: () => void;
    /** Emitted when the sun direction changes. */
    sunChanged: (sunDirection: Vector3) => void;
};

/**
 * Configuration options for the {@link Atmosphere} class.
 */
export declare type AtmosphereOptions = {
    /**
     * URL of a directory to load precomputed atmosphere textures from. The
     * directory must keep the original filenames (`transmittance.exr` etc.).
     * When omitted, the assets bundled with the package are used.
     */
    atmosphereAssetsUrl?: string | undefined;
    /** URL to load STBN (Spatio-Temporal Blue Noise) textures from. */
    stbnUrl?: string;
    /** Date used for calculating sun/moon positions. Defaults to current date. */
    date?: Date;
};

/**
 * Names of the precomputed atmosphere textures that can be loaded
 * individually.
 */
declare type AtmosphereTextureName = "transmittance" | "scattering" | "irradiance" | "higherOrderScattering";

/**
 * Which precomputed textures a consumer needs, e.g.
 * `{ transmittance: true }`. Only `true` is allowed as a value so that every
 * listed texture is guaranteed to be loaded.
 */
declare type AtmosphereTextureNeeds = Partial<Record<AtmosphereTextureName, true>>;

/**
 * Attach `target` so it samples `source`'s batch data texture (e.g. a
 * PolygonOutline sharing its polygon mesh's texture). From then on slot
 * allocations stamp the layout defines onto `target` too, and texture growth
 * propagates through the shared uniform.
 */
export declare function attachBatchedMaterial(source: Material, target: Material): void;

declare type Attributes = BatchedFeatureAttributes<{
    position?: BufferAttribute;
    position_3d_high?: BufferAttribute;
    position_3d_low?: BufferAttribute;
    normal: BufferAttribute;
    scaleNormalAndCap: BufferAttribute;
    attrBatchId: BufferAttribute;
}>;

declare type Attributes_2 = BatchedFeatureAttributes<{
    position: BufferAttribute;
    position_3d_high?: BufferAttribute;
    position_3d_low?: BufferAttribute;
    start_3d_high?: BufferAttribute;
    start_3d_low?: BufferAttribute;
    end_3d_high?: BufferAttribute;
    end_3d_low?: BufferAttribute;
    start?: BufferAttribute;
    forward_offset?: BufferAttribute;
    start_normal?: BufferAttribute;
    end_normal_and_texture_coordinate_normalization_x?: BufferAttribute;
    right_normal_and_texture_coordinate_normalization_y: BufferAttribute;
    attrBatchId: BufferAttribute;
}>;

/**
 * Attribution data model and framework-agnostic helpers.
 *
 * This module imports **nothing from the engine (WASM)**, so the pure logic
 * (type guards, zoom-band matching, HTML sanitization) is unit-testable without
 * loading it. The `AttributionPlugin` class composes these.
 */
/**
 * A single zoom-banded child credit under a top-level source. The band
 * `[minZoom, maxZoom]` is matched against the current camera zoom; an omitted
 * bound is unbounded on that side.
 */
export declare type AttributionChild = {
    /** Attribution / credit text. May contain partial `<a>` links. */
    attribution: string;
    /** Inclusive lower zoom bound. Unbounded when omitted. */
    minZoom?: number;
    /** Inclusive upper zoom bound. Unbounded when omitted. */
    maxZoom?: number;
};

/** A raw HTML credit with partial links, rendered as-is (after sanitization). */
export declare type AttributionHtml = {
    /** Credit HTML containing partial `<a>` links. */
    attributionHtml: string;
};

/** An attribution entry: either a structured source or a raw HTML credit. */
export declare type AttributionItem = AttributionSource | AttributionHtml;

/**
 * Renders map data attributions as a non-modal popover (ⓘ button, bottom-right
 * by default). Top-level sources can carry nested, optionally zoom-banded child
 * credits.
 *
 * A `ThreeView` creates one by default (`view.attribution`); construct it
 * manually and `view.addPlugin(plugin)` **before** `view.init()` only when the
 * view was created with `defaultAttribution: false`.
 */
export declare class AttributionPlugin extends Plugin_2<View, ViewContext> {
    private view?;
    private items;
    private styleEl?;
    private dock?;
    private card?;
    private listEl?;
    private logosEl?;
    private toggle?;
    private isOpen;
    /** Last computed integer zoom level. Used to skip no-op re-renders. */
    private lastZoomLevel?;
    /** Whether any source has zoom-banded children — gates the per-frame poll. */
    private hasZoomBands;
    /** Per-layer dynamic credits, keyed by `layer.id`. */
    private layerCredits;
    private layerCleanups;
    /** Color overrides, applied as CSS custom properties on the dock. */
    private style;
    /** Bottom corner for the ⓘ button / popover card. */
    private position;
    private boundKeydown;
    private boundPreRender;
    constructor(options?: AttributionPluginOptions);
    /**
     * The full list to render: the built-in Navara credit first, then the
     * user-managed set. Always non-empty, so the dock stays visible.
     */
    private displayedItems;
    init(view: View, _ctx: ViewContext): Promise<void>;
    /**
     * Add attributions to the displayed set. Merged with the current entries;
     * exact duplicates are dropped so several data sources that share one credit
     * (e.g. multiple Overture themes) render a single line, not one each.
     *
     * Sources that declare a `creditLayerId` have that layer's per-feature credits
     * tracked dynamically; the layer is resolved from the view by id, so callers
     * don't pass the `Layer` object separately.
     *
     * @param items - Attribution entries (sources or raw HTML credits)
     */
    add(items: AttributionItem[]): void;
    /**
     * Remove attributions from the displayed set. Entries are matched
     * structurally (same rendered content), so pass the same object shape that
     * was added — no separate id is needed. Unmatched entries are ignored.
     *
     * @param items - Attribution entries to drop
     */
    remove(items: AttributionItem[]): void;
    /**
     * Remove all user-added attributions, keeping the plugin usable. The built-in
     * Navara credit and the dock stay visible; the logo frame hides if no logo
     * remains. Use {@link dispose} to tear the DOM down.
     */
    clear(): void;
    /** Resolve/track the current items' credit layers and render. */
    private apply;
    /**
     * Resolve the `Layer` objects referenced by sources' `creditLayerId`, deduped
     * by id so a layer referenced by multiple sources is tracked only once.
     */
    private resolveCreditLayers;
    /**
     * Open the attribution popover. It is collapsed by default, so call this (or
     * use the ⓘ button, which toggles the same state) to open it. Affects the
     * popover card only — the always-visible logo frame stays put.
     */
    show(): void;
    /**
     * Close the attribution popover. Affects the popover card only; the tracked
     * attributions and the always-visible logo frame are untouched (use
     * {@link remove} to drop entries, {@link dispose} to tear everything down).
     */
    hide(): void;
    /** Release all DOM nodes, camera listeners, and layer listeners. */
    dispose(): void;
    /**
     * Update the UI colors. Merges over the current style and re-themes the live
     * DOM in place (no rebuild), so it suits runtime switches like light ⇄ dark.
     */
    setStyle(style: AttributionStyle): void;
    /** Push the current style onto the dock as CSS custom properties. */
    private applyStyle;
    /**
     * Build / refresh the popover DOM from {@link displayedItems}, filtering
     * zoom-banded children by the current camera zoom.
     */
    private render;
    /** Create the dock DOM and inject (or reuse) the shared styles. */
    private ensureDom;
    /** Create a bullet list item, returning the `<li>` and its text `<span>`. */
    private createItemShell;
    /**
     * Rebuild the list. Each source shows its sub-credits — zoom-filtered static
     * `children` plus the dynamic credits of the layer it links via
     * `creditLayerId` — as a nested list.
     */
    private populateList;
    /** Aggregated, deduped credit strings for a tracked layer's visible features. */
    private layerCreditStrings;
    /**
     * Rebuild the list if the popover is open; while closed, do nothing —
     * `setOpen()` repopulates on open, so deferred updates are picked up then.
     */
    private requestRender;
    /** Rebuild the always-visible logo frame from sources that declare a `logo`. */
    private populateLogos;
    /** Open / close the popover. Non-modal: no backdrop is added. */
    private setOpen;
    private handleKeydown;
    /**
     * Recompute the zoom and, only when the integer level changed, re-render the
     * list (a "quiet" update — no flicker, no animation). Called on every
     * `preRender`; the level-change gate makes it a no-op unless the band changes.
     */
    private handlePreRender;
    /**
     * Current integer Web Mercator zoom level. The engine computes the fractional
     * zoom (altitude/FOV/viewport) in Rust via `camera.zoom`; floor it to a tile
     * level for band matching. `undefined` (e.g. before the first frame) shows all
     * bands.
     */
    private currentZoomLevel;
    /**
     * Remove this instance's DOM nodes, document + layer listeners, and state.
     * The shared style element is removed only when the last instance tears down.
     */
    private teardownDom;
    /**
     * Subscribe to the given layers' feature events and merge per-feature credits
     * into the rendered list as features appear / disappear. Detaches any
     * previously registered listeners first, so repeated `add()` / `remove()`
     * don't leak.
     */
    private trackLayers;
}

/** Options for {@link AttributionPlugin}. */
export declare type AttributionPluginOptions = {
    /** Initial color overrides; tweak later with {@link AttributionPlugin.setStyle}. */
    style?: AttributionStyle;
    /**
     * Bottom corner for the ⓘ button and its popover card. Defaults to
     * `"bottom-right"`; use `"bottom-left"` when the bottom-right corner is
     * occupied (e.g. a page with its own HUD there). The logo frame lives in the
     * bottom-left area in both modes; in `"bottom-left"` the ⓘ takes the far-left
     * corner and the logos shift right to sit beside it.
     */
    position?: AttributionPosition;
};

/** Which bottom corner the attribution UI anchors to. */
export declare type AttributionPosition = "bottom-left" | "bottom-right";

/**
 * A top-level source (provider). It may carry zoom-banded child credits
 * (`children`), a mandated `logo`, and dynamic per-layer credits linked via
 * `creditLayerId`.
 */
export declare type AttributionSource = {
    /** Top-level source / provider name. */
    attribution: string;
    /** Optional link for the source name, rendered as an `<a>`. */
    attributionUrl?: string;
    /**
     * Optional logo image URL. When set, the logo is shown in an always-visible
     * frame in the bottom-left corner, independent of the popover's open state —
     * as required for contractually-mandated marks (Google, Cesium ion, etc.).
     * The logo is linked only when {@link logoUrl} is set; otherwise it is a plain
     * image (e.g. a mark that must be shown but not turned into a link).
     */
    logo?: string;
    /**
     * Optional click target for the {@link logo}, opened in a new tab. Kept
     * separate from {@link attributionUrl} (the title's link) so a provider can
     * require the logo be shown without linking it, or point the logo somewhere
     * other than the title. Has no effect unless {@link logo} is also set.
     */
    logoUrl?: string;
    /** Zoom-banded child credits, filtered by current camera zoom. */
    children?: AttributionChild[];
    /**
     * Optional id (`layer.id`) of the tracked layer whose per-feature credits are
     * nested under this source. Named `creditLayerId` rather than `layerId`
     * because "layer" alone is ambiguous in this project. A plain string (not a
     * `Layer`) keeps `attribution.ts` engine-free.
     */
    creditLayerId?: string;
};

/**
 * Customizable colors for the attribution UI. Every field is optional; an unset
 * field keeps the built-in default. Applied as CSS custom properties, so
 * {@link AttributionPlugin.setStyle} can re-theme live (e.g. light ⇄ dark)
 * without rebuilding the DOM.
 */
export declare type AttributionStyle = {
    /** Source title text color. */
    titleColor?: string;
    /** Link (`<a>`) and info-icon color. */
    linkColor?: string;
    /** Bullet (list marker) color. */
    listStyleColor?: string;
    /** Body text color. */
    textColor?: string;
    /** Nested sub-credit text color. */
    nestedTextColor?: string;
    /** Popover and trigger background color. */
    backgroundColor?: string;
    /** Header divider (border) color — useful for dark themes. */
    borderColor?: string;
};

declare const AVAILABLE_SHADERS: ("standard" | "physical")[];

declare const AVAILABLE_SHADERS_10: readonly ["shader"];

declare type AVAILABLE_SHADERS_10 = typeof AVAILABLE_SHADERS_10;

declare type AVAILABLE_SHADERS_2 = typeof AVAILABLE_SHADERS_3;

declare const AVAILABLE_SHADERS_3: ("standard" | "physical")[];

declare const AVAILABLE_SHADERS_4: "lambert"[];

declare type AVAILABLE_SHADERS_5 = typeof AVAILABLE_SHADERS_6;

declare const AVAILABLE_SHADERS_6: "lambert"[];

/**
 * Shader types that this enhancer can transform.
 */
declare const AVAILABLE_SHADERS_7: ("basic" | "lambert" | "phong" | "standard" | "physical")[];

declare const AVAILABLE_SHADERS_8: readonly ["shader"];

declare type AVAILABLE_SHADERS_8 = typeof AVAILABLE_SHADERS_8;

declare const AVAILABLE_SHADERS_9: readonly ["shader"];

declare type AVAILABLE_SHADERS_9 = typeof AVAILABLE_SHADERS_9;

declare type AvailableMaterialProperty = ExtractProperties<PointMaterial & PolylineMaterial & PolygonMaterial & ModelMaterial_2 & TextMaterial>;

/** A `b3dm` source: a single Batched 3D Model tile. */
export declare type B3dmSource = SourceBase & WithColorSupport<Layer_2<Tiles3dSourceDescription & {
    type: "b3dm";
}>>;

/**
 * Abstract base class for descriptors (mesh, light, and effect descriptors).
 * Extend this class to create custom descriptor types.
 *
 * Descriptors differ from resource layers in that they are purely client-side
 * and don't load data from external sources. They create Three.js objects directly.
 *
 * @typeParam Config - Configuration type for the descriptor (extends BaseDescConfig)
 * @typeParam UpdateConfig - Configuration properties that can be updated (extends BaseDescConfigUpdate)
 * @typeParam Instance - The underlying Three.js object type created by the descriptor
 * @typeParam CustomEvent - Additional custom events the descriptor can emit
 *
 * @example
 * ```typescript
 * // Creating a custom mesh desc
 * class MyCustomMeshDesc extends BaseDesc<MyConfig, MyUpdateConfig, Mesh> {
 *   onCreate() {
 *     const geometry = new BoxGeometry(1, 1, 1);
 *     const material = new MeshBasicMaterial();
 *     this._instance = new Mesh(geometry, material);
 *     this.ctx.scenes.opaque.add(this._instance);
 *   }
 * }
 * ```
 */
export declare abstract class BaseDesc<Config extends BaseDescConfig = BaseDescConfig, UpdateConfig extends BaseDescConfigUpdate = BaseDescConfigUpdate, Instance extends BaseInstance = BaseInstance, CustomEvent extends BaseEventMap = BaseEventMap> extends EventHandler<BaseDescEvents & CustomEvent> {
    /** The unique identifier. */
    readonly id: string;
    /** The ThreeView instance providing access to camera, atmosphere, globe, and other view state. */
    protected view: ThreeView;
    /** The view context providing access to scenes, passes, and rendering internals. */
    protected ctx: ViewContext;
    /** The underlying Three.js instance. */
    protected _instance: Instance | undefined;
    private _visible?;
    private _destroyed;
    constructor(view: ThreeView, ctx: ViewContext, config?: Config);
    /**
     * Called when the this class is added to the scene. Override this to create the Three.js objects.
     * This is where you should initialize `this._instance` and add it to the appropriate scene.
     *
     * May return a promise: a descriptor whose implementation loads lazily
     * (e.g. an `await import(...)` of a heavy renderer dependency) can be
     * `async`, awaiting the module before delegating to `super.onCreate()`
     * (after checking {@link destroyed}). `addMesh`/`addLight`/`addEffect`
     * still return their handle synchronously; the instance appears once the
     * promise settles, and a rejection is reported through the descriptor's
     * `error` event (when it declares one). Handle calls issued while the
     * promise is pending are safe: `update()`/`visible` store their fields
     * without touching the missing instance (the deferred `super.onCreate()`
     * applies them), and per-frame/resize hooks are wired only after creation
     * completes.
     */
    abstract onCreate(): void | Promise<void>;
    /**
     * Called when the configuration is updated via `BaseHandle.update()`.
     * Override this to handle custom configuration updates.
     * @param updates - The configuration properties being updated
     */
    onUpdateConfig(updates: UpdateConfig): void;
    protected requestUpdate(): void;
    /**
     * Called when deleted via `BaseHandle.delete()`.
     * Override this to clean up resources. Remember to call `super.onDestroy()`.
     */
    onDestroy(): void;
    /**
     * True once {@link onDestroy} has run. An async {@link onCreate} (and the
     * hook wiring that waits on it) checks this after its awaited module
     * resolves, so a descriptor deleted mid-load creates nothing.
     */
    get destroyed(): boolean;
    /**
     * Gets whether this is currently visible.
     */
    get visible(): boolean;
    /**
     * Sets whether this should be visible.
     */
    set visible(v: boolean);
}

/**
 * Base configuration options common to all descriptors.
 */
export declare type BaseDescConfig = {
    /** Optional custom ID. Auto-generated if not provided. */
    id?: string;
    /** Whether the descriptor is visible. Defaults to true. */
    visible?: boolean;
};

/**
 * Configuration properties that can be updated after creation.
 */
export declare type BaseDescConfigUpdate = Pick<BaseDescConfig, "visible">;

/**
 * Internal events emitted by BaseDesc.
 */
declare type BaseDescEvents = {
    /* Excluded from this release type: needsUpdate */
};

declare type BaseEventMap = Record<string, (...args: any[]) => unknown>;

/**
 * Abstract base handle to control a descriptor after it has been added to the scene.
 *
 * Use the typed subclasses instead:
 * - {@link MeshHandle} - returned by `ThreeView.addMesh()`
 * - {@link LightHandle} - returned by `ThreeView.addLight()`
 * - {@link EffectHandle} - returned by `ThreeView.addEffect()`
 *
 * @typeParam T - The specific descriptor type
 */
export declare class BaseHandle<T extends BaseDesc = BaseDesc> extends EventHandler<HandleEvent> {
    private desc;
    constructor(desc: T);
    /**
     * Updates the descriptor configuration with partial updates.
     * Only the specified properties will be changed; others remain unchanged.
     * @param updates - Partial configuration object with properties to update
     */
    update(updates: T extends BaseDesc<infer _A, infer B> ? B : BaseDescConfigUpdate): void;
    /**
     * Gets direct access to the underlying descriptor instance.
     * Use this to access descriptor-specific methods and properties not exposed through the handle.
     */
    get ref(): T;
    /**
     * Removes the descriptor from the scene and disposes its resources.
     * After calling this, the handle should no longer be used.
     */
    delete(): void;
    private _deleted;
    /**
     * Gets the unique identifier.
     */
    get id(): string;
    /**
     * Gets whether the descriptor is currently visible in the scene.
     */
    get visible(): boolean;
    /**
     * Sets whether the descriptor should be visible in the scene.
     * @param visible - True to show, false to hide
     */
    set visible(visible: boolean);
}

/**
 * Base interface for the underlying Three.js instance created by a descriptor.
 */
declare type BaseInstance = {
    visible: boolean;
};

/** Scalar attributes, one texel component each. */
export declare const BATCH_SCALAR_KEYS: readonly ["height", "extrudedHeight", "lineWidth", "size", "rotation", "orientation"];

/** vec3 attributes: three components of a row (component 3 stays scalar-poolable). */
export declare const BATCH_VEC3_KEYS: readonly ["color", "emissive"];

/**
 * Material-level values the mesh passes to `updateBatchAttribute`, used to
 * backfill a slot for every feature when that slot is first allocated.
 *
 * Only attributes whose material value lives in a shader uniform need one:
 * `USE_BATCH_*` is a material-wide define, so the moment one feature gets its
 * own value every feature starts reading the slot, and features nobody styled
 * must already hold what the uniform was giving them. Attributes left out fall
 * back to the fixed defaults in `core.ts`.
 */
export declare type BatchAttributeDefaults = {
    /** Radians, clockwise seen from the front. */
    rotation: number;
    flatFacing: boolean;
    rotateWithCamera: boolean;
};

/**
 * Compute the flat float-array index for a given batchId and attribute row
 * in the 2D texture layout.
 *
 * Layout is planar: batch IDs are arranged in a grid of width `texWidth`
 * spanning `batchRowGroups` (= ceil(batchLength / texWidth)) rows, and each
 * attribute row occupies one contiguous block of `batchRowGroups` physical
 * rows. Keeping each attribute row contiguous means adding a row later is a
 * plain append — existing data never has to be re-scattered.
 *
 * Physical row = rowIndex * batchRowGroups + floor(batchId / texWidth)
 * Physical col = batchId % texWidth
 * Flat index   = (physicalRow * texWidth + physicalCol) * 4
 */
export declare function batchBaseIndex(texWidth: number, batchRowGroups: number, batchId: number, rowIndex: number): number;

/** Attributes writable through `updateBatchAttribute`. */
export declare const BATCHED_ATTRIBUTE_NAMES: readonly ["color", "show", "opacity", "height", "extrudedHeight", "lineWidth", "size", "rotation", "flatFacing", "rotateWithCamera", "emissive", "emissiveIntensity"];

export declare type BatchedAttributeName = (typeof BATCHED_ATTRIBUTE_NAMES)[number];

export declare type BatchedFeatureAttributes<Attr extends NormalBufferAttributes = NormalBufferAttributes> = {
    _batchid?: BufferAttribute;
} & Attr;

export declare class BatchedFeatureMesh<Buf extends BufferGeometry<BatchedFeatureAttributes> = BufferGeometry<BatchedFeatureAttributes>, M extends Material = Material, E extends CustomObject3DEventMap = CustomObject3DEventMap> extends Mesh_2<Buf, M, E> implements PickableMesh {
    batchLength?: number;
    static _isBatchedAttributeName(v: string): v is BatchedAttributeName;
    _setBatchIndex(batchIndex: Float32Array | null | undefined, size: number | null | undefined): void;
    /**
     * This mesh type's batch-texture capability (see the receiver rule on
     * {@link BatchTextureSupport} in batchTexture/support.ts).
     */
    _getBatchTextureSupport(): BatchTextureSupport;
    _initBatchedMaterial(): void;
    _initBatchDataTexture(): void;
    /** Returns whether the write landed (see {@link updateBatchAttribute}). */
    _updateBatchAttribute(batchId: number, attribute: BatchedAttributeName, value: number | number[] | boolean): boolean;
    needsUpdate(): void;
    onBeforePicking(_pickingCoord?: Vector2): void;
    onAfterPicking(): void;
    getRenderable(): Object3D;
    clone(): this;
}

/**
 * Every text label in a tile-layer, drawn in a single call.
 *
 * Instances are glyphs, not labels: each label owns a contiguous run of glyph
 * slots ({@link GlyphSlotAllocator}) and one row block in a float texture
 * ({@link LabelDataTexture}) that the vertex shader reads through the
 * `labelIndex` attribute. A label changing its text rewrites only its own run
 * — and not even that when the new glyph count stays inside the run's
 * power-of-two size class.
 *
 * Still extends {@link InstancedMesh} because `FeatureEvaluator` dispatches
 * per-feature styling on `instanceof InstancedMesh`; the inherited child-mesh
 * machinery (`allMeshes`, `markVisibility`) is deliberately unused.
 */
export declare class BatchedSdfTextMesh extends InstancedMesh<Object3D> implements PickableMesh, DeclutterParticipant {
    /**
     * Geometry type of this mesh.
     */
    readonly geometryType: "text";
    readonly ctx: EventContext;
    /** The font identifier from material — may be a family name or a URL. */
    private _fontIdentifier;
    /** Per-batch text quality. All labels in the batch share it because they
     *  sample the same atlas texture; flipping quality requires a new batch. */
    private _highQuality;
    private _fontManager;
    private _needRender?;
    /** Unsubscribe from the font manager's atlas-eviction notifications. */
    private _unsubscribeEvict?;
    /**
     * Face URLs loaded by this mesh for font-family fonts.
     * Each URL in this set has had loadFont() called exactly once by this mesh
     * and must be balanced with unloadFont() on dispose or font change.
     */
    private _loadedFaceUrls;
    private _positions;
    private _material;
    private _transform;
    /** Labels in slot order — `_labels[slot]` is also the declutter handle map. */
    private _labels;
    /** Sparse anchor slot → label; labels are created on first per-feature touch. */
    private _labelByInstance;
    /**
     * Anchors whose evaluator said `show:false` before any label existed. The
     * evaluator applies `show` before `text`, so without parking the intent
     * here a later text setter would create the label visible.
     */
    private _hiddenBeforeLabel;
    /**
     * Feature (batch) index → this feature's anchor slots. A feature owns
     * multiple anchors for MultiPoint geometry and for labels derived from
     * line/polygon vertices via `geometryTypes`, so per-feature styling must fan
     * out to all of them. `null` means anchors and features are 1:1.
     */
    private _batchIndexToInstances;
    /** Per-anchor feature index; `null` means anchors and features are 1:1. */
    private _instanceBatchIndex;
    /** Feature count — the batch data texture's column count. */
    private _batchLength;
    /** In-flight per-feature text preparations; see {@link whenLabelsSettled}. */
    private _pendingTextPrepares;
    private _glyphs;
    private _slots;
    private _labelData;
    /** Layout inputs baked into glyph quads; a change forces a re-layout. */
    private _maxWidth;
    private _lineHeight;
    private _textAlign;
    /** Labels currently parked in `prepareDeferred`, so the per-pass promotion
     *  scan can bail without touching `_labels` when nothing is parked. */
    private _deferredCount;
    /** Layer-level declutter settings, mirrored from the material. */
    private _declutter;
    private _declutterPriority;
    /** Skips the per-frame fade walk entirely once everything has settled. */
    private _declutterAnimating;
    private _enhancer;
    constructor(ctx: EventContext, m: TextMesh, fontIdentifier: string, options: InstancedMeshOptions, loadedFaceUrls?: Set<string>);
    get fontIdentifier(): string;
    get highQuality(): boolean;
    /** Mount the enhancer and install the batch's single per-frame hook. */
    private _setupMaterial;
    private _computeEffectIdsMask;
    /** Re-point the shader at the label texture (it is swapped on grow). */
    private _syncLabelDataUniform;
    /**
     * A material-level text renders without the evaluator ever setting text, so
     * that case needs a label per anchor up front. With per-feature texts (MVT)
     * most features never receive one, so labels are otherwise created lazily on
     * the first per-feature setter — a label slot is just an index plus a few
     * float writes, unlike the mesh-per-label this replaced.
     */
    private _initLabels;
    private _ensureLabel;
    private _writeAnchor;
    _getBatchTextureSupport(): BatchTextureSupport;
    /** Write one per-feature style into the shared batch data texture (bounds
     *  and value validation live in {@link updateBatchAttribute}). */
    private _updateBatchAttribute;
    /** The material's orientation/rotation, backfilled into a new batch slot. */
    private _orientationDefaults;
    private _writeStyle;
    private _writeBox;
    private _writeState;
    private _writeFontSize;
    private _writeAddHeight;
    private _writeShow;
    private _writeDeclutterHide;
    private _layoutOptions;
    /**
     * Shape `text`, lay it out, and write the label's glyph run. Assumes the
     * text is already prepared in the font worker.
     */
    private _applyText;
    /** Return a label's glyph slots and blank them. */
    private _releaseRun;
    /** Replace the retained glyph set, releasing the old references and (if
     *  shown) retaining the new ones. */
    private _setGlyphKeys;
    /**
     * Reconcile atlas references with visibility: retain glyphs while the label
     * is shown, release them when hidden. If shown after the glyphs were evicted
     * (cache no longer prepared), re-prepare to re-rasterize them and rebuild
     * with fresh metrics.
     */
    private _syncGlyphRefs;
    /**
     * Fold `requestedShow` and "has text" into the effective visibility, pushing
     * it to the shader and reconciling atlas retains when it flips.
     */
    private _recomputeShow;
    /**
     * After an atlas eviction, re-lay-out any shown label whose text is now
     * stale (its pinned glyphs may have been evicted before the retain landed
     * and its rect reused). Fresh labels short-circuit on the cheap
     * `isTextPrepared` check, so this is inexpensive to run per eviction.
     */
    private _revalidateStaleLabels;
    private _refreshAtlasTextures;
    /**
     * Build each shown label's collision box. The local box mirrors the vertex
     * shader's layout: glyphs span [0, textWidth] x [bgMinY, bgMaxY] in em
     * units, shifted by the `center` anchor and scaled by the font size.
     */
    collectDeclutterCandidates(out: DeclutterCandidate[]): void;
    applyDeclutter(handle: number, hidden: boolean): void;
    stepDeclutterFade(deltaMs: number): boolean;
    /** Candidates changed (text, style, position, visibility): ask the shared
     *  declutter pass to re-place on its next update. */
    private _markDeclutterDirty;
    setActive(active: boolean): void;
    /**
     * Resolves once every per-feature text preparation currently in flight has
     * landed (glyph runs written), bounded by `timeoutMs`.
     *
     * The tile-LOD swap on the Rust side hides a parent tile the moment its
     * children report rendered, so the caller must not report this batch
     * rendered while labels are still shaping — the swap would show a batch
     * that draws nothing (a tile-shaped blank).
     *
     * Only preparations already started are awaited. With declutter enabled,
     * `setTextByBatchIndex` parks unprepared text until a placement pass
     * confirms the anchor is on screen, so those labels are not yet in flight
     * and this resolves immediately — cached text (the common case for a child
     * tile repeating its parent's strings) applies synchronously and needs no
     * wait either. The gate therefore only bites on the non-decluttered path;
     * decluttered swaps rely on the placement handoff in {@link setActive}.
     */
    whenLabelsSettled(timeoutMs: number): Promise<void>;
    onBeforePicking(): void;
    onAfterPicking(): void;
    getRenderable(): Object3D;
    private extractPositions;
    /** See {@link buildBatchIndexMap} (anchor slots play the instance role). */
    private _rebuildBatchIndexMap;
    /** All anchor slots owned by the feature at `batchIndex`. */
    private _instancesOfBatchIndex;
    _update(m: TextMesh, needRender?: () => void): Promise<void>;
    private _applyUpdate;
    setTextByBatchIndex(batchIndex: number, text: string): void;
    private _setTextByInstance;
    /** Kick off async font preparation for `text`, then lay it out — unless a
     *  newer text supersedes it while the fonts load. */
    private _prepareAndApply;
    private _clearDeferred;
    /**
     * Promote parked labels whose anchor became potentially visible: start
     * their font preparation and apply the text when it lands. Runs at the
     * start of every placement pass (see {@link DeclutterParticipant}) — the
     * cadence at which visibility can actually change.
     */
    prepareDeferredLabels(camera: PerspectiveCamera): void;
    setFeatureColorByBatchIndex(batchIndex: number, color: Color_3): void;
    setFeatureShowByBatchIndex(batchIndex: number, rawVisible: boolean): void;
    setFeatureHeightByBatchIndex(batchIndex: number, height: number): void;
    /**
     * Orientation and in-plane rotation for one feature, overriding the
     * material's. `rotation` is in degrees, clockwise seen from the front; it is
     * converted to the radians the shader wants here, matching the material path.
     */
    setFeatureFacingByBatchIndex(batchIndex: number, facing: "upright" | "flat"): void;
    setFeatureRotateWithCameraByBatchIndex(batchIndex: number, follow: boolean): void;
    setFeatureRotationByBatchIndex(batchIndex: number, degrees: number): void;
    setFeatureSizeByBatchIndex(batchIndex: number, size: number): void;
    setFeatureOpacityByBatchIndex(batchIndex: number, opacity: number): void;
    /** Per-feature emissive (fill only; drives selective bloom). Style-only:
     *  no label has to exist — the write lands in the batch data texture. */
    setFeatureEmissiveByBatchIndex(batchIndex: number, emissive: Color_3): void;
    setFeatureEmissiveIntensityByBatchIndex(batchIndex: number, intensity: number): void;
    setFeatureDeclutterPriorityByBatchIndex(batchIndex: number, priority: number): void;
    /**
     * Labels are no longer three.js objects, so there is no child mesh to hand
     * back. Overridden to stop the base class returning an unrelated object from
     * its (unused) `allMeshes` array.
     */
    getMeshByBatchIndex(): undefined;
    dispose(): void;
}

declare class BatchPropResult {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    /**
     * The picked feature's canonical global batch id (its first instance's
     * id). A picked instance of a multi-instance feature (e.g. MultiPoint)
     * carries its own id, while styling APIs report the canonical one, so
     * consumers correlate picks through this field.
     */
    get batchId(): number | undefined;
    /**
     * The picked feature's canonical global batch id (its first instance's
     * id). A picked instance of a multi-instance feature (e.g. MultiPoint)
     * carries its own id, while styling APIs report the canonical one, so
     * consumers correlate picks through this field.
     */
    set batchId(value: number | null | undefined);
    get layerId(): string | undefined;
    set layerId(value: string | null | undefined);
    properties: any;
}

export declare type BatchScalarKey = (typeof BATCH_SCALAR_KEYS)[number];

/**
 * Scalar slot keys: the public scalar attributes plus internal components —
 * packed show/opacity (written through `show`/`opacity`) and the emissive
 * intensity paired with the emissive vec3 row.
 */
declare type BatchScalarSlotKey = BatchScalarKey | "showOpacity" | "emissiveIntensity";

/** Position of an attribute in the batch data texture: attribute row + texel component. */
export declare type BatchSlot = {
    row: number;
    comp: number;
};

export declare type BatchTextureConfig = {
    /**
     * Scalar properties this mesh type supports, in allocation order.
     * Must only contain attributes the mesh's shaders declare receiver variables
     * for: `updateBatchAttribute` turns the `USE_BATCH_*` define on whenever the
     * slot exists, and the shared `batch_texture_vertex` chunk then assigns to
     * the receiver — an undeclared one breaks shader compilation.
     */
    scalars: BatchScalarKey[];
    /**
     * vec3 attributes this mesh type supports, defaulting to `["color"]`.
     * Same receiver rule as `scalars`.
     */
    vec3s?: BatchVec3Key[];
    batchLength: number;
};

/**
 * Mutable row/component assignment for a batch data texture.
 *
 * Allocation is append-only: once assigned, a slot never moves, so defines
 * stamped from it stay valid and growing the texture is a plain append of new
 * attribute rows (see {@link batchBaseIndex}). vec3 attributes take
 * components 0-2 of a fresh row and hand component 3 to the scalar pool;
 * scalars fill free components (oldest first) before opening a new row, so no
 * component is wasted regardless of allocation order.
 */
export declare class BatchTextureLayout {
    /** Number of allocated attribute rows. */
    rows: number;
    private vec3Rows;
    private scalarSlots;
    private freeComps;
    getVec3Row(key: BatchVec3Key): number | undefined;
    get vec3s(): ReadonlyMap<BatchVec3Key, number>;
    allocateVec3(key: BatchVec3Key): number;
    getScalarSlot(key: BatchScalarSlotKey): BatchSlot | undefined;
    get scalars(): ReadonlyMap<BatchScalarSlotKey, BatchSlot>;
    allocateScalar(key: BatchScalarSlotKey): BatchSlot;
}

/**
 * Batch-texture capability of one mesh type: the attributes its shaders can
 * receive. These are capability lists, not preallocations — slots are still
 * allocated lazily on first write.
 *
 * A list must only contain attributes with declared receiver variables in
 * that mesh type's shaders: `updateBatchAttribute` turns the `USE_BATCH_*`
 * define on whenever the slot exists, and the shared `batch_texture_vertex`
 * chunk then assigns to the receiver — an undeclared one (e.g.
 * `addExtrudedHeight` in the polyline shaders) breaks shader compilation.
 * Writes outside the list are silently ignored.
 */
export declare type BatchTextureSupport = Pick<BatchTextureConfig, "scalars" | "vec3s">;

/** Shared sampler ref: texture growth swaps `.value`, every holder sees the new texture. */
export declare type BatchTextureUniform = {
    value: DataTexture | null;
};

export declare type BatchVec3Key = (typeof BATCH_VEC3_KEYS)[number];

declare class BillboardMaterial {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    get alphaTest(): number | undefined;
    set alphaTest(value: number | null | undefined);
    /**
     * Whether faces seen from behind are culled. Default is false, so a
     * quad frozen in its anchor's frame (`rotateWithCamera: false`) stays
     * visible from behind. Turn it on to hide a flat quad's parts that wrap
     * over the horizon, which face away from the camera.
     */
    get backfaceCulling(): boolean | undefined;
    /**
     * Whether faces seen from behind are culled. Default is false, so a
     * quad frozen in its anchor's frame (`rotateWithCamera: false`) stays
     * visible from behind. Turn it on to hide a flat quad's parts that wrap
     * over the horizon, which face away from the camera.
     */
    set backfaceCulling(value: boolean | null | undefined);
    /**
     * Whether the sprite stands up (`"upright"`, the default) or lies on the
     * globe surface around its anchor (`"flat"`). Pair with
     * `rotateWithCamera`.
     */
    get billboardFacing(): string | undefined;
    /**
     * Whether the sprite stands up (`"upright"`, the default) or lies on the
     * globe surface around its anchor (`"flat"`). Pair with
     * `rotateWithCamera`.
     */
    set billboardFacing(value: string | null | undefined);
    /**
     * anchor point of the sprite, range is (-0.5, -0.5) to (0.5, 0.5).
     * Default is (0.0, 0.0) which means the center of the sprite.
     */
    get center(): Vec2_2 | undefined;
    /**
     * anchor point of the sprite, range is (-0.5, -0.5) to (0.5, 0.5).
     * Default is (0.0, 0.0) which means the center of the sprite.
     */
    set center(value: Vec2_2 | null | undefined);
    get clampToGround(): boolean | undefined;
    set clampToGround(value: boolean | null | undefined);
    get color(): number | undefined;
    set color(value: number | null | undefined);
    /**
     * Placement priority for decluttering; higher wins. Only meaningful when
     * `declutter` is enabled. Defaults to `0.0`.
     */
    get declutterPriority(): number | undefined;
    /**
     * Placement priority for decluttering; higher wins. Only meaningful when
     * `declutter` is enabled. Defaults to `0.0`.
     */
    set declutterPriority(value: number | null | undefined);
    /**
     * Participate in screen-space decluttering: when labels/sprites overlap
     * on screen, lower-priority ones are hidden. Defaults to `true`; set to
     * `false` to draw every label unconditionally.
     */
    get declutter(): boolean | undefined;
    /**
     * Participate in screen-space decluttering: when labels/sprites overlap
     * on screen, lower-priority ones are hidden. Defaults to `true`; set to
     * `false` to draw every label unconditionally.
     */
    set declutter(value: boolean | null | undefined);
    get depthTest(): boolean | undefined;
    set depthTest(value: boolean | null | undefined);
    /**
     * IDs of selective effects to apply (e.g., "bloom", "outline")
     */
    get effectIds(): string[] | undefined;
    /**
     * IDs of selective effects to apply (e.g., "bloom", "outline")
     */
    set effectIds(value: string[] | null | undefined);
    /**
     * Emissive glow color in 0xRRGGBB format
     */
    get emissiveColor(): number | undefined;
    /**
     * Emissive glow color in 0xRRGGBB format
     */
    set emissiveColor(value: number | null | undefined);
    /**
     * Emissive glow intensity (omitted = 0, no emissive output)
     */
    get emissiveIntensity(): number | undefined;
    /**
     * Emissive glow intensity (omitted = 0, no emissive output)
     */
    set emissiveIntensity(value: number | null | undefined);
    /**
     * Source geometry types this appearance consumes: `"point"`, `"line"`,
     * `"polygon"`. Defaults to `["point"]`; adding `"line"`/`"polygon"` also
     * emits a billboard per line-string / polygon-ring vertex.
     */
    get geometryTypes(): string[] | undefined;
    /**
     * Source geometry types this appearance consumes: `"point"`, `"line"`,
     * `"polygon"`. Defaults to `["point"]`; adding `"line"`/`"polygon"` also
     * emits a billboard per line-string / polygon-ring vertex.
     */
    set geometryTypes(value: string[] | null | undefined);
    get height(): number | undefined;
    set height(value: number | null | undefined);
    /**
     * Avoid overlapping with the globe surface.
     */
    get offsetDepth(): boolean | undefined;
    /**
     * Avoid overlapping with the globe surface.
     */
    set offsetDepth(value: boolean | null | undefined);
    get opacity(): number | undefined;
    set opacity(value: number | null | undefined);
    /**
     * Whether the sprite turns to follow the camera. `true` (the default)
     * keeps it facing the viewer. `false` freezes it in the anchor's local
     * east-north-up frame, so moving the camera never reorients it.
     */
    get rotateWithCamera(): boolean | undefined;
    /**
     * Whether the sprite turns to follow the camera. `true` (the default)
     * keeps it facing the viewer. `false` freezes it in the anchor's local
     * east-north-up frame, so moving the camera never reorients it.
     */
    set rotateWithCamera(value: boolean | null | undefined);
    /**
     * Rotation of the sprite within its own plane, about its anchor point,
     * in degrees, clockwise seen from the front. `center` decides where
     * inside the sprite the pivot sits. Defaults to `0.0`.
     */
    get rotation(): number | undefined;
    /**
     * Rotation of the sprite within its own plane, about its anchor point,
     * in degrees, clockwise seen from the front. `center` decides where
     * inside the sprite the pivot sits. Defaults to `0.0`.
     */
    set rotation(value: number | null | undefined);
    get show(): boolean | undefined;
    set show(value: boolean | null | undefined);
    /**
     * Whether the size is specified in meters. If false, the size is in pixels. Default is true.
     */
    get sizeInMeters(): boolean | undefined;
    /**
     * Whether the size is specified in meters. If false, the size is in pixels. Default is true.
     */
    set sizeInMeters(value: boolean | null | undefined);
    /**
     * size in pixels/meters (units are determined by `sizeInMeters`).
     */
    get size(): number | undefined;
    /**
     * size in pixels/meters (units are determined by `sizeInMeters`).
     */
    set size(value: number | null | undefined);
    get transparent(): boolean | undefined;
    set transparent(value: boolean | null | undefined);
    get url(): string | undefined;
    set url(value: string | null | undefined);
}

declare class BillboardMesh {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    active: boolean;
    batch_length: number;
    geometry: TransferablePointGeometry;
    material: BillboardMaterial;
    transform: Transform_2;
}

export declare function blendFunction(mode: BlendMode): BlendFunction;

export declare type BlendMode = "skip" | "set" | "add" | "alpha" | "average" | "color" | "colorBurn" | "colorDodge" | "darken" | "difference" | "divide" | "dst" | "exclusion" | "hardLight" | "hardMix" | "hue" | "invert" | "invertRgb" | "lighten" | "linearBurn" | "linearDodge" | "linearLight" | "luminosity" | "multiply" | "negation" | "normal" | "overlay" | "pinLight" | "reflect" | "saturation" | "screen" | "softLight" | "src" | "subtract" | "vividLight";

declare class BoundingSphere {
    free(): void;
    [Symbol.dispose](): void;
    constructor(center_x: number, center_y: number, center_z: number, radius: number);
    center_x: number;
    center_y: number;
    center_z: number;
    radius: number;
}

/**
 * Split a shaped glyph run into lines: hard breaks at newline markers, greedy
 * soft breaks at the last whitespace/ideographic glyph when a line would
 * exceed `maxWidthFu` (font units; 0 disables wrapping). A word longer than
 * the wrap width overflows rather than breaking mid-word.
 *
 * When `rtl` is set, glyphs are assumed to arrive in visual order (leftmost
 * first — how the shaper emits RTL runs), i.e. reversed logical order. Each
 * hard-break segment is wrapped in logical order so the greedy fill starts at
 * the sentence start and lines stack top-to-bottom in reading order, then
 * every line is flipped back to visual order for rendering. Mixed-direction
 * lines may still break sub-optimally — same trade other map renderers make.
 */
export declare function breakLines(glyphs: ShapedGlyph[], maxWidthFu: number, rtl?: boolean): ShapedGlyph[][];

declare type BufferLoader = {
    u8: (handle: number) => Uint8Array | null;
    f32: (handle: number) => Float32Array | null;
    f64: (handle: number) => Float64Array | null;
    u32: (handle: number) => Uint32Array | null;
    removeU8: (handle: number) => Uint8Array | null;
    removeF32: (handle: number) => Float32Array | null;
    removeF64: (handle: number) => Float64Array | null;
    removeU32: (handle: number) => Uint32Array | null;
    setU8: (handle: number, bits: bigint, bytes: Uint8Array) => void;
    newU8: (bytes: Uint8Array) => number | undefined;
    newU32: (bytes: Uint32Array) => number | undefined;
    newF32: (bytes: Float32Array) => number | undefined;
    newF64: (bytes: Float64Array) => number | undefined;
    adoptU8: (array: Uint8Array) => number | undefined;
    adoptU32: (array: Uint32Array) => number | undefined;
    adoptF32: (array: Float32Array) => number | undefined;
    adoptF64: (array: Float64Array) => number | undefined;
    /** DataRequester mirror of `adoptU8`: registers an `External` entry under an
     * existing handle and fires the loaded event. Guards on `hasDataRequester`.
     * An `External` entry carries no element type, so this is not typed. */
    setExternal: (handle: number, bits: bigint, array: Uint8Array) => void;
    remove: (handle: number) => void;
    /** Evict handles Rust removed from the WASM `BufferStore` out of the JS-side
     * `InMemoryBufferStore`; called once per frame. */
    drainRemovedExternalHandles: () => void;
    triggerDataRequesterLoaded: (bits: bigint, handle: number) => void;
    triggerDataRequesterFailed: (bits: bigint) => void;
};

export declare class BufferView {
    canvas: HTMLCanvasElement;
    canvasForImage: HTMLCanvasElement;
    constructor(width: number, height: number, { styleWidth, styleHeight, }?: {
        styleWidth?: string;
        styleHeight?: string;
    });
    render(renderer: WebGLRenderer, renderTarget: WebGLRenderTarget): void;
    /**
     * Render from raw pixel data (Uint8Array RGBA).
     * Use this for HalfFloat MRT attachments where readRenderTargetPixels doesn't work.
     */
    renderFromPixels(pixels: Uint8Array, width: number, height: number): void;
    private drawPixels;
    dispose(): void;
}

/**
 * Turn a shaping result into positioned glyph quads.
 *
 * Lines lay out top-down: line 0 keeps its baseline at y=0, later baselines
 * step down by the line height, and alignment shifts each line within the
 * widest line's width. Each glyph carries its own normalization scale so SDF
 * and colour glyphs share one em-space coordinate system downstream — the two
 * paths rasterize at different sizes (`SDF_PX_SIZE` vs `COLOR_GLYPH_PX_SIZE`)
 * but both end up in ems after dividing by their respective pixel size.
 */
export declare function buildLabelLayout(shapeResult: ShapeTextResult, options: LayoutOptions): LabelLayout;

/**
 * Builds the geometry of one standalone polygon.
 *
 * @param rings - Outer ring first, then holes.
 * @param geocentric - Read the positions as ECEF metres.
 * @param material - A `polygon` layer material. Outline options are ignored.
 * @throws When `material` does not deserialize.
 * @returns `undefined` when the outer ring has fewer than three vertices or is
 *   collinear.
 */
export declare function buildPolygonGeometry(rings: readonly GeometryRing[], geocentric: boolean, material: PolygonGeometryMaterial): PolygonGeometryData | undefined;

/**
 * Builds the geometry of one standalone polyline.
 *
 * @param positions - Flat `[lng, lat, height, ...]`, or ECEF when `geocentric`.
 * @param geocentric - Read the positions as ECEF metres.
 * @param ring - Join a repeated first vertex as a seam instead of two caps.
 * @param material - A `polyline` layer material.
 * @throws When `material` does not deserialize.
 * @returns `undefined` when fewer than two distinct positions remain.
 */
export declare function buildPolylineGeometry(positions: Float64Array, geocentric: boolean, ring: boolean, material: PolylineGeometryMaterial): PolylineGeometryData | undefined;

export declare type BuiltInEffectDescription = FinalCopyPassConfig | MRTPassConfig | SkyEnvMapPassConfig | TransparentPassConfig;

declare class CachedMeshHandle {
    free(): void;
    [Symbol.dispose](): void;
    constructor(vertices: number, indices: number, uvs: number, heights?: number | null);
    get heights(): number | undefined;
    set heights(value: number | null | undefined);
    indices: number;
    get normals(): number | undefined;
    set normals(value: number | null | undefined);
    uvs: number;
    vertices: number;
    get watermask(): number | undefined;
    set watermask(value: number | null | undefined);
}

/** A handle's cache entry. Public surface is via TileTextureCache methods. */
declare type CacheEntry = {
    readonly handle: TileHandle;
    readonly atlas: CompositeAtlas;
    refCount: number;
    dirty: Set<DirtyReason>;
};

/**
 * Calculates the camera position relative to an object with high/low precision encoding for RTE rendering.
 * @param cameraPosition - The camera's world position
 * @param modelMatrixWorld - The object's world transformation matrix
 * @returns Object with high and low precision Vector3 components for GPU double precision emulation
 */
export declare const calcCameraPosition: (cameraPosition: Vector3, modelMatrixWorld: Matrix4) => {
    high: Vector3;
    low: Vector3;
};

/**
 * Calculates the model-view matrix for Relative-To-Eye (RTE) rendering, which improves precision for distant objects.
 * @param objectMatrixWorld - The object's world transformation matrix
 * @param matrixWorldInverse - The camera's inverse world matrix
 * @param result - Optional matrix to store the result (creates new if omitted)
 * @returns Model-view matrix with translation zeroed for RTE rendering
 */
export declare const calcModelMatrixRTE: (objectMatrixWorld: Matrix4, matrixWorldInverse: Matrix4, result?: Matrix4) => Matrix4;

/**
 * An event for updating camera controller settings at runtime.
 *
 * This event allows partial updates to the [`CameraController`](navara_camera::CameraController)
 * component. Only fields set to `Some` will be applied; `None` fields are ignored.
 */
declare class CameraControlUpdateEvent {
    free(): void;
    [Symbol.dispose](): void;
    constructor();
    /**
     * Whether to automatically adjust near/far clipping planes based on camera distance
     * from the Earth surface. When enabled, the camera uses three zones:
     * - Near ground: near = 1.0, far = 1e6
     * - Mid altitude: near = 100.0, far = 1e8
     * - Far/Space: near = 1000.0, far = 1e9
     *
     * Default: `true`
     */
    get autoAdjustNearFar(): boolean | undefined;
    /**
     * Whether to automatically adjust near/far clipping planes based on camera distance
     * from the Earth surface. When enabled, the camera uses three zones:
     * - Near ground: near = 1.0, far = 1e6
     * - Mid altitude: near = 100.0, far = 1e8
     * - Far/Space: near = 1000.0, far = 1e9
     *
     * Default: `true`
     */
    set autoAdjustNearFar(value: boolean | null | undefined);
    /**
     * Whether mouse drag and touch swipe rotation (spin) are enabled.
     *
     * Default: `true`
     */
    get enableSpin(): boolean | undefined;
    /**
     * Whether mouse drag and touch swipe rotation (spin) are enabled.
     *
     * Default: `true`
     */
    set enableSpin(value: boolean | null | undefined);
    /**
     * Whether tilt interactions (Ctrl+left drag, right-click drag, double-swipe, or rotate gestures) are enabled.
     *
     * Default: `true`
     */
    get enableTilt(): boolean | undefined;
    /**
     * Whether tilt interactions (Ctrl+left drag, right-click drag, double-swipe, or rotate gestures) are enabled.
     *
     * Default: `true`
     */
    set enableTilt(value: boolean | null | undefined);
    /**
     * Whether scroll wheel and pinch/spread touch zoom are enabled.
     *
     * Default: `true`
     */
    get enableZoom(): boolean | undefined;
    /**
     * Whether scroll wheel and pinch/spread touch zoom are enabled.
     *
     * Default: `true`
     */
    set enableZoom(value: boolean | null | undefined);
    /**
     * The maximum distance (in meters) the camera can zoom out from the Earth surface.
     *
     * Default: `WGS84_B_64 * 10.0` (~63,567,523 meters)
     */
    get maximumZoomDistance(): number | undefined;
    /**
     * The maximum distance (in meters) the camera can zoom out from the Earth surface.
     *
     * Default: `WGS84_B_64 * 10.0` (~63,567,523 meters)
     */
    set maximumZoomDistance(value: number | null | undefined);
    /**
     * The minimum distance (in meters) the camera can zoom in to the Earth surface.
     *
     * Default: `WGS84_B_64` (Earth's semi-minor axis, ~6,356,752 meters)
     */
    get minimumZoomDistance(): number | undefined;
    /**
     * The minimum distance (in meters) the camera can zoom in to the Earth surface.
     *
     * Default: `WGS84_B_64` (Earth's semi-minor axis, ~6,356,752 meters)
     */
    set minimumZoomDistance(value: number | null | undefined);
    /**
     * Duration (in milliseconds) for spin inertia animation after releasing mouse drag.
     *
     * Default: `500.0`
     */
    get spinDuration(): number | undefined;
    /**
     * Duration (in milliseconds) for spin inertia animation after releasing mouse drag.
     *
     * Default: `500.0`
     */
    set spinDuration(value: number | null | undefined);
    /**
     * Multiplier for mouse drag rotation speed.
     *
     * Default: `2.0`
     */
    get spinSpeed(): number | undefined;
    /**
     * Multiplier for mouse drag rotation speed.
     *
     * Default: `2.0`
     */
    set spinSpeed(value: number | null | undefined);
    /**
     * Duration (in milliseconds) for translation inertia animation.
     *
     * Default: `500.0`
     */
    get translateDuration(): number | undefined;
    /**
     * Duration (in milliseconds) for translation inertia animation.
     *
     * Default: `500.0`
     */
    set translateDuration(value: number | null | undefined);
    /**
     * Duration (in milliseconds) for zoom inertia animation after scroll wheel input.
     *
     * Default: `100.0`
     */
    get zoomDuration(): number | undefined;
    /**
     * Duration (in milliseconds) for zoom inertia animation after scroll wheel input.
     *
     * Default: `100.0`
     */
    set zoomDuration(value: number | null | undefined);
    /**
     * Multiplier for scroll wheel zoom speed.
     *
     * Default: `0.6`
     */
    get zoomSpeed(): number | undefined;
    /**
     * Multiplier for scroll wheel zoom speed.
     *
     * Default: `0.6`
     */
    set zoomSpeed(value: number | null | undefined);
}

export declare enum CameraDirection {
    Forward = 0,
    Backward = 1,
    Left = 2,
    Right = 3,
    Up = 4,
    Down = 5,
}

export declare type CameraEvent = {
    movestart: () => void;
    move: () => void;
    moveend: () => void;
    frustumChanged: () => void;
};

/**
 * Terminal record of a `flyTo` flight, delivered once through the event
 * stream. `completed` is `false` when the flight was superseded or canceled.
 */
declare class CameraFlightEndedEvent {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    completed: boolean;
    id: number;
}

export declare type CameraFrustum = Required<NormalizeWASMClass<CameraFrustum_3>>;

declare class CameraFrustum_2 {
    free(): void;
    [Symbol.dispose](): void;
    constructor(near: number, far: number, fov: number, aspect_ratio: number);
    aspect_ratio: number;
    far: number;
    /**
     * Vertical field of view in radians.
     */
    fov: number;
    near: number;
}

declare class CameraFrustum_3 {
    free(): void;
    [Symbol.dispose](): void;
    constructor(near: number, far: number, fov: number, aspect_ratio: number);
    aspect_ratio: number;
    far: number;
    /**
     * Vertical field of view in radians.
     */
    fov: number;
    near: number;
}

export declare type CameraOptions = NormalizeWASMClass<CameraControlUpdateEvent>;

export declare type CameraOrientation = Partial<NormalizeWASMClass<CameraOrientation_2>>;

declare class CameraOrientation_2 {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    heading: number;
    pitch: number;
    roll: number;
}

export declare type CameraPosition = Partial<LatLngHeight> & CameraOrientation & {
    /** Distance from the target point (lng/lat/height) along the camera forward direction (meters).
     *  When specified, the camera is placed so its forward ray reaches the target point from this distance.
     *  If `height` is omitted, the target elevation defaults to 0 (sea level). */
    distance?: number;
};

declare class CameraStatus {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    status: any[];
}

export { CascadedShadowMaps }

/**
 * Travel tolerance in CSS pixels between pointerdown and pointerup to count as a click.
 * Follows Cesium's `_clickPixelTolerance` (MapLibre uses 3px).
 * ref: https://github.com/CesiumGS/cesium/blob/9fda7ab97a762e40c74b1d0e1814c98a2de43337/packages/engine/Source/Core/ScreenSpaceEventHandler.js#L1012
 * ref: https://github.com/maplibre/maplibre-gl-js/blob/3a0a4f795fef5b2a29034d71833475589c344eaf/src/ui/map.ts#L542
 */
export declare const CLICK_PIXEL_TOLERANCE = 5;

export declare const CLOUD_LOCAL_WEATHER_URL: string;

export declare const CLOUD_SHAPE_DETAIL_URL: string;

export declare const CLOUD_SHAPE_URL: string;

export declare const CLOUD_TURBULENCE_URL: string;

/**
 * Class representing a color.
 * This class assumes that the specified color represents the sRGB color space.
 *
 * ```
 * const red = new Color().setRGB(1.0, 0.0, 0.0);
 * const green = new Color().setHex(0x00ff00);
 * const blue = new Color().setStyle("#0000ff");
 * ```
 */
export declare class Color implements Color_2 {
    #private;
    /**
     * Sets the color using RGB values in sRGB color space.
     * @param r - Red component (0.0 to 1.0)
     * @param g - Green component (0.0 to 1.0)
     * @param b - Blue component (0.0 to 1.0)
     * @returns This color instance for chaining
     */
    setRGB(r: number, g: number, b: number): this;
    /**
     * Sets the color using RGB values in linear color space (no gamma correction).
     * @param r - Red component (0.0 to 1.0)
     * @param g - Green component (0.0 to 1.0)
     * @param b - Blue component (0.0 to 1.0)
     * @returns This color instance for chaining
     */
    setRGBLinear(r: number, g: number, b: number): this;
    /**
     * Sets the color from a hexadecimal value in sRGB color space.
     * @param hex - Hexadecimal color value (e.g., 0xff0000 for red)
     * @returns This color instance for chaining
     */
    setHex(hex: number): this;
    /**
     * Sets the color from a CSS style string in sRGB color space.
     * @param style - CSS color string (e.g., "#ff0000", "rgb(255, 0, 0)", "red")
     * @returns This color instance for chaining
     */
    setStyle(style: string): this;
    /**
     * Copies this color's values to another Color instance.
     * @param color - Target color to copy values into
     * @returns The target color with copied values
     */
    copy(color: Color): this;
    /**
     * Creates a new Color instance with the same values.
     * @returns A new Color instance
     */
    clone(): this;
    /**
     * Returns the color as an RGB array.
     * @returns Tuple of [red, green, blue] values (0.0 to 1.0)
     */
    toArray(): [r: number, g: number, b: number];
    /**
     * Converts the color from linear to sRGB color space.
     * @returns A new Color instance in sRGB color space
     */
    srgb(): this;
    /**
     * Returns the color as a hexadecimal number.
     * @returns Hexadecimal color value (e.g., 0xff0000 for red)
     */
    toHex(): number;
    /**
     * Gets the underlying Three.js Color instance.
     */
    get raw(): Color_3;
}

declare abstract class Color_2 {
    abstract setRGB(r: number, g: number, b: number): this;
    abstract setHex(hex: number): this;
    abstract setStyle(style: string): this;
    abstract copy(color: this): this;
    abstract clone(): this;
    abstract srgb(): this;
    abstract toArray(): [r: number, g: number, b: number];
    abstract toHex(): number;
}

export declare class ColorMap<T extends ColorMapType = ColorMapType> {
    #private;
    readonly type: T;
    readonly name: string;
    lut: ColorTuple[];
    constructor(type: T, name: string, lut: LUT);
    linear(value: number): ColorTuple;
    buildLinear(): void;
    get count(): number;
    ticks(range: [min: number, max: number], count: number): number[];
    quantize(count: number): ColorTuple[];
    createImage(): HTMLCanvasElement;
    /**
     * Flatten the color map LUT into a Float32Array for WASM/GPU usage.
     * Each color tuple [r, g, b] is flattened into consecutive array elements.
     * @returns A Float32Array with length = lut.length * 3
     */
    flatten(): Float32Array;
}

declare type ColorMapType = "sequential" | "diverging";

export declare type ColorTuple = [number, number, number];

declare type CommonUniforms = {
    viewportAndPixelRatio: RefThree<[x: number, y: number, z: number]>;
    frustumRatio: RefThree<[x: number, y: number, z: number, w: number]>;
    frustumNearFar: RefThree<[x: number, y: number]>;
    tGlobeDepth: RefThree<Texture>;
    tGlobeNormal: RefThree<Texture>;
    tSkyEnvMap: RefThree<Texture>;
    inverseProjectionMatrix: RefThree<Matrix4>;
    fov: RefThree<number>;
    screenHeightPx: RefThree<number>;
    time: RefThree<number>;
    colorMapTexture: RefThree<Texture>;
    waterTexture: RefThree<Texture>;
};

/**
 * Composes a frame matrix with a local transform, then splits the result into
 * a translation Vector3 and a rotation/scale-only Matrix4 for RTE rendering.
 *
 * The translation is intended to be encoded as high/low RTE uniforms for GPU
 * precision, while the rotation/scale matrix is assigned to the mesh's
 * matrixWorld so it becomes the shader's modelMatrix uniform.
 *
 * @param frameMatrix - The frame transformation matrix (e.g. NUE-to-ECEF)
 * @param localMatrix - The local T*R*S transform to compose within the frame
 * @param resultPosition - Vector3 to store the extracted translation (reused to avoid GC)
 * @param resultRotationScale - Matrix4 to store the translation-zeroed matrix (reused to avoid GC)
 */
export declare function composeWorldMatrixForRTE(frameMatrix: Matrix4, localMatrix: Matrix4, resultPosition?: Vector3, resultRotationScale?: Matrix4): {
    position: Vector3;
    rotationScale: Matrix4;
};

/**
 * A composite atlas is a single MRT render target (count=3) with three named
 * attachments:
 * - color: composited diffuse (sRGB)
 * - attr:  packed per-pixel material attributes (water flag/scale/speed, …)
 * - normal: hillshade normal map in [0,1] (neutral 0.5,0.5,1 when no hillshade)
 *
 * One draw call writes all three; the main TileMesh shader samples them
 * independently as Textures.
 */
declare type CompositeAtlas = {
    readonly target: WebGLRenderTarget;
    readonly color: Texture;
    readonly attr: Texture;
    readonly normal: Texture;
    dispose: () => void;
};

/** Features detected from the Rust material — drives CPU shader branch elision. */
declare type CompositeFeatures = {
    hasHillshade: boolean;
    hasWater: boolean;
    hasElevationHeatmap: boolean;
    /**
     * Quantized-mesh watermask is present. Sampled once after the slot loop
     * and OR'd into `isWater` so it takes priority even when no per-slot
     * `uWaters[k]` is set. Independent of `hasWater` (per-slot flag path).
     */
    hasWatermask: boolean;
};

/**
 * Tile-wide inputs that are not per-slot. Kept separate from CompositeLayer so
 * adding a new per-layer expression doesn't bloat a shared struct (and vice
 * versa). Consumed by the layer enhancers that own slot-independent uniforms.
 */
declare type CompositeGlobals = {
    /** Hillshade normal exaggeration (shared across hillshade layers). */
    hillshadeExaggeration: number;
    /** Quantized-mesh watermask (1×1 uniform or 256×256), or null. */
    watermask: Texture | null;
    /** Elevation heatmap colormap ramp, or null. */
    colorMapTexture: Texture | null;
    /** Elevation heatmap shared decoder params. */
    elevationRGBScaler: Vector3;
    elevationMinMaxHeightAndBoundary: Vector3;
    elevationMinMaxOffsetAndEpsilonAndOffset: Vector4;
    logarithmic: boolean;
    logBase: number;
    logBoundary: number;
};

declare type CompositeLayer = RasterCompositeLayer | HillshadeCompositeLayer | ElevationHeatmapCompositeLayer;

declare type CompositeLayerBase = {
    /**
     * Absolute slot index into the TileMesh main shader's per-slot uniform
     * arrays. Baked into the atlas as the winning slot so the main shader can
     * look the layer's precision-sensitive attrs back up.
     */
    absSlot: number;
    region: CompositeLayerRegion;
    texture: Texture | null;
    uvOffset: Vector2;
    uvScale: Vector2;
};

/** Which compact-slot region a layer lives in (raster low indices vs vector). */
declare type CompositeLayerRegion = "raster" | "vector";

/**
 * View on the atlas suitable for binding as TileMesh uniforms.
 * Same Textures live across the atlas's lifetime; only `needsUpdate` flips.
 */
declare type CompositeOutputs = {
    color: Texture;
    attr: Texture;
    normal: Texture;
};

/** Defines enabling the optional outputs and carrying their locations. */
export declare function computeGBufferDefines(buffers: ResolvedGBufferOptions): Readonly<Record<string, number>>;

/** Computes the attachment indices for resolved `buffers` options. */
export declare function computeGBufferTextureIndex(buffers: ResolvedGBufferOptions): GBufferTextureIndex;

declare type ConcurrencyManager = {
    /** Total concurrency */
    total: number;
    /** Increment the count according to the activated process */
    increment: () => void;
    /** Decrement the count according to the deactivated process */
    decrement: () => void;
    /** Reset the count */
    reset: () => void;
    /** The number of activated processes */
    actives: () => number;
    /** The number of idle processes */
    idles: () => number;
    /** Whether it can activate the process */
    canIncrement: () => boolean;
    /** Whether there is an activated process */
    canDecrement: () => boolean;
};

/**
 * Raised when a config or update names more than one of `geodetic` / `matrix` /
 * `matrixWorld`. They share a single placement slot, so the message is
 * deliberately symmetric — neither argument order implies a winner.
 */
export declare class ConflictingTransformError extends Error {
    constructor(field: string, conflictsWith: string);
}

declare class ConstructPolygonBatchedFeatureParameters {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    batched_feature: ReconstructableEntity;
    flat: boolean;
    get tile_extent(): ExtentRadianF32 | undefined;
    set tile_extent(value: ExtentRadianF32 | null | undefined);
}

declare class ConstructPolygonBatchedFeatureResult {
    free(): void;
    [Symbol.dispose](): void;
    constructor(geometry: TransferablePolygonGeometry, outline_geometry?: TransferablePolygonOutlineGeometry | null, extent?: ExtentRadianF32 | null, rtc_translation?: Vec3_2 | null);
    get extent(): ExtentRadianF32 | undefined;
    set extent(value: ExtentRadianF32 | null | undefined);
    geometry: TransferablePolygonGeometry;
    get outline_geometry(): TransferablePolygonOutlineGeometry | undefined;
    set outline_geometry(value: TransferablePolygonOutlineGeometry | null | undefined);
    /**
     * RTC (Relative-To-Center) translation vector
     */
    get rtc_translation(): Vec3_2 | undefined;
    /**
     * RTC (Relative-To-Center) translation vector
     */
    set rtc_translation(value: Vec3_2 | null | undefined);
}

declare class ConstructPolylineBatchedFeatureParameters {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    readonly tile_extent: ExtentRadianF32 | undefined;
    batched_feature: ReconstructableEntity;
    flat: boolean;
}

declare class ConstructPolylineBatchedFeatureResult {
    free(): void;
    [Symbol.dispose](): void;
    constructor(geometry: TransferablePolylineGeometry, extent?: ExtentRadianF32 | null);
    readonly extent: ExtentRadianF32 | undefined;
    geometry: TransferablePolylineGeometry;
}

declare class ConstructTerrainMeshParameters {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    bytes_handle: number;
    geographic: boolean;
    isQuantizedMesh: boolean;
    poleNorth: boolean;
    poleSouth: boolean;
    /**
     * Multiplier for the automatically calculated skirt height.
     */
    skirtExaggeration: number;
    /**
     * Whether to render skirts along tile boundaries.
     */
    skirt: boolean;
    tile_handle: bigint;
    tile_size: number;
    tms: boolean;
}

declare class ConstructTerrainMeshResult {
    free(): void;
    [Symbol.dispose](): void;
    constructor(geometry: TransferableGeometry, heights: number, min_height: number, max_height: number, rtc_translation?: Vec3_2 | null);
    geometry: TransferableGeometry;
    heights: number;
    max_height: number;
    min_height: number;
    get rtc_translation(): Vec3_2 | undefined;
    set rtc_translation(value: Vec3_2 | null | undefined);
    get watermask(): number | undefined;
    set watermask(value: number | null | undefined);
}

/**
 * Helper type to add Navara Color object support to color-related number fields.
 * This recursively transforms any field named 'color' or ending with 'Color'
 * to accept both number and Navara Color objects.
 */
declare type ConvertColorFields<T> = {
    [K in keyof T]: K extends `${string}Color` | "color" ? T[K] extends number | undefined ? Color | undefined : T[K] extends number ? Color : T[K] : T[K] extends object | undefined ? ConvertColorFields<T[K]> | Extract<T[K], undefined> : T[K];
};

/**
 * Converts screen coordinates to world coordinates by raycasting against the WGS84 ellipsoid.
 * @param window - Window configuration with width, height, and pixelRatio
 * @param camera - Three.js PerspectiveCamera
 * @param vec2 - Screen coordinates in CSS pixels (same as MouseEvent clientX/clientY)
 * @returns World position Vector3 in ECEF coordinates, or undefined if no intersection with ellipsoid
 */
export declare function convertScreenToWorld(windowObject: Window_2, camera: PerspectiveCamera, vec2: Vector2): Vector3 | undefined;

/**
 * Helper type to narrow the material fields that wasm-bindgen generates as
 * bare `string`s to their literal unions. One recursive pass covers them all.
 */
declare type ConvertStringUnionFields<T> = {
    [K in keyof T]: K extends "geometryTypes" ? SourceGeometryType[] | Extract<T[K], undefined> : K extends "textFacing" | "billboardFacing" | "pointFacing" ? Facing | Extract<T[K], undefined> : T[K] extends object | undefined ? ConvertStringUnionFields<T[K]> | Extract<T[K], undefined> : T[K];
};

/**
 * Converts world coordinates to screen coordinates.
 * @param window - Window configuration with width, height, and pixelRatio
 * @param camera - Three.js PerspectiveCamera
 * @param worldPos - World position Vector3 in ECEF coordinates
 * @returns Screen coordinates in CSS pixels, or undefined if behind camera
 */
export declare function convertWorldToScreen(windowObject: Window_2, camera: PerspectiveCamera, worldPos: Vector3): Vector2 | undefined;

export declare class CopyPass extends CopyPass_2 {
    get visible(): boolean;
    set visible(v: boolean);
}

declare class Core {
    free(): void;
    [Symbol.dispose](): void;
    addLayer(layer: any): string;
    addSource(source: any): string;
    /**
     * Calculate meters per texel for hillshade normal computation
     *
     * # Arguments
     * * `tile_handle` - Handle of the tile (for calculating latitude)
     * * `texture_zoom` - Zoom level of the texture
     * * `texture_width` - Width of the texture in pixels (including 2-pixel padding)
     *
     * # Returns
     * Meters per texel value for hillshade shader
     */
    calcMetersPerTexel(tile_handle: bigint, texture_zoom: number, texture_width: number): number;
    cameraFollow(enabled: boolean, target?: Float64Array | null, offset?: Float64Array | null): void;
    cameraFreeLook(enabled: boolean, target?: Float64Array | null): void;
    changeCamera(position?: Float64Array | null, pitch?: number | null, heading?: number | null, roll?: number | null, distance?: number | null): void;
    deleteLayer(layer_id: string): void;
    /**
     * Delete a source, returning `false` while any layer still references it (or
     * the id is unknown) and `true` once it has been removed.
     */
    deleteSource(source_id: string): boolean;
    /**
     * Handles of `External` entries removed since the last drain; JS evicts
     * each from its `InMemoryBufferStore` map every frame.
     */
    drainRemovedExternalHandles(): Int32Array;
    /**
     * Starts a camera flight and returns its id. A `CameraFlightEndedEvent`
     * carrying the same id is delivered through the event stream when the
     * flight completes (`completed: true`) or is superseded/canceled
     * (`completed: false`).
     */
    flyTo(position?: Float64Array | null, pitch?: number | null, heading?: number | null, roll?: number | null, duration?: number | null, max_height?: number | null, distance?: number | null, easing?: number | null): number;
    genGlobalBatchId(): number | undefined;
    getBufferF32(handle: number): Float32Array | undefined;
    getBufferF64(handle: number): Float64Array | undefined;
    getBufferU32(handle: number): Uint32Array | undefined;
    getBufferU8(handle: number): Uint8Array | undefined;
    /**
     * Vertical field of view in radians as set via `setFrustum`.
     */
    getCameraFOV(): number | undefined;
    getCameraOrientation(): CameraOrientation_2 | undefined;
    getCameraPositionECEF(): Float64Array | undefined;
    getCameraPositionLLE(): Float64Array | undefined;
    getCameraStatus(): CameraStatus | undefined;
    getGlobe(): Globe_2 | undefined;
    getGlobeColor(): number | undefined;
    getGlobeElevationColormap(): Float32Array | undefined;
    getGlobeHideUnderground(): boolean | undefined;
    getGlobeMaxSse(): number | undefined;
    getGlobeOpacity(): number | undefined;
    getGlobeSegments(): number | undefined;
    getGlobeTransparent(): boolean | undefined;
    getGlobeUseNormal(): boolean | undefined;
    getGlobeWireframe(): boolean | undefined;
    getLayerIndex(layer_id: string): number | undefined;
    getMartini(martini_id: ReconstructableEntity): TransferableMartini | undefined;
    getMemoryStats(): MemoryStats_2 | undefined;
    /**
     * The WebMercator raster tiles to bake into per-layer drape render targets for a
     * terrain tile (baked layers only; empty on WebMercator terrain, which drapes 1:1
     * through the per-slot material path).
     */
    getRasterTileStates(handle: bigint): RasterTileState[];
    /**
     * Read back a stored source as the plain description object `addSource`
     * accepts — including engine defaults and partial-update merges (inline
     * GeoJSON `data` is not read back). `undefined` for unknown ids. Used by
     * `view.sampleTerrainMostDetailed` to sample against the exact config
     * the view renders with.
     */
    getSourceDescription(source_id: string): any;
    /**
     * Buffer handle of a tile's loaded raw DEM bytes (the data a raster-DEM
     * upsample of a descendant resamples from), `undefined` until it landed.
     */
    getTerrainDemBytes(handle: bigint): number | undefined;
    getTile(handle: bigint): TransferableTile | undefined;
    getTileElevationDecoder(handle: bigint): ElevationDecoder | undefined;
    getTransferablePolygonBatchedFeature(batched_feature_id: bigint): ReturnedTransferablePolygonBatchedFeature | undefined;
    getTransferablePolylineBatchedFeature(batched_feature_id: bigint): ReturnedTransferablePolylineBatchedFeature | undefined;
    getVectorTileStates(handle: bigint): VectorTileState[];
    getZoomLevel(): number | undefined;
    hasDataRequester(id: bigint): boolean;
    hasWorkerTask(id: bigint): boolean;
    input(input: any): void;
    lookAt(target: Float64Array, offset: Float64Array): void;
    markFeatureIsRendered(feature_type: string, bits: bigint): void;
    moveCamera(direction: CameraDirection, amount: number): void;
    moveCameraWithDirection(direction: Float64Array, amount: number): void;
    constructor(id: string);
    newBufferF32(byte_length: number, f: Function): number | undefined;
    newBufferF32Cloned(data: Float32Array): number | undefined;
    newBufferF64(byte_length: number, f: Function): number | undefined;
    newBufferU32(byte_length: number, f: Function): number | undefined;
    newBufferU32Cloned(data: Uint32Array): number | undefined;
    newBufferU8(byte_length: number, f: Function): number | undefined;
    newBufferU8Cloned(data: Uint8Array): number | undefined;
    newExternalBuffer(byte_length: number): number | undefined;
    /**
     * Monotonic revision that changes only when the raster drape resolution could have
     * changed. The web renderer reads it once per frame and skips the per-terrain-tile
     * `getRasterTileStates` calls while it is unchanged.
     */
    rasterRevision(): number;
    readAllBatchedProperties(renderable_feature_bits: bigint, callback: Function): void;
    readEvents(): Events | undefined;
    readFilteredBatchedProperties(renderable_feature_bits: bigint, keys: any[], callback: Function): void;
    readPropertyByGlobalBatchId(batch_id: number): BatchPropResult;
    registerSampleTerrainHeightEvent(lle: LLE): bigint;
    registerTerrainHeightRangeEvent(extent: ExtentRadianF32): bigint;
    removeBuffer(handle: number): void;
    removeBufferF32(handle: number): Float32Array | undefined;
    removeBufferF64(handle: number): Float64Array | undefined;
    removeBufferU32(handle: number): Uint32Array | undefined;
    removeBufferU8(handle: number): Uint8Array | undefined;
    /**
     * Reports the actual GPU byte size a rendered feature was measured at on
     * the JS side so the memory ledger corrects its payload-based estimate.
     * Feature kinds without a wired-up owner lookup are a no-op. Currently
     * wired: 3D Tiles models (replaces the tile's estimate — glTF/Draco
     * decode otherwise undercounts) and billboards (folds the JS texture
     * atlas footprint into the owning vector tile; `0` clears it on dispose).
     */
    reportFeatureGpuBytes(feature_bits: bigint, gpu_bytes: number): void;
    /**
     * Reports the drape render-target GPU footprint of a terrain tile (the
     * clamp-to-ground vector layers baked onto it), measured on the JS side
     * where the render targets are lazily allocated. Scales with terrain
     * subdivision past the vector `maxZoom`, which per-vector-tile accounting
     * cannot see.
     */
    reportTerrainDrapeGpuBytes(handle: bigint, gpu_bytes: number): void;
    resize(width: number, height: number, pixel_ratio: number): void;
    rotateAroundAxis(axis: Float64Array | null | undefined, angle: number): void;
    sampleTerrainHeight(lle: LLE): number | undefined;
    /**
     * `[min, max]` height of the ground rendered over `extent` (radians).
     */
    sampleTerrainHeightRange(extent: ExtentRadianF32): Float64Array | undefined;
    setBufferU8(handle: number, bits: bigint, byte_length: number, f: Function): void;
    /**
     * Sets the memory budget for tile caches in bytes. Passing `undefined`
     * disables budgeting (tiles are destroyed as soon as they leave the
     * view, the original behavior).
     */
    setCacheBytes(bytes?: number | null): void;
    setCameraControl(event: CameraControlUpdateEvent): void;
    /**
     * Updates the dynamic screen-space-error relaxation; see [`DynamicSse`].
     */
    setDynamicSse(settings: DynamicSse): void;
    setExternalBuffer(handle: number, bits: bigint, byte_length: number): void;
    /**
     * Reports the estimated GPU bytes of fixed, screen-sized allocations
     * (the postprocessing render-target stack). Counted in the ledger's
     * usage so the tile budget binds against the remaining memory. The JS
     * side re-reports on init, resize, and pass-list changes.
     */
    setFixedGpuBytes(bytes: number): void;
    setFrustum(fov?: number | null, near?: number | null, far?: number | null): void;
    setGlobeColor(value: number): void;
    setGlobeElevationColormap(value: Float32Array): void;
    setGlobeHideUnderground(value: boolean): void;
    setGlobeMaxSse(value: number): void;
    setGlobeOpacity(value: number): void;
    setGlobeSegments(value: number): void;
    setGlobeTransparent(value: boolean): void;
    setGlobeUseNormal(value: boolean): void;
    setGlobeWireframe(value: boolean): void;
    /**
     * Updates the LOD fog parameters (distance-based screen-space-error
     * relaxation: far tiles tolerate a larger error and stay coarser). This
     * only affects tile LOD selection, never visual fog rendering.
     */
    setLodFog(enabled: boolean, density: number, sse_factor: number): void;
    /**
     * Caps the number of in-flight data fetches per tile pipeline (raster /
     * terrain / vector / 3D Tiles / hillshade each apply it independently).
     */
    setMaxPendingRequests(value: number): void;
    /**
     * Overrides GPU cost estimates that only the JS side knows precisely
     * (the composite atlas size depends on device options).
     */
    setMemoryCostHints(atlas_tile_bytes: number, raster_tile_bytes: number): void;
    /**
     * Sets the memory-pressure SSE multiplier range. `min` is the resting
     * base (far tiles always coarser; >1 on mobile), `max` the ceiling the
     * degrade rises to under memory pressure.
     */
    setSseMultiplierRange(min: number, max: number): void;
    setTileMeshPrepared(handle: bigint): void;
    start(): void;
    triggerDataRequesterFailed(bits: bigint): void;
    triggerDataRequesterLoaded(bits: bigint, handle: number): void;
    triggerTextureFragmentLoaded(bits: bigint, status: TextureFragmentStatus): void;
    triggerWorkerTaskCompleted(bits: bigint, result: DelegatedWorkerTasksResult): void;
    /**
     * Release the delegator of a task that ended without a deliverable
     * result (worker error, missing input, ...). Consumes `delegator_id`.
     * Safe to call for a task the engine already cancelled: a despawned
     * delegator makes this a no-op.
     */
    triggerWorkerTaskFailed(delegator_id: ReconstructableEntity): void;
    unregisterSampleTerrainHeightEvent(bits: bigint): void;
    unregisterTerrainHeightRangeEvent(bits: bigint): void;
    update(updated_at: number): void;
    updateLayer(layer_id: string, layer: any): void;
    updateSource(source_id: string, source: any): void;
    /**
     * Monotonic revision that changes only when the vector-tile resolution could have
     * changed. The web renderer reads it once per frame and skips the per-terrain-tile
     * `getVectorTileStates` calls while it is unchanged.
     */
    vectorRevision(): number;
    id: string;
}

/**
 * Create fullscreen rendering infrastructure for selective effect passes.
 */
export declare function createFullscreenQuad(): {
    camera: OrthographicCamera;
    geometry: PlaneGeometry;
};

/**
 * Allocates the extra attachments in {@link computeGBufferTextureIndex} order.
 * Disabled buffers get no placeholder texture.
 */
export declare function createGBufferAttachments(renderTarget: WebGLRenderTarget, buffers: ResolvedGBufferOptions): void;

/**
 * Creates a `GLTFLoader` that decodes Draco and meshopt compressed geometry.
 * Draco runs on Navara's worker pool, so `ThreeView` must be initialized.
 */
export declare function createGltfLoader(): GLTFLoader;

/**
 * Factory function to create the instancedSprite material enhancer.
 *
 * This creates a new enhancer instance with its own internal state.
 *
 * @param material - The Three.js ShaderMaterial to enhance
 *
 * @example
 * ```typescript
 * const material = new ShaderMaterial();
 * const enhancer = createInstancedSpriteMaterialEnhancer(material);
 *
 * // Mount with base props
 * enhancer.mount({
 *   base: { scale: 100, useRTE: true, billboard: true },
 * });
 *
 * // Get state directly via states() - refresh after updates
 * const state = enhancer.states();
 *
 * // Update RTE uniforms per-frame via mutates()
 * if (state.useRTE) {
 *   const mutates = enhancer.mutates();
 *   mutates.updateRteUniforms(camX, camY, camZ, state);
 * }
 *
 * // Update props (then call states() again to get fresh state)
 * enhancer.update({ base: { scale: 200 } });
 *
 * // Use transformShader for onBeforeCompile
 * material.onBeforeCompile = enhancer.transformShader;
 * ```
 */
export declare function createInstancedSpriteMaterialEnhancer(material: SupportedMaterial_6): MaterialEnhancer<SupportedMaterial_6, InstancedSpriteMaterialProps, InstancedSpriteBaseState, InstancedSpriteBaseMutates, AVAILABLE_SHADERS_9>;

/**
 * Factory function to create the model material enhancer.
 *
 * This creates a new enhancer instance with its own internal state.
 *
 * @param material - The Three.js material to enhance
 *
 * @example
 * ```typescript
 * const material = new MeshStandardMaterial();
 * const enhancer = createModelMaterialEnhancer(material);
 *
 * // Mount with separated base and water props
 * enhancer.mount({
 *   base: { color: 0xff0000, metalness: 0.5 },
 *   water: { water: true, waterScaleNormal: 0.01 },
 * });
 *
 * // Get state directly via states() - refresh after updates
 * const { base, water } = enhancer.states();
 *
 * // Update props (then call states() again to get fresh state)
 * enhancer.update({ base: { height: 100 } });
 *
 * // Use transformShader for onBeforeCompile
 * material.onBeforeCompile = enhancer.transformShader;
 * ```
 */
declare function createModelMaterialEnhancer(material: SupportedMaterial): MaterialEnhancer<SupportedMaterial, ModelMaterialProps, ModelWaterCombinedStates, ModelWaterCombinedMutates, AVAILABLE_SHADERS_2>;

/**
 * Factory function to create the polygon material enhancer.
 *
 * This creates a new enhancer instance with its own internal state.
 *
 * @param material - The Three.js material to enhance
 *
 * @example
 * ```typescript
 * const material = new MeshLambertMaterial();
 * const enhancer = createPolygonMaterialEnhancer(material);
 *
 * // Mount with separated base and water props
 * enhancer.mount({
 *   base: { color: 0xff0000, useRTE: true },
 *   water: { water: true, waterScaleNormal: 0.5 },
 * });
 *
 * // Get state directly via states() - refresh after updates
 * const { base, water } = enhancer.states();
 *
 * // Update RTE uniforms per-frame via mutates()
 * if (base.useRTE) {
 *   const { base: baseMutates } = enhancer.mutates();
 *   baseMutates.updateRteUniforms(modelViewMatrix, cameraHigh, cameraLow);
 * }
 *
 * // Update props (then call states() again to get fresh state)
 * enhancer.update({ base: { addHeight: 100 } });
 *
 * // Use transformShader for onBeforeCompile
 * material.onBeforeCompile = enhancer.transformShader;
 * ```
 */
export declare function createPolygonMaterialEnhancer(material: SupportedMaterial_3): MaterialEnhancer<SupportedMaterial_3, PolygonMaterialProps, PolygonWaterCombinedStates, PolygonWaterCombinedMutates, AVAILABLE_SHADERS_5>;

/**
 * Factory function to create the polyline material enhancer.
 *
 * This creates a new enhancer instance with its own internal state.
 *
 * @param material - The Three.js ShaderMaterial to enhance
 *
 * @example
 * ```typescript
 * const material = new ShaderMaterial();
 * const enhancer = createPolylineMaterialEnhancer(material);
 *
 * // Mount with base props
 * enhancer.mount({
 *   base: { color: 0xff0000, width: 2, useRTE: true },
 * });
 *
 * // Get state directly via states() - refresh after updates
 * const state = enhancer.states();
 *
 * // Update RTE uniforms per-frame via mutates()
 * if (state.useRTE) {
 *   const mutates = enhancer.mutates();
 *   mutates.updateRteUniforms(modelViewMatrix, cameraHigh, cameraLow, state);
 * }
 *
 * // Update props (then call states() again to get fresh state)
 * enhancer.update({ base: { width: 3 } });
 *
 * // Use transformShader for onBeforeCompile
 * material.onBeforeCompile = enhancer.transformShader;
 * ```
 */
export declare function createPolylineMaterialEnhancer(material: SupportedMaterial_5): MaterialEnhancer<SupportedMaterial_5, PolylineMaterialProps, PolylineBaseState, PolylineBaseMutates, AVAILABLE_SHADERS_8>;

/**
 * Creates a new Replacer instance for chaining string replacements
 *
 * @param source - The source string to perform replacements on
 * @returns A new Replacer instance
 */
export declare function createReplacer(source: string): Replacer;

/**
 * Factory function to create the sdfText material enhancer.
 *
 * This creates a new enhancer instance with its own internal state.
 *
 * @param material - The Three.js ShaderMaterial to enhance
 *
 * @example
 * ```typescript
 * const material = new ShaderMaterial({ transparent: true });
 * const enhancer = createSdfTextMaterialEnhancer(material);
 *
 * // Mount with base props
 * enhancer.mount({
 *   base: { color: 0xffffff, fontSize: 16, useRTE: true },
 * });
 *
 * // Get state directly via states() - refresh after updates
 * const state = enhancer.states();
 *
 * // Update per-frame via mutates()
 * const mutates = enhancer.mutates();
 * mutates.updatePerFrame(fov, screenHeight, farPlane, camX, camY, camZ, state);
 *
 * // Update props (then call states() again to get fresh state)
 * enhancer.update({ base: { color: 0xff0000 } });
 *
 * // Use transformShader for onBeforeCompile
 * material.onBeforeCompile = enhancer.transformShader;
 * material.customProgramCacheKey = enhancer.programCacheKey;
 * ```
 */
export declare function createSdfTextMaterialEnhancer(material: SupportedMaterial_7): MaterialEnhancer<SupportedMaterial_7, SdfTextMaterialProps, SdfTextBaseState, SdfTextBaseMutates, AVAILABLE_SHADERS_10>;

/**
 * Shadow-map depth material for an enhanced material. Three's default depth
 * material reads none of the enhancer's attributes (RTE positions, extrusion),
 * so the caster would draw nothing.
 *
 * `transformShader` defaults to the origin's `onBeforeCompile`, read at
 * compile time. The clone also compiles with the origin's
 * `userData.defines` and batch layout defines.
 */
export declare function createShadowDepthMaterial<M extends Material>(origin: M, transformShader?: (shader: WebGLProgramParametersWithUniforms, renderer: WebGLRenderer) => void): M;

/**
 * Factory function to create a shadow map depth enhancer.
 *
 * This enhancer handles shadow map depth shader injection.
 * It's designed to be used with customDepthMaterial for shadow map generation.
 *
 * @param material - The Three.js material to enhance
 */
export declare function createShadowMapDepthEnhancer(material: ShadowMapDepthSupportedMaterial): MaterialEnhancer<ShadowMapDepthSupportedMaterial, ShadowMapDepthProps, ShadowMapDepthState, ShadowMapDepthMutates, typeof AVAILABLE_SHADERS_7>;

/**
 * Coordinate reference system
 */
declare enum CRS {
    /**
     * EPSG:4326
     */
    Geographic = 0,
    /**
     * EPSG:4978
     */
    Geocentric = 1,
}

export { CSMHelper }

export { CssFontFaceFilter }

export declare class CustomEffectPass extends EffectPass {
    private customDepthTexture;
    private customDepthPacking;
    /**
     * Override setDepthTexture to use custom depth texture if provided.
     */
    setDepthTexture(): void;
    setCustomDepthTexture(texture: Texture | null, depthPacking?: DepthPackingStrategies): void;
    getCustomDepthTexture(): Texture | null;
}

export declare type CustomObject3DEventMap = Object3DEventMap & {
    removedFromWorld: undefined;
    needsUpdate: undefined;
};

export declare class CustomRenderPass extends RenderPass {
    protected _camera: PerspectiveCamera;
    protected _scenes: Scenes;
    gbufferRenderTarget: WebGLRenderTarget;
    private copyPass;
    globeDepthCopyPass: DepthCopyPass;
    globeNormalCopyPass: NormalCopyPass;
    allDepthCopyPass: AllDepthCopyPass;
    disableShadow: boolean;
    private globe;
    private combinedScene;
    private drapedTempScene;
    private shadowScene;
    private dummyShadowRenderTarget;
    private debugNormalCopyPass?;
    private readonly gbufferScenes;
    private readonly forwardScenes;
    private allowTransparent;
    private buffers;
    private sceneLit;
    private inputBufferTemplate;
    /**
     * Attachment indices of `gbufferRenderTarget.textures` for this view.
     * Recomputed by {@link setBuffers}.
     */
    textureIndex: GBufferTextureIndex;
    private gbufferDefines;
    private gbufferDefinesStamped;
    private readonly gbufferVisited;
    private litStamped;
    private globeNormalActive;
    private readonly globeDepthUniform;
    private readonly globeNormalUniform;
    private width;
    private height;
    constructor(scenes: Scenes, camera: PerspectiveCamera, inputBuffer: WebGLRenderTarget, globe: Globe, options?: CustomRenderPassOptions);
    /**
     * Re-points the copy passes at the normal attachment. The attachment is
     * freshly allocated on every {@link setBuffers}, so the reference cannot be
     * captured once.
     */
    private bindNormalTexture;
    protected _renderWithLight(renderer: WebGLRenderer, scene: Scene): void;
    /**
     * Applies a new derived buffer configuration. Attachment locations may have
     * shifted, so every material is re-stamped and its shader recompiled.
     */
    setBuffers(buffers: ResolvedGBufferOptions): void;
    /** Applies a new scene-level `lit` default (`view.lit` changed). */
    setLit(lit: boolean): void;
    private stampGBufferDefines;
    private forEachMaterial;
    private stampGBufferDefine;
    private stampForwardDefines;
    private clearGBufferDefines;
    /** Per-material `lit` (NVR_LIT / NVR_UNLIT) wins over this in the shader. */
    private stampLitDefine;
    render(renderer: WebGLRenderer, inputBuffer: WebGLRenderTarget | null, _outputBuffer: WebGLRenderTarget | null): void;
    setDepthTexture(): void;
    setSize(width: number, height: number): void;
    /**
     * Grows the globe-normal copy target only while something consumes it, and
     * shrinks it back to 1x1 otherwise — at full resolution it is a screen-sized
     * RGBA16F target, the same cost again as the G-buffer's normal attachment.
     */
    private setGlobeNormalActive;
    protected _renderDrapedMesh(renderer: WebGLRenderer): void;
}

/**
 * Options for CustomRenderPass
 */
export declare type CustomRenderPassOptions = {
    debugNormal?: boolean;
    disableShadow?: boolean;
    allowTransparent?: boolean;
    /** G-buffer attachment configuration. Defaults to all optional buffers disabled. */
    buffers?: ResolvedGBufferOptions;
    /**
     * Scene-level default of the `lit` material option (`view.lit`). When
     * `false`, materials without an explicit `lit` output plain albedo.
     * @defaultValue true
     */
    lit?: boolean;
};

declare class DataRequesterRemovedEvent {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    bits: bigint;
    gen: number;
    handle: number;
    ind: number;
}

declare class DataRequestEvent {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    bits: bigint;
    extension: string;
    gen: number;
    handle: number;
    ind: number;
    /**
     * Byte-range length in bytes. Set together with `offset`.
     */
    get length(): bigint | undefined;
    /**
     * Byte-range length in bytes. Set together with `offset`.
     */
    set length(value: bigint | null | undefined);
    /**
     * Byte-range offset for a partial fetch. `None` for a full-resource GET.
     */
    get offset(): bigint | undefined;
    /**
     * Byte-range offset for a partial fetch. `None` for a full-resource GET.
     */
    set offset(value: bigint | null | undefined);
    /**
     * Fetch urgency: 0 is the most urgent (see `Priority::rank`). The web
     * side keeps its pending fetch queue sorted by this. Requests without an
     * ECS `Priority` (tileset / PMTiles bootstrap reads, 3D Tiles content)
     * rank as `Extreme`, matching the engine sender that dispatches them
     * ahead of the prioritized ones.
     */
    priority: number;
    /**
     * Quantized-mesh only: server should return the oct-encoded normals extension.
     */
    requestVertexNormals: boolean;
    /**
     * Quantized-mesh only: server should return the watermask extension.
     */
    requestWaterMask: boolean;
    /**
     * Quantized-mesh only: bearer token sent as the `Authorization` header
     * for `.terrain` requests. `None` means no Authorization header is added.
     */
    get token(): string | undefined;
    /**
     * Quantized-mesh only: bearer token sent as the `Authorization` header
     * for `.terrain` requests. `None` means no Authorization header is added.
     */
    set token(value: string | null | undefined);
    url: string;
}

/**
 * One label/sprite competing for screen space in a declutter pass.
 *
 * The local box is expressed around the projected anchor in the shader's
 * billboard-local units — CSS pixels when `sizeInMeters` is false, meters
 * otherwise — with +X right and +Y up (view-space convention). The manager
 * converts it to a screen-pixel AABB using the same `nvr_pxToWorld` math the
 * vertex shaders use, so the collision box matches what is actually drawn.
 */
declare type DeclutterCandidate = {
    /** World-space anchor in ECEF meters (f64), before the height offset. */
    anchorX: number;
    anchorY: number;
    anchorZ: number;
    /** Extra offset in meters along the spherical surface normal — CPU mirror
     *  of `mvr_getMvHeightOffset` (sprite_height_pars_vertex.glsl). */
    addHeight: number;
    /** Local box around the anchor (px or meters, see `sizeInMeters`). */
    minX: number;
    maxX: number;
    minY: number;
    maxY: number;
    /** Unit of the local box, mirroring the material's `sizeInMeters`. */
    sizeInMeters: boolean;
    /** Placement priority: higher wins an overlap. */
    priority: number;
    /** Whether the label is currently shown (its fade target is "visible").
     *  Feeds placement hysteresis: shown labels win equal-priority ties and
     *  tolerate marginal overlaps, so slow camera drift doesn't make near-tied
     *  labels flicker in and out. */
    isShown: boolean;
    /** Participant that owns this candidate; receives the placement result. */
    owner: DeclutterParticipant;
    /** Participant-defined id (label slot for text batches, instance index for
     *  sprites) passed back to `applyDeclutter`. */
    handle: number;
    /**
     * Stable identity of what the candidate displays (label text for text
     * batches). Feeds the manager's shown-content registry so a tile swap can
     * hand placement over to the replacing batch's identical label without a
     * hide/fade-in blink. Omit for candidates that don't participate.
     */
    contentKey?: string;
};

/**
 * The pure numeric placement kernel used by {@link DeclutterManager}.
 *
 * Given a flat list of candidates and the camera, it projects each anchor to a
 * screen-pixel box, sorts by priority (with placement hysteresis), and greedily
 * claims space in a uniform screen-space grid — returning one `hidden` flag
 * (`0` = shown, `1` = hidden) per candidate, in input order.
 *
 * The production implementation is the Rust `declutterPlace` in
 * `navara_wasm_api` (see {@link wasmDeclutterKernel}); the projection, collision
 * grid, and greedy placement all live there. Injecting it keeps the manager free
 * of an import-time WASM dependency, so its orchestration is unit-tested with a
 * stub. Placement correctness itself is covered by the crate's Rust tests.
 */
declare type DeclutterKernel = {
    /**
     * @param candidates Packed `f64` data, {@link CANDIDATE_STRIDE} values per
     *   candidate; pass a subarray of exactly `n * CANDIDATE_STRIDE`.
     * @param view Column-major view matrix (inverse of `camera.matrixWorld`), 16.
     * @param proj Column-major projection matrix, 16.
     * @returns One `hidden` flag (`0`/`1`) per candidate, in input order.
     */
    place(candidates: Float64Array, view: Float64Array, proj: Float64Array, cameraX: number, cameraY: number, cameraZ: number, near: number, widthPx: number, heightPx: number, fovRad: number, paddingPx: number, hysteresisPx: number): Uint8Array;
};

/**
 * Shared screen-space label decluttering.
 *
 * Text batches and sprite meshes register as participants; each placement
 * pass packs every candidate label into a flat buffer and hands it to the
 * Rust {@link DeclutterKernel}, which projects the anchors, sorts by priority,
 * and greedily claims screen space — losers are hidden through the meshes'
 * declutter channels (`uDeclutterHide` uniform / `instanceDeclutterHide`
 * attribute), which are separate from user-driven `show` state and free to
 * toggle every pass.
 *
 * Placement is hysteretic: currently-shown labels win equal-priority ties
 * and tolerate {@link DeclutterManager.HYSTERESIS_PX} of marginal overlap
 * before eviction, so near-ties don't flicker while the camera drifts.
 *
 * The pass is view-dependent, so it runs from the render loop — but throttled:
 * placement only re-runs when the camera or the label set actually changed,
 * and at most once per {@link DeclutterManager.MIN_INTERVAL_MS}. Callers run
 * it *before* rendering so results land in the same frame.
 */
declare class DeclutterManager {
    private readonly _kernel;
    /** Minimum time between placement passes (ms). */
    static readonly MIN_INTERVAL_MS = 150;
    /** Padding added around every collision box (px); two labels never sit
     *  closer than twice this. */
    static readonly PADDING_PX = 2;
    /** Largest single fade step (ms), so a frame after an idle gap doesn't
     *  swallow most of a fade in one jump. */
    static readonly MAX_FADE_STEP_MS = 50;
    /** Placement hysteresis (px): a currently-shown label's collision test box
     *  shrinks by this per side, so it survives marginal overlaps that camera
     *  drift toggles frame to frame instead of flickering. Its full box is
     *  still claimed against competitors. */
    static readonly HYSTERESIS_PX = 6;
    /** Anchor distance (m) within which two same-content candidates count as
     *  the same label for the tile-swap handoff. Covers the anchor drift a
     *  zoom level's tile-grid quantization (and per-tile terrain heights)
     *  introduces, while staying far below distinct same-name places. */
    static readonly HANDOFF_TOLERANCE_M = 2000;
    private _participants;
    /** Set when the label set changed (register/update/text change) so the next
     *  update re-places even with a static camera. */
    private _dirty;
    private _prevCamera;
    private _lastRunAt;
    private _lastStepAt;
    /** Shown candidates of the most recent pass, keyed by content, as flat xyz
     *  anchor triplets. Read by {@link wasRecentlyShown} when a tile swap
     *  activates a replacement batch. */
    private _shownByContent;
    private _candidates;
    /** Packed candidate input for the kernel; grows as the label count does. */
    private _input;
    private _viewMatrix;
    private _view16;
    private _proj16;
    /** @param _kernel the placement kernel — the Rust-backed
     *  `wasmDeclutterKernel` in production, a stub in unit tests. */
    constructor(_kernel: DeclutterKernel);
    /** Milliseconds until the throttle window since the last placement pass
     *  elapses, clamped to `[0, MIN_INTERVAL_MS]`. Callers use this to schedule
     *  a follow-up frame after a `"throttled"` result without overshooting the
     *  window by waiting out the full constant from now. */
    remainingThrottleMs(nowMs: number): number;
    register(participant: DeclutterParticipant): void;
    unregister(participant: DeclutterParticipant): void;
    /** Signal that candidates changed (text, positions, visibility, style) so
     *  the next update re-runs placement even if the camera is still. */
    markDirty(): void;
    /**
     * Whether the most recent pass showed `contentKey` anchored within
     * {@link DeclutterManager.HANDOFF_TOLERANCE_M} of (x, y, z) — i.e. an
     * equivalent label (typically the swapped-out tile's copy) already holds
     * this screen space. A batch activating in a tile swap uses this to seed
     * such labels as granted instead of fading them in from hidden, which
     * would blink the whole tile's labels out for a pass-plus-fade.
     */
    wasRecentlyShown(contentKey: string, x: number, y: number, z: number): boolean;
    /**
     * Run a placement pass if one is due, then advance any active show/hide
     * fades. `widthPx`/`heightPx` are the viewport in CSS pixels (matching the
     * `uScreenHeightPx` uniform); `nowMs` is the frame timestamp used for
     * throttling and fade stepping.
     */
    update(camera: PerspectiveCamera, widthPx: number, heightPx: number, nowMs: number): DeclutterUpdateResult;
    private _run;
    /** Drop all registered participants. Call when the owning view is disposed
     *  so this manager doesn't keep strong references to removed meshes (and
     *  their GPU/font resources) past the view's lifetime. */
    dispose(): void;
    private _snapshotChanged;
    private _takeSnapshot;
}

/** A mesh that contributes label candidates to the shared declutter pass. */
declare type DeclutterParticipant = {
    /**
     * Append the currently-visible, declutter-enabled candidates to `out`.
     * Called once per placement pass; must not retain `out`.
     */
    collectDeclutterCandidates: (out: DeclutterCandidate[]) => void;
    /**
     * Apply a placement result as the label's fade *target*. Must be cheap and
     * idempotent — the pass calls it for every candidate on every run, most
     * often with an unchanged value.
     */
    applyDeclutter: (handle: number, hidden: boolean) => void;
    /**
     * Advance this participant's hide factors toward their targets by
     * `deltaMs / DECLUTTER_FADE_MS`. Called by the manager every update while
     * anything is fading; returns true while any label is still mid-fade.
     */
    stepDeclutterFade: (deltaMs: number) => boolean;
    /**
     * Optional: start preparation (font loading, shaping) for labels that
     * parked it while their anchor was out of view. Called at the start of
     * every placement pass with the camera the pass will use — the cadence at
     * which visibility can actually change. Preparation is asynchronous, so
     * promoted labels join a *later* pass once their text is applied.
     */
    prepareDeferredLabels?: (camera: PerspectiveCamera) => void;
};

declare type DeclutterUpdateResult = 
/** Nothing to do: no participants, or camera and data unchanged. */
"idle"
/** A placement pass ran; results are applied to the participants. */
| "ran"
/** Labels are mid-fade — the caller should schedule a prompt follow-up
*  frame so the animation keeps stepping. */
| "animating"
/** A pass is due but the throttle window hasn't elapsed — the caller should
*  schedule another frame so placement settles after the camera stops. */
| "throttled";

export declare const DEFAULT_EFFECT_OPTIONS: Required<EffectOptions>;

declare type DefaultCacheBytesInputs = {
    /** Override mobile detection (defaults to `isMobileDevice()`). */
    isMobile?: boolean;
    /** Override the reported device memory in GB (defaults to `navigator.deviceMemory`; Chrome-only, spec-clamped to [0.5, 8]). */
    deviceMemoryGB?: number;
};

declare type DefaultMemoryBudgetsInputs = DefaultCacheBytesInputs & {
    /** Number of tile workers in the pool. */
    poolSize: number;
};

/**
 * Converts an angle from degrees to radians.
 * @param degree - Angle in degrees
 * @returns Angle in radians
 */
export declare function degreeToRadian(degree: number): number;

declare class DelegatedWorkerTasksParameters {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    get construct_polygon_batched_feature(): ConstructPolygonBatchedFeatureParameters | undefined;
    set construct_polygon_batched_feature(value: ConstructPolygonBatchedFeatureParameters | null | undefined);
    get construct_polyline_batched_feature(): ConstructPolylineBatchedFeatureParameters | undefined;
    set construct_polyline_batched_feature(value: ConstructPolylineBatchedFeatureParameters | null | undefined);
    get construct_terrain_mesh(): ConstructTerrainMeshParameters | undefined;
    set construct_terrain_mesh(value: ConstructTerrainMeshParameters | null | undefined);
    delegator_id: ReconstructableEntity;
    get parse_mvt_tile(): ParseMvtTileParameters | undefined;
    set parse_mvt_tile(value: ParseMvtTileParameters | null | undefined);
    get upsample_terrain_mesh(): UpsampleTerrainMeshParameters | undefined;
    set upsample_terrain_mesh(value: UpsampleTerrainMeshParameters | null | undefined);
}

declare class DelegatedWorkerTasksResult {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    static withConstructPolygonBatchedFeature(delegator_id: ReconstructableEntity, construct_polygon_batched_feature?: ConstructPolygonBatchedFeatureResult | null): DelegatedWorkerTasksResult;
    static withConstructPolylineBatchedFeature(delegator_id: ReconstructableEntity, construct_polyline_batched_feature?: ConstructPolylineBatchedFeatureResult | null): DelegatedWorkerTasksResult;
    static withConstructTerrainMesh(delegator_id: ReconstructableEntity, construct_terrain_mesh?: ConstructTerrainMeshResult | null): DelegatedWorkerTasksResult;
    static withParseMvtTile(delegator_id: ReconstructableEntity, parse_mvt_tile?: ParseMvtTileResult | null): DelegatedWorkerTasksResult;
    static withUpsampleTerrainMesh(delegator_id: ReconstructableEntity, upsample_terrain_mesh?: UpsampleTerrainMeshResult | null): DelegatedWorkerTasksResult;
    get construct_polygon_batched_feature(): ConstructPolygonBatchedFeatureResult | undefined;
    set construct_polygon_batched_feature(value: ConstructPolygonBatchedFeatureResult | null | undefined);
    get construct_polyline_batched_feature(): ConstructPolylineBatchedFeatureResult | undefined;
    set construct_polyline_batched_feature(value: ConstructPolylineBatchedFeatureResult | null | undefined);
    get construct_terrain_mesh(): ConstructTerrainMeshResult | undefined;
    set construct_terrain_mesh(value: ConstructTerrainMeshResult | null | undefined);
    delegator_id: ReconstructableEntity;
    get parse_mvt_tile(): ParseMvtTileResult | undefined;
    set parse_mvt_tile(value: ParseMvtTileResult | null | undefined);
    get upsample_terrain_mesh(): UpsampleTerrainMeshResult | undefined;
    set upsample_terrain_mesh(value: UpsampleTerrainMeshResult | null | undefined);
}

/**
 * Three's `packing` chunk, for the MRT pass's packed depth buffers – check
 * `depthBufferPacking` / `globeDepthBufferPacking` for the packing in use.
 */
export declare const DEPTH_PACKING_SHADER: string;

/**
 * Base abstract class for all registry types in the Navara system.
 * Provides common functionality for registering, creating, and managing different types of components.
 */
export declare abstract class DescRegistry<TConstructor, TInstance, TConfig extends Record<string, unknown> = Record<string, unknown>> {
    view: ThreeView;
    ctx: ViewContext;
    protected registry: Map<string, TConstructor>;
    constructor(view: ThreeView, ctx: ViewContext);
    /**
     * Register a new type with the given name and constructor
     */
    register(name: string, constructor: TConstructor): void;
    /**
     * Unregister a type by name
     */
    unregister(name: string): boolean;
    /**
     * Check if a type is registered
     */
    has(name: string): boolean;
    /**
     * Get all registered type names
     */
    getRegisteredTypes(): string[];
    /**
     * Get the number of registered types
     */
    size(): number;
    /**
     * Clear all registered types
     */
    clear(): void;
    /**
     * Create an instance of the specified type with the given configuration
     * Must be implemented by subclasses
     */
    abstract create(name: string, config: TConfig): TInstance;
    /**
     * Find a type name from a configuration object
     * Useful for auto-detecting type from config keys
     */
    findTypeFromConfig(config: Record<string, unknown>): string | null;
    /**
     * Get constructor by name. Public so `ViewContext.findLight`/`findMesh`
     * can resolve a registered key to its descriptor class.
     */
    getConstructor(name: string): TConstructor | undefined;
}

declare type Description = {
    final?: {};
};

declare type Description_2 = {
    mrt?: {
        debugNormal?: boolean;
    };
};

declare type Description_3 = {
    skyEnvMap?: {
        resolution?: number;
    };
};

declare type Description_4 = {
    transparent?: {};
};

export declare type Descriptions = {
    mesh?: object;
    light?: object;
    effect?: object;
};

/**
 * Why a tile's composite atlas needs to be re-rendered.
 * Aggregated per-handle so a single composite pass services multiple updates.
 */
declare type DirtyReason = "material" | "texture-binding" | "vector-revision" | "raster-revision" | "hillshade";

/**
 * Maps a 3D Tiles feature table semantic (`POSITION`, `RGB`, ...) to its
 * Draco unique attribute id.
 */
declare class DracoAttributeId {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    semantic: string;
    uniqueId: number;
}

export declare class DrapedMesh<TGeometry extends BufferGeometry = BufferGeometry<NormalBufferAttributes>, TMaterial extends Material | Material[] = Material | Material[], TEventMap extends Object3DEventMap = Object3DEventMap> extends Mesh_2<TGeometry, TMaterial, TEventMap> {
    drapedEnable: boolean;
    constructor(geometry?: TGeometry, material?: TMaterial, enable?: boolean);
    enabled(): boolean;
    /**
     * Run the stencil-test draping passes for this mesh.
     * The caller supplies a `render` callback that performs the actual draw call
     * (e.g. `renderer.render(scene, camera)`).
     *
     * The final pass draws back faces with the depth test off. The first one
     * rasterized at a pixel paints it and zeroes its stencil, and which one
     * that is follows the triangle order, so the shading must depend only on
     * the pixel: {@link setupMaterialForDrape} shades at the ground point under
     * the pixel.
     */
    process(render: () => void): void;
}

/**
 * Dynamic screen-space-error settings (CesiumJS `dynamicScreenSpaceError`
 * equivalent): tilted, street-level horizon views tolerate a larger error
 * for far tiles. Zero effect looking straight down; fades out as the camera
 * climbs past `maxHeight` meters. Only affects tile LOD selection.
 *
 * The TS-side `DynamicSseSettings` plain-object type is derived from this
 * class (`NormalizeWASMClass`), so this is the single source of the shape.
 */
declare class DynamicSse {
    free(): void;
    [Symbol.dispose](): void;
    constructor(enabled: boolean, density: number, sse_factor: number, height_falloff: number, min_height: number, max_height: number);
    /**
     * Distance scale of the relaxation ramp before tilt/height scaling.
     */
    density: number;
    enabled: boolean;
    /**
     * Fraction of the height band below which the effect is at full strength.
     */
    heightFalloff: number;
    maxHeight: number;
    /**
     * Camera height band (meters above the ellipsoid) the effect fades across.
     */
    minHeight: number;
    /**
     * Maximum SSE relaxation (in pixels) at full tilt and saturation for a
     * layer with the reference max SSE of 16 (the CesiumJS 3D Tiles default);
     * each layer scales it by its own max SSE, so terrain and imagery
     * (max SSE 2) relax by at most `sseFactor / 8` pixels.
     */
    sseFactor: number;
}

/**
 * Dynamic screen-space-error settings (CesiumJS `dynamicScreenSpaceError`
 * equivalent): tilted, street-level horizon views tolerate a larger error for
 * far tiles. Zero effect looking straight down; fades out as the camera
 * climbs past `maxHeight` meters. Never affects visual rendering, only tile
 * LOD selection.
 *
 * Plain-object shape derived from the engine's `DynamicSse` class per the
 * WASM API policy (the class itself is constructed internally and consumed by
 * `Core.setDynamicSse`; see the field docs there).
 */
export declare type DynamicSseSettings = Required<NormalizeWASMClass<DynamicSse>>;

/**
 * Creates a local East-North-Up (ENU) reference frame transformation matrix at a position.
 * @param origin - Origin position in ECEF coordinates
 * @returns 4x4 transformation matrix from ENU to ECEF
 */
export declare function eastNorthUpToFixedFrame(origin: Vector3): Matrix4;

export declare class Effect<E extends Effect_2, O extends EffectOptions = EffectOptions, Ev extends EffectEvents = EffectEvents> extends Pass<EffectPass, E, O, Ev> {
    constructor(camera: Camera, effect: E, options?: O);
}

declare type EffectBaseInstance<Instance extends object = object> = Instance extends EffectInstance ? Instance & BaseInstance : Instance extends {
    raw: infer Raw extends Pass_2;
} ? Instance & {
    raw: Raw;
} & BaseInstance : BaseInstance;

export declare type EffectConfig = {
    type?: "effect";
} & BaseDescConfig;

/**
 * Abstract base class for creating custom post-processing effect descriptors.
 *
 * Extend this class to integrate custom effects from the `postprocessing` library into
 * Navara's render pipeline. The base class handles pass insertion, ordering, and lifecycle.
 *
 * ## Implementing a Custom Effect Descriptor
 *
 * ### 1. (Optional) Create an Effect wrapper class
 *
 * If your effect has configurable parameters, wrap the `postprocessing` effect in a
 * Navara {@link Effect} class with typed options and reactive setters:
 *
 * ```typescript
 * import { Effect } from "@navaramap/three";
 * import { VignetteEffect } from "postprocessing";
 *
 * type VignetteOptions = {
 *   offset?: number;
 *   darkness?: number;
 * };
 *
 * class Vignette extends Effect<VignetteEffect, VignetteOptions> {
 *   constructor(camera: Camera, options?: VignetteOptions) {
 *     super(camera, new VignetteEffect({ ... }), options);
 *   }
 *
 *   protected onMounted(): void {
 *     this.offset = this.options.offset ?? 0.5;
 *   }
 *
 *   get offset(): number { return this.options.offset ?? 0.5; }
 *   set offset(v: number) {
 *     this.options.offset = v;
 *     if (this.rawEffect) this.rawEffect.offset = v;
 *     this.emit("needsUpdate");
 *   }
 * }
 * ```
 *
 * ### 2. Define configuration types
 *
 * Create a description type for your effect-specific options, then merge it with
 * the base config and update types:
 *
 * ```typescript
 * type VignetteDescription = {
 *   vignette?: { offset?: number; darkness?: number };
 * };
 *
 * type VignetteEffectConfig = EffectConfig & VignetteDescription;
 * type VignetteEffectUpdate = EffectUpdate & VignetteDescription;
 * ```
 *
 * ### 3. Extend `EffectDesc`
 *
 * Implement the {@link createPass} factory method and configure the static properties
 * for pipeline ordering:
 *
 * ```typescript
 * class VignetteEffectDesc extends EffectDesc<
 *   VignetteEffectConfig,
 *   VignetteEffectUpdate,
 *   Vignette
 * > {
 *   // Unique key identifying this effect type in the render pipeline.
 *   static key = "vignette";
 *
 *   // Insert this effect before these passes (tries each in order).
 *   static insertBefore = ["smaa", "fxaa", "final"];
 *
 *   // Set to true if multiple instances of this effect are allowed.
 *   static allowDuplication = true;
 *
 *   private config: VignetteEffectConfig;
 *
 *   constructor(view: ThreeView, ctx: ViewContext, config: VignetteEffectConfig) {
 *     super(view, ctx, config);
 *     this.config = config;
 *   }
 *
 *   createPass() {
 *     return new Vignette(this.view.camera.raw, this.config.vignette);
 *   }
 *
 *   onUpdateConfig(updates: VignetteEffectUpdate): void {
 *     super.onUpdateConfig(updates);
 *     if (updates.vignette && this._instance) {
 *       if (updates.vignette.offset !== undefined) {
 *         this._instance.offset = updates.vignette.offset;
 *       }
 *     }
 *   }
 * }
 * ```
 *
 * ### 4. Register and use the descriptor
 *
 * ```typescript
 * view.registerEffect("vignette", VignetteEffectDesc);
 *
 * const handle = view.addEffect<VignetteEffectDesc>({
 *   vignette: { offset: 0.5, darkness: 0.5 },
 *   visible: true,
 * });
 *
 * // Update dynamically
 * handle.update({ vignette: { offset: 0.7 } });
 *
 * // Remove the descriptor
 * handle.delete();
 * ```
 *
 * ## Static Properties for Pipeline Ordering
 *
 * - {@link key} - **(Required)** Unique string identifier for this effect type.
 * - {@link insertAfter} - Array of effect keys. The pass is inserted after the first
 *   matching key found in the pipeline.
 * - {@link insertBefore} - Array of effect keys. Used as fallback if no `insertAfter`
 *   target is found; inserts before the first matching key.
 * - {@link allowDuplication} - Set to `true` to allow multiple instances of this effect.
 *   Each instance gets a unique internal ID.
 *
 * If neither `insertAfter` nor `insertBefore` matches an existing pass, the effect is
 * appended to the end of the pipeline.
 *
 * ## Lifecycle
 *
 * 1. **Construction** - The descriptor is instantiated with the view context and config.
 * 2. **{@link createPass}** - Called during {@link onCreate} to create the post-processing pass.
 *    The base class inserts it into the render pipeline based on the static ordering properties.
 * 3. **{@link onUpdateConfig}** - Called when `handle.update()` is invoked. The base class
 *    handles `visible`; override to handle your custom properties.
 * 4. **{@link update}** - Optional per-frame callback for animating effect parameters.
 * 5. **{@link onDestroy}** - Called on `handle.delete()`. The base class removes the pass
 *    from the render pipeline.
 *
 * @see The `custom-effect` example page for a complete custom effect descriptor tutorial
 *      implementing a vignette effect.
 *
 * @typeParam Config - Configuration type (extends {@link EffectConfig})
 * @typeParam UpdateConfig - Updatable properties (extends {@link EffectUpdate})
 * @typeParam InstanceObj - The postprocessing Pass type or a wrapper with a `raw` property
 * @typeParam Instance - Resolved instance type (inferred automatically)
 */
export declare abstract class EffectDesc<Config extends EffectConfig = EffectConfig, UpdateConfig extends EffectUpdate = EffectUpdate, InstanceObj extends EffectInstance | {
    raw: EffectInstance;
} = EffectInstance | {
    raw: EffectInstance;
}, Instance extends EffectBaseInstance<InstanceObj> = EffectBaseInstance<InstanceObj>> extends BaseDesc<Config, UpdateConfig, Instance> {
    /** Unique identifier for this effect type in the render pipeline. Must be defined by subclasses. */
    static key: string;
    /** Insert this pass after the first matching key found in the pipeline. */
    static insertAfter?: string[];
    /** Insert this pass before the first matching key found (fallback if no `insertAfter` match). */
    static insertBefore?: string[];
    /** Set to `true` to allow multiple instances of this effect in the pipeline. */
    static allowDuplication?: boolean;
    /**
     * Optional G-buffer attachments this effect reads. The view derives its
     * G-buffer configuration as the union of these across active effects:
     * adding an effect allocates what it needs, removing the last effect that
     * needs a buffer releases it. Changing the configuration reallocates
     * attachments and recompiles shaders, so add effects once and tune them
     * via `update()` instead of re-adding.
     */
    static requiredBuffers?: readonly GBufferName[];
    private instanceId;
    constructor(view: ThreeView, ctx: ViewContext, config?: Config);
    /**
     * Factory method to create the post-processing pass instance.
     *
     * Override this to return your custom effect. The returned object can be either:
     * - A `postprocessing` `Pass` directly
     * - A Navara {@link Pass} wrapper (extends `postprocessing` Pass with typed options)
     * - A wrapper object with a `raw` property containing the pass
     *
     * The base class calls this during {@link onCreate} and automatically inserts
     * the pass into the render pipeline.
     */
    abstract createPass(): Instance;
    get raw(): Instance | undefined;
    getConstructor(): typeof EffectDesc;
    getKey(): string;
    getInsertAfter(): string[] | undefined;
    getInsertBefore(): string[] | undefined;
    /**
     * The G-buffer attachments this instance currently needs. Defaults to the
     * {@link requiredBuffers} static. An override whose result changes after
     * creation must emit `gbufferRequirementsChanged` on the context.
     */
    getRequiredBuffers(): readonly GBufferName[];
    onCreate(): void;
    private insertPass;
    onUpdateConfig(updates: UpdateConfig): void;
    onDestroy(): void;
    /**
     * Optional per-frame update callback.
     * Override this to animate effect parameters over time.
     * @param time - Render-loop timestamp in milliseconds (same as the `requestAnimationFrame` time).
     */
    update?(time: number): void;
    /**
     * Finds another effect descriptor in the pipeline by its static `key`.
     * Useful for cross-effect communication (e.g. reading another effect's state).
     * @param key - The static `key` of the effect descriptor to find.
     * @returns The effect descriptor instance, or `undefined` if not found.
     */
    find<T extends EffectDesc = EffectDesc>(key: string): T | undefined;
}

export declare type EffectDescConstructor = new (view: ThreeView, ctx: ViewContext, config: EffectConfig) => EffectDesc;

export declare class EffectDescRegistry extends DescRegistry<EffectDescConstructor, EffectDesc> {
    create(effectType: string, config: EffectConfig): EffectDesc;
    /**
     * Find mesh type from config (alias for findTypeFromConfig for backward compatibility)
     */
    findEffectType(config: Record<string, unknown>): string | null;
}

export declare type EffectEvents = {
    needsUpdate: () => void;
};

/**
 * A handle to control an effect descriptor after it has been added to the scene.
 * Returned by `ThreeView.addEffect()`.
 *
 * @typeParam T - The specific effect descriptor type (e.g., SSAOEffectDesc)
 */
export declare class EffectHandle<T extends EffectDesc = EffectDesc> extends BaseHandle<T> {
}

declare type EffectInstance = Pass_2 | Pass<Pass_2, Effect_2>;

export declare type EffectOptions = {
    enabled?: boolean;
};

export declare type EffectUpdate = BaseDescConfigUpdate;

declare class ElevationDecoder {
    free(): void;
    [Symbol.dispose](): void;
    static japanGSI(): ElevationDecoder;
    static mapbox(): ElevationDecoder;
    constructor(r_scaler: number, g_scaler: number, b_scaler: number, offset: number, max_offset: number, min_offset: number, boundary: number, epsilon: number);
    static terrarium(): ElevationDecoder;
    b_scaler: number;
    boundary: number;
    epsilon: number;
    g_scaler: number;
    max_offset: number;
    min_offset: number;
    offset: number;
    r_scaler: number;
}

/** A DEM elevation raster colorized through the shared colormap. */
declare type ElevationHeatmapCompositeLayer = CompositeLayerBase & {
    kind: "elevationHeatmap";
    opacity: number;
    /**
     * Same Mercator latitude reprojection band as {@link RasterCompositeLayer}:
     * the heatmap decode samples the reprojected per-slot UV, so a DEM draped on
     * Geographic terrain (baked or direct) remaps identically to color imagery.
     */
    reproject?: [number, number];
};

/**
 * Elevation-heatmap render options for a `raster` layer. The elevation decoder
 * is taken from the referenced `raster-dem` source, not from here.
 */
declare class ElevationHeatmapMaterial {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    get logBoundary(): number | undefined;
    set logBoundary(value: number | null | undefined);
    get logarithmic(): boolean | undefined;
    set logarithmic(value: boolean | null | undefined);
    get maxHeight(): number | undefined;
    set maxHeight(value: number | null | undefined);
    get minHeight(): number | undefined;
    set minHeight(value: number | null | undefined);
}

/**
 * Wrapper class for geodesic calculations on an ellipsoid surface.
 * Precomputes common variables for optimization when instantiated.
 *
 * All latitudes/longitudes and headings are in **degrees**.
 *
 * @example
 * ```typescript
 * const geodesic = new EllipsoidGeodesic(
 *   { lat: 35.6812, lng: 139.7671, height: 0 },
 *   { lat: 34.7025, lng: 135.4959, height: 0 }
 * );
 *
 * console.log(geodesic.distance);
 * const points = geodesic.interpolatePoints(1000);
 * const midpoint = geodesic.interpolateDistance(geodesic.distance / 2);
 *
 * geodesic.dispose(); // Free WASM memory when done
 * ```
 */
export declare class EllipsoidGeodesic {
    private _raw;
    /**
     * Create a new geodesic between two points on the ellipsoid.
     * @param start - Start point in geodetic coordinates (lat/lng in degrees)
     * @param end - End point in geodetic coordinates (lat/lng in degrees)
     */
    constructor(start: LatLngHeight, end: LatLngHeight);
    /** Distance in meters between start and end points */
    get distance(): number;
    /**
     * Whether the geodesic solve converged. `false` for near-antipodal
     * endpoints, where `distance` is only a rough estimate and the
     * interpolation methods snap to the endpoints instead of following the
     * unreliable solution.
     */
    get converged(): boolean;
    /** Heading at the start point in degrees */
    get startHeading(): number;
    /** Heading at the end point in degrees */
    get endHeading(): number;
    /** Start point in geodetic coordinates (lat/lng in degrees) */
    get start(): LatLngHeight;
    /** End point in geodetic coordinates (lat/lng in degrees) */
    get end(): LatLngHeight;
    /**
     * Interpolate points along the geodesic path.
     * @param granularity - Distance between interpolated points in meters (optional)
     * @returns Array of interpolated points in geodetic coordinates (lat/lng in degrees)
     */
    interpolatePoints(granularity?: number): LatLngHeight[];
    /**
     * Interpolate a point at a specific distance along the geodesic path.
     * @param distance - Distance from start point in meters
     * @returns Interpolated point in geodetic coordinates (lat/lng in degrees)
     */
    interpolateDistance(distance: number): LatLngHeight;
    /**
     * Free WASM memory. Call this when the geodesic is no longer needed.
     */
    dispose(): void;
}

export declare type EmptyDescriptions = {
    mesh: undefined;
    light: undefined;
    effect: undefined;
};

/** Set a define only when it actually changes, to avoid needless program rebuilds. */
export declare function enableDefine(material: Material, key: string): void;

/**
 * Encodes a position into high and low precision Vector3 components for RTE (Relative-To-Eye) rendering.
 * This enables GPU double precision emulation by splitting a position into two float components.
 * @param original - Position to encode
 * @param resultHigh - Vector3 to store the high precision component (reused to avoid GC)
 * @param resultLow - Vector3 to store the low precision component (reused to avoid GC)
 */
export declare function encodePositionRTE(original: Vector3, resultHigh?: Vector3, resultLow?: Vector3): {
    high: Vector3;
    low: Vector3;
};

/** Enhanced material wrapper */
export declare type EnhancedMaterial<M extends Material, Props, States = unknown, Mutates = unknown> = {
    material: M;
    mount: (props: Props) => void;
    update: (props: Props) => void;
    states: () => States;
    mutates: () => Mutates;
};

declare class EntityEvent {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    gen: number;
    ind: number;
}

/**
 * Material properties that can be evaluated and modified per-feature.
 */
export declare type EvaluatableMaterialProperty = {
    /** Feature color expression from layer configuration. */
    color: AvailableMaterialProperty["color"];
    /** Feature visibility expression from layer configuration. */
    show: AvailableMaterialProperty["show"];
    /** Extruded height expression from layer configuration (for polygons). */
    extrudedHeight: AvailableMaterialProperty["extrudedHeight"];
    /** Height expression from layer configuration. */
    height: AvailableMaterialProperty["height"];
    /** Text content expression from layer configuration (for text). */
    text: AvailableMaterialProperty["text"];
    /** Line width expression from layer configuration (for polylines). */
    width: AvailableMaterialProperty["width"];
    /** Point/text size expression from layer configuration (for points/text). */
    size: AvailableMaterialProperty["size"];
    /** Opacity expression from layer configuration (for polygons/points/text where supported). */
    opacity: AvailableMaterialProperty["opacity"];
    /** Per-feature declutter placement priority (for points/billboards/text);
     *  higher wins an overlap. Overrides the layer's `declutterPriority`. */
    declutterPriority: AvailableMaterialProperty["declutterPriority"];
    /** Image URL for billboards; packed into a shared per-mesh texture atlas. */
    image: string;
    /** Whether this label/sprite stands up (`"upright"`) or lies on the globe
     *  surface (`"flat"`). Overrides the material's
     *  `textFacing`/`billboardFacing`/`pointFacing` for this feature. */
    facing: "upright" | "flat";
    /** Whether this label/sprite turns to follow the camera. Overrides the
     *  material's `rotateWithCamera` for this feature. */
    rotateWithCamera: boolean;
    /** In-plane rotation of this label/sprite about its anchor, in degrees,
     *  clockwise seen from the front. Overrides the material's `rotation`. */
    rotation: number;
    /** Emissive color expression (for polygons/3D Tiles models/points/billboards/text). */
    emissive: AvailableMaterialProperty["emissiveColor"];
    /** Emissive intensity expression (for polygons/3D Tiles models/points/billboards/text). */
    emissiveIntensity: AvailableMaterialProperty["emissiveIntensity"];
};

declare type EvaluatableMaterialPropertyKey = keyof EvaluatableMaterialProperty;

declare type EvaluatedMaterialProperty = {
    color: Color;
    show: boolean;
    extrudedHeight: number;
    height: number;
    text: string;
    width: number;
    size: number;
    opacity: number;
    declutterPriority: number;
    image: string | null;
    facing: "upright" | "flat";
    rotateWithCamera: boolean;
    rotation: number;
    emissive: Color;
    emissiveIntensity: number;
};

/**
 * The evaluated values that can be returned from the evaluate callback.
 * All properties are optional - only return the ones you want to modify.
 */
export declare type EvaluatedValue = {
    [K in EvaluatableMaterialPropertyKey]: EvaluatedMaterialProperty[K];
};

/**
 * EventContext bundles all the shared state needed to process engine events
 * and propagate them into each processor.
 */
declare class EventContext {
    readonly eventManager: EventManager;
    readonly scenes: Scenes;
    readonly camera: ThreeViewCamera;
    readonly meshes: MeshCache;
    readonly abortControllers: AbortControllers;
    readonly buf: BufferLoader;
    readonly texFragment: TextureFragmentHandler;
    readonly tileHandler: TileHandler;
    readonly workerTaskHandler: WorkerTaskHandler;
    readonly meshHandler: MeshHandler;
    readonly featureHandler: FeatureHandler;
    readonly loadedTexs: Map<string, Texture>;
    readonly workerPoolPromises: WorkerPoolPromises;
    readonly uniforms: CommonUniforms;
    readonly texturizedSceneByTileCoordinates: TexturizedSceneByTileCoordinates;
    readonly tileTextureCompositor: TileTextureCompositor;
    readonly tileMapByHandle: TileMapByHandle;
    readonly textureOptions: TextureOptions;
    readonly renderFlag: RenderFlag;
    readonly viewEvents: EventHandler<ViewEvents>;
    readonly layersManager: LayersManager;
    readonly viewContext: ViewContext;
    readonly flightHandler: FlightHandler;
    readonly layerHandler?: LayerHandler;
    readonly fontManager?: FontManager;
    readonly textureFragmentIndex?: Map<string, Set<TextureSlot>>;
    readonly tileMeshToFragmentIds?: Map<TileMesh, Set<string>>;
    readonly hillshadeContext?: HillshadeContext;
    /** Shared screen-space label declutterer; text/sprite meshes register as
     *  participants on creation. Optional so headless contexts can skip it. */
    readonly declutter?: DeclutterManager;
    updatedAt: number;
    constructor(args: EventContextArgs);
}

declare type EventContextArgs = {
    eventManager: EventManager;
    scenes: Scenes;
    camera: ThreeViewCamera;
    meshes: MeshCache;
    abortControllers: AbortControllers;
    buf: BufferLoader;
    texFragment: TextureFragmentHandler;
    tileHandler: TileHandler;
    workerTaskHandler: WorkerTaskHandler;
    meshHandler: MeshHandler;
    featureHandler: FeatureHandler;
    loadedTexs: Map<string, Texture>;
    workerPoolPromises: WorkerPoolPromises;
    uniforms: CommonUniforms;
    texturizedSceneByTileCoordinates: TexturizedSceneByTileCoordinates;
    tileTextureCompositor: TileTextureCompositor;
    tileMapByHandle: TileMapByHandle;
    textureOptions: TextureOptions;
    renderFlag: RenderFlag;
    viewEvents: EventHandler<ViewEvents>;
    layersManager: LayersManager;
    viewContext: ViewContext;
    flightHandler: FlightHandler;
    layerHandler?: LayerHandler;
    fontManager?: FontManager;
    textureFragmentIndex?: Map<string, Set<TextureSlot>>;
    tileMeshToFragmentIds?: Map<TileMesh, Set<string>>;
    hillshadeContext?: HillshadeContext;
    declutter?: DeclutterManager;
};

export declare class EventHandler<T extends BaseEventMap = BaseEventMap, K extends keyof T = keyof T> {
    events: {
        [E in K]?: Set<T[E]>;
    };
    onceEvents: {
        [E in K]?: Set<T[E]>;
    };
    on<E extends K>(k: E, f: T[E]): void;
    off<E extends K>(k: E, f: T[E]): void;
    clear<E extends K>(k: E): void;
    size<E extends K>(k: E): number | undefined;
    /**
     * Register a callback that will be executed only once and then removed
     */
    once<E extends K>(k: E, f: T[E]): void;
    emit<E extends K>(k: E, ...args: Parameters<T[E]>): void;
}

declare class EventManager {
    stacks: EventsStacks;
    addedEventIds: Map<string, Set<unknown>>;
    private sortedLengths;
    private transactionManager;
    needsUpdate(): boolean;
    pushEvents(events: Events | undefined): void;
    forEachStack<Key extends JsEventsKey>(key: Key, cb: (value: GetJsEventValue<Key>) => void, max?: number): void;
    /** Order the stack for dispatch. Pushes only append, so only the events
     * added since the last pass are sorted and merged into the already sorted
     * prefix (the prefix wins ties, keeping equal keys FIFO). */
    private sortPending;
    private removeAt;
    forEachStackAsync<Key extends JsEventsKey>(key: Key, cb: (value: GetJsEventValue<Key>) => Promise<void>, max?: number, shouldProcess?: (value: GetJsEventValue<Key>) => boolean, order?: (a: GetJsEventValue<Key>, b: GetJsEventValue<Key>) => number): Promise<void>;
    removeDuplicatedTransactionEvents<AddKey extends JsEventsKey, RemoveKey extends JsEventsKey, ChangeKey extends JsEventsKey>(options: TransactionProcessOption<AddKey, RemoveKey, ChangeKey>): void;
    removeStacksByIndices(key: JsEventsKey, removedIndices: Set<number>): void;
    processTransactionEvents<AddKey extends JsEventsKey, RemoveKey extends JsEventsKey, ChangeKey extends JsEventsKey>(transactionKey: string, options: TransactionProcessOption<AddKey, RemoveKey, ChangeKey>, cb: (ev: TransactionCallbackParams<AddKey, RemoveKey, ChangeKey>) => Promise<void>, handlers?: {
        shouldProcess?: (ev: TransactionCallbackParams<AddKey, RemoveKey, ChangeKey>) => boolean;
        generateEventId?: (ev: TransactionCallbackParams<AddKey, RemoveKey, ChangeKey>) => string;
        onAbort?: (ev: GetJsEventValue<RemoveKey>) => void | Promise<void>;
    }): void;
}

declare class Events {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    take_camera_flight_ended(): CameraFlightEndedEvent[];
    take_camera_frustum_updated(): CameraFrustum_2 | undefined;
    take_camera_transform_updated(): Transform_2 | undefined;
    take_data_requested(): DataRequestEvent[];
    take_data_requester_removed(): DataRequesterRemovedEvent[];
    take_hillshade_backfilled(): HillshadeBackfilledEvent[];
    take_hillshade_canceled(): EntityEvent[];
    take_mesh_added(): MeshAdded[];
    take_mesh_geometry_replaced(): MeshGeometryReplaced[];
    take_mesh_removed(): EntityEvent[];
    take_mesh_updated(): MeshChanged[];
    take_object_transform_updated(): ObjectTransformEvent[];
    take_renderable_feature_added(): RenderableFeatureAddedEvent[];
    take_renderable_feature_changed(): RenderableFeatureChangedEvent[];
    take_renderable_feature_removed(): RenderableFeatureRemovedEvent[];
    take_texture_fragment_removed(): EntityEvent[];
    take_texture_fragment_requested(): TextureFragmentRequestedEvent[];
    take_update_sample_terrain_height(): TerrainHeightUpdatedEvent[];
    take_update_terrain_height_range(): TerrainHeightRangeUpdatedEvent[];
    take_worker_task_delegated(): WorkerTaskDelegatedEvent[];
    take_worker_task_removed(): EntityEvent[];
}

declare type EventsStacks = {
    [K in JsEventsKey]-?: JsEvents[K] extends unknown[] ? JsEvents[K] : JsEvents[K][];
};

declare class ExtentRadianF32 {
    free(): void;
    [Symbol.dispose](): void;
    constructor(west: number, south: number, east: number, north: number);
    east: number;
    north: number;
    south: number;
    west: number;
}

declare type ExtractProperties<T> = {
    [K in keyof T]?: T[K] extends (...args: any) => any ? ReturnType<T[K]> extends (...args: any) => any ? ExtractProperties<ReturnType<T[K]>> : ReturnType<T[K]> : Partial<T[K]>;
};

/**
 * Whether a label or sprite stands up (`"upright"`, the default) or lies on
 * the globe surface around its anchor (`"flat"`), following its curvature so
 * it reads as painted on the surface. The value of `textFacing` / `billboardFacing` / `pointFacing`.
 * Pair with `rotateWithCamera`, which chooses whether the quad turns to
 * follow the camera or stays frozen in the anchor's east-north-up frame.
 */
export declare type Facing = "upright" | "flat";

export declare type FeatureCreatedParams = {
    featureSetId: FeatureSetId;
    evaluator: FeatureEvaluator;
    credit?: string;
};

/**
 * Provides access to feature data and allows dynamic styling of features based on their properties.
 * Received through the `featureCreated` and `featureUpdated` events on a Layer.
 *
 * Use this class to:
 * - Read feature properties from the data source
 * - Dynamically style features based on their properties
 *
 * @example
 * ```typescript
 * // Style 3D Tiles buildings by height
 * layer.on("featureUpdated", (evaluator) => {
 *   evaluator.evaluate(({ properties }) => {
 *     const measuredHeight = properties?.["height"] as number;
 *
 *     // Color and visibility based on building height
 *     const color = (() => {
 *       if (measuredHeight < 30) return new Color().setStyle("#00ff00");
 *       if (measuredHeight < 60) return new Color().setStyle("#ffff00");
 *       if (measuredHeight < 90) return new Color().setStyle("#ff00ff");
 *       return new Color().setStyle("#ff0000");
 *     })();
 *
 *     return {
 *       color,
 *       show: measuredHeight >= 30, // Hide small buildings
 *     };
 *   });
 * });
 *
 * // Style GeoJSON polygons with extrusion based on properties
 * layer.on("featureUpdated", (evaluator) => {
 *   evaluator.evaluate(({ properties }) => {
 *     const height = (properties?.["height"] as number) ?? 0;
 *     const extrudedHeight = (properties?.["extrudedHeight"] as number) ?? 0;
 *
 *     return {
 *       height,
 *       extrudedHeight,
 *     };
 *   });
 * });
 *
 * // Re-evaluate styles
 * const onChange = () => {
 *   layer.forceUpdate(); // Triggers featureUpdated events
 * };
 * ```
 */
export declare class FeatureEvaluator {
    private handler;
    private layerId;
    private featureSetId;
    private cachedBatchedProperties?;
    private filterCacheKey?;
    private cachedFilteredProperties?;
    private batchIds;
    /**
     * The underlying Three.js object representing this feature.
     * Can be used for advanced manipulation, but prefer using `evaluate()` for styling.
     */
    private obj;
    constructor(handler: FeatureHandler, layerId: LayerId, featureSetId: FeatureSetId, obj: Object3D);
    /**
     * Track objects we've already warned about to avoid log spam.
     * Uses WeakSet so objects can be garbage collected.
     */
    private static readonly warnedObjects;
    /**
     * Type guard to check if an Object3D has a geometryType getter.
     */
    private hasGeometryType;
    /**
     * Determine geometry type from the mesh object.
     * Reads geometryType getter if available on the mesh.
     * Validates that the returned value is a valid GeometryType literal.
     */
    private determineGeometryType;
    /**
     * Gets the unique identifier of this feature set.
     */
    get id(): bigint;
    /**
     * Reads the properties of this feature from the data source.
     * The callback is invoked for each batch within this feature.
     *
     * @param f - Callback function that receives feature info for each batch
     *
     * @example
     * ```typescript
     * // Log all properties
     * evaluator.readFeatureProperties(({ batchId, properties }) => {
     *   console.log(`Batch ${batchId}:`, properties);
     * });
     *
     * // Access nested JSON attributes (common in MVT/PLATEAU data)
     * evaluator.readFeatureProperties(({ properties }) => {
     *   const attributes = JSON.parse((properties?.["attributes"] as string) ?? "{}");
     *   const minHeight = attributes["minHeight"];
     *   const maxHeight = attributes["maxHeight"];
     * });
     * ```
     */
    readFeatureProperties(f: (info: FeatureInfo, batchIndex: number) => void): void;
    /**
     * Reads only the specified root properties of this feature.
     * This is more efficient than `readFeatureProperties` when only a few properties are needed.
     *
     * @param keys - Array of property key names to read
     * @param f - Callback function that receives feature info for each batch
     *
     * @example
     * ```typescript
     * evaluator.readFilteredFeatureProperties(["height", "name"], ({ batchId, properties }) => {
     *   const { height, name } = properties;
     * });
     * ```
     */
    readFilteredFeatureProperties(keys: string[], f: (info: FeatureInfo, batchIndex: number) => void): void;
    /**
     * Evaluates and applies dynamic styles to features based on their properties.
     * The callback is invoked for each batch (sub-feature) within this feature.
     *
     * Supported style properties:
     * - `color` - Feature color (use `new Color()`)
     * - `show` - Feature visibility (boolean)
     * - `height` - Feature height in meters
     * - `extrudedHeight` - Extrusion height for polygons in meters
     * - `text` - Label text content (for text/label features)
     * - `width` - Line width in pixels (for polylines)
     * - `size` - Feature size in pixels (for points/text)
     * - `opacity` - Feature opacity 0-1
     * - `declutterPriority` - Placement priority for decluttering; higher wins
     *   an overlap (for points/billboards/text with `declutter` enabled)
     * - `image` - Image URL (for billboards); loaded once per distinct URL and
     *   packed into the layer's texture atlas. Return `null` to clear a
     *   previous per-feature image and revert to the material's default `url`;
     *   omit the key to leave it unchanged.
     * - `emissive` - Emissive color (for batched polygons/3D Tiles models/
     *   points/billboards/text; ignored on models without batch/feature ids).
     *   Pairs with `emissiveIntensity` and drives selective bloom. On text only
     *   the glyph fill glows — outline and background stay dark.
     * - `emissiveIntensity` - Emissive intensity multiplier (for batched
     *   polygons/3D Tiles models/points/billboards/text)
     *
     * Note: Evaluated styles override the layer's default styles.
     *
     * @param f Callback function that receives feature info, returns style values
     * @param options.filters - Root property's keys that get only the matched property values.
     *
     * @example
     * ```typescript
     * // Color MVT features based on a category property
     * evaluator.evaluate(({ properties }) => {
     *   const category = properties?.["category"] as string;
     *
     *   const color = (() => {
     *     if (category === "A") return "#0000ff";
     *     if (category === "B") return "#00ff00";
     *     return "#ff0000";
     *   })();
     *
     *   return {
     *     color: new Color().setStyle(color),
     *   };
     * });
     *
     * // Filter and style text labels
     * evaluator.evaluate(({ properties }) => {
     *   const text = properties?.["name"] as string;
     *
     *   return {
     *     text,
     *     show: !!text,
     *   };
     * });
     * ```
     */
    evaluate(f: FeatureEvaluatorCallback, options?: {
        filters?: string[];
    }): void;
    private applyEvaluatedValues;
    private apply;
}

/**
 * Callback function type for feature evaluator operations.
 */
export declare type FeatureEvaluatorCallback = (info: FeatureInfo) => Partial<EvaluatedValue>;

declare type FeatureHandler = {
    getTransferablePolygonBatchedFeature: (bits: bigint) => ReturnedTransferablePolygonBatchedFeature | undefined;
    getTransferablePolylineBatchedFeature: (bits: bigint) => ReturnedTransferablePolylineBatchedFeature | undefined;
    markFeatureIsRendered: (type: "point" | "polyline" | "polygon" | "model", bits: bigint) => void;
    /** Reports a rendered feature's actual measured GPU byte size so the memory
     * ledger replaces its payload-based estimate. Feature kinds the engine has
     * no owner lookup for are a no-op (currently wired: 3D Tiles models, whose
     * post-glTF/Draco-decode size undercounts otherwise). */
    reportFeatureGpuBytes: (bits: bigint, bytes: number) => void;
    readAllBatchedProperties(bits: bigint, callback: (batchIdx: number, batchId: number, properties?: Record<string, unknown>) => void): void;
    readFilteredBatchedProperties(bits: bigint, keys: string[], callback: (batchIdx: number, batchId: number, filtered?: unknown[]) => void): void;
};

/**
 * Information about a feature batch, passed to evaluation callbacks.
 */
export declare type FeatureInfo = {
    /**
     * The feature's canonical global batch id (its first instance's id when a
     * feature spans several instances, e.g. MultiPoint). Pick events report the
     * same canonical id, so picks and evaluations correlate through this field.
     */
    batchId: number;
    properties: Record<string, unknown> | undefined;
    layerId: LayerId | undefined;
    /** Mesh geometry type (e.g., "billboard", "text"). Not GeoJSON geometry ("Point", "Polygon"). */
    meshGeomType?: GeometryType;
};

export declare class FeatureMesh {
    _setFeatureColor(_color: Color_3, _material?: Material): void;
    _getFeatureColor(): Color_3;
    _setFeatureShow(_visible: boolean): void;
    _setFeatureHeight(_height: number): void;
    _setFeatureOpacity(_opacity: number): void;
    _setFrustumCulled(_culled: boolean): void;
}

export declare type FeatureRemovedParams = {
    featureSetId: FeatureSetId;
};

declare type FeatureSetId = bigint;

export declare type FeatureUpdatedParams = {
    featureSetId: FeatureSetId;
    evaluator: FeatureEvaluator;
    updatedAt: number;
};

export declare type FeatureVisibilityChangedParams = {
    featureSetId: FeatureSetId;
    visible: boolean;
};

export { FetchCssFontFamilyOptions }

export { fetchFontFamilyFromCss }

export declare class FinalCopyEffectDesc extends EffectDesc<FinalCopyPassConfig, FinalCopyPassUpdate, CopyPass> {
    static key: string;
    createPass(): CopyPass;
}

export declare type FinalCopyPassConfig = Description & EffectConfig;

export declare type FinalCopyPassUpdate = Description & EffectUpdate;

/** Settles the pending `flyTo` promise registered under `id`. */
declare type FlightHandler = (id: number, completed: boolean) => void;

/**
 * Upload pending textures and accumulated dirty spans to the GPU. Called once
 * per frame by the view's main loop, after event processing (which performs
 * the writes) and before rendering.
 */
export declare function flushBatchTextureUpdates(renderer: WebGLRenderer): void;

/** Easing presets applied to a `flyTo` flight's normalized time. */
export declare type FlyToEasing = "linear" | "quadInOut" | "cubicInOut" | "cubicOut" | "quinticInOut";

export declare type FlyToOptions = {
    /** Animation duration in milliseconds. Defaults to a duration derived from
     * the flight distance (2–3 s). Pass `0` to jump instantly. */
    duration?: number;
    /** Maximum height during the flight arc in meters. */
    maxHeight?: number;
    /** Easing preset. Defaults to `"quinticInOut"`, or `"cubicOut"` when
     * descending from above 11,500 m. */
    easing?: FlyToEasing;
};

export { FontFace_2 as FontFace }

export { FontFamily }

export { FontWorkerMemoryStats }

/**
 * The subset backed by an MRT attachment. `globeNormal` is not one of them —
 * it is a separate copy target — so it must not take an attachment slot, a
 * `*_LOCATION` define, or a `MAX_DRAW_BUFFERS` slot.
 */
export declare const GBUFFER_ATTACHMENT_NAMES: readonly ["normal", "selectiveEffect", "emissive", "shadow"];

/** Stampers iterate this so defines of disabled buffers are cleared, not left stale. */
export declare const GBUFFER_DEFINE_NAMES: readonly ["GBUFFER_NORMAL_LOCATION", "USE_GBUFFER_SELECTIVE_EFFECT", "GBUFFER_EFFECT_ID_LOCATION", "USE_GBUFFER_EMISSIVE", "GBUFFER_EMISSIVE_LOCATION", "USE_GBUFFER_SHADOW", "GBUFFER_SHADOW_LOCATION"];

/** Output location of the effectIds buffer. Mirrored in the GLSL chunk. */
export declare const GBUFFER_EFFECT_ID_LOCATION_DEFINE = "GBUFFER_EFFECT_ID_LOCATION";

/**
 * Selective-effect writes for built-in `ShaderLib` materials. The tile mesh
 * replaces this by exact string match with
 * `TILE_EMISSIVE_EFFECT_BUFFER_REPLACEMENT`.
 *
 * Under `USE_BATCH_EMISSIVE` the per-feature fold replaces the whole
 * expression — mirroring the lit path, where it replaces
 * `totalEmissiveRadiance` — so per-feature `emissiveIntensity: 0` really
 * excludes a feature from bloom even when the layer's `uEmissiveIntensity`
 * would otherwise keep the diffuse term contributing.
 *
 * Effect writes are always macro invocations: the macros own the alpha, which
 * is the per-attachment blend factor rather than data (see the pars chunk).
 */
export declare const GBUFFER_EFFECT_WRITE_BUILTIN = "GBUFFER_WRITE_EFFECT(uEffectIdsMask, NVR_BATCH_EMISSIVE_OR(diffuseColor.rgb * uEmissiveIntensity + emissive))";

/**
 * Selective-effect writes for materials that support the effect-id mask but
 * not emissive (LineMaterial, sprite, points).
 */
export declare const GBUFFER_EFFECT_WRITE_ID_ONLY = "GBUFFER_WRITE_EFFECT_ID_ONLY(uEffectIdsMask)";

/**
 * Selective-effect writes for custom `ShaderMaterial`
 * (emissive = (fragColor + uEmissiveColor) × intensity).
 */
export declare const GBUFFER_EFFECT_WRITE_SHADER_MATERIAL = "GBUFFER_WRITE_EFFECT(uEffectIdsMask, (gl_FragColor.rgb + uEmissiveColor) * uEmissiveIntensity)";

/** Non-selective default — A=0.0, so a blended mesh keeps what is behind it. */
export declare const GBUFFER_EFFECT_WRITE_ZERO = "GBUFFER_WRITE_EFFECT_ZERO";

/** Output location of the emissive buffer. Mirrored in the GLSL chunk. */
export declare const GBUFFER_EMISSIVE_LOCATION_DEFINE = "GBUFFER_EMISSIVE_LOCATION";

/** Output location of the normal buffer. Mirrored in the GLSL chunk. */
export declare const GBUFFER_NORMAL_LOCATION_DEFINE = "GBUFFER_NORMAL_LOCATION";

/**
 * `normalBuffer` write for non-physical materials (basic/lambert/phong).
 * These have no reflectance at normal incidence — three's `reflectivity` is an
 * env-map mix weight defaulting to 1 — so B is 0; `polygonBaseEnhancer` and
 * the tile mesh match/replace this exact string to write their own.
 */
export declare const GBUFFER_NORMAL_WRITE_BASIC = "GBUFFER_WRITE_NORMAL(normal, 0.0, roughnessFactor)";

/**
 * `normalBuffer` write for physically-based materials (standard/physical).
 * B is the material's metalness as is, so readers take it as the F0 directly:
 * 0 does not reflect and 1 is a mirror.
 * `modelBaseEnhancer` matches/replaces this exact string.
 */
export declare const GBUFFER_NORMAL_WRITE_PHYSICAL = "GBUFFER_WRITE_NORMAL(normal, metalnessFactor, roughnessFactor)";

/**
 * Inject once near the top of any fragment shader rendering into the
 * G-buffer. Raw `.glsl` shaders `#include` the chunk instead.
 */
export declare const GBUFFER_PARS_FRAGMENT: string;

/**
 * Default `roughness` of materials without a PBR roughness of their own
 * (polygons, tile slots). They shade with Phong at shininess 50; inverting
 * `roughnessToSpecularPower` (`shininess = 2 / roughness^4 - 2`) gives
 * `sqrt(sqrt(2 / 52))`.
 */
export declare const GBUFFER_PHONG_ROUGHNESS: number;

/** Output location of the shadow buffer. Mirrored in the GLSL chunk. */
export declare const GBUFFER_SHADOW_LOCATION_DEFINE = "GBUFFER_SHADOW_LOCATION";

/** The only attachment that always exists. The rest are packed after it. */
export declare const GBUFFER_TEXTURE_INDEX: {
    readonly color: 0;
};

/** Names an effect can declare in `requiredBuffers`. */
export declare type GBufferName = "normal" | "selectiveEffect" | "emissive" | "shadow" | "globeNormal";

/**
 * Per-view buffer configuration. Not set by the user - derived as the union
 * of the active effects' `requiredBuffers`. A disabled buffer costs nothing:
 * neither the storage nor the shader-side writes exist. Only
 * {@link GBUFFER_ATTACHMENT_NAMES} are MRT attachments.
 */
export declare type GBufferOptions = {
    /**
     * The view-space normal buffer (RG=octahedral normal, B=reflectance at
     * normal incidence (F0), A=roughness *and* the blend factor). Required by every
     * normal-reading effect (aerial perspective, SSR, fog light) and,
     * via {@link globeNormal}, by draped meshes.
     */
    normal?: boolean;
    /**
     * The selective-effect id buffer (R=bitmask), required by buffer-based
     * selective effects (`selectiveBloom`, `selectiveOutline`).
     */
    selectiveEffect?: boolean;
    /**
     * The HDR emissive buffer (RGB=emissive), required by `selectiveBloom`
     * extraction.
     */
    emissive?: boolean;
    /**
     * The shadow buffer (R=directional/CSM shadow amount, 0=lit,
     * 1=fully shadowed). Required by the aerial perspective's `shadow`
     * option; a custom effect reads per-pixel shadowing by declaring it in
     * `requiredBuffers`.
     */
    shadow?: boolean;
    /**
     * The globe normal copy (the terrain's view-space normal, sampled in screen
     * space). Kept at 1x1 unless a draped mesh needs it, so an effect reading
     * `getGlobeNormalTexture()` has to declare it.
     */
    globeNormal?: boolean;
};

/**
 * Attachment indices for one view. A disabled buffer is absent rather than a
 * placeholder, so these shift — never hardcode them.
 */
export declare type GBufferTextureIndex = {
    color: typeof GBUFFER_TEXTURE_INDEX.color;
    /** Present only when `buffers.normal` is enabled. */
    normal?: number;
    /** Present only when `buffers.selectiveEffect` is enabled. */
    effectIds?: number;
    /** Present only when `buffers.emissive` is enabled. */
    emissive?: number;
    /** Present only when `buffers.shadow` is enabled. */
    shadow?: number;
};

/**
 * Goes after `#include <common>` in the fragment shader. Declares the three
 * atlas samplers + the per-slot uniform arrays we still index by winning
 * slot. Adds varying for the original UV.
 */
export declare function generateTileCommonInjection(numTextures: number): string;

/**
 * Goes in place of `#include <map_fragment>`. Reads the three atlas textures
 * once, decodes the winning slot index, and (when present) pulls per-slot
 * precision-sensitive attrs by dynamic indexing. Picking suppresses the
 * raster contribution by masking colour with the attr's isTexturized flag.
 *
 * `texturizedSceneIndexFrom` is captured at material-build time (used by
 * generateTileEmissiveBuffer below to decide what gets written to the
 * emissive/effect MRT attachments).
 */
export declare function generateTileMapFragment(maxTextures: number, features: TileShaderFeatures): string;

/**
 * Goes in place of `#include <normal_fragment_maps>`. When the atlas carries
 * a hillshade normal, transform it tangent→view via TBN like the legacy
 * unrolled loop did, but with a single normal-atlas read. Then optionally
 * compute water/specular contribution.
 */
export declare function generateTileNormalFragmentMaps(features: TileShaderFeatures): string;

/**
 * High-level geographic placement of a mesh object.
 *
 * All angles are in **degrees** and `height` is in metres, matching
 * `ThreeView.setCamera`. The asset is oriented in a West-Up-North tangent
 * frame, which matches glTF's own convention (front `+Z`, up `+Y`,
 * right `-X`) on all three axes — so an unmodified glTF asset needs no
 * up-axis correction.
 */
export declare type GeodeticPlacement = {
    /** Longitude in degrees. */
    lng: number;
    /** Latitude in degrees. */
    lat: number;
    /**
     * Metres above the ellipsoid, or above terrain when `heightReference` is
     * `"terrain"`. Defaults to 0.
     */
    height?: number;
    /**
     * Degrees clockwise from north that the asset's front (glTF `+Z`) faces.
     * Same convention as `setCamera`'s heading. Defaults to 0.
     */
    heading?: number;
    /** Degrees, nose up positive. Defaults to 0. */
    pitch?: number;
    /** Degrees, right wing down positive. Defaults to 0. */
    roll?: number;
    /** Uniform or per-axis scale of the frame. Defaults to 1. */
    scale?: number | XYZ;
    /** How `height` is interpreted. Defaults to `"ellipsoid"`. */
    heightReference?: "ellipsoid" | "terrain";
};

/**
 * Computes the surface normal vector at a geodetic position on the WGS84 ellipsoid.
 * @param lle - Geodetic coordinates (lng in degrees, lat in degrees, height in meters)
 * @returns Unit normal vector pointing outward from the ellipsoid surface
 */
export declare function geodeticSurfaceNormal(lle: LatLngHeight): Vector3;

/**
 * Converts geodetic coordinates (longitude, latitude, height) to a Cartesian Vector3 in ECEF coordinates.
 * @param lle - Geodetic coordinates (lng in degrees, lat in degrees, height in meters)
 * @returns Cartesian Vector3 in Earth-Centered Earth-Fixed (ECEF) coordinates
 */
export declare function geodeticToVector3(lle: LatLngHeight): Vector3;

/** A geographic bounding box, in degrees. */
export declare type GeographicExtent = {
    west: number;
    south: number;
    east: number;
    north: number;
};

/** A `geojson` source: inline GeoJSON, or GeoJSON fetched from a `url`. */
export declare type GeoJsonSource = SourceBase & Omit<WithColorSupport<Layer_2<GeoJsonSourceDescription & {
    type: "geojson";
}>>, "data"> & {
    /** Inline GeoJSON. Use `url` instead to fetch from a URL. */
    data?: FeatureCollection | Feature | Geometry;
};

declare class GeoJsonSourceDescription {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    get crs(): string | undefined;
    set crs(value: string | null | undefined);
    /**
     * Inline GeoJSON document (`FeatureCollection` / `Feature` / `Geometry`).
     * Used when `url` is not given.
     */
    data: any;
    /**
     * Whether to build a tiled spatial index (GeoJSON-VT) for large datasets.
     */
    get tiled(): boolean | undefined;
    /**
     * Whether to build a tiled spatial index (GeoJSON-VT) for large datasets.
     */
    set tiled(value: boolean | null | undefined);
    get type(): string | undefined;
    set type(value: string | null | undefined);
    /**
     * URL to fetch the GeoJSON document from. Mutually exclusive with `data`;
     * like the other sources, the URL is given directly at the top level.
     */
    get url(): string | undefined;
    /**
     * URL to fetch the GeoJSON document from. Mutually exclusive with `data`;
     * like the other sources, the URL is given directly at the top level.
     */
    set url(value: string | null | undefined);
}

/**
 * Geometry type constants for mesh objects.
 * These types are used for feature evaluation and runtime validation.
 */
export declare const GEOMETRY_TYPES: {
    readonly Billboard: "billboard";
    readonly Text: "text";
    readonly Point: "point";
    readonly Polyline: "polyline";
    readonly Polygon: "polygon";
    readonly Model: "model";
};

/** Flat `[lng, lat, height, ...]`, or ECEF `[x, y, z, ...]` when geocentric. */
export declare type GeometryRing = Float64Array;

/**
 * Type representing a valid geometry type value.
 */
export declare type GeometryType = (typeof GEOMETRY_TYPES)[keyof typeof GEOMETRY_TYPES];

export declare function getBatchDataTexture(material: Material): DataTexture | undefined;

export declare function getBatchTextureLayout(material: Material): BatchTextureLayout | undefined;

export declare function getBatchTextureUniform(material: Material): BatchTextureUniform | undefined;

/**
 * Default tile-cache memory budget (`Options.cacheBytes`) for the current
 * device. Desktop: a quarter of the reported device memory, capped at 2GB.
 * Mobile: 512MB unless the device explicitly reports < 4GB (then 256MB) —
 * "unreported" counts as the 512MB tier because iOS Safari never exposes
 * `navigator.deviceMemory` while modern iPhones/iPads have 4-8GB of RAM.
 */
export declare function getDefaultCacheBytes(inputs?: DefaultCacheBytesInputs): number;

/** Default dynamic-SSE settings (device-independent for now). */
export declare function getDefaultDynamicSse(): DynamicSseSettings;

/**
 * Default LOD fog settings for the current device, scaled by the reported
 * device memory: low-memory devices get a stronger distance-based LOD
 * degrade so the tile working set stays small.
 */
export declare function getDefaultLodFog(inputs?: DefaultCacheBytesInputs): LodFogSettings;

/**
 * Default memory budgets for the current device. The tile-worker share is a
 * quarter (desktop) or an eighth (mobile) of the reported device memory,
 * split across the pool and clamped to [64MB, 256MB desktop / 64MB mobile]
 * per worker (mobile workers pin at the floor) — on an 8GB desktop with an
 * 8-worker pool this matches the
 * historical fixed values exactly; low-memory devices shrink together.
 * Browsers without `navigator.deviceMemory` fall back to the caps.
 */
export declare function getDefaultMemoryBudgets(inputs: DefaultMemoryBudgetsInputs): MemoryBudgets;

/**
 * Computes the height of a point above the WGS84 ellipsoid surface.
 * @param point - Position in ECEF coordinates
 * @returns Height above the ellipsoid in meters
 */
export declare function getHeightFromEllipsoid(point: Vector3): number;

declare type GetJsEventValue<K extends JsEventsKey> = EventsStacks[K] extends unknown[] ? EventsStacks[K][number] : EventsStacks[K];

/**
 * Creates a picking ray from screen coordinates for raycasting.
 * @param window - Window configuration with width, height, and pixelRatio
 * @param camera - Three.js PerspectiveCamera
 * @param vec2 - Screen coordinates in CSS pixels (same as MouseEvent clientX/clientY)
 * @returns A Ray starting from the camera through the screen point
 */
export declare function getPickRay(windowObject: Window_2, camera: PerspectiveCamera, vec2: Vector2): Ray_3;

/**
 * Creates a plane from a point and a normal vector.
 * @param point - A point on the plane
 * @param normal - The normal vector of the plane
 * @returns A Plane object defined by the point and normal
 */
export declare function getPlaneFromPointNormal(point: Vector3, normal: Vector3): Plane_3;

/**
 * Computes the intersection point between a ray and a plane.
 * @param ray - The ray to test
 * @param plane - The plane to intersect with
 * @returns Intersection point Vector3 or undefined if no intersection
 */
export declare function getRayPlaneIntersection(ray: Ray_3, plane: Plane_3): Vector3 | undefined;

/**
 * Returns the WGS84 ellipsoid first eccentricity.
 * @returns Eccentricity value
 */
export declare function getWGS84Eccentricity(): number;

/**
 * Returns the WGS84 ellipsoid first eccentricity squared.
 * @returns Eccentricity squared value
 */
export declare function getWGS84EccentricitySquared(): number;

/**
 * Returns the WGS84 ellipsoid flattening ratio.
 * @returns Flattening value (approximately 1/298.257)
 */
export declare function getWGS84Flattening(): number;

/**
 * Returns the WGS84 ellipsoid semi-major axis (equatorial radius) in meters.
 * @returns Semi-major axis (approximately 6,378,137 meters)
 */
export declare function getWGS84SemiMajorAxis(): number;

/**
 * Returns the WGS84 ellipsoid semi-minor axis (polar radius) in meters.
 * @returns Semi-minor axis (approximately 6,356,752 meters)
 */
export declare function getWGS84SemiMinorAxis(): number;

/**
 * Globe configuration manager.
 *
 * Provides an interface for accessing and modifying globe properties
 * that are shared across different material types (VectorTile, RasterTile, RasterTerrain).
 */
export declare class Globe implements Omit<RemoveFreeRecursively<Globe_2>, "elevationColormap" | "color" | "isGeographicTiling"> {
    private handler;
    private _elevationColormap?;
    constructor(handler: GlobeHandler, options?: GlobeOptions);
    setOptions(options?: GlobeOptions): void;
    get maxSse(): number;
    set maxSse(value: number);
    get segments(): number;
    set segments(value: number);
    get color(): Color_2 | undefined;
    set color(value: Color_2);
    get hideUnderground(): boolean;
    set hideUnderground(value: boolean);
    get useNormal(): boolean;
    set useNormal(value: boolean);
    get transparent(): boolean;
    set transparent(value: boolean);
    get opacity(): number;
    set opacity(value: number);
    get wireframe(): boolean;
    set wireframe(value: boolean);
    get elevationColormap(): ColorMap | undefined;
    set elevationColormap(value: ColorMap);
}

/**
 * WASM wrapper for Globe resource.
 *
 * This provides a JavaScript-friendly interface for accessing and modifying
 * globe configuration properties.
 */
declare class Globe_2 {
    free(): void;
    [Symbol.dispose](): void;
    constructor(max_sse: number, segments: number, color: number, hide_underground: boolean, use_normal: boolean, transparent: boolean, opacity: number, wireframe: boolean, elevation_colormap: Float32Array);
    /**
     * Base color for the globe surface (RGB as u32).
     */
    color: number;
    /**
     * Color map lookup table for elevation heatmap rendering.
     * Flattened RGB array: [r0,g0,b0, r1,g1,b1, ...].
     */
    elevationColormap: Float32Array;
    /**
     * Whether to hide underground geometry. Disabling this value might cause unexpected behavior when using effect.
     */
    hideUnderground: boolean;
    /**
     * Whether the globe tiles with the Geographic scheme (quantized-mesh
     * terrain) rather than the default WebMercator. Engine-set output — the
     * web renderer selects its raster drape pipeline (baked vs direct) from
     * it at tile-mesh creation; ignored on input (the scheme is dictated by
     * the terrain source, not configurable).
     */
    isGeographicTiling: boolean;
    /**
     * Screen-space error threshold for level of detail (LOD) calculations. Initialization only.
     */
    maxSse: number;
    /**
     * Global opacity for materials (0.0 to 1.0).
     */
    opacity: number;
    /**
     * Number of segments for mesh tessellation. Initialization only.
     */
    segments: number;
    /**
     * Whether materials should be transparent.
     * Note that blending works only for resource layer.
     */
    transparent: boolean;
    /**
     * Whether to use normals. Initialization only.
     */
    useNormal: boolean;
    /**
     * Whether to render materials in wireframe mode.
     */
    wireframe: boolean;
}

/**
 * Handler for accessing individual Globe properties from WASM.
 * This provides a reference-based interface instead of copying the entire Globe object.
 */
declare type GlobeHandler = {
    getTransparent: () => boolean | undefined;
    getMaxSse: () => number | undefined;
    getSegments: () => number | undefined;
    getColor: () => Color_2 | undefined;
    getHideUnderground: () => boolean | undefined;
    getUseNormal: () => boolean | undefined;
    getOpacity: () => number | undefined;
    getWireframe: () => boolean | undefined;
    getElevationColormap: () => Float32Array | undefined;
    setTransparent: (value: boolean) => void;
    setMaxSse: (value: number) => void;
    setSegments: (value: number) => void;
    setColor: (value: Color_2) => void;
    setHideUnderground: (value: boolean) => void;
    setUseNormal: (value: boolean) => void;
    setOpacity: (value: number) => void;
    setWireframe: (value: boolean) => void;
    setElevationColormap: (value: ColorMap) => void;
};

declare type GlobeOptions = Partial<Omit<Globe_2, "constructor" | "free" | "elevationColormap" | "color" | "isGeographicTiling">> & {
    elevationColormap?: ColorMap;
    color?: Color_2;
};

/** Per-instance `glyphKind` values. Must match the `GLYPH_KIND_*` defines in
 *  `shaders/glsl/sdfText.vert.glsl`. */
export declare const GlyphKind: {
    readonly SDF: 0;
    readonly COLOR: 1;
    readonly BACKGROUND: 2;
    /** A slot inside a label's run that its text doesn't use, or a hole left by
     *  a freed run. Culled in the vertex shader. */
    readonly EMPTY: 3;
};

/** One positioned glyph quad in em space, ready to become an instance. */
export declare type GlyphQuad = {
    offsetEmX: number;
    offsetEmY: number;
    sizeEmX: number;
    sizeEmY: number;
    /** Atlas sub-rect in PIXEL space; the shader divides by the live atlas size
     *  uniform so an atlas resize doesn't invalidate the instance data. */
    uvL: number;
    uvT: number;
    uvR: number;
    uvB: number;
    /** Sample the COLRv1 colour atlas rather than the SDF atlas. */
    isColor: boolean;
};

/**
 * Events emitted by handles.
 */
declare type HandleEvent = {
    /** Emitted when the descriptor is deleted. */
    deleted: () => void;
};

/**
 * Whether an attribute's slot has already been allocated on this material.
 *
 * Meshes use this to decide whether a **material**-level change has to be
 * written through to every feature. While no slot exists the shader's uniform
 * is still governing, so there is nothing to reconcile and writing would only
 * allocate a row the layer never needed; once a slot exists every feature
 * reads the texture, so a stale per-feature value would survive the change.
 */
export declare function hasBatchScalarSlot(material: Material, key: BatchScalarSlotKey): boolean;

/**
 * Builds a WUN tangent frame at a geodetic position and composes heading,
 * pitch, roll and scale onto it — the single call that turns a geographic
 * placement into a world matrix.
 *
 * `heading` is the compass bearing the asset's front faces, where the front is
 * glTF's own `+Z` — the same convention as `ThreeView.setCamera`. Other globe
 * engines differ in which axis they treat as an asset's front, so a model
 * ported from one may need a multiple of 90° added to its heading.
 *
 * `lng`/`lat` and all angles here are in **degrees**, matching
 * `setCamera` and the `geodetic` mesh Descriptor field.
 *
 * `heightReference` is intentionally not accepted: resolving terrain-relative
 * height needs a view to sample from, so it is the Descriptor's job.
 *
 * @param placement - Geographic placement in degrees and metres
 * @returns 4x4 transformation matrix from the placed local frame to ECEF
 */
export declare function headingPitchRollToFixedFrame(placement: Omit<GeodeticPlacement, "heightReference">): Matrix4;

/** A height range in metres, relative to the ellipsoid. */
export declare type HeightRange = {
    min: number;
    max: number;
};

declare class HillshadeBackfilledEvent {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    readonly edge_data_handle: number | undefined;
    edge_direction: number;
    gen: number;
    ind: number;
    readonly original_handle: number | undefined;
    readonly target_entity_gen: number | undefined;
    readonly target_entity_ind: number | undefined;
    tile_handle: bigint;
}

/** A DEM-derived normal map; contributes no color, only a hillshade normal. */
declare type HillshadeCompositeLayer = CompositeLayerBase & {
    kind: "hillshade";
};

/**
 * Hillshade decoder configuration from Rust
 */
declare type HillshadeConfig = {
    rgbScaler: [number, number, number];
    boundary: number;
    minOffset: number;
    maxOffset: number;
    epsilon: number;
    offset: number;
};

/**
 * Context for managing hillshade-related state and resources
 * Centralizes all hillshade processing state to avoid scattered global variables
 */
declare class HillshadeContext {
    /** Shared normal map generator for offline rendering */
    private normalMapGenerator;
    /** Scale factor for normal map RenderTarget dimensions (1.0 = full res, 0.5 = half res for mobile) */
    normalMapScale: number;
    /** Pending edge updates that arrived before the main texture was created */
    readonly pendingEdges: Map<string, Map<number, Uint8Array<ArrayBufferLike>>>;
    /**
     * Temporary storage for DEM reconstruction state while waiting for edge updates.
     * entityId → { originalHandle, paddedSize, receivedEdges, receivedEdgeData, ... }
     */
    readonly tempDemTextures: Map<string, TempDemEntry>;
    /**
     * RenderTarget pool for normal map generation
     * One RenderTarget per entity to avoid GPU→CPU→GPU round-trip
     * Similar to texturizedSceneRenderTargets in tile.ts
     */
    private renderTargets;
    /**
     * Get or create the normal map generator
     * @param viewContext - ViewContext to get the renderer from
     */
    getOrCreateGenerator(viewContext: ViewContext): HillshadeNormalMapGenerator;
    /**
     * Get hillshade decoder config from tile
     * @param tileHandler - TileHandler to query WASM
     * @param tileHandle - Tile handle to get elevation decoder from
     */
    getHillshadeConfig(tileHandler: TileHandler, tileHandle: bigint): HillshadeConfig;
    /**
     * Get or create a RenderTarget for the given entity
     * Reuses existing RenderTarget if size matches, creates new one otherwise
     * @private
     */
    private getOrCreateRenderTarget;
    /**
     * Generate normal map texture from DEM data
     * Creates a transient DataTexture for GPU upload, renders to RenderTarget, then frees the DEM texture.
     * @param entityId - Entity ID for RenderTarget lookup/creation
     * @param viewContext - ViewContext to get the renderer from
     * @param demData - Padded DEM pixel data (CPU only, not GPU-resident)
     * @param paddedSize - Width/height of the padded DEM (square)
     * @param metersPerTexel - Meters per texel for normal calculation
     * @param hillshadeConfig - Hillshade decoder configuration
     * @param contentWidth - Content width (without padding)
     * @param contentHeight - Content height (without padding)
     * @returns Normal map texture (references RenderTarget.texture directly)
     */
    generateNormalMap(entityId: string, viewContext: ViewContext, demData: Uint8Array, paddedSize: number, metersPerTexel: number, hillshadeConfig: HillshadeConfig, contentWidth: number, contentHeight: number): Texture;
    /**
     * Clear RenderTarget for the given entity
     */
    clearRenderTarget(entityId: string): void;
    /**
     * Store temporary DEM entry (WASM handle + metadata) for edge updates.
     * Does NOT store the full padded DEM — only the handle needed to re-read on demand.
     */
    storeTempDem(entityId: string, originalHandle: number, paddedSize: number, metersPerTexel: number, hillshadeConfig: HillshadeConfig): void;
    /**
     * Store an edge pixel strip for later padded DEM reconstruction.
     */
    storeEdgeData(entityId: string, edgeDirection: number, edgeBytes: Uint8Array): void;
    /**
     * Get temporary DEM texture entry
     */
    getTempDem(entityId: string): TempDemEntry | undefined;
    /**
     * Mark an edge as received for a temporary DEM
     * @returns true if all 4 edges have been received
     */
    markEdgeReceived(entityId: string, edgeDirection: number): boolean;
    /**
     * Clear temporary DEM data
     */
    clearTempDem(entityId: string): void;
    /**
     * Cleanup all resources
     * Should be called on view disposal
     */
    dispose(): void;
}

/**
 * Hillshade render options for a `raster` layer. The elevation decoder is taken
 * from the referenced `raster-dem` source, not from here.
 */
declare class HillshadeMaterial {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    /**
     * Exaggeration factor for hillshade effect (default: 1.0)
     */
    get exaggeration(): number | undefined;
    /**
     * Exaggeration factor for hillshade effect (default: 1.0)
     */
    set exaggeration(value: number | null | undefined);
}

/**
 * Generator for hillshade normal maps using offscreen rendering.
 * Converts DEM textures into pre-computed normal maps to improve runtime performance.
 */
declare class HillshadeNormalMapGenerator {
    private renderer;
    private scene;
    private camera;
    private material;
    private quad;
    constructor(renderer: WebGLRenderer);
    /**
     * Render normal map to an existing RenderTarget (GPU-only, no readback)
     * Used by HillshadeContext's RenderTarget pool to avoid GPU→CPU→GPU round-trip
     * @param renderTarget - Target to render to (owned by HillshadeContext)
     * @param demTexture - Source DEM texture (padded)
     * @param metersPerTexel - Meters per texel for normal calculation
     * @param hillshadeConfig - Hillshade decoder configuration
     */
    renderToTarget(renderTarget: WebGLRenderTarget, demTexture: DataTexture, metersPerTexel: number, hillshadeConfig: HillshadeConfig): void;
    /**
     * Debug: Save normal map to file
     * @param renderTarget - RenderTarget to read from
     * @param filename - Output filename
     */
    dbgSaveNormalMap(renderTarget: WebGLRenderTarget, filename: string): void;
    dispose(): void;
}

/**
 * Register the material for batched styling and, once `config.batchLength`
 * is non-zero, record the batch count. No texture rows are allocated here:
 * slots (and the texture itself) are allocated lazily on the first write of
 * each attribute, so only styles actually used occupy texture rows.
 * `batchLength` is fixed once set — dynamically increasing the batch count
 * is not supported; callers must know the total number of batches up front.
 */
export declare function initBatchedMaterial(material: Material, config: BatchTextureConfig): void;

/**
 * Initializes the Navara API WASM module. Must be called before using other API functions.
 */
export declare function initNavaraApi(): Promise<void>;

/**
 * Common transform fields for individual instances within an instanced mesh descriptor.
 * Mirrors the transform fields of `MeshConfig` at the parent level.
 *
 * When `matrix` is provided, it is used directly and `position`, `rotation`, `scale`
 * are ignored.
 */
export declare type InstancedChildConfig = {
    /** Local position relative to the parent group. */
    position?: XYZ;
    /** Local rotation (Euler angles in radians). */
    rotation?: XYZ;
    /** Local scale. */
    scale?: XYZ;
    /** Pre-computed transform matrix. When set, position/rotation/scale are ignored. */
    matrix?: Matrix4;
};

export declare class InstancedMesh<M extends Object3D> extends Mesh_2 implements PickableMesh {
    visibleMeshes: Set<unknown>;
    allMeshes: M[];
    active: boolean;
    constructor(options: InstancedMeshOptions);
    setActive(active: boolean): void;
    addWithBatchIndex(m: M, batchIndex: number): void;
    markVisibility(m: M): void;
    meshes(): M[];
    getMeshByBatchIndex(batchIndex: number): M | undefined;
    setFeatureColorByBatchIndex(batchIndex: number, color: Color_3): void;
    setFeatureShowByBatchIndex(batchIndex: number, rawVisible: boolean): void;
    setFeatureHeightByBatchIndex(batchIndex: number, height: number): void;
    onBeforePicking(): void;
    onAfterPicking(): void;
    private setPickable;
    getRenderable(): Object3D;
}

export declare type InstancedMeshConfig = MeshConfigWithSelectiveEffect;

/**
 * Abstract base class for instanced mesh descriptors using GPU instancing via Three.js `InstancedMesh`.
 *
 * All instances share a single geometry and material, rendered in one draw call.
 * Per-instance variation is achieved through `instanceMatrix` (position, rotation, scale)
 * and `instanceColor` (per-instance color).
 *
 * The parent's transform fields (position, scale, rotation, matrix, matrixWorld, geodetic)
 * define the parent coordinate space. Each instance's transform is local to the parent.
 *
 * Subclasses that maintain external per-instance state (e.g. picking batchIds)
 * can override the `onInstance*` lifecycle hooks to stay in sync with
 * `add` / `removeAt` / `clear` / `replaceAll` / capacity grows.
 *
 * @typeParam Config - Descriptor configuration type
 * @typeParam UpdateConfig - Updatable properties type
 * @typeParam ChildConfig - Configuration type for individual instances
 * @typeParam CustomEvent - Additional custom events
 */
export declare abstract class InstancedMeshDesc<TGeometry extends BufferGeometry = BufferGeometry, TMaterial extends Material = Material, Config extends InstancedMeshConfig = InstancedMeshConfig, UpdateConfig extends InstancedMeshUpdate = InstancedMeshUpdate, ChildConfig extends InstancedChildConfig = InstancedChildConfig, CustomEvent extends BaseEventMap = BaseEventMap> extends MeshDescWithSelectiveEffect<Config, UpdateConfig, InstancedMesh_2<TGeometry, TMaterial>, CustomEvent> {
    protected configs: ChildConfig[];
    private capacity;
    /** Create the shared geometry for all instances. */
    protected abstract createGeometry(): TGeometry;
    /** Create the shared material for all instances. */
    protected abstract createMaterial(): TMaterial;
    /** Extract the initial array of instance configs from the descriptor config. */
    protected abstract getChildConfigs(): ChildConfig[];
    /** Extract the per-instance color, or undefined if no color. */
    protected abstract getInstanceColor(config: ChildConfig): Color_3 | undefined;
    /**
     * Compose a Matrix4 encoding position, rotation, and scale for one instance.
     *
     * When `config.matrix` is provided, it is returned directly.
     * Otherwise the matrix is composed from `position`, `rotation`, and scale
     * (computed by {@link getInstanceScale}).
     *
     * Override {@link getInstanceScale} to incorporate geometry-specific dimensions
     * (e.g., width/height/depth for boxes) into the scale.
     */
    protected composeInstanceMatrix(config: ChildConfig): Matrix4;
    /**
     * Compute per-instance scale. Override to incorporate geometry-specific
     * dimensions (e.g., width/height/depth) into the scale.
     *
     * The default implementation uses `config.scale` directly.
     */
    protected getInstanceScale(config: ChildConfig, target: Vector3): void;
    createMesh(): InstancedMesh_2<TGeometry, TMaterial>;
    /** Add a new instance. Returns the index of the added instance. */
    add(config: ChildConfig): number;
    /**
     * Remove an instance by index.
     * Uses swap-with-last for O(1) removal. Order is not preserved.
     */
    removeAt(index: number): void;
    /** Update an instance at the given index with partial config. */
    updateAt(index: number, config: Partial<ChildConfig>): void;
    /** Remove all instances. */
    clear(): void;
    /**
     * Replace all instances in a single batch. More efficient than `clear()` + `add()` loop
     * because it suppresses per-instance update notifications and emits a single update at the end.
     */
    replaceAll(configs: ChildConfig[]): void;
    /** Number of active instances. */
    get count(): number;
    /** Called after a new instance has been appended at `index`. */
    protected onInstanceAdded(_index: number): void;
    /**
     * Called after an instance at `index` has been removed via swap-with-last.
     * `wasLast` is true if the removed instance was already the last one
     * (no swap happened).
     */
    protected onInstanceRemoved(_index: number, _wasLast: boolean): void;
    /** Called after all instances have been cleared. */
    protected onInstancesCleared(): void;
    /** Called after all instances have been replaced; `count` is the new instance count. */
    protected onInstancesReplaced(_count: number): void;
    /**
     * Called after the underlying `InstancedMesh` has been replaced (capacity grow).
     * `this.raw` already points at the new mesh when this fires.
     */
    protected onInstanceMeshReplaced(_newMesh: InstancedMesh_2<TGeometry, TMaterial>): void;
    /**
     * Grow the internal buffers by replacing the InstancedMesh with a larger one.
     * Copies existing instance data to the new mesh.
     */
    private grow;
    onDestroy(): void;
}

export declare type InstancedMeshOptions = {
    renderOrder?: number;
    layerId: string;
};

export declare type InstancedMeshUpdate = MeshUpdateWithSelectiveEffect;

/**
 * Mutation functions for the instancedSprite base enhancer.
 */
export declare type InstancedSpriteBaseMutates = Mutates<InstancedSpriteBaseState, InstancedSpriteBaseUniforms, {
    /**
     * Update RTE uniforms per-frame.
     * Calls encodePosition internally to split camera position into high/low.
     */
    updateRteUniforms: (cameraX: number, cameraY: number, cameraZ: number, state: InstancedSpriteBaseState) => void;
    /**
     * Update the RTC uniforms per-frame. Transforms the RTC center into view
     * space on the CPU (float64) so the shader avoids a large-coordinate
     * float32 subtraction that would otherwise cause jitter.
     */
    updateRtcUniforms: (viewMatrix: Matrix4, state: InstancedSpriteBaseState) => void;
    /**
     * Update far plane per-frame from camera.
     */
    updateFarPlane: (far: number) => void;
    /**
     * Update FOV per-frame from camera, in radians.
     */
    updateFovRad: (fovRad: number) => void;
    /**
     * Update screen height per-frame from renderer size, in pixels.
     */
    updateScreenHeightPx: (height: number) => void;
    /**
     * Set texture external ref.
     */
    setTexture: (texture: UniformValue<Texture | null>) => void;
    /**
     * Set the batch data texture ref (an external ref shared with the
     * batchTexture core, whose `.value` is swapped on growth).
     */
    setBatchDataTexture: (texture: UniformValue<Texture | null>) => void;
}>;

/**
 * Props for the instancedSprite base enhancer.
 */
export declare type InstancedSpriteBaseProps = {
    useRTE?: boolean;
    billboard?: boolean;
    scale?: number;
    center?: [number, number];
    /** `false` (the default) stands the quad up; `true` lays it on the globe
     *  surface around the anchor, wrapped to its curvature. Material-level default;
     *  per-feature overrides come from the batch data texture. */
    flatFacing?: boolean;
    /** Whether the quad turns to follow the camera. Material-level default. */
    rotateWithCamera?: boolean;
    /** Spin of the quad inside its own plane about the anchor, in **degrees**,
     *  clockwise seen from the front. Converted to radians in state. */
    rotation?: number;
    sizeInMeters?: boolean;
    offsetDepth?: boolean;
    alphaTest?: number;
    pickable?: boolean;
    color?: number;
    opacity?: number;
    addHeight?: number;
    effectIdsMask?: number;
    emissiveColor?: number;
    emissiveIntensity?: number;
    transparent?: boolean;
    depthTest?: boolean;
    /** Cull faces seen from behind (`FrontSide`); `false` (the default) draws
     *  both sides (`DoubleSide`). */
    backfaceCulling?: boolean;
    rtcCenter?: [number, number, number];
    texture?: UniformValue<Texture | null>;
    /** Shared batch data texture ref; growth swaps its `.value` in place. */
    batchDataTexture?: UniformValue<Texture | null>;
    /** Billboard atlas dimensions in pixels; normalizes instanceUvRect in the shader. */
    atlasSize?: [number, number];
    fovRad?: number;
    screenHeightPx?: number;
};

/**
 * Mutable references (uniforms) for the instancedSprite base enhancer.
 * These are shared references with shader.uniforms.
 * Internal type - not exposed externally.
 */
declare type InstancedSpriteBaseRefs = {
    uRTCCenter: UniformValue<Vector3>;
    uRTCCenterView: UniformValue<Vector3>;
    uEyeRTELow: UniformValue<Vector3>;
    uEyeRTEHigh: UniformValue<Vector3>;
    /** Always 1.0 — blocks fast-math reassociation of the RTE recombination. */
    u_rteOne?: UniformValue<number>;
    uScale: UniformValue<number>;
    uColor: UniformValue<Color_3>;
    uOpacity: UniformValue<number>;
    uAddHeight: UniformValue<number>;
    uCenter: UniformValue<Vector2>;
    uFlatFacing: UniformValue<boolean>;
    uRotateWithCamera: UniformValue<boolean>;
    uRotation: UniformValue<number>;
    uSizeInMeters: UniformValue<boolean>;
    uOffsetDepth: UniformValue<boolean>;
    uAlphaTest: UniformValue<number>;
    uFarPlane: UniformValue<number>;
    uAtlasSize: UniformValue<Vector2>;
    nvr_uPickable: UniformValue<number>;
    uEffectIdsMask: UniformValue<number>;
    uEmissiveColor: UniformValue<Color_3>;
    uEmissiveIntensity: UniformValue<number>;
    uFovRad: UniformValue<number>;
    uScreenHeightPx: UniformValue<number>;
    uTexture?: UniformValue<Texture | null>;
    batchDataTexture?: UniformValue<Texture | null>;
};

/**
 * Immutable state snapshot for the instancedSprite base enhancer.
 * This state is always replaced as a whole (never mutated).
 */
export declare type InstancedSpriteBaseState = Readonly<{
    useRTE: boolean;
    billboard: boolean;
    scale: number;
    center: [number, number];
    flatFacing: boolean;
    rotateWithCamera: boolean;
    rotation: number;
    sizeInMeters: boolean;
    offsetDepth: boolean;
    alphaTest: number;
    pickable: boolean;
    color: number;
    opacity: number;
    addHeight: number;
    effectIdsMask: number;
    emissiveColor: number;
    emissiveIntensity: number;
    transparent: boolean;
    depthTest: boolean;
    backfaceCulling: boolean;
    atlasSize: [number, number];
    fovRad: number;
    screenHeightPx: number;
}>;

declare type InstancedSpriteBaseUniforms = Partial<InstancedSpriteBaseRefs>;

/**
 * Props for the instancedSprite material enhancer.
 * Currently just wraps the base props, but structured for future composition.
 */
export declare type InstancedSpriteMaterialProps = {
    base?: InstancedSpriteBaseProps;
};

export declare class InstancedSpriteMesh extends Mesh_2<BufferGeometry, Material | Material[], CustomObject3DEventMap> implements PickableMesh, DeclutterParticipant {
    private _geometryType;
    /**
     * Feature (batch) index → this feature's instance ids. A feature owns
     * multiple instances for MultiPoint geometry and for points derived from
     * line/polygon vertices via `geometryTypes`, so per-feature styling must
     * fan out to all of them. `null` means instances and features are 1:1.
     */
    private _batchIndexToInstances;
    /**
     * Per-instance feature (batch) index, mirroring the `_batchid` attribute for
     * CPU-side reads (declutter). `null` means instances and features are 1:1.
     */
    private _instanceBatchIndex;
    /** Feature count — the batch data texture's column count. */
    private _batchLength;
    /**
     * The material's current orientation/rotation: change detection for the
     * write-through, and the backfill for a freshly allocated batch slot.
     */
    private _orientation?;
    /** Current grid resolution of the sprite quad (see {@link FLAT_QUAD_SEGMENTS}). */
    private _quadSegments;
    /** Instance count of the current geometry; bounds the identity fallback. */
    private _instanceCount;
    private _atlas?;
    private _defaultUrl?;
    /** Atlas rect of the current default image; re-applied to an instance when
     * its per-feature override is cleared. */
    private _defaultRect?;
    /** Instance ids whose image was overridden per-feature; the default image
     * from the material no longer applies to them. */
    private _imageOverrides;
    /** Latest override URL requested per instance. An async pack only applies
     * if it still matches, so a newer override or a clear wins over slow loads. */
    private _requestedImageUrls;
    /** Forwards the atlas byte footprint to the engine's memory ledger; wired
     * by the feature-added handler once the owning entity bits are known. */
    private _atlasBytesReporter?;
    private _reportedAtlasBytes;
    private _active;
    readonly ctx: EventContext;
    /** Material enhancer for encapsulated state management */
    private _enhancedMaterial?;
    /** Per-instance world anchors in ECEF meters (f64, 3 per instance), kept in
     *  sync with the position attributes for the declutter pass. */
    private _anchors;
    /** Whether this mesh's instances participate in screen-space decluttering. */
    private _declutter;
    /** Layer-level placement priority from the material. */
    private _declutterPriority;
    /** Per-instance priorities set through the evaluator (NaN = no override,
     *  fall back to the layer value). Lazily allocated on first use. */
    private _declutterPriorityOverrides;
    /** Per-instance fade targets for `instanceDeclutterHide` (0 = shown,
     *  1 = hidden); the attribute animates toward these in stepDeclutterFade. */
    private _declutterTargets;
    /** True while any instance's hide factor may differ from its target. */
    private _declutterAnimating;
    constructor(options: InstancedSpriteOptions);
    setActive(active: boolean): void;
    /**
     * Set the geometry type for this mesh.
     *
     * This affects how FeatureEvaluator provides meshGeomType to evaluators,
     * which is used by MapLibreStylePlugin to determine which properties to apply
     * (e.g., billboard vs text rendering for symbol layers).
     *
     * Changing this after initialization is supported and will affect subsequent
     * feature evaluations, but does NOT automatically trigger re-evaluation.
     * Call layer.forceUpdate() if you need to re-evaluate existing features.
     */
    setGeometryType(type: SpriteGeometryType): void;
    /**
     * Get the geometry type of this mesh.
     * Defaults to GEOMETRY_TYPES.Point if not explicitly set.
     */
    get geometryType(): SpriteGeometryType;
    collectDeclutterCandidates(out: DeclutterCandidate[]): void;
    applyDeclutter(handle: number, hidden: boolean): void;
    stepDeclutterFade(deltaMs: number): boolean;
    private _cacheDeclutterState;
    private _clearDeclutterHidden;
    /** Reconstruct absolute ECEF anchors from the same arrays the position
     *  attributes receive (RTE high+low split, or RTC-relative + center). */
    private _cacheAnchors;
    _init(m: PointMesh | BillboardMesh): Promise<void>;
    _update(m: PointMesh | BillboardMesh): Promise<void>;
    private _initGeometry;
    private _initMaterial;
    private updateVisibility;
    private extractPositions;
    private _ensureAtlas;
    /**
     * Wire the callback that reports this mesh's atlas footprint to the
     * engine's memory ledger, and immediately report the current footprint —
     * the default image may have been packed during `_init`, before the
     * feature-added handler could wire the reporter.
     */
    setAtlasBytesReporter(reporter: (bytes: number) => void): void;
    /** Report the atlas footprint if it changed since the last report. Must run
     * after every `pack()` — the atlas may have grown even when the pack failed
     * (growth up to `maxSize` happens before "no space" is decided). */
    private _reportAtlasBytes;
    /**
     * Push the atlas texture and size to the material. The texture object is
     * replaced whenever the atlas grows, so this must run after every pack().
     */
    private _syncAtlasUniforms;
    /**
     * Load the material-level image and apply its rect to every instance that
     * hasn't been overridden per-feature via setFeatureImageByBatchId.
     */
    private _setDefaultImage;
    /**
     * An instance's atlas rect changed. The rect drives the quad's aspect and
     * whether the instance draws at all, so the declutter bounds computed before
     * the image landed are stale — and because packs resolve long after the
     * frame that requested them, the view has usually gone idle by now. Without
     * the render request the page keeps showing the pre-image state until the
     * next camera move.
     */
    private _onAtlasRectsChanged;
    onBeforePicking(): void;
    onAfterPicking(): void;
    getRenderable(): Object3D;
    /**
     * Get the enhancer, throwing if not initialized.
     */
    private getEnhancer;
    /**
     * See {@link buildBatchIndexMap}. The batch_index handle stays owned by the
     * ECS geometry, whose destroy path frees it (`remove_from_buf`).
     */
    private _rebuildBatchIndexMap;
    /** All instances owned by the feature at `batchIndex`; empty when unknown. */
    private instancesOfBatchIndex;
    _getBatchTextureSupport(): BatchTextureSupport;
    /**
     * Write one per-feature style into the batch data texture (bounds and
     * value validation, slot allocation, and define stamping live in
     * {@link updateBatchAttribute}). One write covers every instance of the
     * feature — no per-instance fan-out.
     */
    private _updateBatchAttribute;
    setFeatureColorByBatchIndex(batchIndex: number, color: Color_3): void;
    setFeatureShowByBatchIndex(batchIndex: number, rawVisible: boolean): void;
    setFeatureOpacityByBatchIndex(batchIndex: number, opacity: number): void;
    setFeatureHeightByBatchIndex(batchIndex: number, height: number): void;
    setFeatureEmissiveByBatchIndex(batchIndex: number, emissive: Color_3): void;
    setFeatureEmissiveIntensityByBatchIndex(batchIndex: number, intensity: number): void;
    /**
     * Set one instance's declutter fade target; the attribute animates toward
     * it in {@link stepDeclutterFade}. Deliberately separate from the batch
     * texture's `show` so user-driven visibility and declutter results compose
     * instead of clobbering each other.
     */
    setDeclutterHiddenByInstance(instanceIndex: number, hidden: boolean): void;
    /**
     * Set a per-feature placement priority (higher wins), overriding the
     * layer-level `declutterPriority` for this instance. Driven by the feature
     * evaluator.
     */
    setFeatureDeclutterPriorityByBatchIndex(batchIndex: number, priority: number): void;
    setFeatureSizeByBatchIndex(batchIndex: number, size: number): void;
    /**
     * Orientation and in-plane rotation for one feature, overriding the
     * material's. `rotation` is in degrees, clockwise seen from the front; it is
     * converted to the radians the shader wants here, matching the material path.
     */
    setFeatureFacingByBatchIndex(batchIndex: number, facing: "upright" | "flat"): void;
    setFeatureRotateWithCameraByBatchIndex(batchIndex: number, follow: boolean): void;
    setFeatureRotationByBatchIndex(batchIndex: number, degrees: number): void;
    /**
     * Grid resolution the quad needs: the curved grid while any feature can be
     * flat (the material says so, or the evaluator has given some feature its
     * own facing), the plain quad otherwise.
     */
    private _neededQuadSegments;
    /** Swap the quad's vertex attributes when the needed resolution changed. */
    private _syncQuadGrid;
    /** The material's orientation/rotation, backfilled into a new batch slot. */
    private _orientationDefaults;
    /**
     * Push the material's orientation/rotation onto every feature when the
     * material value actually **changed**, and only once a slot exists.
     *
     * Both guards matter. Without a slot the shader's uniform is still
     * governing, so writing would allocate a row the layer never needed.
     * Without the change check, the engine re-sending an unchanged material —
     * which it does for geometry and activation updates too — would stomp
     * evaluator overrides on every terrain tick. Mirrors the style/size writes
     * in `BatchedSdfTextMesh._applyUpdate`.
     */
    private _writeThroughOrientation;
    /**
     * Give one feature its own image, packed into this mesh's texture atlas.
     * Loads are deduplicated by URL, so styling many features with few distinct
     * images fetches each image once. On load failure the feature keeps its
     * current (default) image. Passing a nullish `url` clears the override and
     * reverts the feature to the material's default image. No-op for
     * non-billboard (point) meshes.
     */
    setFeatureImageByBatchIndex(batchIndex: number, url: string | null | undefined): Promise<void>;
    dispose(): void;
}

export declare type InstancedSpriteOptions = {
    renderOrder?: number;
    ctx: EventContext;
    geometryType: SpriteGeometryType;
};

/** Type guard distinguishing a raw HTML credit from a structured source. */
export declare function isAttributionHtml(item: AttributionItem): item is AttributionHtml;

export declare const isFeatureMesh: (v: object) => v is FeatureMesh;

export declare const isPickableMesh: (v: object) => v is PickableMesh;

/** Paragraph direction from the first strong directional character (UAX #9
 *  P2/P3 approximation): the first letter decides, RTL ranges win over other
 *  letters. */
export declare function isRtlText(text: string): boolean;

export declare const JAPAN_GSI_ELEVATION_DECODER: () => ElevationDecoder;

declare type JsEvents = {
    [K in keyof Events as K extends `take_${infer P}` ? P : never]: Events[K] extends (...args: never[]) => infer R ? R : never;
};

declare type JsEventsKey = keyof JsEvents;

/** A laid-out label: its glyph quads plus the block metrics the shader and the
 *  declutter pass need. All measurements are in ems. */
export declare type LabelLayout = {
    quads: GlyphQuad[];
    /** Unique atlas glyphs referenced, for retain/release against the atlas. */
    glyphKeys: bigint[];
    widthEm: number;
    heightEm: number;
    /** Y bounds of the actual rendered glyph bboxes, for the background quad. */
    minYEm: number;
    maxYEm: number;
};

/** Geodetic position: `lat`/`lng` in **degrees**. */
export declare type LatLng = Omit<LatLngHeight, "height">;

/**
 * Geodetic position: `lat`/`lng` in **degrees**, `height` in meters.
 */
export declare type LatLngHeight = Required<NormalizeWASMClass<LLE>>;

/**
 * A handle to control a resource layer (e.g., imagery, terrain, GeoJSON, 3D Tiles) after it has been added to the scene.
 * Returned by `ThreeView.addLayer()` when adding resource layers (not mesh, light, or effect descriptors).
 *
 * Resource layers are data-driven layers that load and display geographic data from external sources.
 * Use this handle to update layer configuration or delete the layer.
 *
 * @example
 * ```typescript
 * // Register a GeoJSON source, then render it with a vector layer
 * const geoJsonSource = view.addSource({
 *   type: "geojson",
 *   url: "https://example.com/data.geojson",
 * });
 * const geoJsonLayer = view.addLayer({
 *   type: "vector",
 *   source: geoJsonSource,
 *   point: { color: 0xff0000 }
 * });
 *
 * // Update the layer configuration
 * geoJsonLayer.update({ point: { color: 0x00ff00 } });
 *
 * // Listen to feature events
 * geoJsonLayer.on("featureCreated", ({ evaluator }) => {
 *   console.log("Feature created:", evaluator);
 * });
 *
 * // Delete the layer
 * geoJsonLayer.delete();
 * ```
 */
export declare class Layer extends EventHandler<LayerEvent> {
    /** The unique identifier of this layer. */
    id: string;
    private core;
    private featureEvaluators;
    private needUpdate;
    private convertColors?;
    constructor(id: string, core: Core, convertColors?: (obj: unknown) => unknown);
    /* Excluded from this release type: _registerFeatureEvaluator */
    /* Excluded from this release type: _getFeatureEvaluator */
    /* Excluded from this release type: _unregisterFeatureEvaluator */
    /* Excluded from this release type: _processFeatureUpdates */
    /**
     * Marks the layer for update on the next frame.
     * Call this when you need to trigger `featureUpdated` events.
     */
    forceUpdate(): void;
    /**
     * Updates the layer configuration.
     * The entire configuration is replaced with the new values.
     * @param l - New layer configuration
     */
    update(l: LayerDescription): void;
    /**
     * Removes the layer from the scene and disposes its resources.
     * Emits the "deleted" event before cleanup.
     * After calling this, the layer should no longer be used.
     */
    delete(): void;
}

declare type Layer_2<LD> = NormalizeWASMClass<LD>;

export declare type LayerDescription = VectorLayer | RasterLayer | TerrainSourceLayer | Tiles3dLayer;

/**
 * Events emitted by Layer. Subscribe using `layer.on(eventName, callback)`.
 */
export declare type LayerEvent = {
    /** Emitted when a new feature is created in this layer. */
    featureCreated: (params: FeatureCreatedParams) => void;
    /** Emitted when a feature in this layer is updated. */
    featureUpdated: (params: FeatureUpdatedParams) => void;
    /** Emitted when a feature's visibility changes. */
    featureVisibilityChanged: (params: FeatureVisibilityChangedParams) => void;
    /** Emitted when a feature is removed from this layer. */
    featureRemoved: (params: FeatureRemovedParams) => void;
    /** Emitted when the layer is deleted. */
    deleted: () => void;
};

declare type LayerHandler = {
    getLayerIndex: (layerId: string) => number | undefined;
};

declare type LayerId = string;

declare class LayersManager {
    private layers;
    add(l: Layer | BaseHandle): void;
    get(id: string): Layer | BaseHandle< BaseDesc<BaseDescConfig, BaseDescConfigUpdate, BaseInstance, BaseEventMap>> | undefined;
    emitById<K extends keyof LayerEvent>(k: K, id: string, ...args: Parameters<LayerEvent[K]>): void;
    emitAll<K extends keyof LayerEvent>(k: K, ...args: Parameters<LayerEvent[K]>): void;
    getResourceLayers(): Generator<Layer, void, unknown>;
    getHandles(): Generator<BaseHandle>;
    getEffectDescs(): Generator<EffectHandle>;
    getLightDescs(): Generator<LightHandle>;
    getMeshDescs(): Generator<MeshHandle>;
}

declare type LayoutOptions = {
    /** The source string — only used to detect paragraph direction. */
    text: string;
    /** Wrap width in ems (multiples of font size); 0 disables soft wrapping. */
    maxWidth: number;
    /** Multiplier on the font's natural line height. */
    lineHeight: number;
    /** 0 left, 0.5 center, 1 right. */
    textAlign: number;
};

export declare type Light = {
    ambient?: {
        enabled?: boolean;
        color?: number;
        intensity?: number;
    };
    sun?: {
        enabled?: boolean;
        color?: number;
        position?: Vector3;
        intensity?: number;
    };
};

declare type LightBaseInstance<Instance extends object = object> = Instance extends Light_2 ? Instance : Instance extends {
    raw: infer Raw extends Light_2;
} ? Instance & {
    raw: Raw;
} & BaseInstance : BaseInstance;

export declare type LightConfig = {
    type?: "light";
    position?: XYZ;
} & BaseDescConfig;

/**
 * Abstract base class for creating custom light descriptors.
 *
 * Extend this class to add custom Three.js lights (directional, point, spot, ambient, etc.)
 * to the Navara scene. The light is automatically added to `view.scenes.light` and
 * position synchronization is handled by the base class.
 *
 * ## Implementing a Custom Light Descriptor
 *
 * ### 1. Define configuration types
 *
 * Create a description type for your light-specific options, then merge it with the
 * base config and update types:
 *
 * ```typescript
 * type MyLightDescription = {
 *   myLight?: {
 *     intensity?: number;
 *     color?: Color;
 *   };
 * };
 *
 * type MyLightConfig = LightConfig & MyLightDescription;
 * type MyLightUpdate = LightUpdate & MyLightDescription;
 * ```
 *
 * ### 2. Extend `LightDesc`
 *
 * Implement the {@link createLight} factory method. Optionally override
 * {@link onUpdateConfig} for dynamic property updates and {@link update} for
 * per-frame animation.
 *
 * ```typescript
 * class MyLightDesc extends LightDesc<
 *   MyLightConfig,
 *   MyLightUpdate,
 *   PointLight
 * > {
 *   private config: MyLightConfig;
 *
 *   constructor(view: ThreeView, ctx: ViewContext, config: MyLightConfig) {
 *     super(view, ctx, config);
 *     this.config = config;
 *   }
 *
 *   createLight() {
 *     const cfg = this.config.myLight ?? {};
 *     return new PointLight(
 *       cfg.color?.raw ?? 0xffffff,
 *       cfg.intensity ?? 1,
 *     );
 *   }
 *
 *   onUpdateConfig(updates: MyLightUpdate): void {
 *     super.onUpdateConfig(updates);
 *     if (updates.myLight && this._instance) {
 *       if (updates.myLight.intensity !== undefined) {
 *         this._instance.intensity = updates.myLight.intensity;
 *       }
 *     }
 *   }
 * }
 * ```
 *
 * ### 3. Register and use the descriptor
 *
 * ```typescript
 * view.registerLight("myLight", MyLightDesc);
 *
 * const handle = view.addLight<MyLightDesc>({
 *   position: { x: 0, y: 100, z: 0 },
 *   myLight: { intensity: 2, color: new Color("#ff0000") },
 * });
 *
 * // Update dynamically
 * handle.update({ myLight: { intensity: 0.5 } });
 *
 * // Remove the descriptor
 * handle.delete();
 * ```
 *
 * ## Lifecycle
 *
 * 1. **Construction** - The descriptor is instantiated with the view context and config.
 * 2. **{@link createLight}** - Called during {@link onCreate} to create the Three.js light.
 *    The base class adds it to `view.scenes.light` and applies the initial position.
 * 3. **{@link onUpdateConfig}** - Called when `handle.update()` is invoked. The base class
 *    handles `visible` and `position`; override to handle your custom properties.
 * 4. **{@link update}** - Optional per-frame callback for animation (e.g. moving lights).
 * 5. **{@link onDestroy}** - Called on `handle.delete()`. The base class removes the light
 *    from its parent scene.
 *
 * @see {@link AmbientLightDesc} for a minimal built-in example.
 * @see {@link SunLightDesc} for an advanced example with CSM shadows and atmosphere integration.
 *
 * @typeParam Config - Configuration type (extends {@link LightConfig})
 * @typeParam UpdateConfig - Updatable properties (extends {@link LightUpdate})
 * @typeParam InstanceObj - The Three.js Light type or a wrapper with a `raw` property
 * @typeParam Instance - Resolved instance type (inferred automatically)
 */
export declare abstract class LightDesc<Config extends LightConfig = LightConfig, UpdateConfig extends LightUpdate = LightUpdate, InstanceObj extends Light_2 | {
    raw: Light_2;
} = Light_2 | {
    raw: Light_2;
}, Instance extends LightBaseInstance<InstanceObj> = LightBaseInstance<InstanceObj>> extends BaseDesc<Config, UpdateConfig, Instance> {
    position?: XYZ;
    constructor(view: ThreeView, ctx: ViewContext, config?: Config);
    /**
     * Factory method to create the Three.js light instance.
     *
     * Override this to return your custom light. The returned object can be either:
     * - A Three.js `Light` directly (e.g. `PointLight`, `DirectionalLight`)
     * - A wrapper object with a `raw` property containing the `Light`
     *
     * The base class calls this during {@link onCreate} and automatically adds the
     * light to `view.scenes.light`.
     */
    abstract createLight(): Instance;
    get raw(): (Instance extends Light_2 ? Instance : never) | (Instance extends {
        raw: infer Raw extends Light_2;
    } ? Raw : never) | undefined;
    onCreate(): void;
    onUpdateConfig(updates: UpdateConfig): void;
    onDestroy(): void;
    /**
     * Optional per-frame update callback.
     * Override this to animate the light (e.g. orbiting, flickering, color shifts).
     * @param time - High-resolution timestamp (in milliseconds) provided by the render loop,
     *   the same value passed to `requestAnimationFrame` callbacks.
     */
    update?(time: number): void;
}

export declare type LightDescConstructor = new (view: ThreeView, ctx: ViewContext, config: LightConfig) => LightDesc;

export declare class LightDescRegistry extends DescRegistry<LightDescConstructor, LightDesc, LightConfig> {
    create(name: string, config: LightConfig): LightDesc;
    /**
     * Find light type from config (alias for findTypeFromConfig for backward compatibility)
     */
    findLightType(config: Record<string, unknown>): string | null;
}

/**
 * A handle to control a light descriptor after it has been added to the scene.
 * Returned by `ThreeView.addLight()`.
 *
 * @typeParam T - The specific light descriptor type (e.g., SunLightDesc)
 */
export declare class LightHandle<T extends LightDesc = LightDesc> extends BaseHandle<T> {
}

export declare type LightUpdate = Pick<LightConfig, "position"> & BaseDescConfigUpdate;

/** Line width in font units: advances summed, trailing whitespace ignored so
 *  it never affects alignment or the block width. */
export declare function lineWidthFu(line: ShapedGlyph[]): number;

declare class LLE {
    free(): void;
    [Symbol.dispose](): void;
    constructor(lat: number, lng: number, height: number);
    height: number;
    lat: number;
    lng: number;
}

/**
 * The textures guaranteed to be present in an {@link Atmosphere.onTexturesReady}
 * callback for a given needs declaration.
 */
declare type LoadedAtmosphereTextures<N extends AtmosphereTextureNeeds> = Required<Pick<PrecomputedTextures, `${Extract<keyof N, AtmosphereTextureName>}Texture`>>;

/**
 * LOD fog settings: a distance-based screen-space-error relaxation used by
 * the tile traversals (far tiles tolerate a larger error and stay coarser,
 * near tiles keep full resolution). This never affects visual fog rendering.
 */
export declare type LodFogSettings = {
    enabled: boolean;
    /** Distance scale of the relaxation ramp (2.0e-4 ≈ 63% strength at 5km). */
    density: number;
    /** Maximum SSE relaxation (in pixels) at far distance. */
    sseFactor: number;
};

export declare type LUT = readonly (ColorTuple | Color_2)[];

export declare const MAPBOX_ELEVATION_DECODER: () => ElevationDecoder;

/**
 * Pointer event extended with map coordinates at the event location.
 * Fired for every input type; `pointerType` tells them apart.
 */
export declare type MapPointerEvent = {
    /** World coordinates (ECEF) at the pointer position on the globe surface. */
    map: XYZ;
} & PointerEvent;

/**
 * Core abstraction: Material enhancer with shader type constraints
 *
 * A MaterialEnhancer encapsulates a single material feature and declares which shaders it supports.
 *
 * The enhancer separates concerns into three categories:
 * - **State** (immutable): Configuration flags and values that define behavior.
 *   Always replaced as a whole when updated (never mutated). Returned directly via `states()`.
 * - **Refs** (mutable, internal): Uniform value objects (`{ value: T }`) that are shared
 *   references with shader.uniforms. Hidden inside mutates, synced from state via `mutates().update(state)`.
 * - **Mutates** (mutation functions): Functions exposed via `mutates()` for controlled
 *   mutation of internal refs. Always includes `update(state)` to sync refs from state.
 *
 * The material is passed to the factory function when creating the enhancer,
 * and is exposed via the `material` property for composed enhancers to reference.
 */
export declare type MaterialEnhancer<M extends Material, Props, States = unknown, Mutates = unknown, Shaders extends readonly ShaderName[] = readonly ShaderName[]> = {
    /** The Three.js material being enhanced */
    readonly material: M;
    /** Declares which shaders this enhancer is compatible with */
    readonly availableShaders: Shaders;
    /** Called once during shader compilation - assigns internal refs to shader.uniforms */
    transformShader: (shader: WebGLProgramParametersWithUniforms) => void;
    /** Called once after creation - initializes internal state with props */
    mount: (props: Props) => void;
    /** Called on every props update - updates internal state and refs */
    update: (props: Props) => void;
    /** Get the current state directly (no getters - refresh after updates) */
    states: () => States;
    /** Get mutation functions for controlled updates to internal refs */
    mutates: () => Mutates;
    /** Returns cache key based on state affecting shader defines. Used with material.customProgramCacheKey */
    programCacheKey: () => string;
};

export declare type MaterialsFromShaders<S extends readonly ShaderName[]> = ShaderToMaterial[S[number]];

export declare const MAX_BATCH_TEXTURE_WIDTH = 4096;

export declare const MB: number;

/**
 * Device-wide memory budgets, derived together so the main-thread tile cache,
 * the tile-worker pool, and the font worker share one view of the device's
 * memory instead of three independent constants.
 */
export declare type MemoryBudgets = {
    /** Main-thread tile-cache budget (same as `getDefaultCacheBytes`). */
    cacheBytes: number;
    /** WASM heap budget per tile worker; the pool recycles a worker above it. */
    maxWorkerHeapBytes: number;
    /** Font-worker cache budget (font data + atlas pixels; caps further growth). */
    fontBudgetBytes: number;
    /** In-flight data fetch cap per tile pipeline; lower on mobile to shrink
     * the decode/upload burst on camera moves. */
    maxPendingRequests: number;
    /** Resting SSE multiplier (far tiles always this much coarser; >1 on
     * mobile shrinks the working set from the start). */
    sseMultiplierMin: number;
    /** Ceiling the memory-pressure SSE degrade may rise to; larger on mobile. */
    sseMultiplierMax: number;
};

/**
 * Snapshot of engine memory usage; see {@link ThreeView.memoryStats}. Plain
 * object (not the WASM-generated class) per the WASM API policy: the class is
 * copied field-by-field and freed before returning.
 */
export declare type MemoryStats = {
    bufferTotalBytes: number;
    /** Bytes held in the JS-side `InMemoryBufferStore` (WASM `External`
     * entries): fetched MVT pbf and worker-built geometry that never enter WASM
     * linear memory. Not part of `bufferTotalBytes`. */
    externalBufferBytes: number;
    bufferCount: number;
    gpuBytesEst: number;
    externalCpuBytes: number;
    reservedBytes: number;
    /** Estimated GPU bytes of fixed screen-sized allocations (the
     * postprocessing render-target stack), reported via
     * `Core.setFixedGpuBytes` on init, resize, and pass-list changes. */
    fixedGpuBytes: number;
    budgetBytes: number | undefined;
    evictedCount: number;
    sseMultiplier: number;
    retainedVector: number;
    retainedTerrain: number;
    retainedRaster: number;
    retainedTiles3d: number;
};

/**
 * Engine memory usage snapshot for diagnostics. Byte counts are `f64`
 * because JS has no u64.
 */
declare class MemoryStats_2 {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    readonly budgetBytes: number | undefined;
    readonly bufferCount: number;
    readonly bufferTotalBytes: number;
    readonly evictedCount: number;
    readonly externalBufferBytes: number;
    readonly externalCpuBytes: number;
    readonly fixedGpuBytes: number;
    readonly gpuBytesEst: number;
    readonly reservedBytes: number;
    readonly retainedRaster: number;
    readonly retainedTerrain: number;
    readonly retainedTiles3d: number;
    readonly retainedVector: number;
    readonly sseMultiplier: number;
}

/**
 * Merges a partial placement onto an existing one and checks it is complete.
 * Pure — returns the merged value instead of assigning it, so the caller can
 * validate before committing. Exported so subclasses that manage their own
 * `onUpdateConfig` (e.g. `GLTFModelDesc`'s RTE-split transform) can merge a
 * `geodetic` update with the same semantics instead of re-deriving them.
 */
export declare function mergeGeodetic(current: GeodeticPlacement | undefined, update: Partial<GeodeticPlacement>): GeodeticPlacement;

declare class Mesh {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    aabb: Aabb;
    active: boolean;
    /**
     * Quadrant bitmask to draw (`0` = whole tile); see `navara_mesh::Mesh`.
     */
    fill_quadrants: number;
    indices: number;
    /**
     * Per-vertex normals handle (terrain only).
     */
    get normals(): number | undefined;
    /**
     * Per-vertex normals handle (terrain only).
     */
    set normals(value: number | null | undefined);
    render_order: number;
    /**
     * Skirt indices handle.
     */
    get skirt_indices(): number | undefined;
    /**
     * Skirt indices handle.
     */
    set skirt_indices(value: number | null | undefined);
    /**
     * Skirt per-vertex normals handle.
     */
    get skirt_normals(): number | undefined;
    /**
     * Skirt per-vertex normals handle.
     */
    set skirt_normals(value: number | null | undefined);
    /**
     * Skirt UVs handle.
     */
    get skirt_uvs(): number | undefined;
    /**
     * Skirt UVs handle.
     */
    set skirt_uvs(value: number | null | undefined);
    /**
     * Skirt vertices handle (separate from main geometry for shadow/normal handling).
     */
    get skirt_vertices(): number | undefined;
    /**
     * Skirt vertices handle (separate from main geometry for shadow/normal handling).
     */
    set skirt_vertices(value: number | null | undefined);
    uvs: number;
    vertices: number;
    /**
     * Watermask handle (1 byte uniform or 65536 byte grid).
     */
    get watermask(): number | undefined;
    /**
     * Watermask handle (1 byte uniform or 65536 byte grid).
     */
    set watermask(value: number | null | undefined);
}

declare class MeshAdded {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    gen: number;
    globe: Globe_2;
    ind: number;
    material: RasterTileInternalMaterial;
    mesh: Mesh;
    get ready_parent_tile_handle(): bigint | undefined;
    set ready_parent_tile_handle(value: bigint | null | undefined);
    tile_handle: bigint;
    transform: Transform_2;
}

declare type MeshBaseInstance<Instance extends object = object> = Instance extends Object3D ? Instance : Instance extends {
    raw: infer Raw extends Object3D;
} ? Instance & {
    raw: Raw;
} & BaseInstance : Instance & BaseInstance;

export declare type MeshCache = Map<string, Mesh_2 | Sprite | Object3D>;

declare class MeshChanged {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    gen: number;
    globe: Globe_2;
    ind: number;
    material: RasterTileInternalMaterial;
    mesh: Mesh;
    get ready_parent_tile_handle(): bigint | undefined;
    set ready_parent_tile_handle(value: bigint | null | undefined);
}

export declare type MeshConfig = {
    type?: "mesh";
    /**
     * Local translation. When `matrix` or `matrixWorld` is also set, this is
     * treated as an offset *inside* that frame (left-multiplied by the frame).
     * Otherwise it's applied directly as `Object3D.position`.
     */
    position?: XYZ;
    /**
     * Local scale. See {@link position} for interaction with `matrix` / `matrixWorld`.
     */
    scale?: XYZ;
    /**
     * Local Euler rotation (XYZ order). See {@link position} for interaction
     * with `matrix` / `matrixWorld`.
     */
    rotation?: XYZ;
    /**
     * Local frame. When combined with `position` / `rotation` / `scale`, the
     * effective local matrix is `matrix · T(position) · R(rotation) · S(scale)`.
     * Disables Three.js's auto matrix update.
     *
     * Mutually exclusive with `matrixWorld` and `geodetic`: all three define the
     * object's placement.
     */
    matrix?: Matrix4;
    /**
     * World frame (e.g. an NUE-to-ECEF tangent frame on the globe). When
     * combined with `position` / `rotation` / `scale`, the effective world
     * matrix is `matrixWorld · T(position) · R(rotation) · S(scale)`, so the
     * offset fields are interpreted in the frame's local coordinates.
     * Disables Three.js's auto matrix-world update.
     *
     * Mutually exclusive with `matrix` and `geodetic`: all three define the
     * object's placement.
     */
    matrixWorld?: Matrix4;
    /**
     * High-level geographic placement in degrees and metres. Builds a
     * West-Up-North tangent frame at `lng`/`lat`/`height` and applies
     * `heading`/`pitch`/`roll`/`scale`, then occupies the same slot as
     * `matrixWorld` — so `position` / `rotation` / `scale` remain offsets
     * *inside* the resulting frame.
     *
     * `heading` is the compass bearing the asset's front (glTF `+Z`) faces, the
     * same convention as `setCamera`. Because the frame is Y-up with `+Z` north,
     * an unmodified glTF asset needs no up-axis correction.
     *
     * Mutually exclusive with `matrix` and `matrixWorld`.
     */
    geodetic?: GeodeticPlacement;
    /**
     * Lighting override for every material of the mesh. `false` outputs albedo
     * only, while normals and the shadow G-buffer keep being written.
     * `undefined` follows `view.lit` — passing it to `update()` resets a mesh
     * to inheriting again.
     */
    lit?: boolean;
} & BaseDescConfig;

export declare type MeshConfigWithSelectiveEffect = MeshConfig & {
    effectIds?: string[];
};

/**
 * Abstract base class for creating custom mesh descriptors.
 *
 * Extend this class to add custom Three.js 3D objects (meshes, groups, particles, etc.)
 * to the Navara scene. The base class handles position/scale/rotation synchronization
 * and automatic scene management via {@link getPassKey}.
 *
 * ## Implementing a Custom Mesh Descriptor
 *
 * ### 1. Define configuration types
 *
 * Create a description type for your mesh-specific options, then merge it with the
 * base config and update types:
 *
 * ```typescript
 * type MyMeshDescription = {
 *   myMesh?: {
 *     radius?: number;
 *     color?: Color;
 *     castShadow?: boolean;
 *   };
 * };
 *
 * type MyMeshConfig = MeshConfig & MyMeshDescription;
 * type MyMeshUpdate = MeshUpdate & MyMeshDescription;
 * ```
 *
 * ### 2. Extend `MeshDesc`
 *
 * Implement the {@link createMesh} factory method. Optionally override
 * {@link getPassKey} to control which render scene the mesh belongs to,
 * {@link onUpdateConfig} for dynamic updates, and {@link update} for animation.
 *
 * ```typescript
 * class MyMeshDesc extends MeshDesc<
 *   MyMeshConfig,
 *   MyMeshUpdate,
 *   Mesh<SphereGeometry, MeshStandardMaterial>
 * > {
 *   private config: MyMeshConfig;
 *
 *   constructor(view: ThreeView, ctx: ViewContext, config: MyMeshConfig) {
 *     super(view, ctx, config);
 *     this.config = config;
 *   }
 *
 *   createMesh() {
 *     const cfg = this.config.myMesh ?? {};
 *     const geometry = new SphereGeometry(cfg.radius ?? 1);
 *     const material = new MeshStandardMaterial({
 *       color: cfg.color?.raw ?? 0xffffff,
 *     });
 *     const mesh = new Mesh(geometry, material);
 *     mesh.castShadow = cfg.castShadow ?? false;
 *
 *     // Enable CSM shadows if needed
 *     if (mesh.castShadow) {
 *       this.ctx.applyShadowMaterial(material);
 *     }
 *
 *     return mesh;
 *   }
 *
 *   onUpdateConfig(updates: MyMeshUpdate): void {
 *     if (updates.myMesh && this._instance) {
 *       if (updates.myMesh.color !== undefined) {
 *         this._instance.material.color.set(updates.myMesh.color.raw);
 *       }
 *       this.emit("needsUpdate");
 *     }
 *     super.onUpdateConfig(updates);
 *   }
 * }
 * ```
 *
 * ### 3. Register and use the descriptor
 *
 * ```typescript
 * view.registerMesh("myMesh", MyMeshDesc);
 *
 * const handle = view.addMesh<MyMeshDesc>({
 *   position: { x: 0, y: 100, z: 0 },
 *   scale: { x: 10, y: 10, z: 10 },
 *   rotation: { x: 0, y: Math.PI / 4, z: 0 },
 *   myMesh: { radius: 5, color: new Color("#00ff00") },
 * });
 *
 * // Update dynamically
 * handle.update({ myMesh: { color: new Color("#ff0000") } });
 *
 * // Access the raw Three.js object for direct manipulation
 * const mesh = handle.ref.raw;
 *
 * // Animate on every frame
 * view.on("preUpdate", (time) => {
 *   mesh.rotation.y += 0.01;
 * });
 *
 * // Remove the descriptor
 * handle.delete();
 * ```
 *
 * ## Render Scenes (Pass Keys)
 *
 * Override {@link getPassKey} to control which render scene the mesh is added to:
 * - `"opaque"` (default) - Standard opaque rendering with depth testing.
 * - `"transparent"` - Transparent rendering pass.
 * - `"mrt"` - Multiple Render Target scene, used for selective effects (bloom, outline).
 * - `"skyEnvMap"` - Sky environment map scene.
 * - `"draped"` - This is only for `DrapedMesh`. The mesh is clamped to the terrain.
 *
 * ## Lifecycle
 *
 * 1. **Construction** - The descriptor is instantiated with the view context and config.
 * 2. **{@link createMesh}** - Called during {@link onCreate} to create the Three.js object.
 *    The base class applies position/scale/rotation and adds it to the scene
 *    determined by {@link getPassKey}.
 * 3. **{@link onUpdateConfig}** - Called when `handle.update()` is invoked. The base class
 *    handles `visible`, `matrix`, `matrixWorld`, `position`, `scale`, `rotation`, and `geodetic`; override to handle your
 *    custom properties. Always call `super.onUpdateConfig(updates)`.
 * 4. **{@link update}** - Optional per-frame callback for animation.
 * 5. **{@link onResize}** - Optional callback when the viewport is resized.
 * 6. **{@link onDestroy}** - Called on `handle.delete()`. The base class removes the mesh
 *    from its parent scene. Override to dispose geometry/material resources.
 *
 * @see The `custom-shader` example page for a complete custom mesh descriptor tutorial using
 *      MarchingCubes with a custom shader material.
 *
 * @typeParam Config - Configuration type (extends {@link MeshConfig})
 * @typeParam UpdateConfig - Updatable properties (extends {@link MeshUpdate})
 * @typeParam InstanceObj - The Three.js Object3D type or a wrapper with a `raw` property
 * @typeParam CustomEvent - Additional custom events the descriptor can emit
 * @typeParam Instance - Resolved instance type (inferred automatically)
 */
export declare abstract class MeshDesc<Config extends MeshConfig = MeshConfig, UpdateConfig extends MeshUpdate = MeshUpdate, InstanceObj extends Object3D | {
    raw: Object3D;
} = Object3D | {
    raw: Object3D;
}, CustomEvent extends BaseEventMap = BaseEventMap, Instance extends MeshBaseInstance<InstanceObj> = MeshBaseInstance<InstanceObj>> extends BaseDesc<Config, UpdateConfig, Instance, CustomEvent> {
    position?: XYZ;
    scale?: XYZ;
    rotation?: XYZ;
    matrix?: Matrix4;
    matrixWorld?: Matrix4;
    geodetic?: GeodeticPlacement;
    /** Terrain height under `geodetic`, when `heightReference` is `"terrain"`. */
    protected terrainHeight?: number;
    private terrainUnsubscribe?;
    /** Three-state `lit` override (see {@link MeshConfig.lit}). */
    lit?: boolean;
    private prevPassKey?;
    constructor(view: ThreeView, ctx: ViewContext, config?: Config);
    /**
     * Builds the world frame for a {@link GeodeticPlacement}, adding
     * {@link terrainHeight} when one has been observed. This method does not
     * gate on `heightReference` itself — `terrainHeight` is only ever populated
     * for a terrain-referenced placement, and is cleared otherwise.
     *
     * Fields are passed explicitly rather than spread: `headingPitchRollToFixedFrame`
     * rejects `heightReference`, which this class resolves itself.
     */
    protected resolveGeodeticFrame(g: GeodeticPlacement): Matrix4;
    /**
     * Subscribes to terrain height under a terrain-referenced `geodetic`
     * placement.
     *
     * `sampleTerrainHeight` seeds synchronously from tiles already resident, so
     * the object does not sit at the wrong altitude while tiles stream in; the
     * observer then re-places it on every terrain update. With no terrain layer
     * added, the sample is `undefined` and the observer does not fire until a
     * terrain layer is added, so the placement degrades to ellipsoid-relative
     * rather than failing — terrain layers may be added after the object.
     *
     * Protected (not private) so a subclass that manages its own world-matrix
     * representation for `geodetic` (e.g. `GLTFModelDesc`'s RTE position split)
     * can call it directly from its own `onCreate`/`onUpdateConfig` instead of
     * routing through this class's `onCreate`.
     */
    protected subscribeTerrainHeight(): void;
    /**
     * Re-applies the effective transform after `geodetic`'s resolved frame
     * changes outside of `onUpdateConfig` — currently only a terrain-height
     * observation firing asynchronously. Subclasses that override
     * `applyTransform`'s effect with their own representation (e.g.
     * `GLTFModelDesc`'s RTE position/rotation split, which needs the *encoded*
     * position refreshed too) override this instead of relying on the default.
     */
    protected reapplyGeodeticFrame(): void;
    private unsubscribeTerrainHeight;
    /**
     * Applies {@link lit} to every material under the mesh. Subclasses that
     * attach materials asynchronously (glTF) call it again once they exist.
     */
    protected applyLit(): void;
    /**
     * Determines which render scene the mesh is added to.
     * Override this to change the rendering pass for your mesh.
     *
     * @returns The pass key: `"opaque"` (default), `"transparent"`, `"mrt"`, or `"skyEnvMap"`.
     */
    protected getPassKey(): PassKey;
    /**
     * The G-buffers this mesh's material samples, e.g. `globeNormal`. Must be
     * derivable from the config alone, since it is read before
     * {@link onCreate}. An override whose result changes after creation must
     * emit `gbufferRequirementsChanged` on the context, unless the change
     * comes with moving into or out of the draped pass.
     *
     * Defaults to `globeNormal` in the draped pass, where the render pass
     * shades a lit material with the terrain normal. A draped mesh with an
     * unlit material, or a lit one under `setDrapeGroundNormals(material,
     * false)`, can return `[]` to skip the globe-normal copy.
     */
    getRequiredBuffers(): readonly GBufferName[];
    /**
     * Factory method to create the Three.js 3D object.
     *
     * Override this to return your custom mesh. The returned object can be
     * either a Three.js `Object3D` directly (e.g. `Mesh`, `Group`, `Points`) or
     * a wrapper object with a `raw` property containing the `Object3D`.
     *
     * The base class calls this during {@link onCreate} and automatically
     * applies position, scale, rotation, and adds the object to the appropriate
     * scene. Picking is opt-in: if your layer supports it, construct a
     * {@link PickableMesh} here and register it yourself via
     * `this.ctx.registerPickableMesh(this.id, wrapper)` before returning.
     */
    abstract createMesh(): Instance;
    get raw(): (Instance extends Object3D< Object3DEventMap> ? Instance : never) | (Instance extends {
        raw: infer Raw extends Object3D;
    } ? Raw : never) | undefined;
    onCreate(): void;
    /**
     * Composes position, rotation, and scale into a local `T · R · S` matrix.
     * Returns identity when none are set.
     */
    protected composeLocalTransform(): Matrix4;
    /**
     * The transform {@link applyTransform} gives the object, as one matrix:
     * `frame · T · R · S`, where the frame is `geodetic`, `matrixWorld` or
     * `matrix` and identity when none is set.
     */
    protected composeTransform(): Matrix4;
    /**
     * Applies the configured transform to the underlying `Object3D`.
     *
     * When `matrixWorld` / `geodetic` (or `matrix`) is set together with any of
     * `position` / `rotation` / `scale`, the base/frame is left-multiplied
     * by the local `T · R · S`: e.g. `effective = matrixWorld · T · R · S`.
     * This lets callers pass a frame (such as an NUE-to-ECEF matrix) as
     * `matrixWorld` and express offsets inside that frame via
     * `position` / `rotation` / `scale`.
     *
     * The branches below are a priority chain, which is only safe because
     * `assertNoTransformConflict` has already rejected any state with more than
     * one of `geodetic` / `matrixWorld` / `matrix` set — so an earlier branch
     * can never shadow a configured field.
     */
    protected applyTransform(): void;
    removeFromScene(passKey: PassKey): void;
    addToScene(passKey: PassKey): void;
    onUpdateConfig(updates: UpdateConfig): void;
    onPassKeyChange(): void;
    onDestroy(): void;
    /**
     * Optional per-frame update callback.
     * Override this to animate the mesh (e.g. rotation, morph targets, shader uniforms).
     * @param time - High-resolution timestamp from the main render loop (same value passed
     *   to `requestAnimationFrame`), in milliseconds.
     */
    update?(time: number): void;
    /**
     * Optional callback when the viewport is resized.
     * Override this to adjust the mesh based on viewport dimensions.
     * @param width - New viewport width in pixels.
     * @param height - New viewport height in pixels.
     */
    onResize?(width: number, height: number): void;
}

export declare type MeshDescConstructor<TConfig extends AnyMeshConfig = AnyMeshConfig> = new (view: ThreeView, ctx: ViewContext, config: TConfig) => AnyMeshDesc;

export declare class MeshDescRegistry extends DescRegistry<MeshDescConstructor, AnyMeshDesc, AnyMeshConfig> {
    create(name: string, config: AnyMeshConfig): AnyMeshDesc;
    /**
     * Find mesh type from config (alias for findTypeFromConfig for backward compatibility)
     */
    findMeshType(config: Record<string, unknown>): string | null;
}

export declare abstract class MeshDescWithSelectiveEffect<Config extends MeshConfigWithSelectiveEffect = MeshConfigWithSelectiveEffect, UpdateConfig extends MeshUpdateWithSelectiveEffect = MeshUpdateWithSelectiveEffect, InstanceObj extends Object3D | {
    raw: Object3D;
} = Object3D | {
    raw: Object3D;
}, CustomEvent extends BaseEventMap = BaseEventMap, Instance extends MeshBaseInstance<InstanceObj> = MeshBaseInstance<InstanceObj>> extends MeshDesc<Config, UpdateConfig, InstanceObj, CustomEvent, Instance> {
    protected _effectIds: string[];
    private _onSlotsChanged;
    private _onGBufferChanged;
    constructor(view: ThreeView, ctx: ViewContext, config?: Config);
    protected getPassKey(): PassKey;
    onCreate(): void;
    onUpdateConfig(updates: UpdateConfig): void;
    /**
     * Compute effectIdsMask and set on the mesh's material.
     * Override this for non-standard mesh structures (e.g., Object3D with child meshes).
     */
    protected updateEffectIdsMask(): void;
    onDestroy(): void;
}

/**
 * A live tile mesh whose geometry buffers were rewritten in place (see
 * `EventStore::mesh_geometry_replaced`): only the geometry changes.
 */
declare class MeshGeometryReplaced {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    gen: number;
    ind: number;
    mesh: Mesh;
}

/**
 * A handle to control a mesh descriptor after it has been added to the scene.
 * Returned by `ThreeView.addMesh()`.
 *
 * @typeParam T - The specific mesh descriptor type (e.g., BoxMeshDesc)
 *
 * @example
 * ```typescript
 * const handle = view.addMesh<BoxMeshDesc>({ box: { width: 100 } });
 * handle.update({ box: { width: 200 } });
 * handle.delete();
 * ```
 */
export declare class MeshHandle<T extends AnyMeshDesc = AnyMeshDesc> extends BaseHandle<T> {
}

declare type MeshHandler = {
    setTileMeshPrepared: (handle: bigint) => void;
};

export declare type MeshUpdate = Pick<MeshConfig, "position" | "scale" | "rotation" | "matrix" | "matrixWorld" | "lit"> & {
    /**
     * Partial geographic placement, merged into the stored placement — so
     * `update({ geodetic: { heading } })` keeps the existing lng/lat/height.
     * `lng` and `lat` are required only when the object has no placement yet.
     */
    geodetic?: Partial<GeodeticPlacement>;
} & BaseDescConfigUpdate;

export declare type MeshUpdateWithSelectiveEffect = MeshUpdate & {
    effectIds?: string[];
};

export declare const MODEL_BATCH_SUPPORT: BatchTextureSupport;

/** @deprecated Use {@link MODEL_BATCH_SUPPORT}; `batchLength` is per-mesh
 *  state, not part of the mesh type's capability. */
export declare const MODEL_BATCH_TEXTURE_CONFIG: BatchTextureConfig;

/**
 * Mutation functions for the model base enhancer.
 * Includes `update(state)` to sync refs from state, plus additional methods.
 */
declare type ModelBaseMutates = Mutates<ModelBaseState, ModelBaseUniforms, {
    /**
     * Set the batch data texture ref.
     * This is needed because batchDataTexture is an external ref passed via props.
     */
    setBatchDataTexture: (texture: UniformValue<Texture | null>) => void;
}>;

/**
 * Props for the model base enhancer.
 */
declare type ModelBaseProps = {
    color?: number;
    metalness?: number;
    roughness?: number;
    transparent?: boolean;
    opacity?: number;
    depthWrite?: boolean;
    emissiveColor?: number;
    emissiveIntensity?: number;
    pickable?: boolean;
    effectIdsMask?: number;
    batchDataTexture?: UniformValue<Texture | null>;
    batchColorEnabled?: boolean;
};

/**
 * Mutable references (uniforms) for the model base enhancer.
 *
 * These are shared references with shader.uniforms and can be mutated directly
 * for efficient GPU uniform updates without shader recompilation.
 * Internal type - not exposed externally.
 */
declare type ModelBaseRefs = {
    nvr_uPickable: UniformValue<number>;
    uEffectIdsMask: UniformValue<number>;
    uEmissiveIntensity: UniformValue<number>;
    batchDataTexture?: UniformValue<Texture | null>;
};

/**
 * Immutable state for the model base enhancer.
 * This state is always replaced as a whole (never mutated).
 * Returned directly via states() - refresh after updates.
 */
declare type ModelBaseState = Readonly<{
    pickable: boolean;
    emissiveColor: number;
    emissiveIntensity: number;
    effectIdsMask: number;
    batchColorEnabled: boolean;
}>;

declare type ModelBaseUniforms = Partial<ModelBaseRefs>;

export declare type ModelBatchedAttributeName = "color" | "show" | "opacity" | "emissive" | "emissiveIntensity";

declare class ModelInternalMaterial {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    get dracoAttributes(): DracoAttributeId[] | undefined;
    set dracoAttributes(value: DracoAttributeId[] | null | undefined);
    pointCloudGeodeticNormal: Vec3_2;
    pointCloud: boolean;
}

export declare type ModelMaterial = MeshStandardMaterial | MeshPhysicalMaterial;

declare class ModelMaterial_2 {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    get __internal__(): ModelInternalMaterial | undefined;
    set __internal__(value: ModelInternalMaterial | null | undefined);
    get animationActiveClip(): string | undefined;
    set animationActiveClip(value: string | null | undefined);
    get animationSpeed(): number | undefined;
    set animationSpeed(value: number | null | undefined);
    get applyWaterNormal(): boolean | undefined;
    set applyWaterNormal(value: boolean | null | undefined);
    get castShadow(): boolean | undefined;
    set castShadow(value: boolean | null | undefined);
    get color(): number | undefined;
    set color(value: number | null | undefined);
    /**
     * Crease angle (in radians) used when `normals` is true. Defaults to 30°
     * (PI/6) when omitted.
     */
    get creaseNormalAngle(): number | undefined;
    /**
     * Crease angle (in radians) used when `normals` is true. Defaults to 30°
     * (PI/6) when omitted.
     */
    set creaseNormalAngle(value: number | null | undefined);
    /**
     * Enable writing to depth buffer
     */
    get depthWrite(): boolean | undefined;
    /**
     * Enable writing to depth buffer
     */
    set depthWrite(value: boolean | null | undefined);
    /**
     * IDs of selective effects to apply (e.g., "bloom", "outline")
     */
    get effectIds(): string[] | undefined;
    /**
     * IDs of selective effects to apply (e.g., "bloom", "outline")
     */
    set effectIds(value: string[] | null | undefined);
    /**
     * Emissive glow color in 0xRRGGBB format
     */
    get emissiveColor(): number | undefined;
    /**
     * Emissive glow color in 0xRRGGBB format
     */
    set emissiveColor(value: number | null | undefined);
    /**
     * Emissive glow intensity (omitted = 0, no emissive output)
     */
    get emissiveIntensity(): number | undefined;
    /**
     * Emissive glow intensity (omitted = 0, no emissive output)
     */
    set emissiveIntensity(value: number | null | undefined);
    get height(): number | undefined;
    set height(value: number | null | undefined);
    get ior(): number | undefined;
    set ior(value: number | null | undefined);
    /**
     * Applies the lighting equation to the color output. When `false` the
     * material outputs plain albedo (for deferred lighting) while normals and
     * the shadow G-buffer keep being written.
     */
    get lit(): boolean | undefined;
    /**
     * Applies the lighting equation to the color output. When `false` the
     * material outputs plain albedo (for deferred lighting) while normals and
     * the shadow G-buffer keep being written.
     */
    set lit(value: boolean | null | undefined);
    get maxSse(): number | undefined;
    set maxSse(value: number | null | undefined);
    get metalness(): number | undefined;
    set metalness(value: number | null | undefined);
    /**
     * When true, recompute vertex normals using a creased-normals algorithm
     * after the model loads. Useful for tiled glTF assets that ship without
     * normals or with low-quality normals.
     */
    get normals(): boolean | undefined;
    /**
     * When true, recompute vertex normals using a creased-normals algorithm
     * after the model loads. Useful for tiled glTF assets that ship without
     * normals or with low-quality normals.
     */
    set normals(value: boolean | null | undefined);
    /**
     * Opacity value
     */
    get opacity(): number | undefined;
    /**
     * Opacity value
     */
    set opacity(value: number | null | undefined);
    get pointSize(): number | undefined;
    set pointSize(value: number | null | undefined);
    get receiveShadow(): boolean | undefined;
    set receiveShadow(value: boolean | null | undefined);
    /**
     * Reflectivity for post-process or env map.
     */
    get reflectivity(): number | undefined;
    /**
     * Reflectivity for post-process or env map.
     */
    set reflectivity(value: number | null | undefined);
    /**
     * Reflectivity for post-process.
     */
    get roughness(): number | undefined;
    /**
     * Reflectivity for post-process.
     */
    set roughness(value: number | null | undefined);
    get shininess(): number | undefined;
    set shininess(value: number | null | undefined);
    get shouldRotateInDefault(): boolean | undefined;
    set shouldRotateInDefault(value: boolean | null | undefined);
    get showBoundingBox(): boolean | undefined;
    set showBoundingBox(value: boolean | null | undefined);
    get show(): boolean | undefined;
    set show(value: boolean | null | undefined);
    get size(): number | undefined;
    set size(value: number | null | undefined);
    get specularStrength(): number | undefined;
    set specularStrength(value: number | null | undefined);
    /**
     * Enabling this value allows using `shininess` and `specular_strength`.
     */
    get specular(): boolean | undefined;
    /**
     * Enabling this value allows using `shininess` and `specular_strength`.
     */
    set specular(value: boolean | null | undefined);
    /**
     * Enable transparency and alpha blending
     */
    get transparent(): boolean | undefined;
    /**
     * Enable transparency and alpha blending
     */
    set transparent(value: boolean | null | undefined);
    get url(): string | undefined;
    set url(value: string | null | undefined);
    /**
     * Scale water normal. Decreasing this value will make the water surface rough.
     */
    get waterScaleNormal(): number | undefined;
    /**
     * Scale water normal. Decreasing this value will make the water surface rough.
     */
    set waterScaleNormal(value: number | null | undefined);
    /**
     * Water wave speed.
     */
    get waterSpeed(): number | undefined;
    /**
     * Water wave speed.
     */
    set waterSpeed(value: number | null | undefined);
    /**
     * Apply a water material on the polygon. It might slow down the loading of the mesh.
     */
    get water(): boolean | undefined;
    /**
     * Apply a water material on the polygon. It might slow down the loading of the mesh.
     */
    set water(value: boolean | null | undefined);
}

declare type ModelMaterialEnhancer = ReturnType<typeof createModelMaterialEnhancer>;

/**
 * Combined props for the model material enhancer.
 * Props are explicitly separated into base and water sections for clarity.
 */
declare type ModelMaterialProps = {
    base?: ModelBaseProps;
    water?: ModelWaterOnlyProps;
};

export declare class ModelMesh extends Object3D<CustomObject3DEventMap> implements FeatureMesh, PickableMesh {
    readonly ctx: EventContext;
    /** Enhanced materials with encapsulated state, one per child mesh */
    private _enhancers;
    /** Enhanced materials for point cloud objects, one per Points child */
    private _pntsEnhancers;
    credit: string | undefined;
    batchLength?: number;
    constructor(ctx: EventContext, gltfInfo: {
        scene: Group;
        credit?: string;
    }, m: ModelMesh_2);
    /**
     * Geometry type of this mesh.
     */
    readonly geometryType: "model";
    get water(): boolean;
    set water(v: boolean);
    private init;
    /**
     * Drop the CPU-side typed arrays of a loaded glTF/point-cloud node after its
     * first GPU upload. The GLTFLoader has already computed bounding volumes at
     * parse time (and the point-cloud path assigns them from the WASM AABB), and
     * `_setupMeshNode` has already read `_batchid.array` before this runs, so no
     * CPU read survives the first upload.
     *
     * Skipped for skinned meshes and geometries with morph targets: those keep
     * their CPU arrays for per-frame skinning/morphing on the CPU.
     */
    private _releaseGeometryArrays;
    _getBatchTextureSupport(): BatchTextureSupport;
    _initBatchedMaterial(mesh: Mesh_2<BufferGeometry<NormalBufferAttributes>, ModelMaterial>): void;
    _initBatchDataTexture(mesh: Mesh_2<BufferGeometry<NormalBufferAttributes>, ModelMaterial>): void;
    _updateBatchAttribute(mesh: Mesh_2<BufferGeometry<NormalBufferAttributes>, ModelMaterial>, batchId: number, attribute: ModelBatchedAttributeName, value: number | number[] | boolean): void;
    private _setupMeshNode;
    private _setupPointsNode;
    /**
     * Override a material that is used to generate a shadow map.
     */
    initDepthMaterial(mesh: Mesh_2<BufferGeometry<NormalBufferAttributes>, ModelMaterial>, enhancer: ModelMaterialEnhancer): void;
    _update(material: ModelMaterial_2, active: boolean): void;
    /**
     * Build update props from NavaraModelMaterial for enhancer.update().
     */
    private buildUpdateProps;
    traverseMesh(callback: (m: Mesh_2<BufferGeometry<NormalBufferAttributes>, ModelMaterial>) => void): void;
    _setFeatureColor(color: Color_3, m?: ModelMaterial): void;
    _getFeatureColor(): Color_3;
    _setFeatureShow(visible: boolean): void;
    _setFrustumCulled(culled: boolean): void;
    onBeforePicking(): void;
    onAfterPicking(): void;
    private setPickable;
    getRenderable(): Object3D;
    _setFeatureHeight(_height: number): void;
    _setFeatureOpacity(opacity: number): void;
    dispose(): void;
}

declare class ModelMesh_2 {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    aabb: Aabb;
    active: boolean;
    batch_length: number;
    get bin(): number | undefined;
    set bin(value: number | null | undefined);
    geometry: TransferableModelGeometry;
    material: ModelMaterial_2;
    transform: Transform_2;
}

/**
 * Combined mutation functions for the model water enhancer.
 */
declare type ModelWaterCombinedMutates = {
    readonly base: ModelBaseMutates;
    readonly water: ModelWaterMutates;
};

/**
 * Combined state for the model water enhancer.
 * Includes both base state and water-specific state.
 */
declare type ModelWaterCombinedStates = {
    readonly base: ModelBaseState;
    readonly water: ModelWaterState;
};

/**
 * Mutation functions for the water enhancer (internal only).
 */
declare type ModelWaterMutates = Mutates<ModelWaterState, ModelWaterUniforms, {
    /**
     * Set the water normal map uniform ref.
     * Assigns the external ref object (identity doesn't change after mount).
     */
    setWaterNormalMap: (waterNormalMapUniform: UniformValue<Texture | null>, useWater: boolean) => void;
    /**
     * Set the time uniform ref.
     * Assigns the external ref object (identity doesn't change after mount).
     */
    setTimeUniform: (timeUniform: UniformValue<number>) => void;
    /**
     * Set the sky env map uniform ref.
     * Assigns the external ref object (identity doesn't change after mount).
     */
    setSkyEnvMapUniform: (skyEnvMapUniform: UniformValue<Texture | null>) => void;
}>;

/**
 * Water-only props (excluding base props).
 */
declare type ModelWaterOnlyProps = {
    water?: boolean;
    waterScaleNormal?: number;
    waterSpeed?: number;
    shininess?: number;
    specularStrength?: number;
    applyWaterNormal?: number | boolean;
    specular?: boolean;
    ior?: number;
    reflectivity?: number;
    skyEnvMap?: Texture | null;
    waterNormalMap?: UniformValue<Texture | null>;
    timeUniform?: UniformValue<number>;
    skyEnvMapUniform?: UniformValue<Texture | null>;
};

/**
 * Mutable references (uniforms) for the water enhancer.
 *
 * These are shared references with shader.uniforms and can be mutated directly
 * for efficient GPU uniform updates without shader recompilation.
 * Internal type - not exposed externally.
 */
declare type ModelWaterRefs = {
    reflectivity: UniformValue<number>;
    uWaterNormalMap: UniformValue<Texture | null>;
    cachedWaterNormalMap: UniformValue<Texture | null>;
    uWaterScaleNormal: UniformValue<number>;
    uWaterSpeed: UniformValue<number>;
    uShininess: UniformValue<number>;
    uSpecularStrength: UniformValue<number>;
    uApplyWaterNormal: UniformValue<number>;
    uSpecular: UniformValue<boolean>;
    uIor: UniformValue<number>;
    uTime?: UniformValue<number>;
    tSkyEnvMap?: UniformValue<Texture | null>;
};

/**
 * Immutable state for the water enhancer.
 * This state is always replaced as a whole (never mutated).
 * Returned directly via states() - refresh after updates.
 */
declare type ModelWaterState = Readonly<{
    useWater: boolean;
    skyEnvMap: Texture | null;
    reflectivity: number;
    waterScaleNormal: number;
    waterSpeed: number;
    shininess: number;
    specularStrength: number;
    applyWaterNormal: boolean;
    specular: boolean;
    ior: number;
}>;

declare type ModelWaterUniforms = Partial<Omit<ModelWaterRefs, "cachedWaterNormalMap">>;

export declare type MRTPassConfig = Description_2 & EffectConfig;

export declare class MRTPassEffectDesc extends EffectDesc<MRTPassConfig, MRTPassUpdate, CustomRenderPass> {
    static key: string;
    private config;
    constructor(view: ThreeView, ctx: ViewContext, config: MRTPassConfig);
    createPass(): CustomRenderPass;
    get normalBuffer(): Texture | undefined;
    /**
     * Selective-effect bitmask buffer (R=bitmask).
     * `undefined` when the view disabled `buffers.selectiveEffect`.
     */
    get effectIdsBuffer(): Texture | undefined;
    /**
     * Emissive RGB buffer (HDR).
     * `undefined` when the view disabled `buffers.emissive`.
     */
    get emissiveBuffer(): Texture | undefined;
    /**
     * Shadow buffer (R=shadow amount, 0=lit..1=fully shadowed).
     * `undefined` unless an active effect requires the `shadow` buffer.
     */
    get shadowBuffer(): Texture | undefined;
    get depthBuffer(): Texture | undefined;
    get depthBufferPacking(): DepthPackingStrategies | undefined;
    get globeNormalBuffer(): Texture | undefined;
    get globeDepthBuffer(): Texture | undefined;
    get globeDepthBufferPacking(): DepthPackingStrategies | undefined;
    onUpdateConfig(updates: MRTPassUpdate): void;
    onDestroy(): void;
}

export declare type MRTPassUpdate = Description_2 & EffectUpdate;

/**
 * Generic Mutates type - refs must be updated by states.
 * All mutates have:
 * - `update(state)`: Syncs internal refs from state
 * - `updateUniforms(uniforms, state)`: Assigns internal refs to shader.uniforms
 * Additional methods can be added via the Methods type parameter.
 */
export declare type Mutates<States, Uniforms extends ShaderUniforms, Methods extends Record<string, (...args: never[]) => void> = Record<never, never>> = {
    update: (states: States) => void;
    updateUniforms: (uniforms: Uniforms, states: States) => void;
} & Methods;

/**
 * Codec for the normal buffer's RG channels, which are **octahedral**, not a
 * plain `xy * 2 - 1`: decode with `unpackVec2ToNormal`. Prepend to shaders
 * that cannot use `#include` resolution (postprocessing effect fragments).
 */
export declare const NORMAL_PACKING_SHADER: string;

/**
 * A pass that copies normal buffer contents to a render target.
 */
export declare class NormalCopyPass extends Pass_2 {
    private _renderTarget;
    private _material;
    private _autoResize;
    constructor(renderTarget?: WebGLRenderTarget, autoResize?: boolean);
    get texture(): Texture;
    get autoResize(): boolean;
    set autoResize(value: boolean);
    set unpackNormal(v: boolean);
    setNormalTexture(texture: Texture): void;
    setSize(width: number, height: number): void;
    render(renderer: WebGLRenderer, _inputBuffer: WebGLRenderTarget | null, _outputBuffer: WebGLRenderTarget | null): void;
    dispose(): void;
}

declare type NormalizeWASMClass<C> = ExtractProperties<RemoveFreeRecursively<C>>;

/**
 * Creates a local North-East-Down (NED) reference frame transformation matrix at a position.
 * @param origin - Origin position in ECEF coordinates
 * @returns 4x4 transformation matrix from NED to ECEF
 */
export declare function northEastDownToFixedFrame(origin: Vector3): Matrix4;

/**
 * Creates a local North-Up-East (NUE) reference frame transformation matrix at a position.
 * @param origin - Origin position in ECEF coordinates
 * @returns 4x4 transformation matrix from NUE to ECEF
 */
export declare function northUpEastToFixedFrame(origin: Vector3): Matrix4;

/**
 * Creates a local North-West-Up (NWU) reference frame transformation matrix at a position.
 * @param origin - Origin position in ECEF coordinates
 * @returns 4x4 transformation matrix from NWU to ECEF
 */
export declare function northWestUpToFixedFrame(origin: Vector3): Matrix4;

export declare type Nullable<T> = T | null | undefined;

/**
 * Stamped from `material.transparent`. Under blending, `normalBuffer.a` is
 * the attachment's blend factor, so a blended material must write 1.0 there
 * instead of roughness or it keeps the normal of whatever lies behind.
 */
export declare const NVR_BLENDED_DEFINE = "NVR_BLENDED";

/** `lit: true` – wins over {@link NVR_UNLIT_SCENE_DEFINE}. */
export declare const NVR_LIT_DEFINE = "NVR_LIT";

/** `lit: false` – only the lighting equation is bypassed; the lit pipeline
 * still runs, so normals and the shadow G-buffer keep being written. */
export declare const NVR_UNLIT_DEFINE = "NVR_UNLIT";

/** Scene-level default, stamped by `CustomRenderPass` from `view.lit`. */
export declare const NVR_UNLIT_SCENE_DEFINE = "NVR_UNLIT_SCENE";

declare class ObjectTransformEvent {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    gen: number;
    ind: number;
    transform: Transform_2;
}

export declare class Observed<T> extends EventHandler<ObservedEvent<T>> {
    private _value;
    constructor(v: T);
    get value(): T;
    set value(v: T);
    changed(f: (v: T) => void): void;
}

export declare type ObservedEvent<T> = {
    changed: (v: T) => void;
};

export declare type OmitType<T> = T extends unknown ? Omit<T, "type"> : never;

/**
 * Configuration options for initializing ThreeView.
 */
export declare type Options = {
    /** Container element to append the canvas to. */
    container?: HTMLElement;
    /** Canvas element for rendering. If not provided, a new canvas is created. */
    canvas?: HTMLCanvasElement | OffscreenCanvas;
    /** Device pixel ratio override. When not specified, the device value is
     * used, capped at 2 on mobile (1 with `mobileOptimization`) — screen-sized
     * render targets grow quadratically with pixel ratio and dominate mobile
     * GPU memory. An explicit value bypasses the caps. */
    pixelRatio?: number;
    /** Disables automatic resize handling on window resize events. */
    disableAutoResize?: boolean;
    /** Enables debug mode with performance stats overlay. */
    debug?: boolean;
    /** Atmosphere rendering configuration options. */
    atmosphere?: AtmosphereOptions;
    /** Background color of the scene. Defaults to dark color (0x0a0a0f). */
    backgroundColor?: Color_2;
    /**
     * Feature picking configuration (default: true). Enables the `featureClick`
     * event (click or touch tap) and the `featureHover` / `featureEnter` /
     * `featureLeave` events (pointer hover).
     */
    picking?: boolean;
    /** When true, renders every frame. When false, renders only on changes or when forceUpdate() is called. */
    animation?: boolean;
    /** Number of samples for MSAA (Multi-Sample Anti-Aliasing). 0 disables MSAA. */
    multisampling?: number;
    /** Uses half-float precision for post-processing. Higher quality when true. @defaultValue true */
    halfFloat?: boolean;
    /** Enables logarithmic depth buffer for improved depth precision at large scales. @defaultValue true */
    logarithmicDepthBuffer?: boolean;
    /** Enables shadow mapping. Must be set at initialization time. */
    shadow?: boolean;
    /** Enables mobile device optimizations such as lower pixel ratio. */
    mobileOptimization?: boolean;
    /**
     * Milliseconds of inactivity (no Rust-side events) before the `idle` event fires.
     * @defaultValue 100
     */
    idleThreshold?: number;
    /**
     * Memory budget in bytes for tile caches (WASM buffers + estimated GPU
     * cost). Tiles leaving the view are retained until the budget is exceeded,
     * then evicted least-recently-visited first — panning back is refetch-free
     * while total usage stays capped. Naming follows Cesium3DTileset.cacheBytes.
     * @defaultValue device-dependent, see `getDefaultCacheBytes`
     */
    cacheBytes?: number;
    /**
     * LOD fog: distance-based screen-space-error relaxation used by tile LOD
     * selection — far tiles tolerate a larger error and stay coarser while
     * near tiles keep full resolution. Purely an LOD control; it never
     * affects visual fog rendering. Partial overrides are merged over the
     * device default.
     * @defaultValue device-memory-dependent, see `getDefaultLodFog`
     */
    lodFog?: Partial<LodFogSettings>;
    /**
     * Dynamic screen-space error (CesiumJS `dynamicScreenSpaceError`
     * equivalent): tilted, street-level horizon views tolerate a larger error
     * for far tiles, cutting the tile working set in exactly the views that
     * over-refine. Zero effect looking straight down. Partial overrides are
     * merged over the default.
     * @defaultValue see `getDefaultDynamicSse`
     */
    dynamicSse?: Partial<DynamicSseSettings>;
    /**
     * Overrides for the worker-side memory budgets (per-tile-worker WASM heap
     * recycle threshold and the font worker's cache budget). Defaults derive
     * from the device memory together with `cacheBytes` — see
     * `getDefaultMemoryBudgets`. The font budget caps *further growth* of the
     * font caches; WASM heaps never return memory to the OS.
     */
    memoryBudget?: {
        maxWorkerHeapBytes?: number;
        fontBudgetBytes?: number;
        /** In-flight data fetch cap per tile pipeline (see `getDefaultMemoryBudgets`). */
        maxPendingRequests?: number;
        /**
         * Resting (base) memory-pressure SSE multiplier. On mobile a value > 1
         * keeps far tiles coarser even when the budget is not exceeded. Defaults
         * per device — see `getDefaultSseMultiplierRange`.
         */
        sseMultiplierMin?: number;
        /**
         * Ceiling for the dynamic memory-pressure SSE degrade. A larger value lets
         * the engine shed more of the visible set under pressure before the tab is
         * killed. Defaults per device — see `getDefaultSseMultiplierRange`.
         */
        sseMultiplierMax?: number;
    };
    /**
     * Enables shared water texture. When enabled, a single water normal texture
     * is loaded once and shared across all meshes that have water effects enabled.
     */
    waterTexture?: {
        /** Whether to enable the shared water texture. */
        enabled: boolean;
        /** Custom water normal texture URL. Uses built-in texture if not specified. */
        url?: string;
    };
    /**
     * Attribution (credit) UI, on by default (accessed via
     * {@link ThreeView.attribution}). Pass `false` to opt out (e.g. to build your
     * own UI), or an object to configure the initial style / corner. Skipped in a
     * worker (no DOM), so `view.attribution` is `undefined` there.
     * @defaultValue true
     */
    defaultAttribution?: boolean | AttributionPluginOptions;
} & GlobeOptions;

/* Excluded from this release type: overrideMaterialsForMRT */

declare class OverscaledTileHandle {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    handle: bigint;
}

/**
 * Pack show and opacity into a single float: `sign(show) * (1 + opacity)`.
 * The magnitude stays in [1, 2] so the sign is never ambiguous and opacity
 * keeps full float precision.
 */
export declare function packShowOpacity(show: number, opacity: number): number;

export { ParseCssFontFamilyOptions }

export { parseCssUnicodeRange }

export { parseFontFamilyFromCss }

/**
 * Parameters sent to the MVT parse worker.
 *
 * `configs_json` is a JSON-encoded `Vec<LayerParseConfig>`; the pbf bytes live
 * in the BufferStore under `pbf_handle` and are resolved to a transferable
 * `Uint8Array` on the JS side before invoking the worker.
 */
declare class ParseMvtTileParameters {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    /**
     * Tile-payload compression code (0 = none/plain); the worker decompresses.
     */
    compression: number;
    configs_json: string;
    pbf_handle: number;
    get tile_extent(): ExtentRadianF32 | undefined;
    set tile_extent(value: ExtentRadianF32 | null | undefined);
    x: number;
    y: number;
    z: number;
}

/**
 * Parsed tile handed back from the worker round trip. The JS side stores the
 * four packed streams in the `BufferStore` (via `newBufferF64` etc., which
 * write straight into WASM memory) and passes only their handles here, along
 * with the structured-clone tile meta (per-group headers + per-layer property
 * tables).
 */
declare class ParseMvtTileResult {
    free(): void;
    [Symbol.dispose](): void;
    /**
     * A zero-feature placeholder for completing the task lifecycle when the
     * JS side fails after dispatch (worker error, BufferStore exhaustion,
     * corrupt meta). The sentinel handles resolve to empty streams
     * (`take_streams` falls back to empty vecs; `BufferStore::remove` on an
     * absent handle is a no-op) and the empty meta finalizes zero groups, so
     * the delegator is torn down normally instead of staying `Requested`
     * forever and occupying one of the engine's pending parse slots.
     */
    static empty(): ParseMvtTileResult;
    /**
     * `meta` is a serialized `ParsedMvtTileMeta` produced by the parse worker;
     * it must describe the same streams the handles point to.
     */
    constructor(f64_handle: number, f32_handle: number, u32_handle: number, u8_handle: number, meta: any);
}

export declare class Pass<P extends Pass_2, E extends Effect_2 | unknown, O extends EffectOptions = EffectOptions, BaseEv extends BaseEventMap = BaseEventMap, Ev extends BaseEventMap & EffectEvents = BaseEv & EffectEvents> extends EventHandler<Ev> {
    rawPass: P;
    rawEffect: E;
    protected options: O;
    constructor(pass: P, effect: E, options?: O);
    get raw(): P;
    get enabled(): boolean;
    set enabled(v: boolean);
    get visible(): boolean;
    set visible(v: boolean);
    protected onMounted(): void;
    dispose(): void;
}

export declare type PassKey = keyof Pick<Scenes, "opaque" | "transparent" | "mrt" | "skyEnvMap" | "draped">;

/**
 * Pick search radius in CSS pixels around the pointer. The pick reads a
 * (2r+1)² window and takes the non-zero batch id closest to its center, so
 * small features (points, thin lines) don't demand pixel-perfect aim.
 */
export declare const PICK_RADIUS = 3;

/**
 * Turnkey {@link PickableMesh} implementation for `InstancedMesh`.
 *
 * Adds a per-instance `batchId` attribute and injects picking shader code.
 * During the pick pass each instance renders with its unique batchId color.
 *
 * The wrapper owns the batchId array; callers drive instance lifecycle via
 * {@link addInstance}, {@link removeInstanceAt}, {@link clearInstances},
 * {@link replaceAll}, and {@link syncMesh} (after a buffer grow).
 */
export declare class PickableInstancedMeshWrapper extends Object3D implements PickableMesh {
    mesh: InstancedMesh_2;
    private ctx;
    batchIds: number[];
    private refs;
    private batchIdAttr;
    /** Set of materials that already have picking shaders installed. */
    private injectedMaterials;
    constructor(mesh: InstancedMesh_2, initialCount: number, ctx: ViewContext);
    /** Allocate a batchId for a new instance and extend the attribute. */
    addInstance(): number;
    /** Remove an instance by index (swap-with-last, O(1)). */
    removeInstanceAt(index: number): void;
    /** Drop all instance batchIds. */
    clearInstances(): void;
    /** Regenerate `count` fresh batchIds and refresh the attribute. */
    replaceAll(count: number): number[];
    /** Re-attach bookkeeping after the underlying `InstancedMesh` was replaced. */
    syncMesh(mesh: InstancedMesh_2): void;
    /** Create/update the per-instance batchId attribute on the geometry. */
    private setupBatchIdAttribute;
    /** Install picking shader hooks on materials that haven't been injected yet. */
    private setupShader;
    onBeforePicking(_pickingCoord?: Vector2): void;
    onAfterPicking(): void;
    getRenderable(): Object3D;
}

/**
 * Contract for an object that participates in GPU picking.
 *
 * Implementers must provide {@link onBeforePicking}, {@link onAfterPicking},
 * and {@link getRenderable}. Register an instance via
 * `ViewContext.registerPickableMesh` so the pick pass can discover it.
 *
 * Navara does NOT rewrite your shaders. While the two hooks are active, your
 * material must output the encoded `batchId` as the flat final color — how
 * that is achieved is your concern. For a turnkey implementation over stock
 * Three.js materials see {@link PickableMeshWrapper}; for `InstancedMesh` see
 * {@link PickableInstancedMeshWrapper}.
 *
 * This class is a loose base: classes that already extend a Three.js type
 * (`Mesh`, `Group`, etc.) may `implement` it instead of `extend`-ing it —
 * {@link isPickableMesh} uses a structural check rather than `instanceof`.
 */
export declare class PickableMesh {
    /**
     * Fired immediately before the pick pass renders this entry. Configure
     * your material so the next draw outputs the encoded `batchId` as
     * `gl_FragColor`.
     */
    onBeforePicking(_pickingCoord?: Vector2): void;
    /** Fired immediately after the pick pass completes. Restore normal rendering. */
    onAfterPicking(): void;
    /**
     * The Object3D to re-parent into the pick scene for the picking render.
     * The wrapper itself is bookkeeping and is never added to a scene.
     */
    getRenderable(): Object3D;
}

/**
 * Turnkey {@link PickableMesh} implementation for stock Three.js materials.
 *
 * Traverses the wrapped Object3D and injects picking shader code into every
 * child `Mesh`'s material: `onBeforeCompile` for standard materials, direct
 * source mutation for `ShaderMaterial`. During the pick pass the fragment
 * shader outputs a batchId-encoded color, bypassing lighting/tonemapping.
 *
 * Apply this explicitly, don't rely on the framework to
 * wrap your mesh for you. If you have a custom shader and don't want shader
 * injection, implement {@link PickableMesh} yourself instead of using this
 * class.
 */
export declare class PickableMeshWrapper extends Object3D implements PickableMesh {
    object: Object3D;
    readonly batchId: number;
    private refs;
    /** Materials that already have picking shaders installed. */
    private injectedMaterials;
    constructor(object: Object3D, ctx: ViewContext);
    /**
     * Re-scan the wrapped object and inject picking into any materials that
     * appeared since the last pass (e.g. after a layer swapped its material).
     * Preserves the existing `batchId` and skips materials already injected.
     */
    syncMaterials(): void;
    private setupShaders;
    onBeforePicking(_pickingCoord?: Vector2): void;
    onAfterPicking(): void;
    getRenderable(): Object3D;
}

/**
 * Turnkey {@link PickableMesh} implementation for a group of sibling
 * `InstancedMesh`es that share one logical per-instance identity.
 *
 * Used for instanced GLTF models: a single source model has multiple sub-meshes
 * (one `InstancedMesh` per node), each with its own geometry and material.
 * Every instance `i` represents one full model, so all sub-meshes at slot `i`
 * share the same `batchId`. Picking any sub-mesh of a given instance resolves
 * to the same id.
 *
 * The wrapper owns a single `batchIds` array, installs a synchronized
 * `batchId` `InstancedBufferAttribute` on every sub-mesh geometry, and injects
 * the instanced picking shader into every sub-mesh material.
 */
export declare class PickableMultiInstancedMeshWrapper extends Object3D implements PickableMesh {
    root: Object3D;
    meshes: InstancedMesh_2[];
    private ctx;
    batchIds: number[];
    private refs;
    private attrs;
    private injectedMaterials;
    constructor(root: Object3D, meshes: InstancedMesh_2[], initialCount: number, ctx: ViewContext);
    addInstance(): number;
    removeInstanceAt(index: number): void;
    clearInstances(): void;
    replaceAll(count: number): number[];
    /** Re-attach bookkeeping after the underlying sub-meshes were replaced. */
    syncMeshes(meshes: InstancedMesh_2[]): void;
    private setupBatchIdAttributes;
    private setupShaders;
    onBeforePicking(_pickingCoord?: Vector2): void;
    onAfterPicking(): void;
    getRenderable(): Object3D;
}

export declare type PickedFeature = FeatureInfo;

export declare type Plane = Required<NormalizeWASMClass<Plane_2>>;

declare class Plane_2 {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    distance: number;
    normal: Vec3_3;
}

/**
 * Base `Plugin` abstract class.
 * This class doesn't have a logic, but has interfaces.
 * ```
 * class MyPlugin extends Plugin<ThreeView<MyCustomDescriptions>, ViewContext> {
 *   async init(view, ctx) {
 *     // ...
 *   }
 * }
 * ```
 */
declare abstract class Plugin_2<TView = unknown, TCtx = unknown> {
    abstract init(view: TView, ctx: TCtx): Promise<void>;
}
export { Plugin_2 as Plugin }

/** A `pnts` source: a single Point Cloud tile. */
export declare type PntsSource = SourceBase & WithColorSupport<Layer_2<Tiles3dSourceDescription & {
    type: "pnts";
}>>;

declare class PointMaterial {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    /**
     * Whether faces seen from behind are culled. Default is false, so a
     * quad frozen in its anchor's frame (`rotateWithCamera: false`) stays
     * visible from behind. Turn it on to hide a flat quad's parts that wrap
     * over the horizon, which face away from the camera.
     */
    get backfaceCulling(): boolean | undefined;
    /**
     * Whether faces seen from behind are culled. Default is false, so a
     * quad frozen in its anchor's frame (`rotateWithCamera: false`) stays
     * visible from behind. Turn it on to hide a flat quad's parts that wrap
     * over the horizon, which face away from the camera.
     */
    set backfaceCulling(value: boolean | null | undefined);
    /**
     * anchor point of the sprite, range is (-0.5, -0.5) to (0.5, 0.5).
     * Default is (0.0, 0.0) which means the center of the sprite.
     */
    get center(): Vec2_2 | undefined;
    /**
     * anchor point of the sprite, range is (-0.5, -0.5) to (0.5, 0.5).
     * Default is (0.0, 0.0) which means the center of the sprite.
     */
    set center(value: Vec2_2 | null | undefined);
    get clampToGround(): boolean | undefined;
    set clampToGround(value: boolean | null | undefined);
    get color(): number | undefined;
    set color(value: number | null | undefined);
    /**
     * Placement priority for decluttering; higher wins. Only meaningful when
     * `declutter` is enabled. Defaults to `0.0`.
     */
    get declutterPriority(): number | undefined;
    /**
     * Placement priority for decluttering; higher wins. Only meaningful when
     * `declutter` is enabled. Defaults to `0.0`.
     */
    set declutterPriority(value: number | null | undefined);
    /**
     * Participate in screen-space decluttering: when labels/sprites overlap
     * on screen, lower-priority ones are hidden. Defaults to `true`; set to
     * `false` to draw every label unconditionally.
     */
    get declutter(): boolean | undefined;
    /**
     * Participate in screen-space decluttering: when labels/sprites overlap
     * on screen, lower-priority ones are hidden. Defaults to `true`; set to
     * `false` to draw every label unconditionally.
     */
    set declutter(value: boolean | null | undefined);
    get depthTest(): boolean | undefined;
    set depthTest(value: boolean | null | undefined);
    /**
     * IDs of selective effects to apply (e.g., "bloom", "outline")
     */
    get effectIds(): string[] | undefined;
    /**
     * IDs of selective effects to apply (e.g., "bloom", "outline")
     */
    set effectIds(value: string[] | null | undefined);
    /**
     * Emissive glow color in 0xRRGGBB format
     */
    get emissiveColor(): number | undefined;
    /**
     * Emissive glow color in 0xRRGGBB format
     */
    set emissiveColor(value: number | null | undefined);
    /**
     * Emissive glow intensity (omitted = 0, no emissive output)
     */
    get emissiveIntensity(): number | undefined;
    /**
     * Emissive glow intensity (omitted = 0, no emissive output)
     */
    set emissiveIntensity(value: number | null | undefined);
    /**
     * Source geometry types this appearance consumes: `"point"`, `"line"`,
     * `"polygon"`. Defaults to `["point"]`; adding `"line"`/`"polygon"` also
     * emits a point per line-string / polygon-ring vertex.
     */
    get geometryTypes(): string[] | undefined;
    /**
     * Source geometry types this appearance consumes: `"point"`, `"line"`,
     * `"polygon"`. Defaults to `["point"]`; adding `"line"`/`"polygon"` also
     * emits a point per line-string / polygon-ring vertex.
     */
    set geometryTypes(value: string[] | null | undefined);
    get height(): number | undefined;
    set height(value: number | null | undefined);
    /**
     * Avoid overlapping with the globe surface.
     */
    get offsetDepth(): boolean | undefined;
    /**
     * Avoid overlapping with the globe surface.
     */
    set offsetDepth(value: boolean | null | undefined);
    get opacity(): number | undefined;
    set opacity(value: number | null | undefined);
    /**
     * Whether the point stands up (`"upright"`, the default) or lies on the
     * globe surface around its anchor (`"flat"`). Pair with
     * `rotateWithCamera`.
     */
    get pointFacing(): string | undefined;
    /**
     * Whether the point stands up (`"upright"`, the default) or lies on the
     * globe surface around its anchor (`"flat"`). Pair with
     * `rotateWithCamera`.
     */
    set pointFacing(value: string | null | undefined);
    /**
     * Whether the point turns to follow the camera. `true` (the default)
     * keeps it facing the viewer. `false` freezes it in the anchor's local
     * east-north-up frame, so moving the camera never reorients it.
     */
    get rotateWithCamera(): boolean | undefined;
    /**
     * Whether the point turns to follow the camera. `true` (the default)
     * keeps it facing the viewer. `false` freezes it in the anchor's local
     * east-north-up frame, so moving the camera never reorients it.
     */
    set rotateWithCamera(value: boolean | null | undefined);
    /**
     * Rotation of the point within its own plane, about its anchor point, in
     * degrees, clockwise seen from the front. `center` decides where inside
     * the quad the pivot sits. Defaults to `0.0`.
     */
    get rotation(): number | undefined;
    /**
     * Rotation of the point within its own plane, about its anchor point, in
     * degrees, clockwise seen from the front. `center` decides where inside
     * the quad the pivot sits. Defaults to `0.0`.
     */
    set rotation(value: number | null | undefined);
    get show(): boolean | undefined;
    set show(value: boolean | null | undefined);
    /**
     * Whether the size is specified in meters. If false, the size is in pixels. Default is true.
     */
    get sizeInMeters(): boolean | undefined;
    /**
     * Whether the size is specified in meters. If false, the size is in pixels. Default is true.
     */
    set sizeInMeters(value: boolean | null | undefined);
    /**
     * size in pixels/meters (units are determined by `sizeInMeters`).
     */
    get size(): number | undefined;
    /**
     * size in pixels/meters (units are determined by `sizeInMeters`).
     */
    set size(value: number | null | undefined);
    get transparent(): boolean | undefined;
    set transparent(value: boolean | null | undefined);
}

declare class PointMesh {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    active: boolean;
    batch_length: number;
    geometry: TransferablePointGeometry;
    material: PointMaterial;
    transform: Transform_2;
}

export declare const POLYGON_BATCH_SUPPORT: BatchTextureSupport;

/**
 * Mutation functions for the polygon base enhancer.
 * Includes `update(state)` to sync refs from state, plus additional methods.
 */
declare type PolygonBaseMutates = Mutates<PolygonBaseState, PolygonBaseUniforms, {
    /**
     * Update RTE (Relative-To-Eye) uniforms for high-precision rendering.
     * Call this per-frame to update the model-view matrix and camera position.
     * Does nothing if RTE is not enabled.
     *
     * @param modelViewMatrixRTE - The model-view matrix in RTE coordinates
     * @param cameraPositionHigh - High-precision component of camera position
     * @param cameraPositionLow - Low-precision component of camera position
     * @param state - PolygonBaseState
     */
    updateRteUniforms: (modelViewMatrixRTE: Matrix4, cameraPositionHigh: Vector3, cameraPositionLow: Vector3, state: PolygonBaseState) => void;
    /**
     * Set the batch data texture ref.
     * This is needed because batchDataTexture is an external ref passed via props.
     */
    setBatchDataTexture: (texture: UniformValue<Texture | null>) => void;
}>;

/**
 * Props for the polygon core enhancer.
 */
declare type PolygonBaseProps = {
    color?: number;
    opacity?: number;
    transparent?: boolean;
    wireframe?: boolean;
    minMaxHeight?: [number, number];
    addExtrudedHeight?: number;
    addHeight?: number;
    clampToGround?: boolean;
    isTexturized?: boolean;
    pickable?: boolean;
    effectIdsMask?: number;
    reflectivity?: number;
    roughness?: number;
    emissiveColor?: number;
    emissiveIntensity?: number;
    batchDataTexture?: UniformValue<Texture | null>;
    batchColorEnabled?: boolean;
    useRTE?: boolean;
};

/**
 * Mutable references (uniforms) for the polygon base enhancer.
 *
 * These are shared references with shader.uniforms and can be mutated directly
 * for efficient GPU uniform updates without shader recompilation.
 * Internal type - not exposed externally.
 */
declare type PolygonBaseRefs = {
    uMinMaxHeight: UniformValue<[number, number] | undefined>;
    uAddExtrudedHeight: UniformValue<number>;
    uAddHeight: UniformValue<number>;
    uClampToGround: UniformValue<boolean>;
    nvr_uPickable: UniformValue<number>;
    uEffectIdsMask: UniformValue<number>;
    uEmissiveIntensity: UniformValue<number>;
    uIsTexturized: UniformValue<boolean>;
    reflectivity: UniformValue<number>;
    roughness: UniformValue<number>;
    batchDataTexture?: UniformValue<Texture | null>;
    modelViewMatrixRTE?: UniformValue<Matrix4>;
    u_cameraPositionHigh?: UniformValue<Vector3>;
    u_cameraPositionLow?: UniformValue<Vector3>;
    /** Always 1.0 — blocks fast-math reassociation of the RTE recombination. */
    u_rteOne?: UniformValue<number>;
};

/**
 * Immutable state for the polygon base enhancer.
 * This state is always replaced as a whole (never mutated).
 * Returned directly via states() - refresh after updates.
 */
declare type PolygonBaseState = Readonly<{
    useRTE: boolean;
    isTexturized: boolean;
    clampToGround: boolean;
    pickable: boolean;
    emissiveColor: number;
    emissiveIntensity: number;
    effectIdsMask: number;
    minMaxHeight: [number, number] | undefined;
    addExtrudedHeight: number;
    addHeight: number;
    reflectivity: number;
    roughness: number;
    batchColorEnabled: boolean;
}>;

declare type PolygonBaseUniforms = Partial<PolygonBaseRefs>;

export declare type PolygonGeometryData = {
    positionHigh: Float32Array;
    positionLow: Float32Array;
    /** Absent for a `clampToGround` polygon. */
    normal?: Float32Array;
    /** `xyz` = extrusion direction, `w` = 0 on the bottom cap, 1 on the top. */
    scaleNormalAndCap: Float32Array;
    indices: Uint32Array;
    extent: GeographicExtent;
};

/**
 * Geometry builders for standalone polygon and polyline meshes, using the
 * vector layer's construction. Positions are RTE-encoded.
 */
/** A polygon layer material, as a plain object. */
export declare type PolygonGeometryMaterial = NormalizeWASMClass<PolygonMaterial_2>;

/**
 * `[min, max]` height a clamp-to-ground polygon volume over `extent` must
 * span to enclose the ground heights `range`, given the flat cap triangles
 * {@link buildPolygonGeometry} produces.
 */
export declare function polygonGroundVolume(range: HeightRange, extent: GeographicExtent): [number, number];

declare class PolygonInternalMaterial {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    minMaxHeights: Float64Array;
}

declare class PolygonInternalMaterial_2 {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    minMaxHeights: Float64Array;
}

declare class PolygonMaterial {
    free(): void;
    [Symbol.dispose](): void;
    constructor(show?: boolean | null, cast_shadow?: boolean | null, receive_shadow?: boolean | null, color?: number | null, clamp_to_ground?: boolean | null, tiled?: boolean | null, height?: number | null, extruded_height?: number | null, wireframe?: boolean | null, outline?: boolean | null, per_position_height?: boolean | null, __internal__?: PolygonInternalMaterial | null);
    get __internal__(): PolygonInternalMaterial | undefined;
    set __internal__(value: PolygonInternalMaterial | null | undefined);
    get applyWaterNormal(): boolean | undefined;
    set applyWaterNormal(value: boolean | null | undefined);
    get castShadow(): boolean | undefined;
    set castShadow(value: boolean | null | undefined);
    get clampToGround(): boolean | undefined;
    set clampToGround(value: boolean | null | undefined);
    get color(): number | undefined;
    set color(value: number | null | undefined);
    /**
     * IDs of selective effects to apply (e.g., "bloom", "outline")
     */
    get effectIds(): string[] | undefined;
    /**
     * IDs of selective effects to apply (e.g., "bloom", "outline")
     */
    set effectIds(value: string[] | null | undefined);
    /**
     * Emissive glow color in 0xRRGGBB format
     */
    get emissiveColor(): number | undefined;
    /**
     * Emissive glow color in 0xRRGGBB format
     */
    set emissiveColor(value: number | null | undefined);
    /**
     * Emissive glow intensity (omitted = 0, no emissive output)
     */
    get emissiveIntensity(): number | undefined;
    /**
     * Emissive glow intensity (omitted = 0, no emissive output)
     */
    set emissiveIntensity(value: number | null | undefined);
    get extrudedHeight(): number | undefined;
    set extrudedHeight(value: number | null | undefined);
    get height(): number | undefined;
    set height(value: number | null | undefined);
    get ior(): number | undefined;
    set ior(value: number | null | undefined);
    /**
     * Applies the lighting equation to the color output. When `false` the
     * material outputs plain albedo (for deferred lighting) while normals and
     * the shadow G-buffer keep being written.
     */
    get lit(): boolean | undefined;
    /**
     * Applies the lighting equation to the color output. When `false` the
     * material outputs plain albedo (for deferred lighting) while normals and
     * the shadow G-buffer keep being written.
     */
    set lit(value: boolean | null | undefined);
    /**
     * Need to enable `transparent`.
     */
    get opacity(): number | undefined;
    /**
     * Need to enable `transparent`.
     */
    set opacity(value: number | null | undefined);
    /**
     * Currently, this property is supported only in GeoJSON.
     */
    get outlineColor(): number | undefined;
    /**
     * Currently, this property is supported only in GeoJSON.
     */
    set outlineColor(value: number | null | undefined);
    /**
     * Currently, this property is supported only in GeoJSON.
     */
    get outlineShow(): boolean | undefined;
    /**
     * Currently, this property is supported only in GeoJSON.
     */
    set outlineShow(value: boolean | null | undefined);
    /**
     * Currently, this property is supported only in GeoJSON.
     */
    get outlineWidth(): number | undefined;
    /**
     * Currently, this property is supported only in GeoJSON.
     */
    set outlineWidth(value: number | null | undefined);
    /**
     * Whether to compute outline geometry. Only effective at initial load time.
     * When not set, inferred from `outlineShow`.
     */
    get outline(): boolean | undefined;
    /**
     * Whether to compute outline geometry. Only effective at initial load time.
     * When not set, inferred from `outlineShow`.
     */
    set outline(value: boolean | null | undefined);
    /**
     * Whether or not the height is obtained from the data. If false, the height is constant.
     */
    get perPositionHeight(): boolean | undefined;
    /**
     * Whether or not the height is obtained from the data. If false, the height is constant.
     */
    set perPositionHeight(value: boolean | null | undefined);
    get receiveShadow(): boolean | undefined;
    set receiveShadow(value: boolean | null | undefined);
    /**
     * Reflectivity for post-process or env map.
     */
    get reflectivity(): number | undefined;
    /**
     * Reflectivity for post-process or env map.
     */
    set reflectivity(value: number | null | undefined);
    /**
     * Reflectivity for post-process.
     */
    get roughness(): number | undefined;
    /**
     * Reflectivity for post-process.
     */
    set roughness(value: number | null | undefined);
    get shininess(): number | undefined;
    set shininess(value: number | null | undefined);
    get show(): boolean | undefined;
    set show(value: boolean | null | undefined);
    get specularStrength(): number | undefined;
    set specularStrength(value: number | null | undefined);
    /**
     * Enabling this value allows using `shininess` and `specular_strength`.
     */
    get specular(): boolean | undefined;
    /**
     * Enabling this value allows using `shininess` and `specular_strength`.
     */
    set specular(value: boolean | null | undefined);
    /**
     * Currently, this property is supported only in GeoJSON.
     */
    get surfaceShow(): boolean | undefined;
    /**
     * Currently, this property is supported only in GeoJSON.
     */
    set surfaceShow(value: boolean | null | undefined);
    /**
     * Splits the polygon into XYZ vector tiles for rendering, even when the
     * data source is not an MVT layer. This can improve performance for large
     * polygons.
     *
     * Enabling `clamp_to_ground` implicitly forces `tiled` to `true`.
     * Outline rendering is not supported when `tiled` is enabled.
     */
    get tiled(): boolean | undefined;
    /**
     * Splits the polygon into XYZ vector tiles for rendering, even when the
     * data source is not an MVT layer. This can improve performance for large
     * polygons.
     *
     * Enabling `clamp_to_ground` implicitly forces `tiled` to `true`.
     * Outline rendering is not supported when `tiled` is enabled.
     */
    set tiled(value: boolean | null | undefined);
    /**
     * Enable `opacity`. It might cause unexpected behavior when you use an effect.
     */
    get transparent(): boolean | undefined;
    /**
     * Enable `opacity`. It might cause unexpected behavior when you use an effect.
     */
    set transparent(value: boolean | null | undefined);
    /**
     * Scale water normal. Decreasing this value will make the water surface rough.
     */
    get waterScaleNormal(): number | undefined;
    /**
     * Scale water normal. Decreasing this value will make the water surface rough.
     */
    set waterScaleNormal(value: number | null | undefined);
    /**
     * Water wave speed.
     */
    get waterSpeed(): number | undefined;
    /**
     * Water wave speed.
     */
    set waterSpeed(value: number | null | undefined);
    /**
     * Apply a water material on the polygon. It might slow down the loading of the mesh.
     */
    get water(): boolean | undefined;
    /**
     * Apply a water material on the polygon. It might slow down the loading of the mesh.
     */
    set water(value: boolean | null | undefined);
    get wireframe(): boolean | undefined;
    set wireframe(value: boolean | null | undefined);
}

declare class PolygonMaterial_2 {
    free(): void;
    [Symbol.dispose](): void;
    constructor(show?: boolean | null, cast_shadow?: boolean | null, receive_shadow?: boolean | null, color?: number | null, clamp_to_ground?: boolean | null, tiled?: boolean | null, height?: number | null, extruded_height?: number | null, wireframe?: boolean | null, outline?: boolean | null, per_position_height?: boolean | null, __internal__?: PolygonInternalMaterial_2 | null);
    get __internal__(): PolygonInternalMaterial_2 | undefined;
    set __internal__(value: PolygonInternalMaterial_2 | null | undefined);
    get applyWaterNormal(): boolean | undefined;
    set applyWaterNormal(value: boolean | null | undefined);
    get castShadow(): boolean | undefined;
    set castShadow(value: boolean | null | undefined);
    get clampToGround(): boolean | undefined;
    set clampToGround(value: boolean | null | undefined);
    get color(): number | undefined;
    set color(value: number | null | undefined);
    /**
     * IDs of selective effects to apply (e.g., "bloom", "outline")
     */
    get effectIds(): string[] | undefined;
    /**
     * IDs of selective effects to apply (e.g., "bloom", "outline")
     */
    set effectIds(value: string[] | null | undefined);
    /**
     * Emissive glow color in 0xRRGGBB format
     */
    get emissiveColor(): number | undefined;
    /**
     * Emissive glow color in 0xRRGGBB format
     */
    set emissiveColor(value: number | null | undefined);
    /**
     * Emissive glow intensity (omitted = 0, no emissive output)
     */
    get emissiveIntensity(): number | undefined;
    /**
     * Emissive glow intensity (omitted = 0, no emissive output)
     */
    set emissiveIntensity(value: number | null | undefined);
    get extrudedHeight(): number | undefined;
    set extrudedHeight(value: number | null | undefined);
    get height(): number | undefined;
    set height(value: number | null | undefined);
    get ior(): number | undefined;
    set ior(value: number | null | undefined);
    /**
     * Applies the lighting equation to the color output. When `false` the
     * material outputs plain albedo (for deferred lighting) while normals and
     * the shadow G-buffer keep being written.
     */
    get lit(): boolean | undefined;
    /**
     * Applies the lighting equation to the color output. When `false` the
     * material outputs plain albedo (for deferred lighting) while normals and
     * the shadow G-buffer keep being written.
     */
    set lit(value: boolean | null | undefined);
    /**
     * Need to enable `transparent`.
     */
    get opacity(): number | undefined;
    /**
     * Need to enable `transparent`.
     */
    set opacity(value: number | null | undefined);
    /**
     * Currently, this property is supported only in GeoJSON.
     */
    get outlineColor(): number | undefined;
    /**
     * Currently, this property is supported only in GeoJSON.
     */
    set outlineColor(value: number | null | undefined);
    /**
     * Currently, this property is supported only in GeoJSON.
     */
    get outlineShow(): boolean | undefined;
    /**
     * Currently, this property is supported only in GeoJSON.
     */
    set outlineShow(value: boolean | null | undefined);
    /**
     * Currently, this property is supported only in GeoJSON.
     */
    get outlineWidth(): number | undefined;
    /**
     * Currently, this property is supported only in GeoJSON.
     */
    set outlineWidth(value: number | null | undefined);
    /**
     * Whether to compute outline geometry. Only effective at initial load time.
     * When not set, inferred from `outlineShow`.
     */
    get outline(): boolean | undefined;
    /**
     * Whether to compute outline geometry. Only effective at initial load time.
     * When not set, inferred from `outlineShow`.
     */
    set outline(value: boolean | null | undefined);
    /**
     * Whether or not the height is obtained from the data. If false, the height is constant.
     */
    get perPositionHeight(): boolean | undefined;
    /**
     * Whether or not the height is obtained from the data. If false, the height is constant.
     */
    set perPositionHeight(value: boolean | null | undefined);
    get receiveShadow(): boolean | undefined;
    set receiveShadow(value: boolean | null | undefined);
    /**
     * Reflectivity for post-process or env map.
     */
    get reflectivity(): number | undefined;
    /**
     * Reflectivity for post-process or env map.
     */
    set reflectivity(value: number | null | undefined);
    /**
     * Reflectivity for post-process.
     */
    get roughness(): number | undefined;
    /**
     * Reflectivity for post-process.
     */
    set roughness(value: number | null | undefined);
    get shininess(): number | undefined;
    set shininess(value: number | null | undefined);
    get show(): boolean | undefined;
    set show(value: boolean | null | undefined);
    get specularStrength(): number | undefined;
    set specularStrength(value: number | null | undefined);
    /**
     * Enabling this value allows using `shininess` and `specular_strength`.
     */
    get specular(): boolean | undefined;
    /**
     * Enabling this value allows using `shininess` and `specular_strength`.
     */
    set specular(value: boolean | null | undefined);
    /**
     * Currently, this property is supported only in GeoJSON.
     */
    get surfaceShow(): boolean | undefined;
    /**
     * Currently, this property is supported only in GeoJSON.
     */
    set surfaceShow(value: boolean | null | undefined);
    /**
     * Splits the polygon into XYZ vector tiles for rendering, even when the
     * data source is not an MVT layer. This can improve performance for large
     * polygons.
     *
     * Enabling `clamp_to_ground` implicitly forces `tiled` to `true`.
     * Outline rendering is not supported when `tiled` is enabled.
     */
    get tiled(): boolean | undefined;
    /**
     * Splits the polygon into XYZ vector tiles for rendering, even when the
     * data source is not an MVT layer. This can improve performance for large
     * polygons.
     *
     * Enabling `clamp_to_ground` implicitly forces `tiled` to `true`.
     * Outline rendering is not supported when `tiled` is enabled.
     */
    set tiled(value: boolean | null | undefined);
    /**
     * Enable `opacity`. It might cause unexpected behavior when you use an effect.
     */
    get transparent(): boolean | undefined;
    /**
     * Enable `opacity`. It might cause unexpected behavior when you use an effect.
     */
    set transparent(value: boolean | null | undefined);
    /**
     * Scale water normal. Decreasing this value will make the water surface rough.
     */
    get waterScaleNormal(): number | undefined;
    /**
     * Scale water normal. Decreasing this value will make the water surface rough.
     */
    set waterScaleNormal(value: number | null | undefined);
    /**
     * Water wave speed.
     */
    get waterSpeed(): number | undefined;
    /**
     * Water wave speed.
     */
    set waterSpeed(value: number | null | undefined);
    /**
     * Apply a water material on the polygon. It might slow down the loading of the mesh.
     */
    get water(): boolean | undefined;
    /**
     * Apply a water material on the polygon. It might slow down the loading of the mesh.
     */
    set water(value: boolean | null | undefined);
    get wireframe(): boolean | undefined;
    set wireframe(value: boolean | null | undefined);
}

/**
 * Combined props for the polygon material enhancer.
 * Props are explicitly separated into base and water sections for clarity.
 */
export declare type PolygonMaterialProps = {
    base?: PolygonBaseProps;
    water?: WaterOnlyProps;
};

export declare class PolygonMesh extends BatchedFeatureMesh<BufferGeometry<Attributes>, MeshLambertMaterial> {
    outline?: PolygonOutlineMesh;
    private _baseBoundingSphere?;
    /** Debug wireframe mesh visualizing the bounding sphere */
    private _debugBoundingSphereMesh?;
    /** Running min/max of per-feature batch height values */
    private _minBatchHeight;
    private _maxBatchHeight;
    /** Running max of per-feature batch extruded height values */
    private _maxBatchExtrudedHeight;
    readonly ctx: EventContext;
    /** Layer ID for SelectiveEffect handling */
    private _layerId;
    /** Enhanced material with encapsulated state */
    private _enhancedMaterial?;
    constructor(ctx: EventContext, layerId: string);
    ready(): boolean;
    /**
     * Geometry type of this mesh.
     */
    readonly geometryType: "polygon";
    init(mesh: PolygonMesh_2, tileHandle: TileHandle | undefined): this;
    clone(): this;
    private initGeometry;
    /**
     * Get the enhancer, throwing if not initialized.
     * @throws Error if enhancer is not initialized
     */
    private getEnhancer;
    private enableWater;
    private initMaterial;
    /**
     * Override a material that is used to generate a shadow map.
     */
    private initDepthMaterial;
    _update(material: PolygonMaterial, active: boolean, isTexturized: boolean): void;
    private _recalculateBoundingSphere;
    private _updateDebugBoundingSphereMesh;
    onBeforePicking(): void;
    onAfterPicking(): void;
    _updateBatchAttribute(batchId: number, attribute: BatchedAttributeName, value: number | number[] | boolean): boolean;
    _getBatchTextureSupport(): BatchTextureSupport;
    _initBatchDataTexture(): void;
    get water(): boolean;
    set water(v: boolean);
    /** Properties for material state used by TileMesh for texturized scene rendering */
    get waterScaleNormal(): number;
    get waterSpeed(): number;
    get shininess(): number;
    get specularStrength(): number;
    get applyWaterNormal(): boolean;
    get specular(): boolean;
    get reflectivity(): number;
    get roughness(): number;
    get clampToGround(): boolean;
    get emissiveColor(): number;
    get emissiveIntensity(): number;
    get effectIdsMask(): number;
    dispose(): void;
}

declare class PolygonMesh_2 {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    active: boolean;
    batch_length: number;
    get bounding_sphere(): BoundingSphere | undefined;
    set bounding_sphere(value: BoundingSphere | null | undefined);
    geometry: TransferablePolygonGeometry;
    material: PolygonMaterial;
    get outline_geometry(): TransferablePolygonOutlineGeometry | undefined;
    set outline_geometry(value: TransferablePolygonOutlineGeometry | null | undefined);
    transform: Transform_2;
}

export declare class PolygonOutlineMesh extends Line2 {
    readonly ctx: EventContext;
    private resizeEventUnsubscribe?;
    /** True when the geometry carries RTE high/low positions (GeoJSON path). */
    private useRTE;
    constructor(ctx: EventContext, mesh: PolygonMesh_2);
    raycast(raycaster: Raycaster, intersects: Intersection[]): void;
    private initGeometry;
    private initScaleNormalCapAttributes;
    private initMaterial;
    _update(material: PolygonMaterial, active: boolean): void;
    updateResolution(width: number, height: number): void;
    initBatchTexture(source: Material): void;
    enableBatchShowOpacity(): void;
    enableBatchHeight(): void;
    enableBatchExtrudedHeight(): void;
    dispose(): void;
}

/**
 * Combined mutation functions for the polygon water enhancer.
 */
declare type PolygonWaterCombinedMutates = {
    readonly base: PolygonBaseMutates;
    readonly water: WaterMutates;
};

/**
 * Combined state for the polygon water enhancer.
 * Includes both base state and water-specific state.
 */
declare type PolygonWaterCombinedStates = {
    readonly base: PolygonBaseState;
    readonly water: PolygonWaterState;
};

/**
 * Mutable references (uniforms) for the water enhancer.
 *
 * These are shared references with shader.uniforms and can be mutated directly
 * for efficient GPU uniform updates without shader recompilation.
 * Internal type - not exposed externally.
 */
declare type PolygonWaterRefs = {
    uWaterNormalMap: UniformValue<Texture | null>;
    uWaterScaleNormal: UniformValue<number>;
    uWaterSpeed: UniformValue<number>;
    uShininess: UniformValue<number>;
    uSpecularStrength: UniformValue<number>;
    uApplyWaterNormal: UniformValue<number>;
    uSpecular: UniformValue<boolean>;
    uIor: UniformValue<number>;
    uTime?: UniformValue<number>;
};

/**
 * Immutable state for the water enhancer.
 * This state is always replaced as a whole (never mutated).
 * Returned directly via states() - refresh after updates.
 */
declare type PolygonWaterState = Readonly<{
    useWater: boolean;
    skyEnvMap: Texture | null;
    waterNormalMap: Texture | null;
    waterScaleNormal: number;
    waterSpeed: number;
    shininess: number;
    specularStrength: number;
    applyWaterNormal: boolean;
    specular: boolean;
    ior: number;
}>;

declare type PolygonWaterUniforms = Partial<PolygonWaterRefs>;

export declare const POLYLINE_BATCH_SUPPORT: BatchTextureSupport;

/**
 * Mutation functions for the polyline base enhancer.
 * Includes `update(state)` to sync refs from state, plus additional methods.
 */
export declare type PolylineBaseMutates = Mutates<PolylineBaseState, PolylineBaseUniforms, {
    /**
     * Update RTE (Relative-To-Eye) uniforms for high-precision rendering.
     * Call this per-frame to update the model-view matrix and camera position.
     * Does nothing if RTE is not enabled.
     *
     * @param modelViewMatrixRTE - The model-view matrix in RTE coordinates
     * @param cameraPositionHigh - High-precision component of camera position
     * @param cameraPositionLow - Low-precision component of camera position
     * @param state - PolylineBaseState
     */
    updateRteUniforms: (modelViewMatrixRTE: Matrix4, cameraPositionHigh: Vector3, cameraPositionLow: Vector3, state: PolylineBaseState) => void;
    /**
     * Set the batch data texture ref.
     * This is needed because batchDataTexture is an external ref passed via props.
     */
    setBatchDataTexture: (texture: UniformValue<Texture | null>) => void;
    /**
     * Set the picking coordinate.
     * This is needed to update the picking coordinate uniform.
     */
    setPickingCoord: (coord: Vector2) => void;
    /**
     * Set external uniform references shared across materials.
     * These are typically passed from CommonUniforms and should be set once during mount.
     */
    setExternalRefs: (externalRefs: {
        batchDataTexture?: UniformValue<Texture | null>;
        viewportAndPixelRatio?: {
            value: [x: number, y: number, z: number] | undefined | null;
        };
        frustumNearFar?: {
            value: [x: number, y: number] | undefined | null;
        };
        frustumRatio?: {
            value: [x: number, y: number, z: number, w: number] | undefined | null;
        };
        globeDepth?: {
            value: Texture | null | undefined;
        };
        globeNormal?: {
            value: Texture | null | undefined;
        };
        inverseProjectionMatrix?: {
            value: Matrix4 | null | undefined;
        };
    }) => void;
}>;

/**
 * Props for the polyline base enhancer.
 */
export declare type PolylineBaseProps = {
    color?: number;
    transparent?: boolean;
    opacity?: number;
    depthWrite?: boolean;
    minMaxHeight?: [number, number];
    addHeight?: number;
    width?: number;
    maxWidth?: number;
    isTexturized?: boolean;
    /** Drape render-target side length in texels; scales the texturized shader's
     * pixel-denominated line width (TileTextureCompositor.size). */
    drapeRtSize?: number;
    pickable?: boolean;
    /**
     * Draw the line on the terrain: keep fragments whose ground point, read from
     * the globe depth, lies within half a line width of the segment. Needs
     * `globeDepth`, `inverseProjectionMatrix`, and a `minMaxHeight` enclosing
     * the terrain.
     */
    groundCulling?: boolean;
    /**
     * Light a `groundCulling` line with the terrain normal. Needs
     * `globeNormal`.
     */
    useGroundNormals?: boolean;
    globeDepth?: {
        value: Texture | null | undefined;
    };
    globeNormal?: {
        value: Texture | null | undefined;
    };
    inverseProjectionMatrix?: {
        value: Matrix4 | null | undefined;
    };
    effectIdsMask?: number;
    emissiveColor?: number;
    emissiveIntensity?: number;
    viewportAndPixelRatio?: {
        value: [x: number, y: number, z: number] | undefined | null;
    };
    frustumNearFar?: {
        value: [x: number, y: number] | undefined | null;
    };
    frustumRatio?: {
        value: [x: number, y: number, z: number, w: number] | undefined | null;
    };
    batchDataTexture?: UniformValue<Texture | null>;
    batchColorEnabled?: boolean;
    useRTE?: boolean;
};

/**
 * Mutable references (uniforms) for the polyline base enhancer.
 *
 * These are shared references with shader.uniforms and can be mutated directly
 * for efficient GPU uniform updates without shader recompilation.
 * Internal type - not exposed externally.
 */
declare type PolylineBaseRefs = {
    minMaxHeightAndWidth: UniformValue<[number, number, number]>;
    maxWidth: UniformValue<number>;
    uAddHeight: UniformValue<number>;
    color: UniformValue<Color_3>;
    nvr_uPickable: UniformValue<number>;
    uEffectIdsMask: UniformValue<number>;
    uEmissiveColor: UniformValue<Vector3>;
    uEmissiveIntensity: UniformValue<number>;
    uOpacity: UniformValue<number>;
    nvr_uPickingCoord: UniformValue<Vector2>;
    uDrapeRtSize: UniformValue<number>;
    batchDataTexture?: UniformValue<Texture | null>;
    tGlobeDepth?: {
        value: Texture | null | undefined;
    };
    tGlobeNormal?: {
        value: Texture | null | undefined;
    };
    inverseProjectionMatrix?: {
        value: Matrix4 | null | undefined;
    };
    viewportAndPixelRatio?: {
        value: [x: number, y: number, z: number] | undefined | null;
    };
    frustumNearFar?: {
        value: [x: number, y: number] | undefined | null;
    };
    frustumRatio?: {
        value: [x: number, y: number, z: number, w: number] | undefined | null;
    };
    modelViewMatrixRTE?: UniformValue<Matrix4>;
    u_cameraPositionHigh?: UniformValue<Vector3>;
    u_cameraPositionLow?: UniformValue<Vector3>;
    /** Always 1.0 — blocks fast-math reassociation of the RTE recombination. */
    u_rteOne?: UniformValue<number>;
};

/**
 * Immutable state for the polyline base enhancer.
 * This state is always replaced as a whole (never mutated).
 * Returned directly via states() - refresh after updates.
 */
export declare type PolylineBaseState = Readonly<{
    useRTE: boolean;
    isTexturized: boolean;
    drapeRtSize: number;
    pickable: boolean;
    groundCulling: boolean;
    useGroundNormals: boolean;
    effectIdsMask: number;
    emissiveColor: number;
    emissiveIntensity: number;
    minMaxHeight: [number, number];
    addHeight: number;
    width: number;
    maxWidth: number;
    color: number;
    opacity: number;
    batchColorEnabled: boolean;
}>;

declare type PolylineBaseUniforms = Partial<PolylineBaseRefs>;

export declare type PolylineGeometryData = {
    position: Float32Array;
    positionHigh: Float32Array;
    positionLow: Float32Array;
    startHigh: Float32Array;
    startLow: Float32Array;
    endHigh: Float32Array;
    endLow: Float32Array;
    startNormal: Float32Array;
    endNormalAndTextureCoordinateNormalizationX: Float32Array;
    rightNormalAndTextureCoordinateNormalizationY: Float32Array;
    indices: Uint32Array;
    extent: GeographicExtent;
};

/** A polyline layer material, as a plain object. */
export declare type PolylineGeometryMaterial = NormalizeWASMClass<PolylineMaterial_2>;

/**
 * `[min, max]` height a clamp-to-ground polyline volume over `extent` must
 * span to enclose the ground heights `range`, given the straight segments
 * {@link buildPolylineGeometry} produces.
 */
export declare function polylineGroundVolume(range: HeightRange, extent: GeographicExtent): [number, number];

declare class PolylineInternalMaterial {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    minMaxHeights: Float64Array;
}

declare class PolylineInternalMaterial_2 {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    minMaxHeights: Float64Array;
}

declare class PolylineMaterial {
    free(): void;
    [Symbol.dispose](): void;
    constructor(show?: boolean | null, cast_shadow?: boolean | null, receive_shadow?: boolean | null, color?: number | null, clamp_to_ground?: boolean | null, tiled?: boolean | null, height?: number | null, width?: number | null, max_width?: number | null, __internal__?: PolylineInternalMaterial | null);
    get __internal__(): PolylineInternalMaterial | undefined;
    set __internal__(value: PolylineInternalMaterial | null | undefined);
    get castShadow(): boolean | undefined;
    set castShadow(value: boolean | null | undefined);
    get clampToGround(): boolean | undefined;
    set clampToGround(value: boolean | null | undefined);
    get color(): number | undefined;
    set color(value: number | null | undefined);
    /**
     * Enable writing to depth buffer
     */
    get depthWrite(): boolean | undefined;
    /**
     * Enable writing to depth buffer
     */
    set depthWrite(value: boolean | null | undefined);
    /**
     * IDs of selective effects to apply (e.g., "bloom", "outline")
     */
    get effectIds(): string[] | undefined;
    /**
     * IDs of selective effects to apply (e.g., "bloom", "outline")
     */
    set effectIds(value: string[] | null | undefined);
    /**
     * Emissive glow color in 0xRRGGBB format
     */
    get emissiveColor(): number | undefined;
    /**
     * Emissive glow color in 0xRRGGBB format
     */
    set emissiveColor(value: number | null | undefined);
    /**
     * Emissive glow intensity (omitted = 0, no emissive output)
     */
    get emissiveIntensity(): number | undefined;
    /**
     * Emissive glow intensity (omitted = 0, no emissive output)
     */
    set emissiveIntensity(value: number | null | undefined);
    /**
     * Source geometry types this appearance consumes: `"line"`, `"polygon"`.
     * Defaults to `["line"]`; adding `"polygon"` also renders polygon boundary
     * rings (outer ring and holes) as closed polylines at the ring's base
     * height. Extruded-polygon edges stay the polygon material's `outline`
     * feature.
     */
    get geometryTypes(): string[] | undefined;
    /**
     * Source geometry types this appearance consumes: `"line"`, `"polygon"`.
     * Defaults to `["line"]`; adding `"polygon"` also renders polygon boundary
     * rings (outer ring and holes) as closed polylines at the ring's base
     * height. Extruded-polygon edges stay the polygon material's `outline`
     * feature.
     */
    set geometryTypes(value: string[] | null | undefined);
    get height(): number | undefined;
    set height(value: number | null | undefined);
    /**
     * Applies the lighting equation to the color output. When `false` the
     * material outputs plain albedo (for deferred lighting) while normals and
     * the shadow G-buffer keep being written.
     */
    get lit(): boolean | undefined;
    /**
     * Applies the lighting equation to the color output. When `false` the
     * material outputs plain albedo (for deferred lighting) while normals and
     * the shadow G-buffer keep being written.
     */
    set lit(value: boolean | null | undefined);
    /**
     * Maximum line width in pixels, clamping the rendered width regardless of zoom level.
     * Smaller values are cheaper to render as they reduce fragment shader overdraw.
     */
    get maxWidth(): number | undefined;
    /**
     * Maximum line width in pixels, clamping the rendered width regardless of zoom level.
     * Smaller values are cheaper to render as they reduce fragment shader overdraw.
     */
    set maxWidth(value: number | null | undefined);
    /**
     * Opacity value
     */
    get opacity(): number | undefined;
    /**
     * Opacity value
     */
    set opacity(value: number | null | undefined);
    get receiveShadow(): boolean | undefined;
    set receiveShadow(value: boolean | null | undefined);
    get show(): boolean | undefined;
    set show(value: boolean | null | undefined);
    /**
     * Splits the polyline into XYZ vector tiles for rendering, even when the
     * data source is not an MVT layer. This can improve performance for large
     * polylines.
     *
     * Enabling `clamp_to_ground` implicitly forces `tiled` to `true`.
     */
    get tiled(): boolean | undefined;
    /**
     * Splits the polyline into XYZ vector tiles for rendering, even when the
     * data source is not an MVT layer. This can improve performance for large
     * polylines.
     *
     * Enabling `clamp_to_ground` implicitly forces `tiled` to `true`.
     */
    set tiled(value: boolean | null | undefined);
    /**
     * Enable transparency and alpha blending
     */
    get transparent(): boolean | undefined;
    /**
     * Enable transparency and alpha blending
     */
    set transparent(value: boolean | null | undefined);
    get width(): number | undefined;
    set width(value: number | null | undefined);
}

declare class PolylineMaterial_2 {
    free(): void;
    [Symbol.dispose](): void;
    constructor(show?: boolean | null, cast_shadow?: boolean | null, receive_shadow?: boolean | null, color?: number | null, clamp_to_ground?: boolean | null, tiled?: boolean | null, height?: number | null, width?: number | null, max_width?: number | null, __internal__?: PolylineInternalMaterial_2 | null);
    get __internal__(): PolylineInternalMaterial_2 | undefined;
    set __internal__(value: PolylineInternalMaterial_2 | null | undefined);
    get castShadow(): boolean | undefined;
    set castShadow(value: boolean | null | undefined);
    get clampToGround(): boolean | undefined;
    set clampToGround(value: boolean | null | undefined);
    get color(): number | undefined;
    set color(value: number | null | undefined);
    /**
     * Enable writing to depth buffer
     */
    get depthWrite(): boolean | undefined;
    /**
     * Enable writing to depth buffer
     */
    set depthWrite(value: boolean | null | undefined);
    /**
     * IDs of selective effects to apply (e.g., "bloom", "outline")
     */
    get effectIds(): string[] | undefined;
    /**
     * IDs of selective effects to apply (e.g., "bloom", "outline")
     */
    set effectIds(value: string[] | null | undefined);
    /**
     * Emissive glow color in 0xRRGGBB format
     */
    get emissiveColor(): number | undefined;
    /**
     * Emissive glow color in 0xRRGGBB format
     */
    set emissiveColor(value: number | null | undefined);
    /**
     * Emissive glow intensity (omitted = 0, no emissive output)
     */
    get emissiveIntensity(): number | undefined;
    /**
     * Emissive glow intensity (omitted = 0, no emissive output)
     */
    set emissiveIntensity(value: number | null | undefined);
    /**
     * Source geometry types this appearance consumes: `"line"`, `"polygon"`.
     * Defaults to `["line"]`; adding `"polygon"` also renders polygon boundary
     * rings (outer ring and holes) as closed polylines at the ring's base
     * height. Extruded-polygon edges stay the polygon material's `outline`
     * feature.
     */
    get geometryTypes(): string[] | undefined;
    /**
     * Source geometry types this appearance consumes: `"line"`, `"polygon"`.
     * Defaults to `["line"]`; adding `"polygon"` also renders polygon boundary
     * rings (outer ring and holes) as closed polylines at the ring's base
     * height. Extruded-polygon edges stay the polygon material's `outline`
     * feature.
     */
    set geometryTypes(value: string[] | null | undefined);
    get height(): number | undefined;
    set height(value: number | null | undefined);
    /**
     * Applies the lighting equation to the color output. When `false` the
     * material outputs plain albedo (for deferred lighting) while normals and
     * the shadow G-buffer keep being written.
     */
    get lit(): boolean | undefined;
    /**
     * Applies the lighting equation to the color output. When `false` the
     * material outputs plain albedo (for deferred lighting) while normals and
     * the shadow G-buffer keep being written.
     */
    set lit(value: boolean | null | undefined);
    /**
     * Maximum line width in pixels, clamping the rendered width regardless of zoom level.
     * Smaller values are cheaper to render as they reduce fragment shader overdraw.
     */
    get maxWidth(): number | undefined;
    /**
     * Maximum line width in pixels, clamping the rendered width regardless of zoom level.
     * Smaller values are cheaper to render as they reduce fragment shader overdraw.
     */
    set maxWidth(value: number | null | undefined);
    /**
     * Opacity value
     */
    get opacity(): number | undefined;
    /**
     * Opacity value
     */
    set opacity(value: number | null | undefined);
    get receiveShadow(): boolean | undefined;
    set receiveShadow(value: boolean | null | undefined);
    get show(): boolean | undefined;
    set show(value: boolean | null | undefined);
    /**
     * Splits the polyline into XYZ vector tiles for rendering, even when the
     * data source is not an MVT layer. This can improve performance for large
     * polylines.
     *
     * Enabling `clamp_to_ground` implicitly forces `tiled` to `true`.
     */
    get tiled(): boolean | undefined;
    /**
     * Splits the polyline into XYZ vector tiles for rendering, even when the
     * data source is not an MVT layer. This can improve performance for large
     * polylines.
     *
     * Enabling `clamp_to_ground` implicitly forces `tiled` to `true`.
     */
    set tiled(value: boolean | null | undefined);
    /**
     * Enable transparency and alpha blending
     */
    get transparent(): boolean | undefined;
    /**
     * Enable transparency and alpha blending
     */
    set transparent(value: boolean | null | undefined);
    get width(): number | undefined;
    set width(value: number | null | undefined);
}

/**
 * Props for the polyline material enhancer.
 * Currently just wraps the base props, but structured for future composition.
 */
export declare type PolylineMaterialProps = {
    base?: PolylineBaseProps;
};

export declare class PolylineMesh extends BatchedFeatureMesh<BufferGeometry<Attributes_2>, ShaderMaterial> {
    readonly ctx: EventContext;
    /** Material enhancer for managing shader state */
    private _enhancedMaterial?;
    /** Flag indicating geometry initialization failed - mesh should never be visible */
    private _geometryInitFailed;
    constructor(ctx: EventContext);
    /**
     * Geometry type of this mesh.
     */
    readonly geometryType: "polyline";
    init(mesh: PolylineMesh_2): this;
    private initGeometry;
    private initMaterial;
    _getBatchTextureSupport(): BatchTextureSupport;
    _initBatchDataTexture(): void;
    _updateBatchAttribute(batchId: number, attribute: BatchedAttributeName, value: number | number[] | boolean): boolean;
    _update(material: PolylineMaterial, active: boolean): void;
    /**
     * Get the enhancer, throwing if not initialized.
     * @throws Error if enhancer is not initialized
     */
    private getEnhancer;
    get color(): any;
    get draped(): boolean;
    get emissiveColor(): number;
    get emissiveIntensity(): number;
    get effectIdsMask(): number;
    /** Visible stroke width to restore after a pick-pass width bump. */
    private _pickSavedWidth?;
    onBeforePicking(pickingCoord?: Vector2): void;
    onAfterPicking(): void;
    clone(): this;
    dispose(): void;
}

declare class PolylineMesh_2 {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    active: boolean;
    batch_length: number;
    geometry: TransferablePolylineGeometry;
    material: PolylineMaterial;
    /**
     * Whether the polyline should be rendered as a texturized draped feature
     */
    should_be_texturized: boolean;
    transform: Transform_2;
}

export declare type Quality = "low" | "medium" | "high" | "ultra";

/** A `quantized-mesh` source: Cesium quantized-mesh terrain tiles. */
export declare type QuantizedMeshSource = SourceBase & WithColorSupport<Layer_2<QuantizedMeshSourceDescription & {
    type: "quantized-mesh";
}>>;

declare class QuantizedMeshSourceDescription {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    get geographic(): boolean | undefined;
    set geographic(value: boolean | null | undefined);
    get maxZoom(): number | undefined;
    set maxZoom(value: number | null | undefined);
    get minZoom(): number | undefined;
    set minZoom(value: number | null | undefined);
    get overscaledMaxZoom(): number | undefined;
    set overscaledMaxZoom(value: number | null | undefined);
    get requestVertexNormals(): boolean | undefined;
    set requestVertexNormals(value: boolean | null | undefined);
    get requestWaterMask(): boolean | undefined;
    set requestWaterMask(value: boolean | null | undefined);
    get tms(): boolean | undefined;
    set tms(value: boolean | null | undefined);
    get token(): string | undefined;
    set token(value: string | null | undefined);
    get type(): string | undefined;
    set type(value: string | null | undefined);
    get url(): string | undefined;
    set url(value: string | null | undefined);
}

/**
 * Converts an angle from radians to degrees.
 * @param radian - Angle in radians
 * @returns Angle in degrees
 */
export declare function radianToDegree(radian: number): number;

/** One baked raster layer: its overlapping WM tile textures, mosaicked into one
 * render target. Heatmap layers carry encoded DEM, copied raw (nearest, no
 * color conversion) so the composite decode stays valid. */
declare type RasterBakeSlot = {
    isElevationHeatmap: boolean;
    /**
     * The decoder's no-data (boundary) color for heatmap slots: painted across
     * the render target before the sources so uncovered regions decode as
     * "no elevation" — the no-data story lives entirely in the encoded-elevation
     * domain, keeping the alpha channel free for future RGBA encodings. Absent
     * for color slots and for decoders with no byte-representable boundary.
     */
    noDataColor?: [number, number, number];
    sources: RasterBakeSource[];
};

/** One WebMercator raster tile texture to bake into a layer's render target,
 * framed by the Rust-resolved mercator affine (terrain `[0,1]` UV → source UV). */
declare type RasterBakeSource = {
    texture: Texture;
    uvOffset: [number, number];
    uvScale: [number, number];
};

/** A sampled color layer — a raster tile or a texturized vector scene. */
declare type RasterCompositeLayer = CompositeLayerBase & {
    kind: "raster";
    color: Color_3;
    opacity: number;
    water: boolean;
    /**
     * `[south, north]` latitude (radians) of the terrain tile when this slot is a
     * WebMercator raster draped on Geographic terrain — the composite shader uses
     * it to reproject the latitude axis (Mercator). `undefined` for same-scheme
     * drapes (no reprojection).
     */
    reproject?: [number, number];
};

/** A `raster-dem` source: RGB-encoded elevation tiles fetched from a `url` template. */
export declare type RasterDemSource = SourceBase & WithColorSupport<Layer_2<RasterDemSourceDescription & {
    type: "raster-dem";
}>>;

declare class RasterDemSourceDescription {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    /**
     * How to decode RGB channels into a height value.
     */
    get elevationDecoder(): ElevationDecoder | undefined;
    /**
     * How to decode RGB channels into a height value.
     */
    set elevationDecoder(value: ElevationDecoder | null | undefined);
    get maxZoom(): number | undefined;
    set maxZoom(value: number | null | undefined);
    get minZoom(): number | undefined;
    set minZoom(value: number | null | undefined);
    get overscaledMaxZoom(): number | undefined;
    set overscaledMaxZoom(value: number | null | undefined);
    get tileSize(): number | undefined;
    set tileSize(value: number | null | undefined);
    get tms(): boolean | undefined;
    set tms(value: boolean | null | undefined);
    get type(): string | undefined;
    set type(value: string | null | undefined);
    get url(): string | undefined;
    set url(value: string | null | undefined);
}

/** A `raster` layer renders a `raster-tile` (imagery) or `raster-dem` source. */
export declare type RasterLayer = SourceLayerBase<RasterLayerBase>;

declare type RasterLayerBase = WithColorSupport<Layer_2<RasterLayerDescription & {
    type: "raster";
}>>;

/**
 * A `raster` layer renders a `raster-tile` (imagery) or `raster-dem` source.
 * For a `raster-dem` source it can additionally render hillshade / elevation
 * heatmap by decoding the same tiles.
 */
declare class RasterLayerDescription {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    get elevationHeatmap(): ElevationHeatmapMaterial | undefined;
    set elevationHeatmap(value: ElevationHeatmapMaterial | null | undefined);
    get hillshade(): HillshadeMaterial | undefined;
    set hillshade(value: HillshadeMaterial | null | undefined);
    /**
     * Imagery rendering options for the raster texture. Parallel to `hillshade`
     * and `elevationHeatmap`; `show`/`color`/etc. apply only to the imagery.
     */
    get raster(): RasterMaterial | undefined;
    /**
     * Imagery rendering options for the raster texture. Parallel to `hillshade`
     * and `elevationHeatmap`; `show`/`color`/etc. apply only to the imagery.
     */
    set raster(value: RasterMaterial | null | undefined);
    get source(): string | undefined;
    set source(value: string | null | undefined);
    get type(): string | undefined;
    set type(value: string | null | undefined);
}

/**
 * Render-only appearance for a `raster` layer's imagery. All fetch/tiling
 * config lives on the referenced `Source`; only display fields are carried
 * here. Parallel to [`HillshadeMaterial`] / [`ElevationHeatmapMaterial`].
 */
declare class RasterMaterial {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    get color(): number | undefined;
    set color(value: number | null | undefined);
    get opacity(): number | undefined;
    set opacity(value: number | null | undefined);
    get showBoundingBox(): boolean | undefined;
    set showBoundingBox(value: boolean | null | undefined);
    get show(): boolean | undefined;
    set show(value: boolean | null | undefined);
}

declare class RasterTileInternalMaterial {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    layerUvTransforms(): any[];
    texture_fragments(): any[] | undefined;
    get castShadow(): boolean | undefined;
    set castShadow(value: boolean | null | undefined);
    colors: Uint32Array;
    elevationBScaler: number;
    elevationBoundary: number;
    elevationEpsilon: number;
    elevationGScaler: number;
    elevationMaxHeight: number;
    elevationMaxOffset: number;
    elevationMinHeight: number;
    elevationMinOffset: number;
    elevationOffset: number;
    elevationRScaler: number;
    hillshadeBScaler: number;
    hillshadeBoundary: number;
    hillshadeEpsilon: number;
    hillshadeExaggeration: number;
    hillshadeGScaler: number;
    hillshadeMaxOffset: number;
    hillshadeMinOffset: number;
    hillshadeOffset: number;
    hillshadeRScaler: number;
    isElevationHeatmaps: Uint8Array;
    isHillshades: Uint8Array;
    layerReproject: Uint8Array;
    /**
     * Applies the lighting equation to the color output. When `false` the
     * material outputs plain albedo (for deferred lighting) while normals and
     * the shadow G-buffer keep being written.
     */
    get lit(): boolean | undefined;
    /**
     * Applies the lighting equation to the color output. When `false` the
     * material outputs plain albedo (for deferred lighting) while normals and
     * the shadow G-buffer keep being written.
     */
    set lit(value: boolean | null | undefined);
    logBoundary: number;
    logarithmic: boolean;
    opacities: Float32Array;
    get receiveShadow(): boolean | undefined;
    set receiveShadow(value: boolean | null | undefined);
    get showBoundingBox(): boolean | undefined;
    set showBoundingBox(value: boolean | null | undefined);
    shows: Uint8Array;
    terrainLatRange: Float32Array;
}

/** A `raster-tile` source: raster imagery tiles fetched from a `url` template. */
export declare type RasterTileSource = SourceBase & WithColorSupport<Layer_2<RasterTileSourceDescription & {
    type: "raster-tile";
}>>;

declare class RasterTileSourceDescription {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    get maxZoom(): number | undefined;
    set maxZoom(value: number | null | undefined);
    get minZoom(): number | undefined;
    set minZoom(value: number | null | undefined);
    get overscaledMaxZoom(): number | undefined;
    set overscaledMaxZoom(value: number | null | undefined);
    get tms(): boolean | undefined;
    set tms(value: boolean | null | undefined);
    get type(): string | undefined;
    set type(value: string | null | undefined);
    get url(): string | undefined;
    set url(value: string | null | undefined);
}

/**
 * One WebMercator raster tile to bake into a layer's drape render target (one per
 * overlapping WM tile per baked layer). `layer_ordinal` pairs the entry with the k-th
 * baked composite slot; `fragment_ind`/`fragment_gen` identify the loaded texture
 * fragment (the web derives its `loadedTexs` key, `${ind}_${gen}`, from them);
 * `uv_offset`/`uv_scale` place this tile into the terrain tile's `[0, 1]` UV for the
 * bake camera; `reproject_terrain_lat` is `[south, north]` (radians) on Geographic
 * terrain (Mercator reprojection) or empty on WebMercator terrain.
 */
declare class RasterTileState {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    fragment_gen: number;
    fragment_ind: number;
    layer_ordinal: number;
    reproject_terrain_lat: Float32Array;
    uv_offset: Float32Array;
    uv_scale: Float32Array;
}

export declare type Ray = Required<NormalizeWASMClass<Ray_2>>;

declare class Ray_2 {
    free(): void;
    [Symbol.dispose](): void;
    getPoint(t: number): Vec3_3;
    constructor(origin: Vec3_3, direction: Vec3_3);
    direction: Vec3_3;
    origin: Vec3_3;
}

/**
 * Read one batch's scalar attribute back from the CPU-side texture data.
 * Returns undefined when the slot was never allocated (no write happened) —
 * callers fall back to their material-level default, mirroring the shader.
 */
export declare function readBatchScalar(material: Material, batchId: number, key: BatchScalarKey): number | undefined;

/**
 * Read one batch's packed show/opacity back from the CPU-side texture data.
 * Returns undefined when the slot was never allocated.
 */
export declare function readBatchShowOpacity(material: Material, batchId: number): {
    show: number;
    opacity: number;
} | undefined;

/**
 * Read one batch's vec3 attribute back from the CPU-side texture data into
 * `target`. Returns undefined when the row was never allocated.
 */
export declare function readBatchVec3(material: Material, batchId: number, key: BatchVec3Key, target: Color_3): Color_3 | undefined;

/**
 * This is used to share the entity id between WASM and client.
 * You can reconstruct Bevy Entity by `Entity:from_bits`.
 */
declare class ReconstructableEntity {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    0: bigint;
}

declare type Ref<K extends string, T> = Record<K, T | undefined | null>;

declare type RefThree<T> = Ref<"value", T>;

/**
 * One-call registration for per-feature styling: {@link initBatchedMaterial}
 * plus {@link setBatchTextureRenderer} (the claim must precede the first
 * write — flushing is per-view over module-global queues), returning the
 * shared texture uniform ref for the mesh's enhancer. Texture creation and
 * growth swap the ref's `.value` in place, so no re-wiring is needed
 * afterwards. Must run after the enhancer's customProgramCacheKey
 * assignment so the batch defines get appended to the final key.
 */
export declare function registerBatchedMaterial(material: Material, config: BatchTextureConfig, renderer: WebGLRenderer): BatchTextureUniform;

/**
 * Centralized registry manager that bundles all registry types.
 * This provides direct property access to different types of registries
 * in the Navara system.
 */
export declare class Registries {
    mesh: MeshDescRegistry;
    light: LightDescRegistry;
    effect: EffectDescRegistry;
    constructor(view: ThreeView, ctx: ViewContext);
    /**
     * Get registry statistics for debugging and monitoring
     */
    getStats(): {
        mesh: {
            registeredCount: number;
            types: string[];
        };
        light: {
            registeredCount: number;
            types: string[];
        };
        effect: {
            registeredCount: number;
            types: string[];
        };
    };
    /**
     * Clear all registries
     */
    clearAll(): void;
}

declare type RemoveFreeRecursively<T> = T extends {
    free: unknown;
} ? {
    [K in keyof T as K extends "free" | symbol | number ? never : K]: RemoveFreeRecursively<T[K]>;
} : T;

declare class RenderableFeature {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    get billboard(): BillboardMesh | undefined;
    set billboard(value: BillboardMesh | null | undefined);
    get model(): ModelMesh_2 | undefined;
    set model(value: ModelMesh_2 | null | undefined);
    get point(): PointMesh | undefined;
    set point(value: PointMesh | null | undefined);
    get polygon(): PolygonMesh_2 | undefined;
    set polygon(value: PolygonMesh_2 | null | undefined);
    get polyline(): PolylineMesh_2 | undefined;
    set polyline(value: PolylineMesh_2 | null | undefined);
    get text(): TextMesh | undefined;
    set text(value: TextMesh | null | undefined);
}

declare class RenderableFeatureAddedEvent {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    bits: bigint;
    feature: RenderableFeature;
    gen: number;
    ind: number;
    layer_id: string;
    get overscaled_tile_handle(): OverscaledTileHandle | undefined;
    set overscaled_tile_handle(value: OverscaledTileHandle | null | undefined);
}

declare class RenderableFeatureChangedEvent {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    bits: bigint;
    feature: RenderableFeature;
    gen: number;
    ind: number;
    layer_id: string;
    get overscaled_tile_handle(): OverscaledTileHandle | undefined;
    set overscaled_tile_handle(value: OverscaledTileHandle | null | undefined);
}

declare class RenderableFeatureRemovedEvent {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    bits: bigint;
    gen: number;
    ind: number;
    layer_id: string;
}

export declare type RenderFlag = {
    forceUpdate: boolean;
    animation: boolean;
};

export declare class RenderPass extends RenderPass_2 {
    get visible(): boolean;
    set visible(v: boolean);
}

/**
 * Orchestrate rendering passes with ordered management and flexible insertion.
 */
declare class RenderPassOrchestrator {
    lights: Group< Object3DEventMap>;
    scenes: {
        mrt: Scene< Object3DEventMap>;
        globe: Scene< Object3DEventMap>;
        draped: Scene< Object3DEventMap>;
        opaque: Scene< Object3DEventMap>;
        transparent: Scene< Object3DEventMap>;
        skyEnvMap: Scene< Object3DEventMap>;
    };
    effectComposer: EffectComposer;
    /**
     * Invoked whenever the pass list changes (add/insert/remove/clear), so the
     * owner can re-report the fixed GPU footprint to the memory ledger.
     */
    onPassesChanged?: () => void;
    private passMap;
    constructor(renderer: WebGLRenderer, options: RenderPassOrchestratorOptions);
    setSize(width: number, height: number): void;
    render(): void;
    /**
     * Add a named pass to the end of the pass list.
     */
    addPass(name: string, pass: Pass_2): void;
    /**
     * Insert a pass before the specified target pass.
     */
    insertPassBefore(targetName: string, name: string, pass: Pass_2): void;
    /**
     * Insert a pass after the specified target pass.
     */
    insertPassAfter(targetName: string, name: string, pass: Pass_2): void;
    /**
     * Remove a pass by name.
     */
    removePass(name: string): void;
    /**
     * Get a pass by name.
     */
    getPass(name: string): Pass_2 | undefined;
    /**
     * Get all pass names in order.
     */
    getPassNames(): string[];
    /**
     * Clear all passes.
     */
    clearPasses(): void;
    /**
     * Estimates the resident GPU bytes of the fixed, screen-sized render-target
     * stack (composer buffers + every target reachable from the passes), for
     * reporting into the memory ledger's `fixed_gpu_bytes` term.
     */
    estimateFixedGpuBytes(): number;
    /**
     * Dispose all GPU resources held by the effect composer.
     */
    dispose(): void;
    /**
     * Rebuild the index map after manual list modification.
     */
    private rebuildIndexMap;
}

declare type RenderPassOrchestratorOptions = {
    halfFloat?: boolean;
    multisampling?: number;
};

/**
 * A pass that copies normal buffer contents to a render target.
 */
export declare class RenderTargetCopyPass extends Pass_2 {
    private _renderTarget;
    private _material;
    private _autoResize;
    constructor(renderTarget: WebGLRenderTarget, autoResize?: boolean);
    get texture(): Texture;
    get autoResize(): boolean;
    set autoResize(value: boolean);
    setTexture(texture: Texture): void;
    /** Points the pass at a rebuilt render target (same-purpose replacement). */
    setRenderTarget(renderTarget: WebGLRenderTarget): void;
    /**
     * When a depth texture is set, the pass copies its depth into the target's
     * depth buffer via gl_FragDepth. Depth test must be enabled (with AlwaysDepth)
     * because GL discards depth writes while the depth test is disabled.
     */
    setDepthTexture(texture: Texture | null): void;
    render(renderer: WebGLRenderer, inputBuffer: WebGLRenderTarget | null, _outputBuffer: WebGLRenderTarget | null): void;
    dispose(): void;
}

/**
 * A class for chaining string replacements with error detection.
 * This allows for a more functional programming style with method chaining.
 * This implementation is free of side effects - each method returns a new instance.
 */
declare class Replacer {
    readonly source: string;
    /**
     * Creates a new Replacer instance
     *
     * @param source - The source string to perform replacements on
     */
    constructor(source: string);
    /**
     * Replaces a substring in the source string and throws an error if the replacement didn't occur.
     * Returns a new Replacer instance with the updated string.
     *
     * @param search - The substring or regex to search for
     * @param replace - The string to replace the search substring with
     * @param errorMessage - Optional custom error message
     * @returns A new Replacer instance with the updated string
     * @throws Error if the search string/pattern was not found in the source
     */
    replace(search: string | RegExp, replace: string, errorMessage?: string): Replacer;
    replaceWithCondition(search: string | RegExp, replace: string, condition: boolean, errorMessage?: string): Replacer;
}

/** {@link GBufferOptions} with defaults applied. */
export declare type ResolvedGBufferOptions = Readonly<Required<GBufferOptions>>;

/** Applies defaults (all disabled) to a partial configuration. */
export declare function resolveGBufferOptions(options?: GBufferOptions): ResolvedGBufferOptions;

declare class ReturnedTransferablePolygonBatchedFeature {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    crs(): CRS;
    length(): number;
    transferBatchIds(): Uint32Array;
    transferBatchIndices(): Uint32Array;
    transferExpectedWindingOrders(): Uint8Array;
    transferHoles(): Float64Array;
    transferHolesBoundaries(): Uint32Array;
    transferHolesSizes(): Uint32Array;
    transferHolesTotalSizes(): Uint32Array;
    transferOuterRing(): Float64Array;
    transferOuterRingSizes(): Uint32Array;
    material: PolygonMaterial;
}

declare class ReturnedTransferablePolylineBatchedFeature {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    crs(): CRS;
    length(): number;
    transferBatchIds(): Uint32Array;
    transferBatchIndices(): Uint32Array;
    transferPoints(): Float64Array;
    transferPointsSizes(): Uint32Array;
    transferRingFlags(): Uint8Array;
    material: PolylineMaterial;
}

/**
 * Shared `u_rteOne` uniform for RTE vertex shaders. Always 1.0.
 *
 * Multiplying the high-order difference by a uniform the shader compiler
 * cannot constant-fold blocks fast-math reassociation of
 * `(high - camHigh) + (low - camLow)` into `(high + low) - (camHigh + camLow)`,
 * which would collapse the math to absolute-ECEF f32 precision and make
 * geometry freeze/snap in ~0.25-0.5 m steps as the camera moves
 * (observed on ANGLE Metal). One frozen object is shared by every material.
 */
export declare const RTE_ONE_UNIFORM: {
    readonly value: number;
};

/**
 * Interface for objects that need RTE (Relative-To-Eye) rendering support
 */
export declare type RTEUserData = {
    modelViewMatrixRTE?: {
        value: Matrix4;
    };
    cameraPositionHigh?: {
        value: Vector3;
    };
    cameraPositionLow?: {
        value: Vector3;
    };
};

export declare type SampledTerrainPosition = {
    /** Latitude in degrees, echoed from the input. */
    lat: number;
    /** Longitude in degrees, echoed from the input. */
    lng: number;
    /**
     * Terrain height in meters, or `undefined` when no tile covering the
     * position could be fetched or decoded.
     */
    height: number | undefined;
    /** Zoom level the height was sampled at; `undefined` on failure. */
    level: number | undefined;
};

export declare type SampleTerrainOptions = {
    /** Aborts in-flight tile fetches and rejects with the abort reason. */
    signal?: AbortSignal;
    /**
     * Sample at this fixed zoom level instead of probing down from the
     * source's `maxZoom`. A tile missing at this level yields `undefined`
     * heights rather than falling back to a coarser level (Cesium's
     * `sampleTerrain` semantics).
     */
    level?: number;
};

/**
 * Projects a Cartesian position onto the WGS84 ellipsoid surface along the
 * geodetic normal.
 * @param xyz - Cartesian Vector3 in Earth-Centered Earth-Fixed (ECEF) coordinates
 * @returns The surface position in ECEF coordinates, or undefined when the
 * position is too close to the ellipsoid's center to project
 */
export declare function scaleToGeodeticSurface(xyz: Vector3): Vector3 | undefined;

declare class SceneGroup extends Group {
    get tileScenes(): TileScene[];
}

declare type Scenes = {
    light: Group;
    mrt: Scene;
    globe: Scene;
    draped: Scene;
    opaque: Scene;
    transparent: Scene;
    skyEnvMap: Scene;
};

/**
 * Mutation functions for the sdfText base enhancer.
 */
export declare type SdfTextBaseMutates = Mutates<SdfTextBaseState, SdfTextBaseUniforms, {
    /**
     * Update per-frame camera uniforms (FOV, screen height, far plane, RTE eye).
     */
    updatePerFrame: (fovRad: number, screenHeightPx: number, farPlane: number, cameraX: number, cameraY: number, cameraZ: number, viewMatrix: Matrix4, state: SdfTextBaseState) => void;
    /**
     * Set the SDF atlas texture external ref.
     */
    setAtlasTexture: (texture: UniformValue<DataTexture | null>) => void;
    /**
     * Set the COLRv1 color atlas texture external ref.
     */
    setColorAtlasTexture: (texture: UniformValue<DataTexture | null>) => void;
    /**
     * Sync the atlas-size uniforms with the currently-bound atlas textures.
     * Cheap to call every frame; the shader divides glyph pixel rects by these
     * to derive UVs, so this is how atlas resizes propagate to existing meshes.
     */
    updateAtlasSizes: () => void;
    /**
     * Point the shader at the mesh's per-label data texture. Must be re-called
     * whenever the mesh grows it, since growing allocates a new texture.
     */
    setLabelDataTexture: (texture: DataTexture | null, width: number, height: number) => void;
    /**
     * Update the batch's RTC center (the tile transform). Only meaningful in
     * RTC mode; in RTE mode anchors carry their own high/low split.
     */
    setRtcCenter: (center: [number, number, number]) => void;
    /**
     * Set the batch data texture ref (an external ref shared with the
     * batchTexture core, whose `.value` is swapped on growth).
     */
    setBatchDataTexture: (texture: UniformValue<DataTexture | null>) => void;
}>;

/**
 * Props for the sdfText base enhancer.
 *
 * Everything here is **batch-wide**: one material draws every label in a
 * tile-layer. Per-label values (position, colour, opacity, font size, height,
 * block metrics, batch id, declutter fade) live in the label data texture
 * owned by `BatchedSdfTextMesh`, not in this state — see
 * `web/navara_three/src/mesh/sdfText/labelData.ts`.
 */
export declare type SdfTextBaseProps = {
    useRTE?: boolean;
    /** When `true` the fragment shader samples the atlas as 4-channel MTSDF
     *  (median of RGB + true SDF in alpha) instead of single-channel R8. */
    useMsdf?: boolean;
    center?: [number, number];
    /** `false` (the default) stands the quad up; `true` lays it on the globe
     *  surface around the anchor, wrapped to its curvature, so labels read as
     *  painted on the globe. */
    flatFacing?: boolean;
    /** Whether the quad turns to follow the camera. `true` (the default) keeps
     *  it facing the viewer — a screen-aligned billboard, or for `flatFacing` a
     *  yaw around the surface normal that keeps text reading left-to-right.
     *  `false` freezes it in the anchor's east-north-up frame, so the camera
     *  never reorients it. */
    rotateWithCamera?: boolean;
    /** Spin of the quad inside its own plane about the anchor, in **degrees**,
     *  clockwise seen from the front. Converted to radians in state. */
    rotation?: number;
    sizeInMeters?: boolean;
    offsetDepth?: boolean;
    outlineWidth?: number;
    outlineColor?: number;
    outlineOpacity?: number;
    showBackground?: boolean;
    backgroundColor?: number;
    backgroundOutlineColor?: number;
    backgroundOutlineWidth?: number;
    pickable?: boolean;
    effectIdsMask?: number;
    emissiveColor?: number;
    emissiveIntensity?: number;
    depthTest?: boolean;
    transparent?: boolean;
    /** Cull faces seen from behind (`FrontSide`); `false` (the default) draws
     *  both sides (`DoubleSide`). */
    backfaceCulling?: boolean;
    rtcCenter?: [number, number, number];
    atlasTexture?: UniformValue<DataTexture | null>;
};

/**
 * Mutable references (uniforms) for the sdfText base enhancer.
 * These are shared references with shader.uniforms.
 * Internal type - not exposed externally.
 */
declare type SdfTextBaseRefs = {
    uCenter: UniformValue<Vector2>;
    uFlatFacing: UniformValue<boolean>;
    uRotateWithCamera: UniformValue<boolean>;
    uRotation: UniformValue<number>;
    uSizeInMeters: UniformValue<boolean>;
    uOffsetDepth: UniformValue<boolean>;
    uSdfThreshold: UniformValue<number>;
    uOutlineWidth: UniformValue<number>;
    uOutlineColor: UniformValue<Color_3>;
    uOutlineOpacity: UniformValue<number>;
    uShowBackground: UniformValue<boolean>;
    uBackgroundColor: UniformValue<Color_3>;
    uBackgroundOutlineColor: UniformValue<Color_3>;
    uBackgroundOutlineWidth: UniformValue<number>;
    uFovRad: UniformValue<number>;
    uScreenHeightPx: UniformValue<number>;
    uFarPlane: UniformValue<number>;
    uRTCCenter: UniformValue<Vector3>;
    uRTCCenterView: UniformValue<Vector3>;
    uEyeRTELow: UniformValue<Vector3>;
    uEyeRTEHigh: UniformValue<Vector3>;
    /** Always 1.0 — blocks fast-math reassociation of the RTE recombination. */
    u_rteOne?: UniformValue<number>;
    nvr_uPickable: UniformValue<number>;
    uEffectIdsMask: UniformValue<number>;
    uEmissiveColor: UniformValue<Color_3>;
    uEmissiveIntensity: UniformValue<number>;
    uAtlas: UniformValue<DataTexture | null>;
    /** COLRv1 RGBA atlas. `null` when the font has no color glyphs. */
    uColorAtlas: UniformValue<DataTexture | null>;
    /** Current SDF atlas pixel dimensions; updated when the Rust atlas grows. */
    uSdfAtlasSize: UniformValue<Vector2>;
    /** Current color atlas pixel dimensions; updated when the color atlas grows. */
    uColorAtlasSize: UniformValue<Vector2>;
    /** Per-label state, indexed by the `labelIndex` instance attribute. Owned by
     *  the mesh and swapped wholesale when it outgrows its capacity. */
    uLabelData: UniformValue<DataTexture | null>;
    /** Dimensions of `uLabelData` in texels, for the shader's index-to-texel
     *  math. Read as an `ivec2`. */
    uLabelTexSize: UniformValue<Vector2>;
    /** Shared batch data texture ref (per-feature style); growth swaps its
     *  `.value` in place. */
    batchDataTexture?: UniformValue<DataTexture | null>;
};

/**
 * Immutable state snapshot for the sdfText base enhancer.
 */
export declare type SdfTextBaseState = Readonly<{
    useRTE: boolean;
    useMsdf: boolean;
    center: [number, number];
    flatFacing: boolean;
    rotateWithCamera: boolean;
    rotation: number;
    sizeInMeters: boolean;
    offsetDepth: boolean;
    outlineWidth: number;
    outlineColor: Color_3;
    outlineOpacity: number;
    showBackground: boolean;
    backgroundColor: Color_3;
    backgroundOutlineColor: Color_3;
    backgroundOutlineWidth: number;
    pickable: boolean;
    effectIdsMask: number;
    emissiveColor: number;
    emissiveIntensity: number;
    depthTest: boolean;
    transparent: boolean;
    backfaceCulling: boolean;
}>;

declare type SdfTextBaseUniforms = Partial<SdfTextBaseRefs>;

/**
 * Props for the sdfText material enhancer.
 * Currently just wraps the base props, but structured for future composition.
 */
export declare type SdfTextMaterialProps = {
    base?: SdfTextBaseProps;
};

export declare type SelectiveEffectConfig = {
    selectiveEffect?: true;
} & EffectConfig;

/**
 * Base class for buffer-based selective effect descriptors (Bloom, Outline, etc.).
 *
 * Manages effect key registration, EffectIds Buffer slot allocation, and
 * provides MRT buffer accessors for subclass passes.
 *
 * Subclasses implement {@link createPass}.
 */
export declare abstract class SelectiveEffectDesc<Config extends SelectiveEffectConfig = SelectiveEffectConfig, UpdateConfig extends SelectiveEffectUpdate = SelectiveEffectUpdate> extends EffectDesc<Config, UpdateConfig> {
    /**
     * Buffer-based selective effects read the effectIds bitmask buffer.
     * Subclasses that also read the emissive buffer (e.g. bloom) override this
     * with `["selectiveEffect", "emissive"]`.
     */
    static requiredBuffers: readonly GBufferName[];
    protected config: Config;
    constructor(view: ThreeView, ctx: ViewContext, config: Config);
    /** ViewContext for accessing scenes, renderer, registry, etc. */
    get viewContext(): ViewContext;
    /** Layer configuration (typed per subclass). */
    get layerConfig(): Config;
    onCreate(): void;
    onDestroy(): void;
    /** Emissive RGB buffer. */
    getEmissiveBuffer(): Texture | null;
    /** EffectIds bitmask buffer (R=bitmask). NearestFilter, discrete data. */
    getEffectIdsBuffer(): Texture | null;
    /** Slot bit index for this effect instance in the EffectIds Buffer. -1 if unregistered. */
    getEffectSlot(): number;
}

/**
 * Unified registry for selective effects.
 *
 * Manages effectId → slot bit mapping.
 * Assigns bit positions in the EffectIds Buffer bitmask (R channel).
 * Half-float preserves integer masks up to 2047 exactly, so up to 11 slots
 * (2^11 - 1) can be represented losslessly in a single channel.
 * Freed slots are reused by subsequent registrations.
 */
export declare class SelectiveEffectRegistry {
    /** Called when slot assignments change (register/unregister). */
    private onSlotsChanged;
    private idToSlot;
    private freedSlots;
    private nextSlot;
    constructor(
    /** Called when slot assignments change (register/unregister). */
    onSlotsChanged: () => void);
    registerSlot(effectId: string): number;
    unregisterSlot(effectId: string): void;
    get slotCount(): number;
    getSlot(effectId: string): number | undefined;
    computeMask(effectIds: readonly string[]): number;
    /**
     * Clear all slot assignments.
     * Intended for teardown only; does not emit onSlotsChanged.
     */
    clear(): void;
}

export declare type SelectiveEffectUpdate = EffectUpdate;

/**
 * Bind the material's batch texture state to the renderer of the view that
 * owns it, so `flushBatchTextureUpdates` only uploads its own view's
 * textures. Must run before the first attribute write (meshes call it from
 * `_initBatchDataTexture`, which every write path goes through).
 */
export declare function setBatchTextureRenderer(material: Material, renderer: WebGLRenderer): void;

/**
 * Chooses the normal a draped lit material is shaded with at the ground
 * point: the terrain's (default), or with `useGroundNormals: false` the
 * ellipsoid's. Without the terrain normal, the descriptor need not require
 * `globeNormal`.
 */
export declare function setDrapeGroundNormals(material: Material, useGroundNormals: boolean): void;

/**
 * Set position using RTC (Relative-To-Center) encoding
 *
 * RTC mode sets the mesh position/rotation/scale to the tile center transform,
 * and stores the relative offset in a uniform.
 *
 * @param mesh - The mesh to position (Sprite or Group)
 * @param position - Position array (relative to tile center)
 * @param posIdx - Index in the position array
 * @param transform - Transform data (position, rotation, scale)
 */
export declare function setRTCPosition<T extends Object3D>(mesh: T, position: Float32Array<ArrayBufferLike> | null | undefined, posIdx: number, transform: Transform_2): void;

/**
 * Set position using RTE (Relative-To-Eye) encoding
 *
 * RTE mode stores position in high/low precision uniforms and keeps
 * the mesh at origin (0,0,0). Only scale is applied to control sprite size.
 * Rotation/quaternion would affect matrixWorld and break RTE calculations.
 *
 * @param mesh - The mesh to position (Sprite or Group)
 * @param positionHigh - High precision component array
 * @param positionLow - Low precision component array
 * @param posIdx - Index in the position arrays
 * @param transform - Transform data containing scale
 */
export declare function setRTEPosition<T extends Object3D>(mesh: T, positionHigh: Float32Array<ArrayBufferLike> | null | undefined, positionLow: Float32Array<ArrayBufferLike> | null | undefined, posIdx: number, transform: Transform_2): void;

/**
 * Prepares a material for the draped scene: clamps its depth to the far plane
 * (`chunks/drape_depth_clamp_*`), and shades it at the terrain instead of on
 * its volume. The
 * visible fragments are the back faces of a volume clipped to the ground by
 * {@link DrapedMesh.process}, so the mesh's own normals and positions are
 * arbitrary. The ground point on each fragment's view ray is reconstructed
 * from the globe depth; lighting and directional shadows are evaluated there,
 * with the terrain's normal (`chunks/drape_ground_fragment`).
 *
 * Applies to materials shaped like three's `ShaderLib` ones. The depth clamp
 * needs `<logdepthbuf_vertex>` and `<logdepthbuf_fragment>`. The shading
 * applies to lit materials, whose fragment shader includes
 * `<lights_fragment_begin>`, `<normal_fragment_begin>`,
 * `<logdepthbuf_pars_fragment>`, `<shadowmap_pars_fragment>`, `<packing>`
 * (added by `overrideMaterialsForMRT`) and the `vViewPosition` varying; a
 * material without `<lights_fragment_begin>` is shaded on its volume.
 * Idempotent.
 *
 * TODO: Expose the ground point to user shaders as chunks once shader chunk
 * handling is settled; until then only the anchors above are patched.
 *
 * @param globeNormal - Uniform ref for the globe normal copy.
 * @param globeDepth - Uniform ref for the RGBA-packed globe depth copy.
 */
export declare function setupMaterialForDrape(material: Material, globeNormal: RefThree<Texture>, globeDepth: RefThree<Texture>): void;

/**
 * Wire a custom material into Navara's MRT G-buffer so depth/normal-based
 * effects (SSAO, SSR, outline, aerial perspective, clouds) and SelectiveEffect
 * (Bloom/Outline) work on the mesh that uses it.
 *
 * Built-in Three.js materials (`MeshStandardMaterial`, `MeshBasicMaterial`,
 * `Sprite`, `Points`, …) are patched automatically on import and do **not**
 * need this. Only custom `ShaderMaterial` and three-stdlib `LineMaterial`
 * bypass `ShaderLib`, so they must opt in here.
 *
 * `LineMaterial` is detected and routed automatically; the `normal` option is
 * only used for plain `ShaderMaterial`.
 *
 * Injects `normalBuffer` (location 1), `effectIdBuffer` (location 2), and
 * `emissiveBuffer` (location 3). For `ShaderMaterial` it also injects the
 * `logdepthbuf` modules; `LineMaterial` already has its own vertex setup, so
 * those are not added. When `USE_SELECTIVE_EFFECT` is defined,
 * `effectIdBuffer`/`emissiveBuffer` are populated (emissive is unsupported for
 * `LineMaterial`). Idempotent — calling it more than once on the same material
 * is a no-op.
 *
 * Requirements for `ShaderMaterial`: the fragment shader must expose a
 * view-space normal (named by `options.normal`, default `"normal"`), and the
 * last `}` in each shader is assumed to close `main()`.
 */
export declare function setupMaterialForMRT(material: ShaderMaterial, options?: SetupMaterialForMRTOptions): void;

export declare type SetupMaterialForMRTOptions = {
    /**
     * Name of the GLSL variable holding the **view-space** normal in the
     * fragment shader (it is packed with `packNormalToVec2`, which assumes
     * view space). Defaults to `"normal"`. Shaders that expose their normal as
     * a `varying vec3 vNormal` should pass `{ normal: "vNormal" }`.
     *
     * Ignored for `LineMaterial`, which derives a screen-space normal itself.
     */
    normal?: string;
};

/**
 * Setup onBeforeRender/onBeforeShadow callback for RTE rendering
 *
 * @param mesh - The mesh object to setup
 * @param userData - RTE user data containing uniforms
 * @param modelMatrix - Optional model matrix for calcModelMatrixRTE.
 *                      - Use identity matrix for GLTF models where world position is in RTE uniforms
 *                      - Use mesh.matrixWorld for objects with actual positions (default)
 * @param cameraPosMatrix - Optional matrix for calcCameraPosition. If not specified, uses modelMatrix.
 *                          - Point/Billboard/Text/Model: use identity matrix (world space camera position)
 *                          - Polygon: use mesh.matrixWorld (same as modelMatrix)
 * @returns A callback function that works for both onBeforeRender and onBeforeShadow
 * @deprecated Use setupRTECallback with mutates() instead
 */
export declare function setupRTEBeforeRender(mesh: Object3D, userData: RTEUserData, modelMatrix?: Matrix4, cameraPosMatrix?: Matrix4): (Object3D["onBeforeRender"] & Object3D["onBeforeShadow"]) | null;

/**
 * Setup onBeforeRender/onBeforeShadow callback for RTE rendering using mutates()
 *
 * @param mesh - The mesh object to setup
 * @param updateRteUniforms - The mutation function from enhancer.mutates()
 * @param modelMatrix - Optional model matrix for calcModelMatrixRTE.
 *                      - Use identity matrix for GLTF models where world position is in RTE uniforms
 *                      - Use mesh.matrixWorld for objects with actual positions (default)
 * @param cameraPosMatrix - Optional matrix for calcCameraPosition. If not specified, uses modelMatrix.
 *                          - Point/Billboard/Text/Model: use identity matrix (world space camera position)
 *                          - Polygon: use mesh.matrixWorld (same as modelMatrix)
 * @returns A callback function that works for both onBeforeRender and onBeforeShadow
 */
export declare function setupRTECallback(mesh: Object3D, updateRteUniforms: UpdateRteUniformsFn, modelMatrix?: Matrix4, cameraPosMatrix?: Matrix4): Object3D["onBeforeRender"] & Object3D["onBeforeShadow"];

/**
 * Set up Selective Effect defines and uniforms on a standard Three.js material.
 * Sets USE_SELECTIVE_EFFECT define so the MRT shader writes effectIds + emissive.
 * Emissive output uses additive blend: diffuseColor × emissiveIntensity + emissive.
 * Used by non-enhancer meshes (Box, Sphere, etc.).
 *
 * Idempotent — calling multiple times on the same material is safe (no-op after first call).
 */
export declare function setupSelectiveEffectUniforms(material: MeshLambertMaterial | MeshStandardMaterial): void;

export declare const ShaderLib: {
    [name: string]: ShaderLibShader;
    basic: ShaderLibShader;
    lambert: ShaderLibShader;
    phong: ShaderLibShader;
    standard: ShaderLibShader;
    matcap: ShaderLibShader;
    points: ShaderLibShader;
    dashed: ShaderLibShader;
    depth: ShaderLibShader;
    normal: ShaderLibShader;
    sprite: ShaderLibShader;
    background: ShaderLibShader;
    cube: ShaderLibShader;
    equirect: ShaderLibShader;
    distance: ShaderLibShader;
    shadow: ShaderLibShader;
    physical: ShaderLibShader;
};

export declare type ShaderName = keyof ShaderToMaterial;

declare type ShaderToMaterial = {
    basic: MeshBasicMaterial;
    lambert: MeshLambertMaterial;
    phong: MeshPhongMaterial;
    standard: MeshStandardMaterial;
    physical: MeshPhysicalMaterial;
    points: PointsMaterial;
    shader: ShaderMaterial;
};

/**
 * Type alias for shader uniforms.
 */
declare type ShaderUniforms = WebGLProgramParametersWithUniforms["uniforms"];

/**
 * Mutation functions for the shadow map depth enhancer.
 */
declare type ShadowMapDepthMutates = Mutates<ShadowMapDepthState, ShadowMapDepthUniforms>;

export declare type ShadowMapDepthProps = {};

/**
 * Mutable references (uniforms) for the shadow map depth enhancer.
 * These are external refs passed via props.
 */
declare type ShadowMapDepthRefs = {};

/**
 * Immutable state for the shadow map depth enhancer.
 * This enhancer has no internal state that changes - it just holds external refs.
 */
declare type ShadowMapDepthState = Readonly<{}>;

/**
 * Material types that can be enhanced by this enhancer.
 * Supports all standard mesh materials for depth/shadow rendering.
 */
export declare type ShadowMapDepthSupportedMaterial = MeshBasicMaterial | MeshLambertMaterial | MeshPhongMaterial | MeshStandardMaterial | MeshPhysicalMaterial;

declare type ShadowMapDepthUniforms = Partial<ShadowMapDepthRefs>;

export declare const SKY_RENDER_ORDER = 100;

export declare class SkyEnvMapEffectDesc extends EffectDesc<SkyEnvMapPassConfig, SkyEnvMapPassUpdate, SkyEnvMapPass> {
    static key: string;
    static insertBefore: string[];
    private config;
    constructor(view: ThreeView, ctx: ViewContext, config: SkyEnvMapPassConfig);
    createPass(): SkyEnvMapPass;
    onUpdateConfig(updates: SkyEnvMapPassUpdate): void;
}

export declare class SkyEnvMapPass extends RenderPass {
    private _scenes;
    private _camera;
    private cubeCamera;
    cubeRenderTarget: WebGLCubeRenderTarget;
    constructor(scenes: Scenes, camera: PerspectiveCamera, resolution?: number);
    render(renderer: WebGLRenderer, _inputBuffer: WebGLRenderTarget | null, _outputBuffer: WebGLRenderTarget | null): void;
    getEnvMapTexture(): WebGLCubeRenderTarget["texture"] | undefined;
    dispose(): void;
}

export declare type SkyEnvMapPassConfig = Description_3 & EffectConfig;

export declare type SkyEnvMapPassUpdate = Description_3 & EffectUpdate;

/** One compact slot, mapped to its absolute slot and (optionally) a layer. */
declare type SlotBinding = {
    /** Compact index `[0, rasterCount + vectorCount)`. */
    compactSlot: number;
    /** Absolute slot index into the TileMesh main-shader per-slot uniforms. */
    absSlot: number;
    region: CompositeLayerRegion;
    /**
     * The active layer occupying `absSlot`, or undefined for an inactive prefix
     * slot. The compact space is a prefix per bucket (so `winningSlot = absSlot`
     * stays addressable), hence a quantized bucket can hold gaps.
     */
    layer: CompositeLayer | undefined;
};

/**
 * The compact slot layout for one tile's composite pass. `rasterCount` and
 * `vectorCount` are power-of-two-quantized high-water marks; `slots` is the
 * concrete compact→absolute mapping the enhancers bind against.
 */
declare type SlotPlan = {
    rasterCount: number;
    vectorCount: number;
    /** `texturizedSceneIndexFrom` — boundary between raster and vector regions. */
    boundary: number;
    slots: SlotBinding[];
};

/**
 * A handle to a data source (GeoJSON, vector tile, raster tile, raster DEM,
 * quantized mesh, 3D Tiles) registered via {@link ThreeView.addSource}.
 *
 * A source describes where data comes from and how it is fetched/decoded. One
 * source can be referenced by multiple layers (by its `id`). The engine
 * reference-counts sources and refuses to delete a source while any layer still
 * references it.
 *
 * @example
 * ```typescript
 * const poi = view.addSource({
 *   type: "vector-tile",
 *   url: "https://example.com/{z}/{x}/{y}.pbf",
 * });
 *
 * view.addLayer({
 *   type: "vector",
 *   source: poi,
 *   sourceLayers: ["building"],
 *   polygon: { color: 0x00aaff },
 * });
 * view.addLayer({
 *   type: "vector",
 *   source: poi,
 *   sourceLayers: ["building"],
 *   polyline: { color: 0xffffff },
 * });
 */
export declare class Source {
    /** The unique identifier of this source, used to reference it from layers. */
    readonly id: string;
    /** The discriminant type of this source (e.g. "vector-tile"). */
    readonly type: string;
    private core;
    constructor(id: string, type: string, core: Core);
    /**
     * Updates the source configuration and re-fetches its data. Every layer that
     * references this source is reset (its resources are torn down) and reloaded
     * against the new configuration.
     *
     * The update is partial, like {@link Layer.update}: any field you omit keeps
     * its current value instead of resetting to a default. `type` cannot change
     * and is always required; `url` is required by the type but, when set to the
     * unchanged value, leaves the fetched URL as-is.
     *
     * @example
     * ```typescript
     * // Only maxZoom changes; tms and the other fields are preserved.
     * imagery.update({
     *   type: "raster-tile",
     *   url: "https://example.com/{z}/{x}/{y}.png",
     *   maxZoom: 22,
     * });
     * ```
     */
    update(s: SourceDescription): void;
    /**
     * Removes the source and its resources.
     *
     * @returns `false` (and removes nothing) while any layer still references this
     * source; `true` once the source has been removed.
     */
    delete(): boolean;
}

/**
 * Fields common to every source, independent of its `type`.
 *
 * An optional `id` may be given; when omitted a random id is generated. Adding a
 * source with an existing id overrides it (later definition wins). Combined with
 * referencing a source by its id string from a layer, this enables defining the
 * whole map declaratively (MapLibre-style) from JSON.
 */
export declare type SourceBase = Omit<NormalizeWASMClass<SourceDescription_2>, "type">;

/**
 * A source describes where data comes from and how it is fetched/decoded.
 * Register one with `addSource` and reference it from layers by handle or id.
 *
 * This is the discriminated union of every per-type source description
 * ({@link GeoJsonSource}, {@link QuantizedMeshSource}, ...); use an individual
 * member type when you only accept one source type.
 */
export declare type SourceDescription = GeoJsonSource | VectorTileSource | RasterTileSource | RasterDemSource | QuantizedMeshSource | Tiles3dSource | B3dmSource | PntsSource;

/**
 * Discriminator used to read the `type` tag (and optional caller-provided `id`)
 * before dispatching.
 */
declare class SourceDescription_2 {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    /**
     * Optional caller-provided source id. When omitted, a random id is
     * generated. A duplicate id overrides the existing source (later wins).
     */
    get id(): string | undefined;
    /**
     * Optional caller-provided source id. When omitted, a random id is
     * generated. A duplicate id overrides the existing source (later wins).
     */
    set id(value: string | null | undefined);
    get type(): string | undefined;
    set type(value: string | null | undefined);
}

/**
 * Source geometry categories a vector appearance can consume via its
 * `geometryTypes` option. Each appearance defaults to its native geometry only
 * (`"point"` for point/billboard/text, `"line"` for polyline); adding entries
 * derives extra representations, e.g. `polyline: { geometryTypes: ["line",
 * "polygon"] }` also renders polygon boundary rings as polylines.
 */
export declare type SourceGeometryType = "point" | "line" | "polygon";

export declare type SourceLayerBase<Layer extends {
    source?: string | undefined;
}> = Omit<Layer, "source"> & {
    source?: SourceRef;
};

/**
 * A reference to a {@link Source}: either the source handle returned by
 * `addSource`, or its `id` string.
 */
export declare type SourceRef = string | Source;

export declare const SPRITE_BATCH_SUPPORT: BatchTextureSupport;

declare type SpriteGeometryType = Extract<GeometryType, typeof GEOMETRY_TYPES.Point | typeof GEOMETRY_TYPES.Billboard>;

export declare const STARS_ASSETS_URL: string;

export declare const STARS_RENDER_ORDER: number;

export declare const STBN_URL: string;

declare type SupportedMaterial = SupportedMaterial_2;

declare type SupportedMaterial_2 = MaterialsFromShaders<typeof AVAILABLE_SHADERS>;

declare type SupportedMaterial_3 = SupportedMaterial_4;

declare type SupportedMaterial_4 = MaterialsFromShaders<typeof AVAILABLE_SHADERS_4>;

/**
 * Material types that the polyline base enhancer supports.
 * Polylines use ShaderMaterial exclusively.
 */
declare type SupportedMaterial_5 = ShaderMaterial;

/**
 * Material types that the instancedSprite base enhancer supports.
 */
declare type SupportedMaterial_6 = ShaderMaterial;

/**
 * Material types that the sdfText base enhancer supports.
 */
declare type SupportedMaterial_7 = ShaderMaterial;

/**
 * Travel tolerance for touch taps. Finger contact jitters far more than a
 * mouse, so follows MapLibre's tap `MAX_DIST` instead.
 * ref: https://github.com/maplibre/maplibre-gl-js/blob/3a0a4f795fef5b2a29034d71833475589c344eaf/src/ui/handler/tap_recognizer.ts
 */
export declare const TAP_PIXEL_TOLERANCE = 30;

/**
 * Temporary DEM state while waiting for edge updates.
 * Stores only the WASM buffer handle and received edge strips — NOT the full padded DEM.
 * The padded DEM is reconstructed transiently on each edge arrival, then discarded.
 */
declare type TempDemEntry = {
    originalHandle: number;
    paddedSize: number;
    receivedEdges: Set<number>;
    receivedEdgeData: Map<number, Uint8Array>;
    metersPerTexel: number;
    hillshadeConfig: HillshadeConfig;
};

declare class TerrainHeightRangeUpdatedEvent {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    bits: bigint;
    max: number;
    min: number;
}

declare class TerrainHeightUpdatedEvent {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    bits: bigint;
    gen: number;
    get height(): number | undefined;
    set height(value: number | null | undefined);
    ind: number;
    lle: LLE;
}

/**
 * Render-only appearance for a `terrain` layer's mesh, regardless of the
 * referenced source's data format (raster-dem, quantized-mesh, or the
 * source-less ellipsoid). All fetch/geometry config lives on the referenced
 * `Source`; the data format itself is carried by `TerrainDataType`.
 */
declare class TerrainMaterial {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    get castShadow(): boolean | undefined;
    set castShadow(value: boolean | null | undefined);
    /**
     * Applies the lighting equation to the color output. When `false` the
     * material outputs plain albedo (for deferred lighting) while normals and
     * the shadow G-buffer keep being written.
     */
    get lit(): boolean | undefined;
    /**
     * Applies the lighting equation to the color output. When `false` the
     * material outputs plain albedo (for deferred lighting) while normals and
     * the shadow G-buffer keep being written.
     */
    set lit(value: boolean | null | undefined);
    get receiveShadow(): boolean | undefined;
    set receiveShadow(value: boolean | null | undefined);
    get showBoundingBox(): boolean | undefined;
    set showBoundingBox(value: boolean | null | undefined);
    get show(): boolean | undefined;
    set show(value: boolean | null | undefined);
    /**
     * Multiplier for the automatically calculated skirt height.
     * A value of 1.0 uses the default calculated height.
     */
    get skirtExaggeration(): number | undefined;
    /**
     * Multiplier for the automatically calculated skirt height.
     * A value of 1.0 uses the default calculated height.
     */
    set skirtExaggeration(value: number | null | undefined);
    /**
     * Whether to render skirts along tile boundaries to hide gaps.
     * You should disable `skirt` if you want to visualize an underground model.
     */
    get skirt(): boolean | undefined;
    /**
     * Whether to render skirts along tile boundaries to hide gaps.
     * You should disable `skirt` if you want to visualize an underground model.
     */
    set skirt(value: boolean | null | undefined);
}

/**
 * A `terrain` layer renders a `raster-dem` or `quantized-mesh` source as the
 * globe surface. Alternatively, omit `source` and pass `ellipsoid` to render a
 * flat ellipsoid surface (e.g. to drape clamp-to-ground data on).
 */
export declare type TerrainSourceLayer = SourceLayerBase<TerrainSourceLayerBase> & {
    /** Render a source-less flat ellipsoid surface. Mutually exclusive with `source`. */
    ellipsoid?: TerrainSourceLayerBase["terrain"];
};

declare type TerrainSourceLayerBase = WithColorSupport<Layer_2<TerrainSourceLayerDescription & {
    type: "terrain";
}>>;

/**
 * A `terrain` layer renders a `raster-dem` or `quantized-mesh`
 * source as the globe surface. Rendering options are uniform regardless of the
 * source's data format.
 */
declare class TerrainSourceLayerDescription {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    get source(): string | undefined;
    set source(value: string | null | undefined);
    /**
     * Terrain mesh rendering options. Nested like the other layers' render
     * inputs (`raster`, `model`, ...); all fetch/geometry config lives on the
     * referenced source. A source-less terrain layer (a flat ellipsoid surface
     * to drape clamp-to-ground data on) is written with the `ellipsoid` key.
     */
    get terrain(): TerrainMaterial | undefined;
    /**
     * Terrain mesh rendering options. Nested like the other layers' render
     * inputs (`raster`, `model`, ...); all fetch/geometry config lives on the
     * referenced source. A source-less terrain layer (a flat ellipsoid surface
     * to drape clamp-to-ground data on) is written with the `ellipsoid` key.
     */
    set terrain(value: TerrainMaterial | null | undefined);
    get type(): string | undefined;
    set type(value: string | null | undefined);
}

export declare const TERRARIUM_ELEVATION_DECODER: () => ElevationDecoder;

export declare const TEXT_BATCH_SUPPORT: BatchTextureSupport;

/** @deprecated Use {@link Facing}, which covers all three material types. */
export declare type TextFacing = Facing;

declare class TextMaterial {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    /**
     * Whether faces seen from behind are culled. Default is false, so a
     * quad frozen in its anchor's frame (`rotateWithCamera: false`) stays
     * visible from behind. Turn it on to hide a flat quad's parts that wrap
     * over the horizon, which face away from the camera.
     */
    get backfaceCulling(): boolean | undefined;
    /**
     * Whether faces seen from behind are culled. Default is false, so a
     * quad frozen in its anchor's frame (`rotateWithCamera: false`) stays
     * visible from behind. Turn it on to hide a flat quad's parts that wrap
     * over the horizon, which face away from the camera.
     */
    set backfaceCulling(value: boolean | null | undefined);
    get backgroundColor(): number | undefined;
    set backgroundColor(value: number | null | undefined);
    get borderColor(): number | undefined;
    set borderColor(value: number | null | undefined);
    get borderWidth(): number | undefined;
    set borderWidth(value: number | null | undefined);
    get center(): Vec2_2 | undefined;
    set center(value: Vec2_2 | null | undefined);
    get clampToGround(): boolean | undefined;
    set clampToGround(value: boolean | null | undefined);
    get color(): number | undefined;
    set color(value: number | null | undefined);
    /**
     * Placement priority for decluttering; higher wins. Only meaningful when
     * `declutter` is enabled. Defaults to `0.0`.
     */
    get declutterPriority(): number | undefined;
    /**
     * Placement priority for decluttering; higher wins. Only meaningful when
     * `declutter` is enabled. Defaults to `0.0`.
     */
    set declutterPriority(value: number | null | undefined);
    /**
     * Participate in screen-space decluttering: when labels/sprites overlap
     * on screen, lower-priority ones are hidden. Defaults to `true`; set to
     * `false` to draw every label unconditionally.
     */
    get declutter(): boolean | undefined;
    /**
     * Participate in screen-space decluttering: when labels/sprites overlap
     * on screen, lower-priority ones are hidden. Defaults to `true`; set to
     * `false` to draw every label unconditionally.
     */
    set declutter(value: boolean | null | undefined);
    get depthTest(): boolean | undefined;
    set depthTest(value: boolean | null | undefined);
    /**
     * IDs of selective effects to apply (e.g., "bloom", "outline")
     */
    get effectIds(): string[] | undefined;
    /**
     * IDs of selective effects to apply (e.g., "bloom", "outline")
     */
    set effectIds(value: string[] | null | undefined);
    /**
     * Emissive glow color in 0xRRGGBB format
     */
    get emissiveColor(): number | undefined;
    /**
     * Emissive glow color in 0xRRGGBB format
     */
    set emissiveColor(value: number | null | undefined);
    /**
     * Emissive glow intensity (omitted = 0, no emissive output)
     */
    get emissiveIntensity(): number | undefined;
    /**
     * Emissive glow intensity (omitted = 0, no emissive output)
     */
    set emissiveIntensity(value: number | null | undefined);
    /**
     * Specifies either the URL of a single font file or the `family` name of a font family
     * previously registered with `view.addFontFamily()`. Supported file formats are ttf, otf,
     * woff, and woff2.
     *
     * When a family name is used, only the face files whose unicode ranges cover the characters
     * in `text` are fetched, so large scripts (CJK, etc.) can be split into multiple faces and
     * loaded on demand. For each codepoint, the first face (in `faces` order) whose
     * `unicodeRanges` contain the codepoint is used; codepoints not covered by any face fall
     * back to the first face, which may therefore be downloaded even for characters outside its
     * declared ranges.
     *
     * Defaults to `None`: no font is loaded, and the text layer will not render until a font
     * is specified.
     */
    get font(): string | undefined;
    /**
     * Specifies either the URL of a single font file or the `family` name of a font family
     * previously registered with `view.addFontFamily()`. Supported file formats are ttf, otf,
     * woff, and woff2.
     *
     * When a family name is used, only the face files whose unicode ranges cover the characters
     * in `text` are fetched, so large scripts (CJK, etc.) can be split into multiple faces and
     * loaded on demand. For each codepoint, the first face (in `faces` order) whose
     * `unicodeRanges` contain the codepoint is used; codepoints not covered by any face fall
     * back to the first face, which may therefore be downloaded even for characters outside its
     * declared ranges.
     *
     * Defaults to `None`: no font is loaded, and the text layer will not render until a font
     * is specified.
     */
    set font(value: string | null | undefined);
    /**
     * Source geometry types this appearance consumes: `"point"`, `"line"`,
     * `"polygon"`. Defaults to `["point"]`; adding `"line"`/`"polygon"` also
     * emits a label per line-string / polygon-ring vertex.
     */
    get geometryTypes(): string[] | undefined;
    /**
     * Source geometry types this appearance consumes: `"point"`, `"line"`,
     * `"polygon"`. Defaults to `["point"]`; adding `"line"`/`"polygon"` also
     * emits a label per line-string / polygon-ring vertex.
     */
    set geometryTypes(value: string[] | null | undefined);
    get height(): number | undefined;
    set height(value: number | null | undefined);
    /**
     * Enable high-quality glyph rendering. When `true`, text uses an MTSDF
     * atlas (sharper corners at large sizes, dramatically slower
     * rasterization). When `false` or omitted, the default single-channel SDF
     * atlas is used (fast). Mirrors `navara_material::TextMaterial::high_quality`
     * on the Rust side.
     */
    get highQuality(): boolean | undefined;
    /**
     * Enable high-quality glyph rendering. When `true`, text uses an MTSDF
     * atlas (sharper corners at large sizes, dramatically slower
     * rasterization). When `false` or omitted, the default single-channel SDF
     * atlas is used (fast). Mirrors `navara_material::TextMaterial::high_quality`
     * on the Rust side.
     */
    set highQuality(value: boolean | null | undefined);
    /**
     * Language code for text shaping (e.g., "en", "ja", "ar"). Used for proper text rendering.
     */
    get lang(): string | undefined;
    /**
     * Language code for text shaping (e.g., "en", "ja", "ar"). Used for proper text rendering.
     */
    set lang(value: string | null | undefined);
    /**
     * Line height as a multiplier of the font's natural line height
     * (ascender − descender + line gap). Defaults to `1.0`.
     */
    get lineHeight(): number | undefined;
    /**
     * Line height as a multiplier of the font's natural line height
     * (ascender − descender + line gap). Defaults to `1.0`.
     */
    set lineHeight(value: number | null | undefined);
    /**
     * Maximum line width in ems (multiples of `size`) before text wraps at
     * word boundaries. `0.0` (the default) disables wrapping; explicit `\n`
     * characters in `text` always break lines.
     */
    get maxWidth(): number | undefined;
    /**
     * Maximum line width in ems (multiples of `size`) before text wraps at
     * word boundaries. `0.0` (the default) disables wrapping; explicit `\n`
     * characters in `text` always break lines.
     */
    set maxWidth(value: number | null | undefined);
    /**
     * Avoid overlapping with the globe surface.
     */
    get offsetDepth(): boolean | undefined;
    /**
     * Avoid overlapping with the globe surface.
     */
    set offsetDepth(value: boolean | null | undefined);
    /**
     * Opacity of the text
     */
    get opacity(): number | undefined;
    /**
     * Opacity of the text
     */
    set opacity(value: number | null | undefined);
    /**
     * Outline blur radius in CSS pixels. Defaults to `0.0`.
     */
    get outlineColor(): number | undefined;
    /**
     * Outline blur radius in CSS pixels. Defaults to `0.0`.
     */
    set outlineColor(value: number | null | undefined);
    /**
     * Pixel offset `[x, y]` in CSS pixels. Defaults to `(0.0, 0.0)`.
     */
    get outlineOpacity(): number | undefined;
    /**
     * Pixel offset `[x, y]` in CSS pixels. Defaults to `(0.0, 0.0)`.
     */
    set outlineOpacity(value: number | null | undefined);
    /**
     * Outline thickness measured in CSS pixels. Defaults to `0.0`.
     */
    get outlineWidth(): number | undefined;
    /**
     * Outline thickness measured in CSS pixels. Defaults to `0.0`.
     */
    set outlineWidth(value: number | null | undefined);
    /**
     * Whether the label turns to follow the camera. `true` (the default)
     * keeps it facing the viewer. `false` freezes it in the anchor's local
     * east-north-up frame, so moving the camera never reorients it: with
     * `textFacing: "upright"` it becomes a signboard standing on the
     * surface, with `"flat"` a north-up label painted on it.
     */
    get rotateWithCamera(): boolean | undefined;
    /**
     * Whether the label turns to follow the camera. `true` (the default)
     * keeps it facing the viewer. `false` freezes it in the anchor's local
     * east-north-up frame, so moving the camera never reorients it: with
     * `textFacing: "upright"` it becomes a signboard standing on the
     * surface, with `"flat"` a north-up label painted on it.
     */
    set rotateWithCamera(value: boolean | null | undefined);
    /**
     * Rotation of the label within its own plane, about its anchor point, in
     * degrees, clockwise seen from the front. Applied on top of whatever
     * orientation `textFacing` and `rotateWithCamera` resolve to: it spins a
     * billboard on screen and turns a surface label like a compass bearing.
     * `center` decides where inside the text the pivot sits. Defaults to
     * `0.0`.
     */
    get rotation(): number | undefined;
    /**
     * Rotation of the label within its own plane, about its anchor point, in
     * degrees, clockwise seen from the front. Applied on top of whatever
     * orientation `textFacing` and `rotateWithCamera` resolve to: it spins a
     * billboard on screen and turns a surface label like a compass bearing.
     * `center` decides where inside the text the pivot sits. Defaults to
     * `0.0`.
     */
    set rotation(value: number | null | undefined);
    get show(): boolean | undefined;
    set show(value: boolean | null | undefined);
    /**
     * Whether the size is specified in meters. If false, the size is in pixels. Default is true.
     */
    get sizeInMeters(): boolean | undefined;
    /**
     * Whether the size is specified in meters. If false, the size is in pixels. Default is true.
     */
    set sizeInMeters(value: boolean | null | undefined);
    /**
     * size in pixels/meters (units are determined by `sizeInMeters`).
     */
    get size(): number | undefined;
    /**
     * size in pixels/meters (units are determined by `sizeInMeters`).
     */
    set size(value: number | null | undefined);
    /**
     * Horizontal alignment of lines within a multi-line block:
     * `"left"`, `"center"` (default), or `"right"`.
     */
    get textAlign(): string | undefined;
    /**
     * Horizontal alignment of lines within a multi-line block:
     * `"left"`, `"center"` (default), or `"right"`.
     */
    set textAlign(value: string | null | undefined);
    /**
     * Whether the label stands up (`"upright"`, the default) or lies on the
     * globe surface around its anchor (`"flat"`), following its curvature so
     * it reads as painted on the surface. Pair with `rotateWithCamera`.
     */
    get textFacing(): string | undefined;
    /**
     * Whether the label stands up (`"upright"`, the default) or lies on the
     * globe surface around its anchor (`"flat"`), following its curvature so
     * it reads as painted on the surface. Pair with `rotateWithCamera`.
     */
    set textFacing(value: string | null | undefined);
    get text(): string | undefined;
    set text(value: string | null | undefined);
    /**
     * Enable transparency and alpha blending
     */
    get transparent(): boolean | undefined;
    /**
     * Enable transparency and alpha blending
     */
    set transparent(value: boolean | null | undefined);
}

declare class TextMesh {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    active: boolean;
    batch_length: number;
    geometry: TransferablePointGeometry;
    material: TextMaterial;
    transform: Transform_2;
}

declare type TextureFragmentHandler = {
    triggerTextureFragmentLoaded: (bits: bigint, status: TextureFragmentStatus) => void;
};

declare class TextureFragmentRequestedEvent {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    bits: bigint;
    gen: number;
    ind: number;
    status: TextureFragmentStatus;
    url: string;
}

declare enum TextureFragmentStatus {
    Success = 0,
    Fail = 1,
    Pending = 2,
}

declare type TextureOptions = {
    maxAnisotropy: number;
    minFilter: number;
    magFilter: number;
    useMipmaps: boolean;
    maxTextures: number;
    additionalTexturesInUse?: {
        waterTexture?: boolean;
        colorMapTexture?: boolean;
    };
};

declare type TextureSlot = {
    tileMesh: TileMesh;
    slotIndex: number;
};

declare class TexturizedSceneByTileCoordinates {
    map: Map<bigint, SceneGroup>;
    renderer: WebGLRenderer;
    camera: OrthographicCamera;
    constructor(renderer: WebGLRenderer);
    get(handle: TileHandle): SceneGroup;
    private findTileScene;
    add(handle: TileHandle, layerId: string, mesh: Mesh_2, layerIndex: number): TileScene;
    findSceneByLayerId(handle: TileHandle, layerId: string): TileScene | undefined;
    /**
     * Bump a layer scene's revision without changing its contents. Draped-feature
     * material/visibility changes that don't add or remove a mesh use this so the
     * consuming TileMesh's bake signature (which folds in `revision`) re-bakes.
     */
    markDirty(handle: TileHandle, layerId: string): void;
    /**
     * Remove a single feature mesh from its (tile, layer) scene. Only when the scene's last
     * mesh leaves do we mark it `removed` and prune the empty `TileScene` (and the
     * `SceneGroup` if it too becomes empty). This keeps sibling draped features in the same
     * tile+layer intact — unlike a whole-scene clear, which blanked them all on one removal.
     */
    removeMesh(handle: TileHandle, layerId: string, mesh: Mesh_2): void;
    delete(handle: TileHandle): void;
}

/**
 * The main 3D globe view class that manages rendering, layers, camera, and user interaction.
 * Create an instance and call `init()` to start the engine.
 *
 * @example
 * ```typescript
 * const view = new ThreeView();
 * await view.init();
 * ```
 */
declare class ThreeView<D extends Descriptions = EmptyDescriptions> extends EventHandler<ViewEvents> {
    private _camera;
    private _renderer;
    private _globe;
    private _atmosphere;
    /** Handle for the sky environment map effect descriptor. Used for sky reflections. */
    private skyEnvMap;
    /** Handle for the Multi-Render Target pass that outputs color and normal buffers. */
    private mrtPass;
    /** Handle for the transparent objects rendering pass. */
    private transparentPass;
    /** Handle for the final compositing pass that outputs to screen. */
    private finalPass;
    /** The render pass orchestrator that manages the post-processing effect pipeline. */
    private renderPassOrchestrator;
    private _scenes;
    private _core;
    private _fontManager;
    private _options;
    private _stats;
    private _eventDisposer;
    private _disposed;
    private _renderFlag;
    /** Shared screen-space label declutterer for text/sprite features. */
    private _declutter;
    /** Reusable Vector2 for the declutter pass's per-frame viewport query. */
    private _declutterSize;
    /** Pending follow-up frame for a throttled declutter pass or an active
     *  fade, with the delay it was scheduled at (so a shorter need preempts). */
    private _declutterRetry;
    private _declutterRetryDelay;
    private _isIdle;
    private _uniforms;
    /** Pending `flyTo` promises keyed by flight id, settled by
     *  `camera_flight_ended` events from the engine. */
    private _pendingFlights;
    /** {@link observeTerrainHeightRange} callbacks by observer entity bits. */
    private _terrainHeightRangeObservers;
    /** Currently hovered feature, used to diff-synthesize hover events. */
    private _hoveredFeature;
    private _meshes;
    private _abortControllers;
    private _workerPoolPromises;
    private _loadedTexs;
    private _texturizedSceneByTileCoordinates;
    private _tileTextureCompositor;
    private _tileMapByHandle;
    private _textureFragmentIndex;
    private _tileMeshToFragmentIds;
    private _hillshadeContext;
    private _initialized;
    /**
     * JS-side store for buffers WASM tracks by byte count only (`External`
     * entries). Fetched MVT pbf and worker-built geometry live here instead of
     * being copied into WASM linear memory, whose peak never shrinks. The
     * `_buf` wrapper prefers this store, falling back to WASM for entries Rust
     * still owns; handles are evicted per frame via `drainRemovedExternalHandles`.
     */
    private _inMemoryBufferStore;
    private _buf;
    private _texFragment;
    private _vectorRevision;
    private _rasterRevision;
    private _tileHandler;
    private _globeHandler;
    private _workerTaskHandler;
    private _featureHandler;
    private _meshHandler;
    private _layerHandler;
    private _ownedRootElement;
    private _eventManager;
    private _pickHelper?;
    private _terrainPicker;
    private _defaultTextureOptions;
    private layersManager;
    private shadowMapViewers;
    private eventContext;
    private registries;
    private viewContext;
    private plugins;
    /** Built-in attribution UI; unset when disabled or in a worker (no DOM). */
    private _attribution?;
    /**
     * Derived G-buffer attachment configuration — the union of the
     * `requiredBuffers` declared by the active effects.
     */
    private _buffers;
    /** Scene-level default of the `lit` material option (see {@link lit}). */
    private _lit;
    private pixelRatioMatchedMedia?;
    private fixedGpuBytesReportScheduled;
    private fixedGpuBytesResyncPending;
    private framesSinceFixedGpuBytesReport;
    private lastReportedFixedGpuBytes;
    /**
     * The built-in attribution (credit) UI. `undefined` when disabled via
     * `defaultAttribution: false`, or in a worker / no-DOM environment. Feed it
     * credits with `view.attribution?.add([...])`.
     */
    get attribution(): AttributionPlugin | undefined;
    /**
     * Buffers currently allocated. Not configurable — derived as the union of
     * the active effects' `requiredBuffers`. All but `globeNormal` are G-buffer
     * attachments.
     */
    get buffers(): ResolvedGBufferOptions;
    /**
     * Scene-level default of the `lit` material option. `false` makes every
     * material without an explicit `lit` output plain albedo, while normals and
     * the shadow G-buffer keep being written – the input for deferred lighting.
     * Toggling recompiles the affected shaders once.
     * @defaultValue true
     */
    get lit(): boolean;
    set lit(value: boolean);
    constructor(options?: Options);
    /**
     * Extend a pointer event with map coordinates at its location
     */
    private convertToMapEvent;
    private initializeRenderPass;
    private get renderPass();
    /** The camera controller that manages view position, orientation, and projection. */
    get camera(): ThreeViewCamera;
    /** The globe instance that manages terrain, imagery layers, and globe-specific settings. */
    get globe(): Globe;
    /** The atmosphere renderer that handles sky, sun, and atmospheric scattering effects. */
    get atmosphere(): Atmosphere;
    /**
     * Gets the tone mapping exposure value.
     */
    get toneMappingExposure(): number;
    /**
     * Sets the tone mapping exposure value for HDR rendering.
     */
    set toneMappingExposure(v: number);
    /**
     * The resolved tile-cache memory budget in bytes (see `Options.cacheBytes`).
     * `undefined` before `init()` when no explicit option was given.
     */
    get cacheBytes(): number | undefined;
    /**
     * Updates the tile-cache memory budget at runtime. Lowering it evicts
     * retained tiles down to the new budget over the next frames. Passing
     * `undefined` disables budgeting entirely, restoring the original
     * destroy-on-unvisited tile lifecycle.
     */
    set cacheBytes(v: number | undefined);
    /**
     * The resolved LOD fog settings (see `Options.lodFog`). `undefined`
     * before `init()`.
     */
    get lodFog(): LodFogSettings | undefined;
    /**
     * Updates the LOD fog at runtime; partial values merge over the current
     * settings. The next traversal re-selects tile LODs with the new curve.
     */
    set lodFog(v: Partial<LodFogSettings>);
    /**
     * The resolved dynamic-SSE settings (see `Options.dynamicSse`).
     * `undefined` before `init()`.
     */
    get dynamicSse(): DynamicSseSettings | undefined;
    /**
     * Updates the dynamic SSE at runtime; partial values merge over the
     * current settings. The next traversal re-selects tile LODs with the new
     * curve.
     */
    set dynamicSse(v: Partial<DynamicSseSettings>);
    /**
     * Updates the memory-pressure SSE degrade range at runtime. `min` is the
     * resting multiplier applied even without budget pressure (> 1 coarsens far
     * tiles at rest); `max` is the ceiling the dynamic degrade can climb to. The
     * next traversal re-selects tile LODs with the new range.
     */
    setSseMultiplierRange(min: number, max: number): void;
    /**
     * Snapshot of engine memory usage (WASM buffer bytes, GPU estimates,
     * retained tile counts). Returns `undefined` before `init()`.
     */
    memoryStats(): MemoryStats | undefined;
    /**
     * Snapshot of worker-side memory: per-tile-worker WASM heaps (point-in-time
     * samples from the pool's post-task probes — this call also requests fresh
     * probes, whose results show up on the *next* call) and the font worker's
     * heap/cache breakdown (`undefined` while no font has been used). Returns
     * `undefined` before `init()`.
     */
    workerMemoryStats(): Promise<WorkerMemoryStats | undefined>;
    /** Screen center in CSS client coordinates. */
    private _viewportCenter;
    private _distanceFromCamera;
    private get globeDepthTexture();
    private get depthTexture();
    /**
     * Returns whether mobile optimizations should be applied.
     * If `mobileOptimization` option is explicitly set, returns that value;
     * otherwise falls back to auto-detecting via `isMobileDevice()`.
     */
    isMobileOptimized(): boolean;
    /**
     * Forces an immediate re-render of the scene on the next frame.
     */
    forceUpdate: () => void;
    /**
     * Initializes the 3D engine, WASM modules, and starts the main render loop.
     * Must be called before using the view.
     */
    init(): Promise<void>;
    /**
     * Disposes all resources and stops the render loop.
     * Call this when the view is no longer needed.
     */
    dispose(): void;
    /**
     * Resizes the renderer and updates the camera aspect ratio.
     * @param width - New width in pixels (uses canvas size if omitted)
     * @param height - New height in pixels (uses canvas size if omitted)
     * @param pixelRatio - Device pixel ratio
     */
    resize: (width?: number, height?: number, pixelRatio?: number) => void;
    /**
     * Walks the fixed render-target stack and pushes the estimate into the
     * memory ledger; the WASM call is skipped while the value is unchanged.
     */
    private _reportFixedGpuBytes;
    /**
     * Re-reports the fixed GPU footprint for event-triggered changes (init,
     * resize, pass add/remove). Scheduled as a microtask so bursts — e.g.
     * effect setup during init — coalesce into a single walk, and marks a
     * one-shot post-render resync because these events run before the GPU has
     * lazily allocated the affected targets.
     */
    private _scheduleFixedGpuBytesReport;
    private _updateUniforms;
    /** Returns true if the scene was updated and needs to be rendered. */
    private _update;
    /**
     * Process feature updates for all descriptors
     * This is called after the main update loop to batch feature updates
     */
    private _forceFeatureUpdates;
    /**
     * Ask for a future frame on behalf of the declutter pass. Runs through a
     * timer because the main loop clears `forceUpdate` right after `_render` —
     * a flag set synchronously here would be wiped before the next tick reads
     * it. A pending longer timer is preempted when a shorter delay is needed
     * (a fade must not wait out a throttle window).
     */
    private _scheduleDeclutterFrame;
    private _render;
    /**
     * Since passing Color class to WASM is tricky, converts Navara Color
     * objects to numbers in layer descriptions.
     * Handles the two-level structure: layer -> material -> color fields.
     */
    private _convertColorsToNumbers;
    /**
     * Adds a new resource layer (GIS data layer) to the scene.
     * For meshes, lights, and effects, use `addMesh()`, `addLight()`, and `addEffect()` instead.
     * @param l - Resource layer configuration object specifying type and options
     * @returns A Layer for controlling the added layer
     */
    addLayer(l: LayerDescription): Layer;
    /**
     * Registers a data source (GeoJSON, vector tile, raster tile, raster DEM,
     * quantized mesh, 3D Tiles) and returns a {@link Source} handle.
     * Reference the returned source from layers via `addLayer({ source })`.
     * @param s - Source configuration object specifying type and options
     * @returns A Source handle for referencing, updating, and deleting the source
     */
    addSource(s: SourceDescription): Source;
    /**
     * Tracks a possibly-async `onCreate()` (see `BaseDesc.onCreate`): the
     * `add*` methods still return their handle synchronously, the descriptor's
     * instance appears when the promise settles, and a rejection is logged and
     * reported through the descriptor's `error` event (when it declares one).
     *
     * `wire` binds the descriptor's lifecycle hooks (per-frame `update`,
     * `onResize`, `needsUpdate`). It runs immediately for a synchronous
     * creation, and only after the promise resolves for an async one — the
     * hooks must not fire while the descriptor has no instance yet.
     */
    private _trackAsyncCreate;
    /**
     * Adds a 3D mesh to the scene.
     * The mesh kind is determined by the nested key (e.g., `{ box: { width: 200 } }`).
     * @param desc - Mesh configuration object
     * @returns A MeshHandle for controlling the added mesh
     */
    addMesh<L extends AnyMeshDesc = AnyMeshDesc>(config: OmitType<MeshConfig | NonNullable<D["mesh"]>>): MeshHandle<L>;
    /**
     * Adds a light to the scene.
     * The light kind is determined by the nested key (e.g., `{ ambient: { intensity: 0.5 } }`).
     * @param desc - Light configuration object
     * @returns A LightHandle for controlling the added light
     */
    addLight<L extends LightDesc = LightDesc>(config: OmitType<LightConfig | NonNullable<D["light"]>>): LightHandle<L>;
    /**
     * Adds a post-processing effect to the scene.
     * The effect kind is determined by the nested key (e.g., `{ bloom: { strength: 1.0 } }`).
     * @param desc - Effect configuration object
     * @returns An EffectHandle for controlling the added effect
     */
    addEffect<L extends EffectDesc = EffectDesc>(config: OmitType<BuiltInEffectDescription | EffectConfig | NonNullable<D["effect"]>>): EffectHandle<L>;
    /**
     * Re-derives the G-buffer configuration from the union of the active
     * effects' and meshes' `getRequiredBuffers()` and applies it to the MRT pass
     * when changed.
     */
    private _syncGBuffers;
    /**
     * Throws when enabling a descriptor's required G-buffers would push the
     * attachment count (color + enabled optional buffers) past the device's
     * `MAX_DRAW_BUFFERS` limit.
     */
    private _assertGBufferCapacity;
    private _countGBufferAttachments;
    private _maxDrawBuffers;
    /**
     * Finds a resource layer by its ID.
     * Only returns resource layers added via `addLayer()` (not mesh, light, or
     * effect descriptors).
     * @param id - The unique identifier of the layer to find
     * @returns The matching {@link Layer}, or `undefined` if none exists
     */
    findLayerById(id: string): Layer | undefined;
    /**
     * Updates an existing resource layer's configuration by its ID.
     * Only works for resource layers added via `addLayer()`.
     * @param id - The unique identifier of the layer to update
     * @param l - New layer configuration
     */
    updateLayerById(id: string, l: LayerDescription): void;
    /**
     * Updates an existing mesh descriptor's configuration by its ID.
     * @param id - The unique identifier of the mesh to update
     * @param updates - Partial configuration object with properties to update
     */
    updateMeshById(id: string, updates: OmitType<MeshConfig | NonNullable<D["mesh"]>>): void;
    /**
     * Updates an existing light descriptor's configuration by its ID.
     * @param id - The unique identifier of the light to update
     * @param updates - Partial configuration object with properties to update
     */
    updateLightById(id: string, updates: OmitType<LightConfig | NonNullable<D["light"]>>): void;
    /**
     * Updates an existing effect descriptor's configuration by its ID.
     * @param id - The unique identifier of the effect to update
     * @param updates - Partial configuration object with properties to update
     */
    updateEffectById(id: string, updates: OmitType<BuiltInEffectDescription | EffectConfig | NonNullable<D["effect"]>>): void;
    /**
     * Deletes a resource layer from the scene by its ID.
     * @param id - The unique identifier of the layer to delete
     * @returns `true` if the layer was found and deleted, `false` otherwise
     */
    deleteLayerById(id: string): boolean;
    /**
     * Deletes a mesh descriptor from the scene by its ID.
     * @param id - The unique identifier of the mesh to delete
     * @returns `true` if the mesh was found and deleted, `false` otherwise
     */
    deleteMeshById(id: string): boolean;
    /**
     * Deletes a light descriptor from the scene by its ID.
     * @param id - The unique identifier of the light to delete
     * @returns `true` if the light was found and deleted, `false` otherwise
     */
    deleteLightById(id: string): boolean;
    /**
     * Deletes an effect descriptor from the scene by its ID.
     * @param id - The unique identifier of the effect to delete
     * @returns `true` if the effect was found and deleted, `false` otherwise
     */
    deleteEffectById(id: string): boolean;
    private registerBuiltIns;
    private registerBuiltInEffects;
    /**
     * Registers a custom mesh descriptor type for use with addMesh().
     * @param name - Unique name to identify this mesh type in descriptor configurations
     * @param meshClass - The mesh descriptor class constructor
     */
    registerMesh(name: string, meshClass: MeshDescConstructor): void;
    /**
     * Registers a custom light descriptor type for use with addLight().
     * @param name - Unique name to identify this light type in descriptor configurations
     * @param lightClass - The light descriptor class constructor
     */
    registerLight(name: string, lightClass: LightDescConstructor): void;
    /**
     * Registers a custom post-processing effect descriptor type for use with addEffect().
     * @param name - Unique name to identify this effect type in descriptor configurations
     * @param effectClass - The effect descriptor class constructor
     */
    registerEffect(name: string, effectClass: EffectDescConstructor): void;
    /**
     * Adds a plugin to the view. Plugins are initialized during `init()`.
     * Must be called before `init()`.
     * @param plugin - The plugin instance to add
     * @returns This view instance for chaining
     */
    addPlugin(plugin: Plugin_2): this;
    /**
     * Register a font family with multiple faces.
     * Each face covers a set of unicode ranges and points to a separate font file URL.
     * When a text label uses this family name as its font, only the face files
     * whose unicode ranges cover the label's characters are loaded.
     *
     * Face priority and fallback:
     * - Faces are evaluated in the order given in `faces`. For each codepoint,
     *   the first face whose `unicodeRanges` includes that codepoint is used,
     *   so earlier entries win when ranges overlap.
     * - Codepoints not covered by any face fall back to the first face
     *   (`faces[0]`), which may therefore be downloaded for uncovered characters
     *   even if its declared `unicodeRanges` do not include them.
     *
     * Put the intended fallback face at index `0`: it is both the fallback for
     * uncovered codepoints and the highest-priority face when ranges overlap.
     * Order the remaining faces after it by priority, and avoid overlapping
     * ranges unless that precedence is intentional.
     *
     * @example
     * ```ts
     * view.addFontFamily({
     *   family: "MapFont",
     *   faces: [
     *     {
     *       url: "/fonts/latin.woff2",
     *       unicodeRanges: [{ from: 0x0000, to: 0x024f }],
     *     },
     *     {
     *       url: "/fonts/cjk.woff2",
     *       unicodeRanges: [{ from: 0x4e00, to: 0x9fff }],
     *     },
     *   ],
     * });
     * ```
     *
     * Instead of writing faces and ranges by hand, they can be derived from a
     * stylesheet's `@font-face` rules (e.g. the Google Fonts CSS API) with
     * {@link fetchFontFamilyFromCss} / {@link parseFontFamilyFromCss}:
     *
     * @example
     * ```ts
     * view.addFontFamily(
     *   await fetchFontFamilyFromCss(
     *     "MapFont",
     *     "https://fonts.googleapis.com/css2?family=Noto+Sans&family=Noto+Sans+JP",
     *   ),
     * );
     * ```
     */
    addFontFamily(family: FontFamily): this;
    /** Remove a previously registered font family by name. */
    removeFontFamily(family: string): this;
    /**
     * Sets the camera position and orientation instantly.
     * @param camPos - Camera position with lng (degrees), lat (degrees), height (meters), and optional pitch, heading, roll (degrees)
     */
    setCamera(camPos: CameraPosition): void;
    /**
     * Moves the camera in a specified direction.
     * @param move - Direction: `CameraDirection`
     * @param amount - Distance to move in meters
     */
    moveCamera(move: CameraDirection, amount: number): void;
    /**
     * Moves the camera along a custom direction vector.
     * @param dir - Direction vector as [x, y, z] array
     * @param amount - Distance to move in meters
     */
    moveCameraWithDirection(dir: number[], amount: number): void;
    /**
     * Animates the camera to fly to a target position.
     *
     * The flight follows an arced path: the default duration is derived from
     * the flight distance (2–3 s), the default easing is `quinticInOut`
     * (`cubicOut` when descending from high altitude), and longitudes take the
     * short way across the antimeridian.
     *
     * @param camPos - Target position with required lng/lat (degrees). Provide either `height` (meters above the ellipsoid)
     *   or `distance` (meters from the target point along the camera forward direction). Optional pitch, heading, roll (degrees).
     * @param options - Flight options (`duration`, `maxHeight`, `easing`)
     * @returns A promise resolving to `true` when the flight completes, or
     *   `false` when it is interrupted by another camera operation, such as a
     *   newer `flyTo` or a `setCamera` call.
     */
    flyTo(camPos: CameraPosition & Required<Pick<CameraPosition, "lng" | "lat">> & ({
        height: number;
    } | {
        distance: number;
    }), options?: FlyToOptions): Promise<boolean>;
    /**
     * Makes the camera look at a target position with an offset.
     * @param target - Target geodetic position (lng in degrees, lat in degrees, height in meters)
     * @param offset - Offset from the target in East-North-Up (ENU) coordinates (meters)
     */
    lookAt(target: LatLngHeight, offset: Vector3): void;
    /**
     * Enables or disables camera following mode.
     * @param enabled - Whether to enable camera following
     * @param target - Target geodetic position to follow (lng in degrees, lat in degrees, height in meters)
     * @param offset - Offset from the target in East-North-Up (ENU) coordinates (meters)
     */
    cameraFollow(enabled: boolean, target?: LatLngHeight, offset?: Vector3): void;
    /**
     * Enables position-locked free-look. The camera stays at the target
     * position while mouse drag rotates orientation in place. Use for
     * first-person-view "look around" controls.
     * @param enabled - Whether to enable free-look mode
     * @param target - Target geodetic position the camera is locked to (lng/lat degrees, height meters)
     */
    cameraFreeLook(enabled: boolean, target?: LatLngHeight): void;
    /**
     * Samples the terrain height at a given geodetic position synchronously.
     * @param pos - Geodetic position (lat in degrees, lng in degrees)
     * @returns Terrain height in meters, or undefined if terrain data not loaded
     */
    sampleTerrainHeight(pos: LatLng): number | undefined;
    /**
     * Samples terrain heights at the most detailed zoom level the terrain
     * source provides, fetching the needed tiles over the network — unlike
     * {@link sampleTerrainHeight}, which reads only tiles already resident for
     * rendering and returns coarse-LOD heights (or nothing) when the camera is
     * far away. Use this to place objects on the ground before the camera has
     * streamed the area in.
     *
     * `source` is a registered `quantized-mesh` / `raster-dem` source: the
     * {@link Source} handle returned by `addSource`, or its id. The stored
     * config (including engine defaults and partial-update merges) is what gets
     * sampled.
     *
     * @param source - A registered terrain source (handle or id)
     * @param positions - Geodetic positions (lat/lng in degrees)
     * @param options - Optional abort signal and fixed-level sampling
     * @returns One result per input position, in the same order
     */
    sampleTerrainMostDetailed(source: SourceRef, positions: LatLng[], options?: SampleTerrainOptions): Promise<SampledTerrainPosition[]>;
    /**
     * Min and max height, relative to the ellipsoid, of the ground rendered
     * over `extent`: the loaded terrain tiles, or `0` before any has loaded.
     *
     * {@link observeTerrainHeightRange} reports the range as tiles load.
     *
     * @param extent - Geographic bounds in degrees
     * @returns The range in metres, or `undefined` before the engine has a
     *   terrain quadtree
     */
    sampleTerrainHeightRange(extent: GeographicExtent): {
        min: number;
        max: number;
    } | undefined;
    /**
     * Observes {@link sampleTerrainHeightRange} over `extent`. The callback
     * fires once the range is first computed, then whenever a terrain tile
     * overlapping `extent` loads and changes it.
     *
     * @param extent - Geographic bounds in degrees, `west <= east`
     * @param cb - Callback receiving the range in metres
     * @returns Cleanup function to stop observing
     */
    observeTerrainHeightRange(extent: GeographicExtent, cb: (range: {
        min: number;
        max: number;
    }) => void): () => void;
    private _dispatchTerrainHeightRange;
    /**
     * Observes terrain height changes at a position. Callback is invoked each time terrain data updates.
     * @param pos - Geodetic position to observe (lat in degrees, lng in degrees)
     * @param cb - Callback function receiving the terrain height in meters
     * @returns Cleanup function to stop observing
     */
    observeTerrainHeightAt(pos: LatLng, cb: (height: number) => void): () => void;
    /**
     * Rotates the camera around an axis.
     * @param axis - Axis to rotate around (zero vector uses default)
     * @param angle - Rotation angle in radians
     */
    rotateAroundAxis(axis: Vector3, angle: number): void;
    /**
     * Rotates the camera around the current look-at point or center of view.
     * @param angle - Rotation angle in radians
     */
    rotateAround(angle: number): void;
    private _startMainLoop;
    private _getCanvasSize;
    private _handleResize;
    /**
     * Resolves a picked batch ID into feature information via the engine's
     * property store.
     */
    private resolvePickedFeature;
    /**
     * Handles pick events and emits the picked feature information.
     * @param pickArr - Array of picked batch IDs
     */
    private onPick;
    /**
     * Handles hover pick results and synthesizes `featureHover` / `featureEnter` /
     * `featureLeave` events by diffing against the previously hovered feature.
     * @param pickArr - Array of picked batch IDs
     */
    private onHoverPick;
    /**
     * Gets whether continuous animation mode is enabled.
     */
    get animation(): boolean;
    /**
     * Sets whether to render every frame continuously (true) or only on changes (false).
     */
    set animation(v: boolean);
    /**
     * Gets the canvas element the view renders into. Useful for styling,
     * e.g. switching the cursor from a `featureHover` event listener.
     */
    get canvas(): HTMLCanvasElement;
    /**
     * Gets the current screen size in pixels.
     */
    get screenSize(): Vector2;
    /**
     * Gets the current device pixel ratio.
     */
    get pixelRatio(): number;
    /**
     * Gets whether shadow map debug viewers are displayed.
     */
    get shadowMapViewersEnabled(): boolean;
    /**
     * Enables or disables shadow map debug viewers on screen.
     */
    set shadowMapViewersEnabled(v: boolean);
    /**
     * Picks the terrain position at screen coordinates.
     * @param x - Screen X coordinate in CSS pixels (same as MouseEvent.clientX)
     * @param y - Screen Y coordinate in CSS pixels (same as MouseEvent.clientY)
     * @returns World position Vector3 in ECEF coordinates, or null if no terrain is hit
     */
    pickTerrainPosition(x: number, y: number): Nullable<Vector3>;
    /**
     * Picks the position at screen coordinates from the depth.
     * @param x - Screen X coordinate in CSS pixels (same as MouseEvent.clientX)
     * @param y - Screen Y coordinate in CSS pixels (same as MouseEvent.clientY)
     * @returns World position Vector3 in ECEF coordinates, or null if nothing is hit
     */
    pickDepthPosition(x: number, y: number): Nullable<Vector3>;
}
export default ThreeView;

declare class ThreeViewCamera extends EventHandler<CameraEvent> {
    raw: PerspectiveCamera;
    private _core;
    private _status;
    constructor(cam?: PerspectiveCamera);
    set core(core: Core | undefined);
    /**
     * Translates the engine's per-frame `CameraStatus` list into `movestart` /
     * `move` / `moveend`.
     *
     * The engine can report several statuses for one frame (an instantaneous
     * change that also terminates an in-flight gesture, or spin + zoom + translate
     * inertia all expiring together), so the statuses are first folded into flags
     * and each public event is emitted at most once per frame.
     *
     * Instantaneous programmatic changes -- `setCamera` (`Change`), `lookAt` and
     * `rotateAroundAxis` -- complete the whole movement within a single frame, so
     * they emit both `move` and `moveend`. Without the `move`, listeners that only
     * track continuous motion would never see a programmatic jump.
     *
     * `movestart` stays driven solely by the engine's `MoveStart`: an
     * instantaneous change has no movement to open, and synthesising one here
     * would fire a second `movestart` in the middle of an active drag.
     */
    updateStatus(): void;
    get positionECEF(): XYZ;
    get positionGeographic(): LatLngHeight;
    get orientation(): CameraOrientation;
    /**
     * Effective Web Mercator zoom level the camera is viewing the surface at
     * (fractional). Computed engine-side from the camera's ellipsoid height (not
     * terrain), FOV and viewport.
     */
    get zoom(): number | undefined;
    /**
     * The vertical field of view in degrees; the horizontal extent follows
     * from the viewport aspect ratio.
     * Reading returns `undefined` until the engine camera exists.
     */
    get fov(): number | undefined;
    set fov(val: number);
    set near(val: number);
    get near(): number;
    set far(val: number);
    get far(): number;
    set options(options: CameraOptions);
}

/**
 * Effect/emissive write replacement, via the `GBUFFER_WRITE_EFFECT*` macros
 * from the pars chunk (each buffer's write is compiled out when the view
 * disables it). Only the texturized-layer pixels write effect/emissive;
 * raster pixels stay 0 so they don't perturb downstream effect-mask passes.
 */
export declare const TILE_EMISSIVE_EFFECT_BUFFER_REPLACEMENT = "\nif (isTexturizedLayer) {\n  GBUFFER_WRITE_EFFECT(tileEffectIdsMask, diffuseColor.rgb * tileEmissiveIntensity + tileEmissiveColor)\n} else {\n  GBUFFER_WRITE_EFFECT_ZERO\n}\n";

/**
 * `normalBuffer = …` replacement for the MRT pass. Identical to legacy
 * behaviour: applyWaterNormals mixes the perturbed normal into the geometric
 * one before packing.
 */
export declare const TILE_NORMAL_BUFFER_REPLACEMENT = "\nvec3 finalNormal = mix(origNormal, normalize(origNormal * 0.7 + normal), applyWaterNormals);\nGBUFFER_WRITE_NORMAL(finalNormal, tileReflectivity, tileRoughness)\n";

/**
 * Final-stage pick override. Injected immediately AFTER
 * `#include <dithering_fragment>` (the last chunk in MeshLambert/Basic main()),
 * so the assignment to `gl_FragColor` is the last write of the fragment shader
 * — bypassing envmap, tonemapping, colorspace, and fog, all of which would
 * otherwise corrupt the encoded batchId.
 *
 * Draped vector meshes stay in their TileScene during the pick pass (see
 * PickHelper's TileScene guard) and render their own pick IDs into the
 * per-layer RT in pick mode. The composite atlas then carries those IDs
 * forward; here we write them straight through, masked by attr.g so raster
 * pixels contribute batchId=0 (no entity) instead of polluting the pick
 * buffer. `nvr_pickColor` is set up by `generateTileMapFragment`.
 */
export declare const TILE_PICK_FRAGMENT_OVERRIDE = "\nif (uPickable > 0.) {\n  gl_FragColor = vec4(nvr_pickColor, 1.0);\n}\n";

/** Vertex-shader injection: passes UV and world-space position through. */
export declare const TILE_VERTEX_INJECTIONS: {
    afterCommon: string;
    afterUvVertex: string;
    afterEnvmapVertex: string;
};

declare type TileHandle = bigint;

declare type TileHandler = {
    getMartini: (bits: ReconstructableEntity) => TransferableMartini | undefined;
    getTile: (handle: bigint) => TransferableTile | undefined;
    getTileElevationDecoder: (handle: bigint) => ElevationDecoder | undefined;
    /** Buffer handle of a tile's loaded raw DEM bytes, the data a raster-DEM
     * upsample of a descendant resamples from. */
    getTerrainDemBytes: (handle: bigint) => number | undefined;
    getVectorTileStates: (handle: bigint) => VectorTileState[] | undefined;
    vectorRevision: () => number;
    /** The WM raster tiles to bake into per-layer drape render targets for a
     * terrain tile (Geographic terrain only; empty on WebMercator terrain). */
    getRasterTileStates: (handle: bigint) => RasterTileState[] | undefined;
    rasterRevision: () => number;
    /** Reports a terrain tile's drape render-target GPU footprint (bytes) so the
     * memory ledger tracks clamp-to-ground vector bakes that scale with terrain
     * subdivision past the vector `maxZoom`. Pass 0 to release on dispose. */
    reportDrapeGpuBytes: (handle: bigint, bytes: number) => void;
    calcMetersPerTexel: (tileHandle: bigint, textureZoom: number, textureWidth: number) => number;
    /** Rust's clamped WebMercator northing (`navara_geometry::mercator_y`).
     * The composite paste derives its per-slot reprojection constants through
     * this so paste and bake (`uv_rect_from_extents_mercator`) share one
     * implementation — a drifting reimplementation misaligns the pasted
     * latitude band (and NaNs on the unclamped polar band). */
    mercatorY: (lat: number) => number;
};

export declare type TileMapByHandle = Map<TileHandle, TileMesh>;

export declare type TileMaterial = MeshBasicMaterial | MeshLambertMaterial;

export declare class TileMesh extends Mesh_2<BufferGeometry, TileMaterial, CustomObject3DEventMap> implements PickableMesh {
    handle: TileHandle;
    tileHandler: TileHandler;
    maxTextures: number;
    texturizedSceneIndexFrom: number;
    numTexturizedVector: number;
    private readonly vectorDrape;
    private readonly rasterDrape;
    private shadowMesh?;
    private boundingBoxHelper?;
    private compositor;
    private readonly drapeRtSize;
    private readonly atlasBytes;
    /** Current `Mesh::fill_quadrants` mask (see `setFillQuadrants`). */
    private fillQuadrants;
    private reportedDrapeGpuBytes;
    readonly ctx: EventContext;
    constructor(ctx: EventContext, mesh: MeshAdded);
    /**
     * Report the tile's drape GPU footprint (composite atlas + vector and baked-raster
     * drape render targets) to the memory ledger when it changed. The atlas is acquired
     * in the constructor and held for the tile's lifetime regardless of draping, so it
     * is always part of the report — otherwise a tile whose last draped layer vanished
     * would report 0 and wipe the atlas cost Rust seeds at mesh-attach time. The render
     * targets on top of it scale with terrain subdivision past the layers' maxZoom — a
     * cost per-source-tile accounting cannot see.
     */
    private reportDrapeGpuBytesIfChanged;
    private _onBeforeRender;
    /**
     * Feature flags for the **main** TileMesh shader (atlas-sampling side): drives
     * its program cache key and which normal/specular branches compile. Sourced
     * from the material defines/userData, independent of the composite pass's own
     * (layer-derived) feature set — see {@link deriveCompositeFeatures}.
     */
    private computeFeatures;
    /**
     * Snapshot the current per-slot uniform state into a typed layer list for the
     * compositor's MRT pass. Reads directly from material.userData (the same
     * source of truth the main shader uses); only slots that are both shown and
     * textured become layers, so the SlotPlanner's compact counts cover exactly
     * the active slots.
     */
    private buildCompositeLayers;
    _init(mesh: MeshAdded): Promise<void>;
    private createMesh;
    private setWatermask;
    /**
     * Rebuild the geometry from new buffer handles under this same TileMesh.
     * Rust replaces an upsampled terrain mesh with its real-DEM mesh in place
     * (same entity, same tile handle) and reports it as `mesh_geometry_replaced`
     * rather than `mesh_updated`, so material, textures, atlas and drape state
     * are left alone; only geometry, shadow mesh, bounds and watermask change.
     * Touching the material path here would blank the tile until its drape is
     * baked again.
     */
    replaceGeometry(mesh: Mesh): void;
    private installGeometry;
    private attachShadowMesh;
    createSkirtMesh(mesh: Mesh, terrainGeometry: BufferGeometry, position: Float32Array, uv: Float32Array | null, indices: Uint32Array, normals: Float32Array | null): BufferGeometry< NormalBufferAttributes, BufferGeometryEventMap>;
    private shouldUseNormal;
    private initMaterial;
    /**
     * Restrict drawing to the given child quadrants (`Mesh::fill_quadrants`
     * bitmask, `0` = whole tile): a shown parent fills only the quadrants of
     * children that are not prepared yet, without overlapping the children on
     * screen. Kept on the instance so a material rebuild carries it over.
     */
    private setFillQuadrants;
    _update(mesh: MeshChanged): void;
    /**
     * Ensures the material type matches the hillshade requirements.
     * Switches between MeshBasicMaterial and MeshLambertMaterial as needed.
     * - MeshLambertMaterial: Required for hillshade (supports normal-based lighting)
     * - MeshBasicMaterial: Used when no hillshade (more performant)
     */
    private ensureCorrectMaterialType;
    private setUniforms;
    private setupTextureFragments;
    setupTextures(loadedTexes: Map<string, Texture>, textureOptions: TextureOptions, maxTextures: number, mat: Partial<RasterTileInternalMaterial> | RasterTileInternalMaterial, preserveLayerUv?: boolean): void;
    /**
     * Rebind textures for this TileMesh by calling setupTextures
     * This ensures texture updates go through the standard texture management system
     * Used by hillshade backfill and other dynamic texture updates.
     * Preserves existing per-layer UV transforms to avoid overwriting parent-reuse values.
     */
    rebindTextures(loadedTexs: Map<string, Texture>, textureOptions: TextureOptions): void;
    onBeforePicking(): void;
    onAfterPicking(): void;
    getRenderable(): Object3D;
    private _disposed;
    dispose(tileMapByHandle?: TileMapByHandle, textureFragmentIndex?: Map<string, Set<TextureSlot>>, tileMeshToFragmentIds?: Map<TileMesh, Set<string>>): void;
}

/** A `3d-tiles` layer renders a `3d-tiles`, `b3dm`, or `pnts` source. */
export declare type Tiles3dLayer = SourceLayerBase<Tiles3dLayerBase>;

declare type Tiles3dLayerBase = WithColorSupport<Layer_2<Tiles3dLayerDescription & {
    type: "3d-tiles";
}>>;

/**
 * A `3d-tiles` layer renders a `3d-tiles` tileset (and the single-content
 * `b3dm` / `pnts` sources) with the given model appearance.
 */
declare class Tiles3dLayerDescription {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    get model(): ModelMaterial_2 | undefined;
    set model(value: ModelMaterial_2 | null | undefined);
    get source(): string | undefined;
    set source(value: string | null | undefined);
    get type(): string | undefined;
    set type(value: string | null | undefined);
}

/** A `3d-tiles` source: a 3D Tiles tileset (`tileset.json`). */
export declare type Tiles3dSource = SourceBase & WithColorSupport<Layer_2<Tiles3dSourceDescription & {
    type: "3d-tiles";
}>>;

declare class Tiles3dSourceDescription {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    get crs(): string | undefined;
    set crs(value: string | null | undefined);
    get type(): string | undefined;
    set type(value: string | null | undefined);
    get url(): string | undefined;
    set url(value: string | null | undefined);
}

declare class TileScene extends Scene {
    layerId: string;
    layerIndex: number;
    removed: boolean;
    revision: number;
    constructor(layerId: string, layerIndex: number);
}

/**
 * Slim TileMesh fragment-shader fragments.
 *
 * The TileMesh main pass used to unroll an N-slot texture loop per fragment
 * (`generateMixOverlaidTexturesMacro`). That cost N TMU fetches × screen
 * pixels every frame, plus another N iterations for `generateHillshadeNormal`.
 *
 * After the refactor, TileTextureCompositor bakes all N source textures into
 * a per-tile MRT atlas (color + attr + normal) only when something is dirty.
 * The main pass then does **at most three** texture lookups per fragment and
 * uses the attr atlas's encoded winning-slot index to dynamically index the
 * per-slot uniform arrays for shininess/specular/emissive/effect/etc.
 *
 * Each function returns a snippet that's spliced into a chunk via the
 * existing `createReplacer` machinery in mesh/tile.ts.
 */
export declare type TileShaderFeatures = {
    /** Atlas has a hillshade normal that should override the default normal. */
    hasHillshade: boolean;
    /** Some layer uses Water material → emit the water specular branch. */
    hasWater: boolean;
    /**
     * Quantized-mesh watermask is present (source requested `requestWaterMask`).
     * Emits the ocean reflectivity fallback in the map fragment.
     */
    hasWatermask: boolean;
};

/**
 * Pure cache layer for per-tile composite atlases.
 *
 * Why: TileMesh previously owned its own WebGLRenderTargets and had no way to
 * coalesce updates from independent sources (vector revision, hillshade
 * backfill, material change). Lifting these responsibilities here lets the
 * compositor render N source textures into one atlas only when something
 * actually changes, and makes the bookkeeping testable without three.js.
 */
declare class TileTextureCache {
    private readonly entries;
    private readonly opts;
    private readonly pool;
    private readonly maxPooled;
    constructor(opts: TileTextureCacheOptions);
    /**
     * Acquire (or create) the atlas for a handle. Refcounted: a TileMesh
     * acquires once on construction and releases once on dispose.
     * Newly-created entries start dirty in every category so the first composite
     * pass paints them — which also repaints any stale content in a pooled
     * atlas, so reuse needs no explicit clear.
     */
    acquire(handle: TileHandle): CompositeOutputs;
    /**
     * Decrement refcount. When the last holder releases, the entry is forgotten
     * and its atlas is pooled for reuse (or disposed once the pool is full).
     */
    release(handle: TileHandle): void;
    /** Mark an entry dirty for a given reason. No-op if handle isn't tracked. */
    markDirty(handle: TileHandle, reason: DirtyReason): void;
    /**
     * Return the set of dirty reasons (and clear them) for a handle. Returns
     * null when the handle isn't tracked or has nothing dirty — compositor uses
     * that to skip the offscreen pass.
     */
    consumeDirty(handle: TileHandle): Set<DirtyReason> | null;
    /** Peek without clearing — used by the compositor's scheduling pass. */
    isDirty(handle: TileHandle): boolean;
    /** Atlas accessor for the compositor's internal render path. */
    getEntry(handle: TileHandle): CacheEntry | undefined;
    /**
     * Return the outputs for a handle that was already acquired. Unlike
     * acquire(), does NOT touch the refcount — use this from places that just
     * need to bind the atlas textures (e.g. TileMesh.initMaterial after the
     * constructor already acquired the entry).
     */
    getOutputs(handle: TileHandle): CompositeOutputs | undefined;
    /** Iterate all live entries. Used by compositor.update(). */
    entriesIter(): IterableIterator<CacheEntry>;
    /** Number of tracked entries (testing/debug). */
    get size(): number;
    /** Number of pooled (unowned) spare atlases — for stats/debugging. */
    get pooledCount(): number;
    /** Dispose all atlases (live and pooled) and clear. Called on view shutdown. */
    disposeAll(): void;
}

declare type TileTextureCacheOptions = {
    /** Side length (in pixels) of the composite render targets. */
    size: number;
    /** Builds the MRT trio. Injected so unit tests pass fakes. */
    atlasFactory: AtlasFactory;
    /** Max spare atlases kept for reuse instead of disposed. 0 disables pooling. */
    maxPooled?: number;
};

/**
 * Integration layer for per-tile texture composition.
 *
 * Responsibilities:
 * - Owns the per-tile composite atlas via TileTextureCache.
 * - Runs the per-layer vector-scene offscreen render (ported wholesale from
 *   the previous TileMesh._onBeforeRender so behaviour is unchanged).
 * - Runs the MRT composite pass that bakes N source textures (raster + vector
 *   + hillshade) into the atlas (color + attr + normal). The TileMesh main
 *   shader then samples each atlas attachment once instead of looping over N
 *   slots per fragment.
 * - Tracks dirty handles so the composite pass only runs when something
 *   actually changes (tile add, layer update, hillshade backfill, vector
 *   revision bump, …).
 */
declare class TileTextureCompositor {
    readonly renderer: WebGLRenderer;
    readonly cache: TileTextureCache;
    /** Atlas / drape RT side length in texels (device-dependent). TileMesh reads
     * this to size its lazily-allocated drape render targets and to compute the
     * per-tile GPU byte cost it reports to the memory ledger. */
    readonly size: number;
    private readonly texturizedScenes;
    private readonly mercatorY;
    private readonly bakeCamera;
    private readonly quadScene;
    private readonly quadCamera;
    private readonly quadMesh;
    private readonly materialCache;
    private readonly touchedTargets;
    private readonly rasterBakeScene;
    private readonly rasterBakeMaterial;
    private msaaBakeTarget;
    private readonly msaaResolveMaterial;
    private demNoDataTexture;
    private demNoDataTextureKey;
    constructor(opts: TileTextureCompositorOptions);
    acquire(handle: TileHandle): CompositeOutputs;
    release(handle: TileHandle): void;
    /** Refcount-neutral accessor for an already-acquired handle's atlas. */
    acquireOutputs(handle: TileHandle): CompositeOutputs;
    markDirty(handle: TileHandle, reason: DirtyReason): void;
    /**
     * Bake each resolved vector layer's WM source scenes into its per-layer render
     * target (slot `i` → `renderTargets[i]`). A layer can be backed by several WM
     * vector tiles when the terrain is Geographic (N:M); every source is drawn into
     * the one render target, each framed by the Rust-supplied mercator affine
     * `uvOffset`/`uvScale` so it lands in its sub-rect. Since the affine maps the
     * terrain tile's `[0, 1]` UV into the source frame, the render-target UV ends up
     * equal to the terrain UV — i.e. the RT spans the terrain tile's extent, ready
     * for the composite paste's latitude reprojection. `(0,0)/(1,1)` (an exact
     * same-tile drape, WebMercator terrain) maps a single source to the full RT.
     *
     * The mosaic target is cleared once, then each source is drawn additively
     * (autoClear off) so the sources mosaic instead of overwriting one another. A
     * source whose scene hasn't reached the cache yet is skipped; its sub-rect stays
     * transparent until it arrives (no flashing — coarser ancestors back the gaps
     * via the Rust scene-ready walk-up). The caller owns the dirty gate and only
     * calls this when the resolved slots or scenes change.
     *
     * With `antialias` (the default), the scenes render through the shared MSAA
     * bake target and the resolved image is copied into the slot's render target
     * (see `msaaBakeTarget` / `msaaResolveMaterial`). Pick bakes MUST pass
     * `antialias: false`: their fragments encode batch ids as colors, and the
     * MSAA resolve averages them along feature edges into ids that don't exist —
     * they render straight into the slot target instead, keeping hard edges.
     */
    renderVectorScenes(slots: {
        layerId: string;
        sources: {
            tileHandle: TileHandle;
            uvOffset: [number, number];
            uvScale: [number, number];
        }[];
    }[], renderTargets: WebGLRenderTarget[], { antialias }?: {
        antialias?: boolean;
    }): void;
    /** The shared multisampled vector-bake target, allocated on first use. No
     * depth/stencil: every bake material draws with depth test/write off. */
    private acquireMsaaBakeTarget;
    /** GPU bytes of the shared MSAA bake target (multisample renderbuffer +
     * resolve texture), for the fixed-footprint report — a single allocation
     * the per-tile drape accounting cannot see. Zero until first use. */
    fixedGpuBytes(): number;
    /**
     * Bake each raster layer's overlapping WM tile textures into ONE render
     * target (slot `i` → `renderTargets[i]`), mirroring {@link renderVectorScenes}:
     * every source is a textured quad framed by the Rust-supplied mercator affine
     * `uvOffset`/`uvScale`, so the render target ends up spanning the terrain
     * tile's (Mercator-projected) extent and the composite treats the whole layer
     * as one slot with the terrain-band reprojection — instead of one composite
     * slot per overlapping tile, which overflowed the GPU slot budget on
     * Geographic terrain once 3+ layers were draped.
     *
     * Sources are drawn coarse-first (ascending `uvScale`): an ancestor fallback
     * covers the whole terrain rect, so painting it first lets the finer tiles
     * overwrite it instead of being buried under coarse texels. The bake is a
     * value-preserving copy (`toneMapped: false`; per-kind color spaces below), so
     * heatmap DEM texels survive it bit-faithfully:
     * - color imagery: source + target declared sRGB — decode at fetch, encode at
     *   write, decode again at the composite fetch: the same linear values the
     *   direct (non-baked) path produced.
     * - elevation heatmap: everything `NoColorSpace` + nearest — raw texels, no
     *   interpolation, so the composite's decode-then-interpolate keeps working.
     */
    renderRasterTiles(slots: (RasterBakeSlot | undefined)[], renderTargets: (WebGLRenderTarget | undefined)[]): void;
    /**
     * Shared bake loop over per-layer drape render targets (slot `i` →
     * `renderTargets[i]`): saves/restores the renderer state and owns every
     * target/clear decision. `prepareSlot` returns the slot's draw closure, or
     * null when it has nothing to draw. autoClear stays off so a closure's
     * multiple draws mosaic into one cleared target instead of wiping it.
     *
     * Without `via`, the closure draws straight into the slot target (cleared
     * first). With `via` (the shared MSAA intermediate — a lazy getter so it is
     * only ever GL-allocated when something actually draws), the closure draws
     * into the cleared intermediate and the resolved image is copied into the
     * slot target by the full-frame resolve quad, which overwrites every texel
     * (NoBlending), so the slot target itself needs no clear. A slot with
     * nothing to draw is cleared either way — wiping a stale previous bake —
     * except when its target was never touched: render-targeting it then would
     * allocate its GL storage for nothing.
     */
    private bakeSlotTargets;
    /** Copy a resolved MSAA image into the current render target, dividing
     * coverage back out (see `msaaResolveMaterial`). */
    private drawMsaaResolveQuad;
    /**
     * Frame the shared bake camera on the terrain tile's sub-rect of a source
     * from the mercator affine: meshUv ∈ [0,1] → sourceUv = uvOffset +
     * meshUv·uvScale, source NDC = 2·sourceUv − 1. A source finer than the
     * terrain tile yields a camera wider than [-1, 1], so it draws into only
     * its sub-rect and leaves the rest of the render target transparent.
     */
    private frameBakeCamera;
    /** Draw one textured quad into the current render target through the bake
     * camera window — the value-preserving copy described on
     * {@link renderRasterTiles}. */
    private drawRasterBakeQuad;
    /** The cached 1×1 no-data texture, (re)created when the color changes. */
    private demNoDataUnderlay;
    /** Value-preserving sampler settings for a bake source texture (see
     * {@link renderRasterTiles}); idempotent so re-bakes don't re-upload. */
    private configureRasterBakeSource;
    /**
     * Run the composite MRT pass for a handle if (and only if) its atlas is
     * dirty. Consumes the dirty flags on success so the next frame skips work
     * unless something marks it dirty again.
     *
     * The pass writes:
     *   color  attachment  = alpha-composited diffuse over N slots
     *   attr   attachment  = water + texturized-layer flags + winning slot idx
     *   normal attachment  = hillshade normal (or neutral)
     *
     * Returns true when a render happened.
     */
    runCompositePassIfDirty(handle: TileHandle, plan: SlotPlan, globals: CompositeGlobals, features: CompositeFeatures): boolean;
    private getOrCreateMaterial;
    private bindUniforms;
    dispose(): void;
}

declare type TileTextureCompositorOptions = {
    renderer: WebGLRenderer;
    texturizedSceneByTileCoordinates: TexturizedSceneByTileCoordinates;
    /** Rust's clamped WebMercator northing (`TileHandler.mercatorY`), handed to
     * the core uniform mutates so the paste-side reprojection constants come
     * from the same implementation as the Rust bake affine. */
    mercatorY: (lat: number) => number;
    /** Atlas RT side length (defaults to 512). */
    size?: number;
    /** Test seam: replace MRT RT creation. */
    atlasFactory?: AtlasFactory;
};

declare class TileXYZ {
    free(): void;
    [Symbol.dispose](): void;
    constructor(x: number, y: number, z: number);
    x: number;
    y: number;
    z: number;
}

/** Pick search radius for touch: fingertips land less precisely than a cursor. */
export declare const TOUCH_PICK_RADIUS = 10;

declare type TransactionCallbackParams<AddKey extends JsEventsKey, RemoveKey extends JsEventsKey, ChangeKey extends JsEventsKey> = {
    type: "add";
    event: GetJsEventValue<AddKey>;
} | {
    type: "remove";
    event: GetJsEventValue<RemoveKey>;
} | {
    type: "change";
    event: GetJsEventValue<ChangeKey>;
};

declare type TransactionProcessOption<AddKey extends JsEventsKey, RemoveKey extends JsEventsKey, ChangeKey extends JsEventsKey> = {
    add: {
        key: AddKey;
        max?: number;
        /** Dispatch order for the pending stack. Events a `shouldProcess` gate
         * leaves behind are re-sorted against newer ones every pass, so this turns
         * the FIFO stack into a priority queue (stable: equal keys stay FIFO). */
        order?: (a: GetJsEventValue<AddKey>, b: GetJsEventValue<AddKey>) => number;
    };
    remove: {
        key: RemoveKey;
        max?: number;
    };
    change?: {
        key: ChangeKey;
        max?: number;
    };
};

declare class TransferableFloatAttribute {
    free(): void;
    [Symbol.dispose](): void;
    constructor(data: number, size: number);
    data: number;
    size: number;
}

declare class TransferableGeometry {
    free(): void;
    [Symbol.dispose](): void;
    constructor(vertices: number, uvs: number, indices: number);
    indices: number;
    get normals(): number | undefined;
    set normals(value: number | null | undefined);
    get skirt_indices(): number | undefined;
    set skirt_indices(value: number | null | undefined);
    get skirt_normals(): number | undefined;
    set skirt_normals(value: number | null | undefined);
    get skirt_uvs(): number | undefined;
    set skirt_uvs(value: number | null | undefined);
    get skirt_vertices(): number | undefined;
    set skirt_vertices(value: number | null | undefined);
    uvs: number;
    vertices: number;
}

declare class TransferableMartini {
    free(): void;
    [Symbol.dispose](): void;
    static fromSize(size: number): TransferableMartini;
    constructor(size: number, coords: Uint32Array);
    transfer_coords(): Uint32Array;
    size: number;
}

declare class TransferableModelGeometry {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    get batch_ids(): TransferableFloatAttribute | undefined;
    set batch_ids(value: TransferableFloatAttribute | null | undefined);
}

declare class TransferablePointGeometry {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    batch_ids: TransferableFloatAttribute;
    batch_index: TransferableUintAttribute;
    get position_3d_high(): TransferableFloatAttribute | undefined;
    set position_3d_high(value: TransferableFloatAttribute | null | undefined);
    get position_3d_low(): TransferableFloatAttribute | undefined;
    set position_3d_low(value: TransferableFloatAttribute | null | undefined);
    get position(): TransferableFloatAttribute | undefined;
    set position(value: TransferableFloatAttribute | null | undefined);
}

declare class TransferablePolygonGeometry {
    free(): void;
    [Symbol.dispose](): void;
    constructor(position: TransferableFloatAttribute | null | undefined, position_3d_high: TransferableFloatAttribute | null | undefined, position_3d_low: TransferableFloatAttribute | null | undefined, normal: TransferableFloatAttribute | null | undefined, scale_normal_and_cap: TransferableFloatAttribute | null | undefined, batch_ids: TransferableFloatAttribute | null | undefined, batch_index: TransferableUintAttribute | null | undefined, indices: number);
    get batch_ids(): TransferableFloatAttribute | undefined;
    set batch_ids(value: TransferableFloatAttribute | null | undefined);
    get batch_index(): TransferableUintAttribute | undefined;
    set batch_index(value: TransferableUintAttribute | null | undefined);
    indices: number;
    get normal(): TransferableFloatAttribute | undefined;
    set normal(value: TransferableFloatAttribute | null | undefined);
    get position_3d_high(): TransferableFloatAttribute | undefined;
    set position_3d_high(value: TransferableFloatAttribute | null | undefined);
    get position_3d_low(): TransferableFloatAttribute | undefined;
    set position_3d_low(value: TransferableFloatAttribute | null | undefined);
    get position(): TransferableFloatAttribute | undefined;
    set position(value: TransferableFloatAttribute | null | undefined);
    get scale_normal_and_cap(): TransferableFloatAttribute | undefined;
    set scale_normal_and_cap(value: TransferableFloatAttribute | null | undefined);
}

declare class TransferablePolygonOutlineGeometry {
    free(): void;
    [Symbol.dispose](): void;
    constructor(position?: TransferableFloatAttribute | null, position_3d_high?: TransferableFloatAttribute | null, position_3d_low?: TransferableFloatAttribute | null, scale_normal_and_cap?: TransferableFloatAttribute | null, skip_indices?: number | null, batch_index?: TransferableFloatAttribute | null);
    get batch_index(): TransferableFloatAttribute | undefined;
    set batch_index(value: TransferableFloatAttribute | null | undefined);
    get position_3d_high(): TransferableFloatAttribute | undefined;
    set position_3d_high(value: TransferableFloatAttribute | null | undefined);
    get position_3d_low(): TransferableFloatAttribute | undefined;
    set position_3d_low(value: TransferableFloatAttribute | null | undefined);
    get position(): TransferableFloatAttribute | undefined;
    set position(value: TransferableFloatAttribute | null | undefined);
    get scale_normal_and_cap(): TransferableFloatAttribute | undefined;
    set scale_normal_and_cap(value: TransferableFloatAttribute | null | undefined);
    get skip_indices(): number | undefined;
    set skip_indices(value: number | null | undefined);
}

declare class TransferablePolylineGeometry {
    free(): void;
    [Symbol.dispose](): void;
    constructor(position: TransferableFloatAttribute, position_high: TransferableFloatAttribute | null | undefined, position_low: TransferableFloatAttribute | null | undefined, start: TransferableFloatAttribute | null | undefined, start_high: TransferableFloatAttribute | null | undefined, start_low: TransferableFloatAttribute | null | undefined, forward_offset: TransferableFloatAttribute | null | undefined, end_high: TransferableFloatAttribute | null | undefined, end_low: TransferableFloatAttribute | null | undefined, start_normals: TransferableFloatAttribute | null | undefined, end_normal_and_texture_coordinate_normalization_x: TransferableFloatAttribute | null | undefined, right_normal_and_texture_coordinate_normalization_y: TransferableFloatAttribute, batch_ids: TransferableFloatAttribute | null | undefined, batch_index: TransferableUintAttribute | null | undefined, indices: number);
    get batch_ids(): TransferableFloatAttribute | undefined;
    set batch_ids(value: TransferableFloatAttribute | null | undefined);
    get batch_index(): TransferableUintAttribute | undefined;
    set batch_index(value: TransferableUintAttribute | null | undefined);
    get end_high(): TransferableFloatAttribute | undefined;
    set end_high(value: TransferableFloatAttribute | null | undefined);
    get end_low(): TransferableFloatAttribute | undefined;
    set end_low(value: TransferableFloatAttribute | null | undefined);
    get end_normal_and_texture_coordinate_normalization_x(): TransferableFloatAttribute | undefined;
    set end_normal_and_texture_coordinate_normalization_x(value: TransferableFloatAttribute | null | undefined);
    get forward_offset(): TransferableFloatAttribute | undefined;
    set forward_offset(value: TransferableFloatAttribute | null | undefined);
    indices: number;
    get position_high(): TransferableFloatAttribute | undefined;
    set position_high(value: TransferableFloatAttribute | null | undefined);
    get position_low(): TransferableFloatAttribute | undefined;
    set position_low(value: TransferableFloatAttribute | null | undefined);
    position: TransferableFloatAttribute;
    right_normal_and_texture_coordinate_normalization_y: TransferableFloatAttribute;
    get start_high(): TransferableFloatAttribute | undefined;
    set start_high(value: TransferableFloatAttribute | null | undefined);
    get start_low(): TransferableFloatAttribute | undefined;
    set start_low(value: TransferableFloatAttribute | null | undefined);
    get start_normals(): TransferableFloatAttribute | undefined;
    set start_normals(value: TransferableFloatAttribute | null | undefined);
    get start(): TransferableFloatAttribute | undefined;
    set start(value: TransferableFloatAttribute | null | undefined);
}

declare class TransferableTile {
    free(): void;
    [Symbol.dispose](): void;
    constructor(coords: TileXYZ, max_height: number, min_height: number, cached_mesh_handle?: CachedMeshHandle | null);
    get cached_mesh_handle(): CachedMeshHandle | undefined;
    set cached_mesh_handle(value: CachedMeshHandle | null | undefined);
    coords: TileXYZ;
    max_height: number;
    min_height: number;
}

declare class TransferableUintAttribute {
    free(): void;
    [Symbol.dispose](): void;
    constructor(data: number, size: number);
    data: number;
    size: number;
}

export declare type Transform = Required<NormalizeWASMClass<Transform_3>>;

declare class Transform_2 {
    free(): void;
    [Symbol.dispose](): void;
    constructor(tx: number, ty: number, tz: number, qx: number, qy: number, qz: number, qw: number, sx: number, sy: number, sz: number);
    qw: number;
    qx: number;
    qy: number;
    qz: number;
    sx: number;
    sy: number;
    sz: number;
    tx: number;
    ty: number;
    tz: number;
}

declare class Transform_3 {
    free(): void;
    [Symbol.dispose](): void;
    constructor(tx: number, ty: number, tz: number, qx: number, qy: number, qz: number, qw: number, sx: number, sy: number, sz: number);
    qw: number;
    qx: number;
    qy: number;
    qz: number;
    sx: number;
    sy: number;
    sz: number;
    tx: number;
    ty: number;
    tz: number;
}

export declare type TransparentPassConfig = Description_4 & EffectConfig;

export declare class TransparentPassEffectDesc extends EffectDesc<TransparentPassConfig, TransparentPassUpdate, RenderPass> {
    static key: string;
    static insertBefore: string[];
    light: Group< Object3DEventMap>;
    lightsSyncMap: Map<any, any>;
    createPass(): RenderPass;
    update(_time: number): void;
}

export declare type TransparentPassUpdate = Description_4 & EffectUpdate;

export { UnicodeRange }

declare type UniformValue<T> = {
    value: T;
};

/**
 * Derives the buffer configuration for a set of effect requirements
 * (`EffectDesc.requiredBuffers` of every active effect).
 */
export declare function unionGBufferRequirements(requirements: Iterable<readonly GBufferName[]>): ResolvedGBufferOptions;

export declare class UnknownTypeError extends Error {
    constructor(type: Exclude<(EffectConfig | MeshConfig | LightConfig)["type"], undefined>, config: EffectConfig | MeshConfig | LightConfig);
}

/**
 * Unpack show and opacity from a packed value (see {@link packShowOpacity}).
 */
export declare function unpackShowOpacity(packed: number): {
    show: number;
    opacity: number;
};

/**
 * Write one attribute of one batch into the material's batch data texture.
 * Returns whether the write actually landed — callers must not stamp any
 * batch define or enhancer flag for a rejected write (wrong value type,
 * unsupported attribute, or no texture yet).
 *
 * `defaults` carries the material-level values of uniform-backed attributes;
 * it is only read when this write is the one that allocates the slot (see
 * {@link BatchAttributeDefaults}).
 */
export declare function updateBatchAttribute(material: Material, batchId: number, attribute: BatchedAttributeName, value: number | number[] | boolean, defaults?: Partial<BatchAttributeDefaults>): boolean;

/**
 * Type for the updateRteUniforms mutation function
 */
export declare type UpdateRteUniformsFn = (modelViewMatrixRTE: Matrix4, cameraPositionHigh: Vector3, cameraPositionLow: Vector3) => void;

declare class UpsampleTerrainMeshParameters {
    free(): void;
    [Symbol.dispose](): void;
    constructor(tile_handle: bigint, source_tile_handle: bigint, tile_size: number, skirt: boolean, skirt_exaggeration: number);
    geographic: boolean;
    isQuantizedMesh: boolean;
    poleNorth: boolean;
    poleSouth: boolean;
    /**
     * Multiplier for the automatically calculated skirt height.
     */
    skirtExaggeration: number;
    /**
     * Whether to render skirts along tile boundaries.
     */
    skirt: boolean;
    /**
     * The ancestor tile whose mesh is clipped down to `tile_handle`.
     */
    source_tile_handle: bigint;
    tile_handle: bigint;
    /**
     * DEM tile width in pixels (raster DEM only).
     */
    tile_size: number;
    tms: boolean;
}

declare class UpsampleTerrainMeshResult {
    free(): void;
    [Symbol.dispose](): void;
    constructor(geometry: TransferableGeometry, heights: number, min_height: number, max_height: number, rtc_translation?: Vec3_2 | null);
    geometry: TransferableGeometry;
    heights: number;
    max_height: number;
    min_height: number;
    get rtc_translation(): Vec3_2 | undefined;
    set rtc_translation(value: Vec3_2 | null | undefined);
    get watermask(): number | undefined;
    set watermask(value: number | null | undefined);
}

/** Enables the emissive output. Mirrored in the GLSL chunk. */
export declare const USE_GBUFFER_EMISSIVE_DEFINE = "USE_GBUFFER_EMISSIVE";

/** Enables the effectIds output. Mirrored in the GLSL chunk. */
export declare const USE_GBUFFER_SELECTIVE_EFFECT_DEFINE = "USE_GBUFFER_SELECTIVE_EFFECT";

/** Enables the shadow output. Mirrored in the GLSL chunk. */
export declare const USE_GBUFFER_SHADOW_DEFINE = "USE_GBUFFER_SHADOW";

/**
 * Array of valid geometry type values for runtime validation.
 */
export declare const VALID_GEOMETRY_TYPES: ("billboard" | "text" | "point" | "polyline" | "polygon" | "model")[];

export declare type Vec2 = Required<NormalizeWASMClass<Vec2_3>>;

declare class Vec2_2 {
    free(): void;
    [Symbol.dispose](): void;
    constructor(x: number, y: number);
    x: number;
    y: number;
}

declare class Vec2_3 {
    free(): void;
    [Symbol.dispose](): void;
    constructor(x: number, y: number);
    x: number;
    y: number;
}

export declare type Vec3 = Required<NormalizeWASMClass<Vec3_3>>;

declare class Vec3_2 {
    free(): void;
    [Symbol.dispose](): void;
    constructor(x: number, y: number, z: number);
    x: number;
    y: number;
    z: number;
}

declare class Vec3_3 {
    free(): void;
    [Symbol.dispose](): void;
    constructor(x: number, y: number, z: number);
    x: number;
    y: number;
    z: number;
}

/**
 * Converts a Cartesian Vector3 in ECEF coordinates to geodetic coordinates.
 * @param xyz - Cartesian Vector3 in Earth-Centered Earth-Fixed (ECEF) coordinates
 * @returns Geodetic coordinates (lng in degrees, lat in degrees, height in meters)
 */
export declare function vector3ToGeodetic(xyz: Vector3): LatLngHeight;

/**
 * A `vector` layer renders a `geojson` or `vector-tile` source as points,
 * lines, polygons, text and billboards.
 */
export declare type VectorLayer = SourceLayerBase<VectorLayerBase>;

declare type VectorLayerBase = WithColorSupport<ConvertStringUnionFields<Layer_2<VectorLayerDescription & {
    type: "vector";
}>>>;

/**
 * A `vector` layer references a `geojson` or `vector-tile` source and renders
 * its features with the given per-geometry materials.
 */
declare class VectorLayerDescription {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    get billboard(): BillboardMaterial | undefined;
    set billboard(value: BillboardMaterial | null | undefined);
    get point(): PointMaterial | undefined;
    set point(value: PointMaterial | null | undefined);
    get polygon(): PolygonMaterial | undefined;
    set polygon(value: PolygonMaterial | null | undefined);
    get polyline(): PolylineMaterial | undefined;
    set polyline(value: PolylineMaterial | null | undefined);
    /**
     * For vector-tile sources: which source layers within the tileset to
     * render (MapLibre's `source-layer`). Ignored for GeoJSON sources.
     */
    get sourceLayers(): string[] | undefined;
    /**
     * For vector-tile sources: which source layers within the tileset to
     * render (MapLibre's `source-layer`). Ignored for GeoJSON sources.
     */
    set sourceLayers(value: string[] | null | undefined);
    /**
     * The id of the source this layer renders (from `addSource`).
     */
    get source(): string | undefined;
    /**
     * The id of the source this layer renders (from `addSource`).
     */
    set source(value: string | null | undefined);
    get text(): TextMaterial | undefined;
    set text(value: TextMaterial | null | undefined);
    get type(): string | undefined;
    set type(value: string | null | undefined);
}

/** A `vector-tile` source: Mapbox Vector Tiles fetched from a `url` template. */
export declare type VectorTileSource = SourceBase & WithColorSupport<Layer_2<VectorTileSourceDescription & {
    type: "vector-tile";
}>>;

declare class VectorTileSourceDescription {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    get crs(): string | undefined;
    set crs(value: string | null | undefined);
    /**
     * Per-layer horizon dynamic-SSE relaxation strength (`0.0` off … `1.0`
     * raster-equivalent). Omit for a content-based default.
     */
    get dynamicSseScale(): number | undefined;
    /**
     * Per-layer horizon dynamic-SSE relaxation strength (`0.0` off … `1.0`
     * raster-equivalent). Omit for a content-based default.
     */
    set dynamicSseScale(value: number | null | undefined);
    get maxSse(): number | undefined;
    set maxSse(value: number | null | undefined);
    get maxZoom(): number | undefined;
    set maxZoom(value: number | null | undefined);
    get minZoom(): number | undefined;
    set minZoom(value: number | null | undefined);
    get overscaledMaxZoom(): number | undefined;
    set overscaledMaxZoom(value: number | null | undefined);
    get type(): string | undefined;
    set type(value: string | null | undefined);
    get url(): string | undefined;
    set url(value: string | null | undefined);
}

/**
 * One WebMercator texturized-vector tile to drape on a terrain tile (one per
 * overlapping WM vector tile per layer). `uv_offset`/`uv_scale` place this tile's
 * offscreen scene into the terrain tile's `[0, 1]` UV; `reproject_terrain_lat` is
 * `[south, north]` (radians) on Geographic terrain (Mercator reprojection) or empty
 * on WebMercator terrain (identity drape).
 */
declare class VectorTileState {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    layer_id: string;
    reproject_terrain_lat: Float32Array;
    tile_handle: bigint;
    uv_offset: Float32Array;
    uv_scale: Float32Array;
}

declare type View = ThreeView;

/**
 * ViewContext is the shared context object passed to every custom descriptor and plugin.
 *
 * The public properties and methods defined here form the **public API surface**
 * exposed to user-authored descriptors and plugins. Any addition, removal, or
 * signature change to a public member is a **breaking change** for consumers.
 *
 * When extending this class, keep the public surface minimal and intentional:
 * - Prefer methods over exposing internal objects directly — this allows the
 *   implementation to change without breaking downstream code.
 * - Mark internal dependencies as `private` so they are not accessible from
 *   descriptor/plugin code.
 */
export declare class ViewContext extends EventHandler<ViewContextEvents> {
    /** Scene containers for different rendering passes. */
    private _scenes;
    private layersManager;
    private renderPassOrchestrator;
    /** Manager for scheduling work on Web Workers. */
    private _concurrencyManager;
    private _core;
    private _meshes;
    private _commonUniforms;
    private _selectiveEffectRegistry;
    private _renderPass?;
    private _registries?;
    constructor(
    /** Scene containers for different rendering passes. */
    _scenes: Scenes, layersManager: LayersManager, renderPassOrchestrator: RenderPassOrchestrator, 
    /** Manager for scheduling work on Web Workers. */
    _concurrencyManager: ConcurrencyManager, _core: Core, _meshes: MeshCache, _commonUniforms: CommonUniforms);
    /** Scene containers for different rendering passes. */
    get scenes(): Scenes;
    /** Manager for scheduling work on Web Workers. */
    get concurrencyManager(): ConcurrencyManager;
    get selectiveEffectRegistry(): SelectiveEffectRegistry;
    /** Get a post-processing pass by name. */
    getPass(name: string): Pass_2 | undefined;
    /** Add a post-processing pass to the end of the pipeline. */
    addPass(name: string, pass: Pass_2): void;
    /** Insert a post-processing pass before the pass identified by `targetName`. */
    insertPassBefore(targetName: string, name: string, pass: Pass_2): void;
    /** Insert a post-processing pass after the pass identified by `targetName`. */
    insertPassAfter(targetName: string, name: string, pass: Pass_2): void;
    /** Remove a post-processing pass by name. */
    removePass(name: string): void;
    /** Get the underlying WebGLRenderer instance. */
    getRenderer(): WebGLRenderer;
    /** Get the input buffer from the effect composer. */
    getInputBuffer(): WebGLRenderTarget<Texture<unknown, TextureEventMap>>;
    /* Excluded from this release type: _setRenderPass */
    /* Excluded from this release type: _setRegistries */
    /* Excluded from this release type: _setGBufferOptions */
    /* Excluded from this release type: _setLit */
    /**
     * Gets the globe depth texture for post-processing effects.
     */
    getGlobeDepthTexture(): Texture<unknown, TextureEventMap>;
    /**
     * Gets the globe normal texture for post-processing effects.
     */
    getGlobeNormalTexture(): Texture<unknown, TextureEventMap>;
    /** Uniform ref to {@link getGlobeDepthTexture}. */
    getGlobeDepthTextureUniform(): RefThree<Texture>;
    /** Uniform ref to {@link getGlobeNormalTexture}. */
    getGlobeNormalTextureUniform(): RefThree<Texture>;
    /** Uniform ref to the sky environment map. */
    getSkyEnvMapTextureUniform(): RefThree<Texture>;
    /** Uniform ref to `[width, height, pixelRatio]` of the viewport in CSS pixels. */
    getViewportAndPixelRatioUniform(): RefThree<[number, number, number]>;
    /** Uniform ref to the camera's `[near, far]`. */
    getFrustumNearFarUniform(): RefThree<[number, number]>;
    /** Uniform ref to the camera frustum's `[top, bottom, right, left]` on the near plane. */
    getFrustumRatioUniform(): RefThree<[number, number, number, number]>;
    /** Uniform ref to the camera's inverse projection matrix. */
    getInverseProjectionMatrixUniform(): RefThree<Matrix4>;
    /** Uniform ref to the frame timestamp passed to `preUpdate`. */
    getTimeUniform(): RefThree<number>;
    /**
     * Gets the main render target which includes G-buffer.
     */
    getRenderTarget(): WebGLRenderTarget<Texture<unknown, TextureEventMap>>;
    /**
     * Gets the scene normal texture from the G-buffer.
     */
    getNormalTexture(): Texture<unknown, TextureEventMap> | undefined;
    /**
     * Gets the effect IDs texture from the G-buffer.
     * `undefined` when the view disabled `buffers.selectiveEffect`.
     */
    getEffectIdsTexture(): Texture | undefined;
    /**
     * Gets the emissive texture from the G-buffer.
     * `undefined` when the view disabled `buffers.emissive`.
     */
    getEmissiveTexture(): Texture | undefined;
    /**
     * Gets the shadow texture (R=shadow amount, 0=lit..1=fully shadowed) from
     * the G-buffer. `undefined` unless an active effect requires the `shadow`
     * buffer.
     */
    getShadowTexture(): Texture | undefined;
    /* Excluded from this release type: _getEffects */
    /* Excluded from this release type: _getLights */
    /* Excluded from this release type: _getMeshes */
    /**
     * Finds an active effect descriptor by its `key` (e.g. `"mrt"`,
     * `"selectiveBloom"`). Returns the first match, or `undefined`.
     */
    findEffect<T extends EffectDesc = EffectDesc>(key: string): T | undefined;
    /**
     * Finds the first active light descriptor registered under `key` (e.g.
     * `"sun"`), for inheriting the scene's lighting in a custom effect.
     */
    findLight<T extends LightDesc = LightDesc>(key: string): T | undefined;
    /**
     * Finds an active mesh descriptor by its registered key (e.g. `"box"`,
     * `"gltfModel"`). Returns the first match, or `undefined`.
     */
    findMesh<T extends MeshDesc = MeshDesc>(key: string): T | undefined;
    /**
     * Register a material for CSM shadow rendering.
     * @experimental This API may change or be removed in future versions.
     */
    applyShadowMaterial(material: Material): void;
    /**
     * Unregister a material from CSM shadow rendering.
     * @experimental This API may change or be removed in future versions.
     */
    removeShadowMaterial(material: Material): void;
    /**
     * Generate a new unique global batch ID for picking.
     * The returned ID is in the 24-bit RGB color range (1..0xffffff).
     */
    genGlobalBatchId(): number | undefined;
    /**
     * Register a pickable mesh so the picking system can discover it.
     * @param key - Unique key (typically the descriptor ID).
     * @param mesh - Any {@link PickableMesh} implementation. Implementers
     *   must also be an `Object3D` so the pick pass can re-parent the
     *   renderable into its dedicated scene.
     */
    registerPickableMesh(key: string, mesh: PickableMesh & Object3D): void;
    /**
     * Unregister a pickable mesh from the picking system.
     * @param key - The key used during registration.
     */
    unregisterPickableMesh(key: string): void;
}

declare type ViewContextEvents = {
    /**
     * Emitted when a material is registered for CSM shadow rendering.
     * @experimental This event may change or be removed in future versions.
     */
    shadowApplied: (material: Material) => void;
    /**
     * Emitted when a material is unregistered from CSM shadow rendering.
     * @experimental This event may change or be removed in future versions.
     */
    shadowRemoved: (material: Material) => void;
    /**
     * Emitted when effect slot assignments change in SelectiveEffectRegistry.
     * Listeners should recompute effectIdsMask to stay in sync.
     */
    effectSlotsChanged: () => void;
    /**
     * Emitted when the derived G-buffer configuration changes. Meshes re-evaluate
     * their pass placement: outside the MRT pass they would leave the G-buffer
     * holding whatever lies behind them.
     */
    gbufferChanged: () => void;
    /**
     * Emitted by an effect or mesh descriptor whose `getRequiredBuffers()` result
     * changed after creation. The view re-derives the G-buffer configuration.
     */
    gbufferRequirementsChanged: () => void;
};

/**
 * Event types emitted by ThreeView. Subscribe using `view.on(eventName, callback)`.
 */
export declare type ViewEvents = {
    /** Emitted when the view is resized. Receives width and height in pixels. */
    resize: (w: number, h: number) => void;
    /**
     * Emitted when a feature is clicked or tapped (click-gesture GPU pick).
     * Receives the clicked feature, or null when empty space was clicked. For
     * raw click coordinates use the `click` event instead.
     */
    featureClick: (info: Nullable<PickedFeature>) => void;
    /**
     * Emitted when the hovered feature changes (hover picking). Receives
     * the newly hovered feature, or null when the pointer leaves all pickable
     * features. Hover picking runs a GPU pick per frame while the pointer
     * moves, and is active only while at least one `featureHover` /
     * `featureEnter` / `featureLeave` listener is registered.
     */
    featureHover: (info: Nullable<PickedFeature>) => void;
    /** Emitted when the pointer starts hovering a pickable feature. See `featureHover` for activation. */
    featureEnter: (info: PickedFeature) => void;
    /** Emitted when the pointer stops hovering the previously hovered feature. See `featureHover` for activation. */
    featureLeave: (info: PickedFeature) => void;
    /** Emitted when a layer event occurs. Receives event type, layer ID, and event arguments. */
    layer: <K extends keyof LayerEvent>(k: K, layerId: string, ...args: Parameters<LayerEvent[K]>) => void;
    /** Emitted before an update process happens. Receives `DOMHighResTimeStamp` as a timestamp. */
    preUpdate: (t: number) => void;
    /** Emitted after an update process when state changes occurred. Receives `DOMHighResTimeStamp` as a timestamp. */
    postUpdate: (t: number) => void;
    /** Emitted before rendering. With `animation: true`, fires every frame. Receives `DOMHighResTimeStamp` as a timestamp. */
    preRender: (t: number) => void;
    /** Emitted after rendering. With `animation: true`, fires every frame. Receives `DOMHighResTimeStamp` as a timestamp. */
    postRender: (t: number) => void;
    /** @private Emitted when terrain height sampling completes. */
    _sample_terrain_height_received: (ev: TerrainHeightUpdatedEvent) => void;
    /** @private Emitted when an observed terrain height range changes. */
    _terrain_height_range_received: (ev: TerrainHeightRangeUpdatedEvent) => void;
    /** Emitted on pointerdown with map coordinates, for every input type. */
    pointerdown: (event: MapPointerEvent) => void;
    /** Emitted when a pointer enters the canvas with map coordinates, for every input type. */
    pointerenter: (event: MapPointerEvent) => void;
    /** Emitted when a pointer leaves the canvas with map coordinates, for every input type. */
    pointerleave: (event: MapPointerEvent) => void;
    /** Emitted on pointermove with map coordinates, for every input type. */
    pointermove: (event: MapPointerEvent) => void;
    /** Emitted on pointerup with map coordinates, for every input type. */
    pointerup: (event: MapPointerEvent) => void;
    /** Emitted when the browser cancels an active pointer (e.g. a system gesture takes over). */
    pointercancel: (event: PointerEvent) => void;
    /**
     * Emitted on a click or touch tap with map coordinates: a primary-pointer
     * press and release within the travel tolerance
     * ({@link CLICK_PIXEL_TOLERANCE}, or {@link TAP_PIXEL_TOLERANCE} for
     * touch). Camera drags and pinches never fire it. `pointerType` tells the
     * input kinds apart.
     */
    click: (event: MapPointerEvent) => void;
    /** Emitted when the engine becomes idle (no Rust-side events for `idleThreshold` ms). */
    idle: () => void;
};

export declare const WATER_NORMAL_URL: string;

/** Water's reflectance at normal incidence, i.e. `IorToFresnel0(1.333)`. */
export declare const WATERMASK_OCEAN_REFLECTIVITY = 0.02;

/**
 * Carries the wave slopes, since nothing puts waves in the watermask normal:
 * Cox-Munk mean square slope for a gentle breeze, `roughness = mss^(1/4)`.
 * ref: https://oceanopticsbook.info/view/surfaces/cox-munk-sea-surface-slope-statistics
 */
export declare const WATERMASK_OCEAN_ROUGHNESS = 0.4;

/**
 * Mutation functions for the water enhancer (internal only).
 */
declare type WaterMutates = Mutates<PolygonWaterState, PolygonWaterUniforms, {
    /**
     * Set the time uniform ref.
     * Assigns the external ref object (identity doesn't change after mount).
     */
    setTimeUniform: (timeUniform: UniformValue<number>) => void;
}>;

/**
 * Water-only props (excluding base props).
 */
declare type WaterOnlyProps = {
    water?: boolean;
    waterScaleNormal?: number;
    waterSpeed?: number;
    shininess?: number;
    specularStrength?: number;
    applyWaterNormal?: boolean;
    specular?: boolean;
    ior?: number;
    skyEnvMap?: Texture | null;
    waterNormalMap?: Texture | null;
    timeUniform?: UniformValue<number>;
};

/**
 * Creates a local West-Up-North (WUN) reference frame transformation matrix at
 * a position.
 *
 * WUN is the only right-handed, Y-up tangent frame whose `+Z` axis is north, so
 * it agrees with glTF's own convention (front `+Z`, up `+Y`, right `-X`) on all
 * three axes. An unmodified glTF asset placed in this frame needs **no**
 * `Rx(+90°)` up-axis correction — the correction is absorbed here, once, as the
 * `Ry(+90°)` basis change from NUE.
 *
 * @param origin - Origin position in ECEF coordinates
 * @returns 4x4 transformation matrix from WUN to ECEF
 */
export declare function westUpNorthToFixedFrame(origin: Vector3): Matrix4;

declare type Window_2 = Required<NormalizeWASMClass<Window_3>>;
export { Window_2 as Window }

declare class Window_3 {
    free(): void;
    [Symbol.dispose](): void;
    constructor(width: number, height: number, pixel_ratio: number);
    height: number;
    pixelRatio: number;
    width: number;
}

/**
 * Helper type to enable Navara Color objects in all color-related fields.
 * This applies to model, point, billboard, text, polyline, polygon, raster, etc.
 * Both number and Navara Color objects are accepted for backward compatibility.
 */
declare type WithColorSupport<T> = ConvertColorFields<T>;

/** Snapshot of worker-side memory; see {@link ThreeView.workerMemoryStats}. */
export declare type WorkerMemoryStats = {
    /** Tile-worker pool heaps (undefined per slot until first probed). */
    tileWorkers: WorkerPoolHeapStats | undefined;
    /** Font worker heap/cache breakdown; undefined while no font is in use. */
    fontWorker: FontWorkerMemoryStats | undefined;
};

declare type WorkerPoolHeapStats = {
    /** Last probed WASM heap per slot (undefined = not probed yet). */
    perSlot: (number | undefined)[];
    /** Sum of the probed heaps. */
    totalBytes: number;
    /** The per-worker budget slots are recycled against. */
    maxWorkerHeapBytes: number;
};

export { WorkerPoolPromise }

export declare type WorkerPoolPromises = Map<string, WorkerPoolPromise<unknown>>;

declare class WorkerTaskDelegatedEvent {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    bits: bigint;
    gen: number;
    ind: number;
    /**
     * Dispatch urgency: 0 is the most urgent (see `Priority::rank`). The
     * platform keeps its pending stack sorted by this so a terrain mesh task
     * overtakes older, less urgent work waiting for a worker.
     */
    priority: number;
    task: DelegatedWorkerTasksParameters;
}

declare type WorkerTaskHandler = {
    triggerWorkerTaskCompleted: (bits: bigint, result: DelegatedWorkerTasksResult) => void;
    /**
     * Release the delegator of a task that ended without a deliverable result.
     * Consumes `delegator_id`; a no-op for a task the engine already cancelled.
     */
    triggerWorkerTaskFailed: (delegator_id: ReconstructableEntity) => void;
    hasWorkerTask: (bits: bigint) => boolean;
};

export declare type XYZ = {
    x: number;
    y: number;
    z: number;
};


export * from "@takram/three-geospatial/shaders";

export { }


declare module "three" {
    interface ShaderLibShader {
        [SETUP]?: boolean;
    }
    interface ShaderMaterial {
        [SETUP]?: boolean;
    }
}
