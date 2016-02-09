export function config ($logProvider, reCAPTCHAProvider, $serviceProvider) {
  'ngInject';
  // Enable log
  reCAPTCHAProvider.setPublicKey('6LdUu_cSAAAAAJT-SnxZm_EL_NwazPuCwgfb70Wo');
  reCAPTCHAProvider.setOptions({theme: 'blackglass'});

  $serviceProvider.setEnv('set', 'staging');
  $serviceProvider.setToken('ORIGIN_MAGICBOX_TOKEN'/* || 'MAGICBOX_DEMO_TOKEN'*/);
}
