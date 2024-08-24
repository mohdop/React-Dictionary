import "bootstrap/dist/css/bootstrap.css";
import WordInterface from "../Interfaces/WordInterface";
import { useEffect, useState } from "react";
import axios from "axios";

const WordSearch = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [wordData, setWordData] = useState<WordInterface | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (searchTerm.trim() === "") return;

    const fetchData = async () => {
      try {
        const response = await axios.get<WordInterface[]>(
          `https://api.dictionaryapi.dev/api/v2/entries/en/${searchTerm}`
        );
        setWordData(response.data[0]);
        setError(null);
      } catch (err) {
        setWordData(null);
        setError("Word not found or API error");
      }
    };

    fetchData();
  }, [searchTerm]);

  return (
    <div className="container mt-5">
      <div className="text-center mb-4">
        <h1 className="display-4">Dictionary</h1>
        <p className="lead">Search for the meaning, synonyms, and more</p>
      </div>

      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Enter a word"
              aria-label="Word to search"
              aria-describedby="button-addon2"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            
          </div>
        </div>
      </div>

      {error && (
        <div className="alert alert-danger text-center" role="alert">
          {error}
        </div>
      )}

      {wordData && (
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card shadow-sm">
              <div className="card-body">
                <h2 className="card-title display-5 text-capitalize">
                  {wordData.word}
                </h2>

                {wordData.phonetics.map((phonetic, index) => (
                  <div key={index} className="mb-3">
                    <p className="mb-0">
                      <strong>Phonetic:</strong> {phonetic.text}
                    </p>
                    {phonetic.audio && (
                      <audio controls className="w-100 mt-2">
                        <source src={phonetic.audio} type="audio/mpeg" />
                        Your browser does not support the audio element.
                      </audio>
                    )}
                  </div>
                ))}

                {wordData.meanings.map((meaning, index) => (
                  <div key={index} className="mb-4">
                    <h4>
                      <span className="badge bg-secondary">
                        {meaning.partOfSpeech}
                      </span>
                    </h4>

                    {meaning.definitions.map((definition, defIndex) => (
                      <div key={defIndex} className="mb-2">
                        <p className="mb-1">
                          <strong>Definition:</strong> {definition.definition}
                        </p>
                        {definition.example && (
                          <p className="mb-1">
                            <strong>Example:</strong> <em>{definition.example}</em>
                          </p>
                        )}
                        {definition.synonyms!.length > 0 && (
                          <p className="mb-1">
                            <strong>Synonyms:</strong>{" "}
                            {definition.synonyms!.join(", ")}
                          </p>
                        )}
                        {definition.antonyms!.length > 0 && (
                          <p className="mb-1">
                            <strong>Antonyms:</strong>{" "}
                            {definition.antonyms!.join(", ")}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                ))}

                <p className="card-text">
                  <strong>Source:</strong>{" "}
                  <a
                    href={wordData.sourceUrls[0]}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {wordData.sourceUrls[0]}
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WordSearch;
