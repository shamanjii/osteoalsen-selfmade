// toc.js – Inhaltsverzeichnis automatisch generieren und hervorheben

function generateTOC({
  contentSelector = '#articleContent',
  tocSelector = '#tocList',
  tocContainerSelector = '#tocSection'
} = {}) {
  const content = document.querySelector(contentSelector);
  const tocList = document.querySelector(tocSelector);
  const tocContainer = document.querySelector(tocContainerSelector);

  if (!content || !tocList || !tocContainer) return;

  const headings = content.querySelectorAll('h1, h2, h3, h4, h5, h6');
  if (!headings.length) {
    tocContainer.style.display = 'none';
    return;
  }

  tocList.innerHTML = '';

  headings.forEach((heading, index) => {
    const id = `toc-${index}-${Date.now()}`;
    heading.id = id;

    const level = parseInt(heading.tagName.slice(1));
    const li = document.createElement('li');
    const link = document.createElement('a');
    link.href = `#${id}`;
    link.textContent = heading.textContent;
    link.className = 'toc-link';
    link.style.paddingLeft = `${(level - 1) * 12}px`;
    li.appendChild(link);
    tocList.appendChild(li);
  });

  setupActiveTOC();
}

function setupActiveTOC() {
  const tocLinks = document.querySelectorAll('.toc-link');
  const headings = document.querySelectorAll('[id^="toc-"]');
  if (!tocLinks.length || !headings.length) return;

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          tocLinks.forEach(link => link.classList.remove('active'));
          const activeLink = document.querySelector(`.toc-link[href="#${entry.target.id}"]`);
          if (activeLink) activeLink.classList.add('active');
        }
      });
    },
    { rootMargin: '-40% 0px -50% 0px', threshold: 0 }
  );

  headings.forEach(h => observer.observe(h));
}

// Init nach DOM load
window.addEventListener('DOMContentLoaded', () => {
  generateTOC();
});
