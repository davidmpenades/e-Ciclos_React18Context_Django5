import { Button, Modal, Select } from 'flowbite-react';
import { useState } from 'react';

export default function Modalincidents({incidentId, updateIncidente }) {
  const [openModal, setOpenModal] = useState(false);
  const [status, setStatus] = useState('in_progress');

  function onCloseModal() {
    setOpenModal(false);
  }

  function handleAccept() {
    updateIncidente(incidentId, {status: status});
    onCloseModal(); 
  }

  return (
    <>
      <Button color="blue" onClick={() => setOpenModal(true)}>Modificar</Button>
      <Modal show={openModal} size="md" onClose={onCloseModal} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6">
            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                Status
              </label>
              <Select
                id="status"
                value={status}
                onChange={(event) => setStatus(event.target.value)}
              >
                <option value="in_progress">En progreso</option>
                <option value="resolved">Resuelto</option>
              </Select>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className="w-full flex justify-end">
            <Button color="green" pill onClick={handleAccept}>Accept</Button>
            <Button color="red" pill onClick={onCloseModal} className="ml-2">Cancelar</Button>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
}

