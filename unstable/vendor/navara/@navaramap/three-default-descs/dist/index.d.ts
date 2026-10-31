import { AerialPerspectiveEffect } from '@takram/three-atmosphere';
import { AerialPerspectiveEffectOptions } from '@takram/three-atmosphere';
import { AmbientLight as AmbientLight_2 } from 'three';
import { AnimationAction } from 'three';
import { AnimationClip } from 'three';
import { ArrowHelper } from 'three';
import { Atmosphere } from '@navaramap/three';
import { AtmosphereOverlay } from '@takram/three-atmosphere';
import { AtmosphereShadow } from '@takram/three-atmosphere';
import { AtmosphereShadowLength } from '@takram/three-atmosphere';
import { AxesHelper } from 'three';
import { BlendMode } from '@navaramap/three';
import { BoxGeometry } from 'three';
import { BufferGeometry } from 'three';
import { BufferGeometryEventMap } from 'three';
import { Camera } from 'three';
import { CanvasTexture } from 'three';
import { CascadedDirectionalLights } from '@navaramap/three-csm';
import { CascadedShadowMaps } from '@navaramap/three-csm';
import { CloudLayer as CloudLayer_2 } from '@takram/three-clouds';
import { CloudLayerLike } from '@takram/three-clouds';
import { CloudsEffect } from '@takram/three-clouds';
import { CloudsQualityPreset } from '@takram/three-clouds';
import { Color } from 'three';
import { Color as Color_2 } from '@navaramap/three';
import { CSMHelper } from '@navaramap/three-csm';
import { CustomEffectPass } from '@navaramap/three';
import { CustomObject3DEventMap } from '@navaramap/three';
import { CylinderGeometry } from 'three';
import { Data3DTexture } from 'three';
import { default as default_2 } from '@navaramap/three';
import { DepthOfFieldEffect } from 'postprocessing';
import { DepthPackingStrategies } from 'three';
import { DrapedMesh } from '@navaramap/three';
import { Effect } from '@navaramap/three';
import { Effect as Effect_2 } from 'postprocessing';
import { EffectConfig } from '@navaramap/three';
import { EffectDesc } from '@navaramap/three';
import { EffectEvents } from '@navaramap/three';
import { EffectOptions } from '@navaramap/three';
import { EffectUpdate } from '@navaramap/three';
import { EventHandler } from '@navaramap/three';
import { EventHandler as EventHandler_2 } from '@navaramap/core';
import { FXAAEffect } from 'postprocessing';
import { GBufferName } from '@navaramap/three';
import { Group } from 'three';
import { InstancedBufferGeometry } from 'three';
import { InstancedChildConfig } from '@navaramap/three';
import { InstancedMesh } from 'three';
import { InstancedMeshConfig } from '@navaramap/three';
import { InstancedMeshDesc } from '@navaramap/three';
import { InstancedMeshUpdate } from '@navaramap/three';
import { LatLng } from '@navaramap/three';
import { LatLngHeight } from '@navaramap/three';
import { LensFlareEffect } from '@takram/three-geospatial-effects';
import { LightConfig } from '@navaramap/three';
import { LightDesc } from '@navaramap/three';
import { LightProbe } from 'three';
import { LightUpdate } from '@navaramap/three';
import { LineString } from 'geojson';
import { LUT3DEffect } from 'postprocessing';
import { Material } from 'three';
import { Matrix4 } from 'three';
import { Mesh } from 'three';
import { MeshBasicMaterial } from 'three';
import { MeshConfig } from '@navaramap/three';
import { MeshConfigWithSelectiveEffect } from '@navaramap/three';
import { MeshDesc } from '@navaramap/three';
import { MeshDescWithSelectiveEffect } from '@navaramap/three';
import { MeshLambertMaterial } from 'three';
import { MeshUpdate } from '@navaramap/three';
import { MeshUpdateWithSelectiveEffect } from '@navaramap/three';
import { N8AOPostPass } from 'n8ao';
import { NormalBufferAttributes } from 'three';
import { Nullable } from '@navaramap/core';
import { Object3D } from 'three';
import { Object3DEventMap } from 'three';
import { Observed } from '@navaramap/three';
import { OrthographicCamera } from 'three';
import { Pass } from '@navaramap/three';
import { Pass as Pass_2 } from 'postprocessing';
import { PassKey } from '@navaramap/three';
import { PerspectiveCamera } from 'three';
import { PickableMesh } from '@navaramap/three';
import { PlaneGeometry } from 'three';
import { Points } from 'three';
import { Polygon } from 'geojson';
import { PrecomputedTextures } from '@takram/three-atmosphere';
import { Quality } from '@navaramap/three';
import { Resolution } from 'postprocessing';
import { Scene } from 'three';
import { SelectiveEffectConfig } from '@navaramap/three';
import { SelectiveEffectDesc } from '@navaramap/three';
import { ShaderMaterial } from 'three';
import { ShaderMaterialParameters } from 'three';
import { ShaderPass } from 'postprocessing';
import { SkyLightProbe as SkyLightProbe_2 } from '@takram/three-atmosphere';
import { SkyMaterial } from '@takram/three-atmosphere';
import { SMAAEffect } from 'postprocessing';
import { SphereGeometry } from 'three';
import { SphericalHarmonics3 } from 'three';
import { SplatMesh } from '@sparkjsdev/spark';
import { QualityMode as SSAOQualityMode } from 'n8ao';
import { StarsGeometry } from '@takram/three-atmosphere';
import { StarsMaterial } from '@takram/three-atmosphere';
import { SunDirectionalLight } from '@takram/three-atmosphere';
import { Texture } from 'three';
import { TextureChannel } from '@takram/three-clouds';
import { TextureDataType } from 'three';
import { ToneMappingEffect } from 'postprocessing';
import { ToneMappingMode } from 'postprocessing';
import { TubeGeometry } from 'three';
import { Uniform } from 'three';
import { UniformsLib } from 'three';
import { Vector2 } from 'three';
import { Vector3 } from 'three';
import { VectorLayer } from '@navaramap/three';
import { ViewContext } from '@navaramap/three';
import { WebGLProgramParametersWithUniforms } from 'three';
import { WebGLRenderer } from 'three';
import { WebGLRenderTarget } from 'three';
import { XYZ } from '@navaramap/three';

export declare class AerialPerspective extends Pass<CustomEffectPass, AerialPerspectiveLightingEffect, AerialPerspectiveOptions> {
    atmosphere: Atmosphere;
    private cloudsShadows;
    private normalBuffer;
    constructor(atmosphere: Atmosphere, camera: PerspectiveCamera, normalBuffer: Texture | null, _options?: AerialPerspectiveOptions);
    onUpdate: () => void;
    init(): void;
    onTextureLoaded: (textures: Partial<PrecomputedTextures>) => void;
    onOverlayChanged: (v: AtmosphereOverlay | null) => void;
    onShadowChanged: (v: AtmosphereShadow | null) => void;
    onShadowLengthChanged: (v: AtmosphereShadowLength | null) => void;
    onEnableShadowChanged: (v: boolean) => void;
    _update(): void;
    get inscatter(): boolean;
    set inscatter(v: boolean);
    get transmittance(): boolean;
    set transmittance(v: boolean);
    get irradiance(): boolean;
    set irradiance(v: boolean);
    get sky(): boolean;
    set sky(v: boolean);
    get sun(): boolean;
    set sun(v: boolean);
    get moon(): boolean;
    set moon(v: boolean);
    get albedoScale(): number;
    set albedoScale(v: number);
    setNormalBuffer(texture: Texture | null): void;
    get useNormalBuffer(): boolean;
    set useNormalBuffer(v: boolean);
}

export declare type AerialPerspectiveConfig = Description_24 & EffectConfig;

export declare class AerialPerspectiveEffectDesc extends EffectDesc<AerialPerspectiveConfig, AerialPerspectiveUpdate, AerialPerspective> {
    static key: string;
    static insertAfter: string[];
    private config;
    private shadowTerm;
    private specularTerm;
    constructor(view: default_2, ctx: ViewContext, config: AerialPerspectiveConfig);
    /**
     * Both terms read the shadow attachment: R for the shadow amount, G for the
     * deferred-lit mask. Read before `onCreate`.
     */
    getRequiredBuffers(): readonly GBufferName[];
    createPass(): AerialPerspective;
    onUpdateConfig(updates: AerialPerspectiveUpdate): void;
    private updateLighting;
    update(_time: number): void;
}

/**
 * The aerial perspective effect with the lighting terms its Lambertian
 * `irradiance` model drops: cascaded shadows and the sun's specular, applied
 * to its own sun and sky irradiance. Both terms need `sunLight`, `skyLight`
 * and a `normalBuffer`; the shader compiles them out otherwise.
 */
export declare class AerialPerspectiveLightingEffect extends AerialPerspectiveEffect {
    private _shadow;
    private _shadowSoftness;
    private _shadowSamples;
    private _specular;
    constructor(camera: Camera, options?: AerialPerspectiveEffectOptions, lighting?: AerialPerspectiveLightingOptions);
    private get lightingUniforms();
    private applyLightingDefines;
    /** The shadow G-buffer attachment (R = shadow amount, G = deferred-lit flag). */
    setShadowBuffer(texture: Texture | null): void;
    /** `shadow` is the base class's cloud shadow input. */
    get shadowTerm(): boolean;
    set shadowTerm(value: boolean);
    get shadowIntensity(): number;
    set shadowIntensity(value: number);
    get shadowSoftness(): number;
    set shadowSoftness(value: number);
    get shadowSamples(): number;
    set shadowSamples(value: number);
    get specularTerm(): boolean;
    set specularTerm(value: boolean);
    get specularIntensity(): number;
    set specularIntensity(value: number);
}

export declare type AerialPerspectiveLightingOptions = {
    /** Re-applies the sun's cascaded shadows from the shadow G-buffer. */
    shadow?: boolean;
    /** Scales the shadow amount read from the G-buffer (0 = off, 1 = as cast). */
    shadowIntensity?: number;
    /** Screen-space filter radius in pixels. 0 uses the buffer as-is. */
    shadowSoftness?: number;
    /** Taps of the softening filter. Ignored while `shadowSoftness` is 0. */
    shadowSamples?: number;
    /** Adds the sun's GGX specular reflection. */
    specular?: boolean;
    /** Scales the specular reflection. */
    specularIntensity?: number;
};

export declare type AerialPerspectiveOptions = {
    inscatter?: boolean;
    transmittance?: boolean;
    irradiance?: boolean;
    sky?: boolean;
    sun?: boolean;
    moon?: boolean;
    albedoScale?: number;
    useNormalBuffer?: boolean;
} & AerialPerspectiveLightingOptions & EffectOptions;

export declare type AerialPerspectiveUpdate = Description_24 & EffectUpdate;

export declare class AmbientLight extends EventHandler_2<AmbientLightEvents> {
    raw: AmbientLight_2;
    private options;
    constructor(options?: AmbientLightOptions);
    get color(): Color;
    set color(v: Color);
    get intensity(): number;
    set intensity(v: number);
    get visible(): boolean;
    set visible(v: boolean);
}

export declare type AmbientLightConfig = LightConfig & Description_36;

export declare class AmbientLightDesc extends LightDesc<AmbientLightConfig, AmbientLightUpdate, AmbientLight> {
    private config;
    constructor(view: default_2, ctx: ViewContext, config: AmbientLightConfig);
    createLight(): AmbientLight;
    onUpdateConfig(updates: AmbientLightUpdate): void;
}

export declare type AmbientLightEvents = {
    needsUpdate: () => void;
};

export declare type AmbientLightOptions = {
    color?: Color;
    intensity?: number;
};

export declare type AmbientLightUpdate = LightUpdate & Description_36;

export declare type AnimationDetails = {
    name: string;
    duration: number;
    tracks: number;
    isLooping: boolean;
    timeScale: number;
};

export declare type AnimationState = {
    isPlaying: boolean;
    currentAnimation: string | null;
    isBlendMode: boolean;
    blendAnimations: {
        name: string;
        weight: number;
        isPlaying: boolean;
    }[];
    playbackTime: number;
    progress: number;
};

export declare type AntialiasOptions = {
    enabled?: boolean;
    quality?: Quality;
    edgeDetectionMode?: EdgeDetectionMode;
} & EffectOptions;

/**
 * ArcLine - Geodesic arc line renderer for 3D globe visualization
 *
 * Renders arc lines between geographic coordinates on a WGS84 ellipsoid using
 * RTE (Relative-To-Eye) rendering for high precision.
 *
 * **Implementation:**
 * - ECEF coordinates are calculated on CPU side and encoded as high/low precision components
 * - Shader applies RTE transformation to maintain precision near the camera
 * - Geodesic interpolation is performed in absolute coordinates before RTE transformation
 *
 * **Precision Limitations:**
 * Due to floating-point precision constraints in the current implementation,
 * arc lines should be approximately **2km or longer** for reliable rendering.
 * Shorter arc lines may exhibit visual artifacts or precision issues.
 *
 * If future requirements need to support arc lines shorter than 2km,
 * the implementation will need to be redesigned with:
 * - RTC (Relative-To-Center) coordinate system per batch
 * - Alternative interpolation strategies
 * - Different vertex encoding schemes
 */
export declare class ArcLine extends Object3D {
    private readonly _config;
    private _subMeshes;
    private _sharedSEUniforms;
    private _sharedRTEUniforms;
    constructor(config?: Partial<ArcLineConfig>[]);
    private initSubMeshes;
    /**
     * Attach the per-frame RTE uniform updater to the current first sub-mesh.
     *
     * All sub-meshes share the same RTE uniforms and can use the same
     * modelViewMatrixRTE because:
     * 1. All sub-meshes are at origin (no local transforms)
     * 2. Real world positions are encoded in ECEF coordinates (per-instance attributes)
     * 3. modelViewMatrixRTE = identityMatrix * camera.matrixWorldInverse (rotation-only view matrix)
     *
     * So only one sub-mesh needs the onBeforeRender/onBeforeShadow callback that
     * refreshes the shared uniforms each frame. It must be re-attached whenever
     * sub-meshes are rebuilt (e.g. `segments` change), because a rebuild replaces
     * the sub-mesh instance and would otherwise drop the callback — freezing the
     * RTE uniforms and making the arc appear to follow the camera.
     */
    private attachRteCallback;
    private createSubMesh;
    /**
     * Calculate the arc length between two points considering elevation.
     * Uses circular arc approximation for better performance.
     *        ╱‾‾‾╲
     *      ╱   h   ╲  ← sagitta (arcHeight)
     *     ╱_________╲
     *          c        ← chord (surfaceDistance)
     * Given chord length (surface distance) and sagitta (arc height),
     * we calculate the arc length using the formula:
     * - Radius: R = c²/(8h) + h/2
     * - Central angle: θ = 2 * arcsin(c/(2R))
     * - Arc length: L = R * θ
     */
    private calculateArcLength;
    private fillSingleConfigAttributes;
    /**
     * Set instance attributes for a single arc (low-level setter)
     */
    private setInstanceAttributes;
    /**
     * Fill instance data for common attributes (params, dash, colors)
     * Calculates arcHeight and arcLength from geometry
     */
    private fillInstanceCommonData;
    /**
     * Update arc parameters (no WASM calls)
     * Updates: thickness, opacity, gradation, colors, dash parameters, height
     * Reads existing arcHeight, segments, arcLength from buffer
     */
    private updateArcParameters;
    /**
     * Update arc height and length (requires WASM calls for distance/arc calculation)
     * Updates: arcHeightScale (need to recalculate arcHeight/arcLength)
     * Does NOT re-encode ECEF coordinates
     */
    private updateArcHeightAndLength;
    /**
     * Fill instance data for RTE mode (ECEF coordinates with high/low encoding)
     */
    private fillInstanceDataRTE;
    private fillSingleConfigInstanceData;
    private createMaterial;
    private updateBoundingSphere;
    updateConfig(newConfig: Partial<ArcLineConfig>[]): void;
    updateMaterials(config: ArcLineConfig, subMesh: Mesh<InstancedBufferGeometry, ShaderMaterial>): void;
    onResize(width: number, height: number): void;
    /**
     * Update effectIdsMask via shared uniform (applies to all sub-meshes).
     */
    updateEffectIdsMask(mask: number): void;
    /**
     * Update emissive color and intensity via shared uniforms (applies to all sub-meshes).
     */
    updateEmissive(color: number, intensity: number): void;
    dispose(): void;
}

export declare type ArcLineConfig = {
    thickness: number;
    transparent: boolean;
    opacity: number;
    segments: number;
    srcColor: Color_2;
    tgtColor: Color_2;
    height: number;
    arcHeightScale: number;
    gradation: number;
    dashed: boolean;
    dashSize: number;
    gapSize: number;
    dashOffset: number;
    geometry: LatLng[];
};

export declare type ArclineMeshConfig = MeshConfigWithSelectiveEffect & Description_12 & {
    pickable?: boolean;
};

export declare class ArclineMeshDesc extends MeshDescWithSelectiveEffect<ArclineMeshConfig, ArclineMeshUpdate, ArcLine> {
    private config;
    private pickWrapper?;
    constructor(view: default_2, ctx: ViewContext, config: ArclineMeshConfig);
    /** The batch ID assigned to this mesh when picking is enabled. */
    get batchId(): number | undefined;
    protected getPassKey(): "mrt";
    createMesh(): ArcLine;
    onUpdateConfig(updates: ArclineMeshUpdate): void;
    /**
     * Override to update effectIdsMask on all ArcLine sub-meshes.
     * ArcLine is Object3D with child Meshes, so the base class's
     * single-Mesh update doesn't work.
     */
    protected updateEffectIdsMask(): void;
    onResize(width: number, height: number): void;
    protected disposeMesh(): void;
    onDestroy(): void;
}

export declare type ArclineMeshUpdate = MeshUpdateWithSelectiveEffect & Description_12;

export declare type ArrowHelperConfig = MeshConfig & Description_15;

export declare class ArrowHelperDesc extends MeshDesc<ArrowHelperConfig, ArrowHelperUpdate, ArrowHelper> {
    private config;
    constructor(view: default_2, ctx: ViewContext, config: ArrowHelperConfig);
    createMesh(): ArrowHelper;
    onUpdateConfig(updates: ArrowHelperUpdate): void;
    protected disposeMesh(): void;
}

export declare type ArrowHelperUpdate = Pick<MeshConfig, "position" | "visible"> & Description_15;

export declare type AxesHelperConfig = MeshConfig & Description_16;

export declare class AxesHelperDesc extends MeshDesc<AxesHelperConfig, AxesHelperUpdate, AxesHelper> {
    private config;
    constructor(view: default_2, ctx: ViewContext, config: AxesHelperConfig);
    createMesh(): AxesHelper;
    onUpdateConfig(updates: AxesHelperUpdate): void;
    private recreate;
    protected disposeMesh(): void;
}

export declare type AxesHelperUpdate = Pick<MeshConfig, "position" | "visible"> & Description_16;

/** Per-instance configuration for a single box. */
export declare type BoxChildConfig = InstancedChildConfig & {
    /** Box width (X-axis). Encoded as scale in the instance matrix. */
    width?: number;
    /** Box height (Y-axis). Encoded as scale in the instance matrix. */
    height?: number;
    /** Box depth (Z-axis). Encoded as scale in the instance matrix. */
    depth?: number;
    /** Per-instance color. */
    color?: Color_2;
};

/** The `boxes` config object containing shared material props and children. */
export declare type BoxesDescription = SharedBoxMaterialConfig & {
    children?: BoxChildConfig[];
};

export declare type BoxMeshConfig = MeshConfigWithSelectiveEffect & {
    box?: Description_5["box"] & {
        /**
         * To drape the mesh properly on the terrain,
         * the mesh must cover the terrain. Fixed at creation; remove and re-add
         * the mesh to change it.
         */
        draped?: boolean;
    };
    pickable?: boolean;
};

export declare class BoxMeshDesc extends MeshDescWithSelectiveEffect<BoxMeshConfig, BoxMeshUpdate, DrapedMesh<BoxGeometry, BoxMeshMaterial, BoxMeshEventMap>> {
    private config;
    private pickWrapper?;
    constructor(view: default_2, ctx: ViewContext, config: BoxMeshConfig);
    /** The batch ID assigned to this mesh when picking is enabled. */
    get batchId(): number | undefined;
    createMesh(): DrapedMesh<BoxGeometry, BoxMeshMaterial, BoxMeshEventMap>;
    private createMaterial;
    protected getPassKey(): PassKey;
    onUpdateConfig(updates: BoxMeshUpdate): void;
    protected disposeMesh(): void;
    onDestroy(): void;
}

declare type BoxMeshEventMap = Object3DEventMap & CustomObject3DEventMap;

declare type BoxMeshMaterial = MeshLambertMaterial | MeshBasicMaterial;

export declare type BoxMeshUpdate = MeshUpdateWithSelectiveEffect & Description_5;

/** Cartesian positions in metres; ECEF without a mesh transform. */
declare type CartesianPositions = readonly XYZ[];

declare type CartesianRings = CartesianPositions | readonly CartesianPositions[];

export declare type CloudEvents = {
    needsUpdate: () => void;
};

/**
 * See [CloudLayer](https://github.com/takram-design-engineering/three-geospatial/tree/main/packages/clouds#cloudlayer).
 */
export declare class CloudLayer extends EventHandler_2<CloudEvents> {
    impl: CloudLayer_2;
    constructor(defaultOptions?: CloudLayerLike, options?: CloudOptions);
    onUpdate(): void;
    get channel(): TextureChannel;
    set channel(v: TextureChannel);
    get altitude(): number;
    set altitude(v: number);
    get height(): number;
    set height(v: number);
    get densityScale(): number;
    set densityScale(v: number);
    get shapeAmount(): number;
    set shapeAmount(v: number);
    get shapeDetailAmount(): number;
    set shapeDetailAmount(v: number);
    get weatherExponent(): number;
    set weatherExponent(v: number);
    get shapeAlteringBias(): number;
    set shapeAlteringBias(v: number);
    get coverageFilterWidth(): number;
    set coverageFilterWidth(v: number);
    get shadow(): boolean;
    set shadow(v: boolean);
    /**
     * `expTerm` of [DensityProfile](https://github.com/takram-design-engineering/three-geospatial/tree/main/packages/clouds#densityprofile).
     */
    get expTerm(): number;
    set expTerm(v: number);
    /**
     * `exponent` of [DensityProfile](https://github.com/takram-design-engineering/three-geospatial/tree/main/packages/clouds#densityprofile).
     */
    get exponent(): number;
    set exponent(v: number);
    /**
     * `linearTerm` of [DensityProfile](https://github.com/takram-design-engineering/three-geospatial/tree/main/packages/clouds#densityprofile).
     */
    get linearTerm(): number;
    set linearTerm(v: number);
    /**
     * `constantTerm` of [DensityProfile](https://github.com/takram-design-engineering/three-geospatial/tree/main/packages/clouds#densityprofile).
     */
    get constantTerm(): number;
    set constantTerm(v: number);
}

export declare type CloudOptions = Pick<CloudLayer, "channel" | "altitude" | "height" | "densityScale" | "shapeAmount" | "shapeDetailAmount" | "weatherExponent" | "shapeAlteringBias" | "coverageFilterWidth" | "shadow" | "expTerm" | "exponent" | "linearTerm" | "constantTerm">;

export declare class Clouds extends Pass<CustomEffectPass, CloudsEffect, ResolvedCloudsOptions> {
    atmosphere: Atmosphere;
    private _cloudLayers;
    constructor(camera: Camera, atmosphere: Atmosphere, options?: CloudsOptions);
    init(): void;
    private onTextureLoaded;
    private onDisposed;
    _update(): void;
    dispose(): void;
    initializeCloudLayers(options?: CloudOptions[]): void;
    get inner(): CloudsEffect;
    /**
     * Resolves an asset filename against `options.assetsUrl`. The bundled
     * default assets are emitted under bundler-hashed names, so the
     * directory-plus-filename form only applies to a user-provided URL.
     */
    private assetUrl;
    loadAll(): Promise<[void, void, void, void, void]>;
    onLocalWeatherLoad: (texture: Texture) => void;
    onShapeLoad: (texture: Data3DTexture) => void;
    onShapeDetailLoad: (texture: Data3DTexture) => void;
    onTurbulenceLoad: (texture: Texture) => void;
    onSTBNLoad: (texture: Data3DTexture) => void;
    get qualityPreset(): CloudsQualityPreset;
    set qualityPreset(v: CloudsQualityPreset);
    get localWeatherVelocity(): Vector2;
    set localWeatherVelocity(v: Vector2);
    get coverage(): number;
    set coverage(v: number);
    get lightShafts(): boolean;
    set lightShafts(v: boolean);
    get resolutionScale(): number;
    set resolutionScale(v: number);
    get maxIterationCount(): number;
    set maxIterationCount(v: number);
    get minStepSize(): number;
    set minStepSize(v: number);
    get maxStepSize(): number;
    set maxStepSize(v: number);
    get shadows(): boolean;
    set shadows(v: boolean);
    get shadowCascadeCount(): number;
    set shadowCascadeCount(v: number);
    get shadowMapSize(): Vector2;
    set shadowMapSize(v: Vector2);
    get shadowFarScale(): number;
    set shadowFarScale(v: number);
    get haze(): boolean;
    set haze(v: boolean);
    get hazeDensityScale(): number;
    set hazeDensityScale(v: number);
    get hazeExponent(): number;
    set hazeExponent(v: number);
    get hazeScatteringCoefficient(): number;
    set hazeScatteringCoefficient(v: number);
    get hazeAbsorptionCoefficient(): number;
    set hazeAbsorptionCoefficient(v: number);
    get localWeatherRepeat(): Vector2;
    set localWeatherRepeat(v: Vector2);
    get localWeatherOffset(): Vector2;
    set localWeatherOffset(v: Vector2);
    get shapeRepeat(): Vector3;
    set shapeRepeat(v: Vector3);
    get shapeOffset(): Vector3;
    set shapeOffset(v: Vector3);
    get shapeDetailRepeat(): Vector3;
    set shapeDetailRepeat(v: Vector3);
    get shapeDetailOffset(): Vector3;
    set shapeDetailOffset(v: Vector3);
    get turbulenceRepeat(): Vector2;
    set turbulenceRepeat(v: Vector2);
    get turbulenceDisplacement(): number;
    set turbulenceDisplacement(v: number);
    get scatteringCoefficient(): number;
    set scatteringCoefficient(v: number);
    get absorptionCoefficient(): number;
    set absorptionCoefficient(v: number);
    get scatterAnisotropy1(): number;
    set scatterAnisotropy1(v: number);
    get scatterAnisotropy2(): number;
    set scatterAnisotropy2(v: number);
    get scatterAnisotropyMix(): number;
    set scatterAnisotropyMix(v: number);
    get skyLightScale(): number;
    set skyLightScale(v: number);
    get groundBounceScale(): number;
    set groundBounceScale(v: number);
    get powderScale(): number;
    set powderScale(v: number);
    get powderExponent(): number;
    set powderExponent(v: number);
    /**
     * See [CloudLayers](https://github.com/takram-design-engineering/three-geospatial/tree/main/packages/clouds#cloudlayers).
     */
    get cloudLayers(): CloudLayer[];
}

export declare type CloudsConfig = Description_25 & EffectConfig;

export declare class CloudsEffectDesc extends EffectDesc<CloudsConfig, CloudsUpdate, Clouds> {
    static key: string;
    static insertAfter: string[];
    private config;
    constructor(view: default_2, ctx: ViewContext, config: CloudsConfig);
    createPass(): Clouds;
    onUpdateConfig(updates: CloudsUpdate): void;
    update(_time: number): void;
}

export declare type CloudsOptions = {
    /**
     * URL of a directory to load cloud textures from. The directory must keep
     * the original filenames (`local_weather.png` etc.). When omitted, the
     * assets bundled with the package are used.
     */
    assetsUrl?: string | undefined;
    stbnUrl?: string;
    qualityPreset?: CloudsQualityPreset;
    localWeatherVelocity?: Vector2;
    coverage?: number;
    lightShafts?: Nullable<boolean>;
    maxIterationCount?: Nullable<number>;
    minStepSize?: Nullable<number>;
    maxStepSize?: Nullable<number>;
    resolutionScale?: number;
    shadows?: boolean;
    shadowCascadeCount?: number;
    shadowMapSize?: Vector2;
    shadowFarScale?: number;
    haze?: boolean;
    hazeDensityScale?: number;
    hazeExponent?: number;
    hazeScatteringCoefficient?: number;
    hazeAbsorptionCoefficient?: number;
    localWeatherRepeat?: Vector2;
    localWeatherOffset?: Vector2;
    shapeRepeat?: Vector3;
    shapeOffset?: Vector3;
    shapeDetailRepeat?: Vector3;
    shapeDetailOffset?: Vector3;
    turbulenceRepeat?: Vector2;
    turbulenceDisplacement?: number;
    scatteringCoefficient?: number;
    absorptionCoefficient?: number;
    scatterAnisotropy1?: number;
    scatterAnisotropy2?: number;
    scatterAnisotropyMix?: number;
    skyLightScale?: number;
    groundBounceScale?: number;
    powderScale?: number;
    powderExponent?: number;
    cloudLayers?: Nullable<CloudOptions[]>;
} & EffectOptions;

export declare type CloudsUpdate = Description_25 & EffectUpdate;

export declare class ColorGradingLUT extends Effect<LUT3DEffect, ColorGradingLUTOptions> {
    private static lutCubeLoader;
    private static lut3dlLoader;
    private static textureLoader;
    constructor(camera: Camera, options?: ColorGradingLUTOptions);
    private loadLUT;
    set url(url: string);
    set blendMode(mode: BlendMode);
    set opacity(value: number);
    dispose(): void;
    protected onMounted(): void;
}

export declare type ColorGradingLUTConfig = Description_26 & EffectConfig;

export declare class ColorGradingLUTEffectDesc extends EffectDesc<ColorGradingLUTConfig, ColorGradingLUTUpdate, ColorGradingLUT> {
    static key: string;
    static insertBefore: string[];
    private config;
    constructor(view: default_2, ctx: ViewContext, config: ColorGradingLUTConfig);
    createPass(): ColorGradingLUT;
    onUpdateConfig(updates: ColorGradingLUTUpdate): void;
}

export declare type ColorGradingLUTOptions = {
    /** URL of the LUT file to load, supported formats are .cube, .3dl, .png, .jpg, .jpeg
     *
     *  Example LUTs can be found at:
     *
     *  web/navara-three/example/helpers/constants.ts: LUT_DATASETS
     */
    url?: string;
    /** Blend mode of the effect. */
    blendMode?: BlendMode;
    /** Opacity of the effect. */
    opacity?: number;
} & EffectOptions;

export declare type ColorGradingLUTUpdate = Description_26 & EffectUpdate;

export declare class ConeTracingMaterial extends ShaderMaterial {
    constructor(params?: ConeTracingMaterialParameters);
    /**
     * `width`/`height` describe the *colour* buffer the cone samples, which is
     * what the mip-level maths is expressed in. The resolve output may well be
     * smaller; that resolution only reaches the shader through
     * {@link setRayBufferSize}.
     */
    setSize(width: number, height: number): void;
    /** Size of the ray-tracing buffer, whose texels the resolve gathers over. */
    setRayBufferSize(width: number, height: number): void;
    copyCameraSettings(camera?: Camera | null): void;
    get depthBuffer(): Texture | null;
    set depthBuffer(value: Texture | null);
    get colorBuffer(): Texture | null;
    set colorBuffer(value: Texture | null);
    get inputBuffer(): Texture | null;
    set inputBuffer(value: Texture | null);
    get rayTracingBuffer(): Texture | null;
    set rayTracingBuffer(value: Texture | null);
    get normalBuffer(): Texture | null;
    set normalBuffer(value: Texture | null);
    get specularBuffer(): Texture | null;
    set specularBuffer(value: Texture | null);
    get indirectSpecularBuffer(): Texture | null;
    set indirectSpecularBuffer(value: Texture | null);
    get fadeStart(): number;
    set fadeStart(value: number);
    get fadeEnd(): number;
    set fadeEnd(value: number);
    get maxDistance(): number;
    set maxDistance(value: number);
    get iteration(): number;
    set iteration(value: number);
    get resolveKernelSize(): number;
    set resolveKernelSize(value: number);
}

export declare type ConeTracingMaterialParameters = {
    colorBuffer?: Texture | null;
    rayTracingBuffer?: Texture | null;
    normalBuffer?: Texture | null;
    specularBuffer?: Texture | null;
    indirectSpecularBuffer?: Texture | null;
    numMips?: number;
    fadeStart?: number;
    fadeEnd?: number;
    maxDistance?: number;
    iteration?: number;
    resolveKernelSize?: number;
} & ShaderMaterialParameters;

export declare class ConeTracingPass extends ShaderPass {
    readonly coneTracingMaterial: ConeTracingMaterial;
    readonly prefilterMaterial: ShaderMaterial;
    readonly prefilterPass: ShaderPass;
    readonly mippedRenderTarget: WebGLRenderTarget;
    private compressColor;
    constructor(options?: ConeTracingPassOptions);
    update(renderer: WebGLRenderer, inputBuffer: WebGLRenderTarget, _deltaTime?: number): void;
    initialize(renderer: WebGLRenderer, alpha: boolean, frameBufferType: TextureDataType): void;
    setDepthTexture(depthTexture: Texture, _depthPacking?: DepthPackingStrategies): void;
    /**
     * Sizes the *colour* buffer the cone samples and the mip chain built over
     * it. Both the mip count and the mip-level maths that indexes it are
     * expressed in these pixels, so passing the resolve's own resolution keeps
     * the physical blur radius identical while quartering the per-frame copy and
     * mipmap work. The resolve's output resolution never comes through here; it
     * is set by whichever render target the pass is asked to render into.
     */
    setSize(width: number, height: number): void;
}

export declare type ConeTracingPassOptions = {
    coneTracingFadeStart?: number;
    coneTracingFadeEnd?: number;
    coneTracingMaxDistance?: number;
    coneTracingIteration?: number;
    rayTracingBuffer?: Texture | null;
    normalBuffer?: Texture | null;
} & ConeTracingMaterialParameters;

/**
 * Per-instance configuration for a single cylinder.
 *
 * `radius` is a uniform XZ scale multiplier applied to the shared geometry's
 * `radiusTop` and `radiusBottom`. `height` is a Y scale multiplier applied to
 * the shared unit-height geometry. Taper ratio, segments, caps, and arc are
 * shared across all instances.
 */
export declare type CylinderChildConfig = InstancedChildConfig & {
    /** Uniform radius multiplier (scales both radiusTop and radiusBottom). */
    radius?: number;
    /** Height multiplier. */
    height?: number;
    /** Per-instance color. */
    color?: Color_2;
};

export declare type CylinderMeshConfig = MeshConfigWithSelectiveEffect & {
    cylinder?: Description_8["cylinder"] & {
        /**
         * To drape the mesh properly on the terrain,
         * the mesh must cover the terrain. Fixed at creation; remove and re-add
         * the mesh to change it.
         */
        draped?: boolean;
    };
    pickable?: boolean;
};

export declare class CylinderMeshDesc extends MeshDescWithSelectiveEffect<CylinderMeshConfig, CylinderMeshUpdate, DrapedMesh<CylinderGeometry, CylinderMeshMaterial, CylinderMeshEventMap>> {
    private config;
    private pickWrapper?;
    constructor(view: default_2, ctx: ViewContext, config: CylinderMeshConfig);
    /** The batch ID assigned to this mesh when picking is enabled. */
    get batchId(): number | undefined;
    createMesh(): DrapedMesh<CylinderGeometry, CylinderMeshMaterial, CylinderMeshEventMap>;
    private createMaterial;
    protected getPassKey(): PassKey;
    onUpdateConfig(updates: CylinderMeshUpdate): void;
    protected disposeMesh(): void;
    onDestroy(): void;
}

declare type CylinderMeshEventMap = Object3DEventMap & CustomObject3DEventMap;

declare type CylinderMeshMaterial = MeshLambertMaterial | MeshBasicMaterial;

export declare type CylinderMeshUpdate = MeshUpdateWithSelectiveEffect & Description_8;

export declare type CylindersDescription = SharedCylinderConfig & {
    children?: CylinderChildConfig[];
};

export declare const DEFAULT_AERIAL_PERSPECTIVE_LIGHTING_OPTIONS: Required<AerialPerspectiveLightingOptions>;

export declare const DEFAULT_AERIAL_PERSPECTIVE_OPTIONS: Required<AerialPerspectiveOptions>;

export declare const DEFAULT_ANTIALIAS_OPTIONS: AntialiasOptions;

export declare const DEFAULT_CLOUDS_OPTIONS: ResolvedCloudsOptions;

export declare const DEFAULT_COLOR_GRADING_LUT_OPTIONS: {
    url: string;
    blendMode: "colorBurn";
    opacity: number;
};

export declare const DEFAULT_DEPTH_OF_FIELD_OPTIONS: Required<DepthOfFieldOptions>;

export declare const DEFAULT_FOG_LIGHT_EFFECT_OPTIONS: FogLightEffectOptions;

export declare const DEFAULT_FOG_LIGHT_OPTIONS: FogLightOptions;

export declare const DEFAULT_GLOW_GLOBE_OPTIONS: Required<NonNullable<Description_7["glowGlobe"]>>;

export declare const DEFAULT_GLTF_MODEL_DESCRIPTION: NonNullable<Description_10["gltfModel"]>;

export declare const DEFAULT_LENS_FLARE_OPTIONS: Required<LensFlareOptions>;

export declare const DEFAULT_RAIN_DROP_OPTIONS: RainDropOptions;

export declare const DEFAULT_SKY_BOX_OPTIONS: Required<NonNullable<Description_14["skyBox"]>>;

export declare const DEFAULT_SSAO_OPTIONS: Required<SSAOOptions>;

export declare const DEFAULT_SSR_OPTIONS: Required<SSROptions>;

export declare const DEFAULT_STARS_OPTIONS: Required<StarsOptions>;

export declare const DEFAULT_TONE_MAPPING_OPTIONS: Required<ToneMappingOptions>;

export declare const DefaultArcLineConfig: ArcLineConfig;

export declare const DefaultRainConfig: RainConfig;

export declare const DefaultSmoothLineConfig: SmoothLineConfig;

export declare const DefaultSnowConfig: SnowConfig;

export declare class DepthOfField extends Effect<DepthOfFieldEffect, DepthOfFieldOptions> {
    constructor(camera: Camera, options?: DepthOfFieldOptions);
    protected onMounted(): void;
    get focusDistance(): number;
    set focusDistance(v: number);
    get focalLength(): number;
    set focalLength(v: number);
    get bokehScale(): number;
    set bokehScale(v: number);
}

export declare type DepthOfFieldConfig = Description_27 & EffectConfig;

export declare class DepthOfFieldEffectDesc extends EffectDesc<DepthOfFieldConfig, DepthOfFieldUpdate, DepthOfField> {
    static key: string;
    static insertAfter: string[];
    private config;
    constructor(view: default_2, ctx: ViewContext, config: DepthOfFieldConfig);
    createPass(): DepthOfField;
    onUpdateConfig(updates: DepthOfFieldUpdate): void;
}

export declare type DepthOfFieldOptions = {
    /** Normalized focus distance that defines where the focus plane is, Range is [0.0, 1.0]. */
    focusDistance?: number;
    /** Virtual lens focal length that controls how quickly sharpness falls off around the focus plane, Range is [0.0, 1.0]. */
    focalLength?: number;
    /** Multiplier applied to the blur kernel that scales the apparent size of bokeh highlights. */
    bokehScale?: number;
} & EffectOptions;

export declare type DepthOfFieldUpdate = Description_27 & EffectUpdate;

declare type Description = {
    rain?: Partial<RainConfig>;
};

declare type Description_10 = {
    gltfModel?: {
        url?: string;
        castShadow?: boolean;
        receiveShadow?: boolean;
        animationEnabled?: boolean;
        animationClips?: string[];
        animationActiveClip?: string;
        animationSpeed?: number;
        animationLoop?: boolean;
        animationCrossfadeDuration?: number;
        animationAutoPlay?: boolean;
        emissiveColor?: Color_2;
        emissiveIntensity?: number;
    };
};

declare type Description_11 = {
    tube?: {
        points?: XYZ[];
        tubularSegments?: number;
        radius?: number;
        radialSegments?: number;
        closed?: boolean;
        tension?: number;
        color?: Color_2;
        emissiveColor?: Color_2;
        emissiveIntensity?: number;
        opacity?: number;
        transparent?: boolean;
        castShadow?: boolean;
        receiveShadow?: boolean;
        effectIds?: string[];
    };
};

declare type Description_12 = {
    arcLines?: Partial<ArcLineConfig> | Partial<ArcLineConfig>[];
    emissiveColor?: Color_2;
    emissiveIntensity?: number;
};

declare type Description_13 = {
    smoothLines?: Partial<SmoothLineConfig> | Partial<SmoothLineConfig>[];
};

declare type Description_14 = {
    skyBox?: {
        dayColor?: Color_2;
        nightColor?: Color_2;
        sunColor?: Color_2;
    };
};

declare type Description_15 = {
    arrowHelper?: {
        direction: XYZ;
        origin?: XYZ;
        length?: number;
        color?: Color_2;
        headLength?: number;
        headWidth?: number;
    };
};

declare type Description_16 = {
    axesHelper?: {
        size?: number;
    };
};

declare type Description_17 = {
    boxes?: BoxesDescription;
};

declare type Description_18 = {
    spheres?: SpheresDescription;
};

declare type Description_19 = {
    planes?: PlanesDescription;
};

declare type Description_2 = {
    snow?: Partial<SnowConfig>;
};

declare type Description_20 = {
    cylinders?: CylindersDescription;
};

declare type Description_21 = {
    gltfModels?: InstancedModelsDescription;
};

declare type Description_22 = {
    polygon?: PolygonMeshStyle & PositionSource & {
        /**
         * Shades a clamped polygon with the terrain's normal at each pixel, so
         * it takes the terrain's light and shade. Otherwise it is shaded with
         * the ellipsoid's normal, which skips the full-screen copy of the
         * terrain normals.
         */
        useGroundNormals?: boolean;
    };
};

declare type Description_23 = {
    polyline?: PolylineMeshStyle & PositionSource & {
        /** Join a repeated first position as a seam instead of two end caps. */
        ring?: boolean;
        /**
         * Light a `clampToGround` line with the terrain normal instead of the
         * volume's.
         *
         * Off by default because it costs a full-screen copy of the globe normal
         * buffer. Enable it only where the globe writes normals: without them,
         * e.g. a `raster-dem` terrain without a `hillshade` layer, the line is
         * shaded with an undefined normal.
         */
        useGroundNormals?: boolean;
    };
};

/**
 * The flat `shadow*` and `specular*` keys are the lighting terms.
 * `irradiance` lighting is Lambertian only, so it drops the cascaded shadows
 * (`view.lit = false` skips the forward shadow term) and has no specular; the
 * terms add them back inside the aerial perspective's own lighting. Both
 * require `irradiance` and `useNormalBuffer`. Cloud shadows belong to the
 * clouds effect.
 */
declare type Description_24 = {
    aerialPerspective?: Omit<AerialPerspectiveOptions, "enabled">;
};

declare type Description_25 = {
    clouds?: Omit<CloudsOptions, "enabled">;
};

declare type Description_26 = {
    colorGradingLUT?: ColorGradingLUTOptions;
};

declare type Description_27 = {
    depthOfField?: Omit<DepthOfFieldOptions, "enabled">;
};

declare type Description_28 = {
    fogLight?: Omit<FogLightOptions, "enabled">;
};

declare type Description_29 = {
    fxaa?: {};
};

declare type Description_3 = {
    sky?: Partial<SkyMeshOptions>;
};

declare type Description_30 = {
    lensFlare?: Omit<LensFlareOptions, "enabled">;
};

declare type Description_31 = {
    rainDrop?: Omit<RainDropOptions, "enabled">;
};

declare type Description_32 = {
    smaa?: Omit<AntialiasOptions, "enabled">;
};

declare type Description_33 = {
    ssao?: Omit<SSAOOptions, "enabled">;
};

declare type Description_34 = {
    ssr?: Omit<SSROptions, "enabled">;
};

declare type Description_35 = {
    toneMapping?: Omit<ToneMappingOptions, "enabled">;
};

declare type Description_36 = {
    ambient?: Omit<AmbientLightOptions, "color"> & {
        color?: Color_2;
    };
};

declare type Description_37 = {
    /**
     * Sun light configuration options. Includes all CSM (Cascaded Shadow Maps) settings.
     * Color can be specified as a number (hex value) or Navara Color instance.
     */
    sun?: Omit<SunLightOptions, "color"> & {
        color?: Color_2;
    };
};

declare type Description_38 = {
    skyLightProbe?: SkyLightProbeOptions;
};

declare type Description_39 = {
    lightProbe?: {
        intensity?: number;
        sh?: SphericalHarmonics3;
        coefficients?: number[][];
    };
};

declare type Description_4 = {
    stars?: Partial<StarsOptions> & {
        assetsUrl?: string;
    };
};

declare type Description_5 = {
    box?: {
        width?: number;
        height?: number;
        depth?: number;
        widthSegments?: number;
        heightSegments?: number;
        depthSegments?: number;
        color?: Color_2;
        emissiveColor?: Color_2;
        emissiveIntensity?: number;
        opacity?: number;
        transparent?: boolean;
        castShadow?: boolean;
        receiveShadow?: boolean;
        effectIds?: string[];
    };
};

declare type Description_6 = {
    sphere?: {
        radius?: number;
        widthSegments?: number;
        heightSegments?: number;
        phiStart?: number;
        phiLength?: number;
        thetaStart?: number;
        thetaLength?: number;
        color?: Color_2;
        emissiveColor?: Color_2;
        emissiveIntensity?: number;
        opacity?: number;
        transparent?: boolean;
        castShadow?: boolean;
        receiveShadow?: boolean;
        effectIds?: string[];
    };
};

declare type Description_7 = {
    /**
     * Configuration for the glow globe mesh descriptor.
     *
     * Implements a Fresnel-based glow effect that creates a halo
     * around a spherical body. The glow intensity varies based on the viewing angle,
     * with maximum intensity at the center and minimum at the edges.
     */
    glowGlobe?: {
        /**
         * The scale factor for the glow globe radius relative to the WGS84 semi-major axis.
         *
         * This value is multiplied by the WGS84 semi-major axis (Earth's equatorial radius)
         * to determine the final glow globe radius. Values greater than 1.0 create a glow
         * globe larger than Earth, which is necessary for the atmospheric effect to be visible
         * around the surface. The globe also respects Earth's flattening factor to maintain
         * an oblate spheroid shape matching the planet.
         *
         * @default 1.2 (120% of Earth's equatorial radius: ~7,653,764 meters)
         * @example 1.1 - Glow globe 10% larger than Earth (typical atmospheric effect)
         * @example 1.05 - Subtle glow close to the surface
         * @example 1.2 - Extended atmospheric glow
         */
        radiusScale?: number;
        /**
         * The coefficient controlling the glow threshold in the Fresnel calculation.
         *
         * This value is subtracted from the facing ratio (dot product of surface normal
         * and view direction) to control where the glow begins. Higher values create
         * a more pronounced glow that extends further toward the edges of the globe.
         *
         * Formula: `intensity = pow(max(coefficient - facing_ratio, 0.0), exponent)`
         *
         * @default 0.5
         * @range Typically 0.0 to 1.0, though values outside this range are valid
         */
        coefficient?: number;
        /**
         * The exponent controlling the glow falloff intensity in the Fresnel calculation.
         *
         * Higher values create a sharper, more concentrated glow at the center.
         * Lower values create a softer, more diffuse glow that extends outward.
         * This parameter controls how quickly the glow intensity decreases from
         * the center toward the edges of the globe.
         *
         * Formula: `intensity = pow(max(coefficient - facing_ratio, 0.0), exponent)`
         *
         * @default 5.0
         * @range Typically 1.0 to 10.0, though higher values are valid
         */
        exponent?: number;
        /**
         * The color of the glow effect as a hexadecimal value or NavaraColor instance.
         *
         * Accepts standard hex color formats (e.g., 0x8cf3ff for light cyan) or
         * a NavaraColor instance. The RGB components determine the hue of the glow,
         * which is then modulated by the calculated Fresnel intensity and the opacity value.
         *
         * @default 0x8cf3ff - Light cyan
         * @example 0xff0000 - Red glow
         * @example 0x00ff00 - Green glow
         * @example 0x0080ff - Blue glow
         * @example new Color().setHex(0xff0000) - Red glow using Color instance
         */
        glowColor?: Color_2;
        /**
         * The opacity/alpha channel of the glow effect.
         *
         * Controls the overall transparency of the glow layer. This value is used
         * as the alpha component in the shader's color uniform. Lower values create
         * a more subtle, transparent glow, while higher values make it more opaque.
         *
         * @default 0.5
         * @range 0.0 (fully transparent) to 1.0 (fully opaque)
         */
        opacity?: number;
    };
};

declare type Description_8 = {
    cylinder?: {
        radiusTop?: number;
        radiusBottom?: number;
        height?: number;
        radialSegments?: number;
        heightSegments?: number;
        openEnded?: boolean;
        thetaStart?: number;
        thetaLength?: number;
        color?: Color_2;
        emissiveColor?: Color_2;
        emissiveIntensity?: number;
        opacity?: number;
        transparent?: boolean;
        castShadow?: boolean;
        receiveShadow?: boolean;
        effectIds?: string[];
    };
};

declare type Description_9 = {
    plane?: {
        width?: number;
        height?: number;
        widthSegments?: number;
        heightSegments?: number;
        color?: Color_2;
        emissiveColor?: Color_2;
        emissiveIntensity?: number;
        opacity?: number;
        transparent?: boolean;
        castShadow?: boolean;
        receiveShadow?: boolean;
        effectIds?: string[];
    };
};

declare type DescriptionUpdate = {
    gltfModels?: Partial<InstancedModelsDescription>;
};

export declare type EdgeDetectionMode = "color" | "depth" | "luma";

/**
 * A pickable draped mesh for the standalone polygon.
 *
 * The material enhancer already declares the pick shader, so
 * `PickableMeshWrapper` would redefine it. Picking toggles the enhancer's
 * `pickable` prop instead.
 */
declare class FeatureDrapedMesh<M extends Material, E extends Object3DEventMap> extends DrapedMesh<BufferGeometry, M, E> implements PickableMesh {
    readonly batchId: number;
    private setPickable;
    constructor(geometry: BufferGeometry, material: M, draped: boolean, batchId: number, setPickable: (pickable: boolean) => void);
    onBeforePicking(): void;
    onAfterPicking(): void;
    getRenderable(): Object3D;
}

/** {@link FeatureDrapedMesh} without the stencil drape, for the polyline. */
declare class FeatureMesh<M extends Material, E extends Object3DEventMap> extends Mesh<BufferGeometry, M, E> implements PickableMesh {
    readonly batchId: number;
    private setPickable;
    constructor(geometry: BufferGeometry, material: M, batchId: number, setPickable: (pickable: boolean) => void);
    onBeforePicking(): void;
    onAfterPicking(): void;
    getRenderable(): Object3D;
}

export declare class FogLight extends Pass<FogLightDownsampledPass, FogLightEffect, FogLightOptions, FogLightEvents> {
    constructor(camera: Camera, options?: FogLightOptions);
    setNormalBuffer(texture: Texture | null): void;
    protected onMounted(): void;
    private updateLights;
    private updateFogDensity;
    get lights(): FogLightDefinition[];
    set lights(lights: FogLightDefinition[]);
    get fogDensity(): number;
    set fogDensity(value: number);
    get useSurfaceLighting(): boolean;
    set useSurfaceLighting(value: boolean);
    private updateUseSurfaceLighting;
    get downsample(): number;
    set downsample(value: number);
    get maxLightsPerTile(): number;
    set maxLightsPerTile(value: number);
    get extentScale(): number;
    set extentScale(value: number);
    get maxFar(): number;
    set maxFar(value: number);
    get haloFalloff(): number;
    set haloFalloff(value: number);
    get debugShowGrid(): boolean;
    set debugShowGrid(v: boolean);
}

export declare type FogLightConfig = Description_28 & EffectConfig;

export declare type FogLightDefinition = {
    /** Light position in world (ECEF) coordinates */
    position: {
        x: number;
        y: number;
        z: number;
    };
    color: number | Color_2;
    intensity: number;
    /** World-space influence radius of the fog light. Defaults to 500 if omitted. */
    radius?: number;
};

declare type FogLightDownsampledOptions = {
    /** 1: full-res, 2: half, 4: quarter */
    downsample: number;
};

declare class FogLightDownsampledPass extends Pass_2 {
    private options;
    private inner;
    private effect;
    private innerCamera;
    private lowRT;
    private compositeMat;
    readonly resolution: Resolution;
    constructor(camera: PerspectiveCamera | OrthographicCamera, effect: FogLightEffect, opts: FogLightDownsampledOptions);
    setDepthTexture(depthTexture: Texture, depthPacking?: DepthPackingStrategies): void;
    render(renderer: WebGLRenderer, inputBuffer: WebGLRenderTarget, outputBuffer: WebGLRenderTarget | null, deltaTime: number, stencilTest?: boolean): void;
    setSize(width: number, height: number): void;
    initialize(renderer: WebGLRenderer, alpha: boolean, frameBufferType: TextureDataType): void;
    dispose(): void;
    get downsample(): number;
    set downsample(value: number);
}

export declare class FogLightEffect extends Effect_2 {
    private camera;
    private invProjectionMatrix;
    private invViewMatrix;
    private viewMatrix;
    private _vpM;
    private lightTex0;
    private lightTex1;
    private buf0;
    private buf1;
    private userRadii;
    private depthCopyPass;
    private tileGrid;
    private _extentScale;
    private _maxFar;
    private _gridDirty;
    private _prevVpM;
    private _prevFogDensity;
    constructor(camera: PerspectiveCamera | OrthographicCamera, options?: FogLightEffectOptions);
    setDepthTexture(depthTexture: Texture, depthPacking?: DepthPackingStrategies): void;
    update(renderer: WebGLRenderer, inputBuffer: WebGLRenderTarget, deltaTime: number): void;
    writeLight(i: number, color: Color_2, intensity: number, position: Vector3, radius?: number): void;
    updateLightTextures(): void;
    /** Number of light slots the data textures currently hold. */
    get lightCapacity(): number;
    /** Grow the light data textures so at least `count` lights fit. */
    ensureLightCapacity(count: number): void;
    updateDepthBuffer(depthBuffer: Texture | null): void;
    setSize(width: number, height: number): void;
    /** Low-resolution copy of the scene depth, for depth-aware upsampling. */
    get copiedDepthTexture(): Texture;
    /** Toggle fog-only output (used by the downsampled composite path). */
    setFogOnlyOutput(enabled: boolean): void;
    get lightCount(): number;
    set maxLightsPerTile(v: number);
    get maxLightsPerTile(): number;
    set extentScale(v: number);
    get extentScale(): number;
    set maxFar(v: number);
    get maxFar(): number;
    set haloFalloff(v: number);
    get haloFalloff(): number;
    set debugShowGrid(v: boolean);
    get debugShowGrid(): boolean;
    private syncTileGridUniforms;
}

export declare class FogLightEffectDesc extends EffectDesc<FogLightConfig, FogLightUpdate, FogLight> {
    static key: string;
    static requiredBuffers: readonly GBufferName[];
    static insertBefore: string[];
    static allowDuplication: boolean;
    private config;
    constructor(view: default_2, ctx: ViewContext, config: FogLightConfig);
    createPass(): FogLight;
    update(_time: number): void;
    onUpdateConfig(updates: FogLightUpdate): void;
}

export declare type FogLightEffectOptions = {
    /** Array of fog light definitions with position, color, and intensity */
    lights?: FogLightDefinition[];
    /** Density of the volumetric fog (default: 5) */
    fogDensity?: number;
    /**
     * Initial light capacity hint (default: 100). The light textures grow
     * automatically when more lights are set, so this only pre-sizes them.
     */
    maxLights?: number;
    /** Optional normal buffer texture for surface lighting calculations */
    normalBuffer?: Texture;
    /** Whether to apply surface lighting effects (default: true) */
    useSurfaceLighting?: boolean;
    /** Tile size in pixels for tiled/clustered culling */
    tileSize?: number;
    /**
     * Maximum lights evaluated per tile on GPU (default: 64). Acts as a
     * quality/cost dial: shader cost scales roughly linearly with it, and
     * lights beyond the cap degrade into the smooth residual haze instead of
     * disappearing.
     */
    maxLightsPerTile?: number;
    /** Safety scale applied to the effective range for tile registration */
    extentScale?: number;
    /**
     * Falloff coefficient of the halo attenuation 1/(1 + haloFalloff * h),
     * where h is the ray's closest distance to the light in meters
     * (default: 0.1). Higher values tighten halos around their lights —
     * useful to suppress ghost-like glow from lights hidden behind terrain,
     * which the fog model cannot shadow.
     */
    haloFalloff?: number;
    /** Debug: show grid extent overlay in the shader */
    debugShowGrid?: boolean;
    /**
     * Maximum distance from the camera at which fog lights are considered.
     * Lights whose entire influence sphere is farther than this value are
     * culled on CPU. Defaults to the camera's `far` value at effect creation.
     */
    maxFar?: number;
};

export declare type FogLightEvents = EffectEvents;

export declare type FogLightOptions = FogLightEffectOptions & EffectOptions & {
    /**
     * Fog render scale divisor: 1 = full-res, 2 = half, 4 = quarter
     * (default: 4). The low-res fog is composited back with depth-aware
     * upsampling, so higher divisors stay clean along silhouettes.
     */
    downsample?: number;
};

export declare type FogLightUpdate = Description_28 & EffectUpdate;

export declare class FXAA extends Effect<FXAAEffect, AntialiasOptions> {
    constructor(camera: Camera, options?: AntialiasOptions);
}

export declare type FXAAConfig = Description_29 & EffectConfig;

export declare class FXAAEffectDesc extends EffectDesc<FXAAConfig, FXAAUpdate, FXAA> {
    static key: string;
    static insertBefore: string[];
    createPass(): FXAA;
}

export declare type FXAAUpdate = Description_29 & EffectUpdate;

/**
 * Position input for the standalone polygon and polyline meshes, in the
 * mesh's local space: geodetic input is local ECEF. The geometry builder
 * needs globe coordinates, so the mesh transform is applied at build time and
 * the mesh object itself stays at identity.
 */
/** Geographic positions: lng/lat in degrees, height in metres. */
declare type GeodeticPositions = readonly LatLngHeight[];

/** Rings of a polygon: the outer ring first, then holes. */
declare type GeodeticRings = GeodeticPositions | readonly GeodeticPositions[];

export declare type GlowGlobeMeshConfig = MeshConfig & Description_7;

export declare class GlowGlobeMeshDesc extends MeshDesc<GlowGlobeMeshConfig, GlowGlobeMeshUpdate, Mesh<SphereGeometry, ShaderMaterial>> {
    private config;
    constructor(view: default_2, ctx: ViewContext, config: GlowGlobeMeshConfig);
    createMesh(): Mesh<SphereGeometry, ShaderMaterial, Object3DEventMap>;
    onUpdateConfig(updates: GlowGlobeMeshUpdate): void;
    protected disposeMesh(): void;
}

export declare type GlowGlobeMeshUpdate = MeshUpdate & Description_7;

export declare type GLTFModelConfig = MeshConfig & Description_10 & {
    pickable?: boolean;
};

export declare class GLTFModelDesc extends MeshDesc<GLTFModelConfig, GLTFModelUpdate, Group, GLTFModelEvent> {
    private config;
    private loader;
    private gltf;
    private mixer;
    private clips;
    private actions;
    private currentAction;
    private animationSpeed;
    private isLooping;
    private activeBlendAnimations;
    private isBlendMode;
    private originalWorldPosition;
    private modelPositionHigh;
    private modelPositionLow;
    private rteUserData;
    private pickWrapper?;
    /** The batch ID assigned to this model when picking is enabled (after load). */
    get batchId(): number | undefined;
    constructor(view: default_2, ctx: ViewContext, config: GLTFModelConfig);
    /**
     * Render into the MRT G-buffer rather than the plain opaque pass, so the
     * model contributes its normal/depth to deferred lighting (aerial
     * perspective, irradiance). The opaque pass writes only color into a
     * single-attachment target, which would leave the model wearing the
     * terrain's G-buffer normal. (Matches the descriptor's pre-revert default.)
     */
    protected getPassKey(): PassKey;
    onCreate(): void;
    createMesh(): Group;
    private loadModel;
    private setupModel;
    /**
     * Drive emissive glow on the loaded model's child materials from the
     * declarative `emissiveColor` / `emissiveIntensity` config. Standard GLTF
     * materials expose an `emissive` color that feeds the emissive MRT slot, so
     * tinting them here matches the behavior of the non-GLTF meshes.
     */
    private applyEmissive;
    /**
     * Override a material that is used to generate a shadow map.
     * Uses the shadowMapDepthEnhancer to inject shadow map depth shaders.
     */
    private initDepthMaterial;
    private setPositionRTE;
    /**
     * Decomposes the effective world transform (matrixWorld * T*R*S) into:
     * - Translation → encoded as RTE position uniforms
     * - Rotation/Scale → set on raw.matrixWorld for the shader's modelMatrix uniform
     *
     * This allows matrixWorld (e.g. NUE-to-ECEF frame) to work correctly with RTE
     * by keeping the high-precision position in uniforms while the shader's modelMatrix
     * only contains rotation and scale.
     */
    private applyRTETransform;
    /**
     * A terrain-height observation (under `geodetic` + `heightReference:
     * "terrain"`) must redo the RTE split, not the base class's direct
     * `matrixWorld` write — the encoded RTE position uniforms would otherwise
     * go stale while `matrixWorld` moved out from under them.
     */
    protected reapplyGeodeticFrame(): void;
    private setupRTEShadersForMesh;
    private modifyMaterialForRTE;
    onUpdateConfig(updates: GLTFModelUpdate): void;
    onDestroy(): void;
    protected disposeMesh(): void;
    /**
     * Dispose animation-related resources
     */
    private disposeAnimationResources;
    private shouldInitializeAnimation;
    private initAnimation;
    /**
     * Get available animation clip names
     */
    getAnimationAvailable(): string[];
    /**
     * Get animation details information
     */
    getAnimationDetails(name?: string): AnimationDetails | AnimationDetails[];
    /**
     * Get current playback state
     */
    getAnimationCurrentState(): AnimationState;
    /**
     * Get animation clip directly
     */
    getAnimationClip(name: string): AnimationClip | null;
    /**
     * Get animation action directly
     */
    getAnimationAction(name: string): AnimationAction | null;
    /**
     * Play specified animation
     */
    playAnimation(name: string): boolean;
    /**
     * Cross-fade between animations
     */
    crossFadeAnimation(from: string, to: string, duration: number): boolean;
    /**
     * Ensure the specified animation is playing
     */
    private ensureAnimationPlaying;
    /**
     * Ensure the 'from' animation is currently active
     */
    private ensureFromAnimationActive;
    /**
     * Execute the actual crossfade between animations
     */
    private executeCrossFade;
    /**
     * Play multiple animations simultaneously with weights
     */
    blendAnimations(animations: {
        name: string;
        weight: number;
    }[]): void;
    /**
     * Stop current animation
     */
    stopAnimation(): void;
    /**
     * Stop all animations
     */
    stopAllAnimations(): void;
    /**
     * Pause current animation
     */
    pauseAnimation(): void;
    /**
     * Resume paused animation
     */
    resumeAnimation(): void;
    /**
     * Normalize all animation weights (adjust total to 1.0)
     */
    normalizeAnimationWeights(): void;
    /**
     * Set animation speed
     */
    setAnimationSpeed(speed: number): void;
    /**
     * Change animation loop setting
     */
    setAnimationLoop(loop: boolean): void;
    /**
     * Set weight for specific animation
     */
    setAnimationWeight(name: string, weight: number): void;
    /**
     * Update animation mixer (needs to be called every frame)
     */
    updateAnimation(deltaTime: number): void;
    /**
     * Dispose animation-related resources
     */
    disposeAnimation(): void;
    /**
     * Internal method to update animation mixer
     */
    private updateAnimationMixer;
    /**
     * Update method called every frame
     * Automatically called by Three.js framework
     */
    update(time: number): void;
    /**
     * Get currently playing animation name
     */
    private getCurrentAnimationName;
    getWorldPosition(): Vector3;
    private lastUpdateTime?;
}

export declare type GLTFModelEvent = {
    load: () => void;
    error: (error: unknown) => void;
    animationReady: () => void;
    needsUpdate: () => void;
};

export declare type GLTFModelUpdate = MeshUpdate & Description_10;

export declare type InstancedBoxMeshConfig = InstancedMeshConfig & Description_17 & {
    pickable?: boolean;
};

export declare class InstancedBoxMeshDesc extends InstancedMeshDesc<BoxGeometry, MeshLambertMaterial, InstancedBoxMeshConfig, InstancedBoxMeshUpdate, BoxChildConfig> {
    private config;
    private pickWrapper?;
    constructor(view: default_2, ctx: ViewContext, config: InstancedBoxMeshConfig);
    /** Per-instance batch IDs when picking is enabled. */
    get batchIds(): readonly number[];
    private get boxesConfig();
    protected getChildConfigs(): BoxChildConfig[];
    protected createGeometry(): BoxGeometry;
    protected createMaterial(): MeshLambertMaterial;
    protected getInstanceScale(config: BoxChildConfig, target: Vector3): void;
    protected getInstanceColor(config: BoxChildConfig): Color | undefined;
    onCreate(): void;
    protected onInstanceAdded(_index: number): void;
    protected onInstanceRemoved(index: number, _wasLast: boolean): void;
    protected onInstancesCleared(): void;
    protected onInstancesReplaced(count: number): void;
    protected onInstanceMeshReplaced(newMesh: InstancedMesh<BoxGeometry, MeshLambertMaterial>): void;
    onUpdateConfig(updates: InstancedBoxMeshUpdate): void;
    onDestroy(): void;
}

export declare type InstancedBoxMeshUpdate = InstancedMeshUpdate & Description_17;

export declare type InstancedCylinderMeshConfig = InstancedMeshConfig & Description_20 & {
    pickable?: boolean;
};

export declare class InstancedCylinderMeshDesc extends InstancedMeshDesc<CylinderGeometry, MeshLambertMaterial, InstancedCylinderMeshConfig, InstancedCylinderMeshUpdate, CylinderChildConfig> {
    private config;
    private pickWrapper?;
    constructor(view: default_2, ctx: ViewContext, config: InstancedCylinderMeshConfig);
    get batchIds(): readonly number[];
    private get cylindersConfig();
    protected getChildConfigs(): CylinderChildConfig[];
    protected createGeometry(): CylinderGeometry;
    protected createMaterial(): MeshLambertMaterial;
    protected getInstanceScale(config: CylinderChildConfig, target: Vector3): void;
    protected getInstanceColor(config: CylinderChildConfig): Color | undefined;
    onCreate(): void;
    protected onInstanceAdded(_index: number): void;
    protected onInstanceRemoved(index: number, _wasLast: boolean): void;
    protected onInstancesCleared(): void;
    protected onInstancesReplaced(count: number): void;
    protected onInstanceMeshReplaced(newMesh: InstancedMesh<CylinderGeometry, MeshLambertMaterial>): void;
    onUpdateConfig(updates: InstancedCylinderMeshUpdate): void;
    onDestroy(): void;
}

export declare type InstancedCylinderMeshUpdate = InstancedMeshUpdate & Description_20;

export declare type InstancedGltfModelEvent = {
    load: () => void;
    error: (error: unknown) => void;
    needsUpdate: () => void;
};

export declare type InstancedGltfModelMeshConfig = MeshConfig & Description_21 & {
    pickable?: boolean;
};

/**
 * Instanced GLTF model descriptor.
 *
 * Loads a GLTF once, then fans out every `Mesh` node into a sibling
 * `InstancedMesh` sharing one per-instance matrix slot per model instance.
 *
 * Two internal paths are selected based on the model contents:
 *
 * - **Non-skinned path (instanced):** every `Mesh` node becomes an
 *   `InstancedMesh`. All instances share one `AnimationMixer` running on the
 *   source scene; per-frame, we re-sample each source mesh's `matrixWorld` and
 *   rewrite every instance's matrix as `T_i * sourceLocal_s`. Node-TRS and
 *   morph-target animations both play back correctly.
 * - **Skinned path (per-instance clone fallback):** because three.js's core
 *   `InstancedMesh` cannot apply skinning, skinned GLTFs fall back to one
 *   `SkeletonUtils.clone` per instance, each with its own `AnimationMixer`.
 *   This gives up instanced rendering for the skinned parts, but keeps the
 *   same desc API and plays shared clips in lockstep across clones.
 *
 * Limitations:
 * - Skinned-path picking is currently unsupported (`batchIds` is empty).
 */
export declare class InstancedGltfModelMeshDesc extends MeshDesc<InstancedGltfModelMeshConfig, InstancedGltfModelMeshUpdate, Group, InstancedGltfModelEvent> {
    private config;
    private loader;
    private gltf;
    private subMeshes;
    private capacity;
    private hasSkinned;
    private skinnedScenes;
    private anims;
    private configs;
    private lastUpdateTime?;
    private pickWrapper?;
    private rteAnchor;
    private rtePosHigh;
    private rtePosLow;
    private rteUserData;
    private rtePatchedMaterials;
    constructor(view: default_2, ctx: ViewContext, config: InstancedGltfModelMeshConfig);
    get batchIds(): readonly number[];
    get count(): number;
    /** Names of animation clips found in the GLTF. Available after `load`. */
    get animationClips(): readonly string[];
    createMesh(): Group;
    /**
     * Render into the MRT G-buffer rather than the plain opaque pass, so the
     * instances contribute their normal/depth to deferred lighting (aerial
     * perspective, irradiance). The opaque pass writes only color into a
     * single-attachment target, which would leave the models wearing the
     * terrain's G-buffer normal. (Matches the descriptor's pre-revert default.)
     */
    protected getPassKey(): PassKey;
    onCreate(): void;
    /**
     * Pulls the translation out of `raw.matrixWorld` into RTE uniforms, and
     * rebuilds `raw.matrixWorld` with rotation+scale only. Safe to call again
     * after the user updates `matrixWorld`.
     */
    private captureAnchorFromMatrixWorld;
    /**
     * A terrain-height observation (under `geodetic` + `heightReference:
     * "terrain"`) must redo the RTE anchor capture, not just the base class's
     * direct `matrixWorld` write — the rtePosHigh/rtePosLow uniforms would
     * otherwise go stale while `matrixWorld` moved out from under them.
     */
    protected reapplyGeodeticFrame(): void;
    /**
     * Inject RTE shader chunks into a material. The chunk branches on
     * `USE_INSTANCING` internally, so the same patch works for both
     * `InstancedMesh` sub-meshes (non-skinned path) and `SkeletonUtils.clone`
     * fallback meshes (skinned path).
     */
    private modifyMaterialForRTE;
    /** Patch every material reachable from a scene graph for RTE + shadows. */
    private patchMaterials;
    /**
     * Apply the shared material overrides (`emissiveColor` / `emissiveIntensity` /
     * `opacity` / `transparent`) from the config to every material reachable from
     * `root`. Loaded GLTF materials expose a standard `emissive` color, which
     * feeds the emissive MRT slot the same way the non-instanced meshes do.
     */
    private applyMaterialOverrides;
    /**
     * Install the per-frame RTE callback on a mesh. The callback writes shared
     * uniforms (same values regardless of which mesh drives it), so we install
     * on every mesh that might be rendered — that way the uniforms stay live
     * even when individual meshes/clones are removed via removeAt/clear/grow.
     *
     * The shadow pass is handled separately by {@link setupShadowDepth}, which
     * the caller must install on every shadow-casting mesh (not just the RTE
     * callback host): the built-in depth material carries no RTE shader chunks,
     * and `modelViewMatrix` is per-mesh, so the RTE uniforms alone would draw the
     * shadow at the translation-stripped origin.
     */
    private installRTECallback;
    /**
     * Make the shadow/depth pass draw the mesh at its true ECEF position. That
     * pass uses three.js' built-in depth material, which has no RTE shader
     * chunks, so we restore the full translation on the CPU: rebuild the world
     * matrix with `rteAnchor` added back and write `shadowCamera.matrixWorldInverse
     * × fullMatrix` straight into `modelViewMatrix`. The product is formed in JS
     * f64 and only the small, view-relative result is uploaded as f32, so no
     * precision is lost. For an `InstancedMesh` the GPU applies each
     * `instanceMatrix` on top of this shared base.
     */
    private setupShadowDepth;
    private loadModel;
    /** Build an Anim slot whose mixer drives `target`. */
    private createAnim;
    private playOn;
    private stopOn;
    playAnimation(name: string): void;
    stopAnimation(): void;
    private initInstancedPath;
    private composeInstanceTransform;
    /** Apply a ModelChildConfig to an Object3D via compose/decompose. */
    private applyTransformToObject;
    /** Write instance slot `i` into every sub-mesh as `T_i * sourceLocal_s`. */
    private writeInstanceAt;
    /**
     * Set per-instance tint on every sub-mesh. Three.js's `setColorAt` lazily
     * allocates `instanceColor` (filled white) on first call, so omitting color
     * stays free until at least one instance opts in. Once `instanceColor`
     * exists, an unset color resets the slot to white so stale colors from a
     * prior occupant (after swap-with-last removal or replaceAll) don't leak.
     */
    private writeColorAt;
    /**
     * Rewrite every instance's matrix for every sub-mesh using the
     * current per-frame `sourceMesh.matrixWorld` instead of the baked local.
     * Only needed when the mixer actually moves node TRS.
     */
    private resampleAndRewriteAll;
    private markAllInstancesDirty;
    private initSkinnedPath;
    private addSkinnedInstance;
    /** Add a new instance. Returns its index. */
    add(config: ModelChildConfig): number;
    removeAt(index: number): void;
    updateAt(index: number, config: Partial<ModelChildConfig>): void;
    clear(): void;
    replaceAll(configs: ModelChildConfig[]): void;
    private grow;
    /** Copy morph-target influences from each source mesh to its sub-InstancedMesh. */
    private syncMorphTargets;
    update(time: number): void;
    onUpdateConfig(updates: InstancedGltfModelMeshUpdate): void;
    onDestroy(): void;
}

export declare type InstancedGltfModelMeshUpdate = MeshUpdate & DescriptionUpdate;

export declare type InstancedModelsDescription = {
    url: string;
    castShadow?: boolean;
    receiveShadow?: boolean;
    /** Emissive color written to the MRT emissive slot (shared across all instances). */
    emissiveColor?: Color_2;
    /** Multiplier on the emissive color (default 0 = no emission). */
    emissiveIntensity?: number;
    /** Opacity of the material (0–1). */
    opacity?: number;
    /** Enable alpha blending when true. */
    transparent?: boolean;
    /** Animation clip name to play (shared across all instances). */
    animationActiveClip?: string;
    /** Playback speed (default 1). Shared across all instances. */
    animationSpeed?: number;
    /** Whether the clip loops (default true). */
    animationLoop?: boolean;
    /** Auto-start the configured clip on load (default false). */
    animationAutoPlay?: boolean;
    children?: ModelChildConfig[];
};

export declare type InstancedPlaneMeshConfig = InstancedMeshConfig & Description_19 & {
    pickable?: boolean;
};

export declare class InstancedPlaneMeshDesc extends InstancedMeshDesc<PlaneGeometry, MeshLambertMaterial, InstancedPlaneMeshConfig, InstancedPlaneMeshUpdate, PlaneChildConfig> {
    private config;
    private pickWrapper?;
    constructor(view: default_2, ctx: ViewContext, config: InstancedPlaneMeshConfig);
    get batchIds(): readonly number[];
    private get planesConfig();
    protected getChildConfigs(): PlaneChildConfig[];
    protected createGeometry(): PlaneGeometry;
    protected createMaterial(): MeshLambertMaterial;
    protected getInstanceScale(config: PlaneChildConfig, target: Vector3): void;
    protected getInstanceColor(config: PlaneChildConfig): Color | undefined;
    onCreate(): void;
    protected onInstanceAdded(_index: number): void;
    protected onInstanceRemoved(index: number, _wasLast: boolean): void;
    protected onInstancesCleared(): void;
    protected onInstancesReplaced(count: number): void;
    protected onInstanceMeshReplaced(newMesh: InstancedMesh<PlaneGeometry, MeshLambertMaterial>): void;
    onUpdateConfig(updates: InstancedPlaneMeshUpdate): void;
    onDestroy(): void;
}

export declare type InstancedPlaneMeshUpdate = InstancedMeshUpdate & Description_19;

export declare type InstancedSphereMeshConfig = InstancedMeshConfig & Description_18 & {
    pickable?: boolean;
};

export declare class InstancedSphereMeshDesc extends InstancedMeshDesc<SphereGeometry, MeshLambertMaterial, InstancedSphereMeshConfig, InstancedSphereMeshUpdate, SphereChildConfig> {
    private config;
    private pickWrapper?;
    constructor(view: default_2, ctx: ViewContext, config: InstancedSphereMeshConfig);
    get batchIds(): readonly number[];
    private get spheresConfig();
    protected getChildConfigs(): SphereChildConfig[];
    protected createGeometry(): SphereGeometry;
    protected createMaterial(): MeshLambertMaterial;
    protected getInstanceScale(config: SphereChildConfig, target: Vector3): void;
    protected getInstanceColor(config: SphereChildConfig): Color | undefined;
    onCreate(): void;
    protected onInstanceAdded(_index: number): void;
    protected onInstanceRemoved(index: number, _wasLast: boolean): void;
    protected onInstancesCleared(): void;
    protected onInstancesReplaced(count: number): void;
    protected onInstanceMeshReplaced(newMesh: InstancedMesh<SphereGeometry, MeshLambertMaterial>): void;
    onUpdateConfig(updates: InstancedSphereMeshUpdate): void;
    onDestroy(): void;
}

export declare type InstancedSphereMeshUpdate = InstancedMeshUpdate & Description_18;

export declare class LensFlare extends Effect<LensFlareEffect, LensFlareOptions> {
    constructor(camera: Camera, options?: LensFlareOptions);
    protected onMounted(): void;
    get intensity(): number;
    set intensity(v: number);
}

export declare type LensFlareConfig = Description_30 & EffectConfig;

export declare class LensFlareEffectDesc extends EffectDesc<LensFlareConfig, LensFlareUpdate, LensFlare> {
    static key: string;
    static insertAfter: string[];
    static insertBefore: string[];
    private config;
    constructor(view: default_2, ctx: ViewContext, config: LensFlareConfig);
    createPass(): LensFlare;
    onUpdateConfig(updates: LensFlareUpdate): void;
}

export declare type LensFlareOptions = {
    intensity?: number;
} & EffectOptions;

export declare type LensFlareUpdate = Description_30 & EffectUpdate;

export declare type LightProbeConfig = LightConfig & Description_39;

export declare class LightProbeDesc extends LightDesc<LightProbeConfig, LightProbeUpdate, LightProbe> {
    private config;
    constructor(view: default_2, ctx: ViewContext, config: LightProbeConfig);
    createLight(): LightProbe;
    onUpdateConfig(updates: LightProbeUpdate): void;
    protected disposeLight(): void;
}

export declare type LightProbeUpdate = LightUpdate & Description_39;

/**
 * Per-instance configuration for a single model instance.
 * Represents one full model; the transform is applied to every sub-mesh of that instance.
 */
export declare type ModelChildConfig = {
    position?: {
        x: number;
        y: number;
        z: number;
    };
    rotation?: {
        x: number;
        y: number;
        z: number;
    };
    scale?: {
        x: number;
        y: number;
        z: number;
    };
    matrix?: Matrix4;
    /** Per-instance tint multiplied into the material color. */
    color?: Color_2;
};

/**
 * Injects the shadow and specular terms into the aerial perspective's
 * fragment shader. Throws when an upstream change moves an anchor.
 */
export declare function patchLightingTermsShader(source: string): string;

/** Per-instance configuration for a single plane. */
export declare type PlaneChildConfig = InstancedChildConfig & {
    /** Plane width (X-axis). Encoded as scale in the instance matrix. */
    width?: number;
    /** Plane height (Y-axis). Encoded as scale in the instance matrix. */
    height?: number;
    /** Per-instance color. */
    color?: Color_2;
};

export declare type PlaneMeshConfig = MeshConfigWithSelectiveEffect & Description_9 & {
    pickable?: boolean;
};

export declare class PlaneMeshDesc extends MeshDescWithSelectiveEffect<PlaneMeshConfig, PlaneMeshUpdate, Mesh<PlaneGeometry, MeshLambertMaterial, PlaneMeshEventMap>> {
    private config;
    private pickWrapper?;
    constructor(view: default_2, ctx: ViewContext, config: PlaneMeshConfig);
    /** The batch ID assigned to this mesh when picking is enabled. */
    get batchId(): number | undefined;
    createMesh(): Mesh<PlaneGeometry, MeshLambertMaterial, PlaneMeshEventMap>;
    onUpdateConfig(updates: PlaneMeshUpdate): void;
    protected disposeMesh(): void;
    onDestroy(): void;
}

declare type PlaneMeshEventMap = Object3DEventMap & CustomObject3DEventMap;

export declare type PlaneMeshUpdate = MeshUpdateWithSelectiveEffect & Description_9;

export declare type PlanesDescription = SharedPlaneConfig & {
    children?: PlaneChildConfig[];
};

export declare type PolygonMeshConfig = MeshConfigWithSelectiveEffect & Description_22 & {
    pickable?: boolean;
};

/**
 * A single polygon outside the layer/source pipeline, built with the layer's
 * geometry builder and material. `update()` rebuilds it from positions without
 * re-tiling.
 *
 * With `clampToGround` (default), it is draped with a stencil volume enclosing
 * {@link ThreeView.sampleTerrainHeightRange} and lit with the terrain's normal.
 * A clamped polygon receives shadows but casts none.
 */
export declare class PolygonMeshDesc extends MeshDescWithSelectiveEffect<PolygonMeshConfig, PolygonMeshUpdate, PolygonMeshInstance> {
    private config;
    private pickBatchId?;
    /** The transform the current geometry was built with. */
    private bakedTransform;
    private enhancer?;
    private readonly ground;
    constructor(view: default_2, ctx: ViewContext, config: PolygonMeshConfig);
    /** The batch ID assigned to this mesh when picking is enabled. */
    get batchId(): number | undefined;
    private get style();
    protected getPassKey(): PassKey;
    /** Requests the globe normal copy only while shading with it. */
    getRequiredBuffers(): readonly GBufferName[];
    createMesh(): PolygonMeshInstance;
    /**
     * Creates the material with its enhancer mounted.
     *
     * Toggling `clampToGround` needs a new material, because the draped pass
     * patches the shader once per material and never reverts it. Call after
     * the ground is watched, since `minMaxHeight` reads it.
     */
    private createMaterial;
    /** Binds the RTE callbacks to `enhancer`; re-run after replacing the material. */
    private wireRte;
    /** Water enhancer props derived from the style, shared by mount and update. */
    private waterProps;
    /** Enhancer props derived from the style, shared by mount and update. */
    private baseProps;
    private effectIdsMask;
    protected updateEffectIdsMask(): void;
    /**
     * Height range of the extrusion; the ground volume when clamped. Call after
     * the ground is watched.
     */
    private minMaxHeight;
    /**
     * Bakes the transform into the geometry, since the builder and the ground
     * volume need world positions. The mesh object stays at identity.
     */
    protected applyTransform(): void;
    private replaceGeometry;
    /** Builds from `style` without touching the descriptor's state. */
    private buildGeometry;
    onUpdateConfig(updates: PolygonMeshUpdate): void;
    /** The polygon as drawn, in geodetic GeoJSON, e.g. to hand it to a layer source. */
    toGeoJSON(): Polygon;
    protected disposeMesh(): void;
    onDestroy(): void;
}

declare type PolygonMeshEventMap = Object3DEventMap & CustomObject3DEventMap;

declare type PolygonMeshInstance = FeatureDrapedMesh<MeshLambertMaterial, PolygonMeshEventMap>;

/**
 * The `polygon` layer material without the layer-only options. `show` and
 * `lit` are covered by the mesh config's `visible` and `lit`; draw an outline
 * as a {@link PolylineMeshDesc} over the same ring.
 */
export declare type PolygonMeshStyle = Omit<NonNullable<VectorLayer["polygon"]>, "tiled" | "show" | "surfaceShow" | "outline" | "outlineShow" | "outlineColor" | "outlineWidth" | "lit" | "__internal__">;

export declare type PolygonMeshUpdate = MeshUpdateWithSelectiveEffect & Description_22;

export declare type PolylineMeshConfig = MeshConfigWithSelectiveEffect & Description_23 & {
    pickable?: boolean;
};

/**
 * A single polyline outside the layer/source pipeline, built with the layer's
 * geometry builder and material. `update()` rebuilds it from positions without
 * re-tiling.
 *
 * With `clampToGround` (default), the volume encloses
 * {@link ThreeView.sampleTerrainHeightRange} and the fragment shader keeps
 * fragments whose ground point lies within half a line width of the segment.
 * A clamped line ignores `height`, casts no shadow, and receives directional
 * shadows at its ground point.
 * Otherwise the line is drawn at `height`.
 *
 * The line is lit, so it renders black without lights unless `lit: false`.
 */
export declare class PolylineMeshDesc extends MeshDescWithSelectiveEffect<PolylineMeshConfig, PolylineMeshUpdate, PolylineMeshInstance> {
    private config;
    private pickBatchId?;
    /** The transform the current geometry was built with. */
    private bakedTransform;
    private enhancer?;
    private readonly ground;
    constructor(view: default_2, ctx: ViewContext, config: PolylineMeshConfig);
    /** The batch ID assigned to this mesh when picking is enabled. */
    get batchId(): number | undefined;
    private get style();
    protected getPassKey(): PassKey;
    createMesh(): PolylineMeshInstance;
    /** Requests the globe normal copy only while shading with it. */
    getRequiredBuffers(): readonly GBufferName[];
    /** Enhancer props derived from the style, shared by mount and update. */
    private baseProps;
    private effectIdsMask;
    protected updateEffectIdsMask(): void;
    /**
     * Height range of the volume; zero when unclamped. Call after the ground is
     * watched.
     */
    private minMaxHeight;
    /**
     * Bakes the transform into the geometry, since the builder and the ground
     * volume need world positions. The mesh object stays at identity.
     */
    protected applyTransform(): void;
    private replaceGeometry;
    /** Builds from `style` without touching the descriptor's state. */
    private buildGeometry;
    onUpdateConfig(updates: PolylineMeshUpdate): void;
    /** The line as drawn, in geodetic GeoJSON, e.g. to hand it to a layer source. */
    toGeoJSON(): LineString;
    protected disposeMesh(): void;
    onDestroy(): void;
}

declare type PolylineMeshEventMap = Object3DEventMap & CustomObject3DEventMap;

declare type PolylineMeshInstance = FeatureMesh<ShaderMaterial, PolylineMeshEventMap>;

/**
 * The `polyline` layer material without the layer-only options. `show` and
 * `lit` are covered by the mesh config's `visible` and `lit`.
 */
export declare type PolylineMeshStyle = Omit<NonNullable<VectorLayer["polyline"]>, "tiled" | "geometryTypes" | "show" | "lit" | "__internal__">;

export declare type PolylineMeshUpdate = MeshUpdateWithSelectiveEffect & Description_23;

declare type PositionSource = {
    positions?: GeodeticRings;
    points?: CartesianRings;
    geojson?: Polygon | LineString;
};

export declare type RainConfig = {
    particleCount: number;
    speed: number;
    color: number;
    areaWidth: number;
    areaHeight: number;
    width: number;
    height: number;
    radius: number;
    opacity: number;
    /** Maximum alpha value for the lit side of raindrops */
    alphaMax: number;
    /** Minimum alpha value for the shadowed side of raindrops */
    alphaMin: number;
    /** The mesh follows a camera. It takes an effect that looks like the mesh is rendered infinitely. */
    followCamera: boolean;
    /** Opacity is reduced in proportion to the maximum height and the camera height. */
    maxHeight: number;
    /** Reference fov (degrees) at which `width` / `height` look as authored. The on-screen size is held constant relative to this fov. */
    baseFov: number;
};

export declare type RainDropConfig = Description_31 & EffectConfig;

export declare class RainDropEffect extends Effect<RainDropPostEffect, RainDropOptions, RainDropEvents> {
    constructor(camera: Camera, options?: RainDropOptions);
    protected onMounted(): void;
    update(time: number): void;
    get opacity(): number;
    set opacity(v: number);
    get dropGridSize(): number;
    set dropGridSize(value: number);
    get dropDensity(): number;
    set dropDensity(value: number);
    get dropLayers(): number;
    set dropLayers(value: number);
    get dropSizeFactor(): number;
    set dropSizeFactor(value: number);
    get noiseScale(): number;
    set noiseScale(value: number);
    get refractionStrength(): number;
    set refractionStrength(value: number);
    get minDropStrength(): number;
    set minDropStrength(value: number);
    get dropFadeStart(): number;
    set dropFadeStart(value: number);
    get dropFadeEnd(): number;
    set dropFadeEnd(value: number);
    get dropThresholdFactor(): number;
    set dropThresholdFactor(value: number);
    get gridDensityLow(): number;
    set gridDensityLow(value: number);
    get gridDensityHigh(): number;
    set gridDensityHigh(value: number);
    get jitterStrengthLow(): number;
    set jitterStrengthLow(value: number);
    get jitterStrengthHigh(): number;
    set jitterStrengthHigh(value: number);
}

export declare class RainDropEffectDesc extends EffectDesc<RainDropConfig, RainDropUpdate, RainDropEffect> {
    static key: string;
    static insertBefore: string[];
    static allowDuplication: boolean;
    private config;
    constructor(view: default_2, ctx: ViewContext, config: RainDropConfig);
    createPass(): RainDropEffect;
    onUpdateConfig(updates: RainDropUpdate): void;
    update(time: number): void;
}

/** Optional knobs exposed to whoever constructs the effect. */
declare type RainDropEffectOptions = {
    /** Opacity applied after the shader runs, useful for blending the effect. */
    opacity?: number;
    /** Size of the UV grid used to place droplets; larger values yield smaller cells. */
    dropGridSize?: number;
    /** Multiplier applied in the shader to control how many droplets are spawned. */
    dropDensity?: number;
    /** Active number of simulated layers; higher values add small droplets at extra cost. */
    dropLayers?: number;
    /** Controls how tightly droplets are packed by scaling the grid size. */
    dropSizeFactor?: number;
    /** Scales the noise that drives jitter and refraction wobble. */
    noiseScale?: number;
    /** Intensity of UV distortion caused by refraction. */
    refractionStrength?: number;
    /** Minimum strength required before rendering a droplet. */
    minDropStrength?: number;
    /** Fade window (start) for smooth drop visibility. */
    dropFadeStart?: number;
    /** Fade window (end) paired with dropFadeStart. */
    dropFadeEnd?: number;
    /** Base threshold factor controlling spawn probability. */
    dropThresholdFactor?: number;
    /** Adjustment applied when density is low; pairs with gridDensityHigh. */
    gridDensityLow?: number;
    /** Adjustment applied when density is high; pairs with gridDensityLow. */
    gridDensityHigh?: number;
    /** Maximum jitter for sparse drops; pairs with jitterStrengthHigh. */
    jitterStrengthLow?: number;
    /** Minimum jitter for dense drops; pairs with jitterStrengthLow. */
    jitterStrengthHigh?: number;
};

export declare type RainDropEvents = EffectEvents;

export declare type RainDropOptions = RainDropEffectOptions & EffectOptions;

/**
 * Wraps the GLSL rain drop shader so it can be slotted into the post-processing
 * pipeline with adjustable density, grid size, and opacity.
 */
declare class RainDropPostEffect extends Effect_2 {
    private readonly dropGridSizeUniform;
    private readonly dropDensityUniform;
    private readonly dropLayersUniform;
    private readonly dropSizeFactorUniform;
    private readonly noiseScaleUniform;
    private readonly refractionStrengthUniform;
    private readonly minDropStrengthUniform;
    private readonly dropFadeStartUniform;
    private readonly dropFadeEndUniform;
    private readonly dropThresholdFactorUniform;
    private readonly gridDensityLowUniform;
    private readonly gridDensityHighUniform;
    private readonly jitterStrengthLowUniform;
    private readonly jitterStrengthHighUniform;
    constructor(options?: RainDropEffectOptions);
    setSize(width: number, height: number): void;
    updateTime(time: number): void;
    set dropGridSize(value: number);
    get dropGridSize(): number;
    set dropDensity(value: number);
    get dropDensity(): number;
    set dropLayers(value: number);
    get dropLayers(): number;
    set dropSizeFactor(value: number);
    get dropSizeFactor(): number;
    set noiseScale(value: number);
    get noiseScale(): number;
    set refractionStrength(value: number);
    get refractionStrength(): number;
    set minDropStrength(value: number);
    get minDropStrength(): number;
    set dropFadeStart(value: number);
    get dropFadeStart(): number;
    set dropFadeEnd(value: number);
    get dropFadeEnd(): number;
    set dropThresholdFactor(value: number);
    get dropThresholdFactor(): number;
    set gridDensityLow(value: number);
    get gridDensityLow(): number;
    set gridDensityHigh(value: number);
    get gridDensityHigh(): number;
    set jitterStrengthLow(value: number);
    get jitterStrengthLow(): number;
    set jitterStrengthHigh(value: number);
    get jitterStrengthHigh(): number;
}

export declare type RainDropUpdate = Description_31 & EffectUpdate;

declare class RainMaterial extends ShaderMaterial {
    uniforms: {
        time: Uniform<number>;
        speed: Uniform<number>;
        color: Uniform<Color>;
        areaWidth: Uniform<number>;
        areaHeight: Uniform<number>;
        size: Uniform<Vector2>;
        opacity: Uniform<number>;
        alphaMax: Uniform<number>;
        alphaMin: Uniform<number>;
        meshOffset: Uniform<Vector3>;
        bounds: Uniform<Vector3>;
        cameraRight: Uniform<Vector3>;
        cameraUp: Uniform<Vector3>;
        followCamera: Uniform<boolean>;
        radius: Uniform<number>;
        fov: Uniform<number>;
        baseFov: Uniform<number>;
    };
    constructor();
}

export declare class RainMesh extends Mesh<BufferGeometry, RainMaterial> {
    private readonly _config;
    private readonly _material;
    private _lastCameraPosition;
    private readonly _cameraOffset;
    private readonly xAxisBase;
    private readonly yAxisBase;
    private readonly zAxisBase;
    private readonly baseMatrix4;
    constructor(config?: Partial<RainConfig>);
    private updateUniforms;
    private updateBounds;
    set particleCount(value: number);
    get particleCount(): number;
    set speed(value: number);
    get speed(): number;
    set color(value: number);
    get color(): number;
    set areaWidth(value: number);
    get areaWidth(): number;
    set areaHeight(value: number);
    get areaHeight(): number;
    set width(value: number);
    get width(): number;
    set height(value: number);
    get height(): number;
    set radius(value: number);
    get radius(): number;
    set opacity(value: number);
    get opacity(): number;
    set alphaMax(value: number);
    get alphaMax(): number;
    set alphaMin(value: number);
    get alphaMin(): number;
    set followCamera(value: boolean);
    get followCamera(): boolean;
    set maxHeight(value: number);
    get maxHeight(): number;
    set baseFov(value: number);
    get baseFov(): number;
    updateConfig(newConfig: Partial<RainConfig>): void;
    getConfig(): RainConfig;
    /**
     * Update the rain mesh
     * @param time Current time
     * @param camera Camera instance
     */
    update(time: number, camera: Camera): void;
    updateTime(time: number): void;
    dispose(): void;
}

export declare type RainMeshConfig = MeshConfig & Description;

export declare class RainMeshDesc extends MeshDesc<RainMeshConfig, RainMeshUpdate, RainMesh> {
    private config;
    constructor(view: default_2, ctx: ViewContext, config: RainMeshConfig);
    getPassKey(): "opaque" | "transparent";
    createMesh(): RainMesh;
    onUpdateConfig(updates: RainMeshUpdate): void;
    update(time: number): void;
    protected disposeMesh(): void;
    getRainMesh(): RainMesh | undefined;
}

export declare type RainMeshUpdate = MeshUpdate & Description;

/**
 * {@link CloudsOptions} with every field present. `assetsUrl` may still be
 * `undefined`, meaning the assets bundled with the package.
 */
declare type ResolvedCloudsOptions = Required<Omit<CloudsOptions, "assetsUrl">> & Pick<CloudsOptions, "assetsUrl">;

export declare type SelectiveBloomConfig = {
    strength?: number;
    radius?: number;
    threshold?: number;
    smoothing?: number;
    levels?: number;
    resolutionScale?: number;
};

export declare type SelectiveBloomEffectConfig = {
    selectiveBloom: SelectiveBloomConfig;
} & SelectiveEffectConfig;

/**
 * Selective Bloom Effect Descriptor
 *
 * Uses EmissiveBuffer + EffectIds Buffer to apply bloom to selected objects.
 * Extract (threshold + mask) → Blur (MipmapBlurPass) → Composite with base scene.
 */
export declare class SelectiveBloomEffectDesc extends SelectiveEffectDesc<SelectiveBloomEffectConfig, SelectiveBloomEffectUpdate> {
    static key: string;
    static insertAfter: string[];
    static insertBefore: string[];
    /** Bloom extraction reads the emissive buffer on top of the id mask. */
    static requiredBuffers: readonly ["selectiveEffect", "emissive"];
    private bloomPass?;
    private get bloom();
    get bloomStrength(): number;
    get bloomRadius(): number;
    get bloomThreshold(): number;
    get bloomSmoothing(): number;
    get bloomLevels(): number;
    constructor(view: default_2, ctx: ViewContext, config: EffectConfig);
    createPass(): Pass<SelectiveBloomPass, null>;
    onUpdateConfig(updates: SelectiveBloomEffectUpdate): void;
}

export declare type SelectiveBloomEffectUpdate = {
    selectiveBloom?: Partial<SelectiveBloomConfig>;
} & EffectUpdate;

/**
 * Buffer-based Selective Bloom Pass.
 *
 * Pipeline: Extract bloom source (threshold + mask) → Blur (MipmapBlurPass) → Composite with base.
 * Reads from EmissiveBuffer + EffectIds Buffer in the GBuffer MRT.
 */
declare class SelectiveBloomPass extends Pass_2 {
    private desc;
    private bloom;
    private bloomSourceRT;
    private fullscreenCamera;
    private fullscreenGeometry;
    private extractScene;
    private extractMaterial;
    private compositeScene;
    private compositeMaterial;
    private size;
    constructor(desc: SelectiveBloomEffectDesc);
    initialize(renderer: WebGLRenderer, alpha: boolean): void;
    setParameters(strength: number, radius: number, threshold: number, smoothing: number): void;
    setLevels(levels: number): void;
    private updateSizes;
    render(renderer: WebGLRenderer, inputBuffer: WebGLRenderTarget, outputBuffer: WebGLRenderTarget | null, deltaTime?: number): void;
    dispose(): void;
}

export declare type SelectiveOutlineConfig = {
    color?: Color_2;
    thickness?: number;
    edgeStrength?: number;
    resolutionScale?: number;
};

export declare type SelectiveOutlineEffectConfig = {
    selectiveOutline: SelectiveOutlineConfig;
} & SelectiveEffectConfig;

/**
 * Selective Outline Effect Descriptor
 *
 * Uses EffectIds Buffer to apply outline to selected objects.
 * Extract mask → Sobel edge detection → Composite with base scene.
 */
export declare class SelectiveOutlineEffectDesc extends SelectiveEffectDesc<SelectiveOutlineEffectConfig, SelectiveOutlineEffectUpdate> {
    static key: string;
    static insertAfter: string[];
    static insertBefore: string[];
    private outlinePass?;
    private get outline();
    get outlineColor(): Color_2;
    get outlineThickness(): number;
    get outlineEdgeStrength(): number;
    constructor(view: default_2, ctx: ViewContext, config: EffectConfig);
    createPass(): Pass<SelectiveOutlinePass, null>;
    onUpdateConfig(updates: SelectiveOutlineEffectUpdate): void;
}

export declare type SelectiveOutlineEffectUpdate = {
    selectiveOutline?: Partial<SelectiveOutlineConfig>;
} & EffectUpdate;

/**
 * Buffer-based Selective Outline Pass.
 *
 * Pipeline: Extract mask from EffectIds Buffer → Sobel edge detection → Composite with base.
 * Reads from EffectIds Buffer in the GBuffer MRT.
 */
declare class SelectiveOutlinePass extends Pass_2 {
    private desc;
    private maskRT;
    private edgeRT;
    private fullscreenCamera;
    private fullscreenGeometry;
    private extractScene;
    private extractMaterial;
    private edgeDetectScene;
    private edgeDetectMaterial;
    private compositeScene;
    private compositeMaterial;
    private size;
    constructor(desc: SelectiveOutlineEffectDesc);
    setParameters(color: Color_2, thickness: number, edgeStrength: number): void;
    private updateSizes;
    render(renderer: WebGLRenderer, inputBuffer: WebGLRenderTarget, outputBuffer: WebGLRenderTarget | null, _deltaTime?: number): void;
    dispose(): void;
}

export declare type ShadowMode = "uniform" | "logarithmic" | "practical";

/** Shared material-level properties for all instances. */
export declare type SharedBoxMaterialConfig = {
    color?: Color_2;
    emissiveColor?: Color_2;
    emissiveIntensity?: number;
    opacity?: number;
    transparent?: boolean;
    castShadow?: boolean;
    receiveShadow?: boolean;
    effectIds?: string[];
};

/**
 * Shared properties for all cylinder instances. Taper, segments, caps and arc
 * are baked into the shared geometry and cannot vary per instance.
 */
export declare type SharedCylinderConfig = {
    radiusTop?: number;
    radiusBottom?: number;
    radialSegments?: number;
    heightSegments?: number;
    openEnded?: boolean;
    thetaStart?: number;
    thetaLength?: number;
    color?: Color_2;
    emissiveColor?: Color_2;
    emissiveIntensity?: number;
    opacity?: number;
    transparent?: boolean;
    castShadow?: boolean;
    receiveShadow?: boolean;
    effectIds?: string[];
};

/** Shared properties for all plane instances. Segment counts are baked into the shared geometry. */
export declare type SharedPlaneConfig = {
    widthSegments?: number;
    heightSegments?: number;
    color?: Color_2;
    emissiveColor?: Color_2;
    emissiveIntensity?: number;
    opacity?: number;
    transparent?: boolean;
    castShadow?: boolean;
    receiveShadow?: boolean;
    effectIds?: string[];
};

/** Shared properties for all sphere instances. Segment/arc params are baked into the shared geometry. */
export declare type SharedSphereConfig = {
    widthSegments?: number;
    heightSegments?: number;
    phiStart?: number;
    phiLength?: number;
    thetaStart?: number;
    thetaLength?: number;
    color?: Color_2;
    emissiveColor?: Color_2;
    emissiveIntensity?: number;
    opacity?: number;
    transparent?: boolean;
    castShadow?: boolean;
    receiveShadow?: boolean;
    effectIds?: string[];
};

export declare type SkyBoxMeshConfig = MeshConfig & Description_14;

export declare class SkyBoxMeshDesc extends MeshDesc<SkyBoxMeshConfig, SkyBoxMeshUpdate, Mesh<BufferGeometry, ShaderMaterial>> {
    private config;
    constructor(view: default_2, ctx: ViewContext, config: SkyBoxMeshConfig);
    createMesh(): Mesh<BufferGeometry< NormalBufferAttributes, BufferGeometryEventMap>, ShaderMaterial, Object3DEventMap>;
    onUpdateConfig(updates: SkyBoxMeshUpdate): void;
    update(_time: number): void;
    protected disposeMesh(): void;
}

export declare type SkyBoxMeshUpdate = MeshUpdate & Description_14;

export declare class SkyLightProbe extends EventHandler_2<SkyLightProbeEvents> {
    raw: SkyLightProbe_2;
    constructor(options?: SkyLightProbeOptions);
    setTextures(textures: Pick<PrecomputedTextures, "irradianceTexture">): void;
    updateSunDirection(sunDirection: Vector3): void;
    updatePosition(position: Vector3): void;
    get visible(): boolean;
    set visible(v: boolean);
    get intensity(): number;
    set intensity(v: number);
    update(): void;
}

export declare type SkyLightProbeConfig = LightConfig & Description_38;

export declare class SkyLightProbeDesc extends LightDesc<SkyLightProbeConfig, SkyLightProbeUpdate, SkyLightProbe> {
    private config;
    constructor(view: default_2, ctx: ViewContext, config: SkyLightProbeConfig);
    createLight(): SkyLightProbe;
    onUpdateConfig(updates: SkyLightProbeUpdate): void;
    update(_time: number): void;
}

export declare type SkyLightProbeEvents = {
    needsUpdate: () => void;
};

export declare type SkyLightProbeOptions = {
    intensity?: number;
};

export declare type SkyLightProbeUpdate = LightUpdate & Description_38;

export declare class SkyMesh extends EventHandler<SkyMeshEvents> {
    raw: Mesh<PlaneGeometry, SkyMaterial>;
    private options;
    private handleShadowLengthChanged?;
    constructor(options?: SkyMeshOptions);
    setTextures(textures: Partial<PrecomputedTextures>): void;
    setShadowLengthHandler(shadowLengthObservable: Observed<AtmosphereShadowLength | null>): void;
    updateSunDirection(sunDirection: Vector3): void;
    updateMoonDirection(moonDirection: Vector3): void;
    private setupMoonProperties;
    get visible(): boolean;
    set visible(v: boolean);
    get sun(): boolean;
    set sun(v: boolean);
    get moon(): boolean;
    set moon(v: boolean);
    get moonScale(): number;
    set moonScale(v: number);
    get moonIntensity(): number;
    set moonIntensity(v: number);
    get sunAngularRadius(): number;
    set sunAngularRadius(v: number);
    dispose(): void;
}

export declare type SkyMeshConfig = MeshConfig & Description_3;

export declare class SkyMeshDesc extends MeshDesc<SkyMeshConfig, SkyMeshUpdate, SkyMesh> {
    private config;
    private _skyMesh;
    constructor(view: default_2, ctx: ViewContext, config: SkyMeshConfig);
    getPassKey(): "opaque" | "skyEnvMap";
    createMesh(): SkyMesh;
    onUpdateConfig(updates: SkyMeshUpdate): void;
    update(_time: number): void;
    protected disposeMesh(): void;
    getSkyMesh(): SkyMesh | null;
}

declare type SkyMeshEvents = {
    needsUpdate: () => void;
};

export declare type SkyMeshOptions = {
    visible?: boolean;
    sun?: boolean;
    moon?: boolean;
    /**
     * @default 1
     */
    moonScale?: number;
    /**
     * @default 1
     */
    moonIntensity?: number;
    /**
     * @default 0.004675
     */
    sunAngularRadius?: number;
    /**
     * Render as env map
     */
    envMap?: boolean;
};

export declare type SkyMeshUpdate = MeshUpdate & Description_3;

export declare class SMAA extends Effect<SMAAEffect, AntialiasOptions> {
    constructor(camera: Camera, options?: AntialiasOptions);
    protected onMounted(): void;
    get quality(): AntialiasOptions["quality"];
    set quality(v: AntialiasOptions["quality"]);
    get edgeDetectionMode(): AntialiasOptions["edgeDetectionMode"];
    set edgeDetectionMode(v: AntialiasOptions["edgeDetectionMode"]);
}

export declare type SMAAConfig = Description_32 & EffectConfig;

export declare class SMAAEffectDesc extends EffectDesc<SMAAConfig, SMAAUpdate, SMAA> {
    static key: string;
    static insertBefore: string[];
    private config;
    constructor(view: default_2, ctx: ViewContext, config: SMAAConfig);
    createPass(): SMAA;
    onUpdateConfig(updates: SMAAUpdate): void;
}

export declare type SMAAUpdate = Description_32 & EffectUpdate;

export declare class SmoothLine extends Object3D {
    private readonly _config;
    private _lineMeshes;
    private _pointsMeshes;
    private _pointsData;
    private _sharedRTEUniforms;
    private _identityMatrix;
    private _tempModelViewMatrix;
    private _originalLineOnBeforeRender;
    constructor(config?: Partial<SmoothLineConfig>[]);
    private updatePointsData;
    private initSubMeshes;
    private createLinePosAttr;
    private createLineMesh;
    private createSpherePointMesh;
    updateConfig(newConfig: Partial<SmoothLineConfig>[]): void;
    updateLineCfg(cfg: Partial<SmoothLineConfig>, i: number): void;
    updatePointsCfg(cfg: Partial<SmoothLineConfig>, i: number): void;
    /**
     * Inject RTE shader code into LineMaterial via onBeforeCompile
     */
    private injectRTEShaderCode;
    /**
     * Setup RTE callback for camera-relative rendering
     * This method is safe to call multiple times - it only sets up the callback once
     */
    private setupRTECallback;
    dispose(): void;
    onResize(width: number, height: number): void;
}

export declare type SmoothLineConfig = {
    tension: number;
    closed: boolean;
    segments: number;
    lineWidth: number;
    dashed: boolean;
    dashSize: number;
    dashOffset: number;
    gapSize: number;
    color: number;
    showPoints: boolean;
    pointSize: number;
    pointColor: number;
    points: LatLngHeight[];
};

export declare type SmoothLineMeshConfig = MeshConfig & Description_13 & {
    pickable?: boolean;
};

export declare class SmoothLineMeshDesc extends MeshDesc<SmoothLineMeshConfig, SmoothLineMeshUpdate, SmoothLine> {
    private config;
    private pickWrapper?;
    constructor(view: default_2, ctx: ViewContext, config: SmoothLineMeshConfig);
    /** The batch ID assigned to this mesh when picking is enabled. */
    get batchId(): number | undefined;
    protected getPassKey(): "mrt";
    createMesh(): SmoothLine;
    onUpdateConfig(updates: SmoothLineMeshUpdate): void;
    onResize(width: number, height: number): void;
    protected disposeMesh(): void;
    onDestroy(): void;
}

export declare type SmoothLineMeshUpdate = MeshUpdate & Description_13;

export declare type SnowConfig = {
    particleCount: number;
    radius: number;
    areaWidth: number;
    areaHeight: number;
    speed: number;
    size: number;
    color: number;
    movementStrength: XYZ;
    movementSpeed: XYZ;
    /** The mesh follows a camera. It takes an effect that looks like the mesh is rendered infinitely. */
    followCamera: boolean;
    /** Opacity is reduced in proportion to the maximum height and the camera height. */
    maxHeight: number;
    opacity: number;
};

export declare class SnowMesh extends Points<BufferGeometry, SnowPointsMaterial> {
    private readonly _config;
    private readonly _material;
    private readonly _lastCameraPosition;
    private readonly _cameraOffset;
    private readonly xAxisBase;
    private readonly yAxisBase;
    private readonly zAxisBase;
    private readonly baseMatrix4;
    constructor(config?: Partial<SnowConfig>);
    private initializeGeometry;
    private updateMaterial;
    set particleCount(value: number);
    get particleCount(): number;
    set radius(value: number);
    get radius(): number;
    set areaWidth(value: number);
    get areaWidth(): number;
    set areaHeight(value: number);
    get areaHeight(): number;
    set speed(value: number);
    get speed(): number;
    set size(value: number);
    get size(): number;
    set color(value: number);
    get color(): number;
    set movementStrength(value: XYZ);
    get movementStrength(): XYZ;
    set movementSpeed(value: XYZ);
    get movementSpeed(): XYZ;
    set followCamera(value: boolean);
    get followCamera(): boolean;
    set maxHeight(value: number);
    get maxHeight(): number;
    set opacity(value: number);
    get opacity(): number;
    updateConfig(newConfig: Partial<SnowConfig>): void;
    getConfig(): SnowConfig;
    update(time: number, camera: Camera): void;
    updateTime(time: number): void;
    dispose(): void;
}

export declare type SnowMeshConfig = MeshConfig & Description_2;

export declare class SnowMeshDesc extends MeshDesc<SnowMeshConfig, SnowMeshUpdate, SnowMesh> {
    private config;
    constructor(view: default_2, ctx: ViewContext, config: SnowMeshConfig);
    getPassKey(): "opaque" | "transparent";
    createMesh(): SnowMesh;
    onUpdateConfig(updates: SnowMeshUpdate): void;
    update(time: number): void;
    protected disposeMesh(): void;
}

export declare type SnowMeshUpdate = MeshUpdate & Description_2;

declare class SnowPointsMaterial extends ShaderMaterial {
    uniforms: (typeof UniformsLib)["points"] & {
        areaWidth: Uniform<number>;
        areaHeight: Uniform<number>;
        speed: Uniform<number>;
        time: Uniform<number>;
        movementStrength: Uniform<Vector3>;
        movementSpeed: Uniform<Vector3>;
        cameraPosition: Uniform<Vector3>;
        meshOffset: Uniform<Vector3>;
        bounds: Uniform<Vector3>;
        followCamera: Uniform<boolean>;
    };
    isPointsMaterial: boolean;
    color: Color;
    map: CanvasTexture<HTMLCanvasElement>;
    size: number;
    fog: boolean;
    sizeAttenuation: boolean;
    constructor();
    onBeforeCompile(shader: WebGLProgramParametersWithUniforms): void;
}

/** Per-instance configuration for a single sphere. */
export declare type SphereChildConfig = InstancedChildConfig & {
    /** Sphere radius. Encoded as uniform scale in the instance matrix. */
    radius?: number;
    /** Per-instance color. */
    color?: Color_2;
};

export declare type SphereMeshConfig = MeshConfigWithSelectiveEffect & Description_6 & {
    pickable?: boolean;
};

export declare class SphereMeshDesc extends MeshDescWithSelectiveEffect<SphereMeshConfig, SphereMeshUpdate, Mesh<SphereGeometry, MeshLambertMaterial, SphereMeshEventMap>> {
    private config;
    private pickWrapper?;
    constructor(view: default_2, ctx: ViewContext, config: SphereMeshConfig);
    /** The batch ID assigned to this mesh when picking is enabled. */
    get batchId(): number | undefined;
    createMesh(): Mesh<SphereGeometry, MeshLambertMaterial, SphereMeshEventMap>;
    onUpdateConfig(updates: SphereMeshUpdate): void;
    protected disposeMesh(): void;
    onDestroy(): void;
}

declare type SphereMeshEventMap = Object3DEventMap & CustomObject3DEventMap;

export declare type SphereMeshUpdate = MeshUpdateWithSelectiveEffect & Description_6;

export declare type SpherePointOptions = {
    visible?: boolean;
    size?: number;
    color?: number;
};

/**
 * Renders points as spheres using impostor technique with RTE (Relative-To-Eye) support.
 */
export declare class SpherePoints extends Points {
    pointOpts: Required<SpherePointOptions>;
    private _rteUniforms;
    private _identityMatrix;
    constructor(opts?: SpherePointOptions);
    setPoints(points: Vector3[]): void;
    setOptions(patch: Partial<SpherePointOptions>): void;
    onBeforeRender(renderer: WebGLRenderer, _scene: Scene, camera: Camera): void;
    dispose(): void;
    private _ensurePointsGeometry;
    private _updatePositionsAttr;
    private _makePointsMat;
    private _refreshPoints;
    private _refreshPointsUniforms;
}

export declare type SpheresDescription = SharedSphereConfig & {
    children?: SphereChildConfig[];
};

declare type SplatDescription = {
    splat?: {
        url: string;
        lod?: boolean;
        /**
         * Grid cell edge (m) for the dynamic floating-origin that keeps splats
         * precise at globe scale. Shared per transparent scene: the first splat's
         * value wins. Smaller = tighter precision but more re-sorts. Default 2000.
         */
        originCellSize?: number;
    };
};

declare type SplatDescriptionUpdate = {
    splat?: {
        url?: string;
        lod?: boolean;
        originCellSize?: number;
    };
};

export declare type SplatMeshConfig = MeshConfig & SplatDescription;

export declare class SplatMeshDesc extends MeshDesc<SplatMeshConfig, SplatMeshUpdate, SplatMesh, SplatMeshEvent> {
    private config;
    private holdsSlot;
    /** Bound listener for the shared SparkRenderer's `onDirty` fanout. */
    private onSparkDirty?;
    /** Shared dynamic-origin driver this splat registers with (RTC). */
    private controller?;
    constructor(view: default_2, ctx: ViewContext, config: SplatMeshConfig);
    protected getPassKey(): PassKey;
    createMesh(): SplatMesh;
    /**
     * Async (see `BaseDesc.onCreate`): awaits the lazily loaded spark module,
     * then runs the normal synchronous creation flow. `addMesh` returns the
     * handle immediately; the splat appears once the module has loaded, and an
     * import failure surfaces as this descriptor's `error` event.
     */
    onCreate(): Promise<void>;
    /**
     * A terrain-height observation (under `geodetic` + `heightReference:
     * "terrain"`) makes the base class re-write `mesh.matrixWorld` to the
     * freshly-resolved ECEF matrix. The RTC controller caches its own copy of
     * that matrix to re-derive the recentered one on every origin snap, so it
     * must be re-registered here — otherwise the splat keeps rendering at the
     * height captured when it was created (or last moved).
     */
    protected reapplyGeodeticFrame(): void;
    private releaseSlot;
    onUpdateConfig(updates: SplatMeshUpdate): void;
    onDestroy(): void;
}

export declare type SplatMeshEvent = {
    /** Emitted once the splat file has been fetched and parsed. */
    load: () => void;
    /** Emitted when fetching or parsing the splat file fails. */
    error: (error: unknown) => void;
    needsUpdate: () => void;
};

export declare type SplatMeshUpdate = MeshUpdate & SplatDescriptionUpdate;

export declare class SSAO extends Pass<N8AOPostPass, unknown, SSAOOptions> {
    camera: Camera;
    width: number;
    height: number;
    constructor(camera: Camera, width: number, height: number, options?: SSAOOptions);
    protected onMounted(): void;
    get quality(): SSAOQualityMode;
    set quality(v: SSAOQualityMode);
    get halfRes(): boolean;
    set halfRes(v: boolean);
    get samples(): Nullable<number>;
    set samples(v: Nullable<number>);
    get radius(): Nullable<number>;
    set radius(v: Nullable<number>);
    get intensity(): number;
    set intensity(v: number);
    get color(): Color_2;
    set color(v: Color_2);
}

export declare type SSAOConfig = Description_33 & EffectConfig;

export declare class SSAOEffectDesc extends EffectDesc<SSAOConfig, SSAOUpdate, SSAO> {
    static key: string;
    static insertAfter: string[];
    static insertBefore: string[];
    private config;
    constructor(view: default_2, ctx: ViewContext, config: SSAOConfig);
    createPass(): SSAO;
    onUpdateConfig(updates: SSAOUpdate): void;
}

export declare type SSAOOptions = {
    samples?: Nullable<number>;
    radius?: Nullable<number>;
    intensity?: number;
    color?: Color_2;
    halfRes?: Nullable<boolean>;
    quality?: SSAOQualityMode;
} & EffectOptions;

export { SSAOQualityMode }

export declare type SSAOUpdate = Description_33 & EffectUpdate;

export declare class SSR extends Effect<SSREffect, SSROptions> {
    constructor(camera: Camera, _options?: SSROptions);
    init(): void;
    get geometryBuffer(): Texture | null;
    set geometryBuffer(v: Texture | null);
    get resolutionScale(): number;
    set resolutionScale(v: number);
    get iterations(): number;
    set iterations(v: number);
    get binarySearchIterations(): number;
    set binarySearchIterations(v: number);
    get pixelZSize(): number;
    set pixelZSize(v: number);
    get pixelStride(): number;
    set pixelStride(v: number);
    get pixelStrideZCutoff(): number;
    set pixelStrideZCutoff(v: number);
    get maxRayDistance(): number;
    set maxRayDistance(v: number);
    get screenEdgeFadeStart(): number;
    set screenEdgeFadeStart(v: number);
    get eyeFadeStart(): number;
    set eyeFadeStart(v: number);
    get eyeFadeEnd(): number;
    set eyeFadeEnd(v: number);
    get jitter(): number;
    set jitter(v: number);
    get useConeTracing(): boolean;
    set useConeTracing(v: boolean);
    get coneTracingFadeStart(): number;
    set coneTracingFadeStart(v: number);
    get coneTracingFadeEnd(): number;
    set coneTracingFadeEnd(v: number);
    get coneTracingMaxDistance(): number;
    set coneTracingMaxDistance(v: number);
    get coneTracingIteration(): number;
    set coneTracingIteration(v: number);
    get resolveKernelSize(): number;
    set resolveKernelSize(v: number);
}

export declare type SSRConfig = Description_34 & EffectConfig;

export declare class SSREffect extends Effect_2 {
    private camera;
    readonly resolution: Resolution;
    readonly renderTarget: WebGLRenderTarget;
    readonly ssrMaterial: SSRMaterial;
    readonly ssrPass: ShaderPass;
    readonly coneRenderTarget: WebGLRenderTarget;
    readonly coneTracingPass: ConeTracingPass;
    private _useConeTracing;
    constructor(camera: Camera, options?: SSREffectOptions);
    private readonly onResolutionChange;
    /**
     * The ray tracing target is rendered at `resolutionScale` and read back at
     * full resolution. Hit UVs must not be interpolated across hit/miss
     * boundaries — the blend would produce coordinates pointing at unrelated
     * parts of the screen — whereas plain reflection color upsamples fine.
     */
    private updateRayTracingBufferFilter;
    get mainCamera(): Camera;
    set mainCamera(value: Camera);
    initialize(renderer: WebGLRenderer, alpha: boolean, frameBufferType: TextureDataType): void;
    update(renderer: WebGLRenderer, inputBuffer: WebGLRenderTarget, deltaTime?: number): void;
    setSize(width: number, height: number): void;
    setDepthTexture(depthTexture: Texture, depthPacking?: DepthPackingStrategies): void;
    get resolutionScale(): number;
    set resolutionScale(value: number);
    get geometryBuffer(): Texture | null;
    set geometryBuffer(value: Texture | null);
    get iterations(): number;
    set iterations(value: number);
    get binarySearchIterations(): number;
    set binarySearchIterations(value: number);
    get pixelZSize(): number;
    set pixelZSize(value: number);
    get pixelStride(): number;
    set pixelStride(value: number);
    get pixelStrideZCutoff(): number;
    set pixelStrideZCutoff(value: number);
    get maxRayDistance(): number;
    set maxRayDistance(value: number);
    get screenEdgeFadeStart(): number;
    set screenEdgeFadeStart(value: number);
    get eyeFadeStart(): number;
    set eyeFadeStart(value: number);
    get eyeFadeEnd(): number;
    set eyeFadeEnd(value: number);
    get jitter(): number;
    set jitter(value: number);
    get useConeTracing(): boolean;
    set useConeTracing(v: boolean);
    get coneTracingFadeStart(): number;
    set coneTracingFadeStart(value: number);
    get coneTracingFadeEnd(): number;
    set coneTracingFadeEnd(value: number);
    get coneTracingMaxDistance(): number;
    set coneTracingMaxDistance(value: number);
    get coneTracingIteration(): number;
    set coneTracingIteration(value: number);
    get resolveKernelSize(): number;
    set resolveKernelSize(value: number);
}

export declare class SSREffectDesc extends EffectDesc<SSRConfig, SSRUpdate, SSR> {
    static key: string;
    static requiredBuffers: readonly GBufferName[];
    static insertBefore: string[];
    private config;
    constructor(view: default_2, ctx: ViewContext, config: SSRConfig);
    createPass(): SSR;
    update(_time: number): void;
    onUpdateConfig(updates: SSRUpdate): void;
}

export declare type SSREffectOptions = {
    blendMode?: BlendMode;
    resolutionScale?: number;
    width?: number;
    height?: number;
    resolutionX?: number;
    resolutionY?: number;
    useConeTracing?: boolean;
    coneTracingFadeStart?: number;
    coneTracingFadeEnd?: number;
    coneTracingMaxDistance?: number;
    coneTracingIteration?: number;
    resolveKernelSize?: number;
} & Omit<SSRMaterialParameters, "inputBuffer" | "depthBuffer">;

export declare class SSRMaterial extends ShaderMaterial {
    constructor(params?: SSRMaterialParameters);
    setSize(width: number, height: number): void;
    copyCameraSettings(camera?: Camera | null): void;
    get inputBuffer(): Texture | null;
    set inputBuffer(value: Texture | null);
    get geometryBuffer(): Texture | null;
    set geometryBuffer(value: Texture | null);
    get depthBuffer(): Texture | null;
    set depthBuffer(value: Texture | null);
    get depthPacking(): number;
    set depthPacking(value: number);
    get generateRayTracingBuffer(): boolean;
    set generateRayTracingBuffer(value: boolean);
}

export declare type SSRMaterialParameters = {
    inputBuffer?: Texture | null;
    geometryBuffer?: Texture | null;
    depthBuffer?: Texture | null;
    iterations?: number;
    binarySearchIterations?: number;
    pixelZSize?: number;
    pixelStride?: number;
    pixelStrideZCutoff?: number;
    maxRayDistance?: number;
    screenEdgeFadeStart?: number;
    eyeFadeStart?: number;
    eyeFadeEnd?: number;
    jitter?: number;
    generateRayTracingBuffer?: boolean;
} & ShaderMaterialParameters;

export declare type SSROptions = {
    /**
     * Geometry buffer used for reflection calculations. When unset or `null`,
     * the engine's MRT normal buffer is used. Supplying a custom screen-aligned
     * texture lets applications control where SSR applies (e.g. puddles).
     *
     * Each texel must follow the engine's G-buffer encoding:
     * `.xy` = octahedral-packed view-space normal (`packNormalToVec2` from
     * `@takram/three-geospatial/shaders` `packing`);
     * `.z` = reflectance at normal incidence (F0), e.g. 0.02 for water, 0.04
     * for other dielectrics and 1 for a mirror — it sets the Fresnel strength
     * of the reflection, and SSR is skipped where `.z < 0.01`;
     * `.w` = roughness — SSR is skipped where it is 1; with cone tracing
     * (default) it drives the blur cone angle, without cone tracing it
     * multiplies `.z` for the GGX ray jitter.
     *
     * Updating the *contents* of the texture (render-to-texture) takes effect
     * automatically; only swapping the texture *object* requires an update call.
     */
    geometryBuffer?: Texture | null;
    /** Resolution scale factor for SSR rendering (0-1, lower values improve performance) */
    resolutionScale?: number;
    /** Maximum number of ray marching iterations for finding reflection intersections */
    iterations?: number;
    /** Number of binary search refinement steps to improve reflection accuracy */
    binarySearchIterations?: number;
    /** Depth buffer precision threshold for pixel rejection */
    pixelZSize?: number;
    /**
     * Step size in pixels for ray marching along screen space. It is scaled
     * by the renderer's pixel ratio, so `iterations` reaches the same share of
     * the screen on any display density.
     */
    pixelStride?: number;
    /**
     * View distance over which `pixelStride` shrinks to 1 pixel. Rays cast from
     * surfaces beyond it step one pixel at a time, so they reach at most
     * `iterations` pixels.
     */
    pixelStrideZCutoff?: number;
    /** Maximum distance a reflection ray can travel in world units */
    maxRayDistance?: number;
    /** Screen position (0-1) where edge fade begins to hide artifacts */
    screenEdgeFadeStart?: number;
    /** Start angle (radians) for fading reflections based on viewing angle */
    eyeFadeStart?: number;
    /** End angle (radians) for fading reflections based on viewing angle */
    eyeFadeEnd?: number;
    /**
     * Offsets each ray's start along its own stride, trading the banding of a
     * coarse `pixelStride` for noise that the resolve then averages away. Only
     * meaningful with cone tracing enabled, which is where the resolve lives -
     * with `useConeTracing: false` nothing averages the rays and any non-zero
     * value dithers reflection silhouettes into visible speckle.
     */
    jitter?: number;
    /** Blend function for compositing reflections with the scene */
    blendMode?: BlendMode;
    /** Enable cone tracing that improves visual quality, but it might take a cost. */
    useConeTracing?: boolean;
    /** A ratio thats starts fading reflections */
    coneTracingFadeStart?: number;
    /** A ratio that ends fading reflections */
    coneTracingFadeEnd?: number;
    /** The max distance at which a reflection is visible */
    coneTracingMaxDistance?: number;
    /** The number of iteration to accumulate the cone tracing */
    coneTracingIteration?: number;
    /**
     * Width, in ray-buffer texels, of the neighbourhood the resolve gathers when
     * cone tracing is enabled. One ray per pixel makes reflecting a binary
     * decision; averaging the neighbours turns it into a continuous coverage, so
     * reflection silhouettes get antialiased and jittered rays become extra
     * samples of the same lobe instead of noise. Larger is smoother and softer.
     * Odd numbers only.
     */
    resolveKernelSize?: number;
} & EffectOptions;

export declare type SSRUpdate = Description_34 & EffectUpdate;

export declare class Stars extends EventHandler<StarsEvents> {
    raw: Points<StarsGeometry, StarsMaterial>;
    options: Required<StarsOptions>;
    constructor(data: ArrayBuffer, options?: StarsOptions);
    static fromUrl(url?: string, options?: StarsOptions): Stars;
    static fromUrlAsync(url?: string, options?: StarsOptions): Promise<Stars | undefined>;
    setTextures(textures: Partial<PrecomputedTextures>): void;
    setRotationFromMatrix(matrix: Matrix4): void;
    updateSunDirection(sunDirection: Vector3): void;
    get visible(): boolean;
    set visible(v: boolean);
    get pointSize(): number;
    set pointSize(v: number);
    get intensity(): number;
    set intensity(v: number);
    get background(): boolean;
    set background(v: boolean);
}

export declare type StarsConfig = MeshConfig & Description_4;

export declare class StarsDesc extends MeshDesc<StarsConfig, StarsUpdate, Stars> {
    private config;
    private _stars;
    constructor(view: default_2, ctx: ViewContext, config: StarsConfig);
    getPassKey(): "opaque" | "transparent";
    createMesh(): Stars;
    onUpdateConfig(updates: StarsUpdate): void;
    update(_time: number): void;
    protected disposeMesh(): void;
    getStars(): Stars | null;
}

declare type StarsEvents = {
    needsUpdate: () => void;
};

export declare type StarsOptions = {
    visible?: boolean;
    pointSize?: number;
    intensity?: number;
    background?: boolean;
};

export declare type StarsUpdate = MeshUpdate & Description_4;

export declare class SunLight extends EventHandler_2<SunLightEvents> {
    raw: SunDirectionalLight;
    private transmittanceTexture;
    private options;
    private csm;
    private csmHelper;
    private camera;
    constructor(camera: PerspectiveCamera, options?: SunLightOptions);
    updateSunDirection(sunDirection: Vector3): void;
    updateTargetPosition(position: Vector3): void;
    update(): void;
    setTransmittanceTexture(texture: Texture): void;
    clearTransmittanceTexture(): void;
    /**
     * Initialize CSM with current options
     */
    private initializeCSM;
    /**
     * Update CSM (call this in render loop)
     */
    private updateCSM;
    /**
     * Set the camera for CSM calculations
     */
    setCamera(camera: PerspectiveCamera): void;
    /**
     * Setup a material for CSM
     */
    setupMaterialForCSM(material: Material): void;
    /**
     * Remove a material from CSM
     */
    removeMaterialFromCSM(material: Material): void;
    /**
     * Get CSM instance for advanced usage
     */
    getCSM(): CascadedShadowMaps;
    /**
     * Get CSM helper for debug visualization
     */
    getCSMHelper(): CSMHelper | null;
    /**
     * Get the lights that should be added to the scene
     * Returns CSM lights if enabled, otherwise the standard sun light
     */
    getSceneLights(): SunDirectionalLight | CascadedDirectionalLights;
    /**
     * Get the helper that should be added to the scene for debug visualization
     */
    getSceneHelper(): CSMHelper | null;
    get visible(): boolean;
    set visible(v: boolean);
    get intensity(): number;
    set intensity(v: number);
    get shadowIntensity(): number;
    set shadowIntensity(v: number);
    get color(): Color;
    set color(v: Color);
    get applyColor(): boolean;
    set applyColor(v: boolean);
    get target(): Object3D<Object3DEventMap>;
    get castShadow(): boolean;
    set castShadow(v: boolean);
    get shadowMapSize(): number;
    set shadowMapSize(v: number);
    get shadowFar(): number;
    set shadowFar(v: number);
    get shadowCascadeCount(): number;
    set shadowCascadeCount(v: number);
    get shadowMode(): ShadowMode;
    set shadowMode(v: ShadowMode);
    get shadowLambda(): number;
    set shadowLambda(v: number);
    get shadowMargin(): number;
    set shadowMargin(v: number);
    get shadowFade(): boolean;
    set shadowFade(v: boolean);
    get shadowBias(): number;
    set shadowBias(v: number);
    get shadowNormalBias(): number;
    set shadowNormalBias(v: number);
    get shadowRadius(): number;
    set shadowRadius(v: number);
    get debugCSMHelper(): boolean;
    set debugCSMHelper(v: boolean);
}

export declare type SunLightConfig = LightConfig & Description_37;

export declare class SunLightDesc extends LightDesc<SunLightConfig, SunLightUpdate, SunLight> {
    private config;
    constructor(view: default_2, ctx: ViewContext, config: SunLightConfig);
    createLight(): SunLight;
    onUpdateConfig(updates: SunLightUpdate): void;
    private requestTransmittanceTexture;
    onCreate(): void;
    update(_time: number): void;
    onDestroy(): void;
    /**
     * Update scene lights based on current CSM state
     */
    private updateSceneLights;
    /**
     * Remove all lights and helpers from scene
     */
    private removeLightsFromScene;
}

export declare type SunLightEvents = {
    needsUpdate: () => void;
    _csmChanged: () => void;
};

export declare type SunLightOptions = {
    /**
     * Distance of the sun light from the target position.
     * @default 300
     */
    distance?: number;
    /**
     * Color of the sun light.
     * @default new Color(0xffffff)
     */
    color?: Color;
    /**
     * Whether to apply the color directly or use atmospheric scattering calculations.
     * @default false
     */
    applyColor?: boolean;
    /**
     * Intensity of the sun light.
     * @default 1
     */
    intensity?: number;
    /**
     * Whether to cast shadows using Cascaded Shadow Maps (CSM).
     * @default true
     */
    castShadow?: boolean;
    /**
     * Number of shadow cascades. More cascades provide better shadow quality
     * distribution but require more GPU resources.
     * @default 4
     */
    shadowCascadeCount?: number;
    /**
     * Resolution of shadow maps (one per cascade). Higher values provide better
     * shadow quality but require more GPU memory.
     * @default 2048
     */
    shadowMapSize?: number;
    /**
     * Maximum distance from the camera where shadows are rendered.
     * Shadows will not be visible farther than this distance.
     * @default 50000
     */
    shadowFar?: number;
    /**
     * Defines the split scheme for the camera frustum:
     * - "uniform": Linear split distribution
     * - "logarithmic": Logarithmic split distribution (better for large scenes)
     * - "practical": Hybrid approach balancing quality and performance (recommended)
     * @default "practical"
     */
    shadowMode?: ShadowMode;
    /**
     * Lambda parameter for "practical" split mode. Controls the blend between
     * uniform (0.0) and logarithmic (1.0) split schemes.
     * @default 0.8
     */
    shadowLambda?: number;
    /**
     * Defines how far the shadow camera is positioned behind the cascade frustum.
     * Larger values help prevent shadow clipping but may reduce precision.
     * @default 5000
     */
    shadowMargin?: number;
    /**
     * Enables smooth transitions between shadow cascades to reduce visible seams.
     * @default true
     */
    shadowFade?: boolean;
    /**
     * Intensity of the shadows (0 = no shadows, 1 = full shadows).
     * @default 1
     */
    shadowIntensity?: number;
    /**
     * Shadow map bias to reduce shadow acne. Similar to THREE.LightShadow.bias.
     * @default 0.0001
     */
    shadowBias?: number;
    /**
     * Normal-based shadow bias to reduce shadow acne on surfaces at glancing angles.
     * @default 0
     */
    shadowNormalBias?: number;
    /**
     * PCF kernel width in shadow-map texels (`LightShadow.radius`). The 3x3
     * kernel shows its taps above about 4.
     * @default 1
     */
    shadowRadius?: number;
    /**
     * Whether to show debug visualization of shadow cascades.
     * @default false
     */
    debugCSMHelper?: boolean;
};

export declare type SunLightUpdate = LightUpdate & Description_37;

export { TextureChannel }

export declare class ToneMapping extends Effect<ToneMappingEffect, ToneMappingOptions> {
    constructor(camera: Camera, options?: ToneMappingOptions);
    protected onMounted(): void;
    get mode(): ToneMappingMode;
    set mode(v: ToneMappingMode);
}

export declare type ToneMappingConfig = Description_35 & EffectConfig;

export declare class ToneMappingEffectDesc extends EffectDesc<ToneMappingConfig, ToneMappingUpdate, ToneMapping> {
    static key: string;
    static insertBefore: string[];
    private config;
    constructor(view: default_2, ctx: ViewContext, config: ToneMappingConfig);
    createPass(): ToneMapping;
    onUpdateConfig(updates: ToneMappingUpdate): void;
}

export { ToneMappingMode }

export declare type ToneMappingOptions = {
    mode?: ToneMappingMode;
} & EffectOptions;

export declare type ToneMappingUpdate = Description_35 & EffectUpdate;

export declare type TubeMeshConfig = MeshConfigWithSelectiveEffect & Description_11 & {
    pickable?: boolean;
};

export declare class TubeMeshDesc extends MeshDescWithSelectiveEffect<TubeMeshConfig, TubeMeshUpdate, Mesh<TubeGeometry, MeshLambertMaterial, TubeMeshEventMap>> {
    private config;
    private pickWrapper?;
    constructor(view: default_2, ctx: ViewContext, config: TubeMeshConfig);
    /** The batch ID assigned to this mesh when picking is enabled. */
    get batchId(): number | undefined;
    createMesh(): Mesh<TubeGeometry, MeshLambertMaterial, TubeMeshEventMap>;
    onUpdateConfig(updates: TubeMeshUpdate): void;
    protected disposeMesh(): void;
    onDestroy(): void;
}

declare type TubeMeshEventMap = Object3DEventMap & CustomObject3DEventMap;

export declare type TubeMeshUpdate = MeshUpdateWithSelectiveEffect & Description_11;

export { }
