// ==========================================================
// AVNEDIT — CENTRAL PLAN DATA
// Single source of truth for pricing, features, and which
// service fields the order wizard should generate.
// Edit prices/features here only — every page reads from this file.
// ==========================================================

export const SERVICE_LABELS = {
  video: "YouTube Video Edit",
  reel: "Reel Edit",
  thumbnail: "Thumbnail Design",
  script: "Video Script Writing",
  website: "Custom Website",
}

export const plans = [
  {
    id: "basic",
    name: "Basic",
    price: 30,
    revisionCount: 1,
    featured: false,
    badge: null,
    buttonLabel: "Choose Basic",
    displayFeatures: [
      "1 Reel Edit",
      "1 Thumbnail Design",
      "1 Video Script Writing",
      "1 Revision / Remake",
    ],
    services: [
      { type: "reel", count: 1 },
      { type: "thumbnail", count: 1 },
      { type: "script", count: 1 },
    ],
  },
  {
    id: "basicPlus",
    name: "Basic Plus",
    price: 49,
    revisionCount: 2,
    featured: false,
    badge: null,
    buttonLabel: "Choose Basic Plus",
    displayFeatures: [
      "2 Reel Edits",
      "2 Thumbnail Designs",
      "2 Video Script Writing",
      "2 Revisions / Remakes",
    ],
    services: [
      { type: "reel", count: 2 },
      { type: "thumbnail", count: 2 },
      { type: "script", count: 2 },
    ],
  },
  {
    id: "medium",
    name: "Medium",
    price: 80,
    revisionCount: 2,
    featured: true,
    badge: "MOST POPULAR",
    buttonLabel: "Choose Medium",
    displayFeatures: [
      "1 YouTube Video Edit",
      "Unlimited Thumbnail Design",
      "Unlimited Video Script Writing",
      "2 Revisions / Remakes",
    ],
    services: [
      { type: "video", count: 1 },
      { type: "thumbnail", count: 1, unlimited: true },
      { type: "script", count: 1, unlimited: true },
    ],
  },
  {
    id: "advanced",
    name: "Advanced",
    price: 200,
    revisionCount: 3,
    featured: false,
    badge: null,
    buttonLabel: "Choose Advanced",
    displayFeatures: [
      "1 Custom Website",
      "3 YouTube Video Edits",
      "Advanced Thumbnail Design",
      "Unlimited Video Script Writing",
      "3 Revisions / Remakes",
    ],
    services: [
      { type: "website", count: 1 },
      { type: "video", count: 3 },
      { type: "thumbnail", count: 1, unlimited: true, advanced: true },
      { type: "script", count: 1, unlimited: true },
    ],
  },
  {
    id: "elite",
    name: "Elite",
    price: 999,
    revisionCount: 3,
    featured: false,
    badge: null,
    buttonLabel: "Choose Elite",
    displayFeatures: [
      "5 YouTube Video Edits",
      "5 Reel Edits",
      "Advanced Custom Website",
      "15 Thumbnail Designs",
      "15 Video Script Writing",
      "3 Revisions / Remakes",
    ],
    services: [
      { type: "video", count: 5 },
      { type: "reel", count: 5 },
      { type: "website", count: 1, advanced: true },
      { type: "thumbnail", count: 15 },
      { type: "script", count: 15 },
    ],
  },
]

export function getPlanById(id) {
  return plans.find((p) => p.id === id) || null
}
