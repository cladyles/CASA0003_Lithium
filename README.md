# CASA0003 — Group 1  
## **Lithium Chain and Flow**  
*Interactive 3-D story-map: From Mines to an EV Revolution*

See video via link : https://liveuclac-my.sharepoint.com/personal/ucfnacb_ucl_ac_uk/_layouts/15/stream.aspx?id=%2Fpersonal%2Fucfnacb%5Fucl%5Fac%5Fuk%2FDocuments%2FGroup1%5Fdemonstration%5Fvideo%5FCASA0003%2Emp4&referrer=StreamWebApp%2EWeb&referrerScenario=AddressBarCopied%2Eview%2E28fba0bd%2D64a3%2D48a0%2Da0a7%2D16fa30c2858a 

---

## 1 · Overview
**Lithium Chain and Flow** is a purely client-side, scroll-narrative site that
reveals the global lithium-to-EV supply chain and its spatial dynamics.

| Stack |
|-------|
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


## Contributor

| Name            |
| --------------- | 
| **Han Guo**     |                        
| **Ximeng Chang**|                        
| **Yuhan Wang**  |                        
| **Yunqian Yao** |                        

---


## Reference

    AFSIC Investing in Africa, 2024. Understanding the Global Distribution of Minerals.
Available at: https://www.afsic.net/understanding-the-global-distribution-ofminerals/ [Accessed 22 May 2025].
    Carbon Credits, 2025. Lithium Market Insight 2025: Price Recovery, EV Demand,
and the Future of Extraction – Exclusive Interview. [online] Carbon Credits.
Available at: https://carboncredits.com/lithium-market-insight-2025-pricerecovery-ev-demand-and-the-future-of-extraction-exclusive-interview/
[Accessed 13 May 2025].
    Center for Strategic and International Studies (CSIS), 2025. South America’s Lithium Triangle: Opportunities for the Biden Administration.
[online] CSIS. Available at: https://www.csis.org/analysis/south-americas-lithium-triangleopportunities-biden-administration [Accessed 13 May 2025].
    European Commission, 2023. Critical Raw Materials Act and the 2023 List of Critical Raw Materials. Brussels: European Commission. Available at: https://singlemarket-economy.ec.europa.eu/sectors/raw-materials/areas-specificinterest/critical-raw-materials_en [Accessed 22 May 2025].
    Flash Battery, 2022. The history and evolution of lithium batteries. [online] Flash
Battery. Available at: https://www.flashbattery.tech/en/blog/history-evolutionlithium-batteries/ [Accessed 13 May 2025].
    Hendrickson, T.P. et al. (2015) ‘Life-cycle implications and supply chain logistics of
electric vehicle battery recycling in California’, Environmental Research
Letters, 10(1), p. 014011. Available at: https://doi.org/10.1088/1748-
9326/10/1/014011.
    International Energy Agency (IEA), 2024. Global Critical Minerals Outlook 2024.
Available at: https://www.iea.org/reports/global-critical-minerals-outlook2024 [Accessed 22 May 2025].
    International Energy Agency (IEA), 2025. Global Critical Minerals Outlook 2025 –
Executive Summary. Available at: https://www.iea.org/reports/global-criticalminerals-outlook-2025/executive-summary [Accessed 22 May 2025].
    Katwala, A. (no date) ‘The World Can’t Wean Itself Off Chinese Lithium’, Wired.
Available at: https://www.wired.com/story/china-lithium-mining-production/ (Accessed: 22 May 2025).
    Lithium Harvest, 2025. The Lithium Mining Market. [online] Lithium Harvest.
38 Available at: https://lithiumharvest.com/knowledge/lithium/the-lithiummining-market/ [Accessed 13 May 2025].
    Lux, S. (2025) China’s dominance in the battery supply chain, Fraunhofer Research
Institution for Battery Cell Production FFB. Available at:
https://www.ffb.fraunhofer.de/en/press/news/Chinas_Dominanz_in_der_Batter
ielieferkette.html (Accessed: 22 May 2025).
    McKinsey & Company, 2023. Battery 2030: Resilient, sustainable, and circular.
[online] McKinsey & Company. Available at: https://www.mckinsey.com/industries/automotive-and-assembly/ourinsights/battery-2030-resilient-sustainable-and-circular [Accessed 13 May 2025].
    Nguyen-Tien, V. et al. (2022) ‘Optimising the geospatial configuration of a future
lithium ion battery recycling industry in the transition to electric vehicles and a circular economy’, Applied Energy, 321, p. 119230. Available at:
https://doi.org/10.1016/j.apenergy.2022.119230.
    Onstad, E. (2025) ‘Energy storage boom drives battery shift, leaving nickel, cobalt behind’, Reuters, 21 May. Available at:
https://www.reuters.com/business/energy/energy-storage-boom-drives-batteryshift-leaving-nickel-cobalt-behind-2025-05-21/ (Accessed: 22 May 2025).
    Reddy MV, Mauger A, Julien CM, Paolella A, Zaghib K. Brief History of Early Lithium-Battery Development. Materials (Basel). 2020 Apr 17;13(8):1884.
doi: 10.3390/ma13081884. PMID: 32316390; PMCID: PMC7215417. IEA
(2024), Lithium, IEA, Paris https://www.iea.org/reports/lithium, Licence: CC BY 4.0
    Sanchez-Lopez, M.D. (2023) ‘Geopolitics of the Li-ion battery value chain and the
Lithium Triangle in South America’, Latin American Policy, 14(1), pp. 22–45. Available at: https://doi.org/10.1111/lamp.12285.
    U.S. Geological Survey (USGS), 2022. 2022 Final List of Critical Minerals. Department of the Interior. Available at: https://www.usgs.gov/news/nationalnews/usgs-releases-2022-list-critical-minerals [Accessed 22 May 2025].
    U.S. Geological Survey, 2025. USGS Projects World Production Capacity for 7 Critical Minerals and Helium from 2025 to 2029. [online] U.S. Geological
Survey. Available at: https://www.usgs.gov/news/national-news-release/usgsprojects-world-production-capacity-7-critical-minerals-and-helium [Accessed
13 May 2025].







