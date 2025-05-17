# React Speech Reader

A React library for reading text aloud, using the Web Speech API to create more accessible websites.

## Features

- 🔊 **Text-to-speech reading** with a simple click
- 🌐 **Support for multiple languages** and voices
- ⚙️ **Advanced controls** for speed, volume, and pitch
- 🎛️ **Configuration panel** for customizing the voice experience
- ♿ **Enhanced accessibility** with keyboard and screen reader support
- 🎨 **Customizable buttons** to match your website's design

## Installation

```bash
npm install react-speech-reader
# or
yarn add react-speech-reader
```

## Basic Usage

```jsx
import React from 'react';
import { ReadAloud } from 'react-speech-reader';

function App() {
  return (
    <div>
      <h1>Welcome to my website!</h1>
      <p>This is an example of text that can be read aloud.</p>
      
      <ReadAloud text="This is an example of text that can be read aloud." />
    </div>
  );
}
```

## Available Components

### 1. ReadAloud

The main component for reading text aloud.

```jsx
import { ReadAloud } from 'react-speech-reader';

// Basic usage
<ReadAloud text="Text to be read aloud" />

// Usage with custom options
<ReadAloud 
  text="Text to be read aloud" 
  options={{ 
    rate: 1.2, 
    pitch: 1.1, 
    lang: 'en-US' 
  }}
  icon="🎧"
  speakingIcon="⏹️"
  pausedIcon="▶️"
/>
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `text` | string | - | Text to be read aloud (required) |
| `options` | object | `{}` | Options for speech synthesis |
| `className` | string | `''` | CSS class for the button |
| `style` | object | `{}` | Inline style for the button |
| `children` | ReactNode | `'Listen'` | Custom content for the button |
| `speakingText` | string | `'Stop reading'` | Alternative text for the button when speaking |
| `pausedText` | string | `'Continue reading'` | Alternative text for the button when paused |
| `icon` | ReactNode | `'🔊'` | Icon for the button when not speaking |
| `speakingIcon` | ReactNode | `'⏹️'` | Icon for the button when speaking |
| `pausedIcon` | ReactNode | `'▶️'` | Icon for the button when paused |

### 2. VoiceConfigPanel

Configuration panel to customize voice options.

```jsx
import { VoiceConfigPanel, useSpeechReader } from 'react-speech-reader';

function MyComponent() {
  const speechReader = useSpeechReader();
  
  return (
    <div>
      <VoiceConfigPanel 
        initialOptions={{ rate: 1.2, volume: 0.8 }}
        onChange={(options) => console.log('Updated options:', options)}
        title="Audio Settings"
        initiallyExpanded={true}
      />
      
      <button onClick={() => speechReader.speak('Example text')}>
        Test voice
      </button>
    </div>
  );
}
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `initialOptions` | object | `{}` | Initial options for speech synthesis |
| `onChange` | function | - | Callback when options are changed |
| `className` | string | `''` | CSS class for the panel |
| `style` | object | `{}` | Inline style for the panel |
| `title` | string | `'Voice Settings'` | Panel title |
| `initiallyExpanded` | boolean | `false` | Whether the panel should be initially displayed |
| `showLanguageSelector` | boolean | `true` | Whether to show the language selector |
| `showVoiceSelector` | boolean | `true` | Whether to show the voice selector |
| `showRateControl` | boolean | `true` | Whether to show the speed control |
| `showVolumeControl` | boolean | `true` | Whether to show the volume control |
| `showPitchControl` | boolean | `true` | Whether to show the pitch control |

### 3. useSpeechReader (Hook)

Hook to use the Web Speech API directly.

```jsx
import { useSpeechReader } from 'react-speech-reader';

function MyComponent() {
  const {
    speaking,
    paused,
    voices,
    currentVoice,
    speak,
    pause,
    resume,
    stop,
    setOptions,
    setVoice
  } = useSpeechReader({
    lang: 'en-US',
    rate: 1.2,
    volume: 0.8,
    pitch: 1.1,
    onStart: () => console.log('Started speaking'),
    onEnd: () => console.log('Finished speaking')
  });
  
  return (
    <div>
      <button onClick={() => speak('Hello, world!')}>Speak</button>
      {speaking && (
        <>
          <button onClick={pause}>Pause</button>
          <button onClick={stop}>Stop</button>
        </>
      )}
      {paused && (
        <button onClick={resume}>Resume</button>
      )}
    </div>
  );
}
```

#### Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `lang` | string | `'en-US'` | Language for speech synthesis |
| `rate` | number | `1` | Speech rate (0.1 to 10) |
| `volume` | number | `1` | Speech volume (0 to 1) |
| `pitch` | number | `1` | Voice pitch (-10 to 10) |
| `voice` | SpeechSynthesisVoice | - | Specific voice to be used |
| `onStart` | function | - | Callback executed when speech starts |
| `onPause` | function | - | Callback executed when speech is paused |
| `onResume` | function | - | Callback executed when speech is resumed |
| `onStop` | function | - | Callback executed when speech is stopped |
| `onEnd` | function | - | Callback executed when speech ends |
| `onError` | function | - | Callback executed when an error occurs |

#### Return

| Property | Type | Description |
|----------|------|-------------|
| `speaking` | boolean | Indicates if speech synthesis is speaking |
| `paused` | boolean | Indicates if speech synthesis is paused |
| `voices` | array | List of available voices |
| `currentVoice` | object | Currently selected voice |
| `speak` | function | Starts reading the provided text |
| `pause` | function | Pauses the current reading |
| `resume` | function | Resumes the paused reading |
| `stop` | function | Stops the current reading |
| `setOptions` | function | Changes the reading options |
| `setVoice` | function | Changes the current voice |

## Advanced Examples

### Example 1: Component with Configuration Panel

```jsx
import React, { useState } from 'react';
import { ReadAloud, VoiceConfigPanel, useSpeechReader } from 'react-speech-reader';

function TextReader() {
  const [options, setOptions] = useState({
    lang: 'en-US',
    rate: 1,
    volume: 1,
    pitch: 1
  });
  
  return (
    <div className="text-reader">
      <h2>Text Reader</h2>
      
      <div className="content">
        <p>
          This is an example of text that can be read aloud.
          You can customize the voice settings using the panel below.
        </p>
      </div>
      
      <div className="controls">
        <ReadAloud 
          text="This is an example of text that can be read aloud. You can customize the voice settings using the panel below."
          options={options}
          className="custom-button"
          style={{ marginBottom: '20px' }}
        />
        
        <VoiceConfigPanel
          initialOptions={options}
          onChange={setOptions}
          title="Customize Voice"
        />
      </div>
    </div>
  );
}
```

### Example 2: Fully Customized Button

```jsx
import React from 'react';
import { useSpeechReader } from 'react-speech-reader';

function CustomVoiceButton({ text }) {
  const { speaking, paused, speak, pause, resume, stop } = useSpeechReader();
  
  const handleClick = () => {
    if (speaking) {
      if (paused) {
        resume();
      } else {
        pause();
      }
    } else {
      speak(text);
    }
  };
  
  return (
    <div className="voice-controls">
      <button 
        onClick={handleClick}
        className={`voice-button ${speaking ? 'speaking' : ''} ${paused ? 'paused' : ''}`}
        aria-label={speaking ? (paused ? 'Continue reading' : 'Pause reading') : 'Listen to text'}
      >
        {speaking ? (
          paused ? (
            <span className="icon">▶️ Continue</span>
          ) : (
            <span className="icon">⏸️ Pause</span>
          )
        ) : (
          <span className="icon">🎧 Listen</span>
        )}
      </button>
      
      {speaking && !paused && (
        <button 
          onClick={stop}
          className="stop-button"
          aria-label="Stop reading"
        >
          <span className="icon">⏹️ Stop</span>
        </button>
      )}
    </div>
  );
}
```

## Browser Compatibility

This library uses the Web Speech API, which is supported by most modern browsers:

- Chrome (desktop and Android)
- Edge
- Safari (desktop and iOS)
- Firefox
- Opera

Check the [current compatibility of the Web Speech API](https://caniuse.com/?search=speech%20synthesis) for more details.

## License

MIT
