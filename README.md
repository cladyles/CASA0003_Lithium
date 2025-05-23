# CASA0003 — Group 1

## **Lithium Chain and Flow： From Mines to an EV Revolution**

*Interactive 3-D immersed-map *

See the demo video: *https://liveuclac-my.sharepoint.com/personal/ucfnacb_ucl_ac_uk/_layouts/15/stream.aspx?id=%2Fpersonal%2Fucfnacb%5Fucl%5Fac%5Fuk%2FDocuments%2FGroup1%5Fdemonstration%5Fvideo%5FCASA0003%2Emp4&referrer=StreamWebApp%2EWeb&referrerScenario=AddressBarCopied%2Eview%2E28fba0bd%2D64a3%2D48a0%2Da0a7%2D16fa30c2858a*

---

## 1 · Overview

**Lithium Chain and Flow** is a fully client-side, scroll-narrative website revealing the global lithium→EV supply chain and its spatial dynamics.

| Tech stack           | 
| -------------------- | 
| **Three.js**         | 
| **Mapbox GL JS**     | 
| **D3 + Chart.js**    | 
| **Vanilla HTML/CSS** | 

*No build tools or server are required—just open `index.html` in your browser.*

---

## 2 · Repository layout

```text
.
├── css/                      # Stylesheets
│   ├── styles.css            # Global + sections 1–4,6
│   ├── bgParticles.css       # Canvas particle background
│   ├── glowContainer.css     # Battery-glow effect (section 6)
│   └── …                     # Other section modules
├── data/                     # CSV / GeoJSON (ores, trade, EV sales…)
├── images/                   # Static imagery + GLTF battery model
├── js/                       # ES-module scripts
│   ├── main.js               # Smooth-scroll, observers, shared logic
│   ├── Intro.js              # Three.js particle intro
│   ├── bgParticles.js        # Subtle canvas background particles
│   ├── glowContainer.js      # Animated glow for EV diagram
│   ├── fullmap1.2.js         # Lithium distribution helpers
│   └── …                     # One JS per iframe map/section
│
├── index.html                # Master narrative (sections 1–11)
├── Intro.html                # Stand-alone intro demo
├── fullmap1.2.html           # Lithium distribution map (iframe)
├── fullmap2.4.html           # Battery trade-flow map (iframe)
├── fullmap3.3.html           # Global supply-chain case map (iframe)
├── section5.html             # Lithium trade-flow (iframe)
├── section8.html             # Annual EV sales chart (iframe)
├── section10.html            # Outlook & conclusions (iframe)
├── section11.html            # About & contact (iframe)
└── README.md                 # This file
```

---

## 3 · Contributor

| Name             | Main focus             |
| ---------------- | ---------------------- |
| **Han Guo**      | UI & Data & Visualization Develop|
| **Ximeng Chang** | Data & Maps & Visualization Develop |
| **Yuhan Wang**   | Data & Maps & Visualization Develop |
| **Yunqian Yao**  | Architecture & Interaction & Visualization Develop |

---

## 4 · Reference

* AFSIC Investing in Africa (2024) *Understanding the Global Distribution of Minerals*. Available at: [https://www.afsic.net/](https://www.afsic.net/)... \[Accessed 22 May 2025].
* Carbon Credits (2025) *Lithium Market Insight 2025: Price Recovery, EV Demand, and the Future of Extraction*. Available at: [https://carboncredits.com/](https://carboncredits.com/)... \[Accessed 13 May 2025].
* CSIS (2025) *South America’s Lithium Triangle: Opportunities for the Biden Administration*. Available at: [https://www.csis.org/](https://www.csis.org/)... \[Accessed 13 May 2025].
* European Commission (2023) *Critical Raw Materials Act and the 2023 List of Critical Raw Materials*. Available at: [https://singlemarket-economy.ec.europa.eu/](https://singlemarket-economy.ec.europa.eu/)... \[Accessed 22 May 2025].
* Flash Battery (2022) *The History and Evolution of Lithium Batteries*. Available at: [https://www.flashbattery.tech/](https://www.flashbattery.tech/)... \[Accessed 13 May 2025].
* Hendrickson T.P. et al. (2015) “Life-cycle implications and supply chain logistics of electric vehicle battery recycling in California”, *Environmental Research Letters*, 10(1), 014011.
* IEA (2024) *Global Critical Minerals Outlook 2024*. Available at: [https://www.iea.org/](https://www.iea.org/)... \[Accessed 22 May 2025].
* IEA (2025) *Global Critical Minerals Outlook 2025 – Executive Summary*. Available at: [https://www.iea.org/](https://www.iea.org/)... \[Accessed 22 May 2025].
* Katwala, A. (no date) “The World Can’t Wean Itself Off Chinese Lithium”, *Wired*.
* Lithium Harvest (2025) *The Lithium Mining Market*. Available at: [https://lithiumharvest.com/](https://lithiumharvest.com/)... \[Accessed 13 May 2025].
* Lux, S. (2025) “China’s dominance in the battery supply chain”, Fraunhofer FFB.
* McKinsey & Company (2023) *Battery 2030: Resilient, sustainable, and circular*.
* Nguyen-Tien, V. et al. (2022) “Optimising the geospatial configuration of a future lithium-ion battery recycling industry…”, *Applied Energy*, 321, 119230.
* Onstad, E. (2025) “Energy storage boom drives battery shift, leaving nickel, cobalt behind”, *Reuters*, 21 May 2025.
* Reddy M.V. et al. (2020) “Brief History of Early Lithium-Battery Development”, *Materials (Basel)*, 13(8):1884.
* Sanchez-Lopez, M.D. (2023) “Geopolitics of the Li-ion battery value chain and the Lithium Triangle in South America”, *Latin American Policy*, 14(1):22–45.
* USGS (2022) *2022 Final List of Critical Minerals*. Department of the Interior.
* USGS (2025) *World Production Capacity for 7 Critical Minerals and Helium (2025–2029)*.
* Vega-Muratalla, V.O. et al. (2024) “Review of Lithium as a Strategic Resource for EV Battery Production…”, *Resources*, 13(11):148.








