export function CompanyGrid() {
const companies = [
{
name: "Google",
snippet: "Great DSA & System Design focus.",
img: "https://logo.clearbit.com/google.com",
},
{
name: "Microsoft",
snippet: "Balanced interviews: coding + behavioral.",
img: "https://logo.clearbit.com/microsoft.com",
},
{
name: "Amazon",
snippet: "Strong LP rounds, medium–hard coding.",
img: "https://logo.clearbit.com/amazon.com",
},
{
name: "Meta",
snippet: "Coding-heavy, requires speed and clarity.",
img: "https://logo.clearbit.com/meta.com",
},
{
name: "Netflix",
snippet: "High bar, deep system design.",
img: "https://logo.clearbit.com/netflix.com",
},
{
name: "Flipkart",
snippet: "Good mix of problem solving + system design.",
img: "https://logo.clearbit.com/flipkart.com",
},
{
name: "Uber",
snippet: "Fast-paced interview style.",
img: "https://logo.clearbit.com/uber.com",
},
{
name: "Adobe",
snippet: "Conceptual + coding-oriented rounds.",
img: "https://logo.clearbit.com/adobe.com",
},
];


return (
<div className="mt-12 px-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
{companies.map((company, index) => (
<div key={index} className="w-full h-64 rounded-2xl shadow-xl bg-white/90 hover:scale-105 transition-transform cursor-pointer flex flex-col justify-between p-4">
<img
src={company.img}
alt={company.name}
className="w-16 h-16 object-contain mx-auto mb-3"
/>
<h2 className="text-lg font-semibold text-center text-purple-900">
{company.name}
</h2>
<p className="text-gray-700 text-sm text-center mt-2">
{company.snippet}
</p>
</div>
))}
</div>
);
}