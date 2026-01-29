// footer-loader.js
// Tries to fetch the shared _footer.html partial and inject it into #site-footer.
// If fetch fails (e.g., file:// CORS or network), falls back to an embedded HTML string.
(function(){
  var container = document.getElementById('site-footer');
  if (!container) return;

  var footerPathCandidates = ['./_footer.html','/_footer.html','./footer/_footer.html'];

  function tryFetch(paths) {
    if (!paths.length) return Promise.reject(new Error('No footer path candidates'));
    var p = paths[0];
    return fetch(p).then(function(res){
      if (!res.ok) throw new Error('Fetch failed: '+res.status);
      return res.text();
    }).catch(function(){
      return tryFetch(paths.slice(1));
    });
  }

  tryFetch(footerPathCandidates).then(function(html){
    container.innerHTML = html;
  }).catch(function(err){
    console.warn('Could not load _footer.html, injecting fallback footer. Error:', err);
    container.innerHTML = fallbackFooterHtml();
  });

  function fallbackFooterHtml(){
    // Keep this small and maintainable; update if _footer.html changes.
    return '\n<footer class="footer">\n    <div class="container">\n        <div class="footer-content">\n            <div class="footer-section">\n                <h4>Christopher J Salon</h4>\n                <p>Premier salon in Plymouth, MN offering color, cuts, and professional hair services.</p>\n            </div>\n            <div class="footer-section">\n                <h4>Contact</h4>\n                <p><a href="https://maps.app.goo.gl/TWnFVuHZ7Ls2iPXc6" target="_blank" rel="noopener noreferrer">2700 Annapolis Cir N<br>Plymouth, MN 55441</a></p>\n                <p><a href="tel:763-404-8606">(763) 404-8606</a></p>\n            </div>\n            <div class="footer-section footer-follow">\n                <h4>Follow Us</h4>\n                <div class="social-links" aria-label="Social links">\n                    <a class="social-link" href="https://www.facebook.com/ChristopherJSalonMN" target="_blank" rel="noopener noreferrer" aria-label="Christopher J Salon on Facebook">\n                        <svg class="social-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">\n                            <path d="M22 12c0-5.522-4.477-10-10-10S2 6.478 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.99H7.898v-2.888h2.54V9.413c0-2.507 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.462h-1.26c-1.242 0-1.63.772-1.63 1.562v1.875h2.773l-.443 2.888h-2.33v6.99C18.343 21.128 22 16.99 22 12z"/>\n                        </svg>\n                    </a>\n                    <a class="social-link" href="https://www.instagram.com/christopherjsalon" target="_blank" rel="noopener noreferrer" aria-label="Christopher J Salon on Instagram">\n                        <svg class="social-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">\n                            <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7zm5 3.5A5.5 5.5 0 1 1 6.5 13 5.507 5.507 0 0 1 12 7.5zm0 2A3.5 3.5 0 1 0 15.5 13 3.504 3.504 0 0 0 12 9.5zM18.5 6a1 1 0 1 1-1-1 1 1 0 0 1 1 1z"/>\n                        </svg>\n                    </a>\n                </div>\n            </div>\n            <div class="footer-section">\n                <h4>Hours</h4>\n                <p>Tue-Fri: 9AM-6PM<br>Saturday: 9AM-4PM<br>Sun-Mon: Closed</p>\n            </div>\n        </div>\n        <div class="footer-bottom">\n            <p>&copy; 2026 Christopher J Salon. All rights reserved.</p>\n        </div>\n    </div>\n</footer>\n';
  }
})();
