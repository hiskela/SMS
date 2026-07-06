import { useEffect, useState } from "react";
import api from "../../api/axios";

function Profile() {
  const [profile, setProfile] = useState(null);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({});
const [passwordForm,setPasswordForm]=useState({
currentPassword:"",
newPassword:""
});
const [passwordMessage,setPasswordMessage]=useState("");
const changePassword = async(e)=>{

e.preventDefault();

try{

const res = await api.put(
"/profile/change-password",
passwordForm
);


setPasswordMessage(res.data.message);


setPasswordForm({
currentPassword:"",
newPassword:""
});


}catch(err){

setPasswordMessage(
err.response?.data?.message || "Error changing password"
);

}

};  const loadProfile = async () => {
    try {
      const res = await api.get("/profile/me");
      setProfile(res.data);
    } catch (err) {
      console.log("PROFILE ERROR:", err.response?.data || err.message);
    }
  };

  useEffect(() => {
    loadProfile();
  }, []);

  // Handle input change
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

const handleEdit = () => {

setForm({
  firstName: profile.firstName,
  lastName: profile.lastName,
  username: profile.username,
  email: profile.email,
  phone: profile.phone,
  address: profile.address,
  password:""
});

setEditing(true);

};
  // Cancel edit
  const handleCancel = () => {
    setEditing(false);
    setForm({});
  };

  // Save profile
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.put("/profile/me", form);
      await loadProfile(); // refresh updated data
      setEditing(false);
    } catch (err) {
      console.log("UPDATE ERROR:", err.response?.data || err.message);
    }
  };

  if (!profile) return <p className="p-6">Loading...</p>;
 return (
<div className="p-6 space-y-6">


<div className="grid grid-cols-1 md:grid-cols-3 gap-6">


{/* PROFILE CARD */}

<div className="bg-white shadow rounded-2xl p-6 text-center">

<div className="w-20 h-20 mx-auto bg-blue-600 text-white flex items-center justify-center rounded-full text-3xl font-bold">

{profile.firstName?.charAt(0) || profile.username?.charAt(0)}

</div>


<h2 className="mt-4 text-xl font-bold">
{profile.firstName} {profile.lastName}
</h2>


<p className="text-gray-500 capitalize">
{profile.role}
</p>


<div className="mt-4 text-sm text-gray-600 space-y-2">

<p>
<strong>ID:</strong> {profile._id}
</p>

<p>
<strong>Username:</strong> {profile.username}
</p>


</div>


<button
onClick={editing ? handleCancel : handleEdit}
className={`mt-5 px-4 py-2 rounded w-full text-white ${
editing 
? "bg-gray-500"
:"bg-blue-600"
}`}
>

{editing ? "Cancel" : "Update Profile"}

</button>


</div>



{/* DETAILS CARD */}

<div className="md:col-span-2 bg-white shadow rounded-2xl p-6">


<h2 className="text-xl font-bold mb-5">
Profile Details
</h2>



{editing ? (


<form onSubmit={handleSubmit}
className="space-y-4">


<input
name="firstName"
value={form.firstName || ""}
onChange={handleChange}
className="w-full border p-2 rounded"
placeholder="First Name"
/>



<input
name="lastName"
value={form.lastName || ""}
onChange={handleChange}
className="w-full border p-2 rounded"
placeholder="Last Name"
/>



<input
name="username"
value={form.username || ""}
onChange={handleChange}
className="w-full border p-2 rounded"
placeholder="Username"
/>



<input
name="email"
value={form.email || ""}
onChange={handleChange}
className="w-full border p-2 rounded"
placeholder="Email"
/>



<input
name="phone"
value={form.phone || ""}
onChange={handleChange}
className="w-full border p-2 rounded"
placeholder="Phone"
/>



<input
name="address"
value={form.address || ""}
onChange={handleChange}
className="w-full border p-2 rounded"
placeholder="Address"
/>



<button
className="bg-green-600 text-white px-4 py-2 rounded w-full"
>
Save Changes
</button>


</form>


):(


<div className="space-y-3 text-gray-700">


<p>
<strong>Full Name:</strong> {profile.firstName} {profile.lastName}
</p>


<p>
<strong>Username:</strong> {profile.username}
</p>


<p>
<strong>Email:</strong> {profile.email}
</p>


<p>
<strong>Phone:</strong> {profile.phone}
</p>


<p>
<strong>Address:</strong> {profile.address}
</p>


<p>
<strong>Role:</strong> {profile.role}
</p>


</div>


)}


</div>


</div>





{/* PASSWORD SECTION */}

<div className="bg-white shadow rounded-2xl p-6 max-w-xl">


<h2 className="text-xl font-bold mb-4">
🔒 Change Password
</h2>


<form 
onSubmit={changePassword}
className="space-y-4"
>


<input
type="password"
placeholder="Current Password"
value={passwordForm.currentPassword}

onChange={(e)=>
setPasswordForm({
...passwordForm,
currentPassword:e.target.value
})
}

className="w-full border p-2 rounded"
/>



<input
type="password"
placeholder="New Password"
value={passwordForm.newPassword}

onChange={(e)=>
setPasswordForm({
...passwordForm,
newPassword:e.target.value
})
}

className="w-full border p-2 rounded"
/>



<button
className="bg-blue-600 text-white px-5 py-2 rounded"
>
Change Password
</button>



</form>



{
passwordMessage && (

<p className={`mt-3 ${
passwordMessage.includes("success")
?"text-green-600"
:"text-red-600"
}`}>

{passwordMessage}

</p>

)
}


</div>



</div>
);
}

export default Profile;