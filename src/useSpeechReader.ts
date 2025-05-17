import { useState, useCallback, useEffect, useRef } from 'react';

export interface SpeechReaderOptions {
  /**
   * Idioma para a síntese de voz
   * @default 'pt-BR'
   */
  lang?: string;
  
  /**
   * Velocidade da fala (0.1 a 10)
   * @default 1
   */
  rate?: number;
  
  /**
   * Volume da fala (0 a 1)
   * @default 1
   */
  volume?: number;
  
  /**
   * Tom da voz (-10 a 10)
   * @default 1
   */
  pitch?: number;
  
  /**
   * Voz específica a ser usada
   */
  voice?: SpeechSynthesisVoice;
  
  /**
   * Callback executado quando a fala começa
   */
  onStart?: () => void;
  
  /**
   * Callback executado quando a fala é pausada
   */
  onPause?: () => void;
  
  /**
   * Callback executado quando a fala é resumida
   */
  onResume?: () => void;
  
  /**
   * Callback executado quando a fala é interrompida
   */
  onStop?: () => void;
  
  /**
   * Callback executado quando a fala termina
   */
  onEnd?: () => void;
  
  /**
   * Callback executado quando ocorre um erro
   */
  onError?: (error: SpeechSynthesisErrorEvent) => void;
}

export interface SpeechReaderState {
  /**
   * Indica se a síntese de voz está falando
   */
  speaking: boolean;
  
  /**
   * Indica se a síntese de voz está pausada
   */
  paused: boolean;
  
  /**
   * Lista de vozes disponíveis
   */
  voices: SpeechSynthesisVoice[];
  
  /**
   * Voz atual selecionada
   */
  currentVoice: SpeechSynthesisVoice | null;
}

export interface SpeechReaderControls {
  /**
   * Inicia a leitura do texto fornecido
   */
  speak: (text: string) => void;
  
  /**
   * Pausa a leitura atual
   */
  pause: () => void;
  
  /**
   * Retoma a leitura pausada
   */
  resume: () => void;
  
  /**
   * Interrompe a leitura atual
   */
  stop: () => void;
  
  /**
   * Altera as opções de leitura
   */
  setOptions: (options: Partial<SpeechReaderOptions>) => void;
  
  /**
   * Altera a voz atual
   */
  setVoice: (voice: SpeechSynthesisVoice) => void;
}

/**
 * Hook para utilizar a Web Speech API para síntese de voz
 * @param options Opções de configuração para a síntese de voz
 * @returns Estado e controles para a síntese de voz
 */
export function useSpeechReader(options: SpeechReaderOptions = {}): SpeechReaderControls & SpeechReaderState {
  // Verificar se a API está disponível no navegador
  const speechSynthesisAvailable = typeof window !== 'undefined' && 'speechSynthesis' in window;
  
  // Estado para controlar se está falando ou pausado
  const [speaking, setSpeaking] = useState<boolean>(false);
  const [paused, setPaused] = useState<boolean>(false);
  
  // Estado para armazenar as vozes disponíveis
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [currentVoice, setCurrentVoice] = useState<SpeechSynthesisVoice | null>(null);
  
  // Referência para as opções atuais
  const optionsRef = useRef<SpeechReaderOptions>({
    lang: 'pt-BR',
    rate: 1,
    volume: 1,
    pitch: 1,
    ...options
  });
  
  // Referência para a utterance atual
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  
  // Função para atualizar as opções
  const setOptions = useCallback((newOptions: Partial<SpeechReaderOptions>) => {
    optionsRef.current = {
      ...optionsRef.current,
      ...newOptions
    };
    
    // Se houver uma utterance ativa, atualiza suas propriedades
    if (utteranceRef.current) {
      if (newOptions.rate !== undefined) utteranceRef.current.rate = newOptions.rate;
      if (newOptions.pitch !== undefined) utteranceRef.current.pitch = newOptions.pitch;
      if (newOptions.volume !== undefined) utteranceRef.current.volume = newOptions.volume;
      if (newOptions.lang !== undefined) utteranceRef.current.lang = newOptions.lang;
      if (newOptions.voice !== undefined) utteranceRef.current.voice = newOptions.voice;
    }
  }, []);
  
  // Função para definir a voz atual
  const setVoice = useCallback((voice: SpeechSynthesisVoice) => {
    setCurrentVoice(voice);
    setOptions({ voice });
  }, [setOptions]);
  
  // Carregar as vozes disponíveis
  useEffect(() => {
    if (!speechSynthesisAvailable) return;
    
    const loadVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      setVoices(availableVoices);
      
      // Selecionar uma voz padrão para o idioma configurado
      if (availableVoices.length > 0 && !currentVoice) {
        const defaultVoice = availableVoices.find(
          voice => voice.lang === optionsRef.current.lang
        ) || availableVoices[0];
        
        setCurrentVoice(defaultVoice);
        setOptions({ voice: defaultVoice });
      }
    };
    
    // Carregar vozes iniciais
    loadVoices();
    
    // Adicionar listener para quando as vozes forem carregadas (Chrome)
    window.speechSynthesis.onvoiceschanged = loadVoices;
    
    return () => {
      window.speechSynthesis.onvoiceschanged = null;
    };
  }, [speechSynthesisAvailable, setOptions, currentVoice]);
  
  // Função para iniciar a leitura
  const speak = useCallback((text: string) => {
    if (!speechSynthesisAvailable || !text) return;
    
    // Interrompe qualquer leitura anterior
    window.speechSynthesis.cancel();
    
    // Cria uma nova utterance
    const utterance = new SpeechSynthesisUtterance(text);
    
    // Configura as opções
    utterance.lang = optionsRef.current.lang || 'pt-BR';
    utterance.rate = optionsRef.current.rate || 1;
    utterance.pitch = optionsRef.current.pitch || 1;
    utterance.volume = optionsRef.current.volume || 1;
    
    // Define a voz se disponível
    if (optionsRef.current.voice) {
      utterance.voice = optionsRef.current.voice;
    } else if (currentVoice) {
      utterance.voice = currentVoice;
    }
    
    // Configura os eventos
    utterance.onstart = () => {
      setSpeaking(true);
      setPaused(false);
      if (optionsRef.current.onStart) optionsRef.current.onStart();
    };
    
    utterance.onpause = () => {
      setPaused(true);
      if (optionsRef.current.onPause) optionsRef.current.onPause();
    };
    
    utterance.onresume = () => {
      setPaused(false);
      if (optionsRef.current.onResume) optionsRef.current.onResume();
    };
    
    utterance.onend = () => {
      setSpeaking(false);
      setPaused(false);
      utteranceRef.current = null;
      if (optionsRef.current.onEnd) optionsRef.current.onEnd();
    };
    
    utterance.onerror = (event) => {
      setSpeaking(false);
      setPaused(false);
      utteranceRef.current = null;
      if (optionsRef.current.onError) optionsRef.current.onError(event);
    };
    
    // Armazena a referência da utterance atual
    utteranceRef.current = utterance;
    
    // Inicia a leitura
    window.speechSynthesis.speak(utterance);
  }, [speechSynthesisAvailable, currentVoice]);
  
  // Função para pausar a leitura
  const pause = useCallback(() => {
    if (!speechSynthesisAvailable || !speaking || paused) return;
    
    window.speechSynthesis.pause();
    setPaused(true);
  }, [speechSynthesisAvailable, speaking, paused]);
  
  // Função para retomar a leitura
  const resume = useCallback(() => {
    if (!speechSynthesisAvailable || !speaking || !paused) return;
    
    window.speechSynthesis.resume();
    setPaused(false);
  }, [speechSynthesisAvailable, speaking, paused]);
  
  // Função para interromper a leitura
  const stop = useCallback(() => {
    if (!speechSynthesisAvailable || !speaking) return;
    
    window.speechSynthesis.cancel();
    setSpeaking(false);
    setPaused(false);
    utteranceRef.current = null;
    
    if (optionsRef.current.onStop) optionsRef.current.onStop();
  }, [speechSynthesisAvailable, speaking]);
  
  // Limpar ao desmontar o componente
  useEffect(() => {
    return () => {
      if (speechSynthesisAvailable && speaking) {
        window.speechSynthesis.cancel();
      }
    };
  }, [speechSynthesisAvailable, speaking]);
  
  return {
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
  };
}
