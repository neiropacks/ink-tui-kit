import { mergeConfig } from 'vitest/config';
import baseConfig from '../../vitest.config.base';

/**
 * Vitest configuration for ink-mouse package
 *
 * Extends the base monorepo configuration with package-specific settings.
 */
export default mergeConfig(baseConfig, {
  test: {
    coverage: {
      exclude: [
        // Node_modules
        'node_modules/**',
        // Test files
        '**/*.test.{ts,tsx}',
        '**/*.spec.{ts,tsx}',
        // Type definitions
        '**/*.d.ts',
        // Build artifacts
        'dist/**',
        // Barrel files (re-exports only)
        'src/index.ts',
        'src/hooks/index.ts',
        'src/utils/index.ts',
        // Mocks and fixtures
        '**/{mocks,fixtures,__mocks__}/**',
        // Configuration files
        '**/{vitest,vitest.config.base,vitest.config}.{ts,js}',
      ],
    },
  },
});
