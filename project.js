// Renders project.html from window.PROJECTS using the ?p=<slug> query parameter.
(function () {
  const projects = window.PROJECTS || [];
  const slug = new URLSearchParams(window.location.search).get('p');
  const index = projects.findIndex((p) => p.slug === slug);
  if (index === -1) {
    window.location.replace('index.html#FeaturedProjects');
    return;
  }
  const p = projects[index];
  const siblings = projects.filter((x) => x.group === p.group);
  const sIndex = siblings.indexOf(p);
  const section = p.group === 'featured' ? 'index.html#FeaturedProjects' : 'index.html#Projects';
  document.querySelectorAll('.pd-back').forEach((a) => { a.href = section; });
  const $ = (id) => document.getElementById(id);
  const url = (proj) => 'project.html?p=' + encodeURIComponent(proj.slug);

  document.title = p.title + ' - Eshgin';
  $('pd-name').textContent = p.title;

  const strong = document.createElement('strong');
  strong.textContent = p.subtitle + '. ';
  const light = document.createElement('span');
  light.textContent = p.summary;
  $('pd-tagline').append(strong, light);

  const fill = (id, items) => {
    const ul = $(id);
    items.forEach((text) => {
      const li = document.createElement('li');
      li.textContent = text;
      ul.appendChild(li);
    });
  };
  fill('pd-did', p.did);
  fill('pd-details', p.details);

  $('pd-live').href = p.live;
  if (p.source) {
    $('pd-source').href = p.source;
  } else {
    $('pd-source').remove();
  }

  $('pd-title').textContent = p.title;
  $('pd-year').textContent = p.year;
  p.tags.forEach((t) => {
    const span = document.createElement('span');
    span.className = 'pd-tag';
    span.textContent = t;
    $('pd-tags').appendChild(span);
  });

  $('pd-media').href = p.live;
  $('pd-img').src = p.image;
  $('pd-img').alt = p.title + ' preview';

  const pager = (id, proj, label) => {
    const a = $(id);
    a.href = url(proj);
    const small = document.createElement('span');
    small.className = 'pd-pager-label';
    small.textContent = label;
    const name = document.createElement('span');
    name.className = 'pd-pager-name';
    name.textContent = proj.title;
    a.append(small, name);
  };
  pager('pd-prev', siblings[(sIndex - 1 + siblings.length) % siblings.length], '← Previous');
  pager('pd-next', siblings[(sIndex + 1) % siblings.length], 'Next →');

  $('pd-root').hidden = false;
})();
