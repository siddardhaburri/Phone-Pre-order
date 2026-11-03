const API_BASE = '/api';

export async function fetchPhones(brand = 'all', search = '') {
  try {
    const params = new URLSearchParams();
    if (brand && brand !== 'all') params.append('brand', brand);
    if (search) params.append('search', search);

    const res = await fetch(`${API_BASE}/phones?${params.toString()}`);
    if (!res.ok) throw new Error('Failed to fetch phones');
    const data = await res.json();
    return data.data;
  } catch (err) {
    console.warn('API fetchPhones fallback to local store:', err);
    return null;
  }
}

export async function fetchPhoneById(id) {
  try {
    const res = await fetch(`${API_BASE}/phones/${id}`);
    if (!res.ok) throw new Error('Phone not found');
    const data = await res.json();
    return data.data;
  } catch (err) {
    console.warn('API fetchPhoneById fallback:', err);
    return null;
  }
}

export async function fetchTradeInCatalog() {
  try {
    const res = await fetch(`${API_BASE}/trade-in/catalog`);
    if (!res.ok) throw new Error('Failed to fetch trade-in catalog');
    const data = await res.json();
    return data.data;
  } catch (err) {
    console.warn('API fetchTradeInCatalog fallback:', err);
    return null;
  }
}

export async function getTradeInQuote(modelId, condition) {
  try {
    const res = await fetch(`${API_BASE}/trade-in/quote`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ modelId, condition })
    });
    if (!res.ok) throw new Error('Failed to calculate trade-in quote');
    const data = await res.json();
    return data.data;
  } catch (err) {
    console.warn('API getTradeInQuote fallback:', err);
    return null;
  }
}

export async function submitPreOrder(orderPayload) {
  try {
    const res = await fetch(`${API_BASE}/preorders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderPayload)
    });
    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      throw new Error(errData.message || 'Failed to submit pre-order');
    }
    const data = await res.json();
    return data.data;
  } catch (err) {
    console.error('API submitPreOrder error:', err);
    throw err;
  }
}

export async function trackOrder(query) {
  try {
    const res = await fetch(`${API_BASE}/preorders/${encodeURIComponent(query)}`);
    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      throw new Error(errData.message || 'No reservation found');
    }
    const data = await res.json();
    return data.data;
  } catch (err) {
    console.error('API trackOrder error:', err);
    throw err;
  }
}

export async function fetchAdminStats() {
  try {
    const res = await fetch(`${API_BASE}/admin/orders`);
    if (!res.ok) throw new Error('Failed to fetch admin stats');
    return await res.json();
  } catch (err) {
    console.error('API fetchAdminStats error:', err);
    throw err;
  }
}

export async function updateOrderStatus(orderId, status) {
  try {
    const res = await fetch(`${API_BASE}/admin/orders/${orderId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status })
    });
    if (!res.ok) throw new Error('Failed to update status');
    return await res.json();
  } catch (err) {
    console.error('API updateOrderStatus error:', err);
    throw err;
  }
}

