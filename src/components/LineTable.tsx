import Table from "react-bootstrap/Table";

type LineTableProps = {
  searchTerm: string;
  lineStatuses: any; // NOTE: In future iterations, add this type
  handleRowClick: (line: any) => void; // NOTE: In future iterations, add this type
};

const LineTable = ({
  lineStatuses,
  handleRowClick,
  searchTerm,
}: LineTableProps) => {
  return (
    <div style={{ height: "100vh" }}>
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>Line Name</th>
            <th>Status</th>
            <th>Status Severity</th>
          </tr>
        </thead>
        <tbody>
          {lineStatuses
            .filter((line: any) =>
              line.name.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((line: any) => (
              <tr key={line.id} onClick={() => handleRowClick(line)}>
                <td>{line.name}</td>
                <td>{line.lineStatuses[0]?.statusSeverityDescription}</td>
                <td>{line.lineStatuses[0]?.statusSeverity}</td>
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  );
};

export default LineTable;
