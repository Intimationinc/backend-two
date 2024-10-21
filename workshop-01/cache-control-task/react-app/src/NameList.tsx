import { useState, useEffect } from "react";
import axios from "axios";

interface Name {
  names: string[];
}

const NameList = () => {
  const [names, setNames] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchNames = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get<Name>("http://localhost:3000/api/names");

      if (response.status === 200) {
        setNames(response.data.names);
      }
    } catch (error) {
      console.error("Error fetching names:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNames();
  }, []);

  return (
    <div>
      <h1>Name List</h1>
      <button onClick={fetchNames} disabled={isLoading}>
        {isLoading ? "Loading..." : "Fetch Names"}
      </button>
      {isLoading ? (
        <p>Loading names...</p>
      ) : (
        <ul>
          {names.map((name, index) => (
            <li key={index}>{name}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default NameList;
