(function(){
  'use strict';
  const form = document.querySelector('[data-roi-form]');
  if (!form) return;
  const result = document.querySelector('[data-roi-result]');
  const monthly = document.querySelector('[data-roi-monthly]');
  const yearly = document.querySelector('[data-roi-yearly]');
  function calculate(){
    const minutes = Math.max(0, Number(form.elements.minutes.value || 0));
    const days = Math.max(0, Number(form.elements.days.value || 0));
    const people = Math.max(1, Number(form.elements.people.value || 1));
    const hourly = Math.max(0, Number(form.elements.hourly.value || 0));
    const monthlyHours = minutes * days * people / 60;
    const monthlyValue = Math.round(monthlyHours * hourly);
    monthly.textContent = monthlyHours.toFixed(1) + '時間';
    yearly.textContent = '年間換算 約' + Math.round(monthlyValue * 12).toLocaleString('ja-JP') + '円相当';
    result.setAttribute('aria-live','polite');
  }
  form.addEventListener('input', calculate);
  calculate();
})();
