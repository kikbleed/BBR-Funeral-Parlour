const premiums = { 'Plan A': [[170, 200, 240], [220, 260, 300]], 'Plan A+ Plus': [[200, 250, 320], [250, 320, 400]], 'Plan B': [[250, 280, 360], [290, 370, 460]] };
const priceIds = { 'Plan A': 'price-a', 'Plan A+ Plus': 'price-plus', 'Plan B': 'price-b' };
const age = document.querySelector('#age');
const family = document.querySelector('#family');
function updatePlans() {
  const ageLabel = age.options[age.selectedIndex].text;
  const dependants = [5, 9, 13][Number(family.value)];
  Object.entries(premiums).forEach(([plan, rates]) => {
    const premium = rates[Number(age.value)][Number(family.value)];
    document.getElementById(priceIds[plan]).textContent = `R${premium}`;
    const link = Array.from(document.querySelectorAll('.plan-enquiry')).find(item => item.dataset.plan === plan);
    const message = `Hello Bontle Ba Rona, I'm interested in ${plan} for the ${ageLabel} band, main member + ${dependants} dependants, at R${premium} per month. Please help me confirm eligibility and the policy terms.`;
    link.href = `https://wa.me/27818366788?text=${encodeURIComponent(message)}`;
  });
  document.querySelectorAll('.selection-caption').forEach(item => { item.textContent = `${ageLabel} · main member + ${dependants} dependants`; });
}
age.addEventListener('change', updatePlans);
family.addEventListener('change', updatePlans);
updatePlans();
const menu = document.querySelector('.menu-toggle');
const nav = document.querySelector('#navigation');
function closeMenu() { menu.setAttribute('aria-expanded', 'false'); nav.classList.remove('open'); }
menu.addEventListener('click', () => { const open = menu.getAttribute('aria-expanded') !== 'true'; menu.setAttribute('aria-expanded', String(open)); nav.classList.toggle('open', open); });
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });
const dialog = document.querySelector('#flyer-dialog');
document.querySelectorAll('[data-flyer]').forEach(button => button.addEventListener('click', () => {
  const src = `assets/${button.dataset.flyer}`;
  document.querySelector('#flyer-title').textContent = button.dataset.title;
  document.querySelector('#flyer-image').src = src;
  document.querySelector('#flyer-image').alt = button.dataset.title + ' with the original benefits, rates and contact details';
  document.querySelector('#download-flyer').href = src;
  dialog.showModal();
}));
document.querySelector('#close-dialog').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => { if (event.target === dialog) { const bounds = dialog.getBoundingClientRect(); if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close(); } });
document.querySelector('#enquiry-form').addEventListener('submit', event => { event.preventDefault(); const topic = document.querySelector('#topic').value; window.location.href = `https://wa.me/27818366788?text=${encodeURIComponent(`Hello Bontle Ba Rona, I'd like help with: ${topic}.`)}`; });
document.querySelector('#year').textContent = new Date().getFullYear();
