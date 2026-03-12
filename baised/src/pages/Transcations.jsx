import React, { useEffect, useState } from "react";
import DashboardLayout from "../layout/DashboardLayout";
import { useAuth } from "@clerk/clerk-react";
import axios from "axios";

const Transactions = () => {

const { getToken } = useAuth();

const [transactions,setTransactions] = useState([]);

const API_BASE = import.meta.env.VITE_API_BASE_URL;


/* ---------------- FETCH TRANSACTIONS ---------------- */

const fetchTransactions = async()=>{

try{

const token = await getToken();

const res = await axios.get(
`${API_BASE}/transactions`,
{
headers:{ Authorization:`Bearer ${token}` }
}
);

setTransactions(res.data);

}catch(err){

console.error("Transaction fetch error:",err);

}

};


useEffect(()=>{
fetchTransactions();
},[]);


/* ---------------- FORMAT DATE ---------------- */

const formatDate = (date)=>{

const d = new Date(date);

return d.toLocaleString("en-IN",{
day:"numeric",
month:"long",
year:"numeric",
hour:"2-digit",
minute:"2-digit"
});

};


/* ---------------- PLAN LABEL ---------------- */

const getPlanLabel = (plan)=>{

switch(plan){

case "standard":
return "Standard Plan";

case "premium":
return "Premium Plan";

case "enterprise":
return "Enterprise Plan";

default:
return plan;

}

};

return(

  <DashboardLayout activeMenu="transactions">
  
  <div className="p-4 sm:p-6 md:p-8 bg-[#F7F7FF] min-h-screen">
  
  <h2 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6 text-[#27187E]">
  Transaction History
  </h2>
  
  <div className="bg-[#F7F7FF] rounded-xl shadow-sm border border-[#27187E]/20 overflow-hidden">
  
  <div className="overflow-x-auto">
  
  <table className="min-w-[700px] w-full text-xs sm:text-sm text-[#27187E]">
  
  <thead className="bg-[#27187E]/10 text-[#27187E]">
  
  <tr>
  
  <th className="text-left px-3 sm:px-6 py-2 sm:py-3 whitespace-nowrap">
  DATE
  </th>
  
  <th className="text-left px-3 sm:px-6 py-2 sm:py-3 whitespace-nowrap">
  PLAN
  </th>
  
  <th className="text-left px-3 sm:px-6 py-2 sm:py-3 whitespace-nowrap">
  AMOUNT
  </th>
  
  <th className="text-left px-3 sm:px-6 py-2 sm:py-3 whitespace-nowrap">
  CREDITS ADDED
  </th>
  
  <th className="text-left px-3 sm:px-6 py-2 sm:py-3 whitespace-nowrap">
  PAYMENT ID
  </th>
  
  </tr>
  
  </thead>
  
  <tbody>
  
  {transactions.length===0 ?(
  
  <tr>
  <td colSpan="5" className="text-center py-6 text-[#27187E]/60 text-xs sm:text-sm">
  No transactions found
  </td>
  </tr>
  
  ):(transactions.map(tx=>(
  
  <tr
  key={tx.id}
  className="border-t border-[#27187E]/10 hover:bg-[#27187E]/5 transition"
  >
  
  <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
  {formatDate(tx.transactionDate)}
  </td>
  
  <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
  {getPlanLabel(tx.planId)}
  </td>
  
  <td className="px-3 sm:px-6 py-3 sm:py-4 font-medium whitespace-nowrap">
  ₹{tx.amount}.00
  </td>
  
  <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
  {tx.creditsAdded}
  </td>
  
  <td className="px-3 sm:px-6 py-3 sm:py-4 text-[#27187E]/60 whitespace-nowrap">
  {tx.paymentId}
  </td>
  
  </tr>
  
  )))}
  
  </tbody>
  
  </table>
  
  </div>
  
  </div>
  
  </div>
  
  </DashboardLayout>
  
  );

};

export default Transactions;