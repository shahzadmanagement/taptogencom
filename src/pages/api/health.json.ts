import type { APIRoute } from 'astro';
import { checkSystemHealth } from '../../platform/diagnostics/systemHealth';

export const prerender = false;

export const GET: APIRoute = async () => {
  const health = checkSystemHealth();
  return new Response(JSON.stringify(health), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store, no-cache, must-revalidate'
    }
  });
};
