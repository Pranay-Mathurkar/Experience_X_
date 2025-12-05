import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AddReviewPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    company: '',
    role: '',
    rating: '5',
    review: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.company || !formData.role || !formData.review) {
      alert("Please fill in all required fields.");
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      console.log("Review Submitted:", formData);
      alert("Review submitted successfully!");
      setIsSubmitting(false);
      navigate('/'); 
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6">
      <div className="max-w-2xl mx-auto">
        
        <button
          onClick={() => navigate('/')}
          className="group flex items-center text-slate-500 mb-8 hover:text-purple-600 transition-colors duration-200"
        >
          <span className="mr-2 text-xl group-hover:-translate-x-1 transition-transform">
            &larr;
          </span> 
          Back to Home
        </button>

        <div className="bg-white p-8 md:p-10 rounded-2xl shadow-xl shadow-slate-200/60 border border-slate-100">
          
          <div className="mb-8 border-b border-slate-100 pb-6">
            <h1 className="text-3xl font-bold text-slate-900">Add Interview Review</h1>
            <p className="text-slate-500 mt-2">
              Share your experience to help the community grow.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Company Name</label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="Ex: Google"
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:bg-white focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Role / Job Title</label>
                <input
                  type="text"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  placeholder="Ex: Frontend Engineer"
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:bg-white focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Overall Rating</label>
              <div className="relative">
                <select
                  name="rating"
                  value={formData.rating}
                  onChange={handleChange}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:bg-white focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition-all appearance-none cursor-pointer"
                >
                  <option value="1">1 - Poor Experience</option>
                  <option value="2">2 - Fair Experience</option>
                  <option value="3">3 - Average Experience</option>
                  <option value="4">4 - Good Experience</option>
                  <option value="5">5 - Excellent Experience</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-slate-500">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" /></svg>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Detailed Review
              </label>
              <textarea
                name="review"
                value={formData.review}
                onChange={handleChange}
                rows="6"
                placeholder="Share details about the interview process, questions asked, and the environment..."
                className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:bg-white focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition-all resize-y"
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-3.5 px-6 rounded-xl font-bold text-white shadow-lg shadow-purple-500/30 transition-all duration-200 transform
                ${isSubmitting 
                  ? 'bg-purple-300 cursor-not-allowed' 
                  : 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:shadow-purple-500/50 hover:-translate-y-0.5 active:scale-[0.98]'
                }`}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Review'}
            </button>

          </form>
        </div>
      </div>
    </div>
  );
}
