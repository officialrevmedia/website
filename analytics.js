/*
  Google Analytics 4
  ------------------
  1. In Google Analytics, open Admin > Data streams > your web stream.
  2. Copy the Measurement ID (it starts with "G-").
  3. Paste it between the quotes below, save, and upload this one file.
  Leave it empty and no tracking code loads at all.
*/
window.GA_MEASUREMENT_ID = "";

(function (id) {
  if (!id) return;
  window.dataLayer = window.dataLayer || [];
  window.gtag = function () { window.dataLayer.push(arguments); };
  window.gtag('js', new Date());
  window.gtag('config', id);
  var load = function () {
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(id);
    document.head.appendChild(s);
  };
  // Load after the page is interactive so it never slows the first paint.
  if (document.readyState === 'complete') setTimeout(load, 1);
  else window.addEventListener('load', function () { setTimeout(load, 1); });
})(window.GA_MEASUREMENT_ID);
