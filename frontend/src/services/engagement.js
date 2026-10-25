import { supabase } from "../lib/supabase";

export async function trackEngagement({
  eventType,
  entityType = null,
  entityId = null,
  productId = null,
  eventId = null,
  campaignId = null,
  companyId = null,
  sessionId = null,
  pagePath = window.location.pathname,
  source = "fan_world",
  metadata = {},
}) {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError) {
    console.error("Unable to get current user:", userError);
    return { success: false, error: userError };
  }

  if (!user) {
    return {
      success: false,
      error: new Error("User must be logged in to track engagement."),
    };
  }

  const { error } = await supabase
  .from("engagement_events")
  .insert({
    user_id: user.id,
    company_id: companyId,
    product_id: productId,
    event_id: eventId,
    campaign_id: campaignId,
    event_type: eventType,
    metadata,
    session_id: sessionId,
    entity_type: entityType,
    entity_id: entityId,
    page_path: pagePath,
    source,
  });

  if (error) {
    console.error("Failed to track engagement:", error);

    return {
      success: false,
      error,
    };
  }

  return {
    success: true,
    data,
  };
}