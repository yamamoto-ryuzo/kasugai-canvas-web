import { AerialPerspectiveConfig } from '@navaramap/three-default-descs';
import { AerialPerspectiveEffectDesc } from '@navaramap/three-default-descs';
import { AmbientLightConfig } from '@navaramap/three-default-descs';
import { ArclineMeshConfig } from '@navaramap/three-default-descs';
import { ArrowHelperConfig } from '@navaramap/three-default-descs';
import { AxesHelperConfig } from '@navaramap/three-default-descs';
import { BoxMeshConfig } from '@navaramap/three-default-descs';
import { CloudsConfig } from '@navaramap/three-default-descs';
import { ColorGradingLUTConfig } from '@navaramap/three-default-descs';
import { CylinderMeshConfig } from '@navaramap/three-default-descs';
import { default as default_2 } from '@navaramap/three';
import { DepthOfFieldConfig } from '@navaramap/three-default-descs';
import { EffectHandle } from '@navaramap/three';
import { FogLightConfig } from '@navaramap/three-default-descs';
import { FXAAConfig } from '@navaramap/three-default-descs';
import { FXAAEffectDesc } from '@navaramap/three-default-descs';
import { GlowGlobeMeshConfig } from '@navaramap/three-default-descs';
import { GLTFModelConfig } from '@navaramap/three-default-descs';
import { InstancedBoxMeshConfig } from '@navaramap/three-default-descs';
import { InstancedCylinderMeshConfig } from '@navaramap/three-default-descs';
import { InstancedGltfModelMeshConfig } from '@navaramap/three-default-descs';
import { InstancedPlaneMeshConfig } from '@navaramap/three-default-descs';
import { InstancedSphereMeshConfig } from '@navaramap/three-default-descs';
import { LensFlareConfig } from '@navaramap/three-default-descs';
import { LensFlareEffectDesc } from '@navaramap/three-default-descs';
import { LightHandle } from '@navaramap/three';
import { LightProbeConfig } from '@navaramap/three-default-descs';
import { MeshHandle } from '@navaramap/three';
import { PlaneMeshConfig } from '@navaramap/three-default-descs';
import { Plugin as Plugin_2 } from '@navaramap/three';
import { PolygonMeshConfig } from '@navaramap/three-default-descs';
import { PolylineMeshConfig } from '@navaramap/three-default-descs';
import { RainDropConfig } from '@navaramap/three-default-descs';
import { RainMeshConfig } from '@navaramap/three-default-descs';
import { SelectiveBloomEffectConfig } from '@navaramap/three-default-descs';
import { SelectiveOutlineEffectConfig } from '@navaramap/three-default-descs';
import { SkyBoxMeshConfig } from '@navaramap/three-default-descs';
import { SkyLightProbeConfig } from '@navaramap/three-default-descs';
import { SkyLightProbeDesc } from '@navaramap/three-default-descs';
import { SkyMeshConfig } from '@navaramap/three-default-descs';
import { SkyMeshDesc } from '@navaramap/three-default-descs';
import { SMAAConfig } from '@navaramap/three-default-descs';
import { SMAAEffectDesc } from '@navaramap/three-default-descs';
import { SmoothLineMeshConfig } from '@navaramap/three-default-descs';
import { SnowMeshConfig } from '@navaramap/three-default-descs';
import { SphereMeshConfig } from '@navaramap/three-default-descs';
import { SplatMeshConfig } from '@navaramap/three-default-descs';
import { SSAOConfig } from '@navaramap/three-default-descs';
import { SSRConfig } from '@navaramap/three-default-descs';
import { StarsConfig } from '@navaramap/three-default-descs';
import { StarsDesc } from '@navaramap/three-default-descs';
import { SunLightConfig } from '@navaramap/three-default-descs';
import { SunLightDesc } from '@navaramap/three-default-descs';
import { ToneMappingConfig } from '@navaramap/three-default-descs';
import { ToneMappingEffectDesc } from '@navaramap/three-default-descs';
import { TubeMeshConfig } from '@navaramap/three-default-descs';
import { ViewContext } from '@navaramap/three';

export declare type DefaultDescriptions = {
    mesh: DefaultMeshDescription;
    light: DefaultLightDescription;
    effect: DefaultEffectDescription;
};

export declare type DefaultEffectDescription = AerialPerspectiveConfig | CloudsConfig | ColorGradingLUTConfig | DepthOfFieldConfig | FogLightConfig | FXAAConfig | LensFlareConfig | RainDropConfig | SelectiveBloomEffectConfig | SelectiveOutlineEffectConfig | SMAAConfig | SSAOConfig | SSRConfig | ToneMappingConfig;

export declare type DefaultLightDescription = SunLightConfig | SkyLightProbeConfig | AmbientLightConfig | LightProbeConfig;

export declare type DefaultMeshDescription = PolygonMeshConfig | PolylineMeshConfig | RainMeshConfig | SnowMeshConfig | SkyMeshConfig | SkyBoxMeshConfig | StarsConfig | BoxMeshConfig | SphereMeshConfig | GlowGlobeMeshConfig | CylinderMeshConfig | TubeMeshConfig | PlaneMeshConfig | GLTFModelConfig | SplatMeshConfig | AxesHelperConfig | ArrowHelperConfig | ArclineMeshConfig | SmoothLineMeshConfig | InstancedBoxMeshConfig | InstancedSphereMeshConfig | InstancedPlaneMeshConfig | InstancedCylinderMeshConfig | InstancedGltfModelMeshConfig;

export declare class DefaultPlugin extends Plugin_2<default_2<DefaultDescriptions>, ViewContext> {
    private view?;
    init(view: default_2<DefaultDescriptions>, _ctx: ViewContext): Promise<void>;
    /**
     * Add default descriptors automatically to make the photorealistic scene.
     * This method must be invoked after `view.init()`.
     *
     * `deferredLighting` lights the scene from the atmosphere in post: it sets
     * `aerialPerspective.irradiance` and `view.lit = false` together, since the
     * forward pass would otherwise apply lighting as well. `shadow` and
     * `specular` enable the sun's shadows and its specular highlight in that
     * lighting through the aerial perspective's options of the same name. Both
     * are off by default because either allocates the shadow G-buffer, and
     * both are inert without `deferredLighting`. Toggle any of them later via
     * the returned handle and `view.lit`.
     */
    addDefaultPhotorealScene(options?: {
        deferredLighting?: boolean;
        shadow?: boolean;
        specular?: boolean;
    }): {
        sky: MeshHandle<SkyMeshDesc>;
        stars: MeshHandle<StarsDesc>;
        skyLightProbe: LightHandle<SkyLightProbeDesc>;
        sun: LightHandle<SunLightDesc>;
        aerialPerspective: EffectHandle<AerialPerspectiveEffectDesc>;
        lensFlare: EffectHandle<LensFlareEffectDesc> | undefined;
        toneMapping: EffectHandle<ToneMappingEffectDesc>;
        antialiasing: EffectHandle<SMAAEffectDesc> | EffectHandle<FXAAEffectDesc>;
    };
}

export { }
