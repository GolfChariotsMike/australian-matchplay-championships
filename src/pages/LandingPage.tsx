import React from 'react';
import { Link } from 'react-router-dom';

const CheckIcon = () => (
  <svg className="w-5 h-5 text-bowls-gold flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
  </svg>
);

const ArrowRight = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
);

const FormatStep: React.FC<{ number: string; title: string; description: string; badge?: string }> = ({
  number, title, description, badge
}) => (
  <div className="flex gap-4">
    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-bowls-gold/20 border-2 border-bowls-gold flex items-center justify-center">
      <span className="text-bowls-gold font-bold text-lg">{number}</span>
    </div>
    <div className="flex-1 pt-1">
      <div className="flex items-center gap-2 mb-1">
        <h3 className="font-bold text-white text-lg">{title}</h3>
        {badge && <span className="badge badge-gold">{badge}</span>}
      </div>
      <p className="text-gray-300 text-sm leading-relaxed">{description}</p>
    </div>
  </div>
);

const EventCard: React.FC<{ title: string; price: string; division?: string; description: string; features: string[] }> = ({
  title, price, division, description, features
}) => (
  <div className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300">
    <div className="bg-bowls-green p-6">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-white font-bold text-xl">{title}</h3>
          {division && <p className="text-bowls-gold text-sm font-medium mt-1">{division}</p>}
        </div>
        <div className="text-right">
          <div className="text-bowls-gold text-3xl font-bold">{price}</div>
          <div className="text-gray-300 text-xs">per entry</div>
        </div>
      </div>
    </div>
    <div className="p-6">
      <p className="text-gray-600 text-sm mb-4 leading-relaxed">{description}</p>
      <ul className="space-y-2">
        {features.map((f, i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
            <CheckIcon />
            <span>{f}</span>
          </li>
        ))}
      </ul>
    </div>
    <div className="px-6 pb-6">
      <Link to="/register" className="btn-primary w-full justify-center">
        Enter Now <ArrowRight />
      </Link>
    </div>
  </div>
);

export const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-bowls-green-dark relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 25px 25px, white 2px, transparent 0), radial-gradient(circle at 75px 75px, white 2px, transparent 0)',
            backgroundSize: '100px 100px'
          }} />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-24 sm:pt-24 sm:pb-32">
          <div className="text-center max-w-4xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-bowls-gold/20 border border-bowls-gold/40 rounded-full px-4 py-1.5 mb-6">
              <span className="w-2 h-2 rounded-full bg-bowls-gold animate-pulse" />
              <span className="text-bowls-gold text-sm font-semibold uppercase tracking-wider">2026 Season — Now Open</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold text-white leading-tight mb-6">
              Australian Matchplay{' '}
              <span className="text-bowls-gold">Championships</span>
            </h1>

            <p className="text-xl sm:text-2xl text-gray-300 mb-4 font-light max-w-3xl mx-auto leading-relaxed">
              Australia's first independent nationwide lawn bowls matchplay competition.
              Play from your local club — compete for a national title.
            </p>
            
            <p className="text-gray-400 mb-10 max-w-2xl mx-auto">
              Regional pools → National knockout → Guaranteed minimum 4 matches for every entrant.
              No set match days. No travel required until finals.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/register" className="btn-primary text-lg px-8 py-4 w-full sm:w-auto justify-center">
                Enter the 2026 Season
                <ArrowRight />
              </Link>
              <a href="#format" className="btn-outline-gold text-lg px-8 py-4 w-full sm:w-auto justify-center">
                How It Works
              </a>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mt-16 max-w-lg mx-auto">
              <div className="text-center">
                <div className="text-bowls-gold text-3xl font-bold">3+</div>
                <div className="text-gray-400 text-xs mt-1">Guaranteed Matches</div>
              </div>
              <div className="text-center border-x border-white/10">
                <div className="text-bowls-gold text-3xl font-bold">8</div>
                <div className="text-gray-400 text-xs mt-1">States & Territories</div>
              </div>
              <div className="text-center">
                <div className="text-bowls-gold text-3xl font-bold">$25K</div>
                <div className="text-gray-400 text-xs mt-1">First Prize (Div 1)</div>
              </div>
            </div>
          </div>
        </div>

        {/* Wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 80L1440 80L1440 40C1200 0 720 80 0 40L0 80Z" fill="#faf8f2" />
          </svg>
        </div>
      </section>

      {/* About strip */}
      <section className="bg-bowls-cream py-8 border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-6 sm:gap-10 text-center">
            {[
              { icon: '🏆', text: 'National Title Up For Grabs' },
              { icon: '📱', text: 'Digital-First Platform' },
              { icon: '🌏', text: 'Play From Your Local Club' },
              { icon: '⚡', text: 'Flexible Scheduling' },
            ].map(({ icon, text }) => (
              <div key={text} className="flex items-center gap-2 text-bowls-green font-semibold">
                <span className="text-2xl">{icon}</span>
                <span className="text-sm">{text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Format */}
      <section id="format" className="py-20 bg-bowls-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="text-bowls-gold text-sm font-semibold uppercase tracking-widest mb-2">The Format</div>
            <h2 className="section-title mb-4">From Local Pools to National Final</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Self-organise your matches, compete within your region, then go national.
              Every player is guaranteed at least 4 matches — win or lose.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-start">
            {/* Timeline */}
            <div className="bg-bowls-green rounded-2xl p-8 shadow-xl">
              <h3 className="text-bowls-gold font-bold text-lg mb-6 uppercase tracking-wider">Season Journey</h3>
              <div className="space-y-6">
                <FormatStep
                  number="1"
                  title="Registration"
                  description="Sign up online. Choose your event(s), pay your entry fee. Draw announced 2 weeks before pool stage starts."
                />
                <div className="border-l-2 border-bowls-gold/20 ml-6 pl-4 py-1" />
                <FormatStep
                  number="2"
                  title="Regional Pool Stage"
                  badge="6 Weeks"
                  description="Drawn into groups of 4 players from your region. Play all 3 opponents — organise matches around your schedule."
                />
                <div className="border-l-2 border-bowls-gold/20 ml-6 pl-4 py-1" />
                <FormatStep
                  number="3"
                  title="National Knockout"
                  description="Top 2 from each pool + Lucky Losers advance. Single-elimination rounds, one month per round."
                />
                <div className="border-l-2 border-bowls-gold/20 ml-6 pl-4 py-1" />
                <FormatStep
                  number="4"
                  title="Plate Competition"
                  badge="Guaranteed"
                  description="Miss the knockout cut? Enter the Plate — a separate knockout for pool-stage exits. Everyone gets 4+ matches."
                />
                <div className="border-l-2 border-bowls-gold/20 ml-6 pl-4 py-1" />
                <FormatStep
                  number="5"
                  title="National Finals"
                  description="State champions converge. One venue, one weekend, one national champion."
                />
              </div>
            </div>

            {/* Match flow */}
            <div className="space-y-6">
              <div className="card">
                <h3 className="font-bold text-bowls-green text-lg mb-4">How a Match Works</h3>
                <ol className="space-y-3">
                  {[
                    "Draw made → both players notified by email",
                    "Home player picks venue (their club) and messages opponent",
                    "Players organise date & time via match page",
                    "Match played at home player's club",
                    "Winner submits score via app",
                    "Loser receives notification to confirm",
                    "Next round opponent notified instantly"
                  ].map((step, i) => (
                    <li key={i} className="flex gap-3 text-sm text-gray-700">
                      <span className="w-6 h-6 rounded-full bg-bowls-green text-white text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="card border-l-4 border-bowls-gold">
                <h3 className="font-bold text-bowls-green mb-3">Lucky Losers System</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  The best 3rd-place pool finishers fill the knockout bracket to the nearest power of 2. 
                  So even if you finish 3rd in your pool, you might still make the main knockout. 
                  Ranked by: points → shot differential → head-to-head.
                </p>
              </div>

              <div className="bg-bowls-gold/10 border border-bowls-gold/30 rounded-xl p-5">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">💡</span>
                  <div>
                    <h4 className="font-bold text-bowls-green-dark mb-1">Example: 750 entries</h4>
                    <div className="text-sm text-gray-600 space-y-1">
                      <p>188 pools → 376 top-2 qualifiers + 136 lucky losers = 512-player bracket</p>
                      <p>374 pool exits → enter the Plate competition (own prize pool)</p>
                      <p>Every player gets <strong className="text-bowls-green">minimum 4 matches</strong> for their $100</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Events & Pricing */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="text-bowls-gold text-sm font-semibold uppercase tracking-widest mb-2">Enter The Competition</div>
            <h2 className="section-title mb-4">Choose Your Event</h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              One entry fee covers the entire season — from regional pools through to the national final.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <EventCard
              title="Singles"
              price="$100"
              division="Division 1+"
              description="For current Div 1, 2, or 3 pennant players. The premier singles competition."
              features={[
                "Minimum 3 pool matches",
                "Lucky loser pathway to knockout",
                "Plate competition guaranteed",
                "$25,000 first prize (optimistic)",
                "Play from your home club"
              ]}
            />
            <EventCard
              title="Singles"
              price="$100"
              division="Division 2+"
              description="For Div 2, 3, or social players. Your pathway to a national title."
              features={[
                "Minimum 3 pool matches",
                "Lucky loser pathway to knockout",
                "Plate competition guaranteed",
                "$15,000 first prize (optimistic)",
                "Play from your home club"
              ]}
            />
            <EventCard
              title="Pairs"
              price="$200"
              division="Open — All Levels"
              description="Team up with your playing partner and take on the nation. Open to all divisions."
              features={[
                "$100 per player",
                "Minimum 3 pool matches",
                "One partner registers both",
                "$15,000 first prize (optimistic)",
                "Play from your home club"
              ]}
            />
          </div>

          <p className="text-center text-xs text-gray-400 mt-6">
            * Prize pools increase with entry numbers. All prizes sponsor-funded where possible.
          </p>
        </div>
      </section>

      {/* Why AMC */}
      <section className="py-20 bg-bowls-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="text-bowls-gold text-sm font-semibold uppercase tracking-widest mb-2">Why Enter</div>
            <h2 className="section-title mb-4">Built Different</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: '🏠',
                title: 'Play From Home',
                desc: 'Home player hosts at their club. No expensive travel until state/national finals.'
              },
              {
                icon: '📅',
                title: 'Flexible Scheduling',
                desc: 'No set match days. Coordinate with your opponent and play when it suits you — within the round window.'
              },
              {
                icon: '🎯',
                title: 'Guaranteed Matches',
                desc: 'Every entrant gets minimum 3 pool matches + 1 plate match = 4 matches minimum for $100.'
              },
              {
                icon: '📱',
                title: 'All-Digital',
                desc: 'Register, draw, message, submit results — everything through the app. No paperwork, no committee meetings.'
              },
              {
                icon: '🗺️',
                title: 'Truly National',
                desc: 'Compete across all 8 states and territories. The only independent nationwide bowls matchplay competition.'
              },
              {
                icon: '🏆',
                title: 'Real Prizes',
                desc: 'Meaningful prize money that scales with entries. Win your state, then compete for the national title.'
              },
            ].map(({ icon, title, desc }) => (
              <div key={title} className="card hover:shadow-md transition-shadow">
                <div className="text-3xl mb-3">{icon}</div>
                <h3 className="font-bold text-bowls-green mb-2">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-16 bg-bowls-green">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-white mb-4">
            Ready to Compete for Australia?
          </h2>
          <p className="text-gray-300 mb-8 text-lg">
            Registration for the 2026 season is open now. Don't miss your chance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register" className="btn-primary text-lg px-8 py-4 justify-center">
              Register Now — $100 Singles / $200 Pairs
              <ArrowRight />
            </Link>
          </div>
          <p className="text-gray-400 text-sm mt-6">
            Questions? Email{' '}
            <a href="mailto:info@australianmatchplay.com.au" className="text-bowls-gold hover:underline">
              info@australianmatchplay.com.au
            </a>
          </p>
        </div>
      </section>
    </div>
  );
};
