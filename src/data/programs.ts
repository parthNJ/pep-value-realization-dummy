import type { Program } from "@/types/dashboard";

export const programs: Program[] = [
  // Supply Chain programs — largest portfolio, mostly North America & APAC
  { id: "p01", name: "Design To Value", portfolio: "Supply Chain", region: "North America", market: "United States", benefit: 369.2, target: 301.0, bw: 68.2, benefitTier: "High", growth: "Strong", priority: "Tier 1" },
  { id: "p02", name: "Network Optimization Program", portfolio: "Supply Chain", region: "North America", market: "PBUS", benefit: 192.4, target: 180.1, bw: 12.3, benefitTier: "High", growth: "Strong", priority: "Tier 1" },
  { id: "p03", name: "Digital Procurement", portfolio: "Supply Chain", region: "EMEA", market: "UKI", benefit: 163.1, target: 155.0, bw: 8.1, benefitTier: "High", growth: "Moderate", priority: "Tier 1" },
  { id: "p04", name: "Route Optimization", portfolio: "Supply Chain", region: "LAFN", market: "Mexico", benefit: 54.3, target: 58.2, bw: -3.9, benefitTier: "Mid", growth: "Slowing", priority: "Watch" },
  { id: "p05", name: "Global Network Design", portfolio: "Supply Chain", region: "Corporate", market: "Corporate", benefit: 48.6, target: 44.2, bw: 4.4, benefitTier: "Mid", growth: "Strong", priority: "Tier 1" },
  { id: "p06", name: "Smart Warehouse", portfolio: "Supply Chain", region: "APAC", market: "Greater China", benefit: 42.8, target: 38.4, bw: 4.4, benefitTier: "Mid", growth: "Strong", priority: "Tier 2" },
  { id: "p07", name: "Smart Manufacturing", portfolio: "Supply Chain", region: "North America", market: "PFUS", benefit: 38.6, target: 35.2, bw: 3.4, benefitTier: "Mid", growth: "Moderate", priority: "Tier 2" },
  { id: "p08", name: "Smart Distribution", portfolio: "Supply Chain", region: "EMEA", market: "Central Europe", benefit: 34.2, target: 31.8, bw: 2.4, benefitTier: "Mid", growth: "Moderate", priority: "Tier 2" },
  { id: "p09", name: "Inbound Automation", portfolio: "Supply Chain", region: "North America", market: "Canada", benefit: 28.4, target: 26.1, bw: 2.3, benefitTier: "Low", growth: "Strong", priority: "Tier 2" },
  { id: "p10", name: "Transportation", portfolio: "Supply Chain", region: "LAFN", market: "Brazil", benefit: 26.8, target: 24.6, bw: 2.2, benefitTier: "Low", growth: "Moderate", priority: "Tier 2" },
  { id: "p11", name: "Warehouse", portfolio: "Supply Chain", region: "APAC", market: "India", benefit: 22.4, target: 20.8, bw: 1.6, benefitTier: "Low", growth: "Strong", priority: "Tier 2" },
  { id: "p12", name: "Predictive Maintenence for VNF BD Plant", portfolio: "Supply Chain", region: "APAC", market: "Indochina", benefit: 18.2, target: 16.4, bw: 1.8, benefitTier: "Low", growth: "Strong", priority: "Tier 2" },
  { id: "p13", name: "VNF GTMS - Transportation Management", portfolio: "Supply Chain", region: "APAC", market: "Indochina", benefit: 14.6, target: 13.2, bw: 1.4, benefitTier: "Low", growth: "Moderate", priority: "Tier 3" },
  { id: "p14", name: "Russia Transportation", portfolio: "Supply Chain", region: "EMEA", market: "Russia", benefit: 12.8, target: 18.4, bw: -5.6, benefitTier: "Low", growth: "Slowing", priority: "Watch" },
  { id: "p15", name: "Russia Transportation (Service)", portfolio: "Supply Chain", region: "EMEA", market: "Russia", benefit: 8.4, target: 12.2, bw: -3.8, benefitTier: "Low", growth: "Slowing", priority: "Watch" },
  { id: "p16", name: "DC Rebalance- Smart Planning tool", portfolio: "Supply Chain", region: "North America", market: "United States", benefit: 16.8, target: 15.4, bw: 1.4, benefitTier: "Low", growth: "Moderate", priority: "Tier 3" },
  { id: "p17", name: "Stock Allocation", portfolio: "Supply Chain", region: "EMEA", market: "France", benefit: 11.2, target: 10.8, bw: 0.4, benefitTier: "Low", growth: "Moderate", priority: "Tier 3" },
  { id: "p18", name: "VMI Phase 2 Belgium", portfolio: "Supply Chain", region: "EMEA", market: "WECA", benefit: 8.6, target: 8.2, bw: 0.4, benefitTier: "Low", growth: "Moderate", priority: "Tier 3" },
  // Commercial
  { id: "p19", name: "Requisition to Pay", portfolio: "Commercial", region: "North America", market: "United States", benefit: 251.3, target: 313.0, bw: -61.7, benefitTier: "High", growth: "Moderate", priority: "Watch" },
  { id: "p20", name: "Procure to Pay", portfolio: "Commercial", region: "EMEA", market: "UKI", benefit: 86.2, target: 78.4, bw: 7.8, benefitTier: "Mid", growth: "Strong", priority: "Tier 1" },
  { id: "p21", name: "Order Management (Service)", portfolio: "Commercial", region: "North America", market: "PBUS", benefit: 62.4, target: 58.6, bw: 3.8, benefitTier: "Mid", growth: "Moderate", priority: "Tier 2" },
  { id: "p22", name: "Customer Support (Service)", portfolio: "Commercial", region: "LAFN", market: "Mexico", benefit: 44.8, target: 42.1, bw: 2.7, benefitTier: "Mid", growth: "Moderate", priority: "Tier 2" },
  { id: "p23", name: "Russia Order to Cash (Service)", portfolio: "Commercial", region: "EMEA", market: "Russia", benefit: 18.6, target: 32.4, bw: -13.8, benefitTier: "Low", growth: "Slowing", priority: "Watch" },
  { id: "p24", name: "Online metering for", portfolio: "Commercial", region: "APAC", market: "Greater China", benefit: 28.4, target: 26.2, bw: 2.2, benefitTier: "Low", growth: "Strong", priority: "Tier 2" },

  // IBP
  { id: "p25", name: "ISCP", portfolio: "IBP", region: "North America", market: "United States", benefit: 138.2, target: 124.6, bw: 13.6, benefitTier: "High", growth: "Strong", priority: "Tier 1" },
  { id: "p26", name: "Supply Planning (Service)", portfolio: "IBP", region: "EMEA", market: "France", benefit: 46.8, target: 42.1, bw: 4.7, benefitTier: "Mid", growth: "Moderate", priority: "Tier 2" },
  { id: "p27", name: "Production Plan Optimize", portfolio: "IBP", region: "APAC", market: "Indonesia", benefit: 32.4, target: 28.8, bw: 3.6, benefitTier: "Mid", growth: "Strong", priority: "Tier 2" },
  { id: "p28", name: "Allocation Tool", portfolio: "IBP", region: "North America", market: "PFUS", benefit: 24.6, target: 22.4, bw: 2.2, benefitTier: "Low", growth: "Moderate", priority: "Tier 3" },

  // Finance
  { id: "p29", name: "Source to Pay", portfolio: "Finance", region: "Corporate", market: "Corporate", benefit: 68.4, target: 62.8, bw: 5.6, benefitTier: "Mid", growth: "Strong", priority: "Tier 1" },
  { id: "p30", name: "Source to Contract (Service)", portfolio: "Finance", region: "North America", market: "United States", benefit: 52.1, target: 48.3, bw: 3.8, benefitTier: "Mid", growth: "Moderate", priority: "Tier 2" },
  { id: "p31", name: "Supplier & Procurement", portfolio: "Finance", region: "EMEA", market: "SWE", benefit: 34.2, target: 38.6, bw: -4.4, benefitTier: "Mid", growth: "Slowing", priority: "Watch" },
  { id: "p32", name: "Supplier delivery & inspection collaboration", portfolio: "Finance", region: "APAC", market: "Australia & New Zealand", benefit: 18.4, target: 16.8, bw: 1.6, benefitTier: "Low", growth: "Moderate", priority: "Tier 3" },

  // Global Functions
  { id: "p33", name: "Global Trade and Transport (Service)", portfolio: "Global Functions", region: "Corporate", market: "Corporate", benefit: 44.2, target: 40.8, bw: 3.4, benefitTier: "Mid", growth: "Moderate", priority: "Tier 2" },
  { id: "p34", name: "Enable SAP for Quaker", portfolio: "Global Functions", region: "North America", market: "PBUS", benefit: 31.6, target: 28.4, bw: 3.2, benefitTier: "Low", growth: "Strong", priority: "Tier 2" },
  { id: "p35", name: "SAP PM rollout to XA & SD", portfolio: "Global Functions", region: "EMEA", market: "Turkey", benefit: 16.8, target: 19.2, bw: -2.4, benefitTier: "Low", growth: "Slowing", priority: "Tier 3" },

  // Consumer
  { id: "p36", name: "CTX", portfolio: "Consumer", region: "North America", market: "United States", benefit: 42.8, target: 48.6, bw: -5.8, benefitTier: "Mid", growth: "Slowing", priority: "Watch" },
  { id: "p37", name: "DD ex Znin for CSD", portfolio: "Consumer", region: "EMEA", market: "Central Europe", benefit: 18.4, target: 22.1, bw: -3.7, benefitTier: "Low", growth: "Slowing", priority: "Watch" },
  { id: "p38", name: "DD ex Znin for CSD 1.75L", portfolio: "Consumer", region: "EMEA", market: "Central Europe", benefit: 12.6, target: 14.8, bw: -2.2, benefitTier: "Low", growth: "Slowing", priority: "Watch" },
  // Control
  { id: "p39", name: "E2E Waste/PO", portfolio: "Control", region: "North America", market: "PFUS", benefit: 36.8, target: 33.1, bw: 3.7, benefitTier: "Mid", growth: "Strong", priority: "Tier 1" },
  { id: "p40", name: "Augury Condition Monitoring", portfolio: "Control", region: "APAC", market: "Australia & New Zealand", benefit: 22.4, target: 20.8, bw: 1.6, benefitTier: "Low", growth: "Moderate", priority: "Tier 2" },

  // Capabilities
  { id: "p41", name: "AgroScout", portfolio: "Capabilities", region: "North America", market: "United States", benefit: 48.6, target: 42.4, bw: 6.2, benefitTier: "Mid", growth: "Strong", priority: "Tier 1" },
  { id: "p42", name: "Precision Agro", portfolio: "Capabilities", region: "LAFN", market: "Brazil", benefit: 32.4, target: 28.6, bw: 3.8, benefitTier: "Mid", growth: "Strong", priority: "Tier 2" },
  { id: "p43", name: "Smart Agriculture - Potato Traceabilit", portfolio: "Capabilities", region: "EMEA", market: "Egypt", benefit: 18.2, target: 16.4, bw: 1.8, benefitTier: "Low", growth: "Moderate", priority: "Tier 2" },
  { id: "p44", name: "Agro 5R for chipstock allocation(Primary)", portfolio: "Capabilities", region: "North America", market: "PBUS", benefit: 14.8, target: 12.6, bw: 2.2, benefitTier: "Low", growth: "Strong", priority: "Tier 2" },

  // Tech Foundation
  { id: "p45", name: "China ITTX WMS - Taiwan master warehouse DC", portfolio: "Tech Foundation", region: "APAC", market: "Greater China", benefit: 28.4, target: 26.2, bw: 2.2, benefitTier: "Low", growth: "Strong", priority: "Tier 2" },
  { id: "p46", name: "China ITTX WMS - XiAn Plant", portfolio: "Tech Foundation", region: "APAC", market: "Greater China", benefit: 22.6, target: 20.4, bw: 2.2, benefitTier: "Low", growth: "Strong", priority: "Tier 2" },
  { id: "p47", name: "China ITTX WMS -DCI for Warehouse Blue bin", portfolio: "Tech Foundation", region: "APAC", market: "Greater China", benefit: 16.8, target: 15.2, bw: 1.6, benefitTier: "Low", growth: "Moderate", priority: "Tier 3" },
  { id: "p48", name: "ITTX WMS Enhance", portfolio: "Tech Foundation", region: "APAC", market: "Indonesia", benefit: 12.4, target: 14.8, bw: -2.4, benefitTier: "Low", growth: "Slowing", priority: "Watch" },
  { id: "p49", name: "TRTV Enhancement & data analSsis", portfolio: "Tech Foundation", region: "EMEA", market: "Turkey", benefit: 8.6, target: 12.2, bw: -3.6, benefitTier: "Low", growth: "Slowing", priority: "Watch" },

  // People Experience & Ops
  { id: "p50", name: "Manufacturing", portfolio: "People Experience & Ops", region: "North America", market: "United States", benefit: 34.2, target: 30.8, bw: 3.4, benefitTier: "Mid", growth: "Moderate", priority: "Tier 2" },
  { id: "p51", name: "Manufacturing - eDVC Lamphun", portfolio: "People Experience & Ops", region: "APAC", market: "Indochina", benefit: 18.4, target: 16.2, bw: 2.2, benefitTier: "Low", growth: "Strong", priority: "Tier 2" },

  // Others
  { id: "p52", name: "Carrier Connectivity (Wave 3) - DACH", portfolio: "Others", region: "EMEA", market: "Central Europe", benefit: 16.8, target: 18.4, bw: -1.6, benefitTier: "Low", growth: "Moderate", priority: "Tier 3" },
  { id: "p53", name: "AU SAP SSCC Label P", portfolio: "Others", region: "APAC", market: "Australia & New Zealand FOBO", benefit: 12.4, target: 14.2, bw: -1.8, benefitTier: "Low", growth: "Slowing", priority: "Watch" },
  { id: "p54", name: "RFID for trans-shipment detection", portfolio: "Others", region: "EMEA", market: "NE", benefit: 8.2, target: 9.6, bw: -1.4, benefitTier: "Low", growth: "Slowing", priority: "Tier 3" },
  { id: "p55", name: "Other Supply Chain", portfolio: "Others", region: "International Beverages", market: "South Africa", benefit: 6.8, target: 7.4, bw: -0.6, benefitTier: "Low", growth: "Moderate", priority: "Tier 3" },
  { id: "p56", name: "Supply Chain Operations", portfolio: "Others", region: "LAFN", market: "Andean", benefit: 4.2, target: 4.8, bw: -0.6, benefitTier: "Low", growth: "Slowing", priority: "Tier 3" },

  // VR Whitespace
  { id: "p57", name: "Network Modeling", portfolio: "VR Whitespace", region: "Corporate", market: "Corporate", benefit: 8.2, target: 10.4, bw: -2.2, benefitTier: "Low", growth: "Moderate", priority: "Tier 3" },
  { id: "p58", name: "Agro Scout", portfolio: "VR Whitespace", region: "APAC", market: "India FOBO", benefit: 6.4, target: 5.8, bw: 0.6, benefitTier: "Low", growth: "Strong", priority: "Tier 3" },
  { id: "p59", name: "Transport", portfolio: "VR Whitespace", region: "International Beverages", market: "Saudi Arabia + GCC markets", benefit: 4.8, target: 5.2, bw: -0.4, benefitTier: "Low", growth: "Moderate", priority: "Tier 3" },
];
