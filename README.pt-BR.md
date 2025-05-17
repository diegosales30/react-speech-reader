# React Speech Reader

Uma biblioteca React para leitura de texto em voz alta, utilizando a Web Speech API para criar sites mais acessíveis.

## Características

- 🔊 **Leitura de texto em voz alta** com um simples clique
- 🌐 **Suporte a múltiplos idiomas** e vozes
- ⚙️ **Controles avançados** para velocidade, volume e tom
- 🎛️ **Painel de configuração** para personalização da experiência de voz
- ♿ **Acessibilidade aprimorada** com suporte a teclado e leitores de tela
- 🎨 **Botões personalizáveis** para se adequar ao design do seu site

## Instalação

```bash
npm install react-speech-accessibility
# ou
yarn add react-speech-accessibility
```

## Uso Básico

```jsx
import React from 'react';
import { ReadAloud } from 'react-speech-accessibility';

function App() {
  return (
    <div>
      <h1>Bem-vindo ao meu site!</h1>
      <p>Este é um exemplo de texto que pode ser lido em voz alta.</p>
      
      <ReadAloud text="Este é um exemplo de texto que pode ser lido em voz alta." />
    </div>
  );
}
```

## Componentes Disponíveis

### 1. ReadAloud

O componente principal para leitura de texto.

```jsx
import { ReadAloud } from 'react-speech-accessibility';

// Uso básico
<ReadAloud text="Texto a ser lido em voz alta" />

// Uso com opções personalizadas
<ReadAloud 
  text="Texto a ser lido em voz alta" 
  options={{ 
    rate: 1.2, 
    pitch: 1.1, 
    lang: 'pt-BR' 
  }}
  icon="🎧"
  speakingIcon="⏹️"
  pausedIcon="▶️"
/>
```

#### Props

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `text` | string | - | Texto a ser lido em voz alta (obrigatório) |
| `options` | object | `{}` | Opções para a síntese de voz |
| `className` | string | `''` | Classe CSS para o botão |
| `style` | object | `{}` | Estilo inline para o botão |
| `children` | ReactNode | `'Ouvir texto'` | Conteúdo personalizado para o botão |
| `speakingText` | string | `'Parar leitura'` | Texto alternativo para o botão quando estiver falando |
| `pausedText` | string | `'Continuar leitura'` | Texto alternativo para o botão quando estiver pausado |
| `icon` | ReactNode | `'🔊'` | Ícone para o botão quando não estiver falando |
| `speakingIcon` | ReactNode | `'⏹️'` | Ícone para o botão quando estiver falando |
| `pausedIcon` | ReactNode | `'▶️'` | Ícone para o botão quando estiver pausado |

### 2. VoiceConfigPanel

Painel de configuração para personalizar as opções de voz.

```jsx
import { VoiceConfigPanel, useSpeechReader } from 'react-speech-accessibility';

function MyComponent() {
  const speechReader = useSpeechReader();
  
  return (
    <div>
      <VoiceConfigPanel 
        initialOptions={{ rate: 1.2, volume: 0.8 }}
        onChange={(options) => console.log('Opções atualizadas:', options)}
        title="Configurações de Áudio"
        initiallyExpanded={true}
      />
      
      <button onClick={() => speechReader.speak('Texto de exemplo')}>
        Testar voz
      </button>
    </div>
  );
}
```

#### Props

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `initialOptions` | object | `{}` | Opções iniciais para a síntese de voz |
| `onChange` | function | - | Callback quando as opções são alteradas |
| `className` | string | `''` | Classe CSS para o painel |
| `style` | object | `{}` | Estilo inline para o painel |
| `title` | string | `'Configurações de voz'` | Título do painel |
| `initiallyExpanded` | boolean | `false` | Se o painel deve ser exibido inicialmente |
| `showLanguageSelector` | boolean | `true` | Se deve mostrar o seletor de idioma |
| `showVoiceSelector` | boolean | `true` | Se deve mostrar o seletor de voz |
| `showRateControl` | boolean | `true` | Se deve mostrar o controle de velocidade |
| `showVolumeControl` | boolean | `true` | Se deve mostrar o controle de volume |
| `showPitchControl` | boolean | `true` | Se deve mostrar o controle de tom |

### 3. useSpeechReader (Hook)

Hook para utilizar a Web Speech API diretamente.

```jsx
import { useSpeechReader } from 'react-speech-accessibility';

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
    lang: 'pt-BR',
    rate: 1.2,
    volume: 0.8,
    pitch: 1.1,
    onStart: () => console.log('Iniciou a fala'),
    onEnd: () => console.log('Terminou a fala')
  });
  
  return (
    <div>
      <button onClick={() => speak('Olá, mundo!')}>Falar</button>
      {speaking && (
        <>
          <button onClick={pause}>Pausar</button>
          <button onClick={stop}>Parar</button>
        </>
      )}
      {paused && (
        <button onClick={resume}>Continuar</button>
      )}
    </div>
  );
}
```

#### Opções

| Opção | Tipo | Padrão | Descrição |
|-------|------|--------|-----------|
| `lang` | string | `'pt-BR'` | Idioma para a síntese de voz |
| `rate` | number | `1` | Velocidade da fala (0.1 a 10) |
| `volume` | number | `1` | Volume da fala (0 a 1) |
| `pitch` | number | `1` | Tom da voz (-10 a 10) |
| `voice` | SpeechSynthesisVoice | - | Voz específica a ser usada |
| `onStart` | function | - | Callback executado quando a fala começa |
| `onPause` | function | - | Callback executado quando a fala é pausada |
| `onResume` | function | - | Callback executado quando a fala é resumida |
| `onStop` | function | - | Callback executado quando a fala é interrompida |
| `onEnd` | function | - | Callback executado quando a fala termina |
| `onError` | function | - | Callback executado quando ocorre um erro |

#### Retorno

| Propriedade | Tipo | Descrição |
|-------------|------|-----------|
| `speaking` | boolean | Indica se a síntese de voz está falando |
| `paused` | boolean | Indica se a síntese de voz está pausada |
| `voices` | array | Lista de vozes disponíveis |
| `currentVoice` | object | Voz atual selecionada |
| `speak` | function | Inicia a leitura do texto fornecido |
| `pause` | function | Pausa a leitura atual |
| `resume` | function | Retoma a leitura pausada |
| `stop` | function | Interrompe a leitura atual |
| `setOptions` | function | Altera as opções de leitura |
| `setVoice` | function | Altera a voz atual |

## Exemplos Avançados

### Exemplo 1: Componente com Painel de Configuração

```jsx
import React, { useState } from 'react';
import { ReadAloud, VoiceConfigPanel, useSpeechReader } from 'react-speech-accessibility';

function TextReader() {
  const [options, setOptions] = useState({
    lang: 'pt-BR',
    rate: 1,
    volume: 1,
    pitch: 1
  });
  
  return (
    <div className="text-reader">
      <h2>Leitor de Texto</h2>
      
      <div className="content">
        <p>
          Este é um exemplo de texto que pode ser lido em voz alta.
          Você pode personalizar as configurações de voz usando o painel abaixo.
        </p>
      </div>
      
      <div className="controls">
        <ReadAloud 
          text="Este é um exemplo de texto que pode ser lido em voz alta. Você pode personalizar as configurações de voz usando o painel abaixo."
          options={options}
          className="custom-button"
          style={{ marginBottom: '20px' }}
        />
        
        <VoiceConfigPanel
          initialOptions={options}
          onChange={setOptions}
          title="Personalizar Voz"
        />
      </div>
    </div>
  );
}
```

### Exemplo 2: Botão Totalmente Personalizado

```jsx
import React from 'react';
import { useSpeechReader } from 'react-speech-accessibility';

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
        aria-label={speaking ? (paused ? 'Continuar leitura' : 'Pausar leitura') : 'Ouvir texto'}
      >
        {speaking ? (
          paused ? (
            <span className="icon">▶️ Continuar</span>
          ) : (
            <span className="icon">⏸️ Pausar</span>
          )
        ) : (
          <span className="icon">🎧 Ouvir</span>
        )}
      </button>
      
      {speaking && !paused && (
        <button 
          onClick={stop}
          className="stop-button"
          aria-label="Interromper leitura"
        >
          <span className="icon">⏹️ Parar</span>
        </button>
      )}
    </div>
  );
}
```

## Compatibilidade com Navegadores

A biblioteca utiliza a Web Speech API, que é suportada pela maioria dos navegadores modernos:

- Chrome (desktop e Android)
- Edge
- Safari (desktop e iOS)
- Firefox
- Opera

Verifique a [compatibilidade atual da Web Speech API](https://caniuse.com/?search=speech%20synthesis) para mais detalhes.


## Licença

MIT
