import {
  useRef,
  useEffect,
  useState,
  useCallback,
} from "react";
import { motion } from "motion/react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import {
  getModelConfig,
  LOADING_STATES,
  type ModelConfig,
} from "./ModelConfig";

interface ThreeDViewerProps {
  width?: number;
  height?: number;
  modelColor?: string;
  modelUrl?: string; // Can be a URL or a model config ID
  className?: string;
  // Real-time camera control
  realTimeConfig?: ModelConfig["cameraOptions"];
  onCameraChange?: (
    position: THREE.Vector3,
    rotation: THREE.Euler,
  ) => void;
}

type LoadingState = "idle" | "loading" | "success" | "error";

export function ThreeDViewer({
  width = 300,
  height = 300,
  modelColor = "#8b5cf6",
  modelUrl,
  className = "",
  realTimeConfig,
  onCameraChange,
}: ThreeDViewerProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene>();
  const cameraRef = useRef<THREE.PerspectiveCamera>();
  const rendererRef = useRef<THREE.WebGLRenderer>();
  const rootObjectRef = useRef<THREE.Object3D>(); // GLTF or procedural
  const loadingObjectRef = useRef<THREE.Object3D>(); // Loading/error sphere
  const mouseRef = useRef({ x: 0, y: 0 });
  const frameId = useRef<number>();
  const loaderRef = useRef<GLTFLoader>();
  const [isHovered, setIsHovered] = useState(false);
  const [loadingState, setLoadingState] =
    useState<LoadingState>("idle");
  const isHoveredRef = useRef(false);

  // Camera control state
  const [cameraDistance, setCameraDistance] = useState(5);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const [lastPanPosition, setLastPanPosition] = useState({
    x: 0,
    y: 0,
  });
  const baseCameraPositionRef = useRef({ x: 0, y: 0, z: 5 });
  const baseCameraTargetRef = useRef({ x: 0, y: 0, z: 0 });
  const baseCameraDirectionRef = useRef({ x: 0, y: 0, z: -1 });
  const originalModelRotationRef = useRef<THREE.Quaternion>(
    new THREE.Quaternion(),
  );

  // Store manual camera rotation and config options
  const manualCameraRotationRef = useRef<THREE.Euler | null>(
    null,
  );
  const cameraConfigRef = useRef<
    ModelConfig["cameraOptions"] | null
  >(null);
  const hasManualRotationRef = useRef(false);

  // Real-time camera control support
  const realTimeConfigRef = useRef<
    ModelConfig["cameraOptions"] | null
  >(null);
  const recalculateCameraRef = useRef<(() => void) | null>(
    null,
  );

  // Update real-time config when prop changes
  useEffect(() => {
    // Store the real-time config in ref for use by internal functions
    realTimeConfigRef.current = realTimeConfig;

    // If we have real-time config and the recalculation function is ready, trigger it
    if (realTimeConfig && recalculateCameraRef.current) {
      recalculateCameraRef.current();
    }
  }, [realTimeConfig]);

  // Use refs for current values to avoid closure issues
  const cameraDistanceRef = useRef(5);
  const panOffsetRef = useRef({ x: 0, y: 0 });

  // Animation system refs
  const animationMixerRef = useRef<THREE.AnimationMixer | null>(
    null,
  );
  const animationClipsRef = useRef<THREE.AnimationClip[]>([]);
  const animationActionsRef = useRef<THREE.AnimationAction[]>(
    [],
  );

  // Lighting refs
  const defaultLightsRef = useRef<THREE.Light[]>([]);
  const gltfLightsRef = useRef<THREE.Light[]>([]);

  // Update camera when controls change
  useEffect(() => {
    // Update refs to avoid closure issues
    cameraDistanceRef.current = cameraDistance;
    panOffsetRef.current = panOffset;

    // Force camera update when zoom or pan changes
    if (cameraRef.current && baseCameraPositionRef.current) {
      console.log(
        "🔄 Camera controls changed - Distance:",
        cameraDistance,
        "Pan:",
        panOffset,
      );
    }
  }, [cameraDistance, panOffset]);

  useEffect(() => {
    if (!mountRef.current) return;

    // Get container dimensions
    const container = mountRef.current;
    const containerWidth = container.clientWidth || width;
    const containerHeight = container.clientHeight || height;

    // Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(
      75,
      containerWidth / containerHeight,
      0.1,
      1000,
    );
    camera.position.set(0, 0, 5);
    cameraRef.current = camera;

    // Store initial camera position and target
    baseCameraPositionRef.current = { x: 0, y: 0, z: 5 };
    baseCameraTargetRef.current = { x: 0, y: 0, z: 0 };

    // Store initial camera position
    baseCameraPositionRef.current = { x: 0, y: 0, z: 5 };

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });
    renderer.setPixelRatio(
      Math.min(window.devicePixelRatio || 1, 2),
    );
    renderer.setSize(containerWidth, containerHeight);
    renderer.setClearColor(0x000000, 0);
    (renderer as any).outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.0;
    rendererRef.current = renderer;

    mountRef.current.appendChild(renderer.domElement);

    // Default Lights (will be used if GLTF has no lights)
    const createDefaultLights = () => {
      const lights: THREE.Light[] = [];
      const ambientLight = new THREE.AmbientLight(
        0x404040,
        0.8,
      );
      const dirLight = new THREE.DirectionalLight(0xffffff, 1);
      dirLight.position.set(2, 2, 2);
      const pointLight = new THREE.PointLight(
        0x8b5cf6,
        0.8,
        10,
      );
      pointLight.position.set(0, 0, 3);
      lights.push(ambientLight, dirLight, pointLight);
      return lights;
    };

    const addDefaultLights = () => {
      if (defaultLightsRef.current.length === 0) {
        defaultLightsRef.current = createDefaultLights();
      }
      defaultLightsRef.current.forEach((light) =>
        scene.add(light),
      );
      console.log("💡 Added default lights to scene");
    };

    const removeDefaultLights = () => {
      defaultLightsRef.current.forEach((light) =>
        scene.remove(light),
      );
    };

    // Start with default lights
    addDefaultLights();

    // Loading/Error indicator
    const createIndicatorSphere = (state: LoadingState) => {
      const group = new THREE.Group();
      const config =
        LOADING_STATES[state] || LOADING_STATES.error;
      const geometry = new THREE.SphereGeometry(0.8, 32, 32);
      const material = new THREE.MeshPhongMaterial({
        color: new THREE.Color(config.color),
        transparent: true,
        opacity: config.opacity,
        emissive: new THREE.Color(config.color).multiplyScalar(
          0.2,
        ),
      });
      group.add(new THREE.Mesh(geometry, material));
      return group;
    };

    // Simple procedural fallback
    const createProceduralHead = () => {
      const group = new THREE.Group();
      const headGeo = new THREE.SphereGeometry(1, 32, 32);
      const headMat = new THREE.MeshPhongMaterial({
        color: new THREE.Color(modelColor),
        shininess: 100,
        transparent: true,
        opacity: 0.9,
      });
      const head = new THREE.Mesh(headGeo, headMat);
      group.add(head);
      const eyeGeo = new THREE.SphereGeometry(0.1, 16, 16);
      const eyeMat = new THREE.MeshPhongMaterial({
        color: 0x000000,
      });
      const leftEye = new THREE.Mesh(eyeGeo, eyeMat);
      leftEye.position.set(-0.3, 0.2, 0.8);
      const rightEye = leftEye.clone();
      rightEye.position.x = 0.3;
      head.add(leftEye, rightEye);
      const noseGeo = new THREE.ConeGeometry(0.05, 0.2, 8);
      const noseMat = new THREE.MeshPhongMaterial({
        color: new THREE.Color(modelColor),
      });
      const nose = new THREE.Mesh(noseGeo, noseMat);
      nose.position.set(0, 0, 0.9);
      nose.rotation.x = Math.PI;
      head.add(nose);
      return group;
    };

    // GLTF loader
    const loader = new GLTFLoader();
    loader.setCrossOrigin("anonymous");
    loaderRef.current = loader;

    const addObjectToScene = (
      obj: THREE.Object3D,
      isMain = true,
    ) => {
      if (isMain) {
        rootObjectRef.current = obj;
        // Store original rotation
        originalModelRotationRef.current.copy(obj.quaternion);
      } else {
        loadingObjectRef.current = obj;
      }
      scene.add(obj);
    };

    const removeObjectFromScene = (obj?: THREE.Object3D) => {
      if (!obj) return;
      scene.remove(obj);
      obj.traverse((child) => {
        const m = child as THREE.Mesh;
        if (m.geometry) m.geometry.dispose();
        if (m.material) {
          const mat = m.material;
          if (Array.isArray(mat))
            mat.forEach((mm) => mm.dispose());
          else mat.dispose();
        }
      });
    };

    /** Use GLTF camera (world transform) if available */
    const applyCameraFromGLTFIfAvailable = (
      gltf: any | undefined,
      finalCenter: THREE.Vector3,
      config: ModelConfig | null,
    ): boolean => {
      if (!cameraRef.current) return false;
      if (!gltf || !gltf.scene) return false; // guard

      const forcedTarget = config?.cameraOptions?.target;
      const customFov = config?.cameraOptions?.fov;

      console.log("🎥 GLTF Camera Debug - Starting search...");
      console.log("GLTF has scene:", !!gltf.scene);
      console.log(
        "GLTF cameras count:",
        gltf.cameras ? gltf.cameras.length : 0,
      );

      // Find a camera node in the scene graph
      let camNode: THREE.Camera | null = null;
      gltf.scene.traverse((o: any) => {
        if (o?.isCamera && !camNode) {
          console.log(
            "📹 Found camera in scene graph - Name:",
            o.name,
            "Type:",
            o.type,
          );
          camNode = o as THREE.Camera;
        }
      });
      if (!camNode && gltf.cameras && gltf.cameras.length > 0) {
        console.log(
          "📹 Using camera from GLTF cameras array - Name:",
          gltf.cameras[0].name,
          "Type:",
          gltf.cameras[0].type,
        );
        camNode = gltf.cameras[0];
      }
      if (!camNode) {
        console.log("❌ No camera found in GLTF file");
        return false;
      }

      camNode.updateWorldMatrix(true, false);
      const wPos = new THREE.Vector3();
      const wQuat = new THREE.Quaternion();
      const wScale = new THREE.Vector3();

      console.log(
        "🎥 Camera REAL position:",
        `x:${camNode.position.x}, y:${camNode.position.y}, z:${camNode.position.z}`,
      );

      camNode.matrixWorld.decompose(wPos, wQuat, wScale);

      console.log(
        "🎥 Camera world position:",
        `x:${wPos.x.toFixed(2)}, y:${wPos.y.toFixed(2)}, z:${wPos.z.toFixed(2)}`,
      );
      console.log(
        "🎥 Camera world quaternion:",
        `x:${wQuat.x.toFixed(2)}, y:${wQuat.y.toFixed(2)}, z:${wQuat.z.toFixed(2)}, w:${wQuat.w.toFixed(2)}`,
      );
      console.log(
        "🎥 Camera world scale:",
        `x:${wScale.x.toFixed(2)}, y:${wScale.y.toFixed(2)}, z:${wScale.z.toFixed(2)}`,
      );

      const cam = cameraRef.current;
      cam.position.copy(wPos);
      cam.quaternion.copy(wQuat);

      // Store this as the new base position for camera controls
      baseCameraPositionRef.current = {
        x: wPos.x,
        y: wPos.y,
        z: wPos.z,
      };

      // Get the camera's forward direction from the GLTF camera
      const direction = new THREE.Vector3();
      cam.getWorldDirection(direction);
      baseCameraDirectionRef.current = {
        x: direction.x,
        y: direction.y,
        z: direction.z,
      };

      // Calculate target point that the camera is looking at
      const raycastDistance = 10; // Arbitrary distance to find look target
      const target = wPos
        .clone()
        .add(direction.clone().multiplyScalar(raycastDistance));
      baseCameraTargetRef.current = {
        x: target.x,
        y: target.y,
        z: target.z,
      };

      // Set the initial camera distance to the raycast distance used
      setCameraDistance(raycastDistance);
      setPanOffset({ x: 0, y: 0 }); // Reset pan to respect GLTF view

      console.log(
        "🎥 Applied position to viewer camera:",
        `x:${cam.position.x.toFixed(2)}, y:${cam.position.y.toFixed(2)}, z:${cam.position.z.toFixed(2)}`,
      );
      console.log(
        "🎥 Applied quaternion to viewer camera:",
        `x:${cam.quaternion.x.toFixed(2)}, y:${cam.quaternion.y.toFixed(2)}, z:${cam.quaternion.z.toFixed(2)}, w:${cam.quaternion.w.toFixed(2)}`,
      );

      if (
        (camNode as THREE.PerspectiveCamera).isPerspectiveCamera
      ) {
        const src = camNode as THREE.PerspectiveCamera;
        console.log("🎥 Source camera FOV:", src.fov);
        console.log("🎥 Source camera near:", src.near);
        console.log("🎥 Source camera far:", src.far);

        cam.fov =
          customFov && customFov > 0 && customFov < 180
            ? customFov
            : src.fov;
        cam.near = Math.max(src.near, 0.01);
        cam.far = Math.max(src.far, 100);
        cam.updateProjectionMatrix();

        console.log("🎥 Applied FOV:", cam.fov);
        console.log("🎥 Applied near:", cam.near);
        console.log("🎥 Applied far:", cam.far);
      }

      // Only call lookAt if there's a forced target override
      // Otherwise, preserve the GLTF camera's original orientation
      if (forcedTarget) {
        console.log("🎯 Using forced target:", forcedTarget);
        cam.lookAt(
          new THREE.Vector3(
            forcedTarget.x,
            forcedTarget.y,
            forcedTarget.z,
          ),
        );
      } else {
        console.log(
          "✅ Preserving GLTF camera orientation (no forced target)",
        );
      }

      console.log(
        "🎥 Final camera position:",
        `x:${cam.position.x.toFixed(2)}, y:${cam.position.y.toFixed(2)}, z:${cam.position.z.toFixed(2)}`,
      );
      console.log(
        "🎥 Final camera rotation:",
        `x:${cam.rotation.x.toFixed(2)}, y:${cam.rotation.y.toFixed(2)}, z:${cam.rotation.z.toFixed(2)}`,
      );

      return true;
    };

    // Camera positioning with support for manual position/rotation override
    const calculateOptimalCameraPositionWithFinalBounds = (
      box: THREE.Box3,
      size: THREE.Vector3,
      center: THREE.Vector3,
      gltf?: any,
      config: ModelConfig | null = null,
    ) => {
      if (!cameraRef.current) return;

      const cam = cameraRef.current;
      const opts = config?.cameraOptions || {};

      // Use real-time config if available, otherwise use stored config
      const activeConfig = realTimeConfigRef.current || opts;
      const {
        autoFit = true,
        distanceMultiplier = 2.5,
        heightOffset = 0.1,
        fov,
        position: forcedPosition,
        rotation: forcedRotation,
        target: forcedTarget,
      } = activeConfig;

      // Set custom FOV if specified
      if (fov && fov > 0 && fov < 180) {
        cam.fov = fov;
        cam.updateProjectionMatrix();
      }

      // Store camera config for animation loop (prefer real-time config)
      const finalConfig = realTimeConfig || opts;
      cameraConfigRef.current = finalConfig;
      realTimeConfigRef.current = realTimeConfig;

      // Check if manual positioning is specified
      if (!autoFit && forcedPosition) {
        console.log(
          "🎯 Using MANUAL camera positioning from config",
        );

        // Use exact position from config
        const manualPosition = new THREE.Vector3(
          forcedPosition.x,
          forcedPosition.y,
          forcedPosition.z,
        );

        cam.position.copy(manualPosition);

        // Handle manual rotation if specified
        if (forcedRotation) {
          console.log(
            "🔄 Storing MANUAL rotation for controls:",
            forcedRotation,
          );
          const manualRotation = new THREE.Euler(
            forcedRotation.x,
            forcedRotation.y,
            forcedRotation.z,
          );
          cam.rotation.copy(manualRotation);

          // Store manual rotation for later use in controls
          manualCameraRotationRef.current =
            manualRotation.clone();
          hasManualRotationRef.current = true;
        } else {
          hasManualRotationRef.current = false;
        }

        // Handle manual target if specified
        let finalTarget: THREE.Vector3;
        if (forcedTarget) {
          finalTarget = new THREE.Vector3(
            forcedTarget.x,
            forcedTarget.y,
            forcedTarget.z,
          );
          // Only use lookAt if no manual rotation is specified
          if (!forcedRotation) {
            cam.lookAt(finalTarget);
          }
        } else {
          // Default to model center as target
          finalTarget = center.clone();
          if (!forcedRotation) {
            cam.lookAt(finalTarget);
          }
        }

        // Store manual settings as base for camera controls
        baseCameraPositionRef.current = {
          x: manualPosition.x,
          y: manualPosition.y,
          z: manualPosition.z,
        };

        baseCameraTargetRef.current = {
          x: finalTarget.x,
          y: finalTarget.y,
          z: finalTarget.z,
        };

        // Calculate distance for zoom controls
        const manualDistance =
          manualPosition.distanceTo(finalTarget);
        setCameraDistance(manualDistance);

        console.log(
          "📍 MANUAL camera applied - Position:",
          manualPosition,
          "Target:",
          finalTarget,
          "Distance:",
          manualDistance.toFixed(2),
        );
        console.log(
          "🔄 Manual rotation stored:",
          hasManualRotationRef.current
            ? manualCameraRotationRef.current
            : "None",
        );
        setPanOffset({ x: 0, y: 0 }); // Reset pan

        return; // Exit early for manual positioning
      }

      // AUTO-FIT positioning (default behavior)
      console.log("🤖 Using AUTO-FIT camera positioning");
      const maxDim = Math.max(size.x, size.y, size.z);
      const effectiveMaxDim = Math.max(maxDim, 1);
      const fovRad = (cam.fov * Math.PI) / 180;
      const baseDistance =
        effectiveMaxDim / 2 / Math.tan(fovRad / 2);
      const distance = baseDistance * distanceMultiplier;

      // Use center of object bounds as target (or forced target if specified)
      const target = forcedTarget
        ? new THREE.Vector3(
            forcedTarget.x,
            forcedTarget.y,
            forcedTarget.z,
          )
        : center.clone();

      // Position camera in front of the object (positive Z for front view)
      const cameraPosition = forcedPosition
        ? new THREE.Vector3(
            forcedPosition.x,
            forcedPosition.y,
            forcedPosition.z,
          )
        : new THREE.Vector3(
            target.x,
            target.y + effectiveMaxDim * heightOffset,
            target.z + Math.max(distance, effectiveMaxDim * 2),
          );

      cam.position.copy(cameraPosition);

      // Apply manual rotation if specified, otherwise use lookAt
      if (forcedRotation) {
        console.log(
          "🔄 Storing MANUAL rotation for auto-fit camera:",
          forcedRotation,
        );
        const manualRotation = new THREE.Euler(
          forcedRotation.x,
          forcedRotation.y,
          forcedRotation.z,
        );
        cam.rotation.copy(manualRotation);

        // Store manual rotation for later use in controls
        manualCameraRotationRef.current =
          manualRotation.clone();
        hasManualRotationRef.current = true;
      } else {
        cam.lookAt(target);
        hasManualRotationRef.current = false;
      }

      // Store this as the new base position for camera controls
      baseCameraPositionRef.current = {
        x: cameraPosition.x,
        y: cameraPosition.y,
        z: cameraPosition.z,
      };

      // Store the target for camera controls
      baseCameraTargetRef.current = {
        x: target.x,
        y: target.y,
        z: target.z,
      };

      // Calculate initial distance from camera to target for zoom controls
      const distanceToTarget =
        cameraPosition.distanceTo(target);
      setCameraDistance(distanceToTarget);

      console.log(
        "📏 AUTO-FIT camera setup - Distance:",
        distanceToTarget.toFixed(2),
        "Position:",
        cameraPosition,
        "Target:",
        target,
      );
      setPanOffset({ x: 0, y: 0 }); // Reset pan
    };

    const calculateOptimalCameraPosition = (
      model: THREE.Object3D,
      gltf?: any,
      config: ModelConfig | null = null,
    ) => {
      const box = new THREE.Box3().setFromObject(model);
      const size = box.getSize(new THREE.Vector3());
      const center = box.getCenter(new THREE.Vector3());
      calculateOptimalCameraPositionWithFinalBounds(
        box,
        size,
        center,
        gltf,
        config,
      );
    };

    // Set up recalculation function for real-time config updates
    recalculateCameraRef.current = () => {
      if (rootObjectRef.current) {
        const config = getModelConfig(modelUrl);
        calculateOptimalCameraPosition(
          rootObjectRef.current,
          undefined,
          config,
        );
      }
    };

    // Setup lights from GLTF
    const setupLights = (gltf: any) => {
      console.log(
        "💡 ========== LIGHT DETECTION START ==========",
      );
      console.log("💡 GLTF object keys:", Object.keys(gltf));
      console.log("💡 GLTF.parser exists:", !!gltf.parser);
      console.log("💡 GLTF.scene exists:", !!gltf.scene);

      // Clean up previous GLTF lights
      gltfLightsRef.current.forEach((light) => {
        if (sceneRef.current) {
          sceneRef.current.remove(light);
        }
      });
      gltfLightsRef.current = [];

      // Check if the GLTF has lights - multiple methods
      const lights: THREE.Light[] = [];

      // Method 1: Traverse scene graph
      console.log(
        "💡 Method 1: Traversing GLTF scene for lights...",
      );
      let objectCount = 0;
      gltf.scene.traverse((object: THREE.Object3D) => {
        objectCount++;
        const isLight = object instanceof THREE.Light;
        if (objectCount <= 20 || isLight) {
          // Log first 20 objects or any lights
          console.log(
            `  - [${objectCount}] "${object.name || "unnamed"}" | Type: ${object.type} | isLight: ${isLight}`,
          );
        }
        if (isLight) {
          lights.push(object);
          console.log(
            `  ✅ LIGHT FOUND: ${object.name || "unnamed"}`,
          );
        }
      });
      console.log(
        `💡 Method 1 Result: Traversed ${objectCount} objects, found ${lights.length} lights`,
      );

      // Method 2: Check parser.json.lights (KHR_lights_punctual extension)
      if (
        gltf.parser &&
        gltf.parser.json &&
        gltf.parser.json.extensions
      ) {
        console.log(
          "💡 Method 2: Checking KHR_lights_punctual extension...",
        );
        const lightsExt =
          gltf.parser.json.extensions.KHR_lights_punctual;
        if (lightsExt && lightsExt.lights) {
          console.log(
            `💡 Found KHR_lights_punctual with ${lightsExt.lights.length} light definitions:`,
          );
          lightsExt.lights.forEach(
            (lightDef: any, i: number) => {
              console.log(
                `  - Light ${i}:`,
                JSON.stringify(lightDef, null, 2),
              );
            },
          );
        } else {
          console.log(
            "💡 No KHR_lights_punctual extension found",
          );
        }
      }

      console.log(
        `💡 Total lights collected: ${lights.length}`,
      );

      if (lights.length > 0) {
        console.log(
          `💡 Found ${lights.length} light(s) in GLTF:`,
        );
        lights.forEach((light, index) => {
          // Clone the light to avoid modifying the original GLTF
          const lightClone = light.clone();

          // Update world matrix to get proper position
          light.updateWorldMatrix(true, false);
          const worldPosition = new THREE.Vector3();
          light.getWorldPosition(worldPosition);
          lightClone.position.copy(worldPosition);

          // Log light details
          let lightType = "Unknown";
          let lightDetails = "";

          if (light instanceof THREE.AmbientLight) {
            lightType = "AmbientLight";
            lightDetails = `color: ${light.color.getHexString()}, intensity: ${light.intensity}`;
          } else if (light instanceof THREE.DirectionalLight) {
            lightType = "DirectionalLight";
            lightDetails = `color: ${light.color.getHexString()}, intensity: ${light.intensity}, pos: (${worldPosition.x.toFixed(2)}, ${worldPosition.y.toFixed(2)}, ${worldPosition.z.toFixed(2)})`;
          } else if (light instanceof THREE.PointLight) {
            lightType = "PointLight";
            lightDetails = `color: ${light.color.getHexString()}, intensity: ${light.intensity}, distance: ${light.distance}, pos: (${worldPosition.x.toFixed(2)}, ${worldPosition.y.toFixed(2)}, ${worldPosition.z.toFixed(2)})`;
          } else if (light instanceof THREE.SpotLight) {
            lightType = "SpotLight";
            lightDetails = `color: ${light.color.getHexString()}, intensity: ${light.intensity}, angle: ${light.angle.toFixed(2)}, pos: (${worldPosition.x.toFixed(2)}, ${worldPosition.y.toFixed(2)}, ${worldPosition.z.toFixed(2)})`;
          } else if (light instanceof THREE.HemisphereLight) {
            lightType = "HemisphereLight";
            lightDetails = `skyColor: ${light.color.getHexString()}, groundColor: ${light.groundColor.getHexString()}, intensity: ${light.intensity}`;
          }

          console.log(
            `  ${index + 1}. ${lightType}: ${lightDetails}`,
          );

          // Add to scene
          if (sceneRef.current) {
            sceneRef.current.add(lightClone);
          }
          gltfLightsRef.current.push(lightClone);
        });

        // Remove default lights since GLTF has its own
        removeDefaultLights();
        console.log(
          "💡 ✅ Using GLTF lights, removed default lights",
        );
      } else {
        console.log(
          "💡 ⚠️ No lights found in GLTF, using default lights",
        );
        // Ensure default lights are in the scene
        addDefaultLights();
      }
      console.log(
        "💡 ========== LIGHT DETECTION END ==========\n",
      );
    };

    // Setup animations from GLTF
    const setupAnimations = (
      gltf: any,
      model: THREE.Object3D,
    ) => {
      // Clean up previous animations
      if (animationMixerRef.current) {
        animationMixerRef.current.stopAllAction();
        animationMixerRef.current.uncacheRoot(model);
      }

      // Reset animation refs
      animationClipsRef.current = [];
      animationActionsRef.current = [];

      // Check if the GLTF has animations
      if (gltf.animations && gltf.animations.length > 0) {
        console.log(
          `🎬 Found ${gltf.animations.length} animation(s) in GLTF:`,
          gltf.animations.map((anim: any) => anim.name),
        );

        // Create animation mixer
        const mixer = new THREE.AnimationMixer(model);
        animationMixerRef.current = mixer;
        animationClipsRef.current = gltf.animations;

        // Create and start all animation actions
        gltf.animations.forEach(
          (clip: THREE.AnimationClip, index: number) => {
            const action = mixer.clipAction(clip);
            action.setLoop(THREE.LoopRepeat, Infinity); // Loop forever
            action.play();
            animationActionsRef.current.push(action);

            console.log(
              `▶️ Playing animation ${index + 1}: "${clip.name}" (Duration: ${clip.duration.toFixed(2)}s)`,
            );
          },
        );
      } else {
        console.log("🎬 No animations found in GLTF");
        animationMixerRef.current = null;
      }
    };

    // Load GLTF
    const loadGLTFModel = async (
      url: string,
      config: ModelConfig | null,
    ) => {
      try {
        setLoadingState("loading");
        const loadingSphere = createIndicatorSphere("loading");
        addObjectToScene(loadingSphere, false);

        // DO NOT double-encode; just pass the URL through
        const gltf = await new Promise<any>(
          (resolve, reject) => {
            loader.load(
              url,
              (g) => {
                console.log("✅ GLTF loaded successfully");
                resolve(g);
              },
              (progress) => {
                if (progress.lengthComputable) {
                  const percentComplete =
                    (progress.loaded / progress.total) * 100;
                  console.log(
                    `📊 Loading progress: ${percentComplete.toFixed(1)}%`,
                  );
                }
              },
              (err) => {
                console.error(
                  "❌ GLTF loading error:",
                  err.message || err,
                );
                reject(err);
              },
            );
          },
        );

        removeObjectFromScene(loadingObjectRef.current);

        const model = gltf.scene;

        // Normalize scale & center
        const originalBox = new THREE.Box3().setFromObject(
          model,
        );
        const originalSize = originalBox.getSize(
          new THREE.Vector3(),
        );
        const originalCenter = originalBox.getCenter(
          new THREE.Vector3(),
        );
        const maxDim = Math.max(
          originalSize.x,
          originalSize.y,
          originalSize.z,
        );
        let scale = 1;
        if (maxDim > 4) scale = 3 / maxDim;
        else if (maxDim < 0.5) scale = 1 / maxDim;
        if (scale !== 1) model.scale.setScalar(scale);
        model.position.sub(
          originalCenter.multiplyScalar(scale),
        );

        addObjectToScene(model, true);

        // Setup lights from GLTF if any exist
        setupLights(gltf);

        // Setup animations if any exist
        setupAnimations(gltf, model);

        const finalBox = new THREE.Box3().setFromObject(model);
        const finalSize = finalBox.getSize(new THREE.Vector3());
        const finalCenter = finalBox.getCenter(
          new THREE.Vector3(),
        );

        // Place camera
        calculateOptimalCameraPositionWithFinalBounds(
          finalBox,
          finalSize,
          finalCenter,
          gltf,
          config,
        );

        setLoadingState("success");
        setTimeout(() => {
          if (loadingState === "success")
            setLoadingState("idle");
        }, 1000);
      } catch (error) {
        console.error("Failed to load GLTF model:", error);
        removeObjectFromScene(loadingObjectRef.current);

        const errorSphere = createIndicatorSphere("error");
        addObjectToScene(errorSphere, false);
        setLoadingState("error");

        setTimeout(() => {
          removeObjectFromScene(loadingObjectRef.current);
          const fallbackModel = config
            ? createCharacterGeometry(config.url)
            : createProceduralHead();
          addObjectToScene(fallbackModel, true);
          calculateOptimalCameraPosition(
            fallbackModel,
            undefined,
            config,
          );
          setLoadingState("idle");
        }, 2000);
      }
    };

    // Stylized character fallback (optional)
    const createCharacterGeometry = (url: string) => {
      const group = new THREE.Group();
      if (
        url.includes("Orc") ||
        url.includes("Mauhur") ||
        url.includes(".glb")
      ) {
        const bodyGeo = new THREE.CylinderGeometry(
          0.9,
          1.1,
          2.2,
          8,
        );
        const bodyMat = new THREE.MeshStandardMaterial({
          color: new THREE.Color(modelColor)
            .multiplyScalar(0.6)
            .addScalar(0.2),
          roughness: 0.8,
          metalness: 0.1,
        });
        const body = new THREE.Mesh(bodyGeo, bodyMat);
        const headGeo = new THREE.SphereGeometry(0.5, 12, 8);
        headGeo.scale(1, 0.8, 1.2);
        const headMat = new THREE.MeshStandardMaterial({
          color: new THREE.Color(modelColor).multiplyScalar(
            0.7,
          ),
          roughness: 0.9,
        });
        const head = new THREE.Mesh(headGeo, headMat);
        head.position.y = 1.8;
        const tuskGeo = new THREE.ConeGeometry(0.05, 0.3, 6);
        const tuskMat = new THREE.MeshStandardMaterial({
          color: 0xfffff0,
          roughness: 0.3,
        });
        const leftTusk = new THREE.Mesh(tuskGeo, tuskMat);
        const rightTusk = new THREE.Mesh(tuskGeo, tuskMat);
        leftTusk.position.set(-0.15, 1.5, 0.4);
        rightTusk.position.set(0.15, 1.5, 0.4);
        leftTusk.rotation.x = Math.PI * 0.1;
        rightTusk.rotation.x = Math.PI * 0.1;
        const eyeGeo = new THREE.SphereGeometry(0.08, 8, 8);
        const eyeMat = new THREE.MeshBasicMaterial({
          color: 0xff4444,
        });
        const leftEye = new THREE.Mesh(eyeGeo, eyeMat);
        const rightEye = new THREE.Mesh(eyeGeo, eyeMat);
        leftEye.position.set(-0.15, 1.85, 0.35);
        rightEye.position.set(0.15, 1.85, 0.35);
        group.add(
          body,
          head,
          leftTusk,
          rightTusk,
          leftEye,
          rightEye,
        );
        return group;
      }
      const bodyGeo = new THREE.CylinderGeometry(
        0.4,
        0.6,
        2,
        12,
      );
      const bodyMat = new THREE.MeshPhongMaterial({
        color: new THREE.Color(modelColor),
        transparent: true,
        opacity: 0.85,
      });
      const body = new THREE.Mesh(bodyGeo, bodyMat);
      const headGeo = new THREE.SphereGeometry(0.35, 16, 16);
      const head = new THREE.Mesh(headGeo, bodyMat);
      head.position.y = 1.4;
      const eyeGeo = new THREE.SphereGeometry(0.05, 8, 8);
      const eyeMat = new THREE.MeshPhongMaterial({
        color: 0x000000,
      });
      const leftEye = new THREE.Mesh(eyeGeo, eyeMat);
      const rightEye = new THREE.Mesh(eyeGeo, eyeMat);
      leftEye.position.set(-0.15, 1.3, 0.35);
      rightEye.position.set(0.15, 1.3, 0.35);
      group.add(body, head, leftEye, rightEye);
      return group;
    };

    // Decide what to load
    if (modelUrl) {
      const config = getModelConfig(modelUrl);
      console.log(
        "🎯 Loading model with config:",
        modelUrl,
        config?.cameraOptions,
      );
      const isGLTFUrl =
        modelUrl.toLowerCase().endsWith(".glb") ||
        modelUrl.toLowerCase().endsWith(".gltf");
      if (isGLTFUrl) {
        loadGLTFModel(modelUrl, config);
      } else {
        const characterObj = createCharacterGeometry(modelUrl);
        addObjectToScene(characterObj);
        calculateOptimalCameraPosition(
          characterObj,
          undefined,
          config,
        );
      }
    } else {
      const obj = createProceduralHead();
      addObjectToScene(obj);
      calculateOptimalCameraPosition(obj, undefined, null);
    }

    // Apply camera controls (zoom and pan) while respecting manual rotation
    const applyCameraControls = () => {
      if (!cameraRef.current) return;

      const cam = cameraRef.current;
      const basePos = baseCameraPositionRef.current;
      const baseTarget = baseCameraTargetRef.current;
      const hasManualRotation = hasManualRotationRef.current;
      const manualRotation = manualCameraRotationRef.current;

      // Don't apply controls if we haven't calculated proper base positions yet
      if (
        basePos.x === 0 &&
        basePos.y === 0 &&
        basePos.z === 5
      ) {
        // Still using default positions, wait for model to load
        return;
      }

      // Get current values from refs to avoid closure issues
      const currentDistance = cameraDistanceRef.current;
      const currentPanOffset = panOffsetRef.current;

      // Only log occasionally to avoid spam
      if (Math.random() < 0.002) {
        console.log(
          "🎥 Camera controls - Distance:",
          currentDistance.toFixed(2),
          "Pan:",
          currentPanOffset,
          "Manual rotation:",
          hasManualRotation,
        );
      }

      // Calculate direction from target to camera (reverse of look direction)
      const direction = new THREE.Vector3(
        basePos.x - baseTarget.x,
        basePos.y - baseTarget.y,
        basePos.z - baseTarget.z,
      ).normalize();

      // Apply zoom by moving along the direction vector from target
      const zoomedPosition = new THREE.Vector3(
        baseTarget.x + direction.x * currentDistance,
        baseTarget.y + direction.y * currentDistance,
        baseTarget.z + direction.z * currentDistance,
      );

      // Apply pan offset
      const right = new THREE.Vector3();
      const up = new THREE.Vector3();

      // Get camera's right and up vectors for panning
      right
        .crossVectors(direction, new THREE.Vector3(0, 1, 0))
        .normalize();
      up.crossVectors(right, direction).normalize();

      const finalPosition = zoomedPosition
        .clone()
        .add(
          right
            .clone()
            .multiplyScalar(
              currentPanOffset.x * currentDistance * 0.1,
            ),
        )
        .add(
          up
            .clone()
            .multiplyScalar(
              currentPanOffset.y * currentDistance * 0.1,
            ),
        );

      const finalTarget = new THREE.Vector3(
        baseTarget.x,
        baseTarget.y,
        baseTarget.z,
      )
        .add(
          right
            .clone()
            .multiplyScalar(
              currentPanOffset.x * currentDistance * 0.1,
            ),
        )
        .add(
          up
            .clone()
            .multiplyScalar(
              currentPanOffset.y * currentDistance * 0.1,
            ),
        );

      cam.position.copy(finalPosition);

      // CRITICAL FIX: Only use lookAt if there's no manual rotation
      if (hasManualRotation && manualRotation) {
        // Preserve manual rotation - don't override with lookAt
        cam.rotation.copy(manualRotation);
        if (Math.random() < 0.002) {
          console.log(
            "🔄 Preserving manual rotation:",
            manualRotation,
          );
        }
      } else {
        // Use automatic lookAt for auto-fit cameras
        cam.lookAt(finalTarget);
      }

      // Only log occasionally to avoid spam
      if (Math.random() < 0.002) {
        console.log(
          "📍 Camera applied - Position:",
          finalPosition,
          "Using manual rotation:",
          hasManualRotation,
        );
      }
    };

    // Animate
    const animate = () => {
      // Apply camera controls first
      applyCameraControls();

      // Update animations if they exist
      if (animationMixerRef.current) {
        const deltaTime = 0.016; // 60 FPS target (16ms per frame)
        animationMixerRef.current.update(deltaTime);
      }

      const obj = rootObjectRef.current;
      const loadingObj = loadingObjectRef.current;

      if (obj) {
        // Get camera config options
        const config = cameraConfigRef.current;
        const enableFloating = config?.enableFloating ?? true;
        const floatingSpeed = config?.floatingSpeed ?? 0.001;
        const floatingAmplitude =
          config?.floatingAmplitude ?? 0.1;
        const enableMouseFollow =
          config?.enableMouseFollow ?? true;
        const mouseFollowStrength =
          config?.mouseFollowStrength ?? 0.5;

        // Apply floating animation if enabled
        if (enableFloating) {
          obj.position.y =
            Math.sin(performance.now() * floatingSpeed) *
            floatingAmplitude;
        }

        // Apply mouse interaction if enabled
        if (enableMouseFollow && isHoveredRef.current) {
          // Apply mouse rotation relative to original model orientation
          const targetRotationY =
            -mouseRef.current.x * mouseFollowStrength; // Horizontal mouse -> Y rotation
          const targetRotationX =
            -mouseRef.current.y * (mouseFollowStrength * 0.6); // Vertical mouse -> X rotation (less sensitive)

          // Get camera's right and up vectors to rotate in camera space
          const camera = cameraRef.current;
          if (camera) {
            const right = new THREE.Vector3();
            const up = new THREE.Vector3();
            const forward = new THREE.Vector3();

            camera.getWorldDirection(forward);

            // Calculate proper camera space vectors
            right.crossVectors(camera.up, forward).normalize();
            up.crossVectors(forward, right).normalize();

            // Create rotation relative to original orientation with 180-degree correction
            const baseRotation =
              originalModelRotationRef.current.clone();

            // Apply 180-degree rotation correction to the base rotation
            const correctionRotation = new THREE.Quaternion();
            correctionRotation.setFromAxisAngle(
              new THREE.Vector3(0, 1, 0),
              Math.PI,
            );
            baseRotation.multiply(correctionRotation);

            const deltaRotation = new THREE.Quaternion();
            const yawQuaternion = new THREE.Quaternion();
            const pitchQuaternion = new THREE.Quaternion();

            // Apply rotations in the correct order
            yawQuaternion.setFromAxisAngle(up, targetRotationY);
            pitchQuaternion.setFromAxisAngle(
              right,
              targetRotationX,
            );

            // Combine rotations: corrected base rotation + mouse delta
            deltaRotation.multiplyQuaternions(
              yawQuaternion,
              pitchQuaternion,
            );
            const finalRotation = baseRotation
              .clone()
              .multiply(deltaRotation);

            // Apply smooth interpolation
            obj.quaternion.slerp(finalRotation, 0.05);
          }
        } else if (enableMouseFollow) {
          // Return to corrected original rotation when not hovered
          const correctedOriginal =
            originalModelRotationRef.current.clone();
          const correctionRotation = new THREE.Quaternion();
          correctionRotation.setFromAxisAngle(
            new THREE.Vector3(0, 1, 0),
            Math.PI,
          );
          correctedOriginal.multiply(correctionRotation);
          obj.quaternion.slerp(correctedOriginal, 0.02);
        }
      }

      if (loadingObj) {
        const time = performance.now() * 0.002;
        const cfg =
          LOADING_STATES[loadingState] ||
          LOADING_STATES.loading;
        const scale =
          1 + Math.sin(time * (2000 / cfg.pulseSpeed)) * 0.1;
        loadingObj.scale.setScalar(scale);
        if (loadingState === "loading") {
          loadingObj.rotation.y += 0.02;
          loadingObj.rotation.x = Math.sin(time) * 0.1;
        } else if (loadingState === "error") {
          loadingObj.rotation.y += 0.005;
          loadingObj.rotation.z = Math.sin(time * 2) * 0.05;
        }
        loadingObj.position.y = Math.sin(time * 0.8) * 0.15;
      }

      if (
        rendererRef.current &&
        sceneRef.current &&
        cameraRef.current
      ) {
        rendererRef.current.render(
          sceneRef.current,
          cameraRef.current,
        );
      }
      frameId.current = requestAnimationFrame(animate);
    };
    animate();

    // Resize
    const handleResize = () => {
      if (
        !rendererRef.current ||
        !cameraRef.current ||
        !mountRef.current
      )
        return;
      const container = mountRef.current;
      const w = container.clientWidth || width;
      const h = container.clientHeight || height;
      rendererRef.current.setSize(w, h);
      cameraRef.current.aspect = w / h;
      cameraRef.current.updateProjectionMatrix();
    };
    window.addEventListener("resize", handleResize);

    // Also watch for container size changes
    const resizeObserver = new ResizeObserver(() => {
      handleResize();
    });
    resizeObserver.observe(container);

    // Camera control functions will be defined outside useEffect

    // Pointer and interaction
    const el = mountRef.current;
    const handleMouseMove = (e: MouseEvent) => {
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
      mouseRef.current.x = Math.max(-1, Math.min(1, x));
      mouseRef.current.y = Math.max(-1, Math.min(1, y));

      // Handle panning
      if (isPanning) {
        // Check if pan is enabled in config
        const config = cameraConfigRef.current;
        const enablePan = config?.enablePan ?? true;

        if (!enablePan) return;

        const deltaX = e.clientX - lastPanPosition.x;
        const deltaY = e.clientY - lastPanPosition.y;

        setPanOffset((prev) => {
          const newPanOffset = {
            x: prev.x - deltaX * 0.005, // Reduced sensitivity for smoother panning
            y: prev.y + deltaY * 0.005,
          };
          // Also update the ref immediately
          panOffsetRef.current = newPanOffset;
          return newPanOffset;
        });

        setLastPanPosition({ x: e.clientX, y: e.clientY });
      }
    };

    const handleMouseDown = (e: MouseEvent) => {
      // Check if pan is enabled in config
      const config = cameraConfigRef.current;
      const enablePan = config?.enablePan ?? true;

      if (!enablePan) return;

      if (e.button === 1) {
        // Middle mouse button
        e.preventDefault();
        setIsPanning(true);
        setLastPanPosition({ x: e.clientX, y: e.clientY });
      }
    };

    const handleMouseUp = (e: MouseEvent) => {
      if (e.button === 1) {
        // Middle mouse button
        e.preventDefault();
        setIsPanning(false);
      }
    };

    const handleWheel = (e: WheelEvent) => {
      // Check if zoom is enabled in config
      const config = cameraConfigRef.current;
      const enableZoom = config?.enableZoom ?? true;
      const minDistance = config?.minDistance ?? 1;
      const maxDistance = config?.maxDistance ?? 20;
      const hasManualRotation = hasManualRotationRef.current;

      if (!enableZoom) return;

      e.preventDefault(); // Prevent page scroll
      e.stopPropagation(); // Prevent event from bubbling up

      // For manual rotation setups, use a different zoom approach
      if (hasManualRotation && cameraRef.current) {
        const cam = cameraRef.current;
        const delta = e.deltaY * 0.001; // Smaller delta for position-based zoom
        const currentPos = cam.position.clone();
        const basePos = baseCameraPositionRef.current;

        // Scale the position relative to the base position
        const scaleFactor = 1 + delta;
        const newPos = new THREE.Vector3(
          basePos.x * scaleFactor,
          basePos.y * scaleFactor,
          basePos.z * scaleFactor,
        );

        // Apply distance limits
        const distanceFromOrigin = newPos.length();
        if (
          distanceFromOrigin >= minDistance &&
          distanceFromOrigin <= maxDistance
        ) {
          cam.position.copy(newPos);
          // Update base position for future calculations
          baseCameraPositionRef.current = {
            x: newPos.x,
            y: newPos.y,
            z: newPos.z,
          };
          console.log(
            "🎯 Manual zoom - Distance from origin:",
            distanceFromOrigin.toFixed(2),
            "Position:",
            newPos,
          );
        }
      } else {
        // Standard distance-based zoom for auto-fit cameras
        const delta = e.deltaY * 0.01;
        setCameraDistance((prev) => {
          const newDistance = Math.max(
            minDistance,
            Math.min(maxDistance, prev + delta),
          );
          console.log(
            "🎯 Auto zoom - Previous:",
            prev.toFixed(2),
            "Delta:",
            delta.toFixed(2),
            "New:",
            newDistance.toFixed(2),
          );
          // Also update the ref immediately
          cameraDistanceRef.current = newDistance;
          return newDistance;
        });
      }
    };

    const handleMouseEnter = () => {
      setIsHovered(true);
      isHoveredRef.current = true;
    };

    const handleMouseLeave = () => {
      setIsHovered(false);
      isHoveredRef.current = false;
      setIsPanning(false);
    };

    const handleDoubleClick = () => {
      // Reset camera to original calculated distance
      const basePos = baseCameraPositionRef.current;
      const baseTarget = baseCameraTargetRef.current;
      const originalDistance = Math.sqrt(
        Math.pow(basePos.x - baseTarget.x, 2) +
          Math.pow(basePos.y - baseTarget.y, 2) +
          Math.pow(basePos.z - baseTarget.z, 2),
      );
      setCameraDistance(originalDistance);
      setPanOffset({ x: 0, y: 0 }); // Reset pan

      // Also update refs immediately
      cameraDistanceRef.current = originalDistance;
      panOffsetRef.current = { x: 0, y: 0 };

      console.log(
        "🔄 Camera reset - Distance:",
        originalDistance.toFixed(2),
      );
    };

    el?.addEventListener("mousemove", handleMouseMove, {
      passive: false,
    });
    el?.addEventListener("mouseenter", handleMouseEnter);
    el?.addEventListener("mouseleave", handleMouseLeave);
    el?.addEventListener("mousedown", handleMouseDown);
    el?.addEventListener("mouseup", handleMouseUp);
    el?.addEventListener("wheel", handleWheel, {
      passive: false,
    });
    el?.addEventListener("dblclick", handleDoubleClick);

    // Also listen for mouseup on document to catch releases outside the element
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      if (frameId.current)
        cancelAnimationFrame(frameId.current);
      window.removeEventListener("resize", handleResize);
      resizeObserver.disconnect();
      el?.removeEventListener("mousemove", handleMouseMove);
      el?.removeEventListener("mouseenter", handleMouseEnter);
      el?.removeEventListener("mouseleave", handleMouseLeave);
      el?.removeEventListener("mousedown", handleMouseDown);
      el?.removeEventListener("mouseup", handleMouseUp);
      el?.removeEventListener("wheel", handleWheel);
      el?.removeEventListener("dblclick", handleDoubleClick);
      document.removeEventListener("mouseup", handleMouseUp);

      // Restore page scroll on cleanup
      document.body.style.overflow = "auto";

      // Clean up GLTF lights
      gltfLightsRef.current.forEach((light) => {
        if (sceneRef.current) {
          sceneRef.current.remove(light);
        }
      });
      gltfLightsRef.current = [];

      // Clean up default lights
      defaultLightsRef.current.forEach((light) => {
        if (sceneRef.current) {
          sceneRef.current.remove(light);
        }
      });
      defaultLightsRef.current = [];

      // Clean up animations
      if (animationMixerRef.current) {
        animationMixerRef.current.stopAllAction();
        if (rootObjectRef.current) {
          animationMixerRef.current.uncacheRoot(
            rootObjectRef.current,
          );
        }
        animationMixerRef.current = null;
      }
      animationClipsRef.current = [];
      animationActionsRef.current = [];

      if (rendererRef.current?.domElement && mountRef.current) {
        mountRef.current.removeChild(
          rendererRef.current.domElement,
        );
      }
      removeObjectFromScene(rootObjectRef.current);
      removeObjectFromScene(loadingObjectRef.current);

      sceneRef.current?.traverse((child) => {
        const m = child as THREE.Mesh;
        if (m.geometry) m.geometry.dispose();
        if (m.material) {
          const mat = m.material;
          if (Array.isArray(mat))
            mat.forEach((mm) => mm.dispose());
          else mat.dispose();
        }
      });

      rendererRef.current?.dispose();
    };
  }, [width, height, modelColor, modelUrl]);

  // Update camera position when zoom or pan changes
  useEffect(() => {
    updateCameraPosition();
  }, [cameraDistance, panOffset]);

  const updateCameraPosition = () => {
    if (!cameraRef.current) return;

    const cam = cameraRef.current;
    const basePos = baseCameraPositionRef.current;
    const baseTarget = baseCameraTargetRef.current;

    // Use the stored GLTF camera target or default to origin
    const basePosVec = new THREE.Vector3(
      basePos.x,
      basePos.y,
      basePos.z,
    );
    const lookTarget = new THREE.Vector3(
      baseTarget.x,
      baseTarget.y,
      baseTarget.z,
    );
    const direction = basePosVec
      .clone()
      .sub(lookTarget)
      .normalize();

    // Apply zoom by scaling the distance along the direction
    const newPosition = lookTarget
      .clone()
      .add(direction.multiplyScalar(cameraDistance));

    // Apply pan offset in camera's local coordinate system
    const tempCam = cam.clone();
    tempCam.position.copy(newPosition);
    tempCam.lookAt(lookTarget);

    const right = new THREE.Vector3();
    const up = new THREE.Vector3();
    const forward = new THREE.Vector3();

    tempCam.getWorldDirection(forward);
    forward.negate(); // Camera looks down -Z

    right.crossVectors(forward, tempCam.up).normalize();
    up.crossVectors(right, forward).normalize();

    // Apply pan offset
    const panVector = right
      .multiplyScalar(panOffset.x * cameraDistance * 0.05)
      .add(
        up.multiplyScalar(panOffset.y * cameraDistance * 0.05),
      );
    newPosition.add(panVector);

    // Update camera position and look at target with pan offset
    cam.position.copy(newPosition);
    const panTarget = lookTarget
      .clone()
      .add(
        right.multiplyScalar(
          panOffset.x * cameraDistance * 0.05,
        ),
      )
      .add(
        up.multiplyScalar(panOffset.y * cameraDistance * 0.05),
      );
    cam.lookAt(panTarget);
  };

  // Motion hover
  const handleHoverStart = useCallback(() => {
    setIsHovered(true);
    isHoveredRef.current = true;
  }, []);
  const handleHoverEnd = useCallback(() => {
    setIsHovered(false);
    isHoveredRef.current = false;
    mouseRef.current.x = 0;
    mouseRef.current.y = 0;
  }, []);

  return (
    <motion.div
      ref={mountRef}
      className={`threed-viewer-container cursor-pointer select-none w-full h-full ${className}`}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
      style={{
        filter: isHovered
          ? "drop-shadow(0 0 25px rgba(139, 92, 246, 0.6)) brightness(1.1)"
          : "drop-shadow(0 0 10px rgba(139, 92, 246, 0.2))",
        transition: "filter 0.3s ease",
        position: "relative",
        borderRadius: "12px",
        overflow: "hidden",
      }}
      onHoverStart={handleHoverStart}
      onHoverEnd={handleHoverEnd}
      onWheel={(e) => {
        // React synthetic event handler to ensure wheel events are captured
        e.preventDefault();
        e.stopPropagation();
      }}
    >
      {(loadingState === "loading" ||
        loadingState === "error") && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm rounded-lg z-10">
          <div className="flex flex-col items-center">
            {loadingState === "loading" && (
              <>
                <div className="w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full animate-spin mb-2" />
                <div className="text-sm text-orange-500 font-medium">
                  Loading 3D Model...
                </div>
              </>
            )}
            {loadingState === "error" && (
              <>
                <div className="w-8 h-8 bg-red-500 rounded-full mb-2 animate-pulse" />
                <div className="text-sm text-red-500 font-medium">
                  Failed to load model
                </div>
                <div className="text-xs text-red-400 mt-1">
                  Using fallback geometry
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </motion.div>
  );
}