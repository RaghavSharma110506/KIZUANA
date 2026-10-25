const API_BASE_URL = "http://127.0.0.1:8000";

/**
 * Calls the FastAPI demand model.
 * The returned estimate is illustrative because the model was trained on synthetic data.
 */
export async function predictDemand(form) {
  const payload = {
    city: form.city === "Delhi NCR" ? "Delhi" : form.city,
    category: form.category,
    fandom: form.fandom || "Anime",
    price_inr: Number(form.price),
    product_views: Number(form.views),
    interest_registrations: Number(form.interest),
    planned_stock: Number(form.quantity),
    discount_pct: Number(form.discount ?? 0),
  };

  const response = await fetch(`${API_BASE_URL}/predict`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  let data;
  try {
    data = await response.json();
  } catch {
    throw new Error("The ML API returned an unreadable response.");
  }

  if (!response.ok) {
    const detail = typeof data.detail === "string"
      ? data.detail
      : "Prediction request failed. Check the form inputs and ML API.";
    throw new Error(detail);
  }

  if (typeof data.estimated_demand_orders !== "number") {
    throw new Error("The ML API response did not include a valid demand estimate.");
  }

  return data;
}