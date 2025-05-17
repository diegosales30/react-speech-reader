import React, { ReactNode } from 'react';
import { useSpeechReader, SpeechReaderOptions } from './useSpeechReader';

export interface ReadAloudProps {
  /**
   * Texto a ser lido em voz alta
   */
  text: string;
  
  /**
   * Opções para a síntese de voz
   */
  options?: SpeechReaderOptions;
  
  /**
   * Classe CSS para o botão
   */
  className?: string;
  
  /**
   * Estilo inline para o botão
   */
  style?: React.CSSProperties;
  
  /**
   * Conteúdo personalizado para o botão
   */
  children?: ReactNode;
  
  /**
   * Texto alternativo para o botão quando estiver falando
   */
  speakingText?: string;
  
  /**
   * Texto alternativo para o botão quando estiver pausado
   */
  pausedText?: string;
  
  /**
   * Ícone para o botão quando não estiver falando
   */
  icon?: ReactNode;
  
  /**
   * Ícone para o botão quando estiver falando
   */
  speakingIcon?: ReactNode;
  
  /**
   * Ícone para o botão quando estiver pausado
   */
  pausedIcon?: ReactNode;
}

/**
 * Componente para leitura de texto em voz alta
 */
export const ReadAloud: React.FC<ReadAloudProps> = ({
  text,
  options,
  className = '',
  style,
  children,
  speakingText = 'Parar leitura',
  pausedText = 'Continuar leitura',
  icon = '🔊',
  speakingIcon = '⏹️',
  pausedIcon = '▶️',
}) => {
  const {
    speaking,
    paused,
    speak,
    pause,
    resume,
    stop
  } = useSpeechReader(options);
  
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
  
  const handleStop = (e: React.MouseEvent) => {
    e.stopPropagation();
    stop();
  };
  
  // Determina o texto e ícone a serem exibidos
  const buttonText = speaking
    ? (paused ? pausedText : speakingText)
    : (children || 'Ouvir texto');
  
  const buttonIcon = speaking
    ? (paused ? pausedIcon : speakingIcon)
    : icon;
  
  return (
    <div className={`react-speech-accessibility ${className}`} style={{ display: 'inline-block', ...style }}>
      <button
        onClick={handleClick}
        aria-label={speaking ? (paused ? 'Continuar leitura' : 'Pausar leitura') : 'Ouvir texto'}
        className="react-speech-accessibility-button"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '8px 16px',
          border: '1px solid #ccc',
          borderRadius: '4px',
          backgroundColor: '#f5f5f5',
          cursor: 'pointer',
          fontSize: '14px',
        }}
      >
        <span className="react-speech-accessibility-icon">{buttonIcon}</span>
        <span className="react-speech-accessibility-text">{buttonText}</span>
      </button>
      
      {speaking && !paused && (
        <button
          onClick={handleStop}
          aria-label="Interromper leitura"
          className="react-speech-accessibility-stop"
          style={{
            marginLeft: '8px',
            padding: '8px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            backgroundColor: '#f5f5f5',
            cursor: 'pointer',
          }}
        >
          ⏹️
        </button>
      )}
    </div>
  );
};

export default ReadAloud;
