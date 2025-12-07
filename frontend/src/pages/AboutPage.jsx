import React from "react";
import { Navbar } from "../components/common/Navbar";
import { Footer } from "../components/common/Footer";

export default function AboutPage() {
  return (
    <div className="min-h-screen w-full bg-white flex flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="max-w-5xl mx-auto px-4 pt-16 pb-10">
          <p className="text-xs uppercase tracking-[0.2em] text-blue-600 font-semibold">
            About Interview Archive
          </p>
          <h1 className="mt-3 text-3xl md:text-4xl font-bold text-gray-900">
            Helping students crack interviews with{" "}
            <span className="text-blue-600">real experiences</span>.
          </h1>
          <p className="mt-4 text-gray-600 text-sm md:text-base max-w-2xl">
            Interview Archive is a community-driven platform where students and professionals
            share their real interview experiences — rounds, questions, tips, and mistakes —
            so others can prepare smarter and with confidence.
          </p>
        </section>

        {/* Mission / Vision / What we do */}
        <section className="max-w-5xl mx-auto px-4 pb-12 grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-gray-100 shadow-sm p-5">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">Our Mission</h2>
            <p className="text-sm text-gray-600">
              To make interview preparation transparent and accessible by collecting
              real stories from candidates across companies, roles, and locations.
            </p>
          </div>

          <div className="rounded-2xl border border-gray-100 shadow-sm p-5">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">What We Do</h2>
            <p className="text-sm text-gray-600">
              We organize interview experiences into a searchable archive so you can explore
              company-wise, role-wise, difficulty-wise and learn exactly what to expect.
            </p>
          </div>

          <div className="rounded-2xl border border-gray-100 shadow-sm p-5">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">Who It’s For</h2>
            <p className="text-sm text-gray-600">
              Students, freshers, and working professionals preparing for internships,
              placements, and job switches in tech and related roles.
            </p>
          </div>
        </section>

   
        <section className="max-w-5xl mx-auto px-4 pb-14">
          <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-4">
            How Interview Archive works
          </h2>

          <div className="grid gap-5 md:grid-cols-3">
            <div className="rounded-2xl border border-gray-100 shadow-sm p-5">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-blue-50 text-blue-600 text-sm font-semibold">
                1
              </span>
              <h3 className="mt-3 text-base font-semibold text-gray-900">
                Explore company experiences
              </h3>
              <p className="mt-2 text-xs md:text-sm text-gray-600">
                Search by company, role, location, difficulty level, or interview type and
                see what others faced in their recent interviews.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-100 shadow-sm p-5">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-blue-50 text-blue-600 text-sm font-semibold">
                2
              </span>
              <h3 className="mt-3 text-base font-semibold text-gray-900">
                Learn from detailed breakdowns
              </h3>
              <p className="mt-2 text-xs md:text-sm text-gray-600">
                Each experience includes rounds, types of questions, topics asked, difficulty,
                and outcome — so you know where to focus.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-100 shadow-sm p-5">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-blue-50 text-blue-600 text-sm font-semibold">
                3
              </span>
              <h3 className="mt-3 text-base font-semibold text-gray-900">
                Share your own journey
              </h3>
              <p className="mt-2 text-xs md:text-sm text-gray-600">
                After your interview, contribute back by sharing your experience and help
                someone else prepare better.
              </p>
            </div>
          </div>
        </section>

        {/* Values / Why trust us */}
        <section className="max-w-5xl mx-auto px-4 pb-14">
          <div className="rounded-2xl border border-gray-100 shadow-sm p-6 md:p-7 bg-gradient-to-br from-blue-50/60 to-white">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-3">
              Built for transparency, powered by community.
            </h2>
            <p className="text-sm md:text-base text-gray-700 mb-4">
              We believe interview prep shouldn’t feel like guessing in the dark. With honest
              experiences from people just like you, you get clarity on patterns, commonly
              asked topics, and actual expectations from companies.
            </p>
            <ul className="list-disc list-inside text-xs md:text-sm text-gray-700 space-y-1">
              <li>No fake “guarantees” — just real stories.</li>
              <li>Experiences from multiple colleges, cities, and backgrounds.</li>
              <li>Continuously growing archive as more users contribute.</li>
            </ul>
          </div>
        </section>

        {/* Call to action */}
        <section className="max-w-5xl mx-auto px-4 pb-16">
          <div className="rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h2 className="text-lg md:text-xl font-semibold text-gray-900">
                Ready to help someone crack their next interview?
              </h2>
              <p className="mt-1 text-sm text-gray-600">
                Share your recent interview experience and make the process easier for the next person.
              </p>
            </div>
            <button
              onClick={() => (window.location.href = "/")} 
              className="inline-flex items-center justify-center px-5 py-2.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium shadow-md"
            >
              Share your experience
            </button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
