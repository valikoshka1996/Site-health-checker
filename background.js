chrome.runtime.onInstalled.addListener(() => {
  console.log("Ping Active Page Extension Installed");
});

// Функція для перевірки доступності сайту через HTTP запит
async function checkSiteHealth(url) {
  const startTime = Date.now();

  try {
    const response = await fetch(url, {
      method: 'HEAD', // Мінімальний запит для тесту часу
      mode: 'no-cors', // Дозволяє уникнути блокування CORS, якщо сервер не налаштований для цього
    });

    const responseTime = Date.now() - startTime;
    let healthStatus = "Good"; // початковий статус
    let color = "green"; // колір по замовчуванню
    let errorMessage = "";

    if (responseTime < 2000) {
      healthStatus = "Good";
      color = "green";
    } else if (responseTime >= 2000 && responseTime <= 5000) {
      healthStatus = "Average";
      color = "yellow";
    } else {
      healthStatus = "Poor";
      color = "red";
    }

    return { healthStatus, color, responseTime, errorMessage };

  } catch (error) {
    let errorMessage = "An unknown error occurred.";
    if (error.name === "TypeError") {
      errorMessage = "Network Error or Site is Unreachable.";
    } else if (error.message.includes("404")) {
      errorMessage = "Site not found (404).";
    } else if (error.message.includes("403")) {
      errorMessage = "Forbidden (403). Access to the site is restricted.";
    } else if (error.message.includes("500")) {
      errorMessage = "Internal Server Error (500). The server encountered an issue.";
    }

    console.error(`Error checking site health: ${url}`, error);
    return { healthStatus: "Error", color: "gray", responseTime: null, errorMessage };
  }
}

// Обробка запиту від popup.js
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'checkHealth' && message.url) {
    checkSiteHealth(message.url).then(result => {
      sendResponse(result);
    });
    return true; // даємо можливість асинхронного відповіді
  }
});
