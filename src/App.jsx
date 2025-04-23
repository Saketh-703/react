import { useState, useEffect } from 'react';
import { 
  Search, 
  ArrowUp, 
  ArrowDown, 
  Plus, 
  Star, 
  X, 
  TrendingUp,
  Coins,
  Wallet,
  Shield,
  Globe,
  BarChart2,
  Menu,
  Twitter,
  Facebook,
  Linkedin,
  Github
} from 'lucide-react';
const cypo = 'https://tse4.mm.bing.net/th?id=OIP.bgvMu8vQcELlufCQPSZivgHaEK&pid=Api&P=0&h=180';
const watch = 'https://cdn-images-1.medium.com/max/800/1*7KwoZHhtWtQyTzynK2quTw.jpeg';
const chart = 'https://img.freepik.com/free-vector/gradient-stock-market-concept_23-2149166910.jpg?t=st=1745423495~exp=1745427095~hmac=13f76a643ab165ecb28a0a159041e91b6837246183416e39c698e59fcc666ce8&w=1380';
function App() {
  const [cryptoData, setCryptoData] = useState([]);
  const [watchlist, setWatchlist] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Mock data - in a real app, you would fetch from an API like CoinGecko or CoinMarketCap
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const mockData = [
          { id: 'bitcoin', name: 'Bitcoin', symbol: 'BTC', current_price: 63452.78, price_change_percentage_24h: 2.34, market_cap: 1223456789012 },
          { id: 'ethereum', name: 'Ethereum', symbol: 'ETH', current_price: 3456.78, price_change_percentage_24h: -1.23, market_cap: 412345678901 },
          { id: 'cardano', name: 'Cardano', symbol: 'ADA', current_price: 0.45, price_change_percentage_24h: 5.67, market_cap: 15678901234 },
          { id: 'solana', name: 'Solana', symbol: 'SOL', current_price: 145.67, price_change_percentage_24h: 8.91, market_cap: 56789012345 },
          { id: 'ripple', name: 'Ripple', symbol: 'XRP', current_price: 0.56, price_change_percentage_24h: -0.78, market_cap: 27890123456 },
          { id: 'polkadot', name: 'Polkadot', symbol: 'DOT', current_price: 6.78, price_change_percentage_24h: 3.45, market_cap: 7890123456 },
          { id: 'dogecoin', name: 'Dogecoin', symbol: 'DOGE', current_price: 0.12, price_change_percentage_24h: -2.34, market_cap: 16789012345 },
          { id: 'avalanche', name: 'Avalanche', symbol: 'AVAX', current_price: 34.56, price_change_percentage_24h: 6.78, market_cap: 12345678901 },
        ];
        
        setCryptoData(mockData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
    
    // Load watchlist from localStorage
    const savedWatchlist = localStorage.getItem('cryptoWatchlist');
    if (savedWatchlist) {
      setWatchlist(JSON.parse(savedWatchlist));
    }
  }, []);

  // Save watchlist to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('cryptoWatchlist', JSON.stringify(watchlist));
  }, [watchlist]);

  const toggleWatchlist = (crypto) => {
    if (watchlist.some(item => item.id === crypto.id)) {
      setWatchlist(watchlist.filter(item => item.id !== crypto.id));
    } else {
      setWatchlist([...watchlist, crypto]);
    }
  };

  const filteredCrypto = cryptoData.filter(crypto =>
    crypto.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    crypto.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: price < 1 ? 4 : 2,
      maximumFractionDigits: price < 1 ? 6 : 2
    }).format(price);
  };

  const formatMarketCap = (marketCap) => {
    if (marketCap >= 1e12) return `$${(marketCap / 1e12).toFixed(2)}T`;
    if (marketCap >= 1e9) return `$${(marketCap / 1e9).toFixed(2)}B`;
    if (marketCap >= 1e6) return `$${(marketCap / 1e6).toFixed(2)}M`;
    return `$${marketCap}`;
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Navigation */}
      <nav className="bg-gray-800 py-4 px-6 shadow-lg">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Coins className="text-yellow-400 h-8 w-8" />
            <span className="text-xl font-bold bg-gradient-to-r from-yellow-400 to-purple-500 bg-clip-text text-transparent">
              CryptoWatch
            </span>
          </div>
          
          <div className="hidden md:flex space-x-6">
            <a href="#market" className="hover:text-yellow-400 transition">Market</a>
            <a href="#watchlist" className="hover:text-yellow-400 transition">Watchlist</a>
            <a href="#features" className="hover:text-yellow-400 transition">Features</a>
            <a href="#about" className="hover:text-yellow-400 transition">About</a>
          </div>
          
          <button 
            className="md:hidden text-gray-300 hover:text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
        
        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 space-y-3 pb-3">
            <a href="#market" className="block hover:text-yellow-400 transition">Market</a>
            <a href="#watchlist" className="block hover:text-yellow-400 transition">Watchlist</a>
            <a href="#features" className="block hover:text-yellow-400 transition">Features</a>
            <a href="#about" className="block hover:text-yellow-400 transition">About</a>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-800 to-gray-900 py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                Track <span className="text-yellow-400">Crypto</span> Markets in Real Time
              </h1>
              <p className="text-xl text-gray-300 mb-8">
                Get live prices, charts, and updates for all your favorite cryptocurrencies. 
                Create a personalized watchlist and never miss a market movement.
              </p>
              <div className="flex space-x-4">
                <a 
                  href="#market" 
                  className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold py-3 px-6 rounded-lg transition duration-300 flex items-center"
                >
                  <TrendingUp className="mr-2" /> Explore Market
                </a>
                <a 
                  href="#watchlist" 
                  className="border border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-gray-900 font-bold py-3 px-6 rounded-lg transition duration-300 flex items-center"
                >
                  <Star className="mr-2" /> My Watchlist
                </a>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <img 
                src={cypo}
                alt="Cryptocurrency" 
                className="rounded-xl shadow-2xl w-full max-w-md border-2 border-yellow-400"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 px-6 bg-gray-800">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="bg-gray-700 p-6 rounded-xl text-center">
            <div className="text-yellow-400 mb-2 flex justify-center">
              <Coins className="h-8 w-8" />
            </div>
            <h3 className="text-2xl font-bold">10,000+</h3>
            <p className="text-gray-400">Cryptocurrencies</p>
          </div>
          <div className="bg-gray-700 p-6 rounded-xl text-center">
            <div className="text-yellow-400 mb-2 flex justify-center">
              <Wallet className="h-8 w-8" />
            </div>
            <h3 className="text-2xl font-bold">$2.5T+</h3>
            <p className="text-gray-400">Market Cap</p>
          </div>
          <div className="bg-gray-700 p-6 rounded-xl text-center">
            <div className="text-yellow-400 mb-2 flex justify-center">
              <Globe className="h-8 w-8" />
            </div>
            <h3 className="text-2xl font-bold">500+</h3>
            <p className="text-gray-400">Exchanges</p>
          </div>
          <div className="bg-gray-700 p-6 rounded-xl text-center">
            <div className="text-yellow-400 mb-2 flex justify-center">
              <BarChart2 className="h-8 w-8" />
            </div>
            <h3 className="text-2xl font-bold">24/7</h3>
            <p className="text-gray-400">Real-time Data</p>
          </div>
        </div>
      </section>

      {/* Market Section */}
      <section id="market" className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-2 flex items-center">
            <TrendingUp className="mr-2 text-yellow-400" /> Cryptocurrency Market
          </h2>
          <p className="text-gray-400 mb-8">Real-time prices and market data for top cryptocurrencies</p>
          
          <div className="bg-gray-800 rounded-xl p-4 mb-8">
            <div className="flex items-center bg-gray-700 rounded-lg px-4 py-3 mb-4">
              <Search className="text-gray-400 mr-2" />
              <input
                type="text"
                placeholder="Search cryptocurrencies..."
                className="bg-transparent border-none outline-none w-full text-white placeholder-gray-400"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            {isLoading ? (
              <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-400"></div>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left border-b border-gray-700">
                      <th className="pb-4 pl-2">#</th>
                      <th className="pb-4">Coin</th>
                      <th className="pb-4 text-right">Price</th>
                      <th className="pb-4 text-right">24h Change</th>
                      <th className="pb-4 text-right">Market Cap</th>
                      <th className="pb-4 pr-2 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredCrypto.map((crypto, index) => (
                      <tr key={crypto.id} className="border-b border-gray-700 hover:bg-gray-700/50">
                        <td className="py-4 pl-2">{index + 1}</td>
                        <td className="py-4">
                          <div className="flex items-center">
                            <div className="bg-gray-600 rounded-full h-8 w-8 flex items-center justify-center mr-3">
                              <span className="text-xs font-bold">{crypto.symbol}</span>
                            </div>
                            <div>
                              <div className="font-medium">{crypto.name}</div>
                              <div className="text-gray-400 text-sm">{crypto.symbol}</div>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 text-right font-medium">
                          {formatPrice(crypto.current_price)}
                        </td>
                        <td className={`py-4 text-right font-medium flex items-center justify-end ${crypto.price_change_percentage_24h >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                          {crypto.price_change_percentage_24h >= 0 ? (
                            <ArrowUp className="h-4 w-4 mr-1" />
                          ) : (
                            <ArrowDown className="h-4 w-4 mr-1" />
                          )}
                          {Math.abs(crypto.price_change_percentage_24h).toFixed(2)}%
                        </td>
                        <td className="py-4 text-right text-gray-400">
                          {formatMarketCap(crypto.market_cap)}
                        </td>
                        <td className="py-4 pr-2 text-right">
                          <button
                            onClick={() => toggleWatchlist(crypto)}
                            className={`p-2 rounded-full ${watchlist.some(item => item.id === crypto.id) ? 'bg-yellow-500/20 text-yellow-400' : 'bg-gray-700 hover:bg-gray-600'}`}
                          >
                            {watchlist.some(item => item.id === crypto.id) ? (
                              <Star className="h-5 w-5 fill-yellow-400" />
                            ) : (
                              <Plus className="h-5 w-5" />
                            )}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Watchlist Section */}
      <section id="watchlist" className="py-16 px-6 bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-2 flex items-center">
            <Star className="mr-2 text-yellow-400 fill-yellow-400" /> My Watchlist
          </h2>
          <p className="text-gray-400 mb-8">Your personalized cryptocurrency tracking list</p>
          
          {watchlist.length === 0 ? (
            <div className="bg-gray-700 rounded-xl p-12 text-center">
              <div className="flex justify-center mb-4">
                <Star className="h-12 w-12 text-yellow-400" />
              </div>
              <h3 className="text-xl font-bold mb-2">Your watchlist is empty</h3>
              <p className="text-gray-400 mb-4">Add cryptocurrencies to your watchlist to track their performance</p>
              <a 
                href="#market" 
                className="inline-flex items-center bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold py-2 px-4 rounded-lg transition"
              >
                <Plus className="mr-2" /> Browse Market
              </a>
            </div>
          ) : (
            <div className="bg-gray-700 rounded-xl p-4 overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left border-b border-gray-600">
                    <th className="pb-4 pl-2">#</th>
                    <th className="pb-4">Coin</th>
                    <th className="pb-4 text-right">Price</th>
                    <th className="pb-4 text-right">24h Change</th>
                    <th className="pb-4 text-right">Market Cap</th>
                    <th className="pb-4 pr-2 text-right">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {watchlist.map((crypto, index) => (
                    <tr key={crypto.id} className="border-b border-gray-600 hover:bg-gray-600/50">
                      <td className="py-4 pl-2">{index + 1}</td>
                      <td className="py-4">
                        <div className="flex items-center">
                          <div className="bg-gray-500 rounded-full h-8 w-8 flex items-center justify-center mr-3">
                            <span className="text-xs font-bold">{crypto.symbol}</span>
                          </div>
                          <div>
                            <div className="font-medium">{crypto.name}</div>
                            <div className="text-gray-400 text-sm">{crypto.symbol}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 text-right font-medium">
                        {formatPrice(crypto.current_price)}
                      </td>
                      <td className={`py-4 text-right font-medium flex items-center justify-end ${crypto.price_change_percentage_24h >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {crypto.price_change_percentage_24h >= 0 ? (
                          <ArrowUp className="h-4 w-4 mr-1" />
                        ) : (
                          <ArrowDown className="h-4 w-4 mr-1" />
                        )}
                        {Math.abs(crypto.price_change_percentage_24h).toFixed(2)}%
                      </td>
                      <td className="py-4 text-right text-gray-400">
                        {formatMarketCap(crypto.market_cap)}
                      </td>
                      <td className="py-4 pr-2 text-right">
                        <button
                          onClick={() => toggleWatchlist(crypto)}
                          className="p-2 rounded-full bg-red-500/20 text-red-400 hover:bg-red-500/30"
                        >
                          <X className="h-5 w-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Why Choose CryptoWatch?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-800 p-8 rounded-xl hover:transform hover:scale-105 transition duration-300">
              <div className="bg-yellow-500/20 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <TrendingUp className="text-yellow-400 h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-2">Real-time Data</h3>
              <p className="text-gray-400">
                Get up-to-the-second price updates and market movements for all major cryptocurrencies.
              </p>
            </div>
            
            <div className="bg-gray-800 p-8 rounded-xl hover:transform hover:scale-105 transition duration-300">
              <div className="bg-yellow-500/20 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <Star className="text-yellow-400 h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-2">Personalized Watchlist</h3>
              <p className="text-gray-400">
                Track only the cryptocurrencies you care about with your customizable watchlist.
              </p>
            </div>
            
            <div className="bg-gray-800 p-8 rounded-xl hover:transform hover:scale-105 transition duration-300">
              <div className="bg-yellow-500/20 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <Shield className="text-yellow-400 h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-2">Secure & Private</h3>
              <p className="text-gray-400">
                We don't store your personal data or require accounts to use our tracking features.
              </p>
            </div>
          </div>
          
          <div className="mt-16 bg-gradient-to-r from-gray-800 to-gray-900 rounded-xl overflow-hidden">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/2 p-10">
                <h3 className="text-2xl font-bold mb-4">Comprehensive Market Overview</h3>
                <p className="text-gray-400 mb-6">
                  Our platform provides detailed insights into thousands of cryptocurrencies, including price charts, 
                  historical data, market capitalization, trading volume, and more - all in one place.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <div className="bg-yellow-500/20 p-1 rounded-full mr-3 mt-1">
                      <div className="bg-yellow-400 h-2 w-2 rounded-full"></div>
                    </div>
                    <span>Detailed coin information and statistics</span>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-yellow-500/20 p-1 rounded-full mr-3 mt-1">
                      <div className="bg-yellow-400 h-2 w-2 rounded-full"></div>
                    </div>
                    <span>Price alerts and notifications</span>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-yellow-500/20 p-1 rounded-full mr-3 mt-1">
                      <div className="bg-yellow-400 h-2 w-2 rounded-full"></div>
                    </div>
                    <span>Portfolio tracking tools</span>
                  </li>
                </ul>
              </div>
              <div className="md:w-1/2">
                <img 
                  src= {chart}
                  alt="Crypto charts" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 px-6 bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0 md:pr-10">
              <h2 className="text-3xl font-bold mb-6">About CryptoWatch</h2>
              <p className="text-gray-400 mb-6">
                CryptoWatch was founded in 2023 with the mission to make cryptocurrency market data accessible 
                and understandable for everyone, from beginners to experienced traders.
              </p>
              <p className="text-gray-400 mb-6">
                Our team of blockchain enthusiasts and data analysts work tirelessly to provide the most accurate 
                and up-to-date information in an intuitive interface.
              </p>
              <p className="text-gray-400">
                We believe in the transformative power of cryptocurrency and blockchain technology, and we're 
                committed to helping our users navigate this exciting space with confidence.
              </p>
            </div>
            <div className="md:w-1/2">
              <img 
                src= {watch} 
                alt="About CryptoWatch" 
                className="rounded-xl shadow-xl w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 px-6 bg-gradient-to-br from-gray-900 to-gray-800">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Stay Updated with Crypto Markets</h2>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter for weekly market insights, new feature announcements, and cryptocurrency news.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="flex-grow bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
            <button className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold py-3 px-6 rounded-lg transition">
              Subscribe
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 py-12 px-6 border-t border-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Coins className="text-yellow-400 h-8 w-8" />
                <span className="text-xl font-bold">CryptoWatch</span>
              </div>
              <p className="text-gray-400">
                The most comprehensive cryptocurrency tracking platform for investors and enthusiasts.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-4">Market</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-yellow-400 transition">Top Cryptocurrencies</a></li>
                <li><a href="#" className="text-gray-400 hover:text-yellow-400 transition">Gainers & Losers</a></li>
                <li><a href="#" className="text-gray-400 hover:text-yellow-400 transition">New Listings</a></li>
                <li><a href="#" className="text-gray-400 hover:text-yellow-400 transition">Market Overview</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-4">Resources</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-yellow-400 transition">Guides</a></li>
                <li><a href="#" className="text-gray-400 hover:text-yellow-400 transition">Glossary</a></li>
                <li><a href="#" className="text-gray-400 hover:text-yellow-400 transition">API</a></li>
                <li><a href="#" className="text-gray-400 hover:text-yellow-400 transition">Help Center</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-4">Company</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-yellow-400 transition">About Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-yellow-400 transition">Careers</a></li>
                <li><a href="#" className="text-gray-400 hover:text-yellow-400 transition">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-yellow-400 transition">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 mb-4 md:mb-0">
              © 2023 CryptoWatch. All rights reserved.
            </div>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-yellow-400 transition">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-yellow-400 transition">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-yellow-400 transition">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-yellow-400 transition">
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;