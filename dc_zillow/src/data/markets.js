export const markets = [
  { id: "nova", name: "Northern Virginia", country: "USA", tier: 1, totalMW: 5600, occupiedMW: 5560, availMW: 40, vacancy: 0.72, underConstruction: 2400, avgRent: 184, powerCost: 0.078, powerQueue: 36, yoyGrowth: 38, drivers: "Cloud, AI, Federal Government", renewable: 65, lat: 39.04, lng: -77.49 },
  { id: "dallas", name: "Dallas-Fort Worth", country: "USA", tier: 1, totalMW: 1500, occupiedMW: 1380, availMW: 120, vacancy: 8.0, underConstruction: 850, avgRent: 125, powerCost: 0.065, powerQueue: 18, yoyGrowth: 32, drivers: "Cloud, Enterprise, AI", renewable: 45, lat: 32.95, lng: -96.73 },
  { id: "silicon_valley", name: "Silicon Valley", country: "USA", tier: 1, totalMW: 1200, occupiedMW: 1080, availMW: 120, vacancy: 10.0, underConstruction: 180, avgRent: 250, powerCost: 0.185, powerQueue: 48, yoyGrowth: 42, drivers: "Tech HQs, AI/ML, Cloud", renewable: 85, lat: 37.34, lng: -121.89 },
  { id: "phoenix", name: "Phoenix", country: "USA", tier: 1, totalMW: 1400, occupiedMW: 1050, availMW: 350, vacancy: 25.0, underConstruction: 1300, avgRent: 115, powerCost: 0.072, powerQueue: 12, yoyGrowth: 45, drivers: "AI, Cloud, Hyperscale", renewable: 55, lat: 33.45, lng: -112.07 },
  { id: "chicago", name: "Chicago", country: "USA", tier: 1, totalMW: 1100, occupiedMW: 968, availMW: 132, vacancy: 12.0, underConstruction: 420, avgRent: 145, powerCost: 0.095, powerQueue: 24, yoyGrowth: 28, drivers: "Finance, Enterprise, Cloud", renewable: 48, lat: 41.88, lng: -87.63 },
  { id: "nyc", name: "New York / New Jersey", country: "USA", tier: 1, totalMW: 950, occupiedMW: 855, availMW: 95, vacancy: 10.0, underConstruction: 120, avgRent: 285, powerCost: 0.185, powerQueue: 36, yoyGrowth: 18, drivers: "Finance, Media, Enterprise", renewable: 35, lat: 40.79, lng: -74.06 },
  { id: "portland", name: "Portland / Hillsboro", country: "USA", tier: 2, totalMW: 820, occupiedMW: 574, availMW: 246, vacancy: 30.0, underConstruction: 380, avgRent: 95, powerCost: 0.048, powerQueue: 15, yoyGrowth: 52, drivers: "Hyperscale, AI (cheap power)", renewable: 95, lat: 45.53, lng: -122.99 },
  { id: "atlanta", name: "Atlanta", country: "USA", tier: 2, totalMW: 680, occupiedMW: 564, availMW: 116, vacancy: 17.0, underConstruction: 520, avgRent: 110, powerCost: 0.082, powerQueue: 18, yoyGrowth: 35, drivers: "Cloud, Enterprise, Media", renewable: 42, lat: 33.75, lng: -84.39 },
  { id: "vegas", name: "Las Vegas / Reno", country: "USA", tier: 2, totalMW: 1800, occupiedMW: 1440, availMW: 360, vacancy: 20.0, underConstruction: 680, avgRent: 105, powerCost: 0.068, powerQueue: 12, yoyGrowth: 48, drivers: "Hyperscale, AI, Gaming", renewable: 100, lat: 36.08, lng: -115.15 },
  { id: "london", name: "London / Slough", country: "UK", tier: 1, totalMW: 1100, occupiedMW: 990, availMW: 110, vacancy: 10.0, underConstruction: 280, avgRent: 320, powerCost: 0.245, powerQueue: 42, yoyGrowth: 22, drivers: "Finance, Cloud, Enterprise", renewable: 100, lat: 51.51, lng: -0.60 },
  { id: "frankfurt", name: "Frankfurt", country: "Germany", tier: 1, totalMW: 950, occupiedMW: 855, availMW: 95, vacancy: 10.0, underConstruction: 220, avgRent: 280, powerCost: 0.285, powerQueue: 36, yoyGrowth: 18, drivers: "Finance, DE-CIX, Cloud", renewable: 100, lat: 50.11, lng: 8.68 },
  { id: "amsterdam", name: "Amsterdam", country: "Netherlands", tier: 1, totalMW: 850, occupiedMW: 765, availMW: 85, vacancy: 10.0, underConstruction: 180, avgRent: 260, powerCost: 0.225, powerQueue: 48, yoyGrowth: 15, drivers: "Cloud, Content, Enterprise", renewable: 100, lat: 52.37, lng: 4.90 },
  { id: "singapore", name: "Singapore", country: "Singapore", tier: 1, totalMW: 750, occupiedMW: 720, availMW: 30, vacancy: 4.0, underConstruction: 85, avgRent: 450, powerCost: 0.185, powerQueue: 60, yoyGrowth: 25, drivers: "Cloud, Finance, APAC HQs", renewable: 5, lat: 1.35, lng: 103.82 },
  { id: "tokyo", name: "Tokyo", country: "Japan", tier: 1, totalMW: 1200, occupiedMW: 1080, availMW: 120, vacancy: 10.0, underConstruction: 320, avgRent: 380, powerCost: 0.195, powerQueue: 30, yoyGrowth: 22, drivers: "Enterprise, Cloud, Gaming", renewable: 25, lat: 35.68, lng: 139.65 },
  { id: "mumbai", name: "Mumbai", country: "India", tier: 2, totalMW: 450, occupiedMW: 360, availMW: 90, vacancy: 20.0, underConstruction: 380, avgRent: 165, powerCost: 0.095, powerQueue: 18, yoyGrowth: 55, drivers: "Cloud, Digital India, Enterprise", renewable: 35, lat: 19.08, lng: 72.88 },
  { id: "sydney", name: "Sydney", country: "Australia", tier: 2, totalMW: 520, occupiedMW: 442, availMW: 78, vacancy: 15.0, underConstruction: 180, avgRent: 285, powerCost: 0.165, powerQueue: 24, yoyGrowth: 28, drivers: "Cloud, Finance, Government", renewable: 55, lat: -33.87, lng: 151.21 },
];

export const gpus = [
  { id: "b200", name: "NVIDIA B200", arch: "Blackwell", gen: "Current", fp16: 2250, memory: 192, memType: "HBM3e", tdp: 1000, msrp: 40000, cloudLow: 4.50, cloudHigh: 6.50, leadWeeks: 52, avail: "Extremely Limited", useCase: "LLM Training, Frontier Models" },
  { id: "b100", name: "NVIDIA B100", arch: "Blackwell", gen: "Current", fp16: 1750, memory: 192, memType: "HBM3e", tdp: 700, msrp: 30000, cloudLow: 3.50, cloudHigh: 5.00, leadWeeks: 40, avail: "Limited", useCase: "LLM Training, Enterprise AI" },
  { id: "h200", name: "NVIDIA H200", arch: "Hopper", gen: "Previous", fp16: 1979, memory: 141, memType: "HBM3e", tdp: 700, msrp: 35000, cloudLow: 3.80, cloudHigh: 5.20, leadWeeks: 24, avail: "Moderate", useCase: "LLM Training, Large Model Inference" },
  { id: "h100_sxm", name: "NVIDIA H100 SXM", arch: "Hopper", gen: "Previous", fp16: 1979, memory: 80, memType: "HBM3", tdp: 700, msrp: 30000, cloudLow: 2.50, cloudHigh: 3.50, leadWeeks: 12, avail: "Good", useCase: "LLM Training, Fine-tuning, Inference" },
  { id: "h100_pcie", name: "NVIDIA H100 PCIe", arch: "Hopper", gen: "Previous", fp16: 1513, memory: 80, memType: "HBM3", tdp: 350, msrp: 25000, cloudLow: 2.00, cloudHigh: 2.85, leadWeeks: 8, avail: "Good", useCase: "Inference, Single-GPU Training" },
  { id: "a100_80", name: "NVIDIA A100 80GB", arch: "Ampere", gen: "Legacy", fp16: 624, memory: 80, memType: "HBM2e", tdp: 400, msrp: 15000, cloudLow: 1.15, cloudHigh: 2.21, leadWeeks: 4, avail: "Abundant", useCase: "Training, Inference, Fine-tuning" },
  { id: "mi300x", name: "AMD MI300X", arch: "CDNA 3", gen: "Current", fp16: 2610, memory: 192, memType: "HBM3", tdp: 750, msrp: 20000, cloudLow: 2.10, cloudHigh: 3.50, leadWeeks: 16, avail: "Limited", useCase: "LLM Training, Inference" },
  { id: "mi325x", name: "AMD MI325X", arch: "CDNA 3.5", gen: "Current", fp16: 3100, memory: 256, memType: "HBM3e", tdp: 800, msrp: 25000, cloudLow: 3.00, cloudHigh: 4.50, leadWeeks: 24, avail: "Very Limited", useCase: "LLM Training, Large Models" },
  { id: "l40s", name: "NVIDIA L40S", arch: "Ada Lovelace", gen: "Current", fp16: 366, memory: 48, memType: "GDDR6", tdp: 350, msrp: 12000, cloudLow: 1.20, cloudHigh: 1.80, leadWeeks: 6, avail: "Good", useCase: "Inference, Video AI, Graphics" },
];

export const constructionPipeline = [
  { name: "Stargate Abilene", developer: "Oracle/OpenAI/SoftBank", location: "Abilene, TX", investment: 100.0, capacityMW: 4500, start: "2025-Q1", completion: "2030+", status: "Announced", tenant: "OpenAI" },
  { name: "Vantage Frontier Texas", developer: "Vantage", location: "Dallas, TX", investment: 25.0, capacityMW: 1400, start: "2024-Q3", completion: "2027", status: "Under Construction", tenant: "Multiple hyperscalers" },
  { name: "Vantage Lighthouse WI", developer: "Vantage", location: "Port Washington, WI", investment: 15.0, capacityMW: 902, start: "2024-Q4", completion: "2028", status: "Under Construction", tenant: "Oracle" },
  { name: "Microsoft WI AI Factory", developer: "Microsoft", location: "Mount Pleasant, WI", investment: 3.3, capacityMW: 300, start: "2024-Q2", completion: "2026", status: "Under Construction", tenant: "Microsoft" },
  { name: "Meta Monroe LA", developer: "Meta", location: "Monroe, LA", investment: 10.0, capacityMW: 800, start: "2024-Q1", completion: "2027", status: "Under Construction", tenant: "Meta" },
  { name: "xAI Memphis Colossus 2", developer: "xAI (Musk)", location: "Memphis, TN", investment: 8.0, capacityMW: 1000, start: "2025-Q2", completion: "2026", status: "Planned", tenant: "xAI" },
  { name: "AWS Pennsylvania", developer: "AWS", location: "Pennsylvania", investment: 20.0, capacityMW: 1600, start: "2024-Q4", completion: "2028", status: "Announced", tenant: "AWS" },
];

export const hyperscalers = [
  { name: "Microsoft Azure", spend: 80, capex: 80, capacityMW: 8000, owned: 131, building: 111, color: "#00a4ef" },
  { name: "AWS", spend: 75, capex: 85, capacityMW: 7700, owned: 150, building: 100, color: "#ff9900" },
  { name: "Google Cloud", spend: 45, capex: 50, capacityMW: 5700, owned: 40, building: 25, color: "#4285f4" },
  { name: "Meta", spend: 38, capex: 65, capacityMW: 4600, owned: 25, building: 15, color: "#1877f2" },
  { name: "Oracle", spend: 12, capex: 25, capacityMW: 1250, owned: 45, building: 30, color: "#f80000" },
  { name: "OpenAI / Stargate", spend: 8, capex: 100, capacityMW: 500, owned: 0, building: 5, color: "#10a37f" },
];
