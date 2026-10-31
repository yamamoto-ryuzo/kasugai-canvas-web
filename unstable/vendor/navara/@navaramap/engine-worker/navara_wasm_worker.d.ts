/* tslint:disable */
/* eslint-disable */

export class Aabb {
    free(): void;
    [Symbol.dispose](): void;
    constructor(center: Vec3, extent: Vec3);
    center: Vec3;
    extent: Vec3;
}

export class BatchPropResult {
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

export class BillboardMaterial {
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
    get center(): Vec2 | undefined;
    /**
     * anchor point of the sprite, range is (-0.5, -0.5) to (0.5, 0.5).
     * Default is (0.0, 0.0) which means the center of the sprite.
     */
    set center(value: Vec2 | null | undefined);
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

export class BoundingSphere {
    free(): void;
    [Symbol.dispose](): void;
    constructor(center_x: number, center_y: number, center_z: number, radius: number);
    center_x: number;
    center_y: number;
    center_z: number;
    radius: number;
}

/**
 * Coordinate reference system
 */
export enum CRS {
    /**
     * EPSG:4326
     */
    Geographic = 0,
    /**
     * EPSG:4978
     */
    Geocentric = 1,
}

export class CachedMeshHandle {
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

/**
 * An event for updating camera controller settings at runtime.
 *
 * This event allows partial updates to the [`CameraController`](navara_camera::CameraController)
 * component. Only fields set to `Some` will be applied; `None` fields are ignored.
 */
export class CameraControlUpdateEvent {
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

export enum CameraDirection {
    Forward = 0,
    Backward = 1,
    Left = 2,
    Right = 3,
    Up = 4,
    Down = 5,
}

/**
 * Terminal record of a `flyTo` flight, delivered once through the event
 * stream. `completed` is `false` when the flight was superseded or canceled.
 */
export class CameraFlightEndedEvent {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    completed: boolean;
    id: number;
}

export class CameraFrustum {
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

export class CameraOrientation {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    heading: number;
    pitch: number;
    roll: number;
}

export class CameraStatus {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    status: any[];
}

export enum CameraStatusType {
    Change = 0,
    LookAt = 1,
    Rotate = 2,
    MoveStart = 3,
    Moving = 4,
    MoveEnd = 5,
}

export class CompiledExpression {
    free(): void;
    [Symbol.dispose](): void;
    /**
     * Evaluate expression with given context
     *
     * # Arguments
     * * `properties_json` - Feature properties as JSON object
     * * `zoom` - Current zoom level
     * * `geometry_type` - Optional geometry type string (e.g., "Point", "Polygon")
     *
     * # Returns
     * Evaluated value as JsValue. Supported types:
     * - Null, Bool, Number, String (primitives)
     * - Color: `{r, g, b, a}` object
     * - Array, Object: nested structures
     * - NumberArray: returned as a JS `number[]`
     *
     * Unsupported types return `null` with a console warning.
     */
    evaluate(properties_json: any, zoom: number, geometry_type?: string | null): any;
    /**
     * Extract all feature property names accessed by this expression.
     * Returns a JavaScript array of property name strings.
     * This allows filtering properties before evaluation to reduce serialization overhead.
     */
    getRequiredProperties(): Array<any>;
    /**
     * Compile a MapLibre expression from JSON with optional expected type
     *
     * # Arguments
     * * `expr_json` - Expression array (e.g., ["get", "name"])
     * * `expected_type` - Optional expected type string: "color", "number", "boolean", "string", "array"
     *
     * Type checking ensures expressions return the correct type for their property,
     * matching JsStyleEngine's behavior with createExpression(expr, spec).
     */
    constructor(expr_json: any, expected_type?: string | null);
}

export class CompiledFilter {
    free(): void;
    [Symbol.dispose](): void;
    /**
     * Compile a MapLibre filter from JSON
     * filter_json: Filter expression (e.g., ["==", ["get", "type"], "park"])
     */
    constructor(filter_json: any);
    /**
     * Test if feature matches filter
     *
     * # Arguments
     * * `properties_json` - Feature properties as JSON object
     * * `zoom` - Current zoom level
     * * `geometry_type` - Optional geometry type string (e.g., "Point", "Polygon")
     */
    test(properties_json: any, zoom: number, geometry_type?: string | null): boolean;
}

export class ConstructedPolygonGeometry {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    batch_id(): Float32Array | undefined;
    batch_id_size(): number | undefined;
    batch_index(): Uint32Array | undefined;
    batch_index_size(): number | undefined;
    indices(): Uint32Array;
    normal(): Float32Array | undefined;
    normal_size(): number | undefined;
    outline(): ConstructedPolygonOutlineGeometry | undefined;
    position(): Float32Array | undefined;
    position_3d_high(): Float32Array | undefined;
    position_3d_high_size(): number | undefined;
    position_3d_low(): Float32Array | undefined;
    position_3d_low_size(): number | undefined;
    position_size(): number | undefined;
    scale_normal_and_cap(): Float32Array | undefined;
    scale_normal_and_cap_size(): number | undefined;
    get extent(): ExtentRadianF32 | undefined;
    set extent(value: ExtentRadianF32 | null | undefined);
    /**
     * RTC (Relative-To-Center) translation vector
     * Contains the tile center in world-space ECEF coordinates
     * Used to position the mesh while keeping vertex positions in local space
     */
    get rtc_translation(): Vec3 | undefined;
    /**
     * RTC (Relative-To-Center) translation vector
     * Contains the tile center in world-space ECEF coordinates
     * Used to position the mesh while keeping vertex positions in local space
     */
    set rtc_translation(value: Vec3 | null | undefined);
}

export class ConstructedPolygonOutlineGeometry {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    batch_index(): Float32Array | undefined;
    batch_index_size(): number | undefined;
    position(): Float32Array;
    position_3d_high(): Float32Array | undefined;
    position_3d_high_size(): number | undefined;
    position_3d_low(): Float32Array | undefined;
    position_3d_low_size(): number | undefined;
    position_size(): number;
    scale_normal_and_cap(): Float32Array;
    scale_normal_and_cap_size(): number;
    skip_indices(): Uint32Array;
}

export class ConstructedPolylineGeometry {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    batch_id(): Float32Array | undefined;
    batch_id_size(): number | undefined;
    batch_index(): Uint32Array | undefined;
    batch_index_size(): number | undefined;
    end_high(): Float32Array | undefined;
    end_high_size(): number | undefined;
    end_low(): Float32Array | undefined;
    end_low_size(): number | undefined;
    end_normal_and_texture_coordinate_normalization_x(): Float32Array | undefined;
    end_normal_and_texture_coordinate_normalization_x_size(): number | undefined;
    forward_offset(): Float32Array | undefined;
    forward_offset_size(): number | undefined;
    indices(): Uint32Array;
    position(): Float32Array;
    position_high(): Float32Array | undefined;
    position_high_size(): number | undefined;
    position_low(): Float32Array | undefined;
    position_low_size(): number | undefined;
    position_size(): number;
    right_normal_and_texture_coordinate_normalization_y(): Float32Array;
    right_normal_and_texture_coordinate_normalization_y_size(): number;
    start(): Float32Array | undefined;
    start_high(): Float32Array | undefined;
    start_high_size(): number | undefined;
    start_low(): Float32Array | undefined;
    start_low_size(): number | undefined;
    start_normals(): Float32Array | undefined;
    start_normals_size(): number | undefined;
    start_size(): number | undefined;
    readonly extent: ExtentRadianF32 | undefined;
}

/**
 * Maps a 3D Tiles feature table semantic (`POSITION`, `RGB`, ...) to its
 * Draco unique attribute id.
 */
export class DracoAttributeId {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    semantic: string;
    uniqueId: number;
}

export class ElevationDecoder {
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

/**
 * Elevation-heatmap render options for a `raster` layer. The elevation decoder
 * is taken from the referenced `raster-dem` source, not from here.
 */
export class ElevationHeatmapMaterial {
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

export class EllipsoidGeodesic {
    free(): void;
    [Symbol.dispose](): void;
    interpolateDistance(distance: number): LLE;
    interpolateGeodeticPoints(granularity?: number | null): LLE[];
    constructor(start: LLE, end: LLE);
    /**
     * Whether Vincenty's inverse iteration converged. `false` for
     * near-antipodal endpoints, where `distance` is only a rough estimate
     * and interpolation snaps to the endpoints instead of following the
     * (unreliable) capped solution.
     */
    converged: boolean;
    distance: number;
    end_heading: number;
    end: LLE;
    start_heading: number;
    start: LLE;
}

export class EncodedVec3 {
    free(): void;
    [Symbol.dispose](): void;
    constructor(high: Vec3, low: Vec3);
    high: Vec3;
    low: Vec3;
}

export class ExtentRadianF32 {
    free(): void;
    [Symbol.dispose](): void;
    constructor(west: number, south: number, east: number, north: number);
    east: number;
    north: number;
    south: number;
    west: number;
}

export class FloatAttribute {
    free(): void;
    [Symbol.dispose](): void;
    constructor(data: Float32Array, size: number);
    transferData(): Float32Array;
    size: number;
}

export class Geometry {
    free(): void;
    [Symbol.dispose](): void;
    hasNormals(): boolean;
    hasSkirt(): boolean;
    constructor(vertices: Float32Array, indices: Uint32Array, uvs: Float32Array);
    transferIndices(): Uint32Array;
    transferNormals(): Float32Array | undefined;
    transferSkirtIndices(): Uint32Array | undefined;
    transferSkirtNormals(): Float32Array | undefined;
    transferSkirtUvs(): Float32Array | undefined;
    transferSkirtVertices(): Float32Array | undefined;
    transferUvs(): Float32Array;
    transferVertices(): Float32Array;
}

/**
 * WASM wrapper for Globe resource.
 *
 * This provides a JavaScript-friendly interface for accessing and modifying
 * globe configuration properties.
 */
export class Globe {
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
 * Hillshade render options for a `raster` layer. The elevation decoder is taken
 * from the referenced `raster-dem` source, not from here.
 */
export class HillshadeMaterial {
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

export class LLE {
    free(): void;
    [Symbol.dispose](): void;
    constructor(lat: number, lng: number, height: number);
    height: number;
    lat: number;
    lng: number;
}

export class ModelInternalMaterial {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    get dracoAttributes(): DracoAttributeId[] | undefined;
    set dracoAttributes(value: DracoAttributeId[] | null | undefined);
    pointCloudGeodeticNormal: Vec3;
    pointCloud: boolean;
}

export class ModelMaterial {
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

export class NearFar {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    far: number;
    near: number;
}

export class OverscaledTileHandle {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    handle: bigint;
}

export class Plane {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    distance: number;
    normal: Vec3;
}

export class PointMaterial {
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
    get center(): Vec2 | undefined;
    /**
     * anchor point of the sprite, range is (-0.5, -0.5) to (0.5, 0.5).
     * Default is (0.0, 0.0) which means the center of the sprite.
     */
    set center(value: Vec2 | null | undefined);
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

export class PolygonGeometry {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    batch_id(): Float32Array | undefined;
    batch_id_size(): number | undefined;
    batch_index(): Uint32Array | undefined;
    batch_index_size(): number | undefined;
    indices(): Uint32Array;
    normal(): Float32Array | undefined;
    normal_size(): number | undefined;
    position(): Float32Array | undefined;
    position_3d_high(): Float32Array | undefined;
    position_3d_high_size(): number | undefined;
    position_3d_low(): Float32Array | undefined;
    position_3d_low_size(): number | undefined;
    position_size(): number | undefined;
    scale_normal_and_cap(): Float32Array | undefined;
    scale_normal_and_cap_size(): number | undefined;
}

export class PolygonGeometryAttributes {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    transfer_batch_id(): Float32Array | undefined;
    transfer_batch_id_size(): number | undefined;
    transfer_batch_index(): Uint32Array | undefined;
    transfer_batch_index_size(): number | undefined;
    transfer_normal(): Float32Array | undefined;
    transfer_normal_size(): number | undefined;
    transfer_position(): Float32Array | undefined;
    transfer_position_3d_high(): Float32Array | undefined;
    transfer_position_3d_high_size(): number | undefined;
    transfer_position_3d_low(): Float32Array | undefined;
    transfer_position_3d_low_size(): number | undefined;
    transfer_position_size(): number | undefined;
    transfer_scale_normal_and_cap(): Float32Array | undefined;
    transfer_scale_normal_and_cap_size(): number | undefined;
}

export class PolygonInternalMaterial {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    minMaxHeights: Float64Array;
}

export class PolygonMaterial {
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

export class PolylineGeometry {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    batch_id(): Float32Array | undefined;
    batch_id_size(): number | undefined;
    batch_index(): Uint32Array | undefined;
    batch_index_size(): number | undefined;
    end_high(): Float32Array | undefined;
    end_high_size(): number | undefined;
    end_low(): Float32Array | undefined;
    end_low_size(): number | undefined;
    end_normal_and_texture_coordinate_normalization_x(): Float32Array | undefined;
    end_normal_and_texture_coordinate_normalization_x_size(): number | undefined;
    forward_offset(): Float32Array | undefined;
    forward_offset_size(): number | undefined;
    indices(): Uint32Array;
    position(): Float32Array;
    position_high(): Float32Array | undefined;
    position_high_size(): number | undefined;
    position_low(): Float32Array | undefined;
    position_low_size(): number | undefined;
    position_size(): number;
    right_normal_and_texture_coordinate_normalization_y(): Float32Array;
    right_normal_and_texture_coordinate_normalization_y_size(): number;
    start(): Float32Array | undefined;
    start_high(): Float32Array | undefined;
    start_high_size(): number | undefined;
    start_low(): Float32Array | undefined;
    start_low_size(): number | undefined;
    start_normals(): Float32Array | undefined;
    start_normals_size(): number | undefined;
    start_size(): number | undefined;
}

export class PolylineGeometryAttributes {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    transfer_batch_id(): Float32Array | undefined;
    transfer_batch_id_size(): number | undefined;
    transfer_batch_index(): Uint32Array | undefined;
    transfer_batch_index_size(): number | undefined;
    transfer_end_high(): Float32Array | undefined;
    transfer_end_high_size(): number | undefined;
    transfer_end_low(): Float32Array | undefined;
    transfer_end_low_size(): number | undefined;
    transfer_end_normal_and_texture_coordinate_normalization_x(): Float32Array | undefined;
    transfer_end_normal_and_texture_coordinate_normalization_x_size(): number | undefined;
    transfer_forward_offset(): Float32Array | undefined;
    transfer_forward_offset_size(): number | undefined;
    transfer_position(): Float32Array;
    transfer_position_high(): Float32Array | undefined;
    transfer_position_high_size(): number | undefined;
    transfer_position_low(): Float32Array | undefined;
    transfer_position_low_size(): number | undefined;
    transfer_position_size(): number;
    transfer_right_normal_and_texture_coordinate_normalization_y(): Float32Array;
    transfer_right_normal_and_texture_coordinate_normalization_y_size(): number;
    transfer_start(): Float32Array | undefined;
    transfer_start_high(): Float32Array | undefined;
    transfer_start_high_size(): number | undefined;
    transfer_start_low(): Float32Array | undefined;
    transfer_start_low_size(): number | undefined;
    transfer_start_normals(): Float32Array | undefined;
    transfer_start_normals_size(): number | undefined;
    transfer_start_size(): number | undefined;
}

export class PolylineInternalMaterial {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    minMaxHeights: Float64Array;
}

export class PolylineMaterial {
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

/**
 * Render-only appearance for a `raster` layer's imagery. All fetch/tiling
 * config lives on the referenced `Source`; only display fields are carried
 * here. Parallel to [`HillshadeMaterial`] / [`ElevationHeatmapMaterial`].
 */
export class RasterMaterial {
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

export class RasterTileInternalMaterial {
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

export class Ray {
    free(): void;
    [Symbol.dispose](): void;
    getPoint(t: number): Vec3;
    constructor(origin: Vec3, direction: Vec3);
    direction: Vec3;
    origin: Vec3;
}

export class ReturnedConstructedTerrainMesh {
    free(): void;
    [Symbol.dispose](): void;
    hasNormals(): boolean;
    hasSkirt(): boolean;
    hasWatermask(): boolean;
    constructor(geometry: Geometry, max_height: number, min_height: number, heights: Float32Array, rtc_translation?: Vec3 | null);
    transferHeights(): Float32Array;
    transferIndices(): Uint32Array;
    transferNormals(): Float32Array | undefined;
    transferSkirtIndices(): Uint32Array | undefined;
    transferSkirtNormals(): Float32Array | undefined;
    transferSkirtUvs(): Float32Array | undefined;
    transferSkirtVertices(): Float32Array | undefined;
    transferUvs(): Float32Array;
    transferVertices(): Float32Array;
    transferWatermask(): Uint8Array | undefined;
    max_height: number;
    min_height: number;
    get rtc_translation(): Vec3 | undefined;
    set rtc_translation(value: Vec3 | null | undefined);
}

/**
 * Render-only appearance for a `terrain` layer's mesh, regardless of the
 * referenced source's data format (raster-dem, quantized-mesh, or the
 * source-less ellipsoid). All fetch/geometry config lives on the referenced
 * `Source`; the data format itself is carried by `TerrainDataType`.
 */
export class TerrainMaterial {
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

export class TextMaterial {
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
    get center(): Vec2 | undefined;
    set center(value: Vec2 | null | undefined);
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

export class TextureFragment {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    gen: number;
    ind: number;
}

export class TileUvTransform {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    offset: Vec2;
    scale: Vec2;
}

export class TileXYZ {
    free(): void;
    [Symbol.dispose](): void;
    constructor(x: number, y: number, z: number);
    x: number;
    y: number;
    z: number;
}

export class TransferableHierarchy {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    expected_winding_order: number;
}

/**
 * To transfer the hierarchy efficiently, the holes are managed as one-dimensional array.
 */
export class TransferableHoles {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
}

export class TransferableMartini {
    free(): void;
    [Symbol.dispose](): void;
    static fromSize(size: number): TransferableMartini;
    constructor(size: number, coords: Uint32Array);
    transfer_coords(): Uint32Array;
    size: number;
}

/**
 * A whole tile's parsed MVT groups transferred out of the parse worker.
 *
 * The bulk geometry of every (layer, kind) group is packed into four
 * contiguous per-type streams (see `navara_parser::mvt::pack_parsed_mvt_groups`
 * for the segment order), so the postMessage transfer list carries exactly
 * four buffers per tile regardless of the group count. The tile meta
 * (`ParsedMvtTileMeta`: per-group headers plus per-layer property tables,
 * pre-serialized by the worker) rides along as a structured clone and lets
 * the main thread slice the streams back apart.
 */
export class TransferableParsedMvtResult {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    f32_stream(): Float32Array;
    f64_stream(): Float64Array;
    meta(): any;
    u32_stream(): Uint32Array;
    u8_stream(): Uint8Array;
}

/**
 * To transfer the batched feature efficiently, the all feature's properties are managed as one-dimensional array.
 */
export class TransferablePolygonBatchedFeature {
    free(): void;
    [Symbol.dispose](): void;
    constructor(crs: CRS, length: number);
    setBatchIds(byte_length: number, f: Function): void;
    setBatchIndices(byte_length: number, f: Function): void;
    setExpectedWindingOrders(byte_length: number, f: Function): void;
    setHoles(byte_length: number, f: Function): void;
    setHolesBoundaries(byte_length: number, f: Function): void;
    setHolesSizes(byte_length: number, f: Function): void;
    setHolesTotalSizes(byte_length: number, f: Function): void;
    setOuterRing(byte_length: number, f: Function): void;
    setOuterRingSizes(byte_length: number, f: Function): void;
    transferBatchIds(): Uint32Array;
    transferBatchIndices(): Uint32Array;
    transferExpectedWindingOrders(): Uint8Array;
    transferHoles(): Float64Array;
    transferHolesBoundaries(): Uint32Array;
    transferHolesSizes(): Uint32Array;
    transferHolesTotalSizes(): Uint32Array;
    transferOuterRing(): Float64Array;
    transferOuterRingSizes(): Uint32Array;
    crs: CRS;
    length: number;
}

/**
 * To transfer the batched feature efficiently, the all feature's properties are managed as one-dimensional array.
 */
export class TransferablePolylineBatchedFeature {
    free(): void;
    [Symbol.dispose](): void;
    constructor(crs: CRS, length: number);
    setBatchIds(byte_length: number, f: Function): void;
    setBatchIndices(byte_length: number, f: Function): void;
    setPoints(byte_length: number, f: Function): void;
    setPointsSizes(byte_length: number, f: Function): void;
    setRingFlags(byte_length: number, f: Function): void;
    transferBatchIds(): Uint32Array;
    transferBatchIndices(): Uint32Array;
    transferPoints(): Float64Array;
    transferPointsSizes(): Uint32Array;
    transferRingFlags(): Uint8Array;
    crs: CRS;
    length: number;
}

export class TransferableRasterDEMData {
    free(): void;
    [Symbol.dispose](): void;
    constructor(decoder: ElevationDecoder);
    decoder: ElevationDecoder;
}

export class TransferableTile {
    free(): void;
    [Symbol.dispose](): void;
    constructor(coords: TileXYZ, max_height: number, min_height: number, cached_mesh_handle?: CachedMeshHandle | null);
    get cached_mesh_handle(): CachedMeshHandle | undefined;
    set cached_mesh_handle(value: CachedMeshHandle | null | undefined);
    coords: TileXYZ;
    max_height: number;
    min_height: number;
}

export class Transform {
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

export class UintAttribute {
    free(): void;
    [Symbol.dispose](): void;
    constructor(data: Uint32Array, size: number);
    transferData(): Uint32Array;
    size: number;
}

export class UpsamplableTerrainGeometry {
    free(): void;
    [Symbol.dispose](): void;
    constructor(uvs: Float32Array, indices: Uint32Array, heights: Float32Array, normals?: Float32Array | null, watermask?: Uint8Array | null);
}

export class Vec2 {
    free(): void;
    [Symbol.dispose](): void;
    constructor(x: number, y: number);
    x: number;
    y: number;
}

export class Vec3 {
    free(): void;
    [Symbol.dispose](): void;
    constructor(x: number, y: number, z: number);
    x: number;
    y: number;
    z: number;
}

export class WindingOrder {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    0: number;
}

export class Window {
    free(): void;
    [Symbol.dispose](): void;
    constructor(width: number, height: number, pixel_ratio: number);
    height: number;
    pixelRatio: number;
    width: number;
}

export function constructPolygonBatchedFeature(features: TransferablePolygonBatchedFeature, material: PolygonMaterial, flat: boolean, tile_extent?: ExtentRadianF32 | null): ConstructedPolygonGeometry | undefined;

export function constructPolylineBatchedFeature(features: TransferablePolylineBatchedFeature, material: PolylineMaterial, flat: boolean): ConstructedPolylineGeometry | undefined;

export function constructQuantizedMeshTerrainMesh(bytes: Uint8Array, tile: TransferableTile, skirt: boolean, skirt_exaggeration: number, pole_north: boolean, pole_south: boolean, geographic: boolean, tms: boolean): ReturnedConstructedTerrainMesh;

/**
 * `martini_size` is the DEM tile width plus one (the grid is 2^n + 1).
 */
export function constructTerrainMesh(bytes: Uint8Array, tile: TransferableTile, raster_dem_data: TransferableRasterDEMData, martini_size: number, skirt: boolean, skirt_exaggeration: number, pole_north: boolean, pole_south: boolean): ReturnedConstructedTerrainMesh;

/**
 * Parse an MVT tile off the main thread.
 *
 * `mvt_bin` is the raw pbf, `configs` is a serialized `Vec<LayerParseConfig>`
 * (one per matched target layer), and `tile_extent` (when present) yields the
 * RTC center for point encoding. The parsed groups are packed into four
 * per-type streams (`pack_parsed_mvt_groups`) so the caller transfers exactly
 * four buffers back to the main thread; the tile meta (per-group headers +
 * per-layer property tables) rides along as a structured clone.
 */
export function parseMvtTile(mvt_bin: Uint8Array, x: number, y: number, z: number, tile_extent: ExtentRadianF32 | null | undefined, compression: number, configs_json: string): TransferableParsedMvtResult;

export function start(): void;

export function upsampleQuantizedMeshTerrainMesh(tile: TransferableTile, source_tile: TransferableTile, upsamplable_geometry: UpsamplableTerrainGeometry, skirt: boolean, skirt_exaggeration: number, pole_north: boolean, pole_south: boolean, geographic: boolean, tms: boolean): ReturnedConstructedTerrainMesh;

/**
 * Upsample a raster-DEM tile from a real-DEM ancestor: the ancestor's DEM
 * pixels are resampled down the quadrant path to this tile and meshed at
 * this tile's own level, so the result matches what the real DEM tile will
 * look like, just at a lower source resolution. The engine may have rebuilt
 * its tiling after this task was queued, in which case the source no longer
 * names an ancestor: fail the task instead of aborting the worker.
 * `martini_size` is the DEM tile width plus one (the grid is 2^n + 1).
 */
export function upsampleTerrainMesh(tile: TransferableTile, source_tile: TransferableTile, raster_dem_data: TransferableRasterDEMData, source_bytes: Uint8Array, martini_size: number, skirt: boolean, skirt_exaggeration: number, pole_north: boolean, pole_south: boolean, tms: boolean): ReturnedConstructedTerrainMesh;

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
    readonly memory: WebAssembly.Memory;
    readonly constructPolygonBatchedFeature: (a: number, b: number, c: number, d: number) => number;
    readonly constructPolylineBatchedFeature: (a: number, b: number, c: number) => number;
    readonly constructQuantizedMeshTerrainMesh: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number) => number;
    readonly constructTerrainMesh: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number) => number;
    readonly parseMvtTile: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number) => [number, number, number];
    readonly start: () => void;
    readonly upsampleQuantizedMeshTerrainMesh: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number) => [number, number, number];
    readonly upsampleTerrainMesh: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number, j: number, k: number) => [number, number, number];
    readonly __wbg_get_transferablemartini_size: (a: number) => number;
    readonly __wbg_get_transferablerasterdemdata_decoder: (a: number) => number;
    readonly __wbg_get_transferabletile_cached_mesh_handle: (a: number) => number;
    readonly __wbg_get_transferabletile_coords: (a: number) => number;
    readonly __wbg_get_transferabletile_max_height: (a: number) => number;
    readonly __wbg_get_transferabletile_min_height: (a: number) => number;
    readonly __wbg_set_transferablemartini_size: (a: number, b: number) => void;
    readonly __wbg_set_transferablerasterdemdata_decoder: (a: number, b: number) => void;
    readonly __wbg_set_transferabletile_cached_mesh_handle: (a: number, b: number) => void;
    readonly __wbg_set_transferabletile_coords: (a: number, b: number) => void;
    readonly __wbg_set_transferabletile_max_height: (a: number, b: number) => void;
    readonly __wbg_set_transferabletile_min_height: (a: number, b: number) => void;
    readonly __wbg_transferablemartini_free: (a: number, b: number) => void;
    readonly __wbg_transferablerasterdemdata_free: (a: number, b: number) => void;
    readonly transferablemartini_fromSize: (a: number) => number;
    readonly transferablemartini_new: (a: number, b: number, c: number) => number;
    readonly transferablemartini_transfer_coords: (a: number) => any;
    readonly transferablerasterdemdata_new: (a: number) => number;
    readonly transferabletile_new: (a: number, b: number, c: number, d: number) => number;
    readonly __wbg_transferabletile_free: (a: number, b: number) => void;
    readonly __wbg_aabb_free: (a: number, b: number) => void;
    readonly __wbg_batchpropresult_free: (a: number, b: number) => void;
    readonly __wbg_billboardmaterial_free: (a: number, b: number) => void;
    readonly __wbg_boundingsphere_free: (a: number, b: number) => void;
    readonly __wbg_cachedmeshhandle_free: (a: number, b: number) => void;
    readonly __wbg_cameracontrolupdateevent_free: (a: number, b: number) => void;
    readonly __wbg_cameraflightendedevent_free: (a: number, b: number) => void;
    readonly __wbg_cameraorientation_free: (a: number, b: number) => void;
    readonly __wbg_camerastatus_free: (a: number, b: number) => void;
    readonly __wbg_compiledexpression_free: (a: number, b: number) => void;
    readonly __wbg_constructedpolygongeometry_free: (a: number, b: number) => void;
    readonly __wbg_constructedpolygonoutlinegeometry_free: (a: number, b: number) => void;
    readonly __wbg_constructedpolylinegeometry_free: (a: number, b: number) => void;
    readonly __wbg_dracoattributeid_free: (a: number, b: number) => void;
    readonly __wbg_elevationdecoder_free: (a: number, b: number) => void;
    readonly __wbg_elevationheatmapmaterial_free: (a: number, b: number) => void;
    readonly __wbg_ellipsoidgeodesic_free: (a: number, b: number) => void;
    readonly __wbg_extentradianf32_free: (a: number, b: number) => void;
    readonly __wbg_floatattribute_free: (a: number, b: number) => void;
    readonly __wbg_geometry_free: (a: number, b: number) => void;
    readonly __wbg_get_aabb_center: (a: number) => number;
    readonly __wbg_get_aabb_extent: (a: number) => number;
    readonly __wbg_get_batchpropresult_batchId: (a: number) => number;
    readonly __wbg_get_batchpropresult_layerId: (a: number) => [number, number];
    readonly __wbg_get_batchpropresult_properties: (a: number) => any;
    readonly __wbg_get_billboardmaterial_alphaTest: (a: number) => number;
    readonly __wbg_get_billboardmaterial_backfaceCulling: (a: number) => number;
    readonly __wbg_get_billboardmaterial_billboardFacing: (a: number) => [number, number];
    readonly __wbg_get_billboardmaterial_center: (a: number) => number;
    readonly __wbg_get_billboardmaterial_clampToGround: (a: number) => number;
    readonly __wbg_get_billboardmaterial_color: (a: number) => number;
    readonly __wbg_get_billboardmaterial_declutter: (a: number) => number;
    readonly __wbg_get_billboardmaterial_declutterPriority: (a: number) => number;
    readonly __wbg_get_billboardmaterial_depthTest: (a: number) => number;
    readonly __wbg_get_billboardmaterial_effectIds: (a: number) => [number, number];
    readonly __wbg_get_billboardmaterial_emissiveColor: (a: number) => number;
    readonly __wbg_get_billboardmaterial_emissiveIntensity: (a: number) => number;
    readonly __wbg_get_billboardmaterial_geometryTypes: (a: number) => [number, number];
    readonly __wbg_get_billboardmaterial_height: (a: number) => number;
    readonly __wbg_get_billboardmaterial_offsetDepth: (a: number) => number;
    readonly __wbg_get_billboardmaterial_opacity: (a: number) => number;
    readonly __wbg_get_billboardmaterial_rotateWithCamera: (a: number) => number;
    readonly __wbg_get_billboardmaterial_rotation: (a: number) => number;
    readonly __wbg_get_billboardmaterial_show: (a: number) => number;
    readonly __wbg_get_billboardmaterial_size: (a: number) => number;
    readonly __wbg_get_billboardmaterial_sizeInMeters: (a: number) => number;
    readonly __wbg_get_billboardmaterial_transparent: (a: number) => number;
    readonly __wbg_get_billboardmaterial_url: (a: number) => [number, number];
    readonly __wbg_get_boundingsphere_center_x: (a: number) => number;
    readonly __wbg_get_boundingsphere_center_y: (a: number) => number;
    readonly __wbg_get_boundingsphere_center_z: (a: number) => number;
    readonly __wbg_get_boundingsphere_radius: (a: number) => number;
    readonly __wbg_get_cachedmeshhandle_heights: (a: number) => number;
    readonly __wbg_get_cachedmeshhandle_indices: (a: number) => number;
    readonly __wbg_get_cachedmeshhandle_normals: (a: number) => number;
    readonly __wbg_get_cachedmeshhandle_uvs: (a: number) => number;
    readonly __wbg_get_cachedmeshhandle_vertices: (a: number) => number;
    readonly __wbg_get_cachedmeshhandle_watermask: (a: number) => number;
    readonly __wbg_get_cameracontrolupdateevent_autoAdjustNearFar: (a: number) => number;
    readonly __wbg_get_cameracontrolupdateevent_enableSpin: (a: number) => number;
    readonly __wbg_get_cameracontrolupdateevent_enableTilt: (a: number) => number;
    readonly __wbg_get_cameracontrolupdateevent_enableZoom: (a: number) => number;
    readonly __wbg_get_cameracontrolupdateevent_maximumZoomDistance: (a: number) => [number, number];
    readonly __wbg_get_cameracontrolupdateevent_minimumZoomDistance: (a: number) => [number, number];
    readonly __wbg_get_cameracontrolupdateevent_spinSpeed: (a: number) => [number, number];
    readonly __wbg_get_cameracontrolupdateevent_zoomSpeed: (a: number) => [number, number];
    readonly __wbg_get_cameraflightendedevent_completed: (a: number) => number;
    readonly __wbg_get_cameraflightendedevent_id: (a: number) => number;
    readonly __wbg_get_camerastatus_status: (a: number) => [number, number];
    readonly __wbg_get_constructedpolygongeometry_extent: (a: number) => number;
    readonly __wbg_get_constructedpolygongeometry_rtc_translation: (a: number) => number;
    readonly __wbg_get_dracoattributeid_semantic: (a: number) => [number, number];
    readonly __wbg_get_dracoattributeid_uniqueId: (a: number) => number;
    readonly __wbg_get_elevationdecoder_boundary: (a: number) => number;
    readonly __wbg_get_elevationdecoder_epsilon: (a: number) => number;
    readonly __wbg_get_elevationdecoder_max_offset: (a: number) => number;
    readonly __wbg_get_elevationdecoder_min_offset: (a: number) => number;
    readonly __wbg_get_elevationheatmapmaterial_logarithmic: (a: number) => number;
    readonly __wbg_get_ellipsoidgeodesic_converged: (a: number) => number;
    readonly __wbg_get_ellipsoidgeodesic_end: (a: number) => number;
    readonly __wbg_get_ellipsoidgeodesic_end_heading: (a: number) => number;
    readonly __wbg_get_ellipsoidgeodesic_start: (a: number) => number;
    readonly __wbg_get_extentradianf32_east: (a: number) => number;
    readonly __wbg_get_extentradianf32_north: (a: number) => number;
    readonly __wbg_get_extentradianf32_south: (a: number) => number;
    readonly __wbg_get_extentradianf32_west: (a: number) => number;
    readonly __wbg_get_floatattribute_size: (a: number) => number;
    readonly __wbg_get_globe_color: (a: number) => number;
    readonly __wbg_get_globe_elevationColormap: (a: number) => [number, number];
    readonly __wbg_get_globe_hideUnderground: (a: number) => number;
    readonly __wbg_get_globe_isGeographicTiling: (a: number) => number;
    readonly __wbg_get_globe_opacity: (a: number) => number;
    readonly __wbg_get_globe_segments: (a: number) => number;
    readonly __wbg_get_globe_transparent: (a: number) => number;
    readonly __wbg_get_globe_useNormal: (a: number) => number;
    readonly __wbg_get_globe_wireframe: (a: number) => number;
    readonly __wbg_get_hillshadematerial_exaggeration: (a: number) => number;
    readonly __wbg_get_modelinternalmaterial_dracoAttributes: (a: number) => [number, number];
    readonly __wbg_get_modelinternalmaterial_pointCloud: (a: number) => number;
    readonly __wbg_get_modelmaterial___internal__: (a: number) => number;
    readonly __wbg_get_modelmaterial_animationActiveClip: (a: number) => [number, number];
    readonly __wbg_get_modelmaterial_animationSpeed: (a: number) => number;
    readonly __wbg_get_modelmaterial_applyWaterNormal: (a: number) => number;
    readonly __wbg_get_modelmaterial_castShadow: (a: number) => number;
    readonly __wbg_get_modelmaterial_color: (a: number) => number;
    readonly __wbg_get_modelmaterial_creaseNormalAngle: (a: number) => number;
    readonly __wbg_get_modelmaterial_depthWrite: (a: number) => number;
    readonly __wbg_get_modelmaterial_effectIds: (a: number) => [number, number];
    readonly __wbg_get_modelmaterial_emissiveColor: (a: number) => number;
    readonly __wbg_get_modelmaterial_emissiveIntensity: (a: number) => number;
    readonly __wbg_get_modelmaterial_height: (a: number) => number;
    readonly __wbg_get_modelmaterial_ior: (a: number) => number;
    readonly __wbg_get_modelmaterial_lit: (a: number) => number;
    readonly __wbg_get_modelmaterial_maxSse: (a: number) => number;
    readonly __wbg_get_modelmaterial_metalness: (a: number) => number;
    readonly __wbg_get_modelmaterial_normals: (a: number) => number;
    readonly __wbg_get_modelmaterial_opacity: (a: number) => number;
    readonly __wbg_get_modelmaterial_pointSize: (a: number) => number;
    readonly __wbg_get_modelmaterial_receiveShadow: (a: number) => number;
    readonly __wbg_get_modelmaterial_shouldRotateInDefault: (a: number) => number;
    readonly __wbg_get_modelmaterial_show: (a: number) => number;
    readonly __wbg_get_modelmaterial_showBoundingBox: (a: number) => number;
    readonly __wbg_get_modelmaterial_size: (a: number) => number;
    readonly __wbg_get_modelmaterial_specular: (a: number) => number;
    readonly __wbg_get_modelmaterial_transparent: (a: number) => number;
    readonly __wbg_get_modelmaterial_url: (a: number) => [number, number];
    readonly __wbg_get_modelmaterial_water: (a: number) => number;
    readonly __wbg_get_overscaledtilehandle_handle: (a: number) => bigint;
    readonly __wbg_get_pointmaterial_backfaceCulling: (a: number) => number;
    readonly __wbg_get_pointmaterial_clampToGround: (a: number) => number;
    readonly __wbg_get_pointmaterial_declutter: (a: number) => number;
    readonly __wbg_get_pointmaterial_depthTest: (a: number) => number;
    readonly __wbg_get_pointmaterial_effectIds: (a: number) => [number, number];
    readonly __wbg_get_pointmaterial_emissiveColor: (a: number) => number;
    readonly __wbg_get_pointmaterial_geometryTypes: (a: number) => [number, number];
    readonly __wbg_get_pointmaterial_offsetDepth: (a: number) => number;
    readonly __wbg_get_pointmaterial_pointFacing: (a: number) => [number, number];
    readonly __wbg_get_pointmaterial_rotateWithCamera: (a: number) => number;
    readonly __wbg_get_pointmaterial_show: (a: number) => number;
    readonly __wbg_get_pointmaterial_sizeInMeters: (a: number) => number;
    readonly __wbg_get_pointmaterial_transparent: (a: number) => number;
    readonly __wbg_get_polygoninternalmaterial_minMaxHeights: (a: number) => [number, number];
    readonly __wbg_get_polygonmaterial___internal__: (a: number) => number;
    readonly __wbg_get_polygonmaterial_applyWaterNormal: (a: number) => number;
    readonly __wbg_get_polygonmaterial_castShadow: (a: number) => number;
    readonly __wbg_get_polygonmaterial_clampToGround: (a: number) => number;
    readonly __wbg_get_polygonmaterial_color: (a: number) => number;
    readonly __wbg_get_polygonmaterial_effectIds: (a: number) => [number, number];
    readonly __wbg_get_polygonmaterial_emissiveColor: (a: number) => number;
    readonly __wbg_get_polygonmaterial_emissiveIntensity: (a: number) => number;
    readonly __wbg_get_polygonmaterial_extrudedHeight: (a: number) => number;
    readonly __wbg_get_polygonmaterial_height: (a: number) => number;
    readonly __wbg_get_polygonmaterial_ior: (a: number) => number;
    readonly __wbg_get_polygonmaterial_lit: (a: number) => number;
    readonly __wbg_get_polygonmaterial_opacity: (a: number) => number;
    readonly __wbg_get_polygonmaterial_outline: (a: number) => number;
    readonly __wbg_get_polygonmaterial_outlineColor: (a: number) => number;
    readonly __wbg_get_polygonmaterial_outlineShow: (a: number) => number;
    readonly __wbg_get_polygonmaterial_outlineWidth: (a: number) => number;
    readonly __wbg_get_polygonmaterial_perPositionHeight: (a: number) => number;
    readonly __wbg_get_polygonmaterial_receiveShadow: (a: number) => number;
    readonly __wbg_get_polygonmaterial_reflectivity: (a: number) => number;
    readonly __wbg_get_polygonmaterial_roughness: (a: number) => number;
    readonly __wbg_get_polygonmaterial_shininess: (a: number) => number;
    readonly __wbg_get_polygonmaterial_show: (a: number) => number;
    readonly __wbg_get_polygonmaterial_specular: (a: number) => number;
    readonly __wbg_get_polygonmaterial_specularStrength: (a: number) => number;
    readonly __wbg_get_polygonmaterial_surfaceShow: (a: number) => number;
    readonly __wbg_get_polygonmaterial_tiled: (a: number) => number;
    readonly __wbg_get_polygonmaterial_transparent: (a: number) => number;
    readonly __wbg_get_polygonmaterial_water: (a: number) => number;
    readonly __wbg_get_polygonmaterial_waterScaleNormal: (a: number) => number;
    readonly __wbg_get_polygonmaterial_waterSpeed: (a: number) => number;
    readonly __wbg_get_polygonmaterial_wireframe: (a: number) => number;
    readonly __wbg_get_polylinematerial___internal__: (a: number) => number;
    readonly __wbg_get_polylinematerial_castShadow: (a: number) => number;
    readonly __wbg_get_polylinematerial_clampToGround: (a: number) => number;
    readonly __wbg_get_polylinematerial_depthWrite: (a: number) => number;
    readonly __wbg_get_polylinematerial_effectIds: (a: number) => [number, number];
    readonly __wbg_get_polylinematerial_emissiveColor: (a: number) => number;
    readonly __wbg_get_polylinematerial_geometryTypes: (a: number) => [number, number];
    readonly __wbg_get_polylinematerial_lit: (a: number) => number;
    readonly __wbg_get_polylinematerial_opacity: (a: number) => number;
    readonly __wbg_get_polylinematerial_receiveShadow: (a: number) => number;
    readonly __wbg_get_polylinematerial_show: (a: number) => number;
    readonly __wbg_get_polylinematerial_tiled: (a: number) => number;
    readonly __wbg_get_polylinematerial_transparent: (a: number) => number;
    readonly __wbg_get_rastermaterial_show: (a: number) => number;
    readonly __wbg_get_rastermaterial_showBoundingBox: (a: number) => number;
    readonly __wbg_get_rastertileinternalmaterial_castShadow: (a: number) => number;
    readonly __wbg_get_rastertileinternalmaterial_colors: (a: number) => [number, number];
    readonly __wbg_get_rastertileinternalmaterial_elevationOffset: (a: number) => number;
    readonly __wbg_get_rastertileinternalmaterial_hillshadeBScaler: (a: number) => number;
    readonly __wbg_get_rastertileinternalmaterial_hillshadeBoundary: (a: number) => number;
    readonly __wbg_get_rastertileinternalmaterial_hillshadeEpsilon: (a: number) => number;
    readonly __wbg_get_rastertileinternalmaterial_hillshadeExaggeration: (a: number) => number;
    readonly __wbg_get_rastertileinternalmaterial_hillshadeGScaler: (a: number) => number;
    readonly __wbg_get_rastertileinternalmaterial_hillshadeMaxOffset: (a: number) => number;
    readonly __wbg_get_rastertileinternalmaterial_hillshadeMinOffset: (a: number) => number;
    readonly __wbg_get_rastertileinternalmaterial_hillshadeOffset: (a: number) => number;
    readonly __wbg_get_rastertileinternalmaterial_hillshadeRScaler: (a: number) => number;
    readonly __wbg_get_rastertileinternalmaterial_isElevationHeatmaps: (a: number) => [number, number];
    readonly __wbg_get_rastertileinternalmaterial_isHillshades: (a: number) => [number, number];
    readonly __wbg_get_rastertileinternalmaterial_layerReproject: (a: number) => [number, number];
    readonly __wbg_get_rastertileinternalmaterial_lit: (a: number) => number;
    readonly __wbg_get_rastertileinternalmaterial_logBoundary: (a: number) => number;
    readonly __wbg_get_rastertileinternalmaterial_logarithmic: (a: number) => number;
    readonly __wbg_get_rastertileinternalmaterial_opacities: (a: number) => [number, number];
    readonly __wbg_get_rastertileinternalmaterial_receiveShadow: (a: number) => number;
    readonly __wbg_get_rastertileinternalmaterial_showBoundingBox: (a: number) => number;
    readonly __wbg_get_rastertileinternalmaterial_shows: (a: number) => [number, number];
    readonly __wbg_get_rastertileinternalmaterial_terrainLatRange: (a: number) => [number, number];
    readonly __wbg_get_returnedconstructedterrainmesh_rtc_translation: (a: number) => number;
    readonly __wbg_get_terrainmaterial_castShadow: (a: number) => number;
    readonly __wbg_get_terrainmaterial_lit: (a: number) => number;
    readonly __wbg_get_terrainmaterial_receiveShadow: (a: number) => number;
    readonly __wbg_get_terrainmaterial_show: (a: number) => number;
    readonly __wbg_get_terrainmaterial_showBoundingBox: (a: number) => number;
    readonly __wbg_get_terrainmaterial_skirt: (a: number) => number;
    readonly __wbg_get_textmaterial_backfaceCulling: (a: number) => number;
    readonly __wbg_get_textmaterial_backgroundColor: (a: number) => number;
    readonly __wbg_get_textmaterial_borderColor: (a: number) => number;
    readonly __wbg_get_textmaterial_clampToGround: (a: number) => number;
    readonly __wbg_get_textmaterial_declutter: (a: number) => number;
    readonly __wbg_get_textmaterial_declutterPriority: (a: number) => number;
    readonly __wbg_get_textmaterial_depthTest: (a: number) => number;
    readonly __wbg_get_textmaterial_effectIds: (a: number) => [number, number];
    readonly __wbg_get_textmaterial_emissiveColor: (a: number) => number;
    readonly __wbg_get_textmaterial_font: (a: number) => [number, number];
    readonly __wbg_get_textmaterial_geometryTypes: (a: number) => [number, number];
    readonly __wbg_get_textmaterial_highQuality: (a: number) => number;
    readonly __wbg_get_textmaterial_lang: (a: number) => [number, number];
    readonly __wbg_get_textmaterial_offsetDepth: (a: number) => number;
    readonly __wbg_get_textmaterial_rotateWithCamera: (a: number) => number;
    readonly __wbg_get_textmaterial_show: (a: number) => number;
    readonly __wbg_get_textmaterial_sizeInMeters: (a: number) => number;
    readonly __wbg_get_textmaterial_text: (a: number) => [number, number];
    readonly __wbg_get_textmaterial_textAlign: (a: number) => [number, number];
    readonly __wbg_get_textmaterial_textFacing: (a: number) => [number, number];
    readonly __wbg_get_textmaterial_transparent: (a: number) => number;
    readonly __wbg_get_texturefragment_gen: (a: number) => number;
    readonly __wbg_get_tileuvtransform_offset: (a: number) => number;
    readonly __wbg_get_tileuvtransform_scale: (a: number) => number;
    readonly __wbg_get_tilexyz_z: (a: number) => number;
    readonly __wbg_get_transferablehierarchy_expected_winding_order: (a: number) => number;
    readonly __wbg_get_transferablepolygonbatchedfeature_crs: (a: number) => number;
    readonly __wbg_get_transferablepolygonbatchedfeature_length: (a: number) => number;
    readonly __wbg_get_transferablepolylinebatchedfeature_crs: (a: number) => number;
    readonly __wbg_get_transferablepolylinebatchedfeature_length: (a: number) => number;
    readonly __wbg_get_windingorder_0: (a: number) => number;
    readonly __wbg_globe_free: (a: number, b: number) => void;
    readonly __wbg_hillshadematerial_free: (a: number, b: number) => void;
    readonly __wbg_modelinternalmaterial_free: (a: number, b: number) => void;
    readonly __wbg_modelmaterial_free: (a: number, b: number) => void;
    readonly __wbg_nearfar_free: (a: number, b: number) => void;
    readonly __wbg_overscaledtilehandle_free: (a: number, b: number) => void;
    readonly __wbg_pointmaterial_free: (a: number, b: number) => void;
    readonly __wbg_polygongeometry_free: (a: number, b: number) => void;
    readonly __wbg_polygongeometryattributes_free: (a: number, b: number) => void;
    readonly __wbg_polygoninternalmaterial_free: (a: number, b: number) => void;
    readonly __wbg_polygonmaterial_free: (a: number, b: number) => void;
    readonly __wbg_polylinegeometry_free: (a: number, b: number) => void;
    readonly __wbg_polylinegeometryattributes_free: (a: number, b: number) => void;
    readonly __wbg_polylinematerial_free: (a: number, b: number) => void;
    readonly __wbg_rastermaterial_free: (a: number, b: number) => void;
    readonly __wbg_rastertileinternalmaterial_free: (a: number, b: number) => void;
    readonly __wbg_ray_free: (a: number, b: number) => void;
    readonly __wbg_returnedconstructedterrainmesh_free: (a: number, b: number) => void;
    readonly __wbg_set_aabb_center: (a: number, b: number) => void;
    readonly __wbg_set_aabb_extent: (a: number, b: number) => void;
    readonly __wbg_set_batchpropresult_batchId: (a: number, b: number) => void;
    readonly __wbg_set_batchpropresult_layerId: (a: number, b: number, c: number) => void;
    readonly __wbg_set_batchpropresult_properties: (a: number, b: any) => void;
    readonly __wbg_set_billboardmaterial_alphaTest: (a: number, b: number) => void;
    readonly __wbg_set_billboardmaterial_backfaceCulling: (a: number, b: number) => void;
    readonly __wbg_set_billboardmaterial_billboardFacing: (a: number, b: number, c: number) => void;
    readonly __wbg_set_billboardmaterial_center: (a: number, b: number) => void;
    readonly __wbg_set_billboardmaterial_clampToGround: (a: number, b: number) => void;
    readonly __wbg_set_billboardmaterial_color: (a: number, b: number) => void;
    readonly __wbg_set_billboardmaterial_declutter: (a: number, b: number) => void;
    readonly __wbg_set_billboardmaterial_declutterPriority: (a: number, b: number) => void;
    readonly __wbg_set_billboardmaterial_depthTest: (a: number, b: number) => void;
    readonly __wbg_set_billboardmaterial_effectIds: (a: number, b: number, c: number) => void;
    readonly __wbg_set_billboardmaterial_emissiveColor: (a: number, b: number) => void;
    readonly __wbg_set_billboardmaterial_emissiveIntensity: (a: number, b: number) => void;
    readonly __wbg_set_billboardmaterial_geometryTypes: (a: number, b: number, c: number) => void;
    readonly __wbg_set_billboardmaterial_height: (a: number, b: number) => void;
    readonly __wbg_set_billboardmaterial_offsetDepth: (a: number, b: number) => void;
    readonly __wbg_set_billboardmaterial_opacity: (a: number, b: number) => void;
    readonly __wbg_set_billboardmaterial_rotateWithCamera: (a: number, b: number) => void;
    readonly __wbg_set_billboardmaterial_rotation: (a: number, b: number) => void;
    readonly __wbg_set_billboardmaterial_show: (a: number, b: number) => void;
    readonly __wbg_set_billboardmaterial_size: (a: number, b: number) => void;
    readonly __wbg_set_billboardmaterial_sizeInMeters: (a: number, b: number) => void;
    readonly __wbg_set_billboardmaterial_transparent: (a: number, b: number) => void;
    readonly __wbg_set_billboardmaterial_url: (a: number, b: number, c: number) => void;
    readonly __wbg_set_boundingsphere_center_x: (a: number, b: number) => void;
    readonly __wbg_set_boundingsphere_center_y: (a: number, b: number) => void;
    readonly __wbg_set_boundingsphere_center_z: (a: number, b: number) => void;
    readonly __wbg_set_boundingsphere_radius: (a: number, b: number) => void;
    readonly __wbg_set_cachedmeshhandle_heights: (a: number, b: number) => void;
    readonly __wbg_set_cachedmeshhandle_indices: (a: number, b: number) => void;
    readonly __wbg_set_cachedmeshhandle_normals: (a: number, b: number) => void;
    readonly __wbg_set_cachedmeshhandle_uvs: (a: number, b: number) => void;
    readonly __wbg_set_cachedmeshhandle_vertices: (a: number, b: number) => void;
    readonly __wbg_set_cachedmeshhandle_watermask: (a: number, b: number) => void;
    readonly __wbg_set_cameracontrolupdateevent_autoAdjustNearFar: (a: number, b: number) => void;
    readonly __wbg_set_cameracontrolupdateevent_enableSpin: (a: number, b: number) => void;
    readonly __wbg_set_cameracontrolupdateevent_enableTilt: (a: number, b: number) => void;
    readonly __wbg_set_cameracontrolupdateevent_enableZoom: (a: number, b: number) => void;
    readonly __wbg_set_cameracontrolupdateevent_maximumZoomDistance: (a: number, b: number, c: number) => void;
    readonly __wbg_set_cameracontrolupdateevent_minimumZoomDistance: (a: number, b: number, c: number) => void;
    readonly __wbg_set_cameracontrolupdateevent_spinSpeed: (a: number, b: number, c: number) => void;
    readonly __wbg_set_cameracontrolupdateevent_zoomSpeed: (a: number, b: number, c: number) => void;
    readonly __wbg_set_cameraflightendedevent_completed: (a: number, b: number) => void;
    readonly __wbg_set_cameraflightendedevent_id: (a: number, b: number) => void;
    readonly __wbg_set_camerastatus_status: (a: number, b: number, c: number) => void;
    readonly __wbg_set_constructedpolygongeometry_extent: (a: number, b: number) => void;
    readonly __wbg_set_constructedpolygongeometry_rtc_translation: (a: number, b: number) => void;
    readonly __wbg_set_dracoattributeid_semantic: (a: number, b: number, c: number) => void;
    readonly __wbg_set_dracoattributeid_uniqueId: (a: number, b: number) => void;
    readonly __wbg_set_elevationdecoder_boundary: (a: number, b: number) => void;
    readonly __wbg_set_elevationdecoder_epsilon: (a: number, b: number) => void;
    readonly __wbg_set_elevationdecoder_max_offset: (a: number, b: number) => void;
    readonly __wbg_set_elevationdecoder_min_offset: (a: number, b: number) => void;
    readonly __wbg_set_elevationheatmapmaterial_logarithmic: (a: number, b: number) => void;
    readonly __wbg_set_ellipsoidgeodesic_converged: (a: number, b: number) => void;
    readonly __wbg_set_ellipsoidgeodesic_end_heading: (a: number, b: number) => void;
    readonly __wbg_set_extentradianf32_east: (a: number, b: number) => void;
    readonly __wbg_set_extentradianf32_north: (a: number, b: number) => void;
    readonly __wbg_set_extentradianf32_south: (a: number, b: number) => void;
    readonly __wbg_set_extentradianf32_west: (a: number, b: number) => void;
    readonly __wbg_set_floatattribute_size: (a: number, b: number) => void;
    readonly __wbg_set_globe_color: (a: number, b: number) => void;
    readonly __wbg_set_globe_elevationColormap: (a: number, b: number, c: number) => void;
    readonly __wbg_set_globe_hideUnderground: (a: number, b: number) => void;
    readonly __wbg_set_globe_isGeographicTiling: (a: number, b: number) => void;
    readonly __wbg_set_globe_opacity: (a: number, b: number) => void;
    readonly __wbg_set_globe_segments: (a: number, b: number) => void;
    readonly __wbg_set_globe_transparent: (a: number, b: number) => void;
    readonly __wbg_set_globe_useNormal: (a: number, b: number) => void;
    readonly __wbg_set_globe_wireframe: (a: number, b: number) => void;
    readonly __wbg_set_hillshadematerial_exaggeration: (a: number, b: number) => void;
    readonly __wbg_set_modelinternalmaterial_dracoAttributes: (a: number, b: number, c: number) => void;
    readonly __wbg_set_modelinternalmaterial_pointCloud: (a: number, b: number) => void;
    readonly __wbg_set_modelmaterial___internal__: (a: number, b: number) => void;
    readonly __wbg_set_modelmaterial_animationActiveClip: (a: number, b: number, c: number) => void;
    readonly __wbg_set_modelmaterial_animationSpeed: (a: number, b: number) => void;
    readonly __wbg_set_modelmaterial_applyWaterNormal: (a: number, b: number) => void;
    readonly __wbg_set_modelmaterial_castShadow: (a: number, b: number) => void;
    readonly __wbg_set_modelmaterial_color: (a: number, b: number) => void;
    readonly __wbg_set_modelmaterial_creaseNormalAngle: (a: number, b: number) => void;
    readonly __wbg_set_modelmaterial_depthWrite: (a: number, b: number) => void;
    readonly __wbg_set_modelmaterial_effectIds: (a: number, b: number, c: number) => void;
    readonly __wbg_set_modelmaterial_emissiveColor: (a: number, b: number) => void;
    readonly __wbg_set_modelmaterial_emissiveIntensity: (a: number, b: number) => void;
    readonly __wbg_set_modelmaterial_height: (a: number, b: number) => void;
    readonly __wbg_set_modelmaterial_ior: (a: number, b: number) => void;
    readonly __wbg_set_modelmaterial_lit: (a: number, b: number) => void;
    readonly __wbg_set_modelmaterial_maxSse: (a: number, b: number) => void;
    readonly __wbg_set_modelmaterial_metalness: (a: number, b: number) => void;
    readonly __wbg_set_modelmaterial_normals: (a: number, b: number) => void;
    readonly __wbg_set_modelmaterial_opacity: (a: number, b: number) => void;
    readonly __wbg_set_modelmaterial_pointSize: (a: number, b: number) => void;
    readonly __wbg_set_modelmaterial_receiveShadow: (a: number, b: number) => void;
    readonly __wbg_set_modelmaterial_shouldRotateInDefault: (a: number, b: number) => void;
    readonly __wbg_set_modelmaterial_show: (a: number, b: number) => void;
    readonly __wbg_set_modelmaterial_showBoundingBox: (a: number, b: number) => void;
    readonly __wbg_set_modelmaterial_size: (a: number, b: number) => void;
    readonly __wbg_set_modelmaterial_specular: (a: number, b: number) => void;
    readonly __wbg_set_modelmaterial_transparent: (a: number, b: number) => void;
    readonly __wbg_set_modelmaterial_url: (a: number, b: number, c: number) => void;
    readonly __wbg_set_modelmaterial_water: (a: number, b: number) => void;
    readonly __wbg_set_overscaledtilehandle_handle: (a: number, b: bigint) => void;
    readonly __wbg_set_pointmaterial_backfaceCulling: (a: number, b: number) => void;
    readonly __wbg_set_pointmaterial_clampToGround: (a: number, b: number) => void;
    readonly __wbg_set_pointmaterial_declutter: (a: number, b: number) => void;
    readonly __wbg_set_pointmaterial_depthTest: (a: number, b: number) => void;
    readonly __wbg_set_pointmaterial_effectIds: (a: number, b: number, c: number) => void;
    readonly __wbg_set_pointmaterial_emissiveColor: (a: number, b: number) => void;
    readonly __wbg_set_pointmaterial_geometryTypes: (a: number, b: number, c: number) => void;
    readonly __wbg_set_pointmaterial_offsetDepth: (a: number, b: number) => void;
    readonly __wbg_set_pointmaterial_pointFacing: (a: number, b: number, c: number) => void;
    readonly __wbg_set_pointmaterial_rotateWithCamera: (a: number, b: number) => void;
    readonly __wbg_set_pointmaterial_show: (a: number, b: number) => void;
    readonly __wbg_set_pointmaterial_sizeInMeters: (a: number, b: number) => void;
    readonly __wbg_set_pointmaterial_transparent: (a: number, b: number) => void;
    readonly __wbg_set_polygoninternalmaterial_minMaxHeights: (a: number, b: number, c: number) => void;
    readonly __wbg_set_polygonmaterial___internal__: (a: number, b: number) => void;
    readonly __wbg_set_polygonmaterial_applyWaterNormal: (a: number, b: number) => void;
    readonly __wbg_set_polygonmaterial_castShadow: (a: number, b: number) => void;
    readonly __wbg_set_polygonmaterial_clampToGround: (a: number, b: number) => void;
    readonly __wbg_set_polygonmaterial_effectIds: (a: number, b: number, c: number) => void;
    readonly __wbg_set_polygonmaterial_emissiveColor: (a: number, b: number) => void;
    readonly __wbg_set_polygonmaterial_emissiveIntensity: (a: number, b: number) => void;
    readonly __wbg_set_polygonmaterial_extrudedHeight: (a: number, b: number) => void;
    readonly __wbg_set_polygonmaterial_height: (a: number, b: number) => void;
    readonly __wbg_set_polygonmaterial_ior: (a: number, b: number) => void;
    readonly __wbg_set_polygonmaterial_lit: (a: number, b: number) => void;
    readonly __wbg_set_polygonmaterial_opacity: (a: number, b: number) => void;
    readonly __wbg_set_polygonmaterial_outline: (a: number, b: number) => void;
    readonly __wbg_set_polygonmaterial_outlineColor: (a: number, b: number) => void;
    readonly __wbg_set_polygonmaterial_outlineShow: (a: number, b: number) => void;
    readonly __wbg_set_polygonmaterial_outlineWidth: (a: number, b: number) => void;
    readonly __wbg_set_polygonmaterial_perPositionHeight: (a: number, b: number) => void;
    readonly __wbg_set_polygonmaterial_receiveShadow: (a: number, b: number) => void;
    readonly __wbg_set_polygonmaterial_reflectivity: (a: number, b: number) => void;
    readonly __wbg_set_polygonmaterial_roughness: (a: number, b: number) => void;
    readonly __wbg_set_polygonmaterial_shininess: (a: number, b: number) => void;
    readonly __wbg_set_polygonmaterial_show: (a: number, b: number) => void;
    readonly __wbg_set_polygonmaterial_specular: (a: number, b: number) => void;
    readonly __wbg_set_polygonmaterial_specularStrength: (a: number, b: number) => void;
    readonly __wbg_set_polygonmaterial_surfaceShow: (a: number, b: number) => void;
    readonly __wbg_set_polygonmaterial_tiled: (a: number, b: number) => void;
    readonly __wbg_set_polygonmaterial_transparent: (a: number, b: number) => void;
    readonly __wbg_set_polygonmaterial_water: (a: number, b: number) => void;
    readonly __wbg_set_polygonmaterial_waterScaleNormal: (a: number, b: number) => void;
    readonly __wbg_set_polygonmaterial_waterSpeed: (a: number, b: number) => void;
    readonly __wbg_set_polygonmaterial_wireframe: (a: number, b: number) => void;
    readonly __wbg_set_polylinematerial___internal__: (a: number, b: number) => void;
    readonly __wbg_set_polylinematerial_castShadow: (a: number, b: number) => void;
    readonly __wbg_set_polylinematerial_clampToGround: (a: number, b: number) => void;
    readonly __wbg_set_polylinematerial_depthWrite: (a: number, b: number) => void;
    readonly __wbg_set_polylinematerial_effectIds: (a: number, b: number, c: number) => void;
    readonly __wbg_set_polylinematerial_emissiveColor: (a: number, b: number) => void;
    readonly __wbg_set_polylinematerial_geometryTypes: (a: number, b: number, c: number) => void;
    readonly __wbg_set_polylinematerial_lit: (a: number, b: number) => void;
    readonly __wbg_set_polylinematerial_opacity: (a: number, b: number) => void;
    readonly __wbg_set_polylinematerial_receiveShadow: (a: number, b: number) => void;
    readonly __wbg_set_polylinematerial_show: (a: number, b: number) => void;
    readonly __wbg_set_polylinematerial_tiled: (a: number, b: number) => void;
    readonly __wbg_set_polylinematerial_transparent: (a: number, b: number) => void;
    readonly __wbg_set_rastermaterial_show: (a: number, b: number) => void;
    readonly __wbg_set_rastermaterial_showBoundingBox: (a: number, b: number) => void;
    readonly __wbg_set_rastertileinternalmaterial_castShadow: (a: number, b: number) => void;
    readonly __wbg_set_rastertileinternalmaterial_colors: (a: number, b: number, c: number) => void;
    readonly __wbg_set_rastertileinternalmaterial_elevationOffset: (a: number, b: number) => void;
    readonly __wbg_set_rastertileinternalmaterial_hillshadeBScaler: (a: number, b: number) => void;
    readonly __wbg_set_rastertileinternalmaterial_hillshadeBoundary: (a: number, b: number) => void;
    readonly __wbg_set_rastertileinternalmaterial_hillshadeEpsilon: (a: number, b: number) => void;
    readonly __wbg_set_rastertileinternalmaterial_hillshadeExaggeration: (a: number, b: number) => void;
    readonly __wbg_set_rastertileinternalmaterial_hillshadeGScaler: (a: number, b: number) => void;
    readonly __wbg_set_rastertileinternalmaterial_hillshadeMaxOffset: (a: number, b: number) => void;
    readonly __wbg_set_rastertileinternalmaterial_hillshadeMinOffset: (a: number, b: number) => void;
    readonly __wbg_set_rastertileinternalmaterial_hillshadeOffset: (a: number, b: number) => void;
    readonly __wbg_set_rastertileinternalmaterial_hillshadeRScaler: (a: number, b: number) => void;
    readonly __wbg_set_rastertileinternalmaterial_isElevationHeatmaps: (a: number, b: number, c: number) => void;
    readonly __wbg_set_rastertileinternalmaterial_isHillshades: (a: number, b: number, c: number) => void;
    readonly __wbg_set_rastertileinternalmaterial_layerReproject: (a: number, b: number, c: number) => void;
    readonly __wbg_set_rastertileinternalmaterial_lit: (a: number, b: number) => void;
    readonly __wbg_set_rastertileinternalmaterial_logBoundary: (a: number, b: number) => void;
    readonly __wbg_set_rastertileinternalmaterial_logarithmic: (a: number, b: number) => void;
    readonly __wbg_set_rastertileinternalmaterial_opacities: (a: number, b: number, c: number) => void;
    readonly __wbg_set_rastertileinternalmaterial_receiveShadow: (a: number, b: number) => void;
    readonly __wbg_set_rastertileinternalmaterial_showBoundingBox: (a: number, b: number) => void;
    readonly __wbg_set_rastertileinternalmaterial_shows: (a: number, b: number, c: number) => void;
    readonly __wbg_set_rastertileinternalmaterial_terrainLatRange: (a: number, b: number, c: number) => void;
    readonly __wbg_set_terrainmaterial_castShadow: (a: number, b: number) => void;
    readonly __wbg_set_terrainmaterial_lit: (a: number, b: number) => void;
    readonly __wbg_set_terrainmaterial_receiveShadow: (a: number, b: number) => void;
    readonly __wbg_set_terrainmaterial_show: (a: number, b: number) => void;
    readonly __wbg_set_terrainmaterial_showBoundingBox: (a: number, b: number) => void;
    readonly __wbg_set_terrainmaterial_skirt: (a: number, b: number) => void;
    readonly __wbg_set_textmaterial_backfaceCulling: (a: number, b: number) => void;
    readonly __wbg_set_textmaterial_backgroundColor: (a: number, b: number) => void;
    readonly __wbg_set_textmaterial_borderColor: (a: number, b: number) => void;
    readonly __wbg_set_textmaterial_clampToGround: (a: number, b: number) => void;
    readonly __wbg_set_textmaterial_declutter: (a: number, b: number) => void;
    readonly __wbg_set_textmaterial_declutterPriority: (a: number, b: number) => void;
    readonly __wbg_set_textmaterial_depthTest: (a: number, b: number) => void;
    readonly __wbg_set_textmaterial_effectIds: (a: number, b: number, c: number) => void;
    readonly __wbg_set_textmaterial_emissiveColor: (a: number, b: number) => void;
    readonly __wbg_set_textmaterial_font: (a: number, b: number, c: number) => void;
    readonly __wbg_set_textmaterial_geometryTypes: (a: number, b: number, c: number) => void;
    readonly __wbg_set_textmaterial_highQuality: (a: number, b: number) => void;
    readonly __wbg_set_textmaterial_lang: (a: number, b: number, c: number) => void;
    readonly __wbg_set_textmaterial_offsetDepth: (a: number, b: number) => void;
    readonly __wbg_set_textmaterial_rotateWithCamera: (a: number, b: number) => void;
    readonly __wbg_set_textmaterial_show: (a: number, b: number) => void;
    readonly __wbg_set_textmaterial_sizeInMeters: (a: number, b: number) => void;
    readonly __wbg_set_textmaterial_text: (a: number, b: number, c: number) => void;
    readonly __wbg_set_textmaterial_textAlign: (a: number, b: number, c: number) => void;
    readonly __wbg_set_textmaterial_textFacing: (a: number, b: number, c: number) => void;
    readonly __wbg_set_textmaterial_transparent: (a: number, b: number) => void;
    readonly __wbg_set_texturefragment_gen: (a: number, b: number) => void;
    readonly __wbg_set_tileuvtransform_offset: (a: number, b: number) => void;
    readonly __wbg_set_tileuvtransform_scale: (a: number, b: number) => void;
    readonly __wbg_set_tilexyz_z: (a: number, b: number) => void;
    readonly __wbg_set_transferablehierarchy_expected_winding_order: (a: number, b: number) => void;
    readonly __wbg_set_transferablepolygonbatchedfeature_crs: (a: number, b: number) => void;
    readonly __wbg_set_transferablepolygonbatchedfeature_length: (a: number, b: number) => void;
    readonly __wbg_set_transferablepolylinebatchedfeature_crs: (a: number, b: number) => void;
    readonly __wbg_set_transferablepolylinebatchedfeature_length: (a: number, b: number) => void;
    readonly __wbg_set_windingorder_0: (a: number, b: number) => void;
    readonly __wbg_textmaterial_free: (a: number, b: number) => void;
    readonly __wbg_texturefragment_free: (a: number, b: number) => void;
    readonly __wbg_tilexyz_free: (a: number, b: number) => void;
    readonly __wbg_transferablehierarchy_free: (a: number, b: number) => void;
    readonly __wbg_transferableholes_free: (a: number, b: number) => void;
    readonly __wbg_transferableparsedmvtresult_free: (a: number, b: number) => void;
    readonly __wbg_transferablepolygonbatchedfeature_free: (a: number, b: number) => void;
    readonly __wbg_transferablepolylinebatchedfeature_free: (a: number, b: number) => void;
    readonly __wbg_transform_free: (a: number, b: number) => void;
    readonly __wbg_uintattribute_free: (a: number, b: number) => void;
    readonly __wbg_upsamplableterraingeometry_free: (a: number, b: number) => void;
    readonly __wbg_vec2_free: (a: number, b: number) => void;
    readonly __wbg_windingorder_free: (a: number, b: number) => void;
    readonly aabb_new: (a: number, b: number) => number;
    readonly boundingsphere_new: (a: number, b: number, c: number, d: number) => number;
    readonly cachedmeshhandle_new: (a: number, b: number, c: number, d: number) => number;
    readonly cameracontrolupdateevent_new: () => number;
    readonly compiledexpression_evaluate: (a: number, b: any, c: number, d: number, e: number) => [number, number, number];
    readonly compiledexpression_getRequiredProperties: (a: number) => any;
    readonly compiledexpression_new: (a: any, b: number, c: number) => [number, number, number];
    readonly compiledfilter_new: (a: any) => [number, number, number];
    readonly compiledfilter_test: (a: number, b: any, c: number, d: number, e: number) => [number, number, number];
    readonly constructedpolygongeometry_batch_id: (a: number) => any;
    readonly constructedpolygongeometry_batch_id_size: (a: number) => number;
    readonly constructedpolygongeometry_batch_index: (a: number) => any;
    readonly constructedpolygongeometry_batch_index_size: (a: number) => number;
    readonly constructedpolygongeometry_indices: (a: number) => any;
    readonly constructedpolygongeometry_normal: (a: number) => any;
    readonly constructedpolygongeometry_normal_size: (a: number) => number;
    readonly constructedpolygongeometry_outline: (a: number) => number;
    readonly constructedpolygongeometry_position: (a: number) => any;
    readonly constructedpolygongeometry_position_3d_high: (a: number) => any;
    readonly constructedpolygongeometry_position_3d_high_size: (a: number) => number;
    readonly constructedpolygongeometry_position_3d_low: (a: number) => any;
    readonly constructedpolygongeometry_position_3d_low_size: (a: number) => number;
    readonly constructedpolygongeometry_position_size: (a: number) => number;
    readonly constructedpolygongeometry_scale_normal_and_cap: (a: number) => any;
    readonly constructedpolygongeometry_scale_normal_and_cap_size: (a: number) => number;
    readonly constructedpolygonoutlinegeometry_batch_index: (a: number) => any;
    readonly constructedpolygonoutlinegeometry_batch_index_size: (a: number) => number;
    readonly constructedpolygonoutlinegeometry_position: (a: number) => any;
    readonly constructedpolygonoutlinegeometry_position_3d_high: (a: number) => any;
    readonly constructedpolygonoutlinegeometry_position_3d_high_size: (a: number) => number;
    readonly constructedpolygonoutlinegeometry_position_3d_low: (a: number) => any;
    readonly constructedpolygonoutlinegeometry_position_3d_low_size: (a: number) => number;
    readonly constructedpolygonoutlinegeometry_position_size: (a: number) => number;
    readonly constructedpolygonoutlinegeometry_scale_normal_and_cap: (a: number) => any;
    readonly constructedpolygonoutlinegeometry_scale_normal_and_cap_size: (a: number) => number;
    readonly constructedpolygonoutlinegeometry_skip_indices: (a: number) => any;
    readonly constructedpolylinegeometry_batch_id: (a: number) => any;
    readonly constructedpolylinegeometry_batch_id_size: (a: number) => number;
    readonly constructedpolylinegeometry_batch_index: (a: number) => any;
    readonly constructedpolylinegeometry_batch_index_size: (a: number) => number;
    readonly constructedpolylinegeometry_end_high: (a: number) => any;
    readonly constructedpolylinegeometry_end_high_size: (a: number) => number;
    readonly constructedpolylinegeometry_end_low: (a: number) => any;
    readonly constructedpolylinegeometry_end_low_size: (a: number) => number;
    readonly constructedpolylinegeometry_end_normal_and_texture_coordinate_normalization_x: (a: number) => any;
    readonly constructedpolylinegeometry_end_normal_and_texture_coordinate_normalization_x_size: (a: number) => number;
    readonly constructedpolylinegeometry_extent: (a: number) => number;
    readonly constructedpolylinegeometry_forward_offset: (a: number) => any;
    readonly constructedpolylinegeometry_forward_offset_size: (a: number) => number;
    readonly constructedpolylinegeometry_indices: (a: number) => any;
    readonly constructedpolylinegeometry_position: (a: number) => any;
    readonly constructedpolylinegeometry_position_high: (a: number) => any;
    readonly constructedpolylinegeometry_position_high_size: (a: number) => number;
    readonly constructedpolylinegeometry_position_low: (a: number) => any;
    readonly constructedpolylinegeometry_position_low_size: (a: number) => number;
    readonly constructedpolylinegeometry_position_size: (a: number) => number;
    readonly constructedpolylinegeometry_right_normal_and_texture_coordinate_normalization_y: (a: number) => any;
    readonly constructedpolylinegeometry_right_normal_and_texture_coordinate_normalization_y_size: (a: number) => number;
    readonly constructedpolylinegeometry_start: (a: number) => any;
    readonly constructedpolylinegeometry_start_high: (a: number) => any;
    readonly constructedpolylinegeometry_start_high_size: (a: number) => number;
    readonly constructedpolylinegeometry_start_low: (a: number) => any;
    readonly constructedpolylinegeometry_start_low_size: (a: number) => number;
    readonly constructedpolylinegeometry_start_normals: (a: number) => any;
    readonly constructedpolylinegeometry_start_normals_size: (a: number) => number;
    readonly constructedpolylinegeometry_start_size: (a: number) => number;
    readonly elevationdecoder_japanGSI: () => number;
    readonly elevationdecoder_mapbox: () => number;
    readonly elevationdecoder_new: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number) => number;
    readonly elevationdecoder_terrarium: () => number;
    readonly ellipsoidgeodesic_interpolateDistance: (a: number, b: number) => number;
    readonly ellipsoidgeodesic_interpolateGeodeticPoints: (a: number, b: number, c: number) => [number, number];
    readonly ellipsoidgeodesic_new: (a: number, b: number) => number;
    readonly extentradianf32_new: (a: number, b: number, c: number, d: number) => number;
    readonly floatattribute_new: (a: number, b: number, c: number) => number;
    readonly floatattribute_transferData: (a: number) => any;
    readonly geometry_hasNormals: (a: number) => number;
    readonly geometry_hasSkirt: (a: number) => number;
    readonly geometry_new: (a: number, b: number, c: number, d: number, e: number, f: number) => number;
    readonly geometry_transferIndices: (a: number) => any;
    readonly geometry_transferNormals: (a: number) => any;
    readonly geometry_transferSkirtIndices: (a: number) => any;
    readonly geometry_transferSkirtNormals: (a: number) => any;
    readonly geometry_transferSkirtUvs: (a: number) => any;
    readonly geometry_transferSkirtVertices: (a: number) => any;
    readonly geometry_transferUvs: (a: number) => any;
    readonly geometry_transferVertices: (a: number) => any;
    readonly globe_new: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number, j: number) => number;
    readonly lle_new: (a: number, b: number, c: number) => number;
    readonly polygongeometry_batch_id: (a: number) => any;
    readonly polygongeometry_batch_id_size: (a: number) => number;
    readonly polygongeometry_batch_index: (a: number) => any;
    readonly polygongeometry_batch_index_size: (a: number) => number;
    readonly polygongeometry_indices: (a: number) => any;
    readonly polygongeometry_normal: (a: number) => any;
    readonly polygongeometry_normal_size: (a: number) => number;
    readonly polygongeometry_position: (a: number) => any;
    readonly polygongeometry_position_3d_high: (a: number) => any;
    readonly polygongeometry_position_3d_high_size: (a: number) => number;
    readonly polygongeometry_position_3d_low: (a: number) => any;
    readonly polygongeometry_position_3d_low_size: (a: number) => number;
    readonly polygongeometry_position_size: (a: number) => number;
    readonly polygongeometry_scale_normal_and_cap: (a: number) => any;
    readonly polygongeometry_scale_normal_and_cap_size: (a: number) => number;
    readonly polygongeometryattributes_transfer_batch_id: (a: number) => any;
    readonly polygongeometryattributes_transfer_batch_id_size: (a: number) => number;
    readonly polygongeometryattributes_transfer_batch_index: (a: number) => any;
    readonly polygongeometryattributes_transfer_batch_index_size: (a: number) => number;
    readonly polygongeometryattributes_transfer_normal: (a: number) => any;
    readonly polygongeometryattributes_transfer_normal_size: (a: number) => number;
    readonly polygongeometryattributes_transfer_position: (a: number) => any;
    readonly polygongeometryattributes_transfer_position_3d_high: (a: number) => any;
    readonly polygongeometryattributes_transfer_position_3d_high_size: (a: number) => number;
    readonly polygongeometryattributes_transfer_position_3d_low: (a: number) => any;
    readonly polygongeometryattributes_transfer_position_3d_low_size: (a: number) => number;
    readonly polygongeometryattributes_transfer_position_size: (a: number) => number;
    readonly polygongeometryattributes_transfer_scale_normal_and_cap: (a: number) => any;
    readonly polygongeometryattributes_transfer_scale_normal_and_cap_size: (a: number) => number;
    readonly polygonmaterial_new: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number, j: number, k: number, l: number) => number;
    readonly polylinegeometry_batch_id: (a: number) => any;
    readonly polylinegeometry_batch_id_size: (a: number) => number;
    readonly polylinegeometry_batch_index: (a: number) => any;
    readonly polylinegeometry_batch_index_size: (a: number) => number;
    readonly polylinegeometry_end_high: (a: number) => any;
    readonly polylinegeometry_end_high_size: (a: number) => number;
    readonly polylinegeometry_end_low: (a: number) => any;
    readonly polylinegeometry_end_low_size: (a: number) => number;
    readonly polylinegeometry_end_normal_and_texture_coordinate_normalization_x: (a: number) => any;
    readonly polylinegeometry_end_normal_and_texture_coordinate_normalization_x_size: (a: number) => number;
    readonly polylinegeometry_forward_offset: (a: number) => any;
    readonly polylinegeometry_forward_offset_size: (a: number) => number;
    readonly polylinegeometry_indices: (a: number) => any;
    readonly polylinegeometry_position: (a: number) => any;
    readonly polylinegeometry_position_high: (a: number) => any;
    readonly polylinegeometry_position_high_size: (a: number) => number;
    readonly polylinegeometry_position_low: (a: number) => any;
    readonly polylinegeometry_position_low_size: (a: number) => number;
    readonly polylinegeometry_position_size: (a: number) => number;
    readonly polylinegeometry_right_normal_and_texture_coordinate_normalization_y: (a: number) => any;
    readonly polylinegeometry_right_normal_and_texture_coordinate_normalization_y_size: (a: number) => number;
    readonly polylinegeometry_start: (a: number) => any;
    readonly polylinegeometry_start_high: (a: number) => any;
    readonly polylinegeometry_start_high_size: (a: number) => number;
    readonly polylinegeometry_start_low: (a: number) => any;
    readonly polylinegeometry_start_low_size: (a: number) => number;
    readonly polylinegeometry_start_normals: (a: number) => any;
    readonly polylinegeometry_start_normals_size: (a: number) => number;
    readonly polylinegeometry_start_size: (a: number) => number;
    readonly polylinegeometryattributes_transfer_batch_id: (a: number) => any;
    readonly polylinegeometryattributes_transfer_batch_id_size: (a: number) => number;
    readonly polylinegeometryattributes_transfer_batch_index: (a: number) => any;
    readonly polylinegeometryattributes_transfer_batch_index_size: (a: number) => number;
    readonly polylinegeometryattributes_transfer_end_high: (a: number) => any;
    readonly polylinegeometryattributes_transfer_end_high_size: (a: number) => number;
    readonly polylinegeometryattributes_transfer_end_low: (a: number) => any;
    readonly polylinegeometryattributes_transfer_end_low_size: (a: number) => number;
    readonly polylinegeometryattributes_transfer_end_normal_and_texture_coordinate_normalization_x: (a: number) => any;
    readonly polylinegeometryattributes_transfer_end_normal_and_texture_coordinate_normalization_x_size: (a: number) => number;
    readonly polylinegeometryattributes_transfer_forward_offset: (a: number) => any;
    readonly polylinegeometryattributes_transfer_forward_offset_size: (a: number) => number;
    readonly polylinegeometryattributes_transfer_position: (a: number) => any;
    readonly polylinegeometryattributes_transfer_position_high: (a: number) => any;
    readonly polylinegeometryattributes_transfer_position_high_size: (a: number) => number;
    readonly polylinegeometryattributes_transfer_position_low: (a: number) => any;
    readonly polylinegeometryattributes_transfer_position_low_size: (a: number) => number;
    readonly polylinegeometryattributes_transfer_position_size: (a: number) => number;
    readonly polylinegeometryattributes_transfer_right_normal_and_texture_coordinate_normalization_y: (a: number) => any;
    readonly polylinegeometryattributes_transfer_right_normal_and_texture_coordinate_normalization_y_size: (a: number) => number;
    readonly polylinegeometryattributes_transfer_start: (a: number) => any;
    readonly polylinegeometryattributes_transfer_start_high: (a: number) => any;
    readonly polylinegeometryattributes_transfer_start_high_size: (a: number) => number;
    readonly polylinegeometryattributes_transfer_start_low: (a: number) => any;
    readonly polylinegeometryattributes_transfer_start_low_size: (a: number) => number;
    readonly polylinegeometryattributes_transfer_start_normals: (a: number) => any;
    readonly polylinegeometryattributes_transfer_start_normals_size: (a: number) => number;
    readonly polylinegeometryattributes_transfer_start_size: (a: number) => number;
    readonly polylinematerial_new: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number, j: number) => number;
    readonly rastertileinternalmaterial_layerUvTransforms: (a: number) => [number, number];
    readonly rastertileinternalmaterial_texture_fragments: (a: number) => [number, number];
    readonly ray_getPoint: (a: number, b: number) => number;
    readonly returnedconstructedterrainmesh_hasNormals: (a: number) => number;
    readonly returnedconstructedterrainmesh_hasSkirt: (a: number) => number;
    readonly returnedconstructedterrainmesh_hasWatermask: (a: number) => number;
    readonly returnedconstructedterrainmesh_new: (a: number, b: number, c: number, d: number, e: number, f: number) => number;
    readonly returnedconstructedterrainmesh_transferHeights: (a: number) => any;
    readonly returnedconstructedterrainmesh_transferIndices: (a: number) => any;
    readonly returnedconstructedterrainmesh_transferNormals: (a: number) => any;
    readonly returnedconstructedterrainmesh_transferSkirtIndices: (a: number) => any;
    readonly returnedconstructedterrainmesh_transferSkirtNormals: (a: number) => any;
    readonly returnedconstructedterrainmesh_transferSkirtUvs: (a: number) => any;
    readonly returnedconstructedterrainmesh_transferSkirtVertices: (a: number) => any;
    readonly returnedconstructedterrainmesh_transferUvs: (a: number) => any;
    readonly returnedconstructedterrainmesh_transferVertices: (a: number) => any;
    readonly returnedconstructedterrainmesh_transferWatermask: (a: number) => any;
    readonly tilexyz_new: (a: number, b: number, c: number) => number;
    readonly transferableparsedmvtresult_f32_stream: (a: number) => any;
    readonly transferableparsedmvtresult_f64_stream: (a: number) => any;
    readonly transferableparsedmvtresult_meta: (a: number) => any;
    readonly transferableparsedmvtresult_u32_stream: (a: number) => any;
    readonly transferableparsedmvtresult_u8_stream: (a: number) => any;
    readonly transferablepolygonbatchedfeature_constructor: (a: number, b: number) => number;
    readonly transferablepolygonbatchedfeature_setBatchIds: (a: number, b: number, c: any) => void;
    readonly transferablepolygonbatchedfeature_setBatchIndices: (a: number, b: number, c: any) => void;
    readonly transferablepolygonbatchedfeature_setExpectedWindingOrders: (a: number, b: number, c: any) => void;
    readonly transferablepolygonbatchedfeature_setHoles: (a: number, b: number, c: any) => void;
    readonly transferablepolygonbatchedfeature_setHolesBoundaries: (a: number, b: number, c: any) => void;
    readonly transferablepolygonbatchedfeature_setHolesSizes: (a: number, b: number, c: any) => void;
    readonly transferablepolygonbatchedfeature_setHolesTotalSizes: (a: number, b: number, c: any) => void;
    readonly transferablepolygonbatchedfeature_setOuterRing: (a: number, b: number, c: any) => void;
    readonly transferablepolygonbatchedfeature_setOuterRingSizes: (a: number, b: number, c: any) => void;
    readonly transferablepolygonbatchedfeature_transferBatchIds: (a: number) => any;
    readonly transferablepolygonbatchedfeature_transferBatchIndices: (a: number) => any;
    readonly transferablepolygonbatchedfeature_transferExpectedWindingOrders: (a: number) => any;
    readonly transferablepolygonbatchedfeature_transferHoles: (a: number) => any;
    readonly transferablepolygonbatchedfeature_transferHolesBoundaries: (a: number) => any;
    readonly transferablepolygonbatchedfeature_transferHolesSizes: (a: number) => any;
    readonly transferablepolygonbatchedfeature_transferHolesTotalSizes: (a: number) => any;
    readonly transferablepolygonbatchedfeature_transferOuterRing: (a: number) => any;
    readonly transferablepolygonbatchedfeature_transferOuterRingSizes: (a: number) => any;
    readonly transferablepolylinebatchedfeature_constructor: (a: number, b: number) => number;
    readonly transferablepolylinebatchedfeature_setBatchIds: (a: number, b: number, c: any) => void;
    readonly transferablepolylinebatchedfeature_setBatchIndices: (a: number, b: number, c: any) => void;
    readonly transferablepolylinebatchedfeature_setPoints: (a: number, b: number, c: any) => void;
    readonly transferablepolylinebatchedfeature_setPointsSizes: (a: number, b: number, c: any) => void;
    readonly transferablepolylinebatchedfeature_setRingFlags: (a: number, b: number, c: any) => void;
    readonly transferablepolylinebatchedfeature_transferBatchIds: (a: number) => any;
    readonly transferablepolylinebatchedfeature_transferBatchIndices: (a: number) => any;
    readonly transferablepolylinebatchedfeature_transferPoints: (a: number) => any;
    readonly transferablepolylinebatchedfeature_transferPointsSizes: (a: number) => any;
    readonly transferablepolylinebatchedfeature_transferRingFlags: (a: number) => any;
    readonly transform_new: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number, j: number) => number;
    readonly uintattribute_new: (a: number, b: number, c: number) => number;
    readonly uintattribute_transferData: (a: number) => any;
    readonly upsamplableterraingeometry_new: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number, j: number) => number;
    readonly vec2_new: (a: number, b: number) => number;
    readonly __wbg_set_camerafrustum_near: (a: number, b: number) => void;
    readonly __wbg_set_cameraorientation_heading: (a: number, b: number) => void;
    readonly __wbg_set_elevationdecoder_r_scaler: (a: number, b: number) => void;
    readonly __wbg_set_lle_lat: (a: number, b: number) => void;
    readonly __wbg_set_nearfar_near: (a: number, b: number) => void;
    readonly __wbg_set_rastertileinternalmaterial_elevationMinHeight: (a: number, b: number) => void;
    readonly __wbg_set_texturefragment_ind: (a: number, b: number) => void;
    readonly __wbg_set_tilexyz_x: (a: number, b: number) => void;
    readonly __wbg_set_transform_tx: (a: number, b: number) => void;
    readonly __wbg_set_vec2_x: (a: number, b: number) => void;
    readonly __wbg_set_vec3_x: (a: number, b: number) => void;
    readonly __wbg_set_window_width: (a: number, b: number) => void;
    readonly __wbg_set_cameracontrolupdateevent_spinDuration: (a: number, b: number) => void;
    readonly __wbg_set_cameracontrolupdateevent_translateDuration: (a: number, b: number) => void;
    readonly __wbg_set_cameracontrolupdateevent_zoomDuration: (a: number, b: number) => void;
    readonly __wbg_set_modelmaterial_reflectivity: (a: number, b: number) => void;
    readonly __wbg_set_modelmaterial_roughness: (a: number, b: number) => void;
    readonly __wbg_set_modelmaterial_shininess: (a: number, b: number) => void;
    readonly __wbg_set_modelmaterial_specularStrength: (a: number, b: number) => void;
    readonly __wbg_set_modelmaterial_waterScaleNormal: (a: number, b: number) => void;
    readonly __wbg_set_modelmaterial_waterSpeed: (a: number, b: number) => void;
    readonly __wbg_set_pointmaterial_declutterPriority: (a: number, b: number) => void;
    readonly __wbg_set_pointmaterial_emissiveIntensity: (a: number, b: number) => void;
    readonly __wbg_set_pointmaterial_height: (a: number, b: number) => void;
    readonly __wbg_set_pointmaterial_opacity: (a: number, b: number) => void;
    readonly __wbg_set_pointmaterial_rotation: (a: number, b: number) => void;
    readonly __wbg_set_pointmaterial_size: (a: number, b: number) => void;
    readonly __wbg_set_polylinematerial_emissiveIntensity: (a: number, b: number) => void;
    readonly __wbg_set_polylinematerial_height: (a: number, b: number) => void;
    readonly __wbg_set_polylinematerial_maxWidth: (a: number, b: number) => void;
    readonly __wbg_set_polylinematerial_width: (a: number, b: number) => void;
    readonly __wbg_set_rastermaterial_opacity: (a: number, b: number) => void;
    readonly __wbg_set_textmaterial_borderWidth: (a: number, b: number) => void;
    readonly __wbg_set_textmaterial_emissiveIntensity: (a: number, b: number) => void;
    readonly __wbg_set_textmaterial_height: (a: number, b: number) => void;
    readonly __wbg_set_textmaterial_lineHeight: (a: number, b: number) => void;
    readonly __wbg_set_textmaterial_maxWidth: (a: number, b: number) => void;
    readonly __wbg_set_textmaterial_opacity: (a: number, b: number) => void;
    readonly __wbg_set_textmaterial_outlineOpacity: (a: number, b: number) => void;
    readonly __wbg_set_textmaterial_outlineWidth: (a: number, b: number) => void;
    readonly __wbg_set_textmaterial_rotation: (a: number, b: number) => void;
    readonly __wbg_set_textmaterial_size: (a: number, b: number) => void;
    readonly camerafrustum_new: (a: number, b: number, c: number, d: number) => number;
    readonly __wbg_get_terrainmaterial_skirtExaggeration: (a: number) => number;
    readonly __wbg_get_textmaterial_outlineColor: (a: number) => number;
    readonly __wbg_get_textmaterial_color: (a: number) => number;
    readonly __wbg_get_pointmaterial_color: (a: number) => number;
    readonly __wbg_get_rastertileinternalmaterial_elevationMinOffset: (a: number) => number;
    readonly __wbg_get_rastertileinternalmaterial_elevationEpsilon: (a: number) => number;
    readonly __wbg_get_rastertileinternalmaterial_elevationMaxOffset: (a: number) => number;
    readonly __wbg_get_tilexyz_x: (a: number) => number;
    readonly __wbg_get_vec2_y: (a: number) => number;
    readonly __wbg_get_vec3_z: (a: number) => number;
    readonly __wbg_get_vec3_y: (a: number) => number;
    readonly __wbg_get_rastertileinternalmaterial_elevationGScaler: (a: number) => number;
    readonly __wbg_get_rastertileinternalmaterial_elevationRScaler: (a: number) => number;
    readonly __wbg_get_rastertileinternalmaterial_elevationMaxHeight: (a: number) => number;
    readonly __wbg_get_plane_distance: (a: number) => number;
    readonly __wbg_get_cameraorientation_roll: (a: number) => number;
    readonly __wbg_get_cameraorientation_pitch: (a: number) => number;
    readonly __wbg_get_texturefragment_ind: (a: number) => number;
    readonly __wbg_get_elevationheatmapmaterial_logBoundary: (a: number) => [number, number];
    readonly __wbg_get_elevationheatmapmaterial_minHeight: (a: number) => [number, number];
    readonly __wbg_get_transform_tz: (a: number) => number;
    readonly __wbg_get_transform_ty: (a: number) => number;
    readonly __wbg_get_transform_sz: (a: number) => number;
    readonly __wbg_get_transform_sy: (a: number) => number;
    readonly __wbg_get_transform_sx: (a: number) => number;
    readonly __wbg_get_transform_qz: (a: number) => number;
    readonly __wbg_get_transform_qy: (a: number) => number;
    readonly __wbg_get_transform_qx: (a: number) => number;
    readonly __wbg_get_transform_qw: (a: number) => number;
    readonly __wbg_get_lle_lng: (a: number) => number;
    readonly __wbg_get_lle_height: (a: number) => number;
    readonly __wbg_get_camerafrustum_aspect_ratio: (a: number) => number;
    readonly __wbg_get_camerafrustum_fov: (a: number) => number;
    readonly __wbg_get_camerafrustum_far: (a: number) => number;
    readonly __wbg_get_nearfar_far: (a: number) => number;
    readonly __wbg_get_globe_maxSse: (a: number) => number;
    readonly __wbg_get_window_pixelRatio: (a: number) => number;
    readonly __wbg_get_window_height: (a: number) => number;
    readonly __wbg_get_elevationdecoder_offset: (a: number) => number;
    readonly __wbg_get_rastertileinternalmaterial_elevationBoundary: (a: number) => number;
    readonly __wbg_get_rastertileinternalmaterial_elevationBScaler: (a: number) => number;
    readonly __wbg_get_elevationdecoder_g_scaler: (a: number) => number;
    readonly __wbg_get_ellipsoidgeodesic_start_heading: (a: number) => number;
    readonly __wbg_get_ellipsoidgeodesic_distance: (a: number) => number;
    readonly __wbg_get_elevationdecoder_b_scaler: (a: number) => number;
    readonly __wbg_get_returnedconstructedterrainmesh_min_height: (a: number) => number;
    readonly __wbg_get_returnedconstructedterrainmesh_max_height: (a: number) => number;
    readonly window_new: (a: number, b: number, c: number) => number;
    readonly encodedvec3_new: (a: number, b: number) => number;
    readonly vec3_new: (a: number, b: number, c: number) => number;
    readonly __wbg_get_ray_direction: (a: number) => number;
    readonly __wbg_get_encodedvec3_low: (a: number) => number;
    readonly __wbg_set_textmaterial_center: (a: number, b: number) => void;
    readonly __wbg_set_polylinematerial_color: (a: number, b: number) => void;
    readonly __wbg_set_pointmaterial_center: (a: number, b: number) => void;
    readonly __wbg_set_terrainmaterial_skirtExaggeration: (a: number, b: number) => void;
    readonly __wbg_set_polylineinternalmaterial_minMaxHeights: (a: number, b: number, c: number) => void;
    readonly __wbg_set_rastertileinternalmaterial_elevationMinOffset: (a: number, b: number) => void;
    readonly __wbg_set_rastertileinternalmaterial_elevationEpsilon: (a: number, b: number) => void;
    readonly __wbg_set_rastertileinternalmaterial_elevationMaxOffset: (a: number, b: number) => void;
    readonly __wbg_set_ray_origin: (a: number, b: number) => void;
    readonly __wbg_set_ray_direction: (a: number, b: number) => void;
    readonly __wbg_set_modelinternalmaterial_pointCloudGeodeticNormal: (a: number, b: number) => void;
    readonly __wbg_set_tilexyz_y: (a: number, b: number) => void;
    readonly __wbg_set_vec2_y: (a: number, b: number) => void;
    readonly __wbg_set_vec3_z: (a: number, b: number) => void;
    readonly __wbg_set_vec3_y: (a: number, b: number) => void;
    readonly __wbg_set_polygonmaterial_color: (a: number, b: number) => void;
    readonly __wbg_set_plane_normal: (a: number, b: number) => void;
    readonly __wbg_set_rastertileinternalmaterial_elevationGScaler: (a: number, b: number) => void;
    readonly __wbg_set_rastertileinternalmaterial_elevationRScaler: (a: number, b: number) => void;
    readonly __wbg_set_rastertileinternalmaterial_elevationMaxHeight: (a: number, b: number) => void;
    readonly __wbg_set_plane_distance: (a: number, b: number) => void;
    readonly __wbg_set_cameraorientation_roll: (a: number, b: number) => void;
    readonly __wbg_set_cameraorientation_pitch: (a: number, b: number) => void;
    readonly __wbg_set_elevationheatmapmaterial_logBoundary: (a: number, b: number, c: number) => void;
    readonly __wbg_set_elevationheatmapmaterial_maxHeight: (a: number, b: number, c: number) => void;
    readonly __wbg_set_elevationheatmapmaterial_minHeight: (a: number, b: number, c: number) => void;
    readonly __wbg_set_transform_tz: (a: number, b: number) => void;
    readonly __wbg_set_transform_ty: (a: number, b: number) => void;
    readonly __wbg_set_transform_sz: (a: number, b: number) => void;
    readonly __wbg_set_transform_sy: (a: number, b: number) => void;
    readonly __wbg_set_transform_sx: (a: number, b: number) => void;
    readonly __wbg_set_transform_qz: (a: number, b: number) => void;
    readonly __wbg_set_transform_qy: (a: number, b: number) => void;
    readonly __wbg_set_transform_qx: (a: number, b: number) => void;
    readonly __wbg_set_transform_qw: (a: number, b: number) => void;
    readonly __wbg_set_lle_lng: (a: number, b: number) => void;
    readonly __wbg_set_lle_height: (a: number, b: number) => void;
    readonly __wbg_set_camerafrustum_aspect_ratio: (a: number, b: number) => void;
    readonly __wbg_set_camerafrustum_fov: (a: number, b: number) => void;
    readonly __wbg_set_camerafrustum_far: (a: number, b: number) => void;
    readonly __wbg_set_nearfar_far: (a: number, b: number) => void;
    readonly __wbg_set_globe_maxSse: (a: number, b: number) => void;
    readonly __wbg_set_encodedvec3_low: (a: number, b: number) => void;
    readonly __wbg_set_encodedvec3_high: (a: number, b: number) => void;
    readonly __wbg_set_window_pixelRatio: (a: number, b: number) => void;
    readonly __wbg_set_window_height: (a: number, b: number) => void;
    readonly __wbg_set_elevationdecoder_offset: (a: number, b: number) => void;
    readonly __wbg_set_rastertileinternalmaterial_elevationBoundary: (a: number, b: number) => void;
    readonly __wbg_set_rastertileinternalmaterial_elevationBScaler: (a: number, b: number) => void;
    readonly __wbg_set_elevationdecoder_g_scaler: (a: number, b: number) => void;
    readonly __wbg_set_ellipsoidgeodesic_start_heading: (a: number, b: number) => void;
    readonly __wbg_set_ellipsoidgeodesic_distance: (a: number, b: number) => void;
    readonly __wbg_set_elevationdecoder_b_scaler: (a: number, b: number) => void;
    readonly __wbg_set_returnedconstructedterrainmesh_min_height: (a: number, b: number) => void;
    readonly __wbg_set_returnedconstructedterrainmesh_max_height: (a: number, b: number) => void;
    readonly __wbg_set_uintattribute_size: (a: number, b: number) => void;
    readonly __wbg_set_returnedconstructedterrainmesh_rtc_translation: (a: number, b: number) => void;
    readonly __wbg_get_textmaterial_borderWidth: (a: number) => number;
    readonly __wbg_get_textmaterial_rotation: (a: number) => number;
    readonly __wbg_get_textmaterial_height: (a: number) => number;
    readonly __wbg_get_textmaterial_opacity: (a: number) => number;
    readonly __wbg_get_textmaterial_emissiveIntensity: (a: number) => number;
    readonly __wbg_get_textmaterial_outlineOpacity: (a: number) => number;
    readonly __wbg_get_textmaterial_lineHeight: (a: number) => number;
    readonly __wbg_get_textmaterial_maxWidth: (a: number) => number;
    readonly __wbg_get_textmaterial_outlineWidth: (a: number) => number;
    readonly __wbg_set_textmaterial_outlineColor: (a: number, b: number) => void;
    readonly __wbg_set_textmaterial_color: (a: number, b: number) => void;
    readonly __wbg_get_textmaterial_size: (a: number) => number;
    readonly __wbg_get_pointmaterial_rotation: (a: number) => number;
    readonly __wbg_get_pointmaterial_opacity: (a: number) => number;
    readonly __wbg_get_pointmaterial_height: (a: number) => number;
    readonly __wbg_get_pointmaterial_emissiveIntensity: (a: number) => number;
    readonly __wbg_get_pointmaterial_declutterPriority: (a: number) => number;
    readonly __wbg_get_textmaterial_center: (a: number) => number;
    readonly __wbg_set_rastermaterial_color: (a: number, b: number) => void;
    readonly __wbg_get_rastermaterial_opacity: (a: number) => number;
    readonly __wbg_get_rastermaterial_color: (a: number) => number;
    readonly __wbg_get_polylinematerial_width: (a: number) => number;
    readonly __wbg_get_polylinematerial_maxWidth: (a: number) => number;
    readonly __wbg_get_polylinematerial_height: (a: number) => number;
    readonly __wbg_get_polylinematerial_emissiveIntensity: (a: number) => number;
    readonly __wbg_get_polylinematerial_color: (a: number) => number;
    readonly __wbg_set_pointmaterial_color: (a: number, b: number) => void;
    readonly __wbg_get_pointmaterial_size: (a: number) => number;
    readonly __wbg_get_modelmaterial_roughness: (a: number) => number;
    readonly __wbg_get_modelmaterial_waterScaleNormal: (a: number) => number;
    readonly __wbg_get_modelmaterial_reflectivity: (a: number) => number;
    readonly __wbg_get_modelmaterial_specularStrength: (a: number) => number;
    readonly __wbg_get_modelmaterial_shininess: (a: number) => number;
    readonly __wbg_get_pointmaterial_center: (a: number) => number;
    readonly __wbg_get_modelmaterial_waterSpeed: (a: number) => number;
    readonly __wbg_get_polylineinternalmaterial_minMaxHeights: (a: number) => [number, number];
    readonly __wbg_get_modelinternalmaterial_pointCloudGeodeticNormal: (a: number) => number;
    readonly __wbg_get_ray_origin: (a: number) => number;
    readonly __wbg_get_tilexyz_y: (a: number) => number;
    readonly __wbg_get_vec2_x: (a: number) => number;
    readonly __wbg_get_vec3_x: (a: number) => number;
    readonly __wbg_get_plane_normal: (a: number) => number;
    readonly __wbg_get_rastertileinternalmaterial_elevationMinHeight: (a: number) => number;
    readonly __wbg_plane_free: (a: number, b: number) => void;
    readonly __wbg_get_cameraorientation_heading: (a: number) => number;
    readonly __wbg_get_cameracontrolupdateevent_zoomDuration: (a: number) => number;
    readonly __wbg_get_cameracontrolupdateevent_translateDuration: (a: number) => number;
    readonly __wbg_get_cameracontrolupdateevent_spinDuration: (a: number) => number;
    readonly __wbg_get_elevationheatmapmaterial_maxHeight: (a: number) => [number, number];
    readonly __wbg_get_transform_tx: (a: number) => number;
    readonly __wbg_lle_free: (a: number, b: number) => void;
    readonly __wbg_get_lle_lat: (a: number) => number;
    readonly __wbg_get_camerafrustum_near: (a: number) => number;
    readonly __wbg_camerafrustum_free: (a: number, b: number) => void;
    readonly __wbg_get_nearfar_near: (a: number) => number;
    readonly __wbg_get_encodedvec3_high: (a: number) => number;
    readonly __wbg_encodedvec3_free: (a: number, b: number) => void;
    readonly __wbg_window_free: (a: number, b: number) => void;
    readonly __wbg_get_window_width: (a: number) => number;
    readonly __wbg_get_elevationdecoder_r_scaler: (a: number) => number;
    readonly __wbg_get_uintattribute_size: (a: number) => number;
    readonly ray_new: (a: number, b: number) => number;
    readonly __wbg_terrainmaterial_free: (a: number, b: number) => void;
    readonly __wbg_polylineinternalmaterial_free: (a: number, b: number) => void;
    readonly __wbg_tileuvtransform_free: (a: number, b: number) => void;
    readonly __wbg_vec3_free: (a: number, b: number) => void;
    readonly __wbg_set_ellipsoidgeodesic_end: (a: number, b: number) => void;
    readonly __wbg_set_ellipsoidgeodesic_start: (a: number, b: number) => void;
    readonly __wbg_compiledfilter_free: (a: number, b: number) => void;
    readonly __wbindgen_malloc: (a: number, b: number) => number;
    readonly __wbindgen_realloc: (a: number, b: number, c: number, d: number) => number;
    readonly __wbindgen_exn_store: (a: number) => void;
    readonly __externref_table_alloc: () => number;
    readonly __wbindgen_externrefs: WebAssembly.Table;
    readonly __externref_table_dealloc: (a: number) => void;
    readonly __externref_drop_slice: (a: number, b: number) => void;
    readonly __wbindgen_free: (a: number, b: number, c: number) => void;
    readonly __wbindgen_start: () => void;
}

export type SyncInitInput = BufferSource | WebAssembly.Module;

/**
 * Instantiates the given `module`, which can either be bytes or
 * a precompiled `WebAssembly.Module`.
 *
 * @param {{ module: SyncInitInput }} module - Passing `SyncInitInput` directly is deprecated.
 *
 * @returns {InitOutput}
 */
export function initSync(module: { module: SyncInitInput } | SyncInitInput): InitOutput;

/**
 * If `module_or_path` is {RequestInfo} or {URL}, makes a request and
 * for everything else, calls `WebAssembly.instantiate` directly.
 *
 * @param {{ module_or_path: InitInput | Promise<InitInput> }} module_or_path - Passing `InitInput` directly is deprecated.
 *
 * @returns {Promise<InitOutput>}
 */
export default function __wbg_init (module_or_path?: { module_or_path: InitInput | Promise<InitInput> } | InitInput | Promise<InitInput>): Promise<InitOutput>;
