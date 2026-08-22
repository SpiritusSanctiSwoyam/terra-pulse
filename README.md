# 🌍 Terra Pulse

### PS-08: Disaster Intelligence — ML Rapid Damage Assessment

**[🔗 View Live Demo on Vercel](https://disaster-intelligence-one.vercel.app)**

Terra Pulse is a satellite-derived rapid damage assessment platform designed to cut disaster relief response times from days to hours. It combines a live Machine Learning pipeline with an interactive React dashboard to give first responders immediate, prioritized situational awareness during natural disasters.

---

## 🚀 The Solution

During natural disasters like floods and wildfires, response is often delayed because damage assessments rely on slow, manual field surveys or scattered satellite analysis.

Terra Pulse automates this by:
1. **Ingesting Real Satellite Data**: Connecting directly to the Microsoft Planetary Computer STAC API to pull Sentinel-2 L2A imagery (Green & NIR bands).
2. **Change Detection (NDWI)**: Running an automated Normalized Difference Water Index (NDWI) pixel-differencing algorithm across over 1.1 million pixels to detect flood inundation.
3. **Smart Prioritization**: Classifying damage severity and combining it with population density and critical infrastructure data through a weighted scoring engine (`0.4×sev + 0.35×pop + 0.15×infra`).
4. **Actionable Intelligence**: Displaying the results on a beautiful, mobile-responsive Leaflet map where relief coordinators can seamlessly compare pre/post disaster states and deploy teams to the highest-priority zones.

---

## 🛠 Tech Stack

**Frontend Dashboard (Kunal)**
- React + Vite
- React Leaflet (Geospatial Mapping & Clustering)
- Lucide React (Icons)
- Vercel (Production Deployment)

**Data / ML Pipeline (Swoyam)**
- Python
- `rasterio` & `numpy` (GeoTIFF pixel math & manipulation)
- `pystac-client` & `planetary-computer` (Satellite ingestion)
- Flask (Local API serving)

---

## ⚙️ How to Run Locally

### 1. Run the ML Pipeline
Ensure you have Python installed, then install the dependencies and execute the pipeline to fetch satellite imagery and run the change-detection models:
```bash
pip install pystac-client planetary-computer rasterio rioxarray numpy flask flask-cors
python3 pipeline/run_all.py
```
*This will fetch real TIFs from Assam, compute NDWI, prioritize, and generate `severity_grid.json`.*

*(Optional) Start the local Python API server:*
```bash
python3 pipeline/server.py
```

### 2. Run the React Dashboard
```bash
npm install
npm run dev
```
Open `http://localhost:5173` in your browser.

---

## 👥 The Team
- **Swoyam** — Data / ML Pipeline (Satellite ingestion, NDWI computation, severity classification, priority scoring engine)
- **Kunal** — Dashboard / Frontend (Interactive map, sidebar UI, architecture design, data integration, bug fixing, Vercel deployment)
