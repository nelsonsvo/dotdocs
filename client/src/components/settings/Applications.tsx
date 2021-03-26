import React from "react";
import Settings from "../../pages/Settings";
import ApplicationCard from "../cards/ApplicationCard";
import Input from "../form/Input";
import SettingSectionCard from "../ui/SettingSectionCard";

interface ApplicationsProps {}

const Applications: React.FC<ApplicationsProps> = () => {
  return (
    <SettingSectionCard>
      <div className="mt-10 sm:mt-0">
        <div className="shadow overflow-hidden sm:rounded-md" />
        <div className="mt-10 sm:mt-0">
          <div className="px-4 py-5 bg-white sm:p-6">
            <div className="grid grid-cols-6 gap-6 text-left">
              <div className="col-span-6">
                <h3 className="text-gray-700 tracking-wide text-md md:text-xl">Existing Applications</h3>
              </div>
              <div className="col-span-6">
                <div className="flex flex-col">
                  <ApplicationCard name="Accounts Payable" onEdit={() => console.log("editing")} onDelete={() => console.log("deleting")} />
                  <ApplicationCard name="Invoices" mt={3} onEdit={() => console.log("editing")} onDelete={() => console.log("deleting")} />
                  <ApplicationCard name="Emails" mt={3} onEdit={() => console.log("editing")} onDelete={() => console.log("deleting")} />
                </div>
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="last_name" className="block  text-sm font-medium text-gray-700">
                  Last name
                </label>
                <input type="text" name="last_name" id="last_name" className="mt-1 focus:ring-blue-500 focus:border-blue-500 w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="last_name" className="block  text-sm font-medium text-gray-700">
                  Last name
                </label>
                <input type="text" name="last_name" id="last_name" className="mt-1 focus:ring-blue-500 focus:border-blue-500 w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
              </div>

              <div className="col-span-3 ">
                <label htmlFor="email_address" className="block text-sm font-medium text-gray-700">
                  Email address
                </label>
                <input type="text" name="email_address" id="email_address" className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="country" className="block  text-sm font-medium text-gray-700">
                  Country / Region
                </label>
                <select id="country" name="country" className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
                  <option>United States</option>
                  <option>Canada</option>
                  <option>Mexico</option>
                </select>
              </div>

              <div className="col-span-6">
                <label htmlFor="street_address" className="block text-sm font-medium text-gray-700">
                  Street address
                </label>
                <input type="text" name="street_address" id="street_address" className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
              </div>

              <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                  City
                </label>
                <input type="text" name="city" id="city" className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
              </div>

              <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                <label htmlFor="state" className="block text-sm font-medium text-gray-700">
                  State / Province
                </label>
                <input type="text" name="state" id="state" className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
              </div>

              <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                <label htmlFor="postal_code" className="block text-sm font-medium text-gray-700">
                  ZIP / Postal
                </label>
                <input type="text" name="postal_code" id="postal_code" className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
              </div>
            </div>
          </div>
          <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
            <button
              type="submit"
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </SettingSectionCard>
  );
};

export default Applications;
