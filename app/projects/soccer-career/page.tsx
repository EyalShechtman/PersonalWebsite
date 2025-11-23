import Link from "next/link";
export default function SoccerCareerPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <header className="p-4 md:p-6 lg:p-8">
        <Link href="/" className="text-blue-400 hover:text-blue-300 transition-colors">
          &larr; Back to Home
        </Link>
      </header>
      <main className="container mx-auto p-4 md:p-6 lg:p-8">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8">My Soccer Career</h1>
        <div className="max-w-4xl mx-auto">
          <article className="space-y-6 text-lg text-gray-300">
            <p>
              For the past decade, I have dedicated myself to competitive soccer. My journey has been a rewarding one, taking me from local fields to the highly competitive ECNL (Elite Clubs National League). I also had the incredible opportunity to experience the sport in Europe, which broadened my perspective on the game both technically and culturally.
            </p>
            <p>
              Beyond my own playing career, I have a passion for mentoring young athletes. I spent two years coaching children under the age of 10, helping them develop fundamental skills and, more importantly, a love for the game.
            </p>
            <p>
              Currently, I channel my expertise and passion for athletic development as a personal trainer and coach at the Sammamish Sports Foundation (SSF). It is a privilege to continue contributing to the sports community and helping athletes of all ages achieve their goals.
            </p>
          </article>
        </div>
      </main>
    </div>
  );
}