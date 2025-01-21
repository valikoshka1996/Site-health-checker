document.getElementById('pingButton').addEventListener('click', () => {
  // Отримуємо активну вкладку через chrome.tabs
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const activeTab = tabs[0];
    if (activeTab.url) {
      // Відправляємо запит для перевірки здоров'я сайту
      chrome.runtime.sendMessage({ action: 'checkHealth', url: activeTab.url }, (response) => {
        const healthStatusDiv = document.getElementById('healthStatus');
        const errorDescriptionDiv = document.getElementById('errorDescription');

        healthStatusDiv.textContent = `${response.healthStatus} - Response time: ${response.responseTime ? response.responseTime + ' ms' : 'N/A'}`;
        healthStatusDiv.style.backgroundColor = response.color;

        if (response.healthStatus === "Error") {
          errorDescriptionDiv.textContent = `Error: ${response.errorMessage}`;
        } else {
          errorDescriptionDiv.textContent = ''; // Очищаємо опис помилки, якщо все гаразд
        }
      });
    }
  });
});
