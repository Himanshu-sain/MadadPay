export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <header className="flex justify-between items-center px-8 py-4 bg-white shadow-md">
        <div className="text-xl font-bold text-white bg-blue-700 px-4 py-2 rounded-lg">
          MadadPay
        </div>
        <nav className="space-x-6 mr-10 text-gray-800 font-medium">
          <a href="#" className="hover:text-cyan-600">Matches</a>
          <a href="#" className="hover:text-cyan-600">Exchange</a>
          <a href="#" className="hover:text-cyan-600">Confirm</a>
          <a href="#" className="hover:text-cyan-600">Log in</a>
          <a href="#" className="hover:text-cyan-600">Sign up</a>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="bg-blue-700 text-white px-8 py-12 rounded-b-3xl">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-4xl font-bold mb-4">Get Cash with UPI</h1>
            <p className="text-lg mb-6">
              Find someone nearby to exchange UPI for cash
            </p>
            <div className="flex space-x-4">
              <button className="bg-cyan-600 hover:bg-blue-800 text-white font-semibold px-6 py-3 rounded-lg">
                Need Cash
              </button>
              <button className="bg-white text-black hover:bg-gray-100 font-semibold px-6 py-3 rounded-lg">
                How It Works
              </button>
            </div>
          </div>

          <div className="flex justify-center">
            {/* Map Placeholder */}
            <div className="bg-white p-6 rounded-2xl shadow-md">
              <div className="w-40 h-40 bg-gray-100 rounded-2xl flex items-center justify-center">
                <div className="text-green-600 text-4xl">📍</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="px-8 py-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">How It Works</h2>
        <ol className="list-decimal list-inside text-lg text-gray-700 space-y-2">
          <li>Get matched with an exchange request</li>
          <li>Create an exchange in person</li>
          <li>Meet to complete the exchange</li>
        </ol>
      </section>
    </div>
  );
}