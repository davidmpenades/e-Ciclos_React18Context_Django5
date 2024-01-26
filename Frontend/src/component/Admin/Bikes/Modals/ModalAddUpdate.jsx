import { Button, Label, Modal, TextInput } from "flowbite-react";
import { useState } from "react";
import iconAdd from "../../../../assets/icons/iconAdd.svg";
import iconEdit from "../../../../assets/icons/iconEdit.svg";

export default function ModalAdd({
  add,
  bike = {
    id: "",
    slug: "",
    name_bike: "",
    status: "",
    img_bike: "",
  },
  modalType,
  updateBike,
}) {
  const [openModal, setOpenModal] = useState(false);
  const [formData, setFormData] = useState({
    name_bike: bike.slug != "" ? bike.name_bike : "",
    status: bike.slug != "" ? bike.status : "",
    img_bike: bike.slug != "" ? bike.img_bike : "",
  });

  const TypeModal =
    modalType === "add" ? (
      <div>
        <img src={iconAdd} alt="iconAdd"/>
      </div>
    ) : (
      <div>
        <img src={iconEdit} alt="iconAdd"/>
      </div>
    );

  const ColorButton = modalType === "add" ? "success" : "blue";
  const TitleModal = modalType === "add" ? "Create bike" : "Update bike";
  const ButtonAccepted = modalType === "add" ? "Create" : "Update";

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  const handelClick = () => {
    if (modalType === "add") {
      console.log("add");
      setOpenModal(false);
      add(formData);
    } else {
      console.log("update");
      setOpenModal(false);
      updateBike(formData, bike.id);
    }
  };

  return (
    <>
      <Button onClick={() => setOpenModal(true)} color={ColorButton} style={{height:'60px', width:'70px'}}>
        {TypeModal}
      </Button>

      <Modal
        show={openModal}
        size="md"
        popup
        onClose={() => setOpenModal(false)}
      >
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
              {TitleModal}
            </h3>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="Text" value="name bike:" />
              </div>
              <TextInput
                id="name_bike"
                placeholder="name"
                value={formData.name_bike}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="Text" value="status" />
              </div>
              <TextInput
                id="status"
                placeholder="status"
                value={formData.status}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="Text" value="image" />
              </div>
              <TextInput
                id="img_bike"
                placeholder="image"
                value={formData.img_bike}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="flex justify-between text-sm font-medium text-gray-500 dark:text-gray-300">
              <Button color={ColorButton} onClick={handelClick}>
                {ButtonAccepted}
              </Button>
            </div>
            <div className="w-full">
              <Button color="failure" onClick={() => setOpenModal(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
