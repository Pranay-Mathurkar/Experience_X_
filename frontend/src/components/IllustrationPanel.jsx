export default function IllustrationPanel() {
  return (
    <div className="h-full w-full bg-gradient-to-br from-purple-400 to-indigo-600 p-10 flex items-center justify-center relative">

      <img
        src="/illustration.png"
        className="w-full drop-shadow-2xl h-[80%] rounded-3xl"
        alt="Illustration"
      />

      {/* Clouds */}
      <div className="absolute top-6 left-6 w-20 h-10 bg-white rounded-full opacity-80"></div>
      <div className="absolute bottom-10 right-10 w-24 h-12 bg-white rounded-full opacity-80"></div>
    </div>
  );
}
