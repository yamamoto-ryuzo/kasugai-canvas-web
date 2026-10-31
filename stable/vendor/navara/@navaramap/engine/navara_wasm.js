/* @ts-self-types="./navara_wasm.d.ts" */

export class Aabb {
    static __wrap(ptr) {
        const obj = Object.create(Aabb.prototype);
        obj.__wbg_ptr = ptr;
        AabbFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
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
    static __wrap(ptr) {
        const obj = Object.create(BatchPropResult.prototype);
        obj.__wbg_ptr = ptr;
        BatchPropResultFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
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
    static __wrap(ptr) {
        const obj = Object.create(BillboardMaterial.prototype);
        obj.__wbg_ptr = ptr;
        BillboardMaterialFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
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

export class BillboardMesh {
    static __wrap(ptr) {
        const obj = Object.create(BillboardMesh.prototype);
        obj.__wbg_ptr = ptr;
        BillboardMeshFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        BillboardMeshFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_billboardmesh_free(ptr, 0);
    }
    /**
     * @returns {boolean}
     */
    get active() {
        const ret = wasm.__wbg_get_billboardmesh_active(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * @returns {number}
     */
    get batch_length() {
        const ret = wasm.__wbg_get_billboardmesh_batch_length(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @returns {TransferablePointGeometry}
     */
    get geometry() {
        const ret = wasm.__wbg_get_billboardmesh_geometry(this.__wbg_ptr);
        return TransferablePointGeometry.__wrap(ret);
    }
    /**
     * @returns {BillboardMaterial}
     */
    get material() {
        const ret = wasm.__wbg_get_billboardmesh_material(this.__wbg_ptr);
        return BillboardMaterial.__wrap(ret);
    }
    /**
     * @returns {Transform}
     */
    get transform() {
        const ret = wasm.__wbg_get_billboardmesh_transform(this.__wbg_ptr);
        return Transform.__wrap(ret);
    }
    /**
     * @param {boolean} arg0
     */
    set active(arg0) {
        wasm.__wbg_set_billboardmesh_active(this.__wbg_ptr, arg0);
    }
    /**
     * @param {number} arg0
     */
    set batch_length(arg0) {
        wasm.__wbg_set_billboardmesh_batch_length(this.__wbg_ptr, arg0);
    }
    /**
     * @param {TransferablePointGeometry} arg0
     */
    set geometry(arg0) {
        _assertClass(arg0, TransferablePointGeometry);
        var ptr0 = arg0.__destroy_into_raw();
        wasm.__wbg_set_billboardmesh_geometry(this.__wbg_ptr, ptr0);
    }
    /**
     * @param {BillboardMaterial} arg0
     */
    set material(arg0) {
        _assertClass(arg0, BillboardMaterial);
        var ptr0 = arg0.__destroy_into_raw();
        wasm.__wbg_set_billboardmesh_material(this.__wbg_ptr, ptr0);
    }
    /**
     * @param {Transform} arg0
     */
    set transform(arg0) {
        _assertClass(arg0, Transform);
        var ptr0 = arg0.__destroy_into_raw();
        wasm.__wbg_set_billboardmesh_transform(this.__wbg_ptr, ptr0);
    }
}
if (Symbol.dispose) BillboardMesh.prototype[Symbol.dispose] = BillboardMesh.prototype.free;

export class BoundingSphere {
    static __wrap(ptr) {
        const obj = Object.create(BoundingSphere.prototype);
        obj.__wbg_ptr = ptr;
        BoundingSphereFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
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
    static __wrap(ptr) {
        const obj = Object.create(CachedMeshHandle.prototype);
        obj.__wbg_ptr = ptr;
        CachedMeshHandleFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
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
    static __wrap(ptr) {
        const obj = Object.create(CameraFlightEndedEvent.prototype);
        obj.__wbg_ptr = ptr;
        CameraFlightEndedEventFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
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
    static __wrap(ptr) {
        const obj = Object.create(CameraFrustum.prototype);
        obj.__wbg_ptr = ptr;
        CameraFrustumFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
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
    static __wrap(ptr) {
        const obj = Object.create(CameraOrientation.prototype);
        obj.__wbg_ptr = ptr;
        CameraOrientationFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
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
    static __wrap(ptr) {
        const obj = Object.create(CameraStatus.prototype);
        obj.__wbg_ptr = ptr;
        CameraStatusFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
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

export class ConstructPolygonBatchedFeatureParameters {
    static __wrap(ptr) {
        const obj = Object.create(ConstructPolygonBatchedFeatureParameters.prototype);
        obj.__wbg_ptr = ptr;
        ConstructPolygonBatchedFeatureParametersFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        ConstructPolygonBatchedFeatureParametersFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_constructpolygonbatchedfeatureparameters_free(ptr, 0);
    }
    /**
     * @returns {ReconstructableEntity}
     */
    get batched_feature() {
        const ret = wasm.__wbg_get_constructpolygonbatchedfeatureparameters_batched_feature(this.__wbg_ptr);
        return ReconstructableEntity.__wrap(ret);
    }
    /**
     * @returns {boolean}
     */
    get flat() {
        const ret = wasm.__wbg_get_constructpolygonbatchedfeatureparameters_flat(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * @returns {ExtentRadianF32 | undefined}
     */
    get tile_extent() {
        const ret = wasm.__wbg_get_constructpolygonbatchedfeatureparameters_tile_extent(this.__wbg_ptr);
        return ret === 0 ? undefined : ExtentRadianF32.__wrap(ret);
    }
    /**
     * @param {ReconstructableEntity} arg0
     */
    set batched_feature(arg0) {
        _assertClass(arg0, ReconstructableEntity);
        var ptr0 = arg0.__destroy_into_raw();
        wasm.__wbg_set_constructpolygonbatchedfeatureparameters_batched_feature(this.__wbg_ptr, ptr0);
    }
    /**
     * @param {boolean} arg0
     */
    set flat(arg0) {
        wasm.__wbg_set_constructpolygonbatchedfeatureparameters_flat(this.__wbg_ptr, arg0);
    }
    /**
     * @param {ExtentRadianF32 | null} [arg0]
     */
    set tile_extent(arg0) {
        let ptr0 = 0;
        if (!isLikeNone(arg0)) {
            _assertClass(arg0, ExtentRadianF32);
            ptr0 = arg0.__destroy_into_raw();
        }
        wasm.__wbg_set_constructpolygonbatchedfeatureparameters_tile_extent(this.__wbg_ptr, ptr0);
    }
}
if (Symbol.dispose) ConstructPolygonBatchedFeatureParameters.prototype[Symbol.dispose] = ConstructPolygonBatchedFeatureParameters.prototype.free;

export class ConstructPolygonBatchedFeatureResult {
    static __wrap(ptr) {
        const obj = Object.create(ConstructPolygonBatchedFeatureResult.prototype);
        obj.__wbg_ptr = ptr;
        ConstructPolygonBatchedFeatureResultFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        ConstructPolygonBatchedFeatureResultFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_constructpolygonbatchedfeatureresult_free(ptr, 0);
    }
    /**
     * @param {TransferablePolygonGeometry} geometry
     * @param {TransferablePolygonOutlineGeometry | null} [outline_geometry]
     * @param {ExtentRadianF32 | null} [extent]
     * @param {Vec3 | null} [rtc_translation]
     */
    constructor(geometry, outline_geometry, extent, rtc_translation) {
        _assertClass(geometry, TransferablePolygonGeometry);
        var ptr0 = geometry.__destroy_into_raw();
        let ptr1 = 0;
        if (!isLikeNone(outline_geometry)) {
            _assertClass(outline_geometry, TransferablePolygonOutlineGeometry);
            ptr1 = outline_geometry.__destroy_into_raw();
        }
        let ptr2 = 0;
        if (!isLikeNone(extent)) {
            _assertClass(extent, ExtentRadianF32);
            ptr2 = extent.__destroy_into_raw();
        }
        let ptr3 = 0;
        if (!isLikeNone(rtc_translation)) {
            _assertClass(rtc_translation, Vec3);
            ptr3 = rtc_translation.__destroy_into_raw();
        }
        const ret = wasm.constructpolygonbatchedfeatureresult_new(ptr0, ptr1, ptr2, ptr3);
        this.__wbg_ptr = ret;
        ConstructPolygonBatchedFeatureResultFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * @returns {ExtentRadianF32 | undefined}
     */
    get extent() {
        const ret = wasm.__wbg_get_constructpolygonbatchedfeatureresult_extent(this.__wbg_ptr);
        return ret === 0 ? undefined : ExtentRadianF32.__wrap(ret);
    }
    /**
     * @returns {TransferablePolygonGeometry}
     */
    get geometry() {
        const ret = wasm.__wbg_get_constructpolygonbatchedfeatureresult_geometry(this.__wbg_ptr);
        return TransferablePolygonGeometry.__wrap(ret);
    }
    /**
     * @returns {TransferablePolygonOutlineGeometry | undefined}
     */
    get outline_geometry() {
        const ret = wasm.__wbg_get_constructpolygonbatchedfeatureresult_outline_geometry(this.__wbg_ptr);
        return ret === 0 ? undefined : TransferablePolygonOutlineGeometry.__wrap(ret);
    }
    /**
     * RTC (Relative-To-Center) translation vector
     * @returns {Vec3 | undefined}
     */
    get rtc_translation() {
        const ret = wasm.__wbg_get_constructpolygonbatchedfeatureresult_rtc_translation(this.__wbg_ptr);
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
        wasm.__wbg_set_constructpolygonbatchedfeatureresult_extent(this.__wbg_ptr, ptr0);
    }
    /**
     * @param {TransferablePolygonGeometry} arg0
     */
    set geometry(arg0) {
        _assertClass(arg0, TransferablePolygonGeometry);
        var ptr0 = arg0.__destroy_into_raw();
        wasm.__wbg_set_constructpolygonbatchedfeatureresult_geometry(this.__wbg_ptr, ptr0);
    }
    /**
     * @param {TransferablePolygonOutlineGeometry | null} [arg0]
     */
    set outline_geometry(arg0) {
        let ptr0 = 0;
        if (!isLikeNone(arg0)) {
            _assertClass(arg0, TransferablePolygonOutlineGeometry);
            ptr0 = arg0.__destroy_into_raw();
        }
        wasm.__wbg_set_constructpolygonbatchedfeatureresult_outline_geometry(this.__wbg_ptr, ptr0);
    }
    /**
     * RTC (Relative-To-Center) translation vector
     * @param {Vec3 | null} [arg0]
     */
    set rtc_translation(arg0) {
        let ptr0 = 0;
        if (!isLikeNone(arg0)) {
            _assertClass(arg0, Vec3);
            ptr0 = arg0.__destroy_into_raw();
        }
        wasm.__wbg_set_constructpolygonbatchedfeatureresult_rtc_translation(this.__wbg_ptr, ptr0);
    }
}
if (Symbol.dispose) ConstructPolygonBatchedFeatureResult.prototype[Symbol.dispose] = ConstructPolygonBatchedFeatureResult.prototype.free;

export class ConstructPolylineBatchedFeatureParameters {
    static __wrap(ptr) {
        const obj = Object.create(ConstructPolylineBatchedFeatureParameters.prototype);
        obj.__wbg_ptr = ptr;
        ConstructPolylineBatchedFeatureParametersFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        ConstructPolylineBatchedFeatureParametersFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_constructpolylinebatchedfeatureparameters_free(ptr, 0);
    }
    /**
     * @returns {ExtentRadianF32 | undefined}
     */
    get tile_extent() {
        const ret = wasm.constructpolylinebatchedfeatureparameters_tile_extent(this.__wbg_ptr);
        return ret === 0 ? undefined : ExtentRadianF32.__wrap(ret);
    }
    /**
     * @returns {ReconstructableEntity}
     */
    get batched_feature() {
        const ret = wasm.__wbg_get_constructpolylinebatchedfeatureparameters_batched_feature(this.__wbg_ptr);
        return ReconstructableEntity.__wrap(ret);
    }
    /**
     * @returns {boolean}
     */
    get flat() {
        const ret = wasm.__wbg_get_constructpolylinebatchedfeatureparameters_flat(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * @param {ReconstructableEntity} arg0
     */
    set batched_feature(arg0) {
        _assertClass(arg0, ReconstructableEntity);
        var ptr0 = arg0.__destroy_into_raw();
        wasm.__wbg_set_constructpolylinebatchedfeatureparameters_batched_feature(this.__wbg_ptr, ptr0);
    }
    /**
     * @param {boolean} arg0
     */
    set flat(arg0) {
        wasm.__wbg_set_constructpolylinebatchedfeatureparameters_flat(this.__wbg_ptr, arg0);
    }
}
if (Symbol.dispose) ConstructPolylineBatchedFeatureParameters.prototype[Symbol.dispose] = ConstructPolylineBatchedFeatureParameters.prototype.free;

export class ConstructPolylineBatchedFeatureResult {
    static __wrap(ptr) {
        const obj = Object.create(ConstructPolylineBatchedFeatureResult.prototype);
        obj.__wbg_ptr = ptr;
        ConstructPolylineBatchedFeatureResultFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        ConstructPolylineBatchedFeatureResultFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_constructpolylinebatchedfeatureresult_free(ptr, 0);
    }
    /**
     * @returns {ExtentRadianF32 | undefined}
     */
    get extent() {
        const ret = wasm.constructpolylinebatchedfeatureresult_extent(this.__wbg_ptr);
        return ret === 0 ? undefined : ExtentRadianF32.__wrap(ret);
    }
    /**
     * @param {TransferablePolylineGeometry} geometry
     * @param {ExtentRadianF32 | null} [extent]
     */
    constructor(geometry, extent) {
        _assertClass(geometry, TransferablePolylineGeometry);
        var ptr0 = geometry.__destroy_into_raw();
        let ptr1 = 0;
        if (!isLikeNone(extent)) {
            _assertClass(extent, ExtentRadianF32);
            ptr1 = extent.__destroy_into_raw();
        }
        const ret = wasm.constructpolylinebatchedfeatureresult_new(ptr0, ptr1);
        this.__wbg_ptr = ret;
        ConstructPolylineBatchedFeatureResultFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * @returns {TransferablePolylineGeometry}
     */
    get geometry() {
        const ret = wasm.__wbg_get_constructpolylinebatchedfeatureresult_geometry(this.__wbg_ptr);
        return TransferablePolylineGeometry.__wrap(ret);
    }
    /**
     * @param {TransferablePolylineGeometry} arg0
     */
    set geometry(arg0) {
        _assertClass(arg0, TransferablePolylineGeometry);
        var ptr0 = arg0.__destroy_into_raw();
        wasm.__wbg_set_constructpolylinebatchedfeatureresult_geometry(this.__wbg_ptr, ptr0);
    }
}
if (Symbol.dispose) ConstructPolylineBatchedFeatureResult.prototype[Symbol.dispose] = ConstructPolylineBatchedFeatureResult.prototype.free;

export class ConstructTerrainMeshParameters {
    static __wrap(ptr) {
        const obj = Object.create(ConstructTerrainMeshParameters.prototype);
        obj.__wbg_ptr = ptr;
        ConstructTerrainMeshParametersFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        ConstructTerrainMeshParametersFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_constructterrainmeshparameters_free(ptr, 0);
    }
    /**
     * @returns {number}
     */
    get bytes_handle() {
        const ret = wasm.__wbg_get_constructterrainmeshparameters_bytes_handle(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {boolean}
     */
    get geographic() {
        const ret = wasm.__wbg_get_constructterrainmeshparameters_geographic(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * @returns {boolean}
     */
    get isQuantizedMesh() {
        const ret = wasm.__wbg_get_constructterrainmeshparameters_isQuantizedMesh(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * @returns {boolean}
     */
    get poleNorth() {
        const ret = wasm.__wbg_get_constructterrainmeshparameters_poleNorth(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * @returns {boolean}
     */
    get poleSouth() {
        const ret = wasm.__wbg_get_constructterrainmeshparameters_poleSouth(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * Multiplier for the automatically calculated skirt height.
     * @returns {number}
     */
    get skirtExaggeration() {
        const ret = wasm.__wbg_get_constructterrainmeshparameters_skirtExaggeration(this.__wbg_ptr);
        return ret;
    }
    /**
     * Whether to render skirts along tile boundaries.
     * @returns {boolean}
     */
    get skirt() {
        const ret = wasm.__wbg_get_constructterrainmeshparameters_skirt(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * @returns {bigint}
     */
    get tile_handle() {
        const ret = wasm.__wbg_get_constructterrainmeshparameters_tile_handle(this.__wbg_ptr);
        return BigInt.asUintN(64, ret);
    }
    /**
     * @returns {number}
     */
    get tile_size() {
        const ret = wasm.__wbg_get_constructterrainmeshparameters_tile_size(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @returns {boolean}
     */
    get tms() {
        const ret = wasm.__wbg_get_constructterrainmeshparameters_tms(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * @param {number} arg0
     */
    set bytes_handle(arg0) {
        wasm.__wbg_set_constructterrainmeshparameters_bytes_handle(this.__wbg_ptr, arg0);
    }
    /**
     * @param {boolean} arg0
     */
    set geographic(arg0) {
        wasm.__wbg_set_constructterrainmeshparameters_geographic(this.__wbg_ptr, arg0);
    }
    /**
     * @param {boolean} arg0
     */
    set isQuantizedMesh(arg0) {
        wasm.__wbg_set_constructterrainmeshparameters_isQuantizedMesh(this.__wbg_ptr, arg0);
    }
    /**
     * @param {boolean} arg0
     */
    set poleNorth(arg0) {
        wasm.__wbg_set_constructterrainmeshparameters_poleNorth(this.__wbg_ptr, arg0);
    }
    /**
     * @param {boolean} arg0
     */
    set poleSouth(arg0) {
        wasm.__wbg_set_constructterrainmeshparameters_poleSouth(this.__wbg_ptr, arg0);
    }
    /**
     * Multiplier for the automatically calculated skirt height.
     * @param {number} arg0
     */
    set skirtExaggeration(arg0) {
        wasm.__wbg_set_constructterrainmeshparameters_skirtExaggeration(this.__wbg_ptr, arg0);
    }
    /**
     * Whether to render skirts along tile boundaries.
     * @param {boolean} arg0
     */
    set skirt(arg0) {
        wasm.__wbg_set_constructterrainmeshparameters_skirt(this.__wbg_ptr, arg0);
    }
    /**
     * @param {bigint} arg0
     */
    set tile_handle(arg0) {
        wasm.__wbg_set_constructterrainmeshparameters_tile_handle(this.__wbg_ptr, arg0);
    }
    /**
     * @param {number} arg0
     */
    set tile_size(arg0) {
        wasm.__wbg_set_constructterrainmeshparameters_tile_size(this.__wbg_ptr, arg0);
    }
    /**
     * @param {boolean} arg0
     */
    set tms(arg0) {
        wasm.__wbg_set_constructterrainmeshparameters_tms(this.__wbg_ptr, arg0);
    }
}
if (Symbol.dispose) ConstructTerrainMeshParameters.prototype[Symbol.dispose] = ConstructTerrainMeshParameters.prototype.free;

export class ConstructTerrainMeshResult {
    static __wrap(ptr) {
        const obj = Object.create(ConstructTerrainMeshResult.prototype);
        obj.__wbg_ptr = ptr;
        ConstructTerrainMeshResultFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        ConstructTerrainMeshResultFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_constructterrainmeshresult_free(ptr, 0);
    }
    /**
     * @param {TransferableGeometry} geometry
     * @param {number} heights
     * @param {number} min_height
     * @param {number} max_height
     * @param {Vec3 | null} [rtc_translation]
     */
    constructor(geometry, heights, min_height, max_height, rtc_translation) {
        _assertClass(geometry, TransferableGeometry);
        var ptr0 = geometry.__destroy_into_raw();
        let ptr1 = 0;
        if (!isLikeNone(rtc_translation)) {
            _assertClass(rtc_translation, Vec3);
            ptr1 = rtc_translation.__destroy_into_raw();
        }
        const ret = wasm.constructterrainmeshresult_new(ptr0, heights, min_height, max_height, ptr1);
        this.__wbg_ptr = ret;
        ConstructTerrainMeshResultFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * @returns {TransferableGeometry}
     */
    get geometry() {
        const ret = wasm.__wbg_get_constructterrainmeshresult_geometry(this.__wbg_ptr);
        return TransferableGeometry.__wrap(ret);
    }
    /**
     * @returns {number}
     */
    get heights() {
        const ret = wasm.__wbg_get_constructterrainmeshresult_heights(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number}
     */
    get max_height() {
        const ret = wasm.__wbg_get_constructterrainmeshresult_max_height(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number}
     */
    get min_height() {
        const ret = wasm.__wbg_get_constructterrainmeshresult_min_height(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {Vec3 | undefined}
     */
    get rtc_translation() {
        const ret = wasm.__wbg_get_constructterrainmeshresult_rtc_translation(this.__wbg_ptr);
        return ret === 0 ? undefined : Vec3.__wrap(ret);
    }
    /**
     * @returns {number | undefined}
     */
    get watermask() {
        const ret = wasm.__wbg_get_constructterrainmeshresult_watermask(this.__wbg_ptr);
        return ret === Number.MAX_SAFE_INTEGER ? undefined : ret;
    }
    /**
     * @param {TransferableGeometry} arg0
     */
    set geometry(arg0) {
        _assertClass(arg0, TransferableGeometry);
        var ptr0 = arg0.__destroy_into_raw();
        wasm.__wbg_set_constructterrainmeshresult_geometry(this.__wbg_ptr, ptr0);
    }
    /**
     * @param {number} arg0
     */
    set heights(arg0) {
        wasm.__wbg_set_constructterrainmeshresult_heights(this.__wbg_ptr, arg0);
    }
    /**
     * @param {number} arg0
     */
    set max_height(arg0) {
        wasm.__wbg_set_constructterrainmeshresult_max_height(this.__wbg_ptr, arg0);
    }
    /**
     * @param {number} arg0
     */
    set min_height(arg0) {
        wasm.__wbg_set_constructterrainmeshresult_min_height(this.__wbg_ptr, arg0);
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
        wasm.__wbg_set_constructterrainmeshresult_rtc_translation(this.__wbg_ptr, ptr0);
    }
    /**
     * @param {number | null} [arg0]
     */
    set watermask(arg0) {
        wasm.__wbg_set_constructterrainmeshresult_watermask(this.__wbg_ptr, isLikeNone(arg0) ? Number.MAX_SAFE_INTEGER : (arg0) >> 0);
    }
}
if (Symbol.dispose) ConstructTerrainMeshResult.prototype[Symbol.dispose] = ConstructTerrainMeshResult.prototype.free;

export class ConstructedPolygonGeometry {
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

export class Core {
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        CoreFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_core_free(ptr, 0);
    }
    /**
     * @param {any} layer
     * @returns {string}
     */
    addLayer(layer) {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.core_addLayer(this.__wbg_ptr, layer);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * @param {any} source
     * @returns {string}
     */
    addSource(source) {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.core_addSource(this.__wbg_ptr, source);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
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
     * @param {bigint} tile_handle
     * @param {number} texture_zoom
     * @param {number} texture_width
     * @returns {number}
     */
    calcMetersPerTexel(tile_handle, texture_zoom, texture_width) {
        const ret = wasm.core_calcMetersPerTexel(this.__wbg_ptr, tile_handle, texture_zoom, texture_width);
        return ret;
    }
    /**
     * @param {boolean} enabled
     * @param {Float64Array | null} [target]
     * @param {Float64Array | null} [offset]
     */
    cameraFollow(enabled, target, offset) {
        var ptr0 = isLikeNone(target) ? 0 : passArrayF64ToWasm0(target, wasm.__wbindgen_malloc);
        var len0 = WASM_VECTOR_LEN;
        var ptr1 = isLikeNone(offset) ? 0 : passArrayF64ToWasm0(offset, wasm.__wbindgen_malloc);
        var len1 = WASM_VECTOR_LEN;
        wasm.core_cameraFollow(this.__wbg_ptr, enabled, ptr0, len0, ptr1, len1);
    }
    /**
     * @param {boolean} enabled
     * @param {Float64Array | null} [target]
     */
    cameraFreeLook(enabled, target) {
        var ptr0 = isLikeNone(target) ? 0 : passArrayF64ToWasm0(target, wasm.__wbindgen_malloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.core_cameraFreeLook(this.__wbg_ptr, enabled, ptr0, len0);
    }
    /**
     * @param {Float64Array | null} [position]
     * @param {number | null} [pitch]
     * @param {number | null} [heading]
     * @param {number | null} [roll]
     * @param {number | null} [distance]
     */
    changeCamera(position, pitch, heading, roll, distance) {
        var ptr0 = isLikeNone(position) ? 0 : passArrayF64ToWasm0(position, wasm.__wbindgen_malloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.core_changeCamera(this.__wbg_ptr, ptr0, len0, !isLikeNone(pitch), isLikeNone(pitch) ? 0 : pitch, !isLikeNone(heading), isLikeNone(heading) ? 0 : heading, !isLikeNone(roll), isLikeNone(roll) ? 0 : roll, !isLikeNone(distance), isLikeNone(distance) ? 0 : distance);
    }
    /**
     * @param {string} layer_id
     */
    deleteLayer(layer_id) {
        const ptr0 = passStringToWasm0(layer_id, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.core_deleteLayer(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * Delete a source, returning `false` while any layer still references it (or
     * the id is unknown) and `true` once it has been removed.
     * @param {string} source_id
     * @returns {boolean}
     */
    deleteSource(source_id) {
        const ptr0 = passStringToWasm0(source_id, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.core_deleteSource(this.__wbg_ptr, ptr0, len0);
        return ret !== 0;
    }
    /**
     * Handles of `External` entries removed since the last drain; JS evicts
     * each from its `InMemoryBufferStore` map every frame.
     * @returns {Int32Array}
     */
    drainRemovedExternalHandles() {
        const ret = wasm.core_drainRemovedExternalHandles(this.__wbg_ptr);
        var v1 = getArrayI32FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v1;
    }
    /**
     * Starts a camera flight and returns its id. A `CameraFlightEndedEvent`
     * carrying the same id is delivered through the event stream when the
     * flight completes (`completed: true`) or is superseded/canceled
     * (`completed: false`).
     * @param {Float64Array | null} [position]
     * @param {number | null} [pitch]
     * @param {number | null} [heading]
     * @param {number | null} [roll]
     * @param {number | null} [duration]
     * @param {number | null} [max_height]
     * @param {number | null} [distance]
     * @param {number | null} [easing]
     * @returns {number}
     */
    flyTo(position, pitch, heading, roll, duration, max_height, distance, easing) {
        var ptr0 = isLikeNone(position) ? 0 : passArrayF64ToWasm0(position, wasm.__wbindgen_malloc);
        var len0 = WASM_VECTOR_LEN;
        const ret = wasm.core_flyTo(this.__wbg_ptr, ptr0, len0, !isLikeNone(pitch), isLikeNone(pitch) ? 0 : pitch, !isLikeNone(heading), isLikeNone(heading) ? 0 : heading, !isLikeNone(roll), isLikeNone(roll) ? 0 : roll, !isLikeNone(duration), isLikeNone(duration) ? 0 : duration, !isLikeNone(max_height), isLikeNone(max_height) ? 0 : max_height, !isLikeNone(distance), isLikeNone(distance) ? 0 : distance, isLikeNone(easing) ? 0xFFFFFF : easing);
        return ret >>> 0;
    }
    /**
     * @returns {number | undefined}
     */
    genGlobalBatchId() {
        const ret = wasm.core_genGlobalBatchId(this.__wbg_ptr);
        return ret === Number.MAX_SAFE_INTEGER ? undefined : ret;
    }
    /**
     * @param {number} handle
     * @returns {Float32Array | undefined}
     */
    getBufferF32(handle) {
        const ret = wasm.core_getBufferF32(this.__wbg_ptr, handle);
        return ret;
    }
    /**
     * @param {number} handle
     * @returns {Float64Array | undefined}
     */
    getBufferF64(handle) {
        const ret = wasm.core_getBufferF64(this.__wbg_ptr, handle);
        return ret;
    }
    /**
     * @param {number} handle
     * @returns {Uint32Array | undefined}
     */
    getBufferU32(handle) {
        const ret = wasm.core_getBufferU32(this.__wbg_ptr, handle);
        return ret;
    }
    /**
     * @param {number} handle
     * @returns {Uint8Array | undefined}
     */
    getBufferU8(handle) {
        const ret = wasm.core_getBufferU8(this.__wbg_ptr, handle);
        return ret;
    }
    /**
     * Vertical field of view in radians as set via `setFrustum`.
     * @returns {number | undefined}
     */
    getCameraFOV() {
        const ret = wasm.core_getCameraFOV(this.__wbg_ptr);
        return ret[0] === 0 ? undefined : ret[1];
    }
    /**
     * @returns {CameraOrientation | undefined}
     */
    getCameraOrientation() {
        const ret = wasm.core_getCameraOrientation(this.__wbg_ptr);
        return ret === 0 ? undefined : CameraOrientation.__wrap(ret);
    }
    /**
     * @returns {Float64Array | undefined}
     */
    getCameraPositionECEF() {
        const ret = wasm.core_getCameraPositionECEF(this.__wbg_ptr);
        let v1;
        if (ret[0] !== 0) {
            v1 = getArrayF64FromWasm0(ret[0], ret[1]).slice();
            wasm.__wbindgen_free(ret[0], ret[1] * 8, 8);
        }
        return v1;
    }
    /**
     * @returns {Float64Array | undefined}
     */
    getCameraPositionLLE() {
        const ret = wasm.core_getCameraPositionLLE(this.__wbg_ptr);
        let v1;
        if (ret[0] !== 0) {
            v1 = getArrayF64FromWasm0(ret[0], ret[1]).slice();
            wasm.__wbindgen_free(ret[0], ret[1] * 8, 8);
        }
        return v1;
    }
    /**
     * @returns {CameraStatus | undefined}
     */
    getCameraStatus() {
        const ret = wasm.core_getCameraStatus(this.__wbg_ptr);
        return ret === 0 ? undefined : CameraStatus.__wrap(ret);
    }
    /**
     * @returns {Globe | undefined}
     */
    getGlobe() {
        const ret = wasm.core_getGlobe(this.__wbg_ptr);
        return ret === 0 ? undefined : Globe.__wrap(ret);
    }
    /**
     * @returns {number | undefined}
     */
    getGlobeColor() {
        const ret = wasm.core_getGlobeColor(this.__wbg_ptr);
        return ret === Number.MAX_SAFE_INTEGER ? undefined : ret;
    }
    /**
     * @returns {Float32Array | undefined}
     */
    getGlobeElevationColormap() {
        const ret = wasm.core_getGlobeElevationColormap(this.__wbg_ptr);
        let v1;
        if (ret[0] !== 0) {
            v1 = getArrayF32FromWasm0(ret[0], ret[1]).slice();
            wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        }
        return v1;
    }
    /**
     * @returns {boolean | undefined}
     */
    getGlobeHideUnderground() {
        const ret = wasm.core_getGlobeHideUnderground(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret !== 0;
    }
    /**
     * @returns {number | undefined}
     */
    getGlobeMaxSse() {
        const ret = wasm.core_getGlobeMaxSse(this.__wbg_ptr);
        return ret === Number.MAX_SAFE_INTEGER ? undefined : ret;
    }
    /**
     * @returns {number | undefined}
     */
    getGlobeOpacity() {
        const ret = wasm.core_getGlobeOpacity(this.__wbg_ptr);
        return ret === Number.MAX_SAFE_INTEGER ? undefined : ret;
    }
    /**
     * @returns {number | undefined}
     */
    getGlobeSegments() {
        const ret = wasm.core_getGlobeSegments(this.__wbg_ptr);
        return ret === Number.MAX_SAFE_INTEGER ? undefined : ret;
    }
    /**
     * @returns {boolean | undefined}
     */
    getGlobeTransparent() {
        const ret = wasm.core_getGlobeTransparent(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret !== 0;
    }
    /**
     * @returns {boolean | undefined}
     */
    getGlobeUseNormal() {
        const ret = wasm.core_getGlobeUseNormal(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret !== 0;
    }
    /**
     * @returns {boolean | undefined}
     */
    getGlobeWireframe() {
        const ret = wasm.core_getGlobeWireframe(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret !== 0;
    }
    /**
     * @param {string} layer_id
     * @returns {number | undefined}
     */
    getLayerIndex(layer_id) {
        const ptr0 = passStringToWasm0(layer_id, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.core_getLayerIndex(this.__wbg_ptr, ptr0, len0);
        return ret === Number.MAX_SAFE_INTEGER ? undefined : ret;
    }
    /**
     * @param {ReconstructableEntity} martini_id
     * @returns {TransferableMartini | undefined}
     */
    getMartini(martini_id) {
        _assertClass(martini_id, ReconstructableEntity);
        var ptr0 = martini_id.__destroy_into_raw();
        const ret = wasm.core_getMartini(this.__wbg_ptr, ptr0);
        return ret === 0 ? undefined : TransferableMartini.__wrap(ret);
    }
    /**
     * @returns {MemoryStats | undefined}
     */
    getMemoryStats() {
        const ret = wasm.core_getMemoryStats(this.__wbg_ptr);
        return ret === 0 ? undefined : MemoryStats.__wrap(ret);
    }
    /**
     * The WebMercator raster tiles to bake into per-layer drape render targets for a
     * terrain tile (baked layers only; empty on WebMercator terrain, which drapes 1:1
     * through the per-slot material path).
     * @param {bigint} handle
     * @returns {RasterTileState[]}
     */
    getRasterTileStates(handle) {
        const ret = wasm.core_getRasterTileStates(this.__wbg_ptr, handle);
        var v1 = getArrayJsValueFromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v1;
    }
    /**
     * Read back a stored source as the plain description object `addSource`
     * accepts — including engine defaults and partial-update merges (inline
     * GeoJSON `data` is not read back). `undefined` for unknown ids. Used by
     * `view.sampleTerrainMostDetailed` to sample against the exact config
     * the view renders with.
     * @param {string} source_id
     * @returns {any}
     */
    getSourceDescription(source_id) {
        const ptr0 = passStringToWasm0(source_id, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.core_getSourceDescription(this.__wbg_ptr, ptr0, len0);
        return ret;
    }
    /**
     * Buffer handle of a tile's loaded raw DEM bytes (the data a raster-DEM
     * upsample of a descendant resamples from), `undefined` until it landed.
     * @param {bigint} handle
     * @returns {number | undefined}
     */
    getTerrainDemBytes(handle) {
        const ret = wasm.core_getTerrainDemBytes(this.__wbg_ptr, handle);
        return ret === Number.MAX_SAFE_INTEGER ? undefined : ret;
    }
    /**
     * @param {bigint} handle
     * @returns {TransferableTile | undefined}
     */
    getTile(handle) {
        const ret = wasm.core_getTile(this.__wbg_ptr, handle);
        return ret === 0 ? undefined : TransferableTile.__wrap(ret);
    }
    /**
     * @param {bigint} handle
     * @returns {ElevationDecoder | undefined}
     */
    getTileElevationDecoder(handle) {
        const ret = wasm.core_getTileElevationDecoder(this.__wbg_ptr, handle);
        return ret === 0 ? undefined : ElevationDecoder.__wrap(ret);
    }
    /**
     * @param {bigint} batched_feature_id
     * @returns {ReturnedTransferablePolygonBatchedFeature | undefined}
     */
    getTransferablePolygonBatchedFeature(batched_feature_id) {
        const ret = wasm.core_getTransferablePolygonBatchedFeature(this.__wbg_ptr, batched_feature_id);
        return ret === 0 ? undefined : ReturnedTransferablePolygonBatchedFeature.__wrap(ret);
    }
    /**
     * @param {bigint} batched_feature_id
     * @returns {ReturnedTransferablePolylineBatchedFeature | undefined}
     */
    getTransferablePolylineBatchedFeature(batched_feature_id) {
        const ret = wasm.core_getTransferablePolylineBatchedFeature(this.__wbg_ptr, batched_feature_id);
        return ret === 0 ? undefined : ReturnedTransferablePolylineBatchedFeature.__wrap(ret);
    }
    /**
     * @param {bigint} handle
     * @returns {VectorTileState[]}
     */
    getVectorTileStates(handle) {
        const ret = wasm.core_getVectorTileStates(this.__wbg_ptr, handle);
        var v1 = getArrayJsValueFromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v1;
    }
    /**
     * @returns {number | undefined}
     */
    getZoomLevel() {
        const ret = wasm.core_getZoomLevel(this.__wbg_ptr);
        return ret[0] === 0 ? undefined : ret[1];
    }
    /**
     * @param {bigint} id
     * @returns {boolean}
     */
    hasDataRequester(id) {
        const ret = wasm.core_hasDataRequester(this.__wbg_ptr, id);
        return ret !== 0;
    }
    /**
     * @param {bigint} id
     * @returns {boolean}
     */
    hasWorkerTask(id) {
        const ret = wasm.core_hasWorkerTask(this.__wbg_ptr, id);
        return ret !== 0;
    }
    /**
     * @param {any} input
     */
    input(input) {
        wasm.core_input(this.__wbg_ptr, input);
    }
    /**
     * @param {Float64Array} target
     * @param {Float64Array} offset
     */
    lookAt(target, offset) {
        const ptr0 = passArrayF64ToWasm0(target, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passArrayF64ToWasm0(offset, wasm.__wbindgen_malloc);
        const len1 = WASM_VECTOR_LEN;
        wasm.core_lookAt(this.__wbg_ptr, ptr0, len0, ptr1, len1);
    }
    /**
     * @param {string} feature_type
     * @param {bigint} bits
     */
    markFeatureIsRendered(feature_type, bits) {
        const ptr0 = passStringToWasm0(feature_type, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.core_markFeatureIsRendered(this.__wbg_ptr, ptr0, len0, bits);
    }
    /**
     * @param {CameraDirection} direction
     * @param {number} amount
     */
    moveCamera(direction, amount) {
        wasm.core_moveCamera(this.__wbg_ptr, direction, amount);
    }
    /**
     * @param {Float64Array} direction
     * @param {number} amount
     */
    moveCameraWithDirection(direction, amount) {
        const ptr0 = passArrayF64ToWasm0(direction, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.core_moveCameraWithDirection(this.__wbg_ptr, ptr0, len0, amount);
    }
    /**
     * @param {string} id
     */
    constructor(id) {
        const ptr0 = passStringToWasm0(id, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.core_new(ptr0, len0);
        this.__wbg_ptr = ret;
        CoreFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * @param {number} byte_length
     * @param {Function} f
     * @returns {number | undefined}
     */
    newBufferF32(byte_length, f) {
        const ret = wasm.core_newBufferF32(this.__wbg_ptr, byte_length, f);
        return ret === Number.MAX_SAFE_INTEGER ? undefined : ret;
    }
    /**
     * @param {Float32Array} data
     * @returns {number | undefined}
     */
    newBufferF32Cloned(data) {
        const ptr0 = passArrayF32ToWasm0(data, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.core_newBufferF32Cloned(this.__wbg_ptr, ptr0, len0);
        return ret === Number.MAX_SAFE_INTEGER ? undefined : ret;
    }
    /**
     * @param {number} byte_length
     * @param {Function} f
     * @returns {number | undefined}
     */
    newBufferF64(byte_length, f) {
        const ret = wasm.core_newBufferF64(this.__wbg_ptr, byte_length, f);
        return ret === Number.MAX_SAFE_INTEGER ? undefined : ret;
    }
    /**
     * @param {number} byte_length
     * @param {Function} f
     * @returns {number | undefined}
     */
    newBufferU32(byte_length, f) {
        const ret = wasm.core_newBufferU32(this.__wbg_ptr, byte_length, f);
        return ret === Number.MAX_SAFE_INTEGER ? undefined : ret;
    }
    /**
     * @param {Uint32Array} data
     * @returns {number | undefined}
     */
    newBufferU32Cloned(data) {
        const ptr0 = passArray32ToWasm0(data, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.core_newBufferU32Cloned(this.__wbg_ptr, ptr0, len0);
        return ret === Number.MAX_SAFE_INTEGER ? undefined : ret;
    }
    /**
     * @param {number} byte_length
     * @param {Function} f
     * @returns {number | undefined}
     */
    newBufferU8(byte_length, f) {
        const ret = wasm.core_newBufferU8(this.__wbg_ptr, byte_length, f);
        return ret === Number.MAX_SAFE_INTEGER ? undefined : ret;
    }
    /**
     * @param {Uint8Array} data
     * @returns {number | undefined}
     */
    newBufferU8Cloned(data) {
        const ptr0 = passArray8ToWasm0(data, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.core_newBufferU8Cloned(this.__wbg_ptr, ptr0, len0);
        return ret === Number.MAX_SAFE_INTEGER ? undefined : ret;
    }
    /**
     * @param {number} byte_length
     * @returns {number | undefined}
     */
    newExternalBuffer(byte_length) {
        const ret = wasm.core_newExternalBuffer(this.__wbg_ptr, byte_length);
        return ret === Number.MAX_SAFE_INTEGER ? undefined : ret;
    }
    /**
     * Monotonic revision that changes only when the raster drape resolution could have
     * changed. The web renderer reads it once per frame and skips the per-terrain-tile
     * `getRasterTileStates` calls while it is unchanged.
     * @returns {number}
     */
    rasterRevision() {
        const ret = wasm.core_rasterRevision(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @param {bigint} renderable_feature_bits
     * @param {Function} callback
     */
    readAllBatchedProperties(renderable_feature_bits, callback) {
        const ret = wasm.core_readAllBatchedProperties(this.__wbg_ptr, renderable_feature_bits, callback);
        if (ret[1]) {
            throw takeFromExternrefTable0(ret[0]);
        }
    }
    /**
     * @returns {Events | undefined}
     */
    readEvents() {
        const ret = wasm.core_readEvents(this.__wbg_ptr);
        return ret === 0 ? undefined : Events.__wrap(ret);
    }
    /**
     * @param {bigint} renderable_feature_bits
     * @param {any[]} keys
     * @param {Function} callback
     */
    readFilteredBatchedProperties(renderable_feature_bits, keys, callback) {
        const ptr0 = passArrayJsValueToWasm0(keys, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.core_readFilteredBatchedProperties(this.__wbg_ptr, renderable_feature_bits, ptr0, len0, callback);
        if (ret[1]) {
            throw takeFromExternrefTable0(ret[0]);
        }
    }
    /**
     * @param {number} batch_id
     * @returns {BatchPropResult}
     */
    readPropertyByGlobalBatchId(batch_id) {
        const ret = wasm.core_readPropertyByGlobalBatchId(this.__wbg_ptr, batch_id);
        return BatchPropResult.__wrap(ret);
    }
    /**
     * @param {LLE} lle
     * @returns {bigint}
     */
    registerSampleTerrainHeightEvent(lle) {
        _assertClass(lle, LLE);
        var ptr0 = lle.__destroy_into_raw();
        const ret = wasm.core_registerSampleTerrainHeightEvent(this.__wbg_ptr, ptr0);
        return BigInt.asUintN(64, ret);
    }
    /**
     * @param {ExtentRadianF32} extent
     * @returns {bigint}
     */
    registerTerrainHeightRangeEvent(extent) {
        _assertClass(extent, ExtentRadianF32);
        var ptr0 = extent.__destroy_into_raw();
        const ret = wasm.core_registerTerrainHeightRangeEvent(this.__wbg_ptr, ptr0);
        return BigInt.asUintN(64, ret);
    }
    /**
     * @param {number} handle
     */
    removeBuffer(handle) {
        wasm.core_removeBuffer(this.__wbg_ptr, handle);
    }
    /**
     * @param {number} handle
     * @returns {Float32Array | undefined}
     */
    removeBufferF32(handle) {
        const ret = wasm.core_removeBufferF32(this.__wbg_ptr, handle);
        return ret;
    }
    /**
     * @param {number} handle
     * @returns {Float64Array | undefined}
     */
    removeBufferF64(handle) {
        const ret = wasm.core_removeBufferF64(this.__wbg_ptr, handle);
        return ret;
    }
    /**
     * @param {number} handle
     * @returns {Uint32Array | undefined}
     */
    removeBufferU32(handle) {
        const ret = wasm.core_removeBufferU32(this.__wbg_ptr, handle);
        return ret;
    }
    /**
     * @param {number} handle
     * @returns {Uint8Array | undefined}
     */
    removeBufferU8(handle) {
        const ret = wasm.core_removeBufferU8(this.__wbg_ptr, handle);
        return ret;
    }
    /**
     * Reports the actual GPU byte size a rendered feature was measured at on
     * the JS side so the memory ledger corrects its payload-based estimate.
     * Feature kinds without a wired-up owner lookup are a no-op. Currently
     * wired: 3D Tiles models (replaces the tile's estimate — glTF/Draco
     * decode otherwise undercounts) and billboards (folds the JS texture
     * atlas footprint into the owning vector tile; `0` clears it on dispose).
     * @param {bigint} feature_bits
     * @param {number} gpu_bytes
     */
    reportFeatureGpuBytes(feature_bits, gpu_bytes) {
        wasm.core_reportFeatureGpuBytes(this.__wbg_ptr, feature_bits, gpu_bytes);
    }
    /**
     * Reports the drape render-target GPU footprint of a terrain tile (the
     * clamp-to-ground vector layers baked onto it), measured on the JS side
     * where the render targets are lazily allocated. Scales with terrain
     * subdivision past the vector `maxZoom`, which per-vector-tile accounting
     * cannot see.
     * @param {bigint} handle
     * @param {number} gpu_bytes
     */
    reportTerrainDrapeGpuBytes(handle, gpu_bytes) {
        wasm.core_reportTerrainDrapeGpuBytes(this.__wbg_ptr, handle, gpu_bytes);
    }
    /**
     * @param {number} width
     * @param {number} height
     * @param {number} pixel_ratio
     */
    resize(width, height, pixel_ratio) {
        wasm.core_resize(this.__wbg_ptr, width, height, pixel_ratio);
    }
    /**
     * @param {Float64Array | null | undefined} axis
     * @param {number} angle
     */
    rotateAroundAxis(axis, angle) {
        var ptr0 = isLikeNone(axis) ? 0 : passArrayF64ToWasm0(axis, wasm.__wbindgen_malloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.core_rotateAroundAxis(this.__wbg_ptr, ptr0, len0, angle);
    }
    /**
     * @param {LLE} lle
     * @returns {number | undefined}
     */
    sampleTerrainHeight(lle) {
        _assertClass(lle, LLE);
        var ptr0 = lle.__destroy_into_raw();
        const ret = wasm.core_sampleTerrainHeight(this.__wbg_ptr, ptr0);
        return ret[0] === 0 ? undefined : ret[1];
    }
    /**
     * `[min, max]` height of the ground rendered over `extent` (radians).
     * @param {ExtentRadianF32} extent
     * @returns {Float64Array | undefined}
     */
    sampleTerrainHeightRange(extent) {
        _assertClass(extent, ExtentRadianF32);
        var ptr0 = extent.__destroy_into_raw();
        const ret = wasm.core_sampleTerrainHeightRange(this.__wbg_ptr, ptr0);
        let v2;
        if (ret[0] !== 0) {
            v2 = getArrayF64FromWasm0(ret[0], ret[1]).slice();
            wasm.__wbindgen_free(ret[0], ret[1] * 8, 8);
        }
        return v2;
    }
    /**
     * @param {number} handle
     * @param {bigint} bits
     * @param {number} byte_length
     * @param {Function} f
     */
    setBufferU8(handle, bits, byte_length, f) {
        wasm.core_setBufferU8(this.__wbg_ptr, handle, bits, byte_length, f);
    }
    /**
     * Sets the memory budget for tile caches in bytes. Passing `undefined`
     * disables budgeting (tiles are destroyed as soon as they leave the
     * view, the original behavior).
     * @param {number | null} [bytes]
     */
    setCacheBytes(bytes) {
        wasm.core_setCacheBytes(this.__wbg_ptr, !isLikeNone(bytes), isLikeNone(bytes) ? 0 : bytes);
    }
    /**
     * @param {CameraControlUpdateEvent} event
     */
    setCameraControl(event) {
        _assertClass(event, CameraControlUpdateEvent);
        var ptr0 = event.__destroy_into_raw();
        wasm.core_setCameraControl(this.__wbg_ptr, ptr0);
    }
    /**
     * Updates the dynamic screen-space-error relaxation; see [`DynamicSse`].
     * @param {DynamicSse} settings
     */
    setDynamicSse(settings) {
        _assertClass(settings, DynamicSse);
        var ptr0 = settings.__destroy_into_raw();
        wasm.core_setDynamicSse(this.__wbg_ptr, ptr0);
    }
    /**
     * @param {number} handle
     * @param {bigint} bits
     * @param {number} byte_length
     */
    setExternalBuffer(handle, bits, byte_length) {
        wasm.core_setExternalBuffer(this.__wbg_ptr, handle, bits, byte_length);
    }
    /**
     * Reports the estimated GPU bytes of fixed, screen-sized allocations
     * (the postprocessing render-target stack). Counted in the ledger's
     * usage so the tile budget binds against the remaining memory. The JS
     * side re-reports on init, resize, and pass-list changes.
     * @param {number} bytes
     */
    setFixedGpuBytes(bytes) {
        wasm.core_setFixedGpuBytes(this.__wbg_ptr, bytes);
    }
    /**
     * @param {number | null} [fov]
     * @param {number | null} [near]
     * @param {number | null} [far]
     */
    setFrustum(fov, near, far) {
        wasm.core_setFrustum(this.__wbg_ptr, !isLikeNone(fov), isLikeNone(fov) ? 0 : fov, !isLikeNone(near), isLikeNone(near) ? 0 : near, !isLikeNone(far), isLikeNone(far) ? 0 : far);
    }
    /**
     * @param {number} value
     */
    setGlobeColor(value) {
        wasm.core_setGlobeColor(this.__wbg_ptr, value);
    }
    /**
     * @param {Float32Array} value
     */
    setGlobeElevationColormap(value) {
        const ptr0 = passArrayF32ToWasm0(value, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.core_setGlobeElevationColormap(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @param {boolean} value
     */
    setGlobeHideUnderground(value) {
        wasm.core_setGlobeHideUnderground(this.__wbg_ptr, value);
    }
    /**
     * @param {number} value
     */
    setGlobeMaxSse(value) {
        wasm.core_setGlobeMaxSse(this.__wbg_ptr, value);
    }
    /**
     * @param {number} value
     */
    setGlobeOpacity(value) {
        wasm.core_setGlobeOpacity(this.__wbg_ptr, value);
    }
    /**
     * @param {number} value
     */
    setGlobeSegments(value) {
        wasm.core_setGlobeSegments(this.__wbg_ptr, value);
    }
    /**
     * @param {boolean} value
     */
    setGlobeTransparent(value) {
        wasm.core_setGlobeTransparent(this.__wbg_ptr, value);
    }
    /**
     * @param {boolean} value
     */
    setGlobeUseNormal(value) {
        wasm.core_setGlobeUseNormal(this.__wbg_ptr, value);
    }
    /**
     * @param {boolean} value
     */
    setGlobeWireframe(value) {
        wasm.core_setGlobeWireframe(this.__wbg_ptr, value);
    }
    /**
     * Updates the LOD fog parameters (distance-based screen-space-error
     * relaxation: far tiles tolerate a larger error and stay coarser). This
     * only affects tile LOD selection, never visual fog rendering.
     * @param {boolean} enabled
     * @param {number} density
     * @param {number} sse_factor
     */
    setLodFog(enabled, density, sse_factor) {
        wasm.core_setLodFog(this.__wbg_ptr, enabled, density, sse_factor);
    }
    /**
     * Caps the number of in-flight data fetches per tile pipeline (raster /
     * terrain / vector / 3D Tiles / hillshade each apply it independently).
     * @param {number} value
     */
    setMaxPendingRequests(value) {
        wasm.core_setMaxPendingRequests(this.__wbg_ptr, value);
    }
    /**
     * Overrides GPU cost estimates that only the JS side knows precisely
     * (the composite atlas size depends on device options).
     * @param {number} atlas_tile_bytes
     * @param {number} raster_tile_bytes
     */
    setMemoryCostHints(atlas_tile_bytes, raster_tile_bytes) {
        wasm.core_setMemoryCostHints(this.__wbg_ptr, atlas_tile_bytes, raster_tile_bytes);
    }
    /**
     * Sets the memory-pressure SSE multiplier range. `min` is the resting
     * base (far tiles always coarser; >1 on mobile), `max` the ceiling the
     * degrade rises to under memory pressure.
     * @param {number} min
     * @param {number} max
     */
    setSseMultiplierRange(min, max) {
        wasm.core_setSseMultiplierRange(this.__wbg_ptr, min, max);
    }
    /**
     * @param {bigint} handle
     */
    setTileMeshPrepared(handle) {
        wasm.core_setTileMeshPrepared(this.__wbg_ptr, handle);
    }
    start() {
        wasm.core_start(this.__wbg_ptr);
    }
    /**
     * @param {bigint} bits
     */
    triggerDataRequesterFailed(bits) {
        wasm.core_triggerDataRequesterFailed(this.__wbg_ptr, bits);
    }
    /**
     * @param {bigint} bits
     * @param {number} handle
     */
    triggerDataRequesterLoaded(bits, handle) {
        wasm.core_triggerDataRequesterLoaded(this.__wbg_ptr, bits, handle);
    }
    /**
     * @param {bigint} bits
     * @param {TextureFragmentStatus} status
     */
    triggerTextureFragmentLoaded(bits, status) {
        wasm.core_triggerTextureFragmentLoaded(this.__wbg_ptr, bits, status);
    }
    /**
     * @param {bigint} bits
     * @param {DelegatedWorkerTasksResult} result
     */
    triggerWorkerTaskCompleted(bits, result) {
        _assertClass(result, DelegatedWorkerTasksResult);
        var ptr0 = result.__destroy_into_raw();
        wasm.core_triggerWorkerTaskCompleted(this.__wbg_ptr, bits, ptr0);
    }
    /**
     * Release the delegator of a task that ended without a deliverable
     * result (worker error, missing input, ...). Consumes `delegator_id`.
     * Safe to call for a task the engine already cancelled: a despawned
     * delegator makes this a no-op.
     * @param {ReconstructableEntity} delegator_id
     */
    triggerWorkerTaskFailed(delegator_id) {
        _assertClass(delegator_id, ReconstructableEntity);
        var ptr0 = delegator_id.__destroy_into_raw();
        wasm.core_triggerWorkerTaskFailed(this.__wbg_ptr, ptr0);
    }
    /**
     * @param {bigint} bits
     */
    unregisterSampleTerrainHeightEvent(bits) {
        wasm.core_unregisterSampleTerrainHeightEvent(this.__wbg_ptr, bits);
    }
    /**
     * @param {bigint} bits
     */
    unregisterTerrainHeightRangeEvent(bits) {
        wasm.core_unregisterTerrainHeightRangeEvent(this.__wbg_ptr, bits);
    }
    /**
     * @param {number} updated_at
     */
    update(updated_at) {
        wasm.core_update(this.__wbg_ptr, updated_at);
    }
    /**
     * @param {string} layer_id
     * @param {any} layer
     */
    updateLayer(layer_id, layer) {
        const ptr0 = passStringToWasm0(layer_id, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.core_updateLayer(this.__wbg_ptr, ptr0, len0, layer);
    }
    /**
     * @param {string} source_id
     * @param {any} source
     */
    updateSource(source_id, source) {
        const ptr0 = passStringToWasm0(source_id, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.core_updateSource(this.__wbg_ptr, ptr0, len0, source);
    }
    /**
     * Monotonic revision that changes only when the vector-tile resolution could have
     * changed. The web renderer reads it once per frame and skips the per-terrain-tile
     * `getVectorTileStates` calls while it is unchanged.
     * @returns {number}
     */
    vectorRevision() {
        const ret = wasm.core_vectorRevision(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @returns {string}
     */
    get id() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.__wbg_get_core_id(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * @param {string} arg0
     */
    set id(arg0) {
        const ptr0 = passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_core_id(this.__wbg_ptr, ptr0, len0);
    }
}
if (Symbol.dispose) Core.prototype[Symbol.dispose] = Core.prototype.free;

export class DataRequestEvent {
    static __wrap(ptr) {
        const obj = Object.create(DataRequestEvent.prototype);
        obj.__wbg_ptr = ptr;
        DataRequestEventFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        DataRequestEventFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_datarequestevent_free(ptr, 0);
    }
    /**
     * @returns {bigint}
     */
    get bits() {
        const ret = wasm.__wbg_get_datarequestevent_bits(this.__wbg_ptr);
        return BigInt.asUintN(64, ret);
    }
    /**
     * @returns {string}
     */
    get extension() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.__wbg_get_datarequestevent_extension(this.__wbg_ptr);
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
    get gen() {
        const ret = wasm.__wbg_get_datarequestevent_gen(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @returns {number}
     */
    get handle() {
        const ret = wasm.__wbg_get_datarequestevent_handle(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number}
     */
    get ind() {
        const ret = wasm.__wbg_get_datarequestevent_ind(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * Byte-range length in bytes. Set together with `offset`.
     * @returns {bigint | undefined}
     */
    get length() {
        const ret = wasm.__wbg_get_datarequestevent_length(this.__wbg_ptr);
        return ret[0] === 0 ? undefined : BigInt.asUintN(64, ret[1]);
    }
    /**
     * Byte-range offset for a partial fetch. `None` for a full-resource GET.
     * @returns {bigint | undefined}
     */
    get offset() {
        const ret = wasm.__wbg_get_datarequestevent_offset(this.__wbg_ptr);
        return ret[0] === 0 ? undefined : BigInt.asUintN(64, ret[1]);
    }
    /**
     * Fetch urgency: 0 is the most urgent (see `Priority::rank`). The web
     * side keeps its pending fetch queue sorted by this. Requests without an
     * ECS `Priority` (tileset / PMTiles bootstrap reads, 3D Tiles content)
     * rank as `Extreme`, matching the engine sender that dispatches them
     * ahead of the prioritized ones.
     * @returns {number}
     */
    get priority() {
        const ret = wasm.__wbg_get_datarequestevent_priority(this.__wbg_ptr);
        return ret;
    }
    /**
     * Quantized-mesh only: server should return the oct-encoded normals extension.
     * @returns {boolean}
     */
    get requestVertexNormals() {
        const ret = wasm.__wbg_get_datarequestevent_requestVertexNormals(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * Quantized-mesh only: server should return the watermask extension.
     * @returns {boolean}
     */
    get requestWaterMask() {
        const ret = wasm.__wbg_get_datarequestevent_requestWaterMask(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * Quantized-mesh only: bearer token sent as the `Authorization` header
     * for `.terrain` requests. `None` means no Authorization header is added.
     * @returns {string | undefined}
     */
    get token() {
        const ret = wasm.__wbg_get_datarequestevent_token(this.__wbg_ptr);
        let v1;
        if (ret[0] !== 0) {
            v1 = getStringFromWasm0(ret[0], ret[1]).slice();
            wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        }
        return v1;
    }
    /**
     * @returns {string}
     */
    get url() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.__wbg_get_datarequestevent_url(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * @param {bigint} arg0
     */
    set bits(arg0) {
        wasm.__wbg_set_datarequestevent_bits(this.__wbg_ptr, arg0);
    }
    /**
     * @param {string} arg0
     */
    set extension(arg0) {
        const ptr0 = passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_datarequestevent_extension(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @param {number} arg0
     */
    set gen(arg0) {
        wasm.__wbg_set_datarequestevent_gen(this.__wbg_ptr, arg0);
    }
    /**
     * @param {number} arg0
     */
    set handle(arg0) {
        wasm.__wbg_set_datarequestevent_handle(this.__wbg_ptr, arg0);
    }
    /**
     * @param {number} arg0
     */
    set ind(arg0) {
        wasm.__wbg_set_datarequestevent_ind(this.__wbg_ptr, arg0);
    }
    /**
     * Byte-range length in bytes. Set together with `offset`.
     * @param {bigint | null} [arg0]
     */
    set length(arg0) {
        wasm.__wbg_set_datarequestevent_length(this.__wbg_ptr, !isLikeNone(arg0), isLikeNone(arg0) ? BigInt(0) : arg0);
    }
    /**
     * Byte-range offset for a partial fetch. `None` for a full-resource GET.
     * @param {bigint | null} [arg0]
     */
    set offset(arg0) {
        wasm.__wbg_set_datarequestevent_offset(this.__wbg_ptr, !isLikeNone(arg0), isLikeNone(arg0) ? BigInt(0) : arg0);
    }
    /**
     * Fetch urgency: 0 is the most urgent (see `Priority::rank`). The web
     * side keeps its pending fetch queue sorted by this. Requests without an
     * ECS `Priority` (tileset / PMTiles bootstrap reads, 3D Tiles content)
     * rank as `Extreme`, matching the engine sender that dispatches them
     * ahead of the prioritized ones.
     * @param {number} arg0
     */
    set priority(arg0) {
        wasm.__wbg_set_datarequestevent_priority(this.__wbg_ptr, arg0);
    }
    /**
     * Quantized-mesh only: server should return the oct-encoded normals extension.
     * @param {boolean} arg0
     */
    set requestVertexNormals(arg0) {
        wasm.__wbg_set_datarequestevent_requestVertexNormals(this.__wbg_ptr, arg0);
    }
    /**
     * Quantized-mesh only: server should return the watermask extension.
     * @param {boolean} arg0
     */
    set requestWaterMask(arg0) {
        wasm.__wbg_set_datarequestevent_requestWaterMask(this.__wbg_ptr, arg0);
    }
    /**
     * Quantized-mesh only: bearer token sent as the `Authorization` header
     * for `.terrain` requests. `None` means no Authorization header is added.
     * @param {string | null} [arg0]
     */
    set token(arg0) {
        var ptr0 = isLikeNone(arg0) ? 0 : passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_datarequestevent_token(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @param {string} arg0
     */
    set url(arg0) {
        const ptr0 = passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_datarequestevent_url(this.__wbg_ptr, ptr0, len0);
    }
}
if (Symbol.dispose) DataRequestEvent.prototype[Symbol.dispose] = DataRequestEvent.prototype.free;

export class DataRequesterRemovedEvent {
    static __wrap(ptr) {
        const obj = Object.create(DataRequesterRemovedEvent.prototype);
        obj.__wbg_ptr = ptr;
        DataRequesterRemovedEventFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        DataRequesterRemovedEventFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_datarequesterremovedevent_free(ptr, 0);
    }
    /**
     * @returns {bigint}
     */
    get bits() {
        const ret = wasm.__wbg_get_datarequesterremovedevent_bits(this.__wbg_ptr);
        return BigInt.asUintN(64, ret);
    }
    /**
     * @returns {number}
     */
    get gen() {
        const ret = wasm.__wbg_get_datarequesterremovedevent_gen(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @returns {number}
     */
    get handle() {
        const ret = wasm.__wbg_get_datarequesterremovedevent_handle(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number}
     */
    get ind() {
        const ret = wasm.__wbg_get_datarequesterremovedevent_ind(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @param {bigint} arg0
     */
    set bits(arg0) {
        wasm.__wbg_set_datarequesterremovedevent_bits(this.__wbg_ptr, arg0);
    }
    /**
     * @param {number} arg0
     */
    set gen(arg0) {
        wasm.__wbg_set_datarequesterremovedevent_gen(this.__wbg_ptr, arg0);
    }
    /**
     * @param {number} arg0
     */
    set handle(arg0) {
        wasm.__wbg_set_datarequesterremovedevent_handle(this.__wbg_ptr, arg0);
    }
    /**
     * @param {number} arg0
     */
    set ind(arg0) {
        wasm.__wbg_set_datarequesterremovedevent_ind(this.__wbg_ptr, arg0);
    }
}
if (Symbol.dispose) DataRequesterRemovedEvent.prototype[Symbol.dispose] = DataRequesterRemovedEvent.prototype.free;

export class DelegatedWorkerTasksParameters {
    static __wrap(ptr) {
        const obj = Object.create(DelegatedWorkerTasksParameters.prototype);
        obj.__wbg_ptr = ptr;
        DelegatedWorkerTasksParametersFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        DelegatedWorkerTasksParametersFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_delegatedworkertasksparameters_free(ptr, 0);
    }
    /**
     * @returns {ConstructPolygonBatchedFeatureParameters | undefined}
     */
    get construct_polygon_batched_feature() {
        const ret = wasm.__wbg_get_delegatedworkertasksparameters_construct_polygon_batched_feature(this.__wbg_ptr);
        return ret === 0 ? undefined : ConstructPolygonBatchedFeatureParameters.__wrap(ret);
    }
    /**
     * @returns {ConstructPolylineBatchedFeatureParameters | undefined}
     */
    get construct_polyline_batched_feature() {
        const ret = wasm.__wbg_get_delegatedworkertasksparameters_construct_polyline_batched_feature(this.__wbg_ptr);
        return ret === 0 ? undefined : ConstructPolylineBatchedFeatureParameters.__wrap(ret);
    }
    /**
     * @returns {ConstructTerrainMeshParameters | undefined}
     */
    get construct_terrain_mesh() {
        const ret = wasm.__wbg_get_delegatedworkertasksparameters_construct_terrain_mesh(this.__wbg_ptr);
        return ret === 0 ? undefined : ConstructTerrainMeshParameters.__wrap(ret);
    }
    /**
     * @returns {ReconstructableEntity}
     */
    get delegator_id() {
        const ret = wasm.__wbg_get_delegatedworkertasksparameters_delegator_id(this.__wbg_ptr);
        return ReconstructableEntity.__wrap(ret);
    }
    /**
     * @returns {ParseMvtTileParameters | undefined}
     */
    get parse_mvt_tile() {
        const ret = wasm.__wbg_get_delegatedworkertasksparameters_parse_mvt_tile(this.__wbg_ptr);
        return ret === 0 ? undefined : ParseMvtTileParameters.__wrap(ret);
    }
    /**
     * @returns {UpsampleTerrainMeshParameters | undefined}
     */
    get upsample_terrain_mesh() {
        const ret = wasm.__wbg_get_delegatedworkertasksparameters_upsample_terrain_mesh(this.__wbg_ptr);
        return ret === 0 ? undefined : UpsampleTerrainMeshParameters.__wrap(ret);
    }
    /**
     * @param {ConstructPolygonBatchedFeatureParameters | null} [arg0]
     */
    set construct_polygon_batched_feature(arg0) {
        let ptr0 = 0;
        if (!isLikeNone(arg0)) {
            _assertClass(arg0, ConstructPolygonBatchedFeatureParameters);
            ptr0 = arg0.__destroy_into_raw();
        }
        wasm.__wbg_set_delegatedworkertasksparameters_construct_polygon_batched_feature(this.__wbg_ptr, ptr0);
    }
    /**
     * @param {ConstructPolylineBatchedFeatureParameters | null} [arg0]
     */
    set construct_polyline_batched_feature(arg0) {
        let ptr0 = 0;
        if (!isLikeNone(arg0)) {
            _assertClass(arg0, ConstructPolylineBatchedFeatureParameters);
            ptr0 = arg0.__destroy_into_raw();
        }
        wasm.__wbg_set_delegatedworkertasksparameters_construct_polyline_batched_feature(this.__wbg_ptr, ptr0);
    }
    /**
     * @param {ConstructTerrainMeshParameters | null} [arg0]
     */
    set construct_terrain_mesh(arg0) {
        let ptr0 = 0;
        if (!isLikeNone(arg0)) {
            _assertClass(arg0, ConstructTerrainMeshParameters);
            ptr0 = arg0.__destroy_into_raw();
        }
        wasm.__wbg_set_delegatedworkertasksparameters_construct_terrain_mesh(this.__wbg_ptr, ptr0);
    }
    /**
     * @param {ReconstructableEntity} arg0
     */
    set delegator_id(arg0) {
        _assertClass(arg0, ReconstructableEntity);
        var ptr0 = arg0.__destroy_into_raw();
        wasm.__wbg_set_delegatedworkertasksparameters_delegator_id(this.__wbg_ptr, ptr0);
    }
    /**
     * @param {ParseMvtTileParameters | null} [arg0]
     */
    set parse_mvt_tile(arg0) {
        let ptr0 = 0;
        if (!isLikeNone(arg0)) {
            _assertClass(arg0, ParseMvtTileParameters);
            ptr0 = arg0.__destroy_into_raw();
        }
        wasm.__wbg_set_delegatedworkertasksparameters_parse_mvt_tile(this.__wbg_ptr, ptr0);
    }
    /**
     * @param {UpsampleTerrainMeshParameters | null} [arg0]
     */
    set upsample_terrain_mesh(arg0) {
        let ptr0 = 0;
        if (!isLikeNone(arg0)) {
            _assertClass(arg0, UpsampleTerrainMeshParameters);
            ptr0 = arg0.__destroy_into_raw();
        }
        wasm.__wbg_set_delegatedworkertasksparameters_upsample_terrain_mesh(this.__wbg_ptr, ptr0);
    }
}
if (Symbol.dispose) DelegatedWorkerTasksParameters.prototype[Symbol.dispose] = DelegatedWorkerTasksParameters.prototype.free;

export class DelegatedWorkerTasksResult {
    static __wrap(ptr) {
        const obj = Object.create(DelegatedWorkerTasksResult.prototype);
        obj.__wbg_ptr = ptr;
        DelegatedWorkerTasksResultFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        DelegatedWorkerTasksResultFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_delegatedworkertasksresult_free(ptr, 0);
    }
    /**
     * @param {ReconstructableEntity} delegator_id
     * @param {ConstructPolygonBatchedFeatureResult | null} [construct_polygon_batched_feature]
     * @returns {DelegatedWorkerTasksResult}
     */
    static withConstructPolygonBatchedFeature(delegator_id, construct_polygon_batched_feature) {
        _assertClass(delegator_id, ReconstructableEntity);
        var ptr0 = delegator_id.__destroy_into_raw();
        let ptr1 = 0;
        if (!isLikeNone(construct_polygon_batched_feature)) {
            _assertClass(construct_polygon_batched_feature, ConstructPolygonBatchedFeatureResult);
            ptr1 = construct_polygon_batched_feature.__destroy_into_raw();
        }
        const ret = wasm.delegatedworkertasksresult_withConstructPolygonBatchedFeature(ptr0, ptr1);
        return DelegatedWorkerTasksResult.__wrap(ret);
    }
    /**
     * @param {ReconstructableEntity} delegator_id
     * @param {ConstructPolylineBatchedFeatureResult | null} [construct_polyline_batched_feature]
     * @returns {DelegatedWorkerTasksResult}
     */
    static withConstructPolylineBatchedFeature(delegator_id, construct_polyline_batched_feature) {
        _assertClass(delegator_id, ReconstructableEntity);
        var ptr0 = delegator_id.__destroy_into_raw();
        let ptr1 = 0;
        if (!isLikeNone(construct_polyline_batched_feature)) {
            _assertClass(construct_polyline_batched_feature, ConstructPolylineBatchedFeatureResult);
            ptr1 = construct_polyline_batched_feature.__destroy_into_raw();
        }
        const ret = wasm.delegatedworkertasksresult_withConstructPolylineBatchedFeature(ptr0, ptr1);
        return DelegatedWorkerTasksResult.__wrap(ret);
    }
    /**
     * @param {ReconstructableEntity} delegator_id
     * @param {ConstructTerrainMeshResult | null} [construct_terrain_mesh]
     * @returns {DelegatedWorkerTasksResult}
     */
    static withConstructTerrainMesh(delegator_id, construct_terrain_mesh) {
        _assertClass(delegator_id, ReconstructableEntity);
        var ptr0 = delegator_id.__destroy_into_raw();
        let ptr1 = 0;
        if (!isLikeNone(construct_terrain_mesh)) {
            _assertClass(construct_terrain_mesh, ConstructTerrainMeshResult);
            ptr1 = construct_terrain_mesh.__destroy_into_raw();
        }
        const ret = wasm.delegatedworkertasksresult_withConstructTerrainMesh(ptr0, ptr1);
        return DelegatedWorkerTasksResult.__wrap(ret);
    }
    /**
     * @param {ReconstructableEntity} delegator_id
     * @param {ParseMvtTileResult | null} [parse_mvt_tile]
     * @returns {DelegatedWorkerTasksResult}
     */
    static withParseMvtTile(delegator_id, parse_mvt_tile) {
        _assertClass(delegator_id, ReconstructableEntity);
        var ptr0 = delegator_id.__destroy_into_raw();
        let ptr1 = 0;
        if (!isLikeNone(parse_mvt_tile)) {
            _assertClass(parse_mvt_tile, ParseMvtTileResult);
            ptr1 = parse_mvt_tile.__destroy_into_raw();
        }
        const ret = wasm.delegatedworkertasksresult_withParseMvtTile(ptr0, ptr1);
        return DelegatedWorkerTasksResult.__wrap(ret);
    }
    /**
     * @param {ReconstructableEntity} delegator_id
     * @param {UpsampleTerrainMeshResult | null} [upsample_terrain_mesh]
     * @returns {DelegatedWorkerTasksResult}
     */
    static withUpsampleTerrainMesh(delegator_id, upsample_terrain_mesh) {
        _assertClass(delegator_id, ReconstructableEntity);
        var ptr0 = delegator_id.__destroy_into_raw();
        let ptr1 = 0;
        if (!isLikeNone(upsample_terrain_mesh)) {
            _assertClass(upsample_terrain_mesh, UpsampleTerrainMeshResult);
            ptr1 = upsample_terrain_mesh.__destroy_into_raw();
        }
        const ret = wasm.delegatedworkertasksresult_withUpsampleTerrainMesh(ptr0, ptr1);
        return DelegatedWorkerTasksResult.__wrap(ret);
    }
    /**
     * @returns {ConstructPolygonBatchedFeatureResult | undefined}
     */
    get construct_polygon_batched_feature() {
        const ret = wasm.__wbg_get_delegatedworkertasksresult_construct_polygon_batched_feature(this.__wbg_ptr);
        return ret === 0 ? undefined : ConstructPolygonBatchedFeatureResult.__wrap(ret);
    }
    /**
     * @returns {ConstructPolylineBatchedFeatureResult | undefined}
     */
    get construct_polyline_batched_feature() {
        const ret = wasm.__wbg_get_delegatedworkertasksresult_construct_polyline_batched_feature(this.__wbg_ptr);
        return ret === 0 ? undefined : ConstructPolylineBatchedFeatureResult.__wrap(ret);
    }
    /**
     * @returns {ConstructTerrainMeshResult | undefined}
     */
    get construct_terrain_mesh() {
        const ret = wasm.__wbg_get_delegatedworkertasksresult_construct_terrain_mesh(this.__wbg_ptr);
        return ret === 0 ? undefined : ConstructTerrainMeshResult.__wrap(ret);
    }
    /**
     * @returns {ReconstructableEntity}
     */
    get delegator_id() {
        const ret = wasm.__wbg_get_delegatedworkertasksresult_delegator_id(this.__wbg_ptr);
        return ReconstructableEntity.__wrap(ret);
    }
    /**
     * @returns {ParseMvtTileResult | undefined}
     */
    get parse_mvt_tile() {
        const ret = wasm.__wbg_get_delegatedworkertasksresult_parse_mvt_tile(this.__wbg_ptr);
        return ret === 0 ? undefined : ParseMvtTileResult.__wrap(ret);
    }
    /**
     * @returns {UpsampleTerrainMeshResult | undefined}
     */
    get upsample_terrain_mesh() {
        const ret = wasm.__wbg_get_delegatedworkertasksresult_upsample_terrain_mesh(this.__wbg_ptr);
        return ret === 0 ? undefined : UpsampleTerrainMeshResult.__wrap(ret);
    }
    /**
     * @param {ConstructPolygonBatchedFeatureResult | null} [arg0]
     */
    set construct_polygon_batched_feature(arg0) {
        let ptr0 = 0;
        if (!isLikeNone(arg0)) {
            _assertClass(arg0, ConstructPolygonBatchedFeatureResult);
            ptr0 = arg0.__destroy_into_raw();
        }
        wasm.__wbg_set_delegatedworkertasksresult_construct_polygon_batched_feature(this.__wbg_ptr, ptr0);
    }
    /**
     * @param {ConstructPolylineBatchedFeatureResult | null} [arg0]
     */
    set construct_polyline_batched_feature(arg0) {
        let ptr0 = 0;
        if (!isLikeNone(arg0)) {
            _assertClass(arg0, ConstructPolylineBatchedFeatureResult);
            ptr0 = arg0.__destroy_into_raw();
        }
        wasm.__wbg_set_delegatedworkertasksresult_construct_polyline_batched_feature(this.__wbg_ptr, ptr0);
    }
    /**
     * @param {ConstructTerrainMeshResult | null} [arg0]
     */
    set construct_terrain_mesh(arg0) {
        let ptr0 = 0;
        if (!isLikeNone(arg0)) {
            _assertClass(arg0, ConstructTerrainMeshResult);
            ptr0 = arg0.__destroy_into_raw();
        }
        wasm.__wbg_set_delegatedworkertasksresult_construct_terrain_mesh(this.__wbg_ptr, ptr0);
    }
    /**
     * @param {ReconstructableEntity} arg0
     */
    set delegator_id(arg0) {
        _assertClass(arg0, ReconstructableEntity);
        var ptr0 = arg0.__destroy_into_raw();
        wasm.__wbg_set_delegatedworkertasksresult_delegator_id(this.__wbg_ptr, ptr0);
    }
    /**
     * @param {ParseMvtTileResult | null} [arg0]
     */
    set parse_mvt_tile(arg0) {
        let ptr0 = 0;
        if (!isLikeNone(arg0)) {
            _assertClass(arg0, ParseMvtTileResult);
            ptr0 = arg0.__destroy_into_raw();
        }
        wasm.__wbg_set_delegatedworkertasksresult_parse_mvt_tile(this.__wbg_ptr, ptr0);
    }
    /**
     * @param {UpsampleTerrainMeshResult | null} [arg0]
     */
    set upsample_terrain_mesh(arg0) {
        let ptr0 = 0;
        if (!isLikeNone(arg0)) {
            _assertClass(arg0, UpsampleTerrainMeshResult);
            ptr0 = arg0.__destroy_into_raw();
        }
        wasm.__wbg_set_delegatedworkertasksresult_upsample_terrain_mesh(this.__wbg_ptr, ptr0);
    }
}
if (Symbol.dispose) DelegatedWorkerTasksResult.prototype[Symbol.dispose] = DelegatedWorkerTasksResult.prototype.free;

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

/**
 * Dynamic screen-space-error settings (CesiumJS `dynamicScreenSpaceError`
 * equivalent): tilted, street-level horizon views tolerate a larger error
 * for far tiles. Zero effect looking straight down; fades out as the camera
 * climbs past `maxHeight` meters. Only affects tile LOD selection.
 *
 * The TS-side `DynamicSseSettings` plain-object type is derived from this
 * class (`NormalizeWASMClass`), so this is the single source of the shape.
 */
export class DynamicSse {
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        DynamicSseFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_dynamicsse_free(ptr, 0);
    }
    /**
     * @param {boolean} enabled
     * @param {number} density
     * @param {number} sse_factor
     * @param {number} height_falloff
     * @param {number} min_height
     * @param {number} max_height
     */
    constructor(enabled, density, sse_factor, height_falloff, min_height, max_height) {
        const ret = wasm.dynamicsse_new(enabled, density, sse_factor, height_falloff, min_height, max_height);
        this.__wbg_ptr = ret;
        DynamicSseFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * Distance scale of the relaxation ramp before tilt/height scaling.
     * @returns {number}
     */
    get density() {
        const ret = wasm.__wbg_get_dynamicsse_density(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {boolean}
     */
    get enabled() {
        const ret = wasm.__wbg_get_dynamicsse_enabled(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * Fraction of the height band below which the effect is at full strength.
     * @returns {number}
     */
    get heightFalloff() {
        const ret = wasm.__wbg_get_dynamicsse_heightFalloff(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number}
     */
    get maxHeight() {
        const ret = wasm.__wbg_get_dynamicsse_maxHeight(this.__wbg_ptr);
        return ret;
    }
    /**
     * Camera height band (meters above the ellipsoid) the effect fades across.
     * @returns {number}
     */
    get minHeight() {
        const ret = wasm.__wbg_get_dynamicsse_minHeight(this.__wbg_ptr);
        return ret;
    }
    /**
     * Maximum SSE relaxation (in pixels) at full tilt and saturation for a
     * layer with the reference max SSE of 16 (the CesiumJS 3D Tiles default);
     * each layer scales it by its own max SSE, so terrain and imagery
     * (max SSE 2) relax by at most `sseFactor / 8` pixels.
     * @returns {number}
     */
    get sseFactor() {
        const ret = wasm.__wbg_get_dynamicsse_sseFactor(this.__wbg_ptr);
        return ret;
    }
    /**
     * Distance scale of the relaxation ramp before tilt/height scaling.
     * @param {number} arg0
     */
    set density(arg0) {
        wasm.__wbg_set_dynamicsse_density(this.__wbg_ptr, arg0);
    }
    /**
     * @param {boolean} arg0
     */
    set enabled(arg0) {
        wasm.__wbg_set_dynamicsse_enabled(this.__wbg_ptr, arg0);
    }
    /**
     * Fraction of the height band below which the effect is at full strength.
     * @param {number} arg0
     */
    set heightFalloff(arg0) {
        wasm.__wbg_set_dynamicsse_heightFalloff(this.__wbg_ptr, arg0);
    }
    /**
     * @param {number} arg0
     */
    set maxHeight(arg0) {
        wasm.__wbg_set_dynamicsse_maxHeight(this.__wbg_ptr, arg0);
    }
    /**
     * Camera height band (meters above the ellipsoid) the effect fades across.
     * @param {number} arg0
     */
    set minHeight(arg0) {
        wasm.__wbg_set_dynamicsse_minHeight(this.__wbg_ptr, arg0);
    }
    /**
     * Maximum SSE relaxation (in pixels) at full tilt and saturation for a
     * layer with the reference max SSE of 16 (the CesiumJS 3D Tiles default);
     * each layer scales it by its own max SSE, so terrain and imagery
     * (max SSE 2) relax by at most `sseFactor / 8` pixels.
     * @param {number} arg0
     */
    set sseFactor(arg0) {
        wasm.__wbg_set_dynamicsse_sseFactor(this.__wbg_ptr, arg0);
    }
}
if (Symbol.dispose) DynamicSse.prototype[Symbol.dispose] = DynamicSse.prototype.free;

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
    static __wrap(ptr) {
        const obj = Object.create(ElevationHeatmapMaterial.prototype);
        obj.__wbg_ptr = ptr;
        ElevationHeatmapMaterialFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
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

export class EntityEvent {
    static __wrap(ptr) {
        const obj = Object.create(EntityEvent.prototype);
        obj.__wbg_ptr = ptr;
        EntityEventFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        EntityEventFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_entityevent_free(ptr, 0);
    }
    /**
     * @returns {number}
     */
    get gen() {
        const ret = wasm.__wbg_get_entityevent_gen(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @returns {number}
     */
    get ind() {
        const ret = wasm.__wbg_get_entityevent_ind(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @param {number} arg0
     */
    set gen(arg0) {
        wasm.__wbg_set_entityevent_gen(this.__wbg_ptr, arg0);
    }
    /**
     * @param {number} arg0
     */
    set ind(arg0) {
        wasm.__wbg_set_entityevent_ind(this.__wbg_ptr, arg0);
    }
}
if (Symbol.dispose) EntityEvent.prototype[Symbol.dispose] = EntityEvent.prototype.free;

export class Events {
    static __wrap(ptr) {
        const obj = Object.create(Events.prototype);
        obj.__wbg_ptr = ptr;
        EventsFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        EventsFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_events_free(ptr, 0);
    }
    /**
     * @returns {CameraFlightEndedEvent[]}
     */
    take_camera_flight_ended() {
        const ret = wasm.events_take_camera_flight_ended(this.__wbg_ptr);
        var v1 = getArrayJsValueFromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v1;
    }
    /**
     * @returns {CameraFrustum | undefined}
     */
    take_camera_frustum_updated() {
        const ret = wasm.events_take_camera_frustum_updated(this.__wbg_ptr);
        return ret === 0 ? undefined : CameraFrustum.__wrap(ret);
    }
    /**
     * @returns {Transform | undefined}
     */
    take_camera_transform_updated() {
        const ret = wasm.events_take_camera_transform_updated(this.__wbg_ptr);
        return ret === 0 ? undefined : Transform.__wrap(ret);
    }
    /**
     * @returns {DataRequestEvent[]}
     */
    take_data_requested() {
        const ret = wasm.events_take_data_requested(this.__wbg_ptr);
        var v1 = getArrayJsValueFromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v1;
    }
    /**
     * @returns {DataRequesterRemovedEvent[]}
     */
    take_data_requester_removed() {
        const ret = wasm.events_take_data_requester_removed(this.__wbg_ptr);
        var v1 = getArrayJsValueFromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v1;
    }
    /**
     * @returns {HillshadeBackfilledEvent[]}
     */
    take_hillshade_backfilled() {
        const ret = wasm.events_take_hillshade_backfilled(this.__wbg_ptr);
        var v1 = getArrayJsValueFromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v1;
    }
    /**
     * @returns {EntityEvent[]}
     */
    take_hillshade_canceled() {
        const ret = wasm.events_take_hillshade_canceled(this.__wbg_ptr);
        var v1 = getArrayJsValueFromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v1;
    }
    /**
     * @returns {MeshAdded[]}
     */
    take_mesh_added() {
        const ret = wasm.events_take_mesh_added(this.__wbg_ptr);
        var v1 = getArrayJsValueFromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v1;
    }
    /**
     * @returns {MeshGeometryReplaced[]}
     */
    take_mesh_geometry_replaced() {
        const ret = wasm.events_take_mesh_geometry_replaced(this.__wbg_ptr);
        var v1 = getArrayJsValueFromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v1;
    }
    /**
     * @returns {EntityEvent[]}
     */
    take_mesh_removed() {
        const ret = wasm.events_take_mesh_removed(this.__wbg_ptr);
        var v1 = getArrayJsValueFromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v1;
    }
    /**
     * @returns {MeshChanged[]}
     */
    take_mesh_updated() {
        const ret = wasm.events_take_mesh_updated(this.__wbg_ptr);
        var v1 = getArrayJsValueFromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v1;
    }
    /**
     * @returns {ObjectTransformEvent[]}
     */
    take_object_transform_updated() {
        const ret = wasm.events_take_object_transform_updated(this.__wbg_ptr);
        var v1 = getArrayJsValueFromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v1;
    }
    /**
     * @returns {RenderableFeatureAddedEvent[]}
     */
    take_renderable_feature_added() {
        const ret = wasm.events_take_renderable_feature_added(this.__wbg_ptr);
        var v1 = getArrayJsValueFromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v1;
    }
    /**
     * @returns {RenderableFeatureChangedEvent[]}
     */
    take_renderable_feature_changed() {
        const ret = wasm.events_take_renderable_feature_changed(this.__wbg_ptr);
        var v1 = getArrayJsValueFromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v1;
    }
    /**
     * @returns {RenderableFeatureRemovedEvent[]}
     */
    take_renderable_feature_removed() {
        const ret = wasm.events_take_renderable_feature_removed(this.__wbg_ptr);
        var v1 = getArrayJsValueFromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v1;
    }
    /**
     * @returns {EntityEvent[]}
     */
    take_texture_fragment_removed() {
        const ret = wasm.events_take_texture_fragment_removed(this.__wbg_ptr);
        var v1 = getArrayJsValueFromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v1;
    }
    /**
     * @returns {TextureFragmentRequestedEvent[]}
     */
    take_texture_fragment_requested() {
        const ret = wasm.events_take_texture_fragment_requested(this.__wbg_ptr);
        var v1 = getArrayJsValueFromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v1;
    }
    /**
     * @returns {TerrainHeightUpdatedEvent[]}
     */
    take_update_sample_terrain_height() {
        const ret = wasm.events_take_update_sample_terrain_height(this.__wbg_ptr);
        var v1 = getArrayJsValueFromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v1;
    }
    /**
     * @returns {TerrainHeightRangeUpdatedEvent[]}
     */
    take_update_terrain_height_range() {
        const ret = wasm.events_take_update_terrain_height_range(this.__wbg_ptr);
        var v1 = getArrayJsValueFromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v1;
    }
    /**
     * @returns {WorkerTaskDelegatedEvent[]}
     */
    take_worker_task_delegated() {
        const ret = wasm.events_take_worker_task_delegated(this.__wbg_ptr);
        var v1 = getArrayJsValueFromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v1;
    }
    /**
     * @returns {EntityEvent[]}
     */
    take_worker_task_removed() {
        const ret = wasm.events_take_worker_task_removed(this.__wbg_ptr);
        var v1 = getArrayJsValueFromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v1;
    }
}
if (Symbol.dispose) Events.prototype[Symbol.dispose] = Events.prototype.free;

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

export class GeoJsonSourceDescription {
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        GeoJsonSourceDescriptionFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_geojsonsourcedescription_free(ptr, 0);
    }
    /**
     * @returns {string | undefined}
     */
    get crs() {
        const ret = wasm.__wbg_get_geojsonsourcedescription_crs(this.__wbg_ptr);
        let v1;
        if (ret[0] !== 0) {
            v1 = getStringFromWasm0(ret[0], ret[1]).slice();
            wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        }
        return v1;
    }
    /**
     * Inline GeoJSON document (`FeatureCollection` / `Feature` / `Geometry`).
     * Used when `url` is not given.
     * @returns {any}
     */
    get data() {
        const ret = wasm.__wbg_get_geojsonsourcedescription_data(this.__wbg_ptr);
        return ret;
    }
    /**
     * Whether to build a tiled spatial index (GeoJSON-VT) for large datasets.
     * @returns {boolean | undefined}
     */
    get tiled() {
        const ret = wasm.__wbg_get_geojsonsourcedescription_tiled(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret !== 0;
    }
    /**
     * @returns {string | undefined}
     */
    get type() {
        const ret = wasm.__wbg_get_geojsonsourcedescription_type(this.__wbg_ptr);
        let v1;
        if (ret[0] !== 0) {
            v1 = getStringFromWasm0(ret[0], ret[1]).slice();
            wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        }
        return v1;
    }
    /**
     * URL to fetch the GeoJSON document from. Mutually exclusive with `data`;
     * like the other sources, the URL is given directly at the top level.
     * @returns {string | undefined}
     */
    get url() {
        const ret = wasm.__wbg_get_geojsonsourcedescription_url(this.__wbg_ptr);
        let v1;
        if (ret[0] !== 0) {
            v1 = getStringFromWasm0(ret[0], ret[1]).slice();
            wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        }
        return v1;
    }
    /**
     * @param {string | null} [arg0]
     */
    set crs(arg0) {
        var ptr0 = isLikeNone(arg0) ? 0 : passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_geojsonsourcedescription_crs(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * Inline GeoJSON document (`FeatureCollection` / `Feature` / `Geometry`).
     * Used when `url` is not given.
     * @param {any} arg0
     */
    set data(arg0) {
        wasm.__wbg_set_geojsonsourcedescription_data(this.__wbg_ptr, arg0);
    }
    /**
     * Whether to build a tiled spatial index (GeoJSON-VT) for large datasets.
     * @param {boolean | null} [arg0]
     */
    set tiled(arg0) {
        wasm.__wbg_set_geojsonsourcedescription_tiled(this.__wbg_ptr, isLikeNone(arg0) ? 0xFFFFFF : arg0 ? 1 : 0);
    }
    /**
     * @param {string | null} [arg0]
     */
    set type(arg0) {
        var ptr0 = isLikeNone(arg0) ? 0 : passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_geojsonsourcedescription_type(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * URL to fetch the GeoJSON document from. Mutually exclusive with `data`;
     * like the other sources, the URL is given directly at the top level.
     * @param {string | null} [arg0]
     */
    set url(arg0) {
        var ptr0 = isLikeNone(arg0) ? 0 : passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_geojsonsourcedescription_url(this.__wbg_ptr, ptr0, len0);
    }
}
if (Symbol.dispose) GeoJsonSourceDescription.prototype[Symbol.dispose] = GeoJsonSourceDescription.prototype.free;

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
    static __wrap(ptr) {
        const obj = Object.create(Globe.prototype);
        obj.__wbg_ptr = ptr;
        GlobeFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
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

export class HillshadeBackfilledEvent {
    static __wrap(ptr) {
        const obj = Object.create(HillshadeBackfilledEvent.prototype);
        obj.__wbg_ptr = ptr;
        HillshadeBackfilledEventFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        HillshadeBackfilledEventFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_hillshadebackfilledevent_free(ptr, 0);
    }
    /**
     * @returns {number | undefined}
     */
    get edge_data_handle() {
        const ret = wasm.__wbg_get_hillshadebackfilledevent_edge_data_handle(this.__wbg_ptr);
        return ret === Number.MAX_SAFE_INTEGER ? undefined : ret;
    }
    /**
     * @returns {number}
     */
    get edge_direction() {
        const ret = wasm.__wbg_get_hillshadebackfilledevent_edge_direction(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number}
     */
    get gen() {
        const ret = wasm.__wbg_get_hillshadebackfilledevent_gen(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @returns {number}
     */
    get ind() {
        const ret = wasm.__wbg_get_hillshadebackfilledevent_ind(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @returns {number | undefined}
     */
    get original_handle() {
        const ret = wasm.__wbg_get_hillshadebackfilledevent_original_handle(this.__wbg_ptr);
        return ret === Number.MAX_SAFE_INTEGER ? undefined : ret;
    }
    /**
     * @returns {number | undefined}
     */
    get target_entity_gen() {
        const ret = wasm.__wbg_get_hillshadebackfilledevent_target_entity_gen(this.__wbg_ptr);
        return ret === Number.MAX_SAFE_INTEGER ? undefined : ret;
    }
    /**
     * @returns {number | undefined}
     */
    get target_entity_ind() {
        const ret = wasm.__wbg_get_hillshadebackfilledevent_target_entity_ind(this.__wbg_ptr);
        return ret === Number.MAX_SAFE_INTEGER ? undefined : ret;
    }
    /**
     * @returns {bigint}
     */
    get tile_handle() {
        const ret = wasm.__wbg_get_hillshadebackfilledevent_tile_handle(this.__wbg_ptr);
        return BigInt.asUintN(64, ret);
    }
    /**
     * @param {number} arg0
     */
    set edge_direction(arg0) {
        wasm.__wbg_set_hillshadebackfilledevent_edge_direction(this.__wbg_ptr, arg0);
    }
    /**
     * @param {number} arg0
     */
    set gen(arg0) {
        wasm.__wbg_set_hillshadebackfilledevent_gen(this.__wbg_ptr, arg0);
    }
    /**
     * @param {number} arg0
     */
    set ind(arg0) {
        wasm.__wbg_set_hillshadebackfilledevent_ind(this.__wbg_ptr, arg0);
    }
    /**
     * @param {bigint} arg0
     */
    set tile_handle(arg0) {
        wasm.__wbg_set_hillshadebackfilledevent_tile_handle(this.__wbg_ptr, arg0);
    }
}
if (Symbol.dispose) HillshadeBackfilledEvent.prototype[Symbol.dispose] = HillshadeBackfilledEvent.prototype.free;

/**
 * Hillshade render options for a `raster` layer. The elevation decoder is taken
 * from the referenced `raster-dem` source, not from here.
 */
export class HillshadeMaterial {
    static __wrap(ptr) {
        const obj = Object.create(HillshadeMaterial.prototype);
        obj.__wbg_ptr = ptr;
        HillshadeMaterialFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
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

/**
 * Minimal discriminator that reads only a layer's `type` tag, so `add_layer`
 * can route the payload to the matching source-based builder.
 */
export class LayerDescription {
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        LayerDescriptionFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_layerdescription_free(ptr, 0);
    }
    /**
     * @returns {string | undefined}
     */
    get type() {
        const ret = wasm.__wbg_get_layerdescription_type(this.__wbg_ptr);
        let v1;
        if (ret[0] !== 0) {
            v1 = getStringFromWasm0(ret[0], ret[1]).slice();
            wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        }
        return v1;
    }
    /**
     * @param {string | null} [arg0]
     */
    set type(arg0) {
        var ptr0 = isLikeNone(arg0) ? 0 : passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_layerdescription_type(this.__wbg_ptr, ptr0, len0);
    }
}
if (Symbol.dispose) LayerDescription.prototype[Symbol.dispose] = LayerDescription.prototype.free;

/**
 * Engine memory usage snapshot for diagnostics. Byte counts are `f64`
 * because JS has no u64.
 */
export class MemoryStats {
    static __wrap(ptr) {
        const obj = Object.create(MemoryStats.prototype);
        obj.__wbg_ptr = ptr;
        MemoryStatsFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        MemoryStatsFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_memorystats_free(ptr, 0);
    }
    /**
     * @returns {number | undefined}
     */
    get budgetBytes() {
        const ret = wasm.__wbg_get_memorystats_budgetBytes(this.__wbg_ptr);
        return ret[0] === 0 ? undefined : ret[1];
    }
    /**
     * @returns {number}
     */
    get bufferCount() {
        const ret = wasm.__wbg_get_memorystats_bufferCount(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @returns {number}
     */
    get bufferTotalBytes() {
        const ret = wasm.__wbg_get_memorystats_bufferTotalBytes(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number}
     */
    get evictedCount() {
        const ret = wasm.__wbg_get_memorystats_evictedCount(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number}
     */
    get externalBufferBytes() {
        const ret = wasm.__wbg_get_memorystats_externalBufferBytes(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number}
     */
    get externalCpuBytes() {
        const ret = wasm.__wbg_get_memorystats_externalCpuBytes(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number}
     */
    get fixedGpuBytes() {
        const ret = wasm.__wbg_get_memorystats_fixedGpuBytes(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number}
     */
    get gpuBytesEst() {
        const ret = wasm.__wbg_get_memorystats_gpuBytesEst(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number}
     */
    get reservedBytes() {
        const ret = wasm.__wbg_get_memorystats_reservedBytes(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number}
     */
    get retainedRaster() {
        const ret = wasm.__wbg_get_memorystats_retainedRaster(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @returns {number}
     */
    get retainedTerrain() {
        const ret = wasm.__wbg_get_memorystats_retainedTerrain(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @returns {number}
     */
    get retainedTiles3d() {
        const ret = wasm.__wbg_get_memorystats_retainedTiles3d(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @returns {number}
     */
    get retainedVector() {
        const ret = wasm.__wbg_get_memorystats_retainedVector(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @returns {number}
     */
    get sseMultiplier() {
        const ret = wasm.__wbg_get_memorystats_sseMultiplier(this.__wbg_ptr);
        return ret;
    }
}
if (Symbol.dispose) MemoryStats.prototype[Symbol.dispose] = MemoryStats.prototype.free;

export class Mesh {
    static __wrap(ptr) {
        const obj = Object.create(Mesh.prototype);
        obj.__wbg_ptr = ptr;
        MeshFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        MeshFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_mesh_free(ptr, 0);
    }
    /**
     * @returns {Aabb}
     */
    get aabb() {
        const ret = wasm.__wbg_get_mesh_aabb(this.__wbg_ptr);
        return Aabb.__wrap(ret);
    }
    /**
     * @returns {boolean}
     */
    get active() {
        const ret = wasm.__wbg_get_mesh_active(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * Quadrant bitmask to draw (`0` = whole tile); see `navara_mesh::Mesh`.
     * @returns {number}
     */
    get fill_quadrants() {
        const ret = wasm.__wbg_get_mesh_fill_quadrants(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number}
     */
    get indices() {
        const ret = wasm.__wbg_get_mesh_indices(this.__wbg_ptr);
        return ret;
    }
    /**
     * Per-vertex normals handle (terrain only).
     * @returns {number | undefined}
     */
    get normals() {
        const ret = wasm.__wbg_get_mesh_normals(this.__wbg_ptr);
        return ret === Number.MAX_SAFE_INTEGER ? undefined : ret;
    }
    /**
     * @returns {number}
     */
    get render_order() {
        const ret = wasm.__wbg_get_mesh_render_order(this.__wbg_ptr);
        return ret;
    }
    /**
     * Skirt indices handle.
     * @returns {number | undefined}
     */
    get skirt_indices() {
        const ret = wasm.__wbg_get_mesh_skirt_indices(this.__wbg_ptr);
        return ret === Number.MAX_SAFE_INTEGER ? undefined : ret;
    }
    /**
     * Skirt per-vertex normals handle.
     * @returns {number | undefined}
     */
    get skirt_normals() {
        const ret = wasm.__wbg_get_mesh_skirt_normals(this.__wbg_ptr);
        return ret === Number.MAX_SAFE_INTEGER ? undefined : ret;
    }
    /**
     * Skirt UVs handle.
     * @returns {number | undefined}
     */
    get skirt_uvs() {
        const ret = wasm.__wbg_get_mesh_skirt_uvs(this.__wbg_ptr);
        return ret === Number.MAX_SAFE_INTEGER ? undefined : ret;
    }
    /**
     * Skirt vertices handle (separate from main geometry for shadow/normal handling).
     * @returns {number | undefined}
     */
    get skirt_vertices() {
        const ret = wasm.__wbg_get_mesh_skirt_vertices(this.__wbg_ptr);
        return ret === Number.MAX_SAFE_INTEGER ? undefined : ret;
    }
    /**
     * @returns {number}
     */
    get uvs() {
        const ret = wasm.__wbg_get_mesh_uvs(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number}
     */
    get vertices() {
        const ret = wasm.__wbg_get_mesh_vertices(this.__wbg_ptr);
        return ret;
    }
    /**
     * Watermask handle (1 byte uniform or 65536 byte grid).
     * @returns {number | undefined}
     */
    get watermask() {
        const ret = wasm.__wbg_get_mesh_watermask(this.__wbg_ptr);
        return ret === Number.MAX_SAFE_INTEGER ? undefined : ret;
    }
    /**
     * @param {Aabb} arg0
     */
    set aabb(arg0) {
        _assertClass(arg0, Aabb);
        var ptr0 = arg0.__destroy_into_raw();
        wasm.__wbg_set_mesh_aabb(this.__wbg_ptr, ptr0);
    }
    /**
     * @param {boolean} arg0
     */
    set active(arg0) {
        wasm.__wbg_set_mesh_active(this.__wbg_ptr, arg0);
    }
    /**
     * Quadrant bitmask to draw (`0` = whole tile); see `navara_mesh::Mesh`.
     * @param {number} arg0
     */
    set fill_quadrants(arg0) {
        wasm.__wbg_set_mesh_fill_quadrants(this.__wbg_ptr, arg0);
    }
    /**
     * @param {number} arg0
     */
    set indices(arg0) {
        wasm.__wbg_set_mesh_indices(this.__wbg_ptr, arg0);
    }
    /**
     * Per-vertex normals handle (terrain only).
     * @param {number | null} [arg0]
     */
    set normals(arg0) {
        wasm.__wbg_set_mesh_normals(this.__wbg_ptr, isLikeNone(arg0) ? Number.MAX_SAFE_INTEGER : (arg0) >> 0);
    }
    /**
     * @param {number} arg0
     */
    set render_order(arg0) {
        wasm.__wbg_set_mesh_render_order(this.__wbg_ptr, arg0);
    }
    /**
     * Skirt indices handle.
     * @param {number | null} [arg0]
     */
    set skirt_indices(arg0) {
        wasm.__wbg_set_mesh_skirt_indices(this.__wbg_ptr, isLikeNone(arg0) ? Number.MAX_SAFE_INTEGER : (arg0) >> 0);
    }
    /**
     * Skirt per-vertex normals handle.
     * @param {number | null} [arg0]
     */
    set skirt_normals(arg0) {
        wasm.__wbg_set_mesh_skirt_normals(this.__wbg_ptr, isLikeNone(arg0) ? Number.MAX_SAFE_INTEGER : (arg0) >> 0);
    }
    /**
     * Skirt UVs handle.
     * @param {number | null} [arg0]
     */
    set skirt_uvs(arg0) {
        wasm.__wbg_set_mesh_skirt_uvs(this.__wbg_ptr, isLikeNone(arg0) ? Number.MAX_SAFE_INTEGER : (arg0) >> 0);
    }
    /**
     * Skirt vertices handle (separate from main geometry for shadow/normal handling).
     * @param {number | null} [arg0]
     */
    set skirt_vertices(arg0) {
        wasm.__wbg_set_mesh_skirt_vertices(this.__wbg_ptr, isLikeNone(arg0) ? Number.MAX_SAFE_INTEGER : (arg0) >> 0);
    }
    /**
     * @param {number} arg0
     */
    set uvs(arg0) {
        wasm.__wbg_set_mesh_uvs(this.__wbg_ptr, arg0);
    }
    /**
     * @param {number} arg0
     */
    set vertices(arg0) {
        wasm.__wbg_set_mesh_vertices(this.__wbg_ptr, arg0);
    }
    /**
     * Watermask handle (1 byte uniform or 65536 byte grid).
     * @param {number | null} [arg0]
     */
    set watermask(arg0) {
        wasm.__wbg_set_mesh_watermask(this.__wbg_ptr, isLikeNone(arg0) ? Number.MAX_SAFE_INTEGER : (arg0) >> 0);
    }
}
if (Symbol.dispose) Mesh.prototype[Symbol.dispose] = Mesh.prototype.free;

export class MeshAdded {
    static __wrap(ptr) {
        const obj = Object.create(MeshAdded.prototype);
        obj.__wbg_ptr = ptr;
        MeshAddedFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        MeshAddedFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_meshadded_free(ptr, 0);
    }
    /**
     * @returns {number}
     */
    get gen() {
        const ret = wasm.__wbg_get_meshadded_gen(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @returns {Globe}
     */
    get globe() {
        const ret = wasm.__wbg_get_meshadded_globe(this.__wbg_ptr);
        return Globe.__wrap(ret);
    }
    /**
     * @returns {number}
     */
    get ind() {
        const ret = wasm.__wbg_get_meshadded_ind(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @returns {RasterTileInternalMaterial}
     */
    get material() {
        const ret = wasm.__wbg_get_meshadded_material(this.__wbg_ptr);
        return RasterTileInternalMaterial.__wrap(ret);
    }
    /**
     * @returns {Mesh}
     */
    get mesh() {
        const ret = wasm.__wbg_get_meshadded_mesh(this.__wbg_ptr);
        return Mesh.__wrap(ret);
    }
    /**
     * @returns {bigint | undefined}
     */
    get ready_parent_tile_handle() {
        const ret = wasm.__wbg_get_meshadded_ready_parent_tile_handle(this.__wbg_ptr);
        return ret[0] === 0 ? undefined : BigInt.asUintN(64, ret[1]);
    }
    /**
     * @returns {bigint}
     */
    get tile_handle() {
        const ret = wasm.__wbg_get_meshadded_tile_handle(this.__wbg_ptr);
        return BigInt.asUintN(64, ret);
    }
    /**
     * @returns {Transform}
     */
    get transform() {
        const ret = wasm.__wbg_get_meshadded_transform(this.__wbg_ptr);
        return Transform.__wrap(ret);
    }
    /**
     * @param {number} arg0
     */
    set gen(arg0) {
        wasm.__wbg_set_meshadded_gen(this.__wbg_ptr, arg0);
    }
    /**
     * @param {Globe} arg0
     */
    set globe(arg0) {
        _assertClass(arg0, Globe);
        var ptr0 = arg0.__destroy_into_raw();
        wasm.__wbg_set_meshadded_globe(this.__wbg_ptr, ptr0);
    }
    /**
     * @param {number} arg0
     */
    set ind(arg0) {
        wasm.__wbg_set_meshadded_ind(this.__wbg_ptr, arg0);
    }
    /**
     * @param {RasterTileInternalMaterial} arg0
     */
    set material(arg0) {
        _assertClass(arg0, RasterTileInternalMaterial);
        var ptr0 = arg0.__destroy_into_raw();
        wasm.__wbg_set_meshadded_material(this.__wbg_ptr, ptr0);
    }
    /**
     * @param {Mesh} arg0
     */
    set mesh(arg0) {
        _assertClass(arg0, Mesh);
        var ptr0 = arg0.__destroy_into_raw();
        wasm.__wbg_set_meshadded_mesh(this.__wbg_ptr, ptr0);
    }
    /**
     * @param {bigint | null} [arg0]
     */
    set ready_parent_tile_handle(arg0) {
        wasm.__wbg_set_meshadded_ready_parent_tile_handle(this.__wbg_ptr, !isLikeNone(arg0), isLikeNone(arg0) ? BigInt(0) : arg0);
    }
    /**
     * @param {bigint} arg0
     */
    set tile_handle(arg0) {
        wasm.__wbg_set_meshadded_tile_handle(this.__wbg_ptr, arg0);
    }
    /**
     * @param {Transform} arg0
     */
    set transform(arg0) {
        _assertClass(arg0, Transform);
        var ptr0 = arg0.__destroy_into_raw();
        wasm.__wbg_set_meshadded_transform(this.__wbg_ptr, ptr0);
    }
}
if (Symbol.dispose) MeshAdded.prototype[Symbol.dispose] = MeshAdded.prototype.free;

export class MeshChanged {
    static __wrap(ptr) {
        const obj = Object.create(MeshChanged.prototype);
        obj.__wbg_ptr = ptr;
        MeshChangedFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        MeshChangedFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_meshchanged_free(ptr, 0);
    }
    /**
     * @returns {number}
     */
    get gen() {
        const ret = wasm.__wbg_get_meshchanged_gen(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @returns {Globe}
     */
    get globe() {
        const ret = wasm.__wbg_get_meshchanged_globe(this.__wbg_ptr);
        return Globe.__wrap(ret);
    }
    /**
     * @returns {number}
     */
    get ind() {
        const ret = wasm.__wbg_get_meshchanged_ind(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @returns {RasterTileInternalMaterial}
     */
    get material() {
        const ret = wasm.__wbg_get_meshchanged_material(this.__wbg_ptr);
        return RasterTileInternalMaterial.__wrap(ret);
    }
    /**
     * @returns {Mesh}
     */
    get mesh() {
        const ret = wasm.__wbg_get_meshchanged_mesh(this.__wbg_ptr);
        return Mesh.__wrap(ret);
    }
    /**
     * @returns {bigint | undefined}
     */
    get ready_parent_tile_handle() {
        const ret = wasm.__wbg_get_meshchanged_ready_parent_tile_handle(this.__wbg_ptr);
        return ret[0] === 0 ? undefined : BigInt.asUintN(64, ret[1]);
    }
    /**
     * @param {number} arg0
     */
    set gen(arg0) {
        wasm.__wbg_set_meshchanged_gen(this.__wbg_ptr, arg0);
    }
    /**
     * @param {Globe} arg0
     */
    set globe(arg0) {
        _assertClass(arg0, Globe);
        var ptr0 = arg0.__destroy_into_raw();
        wasm.__wbg_set_meshchanged_globe(this.__wbg_ptr, ptr0);
    }
    /**
     * @param {number} arg0
     */
    set ind(arg0) {
        wasm.__wbg_set_meshchanged_ind(this.__wbg_ptr, arg0);
    }
    /**
     * @param {RasterTileInternalMaterial} arg0
     */
    set material(arg0) {
        _assertClass(arg0, RasterTileInternalMaterial);
        var ptr0 = arg0.__destroy_into_raw();
        wasm.__wbg_set_meshchanged_material(this.__wbg_ptr, ptr0);
    }
    /**
     * @param {Mesh} arg0
     */
    set mesh(arg0) {
        _assertClass(arg0, Mesh);
        var ptr0 = arg0.__destroy_into_raw();
        wasm.__wbg_set_meshchanged_mesh(this.__wbg_ptr, ptr0);
    }
    /**
     * @param {bigint | null} [arg0]
     */
    set ready_parent_tile_handle(arg0) {
        wasm.__wbg_set_meshchanged_ready_parent_tile_handle(this.__wbg_ptr, !isLikeNone(arg0), isLikeNone(arg0) ? BigInt(0) : arg0);
    }
}
if (Symbol.dispose) MeshChanged.prototype[Symbol.dispose] = MeshChanged.prototype.free;

/**
 * A live tile mesh whose geometry buffers were rewritten in place (see
 * `EventStore::mesh_geometry_replaced`): only the geometry changes.
 */
export class MeshGeometryReplaced {
    static __wrap(ptr) {
        const obj = Object.create(MeshGeometryReplaced.prototype);
        obj.__wbg_ptr = ptr;
        MeshGeometryReplacedFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        MeshGeometryReplacedFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_meshgeometryreplaced_free(ptr, 0);
    }
    /**
     * @returns {number}
     */
    get gen() {
        const ret = wasm.__wbg_get_meshgeometryreplaced_gen(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @returns {number}
     */
    get ind() {
        const ret = wasm.__wbg_get_meshgeometryreplaced_ind(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @returns {Mesh}
     */
    get mesh() {
        const ret = wasm.__wbg_get_meshgeometryreplaced_mesh(this.__wbg_ptr);
        return Mesh.__wrap(ret);
    }
    /**
     * @param {number} arg0
     */
    set gen(arg0) {
        wasm.__wbg_set_meshgeometryreplaced_gen(this.__wbg_ptr, arg0);
    }
    /**
     * @param {number} arg0
     */
    set ind(arg0) {
        wasm.__wbg_set_meshgeometryreplaced_ind(this.__wbg_ptr, arg0);
    }
    /**
     * @param {Mesh} arg0
     */
    set mesh(arg0) {
        _assertClass(arg0, Mesh);
        var ptr0 = arg0.__destroy_into_raw();
        wasm.__wbg_set_meshgeometryreplaced_mesh(this.__wbg_ptr, ptr0);
    }
}
if (Symbol.dispose) MeshGeometryReplaced.prototype[Symbol.dispose] = MeshGeometryReplaced.prototype.free;

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
    static __wrap(ptr) {
        const obj = Object.create(ModelMaterial.prototype);
        obj.__wbg_ptr = ptr;
        ModelMaterialFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
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

export class ModelMesh {
    static __wrap(ptr) {
        const obj = Object.create(ModelMesh.prototype);
        obj.__wbg_ptr = ptr;
        ModelMeshFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        ModelMeshFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_modelmesh_free(ptr, 0);
    }
    /**
     * @returns {Aabb}
     */
    get aabb() {
        const ret = wasm.__wbg_get_modelmesh_aabb(this.__wbg_ptr);
        return Aabb.__wrap(ret);
    }
    /**
     * @returns {boolean}
     */
    get active() {
        const ret = wasm.__wbg_get_modelmesh_active(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * @returns {number}
     */
    get batch_length() {
        const ret = wasm.__wbg_get_modelmesh_batch_length(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @returns {number | undefined}
     */
    get bin() {
        const ret = wasm.__wbg_get_modelmesh_bin(this.__wbg_ptr);
        return ret === Number.MAX_SAFE_INTEGER ? undefined : ret;
    }
    /**
     * @returns {TransferableModelGeometry}
     */
    get geometry() {
        const ret = wasm.__wbg_get_modelmesh_geometry(this.__wbg_ptr);
        return TransferableModelGeometry.__wrap(ret);
    }
    /**
     * @returns {ModelMaterial}
     */
    get material() {
        const ret = wasm.__wbg_get_modelmesh_material(this.__wbg_ptr);
        return ModelMaterial.__wrap(ret);
    }
    /**
     * @returns {Transform}
     */
    get transform() {
        const ret = wasm.__wbg_get_modelmesh_transform(this.__wbg_ptr);
        return Transform.__wrap(ret);
    }
    /**
     * @param {Aabb} arg0
     */
    set aabb(arg0) {
        _assertClass(arg0, Aabb);
        var ptr0 = arg0.__destroy_into_raw();
        wasm.__wbg_set_modelmesh_aabb(this.__wbg_ptr, ptr0);
    }
    /**
     * @param {boolean} arg0
     */
    set active(arg0) {
        wasm.__wbg_set_modelmesh_active(this.__wbg_ptr, arg0);
    }
    /**
     * @param {number} arg0
     */
    set batch_length(arg0) {
        wasm.__wbg_set_modelmesh_batch_length(this.__wbg_ptr, arg0);
    }
    /**
     * @param {number | null} [arg0]
     */
    set bin(arg0) {
        wasm.__wbg_set_modelmesh_bin(this.__wbg_ptr, isLikeNone(arg0) ? Number.MAX_SAFE_INTEGER : (arg0) >> 0);
    }
    /**
     * @param {TransferableModelGeometry} arg0
     */
    set geometry(arg0) {
        _assertClass(arg0, TransferableModelGeometry);
        var ptr0 = arg0.__destroy_into_raw();
        wasm.__wbg_set_modelmesh_geometry(this.__wbg_ptr, ptr0);
    }
    /**
     * @param {ModelMaterial} arg0
     */
    set material(arg0) {
        _assertClass(arg0, ModelMaterial);
        var ptr0 = arg0.__destroy_into_raw();
        wasm.__wbg_set_modelmesh_material(this.__wbg_ptr, ptr0);
    }
    /**
     * @param {Transform} arg0
     */
    set transform(arg0) {
        _assertClass(arg0, Transform);
        var ptr0 = arg0.__destroy_into_raw();
        wasm.__wbg_set_modelmesh_transform(this.__wbg_ptr, ptr0);
    }
}
if (Symbol.dispose) ModelMesh.prototype[Symbol.dispose] = ModelMesh.prototype.free;

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

export class ObjectTransformEvent {
    static __wrap(ptr) {
        const obj = Object.create(ObjectTransformEvent.prototype);
        obj.__wbg_ptr = ptr;
        ObjectTransformEventFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        ObjectTransformEventFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_objecttransformevent_free(ptr, 0);
    }
    /**
     * @returns {number}
     */
    get gen() {
        const ret = wasm.__wbg_get_objecttransformevent_gen(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @returns {number}
     */
    get ind() {
        const ret = wasm.__wbg_get_objecttransformevent_ind(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @returns {Transform}
     */
    get transform() {
        const ret = wasm.__wbg_get_objecttransformevent_transform(this.__wbg_ptr);
        return Transform.__wrap(ret);
    }
    /**
     * @param {number} arg0
     */
    set gen(arg0) {
        wasm.__wbg_set_objecttransformevent_gen(this.__wbg_ptr, arg0);
    }
    /**
     * @param {number} arg0
     */
    set ind(arg0) {
        wasm.__wbg_set_objecttransformevent_ind(this.__wbg_ptr, arg0);
    }
    /**
     * @param {Transform} arg0
     */
    set transform(arg0) {
        _assertClass(arg0, Transform);
        var ptr0 = arg0.__destroy_into_raw();
        wasm.__wbg_set_objecttransformevent_transform(this.__wbg_ptr, ptr0);
    }
}
if (Symbol.dispose) ObjectTransformEvent.prototype[Symbol.dispose] = ObjectTransformEvent.prototype.free;

export class OrthoCamTransform {
    static __wrap(ptr) {
        const obj = Object.create(OrthoCamTransform.prototype);
        obj.__wbg_ptr = ptr;
        OrthoCamTransformFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        OrthoCamTransformFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_orthocamtransform_free(ptr, 0);
    }
    /**
     * @returns {number}
     */
    get bottom() {
        const ret = wasm.__wbg_get_orthocamtransform_bottom(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number}
     */
    get left() {
        const ret = wasm.__wbg_get_orthocamtransform_left(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number}
     */
    get right() {
        const ret = wasm.__wbg_get_orthocamtransform_right(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number}
     */
    get top() {
        const ret = wasm.__wbg_get_orthocamtransform_top(this.__wbg_ptr);
        return ret;
    }
    /**
     * @param {number} left
     * @param {number} right
     * @param {number} top
     * @param {number} bottom
     */
    constructor(left, right, top, bottom) {
        const ret = wasm.orthocamtransform_new(left, right, top, bottom);
        this.__wbg_ptr = ret;
        OrthoCamTransformFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * @param {number} arg0
     */
    set bottom(arg0) {
        wasm.__wbg_set_orthocamtransform_bottom(this.__wbg_ptr, arg0);
    }
    /**
     * @param {number} arg0
     */
    set left(arg0) {
        wasm.__wbg_set_orthocamtransform_left(this.__wbg_ptr, arg0);
    }
    /**
     * @param {number} arg0
     */
    set right(arg0) {
        wasm.__wbg_set_orthocamtransform_right(this.__wbg_ptr, arg0);
    }
    /**
     * @param {number} arg0
     */
    set top(arg0) {
        wasm.__wbg_set_orthocamtransform_top(this.__wbg_ptr, arg0);
    }
}
if (Symbol.dispose) OrthoCamTransform.prototype[Symbol.dispose] = OrthoCamTransform.prototype.free;

export class OverscaledTileHandle {
    static __wrap(ptr) {
        const obj = Object.create(OverscaledTileHandle.prototype);
        obj.__wbg_ptr = ptr;
        OverscaledTileHandleFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
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

/**
 * Parameters sent to the MVT parse worker.
 *
 * `configs_json` is a JSON-encoded `Vec<LayerParseConfig>`; the pbf bytes live
 * in the BufferStore under `pbf_handle` and are resolved to a transferable
 * `Uint8Array` on the JS side before invoking the worker.
 */
export class ParseMvtTileParameters {
    static __wrap(ptr) {
        const obj = Object.create(ParseMvtTileParameters.prototype);
        obj.__wbg_ptr = ptr;
        ParseMvtTileParametersFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        ParseMvtTileParametersFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_parsemvttileparameters_free(ptr, 0);
    }
    /**
     * Tile-payload compression code (0 = none/plain); the worker decompresses.
     * @returns {number}
     */
    get compression() {
        const ret = wasm.__wbg_get_parsemvttileparameters_compression(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {string}
     */
    get configs_json() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.__wbg_get_parsemvttileparameters_configs_json(this.__wbg_ptr);
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
    get pbf_handle() {
        const ret = wasm.__wbg_get_parsemvttileparameters_pbf_handle(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {ExtentRadianF32 | undefined}
     */
    get tile_extent() {
        const ret = wasm.__wbg_get_parsemvttileparameters_tile_extent(this.__wbg_ptr);
        return ret === 0 ? undefined : ExtentRadianF32.__wrap(ret);
    }
    /**
     * @returns {number}
     */
    get x() {
        const ret = wasm.__wbg_get_parsemvttileparameters_x(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @returns {number}
     */
    get y() {
        const ret = wasm.__wbg_get_parsemvttileparameters_y(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @returns {number}
     */
    get z() {
        const ret = wasm.__wbg_get_parsemvttileparameters_z(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * Tile-payload compression code (0 = none/plain); the worker decompresses.
     * @param {number} arg0
     */
    set compression(arg0) {
        wasm.__wbg_set_parsemvttileparameters_compression(this.__wbg_ptr, arg0);
    }
    /**
     * @param {string} arg0
     */
    set configs_json(arg0) {
        const ptr0 = passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_parsemvttileparameters_configs_json(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @param {number} arg0
     */
    set pbf_handle(arg0) {
        wasm.__wbg_set_parsemvttileparameters_pbf_handle(this.__wbg_ptr, arg0);
    }
    /**
     * @param {ExtentRadianF32 | null} [arg0]
     */
    set tile_extent(arg0) {
        let ptr0 = 0;
        if (!isLikeNone(arg0)) {
            _assertClass(arg0, ExtentRadianF32);
            ptr0 = arg0.__destroy_into_raw();
        }
        wasm.__wbg_set_parsemvttileparameters_tile_extent(this.__wbg_ptr, ptr0);
    }
    /**
     * @param {number} arg0
     */
    set x(arg0) {
        wasm.__wbg_set_parsemvttileparameters_x(this.__wbg_ptr, arg0);
    }
    /**
     * @param {number} arg0
     */
    set y(arg0) {
        wasm.__wbg_set_parsemvttileparameters_y(this.__wbg_ptr, arg0);
    }
    /**
     * @param {number} arg0
     */
    set z(arg0) {
        wasm.__wbg_set_parsemvttileparameters_z(this.__wbg_ptr, arg0);
    }
}
if (Symbol.dispose) ParseMvtTileParameters.prototype[Symbol.dispose] = ParseMvtTileParameters.prototype.free;

/**
 * Parsed tile handed back from the worker round trip. The JS side stores the
 * four packed streams in the `BufferStore` (via `newBufferF64` etc., which
 * write straight into WASM memory) and passes only their handles here, along
 * with the structured-clone tile meta (per-group headers + per-layer property
 * tables).
 */
export class ParseMvtTileResult {
    static __wrap(ptr) {
        const obj = Object.create(ParseMvtTileResult.prototype);
        obj.__wbg_ptr = ptr;
        ParseMvtTileResultFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        ParseMvtTileResultFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_parsemvttileresult_free(ptr, 0);
    }
    /**
     * A zero-feature placeholder for completing the task lifecycle when the
     * JS side fails after dispatch (worker error, BufferStore exhaustion,
     * corrupt meta). The sentinel handles resolve to empty streams
     * (`take_streams` falls back to empty vecs; `BufferStore::remove` on an
     * absent handle is a no-op) and the empty meta finalizes zero groups, so
     * the delegator is torn down normally instead of staying `Requested`
     * forever and occupying one of the engine's pending parse slots.
     * @returns {ParseMvtTileResult}
     */
    static empty() {
        const ret = wasm.parsemvttileresult_empty();
        return ParseMvtTileResult.__wrap(ret);
    }
    /**
     * `meta` is a serialized `ParsedMvtTileMeta` produced by the parse worker;
     * it must describe the same streams the handles point to.
     * @param {number} f64_handle
     * @param {number} f32_handle
     * @param {number} u32_handle
     * @param {number} u8_handle
     * @param {any} meta
     */
    constructor(f64_handle, f32_handle, u32_handle, u8_handle, meta) {
        const ret = wasm.parsemvttileresult_new(f64_handle, f32_handle, u32_handle, u8_handle, meta);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        this.__wbg_ptr = ret[0];
        ParseMvtTileResultFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
}
if (Symbol.dispose) ParseMvtTileResult.prototype[Symbol.dispose] = ParseMvtTileResult.prototype.free;

export class Plane {
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
    static __wrap(ptr) {
        const obj = Object.create(PointMaterial.prototype);
        obj.__wbg_ptr = ptr;
        PointMaterialFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
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

export class PointMesh {
    static __wrap(ptr) {
        const obj = Object.create(PointMesh.prototype);
        obj.__wbg_ptr = ptr;
        PointMeshFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        PointMeshFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_pointmesh_free(ptr, 0);
    }
    /**
     * @returns {boolean}
     */
    get active() {
        const ret = wasm.__wbg_get_pointmesh_active(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * @returns {number}
     */
    get batch_length() {
        const ret = wasm.__wbg_get_pointmesh_batch_length(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @returns {TransferablePointGeometry}
     */
    get geometry() {
        const ret = wasm.__wbg_get_pointmesh_geometry(this.__wbg_ptr);
        return TransferablePointGeometry.__wrap(ret);
    }
    /**
     * @returns {PointMaterial}
     */
    get material() {
        const ret = wasm.__wbg_get_pointmesh_material(this.__wbg_ptr);
        return PointMaterial.__wrap(ret);
    }
    /**
     * @returns {Transform}
     */
    get transform() {
        const ret = wasm.__wbg_get_pointmesh_transform(this.__wbg_ptr);
        return Transform.__wrap(ret);
    }
    /**
     * @param {boolean} arg0
     */
    set active(arg0) {
        wasm.__wbg_set_pointmesh_active(this.__wbg_ptr, arg0);
    }
    /**
     * @param {number} arg0
     */
    set batch_length(arg0) {
        wasm.__wbg_set_pointmesh_batch_length(this.__wbg_ptr, arg0);
    }
    /**
     * @param {TransferablePointGeometry} arg0
     */
    set geometry(arg0) {
        _assertClass(arg0, TransferablePointGeometry);
        var ptr0 = arg0.__destroy_into_raw();
        wasm.__wbg_set_pointmesh_geometry(this.__wbg_ptr, ptr0);
    }
    /**
     * @param {PointMaterial} arg0
     */
    set material(arg0) {
        _assertClass(arg0, PointMaterial);
        var ptr0 = arg0.__destroy_into_raw();
        wasm.__wbg_set_pointmesh_material(this.__wbg_ptr, ptr0);
    }
    /**
     * @param {Transform} arg0
     */
    set transform(arg0) {
        _assertClass(arg0, Transform);
        var ptr0 = arg0.__destroy_into_raw();
        wasm.__wbg_set_pointmesh_transform(this.__wbg_ptr, ptr0);
    }
}
if (Symbol.dispose) PointMesh.prototype[Symbol.dispose] = PointMesh.prototype.free;

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
    static __wrap(ptr) {
        const obj = Object.create(PolygonMaterial.prototype);
        obj.__wbg_ptr = ptr;
        PolygonMaterialFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
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

export class PolygonMesh {
    static __wrap(ptr) {
        const obj = Object.create(PolygonMesh.prototype);
        obj.__wbg_ptr = ptr;
        PolygonMeshFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        PolygonMeshFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_polygonmesh_free(ptr, 0);
    }
    /**
     * @returns {boolean}
     */
    get active() {
        const ret = wasm.__wbg_get_polygonmesh_active(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * @returns {number}
     */
    get batch_length() {
        const ret = wasm.__wbg_get_polygonmesh_batch_length(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @returns {BoundingSphere | undefined}
     */
    get bounding_sphere() {
        const ret = wasm.__wbg_get_polygonmesh_bounding_sphere(this.__wbg_ptr);
        return ret === 0 ? undefined : BoundingSphere.__wrap(ret);
    }
    /**
     * @returns {TransferablePolygonGeometry}
     */
    get geometry() {
        const ret = wasm.__wbg_get_polygonmesh_geometry(this.__wbg_ptr);
        return TransferablePolygonGeometry.__wrap(ret);
    }
    /**
     * @returns {PolygonMaterial}
     */
    get material() {
        const ret = wasm.__wbg_get_polygonmesh_material(this.__wbg_ptr);
        return PolygonMaterial.__wrap(ret);
    }
    /**
     * @returns {TransferablePolygonOutlineGeometry | undefined}
     */
    get outline_geometry() {
        const ret = wasm.__wbg_get_polygonmesh_outline_geometry(this.__wbg_ptr);
        return ret === 0 ? undefined : TransferablePolygonOutlineGeometry.__wrap(ret);
    }
    /**
     * @returns {Transform}
     */
    get transform() {
        const ret = wasm.__wbg_get_polygonmesh_transform(this.__wbg_ptr);
        return Transform.__wrap(ret);
    }
    /**
     * @param {boolean} arg0
     */
    set active(arg0) {
        wasm.__wbg_set_polygonmesh_active(this.__wbg_ptr, arg0);
    }
    /**
     * @param {number} arg0
     */
    set batch_length(arg0) {
        wasm.__wbg_set_polygonmesh_batch_length(this.__wbg_ptr, arg0);
    }
    /**
     * @param {BoundingSphere | null} [arg0]
     */
    set bounding_sphere(arg0) {
        let ptr0 = 0;
        if (!isLikeNone(arg0)) {
            _assertClass(arg0, BoundingSphere);
            ptr0 = arg0.__destroy_into_raw();
        }
        wasm.__wbg_set_polygonmesh_bounding_sphere(this.__wbg_ptr, ptr0);
    }
    /**
     * @param {TransferablePolygonGeometry} arg0
     */
    set geometry(arg0) {
        _assertClass(arg0, TransferablePolygonGeometry);
        var ptr0 = arg0.__destroy_into_raw();
        wasm.__wbg_set_polygonmesh_geometry(this.__wbg_ptr, ptr0);
    }
    /**
     * @param {PolygonMaterial} arg0
     */
    set material(arg0) {
        _assertClass(arg0, PolygonMaterial);
        var ptr0 = arg0.__destroy_into_raw();
        wasm.__wbg_set_polygonmesh_material(this.__wbg_ptr, ptr0);
    }
    /**
     * @param {TransferablePolygonOutlineGeometry | null} [arg0]
     */
    set outline_geometry(arg0) {
        let ptr0 = 0;
        if (!isLikeNone(arg0)) {
            _assertClass(arg0, TransferablePolygonOutlineGeometry);
            ptr0 = arg0.__destroy_into_raw();
        }
        wasm.__wbg_set_polygonmesh_outline_geometry(this.__wbg_ptr, ptr0);
    }
    /**
     * @param {Transform} arg0
     */
    set transform(arg0) {
        _assertClass(arg0, Transform);
        var ptr0 = arg0.__destroy_into_raw();
        wasm.__wbg_set_polygonmesh_transform(this.__wbg_ptr, ptr0);
    }
}
if (Symbol.dispose) PolygonMesh.prototype[Symbol.dispose] = PolygonMesh.prototype.free;

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
    static __wrap(ptr) {
        const obj = Object.create(PolylineMaterial.prototype);
        obj.__wbg_ptr = ptr;
        PolylineMaterialFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
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

export class PolylineMesh {
    static __wrap(ptr) {
        const obj = Object.create(PolylineMesh.prototype);
        obj.__wbg_ptr = ptr;
        PolylineMeshFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        PolylineMeshFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_polylinemesh_free(ptr, 0);
    }
    /**
     * @returns {boolean}
     */
    get active() {
        const ret = wasm.__wbg_get_polylinemesh_active(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * @returns {number}
     */
    get batch_length() {
        const ret = wasm.__wbg_get_polylinemesh_batch_length(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @returns {TransferablePolylineGeometry}
     */
    get geometry() {
        const ret = wasm.__wbg_get_polylinemesh_geometry(this.__wbg_ptr);
        return TransferablePolylineGeometry.__wrap(ret);
    }
    /**
     * @returns {PolylineMaterial}
     */
    get material() {
        const ret = wasm.__wbg_get_polylinemesh_material(this.__wbg_ptr);
        return PolylineMaterial.__wrap(ret);
    }
    /**
     * Whether the polyline should be rendered as a texturized draped feature
     * @returns {boolean}
     */
    get should_be_texturized() {
        const ret = wasm.__wbg_get_polylinemesh_should_be_texturized(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * @returns {Transform}
     */
    get transform() {
        const ret = wasm.__wbg_get_polylinemesh_transform(this.__wbg_ptr);
        return Transform.__wrap(ret);
    }
    /**
     * @param {boolean} arg0
     */
    set active(arg0) {
        wasm.__wbg_set_polylinemesh_active(this.__wbg_ptr, arg0);
    }
    /**
     * @param {number} arg0
     */
    set batch_length(arg0) {
        wasm.__wbg_set_polylinemesh_batch_length(this.__wbg_ptr, arg0);
    }
    /**
     * @param {TransferablePolylineGeometry} arg0
     */
    set geometry(arg0) {
        _assertClass(arg0, TransferablePolylineGeometry);
        var ptr0 = arg0.__destroy_into_raw();
        wasm.__wbg_set_polylinemesh_geometry(this.__wbg_ptr, ptr0);
    }
    /**
     * @param {PolylineMaterial} arg0
     */
    set material(arg0) {
        _assertClass(arg0, PolylineMaterial);
        var ptr0 = arg0.__destroy_into_raw();
        wasm.__wbg_set_polylinemesh_material(this.__wbg_ptr, ptr0);
    }
    /**
     * Whether the polyline should be rendered as a texturized draped feature
     * @param {boolean} arg0
     */
    set should_be_texturized(arg0) {
        wasm.__wbg_set_polylinemesh_should_be_texturized(this.__wbg_ptr, arg0);
    }
    /**
     * @param {Transform} arg0
     */
    set transform(arg0) {
        _assertClass(arg0, Transform);
        var ptr0 = arg0.__destroy_into_raw();
        wasm.__wbg_set_polylinemesh_transform(this.__wbg_ptr, ptr0);
    }
}
if (Symbol.dispose) PolylineMesh.prototype[Symbol.dispose] = PolylineMesh.prototype.free;

export class QuantizedMeshSourceDescription {
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        QuantizedMeshSourceDescriptionFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_quantizedmeshsourcedescription_free(ptr, 0);
    }
    /**
     * @returns {boolean | undefined}
     */
    get geographic() {
        const ret = wasm.__wbg_get_quantizedmeshsourcedescription_geographic(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret !== 0;
    }
    /**
     * @returns {number | undefined}
     */
    get maxZoom() {
        const ret = wasm.__wbg_get_quantizedmeshsourcedescription_maxZoom(this.__wbg_ptr);
        return ret === Number.MAX_SAFE_INTEGER ? undefined : ret;
    }
    /**
     * @returns {number | undefined}
     */
    get minZoom() {
        const ret = wasm.__wbg_get_quantizedmeshsourcedescription_minZoom(this.__wbg_ptr);
        return ret === Number.MAX_SAFE_INTEGER ? undefined : ret;
    }
    /**
     * @returns {number | undefined}
     */
    get overscaledMaxZoom() {
        const ret = wasm.__wbg_get_quantizedmeshsourcedescription_overscaledMaxZoom(this.__wbg_ptr);
        return ret === Number.MAX_SAFE_INTEGER ? undefined : ret;
    }
    /**
     * @returns {boolean | undefined}
     */
    get requestVertexNormals() {
        const ret = wasm.__wbg_get_quantizedmeshsourcedescription_requestVertexNormals(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret !== 0;
    }
    /**
     * @returns {boolean | undefined}
     */
    get requestWaterMask() {
        const ret = wasm.__wbg_get_quantizedmeshsourcedescription_requestWaterMask(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret !== 0;
    }
    /**
     * @returns {boolean | undefined}
     */
    get tms() {
        const ret = wasm.__wbg_get_quantizedmeshsourcedescription_tms(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret !== 0;
    }
    /**
     * @returns {string | undefined}
     */
    get token() {
        const ret = wasm.__wbg_get_quantizedmeshsourcedescription_token(this.__wbg_ptr);
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
    get type() {
        const ret = wasm.__wbg_get_quantizedmeshsourcedescription_type(this.__wbg_ptr);
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
    get url() {
        const ret = wasm.__wbg_get_quantizedmeshsourcedescription_url(this.__wbg_ptr);
        let v1;
        if (ret[0] !== 0) {
            v1 = getStringFromWasm0(ret[0], ret[1]).slice();
            wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        }
        return v1;
    }
    /**
     * @param {boolean | null} [arg0]
     */
    set geographic(arg0) {
        wasm.__wbg_set_quantizedmeshsourcedescription_geographic(this.__wbg_ptr, isLikeNone(arg0) ? 0xFFFFFF : arg0 ? 1 : 0);
    }
    /**
     * @param {number | null} [arg0]
     */
    set maxZoom(arg0) {
        wasm.__wbg_set_quantizedmeshsourcedescription_maxZoom(this.__wbg_ptr, isLikeNone(arg0) ? Number.MAX_SAFE_INTEGER : (arg0) >>> 0);
    }
    /**
     * @param {number | null} [arg0]
     */
    set minZoom(arg0) {
        wasm.__wbg_set_quantizedmeshsourcedescription_minZoom(this.__wbg_ptr, isLikeNone(arg0) ? Number.MAX_SAFE_INTEGER : (arg0) >>> 0);
    }
    /**
     * @param {number | null} [arg0]
     */
    set overscaledMaxZoom(arg0) {
        wasm.__wbg_set_quantizedmeshsourcedescription_overscaledMaxZoom(this.__wbg_ptr, isLikeNone(arg0) ? Number.MAX_SAFE_INTEGER : (arg0) >>> 0);
    }
    /**
     * @param {boolean | null} [arg0]
     */
    set requestVertexNormals(arg0) {
        wasm.__wbg_set_quantizedmeshsourcedescription_requestVertexNormals(this.__wbg_ptr, isLikeNone(arg0) ? 0xFFFFFF : arg0 ? 1 : 0);
    }
    /**
     * @param {boolean | null} [arg0]
     */
    set requestWaterMask(arg0) {
        wasm.__wbg_set_quantizedmeshsourcedescription_requestWaterMask(this.__wbg_ptr, isLikeNone(arg0) ? 0xFFFFFF : arg0 ? 1 : 0);
    }
    /**
     * @param {boolean | null} [arg0]
     */
    set tms(arg0) {
        wasm.__wbg_set_quantizedmeshsourcedescription_tms(this.__wbg_ptr, isLikeNone(arg0) ? 0xFFFFFF : arg0 ? 1 : 0);
    }
    /**
     * @param {string | null} [arg0]
     */
    set token(arg0) {
        var ptr0 = isLikeNone(arg0) ? 0 : passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_quantizedmeshsourcedescription_token(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @param {string | null} [arg0]
     */
    set type(arg0) {
        var ptr0 = isLikeNone(arg0) ? 0 : passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_quantizedmeshsourcedescription_type(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @param {string | null} [arg0]
     */
    set url(arg0) {
        var ptr0 = isLikeNone(arg0) ? 0 : passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_quantizedmeshsourcedescription_url(this.__wbg_ptr, ptr0, len0);
    }
}
if (Symbol.dispose) QuantizedMeshSourceDescription.prototype[Symbol.dispose] = QuantizedMeshSourceDescription.prototype.free;

export class RasterDemSourceDescription {
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        RasterDemSourceDescriptionFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_rasterdemsourcedescription_free(ptr, 0);
    }
    /**
     * How to decode RGB channels into a height value.
     * @returns {ElevationDecoder | undefined}
     */
    get elevationDecoder() {
        const ret = wasm.__wbg_get_rasterdemsourcedescription_elevationDecoder(this.__wbg_ptr);
        return ret === 0 ? undefined : ElevationDecoder.__wrap(ret);
    }
    /**
     * @returns {number | undefined}
     */
    get maxZoom() {
        const ret = wasm.__wbg_get_rasterdemsourcedescription_maxZoom(this.__wbg_ptr);
        return ret === Number.MAX_SAFE_INTEGER ? undefined : ret;
    }
    /**
     * @returns {number | undefined}
     */
    get minZoom() {
        const ret = wasm.__wbg_get_rasterdemsourcedescription_minZoom(this.__wbg_ptr);
        return ret === Number.MAX_SAFE_INTEGER ? undefined : ret;
    }
    /**
     * @returns {number | undefined}
     */
    get overscaledMaxZoom() {
        const ret = wasm.__wbg_get_rasterdemsourcedescription_overscaledMaxZoom(this.__wbg_ptr);
        return ret === Number.MAX_SAFE_INTEGER ? undefined : ret;
    }
    /**
     * @returns {number | undefined}
     */
    get tileSize() {
        const ret = wasm.__wbg_get_rasterdemsourcedescription_tileSize(this.__wbg_ptr);
        return ret === Number.MAX_SAFE_INTEGER ? undefined : ret;
    }
    /**
     * @returns {boolean | undefined}
     */
    get tms() {
        const ret = wasm.__wbg_get_rasterdemsourcedescription_tms(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret !== 0;
    }
    /**
     * @returns {string | undefined}
     */
    get type() {
        const ret = wasm.__wbg_get_rasterdemsourcedescription_type(this.__wbg_ptr);
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
    get url() {
        const ret = wasm.__wbg_get_rasterdemsourcedescription_url(this.__wbg_ptr);
        let v1;
        if (ret[0] !== 0) {
            v1 = getStringFromWasm0(ret[0], ret[1]).slice();
            wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        }
        return v1;
    }
    /**
     * How to decode RGB channels into a height value.
     * @param {ElevationDecoder | null} [arg0]
     */
    set elevationDecoder(arg0) {
        let ptr0 = 0;
        if (!isLikeNone(arg0)) {
            _assertClass(arg0, ElevationDecoder);
            ptr0 = arg0.__destroy_into_raw();
        }
        wasm.__wbg_set_rasterdemsourcedescription_elevationDecoder(this.__wbg_ptr, ptr0);
    }
    /**
     * @param {number | null} [arg0]
     */
    set maxZoom(arg0) {
        wasm.__wbg_set_rasterdemsourcedescription_maxZoom(this.__wbg_ptr, isLikeNone(arg0) ? Number.MAX_SAFE_INTEGER : (arg0) >>> 0);
    }
    /**
     * @param {number | null} [arg0]
     */
    set minZoom(arg0) {
        wasm.__wbg_set_rasterdemsourcedescription_minZoom(this.__wbg_ptr, isLikeNone(arg0) ? Number.MAX_SAFE_INTEGER : (arg0) >>> 0);
    }
    /**
     * @param {number | null} [arg0]
     */
    set overscaledMaxZoom(arg0) {
        wasm.__wbg_set_rasterdemsourcedescription_overscaledMaxZoom(this.__wbg_ptr, isLikeNone(arg0) ? Number.MAX_SAFE_INTEGER : (arg0) >>> 0);
    }
    /**
     * @param {number | null} [arg0]
     */
    set tileSize(arg0) {
        wasm.__wbg_set_rasterdemsourcedescription_tileSize(this.__wbg_ptr, isLikeNone(arg0) ? Number.MAX_SAFE_INTEGER : (arg0) >>> 0);
    }
    /**
     * @param {boolean | null} [arg0]
     */
    set tms(arg0) {
        wasm.__wbg_set_rasterdemsourcedescription_tms(this.__wbg_ptr, isLikeNone(arg0) ? 0xFFFFFF : arg0 ? 1 : 0);
    }
    /**
     * @param {string | null} [arg0]
     */
    set type(arg0) {
        var ptr0 = isLikeNone(arg0) ? 0 : passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_rasterdemsourcedescription_type(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @param {string | null} [arg0]
     */
    set url(arg0) {
        var ptr0 = isLikeNone(arg0) ? 0 : passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_rasterdemsourcedescription_url(this.__wbg_ptr, ptr0, len0);
    }
}
if (Symbol.dispose) RasterDemSourceDescription.prototype[Symbol.dispose] = RasterDemSourceDescription.prototype.free;

/**
 * A `raster` layer renders a `raster-tile` (imagery) or `raster-dem` source.
 * For a `raster-dem` source it can additionally render hillshade / elevation
 * heatmap by decoding the same tiles.
 */
export class RasterLayerDescription {
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        RasterLayerDescriptionFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_rasterlayerdescription_free(ptr, 0);
    }
    /**
     * @returns {ElevationHeatmapMaterial | undefined}
     */
    get elevationHeatmap() {
        const ret = wasm.__wbg_get_rasterlayerdescription_elevationHeatmap(this.__wbg_ptr);
        return ret === 0 ? undefined : ElevationHeatmapMaterial.__wrap(ret);
    }
    /**
     * @returns {HillshadeMaterial | undefined}
     */
    get hillshade() {
        const ret = wasm.__wbg_get_rasterlayerdescription_hillshade(this.__wbg_ptr);
        return ret === 0 ? undefined : HillshadeMaterial.__wrap(ret);
    }
    /**
     * Imagery rendering options for the raster texture. Parallel to `hillshade`
     * and `elevationHeatmap`; `show`/`color`/etc. apply only to the imagery.
     * @returns {RasterMaterial | undefined}
     */
    get raster() {
        const ret = wasm.__wbg_get_rasterlayerdescription_raster(this.__wbg_ptr);
        return ret === 0 ? undefined : RasterMaterial.__wrap(ret);
    }
    /**
     * @returns {string | undefined}
     */
    get source() {
        const ret = wasm.__wbg_get_rasterlayerdescription_source(this.__wbg_ptr);
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
    get type() {
        const ret = wasm.__wbg_get_rasterlayerdescription_type(this.__wbg_ptr);
        let v1;
        if (ret[0] !== 0) {
            v1 = getStringFromWasm0(ret[0], ret[1]).slice();
            wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        }
        return v1;
    }
    /**
     * @param {ElevationHeatmapMaterial | null} [arg0]
     */
    set elevationHeatmap(arg0) {
        let ptr0 = 0;
        if (!isLikeNone(arg0)) {
            _assertClass(arg0, ElevationHeatmapMaterial);
            ptr0 = arg0.__destroy_into_raw();
        }
        wasm.__wbg_set_rasterlayerdescription_elevationHeatmap(this.__wbg_ptr, ptr0);
    }
    /**
     * @param {HillshadeMaterial | null} [arg0]
     */
    set hillshade(arg0) {
        let ptr0 = 0;
        if (!isLikeNone(arg0)) {
            _assertClass(arg0, HillshadeMaterial);
            ptr0 = arg0.__destroy_into_raw();
        }
        wasm.__wbg_set_rasterlayerdescription_hillshade(this.__wbg_ptr, ptr0);
    }
    /**
     * Imagery rendering options for the raster texture. Parallel to `hillshade`
     * and `elevationHeatmap`; `show`/`color`/etc. apply only to the imagery.
     * @param {RasterMaterial | null} [arg0]
     */
    set raster(arg0) {
        let ptr0 = 0;
        if (!isLikeNone(arg0)) {
            _assertClass(arg0, RasterMaterial);
            ptr0 = arg0.__destroy_into_raw();
        }
        wasm.__wbg_set_rasterlayerdescription_raster(this.__wbg_ptr, ptr0);
    }
    /**
     * @param {string | null} [arg0]
     */
    set source(arg0) {
        var ptr0 = isLikeNone(arg0) ? 0 : passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_rasterlayerdescription_source(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @param {string | null} [arg0]
     */
    set type(arg0) {
        var ptr0 = isLikeNone(arg0) ? 0 : passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_rasterlayerdescription_type(this.__wbg_ptr, ptr0, len0);
    }
}
if (Symbol.dispose) RasterLayerDescription.prototype[Symbol.dispose] = RasterLayerDescription.prototype.free;

/**
 * Render-only appearance for a `raster` layer's imagery. All fetch/tiling
 * config lives on the referenced `Source`; only display fields are carried
 * here. Parallel to [`HillshadeMaterial`] / [`ElevationHeatmapMaterial`].
 */
export class RasterMaterial {
    static __wrap(ptr) {
        const obj = Object.create(RasterMaterial.prototype);
        obj.__wbg_ptr = ptr;
        RasterMaterialFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
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
    static __wrap(ptr) {
        const obj = Object.create(RasterTileInternalMaterial.prototype);
        obj.__wbg_ptr = ptr;
        RasterTileInternalMaterialFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
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

export class RasterTileSourceDescription {
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        RasterTileSourceDescriptionFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_rastertilesourcedescription_free(ptr, 0);
    }
    /**
     * @returns {number | undefined}
     */
    get maxZoom() {
        const ret = wasm.__wbg_get_rastertilesourcedescription_maxZoom(this.__wbg_ptr);
        return ret === Number.MAX_SAFE_INTEGER ? undefined : ret;
    }
    /**
     * @returns {number | undefined}
     */
    get minZoom() {
        const ret = wasm.__wbg_get_rastertilesourcedescription_minZoom(this.__wbg_ptr);
        return ret === Number.MAX_SAFE_INTEGER ? undefined : ret;
    }
    /**
     * @returns {number | undefined}
     */
    get overscaledMaxZoom() {
        const ret = wasm.__wbg_get_rastertilesourcedescription_overscaledMaxZoom(this.__wbg_ptr);
        return ret === Number.MAX_SAFE_INTEGER ? undefined : ret;
    }
    /**
     * @returns {boolean | undefined}
     */
    get tms() {
        const ret = wasm.__wbg_get_rastertilesourcedescription_tms(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret !== 0;
    }
    /**
     * @returns {string | undefined}
     */
    get type() {
        const ret = wasm.__wbg_get_rastertilesourcedescription_type(this.__wbg_ptr);
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
    get url() {
        const ret = wasm.__wbg_get_rastertilesourcedescription_url(this.__wbg_ptr);
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
    set maxZoom(arg0) {
        wasm.__wbg_set_rastertilesourcedescription_maxZoom(this.__wbg_ptr, isLikeNone(arg0) ? Number.MAX_SAFE_INTEGER : (arg0) >>> 0);
    }
    /**
     * @param {number | null} [arg0]
     */
    set minZoom(arg0) {
        wasm.__wbg_set_rastertilesourcedescription_minZoom(this.__wbg_ptr, isLikeNone(arg0) ? Number.MAX_SAFE_INTEGER : (arg0) >>> 0);
    }
    /**
     * @param {number | null} [arg0]
     */
    set overscaledMaxZoom(arg0) {
        wasm.__wbg_set_rastertilesourcedescription_overscaledMaxZoom(this.__wbg_ptr, isLikeNone(arg0) ? Number.MAX_SAFE_INTEGER : (arg0) >>> 0);
    }
    /**
     * @param {boolean | null} [arg0]
     */
    set tms(arg0) {
        wasm.__wbg_set_rastertilesourcedescription_tms(this.__wbg_ptr, isLikeNone(arg0) ? 0xFFFFFF : arg0 ? 1 : 0);
    }
    /**
     * @param {string | null} [arg0]
     */
    set type(arg0) {
        var ptr0 = isLikeNone(arg0) ? 0 : passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_rastertilesourcedescription_type(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @param {string | null} [arg0]
     */
    set url(arg0) {
        var ptr0 = isLikeNone(arg0) ? 0 : passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_rastertilesourcedescription_url(this.__wbg_ptr, ptr0, len0);
    }
}
if (Symbol.dispose) RasterTileSourceDescription.prototype[Symbol.dispose] = RasterTileSourceDescription.prototype.free;

/**
 * One WebMercator raster tile to bake into a layer's drape render target (one per
 * overlapping WM tile per baked layer). `layer_ordinal` pairs the entry with the k-th
 * baked composite slot; `fragment_ind`/`fragment_gen` identify the loaded texture
 * fragment (the web derives its `loadedTexs` key, `${ind}_${gen}`, from them);
 * `uv_offset`/`uv_scale` place this tile into the terrain tile's `[0, 1]` UV for the
 * bake camera; `reproject_terrain_lat` is `[south, north]` (radians) on Geographic
 * terrain (Mercator reprojection) or empty on WebMercator terrain.
 */
export class RasterTileState {
    static __wrap(ptr) {
        const obj = Object.create(RasterTileState.prototype);
        obj.__wbg_ptr = ptr;
        RasterTileStateFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        RasterTileStateFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_rastertilestate_free(ptr, 0);
    }
    /**
     * @returns {number}
     */
    get fragment_gen() {
        const ret = wasm.__wbg_get_rastertilestate_fragment_gen(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @returns {number}
     */
    get fragment_ind() {
        const ret = wasm.__wbg_get_rastertilestate_fragment_ind(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @returns {number}
     */
    get layer_ordinal() {
        const ret = wasm.__wbg_get_rastertilestate_layer_ordinal(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @returns {Float32Array}
     */
    get reproject_terrain_lat() {
        const ret = wasm.__wbg_get_rastertilestate_reproject_terrain_lat(this.__wbg_ptr);
        var v1 = getArrayF32FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v1;
    }
    /**
     * @returns {Float32Array}
     */
    get uv_offset() {
        const ret = wasm.__wbg_get_rastertilestate_uv_offset(this.__wbg_ptr);
        var v1 = getArrayF32FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v1;
    }
    /**
     * @returns {Float32Array}
     */
    get uv_scale() {
        const ret = wasm.__wbg_get_rastertilestate_uv_scale(this.__wbg_ptr);
        var v1 = getArrayF32FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v1;
    }
    /**
     * @param {number} arg0
     */
    set fragment_gen(arg0) {
        wasm.__wbg_set_rastertilestate_fragment_gen(this.__wbg_ptr, arg0);
    }
    /**
     * @param {number} arg0
     */
    set fragment_ind(arg0) {
        wasm.__wbg_set_rastertilestate_fragment_ind(this.__wbg_ptr, arg0);
    }
    /**
     * @param {number} arg0
     */
    set layer_ordinal(arg0) {
        wasm.__wbg_set_rastertilestate_layer_ordinal(this.__wbg_ptr, arg0);
    }
    /**
     * @param {Float32Array} arg0
     */
    set reproject_terrain_lat(arg0) {
        const ptr0 = passArrayF32ToWasm0(arg0, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_rastertilestate_reproject_terrain_lat(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @param {Float32Array} arg0
     */
    set uv_offset(arg0) {
        const ptr0 = passArrayF32ToWasm0(arg0, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_rastertilestate_uv_offset(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @param {Float32Array} arg0
     */
    set uv_scale(arg0) {
        const ptr0 = passArrayF32ToWasm0(arg0, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_rastertilestate_uv_scale(this.__wbg_ptr, ptr0, len0);
    }
}
if (Symbol.dispose) RasterTileState.prototype[Symbol.dispose] = RasterTileState.prototype.free;

export class Ray {
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

/**
 * This is used to share the entity id between WASM and client.
 * You can reconstruct Bevy Entity by `Entity:from_bits`.
 */
export class ReconstructableEntity {
    static __wrap(ptr) {
        const obj = Object.create(ReconstructableEntity.prototype);
        obj.__wbg_ptr = ptr;
        ReconstructableEntityFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        ReconstructableEntityFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_reconstructableentity_free(ptr, 0);
    }
    /**
     * @returns {bigint}
     */
    get 0() {
        const ret = wasm.__wbg_get_reconstructableentity_0(this.__wbg_ptr);
        return BigInt.asUintN(64, ret);
    }
    /**
     * @param {bigint} arg0
     */
    set 0(arg0) {
        wasm.__wbg_set_reconstructableentity_0(this.__wbg_ptr, arg0);
    }
}
if (Symbol.dispose) ReconstructableEntity.prototype[Symbol.dispose] = ReconstructableEntity.prototype.free;

export class RenderableFeature {
    static __wrap(ptr) {
        const obj = Object.create(RenderableFeature.prototype);
        obj.__wbg_ptr = ptr;
        RenderableFeatureFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        RenderableFeatureFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_renderablefeature_free(ptr, 0);
    }
    /**
     * @returns {BillboardMesh | undefined}
     */
    get billboard() {
        const ret = wasm.__wbg_get_renderablefeature_billboard(this.__wbg_ptr);
        return ret === 0 ? undefined : BillboardMesh.__wrap(ret);
    }
    /**
     * @returns {ModelMesh | undefined}
     */
    get model() {
        const ret = wasm.__wbg_get_renderablefeature_model(this.__wbg_ptr);
        return ret === 0 ? undefined : ModelMesh.__wrap(ret);
    }
    /**
     * @returns {PointMesh | undefined}
     */
    get point() {
        const ret = wasm.__wbg_get_renderablefeature_point(this.__wbg_ptr);
        return ret === 0 ? undefined : PointMesh.__wrap(ret);
    }
    /**
     * @returns {PolygonMesh | undefined}
     */
    get polygon() {
        const ret = wasm.__wbg_get_renderablefeature_polygon(this.__wbg_ptr);
        return ret === 0 ? undefined : PolygonMesh.__wrap(ret);
    }
    /**
     * @returns {PolylineMesh | undefined}
     */
    get polyline() {
        const ret = wasm.__wbg_get_renderablefeature_polyline(this.__wbg_ptr);
        return ret === 0 ? undefined : PolylineMesh.__wrap(ret);
    }
    /**
     * @returns {TextMesh | undefined}
     */
    get text() {
        const ret = wasm.__wbg_get_renderablefeature_text(this.__wbg_ptr);
        return ret === 0 ? undefined : TextMesh.__wrap(ret);
    }
    /**
     * @param {BillboardMesh | null} [arg0]
     */
    set billboard(arg0) {
        let ptr0 = 0;
        if (!isLikeNone(arg0)) {
            _assertClass(arg0, BillboardMesh);
            ptr0 = arg0.__destroy_into_raw();
        }
        wasm.__wbg_set_renderablefeature_billboard(this.__wbg_ptr, ptr0);
    }
    /**
     * @param {ModelMesh | null} [arg0]
     */
    set model(arg0) {
        let ptr0 = 0;
        if (!isLikeNone(arg0)) {
            _assertClass(arg0, ModelMesh);
            ptr0 = arg0.__destroy_into_raw();
        }
        wasm.__wbg_set_renderablefeature_model(this.__wbg_ptr, ptr0);
    }
    /**
     * @param {PointMesh | null} [arg0]
     */
    set point(arg0) {
        let ptr0 = 0;
        if (!isLikeNone(arg0)) {
            _assertClass(arg0, PointMesh);
            ptr0 = arg0.__destroy_into_raw();
        }
        wasm.__wbg_set_renderablefeature_point(this.__wbg_ptr, ptr0);
    }
    /**
     * @param {PolygonMesh | null} [arg0]
     */
    set polygon(arg0) {
        let ptr0 = 0;
        if (!isLikeNone(arg0)) {
            _assertClass(arg0, PolygonMesh);
            ptr0 = arg0.__destroy_into_raw();
        }
        wasm.__wbg_set_renderablefeature_polygon(this.__wbg_ptr, ptr0);
    }
    /**
     * @param {PolylineMesh | null} [arg0]
     */
    set polyline(arg0) {
        let ptr0 = 0;
        if (!isLikeNone(arg0)) {
            _assertClass(arg0, PolylineMesh);
            ptr0 = arg0.__destroy_into_raw();
        }
        wasm.__wbg_set_renderablefeature_polyline(this.__wbg_ptr, ptr0);
    }
    /**
     * @param {TextMesh | null} [arg0]
     */
    set text(arg0) {
        let ptr0 = 0;
        if (!isLikeNone(arg0)) {
            _assertClass(arg0, TextMesh);
            ptr0 = arg0.__destroy_into_raw();
        }
        wasm.__wbg_set_renderablefeature_text(this.__wbg_ptr, ptr0);
    }
}
if (Symbol.dispose) RenderableFeature.prototype[Symbol.dispose] = RenderableFeature.prototype.free;

export class RenderableFeatureAddedEvent {
    static __wrap(ptr) {
        const obj = Object.create(RenderableFeatureAddedEvent.prototype);
        obj.__wbg_ptr = ptr;
        RenderableFeatureAddedEventFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        RenderableFeatureAddedEventFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_renderablefeatureaddedevent_free(ptr, 0);
    }
    /**
     * @returns {bigint}
     */
    get bits() {
        const ret = wasm.__wbg_get_renderablefeatureaddedevent_bits(this.__wbg_ptr);
        return BigInt.asUintN(64, ret);
    }
    /**
     * @returns {RenderableFeature}
     */
    get feature() {
        const ret = wasm.__wbg_get_renderablefeatureaddedevent_feature(this.__wbg_ptr);
        return RenderableFeature.__wrap(ret);
    }
    /**
     * @returns {number}
     */
    get gen() {
        const ret = wasm.__wbg_get_renderablefeatureaddedevent_gen(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @returns {number}
     */
    get ind() {
        const ret = wasm.__wbg_get_renderablefeatureaddedevent_ind(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @returns {string}
     */
    get layer_id() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.__wbg_get_renderablefeatureaddedevent_layer_id(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * @returns {OverscaledTileHandle | undefined}
     */
    get overscaled_tile_handle() {
        const ret = wasm.__wbg_get_renderablefeatureaddedevent_overscaled_tile_handle(this.__wbg_ptr);
        return ret === 0 ? undefined : OverscaledTileHandle.__wrap(ret);
    }
    /**
     * @param {bigint} arg0
     */
    set bits(arg0) {
        wasm.__wbg_set_renderablefeatureaddedevent_bits(this.__wbg_ptr, arg0);
    }
    /**
     * @param {RenderableFeature} arg0
     */
    set feature(arg0) {
        _assertClass(arg0, RenderableFeature);
        var ptr0 = arg0.__destroy_into_raw();
        wasm.__wbg_set_renderablefeatureaddedevent_feature(this.__wbg_ptr, ptr0);
    }
    /**
     * @param {number} arg0
     */
    set gen(arg0) {
        wasm.__wbg_set_renderablefeatureaddedevent_gen(this.__wbg_ptr, arg0);
    }
    /**
     * @param {number} arg0
     */
    set ind(arg0) {
        wasm.__wbg_set_renderablefeatureaddedevent_ind(this.__wbg_ptr, arg0);
    }
    /**
     * @param {string} arg0
     */
    set layer_id(arg0) {
        const ptr0 = passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_renderablefeatureaddedevent_layer_id(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @param {OverscaledTileHandle | null} [arg0]
     */
    set overscaled_tile_handle(arg0) {
        let ptr0 = 0;
        if (!isLikeNone(arg0)) {
            _assertClass(arg0, OverscaledTileHandle);
            ptr0 = arg0.__destroy_into_raw();
        }
        wasm.__wbg_set_renderablefeatureaddedevent_overscaled_tile_handle(this.__wbg_ptr, ptr0);
    }
}
if (Symbol.dispose) RenderableFeatureAddedEvent.prototype[Symbol.dispose] = RenderableFeatureAddedEvent.prototype.free;

export class RenderableFeatureChangedEvent {
    static __wrap(ptr) {
        const obj = Object.create(RenderableFeatureChangedEvent.prototype);
        obj.__wbg_ptr = ptr;
        RenderableFeatureChangedEventFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        RenderableFeatureChangedEventFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_renderablefeaturechangedevent_free(ptr, 0);
    }
    /**
     * @returns {bigint}
     */
    get bits() {
        const ret = wasm.__wbg_get_renderablefeaturechangedevent_bits(this.__wbg_ptr);
        return BigInt.asUintN(64, ret);
    }
    /**
     * @returns {RenderableFeature}
     */
    get feature() {
        const ret = wasm.__wbg_get_renderablefeaturechangedevent_feature(this.__wbg_ptr);
        return RenderableFeature.__wrap(ret);
    }
    /**
     * @returns {number}
     */
    get gen() {
        const ret = wasm.__wbg_get_renderablefeaturechangedevent_gen(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @returns {number}
     */
    get ind() {
        const ret = wasm.__wbg_get_renderablefeaturechangedevent_ind(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @returns {string}
     */
    get layer_id() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.__wbg_get_renderablefeaturechangedevent_layer_id(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * @returns {OverscaledTileHandle | undefined}
     */
    get overscaled_tile_handle() {
        const ret = wasm.__wbg_get_renderablefeaturechangedevent_overscaled_tile_handle(this.__wbg_ptr);
        return ret === 0 ? undefined : OverscaledTileHandle.__wrap(ret);
    }
    /**
     * @param {bigint} arg0
     */
    set bits(arg0) {
        wasm.__wbg_set_renderablefeaturechangedevent_bits(this.__wbg_ptr, arg0);
    }
    /**
     * @param {RenderableFeature} arg0
     */
    set feature(arg0) {
        _assertClass(arg0, RenderableFeature);
        var ptr0 = arg0.__destroy_into_raw();
        wasm.__wbg_set_renderablefeaturechangedevent_feature(this.__wbg_ptr, ptr0);
    }
    /**
     * @param {number} arg0
     */
    set gen(arg0) {
        wasm.__wbg_set_renderablefeaturechangedevent_gen(this.__wbg_ptr, arg0);
    }
    /**
     * @param {number} arg0
     */
    set ind(arg0) {
        wasm.__wbg_set_renderablefeaturechangedevent_ind(this.__wbg_ptr, arg0);
    }
    /**
     * @param {string} arg0
     */
    set layer_id(arg0) {
        const ptr0 = passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_renderablefeaturechangedevent_layer_id(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @param {OverscaledTileHandle | null} [arg0]
     */
    set overscaled_tile_handle(arg0) {
        let ptr0 = 0;
        if (!isLikeNone(arg0)) {
            _assertClass(arg0, OverscaledTileHandle);
            ptr0 = arg0.__destroy_into_raw();
        }
        wasm.__wbg_set_renderablefeaturechangedevent_overscaled_tile_handle(this.__wbg_ptr, ptr0);
    }
}
if (Symbol.dispose) RenderableFeatureChangedEvent.prototype[Symbol.dispose] = RenderableFeatureChangedEvent.prototype.free;

export class RenderableFeatureRemovedEvent {
    static __wrap(ptr) {
        const obj = Object.create(RenderableFeatureRemovedEvent.prototype);
        obj.__wbg_ptr = ptr;
        RenderableFeatureRemovedEventFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        RenderableFeatureRemovedEventFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_renderablefeatureremovedevent_free(ptr, 0);
    }
    /**
     * @returns {bigint}
     */
    get bits() {
        const ret = wasm.__wbg_get_renderablefeatureremovedevent_bits(this.__wbg_ptr);
        return BigInt.asUintN(64, ret);
    }
    /**
     * @returns {number}
     */
    get gen() {
        const ret = wasm.__wbg_get_renderablefeatureremovedevent_gen(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @returns {number}
     */
    get ind() {
        const ret = wasm.__wbg_get_renderablefeatureremovedevent_ind(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @returns {string}
     */
    get layer_id() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.__wbg_get_renderablefeatureremovedevent_layer_id(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * @param {bigint} arg0
     */
    set bits(arg0) {
        wasm.__wbg_set_renderablefeatureremovedevent_bits(this.__wbg_ptr, arg0);
    }
    /**
     * @param {number} arg0
     */
    set gen(arg0) {
        wasm.__wbg_set_renderablefeatureremovedevent_gen(this.__wbg_ptr, arg0);
    }
    /**
     * @param {number} arg0
     */
    set ind(arg0) {
        wasm.__wbg_set_renderablefeatureremovedevent_ind(this.__wbg_ptr, arg0);
    }
    /**
     * @param {string} arg0
     */
    set layer_id(arg0) {
        const ptr0 = passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_renderablefeatureremovedevent_layer_id(this.__wbg_ptr, ptr0, len0);
    }
}
if (Symbol.dispose) RenderableFeatureRemovedEvent.prototype[Symbol.dispose] = RenderableFeatureRemovedEvent.prototype.free;

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

export class ReturnedTransferablePolygonBatchedFeature {
    static __wrap(ptr) {
        const obj = Object.create(ReturnedTransferablePolygonBatchedFeature.prototype);
        obj.__wbg_ptr = ptr;
        ReturnedTransferablePolygonBatchedFeatureFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        ReturnedTransferablePolygonBatchedFeatureFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_returnedtransferablepolygonbatchedfeature_free(ptr, 0);
    }
    /**
     * @returns {PolygonMaterial}
     */
    get material() {
        const ret = wasm.__wbg_get_returnedtransferablepolygonbatchedfeature_material(this.__wbg_ptr);
        return PolygonMaterial.__wrap(ret);
    }
    /**
     * @returns {CRS}
     */
    crs() {
        const ret = wasm.returnedtransferablepolygonbatchedfeature_crs(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number}
     */
    length() {
        const ret = wasm.returnedtransferablepolygonbatchedfeature_length(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @returns {Uint32Array}
     */
    transferBatchIds() {
        const ret = wasm.returnedtransferablepolygonbatchedfeature_transferBatchIds(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {Uint32Array}
     */
    transferBatchIndices() {
        const ret = wasm.returnedtransferablepolygonbatchedfeature_transferBatchIndices(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {Uint8Array}
     */
    transferExpectedWindingOrders() {
        const ret = wasm.returnedtransferablepolygonbatchedfeature_transferExpectedWindingOrders(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {Float64Array}
     */
    transferHoles() {
        const ret = wasm.returnedtransferablepolygonbatchedfeature_transferHoles(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {Uint32Array}
     */
    transferHolesBoundaries() {
        const ret = wasm.returnedtransferablepolygonbatchedfeature_transferHolesBoundaries(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {Uint32Array}
     */
    transferHolesSizes() {
        const ret = wasm.returnedtransferablepolygonbatchedfeature_transferHolesSizes(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {Uint32Array}
     */
    transferHolesTotalSizes() {
        const ret = wasm.returnedtransferablepolygonbatchedfeature_transferHolesTotalSizes(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {Float64Array}
     */
    transferOuterRing() {
        const ret = wasm.returnedtransferablepolygonbatchedfeature_transferOuterRing(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {Uint32Array}
     */
    transferOuterRingSizes() {
        const ret = wasm.returnedtransferablepolygonbatchedfeature_transferOuterRingSizes(this.__wbg_ptr);
        return ret;
    }
    /**
     * @param {PolygonMaterial} arg0
     */
    set material(arg0) {
        _assertClass(arg0, PolygonMaterial);
        var ptr0 = arg0.__destroy_into_raw();
        wasm.__wbg_set_returnedtransferablepolygonbatchedfeature_material(this.__wbg_ptr, ptr0);
    }
}
if (Symbol.dispose) ReturnedTransferablePolygonBatchedFeature.prototype[Symbol.dispose] = ReturnedTransferablePolygonBatchedFeature.prototype.free;

export class ReturnedTransferablePolylineBatchedFeature {
    static __wrap(ptr) {
        const obj = Object.create(ReturnedTransferablePolylineBatchedFeature.prototype);
        obj.__wbg_ptr = ptr;
        ReturnedTransferablePolylineBatchedFeatureFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        ReturnedTransferablePolylineBatchedFeatureFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_returnedtransferablepolylinebatchedfeature_free(ptr, 0);
    }
    /**
     * @returns {PolylineMaterial}
     */
    get material() {
        const ret = wasm.__wbg_get_returnedtransferablepolylinebatchedfeature_material(this.__wbg_ptr);
        return PolylineMaterial.__wrap(ret);
    }
    /**
     * @returns {CRS}
     */
    crs() {
        const ret = wasm.returnedtransferablepolylinebatchedfeature_crs(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number}
     */
    length() {
        const ret = wasm.returnedtransferablepolylinebatchedfeature_length(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @returns {Uint32Array}
     */
    transferBatchIds() {
        const ret = wasm.returnedtransferablepolylinebatchedfeature_transferBatchIds(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {Uint32Array}
     */
    transferBatchIndices() {
        const ret = wasm.returnedtransferablepolylinebatchedfeature_transferBatchIndices(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {Float64Array}
     */
    transferPoints() {
        const ret = wasm.returnedtransferablepolylinebatchedfeature_transferPoints(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {Uint32Array}
     */
    transferPointsSizes() {
        const ret = wasm.returnedtransferablepolylinebatchedfeature_transferPointsSizes(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {Uint8Array}
     */
    transferRingFlags() {
        const ret = wasm.returnedtransferablepolylinebatchedfeature_transferRingFlags(this.__wbg_ptr);
        return ret;
    }
    /**
     * @param {PolylineMaterial} arg0
     */
    set material(arg0) {
        _assertClass(arg0, PolylineMaterial);
        var ptr0 = arg0.__destroy_into_raw();
        wasm.__wbg_set_returnedtransferablepolylinebatchedfeature_material(this.__wbg_ptr, ptr0);
    }
}
if (Symbol.dispose) ReturnedTransferablePolylineBatchedFeature.prototype[Symbol.dispose] = ReturnedTransferablePolylineBatchedFeature.prototype.free;

/**
 * Re-extracts a source description's inline `data` field. `serde` skips it on
 * the typed source structs (it can be an arbitrary GeoJSON document), so the
 * geojson source builder reads it back through this shape.
 */
export class SourceData {
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        SourceDataFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_sourcedata_free(ptr, 0);
    }
    /**
     * @returns {any}
     */
    get data() {
        const ret = wasm.__wbg_get_sourcedata_data(this.__wbg_ptr);
        return ret;
    }
    /**
     * @param {any} arg0
     */
    set data(arg0) {
        wasm.__wbg_set_sourcedata_data(this.__wbg_ptr, arg0);
    }
}
if (Symbol.dispose) SourceData.prototype[Symbol.dispose] = SourceData.prototype.free;

/**
 * Discriminator used to read the `type` tag (and optional caller-provided `id`)
 * before dispatching.
 */
export class SourceDescription {
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        SourceDescriptionFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_sourcedescription_free(ptr, 0);
    }
    /**
     * Optional caller-provided source id. When omitted, a random id is
     * generated. A duplicate id overrides the existing source (later wins).
     * @returns {string | undefined}
     */
    get id() {
        const ret = wasm.__wbg_get_sourcedescription_id(this.__wbg_ptr);
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
    get type() {
        const ret = wasm.__wbg_get_sourcedescription_type(this.__wbg_ptr);
        let v1;
        if (ret[0] !== 0) {
            v1 = getStringFromWasm0(ret[0], ret[1]).slice();
            wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        }
        return v1;
    }
    /**
     * Optional caller-provided source id. When omitted, a random id is
     * generated. A duplicate id overrides the existing source (later wins).
     * @param {string | null} [arg0]
     */
    set id(arg0) {
        var ptr0 = isLikeNone(arg0) ? 0 : passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_sourcedescription_id(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @param {string | null} [arg0]
     */
    set type(arg0) {
        var ptr0 = isLikeNone(arg0) ? 0 : passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_sourcedescription_type(this.__wbg_ptr, ptr0, len0);
    }
}
if (Symbol.dispose) SourceDescription.prototype[Symbol.dispose] = SourceDescription.prototype.free;

export class TerrainHeightRangeUpdatedEvent {
    static __wrap(ptr) {
        const obj = Object.create(TerrainHeightRangeUpdatedEvent.prototype);
        obj.__wbg_ptr = ptr;
        TerrainHeightRangeUpdatedEventFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        TerrainHeightRangeUpdatedEventFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_terrainheightrangeupdatedevent_free(ptr, 0);
    }
    /**
     * @returns {bigint}
     */
    get bits() {
        const ret = wasm.__wbg_get_terrainheightrangeupdatedevent_bits(this.__wbg_ptr);
        return BigInt.asUintN(64, ret);
    }
    /**
     * @returns {number}
     */
    get max() {
        const ret = wasm.__wbg_get_terrainheightrangeupdatedevent_max(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number}
     */
    get min() {
        const ret = wasm.__wbg_get_terrainheightrangeupdatedevent_min(this.__wbg_ptr);
        return ret;
    }
    /**
     * @param {bigint} arg0
     */
    set bits(arg0) {
        wasm.__wbg_set_terrainheightrangeupdatedevent_bits(this.__wbg_ptr, arg0);
    }
    /**
     * @param {number} arg0
     */
    set max(arg0) {
        wasm.__wbg_set_terrainheightrangeupdatedevent_max(this.__wbg_ptr, arg0);
    }
    /**
     * @param {number} arg0
     */
    set min(arg0) {
        wasm.__wbg_set_terrainheightrangeupdatedevent_min(this.__wbg_ptr, arg0);
    }
}
if (Symbol.dispose) TerrainHeightRangeUpdatedEvent.prototype[Symbol.dispose] = TerrainHeightRangeUpdatedEvent.prototype.free;

export class TerrainHeightUpdatedEvent {
    static __wrap(ptr) {
        const obj = Object.create(TerrainHeightUpdatedEvent.prototype);
        obj.__wbg_ptr = ptr;
        TerrainHeightUpdatedEventFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        TerrainHeightUpdatedEventFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_terrainheightupdatedevent_free(ptr, 0);
    }
    /**
     * @returns {bigint}
     */
    get bits() {
        const ret = wasm.__wbg_get_terrainheightupdatedevent_bits(this.__wbg_ptr);
        return BigInt.asUintN(64, ret);
    }
    /**
     * @returns {number}
     */
    get gen() {
        const ret = wasm.__wbg_get_terrainheightupdatedevent_gen(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @returns {number | undefined}
     */
    get height() {
        const ret = wasm.__wbg_get_terrainheightupdatedevent_height(this.__wbg_ptr);
        return ret[0] === 0 ? undefined : ret[1];
    }
    /**
     * @returns {number}
     */
    get ind() {
        const ret = wasm.__wbg_get_terrainheightupdatedevent_ind(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @returns {LLE}
     */
    get lle() {
        const ret = wasm.__wbg_get_terrainheightupdatedevent_lle(this.__wbg_ptr);
        return LLE.__wrap(ret);
    }
    /**
     * @param {bigint} arg0
     */
    set bits(arg0) {
        wasm.__wbg_set_terrainheightupdatedevent_bits(this.__wbg_ptr, arg0);
    }
    /**
     * @param {number} arg0
     */
    set gen(arg0) {
        wasm.__wbg_set_terrainheightupdatedevent_gen(this.__wbg_ptr, arg0);
    }
    /**
     * @param {number | null} [arg0]
     */
    set height(arg0) {
        wasm.__wbg_set_terrainheightupdatedevent_height(this.__wbg_ptr, !isLikeNone(arg0), isLikeNone(arg0) ? 0 : arg0);
    }
    /**
     * @param {number} arg0
     */
    set ind(arg0) {
        wasm.__wbg_set_terrainheightupdatedevent_ind(this.__wbg_ptr, arg0);
    }
    /**
     * @param {LLE} arg0
     */
    set lle(arg0) {
        _assertClass(arg0, LLE);
        var ptr0 = arg0.__destroy_into_raw();
        wasm.__wbg_set_terrainheightupdatedevent_lle(this.__wbg_ptr, ptr0);
    }
}
if (Symbol.dispose) TerrainHeightUpdatedEvent.prototype[Symbol.dispose] = TerrainHeightUpdatedEvent.prototype.free;

/**
 * Render-only appearance for a `terrain` layer's mesh, regardless of the
 * referenced source's data format (raster-dem, quantized-mesh, or the
 * source-less ellipsoid). All fetch/geometry config lives on the referenced
 * `Source`; the data format itself is carried by `TerrainDataType`.
 */
export class TerrainMaterial {
    static __wrap(ptr) {
        const obj = Object.create(TerrainMaterial.prototype);
        obj.__wbg_ptr = ptr;
        TerrainMaterialFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
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

/**
 * A `terrain` layer renders a `raster-dem` or `quantized-mesh`
 * source as the globe surface. Rendering options are uniform regardless of the
 * source's data format.
 */
export class TerrainSourceLayerDescription {
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        TerrainSourceLayerDescriptionFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_terrainsourcelayerdescription_free(ptr, 0);
    }
    /**
     * @returns {string | undefined}
     */
    get source() {
        const ret = wasm.__wbg_get_terrainsourcelayerdescription_source(this.__wbg_ptr);
        let v1;
        if (ret[0] !== 0) {
            v1 = getStringFromWasm0(ret[0], ret[1]).slice();
            wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        }
        return v1;
    }
    /**
     * Terrain mesh rendering options. Nested like the other layers' render
     * inputs (`raster`, `model`, ...); all fetch/geometry config lives on the
     * referenced source. A source-less terrain layer (a flat ellipsoid surface
     * to drape clamp-to-ground data on) is written with the `ellipsoid` key.
     * @returns {TerrainMaterial | undefined}
     */
    get terrain() {
        const ret = wasm.__wbg_get_terrainsourcelayerdescription_terrain(this.__wbg_ptr);
        return ret === 0 ? undefined : TerrainMaterial.__wrap(ret);
    }
    /**
     * @returns {string | undefined}
     */
    get type() {
        const ret = wasm.__wbg_get_terrainsourcelayerdescription_type(this.__wbg_ptr);
        let v1;
        if (ret[0] !== 0) {
            v1 = getStringFromWasm0(ret[0], ret[1]).slice();
            wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        }
        return v1;
    }
    /**
     * @param {string | null} [arg0]
     */
    set source(arg0) {
        var ptr0 = isLikeNone(arg0) ? 0 : passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_terrainsourcelayerdescription_source(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * Terrain mesh rendering options. Nested like the other layers' render
     * inputs (`raster`, `model`, ...); all fetch/geometry config lives on the
     * referenced source. A source-less terrain layer (a flat ellipsoid surface
     * to drape clamp-to-ground data on) is written with the `ellipsoid` key.
     * @param {TerrainMaterial | null} [arg0]
     */
    set terrain(arg0) {
        let ptr0 = 0;
        if (!isLikeNone(arg0)) {
            _assertClass(arg0, TerrainMaterial);
            ptr0 = arg0.__destroy_into_raw();
        }
        wasm.__wbg_set_terrainsourcelayerdescription_terrain(this.__wbg_ptr, ptr0);
    }
    /**
     * @param {string | null} [arg0]
     */
    set type(arg0) {
        var ptr0 = isLikeNone(arg0) ? 0 : passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_terrainsourcelayerdescription_type(this.__wbg_ptr, ptr0, len0);
    }
}
if (Symbol.dispose) TerrainSourceLayerDescription.prototype[Symbol.dispose] = TerrainSourceLayerDescription.prototype.free;

export class TextMaterial {
    static __wrap(ptr) {
        const obj = Object.create(TextMaterial.prototype);
        obj.__wbg_ptr = ptr;
        TextMaterialFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
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

export class TextMesh {
    static __wrap(ptr) {
        const obj = Object.create(TextMesh.prototype);
        obj.__wbg_ptr = ptr;
        TextMeshFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        TextMeshFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_textmesh_free(ptr, 0);
    }
    /**
     * @returns {boolean}
     */
    get active() {
        const ret = wasm.__wbg_get_textmesh_active(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * @returns {number}
     */
    get batch_length() {
        const ret = wasm.__wbg_get_textmesh_batch_length(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @returns {TransferablePointGeometry}
     */
    get geometry() {
        const ret = wasm.__wbg_get_textmesh_geometry(this.__wbg_ptr);
        return TransferablePointGeometry.__wrap(ret);
    }
    /**
     * @returns {TextMaterial}
     */
    get material() {
        const ret = wasm.__wbg_get_textmesh_material(this.__wbg_ptr);
        return TextMaterial.__wrap(ret);
    }
    /**
     * @returns {Transform}
     */
    get transform() {
        const ret = wasm.__wbg_get_textmesh_transform(this.__wbg_ptr);
        return Transform.__wrap(ret);
    }
    /**
     * @param {boolean} arg0
     */
    set active(arg0) {
        wasm.__wbg_set_textmesh_active(this.__wbg_ptr, arg0);
    }
    /**
     * @param {number} arg0
     */
    set batch_length(arg0) {
        wasm.__wbg_set_textmesh_batch_length(this.__wbg_ptr, arg0);
    }
    /**
     * @param {TransferablePointGeometry} arg0
     */
    set geometry(arg0) {
        _assertClass(arg0, TransferablePointGeometry);
        var ptr0 = arg0.__destroy_into_raw();
        wasm.__wbg_set_textmesh_geometry(this.__wbg_ptr, ptr0);
    }
    /**
     * @param {TextMaterial} arg0
     */
    set material(arg0) {
        _assertClass(arg0, TextMaterial);
        var ptr0 = arg0.__destroy_into_raw();
        wasm.__wbg_set_textmesh_material(this.__wbg_ptr, ptr0);
    }
    /**
     * @param {Transform} arg0
     */
    set transform(arg0) {
        _assertClass(arg0, Transform);
        var ptr0 = arg0.__destroy_into_raw();
        wasm.__wbg_set_textmesh_transform(this.__wbg_ptr, ptr0);
    }
}
if (Symbol.dispose) TextMesh.prototype[Symbol.dispose] = TextMesh.prototype.free;

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

export class TextureFragmentRequestedEvent {
    static __wrap(ptr) {
        const obj = Object.create(TextureFragmentRequestedEvent.prototype);
        obj.__wbg_ptr = ptr;
        TextureFragmentRequestedEventFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        TextureFragmentRequestedEventFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_texturefragmentrequestedevent_free(ptr, 0);
    }
    /**
     * @returns {bigint}
     */
    get bits() {
        const ret = wasm.__wbg_get_texturefragmentrequestedevent_bits(this.__wbg_ptr);
        return BigInt.asUintN(64, ret);
    }
    /**
     * @returns {number}
     */
    get gen() {
        const ret = wasm.__wbg_get_texturefragmentrequestedevent_gen(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @returns {number}
     */
    get ind() {
        const ret = wasm.__wbg_get_texturefragmentrequestedevent_ind(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @returns {TextureFragmentStatus}
     */
    get status() {
        const ret = wasm.__wbg_get_texturefragmentrequestedevent_status(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {string}
     */
    get url() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.__wbg_get_texturefragmentrequestedevent_url(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * @param {bigint} arg0
     */
    set bits(arg0) {
        wasm.__wbg_set_texturefragmentrequestedevent_bits(this.__wbg_ptr, arg0);
    }
    /**
     * @param {number} arg0
     */
    set gen(arg0) {
        wasm.__wbg_set_texturefragmentrequestedevent_gen(this.__wbg_ptr, arg0);
    }
    /**
     * @param {number} arg0
     */
    set ind(arg0) {
        wasm.__wbg_set_texturefragmentrequestedevent_ind(this.__wbg_ptr, arg0);
    }
    /**
     * @param {TextureFragmentStatus} arg0
     */
    set status(arg0) {
        wasm.__wbg_set_texturefragmentrequestedevent_status(this.__wbg_ptr, arg0);
    }
    /**
     * @param {string} arg0
     */
    set url(arg0) {
        const ptr0 = passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_texturefragmentrequestedevent_url(this.__wbg_ptr, ptr0, len0);
    }
}
if (Symbol.dispose) TextureFragmentRequestedEvent.prototype[Symbol.dispose] = TextureFragmentRequestedEvent.prototype.free;

/**
 * @enum {0 | 1 | 2}
 */
export const TextureFragmentStatus = Object.freeze({
    Success: 0, "0": "Success",
    Fail: 1, "1": "Fail",
    Pending: 2, "2": "Pending",
});

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
    static __wrap(ptr) {
        const obj = Object.create(TileXYZ.prototype);
        obj.__wbg_ptr = ptr;
        TileXYZFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
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

/**
 * A `3d-tiles` layer renders a `3d-tiles` tileset (and the single-content
 * `b3dm` / `pnts` sources) with the given model appearance.
 */
export class Tiles3dLayerDescription {
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        Tiles3dLayerDescriptionFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_tiles3dlayerdescription_free(ptr, 0);
    }
    /**
     * @returns {ModelMaterial | undefined}
     */
    get model() {
        const ret = wasm.__wbg_get_tiles3dlayerdescription_model(this.__wbg_ptr);
        return ret === 0 ? undefined : ModelMaterial.__wrap(ret);
    }
    /**
     * @returns {string | undefined}
     */
    get source() {
        const ret = wasm.__wbg_get_tiles3dlayerdescription_source(this.__wbg_ptr);
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
    get type() {
        const ret = wasm.__wbg_get_tiles3dlayerdescription_type(this.__wbg_ptr);
        let v1;
        if (ret[0] !== 0) {
            v1 = getStringFromWasm0(ret[0], ret[1]).slice();
            wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        }
        return v1;
    }
    /**
     * @param {ModelMaterial | null} [arg0]
     */
    set model(arg0) {
        let ptr0 = 0;
        if (!isLikeNone(arg0)) {
            _assertClass(arg0, ModelMaterial);
            ptr0 = arg0.__destroy_into_raw();
        }
        wasm.__wbg_set_tiles3dlayerdescription_model(this.__wbg_ptr, ptr0);
    }
    /**
     * @param {string | null} [arg0]
     */
    set source(arg0) {
        var ptr0 = isLikeNone(arg0) ? 0 : passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_tiles3dlayerdescription_source(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @param {string | null} [arg0]
     */
    set type(arg0) {
        var ptr0 = isLikeNone(arg0) ? 0 : passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_tiles3dlayerdescription_type(this.__wbg_ptr, ptr0, len0);
    }
}
if (Symbol.dispose) Tiles3dLayerDescription.prototype[Symbol.dispose] = Tiles3dLayerDescription.prototype.free;

export class Tiles3dSourceDescription {
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        Tiles3dSourceDescriptionFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_tiles3dsourcedescription_free(ptr, 0);
    }
    /**
     * @returns {string | undefined}
     */
    get crs() {
        const ret = wasm.__wbg_get_tiles3dsourcedescription_crs(this.__wbg_ptr);
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
    get type() {
        const ret = wasm.__wbg_get_tiles3dsourcedescription_type(this.__wbg_ptr);
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
    get url() {
        const ret = wasm.__wbg_get_tiles3dsourcedescription_url(this.__wbg_ptr);
        let v1;
        if (ret[0] !== 0) {
            v1 = getStringFromWasm0(ret[0], ret[1]).slice();
            wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        }
        return v1;
    }
    /**
     * @param {string | null} [arg0]
     */
    set crs(arg0) {
        var ptr0 = isLikeNone(arg0) ? 0 : passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_tiles3dsourcedescription_crs(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @param {string | null} [arg0]
     */
    set type(arg0) {
        var ptr0 = isLikeNone(arg0) ? 0 : passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_tiles3dsourcedescription_type(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @param {string | null} [arg0]
     */
    set url(arg0) {
        var ptr0 = isLikeNone(arg0) ? 0 : passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_tiles3dsourcedescription_url(this.__wbg_ptr, ptr0, len0);
    }
}
if (Symbol.dispose) Tiles3dSourceDescription.prototype[Symbol.dispose] = Tiles3dSourceDescription.prototype.free;

export class TransferableFloatAttribute {
    static __wrap(ptr) {
        const obj = Object.create(TransferableFloatAttribute.prototype);
        obj.__wbg_ptr = ptr;
        TransferableFloatAttributeFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        TransferableFloatAttributeFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_transferablefloatattribute_free(ptr, 0);
    }
    /**
     * @returns {number}
     */
    get data() {
        const ret = wasm.__wbg_get_transferablefloatattribute_data(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number}
     */
    get size() {
        const ret = wasm.__wbg_get_transferablefloatattribute_size(this.__wbg_ptr);
        return ret;
    }
    /**
     * @param {number} arg0
     */
    set data(arg0) {
        wasm.__wbg_set_transferablefloatattribute_data(this.__wbg_ptr, arg0);
    }
    /**
     * @param {number} arg0
     */
    set size(arg0) {
        wasm.__wbg_set_transferablefloatattribute_size(this.__wbg_ptr, arg0);
    }
    /**
     * @param {number} data
     * @param {number} size
     */
    constructor(data, size) {
        const ret = wasm.transferablefloatattribute_new(data, size);
        this.__wbg_ptr = ret;
        TransferableFloatAttributeFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
}
if (Symbol.dispose) TransferableFloatAttribute.prototype[Symbol.dispose] = TransferableFloatAttribute.prototype.free;

export class TransferableGeometry {
    static __wrap(ptr) {
        const obj = Object.create(TransferableGeometry.prototype);
        obj.__wbg_ptr = ptr;
        TransferableGeometryFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        TransferableGeometryFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_transferablegeometry_free(ptr, 0);
    }
    /**
     * @returns {number}
     */
    get indices() {
        const ret = wasm.__wbg_get_transferablegeometry_indices(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number | undefined}
     */
    get normals() {
        const ret = wasm.__wbg_get_transferablegeometry_normals(this.__wbg_ptr);
        return ret === Number.MAX_SAFE_INTEGER ? undefined : ret;
    }
    /**
     * @returns {number | undefined}
     */
    get skirt_indices() {
        const ret = wasm.__wbg_get_transferablegeometry_skirt_indices(this.__wbg_ptr);
        return ret === Number.MAX_SAFE_INTEGER ? undefined : ret;
    }
    /**
     * @returns {number | undefined}
     */
    get skirt_normals() {
        const ret = wasm.__wbg_get_transferablegeometry_skirt_normals(this.__wbg_ptr);
        return ret === Number.MAX_SAFE_INTEGER ? undefined : ret;
    }
    /**
     * @returns {number | undefined}
     */
    get skirt_uvs() {
        const ret = wasm.__wbg_get_transferablegeometry_skirt_uvs(this.__wbg_ptr);
        return ret === Number.MAX_SAFE_INTEGER ? undefined : ret;
    }
    /**
     * @returns {number | undefined}
     */
    get skirt_vertices() {
        const ret = wasm.__wbg_get_transferablegeometry_skirt_vertices(this.__wbg_ptr);
        return ret === Number.MAX_SAFE_INTEGER ? undefined : ret;
    }
    /**
     * @returns {number}
     */
    get uvs() {
        const ret = wasm.__wbg_get_transferablegeometry_uvs(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number}
     */
    get vertices() {
        const ret = wasm.__wbg_get_transferablegeometry_vertices(this.__wbg_ptr);
        return ret;
    }
    /**
     * @param {number} arg0
     */
    set indices(arg0) {
        wasm.__wbg_set_transferablegeometry_indices(this.__wbg_ptr, arg0);
    }
    /**
     * @param {number | null} [arg0]
     */
    set normals(arg0) {
        wasm.__wbg_set_transferablegeometry_normals(this.__wbg_ptr, isLikeNone(arg0) ? Number.MAX_SAFE_INTEGER : (arg0) >> 0);
    }
    /**
     * @param {number | null} [arg0]
     */
    set skirt_indices(arg0) {
        wasm.__wbg_set_transferablegeometry_skirt_indices(this.__wbg_ptr, isLikeNone(arg0) ? Number.MAX_SAFE_INTEGER : (arg0) >> 0);
    }
    /**
     * @param {number | null} [arg0]
     */
    set skirt_normals(arg0) {
        wasm.__wbg_set_transferablegeometry_skirt_normals(this.__wbg_ptr, isLikeNone(arg0) ? Number.MAX_SAFE_INTEGER : (arg0) >> 0);
    }
    /**
     * @param {number | null} [arg0]
     */
    set skirt_uvs(arg0) {
        wasm.__wbg_set_transferablegeometry_skirt_uvs(this.__wbg_ptr, isLikeNone(arg0) ? Number.MAX_SAFE_INTEGER : (arg0) >> 0);
    }
    /**
     * @param {number | null} [arg0]
     */
    set skirt_vertices(arg0) {
        wasm.__wbg_set_transferablegeometry_skirt_vertices(this.__wbg_ptr, isLikeNone(arg0) ? Number.MAX_SAFE_INTEGER : (arg0) >> 0);
    }
    /**
     * @param {number} arg0
     */
    set uvs(arg0) {
        wasm.__wbg_set_transferablegeometry_uvs(this.__wbg_ptr, arg0);
    }
    /**
     * @param {number} arg0
     */
    set vertices(arg0) {
        wasm.__wbg_set_transferablegeometry_vertices(this.__wbg_ptr, arg0);
    }
    /**
     * @param {number} vertices
     * @param {number} uvs
     * @param {number} indices
     */
    constructor(vertices, uvs, indices) {
        const ret = wasm.transferablegeometry_new(vertices, uvs, indices);
        this.__wbg_ptr = ret;
        TransferableGeometryFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
}
if (Symbol.dispose) TransferableGeometry.prototype[Symbol.dispose] = TransferableGeometry.prototype.free;

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

export class TransferableMartini {
    static __wrap(ptr) {
        const obj = Object.create(TransferableMartini.prototype);
        obj.__wbg_ptr = ptr;
        TransferableMartiniFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        TransferableMartiniFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_transferablemartini_free(ptr, 0);
    }
    /**
     * @returns {number}
     */
    get size() {
        const ret = wasm.__wbg_get_transferablemartini_size(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @param {number} arg0
     */
    set size(arg0) {
        wasm.__wbg_set_transferablemartini_size(this.__wbg_ptr, arg0);
    }
    /**
     * @param {number} size
     * @returns {TransferableMartini}
     */
    static fromSize(size) {
        const ret = wasm.transferablemartini_fromSize(size);
        return TransferableMartini.__wrap(ret);
    }
    /**
     * @param {number} size
     * @param {Uint32Array} coords
     */
    constructor(size, coords) {
        const ptr0 = passArray32ToWasm0(coords, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.transferablemartini_new(size, ptr0, len0);
        this.__wbg_ptr = ret;
        TransferableMartiniFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * @returns {Uint32Array}
     */
    transfer_coords() {
        const ret = wasm.transferablemartini_transfer_coords(this.__wbg_ptr);
        return ret;
    }
}
if (Symbol.dispose) TransferableMartini.prototype[Symbol.dispose] = TransferableMartini.prototype.free;

export class TransferableModelGeometry {
    static __wrap(ptr) {
        const obj = Object.create(TransferableModelGeometry.prototype);
        obj.__wbg_ptr = ptr;
        TransferableModelGeometryFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        TransferableModelGeometryFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_transferablemodelgeometry_free(ptr, 0);
    }
    /**
     * @returns {TransferableFloatAttribute | undefined}
     */
    get batch_ids() {
        const ret = wasm.__wbg_get_transferablemodelgeometry_batch_ids(this.__wbg_ptr);
        return ret === 0 ? undefined : TransferableFloatAttribute.__wrap(ret);
    }
    /**
     * @param {TransferableFloatAttribute | null} [arg0]
     */
    set batch_ids(arg0) {
        let ptr0 = 0;
        if (!isLikeNone(arg0)) {
            _assertClass(arg0, TransferableFloatAttribute);
            ptr0 = arg0.__destroy_into_raw();
        }
        wasm.__wbg_set_transferablemodelgeometry_batch_ids(this.__wbg_ptr, ptr0);
    }
}
if (Symbol.dispose) TransferableModelGeometry.prototype[Symbol.dispose] = TransferableModelGeometry.prototype.free;

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

export class TransferablePointGeometry {
    static __wrap(ptr) {
        const obj = Object.create(TransferablePointGeometry.prototype);
        obj.__wbg_ptr = ptr;
        TransferablePointGeometryFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        TransferablePointGeometryFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_transferablepointgeometry_free(ptr, 0);
    }
    /**
     * @returns {TransferableFloatAttribute}
     */
    get batch_ids() {
        const ret = wasm.__wbg_get_transferablepointgeometry_batch_ids(this.__wbg_ptr);
        return TransferableFloatAttribute.__wrap(ret);
    }
    /**
     * @returns {TransferableUintAttribute}
     */
    get batch_index() {
        const ret = wasm.__wbg_get_transferablepointgeometry_batch_index(this.__wbg_ptr);
        return TransferableUintAttribute.__wrap(ret);
    }
    /**
     * @returns {TransferableFloatAttribute | undefined}
     */
    get position_3d_high() {
        const ret = wasm.__wbg_get_transferablepointgeometry_position_3d_high(this.__wbg_ptr);
        return ret === 0 ? undefined : TransferableFloatAttribute.__wrap(ret);
    }
    /**
     * @returns {TransferableFloatAttribute | undefined}
     */
    get position_3d_low() {
        const ret = wasm.__wbg_get_transferablepointgeometry_position_3d_low(this.__wbg_ptr);
        return ret === 0 ? undefined : TransferableFloatAttribute.__wrap(ret);
    }
    /**
     * @returns {TransferableFloatAttribute | undefined}
     */
    get position() {
        const ret = wasm.__wbg_get_transferablepointgeometry_position(this.__wbg_ptr);
        return ret === 0 ? undefined : TransferableFloatAttribute.__wrap(ret);
    }
    /**
     * @param {TransferableFloatAttribute} arg0
     */
    set batch_ids(arg0) {
        _assertClass(arg0, TransferableFloatAttribute);
        var ptr0 = arg0.__destroy_into_raw();
        wasm.__wbg_set_transferablepointgeometry_batch_ids(this.__wbg_ptr, ptr0);
    }
    /**
     * @param {TransferableUintAttribute} arg0
     */
    set batch_index(arg0) {
        _assertClass(arg0, TransferableUintAttribute);
        var ptr0 = arg0.__destroy_into_raw();
        wasm.__wbg_set_transferablepointgeometry_batch_index(this.__wbg_ptr, ptr0);
    }
    /**
     * @param {TransferableFloatAttribute | null} [arg0]
     */
    set position_3d_high(arg0) {
        let ptr0 = 0;
        if (!isLikeNone(arg0)) {
            _assertClass(arg0, TransferableFloatAttribute);
            ptr0 = arg0.__destroy_into_raw();
        }
        wasm.__wbg_set_transferablepointgeometry_position_3d_high(this.__wbg_ptr, ptr0);
    }
    /**
     * @param {TransferableFloatAttribute | null} [arg0]
     */
    set position_3d_low(arg0) {
        let ptr0 = 0;
        if (!isLikeNone(arg0)) {
            _assertClass(arg0, TransferableFloatAttribute);
            ptr0 = arg0.__destroy_into_raw();
        }
        wasm.__wbg_set_transferablepointgeometry_position_3d_low(this.__wbg_ptr, ptr0);
    }
    /**
     * @param {TransferableFloatAttribute | null} [arg0]
     */
    set position(arg0) {
        let ptr0 = 0;
        if (!isLikeNone(arg0)) {
            _assertClass(arg0, TransferableFloatAttribute);
            ptr0 = arg0.__destroy_into_raw();
        }
        wasm.__wbg_set_transferablepointgeometry_position(this.__wbg_ptr, ptr0);
    }
}
if (Symbol.dispose) TransferablePointGeometry.prototype[Symbol.dispose] = TransferablePointGeometry.prototype.free;

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

export class TransferablePolygonGeometry {
    static __wrap(ptr) {
        const obj = Object.create(TransferablePolygonGeometry.prototype);
        obj.__wbg_ptr = ptr;
        TransferablePolygonGeometryFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        TransferablePolygonGeometryFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_transferablepolygongeometry_free(ptr, 0);
    }
    /**
     * @returns {TransferableFloatAttribute | undefined}
     */
    get batch_ids() {
        const ret = wasm.__wbg_get_transferablepolygongeometry_batch_ids(this.__wbg_ptr);
        return ret === 0 ? undefined : TransferableFloatAttribute.__wrap(ret);
    }
    /**
     * @returns {TransferableUintAttribute | undefined}
     */
    get batch_index() {
        const ret = wasm.__wbg_get_transferablepolygongeometry_batch_index(this.__wbg_ptr);
        return ret === 0 ? undefined : TransferableUintAttribute.__wrap(ret);
    }
    /**
     * @returns {number}
     */
    get indices() {
        const ret = wasm.__wbg_get_transferablepolygongeometry_indices(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {TransferableFloatAttribute | undefined}
     */
    get normal() {
        const ret = wasm.__wbg_get_transferablepolygongeometry_normal(this.__wbg_ptr);
        return ret === 0 ? undefined : TransferableFloatAttribute.__wrap(ret);
    }
    /**
     * @returns {TransferableFloatAttribute | undefined}
     */
    get position_3d_high() {
        const ret = wasm.__wbg_get_transferablepolygongeometry_position_3d_high(this.__wbg_ptr);
        return ret === 0 ? undefined : TransferableFloatAttribute.__wrap(ret);
    }
    /**
     * @returns {TransferableFloatAttribute | undefined}
     */
    get position_3d_low() {
        const ret = wasm.__wbg_get_transferablepolygongeometry_position_3d_low(this.__wbg_ptr);
        return ret === 0 ? undefined : TransferableFloatAttribute.__wrap(ret);
    }
    /**
     * @returns {TransferableFloatAttribute | undefined}
     */
    get position() {
        const ret = wasm.__wbg_get_transferablepolygongeometry_position(this.__wbg_ptr);
        return ret === 0 ? undefined : TransferableFloatAttribute.__wrap(ret);
    }
    /**
     * @returns {TransferableFloatAttribute | undefined}
     */
    get scale_normal_and_cap() {
        const ret = wasm.__wbg_get_transferablepolygongeometry_scale_normal_and_cap(this.__wbg_ptr);
        return ret === 0 ? undefined : TransferableFloatAttribute.__wrap(ret);
    }
    /**
     * @param {TransferableFloatAttribute | null} [arg0]
     */
    set batch_ids(arg0) {
        let ptr0 = 0;
        if (!isLikeNone(arg0)) {
            _assertClass(arg0, TransferableFloatAttribute);
            ptr0 = arg0.__destroy_into_raw();
        }
        wasm.__wbg_set_transferablepolygongeometry_batch_ids(this.__wbg_ptr, ptr0);
    }
    /**
     * @param {TransferableUintAttribute | null} [arg0]
     */
    set batch_index(arg0) {
        let ptr0 = 0;
        if (!isLikeNone(arg0)) {
            _assertClass(arg0, TransferableUintAttribute);
            ptr0 = arg0.__destroy_into_raw();
        }
        wasm.__wbg_set_transferablepolygongeometry_batch_index(this.__wbg_ptr, ptr0);
    }
    /**
     * @param {number} arg0
     */
    set indices(arg0) {
        wasm.__wbg_set_transferablepolygongeometry_indices(this.__wbg_ptr, arg0);
    }
    /**
     * @param {TransferableFloatAttribute | null} [arg0]
     */
    set normal(arg0) {
        let ptr0 = 0;
        if (!isLikeNone(arg0)) {
            _assertClass(arg0, TransferableFloatAttribute);
            ptr0 = arg0.__destroy_into_raw();
        }
        wasm.__wbg_set_transferablepolygongeometry_normal(this.__wbg_ptr, ptr0);
    }
    /**
     * @param {TransferableFloatAttribute | null} [arg0]
     */
    set position_3d_high(arg0) {
        let ptr0 = 0;
        if (!isLikeNone(arg0)) {
            _assertClass(arg0, TransferableFloatAttribute);
            ptr0 = arg0.__destroy_into_raw();
        }
        wasm.__wbg_set_transferablepolygongeometry_position_3d_high(this.__wbg_ptr, ptr0);
    }
    /**
     * @param {TransferableFloatAttribute | null} [arg0]
     */
    set position_3d_low(arg0) {
        let ptr0 = 0;
        if (!isLikeNone(arg0)) {
            _assertClass(arg0, TransferableFloatAttribute);
            ptr0 = arg0.__destroy_into_raw();
        }
        wasm.__wbg_set_transferablepolygongeometry_position_3d_low(this.__wbg_ptr, ptr0);
    }
    /**
     * @param {TransferableFloatAttribute | null} [arg0]
     */
    set position(arg0) {
        let ptr0 = 0;
        if (!isLikeNone(arg0)) {
            _assertClass(arg0, TransferableFloatAttribute);
            ptr0 = arg0.__destroy_into_raw();
        }
        wasm.__wbg_set_transferablepolygongeometry_position(this.__wbg_ptr, ptr0);
    }
    /**
     * @param {TransferableFloatAttribute | null} [arg0]
     */
    set scale_normal_and_cap(arg0) {
        let ptr0 = 0;
        if (!isLikeNone(arg0)) {
            _assertClass(arg0, TransferableFloatAttribute);
            ptr0 = arg0.__destroy_into_raw();
        }
        wasm.__wbg_set_transferablepolygongeometry_scale_normal_and_cap(this.__wbg_ptr, ptr0);
    }
    /**
     * @param {TransferableFloatAttribute | null | undefined} position
     * @param {TransferableFloatAttribute | null | undefined} position_3d_high
     * @param {TransferableFloatAttribute | null | undefined} position_3d_low
     * @param {TransferableFloatAttribute | null | undefined} normal
     * @param {TransferableFloatAttribute | null | undefined} scale_normal_and_cap
     * @param {TransferableFloatAttribute | null | undefined} batch_ids
     * @param {TransferableUintAttribute | null | undefined} batch_index
     * @param {number} indices
     */
    constructor(position, position_3d_high, position_3d_low, normal, scale_normal_and_cap, batch_ids, batch_index, indices) {
        let ptr0 = 0;
        if (!isLikeNone(position)) {
            _assertClass(position, TransferableFloatAttribute);
            ptr0 = position.__destroy_into_raw();
        }
        let ptr1 = 0;
        if (!isLikeNone(position_3d_high)) {
            _assertClass(position_3d_high, TransferableFloatAttribute);
            ptr1 = position_3d_high.__destroy_into_raw();
        }
        let ptr2 = 0;
        if (!isLikeNone(position_3d_low)) {
            _assertClass(position_3d_low, TransferableFloatAttribute);
            ptr2 = position_3d_low.__destroy_into_raw();
        }
        let ptr3 = 0;
        if (!isLikeNone(normal)) {
            _assertClass(normal, TransferableFloatAttribute);
            ptr3 = normal.__destroy_into_raw();
        }
        let ptr4 = 0;
        if (!isLikeNone(scale_normal_and_cap)) {
            _assertClass(scale_normal_and_cap, TransferableFloatAttribute);
            ptr4 = scale_normal_and_cap.__destroy_into_raw();
        }
        let ptr5 = 0;
        if (!isLikeNone(batch_ids)) {
            _assertClass(batch_ids, TransferableFloatAttribute);
            ptr5 = batch_ids.__destroy_into_raw();
        }
        let ptr6 = 0;
        if (!isLikeNone(batch_index)) {
            _assertClass(batch_index, TransferableUintAttribute);
            ptr6 = batch_index.__destroy_into_raw();
        }
        const ret = wasm.transferablepolygongeometry_new(ptr0, ptr1, ptr2, ptr3, ptr4, ptr5, ptr6, indices);
        this.__wbg_ptr = ret;
        TransferablePolygonGeometryFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
}
if (Symbol.dispose) TransferablePolygonGeometry.prototype[Symbol.dispose] = TransferablePolygonGeometry.prototype.free;

export class TransferablePolygonOutlineGeometry {
    static __wrap(ptr) {
        const obj = Object.create(TransferablePolygonOutlineGeometry.prototype);
        obj.__wbg_ptr = ptr;
        TransferablePolygonOutlineGeometryFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        TransferablePolygonOutlineGeometryFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_transferablepolygonoutlinegeometry_free(ptr, 0);
    }
    /**
     * @returns {TransferableFloatAttribute | undefined}
     */
    get batch_index() {
        const ret = wasm.__wbg_get_transferablepolygonoutlinegeometry_batch_index(this.__wbg_ptr);
        return ret === 0 ? undefined : TransferableFloatAttribute.__wrap(ret);
    }
    /**
     * @returns {TransferableFloatAttribute | undefined}
     */
    get position_3d_high() {
        const ret = wasm.__wbg_get_transferablepolygonoutlinegeometry_position_3d_high(this.__wbg_ptr);
        return ret === 0 ? undefined : TransferableFloatAttribute.__wrap(ret);
    }
    /**
     * @returns {TransferableFloatAttribute | undefined}
     */
    get position_3d_low() {
        const ret = wasm.__wbg_get_transferablepolygonoutlinegeometry_position_3d_low(this.__wbg_ptr);
        return ret === 0 ? undefined : TransferableFloatAttribute.__wrap(ret);
    }
    /**
     * @returns {TransferableFloatAttribute | undefined}
     */
    get position() {
        const ret = wasm.__wbg_get_transferablepolygonoutlinegeometry_position(this.__wbg_ptr);
        return ret === 0 ? undefined : TransferableFloatAttribute.__wrap(ret);
    }
    /**
     * @returns {TransferableFloatAttribute | undefined}
     */
    get scale_normal_and_cap() {
        const ret = wasm.__wbg_get_transferablepolygonoutlinegeometry_scale_normal_and_cap(this.__wbg_ptr);
        return ret === 0 ? undefined : TransferableFloatAttribute.__wrap(ret);
    }
    /**
     * @returns {number | undefined}
     */
    get skip_indices() {
        const ret = wasm.__wbg_get_transferablepolygonoutlinegeometry_skip_indices(this.__wbg_ptr);
        return ret === Number.MAX_SAFE_INTEGER ? undefined : ret;
    }
    /**
     * @param {TransferableFloatAttribute | null} [arg0]
     */
    set batch_index(arg0) {
        let ptr0 = 0;
        if (!isLikeNone(arg0)) {
            _assertClass(arg0, TransferableFloatAttribute);
            ptr0 = arg0.__destroy_into_raw();
        }
        wasm.__wbg_set_transferablepolygonoutlinegeometry_batch_index(this.__wbg_ptr, ptr0);
    }
    /**
     * @param {TransferableFloatAttribute | null} [arg0]
     */
    set position_3d_high(arg0) {
        let ptr0 = 0;
        if (!isLikeNone(arg0)) {
            _assertClass(arg0, TransferableFloatAttribute);
            ptr0 = arg0.__destroy_into_raw();
        }
        wasm.__wbg_set_transferablepolygonoutlinegeometry_position_3d_high(this.__wbg_ptr, ptr0);
    }
    /**
     * @param {TransferableFloatAttribute | null} [arg0]
     */
    set position_3d_low(arg0) {
        let ptr0 = 0;
        if (!isLikeNone(arg0)) {
            _assertClass(arg0, TransferableFloatAttribute);
            ptr0 = arg0.__destroy_into_raw();
        }
        wasm.__wbg_set_transferablepolygonoutlinegeometry_position_3d_low(this.__wbg_ptr, ptr0);
    }
    /**
     * @param {TransferableFloatAttribute | null} [arg0]
     */
    set position(arg0) {
        let ptr0 = 0;
        if (!isLikeNone(arg0)) {
            _assertClass(arg0, TransferableFloatAttribute);
            ptr0 = arg0.__destroy_into_raw();
        }
        wasm.__wbg_set_transferablepolygonoutlinegeometry_position(this.__wbg_ptr, ptr0);
    }
    /**
     * @param {TransferableFloatAttribute | null} [arg0]
     */
    set scale_normal_and_cap(arg0) {
        let ptr0 = 0;
        if (!isLikeNone(arg0)) {
            _assertClass(arg0, TransferableFloatAttribute);
            ptr0 = arg0.__destroy_into_raw();
        }
        wasm.__wbg_set_transferablepolygonoutlinegeometry_scale_normal_and_cap(this.__wbg_ptr, ptr0);
    }
    /**
     * @param {number | null} [arg0]
     */
    set skip_indices(arg0) {
        wasm.__wbg_set_transferablepolygonoutlinegeometry_skip_indices(this.__wbg_ptr, isLikeNone(arg0) ? Number.MAX_SAFE_INTEGER : (arg0) >> 0);
    }
    /**
     * @param {TransferableFloatAttribute | null} [position]
     * @param {TransferableFloatAttribute | null} [position_3d_high]
     * @param {TransferableFloatAttribute | null} [position_3d_low]
     * @param {TransferableFloatAttribute | null} [scale_normal_and_cap]
     * @param {number | null} [skip_indices]
     * @param {TransferableFloatAttribute | null} [batch_index]
     */
    constructor(position, position_3d_high, position_3d_low, scale_normal_and_cap, skip_indices, batch_index) {
        let ptr0 = 0;
        if (!isLikeNone(position)) {
            _assertClass(position, TransferableFloatAttribute);
            ptr0 = position.__destroy_into_raw();
        }
        let ptr1 = 0;
        if (!isLikeNone(position_3d_high)) {
            _assertClass(position_3d_high, TransferableFloatAttribute);
            ptr1 = position_3d_high.__destroy_into_raw();
        }
        let ptr2 = 0;
        if (!isLikeNone(position_3d_low)) {
            _assertClass(position_3d_low, TransferableFloatAttribute);
            ptr2 = position_3d_low.__destroy_into_raw();
        }
        let ptr3 = 0;
        if (!isLikeNone(scale_normal_and_cap)) {
            _assertClass(scale_normal_and_cap, TransferableFloatAttribute);
            ptr3 = scale_normal_and_cap.__destroy_into_raw();
        }
        let ptr4 = 0;
        if (!isLikeNone(batch_index)) {
            _assertClass(batch_index, TransferableFloatAttribute);
            ptr4 = batch_index.__destroy_into_raw();
        }
        const ret = wasm.transferablepolygonoutlinegeometry_new(ptr0, ptr1, ptr2, ptr3, isLikeNone(skip_indices) ? Number.MAX_SAFE_INTEGER : (skip_indices) >> 0, ptr4);
        this.__wbg_ptr = ret;
        TransferablePolygonOutlineGeometryFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
}
if (Symbol.dispose) TransferablePolygonOutlineGeometry.prototype[Symbol.dispose] = TransferablePolygonOutlineGeometry.prototype.free;

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

export class TransferablePolylineGeometry {
    static __wrap(ptr) {
        const obj = Object.create(TransferablePolylineGeometry.prototype);
        obj.__wbg_ptr = ptr;
        TransferablePolylineGeometryFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        TransferablePolylineGeometryFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_transferablepolylinegeometry_free(ptr, 0);
    }
    /**
     * @returns {TransferableFloatAttribute | undefined}
     */
    get batch_ids() {
        const ret = wasm.__wbg_get_transferablepolylinegeometry_batch_ids(this.__wbg_ptr);
        return ret === 0 ? undefined : TransferableFloatAttribute.__wrap(ret);
    }
    /**
     * @returns {TransferableUintAttribute | undefined}
     */
    get batch_index() {
        const ret = wasm.__wbg_get_transferablepolylinegeometry_batch_index(this.__wbg_ptr);
        return ret === 0 ? undefined : TransferableUintAttribute.__wrap(ret);
    }
    /**
     * @returns {TransferableFloatAttribute | undefined}
     */
    get end_high() {
        const ret = wasm.__wbg_get_transferablepolylinegeometry_end_high(this.__wbg_ptr);
        return ret === 0 ? undefined : TransferableFloatAttribute.__wrap(ret);
    }
    /**
     * @returns {TransferableFloatAttribute | undefined}
     */
    get end_low() {
        const ret = wasm.__wbg_get_transferablepolylinegeometry_end_low(this.__wbg_ptr);
        return ret === 0 ? undefined : TransferableFloatAttribute.__wrap(ret);
    }
    /**
     * @returns {TransferableFloatAttribute | undefined}
     */
    get end_normal_and_texture_coordinate_normalization_x() {
        const ret = wasm.__wbg_get_transferablepolylinegeometry_end_normal_and_texture_coordinate_normalization_x(this.__wbg_ptr);
        return ret === 0 ? undefined : TransferableFloatAttribute.__wrap(ret);
    }
    /**
     * @returns {TransferableFloatAttribute | undefined}
     */
    get forward_offset() {
        const ret = wasm.__wbg_get_transferablepolylinegeometry_forward_offset(this.__wbg_ptr);
        return ret === 0 ? undefined : TransferableFloatAttribute.__wrap(ret);
    }
    /**
     * @returns {number}
     */
    get indices() {
        const ret = wasm.__wbg_get_transferablepolylinegeometry_indices(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {TransferableFloatAttribute | undefined}
     */
    get position_high() {
        const ret = wasm.__wbg_get_transferablepolylinegeometry_position_high(this.__wbg_ptr);
        return ret === 0 ? undefined : TransferableFloatAttribute.__wrap(ret);
    }
    /**
     * @returns {TransferableFloatAttribute | undefined}
     */
    get position_low() {
        const ret = wasm.__wbg_get_transferablepolylinegeometry_position_low(this.__wbg_ptr);
        return ret === 0 ? undefined : TransferableFloatAttribute.__wrap(ret);
    }
    /**
     * @returns {TransferableFloatAttribute}
     */
    get position() {
        const ret = wasm.__wbg_get_transferablepolylinegeometry_position(this.__wbg_ptr);
        return TransferableFloatAttribute.__wrap(ret);
    }
    /**
     * @returns {TransferableFloatAttribute}
     */
    get right_normal_and_texture_coordinate_normalization_y() {
        const ret = wasm.__wbg_get_transferablepolylinegeometry_right_normal_and_texture_coordinate_normalization_y(this.__wbg_ptr);
        return TransferableFloatAttribute.__wrap(ret);
    }
    /**
     * @returns {TransferableFloatAttribute | undefined}
     */
    get start_high() {
        const ret = wasm.__wbg_get_transferablepolylinegeometry_start_high(this.__wbg_ptr);
        return ret === 0 ? undefined : TransferableFloatAttribute.__wrap(ret);
    }
    /**
     * @returns {TransferableFloatAttribute | undefined}
     */
    get start_low() {
        const ret = wasm.__wbg_get_transferablepolylinegeometry_start_low(this.__wbg_ptr);
        return ret === 0 ? undefined : TransferableFloatAttribute.__wrap(ret);
    }
    /**
     * @returns {TransferableFloatAttribute | undefined}
     */
    get start_normals() {
        const ret = wasm.__wbg_get_transferablepolylinegeometry_start_normals(this.__wbg_ptr);
        return ret === 0 ? undefined : TransferableFloatAttribute.__wrap(ret);
    }
    /**
     * @returns {TransferableFloatAttribute | undefined}
     */
    get start() {
        const ret = wasm.__wbg_get_transferablepolylinegeometry_start(this.__wbg_ptr);
        return ret === 0 ? undefined : TransferableFloatAttribute.__wrap(ret);
    }
    /**
     * @param {TransferableFloatAttribute | null} [arg0]
     */
    set batch_ids(arg0) {
        let ptr0 = 0;
        if (!isLikeNone(arg0)) {
            _assertClass(arg0, TransferableFloatAttribute);
            ptr0 = arg0.__destroy_into_raw();
        }
        wasm.__wbg_set_transferablepolylinegeometry_batch_ids(this.__wbg_ptr, ptr0);
    }
    /**
     * @param {TransferableUintAttribute | null} [arg0]
     */
    set batch_index(arg0) {
        let ptr0 = 0;
        if (!isLikeNone(arg0)) {
            _assertClass(arg0, TransferableUintAttribute);
            ptr0 = arg0.__destroy_into_raw();
        }
        wasm.__wbg_set_transferablepolylinegeometry_batch_index(this.__wbg_ptr, ptr0);
    }
    /**
     * @param {TransferableFloatAttribute | null} [arg0]
     */
    set end_high(arg0) {
        let ptr0 = 0;
        if (!isLikeNone(arg0)) {
            _assertClass(arg0, TransferableFloatAttribute);
            ptr0 = arg0.__destroy_into_raw();
        }
        wasm.__wbg_set_transferablepolylinegeometry_end_high(this.__wbg_ptr, ptr0);
    }
    /**
     * @param {TransferableFloatAttribute | null} [arg0]
     */
    set end_low(arg0) {
        let ptr0 = 0;
        if (!isLikeNone(arg0)) {
            _assertClass(arg0, TransferableFloatAttribute);
            ptr0 = arg0.__destroy_into_raw();
        }
        wasm.__wbg_set_transferablepolylinegeometry_end_low(this.__wbg_ptr, ptr0);
    }
    /**
     * @param {TransferableFloatAttribute | null} [arg0]
     */
    set end_normal_and_texture_coordinate_normalization_x(arg0) {
        let ptr0 = 0;
        if (!isLikeNone(arg0)) {
            _assertClass(arg0, TransferableFloatAttribute);
            ptr0 = arg0.__destroy_into_raw();
        }
        wasm.__wbg_set_transferablepolylinegeometry_end_normal_and_texture_coordinate_normalization_x(this.__wbg_ptr, ptr0);
    }
    /**
     * @param {TransferableFloatAttribute | null} [arg0]
     */
    set forward_offset(arg0) {
        let ptr0 = 0;
        if (!isLikeNone(arg0)) {
            _assertClass(arg0, TransferableFloatAttribute);
            ptr0 = arg0.__destroy_into_raw();
        }
        wasm.__wbg_set_transferablepolylinegeometry_forward_offset(this.__wbg_ptr, ptr0);
    }
    /**
     * @param {number} arg0
     */
    set indices(arg0) {
        wasm.__wbg_set_transferablepolylinegeometry_indices(this.__wbg_ptr, arg0);
    }
    /**
     * @param {TransferableFloatAttribute | null} [arg0]
     */
    set position_high(arg0) {
        let ptr0 = 0;
        if (!isLikeNone(arg0)) {
            _assertClass(arg0, TransferableFloatAttribute);
            ptr0 = arg0.__destroy_into_raw();
        }
        wasm.__wbg_set_transferablepolylinegeometry_position_high(this.__wbg_ptr, ptr0);
    }
    /**
     * @param {TransferableFloatAttribute | null} [arg0]
     */
    set position_low(arg0) {
        let ptr0 = 0;
        if (!isLikeNone(arg0)) {
            _assertClass(arg0, TransferableFloatAttribute);
            ptr0 = arg0.__destroy_into_raw();
        }
        wasm.__wbg_set_transferablepolylinegeometry_position_low(this.__wbg_ptr, ptr0);
    }
    /**
     * @param {TransferableFloatAttribute} arg0
     */
    set position(arg0) {
        _assertClass(arg0, TransferableFloatAttribute);
        var ptr0 = arg0.__destroy_into_raw();
        wasm.__wbg_set_transferablepolylinegeometry_position(this.__wbg_ptr, ptr0);
    }
    /**
     * @param {TransferableFloatAttribute} arg0
     */
    set right_normal_and_texture_coordinate_normalization_y(arg0) {
        _assertClass(arg0, TransferableFloatAttribute);
        var ptr0 = arg0.__destroy_into_raw();
        wasm.__wbg_set_transferablepolylinegeometry_right_normal_and_texture_coordinate_normalization_y(this.__wbg_ptr, ptr0);
    }
    /**
     * @param {TransferableFloatAttribute | null} [arg0]
     */
    set start_high(arg0) {
        let ptr0 = 0;
        if (!isLikeNone(arg0)) {
            _assertClass(arg0, TransferableFloatAttribute);
            ptr0 = arg0.__destroy_into_raw();
        }
        wasm.__wbg_set_transferablepolylinegeometry_start_high(this.__wbg_ptr, ptr0);
    }
    /**
     * @param {TransferableFloatAttribute | null} [arg0]
     */
    set start_low(arg0) {
        let ptr0 = 0;
        if (!isLikeNone(arg0)) {
            _assertClass(arg0, TransferableFloatAttribute);
            ptr0 = arg0.__destroy_into_raw();
        }
        wasm.__wbg_set_transferablepolylinegeometry_start_low(this.__wbg_ptr, ptr0);
    }
    /**
     * @param {TransferableFloatAttribute | null} [arg0]
     */
    set start_normals(arg0) {
        let ptr0 = 0;
        if (!isLikeNone(arg0)) {
            _assertClass(arg0, TransferableFloatAttribute);
            ptr0 = arg0.__destroy_into_raw();
        }
        wasm.__wbg_set_transferablepolylinegeometry_start_normals(this.__wbg_ptr, ptr0);
    }
    /**
     * @param {TransferableFloatAttribute | null} [arg0]
     */
    set start(arg0) {
        let ptr0 = 0;
        if (!isLikeNone(arg0)) {
            _assertClass(arg0, TransferableFloatAttribute);
            ptr0 = arg0.__destroy_into_raw();
        }
        wasm.__wbg_set_transferablepolylinegeometry_start(this.__wbg_ptr, ptr0);
    }
    /**
     * @param {TransferableFloatAttribute} position
     * @param {TransferableFloatAttribute | null | undefined} position_high
     * @param {TransferableFloatAttribute | null | undefined} position_low
     * @param {TransferableFloatAttribute | null | undefined} start
     * @param {TransferableFloatAttribute | null | undefined} start_high
     * @param {TransferableFloatAttribute | null | undefined} start_low
     * @param {TransferableFloatAttribute | null | undefined} forward_offset
     * @param {TransferableFloatAttribute | null | undefined} end_high
     * @param {TransferableFloatAttribute | null | undefined} end_low
     * @param {TransferableFloatAttribute | null | undefined} start_normals
     * @param {TransferableFloatAttribute | null | undefined} end_normal_and_texture_coordinate_normalization_x
     * @param {TransferableFloatAttribute} right_normal_and_texture_coordinate_normalization_y
     * @param {TransferableFloatAttribute | null | undefined} batch_ids
     * @param {TransferableUintAttribute | null | undefined} batch_index
     * @param {number} indices
     */
    constructor(position, position_high, position_low, start, start_high, start_low, forward_offset, end_high, end_low, start_normals, end_normal_and_texture_coordinate_normalization_x, right_normal_and_texture_coordinate_normalization_y, batch_ids, batch_index, indices) {
        _assertClass(position, TransferableFloatAttribute);
        var ptr0 = position.__destroy_into_raw();
        let ptr1 = 0;
        if (!isLikeNone(position_high)) {
            _assertClass(position_high, TransferableFloatAttribute);
            ptr1 = position_high.__destroy_into_raw();
        }
        let ptr2 = 0;
        if (!isLikeNone(position_low)) {
            _assertClass(position_low, TransferableFloatAttribute);
            ptr2 = position_low.__destroy_into_raw();
        }
        let ptr3 = 0;
        if (!isLikeNone(start)) {
            _assertClass(start, TransferableFloatAttribute);
            ptr3 = start.__destroy_into_raw();
        }
        let ptr4 = 0;
        if (!isLikeNone(start_high)) {
            _assertClass(start_high, TransferableFloatAttribute);
            ptr4 = start_high.__destroy_into_raw();
        }
        let ptr5 = 0;
        if (!isLikeNone(start_low)) {
            _assertClass(start_low, TransferableFloatAttribute);
            ptr5 = start_low.__destroy_into_raw();
        }
        let ptr6 = 0;
        if (!isLikeNone(forward_offset)) {
            _assertClass(forward_offset, TransferableFloatAttribute);
            ptr6 = forward_offset.__destroy_into_raw();
        }
        let ptr7 = 0;
        if (!isLikeNone(end_high)) {
            _assertClass(end_high, TransferableFloatAttribute);
            ptr7 = end_high.__destroy_into_raw();
        }
        let ptr8 = 0;
        if (!isLikeNone(end_low)) {
            _assertClass(end_low, TransferableFloatAttribute);
            ptr8 = end_low.__destroy_into_raw();
        }
        let ptr9 = 0;
        if (!isLikeNone(start_normals)) {
            _assertClass(start_normals, TransferableFloatAttribute);
            ptr9 = start_normals.__destroy_into_raw();
        }
        let ptr10 = 0;
        if (!isLikeNone(end_normal_and_texture_coordinate_normalization_x)) {
            _assertClass(end_normal_and_texture_coordinate_normalization_x, TransferableFloatAttribute);
            ptr10 = end_normal_and_texture_coordinate_normalization_x.__destroy_into_raw();
        }
        _assertClass(right_normal_and_texture_coordinate_normalization_y, TransferableFloatAttribute);
        var ptr11 = right_normal_and_texture_coordinate_normalization_y.__destroy_into_raw();
        let ptr12 = 0;
        if (!isLikeNone(batch_ids)) {
            _assertClass(batch_ids, TransferableFloatAttribute);
            ptr12 = batch_ids.__destroy_into_raw();
        }
        let ptr13 = 0;
        if (!isLikeNone(batch_index)) {
            _assertClass(batch_index, TransferableUintAttribute);
            ptr13 = batch_index.__destroy_into_raw();
        }
        const ret = wasm.transferablepolylinegeometry_new(ptr0, ptr1, ptr2, ptr3, ptr4, ptr5, ptr6, ptr7, ptr8, ptr9, ptr10, ptr11, ptr12, ptr13, indices);
        this.__wbg_ptr = ret;
        TransferablePolylineGeometryFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
}
if (Symbol.dispose) TransferablePolylineGeometry.prototype[Symbol.dispose] = TransferablePolylineGeometry.prototype.free;

export class TransferableRasterDEMData {
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        TransferableRasterDEMDataFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_transferablerasterdemdata_free(ptr, 0);
    }
    /**
     * @returns {ElevationDecoder}
     */
    get decoder() {
        const ret = wasm.__wbg_get_transferablerasterdemdata_decoder(this.__wbg_ptr);
        return ElevationDecoder.__wrap(ret);
    }
    /**
     * @param {ElevationDecoder} arg0
     */
    set decoder(arg0) {
        _assertClass(arg0, ElevationDecoder);
        var ptr0 = arg0.__destroy_into_raw();
        wasm.__wbg_set_transferablerasterdemdata_decoder(this.__wbg_ptr, ptr0);
    }
    /**
     * @param {ElevationDecoder} decoder
     */
    constructor(decoder) {
        _assertClass(decoder, ElevationDecoder);
        var ptr0 = decoder.__destroy_into_raw();
        const ret = wasm.transferablerasterdemdata_new(ptr0);
        this.__wbg_ptr = ret;
        TransferableRasterDEMDataFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
}
if (Symbol.dispose) TransferableRasterDEMData.prototype[Symbol.dispose] = TransferableRasterDEMData.prototype.free;

export class TransferableTile {
    static __wrap(ptr) {
        const obj = Object.create(TransferableTile.prototype);
        obj.__wbg_ptr = ptr;
        TransferableTileFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        TransferableTileFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_transferabletile_free(ptr, 0);
    }
    /**
     * @returns {CachedMeshHandle | undefined}
     */
    get cached_mesh_handle() {
        const ret = wasm.__wbg_get_transferabletile_cached_mesh_handle(this.__wbg_ptr);
        return ret === 0 ? undefined : CachedMeshHandle.__wrap(ret);
    }
    /**
     * @returns {TileXYZ}
     */
    get coords() {
        const ret = wasm.__wbg_get_transferabletile_coords(this.__wbg_ptr);
        return TileXYZ.__wrap(ret);
    }
    /**
     * @returns {number}
     */
    get max_height() {
        const ret = wasm.__wbg_get_transferabletile_max_height(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number}
     */
    get min_height() {
        const ret = wasm.__wbg_get_transferabletile_min_height(this.__wbg_ptr);
        return ret;
    }
    /**
     * @param {CachedMeshHandle | null} [arg0]
     */
    set cached_mesh_handle(arg0) {
        let ptr0 = 0;
        if (!isLikeNone(arg0)) {
            _assertClass(arg0, CachedMeshHandle);
            ptr0 = arg0.__destroy_into_raw();
        }
        wasm.__wbg_set_transferabletile_cached_mesh_handle(this.__wbg_ptr, ptr0);
    }
    /**
     * @param {TileXYZ} arg0
     */
    set coords(arg0) {
        _assertClass(arg0, TileXYZ);
        var ptr0 = arg0.__destroy_into_raw();
        wasm.__wbg_set_transferabletile_coords(this.__wbg_ptr, ptr0);
    }
    /**
     * @param {number} arg0
     */
    set max_height(arg0) {
        wasm.__wbg_set_transferabletile_max_height(this.__wbg_ptr, arg0);
    }
    /**
     * @param {number} arg0
     */
    set min_height(arg0) {
        wasm.__wbg_set_transferabletile_min_height(this.__wbg_ptr, arg0);
    }
    /**
     * @param {TileXYZ} coords
     * @param {number} max_height
     * @param {number} min_height
     * @param {CachedMeshHandle | null} [cached_mesh_handle]
     */
    constructor(coords, max_height, min_height, cached_mesh_handle) {
        _assertClass(coords, TileXYZ);
        var ptr0 = coords.__destroy_into_raw();
        let ptr1 = 0;
        if (!isLikeNone(cached_mesh_handle)) {
            _assertClass(cached_mesh_handle, CachedMeshHandle);
            ptr1 = cached_mesh_handle.__destroy_into_raw();
        }
        const ret = wasm.transferabletile_new(ptr0, max_height, min_height, ptr1);
        this.__wbg_ptr = ret;
        TransferableTileFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
}
if (Symbol.dispose) TransferableTile.prototype[Symbol.dispose] = TransferableTile.prototype.free;

export class TransferableUintAttribute {
    static __wrap(ptr) {
        const obj = Object.create(TransferableUintAttribute.prototype);
        obj.__wbg_ptr = ptr;
        TransferableUintAttributeFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        TransferableUintAttributeFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_transferableuintattribute_free(ptr, 0);
    }
    /**
     * @returns {number}
     */
    get data() {
        const ret = wasm.__wbg_get_transferableuintattribute_data(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number}
     */
    get size() {
        const ret = wasm.__wbg_get_transferableuintattribute_size(this.__wbg_ptr);
        return ret;
    }
    /**
     * @param {number} arg0
     */
    set data(arg0) {
        wasm.__wbg_set_transferableuintattribute_data(this.__wbg_ptr, arg0);
    }
    /**
     * @param {number} arg0
     */
    set size(arg0) {
        wasm.__wbg_set_transferableuintattribute_size(this.__wbg_ptr, arg0);
    }
    /**
     * @param {number} data
     * @param {number} size
     */
    constructor(data, size) {
        const ret = wasm.transferableuintattribute_new(data, size);
        this.__wbg_ptr = ret;
        TransferableUintAttributeFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
}
if (Symbol.dispose) TransferableUintAttribute.prototype[Symbol.dispose] = TransferableUintAttribute.prototype.free;

export class Transform {
    static __wrap(ptr) {
        const obj = Object.create(Transform.prototype);
        obj.__wbg_ptr = ptr;
        TransformFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
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

export class UpsampleTerrainMeshParameters {
    static __wrap(ptr) {
        const obj = Object.create(UpsampleTerrainMeshParameters.prototype);
        obj.__wbg_ptr = ptr;
        UpsampleTerrainMeshParametersFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        UpsampleTerrainMeshParametersFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_upsampleterrainmeshparameters_free(ptr, 0);
    }
    /**
     * @returns {boolean}
     */
    get geographic() {
        const ret = wasm.__wbg_get_upsampleterrainmeshparameters_geographic(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * @returns {boolean}
     */
    get isQuantizedMesh() {
        const ret = wasm.__wbg_get_upsampleterrainmeshparameters_isQuantizedMesh(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * @returns {boolean}
     */
    get poleNorth() {
        const ret = wasm.__wbg_get_upsampleterrainmeshparameters_poleNorth(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * @returns {boolean}
     */
    get poleSouth() {
        const ret = wasm.__wbg_get_upsampleterrainmeshparameters_poleSouth(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * Multiplier for the automatically calculated skirt height.
     * @returns {number}
     */
    get skirtExaggeration() {
        const ret = wasm.__wbg_get_upsampleterrainmeshparameters_skirtExaggeration(this.__wbg_ptr);
        return ret;
    }
    /**
     * Whether to render skirts along tile boundaries.
     * @returns {boolean}
     */
    get skirt() {
        const ret = wasm.__wbg_get_upsampleterrainmeshparameters_skirt(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * The ancestor tile whose mesh is clipped down to `tile_handle`.
     * @returns {bigint}
     */
    get source_tile_handle() {
        const ret = wasm.__wbg_get_upsampleterrainmeshparameters_source_tile_handle(this.__wbg_ptr);
        return BigInt.asUintN(64, ret);
    }
    /**
     * @returns {bigint}
     */
    get tile_handle() {
        const ret = wasm.__wbg_get_upsampleterrainmeshparameters_tile_handle(this.__wbg_ptr);
        return BigInt.asUintN(64, ret);
    }
    /**
     * DEM tile width in pixels (raster DEM only).
     * @returns {number}
     */
    get tile_size() {
        const ret = wasm.__wbg_get_upsampleterrainmeshparameters_tile_size(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @returns {boolean}
     */
    get tms() {
        const ret = wasm.__wbg_get_upsampleterrainmeshparameters_tms(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * @param {boolean} arg0
     */
    set geographic(arg0) {
        wasm.__wbg_set_upsampleterrainmeshparameters_geographic(this.__wbg_ptr, arg0);
    }
    /**
     * @param {boolean} arg0
     */
    set isQuantizedMesh(arg0) {
        wasm.__wbg_set_upsampleterrainmeshparameters_isQuantizedMesh(this.__wbg_ptr, arg0);
    }
    /**
     * @param {boolean} arg0
     */
    set poleNorth(arg0) {
        wasm.__wbg_set_upsampleterrainmeshparameters_poleNorth(this.__wbg_ptr, arg0);
    }
    /**
     * @param {boolean} arg0
     */
    set poleSouth(arg0) {
        wasm.__wbg_set_upsampleterrainmeshparameters_poleSouth(this.__wbg_ptr, arg0);
    }
    /**
     * Multiplier for the automatically calculated skirt height.
     * @param {number} arg0
     */
    set skirtExaggeration(arg0) {
        wasm.__wbg_set_upsampleterrainmeshparameters_skirtExaggeration(this.__wbg_ptr, arg0);
    }
    /**
     * Whether to render skirts along tile boundaries.
     * @param {boolean} arg0
     */
    set skirt(arg0) {
        wasm.__wbg_set_upsampleterrainmeshparameters_skirt(this.__wbg_ptr, arg0);
    }
    /**
     * The ancestor tile whose mesh is clipped down to `tile_handle`.
     * @param {bigint} arg0
     */
    set source_tile_handle(arg0) {
        wasm.__wbg_set_upsampleterrainmeshparameters_source_tile_handle(this.__wbg_ptr, arg0);
    }
    /**
     * @param {bigint} arg0
     */
    set tile_handle(arg0) {
        wasm.__wbg_set_upsampleterrainmeshparameters_tile_handle(this.__wbg_ptr, arg0);
    }
    /**
     * DEM tile width in pixels (raster DEM only).
     * @param {number} arg0
     */
    set tile_size(arg0) {
        wasm.__wbg_set_upsampleterrainmeshparameters_tile_size(this.__wbg_ptr, arg0);
    }
    /**
     * @param {boolean} arg0
     */
    set tms(arg0) {
        wasm.__wbg_set_upsampleterrainmeshparameters_tms(this.__wbg_ptr, arg0);
    }
    /**
     * @param {bigint} tile_handle
     * @param {bigint} source_tile_handle
     * @param {number} tile_size
     * @param {boolean} skirt
     * @param {number} skirt_exaggeration
     */
    constructor(tile_handle, source_tile_handle, tile_size, skirt, skirt_exaggeration) {
        const ret = wasm.upsampleterrainmeshparameters_new(tile_handle, source_tile_handle, tile_size, skirt, skirt_exaggeration);
        this.__wbg_ptr = ret;
        UpsampleTerrainMeshParametersFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
}
if (Symbol.dispose) UpsampleTerrainMeshParameters.prototype[Symbol.dispose] = UpsampleTerrainMeshParameters.prototype.free;

export class UpsampleTerrainMeshResult {
    static __wrap(ptr) {
        const obj = Object.create(UpsampleTerrainMeshResult.prototype);
        obj.__wbg_ptr = ptr;
        UpsampleTerrainMeshResultFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        UpsampleTerrainMeshResultFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_upsampleterrainmeshresult_free(ptr, 0);
    }
    /**
     * @returns {TransferableGeometry}
     */
    get geometry() {
        const ret = wasm.__wbg_get_upsampleterrainmeshresult_geometry(this.__wbg_ptr);
        return TransferableGeometry.__wrap(ret);
    }
    /**
     * @returns {number}
     */
    get heights() {
        const ret = wasm.__wbg_get_upsampleterrainmeshresult_heights(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number}
     */
    get max_height() {
        const ret = wasm.__wbg_get_upsampleterrainmeshresult_max_height(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number}
     */
    get min_height() {
        const ret = wasm.__wbg_get_upsampleterrainmeshresult_min_height(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {Vec3 | undefined}
     */
    get rtc_translation() {
        const ret = wasm.__wbg_get_upsampleterrainmeshresult_rtc_translation(this.__wbg_ptr);
        return ret === 0 ? undefined : Vec3.__wrap(ret);
    }
    /**
     * @returns {number | undefined}
     */
    get watermask() {
        const ret = wasm.__wbg_get_upsampleterrainmeshresult_watermask(this.__wbg_ptr);
        return ret === Number.MAX_SAFE_INTEGER ? undefined : ret;
    }
    /**
     * @param {TransferableGeometry} arg0
     */
    set geometry(arg0) {
        _assertClass(arg0, TransferableGeometry);
        var ptr0 = arg0.__destroy_into_raw();
        wasm.__wbg_set_upsampleterrainmeshresult_geometry(this.__wbg_ptr, ptr0);
    }
    /**
     * @param {number} arg0
     */
    set heights(arg0) {
        wasm.__wbg_set_upsampleterrainmeshresult_heights(this.__wbg_ptr, arg0);
    }
    /**
     * @param {number} arg0
     */
    set max_height(arg0) {
        wasm.__wbg_set_upsampleterrainmeshresult_max_height(this.__wbg_ptr, arg0);
    }
    /**
     * @param {number} arg0
     */
    set min_height(arg0) {
        wasm.__wbg_set_upsampleterrainmeshresult_min_height(this.__wbg_ptr, arg0);
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
        wasm.__wbg_set_upsampleterrainmeshresult_rtc_translation(this.__wbg_ptr, ptr0);
    }
    /**
     * @param {number | null} [arg0]
     */
    set watermask(arg0) {
        wasm.__wbg_set_upsampleterrainmeshresult_watermask(this.__wbg_ptr, isLikeNone(arg0) ? Number.MAX_SAFE_INTEGER : (arg0) >> 0);
    }
    /**
     * @param {TransferableGeometry} geometry
     * @param {number} heights
     * @param {number} min_height
     * @param {number} max_height
     * @param {Vec3 | null} [rtc_translation]
     */
    constructor(geometry, heights, min_height, max_height, rtc_translation) {
        _assertClass(geometry, TransferableGeometry);
        var ptr0 = geometry.__destroy_into_raw();
        let ptr1 = 0;
        if (!isLikeNone(rtc_translation)) {
            _assertClass(rtc_translation, Vec3);
            ptr1 = rtc_translation.__destroy_into_raw();
        }
        const ret = wasm.upsampleterrainmeshresult_new(ptr0, heights, min_height, max_height, ptr1);
        this.__wbg_ptr = ret;
        UpsampleTerrainMeshResultFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
}
if (Symbol.dispose) UpsampleTerrainMeshResult.prototype[Symbol.dispose] = UpsampleTerrainMeshResult.prototype.free;

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

/**
 * A `vector` layer references a `geojson` or `vector-tile` source and renders
 * its features with the given per-geometry materials.
 */
export class VectorLayerDescription {
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        VectorLayerDescriptionFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_vectorlayerdescription_free(ptr, 0);
    }
    /**
     * @returns {BillboardMaterial | undefined}
     */
    get billboard() {
        const ret = wasm.__wbg_get_vectorlayerdescription_billboard(this.__wbg_ptr);
        return ret === 0 ? undefined : BillboardMaterial.__wrap(ret);
    }
    /**
     * @returns {PointMaterial | undefined}
     */
    get point() {
        const ret = wasm.__wbg_get_vectorlayerdescription_point(this.__wbg_ptr);
        return ret === 0 ? undefined : PointMaterial.__wrap(ret);
    }
    /**
     * @returns {PolygonMaterial | undefined}
     */
    get polygon() {
        const ret = wasm.__wbg_get_vectorlayerdescription_polygon(this.__wbg_ptr);
        return ret === 0 ? undefined : PolygonMaterial.__wrap(ret);
    }
    /**
     * @returns {PolylineMaterial | undefined}
     */
    get polyline() {
        const ret = wasm.__wbg_get_vectorlayerdescription_polyline(this.__wbg_ptr);
        return ret === 0 ? undefined : PolylineMaterial.__wrap(ret);
    }
    /**
     * For vector-tile sources: which source layers within the tileset to
     * render (MapLibre's `source-layer`). Ignored for GeoJSON sources.
     * @returns {string[] | undefined}
     */
    get sourceLayers() {
        const ret = wasm.__wbg_get_vectorlayerdescription_sourceLayers(this.__wbg_ptr);
        let v1;
        if (ret[0] !== 0) {
            v1 = getArrayJsValueFromWasm0(ret[0], ret[1]).slice();
            wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        }
        return v1;
    }
    /**
     * The id of the source this layer renders (from `addSource`).
     * @returns {string | undefined}
     */
    get source() {
        const ret = wasm.__wbg_get_vectorlayerdescription_source(this.__wbg_ptr);
        let v1;
        if (ret[0] !== 0) {
            v1 = getStringFromWasm0(ret[0], ret[1]).slice();
            wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        }
        return v1;
    }
    /**
     * @returns {TextMaterial | undefined}
     */
    get text() {
        const ret = wasm.__wbg_get_vectorlayerdescription_text(this.__wbg_ptr);
        return ret === 0 ? undefined : TextMaterial.__wrap(ret);
    }
    /**
     * @returns {string | undefined}
     */
    get type() {
        const ret = wasm.__wbg_get_vectorlayerdescription_type(this.__wbg_ptr);
        let v1;
        if (ret[0] !== 0) {
            v1 = getStringFromWasm0(ret[0], ret[1]).slice();
            wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        }
        return v1;
    }
    /**
     * @param {BillboardMaterial | null} [arg0]
     */
    set billboard(arg0) {
        let ptr0 = 0;
        if (!isLikeNone(arg0)) {
            _assertClass(arg0, BillboardMaterial);
            ptr0 = arg0.__destroy_into_raw();
        }
        wasm.__wbg_set_vectorlayerdescription_billboard(this.__wbg_ptr, ptr0);
    }
    /**
     * @param {PointMaterial | null} [arg0]
     */
    set point(arg0) {
        let ptr0 = 0;
        if (!isLikeNone(arg0)) {
            _assertClass(arg0, PointMaterial);
            ptr0 = arg0.__destroy_into_raw();
        }
        wasm.__wbg_set_vectorlayerdescription_point(this.__wbg_ptr, ptr0);
    }
    /**
     * @param {PolygonMaterial | null} [arg0]
     */
    set polygon(arg0) {
        let ptr0 = 0;
        if (!isLikeNone(arg0)) {
            _assertClass(arg0, PolygonMaterial);
            ptr0 = arg0.__destroy_into_raw();
        }
        wasm.__wbg_set_vectorlayerdescription_polygon(this.__wbg_ptr, ptr0);
    }
    /**
     * @param {PolylineMaterial | null} [arg0]
     */
    set polyline(arg0) {
        let ptr0 = 0;
        if (!isLikeNone(arg0)) {
            _assertClass(arg0, PolylineMaterial);
            ptr0 = arg0.__destroy_into_raw();
        }
        wasm.__wbg_set_vectorlayerdescription_polyline(this.__wbg_ptr, ptr0);
    }
    /**
     * For vector-tile sources: which source layers within the tileset to
     * render (MapLibre's `source-layer`). Ignored for GeoJSON sources.
     * @param {string[] | null} [arg0]
     */
    set sourceLayers(arg0) {
        var ptr0 = isLikeNone(arg0) ? 0 : passArrayJsValueToWasm0(arg0, wasm.__wbindgen_malloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_vectorlayerdescription_sourceLayers(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * The id of the source this layer renders (from `addSource`).
     * @param {string | null} [arg0]
     */
    set source(arg0) {
        var ptr0 = isLikeNone(arg0) ? 0 : passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_vectorlayerdescription_source(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @param {TextMaterial | null} [arg0]
     */
    set text(arg0) {
        let ptr0 = 0;
        if (!isLikeNone(arg0)) {
            _assertClass(arg0, TextMaterial);
            ptr0 = arg0.__destroy_into_raw();
        }
        wasm.__wbg_set_vectorlayerdescription_text(this.__wbg_ptr, ptr0);
    }
    /**
     * @param {string | null} [arg0]
     */
    set type(arg0) {
        var ptr0 = isLikeNone(arg0) ? 0 : passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_vectorlayerdescription_type(this.__wbg_ptr, ptr0, len0);
    }
}
if (Symbol.dispose) VectorLayerDescription.prototype[Symbol.dispose] = VectorLayerDescription.prototype.free;

export class VectorTileSourceDescription {
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        VectorTileSourceDescriptionFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_vectortilesourcedescription_free(ptr, 0);
    }
    /**
     * @returns {string | undefined}
     */
    get crs() {
        const ret = wasm.__wbg_get_vectortilesourcedescription_crs(this.__wbg_ptr);
        let v1;
        if (ret[0] !== 0) {
            v1 = getStringFromWasm0(ret[0], ret[1]).slice();
            wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        }
        return v1;
    }
    /**
     * Per-layer horizon dynamic-SSE relaxation strength (`0.0` off … `1.0`
     * raster-equivalent). Omit for a content-based default.
     * @returns {number | undefined}
     */
    get dynamicSseScale() {
        const ret = wasm.__wbg_get_vectortilesourcedescription_dynamicSseScale(this.__wbg_ptr);
        return ret === Number.MAX_SAFE_INTEGER ? undefined : ret;
    }
    /**
     * @returns {number | undefined}
     */
    get maxSse() {
        const ret = wasm.__wbg_get_vectortilesourcedescription_maxSse(this.__wbg_ptr);
        return ret === Number.MAX_SAFE_INTEGER ? undefined : ret;
    }
    /**
     * @returns {number | undefined}
     */
    get maxZoom() {
        const ret = wasm.__wbg_get_vectortilesourcedescription_maxZoom(this.__wbg_ptr);
        return ret === Number.MAX_SAFE_INTEGER ? undefined : ret;
    }
    /**
     * @returns {number | undefined}
     */
    get minZoom() {
        const ret = wasm.__wbg_get_vectortilesourcedescription_minZoom(this.__wbg_ptr);
        return ret === Number.MAX_SAFE_INTEGER ? undefined : ret;
    }
    /**
     * @returns {number | undefined}
     */
    get overscaledMaxZoom() {
        const ret = wasm.__wbg_get_vectortilesourcedescription_overscaledMaxZoom(this.__wbg_ptr);
        return ret === Number.MAX_SAFE_INTEGER ? undefined : ret;
    }
    /**
     * @returns {string | undefined}
     */
    get type() {
        const ret = wasm.__wbg_get_vectortilesourcedescription_type(this.__wbg_ptr);
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
    get url() {
        const ret = wasm.__wbg_get_vectortilesourcedescription_url(this.__wbg_ptr);
        let v1;
        if (ret[0] !== 0) {
            v1 = getStringFromWasm0(ret[0], ret[1]).slice();
            wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        }
        return v1;
    }
    /**
     * @param {string | null} [arg0]
     */
    set crs(arg0) {
        var ptr0 = isLikeNone(arg0) ? 0 : passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_vectortilesourcedescription_crs(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * Per-layer horizon dynamic-SSE relaxation strength (`0.0` off … `1.0`
     * raster-equivalent). Omit for a content-based default.
     * @param {number | null} [arg0]
     */
    set dynamicSseScale(arg0) {
        wasm.__wbg_set_vectortilesourcedescription_dynamicSseScale(this.__wbg_ptr, isLikeNone(arg0) ? Number.MAX_SAFE_INTEGER : Math.fround(arg0));
    }
    /**
     * @param {number | null} [arg0]
     */
    set maxSse(arg0) {
        wasm.__wbg_set_vectortilesourcedescription_maxSse(this.__wbg_ptr, isLikeNone(arg0) ? Number.MAX_SAFE_INTEGER : Math.fround(arg0));
    }
    /**
     * @param {number | null} [arg0]
     */
    set maxZoom(arg0) {
        wasm.__wbg_set_vectortilesourcedescription_maxZoom(this.__wbg_ptr, isLikeNone(arg0) ? Number.MAX_SAFE_INTEGER : (arg0) >>> 0);
    }
    /**
     * @param {number | null} [arg0]
     */
    set minZoom(arg0) {
        wasm.__wbg_set_vectortilesourcedescription_minZoom(this.__wbg_ptr, isLikeNone(arg0) ? Number.MAX_SAFE_INTEGER : (arg0) >>> 0);
    }
    /**
     * @param {number | null} [arg0]
     */
    set overscaledMaxZoom(arg0) {
        wasm.__wbg_set_vectortilesourcedescription_overscaledMaxZoom(this.__wbg_ptr, isLikeNone(arg0) ? Number.MAX_SAFE_INTEGER : (arg0) >>> 0);
    }
    /**
     * @param {string | null} [arg0]
     */
    set type(arg0) {
        var ptr0 = isLikeNone(arg0) ? 0 : passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_vectortilesourcedescription_type(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @param {string | null} [arg0]
     */
    set url(arg0) {
        var ptr0 = isLikeNone(arg0) ? 0 : passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_vectortilesourcedescription_url(this.__wbg_ptr, ptr0, len0);
    }
}
if (Symbol.dispose) VectorTileSourceDescription.prototype[Symbol.dispose] = VectorTileSourceDescription.prototype.free;

/**
 * One WebMercator texturized-vector tile to drape on a terrain tile (one per
 * overlapping WM vector tile per layer). `uv_offset`/`uv_scale` place this tile's
 * offscreen scene into the terrain tile's `[0, 1]` UV; `reproject_terrain_lat` is
 * `[south, north]` (radians) on Geographic terrain (Mercator reprojection) or empty
 * on WebMercator terrain (identity drape).
 */
export class VectorTileState {
    static __wrap(ptr) {
        const obj = Object.create(VectorTileState.prototype);
        obj.__wbg_ptr = ptr;
        VectorTileStateFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        VectorTileStateFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_vectortilestate_free(ptr, 0);
    }
    /**
     * @returns {string}
     */
    get layer_id() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.__wbg_get_vectortilestate_layer_id(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * @returns {Float32Array}
     */
    get reproject_terrain_lat() {
        const ret = wasm.__wbg_get_vectortilestate_reproject_terrain_lat(this.__wbg_ptr);
        var v1 = getArrayF32FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v1;
    }
    /**
     * @returns {bigint}
     */
    get tile_handle() {
        const ret = wasm.__wbg_get_vectortilestate_tile_handle(this.__wbg_ptr);
        return BigInt.asUintN(64, ret);
    }
    /**
     * @returns {Float32Array}
     */
    get uv_offset() {
        const ret = wasm.__wbg_get_vectortilestate_uv_offset(this.__wbg_ptr);
        var v1 = getArrayF32FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v1;
    }
    /**
     * @returns {Float32Array}
     */
    get uv_scale() {
        const ret = wasm.__wbg_get_vectortilestate_uv_scale(this.__wbg_ptr);
        var v1 = getArrayF32FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v1;
    }
    /**
     * @param {string} arg0
     */
    set layer_id(arg0) {
        const ptr0 = passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_vectortilestate_layer_id(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @param {Float32Array} arg0
     */
    set reproject_terrain_lat(arg0) {
        const ptr0 = passArrayF32ToWasm0(arg0, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_vectortilestate_reproject_terrain_lat(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @param {bigint} arg0
     */
    set tile_handle(arg0) {
        wasm.__wbg_set_vectortilestate_tile_handle(this.__wbg_ptr, arg0);
    }
    /**
     * @param {Float32Array} arg0
     */
    set uv_offset(arg0) {
        const ptr0 = passArrayF32ToWasm0(arg0, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_vectortilestate_uv_offset(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @param {Float32Array} arg0
     */
    set uv_scale(arg0) {
        const ptr0 = passArrayF32ToWasm0(arg0, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_vectortilestate_uv_scale(this.__wbg_ptr, ptr0, len0);
    }
}
if (Symbol.dispose) VectorTileState.prototype[Symbol.dispose] = VectorTileState.prototype.free;

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

export class WorkerTaskDelegatedEvent {
    static __wrap(ptr) {
        const obj = Object.create(WorkerTaskDelegatedEvent.prototype);
        obj.__wbg_ptr = ptr;
        WorkerTaskDelegatedEventFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        WorkerTaskDelegatedEventFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_workertaskdelegatedevent_free(ptr, 0);
    }
    /**
     * @returns {bigint}
     */
    get bits() {
        const ret = wasm.__wbg_get_workertaskdelegatedevent_bits(this.__wbg_ptr);
        return BigInt.asUintN(64, ret);
    }
    /**
     * @returns {number}
     */
    get gen() {
        const ret = wasm.__wbg_get_workertaskdelegatedevent_gen(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @returns {number}
     */
    get ind() {
        const ret = wasm.__wbg_get_workertaskdelegatedevent_ind(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * Dispatch urgency: 0 is the most urgent (see `Priority::rank`). The
     * platform keeps its pending stack sorted by this so a terrain mesh task
     * overtakes older, less urgent work waiting for a worker.
     * @returns {number}
     */
    get priority() {
        const ret = wasm.__wbg_get_workertaskdelegatedevent_priority(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {DelegatedWorkerTasksParameters}
     */
    get task() {
        const ret = wasm.__wbg_get_workertaskdelegatedevent_task(this.__wbg_ptr);
        return DelegatedWorkerTasksParameters.__wrap(ret);
    }
    /**
     * @param {bigint} arg0
     */
    set bits(arg0) {
        wasm.__wbg_set_workertaskdelegatedevent_bits(this.__wbg_ptr, arg0);
    }
    /**
     * @param {number} arg0
     */
    set gen(arg0) {
        wasm.__wbg_set_workertaskdelegatedevent_gen(this.__wbg_ptr, arg0);
    }
    /**
     * @param {number} arg0
     */
    set ind(arg0) {
        wasm.__wbg_set_workertaskdelegatedevent_ind(this.__wbg_ptr, arg0);
    }
    /**
     * Dispatch urgency: 0 is the most urgent (see `Priority::rank`). The
     * platform keeps its pending stack sorted by this so a terrain mesh task
     * overtakes older, less urgent work waiting for a worker.
     * @param {number} arg0
     */
    set priority(arg0) {
        wasm.__wbg_set_workertaskdelegatedevent_priority(this.__wbg_ptr, arg0);
    }
    /**
     * @param {DelegatedWorkerTasksParameters} arg0
     */
    set task(arg0) {
        _assertClass(arg0, DelegatedWorkerTasksParameters);
        var ptr0 = arg0.__destroy_into_raw();
        wasm.__wbg_set_workertaskdelegatedevent_task(this.__wbg_ptr, ptr0);
    }
}
if (Symbol.dispose) WorkerTaskDelegatedEvent.prototype[Symbol.dispose] = WorkerTaskDelegatedEvent.prototype.free;

/**
 * @returns {string}
 */
export function generateId() {
    let deferred1_0;
    let deferred1_1;
    try {
        const ret = wasm.generateId();
        deferred1_0 = ret[0];
        deferred1_1 = ret[1];
        return getStringFromWasm0(ret[0], ret[1]);
    } finally {
        wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
    }
}

/**
 * WebMercator northing `ln(tan(lat/2 + π/4))` for a latitude in radians,
 * clamped to the valid WebMercator band (~±85.05°).
 *
 * Exported so the web composite paste (`mutates.ts`) derives its per-slot
 * reprojection constants from the same clamped math the Rust bake affine uses
 * (`uv_rect_from_extents_mercator`) — the two sides must agree or the pasted
 * latitude band drifts off the baked render target. A TS reimplementation
 * also returned NaN for the unclamped polar band (±90° as f32), which
 * silently disabled reprojection via the shader's span guard.
 * @param {number} lat
 * @returns {number}
 */
export function mercatorY(lat) {
    const ret = wasm.mercatorY(lat);
    return ret;
}

/**
 * @param {bigint} child
 * @param {bigint} parent
 * @returns {OrthoCamTransform}
 */
export function orthoCameraTransform(child, parent) {
    const ret = wasm.orthoCameraTransform(child, parent);
    return OrthoCamTransform.__wrap(ret);
}

export function start() {
    wasm.start();
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
        __wbg___wbindgen_is_string_e6f02f0ea5f20a32: function(arg0) {
            const ret = typeof(arg0) === 'string';
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
        __wbg_call_0f2a9af232c18fd2: function() { return handleError(function (arg0, arg1, arg2, arg3) {
            const ret = arg0.call(arg1, arg2, arg3);
            return ret;
        }, arguments); },
        __wbg_call_1c5886ab9c57d1c7: function() { return handleError(function (arg0, arg1) {
            const ret = arg0.call(arg1);
            return ret;
        }, arguments); },
        __wbg_call_35dba3c747ad7521: function() { return handleError(function (arg0, arg1, arg2) {
            const ret = arg0.call(arg1, arg2);
            return ret;
        }, arguments); },
        __wbg_call_39f824e18d9d2414: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4) {
            const ret = arg0.call(arg1, arg2, arg3, arg4);
            return ret;
        }, arguments); },
        __wbg_cameraflightendedevent_new: function(arg0) {
            const ret = CameraFlightEndedEvent.__wrap(arg0);
            return ret;
        },
        __wbg_datarequesterremovedevent_new: function(arg0) {
            const ret = DataRequesterRemovedEvent.__wrap(arg0);
            return ret;
        },
        __wbg_datarequestevent_new: function(arg0) {
            const ret = DataRequestEvent.__wrap(arg0);
            return ret;
        },
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
        __wbg_entityevent_new: function(arg0) {
            const ret = EntityEvent.__wrap(arg0);
            return ret;
        },
        __wbg_entries_7774d489e1da5f4f: function(arg0) {
            const ret = Object.entries(arg0);
            return ret;
        },
        __wbg_getRandomValues_436a51d0629d84e1: function() { return handleError(function (arg0, arg1) {
            globalThis.crypto.getRandomValues(getArrayU8FromWasm0(arg0, arg1));
        }, arguments); },
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
        __wbg_hillshadebackfilledevent_new: function(arg0) {
            const ret = HillshadeBackfilledEvent.__wrap(arg0);
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
        __wbg_log_d65e71c48ae3cbbb: function(arg0, arg1) {
            console.log(getStringFromWasm0(arg0, arg1));
        },
        __wbg_meshadded_new: function(arg0) {
            const ret = MeshAdded.__wrap(arg0);
            return ret;
        },
        __wbg_meshchanged_new: function(arg0) {
            const ret = MeshChanged.__wrap(arg0);
            return ret;
        },
        __wbg_meshgeometryreplaced_new: function(arg0) {
            const ret = MeshGeometryReplaced.__wrap(arg0);
            return ret;
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
        __wbg_new_with_byte_offset_and_length_1aca16330a3ebb0a: function(arg0, arg1, arg2) {
            const ret = new Float32Array(arg0, arg1 >>> 0, arg2 >>> 0);
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
        __wbg_new_with_length_2ccc5dbfb4541247: function(arg0) {
            const ret = new Array(arg0 >>> 0);
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
        __wbg_objecttransformevent_new: function(arg0) {
            const ret = ObjectTransformEvent.__wrap(arg0);
            return ret;
        },
        __wbg_prototypesetcall_de8e0d9553586985: function(arg0, arg1, arg2) {
            Uint8Array.prototype.set.call(getArrayU8FromWasm0(arg0, arg1), arg2);
        },
        __wbg_push_adb0107829f02d75: function(arg0, arg1) {
            const ret = arg0.push(arg1);
            return ret;
        },
        __wbg_rastertilestate_new: function(arg0) {
            const ret = RasterTileState.__wrap(arg0);
            return ret;
        },
        __wbg_renderablefeatureaddedevent_new: function(arg0) {
            const ret = RenderableFeatureAddedEvent.__wrap(arg0);
            return ret;
        },
        __wbg_renderablefeaturechangedevent_new: function(arg0) {
            const ret = RenderableFeatureChangedEvent.__wrap(arg0);
            return ret;
        },
        __wbg_renderablefeatureremovedevent_new: function(arg0) {
            const ret = RenderableFeatureRemovedEvent.__wrap(arg0);
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
        __wbg_terrainheightrangeupdatedevent_new: function(arg0) {
            const ret = TerrainHeightRangeUpdatedEvent.__wrap(arg0);
            return ret;
        },
        __wbg_terrainheightupdatedevent_new: function(arg0) {
            const ret = TerrainHeightUpdatedEvent.__wrap(arg0);
            return ret;
        },
        __wbg_texturefragment_new: function(arg0) {
            const ret = TextureFragment.__wrap(arg0);
            return ret;
        },
        __wbg_texturefragmentrequestedevent_new: function(arg0) {
            const ret = TextureFragmentRequestedEvent.__wrap(arg0);
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
        __wbg_vectortilestate_new: function(arg0) {
            const ret = VectorTileState.__wrap(arg0);
            return ret;
        },
        __wbg_workertaskdelegatedevent_new: function(arg0) {
            const ret = WorkerTaskDelegatedEvent.__wrap(arg0);
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
        "./navara_wasm_bg.js": import0,
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
const BillboardMeshFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_billboardmesh_free(ptr, 1));
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
const ConstructPolygonBatchedFeatureParametersFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_constructpolygonbatchedfeatureparameters_free(ptr, 1));
const ConstructPolygonBatchedFeatureResultFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_constructpolygonbatchedfeatureresult_free(ptr, 1));
const ConstructPolylineBatchedFeatureParametersFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_constructpolylinebatchedfeatureparameters_free(ptr, 1));
const ConstructPolylineBatchedFeatureResultFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_constructpolylinebatchedfeatureresult_free(ptr, 1));
const ConstructTerrainMeshParametersFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_constructterrainmeshparameters_free(ptr, 1));
const ConstructTerrainMeshResultFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_constructterrainmeshresult_free(ptr, 1));
const ConstructedPolygonGeometryFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_constructedpolygongeometry_free(ptr, 1));
const ConstructedPolygonOutlineGeometryFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_constructedpolygonoutlinegeometry_free(ptr, 1));
const ConstructedPolylineGeometryFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_constructedpolylinegeometry_free(ptr, 1));
const CoreFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_core_free(ptr, 1));
const DataRequestEventFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_datarequestevent_free(ptr, 1));
const DataRequesterRemovedEventFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_datarequesterremovedevent_free(ptr, 1));
const DelegatedWorkerTasksParametersFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_delegatedworkertasksparameters_free(ptr, 1));
const DelegatedWorkerTasksResultFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_delegatedworkertasksresult_free(ptr, 1));
const DracoAttributeIdFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_dracoattributeid_free(ptr, 1));
const DynamicSseFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_dynamicsse_free(ptr, 1));
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
const EntityEventFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_entityevent_free(ptr, 1));
const EventsFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_events_free(ptr, 1));
const ExtentRadianF32Finalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_extentradianf32_free(ptr, 1));
const FloatAttributeFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_floatattribute_free(ptr, 1));
const GeoJsonSourceDescriptionFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_geojsonsourcedescription_free(ptr, 1));
const GeometryFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_geometry_free(ptr, 1));
const GlobeFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_globe_free(ptr, 1));
const HillshadeBackfilledEventFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_hillshadebackfilledevent_free(ptr, 1));
const HillshadeMaterialFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_hillshadematerial_free(ptr, 1));
const LLEFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_lle_free(ptr, 1));
const LayerDescriptionFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_layerdescription_free(ptr, 1));
const MemoryStatsFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_memorystats_free(ptr, 1));
const MeshFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_mesh_free(ptr, 1));
const MeshAddedFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_meshadded_free(ptr, 1));
const MeshChangedFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_meshchanged_free(ptr, 1));
const MeshGeometryReplacedFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_meshgeometryreplaced_free(ptr, 1));
const ModelInternalMaterialFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_modelinternalmaterial_free(ptr, 1));
const ModelMaterialFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_modelmaterial_free(ptr, 1));
const ModelMeshFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_modelmesh_free(ptr, 1));
const NearFarFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_nearfar_free(ptr, 1));
const ObjectTransformEventFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_objecttransformevent_free(ptr, 1));
const OrthoCamTransformFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_orthocamtransform_free(ptr, 1));
const OverscaledTileHandleFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_overscaledtilehandle_free(ptr, 1));
const ParseMvtTileParametersFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_parsemvttileparameters_free(ptr, 1));
const ParseMvtTileResultFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_parsemvttileresult_free(ptr, 1));
const PlaneFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_plane_free(ptr, 1));
const PointMaterialFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_pointmaterial_free(ptr, 1));
const PointMeshFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_pointmesh_free(ptr, 1));
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
const PolygonMeshFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_polygonmesh_free(ptr, 1));
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
const PolylineMeshFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_polylinemesh_free(ptr, 1));
const QuantizedMeshSourceDescriptionFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_quantizedmeshsourcedescription_free(ptr, 1));
const RasterDemSourceDescriptionFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_rasterdemsourcedescription_free(ptr, 1));
const RasterLayerDescriptionFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_rasterlayerdescription_free(ptr, 1));
const RasterMaterialFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_rastermaterial_free(ptr, 1));
const RasterTileInternalMaterialFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_rastertileinternalmaterial_free(ptr, 1));
const RasterTileSourceDescriptionFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_rastertilesourcedescription_free(ptr, 1));
const RasterTileStateFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_rastertilestate_free(ptr, 1));
const RayFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_ray_free(ptr, 1));
const ReconstructableEntityFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_reconstructableentity_free(ptr, 1));
const RenderableFeatureFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_renderablefeature_free(ptr, 1));
const RenderableFeatureAddedEventFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_renderablefeatureaddedevent_free(ptr, 1));
const RenderableFeatureChangedEventFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_renderablefeaturechangedevent_free(ptr, 1));
const RenderableFeatureRemovedEventFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_renderablefeatureremovedevent_free(ptr, 1));
const ReturnedConstructedTerrainMeshFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_returnedconstructedterrainmesh_free(ptr, 1));
const ReturnedTransferablePolygonBatchedFeatureFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_returnedtransferablepolygonbatchedfeature_free(ptr, 1));
const ReturnedTransferablePolylineBatchedFeatureFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_returnedtransferablepolylinebatchedfeature_free(ptr, 1));
const SourceDataFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_sourcedata_free(ptr, 1));
const SourceDescriptionFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_sourcedescription_free(ptr, 1));
const TerrainHeightRangeUpdatedEventFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_terrainheightrangeupdatedevent_free(ptr, 1));
const TerrainHeightUpdatedEventFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_terrainheightupdatedevent_free(ptr, 1));
const TerrainMaterialFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_terrainmaterial_free(ptr, 1));
const TerrainSourceLayerDescriptionFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_terrainsourcelayerdescription_free(ptr, 1));
const TextMaterialFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_textmaterial_free(ptr, 1));
const TextMeshFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_textmesh_free(ptr, 1));
const TextureFragmentFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_texturefragment_free(ptr, 1));
const TextureFragmentRequestedEventFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_texturefragmentrequestedevent_free(ptr, 1));
const TileUvTransformFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_tileuvtransform_free(ptr, 1));
const TileXYZFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_tilexyz_free(ptr, 1));
const Tiles3dLayerDescriptionFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_tiles3dlayerdescription_free(ptr, 1));
const Tiles3dSourceDescriptionFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_tiles3dsourcedescription_free(ptr, 1));
const TransferableFloatAttributeFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_transferablefloatattribute_free(ptr, 1));
const TransferableGeometryFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_transferablegeometry_free(ptr, 1));
const TransferableHierarchyFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_transferablehierarchy_free(ptr, 1));
const TransferableHolesFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_transferableholes_free(ptr, 1));
const TransferableMartiniFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_transferablemartini_free(ptr, 1));
const TransferableModelGeometryFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_transferablemodelgeometry_free(ptr, 1));
const TransferableParsedMvtResultFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_transferableparsedmvtresult_free(ptr, 1));
const TransferablePointGeometryFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_transferablepointgeometry_free(ptr, 1));
const TransferablePolygonBatchedFeatureFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_transferablepolygonbatchedfeature_free(ptr, 1));
const TransferablePolygonGeometryFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_transferablepolygongeometry_free(ptr, 1));
const TransferablePolygonOutlineGeometryFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_transferablepolygonoutlinegeometry_free(ptr, 1));
const TransferablePolylineBatchedFeatureFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_transferablepolylinebatchedfeature_free(ptr, 1));
const TransferablePolylineGeometryFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_transferablepolylinegeometry_free(ptr, 1));
const TransferableRasterDEMDataFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_transferablerasterdemdata_free(ptr, 1));
const TransferableTileFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_transferabletile_free(ptr, 1));
const TransferableUintAttributeFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_transferableuintattribute_free(ptr, 1));
const TransformFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_transform_free(ptr, 1));
const UintAttributeFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_uintattribute_free(ptr, 1));
const UpsamplableTerrainGeometryFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_upsamplableterraingeometry_free(ptr, 1));
const UpsampleTerrainMeshParametersFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_upsampleterrainmeshparameters_free(ptr, 1));
const UpsampleTerrainMeshResultFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_upsampleterrainmeshresult_free(ptr, 1));
const Vec2Finalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_vec2_free(ptr, 1));
const Vec3Finalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_vec3_free(ptr, 1));
const VectorLayerDescriptionFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_vectorlayerdescription_free(ptr, 1));
const VectorTileSourceDescriptionFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_vectortilesourcedescription_free(ptr, 1));
const VectorTileStateFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_vectortilestate_free(ptr, 1));
const WindingOrderFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_windingorder_free(ptr, 1));
const WindowFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_window_free(ptr, 1));
const WorkerTaskDelegatedEventFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_workertaskdelegatedevent_free(ptr, 1));

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

function getArrayI32FromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return getInt32ArrayMemory0().subarray(ptr / 4, ptr / 4 + len);
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

let cachedInt32ArrayMemory0 = null;
function getInt32ArrayMemory0() {
    if (cachedInt32ArrayMemory0 === null || cachedInt32ArrayMemory0.byteLength === 0) {
        cachedInt32ArrayMemory0 = new Int32Array(wasm.memory.buffer);
    }
    return cachedInt32ArrayMemory0;
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
    cachedInt32ArrayMemory0 = null;
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
        module_or_path = new URL('navara_wasm_bg.wasm', import.meta.url);
    }
    const imports = __wbg_get_imports();

    if (typeof module_or_path === 'string' || (typeof Request === 'function' && module_or_path instanceof Request) || (typeof URL === 'function' && module_or_path instanceof URL)) {
        module_or_path = fetch(module_or_path);
    }

    const { instance, module } = await __wbg_load(await module_or_path, imports);

    return __wbg_finalize_init(instance, module);
}

export { initSync, __wbg_init as default };
