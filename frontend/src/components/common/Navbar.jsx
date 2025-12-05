export function Navbar() {
return (
<div className="w-full flex justify-between items-center p-6 bg-white shadow-lg border-b border-purple-300">
<h1 className="text-3xl font-bold text-purple-700 tracking-wide">Interview Archive</h1>


<div className="space-x-4">
<button
className="rounded-xl px-6 text-lg bg-purple-600 hover:bg-purple-700 text-white shadow-md"
onClick={() => (window.location.href = "/login")}
>
Login
</button>
<button
className="rounded-xl px-6 text-lg bg-blue-500 hover:bg-blue-600 text-white shadow-md"
onClick={() => (window.location.href = "/signup")}
>
Signup
</button>
</div>
</div>
);
}