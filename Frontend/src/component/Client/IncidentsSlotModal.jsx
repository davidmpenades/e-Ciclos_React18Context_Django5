import {
  Button,
  Label,
  Modal,
  TextInput,
  Textarea,
} from "flowbite-react";
import { useState } from "react";

export default function IncidentsSlotModal({slotId, addIncident}) {
  const [openModal, setOpenModal] = useState(false);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  function onCloseModal() {
    setOpenModal(false);
    setTitle("");
    setDesc("");
  }

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    if (id === "title") {
      setTitle(value);
    } else {
      setDesc(value);
    }
  };

  const handlerClick = () => {
    addIncident({slot_id:slotId, title, desc});
    onCloseModal();    
  }

  return (
    <>
      <Button
        onClick={() => setOpenModal(true)}
        className="bg-red-500 text-white m-2 p-2 rounded hover:bg-red-900 focus:outline-none focus:shadow-outline-green active:bg-green-800"
      >
        Incidencia
      </Button>
      <Modal show={openModal} size="md" onClose={onCloseModal} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
              Crear una incidencia
            </h3>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="text" value="Título" />
              </div>
              <TextInput
                id="title"
                placeholder="Título para la incidencia"
                value={title}
                type="text"
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="text" value="Descripción de la incidencia" />
              </div>
              <Textarea
                id="desc"
                placeholder="Descripción de la incidencia"
                value={desc}
                type="text"
                onChange={handleInputChange}
                className="border rounded-md p-2 w-full"
                rows={4}
                required
              />
            </div>

            <div className="w-full">
              <Button
                onClick={handlerClick}
                className="bg-green-500 hover:bg-green-600 text-white"
              >
                Enviar incidencia
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
