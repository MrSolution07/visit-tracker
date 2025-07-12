export function showLiveVisitors() {
    listenForLiveVisits((data) => {
      const counter = document.getElementById('live-counter');
      if (counter) counter.textContent = data.count;
    });
  }