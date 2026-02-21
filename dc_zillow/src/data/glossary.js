// Metric definitions for hover tooltips throughout the application
const glossary = {
  // Power & Capacity
  MW: {
    term: 'Megawatt (MW)',
    definition: 'A unit of electrical power equal to 1,000 kilowatts. In data centers, MW measures the total power capacity available for IT equipment and cooling. A 10 MW facility can power roughly 5,000–8,000 server racks.',
  },
  GW: {
    term: 'Gigawatt (GW)',
    definition: 'A unit of power equal to 1,000 megawatts. Used to measure total market-level data center capacity. 1 GW can power approximately 500,000 server racks.',
  },
  kW: {
    term: 'Kilowatt (kW)',
    definition: 'A unit of power equal to 1,000 watts. Data center rack density is often measured in kW per rack. A typical rack draws 7–15 kW; AI/ML racks can draw 30–70 kW.',
  },
  'kW/mo': {
    term: 'Rent ($/kW/month)',
    definition: 'The standard pricing unit for colocation data center space. Includes power, cooling, and physical space. Rates range from $80/kW/mo in low-cost markets to $300+/kW/mo in premium markets like Northern Virginia.',
  },
  availMW: {
    term: 'Available Capacity',
    definition: 'The amount of power capacity (in MW) currently available for new tenants. Low availability in a market signals supply tightness and potential pricing power for operators.',
  },
  totalMW: {
    term: 'Total Capacity',
    definition: 'The total power capacity of a facility or market, including both utilized and available space. This represents the maximum IT load the infrastructure can support.',
  },

  // Efficiency
  PUE: {
    term: 'Power Usage Effectiveness (PUE)',
    definition: 'The ratio of total facility power to IT equipment power. A PUE of 1.0 is perfect efficiency (impossible in practice). Industry average is ~1.58. Best-in-class facilities achieve 1.1–1.2. Lower PUE = less energy wasted on cooling and overhead.',
  },
  utilization: {
    term: 'Utilization Rate',
    definition: 'The percentage of total capacity currently in use. High utilization (>85%) signals strong demand but limited growth room. Low utilization (<60%) may indicate oversupply or new facility ramp-up.',
  },
  vacancy: {
    term: 'Vacancy Rate',
    definition: 'The percentage of total market capacity currently unoccupied. Below 5% is critical — expect 15-25% rent increases. 5-15% is tight. Above 20% favors tenants with negotiation leverage.',
  },

  // Sustainability
  renewable: {
    term: 'Renewable Energy %',
    definition: 'The percentage of facility power sourced from renewable energy (wind, solar, hydro). Increasingly required by enterprise tenants and ESG-focused investors. Top operators target 100% renewable.',
  },

  // Infrastructure
  liquidCooling: {
    term: 'Liquid Cooling',
    definition: 'Advanced cooling technology using liquid (water or specialized coolant) to remove heat directly from chips. Essential for high-density AI/ML workloads (>30kW/rack). More efficient than traditional air cooling by 30-50%.',
  },
  dgxReady: {
    term: 'DGX-Ready',
    definition: 'Facility is certified or equipped to host NVIDIA DGX systems (SuperPOD, BasePOD). Requires high power density (40-70 kW/rack), liquid cooling, high-speed networking (InfiniBand/RoCE), and reinforced floor loading.',
  },
  bandwidth: {
    term: 'Network Bandwidth (Gbps)',
    definition: 'Total network connectivity capacity in gigabits per second. Higher bandwidth enables faster data transfer and lower latency. Critical for cloud onramps and interconnection.',
  },
  racks: {
    term: 'Rack Count',
    definition: 'The number of server cabinet positions available. Standard racks are 42U (rack units) tall. Rack density varies from 7kW (standard) to 70kW+ (AI/GPU workloads).',
  },
  sqft: {
    term: 'Square Footage',
    definition: 'The total raised floor or white space area of the facility. Typical density is 150-200 watts per square foot for standard workloads, 300-500W/sqft for high-density AI.',
  },

  // Market Metrics
  avgRent: {
    term: 'Average Rent',
    definition: 'The average monthly colocation rate in $/kW/month for a market. Includes base rent for power, cooling, and space. Does not include cross-connects or managed services. Varies widely by market.',
  },
  powerCost: {
    term: 'Power Cost ($/kWh)',
    definition: 'The cost of electricity per kilowatt-hour in a market. The single largest operating expense for data centers (40-60% of OpEx). Ranges from $0.03/kWh (Quebec) to $0.12/kWh (Silicon Valley).',
  },
  powerQueue: {
    term: 'Power Queue (months)',
    definition: 'The average wait time to get new utility power connected in a market. Critical bottleneck — ranges from 6 months (Texas) to 48+ months (Northern Virginia). Drives build-vs-buy decisions.',
  },
  yoyGrowth: {
    term: 'Year-over-Year Growth',
    definition: 'The annual percentage increase in total market capacity. High growth markets (>30% YoY) signal strong demand. Northern Virginia leads globally at 38.2% YoY growth.',
  },
  underConstruction: {
    term: 'Under Construction (MW)',
    definition: 'New data center capacity currently being built in a market. High construction pipelines signal future supply relief but also validate market demand. Takes 18-36 months to deliver.',
  },
  tier: {
    term: 'Market Tier',
    definition: 'Classification of data center markets by maturity and scale. Tier 1: Established, liquid markets (NoVA, Dallas). Tier 2: Growing markets with strong fundamentals. Tier 3: Emerging markets, higher risk but potential first-mover advantage.',
  },

  // GPU Metrics
  TFLOPS: {
    term: 'TFLOPS (FP16)',
    definition: 'Tera Floating Point Operations Per Second at half precision (FP16). The primary measure of GPU compute performance for AI/ML training. Higher TFLOPS = faster model training. NVIDIA H100 delivers 1,979 TFLOPS.',
  },
  memory: {
    term: 'GPU Memory (GB)',
    definition: 'The amount of high-bandwidth memory on the GPU. Determines the maximum model size that can fit on a single GPU. Larger models (LLMs) require 80GB+ per GPU. HBM3e is the fastest current memory type.',
  },
  memType: {
    term: 'Memory Type',
    definition: 'The technology used for GPU memory. HBM3e is the latest, offering ~4.8 TB/s bandwidth. HBM3 offers ~3.35 TB/s. HBM2e is older at ~2 TB/s. Higher bandwidth = faster data feeding to compute cores.',
  },
  TDP: {
    term: 'Thermal Design Power (TDP)',
    definition: 'The maximum amount of heat (in watts) a GPU generates under full load. Determines cooling requirements and power density. AI GPUs range from 300W (A100) to 1000W (B200). Directly impacts data center design.',
  },
  MSRP: {
    term: 'Manufacturer Suggested Retail Price',
    definition: 'The list price for purchasing the GPU hardware. Actual street prices may vary. Enterprise pricing often includes volume discounts. Consider TCO including power, cooling, and rack space — not just MSRP.',
  },
  leadWeeks: {
    term: 'Lead Time (weeks)',
    definition: 'The estimated delivery time from order to receipt. High-demand GPUs (H100, B200) can have 20-36 week lead times. Longer lead times signal supply constraints and may justify cloud rental over purchase.',
  },
  cloudPricing: {
    term: 'Cloud $/hr',
    definition: 'The hourly rate to rent this GPU from a cloud provider (AWS, Azure, GCP, CoreWeave). Ranges reflect different providers and commitment levels. Reserved instances can be 40-60% cheaper than on-demand.',
  },

  // Financial / Capital
  revenue: {
    term: 'Annual Revenue',
    definition: 'Total annual revenue of the data center operator, typically from colocation, interconnection, and managed services. Used to compare operator scale and market position.',
  },
  marketCap: {
    term: 'Market Capitalization',
    definition: 'Total market value of a publicly-traded operator (share price × shares outstanding). Reflects investor sentiment about future growth. Data center REITs trade at premium multiples due to secular AI demand.',
  },
  revenuePerMW: {
    term: 'Revenue per MW',
    definition: 'Revenue generated per megawatt of capacity. Measures operator efficiency at monetizing infrastructure. Higher Rev/MW indicates premium pricing, better utilization, or higher-margin services.',
  },
  capex: {
    term: 'Capital Expenditure (CapEx)',
    definition: 'Total planned spending on new data center infrastructure. Hyperscalers collectively committed $405B+ in CapEx for 2025-2027. CapEx intensity drives demand for operators and construction firms.',
  },

  // Pipeline
  investment: {
    term: 'Project Investment',
    definition: 'Total capital committed to a data center construction project. Includes land, building, power infrastructure, cooling systems, and initial fit-out. Major campus projects can exceed $100B.',
  },
  completion: {
    term: 'Completion Timeline',
    definition: 'Expected delivery date for a construction project. Phase 1 typically delivers first, with full campus build-out over 3-7 years. Delays are common due to power interconnection and permitting.',
  },

  // Derived / Composite
  TCO: {
    term: 'Total Cost of Ownership',
    definition: 'The complete cost of operating in a market over time, including rent, power, network, and labor. TCO analysis across markets reveals 30-50% cost differences. Critical for multi-year deployment decisions.',
  },
  investmentScore: {
    term: 'Investment Score',
    definition: 'Composite score (0-100) rating market attractiveness for capital deployment. Weights: Growth (30%), Supply Tightness (25%), Power Cost (20%), Scale (15%), Sustainability (10%).',
  },
  operatorScore: {
    term: 'Operator Score',
    definition: 'Composite score (0-100) rating operator investment attractiveness. Weights: Efficiency/PUE (40%), Scale/Growth (25%), Sustainability (20%), Geographic Diversification (15%).',
  },
};

export default glossary;

export function getDefinition(key) {
  return glossary[key] || null;
}

export function getTerm(key) {
  return glossary[key]?.term || key;
}
