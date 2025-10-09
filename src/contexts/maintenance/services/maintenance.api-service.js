const API = 'http://localhost:3000'

async function http(url, options = {}) {
  const res = await fetch(url, { headers: { 'Content-Type': 'application/json' }, ...options })
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}`)
  return res.json()
}

export class MaintenanceApiService {
  constructor(baseUrl = API) {
    this.baseUrl = baseUrl
  }

  async getUserEquipments(userId) {
    const rows = await http(`${this.baseUrl}/userMachines?userId=${userId}&_expand=equipment`)
    return rows.map((r) => r.equipment)
  }

  async getPricingMap() {
    const rows = await http(`${this.baseUrl}/maintenancePricing`)
    const map = new Map()
    rows.forEach((r) => map.set(r.equipmentId, r.fixedCostUSD))
    return map
  }

  async createRequest(payload) {
    return http(`${this.baseUrl}/maintenanceRequests`, {
      method: 'POST',
      body: JSON.stringify(payload),
    })
  }
}
