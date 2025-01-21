# Ping Active Page Health Check

## Description
This is a Chrome extension that allows you to check the health status of websites by measuring their response time and availability. The website health is classified into three levels:
- **Good (Green)**: The website response is fast (less than 2 seconds).
- **Average (Yellow)**: The website response is moderate (between 2 and 5 seconds).
- **Poor (Red)**: The website response is slow (more than 5 seconds).
- **Error (Gray)**: An error occurred while trying to connect (e.g., the website is unreachable or the server returns an error).

### Features:
- Check the health of the active webpage.
- Display a color-coded status depending on the website's response time.
- Provide a detailed error message if the site is unreachable or an issue occurs.

## Installation

### 1. Download the Extension

1. Clone or download this repository to your computer.
2. Open the **Google Chrome** browser.
3. Go to the **Extensions** page:  
   `chrome://extensions/`
4. Enable **Developer Mode** in the top right corner.
5. Click on the **"Load unpacked"** button.
6. Select the folder where you downloaded the extension files.

### 2. Using the Extension

1. After the extension is installed, you will see an icon in the Chrome toolbar.
2. Click on the icon to open the popup.
3. Press the **"Check Site Health"** button to check the active website.
4. The status of the website will be displayed with a color indicator:
   - **Green**: Good health status (response time < 2 seconds).
   - **Yellow**: Average health status (response time between 2 and 5 seconds).
   - **Red**: Poor health status (response time > 5 seconds).
   - **Gray**: Error (e.g., site is unreachable or server returns an error).

## Project Structure


### 1. `manifest.json`

This file contains the configuration and permissions required for the extension. It defines the necessary permissions to access websites and interact with them.

### 2. `background.js`

This file contains the main logic for making an HTTP request (using the `HEAD` method) to the active webpage and determining the response time to classify the health of the website.

### 3. `popup.html`

This file handles the user interface of the extension. It provides a simple window with a button to trigger the site health check and fields to display the status and any error message.

### 4. `popup.js`

This file handles the events within the popup, sending the health check request and updating the UI based on the response received.

## How It Works

1. **Checking the Website Health:**
   The extension sends a `HEAD` request to the active webpage to check its availability and response time. If the request succeeds, the response time is measured and the website is classified into one of the three health statuses: **Good**, **Average**, or **Poor**.
   
2. **Error Handling:**
   If the website is unavailable or there is another issue (e.g., server error), the extension will display an error message with a description of the issue, such as:
   - "Site not found (404)"
   - "Forbidden (403)"
   - "Internal Server Error (500)"
   - "Network Error or Site is Unreachable"

3. **Popup Interface:**
   When the user clicks the extension icon, a popup appears with a button to check the active website. The status is then displayed with a color indicator:
   - **Green**: Good response (under 2 seconds).
   - **Yellow**: Moderate response (2 to 5 seconds).
   - **Red**: Slow response (over 5 seconds).
   - **Gray**: Error (website not accessible or another issue).

## License

This project is licensed under the [MIT License](LICENSE).
