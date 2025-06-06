import { createContext, useContext, useState, useEffect } from "react";

const RecordsContext = createContext();

export function RecordsProvider({ children }) {
  const [records, setRecords] = useState([]);
  const [record, setRecord] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [reload, setReload] = useState([]);
  

  useEffect(() => {
    async function fetchRecords() {
      setLoading(true);
      setError("");

      try {
        const response = await fetch("https://waldo-server-wx8s.onrender.com/api/user/records",
          {
            method: "GET",
          }
        );

        const data = await response.json();

        if (!response.ok) {
          setError(data.message || "Something is wrong. Try again!");
          console.error(data.message);
          return;
        }

        console.log("Fetched records:", data.records);
        setRecords(data.records);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchRecords();
  }, [reload]);

  return (
    <RecordsContext.Provider value={{ records, setRecord, setRecords, record, error, loading, setReload }}>
      {children}
    </RecordsContext.Provider>
  );
}

export function useRecords() {
  return useContext(RecordsContext);
}