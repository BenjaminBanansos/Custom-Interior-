export default function Page() {
  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `@layer base{html,body{margin:0;padding:0;}body{overscroll-behavior:none;}main>:first-child{margin-top:0!important;}main>:last-child{margin-bottom:0!important;}}::-webkit-scrollbar{display:none;}`,
        }}
      />
      <header className="fixed top-0 left-0 right-0 z-50 bg-surface-container-lowest/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.03)]">
        <div className="h-20 w-full px-margin-mobile lg:px-margin flex items-center justify-between gap-gutter">
          <div className="flex items-center gap-space-md">
            <a
              className="flex items-center gap-space-sm group"
              data-path="home"
              href="#"
            >
              <img
                alt="Profile"
                className="w-8 h-8 rounded-full object-cover"
                src="https://lh3.googleusercontent.com/aida/AEtjO1WZi7f9YBpfgzn0EU8P8PLEKc8QlQRd7_L2pyYr64TTGzMBZwp8GoWlWNcO3SoyM-UCUf6VqgC7t3u28Qv2IEptmoEPks1-b1lUmla3us8hwGljN-0sW-P0LZhLz0beLk83Q0L5ifyj2z7lTU6Qc7VdmIXyVhXhMrDv94ui0U_vI1xDHaOpcaqDW45nwGInwW_Z4mNR-ipQTekyzZOL11KpCmWpZ1FbYAC0Sbe4Hmxp-ZT5-oIBUMt1gzpaoif-WuFdc-VaJeqic0A"
              />
              <div className="flex flex-col">
                <span className="font-headline-sm text-headline-sm tracking-tight text-on-surface">
                  SMART DECOR HOME INTERIOS
                </span>
                <span className="font-label-sm text-label-sm text-secondary uppercase -mt-1">
                  Architectural Automation
                </span>
              </div>
            </a>
          </div>
          <nav
            className="hidden xl:flex items-center gap-space-lg"
            data-active-classes="text-on-surface font-bold"
          >
            <a
              className="font-label-md text-label-md text-on-surface-variant hover:text-on-surface uppercase transition-colors duration-200"
              data-path="collections"
              href="#"
            >
              Collections
            </a>
            <a
              className="font-label-md text-label-md text-on-surface-variant hover:text-on-surface uppercase transition-colors duration-200"
              data-path="about"
              href="#"
            >
              About
            </a>
          </nav>
          <div className="flex items-center gap-space-md">
            <button
              aria-label="Search"
              className="p-space-xs text-on-surface-variant hover:text-on-surface transition-colors flex items-center justify-center"
              type="button"
            >
              <span className="material-symbols-outlined text-[20px]">
                search
              </span>
            </button>
            <a
              className="hidden sm:inline-flex items-center justify-center px-space-md py-space-xs rounded-lg font-label-md text-label-md uppercase tracking-wider bg-surface-container-lowest text-on-surface shadow-[0_1px_6px_rgba(0,0,0,0.06)] hover:bg-surface-container-low transition-all duration-200"
              data-path="installation-partners"
              href="#installation-partners"
            >
              Installation Network
            </a>
          </div>
        </div>
      </header>
      <main className="w-full pt-20 bg-surface-container-lowest min-h-screen">
        <div className="flex flex-col w-full">
          {/* HERO: Pure Light, Editorial & Architectural Spatial Rhythm */}
          <section className="relative w-full px-margin-mobile lg:px-margin pt-space-lg lg:pt-space-xl pb-space-xl overflow-hidden bg-surface-container-lowest">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-center">
              {/* Text Narrative Column */}
              <div className="lg:col-span-6 flex flex-col items-start z-10">
                <div className="inline-flex items-center gap-space-xs px-space-sm py-1 rounded-full bg-surface-container-low mb-space-md shadow-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                  <span className="font-label-sm text-label-sm text-secondary uppercase tracking-[0.2em]">
                    Haute Architecture &amp; Smart Living
                  </span>
                </div>
                <h1 className="font-display-lg text-display-lg text-on-surface mb-space-md leading-[1.08] tracking-tight">
                  Precision Living. <br />
                  <em className="font-normal italic text-on-surface/90">
                    Invisible Automation.
                  </em>
                </h1>
                <p className="font-body-lg text-body-lg text-on-surface-variant max-w-xl mb-space-lg font-light leading-relaxed">
                  Millimeter-calibrated motorized drapery, trimless circadian
                  illumination, and concealed acoustic warmth—crafted in silence
                  for sovereign residential retreats.
                </p>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-space-md w-full sm:w-auto">
                  <a
                    className="inline-flex items-center justify-center px-space-lg py-3 rounded-lg bg-primary-container text-on-primary font-label-md text-label-md uppercase tracking-widest shadow-md hover:bg-primary-container/90 transition-all duration-300"
                    data-path="collections"
                    href="#"
                  >
                    Explore Collection
                  </a>
                </div>
                {/* Metric micro-strip */}
                <div className="grid grid-cols-3 gap-gutter pt-space-xl mt-space-lg w-full max-w-lg">
                  <div className="flex flex-col"></div>
                </div>
              </div>
              {/* Hero Visual Column */}
              <div className="lg:col-span-6 relative mt-space-lg lg:mt-0">
                {/* Whisper-soft framing backdrop */}
                <div className="absolute -inset-2 rounded-2xl bg-surface-container-low shadow-sm -rotate-1 hidden sm:block"></div>
                <div className="relative rounded-xl overflow-hidden shadow-xl bg-surface-container-lowest aspect-[4/3] lg:aspect-[11/10] group">
                  <img
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                    data-alt="High-end architectural photography of luxury home interior with window blinds and treatments, circular composition frame inspired by modern interior design catalogs."
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDkWebaybcbyrpglvaJXwY3N-nC4Wx476OyX9S_UTAAPKJqZifEaH-nrrt_dFKcf62eXdJgLv-CKzGTK7Nx2zIp8LTgKa06Ih9UapWGl5juXPoALRzSLL5DJL3QqSvXamIyY5ayy6L0auBMhcDOqc8llOn5Nr6TIo3kqWxKdF-yD3wgNXS71oAqPwCejxygkr1IH697V2PwLxVnz0PtjutuDEqaCMuvjfSbTB9ftaQmll3YYjrGMvE8vw"
                  />
                  {/* Editorial Live Atmosphere HUD Float */}
                  <div className="absolute bottom-6 left-6 right-6 p-space-md rounded-lg bg-surface-container-lowest/90 backdrop-blur-md shadow-lg flex items-center justify-between">
                    <div className="flex items-center gap-space-sm">
                      <span className="material-symbols-outlined text-secondary text-[22px]">
                        light_mode
                      </span>
                      <div className="flex flex-col">
                        <span className="font-label-sm text-label-sm text-on-surface uppercase tracking-wider">
                          Morning Solstice Preset
                        </span>
                        <span className="font-body-sm text-body-sm text-on-surface-variant">
                          Sheers: 42% filtered daylight • 2700K warm wash
                        </span>
                      </div>
                    </div>
                    <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded bg-surface-container-low">
                      <span className="w-2 h-2 rounded-full bg-secondary-container animate-pulse"></span>
                      <span className="font-label-sm text-label-sm text-on-surface font-semibold tracking-wider uppercase">
                        Active
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* 4-POINT TRUST & CRAFT STRIP (CANAL / JANAL STYLE) */}
          <section className="w-full px-margin-mobile lg:px-margin py-space-lg bg-surface-container-lowest">
            <div className="p-space-lg rounded-xl bg-surface-container-lowest shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter">
                <div className="flex items-start gap-space-sm group">
                  <div className="w-10 h-10 rounded-lg bg-surface-container-low flex items-center justify-center shrink-0 text-on-surface group-hover:bg-primary-container group-hover:text-on-primary transition-colors duration-300">
                    <span className="material-symbols-outlined text-[20px]">
                      view_in_ar
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-label-sm text-label-sm text-secondary uppercase tracking-widest font-semibold">
                      01. Precision
                    </span>
                    <span className="font-title-md text-title-md text-on-surface mt-1">
                      Laser cut
                    </span>
                    <p className="font-body-sm text-body-sm text-on-surface-variant mt-1 leading-normal">
                      Laser-cut manufacturing&nbsp;
                    </p>
                    <div>
                      <br />
                    </div>
                    <p></p>
                  </div>
                </div>
                <div className="flex items-start gap-space-sm group">
                  <div className="w-10 h-10 rounded-lg bg-surface-container-low flex items-center justify-center shrink-0 text-on-surface group-hover:bg-primary-container group-hover:text-on-primary transition-colors duration-300">
                    <span className="material-symbols-outlined text-[20px]">
                      graphic_eq
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-label-sm text-label-sm text-secondary uppercase tracking-widest font-semibold">
                      02. Engineering
                    </span>
                    <span className="font-title-md text-title-md text-on-surface mt-1">
                      Whisper-Motor Core
                    </span>
                    <p className="font-body-sm text-body-sm text-on-surface-variant mt-1 leading-normal">
                      Brushless DC drives calibrated below audible baseline room
                      frequencies.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-space-sm group">
                  <div className="w-10 h-10 rounded-lg bg-surface-container-low flex items-center justify-center shrink-0 text-on-surface group-hover:bg-primary-container group-hover:text-on-primary transition-colors duration-300">
                    <span className="material-symbols-outlined text-[20px]">
                      verified
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-label-sm text-label-sm text-secondary uppercase tracking-widest font-semibold">
                      04. Longevity
                    </span>
                    <span className="font-title-md text-title-md text-on-surface mt-1">
                      5-Year &nbsp;Manufacturer Warranty
                    </span>
                    <p className="font-body-sm text-body-sm text-on-surface-variant mt-1 leading-normal">
                      White-glove commissioning and continuous passive firmware
                      assurance.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* CURATED ARCHITECTURAL COLLECTIONS */}
          <section className="w-full px-margin-mobile lg:px-margin py-space-xl bg-surface-container-lowest">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-space-lg gap-space-md">
              <div>
                <span className="font-label-sm text-label-sm text-secondary uppercase tracking-[0.2em]">
                  Product Archetypes
                </span>
                <h2 className="font-headline-lg text-headline-lg text-on-surface mt-space-xs">
                  Curated Architectural Systems
                </h2>
              </div>
              <p className="font-body-md text-body-md text-on-surface-variant max-w-md font-light">
                Hardware devised to vanish into drywall, millwork, and stone so
                that light and movement appear unassisted.
              </p>
            </div>
            {/* 3 Editorial Showcase Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter max-w-5xl mx-auto">
              <article className="group flex flex-col rounded-xl bg-surface-container-lowest p-space-md shadow-md hover:shadow-xl transition-all duration-300 border border-surface-container-high/40">
                <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden bg-surface-container-low mb-space-md">
                  <img
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    data-alt="Contemporary motorized zebra duo stripes blinds in modern minimalist residence with alternating sheer and opaque fabric bands softly filtering daylight."
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAldd4vGNYblfUZUAg-_fANywcbrDN9n7ObO7JkVkD6YB6uXFrtNVx8s-jqLZJCJ5sgJ2MgTp4sh7VZzfZVUjFeEzwEARKISTR7FvuCiBtiQbSoi65xUcFL8lKSdIp6f8y5bDdm3qJPRMOX00Pbeuih69fT0uirzSGLjarkizV7gypmvyMRTijHAxdk0yrNvk3qwDywIlDmBJKso6e8vq3f1ztqaIy5kKfEuOXAC1sRXzN1w8j7dPcvYA"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-space-sm py-1 rounded bg-surface-container-lowest/90 backdrop-blur font-label-sm text-label-sm uppercase tracking-wider text-on-surface font-medium">
                      Dual Banded Shading
                    </span>
                  </div>
                </div>
                <div className="flex flex-col flex-1 justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-label-sm text-label-sm text-secondary uppercase tracking-widest font-semibold">
                        Zebra Blinds Architecture
                      </span>
                    </div>
                    <h3 className="font-headline-sm text-headline-sm text-on-surface group-hover:text-secondary transition-colors duration-200">
                      Duo Stripes (Zebra Blinds)
                    </h3>
                  </div>
                </div>
              </article>
            </div>
          </section>
          {/* INTERACTIVE SYSTEM SIMULATION MODULE */}
          <section className="w-full px-margin-mobile lg:px-margin py-space-xl bg-surface-container-lowest">
            <div className="rounded-2xl p-space-lg lg:p-space-xl bg-surface-container-lowest shadow-lg">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-center">
                <div className="lg:col-span-5 flex flex-col">
                  <span className="font-label-sm text-label-sm text-secondary uppercase tracking-[0.2em]">
                    Atmospheric Tuning
                  </span>
                  <h2 className="font-headline-md text-headline-md text-on-surface mt-space-xs mb-space-sm">
                    Tactile Control, Calibrated for Stillness
                  </h2>
                  <p className="font-body-md text-body-md text-on-surface-variant mb-space-lg">
                    Interact with our motorized shading and lumen threshold
                    presets. Experience how subtle modulation transforms
                    architectural volumes without sound.
                  </p>
                  {/* Scene Selector Buttons */}
                  <div className="flex flex-col gap-space-sm">
                    <button
                      className="scene-toggle text-left p-space-md rounded-lg bg-surface-container-low transition-all duration-200 flex items-center justify-between"
                      id="scene-dawn"
                      type="button"
                    >
                      <div>
                        <span className="font-title-md text-title-md text-on-surface block">
                          01. Dawn Awakening
                        </span>
                        <span className="font-body-sm text-body-sm text-on-surface-variant">
                          Linen Sheers 70% • Indirect Horizon Wash 2200K
                        </span>
                      </div>
                      <span className="material-symbols-outlined text-secondary text-[20px]">
                        wb_twilight
                      </span>
                    </button>
                    <button
                      className="scene-toggle text-left p-space-md rounded-lg bg-surface-container-lowest hover:bg-surface-container-low transition-all duration-200 flex items-center justify-between"
                      id="scene-zenith"
                      type="button"
                    >
                      <div>
                        <span className="font-title-md text-title-md text-on-surface block">
                          02. Solar Glare Rejection
                        </span>
                        <span className="font-body-sm text-body-sm text-on-surface-variant">
                          Dual Automated Micro-Drop • 98% UV Block
                        </span>
                      </div>
                      <span className="material-symbols-outlined text-on-surface-variant text-[20px]">
                        wb_sunny
                      </span>
                    </button>
                    <button
                      className="scene-toggle text-left p-space-md rounded-lg bg-surface-container-lowest hover:bg-surface-container-low transition-all duration-200 flex items-center justify-between"
                      id="scene-nocturne"
                      type="button"
                    >
                      <div>
                        <span className="font-title-md text-title-md text-on-surface block">
                          03. Nocturne Sanctuary
                        </span>
                        <span className="font-body-sm text-body-sm text-on-surface-variant">
                          100% Zero-Gap Blackout • Concealed Amber Baseboard
                          1800K
                        </span>
                      </div>
                      <span className="material-symbols-outlined text-on-surface-variant text-[20px]">
                        nightlight
                      </span>
                    </button>
                  </div>
                </div>
                {/* Dynamic Visualization Canvas */}
                <div className="lg:col-span-7 flex flex-col items-center">
                  <div className="w-full aspect-[16/10] rounded-xl overflow-hidden relative shadow-md bg-surface-container-low">
                    <img
                      className="w-full h-full object-cover transition-opacity duration-500 ease-in-out"
                      data-alt="Editorial master bedroom facing high glass windows with sheer motorized drapery gently filtered by subtle warm dawn light. Monolithic bed with raw linen bedding, oak accents, clean modernist simplicity, museum lighting."
                      id="simulation-image"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuBDdHX68uOg49Yw6rQDAi0agPJLvEegk2INtOTp-V49WNqTx1YU7QJkUsPCcUJPdbugK8vTT9y8W9ldUE-TSKIjG1nI0K2TtsiQQ6AmqiFEpatW5yW0TcMji2CZ3fT8zZ0yQOfczwXzfXOrUHhGCeRzPsDy2XTo9orPCId4JuiC0VzYquMoH4m8t7RP8-5ZJVvMB__Mz2zYwuZWUkrnoZ-tvx6AyIVoMkiWqjGfeBCBnn11nEsSsg9AiA"
                    />
                    {/* Realtime Telemetry Card Floating */}
                    <div className="absolute top-6 right-6 p-space-sm rounded-lg bg-surface-container-lowest/90 backdrop-blur shadow-md flex items-center gap-space-md">
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-secondary text-[18px]">
                          volume_off
                        </span>
                        <span className="font-label-sm text-label-sm text-on-surface font-semibold">
                          &lt; 16.4 dBA
                        </span>
                      </div>
                      <div className="w-1 h-3 rounded-full bg-surface-variant"></div>
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-secondary text-[18px]">
                          thermostat
                        </span>
                        <span className="font-label-sm text-label-sm text-on-surface font-semibold">
                          21.5°C Passive
                        </span>
                      </div>
                    </div>
                    {/* Interactive Shading Slider Overlay */}
                    <div className="absolute bottom-6 left-6 right-6 p-space-md rounded-lg bg-surface-container-lowest/95 backdrop-blur shadow-md flex flex-col gap-space-xs">
                      <div className="flex justify-between items-center">
                        <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface font-semibold">
                          Aura Motorized Position
                        </span>
                        <span
                          className="font-label-sm text-label-sm text-secondary font-bold"
                          id="slider-readout"
                        >
                          65% Deployed
                        </span>
                      </div>
                      <input
                        className="w-full h-1.5 bg-surface-variant rounded-lg appearance-none cursor-pointer accent-secondary"
                        id="shading-range"
                        max="100"
                        min="0"
                        type="range"
                        value="65"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* ARCHITECTURAL SPACES & RESIDENCES */}

          {/* TRADE & AIA COLLABORATION TEASER */}
          <section className="w-full px-margin-mobile lg:px-margin py-space-lg bg-surface-container-lowest">
            <div className="rounded-xl p-space-lg lg:p-space-xl bg-surface-container-low shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-space-lg">
              <div className="max-w-2xl">
                <span className="font-label-sm text-label-sm text-secondary uppercase tracking-[0.2em]">
                  For Architects &amp; Interior Designers
                </span>
                <h3 className="font-headline-md text-headline-md text-on-surface mt-space-xs">
                  Join the Smart Decor Trade Registry
                </h3>
                <p className="font-body-md text-body-md text-on-surface-variant mt-space-xs">
                  Exclusive trade pricing, direct Revit/CAD pocket detail
                  libraries, priority fabrication scheduling, and dedicated
                  job-site project managers.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-space-sm">
                <a
                  className="inline-flex items-center justify-center px-space-md py-3 rounded-lg bg-primary-container text-on-primary font-label-md text-label-md uppercase tracking-widest hover:bg-primary-container/90 transition-colors"
                  data-path="trade-aia"
                  href="#"
                >
                  Access Trade Portal
                </a>
                <a
                  className="inline-flex items-center justify-center px-space-md py-3 rounded-lg bg-surface-container-lowest text-on-surface font-label-md text-label-md uppercase tracking-wider hover:bg-surface-container-lowest/80 transition-colors shadow-sm"
                  data-path="specifications"
                  href="#"
                >
                  Download CAD / BIM Specs
                </a>
              </div>
            </div>
          </section>
          {/* QUIET CONVERSION / INQUIRY BANNER */}
          <section
            className="w-full px-margin-mobile lg:px-margin py-space-xl mb-space-lg bg-surface-container-lowest"
            id="installation-partners"
          >
            <div className="max-w-6xl mx-auto flex flex-col items-center">
              <div className="text-center max-w-3xl mx-auto mb-space-lg">
                <div className="inline-flex items-center gap-space-xs px-space-sm py-1 rounded-full bg-surface-container-low mb-space-sm shadow-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                  <span className="font-label-sm text-label-sm text-secondary uppercase tracking-[0.2em]">
                    Direct E-Commerce Shipment • Independent Certified
                    Installers
                  </span>
                </div>
                <h2 className="font-headline-lg text-headline-lg text-on-surface mt-space-xs mb-space-sm">
                  Find an Installation Partner
                </h2>
                <p className="font-body-md text-body-md text-on-surface-variant font-light leading-relaxed">
                  Smart Decor designs and crafts precision motorized systems
                  delivered directly to your doorstep. For laser measurement,
                  ceiling pocket fitment, and automation setup, connect with
                  vetted independent regional partners.
                </p>
              </div>

              <div className="w-full max-w-4xl p-space-sm rounded-xl bg-surface-container-lowest shadow-md mb-space-xl border border-surface-container-high/60">
                <form
                  className="grid grid-cols-1 md:grid-cols-12 gap-space-sm"
                  onSubmit="event.preventDefault();"
                >
                  <div className="md:col-span-6 relative flex items-center">
                    <span className="material-symbols-outlined text-on-surface-variant text-[20px] absolute left-4">
                      location_on
                    </span>
                    <input
                      className="w-full pl-11 pr-space-md py-3 rounded-lg bg-surface-container-low text-on-surface font-body-sm text-body-sm placeholder:text-on-surface-variant/60 focus:outline-none focus:ring-2 focus:ring-primary-container"
                      placeholder="Enter City, State, or Zip Code"
                      type="text"
                      value="New York, NY"
                    />
                  </div>
                  <div className="md:col-span-4 relative flex items-center">
                    <span className="material-symbols-outlined text-on-surface-variant text-[20px] absolute left-4">
                      tune
                    </span>
                    <select className="w-full pl-11 pr-space-md py-3 rounded-lg bg-surface-container-low text-on-surface font-body-sm text-body-sm focus:outline-none focus:ring-2 focus:ring-primary-container appearance-none cursor-pointer">
                      <option>Motorized Shades &amp; Automation</option>
                      <option>Architectural Lighting Fitting</option>
                      <option>Acoustic Wall Paneling</option>
                      <option>Full Turnkey Integration</option>
                    </select>
                    <span className="material-symbols-outlined text-on-surface-variant text-[18px] absolute right-3 pointer-events-none">
                      expand_more
                    </span>
                  </div>
                  <div className="md:col-span-2">
                    <button
                      className="w-full h-full py-3 px-space-sm rounded-lg bg-primary-container text-on-primary font-label-md text-label-md uppercase tracking-wider flex items-center justify-center gap-1 hover:bg-primary-container/90 transition-all duration-200"
                      type="button"
                    >
                      <span className="">Find Partners</span>
                    </button>
                  </div>
                </form>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter max-w-5xl mx-auto">
                <article className="group flex flex-col rounded-xl bg-surface-container-lowest p-space-md shadow-md hover:shadow-xl transition-all duration-300 border border-surface-container-high/40">
                  <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden bg-surface-container-low mb-space-md">
                    <img
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      data-alt="Contemporary motorized zebra duo stripes blinds in modern minimalist residence with alternating sheer and opaque fabric bands softly filtering daylight."
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuAldd4vGNYblfUZUAg-_fANywcbrDN9n7ObO7JkVkD6YB6uXFrtNVx8s-jqLZJCJ5sgJ2MgTp4sh7VZzfZVUjFeEzwEARKISTR7FvuCiBtiQbSoi65xUcFL8lKSdIp6f8y5bDdm3qJPRMOX00Pbeuih69fT0uirzSGLjarkizV7gypmvyMRTijHAxdk0yrNvk3qwDywIlDmBJKso6e8vq3f1ztqaIy5kKfEuOXAC1sRXzN1w8j7dPcvYA"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-space-sm py-1 rounded bg-surface-container-lowest/90 backdrop-blur font-label-sm text-label-sm uppercase tracking-wider text-on-surface font-medium">
                        Dual Banded Shading
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col flex-1 justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-label-sm text-label-sm text-secondary uppercase tracking-widest font-semibold">
                          Zebra Blinds Architecture
                        </span>
                      </div>
                      <h3 className="font-headline-sm text-headline-sm text-on-surface group-hover:text-secondary transition-colors duration-200">
                        Duo Stripes (Zebra Blinds)
                      </h3>
                      <p className="font-body-sm text-body-sm text-on-surface-variant mt-space-xs leading-relaxed">
                        Precision alternating sheer and solid woven stripes
                        engineered for fluid light transition, glare reduction,
                        and refined daytime privacy with whisper-silent
                        alignment.
                      </p>
                    </div>
                    <div className="flex items-center justify-between pt-space-md mt-space-md border-t border-surface-container-high/60">
                      <span className="font-label-sm text-label-sm text-secondary uppercase tracking-widest font-semibold">
                        KNX / Zigbee 3.0 / Matter
                      </span>
                      <a
                        className="inline-flex items-center gap-1 font-label-md text-label-md text-on-surface uppercase tracking-wider group-hover:translate-x-1 transition-transform duration-200"
                        data-path="collections"
                        href="#"
                      >
                        <span className="">Configure Duo Stripes</span>
                        <span className="material-symbols-outlined text-[16px]">
                          arrow_forward
                        </span>
                      </a>
                    </div>
                  </div>
                </article>
                <article className="group flex flex-col rounded-xl bg-surface-container-lowest p-space-md shadow-md hover:shadow-xl transition-all duration-300 border border-surface-container-high/40">
                  <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden bg-surface-container-low mb-space-md">
                    <img
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      data-alt="Minimalist automated motorized roller shade smoothly descending from a ceiling recessed pocket in a luxury panoramic penthouse."
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuBDdHX68uOg49Yw6rQDAi0agPJLvEegk2INtOTp-V49WNqTx1YU7QJkUsPCcUJPdbugK8vTT9y8W9ldUE-TSKIjG1nI0K2TtsiQQ6AmqiFEpatW5yW0TcMji2CZ3fT8zZ0yQOfczwXzfXOrUHhGCeRzPsDy2XTo9orPCId4JuiC0VzYquMoH4m8t7RP8-5ZJVvMB__Mz2zYwuZWUkrnoZ-tvx6AyIVoMkiWqjGfeBCBnn11nEsSsg9AiA"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-space-sm py-1 rounded bg-surface-container-lowest/90 backdrop-blur font-label-sm text-label-sm uppercase tracking-wider text-on-surface font-medium">
                        Single &amp; Dual Roller
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col flex-1 justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-label-sm text-label-sm text-secondary uppercase tracking-widest font-semibold">
                          Concealed Pocket System
                        </span>
                      </div>
                      <h3 className="font-headline-sm text-headline-sm text-on-surface group-hover:text-secondary transition-colors duration-200">
                        Motorized Roller Shades
                      </h3>
                      <p className="font-body-sm text-body-sm text-on-surface-variant mt-space-xs leading-relaxed">
                        Sleek architectural single-roll solar mesh, blackout,
                        and linen-diffused motorized roller shades engineered
                        for flush pocket ceiling concealment and seamless hembar
                        retraction.
                      </p>
                    </div>
                    <div className="flex items-center justify-between pt-space-md mt-space-md border-t border-surface-container-high/60">
                      <span className="font-label-sm text-label-sm text-secondary uppercase tracking-widest font-semibold">
                        Ultra-Quiet &lt;30dB / RTS &amp; PoE
                      </span>
                      <a
                        className="inline-flex items-center gap-1 font-label-md text-label-md text-on-surface uppercase tracking-wider group-hover:translate-x-1 transition-transform duration-200"
                        data-path="collections"
                        href="#"
                      >
                        <span className="">Configure Roller Shades</span>
                        <span className="material-symbols-outlined text-[16px]">
                          arrow_forward
                        </span>
                      </a>
                    </div>
                  </div>
                </article>
              </div>

              <div className="pt-space-sm text-center">
                <a
                  className="inline-flex items-center gap-2 font-label-md text-label-md uppercase tracking-wider text-on-surface-variant hover:text-secondary transition-colors duration-200"
                  data-path="installer-application"
                  href="#"
                >
                  <span className="">
                    Are you a licensed installer or AV integrator? Apply to join
                    the certified network
                  </span>
                  <span className="material-symbols-outlined text-[16px]">
                    arrow_forward
                  </span>
                </a>
              </div>
            </div>
          </section>
        </div>
      </main>
      <footer className="w-full bg-surface-container-low py-space-xl">
        <div className="w-full px-margin-mobile lg:px-margin">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter mb-space-xl">
            <div className="md:col-span-5 flex flex-col items-start gap-space-md">
              <div className="flex items-center gap-space-sm">
                <span className="font-headline-sm text-headline-sm text-on-surface">
                  SMART DECOR
                </span>
                <span className="font-label-sm text-label-sm text-secondary tracking-widest uppercase">
                  Studio
                </span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant max-w-md">
                Architectural stillness and bespoke ambient automation for
                sovereign residences, private galleries, and refined hospitality
                spaces worldwide.
              </p>
              <div className="pt-space-sm">
                <span className="font-label-sm text-label-sm text-secondary uppercase tracking-widest">
                  smartdecor.store
                </span>
              </div>
            </div>
            <div className="md:col-span-2 md:col-start-7 flex flex-col gap-space-sm">
              <span className="font-label-md text-label-md uppercase text-on-surface tracking-wider mb-space-xs">
                Exploration
              </span>
              <a
                className="font-body-sm text-body-sm text-on-surface-variant hover:text-on-surface transition-colors"
                data-path="collections"
                href="#"
              >
                Collections
              </a>
              <a
                className="font-body-sm text-body-sm text-on-surface-variant hover:text-on-surface transition-colors"
                data-path="spaces"
                href="#"
              >
                Atmospheric Spaces
              </a>
              <a
                className="font-body-sm text-body-sm text-on-surface-variant hover:text-on-surface transition-colors"
                data-path="custom-studio"
                href="#"
              >
                Custom Studio
              </a>
              <a
                className="font-body-sm text-body-sm text-on-surface-variant hover:text-on-surface transition-colors"
                data-path="technology"
                href="#"
              >
                Acoustic &amp; Shade
              </a>
            </div>
            <div className="md:col-span-2 flex flex-col gap-space-sm">
              <span className="font-label-md text-label-md uppercase text-on-surface tracking-wider mb-space-xs">
                Professional
              </span>
              <a
                className="font-body-sm text-body-sm text-on-surface-variant hover:text-on-surface transition-colors"
                data-path="trade-aia"
                href="#"
              >
                Trade &amp; AIA Portal
              </a>
              <a
                className="font-body-sm text-body-sm text-on-surface-variant hover:text-on-surface transition-colors"
                data-path="specifications"
                href="#"
              >
                Architectural Specs
              </a>
              <a
                className="font-body-sm text-body-sm text-on-surface-variant hover:text-on-surface transition-colors"
                data-path="consultation"
                href="#"
              >
                Private Commission
              </a>
              <a
                className="font-body-sm text-body-sm text-on-surface-variant hover:text-on-surface transition-colors"
                data-path="case-studies"
                href="#"
              >
                Monographs
              </a>
            </div>
            <div className="md:col-span-2 flex flex-col gap-space-sm">
              <span className="font-label-md text-label-md uppercase text-on-surface tracking-wider mb-space-xs">
                Sanctuary
              </span>
              <a
                className="font-body-sm text-body-sm text-on-surface-variant hover:text-on-surface transition-colors"
                data-path="about"
                href="#"
              >
                Philosophy
              </a>
              <a
                className="font-body-sm text-body-sm text-on-surface-variant hover:text-on-surface transition-colors"
                data-path="sustainability"
                href="#"
              >
                Passive Design
              </a>
              <a
                className="font-body-sm text-body-sm text-on-surface-variant hover:text-on-surface transition-colors"
                data-path="support"
                href="#"
              >
                Concierge Client Care
              </a>
              <a
                className="font-body-sm text-body-sm text-on-surface-variant hover:text-on-surface transition-colors"
                data-path="privacy"
                href="#"
              >
                Privacy Charter
              </a>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-between pt-space-lg text-on-surface-variant font-label-sm text-label-sm gap-space-sm">
            <p>
              © 2025 Smart Decor Atelier. All architectural rights reserved.
            </p>
            <div className="flex items-center gap-space-lg">
              <a
                className="hover:text-on-surface transition-colors uppercase"
                data-path="privacy"
                href="#"
              >
                Privacy
              </a>
              <a
                className="hover:text-on-surface transition-colors uppercase"
                data-path="terms"
                href="#"
              >
                Terms
              </a>
              <a
                className="hover:text-on-surface transition-colors uppercase"
                data-path="contact"
                href="#"
              >
                Contact
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
