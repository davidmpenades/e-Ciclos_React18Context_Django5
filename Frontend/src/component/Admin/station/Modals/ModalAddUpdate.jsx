import { Button, Label, Modal, TextInput } from "flowbite-react";
import { useState } from "react";
import iconAdd from "../../../../assets/icons/iconAdd.svg";
import iconEdit from "../../../../assets/icons/iconEdit.svg";
export default function ModalAdd({
  add,
  station = {
    id: "",
    slug: "",
    name: "",
    num_bikes: "",
    latitude: "",
    longitude: "",
    status: "",
    img_st: "",
  },
  modalType,
  updateStation,
}) {
  const [openModal, setOpenModal] = useState(false);
  const [formData, setFormData] = useState({
    name: station.slug != "" ? station.name : "",
    num_bikes: station.slug != "" ? station.num_bikes : 0,
    latitude: station.slug != "" ? station.latitude : "",
    longitude: station.slug != "" ? station.longitude : "",
    status: station.slug != "" ? station.status : "",
    img_st: station.slug != "" ? station.img_st : "",
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
  const TitleModal = modalType === "add" ? "Create Station" : "Update Station";
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
      setFormData({
        name: "",
        num_bikes: 0,
        latitude: "",
        longitude: "",
        status: "",
        img_st: "",
      });
      add(formData);
    } else {
      console.log("update");
      setOpenModal(false);
      updateStation(formData, station.id);
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
                <Label htmlFor="Text" value="name" />
              </div>
              <TextInput
                id="name"
                placeholder="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <div className="mb-2 ">
                <Label htmlFor="Number" value=" Number_bikes" />
              </div>
              <TextInput
                id="num_bikes"
                type="number"
                value={formData.num_bikes}
                placeholder="Number bikes"
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="Text" value="Latitude" />
              </div>
              <TextInput
                id="latitude"
                placeholder="Latitude"
                value={formData.latitude}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="Text" value="longitude" />
              </div>
              <TextInput
                id="longitude"
                placeholder="longitude"
                value={formData.longitude}
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
                id="img_st"
                placeholder="image"
                value={formData.img_st}
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
