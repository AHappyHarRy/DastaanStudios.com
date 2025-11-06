// =====================================================
// UNIFIED UI/UX PROJECT CONFIGURATION
// =====================================================
//
// This is your central configuration file for all UI/UX projects and their variations.
// Simply edit this file to add, remove, or modify projects and their details.
// The website will automatically update to reflect your changes.
//
// ⚠️ IMPORTANT: Each project MUST have a UNIQUE ID!
// Duplicate IDs will cause navigation issues.
//
// QUICK START:
// 1. Add your project details to the UI_PROJECTS object below
// 2. Customize project variations (mobile, design system, UX research, etc.)
// 3. Add project metadata (client, role, date, etc.)
//
// =====================================================

// =====================================================
// TYPE DEFINITIONS
// =====================================================

/**
 * Project Variation Configuration
 *
 * Represents different versions or aspects of a UI/UX project
 * (e.g., Mobile version, Design System, UX Research, etc.)
 *
 * @property name - Name of the variation
 * @property image - URL to the variation's preview image
 * @property description - Description of this variation
 * @property features - Key features of this variation
 * @property category - Category label (e.g., "Mobile Design", "Design System")
 * @property insight - Design approach or insight for this variation
 */
export interface ProjectVariation {
  name: string;
  image: string;
  description: string;
  features: string[];
  category: string;
  insight: string;
}

/**
 * UI/UX Project Configuration
 *
 * Main configuration for a UI/UX project with all its metadata and variations
 *
 * @property id - Unique identifier for the project (used for navigation)
 * @property title - Project title
 * @property description - Main project description
 * @property image - Main project image/screenshot
 * @property tags - Array of tags for categorization
 * @property link - (Optional) External link to live project or case study
 * @property featured - (Optional) Whether to feature this project prominently
 * @property dateCreated - (Optional) When this project was created (YYYY-MM-DD)
 * @property client - (Optional) Client name
 * @property role - (Optional) Your role in the project
 * @property duration - (Optional) Project duration
 * @property tools - (Optional) Tools used in the project
 * @property variations - Array of project variations
 */
export interface UIProjectConfig {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  link?: string;
  featured?: boolean;
  dateCreated?: string;
  client?: string;
  role?: string;
  duration?: string;
  tools?: string[];
  variations: ProjectVariation[];
}

// =====================================================
// UI/UX PROJECT DEFINITIONS
// =====================================================

export const UI_PROJECTS: Record<string, UIProjectConfig> = {
  hss: {
    id: "hss",
    title: "Haute Secret Shoppers",
    description:
      "A luxury AI stylist platform that merges conversational design with curated fashion intelligence. Users chat naturally with the stylist 'ELI 4.0', who builds personalized looks through mood boards, outfit recommendations, and editorial insights.",
    image:
      "https://pub-b120982df7ab4298a0ba52316306264a.r2.dev/ux/hss/HSS%20-%20First%20Look%20Style%202.jpg",
    tags: [
      "Luxury E-Commerce",
      "AI Assistant",
      "Chat UI",
      "Fashion Tech",
      "UX Research",
      "Minimal Design",
    ],
    featured: true,
    dateCreated: "2024-03-15",
    client: "HauteSecretShoppers.com",
    role: "Lead UI/UX Designer / Project Manager",
    duration: "6 months",
    tools: ["Figma", "FigJam", "Photoshop"],
    variations: [
      {
        name: "AI-Powered Stylist Chat Interface",
        image:
          "https://pub-b120982df7ab4298a0ba52316306264a.r2.dev/ux/hss/HSS%20-%20First%20Look%20Style%202.jpg",
        description:
          "The conversational shopping experience driven by 'ELI 4.0' — a personal AI stylist who guides users through mood boards, outfit suggestions, and tailored recommendations with a luxury concierge tone.",
        features: [
          "Conversational AI stylist",
          "Integrated color and style filters",
          "Mood board creation",
          "Adaptive layout for web and mobile",
        ],
        category: "Main Design",
        insight:
          "The challenge was balancing a high-end aesthetic with AI usability. Each dialogue feels like a human stylist consultation — deliberate, personal, and fashion-forward.",
      },
      {
        name: "Outfit Curation Interface",
        image:
          "https://pub-b120982df7ab4298a0ba52316306264a.r2.dev/ux/hss/HSS%20-%20First%20Look%20-%20Outfit%20Section.jpg",
        description:
          "The outfit insight and product composition layout, presenting garments with editorial storytelling. The interface merges e-commerce logic with magazine-style curation.",
        features: [
          "Outfit storytelling layout",
          "Curated product recommendations",
          "Editorial visual hierarchy",
          "Integrated wishlist actions",
        ],
        category: "UX Flow",
        insight:
          "Inspired by luxury editorial formats, this section humanizes e-commerce through fashion narrative — elevating shopping into an experience of style education.",
      },
      {
        name: "Curated Wardrobe Detail View",
        image:
          "https://pub-b120982df7ab4298a0ba52316306264a.r2.dev/ux/hss/HSS%20-%20First%20Look%20-%20Outfit%20Section%202.jpg",
        description:
          "Detailed curation page showing AI-recommended looks, reference imagery, and context-driven insights for each outfit piece.",
        features: [
          "Item storytelling",
          "Reference look integration",
          "Wishlist and purchase flow",
          "Personalized insights",
        ],
        category: "UX Detailing",
        insight:
          "This view blends AI recommendations with contextual reasoning — turning machine suggestions into human-style narratives.",
      },
      {
        name: "Mood Board and Filters",
        image:
          "https://pub-b120982df7ab4298a0ba52316306264a.r2.dev/ux/hss/HSS%20-%20First%20Look%20Style%204.jpg",
        description:
          "A dynamic mood board and real-time filtering system that visualizes user preferences, aiding the AI stylist in refining look recommendations.",
        features: [
          "Real-time filter updates",
          "Visual mood board editor",
          "Interactive color palette",
          "Adaptive recommendation engine",
        ],
        category: "Interaction Design",
        insight:
          "The interface allows users to express abstract preferences visually, helping AI interpret personal style beyond text prompts.",
      },
      {
        name: "Responsive Shopping Experience",
        image:
          "https://pub-b120982df7ab4298a0ba52316306264a.r2.dev/ux/hss/HSS%20-%20First%20Look%20Style%201.jpg",
        description:
          "Adaptive layout maintaining the luxury aesthetic across devices, ensuring the chat and product recommendation experience feels fluid and consistent.",
        features: [
          "Mobile-first adaptation",
          "Fluid layout transitions",
          "Consistent brand styling",
          "Optimized navigation",
        ],
        category: "Mobile Design",
        insight:
          "Every frame was crafted to translate luxury into responsiveness — avoiding clutter while retaining warmth and clarity.",
      },
      {
        name: "Wishlist & Wardrobe Flow",
        image:
          "https://pub-b120982df7ab4298a0ba52316306264a.r2.dev/ux/hss/HSS%20-%20First%20Look%20-%20Outfit%20Section%203.jpg",
        description:
          "Wishlist and saved outfits presented as curated wardrobes, enabling users to revisit AI-selected ensembles and re-style them.",
        features: [
          "Persistent wishlist system",
          "Look re-styling options",
          "Smart outfit combinations",
          "Personalized recommendations",
        ],
        category: "UX Flow",
        insight:
          "Designed around continuity — transforming wishlists from static collections into living wardrobes that evolve with the user’s style.",
      },
      {
        name: "Design System – Modular Components",
        image:
          "https://pub-b120982df7ab4298a0ba52316306264a.r2.dev/ux/hss/Modular.jpg",
        description:
          "Comprehensive modular system defining the brand’s luxury design language — typography, buttons, cards, and layout rules — ensuring cohesion across all HSS experiences.",
        features: [
          "Component library",
          "Design tokens",
          "Typography and color system",
          "Layout grid and documentation",
        ],
        category: "Design System",
        insight:
          "A unified modular foundation created for scalability, maintaining elegance while supporting AI-driven UI elements and future brand extensions.",
      },
    ],
  },

  bespokeHud: {
    id: "bespoke-hud",
    title: "BeSpoke Avatar HUD (Second Life)",
    description:
      "A production-ready customization HUD for BeSpoke avatars in Second Life. We designed the UI and built the complete LSL stack: stateful menus, texture/material appliers, animation triggers, and a modular architecture that supports future add-ons.",
    image:
      "https://pub-b120982df7ab4298a0ba52316306264a.r2.dev/ux/bespoke/hud/HUD.jpg",
    tags: [
      "Second Life",
      "HUD",
      "Game UI",
      "LSL",
      "Avatar Customization",
      "Realtime",
    ],
    featured: false,
    dateCreated: "2024-08-19",
    client: "BeSpoke (Dastaan Studios)",
    role: "UI/UX Designer • Technical Artist • LSL Developer",
    duration: "2 months",
    tools: [
      "Figma",
      "Photoshop",
      "Blender",
      "LSL",
      "Unity (mock sim)",
    ],
    variations: [
      {
        name: "HUD Overview",
        image:
          "https://pub-b120982df7ab4298a0ba52316306264a.r2.dev/ux/bespoke/hud/HUD.jpg",
        description:
          "The final in-world HUD layout with compact navigation, tab badges, and context previews. Built for fast clicks and minimal screen obstruction.",
        features: [
          "Docked vertical nav with icons",
          "Low-latency commands",
          "Consistent typographic scale",
          "Scalable to new tabs",
        ],
        category: "Main Design",
        insight:
          "The HUD uses a tall, slim footprint so players can customize while keeping the scene visible—no intrusive overlays.",
      },
      {
        name: "Head Tab",
        image:
          "https://pub-b120982df7ab4298a0ba52316306264a.r2.dev/ux/bespoke/hud/1_Head%20Tab.jpg",
        description:
          "Facial detail presets, scalp toggles, ear controls, and material overrides designed for quick look swaps.",
        features: [
          "Face detail presets (pages 1–2)",
          "Scalp visibility and styles",
          "Ear hide/holes/rotation",
          "Global material sliders",
        ],
        category: "Interaction Design",
        insight:
          "Grouped by action frequency: top-row for presets, bottom for fine controls.",
      },
      {
        name: "Eyelash Tab",
        image:
          "https://pub-b120982df7ab4298a0ba52316306264a.r2.dev/ux/bespoke/hud/2_Eyelash%20Tab.jpg",
        description:
          "Switch between lash styles and blend modes, with tint and length controls for nuanced looks.",
        features: [
          "Style presets (1–4)",
          "Mask/Blend/None alpha modes",
          "Hue & lightness tints",
          "Length slider",
        ],
        category: "Cosmetics",
        insight:
          "Blend modes allow compatibility with skins from multiple creators.",
      },
      {
        name: "Eye Tab",
        image:
          "https://pub-b120982df7ab4298a0ba52316306264a.r2.dev/ux/bespoke/hud/3_Eye%20Tab.jpg",
        description:
          "Per-eye toggles, highlight maps, and iris size/offset controls for asymmetric stylization.",
        features: [
          "Left/Right eye toggles",
          "3 highlight styles",
          "Iris size & offset",
          "Gloss/env/intensity sliders",
        ],
        category: "Cosmetics",
        insight:
          "Asymmetry adds realism; every control works per-eye for precise art direction.",
      },
      {
        name: "Teeth Tab",
        image:
          "https://pub-b120982df7ab4298a0ba52316306264a.r2.dev/ux/bespoke/hud/4_Teeth%20Tab.jpg",
        description:
          "Swap tooth sets and materials with separate controls for tongue visibility and surface response.",
        features: [
          "Tooth set presets (1–4)",
          "Texture slots",
          "Material tuning",
          "Teeth/Tongue toggles",
        ],
        category: "Cosmetics",
        insight:
          "Kept intentionally spacious for future dental add-ons and fangs.",
      },
      {
        name: "HD Lips Tab",
        image:
          "https://pub-b120982df7ab4298a0ba52316306264a.r2.dev/ux/bespoke/hud/5_HD%20Lips%20Tab.jpg",
        description:
          "High-resolution lip textures with switchable material layer and full tint pipeline.",
        features: [
          "Texture grids (pages 1–2)",
          "HD material on/off",
          "Hue & lightness",
          "Alpha mode: Mask/Blend/None",
        ],
        category: "HD Layer",
        insight:
          "HD overlays are isolated to protect base skins while allowing dramatic looks.",
      },
      {
        name: "HD Eyes Tab",
        image:
          "https://pub-b120982df7ab4298a0ba52316306264a.r2.dev/ux/bespoke/hud/6_HD%20Eyes%20Tab.jpg",
        description:
          "HD eyelid overlays and materials with independent sliders for spec and intensity.",
        features: [
          "HD eyelid presets (1–2)",
          "Material on/off",
          "Hue & lightness",
          "Spec/intensity sliders",
        ],
        category: "HD Layer",
        insight:
          "Material channel can be toggled to stay compatible with non-PBR skins.",
      },
      {
        name: "HD Eyebrows Tab",
        image:
          "https://pub-b120982df7ab4298a0ba52316306264a.r2.dev/ux/bespoke/hud/7_HD%20Eyebrows%20Tab.jpg",
        description:
          "Tintable HD eyebrow sets with position/size micro-controls and alpha modes.",
        features: [
          "4 preset sets",
          "Offset and size",
          "Hue & lightness",
          "Mask/Blend/None",
        ],
        category: "HD Layer",
        insight:
          "Micro transforms prevent texture stretching across different head morphs.",
      },
      {
        name: "Animations Tab",
        image:
          "https://pub-b120982df7ab4298a0ba52316306264a.r2.dev/ux/bespoke/hud/8_Animations%20Tab.jpg",
        description:
          "Mood packs, eye states, talking styles, jaw/tongue poses, and joystick-style eye tracking.",
        features: [
          "Live AO moods (p1/p2)",
          "Talk cycles & emotes",
          "Jaw and tongue poses",
          "Per-eye joystick movement",
        ],
        category: "Animation",
        insight:
          "All actions are queued with safe timers to avoid AO conflicts and priority thrash.",
      },
      {
        name: "Tech Setup & Architecture",
        image:
          "https://pub-b120982df7ab4298a0ba52316306264a.r2.dev/ux/bespoke/hud/g0.jpg",
        description:
          "Modular LSL message bus, linkset channels, and namespaced commands. Supports addon tabs without touching the core.",
        features: [
          "Modular LSL architecture",
          "Event-driven message bus",
          "Namespaced commands",
          "Add-on ready",
        ],
        category: "Technical Architecture",
        insight:
          "We separated UI intents from actions (publish/subscribe) so creators can extend features with minimal merge risk.",
      },
    ],
  },
  bespokeMainstore: {
    id: "bespoke-mainstore",
    title: "BeSpoke Mainstore Experience Design (Second Life)",
    description:
      "UX design goes beyond 2D interfaces — it extends into spatial design, navigation flow, and immersion. The BeSpoke Mainstore in Second Life was built as an interactive UX space, merging architectural structure with experiential logic. The circular hub ensures seamless navigation and intuitive category discovery, while the layered zones guide users from exploration to purchase effortlessly.",
    image:
      "https://pub-b120982df7ab4298a0ba52316306264a.r2.dev/ux/bespoke/mainstore/POV.jpg",
    tags: [
      "UX Design",
      "Environment Design",
      "3D Navigation",
      "Second Life",
      "Experience Design",
      "Architecture",
      "Spatial UI",
    ],
    featured: true,
    dateCreated: "2025-01-12",
    client: "BeSpoke (Dastaan Studios)",
    role: "Experience Designer • World Builder • 3D UX Developer",
    duration: "3 months",
    tools: [
      "Blender",
      "Second Life Editor",
      "Substance Painter",
      "Photoshop",
    ],
    variations: [
      {
        name: "Mainstore Overview",
        image:
          "https://pub-b120982df7ab4298a0ba52316306264a.r2.dev/ux/bespoke/mainstore/POV.jpg",
        description:
          "The BeSpoke Mainstore central atrium acts as the visual anchor, ensuring the user’s orientation remains constant. The circular floor layout connects each category zone radially, maintaining line-of-sight and spatial hierarchy.",
        features: [
          "Circular flow-based navigation",
          "Central landmark for orientation",
          "Category zoning (Fae, Humanoid, Demon, etc.)",
          "Balanced lighting for visual comfort",
        ],
        category: "Experience Design",
        insight:
          "Circular architecture mirrors a UX carousel: users can pivot between categories without breaking immersion or losing direction.",
      },
      {
        name: "Top Shot Layout",
        image:
          "https://pub-b120982df7ab4298a0ba52316306264a.r2.dev/ux/bespoke/mainstore/TopShot.jpg",
        description:
          "A top-down layout view shows the intentional geometry — a radial navigation map where each segment is a product category. The water channels and bridges act as natural dividers while guiding flow toward the center.",
        features: [
          "Radial category segmentation",
          "Peripheral discovery flow",
          "Environmental wayfinding (water paths, bridges)",
          "360° sightline continuity",
        ],
        category: "Experience Design",
        insight:
          "Users subconsciously follow radial geometry, which keeps navigation intuitive even in 3D space — a principle adapted from UX eye-tracking heatmaps.",
      },
      {
        name: "Wide View I",
        image:
          "https://pub-b120982df7ab4298a0ba52316306264a.r2.dev/ux/bespoke/mainstore/Wide1.jpg",
        description:
          "A wide-angle shot from upper level showcasing category labeling, spatial spacing, and lighting design for product clarity.",
        features: [
          "Readable signage hierarchy",
          "Zoned color and light contrast",
          "Vertical spatial separation (floor 1: accessories, floor 2: gallery)",
          "Balanced shadows for performance and mood",
        ],
        category: "Experience Design",
        insight:
          "Category names are placed at eye-level from most walking angles — prioritizing orientation over aesthetics, similar to breadcrumb trails in 2D UX.",
      },
      {
        name: "Wide View II",
        image:
          "https://pub-b120982df7ab4298a0ba52316306264a.r2.dev/ux/bespoke/mainstore/Wide2.jpg",
        description:
          "A panoramic perspective emphasizing navigation flow and brand zoning. Each archway represents a different fantasy race theme.",
        features: [
          "Spatial branding by theme",
          "Cohesive lighting color temperature",
          "Consistent focal depth",
          "Optimized for 45° FOV camera views",
        ],
        category: "Experience Design",
        insight:
          "Each visual node acts as a UX hotspot — arches double as navigational affordances and semantic grouping markers.",
      },
      {
        name: "Shroom Room (Fae Section)",
        image:
          "https://pub-b120982df7ab4298a0ba52316306264a.r2.dev/ux/bespoke/mainstore/ShroomRoom.jpg",
        description:
          "Themed environment within the mainstore. Fae/Shroom section integrates soft organic lighting, moss textures, and bioluminescent mushrooms to evoke fantasy immersion while maintaining visibility of product boards.",
        features: [
          "Ambient storytelling through texture and light",
          "Low-light contrast for mood consistency",
          "Dynamic accents (mushroom glow, particle haze)",
          "Foreground plant clusters for depth cues",
        ],
        category: "Experience Design",
        insight:
          "Themed sections act as emotional UX anchors — turning shopping into exploration, invoking curiosity and engagement loops.",
      },
      {
        name: "Vendors Display Wall",
        image:
          "https://pub-b120982df7ab4298a0ba52316306264a.r2.dev/ux/bespoke/mainstore/Vendors%20Display.jpg",
        description:
          "Product wall layout designed for quick scanning. Each board maintains uniform proportions, consistent spacing, and ambient backlighting to reduce visual fatigue.",
        features: [
          "Standardized poster grid for readability",
          "Light temperature calibration",
          "Consistent vendor labeling",
          "Group discount and demo callouts",
        ],
        category: "Experience Design",
        insight:
          "Mirrors e-commerce UX — maintaining grid uniformity boosts scanning speed and recall of favorite products, translating 2D browsing familiarity into 3D space.",
      },
    ],
  },
};

// =====================================================
// HELPER FUNCTIONS
// =====================================================

/**
 * Get all UI/UX projects as an array
 * @returns Array of all UI project configurations
 */
export function getAllProjects(): UIProjectConfig[] {
  return Object.values(UI_PROJECTS);
}

/**
 * Get a specific project by ID
 * @param id - The unique project ID
 * @returns The project configuration or undefined if not found
 */
export function getProjectById(
  id: string,
): UIProjectConfig | undefined {
  return UI_PROJECTS[id];
}

/**
 * Get all featured projects
 * @returns Array of featured project configurations
 */
export function getFeaturedProjects(): UIProjectConfig[] {
  return getAllProjects().filter((project) => project.featured);
}

/**
 * Get projects by tag
 * @param tag - The tag to filter by
 * @returns Array of projects with the specified tag
 */
export function getProjectsByTag(
  tag: string,
): UIProjectConfig[] {
  return getAllProjects().filter((project) =>
    project.tags.some(
      (t) => t.toLowerCase() === tag.toLowerCase(),
    ),
  );
}

/**
 * Get all unique tags across all projects
 * @returns Array of unique tags
 */
export function getAllTags(): string[] {
  const tags = new Set<string>();
  getAllProjects().forEach((project) => {
    project.tags.forEach((tag) => tags.add(tag));
  });
  return Array.from(tags).sort();
}

// =====================================================
// LEGACY EXPORTS FOR BACKWARDS COMPATIBILITY
// =====================================================

export const PROJECTS = UI_PROJECTS;
export type Project = UIProjectConfig;