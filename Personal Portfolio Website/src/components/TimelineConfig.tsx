/**
 * ============================================
 * 📅 TIMELINE CONFIGURATION
 * ============================================
 *
 * Edit the timeline milestones below to update your creative journey.
 * Each milestone will appear alternating left-right along the timeline.
 *
 * HOW TO ADD/EDIT MILESTONES:
 * 1. Copy the milestone object structure
 * 2. Update the year, title, description
 * 3. Add your image URL (imageUrl) OR use imageQuery for automatic Unsplash images
 * 4. Save the file - changes will appear automatically!
 *
 * IMAGE OPTIONS:
 * - imageUrl: Direct URL to your image (recommended for your own images)
 * - imageQuery: Fallback search term for Unsplash (used if imageUrl is empty)
 *
 * TO HIDE IMAGES:
 * - Comment out OR remove BOTH imageUrl and imageQuery
 * - Or set both to empty strings: imageUrl: "", imageQuery: ""
 * - If either one exists, an image will be shown!
 */

export interface TimelineMilestone {
  year: string; // Display year (e.g., "2020", "Q1 2021")
  title: string; // Milestone title
  description: string; // Brief description of this milestone
  imageUrl?: string; // Direct image URL (leave empty to use imageQuery)
  imageQuery?: string; // Fallback: Search term for Unsplash images
}

export const timelineMilestones: TimelineMilestone[] = [
  {
    year: "2015",
    title: "The Spark",
    description:
      "The seed of Dastaan Studios was planted in 2013, when I first stepped into the world of computer science. Surrounded by friends who would later become my partners, we shared a dream, to create games and experiences that could tell beautiful stories. Growing up, we’d been shaped by the worlds we explored and the characters we loved. Those games weren’t just entertainment; they were lessons in imagination, emotion, and creativity. And as we learned more about technology, that childhood wonder evolved into a clear purpose: to one day build worlds of our own.",
  },
  {
    year: "2019",
    title: "The Foundation",
    description:
      "By 2019, years of exploration had transformed curiosity into craftsmanship. After gaining hands-on experience in game development, virtual reality, and mixed reality, and working on production-level animation and composition for films, the dream began to take shape in the real world. With that collective knowledge, modeling, animation, storytelling, and technology, we founded Dastaan Studios. It wasn’t just a company; it was the beginning of a creative ecosystem, a place where imagination could evolve into experience. Our goal was clear: to bridge art and technology to craft worlds that inspire, move, and connect people through the language of stories.",
    imageUrl:
      "https://pub-b120982df7ab4298a0ba52316306264a.r2.dev/Dastaan%20Logo-Dark.png", // Add your custom image URL here
    imageQuery: "3d character design",
  },
  {
    year: "2020",
    title: "The Collaboration",
    description:
      "In 2020, the journey took a defining turn. I partnered with Xain and Mud to bring a shared vision to life — BeSpoke, a fantasy avatar brand within Second Life. What began as an experiment in creativity quickly became a thriving world of its own, blending artistry, technical precision, and storytelling into every design. Through BeSpoke, we explored the limits of digital identity — crafting avatars, worlds, and experiences that resonated deeply with a passionate community. It became more than a project; it was proof that our combined creativity could build entire universes from imagination alone.",
    // Example: Both commented out = NO IMAGE SHOWN
    imageUrl:
      "https://pub-66698334b4114bd7a63eac5daad9a106.r2.dev/BeSpokeLogo512x1024.png",
    // imageQuery: "creative team collaboration",
  },
  {
    year: "2021",
    title: "The Rise of BeSpoke",
    description:
      "By 2021, BeSpoke had evolved far beyond its humble beginnings. Our focus on technical precision, customization, and artistic freedom set a new standard within Second Life. We crafted avatars that weren’t just visually striking, they were built to empower creators and players alike, offering deep modification options and seamless integration. As our work spread, so did our community. A vibrant Discord hub formed around BeSpoke, filled with fans, creators, and enthusiasts who shared our love for fantasy design and storytelling. What started as a small collaboration had now become a respected brand and creative ecosystem, proving that innovation thrives when technology meets imagination.",
    imageUrl:
      "https://pub-66698334b4114bd7a63eac5daad9a106.r2.dev/Community%20Event.png", // Add your custom image URL here
    //imageQuery: "ui ux design modern",
  },
  {
    year: "2021",
    title: "Dubai Expo - Expanding Horizons",
    description:
      "2021 was not only a year of growth for BeSpoke, but also a leap into global collaboration. Partnering with Imaginary Studios, we contributed to the Pakistan Pavilion at Expo 2020 Dubai, creating interactive technology displays that blended art, culture, and innovation. It was an unforgettable experience, bringing Pakistan’s story to an international audience through immersive digital installations. This project expanded our understanding of how technology can evoke emotion, reinforcing our passion for building experiences that connect people beyond screens and boundaries.",
    imageUrl:
      "https://pub-b120982df7ab4298a0ba52316306264a.r2.dev/Expo2020/Collage.jpg", // Add your custom image URL here
    //imageQuery: "award winning design",
  },
  {
    year: "2022",
    title: "Merging Worlds",
    description:
      "In 2022, our passion for immersive storytelling pushed us even further. Continuing our partnership with Imaginary Studios, we developed Mixed Reality skiing experiences for Malam Jabba, one of Pakistan’s most scenic tourist destinations. Using VR technology combined with custom-built interactive gear, we created an experience that allowed users to feel the thrill of skiing through snow-covered mountains, without ever leaving the ground. It was a blend of design, engineering, and imagination that showcased how digital innovation can transform real-world tourism and entertainment. This project marked another step toward our ultimate vision — crafting experiences that blur the lines between reality and fantasy.",
    imageUrl:
      "https://pub-b120982df7ab4298a0ba52316306264a.r2.dev/Malam%20Jabba/MJ%20Collage.jpg", // Add your custom image URL here
    imageQuery: "future technology creative",
  },
  {
    year: "2023",
    title: "Designing Play",
    description:
      "In 2023, our collaboration with Imaginary Studios reached new heights as we took on one of our most ambitious projects yet; Khyberpunk, an arcade play area built in Lahore, Pakistan. Designed to engage visitors of all ages, Khyberpunk blended art, technology, and spatial design to create an atmosphere of pure fun and discovery. From interactive setups to immersive lighting and motion-based experiences, every element was crafted to make people feel like they’d stepped into a living game world. It was a defining project that reflected what we stood for, interactive storytelling, emotional engagement, and innovation through play.",
    imageUrl:
      "https://pub-b120982df7ab4298a0ba52316306264a.r2.dev/Khyberpunk/Khyberpunk-arcade-lahore.jpg", // Add your custom image URL here
    //imageQuery: "future technology creative",
  },
  {
    year: "2024",
    title: "The Year of Experiments",
    description:
      "2024 marked a new chapter for Dastaan Studios, a year defined by exploration and creative risk-taking. We immersed ourselves in experiments across multiple disciplines, pushing the boundaries of what our studio could create. From developing games and immersive VR/MR experiences, to building mobile applications for iOS and Android, to exploring the tangible world through 3D printing and crafting user-centered UX designs, it was a year of learning, prototyping, and redefining our creative identity. Each experiment added a new layer to Dastaan Studios’ foundation, expanding our vision of becoming a multidisciplinary creative ecosystem, where technology, art, and storytelling meet without limits.",
    imageUrl:
      "https://pub-b120982df7ab4298a0ba52316306264a.r2.dev/Misc/Experiment.jpg", // Add your custom image URL here
    //imageQuery: "future technology creative",
  },
  {
    year: "2024",
    title: "The Year of Expansion",
    description:
      "2025 stands as a defining year for Dastaan Studios — a year of growth, collaboration, and evolution. Our creative branch, BeSpoke, continues to flourish in Second Life, with an ever-growing community and marketplace. We expand our collection with new avatars, worlds, animations, and accessories, each crafted with the same passion that started it all — giving people the tools to express their imagination. Beyond virtual worlds, we’re shaping the future of real-world interaction. Partnering with Haute Secret Shoppers, we’re developing AI-powered fashion technology — an interactive platform that redefines personal styling and wardrobe curation through intelligent design. Our team is expanding, our roots in design and development are stronger than ever, and our mission has never been clearer: Dastaan Studios is a full-suite storytelling house — building worlds, experiences, and technologies that give everyone a story to tell.",
    imageUrl:
      "https://pub-b120982df7ab4298a0ba52316306264a.r2.dev/Misc/Experiment.jpg", // Add your custom image URL here
    //imageQuery: "future technology creative",
  },
];

/**
 * TIMELINE STYLING CONFIGURATION
 * Customize colors for the timeline elements
 */
export const timelineColors = {
  lineColor:
    "bg-gradient-to-b from-orange-400 via-yellow-400 to-green-400",
  dotColor: "bg-orange-500",
  dotGlow: "shadow-orange-500/50",
  yearColor: "text-orange-400",
  titleGradient: "from-yellow-400 to-orange-500",
  cardBorder: "border-orange-400/20",
  cardGlow: "magical-glow",
};