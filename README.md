# CASA0003 — Group 1  
## **Lithium Chain and Flow**  
*Interactive 3-D story-map: From Mines to an EV Revolution*
see video via link : https://liveuclac-my.sharepoint.com/personal/ucfnacb_ucl_ac_uk/_layouts/15/stream.aspx?id=%2Fpersonal%2Fucfnacb%5Fucl%5Fac%5Fuk%2FDocuments%2FGroup1%5Fdemonstration%5Fvideo%5FCASA0003%2Emp4&referrer=StreamWebApp%2EWeb&referrerScenario=AddressBarCopied%2Eview%2E28fba0bd%2D64a3%2D48a0%2Da0a7%2D16fa30c2858a 

---

## 1 · Overview
**Lithium Chain and Flow** is a purely client-side, scroll-narrative site that
reveals the global lithium-to-EV supply chain and its spatial dynamics.

| Stack | Role |
|-------|------|
| **Three.js** | 
| **Mapbox GL JS** |
| **D3 + Chart.js** |
| **Vanilla HTML/CSS** |

No build tools or server are required, just open in a browser.

---

## 2 · Repository layout

```text
.
├── css/                        # Stylesheets
│   ├── styles.css              # Global layout & nav & Sections 1,2,3,4,6
│   ├── bgParticles.css         # Canvas particle background
│   ├── glowContainer.css       # Battery-glow effect (section 6)
│   └── …                       # Section-specific modules
├── data/                       # CSV / GeoJSON (ores, trade, EV sales, …)
├── images/                     # Imagery
├── js/                         # Scripts
│   ├── main.js                 # Smooth-scroll & observers & Sections 1,2,3,4,6
│   ├── Intro.js                # Three.js particle intro
│   ├── bgParticles.js          # Subtle page-background particles
│   ├── glowContainer.js        # Animated page-background particles
│   ├── fullmap1.2.js           # Lithium distribution map
│   └── …                       # One JS file per iframe map / section
│
├── index.html                  # Master narrative (sections 1-11)
├── Intro.html                  # Stand-alone intro demo
├── fullmap1.2.html             # Lithium distribution map (iframe)
├── fullmap2.4.html             # Battery trade-flow map (iframe)
├── fullmap3.3.html             # Global supply-chain case map (iframe)
├── section5.html               # Lithium trade-flow (iframe)
├── section8.html               # Annual global EV sales chart (iframe)
├── section10.html              # Outlook & conclusions (iframe)
├── section11.html              # About & contact (iframe)
├── lithium_cystal.obj          # OBG battery model
└── README.md                   # This file

---

## 3 · Contributor

```text
| Name             | 
| ---------------- | 
| **Yunqian Yao**  | 
| **Han Guo**      | 
| **Yuhan Wang**   |
| **Ximeng Chang** | 


