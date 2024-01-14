import "./App.css";
import { useEffect, useState } from "react";
import LineTable from "./components/LineTable";
import SearchBar from "./components/SearchBar";
import LineModal from "./components/LineModal";

function App() {
  const [lines, setLines] = useState<string[]>([]);
  const [lineStatuses, setLineStatuses] = useState<any[]>([]);
  const [selectedLine, setSelectedLine] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchLines = async () => {
    try {
      const response = await fetch("https://api.tfl.gov.uk/Line/Mode/tube");

      if (!response.ok) {
        throw new Error(
          `Network response was not ok: ${response.status} ${response.statusText}`
        );
      }
      const data = await response.json();

      setLines(data.map((entry: any) => entry.id));
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  const fetchLineStatuses = async () => {
    try {
      const lineStatusesArray = await Promise.all(
        lines.map(async (lineId) => {
          try {
            const response = await fetch(
              `https://api.tfl.gov.uk/Line/${lineId}/status`
            );

            if (!response.ok) {
              throw new Error(
                `Network response was not ok: ${response.status} ${response.statusText}`
              );
            }

            return response.json();
          } catch (error) {
            console.error("Error in individual API call:", error);
          }
        })
      );

      const flattenedLineStatuses = lineStatusesArray.flat();
      setLineStatuses(flattenedLineStatuses);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  // NOTE: In future iterations, add tube type
  const handleRowClick = (line: any) => {
    setSelectedLine(line);
    setShowModal(true);
  };

  useEffect(() => {
    fetchLines();
  }, []);

  useEffect(() => {
    fetchLineStatuses();
  }, [lines]);

  return (
    <div className="App">
      <div className="App-header">
        <SearchBar handleSearchChange={handleSearchChange} />
        <div>
          <LineTable
            lineStatuses={lineStatuses}
            handleRowClick={(line: any) => handleRowClick(line)}
            searchTerm={searchTerm}
          />
        </div>
        <LineModal
          showModal={showModal}
          setShowModal={setShowModal}
          selectedTubeLine={selectedLine}
        />
      </div>
    </div>
  );
}

export default App;
