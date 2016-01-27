export function config ($logProvider, reCAPTCHAProvider) {
  'ngInject';
  // Enable log

  $logProvider.debugEnabled(true);
  reCAPTCHAProvider.setPublicKey('6LdUu_cSAAAAAJT-SnxZm_EL_NwazPuCwgfb70Wo');
  reCAPTCHAProvider.setOptions({
    theme: 'blackglass'
  });
}
