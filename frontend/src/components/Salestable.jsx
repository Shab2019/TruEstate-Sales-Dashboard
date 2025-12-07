import React from "react";

function SalesTable({ items }) {
  return (
    <div className="overflow-x-auto rounded-xl">
      <table className="min-w-full text-xs">
        <thead className="bg-slate-50 border-b border-slate-200">
          <tr>
            <th className="px-3 py-2 text-left font-medium text-slate-600">
              Date
            </th>
            <th className="px-3 py-2 text-left font-medium text-slate-600">
              Customer
            </th>
            <th className="px-3 py-2 text-left font-medium text-slate-600">
              Phone
            </th>
            <th className="px-3 py-2 text-left font-medium text-slate-600">
              Region
            </th>
            <th className="px-3 py-2 text-left font-medium text-slate-600">
              Product
            </th>
            <th className="px-3 py-2 text-right font-medium text-slate-600">
              Qty
            </th>
            <th className="px-3 py-2 text-right font-medium text-slate-600">
              Final Amount
            </th>
            <th className="px-3 py-2 text-left font-medium text-slate-600">
              Payment
            </th>
            <th className="px-3 py-2 text-left font-medium text-slate-600">
              Status
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {items.map((item, idx) => (
            <tr key={idx} className="hover:bg-slate-50">
              <td className="px-3 py-2 whitespace-nowrap text-slate-700">
                {item.date}
              </td>
              <td className="px-3 py-2">
                <div className="font-medium text-slate-800">
                  {item.customerName}
                </div>
                <div className="text-[11px] text-slate-500">
                  {item.customerType}
                </div>
              </td>
              <td className="px-3 py-2 text-slate-700">
                {item.phoneNumber}
              </td>
              <td className="px-3 py-2 text-slate-700">
                {item.customerRegion}
              </td>
              <td className="px-3 py-2">
                <div className="font-medium text-slate-800">
                  {item.productName}
                </div>
                <div className="text-[11px] text-slate-500">
                  {item.productCategory}
                </div>
              </td>
              <td className="px-3 py-2 text-right text-slate-700">
                {item.quantity}
              </td>
              <td className="px-3 py-2 text-right text-slate-800">
                ₹{item.finalAmount?.toLocaleString?.() ?? item.finalAmount}
              </td>
              <td className="px-3 py-2 text-slate-700">
                {item.paymentMethod}
              </td>
              <td className="px-3 py-2">
                <span className="inline-flex rounded-full border border-slate-200 px-2 py-0.5 text-[10px] text-slate-700">
                  {item.orderStatus}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default SalesTable;
