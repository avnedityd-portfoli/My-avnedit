// ==========================================================
// POST /api/orders
//
// This is written as a Vercel Serverless Function — if you deploy
// this project on Vercel, any file under /api automatically becomes
// a live endpoint, no separate server needed. (Netlify Functions and
// a plain Node/Express server work too, with minor adjustments.)
//
// WHAT THIS DOES:
// 1. Receives the order JSON from the frontend (src/utils/api.js)
// 2. Validates the minimum required fields
// 3. Generates a real, server-side Order ID
// 4. Forwards the complete order to a Google Apps Script "Web App"
//    URL that is bound to your Google Sheet — that URL lives ONLY
//    in an environment variable on the server, never in frontend code
// 5. Returns { orderId, customerCode } back to the frontend
//
// SETUP YOU STILL NEED TO DO (no credentials are invented here):
// See /backend/README.md for the exact steps to create the Google
// Apps Script Web App and get its URL. Once you have it, set it as
// an environment variable named GOOGLE_SHEETS_WEBHOOK_URL in your
// hosting provider's dashboard (e.g. Vercel > Project > Settings >
// Environment Variables — this can be done entirely from your phone
// browser, no laptop required).
// ==========================================================

function generateServerOrderId() {
  const year = new Date().getFullYear()
  const random = Math.floor(1000 + Math.random() * 9000)
  return `AVN-${year}-${random}`
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed." })
    return
  }

  const order = req.body

  // Minimal server-side validation — never trust the client alone.
  if (!order?.customer?.email || !order?.customer?.name || !order?.selectedPlan?.id || !order?.customerCode) {
    res.status(400).json({ error: "Missing required order fields." })
    return
  }

  const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL

  if (!webhookUrl) {
    // This is the expected state until you've completed the Google
    // Apps Script setup in /backend/README.md — fail loudly and
    // clearly instead of pretending the order was saved somewhere.
    res.status(500).json({
      error:
        "Order could not be saved: the Google Sheets connection isn't configured yet. Please try again later.",
    })
    return
  }

  const orderId = generateServerOrderId()

  const row = {
    date: new Date().toISOString(),
    orderId,
    customerCode: order.customerCode,
    selectedPlan: order.selectedPlan.name,
    planPrice: order.selectedPlan.price,
    customerName: order.customer.name,
    customerEmail: order.customer.email,
    selectedServices: Object.keys(order.serviceEntries || {}).filter(
      (type) => (order.serviceEntries[type] || []).length > 0
    ),
    projectRequirements: order.serviceEntries,
    otherRequest: order.otherRequest || "",
    filesNote: order.filesNote || "",
    orderStatus: "New",
    paymentStatus: "Discussing",
  }

  try {
    const sheetsResponse = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(row),
    })

    if (!sheetsResponse.ok) {
      throw new Error(`Sheets webhook responded with ${sheetsResponse.status}`)
    }

    res.status(200).json({ orderId, customerCode: order.customerCode })
  } catch (err) {
    console.error("Failed to forward order to Google Sheets:", err)
    res.status(500).json({
      error: "Something went wrong while submitting your request. Please try again.",
    })
  }
}
