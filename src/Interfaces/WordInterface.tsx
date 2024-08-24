interface Phonetic {
    text: string;
    audio: string;
  }
  
  interface Definition {
    definition: string;
    example?: string;
    synonyms?: string[];
    antonyms?: string[];
  }
  
  interface Meaning {
    partOfSpeech: string;
    definitions: Definition[];
  }
  
  interface License {
    name: string;
    url: string;
  }
  
  interface WordInterface {
    word: string;
    phonetics: Phonetic[];
    meanings: Meaning[];
    license?: License;
    sourceUrls: string[];
  }
export default WordInterface  