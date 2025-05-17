import React from 'react';

// Exemplo de uso básico
export function BasicExample() {
  return (
    <div className="example">
      <h2>Exemplo Básico</h2>
      <p>Este é um exemplo simples de como usar o componente ReadAloud.</p>
      
      {/* Importe o componente ReadAloud e passe o texto a ser lido */}
      {/* 
      import { ReadAloud } from 'react-speech-reader';
      
      <ReadAloud text="Este é um exemplo de texto que pode ser lido em voz alta." />
      */}
    </div>
  );
}

// Exemplo com configurações personalizadas
export function CustomOptionsExample() {
  return (
    <div className="example">
      <h2>Exemplo com Opções Personalizadas</h2>
      <p>Este exemplo mostra como personalizar as opções de leitura.</p>
      
      {/* 
      import { ReadAloud } from 'react-speech-reader';
      
      <ReadAloud 
        text="Este texto será lido com velocidade mais rápida e em inglês."
        options={{
          rate: 1.2,
          pitch: 1.1,
          lang: 'en-US'
        }}
        icon="🎧"
        speakingIcon="⏹️"
        pausedIcon="▶️"
      />
      */}
    </div>
  );
}

// Exemplo com painel de configuração
export function ConfigPanelExample() {
  return (
    <div className="example">
      <h2>Exemplo com Painel de Configuração</h2>
      <p>Este exemplo mostra como integrar o painel de configuração de voz.</p>
      
      {/* 
      import React, { useState } from 'react';
      import { ReadAloud, VoiceConfigPanel } from 'react-speech-reader';
      
      function ConfigExample() {
        const [options, setOptions] = useState({
          lang: 'pt-BR',
          rate: 1,
          volume: 1,
          pitch: 1
        });
        
        return (
          <div>
            <ReadAloud 
              text="Este texto pode ser lido com as configurações personalizadas abaixo."
              options={options}
            />
            
            <VoiceConfigPanel
              initialOptions={options}
              onChange={setOptions}
              title="Personalizar Voz"
              initiallyExpanded={true}
            />
          </div>
        );
      }
      */}
    </div>
  );
}

// Exemplo com hook personalizado
export function CustomHookExample() {
  return (
    <div className="example">
      <h2>Exemplo com Hook Personalizado</h2>
      <p>Este exemplo mostra como usar o hook useSpeechReader diretamente.</p>
      
      {/* 
      import React from 'react';
      import { useSpeechReader } from 'react-speech-reader';
      
      function HookExample() {
        const {
          speaking,
          paused,
          speak,
          pause,
          resume,
          stop
        } = useSpeechReader({
          lang: 'pt-BR',
          rate: 1.2,
          onStart: () => console.log('Iniciou a fala'),
          onEnd: () => console.log('Terminou a fala')
        });
        
        return (
          <div>
            <button onClick={() => speak('Este texto está sendo lido usando o hook diretamente.')}>
              Falar
            </button>
            
            {speaking && !paused && (
              <button onClick={pause}>Pausar</button>
            )}
            
            {paused && (
              <button onClick={resume}>Continuar</button>
            )}
            
            {speaking && (
              <button onClick={stop}>Parar</button>
            )}
          </div>
        );
      }
      */}
    </div>
  );
}

// Exemplo com botão totalmente personalizado
export function FullyCustomButtonExample() {
  return (
    <div className="example">
      <h2>Exemplo com Botão Totalmente Personalizado</h2>
      <p>Este exemplo mostra como criar um botão de leitura totalmente personalizado.</p>
      
      {/* 
      import React from 'react';
      import { useSpeechReader } from 'react-speech-reader';
      
      function CustomButton({ text }) {
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
          <div className="custom-voice-controls">
            <button 
              onClick={handleClick}
              className={`custom-voice-button ${speaking ? 'speaking' : ''} ${paused ? 'paused' : ''}`}
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
                className="custom-stop-button"
                aria-label="Interromper leitura"
              >
                <span className="icon">⏹️ Parar</span>
              </button>
            )}
          </div>
        );
      }
      */}
    </div>
  );
}
