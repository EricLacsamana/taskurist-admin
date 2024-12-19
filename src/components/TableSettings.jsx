import React from "react";
import { BsFillTrashFill, BsFillPencilFill } from "react-icons/bs";
// import dataJSON from '../../public/data.json';

export const Table = ({ rows = [], deleteRow = () => {} , editRow = () => {}}) => {
  // const fields=Object.keys(Object.values(dataJSON)[0]).filter((item)=>!(item.startsWith("delta_")));
  
    const getCriterionText = (criterion) => {
      switch(criterion) {
        case 0: return "goes down by";
        case 1: return "goes up by";
        case 2: return "is smaller than";
        case 3: return "is greater than";
        default: return "is equal to";
      }
    };
  
    const getAlertTypeText = (type) => {
      switch(type) {
        case 0: return "Info";
        case 1: return "Warning";
        case 2: return "Alert";
        default: return "Unknown";
      }
    };
  
    return (
      <div className="max-w-full overflow-x-auto table-wrapper">
        <table className="table">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">Bond</th>
              <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">Paramter</th>
              <th className="py-4 px-4 font-medium text-black dark:text-white">Criterion</th>
              <th className="py-4 px-4 font-medium text-black dark:text-white">Value to give alert</th>
              <th className="py-4 px-4 font-medium text-black dark:text-white">Alert type</th>
              <th className="py-4 px-4 font-medium text-black dark:text-white">Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, idx) => {
              return (
                <tr key={idx} className="content-center">
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">{row.id}</td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <span className={`label label-${row.para}`}>
                      {row.para}
                    </span>
                  </td>
                  
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <span>
                      {getCriterionText(row.criterion)}
                    </span>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">{row.value}</td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <span>
                      {getAlertTypeText(row.type)}
                    </span>
                  </td>
                  
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <span className="actions flex grid-cols-2 gap-4">
                      <BsFillTrashFill
                        className="delete-btn cursor-pointer"
                        onClick={() => deleteRow(idx)} />
                      
                      <BsFillPencilFill
                        className="edit-btn cursor-pointer"
                        onClick={() => editRow(idx)} />
                      
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  };
  