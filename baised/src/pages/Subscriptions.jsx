import React, { useEffect, useState, useRef, useContext } from "react";
import DashboardLayout from "../layout/DashboardLayout";
import { useAuth } from "@clerk/clerk-react";
import { UserCreditsContext } from "../context/UserCreditsContext";
import axios from "axios";

const Subscriptions = () => {

const { getToken } = useAuth();

const { credits, updateCredits, fetchUserCredits } =
useContext(UserCreditsContext);

const [razorpayLoaded,setRazorpayLoaded] = useState(false);
const [processingPayment,setProcessingPayment] = useState(false);
const [message,setMessage] = useState("");
const [messageType,setMessageType] = useState("");

const razorpayScriptRef = useRef(null);

const RAZORPAY_KEY = import.meta.env.VITE_RAZORPAY_KEY_ID;
const API_BASE = import.meta.env.VITE_API_BASE_URL;


/* ---------------- LOAD RAZORPAY ---------------- */

useEffect(()=>{

if(window.Razorpay){
setRazorpayLoaded(true);
return;
}

const script=document.createElement("script");

script.src="https://checkout.razorpay.com/v1/checkout.js";
script.async=true;

script.onload=()=>setRazorpayLoaded(true);

script.onerror=()=>{
setMessage("Payment gateway failed to load");
setMessageType("error");
};

document.body.appendChild(script);
razorpayScriptRef.current=script;

return ()=>{
if(razorpayScriptRef.current){
document.body.removeChild(razorpayScriptRef.current);
}
};

},[]);


/* ---------------- FETCH CREDITS ---------------- */

useEffect(()=>{
fetchUserCredits();
},[]);


/* ---------------- PURCHASE ---------------- */

const handlePurchase = async(plan)=>{

if(!razorpayLoaded){
setMessage("Payment gateway loading");
setMessageType("error");
return;
}

setProcessingPayment(true);
setMessage("");

try{

const token=await getToken();

const orderRes=await axios.post(
`${API_BASE}/payments/create-order`,
{
planId:plan.id,
amount:plan.price,
currency:"INR"
},
{
headers:{Authorization:`Bearer ${token}`}
}
);

const order=orderRes.data;

const options={
key:RAZORPAY_KEY,
amount:plan.price*100,
currency:"INR",
name:"Baised",
description:`Purchase ${plan.credits} credits`,
order_id:order.orderId,

handler: async function(paymentResponse){

try{

const verifyResponse=await axios.post(
`${API_BASE}/payments/verify-payment`,
{
razorpay_order_id:paymentResponse.razorpay_order_id,
razorpay_payment_id:paymentResponse.razorpay_payment_id,
razorpay_signature:paymentResponse.razorpay_signature,
planId:plan.id
},
{
headers:{Authorization:`Bearer ${await getToken()}`}
}
);

if(verifyResponse.data.success){

if(verifyResponse.data.credits){
updateCredits(verifyResponse.data.credits);
}else{
await fetchUserCredits();
}

setMessage("Payment successful and credits added");
setMessageType("success");

}else{

setMessage("Payment verification failed");
setMessageType("error");

}

}catch{

setMessage("Payment verification failed");
setMessageType("error");

}

},

theme:{
color:"#27187E"
}

};

const razorpay=new window.Razorpay(options);
razorpay.open();

}catch{

setMessage("Payment failed");
setMessageType("error");

}

setProcessingPayment(false);

};


/* ---------------- PLANS ---------------- */

const plans=[

{ id:"standard", price:199, credits:100 },
{ id:"premium", price:500, credits:500 },
{ id:"enterprise", price:999, credits:1000 }

];


/* ---------------- UI ---------------- */

return(

<DashboardLayout activeMenu="subscriptions">

<div className="p-8 bg-[#F7F7FF] min-h-screen space-y-10">

<h2 className="text-2xl font-bold text-[#27187E]">
Subscription Plans
</h2>


{/* Credits Banner */}

<div className="bg-[#27187E]/10 p-5 rounded-xl">

<p className="font-semibold text-[#27187E]">
Current Credits: {credits}
</p>

<p className="text-sm text-[#27187E]/70">
You can upload {credits} more files with your current credits
</p>

</div>


{/* Pricing Cards */}

<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">


{/* BASIC */}

<div className="bg-[#F7F7FF] border border-[#27187E]/20 rounded-2xl shadow-sm p-7 flex flex-col justify-between">

<div>

<h3 className="text-xl font-semibold text-[#27187E]">
Basic
</h3>

<p className="text-sm text-[#27187E]/60">
For individuals getting started
</p>

<p className="text-4xl font-bold mt-6 text-[#27187E]">
₹0
<span className="text-sm text-[#27187E]/60"> / month</span>
</p>

<ul className="mt-6 space-y-2 text-sm text-[#27187E]/80">

<li>• 10 file uploads</li>
<li>• Basic file sharing</li>
<li>• 7-day file retention</li>
<li>• Standard email support</li>

</ul>

</div>

<button className="mt-8 border border-[#27187E] text-[#27187E] py-3 rounded-xl hover:bg-[#27187E] hover:text-white">
Get Started
</button>

</div>


{/* STANDARD */}

<div className="bg-[#F7F7FF] border border-[#27187E]/20 rounded-2xl shadow-sm p-7 flex flex-col justify-between">

<div>

<h3 className="text-xl font-semibold text-[#27187E]">
Standard
</h3>

<p className="text-sm text-[#27187E]/60">
Perfect for small teams
</p>

<p className="text-4xl font-bold mt-6 text-[#27187E]">
₹199
<span className="text-sm text-[#27187E]/60"> / month</span>
</p>

<ul className="mt-6 space-y-2 text-sm text-[#27187E]/80">

<li>• 100 file uploads</li>
<li>• Secure link sharing</li>
<li>• 15-day file retention</li>
<li>• Email support</li>
<li>• Download tracking</li>

</ul>

</div>

<button
onClick={()=>handlePurchase(plans[0])}
className="mt-8 border border-[#27187E] text-[#27187E] py-3 rounded-xl hover:bg-[#27187E] hover:text-white"
>
Choose Standard
</button>

</div>


{/* PREMIUM */}

<div className="bg-[#F7F7FF] border-2 border-[#27187E] rounded-2xl shadow-md p-7 flex flex-col justify-between scale-[1.02]">

<div>

<h3 className="text-xl font-semibold text-[#27187E]">
Premium
</h3>

<p className="text-sm text-[#27187E]/60">
For individuals with larger needs
</p>

<p className="text-4xl font-bold mt-6 text-[#27187E]">
₹500
<span className="text-sm text-[#27187E]/60"> / month</span>
</p>

<ul className="mt-6 space-y-2 text-sm text-[#27187E]/80">

<li>• 500 file uploads</li>
<li>• Advanced file sharing</li>
<li>• 30-day retention</li>
<li>• Priority email support</li>
<li>• File analytics</li>

</ul>

</div>

<button
onClick={()=>handlePurchase(plans[1])}
className="mt-8 bg-[#27187E] text-white py-3 rounded-xl hover:opacity-90"
>
Go Premium
</button>

</div>


{/* ENTERPRISE */}

<div className="bg-[#F7F7FF] border border-[#27187E]/20 rounded-2xl shadow-sm p-7 flex flex-col justify-between">

<div>

<h3 className="text-xl font-semibold text-[#27187E]">
Enterprise
</h3>

<p className="text-sm text-[#27187E]/60">
For organizations requiring full control
</p>

<p className="text-4xl font-bold mt-6 text-[#27187E]">
₹999
<span className="text-sm text-[#27187E]/60"> / month</span>
</p>

<ul className="mt-6 space-y-2 text-sm text-[#27187E]/80">

<li>• Unlimited uploads</li>
<li>• Role-based access control</li>
<li>• 90-day retention</li>
<li>• Dedicated support</li>
<li>• Advanced analytics</li>
<li>• Audit logs</li>

</ul>

</div>

<button
onClick={()=>handlePurchase(plans[2])}
className="mt-8 border border-[#27187E] text-[#27187E] py-3 rounded-xl hover:bg-[#27187E] hover:text-white"
>
Contact Sales
</button>

</div>

</div>


{/* Message */}

{message &&(

<div className={`p-4 rounded-xl ${
messageType==="success"
? "bg-green-100 text-green-700"
: "bg-red-100 text-red-700"
}`}>

{message}

</div>

)}


{/* Credit Info */}

<div className="bg-[#27187E]/5 p-6 rounded-xl text-sm text-[#27187E]/80">

<h4 className="font-semibold mb-2">
How Credits Work
</h4>

<ul className="space-y-1">
<li>1 credit = 1 file upload</li>
<li>Each upload consumes one credit</li>
<li>Buying a plan adds credits instantly</li>
<li>Credits remain until used</li>
</ul>

</div>

</div>

</DashboardLayout>

);

};

export default Subscriptions;