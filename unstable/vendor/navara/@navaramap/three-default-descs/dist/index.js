import { CLOUD_LOCAL_WEATHER_URL as e, CLOUD_SHAPE_DETAIL_URL as t, CLOUD_SHAPE_URL as n, CLOUD_TURBULENCE_URL as r, Color as i, CustomEffectPass as a, DrapedMesh as o, Effect as s, EffectDesc as c, EventHandler as l, InstancedMeshDesc as u, LightDesc as d, MeshDesc as f, MeshDescWithSelectiveEffect as p, Pass as m, PickableInstancedMeshWrapper as h, PickableMeshWrapper as g, PickableMultiInstancedMeshWrapper as _, RTE_ONE_UNIFORM as v, SKY_RENDER_ORDER as y, STARS_ASSETS_URL as b, STARS_RENDER_ORDER as x, STBN_URL as ee, SelectiveEffectDesc as S, assertNoTransformConflict as te, blendFunction as ne, buildPolygonGeometry as re, buildPolylineGeometry as ie, calcCameraPosition as ae, calcModelMatrixRTE as oe, composeWorldMatrixForRTE as se, createFullscreenQuad as ce, createGltfLoader as le, createPolygonMaterialEnhancer as ue, createPolylineMaterialEnhancer as de, createReplacer as fe, createShadowDepthMaterial as pe, createShadowMapDepthEnhancer as me, degreeToRadian as he, eastNorthUpToFixedFrame as ge, encodePositionRTE as _e, geodeticToVector3 as ve, getWGS84EccentricitySquared as ye, getWGS84Flattening as be, getWGS84SemiMajorAxis as xe, mergeGeodetic as Se, polygonGroundVolume as Ce, polylineGroundVolume as we, setDrapeGroundNormals as Te, setupMaterialForMRT as Ee, setupRTEBeforeRender as De, setupRTECallback as Oe, setupSelectiveEffectUniforms as ke, vector3ToGeodetic as Ae } from "@navaramap/three";
import { AmbientLight as je, AnimationMixer as Me, ArrowHelper as Ne, AxesHelper as Pe, BackSide as Fe, Box3 as Ie, Box3Helper as Le, BoxGeometry as Re, BufferAttribute as C, BufferGeometry as ze, ByteType as Be, Cache as Ve, Camera as He, CanvasTexture as Ue, CatmullRomCurve3 as We, ClampToEdgeWrapping as Ge, Color as w, CylinderGeometry as Ke, Data3DTexture as qe, DataTexture as Je, DepthTexture as Ye, DirectionalLight as Xe, DoubleSide as Ze, Euler as Qe, EventDispatcher as $e, FileLoader as et, Float32BufferAttribute as tt, FloatType as nt, Frustum as rt, GLSL3 as it, Group as at, HalfFloatType as ot, InstancedBufferAttribute as st, InstancedBufferGeometry as ct, InstancedInterleavedBuffer as lt, InstancedMesh as ut, IntType as dt, InterleavedBuffer as ft, InterleavedBufferAttribute as pt, LightProbe as mt, Line3 as ht, LineBasicMaterial as gt, LineSegments as _t, LinearFilter as T, LinearMipMapLinearFilter as vt, LinearMipmapLinearFilter as yt, LinearSRGBColorSpace as bt, Loader as xt, LoopOnce as St, LoopRepeat as Ct, Material as wt, MathUtils as Tt, Matrix3 as Et, Matrix4 as E, Mesh as D, MeshBasicMaterial as Dt, MeshLambertMaterial as Ot, NearestFilter as kt, NoBlending as At, NoColorSpace as jt, Object3D as Mt, OrthographicCamera as Nt, PerspectiveCamera as Pt, PlaneGeometry as Ft, Points as It, Quaternion as Lt, REVISION as Rt, RGBADepthPacking as zt, RGBAFormat as Bt, RGFormat as Vt, RawShaderMaterial as Ht, RedFormat as Ut, RepeatWrapping as Wt, SRGBColorSpace as Gt, Scene as Kt, ShaderChunk as qt, ShaderLib as Jt, ShaderMaterial as O, ShortType as Yt, SkinnedMesh as Xt, Sphere as Zt, SphereGeometry as Qt, SphericalHarmonics3 as $t, Texture as en, TextureLoader as tn, TubeGeometry as nn, Uint16BufferAttribute as rn, Uniform as k, UniformsLib as an, UniformsUtils as on, UnsignedByteType as sn, UnsignedIntType as cn, UnsignedShortType as ln, Vector2 as A, Vector3 as j, Vector4 as M, WebGLArrayRenderTarget as un, WebGLRenderTarget as N, WireframeGeometry as dn } from "three";
import { BlendFunction as fn, DepthCopyPass as pn, DepthOfFieldEffect as mn, EdgeDetectionMode as hn, Effect as gn, EffectAttribute as _n, EffectPass as vn, FXAAEffect as yn, KawaseBlurPass as bn, KernelSize as xn, LUT3DEffect as Sn, LookupTexture as Cn, MipmapBlurPass as wn, Pass as Tn, RawImageData as En, Resolution as Dn, SMAAEffect as On, SMAAPreset as kn, ShaderPass as An, ToneMappingEffect as jn, ToneMappingMode as Mn, ToneMappingMode as Nn } from "postprocessing";
//#region ../../shaders/glsl/rain.frag.glsl
var Pn = "#include <common>\n#include <lights_pars_begin>\n\nvec3 getDirLightColor() {\n  vec3 lightColor = vec3(1.0);\n  #if ( NUM_DIR_LIGHTS > 0 )\n    \n    \n    \n    \n    \n    \n    \n\n    \n    DirectionalLight directionalLight = directionalLights[ 0 ];\n    lightColor = directionalLight.color;\n  #endif\n  return lightColor;\n}\n\nvec3 getIrradiance(vec3 geometryNormal) {\n  vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );\n\n  #if defined( USE_LIGHT_PROBES )\n\n    irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );\n\n  #endif\n\n  #if ( NUM_HEMI_LIGHTS > 0 )\n\n    #pragma unroll_loop_start\n    for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {\n\n      irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );\n\n    }\n    #pragma unroll_loop_end\n\n  #endif\n  return irradiance;\n}\n\nuniform float opacity;\nuniform float alphaMax;\nuniform float alphaMin;\nuniform vec3 color;\n\nvarying vec2 vUv;\nvarying vec3 vLocalLightDirection;\nvarying vec3 vNormal;\n\nvoid main() {\n  vec3 geometryNormal = vNormal;\n  \n  \n  float NL = clamp(dot(geometryNormal, normalize(vLocalLightDirection)), 0.1, 0.3);\n\n  \n  vec3 lightColor = NL * getDirLightColor();\n\n  float alpha = mix(alphaMin, alphaMax, NL);\n\n  vec3 irradiance = getIrradiance(geometryNormal);\n\n  vec3 direct = lightColor * BRDF_Lambert(color);\n  vec3 indirect = irradiance * BRDF_Lambert(color);\n\n  vec3 finalColor = direct + indirect;\n\n  float w = 1.0 - (abs(vUv.x - 0.5) + 0.5);\n  if(w < 0.1) {\n    alpha *= min(w * 10.0, 1.0); \n  }\n\n  \n  alpha = clamp(alpha * opacity, 0.0, 1.0);\n\n  gl_FragColor = vec4(finalColor, alpha);\n}", Fn = "#include <common>\n#include <lights_pars_begin>\n\nattribute float index;\nattribute vec2 offset;\n\nuniform float time;\nuniform float speed;\nuniform vec3 color;\nuniform float areaWidth;\nuniform float areaHeight;\nuniform vec2 size;\nuniform vec3 cameraRight;\nuniform vec3 cameraUp;\nuniform vec3 meshOffset;\nuniform vec3 bounds;\nuniform bool followCamera;\nuniform float radius;\nuniform float fov;\nuniform float baseFov;\n\nvarying vec2 vUv;\nvarying vec3 vColor;\nvarying vec3 vLocalLightDirection;\nvarying vec3 vNormal;\nvarying vec3 vViewPosition;\n\nvoid main() {\n  vUv = uv;\n  vColor = color;\n\n  vec3 transformed = position;\n  transformed.y = fract(transformed.y - time * speed) - 0.5;\n  transformed.xz *= areaWidth;\n  transformed.y *= areaHeight;\n  \n  \n  if (followCamera) {\n    \n    vec3 offsetPos = transformed + meshOffset;\n    \n    \n    offsetPos.x = mod(offsetPos.x + bounds.x * 0.5, bounds.x) - bounds.x * 0.5;\n    offsetPos.y = mod(offsetPos.y + bounds.y * 0.5, bounds.y) - bounds.y * 0.5;\n    offsetPos.z = mod(offsetPos.z + bounds.z * 0.5, bounds.z) - bounds.z * 0.5;\n    \n    transformed = offsetPos;\n  }\n  \n  \n  \n  vec3 lightDirection = vec3(0.0, 1.0, 0.0); \n  #if ( NUM_DIR_LIGHTS > 0 )\n    lightDirection = directionalLights[0].direction;\n  #endif\n  \n  \n  vLocalLightDirection = lightDirection;\n\n  vec2 scaledSize = size;\n\nvec3 normalizedPosition = vec3(transformed.x, 0.0, transformed.z);\n  float dist = length(normalizedPosition) / length(vec3(bounds.x, 0.0, bounds.z) * 0.5);\n  if (dist < 0.1) {\n    scaledSize.x *= dist;\n  } else {\n    scaledSize.x *= dist;\n  }\n\n  float fovScale = tan(fov * 0.5) / tan(baseFov * 0.5);\n  scaledSize *= fovScale;\n\n  \n  vec3 worldPos = transformed + cameraRight * offset.x * scaledSize.x + cameraUp * offset.y * scaledSize.y;\n  \n  gl_Position = projectionMatrix * modelViewMatrix * vec4(worldPos, 1.0);\n\n  vViewPosition = gl_Position.xyz;\n\n  \n  \n  float k = 0.7; \n  vNormal = normalize(vec3(offset.x * k, 0.0, 1.0)) * normalMatrix;\n}", In = 45, Ln = {
	particleCount: 5e3,
	speed: .0015,
	color: 16777215,
	areaWidth: 500,
	areaHeight: 1e3,
	width: 2,
	height: 60,
	radius: 10,
	opacity: .5,
	alphaMax: .5,
	alphaMin: .05,
	followCamera: !0,
	maxHeight: 3e3,
	baseFov: In
}, Rn = class extends O {
	uniforms;
	constructor() {
		super({
			fragmentShader: Pn,
			vertexShader: Fn,
			transparent: !0,
			depthWrite: !1,
			depthTest: !1,
			side: Ze,
			lights: !0,
			defines: {}
		}), this.uniforms = {
			...an.common,
			...an.lights,
			time: new k(0),
			speed: new k(2),
			color: new k(new w()),
			areaWidth: new k(20),
			areaHeight: new k(20),
			size: new k(new A(.01, .5)),
			opacity: new k(.5),
			alphaMax: new k(.3),
			alphaMin: new k(.01),
			cameraRight: new k(new j(1, 0, 0)),
			cameraUp: new k(new j(0, 1, 0)),
			meshOffset: new k(new j(0, 0, 0)),
			bounds: new k(new j(0, 0, 0)),
			followCamera: new k(!1),
			radius: new k(0),
			fov: new k(he(In)),
			baseFov: new k(he(In))
		};
	}
}, zn = (e) => {
	let { particleCount: t, radius: n } = e, r = [], i = [], a = [], o = [], s = [];
	for (let e = 0; e < t; ++e) {
		let t = Math.sqrt(Math.random()) * n, c = Math.random() * 2 * Math.PI, l = t * Math.cos(c), u = Math.random(), d = t * Math.sin(c);
		for (let t = 0; t < 4; ++t) r.push(e), i.push(l, u, d);
		a.push(0, 0, 1, 0, 1, 1, 0, 1), o.push(-1, -1, 1, -1, 1, 1, -1, 1);
		let f = e * 4;
		s.push(f + 0, f + 1, f + 2, f + 2, f + 3, f + 0);
	}
	let c = new ze();
	return c.setIndex(s), c.setAttribute("index", new rn(r, 1)), c.setAttribute("position", new tt(i, 3)), c.setAttribute("uv", new rn(a, 2)), c.setAttribute("offset", new tt(o, 2)), c;
}, Bn = new j(), Vn = class extends D {
	_config;
	_material;
	_lastCameraPosition = null;
	_cameraOffset = new j();
	xAxisBase = new j();
	yAxisBase = new j();
	zAxisBase = new j();
	baseMatrix4 = new E();
	constructor(e = {}) {
		let t = {
			...Ln,
			...e
		}, n = zn(t), r = new Rn();
		super(n, r), this._config = t, this._material = r, this.frustumCulled = !1, this.updateUniforms();
	}
	updateUniforms() {
		this._material.uniforms.speed.value = this._config.speed, this._material.uniforms.areaWidth.value = this._config.areaWidth, this._material.uniforms.areaHeight.value = this._config.areaHeight, this._material.uniforms.size.value.set(this._config.width, this._config.height), this._material.uniforms.opacity.value = this._config.opacity, this._material.uniforms.alphaMax.value = this._config.alphaMax, this._material.uniforms.alphaMin.value = this._config.alphaMin, this._material.uniforms.followCamera.value = this._config.followCamera, this._material.uniforms.radius.value = this._config.radius, this._material.uniforms.baseFov.value = he(this._config.baseFov), this.updateBounds();
	}
	updateBounds() {
		this._material.uniforms.bounds.value.set(this._config.areaWidth * this._config.radius, this._config.areaHeight, this._config.areaWidth * this._config.radius);
	}
	set particleCount(e) {
		if (e !== this._config.particleCount) {
			let t = { ...this._config };
			if (this._config.particleCount = e, e !== t.particleCount) {
				let e = zn(this._config);
				this.geometry.dispose(), this.geometry = e;
			}
		}
	}
	get particleCount() {
		return this._config.particleCount;
	}
	set speed(e) {
		this._config.speed = e, this._material.uniforms.speed.value = e;
	}
	get speed() {
		return this._config.speed;
	}
	set color(e) {
		this._config.color = e, this._material.uniforms.color.value.setHex(e);
	}
	get color() {
		return this._config.color;
	}
	set areaWidth(e) {
		this._config.areaWidth = e, this._material.uniforms.areaWidth.value = e, this.updateBounds();
	}
	get areaWidth() {
		return this._config.areaWidth;
	}
	set areaHeight(e) {
		this._config.areaHeight = e, this._material.uniforms.areaHeight.value = e, this.updateBounds();
	}
	get areaHeight() {
		return this._config.areaHeight;
	}
	set width(e) {
		this._config.width = e, this._material.uniforms.size.value.set(e, this._config.height);
	}
	get width() {
		return this._config.width;
	}
	set height(e) {
		this._config.height = e, this._material.uniforms.size.value.set(this._config.width, e);
	}
	get height() {
		return this._config.height;
	}
	set radius(e) {
		if (e !== this._config.radius) {
			this._config.radius = e;
			let t = zn(this._config);
			this.geometry.dispose(), this.geometry = t, this.updateBounds();
		}
	}
	get radius() {
		return this._config.radius;
	}
	set opacity(e) {
		this._config.opacity = e, this._material.uniforms.opacity.value = e;
	}
	get opacity() {
		return this._config.opacity;
	}
	set alphaMax(e) {
		this._config.alphaMax = e, this._material.uniforms.alphaMax.value = e;
	}
	get alphaMax() {
		return this._config.alphaMax;
	}
	set alphaMin(e) {
		this._config.alphaMin = e, this._material.uniforms.alphaMin.value = e;
	}
	get alphaMin() {
		return this._config.alphaMin;
	}
	set followCamera(e) {
		this._config.followCamera = e, this._material.uniforms.followCamera.value = e, e && (this._cameraOffset.set(0, 0, 0), this._lastCameraPosition = null);
	}
	get followCamera() {
		return this._config.followCamera;
	}
	set maxHeight(e) {
		this._config.maxHeight = e;
	}
	get maxHeight() {
		return this._config.maxHeight;
	}
	set baseFov(e) {
		this._config.baseFov = e, this._material.uniforms.baseFov.value = he(e);
	}
	get baseFov() {
		return this._config.baseFov;
	}
	updateConfig(e) {
		e.particleCount !== void 0 && (this.particleCount = e.particleCount), e.speed !== void 0 && (this.speed = e.speed), e.color !== void 0 && (this.color = e.color), e.areaWidth !== void 0 && (this.areaWidth = e.areaWidth), e.areaHeight !== void 0 && (this.areaHeight = e.areaHeight), e.width !== void 0 && (this.width = e.width), e.height !== void 0 && (this.height = e.height), e.radius !== void 0 && (this.radius = e.radius), e.opacity !== void 0 && (this.opacity = e.opacity), e.alphaMax !== void 0 && (this.alphaMax = e.alphaMax), e.alphaMin !== void 0 && (this.alphaMin = e.alphaMin), e.followCamera !== void 0 && (this.followCamera = e.followCamera), e.maxHeight !== void 0 && (this.maxHeight = e.maxHeight), e.baseFov !== void 0 && (this.baseFov = e.baseFov);
	}
	getConfig() {
		return { ...this._config };
	}
	update(e, t) {
		if (this.updateTime(e), t instanceof Pt && (this._material.uniforms.fov.value = he(t.fov)), this.maxHeight !== Infinity) {
			let e = Ae(t.position);
			this.material.uniforms.opacity.value = this.opacity * Math.max(1 - e.height / this.maxHeight, 0);
		}
		ge(t.position).extractBasis(Bn, Bn, this.yAxisBase), t.matrixWorld.extractBasis(this.xAxisBase, Bn, Bn), this.zAxisBase.crossVectors(this.xAxisBase, this.yAxisBase);
		let n = this.baseMatrix4.makeBasis(this.xAxisBase, this.yAxisBase, this.zAxisBase);
		if (this.setRotationFromMatrix(n), this._config.followCamera) {
			this._lastCameraPosition || (this._lastCameraPosition = t.position.clone(), this._cameraOffset.set(0, 0, 0));
			let e = new j().subVectors(t.position, this._lastCameraPosition).clone(), r = new E();
			r.extractRotation(n), r.invert(), e.applyMatrix4(r), this._cameraOffset.sub(e);
			let i = this._material.uniforms.bounds.value;
			this._cameraOffset.x = (this._cameraOffset.x % i.x + i.x) % i.x, this._cameraOffset.y = (this._cameraOffset.y % i.y + i.y) % i.y, this._cameraOffset.z = (this._cameraOffset.z % i.z + i.z) % i.z, this._material.uniforms.meshOffset.value.copy(this._cameraOffset), this.position.copy(t.position), this._lastCameraPosition.copy(t.position);
		} else this._lastCameraPosition = null, this._cameraOffset.set(0, 0, 0);
	}
	updateTime(e) {
		this._material.uniforms.time.value = e;
	}
	dispose() {
		this.geometry.dispose(), this._material.dispose();
	}
}, Hn = class extends f {
	config;
	constructor(e, t, n) {
		super(e, t, n), this.config = n;
	}
	getPassKey() {
		return this._instance?.followCamera ? "transparent" : "opaque";
	}
	createMesh() {
		return new Vn({
			particleCount: this.config.rain?.particleCount ?? Ln.particleCount,
			speed: this.config.rain?.speed ?? Ln.speed,
			color: this.config.rain?.color ?? Ln.color,
			areaWidth: this.config.rain?.areaWidth ?? Ln.areaWidth,
			areaHeight: this.config.rain?.areaHeight ?? Ln.areaHeight,
			width: this.config.rain?.width ?? Ln.width,
			height: this.config.rain?.height ?? Ln.height,
			radius: this.config.rain?.radius ?? Ln.radius,
			opacity: this.config.rain?.opacity ?? Ln.opacity,
			alphaMax: this.config.rain?.alphaMax ?? Ln.alphaMax,
			alphaMin: this.config.rain?.alphaMin ?? Ln.alphaMin,
			followCamera: this.config.rain?.followCamera ?? Ln.followCamera,
			maxHeight: this.config.rain?.maxHeight ?? Ln.maxHeight,
			baseFov: this.config.rain?.baseFov ?? Ln.baseFov
		});
	}
	onUpdateConfig(e) {
		this.config.rain && e.rain && this._instance && (Object.assign(this.config.rain, e.rain), this._instance.updateConfig(e.rain), this.emit("needsUpdate")), super.onUpdateConfig(e);
	}
	update(e) {
		this._instance && this._instance.update(e, this.view.camera.raw);
	}
	disposeMesh() {
		this._instance &&= (this._instance.dispose(), void 0);
	}
	getRainMesh() {
		return this._instance;
	}
}, Un = "vec3 getDirLightColor() {\n  vec3 lightColor = vec3(1.0);\n  #if ( NUM_DIR_LIGHTS > 0 )\n    \n    \n    \n    \n    \n    \n    \n\n    \n    DirectionalLight directionalLight = directionalLights[ 0 ];\n    lightColor = directionalLight.color;\n  #endif\n  return lightColor;\n}\n\nvec3 getIrradiance(vec3 geometryNormal) {\n  vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );\n\n  #if defined( USE_LIGHT_PROBES )\n\n    irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );\n\n  #endif\n\n  #if ( NUM_HEMI_LIGHTS > 0 )\n\n    #pragma unroll_loop_start\n    for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {\n\n      irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );\n\n    }\n    #pragma unroll_loop_end\n\n  #endif\n  return irradiance;\n}", Wn = "Invariant failed";
function Gn(e, t) {
	if (!e) throw Error(Wn);
}
//#endregion
//#region src/meshes/snow.ts
var Kn = () => {
	let e = document.createElement("canvas");
	e.width = 32, e.height = 32;
	let t = e.getContext("2d");
	Gn(t);
	let n = t.createRadialGradient(16, 16, 0, 16, 16, 16);
	return n.addColorStop(0, "rgba(255, 255, 255, 1)"), n.addColorStop(1, "rgba(255, 255, 255, 0)"), t.fillStyle = n, t.fillRect(0, 0, 32, 32), new Ue(e);
}, qn = class extends O {
	uniforms;
	isPointsMaterial = !0;
	color = new w(16777215);
	map = Kn();
	size = .05;
	fog = !0;
	sizeAttenuation = !0;
	constructor() {
		super({
			vertexShader: qt.points_vert,
			fragmentShader: qt.points_frag,
			transparent: !0,
			depthWrite: !1,
			lights: !0
		}), this.uniforms = {
			...an.points,
			...an.lights,
			areaWidth: new k(20),
			areaHeight: new k(20),
			speed: new k(.05),
			time: new k(0),
			movementStrength: new k(new j()),
			movementSpeed: new k(new j()),
			cameraPosition: new k(new j()),
			meshOffset: new k(new j()),
			bounds: new k(new j()),
			followCamera: new k(!1)
		};
	}
	onBeforeCompile(e) {
		e.uniforms.time = this.uniforms.time, e.uniforms.areaWidth = this.uniforms.areaWidth, e.uniforms.areaHeight = this.uniforms.areaHeight, e.uniforms.speed = this.uniforms.speed, e.uniforms.movementStrength = this.uniforms.movementStrength, e.uniforms.movementSpeed = this.uniforms.movementSpeed, e.uniforms.cameraPosition = this.uniforms.cameraPosition, e.uniforms.meshOffset = this.uniforms.meshOffset, e.uniforms.bounds = this.uniforms.bounds, e.uniforms.followCamera = this.uniforms.followCamera, e.vertexShader = fe(e.vertexShader).replace("uniform float size;", "uniform float size;\n         uniform float speed;\n         uniform float areaWidth;\n         uniform float areaHeight;\n         uniform vec3 movementStrength;\n         uniform vec3 movementSpeed;\n         attribute float particleIndex;\n         uniform float time;\n         uniform vec3 meshOffset;\n         uniform vec3 bounds;\n         uniform bool followCamera;").replace("#include <begin_vertex>", "#include <begin_vertex>\n\n         // Add time-based falling motion\n         transformed.y = areaHeight * (fract(transformed.y - time * speed) - 0.3);\n\n         transformed.xz *= areaWidth;\n\n         // Add horizontal X movement\n         float xMovement = movementStrength.x * sin(time * movementSpeed.x + particleIndex * 0.3);\n         transformed.x += xMovement;\n\n         // Add vertical movement\n         float yMovement = movementStrength.y * cos(time * movementSpeed.y + particleIndex * 0.2);\n         transformed.y += yMovement;\n\n         // Add horizontal Z movement\n         float zMovement = movementStrength.z * sin(time * movementSpeed.z + particleIndex * 0.1);\n         transformed.z += zMovement;\n\n         // Apply infinite scrolling when followCamera is enabled\n         if (followCamera) {\n           // Apply mesh offset to vertices\n           vec3 offsetPos = transformed + meshOffset;\n\n           // Wrap particles around the bounds\n           offsetPos.x = mod(offsetPos.x + bounds.x, bounds.x) - bounds.x * 0.5;\n           offsetPos.y = mod(offsetPos.y + bounds.y * 0.5, bounds.y) - bounds.y * 0.5;\n           offsetPos.z = mod(offsetPos.z + bounds.z * 0.5, bounds.z) - bounds.z * 0.5;\n\n           transformed = offsetPos;\n         }").source, e.fragmentShader = fe(e.fragmentShader).replace("#include <common>", `
#include <common>
#include <lights_pars_begin>
${Un}
`).replace("outgoingLight = diffuseColor.rgb", "\nfloat snowReflectivity = 0.2;\nvec3 lightColor = snowReflectivity * getDirLightColor();\nvec3 irradiance = getIrradiance(vec3(0.0, 0.0, -1.0));\n\nvec3 direct = lightColor * BRDF_Lambert(diffuseColor.rgb);\nvec3 indirect = irradiance * BRDF_Lambert(diffuseColor.rgb);\n\noutgoingLight = direct + indirect;\n").source;
	}
}, Jn = new j(), Yn = {
	particleCount: 3e4,
	areaWidth: 500,
	areaHeight: 1e3,
	radius: 10,
	speed: 5e-5,
	size: 3,
	color: 16777215,
	movementStrength: {
		x: 50,
		y: 20,
		z: 50
	},
	movementSpeed: {
		x: 5e-4,
		y: 2e-4,
		z: 5e-4
	},
	followCamera: !0,
	maxHeight: 3e3,
	opacity: 1
}, Xn = class extends It {
	_config;
	_material;
	_lastCameraPosition;
	_cameraOffset;
	xAxisBase = new j();
	yAxisBase = new j();
	zAxisBase = new j();
	baseMatrix4 = new E();
	constructor(e = {}) {
		let t = {
			...Yn,
			...e
		}, n = new ze(), r = new qn();
		super(n, r), this._config = t, this._material = r, this._lastCameraPosition = new j(), this._cameraOffset = new j(), this.frustumCulled = !1, this.initializeGeometry(), this.updateMaterial();
	}
	initializeGeometry() {
		let { particleCount: e, radius: t } = this._config, n = new Float32Array(e * 3), r = new Float32Array(e);
		for (let i = 0; i < e; i++) {
			let e = i * 3, a = Math.sqrt(Math.random()) * t, o = Math.random() * 2 * Math.PI, s = a * Math.cos(o), c = Math.random(), l = a * Math.sin(o);
			n[e] = s, n[e + 1] = c, n[e + 2] = l, r[i] = i;
		}
		this.geometry.setAttribute("position", new tt(n, 3)), this.geometry.setAttribute("particleIndex", new tt(r, 1));
	}
	updateMaterial() {
		let { areaHeight: e, areaWidth: t, speed: n, size: r, color: i, movementStrength: a, movementSpeed: o, radius: s, followCamera: c } = this._config;
		this._material.uniforms.areaHeight.value = e, this._material.uniforms.areaWidth.value = t, this._material.uniforms.speed.value = n, this._material.uniforms.movementStrength.value.copy(a), this._material.uniforms.movementSpeed.value.copy(o), this._material.uniforms.bounds.value.set(t * s, e, t * s), this._material.uniforms.followCamera.value = c, this._material.size = r, this._material.color.setHex(i);
	}
	set particleCount(e) {
		if (e !== this._config.particleCount) {
			let t = { ...this._config };
			this._config.particleCount = e, e !== t.particleCount && this.initializeGeometry();
		}
	}
	get particleCount() {
		return this._config.particleCount;
	}
	set radius(e) {
		if (e !== this._config.radius) {
			let t = { ...this._config };
			this._config.radius = e, e !== t.radius && (this.initializeGeometry(), this._material.uniforms.bounds.value.x = e, this._material.uniforms.bounds.value.z = e);
		}
	}
	get radius() {
		return this._config.radius;
	}
	set areaWidth(e) {
		this._config.areaWidth = e, this._material.uniforms.areaWidth.value = e, this._material.uniforms.bounds.value.x = e * this.radius, this._material.uniforms.bounds.value.z = e * this.radius;
	}
	get areaWidth() {
		return this._config.areaWidth;
	}
	set areaHeight(e) {
		this._config.areaHeight = e, this._material.uniforms.areaHeight.value = e, this._material.uniforms.bounds.value.y = e;
	}
	get areaHeight() {
		return this._config.areaHeight;
	}
	set speed(e) {
		this._config.speed = e, this._material.uniforms.speed.value = e;
	}
	get speed() {
		return this._config.speed;
	}
	set size(e) {
		this._config.size = e, this._material.size = e;
	}
	get size() {
		return this._config.size;
	}
	set color(e) {
		this._config.color = e, this._material.color.setHex(e);
	}
	get color() {
		return this._config.color;
	}
	set movementStrength(e) {
		this._config.movementStrength = e, this._material.uniforms.movementStrength.value.copy(e);
	}
	get movementStrength() {
		return this._config.movementStrength;
	}
	set movementSpeed(e) {
		this._config.movementSpeed = e, this._material.uniforms.movementSpeed.value.copy(e);
	}
	get movementSpeed() {
		return this._config.movementSpeed;
	}
	set followCamera(e) {
		this._config.followCamera = e, this._material.uniforms.followCamera.value = e, e && (this._cameraOffset.set(0, 0, 0), this._lastCameraPosition.set(0, 0, 0));
	}
	get followCamera() {
		return this._config.followCamera;
	}
	set maxHeight(e) {
		this._config.maxHeight = e;
	}
	get maxHeight() {
		return this._config.maxHeight;
	}
	set opacity(e) {
		this._config.opacity = e, this.material.opacity = e;
	}
	get opacity() {
		return this._config.opacity;
	}
	updateConfig(e) {
		e.particleCount !== void 0 && (this.particleCount = e.particleCount), e.radius !== void 0 && (this.radius = e.radius), e.areaWidth !== void 0 && (this.areaWidth = e.areaWidth), e.areaHeight !== void 0 && (this.areaHeight = e.areaHeight), e.speed !== void 0 && (this.speed = e.speed), e.size !== void 0 && (this.size = e.size), e.opacity !== void 0 && (this.opacity = e.opacity), e.color !== void 0 && (this.color = e.color), e.movementStrength !== void 0 && (this.movementStrength = e.movementStrength), e.movementSpeed !== void 0 && (this.movementSpeed = e.movementSpeed), e.followCamera !== void 0 && (this.followCamera = e.followCamera);
	}
	getConfig() {
		return { ...this._config };
	}
	update(e, t) {
		if (this.updateTime(e), this.maxHeight !== Infinity) {
			let e = Ae(t.position);
			this.material.opacity = this.opacity * Math.max(1 - e.height / this.maxHeight, 0);
		}
		ge(t.position).extractBasis(Jn, Jn, this.yAxisBase), t.matrix.extractBasis(this.xAxisBase, Jn, Jn), this.zAxisBase.crossVectors(this.xAxisBase, this.yAxisBase);
		let n = this.baseMatrix4.makeBasis(this.xAxisBase, this.yAxisBase, this.zAxisBase);
		if (this.setRotationFromMatrix(n), this._config.followCamera) {
			let e = new j().subVectors(t.position, this._lastCameraPosition).clone(), r = new E();
			r.extractRotation(n), r.invert(), e.applyMatrix4(r), this._cameraOffset.sub(e);
			let i = this._material.uniforms.bounds.value;
			this._cameraOffset.x = (this._cameraOffset.x % i.x + i.x) % i.x, this._cameraOffset.y = (this._cameraOffset.y % i.y + i.y) % i.y, this._cameraOffset.z = (this._cameraOffset.z % i.z + i.z) % i.z, this._material.uniforms.meshOffset.value.copy(this._cameraOffset), this._lastCameraPosition.copy(t.position), this.position.copy(t.position);
		}
	}
	updateTime(e) {
		this._material.uniforms.time.value = e;
	}
	dispose() {
		this.geometry.dispose(), this._material.dispose();
	}
}, Zn = class extends f {
	config;
	constructor(e, t, n) {
		super(e, t, n), this.config = n;
	}
	getPassKey() {
		return this._instance?.followCamera ? "transparent" : "opaque";
	}
	createMesh() {
		return new Xn(this.config.snow ?? {});
	}
	onUpdateConfig(e) {
		this.config.snow && e.snow && this._instance && (Object.assign(this.config.snow, e.snow), this._instance.updateConfig(e.snow), this.emit("needsUpdate")), super.onUpdateConfig(e);
	}
	update(e) {
		this._instance?.update(e, this.view.camera.raw);
	}
	disposeMesh() {
		this._instance &&= (this._instance.dispose(), void 0);
	}
}, Qn = "Invariant failed";
function $n(e, t) {
	if (!e) throw Error(Qn);
}
var er = class extends xt {
	load(e, t, n, r) {
		let i = new qe(), a = new et(this.manager);
		return a.setPath(this.path), a.setRequestHeader(this.requestHeader), a.setWithCredentials(this.withCredentials), a.setResponseType("arraybuffer"), a.load(e, (e) => {
			$n(e instanceof ArrayBuffer), i.image.data = new Uint8Array(e), i.image.width = 128, i.image.height = 128, i.image.depth = 64, i.type = sn, i.format = Ut, i.minFilter = kt, i.magFilter = kt, i.wrapS = Wt, i.wrapT = Wt, i.wrapR = Wt, i.needsUpdate = !0, t?.(i);
		}, n, r), i;
	}
}, tr = /* @__PURE__ */ new j();
function nr(e, t, n = new j(), r) {
	let { x: i, y: a, z: o } = e, s = t.x, c = t.y, l = t.z, u = i * i * s, d = a * a * c, f = o * o * l, p = u + d + f, m = Math.sqrt(1 / p);
	if (!Number.isFinite(m)) return;
	let h = tr.copy(e).multiplyScalar(m);
	if (p < (r?.centerTolerance ?? .1)) return n.copy(h);
	let g = h.multiply(t).multiplyScalar(2), _ = (1 - m) * e.length() / (g.length() / 2), v = 0, y, b, x, ee;
	do {
		_ -= v, y = 1 / (1 + _ * s), b = 1 / (1 + _ * c), x = 1 / (1 + _ * l);
		let e = y * y, t = b * b, n = x * x, r = e * y, i = t * b, a = n * x;
		ee = u * e + d * t + f * n - 1, v = ee / ((u * r * s + d * i * c + f * a * l) * -2);
	} while (Math.abs(ee) > 1e-12);
	return n.set(i * y, a * b, o * x);
}
var rr = /* @__PURE__ */ new j(), ir = /* @__PURE__ */ new j(), ar = /* @__PURE__ */ new j(), or = class {
	constructor(e, t, n) {
		this.radii = new j(e, t, n);
	}
	get minimumRadius() {
		return Math.min(this.radii.x, this.radii.y, this.radii.z);
	}
	get maximumRadius() {
		return Math.max(this.radii.x, this.radii.y, this.radii.z);
	}
	get flattening() {
		return 1 - this.minimumRadius / this.maximumRadius;
	}
	get eccentricity() {
		return Math.sqrt(this.eccentricitySquared);
	}
	get eccentricitySquared() {
		let e = this.maximumRadius ** 2;
		return (e - this.minimumRadius ** 2) / e;
	}
	reciprocalRadii(e = new j()) {
		let { x: t, y: n, z: r } = this.radii;
		return e.set(1 / t, 1 / n, 1 / r);
	}
	reciprocalRadiiSquared(e = new j()) {
		let { x: t, y: n, z: r } = this.radii;
		return e.set(1 / t ** 2, 1 / n ** 2, 1 / r ** 2);
	}
	projectOnSurface(e, t = new j(), n) {
		return nr(e, this.reciprocalRadiiSquared(), t, n);
	}
	getSurfaceNormal(e, t = new j()) {
		return t.multiplyVectors(this.reciprocalRadiiSquared(rr), e).normalize();
	}
	getEastNorthUpVectors(e, t = new j(), n = new j(), r = new j()) {
		this.getSurfaceNormal(e, r), t.set(-e.y, e.x, 0).normalize(), n.crossVectors(r, t).normalize();
	}
	getEastNorthUpFrame(e, t = new E()) {
		let n = rr, r = ir, i = ar;
		return this.getEastNorthUpVectors(e, n, r, i), t.makeBasis(n, r, i).setPosition(e);
	}
	getNorthUpEastFrame(e, t = new E()) {
		let n = rr, r = ir, i = ar;
		return this.getEastNorthUpVectors(e, n, r, i), t.makeBasis(r, i, n).setPosition(e);
	}
	getIntersection(e, t = new j()) {
		let n = this.reciprocalRadii(rr), r = ir.copy(n).multiply(e.origin), i = ar.copy(n).multiply(e.direction), a = r.lengthSq(), o = i.lengthSq(), s = r.dot(i), c = s ** 2 - o * (a - 1);
		if (a === 1) return t.copy(e.origin);
		if (a > 1) {
			if (s >= 0 || c < 0) return;
			let n = Math.sqrt(c), r = (-s - n) / o, i = (-s + n) / o;
			return e.at(Math.min(r, i), t);
		}
		if (a < 1) {
			let n = s ** 2 - o * (a - 1), r = Math.sqrt(n), i = (-s + r) / o;
			return e.at(i, t);
		}
		if (s < 0) return e.at(-s / o, t);
	}
	getOsculatingSphereCenter(e, t, n = new j()) {
		$n(this.radii.x === this.radii.y);
		let r = this.radii.x ** 2, i = this.radii.z ** 2, a = rr.set(e.x / r, e.y / r, e.z / i).normalize();
		return n.copy(a.multiplyScalar(-t).add(e));
	}
	getNormalAtHorizon(e, t, n = new j()) {
		$n(this.radii.x === this.radii.y);
		let r = this.radii.x ** 2, i = this.radii.z ** 2, a = e, o = t, s = (a.x * o.x + a.y * o.y) / r + a.z * o.z / i;
		s /= (a.x ** 2 + a.y ** 2) / r + a.z ** 2 / i;
		let c = rr.copy(o).multiplyScalar(-s).add(e);
		return n.set(c.x / r, c.y / r, c.z / i).normalize();
	}
};
or.WGS84 = /* @__PURE__ */ new or(6378137, 6378137, 6356752.314245179);
var sr = or, cr = /* @__PURE__ */ new j(), lr = /* @__PURE__ */ new j(), ur = class e {
	constructor(e = 0, t = 0, n = 0) {
		this.longitude = e, this.latitude = t, this.height = n;
	}
	set(e, t, n) {
		return this.longitude = e, this.latitude = t, n != null && (this.height = n), this;
	}
	clone() {
		return new e(this.longitude, this.latitude, this.height);
	}
	copy(e) {
		return this.longitude = e.longitude, this.latitude = e.latitude, this.height = e.height, this;
	}
	equals(e) {
		return e.longitude === this.longitude && e.latitude === this.latitude && e.height === this.height;
	}
	setLongitude(e) {
		return this.longitude = e, this;
	}
	setLatitude(e) {
		return this.latitude = e, this;
	}
	setHeight(e) {
		return this.height = e, this;
	}
	normalize() {
		return this.longitude < e.MIN_LONGITUDE && (this.longitude += Math.PI * 2), this;
	}
	setFromECEF(e, t) {
		let n = (t?.ellipsoid ?? sr.WGS84).reciprocalRadiiSquared(cr), r = nr(e, n, lr, t);
		if (r == null) throw Error(`Could not project position to ellipsoid surface: ${e.toArray()}`);
		let i = cr.multiplyVectors(r, n).normalize();
		this.longitude = Math.atan2(i.y, i.x), this.latitude = Math.asin(i.z);
		let a = cr.subVectors(e, r);
		return this.height = Math.sign(a.dot(e)) * a.length(), this;
	}
	toECEF(e = new j(), t) {
		let n = t?.ellipsoid ?? sr.WGS84, r = cr.multiplyVectors(n.radii, n.radii), i = Math.cos(this.latitude), a = lr.set(i * Math.cos(this.longitude), i * Math.sin(this.longitude), Math.sin(this.latitude)).normalize();
		return e.multiplyVectors(r, a), e.divideScalar(Math.sqrt(a.dot(e))).add(a.multiplyScalar(this.height));
	}
	fromArray(e, t = 0) {
		return this.longitude = e[t], this.latitude = e[t + 1], this.height = e[t + 2], this;
	}
	toArray(e = [], t = 0) {
		return e[t] = this.longitude, e[t + 1] = this.latitude, e[t + 2] = this.height, e;
	}
	*[Symbol.iterator]() {
		yield this.longitude, yield this.latitude, yield this.height;
	}
};
ur.MIN_LONGITUDE = -Math.PI, ur.MAX_LONGITUDE = Math.PI, ur.MIN_LATITUDE = -Math.PI / 2, ur.MAX_LATITUDE = Math.PI / 2;
var dr = ur, fr = class extends xt {
	load(e, t, n, r) {
		let i = new et(this.manager);
		i.setResponseType("arraybuffer"), i.setRequestHeader(this.requestHeader), i.setPath(this.path), i.setWithCredentials(this.withCredentials), i.load(e, (n) => {
			$n(n instanceof ArrayBuffer);
			try {
				t(n);
			} catch (t) {
				r == null ? console.error(t) : r(t), this.manager.itemError(e);
			}
		}, n, r);
	}
}, pr = "This is not an object", mr = "This is not a Float16Array object", hr = "This constructor is not a subclass of Float16Array", gr = "The constructor property value is not an object", _r = "Species constructor didn't return TypedArray object", vr = "Derived constructor created TypedArray object which was too small length", yr = "Attempting to access detached ArrayBuffer", br = "Cannot convert undefined or null to object", xr = "Cannot mix BigInt and other types, use explicit conversions", Sr = "@@iterator property is not callable", Cr = "Reduce of empty array with no initial value", wr = "The comparison function must be either a function or undefined", Tr = "Offset is out of bounds";
function P(e) {
	return (t, ...n) => Dr(e, t, n);
}
function Er(e, t) {
	return P(jr(e, t).get);
}
var { apply: Dr, construct: Or, defineProperty: kr, get: Ar, getOwnPropertyDescriptor: jr, getPrototypeOf: Mr, has: Nr, ownKeys: Pr, set: Fr, setPrototypeOf: Ir } = Reflect, Lr = Proxy, { EPSILON: Rr, MAX_SAFE_INTEGER: zr, isFinite: Br, isNaN: Vr } = Number, { iterator: Hr, species: Ur, toStringTag: Wr, for: Gr } = Symbol, Kr = Object, { create: qr, defineProperty: Jr, freeze: Yr, is: Xr } = Kr, Zr = Kr.prototype, Qr = Zr.__lookupGetter__ ? P(Zr.__lookupGetter__) : (e, t) => {
	if (e == null) throw R(br);
	let n = Kr(e);
	do {
		let e = jr(n, t);
		if (e !== void 0) return $r(e, "get") ? e.get : void 0;
	} while ((n = Mr(n)) !== null);
}, $r = Kr.hasOwn || P(Zr.hasOwnProperty), ei = Array, ti = ei.isArray, ni = ei.prototype, ri = P(ni.join), ii = P(ni.push), ai = P(ni.toLocaleString), oi = ni[Hr], si = P(oi), { abs: ci, trunc: li } = Math, ui = ArrayBuffer, di = ui.isView, fi = ui.prototype, pi = P(fi.slice), mi = Er(fi, "byteLength"), hi = typeof SharedArrayBuffer < "u" ? SharedArrayBuffer : null, gi = hi && Er(hi.prototype, "byteLength"), _i = Mr(Uint8Array), vi = _i.from, F = _i.prototype, yi = F[Hr], bi = P(F.keys), xi = P(F.values), Si = P(F.entries), Ci = P(F.set), wi = P(F.reverse), Ti = P(F.fill), Ei = P(F.copyWithin), Di = P(F.sort), Oi = P(F.slice), ki = P(F.subarray), I = Er(F, "buffer"), Ai = Er(F, "byteOffset"), L = Er(F, "length"), ji = Er(F, Wr), Mi = Uint8Array, Ni = Uint16Array, Pi = (...e) => Dr(vi, Ni, e), Fi = Uint32Array, Ii = Float32Array, Li = Mr([][Hr]()), Ri = P(Li.next), zi = P((function* () {})().next), Bi = Mr(Li);
DataView.prototype.getUint16;
var R = TypeError, Vi = RangeError, Hi = WeakSet, Ui = Hi.prototype, Wi = P(Ui.add), Gi = P(Ui.has), Ki = WeakMap, qi = Ki.prototype, Ji = P(qi.get), Yi = P(qi.has), Xi = P(qi.set), Zi = new Ki(), Qi = qr(null, {
	next: { value: function() {
		return Ri(Ji(Zi, this));
	} },
	[Hr]: { value: function() {
		return this;
	} }
});
function $i(e) {
	if (e[Hr] === oi && Li.next === Ri) return e;
	let t = qr(Qi);
	return Xi(Zi, t, si(e)), t;
}
var ea = new Ki(), ta = qr(Bi, { next: {
	value: function() {
		return zi(Ji(ea, this));
	},
	writable: !0,
	configurable: !0
} });
for (let e of Pr(Li)) e !== "next" && Jr(ta, e, jr(Li, e));
function na(e) {
	let t = qr(ta);
	return Xi(ea, t, e), t;
}
function ra(e) {
	return typeof e == "object" && !!e || typeof e == "function";
}
function ia(e) {
	return typeof e == "object" && !!e;
}
function aa(e) {
	return ji(e) !== void 0;
}
function oa(e) {
	let t = ji(e);
	return t === "BigInt64Array" || t === "BigUint64Array";
}
function sa(e) {
	try {
		return !ti(e) && (mi(e), !0);
	} catch {
		return !1;
	}
}
function ca(e) {
	if (hi === null) return !1;
	try {
		return gi(e), !0;
	} catch {
		return !1;
	}
}
function la(e) {
	return sa(e) || ca(e);
}
function ua(e) {
	return ti(e) ? e[Hr] === oi && Li.next === Ri : !1;
}
function da(e) {
	return aa(e) ? e[Hr] === yi && Li.next === Ri : !1;
}
function fa(e) {
	if (typeof e != "string") return !1;
	let t = +e;
	return e !== t + "" || !Br(t) ? !1 : t === li(t);
}
var pa = Gr("__Float16Array__");
function ma(e) {
	if (!ia(e)) return !1;
	let t = Mr(e);
	if (!ia(t)) return !1;
	let n = t.constructor;
	if (n === void 0) return !1;
	if (!ra(n)) throw R(gr);
	return Nr(n, pa);
}
var ha = 1 / Rr;
function ga(e) {
	return e + ha - ha;
}
var _a = 6103515625e-14, va = 65504, ya = .0009765625, ba = ya * _a, xa = ya * ha;
function Sa(e) {
	let t = +e;
	if (!Br(t) || t === 0) return t;
	let n = t > 0 ? 1 : -1, r = ci(t);
	if (r < _a) return n * ga(r / ba) * ba;
	let i = (1 + xa) * r, a = i - (i - r);
	return a > va || Vr(a) ? 1 / 0 * n : n * a;
}
var Ca = new ui(4), wa = new Ii(Ca), Ta = new Fi(Ca), Ea = new Ni(512), Da = new Mi(512);
for (let e = 0; e < 256; ++e) {
	let t = e - 127;
	t < -24 ? (Ea[e] = 0, Ea[e | 256] = 32768, Da[e] = 24, Da[e | 256] = 24) : t < -14 ? (Ea[e] = 1024 >> -t - 14, Ea[e | 256] = 1024 >> -t - 14 | 32768, Da[e] = -t - 1, Da[e | 256] = -t - 1) : t <= 15 ? (Ea[e] = t + 15 << 10, Ea[e | 256] = t + 15 << 10 | 32768, Da[e] = 13, Da[e | 256] = 13) : t < 128 ? (Ea[e] = 31744, Ea[e | 256] = 64512, Da[e] = 24, Da[e | 256] = 24) : (Ea[e] = 31744, Ea[e | 256] = 64512, Da[e] = 13, Da[e | 256] = 13);
}
function Oa(e) {
	wa[0] = Sa(e);
	let t = Ta[0], n = t >> 23 & 511;
	return Ea[n] + ((t & 8388607) >> Da[n]);
}
var ka = new Fi(2048);
for (let e = 1; e < 1024; ++e) {
	let t = e << 13, n = 0;
	for (; !(t & 8388608);) t <<= 1, n -= 8388608;
	t &= -8388609, n += 947912704, ka[e] = t | n;
}
for (let e = 1024; e < 2048; ++e) ka[e] = 939524096 + (e - 1024 << 13);
var Aa = new Fi(64);
for (let e = 1; e < 31; ++e) Aa[e] = e << 23;
Aa[31] = 1199570944, Aa[32] = 2147483648;
for (let e = 33; e < 63; ++e) Aa[e] = 2147483648 + (e - 32 << 23);
Aa[63] = 3347054592;
var ja = new Ni(64);
for (let e = 1; e < 64; ++e) e !== 32 && (ja[e] = 1024);
function z(e) {
	let t = e >> 10;
	return Ta[0] = ka[ja[t] + (e & 1023)] + Aa[t], wa[0];
}
function Ma(e) {
	let t = +e;
	return Vr(t) || t === 0 ? 0 : li(t);
}
function Na(e) {
	let t = Ma(e);
	return t < 0 ? 0 : t < zr ? t : zr;
}
function Pa(e, t) {
	if (!ra(e)) throw R(pr);
	let n = e.constructor;
	if (n === void 0) return t;
	if (!ra(n)) throw R(gr);
	return n[Ur] ?? t;
}
function Fa(e) {
	if (ca(e)) return !1;
	try {
		return pi(e, 0, 0), !1;
	} catch {}
	return !0;
}
function Ia(e, t) {
	let n = Vr(e), r = Vr(t);
	if (n && r) return 0;
	if (n) return 1;
	if (r || e < t) return -1;
	if (e > t) return 1;
	if (e === 0 && t === 0) {
		let n = Xr(e, 0), r = Xr(t, 0);
		if (!n && r) return -1;
		if (n && !r) return 1;
	}
	return 0;
}
var La = 2, Ra = new Ki();
function za(e) {
	return Yi(Ra, e) || !di(e) && ma(e);
}
function B(e) {
	if (!za(e)) throw R(mr);
}
function Ba(e, t) {
	let n = za(e), r = aa(e);
	if (!n && !r) throw R(_r);
	if (typeof t == "number") {
		let r;
		if (r = L(n ? V(e) : e), r < t) throw R(vr);
	}
	if (oa(e)) throw R(xr);
}
function V(e) {
	let t = Ji(Ra, e);
	if (t !== void 0) {
		if (Fa(I(t))) throw R(yr);
		return t;
	}
	let n = e.buffer;
	if (Fa(n)) throw R(yr);
	return Ji(Ra, Or(Wa, [
		n,
		e.byteOffset,
		e.length
	], e.constructor));
}
function Va(e) {
	let t = L(e), n = [];
	for (let r = 0; r < t; ++r) n[r] = z(e[r]);
	return n;
}
var Ha = new Hi();
for (let e of Pr(F)) {
	if (e === Wr) continue;
	let t = jr(F, e);
	$r(t, "get") && typeof t.get == "function" && Wi(Ha, t.get);
}
var Ua = Yr({
	get(e, t, n) {
		return fa(t) && $r(e, t) ? z(Ar(e, t)) : Gi(Ha, Qr(e, t)) ? Ar(e, t) : Ar(e, t, n);
	},
	set(e, t, n, r) {
		return fa(t) && $r(e, t) ? Fr(e, t, Oa(n)) : Fr(e, t, n, r);
	},
	getOwnPropertyDescriptor(e, t) {
		if (fa(t) && $r(e, t)) {
			let n = jr(e, t);
			return n.value = z(n.value), n;
		}
		return jr(e, t);
	},
	defineProperty(e, t, n) {
		return fa(t) && $r(e, t) && $r(n, "value") && (n.value = Oa(n.value)), kr(e, t, n);
	}
}), Wa = class e {
	constructor(e, t, n) {
		let r;
		if (za(e)) r = Or(Ni, [V(e)], new.target);
		else if (ra(e) && !la(e)) {
			let t, n;
			if (aa(e)) {
				if (t = e, n = L(e), Fa(I(e))) throw R(yr);
				if (oa(e)) throw R(xr);
				r = Or(Ni, [new ui(n * La)], new.target);
			} else {
				let i = e[Hr];
				if (i != null && typeof i != "function") throw R(Sr);
				i == null ? (t = e, n = Na(t.length)) : ua(e) ? (t = e, n = e.length) : (t = [...e], n = t.length), r = Or(Ni, [n], new.target);
			}
			for (let e = 0; e < n; ++e) r[e] = Oa(t[e]);
		} else r = Or(Ni, arguments, new.target);
		let i = new Lr(r, Ua);
		return Xi(Ra, i, r), i;
	}
	static from(t, ...n) {
		let r = this;
		if (!Nr(r, pa)) throw R(hr);
		if (r === e) {
			if (za(t) && n.length === 0) {
				let n = V(t), r = new Ni(I(n), Ai(n), L(n));
				return new e(I(Oi(r)));
			}
			if (n.length === 0) return new e(I(Pi(t, Oa)));
			let r = n[0], i = n[1];
			return new e(I(Pi(t, function(e, ...t) {
				return Oa(Dr(r, this, [e, ...$i(t)]));
			}, i)));
		}
		let i, a, o = t[Hr];
		if (o != null && typeof o != "function") throw R(Sr);
		if (o != null) ua(t) ? (i = t, a = t.length) : da(t) ? (i = t, a = L(t)) : (i = [...t], a = i.length);
		else {
			if (t == null) throw R(br);
			i = Kr(t), a = Na(i.length);
		}
		let s = new r(a);
		if (n.length === 0) for (let e = 0; e < a; ++e) s[e] = i[e];
		else {
			let e = n[0], t = n[1];
			for (let n = 0; n < a; ++n) s[n] = Dr(e, t, [i[n], n]);
		}
		return s;
	}
	static of(...t) {
		let n = this;
		if (!Nr(n, pa)) throw R(hr);
		let r = t.length;
		if (n === e) {
			let n = new e(r), i = V(n);
			for (let e = 0; e < r; ++e) i[e] = Oa(t[e]);
			return n;
		}
		let i = new n(r);
		for (let e = 0; e < r; ++e) i[e] = t[e];
		return i;
	}
	keys() {
		return B(this), bi(V(this));
	}
	values() {
		B(this);
		let e = V(this);
		return na((function* () {
			for (let t of xi(e)) yield z(t);
		})());
	}
	entries() {
		B(this);
		let e = V(this);
		return na((function* () {
			for (let [t, n] of Si(e)) yield [t, z(n)];
		})());
	}
	at(e) {
		B(this);
		let t = V(this), n = L(t), r = Ma(e), i = r >= 0 ? r : n + r;
		if (!(i < 0 || i >= n)) return z(t[i]);
	}
	with(t, n) {
		B(this);
		let r = V(this), i = L(r), a = Ma(t), o = a >= 0 ? a : i + a, s = +n;
		if (o < 0 || o >= i) throw Vi(Tr);
		let c = new Ni(I(r), Ai(r), L(r)), l = new e(I(Oi(c))), u = V(l);
		return u[o] = Oa(s), l;
	}
	map(t, ...n) {
		B(this);
		let r = V(this), i = L(r), a = n[0], o = Pa(r, e);
		if (o === e) {
			let n = new e(i), o = V(n);
			for (let e = 0; e < i; ++e) {
				let n = z(r[e]);
				o[e] = Oa(Dr(t, a, [
					n,
					e,
					this
				]));
			}
			return n;
		}
		let s = new o(i);
		Ba(s, i);
		for (let e = 0; e < i; ++e) {
			let n = z(r[e]);
			s[e] = Dr(t, a, [
				n,
				e,
				this
			]);
		}
		return s;
	}
	filter(t, ...n) {
		B(this);
		let r = V(this), i = L(r), a = n[0], o = [];
		for (let e = 0; e < i; ++e) {
			let n = z(r[e]);
			Dr(t, a, [
				n,
				e,
				this
			]) && ii(o, n);
		}
		let s = new (Pa(r, e))(o);
		return Ba(s), s;
	}
	reduce(e, ...t) {
		B(this);
		let n = V(this), r = L(n);
		if (r === 0 && t.length === 0) throw R(Cr);
		let i, a;
		t.length === 0 ? (i = z(n[0]), a = 1) : (i = t[0], a = 0);
		for (let t = a; t < r; ++t) i = e(i, z(n[t]), t, this);
		return i;
	}
	reduceRight(e, ...t) {
		B(this);
		let n = V(this), r = L(n);
		if (r === 0 && t.length === 0) throw R(Cr);
		let i, a;
		t.length === 0 ? (i = z(n[r - 1]), a = r - 2) : (i = t[0], a = r - 1);
		for (let t = a; t >= 0; --t) i = e(i, z(n[t]), t, this);
		return i;
	}
	forEach(e, ...t) {
		B(this);
		let n = V(this), r = L(n), i = t[0];
		for (let t = 0; t < r; ++t) Dr(e, i, [
			z(n[t]),
			t,
			this
		]);
	}
	find(e, ...t) {
		B(this);
		let n = V(this), r = L(n), i = t[0];
		for (let t = 0; t < r; ++t) {
			let r = z(n[t]);
			if (Dr(e, i, [
				r,
				t,
				this
			])) return r;
		}
	}
	findIndex(e, ...t) {
		B(this);
		let n = V(this), r = L(n), i = t[0];
		for (let t = 0; t < r; ++t) if (Dr(e, i, [
			z(n[t]),
			t,
			this
		])) return t;
		return -1;
	}
	findLast(e, ...t) {
		B(this);
		let n = V(this), r = L(n), i = t[0];
		for (let t = r - 1; t >= 0; --t) {
			let r = z(n[t]);
			if (Dr(e, i, [
				r,
				t,
				this
			])) return r;
		}
	}
	findLastIndex(e, ...t) {
		B(this);
		let n = V(this), r = L(n), i = t[0];
		for (let t = r - 1; t >= 0; --t) if (Dr(e, i, [
			z(n[t]),
			t,
			this
		])) return t;
		return -1;
	}
	every(e, ...t) {
		B(this);
		let n = V(this), r = L(n), i = t[0];
		for (let t = 0; t < r; ++t) if (!Dr(e, i, [
			z(n[t]),
			t,
			this
		])) return !1;
		return !0;
	}
	some(e, ...t) {
		B(this);
		let n = V(this), r = L(n), i = t[0];
		for (let t = 0; t < r; ++t) if (Dr(e, i, [
			z(n[t]),
			t,
			this
		])) return !0;
		return !1;
	}
	set(e, ...t) {
		B(this);
		let n = V(this), r = Ma(t[0]);
		if (r < 0) throw Vi(Tr);
		if (e == null) throw R(br);
		if (oa(e)) throw R(xr);
		if (za(e)) return Ci(V(this), V(e), r);
		if (aa(e) && Fa(I(e))) throw R(yr);
		let i = L(n), a = Kr(e), o = Na(a.length);
		if (r === 1 / 0 || o + r > i) throw Vi(Tr);
		for (let e = 0; e < o; ++e) n[e + r] = Oa(a[e]);
	}
	reverse() {
		return B(this), wi(V(this)), this;
	}
	toReversed() {
		B(this);
		let t = V(this), n = new Ni(I(t), Ai(t), L(t)), r = new e(I(Oi(n)));
		return wi(V(r)), r;
	}
	fill(e, ...t) {
		return B(this), Ti(V(this), Oa(e), ...$i(t)), this;
	}
	copyWithin(e, t, ...n) {
		return B(this), Ei(V(this), e, t, ...$i(n)), this;
	}
	sort(e) {
		B(this);
		let t = V(this), n = e === void 0 ? Ia : e;
		return Di(t, (e, t) => n(z(e), z(t))), this;
	}
	toSorted(t) {
		B(this);
		let n = V(this);
		if (t !== void 0 && typeof t != "function") throw new R(wr);
		let r = t === void 0 ? Ia : t, i = new Ni(I(n), Ai(n), L(n)), a = new e(I(Oi(i)));
		return Di(V(a), (e, t) => r(z(e), z(t))), a;
	}
	slice(t, n) {
		B(this);
		let r = V(this), i = Pa(r, e);
		if (i === e) {
			let i = new Ni(I(r), Ai(r), L(r));
			return new e(I(Oi(i, t, n)));
		}
		let a = L(r), o = Ma(t), s = n === void 0 ? a : Ma(n), c;
		c = o === -1 / 0 ? 0 : o < 0 ? a + o > 0 ? a + o : 0 : a < o ? a : o;
		let l;
		l = s === -1 / 0 ? 0 : s < 0 ? a + s > 0 ? a + s : 0 : a < s ? a : s;
		let u = l - c > 0 ? l - c : 0, d = new i(u);
		if (Ba(d, u), u === 0) return d;
		if (Fa(I(r))) throw R(yr);
		let f = 0;
		for (; c < l;) d[f] = z(r[c]), ++c, ++f;
		return d;
	}
	subarray(t, n) {
		B(this);
		let r = V(this), i = Pa(r, e), a = ki(new Ni(I(r), Ai(r), L(r)), t, n), o = new i(I(a), Ai(a), L(a));
		return Ba(o), o;
	}
	indexOf(e, ...t) {
		B(this);
		let n = V(this), r = L(n), i = Ma(t[0]);
		if (i === 1 / 0) return -1;
		i < 0 && (i += r, i < 0 && (i = 0));
		for (let t = i; t < r; ++t) if ($r(n, t) && z(n[t]) === e) return t;
		return -1;
	}
	lastIndexOf(e, ...t) {
		B(this);
		let n = V(this), r = L(n), i = t.length >= 1 ? Ma(t[0]) : r - 1;
		if (i === -1 / 0) return -1;
		i >= 0 ? i = i < r - 1 ? i : r - 1 : i += r;
		for (let t = i; t >= 0; --t) if ($r(n, t) && z(n[t]) === e) return t;
		return -1;
	}
	includes(e, ...t) {
		B(this);
		let n = V(this), r = L(n), i = Ma(t[0]);
		if (i === 1 / 0) return !1;
		i < 0 && (i += r, i < 0 && (i = 0));
		let a = Vr(e);
		for (let t = i; t < r; ++t) {
			let r = z(n[t]);
			if (a && Vr(r) || r === e) return !0;
		}
		return !1;
	}
	join(e) {
		return B(this), ri(Va(V(this)), e);
	}
	toLocaleString(...e) {
		return B(this), ai(Va(V(this)), ...$i(e));
	}
	get [Wr]() {
		if (za(this)) return "Float16Array";
	}
};
Jr(Wa, "BYTES_PER_ELEMENT", { value: La }), Jr(Wa, pa, {}), Ir(Wa, _i);
var Ga = Wa.prototype;
Jr(Ga, "BYTES_PER_ELEMENT", { value: La }), Jr(Ga, Hr, {
	value: Ga.values,
	writable: !0,
	configurable: !0
}), Ir(Ga, F);
function Ka(e) {
	return e instanceof Int8Array || e instanceof Uint8Array || e instanceof Uint8ClampedArray || e instanceof Int16Array || e instanceof Uint16Array || e instanceof Int32Array || e instanceof Uint32Array || e instanceof Wa || e instanceof Float32Array || e instanceof Float64Array;
}
var qa = class extends xt {
	constructor(e, t) {
		super(t), this.parser = e;
	}
	load(e, t, n, r) {
		let i = new fr(this.manager);
		i.setRequestHeader(this.requestHeader), i.setPath(this.path), i.setWithCredentials(this.withCredentials), i.load(e, (n) => {
			try {
				t(this.parser(n));
			} catch (t) {
				r == null ? console.error(t) : r(t), this.manager.itemError(e);
			}
		}, n, r);
	}
};
function Ja(e) {
	let t = e instanceof Int8Array ? Be : e instanceof Uint8Array || e instanceof Uint8ClampedArray ? sn : e instanceof Int16Array ? Yt : e instanceof Uint16Array ? ln : e instanceof Int32Array ? dt : e instanceof Uint32Array ? cn : e instanceof Wa ? ot : e instanceof Float32Array || e instanceof Float64Array ? nt : null;
	return $n(t != null), t;
}
var Ya = class extends xt {
	constructor(e, t, n = {}, r) {
		super(r), this.textureClass = e, this.parser = t, this.options = {
			format: Bt,
			minFilter: T,
			magFilter: T,
			...n
		};
	}
	load(e, t, n, r) {
		let i = new this.textureClass(), a = new qa(this.parser, this.manager);
		return a.setRequestHeader(this.requestHeader), a.setPath(this.path), a.setWithCredentials(this.withCredentials), a.load(e, (e) => {
			i.image.data = e instanceof Wa ? new Uint16Array(e.buffer) : e;
			let { width: n, height: r, depth: a, ...o } = this.options;
			n != null && (i.image.width = n), r != null && (i.image.height = r), "depth" in i.image && a != null && (i.image.depth = a), i.type = Ja(e), Object.assign(i, o), i.needsUpdate = !0, t?.(i);
		}, n, r), i;
	}
}, Xa = Tt.clamp;
Tt.euclideanModulo, Tt.inverseLerp;
var Za = Tt.lerp, Qa = Tt.degToRad;
Tt.radToDeg, Tt.isPowerOfTwo, Tt.ceilPowerOfTwo, Tt.floorPowerOfTwo, Tt.normalize;
function $a(e, t, n, r = 0, i = 1) {
	return Tt.mapLinear(e, t, n, r, i);
}
function eo(e) {
	return Math.min(Math.max(e, 0), 1);
}
function H(e) {
	return (t, n) => {
		t instanceof wt ? Object.defineProperty(t, n, {
			enumerable: !0,
			get() {
				return this.defines?.[e] != null;
			},
			set(t) {
				t !== this[n] && (t ? (this.defines ??= {}, this.defines[e] = "1") : delete this.defines?.[e], this.needsUpdate = !0);
			}
		}) : Object.defineProperty(t, n, {
			enumerable: !0,
			get() {
				return this.defines.has(e);
			},
			set(t) {
				t !== this[n] && (t ? this.defines.set(e, "1") : this.defines.delete(e), this.setChanged());
			}
		});
	};
}
function to(e) {
	return typeof e == "number" ? Math.floor(e) : typeof e == "string" ? parseInt(e, 10) : typeof e == "boolean" ? +e : 0;
}
function no(e, { min: t = -(2 ** 53 - 1), max: n = 2 ** 53 - 1 } = {}) {
	return (r, i) => {
		r instanceof wt ? Object.defineProperty(r, i, {
			enumerable: !0,
			get() {
				let t = this.defines?.[e];
				return t == null ? 0 : to(t);
			},
			set(r) {
				r !== this[i] && (this.defines ??= {}, this.defines[e] = Xa(r, t, n).toFixed(0), this.needsUpdate = !0);
			}
		}) : Object.defineProperty(r, i, {
			enumerable: !0,
			get() {
				let t = this.defines.get(e);
				return t == null ? 0 : to(t);
			},
			set(r) {
				r !== this[i] && (this.defines.set(e, Xa(r, t, n).toFixed(0)), this.setChanged());
			}
		});
	};
}
function ro(e) {
	return typeof e == "number" ? e : typeof e == "string" ? parseFloat(e) : typeof e == "boolean" ? +e : 0;
}
function io(e, { min: t = -1 / 0, max: n = 1 / 0, precision: r = 7 } = {}) {
	return (i, a) => {
		i instanceof wt ? Object.defineProperty(i, a, {
			enumerable: !0,
			get() {
				let t = this.defines?.[e];
				return t == null ? 0 : ro(t);
			},
			set(i) {
				i !== this[a] && (this.defines ??= {}, this.defines[e] = Xa(i, t, n).toFixed(r), this.needsUpdate = !0);
			}
		}) : Object.defineProperty(i, a, {
			enumerable: !0,
			get() {
				let t = this.defines.get(e);
				return t == null ? 0 : ro(t);
			},
			set(i) {
				i !== this[a] && (this.defines.set(e, Xa(i, t, n).toFixed(r)), this.setChanged());
			}
		});
	};
}
function ao(e, { validate: t } = {}) {
	return (n, r) => {
		n instanceof wt ? Object.defineProperty(n, r, {
			enumerable: !0,
			get() {
				return this.defines?.[e];
			},
			set(n) {
				if (n !== this[r]) {
					if (t?.(n) === !1) {
						console.error(`Expression validation failed: ${n}`);
						return;
					}
					this.defines ??= {}, this.defines[e] = n, this.needsUpdate = !0;
				}
			}
		}) : Object.defineProperty(n, r, {
			enumerable: !0,
			get() {
				return this.defines.get(e);
			},
			set(n) {
				if (n !== this[r]) {
					if (t?.(n) === !1) {
						console.error(`Expression validation failed: ${n}`);
						return;
					}
					this.defines.set(e, n), this.setChanged();
				}
			}
		});
	};
}
function oo(e, ...t) {
	let n = {};
	for (let e = 0; e < t.length; e += 2) {
		let r = t[e], i = t[e + 1];
		for (let e of i) n[e] = {
			enumerable: !0,
			get: () => r[e],
			set: (t) => {
				r[e] = t;
			}
		};
	}
	return Object.defineProperties(e, n), e;
}
function so(e, t, n) {
	let r = {};
	for (let e of n) r[e] = {
		enumerable: !0,
		get: () => t.uniforms[e].value,
		set: (n) => {
			t.uniforms[e].value = n;
		}
	};
	return Object.defineProperties(e, r), e;
}
var co = class e {
	constructor(e = 0, t = 0, n = 0, r = 0) {
		this.west = e, this.south = t, this.east = n, this.north = r;
	}
	get width() {
		let e = this.east;
		return e < this.west && (e += Math.PI * 2), e - this.west;
	}
	get height() {
		return this.north - this.south;
	}
	set(e, t, n, r) {
		return this.west = e, this.south = t, this.east = n, this.north = r, this;
	}
	clone() {
		return new e(this.west, this.south, this.east, this.north);
	}
	copy(e) {
		return this.west = e.west, this.south = e.south, this.east = e.east, this.north = e.north, this;
	}
	equals(e) {
		return e.west === this.west && e.south === this.south && e.east === this.east && e.north === this.north;
	}
	at(e, t, n = new dr()) {
		return n.set(this.west + (this.east - this.west) * e, this.north + (this.south - this.north) * t);
	}
	fromArray(e, t = 0) {
		return this.west = e[t], this.south = e[t + 1], this.east = e[t + 2], this.north = e[t + 3], this;
	}
	toArray(e = [], t = 0) {
		return e[t] = this.west, e[t + 1] = this.south, e[t + 2] = this.east, e[t + 3] = this.north, e;
	}
	*[Symbol.iterator]() {
		yield this.west, yield this.south, yield this.east, yield this.north;
	}
};
co.MAX = /* @__PURE__ */ new co(dr.MIN_LONGITUDE, dr.MIN_LATITUDE, dr.MAX_LONGITUDE, dr.MAX_LATITUDE);
var lo = /^[ \t]*#include +"([\w\d./]+)"/gm;
function uo(e, t) {
	return e.replace(lo, (e, n) => {
		let r = n.split("/").reduce((e, t) => typeof e != "string" && e != null ? e[t] : void 0, t);
		if (typeof r != "string") throw Error(`Could not find include for ${n}.`);
		return uo(r, t);
	});
}
var fo = (e) => new Uint8Array(e), po = /#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*(?:i\s*\+\+|\+\+\s*i)\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;
function mo(e, t, n, r) {
	let i = "";
	for (let e = parseInt(t, 10); e < parseInt(n, 10); ++e) i += r.replace(/\[\s*i\s*\]/g, `[${e}]`).replace(/UNROLLED_LOOP_INDEX/g, `${e}`);
	return i;
}
function ho(e) {
	return e.replace(po, mo);
}
//#endregion
//#region ../../node_modules/.pnpm/@takram+three-geospatial@0.9.1_@react-three+fiber@9.1.2_@types+react@19.2.18_react-dom@_c86ec4e34e3b7190bcc9452262ff2b28/node_modules/@takram/three-geospatial/build/shaders.js
var go = "// Reference: https://github.com/mrdoob/three.js/blob/r171/examples/jsm/csm/CSMShader.js\n\n#ifndef SHADOW_CASCADE_COUNT\n#error \"SHADOW_CASCADE_COUNT macro must be defined.\"\n#endif // SHADOW_CASCADE_COUNT\n\nint getCascadeIndex(\n  const mat4 viewMatrix,\n  const vec3 worldPosition,\n  const vec2 intervals[SHADOW_CASCADE_COUNT],\n  const float near,\n  const float far\n) {\n  vec4 viewPosition = viewMatrix * vec4(worldPosition, 1.0);\n  float depth = viewZToOrthographicDepth(viewPosition.z, near, far);\n  vec2 interval;\n  #pragma unroll_loop_start\n  for (int i = 0; i < 4; ++i) {\n    #if UNROLLED_LOOP_INDEX < SHADOW_CASCADE_COUNT\n    interval = intervals[i];\n    if (depth >= interval.x && depth < interval.y) {\n      return UNROLLED_LOOP_INDEX;\n    }\n    #endif // UNROLLED_LOOP_INDEX < SHADOW_CASCADE_COUNT\n  }\n  #pragma unroll_loop_end\n  return SHADOW_CASCADE_COUNT - 1;\n}\n\nint getFadedCascadeIndex(\n  const mat4 viewMatrix,\n  const vec3 worldPosition,\n  const vec2 intervals[SHADOW_CASCADE_COUNT],\n  const float near,\n  const float far,\n  const float jitter\n) {\n  vec4 viewPosition = viewMatrix * vec4(worldPosition, 1.0);\n  float depth = viewZToOrthographicDepth(viewPosition.z, near, far);\n\n  vec2 interval;\n  float intervalCenter;\n  float closestEdge;\n  float margin;\n  int nextIndex = -1;\n  int prevIndex = -1;\n  float alpha;\n\n  #pragma unroll_loop_start\n  for (int i = 0; i < 4; ++i) {\n    #if UNROLLED_LOOP_INDEX < SHADOW_CASCADE_COUNT\n    interval = intervals[i];\n    intervalCenter = (interval.x + interval.y) * 0.5;\n    closestEdge = depth < intervalCenter ? interval.x : interval.y;\n    margin = closestEdge * closestEdge * 0.5;\n    interval += margin * vec2(-0.5, 0.5);\n\n    #if UNROLLED_LOOP_INDEX < SHADOW_CASCADE_COUNT - 1\n    if (depth >= interval.x && depth < interval.y) {\n      prevIndex = nextIndex;\n      nextIndex = UNROLLED_LOOP_INDEX;\n      alpha = saturate(min(depth - interval.x, interval.y - depth) / margin);\n    }\n    #else // UNROLLED_LOOP_INDEX < SHADOW_CASCADE_COUNT - 1\n    // Don't fade out the last cascade.\n    if (depth >= interval.x) {\n      prevIndex = nextIndex;\n      nextIndex = UNROLLED_LOOP_INDEX;\n      alpha = saturate((depth - interval.x) / margin);\n    }\n    #endif // UNROLLED_LOOP_INDEX < SHADOW_CASCADE_COUNT - 1\n    #endif // UNROLLED_LOOP_INDEX < SHADOW_CASCADE_COUNT\n  }\n  #pragma unroll_loop_end\n\n  return jitter <= alpha\n    ? nextIndex\n    : prevIndex;\n}\n", _o = "// cSpell:words logdepthbuf\n\n#ifdef DEPTH_PACKING\nfloat readDepthValue(const sampler2D depthBuffer, const vec2 uv) {\n  #if DEPTH_PACKING == 3201\n  return unpackRGBAToDepth(texture(depthBuffer, uv));\n  #else // DEPTH_PACKING == 3201\n  return texture(depthBuffer, uv).r;\n  #endif // DEPTH_PACKING == 3201\n}\n#endif // DEPTH_PACKING\n\nfloat reverseLogDepth(const float depth, const float near, const float far) {\n  #if defined(USE_LOGDEPTHBUF) || defined(USE_LOGARITHMIC_DEPTH_BUFFER)\n  float d = pow(2.0, depth * log2(far + 1.0)) - 1.0;\n  float a = far / (far - near);\n  float b = far * near / (near - far);\n  return a + b / d;\n  #else // defined(USE_LOGARITHMIC_DEPTH_BUFFER) || defined(USE_LOGARITHMIC_DEPTH_BUFFER)\n  return depth;\n  #endif // defined(USE_LOGARITHMIC_DEPTH_BUFFER) || defined(USE_LOGARITHMIC_DEPTH_BUFFER)\n}\n\nfloat linearizeDepth(const float depth, const float near, const float far) {\n  float ndc = depth * 2.0 - 1.0;\n  return 2.0 * near * far / (far + near - ndc * (far - near));\n}\n", vo = "float checker(const vec2 uv, const vec2 repeats) {\n  vec2 c = floor(repeats * uv);\n  float result = mod(c.x + c.y, 2.0);\n  return sign(result);\n}\n\nfloat checker(const vec2 uv, const float repeats) {\n  return checker(uv, vec2(repeats));\n}\n", yo = "// Reference: https://advances.realtimerendering.com/s2014/index.html#_NEXT_GENERATION_POST\n\nfloat interleavedGradientNoise(const vec2 coord) {\n  const vec3 magic = vec3(0.06711056, 0.00583715, 52.9829189);\n  return fract(magic.z * fract(dot(coord, magic.xy)));\n}\n", bo = "#if !defined(saturate)\n#define saturate(a) clamp(a, 0.0, 1.0)\n#endif // !defined(saturate)\n\nfloat remap(const float x, const float min1, const float max1, const float min2, const float max2) {\n  return min2 + (x - min1) / (max1 - min1) * (max2 - min2);\n}\n\nvec2 remap(const vec2 x, const vec2 min1, const vec2 max1, const vec2 min2, const vec2 max2) {\n  return min2 + (x - min1) / (max1 - min1) * (max2 - min2);\n}\n\nvec3 remap(const vec3 x, const vec3 min1, const vec3 max1, const vec3 min2, const vec3 max2) {\n  return min2 + (x - min1) / (max1 - min1) * (max2 - min2);\n}\n\nvec4 remap(const vec4 x, const vec4 min1, const vec4 max1, const vec4 min2, const vec4 max2) {\n  return min2 + (x - min1) / (max1 - min1) * (max2 - min2);\n}\n\nfloat remapClamped(\n  const float x,\n  const float min1,\n  const float max1,\n  const float min2,\n  const float max2\n) {\n  return clamp(min2 + (x - min1) / (max1 - min1) * (max2 - min2), min2, max2);\n}\n\nvec2 remapClamped(\n  const vec2 x,\n  const vec2 min1,\n  const vec2 max1,\n  const vec2 min2,\n  const vec2 max2\n) {\n  return clamp(min2 + (x - min1) / (max1 - min1) * (max2 - min2), min2, max2);\n}\n\nvec3 remapClamped(\n  const vec3 x,\n  const vec3 min1,\n  const vec3 max1,\n  const vec3 min2,\n  const vec3 max2\n) {\n  return clamp(min2 + (x - min1) / (max1 - min1) * (max2 - min2), min2, max2);\n}\n\nvec4 remapClamped(\n  const vec4 x,\n  const vec4 min1,\n  const vec4 max1,\n  const vec4 min2,\n  const vec4 max2\n) {\n  return clamp(min2 + (x - min1) / (max1 - min1) * (max2 - min2), min2, max2);\n}\n\n// Implicitly remap to 0 and 1\nfloat remap(const float x, const float min1, const float max1) {\n  return (x - min1) / (max1 - min1);\n}\n\nvec2 remap(const vec2 x, const vec2 min1, const vec2 max1) {\n  return (x - min1) / (max1 - min1);\n}\n\nvec3 remap(const vec3 x, const vec3 min1, const vec3 max1) {\n  return (x - min1) / (max1 - min1);\n}\n\nvec4 remap(const vec4 x, const vec4 min1, const vec4 max1) {\n  return (x - min1) / (max1 - min1);\n}\n\nfloat remapClamped(const float x, const float min1, const float max1) {\n  return saturate((x - min1) / (max1 - min1));\n}\n\nvec2 remapClamped(const vec2 x, const vec2 min1, const vec2 max1) {\n  return saturate((x - min1) / (max1 - min1));\n}\n\nvec3 remapClamped(const vec3 x, const vec3 min1, const vec3 max1) {\n  return saturate((x - min1) / (max1 - min1));\n}\n\nvec4 remapClamped(const vec4 x, const vec4 min1, const vec4 max1) {\n  return saturate((x - min1) / (max1 - min1));\n}\n", xo = "// Reference: https://jcgt.org/published/0003/02/01/paper.pdf\n\nvec2 signNotZero(vec2 v) {\n  return vec2(v.x >= 0.0 ? 1.0 : -1.0, v.y >= 0.0 ? 1.0 : -1.0);\n}\n\nvec2 packNormalToVec2(vec3 v) {\n  vec2 p = v.xy * (1.0 / (abs(v.x) + abs(v.y) + abs(v.z)));\n  return v.z <= 0.0\n    ? (1.0 - abs(p.yx)) * signNotZero(p)\n    : p;\n}\n\nvec3 unpackVec2ToNormal(vec2 e) {\n  vec3 v = vec3(e.xy, 1.0 - abs(e.x) - abs(e.y));\n  if (v.z < 0.0) {\n    v.xy = (1.0 - abs(v.yx)) * signNotZero(v.xy);\n  }\n  return normalize(v);\n}\n", So = "float raySphereFirstIntersection(\n  const vec3 origin,\n  const vec3 direction,\n  const vec3 center,\n  const float radius\n) {\n  vec3 a = origin - center;\n  float b = 2.0 * dot(direction, a);\n  float c = dot(a, a) - radius * radius;\n  float discriminant = b * b - 4.0 * c;\n  return discriminant < 0.0\n    ? -1.0\n    : (-b - sqrt(discriminant)) * 0.5;\n}\n\nfloat raySphereFirstIntersection(const vec3 origin, const vec3 direction, const float radius) {\n  return raySphereFirstIntersection(origin, direction, vec3(0.0), radius);\n}\n\nvec4 raySphereFirstIntersection(\n  const vec3 origin,\n  const vec3 direction,\n  const vec3 center,\n  const vec4 radius\n) {\n  vec3 a = origin - center;\n  float b = 2.0 * dot(direction, a);\n  vec4 c = dot(a, a) - radius * radius;\n  vec4 discriminant = b * b - 4.0 * c;\n  vec4 mask = step(discriminant, vec4(0.0));\n  return mix((-b - sqrt(max(vec4(0.0), discriminant))) * 0.5, vec4(-1.0), mask);\n}\n\nvec4 raySphereFirstIntersection(const vec3 origin, const vec3 direction, const vec4 radius) {\n  return raySphereFirstIntersection(origin, direction, vec3(0.0), radius);\n}\n\nfloat raySphereSecondIntersection(\n  const vec3 origin,\n  const vec3 direction,\n  const vec3 center,\n  const float radius\n) {\n  vec3 a = origin - center;\n  float b = 2.0 * dot(direction, a);\n  float c = dot(a, a) - radius * radius;\n  float discriminant = b * b - 4.0 * c;\n  return discriminant < 0.0\n    ? -1.0\n    : (-b + sqrt(discriminant)) * 0.5;\n}\n\nfloat raySphereSecondIntersection(const vec3 origin, const vec3 direction, const float radius) {\n  return raySphereSecondIntersection(origin, direction, vec3(0.0), radius);\n}\n\nvec4 raySphereSecondIntersection(\n  const vec3 origin,\n  const vec3 direction,\n  const vec3 center,\n  const vec4 radius\n) {\n  vec3 a = origin - center;\n  float b = 2.0 * dot(direction, a);\n  vec4 c = dot(a, a) - radius * radius;\n  vec4 discriminant = b * b - 4.0 * c;\n  vec4 mask = step(discriminant, vec4(0.0));\n  return mix((-b + sqrt(max(vec4(0.0), discriminant))) * 0.5, vec4(-1.0), mask);\n}\n\nvec4 raySphereSecondIntersection(const vec3 origin, const vec3 direction, const vec4 radius) {\n  return raySphereSecondIntersection(origin, direction, vec3(0.0), radius);\n}\n\nvoid raySphereIntersections(\n  const vec3 origin,\n  const vec3 direction,\n  const vec3 center,\n  const float radius,\n  out float intersection1,\n  out float intersection2\n) {\n  vec3 a = origin - center;\n  float b = 2.0 * dot(direction, a);\n  float c = dot(a, a) - radius * radius;\n  float discriminant = b * b - 4.0 * c;\n  if (discriminant < 0.0) {\n    intersection1 = -1.0;\n    intersection2 = -1.0;\n    return;\n  } else {\n    float Q = sqrt(discriminant);\n    intersection1 = (-b - Q) * 0.5;\n    intersection2 = (-b + Q) * 0.5;\n  }\n}\n\nvoid raySphereIntersections(\n  const vec3 origin,\n  const vec3 direction,\n  const float radius,\n  out float intersection1,\n  out float intersection2\n) {\n  raySphereIntersections(origin, direction, vec3(0.0), radius, intersection1, intersection2);\n}\n\nvoid raySphereIntersections(\n  const vec3 origin,\n  const vec3 direction,\n  const vec3 center,\n  const vec4 radius,\n  out vec4 intersection1,\n  out vec4 intersection2\n) {\n  vec3 a = origin - center;\n  float b = 2.0 * dot(direction, a);\n  vec4 c = dot(a, a) - radius * radius;\n  vec4 discriminant = b * b - 4.0 * c;\n  vec4 mask = step(discriminant, vec4(0.0));\n  vec4 Q = sqrt(max(vec4(0.0), discriminant));\n  intersection1 = mix((-b - Q) * 0.5, vec4(-1.0), mask);\n  intersection2 = mix((-b + Q) * 0.5, vec4(-1.0), mask);\n}\n\nvoid raySphereIntersections(\n  const vec3 origin,\n  const vec3 direction,\n  const vec4 radius,\n  out vec4 intersection1,\n  out vec4 intersection2\n) {\n  raySphereIntersections(origin, direction, vec3(0.0), radius, intersection1, intersection2);\n}\n", Co = "vec3 screenToView(\n  const vec2 uv,\n  const float depth,\n  const float viewZ,\n  const mat4 projectionMatrix,\n  const mat4 inverseProjectionMatrix\n) {\n  vec4 clip = vec4(vec3(uv, depth) * 2.0 - 1.0, 1.0);\n  float clipW = projectionMatrix[2][3] * viewZ + projectionMatrix[3][3];\n  clip *= clipW;\n  return (inverseProjectionMatrix * clip).xyz;\n}\n", wo = "// A fifth-order polynomial approximation of Turbo color map.\n// See: https://observablehq.com/@mbostock/turbo\n// prettier-ignore\nvec3 turbo(const float x) {\n  float r = 0.1357 + x * (4.5974 - x * (42.3277 - x * (130.5887 - x * (150.5666 - x * 58.1375))));\n  float g = 0.0914 + x * (2.1856 + x * (4.8052 - x * (14.0195 - x * (4.2109 + x * 2.7747))));\n  float b = 0.1067 + x * (12.5925 - x * (60.1097 - x * (109.0745 - x * (88.5066 - x * 26.8183))));\n  return vec3(r, g, b);\n}\n", To = "// Reference: https://www.gamedev.net/tutorials/programming/graphics/contact-hardening-soft-shadows-made-fast-r4906/\n\nvec2 vogelDisk(const int index, const int sampleCount, const float phi) {\n  const float goldenAngle = 2.39996322972865332;\n  float r = sqrt(float(index) + 0.5) / sqrt(float(sampleCount));\n  float theta = float(index) * goldenAngle + phi;\n  return r * vec2(cos(theta), sin(theta));\n}\n", Eo = go, Do = _o, Oo = vo, ko = yo, Ao = bo, jo = xo, Mo = So, No = Co, Po = wo, Fo = To, Io = "eac103980f20c0956f2d3215833e73514be08462";
`${Io}`, `${Io}`;
var Lo = 1 / 1e3, Ro = /* @__PURE__ */ new j();
function zo(e, t, n, r) {
	let i = n.projectOnSurface(e, Ro);
	return i == null ? r.setScalar(0) : n.getOsculatingSphereCenter(i, t, r).negate();
}
typeof window < "u" && window.requestIdleCallback != null && window.requestIdleCallback;
//#endregion
//#region ../../node_modules/.pnpm/@takram+three-atmosphere@0.19.1_@react-three+fiber@9.1.2_@types+react@19.2.18_react-dom_4fc11f8320140224cc7ea606f8a9dafc/node_modules/@takram/three-atmosphere/build/shared3.js
var Bo = "// Based on: https://github.com/ebruneton/precomputed_atmospheric_scattering/blob/master/atmosphere/functions.glsl\n\n/**\n * Copyright (c) 2017 Eric Bruneton\n * All rights reserved.\n *\n * Redistribution and use in source and binary forms, with or without\n * modification, are permitted provided that the following conditions\n * are met:\n * 1. Redistributions of source code must retain the above copyright\n *    notice, this list of conditions and the following disclaimer.\n * 2. Redistributions in binary form must reproduce the above copyright\n *    notice, this list of conditions and the following disclaimer in the\n *    documentation and/or other materials provided with the distribution.\n * 3. Neither the name of the copyright holders nor the names of its\n *    contributors may be used to endorse or promote products derived from\n *    this software without specific prior written permission.\n *\n * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS \"AS IS\"\n * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE\n * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE\n * ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE\n * LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR\n * CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF\n * SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS\n * INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN\n * CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)\n * ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF\n * THE POSSIBILITY OF SUCH DAMAGE.\n *\n * Precomputed Atmospheric Scattering\n * Copyright (c) 2008 INRIA\n * All rights reserved.\n *\n * Redistribution and use in source and binary forms, with or without\n * modification, are permitted provided that the following conditions\n * are met:\n * 1. Redistributions of source code must retain the above copyright\n *    notice, this list of conditions and the following disclaimer.\n * 2. Redistributions in binary form must reproduce the above copyright\n *    notice, this list of conditions and the following disclaimer in the\n *    documentation and/or other materials provided with the distribution.\n * 3. Neither the name of the copyright holders nor the names of its\n *    contributors may be used to endorse or promote products derived from\n *    this software without specific prior written permission.\n *\n * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS \"AS IS\"\n * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE\n * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE\n * ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE\n * LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR\n * CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF\n * SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS\n * INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN\n * CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)\n * ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF\n * THE POSSIBILITY OF SUCH DAMAGE.\n */\n\nNumber ClampCosine(const Number mu) {\n  return clamp(mu, Number(-1.0), Number(1.0));\n}\n\nLength ClampDistance(const Length d) {\n  return max(d, 0.0 * m);\n}\n\nLength ClampRadius(const AtmosphereParameters atmosphere, const Length r) {\n  return clamp(r, atmosphere.bottom_radius, atmosphere.top_radius);\n}\n\nLength SafeSqrt(const Area a) {\n  return sqrt(max(a, 0.0 * m2));\n}\n\nLength DistanceToTopAtmosphereBoundary(const AtmosphereParameters atmosphere,\n    const Length r, const Number mu) {\n  assert(r <= atmosphere.top_radius);\n  assert(mu >= -1.0 && mu <= 1.0);\n  Area discriminant = r * r * (mu * mu - 1.0) +\n      atmosphere.top_radius * atmosphere.top_radius;\n  return ClampDistance(-r * mu + SafeSqrt(discriminant));\n}\n\nLength DistanceToBottomAtmosphereBoundary(const AtmosphereParameters atmosphere,\n    const Length r, const Number mu) {\n  assert(r >= atmosphere.bottom_radius);\n  assert(mu >= -1.0 && mu <= 1.0);\n  Area discriminant = r * r * (mu * mu - 1.0) +\n      atmosphere.bottom_radius * atmosphere.bottom_radius;\n  return ClampDistance(-r * mu - SafeSqrt(discriminant));\n}\n\nbool RayIntersectsGround(const AtmosphereParameters atmosphere,\n    const Length r, const Number mu) {\n  assert(r >= atmosphere.bottom_radius);\n  assert(mu >= -1.0 && mu <= 1.0);\n  return mu < 0.0 && r * r * (mu * mu - 1.0) +\n      atmosphere.bottom_radius * atmosphere.bottom_radius >= 0.0 * m2;\n}\n\nNumber GetTextureCoordFromUnitRange(const Number x, const int texture_size) {\n  return 0.5 / Number(texture_size) + x * (1.0 - 1.0 / Number(texture_size));\n}\n\nvec2 GetTransmittanceTextureUvFromRMu(const AtmosphereParameters atmosphere,\n    const Length r, const Number mu) {\n  assert(r >= atmosphere.bottom_radius && r <= atmosphere.top_radius);\n  assert(mu >= -1.0 && mu <= 1.0);\n  // Distance to top atmosphere boundary for a horizontal ray at ground level.\n  Length H = sqrt(atmosphere.top_radius * atmosphere.top_radius -\n      atmosphere.bottom_radius * atmosphere.bottom_radius);\n  // Distance to the horizon.\n  Length rho =\n      SafeSqrt(r * r - atmosphere.bottom_radius * atmosphere.bottom_radius);\n  // Distance to the top atmosphere boundary for the ray (r,mu), and its minimum\n  // and maximum values over all mu - obtained for (r,1) and (r,mu_horizon).\n  Length d = DistanceToTopAtmosphereBoundary(atmosphere, r, mu);\n  Length d_min = atmosphere.top_radius - r;\n  Length d_max = rho + H;\n  Number x_mu = (d - d_min) / (d_max - d_min);\n  Number x_r = rho / H;\n  return vec2(GetTextureCoordFromUnitRange(x_mu, TRANSMITTANCE_TEXTURE_WIDTH),\n              GetTextureCoordFromUnitRange(x_r, TRANSMITTANCE_TEXTURE_HEIGHT));\n}\n\nDimensionlessSpectrum GetTransmittanceToTopAtmosphereBoundary(\n    const AtmosphereParameters atmosphere,\n    const TransmittanceTexture transmittance_texture,\n    const Length r, const Number mu) {\n  assert(r >= atmosphere.bottom_radius && r <= atmosphere.top_radius);\n  vec2 uv = GetTransmittanceTextureUvFromRMu(atmosphere, r, mu);\n  // @shotamatsuda: Added for the precomputation stage in half-float precision.\n  #ifdef TRANSMITTANCE_PRECISION_LOG\n  // Manually interpolate the transmittance instead of the optical depth.\n  const vec2 size = vec2(TRANSMITTANCE_TEXTURE_WIDTH, TRANSMITTANCE_TEXTURE_HEIGHT);\n  const vec3 texel_size = vec3(1.0 / size, 0.0);\n  vec2 coord = (uv * size) - 0.5;\n  vec2 i = (floor(coord) + 0.5) * texel_size.xy;\n  vec2 f = fract(coord);\n  vec4 t1 = exp(-texture(transmittance_texture, i));\n  vec4 t2 = exp(-texture(transmittance_texture, i + texel_size.xz));\n  vec4 t3 = exp(-texture(transmittance_texture, i + texel_size.zy));\n  vec4 t4 = exp(-texture(transmittance_texture, i + texel_size.xy));\n  return DimensionlessSpectrum(mix(mix(t1, t2, f.x), mix(t3, t4, f.x), f.y));\n  #else // TRANSMITTANCE_PRECISION_LOG\n  return DimensionlessSpectrum(texture(transmittance_texture, uv));\n  #endif // TRANSMITTANCE_PRECISION_LOG\n}\n\nDimensionlessSpectrum GetTransmittance(\n    const AtmosphereParameters atmosphere,\n    const TransmittanceTexture transmittance_texture,\n    const Length r, const Number mu, const Length d,\n    const bool ray_r_mu_intersects_ground) {\n  assert(r >= atmosphere.bottom_radius && r <= atmosphere.top_radius);\n  assert(mu >= -1.0 && mu <= 1.0);\n  assert(d >= 0.0 * m);\n\n  Length r_d = ClampRadius(atmosphere, sqrt(d * d + 2.0 * r * mu * d + r * r));\n  Number mu_d = ClampCosine((r * mu + d) / r_d);\n\n  if (ray_r_mu_intersects_ground) {\n    return min(\n        GetTransmittanceToTopAtmosphereBoundary(\n            atmosphere, transmittance_texture, r_d, -mu_d) /\n        GetTransmittanceToTopAtmosphereBoundary(\n            atmosphere, transmittance_texture, r, -mu),\n        DimensionlessSpectrum(1.0));\n  } else {\n    return min(\n        GetTransmittanceToTopAtmosphereBoundary(\n            atmosphere, transmittance_texture, r, mu) /\n        GetTransmittanceToTopAtmosphereBoundary(\n            atmosphere, transmittance_texture, r_d, mu_d),\n        DimensionlessSpectrum(1.0));\n  }\n}\n\nDimensionlessSpectrum GetTransmittanceToSun(\n    const AtmosphereParameters atmosphere,\n    const TransmittanceTexture transmittance_texture,\n    const Length r, const Number mu_s) {\n  Number sin_theta_h = atmosphere.bottom_radius / r;\n  Number cos_theta_h = -sqrt(max(1.0 - sin_theta_h * sin_theta_h, 0.0));\n  return GetTransmittanceToTopAtmosphereBoundary(\n          atmosphere, transmittance_texture, r, mu_s) *\n      smoothstep(-sin_theta_h * atmosphere.sun_angular_radius / rad,\n                 sin_theta_h * atmosphere.sun_angular_radius / rad,\n                 mu_s - cos_theta_h);\n}\n\nInverseSolidAngle RayleighPhaseFunction(const Number nu) {\n  InverseSolidAngle k = 3.0 / (16.0 * PI * sr);\n  return k * (1.0 + nu * nu);\n}\n\nInverseSolidAngle MiePhaseFunction(const Number g, const Number nu) {\n  InverseSolidAngle k = 3.0 / (8.0 * PI * sr) * (1.0 - g * g) / (2.0 + g * g);\n  return k * (1.0 + nu * nu) / pow(1.0 + g * g - 2.0 * g * nu, 1.5);\n}\n\nvec4 GetScatteringTextureUvwzFromRMuMuSNu(const AtmosphereParameters atmosphere,\n    const Length r, const Number mu, const Number mu_s, const Number nu,\n    const bool ray_r_mu_intersects_ground) {\n  assert(r >= atmosphere.bottom_radius && r <= atmosphere.top_radius);\n  assert(mu >= -1.0 && mu <= 1.0);\n  assert(mu_s >= -1.0 && mu_s <= 1.0);\n  assert(nu >= -1.0 && nu <= 1.0);\n\n  // Distance to top atmosphere boundary for a horizontal ray at ground level.\n  Length H = sqrt(atmosphere.top_radius * atmosphere.top_radius -\n      atmosphere.bottom_radius * atmosphere.bottom_radius);\n  // Distance to the horizon.\n  Length rho =\n      SafeSqrt(r * r - atmosphere.bottom_radius * atmosphere.bottom_radius);\n  Number u_r = GetTextureCoordFromUnitRange(rho / H, SCATTERING_TEXTURE_R_SIZE);\n\n  // Discriminant of the quadratic equation for the intersections of the ray\n  // (r,mu) with the ground (see RayIntersectsGround).\n  Length r_mu = r * mu;\n  Area discriminant =\n      r_mu * r_mu - r * r + atmosphere.bottom_radius * atmosphere.bottom_radius;\n  Number u_mu;\n  if (ray_r_mu_intersects_ground) {\n    // Distance to the ground for the ray (r,mu), and its minimum and maximum\n    // values over all mu - obtained for (r,-1) and (r,mu_horizon).\n    Length d = -r_mu - SafeSqrt(discriminant);\n    Length d_min = r - atmosphere.bottom_radius;\n    Length d_max = rho;\n    u_mu = 0.5 - 0.5 * GetTextureCoordFromUnitRange(d_max == d_min ? 0.0 :\n        (d - d_min) / (d_max - d_min), SCATTERING_TEXTURE_MU_SIZE / 2);\n  } else {\n    // Distance to the top atmosphere boundary for the ray (r,mu), and its\n    // minimum and maximum values over all mu - obtained for (r,1) and\n    // (r,mu_horizon).\n    Length d = -r_mu + SafeSqrt(discriminant + H * H);\n    Length d_min = atmosphere.top_radius - r;\n    Length d_max = rho + H;\n    u_mu = 0.5 + 0.5 * GetTextureCoordFromUnitRange(\n        (d - d_min) / (d_max - d_min), SCATTERING_TEXTURE_MU_SIZE / 2);\n  }\n\n  Length d = DistanceToTopAtmosphereBoundary(\n      atmosphere, atmosphere.bottom_radius, mu_s);\n  Length d_min = atmosphere.top_radius - atmosphere.bottom_radius;\n  Length d_max = H;\n  Number a = (d - d_min) / (d_max - d_min);\n  Length D = DistanceToTopAtmosphereBoundary(\n      atmosphere, atmosphere.bottom_radius, atmosphere.mu_s_min);\n  Number A = (D - d_min) / (d_max - d_min);\n  // An ad-hoc function equal to 0 for mu_s = mu_s_min (because then d = D and\n  // thus a = A), equal to 1 for mu_s = 1 (because then d = d_min and thus\n  // a = 0), and with a large slope around mu_s = 0, to get more texture\n  // samples near the horizon.\n  Number u_mu_s = GetTextureCoordFromUnitRange(\n      max(1.0 - a / A, 0.0) / (1.0 + a), SCATTERING_TEXTURE_MU_S_SIZE);\n\n  Number u_nu = (nu + 1.0) / 2.0;\n  return vec4(u_nu, u_mu_s, u_mu, u_r);\n}\n\nvec2 GetIrradianceTextureUvFromRMuS(const AtmosphereParameters atmosphere,\n    const Length r, const Number mu_s) {\n  assert(r >= atmosphere.bottom_radius && r <= atmosphere.top_radius);\n  assert(mu_s >= -1.0 && mu_s <= 1.0);\n  Number x_r = (r - atmosphere.bottom_radius) /\n      (atmosphere.top_radius - atmosphere.bottom_radius);\n  Number x_mu_s = mu_s * 0.5 + 0.5;\n  return vec2(GetTextureCoordFromUnitRange(x_mu_s, IRRADIANCE_TEXTURE_WIDTH),\n              GetTextureCoordFromUnitRange(x_r, IRRADIANCE_TEXTURE_HEIGHT));\n}\n\nIrradianceSpectrum GetIrradiance(\n    const AtmosphereParameters atmosphere,\n    const IrradianceTexture irradiance_texture,\n    const Length r, const Number mu_s) {\n  vec2 uv = GetIrradianceTextureUvFromRMuS(atmosphere, r, mu_s);\n  return IrradianceSpectrum(texture(irradiance_texture, uv));\n}\n", Vo = "// Based on: https://github.com/ebruneton/precomputed_atmospheric_scattering/blob/master/atmosphere/definitions.glsl\n\n/**\n * Copyright (c) 2017 Eric Bruneton\n * All rights reserved.\n *\n * Redistribution and use in source and binary forms, with or without\n * modification, are permitted provided that the following conditions\n * are met:\n * 1. Redistributions of source code must retain the above copyright\n *    notice, this list of conditions and the following disclaimer.\n * 2. Redistributions in binary form must reproduce the above copyright\n *    notice, this list of conditions and the following disclaimer in the\n *    documentation and/or other materials provided with the distribution.\n * 3. Neither the name of the copyright holders nor the names of its\n *    contributors may be used to endorse or promote products derived from\n *    this software without specific prior written permission.\n *\n * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS \"AS IS\"\n * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE\n * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE\n * ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE\n * LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR\n * CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF\n * SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS\n * INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN\n * CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)\n * ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF\n * THE POSSIBILITY OF SUCH DAMAGE.\n */\n\n#define assert(x)\n\n#define Length float\n#define Wavelength float\n#define Angle float\n#define SolidAngle float\n#define Power float\n#define LuminousPower float\n\n#define Number float\n#define InverseLength float\n#define Area float\n#define Volume float\n#define NumberDensity float\n#define Irradiance float\n#define Radiance float\n#define SpectralPower float\n#define SpectralIrradiance float\n#define SpectralRadiance float\n#define SpectralRadianceDensity float\n#define ScatteringCoefficient float\n#define InverseSolidAngle float\n#define LuminousIntensity float\n#define Luminance float\n#define Illuminance float\n\n// A generic function from Wavelength to some other type.\n#define AbstractSpectrum vec3\n// A function from Wavelength to Number.\n#define DimensionlessSpectrum vec3\n// A function from Wavelength to SpectralPower.\n#define PowerSpectrum vec3\n// A function from Wavelength to SpectralIrradiance.\n#define IrradianceSpectrum vec3\n// A function from Wavelength to SpectralRadiance.\n#define RadianceSpectrum vec3\n// A function from Wavelength to SpectralRadianceDensity.\n#define RadianceDensitySpectrum vec3\n// A function from Wavelength to ScatteringCoefficient.\n#define ScatteringSpectrum vec3\n\n// A position in 3D (3 length values).\n#define Position vec3\n// A unit direction vector in 3D (3 unit-less values).\n#define Direction vec3\n// A vector of 3 luminance values.\n#define Luminance3 vec3\n// A vector of 3 illuminance values.\n#define Illuminance3 vec3\n\n#define TransmittanceTexture sampler2D\n#define AbstractScatteringTexture sampler3D\n#define ReducedScatteringTexture sampler3D\n#define ScatteringTexture sampler3D\n#define ScatteringDensityTexture sampler3D\n#define IrradianceTexture sampler2D\n\nconst Length m = 1.0;\nconst Wavelength nm = 1.0;\nconst Angle rad = 1.0;\nconst SolidAngle sr = 1.0;\nconst Power watt = 1.0;\nconst LuminousPower lm = 1.0;\n\n#if !defined(PI)\nconst float PI = 3.14159265358979323846;\n#endif // !defined(PI)\n\nconst Length km = 1000.0 * m;\nconst Area m2 = m * m;\nconst Volume m3 = m * m * m;\nconst Angle pi = PI * rad;\nconst Angle deg = pi / 180.0;\nconst Irradiance watt_per_square_meter = watt / m2;\nconst Radiance watt_per_square_meter_per_sr = watt / (m2 * sr);\nconst SpectralIrradiance watt_per_square_meter_per_nm = watt / (m2 * nm);\nconst SpectralRadiance watt_per_square_meter_per_sr_per_nm = watt / (m2 * sr * nm);\nconst SpectralRadianceDensity watt_per_cubic_meter_per_sr_per_nm = watt / (m3 * sr * nm);\nconst LuminousIntensity cd = lm / sr;\nconst LuminousIntensity kcd = 1000.0 * cd;\nconst Luminance cd_per_square_meter = cd / m2;\nconst Luminance kcd_per_square_meter = kcd / m2;\n\nstruct DensityProfileLayer {\n  Length width;\n  Number exp_term;\n  InverseLength exp_scale;\n  InverseLength linear_term;\n  Number constant_term;\n};\n\nstruct DensityProfile {\n  DensityProfileLayer layers[2];\n};\n\n// See AtmosphereParameter.ts for further details.\nstruct AtmosphereParameters {\n  IrradianceSpectrum solar_irradiance;\n  Angle sun_angular_radius;\n  Length bottom_radius;\n  Length top_radius;\n  DensityProfile rayleigh_density;\n  ScatteringSpectrum rayleigh_scattering;\n  DensityProfile mie_density;\n  ScatteringSpectrum mie_scattering;\n  ScatteringSpectrum mie_extinction;\n  Number mie_phase_function_g;\n  DensityProfile absorption_density;\n  ScatteringSpectrum absorption_extinction;\n  DimensionlessSpectrum ground_albedo;\n  Number mu_s_min;\n};\n", Ho = "// Based on: https://github.com/ebruneton/precomputed_atmospheric_scattering/blob/master/atmosphere/functions.glsl\n\n/**\n * Copyright (c) 2017 Eric Bruneton\n * All rights reserved.\n *\n * Redistribution and use in source and binary forms, with or without\n * modification, are permitted provided that the following conditions\n * are met:\n * 1. Redistributions of source code must retain the above copyright\n *    notice, this list of conditions and the following disclaimer.\n * 2. Redistributions in binary form must reproduce the above copyright\n *    notice, this list of conditions and the following disclaimer in the\n *    documentation and/or other materials provided with the distribution.\n * 3. Neither the name of the copyright holders nor the names of its\n *    contributors may be used to endorse or promote products derived from\n *    this software without specific prior written permission.\n *\n * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS \"AS IS\"\n * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE\n * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE\n * ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE\n * LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR\n * CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF\n * SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS\n * INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN\n * CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)\n * ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF\n * THE POSSIBILITY OF SUCH DAMAGE.\n *\n * Precomputed Atmospheric Scattering\n * Copyright (c) 2008 INRIA\n * All rights reserved.\n *\n * Redistribution and use in source and binary forms, with or without\n * modification, are permitted provided that the following conditions\n * are met:\n * 1. Redistributions of source code must retain the above copyright\n *    notice, this list of conditions and the following disclaimer.\n * 2. Redistributions in binary form must reproduce the above copyright\n *    notice, this list of conditions and the following disclaimer in the\n *    documentation and/or other materials provided with the distribution.\n * 3. Neither the name of the copyright holders nor the names of its\n *    contributors may be used to endorse or promote products derived from\n *    this software without specific prior written permission.\n *\n * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS \"AS IS\"\n * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE\n * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE\n * ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE\n * LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR\n * CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF\n * SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS\n * INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN\n * CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)\n * ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF\n * THE POSSIBILITY OF SUCH DAMAGE.\n */\n\n#ifdef COMBINED_SCATTERING_TEXTURES\nvec3 GetExtrapolatedSingleMieScattering(\n    const AtmosphereParameters atmosphere, const vec4 scattering) {\n  // Algebraically this can never be negative, but rounding errors can produce\n  // that effect for sufficiently short view rays.\n  // @shotamatsuda: Avoid division by infinitesimal values.\n  // See https://github.com/takram-design-engineering/three-geospatial/issues/47\n  if (scattering.r < 1e-5) {\n    return vec3(0.0);\n  }\n  return scattering.rgb * scattering.a / scattering.r *\n	    (atmosphere.rayleigh_scattering.r / atmosphere.mie_scattering.r) *\n	    (atmosphere.mie_scattering / atmosphere.rayleigh_scattering);\n}\n#endif // COMBINED_SCATTERING_TEXTURES\n\nIrradianceSpectrum GetCombinedScattering(\n    const AtmosphereParameters atmosphere,\n    const ReducedScatteringTexture scattering_texture,\n    const ReducedScatteringTexture single_mie_scattering_texture,\n    const Length r, const Number mu, const Number mu_s, const Number nu,\n    const bool ray_r_mu_intersects_ground,\n    out IrradianceSpectrum single_mie_scattering) {\n  vec4 uvwz = GetScatteringTextureUvwzFromRMuMuSNu(\n      atmosphere, r, mu, mu_s, nu, ray_r_mu_intersects_ground);\n  Number tex_coord_x = uvwz.x * Number(SCATTERING_TEXTURE_NU_SIZE - 1);\n  Number tex_x = floor(tex_coord_x);\n  Number lerp = tex_coord_x - tex_x;\n  vec3 uvw0 = vec3((tex_x + uvwz.y) / Number(SCATTERING_TEXTURE_NU_SIZE),\n      uvwz.z, uvwz.w);\n  vec3 uvw1 = vec3((tex_x + 1.0 + uvwz.y) / Number(SCATTERING_TEXTURE_NU_SIZE),\n      uvwz.z, uvwz.w);\n#ifdef COMBINED_SCATTERING_TEXTURES\n  vec4 combined_scattering =\n      texture(scattering_texture, uvw0) * (1.0 - lerp) +\n      texture(scattering_texture, uvw1) * lerp;\n  IrradianceSpectrum scattering = IrradianceSpectrum(combined_scattering);\n  single_mie_scattering =\n      GetExtrapolatedSingleMieScattering(atmosphere, combined_scattering);\n#else // COMBINED_SCATTERING_TEXTURES\n  IrradianceSpectrum scattering = IrradianceSpectrum(\n      texture(scattering_texture, uvw0) * (1.0 - lerp) +\n      texture(scattering_texture, uvw1) * lerp);\n  single_mie_scattering = IrradianceSpectrum(\n      texture(single_mie_scattering_texture, uvw0) * (1.0 - lerp) +\n      texture(single_mie_scattering_texture, uvw1) * lerp);\n#endif // COMBINED_SCATTERING_TEXTURES\n  return scattering;\n}\n\n// @shotamatsuda: Added for reading higher-order scattering texture.\n#ifdef HAS_HIGHER_ORDER_SCATTERING_TEXTURE\nIrradianceSpectrum GetScattering(\n    const AtmosphereParameters atmosphere,\n    const ReducedScatteringTexture scattering_texture,\n    const Length r, const Number mu, const Number mu_s, const Number nu,\n    const bool ray_r_mu_intersects_ground) {\n  vec4 uvwz = GetScatteringTextureUvwzFromRMuMuSNu(\n      atmosphere, r, mu, mu_s, nu, ray_r_mu_intersects_ground);\n  Number tex_coord_x = uvwz.x * Number(SCATTERING_TEXTURE_NU_SIZE - 1);\n  Number tex_x = floor(tex_coord_x);\n  Number lerp = tex_coord_x - tex_x;\n  vec3 uvw0 = vec3((tex_x + uvwz.y) / Number(SCATTERING_TEXTURE_NU_SIZE),\n      uvwz.z, uvwz.w);\n  vec3 uvw1 = vec3((tex_x + 1.0 + uvwz.y) / Number(SCATTERING_TEXTURE_NU_SIZE),\n      uvwz.z, uvwz.w);\n  IrradianceSpectrum scattering = IrradianceSpectrum(\n      texture(scattering_texture, uvw0) * (1.0 - lerp) +\n      texture(scattering_texture, uvw1) * lerp);\n  return scattering;\n}\n#endif // HAS_HIGHER_ORDER_SCATTERING_TEXTURE\n\nRadianceSpectrum GetSkyRadiance(\n    const AtmosphereParameters atmosphere,\n    const TransmittanceTexture transmittance_texture,\n    const ReducedScatteringTexture scattering_texture,\n    const ReducedScatteringTexture single_mie_scattering_texture,\n    Position camera, const Direction view_ray, const Length shadow_length,\n    const Direction sun_direction,\n    out DimensionlessSpectrum transmittance) {\n  // Compute the distance to the top atmosphere boundary along the view ray,\n  // assuming the viewer is in space (or NaN if the view ray does not intersect\n  // the atmosphere).\n  Length r = length(camera);\n  Length rmu = dot(camera, view_ray);\n  // @shotamatsuda: Use SafeSqrt instead.\n  // See: https://github.com/takram-design-engineering/three-geospatial/pull/26\n  Length distance_to_top_atmosphere_boundary = -rmu -\n      SafeSqrt(rmu * rmu - r * r +\n          atmosphere.top_radius * atmosphere.top_radius);\n  // If the viewer is in space and the view ray intersects the atmosphere, move\n  // the viewer to the top atmosphere boundary (along the view ray):\n  if (distance_to_top_atmosphere_boundary > 0.0 * m) {\n    camera = camera + view_ray * distance_to_top_atmosphere_boundary;\n    r = atmosphere.top_radius;\n    rmu += distance_to_top_atmosphere_boundary;\n  } else if (r > atmosphere.top_radius) {\n    // If the view ray does not intersect the atmosphere, simply return 0.\n    transmittance = DimensionlessSpectrum(1.0);\n    return RadianceSpectrum(0.0 * watt_per_square_meter_per_sr_per_nm);\n  }\n  // Compute the r, mu, mu_s and nu parameters needed for the texture lookups.\n  Number mu = rmu / r;\n  Number mu_s = dot(camera, sun_direction) / r;\n  Number nu = dot(view_ray, sun_direction);\n\n  // @shotamatsuda: For rendering points below the bottom atmosphere.\n  #ifdef GROUND\n  bool ray_r_mu_intersects_ground = RayIntersectsGround(atmosphere, r, mu);\n  #else // GROUND\n  bool ray_r_mu_intersects_ground = false;\n  #endif // GROUND\n\n  transmittance = ray_r_mu_intersects_ground ? DimensionlessSpectrum(0.0) :\n      GetTransmittanceToTopAtmosphereBoundary(\n          atmosphere, transmittance_texture, r, mu);\n  IrradianceSpectrum single_mie_scattering;\n  IrradianceSpectrum scattering;\n  if (shadow_length == 0.0 * m) {\n    scattering = GetCombinedScattering(\n        atmosphere, scattering_texture, single_mie_scattering_texture,\n        r, mu, mu_s, nu, ray_r_mu_intersects_ground,\n        single_mie_scattering);\n  } else {\n    // Case of light shafts (shadow_length is the total length noted l in our\n    // paper): we omit the scattering between the camera and the point at\n    // distance l, by implementing Eq. (18) of the paper (shadow_transmittance\n    // is the T(x,x_s) term, scattering is the S|x_s=x+lv term).\n    Length d = shadow_length;\n    Length r_p =\n        ClampRadius(atmosphere, sqrt(d * d + 2.0 * r * mu * d + r * r));\n    Number mu_p = (r * mu + d) / r_p;\n    Number mu_s_p = (r * mu_s + d * nu) / r_p;\n\n    scattering = GetCombinedScattering(\n        atmosphere, scattering_texture, single_mie_scattering_texture,\n        r_p, mu_p, mu_s_p, nu, ray_r_mu_intersects_ground,\n        single_mie_scattering);\n    DimensionlessSpectrum shadow_transmittance =\n        GetTransmittance(atmosphere, transmittance_texture,\n            r, mu, shadow_length, ray_r_mu_intersects_ground);\n    // @shotamatsuda: Occlude only single Rayleigh scattering by the shadow.\n#ifdef HAS_HIGHER_ORDER_SCATTERING_TEXTURE\n    IrradianceSpectrum higher_order_scattering = GetScattering(\n        atmosphere, higher_order_scattering_texture,\n        r_p, mu_p, mu_s_p, nu, ray_r_mu_intersects_ground);\n    IrradianceSpectrum single_scattering = scattering - higher_order_scattering;\n    scattering = single_scattering * shadow_transmittance + higher_order_scattering;\n#else // HAS_HIGHER_ORDER_SCATTERING_TEXTURE\n    scattering = scattering * shadow_transmittance;\n#endif // HAS_HIGHER_ORDER_SCATTERING_TEXTURE\n    single_mie_scattering = single_mie_scattering * shadow_transmittance;\n  }\n  return scattering * RayleighPhaseFunction(nu) + single_mie_scattering *\n      MiePhaseFunction(atmosphere.mie_phase_function_g, nu);\n}\n\n// @shotamatsuda: Returns the point on the ray closest to the origin.\nvec3 ClosestPointOnRay(const Position camera, const Position point) {\n  Position ray = point - camera;\n  Number t = clamp(-dot(camera, ray) / dot(ray, ray), 0.0, 1.0);\n  return camera + t * ray;\n}\n\nvec2 RaySphereIntersections(\n    const Position camera, const Direction direction, const Length radius) {\n  float b = 2.0 * dot(direction, camera);\n  float c = dot(camera, camera) - radius * radius;\n  float discriminant = b * b - 4.0 * c;\n  float Q = sqrt(discriminant);\n  return vec2(-b - Q, -b + Q) * 0.5;\n}\n\n// @shotamatsuda: Clip the view ray at the bottom atmosphere boundary.\nbool ClipAtBottomAtmosphere(\n    const AtmosphereParameters atmosphere,\n    const Direction view_ray, inout Position camera, inout Position point) {\n  const Length eps = 0.0;\n  Length bottom_radius = atmosphere.bottom_radius + eps;\n  Length r_camera = length(camera);\n  Length r_point = length(point);\n  bool camera_below = r_camera < bottom_radius;\n  bool point_below = r_point < bottom_radius;\n\n  vec2 t = RaySphereIntersections(camera, view_ray, bottom_radius);\n  Position intersection = camera + view_ray * (camera_below ? t.y : t.x);\n  camera = camera_below ? intersection : camera;\n  point = point_below ? intersection : point;\n\n  return camera_below && point_below;\n}\n\nRadianceSpectrum GetSkyRadianceToPoint(\n    const AtmosphereParameters atmosphere,\n    const TransmittanceTexture transmittance_texture,\n    const ReducedScatteringTexture scattering_texture,\n    const ReducedScatteringTexture single_mie_scattering_texture,\n    Position camera, Position point, const Length shadow_length,\n    const Direction sun_direction, out DimensionlessSpectrum transmittance) {\n  // @shotamatsuda: Avoid artifacts when the ray does not intersect the top\n  // atmosphere boundary.\n  if (length(ClosestPointOnRay(camera, point)) > atmosphere.top_radius) {\n    transmittance = vec3(1.0);\n    return vec3(0.0);\n  }\n\n  Direction view_ray = normalize(point - camera);\n  if (ClipAtBottomAtmosphere(atmosphere, view_ray, camera, point)) {\n    transmittance = vec3(1.0);\n    return vec3(0.0);\n  }\n\n  // Compute the distance to the top atmosphere boundary along the view ray,\n  // assuming the viewer is in space (or NaN if the view ray does not intersect\n  // the atmosphere).\n  Length r = length(camera);\n  Length rmu = dot(camera, view_ray);\n  // @shotamatsuda: Use SafeSqrt instead.\n  // See: https://github.com/takram-design-engineering/three-geospatial/pull/26\n  Length distance_to_top_atmosphere_boundary = -rmu -\n      SafeSqrt(rmu * rmu - r * r +\n          atmosphere.top_radius * atmosphere.top_radius);\n  // If the viewer is in space and the view ray intersects the atmosphere, move\n  // the viewer to the top atmosphere boundary (along the view ray):\n  if (distance_to_top_atmosphere_boundary > 0.0 * m) {\n    camera = camera + view_ray * distance_to_top_atmosphere_boundary;\n    r = atmosphere.top_radius;\n    rmu += distance_to_top_atmosphere_boundary;\n  }\n\n  // Compute the r, mu, mu_s and nu parameters for the first texture lookup.\n  Number mu = rmu / r;\n  Number mu_s = dot(camera, sun_direction) / r;\n  Number nu = dot(view_ray, sun_direction);\n  Length d = length(point - camera);\n  bool ray_r_mu_intersects_ground = RayIntersectsGround(atmosphere, r, mu);\n\n  // @shotamatsuda: Hack to avoid rendering artifacts near the horizon, due to\n  // finite atmosphere texture resolution and finite floating point precision.\n  // See: https://github.com/ebruneton/precomputed_atmospheric_scattering/pull/32\n  if (!ray_r_mu_intersects_ground) {\n    Number mu_horizon = -SafeSqrt(1.0 -\n        (atmosphere.bottom_radius * atmosphere.bottom_radius) / (r * r));\n    const Number eps = 0.004;\n    mu = max(mu, mu_horizon + eps);\n  }\n\n  transmittance = GetTransmittance(atmosphere, transmittance_texture,\n      r, mu, d, ray_r_mu_intersects_ground);\n\n  IrradianceSpectrum single_mie_scattering;\n  IrradianceSpectrum scattering = GetCombinedScattering(\n      atmosphere, scattering_texture, single_mie_scattering_texture,\n      r, mu, mu_s, nu, ray_r_mu_intersects_ground,\n      single_mie_scattering);\n\n  // Compute the r, mu, mu_s and nu parameters for the second texture lookup.\n  // If shadow_length is not 0 (case of light shafts), we want to ignore the\n  // scattering along the last shadow_length meters of the view ray, which we\n  // do by subtracting shadow_length from d (this way scattering_p is equal to\n  // the S|x_s=x_0-lv term in Eq. (17) of our paper).\n  d = max(d - shadow_length, 0.0 * m);\n  Length r_p = ClampRadius(atmosphere, sqrt(d * d + 2.0 * r * mu * d + r * r));\n  Number mu_p = (r * mu + d) / r_p;\n  Number mu_s_p = (r * mu_s + d * nu) / r_p;\n\n  IrradianceSpectrum single_mie_scattering_p;\n  IrradianceSpectrum scattering_p = GetCombinedScattering(\n      atmosphere, scattering_texture, single_mie_scattering_texture,\n      r_p, mu_p, mu_s_p, nu, ray_r_mu_intersects_ground,\n      single_mie_scattering_p);\n\n  // Combine the lookup results to get the scattering between camera and point.\n  DimensionlessSpectrum shadow_transmittance = transmittance;\n  if (shadow_length > 0.0 * m) {\n    // This is the T(x,x_s) term in Eq. (17) of our paper, for light shafts.\n    shadow_transmittance = GetTransmittance(atmosphere, transmittance_texture,\n        r, mu, d, ray_r_mu_intersects_ground);\n  }\n  // @shotamatsuda: Occlude only single Rayleigh scattering by the shadow.\n#ifdef HAS_HIGHER_ORDER_SCATTERING_TEXTURE\n  IrradianceSpectrum higher_order_scattering = GetScattering(\n      atmosphere, higher_order_scattering_texture,\n      r, mu, mu_s, nu, ray_r_mu_intersects_ground);\n  IrradianceSpectrum single_scattering = scattering - higher_order_scattering;\n  IrradianceSpectrum higher_order_scattering_p = GetScattering(\n      atmosphere, higher_order_scattering_texture,\n      r_p, mu_p, mu_s_p, nu, ray_r_mu_intersects_ground);\n  IrradianceSpectrum single_scattering_p =\n      scattering_p - higher_order_scattering_p;\n  scattering =\n      single_scattering - shadow_transmittance * single_scattering_p +\n      higher_order_scattering - transmittance * higher_order_scattering_p;\n#else // HAS_HIGHER_ORDER_SCATTERING_TEXTURE\n  scattering = scattering - shadow_transmittance * scattering_p;\n#endif // HAS_HIGHER_ORDER_SCATTERING_TEXTURE\n\n  single_mie_scattering =\n      single_mie_scattering - shadow_transmittance * single_mie_scattering_p;\n#ifdef COMBINED_SCATTERING_TEXTURES\n  single_mie_scattering = GetExtrapolatedSingleMieScattering(\n      atmosphere, vec4(scattering, single_mie_scattering.r));\n#endif // COMBINED_SCATTERING_TEXTURES\n\n  // Hack to avoid rendering artifacts when the sun is below the horizon.\n  single_mie_scattering = single_mie_scattering *\n      smoothstep(Number(0.0), Number(0.01), mu_s);\n\n  return scattering * RayleighPhaseFunction(nu) + single_mie_scattering *\n      MiePhaseFunction(atmosphere.mie_phase_function_g, nu);\n}\n\nIrradianceSpectrum GetSunAndSkyIrradiance(\n    const AtmosphereParameters atmosphere,\n    const TransmittanceTexture transmittance_texture,\n    const IrradianceTexture irradiance_texture,\n    const Position point, const Direction normal, const Direction sun_direction,\n    out IrradianceSpectrum sky_irradiance) {\n  Length r = length(point);\n  Number mu_s = dot(point, sun_direction) / r;\n\n  // Indirect irradiance (approximated if the surface is not horizontal).\n  sky_irradiance = GetIrradiance(atmosphere, irradiance_texture, r, mu_s) *\n      (1.0 + dot(normal, point) / r) * 0.5;\n\n  // Direct irradiance.\n  return atmosphere.solar_irradiance *\n      GetTransmittanceToSun(\n          atmosphere, transmittance_texture, r, mu_s) *\n      max(dot(normal, sun_direction), 0.0);\n}\n\n// @shotamatsuda: Added for the clouds.\nIrradianceSpectrum GetSunAndSkyScalarIrradiance(\n    const AtmosphereParameters atmosphere,\n    const TransmittanceTexture transmittance_texture,\n    const IrradianceTexture irradiance_texture,\n    const Position point, const Direction sun_direction,\n    out IrradianceSpectrum sky_irradiance) {\n  Length r = length(point);\n  Number mu_s = dot(point, sun_direction) / r;\n\n  // Indirect irradiance. Integral over sphere yields 2π.\n  sky_irradiance = GetIrradiance(atmosphere, irradiance_texture, r, mu_s) *\n      2.0 * PI;\n\n  // Direct irradiance. Omit the cosine term.\n  return atmosphere.solar_irradiance *\n      GetTransmittanceToSun(atmosphere, transmittance_texture, r, mu_s);\n}\n\nLuminance3 GetSolarLuminance() {\n  return ATMOSPHERE.solar_irradiance /\n      (PI * ATMOSPHERE.sun_angular_radius * ATMOSPHERE.sun_angular_radius) *\n      SUN_SPECTRAL_RADIANCE_TO_LUMINANCE;\n}\n\nLuminance3 GetSkyLuminance(\n    const Position camera, Direction view_ray, const Length shadow_length,\n    const Direction sun_direction, out DimensionlessSpectrum transmittance) {\n  return GetSkyRadiance(ATMOSPHERE, transmittance_texture,\n      scattering_texture, single_mie_scattering_texture,\n      camera, view_ray, shadow_length, sun_direction,\n      transmittance) * SKY_SPECTRAL_RADIANCE_TO_LUMINANCE;\n}\n\nLuminance3 GetSkyLuminanceToPoint(\n    const Position camera, const Position point, const Length shadow_length,\n    const Direction sun_direction, out DimensionlessSpectrum transmittance) {\n  return GetSkyRadianceToPoint(ATMOSPHERE, transmittance_texture,\n      scattering_texture, single_mie_scattering_texture,\n      camera, point, shadow_length, sun_direction, transmittance) *\n      SKY_SPECTRAL_RADIANCE_TO_LUMINANCE;\n}\n\nIlluminance3 GetSunAndSkyIlluminance(\n    const Position p, const Direction normal, const Direction sun_direction,\n    out IrradianceSpectrum sky_irradiance) {\n  IrradianceSpectrum sun_irradiance = GetSunAndSkyIrradiance(\n      ATMOSPHERE, transmittance_texture, irradiance_texture, p, normal,\n      sun_direction, sky_irradiance);\n  sky_irradiance *= SKY_SPECTRAL_RADIANCE_TO_LUMINANCE;\n  return sun_irradiance * SUN_SPECTRAL_RADIANCE_TO_LUMINANCE;\n}\n\n// @shotamatsuda: Added for the clouds.\nIlluminance3 GetSunAndSkyScalarIlluminance(\n    const Position p, const Direction sun_direction,\n    out IrradianceSpectrum sky_irradiance) {\n  IrradianceSpectrum sun_irradiance = GetSunAndSkyScalarIrradiance(\n      ATMOSPHERE, transmittance_texture, irradiance_texture, p,\n      sun_direction, sky_irradiance);\n  sky_irradiance *= SKY_SPECTRAL_RADIANCE_TO_LUMINANCE;\n  return sun_irradiance * SUN_SPECTRAL_RADIANCE_TO_LUMINANCE;\n}\n\n#define GetSolarRadiance GetSolarLuminance\n#define GetSkyRadiance GetSkyLuminance\n#define GetSkyRadianceToPoint GetSkyLuminanceToPoint\n#define GetSunAndSkyIrradiance GetSunAndSkyIlluminance\n#define GetSunAndSkyScalarIrradiance GetSunAndSkyScalarIlluminance\n", Uo = /* @__PURE__ */ new j(.2126, .7152, .0722), Wo = [
	"solarIrradiance",
	"sunAngularRadius",
	"bottomRadius",
	"topRadius",
	"rayleighDensity",
	"rayleighScattering",
	"mieDensity",
	"mieScattering",
	"mieExtinction",
	"miePhaseFunctionG",
	"absorptionDensity",
	"absorptionExtinction",
	"groundAlbedo",
	"muSMin",
	"skyRadianceToLuminance",
	"sunRadianceToLuminance"
];
function Go(e, t) {
	if (t != null) for (let n of Wo) {
		let r = t[n];
		r != null && (e[n] instanceof j ? e[n].copy(r) : e[n] = r);
	}
}
var Ko = class {
	constructor(e, t, n, r, i) {
		this.width = e, this.expTerm = t, this.expScale = n, this.linearTerm = r, this.constantTerm = i;
	}
	toUniform() {
		return new k({
			width: this.width,
			exp_term: this.expTerm,
			exp_scale: this.expScale,
			linear_term: this.linearTerm,
			constant_term: this.constantTerm
		});
	}
}, qo = class {
	constructor(e) {
		this.solarIrradiance = new j(1.474, 1.8504, 1.91198), this.sunAngularRadius = .004675, this.bottomRadius = 636e4, this.topRadius = 642e4, this.rayleighDensity = [new Ko(0, 0, 0, 0, 0), new Ko(0, 1, -.125, 0, 0)], this.rayleighScattering = new j(.005802, .013558, .0331), this.mieDensity = [new Ko(0, 0, 0, 0, 0), new Ko(0, 1, -.833333, 0, 0)], this.mieScattering = new j(.003996, .003996, .003996), this.mieExtinction = new j(.00444, .00444, .00444), this.miePhaseFunctionG = .8, this.absorptionDensity = [new Ko(25, 0, 0, 1 / 15, -2 / 3), new Ko(0, 0, 0, -1 / 15, 8 / 3)], this.absorptionExtinction = new j(65e-5, .001881, 85e-6), this.groundAlbedo = new w().setScalar(.1), this.muSMin = Math.cos(Qa(120)), this.sunRadianceToLuminance = new j(98242.786222, 69954.398112, 66475.012354), this.skyRadianceToLuminance = new j(114974.916437, 71305.954816, 65310.548555), this.sunRadianceToRelativeLuminance = new j(), this.skyRadianceToRelativeLuminance = new j(), Go(this, e);
		let t = Uo.dot(this.sunRadianceToLuminance);
		this.sunRadianceToRelativeLuminance.copy(this.sunRadianceToLuminance).divideScalar(t), this.skyRadianceToRelativeLuminance.copy(this.skyRadianceToLuminance).divideScalar(t);
	}
	toUniform() {
		return new k({
			solar_irradiance: this.solarIrradiance,
			sun_angular_radius: this.sunAngularRadius,
			bottom_radius: this.bottomRadius * Lo,
			top_radius: this.topRadius * Lo,
			rayleigh_density: { layers: this.rayleighDensity.map((e) => e.toUniform().value) },
			rayleigh_scattering: this.rayleighScattering,
			mie_density: { layers: this.mieDensity.map((e) => e.toUniform().value) },
			mie_scattering: this.mieScattering,
			mie_extinction: this.mieExtinction,
			mie_phase_function_g: this.miePhaseFunctionG,
			absorption_density: { layers: this.absorptionDensity.map((e) => e.toUniform().value) },
			absorption_extinction: this.absorptionExtinction,
			ground_albedo: this.groundAlbedo,
			mu_s_min: this.muSMin
		});
	}
};
qo.DEFAULT = /* @__PURE__ */ new qo();
var Jo = qo, Yo = "precision highp sampler2DArray;\n\n#include \"core/depth\"\n#include \"core/math\"\n#include \"core/packing\"\n#include \"core/transform\"\n#ifdef HAS_SHADOW\n#include \"core/raySphereIntersection\"\n#include \"core/cascadedShadowMaps\"\n#include \"core/interleavedGradientNoise\"\n#include \"core/vogelDisk\"\n#endif // HAS_SHADOW\n\n#include \"bruneton/definitions\"\n\nuniform AtmosphereParameters ATMOSPHERE;\nuniform vec3 SUN_SPECTRAL_RADIANCE_TO_LUMINANCE;\nuniform vec3 SKY_SPECTRAL_RADIANCE_TO_LUMINANCE;\n\nuniform sampler2D transmittance_texture;\nuniform sampler3D scattering_texture;\nuniform sampler2D irradiance_texture;\nuniform sampler3D single_mie_scattering_texture;\nuniform sampler3D higher_order_scattering_texture;\n\n#include \"bruneton/common\"\n#include \"bruneton/runtime\"\n\nuniform sampler2D normalBuffer;\n\nuniform mat4 projectionMatrix;\nuniform mat4 viewMatrix;\nuniform mat4 inverseProjectionMatrix;\nuniform mat4 inverseViewMatrix;\nuniform float bottomRadius;\nuniform mat4 worldToECEFMatrix;\nuniform float geometricErrorCorrectionAmount;\nuniform vec3 sunDirection;\nuniform float cosSunAngularRadius;\nuniform vec3 moonDirection;\nuniform float moonAngularRadius;\nuniform float lunarRadianceScale;\nuniform float albedoScale;\n\n#include \"sky\"\n\n#ifdef HAS_LIGHTING_MASK\nuniform sampler2D lightingMaskBuffer;\n#endif // HAS_LIGHTING_MASK\n\n// prettier-ignore\n#define LIGHTING_MASK_CHANNEL_ LIGHTING_MASK_CHANNEL\n\n#ifdef HAS_OVERLAY\nuniform sampler2D overlayBuffer;\n#endif // HAS_OVERLAY\n\n#ifdef HAS_SHADOW\nuniform sampler2DArray shadowBuffer;\nuniform vec2 shadowIntervals[SHADOW_CASCADE_COUNT];\nuniform mat4 shadowMatrices[SHADOW_CASCADE_COUNT];\nuniform mat4 inverseShadowMatrices[SHADOW_CASCADE_COUNT];\nuniform float shadowFar;\nuniform float shadowTopHeight;\nuniform float shadowRadius;\nuniform sampler3D stbnTexture;\nuniform int frame;\n#endif // HAS_SHADOW\n\n#ifdef HAS_SHADOW_LENGTH\nuniform sampler2D shadowLengthBuffer;\n#endif // HAS_SHADOW_LENGTH\n\nvarying vec3 vCameraPosition;\nvarying vec3 vRayDirection;\nvarying vec3 vGeometryAltitudeCorrection;\nvarying vec3 vEllipsoidRadiiSquared;\n\nvec3 readNormal(const vec2 uv, out bool degenerate) {\n  vec3 normal = texture(normalBuffer, uv).xyz;\n  degenerate = normal == vec3(0.0);\n  #ifdef OCT_ENCODED_NORMAL\n  return unpackVec2ToNormal(normal.xy);\n  #else // OCT_ENCODED_NORMAL\n  return 2.0 * normal - 1.0;\n  #endif // OCT_ENCODED_NORMAL\n}\n\nvoid correctGeometricError(inout vec3 positionECEF, inout vec3 normalECEF) {\n  // TODO: The error is pronounced at the edge of the ellipsoid due to the\n  // large difference between the sphere position and the unprojected position\n  // at the current fragment. Calculating the sphere position from the fragment\n  // UV may resolve this.\n\n  // Correct way is slerp, but this will be small-angle interpolation anyways.\n  vec3 sphereNormal = normalize(positionECEF / vEllipsoidRadiiSquared);\n  vec3 spherePosition = ATMOSPHERE.bottom_radius * sphereNormal;\n  normalECEF = mix(normalECEF, sphereNormal, geometricErrorCorrectionAmount);\n  positionECEF = mix(positionECEF, spherePosition, geometricErrorCorrectionAmount);\n}\n\n#if defined(SUN_LIGHT) || defined(SKY_LIGHT)\n\nvec3 getSunSkyIrradiance(\n  const vec3 positionECEF,\n  const vec3 normal,\n  const vec3 inputColor,\n  const float sunTransmittance\n) {\n  // Assume lambertian BRDF. If both SUN_LIGHT and SKY_LIGHT are not defined,\n  // regard the inputColor as radiance at the texel.\n  vec3 diffuse = inputColor * albedoScale * RECIPROCAL_PI;\n  vec3 skyIrradiance;\n  vec3 sunIrradiance = GetSunAndSkyIrradiance(positionECEF, normal, sunDirection, skyIrradiance);\n\n  #ifdef HAS_SHADOW\n  sunIrradiance *= sunTransmittance;\n  #endif // HAS_SHADOW\n\n  #if defined(SUN_LIGHT) && defined(SKY_LIGHT)\n  return diffuse * (sunIrradiance + skyIrradiance);\n  #elif defined(SUN_LIGHT)\n  return diffuse * sunIrradiance;\n  #elif defined(SKY_LIGHT)\n  return diffuse * skyIrradiance;\n  #endif // defined(SUN_LIGHT) && defined(SKY_LIGHT)\n}\n\n#endif // defined(SUN_LIGHT) || defined(SKY_LIGHT)\n\n#if defined(TRANSMITTANCE) || defined(INSCATTER)\n\nvoid applyTransmittanceInscatter(const vec3 positionECEF, float shadowLength, inout vec3 radiance) {\n  vec3 transmittance;\n  vec3 inscatter = GetSkyRadianceToPoint(\n    vCameraPosition,\n    positionECEF,\n    shadowLength,\n    sunDirection,\n    transmittance\n  );\n  #ifdef TRANSMITTANCE\n  radiance = radiance * transmittance;\n  #endif // TRANSMITTANCE\n  #ifdef INSCATTER\n  radiance = radiance + inscatter;\n  #endif // INSCATTER\n}\n\n#endif // defined(TRANSMITTANCE) || defined(INSCATTER)\n\n#ifdef HAS_SHADOW\n\nfloat getSTBN() {\n  ivec3 size = textureSize(stbnTexture, 0);\n  vec3 scale = 1.0 / vec3(size);\n  return texture(stbnTexture, vec3(gl_FragCoord.xy, float(frame % size.z)) * scale).r;\n}\n\nvec2 getShadowUv(const vec3 worldPosition, const int cascadeIndex) {\n  vec4 clip = shadowMatrices[cascadeIndex] * vec4(worldPosition, 1.0);\n  clip /= clip.w;\n  return clip.xy * 0.5 + 0.5;\n}\n\nfloat getDistanceToShadowTop(const vec3 positionECEF) {\n  // Distance to the top of the shadows along the sun direction, which matches\n  // the ray origin of BSM.\n  return raySphereSecondIntersection(\n    positionECEF / METER_TO_LENGTH_UNIT, // TODO: Make units consistent\n    sunDirection,\n    vec3(0.0),\n    bottomRadius + shadowTopHeight\n  );\n}\n\nfloat readShadowOpticalDepth(const vec2 uv, const float distanceToTop, const int cascadeIndex) {\n  // r: frontDepth, g: meanExtinction, b: maxOpticalDepth, a: maxOpticalDepthTail\n  vec4 shadow = texture(shadowBuffer, vec3(uv, float(cascadeIndex)));\n  // Omit adding maxOpticalDepthTail to avoid pronounced aliasing. Ground\n  // shadow will be attenuated by inscatter anyways.\n  return min(shadow.b, shadow.g * max(0.0, distanceToTop - shadow.r));\n}\n\nfloat sampleShadowOpticalDepthPCF(\n  const vec3 worldPosition,\n  const float distanceToTop,\n  const float radius,\n  const int cascadeIndex\n) {\n  vec2 uv = getShadowUv(worldPosition, cascadeIndex);\n  if (uv.x < 0.0 || uv.x > 1.0 || uv.y < 0.0 || uv.y > 1.0) {\n    return 0.0;\n  }\n\n  vec2 texelSize = vec2(1.0) / vec2(textureSize(shadowBuffer, 0).xy);\n  float sum = 0.0;\n  vec2 offset;\n  #pragma unroll_loop_start\n  for (int i = 0; i < 16; ++i) {\n    #if UNROLLED_LOOP_INDEX < SHADOW_SAMPLE_COUNT\n    offset = vogelDisk(\n      UNROLLED_LOOP_INDEX,\n      SHADOW_SAMPLE_COUNT,\n      interleavedGradientNoise(gl_FragCoord.xy) * PI2\n    );\n    sum += readShadowOpticalDepth(uv + offset * radius * texelSize, distanceToTop, cascadeIndex);\n    #endif // UNROLLED_LOOP_INDEX < SHADOW_SAMPLE_COUNT\n  }\n  #pragma unroll_loop_end\n  return sum / float(SHADOW_SAMPLE_COUNT);\n}\n\nfloat sampleShadowOpticalDepth(\n  const vec3 worldPosition,\n  const vec3 positionECEF,\n  const float radius,\n  const float jitter\n) {\n  float distanceToTop = getDistanceToShadowTop(positionECEF);\n  if (distanceToTop <= 0.0) {\n    return 0.0;\n  }\n  int cascadeIndex = getFadedCascadeIndex(\n    viewMatrix,\n    worldPosition,\n    shadowIntervals,\n    cameraNear,\n    shadowFar,\n    jitter\n  );\n  return cascadeIndex >= 0\n    ? sampleShadowOpticalDepthPCF(worldPosition, distanceToTop, radius, cascadeIndex)\n    : 0.0;\n}\n\nfloat getShadowRadius(const vec3 worldPosition) {\n  vec4 clip = shadowMatrices[0] * vec4(worldPosition, 1.0);\n  clip /= clip.w;\n\n  // Offset by 1px in each direction in shadow's clip coordinates.\n  vec2 shadowSize = vec2(textureSize(shadowBuffer, 0));\n  vec3 offset = vec3(2.0 / shadowSize, 0.0);\n  vec4 clipX = clip + offset.xzzz;\n  vec4 clipY = clip + offset.zyzz;\n\n  // Convert back to world space.\n  vec4 worldX = inverseShadowMatrices[0] * clipX;\n  vec4 worldY = inverseShadowMatrices[0] * clipY;\n\n  // Project into the main camera's clip space.\n  mat4 viewProjectionMatrix = projectionMatrix * viewMatrix;\n  vec4 projected = viewProjectionMatrix * vec4(worldPosition, 1.0);\n  vec4 projectedX = viewProjectionMatrix * worldX;\n  vec4 projectedY = viewProjectionMatrix * worldY;\n  projected /= projected.w;\n  projectedX /= projectedX.w;\n  projectedY /= projectedY.w;\n\n  // Take the mean of pixel sizes.\n  vec2 center = (projected.xy * 0.5 + 0.5) * resolution;\n  vec2 offsetX = (projectedX.xy * 0.5 + 0.5) * resolution;\n  vec2 offsetY = (projectedY.xy * 0.5 + 0.5) * resolution;\n  float size = max(length(offsetX - center), length(offsetY - center));\n\n  return remapClamped(size, 10.0, 50.0, 0.0, shadowRadius);\n}\n\n#endif // HAS_SHADOW\n\nvoid mainImage(const vec4 inputColor, const vec2 uv, out vec4 outputColor) {\n  #if defined(HAS_LIGHTING_MASK) && defined(DEBUG_SHOW_LIGHTING_MASK)\n  outputColor.rgb = vec3(texture(lightingMaskBuffer, uv).LIGHTING_MASK_CHANNEL_);\n  outputColor.a = 1.0;\n  return;\n  #endif // defined(HAS_LIGHTING_MASK) && defined(DEBUG_SHOW_LIGHTING_MASK)\n\n  float shadowLength = 0.0;\n  #ifdef HAS_SHADOW_LENGTH\n  shadowLength = texture(shadowLengthBuffer, uv).r;\n  #endif // HAS_SHADOW_LENGTH\n\n  #ifdef HAS_OVERLAY\n  vec4 overlay = texture(overlayBuffer, uv);\n  if (overlay.a == 1.0) {\n    outputColor = overlay;\n    return;\n  }\n  #endif // HAS_OVERLAY\n\n  vec3 rayDirection = normalize(vRayDirection);\n  vec3 dRDdx = dFdx(rayDirection);\n  vec3 dRDdy = dFdy(rayDirection);\n  float fragmentAngle = length(dRDdx + dRDdy) / length(rayDirection);\n\n  float depth = readDepthValue(depthBuffer, uv);\n  if (depth >= 1.0 - 1e-8) {\n    #ifdef SKY\n    outputColor.rgb = getSkyRadiance(\n      vCameraPosition,\n      rayDirection,\n      shadowLength,\n      sunDirection,\n      moonDirection,\n      moonAngularRadius,\n      lunarRadianceScale,\n      fragmentAngle\n    );\n    outputColor.a = 1.0;\n    #else // SKY\n    outputColor = inputColor;\n    #endif // SKY\n\n    #ifdef HAS_OVERLAY\n    outputColor.rgb = outputColor.rgb * (1.0 - overlay.a) + overlay.rgb;\n    #endif // HAS_OVERLAY\n    return;\n  }\n  depth = reverseLogDepth(depth, cameraNear, cameraFar);\n\n  // Reconstruct position and normal in world space.\n  vec3 viewPosition = screenToView(\n    uv,\n    depth,\n    getViewZ(depth),\n    projectionMatrix,\n    inverseProjectionMatrix\n  );\n  vec3 worldPosition = (inverseViewMatrix * vec4(viewPosition, 1.0)).xyz;\n  vec3 positionECEF = (worldToECEFMatrix * vec4(worldPosition, 1.0)).xyz;\n  positionECEF = positionECEF * METER_TO_LENGTH_UNIT + vGeometryAltitudeCorrection;\n\n  vec3 viewNormal;\n  bool degenerateNormal = false;\n  #ifdef RECONSTRUCT_NORMAL\n  vec3 dVPdx = dFdx(viewPosition);\n  vec3 dVPdy = dFdy(viewPosition);\n  viewNormal = normalize(cross(dVPdx, dVPdy));\n  #elif defined(HAS_NORMALS)\n  viewNormal = readNormal(uv, degenerateNormal);\n  #endif // defined(HAS_NORMALS)\n\n  #if defined(RECONSTRUCT_NORMAL) || defined(HAS_NORMALS)\n  vec3 worldNormal = (inverseViewMatrix * vec4(viewNormal, 0.0)).xyz;\n  vec3 normalECEF = (worldToECEFMatrix * vec4(worldNormal, 0.0)).xyz;\n  #else // defined(RECONSTRUCT_NORMAL) || defined(HAS_NORMALS)\n  vec3 normalECEF = normalize(positionECEF);\n  #endif // defined(RECONSTRUCT_NORMAL) || defined(HAS_NORMALS)\n\n  #ifdef CORRECT_GEOMETRIC_ERROR\n  correctGeometricError(positionECEF, normalECEF);\n  #endif // CORRECT_GEOMETRIC_ERROR\n\n  #ifdef HAS_SHADOW\n  float stbn = getSTBN();\n  float radius = getShadowRadius(worldPosition);\n  float opticalDepth = sampleShadowOpticalDepth(worldPosition, positionECEF, radius, stbn);\n  float sunTransmittance = exp(-opticalDepth);\n  #else // HAS_SHADOW\n  float sunTransmittance = 1.0;\n  #endif // HAS_SHADOW\n\n  vec3 radiance;\n  #if defined(SUN_LIGHT) || defined(SKY_LIGHT)\n  // WORKAROUND: When both post-process lighting and sky options are enabled,\n  // stars have degenerate normals. We use this to disable irradiance, which is\n  // irrelevant for them.\n  if (!degenerateNormal) {\n    radiance = getSunSkyIrradiance(positionECEF, normalECEF, inputColor.rgb, sunTransmittance);\n  } else {\n    radiance = inputColor.rgb;\n  }\n  #ifdef HAS_LIGHTING_MASK\n  float lightingMask = texture(lightingMaskBuffer, uv).LIGHTING_MASK_CHANNEL_;\n  radiance = mix(inputColor.rgb, radiance, lightingMask);\n  #endif // HAS_LIGHTING_MASK\n  #else // defined(SUN_LIGHT) || defined(SKY_LIGHT)\n  radiance = inputColor.rgb;\n  #endif // defined(SUN_LIGHT) || defined(SKY_LIGHT)\n\n  #if defined(TRANSMITTANCE) || defined(INSCATTER)\n  applyTransmittanceInscatter(positionECEF, shadowLength, radiance);\n  #endif // defined(TRANSMITTANCE) || defined(INSCATTER)\n\n  outputColor = vec4(radiance, inputColor.a);\n\n  #ifdef HAS_OVERLAY\n  outputColor.rgb = outputColor.rgb * (1.0 - overlay.a) + overlay.rgb;\n  #endif // HAS_OVERLAY\n}\n", Xo = "uniform mat4 inverseViewMatrix;\nuniform mat4 inverseProjectionMatrix;\nuniform vec3 cameraPosition;\nuniform mat4 worldToECEFMatrix;\nuniform vec3 altitudeCorrection;\nuniform float geometricErrorCorrectionAmount;\nuniform vec3 ellipsoidRadii;\n\nvarying vec3 vCameraPosition;\nvarying vec3 vRayDirection;\nvarying vec3 vGeometryAltitudeCorrection;\nvarying vec3 vEllipsoidRadiiSquared;\n\nvoid getCameraRay(out vec3 origin, out vec3 direction) {\n  bool isPerspective = inverseProjectionMatrix[2][3] != 0.0; // 4th entry in the 3rd column\n\n  if (isPerspective) {\n    // Calculate the camera ray for a perspective camera.\n    vec4 viewPosition = inverseProjectionMatrix * vec4(position, 1.0);\n    vec4 worldDirection = inverseViewMatrix * vec4(viewPosition.xyz, 0.0);\n    origin = cameraPosition;\n    direction = worldDirection.xyz;\n  } else {\n    // Unprojected points to calculate direction.\n    vec4 nearPoint = inverseProjectionMatrix * vec4(position.xy, -1.0, 1.0);\n    vec4 farPoint = inverseProjectionMatrix * vec4(position.xy, -0.9, 1.0);\n    nearPoint /= nearPoint.w;\n    farPoint /= farPoint.w;\n\n    // Calculate world values.\n    vec4 worldDirection = inverseViewMatrix * vec4(farPoint.xyz - nearPoint.xyz, 0.0);\n    vec4 worldOrigin = inverseViewMatrix * nearPoint;\n\n    // Outputs\n    direction = worldDirection.xyz;\n    origin = worldOrigin.xyz;\n  }\n}\n\nvoid mainSupport() {\n  vec3 direction, origin;\n  getCameraRay(origin, direction);\n\n  vec3 cameraPositionECEF = (worldToECEFMatrix * vec4(origin, 1.0)).xyz;\n  vCameraPosition = (cameraPositionECEF + altitudeCorrection) * METER_TO_LENGTH_UNIT;\n  vRayDirection = (worldToECEFMatrix * vec4(direction, 0.0)).xyz;\n\n  vGeometryAltitudeCorrection = altitudeCorrection * METER_TO_LENGTH_UNIT;\n  // Gradually turn off the altitude correction on geometries as the geometric\n  // error correction takes effect, because that on the ideal sphere will be\n  // over corrected.\n  // See: https://github.com/takram-design-engineering/three-geospatial/pull/23#issuecomment-2542914656\n  #ifdef CORRECT_GEOMETRIC_ERROR\n  vGeometryAltitudeCorrection *= 1.0 - geometricErrorCorrectionAmount;\n  #endif // CORRECT_GEOMETRIC_ERROR\n\n  vec3 radii = ellipsoidRadii * METER_TO_LENGTH_UNIT;\n  vEllipsoidRadiiSquared = radii * radii;\n}\n", Zo = "vec3 getLunarRadiance(const float moonAngularRadius) {\n  // Not a physical number but the order of 10^-6 relative to the sun may fit.\n  vec3 radiance =\n    ATMOSPHERE.solar_irradiance *\n    0.000002 /\n    (PI * moonAngularRadius * moonAngularRadius) *\n    SUN_SPECTRAL_RADIANCE_TO_LUMINANCE;\n  return radiance;\n}\n\nfloat intersectSphere(const vec3 ray, const vec3 point, const float radius) {\n  vec3 P = -point;\n  float PoR = dot(P, ray);\n  float D = dot(P, P) - radius * radius;\n  return -PoR - sqrt(PoR * PoR - D);\n}\n\nfloat orenNayarDiffuse(const vec3 L, const vec3 V, const vec3 N) {\n  float NoL = dot(N, L);\n  float NoV = dot(N, V);\n  float s = dot(L, V) - NoL * NoV;\n  float t = mix(1.0, max(NoL, NoV), step(0.0, s));\n  return max(0.0, NoL) * (0.62406015 + 0.41284404 * s / t);\n}\n\nvec3 getSkyRadiance(\n  const vec3 cameraPosition,\n  const vec3 rayDirection,\n  const float shadowLength,\n  const vec3 sunDirection,\n  const vec3 moonDirection,\n  const float moonAngularRadius,\n  const float lunarRadianceScale,\n  const float fragmentAngle\n) {\n  vec3 transmittance;\n  vec3 radiance = GetSkyRadiance(\n    cameraPosition,\n    rayDirection,\n    shadowLength,\n    sunDirection,\n    transmittance\n  );\n\n  // Rendering celestial objects without perspective doesn't make sense.\n  #ifdef PERSPECTIVE_CAMERA\n\n  #ifdef SUN\n  float viewDotSun = dot(rayDirection, sunDirection);\n  if (viewDotSun > cosSunAngularRadius) {\n    float angle = acos(clamp(viewDotSun, -1.0, 1.0));\n    float antialias = smoothstep(\n      ATMOSPHERE.sun_angular_radius,\n      ATMOSPHERE.sun_angular_radius - fragmentAngle,\n      angle\n    );\n    radiance += transmittance * GetSolarRadiance() * antialias;\n  }\n  #endif // SUN\n\n  #ifdef MOON\n  float intersection = intersectSphere(rayDirection, moonDirection, moonAngularRadius);\n  if (intersection > 0.0) {\n    vec3 normal = normalize(moonDirection - rayDirection * intersection);\n    float diffuse = orenNayarDiffuse(-sunDirection, rayDirection, normal);\n    float viewDotMoon = dot(rayDirection, moonDirection);\n    float angle = acos(clamp(viewDotMoon, -1.0, 1.0));\n    float antialias = smoothstep(moonAngularRadius, moonAngularRadius - fragmentAngle, angle);\n    radiance +=\n      transmittance *\n      getLunarRadiance(moonAngularRadius) *\n      lunarRadianceScale *\n      diffuse *\n      antialias;\n  }\n  #endif // MOON\n\n  #endif // PERSPECTIVE_CAMERA\n\n  return radiance;\n}\n", Qo = Object.defineProperty, $o = (e, t, n, r) => {
	for (var i = void 0, a = e.length - 1, o; a >= 0; a--) (o = e[a]) && (i = o(t, n, i) || i);
	return i && Qo(t, n, i), i;
}, es = /* @__PURE__ */ new j(), ts = /* @__PURE__ */ new j(), ns = /* @__PURE__ */ new dr(), rs = {
	blendFunction: fn.NORMAL,
	octEncodedNormal: !1,
	reconstructNormal: !1,
	ellipsoid: sr.WGS84,
	correctAltitude: !0,
	correctGeometricError: !0,
	sunLight: !1,
	skyLight: !1,
	transmittance: !0,
	inscatter: !0,
	albedoScale: 1,
	sky: !1,
	sun: !0,
	moon: !0,
	moonAngularRadius: .0045,
	lunarRadianceScale: 1,
	ground: !0
}, is = class extends gn {
	constructor(e = new He(), t, n = Jo.DEFAULT) {
		let { blendFunction: r, normalBuffer: i = null, octEncodedNormal: a, reconstructNormal: o, irradianceTexture: s = null, scatteringTexture: c = null, transmittanceTexture: l = null, singleMieScatteringTexture: u = null, higherOrderScatteringTexture: d = null, ellipsoid: f, correctAltitude: p, correctGeometricError: m, sunDirection: h, sunLight: g, skyLight: _, transmittance: v, inscatter: y, albedoScale: b, sky: x, sun: ee, moon: S, moonDirection: te, moonAngularRadius: ne, lunarRadianceScale: re, ground: ie } = {
			...rs,
			...t
		};
		super("AerialPerspectiveEffect", ho(uo(Yo, {
			core: {
				depth: Do,
				packing: jo,
				math: Ao,
				transform: No,
				raySphereIntersection: Mo,
				cascadedShadowMaps: Eo,
				interleavedGradientNoise: ko,
				vogelDisk: Fo
			},
			bruneton: {
				common: Bo,
				definitions: Vo,
				runtime: Ho
			},
			sky: Zo
		})), {
			blendFunction: r,
			vertexShader: Xo,
			attributes: _n.DEPTH,
			uniforms: new Map(Object.entries({
				normalBuffer: new k(i),
				projectionMatrix: new k(new E()),
				viewMatrix: new k(new E()),
				inverseProjectionMatrix: new k(new E()),
				inverseViewMatrix: new k(new E()),
				cameraPosition: new k(new j()),
				bottomRadius: new k(n.bottomRadius),
				ellipsoidRadii: new k(new j()),
				worldToECEFMatrix: new k(new E()),
				altitudeCorrection: new k(new j()),
				geometricErrorCorrectionAmount: new k(0),
				sunDirection: new k(h?.clone() ?? new j()),
				cosSunAngularRadius: new k(n.sunAngularRadius),
				albedoScale: new k(b),
				moonDirection: new k(te?.clone() ?? new j()),
				moonAngularRadius: new k(ne),
				lunarRadianceScale: new k(re),
				overlayBuffer: new k(null),
				shadowBuffer: new k(null),
				shadowMapSize: new k(new A()),
				shadowIntervals: new k([]),
				shadowMatrices: new k([]),
				inverseShadowMatrices: new k([]),
				shadowFar: new k(0),
				shadowTopHeight: new k(0),
				shadowRadius: new k(3),
				stbnTexture: new k(null),
				frame: new k(0),
				shadowLengthBuffer: new k(null),
				lightingMaskBuffer: new k(null),
				ATMOSPHERE: n.toUniform(),
				SUN_SPECTRAL_RADIANCE_TO_LUMINANCE: new k(n.sunRadianceToRelativeLuminance),
				SKY_SPECTRAL_RADIANCE_TO_LUMINANCE: new k(n.skyRadianceToRelativeLuminance),
				irradiance_texture: new k(s),
				scattering_texture: new k(c),
				transmittance_texture: new k(l),
				single_mie_scattering_texture: new k(null),
				higher_order_scattering_texture: new k(null)
			})),
			defines: /* @__PURE__ */ new Map([
				["TRANSMITTANCE_TEXTURE_WIDTH", 256 .toFixed(0)],
				["TRANSMITTANCE_TEXTURE_HEIGHT", 64 .toFixed(0)],
				["SCATTERING_TEXTURE_R_SIZE", 32 .toFixed(0)],
				["SCATTERING_TEXTURE_MU_SIZE", 128 .toFixed(0)],
				["SCATTERING_TEXTURE_MU_S_SIZE", 32 .toFixed(0)],
				["SCATTERING_TEXTURE_NU_SIZE", 8 .toFixed(0)],
				["IRRADIANCE_TEXTURE_WIDTH", 64 .toFixed(0)],
				["IRRADIANCE_TEXTURE_HEIGHT", 16 .toFixed(0)],
				["METER_TO_LENGTH_UNIT", Lo.toFixed(7)]
			])
		}), this.camera = e, this.atmosphere = n, this.overlay = null, this.shadow = null, this.shadowLength = null, this.lightingMask = null, this.hasNormals = !1, this.combinedScatteringTextures = !1, this.hasHigherOrderScatteringTexture = !1, this.shadowSampleCount = 8, this.octEncodedNormal = a, this.reconstructNormal = o, this.singleMieScatteringTexture = u, this.higherOrderScatteringTexture = d, this.ellipsoid = f, this.correctAltitude = p, this.correctGeometricError = m, this.sunLight = g, this.skyLight = _, this.transmittance = v, this.inscatter = y, this.sky = x, this.sun = ee, this.moon = S, this.ground = ie;
	}
	get mainCamera() {
		return this.camera;
	}
	set mainCamera(e) {
		this.camera = e;
	}
	copyCameraSettings(e) {
		let { projectionMatrix: t, matrixWorldInverse: n, projectionMatrixInverse: r, matrixWorld: i } = e, a = this.uniforms;
		a.get("projectionMatrix").value.copy(t), a.get("viewMatrix").value.copy(n), a.get("inverseProjectionMatrix").value.copy(r), a.get("inverseViewMatrix").value.copy(i);
		let o = e.getWorldPosition(a.get("cameraPosition").value), s = a.get("worldToECEFMatrix").value, c = es.copy(o).applyMatrix4(s);
		try {
			let e = ns.setFromECEF(c).height, n = ts.set(0, this.ellipsoid.maximumRadius, -Math.max(0, e)).applyMatrix4(t);
			a.get("geometricErrorCorrectionAmount").value = eo($a(n.y, 41.5, 13.8, 0, 1));
		} catch {
			return;
		}
		let l = a.get("altitudeCorrection");
		this.correctAltitude ? zo(c, this.atmosphere.bottomRadius, this.ellipsoid, l.value) : l.value.setScalar(0);
	}
	updateOverlay() {
		let e = !1, { uniforms: t, defines: n, overlay: r } = this, i = n.has("HAS_OVERLAY"), a = r != null;
		return a !== i && (a ? n.set("HAS_OVERLAY", "1") : (n.delete("HAS_OVERLAY"), t.get("overlayBuffer").value = null), e = !0), a && (t.get("overlayBuffer").value = r.map), e;
	}
	updateShadow() {
		let e = !1, { uniforms: t, defines: n, shadow: r } = this, i = n.has("HAS_SHADOW"), a = r != null;
		return a !== i && (a ? n.set("HAS_SHADOW", "1") : (n.delete("HAS_SHADOW"), t.get("shadowBuffer").value = null), e = !0), a && (n.get("SHADOW_CASCADE_COUNT") !== `${r.cascadeCount}` && (n.set("SHADOW_CASCADE_COUNT", r.cascadeCount.toFixed(0)), e = !0), t.get("shadowBuffer").value = r.map, t.get("shadowMapSize").value = r.mapSize, t.get("shadowIntervals").value = r.intervals, t.get("shadowMatrices").value = r.matrices, t.get("inverseShadowMatrices").value = r.inverseMatrices, t.get("shadowFar").value = r.far, t.get("shadowTopHeight").value = r.topHeight), e;
	}
	updateShadowLength() {
		let e = !1, { uniforms: t, defines: n, shadowLength: r } = this, i = n.has("HAS_SHADOW_LENGTH"), a = r != null;
		return a !== i && (a ? n.set("HAS_SHADOW_LENGTH", "1") : (n.delete("HAS_SHADOW_LENGTH"), t.get("shadowLengthBuffer").value = null), e = !0), a && (t.get("shadowLengthBuffer").value = r.map), e;
	}
	updateLightingMask() {
		let e = !1, { uniforms: t, defines: n, lightingMask: r } = this, i = n.has("HAS_LIGHTING_MASK"), a = r != null;
		if (a !== i && (a ? n.set("HAS_LIGHTING_MASK", "1") : (n.delete("HAS_LIGHTING_MASK"), t.get("lightingMaskBuffer").value = null), e = !0), a) {
			t.get("lightingMaskBuffer").value = r.map;
			let i = n.get("LIGHTING_MASK_CHANNEL"), a = r.channel;
			a !== i && (/^[rgba]$/.test(a) ? (n.set("LIGHTING_MASK_CHANNEL", a), e = !0) : console.error(`Expression validation failed: ${a}`));
		}
		return e;
	}
	update(e, t, n) {
		this.copyCameraSettings(this.camera);
		let r = !1;
		r ||= this.updateOverlay(), r ||= this.updateShadow(), r ||= this.updateShadowLength(), r ||= this.updateLightingMask(), r && this.setChanged(), ++this.uniforms.get("frame").value;
	}
	get normalBuffer() {
		return this.uniforms.get("normalBuffer").value;
	}
	set normalBuffer(e) {
		this.uniforms.get("normalBuffer").value = e, this.hasNormals = e != null;
	}
	get irradianceTexture() {
		return this.uniforms.get("irradiance_texture").value;
	}
	set irradianceTexture(e) {
		this.uniforms.get("irradiance_texture").value = e;
	}
	get scatteringTexture() {
		return this.uniforms.get("scattering_texture").value;
	}
	set scatteringTexture(e) {
		this.uniforms.get("scattering_texture").value = e;
	}
	get transmittanceTexture() {
		return this.uniforms.get("transmittance_texture").value;
	}
	set transmittanceTexture(e) {
		this.uniforms.get("transmittance_texture").value = e;
	}
	get singleMieScatteringTexture() {
		return this.uniforms.get("single_mie_scattering_texture").value;
	}
	set singleMieScatteringTexture(e) {
		this.uniforms.get("single_mie_scattering_texture").value = e, this.combinedScatteringTextures = e == null;
	}
	get higherOrderScatteringTexture() {
		return this.uniforms.get("higher_order_scattering_texture").value;
	}
	set higherOrderScatteringTexture(e) {
		this.uniforms.get("higher_order_scattering_texture").value = e, this.hasHigherOrderScatteringTexture = e != null;
	}
	get ellipsoid() {
		return this._ellipsoid;
	}
	set ellipsoid(e) {
		this._ellipsoid = e, this.uniforms.get("ellipsoidRadii").value.copy(e.radii);
	}
	get worldToECEFMatrix() {
		return this.uniforms.get("worldToECEFMatrix").value;
	}
	get sunDirection() {
		return this.uniforms.get("sunDirection").value;
	}
	get sunAngularRadius() {
		return this.uniforms.get("ATMOSPHERE").value.sun_angular_radius;
	}
	set sunAngularRadius(e) {
		this.uniforms.get("ATMOSPHERE").value.sun_angular_radius = e, this.uniforms.get("cosSunAngularRadius").value = Math.cos(e);
	}
	get albedoScale() {
		return this.uniforms.get("albedoScale").value;
	}
	set albedoScale(e) {
		this.uniforms.get("albedoScale").value = e;
	}
	get moonDirection() {
		return this.uniforms.get("moonDirection").value;
	}
	get moonAngularRadius() {
		return this.uniforms.get("moonAngularRadius").value;
	}
	set moonAngularRadius(e) {
		this.uniforms.get("moonAngularRadius").value = e;
	}
	get lunarRadianceScale() {
		return this.uniforms.get("lunarRadianceScale").value;
	}
	set lunarRadianceScale(e) {
		this.uniforms.get("lunarRadianceScale").value = e;
	}
	get stbnTexture() {
		return this.uniforms.get("stbnTexture").value;
	}
	set stbnTexture(e) {
		this.uniforms.get("stbnTexture").value = e;
	}
	get shadowRadius() {
		return this.uniforms.get("shadowRadius").value;
	}
	set shadowRadius(e) {
		this.uniforms.get("shadowRadius").value = e;
	}
};
$o([H("OCT_ENCODED_NORMAL")], is.prototype, "octEncodedNormal"), $o([H("RECONSTRUCT_NORMAL")], is.prototype, "reconstructNormal"), $o([H("HAS_NORMALS")], is.prototype, "hasNormals"), $o([H("COMBINED_SCATTERING_TEXTURES")], is.prototype, "combinedScatteringTextures"), $o([H("HAS_HIGHER_ORDER_SCATTERING_TEXTURE")], is.prototype, "hasHigherOrderScatteringTexture"), $o([H("CORRECT_GEOMETRIC_ERROR")], is.prototype, "correctGeometricError"), $o([H("SUN_LIGHT")], is.prototype, "sunLight"), $o([H("SKY_LIGHT")], is.prototype, "skyLight"), $o([H("TRANSMITTANCE")], is.prototype, "transmittance"), $o([H("INSCATTER")], is.prototype, "inscatter"), $o([H("SKY")], is.prototype, "sky"), $o([H("SUN")], is.prototype, "sun"), $o([H("MOON")], is.prototype, "moon"), $o([H("GROUND")], is.prototype, "ground"), $o([no("SHADOW_SAMPLE_COUNT", {
	min: 1,
	max: 16
})], is.prototype, "shadowSampleCount");
var as = Object.defineProperty, os = (e, t, n, r) => {
	for (var i = void 0, a = e.length - 1, o; a >= 0; a--) (o = e[a]) && (i = o(t, n, i) || i);
	return i && as(t, n, i), i;
}, ss = /* @__PURE__ */ new j();
function cs(e, t) {
	let n = "", r = "";
	for (let e = 1; e < t; ++e) n += `layout(location = ${e}) out float renderTarget${e};
`, r += `renderTarget${e} = 0.0;
`;
	return e.replace("#include <mrt_layout>", n).replace("#include <mrt_output>", r);
}
var ls = {
	ellipsoid: sr.WGS84,
	correctAltitude: !0,
	renderTargetCount: 1
}, us = class extends Ht {
	constructor(e, t = Jo.DEFAULT) {
		let { irradianceTexture: n = null, scatteringTexture: r = null, transmittanceTexture: i = null, singleMieScatteringTexture: a = null, higherOrderScatteringTexture: o = null, ellipsoid: s, correctAltitude: c, sunDirection: l, sunAngularRadius: u, renderTargetCount: d, ...f } = {
			...ls,
			...e
		};
		super({
			toneMapped: !1,
			depthWrite: !1,
			depthTest: !1,
			...f,
			uniforms: {
				cameraPosition: new k(new j()),
				worldToECEFMatrix: new k(new E()),
				altitudeCorrection: new k(new j()),
				sunDirection: new k(l?.clone() ?? new j()),
				cosSunAngularRadius: new k(t.sunAngularRadius),
				ATMOSPHERE: t.toUniform(),
				SUN_SPECTRAL_RADIANCE_TO_LUMINANCE: new k(t.sunRadianceToRelativeLuminance),
				SKY_SPECTRAL_RADIANCE_TO_LUMINANCE: new k(t.skyRadianceToRelativeLuminance),
				irradiance_texture: new k(n),
				scattering_texture: new k(r),
				transmittance_texture: new k(i),
				single_mie_scattering_texture: new k(null),
				higher_order_scattering_texture: new k(null),
				...f.uniforms
			},
			defines: {
				PI: `${Math.PI}`,
				TRANSMITTANCE_TEXTURE_WIDTH: 256 .toFixed(0),
				TRANSMITTANCE_TEXTURE_HEIGHT: 64 .toFixed(0),
				SCATTERING_TEXTURE_R_SIZE: 32 .toFixed(0),
				SCATTERING_TEXTURE_MU_SIZE: 128 .toFixed(0),
				SCATTERING_TEXTURE_MU_S_SIZE: 32 .toFixed(0),
				SCATTERING_TEXTURE_NU_SIZE: 8 .toFixed(0),
				IRRADIANCE_TEXTURE_WIDTH: 64 .toFixed(0),
				IRRADIANCE_TEXTURE_HEIGHT: 16 .toFixed(0),
				METER_TO_LENGTH_UNIT: Lo.toFixed(7),
				...f.defines
			}
		}), this.atmosphere = t, this.combinedScatteringTextures = !1, this.hasHigherOrderScatteringTexture = !1, this.singleMieScatteringTexture = a, this.higherOrderScatteringTexture = o, this.ellipsoid = s, this.correctAltitude = c, u != null && (this.sunAngularRadius = u), this.renderTargetCount = d;
	}
	copyCameraSettings(e) {
		let t = this.uniforms, n = e.getWorldPosition(t.cameraPosition.value), r = ss.copy(n).applyMatrix4(t.worldToECEFMatrix.value), i = t.altitudeCorrection.value;
		this.correctAltitude ? zo(r, this.atmosphere.bottomRadius, this.ellipsoid, i) : i.setScalar(0);
	}
	onBeforeCompile(e, t) {
		e.fragmentShader = cs(e.fragmentShader, this.renderTargetCount);
	}
	onBeforeRender(e, t, n, r, i, a) {
		this.copyCameraSettings(n);
	}
	get irradianceTexture() {
		return this.uniforms.irradiance_texture.value;
	}
	set irradianceTexture(e) {
		this.uniforms.irradiance_texture.value = e;
	}
	get scatteringTexture() {
		return this.uniforms.scattering_texture.value;
	}
	set scatteringTexture(e) {
		this.uniforms.scattering_texture.value = e;
	}
	get transmittanceTexture() {
		return this.uniforms.transmittance_texture.value;
	}
	set transmittanceTexture(e) {
		this.uniforms.transmittance_texture.value = e;
	}
	get singleMieScatteringTexture() {
		return this.uniforms.single_mie_scattering_texture.value;
	}
	set singleMieScatteringTexture(e) {
		this.uniforms.single_mie_scattering_texture.value = e, this.combinedScatteringTextures = e == null;
	}
	get higherOrderScatteringTexture() {
		return this.uniforms.higher_order_scattering_texture.value;
	}
	set higherOrderScatteringTexture(e) {
		this.uniforms.higher_order_scattering_texture.value = e, this.hasHigherOrderScatteringTexture = e != null;
	}
	get worldToECEFMatrix() {
		return this.uniforms.worldToECEFMatrix.value;
	}
	get sunDirection() {
		return this.uniforms.sunDirection.value;
	}
	get sunAngularRadius() {
		return this.uniforms.ATMOSPHERE.value.sun_angular_radius;
	}
	set sunAngularRadius(e) {
		this.uniforms.ATMOSPHERE.value.sun_angular_radius = e, this.uniforms.cosSunAngularRadius.value = Math.cos(e);
	}
	get renderTargetCount() {
		return this._renderTargetCount;
	}
	set renderTargetCount(e) {
		e !== this.renderTargetCount && (this._renderTargetCount = e, this.needsUpdate = !0);
	}
};
os([H("COMBINED_SCATTERING_TEXTURES")], us.prototype, "combinedScatteringTextures"), os([H("HAS_HIGHER_ORDER_SCATTERING_TEXTURE")], us.prototype, "hasHigherOrderScatteringTexture");
var ds = 149597870.69098932;
2 * Math.PI, 180 / Math.PI * 3600, 6378.1366 / ds;
var fs;
(function(e) {
	e.Sun = "Sun", e.Moon = "Moon", e.Mercury = "Mercury", e.Venus = "Venus", e.Earth = "Earth", e.Mars = "Mars", e.Jupiter = "Jupiter", e.Saturn = "Saturn", e.Uranus = "Uranus", e.Neptune = "Neptune", e.Pluto = "Pluto", e.SSB = "SSB", e.EMB = "EMB", e.Star1 = "Star1", e.Star2 = "Star2", e.Star3 = "Star3", e.Star4 = "Star4", e.Star5 = "Star5", e.Star6 = "Star6", e.Star7 = "Star7", e.Star8 = "Star8";
})(fs ||= {}), fs.Star1, fs.Star2, fs.Star3, fs.Star4, fs.Star5, fs.Star6, fs.Star7, fs.Star8;
var ps;
(function(e) {
	e[e.From2000 = 0] = "From2000", e[e.Into2000 = 1] = "Into2000";
})(ps ||= {});
var ms;
(function(e) {
	e[e.Pericenter = 0] = "Pericenter", e[e.Apocenter = 1] = "Apocenter";
})(ms ||= {});
var hs;
(function(e) {
	e.Penumbral = "penumbral", e.Partial = "partial", e.Annular = "annular", e.Total = "total";
})(hs ||= {});
var gs;
(function(e) {
	e[e.Invalid = 0] = "Invalid", e[e.Ascending = 1] = "Ascending", e[e.Descending = -1] = "Descending";
})(gs ||= {}), .001 / ds;
function _s(e) {
	return Math.sqrt(Math.max(e, 0));
}
function vs(e) {
	return Math.max(e, 0);
}
function ys(e, t, n) {
	let { bottomRadius: r } = e;
	return n < 0 && t ** 2 * (n ** 2 - 1) + r ** 2 >= 0;
}
function bs(e, t, n) {
	let { topRadius: r } = e, i = t ** 2 * (n ** 2 - 1) + r ** 2;
	return vs(-t * n + _s(i));
}
function xs(e, t) {
	return .5 / t + e * (1 - 1 / t);
}
var Ss = /* @__PURE__ */ new j(), Cs = /* @__PURE__ */ new j(), ws = /* @__PURE__ */ new j(), Ts = /* @__PURE__ */ new WeakMap();
function Es(e) {
	e.image;
	let t = Ka(e.image.data) ? e.image.data : Ka(e.userData.imageData) ? e.userData.imageData : void 0;
	if (e.type === ot && t instanceof Uint16Array) {
		let e = Ts.get(t.buffer);
		e == null ? (t = new Wa(t.buffer), Ts.set(t.buffer, t)) : t = e;
	}
	return t;
}
function Ds(e, t, n) {
	let r = t * 4;
	return n.set(e[r], e[r + 1], e[r + 2]);
}
function Os(e, t, n) {
	let r = Es(e);
	if (r == null) return n.setScalar(0);
	e.image;
	let { width: i, height: a } = e.image, o = Xa(t.x, 0, 1) * (i - 1), s = Xa(t.y, 0, 1) * (a - 1), c = Math.floor(o), l = Math.floor(s), u = o - c, d = s - l, f = u, p = d, m = c % i, h = (m + 1) % i, g = l % a, _ = (g + 1) % a, v = Ds(r, g * i + m, Ss), y = Ds(r, g * i + h, Cs), b = v.lerp(y, f), x = Ds(r, _ * i + m, Cs), ee = Ds(r, _ * i + h, ws), S = x.lerp(ee, f);
	return n.copy(b.lerp(S, p));
}
function ks(e, t, n, r) {
	let { topRadius: i, bottomRadius: a } = e, o = Math.sqrt(i ** 2 - a ** 2), s = _s(t ** 2 - a ** 2), c = bs(e, t, n), l = i - t, u = s + o, d = (c - l) / (u - l), f = s / o;
	return r.set(xs(d, 256), xs(f, 64));
}
var As = /* @__PURE__ */ new j(), js = /* @__PURE__ */ new j(), Ms = /* @__PURE__ */ new A();
function Ns(e, t, n, r = new w(), { ellipsoid: i = sr.WGS84, correctAltitude: a = !0 } = {}, o = Jo.DEFAULT) {
	let s = As.copy(t);
	if (a) {
		let e = i.projectOnSurface(t, js);
		e != null && s.sub(i.getOsculatingSphereCenter(e, o.bottomRadius, js));
	}
	let c = js, l = s.length(), u = s.dot(n), { topRadius: d } = o, f = -u - Math.sqrt(u ** 2 - l ** 2 + d ** 2);
	if (f > 0 && (l = d, u += f), l > d) c.set(1, 1, 1);
	else {
		let t = u / l;
		ys(o, l, t) ? c.setScalar(0) : Os(e, ks(o, l, t, Ms), c);
	}
	let p = c.multiply(o.solarIrradiance).multiply(o.sunRadianceToRelativeLuminance);
	return r.setFromVector3(p);
}
function Ps({ topRadius: e, bottomRadius: t }, n, r, i) {
	let a = (n - t) / (e - t), o = r * .5 + .5;
	return i.set(xs(o, 64), xs(a, 16));
}
var Fs = 1 / Math.sqrt(Math.PI), Is = Math.sqrt(3) / (2 * Math.sqrt(Math.PI)), Ls = /* @__PURE__ */ new j(), Rs = /* @__PURE__ */ new j(), zs = /* @__PURE__ */ new A(), Bs = /* @__PURE__ */ new Et(), Vs = {
	ellipsoid: sr.WGS84,
	correctAltitude: !0
}, Hs = class extends mt {
	constructor(e, t = Jo.DEFAULT) {
		super(), this.atmosphere = t, this.worldToECEFMatrix = new E();
		let { irradianceTexture: n = null, ellipsoid: r, correctAltitude: i, sunDirection: a } = {
			...Vs,
			...e
		};
		this.irradianceTexture = n, this.ellipsoid = r, this.correctAltitude = i, this.sunDirection = a?.clone() ?? new j();
	}
	update() {
		if (this.irradianceTexture == null) return;
		let e = this.worldToECEFMatrix, t = Bs.setFromMatrix4(e).transpose(), n = this.getWorldPosition(Ls).applyMatrix4(e);
		if (this.correctAltitude) {
			let e = this.ellipsoid.projectOnSurface(n, Rs);
			e != null && n.add(zo(e, this.atmosphere.bottomRadius, this.ellipsoid, Rs));
		}
		let r = n.length(), i = n.dot(this.sunDirection) / r, a = Ps(this.atmosphere, r, i, zs), o = Os(this.irradianceTexture, a, Rs);
		o.multiply(this.atmosphere.skyRadianceToRelativeLuminance);
		let s = this.ellipsoid.getSurfaceNormal(n).applyMatrix3(t), c = this.sh.coefficients;
		c[0].copy(o).multiplyScalar(Fs), c[1].copy(o).multiplyScalar(Is * s.y), c[2].copy(o).multiplyScalar(Is * s.z), c[3].copy(o).multiplyScalar(Is * s.x);
	}
}, Us = "precision highp float;\nprecision highp sampler3D;\n\n#define RECIPROCAL_PI 0.3183098861837907\n\n#include \"core/raySphereIntersection\"\n\n#include \"bruneton/definitions\"\n\nuniform AtmosphereParameters ATMOSPHERE;\nuniform vec3 SUN_SPECTRAL_RADIANCE_TO_LUMINANCE;\nuniform vec3 SKY_SPECTRAL_RADIANCE_TO_LUMINANCE;\n\nuniform sampler2D transmittance_texture;\nuniform sampler3D scattering_texture;\nuniform sampler2D irradiance_texture;\nuniform sampler3D single_mie_scattering_texture;\nuniform sampler3D higher_order_scattering_texture;\n\n#include \"bruneton/common\"\n#include \"bruneton/runtime\"\n\nuniform vec3 sunDirection;\nuniform float cosSunAngularRadius;\nuniform vec3 moonDirection;\nuniform float moonAngularRadius;\nuniform float lunarRadianceScale;\nuniform vec3 groundAlbedo;\n\n#include \"sky\"\n\n#ifdef HAS_SHADOW_LENGTH\nuniform sampler2D shadowLengthBuffer;\n#endif // HAS_SHADOW_LENGTH\n\nin vec2 vUv;\nin vec3 vCameraPosition;\nin vec3 vRayDirection;\n\nlayout(location = 0) out vec4 outputColor;\n\n#include <mrt_layout>\n\nvoid main() {\n  float shadowLength = 0.0;\n  #ifdef HAS_SHADOW_LENGTH\n  shadowLength = texture(shadowLengthBuffer, vUv).r;\n  #endif // HAS_SHADOW_LENGTH\n\n  vec3 cameraPosition = vCameraPosition;\n  vec3 rayDirection = normalize(vRayDirection);\n  vec3 dRDdx = dFdx(rayDirection);\n  vec3 dRDdy = dFdy(rayDirection);\n  float fragmentAngle = length(dRDdx + dRDdy) / length(rayDirection);\n\n  #ifdef GROUND_ALBEDO\n\n  float r = length(cameraPosition);\n  float mu = dot(cameraPosition, rayDirection) / r;\n  bool intersectsGround = RayIntersectsGround(ATMOSPHERE, r, mu);\n  if (intersectsGround) {\n    float distanceToGround = raySphereFirstIntersection(\n      cameraPosition,\n      rayDirection,\n      ATMOSPHERE.bottom_radius\n    );\n    vec3 groundPosition = rayDirection * distanceToGround + cameraPosition;\n    vec3 surfaceNormal = normalize(groundPosition);\n    vec3 skyIrradiance;\n    vec3 sunIrradiance = GetSunAndSkyIrradiance(\n      cameraPosition,\n      surfaceNormal,\n      sunDirection,\n      skyIrradiance\n    );\n    vec3 transmittance;\n    vec3 inscatter = GetSkyRadianceToPoint(\n      cameraPosition,\n      ATMOSPHERE.bottom_radius * surfaceNormal,\n      shadowLength,\n      sunDirection,\n      transmittance\n    );\n    vec3 radiance = groundAlbedo * RECIPROCAL_PI * (sunIrradiance + skyIrradiance);\n    outputColor.rgb = radiance * transmittance + inscatter;\n  } else {\n    outputColor.rgb = getSkyRadiance(\n      cameraPosition,\n      rayDirection,\n      shadowLength,\n      sunDirection,\n      moonDirection,\n      moonAngularRadius,\n      lunarRadianceScale,\n      fragmentAngle\n    );\n  }\n\n  #else // GROUND_ALBEDO\n\n  outputColor.rgb = getSkyRadiance(\n    cameraPosition,\n    rayDirection,\n    shadowLength,\n    sunDirection,\n    moonDirection,\n    moonAngularRadius,\n    lunarRadianceScale,\n    fragmentAngle\n  );\n\n  #endif // GROUND_ALBEDO\n\n  outputColor.a = 1.0;\n\n  #include <mrt_output>\n}\n", Ws = "precision highp float;\nprecision highp sampler3D;\n\nuniform mat4 inverseProjectionMatrix;\nuniform mat4 inverseViewMatrix;\nuniform vec3 cameraPosition;\nuniform mat4 worldToECEFMatrix;\nuniform vec3 altitudeCorrection;\n\nlayout(location = 0) in vec3 position;\n\nout vec2 vUv;\nout vec3 vCameraPosition;\nout vec3 vRayDirection;\n\nvoid getCameraRay(out vec3 origin, out vec3 direction) {\n  bool isPerspective = inverseProjectionMatrix[2][3] != 0.0; // 4th entry in the 3rd column\n\n  if (isPerspective) {\n    // Calculate the camera ray for a perspective camera.\n    vec4 viewPosition = inverseProjectionMatrix * vec4(position, 1.0);\n    vec4 worldDirection = inverseViewMatrix * vec4(viewPosition.xyz, 0.0);\n    origin = cameraPosition;\n    direction = worldDirection.xyz;\n  } else {\n    // Unprojected points to calculate direction.\n    vec4 nearPoint = inverseProjectionMatrix * vec4(position.xy, -1.0, 1.0);\n    vec4 farPoint = inverseProjectionMatrix * vec4(position.xy, -0.9, 1.0);\n    nearPoint /= nearPoint.w;\n    farPoint /= farPoint.w;\n\n    // Calculate world values\n    vec4 worldDirection = inverseViewMatrix * vec4(farPoint.xyz - nearPoint.xyz, 0.0);\n    vec4 worldOrigin = inverseViewMatrix * nearPoint;\n\n    // Outputs\n    direction = worldDirection.xyz;\n    origin = worldOrigin.xyz;\n  }\n}\n\nvoid main() {\n  vUv = position.xy * 0.5 + 0.5;\n\n  vec3 direction, origin;\n  getCameraRay(origin, direction);\n\n  vec3 cameraPositionECEF = (worldToECEFMatrix * vec4(origin, 1.0)).xyz;\n  vCameraPosition = (cameraPositionECEF + altitudeCorrection) * METER_TO_LENGTH_UNIT;\n  vRayDirection = (worldToECEFMatrix * vec4(direction, 0.0)).xyz;\n\n  gl_Position = vec4(position.xy, 1.0, 1.0);\n}\n", Gs = Object.defineProperty, Ks = (e, t, n, r) => {
	for (var i = void 0, a = e.length - 1, o; a >= 0; a--) (o = e[a]) && (i = o(t, n, i) || i);
	return i && Gs(t, n, i), i;
}, qs = {
	...ls,
	sun: !0,
	moon: !0,
	moonAngularRadius: .0045,
	lunarRadianceScale: 1,
	ground: !0,
	groundAlbedo: new w(0)
}, Js = class extends us {
	constructor(e) {
		let { sun: t, moon: n, moonDirection: r, moonAngularRadius: i, lunarRadianceScale: a, ground: o, groundAlbedo: s, ...c } = {
			...qs,
			...e
		};
		super({
			name: "SkyMaterial",
			glslVersion: it,
			vertexShader: Ws,
			fragmentShader: uo(Us, {
				core: { raySphereIntersection: Mo },
				bruneton: {
					common: Bo,
					definitions: Vo,
					runtime: Ho
				},
				sky: Zo
			}),
			...c,
			uniforms: {
				inverseProjectionMatrix: new k(new E()),
				inverseViewMatrix: new k(new E()),
				moonDirection: new k(r?.clone() ?? new j()),
				moonAngularRadius: new k(i),
				lunarRadianceScale: new k(a),
				groundAlbedo: new k(s.clone()),
				shadowLengthBuffer: new k(null),
				...c.uniforms
			},
			defines: { PERSPECTIVE_CAMERA: "1" },
			depthWrite: !1,
			depthTest: !0
		}), this.shadowLength = null, this.sun = t, this.moon = n, this.ground = o;
	}
	onBeforeRender(e, t, n, r, i, a) {
		super.onBeforeRender(e, t, n, r, i, a);
		let { uniforms: o, defines: s } = this;
		o.inverseProjectionMatrix.value.copy(n.projectionMatrixInverse), o.inverseViewMatrix.value.copy(n.matrixWorld);
		let c = s.PERSPECTIVE_CAMERA != null, l = n.isPerspectiveCamera === !0;
		l !== c && (l ? s.PERSPECTIVE_CAMERA = "1" : delete s.PERSPECTIVE_CAMERA, this.needsUpdate = !0);
		let u = this.groundAlbedo, d = s.GROUND_ALBEDO != null, f = u.r !== 0 || u.g !== 0 || u.b !== 0;
		f !== d && (f ? this.defines.GROUND_ALBEDO = "1" : delete this.defines.GROUND_ALBEDO, this.needsUpdate = !0);
		let p = this.shadowLength, m = s.HAS_SHADOW_LENGTH != null, h = p != null;
		h !== m && (h ? s.HAS_SHADOW_LENGTH = "1" : (delete s.HAS_SHADOW_LENGTH, o.shadowLengthBuffer.value = null), this.needsUpdate = !0), h && (o.shadowLengthBuffer.value = p.map);
	}
	get moonDirection() {
		return this.uniforms.moonDirection.value;
	}
	get moonAngularRadius() {
		return this.uniforms.moonAngularRadius.value;
	}
	set moonAngularRadius(e) {
		this.uniforms.moonAngularRadius.value = e;
	}
	get lunarRadianceScale() {
		return this.uniforms.lunarRadianceScale.value;
	}
	set lunarRadianceScale(e) {
		this.uniforms.lunarRadianceScale.value = e;
	}
	get groundAlbedo() {
		return this.uniforms.groundAlbedo.value;
	}
};
Ks([H("SUN")], Js.prototype, "sun"), Ks([H("MOON")], Js.prototype, "moon"), Ks([H("GROUND")], Js.prototype, "ground");
var Ys = class extends ze {
	constructor(e) {
		super();
		let t = new Int16Array(e), n = new Uint8Array(e), r = new ft(t, 5), i = new ft(n, 10);
		this.setAttribute("position", new pt(r, 3, 0, !0)), this.setAttribute("magnitude", new pt(i, 1, 6, !0)), this.setAttribute("color", new pt(i, 3, 7, !0)), this.boundingSphere = new Zt(new j(), 1);
	}
}, Xs = "precision highp float;\nprecision highp sampler3D;\n\n#include \"bruneton/definitions\"\n\nuniform AtmosphereParameters ATMOSPHERE;\nuniform vec3 SUN_SPECTRAL_RADIANCE_TO_LUMINANCE;\nuniform vec3 SKY_SPECTRAL_RADIANCE_TO_LUMINANCE;\n\nuniform sampler2D transmittance_texture;\nuniform sampler3D scattering_texture;\nuniform sampler2D irradiance_texture;\nuniform sampler3D single_mie_scattering_texture;\nuniform sampler3D higher_order_scattering_texture;\n\n#include \"bruneton/common\"\n#include \"bruneton/runtime\"\n\nuniform vec3 sunDirection;\n\nin vec3 vCameraPosition;\nin vec3 vRayDirection;\n\nlayout(location = 0) out vec4 outputColor;\n\n#include <mrt_layout>\n\nin vec3 vColor;\n\nvoid main() {\n  #if !defined(PERSPECTIVE_CAMERA)\n  outputColor = vec4(0.0);\n  discard; // Rendering celestial objects without perspective doesn't make sense.\n  #endif // !defined(PERSPECTIVE_CAMERA)\n\n  #ifdef BACKGROUND\n  vec3 rayDirection = normalize(vRayDirection);\n  float r = length(vCameraPosition);\n  float mu = dot(vCameraPosition, rayDirection) / r;\n\n  if (RayIntersectsGround(ATMOSPHERE, r, mu)) {\n    discard;\n  }\n\n  vec3 transmittance;\n  vec3 radiance = GetSkyRadiance(\n    vCameraPosition,\n    normalize(vRayDirection),\n    0.0, // Shadow length\n    sunDirection,\n    transmittance\n  );\n  radiance += transmittance * vColor;\n  outputColor = vec4(radiance, 1.0);\n  #else // BACKGROUND\n  outputColor = vec4(vColor, 1.0);\n  #endif // BACKGROUND\n\n  #include <mrt_output>\n}\n", Zs = "precision highp float;\nprecision highp sampler3D;\n\n#define saturate(x) clamp(x, 0.0, 1.0)\n\nuniform mat4 projectionMatrix;\nuniform mat4 modelViewMatrix;\nuniform mat4 viewMatrix;\nuniform mat4 matrixWorld;\nuniform vec3 cameraPosition;\nuniform float cameraFar;\nuniform mat4 worldToECEFMatrix;\nuniform vec3 altitudeCorrection;\nuniform float pointSize;\nuniform vec2 magnitudeRange;\nuniform float intensity;\n\nlayout(location = 0) in vec3 position;\nlayout(location = 1) in float magnitude;\nlayout(location = 2) in vec3 color;\n\nout vec3 vCameraPosition;\nout vec3 vRayDirection;\nout vec3 vEllipsoidCenter;\nout vec3 vColor;\n\nvoid main() {\n  // Magnitude is stored between 0 to 1 within the given range.\n  float m = mix(magnitudeRange.x, magnitudeRange.y, magnitude);\n  vec3 v = pow(vec3(10.0), -vec3(magnitudeRange, m) / 2.5);\n  vColor = vec3(intensity * color);\n  vColor *= saturate((v.z - v.y) / (v.x - v.y));\n\n  #ifdef BACKGROUND\n  vec3 worldDirection = normalize(matrixWorld * vec4(position, 1.0)).xyz;\n  vec3 cameraPositionECEF = (worldToECEFMatrix * vec4(cameraPosition, 1.0)).xyz;\n  vCameraPosition = (cameraPositionECEF + altitudeCorrection) * METER_TO_LENGTH_UNIT;\n  vRayDirection = (worldToECEFMatrix * vec4(worldDirection, 0.0)).xyz;\n  gl_Position =\n    projectionMatrix * viewMatrix * vec4(cameraPosition + worldDirection * cameraFar, 1.0);\n  #else // BACKGROUND\n  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);\n  #endif // BACKGROUND\n\n  gl_PointSize = pointSize;\n}\n", Qs = Object.defineProperty, $s = (e, t, n, r) => {
	for (var i = void 0, a = e.length - 1, o; a >= 0; a--) (o = e[a]) && (i = o(t, n, i) || i);
	return i && Qs(t, n, i), i;
}, ec = {
	...ls,
	pointSize: 1,
	intensity: 1,
	background: !0,
	ground: !0
}, tc = class extends us {
	constructor(e) {
		let { pointSize: t, intensity: n, background: r, ground: i, ...a } = {
			...ec,
			...e
		};
		super({
			name: "StarsMaterial",
			glslVersion: it,
			vertexShader: Zs,
			fragmentShader: uo(Xs, { bruneton: {
				common: Bo,
				definitions: Vo,
				runtime: Ho
			} }),
			...a,
			uniforms: {
				projectionMatrix: new k(new E()),
				modelViewMatrix: new k(new E()),
				viewMatrix: new k(new E()),
				matrixWorld: new k(new E()),
				cameraFar: new k(0),
				pointSize: new k(0),
				magnitudeRange: new k(new A(-2, 8)),
				intensity: new k(n),
				...a.uniforms
			},
			defines: { PERSPECTIVE_CAMERA: "1" },
			depthWrite: !0,
			depthTest: !0
		}), this.pointSize = t, this.background = r, this.ground = i;
	}
	onBeforeRender(e, t, n, r, i, a) {
		super.onBeforeRender(e, t, n, r, i, a);
		let o = this.uniforms;
		o.projectionMatrix.value.copy(n.projectionMatrix), o.modelViewMatrix.value.copy(n.modelViewMatrix), o.viewMatrix.value.copy(n.matrixWorldInverse), o.matrixWorld.value.copy(i.matrixWorld), o.cameraFar.value = n.far, o.pointSize.value = this.pointSize * e.getPixelRatio();
		let s = n.isPerspectiveCamera === !0;
		this.defines.PERSPECTIVE_CAMERA != null !== s && (s ? this.defines.PERSPECTIVE_CAMERA = "1" : delete this.defines.PERSPECTIVE_CAMERA, this.needsUpdate = !0);
	}
	get magnitudeRange() {
		return this.uniforms.magnitudeRange.value;
	}
	get intensity() {
		return this.uniforms.intensity.value;
	}
	set intensity(e) {
		this.uniforms.intensity.value = e;
	}
};
$s([H("BACKGROUND")], tc.prototype, "background"), $s([H("GROUND")], tc.prototype, "ground");
var nc = /* @__PURE__ */ new j(), rc = /* @__PURE__ */ new Et(), ic = {
	ellipsoid: sr.WGS84,
	correctAltitude: !0,
	distance: 1
}, ac = class extends Xe {
	constructor(e, t = Jo.DEFAULT) {
		super(), this.atmosphere = t, this.worldToECEFMatrix = new E();
		let { irradianceTexture: n = null, ellipsoid: r, correctAltitude: i, sunDirection: a, distance: o } = {
			...ic,
			...e
		};
		this.transmittanceTexture = n, this.ellipsoid = r, this.correctAltitude = i, this.sunDirection = a?.clone() ?? new j(), this.distance = o;
	}
	update() {
		let e = this.worldToECEFMatrix, t = rc.setFromMatrix4(e).transpose();
		if (this.position.copy(this.sunDirection).applyMatrix3(t).normalize().multiplyScalar(this.distance).add(this.target.position), this.transmittanceTexture == null) return;
		let n = this.target.getWorldPosition(nc).applyMatrix4(e);
		Ns(this.transmittanceTexture, n, this.sunDirection, this.color, {
			ellipsoid: this.ellipsoid,
			correctAltitude: this.correctAltitude
		}, this.atmosphere);
	}
}, oc = .0045, sc = class extends l {
	raw;
	options;
	handleShadowLengthChanged;
	constructor(e = {}) {
		super(), this.options = e;
		let t = new Js({
			sun: e.sun ?? !0,
			moon: e.moon ?? !0,
			depthWrite: !1,
			sunAngularRadius: e.sunAngularRadius
		});
		this.raw = new D(new Ft(2, 2), t), this.raw.frustumCulled = !1, this.raw.renderOrder = y, this.setupMoonProperties();
	}
	setTextures(e) {
		Object.assign(this.raw.material, e);
	}
	setShadowLengthHandler(e) {
		this.handleShadowLengthChanged = (e) => {
			this.raw.material.shadowLength = e;
		}, e.on("changed", this.handleShadowLengthChanged);
	}
	updateSunDirection(e) {
		this.raw.material.sunDirection.copy(e);
	}
	updateMoonDirection(e) {
		this.raw.material.moonDirection.copy(e);
	}
	setupMoonProperties() {
		this.options.moonScale !== void 0 && (this.moonScale = this.options.moonScale), this.options.moonIntensity !== void 0 && (this.moonIntensity = this.options.moonIntensity);
	}
	get visible() {
		return !!this.options.visible;
	}
	set visible(e) {
		this.options.visible = e, this.raw.visible = e, this.emit("needsUpdate");
	}
	get sun() {
		return this.raw.material.sun;
	}
	set sun(e) {
		this.raw.material.sun = e, this.emit("needsUpdate");
	}
	get moon() {
		return this.raw.material.moon;
	}
	set moon(e) {
		this.raw.material.moon = e, this.emit("needsUpdate");
	}
	get moonScale() {
		return this.options.moonScale ?? 1;
	}
	set moonScale(e) {
		this.options.moonScale = e, this.raw.material.moonAngularRadius = oc * e, this.emit("needsUpdate");
	}
	get moonIntensity() {
		return this.options.moonIntensity ?? 1;
	}
	set moonIntensity(e) {
		this.options.moonIntensity = e, this.raw.material.lunarRadianceScale = e, this.emit("needsUpdate");
	}
	get sunAngularRadius() {
		return this.options.sunAngularRadius ?? 1;
	}
	set sunAngularRadius(e) {
		this.options.sunAngularRadius = e, this.raw.material.sunAngularRadius = e, this.emit("needsUpdate");
	}
	dispose() {}
}, cc = class extends f {
	config;
	_skyMesh = null;
	constructor(e, t, n) {
		super(e, t, n), this.config = n;
	}
	getPassKey() {
		return this.config.sky?.envMap ? "skyEnvMap" : "opaque";
	}
	createMesh() {
		let e = new sc(this.config.sky ?? {});
		return this._skyMesh = e, this.view.atmosphere.onTexturesReady((t) => e.setTextures(t), {
			transmittance: !0,
			scattering: !0,
			higherOrderScattering: !0
		}), e.setShadowLengthHandler(this.view.atmosphere.shadowLength), e.on("needsUpdate", () => this.emit("needsUpdate")), e;
	}
	onUpdateConfig(e) {
		super.onUpdateConfig(e), this.config.sky && e.sky && this._skyMesh && (Object.assign(this.config.sky, e.sky), e.sky.envMap !== void 0 && (this.config.sky.envMap = e.sky.envMap, this.onPassKeyChange()), e.sky.sun !== void 0 && (this._skyMesh.sun = e.sky.sun), e.sky.moon !== void 0 && (this._skyMesh.moon = e.sky.moon), e.sky.moonScale !== void 0 && (this._skyMesh.moonScale = e.sky.moonScale), e.sky.moonIntensity !== void 0 && (this._skyMesh.moonIntensity = e.sky.moonIntensity), e.sky.sunAngularRadius !== void 0 && (this._skyMesh.sunAngularRadius = e.sky.sunAngularRadius));
	}
	update(e) {
		this._skyMesh && (this._skyMesh.updateSunDirection(this.view.atmosphere.getSunDirection()), this._skyMesh.updateMoonDirection(this.view.atmosphere.getMoonDirection()));
	}
	disposeMesh() {
		this._skyMesh &&= (this._skyMesh.dispose(), null), this._instance &&= void 0;
	}
	getSkyMesh() {
		return this._skyMesh;
	}
}, lc = {
	visible: !0,
	pointSize: 1,
	intensity: 10,
	background: !0
}, uc = class e extends l {
	raw;
	options;
	constructor(e, t) {
		super(), this.raw = new It(new Ys(e), new tc({
			depthTest: !0,
			depthWrite: !1
		})), this.raw.material.depthWrite = !1, this.raw.frustumCulled = !1, this.raw.renderOrder = x, this.options = {
			...lc,
			...t ?? {}
		}, this.raw.material.pointSize = this.options.pointSize, this.raw.material.intensity = this.options.intensity, this.raw.material.background = this.options.background;
	}
	static fromUrl(t = b, n) {
		let r = new e(/* @__PURE__ */ new ArrayBuffer(0), n);
		return fetch(t).then(async (e) => {
			let t = await e.arrayBuffer();
			t && r.raw.geometry.copy(new Ys(t));
		}).catch(console.error), r;
	}
	static async fromUrlAsync(t = b, n) {
		let r = await fetch(t).then((e) => e.arrayBuffer()).catch(console.error);
		if (r) return new e(r, n);
	}
	setTextures(e) {
		Object.assign(this.raw.material, e);
	}
	setRotationFromMatrix(e) {
		this.raw.setRotationFromMatrix(e);
	}
	updateSunDirection(e) {
		this.raw.material.sunDirection.copy(e);
	}
	get visible() {
		return this.options.visible;
	}
	set visible(e) {
		this.options.visible = e, this.raw.visible = e, this.emit("needsUpdate");
	}
	get pointSize() {
		return this.options.pointSize;
	}
	set pointSize(e) {
		this.options.pointSize = e, this.raw.material.pointSize = e, this.emit("needsUpdate");
	}
	get intensity() {
		return this.options.intensity;
	}
	set intensity(e) {
		this.options.intensity = e, this.raw.material.intensity = e, this.emit("needsUpdate");
	}
	get background() {
		return this.options.background;
	}
	set background(e) {
		this.options.background = e, this.raw.material.background = e, this.emit("needsUpdate");
	}
}, dc = class extends f {
	config;
	_stars = null;
	constructor(e, t, n) {
		super(e, t, n), this.config = n;
	}
	getPassKey() {
		return "opaque";
	}
	createMesh() {
		let e = this.config.stars ?? {}, t = this.config.stars?.assetsUrl, n = uc.fromUrl(t, e);
		return this._stars = n, this.view.atmosphere.onTexturesReady((e) => n.setTextures(e), {
			transmittance: !0,
			scattering: !0,
			higherOrderScattering: !0
		}), n.on("needsUpdate", () => this.emit("needsUpdate")), n;
	}
	onUpdateConfig(e) {
		super.onUpdateConfig(e), this.config.stars && e.stars && this._stars && (Object.assign(this.config.stars, e.stars), e.stars.pointSize !== void 0 && (this._stars.pointSize = e.stars.pointSize), e.stars.intensity !== void 0 && (this._stars.intensity = e.stars.intensity), e.stars.background !== void 0 && (this._stars.background = e.stars.background));
	}
	update(e) {
		this._stars && (this._stars.updateSunDirection(this.view.atmosphere.getSunDirection()), this._stars.setRotationFromMatrix(this.view.atmosphere.getRotationMatrix()));
	}
	disposeMesh() {
		this._stars &&= null, this._instance &&= void 0;
	}
	getStars() {
		return this._stars;
	}
}, fc = class extends p {
	config;
	pickWrapper;
	constructor(e, t, n) {
		n.box?.effectIds && (n.effectIds = n.box.effectIds), super(e, t, n), this.config = n;
	}
	get batchId() {
		return this.pickWrapper?.batchId;
	}
	createMesh() {
		let e = this.config.box;
		if (!e) throw Error("BoxMesh configuration is required");
		let t = new Re(e.width ?? 1, e.height ?? 1, e.depth ?? 1, e.widthSegments ?? 1, e.heightSegments ?? 1, e.depthSegments ?? 1), n = this.createMaterial(e);
		n instanceof Ot && (n.emissive.set(e.emissiveColor?.raw ?? 0), n.emissiveIntensity = e.emissiveIntensity ?? 0, ke(n));
		let r = new o(t, n, e.draped ?? !1);
		return r.castShadow = e.castShadow ?? !1, r.receiveShadow = e.receiveShadow ?? !1, this.ctx.applyShadowMaterial(n), this.config.pickable && (this.pickWrapper = new g(r, this.ctx), this.ctx.registerPickableMesh(this.id, this.pickWrapper)), r;
	}
	createMaterial(e) {
		let t = e.color ?? new i().setStyle("#ffffff");
		return new Ot({
			color: t.raw,
			opacity: e.opacity ?? 1,
			transparent: e.transparent ?? !1
		});
	}
	getPassKey() {
		return this.config.box?.draped ? "draped" : super.getPassKey();
	}
	onUpdateConfig(e) {
		if (e.box && this._instance) {
			let t = e.box, n = this.config.box;
			if ((t.width !== void 0 || t.height !== void 0 || t.depth !== void 0 || t.widthSegments !== void 0 || t.heightSegments !== void 0 || t.depthSegments !== void 0) && (this._instance.geometry.dispose(), this._instance.geometry = new Re(t.width ?? n?.width ?? 1, t.height ?? n?.height ?? 1, t.depth ?? n?.depth ?? 1, t.widthSegments ?? n?.widthSegments ?? 1, t.heightSegments ?? n?.heightSegments ?? 1, t.depthSegments ?? n?.depthSegments ?? 1), n && Object.assign(n, t)), t.color !== void 0 || t.emissiveColor !== void 0 || t.emissiveIntensity !== void 0 || t.opacity !== void 0 || t.transparent !== void 0) {
				let e = this._instance.material;
				t.color !== void 0 && e.color.set(t.color.raw), t.opacity !== void 0 && (e.opacity = t.opacity), t.transparent !== void 0 && (e.transparent = t.transparent), e instanceof Ot && (t.emissiveColor !== void 0 && e.emissive.set(t.emissiveColor.raw), t.emissiveIntensity !== void 0 && (e.emissiveIntensity = t.emissiveIntensity)), e.needsUpdate = !0;
			}
			t.castShadow !== void 0 && (this._instance.castShadow = t.castShadow), t.receiveShadow !== void 0 && (this._instance.receiveShadow = t.receiveShadow), t.effectIds !== void 0 && (e.effectIds = t.effectIds), this.emit("needsUpdate");
		}
		super.onUpdateConfig(e);
	}
	disposeMesh() {
		this._instance &&= (this.ctx.removeShadowMaterial(this._instance.material), this._instance.geometry.dispose(), this._instance.material.dispose(), void 0);
	}
	onDestroy() {
		this.pickWrapper &&= (this.ctx.unregisterPickableMesh(this.id), void 0), super.onDestroy();
	}
}, pc = class extends p {
	config;
	pickWrapper;
	constructor(e, t, n) {
		n.sphere?.effectIds && (n.effectIds = n.sphere.effectIds), super(e, t, n), this.config = n;
	}
	get batchId() {
		return this.pickWrapper?.batchId;
	}
	createMesh() {
		let e = this.config.sphere;
		if (!e) throw Error("SphereMesh configuration is required");
		let t = new Qt(e.radius ?? 1, e.widthSegments ?? 32, e.heightSegments ?? 16, e.phiStart ?? 0, e.phiLength ?? Math.PI * 2, e.thetaStart ?? 0, e.thetaLength ?? Math.PI), n = e.color ?? new i().setStyle("#ffffff"), r = new Ot({
			color: n.raw,
			opacity: e.opacity ?? 1,
			transparent: e.transparent ?? !1
		});
		r.emissive.set(e.emissiveColor?.raw ?? 0), r.emissiveIntensity = e.emissiveIntensity ?? 0, ke(r);
		let a = new D(t, r);
		return a.castShadow = e.castShadow ?? !1, a.receiveShadow = e.receiveShadow ?? !1, this.ctx.applyShadowMaterial(r), this.config.pickable && (this.pickWrapper = new g(a, this.ctx), this.ctx.registerPickableMesh(this.id, this.pickWrapper)), a;
	}
	onUpdateConfig(e) {
		if (e.sphere && this._instance) {
			let t = e.sphere, n = this.config.sphere;
			if ((t.radius !== void 0 || t.widthSegments !== void 0 || t.heightSegments !== void 0 || t.phiStart !== void 0 || t.phiLength !== void 0 || t.thetaStart !== void 0 || t.thetaLength !== void 0) && (this._instance.geometry.dispose(), this._instance.geometry = new Qt(t.radius ?? n?.radius, t.widthSegments ?? n?.widthSegments, t.heightSegments ?? n?.heightSegments, t.phiStart ?? n?.phiStart, t.phiLength ?? n?.phiLength, t.thetaStart ?? n?.thetaStart, t.thetaLength ?? n?.thetaLength), n && Object.assign(n, t)), t.color !== void 0 || t.emissiveColor !== void 0 || t.emissiveIntensity !== void 0 || t.opacity !== void 0 || t.transparent !== void 0) {
				let e = this._instance.material;
				if (t.color !== void 0) {
					let n = t.color.raw;
					e.color.set(n);
				}
				t.emissiveColor !== void 0 && e.emissive.set(t.emissiveColor.raw), t.emissiveIntensity !== void 0 && (e.emissiveIntensity = t.emissiveIntensity), t.opacity !== void 0 && (e.opacity = t.opacity), t.transparent !== void 0 && (e.transparent = t.transparent), e.needsUpdate = !0;
			}
			t.castShadow !== void 0 && (this._instance.castShadow = t.castShadow), t.receiveShadow !== void 0 && (this._instance.receiveShadow = t.receiveShadow), t.effectIds !== void 0 && (e.effectIds = t.effectIds), this.emit("needsUpdate");
		}
		super.onUpdateConfig(e);
	}
	disposeMesh() {
		this._instance &&= (this.ctx.removeShadowMaterial(this._instance.material), this._instance.geometry.dispose(), this._instance.material.dispose(), void 0);
	}
	onDestroy() {
		this.pickWrapper &&= (this.ctx.unregisterPickableMesh(this.id), void 0), super.onDestroy();
	}
}, mc = "in vec3 vNormal;\nin vec3 vPos;\n\nuniform float coefficient;\nuniform float exponent;\nuniform vec4 glowColor;\n\nvoid main() {\n    \n    vec3 N = normalize(vNormal);\n\n    \n    vec3 viewDir = normalize(cameraPosition - vPos);\n\n    float facing_ratio = dot(N, viewDir);\n\n    \n    \n    float intensity = pow( max(coefficient - facing_ratio, 0.0), exponent );\n\n    gl_FragColor = vec4(glowColor.rgb, glowColor.a * intensity);\n}", hc = "out vec3 vNormal; \nout vec3 vPos; \n\nvoid main() {\n    vNormal = normalize( mat3(modelMatrix) * normal );\n    vec4 worldPos = modelMatrix * vec4( position, 1.0);\n    vPos = worldPos.xyz;\n    gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n}", gc = {
	radiusScale: 1.2,
	coefficient: .5,
	exponent: 5,
	glowColor: new i().setHex(9237503),
	opacity: .5
}, _c = class extends f {
	config;
	constructor(e, t, n) {
		super(e, t, n), this.config = n;
	}
	createMesh() {
		let e = {
			...gc,
			...this.config.glowGlobe
		}, t = new Qt(e.radiusScale * xe(), 64, 32, 0, Math.PI * 2, 0, Math.PI);
		t.scale(1, 1, 1 - be());
		let n = new O();
		n.vertexShader = hc, n.fragmentShader = mc, n.transparent = !0, n.side = Fe;
		let r = e.glowColor.toArray();
		return n.uniforms = {
			exponent: { value: e.exponent },
			coefficient: { value: e.coefficient },
			glowColor: { value: new M(r[0], r[1], r[2], e.opacity) }
		}, this.ctx.applyShadowMaterial(n), new D(t, n);
	}
	onUpdateConfig(e) {
		if (e.glowGlobe && this._instance) {
			let t = e.glowGlobe, n = this.config.glowGlobe;
			if (t.radiusScale !== void 0) {
				this._instance.geometry.dispose();
				let e = new Qt(t.radiusScale * xe(), 64, 32, 0, Math.PI * 2, 0, Math.PI);
				e.scale(1, 1, 1 - be()), this._instance.geometry = e;
			}
			let r = this._instance.material;
			if (t.coefficient !== void 0 && (r.uniforms.coefficient.value = t.coefficient), t.exponent !== void 0 && (r.uniforms.exponent.value = t.exponent), t.glowColor !== void 0 || t.opacity !== void 0) {
				let e = t.glowColor?.toArray();
				e ||= n?.glowColor?.toArray() || gc.glowColor.toArray(), r.uniforms.glowColor.value = new M(e[0], e[1], e[2], t.opacity ?? n?.opacity ?? gc.opacity);
			}
			n && Object.assign(n, t), this.emit("needsUpdate");
		}
		super.onUpdateConfig(e);
	}
	disposeMesh() {
		this._instance &&= (this.ctx.removeShadowMaterial(this._instance.material), this._instance.geometry.dispose(), this._instance.material.dispose(), void 0);
	}
}, vc = class extends p {
	config;
	pickWrapper;
	constructor(e, t, n) {
		n.cylinder?.effectIds && (n.effectIds = n.cylinder.effectIds), super(e, t, n), this.config = n;
	}
	get batchId() {
		return this.pickWrapper?.batchId;
	}
	createMesh() {
		let e = this.config.cylinder;
		if (!e) throw Error("Cylinder configuration is required");
		let t = new Ke(e.radiusTop ?? 1, e.radiusBottom ?? 1, e.height ?? 1, e.radialSegments ?? 32, e.heightSegments ?? 1, e.openEnded ?? !1, e.thetaStart ?? 0, e.thetaLength ?? Math.PI * 2), n = this.createMaterial(e);
		n instanceof Ot && ke(n);
		let r = new o(t, n, e.draped ?? !1);
		return r.castShadow = e.castShadow ?? !1, r.receiveShadow = e.receiveShadow ?? !1, this.ctx.applyShadowMaterial(n), this.config.pickable && (this.pickWrapper = new g(r, this.ctx), this.ctx.registerPickableMesh(this.id, this.pickWrapper)), r;
	}
	createMaterial(e) {
		let t = e.color ?? new i().setStyle("#ffffff"), n = e.emissiveColor ? e.emissiveColor.raw : 0;
		return new Ot({
			color: t.raw,
			emissive: n,
			emissiveIntensity: e.emissiveIntensity ?? 0,
			opacity: e.opacity ?? 1,
			transparent: e.transparent ?? !1
		});
	}
	getPassKey() {
		return this.config.cylinder?.draped ? "draped" : super.getPassKey();
	}
	onUpdateConfig(e) {
		if (e.cylinder && this._instance) {
			let t = e.cylinder, n = this.config.cylinder;
			if ((t.radiusTop !== void 0 || t.radiusBottom !== void 0 || t.height !== void 0 || t.radialSegments !== void 0 || t.heightSegments !== void 0 || t.openEnded !== void 0 || t.thetaStart !== void 0 || t.thetaLength !== void 0) && (this._instance.geometry.dispose(), this._instance.geometry = new Ke(t.radiusTop ?? n?.radiusTop ?? 1, t.radiusBottom ?? n?.radiusBottom ?? 1, t.height ?? n?.height ?? 1, t.radialSegments ?? n?.radialSegments ?? 32, t.heightSegments ?? n?.heightSegments ?? 1, t.openEnded ?? n?.openEnded ?? !1, t.thetaStart ?? n?.thetaStart ?? 0, t.thetaLength ?? n?.thetaLength ?? Math.PI * 2), n && Object.assign(n, t)), t.color !== void 0 || t.emissiveColor !== void 0 || t.emissiveIntensity !== void 0 || t.opacity !== void 0 || t.transparent !== void 0) {
				let e = this._instance.material;
				t.color !== void 0 && e.color.set(t.color.raw), t.opacity !== void 0 && (e.opacity = t.opacity), t.transparent !== void 0 && (e.transparent = t.transparent), e instanceof Ot && (t.emissiveColor !== void 0 && e.emissive.set(t.emissiveColor.raw), t.emissiveIntensity !== void 0 && (e.emissiveIntensity = t.emissiveIntensity)), e.needsUpdate = !0;
			}
			t.castShadow !== void 0 && (this._instance.castShadow = t.castShadow), t.receiveShadow !== void 0 && (this._instance.receiveShadow = t.receiveShadow), t.effectIds !== void 0 && (e.effectIds = t.effectIds), this.emit("needsUpdate");
		}
		super.onUpdateConfig(e);
	}
	disposeMesh() {
		this._instance &&= (this.ctx.removeShadowMaterial(this._instance.material), this._instance.geometry.dispose(), this._instance.material.dispose(), void 0);
	}
	onDestroy() {
		this.pickWrapper &&= (this.ctx.unregisterPickableMesh(this.id), void 0), super.onDestroy();
	}
}, yc = class extends p {
	config;
	pickWrapper;
	constructor(e, t, n) {
		n.plane?.effectIds && (n.effectIds = n.plane.effectIds), super(e, t, n), this.config = n;
	}
	get batchId() {
		return this.pickWrapper?.batchId;
	}
	createMesh() {
		let e = this.config.plane;
		if (!e) throw Error("PlaneMesh configuration is required");
		let t = new Ft(e.width ?? 1, e.height ?? 1, e.widthSegments ?? 1, e.heightSegments ?? 1), n = e.color ?? new i().setStyle("#ffffff"), r = e.emissiveColor ? e.emissiveColor.raw : 0, a = new Ot({
			color: n.raw,
			emissive: r,
			emissiveIntensity: e.emissiveIntensity ?? 0,
			opacity: e.opacity ?? 1,
			transparent: e.transparent ?? !1
		});
		ke(a);
		let o = new D(t, a);
		return o.castShadow = e.castShadow ?? !1, o.receiveShadow = e.receiveShadow ?? !1, this.ctx.applyShadowMaterial(a), this.config.pickable && (this.pickWrapper = new g(o, this.ctx), this.ctx.registerPickableMesh(this.id, this.pickWrapper)), o;
	}
	onUpdateConfig(e) {
		if (e.plane && this._instance) {
			let t = e.plane, n = this.config.plane;
			if ((t.width !== void 0 || t.height !== void 0 || t.widthSegments !== void 0 || t.heightSegments !== void 0) && (this._instance.geometry.dispose(), this._instance.geometry = new Ft(t.width ?? n?.width ?? 1, t.height ?? n?.height ?? 1, t.widthSegments ?? n?.widthSegments ?? 1, t.heightSegments ?? n?.heightSegments ?? 1), n && Object.assign(n, t)), t.color !== void 0 || t.emissiveColor !== void 0 || t.emissiveIntensity !== void 0 || t.opacity !== void 0 || t.transparent !== void 0) {
				let e = this._instance.material;
				if (e instanceof Ot) {
					if (t.color !== void 0) {
						let n = t.color.raw;
						e.color.set(n);
					}
					t.emissiveColor !== void 0 && e.emissive.set(t.emissiveColor.raw), t.emissiveIntensity !== void 0 && (e.emissiveIntensity = t.emissiveIntensity), t.opacity !== void 0 && (e.opacity = t.opacity), t.transparent !== void 0 && (e.transparent = t.transparent), e.needsUpdate = !0;
				}
			}
			t.castShadow !== void 0 && (this._instance.castShadow = t.castShadow), t.receiveShadow !== void 0 && (this._instance.receiveShadow = t.receiveShadow), t.effectIds !== void 0 && (e.effectIds = t.effectIds), this.emit("needsUpdate");
		}
		super.onUpdateConfig(e);
	}
	disposeMesh() {
		this._instance &&= (this.ctx.removeShadowMaterial(this._instance.material), this._instance.geometry.dispose(), this._instance.material.dispose(), void 0);
	}
	onDestroy() {
		this.pickWrapper &&= (this.ctx.unregisterPickableMesh(this.id), void 0), super.onDestroy();
	}
}, bc = "vec3 modelHighDiff = (rtePosHigh - u_cameraPositionHigh) * u_rteOne;\nvec3 modelLowDiff = rtePosLow - u_cameraPositionLow;\nvec3 modelCenterOffset = modelHighDiff + modelLowDiff;\n\nmat4 modelViewMatrixRTE_Local = modelViewMatrixRTE * modelMatrix;\n#ifdef USE_INSTANCING\nmodelViewMatrixRTE_Local = modelViewMatrixRTE_Local * instanceMatrix;\n#endif\n\nvec4 mvLocalPosition = modelViewMatrixRTE_Local * vec4(transformed, 1.0);\n\nvec4 mvCenterOffset = modelViewMatrixRTE * vec4(modelCenterOffset, 0.0);\nvec4 mvPosition = mvLocalPosition + mvCenterOffset;\n\ngl_Position = projectionMatrix * mvPosition;\n\n#ifdef USE_INSTANCING\nvec3 rotatedScaledLocal = (modelMatrix * instanceMatrix * vec4(transformed, 1.0)).xyz;\n#else\nvec3 rotatedScaledLocal = (modelMatrix * vec4(transformed, 1.0)).xyz;\n#endif\nvec3 absTransformed = (rtePosHigh + rtePosLow) + rotatedScaledLocal;", xc = "uniform vec3 u_cameraPositionHigh;\nuniform vec3 u_cameraPositionLow;\n\nuniform float u_rteOne;\n\nuniform mat4 modelViewMatrixRTE;\n\nuniform vec3 rtePosHigh;\nuniform vec3 rtePosLow;", Sc = {
	url: "",
	animationSpeed: 1,
	animationLoop: !0,
	animationCrossfadeDuration: .3
}, Cc = class extends f {
	config;
	loader;
	gltf = null;
	mixer = null;
	clips = /* @__PURE__ */ new Map();
	actions = /* @__PURE__ */ new Map();
	currentAction = null;
	animationSpeed = 1;
	isLooping = !0;
	activeBlendAnimations = /* @__PURE__ */ new Map();
	isBlendMode = !1;
	originalWorldPosition = new j();
	modelPositionHigh = new j();
	modelPositionLow = new j();
	rteUserData = {
		modelViewMatrixRTE: { value: new E() },
		cameraPositionHigh: { value: new j() },
		cameraPositionLow: { value: new j() }
	};
	pickWrapper;
	get batchId() {
		return this.pickWrapper?.batchId;
	}
	constructor(e, t, n) {
		super(e, t, n), this.config = {
			...n,
			gltfModel: {
				...Sc,
				...n.gltfModel
			}
		}, this.loader = le();
	}
	getPassKey() {
		return "mrt";
	}
	onCreate() {
		this._instance = this.createMesh(), this.matrixWorld || this.matrix || this.geodetic ? (this.subscribeTerrainHeight(), this.applyRTETransform()) : (this.scale && this.raw?.scale.copy(this.scale), this.rotation && this.raw?.rotation.set(this.rotation.x, this.rotation.y, this.rotation.z)), this._instance.visible = this.visible, this.onPassKeyChange();
	}
	createMesh() {
		let e = this.config.gltfModel, t = new at();
		return e?.url && this.loadModel(e.url, t).then(() => {
			this.shouldInitializeAnimation() && this.initAnimation();
		}).catch((e) => {
			console.error("Failed to initialize GLTF model layer:", e);
		}), t;
	}
	async loadModel(e, t) {
		try {
			let n = await this.loader.loadAsync(e);
			for (this.gltf = n; t.children.length > 0;) t.remove(t.children[0]);
			t.add(n.scene), this.setupModel(t), this.config.pickable && (this.pickWrapper ? this.pickWrapper.syncMaterials() : (this.pickWrapper = new g(t, this.ctx), this.ctx.registerPickableMesh(this.id, this.pickWrapper))), this.emit("needsUpdate"), this.emit("load");
		} catch (e) {
			console.warn("Failed to load GLTF model:", e), this.emit("error", e);
		}
	}
	setupModel(e) {
		let t = this.config.gltfModel;
		if (!t) return;
		!this.matrixWorld && !this.matrix && !this.geodetic && this.position && this.setPositionRTE(new j(this.position.x, this.position.y, this.position.z));
		let n = new E();
		e.traverse((e) => {
			if (e instanceof D) {
				t.castShadow && (e.castShadow = !0), t.receiveShadow && (e.receiveShadow = !0), e.frustumCulled = !1, this.setupRTEShadersForMesh(e), this.initDepthMaterial(e);
				let r = De(e, this.rteUserData, n);
				r && (e.onBeforeRender = r, e.onBeforeShadow = r), Array.isArray(e.material) ? e.material.forEach((e) => {
					this.ctx.applyShadowMaterial(e);
				}) : this.ctx.applyShadowMaterial(e.material);
			}
		}), this.applyEmissive(e);
	}
	applyEmissive(e) {
		let t = this.config.gltfModel;
		(t?.emissiveColor !== void 0 || t?.emissiveIntensity !== void 0) && e.traverse((e) => {
			if (!(e instanceof D)) return;
			let n = e.material, r = Array.isArray(n) ? n : [n];
			for (let e of r) {
				let n = e;
				n.emissive && (t.emissiveColor !== void 0 && n.emissive.set(t.emissiveColor.raw), t.emissiveIntensity !== void 0 && (n.emissiveIntensity = t.emissiveIntensity));
			}
		});
	}
	initDepthMaterial(e) {
		let t = Array.isArray(e.material) ? e.material[0] : e.material;
		e.customDepthMaterial = t.clone(), e.customDepthMaterial.needsUpdate = !0;
		let n = me(e.customDepthMaterial);
		n.mount({}), e.customDepthMaterial.customProgramCacheKey = () => n.programCacheKey(), e.customDepthMaterial.onBeforeCompile = (e, r) => {
			t.onBeforeCompile(e, r), n.transformShader(e), e.defines ??= {}, Object.assign(e.defines, t.userData?.defines || {}), e.defines.USE_SHADOWMAP_DEPTH = 1, e.defines.DEPTH_PACKING = zt;
		};
	}
	setPositionRTE(e) {
		this.originalWorldPosition.set(e.x, e.y, e.z), _e(e, this.modelPositionHigh, this.modelPositionLow);
	}
	applyRTETransform() {
		if (!this.raw) return;
		let e, t;
		if (this.geodetic) ({position: e, rotationScale: t} = se(this.resolveGeodeticFrame(this.geodetic), this.composeLocalTransform()));
		else if (this.matrixWorld) ({position: e, rotationScale: t} = se(this.matrixWorld, this.composeLocalTransform()));
		else if (this.matrix) {
			let n = new j(), r = new Lt(), i = new j();
			this.matrix.decompose(n, r, i), e = n, t = new E().compose(new j(0, 0, 0), r, i);
		} else return;
		this.setPositionRTE(e), this.raw.matrixAutoUpdate = !1, this.raw.matrixWorldAutoUpdate = !1, this.raw.matrixWorld.copy(t), this.raw.updateMatrixWorld();
	}
	reapplyGeodeticFrame() {
		this.applyRTETransform();
	}
	setupRTEShadersForMesh(e) {
		let t = Array.isArray(e.material) ? e.material : [e.material];
		this.modifyMaterialForRTE(t);
	}
	modifyMaterialForRTE(e) {
		e.forEach((e) => {
			if (e.userData.nvrRteApplied) return;
			e.userData.nvrRteApplied = !0;
			let t = e.onBeforeCompile;
			e.onBeforeCompile = (n, r) => {
				t && t.call(e, n, r), n.uniforms.u_cameraPositionHigh = this.rteUserData.cameraPositionHigh || { value: new j() }, n.uniforms.u_cameraPositionLow = this.rteUserData.cameraPositionLow || { value: new j() }, n.uniforms.rtePosHigh = { value: this.modelPositionHigh }, n.uniforms.rtePosLow = { value: this.modelPositionLow }, n.uniforms.modelViewMatrixRTE = this.rteUserData.modelViewMatrixRTE || { value: new E() }, n.uniforms.u_rteOne = v, n.vertexShader = fe(n.vertexShader).replace("#include <common>", `
            #include <common>
            ${xc}
            `).replace("#include <project_vertex>", bc).replace("#include <worldpos_vertex>", fe(qt.worldpos_vertex).replace("vec4 worldPosition = vec4( transformed, 1.0 );", "vec4 worldPosition = vec4( absTransformed, 1.0 );").replace("worldPosition = modelMatrix * worldPosition;", "").source).source;
			};
		});
	}
	onUpdateConfig(e) {
		if (e.gltfModel && this._instance) {
			let t = e.gltfModel;
			if ((t.castShadow !== void 0 || t.receiveShadow !== void 0) && this._instance.traverse((e) => {
				e instanceof D && (t.castShadow !== void 0 && (e.castShadow = t.castShadow), t.receiveShadow !== void 0 && (e.receiveShadow = t.receiveShadow));
			}), (t.emissiveColor !== void 0 || t.emissiveIntensity !== void 0) && (this.config.gltfModel && (t.emissiveColor !== void 0 && (this.config.gltfModel.emissiveColor = t.emissiveColor), t.emissiveIntensity !== void 0 && (this.config.gltfModel.emissiveIntensity = t.emissiveIntensity)), this.applyEmissive(this._instance)), this.mixer && this.actions.size > 0) {
				if (t.animationSpeed !== void 0 && this.setAnimationSpeed(t.animationSpeed), t.animationLoop !== void 0 && this.setAnimationLoop(t.animationLoop), t.animationActiveClip !== void 0) {
					let e = t.animationCrossfadeDuration ?? .3;
					this.currentAction ? this.crossFadeAnimation(this.getCurrentAnimationName() ?? "", t.animationActiveClip, e) : this.playAnimation(t.animationActiveClip);
				}
				t.animationEnabled !== void 0 && (t.animationEnabled ? this.resumeAnimation() : this.pauseAnimation());
			}
			t.url && t.url !== this.config.gltfModel?.url && (this.loadModel(t.url, this._instance), this.config.gltfModel && (this.config.gltfModel.url = t.url)), this.emit("needsUpdate");
		}
		if ((e.matrixWorld !== void 0 || e.matrix !== void 0 || e.geodetic !== void 0 || e.position !== void 0 || e.scale !== void 0 || e.rotation !== void 0) && (this.matrixWorld || e.matrixWorld || this.matrix || e.matrix || this.geodetic || e.geodetic)) {
			let t = e.geodetic === void 0 ? this.geodetic : Se(this.geodetic, e.geodetic), n = e.matrix === void 0 ? this.matrix : e.matrix, r = e.matrixWorld === void 0 ? this.matrixWorld : e.matrixWorld;
			if (te(t, n, r), e.geodetic !== void 0) {
				let e = this.geodetic;
				this.geodetic = t, (t?.lng !== e?.lng || t?.lat !== e?.lat || t?.heightReference !== e?.heightReference) && this.subscribeTerrainHeight();
			}
			e.matrixWorld !== void 0 && (this.matrixWorld = e.matrixWorld), e.matrix !== void 0 && (this.matrix = e.matrix), e.position !== void 0 && (this.position = e.position), e.scale !== void 0 && (this.scale = e.scale), e.rotation !== void 0 && (this.rotation = e.rotation), this.applyRTETransform();
			let { position: i, matrixWorld: a, matrix: o, geodetic: s, scale: c, rotation: l, ...u } = e;
			super.onUpdateConfig(u);
		} else if (e.position !== void 0) {
			this.position = e.position, this.setPositionRTE(new j(e.position.x, e.position.y, e.position.z));
			let { position: t, ...n } = e;
			super.onUpdateConfig(n);
		} else super.onUpdateConfig(e);
	}
	onDestroy() {
		this.pickWrapper &&= (this.ctx.unregisterPickableMesh(this.id), void 0), super.onDestroy();
	}
	disposeMesh() {
		this.disposeAnimation(), this._instance &&= (this._instance.traverse((e) => {
			e instanceof D && (this.ctx.removeShadowMaterial(e.material), e.geometry.dispose(), e.material && (Array.isArray(e.material) ? e.material.forEach((e) => e.dispose()) : e.material.dispose()), e.customDepthMaterial && e.customDepthMaterial.dispose());
		}), void 0);
	}
	disposeAnimationResources() {
		this.currentAction &&= (this.currentAction.stop(), null), this.actions.clear(), this.clips.clear(), this.mixer &&= (this.mixer.stopAllAction(), null), this.gltf = null;
	}
	shouldInitializeAnimation() {
		return this.gltf !== null && this.gltf.animations && this.gltf.animations.length > 0;
	}
	initAnimation() {
		if (!this.gltf || !this.gltf.animations || this.gltf.animations.length === 0) {
			console.warn("No animations found in GLTF model");
			return;
		}
		let e = this.config.gltfModel;
		this.mixer = new Me(this.gltf.scene);
		let t = e?.animationSpeed ?? this.animationSpeed, n = e?.animationLoop ?? this.isLooping;
		if (this.gltf.animations.forEach((e) => {
			if (this.clips.set(e.name, e), this.mixer) {
				let r = this.mixer.clipAction(e);
				this.actions.set(e.name, r), r.setLoop(n ? Ct : St, Infinity), r.setEffectiveTimeScale(t), r.setEffectiveWeight(0), r.enabled = !0;
			}
		}), this.animationSpeed = t, this.isLooping = n, e?.animationAutoPlay && e?.animationActiveClip) {
			let t = e.animationActiveClip;
			this.clips.has(t) ? (this.playAnimation(t), e.animationEnabled === !1 && this.pauseAnimation()) : console.warn(`Specified animation "${t}" not found in model`);
		}
		this.emit("animationReady");
	}
	getAnimationAvailable() {
		return Array.from(this.clips.keys());
	}
	getAnimationDetails(e) {
		if (e) {
			let t = this.clips.get(e), n = this.actions.get(e);
			if (!t || !n) throw Error(`Animation "${e}" not found`);
			return {
				name: t.name,
				duration: t.duration,
				tracks: t.tracks.length,
				isLooping: n.loop === Ct,
				timeScale: n.timeScale
			};
		}
		return Array.from(this.clips.entries()).map(([e, t]) => {
			let n = this.actions.get(e);
			if (!n) throw Error(`Animation action "${e}" not found`);
			return {
				name: t.name,
				duration: t.duration,
				tracks: t.tracks.length,
				isLooping: n.loop === Ct,
				timeScale: n.timeScale
			};
		});
	}
	getAnimationCurrentState() {
		let e = this.currentAction ? !this.currentAction.paused && this.currentAction.isRunning() : !1, t = this.getCurrentAnimationName(), n = Array.from(this.activeBlendAnimations.entries()).map(([e, t]) => ({
			name: e,
			weight: t.weight,
			isPlaying: !t.action.paused && t.action.isRunning()
		})), r = 0, i = 0;
		if (this.currentAction) {
			r = this.currentAction.time;
			let e = this.clips.get(t || "");
			e && e.duration > 0 && (i = Math.min(r / e.duration, 1));
		}
		return {
			isPlaying: e,
			currentAnimation: t,
			isBlendMode: this.isBlendMode,
			blendAnimations: n,
			playbackTime: r,
			progress: i
		};
	}
	getAnimationClip(e) {
		return this.clips.get(e) || null;
	}
	getAnimationAction(e) {
		return this.actions.get(e) || null;
	}
	playAnimation(e) {
		if (!this.mixer || !this.actions.has(e)) return console.warn(`Animation clip "${e}" not found`), !1;
		this.isBlendMode ? (this.stopAllAnimations(), this.isBlendMode = !1) : this.currentAction && this.currentAction.stop();
		let t = this.actions.get(e);
		return t ? (this.ensureAnimationPlaying(t), !0) : (console.warn(`Animation action "${e}" not found`), !1);
	}
	crossFadeAnimation(e, t, n) {
		if (!this.mixer) return console.warn("Animation mixer not initialized"), !1;
		if (!this.actions.has(e)) return console.warn(`Animation clip "${e}" not found`), !1;
		if (!this.actions.has(t)) return console.warn(`Animation clip "${t}" not found`), !1;
		let r = this.actions.get(e), i = this.actions.get(t);
		return !r || !i ? (console.warn("Animation actions not found for crossfade"), !1) : r === i ? (this.ensureAnimationPlaying(i), !0) : (this.isBlendMode &&= (this.stopAllAnimations(), !1), this.ensureFromAnimationActive(r), this.executeCrossFade(r, i, n), !0);
	}
	ensureAnimationPlaying(e) {
		e.enabled = !0, e.setEffectiveWeight(1), e.setEffectiveTimeScale(this.animationSpeed), e.reset().play(), this.currentAction = e, this.emit("needsUpdate");
	}
	ensureFromAnimationActive(e) {
		this.currentAction !== e && (e.enabled = !0, e.setEffectiveTimeScale(this.animationSpeed), e.setEffectiveWeight(1), e.reset().play(), this.currentAction = e);
	}
	executeCrossFade(e, t, n) {
		t.enabled = !0, t.setEffectiveTimeScale(this.animationSpeed), t.setEffectiveWeight(1), t.time = 0, e.crossFadeTo(t, n, !0), t.play(), this.currentAction = t, this.emit("needsUpdate");
	}
	blendAnimations(e) {
		if (!this.mixer) {
			console.warn("Animation mixer not initialized");
			return;
		}
		this.stopAllAnimations(), this.isBlendMode = !0, this.currentAction = null, e.forEach(({ name: e, weight: t }) => {
			let n = this.actions.get(e);
			if (!n) {
				console.warn(`Animation "${e}" not found`);
				return;
			}
			n.enabled = !0, n.setEffectiveTimeScale(this.animationSpeed), n.setEffectiveWeight(t), n.play(), this.activeBlendAnimations.set(e, {
				action: n,
				weight: t,
				targetWeight: t
			});
		}), this.emit("needsUpdate");
	}
	stopAnimation() {
		this.isBlendMode ? this.stopAllAnimations() : this.currentAction &&= (this.currentAction.stop(), null);
	}
	stopAllAnimations() {
		this.activeBlendAnimations.forEach((e) => {
			e.action.stop();
		}), this.activeBlendAnimations.clear(), this.currentAction &&= (this.currentAction.stop(), null), this.actions.forEach((e) => {
			e.setEffectiveWeight(0), e.enabled = !1;
		}), this.isBlendMode = !1, this.emit("needsUpdate");
	}
	pauseAnimation() {
		this.isBlendMode ? this.activeBlendAnimations.forEach((e) => {
			e.action.paused = !0;
		}) : this.currentAction && (this.currentAction.paused = !0);
	}
	resumeAnimation() {
		this.isBlendMode ? this.activeBlendAnimations.forEach((e) => {
			e.action.paused = !1;
		}) : this.currentAction && (this.currentAction.paused = !1);
	}
	normalizeAnimationWeights() {
		if (!this.isBlendMode || this.activeBlendAnimations.size === 0) {
			console.warn("No blend animations to normalize");
			return;
		}
		let e = Array.from(this.activeBlendAnimations.values()).reduce((e, t) => e + t.targetWeight, 0);
		if (e === 0) {
			console.warn("Total weight is 0, cannot normalize");
			return;
		}
		this.activeBlendAnimations.forEach((t) => {
			let n = t.targetWeight / e;
			t.action.weight = n, t.weight = n;
		}), this.emit("needsUpdate");
	}
	setAnimationSpeed(e) {
		this.animationSpeed = e, this.actions.forEach((t) => {
			t.setEffectiveTimeScale(e);
		});
	}
	setAnimationLoop(e) {
		this.isLooping = e, this.actions.forEach((t) => {
			t.setLoop(e ? Ct : St, Infinity);
		});
	}
	setAnimationWeight(e, t) {
		if (!this.mixer) {
			console.warn("Animation mixer not initialized");
			return;
		}
		if (this.isBlendMode && this.activeBlendAnimations.has(e)) {
			let n = this.activeBlendAnimations.get(e);
			if (!n) {
				console.warn(`Blend animation "${e}" not found`);
				return;
			}
			n.action.enabled = t > 0, n.action.setEffectiveWeight(t), n.weight = t, n.targetWeight = t;
		} else {
			let n = this.actions.get(e);
			if (!n) {
				console.warn(`Animation "${e}" not found`);
				return;
			}
			this.isBlendMode || (this.stopAllAnimations(), this.isBlendMode = !0, this.currentAction = null), n.enabled = !0, n.setEffectiveTimeScale(this.animationSpeed), n.setEffectiveWeight(t), n.play(), this.activeBlendAnimations.set(e, {
				action: n,
				weight: t,
				targetWeight: t
			});
		}
		this.emit("needsUpdate");
	}
	updateAnimation(e) {
		this.updateAnimationMixer(e);
	}
	disposeAnimation() {
		this.disposeAnimationResources();
	}
	updateAnimationMixer(e) {
		this.mixer && this.mixer.update(e);
	}
	update(e) {
		if (!this.lastUpdateTime) {
			this.lastUpdateTime = e;
			return;
		}
		let t = (e - this.lastUpdateTime) / 1e3;
		this.lastUpdateTime = e, this.updateAnimationMixer(t);
	}
	getCurrentAnimationName() {
		if (!this.currentAction) return null;
		for (let [e, t] of this.actions.entries()) if (t === this.currentAction) return e;
		return null;
	}
	getWorldPosition() {
		return this.originalWorldPosition;
	}
	lastUpdateTime;
}, wc = "navaraSplatOrigin", Tc = "navaraSplatOriginUpdater", Ec = "__navaraOriginPatched";
function Dc(e) {
	let t = e.prototype;
	if (t[Ec]) return;
	t[Ec] = !0;
	let n = t.onBeforeRender, r = new Pt(), i = new j(), a = new Lt();
	t.onBeforeRender = function(t, o, s) {
		let c = e.sparkOverride ?? this, l = s;
		c?.userData?.[Tc]?.(l);
		let u = c?.userData?.[wc];
		if (!u) {
			n.call(this, t, o, s);
			return;
		}
		l.getWorldPosition(i), l.getWorldQuaternion(a), r.position.copy(i).sub(u), r.quaternion.copy(a), r.near = l.near, r.far = l.far, r.projectionMatrix.copy(l.projectionMatrix), r.projectionMatrixInverse.copy(l.projectionMatrixInverse), r.updateMatrixWorld(!0), n.call(this, t, o, r);
	};
}
//#endregion
//#region src/meshes/SplatMeshDesc/splatOriginController.ts
var Oc = class {
	cellSize;
	origin = new j();
	hasOrigin = !1;
	meshes = /* @__PURE__ */ new Map();
	cameraPos = new j();
	snapped = new j();
	translation = new E();
	constructor(e) {
		this.cellSize = e;
	}
	register(e, t) {
		this.meshes.set(e, t), this.hasOrigin && this.recenter(e, t);
	}
	unregister(e) {
		this.meshes.delete(e);
	}
	update = (e) => {
		e.getWorldPosition(this.cameraPos);
		let t = this.cellSize;
		if (this.snapped.set(Math.round(this.cameraPos.x / t) * t, Math.round(this.cameraPos.y / t) * t, Math.round(this.cameraPos.z / t) * t), !(this.hasOrigin && this.snapped.equals(this.origin))) {
			this.origin.copy(this.snapped), this.hasOrigin = !0;
			for (let [e, t] of this.meshes) this.recenter(e, t);
		}
	};
	recenter(e, t) {
		e.matrixAutoUpdate = !1, e.matrixWorldAutoUpdate = !1, this.translation.makeTranslation(-this.origin.x, -this.origin.y, -this.origin.z), e.matrixWorld.multiplyMatrices(this.translation, t);
	}
}, kc, Ac;
function jc() {
	return Ac ??= import("./spark.module-B33i2c2c.js").then((e) => kc = e, (e) => {
		throw Ac = void 0, e;
	}), Ac;
}
function Mc() {
	if (!kc) throw Error("SplatMeshDesc: @sparkjsdev/spark is not loaded yet (onCreate awaits it before any spark use).");
	return kc;
}
var Nc = 2e3, Pc = /* @__PURE__ */ new WeakMap();
function Fc(e, t) {
	let n = e.scenes.transparent, r = Pc.get(n);
	if (r) return t.enableLod && !r.enableLod && console.warn("SplatMeshDesc: splat.lod=true requested but the shared SparkRenderer was created with splat.lod=false; rendering this mesh without LoD."), r.listeners.add(t.onDirty), r.refCount += 1, Mc().SparkRenderer.sparkOverride = r.renderer, {
		enableLod: r.enableLod,
		controller: r.controller
	};
	let i = e.getInputBuffer().texture.colorSpace !== Gt, { SparkRenderer: a } = Mc(), o = /* @__PURE__ */ new Set([t.onDirty]), s = new a({
		renderer: e.getRenderer(),
		enableLod: t.enableLod,
		encodeLinear: i,
		onDirty: () => o.forEach((e) => e())
	}), c = new Oc(t.cellSize);
	return s.userData[wc] = c.origin, s.userData[Tc] = c.update, Dc(a), n.add(s), a.sparkOverride = s, Pc.set(n, {
		renderer: s,
		refCount: 1,
		enableLod: t.enableLod,
		listeners: o,
		controller: c
	}), {
		enableLod: t.enableLod,
		controller: c
	};
}
function Ic(e, t) {
	let n = e.scenes.transparent, r = Pc.get(n);
	if (!r || (r.listeners.delete(t), --r.refCount, r.refCount > 0)) return;
	n.remove(r.renderer), r.renderer.dispose();
	let { SparkRenderer: i } = Mc();
	i.sparkOverride === r.renderer && (i.sparkOverride = void 0), Pc.delete(n);
}
function Lc(e, t, n) {
	t !== void 0 && t !== n && console.warn(`SplatMeshDesc: splat.${e} cannot be changed after creation; recreate the descriptor.`);
}
var Rc = class extends f {
	config;
	holdsSlot = !1;
	onSparkDirty;
	controller;
	constructor(e, t, n) {
		super(e, t, n), this.config = n;
	}
	getPassKey() {
		return "transparent";
	}
	createMesh() {
		let e = this.config.splat;
		if (!e?.url) throw Error("SplatMeshDesc requires splat.url");
		let t = e.lod ?? !1;
		this.onSparkDirty = () => this.requestUpdate();
		let { enableLod: n, controller: r } = Fc(this.ctx, {
			enableLod: t,
			onDirty: this.onSparkDirty,
			cellSize: e.originCellSize ?? Nc
		});
		this.controller = r;
		let i = t && n;
		this.ctx.concurrencyManager.canIncrement() && (this.ctx.concurrencyManager.increment(), this.holdsSlot = !0);
		let a = e.url, o = new (Mc()).SplatMesh({
			url: a,
			lod: i
		});
		return o.initialized.then(() => {
			this.requestUpdate(), this.emit("load");
		}).catch((e) => {
			console.warn(`SplatMesh load failed (${a}):`, e), this.emit("error", e);
		}).finally(() => this.releaseSlot()), o;
	}
	async onCreate() {
		if (await jc(), this.destroyed) return;
		super.onCreate();
		let e = this.raw;
		!e || !this.controller || this.controller.register(e, e.matrixWorld.clone());
	}
	reapplyGeodeticFrame() {
		super.reapplyGeodeticFrame();
		let e = this.raw;
		e && this.controller && this.controller.register(e, e.matrixWorld.clone());
	}
	releaseSlot() {
		this.holdsSlot &&= (this.ctx.concurrencyManager.decrement(), !1);
	}
	onUpdateConfig(e) {
		let t = e.splat, n = this.config.splat;
		t && n && (t.url !== void 0 && (Lc("url", t.url, n.url), n.url = t.url), t.lod !== void 0 && (Lc("lod", t.lod, n.lod ?? !1), n.lod = t.lod), t.originCellSize !== void 0 && (Lc("originCellSize", t.originCellSize, n.originCellSize), n.originCellSize = t.originCellSize)), super.onUpdateConfig(e);
		let r = e.matrix !== void 0 || e.matrixWorld !== void 0 || e.geodetic !== void 0 || e.position !== void 0 || e.scale !== void 0 || e.rotation !== void 0, i = this.raw;
		r && i && this.controller && (this.matrixWorld || this.matrix || this.geodetic) && this.controller.register(i, i.matrixWorld.clone());
	}
	onDestroy() {
		let e = this._instance;
		super.onDestroy(), e && this.controller?.unregister(e), e?.dispose(), this.releaseSlot(), this.onSparkDirty &&= (Ic(this.ctx, this.onSparkDirty), void 0);
	}
}, zc = class extends p {
	config;
	pickWrapper;
	constructor(e, t, n) {
		n.tube?.effectIds && (n.effectIds = n.tube.effectIds), super(e, t, n), this.config = n;
	}
	get batchId() {
		return this.pickWrapper?.batchId;
	}
	createMesh() {
		let e = this.config.tube;
		if (!e) throw Error("TubeMesh configuration is required");
		if (!e.points || e.points.length < 2) throw Error("TubeMesh requires points array with at least 2 points");
		let t = e.points.map((e) => new j(e.x, e.y, e.z)), n = new We(t);
		n.tension = e.tension ?? .5;
		let r = new nn(n, e.tubularSegments ?? 64, e.radius ?? 1, e.radialSegments ?? 8, e.closed ?? !1), a = e.color ?? new i().setStyle("#ffffff"), o = e.emissiveColor ? e.emissiveColor.raw : 0, s = new Ot({
			color: a.raw,
			emissive: o,
			emissiveIntensity: e.emissiveIntensity ?? 0,
			opacity: e.opacity ?? 1,
			transparent: e.transparent ?? !1
		});
		ke(s);
		let c = new D(r, s);
		return c.castShadow = e.castShadow ?? !1, c.receiveShadow = e.receiveShadow ?? !1, this.ctx.applyShadowMaterial(s), this.config.pickable && (this.pickWrapper = new g(c, this.ctx), this.ctx.registerPickableMesh(this.id, this.pickWrapper)), c;
	}
	onUpdateConfig(e) {
		if (e.tube && this._instance) {
			let t = e.tube, n = this.config.tube;
			if (t.points || t.tubularSegments !== void 0 || t.radius !== void 0 || t.radialSegments !== void 0 || t.closed !== void 0 || t.tension !== void 0) {
				let e;
				if (t.points && t.points.length >= 2) {
					this._instance.geometry.dispose();
					let n = t.points.map((e) => new j(e.x, e.y, e.z));
					e = new We(n), e.tension = t.tension ?? .5;
				} else e = this._instance.geometry.parameters.path, e.tension = t.tension ?? e.tension;
				this._instance.geometry = new nn(e, t.tubularSegments ?? n?.tubularSegments, t.radius ?? n?.radius, t.radialSegments ?? n?.radialSegments, t.closed ?? n?.closed), n && Object.assign(n, t);
			}
			if (t.color !== void 0 || t.emissiveColor !== void 0 || t.emissiveIntensity !== void 0 || t.opacity !== void 0 || t.transparent !== void 0) {
				let e = this._instance.material;
				if (t.color !== void 0) {
					let n = t.color.raw;
					e.color.set(n);
				}
				t.emissiveColor !== void 0 && e.emissive.set(t.emissiveColor.raw), t.emissiveIntensity !== void 0 && (e.emissiveIntensity = t.emissiveIntensity), t.opacity !== void 0 && (e.opacity = t.opacity), t.transparent !== void 0 && (e.transparent = t.transparent), e.needsUpdate = !0;
			}
			t.castShadow !== void 0 && (this._instance.castShadow = t.castShadow), t.receiveShadow !== void 0 && (this._instance.receiveShadow = t.receiveShadow), t.effectIds !== void 0 && (e.effectIds = t.effectIds), this.emit("needsUpdate");
		}
		super.onUpdateConfig(e);
	}
	disposeMesh() {
		this._instance &&= (this.ctx.removeShadowMaterial(this._instance.material), this._instance.geometry.dispose(), this._instance.material.dispose(), void 0);
	}
	onDestroy() {
		this.pickWrapper &&= (this.ctx.unregisterPickableMesh(this.id), void 0), super.onDestroy();
	}
}, Bc = "in float vOpacity;\nin vec3 vColor;\nin float vLineDistance;\nin vec4 vDash; \n\n#include <logdepthbuf_pars_fragment>\n\nvoid main() {\n  if (vDash.x > 0.5) {\n    float dashSize   = vDash.y;\n    float gapSize    = vDash.z;\n    float dashOffset = vDash.w;\n\n    float unit = dashSize + gapSize;\n    if (unit > 0.0) {\n      float d = mod(vLineDistance + dashOffset, unit);\n      if (d > dashSize) {\n        discard;\n      }\n    }\n  }\n\n  \n  vec3 fdx = dFdx(gl_FragCoord.xyz);\n  vec3 fdy = dFdy(gl_FragCoord.xyz);\n  vec3 normal = normalize(cross(fdx, fdy));\n  \n  \n  if (normal.z < 0.0) normal = -normal;\n  \n  gl_FragColor = vec4(vColor, vOpacity);\n  \n  #include <logdepthbuf_fragment>\n}", Vc = "precision highp float;\n\nuniform vec2  uViewport;\nuniform float uA;\nuniform float uE2;\n\nuniform vec3 u_cameraPositionHigh;\nuniform vec3 u_cameraPositionLow;\nuniform mat4 modelViewMatrixRTE;\n\nuniform float u_rteOne;\n\nattribute vec2 aVertexData; \n\nattribute vec3 aInstanceSourceHigh; \nattribute vec3 aInstanceSourceLow;  \nattribute vec3 aInstanceTargetHigh; \nattribute vec3 aInstanceTargetLow;  \n\nattribute vec4 aInstanceParams1; \nattribute vec3 aInstanceParams2; \nattribute vec4 aInstanceDash;    \nattribute vec3 aInstanceSrcColor;\nattribute vec3 aInstanceTgtColor;\n\nout vec3 vColor;\nout float vOpacity;\nout float vLineDistance;\nout vec4 vDash;\n\n#include <common>\n#include <logdepthbuf_pars_vertex>\n\n#ifndef ELLIPSOID_GLSL\n#define ELLIPSOID_GLSL\n\n#define WGS84_A 6378137.0\n#define WGS84_B 6356752.3142451793\n\nconst vec3 WGS84_RADII = vec3(WGS84_A, WGS84_A, WGS84_B);\nconst vec3 ONE_OVER_WGS84_RADII = 1.0 / vec3(WGS84_A, WGS84_A, WGS84_B);\nconst vec3 ONE_OVER_WGS84_RADII_SQUARED = 1.0 / vec3(WGS84_A * WGS84_A, WGS84_A * WGS84_A, WGS84_B * WGS84_B);\n\nconst float WGS84_E2 = 0.00669438; \nconst float WGS84_E2_SECOND = 0.00673950; \n\nconst float WGS84_FLATTENING = 0.00335281; \nconst float WGS84_FLATTENING_RECIPROCAL = 298.257223563; \n\n#endif\n\nconst float DEG_TO_RAD = 0.017453292519943295;\nconst float RAD_TO_DEG = 57.29577951308232;\n\n#ifndef PI\n  #define PI 3.141592653589793\n#endif\n\nvec3 rotateAroundAxis(vec3 v, vec3 axis, float angle) {\n  float c = cos(angle); \n  float s = sin(angle);\n  return v * c + cross(axis, v) * s + axis * dot(axis, v) * (1.0 - c);\n}\n\nvec3 lonLatToEllipsoid(float lon, float lat, float a, float e2) {\n  float lonR = lon * DEG_TO_RAD;\n  float latR = lat * DEG_TO_RAD;\n\n  float sinLat = sin(latR);\n  float cosLat = cos(latR);\n  float N = a / sqrt(1.0 - e2 * sinLat * sinLat); \n\n  float x = N * cosLat * cos(lonR);\n  float y = N * cosLat * sin(lonR);\n  float z = N * (1.0 - e2) * sinLat;\n\n  return vec3(x, y, z);\n}\n\nvec3 ecefToLonLat(vec3 ecef) {\n  float x = ecef.x;\n  float y = ecef.y;\n  float z = ecef.z;\n\n  float lon = atan(y, x) * RAD_TO_DEG;\n\n  float p = sqrt(x * x + y * y);\n  float theta = atan(z * WGS84_A, p * WGS84_B);\n  float lat = atan(z + WGS84_E2_SECOND * WGS84_B * pow(sin(theta), 3.0),\n                    p - WGS84_E2 * WGS84_A * pow(cos(theta), 3.0)) * RAD_TO_DEG;\n  \n  float N = WGS84_A / sqrt(1.0 - WGS84_E2 * sin(lat * DEG_TO_RAD) * sin(lat * DEG_TO_RAD));\n  float alt = p / cos(lat * DEG_TO_RAD) - N;\n\n  return vec3(lon, lat, alt);\n}\n\nvec3 ellipsoidGeodesic(vec3 s, vec3 t, float tt, float a, float e2) {\n  \n  vec3 sN = normalize(s); \n  vec3 tN = normalize(t);\n  float d = clamp(dot(sN, tN), -1.0, 1.0);\n  float omega = acos(d);\n\n  \n  vec3 spherePoint;\n  if (abs(omega) < 1e-6) {\n    \n    spherePoint = sN;\n  } else if (abs(PI - omega) < 1e-5) {\n    \n    vec3 aux = abs(sN.z) < 0.9 ? vec3(0.0,0.0,1.0) : vec3(0.0,1.0,0.0);\n    vec3 axis = normalize(cross(sN, aux));\n    spherePoint = normalize(rotateAroundAxis(sN, axis, PI * tt));\n  } else {\n    float sinO = sin(omega);\n    vec3 dir = (sin((1.0 - tt) * omega) / sinO) * sN\n              + (sin(tt * omega) / sinO) * tN;\n    spherePoint = normalize(dir);\n  }\n\n  \n  float lon = atan(spherePoint.y, spherePoint.x) * RAD_TO_DEG;\n  float lat = asin(clamp(spherePoint.z, -1.0, 1.0)) * RAD_TO_DEG;\n\n  return lonLatToEllipsoid(lon, lat, a, e2);\n}\n\nconst float ARC_BULGE_OMEGA_LO = 5e-4; \nconst float ARC_BULGE_OMEGA_HI = 5e-3; \n\nvec3 arcPointRel(\n  vec3 srcRel, vec3 tgtRel,\n  vec3 srcAbs, vec3 tgtAbs,\n  float bulgeWeight, float tt,\n  float arcHeight, float extraHeight,\n  float a, float e2\n) {\n  \n  vec3 chordRel = mix(srcRel, tgtRel, tt);\n\n  \n  \n  vec3 geoAbs = ellipsoidGeodesic(srcAbs, tgtAbs, tt, a, e2);\n  vec3 chordAbs = mix(srcAbs, tgtAbs, tt);\n  vec3 baseRel = chordRel + (geoAbs - chordAbs) * bulgeWeight;\n\n  \n  vec3 upDir = normalize(geoAbs);\n  float lift = arcHeight * sin(PI * tt);\n  return baseRel + upDir * (lift + extraHeight);\n}\n\nvoid main() {\n  \n  float t = aVertexData.x;\n  float aSide = aVertexData.y;\n\n  \n  float aInstanceHeight = aInstanceParams1.x;\n  float aInstanceArcHeight = aInstanceParams1.y;\n  float aInstanceThickness = aInstanceParams1.z;\n  float aInstanceOpacity = aInstanceParams1.w;\n  float aInstanceSegments = aInstanceParams2.x;\n  float aInstanceGradation = aInstanceParams2.y;\n\n  float dt = 1.0 / aInstanceSegments;\n  float t_dir = clamp(t + dt, 0.0, 1.0);\n\n  \n  vec3 srcAbs = aInstanceSourceHigh + aInstanceSourceLow;\n  vec3 tgtAbs = aInstanceTargetHigh + aInstanceTargetLow;\n\n  \n  \n  \n  \n  vec3 srcRel = (aInstanceSourceHigh - u_cameraPositionHigh) * u_rteOne\n              + (aInstanceSourceLow - u_cameraPositionLow);\n  vec3 tgtRel = (aInstanceTargetHigh - u_cameraPositionHigh) * u_rteOne\n              + (aInstanceTargetLow - u_cameraPositionLow);\n\n  \n  \n  float cosOmega = clamp(dot(normalize(srcAbs), normalize(tgtAbs)), -1.0, 1.0);\n  float omega = acos(cosOmega);\n  float bulgeWeight = smoothstep(ARC_BULGE_OMEGA_LO, ARC_BULGE_OMEGA_HI, omega);\n\n  vec3 p0 = arcPointRel(srcRel, tgtRel, srcAbs, tgtAbs, bulgeWeight, t,\n                        aInstanceArcHeight, aInstanceHeight, uA, uE2);\n  vec3 p1_dir = arcPointRel(srcRel, tgtRel, srcAbs, tgtAbs, bulgeWeight, t_dir,\n                            aInstanceArcHeight, aInstanceHeight, uA, uE2);\n\n  \n  vec4 clip0     = projectionMatrix * modelViewMatrixRTE * vec4(p0,     1.0);\n  vec4 clip1_dir = projectionMatrix * modelViewMatrixRTE * vec4(p1_dir, 1.0);\n\n  vec2 ndc0 = clip0.xy / clip0.w;\n  vec2 ndc1dir = clip1_dir.xy / clip1_dir.w;\n\n  \n  vec2 dir = normalize(ndc1dir - ndc0 + vec2(1e-6));\n  vec2 normal = vec2(-dir.y, dir.x);\n  vec2 pixel2NDC = vec2(aInstanceThickness / uViewport.x, aInstanceThickness / uViewport.y) * 2.0;\n  vec2 offsetNDC = normal * aSide * pixel2NDC;\n\n  vec4 outPos = clip0;\n  outPos.xy += offsetNDC * clip0.w;\n  gl_Position = outPos;\n\n  #include <logdepthbuf_vertex>\n\n  \n  vColor = mix(aInstanceSrcColor, aInstanceTgtColor, clamp(t + (0.5 - aInstanceGradation) * 2.0, 0.0, 1.0));\n  vOpacity = aInstanceOpacity;\n\n  vLineDistance = t * aInstanceParams2.z;\n  vDash = aInstanceDash;\n}", U = {
	thickness: 1,
	transparent: !1,
	opacity: 1,
	segments: 64,
	srcColor: new i().setHex(16777215),
	tgtColor: new i().setHex(16777215),
	height: 0,
	arcHeightScale: .3,
	gradation: .5,
	dashed: !1,
	dashSize: 1,
	gapSize: 1,
	dashOffset: 0,
	geometry: []
}, Hc = class extends Mt {
	_config;
	_subMeshes = [];
	_sharedSEUniforms = {
		uEffectIdsMask: { value: 0 },
		uEmissiveColor: { value: new w(0) },
		uEmissiveIntensity: { value: 0 }
	};
	_sharedRTEUniforms = {
		modelViewMatrixRTE: { value: new E() },
		cameraPositionHigh: { value: new j() },
		cameraPositionLow: { value: new j() }
	};
	constructor(e = []) {
		super(), this._config = e.map((e) => ({
			...U,
			...e
		})), !(this._config.length < 1) && (this.initSubMeshes(), this.updateBoundingSphere());
	}
	initSubMeshes() {
		this._subMeshes.forEach((e) => {
			e.geometry.dispose(), e.material.dispose(), this.remove(e);
		}), this._subMeshes = [], this._config.forEach((e) => {
			let t = this.createSubMesh(e);
			this._subMeshes.push(t), this.add(t);
		}), this.attachRteCallback();
	}
	attachRteCallback() {
		if (this._subMeshes.length === 0) return;
		let e = new E(), t = De(this, this._sharedRTEUniforms, e, e);
		t && (this._subMeshes[0].onBeforeRender = t, this._subMeshes[0].onBeforeShadow = t);
	}
	createSubMesh(e) {
		let t = new ct();
		this.fillSingleConfigAttributes(e, t);
		let n = Math.floor(e.geometry.length / 2);
		if (n === 0) return new D(t, new O());
		let r = new Float32Array(n * 3), i = new Float32Array(n * 3), a = new Float32Array(n * 3), o = new Float32Array(n * 3), s = new Float32Array(n * 4), c = new Float32Array(n * 3), l = new Float32Array(n * 4), u = new Float32Array(n * 3), d = new Float32Array(n * 3);
		t.setAttribute("aInstanceSourceHigh", new st(r, 3)), t.setAttribute("aInstanceSourceLow", new st(i, 3)), t.setAttribute("aInstanceTargetHigh", new st(a, 3)), t.setAttribute("aInstanceTargetLow", new st(o, 3)), t.setAttribute("aInstanceParams1", new st(s, 4)), t.setAttribute("aInstanceParams2", new st(c, 3)), t.setAttribute("aInstanceDash", new st(l, 4)), t.setAttribute("aInstanceSrcColor", new st(u, 3)), t.setAttribute("aInstanceTgtColor", new st(d, 3)), this.fillSingleConfigInstanceData(e, t);
		let f = this.createMaterial();
		f.transparent = e.transparent;
		let p = new D(t, f);
		return f.uniforms.modelViewMatrixRTE = this._sharedRTEUniforms.modelViewMatrixRTE, f.uniforms.u_cameraPositionHigh = this._sharedRTEUniforms.cameraPositionHigh, f.uniforms.u_cameraPositionLow = this._sharedRTEUniforms.cameraPositionLow, p;
	}
	calculateArcLength(e, t, n) {
		let r = xe(), i = he(e.lat), a = he(t.lat), o = he(e.lng), s = he(t.lng), c = a - i, l = s - o, u = Math.sin(c / 2) * Math.sin(c / 2) + Math.cos(i) * Math.cos(a) * Math.sin(l / 2) * Math.sin(l / 2), d = r * (2 * Math.atan2(Math.sqrt(u), Math.sqrt(1 - u)));
		if (n === 0) return d;
		let f = d, p = n, m = f * f / (8 * p) + p / 2, h = f / 2, g = Math.min(1, h / m);
		return 2 * Math.asin(g) * m;
	}
	fillSingleConfigAttributes(e, t) {
		let n = Math.max(2, e.segments), r = n + 1, i = r * 2, a = n * 6, o = new Float32Array(i * 3), s = new Float32Array(i * 2), c = new Uint32Array(a), l = 0, u = 0;
		for (let e = 0; e < r; e++) {
			let t = e / n;
			s[u * 2] = t, s[u * 2 + 1] = -1, s[(u + 1) * 2] = t, s[(u + 1) * 2 + 1] = 1, u += 2;
		}
		for (let e = 0; e < n; e++) {
			let t = e * 2, n = t + 1, r = (e + 1) * 2, i = r + 1;
			c[l++] = t, c[l++] = n, c[l++] = r, c[l++] = n, c[l++] = i, c[l++] = r;
		}
		t.setIndex(new C(c, 1)), t.setAttribute("position", new C(o, 3)), t.setAttribute("aVertexData", new C(s, 2));
	}
	setInstanceAttributes(e, t, n, r, i, a, o, s, c, l) {
		a.setXYZW(e, t.height, r, t.thickness, t.opacity), o.setXYZ(e, n, t.gradation, i), s.setXYZW(e, +!!t.dashed, t.dashSize, t.gapSize, t.dashOffset);
		let u = t.srcColor.raw, d = t.tgtColor.raw;
		c.setXYZ(e, u.r, u.g, u.b), l.setXYZ(e, d.r, d.g, d.b);
	}
	fillInstanceCommonData(e, t, n, r, i, a, o, s, c, l, u) {
		let d = i * t.arcHeightScale, f = this.calculateArcLength(n, r, d);
		this.setInstanceAttributes(e, t, a, d, f, o, s, c, l, u);
	}
	updateArcParameters(e, t) {
		let n = t.instanceCount;
		if (n === 0) return;
		let r = t.getAttribute("aInstanceParams1"), i = t.getAttribute("aInstanceParams2"), a = t.getAttribute("aInstanceDash"), o = t.getAttribute("aInstanceSrcColor"), s = t.getAttribute("aInstanceTgtColor"), c = r.array, l = i.array;
		for (let t = 0; t < n; t++) {
			let n = t * 4, u = t * 3, d = c[n + 1], f = l[u], p = l[u + 2];
			this.setInstanceAttributes(t, e, f, d, p, r, i, a, o, s);
		}
		r.needsUpdate = !0, i.needsUpdate = !0, a.needsUpdate = !0, o.needsUpdate = !0, s.needsUpdate = !0;
	}
	updateArcHeightAndLength(e, t) {
		let n = Math.floor(e.geometry.length / 2);
		if (n === 0) return;
		let r = t.getAttribute("aInstanceParams1"), i = t.getAttribute("aInstanceParams2"), a = t.getAttribute("aInstanceDash"), o = t.getAttribute("aInstanceSrcColor"), s = t.getAttribute("aInstanceTgtColor"), c = Math.max(2, Math.floor(e.segments));
		for (let t = 0; t < n; t++) {
			let n = e.geometry[t * 2], l = e.geometry[t * 2 + 1], u = {
				lat: n.lat,
				lng: n.lng,
				height: 0
			}, d = {
				lat: l.lat,
				lng: l.lng,
				height: 0
			}, f = ve(u), p = ve(d), m = f.distanceTo(p) * e.arcHeightScale, h = this.calculateArcLength(n, l, m);
			this.setInstanceAttributes(t, e, c, m, h, r, i, a, o, s);
		}
		r.needsUpdate = !0, i.needsUpdate = !0, a.needsUpdate = !0, o.needsUpdate = !0, s.needsUpdate = !0;
	}
	fillInstanceDataRTE(e, t, n, r) {
		let i = r.getAttribute("aInstanceSourceHigh"), a = r.getAttribute("aInstanceSourceLow"), o = r.getAttribute("aInstanceTargetHigh"), s = r.getAttribute("aInstanceTargetLow"), c = r.getAttribute("aInstanceParams1"), l = r.getAttribute("aInstanceParams2"), u = r.getAttribute("aInstanceDash"), d = r.getAttribute("aInstanceSrcColor"), f = r.getAttribute("aInstanceTgtColor"), p = new j(), m = new j();
		for (let r = 0; r < t; r++) {
			let t = e.geometry[r * 2], h = e.geometry[r * 2 + 1], g = {
				lat: t.lat,
				lng: t.lng,
				height: 0
			}, _ = {
				lat: h.lat,
				lng: h.lng,
				height: 0
			}, v = ve(g), y = ve(_), b = v.distanceTo(y);
			_e(v, p, m), i.setXYZ(r, p.x, p.y, p.z), a.setXYZ(r, m.x, m.y, m.z), _e(y, p, m), o.setXYZ(r, p.x, p.y, p.z), s.setXYZ(r, m.x, m.y, m.z), this.fillInstanceCommonData(r, e, t, h, b, n, c, l, u, d, f);
		}
		i.needsUpdate = !0, a.needsUpdate = !0, o.needsUpdate = !0, s.needsUpdate = !0;
	}
	fillSingleConfigInstanceData(e, t) {
		let n = Math.floor(e.geometry.length / 2);
		if (t.instanceCount = n, n === 0) return;
		let r = Math.max(2, Math.floor(e.segments));
		this.fillInstanceDataRTE(e, n, r, t);
		let i = t.getAttribute("aInstanceParams1"), a = t.getAttribute("aInstanceParams2"), o = t.getAttribute("aInstanceDash"), s = t.getAttribute("aInstanceSrcColor"), c = t.getAttribute("aInstanceTgtColor");
		i.needsUpdate = !0, a.needsUpdate = !0, o.needsUpdate = !0, s.needsUpdate = !0, c.needsUpdate = !0;
	}
	createMaterial() {
		let e = xe(), t = ye(), n = new O();
		return n.vertexShader = Vc, n.fragmentShader = Bc, n.uniforms = {
			uViewport: { value: new A(1920, 1080) },
			uA: { value: e },
			uE2: { value: t },
			u_cameraPositionHigh: { value: new j() },
			u_cameraPositionLow: { value: new j() },
			modelViewMatrixRTE: { value: new E() },
			u_rteOne: v
		}, n.depthTest = !0, n.depthWrite = !0, n.side = Ze, Ee(n), n.defines = n.defines ?? {}, n.defines.USE_SELECTIVE_EFFECT = 1, n.uniforms.uEffectIdsMask = this._sharedSEUniforms.uEffectIdsMask, n.uniforms.uEmissiveColor = this._sharedSEUniforms.uEmissiveColor, n.uniforms.uEmissiveIntensity = this._sharedSEUniforms.uEmissiveIntensity, n;
	}
	updateBoundingSphere() {
		let e = new Ie();
		this._config.forEach((t) => {
			for (let n = 0; n < t.geometry.length && !(n + 1 >= t.geometry.length); n += 2) {
				let r = t.geometry[n], i = t.geometry[n + 1], a = ve({
					lat: r.lat,
					lng: r.lng,
					height: t.height
				}), o = ve({
					lat: i.lat,
					lng: i.lng,
					height: t.height
				});
				e.expandByPoint(a), e.expandByPoint(o);
				let s = (r.lng + i.lng) / 2, c = (r.lat + i.lat) / 2, l = a.distanceTo(o), u = t.height + l * t.arcHeightScale;
				e.expandByPoint(ve({
					lat: c,
					lng: s,
					height: u
				}));
			}
		}), this._subMeshes.forEach((t) => {
			t.geometry.boundingBox = e.clone(), t.geometry.boundingSphere = new Zt(), t.geometry.boundingBox.getBoundingSphere(t.geometry.boundingSphere), t.geometry.computeBoundingBox = () => {}, t.geometry.computeBoundingSphere = () => {};
		});
	}
	updateConfig(e) {
		let t = /* @__PURE__ */ new Set(), n = /* @__PURE__ */ new Set(), r = /* @__PURE__ */ new Set(), i = /* @__PURE__ */ new Set(), a = /* @__PURE__ */ new Set(), o = /* @__PURE__ */ new Set();
		e.forEach((e, s) => {
			if (!this._config[s]) this._config[s] = {
				...U,
				...e
			}, r.add(s), t.add(s);
			else {
				let c = !1, l = !1, u = !1, d = !1, f = !1;
				if (e.segments !== void 0 && e.segments !== this._config[s].segments && (this._config[s].segments = e.segments, l = !0, c = !0), e.geometry !== void 0) {
					if (e.geometry.length !== this._config[s].geometry.length) this._config[s].geometry = e.geometry, l = !0, c = !0;
					else for (let t = 0; t < e.geometry.length; t++) (e.geometry[t].lng !== this._config[s].geometry[t].lng || e.geometry[t].lat !== this._config[s].geometry[t].lat) && (this._config[s].geometry[t].lng = e.geometry[t].lng, this._config[s].geometry[t].lat = e.geometry[t].lat, u = !0, c = !0);
				}
				e.arcHeightScale !== void 0 && e.arcHeightScale !== this._config[s].arcHeightScale && (this._config[s].arcHeightScale = e.arcHeightScale, d = !0, c = !0), e.height !== void 0 && e.height !== this._config[s].height && (this._config[s].height = e.height, f = !0, c = !0), e.thickness !== void 0 && e.thickness !== this._config[s].thickness && (this._config[s].thickness = e.thickness, f = !0, c = !0), e.transparent !== void 0 && e.transparent !== this._config[s].transparent && (this._config[s].transparent = e.transparent, n.add(s)), e.opacity !== void 0 && e.opacity !== this._config[s].opacity && (this._config[s].opacity = e.opacity, f = !0, c = !0), e.srcColor !== void 0 && e.srcColor.toHex() !== this._config[s].srcColor.toHex() && (this._config[s].srcColor = e.srcColor, f = !0, c = !0), e.tgtColor !== void 0 && e.tgtColor.toHex() !== this._config[s].tgtColor.toHex() && (this._config[s].tgtColor = e.tgtColor, f = !0, c = !0), e.gradation !== void 0 && e.gradation !== this._config[s].gradation && (this._config[s].gradation = e.gradation, f = !0, c = !0), e.dashed !== void 0 && e.dashed !== this._config[s].dashed && (this._config[s].dashed = e.dashed, f = !0, c = !0), e.dashSize !== void 0 && e.dashSize !== this._config[s].dashSize && (this._config[s].dashSize = e.dashSize, f = !0, c = !0), e.gapSize !== void 0 && e.gapSize !== this._config[s].gapSize && (this._config[s].gapSize = e.gapSize, f = !0, c = !0), e.dashOffset !== void 0 && e.dashOffset !== this._config[s].dashOffset && (this._config[s].dashOffset = e.dashOffset, f = !0, c = !0), c && (t.add(s), l ? r.add(s) : u ? i.add(s) : d ? a.add(s) : f && o.add(s));
			}
		}), r.forEach((e) => {
			this._subMeshes[e] && (this._subMeshes[e].geometry.dispose(), this._subMeshes[e].material.dispose(), this.remove(this._subMeshes[e]));
			let t = this.createSubMesh(this._config[e]);
			this._subMeshes[e] = t, this.add(t);
		}), r.size > 0 && this.attachRteCallback(), i.forEach((e) => {
			this._subMeshes[e] && this.fillSingleConfigInstanceData(this._config[e], this._subMeshes[e].geometry);
		}), a.forEach((e) => {
			this._subMeshes[e] && this.updateArcHeightAndLength(this._config[e], this._subMeshes[e].geometry);
		}), o.forEach((e) => {
			this._subMeshes[e] && this.updateArcParameters(this._config[e], this._subMeshes[e].geometry);
		}), n.forEach((e) => {
			!r.has(e) && this._subMeshes[e] && this.updateMaterials(this._config[e], this._subMeshes[e]);
		}), (r.size > 0 || a.size > 0) && this.updateBoundingSphere();
	}
	updateMaterials(e, t) {
		t.material.transparent !== e.transparent && (t.material.transparent = e.transparent);
	}
	onResize(e, t) {
		this._subMeshes.forEach((n) => {
			n.material.uniforms?.uViewport.value.set(e, t);
		});
	}
	updateEffectIdsMask(e) {
		this._sharedSEUniforms.uEffectIdsMask.value = e;
	}
	updateEmissive(e, t) {
		this._sharedSEUniforms.uEmissiveColor.value.setHex(e), this._sharedSEUniforms.uEmissiveIntensity.value = t;
	}
	dispose() {
		this._subMeshes.forEach((e) => {
			e.geometry.dispose(), e.material.dispose();
		});
	}
}, Uc = class extends p {
	config;
	pickWrapper;
	constructor(e, t, n) {
		super(e, t, n), this.config = n;
	}
	get batchId() {
		return this.pickWrapper?.batchId;
	}
	getPassKey() {
		return "mrt";
	}
	createMesh() {
		let e = [];
		if (this.config.arcLines) {
			let t = Array.isArray(this.config.arcLines) ? this.config.arcLines : [this.config.arcLines];
			for (let n of t) e.push({
				thickness: n.thickness ?? U.thickness,
				transparent: n.transparent ?? U.transparent,
				opacity: n.opacity ?? U.opacity,
				segments: n.segments ?? U.segments,
				srcColor: n.srcColor ?? U.srcColor,
				tgtColor: n.tgtColor ?? U.tgtColor,
				height: n.height ?? U.height,
				arcHeightScale: n.arcHeightScale ?? U.arcHeightScale,
				gradation: n.gradation ?? U.gradation,
				dashed: n.dashed ?? U.dashed,
				dashSize: n.dashSize ?? U.dashSize,
				gapSize: n.gapSize ?? U.gapSize,
				dashOffset: n.dashOffset ?? U.dashOffset,
				geometry: n.geometry ?? U.geometry
			});
		}
		let t = new Hc(e);
		return t.updateEmissive(this.config.emissiveColor?.toHex() ?? 0, this.config.emissiveIntensity ?? 0), this.config.pickable && (this.pickWrapper = new g(t, this.ctx), this.ctx.registerPickableMesh(this.id, this.pickWrapper)), t;
	}
	onUpdateConfig(e) {
		if (e.arcLines && this._instance) {
			let t = Array.isArray(e.arcLines) ? e.arcLines : [e.arcLines], n = Array.isArray(this.config.arcLines) ? [...this.config.arcLines] : this.config.arcLines ? [this.config.arcLines] : [];
			t.forEach((e, t) => {
				n[t] ? Object.assign(n[t], e) : n[t] = { ...e };
			}), this.config.arcLines = n, this._instance.updateConfig(t), this.pickWrapper?.syncMaterials(), this.emit("needsUpdate");
		}
		this._instance && (e.emissiveColor !== void 0 && (this.config.emissiveColor = e.emissiveColor), e.emissiveIntensity !== void 0 && (this.config.emissiveIntensity = e.emissiveIntensity), (e.emissiveColor !== void 0 || e.emissiveIntensity !== void 0) && this._instance.updateEmissive(this.config.emissiveColor?.toHex() ?? 0, this.config.emissiveIntensity ?? 0)), super.onUpdateConfig(e);
	}
	updateEffectIdsMask() {
		let e = this.ctx.selectiveEffectRegistry;
		if (!e || !this._instance) return;
		let t = this._effectIds.length > 0 ? e.computeMask(this._effectIds) : 0;
		this._instance.updateEffectIdsMask(t);
	}
	onResize(e, t) {
		this._instance?.onResize(e, t);
	}
	disposeMesh() {
		this._instance &&= (this._instance.dispose(), void 0);
	}
	onDestroy() {
		this.pickWrapper &&= (this.ctx.unregisterPickableMesh(this.id), void 0), super.onDestroy();
	}
}, Wc = new Ie(), Gc = new j(), Kc = class extends ct {
	constructor() {
		super(), this.isLineSegmentsGeometry = !0, this.type = "LineSegmentsGeometry", this.setIndex([
			0,
			2,
			1,
			2,
			3,
			1,
			2,
			4,
			3,
			4,
			5,
			3,
			4,
			6,
			5,
			6,
			7,
			5
		]), this.setAttribute("position", new tt([
			-1,
			2,
			0,
			1,
			2,
			0,
			-1,
			1,
			0,
			1,
			1,
			0,
			-1,
			0,
			0,
			1,
			0,
			0,
			-1,
			-1,
			0,
			1,
			-1,
			0
		], 3)), this.setAttribute("uv", new tt([
			-1,
			2,
			1,
			2,
			-1,
			1,
			1,
			1,
			-1,
			-1,
			1,
			-1,
			-1,
			-2,
			1,
			-2
		], 2));
	}
	applyMatrix4(e) {
		let t = this.attributes.instanceStart, n = this.attributes.instanceEnd;
		return t !== void 0 && (t.applyMatrix4(e), n.applyMatrix4(e), t.needsUpdate = !0), this.boundingBox !== null && this.computeBoundingBox(), this.boundingSphere !== null && this.computeBoundingSphere(), this;
	}
	setPositions(e) {
		let t;
		e instanceof Float32Array ? t = e : Array.isArray(e) && (t = new Float32Array(e));
		let n = new lt(t, 6, 1);
		return this.setAttribute("instanceStart", new pt(n, 3, 0)), this.setAttribute("instanceEnd", new pt(n, 3, 3)), this.instanceCount = this.attributes.instanceStart.count, this.computeBoundingBox(), this.computeBoundingSphere(), this;
	}
	setColors(e) {
		let t;
		e instanceof Float32Array ? t = e : Array.isArray(e) && (t = new Float32Array(e));
		let n = new lt(t, 6, 1);
		return this.setAttribute("instanceColorStart", new pt(n, 3, 0)), this.setAttribute("instanceColorEnd", new pt(n, 3, 3)), this;
	}
	fromWireframeGeometry(e) {
		return this.setPositions(e.attributes.position.array), this;
	}
	fromEdgesGeometry(e) {
		return this.setPositions(e.attributes.position.array), this;
	}
	fromMesh(e) {
		return this.fromWireframeGeometry(new dn(e.geometry)), this;
	}
	fromLineSegments(e) {
		let t = e.geometry;
		return this.setPositions(t.attributes.position.array), this;
	}
	computeBoundingBox() {
		this.boundingBox === null && (this.boundingBox = new Ie());
		let e = this.attributes.instanceStart, t = this.attributes.instanceEnd;
		e !== void 0 && t !== void 0 && (this.boundingBox.setFromBufferAttribute(e), Wc.setFromBufferAttribute(t), this.boundingBox.union(Wc));
	}
	computeBoundingSphere() {
		this.boundingSphere === null && (this.boundingSphere = new Zt()), this.boundingBox === null && this.computeBoundingBox();
		let e = this.attributes.instanceStart, t = this.attributes.instanceEnd;
		if (e !== void 0 && t !== void 0) {
			let n = this.boundingSphere.center;
			this.boundingBox.getCenter(n);
			let r = 0;
			for (let i = 0, a = e.count; i < a; i++) Gc.fromBufferAttribute(e, i), r = Math.max(r, n.distanceToSquared(Gc)), Gc.fromBufferAttribute(t, i), r = Math.max(r, n.distanceToSquared(Gc));
			this.boundingSphere.radius = Math.sqrt(r), isNaN(this.boundingSphere.radius) && console.error("THREE.LineSegmentsGeometry.computeBoundingSphere(): Computed radius is NaN. The instanced position data is likely to have NaN values.", this);
		}
	}
	toJSON() {}
};
an.line = {
	worldUnits: { value: 1 },
	linewidth: { value: 1 },
	resolution: { value: new A() },
	dashOffset: { value: 0 },
	dashScale: { value: 1 },
	dashSize: { value: 1 },
	gapSize: { value: 1 }
}, Jt.line = {
	uniforms: on.merge([
		an.common,
		an.fog,
		an.line
	]),
	vertexShader: "\n		#include <common>\n		#include <color_pars_vertex>\n		#include <fog_pars_vertex>\n		#include <logdepthbuf_pars_vertex>\n		#include <clipping_planes_pars_vertex>\n\n		uniform float linewidth;\n		uniform vec2 resolution;\n\n		attribute vec3 instanceStart;\n		attribute vec3 instanceEnd;\n\n		attribute vec3 instanceColorStart;\n		attribute vec3 instanceColorEnd;\n\n		#ifdef WORLD_UNITS\n\n			varying vec4 worldPos;\n			varying vec3 worldStart;\n			varying vec3 worldEnd;\n\n			#ifdef USE_DASH\n\n				varying vec2 vUv;\n\n			#endif\n\n		#else\n\n			varying vec2 vUv;\n\n		#endif\n\n		#ifdef USE_DASH\n\n			uniform float dashScale;\n			attribute float instanceDistanceStart;\n			attribute float instanceDistanceEnd;\n			varying float vLineDistance;\n\n		#endif\n\n		float trimSegmentAlpha( const in vec4 start, const in vec4 end ) {\n\n			// compute the interpolation factor needed to trim the segment so it terminates\n			// between the camera plane and the near plane\n\n			// conservative estimate of the near plane\n			float a = projectionMatrix[ 2 ][ 2 ]; // 3nd entry in 3th column\n			float b = projectionMatrix[ 3 ][ 2 ]; // 3nd entry in 4th column\n\n			// we need different nearEstimate formula for reversed and default depth buffer\n			// a is positive with a reversed depth buffer so it can be used for controlling the code flow\n			float nearEstimate = ( a > 0.0 ) ? ( - b / ( a + 1.0 ) ) : ( - 0.5 * b / a );\n\n			return ( nearEstimate - start.z ) / ( end.z - start.z );\n\n		}\n\n		void main() {\n\n			#ifdef USE_COLOR\n\n				vColor.xyz = ( position.y < 0.5 ) ? instanceColorStart : instanceColorEnd;\n\n			#endif\n\n			float aspect = resolution.x / resolution.y;\n\n			// camera space\n			vec4 start = modelViewMatrix * vec4( instanceStart, 1.0 );\n			vec4 end = modelViewMatrix * vec4( instanceEnd, 1.0 );\n\n			#ifdef USE_DASH\n\n				float lineDistanceStart = dashScale * instanceDistanceStart;\n				float lineDistanceEnd = dashScale * instanceDistanceEnd;\n\n			#endif\n\n			#ifdef WORLD_UNITS\n\n				worldStart = start.xyz;\n				worldEnd = end.xyz;\n\n			#else\n\n				vUv = uv;\n\n			#endif\n\n			// special case for perspective projection, and segments that terminate either in, or behind, the camera plane\n			// clearly the gpu firmware has a way of addressing this issue when projecting into ndc space\n			// but we need to perform ndc-space calculations in the shader, so we must address this issue directly\n			// perhaps there is a more elegant solution -- WestLangley\n\n			bool perspective = ( projectionMatrix[ 2 ][ 3 ] == - 1.0 ); // 4th entry in the 3rd column\n\n			if ( perspective ) {\n\n				if ( start.z < 0.0 && end.z >= 0.0 ) {\n\n					float alpha = trimSegmentAlpha( start, end );\n					end.xyz = mix( start.xyz, end.xyz, alpha );\n\n					#ifdef USE_DASH\n\n						lineDistanceEnd = mix( lineDistanceStart, lineDistanceEnd, alpha );\n\n					#endif\n\n				} else if ( end.z < 0.0 && start.z >= 0.0 ) {\n\n					float alpha = trimSegmentAlpha( end, start );\n					start.xyz = mix( end.xyz, start.xyz, alpha );\n\n					#ifdef USE_DASH\n\n						lineDistanceStart = mix( lineDistanceEnd, lineDistanceStart, alpha );\n\n					#endif\n\n				}\n\n			}\n\n			#ifdef USE_DASH\n\n				vLineDistance = ( position.y < 0.5 ) ? lineDistanceStart : lineDistanceEnd;\n				vUv = uv;\n\n			#endif\n\n			// clip space\n			vec4 clipStart = projectionMatrix * start;\n			vec4 clipEnd = projectionMatrix * end;\n\n			// ndc space\n			vec3 ndcStart = clipStart.xyz / clipStart.w;\n			vec3 ndcEnd = clipEnd.xyz / clipEnd.w;\n\n			// direction\n			vec2 dir = ndcEnd.xy - ndcStart.xy;\n\n			// account for clip-space aspect ratio\n			dir.x *= aspect;\n			dir = normalize( dir );\n\n			#ifdef WORLD_UNITS\n\n				vec3 worldDir = normalize( end.xyz - start.xyz );\n				vec3 tmpFwd = normalize( mix( start.xyz, end.xyz, 0.5 ) );\n				vec3 worldUp = normalize( cross( worldDir, tmpFwd ) );\n				vec3 worldFwd = cross( worldDir, worldUp );\n				worldPos = position.y < 0.5 ? start: end;\n\n				// height offset\n				float hw = linewidth * 0.5;\n				worldPos.xyz += position.x < 0.0 ? hw * worldUp : - hw * worldUp;\n\n				// don't extend the line if we're rendering dashes because we\n				// won't be rendering the endcaps\n				#ifndef USE_DASH\n\n					// cap extension\n					worldPos.xyz += position.y < 0.5 ? - hw * worldDir : hw * worldDir;\n\n					// add width to the box\n					worldPos.xyz += worldFwd * hw;\n\n					// endcaps\n					if ( position.y > 1.0 || position.y < 0.0 ) {\n\n						worldPos.xyz -= worldFwd * 2.0 * hw;\n\n					}\n\n				#endif\n\n				// project the worldpos\n				vec4 clip = projectionMatrix * worldPos;\n\n				// shift the depth of the projected points so the line\n				// segments overlap neatly\n				vec3 clipPose = ( position.y < 0.5 ) ? ndcStart : ndcEnd;\n				clip.z = clipPose.z * clip.w;\n\n			#else\n\n				vec2 offset = vec2( dir.y, - dir.x );\n				// undo aspect ratio adjustment\n				dir.x /= aspect;\n				offset.x /= aspect;\n\n				// sign flip\n				if ( position.x < 0.0 ) offset *= - 1.0;\n\n				// endcaps\n				if ( position.y < 0.0 ) {\n\n					offset += - dir;\n\n				} else if ( position.y > 1.0 ) {\n\n					offset += dir;\n\n				}\n\n				// adjust for linewidth\n				offset *= linewidth;\n\n				// adjust for clip-space to screen-space conversion // maybe resolution should be based on viewport ...\n				offset /= resolution.y;\n\n				// select end\n				vec4 clip = ( position.y < 0.5 ) ? clipStart : clipEnd;\n\n				// back to clip space\n				offset *= clip.w;\n\n				clip.xy += offset;\n\n			#endif\n\n			gl_Position = clip;\n\n			vec4 mvPosition = ( position.y < 0.5 ) ? start : end; // this is an approximation\n\n			#include <logdepthbuf_vertex>\n			#include <clipping_planes_vertex>\n			#include <fog_vertex>\n\n		}\n		",
	fragmentShader: "\n		uniform vec3 diffuse;\n		uniform float opacity;\n		uniform float linewidth;\n\n		#ifdef USE_DASH\n\n			uniform float dashOffset;\n			uniform float dashSize;\n			uniform float gapSize;\n\n		#endif\n\n		varying float vLineDistance;\n\n		#ifdef WORLD_UNITS\n\n			varying vec4 worldPos;\n			varying vec3 worldStart;\n			varying vec3 worldEnd;\n\n			#ifdef USE_DASH\n\n				varying vec2 vUv;\n\n			#endif\n\n		#else\n\n			varying vec2 vUv;\n\n		#endif\n\n		#include <common>\n		#include <color_pars_fragment>\n		#include <fog_pars_fragment>\n		#include <logdepthbuf_pars_fragment>\n		#include <clipping_planes_pars_fragment>\n\n		vec2 closestLineToLine(vec3 p1, vec3 p2, vec3 p3, vec3 p4) {\n\n			float mua;\n			float mub;\n\n			vec3 p13 = p1 - p3;\n			vec3 p43 = p4 - p3;\n\n			vec3 p21 = p2 - p1;\n\n			float d1343 = dot( p13, p43 );\n			float d4321 = dot( p43, p21 );\n			float d1321 = dot( p13, p21 );\n			float d4343 = dot( p43, p43 );\n			float d2121 = dot( p21, p21 );\n\n			float denom = d2121 * d4343 - d4321 * d4321;\n\n			float numer = d1343 * d4321 - d1321 * d4343;\n\n			mua = numer / denom;\n			mua = clamp( mua, 0.0, 1.0 );\n			mub = ( d1343 + d4321 * ( mua ) ) / d4343;\n			mub = clamp( mub, 0.0, 1.0 );\n\n			return vec2( mua, mub );\n\n		}\n\n		void main() {\n\n			float alpha = opacity;\n			vec4 diffuseColor = vec4( diffuse, alpha );\n\n			#include <clipping_planes_fragment>\n\n			#ifdef USE_DASH\n\n				if ( vUv.y < - 1.0 || vUv.y > 1.0 ) discard; // discard endcaps\n\n				if ( mod( vLineDistance + dashOffset, dashSize + gapSize ) > dashSize ) discard; // todo - FIX\n\n			#endif\n\n			#ifdef WORLD_UNITS\n\n				// Find the closest points on the view ray and the line segment\n				vec3 rayEnd = normalize( worldPos.xyz ) * 1e5;\n				vec3 lineDir = worldEnd - worldStart;\n				vec2 params = closestLineToLine( worldStart, worldEnd, vec3( 0.0, 0.0, 0.0 ), rayEnd );\n\n				vec3 p1 = worldStart + lineDir * params.x;\n				vec3 p2 = rayEnd * params.y;\n				vec3 delta = p1 - p2;\n				float len = length( delta );\n				float norm = len / linewidth;\n\n				#ifndef USE_DASH\n\n					#ifdef USE_ALPHA_TO_COVERAGE\n\n						float dnorm = fwidth( norm );\n						alpha = 1.0 - smoothstep( 0.5 - dnorm, 0.5 + dnorm, norm );\n\n					#else\n\n						if ( norm > 0.5 ) {\n\n							discard;\n\n						}\n\n					#endif\n\n				#endif\n\n			#else\n\n				#ifdef USE_ALPHA_TO_COVERAGE\n\n					// artifacts appear on some hardware if a derivative is taken within a conditional\n					float a = vUv.x;\n					float b = ( vUv.y > 0.0 ) ? vUv.y - 1.0 : vUv.y + 1.0;\n					float len2 = a * a + b * b;\n					float dlen = fwidth( len2 );\n\n					if ( abs( vUv.y ) > 1.0 ) {\n\n						alpha = 1.0 - smoothstep( 1.0 - dlen, 1.0 + dlen, len2 );\n\n					}\n\n				#else\n\n					if ( abs( vUv.y ) > 1.0 ) {\n\n						float a = vUv.x;\n						float b = ( vUv.y > 0.0 ) ? vUv.y - 1.0 : vUv.y + 1.0;\n						float len2 = a * a + b * b;\n\n						if ( len2 > 1.0 ) discard;\n\n					}\n\n				#endif\n\n			#endif\n\n			#include <logdepthbuf_fragment>\n			#include <color_fragment>\n\n			gl_FragColor = vec4( diffuseColor.rgb, alpha );\n\n			#include <tonemapping_fragment>\n			#include <colorspace_fragment>\n			#include <fog_fragment>\n			#include <premultiplied_alpha_fragment>\n\n		}\n		"
};
var qc = class extends O {
	constructor(e) {
		super({
			type: "LineMaterial",
			uniforms: on.clone(Jt.line.uniforms),
			vertexShader: Jt.line.vertexShader,
			fragmentShader: Jt.line.fragmentShader,
			clipping: !0
		}), this.isLineMaterial = !0, this.setValues(e);
	}
	get color() {
		return this.uniforms.diffuse.value;
	}
	set color(e) {
		this.uniforms.diffuse.value = e;
	}
	get worldUnits() {
		return "WORLD_UNITS" in this.defines;
	}
	set worldUnits(e) {
		e === !0 !== this.worldUnits && (this.needsUpdate = !0), e === !0 ? this.defines.WORLD_UNITS = "" : delete this.defines.WORLD_UNITS;
	}
	get linewidth() {
		return this.uniforms.linewidth.value;
	}
	set linewidth(e) {
		this.uniforms.linewidth && (this.uniforms.linewidth.value = e);
	}
	get dashed() {
		return "USE_DASH" in this.defines;
	}
	set dashed(e) {
		e === !0 !== this.dashed && (this.needsUpdate = !0), e === !0 ? this.defines.USE_DASH = "" : delete this.defines.USE_DASH;
	}
	get dashScale() {
		return this.uniforms.dashScale.value;
	}
	set dashScale(e) {
		this.uniforms.dashScale.value = e;
	}
	get dashSize() {
		return this.uniforms.dashSize.value;
	}
	set dashSize(e) {
		this.uniforms.dashSize.value = e;
	}
	get dashOffset() {
		return this.uniforms.dashOffset.value;
	}
	set dashOffset(e) {
		this.uniforms.dashOffset.value = e;
	}
	get gapSize() {
		return this.uniforms.gapSize.value;
	}
	set gapSize(e) {
		this.uniforms.gapSize.value = e;
	}
	get opacity() {
		return this.uniforms.opacity.value;
	}
	set opacity(e) {
		this.uniforms && (this.uniforms.opacity.value = e);
	}
	get resolution() {
		return this.uniforms.resolution.value;
	}
	set resolution(e) {
		this.uniforms.resolution.value.copy(e);
	}
	get alphaToCoverage() {
		return "USE_ALPHA_TO_COVERAGE" in this.defines;
	}
	set alphaToCoverage(e) {
		this.defines && (e === !0 !== this.alphaToCoverage && (this.needsUpdate = !0), e === !0 ? this.defines.USE_ALPHA_TO_COVERAGE = "" : delete this.defines.USE_ALPHA_TO_COVERAGE);
	}
}, Jc = new M(), Yc = new j(), Xc = new j(), W = new M(), G = new M(), Zc = new M(), Qc = new j(), $c = new E(), K = new ht(), el = new j(), tl = new Ie(), nl = new Zt(), rl = new M(), il, al;
function ol(e, t, n) {
	return rl.set(0, 0, -t, 1).applyMatrix4(e.projectionMatrix), rl.multiplyScalar(1 / rl.w), rl.x = al / n.width, rl.y = al / n.height, rl.applyMatrix4(e.projectionMatrixInverse), rl.multiplyScalar(1 / rl.w), Math.abs(Math.max(rl.x, rl.y));
}
function sl(e, t) {
	let n = e.matrixWorld, r = e.geometry, i = r.attributes.instanceStart, a = r.attributes.instanceEnd, o = Math.min(r.instanceCount, i.count);
	for (let r = 0, s = o; r < s; r++) {
		K.start.fromBufferAttribute(i, r), K.end.fromBufferAttribute(a, r), K.applyMatrix4(n);
		let o = new j(), s = new j();
		il.distanceSqToSegment(K.start, K.end, s, o), s.distanceTo(o) < al * .5 && t.push({
			point: s,
			pointOnLine: o,
			distance: il.origin.distanceTo(s),
			object: e,
			face: null,
			faceIndex: r,
			uv: null,
			uv1: null
		});
	}
}
function cl(e, t, n) {
	let r = t.projectionMatrix, i = e.material.resolution, a = e.matrixWorld, o = e.geometry, s = o.attributes.instanceStart, c = o.attributes.instanceEnd, l = Math.min(o.instanceCount, s.count), u = -t.near;
	il.at(1, Zc), Zc.w = 1, Zc.applyMatrix4(t.matrixWorldInverse), Zc.applyMatrix4(r), Zc.multiplyScalar(1 / Zc.w), Zc.x *= i.x / 2, Zc.y *= i.y / 2, Zc.z = 0, Qc.copy(Zc), $c.multiplyMatrices(t.matrixWorldInverse, a);
	for (let t = 0, o = l; t < o; t++) {
		if (W.fromBufferAttribute(s, t), G.fromBufferAttribute(c, t), W.w = 1, G.w = 1, W.applyMatrix4($c), G.applyMatrix4($c), W.z > u && G.z > u) continue;
		if (W.z > u) {
			let e = W.z - G.z, t = (W.z - u) / e;
			W.lerp(G, t);
		} else if (G.z > u) {
			let e = G.z - W.z, t = (G.z - u) / e;
			G.lerp(W, t);
		}
		W.applyMatrix4(r), G.applyMatrix4(r), W.multiplyScalar(1 / W.w), G.multiplyScalar(1 / G.w), W.x *= i.x / 2, W.y *= i.y / 2, G.x *= i.x / 2, G.y *= i.y / 2, K.start.copy(W), K.start.z = 0, K.end.copy(G), K.end.z = 0;
		let o = K.closestPointToPointParameter(Qc, !0);
		K.at(o, el);
		let l = Tt.lerp(W.z, G.z, o), d = l >= -1 && l <= 1, f = Qc.distanceTo(el) < al * .5;
		if (d && f) {
			K.start.fromBufferAttribute(s, t), K.end.fromBufferAttribute(c, t), K.start.applyMatrix4(a), K.end.applyMatrix4(a);
			let r = new j(), i = new j();
			il.distanceSqToSegment(K.start, K.end, i, r), n.push({
				point: i,
				pointOnLine: r,
				distance: il.origin.distanceTo(i),
				object: e,
				face: null,
				faceIndex: t,
				uv: null,
				uv1: null
			});
		}
	}
}
var ll = class extends D {
	constructor(e = new Kc(), t = new qc({ color: Math.random() * 16777215 })) {
		super(e, t), this.isLineSegments2 = !0, this.type = "LineSegments2";
	}
	computeLineDistances() {
		let e = this.geometry, t = e.attributes.instanceStart, n = e.attributes.instanceEnd, r = new Float32Array(2 * t.count);
		for (let e = 0, i = 0, a = t.count; e < a; e++, i += 2) Yc.fromBufferAttribute(t, e), Xc.fromBufferAttribute(n, e), r[i] = i === 0 ? 0 : r[i - 1], r[i + 1] = r[i] + Yc.distanceTo(Xc);
		let i = new lt(r, 2, 1);
		return e.setAttribute("instanceDistanceStart", new pt(i, 1, 0)), e.setAttribute("instanceDistanceEnd", new pt(i, 1, 1)), this;
	}
	raycast(e, t) {
		let n = this.material.worldUnits, r = e.camera;
		if (r === null && !n && console.error("LineSegments2: \"Raycaster.camera\" needs to be set in order to raycast against LineSegments2 while worldUnits is set to false."), n === !1 && (this.material.resolution.x === 0 || this.material.resolution.y === 0)) return;
		let i = e.params.Line2 === void 0 ? 0 : e.params.Line2.threshold || 0;
		il = e.ray;
		let a = this.matrixWorld, o = this.geometry, s = this.material;
		al = s.linewidth + i, o.boundingSphere === null && o.computeBoundingSphere(), nl.copy(o.boundingSphere).applyMatrix4(a);
		let c;
		if (c = n ? al * .5 : ol(r, Math.max(r.near, nl.distanceToPoint(il.origin)), s.resolution), nl.radius += c, il.intersectsSphere(nl) === !1) return;
		o.boundingBox === null && o.computeBoundingBox(), tl.copy(o.boundingBox).applyMatrix4(a);
		let l;
		l = n ? al * .5 : ol(r, Math.max(r.near, tl.distanceToPoint(il.origin)), s.resolution), tl.expandByScalar(l), il.intersectsBox(tl) !== !1 && (n ? sl(this, t) : cl(this, r, t));
	}
	onBeforeRender(e) {
		let t = this.material.uniforms;
		t && t.resolution && (e.getViewport(Jc), this.material.uniforms.resolution.value.set(Jc.z, Jc.w));
	}
}, ul = class extends Kc {
	constructor() {
		super(), this.isLineGeometry = !0, this.type = "LineGeometry";
	}
	setPositions(e) {
		let t = e.length - 3, n = new Float32Array(2 * t);
		for (let r = 0; r < t; r += 3) n[2 * r] = e[r], n[2 * r + 1] = e[r + 1], n[2 * r + 2] = e[r + 2], n[2 * r + 3] = e[r + 3], n[2 * r + 4] = e[r + 4], n[2 * r + 5] = e[r + 5];
		return super.setPositions(n), this;
	}
	setColors(e) {
		let t = e.length - 3, n = new Float32Array(2 * t);
		for (let r = 0; r < t; r += 3) n[2 * r] = e[r], n[2 * r + 1] = e[r + 1], n[2 * r + 2] = e[r + 2], n[2 * r + 3] = e[r + 3], n[2 * r + 4] = e[r + 4], n[2 * r + 5] = e[r + 5];
		return super.setColors(n), this;
	}
	setFromPoints(e) {
		let t = e.length - 1, n = new Float32Array(6 * t);
		for (let r = 0; r < t; r++) n[6 * r] = e[r].x, n[6 * r + 1] = e[r].y, n[6 * r + 2] = e[r].z || 0, n[6 * r + 3] = e[r + 1].x, n[6 * r + 4] = e[r + 1].y, n[6 * r + 5] = e[r + 1].z || 0;
		return super.setPositions(n), this;
	}
	fromLine(e) {
		let t = e.geometry;
		return this.setPositions(t.attributes.position.array), this;
	}
}, dl = class extends ll {
	constructor(e = new ul(), t = new qc({ color: Math.random() * 16777215 })) {
		super(e, t), this.isLine2 = !0, this.type = "Line2";
	}
}, fl = "#ifdef USE_BATCH_EMISSIVE\nin vec3 nvr_vEmissive;\n#define NVR_BATCH_EMISSIVE_OR(fallback) nvr_vEmissive\n#else\n#define NVR_BATCH_EMISSIVE_OR(fallback) (fallback)\n#endif\n#ifndef USE_SHADOWMAP_DEPTH\n\n#ifdef GBUFFER_NORMAL_LOCATION\nlayout(location = GBUFFER_NORMAL_LOCATION) out vec4 normalBuffer;\n\n#ifdef NVR_BLENDED\n#define GBUFFER_NORMAL_ALPHA(roughnessValue) 1.0\n#else\n#define GBUFFER_NORMAL_ALPHA(roughnessValue) (roughnessValue)\n#endif\n\n#define GBUFFER_WRITE_NORMAL(n, blue, roughnessValue) normalBuffer = vec4(packNormalToVec2(n), blue, GBUFFER_NORMAL_ALPHA(roughnessValue));\n#else\n#define GBUFFER_WRITE_NORMAL(n, blue, roughnessValue)\n#endif\n\n#ifdef USE_GBUFFER_SELECTIVE_EFFECT\nlayout(location = GBUFFER_EFFECT_ID_LOCATION) out vec4 effectIdBuffer;\n\n#define GBUFFER_WRITE_EFFECT_ID(mask) effectIdBuffer = vec4(mask, 0.0, 0.0, 1.0);\n\n#define GBUFFER_WRITE_EFFECT_ID_ZERO effectIdBuffer = vec4(0.0);\n#else\n#define GBUFFER_WRITE_EFFECT_ID(mask)\n#define GBUFFER_WRITE_EFFECT_ID_ZERO\n#endif\n\n#ifdef USE_GBUFFER_EMISSIVE\nlayout(location = GBUFFER_EMISSIVE_LOCATION) out vec4 emissiveBuffer;\n\n#define GBUFFER_WRITE_EMISSIVE(emissiveRgb) emissiveBuffer = vec4(emissiveRgb, 1.0);\n\n#define GBUFFER_WRITE_EMISSIVE_ZERO emissiveBuffer = vec4(0.0);\n#else\n#define GBUFFER_WRITE_EMISSIVE(emissiveRgb)\n#define GBUFFER_WRITE_EMISSIVE_ZERO\n#endif\n\n#ifdef USE_GBUFFER_SHADOW\nlayout(location = GBUFFER_SHADOW_LOCATION) out vec4 shadowBuffer;\n\nfloat nvr_shadowMask = 1.0;\n\n#if !defined(NVR_LIT) && (defined(NVR_UNLIT) || defined(NVR_UNLIT_SCENE))\n#define NVR_GBUFFER_UNLIT_FLAG 1.0\n#else\n#define NVR_GBUFFER_UNLIT_FLAG 0.0\n#endif\n\n#define GBUFFER_WRITE_SHADOW shadowBuffer = vec4(1.0 - nvr_shadowMask, NVR_GBUFFER_UNLIT_FLAG, 0.0, 1.0);\n\n#define GBUFFER_WRITE_SHADOW_ZERO shadowBuffer = vec4(0.0);\n#else\n#define GBUFFER_WRITE_SHADOW\n#define GBUFFER_WRITE_SHADOW_ZERO\n#endif\n\n#define GBUFFER_WRITE_EFFECT(mask, emissiveRgb) GBUFFER_WRITE_EFFECT_ID(mask) GBUFFER_WRITE_EMISSIVE(emissiveRgb)\n\n#define GBUFFER_WRITE_EFFECT_ID_ONLY(mask) GBUFFER_WRITE_EFFECT_ID(mask) GBUFFER_WRITE_EMISSIVE_ZERO\n#define GBUFFER_WRITE_EFFECT_ZERO GBUFFER_WRITE_EFFECT_ID_ZERO GBUFFER_WRITE_EMISSIVE_ZERO\n#endif", pl = "uniform vec3 u_cameraPositionHigh;\nuniform vec3 u_cameraPositionLow;\n\nuniform float u_rteOne;\n\nuniform mat4 modelViewMatrixRTE;\n\nattribute vec3 position_3d_high;\nattribute vec3 position_3d_low;", ml = "vec3 highDiff = (position_3d_high - u_cameraPositionHigh) * u_rteOne;\nvec3 lowDiff = position_3d_low - u_cameraPositionLow;\nvec3 transformed = highDiff + lowDiff;\n\nvec3 absTransformed = position_3d_high + position_3d_low;", hl = class extends It {
	pointOpts;
	_rteUniforms = {
		modelViewMatrixRTE: { value: new E() },
		cameraPositionHigh: { value: new j() },
		cameraPositionLow: { value: new j() }
	};
	_identityMatrix = new E();
	constructor(e = {}) {
		let t = new ze(), n = new O();
		super(t, n), this.pointOpts = {
			visible: e.visible ?? !0,
			size: e.size ?? 1,
			color: e.color ?? 16777215
		};
	}
	setPoints(e) {
		this._refreshPoints(e);
	}
	setOptions(e) {
		Object.assign(this.pointOpts, e || {}), this._refreshPointsUniforms(), this.visible = this.pointOpts.visible;
	}
	onBeforeRender(e, t, n) {
		let r = this.material;
		if (!r) return;
		let i = e.getPixelRatio(), a = e.getContext().drawingBufferWidth, o = e.getContext().drawingBufferHeight;
		r.uniforms?.uProjScaleY && (r.uniforms.uProjScaleY.value = n.projectionMatrix.elements[5]), r.uniforms?.uNear && (r.uniforms.uNear.value = n.near), r.uniforms?.uFar && (r.uniforms.uFar.value = n.far), r.uniforms?.uViewport && r.uniforms.uViewport.value.set(a, o), r.uniforms?.dpr && (r.uniforms.dpr.value = i), oe(this._identityMatrix, n.matrixWorldInverse, this._rteUniforms.modelViewMatrixRTE.value);
		let s = ae(n.position, this._identityMatrix);
		this._rteUniforms.cameraPositionHigh.value.copy(s.high), this._rteUniforms.cameraPositionLow.value.copy(s.low);
	}
	dispose() {
		this.geometry?.dispose(), this.material?.dispose();
	}
	_ensurePointsGeometry(e) {
		this.geometry && this.geometry.dispose();
		let t = new ze();
		t.setAttribute("position", new C(new Float32Array(e * 3), 3)), t.setAttribute("position_3d_high", new C(new Float32Array(e * 3), 3)), t.setAttribute("position_3d_low", new C(new Float32Array(e * 3), 3)), this.geometry = t;
	}
	_updatePositionsAttr(e) {
		if (!this.geometry) return;
		let t = this.geometry.getAttribute("position"), n = this.geometry.getAttribute("position_3d_high"), r = this.geometry.getAttribute("position_3d_low"), i = new j(), a = new j();
		for (let o = 0; o < e.length; o++) {
			let s = e[o];
			_e(s, i, a), n.setXYZ(o, i.x, i.y, i.z), r.setXYZ(o, a.x, a.y, a.z), t.setXYZ(o, s.x, s.y, s.z);
		}
		t.needsUpdate = !0, n.needsUpdate = !0, r.needsUpdate = !0;
	}
	_makePointsMat() {
		let e = new O({
			uniforms: {
				dpr: { value: 1 },
				uViewport: { value: new A(0, 0) },
				uColor: { value: new w(this.pointOpts.color) },
				uProjScaleY: { value: 1 },
				uNear: { value: .1 },
				uFar: { value: 1e3 },
				uSize: { value: this.pointOpts.size },
				u_cameraPositionHigh: this._rteUniforms.cameraPositionHigh,
				u_cameraPositionLow: this._rteUniforms.cameraPositionLow,
				modelViewMatrixRTE: this._rteUniforms.modelViewMatrixRTE,
				u_rteOne: v
			},
			vertexShader: `
        precision highp float;
        uniform float dpr;
        uniform float uSize;

        ${pl}

        varying vec3  vCenterView;
        varying float vRadiusPx;

        void main() {
          ${ml}

          vec4 mv = modelViewMatrixRTE * vec4(transformed, 1.0);
          vCenterView = mv.xyz;

          gl_PointSize = uSize * dpr;        // pixel diameter
          vRadiusPx    = 0.5 * uSize * dpr;  // pixel radius for FS

          gl_Position = projectionMatrix * mv;
        }
      `,
			fragmentShader: "\n        precision highp float;\n\n        uniform vec2  uViewport;\n        uniform vec3  uColor;\n        uniform float uProjScaleY;\n        uniform float uNear, uFar;\n\n        varying vec3  vCenterView;\n        varying float vRadiusPx;\n\n        float viewZToDepth(float viewZ, float near, float far){\n          float A = (far + near) / (near - far);\n          float B = (2.0 * far * near) / (near - far);\n          float ndcZ = (A * viewZ + B) / (-viewZ);\n          return 0.5 * ndcZ + 0.5;\n        }\n\n        void main() {\n          // round cutout\n          vec2 corner = gl_PointCoord * 2.0 - 1.0;\n          float rr = dot(corner, corner);\n          if (rr > 1.0) discard;\n\n          // pixel radius -> view-space radius of sphere\n          float Rv = (vRadiusPx * 2.0 / (uProjScaleY * uViewport.y)) * (-vCenterView.z);\n\n          // hemisphere z (unit sphere)\n          float zLocal = sqrt(max(0.0, 1.0 - rr));\n\n          // view-space z at hit point (only z is needed for depth)\n          float Pz = vCenterView.z + zLocal * Rv;\n\n          // write depth\n          #if defined(USE_LOGDEPTHBUF) || defined(USE_LOGARITHMIC_DEPTH_BUFFER)\n            if (vIsPerspective == 0.0) {\n              gl_FragDepth = gl_FragCoord.z;\n            } else {\n              float fragDepth = max(1.0 + -Pz, 1e-6);\n              gl_FragDepth = log2(fragDepth) * logDepthBufFC * 0.5;\n            }\n          #else\n            gl_FragDepth = viewZToDepth(Pz, uNear, uFar);\n          #endif\n\n          // color\n          gl_FragColor = vec4(uColor, 1.0);\n        }\n      ",
			transparent: !1,
			depthTest: !0,
			depthWrite: !0
		});
		return gl(e), e;
	}
	_refreshPoints(e) {
		if (!e.length) return;
		this._ensurePointsGeometry(e.length), this._updatePositionsAttr(e), this.material && this.material.dispose();
		let t = this._makePointsMat();
		this.material = t, this.visible = this.pointOpts.visible;
	}
	_refreshPointsUniforms() {
		let e = this.material;
		e && (e.uniforms?.uColor && e.uniforms.uColor.value.set(this.pointOpts.color), e.uniforms?.uSize && (e.uniforms.uSize.value = this.pointOpts.size));
	}
};
function gl(e) {
	let t = "#include <common>", n = "#include <logdepthbuf_pars_vertex>", r = "#include <logdepthbuf_vertex>";
	e.vertexShader = `
    ${e.vertexShader.includes(t) ? "" : t}
    ${e.vertexShader.includes(n) ? "" : n}

    ${fe(e.vertexShader).replace(/}\s*$/, `
          ${e.vertexShader.includes(r) ? "" : r}
        }
      `).source}
  `;
	let i = "#include <logdepthbuf_pars_fragment>";
	return e.fragmentShader = `
    ${fl}

    ${jo}

    ${e.fragmentShader.includes(i) ? "" : i}

    ${fe(e.fragmentShader).replace("void main() {", "\n          void main() {\n            // Calculate screen-space normal for Line2 MRT compatibility\n            vec3 fdx = dFdx(gl_FragCoord.xyz);\n            vec3 fdy = dFdy(gl_FragCoord.xyz);\n            vec3 normal = normalize(cross(fdx, fdy));\n\n            // Ensure normal faces camera (positive Z in screen space)\n            if (normal.z < 0.0) normal = -normal;\n        ").replace(/}\s*$/, "\n          #ifndef USE_SHADOWMAP_DEPTH\n            GBUFFER_WRITE_NORMAL(normal, 0.0, 1.0)\n            GBUFFER_WRITE_EFFECT_ZERO\n            GBUFFER_WRITE_SHADOW_ZERO\n          #endif\n        }\n      ").source}
  `, e;
}
//#endregion
//#region src/meshes/smoothLine.ts
var _l = {
	tension: .5,
	closed: !1,
	segments: 1,
	lineWidth: 1,
	dashed: !1,
	dashOffset: 0,
	dashSize: 1e3,
	gapSize: 500,
	color: 16777215,
	showPoints: !0,
	pointSize: 2,
	pointColor: 16777215,
	points: []
}, vl = class extends Mt {
	_config;
	_lineMeshes = [];
	_pointsMeshes = [];
	_pointsData = [];
	_sharedRTEUniforms = {
		modelViewMatrixRTE: { value: new E() },
		cameraPositionHigh: { value: new j() },
		cameraPositionLow: { value: new j() }
	};
	_identityMatrix = new E();
	_tempModelViewMatrix = new E();
	_originalLineOnBeforeRender = null;
	constructor(e = []) {
		super(), this._config = e.map((e) => ({
			..._l,
			...e
		})), !(this._config.length < 1) && (this.updatePointsData(), this.initSubMeshes(), this.setupRTECallback());
	}
	updatePointsData() {
		this._pointsData = this._config.map((e) => e.points.map((e) => ve({
			lat: e.lat,
			lng: e.lng,
			height: e.height || 0
		})));
	}
	initSubMeshes() {
		this._config.forEach((e, t) => {
			if (e.points.length > 1) {
				let n = this.createLineMesh(e, t);
				this._lineMeshes.push(n), this.add(n);
				let r = this.createSpherePointMesh(e, t);
				r && (this._pointsMeshes.push(r), this.add(r));
			}
		});
	}
	createLinePosAttr(e, t) {
		let n = new We(this._pointsData[t], e.closed, "catmullrom", e.tension), r = Math.max(_l.segments, Math.floor(e.segments)), i = n.getPoints((e.points.length - 1) * r);
		e.closed && i.length > 0 && i.push(i[0].clone());
		let a = new Float32Array(i.length * 3), o = new Float32Array(i.length * 3), s = new j(), c = new j();
		for (let e = 0; e < i.length; e++) _e(i[e], s, c), a[3 * e + 0] = s.x, a[3 * e + 1] = s.y, a[3 * e + 2] = s.z, o[3 * e + 0] = c.x, o[3 * e + 1] = c.y, o[3 * e + 2] = c.z;
		return {
			positionsHigh: a,
			positionsLow: o
		};
	}
	createLineMesh(e, t) {
		if (e.points.length < 2) return new dl(new ul(), new qc());
		let { positionsHigh: n, positionsLow: r } = this.createLinePosAttr(e, t), i = new ul(), a = new Float32Array(n.length);
		for (let e = 0; e < n.length; e++) a[e] = n[e] + r[e];
		i.setPositions(a);
		let o = n.length / 3, s = new Float32Array((o - 1) * 3), c = new Float32Array((o - 1) * 3), l = new Float32Array((o - 1) * 3), u = new Float32Array((o - 1) * 3);
		for (let e = 0; e < o - 1; e++) s[e * 3 + 0] = n[e * 3 + 0], s[e * 3 + 1] = n[e * 3 + 1], s[e * 3 + 2] = n[e * 3 + 2], c[e * 3 + 0] = r[e * 3 + 0], c[e * 3 + 1] = r[e * 3 + 1], c[e * 3 + 2] = r[e * 3 + 2], l[e * 3 + 0] = n[(e + 1) * 3 + 0], l[e * 3 + 1] = n[(e + 1) * 3 + 1], l[e * 3 + 2] = n[(e + 1) * 3 + 2], u[e * 3 + 0] = r[(e + 1) * 3 + 0], u[e * 3 + 1] = r[(e + 1) * 3 + 1], u[e * 3 + 2] = r[(e + 1) * 3 + 2];
		i.setAttribute("instanceStartHigh", new st(s, 3)), i.setAttribute("instanceStartLow", new st(c, 3)), i.setAttribute("instanceEndHigh", new st(l, 3)), i.setAttribute("instanceEndLow", new st(u, 3));
		let d = new qc({
			color: e.color,
			linewidth: e.lineWidth,
			dashed: e.dashed,
			transparent: !1
		});
		e.dashed && (d.dashSize = e.dashSize, d.gapSize = e.gapSize, d.dashOffset = e.dashOffset), d.resolution.set(1920, 1080), Ee(d), this.injectRTEShaderCode(d);
		let f = new dl(i, d);
		return e.dashed && f.computeLineDistances(), f;
	}
	createSpherePointMesh(e, t) {
		let n = new hl({
			size: e.pointSize,
			color: e.pointColor,
			visible: e.showPoints
		});
		return n.setPoints(this._pointsData[t]), n;
	}
	updateConfig(e) {
		e.forEach((e, t) => {
			if (this._config[t]) this.updateLineCfg(e, t), this.updatePointsCfg(e, t);
			else if (this._config[t] = {
				..._l,
				...e
			}, this._config[t].points.length > 1) {
				let e = this.createLineMesh(this._config[t], t);
				this._lineMeshes.push(e), this.add(e);
				let n = this.createSpherePointMesh(this._config[t], t);
				n && (this._pointsMeshes.push(n), this.add(n)), t === 0 && this.setupRTECallback();
			}
		});
	}
	updateLineCfg(e, t) {
		let n = !1;
		if (e.points !== void 0) {
			let r = e.points.length !== this._config[t].points.length;
			if (!r) {
				for (let n = 0; n < e.points.length; n++) if (e.points[n].lng !== this._config[t].points[n].lng || e.points[n].lat !== this._config[t].points[n].lat || e.points[n].height !== this._config[t].points[n].height) {
					r = !0;
					break;
				}
			}
			r && (this._config[t].points = e.points, this.updatePointsData(), n = !0, this._pointsMeshes[t] && this._pointsMeshes[t].setPoints(this._pointsData[t]));
		}
		if (e.tension !== void 0 && e.tension !== this._config[t].tension && (this._config[t].tension = e.tension, n = !0), e.closed !== void 0 && e.closed !== this._config[t].closed && (this._config[t].closed = e.closed, n = !0), e.segments !== void 0 && e.segments !== this._config[t].segments && (this._config[t].segments = e.segments, n = !0), n) {
			this._lineMeshes[t] && (this._lineMeshes[t].geometry.dispose(), this._lineMeshes[t].material.dispose(), this.remove(this._lineMeshes[t]));
			let e = this.createLineMesh(this._config[t], t);
			this._lineMeshes[t] = e, this.add(e), t === 0 && this.setupRTECallback();
		}
		if (e.lineWidth !== void 0 && e.lineWidth !== this._config[t].lineWidth && (this._config[t].lineWidth = e.lineWidth, this._lineMeshes[t])) {
			let n = this._lineMeshes[t].material;
			n.linewidth = e.lineWidth;
		}
		if (e.color !== void 0 && e.color !== this._config[t].color && (this._config[t].color = e.color, this._lineMeshes[t] && this._lineMeshes[t].material.color.setHex(e.color)), e.dashed !== void 0 && e.dashed !== this._config[t].dashed && (this._config[t].dashed = e.dashed), e.dashSize !== void 0 && e.dashSize !== this._config[t].dashSize && (this._config[t].dashSize = e.dashSize), e.gapSize !== void 0 && e.gapSize !== this._config[t].gapSize && (this._config[t].gapSize = e.gapSize), e.dashOffset !== void 0 && e.dashOffset !== this._config[t].dashOffset && (this._config[t].dashOffset = e.dashOffset), this._lineMeshes[t]) {
			let e = this._lineMeshes[t].material;
			e.dashed = this._config[t].dashed, this._config[t].dashed && (e.dashSize = this._config[t].dashSize, e.gapSize = this._config[t].gapSize, e.dashOffset = this._config[t].dashOffset, this._lineMeshes[t].computeLineDistances());
		}
	}
	updatePointsCfg(e, t) {
		let n = !1;
		e.showPoints !== void 0 && e.showPoints !== this._config[t].showPoints && (this._config[t].showPoints = e.showPoints, n = !0), e.pointSize !== void 0 && e.pointSize !== this._config[t].pointSize && (this._config[t].pointSize = e.pointSize, n = !0), e.pointColor !== void 0 && e.pointColor !== this._config[t].pointColor && (this._config[t].pointColor = e.pointColor, n = !0), n && this._pointsMeshes[t] && this._pointsMeshes[t].setOptions({
			size: this._config[t].pointSize,
			color: this._config[t].pointColor,
			visible: this._config[t].showPoints
		});
	}
	injectRTEShaderCode(e) {
		let t = this._sharedRTEUniforms;
		e.onBeforeCompile = (e) => {
			e.uniforms.u_cameraPositionHigh = t.cameraPositionHigh, e.uniforms.u_cameraPositionLow = t.cameraPositionLow, e.uniforms.modelViewMatrixRTE = t.modelViewMatrixRTE, e.uniforms.u_rteOne = v, e.vertexShader = fe(e.vertexShader).replace("attribute vec3 instanceEnd;", "attribute vec3 instanceEnd;\n\n        // RTE uniforms\n        uniform vec3 u_cameraPositionHigh;\n        uniform vec3 u_cameraPositionLow;\n        uniform mat4 modelViewMatrixRTE;\n        // Always 1.0 — blocks fast-math reassociation of the high/low\n        // recombination (see chunks/rte_pars_vertex.glsl).\n        uniform float u_rteOne;\n\n        // RTE instance attributes\n        attribute vec3 instanceStartHigh;\n        attribute vec3 instanceStartLow;\n        attribute vec3 instanceEndHigh;\n        attribute vec3 instanceEndLow;").replace("vec4 start = modelViewMatrix * vec4( instanceStart, 1.0 );", "// Decode RTE position for start point\n        vec3 startHighDiff = (instanceStartHigh - u_cameraPositionHigh) * u_rteOne;\n        vec3 startLowDiff = instanceStartLow - u_cameraPositionLow;\n        vec3 startRTE = startHighDiff + startLowDiff;\n        vec4 start = modelViewMatrixRTE * vec4( startRTE, 1.0 );").replace("vec4 end = modelViewMatrix * vec4( instanceEnd, 1.0 );", "// Decode RTE position for end point\n        vec3 endHighDiff = (instanceEndHigh - u_cameraPositionHigh) * u_rteOne;\n        vec3 endLowDiff = instanceEndLow - u_cameraPositionLow;\n        vec3 endRTE = endHighDiff + endLowDiff;\n        vec4 end = modelViewMatrixRTE * vec4( endRTE, 1.0 );").source;
		}, e.needsUpdate = !0;
	}
	setupRTECallback() {
		if (this._lineMeshes.length === 0) return;
		let e = this._lineMeshes[0];
		this._originalLineOnBeforeRender === null && (this._originalLineOnBeforeRender = e.onBeforeRender.bind(e)), e.onBeforeRender = (e, t, n, r, i, a) => {
			this._originalLineOnBeforeRender && this._originalLineOnBeforeRender(e, t, n, r, i, a), oe(this._identityMatrix, n.matrixWorldInverse, this._tempModelViewMatrix);
			let o = ae(n.position, this._identityMatrix);
			this._sharedRTEUniforms.modelViewMatrixRTE.value.copy(this._tempModelViewMatrix), this._sharedRTEUniforms.cameraPositionHigh.value.copy(o.high), this._sharedRTEUniforms.cameraPositionLow.value.copy(o.low);
		};
	}
	dispose() {
		this._lineMeshes.forEach((e) => {
			e.geometry.dispose(), e.material.dispose();
		}), this._pointsMeshes.forEach((e) => {
			e.dispose();
		});
	}
	onResize(e, t) {
		let n = window.devicePixelRatio || 1;
		this._lineMeshes.forEach((r) => {
			r.material.resolution.set(e * n, t * n);
		});
	}
}, yl = class extends f {
	config;
	pickWrapper;
	constructor(e, t, n) {
		super(e, t, n), this.config = n;
	}
	get batchId() {
		return this.pickWrapper?.batchId;
	}
	getPassKey() {
		return "mrt";
	}
	createMesh() {
		let e = [];
		if (this.config.smoothLines) {
			let t = Array.isArray(this.config.smoothLines) ? this.config.smoothLines : [this.config.smoothLines];
			for (let n of t) e.push({
				tension: n.tension ?? _l.tension,
				closed: n.closed ?? _l.closed,
				segments: n.segments ?? _l.segments,
				lineWidth: n.lineWidth ?? _l.lineWidth,
				dashed: n.dashed ?? _l.dashed,
				dashSize: n.dashSize ?? _l.dashSize,
				dashOffset: n.dashOffset ?? _l.dashOffset,
				gapSize: n.gapSize ?? _l.gapSize,
				color: n.color ?? _l.color,
				showPoints: n.showPoints ?? _l.showPoints,
				pointSize: n.pointSize ?? _l.pointSize,
				pointColor: n.pointColor ?? _l.pointColor,
				points: n.points ?? []
			});
		}
		let t = new vl(e);
		return this.config.pickable && (this.pickWrapper = new g(t, this.ctx), this.ctx.registerPickableMesh(this.id, this.pickWrapper)), t;
	}
	onUpdateConfig(e) {
		if (this.config.smoothLines && e.smoothLines && this._instance) {
			Object.assign(this.config.smoothLines, e.smoothLines);
			let t = Array.isArray(e.smoothLines) ? e.smoothLines : [e.smoothLines];
			this._instance.updateConfig(t), this.pickWrapper?.syncMaterials(), this.emit("needsUpdate");
		}
		super.onUpdateConfig(e);
	}
	onResize(e, t) {
		this._instance?.onResize(e, t);
	}
	disposeMesh() {
		this._instance &&= (this._instance.dispose(), void 0);
	}
	onDestroy() {
		this.pickWrapper &&= (this.ctx.unregisterPickableMesh(this.id), void 0), super.onDestroy();
	}
}, bl = "const float ATMOSPHERE_CUTOFF_ALTITUDE_LOW = 100000.0; \nconst float ATMOSPHERE_CUTOFF_ALTITUDE_HIGH = ATMOSPHERE_CUTOFF_ALTITUDE_LOW + 90000.0;\nconst float SUN_RADIUS = 0.00465;\n\nuniform vec3 uDayColor;\nuniform vec3 uNightColor;\nuniform vec3 uSunColor;\nuniform vec3 uSunDirView;\n\nin vec3 v_posView;\nflat in vec3 v_upView;\nflat in float v_cameraAltitude;\nflat in float v_sunElevation;\n\nfloat dither(vec2 pixel) {\n    return fract(52.9829189 * fract(dot(pixel, vec2(0.06711056, 0.00583715))));\n}\n\nvoid main() {\n    vec3 sunDir = normalize(uSunDirView);\n    vec3 pixelDir = normalize(v_posView);\n    float daylight = smoothstep(-0.2, 0.2, v_sunElevation);\n    float horizon = 1.0 - smoothstep(0.0, 0.65, abs(dot(pixelDir, v_upView)));\n\n    float dayLuminance = dot(uDayColor, vec3(0.2126, 0.7152, 0.0722));\n    vec3 horizonColor = mix(uDayColor, vec3(dayLuminance), 0.35) * 1.15;\n    vec3 dayColor = mix(uDayColor * 0.8, horizonColor, horizon);\n    vec3 skyColor = mix(uNightColor, dayColor, daylight);\n\n    float sunAlignment = max(dot(pixelDir, sunDir), 0.0);\n    float twilight = 1.0 - smoothstep(0.0, 0.25, abs(v_sunElevation));\n    skyColor += uSunColor * (0.18 * twilight * horizon * pow(sunAlignment, 8.0));\n\n    \n    vec3 sunOffset = pixelDir - sunDir;\n    float sunDistance = length(sunOffset);\n    float discEdge = max(fwidth(sunDistance), 0.00001);\n    float sunDisc = 1.0 - smoothstep(SUN_RADIUS - discEdge, SUN_RADIUS + discEdge, sunDistance);\n    float sunHalo = exp2(-dot(sunOffset, sunOffset) / 0.00045);\n\n    float opacity = 1.0 - smoothstep(\n        ATMOSPHERE_CUTOFF_ALTITUDE_LOW, ATMOSPHERE_CUTOFF_ALTITUDE_HIGH, v_cameraAltitude);\n    skyColor = max(skyColor + (dither(gl_FragCoord.xy) - 0.5) / 255.0, vec3(0.0));\n    \n    vec3 color = skyColor * (0.3 * opacity);\n    color += uSunColor * (1.8 * sunDisc + 0.18 * sunHalo);\n    float coverage = opacity + (1.0 - opacity) * sunDisc;\n    gl_FragColor = vec4(color, coverage);\n}", xl = "#ifndef ELLIPSOID_GLSL\n#define ELLIPSOID_GLSL\n\n#define WGS84_A 6378137.0\n#define WGS84_B 6356752.3142451793\n\nconst vec3 WGS84_RADII = vec3(WGS84_A, WGS84_A, WGS84_B);\nconst vec3 ONE_OVER_WGS84_RADII = 1.0 / vec3(WGS84_A, WGS84_A, WGS84_B);\nconst vec3 ONE_OVER_WGS84_RADII_SQUARED = 1.0 / vec3(WGS84_A * WGS84_A, WGS84_A * WGS84_A, WGS84_B * WGS84_B);\n\nconst float WGS84_E2 = 0.00669438; \nconst float WGS84_E2_SECOND = 0.00673950; \n\nconst float WGS84_FLATTENING = 0.00335281; \nconst float WGS84_FLATTENING_RECIPROCAL = 298.257223563; \n\n#endif\n\nconst float DEG_TO_RAD = 0.017453292519943295;\nconst float RAD_TO_DEG = 57.29577951308232;\n\n#ifndef PI\n  #define PI 3.141592653589793\n#endif\n\nvec3 rotateAroundAxis(vec3 v, vec3 axis, float angle) {\n  float c = cos(angle); \n  float s = sin(angle);\n  return v * c + cross(axis, v) * s + axis * dot(axis, v) * (1.0 - c);\n}\n\nvec3 lonLatToEllipsoid(float lon, float lat, float a, float e2) {\n  float lonR = lon * DEG_TO_RAD;\n  float latR = lat * DEG_TO_RAD;\n\n  float sinLat = sin(latR);\n  float cosLat = cos(latR);\n  float N = a / sqrt(1.0 - e2 * sinLat * sinLat); \n\n  float x = N * cosLat * cos(lonR);\n  float y = N * cosLat * sin(lonR);\n  float z = N * (1.0 - e2) * sinLat;\n\n  return vec3(x, y, z);\n}\n\nvec3 ecefToLonLat(vec3 ecef) {\n  float x = ecef.x;\n  float y = ecef.y;\n  float z = ecef.z;\n\n  float lon = atan(y, x) * RAD_TO_DEG;\n\n  float p = sqrt(x * x + y * y);\n  float theta = atan(z * WGS84_A, p * WGS84_B);\n  float lat = atan(z + WGS84_E2_SECOND * WGS84_B * pow(sin(theta), 3.0),\n                    p - WGS84_E2 * WGS84_A * pow(cos(theta), 3.0)) * RAD_TO_DEG;\n  \n  float N = WGS84_A / sqrt(1.0 - WGS84_E2 * sin(lat * DEG_TO_RAD) * sin(lat * DEG_TO_RAD));\n  float alt = p / cos(lat * DEG_TO_RAD) - N;\n\n  return vec3(lon, lat, alt);\n}\n\nvec3 ellipsoidGeodesic(vec3 s, vec3 t, float tt, float a, float e2) {\n  \n  vec3 sN = normalize(s); \n  vec3 tN = normalize(t);\n  float d = clamp(dot(sN, tN), -1.0, 1.0);\n  float omega = acos(d);\n\n  \n  vec3 spherePoint;\n  if (abs(omega) < 1e-6) {\n    \n    spherePoint = sN;\n  } else if (abs(PI - omega) < 1e-5) {\n    \n    vec3 aux = abs(sN.z) < 0.9 ? vec3(0.0,0.0,1.0) : vec3(0.0,1.0,0.0);\n    vec3 axis = normalize(cross(sN, aux));\n    spherePoint = normalize(rotateAroundAxis(sN, axis, PI * tt));\n  } else {\n    float sinO = sin(omega);\n    vec3 dir = (sin((1.0 - tt) * omega) / sinO) * sN\n              + (sin(tt * omega) / sinO) * tN;\n    spherePoint = normalize(dir);\n  }\n\n  \n  float lon = atan(spherePoint.y, spherePoint.x) * RAD_TO_DEG;\n  float lat = asin(clamp(spherePoint.z, -1.0, 1.0)) * RAD_TO_DEG;\n\n  return lonLatToEllipsoid(lon, lat, a, e2);\n}\n\nuniform vec3 uSunDirView;\n\nout vec3 v_posView;\nflat out vec3 v_upView;\nflat out float v_cameraAltitude;\nflat out float v_sunElevation;\n\nvoid main() {\n    vec4 positionView = inverse(projectionMatrix) * vec4(position.xyz, 1.0);\n    v_posView = positionView.xyz / positionView.w;\n\n    vec3 cameraPositionLLA = ecefToLonLat(cameraPosition);\n    v_cameraAltitude = cameraPositionLLA.z;\n    vec2 lonLat = cameraPositionLLA.xy * DEG_TO_RAD;\n    vec3 upWorld = vec3(cos(lonLat.y) * cos(lonLat.x), cos(lonLat.y) * sin(lonLat.x), sin(lonLat.y));\n    v_upView = normalize(mat3(viewMatrix) * upWorld);\n    v_sunElevation = dot(v_upView, normalize(uSunDirView));\n\n    gl_Position = vec4(position.xyz, 1.0);\n}", Sl = {
	dayColor: new i().setHex(9617919),
	nightColor: new i().setHex(51),
	sunColor: new i().setHex(16768430)
}, Cl = class extends f {
	config;
	constructor(e, t, n) {
		super(e, t, n), this.config = n;
	}
	createMesh() {
		let e = {
			...Sl,
			...this.config.skyBox
		}, t = new ze(), n = new Float32Array([
			-1,
			-1,
			1,
			3,
			-1,
			1,
			-1,
			3,
			1
		]);
		t.setAttribute("position", new C(n, 3));
		let r = new O();
		r.vertexShader = xl, r.fragmentShader = bl, r.transparent = !0, r.premultipliedAlpha = !0;
		let i = e.dayColor.toArray(), a = e.nightColor.toArray(), o = e.sunColor.toArray(), s = this.view.atmosphere.sunDirection, c = new M(s.x, s.y, s.z, 0).applyMatrix4(this.view.camera.raw.matrixWorldInverse);
		r.uniforms = {
			uDayColor: { value: new j(i[0], i[1], i[2]) },
			uNightColor: { value: new j(a[0], a[1], a[2]) },
			uSunColor: { value: new j(o[0], o[1], o[2]) },
			uSunDirection: { value: s },
			uSunDirView: { value: new j(c.x, c.y, c.z) }
		};
		let l = new D(t, r);
		return l.frustumCulled = !1, l;
	}
	onUpdateConfig(e) {
		if (e.skyBox && this._instance) {
			let t = e.skyBox, n = this.config.skyBox, r = this._instance.material;
			if (t.dayColor !== void 0) {
				let e = t.dayColor.toArray();
				r.uniforms.uDayColor.value = new j(e[0], e[1], e[2]);
			}
			if (t.nightColor !== void 0) {
				let e = t.nightColor.toArray();
				r.uniforms.uNightColor.value = new j(e[0], e[1], e[2]);
			}
			if (t.sunColor !== void 0) {
				let e = t.sunColor.toArray();
				r.uniforms.uSunColor.value = new j(e[0], e[1], e[2]);
			}
			n && Object.assign(n, t), this.emit("needsUpdate");
		}
		super.onUpdateConfig(e);
	}
	update(e) {
		if (!this._instance) return;
		let t = this._instance.material, n = new M(this.view.atmosphere.sunDirection.x, this.view.atmosphere.sunDirection.y, this.view.atmosphere.sunDirection.z, 0).applyMatrix4(this.view.camera.raw.matrixWorldInverse);
		t.uniforms.uSunDirView.value = new j(n.x, n.y, n.z), this.emit("needsUpdate");
	}
	disposeMesh() {
		this._instance &&= (this._instance.geometry.dispose(), this._instance.material.dispose(), void 0);
	}
}, wl = class extends f {
	config;
	constructor(e, t, n) {
		super(e, t, n), this.config = n;
	}
	createMesh() {
		let e = this.config.arrowHelper;
		if (!e?.direction) throw Error("ArrowHelper requires a direction");
		let t = new j(e.direction.x, e.direction.y, e.direction.z).normalize(), n = e.origin ? new j(e.origin.x, e.origin.y, e.origin.z) : new j(0, 0, 0), r = e.length ?? 1, a = (e.color ?? new i().setStyle("#ffffff")).raw, o = e.headLength, s = e.headWidth;
		return new Ne(t, n, r, a, o, s);
	}
	onUpdateConfig(e) {
		if (e.arrowHelper && this._instance) {
			let t = e.arrowHelper;
			if (t.direction && this._instance.setDirection(new j(t.direction.x, t.direction.y, t.direction.z)), t.length !== void 0 && this._instance.setLength(t.length, t.headLength, t.headWidth), t.color !== void 0) {
				let e = t.color.raw;
				this._instance.setColor(e);
			}
			this.emit("needsUpdate");
		}
		super.onUpdateConfig(e);
	}
	disposeMesh() {
		this._instance &&= (this._instance.dispose(), void 0);
	}
}, Tl = class extends f {
	config;
	constructor(e, t, n) {
		super(e, t, n), this.config = n;
	}
	createMesh() {
		let e = this.config.axesHelper?.size ?? 5;
		return new Pe(e);
	}
	onUpdateConfig(e) {
		e.axesHelper && this._instance && e.axesHelper.size !== void 0 && this.recreate(), super.onUpdateConfig(e);
	}
	recreate() {
		this._instance && (this.onDestroy(), this.onCreate());
	}
	disposeMesh() {
		this._instance &&= (this._instance.dispose(), void 0);
	}
}, El = new w(), Dl = class extends u {
	config;
	pickWrapper;
	constructor(e, t, n) {
		n.boxes?.effectIds && (n.effectIds = n.boxes.effectIds), super(e, t, n), this.config = n;
	}
	get batchIds() {
		return this.pickWrapper?.batchIds ?? [];
	}
	get boxesConfig() {
		return this.config.boxes;
	}
	getChildConfigs() {
		return this.boxesConfig?.children ?? [];
	}
	createGeometry() {
		return new Re(1, 1, 1);
	}
	createMaterial() {
		let e = this.boxesConfig, t = e?.color ?? new i().setStyle("#ffffff"), n = e?.emissiveColor ? e.emissiveColor.raw : 0, r = new Ot({
			color: t.raw,
			emissive: n,
			emissiveIntensity: e?.emissiveIntensity ?? 0,
			opacity: e?.opacity ?? 1,
			transparent: e?.transparent ?? !1
		});
		return ke(r), r;
	}
	getInstanceScale(e, t) {
		let n = e.scale;
		t.set((e.width ?? 1) * (n?.x ?? 1), (e.height ?? 1) * (n?.y ?? 1), (e.depth ?? 1) * (n?.z ?? 1));
	}
	getInstanceColor(e) {
		if (e.color) return El.set(e.color.raw);
	}
	onCreate() {
		super.onCreate();
		let e = this.raw, t = this.boxesConfig;
		e && (e.castShadow = t?.castShadow ?? !1, e.receiveShadow = t?.receiveShadow ?? !1, this.ctx.applyShadowMaterial(e.material), this.config.pickable && (this.pickWrapper = new h(e, this.count, this.ctx), this.ctx.registerPickableMesh(this.id, this.pickWrapper)));
	}
	onInstanceAdded(e) {
		this.pickWrapper?.addInstance();
	}
	onInstanceRemoved(e, t) {
		this.pickWrapper?.removeInstanceAt(e);
	}
	onInstancesCleared() {
		this.pickWrapper?.clearInstances();
	}
	onInstancesReplaced(e) {
		this.pickWrapper?.replaceAll(e);
	}
	onInstanceMeshReplaced(e) {
		this.pickWrapper?.syncMesh(e);
	}
	onUpdateConfig(e) {
		if (e.boxes !== void 0 && this.raw) {
			let t = e.boxes, n = this.raw.material;
			t.color !== void 0 && n.color.set(t.color.raw), t.emissiveColor !== void 0 && n.emissive.set(t.emissiveColor.raw), t.emissiveIntensity !== void 0 && (n.emissiveIntensity = t.emissiveIntensity), t.opacity !== void 0 && (n.opacity = t.opacity), t.transparent !== void 0 && (n.transparent = t.transparent, n.needsUpdate = !0), t.castShadow !== void 0 && (this.raw.castShadow = t.castShadow), t.receiveShadow !== void 0 && (this.raw.receiveShadow = t.receiveShadow), t.children !== void 0 && this.replaceAll(t.children), t.effectIds !== void 0 && (e.effectIds = t.effectIds), this.config.boxes = {
				...this.config.boxes,
				...t
			};
		}
		super.onUpdateConfig(e);
	}
	onDestroy() {
		this.pickWrapper &&= (this.ctx.unregisterPickableMesh(this.id), void 0), this.raw && this.ctx.removeShadowMaterial(this.raw.material), super.onDestroy();
	}
}, Ol = new w(), kl = class extends u {
	config;
	pickWrapper;
	constructor(e, t, n) {
		n.spheres?.effectIds && (n.effectIds = n.spheres.effectIds), super(e, t, n), this.config = n;
	}
	get batchIds() {
		return this.pickWrapper?.batchIds ?? [];
	}
	get spheresConfig() {
		return this.config.spheres;
	}
	getChildConfigs() {
		return this.spheresConfig?.children ?? [];
	}
	createGeometry() {
		let e = this.spheresConfig;
		return new Qt(1, e?.widthSegments ?? 32, e?.heightSegments ?? 16, e?.phiStart ?? 0, e?.phiLength ?? Math.PI * 2, e?.thetaStart ?? 0, e?.thetaLength ?? Math.PI);
	}
	createMaterial() {
		let e = this.spheresConfig, t = e?.color ?? new i().setStyle("#ffffff"), n = e?.emissiveColor ? e.emissiveColor.raw : 0, r = new Ot({
			color: t.raw,
			emissive: n,
			emissiveIntensity: e?.emissiveIntensity ?? 0,
			opacity: e?.opacity ?? 1,
			transparent: e?.transparent ?? !1
		});
		return ke(r), r;
	}
	getInstanceScale(e, t) {
		let n = e.scale, r = e.radius ?? 1;
		t.set(r * (n?.x ?? 1), r * (n?.y ?? 1), r * (n?.z ?? 1));
	}
	getInstanceColor(e) {
		if (e.color) return Ol.set(e.color.raw);
	}
	onCreate() {
		super.onCreate();
		let e = this.raw, t = this.spheresConfig;
		e && (e.castShadow = t?.castShadow ?? !1, e.receiveShadow = t?.receiveShadow ?? !1, this.ctx.applyShadowMaterial(e.material), this.config.pickable && (this.pickWrapper = new h(e, this.count, this.ctx), this.ctx.registerPickableMesh(this.id, this.pickWrapper)));
	}
	onInstanceAdded(e) {
		this.pickWrapper?.addInstance();
	}
	onInstanceRemoved(e, t) {
		this.pickWrapper?.removeInstanceAt(e);
	}
	onInstancesCleared() {
		this.pickWrapper?.clearInstances();
	}
	onInstancesReplaced(e) {
		this.pickWrapper?.replaceAll(e);
	}
	onInstanceMeshReplaced(e) {
		this.pickWrapper?.syncMesh(e);
	}
	onUpdateConfig(e) {
		if (e.spheres !== void 0 && this.raw) {
			let t = e.spheres, n = this.raw.material;
			t.color !== void 0 && n.color.set(t.color.raw), t.emissiveColor !== void 0 && n.emissive.set(t.emissiveColor.raw), t.emissiveIntensity !== void 0 && (n.emissiveIntensity = t.emissiveIntensity), t.opacity !== void 0 && (n.opacity = t.opacity), t.transparent !== void 0 && (n.transparent = t.transparent, n.needsUpdate = !0), t.castShadow !== void 0 && (this.raw.castShadow = t.castShadow), t.receiveShadow !== void 0 && (this.raw.receiveShadow = t.receiveShadow), t.children !== void 0 && this.replaceAll(t.children), t.effectIds !== void 0 && (e.effectIds = t.effectIds), this.config.spheres = {
				...this.config.spheres,
				...t
			};
		}
		super.onUpdateConfig(e);
	}
	onDestroy() {
		this.pickWrapper &&= (this.ctx.unregisterPickableMesh(this.id), void 0), this.raw && this.ctx.removeShadowMaterial(this.raw.material), super.onDestroy();
	}
}, Al = new w(), jl = class extends u {
	config;
	pickWrapper;
	constructor(e, t, n) {
		n.planes?.effectIds && (n.effectIds = n.planes.effectIds), super(e, t, n), this.config = n;
	}
	get batchIds() {
		return this.pickWrapper?.batchIds ?? [];
	}
	get planesConfig() {
		return this.config.planes;
	}
	getChildConfigs() {
		return this.planesConfig?.children ?? [];
	}
	createGeometry() {
		let e = this.planesConfig;
		return new Ft(1, 1, e?.widthSegments ?? 1, e?.heightSegments ?? 1);
	}
	createMaterial() {
		let e = this.planesConfig, t = e?.color ?? new i().setStyle("#ffffff"), n = e?.emissiveColor ? e.emissiveColor.raw : 0, r = new Ot({
			color: t.raw,
			emissive: n,
			emissiveIntensity: e?.emissiveIntensity ?? 0,
			opacity: e?.opacity ?? 1,
			transparent: e?.transparent ?? !1
		});
		return ke(r), r;
	}
	getInstanceScale(e, t) {
		let n = e.scale;
		t.set((e.width ?? 1) * (n?.x ?? 1), (e.height ?? 1) * (n?.y ?? 1), n?.z ?? 1);
	}
	getInstanceColor(e) {
		if (e.color) return Al.set(e.color.raw);
	}
	onCreate() {
		super.onCreate();
		let e = this.raw, t = this.planesConfig;
		e && (e.castShadow = t?.castShadow ?? !1, e.receiveShadow = t?.receiveShadow ?? !1, this.ctx.applyShadowMaterial(e.material), this.config.pickable && (this.pickWrapper = new h(e, this.count, this.ctx), this.ctx.registerPickableMesh(this.id, this.pickWrapper)));
	}
	onInstanceAdded(e) {
		this.pickWrapper?.addInstance();
	}
	onInstanceRemoved(e, t) {
		this.pickWrapper?.removeInstanceAt(e);
	}
	onInstancesCleared() {
		this.pickWrapper?.clearInstances();
	}
	onInstancesReplaced(e) {
		this.pickWrapper?.replaceAll(e);
	}
	onInstanceMeshReplaced(e) {
		this.pickWrapper?.syncMesh(e);
	}
	onUpdateConfig(e) {
		if (e.planes !== void 0 && this.raw) {
			let t = e.planes, n = this.raw.material;
			t.color !== void 0 && n.color.set(t.color.raw), t.emissiveColor !== void 0 && n.emissive.set(t.emissiveColor.raw), t.emissiveIntensity !== void 0 && (n.emissiveIntensity = t.emissiveIntensity), t.opacity !== void 0 && (n.opacity = t.opacity), t.transparent !== void 0 && (n.transparent = t.transparent, n.needsUpdate = !0), t.castShadow !== void 0 && (this.raw.castShadow = t.castShadow), t.receiveShadow !== void 0 && (this.raw.receiveShadow = t.receiveShadow), t.children !== void 0 && this.replaceAll(t.children), t.effectIds !== void 0 && (e.effectIds = t.effectIds), this.config.planes = {
				...this.config.planes,
				...t
			};
		}
		super.onUpdateConfig(e);
	}
	onDestroy() {
		this.pickWrapper &&= (this.ctx.unregisterPickableMesh(this.id), void 0), this.raw && this.ctx.removeShadowMaterial(this.raw.material), super.onDestroy();
	}
}, Ml = new w(), Nl = class extends u {
	config;
	pickWrapper;
	constructor(e, t, n) {
		n.cylinders?.effectIds && (n.effectIds = n.cylinders.effectIds), super(e, t, n), this.config = n;
	}
	get batchIds() {
		return this.pickWrapper?.batchIds ?? [];
	}
	get cylindersConfig() {
		return this.config.cylinders;
	}
	getChildConfigs() {
		return this.cylindersConfig?.children ?? [];
	}
	createGeometry() {
		let e = this.cylindersConfig;
		return new Ke(e?.radiusTop ?? 1, e?.radiusBottom ?? 1, 1, e?.radialSegments ?? 16, e?.heightSegments ?? 1, e?.openEnded ?? !1, e?.thetaStart ?? 0, e?.thetaLength ?? Math.PI * 2);
	}
	createMaterial() {
		let e = this.cylindersConfig, t = e?.color ?? new i().setStyle("#ffffff"), n = e?.emissiveColor ? e.emissiveColor.raw : 0, r = new Ot({
			color: t.raw,
			emissive: n,
			emissiveIntensity: e?.emissiveIntensity ?? 0,
			opacity: e?.opacity ?? 1,
			transparent: e?.transparent ?? !1
		});
		return ke(r), r;
	}
	getInstanceScale(e, t) {
		let n = e.scale, r = e.radius ?? 1, i = e.height ?? 1;
		t.set(r * (n?.x ?? 1), i * (n?.y ?? 1), r * (n?.z ?? 1));
	}
	getInstanceColor(e) {
		if (e.color) return Ml.set(e.color.raw);
	}
	onCreate() {
		super.onCreate();
		let e = this.raw, t = this.cylindersConfig;
		e && (e.castShadow = t?.castShadow ?? !1, e.receiveShadow = t?.receiveShadow ?? !1, this.ctx.applyShadowMaterial(e.material), this.config.pickable && (this.pickWrapper = new h(e, this.count, this.ctx), this.ctx.registerPickableMesh(this.id, this.pickWrapper)));
	}
	onInstanceAdded(e) {
		this.pickWrapper?.addInstance();
	}
	onInstanceRemoved(e, t) {
		this.pickWrapper?.removeInstanceAt(e);
	}
	onInstancesCleared() {
		this.pickWrapper?.clearInstances();
	}
	onInstancesReplaced(e) {
		this.pickWrapper?.replaceAll(e);
	}
	onInstanceMeshReplaced(e) {
		this.pickWrapper?.syncMesh(e);
	}
	onUpdateConfig(e) {
		if (e.cylinders !== void 0 && this.raw) {
			let t = e.cylinders, n = this.raw.material;
			t.color !== void 0 && n.color.set(t.color.raw), t.emissiveColor !== void 0 && n.emissive.set(t.emissiveColor.raw), t.emissiveIntensity !== void 0 && (n.emissiveIntensity = t.emissiveIntensity), t.opacity !== void 0 && (n.opacity = t.opacity), t.transparent !== void 0 && (n.transparent = t.transparent, n.needsUpdate = !0), t.castShadow !== void 0 && (this.raw.castShadow = t.castShadow), t.receiveShadow !== void 0 && (this.raw.receiveShadow = t.receiveShadow), t.children !== void 0 && this.replaceAll(t.children), t.effectIds !== void 0 && (e.effectIds = t.effectIds), this.config.cylinders = {
				...this.config.cylinders,
				...t
			};
		}
		super.onUpdateConfig(e);
	}
	onDestroy() {
		this.pickWrapper &&= (this.ctx.unregisterPickableMesh(this.id), void 0), this.raw && this.ctx.removeShadowMaterial(this.raw.material), super.onDestroy();
	}
};
//#endregion
//#region ../../node_modules/.pnpm/three@0.185.1/node_modules/three/examples/jsm/utils/SkeletonUtils.js
function Pl(e) {
	let t = /* @__PURE__ */ new Map(), n = /* @__PURE__ */ new Map(), r = e.clone();
	return Fl(e, r, function(e, r) {
		t.set(r, e), n.set(e, r);
	}), r.traverse(function(e) {
		if (!e.isSkinnedMesh) return;
		let r = e, i = t.get(e), a = i.skeleton.bones;
		r.skeleton = i.skeleton.clone(), r.bindMatrix.copy(i.bindMatrix), r.skeleton.bones = a.map(function(e) {
			return n.get(e);
		}), r.bind(r.skeleton, r.bindMatrix);
	}), r;
}
function Fl(e, t, n) {
	n(e, t);
	for (let r = 0; r < e.children.length; r++) Fl(e.children[r], t.children[r], n);
}
//#endregion
//#region src/meshes/InstancedGltfModelMeshDesc.ts
var Il = 64, Ll = 2, Rl = [
	"map",
	"normalMap",
	"metalnessMap",
	"roughnessMap",
	"emissiveMap",
	"aoMap"
];
function zl(e) {
	let t = !1;
	return e.scene.traverse((e) => {
		if (t) return;
		let n = e.material;
		if (!n) return;
		let r = Array.isArray(n) ? n : [n];
		for (let e of r) {
			let n = e;
			for (let e of Rl) {
				let r = n[e];
				if (r && r.source && r.source.data == null) {
					t = !0;
					return;
				}
			}
		}
	}), t;
}
var Bl = new j(), Vl = new Lt(), Hl = new j(), Ul = new Qe(), Wl = new E(), Gl = new E(), Kl = new w(), ql = class extends f {
	config;
	loader = le();
	gltf = null;
	subMeshes = [];
	capacity = 0;
	hasSkinned = !1;
	skinnedScenes = [];
	anims = [];
	configs = [];
	lastUpdateTime;
	pickWrapper;
	rteAnchor = new j();
	rtePosHigh = new j();
	rtePosLow = new j();
	rteUserData = {
		modelViewMatrixRTE: { value: new E() },
		cameraPositionHigh: { value: new j() },
		cameraPositionLow: { value: new j() }
	};
	rtePatchedMaterials = /* @__PURE__ */ new WeakSet();
	constructor(e, t, n) {
		super(e, t, n), this.config = n;
	}
	get batchIds() {
		return this.pickWrapper?.batchIds ?? [];
	}
	get count() {
		return this.configs.length;
	}
	get animationClips() {
		return this.gltf ? this.gltf.animations.map((e) => e.name) : [];
	}
	createMesh() {
		let e = new at(), t = this.config.gltfModels;
		return t?.url && this.loadModel(t.url, e).catch((e) => {
			console.error("Failed to load instanced GLTF model:", e), this.emit("error", e);
		}), e;
	}
	getPassKey() {
		return "mrt";
	}
	onCreate() {
		super.onCreate(), this.captureAnchorFromMatrixWorld();
	}
	captureAnchorFromMatrixWorld() {
		if (!this.raw) return;
		this.matrixWorld || this.geodetic || (this.matrix || this.raw.matrix.compose(this.raw.position, this.raw.quaternion, this.raw.scale), this.raw.matrixWorld.copy(this.raw.matrix));
		let e = new Lt(), t = new j(), n = new j();
		this.raw.matrixWorld.decompose(n, e, t), this.rteAnchor.copy(n), _e(this.rteAnchor, this.rtePosHigh, this.rtePosLow), this.raw.matrixAutoUpdate = !1, this.raw.matrixWorldAutoUpdate = !1, this.raw.matrixWorld.compose(new j(0, 0, 0), e, t), this.raw.position.set(0, 0, 0), this.raw.quaternion.copy(e), this.raw.scale.copy(t);
	}
	reapplyGeodeticFrame() {
		super.reapplyGeodeticFrame(), this.captureAnchorFromMatrixWorld();
	}
	modifyMaterialForRTE(e) {
		if (this.rtePatchedMaterials.has(e)) return;
		let t = e.onBeforeCompile, n = e.customProgramCacheKey?.bind(e);
		e.onBeforeCompile = (n, r) => {
			t?.call(e, n, r), n.uniforms.u_cameraPositionHigh = this.rteUserData.cameraPositionHigh ?? { value: new j() }, n.uniforms.u_cameraPositionLow = this.rteUserData.cameraPositionLow ?? { value: new j() }, n.uniforms.rtePosHigh = { value: this.rtePosHigh }, n.uniforms.rtePosLow = { value: this.rtePosLow }, n.uniforms.modelViewMatrixRTE = this.rteUserData.modelViewMatrixRTE ?? { value: new E() }, n.uniforms.u_rteOne = v, n.vertexShader = fe(n.vertexShader).replace("#include <common>", `
          #include <common>
          ${xc}
          `).replace("#include <project_vertex>", bc).replace("#include <worldpos_vertex>", fe(qt.worldpos_vertex).replace("vec4 worldPosition = vec4( transformed, 1.0 );", "vec4 worldPosition = vec4( absTransformed, 1.0 );").replace("worldPosition = modelMatrix * worldPosition;", "").source).source;
		}, e.customProgramCacheKey = () => (n?.() ?? "") + "_nvr_rte_gltf", e.needsUpdate = !0, this.rtePatchedMaterials.add(e);
	}
	patchMaterials(e) {
		e.traverse((e) => {
			let t = e.material;
			if (!t) return;
			let n = Array.isArray(t) ? t : [t];
			for (let e of n) this.ctx.applyShadowMaterial(e), this.modifyMaterialForRTE(e);
		});
	}
	applyMaterialOverrides(e) {
		if (!e) return;
		let t = this.config.gltfModels;
		(t?.emissiveColor !== void 0 || t?.emissiveIntensity !== void 0 || t?.opacity !== void 0 || t?.transparent !== void 0) && e.traverse((e) => {
			let n = e.material;
			if (!n) return;
			let r = Array.isArray(n) ? n : [n];
			for (let e of r) {
				let n = e;
				n.emissive && (t.emissiveColor !== void 0 && n.emissive.set(t.emissiveColor.raw), t.emissiveIntensity !== void 0 && (n.emissiveIntensity = t.emissiveIntensity)), t.opacity !== void 0 && (e.opacity = t.opacity), t.transparent !== void 0 && (e.transparent = t.transparent, e.needsUpdate = !0);
			}
		});
	}
	installRTECallback(e) {
		let t = De(e, this.rteUserData, new E());
		t && (e.onBeforeRender = t);
	}
	setupShadowDepth(e) {
		let t = new j(), n = new E();
		e.onBeforeShadow = (r, i, a, o) => {
			e.castShadow && (t.setFromMatrixPosition(e.matrixWorld), n.copy(e.matrixWorld), n.setPosition(this.rteAnchor.x + t.x, this.rteAnchor.y + t.y, this.rteAnchor.z + t.z), e.modelViewMatrix.multiplyMatrices(o.matrixWorldInverse, n));
		};
	}
	async loadModel(e, t) {
		let n = await this.loader.loadAsync(e);
		if (zl(n)) {
			let t = Ve.enabled;
			Ve.enabled = !1;
			try {
				n = await this.loader.loadAsync(e);
			} finally {
				Ve.enabled = t;
			}
		}
		this.gltf = n, n.scene.traverse((e) => {
			e instanceof Xt && (this.hasSkinned = !0);
		}), n.scene.updateMatrixWorld(!0);
		let r = this.config.gltfModels?.children ?? [];
		this.hasSkinned ? this.initSkinnedPath(t, r) : this.initInstancedPath(t, r), this.configs = [...r], this.applyMaterialOverrides(t);
		let i = this.config.gltfModels;
		i?.animationAutoPlay && i.animationActiveClip && this.playAnimation(i.animationActiveClip), this.emit("needsUpdate"), this.emit("load");
	}
	createAnim(e) {
		Gn(this.gltf, "GLTF must be loaded before createAnim");
		let t = this.config.gltfModels, n = t?.animationSpeed ?? 1, r = t?.animationLoop ?? !0, i = new Me(e), a = /* @__PURE__ */ new Map();
		for (let e of this.gltf.animations) {
			let t = i.clipAction(e);
			t.setLoop(r ? Ct : St, Infinity), t.setEffectiveTimeScale(n), t.setEffectiveWeight(0), t.enabled = !0, a.set(e.name, t);
		}
		return {
			mixer: i,
			actions: a,
			currentAction: null
		};
	}
	playOn(e, t) {
		let n = e.actions.get(t);
		n && (e.currentAction && e.currentAction !== n && e.currentAction.stop(), n.reset(), n.setEffectiveWeight(1), n.play(), e.currentAction = n);
	}
	stopOn(e) {
		e.currentAction &&= (e.currentAction.stop(), null);
	}
	playAnimation(e) {
		if (this.anims.length !== 0) {
			if (!this.hasSkinned && !this.anims[0].actions.has(e)) {
				console.warn(`Animation "${e}" not found`);
				return;
			}
			for (let t of this.anims) this.playOn(t, e);
		}
	}
	stopAnimation() {
		for (let e of this.anims) this.stopOn(e);
	}
	initInstancedPath(e, t) {
		Gn(this.gltf, "GLTF must be loaded before initInstancedPath");
		let n = this.gltf;
		this.capacity = Math.max(t.length, Il);
		let r = this.config.gltfModels;
		n.scene.traverse((n) => {
			if (!(n instanceof D)) return;
			let i = n, a = i.matrixWorld.clone(), o = i.material, s = new ut(i.geometry, o, this.capacity);
			s.count = t.length, s.frustumCulled = !1, s.castShadow = r?.castShadow ?? !1, s.receiveShadow = r?.receiveShadow ?? !1;
			let c = Array.isArray(o) ? o : [o];
			for (let e of c) this.ctx.applyShadowMaterial(e), this.modifyMaterialForRTE(e);
			e.add(s), this.subMeshes.push({
				inst: s,
				sourceMesh: i,
				sourceLocal: a
			}), this.installRTECallback(s), this.setupShadowDepth(s);
		});
		for (let e = 0; e < t.length; e++) this.writeInstanceAt(e, t[e]);
		if (this.markAllInstancesDirty(), n.animations.length > 0 && this.anims.push(this.createAnim(n.scene)), this.config.pickable) {
			let n = this.subMeshes.map((e) => e.inst);
			this.pickWrapper = new _(e, n, t.length, this.ctx), this.ctx.registerPickableMesh(this.id, this.pickWrapper);
		}
	}
	composeInstanceTransform(e, t) {
		if (e.matrix) {
			t.copy(e.matrix);
			return;
		}
		let n = e.position;
		Bl.set(n?.x ?? 0, n?.y ?? 0, n?.z ?? 0);
		let r = e.rotation;
		r ? (Ul.set(r.x, r.y, r.z), Vl.setFromEuler(Ul)) : Vl.identity();
		let i = e.scale;
		Hl.set(i?.x ?? 1, i?.y ?? 1, i?.z ?? 1), t.compose(Bl, Vl, Hl);
	}
	applyTransformToObject(e, t) {
		this.composeInstanceTransform(t, Wl), Wl.decompose(e.position, e.quaternion, e.scale);
	}
	writeInstanceAt(e, t) {
		this.composeInstanceTransform(t, Wl);
		for (let { inst: t, sourceLocal: n } of this.subMeshes) Gl.multiplyMatrices(Wl, n), t.setMatrixAt(e, Gl);
		this.writeColorAt(e, t);
	}
	writeColorAt(e, t) {
		t.color ? Kl.set(t.color.raw) : Kl.setRGB(1, 1, 1);
		for (let { inst: n } of this.subMeshes) !t.color && !n.instanceColor || (n.setColorAt(e, Kl), n.instanceColor && (n.instanceColor.needsUpdate = !0));
	}
	resampleAndRewriteAll() {
		for (let { inst: e, sourceMesh: t } of this.subMeshes) {
			for (let n = 0; n < this.configs.length; n++) this.composeInstanceTransform(this.configs[n], Wl), Gl.multiplyMatrices(Wl, t.matrixWorld), e.setMatrixAt(n, Gl);
			e.instanceMatrix.needsUpdate = !0;
		}
	}
	markAllInstancesDirty() {
		for (let { inst: e } of this.subMeshes) e.instanceMatrix.needsUpdate = !0;
	}
	initSkinnedPath(e, t) {
		Gn(this.gltf, "GLTF must be loaded before initSkinnedPath"), this.patchMaterials(this.gltf.scene);
		for (let n of t) this.addSkinnedInstance(e, n);
		this.config.pickable && console.warn("InstancedGltfModelMeshDesc: picking is not supported for skinned GLTFs (fallback clone path).");
	}
	addSkinnedInstance(e, t) {
		Gn(this.gltf, "GLTF must be loaded before addSkinnedInstance");
		let n = Pl(this.gltf.scene);
		this.applyTransformToObject(n, t);
		let r = this.config.gltfModels, i = null;
		n.traverse((e) => {
			(e instanceof D || e instanceof Xt) && (e.castShadow = r?.castShadow ?? !1, e.receiveShadow = r?.receiveShadow ?? !1, e.frustumCulled = !1, this.setupShadowDepth(e), i ||= e);
		}), i && this.installRTECallback(i), e.add(n), this.skinnedScenes.push(n), this.anims.push(this.createAnim(n));
	}
	add(e) {
		if (this.hasSkinned) {
			let t = this.raw;
			Gn(t, "Must be created before add()"), this.addSkinnedInstance(t, e), this.configs.push(e);
			let n = this.config.gltfModels?.animationActiveClip;
			return n && this.playOn(this.anims[this.anims.length - 1], n), this.emit("needsUpdate"), this.configs.length - 1;
		}
		this.configs.length >= this.capacity && this.grow();
		let t = this.configs.length;
		this.configs.push(e);
		for (let { inst: e } of this.subMeshes) e.count = this.configs.length;
		return this.writeInstanceAt(t, e), this.markAllInstancesDirty(), this.pickWrapper?.addInstance(), this.emit("needsUpdate"), t;
	}
	removeAt(e) {
		if (e < 0 || e >= this.configs.length) throw Error(`Index ${e} out of bounds`);
		if (this.hasSkinned) {
			this.anims[e].mixer.stopAllAction(), this.raw?.remove(this.skinnedScenes[e]);
			let t = this.configs.length - 1;
			e !== t && (this.anims[e] = this.anims[t], this.skinnedScenes[e] = this.skinnedScenes[t], this.configs[e] = this.configs[t]), this.anims.pop(), this.skinnedScenes.pop(), this.configs.pop(), this.emit("needsUpdate");
			return;
		}
		let t = this.configs.length - 1;
		e !== t && (this.configs[e] = this.configs[t], this.writeInstanceAt(e, this.configs[e])), this.configs.pop();
		for (let { inst: e } of this.subMeshes) e.count = this.configs.length;
		this.markAllInstancesDirty(), this.pickWrapper?.removeInstanceAt(e), this.emit("needsUpdate");
	}
	updateAt(e, t) {
		if (e < 0 || e >= this.configs.length) throw Error(`Index ${e} out of bounds`);
		let n = {
			...this.configs[e],
			...t
		};
		this.configs[e] = n, this.hasSkinned ? this.applyTransformToObject(this.skinnedScenes[e], n) : (this.writeInstanceAt(e, n), this.markAllInstancesDirty()), this.emit("needsUpdate");
	}
	clear() {
		if (this.hasSkinned) {
			for (let e = 0; e < this.anims.length; e++) this.anims[e].mixer.stopAllAction(), this.raw?.remove(this.skinnedScenes[e]);
			this.anims = [], this.skinnedScenes = [], this.configs = [], this.emit("needsUpdate");
			return;
		}
		this.configs = [];
		for (let { inst: e } of this.subMeshes) e.count = 0, e.instanceMatrix.needsUpdate = !0;
		this.pickWrapper?.clearInstances(), this.emit("needsUpdate");
	}
	replaceAll(e) {
		if (this.hasSkinned) {
			this.clear();
			let t = this.raw;
			Gn(t, "Must be created before replaceAll()");
			for (let n of e) this.addSkinnedInstance(t, n);
			this.configs = [...e];
			let n = this.config.gltfModels?.animationActiveClip;
			n && this.playAnimation(n), this.emit("needsUpdate");
			return;
		}
		for (; e.length > this.capacity;) this.grow();
		this.configs = [...e];
		for (let { inst: t } of this.subMeshes) t.count = e.length;
		for (let t = 0; t < e.length; t++) this.writeInstanceAt(t, e[t]);
		this.markAllInstancesDirty(), this.pickWrapper?.replaceAll(e.length), this.emit("needsUpdate");
	}
	grow() {
		let e = Math.max(this.capacity * Ll, Il), t = this.configs.length, n = this.raw;
		Gn(n, "Must be created before growing");
		let r = [];
		for (let { inst: i, sourceMesh: a, sourceLocal: o } of this.subMeshes) {
			let s = new ut(i.geometry, i.material, e);
			s.count = t, s.frustumCulled = !1, s.castShadow = i.castShadow, s.receiveShadow = i.receiveShadow;
			let c = new E();
			for (let e = 0; e < t; e++) i.getMatrixAt(e, c), s.setMatrixAt(e, c);
			if (s.instanceMatrix.needsUpdate = !0, i.instanceColor) {
				for (let e = 0; e < t; e++) i.getColorAt(e, Kl), s.setColorAt(e, Kl);
				s.instanceColor && (s.instanceColor.needsUpdate = !0);
			}
			n.remove(i), n.add(s), i.dispose(), this.installRTECallback(s), this.setupShadowDepth(s), r.push({
				inst: s,
				sourceMesh: a,
				sourceLocal: o
			});
		}
		this.subMeshes = r, this.capacity = e, this.pickWrapper?.syncMeshes(this.subMeshes.map((e) => e.inst));
	}
	syncMorphTargets() {
		for (let { inst: e, sourceMesh: t } of this.subMeshes) t.morphTargetInfluences && (e.morphTargetInfluences = t.morphTargetInfluences, e.morphTargetDictionary = t.morphTargetDictionary);
	}
	update(e) {
		if (this.lastUpdateTime === void 0) {
			this.lastUpdateTime = e;
			return;
		}
		let t = (e - this.lastUpdateTime) / 1e3;
		if (this.lastUpdateTime = e, this.anims.length !== 0 && this.anims.some((e) => e.currentAction)) {
			for (let e of this.anims) e.mixer.update(t);
			this.hasSkinned || (this.gltf?.scene.updateMatrixWorld(!0), this.resampleAndRewriteAll(), this.syncMorphTargets()), this.emit("needsUpdate");
		}
	}
	onUpdateConfig(e) {
		if (e.gltfModels !== void 0) {
			let t = e.gltfModels;
			if (t.castShadow !== void 0 || t.receiveShadow !== void 0) {
				if (this.hasSkinned) for (let e of this.skinnedScenes) e.traverse((e) => {
					(e instanceof D || e instanceof Xt) && (t.castShadow !== void 0 && (e.castShadow = t.castShadow), t.receiveShadow !== void 0 && (e.receiveShadow = t.receiveShadow));
				});
				else for (let { inst: e } of this.subMeshes) t.castShadow !== void 0 && (e.castShadow = t.castShadow), t.receiveShadow !== void 0 && (e.receiveShadow = t.receiveShadow);
			}
			if (t.animationSpeed !== void 0) for (let e of this.anims) for (let n of e.actions.values()) n.setEffectiveTimeScale(t.animationSpeed);
			if (t.animationLoop !== void 0) {
				let e = t.animationLoop ? Ct : St;
				for (let t of this.anims) for (let n of t.actions.values()) n.setLoop(e, Infinity);
			}
			t.animationActiveClip !== void 0 && this.playAnimation(t.animationActiveClip), t.children !== void 0 && this.replaceAll(t.children), this.config.gltfModels = {
				...this.config.gltfModels,
				...t
			}, (t.emissiveColor !== void 0 || t.emissiveIntensity !== void 0 || t.opacity !== void 0 || t.transparent !== void 0) && this.applyMaterialOverrides(this.raw);
		}
		let t = e.matrix !== void 0 || e.matrixWorld !== void 0 || e.geodetic !== void 0 || e.position !== void 0 || e.scale !== void 0 || e.rotation !== void 0;
		super.onUpdateConfig(e), t && this.captureAnchorFromMatrixWorld();
	}
	onDestroy() {
		this.pickWrapper &&= (this.ctx.unregisterPickableMesh(this.id), void 0);
		for (let e of this.anims) e.mixer.stopAllAction(), e.actions.clear();
		this.anims = [], this.skinnedScenes = [];
		for (let { inst: e } of this.subMeshes) {
			let t = Array.isArray(e.material) ? e.material : [e.material];
			for (let e of t) this.ctx.removeShadowMaterial(e);
		}
		this.raw && this.raw.traverse((e) => {
			if (e instanceof ut) {
				e.geometry.dispose();
				let t = Array.isArray(e.material) ? e.material : [e.material];
				for (let e of t) e.dispose();
				e.dispose();
			}
		}), this.hasSkinned && this.gltf && this.gltf.scene.traverse((e) => {
			let t = e, n = t.material;
			if (n) {
				let e = Array.isArray(n) ? n : [n];
				for (let t of e) this.ctx.removeShadowMaterial(t), t.dispose();
			}
			t.geometry?.dispose();
		}), this.subMeshes = [], this.configs = [], super.onDestroy();
	}
}, Jl = class extends o {
	batchId;
	setPickable;
	constructor(e, t, n, r, i) {
		super(e, t, n), this.batchId = r, this.setPickable = i;
	}
	onBeforePicking() {
		this.setPickable(!0);
	}
	onAfterPicking() {
		this.setPickable(!1);
	}
	getRenderable() {
		return this;
	}
}, Yl = class extends D {
	batchId;
	setPickable;
	constructor(e, t, n, r) {
		super(e, t), this.batchId = n, this.setPickable = r;
	}
	onBeforePicking() {
		this.setPickable(!0);
	}
	onAfterPicking() {
		this.setPickable(!1);
	}
	getRenderable() {
		return this;
	}
};
function Xl(e, t, n) {
	e.setAttribute("attrBatchId", new C(new Float32Array(t).fill(n), 1));
}
function Zl(e, t) {
	e.removeShadowMaterial(t), t.dispose();
}
function Ql(e, t) {
	let n = new Ie(), r = new j();
	for (let i = 0; i < e.length; i += 3) r.set(e[i] + t[i], e[i + 1] + t[i + 1], e[i + 2] + t[i + 2]), n.expandByPoint(r);
	return n.getBoundingSphere(new Zt());
}
//#endregion
//#region src/meshes/featurePositions.ts
var $l = [
	"positions",
	"points",
	"geojson"
];
function eu(e) {
	return Array.isArray(e[0]);
}
function tu(e) {
	return e.length === 0 ? [] : eu(e) ? e : [e];
}
var nu = new E(), ru = new j();
function iu(e) {
	let t = new Float64Array(e.length * 3);
	for (let n = 0; n < e.length; n++) {
		let r = e[n];
		t[n * 3] = r.lng, t[n * 3 + 1] = r.lat, t[n * 3 + 2] = r.height;
	}
	return t;
}
function au(e, t) {
	let n = new Float64Array(e.length * 3);
	for (let r = 0; r < e.length; r++) {
		let i = e[r];
		t ? (ru.set(i.x, i.y, i.z).applyMatrix4(t), n[r * 3] = ru.x, n[r * 3 + 1] = ru.y, n[r * 3 + 2] = ru.z) : (n[r * 3] = i.x, n[r * 3 + 1] = i.y, n[r * 3 + 2] = i.z);
	}
	return n;
}
function ou(e) {
	return e.map(([e, t, n]) => ({
		lng: e,
		lat: t,
		height: n ?? 0
	}));
}
function su(e, t) {
	return t ? {
		rings: e.map((e) => au(e.map(ve), t)),
		geocentric: !0
	} : {
		rings: e.map(iu),
		geocentric: !1
	};
}
function cu(e, t = nu) {
	let n = t.equals(nu) ? void 0 : t;
	if ([
		e.positions !== void 0,
		e.points !== void 0,
		e.geojson !== void 0
	].filter(Boolean).length !== 1) throw Error("Set exactly one of `positions` (geodetic), `points` (cartesian) or `geojson`");
	if (e.positions !== void 0) return su(tu(e.positions), n);
	if (e.points !== void 0) return {
		rings: tu(e.points).map((e) => au(e, n)),
		geocentric: !0
	};
	let r = e.geojson;
	if (r === void 0) throw Error("unreachable: geojson is set");
	return su(r.type === "Polygon" ? r.coordinates.map(ou) : [ou(r.coordinates)], n);
}
function lu(e) {
	return e.rings.map((t) => {
		let n = [];
		for (let r = 0; r < t.length; r += 3) if (e.geocentric) {
			let e = Ae(new j(t[r], t[r + 1], t[r + 2]));
			n.push([
				e.lng,
				e.lat,
				e.height
			]);
		} else n.push([
			t[r],
			t[r + 1],
			t[r + 2]
		]);
		return n;
	});
}
//#endregion
//#region src/meshes/featureStyle.ts
function q(e) {
	return e.clampToGround ?? !0;
}
function uu(e, t) {
	let n = {};
	for (let r of Object.entries(e)) {
		if (t.includes(r[0])) continue;
		let e = r[1];
		n[r[0]] = typeof e == "object" && e && "toHex" in e ? e.toHex() : e;
	}
	return n.clampToGround = q(e), n;
}
//#endregion
//#region src/meshes/groundVolume.ts
var du = class {
	heights;
	view;
	volume;
	onChange;
	range;
	unobserve;
	constructor(e, t, n) {
		this.view = e, this.volume = t, this.onChange = n;
	}
	watch(e) {
		this.unobserve?.(), this.unobserve = void 0, this.range = void 0, this.heights = void 0, e && (this.update(this.view.sampleTerrainHeightRange(e) ?? {
			min: 0,
			max: 0
		}, e), this.onChange(), this.unobserve = this.view.observeTerrainHeightRange(e, (t) => {
			(this.range?.min !== t.min || this.range.max !== t.max) && (this.update(t, e), this.onChange());
		}));
	}
	update(e, t) {
		this.range = e, this.heights = this.volume(e, t);
	}
}, fu = [
	"clampToGround",
	"perPositionHeight",
	"height"
], pu = [...$l, "useGroundNormals"];
function mu(e) {
	return q(e) && (e.useGroundNormals ?? !0);
}
var hu = class extends p {
	config;
	pickBatchId;
	bakedTransform = new E();
	enhancer;
	ground = new du(this.view, Ce, () => {
		!this.enhancer || !this.config.polygon || (this.enhancer.update({ base: { minMaxHeight: this.minMaxHeight(this.config.polygon) } }), this.emit("needsUpdate"));
	});
	constructor(e, t, n) {
		n.polygon?.effectIds && (n.effectIds = n.polygon.effectIds), super(e, t, n), this.config = n;
	}
	get batchId() {
		return this.pickBatchId;
	}
	get style() {
		let e = this.config.polygon;
		if (!e) throw Error("PolygonMesh configuration is required");
		return e;
	}
	getPassKey() {
		return q(this.style) ? "draped" : super.getPassKey();
	}
	getRequiredBuffers() {
		return mu(this.style) ? ["globeNormal"] : [];
	}
	createMesh() {
		let e = this.style;
		this.pickBatchId = this.config.pickable ? this.ctx.genGlobalBatchId() : void 0;
		let t = this.composeTransform(), n = this.buildGeometry(e, t);
		this.bakedTransform = t, this.ground.watch(q(e) ? n.extent : void 0);
		let { material: r, enhancer: i } = this.createMaterial(e), a = new Jl(n.geometry, r, q(e), this.pickBatchId ?? 0, (e) => this.enhancer?.update({ base: { pickable: e } }));
		return a.customDepthMaterial = pe(r), a.castShadow = e.castShadow ?? !1, a.receiveShadow = e.receiveShadow ?? !1, a.frustumCulled = !1, this.wireRte(a, i), this.pickBatchId !== void 0 && this.ctx.registerPickableMesh(this.id, a), a;
	}
	createMaterial(e) {
		let t = new Ot();
		Te(t, e.useGroundNormals ?? !0);
		let n = ue(t);
		return n.mount({
			base: {
				...this.baseProps(e),
				useRTE: !0,
				isTexturized: !1,
				pickable: !1
			},
			water: {
				...this.waterProps(e),
				timeUniform: this.ctx.getTimeUniform(),
				skyEnvMap: this.ctx.getSkyEnvMapTextureUniform().value
			}
		}), this.enhancer = n, t.customProgramCacheKey = n.programCacheKey, t.onBeforeCompile = n.transformShader, this.ctx.applyShadowMaterial(t), {
			material: t,
			enhancer: n
		};
	}
	wireRte(e, t) {
		let { base: n } = t.states(), { base: r } = t.mutates(), i = Oe(e, (e, t, i) => r.updateRteUniforms(e, t, i, n));
		e.onBeforeRender = i, e.onBeforeShadow = i;
	}
	waterProps(e) {
		return {
			water: e.water,
			waterScaleNormal: e.waterScaleNormal,
			waterSpeed: e.waterSpeed,
			shininess: e.shininess,
			specularStrength: e.specularStrength,
			applyWaterNormal: e.applyWaterNormal,
			specular: e.specular,
			ior: e.ior
		};
	}
	baseProps(e) {
		return {
			color: e.color?.toHex(),
			opacity: e.opacity,
			transparent: e.transparent,
			wireframe: e.wireframe,
			clampToGround: !1,
			reflectivity: e.reflectivity,
			roughness: e.roughness,
			emissiveColor: e.emissiveColor?.toHex(),
			emissiveIntensity: e.emissiveIntensity,
			minMaxHeight: this.minMaxHeight(e),
			effectIdsMask: this.effectIdsMask()
		};
	}
	effectIdsMask() {
		return this._effectIds.length > 0 ? this.ctx.selectiveEffectRegistry.computeMask(this._effectIds) : 0;
	}
	updateEffectIdsMask() {
		this.enhancer && (this.enhancer.update({ base: { effectIdsMask: this.effectIdsMask() } }), this.emit("needsUpdate"));
	}
	minMaxHeight(e) {
		let t = e.height ?? 0, n = e.extrudedHeight ?? 0;
		if (!q(e)) return [t, t + n];
		let r = this.ground.heights;
		if (!r) throw Error("PolygonMesh: the ground volume is read before it is watched");
		return [Math.min(r[0], t), Math.max(r[1], n)];
	}
	applyTransform() {
		let e = this.composeTransform();
		!this._instance || e.equals(this.bakedTransform) || (this.replaceGeometry(this.buildGeometry(this.style, e)), this.bakedTransform = e, this.emit("needsUpdate"));
	}
	replaceGeometry(e) {
		this._instance && (this._instance.geometry.dispose(), this._instance.geometry = e.geometry, this.ground.watch(q(this.style) ? e.extent : void 0));
	}
	buildGeometry(e, t) {
		let { rings: n, geocentric: r } = cu(e, t), i = re(n, r, uu(e, pu));
		if (!i) throw Error("PolygonMesh: the outer ring has fewer than three vertices, or all of them are collinear");
		let a = new ze();
		return a.setAttribute("position_3d_high", new C(i.positionHigh, 3)), a.setAttribute("position_3d_low", new C(i.positionLow, 3)), i.normal && a.setAttribute("normal", new C(i.normal, 3)), a.setAttribute("scaleNormalAndCap", new C(i.scaleNormalAndCap, 4)), a.setIndex(new C(i.indices, 1)), Xl(a, i.positionHigh.length / 3, this.pickBatchId ?? 0), a.boundingSphere = Ql(i.positionHigh, i.positionLow), {
			geometry: a,
			extent: i.extent
		};
	}
	onUpdateConfig(e) {
		let t = e.polygon;
		if (t && this._instance && this.enhancer) {
			let n = this.style, r = $l.some((e) => t[e] !== void 0) || fu.some((e) => t[e] !== void 0 && t[e] !== n[e]), i = q(n), a = mu(n), o = { ...n };
			if ($l.some((e) => t[e] !== void 0)) for (let e of $l) t[e] === void 0 && (o[e] = void 0);
			Object.assign(o, t);
			let s = r ? this.buildGeometry(o, this.bakedTransform) : void 0;
			Object.assign(n, o);
			let c = q(n);
			if (this._instance.drapedEnable = c, s && this.replaceGeometry(s), c !== i) {
				Zl(this.ctx, this._instance.material), this._instance.customDepthMaterial?.dispose();
				let { material: e, enhancer: t } = this.createMaterial(n);
				this._instance.material = e, this._instance.customDepthMaterial = pe(e), this.wireRte(this._instance, t), this.applyLit();
			} else Te(this._instance.material, n.useGroundNormals ?? !0), this.enhancer.update({
				base: this.baseProps(n),
				water: this.waterProps(n)
			});
			c === i && mu(n) !== a && this.ctx.emit("gbufferRequirementsChanged"), t.castShadow !== void 0 && (this._instance.castShadow = t.castShadow), t.receiveShadow !== void 0 && (this._instance.receiveShadow = t.receiveShadow), t.effectIds !== void 0 && (e.effectIds = t.effectIds), this.emit("needsUpdate");
		}
		let { position: n, rotation: r, scale: i, ...a } = e;
		super.onUpdateConfig(a), n !== void 0 && (this.position = n), r !== void 0 && (this.rotation = r), i !== void 0 && (this.scale = i), this.applyTransform();
	}
	toGeoJSON() {
		return {
			type: "Polygon",
			coordinates: lu(cu(this.style, this.composeTransform()))
		};
	}
	disposeMesh() {
		this._instance && (this._instance.geometry.dispose(), Zl(this.ctx, this._instance.material), this._instance.customDepthMaterial?.dispose());
	}
	onDestroy() {
		this.ground.watch(void 0), this.pickBatchId !== void 0 && (this.ctx.unregisterPickableMesh(this.id), this.pickBatchId = void 0), this.disposeMesh(), super.onDestroy();
	}
}, gu = [
	"clampToGround",
	"height",
	"ring"
], _u = [
	...$l,
	"ring",
	"useGroundNormals"
];
function vu(e) {
	return (e.castShadow ?? !1) && !q(e);
}
function yu(e) {
	return q(e) && (e.useGroundNormals ?? !1);
}
var bu = class extends p {
	config;
	pickBatchId;
	bakedTransform = new E();
	enhancer;
	ground = new du(this.view, we, () => {
		!this.enhancer || !this.config.polyline || (this.enhancer.update({ base: { minMaxHeight: this.minMaxHeight(this.config.polyline) } }), this.emit("needsUpdate"));
	});
	constructor(e, t, n) {
		n.polyline?.effectIds && (n.effectIds = n.polyline.effectIds), super(e, t, n), this.config = n;
	}
	get batchId() {
		return this.pickBatchId;
	}
	get style() {
		let e = this.config.polyline;
		if (!e) throw Error("PolylineMesh configuration is required");
		return e;
	}
	getPassKey() {
		return "mrt";
	}
	createMesh() {
		let e = this.style;
		this.pickBatchId = this.config.pickable ? this.ctx.genGlobalBatchId() : void 0;
		let t = this.composeTransform(), n = this.buildGeometry(e, t);
		this.bakedTransform = t, this.ground.watch(q(e) ? n.extent : void 0);
		let r = new O();
		r.lights = !0;
		let i = new Yl(n.geometry, r, this.pickBatchId ?? 0, (e) => this.enhancer?.update({ base: { pickable: e } }));
		i.castShadow = vu(e), i.receiveShadow = e.receiveShadow ?? !1, i.frustumCulled = !1;
		let a = de(r);
		a.mount({ base: {
			...this.baseProps(e),
			useRTE: !0,
			isTexturized: !1,
			pickable: !1,
			groundCulling: q(e),
			useGroundNormals: e.useGroundNormals,
			viewportAndPixelRatio: this.ctx.getViewportAndPixelRatioUniform(),
			frustumNearFar: this.ctx.getFrustumNearFarUniform(),
			frustumRatio: this.ctx.getFrustumRatioUniform(),
			globeDepth: this.ctx.getGlobeDepthTextureUniform(),
			globeNormal: this.ctx.getGlobeNormalTextureUniform(),
			inverseProjectionMatrix: this.ctx.getInverseProjectionMatrixUniform()
		} }), this.enhancer = a;
		let o = a.mutates();
		o.updateUniforms(r.uniforms, a.states());
		let s = a.states(), c = Oe(i, (e, t, n) => o.updateRteUniforms(e, t, n, s), new E(), new E());
		return i.onBeforeRender = c, i.onBeforeShadow = c, r.customProgramCacheKey = a.programCacheKey, r.onBeforeCompile = a.transformShader, this.ctx.applyShadowMaterial(r), this.pickBatchId !== void 0 && this.ctx.registerPickableMesh(this.id, i), i;
	}
	getRequiredBuffers() {
		return yu(this.style) ? ["globeNormal"] : [];
	}
	baseProps(e) {
		return {
			color: e.color?.toHex(),
			opacity: e.opacity,
			transparent: e.transparent,
			depthWrite: e.depthWrite,
			width: e.width,
			maxWidth: e.maxWidth,
			addHeight: q(e) ? 0 : e.height ?? 0,
			emissiveColor: e.emissiveColor?.toHex(),
			emissiveIntensity: e.emissiveIntensity,
			minMaxHeight: this.minMaxHeight(e),
			effectIdsMask: this.effectIdsMask()
		};
	}
	effectIdsMask() {
		return this._effectIds.length > 0 ? this.ctx.selectiveEffectRegistry.computeMask(this._effectIds) : 0;
	}
	updateEffectIdsMask() {
		this.enhancer && (this.enhancer.update({ base: { effectIdsMask: this.effectIdsMask() } }), this.emit("needsUpdate"));
	}
	minMaxHeight(e) {
		if (!q(e)) return [0, 0];
		let t = this.ground.heights;
		if (!t) throw Error("PolylineMesh: the ground volume is read before it is watched");
		return t;
	}
	applyTransform() {
		let e = this.composeTransform();
		!this._instance || e.equals(this.bakedTransform) || (this.replaceGeometry(this.buildGeometry(this.style, e)), this.bakedTransform = e, this.emit("needsUpdate"));
	}
	replaceGeometry(e) {
		this._instance && (this._instance.geometry.dispose(), this._instance.geometry = e.geometry, this.ground.watch(q(this.style) ? e.extent : void 0));
	}
	buildGeometry(e, t) {
		let n = cu(e, t);
		if (n.rings.length !== 1) throw Error("PolylineMesh takes a single line; add one mesh per part of a multi-line");
		let r = ie(n.rings[0], n.geocentric, e.ring ?? !1, uu(e, _u));
		if (!r) throw Error("PolylineMesh: fewer than two distinct positions");
		let i = new ze();
		return i.setAttribute("position", new C(r.position, 3)), i.setAttribute("position_3d_high", new C(r.positionHigh, 3)), i.setAttribute("position_3d_low", new C(r.positionLow, 3)), i.setAttribute("start_3d_high", new C(r.startHigh, 3)), i.setAttribute("start_3d_low", new C(r.startLow, 3)), i.setAttribute("end_3d_high", new C(r.endHigh, 3)), i.setAttribute("end_3d_low", new C(r.endLow, 3)), i.setAttribute("start_normal", new C(r.startNormal, 3)), i.setAttribute("end_normal_and_texture_coordinate_normalization_x", new C(r.endNormalAndTextureCoordinateNormalizationX, 4)), i.setAttribute("right_normal_and_texture_coordinate_normalization_y", new C(r.rightNormalAndTextureCoordinateNormalizationY, 4)), i.setIndex(new C(r.indices, 1)), Xl(i, r.position.length / 3, this.pickBatchId ?? 0), i.computeBoundingSphere(), {
			geometry: i,
			extent: r.extent
		};
	}
	onUpdateConfig(e) {
		let t = e.polyline;
		if (t && this._instance && this.enhancer) {
			let n = this.style, r = $l.some((e) => t[e] !== void 0) || gu.some((e) => t[e] !== void 0 && t[e] !== n[e]), i = yu(n), a = { ...n };
			if ($l.some((e) => t[e] !== void 0)) for (let e of $l) t[e] === void 0 && (a[e] = void 0);
			Object.assign(a, t);
			let o = r ? this.buildGeometry(a, this.bakedTransform) : void 0;
			Object.assign(n, a);
			let s = q(n);
			o && this.replaceGeometry(o), yu(n) !== i && this.ctx.emit("gbufferRequirementsChanged"), this.enhancer.update({ base: {
				...this.baseProps(n),
				groundCulling: s,
				useGroundNormals: n.useGroundNormals
			} }), this._instance.castShadow = vu(n), this._instance.receiveShadow = n.receiveShadow ?? !1, t.effectIds !== void 0 && (e.effectIds = t.effectIds), this.emit("needsUpdate");
		}
		let { position: n, rotation: r, scale: i, ...a } = e;
		super.onUpdateConfig(a), n !== void 0 && (this.position = n), r !== void 0 && (this.rotation = r), i !== void 0 && (this.scale = i), this.applyTransform();
	}
	toGeoJSON() {
		let [e] = lu(cu(this.style, this.composeTransform()));
		return {
			type: "LineString",
			coordinates: e
		};
	}
	disposeMesh() {
		this._instance && (this._instance.geometry.dispose(), Zl(this.ctx, this._instance.material));
	}
	onDestroy() {
		this.ground.watch(void 0), this.pickBatchId !== void 0 && (this.ctx.unregisterPickableMesh(this.id), this.pickBatchId = void 0), this.disposeMesh(), super.onDestroy();
	}
}, xu = { enabled: !0 }, Su = (e) => {
	switch (e) {
		case "luma": return hn.LUMA;
		case "depth": return hn.DEPTH;
		default: return hn.COLOR;
	}
}, Cu = (e) => {
	if (!e) return kn.MEDIUM;
	switch (e) {
		case "low": return kn.LOW;
		case "medium": return kn.MEDIUM;
		case "high": return kn.HIGH;
		case "ultra": return kn.ULTRA;
	}
}, wu = class extends s {
	constructor(e, t) {
		super(e, new yn(), t);
	}
}, Tu = class extends s {
	constructor(e, t) {
		super(e, new On(), t);
	}
	onMounted() {
		this.edgeDetectionMode = this.options.edgeDetectionMode, this.quality = this.options.quality;
	}
	get quality() {
		return this.options.quality;
	}
	set quality(e) {
		this.options.quality !== e && (this.options.quality = e, this.rawEffect.applyPreset(Cu(this.options.quality)), this.emit("needsUpdate"));
	}
	get edgeDetectionMode() {
		return this.options.edgeDetectionMode;
	}
	set edgeDetectionMode(e) {
		this.options.edgeDetectionMode !== e && (this.options.edgeDetectionMode = e, this.rawEffect.edgeDetectionMaterial.edgeDetectionMode = Su(this.options.edgeDetectionMode), this.emit("needsUpdate"));
	}
}, Eu = "uniform sampler2D nvrShadowBuffer;\nuniform float nvrShadowSoftness;\n\nconst float NVR_SHADOW_DEPTH_TOLERANCE = 0.02;\n\nfloat nvrReadViewZ(const vec2 uv) {\n  return getViewZ(readDepth(uv));\n}\n\nfloat nvrFilterShadow(const vec2 uv, const float centerShadow) {\n  #if NVR_SHADOW_TAP_COUNT > 0\n  float centerViewZ = nvrReadViewZ(uv);\n  float threshold = NVR_SHADOW_DEPTH_TOLERANCE * max(abs(centerViewZ), 1.0);\n  vec2 radius = nvrShadowSoftness * texelSize;\n  float sum = centerShadow;\n  float weight = 1.0;\n  for (int i = 0; i < NVR_SHADOW_TAP_COUNT; ++i) {\n    vec2 tapUv = uv + vogelDisk(i, NVR_SHADOW_TAP_COUNT, 0.0) * radius;\n    vec4 tap = texture(nvrShadowBuffer, tapUv);\n    float tapShadow = tap.r;\n    float tapDeferredLit = step(0.5, tap.g);\n    \n    float sameSurface = step(abs(nvrReadViewZ(tapUv) - centerViewZ), threshold);\n    \n    \n    \n    float w = sameSurface * tapDeferredLit;\n    sum += tapShadow * w;\n    weight += w;\n  }\n  return sum / weight;\n  #else \n  return centerShadow;\n  #endif \n}\n\nuniform float nvrShadowIntensity;\nuniform float nvrSpecularIntensity;\n\n#ifdef NVR_SPECULAR\n\nconst float NVR_MIN_REFLECTIVITY = 0.01;\nconst float NVR_MIN_ROUGHNESS = 0.02;\n\nconst float NVR_MAX_SPECULAR_BRDF = 1024.0;\n\nfloat nvr_D_GGX(const float a2, const float dotNH) {\n  float denom = dotNH * dotNH * (a2 - 1.0) + 1.0;\n  return RECIPROCAL_PI * a2 / (denom * denom);\n}\n\nfloat nvr_V_GGX(const float a2, const float dotNL, const float dotNV) {\n  float gv = dotNV * sqrt(a2 + (1.0 - a2) * dotNL * dotNL);\n  float gl = dotNL * sqrt(a2 + (1.0 - a2) * dotNV * dotNV);\n  return 0.5 / max(gv + gl, EPSILON);\n}\n\nvec3 nvr_F_Schlick(const vec3 f0, const float dotVH) {\n  return f0 + (1.0 - f0) * pow(1.0 - dotVH, 5.0);\n}\n\nvec3 nvrSunSpecularBrdf(\n  const float reflectance,\n  const float roughness,\n  const vec3 normal,\n  const vec3 viewDirection,\n  const float dotNL\n) {\n  float dotNV = dot(normal, viewDirection);\n  if (dotNV <= 0.0) {\n    return vec3(0.0);\n  }\n  vec3 halfDirection = normalize(sunDirection + viewDirection);\n  float dotNH = clamp(dot(normal, halfDirection), 0.0, 1.0);\n  float dotVH = clamp(dot(viewDirection, halfDirection), 0.0, 1.0);\n\n  float alpha2 = pow(clamp(roughness, NVR_MIN_ROUGHNESS, 1.0), 4.0);\n\n  float D = nvr_D_GGX(alpha2, dotNH);\n  vec3 F = nvr_F_Schlick(vec3(reflectance), dotVH);\n  float V = nvr_V_GGX(alpha2, dotNL, dotNV);\n  return min((D * V) * F, vec3(NVR_MAX_SPECULAR_BRDF));\n}\n\n#endif \n\n#if defined(SUN_LIGHT) && defined(SKY_LIGHT) && defined(HAS_NORMALS)\n\nvec3 nvrGetSunSkyIrradiance(\n  const vec2 uv,\n  const vec3 positionECEF,\n  const vec3 normalECEF,\n  const vec3 inputColor,\n  const float sunTransmittance\n) {\n  \n  vec3 diffuse = inputColor * albedoScale * RECIPROCAL_PI;\n  vec3 skyIrradiance;\n  vec3 sunIrradiance = GetSunAndSkyIrradiance(\n    positionECEF,\n    normalECEF,\n    sunDirection,\n    skyIrradiance\n  );\n  #ifdef HAS_SHADOW\n  \n  sunIrradiance *= sunTransmittance;\n  #endif \n\n  vec4 shadowSample = texture(nvrShadowBuffer, uv);\n  \n  \n  float shadowAmount = shadowSample.r;\n  bool deferredLit = shadowSample.g >= 0.5;\n\n  #ifdef NVR_SHADOW\n  if (deferredLit) {\n    float shadow = clamp(\n      nvrFilterShadow(uv, shadowAmount) * nvrShadowIntensity,\n      0.0,\n      1.0\n    );\n    \n    sunIrradiance *= 1.0 - shadow;\n  }\n  #endif \n\n  vec3 radiance = diffuse * (sunIrradiance + skyIrradiance);\n\n  #ifdef NVR_SPECULAR\n  if (deferredLit) {\n    \n    vec4 surface = texture(normalBuffer, uv);\n    float reflectance = surface.b;\n    float roughness = surface.a;\n    vec3 normal = normalize(normalECEF);\n    float dotNL = dot(normal, sunDirection);\n    if (reflectance >= NVR_MIN_REFLECTIVITY && dotNL > 0.0) {\n      vec3 viewDirection = normalize(vCameraPosition - positionECEF);\n      vec3 brdf = nvrSunSpecularBrdf(\n        reflectance,\n        roughness,\n        normal,\n        viewDirection,\n        dotNL\n      );\n      \n      \n      radiance += brdf * sunIrradiance * (albedoScale * nvrSpecularIntensity);\n    }\n  }\n  #endif \n\n  return radiance;\n}\n\n#endif", Du = {
	shadow: !1,
	shadowIntensity: 1,
	shadowSoftness: 1.5,
	shadowSamples: 12,
	specular: !1,
	specularIntensity: 1
}, Ou = "void mainImage(const vec4 inputColor, const vec2 uv, out vec4 outputColor) {", ku = "radiance = getSunSkyIrradiance(positionECEF, normalECEF, inputColor.rgb, sunTransmittance);";
function Au(e) {
	return fe(e).replace(Ou, `
// The host declares this one under HAS_SHADOW.
#ifndef HAS_SHADOW
${Fo}
#endif // HAS_SHADOW

${Eu}

${Ou}
`).replace(ku, `
    #if (defined(NVR_SHADOW) || defined(NVR_SPECULAR)) && defined(SUN_LIGHT) && defined(SKY_LIGHT) && defined(HAS_NORMALS)
    radiance = nvrGetSunSkyIrradiance(uv, positionECEF, normalECEF, inputColor.rgb, sunTransmittance);
    #else
    ${ku}
    #endif
`).source;
}
var ju = class extends is {
	_shadow;
	_shadowSoftness;
	_shadowSamples;
	_specular;
	constructor(e, t, n) {
		super(e, t);
		let { shadow: r, shadowIntensity: i, shadowSoftness: a, shadowSamples: o, specular: s, specularIntensity: c } = {
			...Du,
			...n
		};
		this.setFragmentShader(Au(this.getFragmentShader()));
		let l = this.lightingUniforms;
		l.set("nvrShadowBuffer", new k(null)), l.set("nvrShadowIntensity", new k(i)), l.set("nvrShadowSoftness", new k(a)), l.set("nvrSpecularIntensity", new k(c)), this._shadow = r, this._shadowSoftness = a, this._shadowSamples = o, this._specular = s, this.applyLightingDefines();
	}
	get lightingUniforms() {
		return this.uniforms;
	}
	applyLightingDefines() {
		let { defines: e } = this;
		e.set("NVR_SHADOW_TAP_COUNT", `${this._shadowSoftness > 0 ? Math.max(0, Math.round(this._shadowSamples)) : 0}`), Mu(e, "NVR_SHADOW", this._shadow), Mu(e, "NVR_SPECULAR", this._specular), this.setChanged();
	}
	setShadowBuffer(e) {
		let t = this.lightingUniforms.get("nvrShadowBuffer");
		t && (t.value = e);
	}
	get shadowTerm() {
		return this._shadow;
	}
	set shadowTerm(e) {
		this._shadow !== e && (this._shadow = e, this.applyLightingDefines());
	}
	get shadowIntensity() {
		return this.lightingUniforms.get("nvrShadowIntensity")?.value;
	}
	set shadowIntensity(e) {
		let t = this.lightingUniforms.get("nvrShadowIntensity");
		t && (t.value = e);
	}
	get shadowSoftness() {
		return this._shadowSoftness;
	}
	set shadowSoftness(e) {
		let t = this.lightingUniforms.get("nvrShadowSoftness");
		t && (t.value = e);
		let n = this._shadowSoftness > 0;
		this._shadowSoftness = e, n !== e > 0 && this.applyLightingDefines();
	}
	get shadowSamples() {
		return this._shadowSamples;
	}
	set shadowSamples(e) {
		this._shadowSamples !== e && (this._shadowSamples = e, this.applyLightingDefines());
	}
	get specularTerm() {
		return this._specular;
	}
	set specularTerm(e) {
		this._specular !== e && (this._specular = e, this.applyLightingDefines());
	}
	get specularIntensity() {
		return this.lightingUniforms.get("nvrSpecularIntensity")?.value;
	}
	set specularIntensity(e) {
		let t = this.lightingUniforms.get("nvrSpecularIntensity");
		t && (t.value = e);
	}
};
function Mu(e, t, n) {
	n ? e.set(t, "1") : e.delete(t);
}
//#endregion
//#region src/effects/aerialPerspective/effect.ts
var Nu = {
	enabled: !0,
	inscatter: !0,
	transmittance: !0,
	irradiance: !1,
	sky: !1,
	sun: !0,
	moon: !0,
	useNormalBuffer: !0,
	albedoScale: 2 / Math.PI,
	...Du
}, Pu = class extends m {
	atmosphere;
	cloudsShadows = !0;
	normalBuffer;
	constructor(e, t, n, r = {}) {
		let i = {
			...Nu,
			...r
		}, o = new ju(t, { octEncodedNormal: !0 }, i), s = new a(t, o);
		super(s, o, i), this.atmosphere = e, this.normalBuffer = n, this.options = i, this.init(), this.onUpdate();
	}
	onUpdate = () => {
		this.emit("needsUpdate");
	};
	init() {
		this.inscatter = !!this.options.inscatter, this.transmittance = !!this.options.transmittance, this.irradiance = !!this.options.irradiance, this.sky = !!this.options.sky, this.sun = !!this.options.sun, this.moon = !!this.options.moon, this.albedoScale = this.options.albedoScale ?? Nu.albedoScale, this.useNormalBuffer = this.options.useNormalBuffer ?? Nu.useNormalBuffer, this.atmosphere.onTexturesReady((e) => this.onTextureLoaded(e), {
			transmittance: !0,
			scattering: !0,
			higherOrderScattering: !0
		}), this.atmosphere.overlay.on("changed", this.onOverlayChanged), this.atmosphere.shadow.on("changed", this.onShadowChanged), this.atmosphere.shadowLength.on("changed", this.onShadowLengthChanged), this.atmosphere.enableShadows.on("changed", this.onEnableShadowChanged);
	}
	onTextureLoaded = (e) => {
		Object.assign(this.rawEffect, e);
	};
	onOverlayChanged = (e) => {
		this.rawEffect.overlay = e;
	};
	onShadowChanged = (e) => {
		this.cloudsShadows ? this.rawEffect.shadow = e : this.rawEffect.shadow = null;
	};
	onShadowLengthChanged = (e) => {
		this.rawEffect.shadowLength = e;
	};
	onEnableShadowChanged = (e) => {
		this.cloudsShadows = e, e ? this.rawEffect.shadow = this.atmosphere.shadow.value : this.rawEffect.shadow = null;
	};
	_update() {
		this.enabled && (this.rawEffect?.sunDirection.copy(this.atmosphere.sunDirection), this.rawEffect?.moonDirection.copy(this.atmosphere.moonDirection));
	}
	get inscatter() {
		return this.options.inscatter ?? Nu.inscatter;
	}
	set inscatter(e) {
		this.rawEffect && (this.options.inscatter = e, this.rawEffect.inscatter = e, this.onUpdate());
	}
	get transmittance() {
		return this.options.transmittance ?? Nu.transmittance;
	}
	set transmittance(e) {
		this.rawEffect && (this.options.transmittance = e, this.rawEffect.transmittance = e, this.onUpdate());
	}
	get irradiance() {
		return this.options.irradiance ?? Nu.irradiance;
	}
	set irradiance(e) {
		this.rawEffect && (this.options.irradiance = e, this.rawEffect.sunLight = e, this.rawEffect.skyLight = e, e && this.atmosphere.onTexturesReady((e) => this.onTextureLoaded(e), { irradiance: !0 }), this.onUpdate());
	}
	get sky() {
		return this.options.sky ?? Nu.sky;
	}
	set sky(e) {
		this.rawEffect && (this.options.sky = e, this.rawEffect.sky = e, this.onUpdate());
	}
	get sun() {
		return this.options.sun ?? Nu.sun;
	}
	set sun(e) {
		this.rawEffect && (this.options.sun = e, this.rawEffect.sun = e, this.onUpdate());
	}
	get moon() {
		return this.options.moon ?? Nu.moon;
	}
	set moon(e) {
		this.rawEffect && (this.options.moon = e, this.rawEffect.moon = e, this.onUpdate());
	}
	get albedoScale() {
		return this.options.albedoScale ?? Nu.albedoScale;
	}
	set albedoScale(e) {
		this.rawEffect && (this.options.albedoScale = e, this.rawEffect.albedoScale = e, this.onUpdate());
	}
	setNormalBuffer(e) {
		this.normalBuffer = e, this.rawEffect && (this.rawEffect.normalBuffer = this.useNormalBuffer ? e : null);
	}
	get useNormalBuffer() {
		return this.options.useNormalBuffer ?? Nu.useNormalBuffer;
	}
	set useNormalBuffer(e) {
		this.rawEffect && (this.options.useNormalBuffer = e, this.rawEffect.normalBuffer = e ? this.normalBuffer : null, this.onUpdate());
	}
}, Fu = class {
	events = {};
	onceEvents = {};
	on(e, t) {
		this.events[e] || (this.events[e] = /* @__PURE__ */ new Set()), this.events[e].add(t);
	}
	off(e, t) {
		this.events[e]?.delete(t), this.onceEvents[e]?.delete(t);
	}
	clear(e) {
		this.events[e]?.clear(), this.onceEvents[e]?.clear();
	}
	size(e) {
		return this.events[e]?.size || this.onceEvents[e]?.size;
	}
	once(e, t) {
		this.onceEvents[e] || (this.onceEvents[e] = /* @__PURE__ */ new Set()), this.onceEvents[e].add(t);
	}
	emit(e, ...t) {
		this.events[e]?.forEach((e) => e(...t)), this.onceEvents[e]?.size && (this.onceEvents[e]?.forEach((e) => e(...t)), this.onceEvents[e]?.clear());
	}
};
function Iu(e, t) {
	return e == null || t == null ? NaN : e < t ? -1 : e > t ? 1 : e >= t ? 0 : NaN;
}
function Lu(e, t) {
	return e == null || t == null ? NaN : t < e ? -1 : t > e ? 1 : t >= e ? 0 : NaN;
}
function Ru(e) {
	let t, n, r;
	e.length === 2 ? (t = e === Iu || e === Lu ? e : zu, n = e, r = e) : (t = Iu, n = (t, n) => Iu(e(t), n), r = (t, n) => e(t) - n);
	function i(e, r, i = 0, a = e.length) {
		if (i < a) {
			if (t(r, r) !== 0) return a;
			do {
				let t = i + a >>> 1;
				n(e[t], r) < 0 ? i = t + 1 : a = t;
			} while (i < a);
		}
		return i;
	}
	function a(e, r, i = 0, a = e.length) {
		if (i < a) {
			if (t(r, r) !== 0) return a;
			do {
				let t = i + a >>> 1;
				n(e[t], r) <= 0 ? i = t + 1 : a = t;
			} while (i < a);
		}
		return i;
	}
	function o(e, t, n = 0, a = e.length) {
		let o = i(e, t, n, a - 1);
		return o > n && r(e[o - 1], t) > -r(e[o], t) ? o - 1 : o;
	}
	return {
		left: i,
		center: o,
		right: a
	};
}
function zu() {
	return 0;
}
function Bu(e) {
	return e === null ? NaN : +e;
}
var Vu = Ru(Iu);
Vu.right, Vu.left, Ru(Bu).center;
var Hu = { value: () => {} };
function Uu() {
	for (var e = 0, t = arguments.length, n = {}, r; e < t; ++e) {
		if (!(r = arguments[e] + "") || r in n || /[\s.]/.test(r)) throw Error("illegal type: " + r);
		n[r] = [];
	}
	return new Wu(n);
}
function Wu(e) {
	this._ = e;
}
function Gu(e, t) {
	return e.trim().split(/^|\s+/).map(function(e) {
		var n = "", r = e.indexOf(".");
		if (r >= 0 && (n = e.slice(r + 1), e = e.slice(0, r)), e && !t.hasOwnProperty(e)) throw Error("unknown type: " + e);
		return {
			type: e,
			name: n
		};
	});
}
Wu.prototype = Uu.prototype = {
	constructor: Wu,
	on: function(e, t) {
		var n = this._, r = Gu(e + "", n), i, a = -1, o = r.length;
		if (arguments.length < 2) {
			for (; ++a < o;) if ((i = (e = r[a]).type) && (i = Ku(n[i], e.name))) return i;
			return;
		}
		if (t != null && typeof t != "function") throw Error("invalid callback: " + t);
		for (; ++a < o;) if (i = (e = r[a]).type) n[i] = qu(n[i], e.name, t);
		else if (t == null) for (i in n) n[i] = qu(n[i], e.name, null);
		return this;
	},
	copy: function() {
		var e = {}, t = this._;
		for (var n in t) e[n] = t[n].slice();
		return new Wu(e);
	},
	call: function(e, t) {
		if ((i = arguments.length - 2) > 0) for (var n = Array(i), r = 0, i, a; r < i; ++r) n[r] = arguments[r + 2];
		if (!this._.hasOwnProperty(e)) throw Error("unknown type: " + e);
		for (a = this._[e], r = 0, i = a.length; r < i; ++r) a[r].value.apply(t, n);
	},
	apply: function(e, t, n) {
		if (!this._.hasOwnProperty(e)) throw Error("unknown type: " + e);
		for (var r = this._[e], i = 0, a = r.length; i < a; ++i) r[i].value.apply(t, n);
	}
};
function Ku(e, t) {
	for (var n = 0, r = e.length, i; n < r; ++n) if ((i = e[n]).name === t) return i.value;
}
function qu(e, t, n) {
	for (var r = 0, i = e.length; r < i; ++r) if (e[r].name === t) {
		e[r] = Hu, e = e.slice(0, r).concat(e.slice(r + 1));
		break;
	}
	return n != null && e.push({
		name: t,
		value: n
	}), e;
}
var Ju = {
	svg: "http://www.w3.org/2000/svg",
	xhtml: "http://www.w3.org/1999/xhtml",
	xlink: "http://www.w3.org/1999/xlink",
	xml: "http://www.w3.org/XML/1998/namespace",
	xmlns: "http://www.w3.org/2000/xmlns/"
};
function Yu(e) {
	var t = e += "", n = t.indexOf(":");
	return n >= 0 && (t = e.slice(0, n)) !== "xmlns" && (e = e.slice(n + 1)), Ju.hasOwnProperty(t) ? {
		space: Ju[t],
		local: e
	} : e;
}
function Xu(e) {
	return function() {
		var t = this.ownerDocument, n = this.namespaceURI;
		return n === "http://www.w3.org/1999/xhtml" && t.documentElement.namespaceURI === "http://www.w3.org/1999/xhtml" ? t.createElement(e) : t.createElementNS(n, e);
	};
}
function Zu(e) {
	return function() {
		return this.ownerDocument.createElementNS(e.space, e.local);
	};
}
function Qu(e) {
	var t = Yu(e);
	return (t.local ? Zu : Xu)(t);
}
function $u() {}
function ed(e) {
	return e == null ? $u : function() {
		return this.querySelector(e);
	};
}
function td(e) {
	typeof e != "function" && (e = ed(e));
	for (var t = this._groups, n = t.length, r = Array(n), i = 0; i < n; ++i) for (var a = t[i], o = a.length, s = r[i] = Array(o), c, l, u = 0; u < o; ++u) (c = a[u]) && (l = e.call(c, c.__data__, u, a)) && ("__data__" in c && (l.__data__ = c.__data__), s[u] = l);
	return new Wf(r, this._parents);
}
function nd(e) {
	return e == null ? [] : Array.isArray(e) ? e : Array.from(e);
}
function rd() {
	return [];
}
function id(e) {
	return e == null ? rd : function() {
		return this.querySelectorAll(e);
	};
}
function ad(e) {
	return function() {
		return nd(e.apply(this, arguments));
	};
}
function od(e) {
	e = typeof e == "function" ? ad(e) : id(e);
	for (var t = this._groups, n = t.length, r = [], i = [], a = 0; a < n; ++a) for (var o = t[a], s = o.length, c, l = 0; l < s; ++l) (c = o[l]) && (r.push(e.call(c, c.__data__, l, o)), i.push(c));
	return new Wf(r, i);
}
function sd(e) {
	return function() {
		return this.matches(e);
	};
}
function cd(e) {
	return function(t) {
		return t.matches(e);
	};
}
var ld = Array.prototype.find;
function ud(e) {
	return function() {
		return ld.call(this.children, e);
	};
}
function dd() {
	return this.firstElementChild;
}
function fd(e) {
	return this.select(e == null ? dd : ud(typeof e == "function" ? e : cd(e)));
}
var pd = Array.prototype.filter;
function md() {
	return Array.from(this.children);
}
function hd(e) {
	return function() {
		return pd.call(this.children, e);
	};
}
function gd(e) {
	return this.selectAll(e == null ? md : hd(typeof e == "function" ? e : cd(e)));
}
function _d(e) {
	typeof e != "function" && (e = sd(e));
	for (var t = this._groups, n = t.length, r = Array(n), i = 0; i < n; ++i) for (var a = t[i], o = a.length, s = r[i] = [], c, l = 0; l < o; ++l) (c = a[l]) && e.call(c, c.__data__, l, a) && s.push(c);
	return new Wf(r, this._parents);
}
function vd(e) {
	return Array(e.length);
}
function yd() {
	return new Wf(this._enter || this._groups.map(vd), this._parents);
}
function bd(e, t) {
	this.ownerDocument = e.ownerDocument, this.namespaceURI = e.namespaceURI, this._next = null, this._parent = e, this.__data__ = t;
}
bd.prototype = {
	constructor: bd,
	appendChild: function(e) {
		return this._parent.insertBefore(e, this._next);
	},
	insertBefore: function(e, t) {
		return this._parent.insertBefore(e, t);
	},
	querySelector: function(e) {
		return this._parent.querySelector(e);
	},
	querySelectorAll: function(e) {
		return this._parent.querySelectorAll(e);
	}
};
function xd(e) {
	return function() {
		return e;
	};
}
function Sd(e, t, n, r, i, a) {
	for (var o = 0, s, c = t.length, l = a.length; o < l; ++o) (s = t[o]) ? (s.__data__ = a[o], r[o] = s) : n[o] = new bd(e, a[o]);
	for (; o < c; ++o) (s = t[o]) && (i[o] = s);
}
function Cd(e, t, n, r, i, a, o) {
	var s, c, l = /* @__PURE__ */ new Map(), u = t.length, d = a.length, f = Array(u), p;
	for (s = 0; s < u; ++s) (c = t[s]) && (f[s] = p = o.call(c, c.__data__, s, t) + "", l.has(p) ? i[s] = c : l.set(p, c));
	for (s = 0; s < d; ++s) p = o.call(e, a[s], s, a) + "", (c = l.get(p)) ? (r[s] = c, c.__data__ = a[s], l.delete(p)) : n[s] = new bd(e, a[s]);
	for (s = 0; s < u; ++s) (c = t[s]) && l.get(f[s]) === c && (i[s] = c);
}
function wd(e) {
	return e.__data__;
}
function Td(e, t) {
	if (!arguments.length) return Array.from(this, wd);
	var n = t ? Cd : Sd, r = this._parents, i = this._groups;
	typeof e != "function" && (e = xd(e));
	for (var a = i.length, o = Array(a), s = Array(a), c = Array(a), l = 0; l < a; ++l) {
		var u = r[l], d = i[l], f = d.length, p = Ed(e.call(u, u && u.__data__, l, r)), m = p.length, h = s[l] = Array(m), g = o[l] = Array(m);
		n(u, d, h, g, c[l] = Array(f), p, t);
		for (var _ = 0, v = 0, y, b; _ < m; ++_) if (y = h[_]) {
			for (_ >= v && (v = _ + 1); !(b = g[v]) && ++v < m;);
			y._next = b || null;
		}
	}
	return o = new Wf(o, r), o._enter = s, o._exit = c, o;
}
function Ed(e) {
	return typeof e == "object" && "length" in e ? e : Array.from(e);
}
function Dd() {
	return new Wf(this._exit || this._groups.map(vd), this._parents);
}
function Od(e, t, n) {
	var r = this.enter(), i = this, a = this.exit();
	return typeof e == "function" ? (r = e(r), r &&= r.selection()) : r = r.append(e + ""), t != null && (i = t(i), i &&= i.selection()), n == null ? a.remove() : n(a), r && i ? r.merge(i).order() : i;
}
function kd(e) {
	for (var t = e.selection ? e.selection() : e, n = this._groups, r = t._groups, i = n.length, a = r.length, o = Math.min(i, a), s = Array(i), c = 0; c < o; ++c) for (var l = n[c], u = r[c], d = l.length, f = s[c] = Array(d), p, m = 0; m < d; ++m) (p = l[m] || u[m]) && (f[m] = p);
	for (; c < i; ++c) s[c] = n[c];
	return new Wf(s, this._parents);
}
function Ad() {
	for (var e = this._groups, t = -1, n = e.length; ++t < n;) for (var r = e[t], i = r.length - 1, a = r[i], o; --i >= 0;) (o = r[i]) && (a && o.compareDocumentPosition(a) ^ 4 && a.parentNode.insertBefore(o, a), a = o);
	return this;
}
function jd(e) {
	e ||= Md;
	function t(t, n) {
		return t && n ? e(t.__data__, n.__data__) : !t - !n;
	}
	for (var n = this._groups, r = n.length, i = Array(r), a = 0; a < r; ++a) {
		for (var o = n[a], s = o.length, c = i[a] = Array(s), l, u = 0; u < s; ++u) (l = o[u]) && (c[u] = l);
		c.sort(t);
	}
	return new Wf(i, this._parents).order();
}
function Md(e, t) {
	return e < t ? -1 : e > t ? 1 : e >= t ? 0 : NaN;
}
function Nd() {
	var e = arguments[0];
	return arguments[0] = this, e.apply(null, arguments), this;
}
function Pd() {
	return Array.from(this);
}
function Fd() {
	for (var e = this._groups, t = 0, n = e.length; t < n; ++t) for (var r = e[t], i = 0, a = r.length; i < a; ++i) {
		var o = r[i];
		if (o) return o;
	}
	return null;
}
function Id() {
	let e = 0;
	for (let t of this) ++e;
	return e;
}
function Ld() {
	return !this.node();
}
function Rd(e) {
	for (var t = this._groups, n = 0, r = t.length; n < r; ++n) for (var i = t[n], a = 0, o = i.length, s; a < o; ++a) (s = i[a]) && e.call(s, s.__data__, a, i);
	return this;
}
function zd(e) {
	return function() {
		this.removeAttribute(e);
	};
}
function Bd(e) {
	return function() {
		this.removeAttributeNS(e.space, e.local);
	};
}
function Vd(e, t) {
	return function() {
		this.setAttribute(e, t);
	};
}
function Hd(e, t) {
	return function() {
		this.setAttributeNS(e.space, e.local, t);
	};
}
function Ud(e, t) {
	return function() {
		var n = t.apply(this, arguments);
		n == null ? this.removeAttribute(e) : this.setAttribute(e, n);
	};
}
function Wd(e, t) {
	return function() {
		var n = t.apply(this, arguments);
		n == null ? this.removeAttributeNS(e.space, e.local) : this.setAttributeNS(e.space, e.local, n);
	};
}
function Gd(e, t) {
	var n = Yu(e);
	if (arguments.length < 2) {
		var r = this.node();
		return n.local ? r.getAttributeNS(n.space, n.local) : r.getAttribute(n);
	}
	return this.each((t == null ? n.local ? Bd : zd : typeof t == "function" ? n.local ? Wd : Ud : n.local ? Hd : Vd)(n, t));
}
function Kd(e) {
	return e.ownerDocument && e.ownerDocument.defaultView || e.document && e || e.defaultView;
}
function qd(e) {
	return function() {
		this.style.removeProperty(e);
	};
}
function Jd(e, t, n) {
	return function() {
		this.style.setProperty(e, t, n);
	};
}
function Yd(e, t, n) {
	return function() {
		var r = t.apply(this, arguments);
		r == null ? this.style.removeProperty(e) : this.style.setProperty(e, r, n);
	};
}
function Xd(e, t, n) {
	return arguments.length > 1 ? this.each((t == null ? qd : typeof t == "function" ? Yd : Jd)(e, t, n ?? "")) : Zd(this.node(), e);
}
function Zd(e, t) {
	return e.style.getPropertyValue(t) || Kd(e).getComputedStyle(e, null).getPropertyValue(t);
}
function Qd(e) {
	return function() {
		delete this[e];
	};
}
function $d(e, t) {
	return function() {
		this[e] = t;
	};
}
function ef(e, t) {
	return function() {
		var n = t.apply(this, arguments);
		n == null ? delete this[e] : this[e] = n;
	};
}
function tf(e, t) {
	return arguments.length > 1 ? this.each((t == null ? Qd : typeof t == "function" ? ef : $d)(e, t)) : this.node()[e];
}
function nf(e) {
	return e.trim().split(/^|\s+/);
}
function rf(e) {
	return e.classList || new af(e);
}
function af(e) {
	this._node = e, this._names = nf(e.getAttribute("class") || "");
}
af.prototype = {
	add: function(e) {
		this._names.indexOf(e) < 0 && (this._names.push(e), this._node.setAttribute("class", this._names.join(" ")));
	},
	remove: function(e) {
		var t = this._names.indexOf(e);
		t >= 0 && (this._names.splice(t, 1), this._node.setAttribute("class", this._names.join(" ")));
	},
	contains: function(e) {
		return this._names.indexOf(e) >= 0;
	}
};
function of(e, t) {
	for (var n = rf(e), r = -1, i = t.length; ++r < i;) n.add(t[r]);
}
function sf(e, t) {
	for (var n = rf(e), r = -1, i = t.length; ++r < i;) n.remove(t[r]);
}
function cf(e) {
	return function() {
		of(this, e);
	};
}
function lf(e) {
	return function() {
		sf(this, e);
	};
}
function uf(e, t) {
	return function() {
		(t.apply(this, arguments) ? of : sf)(this, e);
	};
}
function df(e, t) {
	var n = nf(e + "");
	if (arguments.length < 2) {
		for (var r = rf(this.node()), i = -1, a = n.length; ++i < a;) if (!r.contains(n[i])) return !1;
		return !0;
	}
	return this.each((typeof t == "function" ? uf : t ? cf : lf)(n, t));
}
function ff() {
	this.textContent = "";
}
function pf(e) {
	return function() {
		this.textContent = e;
	};
}
function mf(e) {
	return function() {
		var t = e.apply(this, arguments);
		this.textContent = t ?? "";
	};
}
function hf(e) {
	return arguments.length ? this.each(e == null ? ff : (typeof e == "function" ? mf : pf)(e)) : this.node().textContent;
}
function gf() {
	this.innerHTML = "";
}
function _f(e) {
	return function() {
		this.innerHTML = e;
	};
}
function vf(e) {
	return function() {
		var t = e.apply(this, arguments);
		this.innerHTML = t ?? "";
	};
}
function yf(e) {
	return arguments.length ? this.each(e == null ? gf : (typeof e == "function" ? vf : _f)(e)) : this.node().innerHTML;
}
function bf() {
	this.nextSibling && this.parentNode.appendChild(this);
}
function xf() {
	return this.each(bf);
}
function Sf() {
	this.previousSibling && this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function Cf() {
	return this.each(Sf);
}
function wf(e) {
	var t = typeof e == "function" ? e : Qu(e);
	return this.select(function() {
		return this.appendChild(t.apply(this, arguments));
	});
}
function Tf() {
	return null;
}
function Ef(e, t) {
	var n = typeof e == "function" ? e : Qu(e), r = t == null ? Tf : typeof t == "function" ? t : ed(t);
	return this.select(function() {
		return this.insertBefore(n.apply(this, arguments), r.apply(this, arguments) || null);
	});
}
function Df() {
	var e = this.parentNode;
	e && e.removeChild(this);
}
function Of() {
	return this.each(Df);
}
function kf() {
	var e = this.cloneNode(!1), t = this.parentNode;
	return t ? t.insertBefore(e, this.nextSibling) : e;
}
function Af() {
	var e = this.cloneNode(!0), t = this.parentNode;
	return t ? t.insertBefore(e, this.nextSibling) : e;
}
function jf(e) {
	return this.select(e ? Af : kf);
}
function Mf(e) {
	return arguments.length ? this.property("__data__", e) : this.node().__data__;
}
function Nf(e) {
	return function(t) {
		e.call(this, t, this.__data__);
	};
}
function Pf(e) {
	return e.trim().split(/^|\s+/).map(function(e) {
		var t = "", n = e.indexOf(".");
		return n >= 0 && (t = e.slice(n + 1), e = e.slice(0, n)), {
			type: e,
			name: t
		};
	});
}
function Ff(e) {
	return function() {
		var t = this.__on;
		if (t) {
			for (var n = 0, r = -1, i = t.length, a; n < i; ++n) a = t[n], (!e.type || a.type === e.type) && a.name === e.name ? this.removeEventListener(a.type, a.listener, a.options) : t[++r] = a;
			++r ? t.length = r : delete this.__on;
		}
	};
}
function If(e, t, n) {
	return function() {
		var r = this.__on, i, a = Nf(t);
		if (r) {
			for (var o = 0, s = r.length; o < s; ++o) if ((i = r[o]).type === e.type && i.name === e.name) {
				this.removeEventListener(i.type, i.listener, i.options), this.addEventListener(i.type, i.listener = a, i.options = n), i.value = t;
				return;
			}
		}
		this.addEventListener(e.type, a, n), i = {
			type: e.type,
			name: e.name,
			value: t,
			listener: a,
			options: n
		}, r ? r.push(i) : this.__on = [i];
	};
}
function Lf(e, t, n) {
	var r = Pf(e + ""), i, a = r.length, o;
	if (arguments.length < 2) {
		var s = this.node().__on;
		if (s) {
			for (var c = 0, l = s.length, u; c < l; ++c) for (i = 0, u = s[c]; i < a; ++i) if ((o = r[i]).type === u.type && o.name === u.name) return u.value;
		}
		return;
	}
	for (s = t ? If : Ff, i = 0; i < a; ++i) this.each(s(r[i], t, n));
	return this;
}
function Rf(e, t, n) {
	var r = Kd(e), i = r.CustomEvent;
	typeof i == "function" ? i = new i(t, n) : (i = r.document.createEvent("Event"), n ? (i.initEvent(t, n.bubbles, n.cancelable), i.detail = n.detail) : i.initEvent(t, !1, !1)), e.dispatchEvent(i);
}
function zf(e, t) {
	return function() {
		return Rf(this, e, t);
	};
}
function Bf(e, t) {
	return function() {
		return Rf(this, e, t.apply(this, arguments));
	};
}
function Vf(e, t) {
	return this.each((typeof t == "function" ? Bf : zf)(e, t));
}
function* Hf() {
	for (var e = this._groups, t = 0, n = e.length; t < n; ++t) for (var r = e[t], i = 0, a = r.length, o; i < a; ++i) (o = r[i]) && (yield o);
}
var Uf = [null];
function Wf(e, t) {
	this._groups = e, this._parents = t;
}
function Gf() {
	return new Wf([[document.documentElement]], Uf);
}
function Kf() {
	return this;
}
Wf.prototype = Gf.prototype = {
	constructor: Wf,
	select: td,
	selectAll: od,
	selectChild: fd,
	selectChildren: gd,
	filter: _d,
	data: Td,
	enter: yd,
	exit: Dd,
	join: Od,
	merge: kd,
	selection: Kf,
	order: Ad,
	sort: jd,
	call: Nd,
	nodes: Pd,
	node: Fd,
	size: Id,
	empty: Ld,
	each: Rd,
	attr: Gd,
	style: Xd,
	property: tf,
	classed: df,
	text: hf,
	html: yf,
	raise: xf,
	lower: Cf,
	append: wf,
	insert: Ef,
	remove: Of,
	clone: jf,
	datum: Mf,
	on: Lf,
	dispatch: Vf,
	[Symbol.iterator]: Hf
};
function qf(e, t, n) {
	e.prototype = t.prototype = n, n.constructor = e;
}
function Jf(e, t) {
	var n = Object.create(e.prototype);
	for (var r in t) n[r] = t[r];
	return n;
}
function Yf() {}
var Xf = .7, Zf = 1 / Xf, Qf = "\\s*([+-]?\\d+)\\s*", $f = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*", ep = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*", tp = /^#([0-9a-f]{3,8})$/, np = RegExp(`^rgb\\(${Qf},${Qf},${Qf}\\)$`), rp = RegExp(`^rgb\\(${ep},${ep},${ep}\\)$`), ip = RegExp(`^rgba\\(${Qf},${Qf},${Qf},${$f}\\)$`), ap = RegExp(`^rgba\\(${ep},${ep},${ep},${$f}\\)$`), op = RegExp(`^hsl\\(${$f},${ep},${ep}\\)$`), sp = RegExp(`^hsla\\(${$f},${ep},${ep},${$f}\\)$`), cp = {
	aliceblue: 15792383,
	antiquewhite: 16444375,
	aqua: 65535,
	aquamarine: 8388564,
	azure: 15794175,
	beige: 16119260,
	bisque: 16770244,
	black: 0,
	blanchedalmond: 16772045,
	blue: 255,
	blueviolet: 9055202,
	brown: 10824234,
	burlywood: 14596231,
	cadetblue: 6266528,
	chartreuse: 8388352,
	chocolate: 13789470,
	coral: 16744272,
	cornflowerblue: 6591981,
	cornsilk: 16775388,
	crimson: 14423100,
	cyan: 65535,
	darkblue: 139,
	darkcyan: 35723,
	darkgoldenrod: 12092939,
	darkgray: 11119017,
	darkgreen: 25600,
	darkgrey: 11119017,
	darkkhaki: 12433259,
	darkmagenta: 9109643,
	darkolivegreen: 5597999,
	darkorange: 16747520,
	darkorchid: 10040012,
	darkred: 9109504,
	darksalmon: 15308410,
	darkseagreen: 9419919,
	darkslateblue: 4734347,
	darkslategray: 3100495,
	darkslategrey: 3100495,
	darkturquoise: 52945,
	darkviolet: 9699539,
	deeppink: 16716947,
	deepskyblue: 49151,
	dimgray: 6908265,
	dimgrey: 6908265,
	dodgerblue: 2003199,
	firebrick: 11674146,
	floralwhite: 16775920,
	forestgreen: 2263842,
	fuchsia: 16711935,
	gainsboro: 14474460,
	ghostwhite: 16316671,
	gold: 16766720,
	goldenrod: 14329120,
	gray: 8421504,
	green: 32768,
	greenyellow: 11403055,
	grey: 8421504,
	honeydew: 15794160,
	hotpink: 16738740,
	indianred: 13458524,
	indigo: 4915330,
	ivory: 16777200,
	khaki: 15787660,
	lavender: 15132410,
	lavenderblush: 16773365,
	lawngreen: 8190976,
	lemonchiffon: 16775885,
	lightblue: 11393254,
	lightcoral: 15761536,
	lightcyan: 14745599,
	lightgoldenrodyellow: 16448210,
	lightgray: 13882323,
	lightgreen: 9498256,
	lightgrey: 13882323,
	lightpink: 16758465,
	lightsalmon: 16752762,
	lightseagreen: 2142890,
	lightskyblue: 8900346,
	lightslategray: 7833753,
	lightslategrey: 7833753,
	lightsteelblue: 11584734,
	lightyellow: 16777184,
	lime: 65280,
	limegreen: 3329330,
	linen: 16445670,
	magenta: 16711935,
	maroon: 8388608,
	mediumaquamarine: 6737322,
	mediumblue: 205,
	mediumorchid: 12211667,
	mediumpurple: 9662683,
	mediumseagreen: 3978097,
	mediumslateblue: 8087790,
	mediumspringgreen: 64154,
	mediumturquoise: 4772300,
	mediumvioletred: 13047173,
	midnightblue: 1644912,
	mintcream: 16121850,
	mistyrose: 16770273,
	moccasin: 16770229,
	navajowhite: 16768685,
	navy: 128,
	oldlace: 16643558,
	olive: 8421376,
	olivedrab: 7048739,
	orange: 16753920,
	orangered: 16729344,
	orchid: 14315734,
	palegoldenrod: 15657130,
	palegreen: 10025880,
	paleturquoise: 11529966,
	palevioletred: 14381203,
	papayawhip: 16773077,
	peachpuff: 16767673,
	peru: 13468991,
	pink: 16761035,
	plum: 14524637,
	powderblue: 11591910,
	purple: 8388736,
	rebeccapurple: 6697881,
	red: 16711680,
	rosybrown: 12357519,
	royalblue: 4286945,
	saddlebrown: 9127187,
	salmon: 16416882,
	sandybrown: 16032864,
	seagreen: 3050327,
	seashell: 16774638,
	sienna: 10506797,
	silver: 12632256,
	skyblue: 8900331,
	slateblue: 6970061,
	slategray: 7372944,
	slategrey: 7372944,
	snow: 16775930,
	springgreen: 65407,
	steelblue: 4620980,
	tan: 13808780,
	teal: 32896,
	thistle: 14204888,
	tomato: 16737095,
	turquoise: 4251856,
	violet: 15631086,
	wheat: 16113331,
	white: 16777215,
	whitesmoke: 16119285,
	yellow: 16776960,
	yellowgreen: 10145074
};
qf(Yf, pp, {
	copy(e) {
		return Object.assign(new this.constructor(), this, e);
	},
	displayable() {
		return this.rgb().displayable();
	},
	hex: lp,
	formatHex: lp,
	formatHex8: up,
	formatHsl: dp,
	formatRgb: fp,
	toString: fp
});
function lp() {
	return this.rgb().formatHex();
}
function up() {
	return this.rgb().formatHex8();
}
function dp() {
	return Ep(this).formatHsl();
}
function fp() {
	return this.rgb().formatRgb();
}
function pp(e) {
	var t, n;
	return e = (e + "").trim().toLowerCase(), (t = tp.exec(e)) ? (n = t[1].length, t = parseInt(t[1], 16), n === 6 ? mp(t) : n === 3 ? new vp(t >> 8 & 15 | t >> 4 & 240, t >> 4 & 15 | t & 240, (t & 15) << 4 | t & 15, 1) : n === 8 ? hp(t >> 24 & 255, t >> 16 & 255, t >> 8 & 255, (t & 255) / 255) : n === 4 ? hp(t >> 12 & 15 | t >> 8 & 240, t >> 8 & 15 | t >> 4 & 240, t >> 4 & 15 | t & 240, ((t & 15) << 4 | t & 15) / 255) : null) : (t = np.exec(e)) ? new vp(t[1], t[2], t[3], 1) : (t = rp.exec(e)) ? new vp(t[1] * 255 / 100, t[2] * 255 / 100, t[3] * 255 / 100, 1) : (t = ip.exec(e)) ? hp(t[1], t[2], t[3], t[4]) : (t = ap.exec(e)) ? hp(t[1] * 255 / 100, t[2] * 255 / 100, t[3] * 255 / 100, t[4]) : (t = op.exec(e)) ? Tp(t[1], t[2] / 100, t[3] / 100, 1) : (t = sp.exec(e)) ? Tp(t[1], t[2] / 100, t[3] / 100, t[4]) : cp.hasOwnProperty(e) ? mp(cp[e]) : e === "transparent" ? new vp(NaN, NaN, NaN, 0) : null;
}
function mp(e) {
	return new vp(e >> 16 & 255, e >> 8 & 255, e & 255, 1);
}
function hp(e, t, n, r) {
	return r <= 0 && (e = t = n = NaN), new vp(e, t, n, r);
}
function gp(e) {
	return e instanceof Yf || (e = pp(e)), e ? (e = e.rgb(), new vp(e.r, e.g, e.b, e.opacity)) : new vp();
}
function _p(e, t, n, r) {
	return arguments.length === 1 ? gp(e) : new vp(e, t, n, r ?? 1);
}
function vp(e, t, n, r) {
	this.r = +e, this.g = +t, this.b = +n, this.opacity = +r;
}
qf(vp, _p, Jf(Yf, {
	brighter(e) {
		return e = e == null ? Zf : Zf ** +e, new vp(this.r * e, this.g * e, this.b * e, this.opacity);
	},
	darker(e) {
		return e = e == null ? Xf : Xf ** +e, new vp(this.r * e, this.g * e, this.b * e, this.opacity);
	},
	rgb() {
		return this;
	},
	clamp() {
		return new vp(Cp(this.r), Cp(this.g), Cp(this.b), Sp(this.opacity));
	},
	displayable() {
		return -.5 <= this.r && this.r < 255.5 && -.5 <= this.g && this.g < 255.5 && -.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
	},
	hex: yp,
	formatHex: yp,
	formatHex8: bp,
	formatRgb: xp,
	toString: xp
}));
function yp() {
	return `#${wp(this.r)}${wp(this.g)}${wp(this.b)}`;
}
function bp() {
	return `#${wp(this.r)}${wp(this.g)}${wp(this.b)}${wp((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function xp() {
	let e = Sp(this.opacity);
	return `${e === 1 ? "rgb(" : "rgba("}${Cp(this.r)}, ${Cp(this.g)}, ${Cp(this.b)}${e === 1 ? ")" : `, ${e})`}`;
}
function Sp(e) {
	return isNaN(e) ? 1 : Math.max(0, Math.min(1, e));
}
function Cp(e) {
	return Math.max(0, Math.min(255, Math.round(e) || 0));
}
function wp(e) {
	return e = Cp(e), (e < 16 ? "0" : "") + e.toString(16);
}
function Tp(e, t, n, r) {
	return r <= 0 ? e = t = n = NaN : n <= 0 || n >= 1 ? e = t = NaN : t <= 0 && (e = NaN), new Op(e, t, n, r);
}
function Ep(e) {
	if (e instanceof Op) return new Op(e.h, e.s, e.l, e.opacity);
	if (e instanceof Yf || (e = pp(e)), !e) return new Op();
	if (e instanceof Op) return e;
	e = e.rgb();
	var t = e.r / 255, n = e.g / 255, r = e.b / 255, i = Math.min(t, n, r), a = Math.max(t, n, r), o = NaN, s = a - i, c = (a + i) / 2;
	return s ? (o = t === a ? (n - r) / s + (n < r) * 6 : n === a ? (r - t) / s + 2 : (t - n) / s + 4, s /= c < .5 ? a + i : 2 - a - i, o *= 60) : s = c > 0 && c < 1 ? 0 : o, new Op(o, s, c, e.opacity);
}
function Dp(e, t, n, r) {
	return arguments.length === 1 ? Ep(e) : new Op(e, t, n, r ?? 1);
}
function Op(e, t, n, r) {
	this.h = +e, this.s = +t, this.l = +n, this.opacity = +r;
}
qf(Op, Dp, Jf(Yf, {
	brighter(e) {
		return e = e == null ? Zf : Zf ** +e, new Op(this.h, this.s, this.l * e, this.opacity);
	},
	darker(e) {
		return e = e == null ? Xf : Xf ** +e, new Op(this.h, this.s, this.l * e, this.opacity);
	},
	rgb() {
		var e = this.h % 360 + (this.h < 0) * 360, t = isNaN(e) || isNaN(this.s) ? 0 : this.s, n = this.l, r = n + (n < .5 ? n : 1 - n) * t, i = 2 * n - r;
		return new vp(jp(e >= 240 ? e - 240 : e + 120, i, r), jp(e, i, r), jp(e < 120 ? e + 240 : e - 120, i, r), this.opacity);
	},
	clamp() {
		return new Op(kp(this.h), Ap(this.s), Ap(this.l), Sp(this.opacity));
	},
	displayable() {
		return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
	},
	formatHsl() {
		let e = Sp(this.opacity);
		return `${e === 1 ? "hsl(" : "hsla("}${kp(this.h)}, ${Ap(this.s) * 100}%, ${Ap(this.l) * 100}%${e === 1 ? ")" : `, ${e})`}`;
	}
}));
function kp(e) {
	return e = (e || 0) % 360, e < 0 ? e + 360 : e;
}
function Ap(e) {
	return Math.max(0, Math.min(1, e || 0));
}
function jp(e, t, n) {
	return (e < 60 ? t + (n - t) * e / 60 : e < 180 ? n : e < 240 ? t + (n - t) * (240 - e) / 60 : t) * 255;
}
var Mp = (e) => () => e;
function Np(e, t) {
	return function(n) {
		return e + n * t;
	};
}
function Pp(e, t, n) {
	return e **= +n, t = t ** +n - e, n = 1 / n, function(r) {
		return (e + r * t) ** +n;
	};
}
function Fp(e) {
	return (e = +e) == 1 ? Ip : function(t, n) {
		return n - t ? Pp(t, n, e) : Mp(isNaN(t) ? n : t);
	};
}
function Ip(e, t) {
	var n = t - e;
	return n ? Np(e, n) : Mp(isNaN(e) ? t : e);
}
var Lp = (function e(t) {
	var n = Fp(t);
	function r(e, t) {
		var r = n((e = _p(e)).r, (t = _p(t)).r), i = n(e.g, t.g), a = n(e.b, t.b), o = Ip(e.opacity, t.opacity);
		return function(t) {
			return e.r = r(t), e.g = i(t), e.b = a(t), e.opacity = o(t), e + "";
		};
	}
	return r.gamma = e, r;
})(1);
function Rp(e, t) {
	return e = +e, t = +t, function(n) {
		return e * (1 - n) + t * n;
	};
}
var zp = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, Bp = new RegExp(zp.source, "g");
function Vp(e) {
	return function() {
		return e;
	};
}
function Hp(e) {
	return function(t) {
		return e(t) + "";
	};
}
function Up(e, t) {
	var n = zp.lastIndex = Bp.lastIndex = 0, r, i, a, o = -1, s = [], c = [];
	for (e += "", t += ""; (r = zp.exec(e)) && (i = Bp.exec(t));) (a = i.index) > n && (a = t.slice(n, a), s[o] ? s[o] += a : s[++o] = a), (r = r[0]) === (i = i[0]) ? s[o] ? s[o] += i : s[++o] = i : (s[++o] = null, c.push({
		i: o,
		x: Rp(r, i)
	})), n = Bp.lastIndex;
	return n < t.length && (a = t.slice(n), s[o] ? s[o] += a : s[++o] = a), s.length < 2 ? c[0] ? Hp(c[0].x) : Vp(t) : (t = c.length, function(e) {
		for (var n = 0, r; n < t; ++n) s[(r = c[n]).i] = r.x(e);
		return s.join("");
	});
}
var Wp = 180 / Math.PI, Gp = {
	translateX: 0,
	translateY: 0,
	rotate: 0,
	skewX: 0,
	scaleX: 1,
	scaleY: 1
};
function Kp(e, t, n, r, i, a) {
	var o, s, c;
	return (o = Math.sqrt(e * e + t * t)) && (e /= o, t /= o), (c = e * n + t * r) && (n -= e * c, r -= t * c), (s = Math.sqrt(n * n + r * r)) && (n /= s, r /= s, c /= s), e * r < t * n && (e = -e, t = -t, c = -c, o = -o), {
		translateX: i,
		translateY: a,
		rotate: Math.atan2(t, e) * Wp,
		skewX: Math.atan(c) * Wp,
		scaleX: o,
		scaleY: s
	};
}
var qp;
function Jp(e) {
	let t = new (typeof DOMMatrix == "function" ? DOMMatrix : WebKitCSSMatrix)(e + "");
	return t.isIdentity ? Gp : Kp(t.a, t.b, t.c, t.d, t.e, t.f);
}
function Yp(e) {
	return e == null || (qp ||= document.createElementNS("http://www.w3.org/2000/svg", "g"), qp.setAttribute("transform", e), !(e = qp.transform.baseVal.consolidate())) ? Gp : (e = e.matrix, Kp(e.a, e.b, e.c, e.d, e.e, e.f));
}
function Xp(e, t, n, r) {
	function i(e) {
		return e.length ? e.pop() + " " : "";
	}
	function a(e, r, i, a, o, s) {
		if (e !== i || r !== a) {
			var c = o.push("translate(", null, t, null, n);
			s.push({
				i: c - 4,
				x: Rp(e, i)
			}, {
				i: c - 2,
				x: Rp(r, a)
			});
		} else (i || a) && o.push("translate(" + i + t + a + n);
	}
	function o(e, t, n, a) {
		e === t ? t && n.push(i(n) + "rotate(" + t + r) : (e - t > 180 ? t += 360 : t - e > 180 && (e += 360), a.push({
			i: n.push(i(n) + "rotate(", null, r) - 2,
			x: Rp(e, t)
		}));
	}
	function s(e, t, n, a) {
		e === t ? t && n.push(i(n) + "skewX(" + t + r) : a.push({
			i: n.push(i(n) + "skewX(", null, r) - 2,
			x: Rp(e, t)
		});
	}
	function c(e, t, n, r, a, o) {
		if (e !== n || t !== r) {
			var s = a.push(i(a) + "scale(", null, ",", null, ")");
			o.push({
				i: s - 4,
				x: Rp(e, n)
			}, {
				i: s - 2,
				x: Rp(t, r)
			});
		} else (n !== 1 || r !== 1) && a.push(i(a) + "scale(" + n + "," + r + ")");
	}
	return function(t, n) {
		var r = [], i = [];
		return t = e(t), n = e(n), a(t.translateX, t.translateY, n.translateX, n.translateY, r, i), o(t.rotate, n.rotate, r, i), s(t.skewX, n.skewX, r, i), c(t.scaleX, t.scaleY, n.scaleX, n.scaleY, r, i), t = n = null, function(e) {
			for (var t = -1, n = i.length, a; ++t < n;) r[(a = i[t]).i] = a.x(e);
			return r.join("");
		};
	};
}
var Zp = Xp(Jp, "px, ", "px)", "deg)"), Qp = Xp(Yp, ", ", ")", ")"), $p = 0, em = 0, tm = 0, nm = 1e3, rm, im, am = 0, om = 0, sm = 0, cm = typeof performance == "object" && performance.now ? performance : Date, lm = typeof window == "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(e) {
	setTimeout(e, 17);
};
function um() {
	return om ||= (lm(dm), cm.now() + sm);
}
function dm() {
	om = 0;
}
function fm() {
	this._call = this._time = this._next = null;
}
fm.prototype = pm.prototype = {
	constructor: fm,
	restart: function(e, t, n) {
		if (typeof e != "function") throw TypeError("callback is not a function");
		n = (n == null ? um() : +n) + (t == null ? 0 : +t), !this._next && im !== this && (im ? im._next = this : rm = this, im = this), this._call = e, this._time = n, vm();
	},
	stop: function() {
		this._call && (this._call = null, this._time = Infinity, vm());
	}
};
function pm(e, t, n) {
	var r = new fm();
	return r.restart(e, t, n), r;
}
function mm() {
	um(), ++$p;
	for (var e = rm, t; e;) (t = om - e._time) >= 0 && e._call.call(void 0, t), e = e._next;
	--$p;
}
function hm() {
	om = (am = cm.now()) + sm, $p = em = 0;
	try {
		mm();
	} finally {
		$p = 0, _m(), om = 0;
	}
}
function gm() {
	var e = cm.now(), t = e - am;
	t > nm && (sm -= t, am = e);
}
function _m() {
	for (var e, t = rm, n, r = Infinity; t;) t._call ? (r > t._time && (r = t._time), e = t, t = t._next) : (n = t._next, t._next = null, t = e ? e._next = n : rm = n);
	im = e, vm(r);
}
function vm(e) {
	$p || (em &&= clearTimeout(em), e - om > 24 ? (e < Infinity && (em = setTimeout(hm, e - cm.now() - sm)), tm &&= clearInterval(tm)) : (tm ||= (am = cm.now(), setInterval(gm, nm)), $p = 1, lm(hm)));
}
function ym(e, t, n) {
	var r = new fm();
	return t = t == null ? 0 : +t, r.restart((n) => {
		r.stop(), e(n + t);
	}, t, n), r;
}
var bm = Uu("start", "end", "cancel", "interrupt"), xm = [];
function Sm(e, t, n, r, i, a) {
	var o = e.__transition;
	if (!o) e.__transition = {};
	else if (n in o) return;
	Em(e, n, {
		name: t,
		index: r,
		group: i,
		on: bm,
		tween: xm,
		time: a.time,
		delay: a.delay,
		duration: a.duration,
		ease: a.ease,
		timer: null,
		state: 0
	});
}
function Cm(e, t) {
	var n = Tm(e, t);
	if (n.state > 0) throw Error("too late; already scheduled");
	return n;
}
function wm(e, t) {
	var n = Tm(e, t);
	if (n.state > 3) throw Error("too late; already running");
	return n;
}
function Tm(e, t) {
	var n = e.__transition;
	if (!n || !(n = n[t])) throw Error("transition not found");
	return n;
}
function Em(e, t, n) {
	var r = e.__transition, i;
	r[t] = n, n.timer = pm(a, 0, n.time);
	function a(e) {
		n.state = 1, n.timer.restart(o, n.delay, n.time), n.delay <= e && o(e - n.delay);
	}
	function o(a) {
		var l, u, d, f;
		if (n.state !== 1) return c();
		for (l in r) if (f = r[l], f.name === n.name) {
			if (f.state === 3) return ym(o);
			f.state === 4 ? (f.state = 6, f.timer.stop(), f.on.call("interrupt", e, e.__data__, f.index, f.group), delete r[l]) : +l < t && (f.state = 6, f.timer.stop(), f.on.call("cancel", e, e.__data__, f.index, f.group), delete r[l]);
		}
		if (ym(function() {
			n.state === 3 && (n.state = 4, n.timer.restart(s, n.delay, n.time), s(a));
		}), n.state = 2, n.on.call("start", e, e.__data__, n.index, n.group), n.state === 2) {
			for (n.state = 3, i = Array(d = n.tween.length), l = 0, u = -1; l < d; ++l) (f = n.tween[l].value.call(e, e.__data__, n.index, n.group)) && (i[++u] = f);
			i.length = u + 1;
		}
	}
	function s(t) {
		for (var r = t < n.duration ? n.ease.call(null, t / n.duration) : (n.timer.restart(c), n.state = 5, 1), a = -1, o = i.length; ++a < o;) i[a].call(e, r);
		n.state === 5 && (n.on.call("end", e, e.__data__, n.index, n.group), c());
	}
	function c() {
		for (var i in n.state = 6, n.timer.stop(), delete r[t], r) return;
		delete e.__transition;
	}
}
function Dm(e, t) {
	var n = e.__transition, r, i, a = !0, o;
	if (n) {
		for (o in t = t == null ? null : t + "", n) {
			if ((r = n[o]).name !== t) {
				a = !1;
				continue;
			}
			i = r.state > 2 && r.state < 5, r.state = 6, r.timer.stop(), r.on.call(i ? "interrupt" : "cancel", e, e.__data__, r.index, r.group), delete n[o];
		}
		a && delete e.__transition;
	}
}
function Om(e) {
	return this.each(function() {
		Dm(this, e);
	});
}
function km(e, t) {
	var n, r;
	return function() {
		var i = wm(this, e), a = i.tween;
		if (a !== n) {
			r = n = a;
			for (var o = 0, s = r.length; o < s; ++o) if (r[o].name === t) {
				r = r.slice(), r.splice(o, 1);
				break;
			}
		}
		i.tween = r;
	};
}
function Am(e, t, n) {
	var r, i;
	if (typeof n != "function") throw Error();
	return function() {
		var a = wm(this, e), o = a.tween;
		if (o !== r) {
			i = (r = o).slice();
			for (var s = {
				name: t,
				value: n
			}, c = 0, l = i.length; c < l; ++c) if (i[c].name === t) {
				i[c] = s;
				break;
			}
			c === l && i.push(s);
		}
		a.tween = i;
	};
}
function jm(e, t) {
	var n = this._id;
	if (e += "", arguments.length < 2) {
		for (var r = Tm(this.node(), n).tween, i = 0, a = r.length, o; i < a; ++i) if ((o = r[i]).name === e) return o.value;
		return null;
	}
	return this.each((t == null ? km : Am)(n, e, t));
}
function Mm(e, t, n) {
	var r = e._id;
	return e.each(function() {
		var e = wm(this, r);
		(e.value ||= {})[t] = n.apply(this, arguments);
	}), function(e) {
		return Tm(e, r).value[t];
	};
}
function Nm(e, t) {
	var n;
	return (typeof t == "number" ? Rp : t instanceof pp ? Lp : (n = pp(t)) ? (t = n, Lp) : Up)(e, t);
}
function Pm(e) {
	return function() {
		this.removeAttribute(e);
	};
}
function Fm(e) {
	return function() {
		this.removeAttributeNS(e.space, e.local);
	};
}
function Im(e, t, n) {
	var r, i = n + "", a;
	return function() {
		var o = this.getAttribute(e);
		return o === i ? null : o === r ? a : a = t(r = o, n);
	};
}
function Lm(e, t, n) {
	var r, i = n + "", a;
	return function() {
		var o = this.getAttributeNS(e.space, e.local);
		return o === i ? null : o === r ? a : a = t(r = o, n);
	};
}
function Rm(e, t, n) {
	var r, i, a;
	return function() {
		var o, s = n(this), c;
		return s == null ? void this.removeAttribute(e) : (o = this.getAttribute(e), c = s + "", o === c ? null : o === r && c === i ? a : (i = c, a = t(r = o, s)));
	};
}
function zm(e, t, n) {
	var r, i, a;
	return function() {
		var o, s = n(this), c;
		return s == null ? void this.removeAttributeNS(e.space, e.local) : (o = this.getAttributeNS(e.space, e.local), c = s + "", o === c ? null : o === r && c === i ? a : (i = c, a = t(r = o, s)));
	};
}
function Bm(e, t) {
	var n = Yu(e), r = n === "transform" ? Qp : Nm;
	return this.attrTween(e, typeof t == "function" ? (n.local ? zm : Rm)(n, r, Mm(this, "attr." + e, t)) : t == null ? (n.local ? Fm : Pm)(n) : (n.local ? Lm : Im)(n, r, t));
}
function Vm(e, t) {
	return function(n) {
		this.setAttribute(e, t.call(this, n));
	};
}
function Hm(e, t) {
	return function(n) {
		this.setAttributeNS(e.space, e.local, t.call(this, n));
	};
}
function Um(e, t) {
	var n, r;
	function i() {
		var i = t.apply(this, arguments);
		return i !== r && (n = (r = i) && Hm(e, i)), n;
	}
	return i._value = t, i;
}
function Wm(e, t) {
	var n, r;
	function i() {
		var i = t.apply(this, arguments);
		return i !== r && (n = (r = i) && Vm(e, i)), n;
	}
	return i._value = t, i;
}
function Gm(e, t) {
	var n = "attr." + e;
	if (arguments.length < 2) return (n = this.tween(n)) && n._value;
	if (t == null) return this.tween(n, null);
	if (typeof t != "function") throw Error();
	var r = Yu(e);
	return this.tween(n, (r.local ? Um : Wm)(r, t));
}
function Km(e, t) {
	return function() {
		Cm(this, e).delay = +t.apply(this, arguments);
	};
}
function qm(e, t) {
	return t = +t, function() {
		Cm(this, e).delay = t;
	};
}
function Jm(e) {
	var t = this._id;
	return arguments.length ? this.each((typeof e == "function" ? Km : qm)(t, e)) : Tm(this.node(), t).delay;
}
function Ym(e, t) {
	return function() {
		wm(this, e).duration = +t.apply(this, arguments);
	};
}
function Xm(e, t) {
	return t = +t, function() {
		wm(this, e).duration = t;
	};
}
function Zm(e) {
	var t = this._id;
	return arguments.length ? this.each((typeof e == "function" ? Ym : Xm)(t, e)) : Tm(this.node(), t).duration;
}
function Qm(e, t) {
	if (typeof t != "function") throw Error();
	return function() {
		wm(this, e).ease = t;
	};
}
function $m(e) {
	var t = this._id;
	return arguments.length ? this.each(Qm(t, e)) : Tm(this.node(), t).ease;
}
function eh(e, t) {
	return function() {
		var n = t.apply(this, arguments);
		if (typeof n != "function") throw Error();
		wm(this, e).ease = n;
	};
}
function th(e) {
	if (typeof e != "function") throw Error();
	return this.each(eh(this._id, e));
}
function nh(e) {
	typeof e != "function" && (e = sd(e));
	for (var t = this._groups, n = t.length, r = Array(n), i = 0; i < n; ++i) for (var a = t[i], o = a.length, s = r[i] = [], c, l = 0; l < o; ++l) (c = a[l]) && e.call(c, c.__data__, l, a) && s.push(c);
	return new jh(r, this._parents, this._name, this._id);
}
function rh(e) {
	if (e._id !== this._id) throw Error();
	for (var t = this._groups, n = e._groups, r = t.length, i = n.length, a = Math.min(r, i), o = Array(r), s = 0; s < a; ++s) for (var c = t[s], l = n[s], u = c.length, d = o[s] = Array(u), f, p = 0; p < u; ++p) (f = c[p] || l[p]) && (d[p] = f);
	for (; s < r; ++s) o[s] = t[s];
	return new jh(o, this._parents, this._name, this._id);
}
function ih(e) {
	return (e + "").trim().split(/^|\s+/).every(function(e) {
		var t = e.indexOf(".");
		return t >= 0 && (e = e.slice(0, t)), !e || e === "start";
	});
}
function ah(e, t, n) {
	var r, i, a = ih(t) ? Cm : wm;
	return function() {
		var o = a(this, e), s = o.on;
		s !== r && (i = (r = s).copy()).on(t, n), o.on = i;
	};
}
function oh(e, t) {
	var n = this._id;
	return arguments.length < 2 ? Tm(this.node(), n).on.on(e) : this.each(ah(n, e, t));
}
function sh(e) {
	return function() {
		var t = this.parentNode;
		for (var n in this.__transition) if (+n !== e) return;
		t && t.removeChild(this);
	};
}
function ch() {
	return this.on("end.remove", sh(this._id));
}
function lh(e) {
	var t = this._name, n = this._id;
	typeof e != "function" && (e = ed(e));
	for (var r = this._groups, i = r.length, a = Array(i), o = 0; o < i; ++o) for (var s = r[o], c = s.length, l = a[o] = Array(c), u, d, f = 0; f < c; ++f) (u = s[f]) && (d = e.call(u, u.__data__, f, s)) && ("__data__" in u && (d.__data__ = u.__data__), l[f] = d, Sm(l[f], t, n, f, l, Tm(u, n)));
	return new jh(a, this._parents, t, n);
}
function uh(e) {
	var t = this._name, n = this._id;
	typeof e != "function" && (e = id(e));
	for (var r = this._groups, i = r.length, a = [], o = [], s = 0; s < i; ++s) for (var c = r[s], l = c.length, u, d = 0; d < l; ++d) if (u = c[d]) {
		for (var f = e.call(u, u.__data__, d, c), p, m = Tm(u, n), h = 0, g = f.length; h < g; ++h) (p = f[h]) && Sm(p, t, n, h, f, m);
		a.push(f), o.push(u);
	}
	return new jh(a, o, t, n);
}
var dh = Gf.prototype.constructor;
function fh() {
	return new dh(this._groups, this._parents);
}
function ph(e, t) {
	var n, r, i;
	return function() {
		var a = Zd(this, e), o = (this.style.removeProperty(e), Zd(this, e));
		return a === o ? null : a === n && o === r ? i : i = t(n = a, r = o);
	};
}
function mh(e) {
	return function() {
		this.style.removeProperty(e);
	};
}
function hh(e, t, n) {
	var r, i = n + "", a;
	return function() {
		var o = Zd(this, e);
		return o === i ? null : o === r ? a : a = t(r = o, n);
	};
}
function gh(e, t, n) {
	var r, i, a;
	return function() {
		var o = Zd(this, e), s = n(this), c = s + "";
		return s ?? (c = s = (this.style.removeProperty(e), Zd(this, e))), o === c ? null : o === r && c === i ? a : (i = c, a = t(r = o, s));
	};
}
function _h(e, t) {
	var n, r, i, a = "style." + t, o = "end." + a, s;
	return function() {
		var c = wm(this, e), l = c.on, u = c.value[a] == null ? s ||= mh(t) : void 0;
		(l !== n || i !== u) && (r = (n = l).copy()).on(o, i = u), c.on = r;
	};
}
function vh(e, t, n) {
	var r = (e += "") == "transform" ? Zp : Nm;
	return t == null ? this.styleTween(e, ph(e, r)).on("end.style." + e, mh(e)) : typeof t == "function" ? this.styleTween(e, gh(e, r, Mm(this, "style." + e, t))).each(_h(this._id, e)) : this.styleTween(e, hh(e, r, t), n).on("end.style." + e, null);
}
function yh(e, t, n) {
	return function(r) {
		this.style.setProperty(e, t.call(this, r), n);
	};
}
function bh(e, t, n) {
	var r, i;
	function a() {
		var a = t.apply(this, arguments);
		return a !== i && (r = (i = a) && yh(e, a, n)), r;
	}
	return a._value = t, a;
}
function xh(e, t, n) {
	var r = "style." + (e += "");
	if (arguments.length < 2) return (r = this.tween(r)) && r._value;
	if (t == null) return this.tween(r, null);
	if (typeof t != "function") throw Error();
	return this.tween(r, bh(e, t, n ?? ""));
}
function Sh(e) {
	return function() {
		this.textContent = e;
	};
}
function Ch(e) {
	return function() {
		var t = e(this);
		this.textContent = t ?? "";
	};
}
function wh(e) {
	return this.tween("text", typeof e == "function" ? Ch(Mm(this, "text", e)) : Sh(e == null ? "" : e + ""));
}
function Th(e) {
	return function(t) {
		this.textContent = e.call(this, t);
	};
}
function Eh(e) {
	var t, n;
	function r() {
		var r = e.apply(this, arguments);
		return r !== n && (t = (n = r) && Th(r)), t;
	}
	return r._value = e, r;
}
function Dh(e) {
	var t = "text";
	if (arguments.length < 1) return (t = this.tween(t)) && t._value;
	if (e == null) return this.tween(t, null);
	if (typeof e != "function") throw Error();
	return this.tween(t, Eh(e));
}
function Oh() {
	for (var e = this._name, t = this._id, n = Mh(), r = this._groups, i = r.length, a = 0; a < i; ++a) for (var o = r[a], s = o.length, c, l = 0; l < s; ++l) if (c = o[l]) {
		var u = Tm(c, t);
		Sm(c, e, n, l, o, {
			time: u.time + u.delay + u.duration,
			delay: 0,
			duration: u.duration,
			ease: u.ease
		});
	}
	return new jh(r, this._parents, e, n);
}
function kh() {
	var e, t, n = this, r = n._id, i = n.size();
	return new Promise(function(a, o) {
		var s = { value: o }, c = { value: function() {
			--i === 0 && a();
		} };
		n.each(function() {
			var n = wm(this, r), i = n.on;
			i !== e && (t = (e = i).copy(), t._.cancel.push(s), t._.interrupt.push(s), t._.end.push(c)), n.on = t;
		}), i === 0 && a();
	});
}
var Ah = 0;
function jh(e, t, n, r) {
	this._groups = e, this._parents = t, this._name = n, this._id = r;
}
function Mh() {
	return ++Ah;
}
var Nh = Gf.prototype;
jh.prototype = {
	constructor: jh,
	select: lh,
	selectAll: uh,
	selectChild: Nh.selectChild,
	selectChildren: Nh.selectChildren,
	filter: nh,
	merge: rh,
	selection: fh,
	transition: Oh,
	call: Nh.call,
	nodes: Nh.nodes,
	node: Nh.node,
	size: Nh.size,
	empty: Nh.empty,
	each: Nh.each,
	on: oh,
	attr: Bm,
	attrTween: Gm,
	style: vh,
	styleTween: xh,
	text: wh,
	textTween: Dh,
	remove: ch,
	tween: jm,
	delay: Jm,
	duration: Zm,
	ease: $m,
	easeVarying: th,
	end: kh,
	[Symbol.iterator]: Nh[Symbol.iterator]
};
function Ph(e) {
	return ((e *= 2) <= 1 ? e * e * e : (e -= 2) * e * e + 2) / 2;
}
var Fh = {
	time: null,
	delay: 0,
	duration: 250,
	ease: Ph
};
function Ih(e, t) {
	for (var n; !(n = e.__transition) || !(n = n[t]);) if (!(e = e.parentNode)) throw Error(`transition ${t} not found`);
	return n;
}
function Lh(e) {
	var t, n;
	e instanceof jh ? (t = e._id, e = e._name) : (t = Mh(), (n = Fh).time = um(), e = e == null ? null : e + "");
	for (var r = this._groups, i = r.length, a = 0; a < i; ++a) for (var o = r[a], s = o.length, c, l = 0; l < s; ++l) (c = o[l]) && Sm(c, e, t, l, o, n || Ih(c, t));
	return new jh(r, this._parents, e, t);
}
Gf.prototype.interrupt = Om, Gf.prototype.transition = Lh;
var { abs: Rh, max: zh, min: Bh } = Math;
["w", "e"].map(Vh), ["n", "s"].map(Vh), [
	"n",
	"w",
	"e",
	"s",
	"nw",
	"ne",
	"sw",
	"se"
].map(Vh);
function Vh(e) {
	return { type: e };
}
function Hh(e) {
	return Math.abs(e = Math.round(e)) >= 1e21 ? e.toLocaleString("en").replace(/,/g, "") : e.toString(10);
}
function Uh(e, t) {
	if (!isFinite(e) || e === 0) return null;
	var n = (e = t ? e.toExponential(t - 1) : e.toExponential()).indexOf("e"), r = e.slice(0, n);
	return [r.length > 1 ? r[0] + r.slice(2) : r, +e.slice(n + 1)];
}
function Wh(e) {
	return e = Uh(Math.abs(e)), e ? e[1] : NaN;
}
function Gh(e, t) {
	return function(n, r) {
		for (var i = n.length, a = [], o = 0, s = e[0], c = 0; i > 0 && s > 0 && (c + s + 1 > r && (s = Math.max(1, r - c)), a.push(n.substring(i -= s, i + s)), !((c += s + 1) > r));) s = e[o = (o + 1) % e.length];
		return a.reverse().join(t);
	};
}
function Kh(e) {
	return function(t) {
		return t.replace(/[0-9]/g, function(t) {
			return e[+t];
		});
	};
}
var qh = /^(?:(.)?([<>=^]))?([+\-( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?(~)?([a-z%])?$/i;
function Jh(e) {
	if (!(t = qh.exec(e))) throw Error("invalid format: " + e);
	var t;
	return new Yh({
		fill: t[1],
		align: t[2],
		sign: t[3],
		symbol: t[4],
		zero: t[5],
		width: t[6],
		comma: t[7],
		precision: t[8] && t[8].slice(1),
		trim: t[9],
		type: t[10]
	});
}
Jh.prototype = Yh.prototype;
function Yh(e) {
	this.fill = e.fill === void 0 ? " " : e.fill + "", this.align = e.align === void 0 ? ">" : e.align + "", this.sign = e.sign === void 0 ? "-" : e.sign + "", this.symbol = e.symbol === void 0 ? "" : e.symbol + "", this.zero = !!e.zero, this.width = e.width === void 0 ? void 0 : +e.width, this.comma = !!e.comma, this.precision = e.precision === void 0 ? void 0 : +e.precision, this.trim = !!e.trim, this.type = e.type === void 0 ? "" : e.type + "";
}
Yh.prototype.toString = function() {
	return this.fill + this.align + this.sign + this.symbol + (this.zero ? "0" : "") + (this.width === void 0 ? "" : Math.max(1, this.width | 0)) + (this.comma ? "," : "") + (this.precision === void 0 ? "" : "." + Math.max(0, this.precision | 0)) + (this.trim ? "~" : "") + this.type;
};
function Xh(e) {
	out: for (var t = e.length, n = 1, r = -1, i; n < t; ++n) switch (e[n]) {
		case ".":
			r = i = n;
			break;
		case "0":
			r === 0 && (r = n), i = n;
			break;
		default:
			if (!+e[n]) break out;
			r > 0 && (r = 0);
	}
	return r > 0 ? e.slice(0, r) + e.slice(i + 1) : e;
}
var Zh;
function Qh(e, t) {
	var n = Uh(e, t);
	if (!n) return Zh = void 0, e.toPrecision(t);
	var r = n[0], i = n[1], a = i - (Zh = Math.max(-8, Math.min(8, Math.floor(i / 3))) * 3) + 1, o = r.length;
	return a === o ? r : a > o ? r + Array(a - o + 1).join("0") : a > 0 ? r.slice(0, a) + "." + r.slice(a) : "0." + Array(1 - a).join("0") + Uh(e, Math.max(0, t + a - 1))[0];
}
function $h(e, t) {
	var n = Uh(e, t);
	if (!n) return e + "";
	var r = n[0], i = n[1];
	return i < 0 ? "0." + Array(-i).join("0") + r : r.length > i + 1 ? r.slice(0, i + 1) + "." + r.slice(i + 1) : r + Array(i - r.length + 2).join("0");
}
var eg = {
	"%": (e, t) => (e * 100).toFixed(t),
	b: (e) => Math.round(e).toString(2),
	c: (e) => e + "",
	d: Hh,
	e: (e, t) => e.toExponential(t),
	f: (e, t) => e.toFixed(t),
	g: (e, t) => e.toPrecision(t),
	o: (e) => Math.round(e).toString(8),
	p: (e, t) => $h(e * 100, t),
	r: $h,
	s: Qh,
	X: (e) => Math.round(e).toString(16).toUpperCase(),
	x: (e) => Math.round(e).toString(16)
};
function tg(e) {
	return e;
}
var ng = Array.prototype.map, rg = [
	"y",
	"z",
	"a",
	"f",
	"p",
	"n",
	"µ",
	"m",
	"",
	"k",
	"M",
	"G",
	"T",
	"P",
	"E",
	"Z",
	"Y"
];
function ig(e) {
	var t = e.grouping === void 0 || e.thousands === void 0 ? tg : Gh(ng.call(e.grouping, Number), e.thousands + ""), n = e.currency === void 0 ? "" : e.currency[0] + "", r = e.currency === void 0 ? "" : e.currency[1] + "", i = e.decimal === void 0 ? "." : e.decimal + "", a = e.numerals === void 0 ? tg : Kh(ng.call(e.numerals, String)), o = e.percent === void 0 ? "%" : e.percent + "", s = e.minus === void 0 ? "−" : e.minus + "", c = e.nan === void 0 ? "NaN" : e.nan + "";
	function l(e, l) {
		e = Jh(e);
		var u = e.fill, d = e.align, f = e.sign, p = e.symbol, m = e.zero, h = e.width, g = e.comma, _ = e.precision, v = e.trim, y = e.type;
		y === "n" ? (g = !0, y = "g") : eg[y] || (_ === void 0 && (_ = 12), v = !0, y = "g"), (m || u === "0" && d === "=") && (m = !0, u = "0", d = "=");
		var b = (l && l.prefix !== void 0 ? l.prefix : "") + (p === "$" ? n : p === "#" && /[boxX]/.test(y) ? "0" + y.toLowerCase() : ""), x = (p === "$" ? r : /[%p]/.test(y) ? o : "") + (l && l.suffix !== void 0 ? l.suffix : ""), ee = eg[y], S = /[defgprs%]/.test(y);
		_ = _ === void 0 ? 6 : /[gprs]/.test(y) ? Math.max(1, Math.min(21, _)) : Math.max(0, Math.min(20, _));
		function te(e) {
			var n = b, r = x, o, l, p;
			if (y === "c") r = ee(e) + r, e = "";
			else {
				e = +e;
				var te = e < 0 || 1 / e < 0;
				if (e = isNaN(e) ? c : ee(Math.abs(e), _), v && (e = Xh(e)), te && +e == 0 && f !== "+" && (te = !1), n = (te ? f === "(" ? f : s : f === "-" || f === "(" ? "" : f) + n, r = (y === "s" && !isNaN(e) && Zh !== void 0 ? rg[8 + Zh / 3] : "") + r + (te && f === "(" ? ")" : ""), S) {
					for (o = -1, l = e.length; ++o < l;) if (p = e.charCodeAt(o), 48 > p || p > 57) {
						r = (p === 46 ? i + e.slice(o + 1) : e.slice(o)) + r, e = e.slice(0, o);
						break;
					}
				}
			}
			g && !m && (e = t(e, Infinity));
			var ne = n.length + e.length + r.length, re = ne < h ? Array(h - ne + 1).join(u) : "";
			switch (g && m && (e = t(re + e, re.length ? h - r.length : Infinity), re = ""), d) {
				case "<":
					e = n + e + r + re;
					break;
				case "=":
					e = n + re + e + r;
					break;
				case "^":
					e = re.slice(0, ne = re.length >> 1) + n + e + r + re.slice(ne);
					break;
				default: e = re + n + e + r;
			}
			return a(e);
		}
		return te.toString = function() {
			return e + "";
		}, te;
	}
	function u(e, t) {
		var n = Math.max(-8, Math.min(8, Math.floor(Wh(t) / 3))) * 3, r = 10 ** -n, i = l((e = Jh(e), e.type = "f", e), { suffix: rg[8 + n / 3] });
		return function(e) {
			return i(r * e);
		};
	}
	return {
		format: l,
		formatPrefix: u
	};
}
var ag;
og({
	thousands: ",",
	grouping: [3],
	currency: ["$", ""]
});
function og(e) {
	return ag = ig(e), ag.format, ag.formatPrefix, ag;
}
function sg(e, t, n) {
	this.k = e, this.x = t, this.y = n;
}
sg.prototype = {
	constructor: sg,
	scale: function(e) {
		return e === 1 ? this : new sg(this.k * e, this.x, this.y);
	},
	translate: function(e, t) {
		return e === 0 & t === 0 ? this : new sg(this.k, this.x + this.k * e, this.y + this.k * t);
	},
	apply: function(e) {
		return [e[0] * this.k + this.x, e[1] * this.k + this.y];
	},
	applyX: function(e) {
		return e * this.k + this.x;
	},
	applyY: function(e) {
		return e * this.k + this.y;
	},
	invert: function(e) {
		return [(e[0] - this.x) / this.k, (e[1] - this.y) / this.k];
	},
	invertX: function(e) {
		return (e - this.x) / this.k;
	},
	invertY: function(e) {
		return (e - this.y) / this.k;
	},
	rescaleX: function(e) {
		return e.copy().domain(e.range().map(this.invertX, this).map(e.invert, e));
	},
	rescaleY: function(e) {
		return e.copy().domain(e.range().map(this.invertY, this).map(e.invert, e));
	},
	toString: function() {
		return "translate(" + this.x + "," + this.y + ") scale(" + this.k + ")";
	}
};
var cg = new sg(1, 0, 0);
lg.prototype = sg.prototype;
function lg(e) {
	for (; !e.__zoom;) if (!(e = e.parentNode)) return cg;
	return e.__zoom;
}
//#endregion
//#region ../../node_modules/.pnpm/@takram+three-atmosphere@0.19.1_@react-three+fiber@9.1.2_@types+react@19.2.18_react-dom_4fc11f8320140224cc7ea606f8a9dafc/node_modules/@takram/three-atmosphere/build/shaders/bruneton.js
var ug = Ho, dg = Bo, fg = Vo, pg = class e {
	constructor(e = 0, t = 0, n = 0, r = 0) {
		this.expTerm = e, this.exponent = t, this.linearTerm = n, this.constantTerm = r;
	}
	set(e = 0, t = 0, n = 0, r = 0) {
		return this.expTerm = e, this.exponent = t, this.linearTerm = n, this.constantTerm = r, this;
	}
	clone() {
		return new e(this.expTerm, this.exponent, this.linearTerm, this.constantTerm);
	}
	copy(e) {
		return this.expTerm = e.expTerm, this.exponent = e.exponent, this.linearTerm = e.linearTerm, this.constantTerm = e.constantTerm, this;
	}
}, mg = [
	"channel",
	"altitude",
	"height",
	"densityScale",
	"shapeAmount",
	"shapeDetailAmount",
	"weatherExponent",
	"shapeAlteringBias",
	"coverageFilterWidth",
	"shadow",
	"densityProfile"
];
function hg(e, t) {
	if (t != null) for (let n of mg) {
		let r = t[n];
		r != null && (e[n] instanceof pg ? e[n].copy(r) : e[n] = r);
	}
}
var gg = class e {
	constructor(e) {
		this.channel = "r", this.altitude = 0, this.height = 0, this.densityScale = .2, this.shapeAmount = 1, this.shapeDetailAmount = 1, this.weatherExponent = 1, this.shapeAlteringBias = .35, this.coverageFilterWidth = .6, this.densityProfile = new pg(0, 0, .75, .25), this.shadow = !1, this.set(e);
	}
	set(e) {
		return hg(this, e), this;
	}
	clone() {
		return new e(this);
	}
	copy(e) {
		return this.channel = e.channel, this.altitude = e.altitude, this.height = e.height, this.densityScale = e.densityScale, this.shapeAmount = e.shapeAmount, this.shapeDetailAmount = e.shapeDetailAmount, this.weatherExponent = e.weatherExponent, this.shapeAlteringBias = e.shapeAlteringBias, this.coverageFilterWidth = e.coverageFilterWidth, this.densityProfile.copy(e.densityProfile), this.shadow = e.shadow, this;
	}
};
gg.DEFAULT = /* @__PURE__ */ new gg();
var _g = gg, vg = /* @__PURE__ */ Array.from({ length: 8 }, () => ({
	value: 0,
	flag: 0
})), yg = /* @__PURE__ */ Array.from({ length: 3 }, () => ({
	min: 0,
	max: 0
}));
function bg(e, t) {
	return e.value === t.value ? e.flag - t.flag : e.value - t.value;
}
var xg = class e extends Array {
	constructor(e) {
		super(new _g(e?.[0]), new _g(e?.[1]), new _g(e?.[2]), new _g(e?.[3]));
	}
	set(e) {
		return this[0].set(e?.[0]), this[1].set(e?.[1]), this[2].set(e?.[2]), this[3].set(e?.[3]), this;
	}
	reset() {
		return this[0].copy(_g.DEFAULT), this[1].copy(_g.DEFAULT), this[2].copy(_g.DEFAULT), this[3].copy(_g.DEFAULT), this;
	}
	clone() {
		return new e(this);
	}
	copy(e) {
		return this[0].copy(e[0]), this[1].copy(e[1]), this[2].copy(e[2]), this[3].copy(e[3]), this;
	}
	get localWeatherChannels() {
		return this[0].channel + this[1].channel + this[2].channel + this[3].channel;
	}
	packValues(e, t) {
		return t.set(this[0][e], this[1][e], this[2][e], this[3][e]);
	}
	packSums(e, t, n) {
		return n.set(this[0][e] + this[0][t], this[1][e] + this[1][t], this[2][e] + this[2][t], this[3][e] + this[3][t]);
	}
	packDensityProfiles(e, t) {
		return t.set(this[0].densityProfile[e], this[1].densityProfile[e], this[2].densityProfile[e], this[3].densityProfile[e]);
	}
	packIntervalHeights(e, t) {
		for (let e = 0; e < 4; ++e) {
			let t = this[e], n = vg[e];
			n.value = t.altitude, n.flag = 0, n = vg[e + 4], n.value = t.altitude + t.height, n.flag = 1;
		}
		vg.sort(bg);
		let n = 0, r = 0;
		for (let e = 0; e < vg.length; ++e) {
			let { value: t, flag: i } = vg[e];
			if (r === 0 && e > 0) {
				let r = yg[n++];
				r.min = vg[e - 1].value, r.max = t;
			}
			r += i === 0 ? 1 : -1;
		}
		for (; n < 3; ++n) {
			let e = yg[n];
			e.min = 0, e.max = 0;
		}
		let i = yg[0];
		e.x = i.min, t.x = i.max, i = yg[1], e.y = i.min, t.y = i.max, i = yg[2], e.z = i.min, t.z = i.max;
	}
};
xg.DEFAULT = /* @__PURE__ */ new xg([
	{
		channel: "r",
		altitude: 750,
		height: 650,
		densityScale: .2,
		shapeAmount: 1,
		shapeDetailAmount: 1,
		weatherExponent: 1,
		shapeAlteringBias: .35,
		coverageFilterWidth: .6,
		shadow: !0
	},
	{
		channel: "g",
		altitude: 1e3,
		height: 1200,
		densityScale: .2,
		shapeAmount: 1,
		shapeDetailAmount: 1,
		weatherExponent: 1,
		shapeAlteringBias: .35,
		coverageFilterWidth: .6,
		shadow: !0
	},
	{
		channel: "b",
		altitude: 7500,
		height: 500,
		densityScale: .003,
		shapeAmount: .4,
		shapeDetailAmount: 0,
		weatherExponent: 1,
		shapeAlteringBias: .35,
		coverageFilterWidth: .5
	},
	{ channel: "a" }
]);
var Sg = xg, Cg = "Invariant failed";
function wg(e, t) {
	if (!e) throw Error(Cg);
}
var Tg = class e {
	constructor(e, t) {
		this.near = [
			new j(),
			new j(),
			new j(),
			new j()
		], this.far = [
			new j(),
			new j(),
			new j(),
			new j()
		], e != null && t != null && this.setFromCamera(e, t);
	}
	clone() {
		return new e().copy(this);
	}
	copy(e) {
		for (let t = 0; t < 4; ++t) this.near[t].copy(e.near[t]), this.far[t].copy(e.far[t]);
		return this;
	}
	setFromCamera(e, t) {
		let n = e.isOrthographicCamera === !0, r = e.projectionMatrixInverse;
		this.near[0].set(1, 1, -1), this.near[1].set(1, -1, -1), this.near[2].set(-1, -1, -1), this.near[3].set(-1, 1, -1);
		for (let e = 0; e < 4; ++e) this.near[e].applyMatrix4(r);
		this.far[0].set(1, 1, 1), this.far[1].set(1, -1, 1), this.far[2].set(-1, -1, 1), this.far[3].set(-1, 1, 1);
		for (let e = 0; e < 4; ++e) {
			let i = this.far[e];
			i.applyMatrix4(r);
			let a = Math.abs(i.z);
			n ? i.z *= Math.min(t / a, 1) : i.multiplyScalar(Math.min(t / a, 1));
		}
		return this;
	}
	split(t, n = []) {
		for (let r = 0; r < t.length; ++r) {
			let i = n[r] ??= new e();
			if (r === 0) for (let e = 0; e < 4; ++e) i.near[e].copy(this.near[e]);
			else for (let e = 0; e < 4; ++e) i.near[e].lerpVectors(this.near[e], this.far[e], t[r - 1]);
			if (r === t.length - 1) for (let e = 0; e < 4; ++e) i.far[e].copy(this.far[e]);
			else for (let e = 0; e < 4; ++e) i.far[e].lerpVectors(this.near[e], this.far[e], t[r]);
		}
		return n.length = t.length, n;
	}
	applyMatrix4(e) {
		for (let t = 0; t < 4; ++t) this.near[t].applyMatrix4(e), this.far[t].applyMatrix4(e);
		return this;
	}
}, Eg = {
	uniform: (e, t, n, r, i = []) => {
		for (let r = 0; r < e; ++r) i[r] = (t + (n - t) * (r + 1) / e) / n;
		return i.length = e, i;
	},
	logarithmic: (e, t, n, r, i = []) => {
		for (let r = 0; r < e; ++r) i[r] = t * (n / t) ** ((r + 1) / e) / n;
		return i.length = e, i;
	},
	practical: (e, t, n, r = .5, i = []) => {
		for (let a = 0; a < e; ++a) {
			let o = (t + (n - t) * (a + 1) / e) / n, s = t * (n / t) ** ((a + 1) / e) / n;
			i[a] = Za(o, s, r);
		}
		return i.length = e, i;
	}
};
function Dg(e, t, n, r, i, a = []) {
	return Eg[e](t, n, r, i, a);
}
var Og = /* @__PURE__ */ new j(), kg = /* @__PURE__ */ new j(), Ag = /* @__PURE__ */ new E(), jg = /* @__PURE__ */ new E(), Mg = /* @__PURE__ */ new Tg(), Ng = /* @__PURE__ */ new Ie(), Pg = {
	maxFar: null,
	farScale: 1,
	splitMode: "practical",
	splitLambda: .5,
	margin: 0,
	fade: !0
}, Fg = class {
	constructor(e) {
		this.cascades = [], this.mapSize = new A(), this.cameraFrustum = new Tg(), this.frusta = [], this.splits = [], this._far = 0;
		let { cascadeCount: t, mapSize: n, maxFar: r, farScale: i, splitMode: a, splitLambda: o, margin: s, fade: c } = {
			...Pg,
			...e
		};
		this.cascadeCount = t, this.mapSize.copy(n), this.maxFar = r, this.farScale = i, this.splitMode = a, this.splitLambda = o, this.margin = s, this.fade = c;
	}
	get cascadeCount() {
		return this.cascades.length;
	}
	set cascadeCount(e) {
		if (e !== this.cascadeCount) {
			for (let t = 0; t < e; ++t) this.cascades[t] ??= {
				interval: new A(),
				matrix: new E(),
				inverseMatrix: new E(),
				projectionMatrix: new E(),
				inverseProjectionMatrix: new E(),
				viewMatrix: new E(),
				inverseViewMatrix: new E()
			};
			this.cascades.length = e;
		}
	}
	get far() {
		return this._far;
	}
	updateIntervals(e) {
		let t = this.cascadeCount, n = this.splits, r = this.far;
		Dg(this.splitMode, t, e.near, r, this.splitLambda, n), this.cameraFrustum.setFromCamera(e, r), this.cameraFrustum.split(n, this.frusta);
		let i = this.cascades;
		for (let e = 0; e < t; ++e) i[e].interval.set(n[e - 1] ?? 0, n[e] ?? 0);
	}
	getFrustumRadius(e, t) {
		let n = t.near, r = t.far, i = Math.max(r[0].distanceTo(r[2]), r[0].distanceTo(n[2]));
		if (this.fade) {
			let t = e.near, n = this.far, a = r[0].z / (n - t);
			i += .25 * a ** 2 * (n - t);
		}
		return i * .5;
	}
	updateMatrices(e, t, n = 1) {
		let r = Ag.lookAt(Og.setScalar(0), kg.copy(t).multiplyScalar(-1), Mt.DEFAULT_UP), i = jg.multiplyMatrices(jg.copy(r).invert(), e.matrixWorld), a = this.frusta, o = this.cascades;
		wg(a.length === o.length);
		let s = this.margin, c = this.mapSize;
		for (let l = 0; l < a.length; ++l) {
			let u = a[l], d = o[l], f = this.getFrustumRadius(e, a[l]), p = -f, m = f, h = f, g = -f;
			d.projectionMatrix.makeOrthographic(p, m, h, g, -this.margin, f * 2 + this.margin);
			let { near: _, far: v } = Mg.copy(u).applyMatrix4(i), y = Ng.makeEmpty();
			for (let e = 0; e < 4; e++) y.expandByPoint(_[e]), y.expandByPoint(v[e]);
			let b = y.getCenter(Og);
			b.z = y.max.z + s;
			let x = (m - p) / c.width, ee = (h - g) / c.height;
			b.x = Math.round(b.x / x) * x, b.y = Math.round(b.y / ee) * ee, b.applyMatrix4(r);
			let S = kg.copy(t).multiplyScalar(n).add(b);
			d.inverseViewMatrix.lookAt(b, S, Mt.DEFAULT_UP).setPosition(S);
		}
	}
	update(e, t, n) {
		this._far = this.maxFar == null ? e.far * this.farScale : Math.min(this.maxFar, e.far * this.farScale), this.updateIntervals(e), this.updateMatrices(e, t, n);
		let r = this.cascades, i = this.cascadeCount;
		for (let e = 0; e < i; ++e) {
			let { matrix: t, inverseMatrix: n, projectionMatrix: i, inverseProjectionMatrix: a, viewMatrix: o, inverseViewMatrix: s } = r[e];
			a.copy(i).invert(), o.copy(s).invert(), t.copy(i).multiply(o), n.copy(s).multiply(a);
		}
	}
}, Ig = [
	0,
	8,
	2,
	10,
	12,
	4,
	14,
	6,
	3,
	11,
	1,
	9,
	15,
	7,
	13,
	5
], Lg = /* @__PURE__ */ Ig.reduce((e, t, n) => {
	let r = new A();
	for (let e = 0; e < 16; ++e) if (Ig[e] === n) {
		r.set((e % 4 + .5) / 4, (Math.floor(e / 4) + .5) / 4);
		break;
	}
	return [...e, r];
}, []), J = {
	resolutionScale: 1,
	lightShafts: !0,
	shapeDetail: !0,
	turbulence: !0,
	haze: !0,
	clouds: {
		multiScatteringOctaves: 8,
		accurateSunSkyLight: !0,
		accuratePhaseFunction: !1,
		maxIterationCount: 500,
		minStepSize: 50,
		maxStepSize: 1e3,
		maxRayDistance: 2e5,
		perspectiveStepScale: 1.01,
		minDensity: 1e-5,
		minExtinction: 1e-5,
		minTransmittance: .01,
		maxIterationCountToGround: 3,
		maxIterationCountToSun: 2,
		minSecondaryStepSize: 100,
		secondaryStepScale: 2,
		maxShadowLengthIterationCount: 500,
		minShadowLengthStepSize: 50,
		maxShadowLengthRayDistance: 2e5
	},
	shadow: {
		cascadeCount: 3,
		mapSize: /* @__PURE__ */ new A(512, 512),
		maxIterationCount: 50,
		minStepSize: 100,
		maxStepSize: 1e3,
		minDensity: 1e-5,
		minExtinction: 1e-5,
		minTransmittance: 1e-4
	}
}, Rg = {
	low: {
		...J,
		lightShafts: !1,
		shapeDetail: !1,
		turbulence: !1,
		clouds: {
			...J.clouds,
			accurateSunSkyLight: !1,
			maxIterationCount: 200,
			minStepSize: 100,
			maxRayDistance: 1e5,
			minDensity: 1e-4,
			minExtinction: 1e-4,
			minTransmittance: .1,
			maxIterationCountToGround: 0,
			maxIterationCountToSun: 1
		},
		shadow: {
			...J.shadow,
			maxIterationCount: 25,
			minDensity: 1e-4,
			minExtinction: 1e-4,
			minTransmittance: .01,
			cascadeCount: 2,
			mapSize: /* @__PURE__ */ new A(256, 256)
		}
	},
	medium: {
		...J,
		lightShafts: !1,
		turbulence: !1,
		clouds: {
			...J.clouds,
			minDensity: 1e-4,
			minExtinction: 1e-4,
			accurateSunSkyLight: !1,
			maxIterationCountToSun: 2,
			maxIterationCountToGround: 1
		},
		shadow: {
			...J.shadow,
			minDensity: 1e-4,
			minExtinction: 1e-4,
			mapSize: /* @__PURE__ */ new A(256, 256)
		}
	},
	high: J,
	ultra: {
		...J,
		clouds: {
			...J.clouds,
			minStepSize: 10
		},
		shadow: {
			...J.shadow,
			mapSize: /* @__PURE__ */ new A(1024, 1024)
		}
	}
}, zg = "precision highp float;\nprecision highp sampler3D;\nprecision highp sampler2DArray;\n\n#include <common>\n#include <packing>\n\n#include \"core/depth\"\n#include \"core/math\"\n#include \"core/turbo\"\n#include \"core/generators\"\n#include \"core/raySphereIntersection\"\n#include \"core/cascadedShadowMaps\"\n#include \"core/interleavedGradientNoise\"\n#include \"core/vogelDisk\"\n\n#include \"atmosphere/bruneton/definitions\"\n\nuniform AtmosphereParameters ATMOSPHERE;\nuniform vec3 SUN_SPECTRAL_RADIANCE_TO_LUMINANCE;\nuniform vec3 SKY_SPECTRAL_RADIANCE_TO_LUMINANCE;\n\nuniform sampler2D transmittance_texture;\nuniform sampler3D scattering_texture;\nuniform sampler2D irradiance_texture;\nuniform sampler3D single_mie_scattering_texture;\nuniform sampler3D higher_order_scattering_texture;\n\n#include \"atmosphere/bruneton/common\"\n#include \"atmosphere/bruneton/runtime\"\n\n#include \"types\"\n#include \"parameters\"\n#include \"clouds\"\n\n#if !defined(RECIPROCAL_PI4)\n#define RECIPROCAL_PI4 0.07957747154594767\n#endif // !defined(RECIPROCAL_PI4)\n\nuniform sampler2D depthBuffer;\nuniform mat4 viewMatrix;\nuniform mat4 reprojectionMatrix;\nuniform mat4 viewReprojectionMatrix;\nuniform float cameraNear;\nuniform float cameraFar;\nuniform float cameraHeight;\nuniform vec2 temporalJitter;\nuniform vec2 targetUvScale;\nuniform float mipLevelScale;\n\n// Scattering\nconst vec2 scatterAnisotropy = vec2(SCATTER_ANISOTROPY_1, SCATTER_ANISOTROPY_2);\nconst float scatterAnisotropyMix = SCATTER_ANISOTROPY_MIX;\nuniform float skyLightScale;\nuniform float groundBounceScale;\nuniform float powderScale;\nuniform float powderExponent;\n\n// Primary raymarch\nuniform int maxIterationCount;\nuniform float minStepSize;\nuniform float maxStepSize;\nuniform float maxRayDistance;\nuniform float perspectiveStepScale;\n\n// Secondary raymarch\nuniform int maxIterationCountToSun;\nuniform int maxIterationCountToGround;\nuniform float minSecondaryStepSize;\nuniform float secondaryStepScale;\n\n// Beer shadow map\nuniform sampler2DArray shadowBuffer;\nuniform vec2 shadowTexelSize;\nuniform vec2 shadowIntervals[SHADOW_CASCADE_COUNT];\nuniform mat4 shadowMatrices[SHADOW_CASCADE_COUNT];\nuniform float shadowFar;\nuniform float maxShadowFilterRadius;\n\n// Shadow length\n#ifdef SHADOW_LENGTH\nuniform int maxShadowLengthIterationCount;\nuniform float minShadowLengthStepSize;\nuniform float maxShadowLengthRayDistance;\n#endif // SHADOW_LENGTH\n\nin vec2 vUv;\nin vec3 vCameraPosition;\nin vec3 vCameraDirection; // Direction to the center of screen\nin vec3 vRayDirection; // Direction to the texel\nin vec3 vViewPosition;\nin GroundIrradiance vGroundIrradiance;\nin CloudsIrradiance vCloudsIrradiance;\n\nlayout(location = 0) out vec4 outputColor;\nlayout(location = 1) out vec3 outputDepthVelocity;\n#ifdef SHADOW_LENGTH\nlayout(location = 2) out float outputShadowLength;\n#endif // SHADOW_LENGTH\n\nfloat getViewZ(const float depth) {\n  #ifdef PERSPECTIVE_CAMERA\n  return perspectiveDepthToViewZ(depth, cameraNear, cameraFar);\n  #else // PERSPECTIVE_CAMERA\n  return orthographicDepthToViewZ(depth, cameraNear, cameraFar);\n  #endif // PERSPECTIVE_CAMERA\n}\n\nvec3 ecefToWorld(const vec3 positionECEF) {\n  return (ecefToWorldMatrix * vec4(positionECEF - altitudeCorrection, 1.0)).xyz;\n}\n\nvec2 getShadowUv(const vec3 worldPosition, const int cascadeIndex) {\n  vec4 clip = shadowMatrices[cascadeIndex] * vec4(worldPosition, 1.0);\n  clip /= clip.w;\n  return clip.xy * 0.5 + 0.5;\n}\n\nfloat getDistanceToShadowTop(const vec3 rayPosition) {\n  // Distance to the top of the shadows along the sun direction, which matches\n  // the ray origin of BSM.\n  return raySphereSecondIntersection(\n    rayPosition,\n    sunDirection,\n    vec3(0.0),\n    bottomRadius + shadowTopHeight\n  );\n}\n\n#ifdef DEBUG_SHOW_CASCADES\n\nconst vec3 cascadeColors[4] = vec3[4](\n  vec3(1.0, 0.0, 0.0),\n  vec3(0.0, 1.0, 0.0),\n  vec3(0.0, 0.0, 1.0),\n  vec3(1.0, 1.0, 0.0)\n);\n\nvec3 getCascadeColor(const vec3 rayPosition) {\n  vec3 worldPosition = ecefToWorld(rayPosition);\n  int cascadeIndex = getCascadeIndex(\n    viewMatrix,\n    worldPosition,\n    shadowIntervals,\n    cameraNear,\n    shadowFar\n  );\n  vec2 uv = getShadowUv(worldPosition, cascadeIndex);\n  if (uv.x < 0.0 || uv.x > 1.0 || uv.y < 0.0 || uv.y > 1.0) {\n    return vec3(1.0);\n  }\n  return cascadeColors[cascadeIndex];\n}\n\nvec3 getFadedCascadeColor(const vec3 rayPosition, const float jitter) {\n  vec3 worldPosition = ecefToWorld(rayPosition);\n  int cascadeIndex = getFadedCascadeIndex(\n    viewMatrix,\n    worldPosition,\n    shadowIntervals,\n    cameraNear,\n    shadowFar,\n    jitter\n  );\n  return cascadeIndex >= 0\n    ? cascadeColors[cascadeIndex]\n    : vec3(1.0);\n}\n\n#endif // DEBUG_SHOW_CASCADES\n\nfloat readShadowOpticalDepth(\n  const vec2 uv,\n  const float distanceToTop,\n  const float distanceOffset,\n  const int cascadeIndex\n) {\n  // r: frontDepth, g: meanExtinction, b: maxOpticalDepth, a: maxOpticalDepthTail\n  // Also see the discussion here: https://x.com/shotamatsuda/status/1885322308908442106\n  vec4 shadow = texture(shadowBuffer, vec3(uv, float(cascadeIndex)));\n  float distanceToFront = max(0.0, distanceToTop - distanceOffset - shadow.r);\n  return min(shadow.b + shadow.a, shadow.g * distanceToFront);\n}\n\nfloat sampleShadowOpticalDepthPCF(\n  const vec3 worldPosition,\n  const float distanceToTop,\n  const float distanceOffset,\n  const float radius,\n  const int cascadeIndex\n) {\n  vec2 uv = getShadowUv(worldPosition, cascadeIndex);\n  if (uv.x < 0.0 || uv.x > 1.0 || uv.y < 0.0 || uv.y > 1.0) {\n    return 0.0;\n  }\n  if (radius < 0.1) {\n    return readShadowOpticalDepth(uv, distanceToTop, distanceOffset, cascadeIndex);\n  }\n  float sum = 0.0;\n  vec2 offset;\n  #pragma unroll_loop_start\n  for (int i = 0; i < 16; ++i) {\n    #if UNROLLED_LOOP_INDEX < SHADOW_SAMPLE_COUNT\n    offset = vogelDisk(\n      UNROLLED_LOOP_INDEX,\n      SHADOW_SAMPLE_COUNT,\n      interleavedGradientNoise(gl_FragCoord.xy + temporalJitter * resolution) * PI2\n    );\n    sum += readShadowOpticalDepth(\n      uv + offset * radius * shadowTexelSize,\n      distanceToTop,\n      distanceOffset,\n      cascadeIndex\n    );\n    #endif // UNROLLED_LOOP_INDEX < SHADOW_SAMPLE_COUNT\n  }\n  #pragma unroll_loop_end\n  return sum / float(SHADOW_SAMPLE_COUNT);\n}\n\nfloat sampleShadowOpticalDepth(\n  const vec3 rayPosition,\n  const float distanceOffset,\n  const float radius,\n  const float jitter\n) {\n  float distanceToTop = getDistanceToShadowTop(rayPosition);\n  if (distanceToTop <= 0.0) {\n    return 0.0;\n  }\n  vec3 worldPosition = ecefToWorld(rayPosition);\n  int cascadeIndex = getFadedCascadeIndex(\n    viewMatrix,\n    worldPosition,\n    shadowIntervals,\n    cameraNear,\n    shadowFar,\n    jitter\n  );\n  return cascadeIndex >= 0\n    ? sampleShadowOpticalDepthPCF(\n      worldPosition,\n      distanceToTop,\n      distanceOffset,\n      radius,\n      cascadeIndex\n    )\n    : 0.0;\n}\n\n#ifdef DEBUG_SHOW_SHADOW_MAP\nvec4 getCascadedShadowMaps(vec2 uv) {\n  vec4 coord = vec4(vUv, vUv - 0.5) * 2.0;\n  vec4 shadow = vec4(0.0);\n  if (uv.y > 0.5) {\n    if (uv.x < 0.5) {\n      shadow = texture(shadowBuffer, vec3(coord.xw, 0.0));\n    } else {\n      #if SHADOW_CASCADE_COUNT > 1\n      shadow = texture(shadowBuffer, vec3(coord.zw, 1.0));\n      #endif // SHADOW_CASCADE_COUNT > 1\n    }\n  } else {\n    if (uv.x < 0.5) {\n      #if SHADOW_CASCADE_COUNT > 2\n      shadow = texture(shadowBuffer, vec3(coord.xy, 2.0));\n      #endif // SHADOW_CASCADE_COUNT > 2\n    } else {\n      #if SHADOW_CASCADE_COUNT > 3\n      shadow = texture(shadowBuffer, vec3(coord.zy, 3.0));\n      #endif // SHADOW_CASCADE_COUNT > 3\n    }\n  }\n\n  #if !defined(DEBUG_SHOW_SHADOW_MAP_TYPE)\n  #define DEBUG_SHOW_SHADOW_MAP_TYPE 0\n  #endif // !defined(DEBUG_SHOW_SHADOW_MAP_TYPE\n\n  const float frontDepthScale = 1e-5;\n  const float meanExtinctionScale = 10.0;\n  const float maxOpticalDepthScale = 0.01;\n  vec3 color;\n  #if DEBUG_SHOW_SHADOW_MAP_TYPE == 1\n  color = vec3(shadow.r * frontDepthScale);\n  #elif DEBUG_SHOW_SHADOW_MAP_TYPE == 2\n  color = vec3(shadow.g * meanExtinctionScale);\n  #elif DEBUG_SHOW_SHADOW_MAP_TYPE == 3\n  color = vec3((shadow.b + shadow.a) * maxOpticalDepthScale);\n  #else // DEBUG_SHOW_SHADOW_MAP_TYPE\n  color =\n    (shadow.rgb + vec3(0.0, 0.0, shadow.a)) *\n    vec3(frontDepthScale, meanExtinctionScale, maxOpticalDepthScale);\n  #endif // DEBUG_SHOW_SHADOW_MAP_TYPE\n  return vec4(color, 1.0);\n}\n#endif // DEBUG_SHOW_SHADOW_MAP\n\nvec2 henyeyGreenstein(const vec2 g, const float cosTheta) {\n  vec2 g2 = g * g;\n  // prettier-ignore\n  return RECIPROCAL_PI4 *\n    ((1.0 - g2) / max(vec2(1e-7), pow(1.0 + g2 - 2.0 * g * cosTheta, vec2(1.5))));\n}\n\n#ifdef ACCURATE_PHASE_FUNCTION\n\nfloat draine(float u, float g, float a) {\n  float g2 = g * g;\n  // prettier-ignore\n  return (1.0 - g2) *\n    (1.0 + a * u * u) /\n    (4.0 * (1.0 + a * (1.0 + 2.0 * g2) / 3.0) * PI * pow(1.0 + g2 - 2.0 * g * u, 1.5));\n}\n\n// Numerically-fitted large particles (d=10) phase function It won't be\n// plausible without a more precise multiple scattering.\n// Reference: https://research.nvidia.com/labs/rtr/approximate-mie/\nfloat phaseFunction(const float cosTheta, const float attenuation) {\n  const float gHG = 0.988176691700256; // exp(-0.0990567/(d-1.67154))\n  const float gD = 0.5556712547839497; // exp(-2.20679/(d+3.91029) - 0.428934)\n  const float alpha = 21.995520856274638; // exp(3.62489 - 8.29288/(d+5.52825))\n  const float weight = 0.4819554318404214; // exp(-0.599085/(d-0.641583)-0.665888)\n  return mix(\n    henyeyGreenstein(vec2(gHG) * attenuation, cosTheta).x,\n    draine(cosTheta, gD * attenuation, alpha),\n    weight\n  );\n}\n\n#else // ACCURATE_PHASE_FUNCTION\n\nfloat phaseFunction(const float cosTheta, const float attenuation) {\n  const vec2 g = scatterAnisotropy;\n  const vec2 weights = vec2(1.0 - scatterAnisotropyMix, scatterAnisotropyMix);\n  // A similar approximation is described in the Frostbite's paper, where phase\n  // angle is attenuated instead of anisotropy.\n  return dot(henyeyGreenstein(g * attenuation, cosTheta), weights);\n}\n\n#endif // ACCURATE_PHASE_FUNCTION\n\nfloat phaseFunction(const float cosTheta) {\n  return phaseFunction(cosTheta, 1.0);\n}\n\nfloat marchOpticalDepth(\n  const vec3 rayOrigin,\n  const vec3 rayDirection,\n  const int maxIterationCount,\n  const float mipLevel,\n  const float jitter,\n  out float rayDistance\n) {\n  int iterationCount = int(\n    max(0.0, remap(mipLevel, 0.0, 1.0, float(maxIterationCount + 1), 1.0) - jitter)\n  );\n  if (iterationCount == 0) {\n    // Fudge factor to approximate the mean optical depth.\n    // TODO: Remove it.\n    return 0.5;\n  }\n  float stepSize = minSecondaryStepSize / float(iterationCount);\n  float nextDistance = stepSize * jitter;\n  float opticalDepth = 0.0;\n  for (int i = 0; i < iterationCount; ++i) {\n    rayDistance = nextDistance;\n    vec3 position = rayDistance * rayDirection + rayOrigin;\n    vec2 uv = getGlobeUv(position);\n    float height = length(position) - bottomRadius;\n    WeatherSample weather = sampleWeather(uv, height, mipLevel);\n    MediaSample media = sampleMedia(weather, position, uv, mipLevel, jitter);\n    opticalDepth += media.extinction * stepSize;\n    nextDistance += stepSize;\n    stepSize *= secondaryStepScale;\n  }\n  return opticalDepth;\n}\n\nfloat marchOpticalDepth(\n  const vec3 rayOrigin,\n  const vec3 rayDirection,\n  const int maxIterationCount,\n  const float mipLevel,\n  const float jitter\n) {\n  float rayDistance;\n  return marchOpticalDepth(\n    rayOrigin,\n    rayDirection,\n    maxIterationCount,\n    mipLevel,\n    jitter,\n    rayDistance\n  );\n}\n\nfloat approximateMultipleScattering(const float opticalDepth, const float cosTheta) {\n  // Multiple scattering approximation\n  // See: https://fpsunflower.github.io/ckulla/data/oz_volumes.pdf\n  // a: attenuation, b: contribution, c: phase attenuation\n  vec3 coeffs = vec3(1.0); // [a, b, c]\n  const vec3 attenuation = vec3(0.5, 0.5, 0.5); // Should satisfy a <= b\n  float scattering = 0.0;\n  float beerLambert;\n  #pragma unroll_loop_start\n  for (int i = 0; i < 12; ++i) {\n    #if UNROLLED_LOOP_INDEX < MULTI_SCATTERING_OCTAVES\n    beerLambert = exp(-opticalDepth * coeffs.y);\n    scattering += coeffs.x * beerLambert * phaseFunction(cosTheta, coeffs.z);\n    coeffs *= attenuation;\n    #endif // UNROLLED_LOOP_INDEX < MULTI_SCATTERING_OCTAVES\n  }\n  #pragma unroll_loop_end\n  return scattering;\n}\n\n// TODO: Construct spherical harmonics of degree 2 using 2 sample points\n// positioned near the horizon occlusion points on the sun direction plane.\nvec3 getGroundSunSkyIrradiance(\n  const vec3 position,\n  const vec3 surfaceNormal,\n  const float height,\n  out vec3 skyIrradiance\n) {\n  #ifdef ACCURATE_SUN_SKY_LIGHT\n  return GetSunAndSkyIrradiance(\n    (position - surfaceNormal * height) * METER_TO_LENGTH_UNIT,\n    surfaceNormal,\n    sunDirection,\n    skyIrradiance\n  );\n  #else // ACCURATE_SUN_SKY_LIGHT\n  skyIrradiance = vGroundIrradiance.sky;\n  return vGroundIrradiance.sun;\n  #endif // ACCURATE_SUN_SKY_LIGHT\n}\n\nvec3 getCloudsSunSkyIrradiance(const vec3 position, const float height, out vec3 skyIrradiance) {\n  #ifdef ACCURATE_SUN_SKY_LIGHT\n  return GetSunAndSkyScalarIrradiance(position * METER_TO_LENGTH_UNIT, sunDirection, skyIrradiance);\n  #else // ACCURATE_SUN_SKY_LIGHT\n  float alpha = remapClamped(height, minHeight, maxHeight);\n  skyIrradiance = mix(vCloudsIrradiance.minSky, vCloudsIrradiance.maxSky, alpha);\n  return mix(vCloudsIrradiance.minSun, vCloudsIrradiance.maxSun, alpha);\n  #endif // ACCURATE_SUN_SKY_LIGHT\n}\n\n#ifdef GROUND_BOUNCE\nvec3 approximateRadianceFromGround(\n  const vec3 position,\n  const vec3 surfaceNormal,\n  const float height,\n  const float mipLevel,\n  const float jitter\n) {\n  float opticalDepthToGround = marchOpticalDepth(\n    position,\n    -surfaceNormal,\n    maxIterationCountToGround,\n    mipLevel,\n    jitter\n  );\n  vec3 skyIrradiance;\n  vec3 sunIrradiance = getGroundSunSkyIrradiance(position, surfaceNormal, height, skyIrradiance);\n  const float groundAlbedo = 0.3;\n  vec3 groundIrradiance = skyIrradiance + (1.0 - coverage) * sunIrradiance;\n  vec3 bouncedRadiance = groundAlbedo * RECIPROCAL_PI * groundIrradiance;\n  return bouncedRadiance * exp(-opticalDepthToGround);\n}\n#endif // GROUND_BOUNCE\n\nvec4 marchClouds(\n  const vec3 rayOrigin,\n  const vec3 rayDirection,\n  const vec2 rayNearFar,\n  const float cosTheta,\n  const float jitter,\n  const float rayStartTexelsPerPixel,\n  out float frontDepth,\n  out ivec3 sampleCount\n) {\n  vec3 radianceIntegral = vec3(0.0);\n  float transmittanceIntegral = 1.0;\n  float weightedDistanceSum = 0.0;\n  float transmittanceSum = 0.0;\n\n  float maxRayDistance = rayNearFar.y - rayNearFar.x;\n  float stepSize = minStepSize + (perspectiveStepScale - 1.0) * rayNearFar.x;\n  // I don't understand why spatial aliasing remains unless doubling the jitter.\n  float rayDistance = stepSize * jitter * 2.0;\n\n  for (int i = 0; i < maxIterationCount; ++i) {\n    if (rayDistance > maxRayDistance) {\n      break; // Termination\n    }\n\n    vec3 position = rayDistance * rayDirection + rayOrigin;\n    float height = length(position) - bottomRadius;\n    float mipLevel = log2(max(1.0, rayStartTexelsPerPixel + rayDistance * 1e-5));\n\n    #if !defined(DEBUG_MARCH_INTERVALS)\n    if (insideLayerIntervals(height)) {\n      stepSize *= perspectiveStepScale;\n      rayDistance += mix(stepSize, maxStepSize, min(1.0, mipLevel));\n      continue;\n    }\n    #endif // !defined(DEBUG_MARCH_INTERVALS)\n\n    // Sample rough weather.\n    vec2 uv = getGlobeUv(position);\n    WeatherSample weather = sampleWeather(uv, height, mipLevel);\n\n    #ifdef DEBUG_SHOW_SAMPLE_COUNT\n    ++sampleCount.x;\n    #endif // DEBUG_SHOW_SAMPLE_COUNT\n\n    if (!any(greaterThan(weather.density, vec4(minDensity)))) {\n      // Step longer in empty space.\n      // TODO: This produces banding artifacts.\n      // Possible improvement: Binary search refinement\n      stepSize *= perspectiveStepScale;\n      rayDistance += mix(stepSize, maxStepSize, min(1.0, mipLevel));\n      continue;\n    }\n\n    // Sample detailed participating media.\n    MediaSample media = sampleMedia(weather, position, uv, mipLevel, jitter, sampleCount);\n\n    if (media.extinction > minExtinction) {\n      vec3 skyIrradiance;\n      vec3 sunIrradiance = getCloudsSunSkyIrradiance(position, height, skyIrradiance);\n      vec3 surfaceNormal = normalize(position);\n\n      // March optical depth to the sun for finer details, which BSM lacks.\n      float sunRayDistance = 0.0;\n      float opticalDepth = marchOpticalDepth(\n        position,\n        sunDirection,\n        maxIterationCountToSun,\n        mipLevel,\n        jitter,\n        sunRayDistance\n      );\n\n      if (height < shadowTopHeight) {\n        // Obtain the optical depth from BSM at the ray position.\n        opticalDepth += sampleShadowOpticalDepth(\n          position,\n          // Take account of only positions further than the marched ray\n          // distance.\n          sunRayDistance,\n          // Apply PCF only when the sun is close to the horizon.\n          maxShadowFilterRadius * remapClamped(dot(sunDirection, surfaceNormal), 0.1, 0.0),\n          jitter\n        );\n      }\n\n      vec3 radiance = sunIrradiance * approximateMultipleScattering(opticalDepth, cosTheta);\n\n      #ifdef GROUND_BOUNCE\n      // Fudge factor for the irradiance from ground.\n      if (height < shadowTopHeight && mipLevel < 0.5) {\n        vec3 groundRadiance = approximateRadianceFromGround(\n          position,\n          surfaceNormal,\n          height,\n          mipLevel,\n          jitter\n        );\n        radiance += groundRadiance * RECIPROCAL_PI4 * groundBounceScale;\n      }\n      #endif // GROUND_BOUNCE\n\n      // Crude approximation of sky gradient. Better than none in the shadows.\n      float skyGradient = dot(weather.heightFraction * 0.5 + 0.5, media.weight);\n      radiance += skyIrradiance * RECIPROCAL_PI4 * skyGradient * skyLightScale;\n\n      // Finally multiply by scattering.\n      radiance *= media.scattering;\n\n      #ifdef POWDER\n      radiance *= 1.0 - powderScale * exp(-media.extinction * powderExponent);\n      #endif // POWDER\n\n      #ifdef DEBUG_SHOW_CASCADES\n      if (height < shadowTopHeight) {\n        radiance = 1e-3 * getFadedCascadeColor(position, jitter);\n      }\n      #endif // DEBUG_SHOW_CASCADES\n\n      // Energy-conserving analytical integration of scattered light\n      // See 5.6.3 in https://media.contentapi.ea.com/content/dam/eacom/frostbite/files/s2016-pbs-frostbite-sky-clouds-new.pdf\n      float transmittance = exp(-media.extinction * stepSize);\n      float clampedExtinction = max(media.extinction, 1e-7);\n      vec3 scatteringIntegral = (radiance - radiance * transmittance) / clampedExtinction;\n      radianceIntegral += transmittanceIntegral * scatteringIntegral;\n      transmittanceIntegral *= transmittance;\n\n      // Aerial perspective affecting clouds\n      // See 5.9.1 in https://media.contentapi.ea.com/content/dam/eacom/frostbite/files/s2016-pbs-frostbite-sky-clouds-new.pdf\n      weightedDistanceSum += rayDistance * transmittanceIntegral;\n      transmittanceSum += transmittanceIntegral;\n    }\n\n    if (transmittanceIntegral <= minTransmittance) {\n      break; // Early termination\n    }\n\n    // Take a shorter step because we've already hit the clouds.\n    stepSize *= perspectiveStepScale;\n    rayDistance += stepSize;\n  }\n\n  // The final product of 5.9.1 and we'll evaluate this in aerial perspective.\n  frontDepth = transmittanceSum > 0.0 ? weightedDistanceSum / transmittanceSum : -1.0;\n\n  return vec4(radianceIntegral, remapClamped(transmittanceIntegral, 1.0, minTransmittance));\n}\n\n#ifdef SHADOW_LENGTH\n\nfloat marchShadowLength(\n  const vec3 rayOrigin,\n  const vec3 rayDirection,\n  const vec2 rayNearFar,\n  const float jitter\n) {\n  float shadowLength = 0.0;\n  float maxRayDistance = rayNearFar.y - rayNearFar.x;\n  float stepSize = minShadowLengthStepSize;\n  float rayDistance = stepSize * jitter;\n  const float attenuationFactor = 1.0 - 5e-4;\n  float attenuation = 1.0;\n\n  // TODO: This march is closed, and sample resolution can be much lower.\n  // Refining the termination by binary search will make it much more efficient.\n  for (int i = 0; i < maxShadowLengthIterationCount; ++i) {\n    if (rayDistance > maxRayDistance) {\n      break; // Termination\n    }\n    vec3 position = rayDistance * rayDirection + rayOrigin;\n    float opticalDepth = sampleShadowOpticalDepth(position, 0.0, 0.0, jitter);\n    shadowLength += (1.0 - exp(-opticalDepth)) * stepSize * attenuation;\n    stepSize *= perspectiveStepScale;\n    rayDistance += stepSize;\n  }\n  return shadowLength;\n}\n\n#endif // SHADOW_LENGTH\n\n#ifdef HAZE\n\nvec4 approximateHaze(\n  const vec3 rayOrigin,\n  const vec3 rayDirection,\n  const float maxRayDistance,\n  const float cosTheta,\n  const float shadowLength\n) {\n  float modulation = remapClamped(coverage, 0.2, 0.4);\n  if (cameraHeight * modulation < 0.0) {\n    return vec4(0.0);\n  }\n  float density = modulation * hazeDensityScale * exp(-cameraHeight * hazeExponent);\n  if (density < 1e-7) {\n    return vec4(0.0); // Prevent artifact in views from space\n  }\n\n  // Blend two normals by the difference in angle so that normal near the\n  // ground becomes that of the origin, and in the sky that of the horizon.\n  vec3 normalAtOrigin = normalize(rayOrigin);\n  vec3 normalAtHorizon = (rayOrigin - dot(rayOrigin, rayDirection) * rayDirection) / bottomRadius;\n  float alpha = remapClamped(dot(normalAtOrigin, normalAtHorizon), 0.9, 1.0);\n  vec3 normal = mix(normalAtOrigin, normalAtHorizon, alpha);\n\n  // Analytical optical depth where density exponentially decreases with height.\n  // Based on: https://iquilezles.org/articles/fog/\n  float angle = max(dot(normal, rayDirection), 1e-5);\n  float exponent = angle * hazeExponent;\n  float linearTerm = density / hazeExponent / angle;\n\n  // Derive the optical depths separately for with and without shadow length.\n  float expTerm = 1.0 - exp(-maxRayDistance * exponent);\n  float shadowExpTerm = 1.0 - exp(-min(maxRayDistance, shadowLength) * exponent);\n  float opticalDepth = expTerm * linearTerm;\n  float shadowOpticalDepth = max((expTerm - shadowExpTerm) * linearTerm, 0.0);\n  float transmittance = saturate(1.0 - exp(-opticalDepth));\n  float shadowTransmittance = saturate(1.0 - exp(-shadowOpticalDepth));\n\n  vec3 skyIrradiance = vGroundIrradiance.sky;\n  vec3 sunIrradiance = vGroundIrradiance.sun;\n  vec3 inscatter = sunIrradiance * phaseFunction(cosTheta) * shadowTransmittance;\n  inscatter += skyIrradiance * RECIPROCAL_PI4 * skyLightScale * transmittance;\n  inscatter *= hazeScatteringCoefficient / (hazeAbsorptionCoefficient + hazeScatteringCoefficient);\n  return vec4(inscatter, transmittance);\n}\n\n#endif // HAZE\n\nvoid applyAerialPerspective(\n  const vec3 cameraPosition,\n  const vec3 frontPosition,\n  const float shadowLength,\n  inout vec4 color\n) {\n  vec3 transmittance;\n  vec3 inscatter = GetSkyRadianceToPoint(\n    cameraPosition * METER_TO_LENGTH_UNIT,\n    frontPosition * METER_TO_LENGTH_UNIT,\n    shadowLength * METER_TO_LENGTH_UNIT,\n    sunDirection,\n    transmittance\n  );\n  color.rgb = color.rgb * transmittance + inscatter * color.a;\n}\n\nbool rayIntersectsGround(const vec3 cameraPosition, const vec3 rayDirection) {\n  float r = length(cameraPosition);\n  float mu = dot(cameraPosition, rayDirection) / r;\n  return mu < 0.0 && r * r * (mu * mu - 1.0) + bottomRadius * bottomRadius >= 0.0;\n}\n\nstruct IntersectionResult {\n  bool ground;\n  vec4 first;\n  vec4 second;\n};\n\nIntersectionResult getIntersections(const vec3 cameraPosition, const vec3 rayDirection) {\n  IntersectionResult intersections;\n  intersections.ground = rayIntersectsGround(cameraPosition, rayDirection);\n  raySphereIntersections(\n    cameraPosition,\n    rayDirection,\n    bottomRadius + vec4(0.0, minHeight, maxHeight, shadowTopHeight),\n    intersections.first,\n    intersections.second\n  );\n  return intersections;\n}\n\nvec2 getRayNearFar(const IntersectionResult intersections) {\n  vec2 nearFar;\n  if (cameraHeight < minHeight) {\n    // View below the clouds\n    if (intersections.ground) {\n      nearFar = vec2(-1.0); // No clouds to the ground\n    } else {\n      nearFar = vec2(intersections.second.y, intersections.second.z);\n      nearFar.y = min(nearFar.y, maxRayDistance);\n    }\n  } else if (cameraHeight < maxHeight) {\n    // View inside the total cloud layer\n    if (intersections.ground) {\n      nearFar = vec2(cameraNear, intersections.first.y);\n    } else {\n      nearFar = vec2(cameraNear, intersections.second.z);\n    }\n  } else {\n    // View above the clouds\n    nearFar = vec2(intersections.first.z, intersections.second.z);\n    if (intersections.ground) {\n      // Clamp the ray at the min height.\n      nearFar.y = intersections.first.y;\n    }\n  }\n  return nearFar;\n}\n\n#ifdef SHADOW_LENGTH\nvec2 getShadowRayNearFar(const IntersectionResult intersections) {\n  vec2 nearFar;\n  if (cameraHeight < shadowTopHeight) {\n    if (intersections.ground) {\n      nearFar = vec2(cameraNear, intersections.first.x);\n    } else {\n      nearFar = vec2(cameraNear, intersections.second.w);\n    }\n  } else {\n    nearFar = vec2(intersections.first.w, intersections.second.w);\n    if (intersections.ground) {\n      // Clamp the ray at the ground.\n      nearFar.y = intersections.first.x;\n    }\n  }\n  nearFar.y = min(nearFar.y, maxShadowLengthRayDistance);\n  return nearFar;\n}\n#endif // SHADOW_LENGTH\n\n#ifdef HAZE\nvec2 getHazeRayNearFar(const IntersectionResult intersections) {\n  vec2 nearFar;\n  if (cameraHeight < maxHeight) {\n    if (intersections.ground) {\n      nearFar = vec2(cameraNear, intersections.first.x);\n    } else {\n      nearFar = vec2(cameraNear, intersections.second.z);\n    }\n  } else {\n    nearFar = vec2(cameraNear, intersections.second.z);\n    if (intersections.ground) {\n      // Clamp the ray at the ground.\n      nearFar.y = intersections.first.x;\n    }\n  }\n  return nearFar;\n}\n#endif // HAZE\n\nfloat getRayDistanceToScene(const vec3 rayDirection, out float viewZ) {\n  float depth = readDepthValue(depthBuffer, vUv * targetUvScale + temporalJitter);\n  if (depth < 1.0 - 1e-7) {\n    depth = reverseLogDepth(depth, cameraNear, cameraFar);\n    viewZ = getViewZ(depth);\n    return -viewZ / dot(rayDirection, vCameraDirection);\n  }\n  viewZ = 0.0;\n  return 0.0;\n}\n\nvoid main() {\n  #ifdef DEBUG_SHOW_SHADOW_MAP\n  outputColor = getCascadedShadowMaps(vUv);\n  outputDepthVelocity = vec3(0.0);\n  #ifdef SHADOW_LENGTH\n  outputShadowLength = 0.0;\n  #endif // SHADOW_LENGTH\n  return;\n  #endif // DEBUG_SHOW_SHADOW_MAP\n\n  vec3 cameraPosition = vCameraPosition + altitudeCorrection;\n  vec3 rayDirection = normalize(vRayDirection);\n  float cosTheta = dot(sunDirection, rayDirection);\n\n  IntersectionResult intersections = getIntersections(cameraPosition, rayDirection);\n  vec2 rayNearFar = getRayNearFar(intersections);\n  #ifdef SHADOW_LENGTH\n  vec2 shadowRayNearFar = getShadowRayNearFar(intersections);\n  #endif // SHADOW_LENGTH\n  #ifdef HAZE\n  vec2 hazeRayNearFar = getHazeRayNearFar(intersections);\n  #endif // HAZE\n\n  float sceneViewZ;\n  float rayDistanceToScene = getRayDistanceToScene(rayDirection, sceneViewZ);\n  if (rayDistanceToScene > 0.0) {\n    rayNearFar.y = min(rayNearFar.y, rayDistanceToScene);\n    #ifdef SHADOW_LENGTH\n    shadowRayNearFar.y = min(shadowRayNearFar.y, rayDistanceToScene);\n    #endif // SHADOW_LENGTH\n    #ifdef HAZE\n    hazeRayNearFar.y = min(hazeRayNearFar.y, rayDistanceToScene);\n    #endif // HAZE\n  }\n\n  bool intersectsGround = any(lessThan(rayNearFar, vec2(0.0)));\n  bool intersectsScene = rayNearFar.y < rayNearFar.x;\n\n  float stbn = getSTBN();\n\n  vec4 color = vec4(0.0);\n  float frontDepth = rayNearFar.y;\n  vec3 depthVelocity = vec3(0.0);\n  float shadowLength = 0.0;\n  bool hitClouds = false;\n\n  if (!intersectsGround && !intersectsScene) {\n    vec3 rayOrigin = rayNearFar.x * rayDirection + cameraPosition;\n\n    vec2 globeUv = getGlobeUv(rayOrigin);\n    #ifdef DEBUG_SHOW_UV\n    outputColor = vec4(vec3(checker(globeUv, localWeatherRepeat + localWeatherOffset)), 1.0);\n    outputDepthVelocity = vec3(0.0);\n    #ifdef SHADOW_LENGTH\n    outputShadowLength = 0.0;\n    #endif // SHADOW_LENGTH\n    return;\n    #endif // DEBUG_SHOW_UV\n\n    float mipLevel = getMipLevel(globeUv * localWeatherRepeat) * mipLevelScale;\n    mipLevel = mix(0.0, mipLevel, min(1.0, 0.2 * cameraHeight / maxHeight));\n\n    float marchedFrontDepth;\n    ivec3 sampleCount = ivec3(0);\n    color = marchClouds(\n      rayOrigin,\n      rayDirection,\n      rayNearFar,\n      cosTheta,\n      stbn,\n      pow(2.0, mipLevel),\n      marchedFrontDepth,\n      sampleCount\n    );\n\n    #ifdef DEBUG_SHOW_SAMPLE_COUNT\n    outputColor = vec4(vec3(sampleCount) / vec3(500.0, 5.0, 5.0), 1.0);\n    outputDepthVelocity = vec3(0.0);\n    #ifdef SHADOW_LENGTH\n    outputShadowLength = 0.0;\n    #endif // SHADOW_LENGTH\n    return;\n    #endif // DEBUG_SHOW_SAMPLE_COUNT\n\n    // Front depth will be -1.0 when no samples are accumulated.\n    hitClouds = marchedFrontDepth >= 0.0;\n    if (hitClouds) {\n      frontDepth = rayNearFar.x + marchedFrontDepth;\n\n      #ifdef SHADOW_LENGTH\n      // Clamp the shadow length ray at the clouds.\n      shadowRayNearFar.y = mix(\n        shadowRayNearFar.y,\n        min(frontDepth, shadowRayNearFar.y),\n        color.a // Interpolate by the alpha for smoother edges.\n      );\n\n      // Shadow length must be computed before applying aerial perspective.\n      if (all(greaterThanEqual(shadowRayNearFar, vec2(0.0)))) {\n        shadowLength = marchShadowLength(\n          shadowRayNearFar.x * rayDirection + cameraPosition,\n          rayDirection,\n          shadowRayNearFar,\n          stbn\n        );\n      }\n      #endif // SHADOW_LENGTH\n\n      #ifdef HAZE\n      // Clamp the haze ray at the clouds.\n      hazeRayNearFar.y = mix(\n        hazeRayNearFar.y,\n        min(frontDepth, hazeRayNearFar.y),\n        color.a // Interpolate by the alpha for smoother edges.\n      );\n      #endif // HAZE\n\n      // Apply aerial perspective.\n      vec3 frontPosition = cameraPosition + frontDepth * rayDirection;\n      applyAerialPerspective(cameraPosition, frontPosition, shadowLength, color);\n\n      // Velocity for temporal resolution.\n      vec3 frontPositionWorld = ecefToWorld(frontPosition);\n      vec4 prevClip = reprojectionMatrix * vec4(frontPositionWorld, 1.0);\n      prevClip /= prevClip.w;\n      vec2 prevUv = prevClip.xy * 0.5 + 0.5;\n      vec2 velocity = vUv - prevUv;\n      depthVelocity = vec3(frontDepth, velocity);\n    }\n  }\n\n  if (!hitClouds) {\n    #ifdef SHADOW_LENGTH\n    if (all(greaterThanEqual(shadowRayNearFar, vec2(0.0)))) {\n      shadowLength = marchShadowLength(\n        shadowRayNearFar.x * rayDirection + cameraPosition,\n        rayDirection,\n        shadowRayNearFar,\n        stbn\n      );\n    }\n    #endif // SHADOW_LENGTH\n\n    // Velocity for temporal resolution. Here reproject in the view space for\n    // greatly reducing the precision errors.\n    frontDepth = sceneViewZ < 0.0 ? -sceneViewZ : cameraFar;\n    vec3 frontView = vViewPosition * frontDepth;\n    vec4 prevClip = viewReprojectionMatrix * vec4(frontView, 1.0);\n    prevClip /= prevClip.w;\n    vec2 prevUv = prevClip.xy * 0.5 + 0.5;\n    vec2 velocity = vUv - prevUv;\n    depthVelocity = vec3(frontDepth, velocity);\n  }\n\n  #ifdef DEBUG_SHOW_FRONT_DEPTH\n  outputColor = vec4(turbo(frontDepth / maxRayDistance), 1.0);\n  outputDepthVelocity = vec3(0.0);\n  #ifdef SHADOW_LENGTH\n  outputShadowLength = 0.0;\n  #endif // SHADOW_LENGTH\n  return;\n  #endif // DEBUG_SHOW_FRONT_DEPTH\n\n  #ifdef HAZE\n  vec4 haze = approximateHaze(\n    cameraNear * rayDirection + cameraPosition,\n    rayDirection,\n    hazeRayNearFar.y - hazeRayNearFar.x,\n    cosTheta,\n    shadowLength\n  );\n  color.rgb = mix(color.rgb, haze.rgb, haze.a);\n  color.a = color.a * (1.0 - haze.a) + haze.a;\n  #endif // HAZE\n\n  outputColor = color;\n  outputDepthVelocity = depthVelocity;\n  #ifdef SHADOW_LENGTH\n  outputShadowLength = shadowLength * METER_TO_LENGTH_UNIT;\n  #endif // SHADOW_LENGTH\n}\n", Bg = "float getSTBN() {\n  ivec3 size = textureSize(stbnTexture, 0);\n  vec3 scale = 1.0 / vec3(size);\n  return texture(stbnTexture, vec3(gl_FragCoord.xy, float(frame % size.z)) * scale).r;\n}\n\n// Straightforward spherical mapping\nvec2 getSphericalUv(const vec3 position) {\n  vec2 st = normalize(position.yx);\n  float phi = atan(st.x, st.y);\n  float theta = asin(normalize(position).z);\n  return vec2(phi * RECIPROCAL_PI2 + 0.5, theta * RECIPROCAL_PI + 0.5);\n}\n\nvec2 getCubeSphereUv(const vec3 position) {\n  // Cube-sphere relaxation by: http://mathproofs.blogspot.com/2005/07/mapping-cube-to-sphere.html\n  // TODO: Tile and fix seams.\n  // Possible improvements:\n  // https://iquilezles.org/articles/texturerepetition/\n  // https://gamedev.stackexchange.com/questions/184388/fragment-shader-map-dot-texture-repeatedly-over-the-sphere\n  // https://github.com/mmikk/hextile-demo\n\n  vec3 n = normalize(position);\n  vec3 f = abs(n);\n  vec3 c = n / max(f.x, max(f.y, f.z));\n  vec2 m;\n  if (all(greaterThan(f.yy, f.xz))) {\n    m = c.y > 0.0 ? vec2(-n.x, n.z) : n.xz;\n  } else if (all(greaterThan(f.xx, f.yz))) {\n    m = c.x > 0.0 ? n.yz : vec2(-n.y, n.z);\n  } else {\n    m = c.z > 0.0 ? n.xy : vec2(n.x, -n.y);\n  }\n\n  vec2 m2 = m * m;\n  float q = dot(m2.xy, vec2(-2.0, 2.0)) - 3.0;\n  float q2 = q * q;\n  vec2 uv;\n  uv.x = sqrt(1.5 + m2.x - m2.y - 0.5 * sqrt(-24.0 * m2.x + q2)) * (m.x > 0.0 ? 1.0 : -1.0);\n  uv.y = sqrt(6.0 / (3.0 - uv.x * uv.x)) * m.y;\n  return uv * 0.5 + 0.5;\n}\n\nvec2 getGlobeUv(const vec3 position) {\n  return getCubeSphereUv(position);\n}\n\nfloat getMipLevel(const vec2 uv) {\n  const float mipLevelScale = 0.1;\n  vec2 coord = uv * resolution;\n  vec2 ddx = dFdx(coord);\n  vec2 ddy = dFdy(coord);\n  float deltaMaxSqr = max(dot(ddx, ddx), dot(ddy, ddy)) * mipLevelScale;\n  return max(0.0, 0.5 * log2(max(1.0, deltaMaxSqr)));\n}\n\nbool insideLayerIntervals(const float height) {\n  bvec3 gt = greaterThan(vec3(height), minIntervalHeights);\n  bvec3 lt = lessThan(vec3(height), maxIntervalHeights);\n  return any(bvec3(gt.x && lt.x, gt.y && lt.y, gt.z && lt.z));\n}\n\nstruct WeatherSample {\n  vec4 heightFraction; // Normalized height of each layer\n  vec4 density;\n};\n\nvec4 shapeAlteringFunction(const vec4 heightFraction, const vec4 bias) {\n  // Apply a semi-circle transform to round the clouds towards the top.\n  vec4 biased = pow(heightFraction, bias);\n  vec4 x = clamp(biased * 2.0 - 1.0, -1.0, 1.0);\n  return 1.0 - x * x;\n}\n\nWeatherSample sampleWeather(const vec2 uv, const float height, const float mipLevel) {\n  WeatherSample weather;\n  weather.heightFraction = remapClamped(vec4(height), minLayerHeights, maxLayerHeights);\n\n  vec4 localWeather = pow(\n    textureLod(\n      localWeatherTexture,\n      uv * localWeatherRepeat + localWeatherOffset,\n      mipLevel\n    ).LOCAL_WEATHER_CHANNELS,\n    weatherExponents\n  );\n  #ifdef SHADOW\n  localWeather *= shadowLayerMask;\n  #endif // SHADOW\n\n  vec4 heightScale = shapeAlteringFunction(weather.heightFraction, shapeAlteringBiases);\n\n  // Modulation to control weather by coverage parameter.\n  // Reference: https://github.com/Prograda/Skybolt/blob/master/Assets/Core/Shaders/Clouds.h#L63\n  vec4 factor = 1.0 - coverage * heightScale;\n  weather.density = remapClamped(\n    mix(localWeather, vec4(1.0), coverageFilterWidths),\n    factor,\n    factor + coverageFilterWidths\n  );\n\n  return weather;\n}\n\nvec4 getLayerDensity(const vec4 heightFraction) {\n  // prettier-ignore\n  return densityProfile.expTerms * exp(densityProfile.exponents * heightFraction) +\n    densityProfile.linearTerms * heightFraction +\n    densityProfile.constantTerms;\n}\n\nstruct MediaSample {\n  float density;\n  vec4 weight;\n  float scattering;\n  float extinction;\n};\n\nMediaSample sampleMedia(\n  const WeatherSample weather,\n  const vec3 position,\n  const vec2 uv,\n  const float mipLevel,\n  const float jitter,\n  out ivec3 sampleCount\n) {\n  vec4 density = weather.density;\n\n  // TODO: Define in physical length.\n  vec3 surfaceNormal = normalize(position);\n  float localWeatherSpeed = length(localWeatherOffset);\n  vec3 evolution = -surfaceNormal * localWeatherSpeed * 2e4;\n\n  vec3 turbulence = vec3(0.0);\n  #ifdef TURBULENCE\n  vec2 turbulenceUv = uv * localWeatherRepeat * turbulenceRepeat;\n  turbulence =\n    turbulenceDisplacement *\n    (texture(turbulenceTexture, turbulenceUv).rgb * 2.0 - 1.0) *\n    dot(density, remapClamped(weather.heightFraction, vec4(0.3), vec4(0.0)));\n  #endif // TURBULENCE\n\n  vec3 shapePosition = (position + evolution + turbulence) * shapeRepeat + shapeOffset;\n  float shape = texture(shapeTexture, shapePosition).r;\n  density = remapClamped(density, vec4(1.0 - shape) * shapeAmounts, vec4(1.0));\n\n  #ifdef DEBUG_SHOW_SAMPLE_COUNT\n  ++sampleCount.y;\n  #endif // DEBUG_SHOW_SAMPLE_COUNT\n\n  #ifdef SHAPE_DETAIL\n  if (mipLevel * 0.5 + (jitter - 0.5) * 0.5 < 0.5) {\n    vec3 detailPosition = (position + turbulence) * shapeDetailRepeat + shapeDetailOffset;\n    float detail = texture(shapeDetailTexture, detailPosition).r;\n    // Fluffy at the top and whippy at the bottom.\n    vec4 modifier = mix(\n      vec4(pow(detail, 6.0)),\n      vec4(1.0 - detail),\n      remapClamped(weather.heightFraction, vec4(0.2), vec4(0.4))\n    );\n    modifier = mix(vec4(0.0), modifier, shapeDetailAmounts);\n    density = remapClamped(density * 2.0, vec4(modifier * 0.5), vec4(1.0));\n\n    #ifdef DEBUG_SHOW_SAMPLE_COUNT\n    ++sampleCount.z;\n    #endif // DEBUG_SHOW_SAMPLE_COUNT\n  }\n  #endif // SHAPE_DETAIL\n\n  // Apply the density profiles.\n  density = saturate(density * densityScales * getLayerDensity(weather.heightFraction));\n\n  MediaSample media;\n  float densitySum = density.x + density.y + density.z + density.w;\n  media.weight = density / densitySum;\n  media.scattering = densitySum * scatteringCoefficient;\n  media.extinction = densitySum * absorptionCoefficient + media.scattering;\n  return media;\n}\n\nMediaSample sampleMedia(\n  const WeatherSample weather,\n  const vec3 position,\n  const vec2 uv,\n  const float mipLevel,\n  const float jitter\n) {\n  ivec3 sampleCount;\n  return sampleMedia(weather, position, uv, mipLevel, jitter, sampleCount);\n}\n", Vg = "precision highp float;\nprecision highp sampler3D;\n\n#include \"atmosphere/bruneton/definitions\"\n\nuniform AtmosphereParameters ATMOSPHERE;\nuniform vec3 SUN_SPECTRAL_RADIANCE_TO_LUMINANCE;\nuniform vec3 SKY_SPECTRAL_RADIANCE_TO_LUMINANCE;\n\nuniform sampler2D transmittance_texture;\nuniform sampler3D scattering_texture;\nuniform sampler2D irradiance_texture;\nuniform sampler3D single_mie_scattering_texture;\nuniform sampler3D higher_order_scattering_texture;\n\n#include \"atmosphere/bruneton/common\"\n#include \"atmosphere/bruneton/runtime\"\n\n#include \"types\"\n\nuniform mat4 inverseProjectionMatrix;\nuniform mat4 inverseViewMatrix;\nuniform vec3 cameraPosition;\nuniform mat4 worldToECEFMatrix;\nuniform vec3 altitudeCorrection;\n\n// Atmosphere\nuniform float bottomRadius;\nuniform vec3 sunDirection;\n\n// Cloud layers\nuniform float minHeight;\nuniform float maxHeight;\n\nlayout(location = 0) in vec3 position;\n\nout vec2 vUv;\nout vec3 vCameraPosition;\nout vec3 vCameraDirection; // Direction to the center of screen\nout vec3 vRayDirection; // Direction to the texel\nout vec3 vViewPosition;\n\nout GroundIrradiance vGroundIrradiance;\nout CloudsIrradiance vCloudsIrradiance;\n\nvoid sampleSunSkyIrradiance(const vec3 positionECEF) {\n  vGroundIrradiance.sun = GetSunAndSkyScalarIrradiance(\n    positionECEF * METER_TO_LENGTH_UNIT,\n    sunDirection,\n    vGroundIrradiance.sky\n  );\n\n  vec3 surfaceNormal = normalize(positionECEF);\n  vec2 radii = (bottomRadius + vec2(minHeight, maxHeight)) * METER_TO_LENGTH_UNIT;\n  vCloudsIrradiance.minSun = GetSunAndSkyScalarIrradiance(\n    surfaceNormal * radii.x,\n    sunDirection,\n    vCloudsIrradiance.minSky\n  );\n  vCloudsIrradiance.maxSun = GetSunAndSkyScalarIrradiance(\n    surfaceNormal * radii.y,\n    sunDirection,\n    vCloudsIrradiance.maxSky\n  );\n}\n\nvoid main() {\n  vUv = position.xy * 0.5 + 0.5;\n\n  vec3 viewPosition = (inverseProjectionMatrix * vec4(position, 1.0)).xyz;\n  vec3 worldDirection = (inverseViewMatrix * vec4(viewPosition.xyz, 0.0)).xyz;\n  vec3 cameraDirection = normalize((inverseViewMatrix * vec4(0.0, 0.0, -1.0, 0.0)).xyz);\n  vCameraPosition = (worldToECEFMatrix * vec4(cameraPosition, 1.0)).xyz;\n  vCameraDirection = (worldToECEFMatrix * vec4(cameraDirection, 0.0)).xyz;\n  vRayDirection = (worldToECEFMatrix * vec4(worldDirection, 0.0)).xyz;\n  vViewPosition = viewPosition;\n\n  sampleSunSkyIrradiance(vCameraPosition + altitudeCorrection);\n\n  gl_Position = vec4(position.xy, 1.0, 1.0);\n}\n", Hg = "uniform vec2 resolution;\nuniform int frame;\nuniform sampler3D stbnTexture;\n\n// Atmosphere\nuniform float bottomRadius;\nuniform mat4 worldToECEFMatrix;\nuniform mat4 ecefToWorldMatrix;\nuniform vec3 altitudeCorrection;\nuniform vec3 sunDirection;\n\n// Participating medium\nuniform float scatteringCoefficient;\nuniform float absorptionCoefficient;\n\n// Primary raymarch\nuniform float minDensity;\nuniform float minExtinction;\nuniform float minTransmittance;\n\n// Shape and weather\nuniform sampler2D localWeatherTexture;\nuniform vec2 localWeatherRepeat;\nuniform vec2 localWeatherOffset;\nuniform float coverage;\nuniform sampler3D shapeTexture;\nuniform vec3 shapeRepeat;\nuniform vec3 shapeOffset;\n\n#ifdef SHAPE_DETAIL\nuniform sampler3D shapeDetailTexture;\nuniform vec3 shapeDetailRepeat;\nuniform vec3 shapeDetailOffset;\n#endif // SHAPE_DETAIL\n\n#ifdef TURBULENCE\nuniform sampler2D turbulenceTexture;\nuniform vec2 turbulenceRepeat;\nuniform float turbulenceDisplacement;\n#endif // TURBULENCE\n\n// Haze\n#ifdef HAZE\nuniform float hazeDensityScale;\nuniform float hazeExponent;\nuniform float hazeScatteringCoefficient;\nuniform float hazeAbsorptionCoefficient;\n#endif // HAZE\n\n// Cloud layers\nuniform vec4 minLayerHeights;\nuniform vec4 maxLayerHeights;\nuniform vec3 minIntervalHeights;\nuniform vec3 maxIntervalHeights;\nuniform vec4 densityScales;\nuniform vec4 shapeAmounts;\nuniform vec4 shapeDetailAmounts;\nuniform vec4 weatherExponents;\nuniform vec4 shapeAlteringBiases;\nuniform vec4 coverageFilterWidths;\nuniform float minHeight;\nuniform float maxHeight;\nuniform float shadowTopHeight;\nuniform float shadowBottomHeight;\nuniform vec4 shadowLayerMask;\nuniform CloudDensityProfile densityProfile;\n", Ug = "struct GroundIrradiance {\n  vec3 sun;\n  vec3 sky;\n};\n\nstruct CloudsIrradiance {\n  vec3 minSun;\n  vec3 minSky;\n  vec3 maxSun;\n  vec3 maxSky;\n};\n\nstruct CloudDensityProfile {\n  vec4 expTerms;\n  vec4 exponents;\n  vec4 linearTerms;\n  vec4 constantTerms;\n};\n", Wg = Object.defineProperty, Gg = (e, t, n, r) => {
	for (var i = void 0, a = e.length - 1, o; a >= 0; a--) (o = e[a]) && (i = o(t, n, i) || i);
	return i && Wg(t, n, i), i;
}, Kg = /* @__PURE__ */ new j(), qg = /* @__PURE__ */ new dr(), Jg = class extends us {
	constructor({ parameterUniforms: e, layerUniforms: t, atmosphereUniforms: n }, r = Jo.DEFAULT) {
		super({
			name: "CloudsMaterial",
			glslVersion: it,
			vertexShader: uo(Vg, {
				atmosphere: { bruneton: {
					common: dg,
					definitions: fg,
					runtime: ug
				} },
				types: Ug
			}),
			fragmentShader: ho(uo(zg, {
				core: {
					depth: Do,
					math: Ao,
					turbo: Po,
					generators: Oo,
					raySphereIntersection: Mo,
					cascadedShadowMaps: Eo,
					interleavedGradientNoise: ko,
					vogelDisk: Fo
				},
				atmosphere: { bruneton: {
					common: dg,
					definitions: fg,
					runtime: ug
				} },
				types: Ug,
				parameters: Hg,
				clouds: Bg
			})),
			uniforms: {
				...e,
				...t,
				...n,
				depthBuffer: new k(null),
				viewMatrix: new k(new E()),
				inverseProjectionMatrix: new k(new E()),
				inverseViewMatrix: new k(new E()),
				reprojectionMatrix: new k(new E()),
				viewReprojectionMatrix: new k(new E()),
				resolution: new k(new A()),
				cameraNear: new k(0),
				cameraFar: new k(0),
				cameraHeight: new k(0),
				frame: new k(0),
				temporalJitter: new k(new A()),
				targetUvScale: new k(new A()),
				mipLevelScale: new k(1),
				stbnTexture: new k(null),
				skyLightScale: new k(1),
				groundBounceScale: new k(1),
				powderScale: new k(.8),
				powderExponent: new k(150),
				maxIterationCount: new k(J.clouds.maxIterationCount),
				minStepSize: new k(J.clouds.minStepSize),
				maxStepSize: new k(J.clouds.maxStepSize),
				maxRayDistance: new k(J.clouds.maxRayDistance),
				perspectiveStepScale: new k(J.clouds.perspectiveStepScale),
				minDensity: new k(J.clouds.minDensity),
				minExtinction: new k(J.clouds.minExtinction),
				minTransmittance: new k(J.clouds.minTransmittance),
				maxIterationCountToSun: new k(J.clouds.maxIterationCountToSun),
				maxIterationCountToGround: new k(J.clouds.maxIterationCountToGround),
				minSecondaryStepSize: new k(J.clouds.minSecondaryStepSize),
				secondaryStepScale: new k(J.clouds.secondaryStepScale),
				shadowBuffer: new k(null),
				shadowTexelSize: new k(new A()),
				shadowIntervals: new k(Array.from({ length: 4 }, () => new A())),
				shadowMatrices: new k(Array.from({ length: 4 }, () => new E())),
				shadowFar: new k(0),
				maxShadowFilterRadius: new k(6),
				shadowLayerMask: new k(new M().setScalar(1)),
				maxShadowLengthIterationCount: new k(J.clouds.maxShadowLengthIterationCount),
				minShadowLengthStepSize: new k(J.clouds.minShadowLengthStepSize),
				maxShadowLengthRayDistance: new k(J.clouds.maxShadowLengthRayDistance),
				hazeDensityScale: new k(3e-5),
				hazeExponent: new k(.001),
				hazeScatteringCoefficient: new k(.9),
				hazeAbsorptionCoefficient: new k(.5)
			}
		}, r), this.temporalUpscale = !0, this.depthPacking = 0, this.localWeatherChannels = "rgba", this.shapeDetail = J.shapeDetail, this.turbulence = J.turbulence, this.shadowLength = J.lightShafts, this.haze = J.haze, this.multiScatteringOctaves = J.clouds.multiScatteringOctaves, this.accurateSunSkyLight = J.clouds.accurateSunSkyLight, this.accuratePhaseFunction = J.clouds.accuratePhaseFunction, this.shadowCascadeCount = J.shadow.cascadeCount, this.shadowSampleCount = 8, this.scatterAnisotropy1 = .7, this.scatterAnisotropy2 = -.2, this.scatterAnisotropyMix = .5;
	}
	onBeforeRender(e, t, n, r, i, a) {
		let o = this.defines.USE_LOGARITHMIC_DEPTH_BUFFER != null, s = e.capabilities.logarithmicDepthBuffer;
		s !== o && (s ? this.defines.USE_LOGARITHMIC_DEPTH_BUFFER = "1" : delete this.defines.USE_LOGARITHMIC_DEPTH_BUFFER);
		let c = this.defines.POWDER != null, l = this.uniforms.powderScale.value > 0;
		l !== c && (l ? this.defines.POWDER = "1" : delete this.defines.POWDER, this.needsUpdate = !0);
		let u = this.defines.GROUND_BOUNCE != null;
		(this.uniforms.groundBounceScale.value > 0 && this.uniforms.maxIterationCountToGround.value > 0) !== u && (l ? this.defines.GROUND_BOUNCE = "1" : delete this.defines.GROUND_BOUNCE, this.needsUpdate = !0);
	}
	copyCameraSettings(e) {
		e.isPerspectiveCamera === !0 ? this.defines.PERSPECTIVE_CAMERA !== "1" && (this.defines.PERSPECTIVE_CAMERA = "1", this.needsUpdate = !0) : this.defines.PERSPECTIVE_CAMERA != null && (delete this.defines.PERSPECTIVE_CAMERA, this.needsUpdate = !0);
		let t = this.uniforms;
		t.viewMatrix.value.copy(e.matrixWorldInverse), t.inverseViewMatrix.value.copy(e.matrixWorld);
		let n = this.previousProjectionMatrix ?? e.projectionMatrix, r = this.previousViewMatrix ?? e.matrixWorldInverse, i = t.inverseProjectionMatrix.value, a = t.inverseViewMatrix.value, o = t.reprojectionMatrix.value, s = t.viewReprojectionMatrix.value;
		if (this.temporalUpscale) {
			let c = t.frame.value % 16, l = t.resolution.value, u = Lg[c], d = (u.x - .5) / l.x * 4, f = (u.y - .5) / l.y * 4;
			t.temporalJitter.value.set(d, f), t.mipLevelScale.value = .25, i.copy(e.projectionMatrix), i.elements[8] += d * 2, i.elements[9] += f * 2, i.invert(), o.copy(n), o.elements[8] += d * 2, o.elements[9] += f * 2, o.multiply(r), s.copy(o).multiply(a);
		} else t.temporalJitter.value.setScalar(0), t.mipLevelScale.value = 1, i.copy(e.projectionMatrixInverse), o.copy(n).multiply(r), s.copy(o).multiply(a);
		t.cameraNear.value = e.near, t.cameraFar.value = e.far;
		let c = e.getWorldPosition(t.cameraPosition.value), l = Kg.copy(c).applyMatrix4(t.worldToECEFMatrix.value);
		try {
			t.cameraHeight.value = qg.setFromECEF(l).height;
		} catch {}
	}
	copyReprojectionMatrix(e) {
		this.previousProjectionMatrix ??= new E(), this.previousViewMatrix ??= new E(), this.previousProjectionMatrix.copy(e.projectionMatrix), this.previousViewMatrix.copy(e.matrixWorldInverse);
	}
	setSize(e, t, n, r) {
		this.uniforms.resolution.value.set(e, t), n != null && r != null ? this.uniforms.targetUvScale.value.set(e / n, t / r) : this.uniforms.targetUvScale.value.setScalar(1), this.previousProjectionMatrix = void 0, this.previousViewMatrix = void 0;
	}
	setShadowSize(e, t) {
		this.uniforms.shadowTexelSize.value.set(1 / e, 1 / t);
	}
	get depthBuffer() {
		return this.uniforms.depthBuffer.value;
	}
	set depthBuffer(e) {
		this.uniforms.depthBuffer.value = e;
	}
};
Gg([no("DEPTH_PACKING")], Jg.prototype, "depthPacking"), Gg([ao("LOCAL_WEATHER_CHANNELS", { validate: (e) => /^[rgba]{4}$/.test(e) })], Jg.prototype, "localWeatherChannels"), Gg([H("SHAPE_DETAIL")], Jg.prototype, "shapeDetail"), Gg([H("TURBULENCE")], Jg.prototype, "turbulence"), Gg([H("SHADOW_LENGTH")], Jg.prototype, "shadowLength"), Gg([H("HAZE")], Jg.prototype, "haze"), Gg([no("MULTI_SCATTERING_OCTAVES", {
	min: 1,
	max: 12
})], Jg.prototype, "multiScatteringOctaves"), Gg([H("ACCURATE_SUN_SKY_LIGHT")], Jg.prototype, "accurateSunSkyLight"), Gg([H("ACCURATE_PHASE_FUNCTION")], Jg.prototype, "accuratePhaseFunction"), Gg([no("SHADOW_CASCADE_COUNT", {
	min: 1,
	max: 4
})], Jg.prototype, "shadowCascadeCount"), Gg([no("SHADOW_SAMPLE_COUNT", {
	min: 1,
	max: 16
})], Jg.prototype, "shadowSampleCount"), Gg([io("SCATTER_ANISOTROPY_1")], Jg.prototype, "scatterAnisotropy1"), Gg([io("SCATTER_ANISOTROPY_2")], Jg.prototype, "scatterAnisotropy2"), Gg([io("SCATTER_ANISOTROPY_MIX")], Jg.prototype, "scatterAnisotropyMix");
var Yg = "// Taken from https://gist.github.com/TheRealMJP/c83b8c0f46b63f3a88a5986f4fa982b1\n// TODO: Use 5-taps version: https://www.shadertoy.com/view/MtVGWz\n// Or even 4 taps (requires preprocessing in the input buffer):\n// https://www.shadertoy.com/view/4tyGDD\n\n/**\n * MIT License\n *\n * Copyright (c) 2019 MJP\n *\n * Permission is hereby granted, free of charge, to any person obtaining a copy\n * of this software and associated documentation files (the \"Software\"), to deal\n * in the Software without restriction, including without limitation the rights\n * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell\n * copies of the Software, and to permit persons to whom the Software is\n * furnished to do so, subject to the following conditions:\n *\n * The above copyright notice and this permission notice shall be included in all\n * copies or substantial portions of the Software.\n *\n * THE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\n * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,\n * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE\n * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER\n * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,\n * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE\n * SOFTWARE.\n */\n\nvec4 textureCatmullRom(sampler2D tex, vec2 uv) {\n  vec2 texSize = vec2(textureSize(tex, 0));\n\n  // We're going to sample a a 4x4 grid of texels surrounding the target UV\n  // coordinate. We'll do this by rounding down the sample location to get the\n  // exact center of our \"starting\" texel. The starting texel will be at\n  // location [1, 1] in the grid, where [0, 0] is the top left corner.\n  vec2 samplePos = uv * texSize;\n  vec2 texPos1 = floor(samplePos - 0.5) + 0.5;\n\n  // Compute the fractional offset from our starting texel to our original\n  // sample location, which we'll feed into the Catmull-Rom spline function to\n  // get our filter weights.\n  vec2 f = samplePos - texPos1;\n\n  // Compute the Catmull-Rom weights using the fractional offset that we\n  // calculated earlier. These equations are pre-expanded based on our knowledge\n  // of where the texels will be located, which lets us avoid having to evaluate\n  // a piece-wise function.\n  vec2 w0 = f * (-0.5 + f * (1.0 - 0.5 * f));\n  vec2 w1 = 1.0 + f * f * (-2.5 + 1.5 * f);\n  vec2 w2 = f * (0.5 + f * (2.0 - 1.5 * f));\n  vec2 w3 = f * f * (-0.5 + 0.5 * f);\n\n  // Work out weighting factors and sampling offsets that will let us use\n  // bilinear filtering to simultaneously evaluate the middle 2 samples from the\n  // 4x4 grid.\n  vec2 w12 = w1 + w2;\n  vec2 offset12 = w2 / (w1 + w2);\n\n  // Compute the final UV coordinates we'll use for sampling the texture\n  vec2 texPos0 = texPos1 - 1.0;\n  vec2 texPos3 = texPos1 + 2.0;\n  vec2 texPos12 = texPos1 + offset12;\n\n  texPos0 /= texSize;\n  texPos3 /= texSize;\n  texPos12 /= texSize;\n\n  vec4 result = vec4(0.0);\n  result += texture(tex, vec2(texPos0.x, texPos0.y)) * w0.x * w0.y;\n  result += texture(tex, vec2(texPos12.x, texPos0.y)) * w12.x * w0.y;\n  result += texture(tex, vec2(texPos3.x, texPos0.y)) * w3.x * w0.y;\n\n  result += texture(tex, vec2(texPos0.x, texPos12.y)) * w0.x * w12.y;\n  result += texture(tex, vec2(texPos12.x, texPos12.y)) * w12.x * w12.y;\n  result += texture(tex, vec2(texPos3.x, texPos12.y)) * w3.x * w12.y;\n\n  result += texture(tex, vec2(texPos0.x, texPos3.y)) * w0.x * w3.y;\n  result += texture(tex, vec2(texPos12.x, texPos3.y)) * w12.x * w3.y;\n  result += texture(tex, vec2(texPos3.x, texPos3.y)) * w3.x * w3.y;\n\n  return result;\n}\n\nvec4 textureCatmullRom(sampler2DArray tex, vec3 uv) {\n  vec2 texSize = vec2(textureSize(tex, 0));\n  vec2 samplePos = uv.xy * texSize;\n  vec2 texPos1 = floor(samplePos - 0.5) + 0.5;\n  vec2 f = samplePos - texPos1;\n  vec2 w0 = f * (-0.5 + f * (1.0 - 0.5 * f));\n  vec2 w1 = 1.0 + f * f * (-2.5 + 1.5 * f);\n  vec2 w2 = f * (0.5 + f * (2.0 - 1.5 * f));\n  vec2 w3 = f * f * (-0.5 + 0.5 * f);\n  vec2 w12 = w1 + w2;\n  vec2 offset12 = w2 / (w1 + w2);\n  vec2 texPos0 = texPos1 - 1.0;\n  vec2 texPos3 = texPos1 + 2.0;\n  vec2 texPos12 = texPos1 + offset12;\n  texPos0 /= texSize;\n  texPos3 /= texSize;\n  texPos12 /= texSize;\n  vec4 result = vec4(0.0);\n  result += texture(tex, vec3(texPos0.x, texPos0.y, uv.z)) * w0.x * w0.y;\n  result += texture(tex, vec3(texPos12.x, texPos0.y, uv.z)) * w12.x * w0.y;\n  result += texture(tex, vec3(texPos3.x, texPos0.y, uv.z)) * w3.x * w0.y;\n  result += texture(tex, vec3(texPos0.x, texPos12.y, uv.z)) * w0.x * w12.y;\n  result += texture(tex, vec3(texPos12.x, texPos12.y, uv.z)) * w12.x * w12.y;\n  result += texture(tex, vec3(texPos3.x, texPos12.y, uv.z)) * w3.x * w12.y;\n  result += texture(tex, vec3(texPos0.x, texPos3.y, uv.z)) * w0.x * w3.y;\n  result += texture(tex, vec3(texPos12.x, texPos3.y, uv.z)) * w12.x * w3.y;\n  result += texture(tex, vec3(texPos3.x, texPos3.y, uv.z)) * w3.x * w3.y;\n  return result;\n}\n", Xg = "precision highp float;\nprecision highp sampler2DArray;\n\n#include \"core/turbo\"\n#include \"catmullRomSampling\"\n#include \"varianceClipping\"\n\nuniform sampler2D colorBuffer;\nuniform sampler2D depthVelocityBuffer;\nuniform sampler2D colorHistoryBuffer;\n\n#ifdef SHADOW_LENGTH\nuniform sampler2D shadowLengthBuffer;\nuniform sampler2D shadowLengthHistoryBuffer;\n#endif // SHADOW_LENGTH\n\nuniform vec2 texelSize;\nuniform int frame;\nuniform float varianceGamma;\nuniform float temporalAlpha;\nuniform vec2 jitterOffset;\n\nin vec2 vUv;\n\nlayout(location = 0) out vec4 outputColor;\n#ifdef SHADOW_LENGTH\nlayout(location = 1) out float outputShadowLength;\n#endif // SHADOW_LENGTH\n\nconst ivec2 neighborOffsets[9] = ivec2[9](\n  ivec2(-1, -1),\n  ivec2(-1, 0),\n  ivec2(-1, 1),\n  ivec2(0, -1),\n  ivec2(0, 0),\n  ivec2(0, 1),\n  ivec2(1, -1),\n  ivec2(1, 0),\n  ivec2(1, 1)\n);\n\nconst ivec4[4] bayerIndices = ivec4[4](\n  ivec4(0, 12, 3, 15),\n  ivec4(8, 4, 11, 7),\n  ivec4(2, 14, 1, 13),\n  ivec4(10, 6, 9, 5)\n);\n\nvec4 getClosestFragment(const ivec2 coord) {\n  vec4 result = vec4(1e7, 0.0, 0.0, 0.0);\n  vec4 neighbor;\n  #pragma unroll_loop_start\n  for (int i = 0; i < 9; ++i) {\n    neighbor = texelFetchOffset(depthVelocityBuffer, coord, 0, neighborOffsets[i]);\n    if (neighbor.r < result.r) {\n      result = neighbor;\n    }\n  }\n  #pragma unroll_loop_end\n  return result;\n}\n\nvoid temporalUpscale(\n  const ivec2 coord,\n  const ivec2 lowResCoord,\n  const bool currentFrame,\n  out vec4 outputColor,\n  out float outputShadowLength\n) {\n  vec4 currentColor = texelFetch(colorBuffer, lowResCoord, 0);\n  #ifdef SHADOW_LENGTH\n  vec4 currentShadowLength = vec4(texelFetch(shadowLengthBuffer, lowResCoord, 0).rgb, 1.0);\n  #endif // SHADOW_LENGTH\n\n  if (currentFrame) {\n    // Use the texel just rendered without any accumulation.\n    outputColor = currentColor;\n    #ifdef SHADOW_LENGTH\n    outputShadowLength = currentShadowLength.r;\n    #endif // SHADOW_LENGTH\n    return;\n  }\n\n  vec4 depthVelocity = getClosestFragment(lowResCoord);\n  vec2 velocity = depthVelocity.gb;\n  vec2 prevUv = vUv - velocity;\n  if (prevUv.x < 0.0 || prevUv.x > 1.0 || prevUv.y < 0.0 || prevUv.y > 1.0) {\n    outputColor = currentColor;\n    #ifdef SHADOW_LENGTH\n    outputShadowLength = currentShadowLength.r;\n    #endif // SHADOW_LENGTH\n    return; // Rejection\n  }\n\n  // Variance clipping with a large variance gamma seems to work fine for\n  // upsampling. This increases ghosting, of course, but it's hard to notice on\n  // clouds.\n  // vec4 historyColor = textureCatmullRom(colorHistoryBuffer, prevUv);\n  vec4 historyColor = texture(colorHistoryBuffer, prevUv);\n  vec4 clippedColor = varianceClipping(colorBuffer, vUv, currentColor, historyColor, varianceGamma);\n  outputColor = clippedColor;\n\n  #ifdef SHADOW_LENGTH\n  // Sampling the shadow length history using scene depth doesn't make much\n  // sense, but it's too hard to derive it properly. At least this approach\n  // resolves the edges of scene objects.\n  // vec4 historyShadowLength = vec4(textureCatmullRom(shadowLengthHistoryBuffer, prevUv).rgb, 1.0);\n  vec4 historyShadowLength = vec4(texture(shadowLengthHistoryBuffer, prevUv).rgb, 1.0);\n  vec4 clippedShadowLength = varianceClipping(\n    shadowLengthBuffer,\n    vUv,\n    currentShadowLength,\n    historyShadowLength,\n    varianceGamma\n  );\n  outputShadowLength = clippedShadowLength.r;\n  #endif // SHADOW_LENGTH\n}\n\nvoid temporalAntialiasing(const ivec2 coord, out vec4 outputColor, out float outputShadowLength) {\n  vec4 currentColor = texelFetch(colorBuffer, coord, 0);\n  #ifdef SHADOW_LENGTH\n  vec4 currentShadowLength = vec4(texelFetch(shadowLengthBuffer, coord, 0).rgb, 1.0);\n  #endif // SHADOW_LENGTH\n\n  vec4 depthVelocity = getClosestFragment(coord);\n  vec2 velocity = depthVelocity.gb;\n\n  vec2 prevUv = vUv - velocity;\n  if (prevUv.x < 0.0 || prevUv.x > 1.0 || prevUv.y < 0.0 || prevUv.y > 1.0) {\n    outputColor = currentColor;\n    #ifdef SHADOW_LENGTH\n    outputShadowLength = currentShadowLength.r;\n    #endif // SHADOW_LENGTH\n    return; // Rejection\n  }\n\n  vec4 historyColor = texture(colorHistoryBuffer, prevUv);\n  vec4 clippedColor = varianceClipping(colorBuffer, coord, currentColor, historyColor);\n  outputColor = mix(clippedColor, currentColor, temporalAlpha);\n\n  #ifdef SHADOW_LENGTH\n  vec4 historyShadowLength = vec4(texture(shadowLengthHistoryBuffer, prevUv).rgb, 1.0);\n  vec4 clippedShadowLength = varianceClipping(\n    shadowLengthBuffer,\n    coord,\n    currentShadowLength,\n    historyShadowLength\n  );\n  outputShadowLength = mix(clippedShadowLength.r, currentShadowLength.r, temporalAlpha);\n  #endif // SHADOW_LENGTH\n}\n\nvoid main() {\n  ivec2 coord = ivec2(gl_FragCoord.xy);\n\n  #if !defined(SHADOW_LENGTH)\n  float outputShadowLength;\n  #endif // !defined(SHADOW_LENGTH)\n\n  #ifdef TEMPORAL_UPSCALE\n  ivec2 lowResCoord = coord / 4;\n  int bayerValue = bayerIndices[coord.x % 4][coord.y % 4];\n  bool currentFrame = bayerValue == frame % 16;\n  temporalUpscale(coord, lowResCoord, currentFrame, outputColor, outputShadowLength);\n  #else // TEMPORAL_UPSCALE\n  temporalAntialiasing(coord, outputColor, outputShadowLength);\n  #endif // TEMPORAL_UPSCALE\n\n  #if defined(SHADOW_LENGTH) && defined(DEBUG_SHOW_SHADOW_LENGTH)\n  outputColor = vec4(turbo(outputShadowLength * 0.05), 1.0);\n  #endif // defined(SHADOW_LENGTH) && defined(DEBUG_SHOW_SHADOW_LENGTH)\n\n  #ifdef DEBUG_SHOW_VELOCITY\n  outputColor.rgb = outputColor.rgb + vec3(abs(texture(depthVelocityBuffer, vUv).gb) * 10.0, 0.0);\n  #endif // DEBUG_SHOW_VELOCITY\n}\n", Zg = "precision highp float;\n\nlayout(location = 0) in vec3 position;\n\nout vec2 vUv;\n\nvoid main() {\n  vUv = position.xy * 0.5 + 0.5;\n  gl_Position = vec4(position.xy, 1.0, 1.0);\n}\n", Qg = "#ifdef VARIANCE_9_SAMPLES\n#define VARIANCE_OFFSET_COUNT 8\nconst ivec2 varianceOffsets[8] = ivec2[8](\n  ivec2(-1, -1),\n  ivec2(-1, 1),\n  ivec2(1, -1),\n  ivec2(1, 1),\n  ivec2(1, 0),\n  ivec2(0, -1),\n  ivec2(0, 1),\n  ivec2(-1, 0)\n);\n#else // VARIANCE_9_SAMPLES\n#define VARIANCE_OFFSET_COUNT 4\nconst ivec2 varianceOffsets[4] = ivec2[4](ivec2(1, 0), ivec2(0, -1), ivec2(0, 1), ivec2(-1, 0));\n#endif // VARIANCE_9_SAMPLES\n\n// Reference: https://github.com/playdeadgames/temporal\nvec4 clipAABB(const vec4 current, const vec4 history, const vec4 minColor, const vec4 maxColor) {\n  vec3 pClip = 0.5 * (maxColor.rgb + minColor.rgb);\n  vec3 eClip = 0.5 * (maxColor.rgb - minColor.rgb) + 1e-7;\n  vec4 vClip = history - vec4(pClip, current.a);\n  vec3 vUnit = vClip.xyz / eClip;\n  vec3 aUnit = abs(vUnit);\n  float maUnit = max(aUnit.x, max(aUnit.y, aUnit.z));\n  if (maUnit > 1.0) {\n    return vec4(pClip, current.a) + vClip / maUnit;\n  }\n  return history;\n}\n\n#ifdef VARIANCE_SAMPLER_ARRAY\n#define VARIANCE_SAMPLER sampler2DArray\n#define VARIANCE_SAMPLER_COORD ivec3\n#else // VARIANCE_SAMPLER_ARRAY\n#define VARIANCE_SAMPLER sampler2D\n#define VARIANCE_SAMPLER_COORD ivec2\n#endif // VARIANCE_SAMPLER_ARRAY\n\n// Variance clipping\n// Reference: https://developer.download.nvidia.com/gameworks/events/GDC2016/msalvi_temporal_supersampling.pdf\nvec4 varianceClipping(\n  const VARIANCE_SAMPLER inputBuffer,\n  const VARIANCE_SAMPLER_COORD coord,\n  const vec4 current,\n  const vec4 history,\n  const float gamma\n) {\n  vec4 moment1 = current;\n  vec4 moment2 = current * current;\n  vec4 neighbor;\n  #pragma unroll_loop_start\n  for (int i = 0; i < 8; ++i) {\n    #if UNROLLED_LOOP_INDEX < VARIANCE_OFFSET_COUNT\n    neighbor = texelFetchOffset(inputBuffer, coord, 0, varianceOffsets[i]);\n    moment1 += neighbor;\n    moment2 += neighbor * neighbor;\n    #endif // UNROLLED_LOOP_INDEX < VARIANCE_OFFSET_COUNT\n  }\n  #pragma unroll_loop_end\n\n  const float N = float(VARIANCE_OFFSET_COUNT + 1);\n  vec4 mean = moment1 / N;\n  vec4 varianceGamma = sqrt(max(moment2 / N - mean * mean, 0.0)) * gamma;\n  vec4 minColor = mean - varianceGamma;\n  vec4 maxColor = mean + varianceGamma;\n  return clipAABB(clamp(mean, minColor, maxColor), history, minColor, maxColor);\n}\n\nvec4 varianceClipping(\n  const VARIANCE_SAMPLER inputBuffer,\n  const VARIANCE_SAMPLER_COORD coord,\n  const vec4 current,\n  const vec4 history\n) {\n  return varianceClipping(inputBuffer, coord, current, history, 1.0);\n}\n\nvec4 varianceClipping(\n  const sampler2D inputBuffer,\n  const vec2 coord,\n  const vec4 current,\n  const vec4 history,\n  const float gamma\n) {\n  vec4 moment1 = current;\n  vec4 moment2 = current * current;\n  vec4 neighbor;\n  #pragma unroll_loop_start\n  for (int i = 0; i < 8; ++i) {\n    #if UNROLLED_LOOP_INDEX < VARIANCE_OFFSET_COUNT\n    neighbor = textureOffset(inputBuffer, coord, varianceOffsets[i]);\n    moment1 += neighbor;\n    moment2 += neighbor * neighbor;\n    #endif // UNROLLED_LOOP_INDEX < VARIANCE_OFFSET_COUNT\n  }\n  #pragma unroll_loop_end\n\n  const float N = float(VARIANCE_OFFSET_COUNT + 1);\n  vec4 mean = moment1 / N;\n  vec4 varianceGamma = sqrt(max(moment2 / N - mean * mean, 0.0)) * gamma;\n  vec4 minColor = mean - varianceGamma;\n  vec4 maxColor = mean + varianceGamma;\n  return clipAABB(clamp(mean, minColor, maxColor), history, minColor, maxColor);\n}\n\nvec4 varianceClipping(\n  const sampler2D inputBuffer,\n  const vec2 coord,\n  const vec4 current,\n  const vec4 history\n) {\n  return varianceClipping(inputBuffer, coord, current, history, 1.0);\n}\n", $g = Object.defineProperty, e_ = (e, t, n, r) => {
	for (var i = void 0, a = e.length - 1, o; a >= 0; a--) (o = e[a]) && (i = o(t, n, i) || i);
	return i && $g(t, n, i), i;
}, t_ = class extends Ht {
	constructor({ colorBuffer: e = null, depthVelocityBuffer: t = null, shadowLengthBuffer: n = null, colorHistoryBuffer: r = null, shadowLengthHistoryBuffer: i = null } = {}) {
		super({
			name: "CloudsResolveMaterial",
			glslVersion: it,
			vertexShader: Zg,
			fragmentShader: ho(uo(Xg, {
				core: { turbo: Po },
				catmullRomSampling: Yg,
				varianceClipping: Qg
			})),
			uniforms: {
				colorBuffer: new k(e),
				depthVelocityBuffer: new k(t),
				shadowLengthBuffer: new k(n),
				colorHistoryBuffer: new k(r),
				shadowLengthHistoryBuffer: new k(i),
				texelSize: new k(new A()),
				frame: new k(0),
				jitterOffset: new k(new A()),
				varianceGamma: new k(2),
				temporalAlpha: new k(.1)
			}
		}), this.temporalUpscale = !0, this.shadowLength = !0;
	}
	setSize(e, t) {
		this.uniforms.texelSize.value.set(1 / e, 1 / t);
	}
	onBeforeRender(e, t, n, r, i, a) {
		let o = Lg[this.uniforms.frame.value % 16], s = (o.x - .5) * 4, c = (o.y - .5) * 4;
		this.uniforms.jitterOffset.value.set(s, c);
	}
};
e_([H("TEMPORAL_UPSCALE")], t_.prototype, "temporalUpscale"), e_([H("SHADOW_LENGTH")], t_.prototype, "shadowLength");
var n_ = class extends Tn {
	constructor(e, t) {
		super(e), this._mainCamera = new He();
		let { shadow: n } = t;
		this.shadow = n;
	}
	get mainCamera() {
		return this._mainCamera;
	}
	set mainCamera(e) {
		this._mainCamera = e;
	}
};
function r_(e, { depthVelocity: t, shadowLength: n }) {
	let r = new N(1, 1, {
		depthBuffer: !1,
		type: ot
	});
	r.texture.minFilter = T, r.texture.magFilter = T, r.texture.name = e;
	let i;
	t && (i = r.texture.clone(), i.isRenderTargetTexture = !0, r.depthVelocity = i, r.textures.push(i));
	let a;
	return n && (a = r.texture.clone(), a.isRenderTargetTexture = !0, a.format = Ut, r.shadowLength = a, r.textures.push(a)), Object.assign(r, {
		depthVelocity: i ?? null,
		shadowLength: a ?? null
	});
}
var i_ = class extends n_ {
	constructor({ parameterUniforms: e, layerUniforms: t, atmosphereUniforms: n, ...r }, i) {
		super("CloudsPass", r), this.atmosphere = i, this.width = 0, this.height = 0, this.currentMaterial = new Jg({
			parameterUniforms: e,
			layerUniforms: t,
			atmosphereUniforms: n
		}, i), this.currentPass = new An(this.currentMaterial), this.resolveMaterial = new t_(), this.resolvePass = new An(this.resolveMaterial), this.initRenderTargets({
			depthVelocity: !0,
			shadowLength: J.lightShafts
		});
	}
	copyCameraSettings(e) {
		this.currentMaterial.copyCameraSettings(e);
	}
	initialize(e, t, n) {
		this.currentPass.initialize(e, t, n), this.resolvePass.initialize(e, t, n);
	}
	initRenderTargets(e) {
		this.currentRenderTarget?.dispose(), this.resolveRenderTarget?.dispose(), this.historyRenderTarget?.dispose();
		let t = r_("Clouds", e), n = r_("Clouds.A", {
			...e,
			depthVelocity: !1
		}), r = r_("Clouds.B", {
			...e,
			depthVelocity: !1
		});
		this.currentRenderTarget = t, this.resolveRenderTarget = n, this.historyRenderTarget = r;
		let i = this.resolveMaterial.uniforms;
		i.colorBuffer.value = t.texture, i.depthVelocityBuffer.value = t.depthVelocity, i.shadowLengthBuffer.value = t.shadowLength, i.colorHistoryBuffer.value = r.texture, i.shadowLengthHistoryBuffer.value = r.shadowLength;
	}
	copyShadow() {
		let e = this.shadow, t = this.currentMaterial.uniforms;
		for (let n = 0; n < e.cascadeCount; ++n) {
			let r = e.cascades[n];
			t.shadowIntervals.value[n].copy(r.interval), t.shadowMatrices.value[n].copy(r.matrix);
		}
		t.shadowFar.value = e.far;
	}
	copyReprojection() {
		this.currentMaterial.copyReprojectionMatrix(this.mainCamera);
	}
	swapBuffers() {
		let e = this.historyRenderTarget, t = this.resolveRenderTarget;
		this.resolveRenderTarget = e, this.historyRenderTarget = t;
		let n = this.resolveMaterial.uniforms;
		n.colorHistoryBuffer.value = t.texture, n.shadowLengthHistoryBuffer.value = t.shadowLength;
	}
	update(e, t, n) {
		this.currentMaterial.uniforms.frame.value = t, this.resolveMaterial.uniforms.frame.value = t, this.copyCameraSettings(this.mainCamera), this.copyShadow(), this.currentPass.render(e, null, this.currentRenderTarget), this.resolvePass.render(e, null, this.resolveRenderTarget), this.copyReprojection(), this.swapBuffers();
	}
	setSize(e, t) {
		if (this.width = e, this.height = t, this.temporalUpscale) {
			let n = Math.ceil(e / 4), r = Math.ceil(t / 4);
			this.currentRenderTarget.setSize(n, r), this.currentMaterial.setSize(n * 4, r * 4, e, t);
		} else this.currentRenderTarget.setSize(e, t), this.currentMaterial.setSize(e, t);
		this.resolveRenderTarget.setSize(e, t), this.resolveMaterial.setSize(e, t), this.historyRenderTarget.setSize(e, t);
	}
	setShadowSize(e, t, n) {
		this.currentMaterial.shadowCascadeCount = n, this.currentMaterial.setShadowSize(e, t);
	}
	setDepthTexture(e, t) {
		this.currentMaterial.depthBuffer = e, this.currentMaterial.depthPacking = t ?? 0;
	}
	get outputBuffer() {
		return this.historyRenderTarget.texture;
	}
	get shadowBuffer() {
		return this.currentMaterial.uniforms.shadowBuffer.value;
	}
	set shadowBuffer(e) {
		this.currentMaterial.uniforms.shadowBuffer.value = e;
	}
	get shadowLengthBuffer() {
		return this.historyRenderTarget.shadowLength;
	}
	get temporalUpscale() {
		return this.currentMaterial.temporalUpscale;
	}
	set temporalUpscale(e) {
		e !== this.temporalUpscale && (this.currentMaterial.temporalUpscale = e, this.resolveMaterial.temporalUpscale = e, this.setSize(this.width, this.height));
	}
	get lightShafts() {
		return this.currentMaterial.shadowLength;
	}
	set lightShafts(e) {
		e !== this.lightShafts && (this.currentMaterial.shadowLength = e, this.resolveMaterial.shadowLength = e, this.initRenderTargets({
			depthVelocity: !0,
			shadowLength: e
		}), this.setSize(this.width, this.height));
	}
};
function a_(e, t) {
	let n = e.properties.get(t.texture).__webglTexture, r = e.getContext();
	wg(r instanceof WebGL2RenderingContext), e.setRenderTarget(t);
	let i = [];
	if (n != null) for (let e = 0; e < t.depth; ++e) r.framebufferTextureLayer(r.FRAMEBUFFER, r.COLOR_ATTACHMENT0 + e, n, 0, e), i.push(r.COLOR_ATTACHMENT0 + e);
	r.drawBuffers(i);
}
var o_ = class extends An {
	render(e, t, n, r, i) {
		let a = this.fullscreenMaterial.uniforms;
		t !== null && a?.[this.input] != null && (a[this.input].value = t.texture), a_(e, n), e.render(this.scene, this.camera);
	}
}, s_ = "precision highp float;\nprecision highp sampler3D;\n\n#include <common>\n\n#include \"core/math\"\n#include \"core/raySphereIntersection\"\n#include \"types\"\n#include \"parameters\"\n#include \"structuredSampling\"\n#include \"clouds\"\n\nuniform mat4 inverseShadowMatrices[CASCADE_COUNT];\nuniform mat4 reprojectionMatrices[CASCADE_COUNT];\n\n// Primary raymarch\nuniform int maxIterationCount;\nuniform float minStepSize;\nuniform float maxStepSize;\nuniform float opticalDepthTailScale;\n\nin vec2 vUv;\n\nlayout(location = 0) out vec4 outputColor[CASCADE_COUNT];\n\n// Redundant notation for prettier.\n#if CASCADE_COUNT == 1\nlayout(location = 1) out vec3 outputDepthVelocity[CASCADE_COUNT];\n#elif CASCADE_COUNT == 2\nlayout(location = 2) out vec3 outputDepthVelocity[CASCADE_COUNT];\n#elif CASCADE_COUNT == 3\nlayout(location = 3) out vec3 outputDepthVelocity[CASCADE_COUNT];\n#elif CASCADE_COUNT == 4\nlayout(location = 4) out vec3 outputDepthVelocity[CASCADE_COUNT];\n#endif // CASCADE_COUNT\n\nvec4 marchClouds(\n  const vec3 rayOrigin,\n  const vec3 rayDirection,\n  const float maxRayDistance,\n  const float jitter,\n  const float mipLevel\n) {\n  // Setup structured volume sampling (SVS).\n  // While SVS introduces spatial aliasing, it is indeed temporally stable,\n  // which is important for lower-resolution shadow maps where a flickering\n  // single pixel can be highly noticeable.\n  vec3 normal = getStructureNormal(rayDirection, jitter);\n  float rayDistance;\n  float stepSize;\n  intersectStructuredPlanes(\n    normal,\n    rayOrigin,\n    rayDirection,\n    clamp(maxRayDistance / float(maxIterationCount), minStepSize, maxStepSize),\n    rayDistance,\n    stepSize\n  );\n\n  #ifdef TEMPORAL_JITTER\n  rayDistance -= stepSize * jitter;\n  #endif // TEMPORAL_JITTER\n\n  float extinctionSum = 0.0;\n  float maxOpticalDepth = 0.0;\n  float maxOpticalDepthTail = 0.0;\n  float transmittanceIntegral = 1.0;\n  float weightedDistanceSum = 0.0;\n  float transmittanceSum = 0.0;\n\n  int sampleCount = 0;\n  for (int i = 0; i < maxIterationCount; ++i) {\n    if (rayDistance > maxRayDistance) {\n      break; // Termination\n    }\n\n    vec3 position = rayDistance * rayDirection + rayOrigin;\n    float height = length(position) - bottomRadius;\n\n    #if !defined(DEBUG_MARCH_INTERVALS)\n    if (insideLayerIntervals(height)) {\n      rayDistance += stepSize;\n      continue;\n    }\n    #endif // !defined(DEBUG_MARCH_INTERVALS)\n\n    // Sample rough weather.\n    vec2 uv = getGlobeUv(position);\n    WeatherSample weather = sampleWeather(uv, height, mipLevel);\n\n    if (any(greaterThan(weather.density, vec4(minDensity)))) {\n      // Sample detailed participating media.\n      // Note this assumes an homogeneous medium.\n      MediaSample media = sampleMedia(weather, position, uv, mipLevel, jitter);\n      if (media.extinction > minExtinction) {\n        extinctionSum += media.extinction;\n        maxOpticalDepth += media.extinction * stepSize;\n        transmittanceIntegral *= exp(-media.extinction * stepSize);\n        weightedDistanceSum += rayDistance * transmittanceIntegral;\n        transmittanceSum += transmittanceIntegral;\n        ++sampleCount;\n      }\n    }\n\n    if (transmittanceIntegral <= minTransmittance) {\n      // A large amount of optical depth accumulates in the tail, beyond the\n      // point of minimum transmittance. The expected optical depth seems to\n      // decrease exponentially with the number of samples taken before reaching\n      // the minimum transmittance.\n      // See the discussion here: https://x.com/shotamatsuda/status/1886259549931520437\n      maxOpticalDepthTail = min(\n        opticalDepthTailScale * stepSize * exp(float(1 - sampleCount)),\n        stepSize * 0.5 // Excessive optical depth only introduces aliasing.\n      );\n      break; // Early termination\n    }\n    rayDistance += stepSize;\n  }\n\n  if (sampleCount == 0) {\n    return vec4(maxRayDistance, 0.0, 0.0, 0.0);\n  }\n  float frontDepth = min(weightedDistanceSum / transmittanceSum, maxRayDistance);\n  float meanExtinction = extinctionSum / float(sampleCount);\n  return vec4(frontDepth, meanExtinction, maxOpticalDepth, maxOpticalDepthTail);\n}\n\nvoid getRayNearFar(\n  const vec3 sunPosition,\n  const vec3 rayDirection,\n  out float rayNear,\n  out float rayFar\n) {\n  vec4 firstIntersections = raySphereFirstIntersection(\n    sunPosition,\n    rayDirection,\n    vec3(0.0),\n    bottomRadius + vec4(shadowTopHeight, shadowBottomHeight, 0.0, 0.0)\n  );\n  rayNear = max(0.0, firstIntersections.x);\n  rayFar = firstIntersections.y;\n  if (rayFar < 0.0) {\n    rayFar = 1e6;\n  }\n}\n\nvoid cascade(\n  const int cascadeIndex,\n  const float mipLevel,\n  out vec4 outputColor,\n  out vec3 outputDepthVelocity\n) {\n  vec2 clip = vUv * 2.0 - 1.0;\n  vec4 point = inverseShadowMatrices[cascadeIndex] * vec4(clip.xy, -1.0, 1.0);\n  point /= point.w;\n  vec3 sunPosition = (worldToECEFMatrix * vec4(point.xyz, 1.0)).xyz + altitudeCorrection;\n\n  vec3 rayDirection = normalize(-sunDirection);\n  float rayNear;\n  float rayFar;\n  getRayNearFar(sunPosition, rayDirection, rayNear, rayFar);\n\n  vec3 rayOrigin = rayNear * rayDirection + sunPosition;\n  float stbn = getSTBN();\n  vec4 color = marchClouds(rayOrigin, rayDirection, rayFar - rayNear, stbn, mipLevel);\n  outputColor = color;\n\n  // Velocity for temporal resolution.\n  #ifdef TEMPORAL_PASS\n  vec3 frontPosition = color.x * rayDirection + rayOrigin;\n  vec3 frontPositionWorld = (ecefToWorldMatrix * vec4(frontPosition - altitudeCorrection, 1.0)).xyz;\n  vec4 prevClip = reprojectionMatrices[cascadeIndex] * vec4(frontPositionWorld, 1.0);\n  prevClip /= prevClip.w;\n  vec2 prevUv = prevClip.xy * 0.5 + 0.5;\n  vec2 velocity = (vUv - prevUv) * resolution;\n  outputDepthVelocity = vec3(color.x, velocity);\n  #else // TEMPORAL_PASS\n  outputDepthVelocity = vec3(0.0);\n  #endif // TEMPORAL_PASS\n}\n\n// TODO: Calculate from the main camera frustum perhaps?\nconst float mipLevels[4] = float[4](0.0, 0.5, 1.0, 2.0);\n\nvoid main() {\n  #pragma unroll_loop_start\n  for (int i = 0; i < 4; ++i) {\n    #if UNROLLED_LOOP_INDEX < CASCADE_COUNT\n    cascade(UNROLLED_LOOP_INDEX, mipLevels[i], outputColor[i], outputDepthVelocity[i]);\n    #endif // UNROLLED_LOOP_INDEX < CASCADE_COUNT\n  }\n  #pragma unroll_loop_end\n}\n", c_ = "precision highp float;\n\nlayout(location = 0) in vec3 position;\n\nout vec2 vUv;\n\nvoid main() {\n  vUv = position.xy * 0.5 + 0.5;\n  gl_Position = vec4(position.xy, 1.0, 1.0);\n}\n", l_ = "// Implements Structured Volume Sampling in fragment shader:\n// https://github.com/huwb/volsample\n// Implementation reference:\n// https://www.shadertoy.com/view/ttVfDc\n\nvoid getIcosahedralVertices(const vec3 direction, out vec3 v1, out vec3 v2, out vec3 v3) {\n  // Normalization scalers to fit dodecahedron to unit sphere.\n  const float a = 0.85065080835204; // phi / sqrt(2 + phi)\n  const float b = 0.5257311121191336; // 1 / sqrt(2 + phi)\n\n  // Derive the vertices of icosahedron where triangle intersects the direction.\n  // See: https://www.ppsloan.org/publications/AmbientDice.pdf\n  const float kT = 0.6180339887498948; // 1 / phi\n  const float kT2 = 0.38196601125010515; // 1 / phi^2\n  vec3 absD = abs(direction);\n  float selector1 = dot(absD, vec3(1.0, kT2, -kT));\n  float selector2 = dot(absD, vec3(-kT, 1.0, kT2));\n  float selector3 = dot(absD, vec3(kT2, -kT, 1.0));\n  v1 = selector1 > 0.0 ? vec3(a, b, 0.0) : vec3(-b, 0.0, a);\n  v2 = selector2 > 0.0 ? vec3(0.0, a, b) : vec3(a, -b, 0.0);\n  v3 = selector3 > 0.0 ? vec3(b, 0.0, a) : vec3(0.0, a, -b);\n  vec3 octantSign = sign(direction);\n  v1 *= octantSign;\n  v2 *= octantSign;\n  v3 *= octantSign;\n}\n\nvoid swapIfBigger(inout vec4 a, inout vec4 b) {\n  if (a.w > b.w) {\n    vec4 t = a;\n    a = b;\n    b = t;\n  }\n}\n\nvoid sortVertices(inout vec3 a, inout vec3 b, inout vec3 c) {\n  const vec3 base = vec3(0.5, 0.5, 1.0);\n  vec4 aw = vec4(a, dot(a, base));\n  vec4 bw = vec4(b, dot(b, base));\n  vec4 cw = vec4(c, dot(c, base));\n  swapIfBigger(aw, bw);\n  swapIfBigger(bw, cw);\n  swapIfBigger(aw, bw);\n  a = aw.xyz;\n  b = bw.xyz;\n  c = cw.xyz;\n}\n\nvec3 getPentagonalWeights(const vec3 direction, const vec3 v1, const vec3 v2, const vec3 v3) {\n  float d1 = dot(v1, direction);\n  float d2 = dot(v2, direction);\n  float d3 = dot(v3, direction);\n  vec3 w = exp(vec3(d1, d2, d3) * 40.0);\n  return w / (w.x + w.y + w.z);\n}\n\nvec3 getStructureNormal(\n  const vec3 direction,\n  const float jitter,\n  out vec3 a,\n  out vec3 b,\n  out vec3 c,\n  out vec3 weights\n) {\n  getIcosahedralVertices(direction, a, b, c);\n  sortVertices(a, b, c);\n  weights = getPentagonalWeights(direction, a, b, c);\n  return jitter < weights.x\n    ? a\n    : jitter < weights.x + weights.y\n      ? b\n      : c;\n}\n\nvec3 getStructureNormal(const vec3 direction, const float jitter) {\n  vec3 a, b, c, weights;\n  return getStructureNormal(direction, jitter, a, b, c, weights);\n}\n\n// Reference: https://github.com/huwb/volsample/blob/master/src/unity/Assets/Shaders/RayMarchCore.cginc\nvoid intersectStructuredPlanes(\n  const vec3 normal,\n  const vec3 rayOrigin,\n  const vec3 rayDirection,\n  const float samplePeriod,\n  out float stepOffset,\n  out float stepSize\n) {\n  float NoD = dot(rayDirection, normal);\n  stepSize = samplePeriod / abs(NoD);\n\n  // Skips leftover bit to get from rayOrigin to first strata plane.\n  stepOffset = -mod(dot(rayOrigin, normal), samplePeriod) / NoD;\n\n  // mod() gives different results depending on if the arg is negative or\n  // positive. This line makes it consistent, and ensures the first sample is in\n  // front of the viewer.\n  if (stepOffset < 0.0) {\n    stepOffset += stepSize;\n  }\n}\n", u_ = Object.defineProperty, d_ = (e, t, n, r) => {
	for (var i = void 0, a = e.length - 1, o; a >= 0; a--) (o = e[a]) && (i = o(t, n, i) || i);
	return i && u_(t, n, i), i;
}, f_ = class extends Ht {
	constructor({ parameterUniforms: e, layerUniforms: t, atmosphereUniforms: n }) {
		super({
			name: "ShadowMaterial",
			glslVersion: it,
			vertexShader: c_,
			fragmentShader: ho(uo(s_, {
				core: {
					math: Ao,
					raySphereIntersection: Mo
				},
				types: Ug,
				parameters: Hg,
				structuredSampling: l_,
				clouds: Bg
			})),
			uniforms: {
				...e,
				...t,
				...n,
				inverseShadowMatrices: new k(Array.from({ length: 4 }, () => new E())),
				reprojectionMatrices: new k(Array.from({ length: 4 }, () => new E())),
				resolution: new k(new A()),
				frame: new k(0),
				stbnTexture: new k(null),
				maxIterationCount: new k(J.shadow.maxIterationCount),
				minStepSize: new k(J.shadow.minStepSize),
				maxStepSize: new k(J.shadow.maxStepSize),
				minDensity: new k(J.shadow.minDensity),
				minExtinction: new k(J.shadow.minExtinction),
				minTransmittance: new k(J.shadow.minTransmittance),
				opticalDepthTailScale: new k(2)
			},
			defines: {
				SHADOW: "1",
				TEMPORAL_PASS: "1",
				TEMPORAL_JITTER: "1"
			}
		}), this.localWeatherChannels = "rgba", this.cascadeCount = J.shadow.cascadeCount, this.temporalPass = !0, this.temporalJitter = !0, this.shapeDetail = J.shapeDetail, this.turbulence = J.turbulence, this.cascadeCount = J.shadow.cascadeCount;
	}
	setSize(e, t) {
		this.uniforms.resolution.value.set(e, t);
	}
};
d_([ao("LOCAL_WEATHER_CHANNELS", { validate: (e) => /^[rgba]{4}$/.test(e) })], f_.prototype, "localWeatherChannels"), d_([no("CASCADE_COUNT", {
	min: 1,
	max: 4
})], f_.prototype, "cascadeCount"), d_([H("TEMPORAL_PASS")], f_.prototype, "temporalPass"), d_([H("TEMPORAL_JITTER")], f_.prototype, "temporalJitter"), d_([H("SHAPE_DETAIL")], f_.prototype, "shapeDetail"), d_([H("TURBULENCE")], f_.prototype, "turbulence");
var p_ = "precision highp float;\nprecision highp sampler2DArray;\n\n#define VARIANCE_9_SAMPLES 1\n#define VARIANCE_SAMPLER_ARRAY 1\n\n#include \"varianceClipping\"\n\nuniform sampler2DArray inputBuffer;\nuniform sampler2DArray historyBuffer;\n\nuniform vec2 texelSize;\nuniform float varianceGamma;\nuniform float temporalAlpha;\n\nin vec2 vUv;\n\nlayout(location = 0) out vec4 outputColor[CASCADE_COUNT];\n\nconst ivec2 neighborOffsets[9] = ivec2[9](\n  ivec2(-1, -1),\n  ivec2(-1, 0),\n  ivec2(-1, 1),\n  ivec2(0, -1),\n  ivec2(0, 0),\n  ivec2(0, 1),\n  ivec2(1, -1),\n  ivec2(1, 0),\n  ivec2(1, 1)\n);\n\nvec4 getClosestFragment(const ivec3 coord) {\n  vec4 result = vec4(1e7, 0.0, 0.0, 0.0);\n  vec4 neighbor;\n  #pragma unroll_loop_start\n  for (int i = 0; i < 9; ++i) {\n    neighbor = texelFetchOffset(\n      inputBuffer,\n      coord + ivec3(0, 0, CASCADE_COUNT),\n      0,\n      neighborOffsets[i]\n    );\n    if (neighbor.r < result.r) {\n      result = neighbor;\n    }\n  }\n  #pragma unroll_loop_end\n  return result;\n}\n\nvoid cascade(const int cascadeIndex, out vec4 outputColor) {\n  ivec3 coord = ivec3(gl_FragCoord.xy, cascadeIndex);\n  vec4 current = texelFetch(inputBuffer, coord, 0);\n\n  vec4 depthVelocity = getClosestFragment(coord);\n  vec2 velocity = depthVelocity.gb * texelSize;\n  vec2 prevUv = vUv - velocity;\n  if (prevUv.x < 0.0 || prevUv.x > 1.0 || prevUv.y < 0.0 || prevUv.y > 1.0) {\n    outputColor = current;\n    return; // Rejection\n  }\n\n  vec4 history = texture(historyBuffer, vec3(prevUv, float(cascadeIndex)));\n  vec4 clippedHistory = varianceClipping(inputBuffer, coord, current, history, varianceGamma);\n  outputColor = mix(clippedHistory, current, temporalAlpha);\n}\n\nvoid main() {\n  #pragma unroll_loop_start\n  for (int i = 0; i < 4; ++i) {\n    #if UNROLLED_LOOP_INDEX < CASCADE_COUNT\n    cascade(UNROLLED_LOOP_INDEX, outputColor[i]);\n    #endif // UNROLLED_LOOP_INDEX < CASCADE_COUNT\n  }\n  #pragma unroll_loop_end\n}\n", m_ = "precision highp float;\n\nlayout(location = 0) in vec3 position;\n\nout vec2 vUv;\n\nvoid main() {\n  vUv = position.xy * 0.5 + 0.5;\n  gl_Position = vec4(position.xy, 1.0, 1.0);\n}\n", h_ = Object.defineProperty, g_ = (e, t, n, r) => {
	for (var i = void 0, a = e.length - 1, o; a >= 0; a--) (o = e[a]) && (i = o(t, n, i) || i);
	return i && h_(t, n, i), i;
}, __ = class extends Ht {
	constructor({ inputBuffer: e = null, historyBuffer: t = null } = {}) {
		super({
			name: "ShadowResolveMaterial",
			glslVersion: it,
			vertexShader: m_,
			fragmentShader: ho(uo(p_, { varianceClipping: Qg })),
			uniforms: {
				inputBuffer: new k(e),
				historyBuffer: new k(t),
				texelSize: new k(new A()),
				varianceGamma: new k(1),
				temporalAlpha: new k(.01)
			},
			defines: {}
		}), this.cascadeCount = J.shadow.cascadeCount;
	}
	setSize(e, t) {
		this.uniforms.texelSize.value.set(1 / e, 1 / t);
	}
};
g_([no("CASCADE_COUNT", {
	min: 1,
	max: 4
})], __.prototype, "cascadeCount");
function v_(e) {
	let t = new un(1, 1, 1, { depthBuffer: !1 });
	return t.texture.type = ot, t.texture.minFilter = T, t.texture.magFilter = T, t.texture.name = e, t;
}
var y_ = class extends n_ {
	constructor({ parameterUniforms: e, layerUniforms: t, atmosphereUniforms: n, ...r }) {
		super("ShadowPass", r), this.width = 0, this.height = 0, this.currentMaterial = new f_({
			parameterUniforms: e,
			layerUniforms: t,
			atmosphereUniforms: n
		}), this.currentPass = new o_(this.currentMaterial), this.resolveMaterial = new __(), this.resolvePass = new o_(this.resolveMaterial), this.initRenderTargets();
	}
	initialize(e, t, n) {
		this.currentPass.initialize(e, t, n), this.resolvePass.initialize(e, t, n);
	}
	initRenderTargets() {
		this.currentRenderTarget?.dispose(), this.resolveRenderTarget?.dispose(), this.historyRenderTarget?.dispose();
		let e = v_("Shadow"), t = this.temporalPass ? v_("Shadow.A") : null, n = this.temporalPass ? v_("Shadow.B") : null;
		this.currentRenderTarget = e, this.resolveRenderTarget = t, this.historyRenderTarget = n;
		let r = this.resolveMaterial.uniforms;
		r.inputBuffer.value = e.texture, r.historyBuffer.value = n?.texture ?? null;
	}
	copyShadow() {
		let e = this.shadow, t = this.currentMaterial.uniforms;
		for (let n = 0; n < e.cascadeCount; ++n) {
			let r = e.cascades[n];
			t.inverseShadowMatrices.value[n].copy(r.inverseMatrix);
		}
	}
	copyReprojection() {
		let e = this.shadow, t = this.currentMaterial.uniforms;
		for (let n = 0; n < e.cascadeCount; ++n) {
			let r = e.cascades[n];
			t.reprojectionMatrices.value[n].copy(r.matrix);
		}
	}
	swapBuffers() {
		wg(this.historyRenderTarget != null), wg(this.resolveRenderTarget != null);
		let e = this.historyRenderTarget, t = this.resolveRenderTarget;
		this.resolveRenderTarget = e, this.historyRenderTarget = t, this.resolveMaterial.uniforms.historyBuffer.value = t.texture;
	}
	update(e, t, n) {
		this.currentMaterial.uniforms.frame.value = t, this.copyShadow(), this.currentPass.render(e, null, this.currentRenderTarget), this.temporalPass && (wg(this.resolveRenderTarget != null), this.resolvePass.render(e, null, this.resolveRenderTarget), this.copyReprojection(), this.swapBuffers());
	}
	setSize(e, t, n = this.shadow.cascadeCount) {
		this.width = e, this.height = t, this.currentMaterial.cascadeCount = n, this.resolveMaterial.cascadeCount = n, this.currentMaterial.setSize(e, t), this.resolveMaterial.setSize(e, t), this.currentRenderTarget.setSize(e, t, this.temporalPass ? n * 2 : n), this.resolveRenderTarget?.setSize(e, t, n), this.historyRenderTarget?.setSize(e, t, n);
	}
	get outputBuffer() {
		return this.temporalPass ? (wg(this.historyRenderTarget != null), this.historyRenderTarget.texture) : this.currentRenderTarget.texture;
	}
	get temporalPass() {
		return this.currentMaterial.temporalPass;
	}
	set temporalPass(e) {
		e !== this.temporalPass && (this.currentMaterial.temporalPass = e, this.initRenderTargets(), this.setSize(this.width, this.height));
	}
};
function b_(e) {
	return {
		scatteringCoefficient: new k(1),
		absorptionCoefficient: new k(0),
		coverage: new k(.3),
		localWeatherTexture: new k(e.localWeatherTexture),
		localWeatherRepeat: new k(e.localWeatherRepeat),
		localWeatherOffset: new k(e.localWeatherOffset),
		shapeTexture: new k(e.shapeTexture),
		shapeRepeat: new k(e.shapeRepeat),
		shapeOffset: new k(e.shapeOffset),
		shapeDetailTexture: new k(e.shapeDetailTexture),
		shapeDetailRepeat: new k(e.shapeDetailRepeat),
		shapeDetailOffset: new k(e.shapeDetailOffset),
		turbulenceTexture: new k(e.turbulenceTexture),
		turbulenceRepeat: new k(e.turbulenceRepeat),
		turbulenceDisplacement: new k(350)
	};
}
function x_() {
	return {
		minLayerHeights: new k(new M()),
		maxLayerHeights: new k(new M()),
		minIntervalHeights: new k(new j()),
		maxIntervalHeights: new k(new j()),
		densityScales: new k(new M()),
		shapeAmounts: new k(new M()),
		shapeDetailAmounts: new k(new M()),
		weatherExponents: new k(new M()),
		shapeAlteringBiases: new k(new M()),
		coverageFilterWidths: new k(new M()),
		minHeight: new k(0),
		maxHeight: new k(0),
		shadowTopHeight: new k(0),
		shadowBottomHeight: new k(0),
		shadowLayerMask: new k(new M()),
		densityProfile: new k({
			expTerms: new M(),
			exponents: new M(),
			linearTerms: new M(),
			constantTerms: new M()
		})
	};
}
var S_ = [
	0,
	0,
	0,
	0
];
function C_(e, t) {
	t.packValues("altitude", e.minLayerHeights.value), t.packSums("altitude", "height", e.maxLayerHeights.value), t.packIntervalHeights(e.minIntervalHeights.value, e.maxIntervalHeights.value), t.packValues("densityScale", e.densityScales.value), t.packValues("shapeAmount", e.shapeAmounts.value), t.packValues("shapeDetailAmount", e.shapeDetailAmounts.value), t.packValues("weatherExponent", e.weatherExponents.value), t.packValues("shapeAlteringBias", e.shapeAlteringBiases.value), t.packValues("coverageFilterWidth", e.coverageFilterWidths.value);
	let n = e.densityProfile.value;
	t.packDensityProfiles("expTerm", n.expTerms), t.packDensityProfiles("exponent", n.exponents), t.packDensityProfiles("linearTerm", n.linearTerms), t.packDensityProfiles("constantTerm", n.constantTerms);
	let r = 1 / 0, i = 0, a = 1 / 0, o = 0;
	S_.fill(0);
	for (let e = 0; e < t.length; ++e) {
		let { altitude: n, height: s, shadow: c } = t[e], l = n + s;
		s > 0 && (n < r && (r = n), c && n < a && (a = n), l > i && (i = l), c && l > o && (o = l)), S_[e] = +!!c;
	}
	r === 1 / 0 ? (wg(i === 0), e.minHeight.value = 0) : (e.minHeight.value = r, e.maxHeight.value = i), a === 1 / 0 ? (wg(o === 0), e.shadowBottomHeight.value = 0) : (e.shadowBottomHeight.value = a, e.shadowTopHeight.value = o), e.shadowLayerMask.value.fromArray(S_);
}
function w_(e, t) {
	return {
		bottomRadius: new k(e.bottomRadius),
		topRadius: new k(e.topRadius),
		worldToECEFMatrix: new k(t.worldToECEFMatrix),
		ecefToWorldMatrix: new k(t.ecefToWorldMatrix),
		altitudeCorrection: new k(t.altitudeCorrection),
		sunDirection: new k(t.sunDirection)
	};
}
var T_ = "uniform sampler2D cloudsBuffer;\n\nvoid mainImage(const vec4 inputColor, const vec2 uv, out vec4 outputColor) {\n  #ifdef SKIP_RENDERING\n  outputColor = inputColor;\n  #else // SKIP_RENDERING\n  vec4 clouds = texture(cloudsBuffer, uv);\n  outputColor.rgb = inputColor.rgb * (1.0 - clouds.a) + clouds.rgb;\n  outputColor.a = inputColor.a * (1.0 - clouds.a) + clouds.a;\n  #endif // SKIP_RENDERING\n}\n", E_ = Object.defineProperty, D_ = (e, t, n, r) => {
	for (var i = void 0, a = e.length - 1, o; a >= 0; a--) (o = e[a]) && (i = o(t, n, i) || i);
	return i && E_(t, n, i), i;
}, O_ = /* @__PURE__ */ new j(), k_ = /* @__PURE__ */ new A(), A_ = /* @__PURE__ */ new Et(), j_ = [
	"maxIterationCount",
	"minStepSize",
	"maxStepSize",
	"maxRayDistance",
	"perspectiveStepScale",
	"minDensity",
	"minExtinction",
	"minTransmittance",
	"maxIterationCountToSun",
	"maxIterationCountToGround",
	"minSecondaryStepSize",
	"secondaryStepScale",
	"maxShadowFilterRadius",
	"maxShadowLengthIterationCount",
	"minShadowLengthStepSize",
	"maxShadowLengthRayDistance",
	"hazeDensityScale",
	"hazeExponent",
	"hazeScatteringCoefficient",
	"hazeAbsorptionCoefficient"
], M_ = [
	"multiScatteringOctaves",
	"accurateSunSkyLight",
	"accuratePhaseFunction"
], N_ = [
	"maxIterationCount",
	"minStepSize",
	"maxStepSize",
	"minDensity",
	"minExtinction",
	"minTransmittance",
	"opticalDepthTailScale"
], P_ = ["temporalJitter"], F_ = ["temporalPass"], I_ = [
	"cascadeCount",
	"mapSize",
	"maxFar",
	"farScale",
	"splitMode",
	"splitLambda"
], L_ = { type: "change" }, R_ = {
	resolutionScale: J.resolutionScale,
	width: Dn.AUTO_SIZE,
	height: Dn.AUTO_SIZE
}, z_ = class extends gn {
	constructor(e = new He(), t, n = Jo.DEFAULT) {
		super("CloudsEffect", T_, {
			attributes: _n.DEPTH,
			uniforms: /* @__PURE__ */ new Map([["cloudsBuffer", new k(null)]])
		}), this.camera = e, this.atmosphere = n, this.cloudLayers = Sg.DEFAULT.clone(), this.correctAltitude = !0, this.localWeatherRepeat = new A().setScalar(100), this.localWeatherOffset = new A(), this.shapeRepeat = new j().setScalar(3e-4), this.shapeOffset = new j(), this.shapeDetailRepeat = new j().setScalar(.006), this.shapeDetailOffset = new j(), this.turbulenceRepeat = new A().setScalar(20), this.worldToECEFMatrix = new E(), this.ecefToWorldMatrix = new E(), this.altitudeCorrection = new j(), this.sunDirection = new j(), this.localWeatherVelocity = new A(), this.shapeVelocity = new j(), this.shapeDetailVelocity = new j(), this._atmosphereOverlay = null, this._atmosphereShadow = null, this._atmosphereShadowLength = null, this.events = new $e(), this.frame = 0, this.shadowCascadeCount = 0, this.shadowMapSize = new A(), this.onResolutionChange = () => {
			this.setSize(this.resolution.baseWidth, this.resolution.baseHeight);
		}, this.skipRendering = !0;
		let { resolutionScale: r, width: i, height: a, resolutionX: o = i, resolutionY: s = a } = {
			...R_,
			...t
		};
		this.shadowMaps = new Fg({
			cascadeCount: J.shadow.cascadeCount,
			mapSize: J.shadow.mapSize,
			splitLambda: .6
		}), this.parameterUniforms = b_({
			localWeatherTexture: this.proceduralLocalWeather?.texture ?? null,
			localWeatherRepeat: this.localWeatherRepeat,
			localWeatherOffset: this.localWeatherOffset,
			shapeTexture: this.proceduralShape?.texture ?? null,
			shapeRepeat: this.shapeRepeat,
			shapeOffset: this.shapeOffset,
			shapeDetailTexture: this.proceduralShapeDetail?.texture ?? null,
			shapeDetailRepeat: this.shapeDetailRepeat,
			shapeDetailOffset: this.shapeDetailOffset,
			turbulenceTexture: this.proceduralTurbulence?.texture ?? null,
			turbulenceRepeat: this.turbulenceRepeat
		}), this.layerUniforms = x_(), this.atmosphereUniforms = w_(n, {
			worldToECEFMatrix: this.worldToECEFMatrix,
			ecefToWorldMatrix: this.ecefToWorldMatrix,
			altitudeCorrection: this.altitudeCorrection,
			sunDirection: this.sunDirection
		});
		let c = {
			shadow: this.shadowMaps,
			parameterUniforms: this.parameterUniforms,
			layerUniforms: this.layerUniforms,
			atmosphereUniforms: this.atmosphereUniforms
		};
		this.shadowPass = new y_(c), this.shadowPass.mainCamera = e, this.cloudsPass = new i_(c, n), this.cloudsPass.mainCamera = e, this.clouds = oo(so({}, this.cloudsPass.currentMaterial, j_), this.cloudsPass.currentMaterial, M_), this.shadow = oo(so({}, this.shadowPass.currentMaterial, N_), this.shadowPass.currentMaterial, P_, this.shadowPass, F_, this.shadowMaps, I_), this.resolution = new Dn(this, o, s, r), this.resolution.addEventListener("change", this.onResolutionChange);
	}
	get mainCamera() {
		return this.camera;
	}
	set mainCamera(e) {
		this.camera = e, this.shadowPass.mainCamera = e, this.cloudsPass.mainCamera = e;
	}
	initialize(e, t, n) {
		this.shadowPass.initialize(e, t, n), this.cloudsPass.initialize(e, t, n);
	}
	updateSharedUniforms(e) {
		C_(this.layerUniforms, this.cloudLayers);
		let { parameterUniforms: t } = this;
		t.localWeatherOffset.value.add(k_.copy(this.localWeatherVelocity).multiplyScalar(e)), t.shapeOffset.value.add(O_.copy(this.shapeVelocity).multiplyScalar(e)), t.shapeDetailOffset.value.add(O_.copy(this.shapeDetailVelocity).multiplyScalar(e));
		let n = this.worldToECEFMatrix;
		this.ecefToWorldMatrix.copy(n).invert();
		let r = this.camera.getWorldPosition(O_).applyMatrix4(this.worldToECEFMatrix), i = this.altitudeCorrection;
		this.correctAltitude ? zo(r, this.atmosphere.bottomRadius, this.ellipsoid, i) : i.setScalar(0);
		let a = this.ellipsoid.getSurfaceNormal(r, O_), o = Za(1e6, 1e3, this.sunDirection.dot(a)), s = A_.setFromMatrix4(n).transpose();
		this.shadowMaps.update(this.camera, O_.copy(this.sunDirection).applyMatrix3(s), o);
	}
	updateWeatherTextureChannels() {
		let e = this.cloudLayers.localWeatherChannels;
		this.cloudsPass.currentMaterial.localWeatherChannels = e, this.shadowPass.currentMaterial.localWeatherChannels = e;
	}
	updateAtmosphereComposition() {
		let { shadowMaps: e, shadowPass: t, cloudsPass: n } = this, r = t.currentMaterial.uniforms, i = n.currentMaterial.uniforms, a = this._atmosphereOverlay, o = Object.assign(this._atmosphereOverlay ?? {}, { map: n.outputBuffer });
		a !== o && (this._atmosphereOverlay = o, L_.target = this, L_.property = "atmosphereOverlay", this.events.dispatchEvent(L_));
		let s = this._atmosphereShadow, c = Object.assign(this._atmosphereShadow ?? {}, {
			map: t.outputBuffer,
			mapSize: e.mapSize,
			cascadeCount: e.cascadeCount,
			intervals: i.shadowIntervals.value,
			matrices: i.shadowMatrices.value,
			inverseMatrices: r.inverseShadowMatrices.value,
			far: e.far,
			topHeight: i.shadowTopHeight.value
		});
		s !== c && (this._atmosphereShadow = c, L_.target = this, L_.property = "atmosphereShadow", this.events.dispatchEvent(L_));
		let l = this._atmosphereShadowLength, u = n.shadowLengthBuffer == null ? null : Object.assign(this._atmosphereShadowLength ?? {}, { map: n.shadowLengthBuffer });
		l !== u && (this._atmosphereShadowLength = u, L_.target = this, L_.property = "atmosphereShadowLength", this.events.dispatchEvent(L_));
	}
	update(e, t, n = 0) {
		let { shadowMaps: r, shadowPass: i, cloudsPass: a } = this;
		if (r.cascadeCount !== this.shadowCascadeCount || !r.mapSize.equals(this.shadowMapSize)) {
			let { width: e, height: t } = r.mapSize, n = r.cascadeCount;
			this.shadowMapSize.set(e, t), this.shadowCascadeCount = n, i.setSize(e, t, n), a.setShadowSize(e, t, n);
		}
		this.proceduralLocalWeather?.render(e, n), this.proceduralShape?.render(e, n), this.proceduralShapeDetail?.render(e, n), this.proceduralTurbulence?.render(e, n), ++this.frame, this.updateSharedUniforms(n), this.updateWeatherTextureChannels(), i.update(e, this.frame, n), a.shadowBuffer = i.outputBuffer, a.update(e, this.frame, n), this.updateAtmosphereComposition(), this.uniforms.get("cloudsBuffer").value = this.cloudsPass.outputBuffer;
	}
	setSize(e, t) {
		let { resolution: n } = this;
		n.setBaseSize(e, t);
		let { width: r, height: i } = n;
		this.cloudsPass.setSize(r, i);
	}
	setDepthTexture(e, t) {
		this.shadowPass.setDepthTexture(e, t), this.cloudsPass.setDepthTexture(e, t);
	}
	set qualityPreset(e) {
		let { clouds: t, shadow: n, ...r } = Rg[e];
		Object.assign(this, r), Object.assign(this.clouds, t), Object.assign(this.shadow, n);
	}
	get localWeatherTexture() {
		return this.proceduralLocalWeather ?? this.parameterUniforms.localWeatherTexture.value;
	}
	set localWeatherTexture(e) {
		e instanceof en || e == null ? (this.proceduralLocalWeather = void 0, this.parameterUniforms.localWeatherTexture.value = e) : (this.proceduralLocalWeather = e, this.parameterUniforms.localWeatherTexture.value = e.texture);
	}
	get shapeTexture() {
		return this.proceduralShape ?? this.parameterUniforms.shapeTexture.value;
	}
	set shapeTexture(e) {
		e instanceof qe || e == null ? (this.proceduralShape = void 0, this.parameterUniforms.shapeTexture.value = e) : (this.proceduralShape = e, this.parameterUniforms.shapeTexture.value = e.texture);
	}
	get shapeDetailTexture() {
		return this.proceduralShapeDetail ?? this.parameterUniforms.shapeDetailTexture.value;
	}
	set shapeDetailTexture(e) {
		e instanceof qe || e == null ? (this.proceduralShapeDetail = void 0, this.parameterUniforms.shapeDetailTexture.value = e) : (this.proceduralShapeDetail = e, this.parameterUniforms.shapeDetailTexture.value = e.texture);
	}
	get turbulenceTexture() {
		return this.proceduralTurbulence ?? this.parameterUniforms.turbulenceTexture.value;
	}
	set turbulenceTexture(e) {
		e instanceof en || e == null ? (this.proceduralTurbulence = void 0, this.parameterUniforms.turbulenceTexture.value = e) : (this.proceduralTurbulence = e, this.parameterUniforms.turbulenceTexture.value = e.texture);
	}
	get stbnTexture() {
		return this.cloudsPass.currentMaterial.uniforms.stbnTexture.value;
	}
	set stbnTexture(e) {
		this.cloudsPass.currentMaterial.uniforms.stbnTexture.value = e, this.shadowPass.currentMaterial.uniforms.stbnTexture.value = e;
	}
	get resolutionScale() {
		return this.resolution.scale;
	}
	set resolutionScale(e) {
		this.resolution.scale = e;
	}
	get temporalUpscale() {
		return this.cloudsPass.temporalUpscale;
	}
	set temporalUpscale(e) {
		this.cloudsPass.temporalUpscale = e;
	}
	get lightShafts() {
		return this.cloudsPass.lightShafts;
	}
	set lightShafts(e) {
		this.cloudsPass.lightShafts = e;
	}
	get shapeDetail() {
		return this.cloudsPass.currentMaterial.shapeDetail;
	}
	set shapeDetail(e) {
		this.cloudsPass.currentMaterial.shapeDetail = e, this.shadowPass.currentMaterial.shapeDetail = e;
	}
	get turbulence() {
		return this.cloudsPass.currentMaterial.turbulence;
	}
	set turbulence(e) {
		this.cloudsPass.currentMaterial.turbulence = e, this.shadowPass.currentMaterial.turbulence = e;
	}
	get haze() {
		return this.cloudsPass.currentMaterial.haze;
	}
	set haze(e) {
		this.cloudsPass.currentMaterial.haze = e;
	}
	get scatteringCoefficient() {
		return this.parameterUniforms.scatteringCoefficient.value;
	}
	set scatteringCoefficient(e) {
		this.parameterUniforms.scatteringCoefficient.value = e;
	}
	get absorptionCoefficient() {
		return this.parameterUniforms.absorptionCoefficient.value;
	}
	set absorptionCoefficient(e) {
		this.parameterUniforms.absorptionCoefficient.value = e;
	}
	get coverage() {
		return this.parameterUniforms.coverage.value;
	}
	set coverage(e) {
		this.parameterUniforms.coverage.value = e;
	}
	get turbulenceDisplacement() {
		return this.parameterUniforms.turbulenceDisplacement.value;
	}
	set turbulenceDisplacement(e) {
		this.parameterUniforms.turbulenceDisplacement.value = e;
	}
	get scatterAnisotropy1() {
		return this.cloudsPass.currentMaterial.scatterAnisotropy1;
	}
	set scatterAnisotropy1(e) {
		this.cloudsPass.currentMaterial.scatterAnisotropy1 = e;
	}
	get scatterAnisotropy2() {
		return this.cloudsPass.currentMaterial.scatterAnisotropy2;
	}
	set scatterAnisotropy2(e) {
		this.cloudsPass.currentMaterial.scatterAnisotropy2 = e;
	}
	get scatterAnisotropyMix() {
		return this.cloudsPass.currentMaterial.scatterAnisotropyMix;
	}
	set scatterAnisotropyMix(e) {
		this.cloudsPass.currentMaterial.scatterAnisotropyMix = e;
	}
	get skyLightScale() {
		return this.cloudsPass.currentMaterial.uniforms.skyLightScale.value;
	}
	set skyLightScale(e) {
		this.cloudsPass.currentMaterial.uniforms.skyLightScale.value = e;
	}
	get groundBounceScale() {
		return this.cloudsPass.currentMaterial.uniforms.groundBounceScale.value;
	}
	set groundBounceScale(e) {
		this.cloudsPass.currentMaterial.uniforms.groundBounceScale.value = e;
	}
	get powderScale() {
		return this.cloudsPass.currentMaterial.uniforms.powderScale.value;
	}
	set powderScale(e) {
		this.cloudsPass.currentMaterial.uniforms.powderScale.value = e;
	}
	get powderExponent() {
		return this.cloudsPass.currentMaterial.uniforms.powderExponent.value;
	}
	set powderExponent(e) {
		this.cloudsPass.currentMaterial.uniforms.powderExponent.value = e;
	}
	get atmosphereOverlay() {
		return this._atmosphereOverlay;
	}
	get atmosphereShadow() {
		return this._atmosphereShadow;
	}
	get atmosphereShadowLength() {
		return this._atmosphereShadowLength;
	}
	get irradianceTexture() {
		return this.cloudsPass.currentMaterial.irradianceTexture;
	}
	set irradianceTexture(e) {
		this.cloudsPass.currentMaterial.irradianceTexture = e;
	}
	get scatteringTexture() {
		return this.cloudsPass.currentMaterial.scatteringTexture;
	}
	set scatteringTexture(e) {
		this.cloudsPass.currentMaterial.scatteringTexture = e;
	}
	get transmittanceTexture() {
		return this.cloudsPass.currentMaterial.transmittanceTexture;
	}
	set transmittanceTexture(e) {
		this.cloudsPass.currentMaterial.transmittanceTexture = e;
	}
	get singleMieScatteringTexture() {
		return this.cloudsPass.currentMaterial.singleMieScatteringTexture;
	}
	set singleMieScatteringTexture(e) {
		this.cloudsPass.currentMaterial.singleMieScatteringTexture = e;
	}
	get higherOrderScatteringTexture() {
		return this.cloudsPass.currentMaterial.higherOrderScatteringTexture;
	}
	set higherOrderScatteringTexture(e) {
		this.cloudsPass.currentMaterial.higherOrderScatteringTexture = e;
	}
	get ellipsoid() {
		return this.cloudsPass.currentMaterial.ellipsoid;
	}
	set ellipsoid(e) {
		this.cloudsPass.currentMaterial.ellipsoid = e;
	}
	get sunAngularRadius() {
		return this.cloudsPass.currentMaterial.sunAngularRadius;
	}
	set sunAngularRadius(e) {
		this.cloudsPass.currentMaterial.sunAngularRadius = e;
	}
};
D_([H("SKIP_RENDERING")], z_.prototype, "skipRendering");
var B_ = "45a1c6c1bb9fd38b3680fd120795ff4c32df68ff";
`${B_}`, `${B_}`, `${B_}`, `${B_}`;
//#endregion
//#region src/effects/clouds/layer.ts
var V_ = class extends Fu {
	impl;
	constructor(e, t) {
		super(), this.impl = new _g(e), this.channel = t?.channel ?? this.channel, this.altitude = t?.altitude ?? this.altitude, this.height = t?.height ?? this.height, this.densityScale = t?.densityScale ?? this.densityScale, this.shapeAmount = t?.shapeAmount ?? this.shapeAmount, this.shapeDetailAmount = t?.shapeDetailAmount ?? this.shapeDetailAmount, this.weatherExponent = t?.weatherExponent ?? this.weatherExponent, this.shapeAlteringBias = t?.shapeAlteringBias ?? this.shapeAlteringBias, this.coverageFilterWidth = t?.coverageFilterWidth ?? this.coverageFilterWidth, this.shadow = t?.shadow ?? this.shadow, this.expTerm = t?.expTerm ?? this.expTerm, this.exponent = t?.exponent ?? this.exponent, this.linearTerm = t?.linearTerm ?? this.linearTerm, this.constantTerm = t?.constantTerm ?? this.constantTerm;
	}
	onUpdate() {
		this.emit("needsUpdate");
	}
	get channel() {
		return this.impl.channel;
	}
	set channel(e) {
		this.impl.channel = e, this.onUpdate();
	}
	get altitude() {
		return this.impl.altitude;
	}
	set altitude(e) {
		this.impl.altitude = e, this.onUpdate();
	}
	get height() {
		return this.impl.height;
	}
	set height(e) {
		this.impl.height = e, this.onUpdate();
	}
	get densityScale() {
		return this.impl.densityScale;
	}
	set densityScale(e) {
		this.impl.densityScale = e, this.onUpdate();
	}
	get shapeAmount() {
		return this.impl.shapeAmount;
	}
	set shapeAmount(e) {
		this.impl.shapeAmount = e, this.onUpdate();
	}
	get shapeDetailAmount() {
		return this.impl.shapeDetailAmount;
	}
	set shapeDetailAmount(e) {
		this.impl.shapeDetailAmount = e, this.onUpdate();
	}
	get weatherExponent() {
		return this.impl.weatherExponent;
	}
	set weatherExponent(e) {
		this.impl.weatherExponent = e, this.onUpdate();
	}
	get shapeAlteringBias() {
		return this.impl.shapeAlteringBias;
	}
	set shapeAlteringBias(e) {
		this.impl.shapeAlteringBias = e, this.onUpdate();
	}
	get coverageFilterWidth() {
		return this.impl.coverageFilterWidth;
	}
	set coverageFilterWidth(e) {
		this.impl.coverageFilterWidth = e, this.onUpdate();
	}
	get shadow() {
		return this.impl.shadow;
	}
	set shadow(e) {
		this.impl.shadow = e, this.onUpdate();
	}
	get expTerm() {
		return this.impl.densityProfile.expTerm;
	}
	set expTerm(e) {
		this.impl.densityProfile.expTerm = e, this.onUpdate();
	}
	get exponent() {
		return this.impl.densityProfile.exponent;
	}
	set exponent(e) {
		this.impl.densityProfile.exponent = e, this.onUpdate();
	}
	get linearTerm() {
		return this.impl.densityProfile.linearTerm;
	}
	set linearTerm(e) {
		this.impl.densityProfile.linearTerm = e, this.onUpdate();
	}
	get constantTerm() {
		return this.impl.densityProfile.constantTerm;
	}
	set constantTerm(e) {
		this.impl.densityProfile.constantTerm = e, this.onUpdate();
	}
}, H_ = {
	enabled: !1,
	assetsUrl: void 0,
	stbnUrl: ee,
	qualityPreset: "medium",
	localWeatherVelocity: new A(),
	coverage: .25,
	lightShafts: null,
	resolutionScale: 1,
	maxIterationCount: null,
	minStepSize: null,
	maxStepSize: null,
	shadows: !0,
	shadowCascadeCount: 3,
	shadowMapSize: new A(512, 512),
	shadowFarScale: .05,
	haze: !0,
	hazeDensityScale: 3e-5,
	hazeExponent: .001,
	hazeScatteringCoefficient: .9,
	hazeAbsorptionCoefficient: .5,
	localWeatherRepeat: new A().setScalar(100),
	localWeatherOffset: new A(),
	shapeRepeat: new j().setScalar(3e-4),
	shapeOffset: new j(),
	shapeDetailRepeat: new j().setScalar(.006),
	shapeDetailOffset: new j(),
	turbulenceRepeat: new A().setScalar(20),
	turbulenceDisplacement: 350,
	scatteringCoefficient: 1,
	absorptionCoefficient: 0,
	scatterAnisotropy1: .7,
	scatterAnisotropy2: -.2,
	scatterAnisotropyMix: .5,
	skyLightScale: 1,
	groundBounceScale: 1,
	powderScale: .8,
	powderExponent: 150,
	cloudLayers: null
}, U_ = class extends m {
	atmosphere;
	_cloudLayers = [];
	constructor(e, t, n) {
		let r = new z_(e), i = new a(e, r);
		super(i, r, {
			...H_,
			...n ?? {}
		}), this.atmosphere = t, this.atmosphere.enableShadows.value = this.shadows, this.init();
	}
	init() {
		this.rawEffect && (this.initializeCloudLayers(this.options?.cloudLayers ?? void 0), this.qualityPreset = this.options.qualityPreset, this.localWeatherVelocity = this.options.localWeatherVelocity, this.resolutionScale = this.options.resolutionScale, this.haze = this.options.haze, this.hazeDensityScale = this.options.hazeDensityScale, this.hazeExponent = this.options.hazeExponent, this.hazeScatteringCoefficient = this.options.hazeScatteringCoefficient, this.hazeAbsorptionCoefficient = this.options.hazeAbsorptionCoefficient, this.localWeatherRepeat = this.options.localWeatherRepeat, this.localWeatherOffset = this.options.localWeatherOffset, this.shapeRepeat = this.options.shapeRepeat, this.shapeOffset = this.options.shapeOffset, this.shapeDetailRepeat = this.options.shapeDetailRepeat, this.shapeDetailOffset = this.options.shapeDetailOffset, this.turbulenceRepeat = this.options.turbulenceRepeat, this.turbulenceDisplacement = this.options.turbulenceDisplacement, this.scatteringCoefficient = this.options.scatteringCoefficient, this.absorptionCoefficient = this.options.absorptionCoefficient, this.scatterAnisotropy1 = this.options.scatterAnisotropy1, this.scatterAnisotropy2 = this.options.scatterAnisotropy2, this.scatterAnisotropyMix = this.options.scatterAnisotropyMix, this.skyLightScale = this.options.skyLightScale, this.groundBounceScale = this.options.groundBounceScale, this.powderScale = this.options.powderScale, this.powderExponent = this.options.powderExponent, this.options.maxIterationCount != null && (this.maxIterationCount = this.options.maxIterationCount), this.options.maxStepSize != null && (this.maxStepSize = this.options.maxStepSize), this.options.minStepSize != null && (this.minStepSize = this.options.minStepSize), this.options.lightShafts != null && (this.lightShafts = this.options.lightShafts), this.coverage = this.options.coverage, this.shadowFarScale = this.options.shadowFarScale, this.shadowMapSize = this.options.shadowMapSize, this.shadowCascadeCount = this.options.shadowCascadeCount, this.loadAll().then(() => {
			this.emit("needsUpdate");
		}), this.inner.events.addEventListener("change", (e) => {
			if (!(!this.rawEffect || !this.atmosphere)) {
				switch (e.property) {
					case "atmosphereOverlay":
						this.atmosphere.overlay.value = this.rawEffect.atmosphereOverlay;
						break;
					case "atmosphereShadow":
						if (!this.shadows) break;
						this.atmosphere.shadow.value = this.inner.atmosphereShadow, new er().load(this.options.stbnUrl, (e) => {
							this.rawEffect && (this.rawEffect.stbnTexture = e);
						});
						break;
					case "atmosphereShadowLength": this.atmosphere.shadowLength.value = this.inner.atmosphereShadowLength;
				}
				this.atmosphere.onUpdate();
			}
		}), this.atmosphere.onTexturesReady((e) => this.onTextureLoaded(e)), this.atmosphere.on("disposed", this.onDisposed));
	}
	onTextureLoaded = (e) => {
		Object.assign(this.rawEffect, e);
	};
	onDisposed = () => {
		this.dispose(), this.atmosphere?.off("disposed", this.onDisposed);
	};
	_update() {
		this.inner.sunDirection.copy(this.atmosphere.sunDirection);
	}
	dispose() {
		this.atmosphere.overlay.value = null, this.atmosphere.shadow.value = null, this.atmosphere.shadowLength.value = null, super.dispose();
	}
	initializeCloudLayers(e) {
		let t = [
			new V_(Sg.DEFAULT[0], e?.[0]),
			new V_(Sg.DEFAULT[1], e?.[1]),
			new V_(Sg.DEFAULT[2], e?.[2]),
			new V_(Sg.DEFAULT[3], e?.[3])
		];
		for (let e = 0; e < 4; e++) {
			let n = t[e];
			n.on("needsUpdate", () => {
				this.rawEffect.cloudLayers[e].set(n.impl), this.emit("needsUpdate");
			});
		}
		this.rawEffect.cloudLayers.set(t.map((e) => e.impl)), this._cloudLayers = t;
	}
	get inner() {
		return this.rawEffect;
	}
	assetUrl(e, t) {
		let { assetsUrl: n } = this.options;
		return n == null ? t : `${n}/${e}`;
	}
	loadAll() {
		return Promise.all([
			new tn().loadAsync(this.assetUrl("local_weather.png", e)).then(this.onLocalWeatherLoad),
			new Ya(qe, fo, {
				width: 128,
				height: 128,
				depth: 128
			}).loadAsync(this.assetUrl("shape.bin", n)).then(this.onShapeLoad),
			new Ya(qe, fo, {
				width: 32,
				height: 32,
				depth: 32
			}).loadAsync(this.assetUrl("shape_detail.bin", t)).then(this.onShapeDetailLoad),
			new tn().loadAsync(this.assetUrl("turbulence.png", r)).then(this.onTurbulenceLoad),
			new er().loadAsync(this.options.stbnUrl).then(this.onSTBNLoad)
		]);
	}
	onLocalWeatherLoad = (e) => {
		e.minFilter = vt, e.magFilter = T, e.wrapS = Wt, e.wrapT = Wt, e.colorSpace = jt, e.needsUpdate = !0, this.rawEffect.localWeatherTexture = e;
	};
	onShapeLoad = (e) => {
		e.format = Ut, e.minFilter = T, e.magFilter = T, e.wrapS = Wt, e.wrapT = Wt, e.wrapR = Wt, e.colorSpace = jt, e.needsUpdate = !0, this.rawEffect.shapeTexture = e;
	};
	onShapeDetailLoad = (e) => {
		e.format = Ut, e.minFilter = T, e.magFilter = T, e.wrapS = Wt, e.wrapT = Wt, e.wrapR = Wt, e.colorSpace = jt, e.needsUpdate = !0, this.rawEffect.shapeDetailTexture = e;
	};
	onTurbulenceLoad = (e) => {
		e.minFilter = vt, e.magFilter = T, e.wrapS = Wt, e.wrapT = Wt, e.colorSpace = jt, e.needsUpdate = !0, this.rawEffect.turbulenceTexture = e;
	};
	onSTBNLoad = (e) => {
		this.rawEffect.stbnTexture = e;
	};
	get qualityPreset() {
		return this.rawEffect.qualityPreset;
	}
	set qualityPreset(e) {
		this.rawEffect.qualityPreset = e, this.emit("needsUpdate");
	}
	get localWeatherVelocity() {
		return this.rawEffect.localWeatherVelocity;
	}
	set localWeatherVelocity(e) {
		this.rawEffect.localWeatherVelocity.copy(e), this.emit("needsUpdate");
	}
	get coverage() {
		return this.rawEffect.coverage;
	}
	set coverage(e) {
		this.rawEffect.coverage = e, this.emit("needsUpdate");
	}
	get lightShafts() {
		return !!this.rawEffect.lightShafts;
	}
	set lightShafts(e) {
		this.rawEffect.lightShafts = e, this.emit("needsUpdate");
	}
	get resolutionScale() {
		return this.rawEffect.resolutionScale;
	}
	set resolutionScale(e) {
		this.rawEffect.resolutionScale = e, this.emit("needsUpdate");
	}
	get maxIterationCount() {
		return this.rawEffect.clouds.maxIterationCount;
	}
	set maxIterationCount(e) {
		this.rawEffect.clouds.maxIterationCount = e, this.emit("needsUpdate");
	}
	get minStepSize() {
		return this.rawEffect.clouds.minStepSize;
	}
	set minStepSize(e) {
		this.rawEffect.clouds.minStepSize = e, this.emit("needsUpdate");
	}
	get maxStepSize() {
		return this.rawEffect.clouds.maxStepSize;
	}
	set maxStepSize(e) {
		this.rawEffect.clouds.maxStepSize = e, this.emit("needsUpdate");
	}
	get shadows() {
		return this.options.shadows;
	}
	set shadows(e) {
		this.options.shadows = e, this.atmosphere.enableShadows.value = e, this.emit("needsUpdate");
	}
	get shadowCascadeCount() {
		return this.rawEffect.shadow.cascadeCount;
	}
	set shadowCascadeCount(e) {
		this.rawEffect.shadow.cascadeCount = e, this.emit("needsUpdate");
	}
	get shadowMapSize() {
		return this.rawEffect.shadow.mapSize;
	}
	set shadowMapSize(e) {
		this.rawEffect.shadow.mapSize = e, this.emit("needsUpdate");
	}
	get shadowFarScale() {
		return this.rawEffect.shadow.farScale;
	}
	set shadowFarScale(e) {
		this.rawEffect.shadow.farScale = e, this.emit("needsUpdate");
	}
	get haze() {
		return this.rawEffect.haze;
	}
	set haze(e) {
		this.rawEffect.haze = e, this.emit("needsUpdate");
	}
	get hazeDensityScale() {
		return this.rawEffect.clouds.hazeDensityScale;
	}
	set hazeDensityScale(e) {
		this.rawEffect.clouds.hazeDensityScale = e, this.emit("needsUpdate");
	}
	get hazeExponent() {
		return this.rawEffect.clouds.hazeExponent;
	}
	set hazeExponent(e) {
		this.rawEffect.clouds.hazeExponent = e, this.emit("needsUpdate");
	}
	get hazeScatteringCoefficient() {
		return this.rawEffect.clouds.hazeScatteringCoefficient;
	}
	set hazeScatteringCoefficient(e) {
		this.rawEffect.clouds.hazeScatteringCoefficient = e, this.emit("needsUpdate");
	}
	get hazeAbsorptionCoefficient() {
		return this.rawEffect.clouds.hazeAbsorptionCoefficient;
	}
	set hazeAbsorptionCoefficient(e) {
		this.rawEffect.clouds.hazeAbsorptionCoefficient = e, this.emit("needsUpdate");
	}
	get localWeatherRepeat() {
		return this.rawEffect.localWeatherRepeat;
	}
	set localWeatherRepeat(e) {
		this.rawEffect.localWeatherRepeat.copy(e), this.emit("needsUpdate");
	}
	get localWeatherOffset() {
		return this.rawEffect.localWeatherOffset;
	}
	set localWeatherOffset(e) {
		this.rawEffect.localWeatherOffset.copy(e), this.emit("needsUpdate");
	}
	get shapeRepeat() {
		return this.rawEffect.shapeRepeat;
	}
	set shapeRepeat(e) {
		this.rawEffect.shapeRepeat.copy(e), this.emit("needsUpdate");
	}
	get shapeOffset() {
		return this.rawEffect.shapeOffset;
	}
	set shapeOffset(e) {
		this.rawEffect.shapeOffset.copy(e), this.emit("needsUpdate");
	}
	get shapeDetailRepeat() {
		return this.rawEffect.shapeDetailRepeat;
	}
	set shapeDetailRepeat(e) {
		this.rawEffect.shapeDetailRepeat.copy(e), this.emit("needsUpdate");
	}
	get shapeDetailOffset() {
		return this.rawEffect.shapeDetailOffset;
	}
	set shapeDetailOffset(e) {
		this.rawEffect.shapeDetailOffset.copy(e), this.emit("needsUpdate");
	}
	get turbulenceRepeat() {
		return this.rawEffect.turbulenceRepeat;
	}
	set turbulenceRepeat(e) {
		this.rawEffect.turbulenceRepeat.copy(e), this.emit("needsUpdate");
	}
	get turbulenceDisplacement() {
		return this.rawEffect.turbulenceDisplacement;
	}
	set turbulenceDisplacement(e) {
		this.rawEffect.turbulenceDisplacement = e, this.emit("needsUpdate");
	}
	get scatteringCoefficient() {
		return this.rawEffect.scatteringCoefficient;
	}
	set scatteringCoefficient(e) {
		this.rawEffect.scatteringCoefficient = e, this.emit("needsUpdate");
	}
	get absorptionCoefficient() {
		return this.rawEffect.absorptionCoefficient;
	}
	set absorptionCoefficient(e) {
		this.rawEffect.absorptionCoefficient = e, this.emit("needsUpdate");
	}
	get scatterAnisotropy1() {
		return this.rawEffect.scatterAnisotropy1;
	}
	set scatterAnisotropy1(e) {
		this.rawEffect.scatterAnisotropy1 = e, this.emit("needsUpdate");
	}
	get scatterAnisotropy2() {
		return this.rawEffect.scatterAnisotropy2;
	}
	set scatterAnisotropy2(e) {
		this.rawEffect.scatterAnisotropy2 = e, this.emit("needsUpdate");
	}
	get scatterAnisotropyMix() {
		return this.rawEffect.scatterAnisotropyMix;
	}
	set scatterAnisotropyMix(e) {
		this.rawEffect.scatterAnisotropyMix = e, this.emit("needsUpdate");
	}
	get skyLightScale() {
		return this.rawEffect.skyLightScale;
	}
	set skyLightScale(e) {
		this.rawEffect.skyLightScale = e, this.emit("needsUpdate");
	}
	get groundBounceScale() {
		return this.rawEffect.groundBounceScale;
	}
	set groundBounceScale(e) {
		this.rawEffect.groundBounceScale = e, this.emit("needsUpdate");
	}
	get powderScale() {
		return this.rawEffect.powderScale;
	}
	set powderScale(e) {
		this.rawEffect.powderScale = e, this.emit("needsUpdate");
	}
	get powderExponent() {
		return this.rawEffect.powderExponent;
	}
	set powderExponent(e) {
		this.rawEffect.powderExponent = e, this.emit("needsUpdate");
	}
	get cloudLayers() {
		return this._cloudLayers;
	}
}, W_ = class extends xt {
	constructor(e) {
		super(e), this.type = sn;
	}
	setType(e) {
		return this.type = e, this;
	}
	load(e, t, n, r) {
		let i = new et(this.manager);
		i.setPath(this.path), i.setResponseType("text"), i.load(e, (n) => {
			try {
				t(this.parse(n));
			} catch (t) {
				r ? r(t) : console.error(t), this.manager.itemError(e);
			}
		}, n, r);
	}
	parse(e) {
		let t = /^[\d ]+$/m, n = /^([\d.e+-]+) +([\d.e+-]+) +([\d.e+-]+) *$/gm, r = t.exec(e);
		if (r === null) throw Error("THREE.LUT3dlLoader: Missing grid information");
		let i = r[0].trim().split(/\s+/g).map(Number), a = i[1] - i[0], o = i.length, s = o ** 2;
		for (let e = 1, t = i.length; e < t; ++e) if (a !== i[e] - i[e - 1]) throw Error("THREE.LUT3dlLoader: Inconsistent grid size");
		let c = new Float32Array(o ** 3 * 4), l = 0, u = 0;
		for (; (r = n.exec(e)) !== null;) {
			let e = Number(r[1]), t = Number(r[2]), n = Number(r[3]);
			l = Math.max(l, e, t, n);
			let i = u % o, a = Math.floor(u / o) % o, d = Math.floor(u / s) % o, f = (i * s + a * o + d) * 4;
			c[f + 0] = e, c[f + 1] = t, c[f + 2] = n, ++u;
		}
		let d = 2 ** Math.ceil(Math.log2(l)), f = this.type === sn ? new Uint8Array(c.length) : c, p = this.type === sn ? 255 : 1;
		for (let e = 0, t = f.length; e < t; e += 4) {
			let t = e + 1, n = e + 2, r = e + 3;
			f[e] = c[e] / d * p, f[t] = c[t] / d * p, f[n] = c[n] / d * p, f[r] = p;
		}
		let m = new qe();
		return m.image.data = f, m.image.width = o, m.image.height = o, m.image.depth = o, m.format = Bt, m.type = this.type, m.magFilter = T, m.minFilter = T, m.wrapS = Ge, m.wrapT = Ge, m.wrapR = Ge, m.generateMipmaps = !1, m.needsUpdate = !0, {
			size: o,
			texture3D: m
		};
	}
}, G_ = class extends xt {
	constructor(e) {
		super(e), this.type = sn;
	}
	setType(e) {
		return this.type = e, this;
	}
	load(e, t, n, r) {
		let i = new et(this.manager);
		i.setPath(this.path), i.setResponseType("text"), i.load(e, (n) => {
			try {
				t(this.parse(n));
			} catch (t) {
				r ? r(t) : console.error(t), this.manager.itemError(e);
			}
		}, n, r);
	}
	parse(e) {
		let t = /TITLE +"([^"]*)"/, n = /LUT_3D_SIZE +(\d+)/, r = /DOMAIN_MIN +([\d.]+) +([\d.]+) +([\d.]+)/, i = /DOMAIN_MAX +([\d.]+) +([\d.]+) +([\d.]+)/, a = /^([\d.e+-]+) +([\d.e+-]+) +([\d.e+-]+) *$/gm, o = t.exec(e), s = o === null ? null : o[1];
		if (o = n.exec(e), o === null) throw Error("THREE.LUTCubeLoader: Missing LUT_3D_SIZE information");
		let c = Number(o[1]), l = c ** 3 * 4, u = this.type === sn ? new Uint8Array(l) : new Float32Array(l), d = new j(0, 0, 0), f = new j(1, 1, 1);
		if (o = r.exec(e), o !== null && d.set(Number(o[1]), Number(o[2]), Number(o[3])), o = i.exec(e), o !== null && f.set(Number(o[1]), Number(o[2]), Number(o[3])), d.x > f.x || d.y > f.y || d.z > f.z) throw Error("THREE.LUTCubeLoader: Invalid input domain");
		let p = this.type === sn ? 255 : 1, m = 0;
		for (; (o = a.exec(e)) !== null;) u[m++] = Number(o[1]) * p, u[m++] = Number(o[2]) * p, u[m++] = Number(o[3]) * p, u[m++] = p;
		let h = new qe();
		return h.image.data = u, h.image.width = c, h.image.height = c, h.image.depth = c, h.type = this.type, h.magFilter = T, h.minFilter = T, h.wrapS = Ge, h.wrapT = Ge, h.wrapR = Ge, h.generateMipmaps = !1, h.needsUpdate = !0, {
			title: s,
			size: c,
			domainMin: d,
			domainMax: f,
			texture3D: h
		};
	}
}, K_ = class e extends s {
	static lutCubeLoader;
	static lut3dlLoader;
	static textureLoader;
	constructor(e, t) {
		let n = Cn.createNeutral(8), r = new Sn(n);
		super(e, r, t), this.loadLUT(t?.url || "", r);
	}
	loadLUT(t, n) {
		if (t.length === 0) return;
		let r = new URL(t).pathname.split(".").pop()?.toLowerCase();
		if (r === "cube") e.lutCubeLoader ||= new G_(), e.lutCubeLoader.load(t, (e) => {
			let t = new Cn(e.texture3D.image.data, e.size);
			t.type = e.texture3D.type, t.colorSpace = e.texture3D.colorSpace, t.generateMipmaps = !1, n.lut && n.lut.dispose(), n.lut = t, e.texture3D.dispose(), this.emit("needsUpdate");
		}, void 0, (e) => {
			console.error(`Failed to load LUT from ${t}:`, e);
		});
		else if (r === "3dl") e.lut3dlLoader ||= new W_(), e.lut3dlLoader.load(t, (e) => {
			let t = new Cn(e.texture3D.image.data, e.size);
			t.type = e.texture3D.type, t.colorSpace = e.texture3D.colorSpace, t.generateMipmaps = !1, n.lut && n.lut.dispose(), n.lut = t, e.texture3D.dispose(), this.emit("needsUpdate");
		}, void 0, (e) => {
			console.error(`Failed to load LUT from ${t}:`, e);
		});
		else if (r === "png" || r === "jpg" || r === "jpeg") e.textureLoader ||= new tn(), e.textureLoader.load(t, (e) => {
			let { width: t, height: r } = e.image, i = Math.cbrt(t * r);
			if (Number.isInteger(i) === !1) {
				console.error(`Invalid LUT texture size: ${t}x${r}`), e.dispose();
				return;
			}
			let { data: a } = En.from(e.image), o = new Cn(a, i);
			o.type = e.type, o.colorSpace = e.colorSpace, o.generateMipmaps = !1, n.lut && n.lut.dispose(), n.lut = o, e.dispose(), this.emit("needsUpdate");
		}, void 0, (e) => {
			console.error(`Failed to load LUT from ${t}:`, e);
		});
		else {
			console.warn(`Unsupported LUT file format: ${r}`);
			return;
		}
	}
	set url(e) {
		this.rawEffect && this.options?.url !== e && (this.options.url = e, this.loadLUT(e, this.rawEffect));
	}
	set blendMode(e) {
		this.rawEffect && this.options?.blendMode !== e && (this.options.blendMode = e, this.rawEffect.blendMode.blendFunction = ne(e), this.emit("needsUpdate"));
	}
	set opacity(e) {
		this.rawEffect && this.options?.opacity !== e && (this.options.opacity = e, this.rawEffect.blendMode.opacity.value = e, this.emit("needsUpdate"));
	}
	dispose() {
		this.rawEffect && this.rawEffect.lut && this.rawEffect.lut.dispose(), super.dispose();
	}
	onMounted() {
		this.rawEffect && (this.rawEffect.blendMode.blendFunction = ne(this.options?.blendMode ?? "src"), this.rawEffect.blendMode.opacity.value = this.options?.opacity ?? 1);
	}
}, q_ = {
	enabled: !1,
	focusDistance: 1e3,
	focalLength: 1e3,
	bokehScale: 7
}, J_ = class extends s {
	constructor(e, t) {
		super(e, new mn(), t);
	}
	onMounted() {
		this.rawEffect && (this.rawEffect.blendMode.blendFunction = fn.NORMAL, this.rawEffect.cocMaterial.uniforms.focusDistance.value = this.options.focusDistance ?? q_.focusDistance, this.rawEffect.cocMaterial.uniforms.focalLength.value = this.options.focalLength ?? q_.focalLength, this.rawEffect.bokehScale = this.options.bokehScale ?? q_.bokehScale);
	}
	get focusDistance() {
		return this.options.focusDistance ?? q_.focusDistance;
	}
	set focusDistance(e) {
		this.options.focusDistance !== e && (this.options.focusDistance = e, this.rawEffect && (this.rawEffect.cocMaterial.uniforms.focusDistance.value = e, this.emit("needsUpdate")));
	}
	get focalLength() {
		return this.options.focalLength ?? q_.focalLength;
	}
	set focalLength(e) {
		this.options.focalLength !== e && (this.options.focalLength = e, this.rawEffect && (this.rawEffect.cocMaterial.uniforms.focalLength.value = e, this.emit("needsUpdate")));
	}
	get bokehScale() {
		return this.options.bokehScale ?? q_.bokehScale;
	}
	set bokehScale(e) {
		this.options.bokehScale !== e && (this.options.bokehScale = e, this.rawEffect && (this.rawEffect.bokehScale = e, this.emit("needsUpdate")));
	}
}, Y_ = "varying vec2 vUv;\n\nvoid main() {\n\n	vUv = position.xy * 0.5 + 0.5;\n	gl_Position = vec4(position.xy, 1.0, 1.0);\n\n}", X_ = "#include \"core/packing\"\n#include \"core/depth\"\n#include \"core/transform\"\n\nuniform sampler2D uLightTex0; // color,intensity\nuniform sampler2D uLightTex1; // position in world space (xyz), effective range baked on CPU (w)\nuniform sampler2D normalBuffer;\nuniform sampler2D copiedDepthBuffer;\nuniform bool useSurfaceLighting;\nuniform ivec2 uLightTexSize;\nuniform vec3 cameraPos;\nuniform float fogDensity;\nuniform float haloFalloff;\nuniform vec2 resolution;\nuniform float cameraNear;\nuniform float cameraFar;\nuniform mat4 projectionMatrix;\nuniform mat4 invProjectionMatrix;\nuniform mat4 invViewMatrix;\nuniform mat4 viewMatrix;\n// Tiled culling\nuniform sampler2D uResidual;       // per-tile haze from cap-dropped lights (rgb) + mean light distance (a)\nuniform sampler2D uLightGrid;      // per-tile: (offsetTexel, count)\nuniform sampler2D uLightIndex;     // packed 4 indices per texel (RGBA)\nuniform ivec2 uLightGridSize;      // gridW, gridH (tiles)\nuniform ivec2 uLightIndexTexSize;  // width, height of index texture\nuniform float uTileSizePx;         // tile size in pixels\n\nvec4 readCI(int idx) {\n  ivec2 tc = ivec2(idx % uLightTexSize.x, idx / uLightTexSize.x);\n  return texelFetch(uLightTex0, tc, 0);\n}\n\nvec4 readPos(int idx) {\n  ivec2 tc = ivec2(idx % uLightTexSize.x, idx / uLightTexSize.x);\n  return texelFetch(uLightTex1, tc, 0);\n}\n\n// ref: https://ijdykeman.github.io/graphics/simple_fog_shader\n// `range` is the light's effective reach min(userRadius, analytic hMax),\n// baked on the CPU (FogLightEffect.effectiveRange) into uLightTex1's w.\nvec3 calculateFogScattering(vec3 worldPos, vec3 viewDir, float viewDist, vec3 lightPos, vec3 lightColor, vec3 normal, float intensity, float range, float pixelScale, vec3 albedo) {\n    // Closest approach of the infinite view ray to the light: at ray\n    // parameter sStar (negative when the light sits behind the camera),\n    // with perpendicular distance h. Using the infinite-ray h keeps every\n    // quantity continuous in the view direction - a clamped closest point\n    // would jump when the light crosses the camera's side plane, which\n    // renders as perfectly straight seams across the fog.\n    vec3 camToLight = lightPos - cameraPos;\n    float sStar = dot(camToLight, viewDir);\n\n    // The integral peaks as 1/h; clamp h to half a fog pixel's world size at\n    // the light's distance so a sub-pixel core renders as its pixel average\n    // instead of a spike that flickers as the camera drifts.\n    #ifdef PERSPECTIVE_CAMERA\n    float hMin = max(0.001, pixelScale * max(sStar, 0.0) * 0.5);\n    #else\n    float hMin = max(0.001, pixelScale * 0.5);\n    #endif\n    float h = max(sqrt(max(dot(camToLight, camToLight) - sStar * sStar, 0.0)), hMin);\n\n    float R = range;\n    // Distance from the light to the nearest point of the VISIBLE segment.\n    // The infinite-line h alone must not drive attenuation: for a light just\n    // behind the camera the backward extension passes through it (h -> 0),\n    // which would paint a spurious unattenuated hotspot at the antipodal\n    // point. hSeg is continuous in the view direction.\n    float sOff = sStar - clamp(sStar, 0.0, viewDist);\n    float hSeg = sqrt(h * h + sOff * sOff);\n    // The visible segment stays outside the influence sphere: the fog\n    // integral is zero and the surface falloff (distance >= hSeg) is zero.\n    if (hSeg >= R) return vec3(0.0);\n\n    // Intersect the lit span [sStar - sMax, sStar + sMax] with the visible\n    // segment [0, viewDist] and integrate dS / (h^2 + (s - sStar)^2).\n    float sMax = sqrt(max(R*R - h*h, 0.0));\n    float lo = max(0.0, sStar - sMax) - sStar;\n    float hi = min(viewDist, sStar + sMax) - sStar;\n    float integral = hi > lo ? (atan(hi / h) - atan(lo / h)) / h : 0.0;\n\n    vec3 fogLight = lightColor * intensity * integral * fogDensity;\n\n    float attenuation = 1.0 / (1.0 + hSeg * haloFalloff);\n    fogLight *= attenuation;\n\n    if(useSurfaceLighting) {\n      // Calculate point lighting on the surface. (Deferred lighting)\n      vec3 L = lightPos - worldPos;\n      float d = length(L);\n      float NdotL = max(dot(normal, L / max(d, 1e-4)), 0.0);\n\n      // Windowed distance falloff, so surface lighting reaches exactly zero\n      // at the effective range and stays consistent with tile culling.\n      // Ref: https://cdn2.unrealengine.com/Resources/files/2013SiggraphPresentationsNotes-26915738.pdf\n      float w = d / R;\n      float window = saturate(1.0 - w * w * w * w);\n      float surfaceAtten = window * window / (1.0 + haloFalloff * d);\n\n      fogLight += BRDF_Lambert(albedo) * lightColor * intensity * NdotL * surfaceAtten;\n    }\n\n    return fogLight;\n}\n\nfloat readDepth(const vec2 uv) {\n  #if DEPTH_PACKING == 3201\n  return unpackRGBAToDepth(texture2D(copiedDepthBuffer, uv));\n  #else\n  return texture2D(copiedDepthBuffer, uv).r;\n  #endif // DEPTH_PACKING == 3201\n}\n\nfloat getViewZ(const float depth) {\n  #ifdef PERSPECTIVE_CAMERA\n  return perspectiveDepthToViewZ(depth, cameraNear, cameraFar);\n  #else\n  return orthographicDepthToViewZ(depth, cameraNear, cameraFar);\n  #endif\n}\n\nvoid mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {\n    float depth = readDepth(uv);\n    depth = reverseLogDepth(depth, cameraNear, cameraFar);\n\n    float viewZ = getViewZ(depth);\n    vec3 viewPos = screenToView(\n      uv,\n      depth,\n      viewZ,\n      projectionMatrix,\n      invProjectionMatrix\n    );\n    vec3 worldPos = (invViewMatrix * vec4(viewPos, 1.0)).xyz;\n    \n    // Get surface normal if surface lighting is enabled\n    vec3 normal = vec3(0.0);\n    if (useSurfaceLighting && depth < 0.9999) {\n        vec4 packedNormal = texture2D(normalBuffer, uv);\n        normal = unpackVec2ToNormal(packedNormal.xy);\n        // Transform normal from view space to world space\n        normal = normalize((invViewMatrix * vec4(normal, 0.0)).xyz);\n    }\n    \n    vec3 fogColor = vec3(0.0);\n\n    // View ray is shared by every light this pixel iterates\n    vec3 viewRay = worldPos - cameraPos;\n    float viewDist = length(viewRay);\n    vec3 viewDir = viewRay / max(viewDist, 1e-6);\n\n    // World size of one fog pixel — per unit view distance for perspective\n    // (multiply by the depth), absolute for orthographic\n    float pixelScale = 2.0 / (resolution.y * projectionMatrix[1][1]);\n\n    // Determine tile for this pixel\n    ivec2 pixel = ivec2(uv * resolution);\n    ivec2 tile = clamp(pixel / int(uTileSizePx), ivec2(0), uLightGridSize - ivec2(1));\n    int tileIndex = tile.x + tile.y * uLightGridSize.x;\n    ivec2 gridUv = ivec2(tileIndex % uLightGridSize.x, tileIndex / uLightGridSize.x);\n    vec2 gridData = texelFetch(uLightGrid, gridUv, 0).rg;\n    int offsetTexel = int(gridData.x + 0.5);\n    int count = int(min(gridData.y + 0.5, float(MAX_LIGHTS_PER_TILE)));\n\n    for (int j = 0; j < MAX_LIGHTS_PER_TILE; ++j) {\n      if (j >= count) break;\n      // RGBA‑packed (4 indices per texel)\n      int texelIndex = offsetTexel + (j >> 2);\n      int comp = j & 3;\n      ivec2 idxUv = ivec2(texelIndex % uLightIndexTexSize.x, texelIndex / uLightIndexTexSize.x);\n      vec4 packed = texelFetch(uLightIndex, idxUv, 0);\n      float fidx = comp == 0 ? packed.r : (comp == 1 ? packed.g : (comp == 2 ? packed.b : packed.a));\n      int i = int(floor(fidx + 0.5));\n      if (i < 0) continue;\n\n      vec4 ci = readCI(i); // color,intensity\n      vec4 posData = readPos(i); // position in world space\n      vec3 lightColor = ci.rgb;\n      float intensity = ci.a;\n      vec3 lightPos = posData.xyz;\n      if (intensity > 0.0) {\n        vec3 lightContribution = calculateFogScattering(\n          worldPos,\n          viewDir,\n          viewDist,\n          lightPos,\n          lightColor,\n          normal,\n          intensity,\n          posData.w,\n          pixelScale,\n          inputColor.rgb\n        );\n        fogColor += lightContribution;\n      }\n    }\n    // Residual haze from lights dropped by the per-tile cap. Manual bilinear\n    // across tiles (float textures aren't filterable without an extension)\n    // smooths it; the ray-length factor keeps it off foreground surfaces\n    // that sit well in front of the dropped lights.\n    vec2 rpos = (uv * resolution) / uTileSizePx - 0.5;\n    ivec2 rbase = ivec2(floor(rpos));\n    vec2 rf = fract(rpos);\n    ivec2 rmax = uLightGridSize - ivec2(1);\n    vec4 r00 = texelFetch(uResidual, clamp(rbase, ivec2(0), rmax), 0);\n    vec4 r10 = texelFetch(uResidual, clamp(rbase + ivec2(1, 0), ivec2(0), rmax), 0);\n    vec4 r01 = texelFetch(uResidual, clamp(rbase + ivec2(0, 1), ivec2(0), rmax), 0);\n    vec4 r11 = texelFetch(uResidual, clamp(rbase + ivec2(1, 1), ivec2(0), rmax), 0);\n    vec4 residual = mix(mix(r00, r10, rf.x), mix(r01, r11, rf.x), rf.y);\n    if (residual.a > 0.0) {\n      // Approximate fraction of the full-ray integral a ray of this length\n      // accumulates: ~0.5 when the surface sits at the lights' mean distance\n      // (half the scattering lobe), approaching 1 far beyond it.\n      float rayFactor = viewDist / (viewDist + residual.a);\n      fogColor += residual.rgb * rayFactor;\n    }\n\n    #ifdef DEBUG_SHOW_GRID\n      // Visualize tile grid and occupancy.\n      float occ = clamp(float(count) / float(MAX_LIGHTS_PER_TILE), 0.0, 1.0);\n\n      vec2 pix = uv * resolution;\n      vec2 tm = mod(pix, vec2(uTileSizePx));\n      float left   = 1.0 - step(1.0, tm.x);\n      float right  = step(uTileSizePx - 1.0, tm.x);\n      float top    = 1.0 - step(1.0, tm.y);\n      float bottom = step(uTileSizePx - 1.0, tm.y);\n      float gridLine = clamp(left + right + top + bottom, 0.0, 1.0);\n\n      vec3 gridFill = vec3(1.0) * occ * 0.05;\n      vec3 gridLines = vec3(1.0) * gridLine;\n      fogColor += gridFill + gridLines;\n    #endif\n\n    #ifdef FOG_ONLY_OUTPUT\n      // When downsampling: output only the fog contribution. The host pass will composite over input.\n      outputColor = vec4(fogColor, 1.0);\n    #else\n      vec3 finalColor = inputColor.rgb + fogColor;\n      outputColor = vec4(finalColor, inputColor.a);\n    #endif\n}\n", Z_ = 1e-4;
function Q_(e, t, n, r) {
	let i = Math.max(e, 0), a = Math.max(t, 0);
	if (i <= 0 || a <= 0 || n <= 0) return 0;
	let o = Math.PI * i * a / Z_, s = r, c = s > 1e-6 ? (Math.sqrt(1 + 4 * s * o) - 1) / (2 * s) : o;
	return Math.min(n, c);
}
function $_(e, t, n, r, i, a, o) {
	let s = n * n - r * r, c = Math.sqrt(e * e + s), l = Math.sqrt(t * t + s), u = (c * e - r * n) / (c * n + r * e) * i, d = (c * e + r * n) / (c * n - r * e) * i, f = (l * t - r * n) / (l * n + r * t) * a, p = (l * t + r * n) / (l * n - r * t) * a;
	return !isFinite(u) || !isFinite(d) || !isFinite(f) || !isFinite(p) ? !1 : (o[0] = u, o[1] = d, o[2] = f, o[3] = p, !0);
}
function ev(e, t, n, r) {
	if (e >= t) return 0;
	let i = Math.sqrt(t * t - e * e) / e, a = i <= 1 ? i / (1 + .28 * i * i) : Math.PI / 2 - i / (i * i + .28), o = n * 2 * a / e / (1 + r * e), s = (e - .85 * t) / (.15 * t);
	if (s > 0) {
		let e = s < 1 ? s : 1;
		o *= 1 - e * e * (3 - 2 * e);
	}
	return o;
}
//#endregion
//#region src/effects/fogLight/tileGrid.ts
var tv = class {
	gridW = 0;
	gridH = 0;
	indexTexW = 0;
	indexTexH = 1;
	tileCounts;
	tileSizePx;
	_maxLightsPerTile;
	width = 0;
	height = 0;
	gridTex;
	indexTex;
	residualTex;
	gridBuf;
	indexBuf;
	residualBuf;
	residualEnergy;
	slotVals;
	heapReady;
	tileDirs;
	reff = /* @__PURE__ */ new Float32Array();
	importance = /* @__PURE__ */ new Float32Array();
	dist = /* @__PURE__ */ new Float32Array();
	ldir = /* @__PURE__ */ new Float32Array();
	pxX = /* @__PURE__ */ new Float32Array();
	pxY = /* @__PURE__ */ new Float32Array();
	order = [];
	frustum = new rt();
	viewScratch = new j();
	ndcScratch = new j();
	sphereScratch = new Zt();
	boundsScratch = /* @__PURE__ */ new Float32Array(4);
	constructor(e, t) {
		this.tileSizePx = e, this._maxLightsPerTile = t;
	}
	get gridTexture() {
		return this.gridTex;
	}
	get indexTexture() {
		return this.indexTex;
	}
	get residualTexture() {
		return this.residualTex;
	}
	get maxLightsPerTile() {
		return this._maxLightsPerTile;
	}
	set maxLightsPerTile(e) {
		this._maxLightsPerTile = e, this.allocate();
	}
	setSize(e, t) {
		this.width = e, this.height = t, this.gridW = Math.max(1, Math.ceil(e / this.tileSizePx)), this.gridH = Math.max(1, Math.ceil(t / this.tileSizePx)), this.allocate();
	}
	allocate() {
		let e = this.gridW * this.gridH;
		(!this.gridBuf || this.gridBuf.length !== e * 2) && (this.gridBuf = new Float32Array(e * 2), this.gridTex ? this.rebind(this.gridTex, this.gridBuf, this.gridW, this.gridH) : (this.gridTex = new Je(this.gridBuf, this.gridW, this.gridH, Vt, nt), this.gridTex.magFilter = this.gridTex.minFilter = kt, this.gridTex.wrapS = this.gridTex.wrapT = Ge, this.gridTex.needsUpdate = !0)), (!this.tileCounts || this.tileCounts.length !== e) && (this.tileCounts = new Uint16Array(e));
		let t = e * this._maxLightsPerTile;
		(!this.slotVals || this.slotVals.length !== t) && (this.slotVals = new Float32Array(t), this.heapReady = new Uint8Array(e)), (!this.tileDirs || this.tileDirs.length !== e * 3) && (this.tileDirs = new Float32Array(e * 3)), (!this.residualBuf || this.residualBuf.length !== e * 4) && (this.residualBuf = new Float32Array(e * 4), this.residualEnergy = new Float32Array(e), this.residualTex ? this.rebind(this.residualTex, this.residualBuf, this.gridW, this.gridH) : (this.residualTex = new Je(this.residualBuf, this.gridW, this.gridH, Bt, nt), this.residualTex.magFilter = this.residualTex.minFilter = T, this.residualTex.wrapS = this.residualTex.wrapT = Ge, this.residualTex.needsUpdate = !0));
		let n = Math.max(1, Math.ceil(this._maxLightsPerTile / 4)), r = Math.max(1, e * n);
		(!this.indexBuf || this.indexBuf.length !== r * 4) && (this.indexTexW = Math.ceil(Math.sqrt(r)), this.indexTexH = Math.ceil(r / this.indexTexW), this.indexBuf = new Float32Array(this.indexTexW * this.indexTexH * 4), this.indexTex ? this.rebind(this.indexTex, this.indexBuf, this.indexTexW, this.indexTexH) : (this.indexTex = new Je(this.indexBuf, this.indexTexW, this.indexTexH, Bt, nt), this.indexTex.magFilter = this.indexTex.minFilter = kt, this.indexTex.wrapS = this.indexTex.wrapT = Ge, this.indexTex.needsUpdate = !0));
	}
	rebind(e, t, n, r) {
		e.image.data = t, e.image.width = n, e.image.height = r, e.dispose(), e.needsUpdate = !0;
	}
	populate(e) {
		if (!this.gridBuf || !this.indexBuf || !this.gridTex || !this.indexTex || !this.tileCounts || !this.residualBuf || !this.residualEnergy || !this.residualTex || !this.slotVals || !this.heapReady || !this.tileDirs) return !1;
		let t = this.width, n = this.height;
		if (t <= 0 || n <= 0) return !1;
		let { camera: r, vpM: i, viewM: a, buf0: o, buf1: s, userRadii: c, lightCount: l, fogDensity: u, haloFalloff: d, extentScale: f, maxFar: p } = e, m = this.tileCounts, h = this.indexBuf, g = this.residualBuf, _ = this.residualEnergy, v = this.slotVals, y = this.heapReady, b = this.tileDirs, x = this.gridW, ee = this.gridH, S = this.tileSizePx, te = this._maxLightsPerTile;
		m.fill(0), g.fill(0), _.fill(0), y.fill(0);
		let ne = .5 * t, re = .5 * n, ie = this.frustum.setFromProjectionMatrix(i), ae = this.viewScratch, oe = this.ndcScratch, se = this.sphereScratch, ce = this.boundsScratch, le = r.projectionMatrix, ue = Math.abs(le.elements[0]), de = Math.abs(le.elements[5]), fe = Math.max(1, Math.ceil(te / 4)), pe = fe * 4;
		this.reff.length < l && (this.reff = new Float32Array(l), this.importance = new Float32Array(l), this.dist = new Float32Array(l), this.ldir = new Float32Array(l * 3), this.pxX = new Float32Array(l), this.pxY = new Float32Array(l));
		let me = this.reff, he = this.importance, ge = this.dist, _e = this.ldir, ve = this.pxX, ye = this.pxY, be = this.order;
		be.length = 0;
		let xe = !1;
		for (let e = 0; e < l; e++) {
			let t = e * 4, n = o[t + 3], i = Math.fround(Q_(n, u, c[e], d));
			if (me[e] = i, s[t + 3] !== i && (s[t + 3] = i, xe = !0), n <= 0 || i <= 0) continue;
			ae.set(s[t], s[t + 1], s[t + 2]);
			let a = r.position.distanceTo(ae);
			ge[e] = a, !(a - i * f > p) && (he[e] = n * i / Math.max(a, 1), be.push(e));
		}
		be.sort((e, t) => he[t] - he[e]);
		let Se = r instanceof Pt;
		if (Se) {
			let e = r.matrixWorld.elements, i = e[0], a = e[1], o = e[2], s = e[4], c = e[5], l = e[6], u = e[8], d = e[9], f = e[10], p = 1 / ue, m = 1 / de;
			for (let e = 0; e < ee; e++) {
				let r = ((e + .5) * S / n * 2 - 1) * m;
				for (let n = 0; n < x; n++) {
					let m = ((n + .5) * S / t * 2 - 1) * p, h = i * m + s * r - u, g = a * m + c * r - d, _ = o * m + l * r - f, v = 1 / Math.sqrt(h * h + g * g + _ * _);
					h *= v, g *= v, _ *= v;
					let y = (e * x + n) * 3;
					b[y] = h, b[y + 1] = g, b[y + 2] = _;
				}
			}
		}
		let Ce = S * .5 / (ue * ne), we = 1 / (ue * ne), Te = (e, t, n, r) => {
			let i;
			if (Se) {
				let n = ge[e], r = e * 3, a = t * 3, o = _e[r] * b[a] + _e[r + 1] * b[a + 1] + _e[r + 2] * b[a + 2];
				i = o > 0 ? n * Math.sqrt(Math.max(1 - o * o, 0)) : n;
				let s = Math.max(Ce * n, .001);
				i < s && (i = s);
			} else {
				let t = (n + .5) * S - ve[e], a = (r + .5) * S - ye[e];
				i = Math.sqrt(t * t + a * a) * we;
				let o = Math.max(S * we * .5, .001);
				i < o && (i = o);
			}
			return ev(i, me[e], o[e * 4 + 3], d);
		}, Ee = (e, t, n) => {
			let r = n;
			for (;;) {
				let n = 2 * r + 1;
				if (n >= te) break;
				let i = n + 1, a = v[e + n] < v[e + r] ? n : r;
				if (i < te && v[e + i] < v[e + a] && (a = i), a === r) break;
				let o = v[e + a];
				v[e + a] = v[e + r], v[e + r] = o;
				let s = h[t + a];
				h[t + a] = h[t + r], h[t + r] = s, r = a;
			}
		};
		for (let e of be) {
			let c = e * 4, l = s[c + 0], d = s[c + 1], p = s[c + 2], b = me[e] * f;
			if (se.center.set(l, d, p), se.radius = b, !ie.intersectsSphere(se)) continue;
			ae.set(l, d, p).applyMatrix4(a);
			let le, fe, he, be;
			if (r instanceof Pt) {
				if (-ae.z - b <= r.near) le = 0, fe = x - 1, he = 0, be = ee - 1;
				else {
					if (!$_(ae.x, ae.y, -ae.z, b, ue, de, ce)) continue;
					let e = (ce[0] * .5 + .5) * t, r = (ce[1] * .5 + .5) * t, i = (ce[2] * .5 + .5) * n, a = (ce[3] * .5 + .5) * n;
					le = Math.floor(e / S), fe = Math.ceil(r / S) - 1, he = Math.floor(i / S), be = Math.ceil(a / S) - 1;
				}
			} else {
				oe.set(l, d, p).applyMatrix4(i);
				let r = (oe.x * .5 + .5) * t, a = (oe.y * .5 + .5) * n;
				if (!isFinite(r) || !isFinite(a)) continue;
				let o = Math.max(Math.abs(b * ue) * ne, Math.abs(b * de) * re);
				le = Math.floor((r - o) / S), fe = Math.ceil((r + o) / S) - 1, he = Math.floor((a - o) / S), be = Math.ceil((a + o) / S) - 1, ve[e] = r, ye[e] = a;
			}
			if (Se) {
				let t = ge[e], n = e * 3;
				if (t > 1e-6) {
					let e = r.position;
					_e[n] = (l - e.x) / t, _e[n + 1] = (d - e.y) / t, _e[n + 2] = (p - e.z) / t;
				} else _e[n] = 0, _e[n + 1] = 0, _e[n + 2] = 0;
			}
			if (fe < 0 || le >= x || be < 0 || he >= ee) continue;
			let xe = Math.max(0, Math.min(x - 1, le)), Ce = Math.max(0, Math.min(x - 1, fe)), we = Math.max(0, Math.min(ee - 1, he)), De = Math.max(0, Math.min(ee - 1, be));
			for (let t = we; t <= De; t++) {
				let n = t * x;
				for (let r = xe; r <= Ce; r++) {
					let i = n + r, a = m[i], s = i * pe;
					if (a < te) {
						h[s + a] = e, m[i] = a + 1;
						continue;
					}
					let c = i * te;
					if (y[i] === 0) {
						for (let e = 0; e < te; e++) v[c + e] = Te(h[s + e], i, r, t);
						for (let e = (te >> 1) - 1; e >= 0; e--) Ee(c, s, e);
						y[i] = 1;
					}
					let l = Te(e, i, r, t), d = l, f = e;
					if (l > v[c] && (d = v[c], f = h[s], v[c] = l, h[s] = e, Ee(c, s, 0)), d > 0) {
						let e = f * 4, t = u * d, n = o[e + 0] * t, r = o[e + 1] * t, a = o[e + 2] * t, s = i * 4;
						g[s + 0] += n, g[s + 1] += r, g[s + 2] += a;
						let c = n + r + a;
						g[s + 3] += c * ge[f], _[i] += c;
					}
				}
			}
		}
		let De = this.gridBuf;
		for (let e = 0; e < x * ee; e++) {
			let t = e * 2;
			De[t + 0] = e * fe, De[t + 1] = m[e], _[e] > 0 && (g[e * 4 + 3] /= _[e]);
		}
		return this.gridTex.needsUpdate = !0, this.indexTex.needsUpdate = !0, this.residualTex.needsUpdate = !0, xe;
	}
}, nv = {
	lights: [],
	fogDensity: 5,
	maxLights: 100,
	useSurfaceLighting: !0,
	tileSize: 32,
	maxLightsPerTile: 64,
	extentScale: 1,
	haloFalloff: .1,
	debugShowGrid: !1
}, rv = class extends gn {
	camera;
	invProjectionMatrix;
	invViewMatrix;
	viewMatrix;
	_vpM;
	lightTex0;
	lightTex1;
	buf0;
	buf1;
	userRadii;
	depthCopyPass;
	tileGrid;
	_extentScale;
	_maxFar;
	_gridDirty = !0;
	_prevVpM = new E();
	_prevFogDensity = NaN;
	constructor(e, t = {}) {
		let n = t.maxLights ?? nv.maxLights ?? 0, r = Math.ceil(Math.sqrt(n)), i = Math.ceil(n / r), a = new Float32Array(r * i * 4), o = new Float32Array(r * i * 4), s = new Je(a, r, i, Bt, nt);
		s.needsUpdate = !0, s.magFilter = s.minFilter = kt, s.wrapS = s.wrapT = Ge;
		let c = new Je(o, r, i, Bt, nt);
		c.needsUpdate = !0, c.magFilter = c.minFilter = kt, c.wrapS = c.wrapT = Ge;
		let l = /* @__PURE__ */ new Map([
			["uLightTex0", new k(s)],
			["uLightTex1", new k(c)],
			["uLightTexSize", new k(new A(r, i))],
			["cameraPos", new k(e.position)],
			["fogDensity", new k(t.fogDensity ?? nv.fogDensity)],
			["haloFalloff", new k(t.haloFalloff ?? nv.haloFalloff)],
			["normalBuffer", new k(t.normalBuffer ?? null)],
			["copiedDepthBuffer", new k(null)],
			["useSurfaceLighting", new k(t.useSurfaceLighting ?? nv.useSurfaceLighting)],
			["resolution", new k(new A())],
			["cameraNear", new k(e.near)],
			["cameraFar", new k(e.far)],
			["projectionMatrix", new k(new E())],
			["invProjectionMatrix", new k(new E())],
			["invViewMatrix", new k(new E())],
			["viewMatrix", new k(new E())],
			["uResidual", new k(null)],
			["uLightGrid", new k(null)],
			["uLightGridSize", new k(new A(0, 0))],
			["uLightIndex", new k(null)],
			["uLightIndexTexSize", new k(new A(0, 0))],
			["uTileSizePx", new k(t.tileSize ?? nv.tileSize ?? 16)]
		]);
		super("FogLightEffect", uo(X_, { core: {
			packing: jo,
			depth: Do,
			transform: No
		} }), {
			uniforms: l,
			blendFunction: fn.NORMAL
		}), this.camera = e, this.invProjectionMatrix = new E(), this.invViewMatrix = new E(), this.viewMatrix = new E(), this._vpM = new E(), this.lightTex0 = s, this.lightTex1 = c, this.buf0 = a, this.buf1 = o, this.userRadii = new Float32Array(r * i), this.tileGrid = new tv(t.tileSize ?? nv.tileSize ?? 16, t.maxLightsPerTile ?? nv.maxLightsPerTile ?? 64), this._extentScale = t.extentScale ?? nv.extentScale ?? 1, this._maxFar = t.maxFar ?? e.far, t.debugShowGrid && this.defines.set("DEBUG_SHOW_GRID", "1"), this.depthCopyPass = new pn();
		let u = this.uniforms.get("copiedDepthBuffer");
		u && (u.value = this.depthCopyPass.texture, this.defines.set("DEPTH_PACKING", zt.toString())), this.defines.set("MAX_LIGHTS_PER_TILE", this.maxLightsPerTile.toString());
	}
	setDepthTexture(e, t) {
		this.depthCopyPass.setDepthTexture(e, t);
	}
	update(e, t, n) {
		this.depthCopyPass.render(e, null, null), this.invProjectionMatrix.copy(this.camera.projectionMatrix).invert(), this.invViewMatrix.copy(this.camera.matrixWorld), this.viewMatrix.copy(this.camera.matrixWorld).invert();
		let r = this.uniforms.get("cameraPos"), i = this.uniforms.get("cameraNear"), a = this.uniforms.get("cameraFar"), o = this.uniforms.get("projectionMatrix"), s = this.uniforms.get("invProjectionMatrix"), c = this.uniforms.get("invViewMatrix"), l = this.uniforms.get("viewMatrix");
		r && r.value.copy(this.camera.position), i && (i.value = this.camera.near), a && (a.value = this.camera.far), s && s.value.copy(this.invProjectionMatrix), o && o.value.copy(this.camera.projectionMatrix), c && c.value.copy(this.invViewMatrix), l && l.value.copy(this.viewMatrix), this.camera instanceof Pt ? this.defines.get("PERSPECTIVE_CAMERA") !== "1" && this.defines.set("PERSPECTIVE_CAMERA", "1") : this.defines.get("PERSPECTIVE_CAMERA") != null && this.defines.delete("PERSPECTIVE_CAMERA");
		let u = this.uniforms.get("fogDensity")?.value ?? 1;
		this._vpM.multiplyMatrices(this.camera.projectionMatrix, this.viewMatrix), (this._gridDirty || u !== this._prevFogDensity || !this._vpM.equals(this._prevVpM)) && (this.tileGrid.populate({
			camera: this.camera,
			vpM: this._vpM,
			viewM: this.viewMatrix,
			buf0: this.buf0,
			buf1: this.buf1,
			userRadii: this.userRadii,
			lightCount: this.lightCount,
			fogDensity: u,
			haloFalloff: this.haloFalloff,
			extentScale: this._extentScale,
			maxFar: this._maxFar
		}) && (this.lightTex1.needsUpdate = !0), this._prevVpM.copy(this._vpM), this._prevFogDensity = u, this._gridDirty = !1), super.update(e, t, n);
	}
	writeLight(e, t, n, r, i = 500) {
		let a = 4 * e;
		this.buf0[a + 0] = t.raw.r, this.buf0[a + 1] = t.raw.g, this.buf0[a + 2] = t.raw.b, this.buf0[a + 3] = n, this.buf1[a + 0] = r.x, this.buf1[a + 1] = r.y, this.buf1[a + 2] = r.z, this.buf1[a + 3] = i, this.userRadii[e] = i;
	}
	updateLightTextures() {
		this.lightTex0.needsUpdate = !0, this.lightTex1.needsUpdate = !0, this._gridDirty = !0;
	}
	get lightCapacity() {
		return this.buf0.length / 4;
	}
	ensureLightCapacity(e) {
		if (e <= this.lightCapacity) return;
		let t = Math.ceil(Math.sqrt(e)), n = Math.ceil(e / t), r = new Float32Array(t * n * 4), i = new Float32Array(t * n * 4);
		r.set(this.buf0), i.set(this.buf1), this.buf0 = r, this.buf1 = i;
		let a = new Float32Array(t * n);
		a.set(this.userRadii), this.userRadii = a, this.lightTex0.image.data = r, this.lightTex0.image.width = t, this.lightTex0.image.height = n, this.lightTex0.dispose(), this.lightTex0.needsUpdate = !0, this.lightTex1.image.data = i, this.lightTex1.image.width = t, this.lightTex1.image.height = n, this.lightTex1.dispose(), this.lightTex1.needsUpdate = !0;
		let o = this.uniforms.get("uLightTexSize");
		o && o.value.set(t, n), this._gridDirty = !0;
	}
	updateDepthBuffer(e) {
		let t = this.uniforms.get("depthBuffer");
		t && (t.value = e);
	}
	setSize(e, t) {
		this.depthCopyPass.setSize(e, t);
		let n = this.uniforms.get("resolution");
		n && n.value.set(e, t), this.tileGrid.setSize(e, t), this.syncTileGridUniforms(), this._gridDirty = !0;
	}
	get copiedDepthTexture() {
		return this.depthCopyPass.texture;
	}
	setFogOnlyOutput(e) {
		e !== (this.defines.get("FOG_ONLY_OUTPUT") === "1") && (e ? this.defines.set("FOG_ONLY_OUTPUT", "1") : this.defines.delete("FOG_ONLY_OUTPUT"), this.setChanged());
	}
	get lightCount() {
		let e = this.defines.get("NUM_FOG_LIGHT");
		return Number(e);
	}
	set maxLightsPerTile(e) {
		let t = Math.max(1, Math.floor(e));
		this.tileGrid.maxLightsPerTile = t, this.defines.set("MAX_LIGHTS_PER_TILE", String(t)), this.syncTileGridUniforms(), this._gridDirty = !0, this.setChanged();
	}
	get maxLightsPerTile() {
		return this.tileGrid.maxLightsPerTile;
	}
	set extentScale(e) {
		this._extentScale = Math.max(0, e), this._gridDirty = !0;
	}
	get extentScale() {
		return this._extentScale;
	}
	set maxFar(e) {
		this._maxFar = Math.max(0, e), this._gridDirty = !0;
	}
	get maxFar() {
		return this._maxFar;
	}
	set haloFalloff(e) {
		let t = Math.max(0, e), n = this.uniforms.get("haloFalloff");
		n && (n.value = t), this._gridDirty = !0;
	}
	get haloFalloff() {
		return this.uniforms.get("haloFalloff")?.value ?? nv.haloFalloff ?? .1;
	}
	set debugShowGrid(e) {
		e ? this.defines.set("DEBUG_SHOW_GRID", "1") : this.defines.delete("DEBUG_SHOW_GRID"), this.setChanged();
	}
	get debugShowGrid() {
		return this.defines.get("DEBUG_SHOW_GRID") === "1";
	}
	syncTileGridUniforms() {
		let e = this.uniforms.get("uLightGrid");
		e && (e.value = this.tileGrid.gridTexture ?? null);
		let t = this.uniforms.get("uLightIndex");
		t && (t.value = this.tileGrid.indexTexture ?? null);
		let n = this.uniforms.get("uResidual");
		n && (n.value = this.tileGrid.residualTexture ?? null);
		let r = this.uniforms.get("uLightGridSize");
		r && r.value.set(this.tileGrid.gridW, this.tileGrid.gridH);
		let i = this.uniforms.get("uLightIndexTexSize");
		i && i.value.set(this.tileGrid.indexTexW, this.tileGrid.indexTexH);
	}
}, iv = "\n#include <common>\n#include <packing>\n#include \"core/depth\"\n\nuniform sampler2D inputBuffer;\nuniform sampler2D fogLow;\nuniform sampler2D lowDepthBuffer; // RGBA-packed low-res depth (DepthCopyPass)\nuniform sampler2D fullDepthBuffer; // full-res scene depth\nuniform vec2 lowResolution;\nuniform float cameraNear;\nuniform float cameraFar;\n\nvarying vec2 vUv;\n\nfloat depthToViewZ(const float depth) {\n  #ifdef PERSPECTIVE_CAMERA\n  return perspectiveDepthToViewZ(depth, cameraNear, cameraFar);\n  #else\n  return orthographicDepthToViewZ(depth, cameraNear, cameraFar);\n  #endif\n}\n\nfloat readFullViewZ(const vec2 uv) {\n  #if FULL_DEPTH_PACKING == 3201\n  float d = unpackRGBAToDepth(texture2D(fullDepthBuffer, uv));\n  #else\n  float d = texture2D(fullDepthBuffer, uv).r;\n  #endif\n  return depthToViewZ(reverseLogDepth(d, cameraNear, cameraFar));\n}\n\nfloat readLowViewZ(const ivec2 coord) {\n  float d = unpackRGBAToDepth(texelFetch(lowDepthBuffer, coord, 0));\n  return depthToViewZ(reverseLogDepth(d, cameraNear, cameraFar));\n}\n\nvoid main() {\n  vec4 baseTex = texture2D(inputBuffer, vUv);\n\n  float zFull = readFullViewZ(vUv);\n\n  ivec2 lowSize = ivec2(lowResolution);\n  vec2 texelPos = vUv * lowResolution - 0.5;\n  vec2 f = fract(texelPos);\n  ivec2 baseCoord = ivec2(floor(texelPos));\n\n  vec3 acc = vec3(0.0);\n  float weightSum = 0.0;\n  vec3 nearestFog = vec3(0.0);\n  float nearestDiff = 1e20;\n\n  for (int i = 0; i < 4; ++i) {\n    ivec2 offset = ivec2(i & 1, i >> 1);\n    ivec2 coord = clamp(baseCoord + offset, ivec2(0), lowSize - 1);\n    vec3 fog = texelFetch(fogLow, coord, 0).rgb;\n    float zLow = readLowViewZ(coord);\n\n    float bilinear = (offset.x == 0 ? 1.0 - f.x : f.x) *\n                     (offset.y == 0 ? 1.0 - f.y : f.y);\n    // Relative view-depth difference; ~10% depth gap halves the weight.\n    float diff = abs(zLow - zFull) / max(abs(zFull), 1e-3);\n    float weight = bilinear * exp(-diff * 8.0);\n\n    acc += fog * weight;\n    weightSum += weight;\n    if (diff < nearestDiff) {\n      nearestDiff = diff;\n      nearestFog = fog;\n    }\n  }\n\n  // All neighbors rejected (thin silhouette): fall back to the nearest-depth\n  // sample instead of blending across the discontinuity.\n  vec3 fog = weightSum > 1e-4 ? acc / weightSum : nearestFog;\n\n  gl_FragColor = vec4(baseTex.rgb + fog, baseTex.a);\n}\n", av = class extends Tn {
	options;
	inner;
	effect;
	innerCamera;
	lowRT;
	compositeMat;
	resolution;
	constructor(e, t, n) {
		super("FogLightDownsampledPass"), this.effect = t, this.options = n, this.innerCamera = e, this.effect.setFogOnlyOutput(n.downsample > 1), this.inner = new vn(e, t), this.lowRT = new N(1, 1, { depthBuffer: !1 }), this.lowRT.texture.name = "FogLight.Low", this.lowRT.texture.minFilter = T, this.lowRT.texture.magFilter = T, this.lowRT.texture.generateMipmaps = !1, this.compositeMat = new O({
			uniforms: {
				inputBuffer: { value: null },
				fogLow: { value: this.lowRT.texture },
				lowDepthBuffer: { value: t.copiedDepthTexture },
				fullDepthBuffer: { value: null },
				lowResolution: { value: new A(1, 1) },
				cameraNear: { value: e.near },
				cameraFar: { value: e.far }
			},
			defines: { FULL_DEPTH_PACKING: "0" },
			vertexShader: Y_,
			fragmentShader: uo(iv, { core: { depth: Do } }),
			blending: At,
			toneMapped: !1,
			depthWrite: !1,
			depthTest: !1
		}), e instanceof Pt && (this.compositeMat.defines.PERSPECTIVE_CAMERA = "1"), this.fullscreenMaterial = this.compositeMat, this.needsSwap = !0, this.needsDepthTexture = !0;
		let r = Math.max(1, n.downsample ?? 1);
		this.resolution = new Dn(this, Dn.AUTO_SIZE, Dn.AUTO_SIZE, 1 / r), this.resolution.addEventListener("change", () => {
			this.setSize(this.resolution.baseWidth, this.resolution.baseHeight);
		});
	}
	setDepthTexture(e, t) {
		this.inner.setDepthTexture(e, t), this.compositeMat.uniforms.fullDepthBuffer.value = e;
		let n = String(t ?? 0);
		this.compositeMat.defines.FULL_DEPTH_PACKING !== n && (this.compositeMat.defines.FULL_DEPTH_PACKING = n, this.compositeMat.needsUpdate = !0);
	}
	render(e, t, n, r, i) {
		if (this.options.downsample <= 1) {
			this.inner.renderToScreen !== this.renderToScreen && (this.inner.renderToScreen = this.renderToScreen), this.inner.render(e, t, n, r, i);
			return;
		}
		this.inner.renderToScreen && (this.inner.renderToScreen = !1), this.inner.render(e, t, this.lowRT, r, i), this.compositeMat.uniforms.inputBuffer.value = t.texture, this.compositeMat.uniforms.cameraNear.value = this.innerCamera.near, this.compositeMat.uniforms.cameraFar.value = this.innerCamera.far, e.setRenderTarget(this.renderToScreen ? null : n), e.render(this.scene, this.camera);
	}
	setSize(e, t) {
		this.resolution.setBaseSize(e, t);
		let n = this.resolution.width, r = this.resolution.height;
		this.lowRT.setSize(n, r), this.effect.setSize(n, r), this.compositeMat.uniforms.lowResolution.value.set(n, r);
	}
	initialize(e, t, n) {
		this.inner.initialize(e, t, n), this.lowRT.texture.type = n, this.lowRT.texture.colorSpace = bt;
	}
	dispose() {
		super.dispose(), this.lowRT.dispose(), this.compositeMat.dispose(), this.inner.dispose();
	}
	get downsample() {
		return this.options.downsample;
	}
	set downsample(e) {
		let t = Math.max(1, e);
		this.options.downsample = t, this.resolution.scale = 1 / t, this.effect.setFogOnlyOutput(t > 1);
	}
}, ov = {
	...nv,
	enabled: !0,
	downsample: 4
}, sv = class extends m {
	constructor(e, t) {
		let n = {
			...ov,
			...t
		}, r = e, { downsample: i, ...a } = n, o = new rv(r, a), s = new av(r, o, { downsample: i || 1 });
		super(s, o, n);
	}
	setNormalBuffer(e) {
		if (!this.rawEffect) return;
		let t = this.rawEffect.uniforms.get("normalBuffer");
		t && (t.value = e);
	}
	onMounted() {
		this.updateLights(), this.updateFogDensity(), this.updateUseSurfaceLighting();
	}
	updateLights() {
		if (!this.rawEffect) return;
		let e = this.options.lights ?? [], t = e.length;
		this.rawEffect.ensureLightCapacity(t);
		let n = new j(), r = new i();
		for (let a = 0; a < t; a++) {
			let t = e[a];
			n.set(t.position.x, t.position.y, t.position.z);
			let o = t.color instanceof i ? t.color : r.setHex(t.color);
			this.rawEffect.writeLight(a, o, t.intensity, n, t.radius ?? 500);
		}
		n.set(0, 0, 0), r.setRGB(0, 0, 0);
		for (let e = t; e < this.rawEffect.lightCapacity; e++) this.rawEffect.writeLight(e, r, 0, n);
		this.rawEffect.updateLightTextures(), this.rawEffect.defines.set("NUM_FOG_LIGHT", t.toString());
	}
	updateFogDensity() {
		if (!this.rawEffect) return;
		let e = this.rawEffect.uniforms.get("fogDensity");
		e && (e.value = this.options.fogDensity ?? ov.fogDensity);
	}
	get lights() {
		return this.options.lights ?? [];
	}
	set lights(e) {
		this.options.lights = e, this.updateLights(), this.emit("needsUpdate");
	}
	get fogDensity() {
		return this.options.fogDensity ?? ov.fogDensity ?? .1;
	}
	set fogDensity(e) {
		this.options.fogDensity = e, this.updateFogDensity(), this.emit("needsUpdate");
	}
	get useSurfaceLighting() {
		return this.options.useSurfaceLighting ?? ov.useSurfaceLighting ?? !1;
	}
	set useSurfaceLighting(e) {
		this.options.useSurfaceLighting = e, this.updateUseSurfaceLighting(), this.emit("needsUpdate");
	}
	updateUseSurfaceLighting() {
		if (!this.rawEffect) return;
		let e = this.rawEffect.uniforms.get("useSurfaceLighting");
		e && (e.value = this.options.useSurfaceLighting ?? ov.useSurfaceLighting);
	}
	get downsample() {
		return this.raw.downsample;
	}
	set downsample(e) {
		this.raw.downsample = e;
	}
	get maxLightsPerTile() {
		return this.rawEffect.maxLightsPerTile;
	}
	set maxLightsPerTile(e) {
		this.rawEffect.maxLightsPerTile = e, this.emit("needsUpdate");
	}
	get extentScale() {
		return this.rawEffect.extentScale;
	}
	set extentScale(e) {
		this.rawEffect.extentScale = e, this.emit("needsUpdate");
	}
	get maxFar() {
		return this.rawEffect.maxFar;
	}
	set maxFar(e) {
		this.rawEffect.maxFar = e, this.emit("needsUpdate");
	}
	get haloFalloff() {
		return this.rawEffect.haloFalloff;
	}
	set haloFalloff(e) {
		this.rawEffect.haloFalloff = e, this.emit("needsUpdate");
	}
	get debugShowGrid() {
		return this.rawEffect.debugShowGrid;
	}
	set debugShowGrid(e) {
		this.rawEffect.debugShowGrid = e, this.emit("needsUpdate");
	}
}, cv = "#include \"core/depth\"\n#include \"core/turbo\"\n\nuniform float near;\nuniform float far;\n\nvoid mainImage(const vec4 inputColor, const vec2 uv, out vec4 outputColor) {\n  float depth = readDepthValue(depthBuffer, uv);\n  depth = reverseLogDepth(depth, cameraNear, cameraFar);\n  depth = linearizeDepth(depth, near, far) / far;\n\n  #ifdef USE_TURBO\n  vec3 color = turbo(1.0 - depth);\n  #else // USE_TURBO\n  vec3 color = vec3(depth);\n  #endif // USE_TURBO\n\n  outputColor = vec4(color, inputColor.a);\n}\n", lv = Object.defineProperty, uv = (e, t, n, r) => {
	for (var i = void 0, a = e.length - 1, o; a >= 0; a--) (o = e[a]) && (i = o(t, n, i) || i);
	return i && lv(t, n, i), i;
}, dv = {
	blendFunction: fn.SRC,
	useTurbo: !1,
	near: 1,
	far: 1e3
}, fv = class extends gn {
	constructor(e) {
		let { blendFunction: t, useTurbo: n, near: r, far: i } = {
			...dv,
			...e
		};
		super("DepthEffect", uo(cv, { core: {
			depth: Do,
			turbo: Po
		} }), {
			blendFunction: t,
			attributes: _n.DEPTH,
			uniforms: new Map(Object.entries({
				near: new k(r),
				far: new k(i)
			}))
		}), this.useTurbo = n;
	}
	get near() {
		return this.uniforms.get("near").value;
	}
	set near(e) {
		this.uniforms.get("near").value = e;
	}
	get far() {
		return this.uniforms.get("far").value;
	}
	set far(e) {
		this.uniforms.get("far").value = e;
	}
};
uv([H("USE_TURBO")], fv.prototype, "useTurbo"), fn.NORMAL;
var pv = "#include <common>\n\nuniform sampler2D inputBuffer;\n\nuniform float thresholdLevel;\nuniform float thresholdRange;\n\nin vec2 vCenterUv1;\nin vec2 vCenterUv2;\nin vec2 vCenterUv3;\nin vec2 vCenterUv4;\nin vec2 vRowUv1;\nin vec2 vRowUv2;\nin vec2 vRowUv3;\nin vec2 vRowUv4;\nin vec2 vRowUv5;\nin vec2 vRowUv6;\nin vec2 vRowUv7;\nin vec2 vRowUv8;\nin vec2 vRowUv9;\n\nfloat clampToBorder(const vec2 uv) {\n  return float(uv.x >= 0.0 && uv.x <= 1.0 && uv.y >= 0.0 && uv.y <= 1.0);\n}\n\n// Reference: https://learnopengl.com/Guest-Articles/2022/Phys.-Based-Bloom\nvoid main() {\n  vec3 color = 0.125 * texture(inputBuffer, vec2(vRowUv5)).rgb;\n  vec4 weight =\n    0.03125 *\n    vec4(\n      clampToBorder(vRowUv1),\n      clampToBorder(vRowUv3),\n      clampToBorder(vRowUv7),\n      clampToBorder(vRowUv9)\n    );\n  color += weight.x * texture(inputBuffer, vec2(vRowUv1)).rgb;\n  color += weight.y * texture(inputBuffer, vec2(vRowUv3)).rgb;\n  color += weight.z * texture(inputBuffer, vec2(vRowUv7)).rgb;\n  color += weight.w * texture(inputBuffer, vec2(vRowUv9)).rgb;\n\n  weight =\n    0.0625 *\n    vec4(\n      clampToBorder(vRowUv2),\n      clampToBorder(vRowUv4),\n      clampToBorder(vRowUv6),\n      clampToBorder(vRowUv8)\n    );\n  color += weight.x * texture(inputBuffer, vec2(vRowUv2)).rgb;\n  color += weight.y * texture(inputBuffer, vec2(vRowUv4)).rgb;\n  color += weight.z * texture(inputBuffer, vec2(vRowUv6)).rgb;\n  color += weight.w * texture(inputBuffer, vec2(vRowUv8)).rgb;\n\n  weight =\n    0.125 *\n    vec4(\n      clampToBorder(vRowUv2),\n      clampToBorder(vRowUv4),\n      clampToBorder(vRowUv6),\n      clampToBorder(vRowUv8)\n    );\n  color += weight.x * texture(inputBuffer, vec2(vCenterUv1)).rgb;\n  color += weight.y * texture(inputBuffer, vec2(vCenterUv2)).rgb;\n  color += weight.z * texture(inputBuffer, vec2(vCenterUv3)).rgb;\n  color += weight.w * texture(inputBuffer, vec2(vCenterUv4)).rgb;\n\n  // WORKAROUND: Avoid screen flashes if the input buffer contains NaN texels.\n  // See: https://github.com/takram-design-engineering/three-geospatial/issues/7\n  if (any(isnan(color))) {\n    gl_FragColor = vec4(vec3(0.0), 1.0);\n    return;\n  }\n\n  float l = luminance(color);\n  float scale = saturate(smoothstep(thresholdLevel, thresholdLevel + thresholdRange, l));\n  gl_FragColor = vec4(color * scale, 1.0);\n}\n", mv = "uniform vec2 texelSize;\n\nout vec2 vCenterUv1;\nout vec2 vCenterUv2;\nout vec2 vCenterUv3;\nout vec2 vCenterUv4;\nout vec2 vRowUv1;\nout vec2 vRowUv2;\nout vec2 vRowUv3;\nout vec2 vRowUv4;\nout vec2 vRowUv5;\nout vec2 vRowUv6;\nout vec2 vRowUv7;\nout vec2 vRowUv8;\nout vec2 vRowUv9;\n\nvoid main() {\n  vec2 uv = position.xy * 0.5 + 0.5;\n  vCenterUv1 = uv + texelSize * vec2(-1.0, 1.0);\n  vCenterUv2 = uv + texelSize * vec2(1.0, 1.0);\n  vCenterUv3 = uv + texelSize * vec2(-1.0, -1.0);\n  vCenterUv4 = uv + texelSize * vec2(1.0, -1.0);\n  vRowUv1 = uv + texelSize * vec2(-2.0, 2.0);\n  vRowUv2 = uv + texelSize * vec2(0.0, 2.0);\n  vRowUv3 = uv + texelSize * vec2(2.0, 2.0);\n  vRowUv4 = uv + texelSize * vec2(-2.0, 0.0);\n  vRowUv5 = uv + texelSize;\n  vRowUv6 = uv + texelSize * vec2(2.0, 0.0);\n  vRowUv7 = uv + texelSize * vec2(-2.0, -2.0);\n  vRowUv8 = uv + texelSize * vec2(0.0, -2.0);\n  vRowUv9 = uv + texelSize * vec2(2.0, -2.0);\n\n  gl_Position = vec4(position.xy, 1.0, 1.0);\n}\n", hv = {
	thresholdLevel: 10,
	thresholdRange: 1
}, gv = class extends O {
	constructor(e) {
		let { inputBuffer: t = null, thresholdLevel: n, thresholdRange: r, ...i } = {
			...hv,
			...e
		};
		super({
			name: "DownsampleThresholdMaterial",
			fragmentShader: pv,
			vertexShader: mv,
			blending: At,
			toneMapped: !1,
			depthWrite: !1,
			depthTest: !1,
			...i,
			uniforms: {
				inputBuffer: new k(t),
				texelSize: new k(new A()),
				thresholdLevel: new k(n),
				thresholdRange: new k(r),
				...i.uniforms
			}
		});
	}
	setSize(e, t) {
		this.uniforms.texelSize.value.set(1 / e, 1 / t);
	}
	get inputBuffer() {
		return this.uniforms.inputBuffer.value;
	}
	set inputBuffer(e) {
		this.uniforms.inputBuffer.value = e;
	}
	get thresholdLevel() {
		return this.uniforms.thresholdLevel.value;
	}
	set thresholdLevel(e) {
		this.uniforms.thresholdLevel.value = e;
	}
	get thresholdRange() {
		return this.uniforms.thresholdRange.value;
	}
	set thresholdRange(e) {
		this.uniforms.thresholdRange.value = e;
	}
}, _v = "#include <common>\n\n#define SQRT_2 0.7071067811865476\n\nuniform sampler2D inputBuffer;\n\nuniform vec2 texelSize;\nuniform float ghostAmount;\nuniform float haloAmount;\nuniform float chromaticAberration;\n\nin vec2 vUv;\nin vec2 vAspectRatio;\n\nvec3 sampleGhost(const vec2 direction, const vec3 color, const float offset) {\n  vec2 suv = clamp(1.0 - vUv + direction * offset, 0.0, 1.0);\n  vec3 result = texture(inputBuffer, suv).rgb * color;\n\n  // Falloff at the perimeter.\n  float d = clamp(length(0.5 - suv) / (0.5 * SQRT_2), 0.0, 1.0);\n  result *= pow(1.0 - d, 3.0);\n  return result;\n}\n\nvec4 sampleGhosts(float amount) {\n  vec3 color = vec3(0.0);\n  vec2 direction = vUv - 0.5;\n  color += sampleGhost(direction, vec3(0.8, 0.8, 1.0), -5.0);\n  color += sampleGhost(direction, vec3(1.0, 0.8, 0.4), -1.5);\n  color += sampleGhost(direction, vec3(0.9, 1.0, 0.8), -0.4);\n  color += sampleGhost(direction, vec3(1.0, 0.8, 0.4), -0.2);\n  color += sampleGhost(direction, vec3(0.9, 0.7, 0.7), -0.1);\n  color += sampleGhost(direction, vec3(0.5, 1.0, 0.4), 0.7);\n  color += sampleGhost(direction, vec3(0.5, 0.5, 0.5), 1.0);\n  color += sampleGhost(direction, vec3(1.0, 1.0, 0.6), 2.5);\n  color += sampleGhost(direction, vec3(0.5, 0.8, 1.0), 10.0);\n  return vec4(color * amount, 1.0);\n}\n\n// Reference: https://john-chapman.github.io/2017/11/05/pseudo-lens-flare.html\nfloat cubicRingMask(const float x, const float radius, const float thickness) {\n  float v = min(abs(x - radius) / thickness, 1.0);\n  return 1.0 - v * v * (3.0 - 2.0 * v);\n}\n\nvec3 sampleHalo(const float radius) {\n  vec2 direction = normalize((vUv - 0.5) / vAspectRatio) * vAspectRatio;\n  vec3 offset = vec3(texelSize.x * chromaticAberration) * vec3(-1.0, 0.0, 1.0);\n  vec2 suv = fract(1.0 - vUv + direction * radius);\n  vec3 result = vec3(\n    texture(inputBuffer, suv + direction * offset.r).r,\n    texture(inputBuffer, suv + direction * offset.g).g,\n    texture(inputBuffer, suv + direction * offset.b).b\n  );\n\n  // Falloff at the center and perimeter.\n  vec2 wuv = (vUv - vec2(0.5, 0.0)) / vAspectRatio + vec2(0.5, 0.0);\n  float d = saturate(distance(wuv, vec2(0.5)));\n  result *= cubicRingMask(d, 0.45, 0.25);\n  return result;\n}\n\nvec4 sampleHalos(const float amount) {\n  vec3 color = vec3(0.0);\n  color += sampleHalo(0.3);\n  return vec4(color, 1.0) * amount;\n}\n\nvoid main() {\n  gl_FragColor += sampleGhosts(ghostAmount);\n  gl_FragColor += sampleHalos(haloAmount);\n}\n\n", vv = "uniform vec2 texelSize;\n\nout vec2 vUv;\nout vec2 vAspectRatio;\n\nvoid main() {\n  vUv = position.xy * 0.5 + 0.5;\n  vAspectRatio = vec2(texelSize.x / texelSize.y, 1.0);\n  gl_Position = vec4(position.xy, 1.0, 1.0);\n}\n", yv = {
	ghostAmount: .001,
	haloAmount: .001,
	chromaticAberration: 10
}, bv = class extends O {
	constructor(e) {
		let { inputBuffer: t = null, ghostAmount: n, haloAmount: r, chromaticAberration: i, ...a } = {
			...yv,
			...e
		};
		super({
			name: "LensFlareFeaturesMaterial",
			fragmentShader: _v,
			vertexShader: vv,
			blending: At,
			toneMapped: !1,
			depthWrite: !1,
			depthTest: !1,
			uniforms: {
				inputBuffer: new k(t),
				texelSize: new k(new A()),
				ghostAmount: new k(n),
				haloAmount: new k(r),
				chromaticAberration: new k(i),
				...a.uniforms
			}
		});
	}
	setSize(e, t) {
		this.uniforms.texelSize.value.set(1 / e, 1 / t);
	}
	get inputBuffer() {
		return this.uniforms.inputBuffer.value;
	}
	set inputBuffer(e) {
		this.uniforms.inputBuffer.value = e;
	}
	get ghostAmount() {
		return this.uniforms.ghostAmount.value;
	}
	set ghostAmount(e) {
		this.uniforms.ghostAmount.value = e;
	}
	get haloAmount() {
		return this.uniforms.haloAmount.value;
	}
	set haloAmount(e) {
		this.uniforms.haloAmount.value = e;
	}
	get chromaticAberration() {
		return this.uniforms.chromaticAberration.value;
	}
	set chromaticAberration(e) {
		this.uniforms.chromaticAberration.value = e;
	}
}, xv = "uniform sampler2D bloomBuffer;\nuniform sampler2D featuresBuffer;\nuniform float intensity;\n\nvoid mainImage(const vec4 inputColor, const vec2 uv, out vec4 outputColor) {\n  vec3 bloom = texture(bloomBuffer, uv).rgb;\n  vec3 features = texture(featuresBuffer, uv).rgb;\n  outputColor = vec4(inputColor.rgb + (bloom + features) * intensity, inputColor.a);\n}\n", Sv = {
	blendFunction: fn.NORMAL,
	resolutionScale: .5,
	width: Dn.AUTO_SIZE,
	height: Dn.AUTO_SIZE,
	intensity: .005
}, Cv = class extends gn {
	constructor(e) {
		let { blendFunction: t, resolutionScale: n, width: r, height: i, resolutionX: a = r, resolutionY: o = i, intensity: s } = {
			...Sv,
			...e
		};
		super("LensFlareEffect", xv, {
			blendFunction: t,
			attributes: _n.CONVOLUTION,
			uniforms: new Map(Object.entries({
				bloomBuffer: new k(null),
				featuresBuffer: new k(null),
				intensity: new k(1)
			}))
		}), this.onResolutionChange = () => {
			this.setSize(this.resolution.baseWidth, this.resolution.baseHeight);
		}, this.renderTarget1 = new N(1, 1, {
			depthBuffer: !1,
			type: ot
		}), this.renderTarget1.texture.name = "LensFlare.Target1", this.renderTarget2 = new N(1, 1, {
			depthBuffer: !1,
			type: ot
		}), this.renderTarget2.texture.name = "LensFlare.Target2", this.thresholdMaterial = new gv(), this.thresholdPass = new An(this.thresholdMaterial), this.blurPass = new wn(), this.blurPass.levels = 8, this.preBlurPass = new bn({ kernelSize: xn.SMALL }), this.featuresMaterial = new bv(), this.featuresPass = new An(this.featuresMaterial), this.uniforms.get("bloomBuffer").value = this.blurPass.texture, this.uniforms.get("featuresBuffer").value = this.renderTarget1.texture, this.resolution = new Dn(this, a, o, n), this.resolution.addEventListener("change", this.onResolutionChange), this.intensity = s;
	}
	initialize(e, t, n) {
		this.thresholdPass.initialize(e, t, n), this.blurPass.initialize(e, t, n), this.preBlurPass.initialize(e, t, n), this.featuresPass.initialize(e, t, n);
	}
	update(e, t, n) {
		this.thresholdPass.render(e, t, this.renderTarget1), this.blurPass.render(e, this.renderTarget1, null), this.preBlurPass.render(e, this.renderTarget1, this.renderTarget2), this.featuresPass.render(e, this.renderTarget2, this.renderTarget1);
	}
	setSize(e, t) {
		let n = this.resolution;
		n.setBaseSize(e, t);
		let { width: r, height: i } = n;
		this.renderTarget1.setSize(r, i), this.renderTarget2.setSize(r, i), this.thresholdMaterial.setSize(r, i), this.blurPass.setSize(r, i), this.preBlurPass.setSize(r, i), this.featuresMaterial.setSize(r, i);
	}
	get intensity() {
		return this.uniforms.get("intensity").value;
	}
	set intensity(e) {
		this.uniforms.get("intensity").value = e;
	}
	get thresholdLevel() {
		return this.thresholdMaterial.thresholdLevel;
	}
	set thresholdLevel(e) {
		this.thresholdMaterial.thresholdLevel = e;
	}
	get thresholdRange() {
		return this.thresholdMaterial.thresholdRange;
	}
	set thresholdRange(e) {
		this.thresholdMaterial.thresholdRange = e;
	}
}, wv = "#include \"core/depth\"\n#include \"core/packing\"\n#include \"core/transform\"\n\nuniform highp sampler2D normalBuffer;\n\nuniform mat4 projectionMatrix;\nuniform mat4 inverseProjectionMatrix;\n\nvec3 reconstructNormal(const vec2 uv) {\n  float depth = readDepthValue(depthBuffer, uv);\n  depth = reverseLogDepth(depth, cameraNear, cameraFar);\n  vec3 position = screenToView(\n    uv,\n    depth,\n    getViewZ(depth),\n    projectionMatrix,\n    inverseProjectionMatrix\n  );\n  vec3 dx = dFdx(position);\n  vec3 dy = dFdy(position);\n  return normalize(cross(dx, dy));\n}\n\nvec3 readNormal(const vec2 uv) {\n  #ifdef OCT_ENCODED\n  return unpackVec2ToNormal(texture(normalBuffer, uv).xy);\n  #else // OCT_ENCODED\n  return 2.0 * texture(normalBuffer, uv).xyz - 1.0;\n  #endif // OCT_ENCODED\n}\n\nvoid mainImage(const vec4 inputColor, const vec2 uv, out vec4 outputColor) {\n  #ifdef RECONSTRUCT_FROM_DEPTH\n  vec3 normal = reconstructNormal(uv);\n  #else // RECONSTRUCT_FROM_DEPTH\n  vec3 normal = readNormal(uv);\n  #endif // RECONSTRUCT_FROM_DEPTH\n\n  outputColor = vec4(normal * 0.5 + 0.5, inputColor.a);\n}\n", Tv = Object.defineProperty, Ev = (e, t, n, r) => {
	for (var i = void 0, a = e.length - 1, o; a >= 0; a--) (o = e[a]) && (i = o(t, n, i) || i);
	return i && Tv(t, n, i), i;
}, Dv = {
	blendFunction: fn.SRC,
	octEncoded: !1,
	reconstructFromDepth: !1
}, Ov = class extends gn {
	constructor(e, t) {
		let { blendFunction: n, normalBuffer: r = null, octEncoded: i, reconstructFromDepth: a } = {
			...Dv,
			...t
		};
		super("NormalEffect", uo(wv, { core: {
			depth: Do,
			packing: jo,
			transform: No
		} }), {
			blendFunction: n,
			attributes: _n.DEPTH,
			uniforms: new Map(Object.entries({
				normalBuffer: new k(r),
				projectionMatrix: new k(new E()),
				inverseProjectionMatrix: new k(new E())
			}))
		}), this.camera = e, e != null && (this.mainCamera = e), this.octEncoded = i, this.reconstructFromDepth = a;
	}
	get mainCamera() {
		return this.camera;
	}
	set mainCamera(e) {
		this.camera = e;
	}
	update(e, t, n) {
		let r = this.uniforms, i = r.get("projectionMatrix"), a = r.get("inverseProjectionMatrix"), o = this.camera;
		o != null && (i.value.copy(o.projectionMatrix), a.value.copy(o.projectionMatrixInverse));
	}
	get normalBuffer() {
		return this.uniforms.get("normalBuffer").value;
	}
	set normalBuffer(e) {
		this.uniforms.get("normalBuffer").value = e;
	}
};
Ev([H("OCT_ENCODED")], Ov.prototype, "octEncoded"), Ev([H("RECONSTRUCT_FROM_DEPTH")], Ov.prototype, "reconstructFromDepth");
//#endregion
//#region src/effects/lensFlare.ts
var kv = {
	enabled: !1,
	intensity: Sv.intensity
}, Av = class extends s {
	constructor(e, t) {
		super(e, new Cv(), t);
	}
	onMounted() {
		this.rawEffect && (this.rawEffect.intensity = this.intensity);
	}
	get intensity() {
		return this.options.intensity ?? kv.intensity;
	}
	set intensity(e) {
		this.options.intensity !== e && (this.options.intensity = e, this.rawEffect && (this.rawEffect.intensity = e, this.emit("needsUpdate")));
	}
}, jv = "//ref: Reference URL https://www.shadertoy.com/view/MlfBWr\n\n// ============================================================================\n// Uniforms\n// ============================================================================\nuniform float time;\nuniform vec2 resolution;\nuniform float dropGridSize;\nuniform float dropDensity;\nuniform float dropLayers;\nuniform float dropSizeFactor;\nuniform float noiseScale;\nuniform float refractionStrength;\nuniform float minDropStrength;\nuniform float dropFadeStart;\nuniform float dropFadeEnd;\nuniform float dropThresholdFactor;\nuniform float gridDensityLow;\nuniform float gridDensityHigh;\nuniform float jitterStrengthLow;\nuniform float jitterStrengthHigh;\n\n// ============================================================================\n// Constants\n// ============================================================================\nconst float TWO_PI = 6.28318530718;\nconst float MAX_DROP_LAYERS = 6.0;        // Upper bound for dynamic layer count\nconst float MIN_FADE_GAP = 0.01;          // Prevents fade range collapse\n\n// ============================================================================\n// Helper Functions\n// ============================================================================\n\n// Pseudo-random number generation (returns vec2)\nvec2 rand(vec2 c) {\n  return fract(sin(vec2(\n    dot(c, vec2(12.9898, 78.233)),\n    dot(c, vec2(0.16180, 0.31415))\n  )) * vec2(43758.5453, 14142.1));\n}\n\n// Value noise generation (bilinear interpolation)\nvec2 noise(vec2 p) {\n  vec2 co = floor(p);\n  vec2 mu = fract(p);\n  // Smoothstep interpolation curve\n  mu = 3.0 * mu * mu - 2.0 * mu * mu * mu;\n  \n  // Get random values at the four corners of the grid\n  vec2 a = rand(co);\n  vec2 b = rand(co + vec2(1.0, 0.0));\n  vec2 c = rand(co + vec2(0.0, 1.0));\n  vec2 d = rand(co + vec2(1.0, 1.0));\n  \n  // Bilinear interpolation\n  return mix(mix(a, b, mu.x), mix(c, d, mu.x), mu.y);\n}\n\n// Calculate drop shape (approximate circle using sum of sine waves)\nfloat calculateDropShape(vec2 sinWave, float timeSec, vec4 dropProperties) {\n  // Sum of sine waves (maximum at center, minimum at edges)\n  float shape = sinWave.x + sinWave.y;\n  \n  // Fade out over time\n  float life = 1.0 - fract(timeSec * (dropProperties.b + 0.1) + dropProperties.g) * 2.0;\n  float fade = max(0.0, life);\n  \n  return shape * fade;\n}\n\n// Calculate drop display strength\nfloat calculateDropStrength(float dropShape, float layerIndex, float randomValue) {\n  // Drop display probability (varies by layer)\n  float baseThreshold = (5.0 - layerIndex) * dropThresholdFactor;\n\n  // Density curve: <1.0 tightens threshold, >1.0 loosens it\n  float densityNorm = clamp(dropDensity, 0.0, 2.0);\n  float lowRange = clamp(1.0 - densityNorm, 0.0, 1.0);\n  float highRange = clamp(densityNorm - 1.0, 0.0, 1.0);\n  float densityScale = mix(1.0, 0.35, lowRange);\n  densityScale = mix(densityScale, 1.5, highRange);\n\n  // Keep large drops slightly easier to spawn when thinning\n  float effectiveLayers = max(dropLayers, 1.0);\n  float layerBias = mix(0.6, 1.0, layerIndex / effectiveLayers);\n  float threshold = clamp(baseThreshold * densityScale * layerBias, 0.0, 0.95);\n\n  float probability = smoothstep(threshold + 0.05, threshold - 0.05, randomValue);\n  \n  // Calculate strength (with fade in/out)\n  float fadeStart = clamp(dropFadeStart, 0.0, 1.0 - MIN_FADE_GAP);\n  float minFadeEnd = fadeStart + MIN_FADE_GAP;\n  float fadeEnd = clamp(dropFadeEnd, minFadeEnd, 1.0);\n  float strength = smoothstep(fadeStart, fadeEnd, dropShape);\n  \n  return strength * probability;\n}\n\n// Calculate drop normal vector\nvec3 calculateDropNormal(vec2 sinWave, float dropShape) {\n  // XY components: derivative of sine wave (slope)\n  vec2 normalXY = cos(sinWave);\n  \n  // Z component: drop thickness (thick at center, thin at edges)\n  float normalZ = mix(0.2, 2.0, dropShape - 0.5);\n  \n  // Normalize and return the normal vector\n  return normalize(-vec3(normalXY, normalZ));\n}\n\n// Apply refraction effect\nvec4 applyRefraction(vec2 uv, vec3 dropNormal, float dropStrength) {\n  // Distort UV coordinates (in normal direction)\n  vec2 refractedUV = uv - dropNormal.xy * refractionStrength * dropStrength;\n  \n  // Sample background at distorted UV coordinates\n  return texture2D(inputBuffer, refractedUV);\n}\n\n// ============================================================================\n// Main Shader\n// ============================================================================\nvoid mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {\n  // Calculate time (convert milliseconds to seconds)\n  float timeSec = time * 0.001;\n  \n  // Position displacement by noise (randomize drop positions)\n  vec2 normalizedUV = (uv * 0.1) / (resolution / resolution.x);\n  vec2 displacement = noise(normalizedUV * noiseScale);\n  \n  // Final color (initial value is input color)\n  vec4 finalColor = inputColor;\n  \n  // Generate drops in multiple layers (from large to small)\n  float layerCount = clamp(floor(dropLayers + 0.5), 1.0, MAX_DROP_LAYERS);\n\n  for (float layerIndex = MAX_DROP_LAYERS; layerIndex > 0.0; layerIndex -= 1.0) {\n    if (layerIndex > layerCount) {\n      continue;\n    }\n    // Calculate drop grid size\n    float densityNorm = clamp(dropDensity, 0.0, 2.0);\n    float gridDensityAdjust = mix(gridDensityLow, 1.0, clamp(densityNorm, 0.0, 1.0));\n    gridDensityAdjust = mix(gridDensityAdjust, gridDensityHigh, clamp(densityNorm - 1.0, 0.0, 1.0));\n    vec2 gridSize = resolution * layerIndex * dropSizeFactor * (dropGridSize / 12.0) * gridDensityAdjust;\n    \n    // Calculate sine wave phase (including position displacement by noise)\n    vec2 phase = TWO_PI * uv * gridSize + (displacement - 0.5) * 2.0;\n    vec2 sinWave = sin(phase);\n    \n    // Current drop coordinates (rounded to grid)\n    vec2 baseDropCoord = round(uv * gridSize - 0.25) / gridSize;\n    float jitterStrength = mix(jitterStrengthLow, jitterStrengthHigh, clamp(densityNorm, 0.0, 1.0));\n    vec2 jitter = (noise(baseDropCoord * (noiseScale * 0.37)) - 0.5) * jitterStrength / gridSize;\n    vec2 dropCoord = baseDropCoord + jitter;\n    \n    // Drop properties (get four random values)\n    vec4 dropProperties = vec4(noise(dropCoord * noiseScale), noise(dropCoord));\n    \n    // Calculate drop shape\n    float dropShape = calculateDropShape(sinWave, timeSec, dropProperties);\n    \n    // Calculate drop display strength\n    float dropStrength = calculateDropStrength(dropShape, layerIndex, dropProperties.r);\n    \n    // Apply refraction effect if strength is sufficient\n    if (dropStrength > minDropStrength) {\n      // Calculate normal vector\n      vec3 dropNormal = calculateDropNormal(phase, dropShape);\n      \n      // Apply refraction effect and get color\n      finalColor = applyRefraction(uv, dropNormal, dropStrength);\n    }\n  }\n  \n  // Output final color\n  outputColor = finalColor;\n}\n", Y = {
	opacity: 1,
	dropGridSize: 12,
	dropDensity: 1,
	dropLayers: 4,
	dropSizeFactor: .015,
	noiseScale: 200,
	refractionStrength: .3,
	minDropStrength: .01,
	dropFadeStart: .3,
	dropFadeEnd: .8,
	dropThresholdFactor: .08,
	gridDensityLow: 1.15,
	gridDensityHigh: .85,
	jitterStrengthLow: .45,
	jitterStrengthHigh: .08
}, Mv = class extends gn {
	dropGridSizeUniform;
	dropDensityUniform;
	dropLayersUniform;
	dropSizeFactorUniform;
	noiseScaleUniform;
	refractionStrengthUniform;
	minDropStrengthUniform;
	dropFadeStartUniform;
	dropFadeEndUniform;
	dropThresholdFactorUniform;
	gridDensityLowUniform;
	gridDensityHighUniform;
	jitterStrengthLowUniform;
	jitterStrengthHighUniform;
	constructor(e = {}) {
		let t = new k(Y.dropGridSize), n = new k(Y.dropDensity), r = new k(Y.dropLayers), i = new k(Y.dropSizeFactor), a = new k(Y.noiseScale), o = new k(Y.refractionStrength), s = new k(Y.minDropStrength), c = new k(Y.dropFadeStart), l = new k(Y.dropFadeEnd), u = new k(Y.dropThresholdFactor), d = new k(Y.gridDensityLow), f = new k(Y.gridDensityHigh), p = new k(Y.jitterStrengthLow), m = new k(Y.jitterStrengthHigh), h = /* @__PURE__ */ new Map([
			["time", new k(0)],
			["resolution", new k(new A())],
			["dropGridSize", t],
			["dropDensity", n],
			["dropLayers", r],
			["dropSizeFactor", i],
			["noiseScale", a],
			["refractionStrength", o],
			["minDropStrength", s],
			["dropFadeStart", c],
			["dropFadeEnd", l],
			["dropThresholdFactor", u],
			["gridDensityLow", d],
			["gridDensityHigh", f],
			["jitterStrengthLow", p],
			["jitterStrengthHigh", m]
		]);
		super("RainDropPostEffect", jv, {
			uniforms: h,
			blendFunction: fn.NORMAL
		}), this.dropGridSizeUniform = t, this.dropDensityUniform = n, this.dropLayersUniform = r, this.dropSizeFactorUniform = i, this.noiseScaleUniform = a, this.refractionStrengthUniform = o, this.minDropStrengthUniform = s, this.dropFadeStartUniform = c, this.dropFadeEndUniform = l, this.dropThresholdFactorUniform = u, this.gridDensityLowUniform = d, this.gridDensityHighUniform = f, this.jitterStrengthLowUniform = p, this.jitterStrengthHighUniform = m, this.dropGridSize = e.dropGridSize ?? Y.dropGridSize, this.dropDensity = e.dropDensity ?? Y.dropDensity, this.dropLayers = e.dropLayers ?? Y.dropLayers, this.dropSizeFactor = e.dropSizeFactor ?? Y.dropSizeFactor, this.noiseScale = e.noiseScale ?? Y.noiseScale, this.refractionStrength = e.refractionStrength ?? Y.refractionStrength, this.minDropStrength = e.minDropStrength ?? Y.minDropStrength, this.dropFadeStart = e.dropFadeStart ?? Y.dropFadeStart, this.dropFadeEnd = e.dropFadeEnd ?? Y.dropFadeEnd, this.dropThresholdFactor = e.dropThresholdFactor ?? Y.dropThresholdFactor, this.gridDensityLow = e.gridDensityLow ?? Y.gridDensityLow, this.gridDensityHigh = e.gridDensityHigh ?? Y.gridDensityHigh, this.jitterStrengthLow = e.jitterStrengthLow ?? Y.jitterStrengthLow, this.jitterStrengthHigh = e.jitterStrengthHigh ?? Y.jitterStrengthHigh, this.blendMode.opacity.value = e.opacity ?? Y.opacity;
	}
	setSize(e, t) {
		let n = this.uniforms.get("resolution");
		n && n.value.set(e, t);
	}
	updateTime(e) {
		let t = this.uniforms.get("time");
		t && (t.value = e);
	}
	set dropGridSize(e) {
		this.dropGridSizeUniform.value = e;
	}
	get dropGridSize() {
		return this.dropGridSizeUniform.value;
	}
	set dropDensity(e) {
		this.dropDensityUniform.value = e;
	}
	get dropDensity() {
		return this.dropDensityUniform.value;
	}
	set dropLayers(e) {
		this.dropLayersUniform.value = e;
	}
	get dropLayers() {
		return this.dropLayersUniform.value;
	}
	set dropSizeFactor(e) {
		this.dropSizeFactorUniform.value = e;
	}
	get dropSizeFactor() {
		return this.dropSizeFactorUniform.value;
	}
	set noiseScale(e) {
		this.noiseScaleUniform.value = e;
	}
	get noiseScale() {
		return this.noiseScaleUniform.value;
	}
	set refractionStrength(e) {
		this.refractionStrengthUniform.value = e;
	}
	get refractionStrength() {
		return this.refractionStrengthUniform.value;
	}
	set minDropStrength(e) {
		this.minDropStrengthUniform.value = e;
	}
	get minDropStrength() {
		return this.minDropStrengthUniform.value;
	}
	set dropFadeStart(e) {
		this.dropFadeStartUniform.value = e;
	}
	get dropFadeStart() {
		return this.dropFadeStartUniform.value;
	}
	set dropFadeEnd(e) {
		this.dropFadeEndUniform.value = e;
	}
	get dropFadeEnd() {
		return this.dropFadeEndUniform.value;
	}
	set dropThresholdFactor(e) {
		this.dropThresholdFactorUniform.value = e;
	}
	get dropThresholdFactor() {
		return this.dropThresholdFactorUniform.value;
	}
	set gridDensityLow(e) {
		this.gridDensityLowUniform.value = e;
	}
	get gridDensityLow() {
		return this.gridDensityLowUniform.value;
	}
	set gridDensityHigh(e) {
		this.gridDensityHighUniform.value = e;
	}
	get gridDensityHigh() {
		return this.gridDensityHighUniform.value;
	}
	set jitterStrengthLow(e) {
		this.jitterStrengthLowUniform.value = e;
	}
	get jitterStrengthLow() {
		return this.jitterStrengthLowUniform.value;
	}
	set jitterStrengthHigh(e) {
		this.jitterStrengthHighUniform.value = e;
	}
	get jitterStrengthHigh() {
		return this.jitterStrengthHighUniform.value;
	}
}, Nv = {
	...Y,
	enabled: !0
}, Pv = class extends s {
	constructor(e, t) {
		let n = {
			...Nv,
			...t
		};
		super(e, new Mv(n), n);
		let r = n.dropGridSize ?? Y.dropGridSize, i = n.dropDensity ?? Y.dropDensity, a = n.dropLayers ?? Y.dropLayers, o = n.dropSizeFactor ?? Y.dropSizeFactor, s = n.noiseScale ?? Y.noiseScale, c = n.refractionStrength ?? Y.refractionStrength, l = n.minDropStrength ?? Y.minDropStrength, u = n.dropFadeStart ?? Y.dropFadeStart, d = n.dropFadeEnd ?? Y.dropFadeEnd, f = n.dropThresholdFactor ?? Y.dropThresholdFactor, p = n.gridDensityLow ?? Y.gridDensityLow, m = n.gridDensityHigh ?? Y.gridDensityHigh, h = n.jitterStrengthLow ?? Y.jitterStrengthLow, g = n.jitterStrengthHigh ?? Y.jitterStrengthHigh;
		this.rawEffect.dropGridSize = r, this.rawEffect.dropDensity = i, this.rawEffect.dropLayers = a, this.rawEffect.dropSizeFactor = o, this.rawEffect.noiseScale = s, this.rawEffect.refractionStrength = c, this.rawEffect.minDropStrength = l, this.rawEffect.dropFadeStart = u, this.rawEffect.dropFadeEnd = d, this.rawEffect.dropThresholdFactor = f, this.rawEffect.gridDensityLow = p, this.rawEffect.gridDensityHigh = m, this.rawEffect.jitterStrengthLow = h, this.rawEffect.jitterStrengthHigh = g;
	}
	onMounted() {}
	update(e) {
		this.rawEffect && this.rawEffect.updateTime(e);
	}
	get opacity() {
		return this.options.opacity ?? Y.opacity;
	}
	set opacity(e) {
		this.options.opacity = e, this.rawEffect.blendMode.opacity.value = e, this.emit("needsUpdate");
	}
	get dropGridSize() {
		return this.options.dropGridSize ?? Y.dropGridSize;
	}
	set dropGridSize(e) {
		this.options.dropGridSize = e, this.rawEffect.dropGridSize = e, this.emit("needsUpdate");
	}
	get dropDensity() {
		return this.options.dropDensity ?? Y.dropDensity;
	}
	set dropDensity(e) {
		this.options.dropDensity = e, this.rawEffect.dropDensity = e, this.emit("needsUpdate");
	}
	get dropLayers() {
		return this.options.dropLayers ?? Y.dropLayers;
	}
	set dropLayers(e) {
		this.options.dropLayers = e, this.rawEffect.dropLayers = e, this.emit("needsUpdate");
	}
	get dropSizeFactor() {
		return this.options.dropSizeFactor ?? Y.dropSizeFactor;
	}
	set dropSizeFactor(e) {
		this.options.dropSizeFactor = e, this.rawEffect.dropSizeFactor = e, this.emit("needsUpdate");
	}
	get noiseScale() {
		return this.options.noiseScale ?? Y.noiseScale;
	}
	set noiseScale(e) {
		this.options.noiseScale = e, this.rawEffect.noiseScale = e, this.emit("needsUpdate");
	}
	get refractionStrength() {
		return this.options.refractionStrength ?? Y.refractionStrength;
	}
	set refractionStrength(e) {
		this.options.refractionStrength = e, this.rawEffect.refractionStrength = e, this.emit("needsUpdate");
	}
	get minDropStrength() {
		return this.options.minDropStrength ?? Y.minDropStrength;
	}
	set minDropStrength(e) {
		this.options.minDropStrength = e, this.rawEffect.minDropStrength = e, this.emit("needsUpdate");
	}
	get dropFadeStart() {
		return this.options.dropFadeStart ?? Y.dropFadeStart;
	}
	set dropFadeStart(e) {
		this.options.dropFadeStart = e, this.rawEffect.dropFadeStart = e, this.emit("needsUpdate");
	}
	get dropFadeEnd() {
		return this.options.dropFadeEnd ?? Y.dropFadeEnd;
	}
	set dropFadeEnd(e) {
		this.options.dropFadeEnd = e, this.rawEffect.dropFadeEnd = e, this.emit("needsUpdate");
	}
	get dropThresholdFactor() {
		return this.options.dropThresholdFactor ?? Y.dropThresholdFactor;
	}
	set dropThresholdFactor(e) {
		this.options.dropThresholdFactor = e, this.rawEffect.dropThresholdFactor = e, this.emit("needsUpdate");
	}
	get gridDensityLow() {
		return this.options.gridDensityLow ?? Y.gridDensityLow;
	}
	set gridDensityLow(e) {
		this.options.gridDensityLow = e, this.rawEffect.gridDensityLow = e, this.emit("needsUpdate");
	}
	get gridDensityHigh() {
		return this.options.gridDensityHigh ?? Y.gridDensityHigh;
	}
	set gridDensityHigh(e) {
		this.options.gridDensityHigh = e, this.rawEffect.gridDensityHigh = e, this.emit("needsUpdate");
	}
	get jitterStrengthLow() {
		return this.options.jitterStrengthLow ?? Y.jitterStrengthLow;
	}
	set jitterStrengthLow(e) {
		this.options.jitterStrengthLow = e, this.rawEffect.jitterStrengthLow = e, this.emit("needsUpdate");
	}
	get jitterStrengthHigh() {
		return this.options.jitterStrengthHigh ?? Y.jitterStrengthHigh;
	}
	set jitterStrengthHigh(e) {
		this.options.jitterStrengthHigh = e, this.rawEffect.jitterStrengthHigh = e, this.emit("needsUpdate");
	}
};
//#endregion
//#region ../../node_modules/.pnpm/n8ao@2.0.1_postprocessing@6.39.4_three@0.185.1__three@0.185.1/node_modules/n8ao/dist/N8AO.js
function X(e) {
	return e && e.__esModule ? e.default : e;
}
var Fv = /* @__PURE__ */ new class extends ze {
	boundingSphere = new Zt();
	constructor() {
		super(), this.setAttribute("position", new C(new Float32Array([
			-1,
			-1,
			3,
			-1,
			-1,
			3
		]), 2)), this.setAttribute("uv", new C(new Float32Array([
			0,
			0,
			2,
			0,
			0,
			2
		]), 2));
	}
	computeBoundingSphere() {}
}(), Iv = /* @__PURE__ */ new Nt(), Lv = class {
	constructor(e) {
		this._mesh = new D(Fv, e), this._mesh.frustumCulled = !1;
	}
	render(e) {
		e.render(this._mesh, Iv);
	}
	get material() {
		return this._mesh.material;
	}
	set material(e) {
		this._mesh.material = e;
	}
	dispose() {
		this._mesh.material.dispose(), this._mesh.geometry.dispose();
	}
}, Rv = {
	uniforms: {
		sceneDiffuse: { value: null },
		sceneDepth: { value: null },
		sceneNormal: { value: null },
		projMat: { value: /* @__PURE__ */ new E() },
		viewMat: { value: /* @__PURE__ */ new E() },
		projViewMat: { value: /* @__PURE__ */ new E() },
		projectionMatrixInv: { value: /* @__PURE__ */ new E() },
		viewMatrixInv: { value: /* @__PURE__ */ new E() },
		cameraPos: { value: /* @__PURE__ */ new j() },
		resolution: { value: /* @__PURE__ */ new A() },
		biasAdjustment: { value: /* @__PURE__ */ new A() },
		time: { value: 0 },
		samples: { value: [] },
		bluenoise: { value: null },
		distanceFalloff: { value: 1 },
		radius: { value: 5 },
		near: { value: .1 },
		far: { value: 1e3 },
		ortho: { value: !1 },
		screenSpaceRadius: { value: !1 },
		frame: { value: 0 }
	},
	depthWrite: !1,
	depthTest: !1,
	vertexShader: "\nvarying vec2 vUv;\nvoid main() {\n  vUv = uv;\n  gl_Position = vec4(position, 1);\n}",
	fragmentShader: "\n    #define SAMPLES 16\n    #define FSAMPLES 16.0\nuniform sampler2D sceneDiffuse;\nuniform highp sampler2D sceneNormal;\nuniform highp sampler2D sceneDepth;\nuniform mat4 projectionMatrixInv;\nuniform mat4 viewMatrixInv;\nuniform mat4 projMat;\nuniform mat4 viewMat;\nuniform mat4 projViewMat;\nuniform vec3 cameraPos;\nuniform vec2 resolution;\nuniform vec2 biasAdjustment;\nuniform float time;\nuniform vec3[SAMPLES] samples;\nuniform float radius;\nuniform float distanceFalloff;\nuniform float near;\nuniform float far;\nuniform float frame;\nuniform bool ortho;\nuniform bool screenSpaceRadius;\nuniform sampler2D bluenoise;\n    varying vec2 vUv;\n    highp float linearize_depth(highp float d, highp float zNear,highp float zFar)\n    {\n        return (zFar * zNear) / (zFar - d * (zFar - zNear));\n    }\n    highp float linearize_depth_ortho(highp float d, highp float nearZ, highp float farZ) {\n      return nearZ + (farZ - nearZ) * d;\n    }\n    highp float linearize_depth_log(highp float d, highp float nearZ,highp float farZ) {\n      float depth = pow(2.0, d * log2(farZ + 1.0)) - 1.0;\n      float a = farZ / (farZ - nearZ);\n      float b = farZ * nearZ / (nearZ - farZ);\n      float linDepth = a + b / depth;\n      /*return ortho ? linearize_depth_ortho(\n        linDepth,\n        nearZ,\n        farZ\n      ) :linearize_depth(linDepth, nearZ, farZ);*/\n       #ifdef ORTHO\n\n       return linearize_depth_ortho(d, nearZ, farZ);\n\n        #else\n        return linearize_depth(linDepth, nearZ, farZ);\n        #endif\n    }\n\n    vec3 getWorldPosLog(vec3 posS) {\n      vec2 uv = posS.xy;\n      float z = posS.z;\n      float nearZ =near;\n      float farZ = far;\n      float depth = pow(2.0, z * log2(farZ + 1.0)) - 1.0;\n      float a = farZ / (farZ - nearZ);\n      float b = farZ * nearZ / (nearZ - farZ);\n      float linDepth = a + b / depth;\n      vec4 clipVec = vec4(uv, linDepth, 1.0) * 2.0 - 1.0;\n      vec4 wpos = projectionMatrixInv * clipVec;\n      return wpos.xyz / wpos.w;\n    }\n    float depthToClipZ(float depth) {\n      #ifdef REVERSEDEPTH\n        return depth;\n      #else\n        return depth * 2.0 - 1.0;\n      #endif\n    }\n    bool isBackgroundDepth(float depth) {\n      #ifdef REVERSEDEPTH\n        return depth == 0.0;\n      #else\n        return depth == 1.0;\n      #endif\n    }\n    vec3 getWorldPos(float depth, vec2 coord) {\n      #ifdef LOGDEPTH\n        #ifndef ORTHO\n          return getWorldPosLog(vec3(coord, depth));\n        #endif\n      #endif\n      #ifdef ORTHO\n        float z = depthToClipZ(depth);\n        vec4 clipSpacePosition = vec4(coord * 2. - 1., z, 1.);\n        vec4 viewSpacePosition = projectionMatrixInv * clipSpacePosition;\n        viewSpacePosition.xyz /= viewSpacePosition.w;\n        return viewSpacePosition.xyz;\n      #else\n        vec2 ndc = coord * 2. - 1.;\n        float ndcZ = depthToClipZ(depth);\n        mat4 Q = projectionMatrixInv;\n        vec3 view = vec3(Q[0][0] * ndc.x + Q[3][0], Q[1][1] * ndc.y + Q[3][1], Q[3][2]);\n        float invW = 1. / (Q[2][3] * ndcZ + Q[3][3]);\n        return view * invW;\n      #endif\n  }\n\n  vec3 computeNormal(vec3 worldPos, vec2 vUv) {\n    ivec2 p = ivec2(vUv * resolution);\n    float c0 = texelFetch(sceneDepth, p, 0).x;\n    float l2 = texelFetch(sceneDepth, p - ivec2(2, 0), 0).x;\n    float l1 = texelFetch(sceneDepth, p - ivec2(1, 0), 0).x;\n    float r1 = texelFetch(sceneDepth, p + ivec2(1, 0), 0).x;\n    float r2 = texelFetch(sceneDepth, p + ivec2(2, 0), 0).x;\n    float b2 = texelFetch(sceneDepth, p - ivec2(0, 2), 0).x;\n    float b1 = texelFetch(sceneDepth, p - ivec2(0, 1), 0).x;\n    float t1 = texelFetch(sceneDepth, p + ivec2(0, 1), 0).x;\n    float t2 = texelFetch(sceneDepth, p + ivec2(0, 2), 0).x;\n\n    float dl = abs((2.0 * l1 - l2) - c0);\n    float dr = abs((2.0 * r1 - r2) - c0);\n    float db = abs((2.0 * b1 - b2) - c0);\n    float dt = abs((2.0 * t1 - t2) - c0);\n\n    vec3 ce = getWorldPos(c0, vUv).xyz;\n\n    vec3 dpdx = (dl < dr) ? ce - getWorldPos(l1, (vUv - vec2(1.0 / resolution.x, 0.0))).xyz\n                          : -ce + getWorldPos(r1, (vUv + vec2(1.0 / resolution.x, 0.0))).xyz;\n    vec3 dpdy = (db < dt) ? ce - getWorldPos(b1, (vUv - vec2(0.0, 1.0 / resolution.y))).xyz\n                          : -ce + getWorldPos(t1, (vUv + vec2(0.0, 1.0 / resolution.y))).xyz;\n\n    return normalize(cross(dpdx, dpdy));\n}\n\nmat3 makeRotationZ(float theta) {\n	float c = cos(theta);\n	float s = sin(theta);\n	return mat3(c, - s, 0,\n			s,  c, 0,\n			0,  0, 1);\n  }\n\nvoid main() {\n      vec4 diffuse = texture2D(sceneDiffuse, vUv);\n      float depth = texture2D(sceneDepth, vUv).x;\n      if (isBackgroundDepth(depth)) {\n        gl_FragColor = vec4(vec3(1.0), 1.0);\n        return;\n      }\n      vec3 worldPos = getWorldPos(depth, vUv);\n      #ifdef HALFRES\n        vec3 normal = texture2D(sceneNormal, vUv).rgb;\n      #else\n        vec3 normal = computeNormal(worldPos, vUv);\n      #endif\n      vec4 noise = texture2D(bluenoise, gl_FragCoord.xy / 128.0);\n      vec2 harmoniousNumbers = vec2(\n        1.618033988749895,\n        1.324717957244746\n      );\n      noise.rg += harmoniousNumbers * frame;\n      noise.rg = fract(noise.rg);\n        vec3 helperVec = vec3(0.0, 1.0, 0.0);\n        if (dot(helperVec, normal) > 0.99) {\n          helperVec = vec3(1.0, 0.0, 0.0);\n        }\n        vec3 tangent = normalize(cross(helperVec, normal));\n        vec3 bitangent = cross(normal, tangent);\n        mediump mat3 tbn = mat3(tangent, bitangent, normal) *  makeRotationZ( noise.r * 3.1415962 * 2.0) ;\n\n      mediump float occluded = 0.0;\n      mediump float totalWeight = 0.0;\n      float radiusToUse = screenSpaceRadius ? distance(\n        worldPos,\n        getWorldPos(depth, vUv +\n          vec2(radius, 0.0) / resolution)\n      ) : radius;\n      float distanceFalloffToUse =screenSpaceRadius ?\n          radiusToUse * distanceFalloff\n      : radiusToUse * distanceFalloff * 0.2;\n      float bias = (min(\n        0.1,\n        distanceFalloffToUse * 0.1\n      ) / near) * fwidth(distance(worldPos, cameraPos)) / radiusToUse;\n      bias = biasAdjustment.x + biasAdjustment.y * bias;\n      mediump float offsetMove = noise.g;\n      mediump float offsetMoveInv = 1.0 / FSAMPLES;\n      float farTimesNear = far * near;\n      float farMinusNear = far - near;\n      \n      for(int i = 0; i < SAMPLES; i++) {\n        mediump vec3 sampleDirection = tbn * samples[i];\n\n        float moveAmt = fract(offsetMove);\n        offsetMove += offsetMoveInv;\n        vec3 samplePos = worldPos + radiusToUse * moveAmt * sampleDirection;\n        vec4 offset = projMat * vec4(samplePos, 1.0);\n        offset.xyz /= offset.w;\n        offset.xy = offset.xy * 0.5 + 0.5;\n        #ifndef REVERSEDEPTH\n        offset.z = offset.z * 0.5 + 0.5;\n        #endif\n        \n        if (all(greaterThan(offset.xyz * (1.0 - offset.xyz), vec3(0.0)))) {\n          float sampleDepth = textureLod(sceneDepth, offset.xy, 0.0).x;\n\n          /*#ifdef LOGDEPTH\n          float distSample = linearize_depth_log(sampleDepth, near, far);\n      #else\n          #ifdef ORTHO\n              float distSample = near + farMinusNear * sampleDepth;\n          #else\n              float distSample = (farTimesNear) / (far - sampleDepth * farMinusNear);\n          #endif\n      #endif*/\n      #ifdef REVERSEDEPTH\n          float distSample = -getWorldPos(sampleDepth, offset.xy).z;\n      #else\n        #ifdef ORTHO\n          float distSample = near + sampleDepth * farMinusNear;\n        #else\n          #ifdef LOGDEPTH\n              float distSample = linearize_depth_log(sampleDepth, near, far);\n          #else\n              float distSample = (farTimesNear) / (far - sampleDepth * farMinusNear);\n          #endif\n        #endif\n      #endif\n      \n      #ifdef REVERSEDEPTH\n          float distWorld = -samplePos.z;\n      #else\n        #ifdef ORTHO\n          float distWorld = near + offset.z * farMinusNear;\n        #else\n          float distWorld = (farTimesNear) / (far - offset.z * farMinusNear);\n        #endif\n      #endif\n          \n          mediump float rangeCheck = smoothstep(0.0, 1.0, distanceFalloffToUse / (abs(distSample - distWorld)));\n          vec2 diff = gl_FragCoord.xy - floor(offset.xy * resolution);\n          occluded += rangeCheck * float(distSample != distWorld) * float(sampleDepth != depth) * step(distSample + bias, distWorld) * step(\n            1.0,\n            dot(diff, diff)\n          );\n          \n          totalWeight ++;\n        }\n      }\n      float occ = clamp(1.0 - occluded / (totalWeight == 0.0 ? 1.0 : totalWeight), 0.0, 1.0);\n      gl_FragColor = vec4(occ, 0.5 + 0.5 * normal);\n}"
}, zv = {
	uniforms: {
		sceneDiffuse: { value: null },
		sceneDepth: { value: null },
		tDiffuse: { value: null },
		transparencyDWFalse: { value: null },
		transparencyDWTrue: { value: null },
		transparencyDWTrueDepth: { value: null },
		transparencyAware: { value: !1 },
		projMat: { value: /* @__PURE__ */ new E() },
		viewMat: { value: /* @__PURE__ */ new E() },
		projectionMatrixInv: { value: /* @__PURE__ */ new E() },
		resolution: { value: /* @__PURE__ */ new A() },
		color: { value: /* @__PURE__ */ new j(0, 0, 0) },
		blueNoise: { value: null },
		downsampledDepth: { value: null },
		time: { value: 0 },
		intensity: { value: 10 },
		renderMode: { value: 0 },
		gammaCorrection: { value: !1 },
		ortho: { value: !1 },
		near: { value: .1 },
		far: { value: 1e3 },
		screenSpaceRadius: { value: !1 },
		radius: { value: 0 },
		distanceFalloff: { value: 1 },
		fog: { value: !1 },
		fogExp: { value: !1 },
		fogDensity: { value: 0 },
		fogNear: { value: Infinity },
		fogFar: { value: Infinity },
		colorMultiply: { value: !0 },
		aoTones: { value: 0 }
	},
	depthWrite: !1,
	depthTest: !1,
	vertexShader: "\n		varying vec2 vUv;\n		void main() {\n			vUv = uv;\n			gl_Position = vec4(position, 1);\n		}",
	fragmentShader: "\n		uniform sampler2D sceneDiffuse;\n    uniform highp sampler2D sceneDepth;\n    uniform highp sampler2D downsampledDepth;\n    uniform highp sampler2D transparencyDWFalse;\n    uniform highp sampler2D transparencyDWTrue;\n    uniform highp sampler2D transparencyDWTrueDepth;\n    uniform sampler2D tDiffuse;\n    uniform sampler2D blueNoise;\n    uniform vec2 resolution;\n    uniform vec3 color;\n    uniform mat4 projectionMatrixInv;\n    uniform float intensity;\n    uniform float renderMode;\n    uniform float near;\n    uniform float far;\n    uniform float aoTones;\n    uniform bool gammaCorrection;\n    uniform bool ortho;\n    uniform bool screenSpaceRadius;\n    uniform bool fog;\n    uniform bool fogExp;\n    uniform bool colorMultiply;\n    uniform bool transparencyAware;\n    uniform float fogDensity;\n    uniform float fogNear;\n    uniform float fogFar;\n    uniform float radius;\n    uniform float distanceFalloff;\n    varying vec2 vUv;\n    highp float linearize_depth(highp float d, highp float zNear,highp float zFar)\n    {\n        return (zFar * zNear) / (zFar - d * (zFar - zNear));\n    }\n    highp float linearize_depth_ortho(highp float d, highp float nearZ, highp float farZ) {\n      return nearZ + (farZ - nearZ) * d;\n    }\n    highp float linearize_depth_log(highp float d, highp float nearZ,highp float farZ) {\n      float depth = pow(2.0, d * log2(farZ + 1.0)) - 1.0;\n      float a = farZ / (farZ - nearZ);\n      float b = farZ * nearZ / (nearZ - farZ);\n      float linDepth = a + b / depth;\n      return ortho ? linearize_depth_ortho(\n        linDepth,\n        nearZ,\n        farZ\n      ) :linearize_depth(linDepth, nearZ, farZ);\n    }\n    vec3 getWorldPosLog(vec3 posS) {\n        vec2 uv = posS.xy;\n        float z = posS.z;\n        float nearZ =near;\n        float farZ = far;\n        float depth = pow(2.0, z * log2(farZ + 1.0)) - 1.0;\n        float a = farZ / (farZ - nearZ);\n        float b = farZ * nearZ / (nearZ - farZ);\n        float linDepth = a + b / depth;\n        vec4 clipVec = vec4(uv, linDepth, 1.0) * 2.0 - 1.0;\n        vec4 wpos = projectionMatrixInv * clipVec;\n        return wpos.xyz / wpos.w;\n      }\n      float depthToClipZ(float depth) {\n        #ifdef REVERSEDEPTH\n          return depth;\n        #else\n          return depth * 2.0 - 1.0;\n        #endif\n      }\n      bool isBackgroundDepth(float depth) {\n        #ifdef REVERSEDEPTH\n          return depth == 0.0;\n        #else\n          return depth == 1.0;\n        #endif\n      }\n      vec3 getWorldPos(float depth, vec2 coord) {\n        #ifdef LOGDEPTH\n          #ifndef ORTHO\n            return getWorldPosLog(vec3(coord, depth));\n          #endif\n        #endif\n      //  }\n        #ifdef ORTHO\n          float z = depthToClipZ(depth);\n          vec4 clipSpacePosition = vec4(coord * 2. - 1., z, 1.);\n          vec4 viewSpacePosition = projectionMatrixInv * clipSpacePosition;\n          viewSpacePosition.xyz /= viewSpacePosition.w;\n          return viewSpacePosition.xyz;\n        #else\n          vec2 ndc = coord * 2. - 1.;\n          float ndcZ = depthToClipZ(depth);\n          mat4 Q = projectionMatrixInv;\n          vec3 view = vec3(Q[0][0] * ndc.x + Q[3][0], Q[1][1] * ndc.y + Q[3][1], Q[3][2]);\n          float invW = 1. / (Q[2][3] * ndcZ + Q[3][3]);\n          return view * invW;\n        #endif\n    }\n  \n    vec3 computeNormal(vec3 worldPos, vec2 vUv) {\n      ivec2 p = ivec2(vUv * resolution);\n      float c0 = texelFetch(sceneDepth, p, 0).x;\n      float l2 = texelFetch(sceneDepth, p - ivec2(2, 0), 0).x;\n      float l1 = texelFetch(sceneDepth, p - ivec2(1, 0), 0).x;\n      float r1 = texelFetch(sceneDepth, p + ivec2(1, 0), 0).x;\n      float r2 = texelFetch(sceneDepth, p + ivec2(2, 0), 0).x;\n      float b2 = texelFetch(sceneDepth, p - ivec2(0, 2), 0).x;\n      float b1 = texelFetch(sceneDepth, p - ivec2(0, 1), 0).x;\n      float t1 = texelFetch(sceneDepth, p + ivec2(0, 1), 0).x;\n      float t2 = texelFetch(sceneDepth, p + ivec2(0, 2), 0).x;\n  \n      float dl = abs((2.0 * l1 - l2) - c0);\n      float dr = abs((2.0 * r1 - r2) - c0);\n      float db = abs((2.0 * b1 - b2) - c0);\n      float dt = abs((2.0 * t1 - t2) - c0);\n  \n      vec3 ce = getWorldPos(c0, vUv).xyz;\n  \n      vec3 dpdx = (dl < dr) ? ce - getWorldPos(l1, (vUv - vec2(1.0 / resolution.x, 0.0))).xyz\n                            : -ce + getWorldPos(r1, (vUv + vec2(1.0 / resolution.x, 0.0))).xyz;\n      vec3 dpdy = (db < dt) ? ce - getWorldPos(b1, (vUv - vec2(0.0, 1.0 / resolution.y))).xyz\n                            : -ce + getWorldPos(t1, (vUv + vec2(0.0, 1.0 / resolution.y))).xyz;\n  \n      return normalize(cross(dpdx, dpdy));\n  }\n\n    #include <common>\n    #include <dithering_pars_fragment>\n    void main() {\n        //vec4 texel = texture2D(tDiffuse, vUv);//vec3(0.0);\n        vec4 sceneTexel = texture2D(sceneDiffuse, vUv);\n        float depth = texture2D(sceneDepth, vUv).x;\n        #ifdef HALFRES \n        vec4 texel = vec4(0.0);\n        if (isBackgroundDepth(depth)) {\n            texel = vec4(1.0, 0.0, 0.0, 1.0);\n        } else {\n        vec3 worldPos = getWorldPos(depth, vUv);\n        vec3 normal = computeNormal(getWorldPos(depth, vUv), vUv);\n       // vec4 texel = texture2D(tDiffuse, vUv);\n       // Find closest depth;\n       float totalWeight = 0.0;\n       float radiusToUse = screenSpaceRadius ? distance(\n        worldPos,\n        getWorldPos(depth, vUv +\n          vec2(radius, 0.0) / resolution)\n      ) : radius;\n      float distanceFalloffToUse =screenSpaceRadius ?\n          radiusToUse * distanceFalloff\n      : distanceFalloff;\n        for(float x = -1.0; x <= 1.0; x++) {\n            for(float y = -1.0; y <= 1.0; y++) {\n                vec2 offset = vec2(x, y);\n                ivec2 p = ivec2(\n                    (vUv * resolution * 0.5) + offset\n                );\n                vec2 pUv = vec2(p) / (resolution * 0.5);\n                float sampleDepth = texelFetch(downsampledDepth,p, 0).x;\n                vec4 sampleInfo = texelFetch(tDiffuse, p, 0);\n                vec3 normalSample = sampleInfo.gba * 2.0 - 1.0;\n                vec3 worldPosSample = getWorldPos(sampleDepth, pUv);\n                float tangentPlaneDist = abs(dot(worldPosSample - worldPos, normal));\n                float rangeCheck = exp(-1.0 * tangentPlaneDist * (1.0 / distanceFalloffToUse)) * max(dot(normal, normalSample), 0.0);\n                float weight = rangeCheck;\n                totalWeight += weight;\n                texel += sampleInfo * weight;\n            }\n        }\n        if (totalWeight == 0.0) {\n            texel = texture2D(tDiffuse, vUv);\n        } else {\n            texel /= totalWeight;\n        }\n    }\n        #else\n        vec4 texel = texture2D(tDiffuse, vUv);\n        #endif\n\n        #ifdef LOGDEPTH\n        texel.r = clamp(texel.r, 0.0, 1.0);\n        if (texel.r == 0.0) {\n          texel.r = 1.0;\n        }\n        #endif\n     \n        float finalAo = pow(texel.r, intensity);\n        if (aoTones > 0.0) {\n            finalAo = ceil(finalAo * aoTones) / aoTones;\n        }\n        float fogFactor = 0.0;\n        if (fog) {\n            float fogDepth = -getWorldPos(depth, vUv).z;\n            if (fogExp) {\n                fogFactor = 1.0 - exp( - fogDensity * fogDensity * fogDepth * fogDepth );\n            } else {\n                fogFactor = smoothstep( fogNear, fogFar, fogDepth );\n            }\n        }\n        if (transparencyAware) {\n            float transparencyDWOff = texture2D(transparencyDWFalse, vUv).a;\n            float transparencyDWOn = texture2D(transparencyDWTrue, vUv).a;\n            float adjustmentFactorOff = transparencyDWOff;\n            float depthSample = texture2D(sceneDepth, vUv).r;\n            float trueDepthSample = texture2D(transparencyDWTrueDepth, vUv).r;\n            float adjustmentFactorOn = (1.0 - transparencyDWOn) * (\n                trueDepthSample == depthSample ? 1.0 : 0.0\n            );\n            float adjustmentFactor = max(adjustmentFactorOff, adjustmentFactorOn);\n            finalAo = mix(finalAo, 1.0, adjustmentFactor);\n        }\n        finalAo = mix(finalAo, 1.0, fogFactor);\n        vec3 aoApplied = color * mix(vec3(1.0), sceneTexel.rgb, float(colorMultiply));\n        if (renderMode == 0.0) {\n            gl_FragColor = vec4( mix(sceneTexel.rgb, aoApplied, 1.0 - finalAo), sceneTexel.a);\n        } else if (renderMode == 1.0) {\n            gl_FragColor = vec4( mix(vec3(1.0), aoApplied, 1.0 - finalAo), sceneTexel.a);\n        } else if (renderMode == 2.0) {\n            gl_FragColor = vec4( sceneTexel.rgb, sceneTexel.a);\n        } else if (renderMode == 3.0) {\n            if (vUv.x < 0.5) {\n                gl_FragColor = vec4( sceneTexel.rgb, sceneTexel.a);\n            } else if (abs(vUv.x - 0.5) < 1.0 / resolution.x) {\n                gl_FragColor = vec4(1.0);\n            } else {\n                gl_FragColor = vec4( mix(sceneTexel.rgb, aoApplied, 1.0 - finalAo), sceneTexel.a);\n            }\n        } else if (renderMode == 4.0) {\n            if (vUv.x < 0.5) {\n                gl_FragColor = vec4( sceneTexel.rgb, sceneTexel.a);\n            } else if (abs(vUv.x - 0.5) < 1.0 / resolution.x) {\n                gl_FragColor = vec4(1.0);\n            } else {\n                gl_FragColor = vec4( mix(vec3(1.0), aoApplied, 1.0 - finalAo), sceneTexel.a);\n            }\n        }\n        #include <dithering_fragment>\n        if (gammaCorrection) {\n            gl_FragColor = sRGBTransferOETF(gl_FragColor);\n        }\n    }\n    "
}, Z = {};
Z = JSON.parse("{\"architecture\":\"attention-v3-int8\",\"formatVersion\":3,\"globalBias\":[-0.32877659797668457,0.4370867609977722,-0.05251404270529747,1.3072023391723633,0.0477047860622406,0.24477416276931763,0.009111796505749226,-0.17459993064403534],\"globalFeatureInverseStandardDeviation\":[10.771836280822754,1.9548665285110474,1.612365484237671],\"globalFeatureMean\":[0.9198138117790222,-0.49808526039123535,0.03374629095196724],\"globalWeights\":[101,-4,7,-127,6,-11,3,1,0,-16,-7,8,-8,-1,7,-4,0,0,-12,-3,-13,1,0,2],\"headBias\":[-0.15895532071590424,0.007501596584916115,-0.47742825746536255,0.01632097363471985,-0.48355796933174133,-0.1052703931927681,-0.8414919376373291,-0.21046382188796997],\"headWeights\":[-45,-7,-45,-20,7,-13,120,-24,-15,-26,-19,1,27,-48,-4,-10,1,-5,-24,64,91,-1,-68,39,54,39,101,-40,-127,64,-41,-17,-23,-19,3,35,-2,33,3,9,-64,-32,30,42,-112,12,28,-11,15,2,-4,-7,7,-3,-5,1,76,48,-34,-67,103,-40,-26,1,58,-11,46,-41,5,-6,-17,-8,13,17,-35,45,27,-17,-28,7,-53,12,-51,6,-32,-5,58,-9,-28,-21,37,-12,1,20,2,2,11,7,-4,-9,2,-15,-1,-8,16,12,-27,-1,61,-5,-1,4,-7,-2,7,4,1,4,-2,4,-18,-16,28,6,-65,16,3,-3,-5,-2,0,-40,-21,-22,14,30,-21,49,15,-64,43,19,23,18,5,-15,21,21,30,17,-11,-6,22,-38,-20,97,-46,-5,-13,-59,26,-13,11,-2,-10,-8,2,-15,-17,-27,-9,26,7,-7,6,9,-32,5,-9,12,49,17,-1,24,20,35,14,-33,-50,-1,-4,-26,11,11,9,-80,30,9,36,6,-12,-4,-7,39,-10,-30,-49,1,-43,-20,-34,76,-36,-10,15,-8,43,31,38,-42,39,37,-7,7,8,16,28,-83,32,9,23,-13,39,119,23,-127,-24,8,-48,-29,-7,-33,-12,58,-24,-29,-19,12,-55,-90,0,126,26,42,54,22],\"keyProjectionWeights\":[0,-1,-1,1,1,1,1,1,-64,32,49,23,-25,4,27,-22,0,1,-1,-1,-1,1,1,0,-34,38,64,88,13,-53,-41,58,-7,-4,79,-41,27,26,14,2,-2,1,1,1,-1,-1,1,1,1,-1,-1,-1,-1,-1,1,1,4,-3,126,42,-40,-116,35,20],\"name\":\"residual-attention-v3-50m-qat-int8-epoch-25-zo-278w\",\"outputBias\":-0.0005526235327124596,\"outputWeights\":[11,11,14,-27,9,-22,127,6],\"quantization\":{\"scales\":{\"globalWeight\":0.021090541950849095,\"headWeight\":0.04935851140909355,\"keyWeight\":0.1733924937791441,\"outputWeight\":0.0030087142047955295,\"tapInputWeight\":0.1096231754049479,\"tapOutputWeight\":0.017949438644286102,\"valueWeight\":0.013986751242596301},\"scheme\":\"symmetric-int8-per-tensor\",\"zeroPoint\":0},\"summaryQueries\":[0.0038647791370749474,0.09565000981092453,0.002756686182692647,-0.08183622360229492,-0.15209506452083588,-0.0006105066277086735,0.0010439646430313587,-0.03020688332617283,0.005065929610282183,0.14488759636878967,0.003160916268825531,-0.0855727270245552,-0.3123375475406647,0.00039022407145239413,0.0037786494940519333,0.1451321840286255,-0.002009483054280281,0.0597594790160656,0.0045239729806780815,-0.08765853196382523,-0.13884992897510529,-0.0021647117100656033,0.003985927440226078,0.09727758169174194,0.007170629221946001,0.0786278173327446,0.004103775601834059,-0.1198369711637497,-0.2925199568271637,-0.002055276418104768,0.0030450925696641207,0.14401987195014954],\"supportedDenoiseSamples\":[4,8,16],\"tapFeatureInverseStandardDeviation\":[2.283243417739868,0.8810898065567017,0.8210930228233337,3.752316474914551,3.6375720500946045,2.670454978942871,10.249449729919434,0.12639354169368744,100],\"tapFeatureMean\":[0.010318092070519924,0.01364430133253336,0.13411010801792145,-0.004725644364953041,0.10053129494190216,0.8384788632392883,0.9203217625617981,1.7139031887054443,1],\"tapInputBias\":[0.4780646860599518,-0.45214661955833435,0.289407879114151,0.34804567694664,-0.1320028454065323,0.17722633481025696,0.011480014771223068,-0.26692497730255127],\"tapInputWeights\":[0,1,7,0,-1,-7,0,31,-2,-1,14,-126,0,0,-1,2,26,-2,0,66,-73,0,0,0,-12,22,-3,0,-76,-90,0,-1,-7,-3,58,-1,0,2,6,0,0,3,4,-40,0,0,3,-13,0,0,1,-7,-13,0,0,-7,10,0,-2,-7,0,-39,-2,0,-13,-19,0,-2,20,-1,3,-1],\"tapOutputBias\":[-0.3867710530757904,0.1349504142999649,0.35706064105033875,-0.5938405394554138,-0.031154220923781395,1.4079623222351074,-1.9221038818359375,0.6029739379882812],\"tapOutputWeights\":[18,-4,47,19,74,-94,-21,-9,73,-59,88,-10,-3,71,-7,24,20,74,24,-31,-12,-10,-15,-45,-126,2,-4,27,-5,24,35,-11,-4,9,-8,26,-10,27,26,-20,17,-50,5,-35,0,-5,12,-71,89,-58,22,-83,-115,7,-16,-89,89,22,1,-20,-22,-25,-26,44],\"valueProjectionWeights\":[-16,-6,40,-17,84,-76,59,51,-10,-2,-10,-1,-23,74,-70,23,-5,4,4,-7,-77,127,20,-48,-36,4,-17,-12,-4,10,29,-27,-2,11,-47,-50,-54,-3,14,11,-23,-1,109,31,4,-100,-33,-36,-19,0,-8,20,-35,-24,79,2,44,2,5,7,22,-70,-67,-35]}");
var Bv = [
	[
		"tapInputWeight",
		"tapInputWeights",
		8,
		9
	],
	[
		"tapOutputWeight",
		"tapOutputWeights",
		8,
		8
	],
	[
		"globalWeight",
		"globalWeights",
		8,
		3
	],
	[
		"keyWeight",
		"keyProjectionWeights",
		8,
		8
	],
	[
		"valueWeight",
		"valueProjectionWeights",
		8,
		8
	],
	[
		"headWeight",
		"headWeights",
		8,
		32
	],
	[
		"outputWeight",
		"outputWeights",
		1,
		8
	]
], Vv = (e) => {
	let t = (/*@__PURE__*/ X(Z)).quantization?.scales?.[e];
	if (!(t > 0) || !Number.isFinite(t)) throw Error(`The bundled N8AO neural model has no valid ${e} scale.`);
	return t;
};
if ((/*@__PURE__*/ X(Z)).architecture !== "attention-v3-int8" || (/*@__PURE__*/ X(Z)).formatVersion !== 3 || (/*@__PURE__*/ X(Z)).quantization?.scheme !== "symmetric-int8-per-tensor" || (/*@__PURE__*/ X(Z)).quantization?.zeroPoint !== 0 || (/*@__PURE__*/ X(Z)).supportedDenoiseSamples?.join(",") !== "4,8,16" || Bv.some(([, e, t, n]) => (/*@__PURE__*/ X(Z))[e]?.length !== t * n || (/*@__PURE__*/ X(Z))[e].some((e) => !Number.isInteger(e) || e < -127 || e > 127))) throw Error("The bundled N8AO neural denoise model has an unsupported layout.");
var Hv = (e) => {
	if (!Number.isFinite(e)) throw Error("The bundled N8AO neural model contains a non-finite value.");
	if (Object.is(e, -0)) return "0.0";
	let t = Number(e).toString();
	return /[.eE]/.test(t) ? t : `${t}.0`;
}, Uv = [
	"x",
	"y",
	"z",
	"w"
], Wv = (e) => [...Uv.map((t) => `${e}.lo.${t}`), ...Uv.map((t) => `${e}.hi.${t}`)], Gv = (e, t) => e === 0 ? null : e === 1 ? t : e === -1 ? `(-${t})` : e < 0 ? `(-${Hv(-e)} * ${t})` : `${Hv(e)} * ${t}`, Kv = (e, t) => e === 0 ? null : `${Hv(e)} * ${t}`, qv = (e) => e.filter(Boolean).join(" + ") || "0.0", Jv = (e, t, n, r, i, a) => {
	let o = r.map((r, i) => Gv(e[t * n + i], r));
	return `${Hv(i)} * (${qv(o)}) + ${Hv(a[t])}`;
}, Yv = (e, t = "        ") => `vec4(\n${e.map((e) => `${t}    ${e}`).join(",\n")}\n${t})`, Xv = ({ functionName: e, scaleName: t, weights: n, bias: r, width: i = 8, relu: a = !1 }) => {
	let o = Wv("inputToken"), s = Vv(t), c = Array.from({ length: 8 }, (e, t) => Jv(n, t, i, o, s, r)), l = Yv(c.slice(0, 4)), u = Yv(c.slice(4)), d = (e) => a ? `max(${e}, vec4(0.0))` : e;
	return `
    NeuralToken neural${e[0].toUpperCase()}${e.slice(1)}(NeuralToken inputToken) {
        return NeuralToken(
            ${d(l)},
            ${d(u)}
        );
    }
`;
}, Zv = (e, t, n, r, i, a, o, s = {}) => Array.from({ length: i }, (i, c) => {
	let l = t[c];
	for (let t = 0; t < a; t++) {
		let i = e[c * a + t] * o;
		l -= i * r[t] * n[t], Object.hasOwn(s, t) && (l += i * r[t] * s[t]);
	}
	return l;
}), Qv = Vv("tapInputWeight"), $v = Zv((/*@__PURE__*/ X(Z)).tapInputWeights, (/*@__PURE__*/ X(Z)).tapInputBias, (/*@__PURE__*/ X(Z)).tapFeatureMean, (/*@__PURE__*/ X(Z)).tapFeatureInverseStandardDeviation, 8, 9, Qv, { 8: 1 }), ey = Wv("scaledInput"), ty = Array.from({ length: 8 }, (e, t) => Jv((/*@__PURE__*/ X(Z)).tapInputWeights, t, 9, ey, Qv, $v)), ny = `
    NeuralToken neuralTapInput(NeuralToken raw) {
        NeuralToken scaledInput = NeuralToken(
            raw.lo * ${Yv((/*@__PURE__*/ X(Z)).tapFeatureInverseStandardDeviation.slice(0, 4), "            ")},
            raw.hi * ${Yv((/*@__PURE__*/ X(Z)).tapFeatureInverseStandardDeviation.slice(4, 8), "            ")}
        );
        return NeuralToken(
            max(${Yv(ty.slice(0, 4))}, vec4(0.0)),
            max(${Yv(ty.slice(4))}, vec4(0.0))
        );
    }
`, ry = Vv("globalWeight"), iy = Zv((/*@__PURE__*/ X(Z)).globalWeights, (/*@__PURE__*/ X(Z)).globalBias, (/*@__PURE__*/ X(Z)).globalFeatureMean, (/*@__PURE__*/ X(Z)).globalFeatureInverseStandardDeviation, 8, 3, ry), ay = Uv.slice(0, 3).map((e) => `scaledInput.${e}`), oy = Array.from({ length: 8 }, (e, t) => Jv((/*@__PURE__*/ X(Z)).globalWeights, t, 3, ay, ry, iy)), sy = `
    NeuralToken neuralEncodeGlobal(vec4 raw) {
        vec3 scaledInput = raw.xyz * vec3(
            ${(/*@__PURE__*/ X(Z)).globalFeatureInverseStandardDeviation.map(Hv).join(", ")}
        );
        return NeuralToken(
            max(${Yv(oy.slice(0, 4))}, vec4(0.0)),
            max(${Yv(oy.slice(4))}, vec4(0.0))
        );
    }
`, cy = Wv("key"), ly = `
    vec4 neuralQueryScores(NeuralToken key) {
        return ${Yv(Array.from({ length: 4 }, (e, t) => qv(cy.map((e, n) => Kv((/*@__PURE__*/ X(Z)).summaryQueries[t * 8 + n], e)))))};
    }
`, uy = [];
for (let e = 0; e < 4; e++) uy.push(...Uv.map((t) => `runningSummaryLo[${e}].${t}`), ...Uv.map((t) => `runningSummaryHi[${e}].${t}`));
var dy = Vv("headWeight"), fy = Array.from({ length: 8 }, (e, t) => Jv((/*@__PURE__*/ X(Z)).headWeights, t, 32, uy, dy, (/*@__PURE__*/ X(Z)).headBias)), py = `
    NeuralToken neuralHead(
        vec4 runningSummaryLo[4],
        vec4 runningSummaryHi[4]
    ) {
        return NeuralToken(
            max(${Yv(fy.slice(0, 4))}, vec4(0.0)),
            max(${Yv(fy.slice(4))}, vec4(0.0))
        );
    }
`, my = `
    float neuralOutput(NeuralToken head) {
        return ${Jv((/*@__PURE__*/ X(Z)).outputWeights, 0, 8, Wv("head"), Vv("outputWeight"), [(/*@__PURE__*/ X(Z)).outputBias])};
    }
`, hy = [
	ny,
	Xv({
		functionName: "tapOutput",
		scaleName: "tapOutputWeight",
		weights: (/*@__PURE__*/ X(Z)).tapOutputWeights,
		bias: (/*@__PURE__*/ X(Z)).tapOutputBias,
		relu: !0
	}),
	sy,
	Xv({
		functionName: "keyProject",
		scaleName: "keyWeight",
		weights: (/*@__PURE__*/ X(Z)).keyProjectionWeights,
		bias: Array(8).fill(0)
	}),
	Xv({
		functionName: "valueProject",
		scaleName: "valueWeight",
		weights: (/*@__PURE__*/ X(Z)).valueProjectionWeights,
		bias: Array(8).fill(0)
	}),
	ly,
	py,
	my
].join("\n");
Bv.reduce((e, [, t]) => e + (/*@__PURE__*/ X(Z))[t].length, 0), Bv.reduce((e, [, t]) => e + (/*@__PURE__*/ X(Z))[t].filter((e) => e !== 0).length, 0);
var gy = {
	uniforms: {
		sceneDiffuse: { value: null },
		sceneDepth: { value: null },
		tDiffuse: { value: null },
		projMat: { value: /* @__PURE__ */ new E() },
		viewMat: { value: /* @__PURE__ */ new E() },
		projectionMatrixInv: { value: /* @__PURE__ */ new E() },
		viewMatrixInv: { value: /* @__PURE__ */ new E() },
		cameraPos: { value: /* @__PURE__ */ new j() },
		resolution: { value: /* @__PURE__ */ new A() },
		time: { value: 0 },
		r: { value: 5 },
		blueNoise: { value: null },
		radius: { value: 12 },
		worldRadius: { value: 5 },
		index: { value: 0 },
		poissonDisk: { value: [] },
		distanceFalloff: { value: 1 },
		near: { value: .1 },
		far: { value: 1e3 },
		screenSpaceRadius: { value: !1 }
	},
	depthWrite: !1,
	depthTest: !1,
	vertexShader: "\n		varying vec2 vUv;\n		void main() {\n			vUv = uv;\n			gl_Position = vec4(position, 1.0);\n		}",
	fragmentShader: `
		uniform sampler2D sceneDiffuse;
    uniform highp sampler2D sceneDepth;
    uniform sampler2D tDiffuse;
    uniform sampler2D blueNoise;
    uniform mat4 projectionMatrixInv;
    uniform mat4 viewMatrixInv;
    uniform vec2 resolution;
    uniform float r;
    uniform float radius;
     uniform float worldRadius;
    uniform float index;
     uniform float near;
     uniform float far;
     uniform float distanceFalloff;
    uniform bool screenSpaceRadius;
    varying vec2 vUv;

    highp float linearize_depth(highp float d, highp float zNear,highp float zFar)
    {
        highp float z_n = 2.0 * d - 1.0;
        return 2.0 * zNear * zFar / (zFar + zNear - z_n * (zFar - zNear));
    }
    highp float linearize_depth_log(highp float d, highp float nearZ,highp float farZ) {
     float depth = pow(2.0, d * log2(farZ + 1.0)) - 1.0;
     float a = farZ / (farZ - nearZ);
     float b = farZ * nearZ / (nearZ - farZ);
     float linDepth = a + b / depth;
     return linearize_depth(linDepth, nearZ, farZ);
   }
   highp float linearize_depth_ortho(highp float d, highp float nearZ, highp float farZ) {
     return nearZ + (farZ - nearZ) * d;
   }
   float depthToClipZ(float depth) {
     #ifdef REVERSEDEPTH
       return depth;
     #else
       return depth * 2.0 - 1.0;
     #endif
   }
   bool isBackgroundDepth(float depth) {
     #ifdef REVERSEDEPTH
       return depth == 0.0;
     #else
       return depth == 1.0;
     #endif
   }
   vec3 getWorldPosLog(vec3 posS) {
     vec2 uv = posS.xy;
     float z = posS.z;
     float nearZ =near;
     float farZ = far;
     float depth = pow(2.0, z * log2(farZ + 1.0)) - 1.0;
     float a = farZ / (farZ - nearZ);
     float b = farZ * nearZ / (nearZ - farZ);
     float linDepth = a + b / depth;
     vec4 clipVec = vec4(uv, linDepth, 1.0) * 2.0 - 1.0;
     vec4 wpos = projectionMatrixInv * clipVec;
     return wpos.xyz / wpos.w;
   }
    vec3 getWorldPos(float depth, vec2 coord) {
     #ifdef LOGDEPTH
      #ifndef ORTHO
          return getWorldPosLog(vec3(coord, depth));
      #endif
     #endif
        
        #ifdef ORTHO
          float z = depthToClipZ(depth);
          vec4 clipSpacePosition = vec4(coord * 2. - 1., z, 1.);
          vec4 viewSpacePosition = projectionMatrixInv * clipSpacePosition;
          viewSpacePosition.xyz /= viewSpacePosition.w;
          return viewSpacePosition.xyz;
        #else
          vec2 ndc = coord * 2. - 1.;
          float ndcZ = depthToClipZ(depth);
          mat4 Q = projectionMatrixInv;
          vec3 view = vec3(Q[0][0] * ndc.x + Q[3][0], Q[1][1] * ndc.y + Q[3][1], Q[3][2]);
          float invW = 1.0 / (Q[2][3] * ndcZ + Q[3][3]);
          return view * invW;
        #endif
    }

#ifdef NEURAL_DENOISE
    struct NeuralToken {
        highp vec4 lo;
        highp vec4 hi;
    };

    ${hy}

    vec3 neuralSafeNormalize(vec3 value, vec3 fallback) {
        float lengthSquared = dot(value, value);
        return lengthSquared > 1e-12 ? value * inversesqrt(lengthSquared) : fallback;
    }

    mat3 neuralLocalFrame(vec3 inputNormal) {
        vec3 frameNormal = neuralSafeNormalize(inputNormal, vec3(0.0, 0.0, 1.0));
        vec3 helper = abs(frameNormal.z) < 0.999
            ? vec3(0.0, 0.0, 1.0)
            : vec3(0.0, 1.0, 0.0);
        vec3 tangent = neuralSafeNormalize(
            cross(helper, frameNormal),
            vec3(1.0, 0.0, 0.0)
        );
        vec3 bitangent = cross(frameNormal, tangent);
        return transpose(mat3(tangent, bitangent, frameNormal));
    }

    void neuralConsumeToken(
        NeuralToken token,
        inout vec4 runningMaximum,
        inout vec4 runningDenominator,
        inout vec4 runningSummaryLo[4],
        inout vec4 runningSummaryHi[4]
    ) {
        NeuralToken key = neuralKeyProject(token);
        NeuralToken value = neuralValueProject(token);
        vec4 score = neuralQueryScores(key) * 0.3535533905932738;
        vec4 newMaximum = max(runningMaximum, score);
        vec4 oldScale = exp(runningMaximum - newMaximum);
        vec4 newScale = exp(score - newMaximum);

        runningSummaryLo[0] = runningSummaryLo[0] * oldScale.x + value.lo * newScale.x;
        runningSummaryHi[0] = runningSummaryHi[0] * oldScale.x + value.hi * newScale.x;
        runningSummaryLo[1] = runningSummaryLo[1] * oldScale.y + value.lo * newScale.y;
        runningSummaryHi[1] = runningSummaryHi[1] * oldScale.y + value.hi * newScale.y;
        runningSummaryLo[2] = runningSummaryLo[2] * oldScale.z + value.lo * newScale.z;
        runningSummaryHi[2] = runningSummaryHi[2] * oldScale.z + value.hi * newScale.z;
        runningSummaryLo[3] = runningSummaryLo[3] * oldScale.w + value.lo * newScale.w;
        runningSummaryHi[3] = runningSummaryHi[3] * oldScale.w + value.hi * newScale.w;
        runningDenominator = runningDenominator * oldScale + newScale;
        runningMaximum = newMaximum;
    }

    void neuralEncodeTap(
        NeuralToken raw,
        inout vec4 runningMaximum,
        inout vec4 runningDenominator,
        inout vec4 runningSummaryLo[4],
        inout vec4 runningSummaryHi[4]
    ) {
        NeuralToken first = neuralTapInput(raw);
        NeuralToken token = neuralTapOutput(first);
        neuralConsumeToken(
            token,
            runningMaximum,
            runningDenominator,
            runningSummaryLo,
            runningSummaryHi
        );
    }

    float neuralFinish(
        float baselineAO,
        inout vec4 runningMaximum,
        inout vec4 runningDenominator,
        inout vec4 runningSummaryLo[4],
        inout vec4 runningSummaryHi[4]
    ) {
        vec4 raw = vec4(
            baselineAO,
            log(max(worldRadius, 1e-6)),
            log(max(distanceFalloff, 1e-6)),
            0.0
        );
        NeuralToken token = neuralEncodeGlobal(raw);
        neuralConsumeToken(
            token,
            runningMaximum,
            runningDenominator,
            runningSummaryLo,
            runningSummaryHi
        );

        vec4 inverseDenominator = 1.0 / max(runningDenominator, vec4(1e-12));
        runningSummaryLo[0] *= inverseDenominator.x;
        runningSummaryHi[0] *= inverseDenominator.x;
        runningSummaryLo[1] *= inverseDenominator.y;
        runningSummaryHi[1] *= inverseDenominator.y;
        runningSummaryLo[2] *= inverseDenominator.z;
        runningSummaryHi[2] *= inverseDenominator.z;
        runningSummaryLo[3] *= inverseDenominator.w;
        runningSummaryHi[3] *= inverseDenominator.w;

        NeuralToken head = neuralHead(runningSummaryLo, runningSummaryHi);
        return neuralOutput(head);
    }
#endif

    #include <common>
    #define NUM_SAMPLES __N8AO_DENOISE_SAMPLES__
    uniform vec2 poissonDisk[NUM_SAMPLES];
    void main() {
        const float pi = 3.14159;
        vec2 texelSize = vec2(1.0 / resolution.x, 1.0 / resolution.y);
        vec2 uv = vUv;
        vec4 data = texture2D(tDiffuse, vUv);
        float occlusion = data.r;
        float baseOcc = data.r;
        vec3 normal = data.gba * 2.0 - 1.0;
        float count = 1.0;
        float d = texture2D(sceneDepth, vUv).x;
        if (isBackgroundDepth(d)) {
          gl_FragColor = data;
          return;
        }
        vec3 worldPos = getWorldPos(d, vUv);
        float size = radius;
        float angle;
#ifdef NEURAL_DENOISE
        // The neural material is only bound for denoise iteration two.
        angle = texture2D(blueNoise, gl_FragCoord.xy / 128.0).z * PI2;
#else
        if (index == 0.0) {
             angle = texture2D(blueNoise, gl_FragCoord.xy / 128.0).w * PI2;
        } else if (index == 1.0) {
             angle = texture2D(blueNoise, gl_FragCoord.xy / 128.0).z * PI2;
        } else if (index == 2.0) {
             angle = texture2D(blueNoise, gl_FragCoord.xy / 128.0).y * PI2;
        } else {
             angle = texture2D(blueNoise, gl_FragCoord.xy / 128.0).x * PI2;
        }
#endif

        mat2 rotationMatrix = mat2(cos(angle), -sin(angle), sin(angle), cos(angle));
        float radiusToUse = screenSpaceRadius ? distance(
          worldPos,
          getWorldPos(d, vUv +
            vec2(worldRadius, 0.0) / resolution)
        ) : worldRadius;
        float distanceFalloffToUse =screenSpaceRadius ?
        radiusToUse * distanceFalloff
    : radiusToUse * distanceFalloff * 0.2;

        float invDistance = (1.0 / distanceFalloffToUse);
#ifdef NEURAL_DENOISE
        mat3 neuralWorldToLocal = neuralLocalFrame(normal);
        float neuralInverseRadius = 1.0 / max(radiusToUse, 1e-6);
        float neuralInverseDistance = 1.0 / max(distanceFalloffToUse, 1e-6);
        vec4 neuralMaximum = vec4(-1e30);
        vec4 neuralDenominator = vec4(0.0);
        vec4 neuralSummaryLo[4];
        vec4 neuralSummaryHi[4];
        for (int query = 0; query < 4; query++) {
            neuralSummaryLo[query] = vec4(0.0);
            neuralSummaryHi[query] = vec4(0.0);
        }
#endif
        for(int i = 0; i < NUM_SAMPLES; i++) {
            vec2 offset = (rotationMatrix * poissonDisk[i]) * texelSize * size;
            vec4 dataSample = texture2D(tDiffuse, uv + offset);
            float occSample = dataSample.r;
            vec3 normalSample = dataSample.gba * 2.0 - 1.0;
            float dSample = texture2D(sceneDepth, uv + offset).x;
            vec3 worldPosSample = getWorldPos(dSample, uv + offset);
            float tangentPlaneDist = abs(dot(worldPosSample - worldPos, normal));
            float rangeCheck = float(!isBackgroundDepth(dSample)) * exp(-1.0 * tangentPlaneDist * invDistance ) * max(dot(normal, normalSample), 0.0);
            occlusion += occSample * rangeCheck;
            count += rangeCheck;
#ifdef NEURAL_DENOISE
            if (!isBackgroundDepth(dSample)) {
                vec3 localDelta = (neuralWorldToLocal * (worldPosSample - worldPos))
                    * neuralInverseRadius;
                vec3 localNormal = neuralWorldToLocal
                    * neuralSafeNormalize(normalSample, vec3(0.0, 0.0, 1.0));
                NeuralToken rawTap = NeuralToken(
                    vec4(localDelta, localNormal.x),
                    vec4(
                        localNormal.y,
                        localNormal.z,
                        occSample,
                        tangentPlaneDist * neuralInverseDistance
                    )
                );
                neuralEncodeTap(
                    rawTap,
                    neuralMaximum,
                    neuralDenominator,
                    neuralSummaryLo,
                    neuralSummaryHi
                );
            }
#endif
        }
        if (count > 0.0) {
          occlusion /= count;
        }
        occlusion = clamp(occlusion, 0.0, 1.0);
        if (occlusion == 0.0) {
          occlusion = 1.0;
        }
#ifdef NEURAL_DENOISE
        occlusion = clamp(
            occlusion + neuralFinish(
                occlusion,
                neuralMaximum,
                neuralDenominator,
                neuralSummaryLo,
                neuralSummaryHi
            ),
            0.0,
            1.0
        );
#endif
        gl_FragColor = vec4(occlusion, 0.5 + 0.5 * normal);
    }
    `
}, _y = {
	uniforms: {
		sceneDepth: { value: null },
		resolution: { value: /* @__PURE__ */ new A() },
		near: { value: .1 },
		far: { value: 1e3 },
		viewMatrixInv: { value: /* @__PURE__ */ new E() },
		projectionMatrixInv: { value: /* @__PURE__ */ new E() },
		logDepth: { value: !1 },
		ortho: { value: !1 }
	},
	depthWrite: !1,
	depthTest: !1,
	vertexShader: "\n    varying vec2 vUv;\n    void main() {\n        vUv = uv;\n        gl_Position = vec4(position, 1);\n    }",
	fragmentShader: "\n    uniform highp sampler2D sceneDepth;\n    uniform vec2 resolution;\n    uniform float near;\n    uniform float far;\n    uniform bool logDepth;\n    uniform bool ortho;\n    uniform mat4 viewMatrixInv;\n    uniform mat4 projectionMatrixInv;\n    varying vec2 vUv;\n    layout(location = 1) out vec4 gNormal;\n    vec3 getWorldPosLog(vec3 posS) {\n        vec2 uv = posS.xy;\n        float z = posS.z;\n        float nearZ =near;\n        float farZ = far;\n        float depth = pow(2.0, z * log2(farZ + 1.0)) - 1.0;\n        float a = farZ / (farZ - nearZ);\n        float b = farZ * nearZ / (nearZ - farZ);\n        float linDepth = a + b / depth;\n        vec4 clipVec = vec4(uv, linDepth, 1.0) * 2.0 - 1.0;\n        vec4 wpos = projectionMatrixInv * clipVec;\n        return wpos.xyz / wpos.w;\n      }\n      vec3 getWorldPos(float depth, vec2 coord) {\n        if (logDepth && !ortho) {\n          return getWorldPosLog(vec3(coord, depth));\n        }\n        if (ortho) {\n          #ifdef REVERSEDEPTH\n          float z = depth;\n          #else\n          float z = depth * 2. - 1.;\n          #endif\n          vec4 clipSpacePosition = vec4(coord * 2. - 1., z, 1.);\n          vec4 viewSpacePosition = projectionMatrixInv * clipSpacePosition;\n          viewSpacePosition.xyz /= viewSpacePosition.w;\n          return viewSpacePosition.xyz;\n        }\n        vec2 ndc = coord * 2. - 1.;\n        #ifdef REVERSEDEPTH\n        float ndcZ = depth;\n        #else\n        float ndcZ = depth * 2. - 1.;\n        #endif\n        mat4 Q = projectionMatrixInv;\n        vec3 view = vec3(Q[0][0] * ndc.x + Q[3][0], Q[1][1] * ndc.y + Q[3][1], Q[3][2]);\n        float invW = 1. / (Q[2][3] * ndcZ + Q[3][3]);\n        return view * invW;\n    }\n  \n    vec3 computeNormal(vec3 worldPos, vec2 vUv) {\n      ivec2 p = ivec2(vUv * resolution);\n      float c0 = texelFetch(sceneDepth, p, 0).x;\n      float l2 = texelFetch(sceneDepth, p - ivec2(2, 0), 0).x;\n      float l1 = texelFetch(sceneDepth, p - ivec2(1, 0), 0).x;\n      float r1 = texelFetch(sceneDepth, p + ivec2(1, 0), 0).x;\n      float r2 = texelFetch(sceneDepth, p + ivec2(2, 0), 0).x;\n      float b2 = texelFetch(sceneDepth, p - ivec2(0, 2), 0).x;\n      float b1 = texelFetch(sceneDepth, p - ivec2(0, 1), 0).x;\n      float t1 = texelFetch(sceneDepth, p + ivec2(0, 1), 0).x;\n      float t2 = texelFetch(sceneDepth, p + ivec2(0, 2), 0).x;\n  \n      float dl = abs((2.0 * l1 - l2) - c0);\n      float dr = abs((2.0 * r1 - r2) - c0);\n      float db = abs((2.0 * b1 - b2) - c0);\n      float dt = abs((2.0 * t1 - t2) - c0);\n  \n      vec3 ce = getWorldPos(c0, vUv).xyz;\n  \n      vec3 dpdx = (dl < dr) ? ce - getWorldPos(l1, (vUv - vec2(1.0 / resolution.x, 0.0))).xyz\n                            : -ce + getWorldPos(r1, (vUv + vec2(1.0 / resolution.x, 0.0))).xyz;\n      vec3 dpdy = (db < dt) ? ce - getWorldPos(b1, (vUv - vec2(0.0, 1.0 / resolution.y))).xyz\n                            : -ce + getWorldPos(t1, (vUv + vec2(0.0, 1.0 / resolution.y))).xyz;\n  \n      return normalize(cross(dpdx, dpdy));\n  }\n    void main() {\n        vec2 uv = vUv - vec2(0.5) / resolution;\n        vec2 pixelSize = vec2(1.0) / resolution;\n        highp vec2[4] uvSamples;\n        uvSamples[0] = uv;\n        uvSamples[1] = uv + vec2(pixelSize.x, 0.0);\n        uvSamples[2] = uv + vec2(0.0, pixelSize.y);\n        uvSamples[3] = uv + pixelSize;\n        float depth00 = texture2D(sceneDepth, uvSamples[0]).r;\n        float depth10 = texture2D(sceneDepth, uvSamples[1]).r;\n        float depth01 = texture2D(sceneDepth, uvSamples[2]).r;\n        float depth11 = texture2D(sceneDepth, uvSamples[3]).r;\n        float minDepth = min(min(depth00, depth10), min(depth01, depth11));\n        float maxDepth = max(max(depth00, depth10), max(depth01, depth11));\n        float targetDepth = minDepth;\n        // Checkerboard pattern to avoid artifacts\n        if (mod(gl_FragCoord.x + gl_FragCoord.y, 2.0) > 0.5) { \n            targetDepth = maxDepth;\n        }\n        int chosenIndex = 0;\n        float[4] samples;\n        samples[0] = depth00;\n        samples[1] = depth10;\n        samples[2] = depth01;\n        samples[3] = depth11;\n        for(int i = 0; i < 4; ++i) {\n            if (samples[i] == targetDepth) {\n                chosenIndex = i;\n                break;\n            }\n        }\n        gl_FragColor = vec4(samples[chosenIndex], 0.0, 0.0, 1.0);\n        gNormal = vec4(computeNormal(\n            getWorldPos(samples[chosenIndex], uvSamples[chosenIndex]), uvSamples[chosenIndex]\n        ), 0.0);\n    }"
}, vy = /* @__PURE__ */ Uint8Array.from(atob("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"), (e) => e.charCodeAt(0)), yy = /* @__PURE__ */ parseInt(Rt.replace(/\D+/g, "")) >= 162 ? class extends N {
	constructor(e = 1, t = 1, n = 1, r = {}) {
		super(e, t, {
			...r,
			count: n
		}), this.isWebGLMultipleRenderTargets = !0;
	}
	get texture() {
		return this.textures;
	}
} : class extends N {
	constructor(e = 1, t = 1, n = 1, r = {}) {
		super(e, t, r), this.isWebGLMultipleRenderTargets = !0;
		let i = this.texture;
		this.texture = [];
		for (let e = 0; e < n; e++) this.texture[e] = i.clone(), this.texture[e].isRenderTargetTexture = !0;
	}
	setSize(e, t, n = 1) {
		if (this.width !== e || this.height !== t || this.depth !== n) {
			this.width = e, this.height = t, this.depth = n;
			for (let r = 0, i = this.texture.length; r < i; r++) this.texture[r].image.width = e, this.texture[r].image.height = t, this.texture[r].image.depth = n;
			this.dispose();
		}
		this.viewport.set(0, 0, e, t), this.scissor.set(0, 0, e, t);
	}
	copy(e) {
		this.dispose(), this.width = e.width, this.height = e.height, this.depth = e.depth, this.scissor.copy(e.scissor), this.scissorTest = e.scissorTest, this.viewport.copy(e.viewport), this.depthBuffer = e.depthBuffer, this.stencilBuffer = e.stencilBuffer, e.depthTexture !== null && (this.depthTexture = e.depthTexture.clone()), this.texture.length = 0;
		for (let t = 0, n = e.texture.length; t < n; t++) this.texture[t] = e.texture[t].clone(), this.texture[t].isRenderTargetTexture = !0;
		return this;
	}
};
function by(e, t, n) {
	if (t.getQueryParameter(e, t.QUERY_RESULT_AVAILABLE)) {
		let r = t.getQueryParameter(e, t.QUERY_RESULT) / 1e6;
		n.lastTime = n.lastTime === 0 ? r : n.timeRollingAverage * n.lastTime + (1 - n.timeRollingAverage) * r;
	} else setTimeout(() => {
		by(e, t, n);
	}, 1);
}
var xy = class extends Tn {
	constructor(e, t, n = 512, r = 512) {
		super(), this.width = Math.floor(n), this.height = Math.floor(r), this.clear = !0, this._neuralDenoiseWarningKey = null, this.camera = t, this.scene = e, this.autosetGamma = !0, this.configuration = new Proxy({
			aoSamples: 16,
			aoRadius: 5,
			aoTones: 0,
			denoiseSamples: 8,
			denoiseRadius: 12,
			distanceFalloff: 1,
			intensity: 5,
			denoiseIterations: 2,
			renderMode: 0,
			biasOffset: 0,
			biasMultiplier: 0,
			color: new w(0, 0, 0),
			gammaCorrection: !0,
			depthBufferType: Sy.Default,
			screenSpaceRadius: !1,
			halfRes: !1,
			depthAwareUpsampling: !0,
			colorMultiply: !0,
			transparencyAware: !1,
			accumulate: !1,
			neuralDenoise: !1
		}, { set: (e, t, n) => {
			let r = e[t];
			if (e[t] = n, n.equals ? n.equals(r) || this.firstFrame() : r !== n && this.firstFrame(), t === "aoSamples" && r !== n && this.configureAOPass(this.configuration.depthBufferType, this.camera.isOrthographicCamera), t === "denoiseSamples" && r !== n && this.configureDenoisePass(this.configuration.depthBufferType, this.camera.isOrthographicCamera), t === "neuralDenoise" && r !== n) {
				let t = n && (e.aoSamples !== 16 || e.halfRes), r = n && e.halfRes;
				n && (e.aoSamples = 16, [
					4,
					8,
					16
				].includes(e.denoiseSamples) || (e.denoiseSamples = 8), e.denoiseRadius = 12, e.denoiseIterations = 2, e.halfRes = !1), t && this.configureAOPass(this.configuration.depthBufferType, this.camera.isOrthographicCamera), r && (this.configureHalfResTargets(), this.configureEffectCompositer(this.configuration.depthBufferType, this.camera.isOrthographicCamera), this.setSize(this.width, this.height)), this.configureDenoisePass(this.configuration.depthBufferType, this.camera.isOrthographicCamera);
			}
			return t === "halfRes" && r !== n && (this.configureAOPass(this.configuration.depthBufferType, this.camera.isOrthographicCamera), this.configureHalfResTargets(), this.configureEffectCompositer(this.configuration.depthBufferType, this.camera.isOrthographicCamera), this.setSize(this.width, this.height)), t === "depthAwareUpsampling" && r !== n && this.configureEffectCompositer(this.configuration.depthBufferType, this.camera.isOrthographicCamera), t === "gammaCorrection" && (this.autosetGamma = !1), t === "transparencyAware" && r !== n && (this.autoDetectTransparency = !1, this.configureTransparencyTarget()), !0;
		} }), this.samples = [], this.samplesDenoise = [], this.autoDetectTransparency = !0, this.frames = 0, this.lastViewMatrix = new E(), this.lastProjectionMatrix = new E(), this.configureEffectCompositer(this.configuration.depthBufferType), this.configureSampleDependentPasses(), this.configureHalfResTargets(), this.detectTransparency(), this.configureTransparencyTarget(), this.copyQuad = new Lv(new O({
			uniforms: { tDiffuse: { value: null } },
			depthWrite: !1,
			vertexShader: "\n            varying vec2 vUv;\n            void main() {\n                vUv = uv;\n                gl_Position = vec4(position, 1);\n            }\n            ",
			fragmentShader: "\n            uniform sampler2D tDiffuse;\n            varying vec2 vUv;\n            void main() {\n                gl_FragColor = texture2D(tDiffuse, vUv);\n            }\n            "
		})), this.writeTargetInternal = new N(this.width, this.height, {
			minFilter: T,
			magFilter: T,
			depthBuffer: !1,
			format: Bt
		}), this.readTargetInternal = new N(this.width, this.height, {
			minFilter: T,
			magFilter: T,
			depthBuffer: !1,
			format: Bt
		}), this.outputTargetInternal = new N(this.width, this.height, {
			minFilter: T,
			magFilter: T,
			depthBuffer: !1
		}), this.accumulationRenderTarget = new N(this.width, this.height, {
			minFilter: T,
			magFilter: T,
			depthBuffer: !1,
			format: Bt,
			type: ot,
			stencilBuffer: !1,
			depthBuffer: !1,
			alpha: !0
		}), this.accumulationQuad = new Lv(new O({
			uniforms: {
				frame: { value: 0 },
				tDiffuse: { value: null }
			},
			transparent: !0,
			opacity: 1,
			vertexShader: "\n             varying vec2 vUv;\n             void main() {\n                 vUv = uv;\n                 gl_Position = vec4(position, 1);\n             }",
			fragmentShader: "\n             uniform sampler2D tDiffuse;\n             uniform float frame;\n                varying vec2 vUv;\n                void main() {\n                    vec4 color = texture2D(tDiffuse, vUv);\n                    gl_FragColor = vec4(color.rgb, 1.0 / (frame + 1.0));\n                }\n                "
		})), this.bluenoise = new Je(vy, 128, 128), this.bluenoise.colorSpace = jt, this.bluenoise.wrapS = Wt, this.bluenoise.wrapT = Wt, this.bluenoise.minFilter = kt, this.bluenoise.magFilter = kt, this.bluenoise.needsUpdate = !0, this.lastTime = 0, this.timeRollingAverage = .99, this.needsDepthTexture = !0, this.needsSwap = !0, this._r = new A(), this._c = new w();
	}
	configureHalfResTargets() {
		this.firstFrame(), this.configuration.halfRes ? (this.depthDownsampleTarget = new yy(Math.floor(this.width / 2), Math.floor(this.height / 2), 2), Rt <= 161 && (this.depthDownsampleTarget.textures = this.depthDownsampleTarget.texture), this.depthDownsampleTarget.textures[0].format = Ut, this.depthDownsampleTarget.textures[0].type = nt, this.depthDownsampleTarget.textures[0].minFilter = kt, this.depthDownsampleTarget.textures[0].magFilter = kt, this.depthDownsampleTarget.textures[0].depthBuffer = !1, this.depthDownsampleTarget.textures[1].format = Bt, this.depthDownsampleTarget.textures[1].type = ot, this.depthDownsampleTarget.textures[1].minFilter = kt, this.depthDownsampleTarget.textures[1].magFilter = kt, this.depthDownsampleTarget.textures[1].depthBuffer = !1, this.depthDownsampleQuad = new Lv(new O(_y))) : (this.depthDownsampleTarget &&= (this.depthDownsampleTarget.dispose(), null), this.depthDownsampleQuad &&= (this.depthDownsampleQuad.dispose(), null));
	}
	detectTransparency() {
		if (this.autoDetectTransparency) {
			let e = !1;
			this.scene.traverse((t) => {
				t.material && t.material.transparent && (e = !0);
			}), e && (this.configuration.transparencyAware = !0);
		}
	}
	configureTransparencyTarget() {
		this.configuration.transparencyAware ? (this.transparencyRenderTargetDWFalse = new N(this.width, this.height, {
			minFilter: T,
			magFilter: kt,
			type: ot,
			format: Bt
		}), this.transparencyRenderTargetDWTrue = new N(this.width, this.height, {
			minFilter: T,
			magFilter: kt,
			type: ot,
			format: Bt
		}), this.transparencyRenderTargetDWTrue.depthTexture = new Ye(this.width, this.height, cn), this.depthCopyPass = new Lv(new O({
			uniforms: {
				depthTexture: { value: this.depthTexture },
				reverseDepthBuffer: { value: this.configuration.depthBufferType === Sy.Reverse }
			},
			vertexShader: "\n            varying vec2 vUv;\n            void main() {\n                vUv = uv;\n                gl_Position = vec4(position, 1);\n            }",
			fragmentShader: "\n            uniform sampler2D depthTexture;\n            uniform bool reverseDepthBuffer;\n            varying vec2 vUv;\n            void main() {\n                if (reverseDepthBuffer) {\n               float d = 1.0 - texture2D(depthTexture, vUv).r;\n           \n               d += 0.00001;\n               gl_FragDepth = 1.0 - d;\n            } else {\n                float d = texture2D(depthTexture, vUv).r;\n                d += 0.00001;\n                gl_FragDepth = d;\n            }\n               gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0);\n            }\n            "
		}))) : (this.transparencyRenderTargetDWFalse &&= (this.transparencyRenderTargetDWFalse.dispose(), null), this.transparencyRenderTargetDWTrue &&= (this.transparencyRenderTargetDWTrue.dispose(), null), this.depthCopyPass &&= (this.depthCopyPass.dispose(), null));
	}
	renderTransparency(e) {
		let t = this.scene.background, n = e.getClearColor(new w()), r = e.getClearAlpha(), i = /* @__PURE__ */ new Map(), a = e.autoClearDepth;
		this.scene.traverse((e) => {
			i.set(e, e.visible);
		}), this.scene.background = null, e.autoClearDepth = !1, e.setClearColor(new w(0, 0, 0), 0), this.depthCopyPass.material.uniforms.depthTexture.value = this.depthTexture, this.depthCopyPass.material.uniforms.reverseDepthBuffer.value = this.configuration.depthBufferType === Sy.Reverse, e.setRenderTarget(this.transparencyRenderTargetDWFalse), this.scene.traverse((e) => {
			e.material && (e.visible = i.get(e) && (e.material.transparent && !e.material.depthWrite && !e.userData.treatAsOpaque || !!e.userData.cannotReceiveAO));
		}), e.clear(!0, !0, !0), this.depthCopyPass.render(e), e.render(this.scene, this.camera), e.setRenderTarget(this.transparencyRenderTargetDWTrue), this.scene.traverse((e) => {
			e.material && (e.visible = i.get(e) && e.material.transparent && e.material.depthWrite && !e.userData.treatAsOpaque);
		}), e.clear(!0, !0, !0), this.depthCopyPass.render(e), e.render(this.scene, this.camera), this.scene.traverse((e) => {
			e.visible = i.get(e);
		}), e.setClearColor(n, r), this.scene.background = t, e.autoClearDepth = a;
	}
	configureSampleDependentPasses() {
		this.configureAOPass(this.configuration.depthBufferType, this.camera.isOrthographicCamera), this.configureDenoisePass(this.configuration.depthBufferType, this.camera.isOrthographicCamera);
	}
	configureAOPass(e = Sy.Default, t = !1) {
		this.firstFrame(), this.samples = this.generateHemisphereSamples(this.configuration.aoSamples);
		let n = { ...Rv };
		n.fragmentShader = n.fragmentShader.replace("16", this.configuration.aoSamples).replace("16.0", this.configuration.aoSamples + ".0"), e === Sy.Log ? n.fragmentShader = "#define LOGDEPTH\n" + n.fragmentShader : e === Sy.Reverse && (n.fragmentShader = "#define REVERSEDEPTH\n" + n.fragmentShader), t && (n.fragmentShader = "#define ORTHO\n" + n.fragmentShader), this.configuration.halfRes && (n.fragmentShader = "#define HALFRES\n" + n.fragmentShader), this.effectShaderQuad ? (this.effectShaderQuad.material.dispose(), this.effectShaderQuad.material = new O(n)) : this.effectShaderQuad = new Lv(new O(n));
	}
	configureDenoisePass(e = Sy.Default, t = !1) {
		this.firstFrame(), this.samplesDenoise = this.generateDenoiseSamples(this.configuration.denoiseSamples, 11);
		let n = { ...gy };
		n.fragmentShader = n.fragmentShader.replace("__N8AO_DENOISE_SAMPLES__", this.configuration.denoiseSamples), e === Sy.Log ? n.fragmentShader = "#define LOGDEPTH\n" + n.fragmentShader : e === Sy.Reverse && (n.fragmentShader = "#define REVERSEDEPTH\n" + n.fragmentShader), t && (n.fragmentShader = "#define ORTHO\n" + n.fragmentShader), this.standardDenoiseMaterial && this.standardDenoiseMaterial.dispose(), this.neuralDenoiseMaterial && this.neuralDenoiseMaterial.dispose(), this.standardDenoiseMaterial = new O(n), this.neuralDenoiseMaterial = this.configuration.neuralDenoise && [
			4,
			8,
			16
		].includes(this.configuration.denoiseSamples) ? new O({
			...n,
			glslVersion: it,
			fragmentShader: "#define NEURAL_DENOISE\nlayout(location = 0) out highp vec4 neuralFragColor;\n#define gl_FragColor neuralFragColor\n" + n.fragmentShader
		}) : null, this.poissonBlurQuad ? this.poissonBlurQuad.material = this.standardDenoiseMaterial : this.poissonBlurQuad = new Lv(this.standardDenoiseMaterial);
	}
	shouldUseNeuralDenoise() {
		if (!this.configuration.neuralDenoise) return this._neuralDenoiseWarningKey = null, !1;
		let e = [];
		if (this.configuration.aoSamples !== 16 && e.push(`aoSamples is ${this.configuration.aoSamples} (expected 16)`), [
			4,
			8,
			16
		].includes(this.configuration.denoiseSamples) || e.push(`denoiseSamples is ${this.configuration.denoiseSamples} (expected 4, 8, or 16)`), this.configuration.denoiseRadius !== 12 && e.push(`denoiseRadius is ${this.configuration.denoiseRadius} (expected 12)`), this.configuration.denoiseIterations !== 2 && e.push(`denoiseIterations is ${this.configuration.denoiseIterations} (expected 2)`), this.configuration.halfRes && e.push("halfRes is enabled (expected full resolution)"), e.length > 0) {
			let t = e.join("; ");
			return t !== this._neuralDenoiseWarningKey && (console.warn(`[N8AO] neuralDenoise is enabled but cannot run: ${t}. Neural denoising has been disabled; standard denoising will be used.`), this._neuralDenoiseWarningKey = t), !1;
		}
		return this._neuralDenoiseWarningKey = null, this.neuralDenoiseMaterial !== null;
	}
	configureEffectCompositer(e = Sy.Default, t = !1) {
		this.firstFrame();
		let n = { ...zv };
		e === Sy.Log ? n.fragmentShader = "#define LOGDEPTH\n" + n.fragmentShader : e === Sy.Reverse && (n.fragmentShader = "#define REVERSEDEPTH\n" + n.fragmentShader), t && (n.fragmentShader = "#define ORTHO\n" + n.fragmentShader), this.configuration.halfRes && this.configuration.depthAwareUpsampling && (n.fragmentShader = "#define HALFRES\n" + n.fragmentShader), this.effectCompositerQuad ? (this.effectCompositerQuad.material.dispose(), this.effectCompositerQuad.material = new O(n)) : this.effectCompositerQuad = new Lv(new O(n));
	}
	generateHemisphereSamples(e) {
		let t = [];
		for (let n = 0; n < e; n++) {
			let r = 2.399963 * n, i = Math.sqrt(n + .5) / Math.sqrt(e), a = i * Math.cos(r), o = i * Math.sin(r), s = Math.sqrt(1 - (a * a + o * o));
			t.push(new j(a, o, s));
		}
		return t;
	}
	generateDenoiseSamples(e, t) {
		let n = 2 * Math.PI * t / e, r = 1 / e, i = r, a = [], o = r, s = 0;
		for (let t = 0; t < e; t++) a.push(new A(Math.cos(s), Math.sin(s)).multiplyScalar(o ** .75)), o += i, s += n;
		return a;
	}
	setSize(e, t) {
		this.firstFrame(), this.width = Math.floor(e), this.height = Math.floor(t);
		let n = this.configuration.halfRes ? Math.floor(this.width / 2) : this.width, r = this.configuration.halfRes ? Math.floor(this.height / 2) : this.height;
		this.writeTargetInternal.setSize(n, r), this.readTargetInternal.setSize(n, r), this.accumulationRenderTarget.setSize(n, r), this.configuration.halfRes && this.depthDownsampleTarget.setSize(n, r), this.configuration.transparencyAware && (this.transparencyRenderTargetDWFalse.setSize(this.width, this.height), this.transparencyRenderTargetDWTrue.setSize(this.width, this.height)), this.outputTargetInternal.setSize(this.width, this.height);
	}
	setDepthTexture(e) {
		this.depthTexture = e;
	}
	firstFrame() {
		this.needsFrame = !0;
	}
	render(e, t, n) {
		let r = e.xr.enabled;
		e.xr.enabled = !1;
		let i = e.capabilities.reversedDepthBuffer === !0 || e.capabilities.reverseDepthBuffer === !0 ? Sy.Reverse : e.capabilities.logarithmicDepthBuffer ? Sy.Log : Sy.Default;
		this.configuration.depthBufferType !== i && (this.configuration.depthBufferType = i, this.configureAOPass(this.configuration.depthBufferType, this.camera.isOrthographicCamera), this.configureDenoisePass(this.configuration.depthBufferType, this.camera.isOrthographicCamera), this.configureEffectCompositer(this.configuration.depthBufferType, this.camera.isOrthographicCamera)), this.detectTransparency(), (t.texture.type !== this.outputTargetInternal.texture.type || t.texture.format !== this.outputTargetInternal.texture.format) && (this.outputTargetInternal.texture.type = t.texture.type, this.outputTargetInternal.texture.format = t.texture.format, this.outputTargetInternal.texture.needsUpdate = !0), this.camera.updateMatrixWorld(), this.lastViewMatrix.equals(this.camera.matrixWorldInverse) && this.lastProjectionMatrix.equals(this.camera.projectionMatrix) && this.configuration.accumulate && !this.needsFrame ? this.frame++ : (this.configuration.accumulate && (e.setRenderTarget(this.accumulationRenderTarget), e.clear(!0, !0, !0)), this.frame = 0, this.needsFrame = !1), this.lastViewMatrix.copy(this.camera.matrixWorldInverse), this.lastProjectionMatrix.copy(this.camera.projectionMatrix);
		let a, o, s;
		this.debugMode && (a = e.getContext(), o = a.getExtension("EXT_disjoint_timer_query_webgl2"), o === null && (console.error("EXT_disjoint_timer_query_webgl2 not available, disabling debug mode."), this.debugMode = !1)), this.debugMode && (s = a.createQuery(), a.beginQuery(o.TIME_ELAPSED_EXT, s)), this.configuration.transparencyAware && this.renderTransparency(e), this._r.set(this.width, this.height);
		let c = this.configuration.aoRadius;
		if (this.configuration.halfRes && this.configuration.screenSpaceRadius && (c *= .5), this.frame < 1024 / this.configuration.aoSamples) {
			this.configuration.halfRes && (e.setRenderTarget(this.depthDownsampleTarget), this.depthDownsampleQuad.material.uniforms.sceneDepth.value = this.depthTexture, this.depthDownsampleQuad.material.uniforms.resolution.value = this._r, this.depthDownsampleQuad.material.uniforms.near.value = this.camera.near, this.depthDownsampleQuad.material.uniforms.far.value = this.camera.far, this.depthDownsampleQuad.material.uniforms.projectionMatrixInv.value = this.camera.projectionMatrixInverse, this.depthDownsampleQuad.material.uniforms.viewMatrixInv.value = this.camera.matrixWorld, this.depthDownsampleQuad.material.uniforms.logDepth.value = this.configuration.depthBufferType === Sy.Log, this.depthDownsampleQuad.material.uniforms.ortho.value = this.camera.isOrthographicCamera, this.depthDownsampleQuad.render(e)), this.effectShaderQuad.material.uniforms.sceneDiffuse.value = t.texture, this.effectShaderQuad.material.uniforms.sceneDepth.value = this.configuration.halfRes ? this.depthDownsampleTarget.textures[0] : this.depthTexture, this.effectShaderQuad.material.uniforms.sceneNormal.value = this.configuration.halfRes ? this.depthDownsampleTarget.textures[1] : null, this.effectShaderQuad.material.uniforms.projMat.value = this.camera.projectionMatrix, this.effectShaderQuad.material.uniforms.viewMat.value = this.camera.matrixWorldInverse, this.effectShaderQuad.material.uniforms.projViewMat.value = this.camera.projectionMatrix.clone().multiply(this.camera.matrixWorldInverse.clone()), this.effectShaderQuad.material.uniforms.projectionMatrixInv.value = this.camera.projectionMatrixInverse, this.effectShaderQuad.material.uniforms.viewMatrixInv.value = this.camera.matrixWorld, this.effectShaderQuad.material.uniforms.cameraPos.value = this.camera.getWorldPosition(new j()), this.effectShaderQuad.material.uniforms.biasAdjustment.value = new A(this.configuration.biasOffset, this.configuration.biasMultiplier), this.effectShaderQuad.material.uniforms.resolution.value = this.configuration.halfRes ? this._r.clone().multiplyScalar(.5).floor() : this._r, this.effectShaderQuad.material.uniforms.time.value = performance.now() / 1e3, this.effectShaderQuad.material.uniforms.samples.value = this.samples, this.effectShaderQuad.material.uniforms.bluenoise.value = this.bluenoise, this.effectShaderQuad.material.uniforms.radius.value = c, this.effectShaderQuad.material.uniforms.distanceFalloff.value = this.configuration.distanceFalloff, this.effectShaderQuad.material.uniforms.near.value = this.camera.near, this.effectShaderQuad.material.uniforms.far.value = this.camera.far, this.effectShaderQuad.material.uniforms.ortho.value = this.camera.isOrthographicCamera, this.effectShaderQuad.material.uniforms.screenSpaceRadius.value = this.configuration.screenSpaceRadius, this.effectShaderQuad.material.uniforms.frame.value = this.frame, e.setRenderTarget(this.writeTargetInternal), this.effectShaderQuad.render(e);
			let n = this.shouldUseNeuralDenoise();
			for (let t = 0; t < this.configuration.denoiseIterations; t++) [this.writeTargetInternal, this.readTargetInternal] = [this.readTargetInternal, this.writeTargetInternal], this.poissonBlurQuad.material = n && t === 1 ? this.neuralDenoiseMaterial : this.standardDenoiseMaterial, this.poissonBlurQuad.material.uniforms.tDiffuse.value = this.readTargetInternal.texture, this.poissonBlurQuad.material.uniforms.sceneDepth.value = this.configuration.halfRes ? this.depthDownsampleTarget.textures[0] : this.depthTexture, this.poissonBlurQuad.material.uniforms.projMat.value = this.camera.projectionMatrix, this.poissonBlurQuad.material.uniforms.viewMat.value = this.camera.matrixWorldInverse, this.poissonBlurQuad.material.uniforms.projectionMatrixInv.value = this.camera.projectionMatrixInverse, this.poissonBlurQuad.material.uniforms.viewMatrixInv.value = this.camera.matrixWorld, this.poissonBlurQuad.material.uniforms.cameraPos.value = this.camera.getWorldPosition(new j()), this.poissonBlurQuad.material.uniforms.resolution.value = this.configuration.halfRes ? this._r.clone().multiplyScalar(.5).floor() : this._r, this.poissonBlurQuad.material.uniforms.time.value = performance.now() / 1e3, this.poissonBlurQuad.material.uniforms.blueNoise.value = this.bluenoise, this.poissonBlurQuad.material.uniforms.radius.value = this.configuration.denoiseRadius * (this.configuration.halfRes ? .5 : 1), this.poissonBlurQuad.material.uniforms.worldRadius.value = c, this.poissonBlurQuad.material.uniforms.distanceFalloff.value = this.configuration.distanceFalloff, this.poissonBlurQuad.material.uniforms.index.value = t, this.poissonBlurQuad.material.uniforms.poissonDisk.value = this.samplesDenoise, this.poissonBlurQuad.material.uniforms.near.value = this.camera.near, this.poissonBlurQuad.material.uniforms.far.value = this.camera.far, this.poissonBlurQuad.material.uniforms.screenSpaceRadius.value = this.configuration.screenSpaceRadius, e.setRenderTarget(this.writeTargetInternal), this.poissonBlurQuad.render(e);
			e.setRenderTarget(this.accumulationRenderTarget);
			let r = e.autoClear;
			e.autoClear = !1, this.accumulationQuad.material.uniforms.tDiffuse.value = this.writeTargetInternal.texture, this.accumulationQuad.material.uniforms.frame.value = this.frame, this.accumulationQuad.render(e), e.autoClear = r;
		}
		this.configuration.transparencyAware && (this.effectCompositerQuad.material.uniforms.transparencyDWFalse.value = this.transparencyRenderTargetDWFalse.texture, this.effectCompositerQuad.material.uniforms.transparencyDWTrue.value = this.transparencyRenderTargetDWTrue.texture, this.effectCompositerQuad.material.uniforms.transparencyDWTrueDepth.value = this.transparencyRenderTargetDWTrue.depthTexture, this.effectCompositerQuad.material.uniforms.transparencyAware.value = !0), this.effectCompositerQuad.material.uniforms.sceneDiffuse.value = t.texture, this.effectCompositerQuad.material.uniforms.sceneDepth.value = this.depthTexture, this.effectCompositerQuad.material.uniforms.aoTones.value = this.configuration.aoTones, this.effectCompositerQuad.material.uniforms.near.value = this.camera.near, this.effectCompositerQuad.material.uniforms.far.value = this.camera.far, this.effectCompositerQuad.material.uniforms.projectionMatrixInv.value = this.camera.projectionMatrixInverse, this.effectCompositerQuad.material.uniforms.ortho.value = this.camera.isOrthographicCamera, this.effectCompositerQuad.material.uniforms.downsampledDepth.value = this.configuration.halfRes ? this.depthDownsampleTarget.textures[0] : this.depthTexture, this.effectCompositerQuad.material.uniforms.resolution.value = this._r, this.effectCompositerQuad.material.uniforms.blueNoise.value = this.bluenoise, this.effectCompositerQuad.material.uniforms.intensity.value = this.configuration.intensity, this.effectCompositerQuad.material.uniforms.renderMode.value = this.configuration.renderMode, this.effectCompositerQuad.material.uniforms.screenSpaceRadius.value = this.configuration.screenSpaceRadius, this.effectCompositerQuad.material.uniforms.radius.value = c, this.effectCompositerQuad.material.uniforms.distanceFalloff.value = this.configuration.distanceFalloff, this.effectCompositerQuad.material.uniforms.gammaCorrection.value = this.autosetGamma ? this.renderToScreen : this.configuration.gammaCorrection, this.effectCompositerQuad.material.uniforms.tDiffuse.value = this.accumulationRenderTarget.texture, this.effectCompositerQuad.material.uniforms.color.value = this._c.copy(this.configuration.color).convertSRGBToLinear(), this.effectCompositerQuad.material.uniforms.colorMultiply.value = this.configuration.colorMultiply, this.effectCompositerQuad.material.uniforms.fog.value = !!this.scene.fog, this.scene.fog && (this.scene.fog.isFog ? (this.effectCompositerQuad.material.uniforms.fogExp.value = !1, this.effectCompositerQuad.material.uniforms.fogNear.value = this.scene.fog.near, this.effectCompositerQuad.material.uniforms.fogFar.value = this.scene.fog.far) : this.scene.fog.isFogExp2 ? (this.effectCompositerQuad.material.uniforms.fogExp.value = !0, this.effectCompositerQuad.material.uniforms.fogDensity.value = this.scene.fog.density) : console.error(`Unsupported fog type ${this.scene.fog.constructor.name} in SSAOPass.`)), e.setRenderTarget(this.outputTargetInternal), this.effectCompositerQuad.render(e), e.setRenderTarget(this.renderToScreen ? null : n), this.copyQuad.material.uniforms.tDiffuse.value = this.outputTargetInternal.texture, this.copyQuad.render(e), this.debugMode && (a.endQuery(o.TIME_ELAPSED_EXT), by(s, a, this)), e.xr.enabled = r;
	}
	enableDebugMode() {
		this.debugMode = !0;
	}
	disableDebugMode() {
		this.debugMode = !1;
	}
	setDisplayMode(e) {
		this.configuration.renderMode = [
			"Combined",
			"AO",
			"No AO",
			"Split",
			"Split AO"
		].indexOf(e);
	}
	setQualityMode(e) {
		e === "Performance" ? (this.configuration.neuralDenoise = !1, this.configuration.aoSamples = 8, this.configuration.denoiseSamples = 4, this.configuration.denoiseRadius = 12) : e === "Low" ? (this.configuration.neuralDenoise = !1, this.configuration.aoSamples = 16, this.configuration.denoiseSamples = 4, this.configuration.denoiseRadius = 12) : e === "Medium" ? (this.configuration.neuralDenoise = !1, this.configuration.aoSamples = 16, this.configuration.denoiseSamples = 8, this.configuration.denoiseRadius = 12) : e === "High" ? (this.configuration.neuralDenoise = !1, this.configuration.aoSamples = 64, this.configuration.denoiseSamples = 8, this.configuration.denoiseRadius = 6) : e === "Ultra" ? (this.configuration.neuralDenoise = !1, this.configuration.aoSamples = 64, this.configuration.denoiseSamples = 16, this.configuration.denoiseRadius = 6) : [
			"Neural-Low",
			"Neural-Medium",
			"Neural-High"
		].includes(e) && (this.configuration.aoSamples = 16, this.configuration.denoiseSamples = {
			"Neural-Low": 4,
			"Neural-Medium": 8,
			"Neural-High": 16
		}[e], this.configuration.denoiseRadius = 12, this.configuration.denoiseIterations = 2, this.configuration.halfRes = !1, this.configuration.neuralDenoise = !0);
	}
}, Sy = {
	Default: 1,
	Log: 2,
	Reverse: 3
}, Cy = {
	enabled: !0,
	samples: null,
	radius: null,
	intensity: 1,
	color: new i().setHex(0),
	halfRes: !1,
	quality: "Low"
}, wy = class extends m {
	camera;
	width;
	height;
	constructor(e, t, n, r) {
		let i = new xy(new Kt(), e, t, n);
		super(i, null, {
			...Cy,
			...r
		}), this.camera = e, this.width = t, this.height = n;
	}
	onMounted() {
		if (!this.rawPass) return;
		let e = this.quality;
		this.quality = e, this.options.samples && (this.samples = this.options.samples), this.options.radius && (this.radius = this.options.radius), this.options.halfRes != null && (this.halfRes = this.options.halfRes);
		let t = this.intensity;
		this.intensity = t;
		let n = this.color;
		this.color = n, this.rawPass.configuration.gammaCorrection = !1, this.rawPass.autoDetectTransparency = !1, this.rawPass.copyQuad.material.depthTest = !1;
	}
	get quality() {
		return this.options.quality ?? Cy.quality;
	}
	set quality(e) {
		this.options.quality = e, this.rawPass && (this.rawPass.setQualityMode(e), this.emit("needsUpdate"));
	}
	get halfRes() {
		return this.options.halfRes ?? !!Cy.halfRes;
	}
	set halfRes(e) {
		this.options.halfRes = e, this.rawPass && (this.rawPass.configuration.halfRes = e, this.emit("needsUpdate"));
	}
	get samples() {
		return this.options.samples ?? Cy.samples;
	}
	set samples(e) {
		this.options.samples = e, this.rawPass && (this.rawPass.configuration.aoSamples = e ?? this.rawPass.configuration.aoSamples, this.emit("needsUpdate"));
	}
	get radius() {
		return this.options.radius ?? Cy.radius;
	}
	set radius(e) {
		this.options.radius = e, this.rawPass && (this.rawPass.configuration.aoRadius = e ?? this.rawPass.configuration.aoRadius, this.emit("needsUpdate"));
	}
	get intensity() {
		return this.options.intensity ?? Cy.intensity;
	}
	set intensity(e) {
		this.options.intensity = e, this.rawPass && (this.rawPass.configuration.intensity = e, this.emit("needsUpdate"));
	}
	get color() {
		return this.options.color ?? Cy.color;
	}
	set color(e) {
		this.options.color = e, this.rawPass && (this.rawPass.configuration.color = e.raw, this.emit("needsUpdate"));
	}
}, Ty = "// Research and development by https://github.com/takram-design-engineering\n\nuniform sampler2D ssrBuffer;\n\nvoid mainImage(const vec4 inputColor, const vec2 uv, out vec4 outputColor) {\n  vec4 ssr = texture2D(ssrBuffer, uv);\n  outputColor = vec4(inputColor.rgb * (1.0 - ssr.a) + ssr.rgb, 1.0);\n}\n", Ey = "out vec2 vUv;\n\nvoid main() {\n  vUv = position.xy * 0.5 + 0.5;\n  gl_Position = vec4(position.xy, 1.0, 1.0);\n}\n", Dy = "uniform sampler2D inputBuffer;\nuniform sampler2D depthBuffer;\nuniform float exposure;\nuniform vec2 resolution; // size of the target written to\n\nin vec2 vUv;\n\n// Builds the colour the cone's mip chain is generated from; coneTracing.frag.glsl\n// undoes both transforms after sampling.\n//\n// - Reversible tonemap: box-filtered mips of raw HDR let a few bright texels\n//   dominate the average around a dark silhouette; averaging compressed values\n//   bounds each texel's share. Scaled by the tone-mapping exposure so it acts\n//   on display-referred brightness; 0 disables it.\n//   Ref: https://graphicrants.blogspot.com/2013/12/tone-mapping.html\n// - Sky mask, premultiplied into alpha: a ray only ever resolves onto geometry\n//   (a miss writes no hit), so sky texels must not reach its blur footprint.\n//   The sky the water should show comes from the surface's own shading.\n//\n// Written at `resolutionScale` of inputBuffer, so every source texel this\n// output texel covers is fetched unfiltered: a bilinear fetch would blend sky\n// into a silhouette texel whose depth says geometry.\n\n// Per axis. Footprints wider than this (resolutionScale below 1/8) are strided.\n#define MAX_FOOTPRINT 8\n\nvoid main() {\n  ivec2 inputSize = textureSize(inputBuffer, 0);\n  ivec2 depthSize = textureSize(depthBuffer, 0);\n  vec2 ratio = vec2(inputSize) / resolution;\n\n  // Source texels whose centres fall inside this output texel.\n  vec2 lo = ceil((gl_FragCoord.xy - 0.5) * ratio - 0.5);\n  vec2 hi = max(ceil((gl_FragCoord.xy + 0.5) * ratio - 0.5), lo + 1.0);\n  ivec2 first = ivec2(lo);\n  ivec2 count = ivec2(hi - lo);\n  ivec2 stride = (count + MAX_FOOTPRINT - 1) / MAX_FOOTPRINT;\n\n  vec4 sum = vec4(0.0);\n  float taps = 0.0;\n  for (int y = 0; y < MAX_FOOTPRINT; ++y) {\n    if (y * stride.y >= count.y) break;\n    for (int x = 0; x < MAX_FOOTPRINT; ++x) {\n      if (x * stride.x >= count.x) break;\n      ivec2 coord = clamp(first + ivec2(x, y) * stride, ivec2(0), inputSize - 1);\n      vec3 color = texelFetch(inputBuffer, coord, 0).rgb;\n      float depth = texelFetch(depthBuffer, coord * depthSize / inputSize, 0).r;\n      // Ref: https://en.wikipedia.org/wiki/Relative_luminance\n      float luma = dot(color, vec3(0.2126, 0.7152, 0.0722));\n      float geometry = step(depth, 0.9999);\n      sum += vec4(color / (1.0 + luma * exposure), 1.0) * geometry;\n      taps += 1.0;\n    }\n  }\n  gl_FragColor = sum / taps;\n}\n", Oy = "#include <common>\n#include <packing>\n\n#include \"core/packing\"\n#include \"core/depth\"\n#include \"core/transform\"\n\nuniform sampler2D uDepthBuffer;             // Depth buffer\nuniform sampler2D inputBuffer;              // Input buffer\nuniform sampler2D uColorBuffer;             // Color buffer (mipmapped, pre-convolved)\nuniform sampler2D uRayTracingBuffer;        // Ray tracing results from SSR pass\nuniform sampler2D uNormalBuffer;            // View-space normals\n// Declared to match ConeTracingMaterial's public parameters; nothing reads\n// them yet - F0 comes from the normal buffer and there is no fallback probe.\nuniform sampler2D uSpecularBuffer;          // rgb=F0 (or IOR-converted), a=roughness\nuniform sampler2D uIndirectSpecularBuffer;  // Fallback indirect specular\n\nuniform vec2  uBufferSize;          // (width, height) of uColorBuffer in pixels\nuniform vec2  uRayTexelSize;        // 1 / (width, height) of uRayTracingBuffer\nuniform int   uNumMips;             // total mip levels in uColorBuffer\nuniform float uPrefilterExposure;   // exposure uColorBuffer was compressed with\nuniform float uFadeStart;           // cb_fadeStart\nuniform float uFadeEnd;             // cb_fadeEnd\nuniform float uMaxDistance;         // cb_maxDistance\nuniform float cameraNear;\nuniform float cameraFar;\nuniform mat4  inverseProjectionMatrix; // inverse of projection matrix\nuniform mat4  projectionMatrix; // inverse of projection matrix\n\nin vec2 vUv;\n\n// --- constants / helpers ---\nconst float XI = 0.244;                          // used in cone angle\n\nfloat readDepth(const vec2 uv) {\n  #if DEPTH_PACKING == 3201\n  return unpackRGBAToDepth(texture2D(uDepthBuffer, uv));\n  #else\n  return texture2D(uDepthBuffer, uv).r;\n  #endif // DEPTH_PACKING == 3201\n}\n\nfloat getViewZ(const float depth) {\n  #ifdef PERSPECTIVE_CAMERA\n  return perspectiveDepthToViewZ(depth, cameraNear, cameraFar);\n  #else\n  return orthographicDepthToViewZ(depth, cameraNear, cameraFar);\n  #endif\n}\n\n// Ref: https://graphicrants.blogspot.com/2013/08/specular-brdf-reference.html\nfloat roughnessToSpecularPower( float r ) {\n    float a = r * r;\n    return max(2.0 / (a * a) - 2.0, 0.0);\n}\n\n// Constant normal incidence Fresnel factor for all dielectrics.\nconst vec3 Fdielectric = vec3(0.04);\n\nvec3 fresnelSchlick( vec3 F0, float cosTheta ) {\n    return F0 + (1.0 - F0) * pow(1.0 - cosTheta, 5.0);\n}\n\nfloat specularPowerToConeAngle( float specularPower ) {\n    float exponent = 1.0 / (specularPower + 1.0);\n    return acos(pow(XI, exponent));\n}\n\nfloat isoscelesTriangleOpposite( float adjacentLength, float coneTheta ) {\n    return 2.0 * tan(coneTheta) * adjacentLength;\n}\n\nfloat isoscelesTriangleInRadius( float a, float h ) {\n    float a2 = a * a;\n    float fh2 = 4.0 * h * h;\n    return (a * (sqrt(a2 + fh2) - a)) / (4.0 * h);\n}\n\nfloat isoscelesTriangleNextAdjacent( float adjacentLength, float incircleRadius ) {\n    return adjacentLength - (incircleRadius * 2.0);\n}\n\nfloat readViewZ(const vec2 uv) {\n    return getViewZ(reverseLogDepth(readDepth(uv), cameraNear, cameraFar));\n}\n\n// Ref: https://willpgfx.com/2015/07/screen-space-glossy-reflections/\nvoid main() {\n    vec2 pixel = vUv;\n\n    vec4 packedNormal = texture2D(uNormalBuffer, pixel); // xy: compressed normal, z: F0, w: roughness\n\n    // Nothing reflective here, so no neighbour can lend this pixel a\n    // reflection either. Bailing on one fetch keeps the gather below off the\n    // sky and every opaque surface, which is most of the screen. Roughness 1\n    // zeroes fadeOnRoughness below, so it is skipped here as well.\n    if (packedNormal.z < 0.01 || packedNormal.w >= 1.0) {\n        gl_FragColor = vec4(0.0);\n        return;\n    }\n\n    float depth = readDepth(vUv);\n    depth = reverseLogDepth(depth, cameraNear, cameraFar);\n    float viewZ = getViewZ(depth);\n    vec3 viewPosition = screenToView(\n        vUv,\n        depth,\n        viewZ,\n        projectionMatrix,\n        inverseProjectionMatrix\n    );\n\n    // Resolve: gather the ray results of the neighbourhood, not just this\n    // pixel's own. One ray per pixel makes reflecting a binary, per-pixel\n    // decision, so its silhouette comes out hard-edged and - once the rays are\n    // jittered - dithered into blocks. Cone tracing cannot undo that: it\n    // prefilters the colour a ray already found, and a pixel whose ray missed\n    // never reaches the cone loop at all. Averaging the neighbours turns the\n    // decision into a continuous coverage and makes each jittered ray an extra\n    // sample of the same lobe for everyone around it, which is what makes\n    // jitter worth having.\n    // Ref: Stachowiak, \"Stochastic Screen-Space Reflections\", SIGGRAPH 2015.\n    //      https://advances.realtimerendering.com/s2015/Stochastic%20Screen-Space%20Reflections.pptx\n    const int radius = RESOLVE_KERNEL / 2;\n    float sigma = max(1.0, float(radius));\n\n    vec2 hitUV = vec2(0.0);\n    float hitDepth = 0.0;\n    float fade = 0.0;\n    float validWeight = 0.0;\n    float totalWeight = 0.0;\n\n    for (int y = -radius; y <= radius; ++y) {\n        for (int x = -radius; x <= radius; ++x) {\n            vec2 offset = vec2(float(x), float(y));\n            float spatial = exp(-dot(offset, offset) / (2.0 * sigma * sigma));\n            vec2 tapUV = vUv + offset * uRayTexelSize;\n\n            // Only consider rays cast from the same surface as ours, using the\n            // relative view-Z falloff the fog light's joint bilateral upsample\n            // uses, so a silhouette doesn't drag another object's reflections\n            // in. This gates the tap before validity so that a neighbourhood\n            // sitting entirely on our own surface resolves to full coverage no\n            // matter how the surface curves away.\n            float diff = abs(readViewZ(tapUV) - viewZ) / max(abs(viewZ), 1e-3);\n            float weight = spatial * exp(-diff * 8.0);\n            totalWeight += weight;\n\n            // Negative depth marks a ray that found nothing. Counting it in\n            // totalWeight but not validWeight is what pulls coverage towards\n            // zero at the edge of a reflection instead of cutting it off.\n            vec4 tap = texture2D(uRayTracingBuffer, tapUV);\n            if (tap.z < 0.0) {\n                continue;\n            }\n\n            hitUV += tap.xy * weight;\n            hitDepth += tap.z * weight;\n            fade += tap.w * weight;\n            validWeight += weight;\n        }\n    }\n\n    if (validWeight <= 1e-4) {\n        gl_FragColor = vec4(0.0);\n        return;\n    }\n\n    float coverage = validWeight / max(totalWeight, 1e-4);\n    hitUV /= validWeight;\n    hitDepth /= validWeight;\n    fade /= validWeight;\n\n    vec3 normalVS = unpackVec2ToNormal(packedNormal.xy);\n\n    // B is the surface's reflectance at normal incidence (F0).\n    vec4 specularAll = vec4(vec3(packedNormal.z), packedNormal.w);\n\n    vec3 toViewPosition = normalize(viewPosition);\n\n    float gloss = 1.0 - specularAll.a;\n    float specularPower = roughnessToSpecularPower(specularAll.a);\n    // The 0.25 is not in the derivation — specularPowerToConeAngle already\n    // returns a half-angle, of the cone holding ~76% of the lobe's energy.\n    // Without it reflections visibly over-blur, because the roughness the\n    // G-buffer carries for water (0.4, sized for the wave slopes the sun glint\n    // needs) is far above what a mirror-like reflection wants (0.02–0.05), and\n    // the mips the cone reads average across depth, so a wide cone melts\n    // neighbouring surfaces into each other.\n    float coneTheta = specularPowerToConeAngle(specularPower) * 0.25;\n\n    // P1 = current pixel, P2 = resolved hit. The cone is laid out in pixels:\n    // UV units are anisotropic, so a disc radius measured in them over- or\n    // under-states the blur depending on the ray's screen direction.\n    vec2 deltaP = (hitUV - vUv) * uBufferSize;\n    float adjacentLength = length(deltaP);\n    vec2 adjacentUnit = (adjacentLength > 0.0) ? (deltaP / adjacentLength) : vec2(0.0);\n    // The resolved hit can land on this very pixel; a zero-height triangle\n    // has no incircle (0 / 0), so keep the cone a sliver long.\n    adjacentLength = max(adjacentLength, 1e-3);\n\n    vec4 colorSum = vec4(0.0);\n    float remaining = 1.0;\n    float maxMipLevel = float(uNumMips) - 1.0;\n    float glossMult = gloss;\n\n    // Approximate cone tracing in screen space with isosceles triangle\n    for (int i = 0; i < ITERATION; ++i) {\n        float oppositeLength = isoscelesTriangleOpposite(adjacentLength, coneTheta);\n        float incircleSize = isoscelesTriangleInRadius(oppositeLength, adjacentLength);\n\n        vec2 samplePos = vUv + adjacentUnit * (adjacentLength - incircleSize) / uBufferSize;\n\n        float mipChannel = clamp(log2(incircleSize), 0.0, maxMipLevel);\n\n        // Clip the last disc against what is left of the budget so the weights\n        // sum to exactly 1 once the cone is covered. The previous form scaled\n        // only the colour by `1 - abs(remainingAlpha)`, which is not the factor\n        // that closes the sum, and left the accumulated weight overshooting.\n        float weight = min(glossMult, remaining);\n        colorSum += textureLod(uColorBuffer, samplePos, mipChannel) * weight;\n        remaining -= weight;\n\n        if (remaining <= 0.0) {\n            break;\n        }\n\n        adjacentLength = isoscelesTriangleNextAdjacent(adjacentLength, incircleSize);\n        glossMult *= gloss;\n    }\n\n    vec3 toEye = -toViewPosition;\n    float ndotV = clamp(abs(dot(normalVS, toEye)), 0.0, 1.0);\n    vec3 specularF = F_Schlick(specularAll.rgb, 1.0, ndotV);\n\n    // fades\n    vec2 boundary = abs(hitUV - vec2(0.5)) * 2.0;\n    float fadeDiffRcp = 1.0 / (uFadeEnd - uFadeStart);\n    float fadeOnBorder = 1.0 - clamp((boundary.x - uFadeStart) * fadeDiffRcp, 0.0, 1.0);\n    fadeOnBorder *= 1.0 - clamp((boundary.y - uFadeStart) * fadeDiffRcp, 0.0, 1.0);\n    fadeOnBorder = smoothstep(0.0, 1.0, fadeOnBorder);\n\n    float rayDepth = reverseLogDepth(hitDepth, cameraNear, cameraFar);\n\n    vec3 rayHitViewPosition = screenToView(\n        hitUV,\n        rayDepth,\n        getViewZ(rayDepth),\n        projectionMatrix,\n        inverseProjectionMatrix\n    );\n    float fadeOnDistance = 1.0 - clamp(distance(rayHitViewPosition, viewPosition) / uMaxDistance, 0.0, 1.0);\n\n    float fadeOnPerpendicular = clamp(mix(0.0, 1.0, clamp(fade * 4.0, 0.0, 1.0)), 0.0, 1.0);\n    float fadeOnRoughness    = clamp(mix(0.0, 1.0, clamp(gloss * 4.0, 0.0, 1.0)), 0.0, 1.0);\n    float totalFade = coverage * fadeOnBorder * fadeOnDistance * fadeOnPerpendicular * fadeOnRoughness;\n\n    // Weighted average of the cone's discs, normalised by the accumulated\n    // alpha: that is the sum of the weights wherever the footprint is all\n    // geometry, and otherwise renormalises over the geometry left once the\n    // prefilter's sky mask drops the rest. The division matters once the\n    // gloss^k series stops reaching 1, which happens below gloss 0.5 (roughness\n    // above 0.5): the colour would otherwise stay scaled by a weight under one.\n    vec3 conedColor = colorSum.rgb / max(colorSum.a, 1e-4);\n    // Share of the footprint that is geometry. A footprint all on sky has\n    // nothing to reflect, and must not replace the surface colour with black.\n    float geometryCoverage = colorSum.a / max(1.0 - remaining, 1e-4);\n    // Undo the prefilter's compression (coneTracingPrefilter.frag.glsl).\n    float conedLuma = dot(conedColor, vec3(0.2126, 0.7152, 0.0722));\n    conedColor /= max(1.0 - conedLuma * uPrefilterExposure, 1e-4);\n\n    // Premultiplied so the composite can filter this buffer when it upsamples:\n    // interpolating a premultiplied colour across the edge of a reflection is\n    // exact, whereas straight colour would drag reflection into pixels whose\n    // coverage is on its way to zero.\n    // Alpha carries the Fresnel term too, so the composite replaces only the\n    // share of the surface colour that is specular reflection - at normal\n    // incidence water keeps its own colour and reflects 2%.\n    float reflectance = specularF.g * totalFade * geometryCoverage;\n    gl_FragColor = vec4(conedColor * reflectance, reflectance);\n}", ky = {
	numMips: 7,
	fadeStart: .9,
	fadeEnd: 1,
	maxDistance: 500,
	iteration: 14,
	resolveKernelSize: 3
}, Ay = class extends O {
	constructor(e) {
		let { colorBuffer: t = null, rayTracingBuffer: n = null, normalBuffer: r = null, specularBuffer: i = null, indirectSpecularBuffer: a = null, numMips: o, fadeStart: s, fadeEnd: c, maxDistance: l, iteration: u, resolveKernelSize: d } = {
			...ky,
			...e
		};
		super({
			name: "ConeTracingMaterial",
			fragmentShader: uo(Oy, { core: {
				depth: Do,
				packing: jo,
				transform: No
			} }),
			vertexShader: Ey,
			uniforms: {
				uDepthBuffer: new k(null),
				inputBuffer: new k(null),
				uColorBuffer: new k(t),
				uRayTracingBuffer: new k(n),
				uNormalBuffer: new k(r),
				uSpecularBuffer: new k(i),
				uIndirectSpecularBuffer: new k(a),
				uBufferSize: new k(new A()),
				uRayTexelSize: new k(new A()),
				uNumMips: new k(o),
				uPrefilterExposure: new k(1),
				uFadeStart: new k(s),
				uFadeEnd: new k(c),
				uMaxDistance: new k(l),
				cameraNear: new k(0),
				cameraFar: new k(1),
				projectionMatrix: new k(new E()),
				inverseProjectionMatrix: new k(new E())
			},
			defines: {
				DEPTH_PACKING: "0",
				ITERATION: u,
				RESOLVE_KERNEL: d
			},
			blending: At,
			toneMapped: !1,
			depthWrite: !1,
			depthTest: !1
		});
	}
	setSize(e, t) {
		this.uniforms.uBufferSize.value.set(e, t);
	}
	setRayBufferSize(e, t) {
		this.uniforms.uRayTexelSize.value.set(1 / e, 1 / t);
	}
	copyCameraSettings(e) {
		if (e == null) return;
		let t = this.uniforms;
		t.cameraNear.value = e.near, t.cameraFar.value = e.far, t.projectionMatrix.value.copy(e.projectionMatrix), t.inverseProjectionMatrix.value.copy(e.projectionMatrixInverse), e instanceof Pt ? this.defines.PERSPECTIVE_CAMERA !== "1" && (this.defines.PERSPECTIVE_CAMERA = "1", this.needsUpdate = !0) : this.defines.PERSPECTIVE_CAMERA != null && (delete this.defines.PERSPECTIVE_CAMERA, this.needsUpdate = !0);
	}
	get depthBuffer() {
		return this.uniforms.uDepthBuffer.value;
	}
	set depthBuffer(e) {
		this.uniforms.uDepthBuffer.value = e;
	}
	get colorBuffer() {
		return this.uniforms.uColorBuffer.value;
	}
	set colorBuffer(e) {
		this.uniforms.uColorBuffer.value = e;
	}
	get inputBuffer() {
		return this.uniforms.inputBuffer.value;
	}
	set inputBuffer(e) {
		this.uniforms.inputBuffer.value = e;
	}
	get rayTracingBuffer() {
		return this.uniforms.uRayTracingBuffer.value;
	}
	set rayTracingBuffer(e) {
		this.uniforms.uRayTracingBuffer.value = e;
	}
	get normalBuffer() {
		return this.uniforms.uNormalBuffer.value;
	}
	set normalBuffer(e) {
		this.uniforms.uNormalBuffer.value = e;
	}
	get specularBuffer() {
		return this.uniforms.uSpecularBuffer.value;
	}
	set specularBuffer(e) {
		this.uniforms.uSpecularBuffer.value = e;
	}
	get indirectSpecularBuffer() {
		return this.uniforms.uIndirectSpecularBuffer.value;
	}
	set indirectSpecularBuffer(e) {
		this.uniforms.uIndirectSpecularBuffer.value = e;
	}
	get fadeStart() {
		return this.uniforms.uFadeStart.value;
	}
	set fadeStart(e) {
		this.uniforms.uFadeStart.value = e;
	}
	get fadeEnd() {
		return this.uniforms.uFadeEnd.value;
	}
	set fadeEnd(e) {
		this.uniforms.uFadeEnd.value = e;
	}
	get maxDistance() {
		return this.uniforms.uMaxDistance.value;
	}
	set maxDistance(e) {
		this.uniforms.uMaxDistance.value = e;
	}
	get iteration() {
		return +this.defines.ITERATION;
	}
	set iteration(e) {
		this.defines.ITERATION = e, this.needsUpdate = !0;
	}
	get resolveKernelSize() {
		return +this.defines.RESOLVE_KERNEL;
	}
	set resolveKernelSize(e) {
		e !== this.resolveKernelSize && (this.defines.RESOLVE_KERNEL = e, this.needsUpdate = !0);
	}
}, jy = {
	coneTracingFadeStart: ky.fadeStart,
	coneTracingFadeEnd: ky.fadeEnd,
	coneTracingMaxDistance: ky.maxDistance,
	coneTracingIteration: ky.iteration,
	resolveKernelSize: ky.resolveKernelSize,
	rayTracingBuffer: null,
	normalBuffer: null
}, My = class extends An {
	coneTracingMaterial;
	prefilterMaterial;
	prefilterPass;
	mippedRenderTarget;
	compressColor = !1;
	constructor(e) {
		let { rayTracingBuffer: t, normalBuffer: n, ...r } = {
			...ky,
			...jy,
			...e
		}, i = new Ay({
			...ky,
			...r,
			rayTracingBuffer: t,
			normalBuffer: n
		});
		super(i), this.coneTracingMaterial = i, this.mippedRenderTarget = new N(1, 1, {
			generateMipmaps: !0,
			minFilter: yt
		}), i.colorBuffer = this.mippedRenderTarget.texture, this.prefilterMaterial = new O({
			name: "ConeTracingPrefilterMaterial",
			fragmentShader: Dy,
			vertexShader: Ey,
			uniforms: {
				inputBuffer: new k(null),
				depthBuffer: new k(null),
				exposure: new k(1),
				resolution: new k(new A(1, 1))
			},
			blending: At,
			toneMapped: !1,
			depthWrite: !1,
			depthTest: !1
		}), this.prefilterPass = new An(this.prefilterMaterial);
	}
	update(e, t, n) {
		let r = this.compressColor ? e.toneMappingExposure : 0;
		this.prefilterMaterial.uniforms.exposure.value = r, this.coneTracingMaterial.uniforms.uPrefilterExposure.value = r, this.prefilterPass.render(e, t, this.mippedRenderTarget);
	}
	initialize(e, t, n) {
		super.initialize(e, t, n), this.prefilterPass.initialize(e, t, n), n !== void 0 && (this.mippedRenderTarget.texture.type = n), this.compressColor = this.mippedRenderTarget.texture.type !== sn;
	}
	setDepthTexture(e, t) {
		this.coneTracingMaterial.depthBuffer = e, this.prefilterMaterial.uniforms.depthBuffer.value = e;
	}
	setSize(e, t) {
		this.coneTracingMaterial.setSize(e, t), this.mippedRenderTarget.setSize(e, t), this.prefilterMaterial.uniforms.resolution.value.set(e, t);
		let n = Math.floor(Math.log2(Math.max(e, t))) + 1;
		this.coneTracingMaterial.uniforms.uNumMips.value = n;
	}
}, Ny = "// Research and development by https://github.com/takram-design-engineering\n\n// Based on the following work and adapted to Three.js.\n// https://github.com/kode80/kode80SSR/blob/master/Assets/Resources/Shaders/SSR.shader\n//\n//  Copyright (c) 2015, Ben Hopkins (kode80)\n//  All rights reserved.\n//\n//  Redistribution and use in source and binary forms, with or without modification,\n//  are permitted provided that the following conditions are met:\n//\n//  1. Redistributions of source code must retain the above copyright notice,\n//     this list of conditions and the following disclaimer.\n//\n//  2. Redistributions in binary form must reproduce the above copyright notice,\n//     this list of conditions and the following disclaimer in the documentation\n//     and/or other materials provided with the distribution.\n//\n//  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS \"AS IS\" AND ANY\n//  EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF\n//  MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL\n//  THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,\n//  SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT\n//  OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION)\n//  HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT\n//  (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,\n//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.\n\n#include <common>\n#include <packing>\n\n#include \"core/depth\"\n#include \"core/interleavedGradientNoise\"\n#include \"core/packing\"\n#include \"core/transform\"\n\nuniform sampler2D inputBuffer;\nuniform sampler2D geometryBuffer;\nuniform sampler2D depthBuffer;\n\nuniform vec2 resolution;\nuniform vec2 texelSize;\nuniform float cameraNear;\nuniform float cameraFar;\nuniform mat4 projectionMatrix;\nuniform mat4 inverseProjectionMatrix;\n\nuniform float iterations;\nuniform float binarySearchIterations;\nuniform float pixelZSize;\nuniform float pixelStride;\nuniform float pixelStrideZCutoff;\nuniform float pixelRatio;\nuniform float maxRayDistance;\nuniform float screenEdgeFadeStart;\nuniform float eyeFadeStart;\nuniform float eyeFadeEnd;\nuniform float jitter;\n\nin vec2 vUv;\n\n// What a pixel writes when it produces no reflection. With cone tracing the\n// buffer carries hit coordinates rather than colour, and .w carries a signed\n// rdotv fade that legitimately goes negative at near-normal incidence — so a\n// miss cannot be encoded there. A negative .z can never be a real depth, which\n// leaves the resolve pass able to tell \"no hit\" from \"hit that faces the eye\".\n#ifdef GENERATE_RAY_TRACING_BUFFER\n#define SSR_NO_HIT vec4(0.0, 0.0, -1.0, 0.0)\n#else\n#define SSR_NO_HIT vec4(0.0)\n#endif\n\nfloat readDepth(const vec2 uv) {\n  #if DEPTH_PACKING == 3201\n  return unpackRGBAToDepth(texture2D(depthBuffer, uv));\n  #else\n  return texture2D(depthBuffer, uv).r;\n  #endif // DEPTH_PACKING == 3201\n}\n\nfloat getViewZ(const float depth) {\n  #ifdef PERSPECTIVE_CAMERA\n  return perspectiveDepthToViewZ(depth, cameraNear, cameraFar);\n  #else\n  return orthographicDepthToViewZ(depth, cameraNear, cameraFar);\n  #endif\n}\n\nvoid swapIfBigger(inout float aa, inout float bb) {\n  if (aa > bb) {\n    float tmp = aa;\n    aa = bb;\n    bb = tmp;\n  }\n}\n\nfloat distanceSquared(vec2 a, vec2 b) {\n  a -= b;\n  return dot(a, a);\n}\n\nfloat readSceneViewZ(vec2 uv) {\n  return getViewZ(reverseLogDepth(readDepth(uv), cameraNear, cameraFar));\n}\n\nbool rayIntersectsDepth(float zA, float zB, float sceneZMax) {\n  float sceneZMin = sceneZMax - pixelZSize;\n  return zB >= sceneZMin && zA <= sceneZMax;\n}\n\n// Trace a ray in screenspace from rayOrg (in camera space) pointing in\n// rayDirection (in camera space) using jitter to offset the ray based on\n// (jitter * pixelStride).\n// Returns true if the ray hits a pixel in the depth buffer and outputs the\n// hitPixel (in UV space), the hitPoint (in camera space) and the number of\n// iterations it took to get there.\n//\n// Based on Morgan McGuire & Mike's GLSL implementation:\n// http://casual-effects.blogspot.com/2014/08/screen-space-ray-tracing.html\nbool traceScreenSpaceRay(\n  vec3 rayOrigin,\n  vec3 rayDirection,\n  float jitter,\n  out vec2 hitPixel,\n  out vec3 hitPoint,\n  out float iterationCount\n) {\n  // Clip to the near plane\n  float rayLength =\n    rayOrigin.z + rayDirection.z * maxRayDistance > -cameraNear\n      ? (-cameraNear - rayOrigin.z) / rayDirection.z\n      : maxRayDistance;\n  vec3 rayEnd = rayOrigin + rayDirection * rayLength;\n\n  // Project into homogeneous clip space\n  vec4 H0 = projectionMatrix * vec4(rayOrigin, 1.0);\n  vec4 H1 = projectionMatrix * vec4(rayEnd, 1.0);\n  float k0 = 1.0 / H0.w;\n  float k1 = 1.0 / H1.w;\n\n  // The interpolated homogeneous version of the camera-space points\n  vec3 Q0 = rayOrigin * k0;\n  vec3 Q1 = rayEnd * k1;\n\n  // Screen-space endpoints\n  vec2 P0 = H0.xy * k0;\n  vec2 P1 = H1.xy * k1;\n  P0 = (P0 * 0.5 + 0.5) * resolution;\n  P1 = (P1 * 0.5 + 0.5) * resolution;\n\n  // If the line is degenerate, make it cover at least one pixel to avoid\n  // handling zero-pixel extent as a special case later.\n  P1 += distanceSquared(P0, P1) < 0.0001 ? 0.01 : 0.0;\n  vec2 delta = P1 - P0;\n\n  // Permute so that the primary iteration is in x to collapse all quadrant-\n  // specific DDA class later.\n  bool permute = false;\n  if (abs(delta.x) < abs(delta.y)) {\n    // This is a more-vertical line\n    permute = true;\n    delta = delta.yx;\n    P0 = P0.yx;\n    P1 = P1.yx;\n  }\n\n  float stepDirection = sign(delta.x);\n  float invdx = stepDirection / delta.x;\n\n  // Track the derivatives of Q and K\n  vec3 dQ = (Q1 - Q0) * invdx;\n  float dk = (k1 - k0) * invdx;\n  vec2 dP = vec2(stepDirection, delta.y * invdx);\n\n  // Calculate pixel stride based on distance of ray origin from camera.\n  // Since perspective means distant objects will be smaller in screen space,\n  // we can use this to have higher quality reflections for far away objects\n  // while still using a large pixel stride for near objects (and increase\n  // performance). This also helps mitigate artifacts on distance reflections\n  // when we use a large pixel stride.\n  float strideScaler = 1.0 - min(1.0, -rayOrigin.z / pixelStrideZCutoff);\n  // In device pixels, so a fixed iteration budget reaches the same share of\n  // the screen whatever the display density.\n  float pixelStride = (1.0 + strideScaler * pixelStride) * pixelRatio;\n\n  // Scale derivatives by the desired pixel stride and then offset the starting\n  // values by the jitter fraction.\n  dP *= pixelStride;\n  dQ *= pixelStride;\n  dk *= pixelStride;\n  P0 += dP * jitter;\n  Q0 += dQ * jitter;\n  k0 += dk * jitter;\n\n  float zA = 0.0;\n  float zB = 0.0;\n\n  // Track ray step and derivatives in a vec4 to parallelize.\n  vec4 PQK = vec4(P0, Q0.z, k0);\n  vec4 dPQK = vec4(dP, dQ.z, dk);\n  bool intersect = false;\n  bool refined = false;\n  bool wasInFront = true;\n\n  float count = 0.0;\n  for (int i = 0; i < MAX_ITERATIONS; ++i) {\n    if (float(i) >= iterations) {\n      break;\n    }\n    if (intersect) {\n      break;\n    }\n\n    PQK += dPQK;\n    zA = zB;\n    zB = (dPQK.z * 0.5 + PQK.z) / (dPQK.w * 0.5 + PQK.w);\n    swapIfBigger(zB, zA);\n\n    hitPixel = permute ? PQK.yx : PQK.xy;\n    hitPixel *= texelSize;\n    float sceneZ = readSceneViewZ(hitPixel);\n    intersect = rayIntersectsDepth(zA, zB, sceneZ);\n\n    // A strided step can carry the ray from in front of a surface to further\n    // behind it than pixelZSize, which the test above reads as passing behind\n    // an occluder. Surfaces seen edge-on change depth that fast, so bisect the\n    // step and test the thickness where the ray actually crosses.\n    float rayZ = PQK.z / PQK.w;\n    if (!intersect && wasInFront && rayZ <= sceneZ) {\n      vec4 front = PQK - dPQK;\n      vec4 behind = PQK;\n      for (int j = 0; j < MAX_BINARY_SEARCH_ITERATIONS; ++j) {\n        if (float(j) >= binarySearchIterations) {\n          break;\n        }\n        vec4 mid = 0.5 * (front + behind);\n        vec2 midPixel = (permute ? mid.yx : mid.xy) * texelSize;\n        if (mid.z / mid.w <= readSceneViewZ(midPixel)) {\n          behind = mid;\n        } else {\n          front = mid;\n        }\n      }\n\n      vec2 behindPixel = (permute ? behind.yx : behind.xy) * texelSize;\n      float behindZ = behind.z / behind.w;\n      if (rayIntersectsDepth(behindZ, behindZ, readSceneViewZ(behindPixel))) {\n        intersect = true;\n        refined = true;\n        PQK = behind;\n        hitPixel = behindPixel;\n      }\n    }\n    wasInFront = rayZ > sceneZ;\n\n    count = float(i);\n  }\n\n  // Binary search refinement\n  if (pixelStride > 1.0 && intersect && !refined) {\n    float originalStride = pixelStride * 0.5;\n    float stride = originalStride;\n\n    // The search can end on a probe that does not intersect, which near a\n    // silhouette lies off the object the ray hit. Report the closest probe\n    // that did.\n    vec4 hitPQK = PQK;\n    vec2 hitPQKPixel = hitPixel;\n\n    PQK -= dPQK;\n    dPQK /= pixelStride;\n    zA = PQK.z / PQK.w;\n    zB = zA;\n\n    for (int i = 0; i < MAX_BINARY_SEARCH_ITERATIONS; ++i) {\n      if (float(i) >= binarySearchIterations) {\n        break;\n      }\n\n      PQK += dPQK * stride;\n      zA = zB;\n      zB = (dPQK.z * -0.5 + PQK.z) / (dPQK.w * -0.5 + PQK.w);\n      swapIfBigger(zB, zA);\n\n      hitPixel = permute ? PQK.yx : PQK.xy;\n      hitPixel *= texelSize;\n\n      originalStride *= 0.5;\n      if (rayIntersectsDepth(zA, zB, readSceneViewZ(hitPixel))) {\n        hitPQK = PQK;\n        hitPQKPixel = hitPixel;\n        stride = -originalStride;\n      } else {\n        stride = originalStride;\n      }\n    }\n\n    PQK = hitPQK;\n    hitPixel = hitPQKPixel;\n  }\n\n  Q0.xy += dQ.xy * count;\n  Q0.z = PQK.z;\n  hitPoint = Q0 / PQK.w;\n  iterationCount = count;\n\n  return intersect;\n}\n\n// https://github.com/kode80/kode80SSR\nfloat calculateAlphaForIntersection(\n  bool intersect,\n  float iterationCount,\n  float specularStrength,\n  vec2 hitPixel,\n  vec3 hitPoint,\n  vec3 rayOrigin,\n  vec3 rayDirection\n) {\n  float alpha = 1.0;\n  // float alpha = min(1.0, specularStrength);\n\n  // Fade ray hits test approach the maximum iterations.\n  alpha *= 1.0 - iterationCount / iterations;\n\n  // Fade ray hits that approach the screen edge.\n  float screenFade = screenEdgeFadeStart;\n  vec2 hitPixelNDC = hitPixel * 2.0 - 1.0;\n  float maxDistance = min(1.0, max(abs(hitPixelNDC.x), abs(hitPixelNDC.y)));\n  alpha *= 1.0 - max(0.0, maxDistance - screenFade) / (1.0 - screenFade);\n\n  // Fade ray hits base on how much they face the camera.\n  float eyeFadeStart = eyeFadeStart;\n  float eyeFadeEnd = eyeFadeEnd;\n  swapIfBigger(eyeFadeStart, eyeFadeEnd);\n  float eyeDirection = clamp(rayDirection.z, eyeFadeStart, eyeFadeEnd);\n  alpha *= 1.0 - (eyeDirection - eyeFadeStart) / (eyeFadeEnd - eyeFadeStart);\n\n  // Fade ray hits based on distance from ray origin.\n  float rayDistance = distance(rayOrigin, hitPoint);\n  alpha *= 1.0 - clamp(rayDistance / maxRayDistance, 0.0, 1.0);\n\n  alpha *= intersect ? 1.0 : 0.0;\n\n  return alpha;\n}\n\n// TODO: Use blue noise.\nvec2 whiteNoise(vec3 v) {\n  v = fract(v * vec3(443.897, 441.423, 0.0973));\n  v += dot(v, v.yzx + 19.19);\n  return fract((v.xx + v.yz) * v.zy);\n}\n\n// Source: https://github.com/tuxalin/vulkanri/blob/master/examples/pbr_ibl/shaders/importanceSampleGGX.glsl\nvec3 sampleGGX(const vec3 n, const vec2 u, float roughness) {\n  float alpha = roughness * roughness;\n  float alpha2 = alpha * alpha;\n\n  float phi = 2.0 * PI * u.x;\n  float cosTheta = sqrt((1.0 - u.y) / (1.0 + (alpha2 - 1.0) * u.y));\n  float sinTheta = sqrt(1.0 - cosTheta * cosTheta);\n\n  vec3 H;\n  H.x = cos(phi) * sinTheta;\n  H.y = sin(phi) * sinTheta;\n  H.z = cosTheta;\n\n  vec3 up = abs(n.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);\n  vec3 tangent = normalize(cross(up, n));\n  vec3 bitangent = cross(n, tangent);\n\n  vec3 sampleVec = tangent * H.x + bitangent * H.y + n * H.z;\n  return normalize(sampleVec);\n}\n\nvoid main() {\n  vec4 geometry = texture2D(geometryBuffer, vUv);\n  float reflectance = geometry.z;\n  float roughness = geometry.w;\n  // Every early-out below must still write gl_FragColor. The output target is\n  // never cleared (postprocessing's ShaderPass doesn't clear and the composer\n  // disables autoClear), so a bare return leaves the fragment undefined, which\n  // surfaces as tile-shaped garbage on tiled GPUs.\n  // Same gate as coneTracing.frag.glsl, which reads this buffer's misses.\n  if (reflectance < 0.01 || roughness >= 1.0) {\n    gl_FragColor = SSR_NO_HIT;\n    return;\n  }\n\n  float depth = readDepth(vUv);\n  if (depth > 0.9999) {\n    gl_FragColor = SSR_NO_HIT;\n    return;\n  }\n  depth = reverseLogDepth(depth, cameraNear, cameraFar);\n  float viewZ = getViewZ(depth);\n\n  vec3 viewPosition = screenToView(\n    vUv,\n    depth,\n    viewZ,\n    projectionMatrix,\n    inverseProjectionMatrix\n  );\n  vec3 viewNormal = unpackVec2ToNormal(geometry.xy);\n\n  vec3 rayOrigin = viewPosition;\n  vec3 rayDirection = reflect(normalize(rayOrigin), viewNormal);\n\n  #ifndef GENERATE_RAY_TRACING_BUFFER\n    // Scale the GGX lobe by the reflectance so barely-reflective surfaces\n    // don't scatter their rays.\n    float scaledRoughness = reflectance * roughness;\n    if (scaledRoughness > 0.0001) {\n      rayDirection = sampleGGX(\n        rayDirection,\n        whiteNoise(vec3(vUv, 0.0)),\n        scaledRoughness\n      );\n    }\n  #endif\n\n  // Interleaved gradient noise rather than a fixed 4-pixel diagonal ramp: the\n  // resolve pass averages each pixel's neighbours, so their offsets have to be\n  // decorrelated to act as extra samples of the same lobe instead of replaying\n  // the same handful of phases over and over.\n  float jitter = interleavedGradientNoise(vUv * resolution) * jitter;\n\n  vec2 hitPixel;\n  vec3 hitPoint;\n  float iterationCount;\n\n  bool intersect = traceScreenSpaceRay(\n    rayOrigin,\n    rayDirection,\n    jitter,\n    hitPixel,\n    hitPoint,\n    iterationCount\n  );\n\n  // Bail before the fades rather than after: they end up multiplied by zero\n  // for a ray that hit nothing, and a miss is the common case.\n  if (!intersect) {\n    gl_FragColor = SSR_NO_HIT;\n    return;\n  }\n\n  float alpha = calculateAlphaForIntersection(\n    intersect,\n    iterationCount,\n    1.0,\n    hitPixel,\n    hitPoint,\n    rayOrigin,\n    rayDirection\n  );\n\n  // A hit the fades cancel must read as a miss: the resolve pass averages the\n  // hit coordinates of every valid neighbour, and a ray that ran to the screen\n  // border would drag that average off the reflected object.\n  if (alpha <= 0.0) {\n    gl_FragColor = SSR_NO_HIT;\n    return;\n  }\n\n  // Ref: https://willpgfx.com/2015/07/screen-space-glossy-reflections/\n  #ifdef GENERATE_RAY_TRACING_BUFFER\n\n    // How much the reflected ray turns back towards the eye. Rays that do are\n    // unreliable in screen space, so the resolve fades them out; it goes\n    // negative at near-normal incidence, which is why validity lives in .z.\n    float rdotv = dot(rayDirection, normalize(rayOrigin));\n\n    // Store ray tracing results in a format compatible with cone tracing\n    // x,y = hit UV coordinates\n    // z = hit depth at the hit point (negative marks a miss)\n    // w = rdotv * alpha (fade only)\n    float hitDepth = readDepth(hitPixel);\n    gl_FragColor = vec4(hitPixel.x, hitPixel.y, hitDepth, rdotv * alpha);\n  #else\n    // Premultiplied, with the Fresnel term in alpha, matching the cone\n    // tracing path so that either buffer composites the same way.\n    float dotNV = clamp(abs(dot(viewNormal, -normalize(viewPosition))), 0.0, 1.0);\n    alpha *= F_Schlick(vec3(reflectance), 1.0, dotNV).g;\n    vec3 color = texture2D(inputBuffer, hitPixel).rgb;\n    gl_FragColor = vec4(color * alpha, alpha);\n  #endif\n  \n}\n", Py = "// Research and development by https://github.com/takram-design-engineering\n\nout vec2 vUv;\n\nvoid main() {\n  vUv = position.xy * 0.5 + 0.5;\n  gl_Position = vec4(position.xy, 1.0, 1.0);\n}\n", Fy = {
	iterations: 200,
	binarySearchIterations: 4,
	pixelZSize: .02,
	pixelStride: 1,
	pixelStrideZCutoff: 100,
	maxRayDistance: 10,
	screenEdgeFadeStart: .75,
	eyeFadeStart: 0,
	eyeFadeEnd: 1,
	jitter: 0,
	generateRayTracingBuffer: !0
}, Iy = class extends O {
	constructor(e) {
		let { inputBuffer: t = null, geometryBuffer: n = null, depthBuffer: r = null, iterations: i, binarySearchIterations: a, pixelZSize: o, pixelStride: s, pixelStrideZCutoff: c, maxRayDistance: l, screenEdgeFadeStart: u, eyeFadeStart: d, eyeFadeEnd: f, jitter: p, generateRayTracingBuffer: m } = {
			...Fy,
			...e
		};
		super({
			name: "SSRMaterial",
			fragmentShader: uo(Ny, { core: {
				depth: Do,
				interleavedGradientNoise: ko,
				packing: jo,
				transform: No
			} }),
			vertexShader: Py,
			uniforms: {
				inputBuffer: new k(t),
				geometryBuffer: new k(n),
				depthBuffer: new k(r),
				projectionMatrix: new k(new E()),
				inverseProjectionMatrix: new k(new E()),
				resolution: new k(new A()),
				texelSize: new k(new A()),
				cameraNear: new k(0),
				cameraFar: new k(1),
				iterations: new k(i),
				binarySearchIterations: new k(a),
				pixelZSize: new k(o),
				pixelStride: new k(s),
				pixelStrideZCutoff: new k(c),
				pixelRatio: new k(1),
				maxRayDistance: new k(l),
				screenEdgeFadeStart: new k(u),
				eyeFadeStart: new k(d),
				eyeFadeEnd: new k(f),
				jitter: new k(p)
			},
			defines: {
				DEPTH_PACKING: "0",
				MAX_ITERATIONS: "1000",
				MAX_BINARY_SEARCH_ITERATIONS: "64",
				...m ? { GENERATE_RAY_TRACING_BUFFER: "1" } : {}
			},
			blending: At,
			toneMapped: !1,
			depthWrite: !1,
			depthTest: !1
		});
	}
	setSize(e, t) {
		this.uniforms.resolution.value.set(e, t), this.uniforms.texelSize.value.set(1 / e, 1 / t);
	}
	copyCameraSettings(e) {
		if (e == null) return;
		let t = this.uniforms;
		t.cameraNear.value = e.near, t.cameraFar.value = e.far, t.projectionMatrix.value.copy(e.projectionMatrix), t.inverseProjectionMatrix.value.copy(e.projectionMatrixInverse), e instanceof Pt ? this.defines.PERSPECTIVE_CAMERA !== "1" && (this.defines.PERSPECTIVE_CAMERA = "1", this.needsUpdate = !0) : this.defines.PERSPECTIVE_CAMERA != null && (delete this.defines.PERSPECTIVE_CAMERA, this.needsUpdate = !0);
	}
	get inputBuffer() {
		return this.uniforms.inputBuffer.value;
	}
	set inputBuffer(e) {
		this.uniforms.inputBuffer.value = e;
	}
	get geometryBuffer() {
		return this.uniforms.geometryBuffer.value;
	}
	set geometryBuffer(e) {
		this.uniforms.geometryBuffer.value = e;
	}
	get depthBuffer() {
		return this.uniforms.depthBuffer.value;
	}
	set depthBuffer(e) {
		this.uniforms.depthBuffer.value = e;
	}
	get depthPacking() {
		return +this.defines.DEPTH_PACKING;
	}
	set depthPacking(e) {
		e !== this.depthPacking && (this.defines.DEPTH_PACKING = `${e}`, this.needsUpdate = !0);
	}
	get generateRayTracingBuffer() {
		return !!this.defines.GENERATE_RAY_TRACING_BUFFER;
	}
	set generateRayTracingBuffer(e) {
		e ? this.defines.GENERATE_RAY_TRACING_BUFFER = "1" : delete this.defines.GENERATE_RAY_TRACING_BUFFER;
	}
}, Ly = {
	blendMode: "normal",
	...jy
}, Ry = class extends gn {
	camera;
	resolution;
	renderTarget;
	ssrMaterial;
	ssrPass;
	coneRenderTarget;
	coneTracingPass;
	_useConeTracing;
	constructor(e, t) {
		let { blendMode: n, geometryBuffer: r = null, resolutionScale: i = .5, width: a, height: o, resolutionX: s = a, resolutionY: c = o, coneTracingFadeStart: l, coneTracingFadeEnd: u, coneTracingMaxDistance: d, coneTracingIteration: f, resolveKernelSize: p, useConeTracing: m, ...h } = {
			...Fy,
			...Ly,
			...t
		};
		super("SSREffect", Ty, {
			blendFunction: ne(n),
			attributes: _n.DEPTH,
			uniforms: /* @__PURE__ */ new Map([["ssrBuffer", new k(null)]])
		}), this.camera = e, this.renderTarget = new N(1, 1, {
			depthBuffer: !1,
			stencilBuffer: !1,
			type: nt
		}), this.renderTarget.texture.name = "SSR.Reflection", this.ssrMaterial = new Iy({
			...h,
			generateRayTracingBuffer: m
		}), this.ssrPass = new An(this.ssrMaterial), this.ssrMaterial.geometryBuffer = r, this.coneRenderTarget = new N(1, 1, {
			depthBuffer: !1,
			stencilBuffer: !1
		}), this.coneRenderTarget.texture.name = "ConeSSR.Reflection", this.coneTracingPass = new My({
			fadeStart: l,
			fadeEnd: u,
			maxDistance: d,
			rayTracingBuffer: this.renderTarget.texture,
			normalBuffer: r,
			specularBuffer: null,
			indirectSpecularBuffer: null,
			iteration: f,
			resolveKernelSize: p
		}), this._useConeTracing = !!m, this.updateRayTracingBufferFilter();
		let g = this.uniforms.get("ssrBuffer");
		g && (g.value = m ? this.coneRenderTarget.texture : this.renderTarget.texture), e != null && (this.mainCamera = e), this.resolution = new Dn(this, s, c, i), this.resolution.addEventListener("change", this.onResolutionChange);
	}
	onResolutionChange = () => {
		this.setSize(this.resolution.baseWidth, this.resolution.baseHeight);
	};
	updateRayTracingBufferFilter() {
		let e = this._useConeTracing ? kt : T, t = this.renderTarget.texture;
		t.minFilter !== e && (t.minFilter = e, t.magFilter = e, t.needsUpdate = !0);
	}
	get mainCamera() {
		return this.camera;
	}
	set mainCamera(e) {
		this.camera = e, this.ssrMaterial.copyCameraSettings(e), this.coneTracingPass.coneTracingMaterial.copyCameraSettings(this.camera);
	}
	initialize(e, t, n) {
		this.ssrPass.initialize(e, t, n), this.coneTracingPass.initialize(e, t, n), n !== void 0 && (this.coneRenderTarget.texture.type = n);
	}
	update(e, t, n) {
		this.ssrMaterial.uniforms.pixelRatio.value = e.getPixelRatio(), this.ssrPass.render(e, t, this.renderTarget), this.useConeTracing && (this.coneTracingPass.update(e, t, n), this.coneTracingPass.render(e, t, this.coneRenderTarget));
	}
	setSize(e, t) {
		let n = this.resolution;
		n.setBaseSize(e, t), this.renderTarget.setSize(n.width, n.height), this.ssrMaterial.setSize(n.width, n.height), this.ssrMaterial.copyCameraSettings(this.camera), this.coneRenderTarget.setSize(n.width, n.height), this.coneTracingPass.setSize(n.width, n.height), this.coneTracingPass.coneTracingMaterial.setRayBufferSize(n.width, n.height), this.coneTracingPass.coneTracingMaterial.copyCameraSettings(this.camera);
	}
	setDepthTexture(e, t) {
		this.ssrMaterial.depthBuffer = e, this.ssrMaterial.depthPacking = t ?? 0, this.coneTracingPass.setDepthTexture(e, t);
	}
	get resolutionScale() {
		return this.resolution.scale;
	}
	set resolutionScale(e) {
		this.resolution.scale = e;
	}
	get geometryBuffer() {
		return this.ssrMaterial.geometryBuffer;
	}
	set geometryBuffer(e) {
		this.ssrMaterial.geometryBuffer = e, this.coneTracingPass.coneTracingMaterial.normalBuffer = e;
	}
	get iterations() {
		return this.ssrMaterial.uniforms.iterations.value;
	}
	set iterations(e) {
		this.ssrMaterial.uniforms.iterations.value = e;
	}
	get binarySearchIterations() {
		return this.ssrMaterial.uniforms.binarySearchIterations.value;
	}
	set binarySearchIterations(e) {
		this.ssrMaterial.uniforms.binarySearchIterations.value = e;
	}
	get pixelZSize() {
		return this.ssrMaterial.uniforms.pixelZSize.value;
	}
	set pixelZSize(e) {
		this.ssrMaterial.uniforms.pixelZSize.value = e;
	}
	get pixelStride() {
		return this.ssrMaterial.uniforms.pixelStride.value;
	}
	set pixelStride(e) {
		this.ssrMaterial.uniforms.pixelStride.value = e;
	}
	get pixelStrideZCutoff() {
		return this.ssrMaterial.uniforms.pixelStrideZCutoff.value;
	}
	set pixelStrideZCutoff(e) {
		this.ssrMaterial.uniforms.pixelStrideZCutoff.value = e;
	}
	get maxRayDistance() {
		return this.ssrMaterial.uniforms.maxRayDistance.value;
	}
	set maxRayDistance(e) {
		this.ssrMaterial.uniforms.maxRayDistance.value = e;
	}
	get screenEdgeFadeStart() {
		return this.ssrMaterial.uniforms.screenEdgeFadeStart.value;
	}
	set screenEdgeFadeStart(e) {
		this.ssrMaterial.uniforms.screenEdgeFadeStart.value = e;
	}
	get eyeFadeStart() {
		return this.ssrMaterial.uniforms.eyeFadeStart.value;
	}
	set eyeFadeStart(e) {
		this.ssrMaterial.uniforms.eyeFadeStart.value = e;
	}
	get eyeFadeEnd() {
		return this.ssrMaterial.uniforms.eyeFadeEnd.value;
	}
	set eyeFadeEnd(e) {
		this.ssrMaterial.uniforms.eyeFadeEnd.value = e;
	}
	get jitter() {
		return this.ssrMaterial.uniforms.jitter.value;
	}
	set jitter(e) {
		this.ssrMaterial.uniforms.jitter.value = e;
	}
	get useConeTracing() {
		return this._useConeTracing;
	}
	set useConeTracing(e) {
		this._useConeTracing = e, this.updateRayTracingBufferFilter();
		let t = this.uniforms.get("ssrBuffer");
		this.ssrMaterial.generateRayTracingBuffer = e, this.ssrMaterial.needsUpdate = !0, t && (t.value = e ? this.coneRenderTarget.texture : this.renderTarget.texture);
	}
	get coneTracingFadeStart() {
		return this.coneTracingPass.coneTracingMaterial.fadeStart;
	}
	set coneTracingFadeStart(e) {
		this.coneTracingPass.coneTracingMaterial.fadeStart = e;
	}
	get coneTracingFadeEnd() {
		return this.coneTracingPass.coneTracingMaterial.fadeEnd;
	}
	set coneTracingFadeEnd(e) {
		this.coneTracingPass.coneTracingMaterial.fadeEnd = e;
	}
	get coneTracingMaxDistance() {
		return this.coneTracingPass.coneTracingMaterial.maxDistance;
	}
	set coneTracingMaxDistance(e) {
		this.coneTracingPass.coneTracingMaterial.maxDistance = e;
	}
	get coneTracingIteration() {
		return this.coneTracingPass.coneTracingMaterial.iteration;
	}
	set coneTracingIteration(e) {
		this.coneTracingPass.coneTracingMaterial.iteration = e;
	}
	get resolveKernelSize() {
		return this.coneTracingPass.coneTracingMaterial.resolveKernelSize;
	}
	set resolveKernelSize(e) {
		this.coneTracingPass.coneTracingMaterial.resolveKernelSize = e;
	}
}, Q = {
	enabled: !1,
	geometryBuffer: null,
	resolutionScale: .5,
	iterations: 100,
	binarySearchIterations: 4,
	pixelZSize: 100,
	pixelStride: 5,
	pixelStrideZCutoff: 1e3,
	maxRayDistance: 5e3,
	screenEdgeFadeStart: .75,
	eyeFadeStart: 0,
	eyeFadeEnd: 1,
	jitter: 1,
	blendMode: "normal",
	useConeTracing: !0,
	coneTracingFadeStart: Ly.coneTracingFadeStart,
	coneTracingFadeEnd: Ly.coneTracingFadeEnd,
	coneTracingMaxDistance: Ly.coneTracingMaxDistance,
	coneTracingIteration: Ly.coneTracingIteration,
	resolveKernelSize: Ly.resolveKernelSize
}, zy = class extends s {
	constructor(e, t = {}) {
		let n = {
			...Q,
			...t
		}, r = new Ry(e, {
			geometryBuffer: n.geometryBuffer,
			resolutionScale: n.resolutionScale,
			iterations: n.iterations,
			binarySearchIterations: n.binarySearchIterations,
			pixelZSize: n.pixelZSize,
			pixelStride: n.pixelStride,
			pixelStrideZCutoff: n.pixelStrideZCutoff,
			maxRayDistance: n.maxRayDistance,
			screenEdgeFadeStart: n.screenEdgeFadeStart,
			eyeFadeStart: n.eyeFadeStart,
			eyeFadeEnd: n.eyeFadeEnd,
			jitter: n.jitter,
			blendMode: n.blendMode,
			useConeTracing: n.useConeTracing,
			coneTracingFadeStart: n.coneTracingFadeStart,
			coneTracingFadeEnd: n.coneTracingFadeEnd,
			coneTracingMaxDistance: n.coneTracingMaxDistance,
			coneTracingIteration: n.coneTracingIteration,
			resolveKernelSize: n.resolveKernelSize
		});
		super(e, r, n), this.options = n, this.init();
	}
	init() {
		this.rawEffect && (this.options.resolutionScale !== void 0 && (this.resolutionScale = this.options.resolutionScale), this.options.iterations !== void 0 && (this.iterations = this.options.iterations), this.options.binarySearchIterations !== void 0 && (this.binarySearchIterations = this.options.binarySearchIterations), this.options.pixelZSize !== void 0 && (this.pixelZSize = this.options.pixelZSize), this.options.pixelStride !== void 0 && (this.pixelStride = this.options.pixelStride), this.options.pixelStrideZCutoff !== void 0 && (this.pixelStrideZCutoff = this.options.pixelStrideZCutoff), this.options.maxRayDistance !== void 0 && (this.maxRayDistance = this.options.maxRayDistance), this.options.screenEdgeFadeStart !== void 0 && (this.screenEdgeFadeStart = this.options.screenEdgeFadeStart), this.options.eyeFadeStart !== void 0 && (this.eyeFadeStart = this.options.eyeFadeStart), this.options.eyeFadeEnd !== void 0 && (this.eyeFadeEnd = this.options.eyeFadeEnd), this.options.jitter !== void 0 && (this.jitter = this.options.jitter), this.options.useConeTracing !== void 0 && (this.useConeTracing = this.options.useConeTracing), this.options.coneTracingFadeStart !== void 0 && (this.coneTracingFadeStart = this.options.coneTracingFadeStart), this.options.coneTracingFadeEnd !== void 0 && (this.coneTracingFadeEnd = this.options.coneTracingFadeEnd), this.options.coneTracingMaxDistance !== void 0 && (this.coneTracingMaxDistance = this.options.coneTracingMaxDistance), this.options.coneTracingIteration !== void 0 && (this.coneTracingIteration = this.options.coneTracingIteration));
	}
	get geometryBuffer() {
		return this.rawEffect.geometryBuffer;
	}
	set geometryBuffer(e) {
		this.rawEffect.geometryBuffer = e, this.options.geometryBuffer = e, this.emit("needsUpdate");
	}
	get resolutionScale() {
		return this.options.resolutionScale ?? Q.resolutionScale;
	}
	set resolutionScale(e) {
		this.rawEffect && (this.options.resolutionScale = e, this.rawEffect.resolutionScale = e, this.emit("needsUpdate"));
	}
	get iterations() {
		return this.options.iterations ?? Q.iterations;
	}
	set iterations(e) {
		this.rawEffect && (this.options.iterations = e, this.rawEffect.iterations = e, this.emit("needsUpdate"));
	}
	get binarySearchIterations() {
		return this.options.binarySearchIterations ?? Q.binarySearchIterations;
	}
	set binarySearchIterations(e) {
		this.rawEffect && (this.options.binarySearchIterations = e, this.rawEffect.binarySearchIterations = e, this.emit("needsUpdate"));
	}
	get pixelZSize() {
		return this.options.pixelZSize ?? Q.pixelZSize;
	}
	set pixelZSize(e) {
		this.rawEffect && (this.options.pixelZSize = e, this.rawEffect.pixelZSize = e, this.emit("needsUpdate"));
	}
	get pixelStride() {
		return this.options.pixelStride ?? Q.pixelStride;
	}
	set pixelStride(e) {
		this.rawEffect && (this.options.pixelStride = e, this.rawEffect.pixelStride = e, this.emit("needsUpdate"));
	}
	get pixelStrideZCutoff() {
		return this.options.pixelStrideZCutoff ?? Q.pixelStrideZCutoff;
	}
	set pixelStrideZCutoff(e) {
		this.rawEffect && (this.options.pixelStrideZCutoff = e, this.rawEffect.pixelStrideZCutoff = e, this.emit("needsUpdate"));
	}
	get maxRayDistance() {
		return this.options.maxRayDistance ?? Q.maxRayDistance;
	}
	set maxRayDistance(e) {
		this.rawEffect && (this.options.maxRayDistance = e, this.rawEffect.maxRayDistance = e, this.emit("needsUpdate"));
	}
	get screenEdgeFadeStart() {
		return this.options.screenEdgeFadeStart ?? Q.screenEdgeFadeStart;
	}
	set screenEdgeFadeStart(e) {
		this.rawEffect && (this.options.screenEdgeFadeStart = e, this.rawEffect.screenEdgeFadeStart = e, this.emit("needsUpdate"));
	}
	get eyeFadeStart() {
		return this.options.eyeFadeStart ?? Q.eyeFadeStart;
	}
	set eyeFadeStart(e) {
		this.rawEffect && (this.options.eyeFadeStart = e, this.rawEffect.eyeFadeStart = e, this.emit("needsUpdate"));
	}
	get eyeFadeEnd() {
		return this.options.eyeFadeEnd ?? Q.eyeFadeEnd;
	}
	set eyeFadeEnd(e) {
		this.rawEffect && (this.options.eyeFadeEnd = e, this.rawEffect.eyeFadeEnd = e, this.emit("needsUpdate"));
	}
	get jitter() {
		return this.options.jitter ?? Q.jitter;
	}
	set jitter(e) {
		this.rawEffect && (this.options.jitter = e, this.rawEffect.jitter = e, this.emit("needsUpdate"));
	}
	get useConeTracing() {
		return this.options.useConeTracing ?? Q.useConeTracing;
	}
	set useConeTracing(e) {
		this.rawEffect && (this.options.useConeTracing = e, this.rawEffect.useConeTracing = e, this.emit("needsUpdate"));
	}
	get coneTracingFadeStart() {
		return this.options.coneTracingFadeStart ?? Q.coneTracingFadeStart;
	}
	set coneTracingFadeStart(e) {
		this.rawEffect && (this.options.coneTracingFadeStart = e, this.rawEffect.coneTracingFadeStart = e, this.emit("needsUpdate"));
	}
	get coneTracingFadeEnd() {
		return this.options.coneTracingFadeEnd ?? Q.coneTracingFadeEnd;
	}
	set coneTracingFadeEnd(e) {
		this.rawEffect && (this.options.coneTracingFadeEnd = e, this.rawEffect.coneTracingFadeEnd = e, this.emit("needsUpdate"));
	}
	get coneTracingMaxDistance() {
		return this.options.coneTracingMaxDistance ?? Q.coneTracingMaxDistance;
	}
	set coneTracingMaxDistance(e) {
		this.rawEffect && (this.options.coneTracingMaxDistance = e, this.rawEffect.coneTracingMaxDistance = e, this.emit("needsUpdate"));
	}
	get coneTracingIteration() {
		return this.options.coneTracingIteration ?? Q.coneTracingIteration;
	}
	set coneTracingIteration(e) {
		this.rawEffect && (this.options.coneTracingIteration = e, this.rawEffect.coneTracingIteration = e, this.emit("needsUpdate"));
	}
	get resolveKernelSize() {
		return this.options.resolveKernelSize ?? Q.resolveKernelSize;
	}
	set resolveKernelSize(e) {
		this.rawEffect && (this.options.resolveKernelSize = e, this.rawEffect.resolveKernelSize = e, this.emit("needsUpdate"));
	}
}, By = {
	enabled: !1,
	mode: Nn.AGX
}, Vy = class extends s {
	constructor(e, t) {
		super(e, new jn(), t);
	}
	onMounted() {
		this.rawEffect && (this.rawEffect.mode = this.mode);
	}
	get mode() {
		return this.options.mode ?? By.mode;
	}
	set mode(e) {
		this.options.mode !== e && (this.options.mode = e, this.rawEffect && (this.rawEffect.mode = e, this.emit("needsUpdate")));
	}
}, Hy = ["normal"], Uy = ["normal", "shadow"], Wy = class extends c {
	static key = "aerialPerspective";
	static insertAfter = ["mrt"];
	config;
	shadowTerm;
	specularTerm;
	constructor(e, t, n) {
		super(e, t, n), this.config = n;
		let r = n.aerialPerspective ?? {};
		this.shadowTerm = r.shadow ?? !1, this.specularTerm = r.specular ?? !1;
	}
	getRequiredBuffers() {
		return this.shadowTerm || this.specularTerm ? Uy : Hy;
	}
	createPass() {
		let e = this.find("mrt");
		Gn(e?.depthBuffer);
		let t = new Pu(this.view.atmosphere, this.view.camera.raw, null, {
			...this.config.aerialPerspective,
			enabled: this.config.visible ?? !0
		});
		return t.raw.setCustomDepthTexture(e.depthBuffer, e.depthBufferPacking), t;
	}
	onUpdateConfig(e) {
		if (super.onUpdateConfig(e), !this._instance) return;
		Object.assign(this.config, e);
		let t = e.aerialPerspective;
		t && (t.inscatter !== void 0 && (this._instance.inscatter = t.inscatter), t.transmittance !== void 0 && (this._instance.transmittance = t.transmittance), t.irradiance !== void 0 && (this._instance.irradiance = t.irradiance), t.sky !== void 0 && (this._instance.sky = t.sky), t.sun !== void 0 && (this._instance.sun = t.sun), t.moon !== void 0 && (this._instance.moon = t.moon), t.albedoScale !== void 0 && (this._instance.albedoScale = t.albedoScale), t.useNormalBuffer !== void 0 && (this._instance.useNormalBuffer = t.useNormalBuffer), this.updateLighting(t));
	}
	updateLighting(e) {
		Gn(this._instance);
		let t = this._instance.rawEffect, n = this.shadowTerm || this.specularTerm;
		e.shadow !== void 0 && (this.shadowTerm = e.shadow), e.specular !== void 0 && (this.specularTerm = e.specular);
		let r = this.shadowTerm || this.specularTerm;
		r && !n && this.ctx.emit("gbufferRequirementsChanged"), t.shadowTerm = this.shadowTerm, t.specularTerm = this.specularTerm, !r && n && this.ctx.emit("gbufferRequirementsChanged"), e.shadowIntensity !== void 0 && (t.shadowIntensity = e.shadowIntensity), e.shadowSoftness !== void 0 && (t.shadowSoftness = e.shadowSoftness), e.shadowSamples !== void 0 && (t.shadowSamples = e.shadowSamples), e.specularIntensity !== void 0 && (t.specularIntensity = e.specularIntensity);
	}
	update(e) {
		let t = this._instance;
		t && (t.setNormalBuffer(this.ctx.getNormalTexture() ?? null), t.rawEffect.setShadowBuffer(this.ctx.getShadowTexture() ?? null), t._update());
	}
}, Gy = class extends c {
	static key = "clouds";
	static insertAfter = ["aerialPerspective"];
	config;
	constructor(e, t, n) {
		super(e, t, n), this.config = n;
	}
	createPass() {
		let e = new U_(this.view.camera.raw, this.view.atmosphere, {
			...this.config.clouds,
			enabled: this.config.visible ?? !0
		}), t = this.find("mrt");
		return Gn(t?.depthBuffer), e.raw.setCustomDepthTexture(t.depthBuffer, t.depthBufferPacking), e;
	}
	onUpdateConfig(e) {
		if (super.onUpdateConfig(e), !this._instance) return;
		Object.assign(this.config, e);
		let t = e.clouds;
		t && (t.qualityPreset !== void 0 && (this._instance.qualityPreset = t.qualityPreset), t.localWeatherVelocity !== void 0 && (this._instance.localWeatherVelocity = t.localWeatherVelocity), t.coverage !== void 0 && (this._instance.coverage = t.coverage), t.lightShafts !== void 0 && t.lightShafts !== null && (this._instance.lightShafts = t.lightShafts), t.resolutionScale !== void 0 && (this._instance.resolutionScale = t.resolutionScale), t.maxIterationCount !== void 0 && t.maxIterationCount !== null && (this._instance.maxIterationCount = t.maxIterationCount), t.minStepSize !== void 0 && t.minStepSize !== null && (this._instance.minStepSize = t.minStepSize), t.maxStepSize !== void 0 && t.maxStepSize !== null && (this._instance.maxStepSize = t.maxStepSize), t.shadows !== void 0 && (this._instance.shadows = t.shadows), t.shadowCascadeCount !== void 0 && (this._instance.shadowCascadeCount = t.shadowCascadeCount), t.shadowMapSize !== void 0 && (this._instance.shadowMapSize = t.shadowMapSize), t.shadowFarScale !== void 0 && (this._instance.shadowFarScale = t.shadowFarScale), t.haze !== void 0 && (this._instance.haze = t.haze), t.hazeDensityScale !== void 0 && (this._instance.hazeDensityScale = t.hazeDensityScale), t.hazeExponent !== void 0 && (this._instance.hazeExponent = t.hazeExponent), t.hazeScatteringCoefficient !== void 0 && (this._instance.hazeScatteringCoefficient = t.hazeScatteringCoefficient), t.hazeAbsorptionCoefficient !== void 0 && (this._instance.hazeAbsorptionCoefficient = t.hazeAbsorptionCoefficient), t.localWeatherRepeat !== void 0 && (this._instance.localWeatherRepeat = t.localWeatherRepeat), t.localWeatherOffset !== void 0 && (this._instance.localWeatherOffset = t.localWeatherOffset), t.shapeRepeat !== void 0 && (this._instance.shapeRepeat = t.shapeRepeat), t.shapeOffset !== void 0 && (this._instance.shapeOffset = t.shapeOffset), t.shapeDetailRepeat !== void 0 && (this._instance.shapeDetailRepeat = t.shapeDetailRepeat), t.shapeDetailOffset !== void 0 && (this._instance.shapeDetailOffset = t.shapeDetailOffset), t.turbulenceRepeat !== void 0 && (this._instance.turbulenceRepeat = t.turbulenceRepeat), t.turbulenceDisplacement !== void 0 && (this._instance.turbulenceDisplacement = t.turbulenceDisplacement), t.scatteringCoefficient !== void 0 && (this._instance.scatteringCoefficient = t.scatteringCoefficient), t.absorptionCoefficient !== void 0 && (this._instance.absorptionCoefficient = t.absorptionCoefficient), t.scatterAnisotropy1 !== void 0 && (this._instance.scatterAnisotropy1 = t.scatterAnisotropy1), t.scatterAnisotropy2 !== void 0 && (this._instance.scatterAnisotropy2 = t.scatterAnisotropy2), t.scatterAnisotropyMix !== void 0 && (this._instance.scatterAnisotropyMix = t.scatterAnisotropyMix), t.skyLightScale !== void 0 && (this._instance.skyLightScale = t.skyLightScale), t.groundBounceScale !== void 0 && (this._instance.groundBounceScale = t.groundBounceScale), t.powderScale !== void 0 && (this._instance.powderScale = t.powderScale), t.powderExponent !== void 0 && (this._instance.powderExponent = t.powderExponent));
	}
	update(e) {
		this._instance?._update();
	}
}, Ky = {
	url: "https://raw.githubusercontent.com/pmndrs/postprocessing/refs/heads/main/demo/static/textures/lut/3dl/presetpro-cinematic.3dl",
	blendMode: "colorBurn",
	opacity: .78
}, qy = class extends c {
	static key = "colorGradingLUT";
	static insertBefore = [
		"smaa",
		"fxaa",
		"final"
	];
	config;
	constructor(e, t, n) {
		super(e, t, n), this.config = n;
	}
	createPass() {
		let e = new K_(this.view.camera.raw, {
			...this.config.colorGradingLUT,
			enabled: this.config.visible ?? !0
		});
		return e.on("needsUpdate", () => this.emit("needsUpdate")), e;
	}
	onUpdateConfig(e) {
		if (super.onUpdateConfig(e), !this._instance) return;
		Object.assign(this.config, e);
		let t = e.colorGradingLUT;
		t && (t.url !== void 0 && (this._instance.url = t.url), t.blendMode !== void 0 && (this._instance.blendMode = t.blendMode), t.opacity !== void 0 && (this._instance.opacity = t.opacity));
	}
}, Jy = class extends c {
	static key = "depthOfField";
	static insertAfter = ["mrt"];
	config;
	constructor(e, t, n) {
		super(e, t, n), this.config = n;
	}
	createPass() {
		return new J_(this.view.camera.raw, {
			...this.config.depthOfField,
			enabled: this.config.visible ?? !0
		});
	}
	onUpdateConfig(e) {
		if (super.onUpdateConfig(e), !this._instance) return;
		Object.assign(this.config, e);
		let t = e.depthOfField;
		t && (t.bokehScale !== void 0 && (this._instance.bokehScale = t.bokehScale), t.focusDistance !== void 0 && (this._instance.focusDistance = t.focusDistance), t.focalLength !== void 0 && (this._instance.focalLength = t.focalLength));
	}
}, Yy = class extends c {
	static key = "fogLight";
	static requiredBuffers = ["normal"];
	static insertBefore = ["transparent"];
	static allowDuplication = !0;
	config;
	constructor(e, t, n) {
		super(e, t, n), this.config = n;
	}
	createPass() {
		let e = this.config.fogLight ?? {};
		return new sv(this.view.camera.raw, {
			...e,
			normalBuffer: void 0,
			enabled: this.config.visible ?? !0
		});
	}
	update(e) {
		this._instance?.setNormalBuffer(this.ctx.getNormalTexture() ?? null);
	}
	onUpdateConfig(e) {
		if (!this._instance) return;
		super.onUpdateConfig(e), Object.assign(this.config, e);
		let t = e.fogLight;
		t && (t.lights !== void 0 && (this._instance.lights = t.lights), t.fogDensity !== void 0 && (this._instance.fogDensity = t.fogDensity), t.useSurfaceLighting !== void 0 && (this._instance.useSurfaceLighting = t.useSurfaceLighting), t.downsample !== void 0 && (this._instance.downsample = t.downsample), t.maxLightsPerTile !== void 0 && (this._instance.maxLightsPerTile = t.maxLightsPerTile), t.extentScale !== void 0 && (this._instance.extentScale = t.extentScale), t.maxFar !== void 0 && (this._instance.maxFar = t.maxFar), t.haloFalloff !== void 0 && (this._instance.haloFalloff = t.haloFalloff), t.debugShowGrid !== void 0 && (this._instance.debugShowGrid = t.debugShowGrid)), e.visible !== void 0 && (this._instance.enabled = e.visible);
	}
}, Xy = class extends c {
	static key = "fxaa";
	static insertBefore = ["final"];
	createPass() {
		let e = this.view.camera.raw;
		if (!e) throw Error("Camera not available for FXAA effect");
		return new wu(e);
	}
}, Zy = class extends c {
	static key = "lensFlare";
	static insertAfter = ["clouds"];
	static insertBefore = ["transparent"];
	config;
	constructor(e, t, n) {
		super(e, t, n), this.config = n;
	}
	createPass() {
		return new Av(this.view.camera.raw, {
			...this.config.lensFlare,
			enabled: this.config.visible ?? !0
		});
	}
	onUpdateConfig(e) {
		if (super.onUpdateConfig(e), !this._instance) return;
		Object.assign(this.config, e);
		let t = e.lensFlare;
		t && t.intensity !== void 0 && (this._instance.intensity = t.intensity);
	}
}, Qy = class extends c {
	static key = "rainDrop";
	static insertBefore = ["final"];
	static allowDuplication = !0;
	config;
	constructor(e, t, n) {
		super(e, t, n), this.config = n;
	}
	createPass() {
		let e = this.config.rainDrop ?? {};
		return new Pv(this.view.camera.raw, {
			...e,
			enabled: this.config.visible ?? !0
		});
	}
	onUpdateConfig(e) {
		if (this._instance) {
			if (super.onUpdateConfig(e), e.rainDrop) {
				let t = e.rainDrop;
				t.opacity !== void 0 && (this._instance.opacity = t.opacity), t.dropGridSize !== void 0 && (this._instance.dropGridSize = t.dropGridSize), t.dropDensity !== void 0 && (this._instance.dropDensity = t.dropDensity), t.dropLayers !== void 0 && (this._instance.dropLayers = t.dropLayers), t.dropSizeFactor !== void 0 && (this._instance.dropSizeFactor = t.dropSizeFactor), t.noiseScale !== void 0 && (this._instance.noiseScale = t.noiseScale), t.refractionStrength !== void 0 && (this._instance.refractionStrength = t.refractionStrength), t.minDropStrength !== void 0 && (this._instance.minDropStrength = t.minDropStrength), t.dropFadeStart !== void 0 && (this._instance.dropFadeStart = t.dropFadeStart), t.dropFadeEnd !== void 0 && (this._instance.dropFadeEnd = t.dropFadeEnd), t.dropThresholdFactor !== void 0 && (this._instance.dropThresholdFactor = t.dropThresholdFactor), t.gridDensityLow !== void 0 && (this._instance.gridDensityLow = t.gridDensityLow), t.gridDensityHigh !== void 0 && (this._instance.gridDensityHigh = t.gridDensityHigh), t.jitterStrengthLow !== void 0 && (this._instance.jitterStrengthLow = t.jitterStrengthLow), t.jitterStrengthHigh !== void 0 && (this._instance.jitterStrengthHigh = t.jitterStrengthHigh);
			}
			e.visible !== void 0 && (this._instance.enabled = e.visible);
		}
	}
	update(e) {
		this._instance && this._instance.update(e);
	}
}, $y = class extends c {
	static key = "smaa";
	static insertBefore = ["final"];
	config;
	constructor(e, t, n) {
		super(e, t, n), this.config = n;
	}
	createPass() {
		return new Tu(this.view.camera.raw, {
			...this.config.smaa,
			enabled: this.config.visible ?? !0
		});
	}
	onUpdateConfig(e) {
		if (super.onUpdateConfig(e), !this._instance) return;
		Object.assign(this.config, e);
		let t = e.smaa;
		t && (t.quality !== void 0 && (this._instance.quality = t.quality), t.edgeDetectionMode !== void 0 && (this._instance.edgeDetectionMode = t.edgeDetectionMode));
	}
}, eb = class extends c {
	static key = "ssao";
	static insertAfter = ["clouds"];
	static insertBefore = ["transparent"];
	config;
	constructor(e, t, n) {
		super(e, t, n), this.config = n;
	}
	createPass() {
		let e = this.config.ssao ? { ...this.config.ssao } : {};
		return new wy(this.view.camera.raw, this.ctx.getRenderer().domElement.clientWidth, this.ctx.getRenderer().domElement.clientHeight, {
			...e,
			enabled: this.config.visible ?? !0
		});
	}
	onUpdateConfig(e) {
		if (super.onUpdateConfig(e), !this._instance) return;
		Object.assign(this.config, e);
		let t = e.ssao;
		t && (t.samples !== void 0 && (this._instance.samples = t.samples), t.radius !== void 0 && (this._instance.radius = t.radius), t.intensity !== void 0 && (this._instance.intensity = t.intensity), t.color !== void 0 && (this._instance.color = t.color), t.halfRes !== void 0 && (this._instance.halfRes = t.halfRes ?? !1), t.quality !== void 0 && (this._instance.quality = t.quality));
	}
}, tb = "/**\n * Extract a single bit from a float bitmask.\n * Used by selective effect passes (Bloom, Outline) to check if an effect slot is active.\n *\n * @param maskValue - Float bitmask from EffectIds buffer (R channel)\n * @param bitIndex - Bit position to check (0-10)\n * @return 1.0 if the bit is set, 0.0 otherwise\n */\nfloat extractEffectBit(float maskValue, int bitIndex) {\n  // Integer bit test – exp2()/floor() is not exact on all drivers (e.g.\n  // ANGLE Metal computes exp2(1.0) slightly above 2.0, so\n  // floor(mask / exp2(bit)) drops the bit whenever the mask holds exactly\n  // that slot's value). The mask is an integer ≤ 2047 stored in half float,\n  // so round-trip through int is lossless.\n  return float((int(maskValue + 0.5) >> bitIndex) & 1);\n}\n", nb = .8, rb = .85, ib = 0, ab = .1, ob = 8, sb = .5, cb = class extends S {
	static key = "selectiveBloom";
	static insertAfter = ["mrt"];
	static insertBefore = ["transparent"];
	static requiredBuffers = ["selectiveEffect", "emissive"];
	bloomPass;
	get bloom() {
		return this.config.selectiveBloom;
	}
	get bloomStrength() {
		return this.bloom.strength ?? nb;
	}
	get bloomRadius() {
		return this.bloom.radius ?? rb;
	}
	get bloomThreshold() {
		return this.bloom.threshold ?? ib;
	}
	get bloomSmoothing() {
		return this.bloom.smoothing ?? ab;
	}
	get bloomLevels() {
		return Math.max(1, Math.round(this.bloom.levels ?? ob));
	}
	constructor(e, t, n) {
		let r = n.selectiveBloom ?? {}, i = {
			...n,
			selectiveEffect: !0,
			selectiveBloom: {
				strength: r.strength ?? nb,
				radius: r.radius ?? rb,
				threshold: r.threshold ?? ib,
				smoothing: r.smoothing ?? ab,
				levels: r.levels ?? ob,
				resolutionScale: r.resolutionScale ?? sb
			}
		};
		super(e, t, i);
	}
	createPass() {
		let e = new lb(this);
		return this.bloomPass = e, new m(e, null, { enabled: !0 });
	}
	onUpdateConfig(e) {
		super.onUpdateConfig(e);
		let t = e.selectiveBloom;
		if (!t) return;
		let n = !1;
		t.strength !== void 0 && (this.config.selectiveBloom.strength = t.strength, n = !0), t.radius !== void 0 && (this.config.selectiveBloom.radius = t.radius, n = !0), t.threshold !== void 0 && (this.config.selectiveBloom.threshold = t.threshold, n = !0), t.smoothing !== void 0 && (this.config.selectiveBloom.smoothing = t.smoothing, n = !0), t.resolutionScale !== void 0 && (this.config.selectiveBloom.resolutionScale = t.resolutionScale), n && this.bloomPass?.setParameters(this.bloomStrength, this.bloomRadius, this.bloomThreshold, this.bloomSmoothing), t.levels !== void 0 && (this.config.selectiveBloom.levels = t.levels, this.bloomPass?.setLevels(this.bloomLevels));
	}
}, lb = class extends Tn {
	desc;
	bloom;
	bloomSourceRT;
	fullscreenCamera;
	fullscreenGeometry;
	extractScene;
	extractMaterial;
	compositeScene;
	compositeMaterial;
	size = new A();
	constructor(e) {
		super("SelectiveBloomPass"), this.desc = e;
		let t = e.viewContext.getRenderer().getSize(new A()), n = e.layerConfig.selectiveBloom.resolutionScale ?? sb, r = Math.floor(t.x * n), i = Math.floor(t.y * n), a = ce();
		this.fullscreenCamera = a.camera, this.fullscreenGeometry = a.geometry, this.extractMaterial = new O({
			uniforms: {
				tEmissive: { value: null },
				tEffectIds: { value: null },
				slotBit: { value: 0 },
				threshold: { value: ib },
				smoothing: { value: ab }
			},
			vertexShader: "\n        varying vec2 vUv;\n        void main() {\n          vUv = uv;\n          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);\n        }\n      ",
			fragmentShader: `
        uniform sampler2D tEmissive;
        uniform sampler2D tEffectIds;
        uniform int slotBit;
        uniform float threshold;
        uniform float smoothing;

        varying vec2 vUv;

        ${tb}

        void main() {
          float maskValue = texture2D(tEffectIds, vUv).r;
          float bitValue = extractEffectBit(maskValue, slotBit);

          if (bitValue > 0.5) {
            vec3 emissive = texture2D(tEmissive, vUv).rgb;
            float luma = dot(emissive, vec3(0.299, 0.587, 0.114));
            // smoothstep is undefined for equal edges, so smoothing 0 falls back to a hard cutoff.
            float pass = smoothing > 0.0
              ? smoothstep(threshold, threshold + smoothing, luma)
              : step(threshold, luma);
            gl_FragColor = vec4(emissive * pass, 1.0);
          } else {
            gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0);
          }
        }
      `,
			depthTest: !1,
			depthWrite: !1
		}), this.extractScene = new Kt(), this.extractScene.add(new D(this.fullscreenGeometry, this.extractMaterial)), this.compositeMaterial = new O({
			uniforms: {
				tBase: { value: null },
				tSource: { value: null },
				tBloom: { value: null },
				strength: { value: nb }
			},
			vertexShader: "\n        varying vec2 vUv;\n        void main() {\n          vUv = uv;\n          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);\n        }\n      ",
			fragmentShader: "\n        uniform sampler2D tBase;\n        uniform sampler2D tSource;\n        uniform sampler2D tBloom;\n        uniform float strength;\n\n        varying vec2 vUv;\n\n        void main() {\n          vec4 baseColor = texture2D(tBase, vUv);\n          vec3 bloom = texture2D(tSource, vUv).rgb + texture2D(tBloom, vUv).rgb;\n          gl_FragColor = vec4(baseColor.rgb + bloom * strength, baseColor.a);\n        }\n      ",
			depthTest: !1,
			depthWrite: !1
		}), this.compositeScene = new Kt(), this.compositeScene.add(new D(this.fullscreenGeometry, this.compositeMaterial)), this.bloomSourceRT = new N(r, i, {
			format: Bt,
			type: ot,
			depthBuffer: !1,
			stencilBuffer: !1
		}), this.bloomSourceRT.texture.name = `SelectiveBloom_Source_${e.id}`, this.bloom = new wn(), this.bloom.levels = e.bloomLevels, this.bloom.radius = e.bloomRadius, this.bloom.setSize(r, i), this.size.set(r, i), this.needsSwap = !0;
	}
	initialize(e, t) {
		this.bloom.initialize(e, t, ot);
	}
	setParameters(e, t, n, r) {
		this.bloom.radius = t, this.extractMaterial.uniforms.threshold.value = n, this.extractMaterial.uniforms.smoothing.value = r, this.compositeMaterial.uniforms.strength.value = e;
	}
	setLevels(e) {
		this.bloom.levels !== e && (this.bloom.levels = e);
	}
	updateSizes(e, t) {
		(this.size.x !== e || this.size.y !== t) && (this.size.set(e, t), this.bloomSourceRT.setSize(e, t), this.bloom.setSize(e, t));
	}
	render(e, t, n, r) {
		let i = this.desc.layerConfig.selectiveBloom.resolutionScale ?? sb;
		this.updateSizes(Math.floor(t.width * i), Math.floor(t.height * i)), this.setParameters(this.desc.bloomStrength, this.desc.bloomRadius, this.desc.bloomThreshold, this.desc.bloomSmoothing), this.setLevels(this.desc.bloomLevels);
		let a = this.desc.getEmissiveBuffer(), o = this.desc.getEffectIdsBuffer(), s = this.desc.getEffectSlot();
		if (!a || !o || s < 0) {
			this.compositeMaterial.uniforms.strength.value = 0, e.setRenderTarget(this.renderToScreen ? null : n), this.compositeMaterial.uniforms.tBase.value = t.texture, this.compositeMaterial.uniforms.tSource.value = this.bloomSourceRT.texture, this.compositeMaterial.uniforms.tBloom.value = this.bloomSourceRT.texture, e.render(this.compositeScene, this.fullscreenCamera);
			return;
		}
		this.extractMaterial.uniforms.tEmissive.value = a, this.extractMaterial.uniforms.tEffectIds.value = o, this.extractMaterial.uniforms.slotBit.value = s, e.setRenderTarget(this.bloomSourceRT), e.render(this.extractScene, this.fullscreenCamera), this.bloom.render(e, this.bloomSourceRT, null, r), this.compositeMaterial.uniforms.tBase.value = t.texture, this.compositeMaterial.uniforms.tSource.value = this.bloomSourceRT.texture, this.compositeMaterial.uniforms.tBloom.value = this.bloom.texture, e.setRenderTarget(this.renderToScreen ? null : n), e.render(this.compositeScene, this.fullscreenCamera);
	}
	dispose() {
		this.extractScene.clear(), this.compositeScene.clear(), this.bloom.dispose(), this.bloomSourceRT.dispose(), this.fullscreenGeometry.dispose(), this.extractMaterial.dispose(), this.compositeMaterial.dispose();
	}
}, ub = 16777215, db = 1, fb = 1, pb = class extends S {
	static key = "selectiveOutline";
	static insertAfter = ["mrt"];
	static insertBefore = ["transparent"];
	outlinePass;
	get outline() {
		return this.config.selectiveOutline;
	}
	get outlineColor() {
		let e = this.outline.color;
		return e instanceof i ? e : new i().setHex(ub);
	}
	get outlineThickness() {
		return this.outline.thickness ?? db;
	}
	get outlineEdgeStrength() {
		return this.outline.edgeStrength ?? fb;
	}
	constructor(e, t, n) {
		let r = n.selectiveOutline ?? {}, a = {
			...n,
			selectiveEffect: !0,
			selectiveOutline: {
				color: r.color ?? new i().setHex(ub),
				thickness: r.thickness ?? db,
				edgeStrength: r.edgeStrength ?? fb,
				resolutionScale: r.resolutionScale ?? 1
			}
		};
		super(e, t, a);
	}
	createPass() {
		let e = new mb(this);
		return this.outlinePass = e, new m(e, null, { enabled: !0 });
	}
	onUpdateConfig(e) {
		super.onUpdateConfig(e);
		let t = e.selectiveOutline;
		if (!t) return;
		let n = !1;
		t.color !== void 0 && (this.config.selectiveOutline.color = t.color, n = !0), t.thickness !== void 0 && (this.config.selectiveOutline.thickness = t.thickness, n = !0), t.edgeStrength !== void 0 && (this.config.selectiveOutline.edgeStrength = t.edgeStrength, n = !0), t.resolutionScale !== void 0 && (this.config.selectiveOutline.resolutionScale = t.resolutionScale), n && this.outlinePass?.setParameters(this.outlineColor, this.outlineThickness, this.outlineEdgeStrength);
	}
}, mb = class extends Tn {
	desc;
	maskRT;
	edgeRT;
	fullscreenCamera;
	fullscreenGeometry;
	extractScene;
	extractMaterial;
	edgeDetectScene;
	edgeDetectMaterial;
	compositeScene;
	compositeMaterial;
	size = new A();
	constructor(e) {
		super("SelectiveOutlinePass"), this.desc = e;
		let t = e.viewContext.getRenderer().getSize(new A()), n = e.layerConfig.selectiveOutline.resolutionScale ?? 1, r = Math.floor(t.x * n), a = Math.floor(t.y * n), o = ce();
		this.fullscreenCamera = o.camera, this.fullscreenGeometry = o.geometry, this.extractMaterial = new O({
			uniforms: {
				tEffectIds: { value: null },
				slotBit: { value: 0 }
			},
			vertexShader: "\n        varying vec2 vUv;\n        void main() {\n          vUv = uv;\n          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);\n        }\n      ",
			fragmentShader: `
        uniform sampler2D tEffectIds;
        uniform int slotBit;

        varying vec2 vUv;

        ${tb}

        void main() {
          float maskValue = texture2D(tEffectIds, vUv).r;
          float bitValue = extractEffectBit(maskValue, slotBit);

          float mask = bitValue > 0.5 ? 1.0 : 0.0;
          gl_FragColor = vec4(vec3(mask), 1.0);
        }
      `,
			depthTest: !1,
			depthWrite: !1
		}), this.extractScene = new Kt(), this.extractScene.add(new D(this.fullscreenGeometry, this.extractMaterial)), this.edgeDetectMaterial = new O({
			uniforms: {
				tMask: { value: null },
				resolution: { value: new A(r, a) },
				edgeStrength: { value: 1 },
				thickness: { value: 1 }
			},
			vertexShader: "\n        varying vec2 vUv;\n        void main() {\n          vUv = uv;\n          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);\n        }\n      ",
			fragmentShader: "\n        uniform sampler2D tMask;\n        uniform vec2 resolution;\n        uniform float edgeStrength;\n        uniform float thickness;\n\n        varying vec2 vUv;\n\n        float sampleMask(vec2 uv) {\n          vec3 rgb = texture2D(tMask, uv).rgb;\n          return length(rgb) > 0.1 ? 1.0 : 0.0;\n        }\n\n        void main() {\n          vec2 texel = 1.0 / resolution;\n          vec2 offset = texel * thickness;\n\n          float tl = sampleMask(vUv + offset * vec2(-1.0,  1.0));\n          float t  = sampleMask(vUv + offset * vec2( 0.0,  1.0));\n          float tr = sampleMask(vUv + offset * vec2( 1.0,  1.0));\n          float l  = sampleMask(vUv + offset * vec2(-1.0,  0.0));\n          float r  = sampleMask(vUv + offset * vec2( 1.0,  0.0));\n          float bl = sampleMask(vUv + offset * vec2(-1.0, -1.0));\n          float b  = sampleMask(vUv + offset * vec2( 0.0, -1.0));\n          float br = sampleMask(vUv + offset * vec2( 1.0, -1.0));\n\n          float gx = -tl - 2.0*l - bl + tr + 2.0*r + br;\n          float gy = -tl - 2.0*t - tr + bl + 2.0*b + br;\n\n          float edge = length(vec2(gx, gy)) * edgeStrength;\n          edge = clamp(edge, 0.0, 1.0);\n\n          gl_FragColor = vec4(vec3(edge), 1.0);\n        }\n      ",
			depthTest: !1,
			depthWrite: !1
		}), this.edgeDetectScene = new Kt(), this.edgeDetectScene.add(new D(this.fullscreenGeometry, this.edgeDetectMaterial)), this.compositeMaterial = new O({
			uniforms: {
				tBase: { value: null },
				tEdge: { value: null },
				outlineColor: { value: new i().setHex(16777215).raw },
				thickness: { value: 1 },
				resolution: { value: new A(r, a) },
				bypass: { value: 0 }
			},
			vertexShader: "\n        varying vec2 vUv;\n        void main() {\n          vUv = uv;\n          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);\n        }\n      ",
			fragmentShader: "\n        uniform sampler2D tBase;\n        uniform sampler2D tEdge;\n        uniform vec3 outlineColor;\n        uniform float thickness;\n        uniform vec2 resolution;\n        uniform int bypass;\n\n        varying vec2 vUv;\n\n        float sampleEdge(vec2 uv, vec2 texel) {\n          float edgeCenter = texture2D(tEdge, uv).r;\n          float edgeHPos = texture2D(tEdge, uv + texel * vec2(thickness, 0.0)).r;\n          float edgeHNeg = texture2D(tEdge, uv + texel * vec2(-thickness, 0.0)).r;\n          float edgeVPos = texture2D(tEdge, uv + texel * vec2(0.0, thickness)).r;\n          float edgeVNeg = texture2D(tEdge, uv + texel * vec2(0.0, -thickness)).r;\n          return max(edgeCenter, max(max(edgeHPos, edgeHNeg), max(edgeVPos, edgeVNeg)));\n        }\n\n        void main() {\n          vec4 baseColor = texture2D(tBase, vUv);\n          if (bypass > 0) {\n            gl_FragColor = baseColor;\n            return;\n          }\n          vec2 texel = 1.0 / resolution;\n\n          float edge = clamp(sampleEdge(vUv, texel), 0.0, 1.0);\n\n          vec3 finalColor = mix(baseColor.rgb, outlineColor, edge);\n          gl_FragColor = vec4(finalColor, baseColor.a);\n        }\n      ",
			depthTest: !1,
			depthWrite: !1
		}), this.setParameters(e.outlineColor, e.outlineThickness, e.outlineEdgeStrength), this.compositeScene = new Kt(), this.compositeScene.add(new D(this.fullscreenGeometry, this.compositeMaterial)), this.maskRT = new N(r, a, {
			format: Bt,
			depthBuffer: !1,
			stencilBuffer: !1
		}), this.maskRT.texture.name = `SelectiveOutline_Mask_${e.id}`, this.edgeRT = new N(r, a, {
			format: Bt,
			depthBuffer: !1,
			stencilBuffer: !1
		}), this.edgeRT.texture.name = `SelectiveOutline_Edge_${e.id}`, this.size.set(r, a), this.needsSwap = !0;
	}
	setParameters(e, t, n) {
		this.compositeMaterial.uniforms.outlineColor.value.copy(e.raw), this.compositeMaterial.uniforms.thickness.value = t, this.edgeDetectMaterial.uniforms.edgeStrength.value = n, this.edgeDetectMaterial.uniforms.thickness.value = t;
	}
	updateSizes(e, t) {
		(this.size.x !== e || this.size.y !== t) && (this.size.set(e, t), this.maskRT.setSize(e, t), this.edgeRT.setSize(e, t), this.edgeDetectMaterial.uniforms.resolution.value.set(e, t), this.compositeMaterial.uniforms.resolution.value.set(e, t));
	}
	render(e, t, n, r) {
		let i = this.desc.layerConfig.selectiveOutline.resolutionScale ?? 1;
		this.updateSizes(Math.floor(t.width * i), Math.floor(t.height * i));
		let a = this.desc.getEffectIdsBuffer(), o = this.desc.getEffectSlot();
		if (!a || o < 0) {
			this.compositeMaterial.uniforms.tBase.value = t.texture, this.compositeMaterial.uniforms.tEdge.value = t.texture, this.compositeMaterial.uniforms.bypass.value = 1, e.setRenderTarget(this.renderToScreen ? null : n), e.render(this.compositeScene, this.fullscreenCamera);
			return;
		}
		this.extractMaterial.uniforms.tEffectIds.value = a, this.extractMaterial.uniforms.slotBit.value = o, e.setRenderTarget(this.maskRT), e.render(this.extractScene, this.fullscreenCamera), this.edgeDetectMaterial.uniforms.tMask.value = this.maskRT.texture, e.setRenderTarget(this.edgeRT), e.render(this.edgeDetectScene, this.fullscreenCamera), this.compositeMaterial.uniforms.tBase.value = t.texture, this.compositeMaterial.uniforms.tEdge.value = this.edgeRT.texture, this.compositeMaterial.uniforms.bypass.value = 0, e.setRenderTarget(this.renderToScreen ? null : n), e.render(this.compositeScene, this.fullscreenCamera);
	}
	dispose() {
		this.extractScene.clear(), this.edgeDetectScene.clear(), this.compositeScene.clear(), this.maskRT.dispose(), this.edgeRT.dispose(), this.fullscreenGeometry.dispose(), this.extractMaterial.dispose(), this.edgeDetectMaterial.dispose(), this.compositeMaterial.dispose();
	}
}, hb = class extends c {
	static key = "ssr";
	static requiredBuffers = ["normal"];
	static insertBefore = ["transparent"];
	config;
	constructor(e, t, n) {
		super(e, t, n), this.config = n;
	}
	createPass() {
		return new zy(this.view.camera.raw, {
			...this.config.ssr,
			geometryBuffer: this.config.ssr?.geometryBuffer ?? null,
			enabled: this.config.visible ?? !0
		});
	}
	update(e) {
		!this._instance || this.config.ssr?.geometryBuffer || (this._instance.geometryBuffer = this.ctx.getNormalTexture() ?? null);
	}
	onUpdateConfig(e) {
		if (super.onUpdateConfig(e), !this._instance) return;
		Object.assign(this.config, e);
		let t = e.ssr;
		t && (t.geometryBuffer !== void 0 && (this._instance.geometryBuffer = t.geometryBuffer ?? this.ctx.getNormalTexture() ?? null), t.resolutionScale !== void 0 && (this._instance.resolutionScale = t.resolutionScale), t.iterations !== void 0 && (this._instance.iterations = t.iterations), t.binarySearchIterations !== void 0 && (this._instance.binarySearchIterations = t.binarySearchIterations), t.pixelZSize !== void 0 && (this._instance.pixelZSize = t.pixelZSize), t.pixelStride !== void 0 && (this._instance.pixelStride = t.pixelStride), t.pixelStrideZCutoff !== void 0 && (this._instance.pixelStrideZCutoff = t.pixelStrideZCutoff), t.maxRayDistance !== void 0 && (this._instance.maxRayDistance = t.maxRayDistance), t.screenEdgeFadeStart !== void 0 && (this._instance.screenEdgeFadeStart = t.screenEdgeFadeStart), t.eyeFadeStart !== void 0 && (this._instance.eyeFadeStart = t.eyeFadeStart), t.eyeFadeEnd !== void 0 && (this._instance.eyeFadeEnd = t.eyeFadeEnd), t.jitter !== void 0 && (this._instance.jitter = t.jitter), t.useConeTracing !== void 0 && (this._instance.useConeTracing = t.useConeTracing), t.coneTracingFadeStart !== void 0 && (this._instance.coneTracingFadeStart = t.coneTracingFadeStart), t.coneTracingFadeEnd !== void 0 && (this._instance.coneTracingFadeEnd = t.coneTracingFadeEnd), t.coneTracingMaxDistance !== void 0 && (this._instance.coneTracingMaxDistance = t.coneTracingMaxDistance), t.coneTracingIteration !== void 0 && (this._instance.coneTracingIteration = t.coneTracingIteration), t.resolveKernelSize !== void 0 && (this._instance.resolveKernelSize = t.resolveKernelSize));
	}
}, gb = class extends c {
	static key = "toneMapping";
	static insertBefore = ["final"];
	config;
	constructor(e, t, n) {
		super(e, t, n), this.config = n;
	}
	createPass() {
		return new Vy(this.view.camera.raw, {
			...this.config.toneMapping,
			enabled: this.config.visible ?? !0
		});
	}
	onUpdateConfig(e) {
		if (super.onUpdateConfig(e), !this._instance) return;
		Object.assign(this.config, e);
		let t = e.toneMapping;
		t && t.mode !== void 0 && (this._instance.mode = t.mode);
	}
}, _b = {
	color: new w(16777215),
	intensity: 1
}, vb = class extends Fu {
	raw;
	options;
	constructor(e = {}) {
		super(), this.options = {
			..._b,
			...e
		}, this.raw = new je(this.options.color, this.options.intensity);
	}
	get color() {
		return this.raw.color;
	}
	set color(e) {
		this.raw.color.copy(e), this.emit("needsUpdate");
	}
	get intensity() {
		return this.raw.intensity;
	}
	set intensity(e) {
		this.raw.intensity = e, this.emit("needsUpdate");
	}
	get visible() {
		return this.raw.visible;
	}
	set visible(e) {
		this.raw.visible = e, this.emit("needsUpdate");
	}
}, yb = new w(16777215), bb = class extends Mt {
	mainLight;
	cascadedLights;
	direction = new j(-1, -1, -1);
	constructor(e, t) {
		super();
		let n = new Xe(e, t);
		n.castShadow = !0, this.mainLight = n, this.cascadedLights = [n], this.add(n), this.add(n.target);
	}
	setCount(e) {
		e = Math.max(1, e);
		let t = this.cascadedLights.length;
		if (e === t) return this;
		if (e > t) {
			let n = this.mainLight;
			for (let r = t; r < e; ++r) {
				let e = n.clone();
				e.color.copy(yb), this.add(e), this.add(e.target), this.cascadedLights[r] = e;
			}
		} else for (let n = e; n < t; ++n) {
			let e = this.cascadedLights[n];
			e.dispose(), this.remove(e.target), this.remove(e);
		}
		return this.cascadedLights.length = e, this;
	}
	dispose() {
		for (let e = 0; e < this.cascadedLights.length; ++e) this.cascadedLights[e].dispose();
	}
	copy(e, t) {
		super.copy(e, !1), this.cascadedLights.length = 0, this.clear();
		for (let t of e.cascadedLights) {
			let e = t.clone();
			this.add(e), this.add(e.target), this.cascadedLights.push(e);
		}
		return this;
	}
}, xb = "Invariant failed";
function Sb(e, t) {
	if (!e) throw Error(xb);
}
var Cb = class e {
	near = [
		new j(),
		new j(),
		new j(),
		new j()
	];
	far = [
		new j(),
		new j(),
		new j(),
		new j()
	];
	constructor(e, t) {
		e != null && t != null && this.setFromCamera(e, t);
	}
	clone() {
		return new e().copy(this);
	}
	copy(e) {
		for (let t = 0; t < 4; ++t) this.near[t].copy(e.near[t]), this.far[t].copy(e.far[t]);
		return this;
	}
	setFromCamera(e, t) {
		let n = e.isOrthographicCamera === !0, r = e.projectionMatrixInverse;
		this.near[0].set(1, 1, -1), this.near[1].set(1, -1, -1), this.near[2].set(-1, -1, -1), this.near[3].set(-1, 1, -1);
		for (let e = 0; e < 4; ++e) this.near[e].applyMatrix4(r);
		this.far[0].set(1, 1, 1), this.far[1].set(1, -1, 1), this.far[2].set(-1, -1, 1), this.far[3].set(-1, 1, 1);
		for (let e = 0; e < 4; ++e) {
			let i = this.far[e];
			i.applyMatrix4(r);
			let a = Math.abs(i.z);
			n ? i.z *= Math.min(t / a, 1) : i.multiplyScalar(Math.min(t / a, 1));
		}
		return this;
	}
	split(t, n = []) {
		for (let r = 0; r < t.length; ++r) {
			let i = n[r] ??= new e();
			if (r === 0) for (let e = 0; e < 4; ++e) i.near[e].copy(this.near[e]);
			else for (let e = 0; e < 4; ++e) i.near[e].lerpVectors(this.near[e], this.far[e], t[r - 1]);
			if (r === t.length - 1) for (let e = 0; e < 4; ++e) i.far[e].copy(this.far[e]);
			else for (let e = 0; e < 4; ++e) i.far[e].lerpVectors(this.near[e], this.far[e], t[r]);
		}
		return n.length = t.length, n;
	}
	applyMatrix4(e) {
		for (let t = 0; t < 4; ++t) this.near[t].applyMatrix4(e), this.far[t].applyMatrix4(e);
		return this;
	}
}, wb = "// Based on the following work:\n// https://github.com/StrandedKitty/three-csm/tree/master/src\n// https://github.com/mrdoob/three.js/tree/r169/examples/jsm/csm\n\nvoid cascadedFadedLights() {\n  directionalLight = directionalLights[0];\n  getDirectionalLightInfo(directionalLight, directLight);\n\n  float clipDepth = vViewPosition.z / (csmFar - csmNear);\n  bool lastCascade;\n  vec2 cascade;\n  float cascadeCenter;\n  float closestEdge;\n  float margin;\n  float shadow = 1.0;\n  float nextShadow = 1.0;\n\n  #pragma unroll_loop_start\n  for (int i = 0; i < NUM_DIR_LIGHTS; i++) {\n    #if UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS\n    #if UNROLLED_LOOP_INDEX < CSM_CASCADE_COUNT\n\n    lastCascade = UNROLLED_LOOP_INDEX == CSM_CASCADE_COUNT - 1;\n    cascade = csmCascades[i];\n    cascadeCenter = (cascade.x + cascade.y) * 0.5;\n    closestEdge = clipDepth < cascadeCenter ? cascade.x : cascade.y;\n    margin = 0.25 * pow(closestEdge, 2.0);\n    cascade += margin * vec2(-0.5, 0.5);\n\n    if (clipDepth >= cascade.x && (clipDepth < cascade.y || lastCascade)) {\n      directionalLightShadow = directionalLightShadows[i];\n      float prevShadow = nextShadow;\n      nextShadow =\n        directLight.visible && receiveShadow\n          ? getShadow(\n            directionalShadowMap[i],\n            directionalLightShadow.shadowMapSize,\n            directionalLightShadow.shadowIntensity,\n            directionalLightShadow.shadowBias,\n            directionalLightShadow.shadowRadius,\n            vDirectionalShadowCoord[i]\n          )\n          : 1.0;\n\n      shadow = mix(\n        prevShadow,\n        nextShadow,\n        saturate(min(clipDepth - cascade.x, cascade.y - clipDepth) / margin)\n      );\n    }\n    #endif // UNROLLED_LOOP_INDEX < CSM_CASCADE_COUNT\n    #endif // UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS\n  }\n  #pragma unroll_loop_end\n\n  // No loop here: all cascaded lights are in fact one light only.\n  directLight.color *= shadow;\n  #if defined(USE_GBUFFER_SHADOW) && !defined(USE_SHADOWMAP_DEPTH)\n  // Feed the G-buffer shadow output (declared by gbuffer_pars_fragment).\n  nvr_shadowMask *= shadow;\n  #endif\n  RE_Direct(\n    directLight,\n    geometryPosition,\n    geometryNormal,\n    geometryViewDir,\n    geometryClearcoatNormal,\n    material,\n    reflectedLight\n  );\n\n  // The rest of directional lights.\n  #pragma unroll_loop_start\n  for (int i = 0; i < NUM_DIR_LIGHTS; i++) {\n    #if UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS\n    #if UNROLLED_LOOP_INDEX >= CSM_CASCADE_COUNT\n    directionalLight = directionalLights[i];\n    getDirectionalLightInfo(directionalLight, directLight);\n\n    directionalLightShadow = directionalLightShadows[i];\n    {\n      float nvrShadowFactor =\n        directLight.visible && receiveShadow\n          ? getShadow(\n            directionalShadowMap[i],\n            directionalLightShadow.shadowMapSize,\n            directionalLightShadow.shadowIntensity,\n            directionalLightShadow.shadowBias,\n            directionalLightShadow.shadowRadius,\n            vDirectionalShadowCoord[i]\n          )\n          : 1.0;\n      directLight.color *= nvrShadowFactor;\n      #if defined(USE_GBUFFER_SHADOW) && !defined(USE_SHADOWMAP_DEPTH)\n      nvr_shadowMask *= nvrShadowFactor;\n      #endif\n    }\n\n    RE_Direct(\n      directLight,\n      geometryPosition,\n      geometryNormal,\n      geometryViewDir,\n      geometryClearcoatNormal,\n      material,\n      reflectedLight\n    );\n    #endif // UNROLLED_LOOP_INDEX >= CSM_CASCADE_COUNT\n    #endif // UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS\n  }\n  #pragma unroll_loop_end\n}\n", Tb = "// Based on the following work:\n// https://github.com/StrandedKitty/three-csm/tree/master/src\n// https://github.com/mrdoob/three.js/tree/r169/examples/jsm/csm\n\nvoid cascadedLights() {\n  directionalLight = directionalLights[0];\n  getDirectionalLightInfo(directionalLight, directLight);\n\n  float clipDepth = vViewPosition.z / (csmFar - csmNear);\n  vec2 cascade;\n\n  #pragma unroll_loop_start\n  for (int i = 0; i < NUM_DIR_LIGHTS; i++) {\n    #if UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS\n    #if UNROLLED_LOOP_INDEX < CSM_CASCADE_COUNT\n    cascade = csmCascades[i];\n    directionalLightShadow = directionalLightShadows[i];\n    if (clipDepth >= cascade.x && clipDepth < cascade.y) {\n      float nvrShadowFactor =\n        directLight.visible && receiveShadow\n          ? getShadow(\n            directionalShadowMap[i],\n            directionalLightShadow.shadowMapSize,\n            directionalLightShadow.shadowIntensity,\n            directionalLightShadow.shadowBias,\n            directionalLightShadow.shadowRadius,\n            vDirectionalShadowCoord[i]\n          )\n          : 1.0;\n      directLight.color *= nvrShadowFactor;\n      #if defined(USE_GBUFFER_SHADOW) && !defined(USE_SHADOWMAP_DEPTH)\n      // Feed the G-buffer shadow output (declared by gbuffer_pars_fragment).\n      nvr_shadowMask *= nvrShadowFactor;\n      #endif\n    }\n    #endif // UNROLLED_LOOP_INDEX < CSM_CASCADE_COUNT\n    #endif // UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS\n  }\n  #pragma unroll_loop_end\n\n  // No loop here: all cascaded lights are in fact one light only.\n  RE_Direct(\n    directLight,\n    geometryPosition,\n    geometryNormal,\n    geometryViewDir,\n    geometryClearcoatNormal,\n    material,\n    reflectedLight\n  );\n\n  // The rest of directional lights.\n  #pragma unroll_loop_start\n  for (int i = 0; i < NUM_DIR_LIGHTS; i++) {\n    #if UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS\n    #if UNROLLED_LOOP_INDEX >= CSM_CASCADE_COUNT\n    directionalLight = directionalLights[i];\n    getDirectionalLightInfo(directionalLight, directLight);\n\n    directionalLightShadow = directionalLightShadows[i];\n    {\n      float nvrShadowFactor =\n        directLight.visible && receiveShadow\n          ? getShadow(\n            directionalShadowMap[i],\n            directionalLightShadow.shadowMapSize,\n            directionalLightShadow.shadowIntensity,\n            directionalLightShadow.shadowBias,\n            directionalLightShadow.shadowRadius,\n            vDirectionalShadowCoord[i]\n          )\n          : 1.0;\n      directLight.color *= nvrShadowFactor;\n      #if defined(USE_GBUFFER_SHADOW) && !defined(USE_SHADOWMAP_DEPTH)\n      nvr_shadowMask *= nvrShadowFactor;\n      #endif\n    }\n\n    RE_Direct(\n      directLight,\n      geometryPosition,\n      geometryNormal,\n      geometryViewDir,\n      geometryClearcoatNormal,\n      material,\n      reflectedLight\n    );\n    #endif // UNROLLED_LOOP_INDEX >= CSM_CASCADE_COUNT\n    #endif // UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS\n  }\n  #pragma unroll_loop_end\n}\n", Eb = "// Based on the following work:\n// https://github.com/StrandedKitty/three-csm/tree/master/src\n// https://github.com/mrdoob/three.js/tree/r169/examples/jsm/csm\n\nvoid cascadedLightsWithoutShadows() {\n  // No loop here: all cascaded lights are in fact one light only.\n  getDirectionalLightInfo(directionalLights[0], directLight);\n  RE_Direct(\n    directLight,\n    geometryPosition,\n    geometryNormal,\n    geometryViewDir,\n    geometryClearcoatNormal,\n    material,\n    reflectedLight\n  );\n\n  // The rest of directional lights.\n  #pragma unroll_loop_start\n  for (int i = CSM_CASCADE_COUNT; i < NUM_DIR_LIGHTS; i++) {\n    directionalLight = directionalLights[i];\n    getDirectionalLightInfo(directionalLight, directLight);\n\n    RE_Direct(\n      directLight,\n      geometryPosition,\n      geometryNormal,\n      geometryViewDir,\n      geometryClearcoatNormal,\n      material,\n      reflectedLight\n    );\n  }\n  #pragma unroll_loop_end\n}\n", Db = "// Default shader.\n// See: https://github.com/mrdoob/three.js/blob/r169/src/renderers/shaders/ShaderChunk/lights_fragment_begin.glsl.js#L136\n\nvoid defaultLights() {\n  #pragma unroll_loop_start\n  for (int i = 0; i < NUM_DIR_LIGHTS; i++) {\n    directionalLight = directionalLights[i];\n    getDirectionalLightInfo(directionalLight, directLight);\n\n    #if defined(USE_SHADOWMAP) && UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS\n    directionalLightShadow = directionalLightShadows[i];\n    {\n      float nvrShadowFactor =\n        directLight.visible && receiveShadow\n          ? getShadow(\n            directionalShadowMap[i],\n            directionalLightShadow.shadowMapSize,\n            directionalLightShadow.shadowIntensity,\n            directionalLightShadow.shadowBias,\n            directionalLightShadow.shadowRadius,\n            vDirectionalShadowCoord[i]\n          )\n          : 1.0;\n      directLight.color *= nvrShadowFactor;\n      #if defined(USE_GBUFFER_SHADOW) && !defined(USE_SHADOWMAP_DEPTH)\n      // Feed the G-buffer shadow output (declared by gbuffer_pars_fragment).\n      nvr_shadowMask *= nvrShadowFactor;\n      #endif\n    }\n    #endif\n\n    RE_Direct(\n      directLight,\n      geometryPosition,\n      geometryNormal,\n      geometryViewDir,\n      geometryClearcoatNormal,\n      material,\n      reflectedLight\n    );\n  }\n  #pragma unroll_loop_end\n}\n", Ob = "void nonShadowCastingLights() {\n  #pragma unroll_loop_start\n  for (int i = NUM_DIR_LIGHT_SHADOWS; i < NUM_DIR_LIGHTS; i++) {\n    directionalLight = directionalLights[i];\n    getDirectionalLightInfo(directionalLight, directLight);\n\n    RE_Direct(\n      directLight,\n      geometryPosition,\n      geometryNormal,\n      geometryViewDir,\n      geometryClearcoatNormal,\n      material,\n      reflectedLight\n    );\n  }\n  #pragma unroll_loop_end\n}\n", kb = "\n  #include <lights_pars_begin>\n\n  #ifdef CSM\n    uniform vec2 csmCascades[CSM_CASCADE_COUNT];\n    uniform float csmNear;\n    uniform float csmFar;\n  #endif // CSM\n";
function Ab(e) {
	return e.replace(/^\s*void\s+\w+\s*\(\s*\)\s*/m, "");
}
var jb = `
  #if NUM_DIR_LIGHTS > 0 && defined(RE_Direct)
    DirectionalLight directionalLight;
    #if defined(USE_SHADOWMAP) && NUM_DIR_LIGHT_SHADOWS > 0
      DirectionalLightShadow directionalLightShadow;
    #endif

    #ifdef CSM
      #ifdef USE_SHADOWMAP
        #ifdef CSM_FADE
          ${Ab(wb)}
        #else
          ${Ab(Tb)}
        #endif // CSM_FADE
      #elif NUM_DIR_LIGHT_SHADOWS > 0
        ${Ab(Eb)}
      #endif // USE_SHADOWMAP

      #if NUM_DIR_LIGHTS > NUM_DIR_LIGHT_SHADOWS
        ${Ab(Ob)}
      #endif
    #else
      ${Ab(Db)}
    #endif // CSM
  #endif // NUM_DIR_LIGHTS > 0 && defined(RE_Direct)
`;
function Mb({ source: e, startLine: t, endLine: n, replacement: r }) {
	let i = `\n${t}\n`, a = e.indexOf(i);
	if (a < 0) return e;
	let o = `\n${n}\n`, s = e.indexOf(o, a + i.length);
	return s < 0 ? e : e.slice(0, a + 1) + r + e.slice(s + o.length - 1);
}
function Nb(e) {
	return e.replace("#include <lights_pars_begin>", kb).replace("#include <lights_fragment_begin>", Mb({
		source: qt.lights_fragment_begin,
		startLine: "#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )",
		endLine: "#endif",
		replacement: jb
	}));
}
var Pb = "NVR_VIEW_SPACE_SHADOW", Fb = "\n#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0\n// Per-cascade shadow matrices composed with the render camera's world matrix\n// on the CPU in f64 (shadow.matrix * camera.matrixWorld). Multiplied with the\n// view-space position instead of the absolute world position to avoid f32\n// cancellation at ECEF magnitudes.\n//\n// Only the CSM cascade lights (the first CSM_CASCADE_COUNT shadow indices,\n// matching the ordering assumption of the CSM fragment shader) get these\n// matrices; additional shadow-casting directional lights keep the stock\n// directionalShadowMatrix path. Outside a CSM material the define is absent —\n// treat every directional shadow as camera-composed then.\n#ifndef CSM_CASCADE_COUNT\n#define CSM_CASCADE_COUNT NUM_DIR_LIGHT_SHADOWS\n#endif\nuniform mat4 nvrCsmShadowMatrixView[ CSM_CASCADE_COUNT ];\n#endif\n";
function Ib(e, t, n) {
	if (!e.includes(t)) throw Error(`Failed to replace "${t}" in shader code. The pattern was not found.`);
	return e.replace(t, n);
}
function Lb(e, t) {
	if (e.defines?.USE_SHADOWMAP_DEPTH || !e.vertexShader.includes("#include <shadowmap_vertex>")) return;
	e.uniforms.nvrCsmShadowMatrixView = t, e.fragmentShader = `#define ${Pb}\n${e.fragmentShader}`;
	let n = Ib(qt.shadowmap_vertex, "shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );", "#if UNROLLED_LOOP_INDEX < CSM_CASCADE_COUNT\n			shadowWorldPosition = vec4( mvPosition.xyz + ( viewMatrix * vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0.0 ) ).xyz, 1.0 );\n			#else\n			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );\n			#endif");
	n = Ib(n, "vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;", "#if UNROLLED_LOOP_INDEX < CSM_CASCADE_COUNT\n			vDirectionalShadowCoord[ i ] = nvrCsmShadowMatrixView[ i ] * shadowWorldPosition;\n			#else\n			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;\n			#endif"), e.vertexShader = Ib(Ib(e.vertexShader, "#include <shadowmap_pars_vertex>", `#include <shadowmap_pars_vertex>\n${Fb}`), "#include <shadowmap_vertex>", n);
}
function Rb(e, t, n) {
	n.length = e.length;
	for (let r = 0; r < e.length; r++) (n[r] ?? (n[r] = new E())).multiplyMatrices(e[r].shadow.matrix, t);
}
var zb = class {
	map = /* @__PURE__ */ new Map();
	setup(e, t) {
		if (this.map.has(e)) return e;
		e.userData.defines ??= {}, e.userData.defines.CSM = 1, e.userData.defines.CSM_CASCADE_COUNT = t.cascadeCount, t.fade && (e.userData.defines.CSM_FADE = 1);
		let n = {};
		this.map.set(e, n);
		let r = (e, r) => {
			n.parameters = e, t.captureRenderer(r);
			let i = t.cascades, a = t.mainCamera.near, o = Math.min(t.mainCamera.far, t.far), s = e.uniforms;
			s.csmCascades = { value: i }, s.csmNear = { value: a }, s.csmFar = { value: o }, e.fragmentShader = Nb(e.fragmentShader), Lb(e, t.shadowMatricesViewUniform);
		}, i = e.onBeforeCompile.bind(e), a = e.customProgramCacheKey.bind(e);
		Object.prototype.hasOwnProperty.call(e, "hasOwnProperty") && (n.originalHandler = i), e.customProgramCacheKey = () => i.toString() + a(), e.onBeforeCompile = (...t) => {
			let [n] = t;
			n.defines ??= {}, Object.assign(n.defines, e.userData.defines), i.apply(e, t), r(...t);
		};
		let o = () => {
			this.map.delete(e), e.removeEventListener("dispose", o);
		};
		return e.addEventListener("dispose", o), e;
	}
	update(e) {
		let t = e.cascadeCount, n = e.fade, r = e.cascades, i = e.mainCamera.near, a = Math.min(e.mainCamera.far, e.far);
		for (let [e, o] of this.map.entries()) {
			let s = e.userData.defines;
			if (s != null) {
				let r = !1;
				s.CSM_FADE != null !== n && (n ? s.CSM_FADE = 1 : delete s.CSM_FADE, r = !0), s.CSM_CASCADE_COUNT !== t && (s.CSM_CASCADE_COUNT = t, r = !0), r && (e.needsUpdate = !0);
			}
			let c = o.parameters?.uniforms;
			c != null && (c.csmCascades.value = r, c.csmNear.value = i, c.csmFar.value = a);
		}
	}
	rollback(e) {
		let t = this.map.get(e);
		return t == null ? e : this.rollbackToState(e, t);
	}
	rollbackToState(e, { parameters: t, originalHandler: n }) {
		return t != null && (delete t.uniforms.csmCascades, delete t.uniforms.csmNear, delete t.uniforms.csmFar, delete t.uniforms.nvrCsmShadowMatrixView), n == null ? delete e.onBeforeCompile : e.onBeforeCompile = n, e.userData.defines != null && (delete e.userData.defines.CSM, delete e.userData.defines.CSM_CASCADE_COUNT, delete e.userData.defines.CSM_FADE), e.needsUpdate = !0, this.map.delete(e), e;
	}
	dispose() {
		for (let [e, t] of this.map) this.rollbackToState(e, t);
		this.map.clear();
	}
};
Math.PI / 180, 180 / Math.PI;
function Bb(e, t, n) {
	return (1 - n) * e + n * t;
}
var Vb = {
	uniform: (e, t, n, r, i = []) => {
		for (let r = 0; r < e; ++r) i[r] = (t + (n - t) * (r + 1) / e) / n;
		return i.length = e, i;
	},
	logarithmic: (e, t, n, r, i = []) => {
		for (let r = 0; r < e; ++r) i[r] = t * (n / t) ** ((r + 1) / e) / n;
		return i.length = e, i;
	},
	practical: (e, t, n, r = .5, i = []) => {
		for (let a = 0; a < e; ++a) {
			let o = (t + (n - t) * (a + 1) / e) / n, s = t * (n / t) ** ((a + 1) / e) / n;
			i[a] = Bb(o, s, r);
		}
		return i.length = e, i;
	}
};
function Hb(e, t, n, r, i, a = []) {
	return Vb[e](t, n, r, i, a);
}
var Ub = /*#__PURE__*/ new j(), Wb = /*#__PURE__*/ new j(), Gb = /*#__PURE__*/ new E(), Kb = /*#__PURE__*/ new E(), qb = /*#__PURE__*/ new Cb(), Jb = /*#__PURE__*/ new Ie(), Yb = {
	cascadeCount: 4,
	mapSize: 2048,
	far: 5e3,
	mode: "practical",
	lambda: .5,
	margin: 200,
	fade: !0,
	disableLastCascadeCutoff: !1
}, Xb = class {
	mainCamera;
	needsUpdateFrusta = !0;
	directionalLights = new bb();
	materialStates = new zb();
	mainFrustum = new Cb();
	cascadedFrusta = [];
	splits = [];
	cascades = [];
	_far;
	_mode;
	_lambda;
	_margin;
	_fade;
	_disableLastCascadeCutoff;
	_shadowMatricesView = [];
	_shadowMatricesViewFrame = -1;
	_renderer = null;
	shadowMatricesViewUniform;
	constructor(e, t) {
		this.mainCamera = e;
		let n = () => (this.refreshShadowMatricesView(), this._shadowMatricesView);
		this.shadowMatricesViewUniform = { get value() {
			return n();
		} };
		let { cascadeCount: r, mapSize: i, far: a, mode: o, lambda: s, margin: c, fade: l, disableLastCascadeCutoff: u } = {
			...Yb,
			...t
		};
		this._far = a, this._mode = o, this._lambda = s, this._margin = c, this._fade = l, this._disableLastCascadeCutoff = u, this.cascadeCount = r, this.mapSize = i;
	}
	dispose() {
		this.materialStates.dispose(), this.directionalLights.dispose();
	}
	setupMaterial(e) {
		return this.materialStates.setup(e, this);
	}
	captureRenderer(e) {
		this._renderer ??= e;
	}
	refreshShadowMatricesView() {
		let e = this._renderer?.info.render.frame ?? -1;
		(e === -1 || e !== this._shadowMatricesViewFrame) && (this._shadowMatricesViewFrame = e, Rb(this.directionalLights.cascadedLights, this.mainCamera.matrixWorld, this._shadowMatricesView));
	}
	rollbackMaterial(e) {
		return this.materialStates.rollback(e);
	}
	setupMaterials(e) {
		for (let t = 0; t < e.length; ++t) this.materialStates.setup(e[t], this);
		return () => {
			for (let t = 0; t < e.length; ++t) this.materialStates.rollback(e[t]);
		};
	}
	updateCascades() {
		let e = this.cascadeCount, t = this.splits;
		Hb(this.mode, e, this.mainCamera.near, Math.min(this.mainCamera.far, this.far), this.lambda, t), this.mainFrustum.setFromCamera(this.mainCamera, this.far), this.mainFrustum.split(t, this.cascadedFrusta);
		let n = this.cascades;
		for (let r = 0; r < e; ++r) (n[r] ?? (n[r] = new A())).set(t[r - 1] ?? 0, t[r] ?? 0);
		this.disableLastCascadeCutoff && (n[e - 1].y = Infinity), n.length = e;
	}
	getFrustumRadius(e) {
		let t = e.near, n = e.far, r = Math.max(n[0].distanceTo(n[2]), n[0].distanceTo(t[2]));
		if (this.fade) {
			let e = this.mainCamera, t = e.near, i = Math.min(e.far, this.far), a = n[0].z / (i - t);
			r += .25 * a ** 2 * (i - t);
		}
		return r * .5;
	}
	updateShadowBounds() {
		let e = this.cascadedFrusta, t = this.directionalLights.cascadedLights;
		Sb(e.length === t.length);
		for (let n = 0; n < e.length; ++n) {
			let e = this.getFrustumRadius(this.cascadedFrusta[n]), r = t[n].shadow.camera;
			r.left = -e, r.right = e, r.top = e, r.bottom = -e, r.near = 0, r.far = e * 2 + this.margin, r.updateProjectionMatrix();
		}
	}
	updateFrusta() {
		this.updateCascades(), this.updateShadowBounds(), this.materialStates.update(this);
	}
	update() {
		this.needsUpdateFrusta && (this.needsUpdateFrusta = !1, this.updateFrusta());
		let e = this.directionalLights, t = Ub.copy(e.direction).normalize(), n = Gb.lookAt(new j(), t, Mt.DEFAULT_UP), r = Kb.multiplyMatrices(Kb.copy(n).invert(), this.mainCamera.matrixWorld), i = this.margin, a = this.mapSize, o = this.cascadedFrusta, s = e.cascadedLights;
		for (let e = 0; e < o.length; ++e) {
			let { near: c, far: l } = qb.copy(o[e]).applyMatrix4(r), u = Jb.makeEmpty();
			for (let e = 0; e < 4; e++) u.expandByPoint(c[e]), u.expandByPoint(l[e]);
			let d = u.getCenter(Wb);
			d.z = u.max.z + i;
			let f = s[e], { left: p, right: m, top: h, bottom: g } = f.shadow.camera, _ = (m - p) / a, v = (h - g) / a;
			d.x = Math.round(d.x / _) * _, d.y = Math.round(d.y / v) * v, d.applyMatrix4(n), f.position.copy(d), f.target.position.copy(d), f.target.position.add(t);
		}
	}
	get cascadeCount() {
		return this.directionalLights.cascadedLights.length;
	}
	set cascadeCount(e) {
		e !== this.cascadeCount && (this.directionalLights.setCount(e), this.needsUpdateFrusta = !0);
	}
	get mapSize() {
		return this.directionalLights.mainLight.shadow.mapSize.width;
	}
	set mapSize(e) {
		if (e !== this.mapSize) {
			let t = this.directionalLights.cascadedLights;
			for (let n = 0; n < t.length; ++n) {
				let r = t[n].shadow;
				r.mapSize.width = e, r.mapSize.height = e, r.map != null && (r.map.dispose(), r.map = null);
			}
		}
	}
	get far() {
		return this._far;
	}
	set far(e) {
		e !== this._far && (this._far = e, this.needsUpdateFrusta = !0);
	}
	get mode() {
		return this._mode;
	}
	set mode(e) {
		e !== this._mode && (this._mode = e, this.needsUpdateFrusta = !0);
	}
	get lambda() {
		return this._lambda;
	}
	set lambda(e) {
		e !== this._lambda && (this._lambda = e, this.needsUpdateFrusta = !0);
	}
	get margin() {
		return this._margin;
	}
	set margin(e) {
		e !== this._margin && (this._margin = e, this.needsUpdateFrusta = !0);
	}
	get fade() {
		return this._fade;
	}
	set fade(e) {
		e !== this._fade && (this._fade = e, this.needsUpdateFrusta = !0);
	}
	get disableLastCascadeCutoff() {
		return this._disableLastCascadeCutoff;
	}
	set disableLastCascadeCutoff(e) {
		e !== this._disableLastCascadeCutoff && (this._disableLastCascadeCutoff = e, this.needsUpdateFrusta = !0);
	}
	get intensity() {
		return this.directionalLights.mainLight.intensity;
	}
	set intensity(e) {
		if (e !== this.intensity) {
			let t = this.directionalLights.cascadedLights;
			for (let n = 0; n < t.length; ++n) t[n].intensity = e;
		}
	}
	get shadowIntensity() {
		return this.directionalLights.mainLight.shadow.intensity;
	}
	set shadowIntensity(e) {
		if (e !== this.shadowIntensity) {
			let t = this.directionalLights.cascadedLights;
			for (let n = 0; n < t.length; ++n) t[n].shadow.intensity = e;
		}
	}
	get color() {
		return this.directionalLights.mainLight.color;
	}
	set color(e) {
		e !== this.color && this.directionalLights.mainLight.color.copy(e);
	}
	get bias() {
		return this.directionalLights.mainLight.shadow.bias;
	}
	set bias(e) {
		if (e !== this.bias) {
			let t = this.directionalLights.cascadedLights;
			for (let n = 0; n < t.length; ++n) t[n].shadow.bias = e;
		}
	}
	get normalBias() {
		return this.directionalLights.mainLight.shadow.normalBias;
	}
	set normalBias(e) {
		if (e !== this.normalBias) {
			let t = this.directionalLights.cascadedLights;
			for (let n = 0; n < t.length; ++n) t[n].shadow.normalBias = e;
		}
	}
	get radius() {
		return this.directionalLights.mainLight.shadow.radius;
	}
	set radius(e) {
		if (e !== this.radius) {
			let t = this.directionalLights.cascadedLights;
			for (let n = 0; n < t.length; ++n) t[n].shadow.radius = e;
		}
	}
	get blurSamples() {
		return this.directionalLights.mainLight.shadow.blurSamples;
	}
	set blurSamples(e) {
		if (e !== this.blurSamples) {
			let t = this.directionalLights.cascadedLights;
			for (let n = 0; n < t.length; ++n) t[n].shadow.blurSamples = e;
		}
	}
}, Zb = class extends at {
	csm;
	displayFrustum = !0;
	displayPlanes = !0;
	displayShadowBounds = !0;
	frustumLines;
	cascadeLines = [];
	cascadePlanes = [];
	shadowLines = [];
	constructor(e) {
		super(), this.csm = e;
		let t = new Uint16Array([
			0,
			1,
			1,
			2,
			2,
			3,
			3,
			0,
			4,
			5,
			5,
			6,
			6,
			7,
			7,
			4,
			0,
			4,
			1,
			5,
			2,
			6,
			3,
			7
		]), n = /* @__PURE__ */ new Float32Array(24), r = new ze();
		r.setIndex(new C(t, 1)), r.setAttribute("position", new C(n, 3, !1));
		let i = new _t(r, new gt());
		this.add(i), this.frustumLines = i;
	}
	updateVisibility() {
		let e = this.displayFrustum, t = this.displayPlanes, n = this.displayShadowBounds, r = this.frustumLines, i = this.cascadeLines, a = this.cascadePlanes, o = this.shadowLines;
		for (let r = 0, s = i.length; r < s; r++) {
			let s = i[r], c = a[r], l = o[r];
			s.visible = e, c.visible = e && t, l.visible = n;
		}
		r.visible = e;
	}
	update() {
		let e = this.csm, t = e.mainCamera, n = e.cascadeCount, r = e.mainFrustum, i = e.cascadedFrusta, a = e.directionalLights.cascadedLights, o = this.frustumLines.geometry.getAttribute("position"), s = this.cascadeLines, c = this.cascadePlanes, l = this.shadowLines;
		for (this.position.copy(t.position), this.quaternion.copy(t.quaternion), this.scale.copy(t.scale), this.updateMatrixWorld(!0); s.length > n;) {
			let e = s.pop(), t = c.pop(), n = l.pop();
			e && this.remove(e), t && this.remove(t), n && this.remove(n);
		}
		for (; s.length < n;) {
			let e = new Le(new Ie(), new w(16777215)), t = new Dt({
				transparent: !0,
				opacity: .1,
				depthWrite: !1,
				side: Ze
			}), n = new D(new Ft(), t), r = new at(), i = new Le(new Ie(), new w(16776960));
			r.add(i), this.add(e), this.add(n), this.add(r), s.push(e), c.push(n), l.push(r);
		}
		for (let e = 0; e < n; e++) {
			let t = i[e], n = a[e].shadow.camera, r = t.far, o = s[e], u = c[e], d = l[e], f = d.children[0];
			o.box.min.copy(r[2]), o.box.max.copy(r[0]), o.box.max.z += 1e-4, u.position.addVectors(r[0], r[2]), u.position.multiplyScalar(.5), u.scale.subVectors(r[0], r[2]), u.scale.z = 1e-4, this.remove(d), d.position.copy(n.position), d.quaternion.copy(n.quaternion), d.scale.copy(n.scale), d.updateMatrixWorld(!0), this.attach(d), f.box.min.set(n.bottom, n.left, -n.far), f.box.max.set(n.top, n.right, -n.near);
		}
		let u = r.near, d = r.far;
		o.setXYZ(0, d[0].x, d[0].y, d[0].z), o.setXYZ(1, d[3].x, d[3].y, d[3].z), o.setXYZ(2, d[2].x, d[2].y, d[2].z), o.setXYZ(3, d[1].x, d[1].y, d[1].z), o.setXYZ(4, u[0].x, u[0].y, u[0].z), o.setXYZ(5, u[3].x, u[3].y, u[3].z), o.setXYZ(6, u[2].x, u[2].y, u[2].z), o.setXYZ(7, u[1].x, u[1].y, u[1].z), o.needsUpdate = !0;
	}
}, $ = {
	distance: 300,
	color: new w(16777215),
	applyColor: !1,
	intensity: 1,
	castShadow: !0,
	shadowMapSize: 2048,
	shadowCascadeCount: 4,
	shadowFar: 5e4,
	shadowMode: "practical",
	shadowLambda: .8,
	shadowMargin: 5e3,
	shadowFade: !0,
	shadowIntensity: 1,
	shadowBias: 1e-4,
	shadowNormalBias: 0,
	shadowRadius: 1,
	debugCSMHelper: !1
}, Qb = class extends Fu {
	raw;
	transmittanceTexture = null;
	options;
	csm;
	csmHelper = null;
	camera;
	constructor(e, t = {}) {
		super(), this.camera = e, this.options = {
			...$,
			...t
		}, this.raw = new ac({ distance: this.options.distance }), this.initializeCSM(), this.raw.intensity = this.intensity, this.raw.color.copy(this.color), this.castShadow = !!this.options.castShadow;
	}
	updateSunDirection(e) {
		this.raw.sunDirection.copy(e);
	}
	updateTargetPosition(e) {
		this.applyColor || this.raw.target.position.copy(e);
	}
	update() {
		this.raw.update(), this.castShadow && (this.csm.directionalLights.direction.copy(this.raw.sunDirection.negate()), this.applyColor || (this.csm.color = this.color)), this.updateCSM();
	}
	setTransmittanceTexture(e) {
		this.transmittanceTexture = e, this.raw.transmittanceTexture = this.applyColor ? null : e;
	}
	clearTransmittanceTexture() {
		this.raw.transmittanceTexture = null;
	}
	initializeCSM() {
		this.camera && (this.csm = new Xb(this.camera, {
			cascadeCount: this.options.shadowCascadeCount,
			mapSize: this.options.shadowMapSize,
			far: this.options.shadowFar,
			mode: this.options.shadowMode,
			lambda: this.options.shadowLambda,
			margin: this.options.shadowMargin,
			fade: this.options.shadowFade
		}), this.csm.directionalLights.direction.copy(this.raw.sunDirection), this.csm.intensity = this.options.intensity ?? $.intensity, this.csm.shadowIntensity = this.options.shadowIntensity ?? $.shadowIntensity, this.csm.bias = this.options.shadowBias ?? $.shadowBias, this.csm.normalBias = this.options.shadowNormalBias ?? $.shadowNormalBias, this.csm.radius = this.options.shadowRadius ?? $.shadowRadius, this.csm.color.copy(this.options.color ?? $.color), this.options.debugCSMHelper && (this.csmHelper = new Zb(this.csm)));
	}
	updateCSM() {
		this.csm.update(), this.csmHelper && this.csmHelper.update();
	}
	setCamera(e) {
		this.camera = e;
	}
	setupMaterialForCSM(e) {
		this.csm.setupMaterial(e);
	}
	removeMaterialFromCSM(e) {
		this.csm.rollbackMaterial(e);
	}
	getCSM() {
		return this.csm;
	}
	getCSMHelper() {
		return this.csmHelper;
	}
	getSceneLights() {
		return this.castShadow ? this.csm.directionalLights : this.raw;
	}
	getSceneHelper() {
		return this.csmHelper;
	}
	get visible() {
		return this.raw.visible;
	}
	set visible(e) {
		this.raw.visible = e, this.csm.directionalLights.visible = e, this.emit("needsUpdate");
	}
	get intensity() {
		return this.raw.intensity;
	}
	set intensity(e) {
		this.raw.intensity = e, this.csm.intensity = this.intensity, this.emit("needsUpdate");
	}
	get shadowIntensity() {
		return this.csm.shadowIntensity;
	}
	set shadowIntensity(e) {
		this.csm.shadowIntensity = e, this.emit("needsUpdate");
	}
	get color() {
		return this.raw.color;
	}
	set color(e) {
		this.options.color = e, this.raw.color.copy(e), this.csm.color.copy(this.color), this.emit("needsUpdate");
	}
	get applyColor() {
		return this.options.applyColor ?? $.applyColor;
	}
	set applyColor(e) {
		this.options.applyColor = e, this.raw.transmittanceTexture = e ? null : this.transmittanceTexture, e && (this.color = this.options.color ?? $.color), this.emit("needsUpdate");
	}
	get target() {
		return this.raw.target;
	}
	get castShadow() {
		return !!this.options.castShadow;
	}
	set castShadow(e) {
		this.options.castShadow = e, this.emit("_csmChanged"), this.emit("needsUpdate");
	}
	get shadowMapSize() {
		return this.options.shadowMapSize ?? $.shadowMapSize;
	}
	set shadowMapSize(e) {
		this.options.shadowMapSize = e, this.csm.mapSize = e, this.emit("needsUpdate");
	}
	get shadowFar() {
		return this.options.shadowFar ?? $.shadowFar;
	}
	set shadowFar(e) {
		this.options.shadowFar = e, this.csm.far = e, this.emit("needsUpdate");
	}
	get shadowCascadeCount() {
		return this.options.shadowCascadeCount ?? $.shadowCascadeCount;
	}
	set shadowCascadeCount(e) {
		this.options.shadowCascadeCount = e, this.csm.cascadeCount = e, this.emit("needsUpdate");
	}
	get shadowMode() {
		return this.options.shadowMode ?? $.shadowMode;
	}
	set shadowMode(e) {
		this.options.shadowMode = e, this.csm.mode = e, this.emit("needsUpdate");
	}
	get shadowLambda() {
		return this.options.shadowLambda ?? $.shadowLambda;
	}
	set shadowLambda(e) {
		this.options.shadowLambda = e, this.csm.lambda = e, this.emit("needsUpdate");
	}
	get shadowMargin() {
		return this.options.shadowMargin ?? $.shadowMargin;
	}
	set shadowMargin(e) {
		this.options.shadowMargin = e, this.csm.margin = e, this.emit("needsUpdate");
	}
	get shadowFade() {
		return this.options.shadowFade ?? $.shadowFade;
	}
	set shadowFade(e) {
		this.options.shadowFade = e, this.csm.fade = e, this.emit("needsUpdate");
	}
	get shadowBias() {
		return this.options.shadowBias ?? $.shadowBias;
	}
	set shadowBias(e) {
		this.options.shadowBias = e, this.csm.bias = e, this.emit("needsUpdate");
	}
	get shadowNormalBias() {
		return this.options.shadowNormalBias ?? $.shadowNormalBias;
	}
	set shadowNormalBias(e) {
		this.options.shadowNormalBias = e, this.csm.normalBias = e, this.emit("needsUpdate");
	}
	get shadowRadius() {
		return this.options.shadowRadius ?? $.shadowRadius;
	}
	set shadowRadius(e) {
		this.options.shadowRadius = e, this.csm.radius = e, this.emit("needsUpdate");
	}
	get debugCSMHelper() {
		return this.options.debugCSMHelper ?? $.debugCSMHelper;
	}
	set debugCSMHelper(e) {
		this.options.debugCSMHelper = e, this.emit("needsUpdate");
	}
}, $b = class extends Fu {
	raw;
	constructor(e = {}) {
		super(), this.raw = new Hs(), e.intensity !== void 0 && (this.raw.intensity = e.intensity);
	}
	setTextures(e) {
		this.raw.irradianceTexture = e.irradianceTexture;
	}
	updateSunDirection(e) {
		this.raw.sunDirection.copy(e);
	}
	updatePosition(e) {
		this.raw.position.copy(e);
	}
	get visible() {
		return this.raw.visible;
	}
	set visible(e) {
		this.raw.visible = e, this.emit("needsUpdate");
	}
	get intensity() {
		return this.raw.intensity;
	}
	set intensity(e) {
		this.raw.intensity = e, this.emit("needsUpdate");
	}
	update() {
		this.raw.update();
	}
}, ex = class extends d {
	config;
	constructor(e, t, n) {
		super(e, t, n), this.config = n;
	}
	createLight() {
		let e = this.config.ambient || {}, t = { intensity: e.intensity ?? 1 };
		e.color !== void 0 && (t.color = e.color.raw);
		let n = new vb(t);
		return n.on("needsUpdate", () => this.emit("needsUpdate")), n;
	}
	onUpdateConfig(e) {
		super.onUpdateConfig(e), this.config.ambient && e.ambient && this._instance && (Object.assign(this.config.ambient, e.ambient), e.ambient.intensity !== void 0 && (this._instance.intensity = e.ambient.intensity), e.ambient.color !== void 0 && (this._instance.color = e.ambient.color.raw));
	}
}, tx = class extends d {
	config;
	constructor(e, t, n) {
		super(e, t, n), this.config = n;
	}
	createLight() {
		let e = this.config.sun ?? {}, t = e.color ? e.color.raw : void 0, n = new Qb(this.view.camera.raw, {
			...e,
			...t ? { color: t } : {}
		});
		return n.applyColor || this.requestTransmittanceTexture(n), n.on("needsUpdate", () => this.emit("needsUpdate")), n.on("_csmChanged", this.updateSceneLights.bind(this)), n;
	}
	onUpdateConfig(e) {
		super.onUpdateConfig(e), this.config.sun && e.sun && this._instance && (Object.assign(this.config.sun, e.sun), e.sun.intensity !== void 0 && (this._instance.intensity = e.sun.intensity), e.sun.color !== void 0 && (this._instance.color = e.sun.color.raw), e.sun.applyColor !== void 0 && (this._instance.applyColor = e.sun.applyColor, e.sun.applyColor || this.requestTransmittanceTexture(this._instance)), e.sun.castShadow !== void 0 && (this._instance.castShadow = e.sun.castShadow), e.sun.shadowMapSize !== void 0 && (this._instance.shadowMapSize = e.sun.shadowMapSize), e.sun.shadowFar !== void 0 && (this._instance.shadowFar = e.sun.shadowFar), e.sun.shadowCascadeCount !== void 0 && (this._instance.shadowCascadeCount = e.sun.shadowCascadeCount), e.sun.shadowMode !== void 0 && (this._instance.shadowMode = e.sun.shadowMode), e.sun.shadowLambda !== void 0 && (this._instance.shadowLambda = e.sun.shadowLambda), e.sun.shadowMargin !== void 0 && (this._instance.shadowMargin = e.sun.shadowMargin), e.sun.shadowFade !== void 0 && (this._instance.shadowFade = e.sun.shadowFade), e.sun.shadowIntensity !== void 0 && (this._instance.shadowIntensity = e.sun.shadowIntensity), e.sun.shadowBias !== void 0 && (this._instance.shadowBias = e.sun.shadowBias), e.sun.shadowNormalBias !== void 0 && (this._instance.shadowNormalBias = e.sun.shadowNormalBias), e.sun.shadowRadius !== void 0 && (this._instance.shadowRadius = e.sun.shadowRadius), e.sun.debugCSMHelper !== void 0 && (this._instance.debugCSMHelper = e.sun.debugCSMHelper));
	}
	requestTransmittanceTexture(e) {
		this.view.atmosphere.onTexturesReady((t) => e.setTransmittanceTexture(t.transmittanceTexture), { transmittance: !0 });
	}
	onCreate() {
		super.onCreate(), this.updateSceneLights(), this.ctx.on("shadowApplied", (e) => {
			this._instance?.setupMaterialForCSM(e);
		}), this.ctx.on("shadowRemoved", (e) => {
			this._instance?.removeMaterialFromCSM(e);
		});
	}
	update(e) {
		if (!this._instance) return;
		this._instance.updateSunDirection(this.view.atmosphere.sunDirection);
		let t = this.view.camera.raw.position;
		this._instance.updateTargetPosition(t), this._instance.update();
	}
	onDestroy() {
		this.removeLightsFromScene(), super.onDestroy();
	}
	updateSceneLights() {
		if (!this._instance) return;
		this.removeLightsFromScene();
		let e = this._instance.getSceneLights(), t = this.ctx.scenes.light;
		t.add(e);
		let n = t.children.indexOf(e);
		n > 0 && (t.children.splice(n, 1), t.children.unshift(e));
		let r = this._instance.getSceneHelper();
		r && this.ctx.scenes.opaque.add(r);
	}
	removeLightsFromScene() {
		if (!this._instance) return;
		this._instance.getCSM().directionalLights.removeFromParent();
		let e = this._instance.getSceneHelper();
		e && e.removeFromParent(), this.raw && this.raw.removeFromParent();
	}
}, nx = class extends d {
	config;
	constructor(e, t, n) {
		super(e, t, n), this.config = n;
	}
	createLight() {
		let e = new $b(this.config.skyLightProbe || {});
		return this.view.atmosphere.onTexturesReady((t) => e.setTextures(t), { irradiance: !0 }), e.on("needsUpdate", () => this.emit("needsUpdate")), e;
	}
	onUpdateConfig(e) {
		super.onUpdateConfig(e), this.config.skyLightProbe && e.skyLightProbe && this._instance && (Object.assign(this.config.skyLightProbe, e.skyLightProbe), e.skyLightProbe.intensity !== void 0 && (this._instance.intensity = e.skyLightProbe.intensity));
	}
	update(e) {
		if (!this._instance) return;
		this._instance.updateSunDirection(this.view.atmosphere.sunDirection);
		let t = this.view.camera.raw.position;
		this._instance.updatePosition(t), this._instance.update();
	}
}, rx = class extends d {
	config;
	constructor(e, t, n) {
		super(e, t, n), this.config = n;
	}
	createLight() {
		let e = this.config.lightProbe, t = new mt(e?.sh, e?.intensity ?? 1);
		if (e?.coefficients) {
			let n = new $t();
			n.coefficients = e.coefficients.map((e) => new j(e[0] ?? 0, e[1] ?? 0, e[2] ?? 0)), t.sh = n;
		}
		return t;
	}
	onUpdateConfig(e) {
		if (e.lightProbe && this._instance) {
			let t = e.lightProbe;
			if (t.intensity !== void 0 && (this._instance.intensity = t.intensity), t.sh && (this._instance.sh = t.sh), t.coefficients) {
				let e = new $t();
				e.coefficients = t.coefficients.map((e) => new j(e[0] ?? 0, e[1] ?? 0, e[2] ?? 0)), this._instance.sh = e;
			}
			this.emit("needsUpdate");
		}
		super.onUpdateConfig(e);
	}
	disposeLight() {
		this._instance = void 0;
	}
};
//#endregion
export { Pu as AerialPerspective, Wy as AerialPerspectiveEffectDesc, ju as AerialPerspectiveLightingEffect, vb as AmbientLight, ex as AmbientLightDesc, Hc as ArcLine, Uc as ArclineMeshDesc, wl as ArrowHelperDesc, Tl as AxesHelperDesc, fc as BoxMeshDesc, V_ as CloudLayer, U_ as Clouds, Gy as CloudsEffectDesc, K_ as ColorGradingLUT, qy as ColorGradingLUTEffectDesc, Ay as ConeTracingMaterial, My as ConeTracingPass, vc as CylinderMeshDesc, Du as DEFAULT_AERIAL_PERSPECTIVE_LIGHTING_OPTIONS, Nu as DEFAULT_AERIAL_PERSPECTIVE_OPTIONS, xu as DEFAULT_ANTIALIAS_OPTIONS, H_ as DEFAULT_CLOUDS_OPTIONS, Ky as DEFAULT_COLOR_GRADING_LUT_OPTIONS, q_ as DEFAULT_DEPTH_OF_FIELD_OPTIONS, nv as DEFAULT_FOG_LIGHT_EFFECT_OPTIONS, ov as DEFAULT_FOG_LIGHT_OPTIONS, gc as DEFAULT_GLOW_GLOBE_OPTIONS, Sc as DEFAULT_GLTF_MODEL_DESCRIPTION, kv as DEFAULT_LENS_FLARE_OPTIONS, Nv as DEFAULT_RAIN_DROP_OPTIONS, Sl as DEFAULT_SKY_BOX_OPTIONS, Cy as DEFAULT_SSAO_OPTIONS, Q as DEFAULT_SSR_OPTIONS, lc as DEFAULT_STARS_OPTIONS, By as DEFAULT_TONE_MAPPING_OPTIONS, U as DefaultArcLineConfig, Ln as DefaultRainConfig, _l as DefaultSmoothLineConfig, Yn as DefaultSnowConfig, J_ as DepthOfField, Jy as DepthOfFieldEffectDesc, wu as FXAA, Xy as FXAAEffectDesc, sv as FogLight, rv as FogLightEffect, Yy as FogLightEffectDesc, Cc as GLTFModelDesc, _c as GlowGlobeMeshDesc, Dl as InstancedBoxMeshDesc, Nl as InstancedCylinderMeshDesc, ql as InstancedGltfModelMeshDesc, jl as InstancedPlaneMeshDesc, kl as InstancedSphereMeshDesc, Av as LensFlare, Zy as LensFlareEffectDesc, rx as LightProbeDesc, yc as PlaneMeshDesc, hu as PolygonMeshDesc, bu as PolylineMeshDesc, Pv as RainDropEffect, Qy as RainDropEffectDesc, Vn as RainMesh, Hn as RainMeshDesc, Tu as SMAA, $y as SMAAEffectDesc, wy as SSAO, eb as SSAOEffectDesc, zy as SSR, Ry as SSREffect, hb as SSREffectDesc, Iy as SSRMaterial, cb as SelectiveBloomEffectDesc, pb as SelectiveOutlineEffectDesc, Cl as SkyBoxMeshDesc, $b as SkyLightProbe, nx as SkyLightProbeDesc, sc as SkyMesh, cc as SkyMeshDesc, vl as SmoothLine, yl as SmoothLineMeshDesc, Xn as SnowMesh, Zn as SnowMeshDesc, pc as SphereMeshDesc, hl as SpherePoints, Rc as SplatMeshDesc, uc as Stars, dc as StarsDesc, Qb as SunLight, tx as SunLightDesc, Vy as ToneMapping, gb as ToneMappingEffectDesc, Mn as ToneMappingMode, zc as TubeMeshDesc, Au as patchLightingTermsShader };
