export function SearchBar() {
return (
<div className="w-full flex justify-center mt-10">
<div className="relative w-2/3">
<input
className="pl-12 py-6 rounded-2xl text-lg shadow-xl bg-white/80 focus:ring-2 focus:ring-purple-400 w-full"
placeholder="Search company reviews..."
/>
</div>
</div>
);
}