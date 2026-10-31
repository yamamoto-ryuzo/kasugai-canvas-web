import { Plugin as e } from "@navaramap/three";
import { AerialPerspectiveEffectDesc as t, AmbientLightDesc as n, ArclineMeshDesc as r, ArrowHelperDesc as i, AxesHelperDesc as a, BoxMeshDesc as o, CloudsEffectDesc as s, ColorGradingLUTEffectDesc as c, CylinderMeshDesc as l, DepthOfFieldEffectDesc as u, FXAAEffectDesc as d, FogLightEffectDesc as f, GLTFModelDesc as p, GlowGlobeMeshDesc as m, InstancedBoxMeshDesc as h, InstancedCylinderMeshDesc as g, InstancedGltfModelMeshDesc as _, InstancedPlaneMeshDesc as v, InstancedSphereMeshDesc as y, LensFlareEffectDesc as b, LightProbeDesc as x, PlaneMeshDesc as S, PolygonMeshDesc as C, PolylineMeshDesc as w, RainDropEffectDesc as T, RainMeshDesc as E, SMAAEffectDesc as D, SSAOEffectDesc as O, SSREffectDesc as k, SelectiveBloomEffectDesc as A, SelectiveOutlineEffectDesc as j, SkyBoxMeshDesc as M, SkyLightProbeDesc as N, SkyMeshDesc as P, SmoothLineMeshDesc as F, SnowMeshDesc as I, SphereMeshDesc as L, SplatMeshDesc as R, StarsDesc as z, SunLightDesc as B, ToneMappingEffectDesc as V, TubeMeshDesc as H } from "@navaramap/three-default-descs";
//#region src/index.ts
var U = class extends e {
	view;
	async init(e, U) {
		this.view = e, e.registerMesh("rain", E), e.registerMesh("snow", I), e.registerMesh("sky", P), e.registerMesh("skyBox", M), e.registerMesh("stars", z), e.registerMesh("box", o), e.registerMesh("sphere", L), e.registerMesh("glowGlobe", m), e.registerMesh("cylinder", l), e.registerMesh("tube", H), e.registerMesh("plane", S), e.registerMesh("gltfModel", p), e.registerMesh("splat", R), e.registerMesh("axesHelper", a), e.registerMesh("arrowHelper", i), e.registerMesh("arcLines", r), e.registerMesh("polygon", C), e.registerMesh("polyline", w), e.registerMesh("smoothLines", F), e.registerMesh("boxes", h), e.registerMesh("spheres", y), e.registerMesh("planes", v), e.registerMesh("cylinders", g), e.registerMesh("gltfModels", _), e.registerLight("sun", B), e.registerLight("ambient", n), e.registerLight("skyLightProbe", N), e.registerLight("lightProbe", x), e.registerEffect("aerialPerspective", t), e.registerEffect("rainDrop", T), e.registerEffect("selectiveBloom", A), e.registerEffect("selectiveOutline", j), e.registerEffect("clouds", s), e.registerEffect("fogLight", f), e.registerEffect("lensFlare", b), e.registerEffect("ssao", O), e.registerEffect("ssr", k), e.registerEffect("depthOfField", u), e.registerEffect("colorGradingLUT", c), e.registerEffect("toneMapping", V), e.registerEffect("smaa", D), e.registerEffect("fxaa", d);
	}
	addDefaultPhotorealScene(e) {
		if (!this.view) throw Error("DefaultPlugin is not initialized. Call view.addPlugin() and view.init() first.");
		let t = this.view, n = t.isMobileOptimized(), r = t.addMesh({ sky: {} }), i = t.addMesh({ stars: {} }), a = t.addLight({ skyLightProbe: {} }), o = t.addLight({ sun: {} }), s = t.addEffect({ aerialPerspective: {
			...e?.deferredLighting ? { irradiance: !0 } : {},
			...e?.shadow ? { shadow: !0 } : {},
			...e?.specular ? { specular: !0 } : {}
		} });
		return e?.deferredLighting && (t.lit = !1), {
			sky: r,
			stars: i,
			skyLightProbe: a,
			sun: o,
			aerialPerspective: s,
			lensFlare: n ? void 0 : t.addEffect({ lensFlare: {} }),
			toneMapping: t.addEffect({ toneMapping: {} }),
			antialiasing: n ? t.addEffect({ fxaa: {} }) : t.addEffect({ smaa: {} })
		};
	}
};
//#endregion
export { U as DefaultPlugin };
