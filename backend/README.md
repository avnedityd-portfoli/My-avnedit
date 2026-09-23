# AVNEDIT — Google Sheets Backend Setup

Yeh guide poori tarah **phone se** follow ho sakti hai — koi laptop zaroori nahi.

Order form Google Sheets se **directly** connect nahi hota (private frontend code
mein Google credentials rakhna unsafe hai). Iske bajaye flow yeh hai:

```
Website form  →  POST /api/orders (tumhara backend)  →  Google Apps Script Web App  →  Google Sheet
```

`/api/orders.js` already tayaar hai. Bas tumhe Google Apps Script wala hissa set up karna hai — ismein
koi coding nahi, sab Google Sheets ke andar hi hota hai.

## Step 1 — Google Sheet banao

1. [sheets.google.com](https://sheets.google.com) kholo (phone browser se)
2. Naya sheet banao, naam do **AVNEDIT Orders**
3. Pehli row mein yeh column headers daalo (order important hai):

```
Date | Order ID | Customer Code | Selected Plan | Plan Price | Customer Name | Customer Email | Selected Services | Project Requirements | Other Request | Files Note | Order Status | Payment Status
```

## Step 2 — Apps Script attach karo

1. Sheet ke andar: **Extensions → Apps Script** (agar "Extensions" na dikhe, "..." menu check karo — mobile
   browser pe "Desktop site" mode on karna aasaan rahega)
2. Default code hata ke yeh paste karo:

```javascript
function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const data = JSON.parse(e.postData.contents);

  sheet.appendRow([
    data.date,
    data.orderId,
    data.customerCode,
    data.selectedPlan,
    data.planPrice,
    data.customerName,
    data.customerEmail,
    JSON.stringify(data.selectedServices),
    JSON.stringify(data.projectRequirements),
    data.otherRequest,
    data.filesNote,
    data.orderStatus,
    data.paymentStatus,
  ]);

  return ContentService
    .createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}
```

3. **Save** karo (floppy disk icon)

## Step 3 — Deploy as Web App

1. Top-right **Deploy → New deployment**
2. Gear icon → **Web app** select karo
3. "Execute as": **Me**
4. "Who has access": **Anyone**
5. **Deploy** tap karo
6. Google ek URL dega jo `https://script.google.com/macros/s/.../exec` jaisa dikhega — **isko copy kar lo**

## Step 4 — Backend ko yeh URL do

Jahan bhi yeh project deploy karoge (Vercel recommended — phone se bhi ho jata hai):

1. Vercel project ke **Settings → Environment Variables** mein jao
2. Naam: `GOOGLE_SHEETS_WEBHOOK_URL`
3. Value: Step 3 wala URL paste karo
4. Save + redeploy

Bas — ab har order automatically tumhare Google Sheet mein ek naya row ban jayega, Order Status "New"
aur Payment Status "Discussing" ke saath.

## Security note

- Koi Google credential ya API key kabhi frontend code mein nahi jaata
- Apps Script URL sirf server environment variable mein rehta hai
- Payment kabhi automatically "Paid" mark nahi hota — woh hamesha manual rahega
