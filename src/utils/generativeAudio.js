let audioCtx;
let isPlaying = false;
let analyser;
let dataArray;
let sourceNode;
let audioObj;

export const startAmbientSoundscape = () => {
  if (isPlaying) return;
  
  try {
    // We use a global HTML5 Audio object so we can stream an MP3
    if (!audioObj) {
      audioObj = new Audio();
      audioObj.crossOrigin = "anonymous";
      
      // Default placeholder (upbeat electronic). 
      // User can change this to '/lagu-tiktok.mp3' if they put an mp3 in the public folder!
      audioObj.src = "public/Ed Sheeran - Perfect.mp3"; 
      audioObj.loop = true;
      audioObj.volume = 0.5;
    }

    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!audioCtx) {
      audioCtx = new AudioContext();
    }

    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    
    if (!sourceNode) {
      sourceNode = audioCtx.createMediaElementSource(audioObj);
      
      // Setup Analyser for Audio-Reactive DOM
      analyser = audioCtx.createAnalyser();
      analyser.fftSize = 256;
      const bufferLength = analyser.frequencyBinCount;
      dataArray = new Uint8Array(bufferLength);
      
      // Connect: Audio -> Analyser -> Speakers
      sourceNode.connect(analyser);
      analyser.connect(audioCtx.destination);
    }
    
    audioObj.play().then(() => {
      isPlaying = true;
    }).catch(e => console.error("Playback failed", e));
    
  } catch (err) {
    console.error("Web Audio API not supported", err);
  }
};

export const stopAmbientSoundscape = () => {
  if (!isPlaying || !audioObj) return;
  
  audioObj.pause();
  isPlaying = false;
};

export const toggleAmbientSoundscape = (enable) => {
  if (enable) {
    startAmbientSoundscape();
  } else {
    stopAmbientSoundscape();
  }
};

// Export function to get real-time audio amplitude (0 to 1)
export const getAudioAmplitude = () => {
  if (!isPlaying || !analyser || !dataArray) return 0;
  
  analyser.getByteFrequencyData(dataArray);
  
  // Calculate average volume (amplitude)
  let sum = 0;
  // We only care about the lower half of frequencies for that "beat/bass" pulse effect
  const bassRange = Math.floor(dataArray.length / 2);
  for (let i = 0; i < bassRange; i++) {
    sum += dataArray[i];
  }
  
  const average = sum / bassRange;
  // Normalize (max value is 255)
  // Amplify it slightly so the UI pulses harder on the beat
  return Math.min((average / 255) * 1.5, 1);
};
