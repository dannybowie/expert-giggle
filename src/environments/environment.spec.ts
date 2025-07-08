import { environment as prodEnv } from './environment';
import { environment as devEnv } from './environment.development';

describe('Environment Configuration', () => {
  it('production environment should have correct structure', () => {
    expect(prodEnv.production).toBe(true);
    expect(prodEnv.firebase).toBeDefined();
    expect(prodEnv.firebase.apiKey).toBeDefined();
    expect(prodEnv.firebase.authDomain).toBeDefined();
    expect(prodEnv.firebase.projectId).toBeDefined();
    expect(prodEnv.firebase.storageBucket).toBeDefined();
    expect(prodEnv.firebase.messagingSenderId).toBeDefined();
    expect(prodEnv.firebase.appId).toBeDefined();
  });

  it('development environment should have correct structure', () => {
    expect(devEnv.production).toBe(false);
    expect(devEnv.firebase).toBeDefined();
    expect(devEnv.firebase.apiKey).toBeDefined();
    expect(devEnv.firebase.authDomain).toBeDefined();
    expect(devEnv.firebase.projectId).toBeDefined();
    expect(devEnv.firebase.storageBucket).toBeDefined();
    expect(devEnv.firebase.messagingSenderId).toBeDefined();
    expect(devEnv.firebase.appId).toBeDefined();
  });

  it('development environment should have placeholder values', () => {
    expect(devEnv.firebase.apiKey).toContain('dev-');
    expect(devEnv.firebase.authDomain).toContain('dev-');
    expect(devEnv.firebase.projectId).toContain('dev-');
  });
});