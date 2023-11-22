import React, { useContext } from "react";
import plusImg from "../assets/plus.svg";
import GlobalContext from "../context/GlobalContext";
export default function CreateEventButton() {
  const { setShowEventModal } = useContext(GlobalContext);
  return (
    <button
      onClick={() => setShowEventModal(true)}
      className="border p-2 rounded-full flex items-center hover:shadow-md duration-500 bg-yellow-200"
    >
      <span className="px-4"> Adicionar </span>
    </button>
  );
}
