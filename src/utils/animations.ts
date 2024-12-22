export const createFloatingNumber = (points: number, containerId: string) => {
  const container = document.getElementById(containerId);
  if (!container) return;

  const floatingNumber = document.createElement('div');
  floatingNumber.textContent = `+${points}`;
  floatingNumber.className = 'absolute text-yellow-400 font-bold text-xl animate-float-up';
  floatingNumber.style.left = `${Math.random() * 60 + 20}%`;
  floatingNumber.style.top = `${Math.random() * 60 + 20}%`;
  
  container.appendChild(floatingNumber);
  setTimeout(() => floatingNumber.remove(), 1000);
};