
        mapboxgl.accessToken = 'pk.eyJ1IjoieGltZW5nMDExNiIsImEiOiJjbTdhZGNwbzMwMzd1MmtzOG9ua2J0Znk0In0.vuk8t1UfOhoH46nE0AL2WQ';
        const map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/dark-v11',
            projection:"mercator",
            center: [0, 20],
            zoom: 1.5,
            pitch:0,
            bearing:0
        });
    
        let flowsData = [];      // Preservation of bilateral flows
        // Highlight country-related variables
        let highlightedCountry = null;
        let data = [], centroids = {}, currentYear = 2023, mode = 'Export', currentCountry = 'World';
      
        let isPlaying = false;
        let animationFrameId = null;
        const playDelay = 1200; 

        // 2007 ~ 2024
        const playYears = Array.from(
        { length: 2024 - 2007 + 1 },
        (_, i) => 2007 + i
    );
    
 
    let playIndex = playYears.indexOf(currentYear) !== -1
    ? playYears.indexOf(currentYear)
    : 0;

  
    let lastTimestamp = null;

    let baciData = [];    // Reporter/Year/value/quantity

        //alias table
        const nameAlias = {
            "Bolivia (Plurinational State of)":  "Bolivia",
            "Bosnia Herzegovina":                "Bosnia and Herzegovina",
            "Cayman Isds":                       "Cayman Islands",
            "Central African Rep.":              "Central African Republic",
            "China, Hong Kong SAR":              "China",
            "China, Macao SAR":                  "China",
            "Curaçao":                           "Curacao",
            "Czechia":                           "Czech Republic",
            "Dem. Rep. of the Congo":            "Congo DRC",
            "Dominican Rep.":                    "Dominican Republic",
            "FS Micronesia":                     "Micronesia",
            "Faeroe Isds":                       "Faroe Islands",
            "Lao People's Dem. Rep.":            "Laos",
            "Mayotte (Overseas France)":         "Mayotte",
            "Rep. of Korea":                     "South Korea",
            "Rep. of Moldova":                   "Moldova",
            "Solomon Isds":                      "Solomon Islands",
            "State of Palestine":                "Palestinian Territory",
            "Sudan (...2011)":                   "Sudan",
            "Turks and Caicos Isds":             "Turks and Caicos Islands",
            "Türkiye":                           "Turkey",
            "USA":                               "United States",
            "United Rep. of Tanzania":           "Tanzania",
            "Viet Nam":                          "Vietnam"
        };

        // Full ISO 3166-1 alpha-3 code mapping
        const isoCodeMap = {
             "Afghanistan": "AFG",
             "Albania": "ALB",
             "Algeria": "DZA",
             "Andorra": "AND",
             "Angola": "AGO",
             "Antigua and Barbuda": "ATG",
             "Argentina": "ARG",
             "Armenia": "ARM",
             "Aruba": "ABW",
             "Australia": "AUS",
             "Austria": "AUT",
             "Azerbaijan": "AZE",
             "Bahamas": "BHS",
             "Bahrain": "BHR",
             "Bangladesh": "BGD",
             "Barbados": "BRB",
             "Belarus": "BLR",
             "Belgium": "BEL",
             "Belize": "BLZ",
             "Benin": "BEN",
             "Bermuda": "BMU",
             "Bhutan": "BTN",
             "Bolivia": "BOL",
             "Bosnia and Herzegovina": "BIH",
             "Botswana": "BWA",
             "Brazil": "BRA",
             "Brunei Darussalam": "BRN",
             "Bulgaria": "BGR",
             "Burkina Faso": "BFA",
             "Burundi": "BDI",
             "Cabo Verde": "CPV",
             "Cambodia": "KHM",
             "Cameroon": "CMR",
             "Canada": "CAN",
             "Central African Republic": "CAF",
             "Chad": "TCD",
             "Chile": "CHL",
             "China": "CHN",
             "Colombia": "COL",
             "Comoros": "COM",
             "Congo": "COG",
             "Congo DRC": "COD",
             "Costa Rica": "CRI",
             "Côte d'Ivoire": "CIV",
             "Croatia": "HRV",
             "Curacao": "CUW",
             "Cyprus": "CYP",
             "Czech Republic": "CZE",
             "Denmark": "DNK",
             "Djibouti": "DJI",
             "Ecuador": "ECU",
             "Egypt": "EGY",
             "El Salvador": "SLV",
             "Equatorial Guinea": "GNQ",
             "Eritrea": "ERI",
             "Estonia": "EST",
             "Eswatini": "SWZ",
             "Ethiopia": "ETH",
             "Faroe Islands": "FRO",
             "Fiji": "FJI",
             "Finland": "FIN",
             "France": "FRA",
             "Gabon": "GAB",
             "Gambia": "GMB",
             "Georgia": "GEO",
             "Germany": "DEU",
             "Ghana": "GHA",
             "Greece": "GRC",
             "Grenada": "GRD",
             "Guatemala": "GTM",
             "Guinea": "GIN",
             "Guinea-Bissau": "GNB",
             "Guyana": "GUY",
             "Haiti": "HTI",
             "Honduras": "HND",
             "Hungary": "HUN",
             "Iceland": "ISL",
             "India": "IND",
             "Indonesia": "IDN",
             "Iran (Islamic Rep. of)": "IRN",
             "Iraq": "IRQ",
             "Ireland": "IRL",
             "Israel": "ISR",
             "Italy": "ITA",
             "Jamaica": "JAM",
             "Japan": "JPN",
             "Jordan": "JOR",
             "Kazakhstan": "KAZ",
             "Kenya": "KEN",
             "Kiribati": "KIR",
             "Kuwait": "KWT",
             "Kyrgyzstan": "KGZ",
             "Laos": "LAO",
             "Latvia": "LVA",
             "Lebanon": "LBN",
             "Lesotho": "LSO",
             "Liberia": "LBR",
             "Libya": "LBY",
             "Lithuania": "LTU",
             "Luxembourg": "LUX",
             "Madagascar": "MDG",
             "Malawi": "MWI",
             "Malaysia": "MYS",
             "Maldives": "MDV",
             "Mali": "MLI",
             "Malta": "MLT",
             "Mauritania": "MRT",
             "Mauritius": "MUS",
             "Mexico": "MEX",
             "Micronesia": "FSM",
             "Moldova": "MDA",
             "Monaco": "MCO",
             "Mongolia": "MNG",
             "Montenegro": "MNE",
             "Morocco": "MAR",
             "Mozambique": "MOZ",
             "Myanmar": "MMR",
             "Namibia": "NAM",
             "Nepal": "NPL",
             "Netherlands": "NLD",
             "New Caledonia": "NCL",
             "New Zealand": "NZL",
             "Nicaragua": "NIC",
             "Niger": "NER",
             "Nigeria": "NGA",
             "North Macedonia": "MKD",
             "Norway": "NOR",
             "Oman": "OMN",
             "Pakistan": "PAK",
             "Palestinian Territory": "PSE",
             "Panama": "PAN",
             "Papua New Guinea": "PNG",
             "Paraguay": "PRY",
             "Peru": "PER",
             "Philippines": "PHL",
             "Poland": "POL",
             "Portugal": "PRT",
             "Qatar": "QAT",
             "South Korea": "KOR",
             "Republic of Kosovo": "XKX",
             "Romania": "ROU",
             "Russian Federation": "RUS",
             "Rwanda": "RWA",
             "Saint Kitts and Nevis": "KNA",
             "Saint Lucia": "LCA",
             "Saint Vincent and the Grenadines": "VCT",
             "Saudi Arabia": "SAU",
             "Senegal": "SEN",
             "Serbia": "SRB",
             "Sierra Leone": "SLE",
             "Singapore": "SGP",
             "Slovak Republic": "SVK",
             "Slovenia": "SVN",
             "Solomon Islands": "SLB",
             "South Africa": "ZAF",
             "South Sudan": "SSD",
             "Spain": "ESP",
             "Sri Lanka": "LKA",
             "Sudan": "SDN",
             "Suriname": "SUR",
             "Sweden": "SWE",
             "Switzerland": "CHE",
             "Syrian Arab Republic": "SYR",
             "Tanzania": "TZA",
             "Thailand": "THA",
             "Timor-Leste": "TLS",
             "Togo": "TGO",
             "Trinidad and Tobago": "TTO",
             "Tunisia": "TUN",
             "Turkey": "TUR",
             "Turkmenistan": "TKM",
             "Turks and Caicos Islands": "TCA",
             "Tuvalu": "TUV",
             "Uganda": "UGA",
             "Ukraine": "UKR",
             "United Arab Emirates": "ARE",
             "United Kingdom": "GBR",
             "United States": "USA",
             "Uruguay": "URY",
             "Uzbekistan": "UZB",
             "Vanuatu": "VUT",
             "Venezuela (Bolivarian Republic of)": "VEN",
             "Vietnam": "VNM",
             "Yemen": "YEM",
             "Zambia": "ZMB",
             "Zimbabwe": "ZWE",
             "European Union": "EUU",
             "World": ""
            };
            
            // Reverse mapping of country names to ISO codes
            const isoToNameMap = {};
            Object.keys(isoCodeMap).forEach(name => {
                isoToNameMap[isoCodeMap[name]] = name;
            });
            
             //Country-border sources using mapboxes
             map.on('load', () => {
                // Adding a source for national borders
                map.addSource('country-boundaries', {
                    type: 'vector',
                    url: 'mapbox://mapbox.country-boundaries-v1'
                });
                map.addSource('radial-lines',{
                    type:'geojson',
                    data:{
                        type:'FeatureCollection',
                        features:[]
                    },
                    lineMetrics: true
                });

                // Adding a Highlight Layer
                map.addLayer({
                    id: 'country-highlight',
                    type: 'fill',
                    source: 'country-boundaries',
                    'source-layer': 'country_boundaries',
                    paint: {
                        'fill-color': 'orange', 
                        'fill-opacity': 0.5,
                        'fill-outline-color': 'orange'
                    },
                    filter: ['==', 'iso_3166_1_alpha_3', '']
                });

                 // Adding a radioactive line layer
                 map.addLayer({
                    id: 'radial-lines',
                    type: 'line',
                    source: 'radial-lines',
                    layout: {
                        'line-cap': 'round',
                        'line-join': 'round'
                    },
                    paint: {
                        'line-gradient': [           
                        'interpolate',
                        ['linear'],
                        ['line-progress'],
                        0,   'rgba(255, 165, 0, 0)',  
                        0.3, 'orange',                
                        1,   'orange'                 
                        ],
                        'line-width': [
                            'interpolate',
                            ['linear'],
                            ['line-progress'],
                            0,1, 
                            0.3,3, 
                            1,3 
                        ],
                        'line-opacity': 0.9
                    }
                });
                
                // Add a transparent pointable layer for all countries
                map.addLayer({
                    id: 'country-click',
                    type: 'fill',
                    source: 'country-boundaries',
                    'source-layer': 'country_boundaries',
                    paint: {
                        'fill-opacity': 0    
                        }
                    });
                
                
                Promise.all([
                // Lithium summary
                fetch('https://raw.githubusercontent.com/ximengchang-ucl/CASA0003-Group1/main/lithium_summary.json')
                .then(r => r.json()),
                //  National Centre for Longitude and Latitude
                fetch('https://raw.githubusercontent.com/ximengchang-ucl/CASA0003-Group1/main/country_centroids.json')
                .then(r => r.json()),
                // Bilateral flows (radial use)
                fetch('https://raw.githubusercontent.com/ximengchang-ucl/CASA0003-Group1/main/BACI_HS12_2012-2023_V202501_fixed.csv')
                .then(r => r.text())
                .then(txt => d3.csvParse(txt)),
                // BACI 2012-2023 statistics (pop-up use)
                fetch('https://raw.githubusercontent.com/ximengchang-ucl/CASA0003-Group1/main/BACI_HS12_2012-2023_V202501_fixed.csv')
                .then(r => r.text())
                .then(txt => d3.csvParse(txt))
            ])
            .then(([tradeData, centroidData, flowsParsed, baciParsed]) => {
                // original assignment
                data      = tradeData;
                centroids = centroidData;
                flowsData = flowsParsed;

                // Correct assignment of baciData
                baciData = baciParsed.map(d => ({
                    Reporter: d.Reporter,
                    Year:     +d.Year,
                    value:    +d.value,
                    quantity: +d.quantity
                }));

                // initialisation
                populateYearMenu();
                populateCountryMenu();
                updateMap();
                drawBarChart(data);
                setupEventListeners();
            });
        });
        
            //read more&read less
            function toggleReadMore() {
                const moreContent = document.getElementById('more-content');
                const link = document.querySelector('.info-block a');
                if (moreContent.style.display === 'none') {
                     moreContent.style.display = 'block';
                     link.textContent = 'Read less...';
                    } else {
                        moreContent.style.display = 'none';
                        link.textContent = 'Read more...';
                    }
                }

                window.addEventListener('DOMContentLoaded', () => {
                    // Cache zoom in/out control nodes
                    const zoomControls = document.getElementById('zoom-controls');
                    const exportBtn    = document.getElementById('exportBtn');
                    const importBtn    = document.getElementById('importBtn');
                    const zoomInBtn    = document.getElementById('zoom-in');
                    const zoomOutBtn   = document.getElementById('zoom-out');

                    //Toggle control colours according to mode
                    function updateZoomControls() {
                        zoomControls.className = mode.toLowerCase();  // 'export' or 'import'
                    }

                    // Bind zoom in/out operations
                    zoomInBtn.addEventListener('click', () => map.zoomIn({ duration: 300 }));
                    zoomOutBtn.addEventListener('click', () => map.zoomOut({ duration: 300 }));

                    // The mode-switching buttons only retain this set of onclick
                    exportBtn.onclick = () => {
                        mode = 'Export';
                        exportBtn.classList.add('active');
                        importBtn.classList.remove('active');
                        document.getElementById('trade-value').className = 'export';
                        updateMap();
                        drawBarChart(data);
                        updatePlayButtonColor();
                        if (currentCountry !== 'World') {
                            drawRadialLines(currentCountry);
                        }
                        updateZoomControls();  // Switch to yellow 
                    };

                    importBtn.onclick = () => {
                        mode = 'Import';
                        importBtn.classList.add('active');
                        exportBtn.classList.remove('active');
                        document.getElementById('trade-value').className = 'import';
                        updateMap();
                        drawBarChart(data);
                        updatePlayButtonColor();
                        if (currentCountry !== 'World') {
                            drawRadialLines(currentCountry);
                        }
                        updateZoomControls();  // Switch to blue
                    };

                    // Set the theme once when the page first loads
                    updateZoomControls();
                });
                // China button highlighting logic 
                const chinaBtn = document.getElementById('china-btn');
                chinaBtn.addEventListener('click', () => {
                    currentCountry = 'China';
                    document.getElementById('country-title').textContent = 'China';
                    drawRadialLines('China');
                    const c = centroids['China'];
                    if (c) map.flyTo({ center: [c[1], c[0]], zoom: 2 });
                });
            
    function setupEventListeners() {
        // Click on the radial lines to highlight the target country
        map.on('click', 'radial-lines', (e) => {
        if (e.features && e.features.length > 0) {
            const clickedFeature = e.features[0];
            const targetIso = clickedFeature.properties.targetIso;
            const highlightColor = clickedFeature.properties.color;
            
            // Highlight the country of the clicked line
            map.setPaintProperty('country-highlight', 'fill-color', highlightColor);
            map.setPaintProperty('country-highlight', 'fill-outline-color', highlightColor);
            map.setFilter('country-highlight', ['==', 'iso_3166_1_alpha_3', targetIso]);
            highlightedCountry = [targetIso];
            
            // Fly to target country
            const targetName = clickedFeature.properties.target;
            const coords = centroids[nameAlias[targetName] || targetName];
            if (coords) {
                map.flyTo({
                    center: [coords[1], coords[0]],
                    zoom: 2
                });
            }
        }
    });

    // Click on other areas of the map to clear highlighting
    map.on('click', (e) => {
        if (!e.features || !e.features.some(f => f.layer.id === 'radial-lines')) {
            if (highlightedCountry) {
                map.setFilter('country-highlight', ['==', 'iso_3166_1_alpha_3', '']);
                highlightedCountry = null;
            }
        }
    });

    // Mouse Interaction Effect
    map.on('mouseenter', 'radial-lines', () => {
        map.getCanvas().style.cursor = 'pointer';
    });

    map.on('mouseleave', 'radial-lines', () => {
        map.getCanvas().style.cursor = '';
    });
        // 2023 data pop-up when clicking on any country
        map.on('click', 'country-click', (e) => {
        if (!e.features.length) return;
        const iso3 = e.features[0].properties.iso_3166_1_alpha_3;
        const countryName = isoToNameMap[iso3] || iso3;

        // Filter all records for the country in 2023
        const recs = baciData.filter(d => d.Reporter === countryName && d.Year === 2023);

        let html;
        if (recs.length) {
            const totalValue    = d3.sum(recs, r => r.value);
            const totalQuantity = d3.sum(recs, r => r.quantity);
            html = `<strong>${countryName} (2023)</strong><br>
                    Value: $${totalValue.toLocaleString()}<br>
                    Quantity: ${totalQuantity.toLocaleString()}`;
        } else {
            html = `<strong>${countryName} (2023)</strong><br>No data available`;
        }

        // Popup at the clicked position
        new mapboxgl.Popup({ closeButton: true, closeOnClick: true })
            .setLngLat(e.lngLat)
            .setHTML(html)
            .addTo(map);
    });

    // Mouseover to show clickable style
    map.on('mouseenter', 'country-click', () => {
        map.getCanvas().style.cursor = 'pointer';
    });
    map.on('mouseleave', 'country-click', () => {
        map.getCanvas().style.cursor = '';
    });
    
}

        function populateYearMenu() {
            const yearMenu = document.getElementById('year-menu');
            for (let year = 2007; year <= 2024; year++) {
                const option = document.createElement('a');
                option.textContent = year;
                option.addEventListener('click', () => {
                    currentYear = year;
                    document.getElementById('year-title').textContent = year;
                    yearMenu.style.display = 'none';
                    updateMap();
                    drawBarChart(data);
                });
                yearMenu.appendChild(option);
            }
            const yearArrow = document.getElementById('year-arrow');
            yearArrow.addEventListener('click', () => {
                const display = yearMenu.style.display === 'block' ? 'none' : 'block';
                yearMenu.style.display = display;
                document.getElementById('country-menu').style.display = 'none';
            });
        }

        function populateCountryMenu() {
            const countryMenu = document.getElementById('country-menu');
            const countries = new Set(['World']);
            data.forEach(item => {
                countries.add(item.reporterDesc);
            });
            const countryArray = Array.from(countries);
            countryArray.forEach(country => {
                const option = document.createElement('a');
                option.textContent = country;
                option.addEventListener('click', () => {
                    currentCountry = country;
                    document.getElementById('country-title').textContent = country;
                    countryMenu.style.display = 'none';
                    updateMap();
                    drawBarChart(data);
                   
                    if (country !== 'World') {
                        const lookup = nameAlias[country] || country;
                        const coords = centroids[lookup];   
                        if (coords) {
                            map.flyTo({ center: [coords[1], coords[0]], zoom: 4 });
                        }
                        drawRadialLines(country);
                    }else{
                        
                        map.setFilter('country-highlight',['==','iso_3166_1_alpha_3','']);
                        highlightedCountry = null;
                        
                        map.flyTo({
                            center: [0, 20],   
                            zoom: 1.5,
                            pitch: 0,
                            bearing: 0
                        });
                    }
                });
                countryMenu.appendChild(option);
        });
        const countryArrow = document.getElementById('country-arrow');
        countryArrow.addEventListener('click', () => {
            const display = countryMenu.style.display === 'block' ? 'none' : 'block';
            countryMenu.style.display = display;
            document.getElementById('year-menu').style.display = 'none';
        });
    }

        function updatePlayButtonColor() {
            const btn = document.getElementById("play-button");
            if (mode === 'Export') {
                btn.classList.remove("import");
            } else {
                btn.classList.add("import");
            }
        }

        document.getElementById('exportBtn').onclick = () => {
            mode = 'Export';
            document.getElementById('exportBtn').classList.add('active');
            document.getElementById('importBtn').classList.remove('active');
            document.getElementById('trade-value').className = 'export';
            updateMap();
            drawBarChart(data);
            updatePlayButtonColor();
           
            if (currentCountry !== 'World') {
                drawRadialLines(currentCountry);
            }
        };

        document.getElementById('importBtn').onclick = () => {
            mode = 'Import';
            document.getElementById('importBtn').classList.add('active');
            document.getElementById('exportBtn').classList.remove('active');
            document.getElementById('trade-value').className = 'import';
            updateMap();
            drawBarChart(data);
            updatePlayButtonColor();
            
            if (currentCountry !== 'World') {
                drawRadialLines(currentCountry);
            }
        };

        document.getElementById('play-button').onclick = () => {
            const btn = document.getElementById('play-button');
            btn.onclick = () => {
                if (!isPlaying) {
                    // If the last round has just finished, reset to the beginning.
                    if (playIndex >= playYears.length) {
                        playIndex = 0;
                    }
                    // Start or continue playback
                    isPlaying = true;
                    btn.innerHTML = '<span class="pause-icon"><span></span><span></span></span>';
                    lastTimestamp = null;

                    function step(timestamp) {
                        if (!isPlaying) return;
                        if (lastTimestamp === null) lastTimestamp = timestamp;
                        const elapsed = timestamp - lastTimestamp;
                        if (elapsed >= playDelay && playIndex < playYears.length) {
                            currentYear = playYears[playIndex++];
                            document.getElementById('year-title').textContent = currentYear;
                            updateMap();
                            drawBarChart(data);
                            if (currentCountry !== 'World') drawRadialLines(currentCountry);
                            lastTimestamp = timestamp;
                        }

                        if (playIndex < playYears.length) {
                            animationFrameId = requestAnimationFrame(step);
                        } else {
                            //Automatically stops and resumes after broadcasting one round ▶
                            isPlaying = false;
                            btn.textContent = '\u25B6';
                        }
                    }

                    animationFrameId = requestAnimationFrame(step);
                } else {
                    // pause
                    isPlaying = false;
                    btn.textContent = '\u25B6';
                    if (animationFrameId !== null) cancelAnimationFrame(animationFrameId);
                }
            }
        };

        function drawBarChart(data) {
            const svg = d3.select("#bar-chart");
            const margin = { top: 10, right: 10, bottom: 20, left: 10 };
            const width = +svg.attr("width") - margin.left - margin.right;
            const height = +svg.attr("height") - margin.top - margin.bottom;
            const years = [];
            for (let year = 2007; year <= 2024; year++) {
                years.push(year);
            }

            const yearlyData = years.map(y => ({
                year: y,
                value: d3.sum(data.filter(d => d.refYear === y), d => d[mode] || 0)
            }));

            const x = d3.scaleBand().domain(years).range([0, width]).padding(0.1);
            const y = d3.scaleLinear()
            .domain([0, d3.max(yearlyData, d => d.value)]).nice()
            .range([height, 0]);

            
            if (svg.selectAll("rect").empty()) {
                svg.append("g")
                .attr("transform", `translate(0,${height})`)
                .call(d3.axisBottom(x).tickValues(years.filter((d, i) => i % 2 === 0)))
                .selectAll("text").attr("font-size", "8px");
                
                svg.selectAll("rect")
                .data(yearlyData)
                .enter()
                .append("rect")
                .attr("x", d => x(d.year))
                .attr("width", x.bandwidth())
                .attr("y", d => y(d.value))
                .attr("height", d => height - y(d.value))
                .attr("fill", d => getBarColor(d.year));
            } else {
                
                svg.selectAll("rect")
                .data(yearlyData)
                .transition()
                .duration(600)
                .attr("fill", d => getBarColor(d.year)) 
                .filter(d => d.year === currentYear)
                .attr("y", d => y(d.value))
                .attr("height", d => height - y(d.value));
            }

            function getBarColor(year) {
                if (year === currentYear) {
                    return mode === "Export" ? "orange" : "#3498db";
                } else {
                    return mode === "Export" ? "#ffc966" : "#6fb6e9";
                }
            }
        }

        function updateMap() {
            if (!map.getLayer('country-highlight')) return;
            // 1. Filtering data - based on current year and selected country
            let filtered = data.filter(d => d.refYear === currentYear);
            if (currentCountry !== 'World') {
                filtered = filtered.filter(d => d.reporterDesc === currentCountry);
            }

            // Total first
            const tradeSum = filtered.reduce((acc, d) => acc + (d[mode] || 0), 0);
            // Getting the display container
            const tradeValueDiv = document.getElementById('trade-value');
            // If 0, add ‘Data missing’ to the description.
            if (tradeSum === 0) {
                tradeValueDiv.innerHTML = `${mode} Total:<br>0 (Data missing)`;
            } else {
                tradeValueDiv.innerHTML = `${mode} Total:<br>$${tradeSum.toLocaleString()}`;
            }
    
            // 2. Clear all existing markings
            document.querySelectorAll('.mapboxgl-marker').forEach(el => el.remove());

            // 3. Updated map markers
            if (currentCountry === 'World') {
                map.setFilter('country-highlight', ['==', 'iso_3166_1_alpha_3', '']);
                if (map.getSource('radial-lines')) {
                    map.getSource('radial-lines').setData({
                        type: 'FeatureCollection',
                        features: []
                    });
                }

                // World view - shows all countries
                const allCountries = new Set(data.map(item => item.reporterDesc));
        
                allCountries.forEach(country => {
                    const lookup = nameAlias[country] || country;
                    const coords = centroids[lookup];
                    if (!coords || coords[0] == null || coords[1] == null) return;

            // Total value of the country's trade
            const countryData = filtered.filter(d => d.reporterDesc === country);
            const value = countryData.reduce((acc, d) => acc + (d[mode] || 0), 0);

            if (value > 0) {  
                const radius = Math.sqrt(value) / 500;
                const color = mode === 'Export' ? 'orange' : '#3498db';

                const el = document.createElement('div');
                el.className = 'circle';
                el.style.width = el.style.height = `${radius * 2}px`;
                el.style.borderColor = color;
                el.style.opacity = 0.7;

                new mapboxgl.Marker(el)
                   .setLngLat([coords[1], coords[0]])
                   .addTo(map);
            }
        });
        
        // Remove country highlighting and radioactive lines
        map.setFilter('country-highlight', ['==', 'iso_3166_1_alpha_3', '']);
        const radialSource = map.getSource('radial-lines');
        if (radialSource) {
            radialSource.setData({
                type: 'FeatureCollection',
                features: []
            });
        }
    } else {
        // Individual country view
        const hasEntry = filtered.length > 0;
        
        // Adding a trading partner tag
        filtered.forEach(d => {
            const lookup = nameAlias[d.reporterDesc] || d.reporterDesc;
            const coords = centroids[lookup];
            if (!coords || coords[0] == null || coords[1] == null) return;

            const value = d[mode] || 0;
            if (value > 0) {  
                const radius = Math.sqrt(value) / 500;
                const color = mode === 'Export' ? 'orange' : '#3498db';

                const el = document.createElement('div');
                el.className = 'circle';
                el.style.width = el.style.height = `${radius * 2}px`;
                el.style.borderColor = color;
                el.style.opacity = 0.7;
                
                new mapboxgl.Marker(el)
               .setLngLat([coords[1], coords[0]])
               .addTo(map);
            }
        });

        // Highlighting the current country and drawing radioactive lines
        if (currentCountry !== 'World') {
            drawRadialLines(currentCountry);
        
        //  Flying to selected countries
        const lookup = nameAlias[currentCountry] || currentCountry;
        const coords = centroids[lookup];
        if (coords) {
            map.flyTo({
                center: [coords[1], coords[0]],
                zoom: 2
            });
        }
    }
}
        }
        
        // The drawRadialLines function highlights the target countries.
        function drawRadialLines(country) {
            if (!map.getLayer('country-highlight') || !map.getLayer('radial-lines')) {
                console.error('Layer not loaded, please wait');
                return;
            }

            // Get current country ISO code
            const lookup = nameAlias[country] || country;
            const isoCode = isoCodeMap[lookup];
            
            if (!isoCode) {
                console.error('Can not find the ISO code for the country:', country);
                return;
            }

            // Setting the highlight colour
            const lineColor = mode === 'Export' ? 'orange' : '#3498db';
            const transparentColor = mode === 'Export' ? 'rgba(255, 165, 0, 0)' : 'rgba(52, 152, 219, 0)';

            //Setting the highlighted country colour
            map.setPaintProperty('country-highlight', 'fill-color', lineColor);
            map.setPaintProperty('country-highlight', 'fill-outline-color', lineColor);
    

            // Preparation of radiological line data and list of target countries
            const features = [];
            const targetIsos = [isoCode]; 
    
            const centerLookup = nameAlias[country] || country;
            const centerCoords = centroids[centerLookup];
            
            if (!centerCoords) {
                console.error('Can not find the centre of the countrys coordinates:', country);
                return;
            }

            //Generate line data
            flowsData.forEach(d => {
                if (+d.Year !== currentYear) return;

                const isExport = mode === 'Export' && d.Reporter === country;
                const isImport = mode === 'Import' && d.Partner === country;
                if (!isExport && !isImport) return;
        
                const otherCountry = isExport ? d.Partner : d.Reporter;
                const normalizedName = nameAlias[otherCountry] || otherCountry;
                const coords = centroids[normalizedName];
                const targetIso = isoCodeMap[normalizedName];
        
                if (!coords || !targetIso) {
                    console.warn('Lack of data for target countries:', normalizedName, {
                        coords: !!coords,
                        isoCode: !!targetIso
                    });
                    return;
                }
                
                features.push({
                    type: 'Feature',
                    properties: {
                        color: lineColor,
                        target: normalizedName,
                        targetIso: targetIso,
                        value: +d.Value
                    },
                    geometry: {
                        type: 'LineString',
                        coordinates: [
                            [centerCoords[1], centerCoords[0]],
                            [coords[1], coords[0]]
                        ]
                    }
                });
        
                // Add to the list of target countries (de-emphasis)
                if (!targetIsos.includes(targetIso)) {
                    targetIsos.push(targetIso);
                }
            });

            // Highlight all target countries (current country + connecting countries)
            map.setFilter('country-highlight', ['in', 'iso_3166_1_alpha_3', ...targetIsos]);
            highlightedCountry = targetIsos;

            // Update of radioline data
            const radialSource = map.getSource('radial-lines');
            if (radialSource) {
                radialSource.setData({
                    type: 'FeatureCollection',
                    features: features
                });

                // Update line styles for gradient effects
                map.setPaintProperty('radial-lines', 'line-gradient', [
                    'interpolate',
                    ['linear'],
                    ['line-progress'],
                    0, mode === 'Export' ? 'rgba(255,165,0,0)' : 'rgba(52,152,219,0)',
                    0.3, lineColor,
                    1, lineColor
                ]);
                map.setPaintProperty('radial-lines', 'line-opacity', 0.9);
                map.setPaintProperty('radial-lines', 'line-width', [
                    'interpolate',
                    ['linear'],
                    ['line-progress'],
                    0,1,
                    0.3,3,
                    1,3
                ]);

                console.log(`highlighted ${targetIsos.length} countries, mapping ${features.length} radioactive fallout`);
            } else {
                console.error('Can not find radial-lines data source');
            }
        }
        
        // Sidebar slider logic 
        const sidebar   = document.getElementById('sidebar');
        const toggleBtn = document.getElementById('sidebar-toggle');
        toggleBtn.addEventListener('click', () => {
            sidebar.classList.toggle('collapsed');
            toggleBtn.classList.toggle('collapsed');
        });
    
    