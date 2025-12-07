import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../components/common/Navbar';
import { Footer } from '../components/common/Footer';

export default function PricingPage() {
  const [isYearly, setIsYearly] = useState(false);
  const navigate = useNavigate();

  const plans = [
    {
      name: "Starter",
      price: "0",
      description: "Perfect for students and first-time interviewees.",
      features: [
        "Access to 50+ interview experiences",
        "Read basic company reviews",
        "Community forum access",
        "Basic salary insights"
      ],
      cta: "Get Started Free",
      popular: false,
    },
    {
      name: "Pro",
      price: isYearly ? "799" : "999",
      description: "Everything you need to crack your dream job.",
      features: [
        "Unlimited interview experiences",
        "Detailed breakdown of rounds",
        "Salary negotiation guides",
        "Mock interview peer matching",
        "Priority community support"
      ],
      cta: "Upgrade to Pro",
      popular: true,
    },
    {
      name: "Team",
      price: isYearly ? "2999" : "3999",
      description: "For coaching institutes and placement cells.",
      features: [
        "Admin dashboard",
        "Bulk student access",
        "Performance analytics",
        "Custom roadmap generation",
        "Dedicated account manager"
      ],
      cta: "Contact Sales",
      popular: false,
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans overflow-x-hidden">
      <Navbar />

      <div className="relative pt-24 pb-12 lg:pt-32 px-4 sm:px-6 lg:px-8">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full z-0 pointer-events-none">
          <div className="absolute top-20 left-1/4 w-96 h-96 bg-purple-300/30 rounded-full blur-3xl mix-blend-multiply animate-blob"></div>
          <div className="absolute top-20 right-1/4 w-96 h-96 bg-indigo-300/30 rounded-full blur-3xl mix-blend-multiply animate-blob animation-delay-2000"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-slate-900 tracking-tight mb-6 animate-fade-in-up">
            Simple, transparent <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">
              pricing for everyone.
            </span>
          </h1>
          <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto animate-fade-in-up delay-100">
            Invest in your career for less than the price of a movie ticket. No hidden fees, cancel anytime.
          </p>

          <div className="flex items-center justify-center gap-4 mb-16 animate-fade-in-up delay-200">
            <span className={`text-sm font-semibold ${!isYearly ? 'text-slate-900' : 'text-slate-500'}`}>Monthly</span>
            <button 
              onClick={() => setIsYearly(!isYearly)}
              className="relative w-14 h-8 bg-slate-200 rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
            >
              <div 
                className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full shadow transition-transform duration-300 ${isYearly ? 'translate-x-6' : 'translate-x-0'}`}
              ></div>
            </button>
            <span className={`text-sm font-semibold ${isYearly ? 'text-slate-900' : 'text-slate-500'}`}>
              Yearly <span className="text-xs text-purple-600 bg-purple-100 px-2 py-0.5 rounded-full ml-1">Save 20%</span>
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {plans.map((plan, index) => (
            <div 
              key={plan.name}
              className={`relative bg-white rounded-2xl p-8 transition-all duration-300 hover:-translate-y-2
                ${plan.popular 
                  ? 'border-2 border-purple-500 shadow-2xl shadow-purple-500/20 scale-105 z-10' 
                  : 'border border-slate-200 shadow-xl hover:shadow-2xl'
                }`}
            >
              {plan.popular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-4 py-1 rounded-full text-sm font-bold shadow-lg">
                  Most Popular
                </div>
              )}

              <h3 className="text-xl font-bold text-slate-900">{plan.name}</h3>
              <p className="text-slate-500 text-sm mt-2 min-h-[40px]">{plan.description}</p>
              
              <div className="my-6 flex items-baseline">
                <span className="text-2xl font-bold text-slate-900 mr-1">₹</span>
                <span className="text-5xl font-bold text-slate-900">{plan.price}</span>
                <span className="text-slate-500 ml-1">/mo</span>
              </div>

              <button 
                onClick={() => navigate('/signup')}
                className={`w-full py-3 rounded-xl font-bold transition-all duration-200 mb-8
                  ${plan.popular
                    ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:shadow-lg hover:shadow-purple-500/30'
                    : 'bg-slate-50 text-slate-900 hover:bg-slate-100 border border-slate-200'
                  }`}
              >
                {plan.cta}
              </button>

              <ul className="space-y-4">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-slate-600">
                    <svg className="w-5 h-5 text-purple-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-20 max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-8">Frequently Asked Questions</h2>
          <div className="space-y-4 text-left">
            <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
              <h3 className="font-semibold text-slate-900 mb-2">Can I cancel my subscription?</h3>
              <p className="text-slate-600">Yes, you can cancel at any time. Your access will remain active until the end of the current billing cycle.</p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
              <h3 className="font-semibold text-slate-900 mb-2">Is there a student discount?</h3>
              <p className="text-slate-600">Absolutely! Students with a valid .edu email or college ID get an additional 50% off the Pro plan.</p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
              <h3 className="font-semibold text-slate-900 mb-2">How accurate is the salary data?</h3>
              <p className="text-slate-600">Our salary data is crowdsourced from verified candidates and matched against industry standards in Indian tech hubs (Bangalore, Hyderabad, etc).</p>
            </div>
          </div>
        </div>
      </div>

      <Footer />

      <style>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          opacity: 0;
        }
        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
        .animation-delay-2000 { animation-delay: 2s; }
      `}</style>
    </div>
  );
}