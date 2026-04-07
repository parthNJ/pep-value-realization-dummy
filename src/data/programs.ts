import type { Program } from "@/types/dashboard";

export const programs: Program[] = [
  // Supply Chain
  { id: "p01", name: "Value Engineering", portfolio: "Supply Chain", region: "North America", market: "United States", benefit: 341.8, target: 278.4, bw: 63.4, benefitTier: "High", growth: "Strong", priority: "Tier 1" },
  { id: "p02", name: "Network Redesign Program", portfolio: "Supply Chain", region: "North America", market: "PBUS", benefit: 178.6, target: 166.2, bw: 12.4, benefitTier: "High", growth: "Strong", priority: "Tier 1" },
  { id: "p03", name: "Digital Sourcing", portfolio: "Supply Chain", region: "EMEA", market: "UKI", benefit: 151.4, target: 143.8, bw: 7.6, benefitTier: "High", growth: "Moderate", priority: "Tier 1" },
  { id: "p04", name: "Route Planning", portfolio: "Supply Chain", region: "LAFN", market: "Mexico", benefit: 49.8, target: 53.6, bw: -3.8, benefitTier: "Mid", growth: "Slowing", priority: "Watch" },
  { id: "p05", name: "Global Logistics Design", portfolio: "Supply Chain", region: "Corporate", market: "Corporate", benefit: 44.2, target: 40.6, bw: 3.6, benefitTier: "Mid", growth: "Strong", priority: "Tier 1" },
  { id: "p06", name: "Intelligent Warehouse", portfolio: "Supply Chain", region: "APAC", market: "Greater China", benefit: 39.4, target: 35.2, bw: 4.2, benefitTier: "Mid", growth: "Strong", priority: "Tier 2" },
  { id: "p07", name: "Connected Factory", portfolio: "Supply Chain", region: "North America", market: "PFUS", benefit: 35.8, target: 32.6, bw: 3.2, benefitTier: "Mid", growth: "Moderate", priority: "Tier 2" },
  { id: "p08", name: "Smart Logistics", portfolio: "Supply Chain", region: "EMEA", market: "Central Europe", benefit: 31.6, target: 29.4, bw: 2.2, benefitTier: "Mid", growth: "Moderate", priority: "Tier 2" },
  { id: "p09", name: "Receiving Automation", portfolio: "Supply Chain", region: "North America", market: "Canada", benefit: 26.2, target: 24.0, bw: 2.2, benefitTier: "Low", growth: "Strong", priority: "Tier 2" },
  { id: "p10", name: "Freight Management", portfolio: "Supply Chain", region: "LAFN", market: "Brazil", benefit: 24.6, target: 22.8, bw: 1.8, benefitTier: "Low", growth: "Moderate", priority: "Tier 2" },
  { id: "p11", name: "Distribution Hub", portfolio: "Supply Chain", region: "APAC", market: "India", benefit: 20.8, target: 19.2, bw: 1.6, benefitTier: "Low", growth: "Strong", priority: "Tier 2" },
  { id: "p12", name: "Predictive Equipment Care", portfolio: "Supply Chain", region: "APAC", market: "Indochina", benefit: 16.8, target: 15.2, bw: 1.6, benefitTier: "Low", growth: "Strong", priority: "Tier 2" },
  { id: "p13", name: "Fleet Tracking System", portfolio: "Supply Chain", region: "APAC", market: "Indochina", benefit: 13.4, target: 12.2, bw: 1.2, benefitTier: "Low", growth: "Moderate", priority: "Tier 3" },
  { id: "p14", name: "Eastern Europe Logistics", portfolio: "Supply Chain", region: "EMEA", market: "Russia", benefit: 11.6, target: 17.0, bw: -5.4, benefitTier: "Low", growth: "Slowing", priority: "Watch" },
  { id: "p15", name: "Eastern Europe Logistics (Svc)", portfolio: "Supply Chain", region: "EMEA", market: "Russia", benefit: 7.8, target: 11.4, bw: -3.6, benefitTier: "Low", growth: "Slowing", priority: "Watch" },
  { id: "p16", name: "DC Optimization Tool", portfolio: "Supply Chain", region: "North America", market: "United States", benefit: 15.4, target: 14.2, bw: 1.2, benefitTier: "Low", growth: "Moderate", priority: "Tier 3" },
  { id: "p17", name: "Inventory Balancing", portfolio: "Supply Chain", region: "EMEA", market: "France", benefit: 10.4, target: 10.0, bw: 0.4, benefitTier: "Low", growth: "Moderate", priority: "Tier 3" },
  { id: "p18", name: "VMI Expansion", portfolio: "Supply Chain", region: "EMEA", market: "WECA", benefit: 7.8, target: 7.4, bw: 0.4, benefitTier: "Low", growth: "Moderate", priority: "Tier 3" },
  // Commercial
  { id: "p19", name: "Procurement Transformation", portfolio: "Commercial", region: "North America", market: "United States", benefit: 232.6, target: 289.4, bw: -56.8, benefitTier: "High", growth: "Moderate", priority: "Watch" },
  { id: "p20", name: "Purchase to Pay", portfolio: "Commercial", region: "EMEA", market: "UKI", benefit: 79.8, target: 72.4, bw: 7.4, benefitTier: "Mid", growth: "Strong", priority: "Tier 1" },
  { id: "p21", name: "Order Fulfillment (Svc)", portfolio: "Commercial", region: "North America", market: "PBUS", benefit: 57.6, target: 54.2, bw: 3.4, benefitTier: "Mid", growth: "Moderate", priority: "Tier 2" },
  { id: "p22", name: "Client Services Hub", portfolio: "Commercial", region: "LAFN", market: "Mexico", benefit: 41.4, target: 38.8, bw: 2.6, benefitTier: "Mid", growth: "Moderate", priority: "Tier 2" },
  { id: "p23", name: "Eastern Europe OTC (Svc)", portfolio: "Commercial", region: "EMEA", market: "Russia", benefit: 17.2, target: 30.0, bw: -12.8, benefitTier: "Low", growth: "Slowing", priority: "Watch" },
  { id: "p24", name: "Digital Metering", portfolio: "Commercial", region: "APAC", market: "Greater China", benefit: 26.2, target: 24.2, bw: 2.0, benefitTier: "Low", growth: "Strong", priority: "Tier 2" },

  // IBP
  { id: "p25", name: "Integrated Planning Hub", portfolio: "IBP", region: "North America", market: "United States", benefit: 127.8, target: 115.2, bw: 12.6, benefitTier: "High", growth: "Strong", priority: "Tier 1" },
  { id: "p26", name: "Demand Planning (Svc)", portfolio: "IBP", region: "EMEA", market: "France", benefit: 43.2, target: 38.8, bw: 4.4, benefitTier: "Mid", growth: "Moderate", priority: "Tier 2" },
  { id: "p27", name: "Production Scheduler", portfolio: "IBP", region: "APAC", market: "Indonesia", benefit: 29.8, target: 26.6, bw: 3.2, benefitTier: "Mid", growth: "Strong", priority: "Tier 2" },
  { id: "p28", name: "Resource Allocator", portfolio: "IBP", region: "North America", market: "PFUS", benefit: 22.8, target: 20.6, bw: 2.2, benefitTier: "Low", growth: "Moderate", priority: "Tier 3" },

  // Finance
  { id: "p29", name: "Strategic Sourcing", portfolio: "Finance", region: "Corporate", market: "Corporate", benefit: 63.2, target: 58.0, bw: 5.2, benefitTier: "Mid", growth: "Strong", priority: "Tier 1" },
  { id: "p30", name: "Contract Management (Svc)", portfolio: "Finance", region: "North America", market: "United States", benefit: 48.2, target: 44.6, bw: 3.6, benefitTier: "Mid", growth: "Moderate", priority: "Tier 2" },
  { id: "p31", name: "Vendor Management", portfolio: "Finance", region: "EMEA", market: "SWE", benefit: 31.6, target: 35.8, bw: -4.2, benefitTier: "Mid", growth: "Slowing", priority: "Watch" },
  { id: "p32", name: "Supplier Collaboration Portal", portfolio: "Finance", region: "APAC", market: "Australia & New Zealand", benefit: 17.0, target: 15.6, bw: 1.4, benefitTier: "Low", growth: "Moderate", priority: "Tier 3" },

  // Global Functions
  { id: "p33", name: "Trade & Compliance (Svc)", portfolio: "Global Functions", region: "Corporate", market: "Corporate", benefit: 40.8, target: 37.6, bw: 3.2, benefitTier: "Mid", growth: "Moderate", priority: "Tier 2" },
  { id: "p34", name: "ERP Enablement", portfolio: "Global Functions", region: "North America", market: "PBUS", benefit: 29.2, target: 26.2, bw: 3.0, benefitTier: "Low", growth: "Strong", priority: "Tier 2" },
  { id: "p35", name: "Maintenance System Rollout", portfolio: "Global Functions", region: "EMEA", market: "Turkey", benefit: 15.4, target: 17.8, bw: -2.4, benefitTier: "Low", growth: "Slowing", priority: "Tier 3" },

  // Consumer
  { id: "p36", name: "Consumer Experience Platform", portfolio: "Consumer", region: "North America", market: "United States", benefit: 39.4, target: 44.8, bw: -5.4, benefitTier: "Mid", growth: "Slowing", priority: "Watch" },
  { id: "p37", name: "Direct Distribution CE", portfolio: "Consumer", region: "EMEA", market: "Central Europe", benefit: 17.0, target: 20.4, bw: -3.4, benefitTier: "Low", growth: "Slowing", priority: "Watch" },
  { id: "p38", name: "Direct Distribution CE 1.75", portfolio: "Consumer", region: "EMEA", market: "Central Europe", benefit: 11.6, target: 13.6, bw: -2.0, benefitTier: "Low", growth: "Slowing", priority: "Watch" },
  // Control
  { id: "p39", name: "Waste Reduction E2E", portfolio: "Control", region: "North America", market: "PFUS", benefit: 34.0, target: 30.6, bw: 3.4, benefitTier: "Mid", growth: "Strong", priority: "Tier 1" },
  { id: "p40", name: "Condition Monitoring", portfolio: "Control", region: "APAC", market: "Australia & New Zealand", benefit: 20.6, target: 19.2, bw: 1.4, benefitTier: "Low", growth: "Moderate", priority: "Tier 2" },

  // Capabilities
  { id: "p41", name: "Agri Intelligence", portfolio: "Capabilities", region: "North America", market: "United States", benefit: 44.8, target: 39.2, bw: 5.6, benefitTier: "Mid", growth: "Strong", priority: "Tier 1" },
  { id: "p42", name: "Precision Farming", portfolio: "Capabilities", region: "LAFN", market: "Brazil", benefit: 29.8, target: 26.4, bw: 3.4, benefitTier: "Mid", growth: "Strong", priority: "Tier 2" },
  { id: "p43", name: "Crop Traceability", portfolio: "Capabilities", region: "EMEA", market: "Egypt", benefit: 16.8, target: 15.2, bw: 1.6, benefitTier: "Low", growth: "Moderate", priority: "Tier 2" },
  { id: "p44", name: "Raw Material Allocation", portfolio: "Capabilities", region: "North America", market: "PBUS", benefit: 13.6, target: 11.6, bw: 2.0, benefitTier: "Low", growth: "Strong", priority: "Tier 2" },

  // Tech Foundation
  { id: "p45", name: "WMS Taiwan DC", portfolio: "Tech Foundation", region: "APAC", market: "Greater China", benefit: 26.2, target: 24.2, bw: 2.0, benefitTier: "Low", growth: "Strong", priority: "Tier 2" },
  { id: "p46", name: "WMS XiAn Facility", portfolio: "Tech Foundation", region: "APAC", market: "Greater China", benefit: 20.8, target: 18.8, bw: 2.0, benefitTier: "Low", growth: "Strong", priority: "Tier 2" },
  { id: "p47", name: "WMS Blue Bin DCI", portfolio: "Tech Foundation", region: "APAC", market: "Greater China", benefit: 15.4, target: 14.0, bw: 1.4, benefitTier: "Low", growth: "Moderate", priority: "Tier 3" },
  { id: "p48", name: "WMS Enhancement", portfolio: "Tech Foundation", region: "APAC", market: "Indonesia", benefit: 11.4, target: 13.6, bw: -2.2, benefitTier: "Low", growth: "Slowing", priority: "Watch" },
  { id: "p49", name: "Analytics Platform Upgrade", portfolio: "Tech Foundation", region: "EMEA", market: "Turkey", benefit: 7.8, target: 11.2, bw: -3.4, benefitTier: "Low", growth: "Slowing", priority: "Watch" },

  // People Experience & Ops
  { id: "p50", name: "Operations Excellence", portfolio: "People Experience & Ops", region: "North America", market: "United States", benefit: 31.6, target: 28.4, bw: 3.2, benefitTier: "Mid", growth: "Moderate", priority: "Tier 2" },
  { id: "p51", name: "Digital Operations SE Asia", portfolio: "People Experience & Ops", region: "APAC", market: "Indochina", benefit: 17.0, target: 15.0, bw: 2.0, benefitTier: "Low", growth: "Strong", priority: "Tier 2" },

  // Others
  { id: "p52", name: "Carrier Connect Wave 3", portfolio: "Others", region: "EMEA", market: "Central Europe", benefit: 15.4, target: 17.0, bw: -1.6, benefitTier: "Low", growth: "Moderate", priority: "Tier 3" },
  { id: "p53", name: "Label Compliance AU", portfolio: "Others", region: "APAC", market: "Australia & New Zealand FOBO", benefit: 11.4, target: 13.0, bw: -1.6, benefitTier: "Low", growth: "Slowing", priority: "Watch" },
  { id: "p54", name: "RFID Shipment Detection", portfolio: "Others", region: "EMEA", market: "NE", benefit: 7.6, target: 8.8, bw: -1.2, benefitTier: "Low", growth: "Slowing", priority: "Tier 3" },
  { id: "p55", name: "Misc Supply Chain Ops", portfolio: "Others", region: "International Beverages", market: "South Africa", benefit: 6.2, target: 6.8, bw: -0.6, benefitTier: "Low", growth: "Moderate", priority: "Tier 3" },
  { id: "p56", name: "Regional SC Operations", portfolio: "Others", region: "LAFN", market: "Andean", benefit: 3.8, target: 4.4, bw: -0.6, benefitTier: "Low", growth: "Slowing", priority: "Tier 3" },

  // VR Whitespace
  { id: "p57", name: "Simulation Modeling", portfolio: "VR Whitespace", region: "Corporate", market: "Corporate", benefit: 7.4, target: 9.6, bw: -2.2, benefitTier: "Low", growth: "Moderate", priority: "Tier 3" },
  { id: "p58", name: "Field Intelligence", portfolio: "VR Whitespace", region: "APAC", market: "India FOBO", benefit: 5.8, target: 5.4, bw: 0.4, benefitTier: "Low", growth: "Strong", priority: "Tier 3" },
  { id: "p59", name: "Logistics Pilot", portfolio: "VR Whitespace", region: "International Beverages", market: "Saudi Arabia + GCC markets", benefit: 4.4, target: 4.8, bw: -0.4, benefitTier: "Low", growth: "Moderate", priority: "Tier 3" },
];
