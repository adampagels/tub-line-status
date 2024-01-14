import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

type LineProps = {
  setShowModal: (bool: boolean) => void;
  showModal: boolean;
  selectedTubeLine: any; // NOTE: In future iterations, add this
};

const LineModal = ({
  setShowModal,
  showModal,
  selectedTubeLine,
}: LineProps) => {
  return (
    <Modal show={showModal} onHide={() => setShowModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>
          {selectedTubeLine?.name || "Tube Line Details"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          Status: {selectedTubeLine?.lineStatuses[0].statusSeverityDescription}
        </p>
        <p>Severity: {selectedTubeLine?.lineStatuses[0].statusSeverity}</p>
        {selectedTubeLine?.lineStatuses[0].statusSeverity < 10 && (
          <p>Reason: {selectedTubeLine?.lineStatuses[0].reason}</p>
        )}
        <p>
          From: {selectedTubeLine?.lineStatuses[0].validityPeriods[0].fromDate}
        </p>
        <p>To: {selectedTubeLine?.lineStatuses[0].validityPeriods[0].toDate}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShowModal(false)}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default LineModal;
