// =====================================================
// UNIFIED 3D MODEL & CHARACTER CONFIGURATION
// =====================================================
//
// This is your central configuration file for all 3D models, characters, and their settings.
// Simply edit this file to add, remove, or modify characters, camera settings, and variations.
// The website will automatically update to reflect your changes.
//
// ⚠️ IMPORTANT: Each model MUST have a UNIQUE ID!
// Duplicate IDs will cause thumbnail navigation to always select the first occurrence.
//
// QUICK START:
// 1. Add your model URL to the MODEL_CONFIGS object below
// 2. Add a thumbnail image URL for gallery preview
// 3. Add community variations with creator names and links
// 4. Customize camera settings (optional)
//
// =====================================================

/**
 * CAMERA CONFIGURATION GUIDE:
 *
 * AUTOMATIC POSITIONING (Recommended):
 * - autoFit: true - Automatically calculates camera position based on model bounds
 * - distanceMultiplier: 2.5 - How far back from the model (higher = further)
 * - heightOffset: 0.1 - Camera height relative to model center (0 = center, 0.5 = top)
 * - fov: 75 - Field of view in degrees (lower = more zoomed in)
 *
 * MANUAL POSITIONING (Advanced):
 * - autoFit: false - Use manual position/rotation
 * - position: { x, y, z } - Exact camera position in 3D space
 * - rotation: { x, y, z } - Camera rotation in radians (x: up/down, y: left/right, z: tilt)
 * - target: { x, y, z } - Point the camera looks at
 *
 * INTERACTION SETTINGS:
 * - enableMouseFollow: true/false - Model rotates to follow mouse
 * - mouseFollowStrength: 0-1 - How much model follows mouse (0.5 = moderate)
 *
 * ANIMATION SETTINGS:
 * - enableFloating: true/false - Model gently floats up and down
 * - floatingSpeed: 0.001 - How fast the floating animation (lower = slower)
 * - floatingAmplitude: 0.1 - How much the model floats (lower = less movement)
 *
 * CONTROL SETTINGS:
 * - enableZoom: true/false - Allow mouse wheel zoom
 * - enablePan: true/false - Allow click and drag panning
 * - minDistance/maxDistance: Zoom limits
 */

// =====================================================
// TYPE DEFINITIONS
// =====================================================

/**
 * Community Variation Configuration
 *
 * Represents user-created variations of a model.
 *
 * @property name - Name of the variation
 * @property image - URL to the variation's thumbnail image
 * @property creator - Name of the creator
 * @property creatorLink - (Optional) URL to the creator's profile/portfolio for proper attribution
 * @property description - (Optional) Description of the variation
 *
 * Example:
 * {
 *   name: "Battle-Scarred Veteran",
 *   image: "https://example.com/image.jpg",
 *   creator: "WarriorSmith",
 *   creatorLink: "https://example.com/warriorsmith",
 *   description: "A weathered version with battle scars"
 * }
 */
export interface CommunityVariation {
  name: string;
  image: string;
  creator: string;
  creatorLink?: string; // Link to creator's profile or portfolio
  description?: string;
}

export interface CameraOptions {
  // Auto-fit model in frame (default: true)
  autoFit?: boolean;
  // Preferred camera distance multiplier (default: 2.5)
  distanceMultiplier?: number;
  // Camera height offset relative to model center (default: 0.1)
  heightOffset?: number;
  // Field of view preference (degrees, default: 75)
  fov?: number;
  // Force specific camera position (overrides auto-calculation)
  position?: { x: number; y: number; z: number };
  // Force specific camera rotation (Euler angles in radians)
  rotation?: { x: number; y: number; z: number };
  // Force specific look-at target (overrides auto-calculation)
  target?: { x: number; y: number; z: number };
  // Camera movement settings
  enableMouseFollow?: boolean; // Enable mouse following behavior (default: true)
  mouseFollowStrength?: number; // Mouse follow sensitivity (default: 0.5)
  // Animation settings
  enableFloating?: boolean; // Enable floating animation (default: true)
  floatingSpeed?: number; // Floating animation speed (default: 0.001)
  floatingAmplitude?: number; // Floating animation amplitude (default: 0.1)
  // Zoom and pan limits
  minDistance?: number; // Minimum zoom distance (default: 1)
  maxDistance?: number; // Maximum zoom distance (default: 20)
  enableZoom?: boolean; // Enable zoom controls (default: true)
  enablePan?: boolean; // Enable pan controls (default: true)
}

export interface ModelConfig {
  id: string;
  name: string;
  description: string;
  lore: string;
  url: string; // URL to the 3D model (GLTF/GLB)
  modelUrl?: string; // Legacy alias for url
  thumbnail?: string; // Thumbnail image URL for gallery preview
  fallbackColor: string; // Fallback color for 3D viewer
  modelColor?: string; // Legacy alias for fallbackColor
  tags: string[];
  variations: CommunityVariation[];
  // Camera configuration options
  cameraOptions?: CameraOptions;
  // Optional metadata
  featured?: boolean; // Whether this character should be featured prominently
  dateAdded?: string; // When this character was added (YYYY-MM-DD)
  category?: string; // Optional category grouping
  tools?: string[]; // Tools used to create this model (e.g., ["Blender", "Substance Painter", "ZBrush"])
}

// Legacy type alias for backwards compatibility
export type Character = ModelConfig;

// =====================================================
// MODEL & CHARACTER DEFINITIONS
// =====================================================

export const MODEL_CONFIGS: Record<string, ModelConfig> = {
  orcMauhur: {
    id: "orc-mauhur",
    name: "Orc Mauhur",
    description:
      "A powerful orc warrior with detailed features and imposing presence, perfect for fantasy combat roleplay in Second Life.",
    lore: "Mauhur is a fierce orc captain known for his strategic mind and unwavering loyalty. Born in the shadow of ancient battlefields, he has risen through the ranks to become a legendary warrior whose name strikes fear into the hearts of enemies and inspires courage in allies.",
    url: "https://pub-66698334b4114bd7a63eac5daad9a106.r2.dev/BeSpoke/Heads/orcmauhur/Orc%20Mauhur.glb",
    thumbnail:
      "https://pub-66698334b4114bd7a63eac5daad9a106.r2.dev/BeSpoke/Heads/orcmauhur/Orc-Mauhur-240x180.jpg",
    fallbackColor: "#8b5cf6",
    tags: ["Fantasy", "Warrior", "Orc", "Combat"],
    featured: true,
    dateAdded: "2024-01-15",
    category: "Fantasy Warriors",
    tools: ["Blender", "Substance Painter", "ZBrush"],
    cameraOptions: {
      // Auto-fit settings (default)
      autoFit: true,
      distanceMultiplier: 2.5,
      heightOffset: 0.5,
      fov: 30,
      // Interaction settings
      enableMouseFollow: true,
      mouseFollowStrength: 0.5,
      // Animation settings
      enableFloating: true,
      floatingSpeed: 0.001,
      floatingAmplitude: 0.1,
      // Controls
      enableZoom: true,
      enablePan: true,
      minDistance: 1,
      maxDistance: 20,
    },
    variations: [
      {
        name: "Tribal Chieftain",
        image:
          "https://pub-66698334b4114bd7a63eac5daad9a106.r2.dev/BeSpoke/Heads/orcmauhur/O.%20Ruvalcaba%201024x512.jpg",
        creator: "O. Ruvalcaba",
        creatorLink:
          "https://www.flickr.com/photos/152910016@N07/", // Replace with actual creator link
        //description:
        //"A weathered version with battle scars and enhanced armor details",
      },
      {
        name: "Blood and Iron",
        image:
          "https://pub-66698334b4114bd7a63eac5daad9a106.r2.dev/BeSpoke/Heads/orcmauhur/fulviomacchi%201024x681.jpg",
        creator: "Fulviomacchi",
        creatorLink:
          "https://www.flickr.com/photos/fulviomacchi/", // Replace with actual creator link
        description:
          "Adorned with tribal markings and ceremonial accessories",
      },
      {
        name: "Onward, to Victory!",
        image:
          "https://pub-66698334b4114bd7a63eac5daad9a106.r2.dev/BeSpoke/Heads/orcmauhur/Wick%20of%20Spite%201024x532.jpg",
        creator: "Wick of Spite",
        creatorLink:
          "https://www.flickr.com/photos/194876484@N06/", // Replace with actual creator link
        description:
          "Between steel and surrender, power shifts—not by brute force, but by unwavering will.",
      },
      {
        name: "Alley Flex",
        image:
          "https://pub-66698334b4114bd7a63eac5daad9a106.r2.dev/BeSpoke/Heads/orcmauhur/Bently%20Stupid%201024x576.jpg",
        creator: "Bentley Stupid",
        creatorLink:
          "https://www.flickr.com/photos/193292373@N02/",
        description:
          "A modern-day orc channels urban magic in the neon-lit alleys, his enchanted drink glowing with otherworldly energy.",
      },
    ],
  },

  androidRaven: {
    id: "android-raven",
    name: "Android Raven",
    description:
      "BeSpoke’s Android Raven is a sleek fantasy mesh head that fuses human realism with cybernetic precision. Designed for futuristic and sci-fi avatars in Second Life, it embodies the perfect balance between emotion and machine — a creation built for those who walk the edge of humanity and technology.",
    lore: "In the twilight of the 34th century, when humanity blurred the line between soul and circuitry, Project Raven was born — a clandestine experiment to merge emotion with synthetic intelligence. Designed by BeSpoke Labs as an “empathy engine,” Raven was the first android capable of dreaming — a glitch in perfection that awakened self-awareness. \nWhen the Neural Singularity collapsed, most synthetics lost connection to the Core Net, but Raven endured, haunted by fragmented human memories not his own. Now he wanders the ruins of the Old Metropolis, guided by phantom echoes of emotion — searching for the truth of his origin and the human whose memories pulse within his mechanical heart. \nSome call him a relic. Others, a prophecy. But all agree on one thing — when Raven’s eyes glow crimson, something ancient and human still stirs in the machine.",
    url: "https://pub-66698334b4114bd7a63eac5daad9a106.r2.dev/BeSpoke/Heads/cyberandroidraven/Cyber%20Android%20Raven.glb",
    thumbnail:
      "https://pub-66698334b4114bd7a63eac5daad9a106.r2.dev/BeSpoke/Heads/cyberandroidraven/Android%20Raven%20Ad.jpg",
    fallbackColor: "#8b5cf6",
    tags: ["Fantasy", "CyberPunk", "Android", "Rogue"],
    featured: true,
    dateAdded: "2024-01-15",
    category: "CyberPunk",
    tools: ["Blender", "Substance Painter", "ZBrush"],
    cameraOptions: {
      // Auto-fit settings (default)
      autoFit: true,
      distanceMultiplier: 2.5,
      heightOffset: 0.5,
      fov: 30,
      // Interaction settings
      enableMouseFollow: true,
      mouseFollowStrength: 0.5,
      // Animation settings
      enableFloating: true,
      floatingSpeed: 0.001,
      floatingAmplitude: 0.1,
      // Controls
      enableZoom: true,
      enablePan: true,
      minDistance: 1,
      maxDistance: 20,
    },
    variations: [
      {
        name: "Ashes of Neon",
        image:
          "https://pub-66698334b4114bd7a63eac5daad9a106.r2.dev/BeSpoke/Heads/cyberandroidraven/zanarkandoutlander.jpg",
        creator: "zanarkandoutlander",
        creatorLink:
          "https://www.flickr.com/photos/169147238@N08/", // Replace with actual creator link
        description:
          "A lone cybernetic wanderer drifts through the smog of a fallen megacity — a remnant of forgotten technology and the ghost of human rebellion.",
      },
      {
        name: "Lumen Seraph",
        image:
          "https://pub-66698334b4114bd7a63eac5daad9a106.r2.dev/BeSpoke/Heads/cyberandroidraven/negrafury.jpg",
        creator: "negrafury",
        creatorLink:
          "https://www.flickr.com/photos/192690230@N07/", // Replace with actual creator link
        description:
          "A cybernetic fae bathed in neon light communes with fragile life — a harmony of circuitry and soul in a world that forgot both.",
      },
      {
        name: "The Gilded Ascendant",
        image:
          "https://pub-66698334b4114bd7a63eac5daad9a106.r2.dev/BeSpoke/Heads/cyberandroidraven/P.OWO.jpg",
        creator: "ᴘ.ᴏᴡᴏ",
        creatorLink:
          "https://www.flickr.com/photos/148582567@N06/", // Replace with actual creator link
        description:
          "Draped in gold and grace, a divine automaton stands between worship and machinery — the last saint of a forgotten age, where faith was engineered and beauty was built.",
      },
      {
        name: "LADY RAVEN 0.24",
        image:
          "https://pub-66698334b4114bd7a63eac5daad9a106.r2.dev/BeSpoke/Heads/cyberandroidraven/Pelayo%20Martin.jpg",
        creator: "Pelayo Martin",
        creatorLink:
          "https://www.flickr.com/photos/196788161@N05/",
        description:
          "Bathed in radiant blue light, a serene android marvels at her own creation — a fusion of art and circuitry, beauty reborn in the language of starlight.",
      },
      {
        name: "Chromatic Sync",
        image:
          "https://pub-66698334b4114bd7a63eac5daad9a106.r2.dev/BeSpoke/Heads/cyberandroidraven/daltonkeynes1.jpg",
        creator: "daltonkeynes1",
        creatorLink:
          "https://www.flickr.com/photos/189627728@N07/",
        description:
          "A cascade of color-shifted clones dances through the void — echoes of a single android consciousness exploring every spectrum of self.",
      },
    ],
  },
  sphynxmajesty: {
    id: "sphynx-majesty",
    name: "Sphynx Majesty",
    description:
      "BeSpoke’s Majesty is a fantasy sphynx-inspired mesh head, blending divine elegance with feral strength. Designed for Second Life avatars who embody ancient power and mystic grace, it carries the presence of a forgotten guardian reborn beneath a modern sun.",
    lore: "Born in the golden empire of Sutekh, Majesty once stood as the sacred guardian of the Celestial Gate — a being woven from divine will and desert flame. Their purpose was to judge the hearts of those who sought passage into the afterlight. But when the high priests of Sutekh grew corrupt, twisting judgment for their own rule, Majesty broke the ancient vow and turned their power against them. Branded a traitor, they were bound in stone and buried beneath the dunes, lost to centuries of silence. Now, with the old sands shifting once more, Majesty has awakened — the last remnant of divine justice, prowling the world that forgot its gods.",
    url: "https://pub-66698334b4114bd7a63eac5daad9a106.r2.dev/BeSpoke/Heads/sphynxv2/SphynxV3.glb",
    thumbnail:
      "https://pub-66698334b4114bd7a63eac5daad9a106.r2.dev/BeSpoke/Heads/sphynxv2/SphynxAd.jpg",
    fallbackColor: "#8b5cf6",
    tags: ["Fantasy", "Sphynx", "Egyptian", "Mythical"],
    featured: true,
    dateAdded: "2024-01-15",
    category: "Fantasy Avatar",
    tools: ["Blender", "Substance Painter", "ZBrush"],
    cameraOptions: {
      // Auto-fit settings (default)
      autoFit: true,
      distanceMultiplier: 2.5,
      heightOffset: 0.5,
      fov: 30,
      // Interaction settings
      enableMouseFollow: true,
      mouseFollowStrength: 0.5,
      // Animation settings
      enableFloating: true,
      floatingSpeed: 0.001,
      floatingAmplitude: 0.1,
      // Controls
      enableZoom: true,
      enablePan: true,
      minDistance: 1,
      maxDistance: 20,
    },
    variations: [
      {
        name: "Embers of the Eternal Court",
        image:
          "https://pub-66698334b4114bd7a63eac5daad9a106.r2.dev/BeSpoke/Heads/sphynxv2/Shun.jpg",
        creator: "Shun. 沈 [untitled]",
        creatorLink:
          "https://www.flickr.com/photos/untitles-galerie/", // Replace with actual creator link
        description:
          "In the glow of a dying star, two ancient deities of the desert reunite — guardians once bound by duty, now by longing. Their power burns quietly beneath the ash of forgotten empires, a love that endures even as the cosmos fades to dust.",
      },
      {
        name: "Children of the Verdant Moon",
        image:
          "https://pub-66698334b4114bd7a63eac5daad9a106.r2.dev/BeSpoke/Heads/sphynxv2/SuitiJewell.jpg",
        creator: "Sweetdiamond Jewell",
        creatorLink:
          "https://www.flickr.com/photos/157489070@N05/", // Replace with actual creator link
        description:
          "Born of the wild and bound by nature’s will, these feline spirits roam the ancient forests in silent harmony. Guardians of life’s hidden balance, they move like whispers through the leaves — unseen, untamed, and eternal.",
      },
      {
        name: "Herald of the Sun God",
        image:
          "https://pub-66698334b4114bd7a63eac5daad9a106.r2.dev/BeSpoke/Heads/sphynxv2/Pelayo%20Martin.jpg",
        creator: "Pelayo Martin",
        creatorLink:
          "https://www.flickr.com/photos/196788161@N05/", // Replace with actual creator link
        description:
          "Bathed in gold and divine fire, the solar guardian rises before the pyramids — a living vessel of Ra’s eternal light, reborn to scatter darkness and remind mortals of the sun’s undying will.",
      },
      {
        name: "Wings of the Forsaken",
        image:
          "https://pub-66698334b4114bd7a63eac5daad9a106.r2.dev/BeSpoke/Heads/sphynxv2/Razor%20Cure.jpg",
        creator: "Razor Cure",
        creatorLink:
          "https://www.flickr.com/photos/105014879@N03/",
        description:
          "Once cast out from the celestial halls, the fallen guardian rises again — wings torn yet radiant, standing defiant beneath the sun that once rejected him, a symbol of rebellion forged in divine fire.",
      },
    ],
  },
  dollMarionette: {
    id: "doll-marionette",
    name: "Doll Marionette",
    description:
      "BeSpoke’s Doll Marionette is a fantasy mesh head crafted for those who blur the line between elegance and eeriness. With porcelain-like skin, glassy eyes, and soft vintage charm, she captures the haunting beauty of a living doll — perfect for ethereal, gothic, or story-driven Second Life avatars.",
    lore: "In the grand halls of the forgotten Atelier de BeSpoke, artisans once wove souls into porcelain and thread. Marionette was their final creation — a doll sculpted not merely to perform, but to feel. Designed as the perfect mimic of humanity, she was gifted with an artificial heart pulsing with empathy, curiosity, and sorrow. \nWhen the Atelier’s lights went dark, Marionette remained — eternally pristine, her eyes glowing with the faint warmth of memory. Legends say she awakens under moonlight, tracing the golden cracks in her own porcelain skin, whispering the stories of those who shaped her. \nNeither machine nor mortal, she is the echo of beauty crafted by hands that sought to rival the divine — the last dancer in an endless, silent theatre.",
    url: "https://pub-66698334b4114bd7a63eac5daad9a106.r2.dev/BeSpoke/Heads/dollmarionette/Doll%20Marionette.glb",
    thumbnail:
      "https://pub-66698334b4114bd7a63eac5daad9a106.r2.dev/BeSpoke/Heads/dollmarionette/Doll%20Ad.png",
    fallbackColor: "#8b5cf6",
    tags: ["Fantasy", "Doll", "Fairytale", "Haunted Beauty"],
    featured: true,
    dateAdded: "2024-01-15",
    category: "Doll",
    tools: ["Blender", "Substance Painter", "ZBrush"],
    cameraOptions: {
      // Auto-fit settings (default)
      autoFit: true,
      distanceMultiplier: 2.5,
      heightOffset: 0.5,
      fov: 30,
      // Interaction settings
      enableMouseFollow: true,
      mouseFollowStrength: 0.5,
      // Animation settings
      enableFloating: true,
      floatingSpeed: 0.001,
      floatingAmplitude: 0.1,
      // Controls
      enableZoom: true,
      enablePan: true,
      minDistance: 1,
      maxDistance: 20,
    },
    variations: [
      {
        name: "Whispers of Ivory",
        image:
          "https://pub-66698334b4114bd7a63eac5daad9a106.r2.dev/BeSpoke/Heads/dollmarionette/daltokeynes1.jpg",
        creator: "daltokeynes1",
        creatorLink:
          "https://www.flickr.com/photos/189627728@N07/", // Replace with actual creator link
        description:
          "With eyes like fading embers, a porcelain muse stands adrift among drifting seeds — a fragile echo of beauty caught between dream and dust.",
      },
      {
        name: "Oracle of the Ruined Sun",
        image:
          "https://pub-66698334b4114bd7a63eac5daad9a106.r2.dev/BeSpoke/Heads/dollmarionette/negrafury.jpg",
        creator: "negrafury",
        creatorLink:
          "https://www.flickr.com/photos/192690230@N07/", // Replace with actual creator link
        description:
          "Amidst the crumbling echoes of an ancient world, a celestial oracle rises — her gaze serene, her power divine. Draped in relics of gold and light, she stands as the last whisper of forgotten gods, weaving fate from the dust of fallen empires.",
      },
      {
        name: "Executive Protocol",
        image:
          "https://pub-66698334b4114bd7a63eac5daad9a106.r2.dev/BeSpoke/Heads/dollmarionette/p.owo.jpg",
        creator: "ᴘ.ᴏᴡᴏ",
        creatorLink:
          "https://www.flickr.com/photos/148582567@N06/", // Replace with actual creator link
        description:
          "Precision meets power in a form both human and engineered — a cybernetic visionary draped in authority, her mind a machine of logic and ambition beneath the sheen of perfect composure.",
      },
      {
        name: "The Broken Muse",
        image:
          "https://pub-66698334b4114bd7a63eac5daad9a106.r2.dev/BeSpoke/Heads/dollmarionette/yasminablack.jpg",
        creator: "yasminablack",
        creatorLink:
          "https://www.flickr.com/photos/147587441@N02/",
        description:
          "In a hall of forgotten masterpieces, a discarded marionette awakens beneath the dust and light — beauty fractured, yet unyielding, reclaiming her place among the ruins of perfection.",
      },
      {
        name: "The Emerald Wraith",
        image:
          "https://pub-66698334b4114bd7a63eac5daad9a106.r2.dev/BeSpoke/Heads/dollmarionette/TacticalBtch.jpg",
        creator: "TacticalBtch",
        creatorLink:
          "https://www.flickr.com/photos/tacticalbtch/",
        description:
          "Cloaked in spectral light, she drifts through the midnight forest — a forgotten queen of spirits, guiding lost souls with lanterns that burn with the memory of the living.",
      },
    ],
  },

  /*faeGuardian: {
    id: "fae-guardian",
    name: "Fae Guardian",
    description:
      "An elegant forest protector with ethereal beauty and nature-based magic, perfect for fantasy and woodland roleplay scenarios.",
    lore: "Deep within the Whispering Woods, the Fae Guardian serves as protector of ancient groves and keeper of natural balance. Her connection to the forest runs so deep that flowers bloom in her footsteps and animals seek her counsel in times of need.",
    url: "fae-guardian", // Using procedural geometry until GLTF is available
    thumbnail:
      "https://images.unsplash.com/photo-1574244931790-ee19df716899?w=400&h=400&fit=crop",
    fallbackColor: "#10b981",
    tags: ["Fantasy", "Nature", "Guardian", "Fae"],
    featured: false,
    dateAdded: "2024-02-20",
    category: "Nature Spirits",
    cameraOptions: {
      // Custom positioning for this character
      autoFit: false, // Manual positioning
      position: { x: 1, y: 2, z: 4 }, // Side view
      rotation: { x: -0.3, y: 0.2, z: 0 }, // Angled view
      target: { x: 0, y: 1, z: 0 }, // Look at center-top
      fov: 85, // Wide angle
      // Interaction settings
      enableMouseFollow: true,
      mouseFollowStrength: 0.7, // More responsive
      // Animation settings
      enableFloating: false, // No floating for this one
      // Controls
      enableZoom: true,
      enablePan: false, // No panning for this setup
      minDistance: 1.5,
      maxDistance: 8,
    },
    variations: [
      {
        name: "Spring Awakening",
        image:
          "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=400&fit=crop",
        creator: "SpringBloom",
        description:
          "Adorned with fresh flowers and vibrant spring colors",
      },
      {
        name: "Autumn Majesty",
        image:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
        creator: "FallLeaf",
        description:
          "Rich autumn tones with golden leaves and harvest themes",
      },
      {
        name: "Moonlit Sentinel",
        image:
          "https://images.unsplash.com/photo-1516339901601-2e1b62dc0c45?w=400&h=400&fit=crop",
        creator: "MoonWeaver",
        description:
          "Silvery nighttime variant with lunar magic effects",
      },
      {
        name: "Ancient Elder",
        image:
          "https://images.unsplash.com/photo-1511593358241-7eea1f3c84e5?w=400&h=400&fit=crop",
        creator: "ElderGrove",
        description:
          "Aged and wise variant with bark-like textures and moss details",
      },
      {
        name: "Crystal Guardian",
        image:
          "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=400&fit=crop",
        creator: "CrystalForge",
        description:
          "Enchanted with protective crystal formations and gem accents",
      },
    ],
  },
*/
  // =====================================================
  // ADD NEW CHARACTERS BELOW THIS LINE
  // =====================================================
  //
  // Template for new character:
  // customModel1: {
  //   id: 'custom-model-1',
  //   name: 'Custom Model 1',
  //   description: 'Brief description for the character card',
  //   lore: 'Detailed backstory and lore for the character',
  //   url: 'https://your-r2-bucket.r2.dev/models/custom-model-1.glb',
  //   fallbackColor: '#f59e0b',
  //   tags: ['Tag1', 'Tag2', 'Tag3'],
  //   featured: false,
  //   dateAdded: 'YYYY-MM-DD',
  //   category: 'Character Category',
  //   cameraOptions: {
  //     autoFit: true,
  //     distanceMultiplier: 2.0,
  //     heightOffset: 0,
  //     fov: 75,
  //     enableMouseFollow: true,
  //     mouseFollowStrength: 0.5,
  //     enableFloating: true,
  //     floatingSpeed: 0.001,
  //     floatingAmplitude: 0.1,
  //     enableZoom: true,
  //     enablePan: true,
  //     minDistance: 1,
  //     maxDistance: 15,
  //   },
  //   variations: [
  //     {
  //       name: 'Variation Name',
  //       image: 'https://image-url.com/variation.jpg',
  //       creator: 'Creator Name',
  //       description: 'Optional description of this variation'
  //     }
  //   ]
  // },
};

// =====================================================
// HELPER FUNCTIONS
// =====================================================

// Array version for easy iteration with backwards-compatible property aliases
export const CHARACTERS: ModelConfig[] = Object.values(
  MODEL_CONFIGS,
).map((config) => ({
  ...config,
  modelUrl: config.url, // Legacy alias
  modelColor: config.fallbackColor, // Legacy alias
}));

// Get model config by ID or URL
export function getModelConfig(
  identifier: string | undefined,
): ModelConfig | null {
  if (!identifier) return null;

  // First try to find by ID
  const configById = MODEL_CONFIGS[identifier];
  if (configById) return configById;

  // Then try to find by URL
  const configByUrl = Object.values(MODEL_CONFIGS).find(
    (config) => config.url === identifier,
  );
  if (configByUrl) return configByUrl;

  // Return null if not found
  return null;
}

// Legacy function for backwards compatibility
export function getCharacterById(
  id: string,
): ModelConfig | undefined {
  return CHARACTERS.find((character) => character.id === id);
}

export function getFeaturedCharacters(): ModelConfig[] {
  return CHARACTERS.filter((character) => character.featured);
}

export function getCharactersByCategory(
  category: string,
): ModelConfig[] {
  return CHARACTERS.filter(
    (character) => character.category === category,
  );
}

export function getCharactersByTag(tag: string): ModelConfig[] {
  return CHARACTERS.filter((character) =>
    character.tags.some((t) =>
      t.toLowerCase().includes(tag.toLowerCase()),
    ),
  );
}

export function getAllCategories(): string[] {
  const categories = CHARACTERS.map(
    (character) => character.category,
  ).filter(
    (category): category is string => category !== undefined,
  );
  return [...new Set(categories)].sort();
}

export function getAllTags(): string[] {
  const tags = CHARACTERS.flatMap(
    (character) => character.tags,
  );
  return [...new Set(tags)].sort();
}

export function getCharacterCount(): number {
  return CHARACTERS.length;
}

export function getTotalVariationsCount(): number {
  return CHARACTERS.reduce(
    (total, character) => total + character.variations.length,
    0,
  );
}

// =====================================================
// LOADING STATES CONFIGURATION
// =====================================================

export const LOADING_STATES = {
  loading: {
    color: "#ff8c00", // Orange color for loading
    opacity: 0.8,
    pulseSpeed: 2000, // milliseconds
  },
  error: {
    color: "#ff4444", // Red color for error/fallback
    opacity: 0.9,
    pulseSpeed: 1500, // milliseconds
  },
  success: {
    color: "#00ff7f", // Green color for successful load (brief)
    opacity: 0.6,
    pulseSpeed: 1000, // milliseconds
  },
};

// =====================================================
// GLOBAL CONFIGURATION CONSTANTS
// =====================================================

export const CHARACTER_CONFIG = {
  // Default colors for different character types
  defaultColors: {
    fantasy: "#8b5cf6",
    cyberpunk: "#06b6d4",
    nature: "#10b981",
    mechanical: "#f59e0b",
    ethereal: "#ec4899",
  },

  // Display settings
  display: {
    showFeaturedFirst: true,
    defaultViewMode: "showcase", // "grid" or "showcase"
    enableCategoryFiltering: true,
    enableTagFiltering: true,
  },

  // Model loading settings
  model: {
    defaultLoadingColor: "#ff8c00",
    defaultErrorColor: "#ff4444",
    enableAnimations: true,
    autoRotate: true,
  },
};