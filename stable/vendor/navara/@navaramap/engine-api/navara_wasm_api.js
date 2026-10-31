/* @ts-self-types="./navara_wasm_api.d.ts" */

export class Aabb {
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        AabbFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_aabb_free(ptr, 0);
    }
    /**
     * @param {Vec3} center
     * @param {Vec3} extent
     */
    constructor(center, extent) {
        _assertClass(center, Vec3);
        var ptr0 = center.__destroy_into_raw();
        _assertClass(extent, Vec3);
        var ptr1 = extent.__destroy_into_raw();
        const ret = wasm.aabb_new(ptr0, ptr1);
        this.__wbg_ptr = ret;
        AabbFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * @returns {Vec3}
     */
    get center() {
        const ret = wasm.__wbg_get_aabb_center(this.__wbg_ptr);
        return Vec3.__wrap(ret);
    }
    /**
     * @returns {Vec3}
     */
    get extent() {
        const ret = wasm.__wbg_get_aabb_extent(this.__wbg_ptr);
        return Vec3.__wrap(ret);
    }
    /**
     * @param {Vec3} arg0
     */
    set center(arg0) {
        _assertClass(arg0, Vec3);
        var ptr0 = arg0.__destroy_into_raw();
        wasm.__wbg_set_aabb_center(this.__wbg_ptr, ptr0);
    }
    /**
     * @param {Vec3} arg0
     */
    set extent(arg0) {
        _assertClass(arg0, Vec3);
        var ptr0 = arg0.__destroy_into_raw();
        wasm.__wbg_set_aabb_extent(this.__wbg_ptr, ptr0);
    }
}
if (Symbol.dispose) Aabb.prototype[Symbol.dispose] = Aabb.prototype.free;

export class BatchPropResult {
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        BatchPropResultFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_batchpropresult_free(ptr, 0);
    }
    /**
     * The picked feature's canonical global batch id (its first instance's
     * id). A picked instance of a multi-instance feature (e.g. MultiPoint)
     * carries its own id, while styling APIs report the canonical one, so
     * consumers correlate picks through this field.
     * @returns {number | undefined}
     */
    get batchId() {
        const ret = wasm.__wbg_get_batchpropresult_batchId(this.__wbg_ptr);
        return ret === Number.MAX_SAFE_INTEGER ? undefined : ret;
    }
    /**
     * @returns {string | undefined}
     */
    get layerId() {
        const ret = wasm.__wbg_get_batchpropresult_layerId(this.__wbg_ptr);
        let v1;
        if (ret[0] !== 0) {
            v1 = getStringFromWasm0(ret[0], ret[1]).slice();
            wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        }
        return v1;
    }
    /**
     * @returns {any}
     */
    get properties() {
        const ret = wasm.__wbg_get_batchpropresult_properties(this.__wbg_ptr);
        return ret;
    }
    /**
     * The picked feature's canonical global batch id (its first instance's
     * id). A picked instance of a multi-instance feature (e.g. MultiPoint)
     * carries its own id, while styling APIs report the canonical one, so
     * consumers correlate picks through this field.
     * @param {number | null} [arg0]
     */
    set batchId(arg0) {
        wasm.__wbg_set_batchpropresult_batchId(this.__wbg_ptr, isLikeNone(arg0) ? Number.MAX_SAFE_INTEGER : (arg0) >>> 0);
    }
    /**
     * @param {string | null} [arg0]
     */
    set layerId(arg0) {
        var ptr0 = isLikeNone(arg0) ? 0 : passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_batchpropresult_layerId(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @param {any} arg0
     */
    set properties(arg0) {
        wasm.__wbg_set_batchpropresult_properties(this.__wbg_ptr, arg0);
    }
}
if (Symbol.dispose) BatchPropResult.prototype[Symbol.dispose] = BatchPropResult.prototype.free;

export class BillboardMaterial {
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        BillboardMaterialFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_billboardmaterial_free(ptr, 0);
    }
    /**
     * @returns {number | undefined}
     */
    get alphaTest() {
        const ret = wasm.__wbg_get_billboardmaterial_alphaTest(this.__wbg_ptr);
        return ret === Number.MAX_SAFE_INTEGER ? undefined : ret;
    }
    /**
     * Whether faces seen from behind are culled. Default is false, so a
     * quad frozen in its anchor's frame (`rotateWithCamera: false`) stays
     * visible from behind. Turn it on to hide a flat quad's parts that wrap
     * over the horizon, which face away from the camera.
     * @returns {boolean | undefined}
     */
    get backfaceCulling() {
        const ret = wasm.__wbg_get_billboardmaterial_backfaceCulling(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret !== 0;
    }
    /**
     * Whether the sprite stands up (`"upright"`, the default) or lies on the
     * globe surface around its anchor (`"flat"`). Pair with
     * `rotateWithCamera`.
     * @returns {string | undefined}
     */
    get billboardFacing() {
        const ret = wasm.__wbg_get_billboardmaterial_billboardFacing(this.__wbg_ptr);
        let v1;
        if (ret[0] !== 0) {
            v1 = getStringFromWasm0(ret[0], ret[1]).slice();
            wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        }
        return v1;
    }
    /**
     * anchor point of the sprite, range is (-0.5, -0.5) to (0.5, 0.5).
     * Default is (0.0, 0.0) which means the center of the sprite.
     * @returns {Vec2 | undefined}
     */
    get center() {
        const ret = wasm.__wbg_get_billboardmaterial_center(this.__wbg_ptr);
        return ret === 0 ? undefined : Vec2.__wrap(ret);
    }
    /**
     * @returns {boolean | undefined}
     */
    get clampToGround() {
        const ret = wasm.__wbg_get_billboardmaterial_clampToGround(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret !== 0;
    }
    /**
     * @returns {number | undefined}
     */
    get color() {
        const ret = wasm.__wbg_get_billboardmaterial_color(this.__wbg_ptr);
        return ret === Number.MAX_SAFE_INTEGER ? undefined : ret;
    }
    /**
     * Placement priority for decluttering; higher wins. Only meaningful when
     * `declutter` is enabled. Defaults to `0.0`.
     * @returns {number | undefined}
     */
    get declutterPriority() {
        const ret = wasm.__wbg_get_billboardmaterial_declutterPriority(this.__wbg_ptr);
        return ret === Number.MAX_SAFE_INTEGER ? undefined : ret;
    }
    /**
     * Participate in screen-space decluttering: when labels/sprites overlap
     * on screen, lower-priority ones are hidden. Defaults to `true`; set to
     * `false` to draw every label unconditionally.
     * @returns {boolean | undefined}
     */
    get declutter() {
        const ret = wasm.__wbg_get_billboardmaterial_declutter(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret !== 0;
    }
    /**
     * @returns {boolean | undefined}
     */
    get depthTest() {
        const ret = wasm.__wbg_get_billboardmaterial_depthTest(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret !== 0;
    }
    /**
     * IDs of selective effects to apply (e.g., "bloom", "outline")
     * @returns {string[] | undefined}
     */
    get effectIds() {
        const ret = wasm.__wbg_get_billboardmaterial_effectIds(this.__wbg_ptr);
        let v1;
        if (ret[0] !== 0) {
            v1 = getArrayJsValueFromWasm0(ret[0], ret[1]).slice();
            wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        }
        return v1;
    }
    /**
     * Emissive glow color in 0xRRGGBB format
     * @returns {number | undefined}
     */
    get emissiveColor() {
        const ret = wasm.__wbg_get_billboardmaterial_emissiveColor(this.__wbg_ptr);
        return ret === Number.MAX_SAFE_INTEGER ? undefined : ret;
    }
    /**
     * Emissive glow intensity (omitted = 0, no emissive output)
     * @returns {number | undefined}
     */
    get emissiveIntensity() {
        const ret = wasm.__wbg_get_billboardmaterial_emissiveIntensity(this.__wbg_ptr);
        return ret === Number.MAX_SAFE_INTEGER ? undefined : ret;
    }
    /**
     * Source geometry types this appearance consumes: `"point"`, `"line"`,
     * `"polygon"`. Defaults to `["point"]`; adding `"line"`/`"polygon"` also
     * emits a billboard per line-string / polygon-ring vertex.
     * @returns {string[] | undefined}
     */
    get geometryTypes() {
        const ret = wasm.__wbg_get_billboardmaterial_geometryTypes(this.__wbg_ptr);
        let v1;
        if (ret[0] !== 0) {
            v1 = getArrayJsValueFromWasm0(ret[0], ret[1]).slice();
            wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        }
        return v1;
    }
    /**
     * @returns {number | undefined}
     */
    get height() {
        const ret = wasm.__wbg_get_billboardmaterial_height(this.__wbg_ptr);
        return ret === Number.MAX_SAFE_INTEGER ? undefined : ret;
    }
    /**
     * Avoid overlapping with the globe surface.
     * @returns {boolean | undefined}
     */
    get offsetDepth() {
        const ret = wasm.__wbg_get_billboardmaterial_offsetDepth(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret !== 0;
    }
    /**
     * @returns {number | undefined}
     */
    get opacity() {
        const ret = wasm.__wbg_get_billboardmaterial_opacity(this.__wbg_ptr);
        return ret === Number.MAX_SAFE_INTEGER ? undefined : ret;
    }
    /**
     * Whether the sprite turns to follow the camera. `true` (the default)
     * keeps it facing the viewer. `false` freezes it in the anchor's local
     * east-north-up frame, so moving the camera never reorients it.
     * @returns {boolean | undefined}
     */
    get rotateWithCamera() {
        const ret = wasm.__wbg_get_billboardmaterial_rotateWithCamera(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret !== 0;
    }
    /**
     * Rotation of the sprite within its own plane, about its anchor point,
     * in degrees, clockwise seen from the front. `center` decides where
     * inside the sprite the pivot sits. Defaults to `0.0`.
     * @returns {number | undefined}
     */
    get rotation() {
        const ret = wasm.__wbg_get_billboardmaterial_rotation(this.__wbg_ptr);
        return ret === Number.MAX_SAFE_INTEGER ? undefined : ret;
    }
    /**
     * @returns {boolean | undefined}
     */
    get show() {
        const ret = wasm.__wbg_get_billboardmaterial_show(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret !== 0;
    }
    /**
     * Whether the size is specified in meters. If false, the size is in pixels. Default is true.
     * @returns {boolean | undefined}
     */
    get sizeInMeters() {
        const ret = wasm.__wbg_get_billboardmaterial_sizeInMeters(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret !== 0;
    }
    /**
     * size in pixels/meters (units are determined by `sizeInMeters`).
     * @returns {number | undefined}
     */
    get size() {
        const ret = wasm.__wbg_get_billboardmaterial_size(this.__wbg_ptr);
        return ret === Number.MAX_SAFE_INTEGER ? undefined : ret;
    }
    /**
     * @returns {boolean | undefined}
     */
    get transparent() {
        const ret = wasm.__wbg_get_billboardmaterial_transparent(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret !== 0;
    }
    /**
     * @returns {string | undefined}
     */
    get url() {
        const ret = wasm.__wbg_get_billboardmaterial_url(this.__wbg_ptr);
        let v1;
        if (ret[0] !== 0) {
            v1 = getStringFromWasm0(ret[0], ret[1]).slice();
            wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        }
        return v1;
    }
    /**
     * @param {number | null} [arg0]
     */
    set alphaTest(arg0) {
        wasm.__wbg_set_billboardmaterial_alphaTest(this.__wbg_ptr, isLikeNone(arg0) ? Number.MAX_SAFE_INTEGER : Math.fround(arg0));
    }
    /**
     * Whether faces seen from behind are culled. Default is false, so a
     * quad frozen in its anchor's frame (`rotateWithCamera: false`) stays
     * visible from behind. Turn it on to hide a flat quad's parts that wrap
     * over the horizon, which face away from the camera.
     * @param {boolean | null} [arg0]
     */
    set backfaceCulling(arg0) {
        wasm.__wbg_set_billboardmaterial_backfaceCulling(this.__wbg_ptr, isLikeNone(arg0) ? 0xFFFFFF : arg0 ? 1 : 0);
    }
    /**
     * Whether the sprite stands up (`"upright"`, the default) or lies on the
     * globe surface around its anchor (`"flat"`). Pair with
     * `rotateWithCamera`.
     * @param {string | null} [arg0]
     */
    set billboardFacing(arg0) {
        var ptr0 = isLikeNone(arg0) ? 0 : passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_billboardmaterial_billboardFacing(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * anchor point of the sprite, range is (-0.5, -0.5) to (0.5, 0.5).
     * Default is (0.0, 0.0) which means the center of the sprite.
     * @param {Vec2 | null} [arg0]
     */
    set center(arg0) {
        let ptr0 = 0;
        if (!isLikeNone(arg0)) {
            _assertClass(arg0, Vec2);
            ptr0 = arg0.__destroy_into_raw();
        }
        wasm.__wbg_set_billboardmaterial_center(this.__wbg_ptr, ptr0);
    }
    /**
     * @param {boolean | null} [arg0]
     */
    set clampToGround(arg0) {
        wasm.__wbg_set_billboardmaterial_clampToGround(this.__wbg_ptr, isLikeNone(arg0) ? 0xFFFFFF : arg0 ? 1 : 0);
    }
    /**
     * @param {number | null} [arg0]
     */
    set color(arg0) {
        wasm.__wbg_set_billboardmaterial_color(this.__wbg_ptr, isLikeNone(arg0) ? Number.MAX_SAFE_INTEGER : (arg0) >>> 0);
    }
    /**
     * Placement priority for decluttering; higher wins. Only meaningful when
     * `declutter` is enabled. Defaults to `0.0`.
     * @param {number | null} [arg0]
     */
    set declutterPriority(arg0) {
        wasm.__wbg_set_billboardmaterial_declutterPriority(this.__wbg_ptr, isLikeNone(arg0) ? Number.MAX_SAFE_INTEGER : Math.fround(arg0));
    }
    /**
     * Participate in screen-space decluttering: when labels/sprites overlap
     * on screen, lower-priority ones are hidden. Defaults to `true`; set to
     * `false` to draw every label unconditionally.
     * @param {boolean | null} [arg0]
     */
    set declutter(arg0) {
        wasm.__wbg_set_billboardmaterial_declutter(this.__wbg_ptr, isLikeNone(arg0) ? 0xFFFFFF : arg0 ? 1 : 0);
    }
    /**
     * @param {boolean | null} [arg0]
     */
    set depthTest(arg0) {
        wasm.__wbg_set_billboardmaterial_depthTest(this.__wbg_ptr, isLikeNone(arg0) ? 0xFFFFFF : arg0 ? 1 : 0);
    }
    /**
     * IDs of selective effects to apply (e.g., "bloom", "outline")
     * @param {string[] | null} [arg0]
     */
    set effectIds(arg0) {
        var ptr0 = isLikeNone(arg0) ? 0 : passArrayJsValueToWasm0(arg0, wasm.__wbindgen_malloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_billboardmaterial_effectIds(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * Emissive glow color in 0xRRGGBB format
     * @param {number | null} [arg0]
     */
    set emissiveColor(arg0) {
        wasm.__wbg_set_billboardmaterial_emissiveColor(this.__wbg_ptr, isLikeNone(arg0) ? Number.MAX_SAFE_INTEGER : (arg0) >>> 0);
    }
    /**
     * Emissive glow intensity (omitted = 0, no emissive output)
     * @param {number | null} [arg0]
     */
    set emissiveIntensity(arg0) {
        wasm.__wbg_set_billboardmaterial_emissiveIntensity(this.__wbg_ptr, isLikeNone(arg0) ? Number.MAX_SAFE_INTEGER : Math.fround(arg0));
    }
    /**
     * Source geometry types this appearance consumes: `"point"`, `"line"`,
     * `"polygon"`. Defaults to `["point"]`; adding `"line"`/`"polygon"` also
     * emits a billboard per line-string / polygon-ring vertex.
     * @param {string[] | null} [arg0]
     */
    set geometryTypes(arg0) {
        var ptr0 = isLikeNone(arg0) ? 0 : passArrayJsValueToWasm0(arg0, wasm.__wbindgen_malloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_billboardmaterial_geometryTypes(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @param {number | null} [arg0]
     */
    set height(arg0) {
        wasm.__wbg_set_billboardmaterial_height(this.__wbg_ptr, isLikeNone(arg0) ? Number.MAX_SAFE_INTEGER : Math.fround(arg0));
    }
    /**
     * Avoid overlapping with the globe surface.
     * @param {boolean | null} [arg0]
     */
    set offsetDepth(arg0) {
        wasm.__wbg_set_billboardmaterial_offsetDepth(this.__wbg_ptr, isLikeNone(arg0) ? 0xFFFFFF : arg0 ? 1 : 0);
    }
    /**
     * @param {number | null} [arg0]
     */
    set opacity(arg0) {
        wasm.__wbg_set_billboardmaterial_opacity(this.__wbg_ptr, isLikeNone(arg0) ? Number.MAX_SAFE_INTEGER : Math.fround(arg0));
    }
    /**
     * Whether the sprite turns to follow the camera. `true` (the default)
     * keeps it facing the viewer. `false` freezes it in the anchor's local
     * east-north-up frame, so moving the camera never reorients it.
     * @param {boolean | null} [arg0]
     */
    set rotateWithCamera(arg0) {
        wasm.__wbg_set_billboardmaterial_rotateWithCamera(this.__wbg_ptr, isLikeNone(arg0) ? 0xFFFFFF : arg0 ? 1 : 0);
    }
    /**
     * Rotation of the sprite within its own plane, about its anchor point,
     * in degrees, clockwise seen from the front. `center` decides where
     * inside the sprite the pivot sits. Defaults to `0.0`.
     * @param {number | null} [arg0]
     */
    set rotation(arg0) {
        wasm.__wbg_set_billboardmaterial_rotation(this.__wbg_ptr, isLikeNone(arg0) ? Number.MAX_SAFE_INTEGER : Math.fround(arg0));
    }
    /**
     * @param {boolean | null} [arg0]
     */
    set show(arg0) {
        wasm.__wbg_set_billboardmaterial_show(this.__wbg_ptr, isLikeNone(arg0) ? 0xFFFFFF : arg0 ? 1 : 0);
    }
    /**
     * Whether the size is specified in meters. If false, the size is in pixels. Default is true.
     * @param {boolean | null} [arg0]
     */
    set sizeInMeters(arg0) {
        wasm.__wbg_set_billboardmaterial_sizeInMeters(this.__wbg_ptr, isLikeNone(arg0) ? 0xFFFFFF : arg0 ? 1 : 0);
    }
    /**
     * size in pixels/meters (units are determined by `sizeInMeters`).
     * @param {number | null} [arg0]
     */
    set size(arg0) {
        wasm.__wbg_set_billboardmaterial_size(this.__wbg_ptr, isLikeNone(arg0) ? Number.MAX_SAFE_INTEGER : Math.fround(arg0));
    }
    /**
     * @param {boolean | null} [arg0]
     */
    set transparent(arg0) {
        wasm.__wbg_set_billboardmaterial_transparent(this.__wbg_ptr, isLikeNone(arg0) ? 0xFFFFFF : arg0 ? 1 : 0);
    }
    /**
     * @param {string | null} [arg0]
     */
    set url(arg0) {
        var ptr0 = isLikeNone(arg0) ? 0 : passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_billboardmaterial_url(this.__wbg_ptr, ptr0, len0);
    }
}
if (Symbol.dispose) BillboardMaterial.prototype[Symbol.dispose] = BillboardMaterial.prototype.free;

export class BoundingSphere {
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        BoundingSphereFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_boundingsphere_free(ptr, 0);
    }
    /**
     * @param {number} center_x
     * @param {number} center_y
     * @param {number} center_z
     * @param {number} radius
     */
    constructor(center_x, center_y, center_z, radius) {
        const ret = wasm.boundingsphere_new(center_x, center_y, center_z, radius);
        this.__wbg_ptr = ret;
        BoundingSphereFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * @returns {number}
     */
    get center_x() {
        const ret = wasm.__wbg_get_boundingsphere_center_x(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number}
     */
    get center_y() {
        const ret = wasm.__wbg_get_boundingsphere_center_y(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number}
     */
    get center_z() {
        const ret = wasm.__wbg_get_boundingsphere_center_z(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number}
     */
    get radius() {
        const ret = wasm.__wbg_get_boundingsphere_radius(this.__wbg_ptr);
        return ret;
    }
    /**
     * @param {number} arg0
     */
    set center_x(arg0) {
        wasm.__wbg_set_boundingsphere_center_x(this.__wbg_ptr, arg0);
    }
    /**
     * @param {number} arg0
     */
    set center_y(arg0) {
        wasm.__wbg_set_boundingsphere_center_y(this.__wbg_ptr, arg0);
    }
    /**
     * @param {number} arg0
     */
    set center_z(arg0) {
        wasm.__wbg_set_boundingsphere_center_z(this.__wbg_ptr, arg0);
    }
    /**
     * @param {number} arg0
     */
    set radius(arg0) {
        wasm.__wbg_set_boundingsphere_radius(this.__wbg_ptr, arg0);
    }
}
if (Symbol.dispose) BoundingSphere.prototype[Symbol.dispose] = BoundingSphere.prototype.free;

/**
 * Coordinate reference system
 * @enum {0 | 1}
 */
export const CRS = Object.freeze({
    /**
     * EPSG:4326
     */
    Geographic: 0, "0": "Geographic",
    /**
     * EPSG:4978
     */
    Geocentric: 1, "1": "Geocentric",
});

export class CachedMeshHandle {
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        CachedMeshHandleFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_cachedmeshhandle_free(ptr, 0);
    }
    /**
     * @param {number} vertices
     * @param {number} indices
     * @param {number} uvs
     * @param {number | null} [heights]
     */
    constructor(vertices, indices, uvs, heights) {
        const ret = wasm.cachedmeshhandle_new(vertices, indices, uvs, isLikeNone(heights) ? Number.MAX_SAFE_INTEGER : (heights) >> 0);
        this.__wbg_ptr = ret;
        CachedMeshHandleFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * @returns {number | undefined}
     */
    get heights() {
        const ret = wasm.__wbg_get_cachedmeshhandle_heights(this.__wbg_ptr);
        return ret === Number.MAX_SAFE_INTEGER ? undefined : ret;
    }
    /**
     * @returns {number}
     */
    get indices() {
        const ret = wasm.__wbg_get_cachedmeshhandle_indices(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number | undefined}
     */
    get normals() {
        const ret = wasm.__wbg_get_cachedmeshhandle_normals(this.__wbg_ptr);
        return ret === Number.MAX_SAFE_INTEGER ? undefined : ret;
    }
    /**
     * @returns {number}
     */
    get uvs() {
        const ret = wasm.__wbg_get_cachedmeshhandle_uvs(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number}
     */
    get vertices() {
        const ret = wasm.__wbg_get_cachedmeshhandle_vertices(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number | undefined}
     */
    get watermask() {
        const ret = wasm.__wbg_get_cachedmeshhandle_watermask(this.__wbg_ptr);
        return ret === Number.MAX_SAFE_INTEGER ? undefined : ret;
    }
    /**
     * @param {number | null} [arg0]
     */
    set heights(arg0) {
        wasm.__wbg_set_cachedmeshhandle_heights(this.__wbg_ptr, isLikeNone(arg0) ? Number.MAX_SAFE_INTEGER : (arg0) >> 0);
    }
    /**
     * @param {number} arg0
     */
    set indices(arg0) {
        wasm.__wbg_set_cachedmeshhandle_indices(this.__wbg_ptr, arg0);
    }
    /**
     * @param {number | null} [arg0]
     */
    set normals(arg0) {
        wasm.__wbg_set_cachedmeshhandle_normals(this.__wbg_ptr, isLikeNone(arg0) ? Number.MAX_SAFE_INTEGER : (arg0) >> 0);
    }
    /**
     * @param {number} arg0
     */
    set uvs(arg0) {
        wasm.__wbg_set_cachedmeshhandle_uvs(this.__wbg_ptr, arg0);
    }
    /**
     * @param {number} arg0
     */
    set vertices(arg0) {
        wasm.__wbg_set_cachedmeshhandle_vertices(this.__wbg_ptr, arg0);
    }
    /**
     * @param {number | null} [arg0]
     */
    set watermask(arg0) {
        wasm.__wbg_set_cachedmeshhandle_watermask(this.__wbg_ptr, isLikeNone(arg0) ? Number.MAX_SAFE_INTEGER : (arg0) >> 0);
    }
}
if (Symbol.dispose) CachedMeshHandle.prototype[Symbol.dispose] = CachedMeshHandle.prototype.free;

/**
 * An event for updating camera controller settings at runtime.
 *
 * This event allows partial updates to the [`CameraController`](navara_camera::CameraController)
 * component. Only fields set to `Some` will be applied; `None` fields are ignored.
 */
export class CameraControlUpdateEvent {
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        CameraControlUpdateEventFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_cameracontrolupdateevent_free(ptr, 0);
    }
    constructor() {
        const ret = wasm.cameracontrolupdateevent_new();
        this.__wbg_ptr = ret;
        CameraControlUpdateEventFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * Whether to automatically adjust near/far clipping planes based on camera distance
     * from the Earth surface. When enabled, the camera uses three zones:
     * - Near ground: near = 1.0, far = 1e6
     * - Mid altitude: near = 100.0, far = 1e8
     * - Far/Space: near = 1000.0, far = 1e9
     *
     * Default: `true`
     * @returns {boolean | undefined}
     */
    get autoAdjustNearFar() {
        const ret = wasm.__wbg_get_cameracontrolupdateevent_autoAdjustNearFar(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret !== 0;
    }
    /**
     * Whether mouse drag and touch swipe rotation (spin) are enabled.
     *
     * Default: `true`
     * @returns {boolean | undefined}
     */
    get enableSpin() {
        const ret = wasm.__wbg_get_cameracontrolupdateevent_enableSpin(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret !== 0;
    }
    /**
     * Whether tilt interactions (Ctrl+left drag, right-click drag, double-swipe, or rotate gestures) are enabled.
     *
     * Default: `true`
     * @returns {boolean | undefined}
     */
    get enableTilt() {
        const ret = wasm.__wbg_get_cameracontrolupdateevent_enableTilt(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret !== 0;
    }
    /**
     * Whether scroll wheel and pinch/spread touch zoom are enabled.
     *
     * Default: `true`
     * @returns {boolean | undefined}
     */
    get enableZoom() {
        const ret = wasm.__wbg_get_cameracontrolupdateevent_enableZoom(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret !== 0;
    }
    /**
     * The maximum distance (in meters) the camera can zoom out from the Earth surface.
     *
     * Default: `WGS84_B_64 * 10.0` (~63,567,523 meters)
     * @returns {number | undefined}
     */
    get maximumZoomDistance() {
        const ret = wasm.__wbg_get_cameracontrolupdateevent_maximumZoomDistance(this.__wbg_ptr);
        return ret[0] === 0 ? undefined : ret[1];
    }
    /**
     * The minimum distance (in meters) the camera can zoom in to the Earth surface.
     *
     * Default: `WGS84_B_64` (Earth's semi-minor axis, ~6,356,752 meters)
     * @returns {number | undefined}
     */
    get minimumZoomDistance() {
        const ret = wasm.__wbg_get_cameracontrolupdateevent_minimumZoomDistance(this.__wbg_ptr);
        return ret[0] === 0 ? undefined : ret[1];
    }
    /**
     * Duration (in milliseconds) for spin inertia animation after releasing mouse drag.
     *
     * Default: `500.0`
     * @returns {number | undefined}
     */
    get spinDuration() {
        const ret = wasm.__wbg_get_cameracontrolupdateevent_spinDuration(this.__wbg_ptr);
        return ret === Number.MAX_SAFE_INTEGER ? undefined : ret;
    }
    /**
     * Multiplier for mouse drag rotation speed.
     *
     * Default: `2.0`
     * @returns {number | undefined}
     */
    get spinSpeed() {
        const ret = wasm.__wbg_get_cameracontrolupdateevent_spinSpeed(this.__wbg_ptr);
        return ret[0] === 0 ? undefined : ret[1];
    }
    /**
     * Duration (in milliseconds) for translation inertia animation.
     *
     * Default: `500.0`
     * @returns {number | undefined}
     */
    get translateDuration() {
        const ret = wasm.__wbg_get_cameracontrolupdateevent_translateDuration(this.__wbg_ptr);
        return ret === Number.MAX_SAFE_INTEGER ? undefined : ret;
    }
    /**
     * Duration (in milliseconds) for zoom inertia animation after scroll wheel input.
     *
     * Default: `100.0`
     * @returns {number | undefined}
     */
    get zoomDuration() {
        const ret = wasm.__wbg_get_cameracontrolupdateevent_zoomDuration(this.__wbg_ptr);
        return ret === Number.MAX_SAFE_INTEGER ? undefined : ret;
    }
    /**
     * Multiplier for scroll wheel zoom speed.
     *
     * Default: `0.6`
     * @returns {number | undefined}
     */
    get zoomSpeed() {
        const ret = wasm.__wbg_get_cameracontrolupdateevent_zoomSpeed(this.__wbg_ptr);
        return ret[0] === 0 ? undefined : ret[1];
    }
    /**
     * Whether to automatically adjust near/far clipping planes based on camera distance
     * from the Earth surface. When enabled, the camera uses three zones:
     * - Near ground: near = 1.0, far = 1e6
     * - Mid altitude: near = 100.0, far = 1e8
     * - Far/Space: near = 1000.0, far = 1e9
     *
     * Default: `true`
     * @param {boolean | null} [arg0]
     */
    set autoAdjustNearFar(arg0) {
        wasm.__wbg_set_cameracontrolupdateevent_autoAdjustNearFar(this.__wbg_ptr, isLikeNone(arg0) ? 0xFFFFFF : arg0 ? 1 : 0);
    }
    /**
     * Whether mouse drag and touch swipe rotation (spin) are enabled.
     *
     * Default: `true`
     * @param {boolean | null} [arg0]
     */
    set enableSpin(arg0) {
        wasm.__wbg_set_cameracontrolupdateevent_enableSpin(this.__wbg_ptr, isLikeNone(arg0) ? 0xFFFFFF : arg0 ? 1 : 0);
    }
    /**
     * Whether tilt interactions (Ctrl+left drag, right-click drag, double-swipe, or rotate gestures) are enabled.
     *
     * Default: `true`
     * @param {boolean | null} [arg0]
     */
    set enableTilt(arg0) {
        wasm.__wbg_set_cameracontrolupdateevent_enableTilt(this.__wbg_ptr, isLikeNone(arg0) ? 0xFFFFFF : arg0 ? 1 : 0);
    }
    /**
     * Whether scroll wheel and pinch/spread touch zoom are enabled.
     *
     * Default: `true`
     * @param {boolean | null} [arg0]
     */
    set enableZoom(arg0) {
        wasm.__wbg_set_cameracontrolupdateevent_enableZoom(this.__wbg_ptr, isLikeNone(arg0) ? 0xFFFFFF : arg0 ? 1 : 0);
    }
    /**
     * The maximum distance (in meters) the camera can zoom out from the Earth surface.
     *
     * Default: `WGS84_B_64 * 10.0` (~63,567,523 meters)
     * @param {number | null} [arg0]
     */
    set maximumZoomDistance(arg0) {
        wasm.__wbg_set_cameracontrolupdateevent_maximumZoomDistance(this.__wbg_ptr, !isLikeNone(arg0), isLikeNone(arg0) ? 0 : arg0);
    }
    /**
     * The minimum distance (in meters) the camera can zoom in to the Earth surface.
     *
     * Default: `WGS84_B_64` (Earth's semi-minor axis, ~6,356,752 meters)
     * @param {number | null} [arg0]
     */
    set minimumZoomDistance(arg0) {
        wasm.__wbg_set_cameracontrolupdateevent_minimumZoomDistance(this.__wbg_ptr, !isLikeNone(arg0), isLikeNone(arg0) ? 0 : arg0);
    }
    /**
     * Duration (in milliseconds) for spin inertia animation after releasing mouse drag.
     *
     * Default: `500.0`
     * @param {number | null} [arg0]
     */
    set spinDuration(arg0) {
        wasm.__wbg_set_cameracontrolupdateevent_spinDuration(this.__wbg_ptr, isLikeNone(arg0) ? Number.MAX_SAFE_INTEGER : Math.fround(arg0));
    }
    /**
     * Multiplier for mouse drag rotation speed.
     *
     * Default: `2.0`
     * @param {number | null} [arg0]
     */
    set spinSpeed(arg0) {
        wasm.__wbg_set_cameracontrolupdateevent_spinSpeed(this.__wbg_ptr, !isLikeNone(arg0), isLikeNone(arg0) ? 0 : arg0);
    }
    /**
     * Duration (in milliseconds) for translation inertia animation.
     *
     * Default: `500.0`
     * @param {number | null} [arg0]
     */
    set translateDuration(arg0) {
        wasm.__wbg_set_cameracontrolupdateevent_translateDuration(this.__wbg_ptr, isLikeNone(arg0) ? Number.MAX_SAFE_INTEGER : Math.fround(arg0));
    }
    /**
     * Duration (in milliseconds) for zoom inertia animation after scroll wheel input.
     *
     * Default: `100.0`
     * @param {number | null} [arg0]
     */
    set zoomDuration(arg0) {
        wasm.__wbg_set_cameracontrolupdateevent_zoomDuration(this.__wbg_ptr, isLikeNone(arg0) ? Number.MAX_SAFE_INTEGER : Math.fround(arg0));
    }
    /**
     * Multiplier for scroll wheel zoom speed.
     *
     * Default: `0.6`
     * @param {number | null} [arg0]
     */
    set zoomSpeed(arg0) {
        wasm.__wbg_set_cameracontrolupdateevent_zoomSpeed(this.__wbg_ptr, !isLikeNone(arg0), isLikeNone(arg0) ? 0 : arg0);
    }
}
if (Symbol.dispose) CameraControlUpdateEvent.prototype[Symbol.dispose] = CameraControlUpdateEvent.prototype.free;

/**
 * @enum {0 | 1 | 2 | 3 | 4 | 5}
 */
export const CameraDirection = Object.freeze({
    Forward: 0, "0": "Forward",
    Backward: 1, "1": "Backward",
    Left: 2, "2": "Left",
    Right: 3, "3": "Right",
    Up: 4, "4": "Up",
    Down: 5, "5": "Down",
});

/**
 * Terminal record of a `flyTo` flight, delivered once through the event
 * stream. `completed` is `false` when the flight was superseded or canceled.
 */
export class CameraFlightEndedEvent {
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        CameraFlightEndedEventFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_cameraflightendedevent_free(ptr, 0);
    }
    /**
     * @returns {boolean}
     */
    get completed() {
        const ret = wasm.__wbg_get_cameraflightendedevent_completed(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * @returns {number}
     */
    get id() {
        const ret = wasm.__wbg_get_cameraflightendedevent_id(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @param {boolean} arg0
     */
    set completed(arg0) {
        wasm.__wbg_set_cameraflightendedevent_completed(this.__wbg_ptr, arg0);
    }
    /**
     * @param {number} arg0
     */
    set id(arg0) {
        wasm.__wbg_set_cameraflightendedevent_id(this.__wbg_ptr, arg0);
    }
}
if (Symbol.dispose) CameraFlightEndedEvent.prototype[Symbol.dispose] = CameraFlightEndedEvent.prototype.free;

export class CameraFrustum {
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        CameraFrustumFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_camerafrustum_free(ptr, 0);
    }
    /**
     * @param {number} near
     * @param {number} far
     * @param {number} fov
     * @param {number} aspect_ratio
     */
    constructor(near, far, fov, aspect_ratio) {
        const ret = wasm.camerafrustum_new(near, far, fov, aspect_ratio);
        this.__wbg_ptr = ret;
        CameraFrustumFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * @returns {number}
     */
    get aspect_ratio() {
        const ret = wasm.__wbg_get_camerafrustum_aspect_ratio(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number}
     */
    get far() {
        const ret = wasm.__wbg_get_camerafrustum_far(this.__wbg_ptr);
        return ret;
    }
    /**
     * Vertical field of view in radians.
     * @returns {number}
     */
    get fov() {
        const ret = wasm.__wbg_get_camerafrustum_fov(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number}
     */
    get near() {
        const ret = wasm.__wbg_get_camerafrustum_near(this.__wbg_ptr);
        return ret;
    }
    /**
     * @param {number} arg0
     */
    set aspect_ratio(arg0) {
        wasm.__wbg_set_camerafrustum_aspect_ratio(this.__wbg_ptr, arg0);
    }
    /**
     * @param {number} arg0
     */
    set far(arg0) {
        wasm.__wbg_set_camerafrustum_far(this.__wbg_ptr, arg0);
    }
    /**
     * Vertical field of view in radians.
     * @param {number} arg0
     */
    set fov(arg0) {
        wasm.__wbg_set_camerafrustum_fov(this.__wbg_ptr, arg0);
    }
    /**
     * @param {number} arg0
     */
    set near(arg0) {
        wasm.__wbg_set_camerafrustum_near(this.__wbg_ptr, arg0);
    }
}
if (Symbol.dispose) CameraFrustum.prototype[Symbol.dispose] = CameraFrustum.prototype.free;

export class CameraOrientation {
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        CameraOrientationFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_cameraorientation_free(ptr, 0);
    }
    /**
     * @returns {number}
     */
    get heading() {
        const ret = wasm.__wbg_get_cameraorientation_heading(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number}
     */
    get pitch() {
        const ret = wasm.__wbg_get_cameraorientation_pitch(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number}
     */
    get roll() {
        const ret = wasm.__wbg_get_cameraorientation_roll(this.__wbg_ptr);
        return ret;
    }
    /**
     * @param {number} arg0
     */
    set heading(arg0) {
        wasm.__wbg_set_cameraorientation_heading(this.__wbg_ptr, arg0);
    }
    /**
     * @param {number} arg0
     */
    set pitch(arg0) {
        wasm.__wbg_set_cameraorientation_pitch(this.__wbg_ptr, arg0);
    }
    /**
     * @param {number} arg0
     */
    set roll(arg0) {
        wasm.__wbg_set_cameraorientation_roll(this.__wbg_ptr, arg0);
    }
}
if (Symbol.dispose) CameraOrientation.prototype[Symbol.dispose] = CameraOrientation.prototype.free;

export class CameraStatus {
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        CameraStatusFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_camerastatus_free(ptr, 0);
    }
    /**
     * @returns {any[]}
     */
    get status() {
        const ret = wasm.__wbg_get_camerastatus_status(this.__wbg_ptr);
        var v1 = getArrayJsValueFromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v1;
    }
    /**
     * @param {any[]} arg0
     */
    set status(arg0) {
        const ptr0 = passArrayJsValueToWasm0(arg0, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_camerastatus_status(this.__wbg_ptr, ptr0, len0);
    }
}
if (Symbol.dispose) CameraStatus.prototype[Symbol.dispose] = CameraStatus.prototype.free;

/**
 * @enum {0 | 1 | 2 | 3 | 4 | 5}
 */
export const CameraStatusType = Object.freeze({
    Change: 0, "0": "Change",
    LookAt: 1, "1": "LookAt",
    Rotate: 2, "2": "Rotate",
    MoveStart: 3, "3": "MoveStart",
    Moving: 4, "4": "Moving",
    MoveEnd: 5, "5": "MoveEnd",
});

export class CompiledExpression {
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        CompiledExpressionFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_compiledexpression_free(ptr, 0);
    }
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
     * @param {any} properties_json
     * @param {number} zoom
     * @param {string | null} [geometry_type]
     * @returns {any}
     */
    evaluate(properties_json, zoom, geometry_type) {
        var ptr0 = isLikeNone(geometry_type) ? 0 : passStringToWasm0(geometry_type, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        const ret = wasm.compiledexpression_evaluate(this.__wbg_ptr, properties_json, zoom, ptr0, len0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return takeFromExternrefTable0(ret[0]);
    }
    /**
     * Extract all feature property names accessed by this expression.
     * Returns a JavaScript array of property name strings.
     * This allows filtering properties before evaluation to reduce serialization overhead.
     * @returns {Array<any>}
     */
    getRequiredProperties() {
        const ret = wasm.compiledexpression_getRequiredProperties(this.__wbg_ptr);
        return ret;
    }
    /**
     * Compile a MapLibre expression from JSON with optional expected type
     *
     * # Arguments
     * * `expr_json` - Expression array (e.g., ["get", "name"])
     * * `expected_type` - Optional expected type string: "color", "number", "boolean", "string", "array"
     *
     * Type checking ensures expressions return the correct type for their property,
     * matching JsStyleEngine's behavior with createExpression(expr, spec).
     * @param {any} expr_json
     * @param {string | null} [expected_type]
     */
    constructor(expr_json, expected_type) {
        var ptr0 = isLikeNone(expected_type) ? 0 : passStringToWasm0(expected_type, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        const ret = wasm.compiledexpression_new(expr_json, ptr0, len0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        this.__wbg_ptr = ret[0];
        CompiledExpressionFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
}
if (Symbol.dispose) CompiledExpression.prototype[Symbol.dispose] = CompiledExpression.prototype.free;

export class CompiledFilter {
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        CompiledFilterFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_compiledfilter_free(ptr, 0);
    }
    /**
     * Compile a MapLibre filter from JSON
     * filter_json: Filter expression (e.g., ["==", ["get", "type"], "park"])
     * @param {any} filter_json
     */
    constructor(filter_json) {
        const ret = wasm.compiledfilter_new(filter_json);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        this.__wbg_ptr = ret[0];
        CompiledFilterFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * Test if feature matches filter
     *
     * # Arguments
     * * `properties_json` - Feature properties as JSON object
     * * `zoom` - Current zoom level
     * * `geometry_type` - Optional geometry type string (e.g., "Point", "Polygon")
     * @param {any} properties_json
     * @param {number} zoom
     * @param {string | null} [geometry_type]
     * @returns {boolean}
     */
    test(properties_json, zoom, geometry_type) {
        var ptr0 = isLikeNone(geometry_type) ? 0 : passStringToWasm0(geometry_type, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        const ret = wasm.compiledfilter_test(this.__wbg_ptr, properties_json, zoom, ptr0, len0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return ret[0] !== 0;
    }
}
if (Symbol.dispose) CompiledFilter.prototype[Symbol.dispose] = CompiledFilter.prototype.free;

export class ConstructedPolygonGeometry {
    static __wrap(ptr) {
        const obj = Object.create(ConstructedPolygonGeometry.prototype);
        obj.__wbg_ptr = ptr;
        ConstructedPolygonGeometryFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        ConstructedPolygonGeometryFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_constructedpolygongeometry_free(ptr, 0);
    }
    /**
     * @returns {Float32Array | undefined}
     */
    batch_id() {
        const ret = wasm.constructedpolygongeometry_batch_id(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number | undefined}
     */
    batch_id_size() {
        const ret = wasm.constructedpolygongeometry_batch_id_size(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret;
    }
    /**
     * @returns {Uint32Array | undefined}
     */
    batch_index() {
        const ret = wasm.constructedpolygongeometry_batch_index(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number | undefined}
     */
    batch_index_size() {
        const ret = wasm.constructedpolygongeometry_batch_index_size(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret;
    }
    /**
     * @returns {Uint32Array}
     */
    indices() {
        const ret = wasm.constructedpolygongeometry_indices(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {Float32Array | undefined}
     */
    normal() {
        const ret = wasm.constructedpolygongeometry_normal(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number | undefined}
     */
    normal_size() {
        const ret = wasm.constructedpolygongeometry_normal_size(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret;
    }
    /**
     * @returns {ConstructedPolygonOutlineGeometry | undefined}
     */
    outline() {
        const ret = wasm.constructedpolygongeometry_outline(this.__wbg_ptr);
        return ret === 0 ? undefined : ConstructedPolygonOutlineGeometry.__wrap(ret);
    }
    /**
     * @returns {Float32Array | undefined}
     */
    position() {
        const ret = wasm.constructedpolygongeometry_position(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {Float32Array | undefined}
     */
    position_3d_high() {
        const ret = wasm.constructedpolygongeometry_position_3d_high(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number | undefined}
     */
    position_3d_high_size() {
        const ret = wasm.constructedpolygongeometry_position_3d_high_size(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret;
    }
    /**
     * @returns {Float32Array | undefined}
     */
    position_3d_low() {
        const ret = wasm.constructedpolygongeometry_position_3d_low(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number | undefined}
     */
    position_3d_low_size() {
        const ret = wasm.constructedpolygongeometry_position_3d_low_size(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret;
    }
    /**
     * @returns {number | undefined}
     */
    position_size() {
        const ret = wasm.constructedpolygongeometry_position_size(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret;
    }
    /**
     * @returns {Float32Array | undefined}
     */
    scale_normal_and_cap() {
        const ret = wasm.constructedpolygongeometry_scale_normal_and_cap(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number | undefined}
     */
    scale_normal_and_cap_size() {
        const ret = wasm.constructedpolygongeometry_scale_normal_and_cap_size(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret;
    }
    /**
     * @returns {ExtentRadianF32 | undefined}
     */
    get extent() {
        const ret = wasm.__wbg_get_constructedpolygongeometry_extent(this.__wbg_ptr);
        return ret === 0 ? undefined : ExtentRadianF32.__wrap(ret);
    }
    /**
     * RTC (Relative-To-Center) translation vector
     * Contains the tile center in world-space ECEF coordinates
     * Used to position the mesh while keeping vertex positions in local space
     * @returns {Vec3 | undefined}
     */
    get rtc_translation() {
        const ret = wasm.__wbg_get_constructedpolygongeometry_rtc_translation(this.__wbg_ptr);
        return ret === 0 ? undefined : Vec3.__wrap(ret);
    }
    /**
     * @param {ExtentRadianF32 | null} [arg0]
     */
    set extent(arg0) {
        let ptr0 = 0;
        if (!isLikeNone(arg0)) {
            _assertClass(arg0, ExtentRadianF32);
            ptr0 = arg0.__destroy_into_raw();
        }
        wasm.__wbg_set_constructedpolygongeometry_extent(this.__wbg_ptr, ptr0);
    }
    /**
     * RTC (Relative-To-Center) translation vector
     * Contains the tile center in world-space ECEF coordinates
     * Used to position the mesh while keeping vertex positions in local space
     * @param {Vec3 | null} [arg0]
     */
    set rtc_translation(arg0) {
        let ptr0 = 0;
        if (!isLikeNone(arg0)) {
            _assertClass(arg0, Vec3);
            ptr0 = arg0.__destroy_into_raw();
        }
        wasm.__wbg_set_constructedpolygongeometry_rtc_translation(this.__wbg_ptr, ptr0);
    }
}
if (Symbol.dispose) ConstructedPolygonGeometry.prototype[Symbol.dispose] = ConstructedPolygonGeometry.prototype.free;

export class ConstructedPolygonOutlineGeometry {
    static __wrap(ptr) {
        const obj = Object.create(ConstructedPolygonOutlineGeometry.prototype);
        obj.__wbg_ptr = ptr;
        ConstructedPolygonOutlineGeometryFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        ConstructedPolygonOutlineGeometryFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_constructedpolygonoutlinegeometry_free(ptr, 0);
    }
    /**
     * @returns {Float32Array | undefined}
     */
    batch_index() {
        const ret = wasm.constructedpolygonoutlinegeometry_batch_index(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number | undefined}
     */
    batch_index_size() {
        const ret = wasm.constructedpolygonoutlinegeometry_batch_index_size(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret;
    }
    /**
     * @returns {Float32Array}
     */
    position() {
        const ret = wasm.constructedpolygonoutlinegeometry_position(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {Float32Array | undefined}
     */
    position_3d_high() {
        const ret = wasm.constructedpolygonoutlinegeometry_position_3d_high(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number | undefined}
     */
    position_3d_high_size() {
        const ret = wasm.constructedpolygonoutlinegeometry_position_3d_high_size(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret;
    }
    /**
     * @returns {Float32Array | undefined}
     */
    position_3d_low() {
        const ret = wasm.constructedpolygonoutlinegeometry_position_3d_low(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number | undefined}
     */
    position_3d_low_size() {
        const ret = wasm.constructedpolygonoutlinegeometry_position_3d_low_size(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret;
    }
    /**
     * @returns {number}
     */
    position_size() {
        const ret = wasm.constructedpolygonoutlinegeometry_position_size(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {Float32Array}
     */
    scale_normal_and_cap() {
        const ret = wasm.constructedpolygonoutlinegeometry_scale_normal_and_cap(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number}
     */
    scale_normal_and_cap_size() {
        const ret = wasm.constructedpolygonoutlinegeometry_scale_normal_and_cap_size(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {Uint32Array}
     */
    skip_indices() {
        const ret = wasm.constructedpolygonoutlinegeometry_skip_indices(this.__wbg_ptr);
        return ret;
    }
}
if (Symbol.dispose) ConstructedPolygonOutlineGeometry.prototype[Symbol.dispose] = ConstructedPolygonOutlineGeometry.prototype.free;

export class ConstructedPolylineGeometry {
    static __wrap(ptr) {
        const obj = Object.create(ConstructedPolylineGeometry.prototype);
        obj.__wbg_ptr = ptr;
        ConstructedPolylineGeometryFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        ConstructedPolylineGeometryFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_constructedpolylinegeometry_free(ptr, 0);
    }
    /**
     * @returns {Float32Array | undefined}
     */
    batch_id() {
        const ret = wasm.constructedpolylinegeometry_batch_id(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number | undefined}
     */
    batch_id_size() {
        const ret = wasm.constructedpolylinegeometry_batch_id_size(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret;
    }
    /**
     * @returns {Uint32Array | undefined}
     */
    batch_index() {
        const ret = wasm.constructedpolylinegeometry_batch_index(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number | undefined}
     */
    batch_index_size() {
        const ret = wasm.constructedpolylinegeometry_batch_index_size(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret;
    }
    /**
     * @returns {Float32Array | undefined}
     */
    end_high() {
        const ret = wasm.constructedpolylinegeometry_end_high(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number | undefined}
     */
    end_high_size() {
        const ret = wasm.constructedpolylinegeometry_end_high_size(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret;
    }
    /**
     * @returns {Float32Array | undefined}
     */
    end_low() {
        const ret = wasm.constructedpolylinegeometry_end_low(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number | undefined}
     */
    end_low_size() {
        const ret = wasm.constructedpolylinegeometry_end_low_size(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret;
    }
    /**
     * @returns {Float32Array | undefined}
     */
    end_normal_and_texture_coordinate_normalization_x() {
        const ret = wasm.constructedpolylinegeometry_end_normal_and_texture_coordinate_normalization_x(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number | undefined}
     */
    end_normal_and_texture_coordinate_normalization_x_size() {
        const ret = wasm.constructedpolylinegeometry_end_normal_and_texture_coordinate_normalization_x_size(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret;
    }
    /**
     * @returns {ExtentRadianF32 | undefined}
     */
    get extent() {
        const ret = wasm.constructedpolylinegeometry_extent(this.__wbg_ptr);
        return ret === 0 ? undefined : ExtentRadianF32.__wrap(ret);
    }
    /**
     * @returns {Float32Array | undefined}
     */
    forward_offset() {
        const ret = wasm.constructedpolylinegeometry_forward_offset(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number | undefined}
     */
    forward_offset_size() {
        const ret = wasm.constructedpolylinegeometry_forward_offset_size(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret;
    }
    /**
     * @returns {Uint32Array}
     */
    indices() {
        const ret = wasm.constructedpolylinegeometry_indices(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {Float32Array}
     */
    position() {
        const ret = wasm.constructedpolylinegeometry_position(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {Float32Array | undefined}
     */
    position_high() {
        const ret = wasm.constructedpolylinegeometry_position_high(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number | undefined}
     */
    position_high_size() {
        const ret = wasm.constructedpolylinegeometry_position_high_size(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret;
    }
    /**
     * @returns {Float32Array | undefined}
     */
    position_low() {
        const ret = wasm.constructedpolylinegeometry_position_low(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number | undefined}
     */
    position_low_size() {
        const ret = wasm.constructedpolylinegeometry_position_low_size(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret;
    }
    /**
     * @returns {number}
     */
    position_size() {
        const ret = wasm.constructedpolylinegeometry_position_size(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {Float32Array}
     */
    right_normal_and_texture_coordinate_normalization_y() {
        const ret = wasm.constructedpolylinegeometry_right_normal_and_texture_coordinate_normalization_y(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number}
     */
    right_normal_and_texture_coordinate_normalization_y_size() {
        const ret = wasm.constructedpolylinegeometry_right_normal_and_texture_coordinate_normalization_y_size(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {Float32Array | undefined}
     */
    start() {
        const ret = wasm.constructedpolylinegeometry_start(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {Float32Array | undefined}
     */
    start_high() {
        const ret = wasm.constructedpolylinegeometry_start_high(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number | undefined}
     */
    start_high_size() {
        const ret = wasm.constructedpolylinegeometry_start_high_size(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret;
    }
    /**
     * @returns {Float32Array | undefined}
     */
    start_low() {
        const ret = wasm.constructedpolylinegeometry_start_low(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number | undefined}
     */
    start_low_size() {
        const ret = wasm.constructedpolylinegeometry_start_low_size(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret;
    }
    /**
     * @returns {Float32Array | undefined}
     */
    start_normals() {
        const ret = wasm.constructedpolylinegeometry_start_normals(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number | undefined}
     */
    start_normals_size() {
        const ret = wasm.constructedpolylinegeometry_start_normals_size(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret;
    }
    /**
     * @returns {number | undefined}
     */
    start_size() {
        const ret = wasm.constructedpolylinegeometry_start_size(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret;
    }
}
if (Symbol.dispose) ConstructedPolylineGeometry.prototype[Symbol.dispose] = ConstructedPolylineGeometry.prototype.free;

/**
 * Maps a 3D Tiles feature table semantic (`POSITION`, `RGB`, ...) to its
 * Draco unique attribute id.
 */
export class DracoAttributeId {
    static __wrap(ptr) {
        const obj = Object.create(DracoAttributeId.prototype);
        obj.__wbg_ptr = ptr;
        DracoAttributeIdFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    static __unwrap(jsValue) {
        if (!(jsValue instanceof DracoAttributeId)) {
            return 0;
        }
        return jsValue.__destroy_into_raw();
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        DracoAttributeIdFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_dracoattributeid_free(ptr, 0);
    }
    /**
     * @returns {string}
     */
    get semantic() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.__wbg_get_dracoattributeid_semantic(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * @returns {number}
     */
    get uniqueId() {
        const ret = wasm.__wbg_get_dracoattributeid_uniqueId(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @param {string} arg0
     */
    set semantic(arg0) {
        const ptr0 = passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_dracoattributeid_semantic(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @param {number} arg0
     */
    set uniqueId(arg0) {
        wasm.__wbg_set_dracoattributeid_uniqueId(this.__wbg_ptr, arg0);
    }
}
if (Symbol.dispose) DracoAttributeId.prototype[Symbol.dispose] = DracoAttributeId.prototype.free;

export class ElevationDecoder {
    static __wrap(ptr) {
        const obj = Object.create(ElevationDecoder.prototype);
        obj.__wbg_ptr = ptr;
        ElevationDecoderFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        ElevationDecoderFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_elevationdecoder_free(ptr, 0);
    }
    /**
     * @returns {ElevationDecoder}
     */
    static japanGSI() {
        const ret = wasm.elevationdecoder_japanGSI();
        return ElevationDecoder.__wrap(ret);
    }
    /**
     * @returns {ElevationDecoder}
     */
    static mapbox() {
        const ret = wasm.elevationdecoder_mapbox();
        return ElevationDecoder.__wrap(ret);
    }
    /**
     * @param {number} r_scaler
     * @param {number} g_scaler
     * @param {number} b_scaler
     * @param {number} offset
     * @param {number} max_offset
     * @param {number} min_offset
     * @param {number} boundary
     * @param {number} epsilon
     */
    constructor(r_scaler, g_scaler, b_scaler, offset, max_offset, min_offset, boundary, epsilon) {
        const ret = wasm.elevationdecoder_new(r_scaler, g_scaler, b_scaler, offset, max_offset, min_offset, boundary, epsilon);
        this.__wbg_ptr = ret;
        ElevationDecoderFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * @returns {ElevationDecoder}
     */
    static terrarium() {
        const ret = wasm.elevationdecoder_terrarium();
        return ElevationDecoder.__wrap(ret);
    }
    /**
     * @returns {number}
     */
    get b_scaler() {
        const ret = wasm.__wbg_get_elevationdecoder_b_scaler(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number}
     */
    get boundary() {
        const ret = wasm.__wbg_get_elevationdecoder_boundary(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number}
     */
    get epsilon() {
        const ret = wasm.__wbg_get_elevationdecoder_epsilon(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number}
     */
    get g_scaler() {
        const ret = wasm.__wbg_get_elevationdecoder_g_scaler(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number}
     */
    get max_offset() {
        const ret = wasm.__wbg_get_elevationdecoder_max_offset(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number}
     */
    get min_offset() {
        const ret = wasm.__wbg_get_elevationdecoder_min_offset(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number}
     */
    get offset() {
        const ret = wasm.__wbg_get_elevationdecoder_offset(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number}
     */
    get r_scaler() {
        const ret = wasm.__wbg_get_elevationdecoder_r_scaler(this.__wbg_ptr);
        return ret;
    }
    /**
     * @param {number} arg0
     */
    set b_scaler(arg0) {
        wasm.__wbg_set_elevationdecoder_b_scaler(this.__wbg_ptr, arg0);
    }
    /**
     * @param {number} arg0
     */
    set boundary(arg0) {
        wasm.__wbg_set_elevationdecoder_boundary(this.__wbg_ptr, arg0);
    }
    /**
     * @param {number} arg0
     */
    set epsilon(arg0) {
        wasm.__wbg_set_elevationdecoder_epsilon(this.__wbg_ptr, arg0);
    }
    /**
     * @param {number} arg0
     */
    set g_scaler(arg0) {
        wasm.__wbg_set_elevationdecoder_g_scaler(this.__wbg_ptr, arg0);
    }
    /**
     * @param {number} arg0
     */
    set max_offset(arg0) {
        wasm.__wbg_set_elevationdecoder_max_offset(this.__wbg_ptr, arg0);
    }
    /**
     * @param {number} arg0
     */
    set min_offset(arg0) {
        wasm.__wbg_set_elevationdecoder_min_offset(this.__wbg_ptr, arg0);
    }
    /**
     * @param {number} arg0
     */
    set offset(arg0) {
        wasm.__wbg_set_elevationdecoder_offset(this.__wbg_ptr, arg0);
    }
    /**
     * @param {number} arg0
     */
    set r_scaler(arg0) {
        wasm.__wbg_set_elevationdecoder_r_scaler(this.__wbg_ptr, arg0);
    }
}
if (Symbol.dispose) ElevationDecoder.prototype[Symbol.dispose] = ElevationDecoder.prototype.free;

/**
 * Elevation-heatmap render options for a `raster` layer. The elevation decoder
 * is taken from the referenced `raster-dem` source, not from here.
 */
export class ElevationHeatmapMaterial {
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        ElevationHeatmapMaterialFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_elevationheatmapmaterial_free(ptr, 0);
    }
    /**
     * @returns {number | undefined}
     */
    get logBoundary() {
        const ret = wasm.__wbg_get_elevationheatmapmaterial_logBoundary(this.__wbg_ptr);
        return ret[0] === 0 ? undefined : ret[1];
    }
    /**
     * @returns {boolean | undefined}
     */
    get logarithmic() {
        const ret = wasm.__wbg_get_elevationheatmapmaterial_logarithmic(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret !== 0;
    }
    /**
     * @returns {number | undefined}
     */
    get maxHeight() {
        const ret = wasm.__wbg_get_elevationheatmapmaterial_maxHeight(this.__wbg_ptr);
        return ret[0] === 0 ? undefined : ret[1];
    }
    /**
     * @returns {number | undefined}
     */
    get minHeight() {
        const ret = wasm.__wbg_get_elevationheatmapmaterial_minHeight(this.__wbg_ptr);
        return ret[0] === 0 ? undefined : ret[1];
    }
    /**
     * @param {number | null} [arg0]
     */
    set logBoundary(arg0) {
        wasm.__wbg_set_elevationheatmapmaterial_logBoundary(this.__wbg_ptr, !isLikeNone(arg0), isLikeNone(arg0) ? 0 : arg0);
    }
    /**
     * @param {boolean | null} [arg0]
     */
    set logarithmic(arg0) {
        wasm.__wbg_set_elevationheatmapmaterial_logarithmic(this.__wbg_ptr, isLikeNone(arg0) ? 0xFFFFFF : arg0 ? 1 : 0);
    }
    /**
     * @param {number | null} [arg0]
     */
    set maxHeight(arg0) {
        wasm.__wbg_set_elevationheatmapmaterial_maxHeight(this.__wbg_ptr, !isLikeNone(arg0), isLikeNone(arg0) ? 0 : arg0);
    }
    /**
     * @param {number | null} [arg0]
     */
    set minHeight(arg0) {
        wasm.__wbg_set_elevationheatmapmaterial_minHeight(this.__wbg_ptr, !isLikeNone(arg0), isLikeNone(arg0) ? 0 : arg0);
    }
}
if (Symbol.dispose) ElevationHeatmapMaterial.prototype[Symbol.dispose] = ElevationHeatmapMaterial.prototype.free;

export class EllipsoidGeodesic {
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        EllipsoidGeodesicFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_ellipsoidgeodesic_free(ptr, 0);
    }
    /**
     * @param {number} distance
     * @returns {LLE}
     */
    interpolateDistance(distance) {
        const ret = wasm.ellipsoidgeodesic_interpolateDistance(this.__wbg_ptr, distance);
        return LLE.__wrap(ret);
    }
    /**
     * @param {number | null} [granularity]
     * @returns {LLE[]}
     */
    interpolateGeodeticPoints(granularity) {
        const ret = wasm.ellipsoidgeodesic_interpolateGeodeticPoints(this.__wbg_ptr, !isLikeNone(granularity), isLikeNone(granularity) ? 0 : granularity);
        var v1 = getArrayJsValueFromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v1;
    }
    /**
     * @param {LLE} start
     * @param {LLE} end
     */
    constructor(start, end) {
        _assertClass(start, LLE);
        var ptr0 = start.__destroy_into_raw();
        _assertClass(end, LLE);
        var ptr1 = end.__destroy_into_raw();
        const ret = wasm.ellipsoidgeodesic_new(ptr0, ptr1);
        this.__wbg_ptr = ret;
        EllipsoidGeodesicFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * Whether Vincenty's inverse iteration converged. `false` for
     * near-antipodal endpoints, where `distance` is only a rough estimate
     * and interpolation snaps to the endpoints instead of following the
     * (unreliable) capped solution.
     * @returns {boolean}
     */
    get converged() {
        const ret = wasm.__wbg_get_ellipsoidgeodesic_converged(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * @returns {number}
     */
    get distance() {
        const ret = wasm.__wbg_get_ellipsoidgeodesic_distance(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number}
     */
    get end_heading() {
        const ret = wasm.__wbg_get_ellipsoidgeodesic_end_heading(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {LLE}
     */
    get end() {
        const ret = wasm.__wbg_get_ellipsoidgeodesic_end(this.__wbg_ptr);
        return LLE.__wrap(ret);
    }
    /**
     * @returns {number}
     */
    get start_heading() {
        const ret = wasm.__wbg_get_ellipsoidgeodesic_start_heading(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {LLE}
     */
    get start() {
        const ret = wasm.__wbg_get_ellipsoidgeodesic_start(this.__wbg_ptr);
        return LLE.__wrap(ret);
    }
    /**
     * Whether Vincenty's inverse iteration converged. `false` for
     * near-antipodal endpoints, where `distance` is only a rough estimate
     * and interpolation snaps to the endpoints instead of following the
     * (unreliable) capped solution.
     * @param {boolean} arg0
     */
    set converged(arg0) {
        wasm.__wbg_set_ellipsoidgeodesic_converged(this.__wbg_ptr, arg0);
    }
    /**
     * @param {number} arg0
     */
    set distance(arg0) {
        wasm.__wbg_set_ellipsoidgeodesic_distance(this.__wbg_ptr, arg0);
    }
    /**
     * @param {number} arg0
     */
    set end_heading(arg0) {
        wasm.__wbg_set_ellipsoidgeodesic_end_heading(this.__wbg_ptr, arg0);
    }
    /**
     * @param {LLE} arg0
     */
    set end(arg0) {
        _assertClass(arg0, LLE);
        var ptr0 = arg0.__destroy_into_raw();
        wasm.__wbg_set_ellipsoidgeodesic_end(this.__wbg_ptr, ptr0);
    }
    /**
     * @param {number} arg0
     */
    set start_heading(arg0) {
        wasm.__wbg_set_ellipsoidgeodesic_start_heading(this.__wbg_ptr, arg0);
    }
    /**
     * @param {LLE} arg0
     */
    set start(arg0) {
        _assertClass(arg0, LLE);
        var ptr0 = arg0.__destroy_into_raw();
        wasm.__wbg_set_ellipsoidgeodesic_start(this.__wbg_ptr, ptr0);
    }
}
if (Symbol.dispose) EllipsoidGeodesic.prototype[Symbol.dispose] = EllipsoidGeodesic.prototype.free;

export class EncodedVec3 {
    static __wrap(ptr) {
        const obj = Object.create(EncodedVec3.prototype);
        obj.__wbg_ptr = ptr;
        EncodedVec3Finalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        EncodedVec3Finalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_encodedvec3_free(ptr, 0);
    }
    /**
     * @param {Vec3} high
     * @param {Vec3} low
     */
    constructor(high, low) {
        _assertClass(high, Vec3);
        var ptr0 = high.__destroy_into_raw();
        _assertClass(low, Vec3);
        var ptr1 = low.__destroy_into_raw();
        const ret = wasm.encodedvec3_new(ptr0, ptr1);
        this.__wbg_ptr = ret;
        EncodedVec3Finalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * @returns {Vec3}
     */
    get high() {
        const ret = wasm.__wbg_get_encodedvec3_high(this.__wbg_ptr);
        return Vec3.__wrap(ret);
    }
    /**
     * @returns {Vec3}
     */
    get low() {
        const ret = wasm.__wbg_get_encodedvec3_low(this.__wbg_ptr);
        return Vec3.__wrap(ret);
    }
    /**
     * @param {Vec3} arg0
     */
    set high(arg0) {
        _assertClass(arg0, Vec3);
        var ptr0 = arg0.__destroy_into_raw();
        wasm.__wbg_set_encodedvec3_high(this.__wbg_ptr, ptr0);
    }
    /**
     * @param {Vec3} arg0
     */
    set low(arg0) {
        _assertClass(arg0, Vec3);
        var ptr0 = arg0.__destroy_into_raw();
        wasm.__wbg_set_encodedvec3_low(this.__wbg_ptr, ptr0);
    }
}
if (Symbol.dispose) EncodedVec3.prototype[Symbol.dispose] = EncodedVec3.prototype.free;

export class ExtentRadianF32 {
    static __wrap(ptr) {
        const obj = Object.create(ExtentRadianF32.prototype);
        obj.__wbg_ptr = ptr;
        ExtentRadianF32Finalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        ExtentRadianF32Finalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_extentradianf32_free(ptr, 0);
    }
    /**
     * @param {number} west
     * @param {number} south
     * @param {number} east
     * @param {number} north
     */
    constructor(west, south, east, north) {
        const ret = wasm.extentradianf32_new(west, south, east, north);
        this.__wbg_ptr = ret;
        ExtentRadianF32Finalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * @returns {number}
     */
    get east() {
        const ret = wasm.__wbg_get_extentradianf32_east(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number}
     */
    get north() {
        const ret = wasm.__wbg_get_extentradianf32_north(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number}
     */
    get south() {
        const ret = wasm.__wbg_get_extentradianf32_south(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number}
     */
    get west() {
        const ret = wasm.__wbg_get_extentradianf32_west(this.__wbg_ptr);
        return ret;
    }
    /**
     * @param {number} arg0
     */
    set east(arg0) {
        wasm.__wbg_set_extentradianf32_east(this.__wbg_ptr, arg0);
    }
    /**
     * @param {number} arg0
     */
    set north(arg0) {
        wasm.__wbg_set_extentradianf32_north(this.__wbg_ptr, arg0);
    }
    /**
     * @param {number} arg0
     */
    set south(arg0) {
        wasm.__wbg_set_extentradianf32_south(this.__wbg_ptr, arg0);
    }
    /**
     * @param {number} arg0
     */
    set west(arg0) {
        wasm.__wbg_set_extentradianf32_west(this.__wbg_ptr, arg0);
    }
}
if (Symbol.dispose) ExtentRadianF32.prototype[Symbol.dispose] = ExtentRadianF32.prototype.free;

export class FloatAttribute {
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        FloatAttributeFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_floatattribute_free(ptr, 0);
    }
    /**
     * @param {Float32Array} data
     * @param {number} size
     */
    constructor(data, size) {
        const ptr0 = passArrayF32ToWasm0(data, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.floatattribute_new(ptr0, len0, size);
        this.__wbg_ptr = ret;
        FloatAttributeFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * @returns {Float32Array}
     */
    transferData() {
        const ret = wasm.floatattribute_transferData(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number}
     */
    get size() {
        const ret = wasm.__wbg_get_floatattribute_size(this.__wbg_ptr);
        return ret;
    }
    /**
     * @param {number} arg0
     */
    set size(arg0) {
        wasm.__wbg_set_floatattribute_size(this.__wbg_ptr, arg0);
    }
}
if (Symbol.dispose) FloatAttribute.prototype[Symbol.dispose] = FloatAttribute.prototype.free;

export class Geometry {
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        GeometryFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_geometry_free(ptr, 0);
    }
    /**
     * @returns {boolean}
     */
    hasNormals() {
        const ret = wasm.geometry_hasNormals(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * @returns {boolean}
     */
    hasSkirt() {
        const ret = wasm.geometry_hasSkirt(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * @param {Float32Array} vertices
     * @param {Uint32Array} indices
     * @param {Float32Array} uvs
     */
    constructor(vertices, indices, uvs) {
        const ptr0 = passArrayF32ToWasm0(vertices, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passArray32ToWasm0(indices, wasm.__wbindgen_malloc);
        const len1 = WASM_VECTOR_LEN;
        const ptr2 = passArrayF32ToWasm0(uvs, wasm.__wbindgen_malloc);
        const len2 = WASM_VECTOR_LEN;
        const ret = wasm.geometry_new(ptr0, len0, ptr1, len1, ptr2, len2);
        this.__wbg_ptr = ret;
        GeometryFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * @returns {Uint32Array}
     */
    transferIndices() {
        const ret = wasm.geometry_transferIndices(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {Float32Array | undefined}
     */
    transferNormals() {
        const ret = wasm.geometry_transferNormals(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {Uint32Array | undefined}
     */
    transferSkirtIndices() {
        const ret = wasm.geometry_transferSkirtIndices(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {Float32Array | undefined}
     */
    transferSkirtNormals() {
        const ret = wasm.geometry_transferSkirtNormals(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {Float32Array | undefined}
     */
    transferSkirtUvs() {
        const ret = wasm.geometry_transferSkirtUvs(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {Float32Array | undefined}
     */
    transferSkirtVertices() {
        const ret = wasm.geometry_transferSkirtVertices(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {Float32Array}
     */
    transferUvs() {
        const ret = wasm.geometry_transferUvs(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {Float32Array}
     */
    transferVertices() {
        const ret = wasm.geometry_transferVertices(this.__wbg_ptr);
        return ret;
    }
}
if (Symbol.dispose) Geometry.prototype[Symbol.dispose] = Geometry.prototype.free;

/**
 * WASM wrapper for Globe resource.
 *
 * This provides a JavaScript-friendly interface for accessing and modifying
 * globe configuration properties.
 */
export class Globe {
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        GlobeFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_globe_free(ptr, 0);
    }
    /**
     * Base color for the globe surface (RGB as u32).
     * @returns {number}
     */
    get color() {
        const ret = wasm.__wbg_get_globe_color(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * Color map lookup table for elevation heatmap rendering.
     * Flattened RGB array: [r0,g0,b0, r1,g1,b1, ...].
     * @returns {Float32Array}
     */
    get elevationColormap() {
        const ret = wasm.__wbg_get_globe_elevationColormap(this.__wbg_ptr);
        var v1 = getArrayF32FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v1;
    }
    /**
     * Whether to hide underground geometry. Disabling this value might cause unexpected behavior when using effect.
     * @returns {boolean}
     */
    get hideUnderground() {
        const ret = wasm.__wbg_get_globe_hideUnderground(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * Whether the globe tiles with the Geographic scheme (quantized-mesh
     * terrain) rather than the default WebMercator. Engine-set output — the
     * web renderer selects its raster drape pipeline (baked vs direct) from
     * it at tile-mesh creation; ignored on input (the scheme is dictated by
     * the terrain source, not configurable).
     * @returns {boolean}
     */
    get isGeographicTiling() {
        const ret = wasm.__wbg_get_globe_isGeographicTiling(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * Screen-space error threshold for level of detail (LOD) calculations. Initialization only.
     * @returns {number}
     */
    get maxSse() {
        const ret = wasm.__wbg_get_globe_maxSse(this.__wbg_ptr);
        return ret;
    }
    /**
     * Global opacity for materials (0.0 to 1.0).
     * @returns {number}
     */
    get opacity() {
        const ret = wasm.__wbg_get_globe_opacity(this.__wbg_ptr);
        return ret;
    }
    /**
     * Number of segments for mesh tessellation. Initialization only.
     * @returns {number}
     */
    get segments() {
        const ret = wasm.__wbg_get_globe_segments(this.__wbg_ptr);
        return ret;
    }
    /**
     * Whether materials should be transparent.
     * Note that blending works only for resource layer.
     * @returns {boolean}
     */
    get transparent() {
        const ret = wasm.__wbg_get_globe_transparent(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * Whether to use normals. Initialization only.
     * @returns {boolean}
     */
    get useNormal() {
        const ret = wasm.__wbg_get_globe_useNormal(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * Whether to render materials in wireframe mode.
     * @returns {boolean}
     */
    get wireframe() {
        const ret = wasm.__wbg_get_globe_wireframe(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * @param {number} max_sse
     * @param {number} segments
     * @param {number} color
     * @param {boolean} hide_underground
     * @param {boolean} use_normal
     * @param {boolean} transparent
     * @param {number} opacity
     * @param {boolean} wireframe
     * @param {Float32Array} elevation_colormap
     */
    constructor(max_sse, segments, color, hide_underground, use_normal, transparent, opacity, wireframe, elevation_colormap) {
        const ptr0 = passArrayF32ToWasm0(elevation_colormap, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.globe_new(max_sse, segments, color, hide_underground, use_normal, transparent, opacity, wireframe, ptr0, len0);
        this.__wbg_ptr = ret;
        GlobeFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * Base color for the globe surface (RGB as u32).
     * @param {number} arg0
     */
    set color(arg0) {
        wasm.__wbg_set_globe_color(this.__wbg_ptr, arg0);
    }
    /**
     * Color map lookup table for elevation heatmap rendering.
     * Flattened RGB array: [r0,g0,b0, r1,g1,b1, ...].
     * @param {Float32Array} arg0
     */
    set elevationColormap(arg0) {
        const ptr0 = passArrayF32ToWasm0(arg0, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_globe_elevationColormap(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * Whether to hide underground geometry. Disabling this value might cause unexpected behavior when using effect.
     * @param {boolean} arg0
     */
    set hideUnderground(arg0) {
        wasm.__wbg_set_globe_hideUnderground(this.__wbg_ptr, arg0);
    }
    /**
     * Whether the globe tiles with the Geographic scheme (quantized-mesh
     * terrain) rather than the default WebMercator. Engine-set output — the
     * web renderer selects its raster drape pipeline (baked vs direct) from
     * it at tile-mesh creation; ignored on input (the scheme is dictated by
     * the terrain source, not configurable).
     * @param {boolean} arg0
     */
    set isGeographicTiling(arg0) {
        wasm.__wbg_set_globe_isGeographicTiling(this.__wbg_ptr, arg0);
    }
    /**
     * Screen-space error threshold for level of detail (LOD) calculations. Initialization only.
     * @param {number} arg0
     */
    set maxSse(arg0) {
        wasm.__wbg_set_globe_maxSse(this.__wbg_ptr, arg0);
    }
    /**
     * Global opacity for materials (0.0 to 1.0).
     * @param {number} arg0
     */
    set opacity(arg0) {
        wasm.__wbg_set_globe_opacity(this.__wbg_ptr, arg0);
    }
    /**
     * Number of segments for mesh tessellation. Initialization only.
     * @param {number} arg0
     */
    set segments(arg0) {
        wasm.__wbg_set_globe_segments(this.__wbg_ptr, arg0);
    }
    /**
     * Whether materials should be transparent.
     * Note that blending works only for resource layer.
     * @param {boolean} arg0
     */
    set transparent(arg0) {
        wasm.__wbg_set_globe_transparent(this.__wbg_ptr, arg0);
    }
    /**
     * Whether to use normals. Initialization only.
     * @param {boolean} arg0
     */
    set useNormal(arg0) {
        wasm.__wbg_set_globe_useNormal(this.__wbg_ptr, arg0);
    }
    /**
     * Whether to render materials in wireframe mode.
     * @param {boolean} arg0
     */
    set wireframe(arg0) {
        wasm.__wbg_set_globe_wireframe(this.__wbg_ptr, arg0);
    }
}
if (Symbol.dispose) Globe.prototype[Symbol.dispose] = Globe.prototype.free;

/**
 * Hillshade render options for a `raster` layer. The elevation decoder is taken
 * from the referenced `raster-dem` source, not from here.
 */
export class HillshadeMaterial {
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        HillshadeMaterialFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_hillshadematerial_free(ptr, 0);
    }
    /**
     * Exaggeration factor for hillshade effect (default: 1.0)
     * @returns {number | undefined}
     */
    get exaggeration() {
        const ret = wasm.__wbg_get_hillshadematerial_exaggeration(this.__wbg_ptr);
        return ret === Number.MAX_SAFE_INTEGER ? undefined : ret;
    }
    /**
     * Exaggeration factor for hillshade effect (default: 1.0)
     * @param {number | null} [arg0]
     */
    set exaggeration(arg0) {
        wasm.__wbg_set_hillshadematerial_exaggeration(this.__wbg_ptr, isLikeNone(arg0) ? Number.MAX_SAFE_INTEGER : Math.fround(arg0));
    }
}
if (Symbol.dispose) HillshadeMaterial.prototype[Symbol.dispose] = HillshadeMaterial.prototype.free;

export class LLE {
    static __wrap(ptr) {
        const obj = Object.create(LLE.prototype);
        obj.__wbg_ptr = ptr;
        LLEFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        LLEFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_lle_free(ptr, 0);
    }
    /**
     * @returns {number}
     */
    get height() {
        const ret = wasm.__wbg_get_lle_height(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number}
     */
    get lat() {
        const ret = wasm.__wbg_get_lle_lat(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number}
     */
    get lng() {
        const ret = wasm.__wbg_get_lle_lng(this.__wbg_ptr);
        return ret;
    }
    /**
     * @param {number} lat
     * @param {number} lng
     * @param {number} height
     */
    constructor(lat, lng, height) {
        const ret = wasm.lle_new(lat, lng, height);
        this.__wbg_ptr = ret;
        LLEFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * @param {number} arg0
     */
    set height(arg0) {
        wasm.__wbg_set_lle_height(this.__wbg_ptr, arg0);
    }
    /**
     * @param {number} arg0
     */
    set lat(arg0) {
        wasm.__wbg_set_lle_lat(this.__wbg_ptr, arg0);
    }
    /**
     * @param {number} arg0
     */
    set lng(arg0) {
        wasm.__wbg_set_lle_lng(this.__wbg_ptr, arg0);
    }
}
if (Symbol.dispose) LLE.prototype[Symbol.dispose] = LLE.prototype.free;

export class ModelInternalMaterial {
    static __wrap(ptr) {
        const obj = Object.create(ModelInternalMaterial.prototype);
        obj.__wbg_ptr = ptr;
        ModelInternalMaterialFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        ModelInternalMaterialFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_modelinternalmaterial_free(ptr, 0);
    }
    /**
     * @returns {DracoAttributeId[] | undefined}
     */
    get dracoAttributes() {
        const ret = wasm.__wbg_get_modelinternalmaterial_dracoAttributes(this.__wbg_ptr);
        let v1;
        if (ret[0] !== 0) {
            v1 = getArrayJsValueFromWasm0(ret[0], ret[1]).slice();
            wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        }
        return v1;
    }
    /**
     * @returns {Vec3}
     */
    get pointCloudGeodeticNormal() {
        const ret = wasm.__wbg_get_modelinternalmaterial_pointCloudGeodeticNormal(this.__wbg_ptr);
        return Vec3.__wrap(ret);
    }
    /**
     * @returns {boolean}
     */
    get pointCloud() {
        const ret = wasm.__wbg_get_modelinternalmaterial_pointCloud(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * @param {DracoAttributeId[] | null} [arg0]
     */
    set dracoAttributes(arg0) {
        var ptr0 = isLikeNone(arg0) ? 0 : passArrayJsValueToWasm0(arg0, wasm.__wbindgen_malloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_modelinternalmaterial_dracoAttributes(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @param {Vec3} arg0
     */
    set pointCloudGeodeticNormal(arg0) {
        _assertClass(arg0, Vec3);
        var ptr0 = arg0.__destroy_into_raw();
        wasm.__wbg_set_modelinternalmaterial_pointCloudGeodeticNormal(this.__wbg_ptr, ptr0);
    }
    /**
     * @param {boolean} arg0
     */
    set pointCloud(arg0) {
        wasm.__wbg_set_modelinternalmaterial_pointCloud(this.__wbg_ptr, arg0);
    }
}
if (Symbol.dispose) ModelInternalMaterial.prototype[Symbol.dispose] = ModelInternalMaterial.prototype.free;

export class ModelMaterial {
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        ModelMaterialFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_modelmaterial_free(ptr, 0);
    }
    /**
     * @returns {ModelInternalMaterial | undefined}
     */
    get __internal__() {
        const ret = wasm.__wbg_get_modelmaterial___internal__(this.__wbg_ptr);
        return ret === 0 ? undefined : ModelInternalMaterial.__wrap(ret);
    }
    /**
     * @returns {string | undefined}
     */
    get animationActiveClip() {
        const ret = wasm.__wbg_get_modelmaterial_animationActiveClip(this.__wbg_ptr);
        let v1;
        if (ret[0] !== 0) {
            v1 = getStringFromWasm0(ret[0], ret[1]).slice();
            wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        }
        return v1;
    }
    /**
     * @returns {number | undefined}
     */
    get animationSpeed() {
        const ret = wasm.__wbg_get_modelmaterial_animationSpeed(this.__wbg_ptr);
        return ret === Number.MAX_SAFE_INTEGER ? undefined : ret;
    }
    /**
     * @returns {boolean | undefined}
     */
    get applyWaterNormal() {
        const ret = wasm.__wbg_get_modelmaterial_applyWaterNormal(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret !== 0;
    }
    /**
     * @returns {boolean | undefined}
     */
    get castShadow() {
        const ret = wasm.__wbg_get_modelmaterial_castShadow(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret !== 0;
    }
    /**
     * @returns {number | undefined}
     */
    get color() {
        const ret = wasm.__wbg_get_modelmaterial_color(this.__wbg_ptr);
        return ret === Number.MAX_SAFE_INTEGER ? undefined : ret;
    }
    /**
     * Crease angle (in radians) used when `normals` is true. Defaults to 30°
     * (PI/6) when omitted.
     * @returns {number | undefined}
     */
    get creaseNormalAngle() {
        const ret = wasm.__wbg_get_modelmaterial_creaseNormalAngle(this.__wbg_ptr);
        return ret === Number.MAX_SAFE_INTEGER ? undefined : ret;
    }
    /**
     * Enable writing to depth buffer
     * @returns {boolean | undefined}
     */
    get depthWrite() {
        const ret = wasm.__wbg_get_modelmaterial_depthWrite(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret !== 0;
    }
    /**
     * IDs of selective effects to apply (e.g., "bloom", "outline")
     * @returns {string[] | undefined}
     */
    get effectIds() {
        const ret = wasm.__wbg_get_modelmaterial_effectIds(this.__wbg_ptr);
        let v1;
        if (ret[0] !== 0) {
            v1 = getArrayJsValueFromWasm0(ret[0], ret[1]).slice();
            wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        }
        return v1;
    }
    /**
     * Emissive glow color in 0xRRGGBB format
     * @returns {number | undefined}
     */
    get emissiveColor() {
        const ret = wasm.__wbg_get_modelmaterial_emissiveColor(this.__wbg_ptr);
        return ret === Number.MAX_SAFE_INTEGER ? undefined : ret;
    }
    /**
     * Emissive glow intensity (omitted = 0, no emissive output)
     * @returns {number | undefined}
     */
    get emissiveIntensity() {
        const ret = wasm.__wbg_get_modelmaterial_emissiveIntensity(this.__wbg_ptr);
        return ret === Number.MAX_SAFE_INTEGER ? undefined : ret;
    }
    /**
     * @returns {number | undefined}
     */
    get height() {
        const ret = wasm.__wbg_get_modelmaterial_height(this.__wbg_ptr);
        return ret === Number.MAX_SAFE_INTEGER ? undefined : ret;
    }
    /**
     * @returns {number | undefined}
     */
    get ior() {
        const ret = wasm.__wbg_get_modelmaterial_ior(this.__wbg_ptr);
        return ret === Number.MAX_SAFE_INTEGER ? undefined : ret;
    }
    /**
     * Applies the lighting equation to the color output. When `false` the
     * material outputs plain albedo (for deferred lighting) while normals and
     * the shadow G-buffer keep being written.
     * @returns {boolean | undefined}
     */
    get lit() {
        const ret = wasm.__wbg_get_modelmaterial_lit(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret !== 0;
    }
    /**
     * @returns {number | undefined}
     */
    get maxSse() {
        const ret = wasm.__wbg_get_modelmaterial_maxSse(this.__wbg_ptr);
        return ret === Number.MAX_SAFE_INTEGER ? undefined : ret;
    }
    /**
     * @returns {number | undefined}
     */
    get metalness() {
        const ret = wasm.__wbg_get_modelmaterial_metalness(this.__wbg_ptr);
        return ret === Number.MAX_SAFE_INTEGER ? undefined : ret;
    }
    /**
     * When true, recompute vertex normals using a creased-normals algorithm
     * after the model loads. Useful for tiled glTF assets that ship without
     * normals or with low-quality normals.
     * @returns {boolean | undefined}
     */
    get normals() {
        const ret = wasm.__wbg_get_modelmaterial_normals(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret !== 0;
    }
    /**
     * Opacity value
     * @returns {number | undefined}
     */
    get opacity() {
        const ret = wasm.__wbg_get_modelmaterial_opacity(this.__wbg_ptr);
        return ret === Number.MAX_SAFE_INTEGER ? undefined : ret;
    }
    /**
     * @returns {number | undefined}
     */
    get pointSize() {
        const ret = wasm.__wbg_get_modelmaterial_pointSize(this.__wbg_ptr);
        return ret === Number.MAX_SAFE_INTEGER ? undefined : ret;
    }
    /**
     * @returns {boolean | undefined}
     */
    get receiveShadow() {
        const ret = wasm.__wbg_get_modelmaterial_receiveShadow(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret !== 0;
    }
    /**
     * Reflectivity for post-process or env map.
     * @returns {number | undefined}
     */
    get reflectivity() {
        const ret = wasm.__wbg_get_modelmaterial_reflectivity(this.__wbg_ptr);
        return ret === Number.MAX_SAFE_INTEGER ? undefined : ret;
    }
    /**
     * Reflectivity for post-process.
     * @returns {number | undefined}
     */
    get roughness() {
        const ret = wasm.__wbg_get_modelmaterial_roughness(this.__wbg_ptr);
        return ret === Number.MAX_SAFE_INTEGER ? undefined : ret;
    }
    /**
     * @returns {number | undefined}
     */
    get shininess() {
        const ret = wasm.__wbg_get_modelmaterial_shininess(this.__wbg_ptr);
        return ret === Number.MAX_SAFE_INTEGER ? undefined : ret;
    }
    /**
     * @returns {boolean | undefined}
     */
    get shouldRotateInDefault() {
        const ret = wasm.__wbg_get_modelmaterial_shouldRotateInDefault(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret !== 0;
    }
    /**
     * @returns {boolean | undefined}
     */
    get showBoundingBox() {
        const ret = wasm.__wbg_get_modelmaterial_showBoundingBox(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret !== 0;
    }
    /**
     * @returns {boolean | undefined}
     */
    get show() {
        const ret = wasm.__wbg_get_modelmaterial_show(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret !== 0;
    }
    /**
     * @returns {number | undefined}
     */
    get size() {
        const ret = wasm.__wbg_get_modelmaterial_size(this.__wbg_ptr);
        return ret === Number.MAX_SAFE_INTEGER ? undefined : ret;
    }
    /**
     * @returns {number | undefined}
     */
    get specularStrength() {
        const ret = wasm.__wbg_get_modelmaterial_specularStrength(this.__wbg_ptr);
        return ret === Number.MAX_SAFE_INTEGER ? undefined : ret;
    }
    /**
     * Enabling this value allows using `shininess` and `specular_strength`.
     * @returns {boolean | undefined}
     */
    get specular() {
        const ret = wasm.__wbg_get_modelmaterial_specular(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret !== 0;
    }
    /**
     * Enable transparency and alpha blending
     * @returns {boolean | undefined}
     */
    get transparent() {
        const ret = wasm.__wbg_get_modelmaterial_transparent(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret !== 0;
    }
    /**
     * @returns {string | undefined}
     */
    get url() {
        const ret = wasm.__wbg_get_modelmaterial_url(this.__wbg_ptr);
        let v1;
        if (ret[0] !== 0) {
            v1 = getStringFromWasm0(ret[0], ret[1]).slice();
            wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        }
        return v1;
    }
    /**
     * Scale water normal. Decreasing this value will make the water surface rough.
     * @returns {number | undefined}
     */
    get waterScaleNormal() {
        const ret = wasm.__wbg_get_modelmaterial_waterScaleNormal(this.__wbg_ptr);
        return ret === Number.MAX_SAFE_INTEGER ? undefined : ret;
    }
    /**
     * Water wave speed.
     * @returns {number | undefined}
     */
    get waterSpeed() {
        const ret = wasm.__wbg_get_modelmaterial_waterSpeed(this.__wbg_ptr);
        return ret === Number.MAX_SAFE_INTEGER ? undefined : ret;
    }
    /**
     * Apply a water material on the polygon. It might slow down the loading of the mesh.
     * @returns {boolean | undefined}
     */
    get water() {
        const ret = wasm.__wbg_get_modelmaterial_water(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret !== 0;
    }
    /**
     * @param {ModelInternalMaterial | null} [arg0]
     */
    set __internal__(arg0) {
        let ptr0 = 0;
        if (!isLikeNone(arg0)) {
            _assertClass(arg0, ModelInternalMaterial);
            ptr0 = arg0.__destroy_into_raw();
        }
        wasm.__wbg_set_modelmaterial___internal__(this.__wbg_ptr, ptr0);
    }
    /**
     * @param {string | null} [arg0]
     */
    set animationActiveClip(arg0) {
        var ptr0 = isLikeNone(arg0) ? 0 : passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_modelmaterial_animationActiveClip(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @param {number | null} [arg0]
     */
    set animationSpeed(arg0) {
        wasm.__wbg_set_modelmaterial_animationSpeed(this.__wbg_ptr, isLikeNone(arg0) ? Number.MAX_SAFE_INTEGER : Math.fround(arg0));
    }
    /**
     * @param {boolean | null} [arg0]
     */
    set applyWaterNormal(arg0) {
        wasm.__wbg_set_modelmaterial_applyWaterNormal(this.__wbg_ptr, isLikeNone(arg0) ? 0xFFFFFF : arg0 ? 1 : 0);
    }
    /**
     * @param {boolean | null} [arg0]
     */
    set castShadow(arg0) {
        wasm.__wbg_set_modelmaterial_castShadow(this.__wbg_ptr, isLikeNone(arg0) ? 0xFFFFFF : arg0 ? 1 : 0);
    }
    /**
     * @param {number | null} [arg0]
     */
    set color(arg0) {
        wasm.__wbg_set_modelmaterial_color(this.__wbg_ptr, isLikeNone(arg0) ? Number.MAX_SAFE_INTEGER : (arg0) >>> 0);
    }
    /**
     * Crease angle (in radians) used when `normals` is true. Defaults to 30°
     * (PI/6) when omitted.
     * @param {number | null} [arg0]
     */
    set creaseNormalAngle(arg0) {
        wasm.__wbg_set_modelmaterial_creaseNormalAngle(this.__wbg_ptr, isLikeNone(arg0) ? Number.MAX_SAFE_INTEGER : Math.fround(arg0));
    }
    /**
     * Enable writing to depth buffer
     * @param {boolean | null} [arg0]
     */
    set depthWrite(arg0) {
        wasm.__wbg_set_modelmaterial_depthWrite(this.__wbg_ptr, isLikeNone(arg0) ? 0xFFFFFF : arg0 ? 1 : 0);
    }
    /**
     * IDs of selective effects to apply (e.g., "bloom", "outline")
     * @param {string[] | null} [arg0]
     */
    set effectIds(arg0) {
        var ptr0 = isLikeNone(arg0) ? 0 : passArrayJsValueToWasm0(arg0, wasm.__wbindgen_malloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_modelmaterial_effectIds(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * Emissive glow color in 0xRRGGBB format
     * @param {number | null} [arg0]
     */
    set emissiveColor(arg0) {
        wasm.__wbg_set_modelmaterial_emissiveColor(this.__wbg_ptr, isLikeNone(arg0) ? Number.MAX_SAFE_INTEGER : (arg0) >>> 0);
    }
    /**
     * Emissive glow intensity (omitted = 0, no emissive output)
     * @param {number | null} [arg0]
     */
    set emissiveIntensity(arg0) {
        wasm.__wbg_set_modelmaterial_emissiveIntensity(this.__wbg_ptr, isLikeNone(arg0) ? Number.MAX_SAFE_INTEGER : Math.fround(arg0));
    }
    /**
     * @param {number | null} [arg0]
     */
    set height(arg0) {
        wasm.__wbg_set_modelmaterial_height(this.__wbg_ptr, isLikeNone(arg0) ? Number.MAX_SAFE_INTEGER : Math.fround(arg0));
    }
    /**
     * @param {number | null} [arg0]
     */
    set ior(arg0) {
        wasm.__wbg_set_modelmaterial_ior(this.__wbg_ptr, isLikeNone(arg0) ? Number.MAX_SAFE_INTEGER : Math.fround(arg0));
    }
    /**
     * Applies the lighting equation to the color output. When `false` the
     * material outputs plain albedo (for deferred lighting) while normals and
     * the shadow G-buffer keep being written.
     * @param {boolean | null} [arg0]
     */
    set lit(arg0) {
        wasm.__wbg_set_modelmaterial_lit(this.__wbg_ptr, isLikeNone(arg0) ? 0xFFFFFF : arg0 ? 1 : 0);
    }
    /**
     * @param {number | null} [arg0]
     */
    set maxSse(arg0) {
        wasm.__wbg_set_modelmaterial_maxSse(this.__wbg_ptr, isLikeNone(arg0) ? Number.MAX_SAFE_INTEGER : Math.fround(arg0));
    }
    /**
     * @param {number | null} [arg0]
     */
    set metalness(arg0) {
        wasm.__wbg_set_modelmaterial_metalness(this.__wbg_ptr, isLikeNone(arg0) ? Number.MAX_SAFE_INTEGER : Math.fround(arg0));
    }
    /**
     * When true, recompute vertex normals using a creased-normals algorithm
     * after the model loads. Useful for tiled glTF assets that ship without
     * normals or with low-quality normals.
     * @param {boolean | null} [arg0]
     */
    set normals(arg0) {
        wasm.__wbg_set_modelmaterial_normals(this.__wbg_ptr, isLikeNone(arg0) ? 0xFFFFFF : arg0 ? 1 : 0);
    }
    /**
     * Opacity value
     * @param {number | null} [arg0]
     */
    set opacity(arg0) {
        wasm.__wbg_set_modelmaterial_opacity(this.__wbg_ptr, isLikeNone(arg0) ? Number.MAX_SAFE_INTEGER : Math.fround(arg0));
    }
    /**
     * @param {number | null} [arg0]
     */
    set pointSize(arg0) {
        wasm.__wbg_set_modelmaterial_pointSize(this.__wbg_ptr, isLikeNone(arg0) ? Number.MAX_SAFE_INTEGER : Math.fround(arg0));
    }
    /**
     * @param {boolean | null} [arg0]
     */
    set receiveShadow(arg0) {
        wasm.__wbg_set_modelmaterial_receiveShadow(this.__wbg_ptr, isLikeNone(arg0) ? 0xFFFFFF : arg0 ? 1 : 0);
    }
    /**
     * Reflectivity for post-process or env map.
     * @param {number | null} [arg0]
     */
    set reflectivity(arg0) {
        wasm.__wbg_set_modelmaterial_reflectivity(this.__wbg_ptr, isLikeNone(arg0) ? Number.MAX_SAFE_INTEGER : Math.fround(arg0));
    }
    /**
     * Reflectivity for post-process.
     * @param {number | null} [arg0]
     */
    set roughness(arg0) {
        wasm.__wbg_set_modelmaterial_roughness(this.__wbg_ptr, isLikeNone(arg0) ? Number.MAX_SAFE_INTEGER : Math.fround(arg0));
    }
    /**
     * @param {number | null} [arg0]
     */
    set shininess(arg0) {
        wasm.__wbg_set_modelmaterial_shininess(this.__wbg_ptr, isLikeNone(arg0) ? Number.MAX_SAFE_INTEGER : Math.fround(arg0));
    }
    /**
     * @param {boolean | null} [arg0]
     */
    set shouldRotateInDefault(arg0) {
        wasm.__wbg_set_modelmaterial_shouldRotateInDefault(this.__wbg_ptr, isLikeNone(arg0) ? 0xFFFFFF : arg0 ? 1 : 0);
    }
    /**
     * @param {boolean | null} [arg0]
     */
    set showBoundingBox(arg0) {
        wasm.__wbg_set_modelmaterial_showBoundingBox(this.__wbg_ptr, isLikeNone(arg0) ? 0xFFFFFF : arg0 ? 1 : 0);
    }
    /**
     * @param {boolean | null} [arg0]
     */
    set show(arg0) {
        wasm.__wbg_set_modelmaterial_show(this.__wbg_ptr, isLikeNone(arg0) ? 0xFFFFFF : arg0 ? 1 : 0);
    }
    /**
     * @param {number | null} [arg0]
     */
    set size(arg0) {
        wasm.__wbg_set_modelmaterial_size(this.__wbg_ptr, isLikeNone(arg0) ? Number.MAX_SAFE_INTEGER : Math.fround(arg0));
    }
    /**
     * @param {number | null} [arg0]
     */
    set specularStrength(arg0) {
        wasm.__wbg_set_modelmaterial_specularStrength(this.__wbg_ptr, isLikeNone(arg0) ? Number.MAX_SAFE_INTEGER : Math.fround(arg0));
    }
    /**
     * Enabling this value allows using `shininess` and `specular_strength`.
     * @param {boolean | null} [arg0]
     */
    set specular(arg0) {
        wasm.__wbg_set_modelmaterial_specular(this.__wbg_ptr, isLikeNone(arg0) ? 0xFFFFFF : arg0 ? 1 : 0);
    }
    /**
     * Enable transparency and alpha blending
     * @param {boolean | null} [arg0]
     */
    set transparent(arg0) {
        wasm.__wbg_set_modelmaterial_transparent(this.__wbg_ptr, isLikeNone(arg0) ? 0xFFFFFF : arg0 ? 1 : 0);
    }
    /**
     * @param {string | null} [arg0]
     */
    set url(arg0) {
        var ptr0 = isLikeNone(arg0) ? 0 : passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_modelmaterial_url(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * Scale water normal. Decreasing this value will make the water surface rough.
     * @param {number | null} [arg0]
     */
    set waterScaleNormal(arg0) {
        wasm.__wbg_set_modelmaterial_waterScaleNormal(this.__wbg_ptr, isLikeNone(arg0) ? Number.MAX_SAFE_INTEGER : Math.fround(arg0));
    }
    /**
     * Water wave speed.
     * @param {number | null} [arg0]
     */
    set waterSpeed(arg0) {
        wasm.__wbg_set_modelmaterial_waterSpeed(this.__wbg_ptr, isLikeNone(arg0) ? Number.MAX_SAFE_INTEGER : Math.fround(arg0));
    }
    /**
     * Apply a water material on the polygon. It might slow down the loading of the mesh.
     * @param {boolean | null} [arg0]
     */
    set water(arg0) {
        wasm.__wbg_set_modelmaterial_water(this.__wbg_ptr, isLikeNone(arg0) ? 0xFFFFFF : arg0 ? 1 : 0);
    }
}
if (Symbol.dispose) ModelMaterial.prototype[Symbol.dispose] = ModelMaterial.prototype.free;

export class NearFar {
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        NearFarFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_nearfar_free(ptr, 0);
    }
    /**
     * @returns {number}
     */
    get far() {
        const ret = wasm.__wbg_get_nearfar_far(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number}
     */
    get near() {
        const ret = wasm.__wbg_get_nearfar_near(this.__wbg_ptr);
        return ret;
    }
    /**
     * @param {number} arg0
     */
    set far(arg0) {
        wasm.__wbg_set_nearfar_far(this.__wbg_ptr, arg0);
    }
    /**
     * @param {number} arg0
     */
    set near(arg0) {
        wasm.__wbg_set_nearfar_near(this.__wbg_ptr, arg0);
    }
}
if (Symbol.dispose) NearFar.prototype[Symbol.dispose] = NearFar.prototype.free;

export class OverscaledTileHandle {
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        OverscaledTileHandleFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_overscaledtilehandle_free(ptr, 0);
    }
    /**
     * @returns {bigint}
     */
    get handle() {
        const ret = wasm.__wbg_get_overscaledtilehandle_handle(this.__wbg_ptr);
        return BigInt.asUintN(64, ret);
    }
    /**
     * @param {bigint} arg0
     */
    set handle(arg0) {
        wasm.__wbg_set_overscaledtilehandle_handle(this.__wbg_ptr, arg0);
    }
}
if (Symbol.dispose) OverscaledTileHandle.prototype[Symbol.dispose] = OverscaledTileHandle.prototype.free;

export class Plane {
    static __wrap(ptr) {
        const obj = Object.create(Plane.prototype);
        obj.__wbg_ptr = ptr;
        PlaneFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        PlaneFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_plane_free(ptr, 0);
    }
    /**
     * @returns {number}
     */
    get distance() {
        const ret = wasm.__wbg_get_plane_distance(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {Vec3}
     */
    get normal() {
        const ret = wasm.__wbg_get_plane_normal(this.__wbg_ptr);
        return Vec3.__wrap(ret);
    }
    /**
     * @param {number} arg0
     */
    set distance(arg0) {
        wasm.__wbg_set_plane_distance(this.__wbg_ptr, arg0);
    }
    /**
     * @param {Vec3} arg0
     */
    set normal(arg0) {
        _assertClass(arg0, Vec3);
        var ptr0 = arg0.__destroy_into_raw();
        wasm.__wbg_set_plane_normal(this.__wbg_ptr, ptr0);
    }
}
if (Symbol.dispose) Plane.prototype[Symbol.dispose] = Plane.prototype.free;

export class PointMaterial {
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        PointMaterialFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_pointmaterial_free(ptr, 0);
    }
    /**
     * Whether faces seen from behind are culled. Default is false, so a
     * quad frozen in its anchor's frame (`rotateWithCamera: false`) stays
     * visible from behind. Turn it on to hide a flat quad's parts that wrap
     * over the horizon, which face away from the camera.
     * @returns {boolean | undefined}
     */
    get backfaceCulling() {
        const ret = wasm.__wbg_get_pointmaterial_backfaceCulling(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret !== 0;
    }
    /**
     * anchor point of the sprite, range is (-0.5, -0.5) to (0.5, 0.5).
     * Default is (0.0, 0.0) which means the center of the sprite.
     * @returns {Vec2 | undefined}
     */
    get center() {
        const ret = wasm.__wbg_get_pointmaterial_center(this.__wbg_ptr);
        return ret === 0 ? undefined : Vec2.__wrap(ret);
    }
    /**
     * @returns {boolean | undefined}
     */
    get clampToGround() {
        const ret = wasm.__wbg_get_pointmaterial_clampToGround(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret !== 0;
    }
    /**
     * @returns {number | undefined}
     */
    get color() {
        const ret = wasm.__wbg_get_pointmaterial_color(this.__wbg_ptr);
        return ret === Number.MAX_SAFE_INTEGER ? undefined : ret;
    }
    /**
     * Placement priority for decluttering; higher wins. Only meaningful when
     * `declutter` is enabled. Defaults to `0.0`.
     * @returns {number | undefined}
     */
    get declutterPriority() {
        const ret = wasm.__wbg_get_pointmaterial_declutterPriority(this.__wbg_ptr);
        return ret === Number.MAX_SAFE_INTEGER ? undefined : ret;
    }
    /**
     * Participate in screen-space decluttering: when labels/sprites overlap
     * on screen, lower-priority ones are hidden. Defaults to `true`; set to
     * `false` to draw every label unconditionally.
     * @returns {boolean | undefined}
     */
    get declutter() {
        const ret = wasm.__wbg_get_pointmaterial_declutter(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret !== 0;
    }
    /**
     * @returns {boolean | undefined}
     */
    get depthTest() {
        const ret = wasm.__wbg_get_pointmaterial_depthTest(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret !== 0;
    }
    /**
     * IDs of selective effects to apply (e.g., "bloom", "outline")
     * @returns {string[] | undefined}
     */
    get effectIds() {
        const ret = wasm.__wbg_get_pointmaterial_effectIds(this.__wbg_ptr);
        let v1;
        if (ret[0] !== 0) {
            v1 = getArrayJsValueFromWasm0(ret[0], ret[1]).slice();
            wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        }
        return v1;
    }
    /**
     * Emissive glow color in 0xRRGGBB format
     * @returns {number | undefined}
     */
    get emissiveColor() {
        const ret = wasm.__wbg_get_pointmaterial_emissiveColor(this.__wbg_ptr);
        return ret === Number.MAX_SAFE_INTEGER ? undefined : ret;
    }
    /**
     * Emissive glow intensity (omitted = 0, no emissive output)
     * @returns {number | undefined}
     */
    get emissiveIntensity() {
        const ret = wasm.__wbg_get_pointmaterial_emissiveIntensity(this.__wbg_ptr);
        return ret === Number.MAX_SAFE_INTEGER ? undefined : ret;
    }
    /**
     * Source geometry types this appearance consumes: `"point"`, `"line"`,
     * `"polygon"`. Defaults to `["point"]`; adding `"line"`/`"polygon"` also
     * emits a point per line-string / polygon-ring vertex.
     * @returns {string[] | undefined}
     */
    get geometryTypes() {
        const ret = wasm.__wbg_get_pointmaterial_geometryTypes(this.__wbg_ptr);
        let v1;
        if (ret[0] !== 0) {
            v1 = getArrayJsValueFromWasm0(ret[0], ret[1]).slice();
            wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        }
        return v1;
    }
    /**
     * @returns {number | undefined}
     */
    get height() {
        const ret = wasm.__wbg_get_pointmaterial_height(this.__wbg_ptr);
        return ret === Number.MAX_SAFE_INTEGER ? undefined : ret;
    }
    /**
     * Avoid overlapping with the globe surface.
     * @returns {boolean | undefined}
     */
    get offsetDepth() {
        const ret = wasm.__wbg_get_pointmaterial_offsetDepth(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret !== 0;
    }
    /**
     * @returns {number | undefined}
     */
    get opacity() {
        const ret = wasm.__wbg_get_pointmaterial_opacity(this.__wbg_ptr);
        return ret === Number.MAX_SAFE_INTEGER ? undefined : ret;
    }
    /**
     * Whether the point stands up (`"upright"`, the default) or lies on the
     * globe surface around its anchor (`"flat"`). Pair with
     * `rotateWithCamera`.
     * @returns {string | undefined}
     */
    get pointFacing() {
        const ret = wasm.__wbg_get_pointmaterial_pointFacing(this.__wbg_ptr);
        let v1;
        if (ret[0] !== 0) {
            v1 = getStringFromWasm0(ret[0], ret[1]).slice();
            wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        }
        return v1;
    }
    /**
     * Whether the point turns to follow the camera. `true` (the default)
     * keeps it facing the viewer. `false` freezes it in the anchor's local
     * east-north-up frame, so moving the camera never reorients it.
     * @returns {boolean | undefined}
     */
    get rotateWithCamera() {
        const ret = wasm.__wbg_get_pointmaterial_rotateWithCamera(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret !== 0;
    }
    /**
     * Rotation of the point within its own plane, about its anchor point, in
     * degrees, clockwise seen from the front. `center` decides where inside
     * the quad the pivot sits. Defaults to `0.0`.
     * @returns {number | undefined}
     */
    get rotation() {
        const ret = wasm.__wbg_get_pointmaterial_rotation(this.__wbg_ptr);
        return ret === Number.MAX_SAFE_INTEGER ? undefined : ret;
    }
    /**
     * @returns {boolean | undefined}
     */
    get show() {
        const ret = wasm.__wbg_get_pointmaterial_show(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret !== 0;
    }
    /**
     * Whether the size is specified in meters. If false, the size is in pixels. Default is true.
     * @returns {boolean | undefined}
     */
    get sizeInMeters() {
        const ret = wasm.__wbg_get_pointmaterial_sizeInMeters(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret !== 0;
    }
    /**
     * size in pixels/meters (units are determined by `sizeInMeters`).
     * @returns {number | undefined}
     */
    get size() {
        const ret = wasm.__wbg_get_pointmaterial_size(this.__wbg_ptr);
        return ret === Number.MAX_SAFE_INTEGER ? undefined : ret;
    }
    /**
     * @returns {boolean | undefined}
     */
    get transparent() {
        const ret = wasm.__wbg_get_pointmaterial_transparent(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret !== 0;
    }
    /**
     * Whether faces seen from behind are culled. Default is false, so a
     * quad frozen in its anchor's frame (`rotateWithCamera: false`) stays
     * visible from behind. Turn it on to hide a flat quad's parts that wrap
     * over the horizon, which face away from the camera.
     * @param {boolean | null} [arg0]
     */
    set backfaceCulling(arg0) {
        wasm.__wbg_set_pointmaterial_backfaceCulling(this.__wbg_ptr, isLikeNone(arg0) ? 0xFFFFFF : arg0 ? 1 : 0);
    }
    /**
     * anchor point of the sprite, range is (-0.5, -0.5) to (0.5, 0.5).
     * Default is (0.0, 0.0) which means the center of the sprite.
     * @param {Vec2 | null} [arg0]
     */
    set center(arg0) {
        let ptr0 = 0;
        if (!isLikeNone(arg0)) {
            _assertClass(arg0, Vec2);
            ptr0 = arg0.__destroy_into_raw();
        }
        wasm.__wbg_set_pointmaterial_center(this.__wbg_ptr, ptr0);
    }
    /**
     * @param {boolean | null} [arg0]
     */
    set clampToGround(arg0) {
        wasm.__wbg_set_pointmaterial_clampToGround(this.__wbg_ptr, isLikeNone(arg0) ? 0xFFFFFF : arg0 ? 1 : 0);
    }
    /**
     * @param {number | null} [arg0]
     */
    set color(arg0) {
        wasm.__wbg_set_pointmaterial_color(this.__wbg_ptr, isLikeNone(arg0) ? Number.MAX_SAFE_INTEGER : (arg0) >>> 0);
    }
    /**
     * Placement priority for decluttering; higher wins. Only meaningful when
     * `declutter` is enabled. Defaults to `0.0`.
     * @param {number | null} [arg0]
     */
    set declutterPriority(arg0) {
        wasm.__wbg_set_pointmaterial_declutterPriority(this.__wbg_ptr, isLikeNone(arg0) ? Number.MAX_SAFE_INTEGER : Math.fround(arg0));
    }
    /**
     * Participate in screen-space decluttering: when labels/sprites overlap
     * on screen, lower-priority ones are hidden. Defaults to `true`; set to
     * `false` to draw every label unconditionally.
     * @param {boolean | null} [arg0]
     */
    set declutter(arg0) {
        wasm.__wbg_set_pointmaterial_declutter(this.__wbg_ptr, isLikeNone(arg0) ? 0xFFFFFF : arg0 ? 1 : 0);
    }
    /**
     * @param {boolean | null} [arg0]
     */
    set depthTest(arg0) {
        wasm.__wbg_set_pointmaterial_depthTest(this.__wbg_ptr, isLikeNone(arg0) ? 0xFFFFFF : arg0 ? 1 : 0);
    }
    /**
     * IDs of selective effects to apply (e.g., "bloom", "outline")
     * @param {string[] | null} [arg0]
     */
    set effectIds(arg0) {
        var ptr0 = isLikeNone(arg0) ? 0 : passArrayJsValueToWasm0(arg0, wasm.__wbindgen_malloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_pointmaterial_effectIds(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * Emissive glow color in 0xRRGGBB format
     * @param {number | null} [arg0]
     */
    set emissiveColor(arg0) {
        wasm.__wbg_set_pointmaterial_emissiveColor(this.__wbg_ptr, isLikeNone(arg0) ? Number.MAX_SAFE_INTEGER : (arg0) >>> 0);
    }
    /**
     * Emissive glow intensity (omitted = 0, no emissive output)
     * @param {number | null} [arg0]
     */
    set emissiveIntensity(arg0) {
        wasm.__wbg_set_pointmaterial_emissiveIntensity(this.__wbg_ptr, isLikeNone(arg0) ? Number.MAX_SAFE_INTEGER : Math.fround(arg0));
    }
    /**
     * Source geometry types this appearance consumes: `"point"`, `"line"`,
     * `"polygon"`. Defaults to `["point"]`; adding `"line"`/`"polygon"` also
     * emits a point per line-string / polygon-ring vertex.
     * @param {string[] | null} [arg0]
     */
    set geometryTypes(arg0) {
        var ptr0 = isLikeNone(arg0) ? 0 : passArrayJsValueToWasm0(arg0, wasm.__wbindgen_malloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_pointmaterial_geometryTypes(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @param {number | null} [arg0]
     */
    set height(arg0) {
        wasm.__wbg_set_pointmaterial_height(this.__wbg_ptr, isLikeNone(arg0) ? Number.MAX_SAFE_INTEGER : Math.fround(arg0));
    }
    /**
     * Avoid overlapping with the globe surface.
     * @param {boolean | null} [arg0]
     */
    set offsetDepth(arg0) {
        wasm.__wbg_set_pointmaterial_offsetDepth(this.__wbg_ptr, isLikeNone(arg0) ? 0xFFFFFF : arg0 ? 1 : 0);
    }
    /**
     * @param {number | null} [arg0]
     */
    set opacity(arg0) {
        wasm.__wbg_set_pointmaterial_opacity(this.__wbg_ptr, isLikeNone(arg0) ? Number.MAX_SAFE_INTEGER : Math.fround(arg0));
    }
    /**
     * Whether the point stands up (`"upright"`, the default) or lies on the
     * globe surface around its anchor (`"flat"`). Pair with
     * `rotateWithCamera`.
     * @param {string | null} [arg0]
     */
    set pointFacing(arg0) {
        var ptr0 = isLikeNone(arg0) ? 0 : passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_pointmaterial_pointFacing(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * Whether the point turns to follow the camera. `true` (the default)
     * keeps it facing the viewer. `false` freezes it in the anchor's local
     * east-north-up frame, so moving the camera never reorients it.
     * @param {boolean | null} [arg0]
     */
    set rotateWithCamera(arg0) {
        wasm.__wbg_set_pointmaterial_rotateWithCamera(this.__wbg_ptr, isLikeNone(arg0) ? 0xFFFFFF : arg0 ? 1 : 0);
    }
    /**
     * Rotation of the point within its own plane, about its anchor point, in
     * degrees, clockwise seen from the front. `center` decides where inside
     * the quad the pivot sits. Defaults to `0.0`.
     * @param {number | null} [arg0]
     */
    set rotation(arg0) {
        wasm.__wbg_set_pointmaterial_rotation(this.__wbg_ptr, isLikeNone(arg0) ? Number.MAX_SAFE_INTEGER : Math.fround(arg0));
    }
    /**
     * @param {boolean | null} [arg0]
     */
    set show(arg0) {
        wasm.__wbg_set_pointmaterial_show(this.__wbg_ptr, isLikeNone(arg0) ? 0xFFFFFF : arg0 ? 1 : 0);
    }
    /**
     * Whether the size is specified in meters. If false, the size is in pixels. Default is true.
     * @param {boolean | null} [arg0]
     */
    set sizeInMeters(arg0) {
        wasm.__wbg_set_pointmaterial_sizeInMeters(this.__wbg_ptr, isLikeNone(arg0) ? 0xFFFFFF : arg0 ? 1 : 0);
    }
    /**
     * size in pixels/meters (units are determined by `sizeInMeters`).
     * @param {number | null} [arg0]
     */
    set size(arg0) {
        wasm.__wbg_set_pointmaterial_size(this.__wbg_ptr, isLikeNone(arg0) ? Number.MAX_SAFE_INTEGER : Math.fround(arg0));
    }
    /**
     * @param {boolean | null} [arg0]
     */
    set transparent(arg0) {
        wasm.__wbg_set_pointmaterial_transparent(this.__wbg_ptr, isLikeNone(arg0) ? 0xFFFFFF : arg0 ? 1 : 0);
    }
}
if (Symbol.dispose) PointMaterial.prototype[Symbol.dispose] = PointMaterial.prototype.free;

export class PolygonGeometry {
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        PolygonGeometryFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_polygongeometry_free(ptr, 0);
    }
    /**
     * @returns {Float32Array | undefined}
     */
    batch_id() {
        const ret = wasm.polygongeometry_batch_id(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number | undefined}
     */
    batch_id_size() {
        const ret = wasm.polygongeometry_batch_id_size(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret;
    }
    /**
     * @returns {Uint32Array | undefined}
     */
    batch_index() {
        const ret = wasm.polygongeometry_batch_index(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number | undefined}
     */
    batch_index_size() {
        const ret = wasm.polygongeometry_batch_index_size(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret;
    }
    /**
     * @returns {Uint32Array}
     */
    indices() {
        const ret = wasm.polygongeometry_indices(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {Float32Array | undefined}
     */
    normal() {
        const ret = wasm.polygongeometry_normal(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number | undefined}
     */
    normal_size() {
        const ret = wasm.polygongeometry_normal_size(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret;
    }
    /**
     * @returns {Float32Array | undefined}
     */
    position() {
        const ret = wasm.polygongeometry_position(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {Float32Array | undefined}
     */
    position_3d_high() {
        const ret = wasm.polygongeometry_position_3d_high(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number | undefined}
     */
    position_3d_high_size() {
        const ret = wasm.polygongeometry_position_3d_high_size(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret;
    }
    /**
     * @returns {Float32Array | undefined}
     */
    position_3d_low() {
        const ret = wasm.polygongeometry_position_3d_low(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number | undefined}
     */
    position_3d_low_size() {
        const ret = wasm.polygongeometry_position_3d_low_size(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret;
    }
    /**
     * @returns {number | undefined}
     */
    position_size() {
        const ret = wasm.polygongeometry_position_size(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret;
    }
    /**
     * @returns {Float32Array | undefined}
     */
    scale_normal_and_cap() {
        const ret = wasm.polygongeometry_scale_normal_and_cap(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number | undefined}
     */
    scale_normal_and_cap_size() {
        const ret = wasm.polygongeometry_scale_normal_and_cap_size(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret;
    }
}
if (Symbol.dispose) PolygonGeometry.prototype[Symbol.dispose] = PolygonGeometry.prototype.free;

export class PolygonGeometryAttributes {
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        PolygonGeometryAttributesFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_polygongeometryattributes_free(ptr, 0);
    }
    /**
     * @returns {Float32Array | undefined}
     */
    transfer_batch_id() {
        const ret = wasm.polygongeometryattributes_transfer_batch_id(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number | undefined}
     */
    transfer_batch_id_size() {
        const ret = wasm.polygongeometryattributes_transfer_batch_id_size(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret;
    }
    /**
     * @returns {Uint32Array | undefined}
     */
    transfer_batch_index() {
        const ret = wasm.polygongeometryattributes_transfer_batch_index(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number | undefined}
     */
    transfer_batch_index_size() {
        const ret = wasm.polygongeometryattributes_transfer_batch_index_size(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret;
    }
    /**
     * @returns {Float32Array | undefined}
     */
    transfer_normal() {
        const ret = wasm.polygongeometryattributes_transfer_normal(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number | undefined}
     */
    transfer_normal_size() {
        const ret = wasm.polygongeometryattributes_transfer_normal_size(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret;
    }
    /**
     * @returns {Float32Array | undefined}
     */
    transfer_position() {
        const ret = wasm.polygongeometryattributes_transfer_position(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {Float32Array | undefined}
     */
    transfer_position_3d_high() {
        const ret = wasm.polygongeometryattributes_transfer_position_3d_high(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number | undefined}
     */
    transfer_position_3d_high_size() {
        const ret = wasm.polygongeometryattributes_transfer_position_3d_high_size(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret;
    }
    /**
     * @returns {Float32Array | undefined}
     */
    transfer_position_3d_low() {
        const ret = wasm.polygongeometryattributes_transfer_position_3d_low(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number | undefined}
     */
    transfer_position_3d_low_size() {
        const ret = wasm.polygongeometryattributes_transfer_position_3d_low_size(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret;
    }
    /**
     * @returns {number | undefined}
     */
    transfer_position_size() {
        const ret = wasm.polygongeometryattributes_transfer_position_size(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret;
    }
    /**
     * @returns {Float32Array | undefined}
     */
    transfer_scale_normal_and_cap() {
        const ret = wasm.polygongeometryattributes_transfer_scale_normal_and_cap(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number | undefined}
     */
    transfer_scale_normal_and_cap_size() {
        const ret = wasm.polygongeometryattributes_transfer_scale_normal_and_cap_size(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret;
    }
}
if (Symbol.dispose) PolygonGeometryAttributes.prototype[Symbol.dispose] = PolygonGeometryAttributes.prototype.free;

export class PolygonInternalMaterial {
    static __wrap(ptr) {
        const obj = Object.create(PolygonInternalMaterial.prototype);
        obj.__wbg_ptr = ptr;
        PolygonInternalMaterialFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        PolygonInternalMaterialFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_polygoninternalmaterial_free(ptr, 0);
    }
    /**
     * @returns {Float64Array}
     */
    get minMaxHeights() {
        const ret = wasm.__wbg_get_polygoninternalmaterial_minMaxHeights(this.__wbg_ptr);
        var v1 = getArrayF64FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 8, 8);
        return v1;
    }
    /**
     * @param {Float64Array} arg0
     */
    set minMaxHeights(arg0) {
        const ptr0 = passArrayF64ToWasm0(arg0, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_polygoninternalmaterial_minMaxHeights(this.__wbg_ptr, ptr0, len0);
    }
}
if (Symbol.dispose) PolygonInternalMaterial.prototype[Symbol.dispose] = PolygonInternalMaterial.prototype.free;

export class PolygonMaterial {
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        PolygonMaterialFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_polygonmaterial_free(ptr, 0);
    }
    /**
     * @returns {PolygonInternalMaterial | undefined}
     */
    get __internal__() {
        const ret = wasm.__wbg_get_polygonmaterial___internal__(this.__wbg_ptr);
        return ret === 0 ? undefined : PolygonInternalMaterial.__wrap(ret);
    }
    /**
     * @returns {boolean | undefined}
     */
    get applyWaterNormal() {
        const ret = wasm.__wbg_get_polygonmaterial_applyWaterNormal(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret !== 0;
    }
    /**
     * @returns {boolean | undefined}
     */
    get castShadow() {
        const ret = wasm.__wbg_get_polygonmaterial_castShadow(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret !== 0;
    }
    /**
     * @returns {boolean | undefined}
     */
    get clampToGround() {
        const ret = wasm.__wbg_get_polygonmaterial_clampToGround(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret !== 0;
    }
    /**
     * @returns {number | undefined}
     */
    get color() {
        const ret = wasm.__wbg_get_polygonmaterial_color(this.__wbg_ptr);
        return ret === Number.MAX_SAFE_INTEGER ? undefined : ret;
    }
    /**
     * IDs of selective effects to apply (e.g., "bloom", "outline")
     * @returns {string[] | undefined}
     */
    get effectIds() {
        const ret = wasm.__wbg_get_polygonmaterial_effectIds(this.__wbg_ptr);
        let v1;
        if (ret[0] !== 0) {
            v1 = getArrayJsValueFromWasm0(ret[0], ret[1]).slice();
            wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        }
        return v1;
    }
    /**
     * Emissive glow color in 0xRRGGBB format
     * @returns {number | undefined}
     */
    get emissiveColor() {
        const ret = wasm.__wbg_get_polygonmaterial_emissiveColor(this.__wbg_ptr);
        return ret === Number.MAX_SAFE_INTEGER ? undefined : ret;
    }
    /**
     * Emissive glow intensity (omitted = 0, no emissive output)
     * @returns {number | undefined}
     */
    get emissiveIntensity() {
        const ret = wasm.__wbg_get_polygonmaterial_emissiveIntensity(this.__wbg_ptr);
        return ret === Number.MAX_SAFE_INTEGER ? undefined : ret;
    }
    /**
     * @returns {number | undefined}
     */
    get extrudedHeight() {
        const ret = wasm.__wbg_get_polygonmaterial_extrudedHeight(this.__wbg_ptr);
        return ret === Number.MAX_SAFE_INTEGER ? undefined : ret;
    }
    /**
     * @returns {number | undefined}
     */
    get height() {
        const ret = wasm.__wbg_get_polygonmaterial_height(this.__wbg_ptr);
        return ret === Number.MAX_SAFE_INTEGER ? undefined : ret;
    }
    /**
     * @returns {number | undefined}
     */
    get ior() {
        const ret = wasm.__wbg_get_polygonmaterial_ior(this.__wbg_ptr);
        return ret === Number.MAX_SAFE_INTEGER ? undefined : ret;
    }
    /**
     * Applies the lighting equation to the color output. When `false` the
     * material outputs plain albedo (for deferred lighting) while normals and
     * the shadow G-buffer keep being written.
     * @returns {boolean | undefined}
     */
    get lit() {
        const ret = wasm.__wbg_get_polygonmaterial_lit(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret !== 0;
    }
    /**
     * Need to enable `transparent`.
     * @returns {number | undefined}
     */
    get opacity() {
        const ret = wasm.__wbg_get_polygonmaterial_opacity(this.__wbg_ptr);
        return ret === Number.MAX_SAFE_INTEGER ? undefined : ret;
    }
    /**
     * Currently, this property is supported only in GeoJSON.
     * @returns {number | undefined}
     */
    get outlineColor() {
        const ret = wasm.__wbg_get_polygonmaterial_outlineColor(this.__wbg_ptr);
        return ret === Number.MAX_SAFE_INTEGER ? undefined : ret;
    }
    /**
     * Currently, this property is supported only in GeoJSON.
     * @returns {boolean | undefined}
     */
    get outlineShow() {
        const ret = wasm.__wbg_get_polygonmaterial_outlineShow(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret !== 0;
    }
    /**
     * Currently, this property is supported only in GeoJSON.
     * @returns {number | undefined}
     */
    get outlineWidth() {
        const ret = wasm.__wbg_get_polygonmaterial_outlineWidth(this.__wbg_ptr);
        return ret === Number.MAX_SAFE_INTEGER ? undefined : ret;
    }
    /**
     * Whether to compute outline geometry. Only effective at initial load time.
     * When not set, inferred from `outlineShow`.
     * @returns {boolean | undefined}
     */
    get outline() {
        const ret = wasm.__wbg_get_polygonmaterial_outline(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret !== 0;
    }
    /**
     * Whether or not the height is obtained from the data. If false, the height is constant.
     * @returns {boolean | undefined}
     */
    get perPositionHeight() {
        const ret = wasm.__wbg_get_polygonmaterial_perPositionHeight(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret !== 0;
    }
    /**
     * @returns {boolean | undefined}
     */
    get receiveShadow() {
        const ret = wasm.__wbg_get_polygonmaterial_receiveShadow(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret !== 0;
    }
    /**
     * Reflectivity for post-process or env map.
     * @returns {number | undefined}
     */
    get reflectivity() {
        const ret = wasm.__wbg_get_polygonmaterial_reflectivity(this.__wbg_ptr);
        return ret === Number.MAX_SAFE_INTEGER ? undefined : ret;
    }
    /**
     * Reflectivity for post-process.
     * @returns {number | undefined}
     */
    get roughness() {
        const ret = wasm.__wbg_get_polygonmaterial_roughness(this.__wbg_ptr);
        return ret === Number.MAX_SAFE_INTEGER ? undefined : ret;
    }
    /**
     * @returns {number | undefined}
     */
    get shininess() {
        const ret = wasm.__wbg_get_polygonmaterial_shininess(this.__wbg_ptr);
        return ret === Number.MAX_SAFE_INTEGER ? undefined : ret;
    }
    /**
     * @returns {boolean | undefined}
     */
    get show() {
        const ret = wasm.__wbg_get_polygonmaterial_show(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret !== 0;
    }
    /**
     * @returns {number | undefined}
     */
    get specularStrength() {
        const ret = wasm.__wbg_get_polygonmaterial_specularStrength(this.__wbg_ptr);
        return ret === Number.MAX_SAFE_INTEGER ? undefined : ret;
    }
    /**
     * Enabling this value allows using `shininess` and `specular_strength`.
     * @returns {boolean | undefined}
     */
    get specular() {
        const ret = wasm.__wbg_get_polygonmaterial_specular(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret !== 0;
    }
    /**
     * Currently, this property is supported only in GeoJSON.
     * @returns {boolean | undefined}
     */
    get surfaceShow() {
        const ret = wasm.__wbg_get_polygonmaterial_surfaceShow(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret !== 0;
    }
    /**
     * Splits the polygon into XYZ vector tiles for rendering, even when the
     * data source is not an MVT layer. This can improve performance for large
     * polygons.
     *
     * Enabling `clamp_to_ground` implicitly forces `tiled` to `true`.
     * Outline rendering is not supported when `tiled` is enabled.
     * @returns {boolean | undefined}
     */
    get tiled() {
        const ret = wasm.__wbg_get_polygonmaterial_tiled(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret !== 0;
    }
    /**
     * Enable `opacity`. It might cause unexpected behavior when you use an effect.
     * @returns {boolean | undefined}
     */
    get transparent() {
        const ret = wasm.__wbg_get_polygonmaterial_transparent(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret !== 0;
    }
    /**
     * Scale water normal. Decreasing this value will make the water surface rough.
     * @returns {number | undefined}
     */
    get waterScaleNormal() {
        const ret = wasm.__wbg_get_polygonmaterial_waterScaleNormal(this.__wbg_ptr);
        return ret === Number.MAX_SAFE_INTEGER ? undefined : ret;
    }
    /**
     * Water wave speed.
     * @returns {number | undefined}
     */
    get waterSpeed() {
        const ret = wasm.__wbg_get_polygonmaterial_waterSpeed(this.__wbg_ptr);
        return ret === Number.MAX_SAFE_INTEGER ? undefined : ret;
    }
    /**
     * Apply a water material on the polygon. It might slow down the loading of the mesh.
     * @returns {boolean | undefined}
     */
    get water() {
        const ret = wasm.__wbg_get_polygonmaterial_water(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret !== 0;
    }
    /**
     * @returns {boolean | undefined}
     */
    get wireframe() {
        const ret = wasm.__wbg_get_polygonmaterial_wireframe(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret !== 0;
    }
    /**
     * @param {boolean | null} [show]
     * @param {boolean | null} [cast_shadow]
     * @param {boolean | null} [receive_shadow]
     * @param {number | null} [color]
     * @param {boolean | null} [clamp_to_ground]
     * @param {boolean | null} [tiled]
     * @param {number | null} [height]
     * @param {number | null} [extruded_height]
     * @param {boolean | null} [wireframe]
     * @param {boolean | null} [outline]
     * @param {boolean | null} [per_position_height]
     * @param {PolygonInternalMaterial | null} [__internal__]
     */
    constructor(show, cast_shadow, receive_shadow, color, clamp_to_ground, tiled, height, extruded_height, wireframe, outline, per_position_height, __internal__) {
        let ptr0 = 0;
        if (!isLikeNone(__internal__)) {
            _assertClass(__internal__, PolygonInternalMaterial);
            ptr0 = __internal__.__destroy_into_raw();
        }
        const ret = wasm.polygonmaterial_new(isLikeNone(show) ? 0xFFFFFF : show ? 1 : 0, isLikeNone(cast_shadow) ? 0xFFFFFF : cast_shadow ? 1 : 0, isLikeNone(receive_shadow) ? 0xFFFFFF : receive_shadow ? 1 : 0, isLikeNone(color) ? Number.MAX_SAFE_INTEGER : (color) >>> 0, isLikeNone(clamp_to_ground) ? 0xFFFFFF : clamp_to_ground ? 1 : 0, isLikeNone(tiled) ? 0xFFFFFF : tiled ? 1 : 0, isLikeNone(height) ? Number.MAX_SAFE_INTEGER : Math.fround(height), isLikeNone(extruded_height) ? Number.MAX_SAFE_INTEGER : Math.fround(extruded_height), isLikeNone(wireframe) ? 0xFFFFFF : wireframe ? 1 : 0, isLikeNone(outline) ? 0xFFFFFF : outline ? 1 : 0, isLikeNone(per_position_height) ? 0xFFFFFF : per_position_height ? 1 : 0, ptr0);
        this.__wbg_ptr = ret;
        PolygonMaterialFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * @param {PolygonInternalMaterial | null} [arg0]
     */
    set __internal__(arg0) {
        let ptr0 = 0;
        if (!isLikeNone(arg0)) {
            _assertClass(arg0, PolygonInternalMaterial);
            ptr0 = arg0.__destroy_into_raw();
        }
        wasm.__wbg_set_polygonmaterial___internal__(this.__wbg_ptr, ptr0);
    }
    /**
     * @param {boolean | null} [arg0]
     */
    set applyWaterNormal(arg0) {
        wasm.__wbg_set_polygonmaterial_applyWaterNormal(this.__wbg_ptr, isLikeNone(arg0) ? 0xFFFFFF : arg0 ? 1 : 0);
    }
    /**
     * @param {boolean | null} [arg0]
     */
    set castShadow(arg0) {
        wasm.__wbg_set_polygonmaterial_castShadow(this.__wbg_ptr, isLikeNone(arg0) ? 0xFFFFFF : arg0 ? 1 : 0);
    }
    /**
     * @param {boolean | null} [arg0]
     */
    set clampToGround(arg0) {
        wasm.__wbg_set_polygonmaterial_clampToGround(this.__wbg_ptr, isLikeNone(arg0) ? 0xFFFFFF : arg0 ? 1 : 0);
    }
    /**
     * @param {number | null} [arg0]
     */
    set color(arg0) {
        wasm.__wbg_set_polygonmaterial_color(this.__wbg_ptr, isLikeNone(arg0) ? Number.MAX_SAFE_INTEGER : (arg0) >>> 0);
    }
    /**
     * IDs of selective effects to apply (e.g., "bloom", "outline")
     * @param {string[] | null} [arg0]
     */
    set effectIds(arg0) {
        var ptr0 = isLikeNone(arg0) ? 0 : passArrayJsValueToWasm0(arg0, wasm.__wbindgen_malloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_polygonmaterial_effectIds(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * Emissive glow color in 0xRRGGBB format
     * @param {number | null} [arg0]
     */
    set emissiveColor(arg0) {
        wasm.__wbg_set_polygonmaterial_emissiveColor(this.__wbg_ptr, isLikeNone(arg0) ? Number.MAX_SAFE_INTEGER : (arg0) >>> 0);
    }
    /**
     * Emissive glow intensity (omitted = 0, no emissive output)
     * @param {number | null} [arg0]
     */
    set emissiveIntensity(arg0) {
        wasm.__wbg_set_polygonmaterial_emissiveIntensity(this.__wbg_ptr, isLikeNone(arg0) ? Number.MAX_SAFE_INTEGER : Math.fround(arg0));
    }
    /**
     * @param {number | null} [arg0]
     */
    set extrudedHeight(arg0) {
        wasm.__wbg_set_polygonmaterial_extrudedHeight(this.__wbg_ptr, isLikeNone(arg0) ? Number.MAX_SAFE_INTEGER : Math.fround(arg0));
    }
    /**
     * @param {number | null} [arg0]
     */
    set height(arg0) {
        wasm.__wbg_set_polygonmaterial_height(this.__wbg_ptr, isLikeNone(arg0) ? Number.MAX_SAFE_INTEGER : Math.fround(arg0));
    }
    /**
     * @param {number | null} [arg0]
     */
    set ior(arg0) {
        wasm.__wbg_set_polygonmaterial_ior(this.__wbg_ptr, isLikeNone(arg0) ? Number.MAX_SAFE_INTEGER : Math.fround(arg0));
    }
    /**
     * Applies the lighting equation to the color output. When `false` the
     * material outputs plain albedo (for deferred lighting) while normals and
     * the shadow G-buffer keep being written.
     * @param {boolean | null} [arg0]
     */
    set lit(arg0) {
        wasm.__wbg_set_polygonmaterial_lit(this.__wbg_ptr, isLikeNone(arg0) ? 0xFFFFFF : arg0 ? 1 : 0);
    }
    /**
     * Need to enable `transparent`.
     * @param {number | null} [arg0]
     */
    set opacity(arg0) {
        wasm.__wbg_set_polygonmaterial_opacity(this.__wbg_ptr, isLikeNone(arg0) ? Number.MAX_SAFE_INTEGER : Math.fround(arg0));
    }
    /**
     * Currently, this property is supported only in GeoJSON.
     * @param {number | null} [arg0]
     */
    set outlineColor(arg0) {
        wasm.__wbg_set_polygonmaterial_outlineColor(this.__wbg_ptr, isLikeNone(arg0) ? Number.MAX_SAFE_INTEGER : (arg0) >>> 0);
    }
    /**
     * Currently, this property is supported only in GeoJSON.
     * @param {boolean | null} [arg0]
     */
    set outlineShow(arg0) {
        wasm.__wbg_set_polygonmaterial_outlineShow(this.__wbg_ptr, isLikeNone(arg0) ? 0xFFFFFF : arg0 ? 1 : 0);
    }
    /**
     * Currently, this property is supported only in GeoJSON.
     * @param {number | null} [arg0]
     */
    set outlineWidth(arg0) {
        wasm.__wbg_set_polygonmaterial_outlineWidth(this.__wbg_ptr, isLikeNone(arg0) ? Number.MAX_SAFE_INTEGER : Math.fround(arg0));
    }
    /**
     * Whether to compute outline geometry. Only effective at initial load time.
     * When not set, inferred from `outlineShow`.
     * @param {boolean | null} [arg0]
     */
    set outline(arg0) {
        wasm.__wbg_set_polygonmaterial_outline(this.__wbg_ptr, isLikeNone(arg0) ? 0xFFFFFF : arg0 ? 1 : 0);
    }
    /**
     * Whether or not the height is obtained from the data. If false, the height is constant.
     * @param {boolean | null} [arg0]
     */
    set perPositionHeight(arg0) {
        wasm.__wbg_set_polygonmaterial_perPositionHeight(this.__wbg_ptr, isLikeNone(arg0) ? 0xFFFFFF : arg0 ? 1 : 0);
    }
    /**
     * @param {boolean | null} [arg0]
     */
    set receiveShadow(arg0) {
        wasm.__wbg_set_polygonmaterial_receiveShadow(this.__wbg_ptr, isLikeNone(arg0) ? 0xFFFFFF : arg0 ? 1 : 0);
    }
    /**
     * Reflectivity for post-process or env map.
     * @param {number | null} [arg0]
     */
    set reflectivity(arg0) {
        wasm.__wbg_set_polygonmaterial_reflectivity(this.__wbg_ptr, isLikeNone(arg0) ? Number.MAX_SAFE_INTEGER : Math.fround(arg0));
    }
    /**
     * Reflectivity for post-process.
     * @param {number | null} [arg0]
     */
    set roughness(arg0) {
        wasm.__wbg_set_polygonmaterial_roughness(this.__wbg_ptr, isLikeNone(arg0) ? Number.MAX_SAFE_INTEGER : Math.fround(arg0));
    }
    /**
     * @param {number | null} [arg0]
     */
    set shininess(arg0) {
        wasm.__wbg_set_polygonmaterial_shininess(this.__wbg_ptr, isLikeNone(arg0) ? Number.MAX_SAFE_INTEGER : Math.fround(arg0));
    }
    /**
     * @param {boolean | null} [arg0]
     */
    set show(arg0) {
        wasm.__wbg_set_polygonmaterial_show(this.__wbg_ptr, isLikeNone(arg0) ? 0xFFFFFF : arg0 ? 1 : 0);
    }
    /**
     * @param {number | null} [arg0]
     */
    set specularStrength(arg0) {
        wasm.__wbg_set_polygonmaterial_specularStrength(this.__wbg_ptr, isLikeNone(arg0) ? Number.MAX_SAFE_INTEGER : Math.fround(arg0));
    }
    /**
     * Enabling this value allows using `shininess` and `specular_strength`.
     * @param {boolean | null} [arg0]
     */
    set specular(arg0) {
        wasm.__wbg_set_polygonmaterial_specular(this.__wbg_ptr, isLikeNone(arg0) ? 0xFFFFFF : arg0 ? 1 : 0);
    }
    /**
     * Currently, this property is supported only in GeoJSON.
     * @param {boolean | null} [arg0]
     */
    set surfaceShow(arg0) {
        wasm.__wbg_set_polygonmaterial_surfaceShow(this.__wbg_ptr, isLikeNone(arg0) ? 0xFFFFFF : arg0 ? 1 : 0);
    }
    /**
     * Splits the polygon into XYZ vector tiles for rendering, even when the
     * data source is not an MVT layer. This can improve performance for large
     * polygons.
     *
     * Enabling `clamp_to_ground` implicitly forces `tiled` to `true`.
     * Outline rendering is not supported when `tiled` is enabled.
     * @param {boolean | null} [arg0]
     */
    set tiled(arg0) {
        wasm.__wbg_set_polygonmaterial_tiled(this.__wbg_ptr, isLikeNone(arg0) ? 0xFFFFFF : arg0 ? 1 : 0);
    }
    /**
     * Enable `opacity`. It might cause unexpected behavior when you use an effect.
     * @param {boolean | null} [arg0]
     */
    set transparent(arg0) {
        wasm.__wbg_set_polygonmaterial_transparent(this.__wbg_ptr, isLikeNone(arg0) ? 0xFFFFFF : arg0 ? 1 : 0);
    }
    /**
     * Scale water normal. Decreasing this value will make the water surface rough.
     * @param {number | null} [arg0]
     */
    set waterScaleNormal(arg0) {
        wasm.__wbg_set_polygonmaterial_waterScaleNormal(this.__wbg_ptr, isLikeNone(arg0) ? Number.MAX_SAFE_INTEGER : Math.fround(arg0));
    }
    /**
     * Water wave speed.
     * @param {number | null} [arg0]
     */
    set waterSpeed(arg0) {
        wasm.__wbg_set_polygonmaterial_waterSpeed(this.__wbg_ptr, isLikeNone(arg0) ? Number.MAX_SAFE_INTEGER : Math.fround(arg0));
    }
    /**
     * Apply a water material on the polygon. It might slow down the loading of the mesh.
     * @param {boolean | null} [arg0]
     */
    set water(arg0) {
        wasm.__wbg_set_polygonmaterial_water(this.__wbg_ptr, isLikeNone(arg0) ? 0xFFFFFF : arg0 ? 1 : 0);
    }
    /**
     * @param {boolean | null} [arg0]
     */
    set wireframe(arg0) {
        wasm.__wbg_set_polygonmaterial_wireframe(this.__wbg_ptr, isLikeNone(arg0) ? 0xFFFFFF : arg0 ? 1 : 0);
    }
}
if (Symbol.dispose) PolygonMaterial.prototype[Symbol.dispose] = PolygonMaterial.prototype.free;

export class PolylineGeometry {
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        PolylineGeometryFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_polylinegeometry_free(ptr, 0);
    }
    /**
     * @returns {Float32Array | undefined}
     */
    batch_id() {
        const ret = wasm.polylinegeometry_batch_id(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number | undefined}
     */
    batch_id_size() {
        const ret = wasm.polylinegeometry_batch_id_size(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret;
    }
    /**
     * @returns {Uint32Array | undefined}
     */
    batch_index() {
        const ret = wasm.polylinegeometry_batch_index(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number | undefined}
     */
    batch_index_size() {
        const ret = wasm.polylinegeometry_batch_index_size(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret;
    }
    /**
     * @returns {Float32Array | undefined}
     */
    end_high() {
        const ret = wasm.polylinegeometry_end_high(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number | undefined}
     */
    end_high_size() {
        const ret = wasm.polylinegeometry_end_high_size(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret;
    }
    /**
     * @returns {Float32Array | undefined}
     */
    end_low() {
        const ret = wasm.polylinegeometry_end_low(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number | undefined}
     */
    end_low_size() {
        const ret = wasm.polylinegeometry_end_low_size(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret;
    }
    /**
     * @returns {Float32Array | undefined}
     */
    end_normal_and_texture_coordinate_normalization_x() {
        const ret = wasm.polylinegeometry_end_normal_and_texture_coordinate_normalization_x(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number | undefined}
     */
    end_normal_and_texture_coordinate_normalization_x_size() {
        const ret = wasm.polylinegeometry_end_normal_and_texture_coordinate_normalization_x_size(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret;
    }
    /**
     * @returns {Float32Array | undefined}
     */
    forward_offset() {
        const ret = wasm.polylinegeometry_forward_offset(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number | undefined}
     */
    forward_offset_size() {
        const ret = wasm.polylinegeometry_forward_offset_size(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret;
    }
    /**
     * @returns {Uint32Array}
     */
    indices() {
        const ret = wasm.polylinegeometry_indices(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {Float32Array}
     */
    position() {
        const ret = wasm.polylinegeometry_position(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {Float32Array | undefined}
     */
    position_high() {
        const ret = wasm.polylinegeometry_position_high(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number | undefined}
     */
    position_high_size() {
        const ret = wasm.polylinegeometry_position_high_size(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret;
    }
    /**
     * @returns {Float32Array | undefined}
     */
    position_low() {
        const ret = wasm.polylinegeometry_position_low(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number | undefined}
     */
    position_low_size() {
        const ret = wasm.polylinegeometry_position_low_size(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret;
    }
    /**
     * @returns {number}
     */
    position_size() {
        const ret = wasm.polylinegeometry_position_size(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {Float32Array}
     */
    right_normal_and_texture_coordinate_normalization_y() {
        const ret = wasm.polylinegeometry_right_normal_and_texture_coordinate_normalization_y(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number}
     */
    right_normal_and_texture_coordinate_normalization_y_size() {
        const ret = wasm.polylinegeometry_right_normal_and_texture_coordinate_normalization_y_size(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {Float32Array | undefined}
     */
    start() {
        const ret = wasm.polylinegeometry_start(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {Float32Array | undefined}
     */
    start_high() {
        const ret = wasm.polylinegeometry_start_high(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number | undefined}
     */
    start_high_size() {
        const ret = wasm.polylinegeometry_start_high_size(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret;
    }
    /**
     * @returns {Float32Array | undefined}
     */
    start_low() {
        const ret = wasm.polylinegeometry_start_low(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number | undefined}
     */
    start_low_size() {
        const ret = wasm.polylinegeometry_start_low_size(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret;
    }
    /**
     * @returns {Float32Array | undefined}
     */
    start_normals() {
        const ret = wasm.polylinegeometry_start_normals(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number | undefined}
     */
    start_normals_size() {
        const ret = wasm.polylinegeometry_start_normals_size(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret;
    }
    /**
     * @returns {number | undefined}
     */
    start_size() {
        const ret = wasm.polylinegeometry_start_size(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret;
    }
}
if (Symbol.dispose) PolylineGeometry.prototype[Symbol.dispose] = PolylineGeometry.prototype.free;

export class PolylineGeometryAttributes {
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        PolylineGeometryAttributesFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_polylinegeometryattributes_free(ptr, 0);
    }
    /**
     * @returns {Float32Array | undefined}
     */
    transfer_batch_id() {
        const ret = wasm.polylinegeometryattributes_transfer_batch_id(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number | undefined}
     */
    transfer_batch_id_size() {
        const ret = wasm.polylinegeometryattributes_transfer_batch_id_size(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret;
    }
    /**
     * @returns {Uint32Array | undefined}
     */
    transfer_batch_index() {
        const ret = wasm.polylinegeometryattributes_transfer_batch_index(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number | undefined}
     */
    transfer_batch_index_size() {
        const ret = wasm.polylinegeometryattributes_transfer_batch_index_size(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret;
    }
    /**
     * @returns {Float32Array | undefined}
     */
    transfer_end_high() {
        const ret = wasm.polylinegeometryattributes_transfer_end_high(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number | undefined}
     */
    transfer_end_high_size() {
        const ret = wasm.polylinegeometryattributes_transfer_end_high_size(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret;
    }
    /**
     * @returns {Float32Array | undefined}
     */
    transfer_end_low() {
        const ret = wasm.polylinegeometryattributes_transfer_end_low(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number | undefined}
     */
    transfer_end_low_size() {
        const ret = wasm.polylinegeometryattributes_transfer_end_low_size(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret;
    }
    /**
     * @returns {Float32Array | undefined}
     */
    transfer_end_normal_and_texture_coordinate_normalization_x() {
        const ret = wasm.polylinegeometryattributes_transfer_end_normal_and_texture_coordinate_normalization_x(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number | undefined}
     */
    transfer_end_normal_and_texture_coordinate_normalization_x_size() {
        const ret = wasm.polylinegeometryattributes_transfer_end_normal_and_texture_coordinate_normalization_x_size(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret;
    }
    /**
     * @returns {Float32Array | undefined}
     */
    transfer_forward_offset() {
        const ret = wasm.polylinegeometryattributes_transfer_forward_offset(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number | undefined}
     */
    transfer_forward_offset_size() {
        const ret = wasm.polylinegeometryattributes_transfer_forward_offset_size(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret;
    }
    /**
     * @returns {Float32Array}
     */
    transfer_position() {
        const ret = wasm.polylinegeometryattributes_transfer_position(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {Float32Array | undefined}
     */
    transfer_position_high() {
        const ret = wasm.polylinegeometryattributes_transfer_position_high(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number | undefined}
     */
    transfer_position_high_size() {
        const ret = wasm.polylinegeometryattributes_transfer_position_high_size(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret;
    }
    /**
     * @returns {Float32Array | undefined}
     */
    transfer_position_low() {
        const ret = wasm.polylinegeometryattributes_transfer_position_low(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number | undefined}
     */
    transfer_position_low_size() {
        const ret = wasm.polylinegeometryattributes_transfer_position_low_size(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret;
    }
    /**
     * @returns {number}
     */
    transfer_position_size() {
        const ret = wasm.polylinegeometryattributes_transfer_position_size(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {Float32Array}
     */
    transfer_right_normal_and_texture_coordinate_normalization_y() {
        const ret = wasm.polylinegeometryattributes_transfer_right_normal_and_texture_coordinate_normalization_y(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number}
     */
    transfer_right_normal_and_texture_coordinate_normalization_y_size() {
        const ret = wasm.polylinegeometryattributes_transfer_right_normal_and_texture_coordinate_normalization_y_size(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {Float32Array | undefined}
     */
    transfer_start() {
        const ret = wasm.polylinegeometryattributes_transfer_start(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {Float32Array | undefined}
     */
    transfer_start_high() {
        const ret = wasm.polylinegeometryattributes_transfer_start_high(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number | undefined}
     */
    transfer_start_high_size() {
        const ret = wasm.polylinegeometryattributes_transfer_start_high_size(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret;
    }
    /**
     * @returns {Float32Array | undefined}
     */
    transfer_start_low() {
        const ret = wasm.polylinegeometryattributes_transfer_start_low(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number | undefined}
     */
    transfer_start_low_size() {
        const ret = wasm.polylinegeometryattributes_transfer_start_low_size(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret;
    }
    /**
     * @returns {Float32Array | undefined}
     */
    transfer_start_normals() {
        const ret = wasm.polylinegeometryattributes_transfer_start_normals(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number | undefined}
     */
    transfer_start_normals_size() {
        const ret = wasm.polylinegeometryattributes_transfer_start_normals_size(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret;
    }
    /**
     * @returns {number | undefined}
     */
    transfer_start_size() {
        const ret = wasm.polylinegeometryattributes_transfer_start_size(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret;
    }
}
if (Symbol.dispose) PolylineGeometryAttributes.prototype[Symbol.dispose] = PolylineGeometryAttributes.prototype.free;

export class PolylineInternalMaterial {
    static __wrap(ptr) {
        const obj = Object.create(PolylineInternalMaterial.prototype);
        obj.__wbg_ptr = ptr;
        PolylineInternalMaterialFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        PolylineInternalMaterialFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_polylineinternalmaterial_free(ptr, 0);
    }
    /**
     * @returns {Float64Array}
     */
    get minMaxHeights() {
        const ret = wasm.__wbg_get_polylineinternalmaterial_minMaxHeights(this.__wbg_ptr);
        var v1 = getArrayF64FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 8, 8);
        return v1;
    }
    /**
     * @param {Float64Array} arg0
     */
    set minMaxHeights(arg0) {
        const ptr0 = passArrayF64ToWasm0(arg0, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_polylineinternalmaterial_minMaxHeights(this.__wbg_ptr, ptr0, len0);
    }
}
if (Symbol.dispose) PolylineInternalMaterial.prototype[Symbol.dispose] = PolylineInternalMaterial.prototype.free;

export class PolylineMaterial {
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        PolylineMaterialFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_polylinematerial_free(ptr, 0);
    }
    /**
     * @returns {PolylineInternalMaterial | undefined}
     */
    get __internal__() {
        const ret = wasm.__wbg_get_polylinematerial___internal__(this.__wbg_ptr);
        return ret === 0 ? undefined : PolylineInternalMaterial.__wrap(ret);
    }
    /**
     * @returns {boolean | undefined}
     */
    get castShadow() {
        const ret = wasm.__wbg_get_polylinematerial_castShadow(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret !== 0;
    }
    /**
     * @returns {boolean | undefined}
     */
    get clampToGround() {
        const ret = wasm.__wbg_get_polylinematerial_clampToGround(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret !== 0;
    }
    /**
     * @returns {number | undefined}
     */
    get color() {
        const ret = wasm.__wbg_get_polylinematerial_color(this.__wbg_ptr);
        return ret === Number.MAX_SAFE_INTEGER ? undefined : ret;
    }
    /**
     * Enable writing to depth buffer
     * @returns {boolean | undefined}
     */
    get depthWrite() {
        const ret = wasm.__wbg_get_polylinematerial_depthWrite(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret !== 0;
    }
    /**
     * IDs of selective effects to apply (e.g., "bloom", "outline")
     * @returns {string[] | undefined}
     */
    get effectIds() {
        const ret = wasm.__wbg_get_polylinematerial_effectIds(this.__wbg_ptr);
        let v1;
        if (ret[0] !== 0) {
            v1 = getArrayJsValueFromWasm0(ret[0], ret[1]).slice();
            wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        }
        return v1;
    }
    /**
     * Emissive glow color in 0xRRGGBB format
     * @returns {number | undefined}
     */
    get emissiveColor() {
        const ret = wasm.__wbg_get_polylinematerial_emissiveColor(this.__wbg_ptr);
        return ret === Number.MAX_SAFE_INTEGER ? undefined : ret;
    }
    /**
     * Emissive glow intensity (omitted = 0, no emissive output)
     * @returns {number | undefined}
     */
    get emissiveIntensity() {
        const ret = wasm.__wbg_get_polylinematerial_emissiveIntensity(this.__wbg_ptr);
        return ret === Number.MAX_SAFE_INTEGER ? undefined : ret;
    }
    /**
     * Source geometry types this appearance consumes: `"line"`, `"polygon"`.
     * Defaults to `["line"]`; adding `"polygon"` also renders polygon boundary
     * rings (outer ring and holes) as closed polylines at the ring's base
     * height. Extruded-polygon edges stay the polygon material's `outline`
     * feature.
     * @returns {string[] | undefined}
     */
    get geometryTypes() {
        const ret = wasm.__wbg_get_polylinematerial_geometryTypes(this.__wbg_ptr);
        let v1;
        if (ret[0] !== 0) {
            v1 = getArrayJsValueFromWasm0(ret[0], ret[1]).slice();
            wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        }
        return v1;
    }
    /**
     * @returns {number | undefined}
     */
    get height() {
        const ret = wasm.__wbg_get_polylinematerial_height(this.__wbg_ptr);
        return ret === Number.MAX_SAFE_INTEGER ? undefined : ret;
    }
    /**
     * Applies the lighting equation to the color output. When `false` the
     * material outputs plain albedo (for deferred lighting) while normals and
     * the shadow G-buffer keep being written.
     * @returns {boolean | undefined}
     */
    get lit() {
        const ret = wasm.__wbg_get_polylinematerial_lit(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret !== 0;
    }
    /**
     * Maximum line width in pixels, clamping the rendered width regardless of zoom level.
     * Smaller values are cheaper to render as they reduce fragment shader overdraw.
     * @returns {number | undefined}
     */
    get maxWidth() {
        const ret = wasm.__wbg_get_polylinematerial_maxWidth(this.__wbg_ptr);
        return ret === Number.MAX_SAFE_INTEGER ? undefined : ret;
    }
    /**
     * Opacity value
     * @returns {number | undefined}
     */
    get opacity() {
        const ret = wasm.__wbg_get_polylinematerial_opacity(this.__wbg_ptr);
        return ret === Number.MAX_SAFE_INTEGER ? undefined : ret;
    }
    /**
     * @returns {boolean | undefined}
     */
    get receiveShadow() {
        const ret = wasm.__wbg_get_polylinematerial_receiveShadow(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret !== 0;
    }
    /**
     * @returns {boolean | undefined}
     */
    get show() {
        const ret = wasm.__wbg_get_polylinematerial_show(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret !== 0;
    }
    /**
     * Splits the polyline into XYZ vector tiles for rendering, even when the
     * data source is not an MVT layer. This can improve performance for large
     * polylines.
     *
     * Enabling `clamp_to_ground` implicitly forces `tiled` to `true`.
     * @returns {boolean | undefined}
     */
    get tiled() {
        const ret = wasm.__wbg_get_polylinematerial_tiled(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret !== 0;
    }
    /**
     * Enable transparency and alpha blending
     * @returns {boolean | undefined}
     */
    get transparent() {
        const ret = wasm.__wbg_get_polylinematerial_transparent(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret !== 0;
    }
    /**
     * @returns {number | undefined}
     */
    get width() {
        const ret = wasm.__wbg_get_polylinematerial_width(this.__wbg_ptr);
        return ret === Number.MAX_SAFE_INTEGER ? undefined : ret;
    }
    /**
     * @param {boolean | null} [show]
     * @param {boolean | null} [cast_shadow]
     * @param {boolean | null} [receive_shadow]
     * @param {number | null} [color]
     * @param {boolean | null} [clamp_to_ground]
     * @param {boolean | null} [tiled]
     * @param {number | null} [height]
     * @param {number | null} [width]
     * @param {number | null} [max_width]
     * @param {PolylineInternalMaterial | null} [__internal__]
     */
    constructor(show, cast_shadow, receive_shadow, color, clamp_to_ground, tiled, height, width, max_width, __internal__) {
        let ptr0 = 0;
        if (!isLikeNone(__internal__)) {
            _assertClass(__internal__, PolylineInternalMaterial);
            ptr0 = __internal__.__destroy_into_raw();
        }
        const ret = wasm.polylinematerial_new(isLikeNone(show) ? 0xFFFFFF : show ? 1 : 0, isLikeNone(cast_shadow) ? 0xFFFFFF : cast_shadow ? 1 : 0, isLikeNone(receive_shadow) ? 0xFFFFFF : receive_shadow ? 1 : 0, isLikeNone(color) ? Number.MAX_SAFE_INTEGER : (color) >>> 0, isLikeNone(clamp_to_ground) ? 0xFFFFFF : clamp_to_ground ? 1 : 0, isLikeNone(tiled) ? 0xFFFFFF : tiled ? 1 : 0, isLikeNone(height) ? Number.MAX_SAFE_INTEGER : Math.fround(height), isLikeNone(width) ? Number.MAX_SAFE_INTEGER : Math.fround(width), isLikeNone(max_width) ? Number.MAX_SAFE_INTEGER : Math.fround(max_width), ptr0);
        this.__wbg_ptr = ret;
        PolylineMaterialFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * @param {PolylineInternalMaterial | null} [arg0]
     */
    set __internal__(arg0) {
        let ptr0 = 0;
        if (!isLikeNone(arg0)) {
            _assertClass(arg0, PolylineInternalMaterial);
            ptr0 = arg0.__destroy_into_raw();
        }
        wasm.__wbg_set_polylinematerial___internal__(this.__wbg_ptr, ptr0);
    }
    /**
     * @param {boolean | null} [arg0]
     */
    set castShadow(arg0) {
        wasm.__wbg_set_polylinematerial_castShadow(this.__wbg_ptr, isLikeNone(arg0) ? 0xFFFFFF : arg0 ? 1 : 0);
    }
    /**
     * @param {boolean | null} [arg0]
     */
    set clampToGround(arg0) {
        wasm.__wbg_set_polylinematerial_clampToGround(this.__wbg_ptr, isLikeNone(arg0) ? 0xFFFFFF : arg0 ? 1 : 0);
    }
    /**
     * @param {number | null} [arg0]
     */
    set color(arg0) {
        wasm.__wbg_set_polylinematerial_color(this.__wbg_ptr, isLikeNone(arg0) ? Number.MAX_SAFE_INTEGER : (arg0) >>> 0);
    }
    /**
     * Enable writing to depth buffer
     * @param {boolean | null} [arg0]
     */
    set depthWrite(arg0) {
        wasm.__wbg_set_polylinematerial_depthWrite(this.__wbg_ptr, isLikeNone(arg0) ? 0xFFFFFF : arg0 ? 1 : 0);
    }
    /**
     * IDs of selective effects to apply (e.g., "bloom", "outline")
     * @param {string[] | null} [arg0]
     */
    set effectIds(arg0) {
        var ptr0 = isLikeNone(arg0) ? 0 : passArrayJsValueToWasm0(arg0, wasm.__wbindgen_malloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_polylinematerial_effectIds(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * Emissive glow color in 0xRRGGBB format
     * @param {number | null} [arg0]
     */
    set emissiveColor(arg0) {
        wasm.__wbg_set_polylinematerial_emissiveColor(this.__wbg_ptr, isLikeNone(arg0) ? Number.MAX_SAFE_INTEGER : (arg0) >>> 0);
    }
    /**
     * Emissive glow intensity (omitted = 0, no emissive output)
     * @param {number | null} [arg0]
     */
    set emissiveIntensity(arg0) {
        wasm.__wbg_set_polylinematerial_emissiveIntensity(this.__wbg_ptr, isLikeNone(arg0) ? Number.MAX_SAFE_INTEGER : Math.fround(arg0));
    }
    /**
     * Source geometry types this appearance consumes: `"line"`, `"polygon"`.
     * Defaults to `["line"]`; adding `"polygon"` also renders polygon boundary
     * rings (outer ring and holes) as closed polylines at the ring's base
     * height. Extruded-polygon edges stay the polygon material's `outline`
     * feature.
     * @param {string[] | null} [arg0]
     */
    set geometryTypes(arg0) {
        var ptr0 = isLikeNone(arg0) ? 0 : passArrayJsValueToWasm0(arg0, wasm.__wbindgen_malloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_polylinematerial_geometryTypes(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @param {number | null} [arg0]
     */
    set height(arg0) {
        wasm.__wbg_set_polylinematerial_height(this.__wbg_ptr, isLikeNone(arg0) ? Number.MAX_SAFE_INTEGER : Math.fround(arg0));
    }
    /**
     * Applies the lighting equation to the color output. When `false` the
     * material outputs plain albedo (for deferred lighting) while normals and
     * the shadow G-buffer keep being written.
     * @param {boolean | null} [arg0]
     */
    set lit(arg0) {
        wasm.__wbg_set_polylinematerial_lit(this.__wbg_ptr, isLikeNone(arg0) ? 0xFFFFFF : arg0 ? 1 : 0);
    }
    /**
     * Maximum line width in pixels, clamping the rendered width regardless of zoom level.
     * Smaller values are cheaper to render as they reduce fragment shader overdraw.
     * @param {number | null} [arg0]
     */
    set maxWidth(arg0) {
        wasm.__wbg_set_polylinematerial_maxWidth(this.__wbg_ptr, isLikeNone(arg0) ? Number.MAX_SAFE_INTEGER : Math.fround(arg0));
    }
    /**
     * Opacity value
     * @param {number | null} [arg0]
     */
    set opacity(arg0) {
        wasm.__wbg_set_polylinematerial_opacity(this.__wbg_ptr, isLikeNone(arg0) ? Number.MAX_SAFE_INTEGER : Math.fround(arg0));
    }
    /**
     * @param {boolean | null} [arg0]
     */
    set receiveShadow(arg0) {
        wasm.__wbg_set_polylinematerial_receiveShadow(this.__wbg_ptr, isLikeNone(arg0) ? 0xFFFFFF : arg0 ? 1 : 0);
    }
    /**
     * @param {boolean | null} [arg0]
     */
    set show(arg0) {
        wasm.__wbg_set_polylinematerial_show(this.__wbg_ptr, isLikeNone(arg0) ? 0xFFFFFF : arg0 ? 1 : 0);
    }
    /**
     * Splits the polyline into XYZ vector tiles for rendering, even when the
     * data source is not an MVT layer. This can improve performance for large
     * polylines.
     *
     * Enabling `clamp_to_ground` implicitly forces `tiled` to `true`.
     * @param {boolean | null} [arg0]
     */
    set tiled(arg0) {
        wasm.__wbg_set_polylinematerial_tiled(this.__wbg_ptr, isLikeNone(arg0) ? 0xFFFFFF : arg0 ? 1 : 0);
    }
    /**
     * Enable transparency and alpha blending
     * @param {boolean | null} [arg0]
     */
    set transparent(arg0) {
        wasm.__wbg_set_polylinematerial_transparent(this.__wbg_ptr, isLikeNone(arg0) ? 0xFFFFFF : arg0 ? 1 : 0);
    }
    /**
     * @param {number | null} [arg0]
     */
    set width(arg0) {
        wasm.__wbg_set_polylinematerial_width(this.__wbg_ptr, isLikeNone(arg0) ? Number.MAX_SAFE_INTEGER : Math.fround(arg0));
    }
}
if (Symbol.dispose) PolylineMaterial.prototype[Symbol.dispose] = PolylineMaterial.prototype.free;

/**
 * Render-only appearance for a `raster` layer's imagery. All fetch/tiling
 * config lives on the referenced `Source`; only display fields are carried
 * here. Parallel to [`HillshadeMaterial`] / [`ElevationHeatmapMaterial`].
 */
export class RasterMaterial {
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        RasterMaterialFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_rastermaterial_free(ptr, 0);
    }
    /**
     * @returns {number | undefined}
     */
    get color() {
        const ret = wasm.__wbg_get_rastermaterial_color(this.__wbg_ptr);
        return ret === Number.MAX_SAFE_INTEGER ? undefined : ret;
    }
    /**
     * @returns {number | undefined}
     */
    get opacity() {
        const ret = wasm.__wbg_get_rastermaterial_opacity(this.__wbg_ptr);
        return ret === Number.MAX_SAFE_INTEGER ? undefined : ret;
    }
    /**
     * @returns {boolean | undefined}
     */
    get showBoundingBox() {
        const ret = wasm.__wbg_get_rastermaterial_showBoundingBox(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret !== 0;
    }
    /**
     * @returns {boolean | undefined}
     */
    get show() {
        const ret = wasm.__wbg_get_rastermaterial_show(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret !== 0;
    }
    /**
     * @param {number | null} [arg0]
     */
    set color(arg0) {
        wasm.__wbg_set_rastermaterial_color(this.__wbg_ptr, isLikeNone(arg0) ? Number.MAX_SAFE_INTEGER : (arg0) >>> 0);
    }
    /**
     * @param {number | null} [arg0]
     */
    set opacity(arg0) {
        wasm.__wbg_set_rastermaterial_opacity(this.__wbg_ptr, isLikeNone(arg0) ? Number.MAX_SAFE_INTEGER : Math.fround(arg0));
    }
    /**
     * @param {boolean | null} [arg0]
     */
    set showBoundingBox(arg0) {
        wasm.__wbg_set_rastermaterial_showBoundingBox(this.__wbg_ptr, isLikeNone(arg0) ? 0xFFFFFF : arg0 ? 1 : 0);
    }
    /**
     * @param {boolean | null} [arg0]
     */
    set show(arg0) {
        wasm.__wbg_set_rastermaterial_show(this.__wbg_ptr, isLikeNone(arg0) ? 0xFFFFFF : arg0 ? 1 : 0);
    }
}
if (Symbol.dispose) RasterMaterial.prototype[Symbol.dispose] = RasterMaterial.prototype.free;

export class RasterTileInternalMaterial {
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        RasterTileInternalMaterialFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_rastertileinternalmaterial_free(ptr, 0);
    }
    /**
     * @returns {boolean | undefined}
     */
    get castShadow() {
        const ret = wasm.__wbg_get_rastertileinternalmaterial_castShadow(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret !== 0;
    }
    /**
     * @returns {Uint32Array}
     */
    get colors() {
        const ret = wasm.__wbg_get_rastertileinternalmaterial_colors(this.__wbg_ptr);
        var v1 = getArrayU32FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v1;
    }
    /**
     * @returns {number}
     */
    get elevationBScaler() {
        const ret = wasm.__wbg_get_rastertileinternalmaterial_elevationBScaler(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number}
     */
    get elevationBoundary() {
        const ret = wasm.__wbg_get_rastertileinternalmaterial_elevationBoundary(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number}
     */
    get elevationEpsilon() {
        const ret = wasm.__wbg_get_rastertileinternalmaterial_elevationEpsilon(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number}
     */
    get elevationGScaler() {
        const ret = wasm.__wbg_get_rastertileinternalmaterial_elevationGScaler(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number}
     */
    get elevationMaxHeight() {
        const ret = wasm.__wbg_get_rastertileinternalmaterial_elevationMaxHeight(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number}
     */
    get elevationMaxOffset() {
        const ret = wasm.__wbg_get_rastertileinternalmaterial_elevationMaxOffset(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number}
     */
    get elevationMinHeight() {
        const ret = wasm.__wbg_get_rastertileinternalmaterial_elevationMinHeight(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number}
     */
    get elevationMinOffset() {
        const ret = wasm.__wbg_get_rastertileinternalmaterial_elevationMinOffset(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number}
     */
    get elevationOffset() {
        const ret = wasm.__wbg_get_rastertileinternalmaterial_elevationOffset(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number}
     */
    get elevationRScaler() {
        const ret = wasm.__wbg_get_rastertileinternalmaterial_elevationRScaler(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number}
     */
    get hillshadeBScaler() {
        const ret = wasm.__wbg_get_rastertileinternalmaterial_hillshadeBScaler(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number}
     */
    get hillshadeBoundary() {
        const ret = wasm.__wbg_get_rastertileinternalmaterial_hillshadeBoundary(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number}
     */
    get hillshadeEpsilon() {
        const ret = wasm.__wbg_get_rastertileinternalmaterial_hillshadeEpsilon(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number}
     */
    get hillshadeExaggeration() {
        const ret = wasm.__wbg_get_rastertileinternalmaterial_hillshadeExaggeration(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number}
     */
    get hillshadeGScaler() {
        const ret = wasm.__wbg_get_rastertileinternalmaterial_hillshadeGScaler(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number}
     */
    get hillshadeMaxOffset() {
        const ret = wasm.__wbg_get_rastertileinternalmaterial_hillshadeMaxOffset(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number}
     */
    get hillshadeMinOffset() {
        const ret = wasm.__wbg_get_rastertileinternalmaterial_hillshadeMinOffset(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number}
     */
    get hillshadeOffset() {
        const ret = wasm.__wbg_get_rastertileinternalmaterial_hillshadeOffset(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number}
     */
    get hillshadeRScaler() {
        const ret = wasm.__wbg_get_rastertileinternalmaterial_hillshadeRScaler(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {Uint8Array}
     */
    get isElevationHeatmaps() {
        const ret = wasm.__wbg_get_rastertileinternalmaterial_isElevationHeatmaps(this.__wbg_ptr);
        var v1 = getArrayU8FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        return v1;
    }
    /**
     * @returns {Uint8Array}
     */
    get isHillshades() {
        const ret = wasm.__wbg_get_rastertileinternalmaterial_isHillshades(this.__wbg_ptr);
        var v1 = getArrayU8FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        return v1;
    }
    /**
     * @returns {Uint8Array}
     */
    get layerReproject() {
        const ret = wasm.__wbg_get_rastertileinternalmaterial_layerReproject(this.__wbg_ptr);
        var v1 = getArrayU8FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        return v1;
    }
    /**
     * Applies the lighting equation to the color output. When `false` the
     * material outputs plain albedo (for deferred lighting) while normals and
     * the shadow G-buffer keep being written.
     * @returns {boolean | undefined}
     */
    get lit() {
        const ret = wasm.__wbg_get_rastertileinternalmaterial_lit(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret !== 0;
    }
    /**
     * @returns {number}
     */
    get logBoundary() {
        const ret = wasm.__wbg_get_rastertileinternalmaterial_logBoundary(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {boolean}
     */
    get logarithmic() {
        const ret = wasm.__wbg_get_rastertileinternalmaterial_logarithmic(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * @returns {Float32Array}
     */
    get opacities() {
        const ret = wasm.__wbg_get_rastertileinternalmaterial_opacities(this.__wbg_ptr);
        var v1 = getArrayF32FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v1;
    }
    /**
     * @returns {boolean | undefined}
     */
    get receiveShadow() {
        const ret = wasm.__wbg_get_rastertileinternalmaterial_receiveShadow(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret !== 0;
    }
    /**
     * @returns {boolean | undefined}
     */
    get showBoundingBox() {
        const ret = wasm.__wbg_get_rastertileinternalmaterial_showBoundingBox(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret !== 0;
    }
    /**
     * @returns {Uint8Array}
     */
    get shows() {
        const ret = wasm.__wbg_get_rastertileinternalmaterial_shows(this.__wbg_ptr);
        var v1 = getArrayU8FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        return v1;
    }
    /**
     * @returns {Float32Array}
     */
    get terrainLatRange() {
        const ret = wasm.__wbg_get_rastertileinternalmaterial_terrainLatRange(this.__wbg_ptr);
        var v1 = getArrayF32FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v1;
    }
    /**
     * @returns {any[]}
     */
    layerUvTransforms() {
        const ret = wasm.rastertileinternalmaterial_layerUvTransforms(this.__wbg_ptr);
        var v1 = getArrayJsValueFromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v1;
    }
    /**
     * @returns {any[] | undefined}
     */
    texture_fragments() {
        const ret = wasm.rastertileinternalmaterial_texture_fragments(this.__wbg_ptr);
        let v1;
        if (ret[0] !== 0) {
            v1 = getArrayJsValueFromWasm0(ret[0], ret[1]).slice();
            wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        }
        return v1;
    }
    /**
     * @param {boolean | null} [arg0]
     */
    set castShadow(arg0) {
        wasm.__wbg_set_rastertileinternalmaterial_castShadow(this.__wbg_ptr, isLikeNone(arg0) ? 0xFFFFFF : arg0 ? 1 : 0);
    }
    /**
     * @param {Uint32Array} arg0
     */
    set colors(arg0) {
        const ptr0 = passArray32ToWasm0(arg0, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_rastertileinternalmaterial_colors(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @param {number} arg0
     */
    set elevationBScaler(arg0) {
        wasm.__wbg_set_rastertileinternalmaterial_elevationBScaler(this.__wbg_ptr, arg0);
    }
    /**
     * @param {number} arg0
     */
    set elevationBoundary(arg0) {
        wasm.__wbg_set_rastertileinternalmaterial_elevationBoundary(this.__wbg_ptr, arg0);
    }
    /**
     * @param {number} arg0
     */
    set elevationEpsilon(arg0) {
        wasm.__wbg_set_rastertileinternalmaterial_elevationEpsilon(this.__wbg_ptr, arg0);
    }
    /**
     * @param {number} arg0
     */
    set elevationGScaler(arg0) {
        wasm.__wbg_set_rastertileinternalmaterial_elevationGScaler(this.__wbg_ptr, arg0);
    }
    /**
     * @param {number} arg0
     */
    set elevationMaxHeight(arg0) {
        wasm.__wbg_set_rastertileinternalmaterial_elevationMaxHeight(this.__wbg_ptr, arg0);
    }
    /**
     * @param {number} arg0
     */
    set elevationMaxOffset(arg0) {
        wasm.__wbg_set_rastertileinternalmaterial_elevationMaxOffset(this.__wbg_ptr, arg0);
    }
    /**
     * @param {number} arg0
     */
    set elevationMinHeight(arg0) {
        wasm.__wbg_set_rastertileinternalmaterial_elevationMinHeight(this.__wbg_ptr, arg0);
    }
    /**
     * @param {number} arg0
     */
    set elevationMinOffset(arg0) {
        wasm.__wbg_set_rastertileinternalmaterial_elevationMinOffset(this.__wbg_ptr, arg0);
    }
    /**
     * @param {number} arg0
     */
    set elevationOffset(arg0) {
        wasm.__wbg_set_rastertileinternalmaterial_elevationOffset(this.__wbg_ptr, arg0);
    }
    /**
     * @param {number} arg0
     */
    set elevationRScaler(arg0) {
        wasm.__wbg_set_rastertileinternalmaterial_elevationRScaler(this.__wbg_ptr, arg0);
    }
    /**
     * @param {number} arg0
     */
    set hillshadeBScaler(arg0) {
        wasm.__wbg_set_rastertileinternalmaterial_hillshadeBScaler(this.__wbg_ptr, arg0);
    }
    /**
     * @param {number} arg0
     */
    set hillshadeBoundary(arg0) {
        wasm.__wbg_set_rastertileinternalmaterial_hillshadeBoundary(this.__wbg_ptr, arg0);
    }
    /**
     * @param {number} arg0
     */
    set hillshadeEpsilon(arg0) {
        wasm.__wbg_set_rastertileinternalmaterial_hillshadeEpsilon(this.__wbg_ptr, arg0);
    }
    /**
     * @param {number} arg0
     */
    set hillshadeExaggeration(arg0) {
        wasm.__wbg_set_rastertileinternalmaterial_hillshadeExaggeration(this.__wbg_ptr, arg0);
    }
    /**
     * @param {number} arg0
     */
    set hillshadeGScaler(arg0) {
        wasm.__wbg_set_rastertileinternalmaterial_hillshadeGScaler(this.__wbg_ptr, arg0);
    }
    /**
     * @param {number} arg0
     */
    set hillshadeMaxOffset(arg0) {
        wasm.__wbg_set_rastertileinternalmaterial_hillshadeMaxOffset(this.__wbg_ptr, arg0);
    }
    /**
     * @param {number} arg0
     */
    set hillshadeMinOffset(arg0) {
        wasm.__wbg_set_rastertileinternalmaterial_hillshadeMinOffset(this.__wbg_ptr, arg0);
    }
    /**
     * @param {number} arg0
     */
    set hillshadeOffset(arg0) {
        wasm.__wbg_set_rastertileinternalmaterial_hillshadeOffset(this.__wbg_ptr, arg0);
    }
    /**
     * @param {number} arg0
     */
    set hillshadeRScaler(arg0) {
        wasm.__wbg_set_rastertileinternalmaterial_hillshadeRScaler(this.__wbg_ptr, arg0);
    }
    /**
     * @param {Uint8Array} arg0
     */
    set isElevationHeatmaps(arg0) {
        const ptr0 = passArray8ToWasm0(arg0, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_rastertileinternalmaterial_isElevationHeatmaps(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @param {Uint8Array} arg0
     */
    set isHillshades(arg0) {
        const ptr0 = passArray8ToWasm0(arg0, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_rastertileinternalmaterial_isHillshades(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @param {Uint8Array} arg0
     */
    set layerReproject(arg0) {
        const ptr0 = passArray8ToWasm0(arg0, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_rastertileinternalmaterial_layerReproject(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * Applies the lighting equation to the color output. When `false` the
     * material outputs plain albedo (for deferred lighting) while normals and
     * the shadow G-buffer keep being written.
     * @param {boolean | null} [arg0]
     */
    set lit(arg0) {
        wasm.__wbg_set_rastertileinternalmaterial_lit(this.__wbg_ptr, isLikeNone(arg0) ? 0xFFFFFF : arg0 ? 1 : 0);
    }
    /**
     * @param {number} arg0
     */
    set logBoundary(arg0) {
        wasm.__wbg_set_rastertileinternalmaterial_logBoundary(this.__wbg_ptr, arg0);
    }
    /**
     * @param {boolean} arg0
     */
    set logarithmic(arg0) {
        wasm.__wbg_set_rastertileinternalmaterial_logarithmic(this.__wbg_ptr, arg0);
    }
    /**
     * @param {Float32Array} arg0
     */
    set opacities(arg0) {
        const ptr0 = passArrayF32ToWasm0(arg0, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_rastertileinternalmaterial_opacities(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @param {boolean | null} [arg0]
     */
    set receiveShadow(arg0) {
        wasm.__wbg_set_rastertileinternalmaterial_receiveShadow(this.__wbg_ptr, isLikeNone(arg0) ? 0xFFFFFF : arg0 ? 1 : 0);
    }
    /**
     * @param {boolean | null} [arg0]
     */
    set showBoundingBox(arg0) {
        wasm.__wbg_set_rastertileinternalmaterial_showBoundingBox(this.__wbg_ptr, isLikeNone(arg0) ? 0xFFFFFF : arg0 ? 1 : 0);
    }
    /**
     * @param {Uint8Array} arg0
     */
    set shows(arg0) {
        const ptr0 = passArray8ToWasm0(arg0, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_rastertileinternalmaterial_shows(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @param {Float32Array} arg0
     */
    set terrainLatRange(arg0) {
        const ptr0 = passArrayF32ToWasm0(arg0, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_rastertileinternalmaterial_terrainLatRange(this.__wbg_ptr, ptr0, len0);
    }
}
if (Symbol.dispose) RasterTileInternalMaterial.prototype[Symbol.dispose] = RasterTileInternalMaterial.prototype.free;

export class Ray {
    static __wrap(ptr) {
        const obj = Object.create(Ray.prototype);
        obj.__wbg_ptr = ptr;
        RayFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        RayFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_ray_free(ptr, 0);
    }
    /**
     * @returns {Vec3}
     */
    get direction() {
        const ret = wasm.__wbg_get_ray_direction(this.__wbg_ptr);
        return Vec3.__wrap(ret);
    }
    /**
     * @returns {Vec3}
     */
    get origin() {
        const ret = wasm.__wbg_get_ray_origin(this.__wbg_ptr);
        return Vec3.__wrap(ret);
    }
    /**
     * @param {number} t
     * @returns {Vec3}
     */
    getPoint(t) {
        const ret = wasm.ray_getPoint(this.__wbg_ptr, t);
        return Vec3.__wrap(ret);
    }
    /**
     * @param {Vec3} origin
     * @param {Vec3} direction
     */
    constructor(origin, direction) {
        _assertClass(origin, Vec3);
        var ptr0 = origin.__destroy_into_raw();
        _assertClass(direction, Vec3);
        var ptr1 = direction.__destroy_into_raw();
        const ret = wasm.ray_new(ptr0, ptr1);
        this.__wbg_ptr = ret;
        RayFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * @param {Vec3} arg0
     */
    set direction(arg0) {
        _assertClass(arg0, Vec3);
        var ptr0 = arg0.__destroy_into_raw();
        wasm.__wbg_set_ray_direction(this.__wbg_ptr, ptr0);
    }
    /**
     * @param {Vec3} arg0
     */
    set origin(arg0) {
        _assertClass(arg0, Vec3);
        var ptr0 = arg0.__destroy_into_raw();
        wasm.__wbg_set_ray_origin(this.__wbg_ptr, ptr0);
    }
}
if (Symbol.dispose) Ray.prototype[Symbol.dispose] = Ray.prototype.free;

export class ReturnedConstructedTerrainMesh {
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        ReturnedConstructedTerrainMeshFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_returnedconstructedterrainmesh_free(ptr, 0);
    }
    /**
     * @returns {number}
     */
    get max_height() {
        const ret = wasm.__wbg_get_returnedconstructedterrainmesh_max_height(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number}
     */
    get min_height() {
        const ret = wasm.__wbg_get_returnedconstructedterrainmesh_min_height(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {Vec3 | undefined}
     */
    get rtc_translation() {
        const ret = wasm.__wbg_get_returnedconstructedterrainmesh_rtc_translation(this.__wbg_ptr);
        return ret === 0 ? undefined : Vec3.__wrap(ret);
    }
    /**
     * @returns {boolean}
     */
    hasNormals() {
        const ret = wasm.returnedconstructedterrainmesh_hasNormals(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * @returns {boolean}
     */
    hasSkirt() {
        const ret = wasm.returnedconstructedterrainmesh_hasSkirt(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * @returns {boolean}
     */
    hasWatermask() {
        const ret = wasm.returnedconstructedterrainmesh_hasWatermask(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * @param {Geometry} geometry
     * @param {number} max_height
     * @param {number} min_height
     * @param {Float32Array} heights
     * @param {Vec3 | null} [rtc_translation]
     */
    constructor(geometry, max_height, min_height, heights, rtc_translation) {
        _assertClass(geometry, Geometry);
        var ptr0 = geometry.__destroy_into_raw();
        const ptr1 = passArrayF32ToWasm0(heights, wasm.__wbindgen_malloc);
        const len1 = WASM_VECTOR_LEN;
        let ptr2 = 0;
        if (!isLikeNone(rtc_translation)) {
            _assertClass(rtc_translation, Vec3);
            ptr2 = rtc_translation.__destroy_into_raw();
        }
        const ret = wasm.returnedconstructedterrainmesh_new(ptr0, max_height, min_height, ptr1, len1, ptr2);
        this.__wbg_ptr = ret;
        ReturnedConstructedTerrainMeshFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * @returns {Float32Array}
     */
    transferHeights() {
        const ret = wasm.returnedconstructedterrainmesh_transferHeights(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {Uint32Array}
     */
    transferIndices() {
        const ret = wasm.returnedconstructedterrainmesh_transferIndices(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {Float32Array | undefined}
     */
    transferNormals() {
        const ret = wasm.returnedconstructedterrainmesh_transferNormals(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {Uint32Array | undefined}
     */
    transferSkirtIndices() {
        const ret = wasm.returnedconstructedterrainmesh_transferSkirtIndices(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {Float32Array | undefined}
     */
    transferSkirtNormals() {
        const ret = wasm.returnedconstructedterrainmesh_transferSkirtNormals(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {Float32Array | undefined}
     */
    transferSkirtUvs() {
        const ret = wasm.returnedconstructedterrainmesh_transferSkirtUvs(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {Float32Array | undefined}
     */
    transferSkirtVertices() {
        const ret = wasm.returnedconstructedterrainmesh_transferSkirtVertices(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {Float32Array}
     */
    transferUvs() {
        const ret = wasm.returnedconstructedterrainmesh_transferUvs(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {Float32Array}
     */
    transferVertices() {
        const ret = wasm.returnedconstructedterrainmesh_transferVertices(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {Uint8Array | undefined}
     */
    transferWatermask() {
        const ret = wasm.returnedconstructedterrainmesh_transferWatermask(this.__wbg_ptr);
        return ret;
    }
    /**
     * @param {number} arg0
     */
    set max_height(arg0) {
        wasm.__wbg_set_returnedconstructedterrainmesh_max_height(this.__wbg_ptr, arg0);
    }
    /**
     * @param {number} arg0
     */
    set min_height(arg0) {
        wasm.__wbg_set_returnedconstructedterrainmesh_min_height(this.__wbg_ptr, arg0);
    }
    /**
     * @param {Vec3 | null} [arg0]
     */
    set rtc_translation(arg0) {
        let ptr0 = 0;
        if (!isLikeNone(arg0)) {
            _assertClass(arg0, Vec3);
            ptr0 = arg0.__destroy_into_raw();
        }
        wasm.__wbg_set_returnedconstructedterrainmesh_rtc_translation(this.__wbg_ptr, ptr0);
    }
}
if (Symbol.dispose) ReturnedConstructedTerrainMesh.prototype[Symbol.dispose] = ReturnedConstructedTerrainMesh.prototype.free;

/**
 * Render-only appearance for a `terrain` layer's mesh, regardless of the
 * referenced source's data format (raster-dem, quantized-mesh, or the
 * source-less ellipsoid). All fetch/geometry config lives on the referenced
 * `Source`; the data format itself is carried by `TerrainDataType`.
 */
export class TerrainMaterial {
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        TerrainMaterialFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_terrainmaterial_free(ptr, 0);
    }
    /**
     * @returns {boolean | undefined}
     */
    get castShadow() {
        const ret = wasm.__wbg_get_terrainmaterial_castShadow(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret !== 0;
    }
    /**
     * Applies the lighting equation to the color output. When `false` the
     * material outputs plain albedo (for deferred lighting) while normals and
     * the shadow G-buffer keep being written.
     * @returns {boolean | undefined}
     */
    get lit() {
        const ret = wasm.__wbg_get_terrainmaterial_lit(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret !== 0;
    }
    /**
     * @returns {boolean | undefined}
     */
    get receiveShadow() {
        const ret = wasm.__wbg_get_terrainmaterial_receiveShadow(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret !== 0;
    }
    /**
     * @returns {boolean | undefined}
     */
    get showBoundingBox() {
        const ret = wasm.__wbg_get_terrainmaterial_showBoundingBox(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret !== 0;
    }
    /**
     * @returns {boolean | undefined}
     */
    get show() {
        const ret = wasm.__wbg_get_terrainmaterial_show(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret !== 0;
    }
    /**
     * Multiplier for the automatically calculated skirt height.
     * A value of 1.0 uses the default calculated height.
     * @returns {number | undefined}
     */
    get skirtExaggeration() {
        const ret = wasm.__wbg_get_terrainmaterial_skirtExaggeration(this.__wbg_ptr);
        return ret === Number.MAX_SAFE_INTEGER ? undefined : ret;
    }
    /**
     * Whether to render skirts along tile boundaries to hide gaps.
     * You should disable `skirt` if you want to visualize an underground model.
     * @returns {boolean | undefined}
     */
    get skirt() {
        const ret = wasm.__wbg_get_terrainmaterial_skirt(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret !== 0;
    }
    /**
     * @param {boolean | null} [arg0]
     */
    set castShadow(arg0) {
        wasm.__wbg_set_terrainmaterial_castShadow(this.__wbg_ptr, isLikeNone(arg0) ? 0xFFFFFF : arg0 ? 1 : 0);
    }
    /**
     * Applies the lighting equation to the color output. When `false` the
     * material outputs plain albedo (for deferred lighting) while normals and
     * the shadow G-buffer keep being written.
     * @param {boolean | null} [arg0]
     */
    set lit(arg0) {
        wasm.__wbg_set_terrainmaterial_lit(this.__wbg_ptr, isLikeNone(arg0) ? 0xFFFFFF : arg0 ? 1 : 0);
    }
    /**
     * @param {boolean | null} [arg0]
     */
    set receiveShadow(arg0) {
        wasm.__wbg_set_terrainmaterial_receiveShadow(this.__wbg_ptr, isLikeNone(arg0) ? 0xFFFFFF : arg0 ? 1 : 0);
    }
    /**
     * @param {boolean | null} [arg0]
     */
    set showBoundingBox(arg0) {
        wasm.__wbg_set_terrainmaterial_showBoundingBox(this.__wbg_ptr, isLikeNone(arg0) ? 0xFFFFFF : arg0 ? 1 : 0);
    }
    /**
     * @param {boolean | null} [arg0]
     */
    set show(arg0) {
        wasm.__wbg_set_terrainmaterial_show(this.__wbg_ptr, isLikeNone(arg0) ? 0xFFFFFF : arg0 ? 1 : 0);
    }
    /**
     * Multiplier for the automatically calculated skirt height.
     * A value of 1.0 uses the default calculated height.
     * @param {number | null} [arg0]
     */
    set skirtExaggeration(arg0) {
        wasm.__wbg_set_terrainmaterial_skirtExaggeration(this.__wbg_ptr, isLikeNone(arg0) ? Number.MAX_SAFE_INTEGER : Math.fround(arg0));
    }
    /**
     * Whether to render skirts along tile boundaries to hide gaps.
     * You should disable `skirt` if you want to visualize an underground model.
     * @param {boolean | null} [arg0]
     */
    set skirt(arg0) {
        wasm.__wbg_set_terrainmaterial_skirt(this.__wbg_ptr, isLikeNone(arg0) ? 0xFFFFFF : arg0 ? 1 : 0);
    }
}
if (Symbol.dispose) TerrainMaterial.prototype[Symbol.dispose] = TerrainMaterial.prototype.free;

export class TextMaterial {
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        TextMaterialFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_textmaterial_free(ptr, 0);
    }
    /**
     * Whether faces seen from behind are culled. Default is false, so a
     * quad frozen in its anchor's frame (`rotateWithCamera: false`) stays
     * visible from behind. Turn it on to hide a flat quad's parts that wrap
     * over the horizon, which face away from the camera.
     * @returns {boolean | undefined}
     */
    get backfaceCulling() {
        const ret = wasm.__wbg_get_textmaterial_backfaceCulling(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret !== 0;
    }
    /**
     * @returns {number | undefined}
     */
    get backgroundColor() {
        const ret = wasm.__wbg_get_textmaterial_backgroundColor(this.__wbg_ptr);
        return ret === Number.MAX_SAFE_INTEGER ? undefined : ret;
    }
    /**
     * @returns {number | undefined}
     */
    get borderColor() {
        const ret = wasm.__wbg_get_textmaterial_borderColor(this.__wbg_ptr);
        return ret === Number.MAX_SAFE_INTEGER ? undefined : ret;
    }
    /**
     * @returns {number | undefined}
     */
    get borderWidth() {
        const ret = wasm.__wbg_get_textmaterial_borderWidth(this.__wbg_ptr);
        return ret === Number.MAX_SAFE_INTEGER ? undefined : ret;
    }
    /**
     * @returns {Vec2 | undefined}
     */
    get center() {
        const ret = wasm.__wbg_get_textmaterial_center(this.__wbg_ptr);
        return ret === 0 ? undefined : Vec2.__wrap(ret);
    }
    /**
     * @returns {boolean | undefined}
     */
    get clampToGround() {
        const ret = wasm.__wbg_get_textmaterial_clampToGround(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret !== 0;
    }
    /**
     * @returns {number | undefined}
     */
    get color() {
        const ret = wasm.__wbg_get_textmaterial_color(this.__wbg_ptr);
        return ret === Number.MAX_SAFE_INTEGER ? undefined : ret;
    }
    /**
     * Placement priority for decluttering; higher wins. Only meaningful when
     * `declutter` is enabled. Defaults to `0.0`.
     * @returns {number | undefined}
     */
    get declutterPriority() {
        const ret = wasm.__wbg_get_textmaterial_declutterPriority(this.__wbg_ptr);
        return ret === Number.MAX_SAFE_INTEGER ? undefined : ret;
    }
    /**
     * Participate in screen-space decluttering: when labels/sprites overlap
     * on screen, lower-priority ones are hidden. Defaults to `true`; set to
     * `false` to draw every label unconditionally.
     * @returns {boolean | undefined}
     */
    get declutter() {
        const ret = wasm.__wbg_get_textmaterial_declutter(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret !== 0;
    }
    /**
     * @returns {boolean | undefined}
     */
    get depthTest() {
        const ret = wasm.__wbg_get_textmaterial_depthTest(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret !== 0;
    }
    /**
     * IDs of selective effects to apply (e.g., "bloom", "outline")
     * @returns {string[] | undefined}
     */
    get effectIds() {
        const ret = wasm.__wbg_get_textmaterial_effectIds(this.__wbg_ptr);
        let v1;
        if (ret[0] !== 0) {
            v1 = getArrayJsValueFromWasm0(ret[0], ret[1]).slice();
            wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        }
        return v1;
    }
    /**
     * Emissive glow color in 0xRRGGBB format
     * @returns {number | undefined}
     */
    get emissiveColor() {
        const ret = wasm.__wbg_get_textmaterial_emissiveColor(this.__wbg_ptr);
        return ret === Number.MAX_SAFE_INTEGER ? undefined : ret;
    }
    /**
     * Emissive glow intensity (omitted = 0, no emissive output)
     * @returns {number | undefined}
     */
    get emissiveIntensity() {
        const ret = wasm.__wbg_get_textmaterial_emissiveIntensity(this.__wbg_ptr);
        return ret === Number.MAX_SAFE_INTEGER ? undefined : ret;
    }
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
     * @returns {string | undefined}
     */
    get font() {
        const ret = wasm.__wbg_get_textmaterial_font(this.__wbg_ptr);
        let v1;
        if (ret[0] !== 0) {
            v1 = getStringFromWasm0(ret[0], ret[1]).slice();
            wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        }
        return v1;
    }
    /**
     * Source geometry types this appearance consumes: `"point"`, `"line"`,
     * `"polygon"`. Defaults to `["point"]`; adding `"line"`/`"polygon"` also
     * emits a label per line-string / polygon-ring vertex.
     * @returns {string[] | undefined}
     */
    get geometryTypes() {
        const ret = wasm.__wbg_get_textmaterial_geometryTypes(this.__wbg_ptr);
        let v1;
        if (ret[0] !== 0) {
            v1 = getArrayJsValueFromWasm0(ret[0], ret[1]).slice();
            wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        }
        return v1;
    }
    /**
     * @returns {number | undefined}
     */
    get height() {
        const ret = wasm.__wbg_get_textmaterial_height(this.__wbg_ptr);
        return ret === Number.MAX_SAFE_INTEGER ? undefined : ret;
    }
    /**
     * Enable high-quality glyph rendering. When `true`, text uses an MTSDF
     * atlas (sharper corners at large sizes, dramatically slower
     * rasterization). When `false` or omitted, the default single-channel SDF
     * atlas is used (fast). Mirrors `navara_material::TextMaterial::high_quality`
     * on the Rust side.
     * @returns {boolean | undefined}
     */
    get highQuality() {
        const ret = wasm.__wbg_get_textmaterial_highQuality(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret !== 0;
    }
    /**
     * Language code for text shaping (e.g., "en", "ja", "ar"). Used for proper text rendering.
     * @returns {string | undefined}
     */
    get lang() {
        const ret = wasm.__wbg_get_textmaterial_lang(this.__wbg_ptr);
        let v1;
        if (ret[0] !== 0) {
            v1 = getStringFromWasm0(ret[0], ret[1]).slice();
            wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        }
        return v1;
    }
    /**
     * Line height as a multiplier of the font's natural line height
     * (ascender − descender + line gap). Defaults to `1.0`.
     * @returns {number | undefined}
     */
    get lineHeight() {
        const ret = wasm.__wbg_get_textmaterial_lineHeight(this.__wbg_ptr);
        return ret === Number.MAX_SAFE_INTEGER ? undefined : ret;
    }
    /**
     * Maximum line width in ems (multiples of `size`) before text wraps at
     * word boundaries. `0.0` (the default) disables wrapping; explicit `\n`
     * characters in `text` always break lines.
     * @returns {number | undefined}
     */
    get maxWidth() {
        const ret = wasm.__wbg_get_textmaterial_maxWidth(this.__wbg_ptr);
        return ret === Number.MAX_SAFE_INTEGER ? undefined : ret;
    }
    /**
     * Avoid overlapping with the globe surface.
     * @returns {boolean | undefined}
     */
    get offsetDepth() {
        const ret = wasm.__wbg_get_textmaterial_offsetDepth(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret !== 0;
    }
    /**
     * Opacity of the text
     * @returns {number | undefined}
     */
    get opacity() {
        const ret = wasm.__wbg_get_textmaterial_opacity(this.__wbg_ptr);
        return ret === Number.MAX_SAFE_INTEGER ? undefined : ret;
    }
    /**
     * Outline blur radius in CSS pixels. Defaults to `0.0`.
     * @returns {number | undefined}
     */
    get outlineColor() {
        const ret = wasm.__wbg_get_textmaterial_outlineColor(this.__wbg_ptr);
        return ret === Number.MAX_SAFE_INTEGER ? undefined : ret;
    }
    /**
     * Pixel offset `[x, y]` in CSS pixels. Defaults to `(0.0, 0.0)`.
     * @returns {number | undefined}
     */
    get outlineOpacity() {
        const ret = wasm.__wbg_get_textmaterial_outlineOpacity(this.__wbg_ptr);
        return ret === Number.MAX_SAFE_INTEGER ? undefined : ret;
    }
    /**
     * Outline thickness measured in CSS pixels. Defaults to `0.0`.
     * @returns {number | undefined}
     */
    get outlineWidth() {
        const ret = wasm.__wbg_get_textmaterial_outlineWidth(this.__wbg_ptr);
        return ret === Number.MAX_SAFE_INTEGER ? undefined : ret;
    }
    /**
     * Whether the label turns to follow the camera. `true` (the default)
     * keeps it facing the viewer. `false` freezes it in the anchor's local
     * east-north-up frame, so moving the camera never reorients it: with
     * `textFacing: "upright"` it becomes a signboard standing on the
     * surface, with `"flat"` a north-up label painted on it.
     * @returns {boolean | undefined}
     */
    get rotateWithCamera() {
        const ret = wasm.__wbg_get_textmaterial_rotateWithCamera(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret !== 0;
    }
    /**
     * Rotation of the label within its own plane, about its anchor point, in
     * degrees, clockwise seen from the front. Applied on top of whatever
     * orientation `textFacing` and `rotateWithCamera` resolve to: it spins a
     * billboard on screen and turns a surface label like a compass bearing.
     * `center` decides where inside the text the pivot sits. Defaults to
     * `0.0`.
     * @returns {number | undefined}
     */
    get rotation() {
        const ret = wasm.__wbg_get_textmaterial_rotation(this.__wbg_ptr);
        return ret === Number.MAX_SAFE_INTEGER ? undefined : ret;
    }
    /**
     * @returns {boolean | undefined}
     */
    get show() {
        const ret = wasm.__wbg_get_textmaterial_show(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret !== 0;
    }
    /**
     * Whether the size is specified in meters. If false, the size is in pixels. Default is true.
     * @returns {boolean | undefined}
     */
    get sizeInMeters() {
        const ret = wasm.__wbg_get_textmaterial_sizeInMeters(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret !== 0;
    }
    /**
     * size in pixels/meters (units are determined by `sizeInMeters`).
     * @returns {number | undefined}
     */
    get size() {
        const ret = wasm.__wbg_get_textmaterial_size(this.__wbg_ptr);
        return ret === Number.MAX_SAFE_INTEGER ? undefined : ret;
    }
    /**
     * Horizontal alignment of lines within a multi-line block:
     * `"left"`, `"center"` (default), or `"right"`.
     * @returns {string | undefined}
     */
    get textAlign() {
        const ret = wasm.__wbg_get_textmaterial_textAlign(this.__wbg_ptr);
        let v1;
        if (ret[0] !== 0) {
            v1 = getStringFromWasm0(ret[0], ret[1]).slice();
            wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        }
        return v1;
    }
    /**
     * Whether the label stands up (`"upright"`, the default) or lies on the
     * globe surface around its anchor (`"flat"`), following its curvature so
     * it reads as painted on the surface. Pair with `rotateWithCamera`.
     * @returns {string | undefined}
     */
    get textFacing() {
        const ret = wasm.__wbg_get_textmaterial_textFacing(this.__wbg_ptr);
        let v1;
        if (ret[0] !== 0) {
            v1 = getStringFromWasm0(ret[0], ret[1]).slice();
            wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        }
        return v1;
    }
    /**
     * @returns {string | undefined}
     */
    get text() {
        const ret = wasm.__wbg_get_textmaterial_text(this.__wbg_ptr);
        let v1;
        if (ret[0] !== 0) {
            v1 = getStringFromWasm0(ret[0], ret[1]).slice();
            wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        }
        return v1;
    }
    /**
     * Enable transparency and alpha blending
     * @returns {boolean | undefined}
     */
    get transparent() {
        const ret = wasm.__wbg_get_textmaterial_transparent(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret !== 0;
    }
    /**
     * Whether faces seen from behind are culled. Default is false, so a
     * quad frozen in its anchor's frame (`rotateWithCamera: false`) stays
     * visible from behind. Turn it on to hide a flat quad's parts that wrap
     * over the horizon, which face away from the camera.
     * @param {boolean | null} [arg0]
     */
    set backfaceCulling(arg0) {
        wasm.__wbg_set_textmaterial_backfaceCulling(this.__wbg_ptr, isLikeNone(arg0) ? 0xFFFFFF : arg0 ? 1 : 0);
    }
    /**
     * @param {number | null} [arg0]
     */
    set backgroundColor(arg0) {
        wasm.__wbg_set_textmaterial_backgroundColor(this.__wbg_ptr, isLikeNone(arg0) ? Number.MAX_SAFE_INTEGER : (arg0) >>> 0);
    }
    /**
     * @param {number | null} [arg0]
     */
    set borderColor(arg0) {
        wasm.__wbg_set_textmaterial_borderColor(this.__wbg_ptr, isLikeNone(arg0) ? Number.MAX_SAFE_INTEGER : (arg0) >>> 0);
    }
    /**
     * @param {number | null} [arg0]
     */
    set borderWidth(arg0) {
        wasm.__wbg_set_textmaterial_borderWidth(this.__wbg_ptr, isLikeNone(arg0) ? Number.MAX_SAFE_INTEGER : Math.fround(arg0));
    }
    /**
     * @param {Vec2 | null} [arg0]
     */
    set center(arg0) {
        let ptr0 = 0;
        if (!isLikeNone(arg0)) {
            _assertClass(arg0, Vec2);
            ptr0 = arg0.__destroy_into_raw();
        }
        wasm.__wbg_set_textmaterial_center(this.__wbg_ptr, ptr0);
    }
    /**
     * @param {boolean | null} [arg0]
     */
    set clampToGround(arg0) {
        wasm.__wbg_set_textmaterial_clampToGround(this.__wbg_ptr, isLikeNone(arg0) ? 0xFFFFFF : arg0 ? 1 : 0);
    }
    /**
     * @param {number | null} [arg0]
     */
    set color(arg0) {
        wasm.__wbg_set_textmaterial_color(this.__wbg_ptr, isLikeNone(arg0) ? Number.MAX_SAFE_INTEGER : (arg0) >>> 0);
    }
    /**
     * Placement priority for decluttering; higher wins. Only meaningful when
     * `declutter` is enabled. Defaults to `0.0`.
     * @param {number | null} [arg0]
     */
    set declutterPriority(arg0) {
        wasm.__wbg_set_textmaterial_declutterPriority(this.__wbg_ptr, isLikeNone(arg0) ? Number.MAX_SAFE_INTEGER : Math.fround(arg0));
    }
    /**
     * Participate in screen-space decluttering: when labels/sprites overlap
     * on screen, lower-priority ones are hidden. Defaults to `true`; set to
     * `false` to draw every label unconditionally.
     * @param {boolean | null} [arg0]
     */
    set declutter(arg0) {
        wasm.__wbg_set_textmaterial_declutter(this.__wbg_ptr, isLikeNone(arg0) ? 0xFFFFFF : arg0 ? 1 : 0);
    }
    /**
     * @param {boolean | null} [arg0]
     */
    set depthTest(arg0) {
        wasm.__wbg_set_textmaterial_depthTest(this.__wbg_ptr, isLikeNone(arg0) ? 0xFFFFFF : arg0 ? 1 : 0);
    }
    /**
     * IDs of selective effects to apply (e.g., "bloom", "outline")
     * @param {string[] | null} [arg0]
     */
    set effectIds(arg0) {
        var ptr0 = isLikeNone(arg0) ? 0 : passArrayJsValueToWasm0(arg0, wasm.__wbindgen_malloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_textmaterial_effectIds(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * Emissive glow color in 0xRRGGBB format
     * @param {number | null} [arg0]
     */
    set emissiveColor(arg0) {
        wasm.__wbg_set_textmaterial_emissiveColor(this.__wbg_ptr, isLikeNone(arg0) ? Number.MAX_SAFE_INTEGER : (arg0) >>> 0);
    }
    /**
     * Emissive glow intensity (omitted = 0, no emissive output)
     * @param {number | null} [arg0]
     */
    set emissiveIntensity(arg0) {
        wasm.__wbg_set_textmaterial_emissiveIntensity(this.__wbg_ptr, isLikeNone(arg0) ? Number.MAX_SAFE_INTEGER : Math.fround(arg0));
    }
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
     * @param {string | null} [arg0]
     */
    set font(arg0) {
        var ptr0 = isLikeNone(arg0) ? 0 : passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_textmaterial_font(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * Source geometry types this appearance consumes: `"point"`, `"line"`,
     * `"polygon"`. Defaults to `["point"]`; adding `"line"`/`"polygon"` also
     * emits a label per line-string / polygon-ring vertex.
     * @param {string[] | null} [arg0]
     */
    set geometryTypes(arg0) {
        var ptr0 = isLikeNone(arg0) ? 0 : passArrayJsValueToWasm0(arg0, wasm.__wbindgen_malloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_textmaterial_geometryTypes(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @param {number | null} [arg0]
     */
    set height(arg0) {
        wasm.__wbg_set_textmaterial_height(this.__wbg_ptr, isLikeNone(arg0) ? Number.MAX_SAFE_INTEGER : Math.fround(arg0));
    }
    /**
     * Enable high-quality glyph rendering. When `true`, text uses an MTSDF
     * atlas (sharper corners at large sizes, dramatically slower
     * rasterization). When `false` or omitted, the default single-channel SDF
     * atlas is used (fast). Mirrors `navara_material::TextMaterial::high_quality`
     * on the Rust side.
     * @param {boolean | null} [arg0]
     */
    set highQuality(arg0) {
        wasm.__wbg_set_textmaterial_highQuality(this.__wbg_ptr, isLikeNone(arg0) ? 0xFFFFFF : arg0 ? 1 : 0);
    }
    /**
     * Language code for text shaping (e.g., "en", "ja", "ar"). Used for proper text rendering.
     * @param {string | null} [arg0]
     */
    set lang(arg0) {
        var ptr0 = isLikeNone(arg0) ? 0 : passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_textmaterial_lang(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * Line height as a multiplier of the font's natural line height
     * (ascender − descender + line gap). Defaults to `1.0`.
     * @param {number | null} [arg0]
     */
    set lineHeight(arg0) {
        wasm.__wbg_set_textmaterial_lineHeight(this.__wbg_ptr, isLikeNone(arg0) ? Number.MAX_SAFE_INTEGER : Math.fround(arg0));
    }
    /**
     * Maximum line width in ems (multiples of `size`) before text wraps at
     * word boundaries. `0.0` (the default) disables wrapping; explicit `\n`
     * characters in `text` always break lines.
     * @param {number | null} [arg0]
     */
    set maxWidth(arg0) {
        wasm.__wbg_set_textmaterial_maxWidth(this.__wbg_ptr, isLikeNone(arg0) ? Number.MAX_SAFE_INTEGER : Math.fround(arg0));
    }
    /**
     * Avoid overlapping with the globe surface.
     * @param {boolean | null} [arg0]
     */
    set offsetDepth(arg0) {
        wasm.__wbg_set_textmaterial_offsetDepth(this.__wbg_ptr, isLikeNone(arg0) ? 0xFFFFFF : arg0 ? 1 : 0);
    }
    /**
     * Opacity of the text
     * @param {number | null} [arg0]
     */
    set opacity(arg0) {
        wasm.__wbg_set_textmaterial_opacity(this.__wbg_ptr, isLikeNone(arg0) ? Number.MAX_SAFE_INTEGER : Math.fround(arg0));
    }
    /**
     * Outline blur radius in CSS pixels. Defaults to `0.0`.
     * @param {number | null} [arg0]
     */
    set outlineColor(arg0) {
        wasm.__wbg_set_textmaterial_outlineColor(this.__wbg_ptr, isLikeNone(arg0) ? Number.MAX_SAFE_INTEGER : (arg0) >>> 0);
    }
    /**
     * Pixel offset `[x, y]` in CSS pixels. Defaults to `(0.0, 0.0)`.
     * @param {number | null} [arg0]
     */
    set outlineOpacity(arg0) {
        wasm.__wbg_set_textmaterial_outlineOpacity(this.__wbg_ptr, isLikeNone(arg0) ? Number.MAX_SAFE_INTEGER : Math.fround(arg0));
    }
    /**
     * Outline thickness measured in CSS pixels. Defaults to `0.0`.
     * @param {number | null} [arg0]
     */
    set outlineWidth(arg0) {
        wasm.__wbg_set_textmaterial_outlineWidth(this.__wbg_ptr, isLikeNone(arg0) ? Number.MAX_SAFE_INTEGER : Math.fround(arg0));
    }
    /**
     * Whether the label turns to follow the camera. `true` (the default)
     * keeps it facing the viewer. `false` freezes it in the anchor's local
     * east-north-up frame, so moving the camera never reorients it: with
     * `textFacing: "upright"` it becomes a signboard standing on the
     * surface, with `"flat"` a north-up label painted on it.
     * @param {boolean | null} [arg0]
     */
    set rotateWithCamera(arg0) {
        wasm.__wbg_set_textmaterial_rotateWithCamera(this.__wbg_ptr, isLikeNone(arg0) ? 0xFFFFFF : arg0 ? 1 : 0);
    }
    /**
     * Rotation of the label within its own plane, about its anchor point, in
     * degrees, clockwise seen from the front. Applied on top of whatever
     * orientation `textFacing` and `rotateWithCamera` resolve to: it spins a
     * billboard on screen and turns a surface label like a compass bearing.
     * `center` decides where inside the text the pivot sits. Defaults to
     * `0.0`.
     * @param {number | null} [arg0]
     */
    set rotation(arg0) {
        wasm.__wbg_set_textmaterial_rotation(this.__wbg_ptr, isLikeNone(arg0) ? Number.MAX_SAFE_INTEGER : Math.fround(arg0));
    }
    /**
     * @param {boolean | null} [arg0]
     */
    set show(arg0) {
        wasm.__wbg_set_textmaterial_show(this.__wbg_ptr, isLikeNone(arg0) ? 0xFFFFFF : arg0 ? 1 : 0);
    }
    /**
     * Whether the size is specified in meters. If false, the size is in pixels. Default is true.
     * @param {boolean | null} [arg0]
     */
    set sizeInMeters(arg0) {
        wasm.__wbg_set_textmaterial_sizeInMeters(this.__wbg_ptr, isLikeNone(arg0) ? 0xFFFFFF : arg0 ? 1 : 0);
    }
    /**
     * size in pixels/meters (units are determined by `sizeInMeters`).
     * @param {number | null} [arg0]
     */
    set size(arg0) {
        wasm.__wbg_set_textmaterial_size(this.__wbg_ptr, isLikeNone(arg0) ? Number.MAX_SAFE_INTEGER : Math.fround(arg0));
    }
    /**
     * Horizontal alignment of lines within a multi-line block:
     * `"left"`, `"center"` (default), or `"right"`.
     * @param {string | null} [arg0]
     */
    set textAlign(arg0) {
        var ptr0 = isLikeNone(arg0) ? 0 : passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_textmaterial_textAlign(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * Whether the label stands up (`"upright"`, the default) or lies on the
     * globe surface around its anchor (`"flat"`), following its curvature so
     * it reads as painted on the surface. Pair with `rotateWithCamera`.
     * @param {string | null} [arg0]
     */
    set textFacing(arg0) {
        var ptr0 = isLikeNone(arg0) ? 0 : passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_textmaterial_textFacing(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @param {string | null} [arg0]
     */
    set text(arg0) {
        var ptr0 = isLikeNone(arg0) ? 0 : passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_textmaterial_text(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * Enable transparency and alpha blending
     * @param {boolean | null} [arg0]
     */
    set transparent(arg0) {
        wasm.__wbg_set_textmaterial_transparent(this.__wbg_ptr, isLikeNone(arg0) ? 0xFFFFFF : arg0 ? 1 : 0);
    }
}
if (Symbol.dispose) TextMaterial.prototype[Symbol.dispose] = TextMaterial.prototype.free;

export class TextureFragment {
    static __wrap(ptr) {
        const obj = Object.create(TextureFragment.prototype);
        obj.__wbg_ptr = ptr;
        TextureFragmentFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        TextureFragmentFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_texturefragment_free(ptr, 0);
    }
    /**
     * @returns {number}
     */
    get gen() {
        const ret = wasm.__wbg_get_texturefragment_gen(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @returns {number}
     */
    get ind() {
        const ret = wasm.__wbg_get_texturefragment_ind(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @param {number} arg0
     */
    set gen(arg0) {
        wasm.__wbg_set_texturefragment_gen(this.__wbg_ptr, arg0);
    }
    /**
     * @param {number} arg0
     */
    set ind(arg0) {
        wasm.__wbg_set_texturefragment_ind(this.__wbg_ptr, arg0);
    }
}
if (Symbol.dispose) TextureFragment.prototype[Symbol.dispose] = TextureFragment.prototype.free;

export class TileUvTransform {
    static __wrap(ptr) {
        const obj = Object.create(TileUvTransform.prototype);
        obj.__wbg_ptr = ptr;
        TileUvTransformFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        TileUvTransformFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_tileuvtransform_free(ptr, 0);
    }
    /**
     * @returns {Vec2}
     */
    get offset() {
        const ret = wasm.__wbg_get_tileuvtransform_offset(this.__wbg_ptr);
        return Vec2.__wrap(ret);
    }
    /**
     * @returns {Vec2}
     */
    get scale() {
        const ret = wasm.__wbg_get_tileuvtransform_scale(this.__wbg_ptr);
        return Vec2.__wrap(ret);
    }
    /**
     * @param {Vec2} arg0
     */
    set offset(arg0) {
        _assertClass(arg0, Vec2);
        var ptr0 = arg0.__destroy_into_raw();
        wasm.__wbg_set_tileuvtransform_offset(this.__wbg_ptr, ptr0);
    }
    /**
     * @param {Vec2} arg0
     */
    set scale(arg0) {
        _assertClass(arg0, Vec2);
        var ptr0 = arg0.__destroy_into_raw();
        wasm.__wbg_set_tileuvtransform_scale(this.__wbg_ptr, ptr0);
    }
}
if (Symbol.dispose) TileUvTransform.prototype[Symbol.dispose] = TileUvTransform.prototype.free;

export class TileXYZ {
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        TileXYZFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_tilexyz_free(ptr, 0);
    }
    /**
     * @returns {number}
     */
    get x() {
        const ret = wasm.__wbg_get_tilexyz_x(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @returns {number}
     */
    get y() {
        const ret = wasm.__wbg_get_tilexyz_y(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @returns {number}
     */
    get z() {
        const ret = wasm.__wbg_get_tilexyz_z(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @param {number} arg0
     */
    set x(arg0) {
        wasm.__wbg_set_tilexyz_x(this.__wbg_ptr, arg0);
    }
    /**
     * @param {number} arg0
     */
    set y(arg0) {
        wasm.__wbg_set_tilexyz_y(this.__wbg_ptr, arg0);
    }
    /**
     * @param {number} arg0
     */
    set z(arg0) {
        wasm.__wbg_set_tilexyz_z(this.__wbg_ptr, arg0);
    }
    /**
     * @param {number} x
     * @param {number} y
     * @param {number} z
     */
    constructor(x, y, z) {
        const ret = wasm.tilexyz_new(x, y, z);
        this.__wbg_ptr = ret;
        TileXYZFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
}
if (Symbol.dispose) TileXYZ.prototype[Symbol.dispose] = TileXYZ.prototype.free;

export class TransferableHierarchy {
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        TransferableHierarchyFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_transferablehierarchy_free(ptr, 0);
    }
    /**
     * @returns {number}
     */
    get expected_winding_order() {
        const ret = wasm.__wbg_get_transferablehierarchy_expected_winding_order(this.__wbg_ptr);
        return ret;
    }
    /**
     * @param {number} arg0
     */
    set expected_winding_order(arg0) {
        wasm.__wbg_set_transferablehierarchy_expected_winding_order(this.__wbg_ptr, arg0);
    }
}
if (Symbol.dispose) TransferableHierarchy.prototype[Symbol.dispose] = TransferableHierarchy.prototype.free;

/**
 * To transfer the hierarchy efficiently, the holes are managed as one-dimensional array.
 */
export class TransferableHoles {
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        TransferableHolesFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_transferableholes_free(ptr, 0);
    }
}
if (Symbol.dispose) TransferableHoles.prototype[Symbol.dispose] = TransferableHoles.prototype.free;

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
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        TransferableParsedMvtResultFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_transferableparsedmvtresult_free(ptr, 0);
    }
    /**
     * @returns {Float32Array}
     */
    f32_stream() {
        const ret = wasm.transferableparsedmvtresult_f32_stream(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {Float64Array}
     */
    f64_stream() {
        const ret = wasm.transferableparsedmvtresult_f64_stream(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {any}
     */
    meta() {
        const ret = wasm.transferableparsedmvtresult_meta(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {Uint32Array}
     */
    u32_stream() {
        const ret = wasm.transferableparsedmvtresult_u32_stream(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {Uint8Array}
     */
    u8_stream() {
        const ret = wasm.transferableparsedmvtresult_u8_stream(this.__wbg_ptr);
        return ret;
    }
}
if (Symbol.dispose) TransferableParsedMvtResult.prototype[Symbol.dispose] = TransferableParsedMvtResult.prototype.free;

/**
 * To transfer the batched feature efficiently, the all feature's properties are managed as one-dimensional array.
 */
export class TransferablePolygonBatchedFeature {
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        TransferablePolygonBatchedFeatureFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_transferablepolygonbatchedfeature_free(ptr, 0);
    }
    /**
     * @returns {CRS}
     */
    get crs() {
        const ret = wasm.__wbg_get_transferablepolygonbatchedfeature_crs(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number}
     */
    get length() {
        const ret = wasm.__wbg_get_transferablepolygonbatchedfeature_length(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @param {CRS} arg0
     */
    set crs(arg0) {
        wasm.__wbg_set_transferablepolygonbatchedfeature_crs(this.__wbg_ptr, arg0);
    }
    /**
     * @param {number} arg0
     */
    set length(arg0) {
        wasm.__wbg_set_transferablepolygonbatchedfeature_length(this.__wbg_ptr, arg0);
    }
    /**
     * @param {CRS} crs
     * @param {number} length
     */
    constructor(crs, length) {
        const ret = wasm.transferablepolygonbatchedfeature_constructor(crs, length);
        this.__wbg_ptr = ret;
        TransferablePolygonBatchedFeatureFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * @param {number} byte_length
     * @param {Function} f
     */
    setBatchIds(byte_length, f) {
        wasm.transferablepolygonbatchedfeature_setBatchIds(this.__wbg_ptr, byte_length, f);
    }
    /**
     * @param {number} byte_length
     * @param {Function} f
     */
    setBatchIndices(byte_length, f) {
        wasm.transferablepolygonbatchedfeature_setBatchIndices(this.__wbg_ptr, byte_length, f);
    }
    /**
     * @param {number} byte_length
     * @param {Function} f
     */
    setExpectedWindingOrders(byte_length, f) {
        wasm.transferablepolygonbatchedfeature_setExpectedWindingOrders(this.__wbg_ptr, byte_length, f);
    }
    /**
     * @param {number} byte_length
     * @param {Function} f
     */
    setHoles(byte_length, f) {
        wasm.transferablepolygonbatchedfeature_setHoles(this.__wbg_ptr, byte_length, f);
    }
    /**
     * @param {number} byte_length
     * @param {Function} f
     */
    setHolesBoundaries(byte_length, f) {
        wasm.transferablepolygonbatchedfeature_setHolesBoundaries(this.__wbg_ptr, byte_length, f);
    }
    /**
     * @param {number} byte_length
     * @param {Function} f
     */
    setHolesSizes(byte_length, f) {
        wasm.transferablepolygonbatchedfeature_setHolesSizes(this.__wbg_ptr, byte_length, f);
    }
    /**
     * @param {number} byte_length
     * @param {Function} f
     */
    setHolesTotalSizes(byte_length, f) {
        wasm.transferablepolygonbatchedfeature_setHolesTotalSizes(this.__wbg_ptr, byte_length, f);
    }
    /**
     * @param {number} byte_length
     * @param {Function} f
     */
    setOuterRing(byte_length, f) {
        wasm.transferablepolygonbatchedfeature_setOuterRing(this.__wbg_ptr, byte_length, f);
    }
    /**
     * @param {number} byte_length
     * @param {Function} f
     */
    setOuterRingSizes(byte_length, f) {
        wasm.transferablepolygonbatchedfeature_setOuterRingSizes(this.__wbg_ptr, byte_length, f);
    }
    /**
     * @returns {Uint32Array}
     */
    transferBatchIds() {
        const ret = wasm.transferablepolygonbatchedfeature_transferBatchIds(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {Uint32Array}
     */
    transferBatchIndices() {
        const ret = wasm.transferablepolygonbatchedfeature_transferBatchIndices(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {Uint8Array}
     */
    transferExpectedWindingOrders() {
        const ret = wasm.transferablepolygonbatchedfeature_transferExpectedWindingOrders(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {Float64Array}
     */
    transferHoles() {
        const ret = wasm.transferablepolygonbatchedfeature_transferHoles(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {Uint32Array}
     */
    transferHolesBoundaries() {
        const ret = wasm.transferablepolygonbatchedfeature_transferHolesBoundaries(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {Uint32Array}
     */
    transferHolesSizes() {
        const ret = wasm.transferablepolygonbatchedfeature_transferHolesSizes(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {Uint32Array}
     */
    transferHolesTotalSizes() {
        const ret = wasm.transferablepolygonbatchedfeature_transferHolesTotalSizes(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {Float64Array}
     */
    transferOuterRing() {
        const ret = wasm.transferablepolygonbatchedfeature_transferOuterRing(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {Uint32Array}
     */
    transferOuterRingSizes() {
        const ret = wasm.transferablepolygonbatchedfeature_transferOuterRingSizes(this.__wbg_ptr);
        return ret;
    }
}
if (Symbol.dispose) TransferablePolygonBatchedFeature.prototype[Symbol.dispose] = TransferablePolygonBatchedFeature.prototype.free;

/**
 * To transfer the batched feature efficiently, the all feature's properties are managed as one-dimensional array.
 */
export class TransferablePolylineBatchedFeature {
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        TransferablePolylineBatchedFeatureFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_transferablepolylinebatchedfeature_free(ptr, 0);
    }
    /**
     * @returns {CRS}
     */
    get crs() {
        const ret = wasm.__wbg_get_transferablepolylinebatchedfeature_crs(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number}
     */
    get length() {
        const ret = wasm.__wbg_get_transferablepolylinebatchedfeature_length(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @param {CRS} arg0
     */
    set crs(arg0) {
        wasm.__wbg_set_transferablepolylinebatchedfeature_crs(this.__wbg_ptr, arg0);
    }
    /**
     * @param {number} arg0
     */
    set length(arg0) {
        wasm.__wbg_set_transferablepolylinebatchedfeature_length(this.__wbg_ptr, arg0);
    }
    /**
     * @param {CRS} crs
     * @param {number} length
     */
    constructor(crs, length) {
        const ret = wasm.transferablepolylinebatchedfeature_constructor(crs, length);
        this.__wbg_ptr = ret;
        TransferablePolylineBatchedFeatureFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * @param {number} byte_length
     * @param {Function} f
     */
    setBatchIds(byte_length, f) {
        wasm.transferablepolylinebatchedfeature_setBatchIds(this.__wbg_ptr, byte_length, f);
    }
    /**
     * @param {number} byte_length
     * @param {Function} f
     */
    setBatchIndices(byte_length, f) {
        wasm.transferablepolylinebatchedfeature_setBatchIndices(this.__wbg_ptr, byte_length, f);
    }
    /**
     * @param {number} byte_length
     * @param {Function} f
     */
    setPoints(byte_length, f) {
        wasm.transferablepolylinebatchedfeature_setPoints(this.__wbg_ptr, byte_length, f);
    }
    /**
     * @param {number} byte_length
     * @param {Function} f
     */
    setPointsSizes(byte_length, f) {
        wasm.transferablepolylinebatchedfeature_setPointsSizes(this.__wbg_ptr, byte_length, f);
    }
    /**
     * @param {number} byte_length
     * @param {Function} f
     */
    setRingFlags(byte_length, f) {
        wasm.transferablepolylinebatchedfeature_setRingFlags(this.__wbg_ptr, byte_length, f);
    }
    /**
     * @returns {Uint32Array}
     */
    transferBatchIds() {
        const ret = wasm.transferablepolylinebatchedfeature_transferBatchIds(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {Uint32Array}
     */
    transferBatchIndices() {
        const ret = wasm.transferablepolylinebatchedfeature_transferBatchIndices(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {Float64Array}
     */
    transferPoints() {
        const ret = wasm.transferablepolylinebatchedfeature_transferPoints(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {Uint32Array}
     */
    transferPointsSizes() {
        const ret = wasm.transferablepolylinebatchedfeature_transferPointsSizes(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {Uint8Array}
     */
    transferRingFlags() {
        const ret = wasm.transferablepolylinebatchedfeature_transferRingFlags(this.__wbg_ptr);
        return ret;
    }
}
if (Symbol.dispose) TransferablePolylineBatchedFeature.prototype[Symbol.dispose] = TransferablePolylineBatchedFeature.prototype.free;

export class Transform {
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        TransformFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_transform_free(ptr, 0);
    }
    /**
     * @returns {number}
     */
    get qw() {
        const ret = wasm.__wbg_get_transform_qw(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number}
     */
    get qx() {
        const ret = wasm.__wbg_get_transform_qx(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number}
     */
    get qy() {
        const ret = wasm.__wbg_get_transform_qy(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number}
     */
    get qz() {
        const ret = wasm.__wbg_get_transform_qz(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number}
     */
    get sx() {
        const ret = wasm.__wbg_get_transform_sx(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number}
     */
    get sy() {
        const ret = wasm.__wbg_get_transform_sy(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number}
     */
    get sz() {
        const ret = wasm.__wbg_get_transform_sz(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number}
     */
    get tx() {
        const ret = wasm.__wbg_get_transform_tx(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number}
     */
    get ty() {
        const ret = wasm.__wbg_get_transform_ty(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number}
     */
    get tz() {
        const ret = wasm.__wbg_get_transform_tz(this.__wbg_ptr);
        return ret;
    }
    /**
     * @param {number} arg0
     */
    set qw(arg0) {
        wasm.__wbg_set_transform_qw(this.__wbg_ptr, arg0);
    }
    /**
     * @param {number} arg0
     */
    set qx(arg0) {
        wasm.__wbg_set_transform_qx(this.__wbg_ptr, arg0);
    }
    /**
     * @param {number} arg0
     */
    set qy(arg0) {
        wasm.__wbg_set_transform_qy(this.__wbg_ptr, arg0);
    }
    /**
     * @param {number} arg0
     */
    set qz(arg0) {
        wasm.__wbg_set_transform_qz(this.__wbg_ptr, arg0);
    }
    /**
     * @param {number} arg0
     */
    set sx(arg0) {
        wasm.__wbg_set_transform_sx(this.__wbg_ptr, arg0);
    }
    /**
     * @param {number} arg0
     */
    set sy(arg0) {
        wasm.__wbg_set_transform_sy(this.__wbg_ptr, arg0);
    }
    /**
     * @param {number} arg0
     */
    set sz(arg0) {
        wasm.__wbg_set_transform_sz(this.__wbg_ptr, arg0);
    }
    /**
     * @param {number} arg0
     */
    set tx(arg0) {
        wasm.__wbg_set_transform_tx(this.__wbg_ptr, arg0);
    }
    /**
     * @param {number} arg0
     */
    set ty(arg0) {
        wasm.__wbg_set_transform_ty(this.__wbg_ptr, arg0);
    }
    /**
     * @param {number} arg0
     */
    set tz(arg0) {
        wasm.__wbg_set_transform_tz(this.__wbg_ptr, arg0);
    }
    /**
     * @param {number} tx
     * @param {number} ty
     * @param {number} tz
     * @param {number} qx
     * @param {number} qy
     * @param {number} qz
     * @param {number} qw
     * @param {number} sx
     * @param {number} sy
     * @param {number} sz
     */
    constructor(tx, ty, tz, qx, qy, qz, qw, sx, sy, sz) {
        const ret = wasm.transform_new(tx, ty, tz, qx, qy, qz, qw, sx, sy, sz);
        this.__wbg_ptr = ret;
        TransformFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
}
if (Symbol.dispose) Transform.prototype[Symbol.dispose] = Transform.prototype.free;

export class UintAttribute {
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        UintAttributeFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_uintattribute_free(ptr, 0);
    }
    /**
     * @returns {number}
     */
    get size() {
        const ret = wasm.__wbg_get_uintattribute_size(this.__wbg_ptr);
        return ret;
    }
    /**
     * @param {number} arg0
     */
    set size(arg0) {
        wasm.__wbg_set_uintattribute_size(this.__wbg_ptr, arg0);
    }
    /**
     * @param {Uint32Array} data
     * @param {number} size
     */
    constructor(data, size) {
        const ptr0 = passArray32ToWasm0(data, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.uintattribute_new(ptr0, len0, size);
        this.__wbg_ptr = ret;
        UintAttributeFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * @returns {Uint32Array}
     */
    transferData() {
        const ret = wasm.uintattribute_transferData(this.__wbg_ptr);
        return ret;
    }
}
if (Symbol.dispose) UintAttribute.prototype[Symbol.dispose] = UintAttribute.prototype.free;

export class UpsamplableTerrainGeometry {
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        UpsamplableTerrainGeometryFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_upsamplableterraingeometry_free(ptr, 0);
    }
    /**
     * @param {Float32Array} uvs
     * @param {Uint32Array} indices
     * @param {Float32Array} heights
     * @param {Float32Array | null} [normals]
     * @param {Uint8Array | null} [watermask]
     */
    constructor(uvs, indices, heights, normals, watermask) {
        const ptr0 = passArrayF32ToWasm0(uvs, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passArray32ToWasm0(indices, wasm.__wbindgen_malloc);
        const len1 = WASM_VECTOR_LEN;
        const ptr2 = passArrayF32ToWasm0(heights, wasm.__wbindgen_malloc);
        const len2 = WASM_VECTOR_LEN;
        var ptr3 = isLikeNone(normals) ? 0 : passArrayF32ToWasm0(normals, wasm.__wbindgen_malloc);
        var len3 = WASM_VECTOR_LEN;
        var ptr4 = isLikeNone(watermask) ? 0 : passArray8ToWasm0(watermask, wasm.__wbindgen_malloc);
        var len4 = WASM_VECTOR_LEN;
        const ret = wasm.upsamplableterraingeometry_new(ptr0, len0, ptr1, len1, ptr2, len2, ptr3, len3, ptr4, len4);
        this.__wbg_ptr = ret;
        UpsamplableTerrainGeometryFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
}
if (Symbol.dispose) UpsamplableTerrainGeometry.prototype[Symbol.dispose] = UpsamplableTerrainGeometry.prototype.free;

export class Vec2 {
    static __wrap(ptr) {
        const obj = Object.create(Vec2.prototype);
        obj.__wbg_ptr = ptr;
        Vec2Finalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        Vec2Finalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_vec2_free(ptr, 0);
    }
    /**
     * @returns {number}
     */
    get x() {
        const ret = wasm.__wbg_get_vec2_x(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number}
     */
    get y() {
        const ret = wasm.__wbg_get_vec2_y(this.__wbg_ptr);
        return ret;
    }
    /**
     * @param {number} arg0
     */
    set x(arg0) {
        wasm.__wbg_set_vec2_x(this.__wbg_ptr, arg0);
    }
    /**
     * @param {number} arg0
     */
    set y(arg0) {
        wasm.__wbg_set_vec2_y(this.__wbg_ptr, arg0);
    }
    /**
     * @param {number} x
     * @param {number} y
     */
    constructor(x, y) {
        const ret = wasm.vec2_new(x, y);
        this.__wbg_ptr = ret;
        Vec2Finalization.register(this, this.__wbg_ptr, this);
        return this;
    }
}
if (Symbol.dispose) Vec2.prototype[Symbol.dispose] = Vec2.prototype.free;

export class Vec3 {
    static __wrap(ptr) {
        const obj = Object.create(Vec3.prototype);
        obj.__wbg_ptr = ptr;
        Vec3Finalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        Vec3Finalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_vec3_free(ptr, 0);
    }
    /**
     * @returns {number}
     */
    get x() {
        const ret = wasm.__wbg_get_vec3_x(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number}
     */
    get y() {
        const ret = wasm.__wbg_get_vec3_y(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number}
     */
    get z() {
        const ret = wasm.__wbg_get_vec3_z(this.__wbg_ptr);
        return ret;
    }
    /**
     * @param {number} arg0
     */
    set x(arg0) {
        wasm.__wbg_set_vec3_x(this.__wbg_ptr, arg0);
    }
    /**
     * @param {number} arg0
     */
    set y(arg0) {
        wasm.__wbg_set_vec3_y(this.__wbg_ptr, arg0);
    }
    /**
     * @param {number} arg0
     */
    set z(arg0) {
        wasm.__wbg_set_vec3_z(this.__wbg_ptr, arg0);
    }
    /**
     * @param {number} x
     * @param {number} y
     * @param {number} z
     */
    constructor(x, y, z) {
        const ret = wasm.vec3_new(x, y, z);
        this.__wbg_ptr = ret;
        Vec3Finalization.register(this, this.__wbg_ptr, this);
        return this;
    }
}
if (Symbol.dispose) Vec3.prototype[Symbol.dispose] = Vec3.prototype.free;

export class WindingOrder {
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        WindingOrderFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_windingorder_free(ptr, 0);
    }
    /**
     * @returns {number}
     */
    get 0() {
        const ret = wasm.__wbg_get_windingorder_0(this.__wbg_ptr);
        return ret;
    }
    /**
     * @param {number} arg0
     */
    set 0(arg0) {
        wasm.__wbg_set_windingorder_0(this.__wbg_ptr, arg0);
    }
}
if (Symbol.dispose) WindingOrder.prototype[Symbol.dispose] = WindingOrder.prototype.free;

export class Window {
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        WindowFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_window_free(ptr, 0);
    }
    /**
     * @returns {number}
     */
    get height() {
        const ret = wasm.__wbg_get_window_height(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number}
     */
    get pixelRatio() {
        const ret = wasm.__wbg_get_window_pixelRatio(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number}
     */
    get width() {
        const ret = wasm.__wbg_get_window_width(this.__wbg_ptr);
        return ret;
    }
    /**
     * @param {number} arg0
     */
    set height(arg0) {
        wasm.__wbg_set_window_height(this.__wbg_ptr, arg0);
    }
    /**
     * @param {number} arg0
     */
    set pixelRatio(arg0) {
        wasm.__wbg_set_window_pixelRatio(this.__wbg_ptr, arg0);
    }
    /**
     * @param {number} arg0
     */
    set width(arg0) {
        wasm.__wbg_set_window_width(this.__wbg_ptr, arg0);
    }
    /**
     * @param {number} width
     * @param {number} height
     * @param {number} pixel_ratio
     */
    constructor(width, height, pixel_ratio) {
        const ret = wasm.window_new(width, height, pixel_ratio);
        this.__wbg_ptr = ret;
        WindowFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
}
if (Symbol.dispose) Window.prototype[Symbol.dispose] = Window.prototype.free;

/**
 * @param {number} radian
 * @returns {number}
 */
export function angleToDegree(radian) {
    const ret = wasm.angleToDegree(radian);
    return ret;
}

/**
 * @param {number} degree
 * @returns {number}
 */
export function angleToRadian(degree) {
    const ret = wasm.angleToRadian(degree);
    return ret;
}

/**
 * Builds the geometry of one standalone polygon.
 *
 * `coordinates` holds the outer ring then the holes as `[x, y, z, ...]`, with
 * vertex counts in `ring_lengths`. `geocentric` reads them as ECEF metres
 * instead of lng/lat/height. `material` is a `polygon` layer material.
 *
 * Throws when `material` does not deserialize. Returns `undefined` when the
 * outer ring has fewer than three vertices or is collinear.
 * @param {Float64Array} coordinates
 * @param {Uint32Array} ring_lengths
 * @param {boolean} geocentric
 * @param {any} material
 * @returns {ConstructedPolygonGeometry | undefined}
 */
export function buildPolygonGeometry(coordinates, ring_lengths, geocentric, material) {
    const ptr0 = passArrayF64ToWasm0(coordinates, wasm.__wbindgen_malloc);
    const len0 = WASM_VECTOR_LEN;
    const ptr1 = passArray32ToWasm0(ring_lengths, wasm.__wbindgen_malloc);
    const len1 = WASM_VECTOR_LEN;
    const ret = wasm.buildPolygonGeometry(ptr0, len0, ptr1, len1, geocentric, material);
    if (ret[2]) {
        throw takeFromExternrefTable0(ret[1]);
    }
    return ret[0] === 0 ? undefined : ConstructedPolygonGeometry.__wrap(ret[0]);
}

/**
 * Builds the geometry of one standalone polyline.
 *
 * `coordinates` is a flat `[x, y, z, ...]` buffer, read as ECEF metres when
 * `geocentric`, otherwise lng/lat/height. `ring` joins a repeated first vertex
 * as a seam instead of two caps. `material` is a `polyline` layer material.
 *
 * Throws when `material` does not deserialize. Returns `undefined` when
 * fewer than two distinct positions remain.
 * @param {Float64Array} coordinates
 * @param {boolean} geocentric
 * @param {boolean} ring
 * @param {any} material
 * @returns {ConstructedPolylineGeometry | undefined}
 */
export function buildPolylineGeometry(coordinates, geocentric, ring, material) {
    const ptr0 = passArrayF64ToWasm0(coordinates, wasm.__wbindgen_malloc);
    const len0 = WASM_VECTOR_LEN;
    const ret = wasm.buildPolylineGeometry(ptr0, len0, geocentric, ring, material);
    if (ret[2]) {
        throw takeFromExternrefTable0(ret[1]);
    }
    return ret[0] === 0 ? undefined : ConstructedPolylineGeometry.__wrap(ret[0]);
}

/**
 * Run one placement pass. Returns a `hidden` flag (0 or 1) per candidate, in the
 * same order as the input slice.
 *
 * `candidates` is a packed `f64` slice of `n * CANDIDATE_STRIDE` values (see the
 * module docs); `view` and `proj` are column-major 4×4 matrices (16 values each).
 * `padding_px` pads every box; `hysteresis_px` is the collision-test shrink
 * applied only to currently-shown labels.
 *
 * The result is *hidden-by-default*: only a label that claimed space inside the
 * tracked area (viewport + grid margin) comes back shown. Off-screen and
 * GPU-culled labels stay hidden so they cannot fade in unseen and then pan into
 * view at full opacity.
 * @param {Float64Array} candidates
 * @param {Float64Array} view
 * @param {Float64Array} proj
 * @param {number} camera_x
 * @param {number} camera_y
 * @param {number} camera_z
 * @param {number} near
 * @param {number} width_px
 * @param {number} height_px
 * @param {number} fov_rad
 * @param {number} padding_px
 * @param {number} hysteresis_px
 * @returns {Uint8Array}
 */
export function declutterPlace(candidates, view, proj, camera_x, camera_y, camera_z, near, width_px, height_px, fov_rad, padding_px, hysteresis_px) {
    const ptr0 = passArrayF64ToWasm0(candidates, wasm.__wbindgen_malloc);
    const len0 = WASM_VECTOR_LEN;
    const ptr1 = passArrayF64ToWasm0(view, wasm.__wbindgen_malloc);
    const len1 = WASM_VECTOR_LEN;
    const ptr2 = passArrayF64ToWasm0(proj, wasm.__wbindgen_malloc);
    const len2 = WASM_VECTOR_LEN;
    const ret = wasm.declutterPlace(ptr0, len0, ptr1, len1, ptr2, len2, camera_x, camera_y, camera_z, near, width_px, height_px, fov_rad, padding_px, hysteresis_px);
    var v4 = getArrayU8FromWasm0(ret[0], ret[1]).slice();
    wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
    return v4;
}

/**
 * @param {Vec3} origin
 * @returns {Float64Array}
 */
export function eastNorthUpToFixedFrame(origin) {
    _assertClass(origin, Vec3);
    var ptr0 = origin.__destroy_into_raw();
    const ret = wasm.eastNorthUpToFixedFrame(ptr0);
    var v2 = getArrayF64FromWasm0(ret[0], ret[1]).slice();
    wasm.__wbindgen_free(ret[0], ret[1] * 8, 8);
    return v2;
}

/**
 * Encode a camera position into RTE high/low components
 *
 * Takes camera position in f64 ECEF coordinates and returns
 * an EncodedCamera with separate high and low f32 components
 * for each axis, enabling GPU RTE rendering.
 *
 * # Arguments
 * * `x` - Camera X position in ECEF coordinates (meters)
 * * `y` - Camera Y position in ECEF coordinates (meters)
 * * `z` - Camera Z position in ECEF coordinates (meters)
 *
 * # Example
 * ```ignore
 * // In JavaScript/TypeScript:
 * const camera = encodeCamera(6371000.0, 0.0, 0.0);
 * // Use camera.high_x, camera.low_x, etc. in shaders
 * ```
 * @param {number} x
 * @param {number} y
 * @param {number} z
 * @returns {EncodedVec3}
 */
export function encodePosition(x, y, z) {
    const ret = wasm.encodePosition(x, y, z);
    return EncodedVec3.__wrap(ret);
}

/**
 * @param {LLE} lle
 * @returns {Vec3}
 */
export function geodeticSurfaceNormal(lle) {
    _assertClass(lle, LLE);
    var ptr0 = lle.__destroy_into_raw();
    const ret = wasm.geodeticSurfaceNormal(ptr0);
    return Vec3.__wrap(ret);
}

/**
 * @param {LLE} lle
 * @returns {Vec3}
 */
export function geodeticToXyz(lle) {
    _assertClass(lle, LLE);
    var ptr0 = lle.__destroy_into_raw();
    const ret = wasm.geodeticToXyz(ptr0);
    return Vec3.__wrap(ret);
}

/**
 * @param {Vec3} point
 * @returns {number}
 */
export function getHeightFromEllipsoid(point) {
    _assertClass(point, Vec3);
    var ptr0 = point.__destroy_into_raw();
    const ret = wasm.getHeightFromEllipsoid(ptr0);
    return ret;
}

/**
 * @param {Window} window
 * @param {Transform} transform
 * @param {CameraFrustum} frustum
 * @param {Vec2} screen_pos
 * @returns {Ray}
 */
export function getPickRay(window, transform, frustum, screen_pos) {
    _assertClass(window, Window);
    var ptr0 = window.__destroy_into_raw();
    _assertClass(transform, Transform);
    var ptr1 = transform.__destroy_into_raw();
    _assertClass(frustum, CameraFrustum);
    var ptr2 = frustum.__destroy_into_raw();
    _assertClass(screen_pos, Vec2);
    var ptr3 = screen_pos.__destroy_into_raw();
    const ret = wasm.getPickRay(ptr0, ptr1, ptr2, ptr3);
    return Ray.__wrap(ret);
}

/**
 * @param {Vec3} point
 * @param {Vec3} normal
 * @returns {Plane}
 */
export function getPlaneFromPointNormal(point, normal) {
    _assertClass(point, Vec3);
    var ptr0 = point.__destroy_into_raw();
    _assertClass(normal, Vec3);
    var ptr1 = normal.__destroy_into_raw();
    const ret = wasm.getPlaneFromPointNormal(ptr0, ptr1);
    return Plane.__wrap(ret);
}

/**
 * @param {Ray} ray
 * @param {Plane} plane
 * @returns {Vec3 | undefined}
 */
export function getRayPlaneIntersection(ray, plane) {
    _assertClass(ray, Ray);
    var ptr0 = ray.__destroy_into_raw();
    _assertClass(plane, Plane);
    var ptr1 = plane.__destroy_into_raw();
    const ret = wasm.getRayPlaneIntersection(ptr0, ptr1);
    return ret === 0 ? undefined : Vec3.__wrap(ret);
}

/**
 * @returns {number}
 */
export function getWGS84Eccentricity() {
    const ret = wasm.getWGS84Eccentricity();
    return ret;
}

/**
 * @returns {number}
 */
export function getWGS84EccentricitySquared() {
    const ret = wasm.getWGS84EccentricitySquared();
    return ret;
}

/**
 * @returns {number}
 */
export function getWGS84Flattening() {
    const ret = wasm.getWGS84Flattening();
    return ret;
}

/**
 * @returns {number}
 */
export function getWGS84SemiMajorAxis() {
    const ret = wasm.getWGS84SemiMajorAxis();
    return ret;
}

/**
 * @returns {number}
 */
export function getWGS84SemiMinorAxis() {
    const ret = wasm.getWGS84SemiMinorAxis();
    return ret;
}

/**
 * @param {Vec3} origin
 * @returns {Float64Array}
 */
export function northEastDownToFixedFrame(origin) {
    _assertClass(origin, Vec3);
    var ptr0 = origin.__destroy_into_raw();
    const ret = wasm.northEastDownToFixedFrame(ptr0);
    var v2 = getArrayF64FromWasm0(ret[0], ret[1]).slice();
    wasm.__wbindgen_free(ret[0], ret[1] * 8, 8);
    return v2;
}

/**
 * @param {Vec3} origin
 * @returns {Float64Array}
 */
export function northUpEastToFixedFrame(origin) {
    _assertClass(origin, Vec3);
    var ptr0 = origin.__destroy_into_raw();
    const ret = wasm.northUpEastToFixedFrame(ptr0);
    var v2 = getArrayF64FromWasm0(ret[0], ret[1]).slice();
    wasm.__wbindgen_free(ret[0], ret[1] * 8, 8);
    return v2;
}

/**
 * @param {Vec3} origin
 * @returns {Float64Array}
 */
export function northWestUpToFixedFrame(origin) {
    _assertClass(origin, Vec3);
    var ptr0 = origin.__destroy_into_raw();
    const ret = wasm.northWestUpToFixedFrame(ptr0);
    var v2 = getArrayF64FromWasm0(ret[0], ret[1]).slice();
    wasm.__wbindgen_free(ret[0], ret[1] * 8, 8);
    return v2;
}

/**
 * @param {string} value
 * @returns {any}
 */
export function parseCssUnicodeRange(value) {
    const ptr0 = passStringToWasm0(value, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len0 = WASM_VECTOR_LEN;
    const ret = wasm.parseCssUnicodeRange(ptr0, len0);
    if (ret[2]) {
        throw takeFromExternrefTable0(ret[1]);
    }
    return takeFromExternrefTable0(ret[0]);
}

/**
 * @param {string} family
 * @param {string} css_text
 * @param {any} options
 * @returns {any}
 */
export function parseFontFamilyFromCss(family, css_text, options) {
    const ptr0 = passStringToWasm0(family, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len0 = WASM_VECTOR_LEN;
    const ptr1 = passStringToWasm0(css_text, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len1 = WASM_VECTOR_LEN;
    const ret = wasm.parseFontFamilyFromCss(ptr0, len0, ptr1, len1, options);
    if (ret[2]) {
        throw takeFromExternrefTable0(ret[1]);
    }
    return takeFromExternrefTable0(ret[0]);
}

/**
 * `[min, max]` height a clamp-to-ground polygon volume over the extent (radians)
 * must span to enclose ground heights from `min_height` to `max_height`.
 * @param {number} min_height
 * @param {number} max_height
 * @param {number} west
 * @param {number} south
 * @param {number} east
 * @param {number} north
 * @returns {Float64Array}
 */
export function polygonGroundVolume(min_height, max_height, west, south, east, north) {
    const ret = wasm.polygonGroundVolume(min_height, max_height, west, south, east, north);
    var v1 = getArrayF64FromWasm0(ret[0], ret[1]).slice();
    wasm.__wbindgen_free(ret[0], ret[1] * 8, 8);
    return v1;
}

/**
 * `[min, max]` height a clamp-to-ground polyline volume over the extent (radians)
 * must span to enclose ground heights from `min_height` to `max_height`.
 * @param {number} min_height
 * @param {number} max_height
 * @param {number} west
 * @param {number} south
 * @param {number} east
 * @param {number} north
 * @returns {Float64Array}
 */
export function polylineGroundVolume(min_height, max_height, west, south, east, north) {
    const ret = wasm.polylineGroundVolume(min_height, max_height, west, south, east, north);
    var v1 = getArrayF64FromWasm0(ret[0], ret[1]).slice();
    wasm.__wbindgen_free(ret[0], ret[1] * 8, 8);
    return v1;
}

/**
 * Heights of a quantized-mesh tile at each `[lng, lat]` pair (radians),
 * interpolated across the decoded mesh's own triangles. Returns `undefined`
 * when the bytes don't decode as quantized-mesh. Positions are expected to
 * lie inside tile (x, y, z); ones outside read the nearest mesh vertex.
 * @param {Uint8Array} bytes
 * @param {boolean} geographic
 * @param {number} x
 * @param {number} y
 * @param {number} z
 * @param {Float64Array} positions
 * @returns {Float64Array | undefined}
 */
export function sampleQuantizedMeshHeights(bytes, geographic, x, y, z, positions) {
    const ptr0 = passArray8ToWasm0(bytes, wasm.__wbindgen_malloc);
    const len0 = WASM_VECTOR_LEN;
    const ptr1 = passArrayF64ToWasm0(positions, wasm.__wbindgen_malloc);
    const len1 = WASM_VECTOR_LEN;
    const ret = wasm.sampleQuantizedMeshHeights(ptr0, len0, geographic, x, y, z, ptr1, len1);
    let v3;
    if (ret[0] !== 0) {
        v3 = getArrayF64FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 8, 8);
    }
    return v3;
}

/**
 * Heights of a raster-DEM tile (WebMercator, square RGBA image) at each
 * `[lng, lat]` pair (radians), bilinear over the decoded grid. `decoder` is
 * a plain `ElevationDecoder`-shaped object. Returns `undefined` when the
 * decoder doesn't deserialize or the image is empty.
 * @param {Uint8Array} rgba
 * @param {any} decoder
 * @param {number} x
 * @param {number} y
 * @param {number} z
 * @param {Float64Array} positions
 * @returns {Float64Array | undefined}
 */
export function sampleRasterDemHeights(rgba, decoder, x, y, z, positions) {
    const ptr0 = passArray8ToWasm0(rgba, wasm.__wbindgen_malloc);
    const len0 = WASM_VECTOR_LEN;
    const ptr1 = passArrayF64ToWasm0(positions, wasm.__wbindgen_malloc);
    const len1 = WASM_VECTOR_LEN;
    const ret = wasm.sampleRasterDemHeights(ptr0, len0, decoder, x, y, z, ptr1, len1);
    let v3;
    if (ret[0] !== 0) {
        v3 = getArrayF64FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 8, 8);
    }
    return v3;
}

/**
 * @param {Vec3} vec3
 * @returns {Vec3 | undefined}
 */
export function scaleToGeodeticSurface(vec3) {
    _assertClass(vec3, Vec3);
    var ptr0 = vec3.__destroy_into_raw();
    const ret = wasm.scaleToGeodeticSurface(ptr0);
    return ret === 0 ? undefined : Vec3.__wrap(ret);
}

/**
 * @param {Window} window
 * @param {Transform} transform
 * @param {CameraFrustum} frustum
 * @param {Vec2} screen_pos
 * @returns {Vec3 | undefined}
 */
export function screenToWorld(window, transform, frustum, screen_pos) {
    _assertClass(window, Window);
    var ptr0 = window.__destroy_into_raw();
    _assertClass(transform, Transform);
    var ptr1 = transform.__destroy_into_raw();
    _assertClass(frustum, CameraFrustum);
    var ptr2 = frustum.__destroy_into_raw();
    _assertClass(screen_pos, Vec2);
    var ptr3 = screen_pos.__destroy_into_raw();
    const ret = wasm.screenToWorld(ptr0, ptr1, ptr2, ptr3);
    return ret === 0 ? undefined : Vec3.__wrap(ret);
}

export function start() {
    wasm.start();
}

/**
 * Tile (x, y) containing each `[lng, lat]` pair at `level`, flattened as
 * `[x0, y0, x1, y1, ...]`. Internal XYZ-style y (north-origin) — the TMS
 * flip happens in URL building, not here.
 * @param {boolean} geographic
 * @param {number} level
 * @param {Float64Array} positions
 * @returns {Uint32Array}
 */
export function terrainPositionsToTiles(geographic, level, positions) {
    const ptr0 = passArrayF64ToWasm0(positions, wasm.__wbindgen_malloc);
    const len0 = WASM_VECTOR_LEN;
    const ret = wasm.terrainPositionsToTiles(geographic, level, ptr0, len0);
    var v2 = getArrayU32FromWasm0(ret[0], ret[1]).slice();
    wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
    return v2;
}

/**
 * Tile URL from the engine's own template expansion, including the TMS
 * y-flip — sampling must fetch exactly the URLs rendering would.
 * @param {string} template
 * @param {boolean} geographic
 * @param {boolean} tms
 * @param {number} x
 * @param {number} y
 * @param {number} z
 * @returns {string}
 */
export function terrainTileUrl(template, geographic, tms, x, y, z) {
    let deferred2_0;
    let deferred2_1;
    try {
        const ptr0 = passStringToWasm0(template, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.terrainTileUrl(ptr0, len0, geographic, tms, x, y, z);
        deferred2_0 = ret[0];
        deferred2_1 = ret[1];
        return getStringFromWasm0(ret[0], ret[1]);
    } finally {
        wasm.__wbindgen_free(deferred2_0, deferred2_1, 1);
    }
}

/**
 * @param {Window} window
 * @param {Transform} transform
 * @param {CameraFrustum} frustum
 * @param {Vec3} world_pos
 * @returns {Vec2 | undefined}
 */
export function worldToScreen(window, transform, frustum, world_pos) {
    _assertClass(window, Window);
    var ptr0 = window.__destroy_into_raw();
    _assertClass(transform, Transform);
    var ptr1 = transform.__destroy_into_raw();
    _assertClass(frustum, CameraFrustum);
    var ptr2 = frustum.__destroy_into_raw();
    _assertClass(world_pos, Vec3);
    var ptr3 = world_pos.__destroy_into_raw();
    const ret = wasm.worldToScreen(ptr0, ptr1, ptr2, ptr3);
    return ret === 0 ? undefined : Vec2.__wrap(ret);
}

/**
 * @param {Vec3} vec3
 * @returns {LLE}
 */
export function xyzToGeodetic(vec3) {
    _assertClass(vec3, Vec3);
    var ptr0 = vec3.__destroy_into_raw();
    const ret = wasm.xyzToGeodetic(ptr0);
    return LLE.__wrap(ret);
}
function __wbg_get_imports() {
    const import0 = {
        __proto__: null,
        __wbg_Error_408e67f47ca7b58b: function(arg0, arg1) {
            const ret = Error(getStringFromWasm0(arg0, arg1));
            return ret;
        },
        __wbg_Number_3890faa6d3ff057d: function(arg0) {
            const ret = Number(arg0);
            return ret;
        },
        __wbg_String_8564e559799eccda: function(arg0, arg1) {
            const ret = String(arg1);
            const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        },
        __wbg___wbindgen_bigint_get_as_i64_c4ecf48528083721: function(arg0, arg1) {
            const v = arg1;
            const ret = typeof(v) === 'bigint' ? v : undefined;
            getDataViewMemory0().setBigInt64(arg0 + 8 * 1, isLikeNone(ret) ? BigInt(0) : ret, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, !isLikeNone(ret), true);
        },
        __wbg___wbindgen_boolean_get_c9c83ebd41b34df3: function(arg0) {
            const v = arg0;
            const ret = typeof(v) === 'boolean' ? v : undefined;
            return isLikeNone(ret) ? 0xFFFFFF : ret ? 1 : 0;
        },
        __wbg___wbindgen_debug_string_a57024b9c6e4a48b: function(arg0, arg1) {
            const ret = debugString(arg1);
            const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        },
        __wbg___wbindgen_in_ac983077f137f2e6: function(arg0, arg1) {
            const ret = arg0 in arg1;
            return ret;
        },
        __wbg___wbindgen_is_bigint_8ffbbef442139384: function(arg0) {
            const ret = typeof(arg0) === 'bigint';
            return ret;
        },
        __wbg___wbindgen_is_function_5e4570eb24ffa122: function(arg0) {
            const ret = typeof(arg0) === 'function';
            return ret;
        },
        __wbg___wbindgen_is_null_7d13f41e1a2d5140: function(arg0) {
            const ret = arg0 === null;
            return ret;
        },
        __wbg___wbindgen_is_object_a2790eb24c211ea0: function(arg0) {
            const val = arg0;
            const ret = typeof(val) === 'object' && val !== null;
            return ret;
        },
        __wbg___wbindgen_is_undefined_6cff064c44e0d823: function(arg0) {
            const ret = arg0 === undefined;
            return ret;
        },
        __wbg___wbindgen_jsval_eq_0a18949a61670320: function(arg0, arg1) {
            const ret = arg0 === arg1;
            return ret;
        },
        __wbg___wbindgen_jsval_loose_eq_acf2776254a8d832: function(arg0, arg1) {
            const ret = arg0 == arg1;
            return ret;
        },
        __wbg___wbindgen_memory_5dc2a138835b0f8e: function() {
            const ret = wasm.memory;
            return ret;
        },
        __wbg___wbindgen_number_get_136b9679cab35cfb: function(arg0, arg1) {
            const obj = arg1;
            const ret = typeof(obj) === 'number' ? obj : undefined;
            getDataViewMemory0().setFloat64(arg0 + 8 * 1, isLikeNone(ret) ? 0 : ret, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, !isLikeNone(ret), true);
        },
        __wbg___wbindgen_string_get_d154f1e671052120: function(arg0, arg1) {
            const obj = arg1;
            const ret = typeof(obj) === 'string' ? obj : undefined;
            var ptr1 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            var len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        },
        __wbg___wbindgen_throw_bb96b2010945f0bc: function(arg0, arg1) {
            throw new Error(getStringFromWasm0(arg0, arg1));
        },
        __wbg_buffer_8117fe4dab119813: function(arg0) {
            const ret = arg0.buffer;
            return ret;
        },
        __wbg_call_1c5886ab9c57d1c7: function() { return handleError(function (arg0, arg1) {
            const ret = arg0.call(arg1);
            return ret;
        }, arguments); },
        __wbg_call_35dba3c747ad7521: function() { return handleError(function (arg0, arg1, arg2) {
            const ret = arg0.call(arg1, arg2);
            return ret;
        }, arguments); },
        __wbg_done_669171204c3dcae2: function(arg0) {
            const ret = arg0.done;
            return ret;
        },
        __wbg_dracoattributeid_new: function(arg0) {
            const ret = DracoAttributeId.__wrap(arg0);
            return ret;
        },
        __wbg_dracoattributeid_unwrap: function(arg0) {
            const ret = DracoAttributeId.__unwrap(arg0);
            return ret;
        },
        __wbg_entries_7774d489e1da5f4f: function(arg0) {
            const ret = Object.entries(arg0);
            return ret;
        },
        __wbg_get_c0c8f8d7da0c03dd: function(arg0, arg1) {
            const ret = arg0[arg1 >>> 0];
            return ret;
        },
        __wbg_get_d173c0308df22d37: function() { return handleError(function (arg0, arg1) {
            const ret = Reflect.get(arg0, arg1);
            return ret;
        }, arguments); },
        __wbg_get_unchecked_e20b893aeafc3fca: function(arg0, arg1) {
            const ret = arg0[arg1 >>> 0];
            return ret;
        },
        __wbg_get_with_ref_key_6412cf3094599694: function(arg0, arg1) {
            const ret = arg0[arg1];
            return ret;
        },
        __wbg_instanceof_ArrayBuffer_993d02d2d254cad1: function(arg0) {
            let result;
            try {
                result = arg0 instanceof ArrayBuffer;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_Map_9a4d6ead180ae3a9: function(arg0) {
            let result;
            try {
                result = arg0 instanceof Map;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_Uint8Array_f935dbb0aa7cdeed: function(arg0) {
            let result;
            try {
                result = arg0 instanceof Uint8Array;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_isArray_6339f732981044bf: function(arg0) {
            const ret = Array.isArray(arg0);
            return ret;
        },
        __wbg_isSafeInteger_f3d6cd19ccfe4512: function(arg0) {
            const ret = Number.isSafeInteger(arg0);
            return ret;
        },
        __wbg_iterator_5cebbb86e33c6dd6: function() {
            const ret = Symbol.iterator;
            return ret;
        },
        __wbg_length_1009454859bb3e03: function(arg0) {
            const ret = arg0.length;
            return ret;
        },
        __wbg_length_36bd29c6848c2144: function(arg0) {
            const ret = arg0.length;
            return ret;
        },
        __wbg_length_46f80504ebb6ebb4: function(arg0) {
            const ret = arg0.length;
            return ret;
        },
        __wbg_length_7528cf2a241bef97: function(arg0) {
            const ret = arg0.length;
            return ret;
        },
        __wbg_length_ecfa2c63d3d0d82c: function(arg0) {
            const ret = arg0.length;
            return ret;
        },
        __wbg_lle_new: function(arg0) {
            const ret = LLE.__wrap(arg0);
            return ret;
        },
        __wbg_log_12e4fe682663fedd: function(arg0, arg1) {
            console.log(getStringFromWasm0(arg0, arg1));
        },
        __wbg_new_078f4f4b1eaabdec: function(arg0) {
            const ret = new Float32Array(arg0);
            return ret;
        },
        __wbg_new_116be93542d39019: function() {
            const ret = new Array();
            return ret;
        },
        __wbg_new_2aa179ec5b1fefa8: function(arg0) {
            const ret = new Float64Array(arg0);
            return ret;
        },
        __wbg_new_68c044c0b3877148: function(arg0) {
            const ret = new Uint32Array(arg0);
            return ret;
        },
        __wbg_new_77cc4f4f472aeb81: function(arg0) {
            const ret = new Uint8Array(arg0);
            return ret;
        },
        __wbg_new_ebe3e0f6837f0879: function() {
            const ret = new Object();
            return ret;
        },
        __wbg_new_with_byte_offset_and_length_042855770b1f0cf5: function(arg0, arg1, arg2) {
            const ret = new Uint32Array(arg0, arg1 >>> 0, arg2 >>> 0);
            return ret;
        },
        __wbg_new_with_byte_offset_and_length_8a19fd6506a908ea: function(arg0, arg1, arg2) {
            const ret = new Float64Array(arg0, arg1 >>> 0, arg2 >>> 0);
            return ret;
        },
        __wbg_new_with_byte_offset_and_length_ff6e927f8d72f0c3: function(arg0, arg1, arg2) {
            const ret = new Uint8Array(arg0, arg1 >>> 0, arg2 >>> 0);
            return ret;
        },
        __wbg_next_42cf16ee0dafc9e2: function() { return handleError(function (arg0) {
            const ret = arg0.next();
            return ret;
        }, arguments); },
        __wbg_next_8f26b64fa5e9f64b: function(arg0) {
            const ret = arg0.next;
            return ret;
        },
        __wbg_prototypesetcall_de8e0d9553586985: function(arg0, arg1, arg2) {
            Uint8Array.prototype.set.call(getArrayU8FromWasm0(arg0, arg1), arg2);
        },
        __wbg_push_adb0107829f02d75: function(arg0, arg1) {
            const ret = arg0.push(arg1);
            return ret;
        },
        __wbg_set_22c3e3730946c809: function(arg0, arg1, arg2) {
            arg0.set(getArrayF64FromWasm0(arg1, arg2));
        },
        __wbg_set_577f5f7485b6744e: function(arg0, arg1, arg2) {
            arg0.set(getArrayF32FromWasm0(arg1, arg2));
        },
        __wbg_set_6be42768c690e380: function(arg0, arg1, arg2) {
            arg0[arg1] = arg2;
        },
        __wbg_set_8155bb79a948541b: function() { return handleError(function (arg0, arg1, arg2) {
            const ret = Reflect.set(arg0, arg1, arg2);
            return ret;
        }, arguments); },
        __wbg_set_a80955eb93b145c6: function(arg0, arg1, arg2) {
            arg0[arg1 >>> 0] = arg2;
        },
        __wbg_set_b9b5b5cb7b495037: function(arg0, arg1, arg2) {
            arg0.set(getArrayU8FromWasm0(arg1, arg2));
        },
        __wbg_set_e575799cdfbae72f: function(arg0, arg1, arg2) {
            arg0.set(getArrayU32FromWasm0(arg1, arg2));
        },
        __wbg_texturefragment_new: function(arg0) {
            const ret = TextureFragment.__wrap(arg0);
            return ret;
        },
        __wbg_tileuvtransform_new: function(arg0) {
            const ret = TileUvTransform.__wrap(arg0);
            return ret;
        },
        __wbg_value_1e2369fab29b420e: function(arg0) {
            const ret = arg0.value;
            return ret;
        },
        __wbindgen_cast_0000000000000001: function(arg0) {
            // Cast intrinsic for `F64 -> Externref`.
            const ret = arg0;
            return ret;
        },
        __wbindgen_cast_0000000000000002: function(arg0) {
            // Cast intrinsic for `I64 -> Externref`.
            const ret = arg0;
            return ret;
        },
        __wbindgen_cast_0000000000000003: function(arg0, arg1) {
            // Cast intrinsic for `Ref(String) -> Externref`.
            const ret = getStringFromWasm0(arg0, arg1);
            return ret;
        },
        __wbindgen_cast_0000000000000004: function(arg0) {
            // Cast intrinsic for `U64 -> Externref`.
            const ret = BigInt.asUintN(64, arg0);
            return ret;
        },
        __wbindgen_init_externref_table: function() {
            const table = wasm.__wbindgen_externrefs;
            const offset = table.grow(4);
            table.set(0, undefined);
            table.set(offset + 0, undefined);
            table.set(offset + 1, null);
            table.set(offset + 2, true);
            table.set(offset + 3, false);
        },
    };
    return {
        __proto__: null,
        "./navara_wasm_api_bg.js": import0,
    };
}

const AabbFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_aabb_free(ptr, 1));
const BatchPropResultFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_batchpropresult_free(ptr, 1));
const BillboardMaterialFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_billboardmaterial_free(ptr, 1));
const BoundingSphereFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_boundingsphere_free(ptr, 1));
const CachedMeshHandleFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_cachedmeshhandle_free(ptr, 1));
const CameraControlUpdateEventFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_cameracontrolupdateevent_free(ptr, 1));
const CameraFlightEndedEventFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_cameraflightendedevent_free(ptr, 1));
const CameraFrustumFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_camerafrustum_free(ptr, 1));
const CameraOrientationFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_cameraorientation_free(ptr, 1));
const CameraStatusFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_camerastatus_free(ptr, 1));
const CompiledExpressionFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_compiledexpression_free(ptr, 1));
const CompiledFilterFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_compiledfilter_free(ptr, 1));
const ConstructedPolygonGeometryFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_constructedpolygongeometry_free(ptr, 1));
const ConstructedPolygonOutlineGeometryFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_constructedpolygonoutlinegeometry_free(ptr, 1));
const ConstructedPolylineGeometryFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_constructedpolylinegeometry_free(ptr, 1));
const DracoAttributeIdFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_dracoattributeid_free(ptr, 1));
const ElevationDecoderFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_elevationdecoder_free(ptr, 1));
const ElevationHeatmapMaterialFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_elevationheatmapmaterial_free(ptr, 1));
const EllipsoidGeodesicFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_ellipsoidgeodesic_free(ptr, 1));
const EncodedVec3Finalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_encodedvec3_free(ptr, 1));
const ExtentRadianF32Finalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_extentradianf32_free(ptr, 1));
const FloatAttributeFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_floatattribute_free(ptr, 1));
const GeometryFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_geometry_free(ptr, 1));
const GlobeFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_globe_free(ptr, 1));
const HillshadeMaterialFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_hillshadematerial_free(ptr, 1));
const LLEFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_lle_free(ptr, 1));
const ModelInternalMaterialFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_modelinternalmaterial_free(ptr, 1));
const ModelMaterialFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_modelmaterial_free(ptr, 1));
const NearFarFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_nearfar_free(ptr, 1));
const OverscaledTileHandleFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_overscaledtilehandle_free(ptr, 1));
const PlaneFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_plane_free(ptr, 1));
const PointMaterialFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_pointmaterial_free(ptr, 1));
const PolygonGeometryFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_polygongeometry_free(ptr, 1));
const PolygonGeometryAttributesFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_polygongeometryattributes_free(ptr, 1));
const PolygonInternalMaterialFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_polygoninternalmaterial_free(ptr, 1));
const PolygonMaterialFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_polygonmaterial_free(ptr, 1));
const PolylineGeometryFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_polylinegeometry_free(ptr, 1));
const PolylineGeometryAttributesFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_polylinegeometryattributes_free(ptr, 1));
const PolylineInternalMaterialFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_polylineinternalmaterial_free(ptr, 1));
const PolylineMaterialFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_polylinematerial_free(ptr, 1));
const RasterMaterialFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_rastermaterial_free(ptr, 1));
const RasterTileInternalMaterialFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_rastertileinternalmaterial_free(ptr, 1));
const RayFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_ray_free(ptr, 1));
const ReturnedConstructedTerrainMeshFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_returnedconstructedterrainmesh_free(ptr, 1));
const TerrainMaterialFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_terrainmaterial_free(ptr, 1));
const TextMaterialFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_textmaterial_free(ptr, 1));
const TextureFragmentFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_texturefragment_free(ptr, 1));
const TileUvTransformFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_tileuvtransform_free(ptr, 1));
const TileXYZFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_tilexyz_free(ptr, 1));
const TransferableHierarchyFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_transferablehierarchy_free(ptr, 1));
const TransferableHolesFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_transferableholes_free(ptr, 1));
const TransferableParsedMvtResultFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_transferableparsedmvtresult_free(ptr, 1));
const TransferablePolygonBatchedFeatureFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_transferablepolygonbatchedfeature_free(ptr, 1));
const TransferablePolylineBatchedFeatureFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_transferablepolylinebatchedfeature_free(ptr, 1));
const TransformFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_transform_free(ptr, 1));
const UintAttributeFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_uintattribute_free(ptr, 1));
const UpsamplableTerrainGeometryFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_upsamplableterraingeometry_free(ptr, 1));
const Vec2Finalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_vec2_free(ptr, 1));
const Vec3Finalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_vec3_free(ptr, 1));
const WindingOrderFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_windingorder_free(ptr, 1));
const WindowFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_window_free(ptr, 1));

function addToExternrefTable0(obj) {
    const idx = wasm.__externref_table_alloc();
    wasm.__wbindgen_externrefs.set(idx, obj);
    return idx;
}

function _assertClass(instance, klass) {
    if (!(instance instanceof klass)) {
        throw new Error(`expected instance of ${klass.name}`);
    }
}

function debugString(val) {
    // primitive types
    const type = typeof val;
    if (type == 'number' || type == 'boolean' || val == null) {
        return  `${val}`;
    }
    if (type == 'string') {
        return `"${val}"`;
    }
    if (type == 'symbol') {
        const description = val.description;
        if (description == null) {
            return 'Symbol';
        } else {
            return `Symbol(${description})`;
        }
    }
    if (type == 'function') {
        const name = val.name;
        if (typeof name == 'string' && name.length > 0) {
            return `Function(${name})`;
        } else {
            return 'Function';
        }
    }
    // objects
    if (Array.isArray(val)) {
        const length = val.length;
        let debug = '[';
        if (length > 0) {
            debug += debugString(val[0]);
        }
        for(let i = 1; i < length; i++) {
            debug += ', ' + debugString(val[i]);
        }
        debug += ']';
        return debug;
    }
    // Test for built-in
    const builtInMatches = /\[object ([^\]]+)\]/.exec(toString.call(val));
    let className;
    if (builtInMatches && builtInMatches.length > 1) {
        className = builtInMatches[1];
    } else {
        // Failed to match the standard '[object ClassName]'
        return toString.call(val);
    }
    if (className == 'Object') {
        // we're a user defined class or Object
        // JSON.stringify avoids problems with cycles, and is generally much
        // easier than looping through ownProperties of `val`.
        try {
            return 'Object(' + JSON.stringify(val) + ')';
        } catch (_) {
            return 'Object';
        }
    }
    // errors
    if (val instanceof Error) {
        return `${val.name}: ${val.message}\n${val.stack}`;
    }
    // TODO we could test for more things here, like `Set`s and `Map`s.
    return className;
}

function getArrayF32FromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return getFloat32ArrayMemory0().subarray(ptr / 4, ptr / 4 + len);
}

function getArrayF64FromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return getFloat64ArrayMemory0().subarray(ptr / 8, ptr / 8 + len);
}

function getArrayJsValueFromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    const mem = getDataViewMemory0();
    const result = [];
    for (let i = ptr; i < ptr + 4 * len; i += 4) {
        result.push(wasm.__wbindgen_externrefs.get(mem.getUint32(i, true)));
    }
    wasm.__externref_drop_slice(ptr, len);
    return result;
}

function getArrayU32FromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return getUint32ArrayMemory0().subarray(ptr / 4, ptr / 4 + len);
}

function getArrayU8FromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return getUint8ArrayMemory0().subarray(ptr / 1, ptr / 1 + len);
}

let cachedDataViewMemory0 = null;
function getDataViewMemory0() {
    if (cachedDataViewMemory0 === null || cachedDataViewMemory0.buffer.detached === true || (cachedDataViewMemory0.buffer.detached === undefined && cachedDataViewMemory0.buffer !== wasm.memory.buffer)) {
        cachedDataViewMemory0 = new DataView(wasm.memory.buffer);
    }
    return cachedDataViewMemory0;
}

let cachedFloat32ArrayMemory0 = null;
function getFloat32ArrayMemory0() {
    if (cachedFloat32ArrayMemory0 === null || cachedFloat32ArrayMemory0.byteLength === 0) {
        cachedFloat32ArrayMemory0 = new Float32Array(wasm.memory.buffer);
    }
    return cachedFloat32ArrayMemory0;
}

let cachedFloat64ArrayMemory0 = null;
function getFloat64ArrayMemory0() {
    if (cachedFloat64ArrayMemory0 === null || cachedFloat64ArrayMemory0.byteLength === 0) {
        cachedFloat64ArrayMemory0 = new Float64Array(wasm.memory.buffer);
    }
    return cachedFloat64ArrayMemory0;
}

function getStringFromWasm0(ptr, len) {
    return decodeText(ptr >>> 0, len);
}

let cachedUint32ArrayMemory0 = null;
function getUint32ArrayMemory0() {
    if (cachedUint32ArrayMemory0 === null || cachedUint32ArrayMemory0.byteLength === 0) {
        cachedUint32ArrayMemory0 = new Uint32Array(wasm.memory.buffer);
    }
    return cachedUint32ArrayMemory0;
}

let cachedUint8ArrayMemory0 = null;
function getUint8ArrayMemory0() {
    if (cachedUint8ArrayMemory0 === null || cachedUint8ArrayMemory0.byteLength === 0) {
        cachedUint8ArrayMemory0 = new Uint8Array(wasm.memory.buffer);
    }
    return cachedUint8ArrayMemory0;
}

function handleError(f, args) {
    try {
        return f.apply(this, args);
    } catch (e) {
        const idx = addToExternrefTable0(e);
        wasm.__wbindgen_exn_store(idx);
    }
}

function isLikeNone(x) {
    return x === undefined || x === null;
}

function passArray32ToWasm0(arg, malloc) {
    const ptr = malloc(arg.length * 4, 4) >>> 0;
    getUint32ArrayMemory0().set(arg, ptr / 4);
    WASM_VECTOR_LEN = arg.length;
    return ptr;
}

function passArray8ToWasm0(arg, malloc) {
    const ptr = malloc(arg.length * 1, 1) >>> 0;
    getUint8ArrayMemory0().set(arg, ptr / 1);
    WASM_VECTOR_LEN = arg.length;
    return ptr;
}

function passArrayF32ToWasm0(arg, malloc) {
    const ptr = malloc(arg.length * 4, 4) >>> 0;
    getFloat32ArrayMemory0().set(arg, ptr / 4);
    WASM_VECTOR_LEN = arg.length;
    return ptr;
}

function passArrayF64ToWasm0(arg, malloc) {
    const ptr = malloc(arg.length * 8, 8) >>> 0;
    getFloat64ArrayMemory0().set(arg, ptr / 8);
    WASM_VECTOR_LEN = arg.length;
    return ptr;
}

function passArrayJsValueToWasm0(array, malloc) {
    const ptr = malloc(array.length * 4, 4) >>> 0;
    for (let i = 0; i < array.length; i++) {
        const add = addToExternrefTable0(array[i]);
        getDataViewMemory0().setUint32(ptr + 4 * i, add, true);
    }
    WASM_VECTOR_LEN = array.length;
    return ptr;
}

function passStringToWasm0(arg, malloc, realloc) {
    if (realloc === undefined) {
        const buf = cachedTextEncoder.encode(arg);
        const ptr = malloc(buf.length, 1) >>> 0;
        getUint8ArrayMemory0().subarray(ptr, ptr + buf.length).set(buf);
        WASM_VECTOR_LEN = buf.length;
        return ptr;
    }

    let len = arg.length;
    let ptr = malloc(len, 1) >>> 0;

    const mem = getUint8ArrayMemory0();

    let offset = 0;

    for (; offset < len; offset++) {
        const code = arg.charCodeAt(offset);
        if (code > 0x7F) break;
        mem[ptr + offset] = code;
    }
    if (offset !== len) {
        if (offset !== 0) {
            arg = arg.slice(offset);
        }
        ptr = realloc(ptr, len, len = offset + arg.length * 3, 1) >>> 0;
        const view = getUint8ArrayMemory0().subarray(ptr + offset, ptr + len);
        const ret = cachedTextEncoder.encodeInto(arg, view);

        offset += ret.written;
        ptr = realloc(ptr, len, offset, 1) >>> 0;
    }

    WASM_VECTOR_LEN = offset;
    return ptr;
}

function takeFromExternrefTable0(idx) {
    const value = wasm.__wbindgen_externrefs.get(idx);
    wasm.__externref_table_dealloc(idx);
    return value;
}

let cachedTextDecoder = new TextDecoder('utf-8', { ignoreBOM: true, fatal: true });
cachedTextDecoder.decode();
const MAX_SAFARI_DECODE_BYTES = 2146435072;
let numBytesDecoded = 0;
function decodeText(ptr, len) {
    numBytesDecoded += len;
    if (numBytesDecoded >= MAX_SAFARI_DECODE_BYTES) {
        cachedTextDecoder = new TextDecoder('utf-8', { ignoreBOM: true, fatal: true });
        cachedTextDecoder.decode();
        numBytesDecoded = len;
    }
    return cachedTextDecoder.decode(getUint8ArrayMemory0().subarray(ptr, ptr + len));
}

const cachedTextEncoder = new TextEncoder();

if (!('encodeInto' in cachedTextEncoder)) {
    cachedTextEncoder.encodeInto = function (arg, view) {
        const buf = cachedTextEncoder.encode(arg);
        view.set(buf);
        return {
            read: arg.length,
            written: buf.length
        };
    };
}

let WASM_VECTOR_LEN = 0;

let wasmModule, wasmInstance, wasm;
function __wbg_finalize_init(instance, module) {
    wasmInstance = instance;
    wasm = instance.exports;
    wasmModule = module;
    cachedDataViewMemory0 = null;
    cachedFloat32ArrayMemory0 = null;
    cachedFloat64ArrayMemory0 = null;
    cachedUint32ArrayMemory0 = null;
    cachedUint8ArrayMemory0 = null;
    wasm.__wbindgen_start();
    return wasm;
}

async function __wbg_load(module, imports) {
    if (typeof Response === 'function' && module instanceof Response) {
        if (typeof WebAssembly.instantiateStreaming === 'function') {
            try {
                return await WebAssembly.instantiateStreaming(module, imports);
            } catch (e) {
                const validResponse = module.ok && expectedResponseType(module.type);

                if (validResponse && module.headers.get('Content-Type') !== 'application/wasm') {
                    console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve Wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n", e);

                } else { throw e; }
            }
        }

        const bytes = await module.arrayBuffer();
        return await WebAssembly.instantiate(bytes, imports);
    } else {
        const instance = await WebAssembly.instantiate(module, imports);

        if (instance instanceof WebAssembly.Instance) {
            return { instance, module };
        } else {
            return instance;
        }
    }

    function expectedResponseType(type) {
        switch (type) {
            case 'basic': case 'cors': case 'default': return true;
        }
        return false;
    }
}

function initSync(module) {
    if (wasm !== undefined) return wasm;


    if (module !== undefined) {
        if (Object.getPrototypeOf(module) === Object.prototype) {
            ({module} = module)
        } else {
            console.warn('using deprecated parameters for `initSync()`; pass a single object instead')
        }
    }

    const imports = __wbg_get_imports();
    if (!(module instanceof WebAssembly.Module)) {
        module = new WebAssembly.Module(module);
    }
    const instance = new WebAssembly.Instance(module, imports);
    return __wbg_finalize_init(instance, module);
}

async function __wbg_init(module_or_path) {
    if (wasm !== undefined) return wasm;


    if (module_or_path !== undefined) {
        if (Object.getPrototypeOf(module_or_path) === Object.prototype) {
            ({module_or_path} = module_or_path)
        } else {
            console.warn('using deprecated parameters for the initialization function; pass a single object instead')
        }
    }

    if (module_or_path === undefined) {
        module_or_path = new URL('navara_wasm_api_bg.wasm', import.meta.url);
    }
    const imports = __wbg_get_imports();

    if (typeof module_or_path === 'string' || (typeof Request === 'function' && module_or_path instanceof Request) || (typeof URL === 'function' && module_or_path instanceof URL)) {
        module_or_path = fetch(module_or_path);
    }

    const { instance, module } = await __wbg_load(await module_or_path, imports);

    return __wbg_finalize_init(instance, module);
}

export { initSync, __wbg_init as default };
