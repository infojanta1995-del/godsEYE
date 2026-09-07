import { StudioConfig, GodseyeAiResult } from '../types';

export interface GenerateContentRequest {
  config: StudioConfig;
}

export interface GenerateContentResponse {
  success: boolean;
  data?: GodseyeAiResult;
  error?: string;
}

export const GODSEYE_API = {
  /**
   * Health check for server-side AI services
   */
  async checkServerHealth(): Promise<{ ok: boolean; hasApiKey: boolean }> {
    try {
      const res = await fetch('/api/health');
      if (!res.ok) return { ok: false, hasApiKey: false };
      const json = await res.json();
      return { ok: json.status === 'ok', hasApiKey: Boolean(json.hasApiKey) };
    } catch {
      return { ok: false, hasApiKey: false };
    }
  },

  /**
   * Core AI Story Engine Endpoint
   * Sends user story & settings to server-side Gemini 3.8 Flash model.
   */
  async generateStudioContent(config: StudioConfig): Promise<GenerateContentResponse> {
    try {
      const res = await fetch('/api/generate-content', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ config }),
      });

      const json = await res.json();

      if (!res.ok || !json.success) {
        throw new Error(json.error || `Server responded with status ${res.status}`);
      }

      return {
        success: true,
        data: json.data,
      };
    } catch (err: any) {
      return {
        success: false,
        error: err?.message || 'Failed to connect to GODSEYE AI Engine',
      };
    }
  },

  /**
   * Granular Component Regeneration (Requirement 14)
   * Regenerate individual components without restarting the entire pipeline.
   */
  async regenerateComponent(
    component: string,
    config: StudioConfig,
    currentResult?: GodseyeAiResult
  ): Promise<{ success: boolean; data?: any; error?: string }> {
    try {
      const res = await fetch('/api/regenerate-component', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ component, config, currentResult }),
      });

      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.error || `Server responded with status ${res.status}`);
      }

      return {
        success: true,
        data: json.data,
      };
    } catch (err: any) {
      return {
        success: false,
        error: err?.message || `Failed to regenerate ${component}`,
      };
    }
  },
};
