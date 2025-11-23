import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(
      environment.supabase.url,
      environment.supabase.key
    );
  }

  async getAssets(): Promise<any[]> {
    try {
      const { data, error } = await this.supabase
        .from('assets')
        .select('*');

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching assets:', error);
      return [];
    }
  }

  async getAssetById(id: string): Promise<any> {
    try {
      const { data, error } = await this.supabase
        .from('assets')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error fetching asset:', error);
      return null;
    }
  }

  async uploadImage(file: File, folder: string = 'markers'): Promise<string | null> {
    try {
      const fileName = `${Date.now()}_${file.name}`;
      const filePath = `${folder}/${fileName}`;

      const { error } = await this.supabase.storage
        .from('ar-assets')
        .upload(filePath, file);

      if (error) throw error;

      const { data } = this.supabase.storage
        .from('ar-assets')
        .getPublicUrl(filePath);

      return data.publicUrl;
    } catch (error) {
      console.error('Error uploading image:', error);
      return null;
    }
  }

  async createAsset(asset: any): Promise<any> {
    try {
      const { data, error } = await this.supabase
        .from('assets')
        .insert([asset])
        .select();

      if (error) throw error;
      return data?.[0] || null;
    } catch (error) {
      console.error('Error creating asset:', error);
      return null;
    }
  }

  async deleteAsset(id: string): Promise<boolean> {
    try {
      const { error } = await this.supabase
        .from('assets')
        .delete()
        .eq('id', id);

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error deleting asset:', error);
      return false;
    }
  }
}