import React, { useState } from "react";
import Header from "../header/Header";

export default function Account() {
  const [selectedView, setSelectedView] = useState("Account");
  const [selectedOption, setSelectedOption] = useState("Personal Information");

  const renderContent = () => {
    if (selectedView === "Account") {
      switch (selectedOption) {
        case "Personal Information":
          return <div>Personal Information</div>;
        case "Personalization":
          return <div>Personalization</div>;
        case "Address Book":
          return <div>Address Book</div>;
        default:
          return null;
      }
    } else if (selectedView === "Orders") {
      return <div>Orders</div>;
    }
  };

  return (
    <>
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="mt-4 flex">
          {selectedView === "Account" && (
            <div className="w-1/4 mx-4">
              <ul className="space-y-3">
                <li
                  className={`border p-2 rounded-lg hover:underline cursor-pointer ${
                    selectedOption === "Personal Information" ? "font-bold" : ""
                  } space-x-3`}
                  onClick={() => setSelectedOption("Personal Information")}
                >
                  Personal Information
                </li>
                <li
                  className={`border p-2 rounded-lg hover:underline cursor-pointer ${
                    selectedOption === "Personalization" ? "font-bold" : ""
                  } space-x-3`}
                  onClick={() => setSelectedOption("Personalization")}
                >
                  Personalization
                </li>
                <li
                  className={`border p-2 rounded-lg hover:underline cursor-pointer ${
                    selectedOption === "Address Book" ? "font-bold" : ""
                  } space-x-3`}
                  onClick={() => setSelectedOption("Address Book")}
                >
                  Address Book
                </li>
              </ul>
            </div>
          )}
          <div className="w-full md:w-3/4 border-l-2 pl-4">
            <h2 className="text-xl font-semibold">{selectedView}</h2>
            {renderContent()}
          </div>
        </div>
      </div>
    </>
  );
}
