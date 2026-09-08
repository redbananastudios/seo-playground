'use server'

import { saveCredentials, clearCredentials, setSetting } from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function updateSettings(formData: FormData) {
  const user = formData.get('login') as string;
  const pass = formData.get('password') as string;
  if (user && pass) saveCredentials(user, pass);

  const defaultLocation = (formData.get('default_location') as string)?.trim();
  const defaultCoordinates = (formData.get('default_coordinates') as string)?.trim();
  const defaultLanguage = (formData.get('default_language') as string)?.trim();
  const defaultDomain = (formData.get('default_domain') as string)?.trim();

  if (defaultLocation !== undefined) setSetting('default_location', defaultLocation);
  if (defaultCoordinates !== undefined) setSetting('default_coordinates', defaultCoordinates);
  if (defaultLanguage !== undefined) setSetting('default_language', defaultLanguage);
  if (defaultDomain !== undefined) setSetting('default_domain', defaultDomain);
  const gridKeywords = formData.get('grid_keywords');
  if (typeof gridKeywords === 'string') {
    const keywords = [...new Set(gridKeywords.split('\n').map((k) => k.trim()).filter(Boolean))].slice(0, 100);
    setSetting('grid_keywords', keywords.join('\n'));
  }

  revalidatePath('/dashboard/settings');
  revalidatePath('/dashboard/geo-grid');
}

export async function deleteCredentials() {
  clearCredentials();
  revalidatePath('/dashboard');
  redirect('/dashboard/settings');
}
