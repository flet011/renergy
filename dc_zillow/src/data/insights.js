import { facilities, operators } from './facilities';
import { markets, gpus, constructionPipeline, hyperscalers } from './markets';

// ── HELPERS ────────────────────────────────────────────────────────

function pct(a, b) { return ((a / b) * 100).toFixed(1); }
function fmt(n) { return n.toLocaleString(); }

// ── SUPPLY-SIDE INSIGHTS ───────────────────────────────────────────

export function getSupplyInsights(operatorId) {
  const insights = [];
  const avgMarketRent = markets.reduce((s, m) => s + m.avgRent, 0) / markets.length;
  const totalCapex = hyperscalers.reduce((s, h) => s + h.capex, 0);

  // 1. Hyperscaler demand wave
  insights.push({
    id: 'hyper-demand-wave',
    type: 'opportunity',
    urgency: 'critical',
    title: `$${totalCapex}B Hyperscaler CapEx Wave Incoming`,
    metric: `$${totalCapex}B`,
    metricLabel: '2025 Announced CapEx',
    description: `${hyperscalers.length} hyperscalers have committed $${totalCapex}B in data center CapEx. At $11M/MW construction cost, this translates to ~${Math.round(totalCapex * 1000 / 11)} GW of new demand. 40-60% typically flows to third-party colocation — your opportunity window.`,
    action: 'Position for hyperscaler RFPs immediately. Ensure liquid cooling, DGX-Ready certification, and 50+ MW contiguous blocks available.',
    impact: `$${Math.round(totalCapex * 0.5 * 0.03)}B potential commission revenue at 3% take rate`,
  });

  // 2. Tight market pricing power
  const tightMarkets = markets.filter(m => m.vacancy < 10).sort((a, b) => a.vacancy - b.vacancy);
  tightMarkets.forEach(m => {
    const premium = Math.round((m.avgRent / avgMarketRent - 1) * 100);
    insights.push({
      id: `pricing-${m.id}`,
      type: 'opportunity',
      urgency: m.vacancy < 3 ? 'critical' : 'high',
      title: `${m.name}: ${m.vacancy}% Vacancy = Maximum Pricing Power`,
      metric: `$${m.avgRent}/kW/mo`,
      metricLabel: `${premium > 0 ? premium + '% above' : Math.abs(premium) + '% below'} avg`,
      description: `Only ${m.availMW} MW available in a ${fmt(m.totalMW)} MW market. Demand growing ${m.yoyGrowth}% YoY with ${m.powerQueue}-month power queue creating structural supply constraint. ${m.underConstruction > 0 ? `${fmt(m.underConstruction)} MW under construction won't deliver for 18-36 months.` : ''}`,
      action: `Raise lease rates 10-15% for new deals. Current market supports $${Math.round(m.avgRent * 1.12)}-$${Math.round(m.avgRent * 1.15)}/kW/mo. Prioritize 3+ year commitments to lock in revenue.`,
      impact: `+$${Math.round(m.availMW * m.avgRent * 0.12 * 12 / 1000)}K annual revenue per MW repriced`,
    });
  });

  // 3. Expansion opportunities
  const growthMarkets = [...markets].filter(m => m.vacancy > 15 && m.yoyGrowth > 30).sort((a, b) => b.yoyGrowth - a.yoyGrowth);
  growthMarkets.forEach(m => {
    insights.push({
      id: `expand-${m.id}`,
      type: 'expansion',
      urgency: 'medium',
      title: `${m.name}: ${m.yoyGrowth}% Growth + Cheap Power = Greenfield Play`,
      metric: `+${m.yoyGrowth}%`,
      metricLabel: 'YoY demand growth',
      description: `${m.name} combines ${m.yoyGrowth}% demand growth, $${m.powerCost}/kWh power (${Math.round((1 - m.powerCost / 0.185) * 100)}% cheaper than SV), and ${m.vacancy}% vacancy signaling room to build. ${fmt(m.underConstruction)} MW under construction confirms market thesis. ${m.renewable}% renewable energy available.`,
      action: `Evaluate 50-100 MW greenfield in ${m.name}. Land acquisition + permitting takes 12-18 months — move now to capture the growth curve.`,
      impact: `100 MW campus at $${m.avgRent}/kW/mo = $${Math.round(100 * 1000 * m.avgRent * 12 / 1e6)}M annual revenue at full occupancy`,
    });
  });

  // 4. Competitive intelligence
  const bestPue = Math.min(...facilities.map(f => f.pue));
  const bestOperator = facilities.find(f => f.pue === bestPue);
  insights.push({
    id: 'competitive-efficiency',
    type: 'risk',
    urgency: 'high',
    title: `Efficiency Arms Race: Best-in-Class PUE is ${bestPue}`,
    metric: bestPue.toFixed(2),
    metricLabel: `PUE (${bestOperator?.operator})`,
    description: `${bestOperator?.operator} achieves ${bestPue} PUE — the industry benchmark. AI workloads at 40-100 kW/rack make cooling efficiency existential. Tenants increasingly require PUE < 1.3 and liquid cooling. Operators above 1.4 risk losing AI contracts entirely.`,
    action: 'Invest in liquid cooling retrofits for existing facilities. All new builds should target PUE < 1.25. This is not optional for AI workloads.',
    impact: 'PUE 1.4 → 1.25 saves ~$2.4M/yr per 100 MW in power costs',
  });

  // 5. Operator-specific portfolio analysis
  if (operatorId) {
    const op = operators.find(o => o.id === operatorId);
    const opFac = facilities.filter(f => f.operator === op?.name);
    if (op && opFac.length > 0) {
      const avgPue = opFac.reduce((s, f) => s + f.pue, 0) / opFac.length;
      const avgUtil = opFac.reduce((s, f) => s + f.util, 0) / opFac.length;
      const totalAvail = opFac.reduce((s, f) => s + f.availMW, 0);
      const totalCap = opFac.reduce((s, f) => s + f.totalMW, 0);
      const avgRenewable = opFac.reduce((s, f) => s + f.renewable, 0) / opFac.length;
      const metros = [...new Set(opFac.map(f => f.metro))];

      // Portfolio overview
      insights.unshift({
        id: 'portfolio-overview',
        type: 'portfolio',
        urgency: avgUtil > 93 ? 'critical' : 'medium',
        title: `${op.name} Portfolio: ${avgUtil.toFixed(1)}% Utilized, ${totalAvail.toFixed(1)} MW Available`,
        metric: `${totalAvail.toFixed(1)} MW`,
        metricLabel: `available across ${opFac.length} facilities`,
        description: `${opFac.length} tracked facilities totaling ${fmt(totalCap)} MW across ${metros.length} metros (${metros.join(', ')}). Portfolio PUE: ${avgPue.toFixed(2)}. Renewable: ${avgRenewable.toFixed(0)}%. ${avgUtil > 92 ? 'Running near capacity — expansion critical.' : 'Room to lease additional capacity.'}`,
        action: avgUtil > 92
          ? `With ${avgUtil.toFixed(1)}% utilization, prioritize new construction and capacity upgrades. Every month at >93% means turning away revenue.`
          : `Market ${totalAvail.toFixed(1)} MW to AI startups (10-50 kW) and mid-market enterprise (100-500 kW). These segments close faster than hyperscaler deals.`,
        impact: `${totalAvail.toFixed(1)} MW at market avg $${Math.round(avgMarketRent)}/kW/mo = $${Math.round(totalAvail * 1000 * avgMarketRent * 12 / 1e6)}M annual revenue opportunity`,
      });

      // Sustainability gap
      if (avgRenewable < 90) {
        insights.push({
          id: 'sustainability-gap',
          type: 'risk',
          urgency: avgRenewable < 75 ? 'critical' : 'high',
          title: `Sustainability Gap: ${avgRenewable.toFixed(0)}% Renewable vs 90% Threshold`,
          metric: `${avgRenewable.toFixed(0)}%`,
          metricLabel: 'renewable energy',
          description: `Microsoft, Google, and Meta require 90%+ renewable energy commitments. Your portfolio at ${avgRenewable.toFixed(0)}% excludes you from ${Math.round((1 - avgRenewable / 100) * 100)}% of hyperscaler RFPs. Switch and Equinix already at 96-100%.`,
          action: 'Negotiate renewable PPAs and purchase RECs to reach 90% within 6 months. Each 10% improvement unlocks ~$${Math.round(totalCap * 0.1 * avgMarketRent * 12 / 1e6)}M in addressable demand.',
          impact: `Reaching 90% renewable unlocks an estimated $${Math.round(totalCap * (0.9 - avgRenewable / 100) * avgMarketRent * 12 / 1e6)}M in previously inaccessible deals`,
        });
      }
    }
  }

  return insights;
}

// ── SUPPLY KPIs ────────────────────────────────────────────────────

export function getSupplyKPIs(operatorId) {
  if (!operatorId) {
    const totalAvail = facilities.reduce((s, f) => s + f.availMW, 0);
    const totalCap = facilities.reduce((s, f) => s + f.totalMW, 0);
    const avgUtil = facilities.reduce((s, f) => s + f.util, 0) / facilities.length;
    return [
      { label: 'Total Market Capacity', value: `${(totalCap / 1000).toFixed(1)} GW`, sub: `${facilities.length} facilities`, trend: 'up' },
      { label: 'Available Now', value: `${totalAvail.toFixed(0)} MW`, sub: `${pct(totalAvail, totalCap)}% vacancy`, trend: 'down' },
      { label: 'Avg Utilization', value: `${avgUtil.toFixed(1)}%`, sub: 'across all facilities', trend: 'up' },
      { label: 'Revenue Opportunity', value: `$${Math.round(totalAvail * 184 * 12 / 1e6)}M`, sub: 'annual at market rates', trend: 'up' },
    ];
  }
  const op = operators.find(o => o.id === operatorId);
  const opFac = facilities.filter(f => f.operator === op?.name);
  const totalAvail = opFac.reduce((s, f) => s + f.availMW, 0);
  const totalCap = opFac.reduce((s, f) => s + f.totalMW, 0);
  const avgUtil = opFac.reduce((s, f) => s + f.util, 0) / opFac.length;
  const avgPue = opFac.reduce((s, f) => s + f.pue, 0) / opFac.length;
  const avgRent = markets.reduce((s, m) => s + m.avgRent, 0) / markets.length;
  return [
    { label: 'Your Capacity', value: `${totalCap.toLocaleString()} MW`, sub: `${opFac.length} facilities`, trend: 'neutral' },
    { label: 'Available to Lease', value: `${totalAvail.toFixed(1)} MW`, sub: `${pct(totalAvail, totalCap)}% vacant`, trend: totalAvail > 20 ? 'down' : 'up' },
    { label: 'Avg Utilization', value: `${avgUtil.toFixed(1)}%`, sub: `PUE: ${avgPue.toFixed(2)}`, trend: avgUtil > 92 ? 'up' : 'neutral' },
    { label: 'Revenue Potential', value: `$${Math.round(totalAvail * 1000 * avgRent * 12 / 1e6)}M/yr`, sub: 'on available capacity', trend: 'up' },
  ];
}

// ── DEMAND-SIDE INSIGHTS ───────────────────────────────────────────

export function getDemandInsights(needs) {
  const insights = [];
  const { targetMW = 10 } = needs || {};

  // 1. Cost optimization — market comparison
  const sortedByRent = [...markets].sort((a, b) => a.avgRent - b.avgRent);
  const cheapest = sortedByRent[0];
  const expensive = sortedByRent[sortedByRent.length - 1];
  const savings = ((expensive.avgRent - cheapest.avgRent) / expensive.avgRent * 100).toFixed(0);

  insights.push({
    id: 'cost-optimization',
    type: 'savings',
    urgency: 'high',
    title: `Save ${savings}% by Choosing ${cheapest.name} Over ${expensive.name}`,
    metric: `$${cheapest.avgRent} vs $${expensive.avgRent}`,
    metricLabel: 'per kW/mo',
    description: `For ${targetMW} MW, ${cheapest.name} saves $${fmt(Math.round((expensive.avgRent - cheapest.avgRent) * targetMW * 1000 * 12))}/year vs ${expensive.name}. ${cheapest.name} offers: $${cheapest.powerCost}/kWh power, ${cheapest.vacancy}% vacancy (negotiation leverage), and ${cheapest.powerQueue}-month power queue. ${cheapest.renewable}% renewable energy.`,
    action: `Request quotes from 3+ operators in ${cheapest.name}. With ${cheapest.vacancy}% vacancy, you have 15-20% negotiation room on published rates.`,
    impact: `$${fmt(Math.round((expensive.avgRent - cheapest.avgRent) * targetMW * 1000 * 12))} annual savings`,
  });

  // 2. Urgency — tight markets
  const critical = markets.filter(m => m.vacancy < 5);
  if (critical.length > 0) {
    const m = critical[0];
    insights.push({
      id: 'urgency-nova',
      type: 'timing',
      urgency: 'critical',
      title: `${m.name}: Lock In Now or Wait ${m.powerQueue} Months`,
      metric: `${m.vacancy}%`,
      metricLabel: 'vacancy rate',
      description: `${m.name} has only ${m.availMW} MW available in a ${fmt(m.totalMW)} MW market. Power queue is ${m.powerQueue} months. Demand growing ${m.yoyGrowth}% YoY. If you need capacity here, the window is closing — every month of delay risks 5-8% price increase.`,
      action: `Sign LOI within 30 days for any ${m.name} capacity need. Secure backup options in Dallas ($${markets.find(mm => mm.id === 'dallas')?.avgRent}/kW) or Phoenix ($${markets.find(mm => mm.id === 'phoenix')?.avgRent}/kW).`,
      impact: `Waiting 6 months could cost $${Math.round(targetMW * 1000 * m.avgRent * 0.08 * 12)}/yr in rate increases`,
    });
  }

  // 3. Negotiation leverage — high vacancy markets
  const leverageMarkets = markets.filter(m => m.vacancy > 20).sort((a, b) => b.vacancy - a.vacancy);
  if (leverageMarkets.length > 0) {
    const best = leverageMarkets.slice(0, 3);
    insights.push({
      id: 'negotiation-leverage',
      type: 'savings',
      urgency: 'high',
      title: `Maximum Negotiation Leverage: ${best.map(m => m.name).join(', ')}`,
      metric: `${best[0].vacancy}%`,
      metricLabel: `vacancy in ${best[0].name}`,
      description: `Markets with >20% vacancy give you 15-25% pricing power. ${best.map(m => `${m.name} (${m.vacancy}% vacant, $${m.avgRent}/kW)`).join('; ')}. Operators here are hungry for tenants — use this to negotiate multi-year rate locks, free build-outs, and SLA credits.`,
      action: `Lead negotiations with 3 operators per market. Reference competitive bids to drive prices 15-20% below published rates. Demand: free cross-connects, waived setup fees, and 99.999% uptime SLAs.`,
      impact: `20% rate reduction on ${targetMW} MW = $${fmt(Math.round(targetMW * 1000 * best[0].avgRent * 0.2 * 12))} annual savings`,
    });
  }

  // 4. GPU strategy
  const bestValue = [...gpus].filter(g => g.avail !== 'Extremely Limited')
    .map(g => ({ ...g, valueScore: g.fp16 / ((g.cloudLow + g.cloudHigh) / 2) }))
    .sort((a, b) => b.valueScore - a.valueScore);

  if (bestValue.length > 0) {
    const top = bestValue[0];
    const premium = bestValue.find(g => g.id === 'b200') || bestValue[0];
    insights.push({
      id: 'gpu-value',
      type: 'savings',
      urgency: 'medium',
      title: `Best GPU Value: ${top.name} at ${top.valueScore.toFixed(0)} TFLOPS/$`,
      metric: `${top.valueScore.toFixed(0)}`,
      metricLabel: 'TFLOPS per $/hr',
      description: `${top.name} delivers ${top.fp16.toLocaleString()} FP16 TFLOPS at $${top.cloudLow.toFixed(2)}-$${top.cloudHigh.toFixed(2)}/hr — the best performance per dollar available. Compare: ${premium.name} offers ${premium.fp16.toLocaleString()} TFLOPS but at $${premium.cloudLow.toFixed(2)}-$${premium.cloudHigh.toFixed(2)}/hr (${Math.round(((premium.cloudHigh + premium.cloudLow) / 2) / ((top.cloudHigh + top.cloudLow) / 2) * 100 - 100)}% premium).`,
      action: `Use ${top.name} for training workloads. Reserve ${top.leadWeeks}-week lead time. For inference, consider ${gpus.find(g => g.id === 'l40s')?.name || 'L40S'} at $${gpus.find(g => g.id === 'l40s')?.cloudLow || '1.20'}/hr — inference doesn't need frontier compute.`,
      impact: `Switching to ${top.name} from premium GPU saves ~$${Math.round(((premium.cloudHigh - top.cloudHigh) * 8760 * 8) / 1000)}K/yr per 8-GPU node`,
    });
  }

  // 5. Build vs Buy
  const avgConstructionCost = 11.3; // $M per MW
  const avgRent = markets.reduce((s, m) => s + m.avgRent, 0) / markets.length;
  const breakEvenYears = (avgConstructionCost * 1e6 / (avgRent * 1000 * 12)).toFixed(1);
  insights.push({
    id: 'build-vs-buy',
    type: 'strategy',
    urgency: 'medium',
    title: `Build vs Collocate: Break-Even at ${breakEvenYears} Years`,
    metric: `${breakEvenYears} yrs`,
    metricLabel: 'break-even point',
    description: `At $${avgConstructionCost}M/MW construction cost and $${Math.round(avgRent)}/kW/mo average rent, building your own facility breaks even at ${breakEvenYears} years. Add 18-24 months for permitting and construction. For needs <5 years, colocation is almost always cheaper. Above 7 years, consider building.`,
    action: targetMW >= 50
      ? `At ${targetMW} MW, explore build-to-suit with operators like STACK, Aligned, or Vantage. They build to your spec with 7-10 year leases.`
      : `At ${targetMW} MW, colocation is optimal. Focus on multi-site deployments for redundancy.`,
    impact: `${targetMW} MW build cost: $${Math.round(targetMW * avgConstructionCost)}M upfront vs $${Math.round(targetMW * 1000 * avgRent * 12 / 1e6)}M/yr colocation`,
  });

  // 6. Power cost arbitrage
  const cheapPower = [...markets].sort((a, b) => a.powerCost - b.powerCost).slice(0, 3);
  insights.push({
    id: 'power-arbitrage',
    type: 'savings',
    urgency: 'medium',
    title: `Power Cost Arbitrage: $${cheapPower[0].powerCost}/kWh in ${cheapPower[0].name}`,
    metric: `$${cheapPower[0].powerCost}`,
    metricLabel: 'per kWh',
    description: `AI training is power-intensive. The cheapest power markets: ${cheapPower.map(m => `${m.name} ($${m.powerCost}/kWh)`).join(', ')}. At 10 MW 24/7, annual power cost difference between cheapest ($${cheapPower[0].powerCost}) and most expensive ($${markets.sort((a, b) => b.powerCost - a.powerCost)[0].powerCost}) is $${fmt(Math.round((markets.sort((a, b) => b.powerCost - a.powerCost)[0].powerCost - cheapPower[0].powerCost) * 10000 * 8760))}.`,
    action: `Route non-latency-sensitive workloads (batch training, data processing) to ${cheapPower[0].name}. Keep inference in ${cheapPower[0].name === 'Portland / Hillsboro' ? 'NoVA or Chicago' : 'proximity to users'}.`,
    impact: `$${fmt(Math.round((0.185 - cheapPower[0].powerCost) * targetMW * 1000 * 8760))} annual power savings vs Silicon Valley`,
  });

  return insights;
}

// ── DEMAND KPIs ────────────────────────────────────────────────────

export function getDemandKPIs() {
  const totalAvail = markets.reduce((s, m) => s + m.availMW, 0);
  const cheapest = [...markets].sort((a, b) => a.avgRent - b.avgRent)[0];
  const avgLead = Math.round(gpus.filter(g => g.avail === 'Good' || g.avail === 'Abundant').reduce((s, g) => s + g.leadWeeks, 0) / gpus.filter(g => g.avail === 'Good' || g.avail === 'Abundant').length);
  const marketsWithCapacity = markets.filter(m => m.vacancy > 10).length;

  return [
    { label: 'Capacity Available', value: `${fmt(totalAvail)} MW`, sub: `across ${markets.length} markets`, trend: 'neutral' },
    { label: 'Best Rate', value: `$${cheapest.avgRent}/kW`, sub: cheapest.name, trend: 'down' },
    { label: 'GPU Lead Time', value: `${avgLead} wks`, sub: 'for available models', trend: 'down' },
    { label: 'Markets With Room', value: marketsWithCapacity, sub: '>10% vacancy', trend: 'neutral' },
  ];
}

// ── CAPITAL-SIDE INSIGHTS ──────────────────────────────────────────

export function getCapitalInsights() {
  const insights = [];
  const totalPipelineInv = constructionPipeline.reduce((s, p) => s + p.investment, 0);
  const totalCapex = hyperscalers.reduce((s, h) => s + h.capex, 0);

  // 1. Market thesis — structural demand
  insights.push({
    id: 'structural-demand',
    type: 'thesis',
    urgency: 'critical',
    title: `$${totalCapex}B CapEx Committed — Generational Infrastructure Build`,
    metric: `$${totalCapex}B`,
    metricLabel: '2025 hyperscaler CapEx',
    description: `This is the largest infrastructure investment cycle since the railroad era. ${hyperscalers.map(h => `${h.name}: $${h.capex}B`).join(', ')}. AI compute demand is growing 50%+ annually. Every 1% of this spend that flows to third-party operators = $${(totalCapex * 0.01).toFixed(1)}B market opportunity.`,
    action: 'Overweight data center infrastructure. This is a multi-decade structural trend, not a cycle. The $3T build-out is just beginning.',
    impact: `${totalCapex}B CapEx ÷ $11M/MW = ~${Math.round(totalCapex * 1000 / 11)} GW of new demand through 2030`,
  });

  // 2. Best markets for investment
  const scored = markets.map(m => ({
    ...m,
    score: (m.yoyGrowth * 2) + ((100 - m.vacancy) * 0.5) + (1 / m.powerCost * 10) - (m.powerQueue * 0.5),
    riskAdjusted: m.yoyGrowth / (m.vacancy || 1) * (1 / m.powerCost),
  })).sort((a, b) => b.score - a.score);

  const topMarkets = scored.slice(0, 3);
  insights.push({
    id: 'best-markets',
    type: 'opportunity',
    urgency: 'high',
    title: `Top Investment Markets: ${topMarkets.map(m => m.name).join(', ')}`,
    metric: '#1',
    metricLabel: topMarkets[0].name,
    description: topMarkets.map(m =>
      `${m.name}: ${m.yoyGrowth}% growth, $${m.avgRent}/kW rent, $${m.powerCost}/kWh power, ${m.powerQueue}mo queue, ${m.vacancy}% vacancy, ${fmt(m.underConstruction)} MW pipeline`
    ).join('. ') + '.',
    action: `Focus capital deployment in ${topMarkets[0].name} (highest growth-adjusted returns). ${topMarkets[0].name} combines high demand growth with ${topMarkets[0].vacancy > 15 ? 'available capacity for development' : 'tight supply supporting premium pricing'}.`,
    impact: `100 MW investment in ${topMarkets[0].name} at $11M/MW = $1.1B deployed, $${Math.round(100 * 1000 * topMarkets[0].avgRent * 12 / 1e6)}M annual revenue`,
  });

  // 3. Concentration risk
  const stargate = constructionPipeline.find(p => p.name.includes('Stargate'));
  if (stargate) {
    const pctOfPipeline = ((stargate.investment / totalPipelineInv) * 100).toFixed(0);
    insights.push({
      id: 'concentration-risk',
      type: 'risk',
      urgency: 'high',
      title: `Pipeline Concentration: Stargate = ${pctOfPipeline}% of Tracked Investment`,
      metric: `${pctOfPipeline}%`,
      metricLabel: 'single-project concentration',
      description: `Stargate (Oracle/OpenAI/SoftBank) at $${stargate.investment}B represents ${pctOfPipeline}% of the $${totalPipelineInv.toFixed(0)}B tracked pipeline. ${stargate.capacityMW.toLocaleString()} MW in ${stargate.location}. This is the single largest data center project ever announced. If delayed or scaled back, it impacts total market growth projections significantly.`,
      action: `Diversify exposure across multiple projects and developers. Monitor OpenAI revenue milestones and SoftBank financing commitments quarterly. Consider hedging with positions in multi-tenant REITs (Equinix, Digital Realty).`,
      impact: 'Portfolio impact if Stargate delayed 2 years: -15% on total pipeline delivery timeline',
    });
  }

  // 4. Operator valuation comparison
  const publicOps = operators.filter(o => o.ticker);
  if (publicOps.length > 0) {
    const opAnalysis = publicOps.map(o => {
      const opFac = facilities.filter(f => f.operator === o.name);
      const avgPue = opFac.length > 0 ? opFac.reduce((s, f) => s + f.pue, 0) / opFac.length : 1.4;
      const revenuePerMW = o.revenue * 1e9 / (o.totalMW * 1000);
      return { ...o, avgPue, revenuePerMW, efficiency: 1 / avgPue };
    }).sort((a, b) => b.revenuePerMW - a.revenuePerMW);

    insights.push({
      id: 'operator-valuation',
      type: 'opportunity',
      urgency: 'medium',
      title: `Operator Scorecard: ${opAnalysis[0].name} Leads on Revenue/MW`,
      metric: `$${Math.round(opAnalysis[0].revenuePerMW)}/kW`,
      metricLabel: 'revenue per kW',
      description: opAnalysis.map(o =>
        `${o.name} (${o.ticker}): $${o.stockPrice}/share, $${o.marketCap}B mkt cap, $${o.revenue}B rev, PUE ${o.avgPue.toFixed(2)}, ${o.renewable}% renewable, ${o.facilities} facilities`
      ).join('. ') + '.',
      action: `${opAnalysis[1]?.name || 'Digital Realty'} offers better value: lower PUE, NVIDIA AI Factory partnership, and lower valuation multiple. Consider overweighting vs ${opAnalysis[0].name}.`,
      impact: `${opAnalysis[1]?.name || 'DLR'} at current price offers ~10-15% upside to fair value based on AFFO growth`,
    });
  }

  // 5. Renewable energy alpha
  const greenMarkets = markets.filter(m => m.renewable >= 90).sort((a, b) => b.yoyGrowth - a.yoyGrowth);
  insights.push({
    id: 'esg-alpha',
    type: 'thesis',
    urgency: 'medium',
    title: `ESG Alpha: Green Markets Growing ${greenMarkets[0]?.yoyGrowth || 30}%+ Faster`,
    metric: `${greenMarkets.length}`,
    metricLabel: 'markets with 90%+ renewable',
    description: `${greenMarkets.length} markets offer 90%+ renewable energy: ${greenMarkets.map(m => `${m.name} (${m.renewable}%, +${m.yoyGrowth}% growth)`).join(', ')}. Corporate sustainability mandates are funneling demand to green markets. This is not a trend — it's a requirement.`,
    action: `Prioritize investments in green markets. ${greenMarkets[0]?.name || 'Portland'} offers the best combination of renewables and growth. Avoid markets below 50% renewable for new investments.`,
    impact: 'Green-certified facilities command 8-12% rent premiums and attract higher-quality tenants',
  });

  // 6. M&A landscape
  insights.push({
    id: 'ma-thesis',
    type: 'opportunity',
    urgency: 'medium',
    title: 'M&A Window: Mid-Market Operators Are Acquisition Targets',
    metric: `$167.6B`,
    metricLabel: 'recent DC M&A deal value',
    description: `The DC market is consolidating. Blackstone acquired QTS for $10B. KKR invested in CyrusOne. GIP/Brookfield taking Digital Realty private was rumored. Mid-market operators (STACK, Aligned, CoreSite) with strong markets and modern facilities are prime targets. Operator count will halve within 5 years.`,
    action: 'Build positions in mid-market operators before M&A premium. Focus on operators with: <1.30 PUE, liquid cooling, and presence in top-3 growth markets.',
    impact: 'M&A premiums in DC sector averaging 25-40% over trailing 12-month enterprise value',
  });

  return insights;
}

// ── CAPITAL KPIs ───────────────────────────────────────────────────

export function getCapitalKPIs() {
  const totalPipelineInv = constructionPipeline.reduce((s, p) => s + p.investment, 0);
  const totalCapex = hyperscalers.reduce((s, h) => s + h.capex, 0);
  const totalMarketMW = markets.reduce((s, m) => s + m.totalMW, 0);
  const avgGrowth = (markets.reduce((s, m) => s + m.yoyGrowth, 0) / markets.length).toFixed(0);

  return [
    { label: 'Hyperscaler CapEx', value: `$${totalCapex}B`, sub: '2025 committed', trend: 'up' },
    { label: 'Pipeline Tracked', value: `$${totalPipelineInv.toFixed(0)}B`, sub: `${constructionPipeline.length} projects`, trend: 'up' },
    { label: 'Global Capacity', value: `${(totalMarketMW / 1000).toFixed(1)} GW`, sub: `${markets.length} markets`, trend: 'up' },
    { label: 'Avg Market Growth', value: `+${avgGrowth}%`, sub: 'YoY demand', trend: 'up' },
  ];
}

// ── SHARED UTILITIES ───────────────────────────────────────────────

export function getMarketComparison(marketIds) {
  return markets.filter(m => marketIds.includes(m.id)).map(m => ({
    ...m,
    costIndex: Math.round((m.avgRent / markets.reduce((s, mm) => s + mm.avgRent, 0) * markets.length) * 100),
    demandScore: Math.round(m.yoyGrowth / Math.max(...markets.map(mm => mm.yoyGrowth)) * 100),
    supplyScore: Math.round((1 - m.vacancy / 100) * 100),
  }));
}

export function getFacilityRecommendations(needs) {
  const { targetMW = 5, preferLiquid = true, preferDGX = false, metros = [] } = needs || {};
  return facilities
    .filter(f => f.availMW >= targetMW * 0.5)
    .filter(f => !preferLiquid || f.liquidCooling)
    .filter(f => !preferDGX || f.dgxReady)
    .filter(f => metros.length === 0 || metros.includes(f.metro))
    .map(f => {
      const market = markets.find(m => m.name === f.metro);
      return {
        ...f,
        marketRent: market?.avgRent || 200,
        marketVacancy: market?.vacancy || 10,
        marketGrowth: market?.yoyGrowth || 20,
        score: f.availMW * 2 + (f.liquidCooling ? 20 : 0) + (f.dgxReady ? 15 : 0) + (1 / f.pue * 50) + f.renewable * 0.3,
      };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, 10);
}
