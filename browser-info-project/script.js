// Functions to run when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Collect and display browser information
    displayBrowserInfo();
    displayScreenInfo();
    demonstrateStringMethods();
});

function displayBrowserInfo() {
    // Operating system information
    const osInfo = getOperatingSystem();
    document.getElementById('os-info').textContent = osInfo;
    
    // Browser engine and version information
    const browserInfo = getBrowserInfo();
    document.getElementById('browser-info').textContent = browserInfo;
    
    // Language setting
    const language = navigator.language || navigator.userLanguage;
    document.getElementById('language-info').textContent = language;
    
    // Platform information
    const platform = navigator.platform;
    document.getElementById('device-info').textContent = platform.toUpperCase();
    
    // CPU core count
    const cpuCores = navigator.hardwareConcurrency || 'Unknown';
    document.getElementById('cpu-info').textContent = cpuCores + ' cores';
    
    // RAM information
    const deviceMemory = navigator.deviceMemory ? navigator.deviceMemory + ' GB' : 'Unknown';
    document.getElementById('ram-info').textContent = deviceMemory;
    
    // Cookie status
    const cookiesEnabled = navigator.cookieEnabled ? 'Enabled' : 'Disabled';
    document.getElementById('cookies-info').textContent = cookiesEnabled;
    
    // API permissions
    checkPermissions();
}

function displayScreenInfo() {
    // Viewport size
    const viewportSize = `${window.innerWidth} x ${window.innerHeight}`;
    document.getElementById('viewport-info').textContent = viewportSize;
    
    // Available screen area
    const availableScreen = `${screen.availWidth} x ${screen.availHeight}`;
    document.getElementById('available-screen-info').textContent = availableScreen;
    
    // Color depth
    const colorDepth = screen.colorDepth + ' bit';
    document.getElementById('color-depth-info').textContent = colorDepth;
    
    // Screen orientation
    const orientation = screen.orientation ? screen.orientation.type : 'Unknown';
    document.getElementById('orientation-info').textContent = orientation;
}

function getOperatingSystem() {
    const userAgent = navigator.userAgent;
    
    if (userAgent.includes('Windows')) return 'Windows';
    if (userAgent.includes('Mac')) return 'macOS';
    if (userAgent.includes('Linux')) return 'Linux';
    if (userAgent.includes('Android')) return 'Android';
    if (userAgent.includes('iPhone') || userAgent.includes('iPad')) return 'iOS';
    
    return 'Unknown';
}

function getBrowserInfo() {
    const userAgent = navigator.userAgent;
    
    if (userAgent.includes('Chrome') && !userAgent.includes('Edg')) {
        const version = userAgent.match(/Chrome\/(\d+)/);
        return `Chrome ${version ? version[1] : ''}`;
    }
    if (userAgent.includes('Firefox')) {
        const version = userAgent.match(/Firefox\/(\d+)/);
        return `Firefox ${version ? version[1] : ''}`;
    }
    if (userAgent.includes('Safari') && !userAgent.includes('Chrome')) {
        const version = userAgent.match(/Version\/(\d+)/);
        return `Safari ${version ? version[1] : ''}`;
    }
    if (userAgent.includes('Edg')) {
        const version = userAgent.match(/Edg\/(\d+)/);
        return `Edge ${version ? version[1] : ''}`;
    }
    
    return 'Unknown Browser';
}

async function checkPermissions() {
    if (!navigator.permissions) {
        document.getElementById('permissions-info').textContent = 'Not supported';
        return;
    }
    
    const permissions = ['camera', 'microphone', 'geolocation', 'notifications'];
    const results = [];
    
    for (const permission of permissions) {
        try {
            const result = await navigator.permissions.query({name: permission});
            results.push(`${permission}: ${result.state}`);
        } catch (error) {
            results.push(`${permission}: not supported`);
        }
    }
    
    document.getElementById('permissions-info').innerHTML = results.join('<br>');
}

function demonstrateStringMethods() {
    const userAgent = navigator.userAgent;
    const language = navigator.language;
    const platform = navigator.platform;
    
    // String methods analysis
    let analysis = [];
    
    // 1. .includes() - Browser type detection
    if (userAgent.includes('Chrome')) {
        analysis.push('✓ Chrome browser detected (.includes() method used)');
    }
    
    // 2. .toUpperCase() - Platform uppercase conversion
    const upperPlatform = platform.toUpperCase();
    analysis.push(`✓ Platform: "${platform}" → "${upperPlatform}" (.toUpperCase() method used)`);
    
    // 3. .slice() - Language code extraction
    const languageCode = language.slice(0, 2);
    analysis.push(`✓ Language code: ${languageCode} (.slice() method used)`);
    
    // 4. .replace() - User agent cleaning
    const cleanUserAgent = userAgent.replace(/\s+/g, ' ');
    analysis.push(`✓ User agent cleaned (.replace() method used)`);
    
    // 5. .split() - User agent splitting
    const userAgentParts = userAgent.split(' ');
    analysis.push(`✓ User agent split into ${userAgentParts.length} parts (.split() method used)`);
    
    // 6. .indexOf() - Specific string search
    const chromeIndex = userAgent.indexOf('Chrome');
    if (chromeIndex !== -1) {
        analysis.push(`✓ Chrome word found at position ${chromeIndex} (.indexOf() method used)`);
    }
    
    // 7. .trim() - Whitespace removal (example)
    const exampleString = '  Browser Analysis  ';
    const trimmedString = exampleString.trim();
    analysis.push(`✓ "${exampleString}" → "${trimmedString}" (.trim() method used)`);
    
    // Display result
    document.getElementById('string-demo-result').innerHTML = analysis.join('<br><br>');
}

// Update viewport information when window is resized
window.addEventListener('resize', function() {
    const viewportSize = `${window.innerWidth} x ${window.innerHeight}`;
    document.getElementById('viewport-info').textContent = viewportSize;
});
