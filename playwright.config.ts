import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  // Carpeta donde están tus archivos .spec.ts
  testDir: './tests',
  
  // Ejecución en paralelo para ahorrar tiempo
  fullyParallel: true,
  
  // Reintentos en caso de fallo (útil si la web de PrestaShop está lenta)
  retries: 1,
  
  // Reporte en HTML: npx playwright show-report
  reporter: 'html',

  use: {
    /* ESTA ES LA RUTA BASE: Ahora await page.goto('/') funcionará correctamente */
    baseURL: 'https://demo.prestashop.com/',

    /* Configuración de trazabilidad y evidencia */
    trace: 'on-first-retry', // Graba un video/traza si el test falla al primer intento
    screenshot: 'only-on-failure', // Toma una foto automática si algo sale mal
    video: 'retain-on-failure', // Graba video solo si falla
  },

  /* Configuramos solo Chrome para ir más rápido, puedes activar el resto luego */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});