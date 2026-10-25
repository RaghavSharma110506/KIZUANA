import { supabase } from "../lib/supabase";

export async function getProducts() {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("is_active", true)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data ?? [];
}

export async function getEvents() {
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data ?? [];
}

export async function getFavorites(userId) {
  const { data, error } = await supabase
    .from("favorites")
    .select("*")
    .eq("user_id", userId);

  if (error) throw error;
  return data ?? [];
}

export async function addFavorite(userId, productId) {
  const { error } = await supabase
    .from("favorites")
    .insert({
      user_id: userId,
      product_id: productId,
    });

  if (error) throw error;

  return { success: true };
}

export async function removeFavorite(userId, productId) {
  const { error } = await supabase
    .from("favorites")
    .delete()
    .eq("user_id", userId)
    .eq("product_id", productId);

  if (error) throw error;
}

export async function registerEventInDatabase(userId, eventId) {
  const { data, error } = await supabase
    .from("event_registrations")
    .insert({
      user_id: userId,
      event_id: eventId,
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function getEventRegistrations(userId) {
  const { data, error } = await supabase
    .from("event_registrations")
    .select("*")
    .eq("user_id", userId);

  if (error) throw error;
  return data ?? [];
}