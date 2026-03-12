import { Linking } from 'react-native';

export const openStreamInBrowser = async (streamUrl: string) => {
  try {
    const supported = await Linking.canOpenURL(streamUrl);
    if (supported) {
      await Linking.openURL(streamUrl);
      return true;
    } else {
      console.error('Cannot open URL:', streamUrl);
      return false;
    }
  } catch (error) {
    console.error('Error opening URL:', error);
    return false;
  }
};

export const getStreamingAlternatives = (streamUrl: string) => {
  // Extract domain for better error messages
  const domain = new URL(streamUrl).hostname;
  
  return {
    domain,
    isKnownBlockingDomain: [
      'dlstreams.top',
      'embedsports.me',
      'embedsports.top',
      'streameast.live',
      'crackstreams.com'
    ].includes(domain),
    suggestions: [
      'Open in external browser',
      'Use a different streaming source',
      'Check if the stream supports direct video URLs',
      'Consider using a WebView with custom user agent'
    ]
  };
};

export const buildDirectVideoHtml = (videoUrl: string): string => {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          html, body { width: 100%; height: 100%; background: #000; }
          video { width: 100%; height: 100%; object-fit: contain; }
        </style>
      </head>
      <body>
        <video 
          controls 
          autoplay 
          playsinline 
          src="${videoUrl}"
          onloadstart="console.log('Video load started')"
          oncanplay="console.log('Video can play')"
          onerror="console.error('Video error:', event)"
        >
          Your browser does not support the video tag.
        </video>
      </body>
    </html>
  `;
};