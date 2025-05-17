import React, { useState } from 'react';
import { useSpeechReader, SpeechReaderOptions, SpeechReaderState } from './useSpeechReader';

export interface VoiceConfigPanelProps {
  /**
   * Opções iniciais para a síntese de voz
   */
  initialOptions?: SpeechReaderOptions;
  
  /**
   * Callback quando as opções são alteradas
   */
  onChange?: (options: SpeechReaderOptions) => void;
  
  /**
   * Classe CSS para o painel
   */
  className?: string;
  
  /**
   * Estilo inline para o painel
   */
  style?: React.CSSProperties;
  
  /**
   * Título do painel
   */
  title?: string;
  
  /**
   * Se o painel deve ser exibido inicialmente
   */
  initiallyExpanded?: boolean;
  
  /**
   * Se deve mostrar o seletor de idioma
   */
  showLanguageSelector?: boolean;
  
  /**
   * Se deve mostrar o seletor de voz
   */
  showVoiceSelector?: boolean;
  
  /**
   * Se deve mostrar o controle de velocidade
   */
  showRateControl?: boolean;
  
  /**
   * Se deve mostrar o controle de volume
   */
  showVolumeControl?: boolean;
  
  /**
   * Se deve mostrar o controle de tom
   */
  showPitchControl?: boolean;
}

/**
 * Componente para configuração das opções de síntese de voz
 */
export const VoiceConfigPanel: React.FC<VoiceConfigPanelProps> = ({
  initialOptions = {},
  onChange,
  className = '',
  style,
  title = 'Configurações de voz',
  initiallyExpanded = false,
  showLanguageSelector = true,
  showVoiceSelector = true,
  showRateControl = true,
  showVolumeControl = true,
  showPitchControl = true,
}) => {
  const [expanded, setExpanded] = useState(initiallyExpanded);
  
  const {
    voices,
    currentVoice,
    setVoice,
    setOptions
  } = useSpeechReader(initialOptions);
  
  const [rate, setRate] = useState(initialOptions.rate || 1);
  const [volume, setVolume] = useState(initialOptions.volume || 1);
  const [pitch, setPitch] = useState(initialOptions.pitch || 1);
  
  // Agrupar vozes por idioma
  const voicesByLang = voices.reduce((acc, voice) => {
    if (!acc[voice.lang]) {
      acc[voice.lang] = [];
    }
    acc[voice.lang].push(voice);
    return acc;
  }, {} as Record<string, SpeechSynthesisVoice[]>);
  
  // Lista de idiomas disponíveis
  const languages = Object.keys(voicesByLang).sort();
  
  // Idioma atual
  const [selectedLang, setSelectedLang] = useState(
    currentVoice?.lang || initialOptions.lang || 'pt-BR'
  );
  
  // Vozes disponíveis para o idioma selecionado
  const availableVoices = voicesByLang[selectedLang] || [];
  
  // Função para alterar o idioma
  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const lang = e.target.value;
    setSelectedLang(lang);
    
    // Selecionar a primeira voz disponível para o idioma
    if (voicesByLang[lang] && voicesByLang[lang].length > 0) {
      const newVoice = voicesByLang[lang][0];
      setVoice(newVoice);
      
      if (onChange) {
        onChange({
          ...initialOptions,
          lang,
          voice: newVoice,
          rate,
          volume,
          pitch
        });
      }
    }
  };
  
  // Função para alterar a voz
  const handleVoiceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const voiceURI = e.target.value;
    const newVoice = voices.find(v => v.voiceURI === voiceURI);
    
    if (newVoice) {
      setVoice(newVoice);
      
      if (onChange) {
        onChange({
          ...initialOptions,
          lang: newVoice.lang,
          voice: newVoice,
          rate,
          volume,
          pitch
        });
      }
    }
  };
  
  // Função para alterar a velocidade
  const handleRateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newRate = parseFloat(e.target.value);
    setRate(newRate);
    setOptions({ rate: newRate });
    
    if (onChange) {
      onChange({
        ...initialOptions,
        rate: newRate,
        volume,
        pitch,
        lang: selectedLang,
        voice: currentVoice || undefined
      });
    }
  };
  
  // Função para alterar o volume
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    setOptions({ volume: newVolume });
    
    if (onChange) {
      onChange({
        ...initialOptions,
        volume: newVolume,
        rate,
        pitch,
        lang: selectedLang,
        voice: currentVoice || undefined
      });
    }
  };
  
  // Função para alterar o tom
  const handlePitchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPitch = parseFloat(e.target.value);
    setPitch(newPitch);
    setOptions({ pitch: newPitch });
    
    if (onChange) {
      onChange({
        ...initialOptions,
        pitch: newPitch,
        rate,
        volume,
        lang: selectedLang,
        voice: currentVoice || undefined
      });
    }
  };
  
  return (
    <div 
      className={`react-speech-reader-config ${className}`}
      style={{
        border: '1px solid #ddd',
        borderRadius: '4px',
        padding: '8px',
        margin: '10px 0',
        backgroundColor: '#f9f9f9',
        ...style
      }}
    >
      <div 
        className="react-speech-reader-config-header"
        onClick={() => setExpanded(!expanded)}
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          cursor: 'pointer',
          userSelect: 'none',
        }}
      >
        <h3 style={{ margin: '0', fontSize: '16px' }}>{title}</h3>
        <span>{expanded ? '▼' : '►'}</span>
      </div>
      
      {expanded && (
        <div className="react-speech-reader-config-content" style={{ marginTop: '10px' }}>
          {showLanguageSelector && languages.length > 0 && (
            <div className="react-speech-reader-config-item" style={{ marginBottom: '10px' }}>
              <label 
                htmlFor="react-speech-reader-lang"
                style={{ display: 'block', marginBottom: '5px', fontSize: '14px' }}
              >
                Idioma:
              </label>
              <select
                id="react-speech-reader-lang"
                value={selectedLang}
                onChange={handleLanguageChange}
                style={{
                  width: '100%',
                  padding: '8px',
                  borderRadius: '4px',
                  border: '1px solid #ccc',
                }}
              >
                {languages.map(lang => (
                  <option key={lang} value={lang}>
                    {lang}
                  </option>
                ))}
              </select>
            </div>
          )}
          
          {showVoiceSelector && availableVoices.length > 0 && (
            <div className="react-speech-reader-config-item" style={{ marginBottom: '10px' }}>
              <label 
                htmlFor="react-speech-reader-voice"
                style={{ display: 'block', marginBottom: '5px', fontSize: '14px' }}
              >
                Voz:
              </label>
              <select
                id="react-speech-reader-voice"
                value={currentVoice?.voiceURI || ''}
                onChange={handleVoiceChange}
                style={{
                  width: '100%',
                  padding: '8px',
                  borderRadius: '4px',
                  border: '1px solid #ccc',
                }}
              >
                {availableVoices.map(voice => (
                  <option key={voice.voiceURI} value={voice.voiceURI}>
                    {voice.name} {voice.default ? '(Padrão)' : ''}
                  </option>
                ))}
              </select>
            </div>
          )}
          
          {showRateControl && (
            <div className="react-speech-reader-config-item" style={{ marginBottom: '10px' }}>
              <label 
                htmlFor="react-speech-reader-rate"
                style={{ display: 'block', marginBottom: '5px', fontSize: '14px' }}
              >
                Velocidade: {rate}x
              </label>
              <input
                id="react-speech-reader-rate"
                type="range"
                min="0.5"
                max="2"
                step="0.1"
                value={rate}
                onChange={handleRateChange}
                style={{ width: '100%' }}
              />
            </div>
          )}
          
          {showVolumeControl && (
            <div className="react-speech-reader-config-item" style={{ marginBottom: '10px' }}>
              <label 
                htmlFor="react-speech-reader-volume"
                style={{ display: 'block', marginBottom: '5px', fontSize: '14px' }}
              >
                Volume: {Math.round(volume * 100)}%
              </label>
              <input
                id="react-speech-reader-volume"
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={volume}
                onChange={handleVolumeChange}
                style={{ width: '100%' }}
              />
            </div>
          )}
          
          {showPitchControl && (
            <div className="react-speech-reader-config-item" style={{ marginBottom: '10px' }}>
              <label 
                htmlFor="react-speech-reader-pitch"
                style={{ display: 'block', marginBottom: '5px', fontSize: '14px' }}
              >
                Tom: {pitch}
              </label>
              <input
                id="react-speech-reader-pitch"
                type="range"
                min="0.5"
                max="2"
                step="0.1"
                value={pitch}
                onChange={handlePitchChange}
                style={{ width: '100%' }}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default VoiceConfigPanel;
